# 🎯 Findini - Plateforme de Crowdfunding

**Findini** est une application complète de crowdfunding permettant aux utilisateurs de créer, gérer et financer des projets dans différentes catégories. Le projet est composé d'un **backend REST API** (Node.js/Express) et d'une **application mobile** (React Native/Expo).

---

## 🎥 Vidéo de Démonstration

[![Démo Findini](https://img.youtube.com/vi/VOTRE_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VOTRE_VIDEO_ID)

> 👆 Cliquez sur l'image pour voir la démonstration complète de l'application

<!-- Alternative : Pour une vidéo locale
https://user-images.githubusercontent.com/VOTRE_ID/VOTRE_VIDEO.mp4
-->

---

## 📁 Structure du Projet

```
Findini/
├── backend/                    # API REST Node.js
│   ├── config/                 # Configuration (DB, etc.)
│   ├── controllers/            # Logique métier
│   ├── middleware/             # Authentification, upload
│   ├── routes/                 # Routes API
│   ├── public/uploads/         # Fichiers uploadés
│   └── server.js               # Point d'entrée
│
├── Frontend/                   # Application React Native
│   ├── screnn/                 # Écrans utilisateurs
│   ├── screenadmin/            # Écrans admin
│   ├── navigation/             # Navigation
│   ├── assets/                 # Images, icônes
│   └── App.js                  # Point d'entrée
│
└── README.md
```

---

## 🚀 Installation et Configuration

### **Prérequis**
- Node.js (v14+)
- MySQL
- npm ou yarn
- Expo CLI (pour le frontend mobile)

### **1️⃣ Configuration du Backend**

```bash
# Cloner le projet
git clone git@github.com:mohamedamine050/Findini.git
cd Findini/backend

# Installer les dépendances
npm install

# Configurer la base de données
# Créer une base MySQL nommée 'fundini'
# Modifier backend/config/db.js si nécessaire
```

**Créer un fichier `.env`** dans le dossier `backend/` :
```env
PORT=5000
JWT_SECRET=votre_secret_jwt_ici
```

**Démarrer le serveur** :
```bash
node server.js
```

Le serveur tourne sur **http://localhost:5000**

---

### **2️⃣ Configuration du Frontend**

```bash
cd Frontend

# Installer les dépendances
npm install

# Démarrer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios
```

---

## 🔧 Technologies Utilisées

### **Backend**
- **Node.js** & **Express.js** - Serveur API REST
- **MySQL** - Base de données
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hashage des mots de passe
- **Multer** - Upload d'images
- **CORS** - Gestion des requêtes cross-origin

### **Frontend**
- **React Native** - Framework mobile
- **Expo** - Outils de développement
- **React Navigation** - Navigation dans l'app
- **Axios** - Requêtes HTTP
- **AsyncStorage** - Stockage local
- **expo-image-picker** - Sélection d'images

---

## 📡 API Endpoints

### **🔐 Authentification** (`/api/auth`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/register` | Créer un compte utilisateur |
| POST | `/login-user` | Connexion (retourne JWT) |
| POST | `/logout` | Déconnexion |
| GET | `/profile` | Profil utilisateur (protégé) |
| POST | `/profile` | Modifier le profil (protégé) |

### **👥 Utilisateurs** (`/api/users`)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/get-all-user` | Liste tous les utilisateurs |
| POST | `/delete-user` | Supprimer un utilisateur |

### **🗂️ Catégories** (`/api/categories`)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/categories` | Liste toutes les catégories |
| GET | `/categories/limit` | 4 premières catégories |
| POST | `/categories` | Ajouter une catégorie (avec image) |
| DELETE | `/categories/:id` | Supprimer une catégorie |

### **📁 Projets** (`/api/projects`)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/projects` | Liste tous les projets |
| POST | `/projects` | Créer un projet (protégé, avec image) |

---

## 📱 Fonctionnalités de l'Application

### **Pour les Utilisateurs**
- ✅ Inscription et connexion sécurisées
- ✅ Navigation par catégories de projets
- ✅ Consultation des projets
- ✅ Historique des donations
- ✅ Profil utilisateur personnalisable
- ✅ Support et aide
- ✅ Conditions d'utilisation et confidentialité

### **Pour les Administrateurs**
- ✅ Gestion des catégories (CRUD)
- ✅ Gestion des projets
- ✅ Gestion des utilisateurs
- ✅ Validation des projets
- ✅ Statistiques (à venir)

---

## 🗄️ Structure de la Base de Données

### **Tables principales** :
- `users` - Utilisateurs de l'application
- `categories` - Catégories de projets
- `projects` - Projets de crowdfunding
- `donations` - Historique des dons (à implémenter)

---

## 🔒 Sécurité

- 🔐 **JWT** pour l'authentification
- 🔒 **bcryptjs** pour le hashage des mots de passe
- 🛡️ **Middleware d'authentification** sur les routes protégées
- 🚫 **CORS** configuré pour limiter l'accès

---

## 📦 Scripts Disponibles

### **Backend**
```bash
npm test          # Tests (à configurer)
node server.js    # Démarrer le serveur
```

### **Frontend**
```bash
npm start         # Démarrer Expo
npm run android   # Lancer sur Android
npm run ios       # Lancer sur iOS
npm run web       # Lancer en mode web
```

---

## 🎨 Navigation de l'Application

### **Stack Non Authentifié**
- Login
- Register
- Admin Dashboard

### **Stack Authentifié**
- Home (Accueil)
- Categories
- Profile
- Historique donations
- Support
- Conditions d'utilisation
- Politique de confidentialité

---

## 🌟 Améliorations Futures

- [ ] Système de paiement intégré (Stripe/PayPal)
- [ ] Notifications push
- [ ] Système de commentaires
- [ ] Partage sur réseaux sociaux
- [ ] Statistiques en temps réel
- [ ] Tests unitaires et E2E
- [ ] CI/CD avec GitHub Actions
- [ ] Déploiement en production
- [ ] Mode sombre
- [ ] Multilangue (i18n)

---

## 👨‍💻 Auteur

**Mohamed Amine**  
GitHub: [@mohamedamine050](https://github.com/mohamedamine050)

---

## 📄 Licence

Ce projet est sous licence **MIT**.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une **issue** sur GitHub.

