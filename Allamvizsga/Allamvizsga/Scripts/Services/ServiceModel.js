function ServiceModel(data) {
    this.id = ko.observable(null);
    this.vin= ko.observable(null);
    this.owner=null;
    this.identifier = ko.observable(null);
    this.serviceDate = ko.observable(null);
    this.price = ko.observable(null);
    this.actualKm = ko.observable(null);
    this.flag = ko.observable(null);
    this.serviceId = ko.observable(null);
    this.historyes = ko.observableArray(null);
    
    
   if (data != null) {

       var historyes = _.map(data.Car, function (history, index) {
           return new RepaireModel(history);

       });


        this.historyes(historyes);
        this.id(data.ID)
        this.vin(data.VIN);
        this.owner = new OwnerModel(data.Owner);
        this.identifier(data.Identifier);
        this.serviceDate(data.ServiceDate);
        this.price(data.Price);
        this.actualKm(data.ActualKm);
        this.flag(data.Flag);
        this.serviceId(data.ServiceId);
    }
    
 }