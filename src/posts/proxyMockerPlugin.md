---
title: Proxy Mocker - Mon premier plugin VSCode
description: Quoi de mieux pour améliorer son quotidien qu'intégrer nos besoins dans notre IDE. Voici pourquoi je me suis lancer dans la création d'un plugin VSCode. Ce plugin permet de sauvegarder les requêtes vers un serveur pour pouvoir les mocker juste en cliquant sur un bouton.
published: true
slug: proxy-mocker-plugin
date: "2024-08-22"
categories:
  - VSCode
  - Plugin
  - Proxy
  - Mock
---

# **[Proxy Mocker](https://github.com/yatho/proxy-mocker-ext)** - Mon premier plugin VSCode

## Introduction

Tout a commencé par un problème : une connexion internet instable. Que ce soit mon réseau, le VPN ou la mise à jour du serveur utilisé, je passais du temps à attendre de pouvoir tester.

Ce souci récurrent perturbe considérablement mon quotidien de développeur, surtout lorsque l'accès au réseau est indispensable. Comment y remédier ?

Ma première solution a été de développer un projet de tests E2E. Ce projet permet de remplacer facilement les requêtes par des mocks, tout en améliorant la résilience grâce à des tests de non-régression automatisés. L'inconvénient principal est le coût de mise en place et la nécessité d'effectuer des opérations manuelles, comme la saisie des mocks.

Ma deuxième idée a été d'intégrer un middleware entre le frontend et le backend. Ce middleware intercepte toutes les requêtes, les sauvegarde, et les mocke au besoin. Problème résolu.

Avant de coder cette solution moi-même, j'ai cherché un projet existant répondant à mes besoins, mais sans succès. J'ai trouvé de nombreux projets de proxy, mais aucun ne correspondait totalement à mes attentes.

Face à ce constat, j'ai décidé de créer mon propre outil.

Utilisant VSCode depuis plusieurs années, j'apprécie la simplicité de son système de plugins. Facile à installer et à configurer. De plus, il me permet d'exploiter mes compétences en JavaScript/TypeScript. C'est ainsi qu'est né le plugin VSCode : **[Proxy Mocker](https://github.com/yatho/proxy-mocker-ext)**.

## Les fonctionnalités du plugin Proxy Mocker

À ce jour, deux fonctionnalités sont disponibles :

1. **Sauvegarder les requêtes**
   Dans cette première version, seules les valeurs du body, l'URL et la méthode HTTP (GET, POST, etc.) sont sauvegardées pour chaque requête. Des évolutions futures permettront d'ajouter d'autres éléments, tels que l'intégralité du corps de la requête.
   Il est aussi possible de cibler les requêtes à sauvegarder en configurant un pattern d'URL.
   La gestion des requêtes sauvegardées est essentielle : il est donc possible de les lister, de consulter leurs détails et de les supprimer.

2. **Remplacement des requêtes par leur sauvegarde**
   Une fois les requêtes sauvegardées, si une correspondance est trouvée, il devient possible de mocker automatiquement l'appel en utilisant la sauvegarde existante.

## Utilisation

Pour visualiser les requêtes et effectuer les actions proposées par le plugin, une interface dédiée est disponible dans la vue suivante :

![view](./proxyMockerPlugin/view.png)

En cliquant sur l'icône 1, la vue 2 s'ouvre. Celle-ci affiche l'ensemble des requêtes déjà sauvegardées.

En haut à droite de cette vue se trouve des raccourcis de lancement des actions du plugin. Dans l'ordre de gauche à droite :

- Raffraichir la liste de requêtes sauvegardées
- Supprimer toutes les requêtes sauvegardées.
- Commencer / Arrêter la sauvegarde des requêtes.
- Basculer en mode mock ou revenir en avec les requêtes réels.

En cliquant sur une requête, les détails de celle-ci s'affichent. Voici un exemple :

![savecRequest](./proxyMockerPlugin/request.png)

Cet écran permet de récupérer les détails d'une requête, facilitant ainsi la mise à jour d'un mock dans un projet E2E, par exemple.

## Configuration

Pour pouvoir adapter le plugin à notre usage. Un peu de configuration s'impose.

![settings](./proxyMockerPlugin/settings.png)

1. Choix du port sur lequel le proxy écoute. Par défaut **8000**.
2. La cible du proxy. L'URL du serveur à mocker. Par défaut **http://localhost:300**.
3. Le pattern d'URL à sauvegarder. Par défaut **/api**.

## Conclusion

Le développement de ce plugin m'a permis de résoudre mon problème initial. Bien sûr, il reste perfectible et sera amélioré au fil du temps.

**[Proxy Mocker](https://github.com/yatho/proxy-mocker-ext)** est un projet **Open Source**. N'hésitez pas à contribuer, que ce soit en ajoutant des tests unitaires, en proposant de nouvelles fonctionnalités, en enrichissant la documentation ou simplement en le faisant connaître.

Merci d'avoir pris le temps de lire cet article.
