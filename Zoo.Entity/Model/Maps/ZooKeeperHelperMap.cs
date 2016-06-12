using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps
{
    public class ZooKeeperHelperMap : EntityTypeConfiguration<ZooKeeperHelper>
    {
        public ZooKeeperHelperMap()
        {
            Map(m =>
            {
                m.ToTable("ZooKeepers");
                m.Requires("Type").HasValue("helper");
                m.Properties(t => new { t.Days });
            });

            Property(t => t.Days);
        }
    }
}