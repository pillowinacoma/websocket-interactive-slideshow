# TIW8 - 2021

## Guide des commandes :

- `yarn run build` : Créer un bundle de notre application en mode production
- `yarn run start` : Lance le serveur express
- `yarn run dev` : Créer un bundle de notre application en mode developpement et lance le serveur Express
- ` yarn run eslint {path/file.tsx}` : Permet de tester la bonne syntaxe d'un fichier en particulier avec ESLint.

- `git push heroku main` : Déploie l'application sur heroku (fonctionne uniquement sur la branche master ou main)

## TP1 :

L’objectif du TP est de mettre en place “l’enveloppe” d’une application Web avec un serveur Node/Express léger, et un framework JS côté client. Pour l’UE le client sera développé avec React

## TP2 :

### TLDR :
[lien Heroku](https://obscure-beach-17514.herokuapp.com/)

[lien git](https://forge.univ-lyon1.fr/p1807434/tiw8-tp2.git)

- TP2.1 :
  - Functionnal commponents
  - Tailwind + Windmill components & dark mode
  - React Router
- TP2.2 :
  - Gestion d'état avec Redux Toolkit
  - Immutable state
  - Modification & Ajout de slides
- TP2.3 :
  - Websocket : Gestion du State distant
  - Modification de l'etat distribué (ajouter + modifier + cacher un slide, next previous ...)
  - Routage selon le dispositif
  - Plein ecran
- TP2.4 :
  - Dessin sur un slide qui se propage en temps réelle sur les autres
  - Reconnaissance des gestes qui se propage et change l'etat des slides distants
  - Notes en MarkDown 

### Details :

L’objectif du TP est de mettre en place une Single Page Application (SPA) permettant de créer et contrôler des présentations. Elle sera développée principalement côté client avec React, avec un serveur Node/Express léger. Le serveur sera codé en JavaScript, le client en TypeScript.

Après avoir mit en place un store et un serveur websocket, nous avons un implémenté un middleware qui permet de diffuser les changements de l'état du store aux devices distants.

Dans ce TP nous avons séparé **l'affichage** et **le controle de la présentation** en 2 routes différentes.

- Désormais la route `/Present/idSlide`, affiche la slide, permet de dessiner dessus (ainsi qu'effacer son dessin) et permet de passer en plein écran. Le dessin est diffusé sur les autres devices connecté en mode présentation.

- La route `/Control/idSlide` quant à elle, affiche une télécommande permettant de changer de slide via plusieurs méthodes, les flèches, une liste déroulante ou encore via des gestes (en dessinant **<** ou **>** sur l'écran). On peut également modifier la slide courante, la masquer, la supprimer, ou en ajouter une nouvelle. Les mises à jour sont également diffusées aux autres devices (mode télécommande et présentation). La télécommande affiche également les notes liées à la slide courante. <br>
  > Remarque : Ces notes sont en **Markdown** ce qui permet une meilleure mise en page et donc une meilleure lisibilité lors des conférences.

Notre `recognizer.ts` est capable de reconnaitre un triangle, un cercle et les chevrons (ceux ci permettant de changer de slides). Vous pourrez observer dans la console le geste reconnu et son taux de reconnaissance (en pourcentage) dans le champs _score_. Les fonctionnalités associées aux gestes ne se déclenchent que lorsque le geste est reconnu à plus de 80%.

Par défaut, les smartphones se connectent en tant que remote et les autres devices en mode présentation. Pour cela nous utilisons `react-device-detect`.
