using HolidayManagement.Models;
using HolidayManagement.Repository;
using HolidayManagement.Repository.Models;
using Microsoft.AspNet.Identity;
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
        HolidayManagementContext databaseContext = new HolidayManagementContext();
        public UserDetailsRepository database = new UserDetailsRepository();
        public TeamRepository teamrep = new TeamRepository();
        public BankHolidayRepository bankHolidayrepo = new BankHolidayRepository();
        public VacationRepository vacationrepo = new VacationRepository();
        public ActionResult Index()
        {
            var users = database.GetUsers();
            var teams = teamrep.GetTeams();

            var roles = databaseContext.Roles.ToList();

            DashboardViewModels dashboardVM = new DashboardViewModels();
            dashboardVM.UserList = users;
            dashboardVM.TeamList = teams;
            dashboardVM.Roles = roles;

            CalendarViewModel calendar = new CalendarViewModel();
            AjaxDateModel date = new AjaxDateModel();
            date.year = DateTime.Now.Year;
            date.month = DateTime.Now.Month;

            calendar = getMonthDays(date);

            dashboardVM.Calendar = calendar;
            return View(dashboardVM);
            
        }

        [HttpPost]
        public ActionResult ReturnMonthDays(AjaxDateModel model)
        {
            CalendarViewModel calendar = new CalendarViewModel();
            AjaxDateModel date = new AjaxDateModel();
            date.year = model.year;
            date.month = model.month;
            calendar = getMonthDays(date);
          
            return Json(new { calendar = calendar }, JsonRequestBehavior.DenyGet);

        }
        
        [HttpPost]
        public ActionResult AddHoliday(Vacation model)
        {
            string message = "";
            bool succes = false;
            
                HolidayManagementContext database = new HolidayManagementContext();
                VacationRepository vacationrepo = new VacationRepository();

                var UserId = User.Identity.GetUserId();
                UserDetailsRepository udr = new UserDetailsRepository();
                var userDetails = udr.GetUserDetailsByUserId(UserId);
                
                 model.Date = DateTime.Now;
                 model.StateId = 1;
                 model.UserId = userDetails.ID;

                database.Vacations.Add(model);

            message = validateVacation(model);
            if (message == null)
            {
                database.SaveChanges();
                succes = true;
            }
            else
            {
                succes = false;
               
            }
               
            
            
            return Json(new { successed = succes, Message = message, newUser = model }, JsonRequestBehavior.DenyGet);

        }

        public string validateVacation(Vacation model)
        {
            string message=null;
            var difference = (model.EndDate - model.StartDate).TotalDays;
            //if difference <0 : nem jo date
            //minus hetvegek
            //

            if(difference < 0)
            {
                message = "Wrong Date";
            }
            else
            {
                UserDetailsRepository userrepo = new UserDetailsRepository();
                var userDetails= userrepo.GetUserDetailsById(model.UserId);
                if (userDetails.MaxDays < difference)
                {
                    message = "Not have vacation days";
                }
               
            }
            return message;
        }
        
        public CalendarViewModel getMonthDays(AjaxDateModel model)
        {
            CalendarViewModel calendar = new CalendarViewModel();
            calendar.Vacations = vacationrepo.GetVacations();
            calendar.BankHolidays = bankHolidayrepo.GetBankHolidays();

            var numberOfDays = DateTime.DaysInMonth(model.year, model.month );

            for (int i = 1; i <= numberOfDays; ++i)
            { 
                var date = new DateTime(model.year, model.month, i);

                MonthDayViewModel day = new MonthDayViewModel();
                day.day = i;
                day.nameOfDay = date.DayOfWeek.ToString();

                var holiday = calendar.BankHolidays.FirstOrDefault(x => x.Day == i && x.Month == model.month);

                if (holiday != null)
                {
                    day.isFreeDay = true;
                    day.description = holiday.Description;
                }
                else
                {
                    if (day.nameOfDay == "Sunday" || day.nameOfDay == "Saturday")
                    {
                        day.isFreeDay = true;
                        day.description = "Weekend";
                    }
                    else
                    {
                        day.isFreeDay = false;
                        day.description = null;
                    }
                }

                calendar.MonthDays.Add(day);

            }

            return calendar;
        }

    }
}