function ServicesModels(data) {
    this.id = ko.observable(null);
    this.vin= ko.observable(null);
    this.owner=null;
    this.identifier = ko.observable(null);
    this.serviceDate = ko.observable(null);
    this.price = ko.observable(null);
    this.actualKm = ko.observable(null);
    this.flag = ko.observable(null);
    this.serviceId = ko.observable(null);
   if (data != null) {

        this.id(data.ID)
        this.vin(data.VIN);
        this.owner=new OwnerModel(data.Owner);
        this.identifier(data.Identifier);
        this.serviceDate(data.ServiceDate);
        this.price(data.Price);
        this.actualKm(data.ActualKm);
        this.flag(data.Flag);
        this.serviceId(data.ServiceId);
    }
    
 }