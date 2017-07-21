
function VacationModel(data) {

    this.StateId = ko.observable(null);
    this.UserId = ko.observable(null);
    this.StartDate = ko.observable(null);
    this.EndDate = ko.observable(null);
    this.Date = ko.observable(null);
    this.State = ko.observable(null);
   

    if (data != null) {
        this.StateId(data.StateId);
        this.UserId(data.UserId);
        this.StartDate(data.StartDate);
        this.EndDate(data.EndDate);
        this.Date(data.Date);
        this.State(data.State);
    }
}