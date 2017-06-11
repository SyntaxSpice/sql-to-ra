var app = angular.module('sqlParser', []);
app.controller('mainCtrl', function ($scope, $http) {
    $scope.sqlRusult = "";
    $scope.table;
    $scope.cnames = [];

    $scope.submit = function () {
        $http.post('/sql', {data:$scope.rAData}).then(function (data) {
            console.log(data.data);
            $scope.table = data.data;
            $scope.cnames = [];
            for(let key in data.data[0]){
                $scope.cnames.push(key);
            }
            console.log($scope.cnames);
        });
    };

    $scope.parseRA = function ($event) {
        if ($scope.rAData) {
            $scope.sqlRusult = parseString($scope.rAData);
            $scope.submit();
        }
    }
});