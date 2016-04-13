using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.ZooHierarchy
{
    public class ClosedZooMap : EntityTypeConfiguration<ClosedZoo>
    {
        public ClosedZooMap()
        {
            Map(m =>
            {
                m.ToTable("ClosedZoos");
                m.MapInheritedProperties();
                m.Properties(t => new { t.ClosingDate });
            });

            Property(e => e.ClosingDate);
        }
    }
}