(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    var category = shortName.charAt(0).toUpperCase();
    var index = parseInt(shortName.substring(1)) - 1;
    return $http.get(API_BASE_PATH + "/menu_items/" + category + "/menu_items/" + index + ".json")
      .then(function (response) {
        return response.data;
      });
  };  

}


})();
