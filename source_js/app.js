var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'searchCtrl'
  }).
  when('/searchdetail', {
    templateUrl: 'partials/searchdetail.html',
    controller: 'searchdetailCtrl'
  }).
  otherwise({
    redirectTo: '/search'
  });
}]);
