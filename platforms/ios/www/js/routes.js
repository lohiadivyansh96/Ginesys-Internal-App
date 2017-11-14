angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,BackandProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  BackandProvider.setAppName('ginesyslicensemanager');
  BackandProvider.setSignUpToken('417cb208-90d7-4db6-aa86-235921422c90');
  BackandProvider.setAnonymousToken('908e39d1-d4b7-42c3-a8da-96fff0ba7db3');

  $stateProvider

      .state('side-menu21', {
    url: '/home',
    templateUrl: 'templates/side-menu21.html',
    abstract:true
  })

  .state('side-menu21.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('side-menu21.ginesysLicenseManager', {
    url: '/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ginesysLicenseManager.html',
        controller: 'ginesysLicenseManagerCtrl'
      }
    }
  })

  .state('side-menu21.companyDetails', {
    url: '/company/:companyId',
    views: {
      'side-menu21': {
        templateUrl: 'templates/companyDetails.html',
        controller: 'companyDetailsCtrl'
      }
    }
  })

  .state('side-menu21.licenseKeyFeature', {
    url: '/keyf/:keyId',
    views: {
      'side-menu21': {
        templateUrl: 'templates/licenseKeyFeature.html',
        controller: 'licenseKeyFeatureCtrl'
      }
    }
  })

  .state('side-menu21.licenseKeyTime', {
    url: '/keyt',
    views: {
      'side-menu21': {
        templateUrl: 'templates/licenseKeyTime.html',
        controller: 'licenseKeyTimeCtrl'
      }
    }
  })

  .state('side-menu21.featureDetail', {
    url: '/core/:key/:kId',
    views: {
      'side-menu21': {
        templateUrl: 'templates/featureDetail.html',
        controller: 'featureDetailCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/home/login')



});
