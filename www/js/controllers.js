angular.module('app.controllers', [])

.controller('loginCtrl', function($rootScope, $scope, $ionicPopup, LoginService, $state, HttpService,$ionicLoading, Backand) {

  $ionicLoading.show({
    template: "Loading..."
  });
  $scope.data = {};
  HttpService.getPost()
    .then(function(response) {
      $rootScope.data1 = response;
    })
  HttpService.getFeatureNames() //data3
    .then(function(response) {
      $rootScope.data3 = response;

    })
  HttpService.getComp()
    .then(function(response) {
      $rootScope.data2 = response;
      console.log("Comp Detail: ", $rootScope.data2.data.length);
    })
    HttpService.getCompDetails2()
      .then(function(response) {
        $rootScope.data4 = response;

        $ionicLoading.hide();
})


  $scope.login = function() {
    LoginService.loginUser($rootScope.data1, $scope.data.username, $scope.data.password).success(function(data) {
      $state.go('side-menu21.ginesysLicenseManager');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    })
  }


})

.controller('ginesysLicenseManagerCtrl', function($rootScope, $scope, Backand, HttpService, $ionicLoading, $state) {

  $ionicLoading.show({
    template: "Loading..."
  });
  $scope.comp = $rootScope.data2;
  $ionicLoading.hide();
})




.controller('companyDetailsCtrl', function($rootScope, $scope, Backand, $ionicLoading, $state, HttpService) {
  $ionicLoading.show({
    template: "Loading..."
  });
  $scope.comp = $rootScope.data2;
  for (var i = 0; i < $scope.comp.data.length; i++) {
    if ($scope.comp.data[i].SerialNumber == $state.params.companyId) {
      $scope.name = $scope.comp.data[i].CustomerName;
      $scope.BAC = $scope.comp.data[i].BACode;
      $scope.SNO = $scope.comp.data[i].SerialNumber;
      break;
    }
  }

  HttpService.getCompDetails($state.params.companyId)
    .then(function(response) {
      $scope.data = response;


for (var i = 0; i < $scope.data.data.length; i++)
{
  if($scope.data.data[i].IsActive=="1"){
  $scope.data.data[i].IsActive = "Yes";
}
else if ($scope.data.data[i].IsActive=="0")
    $scope.data.data[i].IsActive = "No";
  }

$ionicLoading.hide();
    })


})



.controller('licenseKeyFeatureCtrl', function($rootScope, $ionicPopup,$scope, Backand, $ionicLoading, $state, HttpService) {
  //$scope.get;
  $ionicLoading.show({
    template: "Loading..."
  });

$scope.data_g = $rootScope.data4;
$scope.data_h = $rootScope.data2;
var i;
for(i=0; i<$scope.data_g.data.length;i++)
{
  if($scope.data_g.data[i].Id ==$state.params.keyId )
  {
    $scope.MKEY = $scope.data_g.data[i].MachineKey;
    $scope.SNO=$scope.data_g.data[i].SerialNumber;
    $scope.REM = $scope.data_g.data[i].Remarks;
    break;
  }}
var p=i;
  for(var j=0; j<$scope.data_h.data.length; j++)
{
  if($scope.data_h.data[j].SerialNumber == $scope.data_g.data[p].SerialNumber)
  {
    console.log("Comp : ",$scope.data_h.data[j].CustomerName);
    $scope.name = $scope.data_h.data[j].CustomerName;
    $scope.BAC = $scope.data_h.data[j].BACode;
        break;
  }
}


  HttpService.getKeyDetails($state.params.keyId)
    .then(function(response) {
      $scope.data = response;

      for (var i = 0; i < $scope.data.data.length; i++) {
        if($scope.get3($scope.data.data[i].FeatureId)=="0")
  $scope.data.data[i].Count = "N.A.";

        if ($scope.data.data[i].ExpiryDate) {
          var day = $scope.data.data[i].ExpiryDate;
          var month = $scope.data.data[i].ExpiryDate;
          var year = $scope.data.data[i].ExpiryDate;
          day = day.substr(8, 2);
          month = month.substr(5, 2);
          year = year.substr(0, 4);
          $scope.data.data[i].ExpiryDate = day + '/' + month + '/' + year;
        }
        else {
        if($scope.get2($scope.data.data[i].FeatureId)=="0")
        $scope.data.data[i].ExpiryDate = "N.A.";
        else
          $scope.data.data[i].ExpiryDate = "N.P.";
        }

      }
var i;
      for ( i = 0; i < $scope.data.data.length; i++) {
        $scope.set(i);
        if(i==($scope.data.data.length-1))
        $ionicLoading.hide();
}
    })
  $scope.set = function(i) {
    HttpService.getFeatureGeneratedDate($scope.data.data[0].LicenseKeyId, $scope.data.data[i].FeatureId)
      .then(function(response) {
        $scope.dates = response.data;
        $scope.data.data[i].dates = $scope.dates.data[0].GeneratedOn;

        var day = $scope.data.data[i].dates;
        var month = $scope.data.data[i].dates;
        var year = $scope.data.data[i].dates;
        day = day.substr(8, 2);
        month = month.substr(5, 2);
        year = year.substr(0, 4);
        $scope.data.data[i].dates = day + '/' + month + '/' + year;

        })
    };

  $scope.data_f = $rootScope.data3.data;


  $scope.get = function(id) {

    for (var i = 0; i < $scope.data_f.length; i++) {
      if ($scope.data_f[i].Id == id) {
        return $scope.data_f[i].FeatureName;

      }
    }
  };

$scope.get2 = function(id){

  for (var i = 0; i < $scope.data_f.length; i++) {
    if ($scope.data_f[i].Id == id) {
      return $scope.data_f[i].ExpiryApplicable;

    }
  }
};
$scope.get3 = function(id){

  for (var i = 0; i < $scope.data_f.length; i++) {
    if ($scope.data_f[i].Id == id) {
      return $scope.data_f[i].CountApplicable;

    }
  }
};
  $scope.click=function(a,b,i){

          if (($scope.data.data[i].ExpiryDate == "N.A.") && ($scope.data.data[i].Count=="N.A.")) {
      var alertPopup = $ionicPopup.alert({
          title: 'Notification',
        template: 'No History Available!'
      });
        }
      else
      $state.go("side-menu21.featureDetail",{"key":a, "kId":b});
    //  "auctions", {"product": auction.product, "id": auction.id}

  };

})

.controller('licenseKeyTimeCtrl', function($scope) {

})

.controller('featureDetailCtrl', function($rootScope, $scope, Backand, $ionicLoading, $state, HttpService) {
  $ionicLoading.show({
    template: "Loading..."
  });

  $scope.data_k = $rootScope.data4;
  $scope.data_h = $rootScope.data2;
  var i;
  for(i=0; i<$scope.data_k.data.length;i++)
  {
    if($scope.data_k.data[i].Id ==$state.params.key )
    {
      $scope.MKEY = $scope.data_k.data[i].MachineKey;
      $scope.SNO=$scope.data_k.data[i].SerialNumber;
      $scope.REM = $scope.data_k.data[i].Remarks;
      break;
    }}
    var p=i;
      for(var j=0; j<$scope.data_h.data.length; j++)
    {
      if($scope.data_h.data[j].SerialNumber == $scope.data_k.data[p].SerialNumber)
      {
        console.log("Comp : ",$scope.data_h.data[j].CustomerName);
        $scope.name = $scope.data_h.data[j].CustomerName;
        $scope.BAC = $scope.data_h.data[j].BACode;
            break;
      }
    }


HttpService.getKeyFeatureLog($state.params.key, $state.params.kId)
    .then(function(response) {
      $scope.data = response;
      for (var i = 0; i < $scope.data.data.length; i++) {
        for (var j = 0; j < $rootScope.data1.data.length; j++) {
          if ($rootScope.data1.data[j].Id == $scope.data.data[i].GeneratedBy) {
            $scope.data.data[i].UserName = $rootScope.data1.data[j].UserName;
            break;

          }
        }
      }
      $scope.data.data_f = $rootScope.data3.data;
      for (var i = 0; i < $scope.data.data_f.length; i++) {
        if ($scope.data.data_f[i].Id == $scope.data.data[0].FeatureId) {
          $scope.FEATNAME = $scope.data.data_f[i].FeatureName;
        }
      }
      for (var i = 0; i < $scope.data.data.length; i++) {
        if($scope.get3($scope.data.data[i].FeatureId)=="0")
  $scope.data.data[i].Count = "N.A.";

  if ($scope.data.data[i].ExpiryDate) {
          var day = $scope.data.data[i].ExpiryDate;
          var month = $scope.data.data[i].ExpiryDate;
          var year = $scope.data.data[i].ExpiryDate;
          day = day.substr(8, 2);
          month = month.substr(5, 2);
          year = year.substr(0, 4);
          $scope.data.data[i].ExpiryDate = day + '/' + month + '/' + year;
        }
        else {
        if($scope.get($scope.data.data[i].FeatureId)=="0")
        $scope.data.data[i].ExpiryDate = "N.A.";
        else
          $scope.data.data[i].ExpiryDate = "N.P.";
        }}

      for (var i = 0; i < $scope.data.data.length; i++) {
        if ($scope.data.data[i].GeneratedOn) {
          var day = $scope.data.data[i].GeneratedOn;
          var month = $scope.data.data[i].GeneratedOn;
          var year = $scope.data.data[i].GeneratedOn;
          var time = $scope.data.data[i].GeneratedOn;
          day = day.substr(8, 2);
          month = month.substr(5, 2);
          year = year.substr(0, 4);
          time = time.substr(11, 5);
          $scope.data.data[i].GeneratedOn = "Date: " + day + '/' + month + '/' + year + "  Time:           " + time;
          if (i == $scope.data.data.length - 1)
            $ionicLoading.hide();
        } else {
          $scope.data.data[i].GeneratedOn = "N.A.";
        }
      }
    })
  $scope.data_f = $rootScope.data3.data;
    $scope.get = function(id){

      for (var i = 0; i < $scope.data_f.length; i++) {
        if ($scope.data_f[i].Id == id) {
          return $scope.data_f[i].ExpiryApplicable;

        }
      }
    };
    $scope.get3 = function(id){

      for (var i = 0; i < $scope.data_f.length; i++) {
        if ($scope.data_f[i].Id == id) {
          return $scope.data_f[i].CountApplicable;

        }
      }
    };

})
