// Siklab-Kumpas site — progressive enhancement only.
// Without this file the page still reads in English, prints, and downloads.
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ------------------------------------------------------------ language
  var langButtons = document.querySelectorAll('[data-set-lang]');
  function setLang(lang, persist) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
    if (persist) { try { localStorage.setItem('sk-lang', lang); } catch (e) {} }
    updateSearchStatus();
  }
  langButtons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); });
  });
  setLang(root.getAttribute('data-lang') === 'fil' ? 'fil' : 'en', false);

  // ------------------------------------------------------------ header pill
  var pill = document.getElementById('pill');
  var downloadBtn = document.getElementById('download-btn');
  if (pill && downloadBtn && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      // Reachable whenever the real button is off screen, above or below.
      pill.hidden = visible;
    }, { rootMargin: '-64px 0px 0px 0px' }).observe(downloadBtn);
  }

  // ------------------------------------------------------------ phone stage
  // On wide screens one sticky phone follows the reader; each step declares
  // the screen it happens on and carries its own inline frame (shown on
  // phones and in print), so the stage only mirrors the step nearest the
  // reading line.
  var stage = document.getElementById('stage');
  var steps = Array.prototype.slice.call(document.querySelectorAll('[data-screen]'));
  var wide = window.matchMedia('(min-width: 1000px)');
  var active = null;
  var swapTimer = null;

  function frameFor(step) {
    return step.querySelector('.phone--inline');
  }

  function showOnStage(step) {
    if (!stage) return;
    var frame = frameFor(step);
    if (!frame) return;
    var src = frame.querySelector('img').getAttribute('src');
    var cap = frame.querySelector('figcaption');
    var imgs = stage.querySelectorAll('img');
    var current = imgs[0], next = imgs[1];
    var stageCap = stage.querySelector('figcaption');
    if (stageCap && cap) stageCap.innerHTML = cap.innerHTML;
    if (frame.hasAttribute('data-placeholder')) stage.setAttribute('data-placeholder', '');
    else stage.removeAttribute('data-placeholder');

    if (current.getAttribute('src') === src) return;
    if (reduceMotion.matches) { current.setAttribute('src', src); return; }

    if (swapTimer) { clearTimeout(swapTimer); swapTimer = null; stage.classList.remove('is-swapping'); }
    next.setAttribute('src', src);
    // Two frames so the old screen stays until the new one is painted.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        stage.classList.add('is-swapping');
        swapTimer = setTimeout(function () {
          current.setAttribute('src', src);
          stage.classList.remove('is-swapping');
          swapTimer = null;
        }, 230);
      });
    });
  }

  function pickActive() {
    if (!wide.matches || !steps.length) return;
    var line = window.innerHeight * 0.38;
    var best = null, bestDist = Infinity;
    for (var i = 0; i < steps.length; i++) {
      var r = steps[i].getBoundingClientRect();
      if (r.height === 0) continue;
      var d;
      if (r.top <= line && r.bottom >= line) d = 0;
      else d = Math.min(Math.abs(r.top - line), Math.abs(r.bottom - line));
      if (d < bestDist) { bestDist = d; best = steps[i]; }
    }
    if (best && best !== active) {
      if (active) active.classList.remove('is-active');
      active = best;
      active.classList.add('is-active');
      showOnStage(active);
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; pickActive(); });
  }
  if (stage && steps.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    wide.addEventListener ? wide.addEventListener('change', onScroll) : wide.addListener(onScroll);
    pickActive();
  }

  // ------------------------------------------------------------ vocabulary search
  var q = document.getElementById('vocab-q');
  var status = document.getElementById('vocab-status');
  var items = Array.prototype.slice.call(document.querySelectorAll('#vocab li[data-q]'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('#vocab [data-group]'));
  var sets = Array.prototype.slice.call(document.querySelectorAll('#vocab [data-set]'));
  var lastCount = null;

  function updateSearchStatus() {
    if (!status) return;
    if (lastCount === null) { status.textContent = ''; return; }
    var fil = root.getAttribute('data-lang') === 'fil';
    if (lastCount === 0) status.textContent = fil ? 'Walang tugmang salita.' : 'No matching words.';
    else status.textContent = fil
      ? lastCount + (lastCount === 1 ? ' salitang tugma' : ' salitang tugma')
      : lastCount + (lastCount === 1 ? ' word matches' : ' words match');
  }

  function filter() {
    var term = q.value.trim().toLowerCase();
    if (!term) {
      items.forEach(function (li) { li.hidden = false; });
      groups.forEach(function (g) { g.hidden = false; });
      sets.forEach(function (s) { s.hidden = false; });
      lastCount = null; updateSearchStatus(); return;
    }
    var n = 0;
    items.forEach(function (li) {
      var hit = li.getAttribute('data-q').indexOf(term) !== -1;
      li.hidden = !hit; if (hit) n++;
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector('li[data-q]:not([hidden])');
    });
    sets.forEach(function (s) {
      var hasGroups = s.querySelector('[data-group]');
      s.hidden = hasGroups ? !s.querySelector('li[data-q]:not([hidden])') : true; // letters set has no searchable items
    });
    lastCount = n; updateSearchStatus();
  }
  if (q && items.length) {
    q.addEventListener('input', filter);
    q.addEventListener('search', filter);
  }
})();
