// Generates the vocabulary from the app's own label files, so the site can
// never list a word the app does not know (or miss one it does).
//
//   node scripts/gen-vocab.mjs            # app repo assumed at ../Siklab-kumpas
//   APP_ASSETS=<path-to-flutter_app/assets> node scripts/gen-vocab.mjs
//
// Writes vocab.json and rewrites the block between <!-- vocab:start --> and
// <!-- vocab:end --> in index.html. Every gloss needs a Filipino entry in
// scripts/vocab-fil.json; a missing one stops the build rather than shipping
// a blank cell.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const assets =
  process.env.APP_ASSETS ??
  resolve(root, '..', 'Siklab-kumpas', 'flutter_app', 'assets');

for (const p of ['labels/fsl105_labels.txt', 'labels/fsl_letters_labels.txt',
  'labels/asl_demo50_labels.txt', 'avatar/clips/manifest.json']) {
  if (!existsSync(join(assets, p))) {
    console.error(`missing ${join(assets, p)} — set APP_ASSETS`);
    process.exit(1);
  }
}

const fil = JSON.parse(readFileSync(join(here, 'vocab-fil.json'), 'utf8'));

/** "0,GOOD MORNING" lines -> ["GOOD MORNING", ...], in index order. */
function labels(file) {
  return readFileSync(join(assets, file), 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^\d+,/, '').trim())
    .filter(Boolean);
}

function withFil(gloss) {
  const t = fil[gloss];
  if (!t) {
    console.error(`no Filipino entry for "${gloss}" in scripts/vocab-fil.json`);
    process.exit(1);
  }
  return { gloss, fil: t };
}

// ---------------------------------------------------------------- FSL words
// The 105 labels are stored in topical order; the ranges are the corpus's own.
const fslWords = labels('labels/fsl105_labels.txt');
const fslGroups = [
  [0, 9, 'Greetings and courtesy', 'Pagbati at paggalang'],
  [10, 19, 'Replies', 'Mga tugon'],
  [20, 29, 'Numbers', 'Mga bilang'],
  [30, 41, 'Months', 'Mga buwan'],
  [42, 48, 'Days of the week', 'Mga araw ng linggo'],
  [49, 51, 'Time', 'Panahon'],
  [52, 65, 'Family and people', 'Pamilya at mga tao'],
  [66, 71, 'Community', 'Komunidad'],
  [72, 84, 'Colours', 'Mga kulay'],
  [85, 104, 'Food and drink', 'Pagkain at inumin'],
].map(([a, b, en, filName]) => ({
  en, fil: filName, words: fslWords.slice(a, b + 1).map(withFil),
}));
if (fslGroups.reduce((n, g) => n + g.words.length, 0) !== fslWords.length) {
  console.error('FSL group ranges do not cover the label file');
  process.exit(1);
}

// ------------------------------------------------------------------ letters
const letters = labels('labels/fsl_letters_labels.txt');

// ---------------------------------------------------------- ASL recognised
const aslWords = labels('labels/asl_demo50_labels.txt')
  .slice()
  .sort((a, b) => a.localeCompare(b))
  .map(withFil);

// ------------------------------------------------------------ avatar clips
const manifest = JSON.parse(readFileSync(join(assets, 'avatar/clips/manifest.json'), 'utf8'));
const clipKeys = Object.keys(manifest.clips);
const avatarLetters = clipKeys.filter((k) => k.startsWith('LETTER_')).length;
const avatarWords = clipKeys
  .filter((k) => k !== 'IDLE' && !k.startsWith('LETTER_'))
  .map((k) => k.replace(/_/g, ' '))
  .sort((a, b) => a.localeCompare(b))
  .map(withFil);

const vocab = {
  generated: new Date().toISOString().slice(0, 10),
  source: {
    fsl: 'assets/labels/fsl105_labels.txt',
    letters: 'assets/labels/fsl_letters_labels.txt',
    asl: 'assets/labels/asl_demo50_labels.txt',
    avatar: 'assets/avatar/clips/manifest.json',
  },
  fsl: { count: fslWords.length, groups: fslGroups },
  letters,
  asl: { count: aslWords.length, words: aslWords },
  avatar: { count: avatarWords.length, letters: avatarLetters, words: avatarWords },
};
writeFileSync(join(root, 'vocab.json'), JSON.stringify(vocab, null, 2) + '\n');

// ------------------------------------------------------------------- HTML
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const item = ({ gloss, fil: f }) =>
  `<li data-q="${esc((gloss + ' ' + f).toLowerCase())}"><span class="gloss">${esc(gloss)}</span><span class="fil" lang="fil">${esc(f)}</span></li>`;

const grid = (words) => `<ul class="vocab-grid">\n${words.map(item).join('\n')}\n</ul>`;

const bi = (en, f) => `<span lang="en">${esc(en)}</span><span lang="fil">${esc(f)}</span>`;

const html = `
<div class="vocab-set" id="vocab-fsl" data-set>
  <h4>${bi('FSL words and phrases', 'Mga salita at parirala sa FSL')} <span class="count" data-count>${vocab.fsl.count}</span></h4>
  <p class="vocab-note">${bi(
    'Recognised by the camera in FSL WORDS mode. Signs are chained into a phrase and spoken.',
    'Nakikilala ng kamera sa FSL WORDS mode. Pinagdudugtong ang mga sign sa isang parirala at binibigkas.')}</p>
${fslGroups.map((g) => `  <div class="vocab-group" data-group>
    <h5>${bi(g.en, g.fil)} <span class="count">${g.words.length}</span></h5>
${grid(g.words)}
  </div>`).join('\n')}
</div>

<div class="vocab-set" id="vocab-letters" data-set>
  <h4>${bi('Fingerspelling', 'Fingerspelling')} <span class="count">${letters.length}</span></h4>
  <p class="vocab-note">${bi(
    'LETTERS mode reads one letter at a time and spells a word. The same alphabet serves FSL and ASL.',
    'Isang letra sa bawat pagkakataon ang binabasa sa LETTERS mode upang baybayin ang isang salita. Iisa ang alpabeto para sa FSL at ASL.')}</p>
  <ul class="letter-row" aria-label="A to Z">
${letters.map((l) => `    <li>${esc(l)}</li>`).join('\n')}
  </ul>
</div>

<div class="vocab-set" id="vocab-asl" data-set>
  <h4>${bi('ASL words the camera recognises', 'Mga salitang ASL na nakikilala ng kamera')} <span class="count" data-count>${vocab.asl.count}</span></h4>
  <p class="vocab-note">${bi(
    'Recognised in ASL WORDS mode, the mode the camera opens in.',
    'Nakikilala sa ASL WORDS mode, ang mode na bukas sa simula ng kamera.')}</p>
  <div class="vocab-group" data-group>
${grid(aslWords)}
  </div>
</div>

<div class="vocab-set" id="vocab-avatar" data-set>
  <h4>${bi('ASL words the avatar can sign', 'Mga salitang ASL na kayang i-sign ng avatar')} <span class="count" data-count>${vocab.avatar.count}</span></h4>
  <p class="vocab-note">${bi(
    `What a hearing person says or types is signed back with these ${vocab.avatar.count} words plus the letters A–Z; any other word is fingerspelled.`,
    `Ang sinasabi o tina-type ng nakaririnig ay isa-sign pabalik gamit ang ${vocab.avatar.count} salitang ito at ang mga letrang A–Z; ang ibang salita ay bina-baybay.`)}</p>
  <div class="vocab-group" data-group>
${grid(avatarWords)}
  </div>
</div>
`;

const indexPath = join(root, 'index.html');
if (existsSync(indexPath)) {
  const src = readFileSync(indexPath, 'utf8');
  const start = '<!-- vocab:start -->';
  const end = '<!-- vocab:end -->';
  const a = src.indexOf(start);
  const b = src.indexOf(end);
  if (a === -1 || b === -1 || b < a) {
    console.error('index.html has no <!-- vocab:start --> … <!-- vocab:end --> block');
    process.exit(1);
  }
  const out = src.slice(0, a + start.length) + '\n' + html.trim() + '\n' + src.slice(b);
  writeFileSync(indexPath, out);
  console.log('index.html vocabulary block updated');
} else {
  writeFileSync(join(root, 'vocab.fragment.html'), html);
  console.log('index.html not found; wrote vocab.fragment.html');
}
console.log(`FSL ${vocab.fsl.count} · letters ${letters.length} · ASL ${vocab.asl.count} · avatar ${vocab.avatar.count} (+${avatarLetters} letters)`);
