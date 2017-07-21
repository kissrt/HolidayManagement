using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class MonthDayViewModel
    {
        public int day { get; set; }
        public bool isFreeDay { get ; set;}
        public string  nameOfDay { get; set; }
        public string description { get; set; }
    }
}