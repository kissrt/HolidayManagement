function MonthDayModel(data) {

    this.day = ko.observable(null);
    this.isFreeDay = ko.observable(null);
    this.nameOfDay = ko.observable(null);
    this.description = ko.observable(null);

    if (data != null) {
        this.day(data.day);
        this.isFreeDay(data.isFreeDay);
        this.nameOfDay(data.nameOfDay);
        this.description(data.description);
    }
}