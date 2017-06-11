var app = angular.module('sqlParser', []);
app.controller('mainCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    
    $scope.sqlRusult = "";
    
    $scope.parseRA = function($event) {
        $scope.sqlRusult = parseString($scope.rAData);
    }
    
});