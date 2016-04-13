using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.ZooHierarchy
{
    public class DemolishedZooMap : EntityTypeConfiguration<DemolishedZoo>
    {
        public DemolishedZooMap()
        {
            ToTable("DemolishedZoo");

            Property(d => d.DestructionDate);
        }
    }
}