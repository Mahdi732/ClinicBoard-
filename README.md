# 🏥 ClinicApp — Gestion de cabinet médical (SPA locale)

## 📌 Contexte du projet
Le cabinet gère actuellement patients, rendez-vous et finances via Excel → erreurs, doublons, manque de sécurité.  
**Objectif :** Créer une application web monopage (SPA) 100% locale, ergonomique et sécurisée, avec persistance en LocalStorage et accès protégé par mot de passe hashé.

---

## 🚀 Fonctionnalités principales

### 🔐 Authentification
- Création du mot de passe (première utilisation)  
- Connexion avec hash vérifié  
- Compteur d’échecs + verrouillage temporaire  
- *(Bonus)* Chiffrement du JSON en LocalStorage  

### 👥 Gestion des patients
- CRUD complet (ajouter / modifier / supprimer)  
- Champs : nom complet, téléphone, e-mail, notes  
- Recherche (nom ou téléphone)  
- Historique des rendez-vous liés  

### 📅 Rendez-vous
- Création avec patient, praticien, salle, type, durée  
- Modification (horaire, durée, statut)  
- Annulation / no-show  
- Filtrage (praticien / statut)  
- Vue Jour (agenda simple)  

### 💰 Recettes & dépenses
- Saisie recette (montant, méthode paiement, libellé)  
- Saisie dépense (montant, catégorie, libellé, date)  
- Suivi budget mensuel (objectif vs réalisé)  

### 📊 Tableau de bord
- KPIs : CA mensuel, Dépenses, Marge, Patients, Consultations  
- Navigation centralisée  

### 📂 Données & persistance
- Stockage : `localStorage` → clé unique : **clinicApp:data**  
- Schéma clair : `auth`, `patients`, `appointments`, `cash`  
- Réinit si pas de mot de passe défini  

---

## 🛠️ Stack technique
- **Front-end :** HTML, CSS, JavaScript (SPA)  
- **Persistance :** LocalStorage (JSON)  
- **Sécurité :** Hash mot de passe + verrouillage  
