using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allamvizsga.Models
{
    public class ServiceModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Identifier { get; set; }
        public string VIN { get; set; }
        public int Price { get; set; }
        public int Flag { get; set; }
        public string PhoneNumber { get; set; }
        [ForeignKey("PhoneNumber")]
        public virtual OwnerModel Owner { get; set; }
        public int ServiceId { get; set; }
        [ForeignKey("ServiceId")]
        public virtual UserModel User { get; set; }
        public virtual ICollection<HistoryModel> Car { get; set; }

    }
}