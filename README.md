# Fundini Backend API

Ce projet est le backend d'une application de gestion de projets et utilisateurs (type crowdfunding), développé avec **Node.js**, **Express.js**, **MySQL**, **JWT**, et **Multer** pour l'upload de fichiers.

## 📁 Structure du projet

├── server.js (ou index.js)
├── /public # Fichiers uploadés (images, assets, etc.)
├── package.json
└── README.md

bash
Copier
Modifier

## 🚀 Installation

1. **Cloner le projet** :
   ```bash
   git@github.com:mohamedamine050/Findini.git
   cd fundini-backend
Installer les dépendances :

bash
Copier
Modifier
npm install
Configurer la base de données MySQL :

Créer une base fundini

Ajouter une table users, categories, et projects (structure à définir)

Modifier la configuration MySQL dans le code (host, user, password).

Démarrer le serveur :

bash
Copier
Modifier
node server.js
Le serveur tourne par défaut sur le port 3000.

🔐 Authentification
Le backend utilise JWT pour sécuriser les routes protégées.

POST /register – Créer un utilisateur

POST /login-user – Connexion et récupération d’un token JWT

POST /logout – Déconnexion (validation du token)

GET /profile – Obtenir le profil de l'utilisateur connecté (protégé)

POST /profile – Modifier le profil (protégé)

📦 Gestion des utilisateurs
GET /get-all-user – Récupérer tous les utilisateurs

POST /delete-user – Supprimer un utilisateur par ID

🗂️ Catégories
GET /categories – Lister toutes les catégories

GET /categories/limit – Lister les 4 premières catégories

POST /categories – Ajouter une catégorie avec image

DELETE /categories/:id – Supprimer une catégorie par ID

📁 Projets
GET /projects – Récupérer tous les projets

POST /projects – Ajouter un projet (protégé, avec image)

🖼️ Upload de fichiers
Géré via Multer :

Les images sont stockées dans ../my-app/public.

upload.fields([{ name: 'image', maxCount: 1 }]) pour les catégories et projets.

🛠️ Technologies utilisées
Node.js

Express.js

MySQL

Multer

bcryptjs

jsonwebtoken

body-parser

cors

✅ TODO
 Ajout de la validation des entrées

 Middleware de gestion d'erreurs global

 Gestion des rôles (admin/user)

 Tests unitaires avec Jest

📄 Licence
Ce projet est sous licence MIT.

go
Copier
Modifier

Souhaites-tu que je génère automatiquement ce fichier en `.md` téléchargeable ?
 
