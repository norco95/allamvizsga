function RepaireModel(data) {
    this.VIN = ko.observable(null);
    this.ownerPhoneNumber = ko.observable(null);
    this.engineOilChangeAndFilter = ko.observable(false);
    this.airFilter = ko.observable(false);
    this.pollenFilter = ko.observable(false);
    this.fuelFilter = ko.observable(false);
    this.breakFluid = ko.observable(false);
    this.breakDiscAndPads = ko.observable(false);
    this.gearOilOrTransmissionFluid = ko.observable(false);
    this.others = ko.observable("");
    this.currentKm = ko.observable("");
    this.nextVisitKm = ko.observable("");
    this.serviceDate = ko.observable(null);
    this.nextServiceDate = ko.observable(null);
    if (data != null) {
        this.engineOilChangeAndFilter(data.EngineOilAndFilter);
        this.airFilter(data.AirFilter);
        this.pollenFilter(data.PollenFilter);
        this.fuelFilter(data.FuelFilter);
        this.breakFluid(data.BreakFluid);
        this.breakDiscAndPads(data.BreakDiscAndPAds);
        this.gearOilOrTransmissionFluid(data.GearOilOrTransmissionFluid);
        this.others(data.Others);
        this.nextVisitKm(data.NextKmVisit);
        this.currentKm(data.CurentKm)
        this.nextServiceDate(convertToFormatJs(data.NextServiceDate));
        this.serviceDate(convertToFormatJs(data.Servicedate));
    }


}
convertToFormatJs = function (data) {

    var today = new Date();
    today.setTime(parseInt(data.substr(6)));
  
    var dd = today.getDate();
    var mm = today.getMonth() + 1; 

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;

}