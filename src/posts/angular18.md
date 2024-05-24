---
title: Angular 18
description: Liste des nouveautés Angular 18
published: true
slug: angular18
date: '2024-05-24'
categories: 
    - Angular
---

# Angular 18

Dans ce document, je vais essayer de synthétiser les nouveautés apportées par Angular 18.

## Zoneless

### ZoneJs, kesako ?

Se passer de **ZoneJs**, c'est bien, mais **ZoneJs**, c'est quoi ?

**ZoneJs** est une bibliothèque qui permet à Angular de détecter les changements d'état de l'application pouvant affecter la vue.

Cette bibliothèque intercepte les événements asynchrones tels que les promesses, les événements DOM, les requêtes XHR, les timers, etc. Lors de la détection d'un changement, le processus de mise à jour d'Angular est déclenché.

Ainsi, Angular peut mettre à jour la vue chaque fois qu'un changement d'état survient.

À ce jour, cette bibliothèque est la clé de la détection de changement dans Angular.

Depuis le 22 mai 2024, il est possible de supprimer l'usage de cette bibliothèque de façon optionnelle pour activer ce qu'on appelle le **ZoneLess**. Cette option désactive et supprime **ZoneJs** de notre application.

Cette nouvelle approche est rendue possible grâce à l'utilisation de signaux et a pour but d'améliorer les performances, car la détection de changement peut être contrôlée de manière plus fine.

### Activation de l'option ZoneLess

L'activation de l'option est assez simple. Il suffit d'ajouter à la configuration de son projet la méthode **provideExperimentalZonelessChangeDetection** disponible dans le package **@angular/core**.

```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideExperimentalZonelessChangeDetection()]
};

```

Une fois cela fait, la librairie **ZoneJs** devient obsolète et doit être supprimée.
Cette opération se déroule en deux temps :

- Supprimer les références à **zone.js** dans le fichier **angular.json**
- Supprimer **ZoneJs** des dépendances du **package.json** la librairie.

Bravo à vous. Votre application est **ZoneLess**. Maintenant, testé la afin de vérifier qu'il n'y est pas de régression.

### C'est activé, mais ça ne fonctionne pas !! Que faire ?

Afin de rendre vos composants compatibles avec cette option, il est nécessaire qu'ils soient compatibles avec l'option **ChangeDetectionStrategy.OnPush**.

Voici quelques suggestions :

- Utiliser le pipe async.
- Utiliser les signaux.
- Utiliser **inject(ChangeDetectorRef).detectChanges()**.

Si vous utilisez Angular CDK et/ou Angular Material, bonne nouvelle : ils sont entièrement compatibles avec la fonctionnalité **ZoneLess**.

## Material 3

L'usage de Material 3 est désormais stable. En parallèle, la documentation de **@angular/material@18** a été mise à jour avec le nouveau thème Material 3.

[Suivez le guide utiliser Material 3 dans vos applications Angular](https://material.angular.io/guide/theming)

## Deferable view stable

La nouvelle fonctionnalité **@defer** a été introduite dans la version 17 d'Angular en developer preview. Dans la version 18, cette fonctionnalité est devenue stable !

Cette fonctionnalité ouvre un nouveau monde de **lazy loading** pour Angular.

## Control flow stable

Le **Control Flow** a également été introduit dans la version 17 d'Angular en developer preview.

Dans la version 18, cette fonctionnalité est devenue stable !

## SSR

Le **Server Side Rendering** ou **SSR** a également évolué en intégrant:

- la traduction **i18n** manquante (developper preview)
- l'hydratation des composants Angular Material

## Ng-content default

Voici une fonctionnalité qui m'a manqué plus d'une fois. Il est maintenant possible d'ajouter une valeur par défaut lors de la projection de contenu si celui-ci n'est pas présent.

Voici comment l'utiliser :

```typescript
@Component({
  selector: 'app-questions',
  template: `<section>
    <ng-content select="title"><h1>Questions</h1></ng-content>
    <ng-content select="[questions]"></ng-content>
  </section>`
})
export class QuestionsComponent {}
```

Lorsqu'on appelle ainsi ce composant :

```html
<app-questions>
  <div questions>
    <h2>Répondez à cette question magnifique</h2>
    <ul>
      <li>Réponse A</li>
      <li>Réponse B</li>
      <li>Réponse C</li>
      <li>La réponse D</li>
    </ul>
  </div>
</app-questions>
```

On obtient :

```html
<h1>Questions</h1> <!-- Valeur par défaut -->
<div>
  <h2>Répondez à cette question magnifique</h2>
  <ul>
    <li>Réponse A</li>
    <li>Réponse B</li>
    <li>Réponse C</li>
    <li>La réponse D</li>
  </ul>
</div>
```

## Formulaire

Petite évolution au niveau des formulaires sur cette version.

Un système d'évènements a été ajouté aux classes **FormControl**, **FormGroup** et **FormArray**.

Voici comment l'utiliser :

```typescript
const nameControl = new FormControl<string|null>('name');
nameControl.events.subscribe(event => {
  // ...
});
```

## Builder

Le builder **application** proposé dans la version 17 d'Angular est désormais considéré comme stable et devient le builder par défaut pour les nouveaux projets. Son objectif est de remplacer **Webpack** par **ViteJs** et **EsBuild**.

Malheureusement, le Hot Module Replacement (HMR) n'est pas encore disponible dans cette version. Voici le [lien de l'issue github](https://github.com/angular/angular/issues/39367) pour suivre cette fonctionnalité.

## Router

### RedirectCommand

Le nouvel objet **RedirectCommand** est disponible depuis Angular 18.

Les **routeGuard** et les **resolvers** peuvent retourner un **RedirectCommand**.

```typescript
const route: Route = {
  path: 'page1',
  component: PageComponent,
  canActivate: [
    () => {
      const router: Router = inject(Router);
      const urlTree: UrlTree = router.parseUrl('./something');
      return new RedirectCommand(urlTree, { skipLocationChange: true });
    },
  ],
};
```

 ```typescript
 export const heroResolver: ResolveFn<Hero> = async (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot,
 ) => {
   const router = inject(Router);
   const heroService = inject(HeroService);
   try {
     return await heroService.getHero(route.paramMap.get('id')!);
   } catch {
     return new RedirectCommand(router.parseUrl('/404'));
   }
 };
 ```

### RedirectTo

Jusqu'à ce jour, la configuration de la redirection d'une route était fixée par un **string**.
**Route.redirectTo** peut aujourd'hui utiliser une fonction et ainsi appliquer des patterns complexe de redirection !

```typescript
export const routes: Routes = [
  {
    path: 'something',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
]; 
```

Maintenant il est possible de prendre une fonction qui prend en paramètre l'url et qui peut retourner un **string** ou un **UrlTree**.

```typescript
export const routes: Routes = [
  {
    path: 'something',
    redirectTo: (url) => { 
      return '/dashboard'; 
    },
    pathMatch: 'full'
  }
];
```

## Conclusion

Angular 18 est la confirmation de la majorité de ce qui a été lancé avec Angular 17 en rendant stable un panel d'évolution commencé dans la version précédente.

Quelques nouveautés sont encore attendues comme le template **@let** qui permettra de séparer, de façon plus efficace, la vue du controller en permettant de déplacer certain contenu inutile dans le controller dans la vue.