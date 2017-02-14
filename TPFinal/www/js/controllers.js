angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

