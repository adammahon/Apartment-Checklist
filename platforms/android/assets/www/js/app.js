// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('apartmentChecklist',
    ['ionic',
        'apartmentChecklist.controllers',
        'apartmentChecklist.services',
        'ngStorage'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app',{
                url: '/app',
                abstract: true,
                templateUrl: 'views/app.html',
                controller: 'appCtrl'
            })
            .state('app.main', {
                cache: false,
                url: '/main',
                views:{
                    app:{
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.addApartment', {
                cache: false,
                url: '/addApartmentForm',
                views:{
                    app:{
                        templateUrl: 'views/addApartment.html',
                        controller: 'addApartmentCtrl'
                    }
                }
            })
            .state('app.editApartment', {
                cache: false,
                url: '/editApartmentForm',
                views:{
                    app:{
                        templateUrl: 'views/editApartment.html',
                        controller: 'editApartmentCtrl'
                    }
                }
            })
            .state('app.apartment',{
                cache: false,
                url: '/apartment',
                views:{
                    app:{
                        templateUrl: 'views/apartmentTemplate.html',
                        controller: 'apartmentTemplateCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/main');
    });
