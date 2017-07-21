function BankHolidayModel(data) {

    this.ID = ko.observable(null);
    this.Description = ko.observable(null);
    this.Day = ko.observable(null);
    this.Month = ko.observable(null);
   

    if (data != null) {
        this.ID(data.ID);
        this.Description(data.Description);
        this.Day(data.Day);
        this.Month(data.Month);
    }
}
