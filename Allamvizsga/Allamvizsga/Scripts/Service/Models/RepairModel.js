﻿function RepairModel(data) {
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
    this.error = ko.observable(true);

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
