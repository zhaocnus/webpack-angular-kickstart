import { module } from 'angular';

// shared modules

// container modules
// container is a major angular 'component' that renders a page, for example login, milestone, etc
// import homeModule from './containers/home';
// import thingModule from './containers/thing';
// import userModule from './containers/user';

// app CSS
import './app.scss';

let app = module('octaneLeaderboardApp', [
    // library dependencies
    'ui.router',
    'ngAnimate'

    // shared modules

    // container modules
    // homeModule,
    // thingModule,
    // userModule
  ])

  .config(($locationProvider, $urlRouterProvider) => {
    // disable html5 mode
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    // default route
    $urlRouterProvider.otherwise('/');
  });

export default app.name;