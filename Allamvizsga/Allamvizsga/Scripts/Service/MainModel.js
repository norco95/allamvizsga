function MainModel() {
    var _self = this;
    this.inputCarError = (new ErrorModel());
    this.getVin = ko.observable(null);
    this.result = ko.observable(false);
    this.nextDerviceDateError = ko.observable(false);
    this.currentKmError = ko.observable(false);
    this.nextVisitKmError = ko.observable(false);
    this.owner = new OwnerModel();
    this.errorIndicator = ko.observable(false);
    this.actualIndex=null;
    this.visibleRepairButtons = ko.observable(true);
    this.title = ko.observable("");
    this.actualCarHistories=null;
    this.historyConsol = ko.observable(true);
    this.VIN = ko.observable(null);
    this.Identifier = ko.observable(null);
    this.repairs = ko.observableArray(null);
    this.services = ko.observableArray(null);
    this.initialize = function (data) {
        var services = _.map(data.Services, function (serv, index) {
            return new ServiceModel(serv);
            
        });

       
        _self.services(services);
        services.forEach(function (element) {
            var repair = new RepairModel();
            repair.VIN = element.vin;
            _self.repairs.push(repair);
        });
    }
    this.repair = new RepairModel();
    this.histories = ko.observableArray(null);
    var carrepairdata = null;
    this.changevalues=function(data)
    {
  
              
        _self.repair.engineOilChangeAndFilter(data.engineOilChangeAndFilter());
        _self.repair.airFilter(data.airFilter());
        _self.repair.pollenFilter(data.pollenFilter());
        _self.repair.fuelFilter(data.fuelFilter());
        _self.repair.breakFluid(data.breakFluid());
        _self.repair.breakDiscAndPads(data.breakDiscAndPads());
        _self.repair.gearOilOrTransmissionFluid(data.gearOilOrTransmissionFluid());
        _self.repair.others(data.others());
        _self.repair.nextVisitKm(data.nextVisitKm());
        _self.repair.currentKm(data.currentKm());
        _self.repair.nextServiceDate(data.nextServiceDate());
        _self.repair.serviceDate(data.serviceDate());
    }
    this.setRepairValues = function (data) {
        _self.repair.VIN = data.VIN;
        _self.repair.engineOilChangeAndFilter(data.engineOilChangeAndFilter);
        _self.repair.airFilter(data.airFilter);
        _self.repair.pollenFilter(data.pollenFilter);
        _self.repair.fuelFilter(data.fuelFilter);
        _self.repair.breakFluid(data.breakFluid);
        _self.repair.breakDiscAndPads(data.breakDiscAndPads);
        _self.repair.gearOilOrTransmissionFluid(data.gearOilOrTransmissionFluid);
        _self.repair.others(data.others);
        _self.repair.nextVisitKm(data.nextVisitKm);
        _self.repair.currentKm(data.currentKm);
        _self.repair.nextServiceDate(data.nextServiceDate);
        _self.repair.error(data.error);
        
    }
    this.setCarRepairsData = function (data)
    {
        
        var retrievedObject = JSON.parse(localStorage.getItem(data.vin()));
        if (retrievedObject != null)
            _self.setRepairValues(retrievedObject);
        else
            _self.changevalues(new RepairModel());

        _self.title("Repair");
        _self.historyConsol(false);
        _self.visibleRepairButtons(true);
        carrepairdata = data;
      
        $("#inputRepairsModal").modal("show");
       
    }
    this.addCar = function ()
    {
       
        var error = false;
        var vin ="";
        if (_self.VIN() != null) {
            vin = _self.VIN();
        }
        if (vin.length<17) {
            _self.inputCarError.vinError(true);
            error = true;
        }
        var services = _self.services();
        services.forEach(function (element) {
            if (element.vin() == vin) {
                _self.inputCarError.vinError(true);
                error = true;
            }
        });
       
        if (_self.Identifier == null || _self.Identifier=="") {
            _self.inputCarError.identifierError(true);
            error = true;
        }

        if (_self.owner.firstName() == null || _self.owner.firstName()=="") {
            _self.inputCarError.ownerFirstNameError(true);
            error = true;
        }
        if (_self.owner.lastName() == null || _self.owner.lastName()=="") {
            _self.inputCarError.ownerLastNameError(true);
            error = true;
        }
        if (_self.owner.email() == null || _self.owner.email() == "") {
            _self.inputCarError.ownerEmailError(true);
            error = true;
        }
        else
            if (validateEmail(_self.owner.email()) == false)
            {
                _self.inputCarError.ownerEmailError(true);
                error = true;
            }
        if (_self.owner.phoneNumber()== null || _self.owner.phoneNumber()== "") {
            _self.inputCarError.ownerPhoneNumberError(true);
            error = true;
        }

        if (error == false) {
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
    }
    this.inputCar=function()
    {
        
        _self.Identifier(null);
        _self.VIN (null);
        _self.owner.phoneNumber(null);
        _self.owner.email(null);
        _self.owner.firstName(null);
        _self.owner.lastName(null);

    }
    this.endedCar = function (data) {
        
       
        var error = false;
       
        data.errorIndicator(false);
        var retrievedObject = JSON.parse(localStorage.getItem(data.vin()));
        if (retrievedObject != null)
            _self.setRepairValues(retrievedObject);
        else
            _self.changevalues(new RepairModel());

      
        if (data.price() <= 0) {
            data.priceError(true);
            error = true;
        }
        if (_self.repair.error() == true)
        {
            data.errorIndicator(true);
            error = true;;
        }

        if (error==false) {
            $.ajax({
                type: "POST",
                url: "/Service/EndCar/",
                data: {

                    BreakFluid: _self.repair.breakFluid,
                    EngineOilAndFilter: _self.repair.engineOilChangeAndFilter,
                    AirFilter: _self.repair.airFilter,
                    PollenFilter: _self.repair.pollenFilter,
                    FuelFilter: _self.repair.fuelFilter,
                    BreakDiscAndPads: _self.repair.breakDiscAndPads,
                    GearOilOrTransmissionFluid: _self.repair.gearOilOrTransmissionFluid,
                    Others: _self.repair.others,
                    NextKMVisit: _self.repair.nextVisitKm,
                    CurentKm: _self.repair.currentKm,
                    NextServiceDate: _self.repair.nextServiceDate,


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
                            var repair = new RepairModel();
                            repair.VIN = element.vin;
                            _self.repair.push(repair);
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
      
        if (_self.repair.nextServiceDate() == "" || _self.repair.nextServiceDate() == null) {
            _self.nextDerviceDateError(true);
            error=true;
        }
        else {
            if (Date.parse(_self.repair.nextServiceDate()) < Date.parse(new Date())) {
                _self.nextDerviceDateError(true);
                error=true;
                    }
             }

        if (_self.repair.currentKm() > _self.repair.nextVisitKm())
        {
            _self.currentKmError(true);
            _self.nextVisitKmError(true);
            error = true;
        }

        if (_self.repair.currentKm() <= 0)
        {
            _self.currentKmError(true);
            error = true;
        }


        if (_self.repair.nextVisitKm()<=0) {
            _self.nextVisitKmError(true);
            error = true;
        }


        if (error == false) {

            _self.repair.error(false);
            var repairobject = {
                pollenFilter: _self.repair.pollenFilter(),
                VIN: carrepairdata.vin,
                airFilter: _self.repair.airFilter(),
                engineOilChangeAndFilter: _self.repair.engineOilChangeAndFilter(),
                fuelFilter: _self.repair.fuelFilter(),
                breakFluid: _self.repair.breakFluid(),
                breakDiscAndPads: _self.repair.breakDiscAndPads(),
                gearOilOrTransmissionFluid: _self.repair.gearOilOrTransmissionFluid(),
                others: _self.repair.others(),
                nextVisitKm: _self.repair.nextVisitKm(),
                currentKm: _self.repair.currentKm(),
                nextServiceDate: _self.repair.nextServiceDate(),
                error: _self.repair.error()
            
        };
            localStorage.setItem(carrepairdata.vin(), JSON.stringify(repairobject));

        
       
       
            $("#inputRepairsModal").modal("hide");
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
                            var repair = new RepairModel();
                            repair.VIN = element.vin;
                            _self.repairs.push(repair);
                        });
                    }
                },
                dataType: "json"
            });
        } 
    }
    this.history=function(data)
    {
        _self.title("Histores");
        _self.historyConsol(true);
        _self.visibleRepairButtons(false);
        $("#inputRepairsModal").modal("show");
        _self.actualCarHistories = null;
        _self.actualCarHistories = data.histories();
        _self.actualIndex = _self.actualCarHistories.length - 1;
        if (_self.actualIndex < 1)
            _self.changevalues(new RepairModel());
        else

        _self.changevalues(_self.actualCarHistories[_self.actualIndex]);


    }
    this.firstHistory=function()
    {
        
        _self.changevalues(_self.actualCarHistories[0]);
        _self.actualIndex = 0;
    }
    this.previousHistory = function () {
        if (_self.actualIndex > 0)
            _self.actualIndex--;
        _self.changevalues(_self.actualCarHistories[_self.actualIndex]);


    }
    this.nextHistory=function(){
        if (_self.actualIndex < _self.actualCarHistories.length - 1)
            _self.actualIndex++;
        _self.changevalues(_self.actualCarHistories[_self.actualIndex]);
    }
    this.lastHistory = function () {
        _self.changevalues(_self.actualCarHistories[_self.actualCarHistories.length-1]);
        _self.actualIndex = _self.actualCarHistories.length - 1;
    }
    this.getHistorybyVIN=function()
    {
    //    $.ajax({
    //        type: "POST",
    //        url: "/Service/GetHistoryByVin/",
    //        data: {
        
    //            VIN: _self.getVin
                        
    //        },
    //        success: function (msg) {
    //            if(msg.success==true)
    //            {
                   

    //            }

              
                
    //        },
    //       dataType: "json"
    //});
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

function InitializeMainModel(data) {
    MainModel.instance = new MainModel();

    MainModel.instance.initialize(data);
    
    ko.applyBindings(MainModel.instance);
}