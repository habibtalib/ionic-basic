angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.authorized = false;

  $scope.token = null;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

    // Open the login modal
  $scope.logout = function() {
    $scope.authorized = false;
  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    
        var config = {
              headers : {
                  'accept': 'application/json;',
                  'Content-Type': 'multipart/form-data;'
                  }
          };          
          $http.post("http://localhost/sampleapi/public/api/v1/auth/login",
           { 'email' : $scope.loginData.username ,  'password': $scope.loginData.password }
           , config)
                        .success(function(response){
                           $scope.result = response.data;
                          $scope.authorized = true; 
                          $scope.token = response.data.token;
                          })
                        .error(function(error){
                          var alertPopup = $ionicPopup.alert({
                              title: 'Login failed!',
                              template: error.error
                              });
      });
    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PlaylistsCtrl', function($scope, $http) {
      var config = {
              headers : {
                  'Accept': 'application/json;',
                  'Authorization' : 'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ1OTU2NzM1MCwiZXhwIjoxNDkxMTAzMzUwLCJuYmYiOjE0NTk1NjczNTAsImp0aSI6IjRlMmIyMWJiM2QyNjI1NGU5MjZlOWJhZmVjZTMyZTFlIn0.f02-Gqhgc_5qaA3MrZAnRUxIWPE0FddQY30EIasljhI'
              }
          };
        $http.get("http://localhost/sampleapi/public/api/v1/users", config)
                        .then(function(response){
                           var users = response.data.data; 
                           $scope.users = users;                       
            });  
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

  $scope.param = $stateParams;
});
