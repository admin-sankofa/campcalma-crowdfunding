import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

// Minimal i18n for the standalone page (keeps multilingual support)
const i18n = {
  de: {
    projects: {
      6: { title: '6. Upgrade Camp Calma Landschaft' },
      8: { title: '8. Spende und Unterstützung für Nilua' },
      10: { title: '10. Camp Calma – Kauf, Brunnen, Solar & erste Unterkünfte (abgeschlossen)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Übersicht & Zusammenfassung',
    mission: 'Unsere Mission',
    mission_text:
      'Jede Spende zählt gleich, unabhängig davon, ob sie allgemein oder für ein spezielles Projekt gegeben wird.',
    restart: 'Neustarthilfe',
    restart_text:
      'Unterstützung für Mitglieder, Creator und Offgrid-Pioniere, die mit neuen Ideen starten oder ihren Weg in ein nachhaltiges Leben finden möchten.',
    safe_harbor: 'Sicherer Hafen',
    safe_harbor_text:
      'Schutz- und Entwicklungsraum für Menschen, die Teil der Community sind – mit Fokus auf Stabilität, gemeinsames Wachstum und langfristige Perspektiven.',
    transparency: 'Transparenz & Dynamik',
    transparency_text:
      'Diese Seite ist als moderne, dynamische Crowdfunding-Übersicht konzipiert.',
    general_donations: 'Allgemeine Spendenmöglichkeiten',
    donate_camp: '🌿 Spende und Unterstützung für Camp Calma',
    donate_sankofa: '🌍 Spende und Unterstützung für Sankofa Living & Learning',
    how_crowdfunding: 'So funktioniert das Crowdfunding',
    raffle_rule:
      'Jede Spende in den Projekten 2 bis 6 sichert dir Lose für die Auslosung des jeweiligen Projekts. Die Anzahl der Lose hängt dabei von der Höhe deiner Spende ab:',
    amount_10: '10 €',
    amount_20: '20 €',
    amount_30: '30 €',
    amount_100: '100 €',
    yields: 'ergeben',
    tickets_20: '20 Lose',
    tickets_80: '80 Lose',
    tickets_160: '160 Lose',
    tickets_650: '650 Lose',
    one_time: 'Einmalige Spende',
    law_text:
      'Hinweis: In Portugal gilt die derzeit gültige Fassung des Gesetzesdekrets Nr. 422/89 (2. Dezember) mit den Änderungen durch die Decreto‑Lei Nr. 10/95, Nr. 64/2015 und Nr. 98/2018. Unsere Projekte und unser Crowdfunding richten sich nach diesen Regelungen.',
    free_entry_prefix: 'Kostenlose Teilnahme möglich:',
    odds_text: 'Gewinnchancen: Jedes Los hat die gleiche Gewinnchance – unabhängig davon, ob es durch eine Spende erworben oder über die kostenlose Teilnahme erhalten wurde. Mehrere Lose erhöhen die Gewinnchance entsprechend.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Projektbezogene Spenden & Crowdfunding',
    ends_in: 'Endet in:',
    donate_now: 'Jetzt spenden',
    expired: 'Abgelaufen',
    summary_title: 'Zusammenfassung für die Website',
    summary_items: [
      'Spenden allgemein oder projektbezogen – alles zählt gleich',
      'Dynamische Übersicht mit Live-Beträgen (Google Sheet Integration)',
      'Neustarthilfe & Sicherer Hafen schaffen langfristige Sicherheit und Perspektive',
      'Giveaways & Verlosungen schaffen Mehrwert für die Community',
      'Minimalistisches, klares Design: Jeder sieht sofort, was erreicht wurde und was noch fehlt',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Alle Rechte vorbehalten.',
    built_by: 'Erstellt von Sankofa Digital OÜ in Kooperation mit Sankofa Living & Learning.',
    built_by_prefix: 'Erstellt von',
    built_by_suffix: 'in Kooperation mit Sankofa Living & Learning.',
    popup_title: 'Willkommen! 👋',
    popup_body: 'Diese Seite zeigt eine dynamische Übersicht über alle Projekte. Du kannst oben die Sprache wählen. Dieses Hinweis-Fenster erscheint nur beim ersten Besuch.',
    popup_close: 'Verstanden',
    project9_points: [
      'Wasser, Energie und Nahrung vor Ort — echte Autarkie',
      'Gemeinschaftsbereiche: Küche, Lernen, Kultur',
      'Etappenplan bis zu 10 autarke Mobilheime',
    ],
    project10_points: [
      'Kauf Camp Calma; Brunnenbohrung; Solaranlage',
      'Erste Unterkünfte: Wohnwagen, Bell Tent, Campervan; Vorbereitung Tiny House; Einzäunung',
      'Privat finanziert von Gründer Daniel Duroshola; abgeschlossen; Gesamtkosten: 90.000 €',
    ],
  },
  en: {
    project10_points: [
      'Purchase Camp Calma; well drilling; solar installation',
      'First accommodations: caravan, bell tent, campervan; tiny house prep; fencing',
      'Privately funded by founder Daniel Duroshola; completed; total cost: €90,000',
    ],
    project9_points: [
      'Water, energy and food on site — real self‑sufficiency',
      'Community spaces: kitchen, learning, culture',
      'Phased plan up to 10 self‑sufficient mobile homes',
    ],
    projects: {
      6: { title: '6. Upgrade Camp Calma Landscape' },
      8: { title: '8. Donation and Support for Nilua' },
      10: { title: '10. Camp Calma – Purchase, Well, Solar & First Accommodations (completed)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Overview & Summary',
    mission: 'Our Mission',
    mission_text:
      'Every donation counts equally, whether general or project‑specific.',
    restart: 'Fresh Start Support',
    restart_text:
      'Support for members, creators and off‑grid pioneers starting with new ideas or seeking a sustainable life.',
    safe_harbor: 'Safe Harbor',
    safe_harbor_text:
      'A protected space for stability, growth and long‑term perspective.',
    transparency: 'Transparency & Dynamics',
    transparency_text: 'This page is a modern, dynamic crowdfunding overview.',
    general_donations: 'General Donation Options',
    donate_camp: '🌿 Donation and Support for Camp Calma',
    donate_sankofa: '🌍 Donation and Support for Sankofa Living & Learning',
    how_crowdfunding: 'How the Crowdfunding Works',
    raffle_rule:
      'Each donation in projects 2–6 earns you tickets for that project’s raffle. The number of tickets depends on your donation amount:',
    amount_10: '€10',
    amount_20: '€20',
    amount_30: '€30',
    amount_100: '€100',
    yields: 'gives',
    tickets_20: '20 tickets',
    tickets_80: '80 tickets',
    tickets_160: '160 tickets',
    tickets_650: '650 tickets',
    one_time: 'One‑time donation',
    law_text:
      'Note: In Portugal, the version in force of Decree‑Law No. 422/89 (2 December), with the amendments introduced by Decree‑Law Nos. 10/95, 64/2015 and 98/2018, applies to raffles. Our projects and crowdfunding operate in accordance with these regulations.',
    free_entry_prefix: 'Free entry available:',
    odds_text: 'Odds: Every ticket has the same chance of winning, whether obtained via donation or through the free entry option. Holding multiple tickets increases your chances proportionally.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Project‑based Donations & Crowdfunding',
    ends_in: 'Ends in:',
    donate_now: 'Donate now',
    expired: 'Expired',
    summary_title: 'Website Summary',
    summary_items: [
      'Donate generally or per project — all counts the same',
      'Dynamic overview with live totals (Google Sheets integration)',
      'Fresh Start & Safe Harbor provide long‑term stability',
      'Giveaways & raffles add value for the community',
      'Minimal, clear design: see progress at a glance',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. All rights reserved.',
    built_by_prefix: 'Built by',
    built_by_suffix: 'in cooperation with Sankofa Living & Learning.',
    popup_title: 'Welcome! 👋',
    popup_body: 'This page gives a dynamic overview of all projects. Use the language switcher at the top. This message appears only on your first visit.',
    popup_close: 'Got it',
  },
  pt: {
    project10_points: [
      'Compra do Camp Calma; furo de poço; instalação solar',
      'Primeiras acomodações: caravana, bell tent, campervan; preparação de tiny house; vedação',
      'Financiado com recursos próprios pelo fundador Daniel Duroshola; concluído; custo total: €90.000',
    ],
    project9_points: [
      'Água, energia e alimento no local — verdadeira autossuficiência',
      'Espaços comunitários: cozinha, aprendizagem, cultura',
      'Plano por etapas até 10 casas móveis autossuficientes',
    ],
    projects: {
      6: { title: '6. Upgrade da Paisagem do Camp Calma' },
      8: { title: '8. Doação e apoio para Nilua' },
      10: { title: '10. Camp Calma – Compra, furo de poço, solar e primeiras acomodações (concluído)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Visão geral & resumo',
    mission: 'Nossa missão',
    mission_text:
      'Toda doação conta igualmente, seja geral ou para um projeto específico.',
    restart: 'Ajuda para recomeço',
    restart_text:
      'Apoio para membros, criadores e pioneiros off‑grid com novas ideias ou rumo a uma vida sustentável.',
    safe_harbor: 'Porto seguro',
    safe_harbor_text:
      'Espaço de proteção e desenvolvimento com foco na estabilidade, crescimento e perspectiva.',
    transparency: 'Transparência & Dinâmica',
    transparency_text: 'Página de visão geral de crowdfunding dinâmica e moderna.',
    general_donations: 'Opções de doação geral',
    donate_camp: '🌿 Doação e apoio para Camp Calma',
    donate_sankofa: '🌍 Doação e apoio para Sankofa Living & Learning',
    how_crowdfunding: 'Como funciona o crowdfunding',
    raffle_rule:
      'Cada doação nos projetos 2–6 garante bilhetes para o sorteio correspondente. A quantidade depende do valor doado:',
    amount_10: '10 €',
    amount_20: '20 €',
    amount_30: '30 €',
    amount_100: '100 €',
    yields: 'resulta em',
    tickets_20: '20 bilhetes',
    tickets_80: '80 bilhetes',
    tickets_160: '160 bilhetes',
    tickets_650: '650 bilhetes',
    one_time: 'Doação única',
    law_text:
      'Versão em vigor do Decreto‑Lei n.º 422/89 (2 de dezembro), com as alterações introduzidas pelos Decreto‑Lei n.º 10/95, n.º 64/2015 e n.º 98/2018, aplicável a rifas. Os nossos projetos e o nosso crowdfunding atuam em conformidade com estas regras.',
    free_entry_prefix: 'Participação gratuita disponível:',
    odds_text: 'Probabilidades: Cada bilhete tem a mesma hipótese de ganhar, seja adquirido por doação ou pela participação gratuita. Vários bilhetes aumentam proporcionalmente as suas hipóteses.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Doações por projeto & crowdfunding',
    ends_in: 'Termina em:',
    donate_now: 'Doar agora',
    expired: 'Expirado',
    summary_title: 'Resumo para o site',
    summary_items: [
      'Doações gerais ou por projeto — tudo conta igual',
      'Visão dinâmica com totais ao vivo (integração Google Sheets)',
      'Ajuda para recomeço & Porto seguro criam estabilidade',
      'Giveaways & sorteios agregam valor à comunidade',
      'Design minimalista e claro: progresso visível de imediato',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Todos os direitos reservados.',
    built_by: 'Criado por Sankofa Digital OÜ em cooperação com Sankofa Living & Learning.',
    built_by_prefix: 'Criado por',
    built_by_suffix: 'em cooperação com Sankofa Living & Learning.',
    popup_title: 'Bem-vindo! 👋',
    popup_body: 'Esta página mostra uma visão dinâmica de todos os projetos. Use o seletor de idioma no topo. Esta mensagem aparece apenas na primeira visita.',
    popup_close: 'Entendi',
  },
  twi: {
    project10_points: [
      'Tɔ Camp Calma; bobɔ nsutene; solar ahyehyɛe',
      'Ofie a ɛto so kan: caravan, bell tent, campervan; tiny house ho nhyehyɛe; afasuo',
      'Grɔndafoɔ Daniel Duroshola na ɔde ne sika yɛe; awiei; boɔ nyinaa: €90,000',
    ],
    project9_points: [
      'Nsuo, tumi (ɛnergy) ne aduan wɔ beae no — ankamanhwɛ ankasa',
      'Amammrebea: aduane fie, sukuu, amammerɛ',
      'Nhyiamu-nhyehyɛe kɔsi mobilheim 10 a wodi wɔn ho',
    ],
    projects: {
      6: { title: '6. Nsakrae wɔ Camp Calma asase ho' },
      8: { title: '8. Mmoa ne Sika ma Nilua' },
      10: { title: '10. Camp Calma – Tɔ asase, asutene, solar ne ofie a edi kan (ewie)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Nkyerɛmu & Kɛse‑nsɛnhunu',
    mission: 'Yɛn botaeɛ',
    mission_text: 'Mmɔhoɔ biara kɔ mu pɛ, sɛ ɛyɛ kɛse anaa ɛyɛ adwumayɛ titiriw mu.',
    restart: 'Fi‑fie mmoa',
    restart_text: 'Mmoa ma membifo, nnwumafoɔ ne off‑grid pioniafoɔ a wɔrehyɛ ase anaa rehwehwɛ abrabɔ a ɛkɔ so tenten.',
    safe_harbor: 'Baabi a ɛyɛ den',
    safe_harbor_text: 'Baabi a ɛma gyidie, nkɔsoɔ ne daakye kɛse.',
    transparency: 'Pupɔ & Ntɛmntɛm',
    transparency_text: 'Kratafa yi yɛ crowdfunding kɔkɔbɔ a ɛyɛ fɛ na ɛyɛ ntɛmntɛm.',
    general_donations: 'Sika mmoa kɛse',
    donate_camp: '🌿 Mmoa ne Sika ma Camp Calma',
    donate_sankofa: '🌍 Mmoa ne Sika ma Sankofa Living & Learning',
    how_crowdfunding: 'Ɛkwan a crowdfunding yɛ so',
    raffle_rule: 'Sika mmoa biara wɔ adwuma 2–6 mu de ma wo lotto‑bɔɔl ma saa adwuma no. Bɔɔl dodow gyina sika a wode to so.',
    amount_10: '€10', amount_20: '€20', amount_30: '€30', amount_100: '€100',
    yields: 'ma', tickets_20: 'Bɔɔl 20', tickets_80: 'Bɔɔl 80', tickets_160: 'Bɔɔl 160', one_time: 'Sika mmɔhoɔ pɛ', tickets_650: 'Bɔɔl 650',
    law_text: 'Kɔkɔbɔ: Portugal mu, Decree‑Law No. 422/89 (December 2) a ɛda so wɔ mmara mu, a wɔasakra no wɔ Decree‑Law No. 10/95, 64/2015 ne 98/2018 mu, na ɛdi raffle ho dwuma. Yɛn adwumayɛdeɛ ne crowdfunding di saa mmara no akyi.',
    free_entry_prefix: 'Wobetumi asɛɛ kwa:',
    odds_text: 'Akɔnnɔdie: Bɔɔl biara wɔ sukuu‑kɔ so pɛ; sɛ wowɔ bɔɔl bebree a, ɛma wo akansi kɔ so.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Sika mmoa ma adwuma biara & crowdfunding',
    ends_in: 'Esi mu:', donate_now: 'Tɔ mmɔhoɔ seisei', expired: 'Ewiei',
    summary_title: 'Kratafa tiawa',
    summary_items: [
      'Sika mmoa kɛse anaa ma adwuma — nyinaa kɔ mu pɛ',
      'Dwumadie kɔkɔbɔ a ɛda tebea no adi (Google Sheets)',
      'Fi‑fie mmoa & Baabi a ɛyɛ den ma teteɛ',
      'Giveaway & raffle ma kurom no mfasoɔ',
      'Fɛfɛ, kɛse‑kɛse na ɛteɛteɛ: hwɛ nkɔsoɔ ntɛm',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Nhyɛsoɔ nyinaa wɔ akyi.',
    built_by_prefix: 'Wɔbɔe no de',
    built_by_suffix: 'ne Sankofa Living & Learning bom.',
    popup_title: 'Akwaaba! 👋',
    popup_body: 'Kratafa yi ma adwuma nyinaa ho nhwɛsoɔ. Fa kasa‑paakyɛ no wɔ soro. Saa asɛmpaka yi bɛda so pɛ na ɛbɛda wo anim bere a edi kan.',
    popup_close: 'Ate ase',
  },
  ig: {
    project10_points: [
      'Zụta Camp Calma; ịkụ olulu mmiri; arụ安装 solar',
      'Ebe obibi mbụ: karavaan, bell tent, campervan; nhazi tiny house; mgbidi/ogige',
      'A kwụrụ ụgwọ site na ego onye guzobere ya, Daniel Duroshola; arụchara; ọnụahịa niile: €90,000',
    ],
    project9_points: [
      'Mmiri, ike na nri n’otu ebe — nnwere onwe n’eziokwu',
      'Ụlọ ọrụ obodo: kichin, ọmụmụ, omenala',
      'Atụmatụ n’ogologo ruo ụlọ nkwakọba (mobilheim) 10 kwụsiri ike',
    ],
    projects: {
      6: { title: '6. Mmelite ọdịdị ala Camp Calma' },
      8: { title: '8. Onyinye na nkwado maka Nilua' },
      10: { title: '10. Camp Calma – Azụta, olulu mmiri, solar na ebe obibi mbụ (emezuru)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Nchikota & Nkọwa',
    mission: 'Ebumnuche anyi',
    mission_text: 'Onyinye ọ bụla bara uru, ma ọ bụ nke izugbe ma ọ bụ nke oru.',
    restart: 'Nkwado mbido',
    restart_text: 'Nkwado maka ndị otu, ndị okike na ndị pionia off‑grid nwere echiche ọhụrụ.',
    safe_harbor: 'Ụzọ nchekwa',
    safe_harbor_text: 'Ebe nchekwa maka ịdịte aka, uto na echiche d��� ogologo.',
    transparency: 'Ịtọgharị anya & Mmegharị',
    transparency_text: 'Ihe ngosi crowdfunding oge a na nke doro anya.',
    general_donations: 'Nhọrọ onyinye izugbe',
    donate_camp: '🌿 Onyinye na nkwado maka Camp Calma',
    donate_sankofa: '🌍 Onyinye na nkwado maka Sankofa Living & Learning',
    how_crowdfunding: 'Otu crowdfunding si arụ ọrụ',
    raffle_rule: 'Onyinye ọ bụla n’oru 2–6 na-enye gị tiketi maka oru ahụ. Ọnụ ọgụgụ tiketi dabere na ego ị nyere.',
    amount_10: '€10', amount_20: '€20', amount_30: '€30', amount_100: '€100',
    yields: 'na-enye', tickets_20: 'Tiketi 20', tickets_80: 'Tiketi 80', tickets_160: 'Tiketi 160', one_time: 'Onyinye otu‑oge', tickets_650: 'Tiketi 650',
    law_text: 'Ndụmọdụ: Na Portugal, Decree‑Law No. 422/89 (2 December) dị ugbu a, gbanwere site na Decree‑Law Nos. 10/95, 64/2015 na 98/2018, metụtara raffles. Ụlọ ọrụ anyị na crowdfunding na-eso iwu ndị a.',
    free_entry_prefix: 'Ntinye n’efu dị:',
    odds_text: 'Ogo imeri: Tiketi ọ bụla nwere ohere kwekọrọ, ma ọ bụ site n’onyinye ma ọ bụ site n’ntinye n’efu. Inwe ọtụtụ tiketi na‑abawanye ohere gị nke ọma.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Onyinye dabere n’oru & crowdfunding',
    ends_in: 'Na‑akwụsị n’ime:', donate_now: 'Nyere aka ugbu a', expired: 'Agwụla',
    summary_title: 'Nchịkọta maka websaịtị',
    summary_items: [
      'Nyere aka n’ozuzu ma ọ bụ n’oru — niile bụ otu',
      'Nlele dị ndụ nke ego (Google Sheets)',
      'Nkwado mbido & Ụzọ nchekwa na-eweta ịdịte aka',
      'Giveaways & raffles bara uru n’obodo',
      'Imewe doro anya: hụ ihe e rụzuru ozugbo',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Ikike niile echekwabara.',
    built_by_prefix: 'Kere site na',
    built_by_suffix: 'na imekọrịta Sankofa Living & Learning.',
    popup_title: 'Nnọọ! 👋',
    popup_body: 'Peeji a na-egosi nlele oru niile. Họrọ asụsụ n’elu. Ozi a na-apụta naanị ugboro mbụ i bịara.',
    popup_close: 'Eji m mara',
  },
  nl: {
    project10_points: [
      'Aankoop Camp Calma; putboring; zonne‑installatie',
      'Eerste verblijven: caravan, bell tent, campervan; voorbereiding tiny house; omheining',
      'Privégefinancierd door oprichter Daniel Duroshola; afgerond; totale kosten: €90.000',
    ],
    project9_points: [
      'Water, energie en voedsel ter plekke — echte zelfvoorziening',
      'Gemeenschappelijke ruimtes: keuken, leren, cultuur',
      'Gefaseerd plan tot 10 autonome mobilhomes',
    ],
    projects: {
      6: { title: '6. Upgrade Camp Calma Landschap' },
      8: { title: '8. Donatie en steun voor Nilua' },
      10: { title: '10. Camp Calma – Aankoop, putboring, zonnepanelen & eerste verblijven (afgerond)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Overzicht & samenvatting',
    mission: 'Onze missie',
    mission_text: 'Elke donatie telt evenveel, algemeen of per project.',
    restart: 'Nieuwe start‑steun',
    restart_text: 'Steun voor leden, creators en off‑grid pioniers met nieuwe ideeën.',
    safe_harbor: 'Veilige haven',
    safe_harbor_text: 'Een plek voor stabiliteit, groei en een lange‑termijn perspectief.',
    transparency: 'Transparantie & dynamiek',
    transparency_text: 'Een moderne, dynamische crowdfunding‑overzichtspagina.',
    general_donations: 'Algemene donatiemogelijkheden',
    donate_camp: '🌿 Donatie en steun voor Camp Calma',
    donate_sankofa: '🌍 Donatie en steun voor Sankofa Living & Learning',
    how_crowdfunding: 'Zo werkt het crowdfunden',
    raffle_rule: 'Elke donatie in projecten 2–6 levert loten op voor dat project. Het aantal loten hangt af van je donatiebedrag.',
    amount_10: '€10', amount_20: '€20', amount_30: '€30', amount_100: '€100',
    yields: 'geeft', tickets_20: '20 loten', tickets_80: '80 loten', tickets_160: '160 loten', one_time: 'Eenmalige donatie', tickets_650: '650 loten',
    law_text: 'Let op: In Portugal is de geldende versie van Decreto‑Lei nr. 422/89 (2 december), met wijzigingen door Decreto‑Lei nr. 10/95, 64/2015 en 98/2018, van toepassing op verlotingen. Onze projecten en ons crowdfunding handelen in overeenstemming met deze regels.',
    free_entry_prefix: 'Gratis deelname mogelijk:',
    odds_text: 'Winkansen: Elk lot heeft gelijke kans, ongeacht of het via donatie of gratis deelname is verkregen. Meer loten betekent meer kans, evenredig.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Projectdonaties & crowdfunding',
    ends_in: 'Eindigt over:', donate_now: 'Nu doneren', expired: 'Voorbij',
    summary_title: 'Samenvatting voor de site',
    summary_items: [
      'Algemeen of per project doneren — alles telt',
      'Dynamisch overzicht met live bedragen (Google Sheets)',
      'Nieuwe start & Veilige haven zorgen voor stabiliteit',
      'Giveaways & verlotingen voegen waarde toe',
      'Minimalistisch en helder: voortgang in één oogopslag',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Alle rechten voorbehouden.',
    built_by: 'Gemaakt door Sankofa Digital OÜ in samenwerking met Sankofa Living & Learning.',
    built_by_prefix: 'Gemaakt door',
    built_by_suffix: 'in samenwerking met Sankofa Living & Learning.',
    popup_title: 'Welkom! 👋',
    popup_body: 'Deze pagina geeft een dynamisch overzicht van alle projecten. Bovenin kies je de taal. Dit bericht verschijnt alleen bij je eerste bezoek.',
    popup_close: 'Begrepen',
  },
  fr: {
    project10_points: [
      'Achat de Camp Calma; forage de puits; installation solaire',
      'Premiers hébergements : caravane, tente cloche, campervan; préparation tiny house; clôture',
      'Financé sur fonds propres par le fondateur Daniel Duroshola; terminé; coût total : 90 000 €',
    ],
    project9_points: [
      'Eau, énergie et nourriture sur place — véritable autonomie',
      'Espaces communautaires : cuisine, apprentissage, culture',
      'Plan par étapes jusqu’à 10 maisons mobiles autonomes',
    ],
    projects: {
      6: { title: '6. Amélioration du paysage de Camp Calma' },
      8: { title: '8. Don et soutien pour Nilua' },
      10: { title: '10. Camp Calma – Achat, forage, solaire et premiers hébergements (terminé)' },
    },
    title: 'Sankofa Living & Learning Projects',
    subtitle: 'Aperçu & résumé',
    mission: 'Notre mission',
    mission_text: 'Chaque don compte de la même manière, général ou par projet.',
    restart: 'Aide au nouveau départ',
    restart_text: 'Soutien aux membres, créateurs et pionniers off‑grid avec de nouvelles idées.',
    safe_harbor: 'Port d’accueil',
    safe_harbor_text: 'Un espace protégé pour la stabilité, la croissance et la perspective à long terme.',
    transparency: 'Transparence & dynamique',
    transparency_text: 'Une page moderne et dynamique de synthèse du financement participatif.',
    general_donations: 'Dons généraux',
    donate_camp: '🌿 Don et soutien pour Camp Calma',
    donate_sankofa: '🌍 Don et soutien pour Sankofa Living & Learning',
    how_crowdfunding: 'Comment fonctionne le crowdfunding',
    raffle_rule: 'Chaque don dans les projets 2 à 6 vous donne des billets pour la tombola du projet. Leur nombre dépend du montant donné.',
    amount_10: '10 €', amount_20: '20 €', amount_30: '30 €', amount_100: '100 €',
    yields: 'donne', tickets_20: '20 billets', tickets_80: '80 billets', tickets_160: '160 billets', one_time: 'Don unique', tickets_650: '650 billets',
    law_text: 'À noter : Au Portugal, la version en vigueur du décret‑loi n° 422/89 (2 décembre), avec les modifications des décrets‑lois n° 10/95, 64/2015 et 98/2018, s’applique aux tombolas. Nos projets et notre crowdfunding respectent ces règles.',
    free_entry_prefix: 'Participation gratuite possible :',
    odds_text: 'Chances de gain : chaque billet a la même probabilité de gagner, qu’il soit obtenu par don ou via l’option gratuite. Plusieurs billets augmentent vos chances de manière proportionnelle.',
    ministry: 'Ministério da Administração Interna',
    project_donations: 'Dons par projet & financement participatif',
    ends_in: 'Se termine dans :', donate_now: 'Donner maintenant', expired: 'Expiré',
    summary_title: 'Résumé pour le site',
    summary_items: [
      'Dons généraux ou par projet — tout compte',
      'Aperçu dynamique avec montants en direct (Google Sheets)',
      'Nouveau départ & Port d’accueil pour la stabilité',
      'Giveaways & tombolas apportent de la valeur',
      'Design minimal et clair : progression visible d’un coup d’œil',
    ],
    footer: '© 2024 Sankofa Living & Learning Projects. Tous droits réservés.',
    built_by: 'Réalisé par Sankofa Digital OÜ en coopération avec Sankofa Living & Learning.',
    built_by_prefix: 'Réalisé par',
    built_by_suffix: 'en coopération avec Sankofa Living & Learning.',
    popup_title: 'Bienvenue ! 👋',
    popup_body: 'Cette page présente une vue dynamique de tous les projets. Choisissez la langue en haut. Ce message n’apparaît qu’à la première visite.',
    popup_close: 'Compris',
  },
};

const YT_ID = 'sG3dgRxuIHc';

const DEADLINES = {
  1: new Date('2025-09-26T18:00:00-07:00').getTime(),
  2: new Date('2025-10-03T23:59:59').getTime(),
  3: new Date('2025-10-03T23:59:59').getTime(),
  4: new Date('2025-10-30T18:00:00-07:00').getTime(),
  5: new Date('2025-10-30T23:59:59').getTime(),
  6: new Date('2025-10-15T23:59:59').getTime(),
};

function useCountdownMap(ids) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return useMemo(() => {
    const map = {};
    ids.forEach((id) => {
      const end = DEADLINES[id];
      if (!end) return;
      const distance = end - now;
      if (distance <= 0) {
        map[id] = { expired: true, text: '' };
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        map[id] = { expired: false, text: `${days}d ${hours}h ${minutes}m ${seconds}s` };
      }
    });
    return map;
  }, [now, ids]);
}

const projects = [
  { id: 1, title: '1. Giveaway', desc: 'Ein Giveaway für die Community, um den Aufbau und die Unterstützung von Sankofa Living & Learning zu feiern.', target: 100, current: 100, tags: ['Kostenlos', 'Starthilfe', 'Creator'], link: null },
  { id: 2, title: '2. Ausbau Quinta Calma', desc: 'Dieses Projekt dient dem Ausbau von Quinta Calma, um mehr Raum f��r Projekte und Retreats zu schaffen.', target: 15000, current: 8250, tags: ['Starthilfe', 'Creator', 'Crowdfunding'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 3, title: '3. Mobilheim "Eban" – Schutz & Geborgenheit', desc: 'Unterstütze das Crowdfunding für das Mobilheim „Eban“. Eban (Adinkra) steht für Schutz und Geborgenheit – ein sicherer Raum für Pioniere.', target: 20000, current: 11000, tags: ['Starthilfe', 'Offgrid', 'Crowdfunding'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 4, title: '4. Mobilheim "Fihankra" – Zuhause & Gemeinschaft', desc: 'Exklusiv für Mitglieder: Das Mobilheim „Fihankra“. Fihankra (Adinkra) symbolisiert Haus/Compound – Gemeinschaft, Zugehörigkeit und Sicherheit.', target: 29000, current: 15000, tags: ['Member only Giveaway', 'Neustarthilfe', 'Sicherer Hafen', 'Offgrid', 'Creator'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 5, title: '5. Mobilheim "Nkyinkyim" – Bewegung & Wandel', desc: 'Für Mitglieder: Das Mobilheim „Nkyinkyim“. Nkyinkyim (Adinkra) steht für Dynamik, Veränderung und Beweglichkeit – ideal für flexible Lebenswege.', target: 25000, current: 10000, tags: ['Member only Giveaway', 'Neustarthilfe', 'Sicherer Hafen', 'Travel', 'Creator'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 6, title: '6. Upgrade Camp Calma Landscape', desc: 'Hilf mit, die Landschaft von Camp Calma zu verbessern, um eine noch schönere und funktionalere Umgebung zu schaffen.', target: 28000, current: 9500, tags: ['Member only Giveaway', 'Neustarthilfe', 'Sicherer Hafen', 'Travel', 'Creator'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 7, title: '7. Afro Village', desc: '', target: 5000, current: 2500, tags: ['Neustarthilfe', 'Sicherer Hafen', 'App', 'Community'], link: 'https://afrovillage.sankofa-ngo.org/' },
  { id: 8, title: '8. Donation and Support for Nilua', desc: '', target: 5000, current: 0, tags: ['Community', 'Support', 'Nilua', 'Music'], link: 'https://donation.sankofa-ngo.org/b/14A5kFebJ3n317J9soe3e02' },
  { id: 9, title: '9. Sankofa Village – Ein Dorf der Autarkie', desc: 'Schritt für Schritt bauen wir ein Dorf, das Lernen, Gemeinschaft und Selbstversorgung lebt. Jeder Beitrag baut mit.', target: 1000000, current: 325000, tags: ['Community', 'Offgrid', 'Bildung', 'Nachhaltigkeit'], link: 'https://sankofavillage.sankofa-ngo.org/' },
  { id: 10, title: '10. Camp Calma – Kauf, Brunnen, Solar & erste Unterkünfte (abgeschlossen)', desc: 'Vom Gründer Daniel Duroshola privat finanziert; Projekt abgeschlossen. Gesamtkosten bisher: 90.000 €.', target: 90000, current: 90000, tags: ['Abgeschlossen', 'Camp Calma', 'Infrastruktur', 'Selbstfinanziert'], link: null },
];

function Tag({ children }) {
  return (
    <span className="bg-gray-200 text-green-700 text-sm font-medium px-2 py-0.5 rounded-full border border-green-400">
      {children}
    </span>
  );
}

function Progress({ current, target }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="w-full bg-gray-300 rounded-full h-2.5 my-4">
      <div className="bg-green-500 h-2.5 rounded-full progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Currency({ value }) {
  return <>{value.toLocaleString('de-DE')} €</>;
}

export default function App() {
  const [lang, setLang] = useState('de');
  const [showPopup, setShowPopup] = useState(false);
  const t = i18n[lang];
  const countdownMap = useCountdownMap([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const key = 'sllp_first_visit';
    try {
      if (!localStorage.getItem(key)) {
        setShowPopup(true);
        localStorage.setItem(key, '1');
      }
    } catch (e) {
      setShowPopup(true);
    }
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 antialiased">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Simple language switcher (preserves multilingual background) */}
        <div className="flex justify-end mb-4">
          <select
            className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="de">DE</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="twi">TWI</option>
            <option value="ig">IG</option>
            <option value="nl">NL</option>
            <option value="fr">FR</option>
          </select>
        </div>

        {/* Hero with background image */}
        <section className="hero-background rounded-3xl overflow-hidden mb-12">
          <div className="hero-min-h bg-black/50 flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 md:py-28 text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">{t.title}</h1>
            <p className="mt-4 text-2xl font-light opacity-90">{t.subtitle}</p>
          </div>
        </section>

        {/* Tiles */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-300">
              <h2 className="text-2xl font-semibold mb-3 text-green-600">{t.mission}</h2>
              <p className="text-gray-700 text-sm">{t.mission_text}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-300">
              <h2 className="text-2xl font-semibold mb-3 text-green-600">{t.restart}</h2>
              <p className="text-gray-700 text-sm">{t.restart_text}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-300">
              <h2 className="text-2xl font-semibold mb-3 text-green-600">{t.safe_harbor}</h2>
              <p className="text-gray-700 text-sm">{t.safe_harbor_text}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-300">
              <h2 className="text-2xl font-semibold mb-3 text-green-600">{t.transparency}</h2>
              <p className="text-gray-700 text-sm">{t.transparency_text}</p>
            </div>
          </div>
        </section>

        {/* General Donations */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-green-600 text-center">{t.general_donations}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="#"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-center"
            >
              {t.donate_camp}
            </a>
            <a
              href="#"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-center"
            >
              {t.donate_sankofa}
            </a>
          </div>
        </section>

        {/* Crowdfunding rules */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">{t.how_crowdfunding}</h2>
            <p className="text-gray-700 text-center">{t.raffle_rule}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-center">
              <a href="https://donate.sankofa-ngo.org/b/eVqbJ2aejgTy8amgbRgfu05" target="_blank" rel="noreferrer" className="flex-1 p-4 bg-green-50 rounded-xl shadow-inner border border-green-200 block hover:bg-green-100 hover:border-green-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-200 transition-colors">
                <span className="text-3xl font-extrabold text-green-600">{t.amount_10}</span><br />
                <span className="text-sm text-gray-700">{t.yields}</span><br />
                <span className="text-xs font-medium text-gray-600">{t.tickets_20}</span>
              </a>
              <a href="https://donate.sankofa-ngo.org/b/eVqbJ2aejgTy8amgbRgfu05" target="_blank" rel="noreferrer" className="flex-1 p-4 bg-green-50 rounded-xl shadow-inner border border-green-200 block hover:bg-green-100 hover:border-green-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-200 transition-colors">
                <span className="text-3xl font-extrabold text-green-600">{t.amount_20}</span><br />
                <span className="text-sm text-gray-700">{t.yields}</span><br />
                <span className="text-xs font-medium text-gray-600">{t.tickets_80}</span>
              </a>
              <a href="https://donate.sankofa-ngo.org/b/eVqbJ2aejgTy8amgbRgfu05" target="_blank" rel="noreferrer" className="flex-1 p-4 bg-green-50 rounded-xl shadow-inner border border-green-200 block hover:bg-green-100 hover:border-green-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-200 transition-colors">
                <span className="text-3xl font-extrabold text-green-600">{t.amount_30}</span><br />
                <span className="text-sm text-gray-700">{t.yields}</span><br />
                <span className="text-xs font-medium text-gray-600">{t.tickets_160}</span>
              </a>
              <a href="https://donate.sankofa-ngo.org/b/eVqbJ2aejgTy8amgbRgfu05" target="_blank" rel="noreferrer" className="flex-1 bg-green-600 text-white rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 ring-2 ring-green-400/60 bg-gradient-to-br from-green-600 to-green-600/95">
                <div className="font-extrabold text-5xl mb-2">{t.amount_100}</div>
                <div className="text-sm uppercase tracking-wide opacity-80">{t.one_time}</div>
                <div className="text-xs font-medium opacity-70">{t.tickets_650}</div>
              </a>
            </div>
            <p className="text-gray-700 text-center mt-6">{t.law_text}</p>
            <p className="text-gray-700 text-center">{t.free_entry_prefix} <a href="https://amoe.campcalma.sankofa-ngo.org/" target="_blank" rel="noreferrer" className="text-green-600 underline">amoe.campcalma.sankofa-ngo.org</a></p>
          </div>
        </section>

        {/* Project cards */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-green-600 text-center">{t.project_donations}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => {
              const ytThumb = `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`;
              const countdown = countdownMap[p.id];
              const hasCountdown = DEADLINES[p.id];
              const displayTitle = (t.projects && t.projects[p.id] && t.projects[p.id].title) || p.title;
              return (
                <div key={p.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{(t.projects && t.projects[p.id] && t.projects[p.id].title) || p.title}</h3>
                  {p.desc && <p className="text-gray-700 text-sm mb-4">{p.desc}</p>}
                  {!!p.tags?.length && (
                    <p className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                      {p.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </p>
                  )}
                  <a href={`https://youtu.be/${YT_ID}`} target="_blank" rel="noreferrer" className="block">
                    <img src={ytThumb} alt="YouTube Video Thumbnail" className="w-full rounded-lg my-4" />
                  </a>

                  <Progress current={p.current} target={p.target} />

                  <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                    <span className="text-green-600"><Currency value={p.current} /></span>
                    <span><Currency value={p.target} /></span>
                  </div>

                  {hasCountdown && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center shadow-inner">
                      <div className="text-xs text-gray-500 uppercase font-medium">{t.ends_in}</div>
                      <div className="text-xl font-bold text-gray-800 mt-1">
                        {countdown?.expired ? t.expired : countdown?.text}
                      </div>
                    </div>
                  )}

                  {/* Specific bullet lists as per provided content */}
                  {p.id === 1 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li>🎁 MacBook Air M2</li>
                      <li>🎁 DJI Mini 3 Pro</li>
                    </ul>
                  )}
                  {p.id === 3 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li>🚐 Wohnwagen (3.000 €)</li>
                      <li>🏕️ Bell Tent Medium (1.000 €)</li>
                      <li>🏕️ House Tent Big (1.000 €)</li>
                    </ul>
                  )}
                  {p.id === 4 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li>🌳 Quinta Calma (20.000 €)</li>
                    </ul>
                  )}
                  {p.id === 5 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li>🏠 Mobilheim (25.000 €)</li>
                    </ul>
                  )}
                  {p.id === 6 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li>🚐 Ford Transit Campervan (15.000 €)</li>
                    </ul>
                  )}
                  {p.id === 7 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li><span className="font-semibold">Community Building:</span> Verbinde dich mit Gleichgesinnten in einer nachhaltigen Umgebung.</li>
                      <li><span className="font-semibold">Learning & Growth:</span> Meistere nachhaltige Technologien und digitales Know-how.</li>
                      <li><span className="font-semibold">Cultural Exchange:</span> Feiere und bewahre die Kultur der afrikanischen Diaspora.</li>
                    </ul>
                  )}
                  {p.id === 8 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      <li><span className="font-semibold">Musikequipment:</span> Ermögliche professionelle Aufnahmen und Live-Auftritte.</li>
                      <li><span className="font-semibold">Übergang nach Portugal:</span> Hilf bei Niluas Umzug zu Camp Calma als alleinerziehende Mutter.</li>
                      <li><span className="font-semibold">Nachhaltiges Leben:</span> Unterstütze die Vision eines selbstbestimmten Lebens.</li>
                    </ul>
                  )}
                  {p.id === 9 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      {(t.project9_points || []).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  )}
                  {p.id === 10 && (
                    <ul className="text-gray-700 space-y-2 mt-4">
                      {(t.project10_points || []).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  )}

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    >
                      {t.donate_now}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-300">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">{t.summary_title}</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {t.summary_items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Legal note bottom */}
        <div className="mt-12 text-center text-gray-700 space-y-2">
          <p>{t.law_text}</p>
          <p>{t.free_entry_prefix} <a href="https://amoe.campcalma.sankofa-ngo.org/" target="_blank" rel="noreferrer" className="text-green-600 underline">amoe.campcalma.sankofa-ngo.org</a></p>
          <p>{t.odds_text}</p>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div>{t.footer}</div>
          <div>
            <a href="mailto:projects@sankofa-ngo.org" className="text-green-600 underline">projects@sankofa-ngo.org</a>
          </div>
          <div>
            {t.built_by_prefix ? (
              <>
                {t.built_by_prefix} <a href="https://sankofadigital.sankofa-ngo.org/" target="_blank" rel="noreferrer" className="text-green-600 underline">Sankofa Digital OÜ</a> {t.built_by_suffix}
              </>
            ) : (
              t.built_by
            )}
          </div>
        </footer>

        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center modal-bg">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg mx-4 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-semibold text-green-700">{i18n.en.popup_title}</h3>
              <p className="text-gray-700 mt-3">{i18n.en.popup_body}</p>
              <div className="mt-4 flex justify-center">
                <select
                  className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="de">DE</option>
                  <option value="en">EN</option>
                  <option value="pt">PT</option>
                  <option value="twi">TWI</option>
                  <option value="ig">IG</option>
                  <option value="nl">NL</option>
                  <option value="fr">FR</option>
                </select>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-full transition-all duration-300"
              >
                {i18n.en.popup_close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
