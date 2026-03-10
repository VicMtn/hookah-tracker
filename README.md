# Hookah Tracker

> *On fume pas, on shish.* — Suivez qui paie la prochaine tournée.

![Version](https://img.shields.io/badge/version-1.0.0-7B5EA7)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange)
![Hosting](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222)

**Hookah Tracker** est une application web légère pour suivre les tournées de shisha entre amis — sans inscription, sans friction. On enregistre qui paye, combien, et l'appli fait le reste.

---

## ✨ Fonctionnalités

- **➕ Enregistrer une tournée** — nom du payeur, montant optionnel, note, horodatage automatique
- **🎰 Tirage au sort** — entrez les participants du soir et tirez au sort le prochain payeur
- **🏆 Classement** — qui a payé le plus en nombre et en CHF
- **📜 Historique** — toutes les tournées, de la plus récente à la plus ancienne
- **📊 Tableau de bord** — total dépensé, nombre de tournées, moyenne par tournée
- **🔒 Accès protégé** — mot de passe partagé, sans création de compte

---

## 🚀 Installation & déploiement

Le projet est un fichier unique (`index.html`) avec le CSS et les icônes en fichiers séparés.

### Prérequis

- Un projet [Firebase](https://firebase.google.com/) avec **Realtime Database** activée
- Un repo GitHub pour le déploiement via **GitHub Pages**

### Configuration Firebase

1. Créez un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activez la **Realtime Database** (mode test ou avec règles personnalisées)
3. Copiez votre config Firebase dans `index.html` :

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
};
```

### Déploiement GitHub Pages

1. Forkez ou clonez ce repo
2. Activez GitHub Pages dans **Settings → Pages → Branch: main**
3. L'app est disponible sur `https://<votre-user>.github.io/<repo>/`

---

## 🗂️ Structure du projet

```
hookah-tracker/
├── index.html       # App complète (HTML + JS)
├── style.css        # Styles
├── icons/           # Icônes
└── README.md
```

---

## 👤 Système d'utilisateurs

Il n'y a pas de comptes. Les noms sont saisis librement à chaque enregistrement :
- Si le nom **existe déjà** → la fiche est mise à jour
- Si le nom est **nouveau** → une nouvelle entrée est créée

Simple, rapide, zéro friction.

---

## 🛣️ Roadmap

- [ ] Ajouter un vrai système de login
- [ ] Statistiques visuelles (graphiques par personne, par lieu)
- [ ] Tirage au sort pondéré (les moins généreux ont plus de chances)
- [ ] Système de saisons avec palmarès mensuel
- [ ] Balance des dettes (qui doit une tournée à qui)

---

## 🙏 Crédits

Made with 💜 by [VicMtn](https://github.com/vicmtn)
