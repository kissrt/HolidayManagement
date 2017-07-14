function DashboardModel() {
    var _self = this;
    this.teams = [];
    this.selectedTeam = ko.observable();
    this.manageUser = new UserDetailsModel();
    this.users = ko.observableArray(null);
    this.errors = ko.observableArray(null);
    this.deleteUserAdress = ko.observable(null);
  
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
           },function (data) {

               if (data.successed == false) {
                   _self.errors = data.Message;
                   $('#err').html(_self.errors);
               }
               else {
                   _self.deleteUserAdress();
                   $('#myModal').modal('hide');
                   alert("Registration succeded");
               }
           },
               "json"
        );
    }

    this.updateUser = function (data) {
        _self.manageUser.userID(data.id());
        _self.manageUser.firstName(data.firstName());
        _self.manageUser.lastName(data.lastName());
        _self.manageUser.hireDate(data.hireDate());
        _self.manageUser.maxDays(data.maxDays());
        _self.manageUser.email(data.email());
        _self.manageUser.UserID(data.UserID());
        
    }

    this.editUser = function (data) {
        $.post("/Account/EditUser/",
           {
               firstName: _self.manageUser.firstName,
               lastName: _self.manageUser.lastName,
               hireDate: _self.manageUser.hireDate,
               maxDays: _self.manageUser.maxDays,
               teamID: _self.manageUser.teams.id(),
               UserID: _self.manageUser.UserID,
               AspnetUsers: {
                   Email: _self.manageUser.email
               }
           }, function (data) {
            }, "json"
        );
    }
    
    this.deleteUserAdress = function (data) {
        _self.manageUser.UserID(null);
        _self.manageUser.firstName(null);
        _self.manageUser.lastName(null);
        _self.manageUser.hireDate(null);
        _self.manageUser.maxDays(null);
        _self.manageUser.email(null);
    }
}


function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}



//$.ajax({
//    url: "Account/CreateUser/",
//    type: "POST",
//    data: {
//        firstName: _self.manageUser.firstName,
//        lastName: _self.manageUser.lastName,
//        hireDate: _self.manageUser.hireDate,
//        maxDays: _self.manageUser.maxDays,
//        teamID: _self.manageUser.teams.id(),
//        AspnetUsers: {
//            Email: _self.manageUser.email
//        }
//    },
//    dataType:"json",
//    success: function (data) {
//        alert("Successfully submitted.")
//    }
//});