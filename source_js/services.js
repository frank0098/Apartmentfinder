var mp4Services = angular.module('mp4Services', ['elasticsearch']);

mp4Services.factory('redirectservice', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});

mp4Services.factory('searchdetaildata', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});

mp4Services.factory('Llamas', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/llamas');
        }
    }
});


mp4Services.factory('similaritysearch', ['$q', 'esFactory', '$location', function($q, elasticsearch, $location) {
  var client = elasticsearch({
    host: $location.host() + ':9200'
  });

  /**
   * Given a term and an offset, load another round of 10 recipes.
   *
   * Returns a promise.
   */
  var search = function(term) {
    var deferred = $q.defer();
    var query = {
      "bool": {
          "filter": {"and": {
            "filters": [
              {"term": {"Feature": "Parking Available"}},
              {"term": {"Feature": "Furnished"}}
            ]
          }}
      }  
    }
    // var query = {
    //   match: {
    //     _all: "Furnished"
    //   }
     
    // };
    // var agg={
    //     "bestMatch": {
    //     "terms": {
    //       "field": "Feature",
    //       // "exclude": ["water","flour"],
    //       "min_doc_count": 2
    //     }
    //   }
    // }

    var agg={
    "authors-aggs": {
      "terms": {
        "field": "Feature"
      }
    }
  }
    client.search({
      index: 'apartments',
      type: 'apartment',
      body: {
        size: 10,
        from: 0,
        // query: query,
        aggs:agg
      }
    }).then(function(result) {
      var ii = 0, hits_in, hits_out = [];

      hits_in = (result.hits || {}).hits || [];

      for(; ii < hits_in.length; ii++) {
        hits_out.push(hits_in[ii]._source);
      }

      deferred.resolve(hits_out);
    }, deferred.reject);

    return deferred.promise;
  };
  
  // Since this is a factory method, we return an object representing the actual service.
  return {
    search: search
  };
}]);



mp4Services.factory('apartmentService', ['$q', 'esFactory', '$location', function($q, elasticsearch, $location) {
  var client = elasticsearch({
    host: $location.host() + ':9200'
  });

  /**
   * Given a term and an offset, load another round of 10 recipes.
   *
   * Returns a promise.
   */
  var search = function(term, offset) {
    var deferred = $q.defer();
    var query = {
      match: {
        _all: term
      }
    };

    client.search({
      index: 'apartments',
      type: 'apartment',
      body: {
        size: 10,
        from: (offset || 0) * 10,
        query: query
      }
    }).then(function(result) {
      var ii = 0, hits_in, hits_out = [];

      hits_in = (result.hits || {}).hits || [];

      for(; ii < hits_in.length; ii++) {
        hits_out.push(hits_in[ii]._source);
      }

      deferred.resolve(hits_out);
    }, deferred.reject);

    return deferred.promise;
  };
  
  // Since this is a factory method, we return an object representing the actual service.
  return {
    search: search
  };
}]);
