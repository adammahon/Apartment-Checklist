angular.module('apartmentChecklist.controllers', [])

    .controller('appCtrl', function($scope, $state){
        $scope.visible = false;
        $scope.deleteToggle = function(){
            $scope.visible = !$scope.visible;
        };
        $scope.goToState = function(stateName){
            if($scope.visible == false){
                $state.go(stateName);
            }
        };
    })
    .controller('MainCtrl', function($scope, $state, storedData, apartmentId) {
        $scope.$watch('$viewContentLoaded', function(){
            $scope.data = storedData.getAllData();
        });
        $scope.deleteItem = function(value){
            storedData.deleteData(value);
        };
        $scope.deleteAll = function(){
            storedData.deleteAllData();
            $state.go($state.current, {}, {reload: true});
        };
        $scope.getItem = function(value){
            apartmentId.setId(value);
            $state.go('app.apartment');
        };

        //TODO: Add Confirm on Delete
        /*$scope.showConfirm = function(value) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete'
                //template: 'Are you sure you want to delete this item?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure' + value);
                } else {
                    console.log('You are not sure' + value);
                }
            });
        };*/
    })
    .controller('addApartmentCtrl', function($scope, $state, storedData) {
        var storeData = storedData;
        $scope.add = {};
        $scope.addApartmentSubmit = function(){
            if($scope.add){

                //TODO: remove multiple spaces between words
                $scope.add.programmableName = $scope.add.name.trim().replace(' ', '').toLowerCase();
                storeData.setData($scope.add);
                $state.go('app.main');
            }
        };
    })
    .controller('apartmentTemplateCtrl', function($scope, storedData, apartmentId){
        var data = storedData;
        var id = apartmentId;
        var aptId = id.getId();

        $scope.data = data.getData(aptId);
    });