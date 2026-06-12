# Fanthèque

Ta bibliothèque de fanfictions : suivi de lecture, souvenirs 📍, statistiques et
« Retrouve-fic » (recherche par souvenirs). Design « Élégance épurée ».

**Stack :** React (Vite) · Supabase (base de données + comptes) · Capacitor pour
la publication sur le Play Store (étape ultérieure).

---

## 1 · Lancer l'appli en local

```bash
npm install
npm run dev
```

Ouvre l'adresse affichée (http://localhost:5173). Sans configuration Supabase,
l'appli démarre en **mode démo** avec des données d'exemple : tu peux tout
essayer, mais rien n'est sauvegardé.

## 2 · Connecter Supabase (sauvegarde réelle + comptes)

1. Crée un compte sur [supabase.com](https://supabase.com) puis **New project**
   (choisis un mot de passe de base de données et une région en Europe).
2. Une fois le projet créé, ouvre **SQL Editor** → **New query**, colle tout le
   contenu de [`supabase/schema.sql`](supabase/schema.sql) et clique **Run**.
   Cela crée les tables (`fics`, `moments`, `lectures`) avec la sécurité
   Row Level Security : chaque compte ne voit que ses propres données.
3. Vérifie que la connexion par email est active : **Authentication →
   Sign In / Up → Email** (c'est le cas par défaut).
4. Récupère tes clés : **Project Settings → API** → copie *Project URL* et
   *anon public key*.
5. À la racine du projet :

   ```bash
   cp .env.example .env
   ```

   puis remplis `.env` avec tes deux valeurs.
6. Relance `npm run dev`. L'écran de connexion apparaît : crée ton compte
   (un email de confirmation est envoyé), connecte-toi, et c'est parti !

## 3 · Publier sur le Play Store (plus tard, avec Capacitor)

Quand l'appli te conviendra :

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init Fantheque com.sandra.fantheque --web-dir dist
npm run build
npx cap add android
npx cap open android   # ouvre Android Studio pour générer l'APK / AAB
```

Il faudra un compte développeur Google Play (25 $ une fois) pour publier.
Le même code pourra aussi être empaqueté pour l'App Store avec
`@capacitor/ios`.

## Structure du projet

```
src/
  lib/
    supabase.js     ← client Supabase (lit le .env)
    api.js          ← accès aux données (+ mode démo intégré)
    theme.js        ← palette « Élégance épurée » et typographies
  components/
    ui.jsx          ← composants partagés (Trait, Tag, Étoiles, champs…)
  screens/
    Connexion.jsx   ← inscription / connexion par email
    Bibliotheque.jsx
    Ajouter.jsx
    FicheFic.jsx    ← progression, note, notes privées, souvenirs 📍
    Stats.jsx       ← chapitres du mois, série de jours, ships, plateformes
    Retrouve.jsx    ← recherche dans tes souvenirs et notes
    Profil.jsx      ← export JSON, déconnexion
  App.jsx           ← navigation par onglets + session
supabase/
  schema.sql        ← script de création de la base
maquette/
  maquette-elegance.jsx  ← la maquette d'origine, pour référence
```
