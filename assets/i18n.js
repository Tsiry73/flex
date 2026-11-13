/* Flex by Tsiry — sélecteur de langue (français / anglais).
   Le texte d'origine reste en français dans les pages ; ce fichier le remplace par l'anglais à la volée,
   y compris pour le contenu créé par les scripts (formules, récapitulatif, confirmation). */
(function () {
  const EN = {
    /* Menu */
    "Vente": "Offer", "Stratégie": "Strategy", "Réserver": "Book", "Réserver votre semaine": "Book your week",
    /* Accueil : scène */
    "Vos vacances,": "Your holiday,", "notre priorité.": "our priority.",
    "Des leçons privées sur mesure, à Courchevel, Megève puis Val d'Isère. Des packages à la semaine, ou le temps d'un week-end.": "Tailor-made private ski lessons in Courchevel, then Megève, then Val d'Isère. Weekly packages, or just a weekend.",
    "Découvrir la saison": "Discover the season",
    "15 décembre — début janvier": "15 December — early January",
    "La saison s'ouvre avec les fêtes de fin d'année.": "The season opens with the end-of-year festivities.",
    "Mi-janvier — fin février": "Mid-January — end of February", "Le cœur de l'hiver.": "The heart of winter.",
    "Fin février — début mai": "End of February — early May", "La haute altitude pour finir la saison.": "High altitude to end the season.",
    "Faites défiler": "Scroll",
    /* Accueil : éditorial */
    "L'expérience du luxe alpin": "The Alpine luxury experience", "à travers le ski.": "through skiing.",
    "Pour les familles en séjour dans les grandes stations, Flex propose des leçons de ski privées sur mesure : un moniteur pour toute la famille, un programme adapté à chacun, pour progresser ensemble sans perdre une heure de vos vacances.": "For families staying in the great resorts, Flex offers tailor-made private ski lessons: one instructor for the whole family and a programme adapted to each skier, so you can progress together without losing an hour of your holiday.",
    "Leçons privées": "Private lessons", "Pas de groupe : votre famille a son moniteur pour elle seule.": "No groups: your family has its own instructor.",
    "La semaine ou le week-end": "The week or the weekend", "Des packages de cinq jours minimum, avec une option samedi-dimanche.": "Packages of five days minimum, with a Saturday–Sunday option.",
    "Trois stations": "Three resorts", "Courchevel, Megève puis Val d'Isère, selon la période de votre séjour.": "Courchevel, Megève, then Val d'Isère, depending on the dates of your stay.",
    "15 déc. – début janv.": "15 Dec – early Jan", "Mi-janv. – fin févr.": "Mid-Jan – end Feb", "Fin févr. – début mai": "End Feb – early May",
    /* Formules */
    "Nos formules": "Our plans", "Un prix par famille": "One price per family",
    "Jusqu'à 5 skieurs d'une même famille. Prix TTC, identiques dans les trois stations.": "Up to 5 skiers from the same family. Prices include VAT and are the same in all three resorts.",
    "Le Week-end": "The Weekend", "La Semaine Matinées": "The Mornings Week", "La Semaine Grand Air": "The Full-Days Week",
    "TTC": "incl. VAT", "Choisir": "Select",
    "Ce qui est inclus": "What is included", "Ce qui n'est pas inclus": "What is not included",
    "Les leçons privées avec un moniteur diplômé d'État": "Private lessons with a state-qualified instructor",
    "Un programme adapté au niveau de chaque skieur": "A programme adapted to each skier's level",
    "Jusqu'à 5 skieurs d'une même famille": "Up to 5 skiers from the same family",
    "Leçons en français ou en anglais": "Lessons in French or English",
    "Les forfaits de remontées mécaniques": "Lift passes", "La location du matériel": "Equipment rental",
    "L'hébergement, les repas et le transport": "Accommodation, meals and transport", "L'assurance": "Insurance",
    /* FAQ */
    "Questions fréquentes": "Frequently asked questions", "Avant de réserver": "Before you book",
    "Le prix est-il par personne ou par famille ?": "Is the price per person or per family?",
    "Par famille. Chaque formule comprend jusqu'à 5 skieurs d'une même famille, adultes et enfants. Au-delà, écrivez-nous pour une proposition sur mesure.": "Per family. Each plan covers up to 5 skiers from the same family, adults and children. For larger groups, write to us for a tailor-made offer.",
    "Nous n'avons pas tous le même niveau. Comment ça se passe ?": "We are not all at the same level. How does it work?",
    "La leçon est privée : le moniteur prépare un exercice pour chacun, puis la famille descend ensemble sur une piste adaptée au skieur le moins à l'aise.": "The lesson is private: the instructor prepares an exercise for each skier, then the family skis down together on a run suited to the least confident skier.",
    "À partir de quel âge les enfants peuvent-ils skier avec vous ?": "From what age can children ski with you?",
    "À partir de 4 ans, s'ils sont à l'aise sans leurs parents. Pour les plus jeunes, la formule Matinées est la mieux adaptée.": "From 4 years old, if they are comfortable without their parents. For the youngest, the Mornings plan is the best fit.",
    "Pourquoi trois stations ?": "Why three resorts?",
    "Le moniteur suit la saison : Courchevel de mi-décembre à début janvier, Megève de mi-janvier à fin février, Val d'Isère de fin février à début mai. Vous choisissez la station selon la date de votre séjour.": "The instructor follows the season: Courchevel from mid-December to early January, Megève from mid-January to the end of February, Val d'Isère from the end of February to early May. You choose the resort according to the date of your stay.",
    "Peut-on réserver un week-end seulement ?": "Can I book a weekend only?",
    "Oui, avec la formule Le Week-end (samedi et dimanche). En semaine, le minimum est de cinq jours.": "Yes, with The Weekend plan (Saturday and Sunday). During the week, the minimum is five days.",
    "Les forfaits et le matériel sont-ils compris ?": "Are lift passes and equipment included?",
    "Non. Les forfaits de remontées mécaniques et la location du matériel se réservent directement auprès des prestataires de la station.": "No. Lift passes and equipment rental are booked directly with the resort's providers.",
    "Comment paie-t-on ?": "How do I pay?",
    "Un acompte de 30 % à la réservation, le solde 30 jours avant le séjour.": "A 30% deposit when you book, the balance 30 days before the stay.",
    "Quelles sont les conditions d'annulation ?": "What is the cancellation policy?",
    "Sans frais jusqu'à 30 jours avant le séjour, 50 % retenus entre 30 et 8 jours, puis la prestation est due. En cas de fermeture de la station, la journée est reportée ou remboursée.": "Free up to 30 days before the stay, 50% retained between 30 and 8 days, then the service is due. If the resort closes, the day is rescheduled or refunded.",
    /* Contact */
    "Contact": "Contact", "Une question avant de réserver ?": "A question before you book?",
    "Écrivez-nous, nous vous répondons dans la journée, en français ou en anglais.": "Write to us: we reply within the day, in French or English.",
    "Courriel": "Email", "Téléphone": "Phone", "+33 4 00 00 00 00 (numéro fictif)": "+33 4 00 00 00 00 (fictitious number)",
    "Nom": "Surname", "Station envisagée": "Resort in mind", "Je ne sais pas encore": "I don't know yet",
    "Votre message": "Your message", "Envoyer la demande": "Send request",
    "Démo : aucun message n'est envoyé. La demande apparaît comme nouveau contact dans le CRM de ce navigateur.": "Demo: no message is sent. The request appears as a new contact in this browser's CRM.",
    "Saison 2026-2027": "2026-2027 season", "Votre saison commence ici.": "Your season starts here.",
    "Photos de ski :": "Ski photos:", "(licence libre)": "(free licence)",
    /* Pied de page */
    "Leçons de ski privées sur mesure, de Courchevel à Megève puis Val d'Isère, au fil de la saison.": "Tailor-made private ski lessons, from Courchevel to Megève and Val d'Isère, through the season.",
    "Espace client": "Guests", "Accueil": "Home", "Formules et tarifs": "Plans and prices", "Entreprise": "Company",
    "Dossier stratégique": "Strategy file", "Plan de communication": "Communication plan",
    "Courchevel · 15 déc. – début janv.": "Courchevel · 15 Dec – early Jan", "Megève · mi-janv. – fin févr.": "Megève · mid-Jan – end Feb", "Val d'Isère · fin févr. – début mai": "Val d'Isère · end Feb – early May",
    "Projet étudiant INSEEC, démo sans vente réelle. Aucun paiement n'est encaissé, toutes les données sont fictives.": "INSEEC student project, demo with no real sales. No payment is taken and all data is fictitious.",
    /* Réservation */
    "Réservation": "Booking", "Composons votre semaine": "Let's plan your week",
    "Cinq étapes, trois minutes. Démo : aucun paiement n'est encaissé.": "Five steps, three minutes. Demo: no payment is taken.",
    "1 · Formule": "1 · Plan", "2 · Station et dates": "2 · Resort and dates", "3 · Votre famille": "3 · Your family", "4 · Coordonnées": "4 · Details", "5 · Paiement": "5 · Payment",
    "Quelle formule vous ressemble ?": "Which plan suits you?",
    "Ajouter la prolongation week-end (samedi et dimanche après la semaine) :": "Add the weekend extension (Saturday and Sunday after the week):",
    "Où et quand ?": "Where and when?",
    "Choisissez la date d'arrivée : la station correspondant à la période est sélectionnée automatiquement.": "Choose your arrival date: the resort matching the period is selected automatically.",
    "Premier jour de leçon": "First lesson day",
    "15 déc. – 9 janv.": "15 Dec – 9 Jan", "16 janv. – 26 févr.": "16 Jan – 26 Feb", "27 févr. – 1er mai": "27 Feb – 1 May",
    "Qui skiera avec nous ?": "Who will be skiing with us?", "Jusqu'à 5 skieurs d'une même famille sont compris dans le prix.": "Up to 5 skiers from the same family are included in the price.",
    "Adultes": "Adults", "18 ans et plus": "18 and over", "Enfants": "Children", "de 4 à 17 ans": "aged 4 to 17",
    "Niveau global de la famille": "The family's overall level", "Grands débutants": "Complete beginners", "Niveaux mélangés": "Mixed levels",
    "Intermédiaires, pistes rouges": "Intermediate, red runs", "Confirmés, envie de hors-piste": "Advanced, keen on off-piste",
    "Langue des leçons": "Lesson language", "Français": "French",
    "Vos coordonnées": "Your details", "Démo : utilisez des informations fictives. Rien n'est envoyé.": "Demo: use fictitious information. Nothing is sent.",
    "Prénom": "First name", "Pays de résidence": "Country of residence", "France": "France", "Royaume-Uni": "United Kingdom", "Belgique": "Belgium", "Suisse": "Switzerland", "États-Unis": "United States", "Pays-Bas": "Netherlands", "Autre": "Other",
    "Hébergement (facultatif)": "Accommodation (optional)", "Un mot pour votre moniteur (facultatif)": "A word for your instructor (optional)",
    "Paiement": "Payment", "Paiement simulé.": "Simulated payment.",
    "Ce site est un projet étudiant : aucune carte n'est demandée et aucun montant n'est débité. Le bouton ci-dessous simule un paiement accepté.": "This site is a student project: no card is requested and no amount is charged. The button below simulates an accepted payment.",
    "Acompte de 30 % à la réservation": "30% deposit at booking", "Solde, 30 jours avant le séjour": "Balance, 30 days before the stay",
    "J'accepte les conditions d'annulation : sans frais jusqu'à 30 jours avant, 50 % retenus entre 30 et 8 jours.": "I accept the cancellation terms: free up to 30 days before, 50% retained between 30 and 8 days.",
    "Retour": "Back", "Continuer": "Continue", "Votre séjour": "Your stay", "Station": "Resort", "À définir": "To be set", "Dates": "Dates", "Skieurs": "Skiers",
    "Prolongation": "Extension", "Non": "No", "Choisissez une formule": "Choose a plan",
    "Forfaits et matériel non compris.": "Lift passes and equipment not included.",
    "Paiement en cours…": "Processing payment…",
    /* Messages */
    "Choisissez une formule pour continuer.": "Choose a plan to continue.",
    "Cette date tombe entre deux périodes (10 – 15 janvier). Choisissez une date dans l'une des trois périodes.": "This date falls between two periods (10 – 15 January). Choose a date within one of the three periods.",
    "Choisissez une date ou une station.": "Choose a date or a resort.",
    "La formule Le Week-end commence un samedi.": "The Weekend plan starts on a Saturday.",
    "Prénom, nom et un courriel valide sont nécessaires.": "First name, surname and a valid email are required.",
    "Merci d'accepter les conditions d'annulation.": "Please accept the cancellation terms.",
    "Le prix comprend jusqu'à 5 skieurs. Pour un groupe plus grand, écrivez-nous.": "The price covers up to 5 skiers. For a larger group, write to us.",
    "Merci de remplir le nom, le courriel et le message.": "Please fill in your name, email and message.",
    "Merci. Votre demande a bien été reçue (démo).": "Thank you. Your request has been received (demo).",
    /* Confirmation */
    "Réservation confirmée · démo": "Booking confirmed · demo",
    "Votre moniteur vous appelle sous 24 heures pour faire connaissance avec chaque skieur et préparer le premier matin.": "Your instructor will call you within 24 hours to get to know each skier and prepare the first morning.",
    "Formule": "Plan", "Total": "Total", "Acompte simulé": "Simulated deposit",
    "Aucun paiement n'a été encaissé. Cette réservation apparaît maintenant dans le CRM de démonstration, étape « Gagné ».": "No payment has been taken. This booking now appears in the demo CRM, at the “Won” stage.",
    "Voir dans le CRM": "View in the CRM", "Retour à l'accueil": "Back to home"
  };
  const ATTR = ["placeholder", "alt", "aria-label", "title"];
  const ATTR_EN = {
    "Flex by Tsiry, accueil": "Flex by Tsiry, home", "Présentation de Flex by Tsiry": "Flex by Tsiry presentation",
    "Le sommet du Mont Blanc émergeant des nuages": "The summit of Mont Blanc rising above the clouds",
    "Skieur au pied de montagnes enneigées sous les nuages": "Skier at the foot of snowy mountains under the clouds",
    "Famille Martin": "The Martin family", "vous@exemple.com": "you@example.com",
    "Nous sommes quatre, deux enfants de 7 et 10 ans…": "There are four of us, two children aged 7 and 10…",
    "Claire": "Claire", "Dumont": "Dumont", "claire@exemple.com": "claire@example.com", "Chalet, hôtel…": "Chalet, hotel…",
    "Notre fille a un peu peur de la vitesse…": "Our daughter is a little afraid of speed…",
    "Retirer un adulte": "Remove an adult", "Ajouter un adulte": "Add an adult", "Retirer un enfant": "Remove a child", "Ajouter un enfant": "Add a child", "Langue": "Language"
  };
  const MONTHS = { janvier: "January", "février": "February", mars: "March", avril: "April", mai: "May", juin: "June", juillet: "July", "août": "August", septembre: "September", octobre: "October", novembre: "November", "décembre": "December" };
  const money = s => '€' + s.replace(/[\s  ]/g, ',');
  const RULES = [
    [/^(\d[\d\s  ]*) €$/, (m) => money(m[1])],
    [/^(\d[\d\s  ]*) € TTC$/, (m) => money(m[1]) + ' incl. VAT'],
    [/^Oui, (\d[\d\s  ]*) €$/, (m) => 'Yes, ' + money(m[1])],
    [/^Payer (\d[\d\s  ]*) € \(simulation\)$/, (m) => 'Pay ' + money(m[1]) + ' (simulation)'],
    [/^(\d+) adultes?(?:, (\d+) enfants?)?$/, (m) => m[1] + (m[1] === '1' ? ' adult' : ' adults') + (m[2] ? ', ' + m[2] + (m[2] === '1' ? ' child' : ' children') : '')],
    [/^du (\d+)(?:er)? (\S+) (\d{4}) au (\d+)(?:er)? (\S+) (\d{4})$/, (m) => 'from ' + m[1] + ' ' + (MONTHS[m[2]] || m[2]) + ' ' + m[3] + ' to ' + m[4] + ' ' + (MONTHS[m[5]] || m[5]) + ' ' + m[6]],
    [/^Merci, (.+)\. Votre semaine est réservée\.$/, (m) => 'Thank you, ' + m[1] + '. Your week is booked.'],
    [/^Référence (.+)$/, (m) => 'Reference ' + m[1]],
    [/^du (\d+)(?:er)? (\S+) (\d{4}) au (\d+)(?:er)? (\S+) (\d{4}) \((.*)\)$/, (m) => m[0]],
    [/^Le séjour dépasserait la fin de la période à (.+) \((.+)\)\. Choisissez une date plus tôt\.$/, (m) => 'The stay would run past the end of the period in ' + m[1] + ' (' + m[2] + '). Choose an earlier date.'],
    [/^(.+) passe à l'étape « (.+) »$/, (m) => m[0]]
  ];

  let lang = 'fr';
  try { lang = localStorage.getItem('flex_lang') === 'en' ? 'en' : 'fr'; } catch (e) {}
  window.flexLang = () => lang;
  window.flexLocale = () => lang === 'en' ? 'en-GB' : 'fr-FR';

  function tr(str) {
    const core = str.trim(); if (!core) return null;
    if (EN[core] !== undefined) return EN[core];
    for (const [re, fn] of RULES) { const m = core.match(re); if (m) return fn(m); }
    return null;
  }
  function textNode(n) {
    if (n._fr === undefined) n._fr = n.nodeValue;
    const lead = n._fr.match(/^\s*/)[0], trail = n._fr.match(/\s*$/)[0];
    if (lang === 'fr') { if (n.nodeValue !== n._fr) n.nodeValue = n._fr; return; }
    const out = tr(n._fr);
    const v = out === null ? n._fr : lead + out + trail;
    if (n.nodeValue !== v) n.nodeValue = v;
  }
  function attrs(el) {
    ATTR.forEach(a => {
      if (!el.hasAttribute || !el.hasAttribute(a)) return;
      const k = '_fr_' + a; if (el[k] === undefined) el[k] = el.getAttribute(a);
      const out = lang === 'en' ? (ATTR_EN[el[k]] !== undefined ? ATTR_EN[el[k]] : (EN[el[k]] !== undefined ? EN[el[k]] : null)) : null;
      const v = out === null ? el[k] : out; if (el.getAttribute(a) !== v) el.setAttribute(a, v);
    });
    if (el.tagName === 'OPTION' && !el.hasAttribute('value')) el.setAttribute('value', el.textContent);
  }
  function walk(root) {
    if (root.nodeType === 3) { if (root.parentElement && !/^(SCRIPT|STYLE)$/.test(root.parentElement.tagName)) textNode(root); return; }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(root.tagName)) return;
    if (root.classList && root.classList.contains('demo-banner')) return;
    attrs(root);
    for (const c of root.childNodes) walk(c);
  }
  function titleTr() {
    if (document._frTitle === undefined) document._frTitle = document.title;
    const m = { "Flex by Tsiry · Leçons de ski privées": "Flex by Tsiry · Private ski lessons", "Réserver · Flex by Tsiry": "Book · Flex by Tsiry" };
    document.title = lang === 'en' && m[document._frTitle] ? m[document._frTitle] : document._frTitle;
  }
  function apply() {
    document.documentElement.lang = lang; titleTr(); walk(document.body);
    document.querySelectorAll('.lang button').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  }
  let busy = false;
  const obs = new MutationObserver(muts => {
    if (busy || lang === 'fr') return; busy = true;
    muts.forEach(m => m.addedNodes.forEach(n => walk(n)));
    busy = false;
  });
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'fr';
    try { localStorage.setItem('flex_lang', lang); } catch (e) {}
    apply(); document.dispatchEvent(new Event('flexlang'));
  }
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  obs.observe(document.body, { childList: true, subtree: true });
  apply();
})();
