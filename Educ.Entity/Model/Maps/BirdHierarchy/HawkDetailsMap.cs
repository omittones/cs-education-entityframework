using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.BirdHierarchy
{
    public class HawkDetailsMap : EntityTypeConfiguration<HawkDetails>
    {
        public HawkDetailsMap()
        {
            HasKey(e => e.Id);

            ToTable("HawkDetails");

            Property(e => e.Prey);
            Property(e => e.SoaringHeight);
        }
    }
}