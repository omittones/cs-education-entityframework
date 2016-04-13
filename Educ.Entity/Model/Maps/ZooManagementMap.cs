using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps
{
    public class ZooManagementMap : EntityTypeConfiguration<ZooManagement>
    {
        public ZooManagementMap()
        {
            ToTable("ZooKeepers");
        }
    }
}