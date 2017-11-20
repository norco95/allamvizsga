using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Allamvizsga.Models
{
    public class ServicesModels
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public string Identifier { get; set; }
        public string VIN { get; set; }

       

        public DateTime ServiceDate { get; set; }

        public int Price { get; set; }

        public int ActualKm { get; set; }

        public int Flag { get; set; }

        public int ServiceId { get; set; }

        public string PhoneNumber { get; set; }
        [ForeignKey("PhoneNumber")]
        public virtual OwnerModels Owner { get; set; }


    }
}