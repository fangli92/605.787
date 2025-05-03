angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService'];
function MyInfoController(UserService) {
  var myInfoCtrl = this;
  myInfoCtrl.user = UserService.getUser();
}
