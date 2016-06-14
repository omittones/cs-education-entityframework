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
                m.PropertiesWithFixedNullMembers(t => new {});
            });

            Map(m =>
            {
                m.ToTable("ZooAdmin");
                m.Properties(t => new {t.Handlebars});
                m.Property(a => a.Handlebars);
            });
        }
    }
}