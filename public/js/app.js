(function (angular) {
    var app = angular.module('sqlParser', []);
    app.controller('mainCtrl', function ($scope, $http) {
        $scope.sqlRusult = "";
        $scope.table;
        $scope.cnames = [];

        $scope.submit = function () {
            $http.post('/sql', {
                data: $scope.rAData
            }).then(function (data) {
                console.log(data.data);
                $scope.table = data.data;
                $scope.cnames = [];
                for (let key in data.data[0]) {
                    $scope.cnames.push(key);
                }
                createTree(treeArr);
            });
        };

        $scope.parseRA = function ($event) {
            if ($scope.rAData) {
                document.getElementById("result").innerHTML = parseString($scope.rAData);
                $scope.submit();
            }
        }
    });

    app.controller('exampleCtrl', function ($scope) {
        $scope.tableExample = [
            {
                arr: ["R", "a int", "b string", "c string"]
            },
            {
                arr: ["S", "c string", "d int"]
            }
        ];

    });

    app.controller('title', function ($scope) {
        $scope.showWorkSpace = function () {
            animatedCameraMoveTo(cameraTo);
//            loadFont('../js/3D/font/TNR_Regular.json');
            loadFont('../js/3D/font/Arial_Regular.json');
//            loadFont('../js/3D/font/helvetiker_bold.typeface.json');
        }

        window.addEventListener("titleAnimated", showSqlSpace);

        function showSqlSpace() {
            document.getElementById("sqlSpace").style.zIndex = 44;
            document.getElementById("sqlSpace").style.opacity = 1;
            document.getElementById("start").style.display = "none";

            window.removeEventListener("titleAnimated", showSqlSpace);
        }
    });


})(window.angular);