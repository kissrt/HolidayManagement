﻿
function UserDetailsModel(data) {
    this.id = ko.observable(null);
    this.email = ko.observable(null);
    this.firstName = ko.observable(null);
    this.lastName = ko.observable(null);
    this.hireDate = ko.observable(null);
    this.maxDays = ko.observable(null);
    this.teams = new TeamModel();
    this.UserID = ko.observable(null);

    if (data != null) {
        if (data.AspnetUsers != null)  this.email(data.AspnetUsers.Email); 
        this.firstName(data.FirstName);
        this.lastName(data.LastName);
        this.hireDate(data.HireDate);
        this.maxDays(data.MaxDays);
        this.teams = new TeamModel(data.teams);
        this.roles = new RolesModel(data.roles);
        this.id(data.ID);
        this.UserID(data.UserID);
    }
}
