angular.module('app.services', [])

.factory('BlankFactory', [function() {

  }])
  .service('LoginService', function($q) {
    return {
      loginUser: function(db, name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        for (var i = 0; i < db.data.length; i++)
          var flag = 0;
        for (var i = 0; i < db.data.length; i++)
          if ((name.toUpperCase() == db.data[i].UserName.toUpperCase()) && pw == db.data[i].Password) {
            flag = 1;
            break;
          }
        if (flag == 1) {

          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }

  })

.service('HttpService', function($http, Backand) {
  return {
    getPost: function() {

      return $http.get(Backand.getApiUrl() + '/1/objects/LicenseUser')
        .then(function(response) {


          return response.data;
        })
    },
    getComp: function() {
      return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/LicenseSerial',
          params: {
            pageNumber: 1,
            pageSize: 1000,
            filter: [],
            sort: ''
          }
        })
        .then(function(response) {

          return response.data;
        })
    },
     getCompDetails2: function() {
       return $http({
           method: 'GET',
           url: Backand.getApiUrl() + '/1/objects/LicenseKey',
           params: {
             pageNumber: 1,
             pageSize: 1000,
             filter: [],
             sort: ''
           }
         })
         .then(function(response) {
return response.data;
          })
      },
    getCompDetails: function(key) {

      return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/LicenseKey',
          params: {
            pageNumber: 1,
            pageSize: 1000,
            filter: [{
              fieldName: 'SerialNumber',
              operator: 'equals',
              value: key
            }],
            sort: ''
          }
        })
        .then(function(response) {

          return response.data;
        })
    },

    getKeyDetails: function(key) {
      return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/LicenseKeyFeature',
          params: {
            pageNumber: 1,
              pageSize: 1000,
              filter: [{
              fieldName: 'LicenseKeyId',
              operator: 'equals',
              value: key
            }],
            sort: ''
          }
        })
        .then(function(response) {
          return response.data;
        })

    },
    getFeatureNames: function() {

      return $http.get(Backand.getApiUrl() + '/1/objects/Feature')
        .then(function(response) {
          return response.data;
        })
    },
    getKeyFeatureLog: function(key, id) {
      return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/LicenseKeyFeatureLog',
          params: {
            pageSize: 1000,
            pageNumber: 1,
            filter: [{
              fieldName: 'LicenseKeyId',
              operator: 'equals',
              value: key
            }, {
              fieldName: 'FeatureId',
              operator: 'equals',
              value: id
            }],
            sort: '[{fieldName:\'GeneratedOn\', order:\'desc\'}]'
          }
        })
        .then(function(response) {
          return response.data;
        })

    },
    getFeatureGeneratedDate: function(lickey, featid) {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/LicenseKeyFeatureLog',
        params: {
          pageSize: 1000,
          pageNumber: 1,
          filter: [{
            fieldName: 'FeatureId',
            operator: 'equals',
            value: featid
          }, {
            fieldName: 'LicenseKeyId',
            operator: 'equals',
            value: lickey
          }],
          sort: '[{fieldName:\'GeneratedOn\', order:\'asc\'}]'
        }
      })  .then(function(response) {
          return response;
        })


}
}})



.service('BlankService', [function() {

}]);
