using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Allamvizsga.Models
{
    public class HistoryModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Cid { get; set; }
       

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
        public int ServiceId { get; set; }
        [ForeignKey("ServiceId")]
        public virtual ServiceModel Service { get; set; }
    }
}