using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.AnimalHierarchy.PrimateHierarchy
{
    public class ApeMap : EntityTypeConfiguration<Ape>
    {
        public ApeMap()
        {
            this.Property(a => a.Weight)
                .HasColumnName("ApeWeight")
                .IsOptional();

            this.Map(m =>
            {
                m.ToTable("PrimateSpecifics");
                m.Requires("IsChimp").HasValue(false);
                m.Properties(t => new { t.Weight });
            });
        }
    }
}