angular.module('apartmentChecklist.controllers', [])

    .controller('appCtrl', function($scope, $state){
        $scope.visible = false;
        $scope.deleteToggle = function(){
            $scope.visible = !$scope.visible;
            if($scope.visible){
                $scope.classToggle = 'button-assertive'
            }
            else{
                $scope.classToggle = '';
            }
        };
        $scope.goToState = function(stateName){
            if($scope.visible == false){
                $state.go(stateName);
            }
        };
    })
    .controller('MainCtrl', function($scope, $state, $ionicPopup, storedData, apartmentId) {
        $scope.$watch('$viewContentLoaded', function(){
            $scope.data = storedData.getAllData();
        });
        $scope.deleteItem = function(value){
            storedData.deleteData(value);
        };
        $scope.deleteAll = function(){
            storedData.deleteAllData();
        };
        $scope.getItem = function(value){
            apartmentId.setId(value);
            if($scope.visible == false){
                $state.go('app.apartment');
            }
        };

        $scope.showConfirm = function(idValue, deleteType) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Do you want to delete this item?',
                cssClass: 'confirm-popup',
                cancelText: 'Cancel',
                okText: 'OK',
                okType: 'button-balanced'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    if(deleteType){
                        storedData.deleteAllData();
                        $state.go($state.current, {}, {reload: true});
                    }
                    else{
                        storedData.deleteData(idValue);
                    }
                }
            });
        };
    })
    .controller('addApartmentCtrl', function($scope, $state, storedData, ratingData) {
        var storedData = storedData;
        var ratingData = ratingData;
        $scope.add = {
            name: '',
            phone: '',
            address: '',
            city: '',
            bedroom: 0,
            bathroom: 0,
            sqft: '',
            lease: 0,
            applicationFee: '',
            securtityDeposit: '',
            rent: '',
            utilities: {
                gas: false,
                water: false,
                sewage: false,
                electric: false,
                trash: false,
                cable: false,
                internet: false
            },
            apartmentFeatures: {
                alarm: false,
                entry: false,
                patioBalcony: false,
                storage: false,
                smoke: false,
                monoxide: false,
                window: false,
                floor: '',
                wall: 0,
                closet: 0
            },
            appliances: {
                washer: false,
                dryer: false,
                refrigerator: false,
                stove: false,
                dishwasher: false,
                microwave: false,
                sinkGarbage: false
            },
            community: {
                emergencyExit: false,
                pet: false,
                package: false,
                emergencyMaintenance: false,
                laundry: false,
                noise: 0
            },
            work: '',
            comment: '',
            rating: {
                wall: '',
                closet: '',
                noise: ''
            }
        };

        $scope.updateRating = function(numericalValue, ratingValue){
            $scope.add.rating[ratingValue] = ratingData.rating(numericalValue);
        };

        $scope.addApartmentSubmit = function(){
            if($scope.add){
                $scope.add.programmableName = $scope.add.name.trim().replace(/\s+/g, '').toLowerCase();
                storedData.setData($scope.add);
                $state.go('app.main');
            }
        };
    })
    .controller('apartmentTemplateCtrl', function($scope, storedData, apartmentId){
        var data = storedData;
        var id = apartmentId;
        var aptId = id.getId();

        $scope.$watch('$viewContentLoaded', function(){
            $scope.data = data.getData(aptId);
        });
    })
    .controller('editApartmentCtrl', function($scope, $state, $ionicHistory, storedData, apartmentId){
        var id = apartmentId;
        var aptId = id.getId();
        var data = storedData.getData(aptId);

        $scope.edit = {
            id: data.id,
            name: data.name,
            programmableName: data.programmableName,
            phone: data.phone,
            address: data.address,
            city: data.city,
            bedroom: data.bedroom,
            bathroom: data.bathroom,
            sqft: data.sqft,
            lease: data.lease,
            applicationFee: data.applicationFee,
            securityDeposit: data.securityDeposit,
            rent: data.rent,
            utilities: {
                gas: data.utilities.gas,
                water: data.utilities.water,
                sewage: data.utilities.sewage,
                electric: data.utilities.electric,
                trash: data.utilities.trash,
                cable: data.utilities.cable,
                internet: data.utilities.internet
            },
            apartmentFeatures: {
                alarm: data.apartmentFeatures.alarm,
                entry: data.apartmentFeatures.entry,
                patioBalcony: data.apartmentFeatures.patioBalcony,
                storage: data.apartmentFeatures.storage,
                smoke: data.apartmentFeatures.smoke,
                monoxide: data.apartmentFeatures.monoxide,
                window: data.apartmentFeatures.window,
                floor: data.apartmentFeatures.floor,
                wall: data.apartmentFeatures.wall,
                closet: data.apartmentFeatures.closet
            },
            appliances: {
                washer: data.appliances.washer,
                dryer: data.appliances.dryer,
                refrigerator: data.appliances.refrigerator,
                stove: data.appliances.stove,
                dishwasher: data.appliances.dishwasher,
                microwave: data.appliances.microwave,
                sinkGarbage: data.appliances.sinkGarbage
            },
            community: {
                emergencyExit: data.community.emergencyExit,
                pet: data.community.pet,
                package: data.community.package,
                emergencyMaintenance: data.community.emergencyMaintenance,
                laundry: data.community.laundry,
                noise: data.community.noise
            },
            work: data.work,
            comment: data.comment
        };

        $scope.editApartmentSubmit = function(value){
            console.log(value);
            if($scope.edit){
                console.log($scope.edit.name);
                $scope.edit.programmableName = $scope.edit.name.trim().replace(/\s+/g, '').toLowerCase();
                storedData.editData(value, $scope.edit);
                $ionicHistory.goBack();
            }
        };
    });