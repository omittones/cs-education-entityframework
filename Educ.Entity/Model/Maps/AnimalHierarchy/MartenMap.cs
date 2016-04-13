using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.AnimalHierarchy
{
    public class MartenMap : EntityTypeConfiguration<Marten>
    {
        public MartenMap()
        {
            this.ToTable("Marten");

            this.Property(m => m.FurColor);
        }
    }
}