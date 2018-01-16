using Allamvizsga.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Allamvizsga.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Allamvizsga.Controllers
{
    public class ServiceController : Controller
    {

        private List<ServicesModels> GetCurentServiceCars()
        {
            ServiceBooksContext Servicebook = new ServiceBooksContext();
            var userID = User.Identity.GetUserName();
            var actservice = Servicebook.ServicePlaces.FirstOrDefault(x => x.Email == userID);
            var Services = Servicebook.Services.ToList();
            List<ServicesModels> actualuserrepairs = new List<ServicesModels> { };
            if (actservice == null)
            {
                 
               Response.Redirect("Account/Login", false);
            }
            else
            {
                foreach (var serv in Services)
                {
                    if (serv.ServiceId == actservice.ServiceId)
                    {
                        if (serv.Flag == 0)
                        {

                            actualuserrepairs.Add(serv);
                        }
                    }
                    if (serv.Owner.Services != null)
                        serv.Owner.Services = null;
                }
            }
            return actualuserrepairs;

        }
        // GET: Services
        public ActionResult Index()
        {


           var actualuserrepairs = GetCurentServiceCars();

            
            ServicesViewModel servicemodel = new ServicesViewModel()
            {
                Services = actualuserrepairs
            };
            


            return View(servicemodel);

            
        }

        [HttpPost]
        public ActionResult AddCar(ServicesModels data)
        {
            bool success = false;
            var message = "";
         
            

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var currentUser = manager.FindById(User.Identity.GetUserId()).Email;
            
            ServiceBooksContext database = new ServiceBooksContext();
            
            var owners = database.Owners.FirstOrDefault(i => i.PhoneNumber == data.Owner.PhoneNumber);
       
                ServicesModels newCar = new ServicesModels();
                var curentService = database.ServicePlaces.FirstOrDefault(i => i.Email == currentUser);

                
            
            if (owners != null)
            {
                newCar.Owner = owners;
                newCar.PhoneNumber = owners.PhoneNumber;

            }
            else
            {
                newCar.Owner = data.Owner;
                newCar.PhoneNumber = data.Owner.PhoneNumber;
            }


            newCar.Identifier = data.Identifier;
            newCar.VIN = data.VIN;
            newCar.Price = 0;
            newCar.ActualKm = 0;
            newCar.ServiceDate = DateTime.Now;
            newCar.Flag = 0;
                newCar.ServiceId = curentService.ServiceId;

                database.Services.Add(newCar);
            
           
            database.SaveChanges();
            
            success = true;

            var actualuserrepairs = GetCurentServiceCars();
            return Json(new { success = success, messages = message,newCar=actualuserrepairs}, JsonRequestBehavior.DenyGet);
        }
        [HttpPost]
        public ActionResult EndCar(CarsModel data)
        {
            bool success = false;
            var message = "";
            ServiceBooksContext database = new ServiceBooksContext();
            var curentService = database.Services.FirstOrDefault(i => i.ID == data.Service.ID);
            curentService.Flag = 1;
            data.Service = curentService;
            data.OwnerPhoneNumber = "0";
            data.Others = "as";
            data.CarVIN = curentService.VIN;
            DateTime localDate = DateTime.Now;
            data.NextServiceDate = localDate;
            data.Servicedate = localDate;
            //   data.NextServiceDate= DateTime.ParseExact(YourStr, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            data.ServiceId = curentService.ID;
            database.Cars.Add(data);
            database.SaveChanges();
            success = true;
            var actualuserrepairs = GetCurentServiceCars();
            return Json(new { success = success, messages = message, newCar = actualuserrepairs }, JsonRequestBehavior.DenyGet);
        }

    }
}