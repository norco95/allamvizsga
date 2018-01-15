﻿using System.ComponentModel.DataAnnotations;


namespace Allamvizsga.Models
{
    public class UserModels
    {

       [Key]
       public int ServiceId { get; set;}
       public string Email { get; set; }
       
       public string ServiceName { get; set; }

       public string Country { get; set; }

       public string City { get; set; }

       public string Street { get; set; }

       public int Nr { get; set; }
       public string PhoneNumber { get; set; }

     
    }
}