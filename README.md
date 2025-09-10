# Filigrane en Série - Extension Navigateur



Cette extension pour navigateur a été conçue pour automatiser l'ajout de filigranes à plusieurs documents en utilisant le service en ligne gratuit et open-source `filigrane.beta.gouv.fr`. Elle simplifie le processus en permettant de traiter des fichiers par lot, soit individuellement, soit en les fusionnant en un seul document PDF.

## Aperçu

<img width="505" height="391" alt="image" src="https://github.com/user-attachments/assets/0dd99aa8-361d-45f5-884a-5d77bd5bafe5" />


## Fonctionnalités

-   **Sélection multiple :** Sélectionnez et envoyez plusieurs fichiers simultanément (PDF, JPG, PNG, HEIC).
-   **Traitement individuel :** Obtenez un fichier PDF filigrané distinct pour chaque document envoyé.
-   **Fusion de documents :** Cochez une simple case pour fusionner tous les fichiers sélectionnés en un seul et unique document PDF filigrané.
-   **Personnalisation :** Saisissez le texte du filigrane que vous souhaitez appliquer sur vos documents.
-   **Interface simple :** Une interface claire et en français pour une prise en main immédiate.

## Installation

Cette extension n'est pas publiée sur le Chrome Web Store. Pour l'installer, vous devez la charger manuellement en "Mode développeur".

1.  **Téléchargez le projet :**
    Téléchargez ou clonez ce dépôt sur votre machine locale.
    ```bash
    git clone https://github.com/iladan0/FiligraneBatch.git
    ```
    *(N'oubliez pas de remplacer l'URL par celle de votre propre dépôt GitHub !)*

2.  **Ouvrez votre navigateur :**
    Lancez Google Chrome, Microsoft Edge, ou tout autre navigateur basé sur Chromium.

3.  **Accédez à la page des extensions :**
    Copiez-collez cette adresse dans votre barre d'URL : `chrome://extensions`

4.  **Activez le Mode développeur :**
    Assurez-vous que l'interrupteur "Mode développeur" ("Developer mode") est activé, généralement en haut à droite de la page.

5.  **Chargez l'extension :**
    -   Cliquez sur le bouton **"Charger l'extension non empaquetée"** ("Load unpacked").
    -   Une fenêtre de sélection de dossier s'ouvrira. Naviguez jusqu'au dossier du projet que vous venez de télécharger et sélectionnez-le.

6.  **C'est terminé !**
    L'icône de l'extension "Filigrane en Série" devrait maintenant apparaître dans votre barre d'outils.

## Comment l'utiliser

1.  Cliquez sur l'icône de l'extension dans la barre d'outils pour ouvrir le popup.
2.  Cliquez sur **"Sélectionner les fichiers"** et choisissez un ou plusieurs documents sur votre ordinateur.
3.  **(Optionnel)** Cochez la case **"Fusionner en un seul PDF"** si vous souhaitez combiner tous les documents.
4.  Saisissez le texte du filigrane souhaité dans le champ prévu à cet effet.
5.  Cliquez sur **"Lancer le traitement"**.
6.  Patientez pendant que l'extension envoie et traite les fichiers. Les documents filigranés seront automatiquement téléchargés dans votre dossier de téléchargements par défaut.

## Détails Techniques

-   **Manifest V3**
-   Développée en **HTML, CSS, et JavaScript (Vanilla JS)**
-   Utilise l'API `Fetch` pour communiquer avec le serveur.
-   Interagit avec l'API publique et gratuite de **filigrane.beta.gouv.fr**.

## Licence

Ce projet est distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus de détails.
