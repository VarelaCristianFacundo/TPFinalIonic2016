angular.module('starter.controllers', [])

.controller('desafiosadminCtrl', function($scope) {})

.controller('cargarcreditoCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

