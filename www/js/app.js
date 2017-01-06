var app = angular.module('ionic-todo', ['ionic', 'LocalStorageModule']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('ionic-todo')
});

app.controller('main', function($scope, $ionicModal, localStorageService) {

  var taskData = 'task';

  $scope.tasks = [];

  $scope.task = [];

  $ionicModal.fromTemplateUrl('new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newTaskModal = modal;
  });

  $scope.getTasks = function() {
    if (localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData);
    } else {
      $scope.tasks = [];
    }
  };

  $scope.createTask = function() {
    $scope.tasks.push($scope.task);
    localStorageService.set(taskData, $scope.tasks);
    $scope.task = {};

    $scope.newTaskModal.hide();
  };

  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
    localStorageService.set(taskData, $scope.tasks);
  };

  $scope.completeTask = function(index) {
    localStorageService.set(taskData, $scope.tasks);
  };

  $scope.openTaskModal = function() {
    $scope.newTaskModal.show();
  };

  $scope.closeTaskModal = function() {
    $scope.newTaskModal.hide();
  };
});
