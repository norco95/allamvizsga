﻿function Dashboard() {
    var _self = this;
    this.owner = new OwnerModel();
    this.VIN = ko.observable(null);
    this.Identifier = ko.observable(null);
    this.repaires = ko.observableArray(null);
    this.services = ko.observableArray(null);
    this.initialize = function (data) {
        var services = _.map(data.Services, function (serv, index) {
            return new ServiceModel(serv);
            
        });

       
        this.services(services);
        services.forEach(function (element) {
            var repaire = new RepaireModel();
            repaire.VIN = element.vin;
            _self.repaires.push(repaire);
        });
    }
    this.repaire = new RepaireModel();
    this.historyes = ko.observableArray(null);
    var carrepairedata = null;
    this.changevalues=function(data)
    {
        _self.repaire.VIN=data.VIN;
        _self.repaire.ownerPhoneNumber = data.ownerPhoneNumber;       
        _self.repaire.engineOilChangeAndFilter(data.engineOilChangeAndFilter());
        _self.repaire.airFilter(data.airFilter());
        _self.repaire.pollenFilter(data.pollenFilter());
        _self.repaire.fuelFilter(data.fuelFilter());
        _self.repaire.breakFluid(data.breakFluid());
        _self.repaire.breakDiscAndPads(data.breakDiscAndPads());
        _self.repaire.gearOilOrTransmissionFluid(data.gearOilOrTransmissionFluid());
        _self.repaire.others(data.others());
        _self.repaire.nextVisitKm(data.nextVisitKm());
        _self.repaire.currentKm(data.currentKm());
        _self.repaire.nextServiceDate(data.nextServiceDate());
    }
    this.setCarRepairesData = function (data)
    {
       
        
        carrepairedata = data;
        repaires = _self.repaires();
        repaires.forEach(function (element) {
            if (element.VIN == carrepairedata.vin) {
                _self.changevalues(element)
               
            }
        });
       
       
        var s = _self.repaire;
        $("#inputRepairesModal").modal("show");
       
    }
    this.addCar = function () {  //addCar
        
        $.ajax({
            type: "POST",
            url: "/Service/AddCar/",
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
                        return new ServiceModel(serv);
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
            url: "/Service/EndCar/",
            data: {
                
                BreakFluid: _self.repaire.breakFluid,
                EngineOilChangeAndFilter: _self.repaire.engineOilChangeAndFilter,
                AirFilter: _self.repaire.airFilter,
                PollenFilter: _self.repaire.pollenFilter,
                FuelFilter: _self.repaire.fuelFilter,
                BreakDiscAndPads: _self.repaire.breakDiscAndPads,
                GearOilOrTransmissionFluid: _self.repaire.gearOilOrTransmissionFluid,
                Others: _self.repaire.others,
                NextVisitKm: _self.repaire.nextVisitKm,
                CurentKm: _self.repairecurrentKm,
                NextServiceDate: _self.repaire.nextServiceDate,
                
               
                Service:
                    {
                        ID: data.id
                    }

             },

            success: function (msg) {

                if (msg.success == true) {
                    var services = _.map(msg.newCar, function (serv, index) {
                        return new ServiceModel(serv);
                    });
                    _self.services(services);
                    services.forEach(function (element) {
                        var repaire = new RepaireModel();
                        repaire.VIN = element.vin;
                        _self.repaires.push(repaire);
                    });
                }
            },
            dataType: "json"
        });
    }
    this.saveRepair = function ()
    {
        var i = 0;
        repaires = _self.repaires();
        repaires.forEach(function (element) {
            if(element.VIN==carrepairedata.vin)
            {
                    repaires[i].engineOilChangeAndFilter(_self.repaire.engineOilChangeAndFilter());
                    repaires[i].airFilter(_self.repaire.airFilter());
                    repaires[i].pollenFilter(_self.repaire.pollenFilter());
                    repaires[i].fuelFilter(_self.repaire.fuelFilter());
                    repaires[i].breakFluid(_self.repaire.breakFluid());
                    repaires[i].breakDiscAndPads(_self.repaire.breakDiscAndPads());
                    repaires[i].gearOilOrTransmissionFluid(_self.repaire.gearOilOrTransmissionFluid());
                    repaires[i].others (_self.repaire.others());
                    repaires[i].nextVisitKm(_self.repaire.nextVisitKm());
                    repaires[i].currentKm ( _self.repaire.currentKm());
                    repaires[i].nextServiceDate (_self.repaire.nextServiceDate());     
            }
            i++;
        });
        _self.repaires(repaires);
        $("#inputRepairesModal").modal("hide");        
    }
    this.deletCar = function (data)
    {
        if (confirm("Are you sure you want to delet?") == true) {
            
            $.ajax({
                type: "POST",
                url: "/Service/DeletCar/",
                data: {
                    Service:
                        {
                            ID: data.id
                        }

                },

                success: function (msg) {

                    if (msg.success == true) {
                        var services = _.map(msg.newCar, function (serv, index) {
                            return new ServiceModel(serv);
                        });
                        _self.services(services);
                        services.forEach(function (element) {
                            var repaire = new RepaireModel();
                            repaire.VIN = element.vin;
                            _self.repaires.push(repaire);
                        });
                    }
                },
                dataType: "json"
            });
        } 
    }
    this.history=function(data)
    {
        var s = _self.services.historyes();
    }
   // this.history=function(data)
    //{
    //    $.ajax({
    //        type: "POST",
    //        url: "/Service/History/",
    //        data: {
                
    //                    CarVIN: data.vin()
                    
                
    //        },

    //        success: function (msg) {

    //            if (msg.success == true) {
    //                var historyes = _.map(msg.historyes, function (his, index) {
    //                    return new RepaireModel(his);
    //                });
    //                _self.historyes(historyes);
                   
    //               }
    //        },
    //        dataType: "json"
    //    });
    //}



}
function InitializeDashboard(data) {
    Dashboard.instance = new Dashboard();

    Dashboard.instance.initialize(data);
    
    ko.applyBindings(Dashboard.instance);
}