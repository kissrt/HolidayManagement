function DashboardModel() {
    var _self = this;
    this.users = ko.observableArray(null);

    this.initialize = function (data) {
        var users = _.map(data.UserList, function (user, index) {
            return new UserDetailsModel(user);
        });
        _self.users(users);
    }
}

function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}