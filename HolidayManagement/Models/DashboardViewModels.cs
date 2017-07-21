using HolidayManagement.Repository;
using HolidayManagement.Repository.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HolidayManagement.Models
{

    public class DashboardViewModels
    {
        
        public List<UserDetails> UserList { get; set; }
        public List<Team> TeamList { get; set; }
        
        public List<IdentityRole> Roles { get; set; }

        public CalendarViewModel Calendar { get; set; }
    }
}