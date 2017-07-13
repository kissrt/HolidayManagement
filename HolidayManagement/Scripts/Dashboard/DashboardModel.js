function DashboardModel() {
    var _self = this;
    this.teams = [];
    this.selectedTeam = ko.observable();
    this.manageUser = new UserDetailsModel();
    this.users = ko.observableArray(null);
    this.initialize = function (data) {

        var userss = _.map(data.UserList, function (user, index) {
            return new UserDetailsModel(user);
        });

        var teams = _.map(data.TeamList, function (team) {
            return new TeamModel(team);
        });

        _self.users(userss);
        _self.teams = teams;
    }

   
    this.createUser = function (data) {
        //$.ajax({
        //    url: "Account/CreateUser/",
        //    type: "POST",
        //    data: {
        //        firstName: _self.manageUser.firstName,
        //        lastName: _self.manageUser.lastName,
        //        hireDate: _self.manageUser.hireDate,
        //        maxDays: _self.manageUser.maxDays,
        //        teamID: _self.manageUser.teams.id(),
        //        email : _self.manageUser.email
        //    },
        //    dataType:"json",
        //    success: function (data) {
        //        alert("Successfully submitted.")
        //    }
        //});
        $.post("/Account/CreateUser/",
           {
               firstName: _self.manageUser.firstName,
                       lastName: _self.manageUser.lastName,
                       hireDate: _self.manageUser.hireDate,
                       maxDays: _self.manageUser.maxDays,
                       teamID: _self.manageUser.teams.id(),
                       AspnetUsers: {
                           Email: _self.manageUser.email
                       }
           },
        dataType="json",
        success=function (data) {
            alert("Successfully submitted.")
        }
        );
    }

}


function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}