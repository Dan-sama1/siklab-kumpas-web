// Headless Edge/Chrome driver over the DevTools protocol. No dependencies.
//
//   node scripts/browser.mjs shot --url http://127.0.0.1:8765/ --out review/desktop.png --width 1440 --height 900 [--full] [--mobile] [--scheme dark|light] [--lang fil]
//   node scripts/browser.mjs pdf  --url http://127.0.0.1:8765/ --out docs/manual.pdf [--scheme light]
//
// Used for the review screenshots and for printing the manual to PDF with
// real Letter pages, backgrounds, and no browser header/footer.

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, def) => {
  const i = args.indexOf('--' + name);
  if (i === -1) return def;
  const v = args[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
};

const url = opt('url');
const out = opt('out');
const width = Number(opt('width', 1440));
const height = Number(opt('height', 900));
const full = opt('full', false) === true;
const mobile = opt('mobile', false) === true;
const scheme = opt('scheme', 'light');
const lang = opt('lang', null);
const scale = Number(opt('scale', mobile ? 2 : 1));
const atY = opt('y', null);
const evalExpr = opt('eval', null);
const preExpr = opt('pre', null);    // JS to run before capture/print   // css px, or a CSS selector to scroll to

if (!cmd || !url || !out) {
  console.error('usage: browser.mjs shot|pdf --url <url> --out <file> [--width --height --full --mobile --scheme --lang]');
  process.exit(2);
}

const candidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const exe = candidates.find(existsSync);
if (!exe) { console.error('no Edge/Chrome found'); process.exit(2); }

const port = 9333 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), 'sk-headless-'));
const browser = spawn(exe, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--remote-debugging-port=' + port, '--user-data-dir=' + profile,
  '--window-size=1600,1000', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function version() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return r.json();
    } catch {}
    await sleep(250);
  }
  throw new Error('browser did not start');
}

let id = 0;
const pending = new Map();
const listeners = [];
let ws;

const dbg = (...a) => { if (process.env.DEBUG) console.error('[browser]', ...a); };
function send(method, params = {}, sessionId) {
  const msgId = ++id;
  dbg('→', method);
  const msg = { id: msgId, method, params };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((resolve, reject) => pending.set(msgId, { resolve, reject, method }));
}
function waitFor(method, sessionId) {
  return new Promise((resolve) => listeners.push({ method, sessionId, resolve }));
}

const killer = setTimeout(() => { console.error('timed out'); browser.kill(); process.exit(1); }, 180000);
try {
  const v = await version();
  ws = new WebSocket(v.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id); pending.delete(m.id);
      dbg('←', p.method, m.error ? 'ERROR' : 'ok');
      if (m.error) p.reject(new Error(p.method + ': ' + m.error.message)); else p.resolve(m.result);
      return;
    }
    for (let i = listeners.length - 1; i >= 0; i--) {
      const l = listeners[i];
      if (l.method === m.method && (!l.sessionId || l.sessionId === m.sessionId)) { listeners.splice(i, 1); l.resolve(m.params); }
    }
  };

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const s = sessionId;
  await send('Page.enable', {}, s);
  await send('Runtime.enable', {}, s);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] }, s);
  if (cmd === 'shot') {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile }, s);
    if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true }, s);
  }
  const loaded = waitFor('Page.loadEventFired', s);
  await send('Page.navigate', { url }, s);
  await loaded;
  if (lang) {
    await send('Runtime.evaluate', { expression: `document.querySelector('[data-set-lang="${lang}"]')?.click()` }, s);
  }
  // Fonts and lazy images.
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true }, s);
  await sleep(400);

  if (preExpr) { await send('Runtime.evaluate', { expression: preExpr, awaitPromise: true }, s); await sleep(300); }
  if (evalExpr) {
    const r = await send('Runtime.evaluate', { expression: evalExpr, returnByValue: true }, s);
    console.log(JSON.stringify(r.result.value));
  }
  if (cmd === 'shot') {
    mkdirSync(dirname(out), { recursive: true });
    if (!full) {
      let y = 0;
      if (atY !== null) {
        y = /^\d+$/.test(atY) ? Number(atY)
          : (await send('Runtime.evaluate', { expression: `Math.round(document.querySelector(${JSON.stringify(atY)}).getBoundingClientRect().top + window.scrollY) - 72`, returnByValue: true }, s)).result.value;
        await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` }, s);
        await sleep(600);
      }
      const shot = await send('Page.captureScreenshot', { format: 'png' }, s);
      writeFileSync(out, Buffer.from(shot.data, 'base64'));
      console.log(`wrote ${out} (${width}×${height})`);
    } else {
      // Full page in tiles: a single capture above ~16k device pixels hangs
      // the compositor, and a phone-width page with the vocabulary is longer
      // than that. Tiles are written as out-1.png, out-2.png … when needed.
      const m = await send('Page.getLayoutMetrics', {}, s);
      const total = Math.ceil(m.cssContentSize.height);
      const tile = Math.floor(7000 / scale);
      const tiles = Math.max(1, Math.ceil(total / tile));
      for (let i = 0; i < tiles; i++) {
        const y = i * tile;
        const h = Math.min(tile, total - y);
        const shot = await send('Page.captureScreenshot', {
          format: 'png', captureBeyondViewport: true, clip: { x: 0, y, width, height: h, scale: 1 },
        }, s);
        const file = tiles === 1 ? out : out.replace(/\.png$/i, `-${i + 1}.png`);
        writeFileSync(file, Buffer.from(shot.data, 'base64'));
        console.log(`wrote ${file} (${width}×${h} css px at y=${y}, scale ${scale})`);
      }
    }
  } else if (cmd === 'pdf') {
    await send('Runtime.evaluate', { expression: "document.querySelectorAll('details').forEach(d => d.open = true)" }, s);
    // Screenshots print from their JPEG twins (assets/screens/jpg): Chromium's PDF
    // printer hangs once a document carries ~16 WebP or PNG rasters.
    await send('Runtime.evaluate', { expression: "document.querySelectorAll('.phone img[src$=\".webp\"]').forEach(i => { i.src = i.src.replace('/screens/', '/screens/jpg/').replace(/\.webp$/, '.jpg'); })" }, s);
    // Lazy images never load for a print that starts off-screen: force them and wait.
    await send('Runtime.evaluate', { expression: `(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach((i) => { i.loading = 'eager'; });
      await Promise.all(imgs.map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })));
      return imgs.length;
    })()`, awaitPromise: true }, s);
    // Let @page in the stylesheet decide size and margins.
    const pdf = await send('Page.printToPDF', {
      printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false,
    }, s);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(pdf.data, 'base64'));
    console.log(`wrote ${out}`);
  }
  await send('Target.closeTarget', { targetId });
} catch (e) {
  console.error(e.message || e);
  process.exitCode = 1;
} finally {
  clearTimeout(killer);
  try { ws && ws.close(); } catch {}
  browser.kill();
}
