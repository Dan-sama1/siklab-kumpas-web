// Captures the phone's current screen over adb, shrinks it, and slots it into
// the page in place of the placeholder for that screen id.
//
//   node scripts/shot.mjs <screen-id>          e.g. node scripts/shot.mjs home
//   node scripts/shot.mjs --list               screens the page expects
//
// Needs adb on PATH (or ANDROID_HOME/platform-tools) and ffmpeg. The phone
// must have USB debugging on. Re-running for the same id replaces the shot.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'index.html');
const html = readFileSync(indexPath, 'utf8');

const ids = [...new Set([...html.matchAll(/data-shot="([a-z0-9-]+)"/g)].map((m) => m[1]))];
const arg = process.argv[2];

if (!arg || arg === '--list') {
  for (const id of ids) {
    const done = existsSync(join(root, 'assets/screens', id + '.webp'));
    console.log(`${done ? '✓' : ' '} ${id}`);
  }
  if (!arg) console.error('\nusage: node scripts/shot.mjs <screen-id>');
  process.exit(arg ? 0 : 2);
}
if (!ids.includes(arg)) {
  console.error(`unknown screen "${arg}". Known: ${ids.join(', ')}`);
  process.exit(2);
}

function findAdb() {
  const home = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT ||
    join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk');
  const local = join(home, 'platform-tools', process.platform === 'win32' ? 'adb.exe' : 'adb');
  return existsSync(local) ? local : 'adb';
}
const adb = findAdb();

const devices = execFileSync(adb, ['devices'], { encoding: 'utf8' })
  .split(/\r?\n/).slice(1).filter((l) => /\tdevice$/.test(l));
if (devices.length === 0) {
  console.error('no phone connected (adb devices is empty). USB debugging on? Tap "Allow" on the phone.');
  process.exit(1);
}

const dir = join(root, 'assets/screens');
mkdirSync(dir, { recursive: true });
const raw = join(dir, arg + '.raw.png');
const out = join(dir, arg + '.webp');

// exec-out streams the PNG without the CRLF mangling of `adb shell`.
const png = execFileSync(adb, ['exec-out', 'screencap', '-p'], { maxBuffer: 64 * 1024 * 1024 });
writeFileSync(raw, png);
// 540 px wide is 2× the frame's largest rendered size; webp keeps it ~40 KB.
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-vf', 'scale=540:-2', '-quality', '85', out]);
unlinkSync(raw);

// Every frame for this screen: point at the file and drop the placeholder flag.
const re = new RegExp(
  `(<figure class="phone phone--inline" data-shot="${arg}")( data-placeholder)?>\\s*<img src="[^"]+"`, 'g');
let n = 0;
const next = html.replace(re, (m, open) => { n++; return `${open}>\n    <img src="assets/screens/${arg}.webp"`; });
writeFileSync(indexPath, next);
console.log(`captured ${arg} → assets/screens/${arg}.webp, ${n} frame(s) updated`);
