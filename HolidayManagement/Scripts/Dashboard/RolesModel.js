function RolesModel(data) {

    this.Id = ko.observable(null);
    this.Name = ko.observable(null);

    if (data != null) {
        this.Id(data.Id);
        this.Name(data.Name);
    }
}