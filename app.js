(() => {
'use strict';
const $ = (s, el = document) => el.querySelector(s);
const R = window.RECORDS, N = R.length, DIM = window.DIM || {};
const app = $('#app'), stage = $('#stage'), crate = $('#crate');
const A = p => 'a/' + p;
const dim = p => DIM[p] || (p.endsWith('.jpg') && DIM[p.replace('.jpg', '.mp4')]) || null;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// flat list of every case, for prev / next
const FLAT = []; R.forEach((r, ri) => r.cases.forEach((c, ci) => FLAT.push({ ri, ci })));
const lum = hex => { const n = parseInt(hex.slice(1), 16); return (.299 * (n >> 16) + .587 * (n >> 8 & 255) + .114 * (n & 255)) / 255; };
const onCol = hex => lum(hex) > .55 ? '#141413' : '#F4F0E7';
let store = {}; try { store = JSON.parse(localStorage.getItem('gw') || '{}'); } catch (_) {}
const save = () => { try { localStorage.setItem('gw', JSON.stringify(store)); } catch (_) {} };

/* =============================================================== CRATE */
const sleeves = R.map((r, i) => {
  const el = document.createElement('div');
  el.className = 'sl'; el.dataset.i = i;
  el.style.cssText = `--c:${r.color};--sp:${r.spine};--on:${r.on}`;
  const tracks = r.cases.map((c, j) => `<li><button data-case="${i}.${j}"><i>${c.vol || 'A' + (j + 1)}</i><b>${esc(c.title)}</b></button></li>`).join('');
  el.innerHTML = `<div class="flip">
    <div class="face front"><img src="${r.cover}" alt="" draggable="false" ${i > 2 ? 'loading="lazy"' : ''}><div class="spine"><b>${esc(r.brand)}</b><em>GW-${r.no}</em></div><i class="shade"></i></div>
    <div class="face back"><div class="bh"><span>GW-${r.no} · Side A</span><span>${r.cases.length > 1 ? r.cases.length + ' volumes' : ''}</span></div>
      <h4>${esc(r.brand)}</h4><ol>${tracks}</ol>
      <div class="bf"><span>${esc(r.role)}<br>${esc(r.sub)}</span><button data-case="${i}.0">Open →</button></div></div>
  </div>`;
  stage.appendChild(el);
  return el;
});
stage.insertAdjacentHTML('beforeend', '<i class="floor"></i>');

/* =============================================================== WALL (desktop) */
const wallMQ = matchMedia('(min-width: 900px)');
const recs = [];
(() => {
  const rows = N > 4 ? [R.slice(0, Math.ceil(N / 2)), R.slice(Math.ceil(N / 2))] : [R];
  let i = 0;
  $('#shelves').innerHTML = rows.map(row => `<div class="shelf">${row.map(r => { const k = i++; const c = r.cases[0];
    return `<button class="rec" data-i="${k}" style="--c:${r.color}" aria-label="Open ${esc(r.brand)}: ${esc(c.title)}"><span class="cov"><img src="${r.cover}" alt="" loading="${k < 4 ? 'eager' : 'lazy'}" decoding="async"></span><span class="tag"><span>GW-${r.no} · ${esc(r.brand)}</span><span>${r.cases.length > 1 ? r.cases.length + ' vols' : ''}</span></span></button>`; }).join('')}</div>`).join('');
  document.querySelectorAll('.rec').forEach(b => recs[+b.dataset.i] = b);
  const np = $('#npT');
  $('#shelves').addEventListener('pointerover', e => { const b = e.target.closest('.rec'); if (!b) return; const r = R[+b.dataset.i]; np.textContent = `${r.brand} — ${r.cases.map(c => c.title).join(' / ')}`; });
  $('#shelves').addEventListener('click', e => { const b = e.target.closest('.rec'); if (!b) return; openCase(+b.dataset.i, 0, b); });
})();

let pos = 0, target = 0, raf = 0, cur = -1, flipped = -1;
const wrap = d => ((d + N / 2) % N + N) % N - N / 2;
const S = () => stage.offsetWidth || 300;
function render() {
  const s = S(), gap = s * .085, depth = s * .2;
  for (let i = 0; i < N; i++) {
    const el = sleeves[i], d = wrap(i - pos);
    let tf, z = 100 - Math.round(d * 10), op = 1, sh = 0, spo = 0;
    if (d >= 0) {                       // standing in the crate, behind
      const dd = Math.min(d, 4);
      tf = `translate3d(0,${-dd * gap}px,${-dd * depth}px) rotateX(${Math.min(d, 1) * 4}deg)`;
      sh = Math.min(.55, d * .16); spo = Math.min(1, d * 1.6);
      if (d > 3.2) op = Math.max(0, 1 - (d - 3.2) * 1.5);
    } else {                            // pulled forward, falling toward you
      const t = Math.min(1, -d);
      tf = `translate3d(0,${t * s * .55}px,${t * depth * .6}px) rotateX(${-t * 70}deg)`;
      op = Math.max(0, 1 - t * 1.4);
    }
    el.style.transform = tf; el.style.zIndex = z; el.style.opacity = op;
    el.style.setProperty('--sh', sh.toFixed(3)); el.style.setProperty('--spo', spo.toFixed(2));
    el.style.visibility = op <= 0.01 ? 'hidden' : 'visible';
  }
  const c = ((Math.round(pos) % N) + N) % N;
  if (c !== cur) { cur = c; onCurrent(c); }
}
function tick() {
  raf = 0; pos += (target - pos) * .2;
  if (Math.abs(target - pos) < .002) { pos = target; render(); const m = Math.round(pos / N) * N; pos -= m; target -= m; return; }
  render(); raf = requestAnimationFrame(tick);
}
const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
function goTo(i) { unflip(); const c = Math.round(pos); target = c + wrap(i - c); kick(); }
function step(n) { unflip(); target = Math.round(target) + n; kick(); }
function onCurrent(i) {
  const r = R[i];
  $('#nowK').textContent = `GW-${r.no} · ${r.role}`;
  $('#nowName').textContent = r.brand; $('#nowSub').textContent = r.sub;
  const now = $('#now'); now.classList.remove('sw'); void now.offsetWidth; now.classList.add('sw');
  $('#cntA').textContent = r.no; $('#cntB').textContent = String(N).padStart(2, '0');
  $('#actOpen span').textContent = 'Open ' + r.brand;
  $('#actFilm').hidden = !r.cases[0].film;
  app.style.setProperty('--acc', r.color);
}

/* flip (back cover) */
function setFlip(i, on) {
  sleeves.forEach((el, k) => el.classList.toggle('flipped', on && k === i));
  flipped = on ? i : -1;
  $('#hintT').textContent = on ? 'Swipe again for the cover' : 'Swipe the record for the back cover';
  if (on && !store.flipped) { store.flipped = 1; save(); }
}
const unflip = () => { if (flipped >= 0) setFlip(flipped, false); };

/* gestures: vertical = dig, horizontal on the front record = turn it over, tap = open */
let g = null;
crate.addEventListener('pointerdown', e => {
  if (e.button) return;
  g = { id: e.pointerId, x: e.clientX, y: e.clientY, pos, axis: null, t: performance.now() };
  try { crate.setPointerCapture(e.pointerId); } catch (_) {}
});
crate.addEventListener('pointermove', e => {
  if (!g || e.pointerId !== g.id) return;
  const dx = e.clientX - g.x, dy = e.clientY - g.y;
  if (!g.axis) { if (Math.hypot(dx, dy) < 8) return; g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; if (g.axis === 'y') unflip(); }
  if (g.axis === 'y') { pos = g.pos + dy / (S() * .9); target = pos; render(); }
  else {
    const el = sleeves[cur]; el.classList.add('dragging');
    const base = flipped === cur ? 180 : 0, a = Math.max(-180, Math.min(180, dx / S() * 200));
    $('.flip', el).style.transform = `rotateY(${base + a}deg)`; g.a = a;
  }
});
function end(e) {
  if (!g || e.pointerId !== g.id) return;
  const p = g; g = null;
  if (p.axis === 'y') {
    const v = (e.clientY - p.y) / Math.max(1, performance.now() - p.t);
    target = Math.round(pos + (Math.abs(v) > .5 ? Math.sign(v) * .5 : 0)); kick(); return;
  }
  if (p.axis === 'x') {
    const el = sleeves[cur]; el.classList.remove('dragging'); $('.flip', el).style.transform = '';
    const turn = Math.abs(p.a || 0) > 50;
    setFlip(cur, turn ? flipped !== cur : flipped === cur); return;
  }
  // tap
  const hit = document.elementFromPoint(e.clientX, e.clientY);
  const cb = hit && hit.closest('[data-case]');
  if (cb) { const [ri, ci] = cb.dataset.case.split('.').map(Number); return openCase(ri, ci, sleeves[ri]); }
  const sl = hit && hit.closest('.sl');
  if (!sl) return;
  const i = +sl.dataset.i;
  if (i !== cur) return goTo(i);
  if (flipped === cur) return setFlip(cur, false);
  openCase(i, 0, sl);
}
crate.addEventListener('pointerup', end);
crate.addEventListener('pointercancel', e => { if (g) { g = null; target = Math.round(pos); kick(); } });
let wAcc = 0, wT = 0;
crate.addEventListener('wheel', e => { e.preventDefault(); wAcc += e.deltaY; const t = performance.now();
  if (Math.abs(wAcc) > 50 && t - wT > 160) { step(wAcc > 0 ? 1 : -1); wAcc = 0; wT = t; } }, { passive: false });

$('#hint').onclick = () => setFlip(cur, flipped !== cur);
$('#actOpen').onclick = () => openCase(cur, 0, sleeves[cur]);
$('#actFilm').onclick = () => { const c = R[cur].cases[0]; film(c.film); };

/* =============================================================== CASE */
const cs = $('#case'), zine = $('#zine'), scroller = $('#cscroll');
let open = null; // {ri, ci}

function media(m, k) {
  const span = m.span === 'h' ? 'h' : 'f';
  if (m.t === 'img') {
    const d = dim(m.s) || [4, 3];
    return `<figure class="m img ${span}" data-zoom="${A(m.s)}"><img src="${A(m.s)}" width="${d[0]}" height="${d[1]}" alt="" loading="lazy" decoding="async">${m.cap ? `<figcaption class="m-cap">${esc(m.cap)}</figcaption>` : ''}</figure>`;
  }
  if (m.t === 'loop') {
    const d = dim(m.s) || [16, 9], poster = A(m.s.replace('.mp4', '.jpg'));
    return `<figure class="m loop ${span}"><video muted loop playsinline preload="none" poster="${poster}" data-src="${A(m.s)}" width="${d[0]}" height="${d[1]}" style="aspect-ratio:${d[0]}/${d[1]}"></video>${m.cap ? `<figcaption class="m-cap">${esc(m.cap)}</figcaption>` : ''}</figure>`;
  }
  if (m.t === 'film') return filmTile(m, span);
  if (m.t === 'member') return `<div class="member"><div class="mh"><div><div>Panté Member</div><div class="nm">Komang Mariani</div></div><svg viewBox="0 0 182 62"><use href="#pante-logo"/></svg></div>
    <div class="st"><i class="y">03</i><i class="y">10</i><i class="y">17</i><i class="y">21</i><i>90′</i></div>
    <div class="mh"><div class="tiers"><span>Routine · 4</span><span>Ritual · 6</span><span>Royale · 10</span></div><span>No. PT-0021 · VIP</span></div></div>`;
  return '';
}
function filmKey(m) { return m.y ? 'y:' + m.y + (m.start ? ':' + m.start : '') : 'v:' + m.v; }
function filmTile(m, span, cine) {
  const poster = m.poster ? `<img src="${A(m.poster)}" alt="" loading="lazy" decoding="async">` : `<span class="typo-t">${esc(m.cap || 'Film')}</span>`;
  return `<div class="m film ${span || 'f'}${cine ? ' cine' : ''}${m.poster ? '' : ' typo'}" data-film="${filmKey(m)}" data-live="${filmKey(m)}" role="button" tabindex="0" aria-label="Play ${esc(m.cap || 'film')} with sound">${poster}<span class="play"></span>${m.cap && !cine ? `<span class="m-cap">${esc(m.cap)}</span>` : ''}<span class="snd">${cine ? '▶ ' + esc(m.cap || 'Case film') + ' · ' : ''}Sound on ⤢</span></div>`;
}
const embedURL = (key, sound) => {
  const [k, id, st] = key.split(':');
  if (k === 'y') return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${sound ? 0 : 1}&loop=1&playlist=${id}&controls=${sound ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=${sound ? 0 : 1}${st ? '&start=' + st : ''}`;
  return sound ? `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&dnt=1&title=0&byline=0&portrait=0` : `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`;
};
function caseHTML(ri, ci) {
  const r = R[ri], c = r.cases[ci]; let n = 0; const N_ = () => `style="--n:${n++}"`;
  const vols = r.cases.length > 1 ? `<div class="vols" ${N_()}>${r.cases.map((x, j) => `<button data-case="${ri}.${j}" class="${j === ci ? 'on' : ''}">${x.key && x.key.t === 'img' ? `<img src="${A(x.key.s)}" alt="">` : ''}${x.vol} · ${esc(x.title)}</button>`).join('')}</div>` : '';
  const filmbar = c.film ? `<div ${N_()}>${filmTile(c.film, 'f', true)}</div>` : '';
  const meta = `<dl class="meta ${c.meta.length === 3 ? 'n3' : ''}" ${N_()}>${c.meta.map(([k, v], j) => `<div class="${j === 0 && c.meta.length === 3 ? 'w' : ''}"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
  const brief = `<div class="brief ${c.insight ? 'n3' : ''}" ${N_()}>
      <div class="card"><span class="ch-k">Challenge</span><p class="big">${esc(c.challenge)}</p></div>
      ${c.insight ? `<div class="card"><span class="ch-k">Insight</span><p class="big">${esc(c.insight)}</p></div>` : ''}
      <div class="card idea"><span class="ch-k">The idea</span><p class="big">${esc(c.idea)}</p></div></div>`;
  const chaps = c.chapters.map(ch => {
    if (ch.quote) return `<section class="chap solo" ${N_()}><div class="chap-t quote" style="grid-column:1/-1"><p>“${esc(ch.quote[0])}”</p><cite>— ${esc(ch.quote[1])}</cite></div></section>`;
    if (ch.credits) return `<section class="chap" ${N_()}><div class="chap-t"><span class="ch-k">${ch.k}</span></div><div class="chap-m"><dl class="credits">${ch.credits.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl></div></section>`;
    const txt = `<div class="chap-t"><span class="ch-k">${esc(ch.k)}</span>${ch.h ? `<h3>${esc(ch.h)}</h3>` : ''}${ch.p ? `<p>${esc(ch.p)}</p>` : ''}${ch.link ? `<a class="lk" href="${ch.link[1]}" target="_blank" rel="noopener">${ch.link[0]} ↗</a>` : ''}</div>`;
    const stats = ch.stats ? `<div class="stats f">${ch.stats.map(([b, s]) => `<div><b>${b}</b><span>${esc(s)}</span></div>`).join('')}</div>` : '';
    const ms = (ch.m || []).map(media).join('');
    if (!ms && !stats) return `<section class="chap solo" ${N_()}>${txt}</section>`;
    return `<section class="chap" ${N_()}>${txt}<div class="chap-m"><div class="grid">${stats}${ms}</div></div></section>`;
  }).join('');
  const fi = FLAT.findIndex(f => f.ri === ri && f.ci === ci), nx = FLAT[(fi + 1) % FLAT.length], nr = R[nx.ri], nc = nr.cases[nx.ci];
  const nimg = nc.key && nc.key.t === 'img' ? A(nc.key.s) : nr.cover;
  const next = `<button class="next" data-case="${nx.ri}.${nx.ci}" style="--ncol:${nr.color};--non:${onCol(nr.color)}" ${N_()}><img src="${nimg}" alt="" loading="lazy"><span class="ni"><small>Next · GW-${nr.no} · ${esc(nr.brand)}</small><b>${esc(nc.title)}</b><em>→</em></span></button>`;
  return `${vols}<header class="head"><div class="hd-logo" ${N_()}>${c.logo}</div><h1 class="hd-title" ${N_()}>${esc(c.title)}</h1><p class="hd-sub" ${N_()}>${esc(c.sub)}</p></header>
    <div class="key" ${N_()}>${media(c.key)}</div>${filmbar}${meta}${brief}${chaps}${next}`;
}
function paint(ri, ci) {
  const r = R[ri], c = r.cases[ci], t = c.theme;
  open = { ri, ci };
  cs.style.setProperty('--cbg', t.bg); cs.style.setProperty('--cfg', t.fg); cs.style.setProperty('--ccard', t.card);
  cs.style.setProperty('--cacc', t.acc); cs.style.setProperty('--cacc-on', onCol(t.acc));
  document.querySelector('meta[name=theme-color]').content = t.bg;
  const crumbs = [['Work', 'crate'], [r.brand, r.cases.length > 1 ? `${ri}.0` : null]];
  if (r.cases.length > 1) crumbs.push([c.title, null]);
  $('#crumbs').innerHTML = crumbs.map(([l, a], j) => `<li>${a ? `<button ${a === 'crate' ? 'data-go="crate"' : `data-case="${a}"`}>${esc(l)}</button>` : esc(l)}</li>`).join('');
  zine.innerHTML = caseHTML(ri, ci);
  scroller.scrollTop = 0;
  watchLoops();
  location.hash = c.id;
}
function clipTo(rect, rad) {
  const W = innerWidth, H = innerHeight;
  cs.style.setProperty('--ct', Math.max(0, rect.top) + 'px'); cs.style.setProperty('--cr', Math.max(0, W - rect.right) + 'px');
  cs.style.setProperty('--cb', Math.max(0, H - rect.bottom) + 'px'); cs.style.setProperty('--cl', Math.max(0, rect.left) + 'px');
  cs.style.setProperty('--crad', rad + 'px');
}
function openCase(ri, ci, fromEl) {
  closeOverlays();
  if (!cs.hidden && open) { // already open: swap content with a quick fade
    cs.classList.add('out'); zine.style.opacity = 0;
    setTimeout(() => { paint(ri, ci); zine.style.opacity = ''; cs.classList.remove('out'); }, 180);
    syncCrate(ri); return;
  }
  paint(ri, ci); syncCrate(ri);
  const fe = fromEl && (fromEl.querySelector('.front, .cov') || fromEl); const from = fe ? fe.getBoundingClientRect() : { top: innerHeight * .4, bottom: innerHeight * .6, left: innerWidth * .3, right: innerWidth * .7 };
  cs.classList.add('instant'); clipTo(from, 4); cs.hidden = false;
  void cs.offsetWidth; cs.classList.remove('instant');
  clipTo({ top: 0, left: 0, right: innerWidth, bottom: innerHeight }, 0);
  setPill('crate', true);
}
function closeCase() {
  if (cs.hidden) return;
  const ri = open ? open.ri : cur; const tgt = wallMQ.matches ? $('.cov', recs[ri]) : $('.front', sleeves[ri]);
  clipTo(tgt.getBoundingClientRect(), 4);
  pauseLoops();
  setTimeout(() => { cs.hidden = true; zine.innerHTML = ''; open = null; history.replaceState(null, '', location.pathname); document.querySelector('meta[name=theme-color]').content = '#0F0E0D'; }, 640);
}
function syncCrate(ri) { unflip(); if (cur !== ri) { pos = target = ri; render(); } }
function stepCase(n) {
  if (!open) return;
  const fi = FLAT.findIndex(f => f.ri === open.ri && f.ci === open.ci), f = FLAT[(fi + n + FLAT.length) % FLAT.length];
  openCase(f.ri, f.ci);
}
$('#cPrev').onclick = () => stepCase(-1); $('#cNext').onclick = () => stepCase(1);

/* loops play only while on screen */
let io, fio;
function watchLoops() {
  io && io.disconnect();
  io = new IntersectionObserver(es => es.forEach(en => {
    const v = en.target;
    if (en.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); } else v.pause();
  }), { root: scroller, rootMargin: '200px 0px' });
  zine.querySelectorAll('video[data-src]').forEach(v => io.observe(v));
  fio && fio.disconnect();
  fio = new IntersectionObserver(es => es.forEach(en => {
    const el = en.target; let f = el.querySelector('iframe');
    if (en.isIntersecting) { if (blocked || f) return; f = document.createElement('iframe'); f.src = embedURL(el.dataset.live, false); f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.title = 'Film'; f.tabIndex = -1; f.onload = () => setTimeout(() => el.classList.add('live'), 700); el.appendChild(f); }
    else if (f) { f.remove(); el.classList.remove('live'); }
  }), { root: scroller, rootMargin: '150px 0px' });
  zine.querySelectorAll('[data-live]').forEach(el => fio.observe(el));
}
const pauseLoops = () => zine.querySelectorAll('video').forEach(v => v.pause());

/* clicks inside the case */
cs.addEventListener('click', e => {
  const b = e.target.closest('[data-case],[data-film],[data-zoom],[data-go]'); if (!b) return;
  if (b.dataset.go === 'crate') return closeCase();
  if (b.dataset.case) { const [ri, ci] = b.dataset.case.split('.').map(Number); return openCase(ri, ci); }
  if (b.dataset.film) { const [k, id, st] = b.dataset.film.split(':'); return film({ [k]: id, start: st }); }
  if (b.dataset.zoom) { $('#vImg').src = b.dataset.zoom; $('#viewer').hidden = false; }
});

/* =============================================================== FILMS
   Plays inline on the live site. If the page's security policy blocks
   the player (the claude.ai preview does), it falls back to a link out. */
let blocked = false;
document.addEventListener('securitypolicyviolation', e => { if (/youtube|vimeo/.test(e.blockedURI || '')) { blocked = true; document.querySelectorAll('[data-live] iframe').forEach(f => { f.parentNode.classList.remove('live'); f.remove(); }); fallback(); } });
let lastFilm = null;
function film(f) {
  if (!f) return; lastFilm = f;
  const st = $('#thStage'), url = f.y ? `https://www.youtube.com/watch?v=${f.y}${f.start ? '&t=' + f.start + 's' : ''}` : `https://vimeo.com/${f.v}`;
  const emb = embedURL(f.y ? 'y:' + f.y + (f.start ? ':' + f.start : '') : 'v:' + f.v, true);
  st.innerHTML = ''; $('#theater').hidden = false; f.url = url;
  if (blocked) return fallback();
  st.innerHTML = `<iframe src="${emb}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="Film"></iframe>`;
  $('#thOut').href = url; $('#thOut').textContent = (f.y ? 'YouTube' : 'Vimeo') + ' ↗';
}
function fallback() {
  if ($('#theater').hidden || !lastFilm) return;
  const f = lastFilm;
  $('#thStage').innerHTML = `<a class="th-go" href="${f.url}" target="_blank" rel="noopener"><span class="play"></span>Watch on ${f.y ? 'YouTube' : 'Vimeo'} ↗<small>This preview can’t play outside players. On the live site the film plays right here.</small></a>`;
}
$('#thClose').onclick = () => { $('#theater').hidden = true; $('#thStage').innerHTML = ''; };
$('#vClose').onclick = $('#viewer').onclick = () => { $('#viewer').hidden = true; };

/* =============================================================== INDEX */
$('#ixN').textContent = `${N} records · ${FLAT.length} cases`;
$('#ixList').innerHTML = R.map((r, i) => `<li class="ix-rec"><button class="ix-row" data-case="${i}.0"><img src="${r.cover}" alt="" loading="lazy"><span><b>${esc(r.brand)}</b><small>${esc(r.sub)} · ${esc(r.role)}</small></span><span class="ix-k">GW-${r.no}</span></button>
  ${r.cases.length > 1 ? `<div class="ix-vols">${r.cases.map((c, j) => `<button data-case="${i}.${j}">${c.vol} · ${esc(c.title)}</button>`).join('')}</div>` : ''}</li>`).join('');
$('#index').addEventListener('click', e => { const b = e.target.closest('[data-case]'); if (!b) return;
  const [ri, ci] = b.dataset.case.split('.').map(Number); $('#index').hidden = true; openCase(ri, ci, cs.hidden ? (syncCrate(ri), sleeves[ri]) : null); });

/* =============================================================== ABOUT (copy from georgewidodo.com/Info) */
const CV = [['FA2024—', 'Independent', 'Creative Director · Bali & Singapore'], ['2026—', 'Panté', 'Founder & Creative Director · Bali'],
  ['SP2023—FA2024', 'YouTube Creative Studio', 'Creative Lead · Singapore'], ['FA2021—SP2023', 'GOODSTUPH', 'Associate Content Director · Singapore'],
  ['SP2019—SU2021', 'Instrument', 'Associate Design Director · Portland, OR'], ['SP2018—SP2019', 'ROSEWOOD Creative', 'Associate Content Director · Venice, CA'],
  ['FA2017', 'Elephant', 'Visual Designer · Brooklyn, NY'], ['SU2017', 'Laundry Service', 'Art Director · Brooklyn, NY'], ['FA2016—SU2017', 'Annex88', 'Social Media Creative · New York, NY'],
  ['FA2015—FA2016', 'The Martin Agency', 'Creative · New York, NY'], ['SU2015', 'Mother', 'Art Director · New York, NY'], ['FA2014', 'MullenLowe US', 'Junior Art Director · El Segundo, CA'], ['SU2014', 'David&Goliath', 'Art Director Intern · El Segundo, CA']];
const ACC = [['SP2020', 'Webby Awards · 2 Honorees', 'Instagram Website Redesign, for Best Homepage & Use of Photography'], ['SP2015', 'D&AD New Blood · Yellow Pencil', 'Airbnb “Be Someone Else”'], ['FA2014', 'One Club Young Ones · Merit', 'Artbox.org'], ['SU2013', 'Addys Awards · Silver Medal', 'Nikon “Honeymoon”']];
const FACTS = [['about/space.webp', 'I once aspired to be a spacesuit designer.', 'I was first on a path to be a space engineer. I aced physics in high school. Until I discovered an old NASA archive book and became obsessed with spacesuit design. And then, advertising happened. (I know — it’s anti-climactic)'],
  ['about/chef.webp', 'I occasionally host personal, private dinners.', 'It started with my obsession with handcrafted pastas and cutting fish with Yanagibas. Then friends started inviting me to their kitchens to host private dinners.'],
  ['about/scent.webp', 'I am hyperosmic and collect fragrances.', 'Out of all five (six) senses — I connect most deeply with smell. I collect essences, candles, perfumes, incenses from all my travels around the world as sensory, sentimental artifacts.']];
let aboutBuilt = false;
function openAbout() {
  closeOverlays(true);
  const ab = $('#about');
  if (!aboutBuilt) { aboutBuilt = true; ab.innerHTML = `<figure class="ab-hero" style="margin:0"><img src="a/about/portrait.webp" alt="George Widodo"></figure>
    <div class="ab-in"><h2>George<br>Widodo</h2>
    <p class="ab-lede">Creative Director, Designer &amp; Filmmaker born in Jakarta, Indonesia. Now based in Bali &amp; Singapore.</p>
    <p class="ab-body">After working coast to coast across the USA (LA, NYC, TX, PDX), George is a cultural provocateur focused on breaking the traditions of advertising. He has a proven track record of winning new businesses, managing teams of creative pioneers, and creating for multiple media &amp; platforms. His work across entertainment, music, tech, fashion and autos, combined with agency &amp; client-side experience, has sparked multiple industry firsts. *Down to fly, or work remotely.</p>
    <div class="ab-hi"><a href="mailto:hello@georgewidodo.com">hello@georgewidodo.com</a><a href="https://www.linkedin.com/in/georgewidodo/" target="_blank" rel="noopener">LinkedIn ↗</a></div>
    <section class="ab-sec"><h3>Random facts (in his own words)</h3><div class="facts">${FACTS.map(([s, b, p]) => `<article class="fact"><img src="a/${s}" alt="" loading="lazy"><div><b>${b}</b><p>${p}</p></div></article>`).join('')}</div></section>
    <section class="ab-sec"><h3>Experience</h3><ol class="cv">${CV.map(([y, b, e]) => `<li><span>${y}</span><b>${b}</b><em>${e}</em></li>`).join('')}</ol></section>
    <section class="ab-sec"><h3>Accolades</h3><ol class="cv">${ACC.map(([y, b, e]) => `<li><span>${y}</span><b>${b}</b><em>${e}</em></li>`).join('')}</ol></section>
    <section class="ab-sec"><h3>Education</h3><ol class="cv"><li><span>FA2012—SP2015</span><b>ArtCenter College of Design</b><em>BFA Advertising, with honors · Pasadena, CA</em></li><li><span>FA2010—SU2012</span><b>Otis College of Art &amp; Design</b><em>Communication Arts · Los Angeles, CA</em></li></ol></section></div>`; }
  ab.hidden = false; ab.scrollTop = 0; setPill('about');
}

/* =============================================================== PILL */
function setPill(k, keep) { document.querySelectorAll('#pill button').forEach(b => b.classList.toggle('on', b.dataset.go === k)); }
function closeOverlays(keepCase) { $('#index').hidden = true; $('#about').hidden = true; if (!keepCase) {} }
$('#pill').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const k = b.dataset.go;
  if (k === 'crate') { $('#index').hidden = true; $('#about').hidden = true; closeCase(); setPill('crate'); }
  if (k === 'index') { const on = $('#index').hidden; $('#about').hidden = true; $('#index').hidden = !on; setPill(on ? 'index' : 'crate'); }
  if (k === 'about') { if ($('#about').hidden) openAbout(); else { $('#about').hidden = true; setPill('crate'); } }
});

/* keys */
zine.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.film) e.target.click(); });
addEventListener('keydown', e => {
  if (!$('#viewer').hidden || !$('#theater').hidden) { if (e.key === 'Escape') { $('#viewer').hidden = true; $('#thClose').click(); } return; }
  if (!cs.hidden) { if (e.key === 'Escape') closeCase(); if (e.key === 'ArrowRight') stepCase(1); if (e.key === 'ArrowLeft') stepCase(-1); return; }
  if (!$('#index').hidden || !$('#about').hidden) { if (e.key === 'Escape') { $('#index').hidden = $('#about').hidden = true; setPill('crate'); } return; }
  if (e.key === 'ArrowDown') step(1); else if (e.key === 'ArrowUp') step(-1);
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') setFlip(cur, flipped !== cur);
  else if (e.key === 'Enter') openCase(cur, 0, sleeves[cur]);
});

/* theme + clock (Bali time) */
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', hour12: false });
let manual = false;
function clock() { const t = fmt.format(new Date()); $('#clock').textContent = 'Bali ' + t; if (!manual) { const h = +t.slice(0, 2); app.dataset.theme = h >= 6 && h < 18 ? 'day' : 'night'; } }
$('#theme').onclick = () => { manual = true; app.dataset.theme = app.dataset.theme === 'night' ? 'day' : 'night'; };
clock(); setInterval(clock, 30000);

/* boot */
addEventListener('resize', render);
pos = -1.4; target = 0; render(); kick();
// teach the swipe once: nudge the record and show the hint
setTimeout(() => { $('#hint').classList.add('on'); if (!store.flipped) { sleeves[cur].classList.add('nudge'); setTimeout(() => sleeves[cur].classList.remove('nudge'), 1700); } }, 1300);
// deep link: #ichigo etc.
const h = location.hash.slice(1); if (h) { const f = FLAT.find(f => R[f.ri].cases[f.ci].id === h); if (f) setTimeout(() => openCase(f.ri, f.ci, sleeves[f.ri]), 300); }
window.__gw = { R, openCase, closeCase, goTo, setFlip, film, stepCase, openAbout, state: () => ({ pos, cur, flipped, open }) };
/* GW Records: tap the logo and it bounces round the screen like a DVD screensaver */
(() => {
  const COLS = ['#FF3B2F', '#F2C14E', '#7FD7FF', '#FF5FB0', '#5EE08A', '#F3EAD8'];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let fly = null, src = null, raf = 0, x = 0, y = 0, vx = 150, vy = 115, ci = 0, last = 0;
  const step = t => {
    const dt = Math.min(.05, (t - (last || t)) / 1000); last = t;
    const W = innerWidth - fly.offsetWidth, H = innerHeight - fly.offsetHeight;
    x += vx * dt; y += vy * dt; let hit = false;
    if (x <= 0 || x >= W) { vx = -vx; x = Math.max(0, Math.min(W, x)); hit = true; }
    if (y <= 0 || y >= H) { vy = -vy; y = Math.max(0, Math.min(H, y)); hit = true; }
    if (hit) fly.style.setProperty('--neon', COLS[ci = (ci + 1) % COLS.length]);
    fly.style.transform = `translate(${x}px,${y}px)`;
    raf = requestAnimationFrame(step);
  };
  const land = () => {
    cancelAnimationFrame(raf);
    const r = src.getBoundingClientRect(), f = fly, s = src;
    f.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1)';
    f.style.transform = `translate(${r.left}px,${r.top}px)`;
    fly = null;
    setTimeout(() => { f.remove(); s.classList.remove('gwr-ghost'); }, 720);
  };
  const launch = logo => {
    if (fly || still.matches) return;
    src = logo; const r = logo.getBoundingClientRect();
    fly = logo.cloneNode(true); fly.classList.add('fly'); fly.style.setProperty('--s', getComputedStyle(logo).getPropertyValue('--s').trim());
    fly.setAttribute('role', 'button'); fly.tabIndex = 0; fly.setAttribute('aria-label', 'Bouncing GW Records logo. Tap to send it home.');
    x = r.left; y = r.top; vx = (Math.random() < .5 ? -1 : 1) * 150; vy = 115; last = 0;
    fly.style.transform = `translate(${x}px,${y}px)`;
    document.body.appendChild(fly); logo.classList.add('gwr-ghost');
    fly.addEventListener('click', land);
    raf = requestAnimationFrame(step);
  };
  ['#wallSign', '#brand'].forEach(sel => { const b = $(sel); if (b) b.addEventListener('click', e => { e.preventDefault(); fly ? land() : launch(b.querySelector('.gwr')); }); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && fly) land(); });
})();
})();
