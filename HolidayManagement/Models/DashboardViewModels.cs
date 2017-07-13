using HolidayManagement.Repository;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{

    public class DashboardViewModels
    {
        public string test { get; set; }

        
        public List<UserDetails> UserList { get; set; }
        public List<Team> TeamList { get; set; }

    }
}