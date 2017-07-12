
function UserDetailsModel(data) {

    this.email = ko.observable(null);
    this.firstName = ko.observable(null);
    this.lastName = ko.observable(null);
    this.hireDate = ko.observable(null);
    this.maxDays = ko.observable(null);

    if (data != null) {
        this.email(data.Email);
        this.firstName(data.FirstName);
        this.lastName(data.LastName);
        this.hireDate(data.HireDate);
        this.maxDays(data.MaxDays);
    }
}
