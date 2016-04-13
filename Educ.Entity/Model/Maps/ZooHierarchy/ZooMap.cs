using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.ZooHierarchy
{
    public class ZooMap : EntityTypeConfiguration<Zoo>
    {
        public ZooMap()
        {
            HasKey(e => e.Id);

            Property(e => e.Id);
            Property(e => e.Name);

            HasMany(e => e.Keepers)
                .WithRequired()
                .HasForeignKey(k=>k.ZooId);
        }
    }
}