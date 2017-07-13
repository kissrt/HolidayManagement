using HolidayManagement.Models;
using HolidayManagement.Repository;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HolidayManagement.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public UserDetailsRepository database = new UserDetailsRepository();
        public TeamRepository teamrep = new TeamRepository();
        public ActionResult Index()
        {
            var users = database.GetUsers();
            var teams = teamrep.GetTeams();
            DashboardViewModels dashboardVM = new DashboardViewModels();
            dashboardVM.UserList = users;
            dashboardVM.TeamList = teams;
            return View(dashboardVM);


        }
    }
}