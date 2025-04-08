(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json');
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var ctrl = this;
      ctrl.searchTerm = "";
      ctrl.found = [];
      ctrl.loading = true;
      ctrl.noResults = false;

      ctrl.narrowItDown = function () {
        ctrl.noResults = false;
        if (!ctrl.searchTerm.trim()) {
          ctrl.found = [];
          ctrl.noResults = true;
          return;
        }
        
        ctrl.loading = true;
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
          .then(function (foundItems) {
            ctrl.found = foundItems;
            if (ctrl.found.length === 0) {
                ctrl.noResults = true;
            }
          })
          .finally(function () {
            ctrl.loading = false;
          });
      };
  
      ctrl.removeItem = function (index) {
        ctrl.found.splice(index, 1);
      };
    }
  
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
  
      service.getMatchedMenuItems = function (searchTerm) {
        return $http.get(ApiBasePath).then(function (response) {
          var allItems = response.data;
          var foundItems = [];
  
          for (var category in allItems) {
            foundItems = foundItems.concat(
              allItems[category].menu_items.filter(item => 
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
          }
  
          return foundItems;
        });
      };
    }
  
  })();
  