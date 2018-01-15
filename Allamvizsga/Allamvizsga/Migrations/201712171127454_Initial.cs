namespace Allamvizsga.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CarsModel", "Car_ID", "dbo.ServicesModels");
            DropForeignKey("dbo.CarsModel", "Service_PhoneNumber", "dbo.OwnerModels");
            DropIndex("dbo.CarsModel", new[] { "Car_ID" });
            DropIndex("dbo.CarsModel", new[] { "Service_PhoneNumber" });
            DropColumn("dbo.CarsModel", "Car_ID");
            DropColumn("dbo.CarsModel", "Service_PhoneNumber");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarsModel", "Service_PhoneNumber", c => c.String(maxLength: 128));
            AddColumn("dbo.CarsModel", "Car_ID", c => c.Int());
            CreateIndex("dbo.CarsModel", "Service_PhoneNumber");
            CreateIndex("dbo.CarsModel", "Car_ID");
            AddForeignKey("dbo.CarsModel", "Service_PhoneNumber", "dbo.OwnerModels", "PhoneNumber");
            AddForeignKey("dbo.CarsModel", "Car_ID", "dbo.ServicesModels", "ID");
        }
    }
}
