function Dashboard() {
    var _self = this;
    
    this.nextDerviceDateError = ko.observable(false);
    this.currentKmError = ko.observable(false);
    this.nextVisitKmError = ko.observable(false);
    this.owner = new OwnerModel();
    this.errorIndicator = ko.observable(false);
    this.actualIndex=null;
    this.visibleRepaireButtons = ko.observable(true);
    this.title = ko.observable("");
    this.actualCarHistoryes=null;
    this.historyConsol = ko.observable(true);
    this.VIN = ko.observable(null);
    this.Identifier = ko.observable(null);
    this.repaires = ko.observableArray(null);
    this.services = ko.observableArray(null);
    this.initialize = function (data) {
        var services = _.map(data.Services, function (serv, index) {
            return new ServiceModel(serv);
            
        });

       
        _self.services(services);
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
        _self.repaire.serviceDate(data.serviceDate());
    }
    this.setRepaireValues = function (data) {
        _self.repaire.VIN = data.VIN;
        _self.repaire.engineOilChangeAndFilter(data.engineOilChangeAndFilter);
        _self.repaire.airFilter(data.airFilter);
        _self.repaire.pollenFilter(data.pollenFilter);
        _self.repaire.fuelFilter(data.fuelFilter);
        _self.repaire.breakFluid(data.breakFluid);
        _self.repaire.breakDiscAndPads(data.breakDiscAndPads);
        _self.repaire.gearOilOrTransmissionFluid(data.gearOilOrTransmissionFluid);
        _self.repaire.others(data.others);
        _self.repaire.nextVisitKm(data.nextVisitKm);
        _self.repaire.currentKm(data.currentKm);
        _self.repaire.nextServiceDate(data.nextServiceDate);
        
    }
    this.setCarRepairesData = function (data)
    {
        
        var retrievedObject = JSON.parse(localStorage.getItem(data.vin()));
        if (retrievedObject != null)
            _self.setRepaireValues(retrievedObject);
        else
            _self.changevalues(new RepaireModel());

        _self.title("Repaires");
        _self.historyConsol(false);
        _self.visibleRepaireButtons(true);
        carrepairedata = data;
      
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
        
       
        data.errorIndicator(false);
        var retrievedObject = JSON.parse(localStorage.getItem(data.vin()));
        if (retrievedObject != null)
            _self.setRepaireValues(retrievedObject);
        else
            _self.changevalues(new RepaireModel());

      
        if (data.price() <= 0)
            data.errorIndicator(true);
        

        if (data.errorIndicator()==false) {
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
                            Price: data.price,
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
    this.saveRepair = function ()
    {
        var error=false;
        _self.nextDerviceDateError(false);
        _self.currentKmError(false);
        _self.nextVisitKmError(false);
      
        if (_self.repaire.nextServiceDate() == "" || _self.repaire.nextServiceDate() == null) {
            _self.nextDerviceDateError(true);
            error=true;
        }
        else {
            if (Date.parse(_self.repaire.nextServiceDate()) < Date.parse(new Date())) {
                _self.nextDerviceDateError(true);
                error=true;
                    }
             }

        if (_self.repaire.currentKm() > _self.repaire.nextVisitKm())
        {
            _self.currentKmError(true);
            _self.nextVisitKmError(true);
            error = true;
        }

        if (_self.repaire.currentKm() <= 0)
        {
            _self.currentKmError(true);
            error = true;
        }


        if (_self.repaire.nextVisitKm()<=0) {
            _self.nextVisitKmError(true);
            error = true;
        }


        if (error == false) {

        var repaireobject = {
            pollenFilter: _self.repaire.pollenFilter(),
            VIN: carrepairedata.vin,
            airFilter: _self.repaire.airFilter(),
            engineOilChangeAndFilter: _self.repaire.engineOilChangeAndFilter(),
            fuelFilter: _self.repaire.fuelFilter(),
            breakFluid: _self.repaire.breakFluid(),
            breakDiscAndPads: _self.repaire.breakDiscAndPads(),
            gearOilOrTransmissionFluid: _self.repaire.gearOilOrTransmissionFluid(),
            others: _self.repaire.others(),
            nextVisitKm: _self.repaire.nextVisitKm(),
            currentKm: _self.repaire.currentKm(),
            nextServiceDate: _self.repaire.nextServiceDate()
            
        };
            localStorage.setItem(carrepairedata.vin(), JSON.stringify(repaireobject));

        
       
       
            $("#inputRepairesModal").modal("hide");
        }
                
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
        _self.title("Historyes");
        _self.historyConsol(true);
        _self.visibleRepaireButtons(false);
        $("#inputRepairesModal").modal("show");
        _self.actualCarHistoryes = null;
        _self.actualCarHistoryes = data.historyes();
        _self.actualIndex = _self.actualCarHistoryes.length - 1;
        if (_self.actualIndex < 1)
            _self.changevalues(new RepaireModel());
        else

        _self.changevalues(_self.actualCarHistoryes[_self.actualIndex]);


    }
    this.firstHistory=function()
    {
        
        _self.changevalues(_self.actualCarHistoryes[0]);
        _self.actualIndex = 0;
    }
    this.previousHistory = function () {
        if (_self.actualIndex > 0)
            _self.actualIndex--;
        _self.changevalues(_self.actualCarHistoryes[_self.actualIndex]);


    }
    this.nextHistory=function(){
        if (_self.actualIndex < _self.actualCarHistoryes.length - 1)
            _self.actualIndex++;
        _self.changevalues(_self.actualCarHistoryes[_self.actualIndex]);
    }
    this.lastHistory = function () {
        _self.changevalues(_self.actualCarHistoryes[_self.actualCarHistoryes.length-1]);
        _self.actualIndex = _self.actualCarHistoryes.length - 1;
    }
 
}

function InitializeDashboard(data) {
    Dashboard.instance = new Dashboard();

    Dashboard.instance.initialize(data);
    
    ko.applyBindings(Dashboard.instance);
}