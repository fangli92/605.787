(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', ['$scope', function ($scope) {
            $scope.lunchItems = "";
            $scope.message = "";

            $scope.checkLunch = function () {
                if (!$scope.lunchItems) {
                    $scope.message = "Please enter data first";
                    return;
                }

                // Split items by comma and filter out empty items
                var itemsArray = $scope.lunchItems.split(',');
                var filteredItems = itemsArray.filter(item => item.length > 0); // Removing empty values

                var itemCount = filteredItems.length;

                if (itemCount === 0) {
                    $scope.message = "Please enter data first";
                } else if (itemCount <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            };
        }]);
})();


