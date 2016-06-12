using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps
{
    public class ZooAdminMap : EntityTypeConfiguration<ZooAdmin>
    {
        public ZooAdminMap()
        {
            HasKey(e => e.Id);

            Map(m =>
            {
                m.ToTable("ZooKeepers");
                m.Requires("Type").HasValue("admin");
                m.Properties(t => new { });
            });

            Map(m =>
            {
                m.ToTable("ZooAdmin");
                m.Properties(t => t.Handlebars);
                m.Property(a => a.Handlebars);
            });
        }
    }
}