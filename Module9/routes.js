(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    
      $stateProvider
        .state('home', {
          url: '/',
          template: '<h2>Welcome to our Restaurant!</h2><a ui-sref="categories">See Menu Categories</a>'
        })
    
        .state('categories', {
          url: '/categories',
          template: '<categories items="ctrl.items"></categories>',
          controller: ['MenuDataService', function (MenuDataService) {
            var ctrl = this;
            MenuDataService.getAllCategories().then(function (response) {
              ctrl.items = response.data;
            });
          }],
          controllerAs: 'ctrl'
        })
    
        .state('items', {
          url: '/items/{categoryShortName}',
          template: '<items items="ctrl.items"></items>',
          controller: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            var ctrl = this;
            MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function (response) {
              ctrl.items = response.data.menu_items;
            });
          }],
          controllerAs: 'ctrl'
        });
    }
    
    })();
    