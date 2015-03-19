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
                storage.data.push(value);
                this.updateDataIds();
            },
            editData: function(idValue, dataValue){
                storage.data[idValue] = dataValue;
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
    })
    .factory('ratingData', function(){
        return{
            rating: function(value){
                if(value <= 4){
                    return 'Very Poor';
                }
                else if(4 < value && 8 >= value){
                    return 'Poor';
                }
                else if(8 < value && 12 >= value){
                    return 'Neutral';
                }
                else if(12 < value && 16 >= value){
                    return 'Good';
                }
                else if(16 < value && 20 >= value){
                    return 'Very Good';
                }
                else{
                    return 'Neutral';
                }
            }
        }
    });