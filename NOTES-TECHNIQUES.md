# Site vitrine et affiche — La ferme Tisserand

Notes à lire avant toute modification. Dernière mise à jour : 12 novembre 2026.

## En bref

- **Site en ligne** : https://rikou3170-lab.github.io/site-gaec-tisserand/
- **Dépôt** : `rikou3170-lab/site-gaec-tisserand`, branche `main`, GitHub Pages à la racine.
- Le QR code des contre-étiquettes et des affiches pointe vers cette adresse. **Ne jamais renommer le dépôt ni changer l'adresse** : tous les QR codes imprimés deviendraient morts.

## Règles à ne pas enfreindre

1. **Ce dépôt est la seule source de vérité.** L'espace de travail et la mémoire de Claude peuvent être effacés à tout moment (c'est arrivé sur le projet de Marion). Rien d'important ne doit y rester seul. À chaque version : commit + push, et une ligne dans `NOTES-DE-VERSION.md`.
2. **Ne jamais retoucher un fichier généré à la main.** Les PDF et JPEG de l'affiche se régénèrent depuis `affiche/affiche.html` (voir plus bas).
3. **Ne toucher qu'à ce dépôt.** Le compte GitHub héberge aussi les projets de Marion (`epicerie_radonnaise`), `reflecxo` et celui de Gina : ne jamais y toucher depuis ce projet.
4. **Aucune mise en ligne sans le « Go » d'Eric.** Montrer un aperçu d'abord.
6. **Numéro de version** : il est affiché en bas du site (`<p class="site-version">`). Le changer à chaque mise en ligne, avec une entrée dans `NOTES-DE-VERSION.md`.
7. **Tant que la photo du verger vient d'Unsplash**, garder la mention « Photo d'illustration » sur le site et sur l'affiche : le titre dit « le verger de Fougerolles » alors que la photo n'en est pas un.
5. **Vérifier chaque rendu à l'œil** (capture d'écran ou PDF converti en image) avant de livrer : chevauchements, textes coupés, QR lisible.

## Contenu du dépôt

| Chemin | Rôle |
|---|---|
| `index.html` | Le site complet, un seul fichier. Images et polices intégrées en base64, aucun chargement externe, pas de Firebase. |
| `og-image.jpg` | Image d'aperçu pour le partage du lien. |
| `affiche/affiche.html` | Source de l'affiche (gabarit avec `__QR__`, `__W__`, `__H__`, `__U__`). |
| `affiche/build.py`, `affiche/render.js` | Génération de l'affiche A4/A3 en JPEG 300 dpi et PDF. |
| `affiche/img/`, `affiche/fonts/` | Photo du verger, logo, polices de l'affiche. |
| `affiche/qr-gaec-tisserand.svg/.png` | QR code seul, pour l'imprimeur des étiquettes. |
| `photos-originales/` | Photos sources en pleine définition. |
| `NOTES-DE-VERSION.md` | Historique des versions. **À compléter à chaque mise en ligne.** |
| `archives/` | Anciennes maquettes d'affiche, leurs images, et les petits outils (captures d'écran, traduction). |

## Le site (`index.html`)

- **Contrôle de l'âge** : boutons radio `#ageYes` / `#ageNo`, réponse mémorisée dans `sessionStorage` (`majeur`).
- **Défilement** : la page défile dans `#site-scroll`, pas dans `body`.
- **Langues FR / EN / DE** : dictionnaire `const D={en:{…},de:{…}}`, dont la clé est le texte français exact. Pour traduire un nouveau texte, ajouter une entrée juste après `const D={en:{` et après `,de:{`. Les attributs `alt`, `aria-label` et `title` sont traduits aussi. Langue mémorisée dans `localStorage` (`langue`).
- **Agenda** : `window.renderAgenda(lang)` calcule les dates seul (floraison en avril, Fête des Cerises le dernier samedi de juin, Foire aux beignets le 3e dimanche de septembre, Journée du Kirsch mi-novembre).
- **Bouteilles Cœur** : photos dans `const embeddedProducts={"2":mirabelle,"3":cerise,"4":poire}`. L'image affichée au chargement (cerise) est aussi en dur dans `<img id="productImage">` : remplacer les deux.
- **Thème « affiche »** (nov. 2026) : bloc CSS ajouté à la fin du `<style>`, après le commentaire `/* === Thème "affiche" === */`. Il surcharge l'ancien thème brun. Rouge `#c8102e`, vert `#2f6b1e`, jaune `#ffd166`. Polices : Abril Fatface (titres), Gelasio italique, Great Vibes (« Fougerolles »).
- **Images** : en WebP, intégrées en base64. Le fichier pèse environ 2,9 Mo : éviter d'ajouter de grosses images.

### Mettre en ligne et vérifier

```
git add -A && git commit -m "…" && git push origin main
gh api repos/rikou3170-lab/site-gaec-tisserand/deployments --jq '.[0].id'
gh api repos/rikou3170-lab/site-gaec-tisserand/deployments/<ID>/statuses --jq '.[0].state'   # attendre "success"
```

Depuis l'espace de travail Claude, `github.io` n'est pas joignable : on vérifie par l'API ci-dessus, pas en ouvrant le site.

## L'affiche

Depuis le dossier `affiche/` :

```
pip install qrcode        # et : npm i playwright && npx playwright install chromium
python3 build.py          # crée affiche-A4.html et affiche-A3.html avec le QR code
node render.js            # crée les JPEG 300 dpi et les PDF
```

- Toutes les dimensions sont en unités `--u` (1 mm en A4, 297/210 mm en A3) : une seule maquette pour les deux formats.
- QR code : correction d'erreur Q, vérifié après chaque rendu avec `cv2.QRCodeDetector` (réessayer à demi-taille si l'image 300 dpi n'est pas lue).
- **Pas d'ombres** (`text-shadow`, `box-shadow`) : certains lecteurs PDF les affichent en bandes ou rectangles noirs.
- Fond `html, body` en rouge, pour éviter un filet sombre en bas du PDF A3.

## Données de référence

- **Degrés** (confirmés par Eric et son frère, nov. 2026) : Kirsch 50 % ; Mirabelle et Poire Williams 48 % ; Prune Dama 48 % ; liqueurs Cœur 17 % ; Perle Noire et Mûr'abelle 18 % ; Schrik 18 % ; cerises au kirsch 15 %.
  ⚠️ La liste de départ dans le code de l'application de facturation indique 45 % pour les eaux-de-vie : ne pas s'y fier.
- **Mentions légales** : GAEC Tisserand, 78 Blanzey, 70220 Fougerolles-Saint-Valbert ; capital 84 150 € ; SIREN 389 031 949 ; SIRET 389 031 949 00024 ; TVA FR07389031949 ; directeur de la publication : Damien Tisserand ; hébergeur : GitHub Inc.

## Règles légales (loi Évin)

- Autorisé : degré, origine, nom, composition, producteur, mode d'élaboration, terroir, AOC, conditions de vente.
- Interdit : personnes qui boivent, ambiance festive, incitation à consommer.
- Message sanitaire obligatoire sur le site et sur chaque affiche : « L'abus d'alcool est dangereux pour la santé, à consommer avec modération. »

## Points confirmés par Eric (12 novembre 2026)

- Le kirsch est bien sous AOC.
- Les degrés du site (50 % et 48 %) correspondent aux bouteilles.
- L'affichage est validé avec chaque chef de rayon des magasins.

## Droits des photos

- Verger en fleurs (accueil du site et affiche) : Nicole Geri, Unsplash, licence Unsplash (usage commercial autorisé, crédit non obligatoire). **Ce n'est pas le verger de la ferme** (Michigan) : ne jamais écrire que c'est le leur. À remplacer par une vraie photo dès que possible.
- Toutes les autres photos sont celles d'Eric et de la famille.
- Le dessin de l'étiquette Perle Noire appartient à la ferme.

## Goûts validés (pour ne pas refaire les mêmes allers-retours)

- Photos réelles uniquement. Pas d'illustrations, pas de cerises dessinées, rien qui « fasse IA ».
- Le nom affiché est « La ferme Tisserand », jamais « GAEC » ni « Tisserand » seul.
- Rouge cerise et beaucoup de couleur ; « Fougerolles » mis en avant en belle écriture.
- Affiche destinée aux têtes de gondole en grande surface : pas de mention « vente directe à la ferme 7j/7 », pas de drapeaux, orientation « découvrez la gamme », QR code très visible.
- Réponses à Eric en français, simples et courtes.

## Pistes ouvertes

- Vraies photos des bouteilles Cœur, seules sur fond uni (la photo de la Poire est coupée à droite).
- Photo du verger en taille originale pour une affiche A3 plus nette (fichier actuel : 1717 px de large).
- Le QR code ouvre l'accueil ; possibilité de pointer directement sur la gamme (`#collection`).
- Corriger les degrés dans la liste de produits de l'application de facturation si elle indique encore 45 %.
