using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps
{
    public class ZooManagementMap : EntityTypeConfiguration<ZooManagement>
    {
        public ZooManagementMap()
        {
            ToTable("ZooKeepers");
        }
    }
}