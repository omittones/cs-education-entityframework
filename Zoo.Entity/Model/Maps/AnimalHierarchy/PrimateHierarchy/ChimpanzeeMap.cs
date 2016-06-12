using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.AnimalHierarchy.PrimateHierarchy
{
    public class ChimpanzeeMap : EntityTypeConfiguration<Chimpanzee>
    {
        public ChimpanzeeMap()
        {
            this.Property(c => c.NoChimpRelatives)
                .IsOptional();

            this.Property(c => c.ChimpFurColor)
                .IsOptional();

            this.Map(m =>
            {
                m.ToTable("PrimateSpecifics");
                m.Requires("IsChimp").HasValue(true);
                m.Properties(t => new { t.NoChimpRelatives, t.ChimpFurColor });
            });
        }
    }
}