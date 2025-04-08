(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('customCurrency', CustomCurrencyFilter);

    // To Buy Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyCtrl.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    // Already Bought Controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;
        boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
    }

    // Service to manage shopping lists
    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            { name: "cookies", quantity: 10, pricePerItem: 2 },
            { name: "apples", quantity: 5, pricePerItem: 1.5 },
            { name: "oranges", quantity: 8, pricePerItem: 1.2 },
            { name: "milk", quantity: 2, pricePerItem: 3 },
            { name: "bread", quantity: 1, pricePerItem: 2.5 }
        ];
        var boughtItems = [];

        service.buyItem = function(itemIndex) {
            var item = toBuyItems.splice(itemIndex, 1)[0];
            boughtItems.push(item);
        };

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };
    }

    // Custom Currency Filter
    function CustomCurrencyFilter() {
        return function(input) {
            return input.toFixed(2);
        };
    }

})();
