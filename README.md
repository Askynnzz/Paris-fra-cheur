# 🌿 Paris Fraîcheur
Paris Fraîcheur est une application React/Tailwind/Framer Motion permettant de proposer des lieux frais (parcs, fontaines) à Paris selon la météo en temps réel.

Le projet repose sur les données OpenData de la ville de Paris et l'API météo OpenWeather.

# 🚀 Fonctionnalités principales
Suggestions météo dynamiques :
Selon la température à Paris, l'application recommande :

Des parcs avec végétation élevée.

Des fontaines fonctionnelles.

Des alternatives en cas de forte chaleur, froid ou canicule.

Navigation simple :

Vue Suggestions météo (lieux frais proposés automatiquement).

Vue Fontaines : recherche et filtrage avancé (type, arrondissement, état).

Vue Espaces verts : recherche et filtrage avancé (ombrage, canicule, ouvert 24h, surface végétale…).

Interface fluide et animée avec Framer Motion & Tailwind CSS :

Animations d’apparition, transitions douces.

Design responsive.

Couleurs & typographie Nexa intégrées.

# 🧰 Stack technique
React / Vite

Tailwind CSS 

Framer Motion

Lucide React 

OpenWeather API (Météo temps réel)

OpenData Paris (Fontaines et espaces verts)

# ⚙️ Installation & Lancement
1️⃣ Cloner le projet
git clone https://github.com/ton-utilisateur/paris-fraicheur.git
cd paris-fraicheur
2️⃣ Installer les dépendances
npm install
3️⃣ Ajouter ta clé OpenWeather
Créer un fichier .env à la racine :
VITE_OPENWEATHER_API_KEY=ta_clé_openweather
(La clé est utilisée dans useMeteoParis.js)
4️⃣ Lancer le projet en local
npm run dev


# 🌡️ Scénarios de suggestion
Température	Propositions
- ≥ 30°C	Parcs ombragés + Fontaines
- 20 - 29°C	Espaces verts classiques
- < 10°C	Message d'information : "Couvrez-vous"
- Canicule	Priorité aux lieux avec ouverture canicule

# 📝 Exemples de filtres
Fontaines : par type, arrondissement, état

Espaces verts : par végétation, surface, ouvert 24h, canicule

# 🎨 Personnalisation
Typographie : Nexa

Couleur principale : #5f259f

Design cohérent entre toutes les pages via custom-ui.css

# ⚡ Roadmap , futures possibles updates
 Déploiement SSR

 Calcul des distances avec géolocalisation réelle

 Ajout de cartes interactives (Leaflet ou Mapbox)