
var mp4Controllers = angular.module('mp4Controllers', ['elasticsearch','ngMap']);


mp4Controllers.controller('searchCtrl', ['apartmentService', '$scope', '$location','searchdetaildata','redirectservice', function(apartments, $scope, $location,searchdetaildata,redirectservice) {
  
  // var vm=this;
   $scope.data =[];
    $scope.positions =[];
    $scope.cur="";

  var initChoices = [
      "furnished",
      "parking",
      "free",
      "laundry",
      "new",
      "patios",
      "TV"
  ];
  var idx = Math.floor(Math.random() * initChoices.length);

  // Initialize the scope defaults.
  $scope.apartments = [];        // An array of recipe results to display
  $scope.page = 0;            // A counter to keep track of our current page
  $scope.allResults = false;  // Whether or not all results have been found.
  $scope.recommend=[]
  // And, a random search term to start if none was present on page load.
  console.log(redirectservice.getData())
  if(redirectservice.getData()!="")
    $scope.searchTerm=redirectservice.getData()
  else
    $scope.searchTerm = $location.search().q || initChoices[idx];
  redirectservice.setData("");
  /**
   * A fresh search. Reset the scope variables to their defaults, set
   * the q query parameter, and load more results.
   */
  $scope.search = function() {
    $scope.page = 0;
    $scope.apartments = [];
    $scope.allResults = false;
    $location.search({'q': $scope.searchTerm});
    $scope.loadMore();
  };

  /**
   * Load the next page of results, incrementing the page counter.
   * When query is finished, push results onto $scope.recipes and decide
   * whether all results have been returned (i.e. were 10 results returned?)
   */
  $scope.loadMore = function() {
    apartments.search($scope.searchTerm, $scope.page++).then(function(results) {
      if (results.length !== 10) {
        $scope.allResults = true;
      }

      var ii = 0;
      $scope.cur=results[0].Address;
      for (; ii < results.length; ii++) {
        $scope.apartments.push(results[ii]);
        // $scope.data.push({foo:ii, bar:ii})
        $scope.positions.push({pos:results[ii].Address})
      }
    });
  };

  $scope.accessdetail=function(data){
    searchdetaildata.setData(data);
    $location.url("/searchdetail");
  }

  var iidx = Math.floor(Math.random() * initChoices.length);
    // $location.search({'q': iidx});
    apartments.search(initChoices[iidx], 0).then(function(results){
      var ii = 0;
      for (; ii < results.length; ii++) {
        $scope.recommend.push(results[ii]);
        if(ii==3)
          break;

      }
    })


    $scope.loadMore();

  
    

}]);

mp4Controllers.controller('searchdetailCtrl', ['similaritysearch','$scope', 'searchdetaildata' ,
  '$location' ,'redirectservice', function(apartments,$scope, searchdetaildata,$location,redirectservice,NgMap) {
  $scope.info=searchdetaildata.getData();
  if($scope.info!=undefined ){
    if($scope.info.Features!=undefined){
         var array = eval($scope.info.Features);
         $scope.features=array
    }
    if($scope.info.Description!=undefined){
         var array = eval($scope.info.Description);
         $scope.description=array[0]
    }
    if($scope.info["Price"]!=undefined){
        var array = eval($scope.info["Price"]);
         $scope.price=array[0]

    }
   

  }
  $scope.redirect=function(term){
    redirectservice.setData(term)
    $location.url("/search")
  }
  $scope.apartments=[]
  $scope.searchTerm="green"
  $location.search({'q': $scope.searchTerm});
  apartments.search($scope.searchTerm).then(function(results) {
      var ii = 0;
      for (; ii < results.length; ii++) {
        $scope.apartments.push(results[ii]);
      }
    })




}]);

mp4Controllers.controller('homeController', ['$scope'  , function($scope) {
  $scope.data = "";
   $scope.displayText = ""


}]);
