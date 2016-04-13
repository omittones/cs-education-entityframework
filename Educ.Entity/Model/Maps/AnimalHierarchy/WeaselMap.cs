using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.AnimalHierarchy
{
    public class WeaselMap : EntityTypeConfiguration<Weasel>
    {
        public WeaselMap()
        {
            Property(w => w.NoLairs);

            Map(m =>
            {
                m.ToTable("Animal");
                m.Requires("Type").HasValue((int) AnimalType.Weasel);
                m.Properties(t => new { t.NoLairs });
            });
        }
    }
}