angular.module('apartmentChecklist.services', [])

    .factory('storedData', function($localStorage){
        var storage = $localStorage;
        if(typeof storage.data == 'undefined'){
            storage.data = [];
        }
        return{
            getAllData: function(){
                return storage.data;
            },
            getData: function(value){
                return storage.data[value];
            },
            setData: function(value){
                var data = value;
                storage.data.push(data);
                this.updateDataIds();
            },
            deleteData: function(value){
                storage.data.splice(value, 1);
                this.updateDataIds();
            },
            deleteAllData: function(){
                storage.data = [];
            },
            updateDataIds: function(){
                var length = storage.data.length;
                for(var i = 0; i < length; i++){
                    storage.data[i].id = i;
                }
            }
        }
    })
    .factory('apartmentId', function(){
        var id;
        return{
            getId: function(){
                return id;
            },
            setId: function(value){
                id = value;
            }
        }
    });