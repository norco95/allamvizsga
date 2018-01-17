using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Allamvizsga.Models
{
    public class OwnerModel
    {
        [Key]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public virtual ICollection<ServiceModel> Services { get; set; }

       
    }
}