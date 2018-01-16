namespace Allamvizsga.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migrationname : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.CarsModel");
            AlterColumn("dbo.CarsModel", "id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.CarsModel", "id");
        }

        

        public override void Down()
        {
            DropPrimaryKey("dbo.CarsModel");
            AlterColumn("dbo.CarsModel", "id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.CarsModel", "Id");
        }
    }
}
