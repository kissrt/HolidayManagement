function DashboardModel() {
    var _self = this;
    this.teams = [];
    this.selectedTeam = ko.observable();
    this.manageUser = new UserDetailsModel();
    this.users = ko.observableArray(null);
    this.errors = ko.observableArray(null);
    this.deleteUserAdress = ko.observable(null);
    this.vacation = new VacationModel();
    this.roleId = ko.observable(null);
    this.roles = [];
    this.role = new RolesModel();
    this.bankHolidays = ko.observableArray(null);
    this.vacations = ko.observableArray(null);
    this.monthDays = ko.observableArray(null);
    this.monthName = ko.observableArray(null);

    this.month = ko.observable(null);
    this.year = ko.observable(null);
    
    this.monthL = new Array();
    this.monthL[0] = 'January';
    this.monthL[1]= 'February';
    this.monthL[2] = 'March';
    this.monthL[3] = 'April';
    this.monthL[4] = 'May';
    this.monthL[5] = 'June';
    this.monthL[6] = 'July';
    this.monthL[7] = 'August';
    this.monthL[8]= 'September';
    this.monthL[9] = 'October';
    this.monthL[10] = 'November';
    this.monthL[11] = 'December';


    this.initialize = function (data) {

        var userss = _.map(data.UserList, function (user, index) {
            return new UserDetailsModel(user);
        });
        
        var rolee = _.map(data.Roles, function (role) {
            return new RolesModel(role);
        });

        var teams = _.map(data.TeamList, function (team) {
            return new TeamModel(team);
        });
        
        var bankHoliday = _.map(data.Calendar.BankHolidays, function (bankHolidays) {
            return new BankHolidayModel(bankHolidays);
        });

        var vacation = _.map(data.Calendar.Vacations, function (vacation) {
            return new VacationModel(vacation);
        });

        var monthDay = _.map(data.Calendar.MonthDays, function (month) {
            return new MonthDayModel(month);
        });
        
        _self.users(userss);
        _self.teams = teams; 
        _self.roles = rolee ;
        _self.bankHolidays(bankHoliday);
        _self.vacations(vacation);
        _self.monthDays(monthDay);

        var d = new Date();
        _self.month (d.getMonth());
        _self.year(d.getFullYear());
        _self.monthName(_self.monthL[_self.month()]);
        }
    
    this.plusMonth = function (data) {
        var date = new Date(_self.year(), _self.month() + 1, 1);
        _self.month(date.getMonth());
        _self.year(date.getFullYear());
        
        $.post("/Dashboard/ReturnMonthDays/",
           {
               year: date.getFullYear(),
               month: date.getMonth() +1

           }, function (data) {
               var monthDay = _.map(data.calendar.MonthDays, function (month) {
                   return new MonthDayModel(month);
               });

               var bankHoliday = _.map(data.calendar.BankHolidays, function (bankHolidays) {
                   return new BankHolidayModel(bankHolidays);
               });

               var vacation = _.map(data.calendar.Vacations, function (vacation) {
                   return new VacationModel(vacation);
               });
               _self.bankHolidays(bankHoliday);
               _self.vacations(vacation);
               _self.monthDays(monthDay);
               _self.monthName(_self.monthL[_self.month()]);
           },
               "json"
        );
    }

    this.minusMonth = function (data) {

        var date = new Date(_self.year(), _self.month() - 1, 1);
        _self.month(date.getMonth());
        _self.year(date.getFullYear());
        $.post("/Dashboard/ReturnMonthDays/",
           {
               year: date.getFullYear(),
               month: date.getMonth() +1

           }, function (data) {

               var monthDay = _.map(data.calendar.MonthDays, function (month) {
                   return new MonthDayModel(month);
               });

               var bankHoliday = _.map(data.calendar.BankHolidays, function (bankHolidays) {
                   return new BankHolidayModel(bankHolidays);
               });

               var vacation = _.map(data.calendar.Vacations, function (vacation) {
                   return new VacationModel(vacation);
               });
               _self.bankHolidays(bankHoliday);
               _self.vacations(vacation);
               _self.monthDays(monthDay);
               _self.monthName(_self.monthL[_self.month()]);
           },
               "json"
        );
    }

    this.addHoliday = function (data) {
        $.post("/Dashboard/AddHoliday/",
           {

               StartDate: _self.vacation.StartDate,
               EndDate: _self.vacation.EndDate,

           }, function (data) {

               if (data.successed == false) {
                   _self.errors = data.Message;
                   $('#errr').html(_self.errors);
               }
               else {
                   $('#myModal2').modal('hide');
                   alert("Vacation succeded");
               }
           },
               "json"
        );
    }
    
    this.createUser = function (data) {
        _self.roleId(_self.role.Id);
        $.post("/Account/CreateUser/",
           {
                       firstName: _self.manageUser.firstName,
                       lastName: _self.manageUser.lastName,
                       hireDate: _self.manageUser.hireDate,
                       maxDays: _self.manageUser.maxDays,
                       teamID: _self.manageUser.teams.id,
                       AspnetUsers: {
                           Email: _self.manageUser.email
                       },
                       rolesID: _self.roleId()
           },function (data) {

               if (data.successed == false) {
                   _self.errors = data.Message;
                   $('#err').html(_self.errors);
               }
               else {
                   _self.manageUser.push(data.newUser);
                   _self.deleteUserAdress();
                   $('#myModal').modal('hide');
                   alert("Registration succeded");
               }
           },
               "json"
        );
    }

    this.updateUser = function (data) {
        _self.manageUser.id(data.id());
        _self.manageUser.firstName(data.firstName());
        _self.manageUser.lastName(data.lastName());
        _self.manageUser.hireDate(data.hireDate());
        _self.manageUser.maxDays(data.maxDays());
        _self.manageUser.email(data.email());

    }


    this.editUser = function (data) {
        $.post("/Account/EditUser/",
           {
               firstName: _self.manageUser.firstName,
               lastName: _self.manageUser.lastName,
               hireDate: _self.manageUser.hireDate,
               maxDays: _self.manageUser.maxDays,
               teamID: _self.manageUser.teams.id(),
               UserID : _self.manageUser.UserID,
               AspnetUsers: {
                   Email: _self.manageUser.email
               }
           }, function (data) {
               $('#myModal').modal('hide');
               alert("Edit was succeded");
            }, "json"
        );
    }
    
    this.deleteUserAdress = function (data) {
        _self.manageUser.firstName(null);
        _self.manageUser.lastName(null);
        _self.manageUser.hireDate(null);
        _self.manageUser.maxDays(null);
        _self.manageUser.email(null);
        _self.manageUser.id(null);
    }
}


function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}


