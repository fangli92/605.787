angular.module('common')
.service('UserService', function () {
  var service = this;
  var user = null;

  service.saveUser = function (userData, menuItem) {
    user = angular.copy(userData);
    user.menuItem = menuItem;
  };

  service.getUser = function () {
    return user;
  };
});
