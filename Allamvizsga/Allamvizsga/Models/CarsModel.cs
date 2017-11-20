using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Allamvizsga.Models
{
    public class CarsModel
    {
        [Key]
        public int ID{ get; set; }
        public string CarVIN { get; set; }
        public string OwnerPhoneNumber { get; set; }
        public bool EngineOilAndFilter { get; set; }
        public bool AirFilter { get; set; }
        public bool PollenFilter { get; set; }
        public bool FuelFilter { get; set; }
        public bool BreakFluid { get; set; }
        public bool BreakDiscAndPAds { get; set; }
        public bool GearOilOrTransmissionFluid { get; set; }
        public string Others { get; set; }
        public int CurentKm { get; set; }
        public int NextKmVisit { get; set; }
        public int Flag { get; set; }
        public DateTime Servicedate { get; set; }
        public DateTime NextServiceDate { get; set; }

       

    }
}