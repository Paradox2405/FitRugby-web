# FitRugby Web (Admin Dashboard)

The web dashboard for the [FitRugby](https://github.com/Paradox2405/FitRugby) mobile app. Admins sign in and create workouts, which appear in the app's **Online Workouts** section.

## Features

- Sign up and login with Firebase Authentication
- Account details view
- **Create Workout** form that writes to Firebase
- Admin role management: a Cloud Function (`addAdminRole`) sets an `admin` custom claim, and only existing admins can promote other users

## Tech stack

- Plain HTML, CSS and JavaScript
- **Firebase** Authentication, Firestore and Hosting
- **Cloud Functions for Firebase** (Node.js) for admin custom claims

## Project structure

```
index.html          dashboard page
scripts/auth.js     sign up, login, logout, admin checks
scripts/index.js    UI and workout creation
functions/index.js  addAdminRole callable function
firebase.json       Hosting config
```

## Running and deploying

```bash
npm install -g firebase-tools
firebase login
firebase use <your-project-id>
cd functions && npm install && cd ..
firebase serve            # local preview
firebase deploy           # hosting and functions
```

Update the Firebase config in `index.html` to match your project.
