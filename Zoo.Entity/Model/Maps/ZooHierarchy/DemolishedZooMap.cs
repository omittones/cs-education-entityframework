using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.ZooHierarchy
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