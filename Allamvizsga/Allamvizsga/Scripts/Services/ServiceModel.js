function ServiceModel() {
    var _self = this;
    this.owner = new OwnerModel();
    this.VIN = ko.observable(null);
    this.Identifier = ko.observable(null);

    this.cars = new CarsModels();
    this.services = ko.observableArray(null);
    this.initialize = function (data) {
        var services = _.map(data.Services, function (serv, index) {
            return new ServicesModels(serv);
        });

        this.services (services);
    }

    var carrepairesdata = null;
    this.setCarRepairesData=function(data)
    {
        carrepairesdata = data;
    }
    this.addCar = function () {  //addCar
        
        $.ajax({
            type: "POST",
            url: "/Services/AddCar/",
            data: {
                VIN: _self.VIN,
                Identifier: _self.Identifier,            
                Owner: {
                    FirstName: _self.owner.firstName(),
                    LastName: _self.owner.lastName(),
                    Email: _self.owner.email(),
                    PhoneNumber: _self.owner.phoneNumber()
                }
                


            },



            success: function (msg) {

                if (msg.success == true) {
                    
             
                    var services = _.map(msg.newCar, function (serv, index) {
                        return new ServicesModels(serv);
                    });
                    _self.services(services);
                    $("#inputCarModal").modal("hide");
                }
            },
            dataType: "json"
        });

    }
    this.endedCar = function (data) {
        $.ajax({
            type: "POST",
            url: "/Services/EndCar/",
            data: {
                ID: data.id
             },

            success: function (msg) {

                if (msg.success == true) {


                    var services = _.map(msg.newCar, function (serv, index) {
                        return new ServicesModels(serv);
                    });
                    _self.services(services);
                    
                }
            },
            dataType: "json"
        });

    }
    this.saveRepair=function()
    {
        
      
        $.ajax({
            type: "POST",
            url: "/Services/CarRepairesAdd/",
            data: {
                EngineOilAndFilter:_self.cars.engineOilChangeAndFilter(),
                CarVIN: carrepairesdata.vin,
                OwnerPhoneNUmber: carrepairesdata.owner.phoneNumber,
                AirFilter: _self.cars.airFilter(),
                PollenFilter: _self.cars.pollenFilter(),
                FuelFilter: _self.cars.fuelFilter(),
                BreakFluid: _self.cars.breakFluid(),
                BreakDiscAndPads: _self.cars.breakDiscAndPads(),
                GearOilOrTransmissionFluid: _self.cars.gearOilOrTransmissionFluid(),
                Others: _self.cars.others,
                CurentKm: _self.cars.currentKm,
                NextKmVisit: _self.cars.nextVisitKm,
                NextServiceDate: _self.cars.nextServiceDate,

                
               },



            success: function (msg) {

                if (msg.success == true) {


                }
            },
            dataType: "json"
        });

    }

}

  



function InitializeServiceModel(data) {
    ServiceModel.instance = new ServiceModel();

    ServiceModel.instance.initialize(data);

    ko.applyBindings(ServiceModel.instance);
}