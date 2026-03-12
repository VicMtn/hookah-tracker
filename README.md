# Hookah Tracker
> *On fume pas, on shish.* — Track who pays the next round.

![Version](https://img.shields.io/badge/version-2.0.0-7B5EA7)
![Vue](https://img.shields.io/badge/Vue-3-42b883)
![Firebase](https://img.shields.io/badge/Firebase-Auth_+_Realtime_DB-orange)
![Hosting](https://img.shields.io/badge/Hosted_on-Firebase_Hosting-FFCA28)

**Hookah Tracker** is a private web app to track hookah rounds between friends — log who pays, how much, and let the app handle the rest.

---

## Features

- **➕ Log a round** — payer's name, optional amount, note, automatic timestamp
- **🎰 Random picker** — enter tonight's participants and draw who pays next
- **🏆 Leaderboard** — who paid the most in count and in CHF
- **📜 History** — all rounds, from most recent to oldest
- **📊 Dashboard** — total spent, number of rounds, average per round
- **🔒 Protected access** — Firebase Authentication (email/password or Google)
- **👥 Registration control** — open or close sign-ups without touching the code

---

## Installation & deployment

### Prerequisites

- Node.js v18+
- A [Firebase](https://firebase.google.com/) project with **Authentication** and **Realtime Database** enabled

### Installation
```bash
git clone https://github.com/vicmtn/hookah-tracker.git
cd hookah-tracker
npm install
```

Create a `.env` file at the root:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Commands
```bash
npm run dev      # dev server (localhost:5173)
npm run build    # production build → dist/
npm run deploy   # build + deploy to Firebase Hosting
```

### Firebase setup

1. Enable **Authentication → Sign-in method → Email/Password** and **Google**
2. Add your domain in **Authentication → Settings → Authorized domains**
3. Create member accounts in **Authentication → Users → Add user**
4. Apply the Realtime Database rules below

### Realtime Database rules
```json
{
  "rules": {
    "registrations_open": {
      ".read": true,
      ".write": false
    },
    "sessions": {
      ".read":  "auth != null",
      ".write": "auth != null"
    }
  }
}
```

---

## Project structure
```
hookah-tracker/
├── index.html
├── vite.config.js
├── .env
└── src/
    ├── lib/
    │   ├── firebase.js          
    │   ├── auth.js          
    │   └── registrations.js    
    ├── hooks/
    │   ├── useAuth.js      
    │   ├── useSessions.js   
    │   └── useToast.js     
    ├── pages/
    │   ├── LoginPage.vue
    │   └── DashboardPage.vue
    ├── components/
    │   ├── AppHeader.vue
    │   ├── StatsRow.vue
    │   ├── StreakBanner.vue
    │   ├── AddSessionForm.vue
    │   ├── RandomPicker.vue
    │   ├── AppLeaderboard.vue
    │   ├── HistoryList.vue
    │   └── ui/
    │       ├── AppToast.vue
    │       └── DeleteModal.vue
    └── styles/
        └── style.css
```

---

## User system

Access is restricted to invited members. Two sign-in methods available:

- **Email/password** — account manually created by the admin in the Firebase console
- **Google** — one-click sign-in with an existing Google account

### Registration control

Sign-ups can be opened or closed without modifying any code.
In **Firebase Console → Realtime Database**, edit the value:
```json
{ "registrations_open": true }
```

- `true` → the registration form is accessible
- `false` → only existing members can sign in

---

## Roadmap

- [x] Real authentication system
- [x] Controllable sign-ups without code changes
- [ ] We'll see...

---

## Changelog

### v2.0.0
- Migration to Vue 3 + Vite
- Replaced shared password auth with Firebase Authentication
- Email/password and Google sign-in
- Registration control via Realtime Database flag
- Database secured with `auth != null` rules
- Deployment migrated to Firebase Hosting

### v1.0.0
- Initial release — vanilla HTML/CSS/JS
- SHA-256 hardcoded password auth
- Firebase Realtime Database
- Hosted on GitHub Pages

---

## 🙏 Credits

Made with 💜 by [VicMtn](https://github.com/vicmtn)
