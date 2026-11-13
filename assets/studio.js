/* Flex by Tsiry — studio de posts : les neuf visuels sont dessinés ici, à la taille exacte de chaque réseau,
   à partir des photographies de la marque. Ils s'affichent dans une maquette du réseau et se téléchargent en PNG. */
(function () {
  const F = 'Montserrat, "Helvetica Neue", Arial, sans-serif';
  const SRC = { hero: 'assets/img/hero.jpg', lx: 'assets/img/lx-mont-blanc.jpg', cv: 'assets/img/st-courchevel.jpg', mg: 'assets/img/st-megeve.jpg', vd: 'assets/img/st-valdisere.jpg' };
  const I = {};
  const loadImg = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = s; });
  const ready = Promise.all([
    ...Object.entries(SRC).map(async ([k, s]) => { I[k] = await loadImg(s); }),
    ...['300 40px', 'italic 300 40px', '400 20px', '500 20px', '200 40px'].map(f => document.fonts.load(f + ' Montserrat'))
  ]);

  /* ---------- Outils de dessin ---------- */
  const GOLD = '#C8AE84', GOLD2 = '#A6875A', INK = '#191815', IVORY = '#F5F1E8';
  function cover(c, img, x, y, w, h, o = {}) {
    if (!img) return;
    const z = o.zoom || 1, s = Math.max(w / img.width, h / img.height) * z, sw = w / s, sh = h / s;
    const sx = Math.max(0, Math.min(img.width - sw, (img.width - sw) * (o.fx ?? .5))), sy = Math.max(0, Math.min(img.height - sh, (img.height - sh) * (o.fy ?? .5)));
    c.save(); if (o.filter) c.filter = o.filter; c.drawImage(img, sx, sy, sw, sh, x, y, w, h); c.restore();
  }
  function lin(c, x0, y0, x1, y1, stops, rect) { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); c.fillStyle = g; c.fillRect(...rect); }
  function font(c, o) { c.font = (o.italic ? 'italic ' : '') + (o.weight || 300) + ' ' + o.size + 'px ' + F; }
  function tracked(c, str, x, y, tr, align) {
    const ws = [...str].map(ch => c.measureText(ch).width); const total = ws.reduce((a, b) => a + b, 0) + tr * (str.length - 1);
    let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x; c.textAlign = 'left';
    [...str].forEach((ch, i) => { c.fillText(ch, cx, y); cx += ws[i] + tr; }); return total;
  }
  function wrap(c, str, maxW) {
    const out = [];
    str.split('\n').forEach(par => { let line = ''; par.split(' ').forEach(w => { const t = line ? line + ' ' + w : w; if (c.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; }); out.push(line); });
    return out;
  }
  function para(c, str, x, y, o) {
    font(c, o); c.fillStyle = o.color || '#fff'; c.textAlign = o.align || 'left'; c.textBaseline = 'alphabetic';
    const lines = wrap(c, str, o.maxW || 9999), lh = o.lh || o.size * 1.2; lines.forEach((l, i) => c.fillText(l, x, y + i * lh)); return y + lines.length * lh;
  }
  function line1(c, str, x, y, o) { font(c, o); c.fillStyle = o.color || '#fff'; c.textAlign = o.align || 'left'; c.textBaseline = 'alphabetic'; c.fillText(str, x, y); }
  function label(c, str, x, y, size, col, align, tr) { font(c, { size, weight: 500 }); c.fillStyle = col; c.textBaseline = 'alphabetic'; return tracked(c, str.toUpperCase(), x, y, tr ?? size * .3, align || 'left'); }
  function mark(c, x, y, r, col, ring) {
    c.save(); c.translate(x - r, y - r); const k = r * 2 / 40; c.scale(k, k);
    c.strokeStyle = ring || GOLD; c.lineWidth = 1.3; c.beginPath(); c.arc(20, 20, 19, 0, 6.283); c.stroke();
    c.fillStyle = col; c.beginPath(); c.moveTo(7, 28); c.lineTo(16, 15); c.lineTo(21, 21); c.lineTo(25, 16); c.lineTo(33, 28); c.closePath(); c.fill(); c.restore();
  }
  function brand(c, cx, y, s, col, sub) {
    mark(c, cx, y, s * .62, col); font(c, { size: s, weight: 300 }); c.fillStyle = col; tracked(c, 'FLEX', cx, y + s * 1.9, s * .42, 'center');
    font(c, { size: s * .3, weight: 400 }); c.fillStyle = sub || col; tracked(c, 'BY TSIRY', cx, y + s * 2.5, s * .2, 'center');
  }
  function brandRow(c, x, y, s, col) { mark(c, x + s, y, s, col); font(c, { size: s * .62, weight: 400 }); c.fillStyle = col; c.textBaseline = 'middle'; tracked(c, 'FLEX BY TSIRY', x + s * 2.7, y, s * .16, 'left'); c.textBaseline = 'alphabetic'; }
  function pill(c, x, y, str, o) {
    font(c, { size: o.size, weight: 500 }); const tr = o.size * .22, w = [...str].reduce((a, ch) => a + c.measureText(ch).width + tr, -tr) + o.pad * 2, h = o.size * 2.3;
    const px = o.align === 'center' ? x - w / 2 : x; c.fillStyle = o.bg; c.beginPath(); c.roundRect ? c.roundRect(px, y - h / 2, w, h, h / 2) : c.rect(px, y - h / 2, w, h); c.fill();
    c.fillStyle = o.color; c.textBaseline = 'middle'; tracked(c, str.toUpperCase(), px + o.pad, y + 1, tr, 'left'); c.textBaseline = 'alphabetic'; return w;
  }
  function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
  function stars(c, W, maxY, n, seed) { const r = rng(seed); c.fillStyle = '#fff'; for (let i = 0; i < n; i++) { c.globalAlpha = .25 + r() * .7; const s = .8 + r() * 2.2; c.fillRect(r() * W, r() * maxY, s, s); } c.globalAlpha = 1; }
  function arrow(c, x, y, s, col) { c.strokeStyle = col; c.lineWidth = 3; c.beginPath(); c.moveTo(x - s, y); c.lineTo(x + s, y); c.moveTo(x + s * .45, y - s * .55); c.lineTo(x + s, y); c.lineTo(x + s * .45, y + s * .55); c.stroke(); }

  /* ---------- Les visuels ---------- */
  const GRADE = { gold: 'sepia(.6) saturate(1.7) hue-rotate(-10deg) brightness(1.04) contrast(1.04)', rose: 'sepia(.45) saturate(2) hue-rotate(-42deg) brightness(1.02) contrast(1.05)', ice: 'saturate(1.2) hue-rotate(8deg) brightness(1.15) contrast(1.05)' };

  const p1 = (c, W, H) => {
    cover(c, I.hero, 0, 0, W, H, { fx: .46 });
    lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.6)'], [.34, 'rgba(5,7,10,0)'], [.7, 'rgba(5,7,10,0)'], [1, 'rgba(5,7,10,.88)']], [0, 0, W, H]);
    stars(c, W, H * .28, 80, 11);
    brand(c, W / 2, 150, 44, '#fff', GOLD);
    line1(c, 'Vos vacances,', 90, 520, { size: 116, weight: 300 });
    line1(c, 'notre priorité.', 90, 650, { size: 116, weight: 300, italic: true, color: GOLD });
    c.fillStyle = 'rgba(255,255,255,.1)'; c.beginPath(); c.arc(W / 2, H * .6, 100, 0, 6.283); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 5; c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(W / 2 - 26, H * .6 - 40); c.lineTo(W / 2 + 46, H * .6); c.lineTo(W / 2 - 26, H * .6 + 40); c.closePath(); c.fill();
    pill(c, W / 2, H - 250, 'Leçons de ski privées sur mesure', { size: 30, bg: 'rgba(245,241,232,.94)', color: INK, pad: 40, align: 'center' });
    label(c, 'Courchevel · Megève · Val d\'Isère', W / 2, H - 150, 26, '#fff', 'center');
  };
  const p2 = (c, W, H) => {
    c.fillStyle = IVORY; c.fillRect(0, 0, W, H); cover(c, I.lx, 640, 0, W - 640, H, { fx: .5, fy: .35 });
    c.fillStyle = GOLD2; c.fillRect(640, 0, 3, H);
    label(c, 'Le fondateur', 70, 118, 17, GOLD2);
    line1(c, 'Pourquoi', 70, 214, { size: 70, weight: 300, color: INK });
    line1(c, 'j\'ai créé', 70, 292, { size: 70, weight: 300, color: INK });
    line1(c, 'Flex.', 70, 370, { size: 70, weight: 300, italic: true, color: GOLD2 });
    c.fillStyle = GOLD2; c.fillRect(70, 410, 64, 3);
    para(c, 'Leçons de ski privées sur mesure pour les familles, de Courchevel à Val d\'Isère.', 70, 462, { size: 22, weight: 400, color: '#3B3934', maxW: 480, lh: 33 });
    brandRow(c, 66, H - 62, 22, INK);
  };
  const p3 = (c, W, H) => {
    cover(c, I.cv, 0, 0, W, H, { fx: .5, fy: .55 });
    lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.55)'], [.3, 'rgba(5,7,10,.05)'], [.5, 'rgba(5,7,10,.15)'], [1, 'rgba(5,7,10,.92)']], [0, 0, W, H]);
    pill(c, 90, 190, 'Astuce de moniteur', { size: 28, bg: 'rgba(245,241,232,.94)', color: INK, pad: 36 });
    font(c, { size: 640, weight: 200 }); c.lineWidth = 4; c.strokeStyle = GOLD; c.textBaseline = 'alphabetic'; c.textAlign = 'left'; c.strokeText('3', 70, 960);
    const y = para(c, 'erreurs des parents', 90, 1180, { size: 92, weight: 300, maxW: 900, lh: 106 });
    line1(c, 'le premier jour', 90, y, { size: 92, weight: 300, italic: true, color: GOLD }); line1(c, 'de ski.', 90, y + 106, { size: 92, weight: 300, italic: true, color: GOLD });
    brandRow(c, 86, H - 130, 30, '#fff');
  };
  function daySlide(img, grade, fx, fy, day, txt, n, tot) {
    return (c, W, H) => {
      cover(c, I[img], 0, 0, W, H, { fx, fy, filter: GRADE[grade] });
      lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.5)'], [.3, 'rgba(5,7,10,0)'], [.5, 'rgba(5,7,10,.2)'], [1, 'rgba(5,7,10,.9)']], [0, 0, W, H]);
      label(c, 'Une semaine Flex', 80, 110, 24, '#fff'); label(c, ('0' + n).slice(-2) + ' / 0' + tot, W - 80, 110, 24, GOLD, 'right');
      c.fillStyle = GOLD; c.fillRect(80, H - 470, 70, 4);
      line1(c, day.toUpperCase(), 80, H - 340, { size: day.length > 6 ? 118 : 148, weight: 300 });
      para(c, txt, 80, H - 250, { size: 46, weight: 400, maxW: 880, lh: 62 });
      arrow(c, W - 120, H - 100, 34, GOLD); brandRow(c, 74, H - 100, 24, '#fff');
    };
  }
  const p4 = [
    (c, W, H) => {
      cover(c, I.vd, 0, 0, W, H, { fx: .5, fy: .4 }); lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.4)'], [.5, 'rgba(5,7,10,.1)'], [1, 'rgba(5,7,10,.92)']], [0, 0, W, H]);
      brand(c, W / 2, 180, 44, '#fff', GOLD);
      line1(c, 'Une semaine Flex,', 80, H - 360, { size: 100, weight: 300 }); line1(c, 'jour par jour.', 80, H - 240, { size: 100, weight: 300, italic: true, color: GOLD });
      label(c, 'Faites glisser', W - 150, H - 100, 24, '#fff', 'right'); arrow(c, W - 100, H - 106, 34, GOLD);
    },
    daySlide('hero', null, .5, .5, 'Lundi', 'On fait connaissance, chacun sur ses skis.', 2, 6),
    daySlide('lx', 'gold', .5, .5, 'Mardi', 'Premiers virages ensemble.', 3, 6),
    daySlide('cv', null, .5, .6, 'Mercredi', 'La famille descend la même piste.', 4, 6),
    daySlide('mg', 'rose', .5, .5, 'Jeudi', 'La journée « défi », choisie par les enfants.', 5, 6),
    daySlide('vd', 'ice', .5, .35, 'Vendredi', 'La grande descente, tous ensemble.', 6, 6)
  ];
  function stSlide(img, grade, fy, name, when, n) {
    return (c, W, H) => {
      cover(c, I[img], 0, 0, W, H, { fx: .5, fy, filter: GRADE[grade] });
      lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.5)'], [.3, 'rgba(5,7,10,0)'], [.5, 'rgba(5,7,10,.2)'], [1, 'rgba(5,7,10,.92)']], [0, 0, W, H]);
      label(c, '3 stations, 1 saison', 80, 110, 24, '#fff'); label(c, '0' + n + ' / 03', W - 80, 110, 24, GOLD, 'right');
      line1(c, when, 80, H - 360, { size: 46, weight: 300, italic: true, color: '#F0E8D8' });
      line1(c, name, 80, H - 230, { size: name.length > 9 ? 124 : 150, weight: 300 });
      arrow(c, W - 120, H - 100, 34, GOLD); brandRow(c, 74, H - 100, 24, '#fff');
    };
  }
  const p5 = [
    (c, W, H) => {
      cover(c, I.hero, 0, 0, W, H, { fx: .46, filter: GRADE.rose }); lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.45)'], [.5, 'rgba(5,7,10,0)'], [1, 'rgba(5,7,10,.9)']], [0, 0, W, H]);
      brand(c, W / 2, 180, 44, '#fff', GOLD);
      line1(c, 'Suivre la neige :', 80, H - 470, { size: 88, weight: 300 }); line1(c, '3 stations,', 80, H - 350, { size: 124, weight: 300, italic: true, color: GOLD }); line1(c, '1 saison.', 80, H - 220, { size: 124, weight: 300 });
      arrow(c, W - 120, H - 100, 34, GOLD);
    },
    stSlide('cv', null, .6, 'Courchevel', '15 décembre — début janvier', 1),
    stSlide('mg', 'gold', .5, 'Megève', 'Mi-janvier — fin février', 2),
    stSlide('vd', 'ice', .35, 'Val d\'Isère', 'Fin février — début mai', 3),
    (c, W, H) => {
      c.fillStyle = IVORY; c.fillRect(0, 0, W, H); c.fillStyle = GOLD2; c.fillRect(80, 200, 70, 4);
      label(c, 'Hôteliers, agences de chalets', 80, 150, 24, GOLD2);
      para(c, 'Je cherche trois partenaires par station.', 80, 360, { size: 92, weight: 300, color: INK, maxW: 900, lh: 106 });
      para(c, 'Parlons-en : contact@flex-ski.example', 80, H - 330, { size: 40, weight: 400, color: '#3B3934', maxW: 900 });
      pill(c, 80, H - 230, 'Message privé ouvert', { size: 28, bg: INK, color: IVORY, pad: 40 });
      brandRow(c, 74, H - 100, 24, INK);
    }
  ];
  const p6 = (c, W, H) => {
    cover(c, I.vd, 0, 0, W, H, { fx: .5, filter: GRADE.ice }); lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.5)'], [.4, 'rgba(5,7,10,.05)'], [.65, 'rgba(5,7,10,.25)'], [1, 'rgba(5,7,10,.92)']], [0, 0, W, H]);
    pill(c, 90, 190, '25 secondes', { size: 28, bg: 'rgba(245,241,232,.94)', color: INK, pad: 36 });
    c.strokeStyle = '#fff'; c.lineWidth = 6; c.lineCap = 'round'; const cx = W / 2, cy = 800;
    c.beginPath(); c.arc(cx, cy, 160, Math.PI, 0); c.stroke(); c.beginPath(); c.moveTo(cx - 200, cy); c.lineTo(cx + 200, cy); c.stroke(); c.beginPath(); c.arc(cx, cy - 178, 14, 0, 6.283); c.stroke();
    line1(c, 'L\'exercice', W / 2, 1230, { size: 150, weight: 300, align: 'center' }); line1(c, 'du serveur.', W / 2, 1380, { size: 150, weight: 300, italic: true, color: GOLD, align: 'center' });
    para(c, 'Les bras devant, comme un plateau.', W / 2, 1520, { size: 44, weight: 400, align: 'center', maxW: 860, lh: 60 });
    brandRow(c, W / 2 - 190, H - 130, 30, '#fff');
  };
  const p7 = (c, W, H) => {
    cover(c, I.cv, 0, 0, W, H - 280, { fx: .5, fy: .55, filter: 'saturate(1.08)' }); lin(c, 0, 0, 0, H - 280, [[0, 'rgba(5,7,10,.4)'], [.4, 'rgba(5,7,10,0)'], [1, 'rgba(5,7,10,.35)']], [0, 0, W, H - 280]);
    pill(c, 70, 100, '15 déc. — début janv.', { size: 24, bg: 'rgba(245,241,232,.94)', color: INK, pad: 30 });
    c.fillStyle = IVORY; c.fillRect(0, H - 280, W, 280); c.fillStyle = GOLD2; c.fillRect(0, H - 280, W, 3);
    line1(c, 'Les fêtes à Courchevel.', 70, H - 170, { size: 52, weight: 300, color: INK });
    label(c, 'Semaine Grand Air · jusqu\'à 5 skieurs', 70, H - 100, 19, GOLD2);
    line1(c, '3 750 €', W - 70, H - 150, { size: 84, weight: 300, color: INK, align: 'right' }); label(c, 'TTC · pour toute la famille', W - 70, H - 100, 18, '#77736A', 'right');
  };
  const p8 = (c, W, H) => {
    cover(c, I.mg, 0, 0, W, H, { fx: .5, fy: .4, filter: GRADE.gold }); lin(c, 0, 0, W, 0, [[0, 'rgba(5,7,10,.88)'], [.6, 'rgba(5,7,10,.45)'], [1, 'rgba(5,7,10,.1)']], [0, 0, W, H]);
    label(c, 'Il reste de la place', 70, 120, 17, GOLD);
    line1(c, 'Janvier à Megève,', 70, 230, { size: 58, weight: 300 }); line1(c, 'mars à Val d\'Isère.', 70, 306, { size: 58, weight: 300, italic: true, color: GOLD });
    c.fillStyle = GOLD; c.fillRect(70, 346, 64, 3);
    pill(c, 70, 410, 'Réservation en ligne · acompte 30 %', { size: 17, bg: GOLD, color: INK, pad: 28 });
    brandRow(c, 66, H - 62, 22, '#fff');
  };
  const p9 = (c, W, H) => {
    cover(c, I.mg, 0, 0, W, H, { fx: .55, fy: .3, filter: GRADE.gold }); lin(c, 0, 0, 0, H, [[0, 'rgba(5,7,10,.55)'], [.3, 'rgba(5,7,10,.05)'], [.55, 'rgba(5,7,10,.25)'], [1, 'rgba(5,7,10,.92)']], [0, 0, W, H]);
    brand(c, W / 2, 170, 44, '#fff', GOLD);
    const y = para(c, 'Un exercice pour chacun,', 90, 1230, { size: 92, weight: 300, maxW: 900, lh: 106 });
    para(c, 'une descente ensemble.', 90, y + 4, { size: 92, weight: 300, italic: true, color: GOLD, maxW: 900, lh: 106 });
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 4; c.setLineDash([2, 16]); c.lineCap = 'round'; c.beginPath(); c.moveTo(140, 1000); c.bezierCurveTo(360, 760, 600, 1010, 940, 700); c.stroke(); c.setLineDash([]);
    const pts = [[940, 700, 24, GOLD], [790, 770, 16, '#fff'], [650, 860, 16, '#fff'], [520, 910, 14, '#fff'], [380, 900, 14, '#fff']];
    pts.forEach(([x, yy, r, col]) => { c.fillStyle = col; c.beginPath(); c.arc(x, yy, r, 0, 6.283); c.fill(); });
    label(c, 'Leçons privées en famille', W / 2, H - 120, 26, '#fff', 'center');
  };

  const POSTS = [
    { net: 'ig', kind: 'reel', w: 1080, h: 1920, fmt: 'Reel de 20 secondes, 9:16', date: 'Mardi 17 novembre 2026, 18 h', obj: 'Notoriété : présenter Flex', slug: 'reel-lancement', draw: [p1],
      text: 'Vos vacances, notre priorité. 🏔️\n\nDes leçons de ski privées sur mesure pour toute la famille. Courchevel pour les fêtes, Megève au cœur de l\'hiver, Val d\'Isère jusqu\'au printemps.\n\nTailor-made private ski lessons for the whole family.\n\nRéservation : lien en bio.\n#skifamille #courchevel #megeve #valdisere #leconsdeski' },
    { net: 'li', kind: 'li', w: 1200, h: 627, fmt: 'Post texte et image, 1200 × 627', date: 'Mercredi 18 novembre 2026, 8 h 30', obj: 'Crédibilité : l\'histoire du fondateur', slug: 'histoire-fondateur', draw: [p2],
      text: 'Moniteur de ski à Megève, j\'ai vu la même scène des dizaines de fois : une famille en vacances, séparée chaque matin en cours de niveaux différents, avec un moniteur qui change d\'un jour à l\'autre.\n\nCet hiver, je lance Flex : des leçons privées sur mesure, un moniteur pour toute la famille, un programme adapté à chacun.\n\nJe suis la saison : Courchevel, Megève puis Val d\'Isère.\n\nSi vous partez skier en famille cet hiver, ou si vous travaillez dans l\'hôtellerie de montagne, écrivons-nous.' },
    { net: 'tt', kind: 'phone', w: 1080, h: 1920, fmt: 'Vidéo face caméra de 30 secondes, 9:16', date: 'Jeudi 19 novembre 2026, 19 h', obj: 'Portée : un conseil utile aux parents', slug: 'trois-erreurs', draw: [p3],
      text: '3 erreurs des parents le premier jour de ski 👇\n1. Des chaussures trop grandes « pour qu\'il grandisse dedans »\n2. Commencer à 9 h sans petit-déjeuner solide\n3. Vouloir monter tout en haut dès le premier jour\n\nMoniteur à Courchevel, Megève et Val d\'Isère. Plus de conseils sur le compte. #ski #parents #skitips' },
    { net: 'ig', kind: 'ig', w: 1080, h: 1350, fmt: 'Carrousel de 6 images, 1080 × 1350', date: 'Mardi 24 novembre 2026, 18 h', obj: 'Considération : montrer la semaine type', slug: 'semaine-type', draw: p4,
      text: 'Une semaine Flex, jour par jour ➡️\nLundi : on fait connaissance, chacun sur ses skis.\nMardi : premiers virages ensemble.\nMercredi : la famille descend la même piste.\nJeudi : la journée « défi », choisie par les enfants.\nVendredi : la grande descente, tous ensemble.\n\nPackages à la semaine, à partir de 5 jours.\n#skifamily #privateskilessons' },
    { net: 'li', kind: 'lic', w: 1080, h: 1350, fmt: 'Carrousel PDF de 5 pages, 1080 × 1350', date: 'Jeudi 26 novembre 2026, 8 h 30', obj: 'Crédibilité : expliquer le modèle des 3 stations', slug: 'trois-stations', draw: p5,
      text: 'Pourquoi un moniteur qui change de station au fil de l\'hiver ?\n\n• Mi-décembre – début janvier : Courchevel, pour les fêtes.\n• Mi-janvier – fin février : Megève, le cœur de l\'hiver.\n• Fin février – début mai : Val d\'Isère, la haute altitude qui garde la neige au printemps.\n\nRésultat : une clientèle internationale qui me retrouve de station en station.\n\nHôteliers et agences de chalets : je cherche trois partenaires par station.' },
    { net: 'tt', kind: 'phone', w: 1080, h: 1920, fmt: 'Tutoriel de 25 secondes, 9:16', date: 'Samedi 28 novembre 2026, 11 h', obj: 'Engagement : un exercice à faire en famille', slug: 'exercice-serveur', draw: [p6],
      text: 'L\'exercice du serveur 🍽️ à faire avec vos enfants sur les pistes :\nles bras devant, comme si vous portiez un plateau. Si le plateau penche, vous tombez !\n\nRésultat : les épaules restent face à la pente, les virages deviennent propres.\n\nEssayez et dites-moi en commentaire. #ski #skikids #skitips' },
    { net: 'ig', kind: 'ig', w: 1080, h: 1080, fmt: 'Post image, 1080 × 1080', date: 'Mardi 1er décembre 2026, 18 h', obj: 'Conversion : remplir les semaines des fêtes', slug: 'fetes-courchevel', draw: [p7],
      text: 'Noël et le Nouvel An à Courchevel, en famille, avec votre moniteur toute la semaine. ✨\n\nIl reste quelques semaines disponibles entre le 15 décembre et début janvier.\nSemaine Grand Air : 3 750 € TTC pour toute la famille, jusqu\'à 5 skieurs.\n\nRéservation en trois minutes : lien en bio.' },
    { net: 'li', kind: 'li', w: 1200, h: 627, fmt: 'Post texte et image, 1200 × 627', date: 'Jeudi 3 décembre 2026, 8 h 30', obj: 'Conversion : réserver janvier et mars', slug: 'il-reste-de-la-place', draw: [p8],
      text: 'Janvier à Megève, mars à Val d\'Isère : il reste de la place pour votre famille.\n\nDes leçons privées sur mesure, un moniteur pour toute la famille, à la semaine (5 jours minimum) ou le temps d\'un week-end.\n\nRéservation en ligne en trois minutes, avec un acompte de 30 %. Le lien est en commentaire.' },
    { net: 'tt', kind: 'phone', w: 1080, h: 1920, fmt: 'Vidéo de 20 secondes, 9:16', date: 'Samedi 5 décembre 2026, 11 h', obj: 'Considération : montrer une leçon en famille', slug: 'lecon-en-famille', draw: [p9],
      text: 'Comment se passe une leçon avec toute la famille ? 👨‍👩‍👧‍👦\nUn exercice pour chacun, puis tout le monde descend ensemble sur la piste du moins à l\'aise.\n\nC\'est la leçon privée Flex. #ski #skifamille #megeve' }
  ];
  const NET = { ig: 'Instagram', li: 'LinkedIn', tt: 'TikTok' };

  /* ---------- Rendu ---------- */
  async function paint(canvas, fn, W, H, scale) {
    await ready; canvas.width = Math.round(W * scale); canvas.height = Math.round(H * scale);
    const c = canvas.getContext('2d'); c.setTransform(scale, 0, 0, scale, 0, 0); c.clearRect(0, 0, W, H); c.textBaseline = 'alphabetic'; c.lineCap = 'butt'; fn(c, W, H);
  }
  const esc = s => s.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
  const AV = '<svg viewBox="0 0 40 40"><path d="M7 28 L16 15 L21 21 L25 16 L33 28 Z" fill="#F5F1E8"/></svg>';
  const IC = { heart: '<svg viewBox="0 0 24 24"><path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 0 1 12 7.5 4.5 4.5 0 0 1 21 9.5C21 13.5 17 17 12 21z"/></svg>', comment: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>', send: '<svg viewBox="0 0 24 24"><path d="M21 3L3 11l7 3 3 7z M10 14l11-11"/></svg>', save: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>' };

  function card(p, i) {
    const el = document.createElement('div'); el.className = 'card'; el.dataset.net = p.net;
    const cap = esc(p.text);
    let mock = '';
    if (p.kind === 'ig') mock = '<div class="mk ig"><header><div class="av">' + AV + '</div><div><b>flex.by.tsiry</b><span>Courchevel · Megève · Val d\'Isère</span></div><span class="dots">•••</span></header><div class="media"><canvas></canvas></div>' + (p.draw.length > 1 ? '<div class="carousel-ui"><button data-d="-1" aria-label="Image précédente">‹</button><div class="pg">' + p.draw.map(() => '<i></i>').join('') + '</div><button data-d="1" aria-label="Image suivante">›</button></div>' : '') + '<div class="acts">' + IC.heart + IC.comment + IC.send + IC.save + '</div><p class="cap"><b>flex.by.tsiry</b> ' + cap + '</p></div>';
    else if (p.kind === 'li' || p.kind === 'lic') mock = '<div class="mk li"><header><div class="av">' + AV + '</div><div><b>Flex by Tsiry</b><span>Leçons de ski privées sur mesure</span><span>Il y a 2 h · Public</span></div></header><p class="cap">' + cap + '</p><div class="media"><canvas></canvas></div>' + (p.draw.length > 1 ? '<div class="carousel-ui"><button data-d="-1" aria-label="Page précédente">‹</button><div class="pg">' + p.draw.map(() => '<i></i>').join('') + '</div><button data-d="1" aria-label="Page suivante">›</button></div>' : '') + '<div class="reacts"><span>J\'aime</span><span>Commenter</span><span>Republier</span><span>Envoyer</span></div></div>';
    else mock = '<div class="phone"><div class="screen"><div class="notch"></div><canvas style="display:block;width:100%;height:auto"></canvas><div class="ui">' + IC.heart + IC.comment + IC.save + IC.send + '</div><div class="meta"><b>@flex.by.tsiry</b>' + esc(p.text.split('\n')[0]) + '</div></div></div>';
    el.innerHTML = '<div class="cardhead"><b>Post ' + (i + 1) + ' / 9</b><span>' + NET[p.net] + '</span></div>' + mock +
      '<div class="capcard"><h4>Informations de publication</h4><dl><dt>Format</dt><dd>' + p.fmt + '</dd><dt>Date</dt><dd>' + p.date + '</dd><dt>Objectif</dt><dd>' + p.obj + '</dd><dt>Visuel</dt><dd>' + p.w + ' × ' + p.h + ' px, PNG' + (p.draw.length > 1 ? ' (' + p.draw.length + ' images)' : '') + '</dd></dl><div class="actionrow"><button class="btn s" data-act="dl">Télécharger le visuel</button><button class="btn s ghost" data-act="copy">Copier le texte</button></div></div>';
    const canvas = el.querySelector('canvas'), scale = p.w >= 1200 ? .5 : .42; let cur = 0;
    const show = () => { paint(canvas, p.draw[cur], p.w, p.h, scale); el.querySelectorAll('.pg i').forEach((d, k) => d.classList.toggle('on', k === cur)); };
    el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => { cur = (cur + Number(b.dataset.d) + p.draw.length) % p.draw.length; show(); }));
    el.querySelector('[data-act=dl]').addEventListener('click', async () => {
      const big = document.createElement('canvas'); await paint(big, p.draw[cur], p.w, p.h, 1);
      big.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'flex-post-' + (i + 1) + '-' + p.slug + (p.draw.length > 1 ? '-' + (cur + 1) : '') + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); });
    });
    el.querySelector('[data-act=copy]').addEventListener('click', () => {
      (navigator.clipboard ? navigator.clipboard.writeText(p.text) : Promise.reject()).then(() => flexToast('Texte copié')).catch(() => flexToast('Copie impossible dans ce navigateur'));
    });
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { show(); io.disconnect(); } }, { rootMargin: '300px' }); io.observe(el); } else show();
    return el;
  }
  const studio = document.getElementById('studio');
  POSTS.forEach((p, i) => studio.appendChild(card(p, i)));
  document.querySelectorAll('#filters button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#filters button').forEach(x => x.classList.toggle('on', x === b));
    studio.querySelectorAll('.card').forEach(cd => { cd.hidden = b.dataset.f !== 'all' && cd.dataset.net !== b.dataset.f; });
  }));

  /* ---------- Calendrier : les vignettes sont les vrais visuels ---------- */
  const WEEKS = [
    { t: 'Semaine 1', d: '16 – 22 nov.', s: 16, m: 'nov.', ev: { 0: [['off', 'Messages au réseau existant']], 1: [['post', 1]], 2: [['post', 2]], 3: [['post', 3]], 4: [['off', 'Stories : coulisses']], 5: [['off', 'Préparation de la plaquette']] } },
    { t: 'Semaine 2', d: '23 – 29 nov.', s: 23, m: 'nov.', ev: { 0: [['off', 'Visites des conciergeries de Courchevel']], 1: [['post', 4]], 2: [['off', 'Visites des conciergeries de Megève']], 3: [['post', 5]], 4: [['off', 'Visites à Val d\'Isère']], 5: [['post', 6]], 6: [['ml', 'Lettre n° 1 : ouverture']] } },
    { t: 'Semaine 3', d: '30 nov. – 6 déc.', s: 30, m: 'nov.', ev: { 0: [['off', 'Fin du tarif fondateur'], ['off', 'RDV agences de chalets']], 1: [['post', 7]], 2: [['ad', 'Début de la publicité Instagram (300 €)']], 3: [['post', 8]], 4: [['off', 'Contact Ski Club of GB et Carv']], 5: [['post', 9]] } },
    { t: 'Semaine 4', d: '7 – 13 déc.', s: 7, m: 'déc.', ev: { 0: [['off', 'Stories : préparation du matériel']], 1: [['off', 'Proposition au créateur de contenu']], 2: [['off', 'Reprise du post 3 en Reel']], 3: [['off', 'Bilan des réservations']], 4: [['ml', 'Lettre n° 2 : Courchevel J-5']], 5: [['off', 'Stories : arrivée à Courchevel']], 6: [['off', 'Appels de préparation aux familles']] } }
  ];
  const cal = document.getElementById('cal'); let h = '<div class="h"></div>' + ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => '<div class="h">' + d + '</div>').join('');
  WEEKS.forEach(w => {
    h += '<div class="w">' + w.t + '<small>' + w.d + '</small></div>';
    for (let k = 0; k < 7; k++) {
      let n = w.s + k, m = w.m; if (w.s === 30 && n > 30) { n -= 30; m = 'déc.'; }
      h += '<div><span class="d">' + n + ' ' + m + '</span>' + (w.ev[k] || []).map(e => e[0] === 'post' ? '<span class="ev post" data-p="' + e[1] + '"><i>' + NET[POSTS[e[1] - 1].net] + '</i><span>Post ' + e[1] + '</span></span>' : '<span class="ev ' + e[0] + '">' + e[1] + '</span>').join('') + '</div>';
    }
  });
  cal.innerHTML = h;
  (async () => {
    await ready;
    for (const el of cal.querySelectorAll('.ev.post')) {
      const p = POSTS[Number(el.dataset.p) - 1], t = document.createElement('canvas'); await paint(t, p.draw[0], p.w, p.h, 160 / p.w);
      const img = document.createElement('img'); img.alt = ''; img.src = t.toDataURL('image/jpeg', .7); el.prepend(img);
    }
  })();
})();
