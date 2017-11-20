using Allamvizsga.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Allamvizsga.DAL
{
    public class ServiceBooksContext : DbContext
    {
        public DbSet<CarsModel> Cars { get; set; }
        public DbSet<UserModels> ServicePlaces { get; set; }
        public DbSet<ServicesModels> Services { get; set; }
        public DbSet<OwnerModels> Owners { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}