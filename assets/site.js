/* Flex by Tsiry — éléments communs (bandeau, navigation, pied de page, visuels) */
(function () {
  const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="#A6875A" stroke-width="1"/><path d="M7 28 L16 15 L21 21 L25 16 L33 28 Z" fill="#191815"/><path d="M16 15 L18.4 18.4 L16.8 18 L15 19.6 L13.9 18.1 Z M25 16 L26.8 18.6 L25.4 18.3 L24 19.3 Z" fill="#F5F1E8"/></svg>';
  window.FLEX_LOGO = LOGO;

  const page = document.body.dataset.page || '';
  const left = [['index.html', 'Vente', 'vente'], ['crm.html', 'CRM', 'crm']];
  const right = [['strategie.html', 'Stratégie', 'strategie'], ['communication.html', 'Communication', 'communication']];
  const li = l => '<li><a href="' + l[0] + '"' + (page === l[2] ? ' class="active"' : '') + '>' + l[1] + '</a></li>';
  const CTA = '<li><a class="nav-cta" href="reserver.html">Réserver</a></li>';

  const banner = document.createElement('div');
  banner.className = 'demo-banner';
  banner.setAttribute('role', 'note');
  banner.textContent = 'Projet étudiant INSEEC, démo sans vente réelle';

  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML =
    '<div class="wrap">' +
      '<ul class="nav-side nav-left">' + left.map(li).join('') + '</ul>' +
      '<a class="brand" href="index.html" aria-label="Flex by Tsiry, accueil">' + LOGO +
        '<span><span class="brand-name">FLEX</span><span class="brand-by">by Tsiry</span></span></a>' +
      '<ul class="nav-side nav-right">' + right.map(li).join('') + CTA + '</ul>' +
      '<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<ul class="nav-mobile">' + left.concat(right).map(li).join('') + CTA + '</ul>' +
    '</div>';

  document.body.prepend(nav);
  document.body.prepend(banner);

  const burger = nav.querySelector('.burger');
  const list = nav.querySelector('.nav-mobile');
  burger.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  list.addEventListener('click', e => { if (e.target.tagName === 'A') list.classList.remove('open'); });

  if (!document.body.dataset.nofooter) {
    const f = document.createElement('footer');
    f.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
        '<div><a class="brand" href="index.html">' + LOGO.replace('#191815', '#F5F1E8') + '<span><span class="brand-name">FLEX</span><span class="brand-by">by Tsiry</span></span></a>' +
        '<p style="margin-top:20px;max-width:340px">Leçons de ski privées sur mesure, de Courchevel à Megève puis Val d\'Isère, au fil de la saison.</p></div>' +
        '<div><h4>Espace client</h4><ul><li><a href="index.html">Accueil</a></li><li><a href="index.html#formules">Formules et tarifs</a></li><li><a href="index.html#faq">Questions fréquentes</a></li><li><a href="index.html#contact">Contact</a></li><li><a href="reserver.html">Réserver</a></li></ul></div>' +
        '<div><h4>Entreprise</h4><ul><li><a href="crm.html">CRM</a></li><li><a href="strategie.html">Dossier stratégique</a></li><li><a href="communication.html">Plan de communication</a></li></ul></div>' +
        '<div><h4>Saison 2026-2027</h4><ul><li>Courchevel · 15 déc. – début janv.</li><li>Megève · mi-janv. – fin févr.</li><li>Val d\'Isère · fin févr. – début mai</li></ul></div>' +
      '</div>' +
      '<div class="foot-bottom"><span>Projet étudiant INSEEC, démo sans vente réelle. Aucun paiement n\'est encaissé, toutes les données sont fictives.</span><span>© 2026 Flex by Tsiry</span></div></div>';
    document.body.appendChild(f);
  }

  // Révélation au scroll
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // Toast
  window.flexToast = function (msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3200);
  };
})();

/* Visuels générés : paysages de montagne stylisés, une palette par station */
window.flexMountain = function (variant) {
  const PAL = {
    courchevel: { sky: ['#1B2433', '#5E6E86', '#D9C7A8'], sun: '#F3DDB4', m: ['#7E8BA0', '#4B5870', '#2A3346', '#151B26'] },
    megeve:     { sky: ['#2A2622', '#8A7663', '#EBD9BE'], sun: '#FBE7C4', m: ['#A59684', '#6E6152', '#40372F', '#1E1A16'] },
    valdisere:  { sky: ['#0E2233', '#3E7090', '#BFD8E2'], sun: '#F6FAFB', m: ['#9DB6C4', '#5D7E92', '#2C4658', '#11202B'] },
    hero:       { sky: ['#0D1216', '#3A4652', '#C9B79A'], sun: '#F1DFC0', m: ['#6F7A84', '#46505A', '#262D33', '#0E1215'] }
  };
  const c = PAL[variant] || PAL.hero;
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  return '<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c.sky[0] + '"/><stop offset=".6" stop-color="' + c.sky[1] + '"/><stop offset="1" stop-color="' + c.sky[2] + '"/></linearGradient>' +
    '<linearGradient id="' + id + 'f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<filter id="' + id + 'n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0"/></filter></defs>' +
    '<rect width="1600" height="1000" fill="url(#' + id + 's)"/>' +
    '<circle cx="1180" cy="330" r="70" fill="' + c.sun + '" opacity=".85"/>' +
    '<path d="M0 560 L180 420 L290 480 L460 300 L600 430 L760 330 L930 470 L1080 360 L1250 450 L1400 330 L1600 460 L1600 1000 L0 1000Z" fill="' + c.m[0] + '" opacity=".7"/>' +
    '<path d="M460 300 L520 360 L490 352 L470 380 L440 345 L420 340Z M1400 330 L1450 380 L1420 372 L1395 395 L1370 360Z" fill="#fff" opacity=".75"/>' +
    '<path d="M0 680 L150 560 L300 640 L520 420 L700 600 L880 470 L1060 640 L1260 500 L1450 620 L1600 560 L1600 1000 L0 1000Z" fill="' + c.m[1] + '"/>' +
    '<path d="M520 420 L590 490 L560 482 L540 512 L505 470 L470 470Z M880 470 L940 530 L910 522 L885 548 L855 510Z M1260 500 L1320 555 L1290 548 L1268 575 L1240 540Z" fill="url(#' + id + 'f)"/>' +
    '<path d="M0 820 L220 700 L420 790 L640 650 L860 800 L1100 690 L1340 810 L1600 720 L1600 1000 L0 1000Z" fill="' + c.m[2] + '"/>' +
    '<path d="M0 930 C300 860 520 900 800 880 C1100 860 1300 920 1600 890 L1600 1000 L0 1000Z" fill="' + c.m[3] + '"/>' +
    '<path d="M640 650 C700 760 760 820 820 1000" stroke="#fff" stroke-opacity=".18" stroke-width="2" fill="none"/>' +
    '<rect width="1600" height="1000" filter="url(#' + id + 'n)"/>' +
    '</svg>';
};
document.querySelectorAll('[data-art]').forEach(el => { el.innerHTML = window.flexMountain(el.dataset.art); });

/* Données partagées : formules */
window.FLEX_OFFERS = [
  { id: 'weekend', name: 'Le Week-end', sub: 'Samedi et dimanche, deux journées entières avec votre moniteur.', ttc: 1560, days: 2, hours: '2 × 6 h' },
  { id: 'matinees', name: 'La Semaine Matinées', sub: 'Cinq matinées de 9 h à 12 h 30, l\'après-midi reste libre pour la famille.', ttc: 2250, days: 5, hours: '5 × 3 h 30' },
  { id: 'grandair', name: 'La Semaine Grand Air', sub: 'Cinq journées complètes, du premier télésiège au dernier virage.', ttc: 3750, days: 5, hours: '5 × 6 h' }
];
window.FLEX_EXT = { id: 'ext', name: 'Prolongation week-end', ttc: 1440 };
window.flexEur = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' €';
window.flexHT = ttc => Math.round(ttc / 1.2 * 100) / 100;
