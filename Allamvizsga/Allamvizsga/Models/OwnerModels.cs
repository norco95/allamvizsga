using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Allamvizsga.Models
{
    public class OwnerModels
    {
        [Key]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public virtual ICollection<ServicesModels> Services { get; set; }

       
    }
}