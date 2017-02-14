angular.module('perfiladmin.controller', [])

.controller('perfilCtrl', function($scope, sLogueado) {
$scope.referencia = sLogueado.traerUser();
console.info("referencia", $scope.referencia);
});