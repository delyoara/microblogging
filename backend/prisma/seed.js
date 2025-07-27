// prisma/seed.js
import prisma from "../lib/prisma.js";
import slugify from 'slugify'; // npm install slugify (si vous ne l'avez pas déjà)

const usersData = [
  { username: 'pola', email: 'pola@mail.com', prenom: 'Pola', nom: 'Dupont', passwordHash: '...', role: 'USER' },
  { username: 'hugo', email: 'hugo@example.com', prenom: 'Hugo', nom: 'Martin', passwordHash: '...', role: 'USER' },
  { username: 'chloe', email: 'chloe@example.com', prenom: 'Chloé', nom: 'Lemoine', passwordHash: '...', role: 'USER' },
  { username: 'sofia', email: 'sofia@example.com', prenom: 'Sofia', nom: 'Herrera', passwordHash: '...', role: 'USER' },
  { username: 'claire', email: 'claire@example.com', prenom: 'Claire', nom: 'Dumont', passwordHash: '...', role: 'USER' },
  { username: 'mariana', email: 'mariana@example.com', prenom: 'Mariana', nom: 'Ríos', passwordHash: '...', role: 'USER' },
  { username: 'camille', email: 'camille@example.com', prenom: 'Camille', nom: 'Bernard', passwordHash: '...', role: 'USER' },
  { username: 'emma', email: 'emma@example.com', prenom: 'Emma', nom: 'Ruiz', passwordHash: '...', role: 'USER' },
  { username: 'julien', email: 'julien@example.com', prenom: 'Julien', nom: 'Moreau', passwordHash: '...', role: 'USER' },
  
];


// Vos données d'articles statiques complètes
const articlesData = [
  {
    imageUrl: "/monos.jpg",
    altText: "Monos, un chaos sublime venu de Colombie",
    categoryName: "Cinema", // Forcez le thème pour tous ces articles
    title: "Monos, un chaos sublime venu de Colombie",
    description: "Un thriller sensoriel et brutal au cœur des montagnes colombiennes...",
    authorName: "Pola Dupont",
    theme: "Culture",
    content: `
Sur les hauteurs brumeuses des Andes colombiennes, entre ciel menaçant et jungle étouffante, *Monos* d’Alejandro Landes explore les frontières floues entre l’innocence et la barbarie. Le film, salué internationalement, bouscule les conventions du cinéma de guerre avec une force esthétique et émotionnelle rare.

## Une guerre sans visage
Huit adolescents armés jusqu’aux dents gardent une otage américaine et une vache baptisée Shakira. Ce groupe rebelle — surnommé les « Monos » — reçoit ses ordres d’un mystérieux commandant via radio. Pourtant, la hiérarchie s’effrite rapidement, laissant place à l’instinct, à la folie et à la survie brute.

Ni le nom du pays ni celui de la guerre n’est mentionné. Landes ne cherche pas à documenter, mais à plonger le spectateur dans un état de confusion sensorielle, entre rêve et cauchemar. Le film prend des allures d’*Apocalypse Now*, croisé avec *Sa Majesté des mouches*.

## Une mise en scène viscérale
La caméra d’Alejandro Landes est organique, presque animale. Chaque plan semble respirer, suinter, haleter. La nature devient personnage, menaçante et indifférente. La musique envoûtante de Mica Levi (*Under the Skin*) complète ce tableau sonore d’une intensité rare, marquant chaque moment de tension d’un bourdonnement presque tribal. 

## 🇨🇴 Une jeunesse en perdition
*Monos* est aussi un cri d’alerte sur la fragilité des jeunes plongés dans la violence armée. À travers des personnages livrés à eux-mêmes, le film évoque la perte d’identité, l’absence de repères, et une humanité en ruine. Aucun manichéisme ici : seulement des enfants dévorés par la guerre, dans un monde sans adultes. 

## Un film à ne pas manquer
Récompensé à Sundance et sélectionné aux Oscars par la Colombie, *Monos* confirme l’émergence d’un cinéma colombien audacieux, politique et visuellement puissant.
`,
  },
  {
    imageUrl: "/les-glorieuses.png",
    altText: "Les Glorieuses, manifeste d’un féminisme inclusif et engagé",
    categoryName: "Féminisme",
    title: "Les Glorieuses, manifeste d’un féminisme inclusif et engagé",
    description: "Un essai percutant qui mêle données, récits et appels à l’action pour l’égalité des genres.",
    authorName: "Hugo Martin",
    theme: "Culture",
    content: `
Avec *Les Glorieuses*, Rebecca Amsellem signe un ouvrage accessible, didactique et profondément engagé. Née d’une newsletter devenue mouvement, cette œuvre hybride explore les luttes féministes d’hier et d’aujourd’hui à travers un prisme intersectionnel.

## Un féminisme politique
Pas question ici de féminisme tiède ou décoratif. Amsellem revendique une action politique concrète : congé menstruel, parité salariale, réformes structurelles. À l’aide de données et de témoignages, elle dresse un état des lieux sans fard des inégalités persistantes.

## Intersectionnalité et solidarité
Les voix de femmes racisées, queer, précaires ou en situation de handicap y trouvent une place centrale. L’autrice déconstruit le féminisme blanc dominant et appelle à un mouvement solidaire, à l’écoute des vécus multiples et souvent invisibilisés.

## Une lecture vivifiante
Dans une langue claire et incisive, *Les Glorieuses* donne des clés de compréhension et d’action. Le livre se lit comme un manifeste pour un monde plus juste — un féminisme des actes autant que des idées.
`,
  },
  {
    imageUrl: "/waterlicht.jpg",
    altText: "Waterlicht, une mer de lumière pour alerter sur le climat",
    categoryName: "Art",
    title: "Waterlicht, une mer de lumière pour alerter sur le climat",
    description: "Une installation poétique et immersive qui réinvente la montée des eaux à travers la lumière.",
    authorName: "Chloé Lemoine",
    theme: "Culture",
    content: `
À la tombée de la nuit, les visiteurs marchent sous une mer de lumière bleutée, envoûtante et mouvante. *Waterlicht*, œuvre de l'artiste néerlandais Daan Roosegaarde, transforme l’espace urbain en une expérience sensorielle autant qu’un message d’alerte.

## Une simulation poétique
À l’aide de lasers et de brouillard artificiel, l’artiste crée une illusion saisissante : celle d’être immersé sous une vague virtuelle. Le spectateur prend conscience, de façon physique et émotionnelle, des effets de la montée des eaux liée au changement climatique.

## Art, science et écologie
Roosegaarde inscrit son travail à la croisée de l’art et de la technologie. *Waterlicht* est présenté dans des villes menacées par la mer, suscitant débat et réflexion autour de l’adaptation urbaine et de la responsabilité collective.

## Une œuvre à vivre
Plus qu’une simple installation, *Waterlicht* est une expérience collective, immersive et poétique. Une preuve que l’art peut éveiller les consciences sans discours, par la simple magie de la lumière.
`,
  },
  {
    imageUrl: "/vivantes.jpg",
    altText: "Vivantes !, un hommage à la résilience des femmes artistes",
    categoryName: "Exposition",
    title: "Vivantes !, un hommage à la résilience des femmes artistes",
    description: "Une exposition collective poignante qui met à l’honneur des voix féminines invisibilisées de l’art contemporain.",
    authorName: "Sofia Herrera", 
    theme: "Culture",
    content: `
Présentée au Palais de Tokyo, l’exposition *Vivantes !* rassemble une trentaine d’artistes femmes, issues de continents et d’histoires diverses. Loin des poncifs esthétiques, l’exposition est un cri de vie, une traversée sensible des blessures, des luttes et des renaissances.

## Des œuvres incarnées
Peintures, vidéos, installations, broderies… Chaque médium devient un moyen de résistance. Le corps féminin y est omniprésent, tantôt célébré, tantôt mutilé, mais toujours revendiqué comme territoire politique.

## Une cartographie engagée
Des artistes algériennes, brésiliennes, iraniennes ou françaises racontent l’exil, la guerre, les violences, mais aussi la solidarité et la sororité. L’exposition propose un regard pluriel, refusant tout discours homogène sur la « femme artiste ».

## Une exposition nécessaire
*Vivantes !* secoue, émeut, questionne. Elle rappelle l’importance d’accorder une vraie place aux artistes femmes dans les institutions et l’histoire de l’art.
`,
  },
  {
    imageUrl: "/survival.jpg",
    altText: "Survival International, la voix des peuples autochtones",
    categoryName: "Anthropologie",
    title: "Survival International, la voix des peuples autochtones",
    description: "Une organisation en première ligne pour la défense des droits des peuples indigènes à travers le monde.",
    authorName: "Claire Dumont",
    theme: "Culture",
    content: `
Depuis 1969, *Survival International* lutte aux côtés des peuples autochtones pour défendre leurs terres, leurs droits et leurs cultures. En dénonçant les violences coloniales modernes, l’organisation propose une approche radicalement respectueuse de l’autodétermination des peuples.

## Défendre sans parler à la place
Contrairement à certaines ONG paternalistes, Survival ne se substitue pas aux communautés. Elle relaie leur parole, soutient leurs campagnes et les aide à faire pression sur les gouvernements et multinationales responsables de spoliations ou de génocides culturels.

## Un combat global
Des Yanomami du Brésil aux Pygmées d’Afrique centrale, Survival agit sur tous les continents. Ses campagnes alertent sur les menaces des projets extractivistes, des routes illégales ou du tourisme forcé. 

## Une anthropologie engagée
En refusant l’exotisation et en plaçant les peuples autochtones au centre de leur récit, Survival réinvente une anthropologie de terrain, militante et éthique. Une voix précieuse dans un monde qui efface encore trop souvent ses peuples premiers.
`,
  },
  {
    imageUrl: "/los-reyes.jpg",
    altText: "Los Reyes del Mundo, une odyssée brute dans la Colombie invisible",
    categoryName: "Cinema",
    title: "Los Reyes del Mundo, une odyssée brute dans la Colombie invisible",
    description: "Un road movie poétique et rageur sur la jeunesse des rues à la recherche d’une terre promise.",
    authorName: "Mariana Ríos",
    theme: "Culture",
    content: `
*Los Reyes del Mundo* de Laura Mora Ortega suit cinq adolescents marginaux, errant dans une Colombie post-conflit, à la recherche d’un territoire hérité de leurs ancêtres. Entre réalisme social et onirisme poétique, le film trace une ligne fragile entre espoir et désillusion.

## Une quête initiatique
Rá, Culebro, Sere, Winny et Nano ne croient plus aux promesses de l’État. Leur seule loi est l’amitié. Ensemble, ils traversent villes déchues, forêts luxuriantes et souvenirs flous, dans une errance à la fois violente et sublime.

## Un regard cru et tendre
Mora Ortega filme avec humanité des corps souvent invisibilisés par les médias. Caméra à l’épaule, lumière naturelle, visages vrais. La beauté surgit de la boue, la poésie naît de la rage.

## Une métaphore du pays
Le film questionne l’idée de territoire : à qui appartient-il ? À ceux qui l’ont conquis ou à ceux qui l’ont perdu ? Dans une Colombie post-accord de paix, les promesses de restitution restent aussi instables que les routes empruntées par ces jeunes rois sans royaume.
`,
  },
  {
    imageUrl: "/fatigue-decision.jpg",
    altText: "Fatigue de décision, un mal silencieux du quotidien",
    categoryName: "Psychologie",
    title: "La fatigue de décision, un mal silencieux du quotidien",
    description: "Entre choix constants et surcharge mentale, notre cerveau s’épuise à décider.",
    authorName: "Camille Bernard",
    theme: "Culture",
    content: `
Vous hésitez longuement devant Netflix, puis vous abandonnez ? Vous remettez au lendemain des décisions simples ? Vous êtes peut-être en proie à ce que les psychologues nomment la *fatigue de décision*.

## Un mécanisme bien réel
Chaque décision puise dans notre énergie mentale. Plus nous faisons de choix, plus notre capacité à bien juger diminue. À la fin de la journée, même les décisions les plus banales peuvent paraître insurmontables.

## Des expériences probantes
Des études ont montré que des juges, en fin de journée, rendaient plus de verdicts défavorables. Même nos achats sont biaisés par la fatigue mentale : on opte pour le plus simple, pas le plus juste.

## Comment l’éviter ?
Routine, limitation des options, pauses régulières… L’idée est de réduire les micro-choix. Steve Jobs ne portait qu’un seul style de vêtements, justement pour garder sa clarté mentale pour l’essentiel.

## Une société trop exigeante
Entre ultra-connexion, multitâche et pression à la productivité, notre société surexige notre cerveau. Reconnaître cette fatigue, c’est aussi s’autoriser à ralentir, à déléguer, à choisir... de ne pas choisir.
`,
  },
  {
    imageUrl: "/creer.jpg",
    altText: "Créer sans filtre, l’art de libérer sa pratique artistique",
    categoryName: "Création",
    title: "Créer sans filtre : 5 pistes pour libérer sa pratique artistique",
    description: "Et si on arrêtait de chercher à faire “beau” ? Conseils pour créer librement et sans blocage.",
    authorName: "Emma Ruiz",
    theme: "Culture",
    content: `
Créer, c’est souvent affronter un jugement — le sien et celui des autres. Que l’on peigne, écrive ou compose, le perfectionnisme nous paralyse. Voici cinq pistes concrètes pour faire de l’art de manière libérée et joyeuse.

## 1. Créez sans but
Ne cherchez pas tout de suite à “faire une œuvre”. Posez une couleur, un mot, un geste. Laissez venir sans attente de résultat.

## 2. Travaillez vite (et mal)
En production rapide, vous évitez le mental critique. Mettez un minuteur, dessinez ou écrivez sans lever la main. Vous serez surpris·e.

## 3. Coupez-vous des regards
Prenez un moment hors des réseaux, des validations extérieures. L’important n’est pas d’être vu·e mais de s’exprimer.

## 4. Inspirez-vous des autres, mais pas trop
Regarder d’autres artistes stimule. Mais attention à la comparaison. Rappelez-vous : vous n’en êtes pas au même stade ni dans le même monde intérieur.

## 5. Créez comme un enfant
Rappelez-vous ce plaisir brut de peindre sans se demander si c’était “joli”. L’art est un jeu — retrouvez cette légèreté-là.
`,
  },
  {
    imageUrl: "/mecanique.jpg",
    altText: "Mécanique sans pression, l’art de comprendre et bricoler sans stress",
    categoryName: "Mécanique",
    title: "Mécanique sans stress : 5 pistes pour se lancer sans complexe",
    description: "Pas besoin d’être expert pour mettre les mains dans le moteur. Conseils pour démarrer la mécanique simplement et sereinement.",
    authorName: "Julien Moreau",
    theme: "Voiture",
    content: `
Faire de la mécanique, c’est souvent oser se tromper, tester, apprendre. Qu’on répare son vélo ou démonte un moteur, la peur de mal faire freine souvent. Voici cinq pistes concrètes pour se lancer avec plaisir et confiance.

## 1. Commencez petit
Pas besoin de démonter un moteur tout de suite. Changez une ampoule, vérifiez la pression des pneus, observez comment les choses fonctionnent.

## 2. Acceptez l’imperfection
Les erreurs font partie du processus. Une vis mal remise, un joint mal choisi — on apprend en pratiquant. Ne cherchez pas la perfection dès le départ.

## 3. Travaillez sans pression extérieure
Coupez les vidéos tuto un moment et testez par vous-même. Vous verrez que votre logique vous guide plus que vous ne le pensez.

## 4. Apprenez des autres, mais à votre rythme
Forums, garages partagés, amis bricoleurs : écoutez, observez, mais ne vous comparez pas. Chacun a ses galères et ses réussites.

## 5. Bricolez comme un·e gamin·e
Soyez curieux·se, touchez, démontez (et remontez !). Faites-le pour comprendre, pour le plaisir, pas pour cocher une case de “réparateur parfait”.
`,
  },
  {
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481419/microblog/dmt4eojkqcqvresxpukb.webp",
  altText: "Les Radium Girls peignant des cadrans luminescents",
  categoryName: "Santé publique",
  title: "Quand le radium brillait plus que la vérité",
  description: "Une tragédie industrielle aux allures fluorescentes, où la science a illuminé... la cupidité.",
  authorName: "Emma Ruiz",
  theme: "Science & Technologie",
  content: `
Au début du XXe siècle, alors que la radioactivité était encore perçue comme une promesse de modernité, de nombreuses jeunes femmes furent embauchées pour peindre des cadrans de montre avec une peinture au radium. Le résultat ? Une tragédie sanitaire dissimulée sous des couches de vernis… luminescent.

## Le rêve fluorescent

Nous sommes dans les années 1910-1920. Le radium, fraîchement découvert par les Curie, est à la mode. Il brille dans le noir, ce qui en fait une aubaine pour les horlogers. Les ouvrières, appelées plus tard les « Radium Girls », sont chargées de peindre à la main les chiffres des montres. Pour affiner leur pinceau, elles l'humectent… avec leurs lèvres.

Résultat ? Elles ingèrent chaque jour de minuscules doses de radium. On leur promet que c’est inoffensif. Certaines l’utilisent même comme maquillage ou pour faire rire dans le noir.

## Dents qui tombent, mâchoires qui s’effritent

Rapidement, les premières douleurs apparaissent. Dents déchaussées, nécroses osseuses, cancers. Mais les entreprises nient. On accuse les ouvrières d’avoir la syphilis, histoire de discréditer leur témoignage.

Ce n’est qu’après de longues batailles judiciaires que certaines obtiendront réparation. Trop tard pour beaucoup.

## Une lueur de justice

Les Radium Girls ont contribué, malgré elles, à faire avancer le droit du travail et la régulation des substances toxiques. Elles sont devenues le symbole d’un combat pour la reconnaissance des maladies professionnelles et la responsabilité des employeurs.

## Et aujourd’hui ?

Cette histoire nous rappelle que le progrès scientifique, sans éthique, peut littéralement empoisonner. Et que les « lueurs » de la science ne doivent jamais masquer les zones d’ombre de l’industrie.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481420/microblog/jdhoaufnypvhd2kequbm.jpg",

  altText: "Carte météo du nuage radioactif de Tchernobyl",
  categoryName: "Nucléaire",
  title: "Le nuage radioactif... stoppé net à la frontière française ?",
  description: "En 1986, la catastrophe de Tchernobyl a irradié l’Europe, sauf – paraît-il – la France. Une prouesse météorologique, ou une intox d’État ?",
  authorName: "Hugo Martin",
  theme: "Science & Technologie",
  content: `
Le 26 avril 1986, le réacteur n°4 de la centrale de Tchernobyl explose. Un nuage radioactif commence alors son voyage au-dessus de l’Europe. Partout, les cartes d’alerte s’affolent... sauf en France. Là, le nuage aurait fait une pause. Respectueusement. À la frontière. 🛑🇫🇷

## Le miracle météorologique

Dès les premiers jours, les autorités françaises affirment que le nuage n’a **pas traversé l’Hexagone**. En Allemagne, on jette les épinards. En Italie, on arrête les récoltes. En France ? On continue à manger les salades arrosées de pluie radioactive. Bon appétit.

## Communication officielle

Des scientifiques français mesurent pourtant une hausse de la radioactivité dans les Alpes, en Corse, en Lorraine. Le professeur Pellerin – alors directeur du Service central de protection contre les rayonnements ionisants – rassure : pas de danger, rien d’alarmant.

## Une omerta bien orchestrée

Les médias relaient largement les discours officiels. Des années plus tard, des journalistes et associations révèlent un effort manifeste pour éviter la panique… et préserver l’image du nucléaire français.

## Conséquences sanitaires

En Corse, une hausse de cancers de la thyroïde est constatée dans les décennies suivantes. Certains médecins et collectifs réclament la reconnaissance d’un lien avec Tchernobyl. L’État, lui, reste discret.

## Ce qu’il en reste

Aujourd’hui encore, l’épisode du “nuage arrêté à la frontière” fait sourire – jaune. Plus que le nuage, c’est le silence qui interroge. Car parfois, ce qu’on ne dit pas en dit très long.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481417/microblog/i9o3g1omgqccwptbdrzc.jpg",

  altText: "Bio-impression d’un tissu cardiaque humain en laboratoire",
  categoryName: "Santé publique",
  title: "Quand l’encre devient vie : la bio-impression d’organes humains",
  description: "Une technologie où les cellules remplacent l’encre, et où l’imprimante façonne l’espoir.",
  authorName: "Julien Moreau",
  theme: "Science & Technologie",
  content: `
La bio-impression redéfinit notre rapport à la médecine. Imprimer un cœur, une peau ou un foie ? C’est désormais possible — grâce à des encres faites de cellules vivantes.

## Imprimer, mais le vivant
Les bio-imprimantes fonctionnent couche par couche, déposant des matériaux biologiques pour recréer des tissus humains. Elles offrent une précision inégalée, rendant possible la fabrication de structures complexes comme des organes miniatures.

## Un accélérateur médical
Ces « organoïdes » permettent de tester des traitements sans recours aux animaux, avec des résultats plus proches du corps humain réel. Un gain de temps et d’éthique.

## Vers un futur sur mesure
Demain, on pourrait imprimer des organes personnalisés à partir des cellules du patient. Cela réduirait :
- les risques de rejet,
- les délais de greffe,
- et les souffrances liées aux pénuries.

Mais cette avancée pose aussi des questions : comment gérer la longévité de ces organes ? Quelles limites éthiques fixer ? Une science enthousiasmante, mais à encadrer.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481418/microblog/sppj4f7pmfi1pep00xsx.jpg",
  altText: "Panneaux solaires déployés sur la surface lunaire",
  categoryName: "Énergie",
  title: "Quand la Lune éclaire notre avenir",
  description: "Et si la conquête spatiale devenait le laboratoire de notre transition énergétique ?",
  authorName: "Sofia Herrera",
  theme: "Science & Technologie",
  content: `
La Lune devient un terrain d’expérimentation énergétique et écologique. Des technologies conçues pour survivre au vide spatial pourraient aussi inspirer notre monde terrestre.

## L’énergie venue d’ailleurs
Des panneaux solaires géants sont prévus pour le pôle Sud lunaire. Capables de suivre la lumière du Soleil, ils pourraient alimenter des bases entières.

## De la poussière, de la vie
À partir du régolithe — la poussière lunaire — des scientifiques ont réussi à produire :
- de l’eau,
- de l’oxygène,
- et même des matériaux de construction.

## Imprimer pour survivre
Des imprimantes 3D utilisent cette poussière comme matière première pour bâtir des habitats spatiaux. Pas besoin d’importer depuis la Terre : on construit sur place.

La Lune devient un laboratoire pour une autonomie durable. Une conquête qui éclaire autant nos futurs spatiaux… que nos enjeux terrestres.
`
}
];
async function main() {
  console.log('Start seeding ...');

  //  Étape 0 – Audit des doublons déjà présents dans la base
  // On identifie les articles qui ont le même titre et le même auteur
  // sans les supprimer automatiquement (audit seulement)
  const allPosts = await prisma.post.findMany({
    select: { id: true, title: true, userId: true },
    orderBy: { id: 'asc' }, // On conserve l’ordre de création
  });

  const keySet = new Set(); // Pour stocker les combinaisons uniques titre+auteur
  const duplicates = [];    // On y met les ID détectés en doublon

  for (const post of allPosts) {
    const key = `${post.title}-${post.userId}`;
    if (keySet.has(key)) {
      duplicates.push(post.id);
    } else {
      keySet.add(key);
    }
  }

  // Résultat de l'audit
  if (duplicates.length > 0) {
    console.log(`🚨 ${duplicates.length} doublon(s) détecté(s) par titre + auteur :`);
    for (const id of duplicates) {
      const post = allPosts.find(p => p.id === id);
      console.log(`- ID: ${id}, Titre: ${post?.title}`);
    }
  } else {
    console.log(' Aucun doublon détecté par contenu');
  }

  // 👤 Étape 1 – Création ou récupération des utilisateurs
  const createdUsers = {}; // Accès rapide par username
  const createdUsersByFullName = {}; // Accès rapide par prénom + nom

  for (const user of usersData) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    createdUsers[user.username] = createdUser;

    const fullName = `${user.prenom} ${user.nom}`;
    createdUsersByFullName[fullName] = createdUser;

    console.log(`User créé/trouvé : ${createdUser.username} (${fullName})`);
  }

  // Étape 2 – Création ou récupération des thèmes
  const themesToCreate = ['Culture', 'Voiture', 'Science & Technologie', 'Voyage'];
  const createdThemes = {};

  for (const themeName of themesToCreate) {
    const theme = await prisma.theme.upsert({
      where: { name: themeName },
      update: {},
      create: { name: themeName },
    });
    createdThemes[themeName] = theme;
    console.log(`Created/found theme: ${theme.name} (ID: ${theme.id})`);
  }

  // Étape 3 – Création ou récupération des catégories associées aux thèmes
  const createdCategories = {}; // Organisation : themeId → { categoryName: category }
  const categoriesToProcess = new Set();

  for (const article of articlesData) {
    categoriesToProcess.add(JSON.stringify({ name: article.categoryName, themeName: article.theme }));
  }

  for (const categoryInfoString of categoriesToProcess) {
    const { name: categoryName, themeName } = JSON.parse(categoryInfoString);
    const theme = createdThemes[themeName];

    if (!theme) {
      console.warn(`Thème non trouvé : "${themeName}" → catégorie "${categoryName}" ignorée`);
      continue;
    }

    const category = await prisma.category.upsert({
      where: {
        name_themeId: {
          name: categoryName,
          themeId: theme.id,
        },
      },
      update: {},
      create: {
        name: categoryName,
        themeId: theme.id,
      },
    });

    if (!createdCategories[theme.id]) {
      createdCategories[theme.id] = {};
    }

    createdCategories[theme.id][categoryName] = category;
    console.log(`Category créée/trouvée : ${category.name} (ID: ${category.id}, Thème: ${theme.name})`);
  }

  //  Étape 4 – Insertion des articles (avec vérifications complètes)
  let insertedCount = 0;
  let skippedCount = 0;

  for (const article of articlesData) {
    // Génération d’un slug unique basé sur le titre
    const slugBase = slugify(article.title, { lower: true, strict: true });
    let uniqueSlug = slugBase;
    let count = 1;

    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slugBase}-${count++}`;
    }

    // Vérification de l’auteur
    const authorUser = createdUsersByFullName[article.authorName];
    if (!authorUser) {
      console.warn(`Auteur introuvable : ${article.authorName} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification du thème
    const theme = createdThemes[article.theme];
    if (!theme) {
      console.warn(`Thème introuvable : ${article.theme} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification de la catégorie
    const category = createdCategories[theme.id]?.[article.categoryName];
    if (!category) {
      console.warn(`Catégorie introuvable : ${article.categoryName} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification finale du slug (sécurité en doublon)
    const existing = await prisma.post.findUnique({ where: { slug: uniqueSlug } });
    if (existing) {
      console.log(`Article déjà existant : "${article.title}" → slug : "${uniqueSlug}"`);
      skippedCount++;
      continue;
    }

    // Création de l’article
    await prisma.post.create({
      data: {
        title: article.title,
        description: article.description,
        imageUrl: article.imageUrl,
        altText: article.altText,
        content: article.content,
        slug: uniqueSlug,
        userId: authorUser.id,
        categoryId: category.id,
      },
    });

    console.log(`📝 Article inséré : "${article.title}" – Auteur : ${article.authorName}`);
    insertedCount++;
  }

  console.log(`Résumé du seed : ${insertedCount} article(s) inséré(s), ${skippedCount} sauté(s)`);
}
