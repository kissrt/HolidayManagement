function TeamModel(data) {

    this.id = ko.observable(0);
    this.name = ko.observable(null);
   
    if (data != null) {
        this.id(data.ID);
        this.name (data.Description);
    }
}