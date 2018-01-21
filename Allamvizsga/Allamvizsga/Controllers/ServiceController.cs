using Allamvizsga.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Allamvizsga.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Net.Mail;
using System.Net;
using System.Security.Policy;
using System.Text;
using System.IO;
using System.Net.Http;

namespace Allamvizsga.Controllers
{
    public class ServiceController : Controller
    {
        
        private ServiceBooksContext Servicebook = new ServiceBooksContext();
        private List<HistoryModel>GetHistoryesByVin(String vin)
        {
            
            var historyes = Servicebook.History.ToList();
            List<HistoryModel> result = new List<HistoryModel> { };
            foreach (var history in historyes)
            {
                if (history.CarVIN == vin)
                {

                   
                    result.Add(history);
                }
            }
                    
                   
            return result;
        }
        private List<ServiceModel> GetCurentServiceCars()
        {
            
            var userID = User.Identity.GetUserName();
            var actservice = Servicebook.ServicePlaces.FirstOrDefault(x => x.Email == userID);
            var Services = Servicebook.Services.ToList();
            List<ServiceModel> actualuserrepairs = new List<ServiceModel> { };
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
                            serv.Car = GetHistoryesByVin(serv.VIN);
                            actualuserrepairs.Add(serv);
                        }
                    }
                    if (serv.Owner.Services != null)
                        serv.Owner.Services = null;
                    foreach(var car in serv.Car)
                    {
                        if (car.Service != null)
                            car.Service = null;
                    }
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
        public ActionResult AddCar(ServiceModel data)
        {
            bool success = false;
            var message = "";
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ApplicationDbContext.Create()));
            var currentUser = manager.FindById(User.Identity.GetUserId()).Email;
            ServiceBooksContext database = new ServiceBooksContext();
            var owners = database.Owners.FirstOrDefault(i => i.PhoneNumber == data.Owner.PhoneNumber);
            ServiceModel newCar = new ServiceModel();
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
        public ActionResult EndCar(HistoryModel data)
        {
            bool success = false;
            var message = "";
            
            var curentService = Servicebook.Services.FirstOrDefault(i => i.ID == data.Service.ID);
            curentService.Flag = 1;
            curentService.Price = data.Service.Price;
            var s = new HistoryModel();
            s = data;
            s.CarVIN = curentService.VIN;
            s.Servicedate = DateTime.Now;
            if (data.Servicedate == null)
            {
                s.NextServiceDate = DateTime.Now;
            }
            if(s.Others==null)
            {
                s.Others = "";
            }
            s.OwnerPhoneNumber = curentService.PhoneNumber;
            s.Service = curentService;

            Servicebook.History.Add(s);
            Servicebook.SaveChanges();
            success = true;

           
            MailMessage mailMessage = new MailMessage();
            mailMessage.To.Add(s.Service.Owner.Email);
            mailMessage.From = new MailAddress("info.servicebook@gmail.com");
            mailMessage.Subject = "Your car with identifier: "+s.Service.Identifier+" it is ready!";
            mailMessage.Body = "Hello " +s.Service.Owner.FirstName+" "+s.Service.Owner.LastName + "!\n\n"+" Your Car with identifier: "+s.Service.Identifier +" it is ready! "+ " The repairs costs: "+s.Service.Price+" EURO";
            mailMessage.Body += "\n List of repaires: ";
            if (s.AirFilter == true)
                mailMessage.Body += "\nAir Filter";
            if (s.BreakDiscAndPAds == true)
                mailMessage.Body += "\nBreak Disc And Pads";
            if (s.BreakFluid == true)
                mailMessage.Body += "\n Break Fluid";
            if (s.EngineOilAndFilter == true)
                mailMessage.Body += "\n Engine Oil And Filter";
            if (s.FuelFilter == true)
                mailMessage.Body += "\n Fuel Filter";
            if (s.GearOilOrTransmissionFluid == true)
                mailMessage.Body += "\n Gear Oil Or Transmission Fluid";
            if (s.PollenFilter == true)
                mailMessage.Body += "\n Pollen Filter";
           
            mailMessage.Body += "\n Others:\n"+s.Others;
            mailMessage.Body += "\n Next service date: " + s.NextServiceDate.ToString();
            mailMessage.Body += "\n Next service km: " + s.NextKmVisit;



            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;

            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("info.servicebook@gmail.com", "allamvizsga");



            smtpClient.Send(mailMessage);
           




            var actualuserrepairs = GetCurentServiceCars();
            return Json(new { success = success, messages = message, newCar = actualuserrepairs }, JsonRequestBehavior.DenyGet);
        }
        [HttpPost]
        public ActionResult DeletCar(HistoryModel data)
        {
            bool success = false;
            var message = "";
            ServiceBooksContext database = new ServiceBooksContext();
            var curentService = database.Services.FirstOrDefault(i => i.ID == data.Service.ID);
            curentService.Flag = 2;
             
            database.SaveChanges();
            success = true;
            var actualuserrepairs = GetCurentServiceCars();
            return Json(new { success = success, messages = message, newCar = actualuserrepairs }, JsonRequestBehavior.DenyGet);
        }

        
    }
}