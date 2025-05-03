(function () {
    'use strict';
    
    angular.module('public')
    .controller('SignupController', SignupController);
    
    SignupController.$inject = ['MenuService', 'UserService'];
    function SignupController(MenuService, UserService) {
      var signupCtrl = this;
      signupCtrl.user = {};
      signupCtrl.invalidDish = false;
      signupCtrl.saved = false;
    
      signupCtrl.validateFavDish = function () {
        if (!signupCtrl.user.favDish) return;
        MenuService.getMenuItem(signupCtrl.user.favDish)
          .then(function (item) {
            signupCtrl.invalidDish = !item;
          });
      };
    
      signupCtrl.submit = function () {
        MenuService.getMenuItem(signupCtrl.user.favDish)
          .then(function (item) {
            if (!item) {
              signupCtrl.invalidDish = true;
              return;
            }
            UserService.saveUser(signupCtrl.user, item);
            signupCtrl.saved = true;
          });
      };
    }
    })();
    