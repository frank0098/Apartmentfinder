var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'searchCtrl'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
