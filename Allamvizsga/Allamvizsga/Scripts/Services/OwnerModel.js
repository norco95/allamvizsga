function OwnerModel(data) {
    this.phoneNumber = ko.observable("");
    this.firstName = ko.observable("");
    this.lastName = ko.observable(null);
    this.email = ko.observable(null);
    if (data != null) {
        this.phoneNumber(data.PhoneNumber);
        this.email(data.Email);
        this.firstName(data.FirsName);
        this.lastName(data.LastName);
    
    }

}