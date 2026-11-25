/*! Showcase — recorrido automático de la página para grabar demos.
 *  Botón discreto en el footer → recarga con ?showcase, deja correr el loader y recorre
 *  cada sección: pausa 1 s, activa los hover de sus elementos (~0,85 s c/u), pestañas y
 *  filtros, y termina en el footer. Control flotante pausa / reanuda / cierra.
 *  Sin dependencias, compatible con CSP script-src 'self'.
 */
(() => {
  "use strict";
  if (window.__showcase) return;
  window.__showcase = true;

  const PARAM = "showcase";
  const HOVER = "sc-hover";
  const T = { section: 1000, stop: 750, hover: 850, click: 900, heroExtra: 600 };
  const qs = new URLSearchParams(location.search);
  const active = qs.has(PARAM);

  /* ---------- styles (constructable sheet: no CSP issues) ---------- */
  // Constructable stylesheets (Chrome 73+, Firefox 101+, Safari 16.4+) with <style> fallback
  const canAdopt = (() => { try { return "adoptedStyleSheets" in document && typeof CSSStyleSheet === "function" && "replaceSync" in CSSStyleSheet.prototype && !!new CSSStyleSheet(); } catch (e) { return false; } })();
  const sheet = canAdopt ? new CSSStyleSheet() : null;
  let styleEl = null;
  const baseCSS = `
  .sc-launch{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:.45em;min-height:26px;margin:.35em .6em;padding:.3em .9em;border-radius:999px;
    font:600 10.5px/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:inherit;opacity:1;cursor:pointer;
    box-shadow:inset 0 0 0 1px currentColor;transition:box-shadow .3s,transform .3s;vertical-align:middle;white-space:nowrap}
  .sc-launch:hover,.sc-launch:focus-visible{transform:translateY(-1px);box-shadow:inset 0 0 0 1.5px currentColor}
  .sc-launch:focus-visible{outline:2px solid currentColor;outline-offset:3px}
  .sc-launch svg{width:.95em;height:.95em;fill:currentColor}
  .sc-ctrl{position:fixed;right:16px;bottom:16px;z-index:2147483000;display:flex;align-items:center;gap:4px;padding:5px;border-radius:999px;
    background:rgba(18,18,20,.62);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 10px 30px -10px rgba(0,0,0,.6),inset 0 0 0 1px rgba(255,255,255,.14);
    transition:opacity .5s,transform .5s;font:600 11px/1 system-ui,sans-serif;color:#fff}
  .sc-ctrl.is-gone{opacity:0;transform:translateY(12px);pointer-events:none}
  .sc-ctrl button{all:unset;box-sizing:border-box;display:grid;place-items:center;width:38px;height:38px;border-radius:50%;cursor:pointer;color:#fff;transition:background .25s}
  .sc-ctrl button:hover,.sc-ctrl button:focus-visible{background:rgba(255,255,255,.16)}
  .sc-ctrl button:focus-visible{outline:2px solid #fff;outline-offset:1px}
  .sc-ctrl svg{width:15px;height:15px;fill:currentColor}
  .sc-ctrl .sc-x svg{width:12px;height:12px}
  .sc-ctrl .sc-bar{width:46px;height:3px;margin:0 6px 0 2px;border-radius:3px;background:rgba(255,255,255,.2);overflow:hidden}
  .sc-ctrl .sc-bar i{display:block;height:100%;width:0;background:#fff;transition:width .4s}
  html.sc-running{scroll-behavior:auto!important}
  html.sc-running ::-webkit-scrollbar{width:0;height:0}
  `;
  let hoverCSS = "";
  const applyCSS = () => {
    const css = baseCSS + hoverCSS;
    if (sheet) { try { sheet.replaceSync(css); return; } catch (e) { /* fall through */ } }
    if (!styleEl) { styleEl = document.createElement("style"); styleEl.setAttribute("data-showcase", ""); (document.head || document.documentElement).appendChild(styleEl); }
    styleEl.textContent = css;
  };
  if (sheet) { try { document.adoptedStyleSheets = Array.prototype.slice.call(document.adoptedStyleSheets).concat(sheet); } catch (e) { /* ignore */ } }
  applyCSS();

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="4" width="4.5" height="16" rx="1.2"/><rect x="14" y="4" width="4.5" height="16" rx="1.2"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.3 5.3a1 1 0 0 1 1.4 0L12 10.6l5.3-5.3a1 1 0 1 1 1.4 1.4L13.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4L12 13.4l-5.3 5.3a1 1 0 0 1-1.4-1.4l5.3-5.3-5.3-5.3a1 1 0 0 1 0-1.4Z"/></svg>',
  };

  /* ---------- footer launch button ---------- */
  const footer = () => { const all = [...document.querySelectorAll("footer")]; return all.filter((f) => !f.closest("blockquote, figure, article, li")).pop() || all.pop(); };
  const placeLaunch = () => {
    const f = footer();
    if (!f || f.querySelector(".sc-launch")) return !!f;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "sc-launch";
    b.innerHTML = ICON.play + "<span>Showcase</span>";
    b.title = "Ver un recorrido automático por toda la página";
    b.addEventListener("click", () => {
      const u = new URL(location.href);
      u.searchParams.set(PARAM, "1");
      u.hash = "";
      location.href = u.toString();
    });
    // the lowest line of text in the footer (usually the © row)
    const hasText = (e) => Array.prototype.some.call(e.childNodes, (n) => n.nodeType === 3 && n.textContent.trim());
    const decorative = (e) => !!e.closest('[aria-hidden="true"]') || getComputedStyle(e).position === "absolute";
    const cands = [...f.querySelectorAll("p, small, span, div, li")].filter((e) => hasText(e) && e.offsetParent !== null && !e.closest("a, button, h1, h2, h3, h4") && !decorative(e));
    // 1st choice: the © line; otherwise the lowest line of text
    let host = cands.filter((e) => Array.prototype.some.call(e.childNodes, (n) => n.nodeType === 3 && /©|\(c\)|copyright/i.test(n.textContent))).pop() || null;
    if (!host) {
      let low = -Infinity;
      cands.forEach((e) => { const r = e.getBoundingClientRect(); if (r.bottom >= low - 2) { low = Math.max(low, r.bottom); host = e; } });
    }
    // never drop it inside an inline element (e.g. the <span> with the year)
    while (host && host !== f && /^(SPAN|SMALL|B|STRONG|EM|I|TIME|A)$/.test(host.tagName) && f.contains(host.parentElement) && getComputedStyle(host).display.indexOf("inline") === 0) host = host.parentElement;
    if (host) host.append(" ", b); else f.append(b);
    return true;
  };
  const ready = (fn) => (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn());
  ready(() => {
    if (!placeLaunch()) {
      // frameworks that render later (React/Next): keep trying briefly
      const mo = new MutationObserver(() => { if (placeLaunch()) mo.disconnect(); });
      mo.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => mo.disconnect(), 15000);
    }
  });

  if (!active) return;

  /* ================== SHOWCASE RUN ================== */
  try { history.scrollRestoration = "manual"; } catch (e) { /* ignore */ }
  const de = document.documentElement;
  const prevSB = [de.style.scrollBehavior, document.body ? document.body.style.scrollBehavior : ""];
  // native smooth scrolling (Safari 15.4+, Chrome, Firefox) would fight our per-frame scrolling
  de.style.scrollBehavior = "auto";
  if (document.body) document.body.style.scrollBehavior = "auto";
  scrollTo(0, 0);
  de.classList.add("sc-running");

  let paused = false, stopped = false;
  class Stop extends Error {}
  const frame = () => new Promise((r) => requestAnimationFrame(r));
  const check = () => { if (stopped) throw new Stop(); };
  const sleep = async (ms) => {
    let left = ms, last = performance.now();
    while (left > 0) {
      await frame(); check();
      const now = performance.now();
      if (!paused) left -= now - last;
      last = now;
    }
  };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const vh = () => (window.visualViewport ? window.visualViewport.height : innerHeight);
  const maxY = () => Math.max(0, (document.scrollingElement || document.documentElement).scrollHeight - vh());
  const scrollToY = async (target) => {
    target = Math.max(0, Math.min(maxY(), Math.round(target)));
    const from = scrollY, d = target - from;
    if (Math.abs(d) < 2) return;
    const dur = Math.min(2400, Math.max(900, 600 + Math.abs(d) * 0.55));
    let t = 0, last = performance.now();
    while (t < dur) {
      await frame(); check();
      const now = performance.now();
      if (!paused) t += now - last;
      last = now;
      scrollTo(0, from + d * ease(Math.min(1, t / dur)));
    }
    scrollTo(0, target);
  };

  /* ---------- hover cloning: every :hover rule also matches .sc-hover ---------- */
  const hoverBases = new Set();
  const splitSel = (s) => { const out = []; let depth = 0, cur = ""; for (const ch of s) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === "," && !depth) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
  const cloneRules = (rules) => {
    let out = "";
    for (const r of Array.prototype.slice.call(rules)) {
      try {
        if (r.selectorText !== undefined && r.selectorText.includes(":hover")) {
          const sels = splitSel(r.selectorText).filter((s) => s.includes(":hover"));
          sels.forEach((s) => { const base = s.slice(0, s.indexOf(":hover")).trim(); if (base && !/[>+~(,]$/.test(base)) hoverBases.add(base); });
          out += `${sels.map((s) => s.replace(/:hover/g, "." + HOVER)).join(",")}{${r.style.cssText}}`;
        }
        if (r.cssRules && r.cssRules.length) {
          const inner = cloneRules(r.cssRules);
          if (!inner) continue;
          if (typeof CSSMediaRule !== "undefined" && r instanceof CSSMediaRule) out += `@media ${r.conditionText || (r.media && r.media.mediaText) || "all"}{${inner}}`;
          else if (typeof CSSSupportsRule !== "undefined" && r instanceof CSSSupportsRule) out += `@supports ${r.conditionText}{${inner}}`;
          else if (typeof CSSLayerBlockRule !== "undefined" && r instanceof CSSLayerBlockRule) out += `@layer ${r.name}{${inner}}`;
          else if (typeof CSSContainerRule !== "undefined" && r instanceof CSSContainerRule) out += `@container ${r.conditionText}{${inner}}`;
          else if (r.selectorText === undefined) out += inner;
        }
      } catch (e) { /* skip odd rule */ }
    }
    return out;
  };
  const buildHover = () => {
    let css = "";
    for (const s of Array.prototype.slice.call(document.styleSheets)) {
      if (s === sheet || (styleEl && s.ownerNode === styleEl)) continue;
      try { css += cloneRules(s.cssRules); } catch (e) { /* cross-origin sheet (e.g. Google Fonts) */ }
    }
    hoverCSS = css; applyCSS();
  };

  /* ---------- control ---------- */
  const ctrl = document.createElement("div");
  ctrl.className = "sc-ctrl";
  ctrl.setAttribute("role", "group");
  ctrl.setAttribute("aria-label", "Control del showcase");
  ctrl.innerHTML = `<button type="button" class="sc-pp" aria-label="Pausar showcase">${ICON.pause}</button><span class="sc-bar" aria-hidden="true"><i></i></span><button type="button" class="sc-x" aria-label="Cerrar showcase">${ICON.close}</button>`;
  const pp = ctrl.querySelector(".sc-pp"), bar = ctrl.querySelector(".sc-bar i");
  const setPaused = (v) => { paused = v; pp.innerHTML = v ? ICON.play : ICON.pause; pp.setAttribute("aria-label", v ? "Reanudar showcase" : "Pausar showcase"); };
  pp.addEventListener("click", () => setPaused(!paused));
  ctrl.querySelector(".sc-x").addEventListener("click", () => { stopped = true; finish(true); });
  addEventListener("keydown", (e) => { if (e.key === " " && document.activeElement === document.body) { e.preventDefault(); setPaused(!paused); } if (e.key === "Escape") { stopped = true; finish(true); } });
  const placeCtrl = () => {
    // sit above any fixed element living in the bottom-right corner (e.g. WhatsApp float),
    // even if it is still hidden (scale 0 / opacity 0) and only appears after the hero
    ctrl.style.bottom = "16px";
    let lift = 0;
    const all = document.body ? document.body.getElementsByTagName("*") : [];
    for (let i = 0; i < all.length; i++) {
      const el = all[i];
      if (el === ctrl || ctrl.contains(el)) continue;
      const cs = getComputedStyle(el);
      if (cs.position !== "fixed" || cs.display === "none") continue;
      const r = parseFloat(cs.right), bt = parseFloat(cs.bottom), h = el.offsetHeight, w = el.offsetWidth;
      if (isNaN(r) || isNaN(bt) || r > 140 || bt > 220 || !h || h > innerHeight * 0.5 || w > innerWidth * 0.6) continue;
      lift = Math.max(lift, bt + h - 16 + 10);
    }
    if (lift) { ctrl.style.bottom = `${lift + 16}px`; return; }
    for (let y = innerHeight - 24; y > innerHeight - 200; y -= 16) {
      const els = (document.elementsFromPoint ? document.elementsFromPoint(innerWidth - 40, y) : [document.elementFromPoint(innerWidth - 40, y)]).filter((e) => e && !ctrl.contains(e));
      const fixed = els.find((e) => { for (let n = e; n && n !== document.body; n = n.parentElement) { if (getComputedStyle(n).position === "fixed") { const r = n.getBoundingClientRect(); return r.width < innerWidth * 0.6 && r.height < innerHeight * 0.5; } } return false; });
      if (fixed) lift = innerHeight - y + 8; else if (lift) break;
    }
    if (lift) ctrl.style.bottom = `${lift + 16}px`;
  };

  let finished = false;
  const finish = (abort) => {
    if (finished) return; finished = true;
    document.querySelectorAll("." + HOVER).forEach((e) => e.classList.remove(HOVER));
    de.classList.remove("sc-running");
    de.style.scrollBehavior = prevSB[0];
    if (document.body) document.body.style.scrollBehavior = prevSB[1];
    const u = new URL(location.href); u.searchParams.delete(PARAM);
    try { history.replaceState(history.state, "", u.pathname + u.search + u.hash); } catch (e) { /* ignore */ }
    bar.style.width = "100%";
    setTimeout(() => ctrl.classList.add("is-gone"), abort ? 0 : 1600);
    setTimeout(() => ctrl.remove(), abort ? 600 : 2300);
  };

  /* ---------- helpers ---------- */
  const isFixed = (el) => { for (let n = el; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === "fixed" || p === "sticky") return true; } return false; };
  const visible = (el) => { const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); return r.width > 8 && r.height > 8; };
  const inView = (el, margin = 40) => { const r = el.getBoundingClientRect(); return r.top >= margin && r.bottom <= innerHeight - margin * 0.5 && r.left >= -2 && r.right <= innerWidth + 2; };
  const overlayUp = () => {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    for (let n = document.elementFromPoint(cx, cy); n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.position === "fixed" && +cs.opacity > 0.05 && cs.visibility !== "hidden") {
        const r = n.getBoundingClientRect();
        if (r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.9) return true;
      }
    }
    return false;
  };
  const fire = (el, type) => {
    const r = el.getBoundingClientRect();
    const o = { bubbles: !/enter|leave/.test(type), cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, view: window };
    try {
      if (type.indexOf("pointer") === 0) {
        if (typeof PointerEvent !== "function") return;
        el.dispatchEvent(new PointerEvent(type, Object.assign({}, o, { pointerType: "mouse", isPrimary: true, pointerId: 1 })));
      } else el.dispatchEvent(new MouseEvent(type, o));
    } catch (e) { /* ignore */ }
  };
  const hoverOn = (el) => { el.classList.add(HOVER); ["pointerover", "pointerenter", "mouseover", "mouseenter", "pointermove", "mousemove"].forEach((t) => fire(el, t)); };
  const hoverOff = (el) => { el.classList.remove(HOVER); ["pointerout", "pointerleave", "mouseout", "mouseleave"].forEach((t) => fire(el, t)); };

  const done = new Set();
  const clicked = new Set();
  let targets = [];
  const collectTargets = () => {
    const set = new Set();
    hoverBases.forEach((sel) => { try { document.querySelectorAll(sel).forEach((e) => set.add(e)); } catch (e) { /* invalid */ } });
    document.querySelectorAll(".group, [data-hover], .magnetic").forEach((e) => set.add(e));
    const ignore = (e) => e === document.body || e === document.documentElement || e.closest("header, nav, .sc-ctrl, .sc-launch, [hidden], dialog") || ["HTML", "BODY", "MAIN", "SECTION", "FOOTER", "INPUT", "SELECT", "TEXTAREA", "IMG", "SVG", "PATH", "USE"].includes(e.tagName.toUpperCase());
    targets = [...set].filter((e) => !ignore(e));
  };
  const pickInView = (scope, max = 4) => {
    const vw = innerWidth * innerHeight;
    const cands = targets.filter((e) => scope.contains(e) && !done.has(e) && ![...done].some((d) => d.contains(e)) && !isFixed(e) && visible(e) && inView(e) && (() => { const r = e.getBoundingClientRect(); return r.width * r.height < vw * 0.6; })());
    // keep outermost hover targets (hovering a card also lights up its children)
    const outer = cands.filter((e) => !cands.some((o) => o !== e && o.contains(e)));
    outer.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    if (outer.length <= max) return outer;
    const step = outer.length / max;
    return Array.from({ length: max }, (_, i) => outer[Math.floor(i * step)]);
  };
  const runHovers = async (scope, max) => {
    for (const el of pickInView(scope, max)) {
      check(); done.add(el); hoverOn(el); await sleep(T.hover); hoverOff(el); await sleep(120);
    }
  };
  const clickGroups = async (scope) => {
    const groups = new Map();
    scope.querySelectorAll('[role="tab"], [role="radio"], button[aria-pressed]').forEach((b) => {
      if (!visible(b) || !inView(b, 20) || b.closest("header, nav, [hidden]")) return;
      const g = b.closest('[role="tablist"], [role="radiogroup"], [role="group"]') || b.parentElement;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(b);
    });
    for (const [g, btns] of groups) {
      if (btns.length < 2 || btns.length > 7 || clicked.has(g)) continue;
      clicked.add(g);
      const isOn = (b) => b.getAttribute("aria-selected") === "true" || b.getAttribute("aria-checked") === "true" || b.getAttribute("aria-pressed") === "true";
      const start = btns.find(isOn) || btns[0];
      for (const b of btns) { if (b === start) continue; check(); b.click(); await sleep(T.click); }
      start.click(); await sleep(400);
    }
  };
  const topLevelSections = () => {
    const root = document.querySelector("main") || document.body;
    const secs = [...root.querySelectorAll("section")].filter((s) => !s.parentElement.closest("section") && visible(s));
    return secs.length ? secs : [...root.children].filter((e) => visible(e) && e.getBoundingClientRect().height > 200);
  };
  const headerOffset = () => { const h = document.querySelector("header"); if (!h) return 0; const cs = getComputedStyle(h); return cs.position === "fixed" || cs.position === "sticky" ? Math.min(90, h.getBoundingClientRect().height) * 0.5 : 0; };
  const absTop = (el) => el.getBoundingClientRect().top + scrollY;

  /* ---------- the tour ---------- */
  const run = async () => {
    // load everything up front so nothing pops in on camera
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager"));
    document.body.append(ctrl);
    placeCtrl();
    const t0 = performance.now();
    await new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r, { once: true })));
    while (overlayUp() && performance.now() - t0 < 7000) await sleep(100);
    scrollTo(0, 0);
    buildHover(); collectTargets(); placeCtrl();

    const secs = topLevelSections();
    const foot = footer();
    const total = secs.length + 1;
    for (let i = 0; i < secs.length; i++) {
      const s = secs[i];
      bar.style.width = `${(i / total) * 100}%`;
      if (i > 0) await scrollToY(absTop(s) - headerOffset());
      await sleep(T.section + (i === 0 ? T.heroExtra : 0));
      await runHovers(s, 4);
      await clickGroups(s);
      // long sections: keep paging through them
      let guard = 0;
      while (absTop(s) + s.offsetHeight > scrollY + innerHeight + 60 && guard++ < 12) {
        const next = Math.min(scrollY + innerHeight * 0.72, absTop(s) + s.offsetHeight - innerHeight + 40);
        if (next <= scrollY + 4) break;
        await scrollToY(next);
        await sleep(T.stop);
        await runHovers(s, 3);
        await clickGroups(s);
      }
    }
    bar.style.width = `${((total - 1) / total) * 100}%`;
    await scrollToY(maxY());
    await sleep(T.section);
    if (foot) await runHovers(foot, 3);
    finish(false);
  };
  ready(() => run().catch((e) => { if (!(e instanceof Stop)) console.warn("showcase:", e); finish(true); }));
})();
