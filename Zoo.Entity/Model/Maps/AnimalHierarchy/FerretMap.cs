using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.AnimalHierarchy
{
    public class FerretMap : EntityTypeConfiguration<Ferret>
    {
        public FerretMap()
        {
            Map(m =>
            {
                m.ToTable("Animal");
                m.Requires("Type").HasValue((int) AnimalType.Ferret);
                m.Properties(t => new { });
            });

            Map(m =>
            {
                m.ToTable("Ferret");
                m.Properties(t => new { t.FurValue });
            });

            Property(e => e.FurValue);
        }
    }
}