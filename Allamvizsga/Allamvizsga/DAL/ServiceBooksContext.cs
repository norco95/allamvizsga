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
        public DbSet<HistoryModel> History { get; set; }
        public DbSet<UserModel> ServicePlaces { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
        public DbSet<OwnerModel> Owners { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}