function ErrorModel() {
    this.vinError = ko.observable(false);
    this.identifierError = ko.observable(false);
    this.ownerPhoneNumberError = ko.observable(false);
    this.ownerFirstNameError = ko.observable(false);
    this.ownerLastNameError = ko.observable(false);
    this.ownerEmailError = ko.observable(false);
    this.setFalse=function()
    {
        this.vinError(false);
        this.identifierError(false);
        this.ownerPhoneNumberError(false);
        this.ownerFirstNameError(false);
        this.ownerLastNameError(false);
        this.ownerEmailError(false);
    }

}
