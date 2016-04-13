using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps
{
    public class ZooKeeperMap : EntityTypeConfiguration<ZooKeeper>
    {
        public ZooKeeperMap()
        {
            Map(m =>
            {
                m.ToTable("ZooKeepers");
                m.Requires("Type").HasValue("keeper");
                m.Properties(t => new { t.NoKeys, t.ZooId });
            });

            Property(t => t.NoKeys);
            Property(t => t.ZooId);
        }
    }
}