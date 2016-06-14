using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.ZooHierarchy
{
    public class ZooMap : EntityTypeConfiguration<Zoo>
    {
        public ZooMap()
        {
            HasKey(e => e.Id);

            Property(e => e.Id);

            Property(e => e.Name);

            HasMany(e => e.Keepers)
                .WithOptional()
                .HasForeignKey(k => k.ZooId);
        }
    }
}