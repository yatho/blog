---
title: Créer son premier plugin VSCode
description: Créer un plugin VSCode ? Rien de plus simple. Suivez le guide.
published: false
slug: create-plugin-vscode
date: "2024-09-15"
categories:
  - VSCode
  - Plugin
---

# Créer un plugin VSCode

## Comment créer un plugin VSCode

VSCode possède une [documentation complète](https://code.visualstudio.com/docs). Ainsi qu'une [documentation dédié aux plugins](https://code.visualstudio.com/api/get-started/your-first-extension).

### Créer la base de code

### Créer les commandes

### Créer la vue

## Comment publier un plugin VSCode

Il est très simple de publier sur le marketplace de VSCode un plugin.

1. Il est nécessaire de créer un compte avec une organisation sur le site `https://dev.azure.com/vscode`.
2. Créer un **personnal access token** sur ce même site.
3. Installer l'outil @vscode/vsce à l'aide de la commande npm `npm i -g @vscode/vsce`
4. Ajouter le nom du publisher dans le fichier **package.json**. Dans mon cas : `"publisher": "yatho"`.
5. Se connecter au marketplace avec l'outil vsce via la commande `vsce login yatho`.
6. Lancer la publication via la commande `vsce publish`.

Pour plus de renseignement, vous pouvez vous référer à la [documentation de VSCode officielle](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).
