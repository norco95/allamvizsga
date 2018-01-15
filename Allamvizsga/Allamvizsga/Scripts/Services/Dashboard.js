function Dashboard() {
    var _self = this;
    this.owner = new OwnerModel();
    this.VIN = ko.observable(null);
    this.Identifier = ko.observable(null);
    this.repaires = ko.observableArray(null);
    this.seged = ko.observable(null);
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
    this.cars = ko.observable(null);
    var carrepairesdata = null;

    this.setCarRepairesData = function (data)
    {
        
        carrepairesdata = data;
        repaires = _self.repaires();
        repaires.forEach(function (element) {
            if (element.VIN == carrepairesdata.vin) {
               
                this.cars=element;
               

            }

        });
       
        
      
        $("#inputRepairesModal").modal("show");
        
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
            url: "/Services/EndCar/",
            data: {
                
                BreakFluid: _self.cars.breakFluid,
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
        repaires = _self.repaires();
        repaires.forEach(function (element) {
            if(element.VIN==carrepairesdata.vin)
            {
                _self.repaires.replace(element,_self.cars);
            }
        });
        $("#inputRepairesModal").modal("hide");        
    }  

}

  
function InitializeDashboard(data) {
    Dashboard.instance = new Dashboard();

    Dashboard.instance.initialize(data);
    
    ko.applyBindings(Dashboard.instance);
}