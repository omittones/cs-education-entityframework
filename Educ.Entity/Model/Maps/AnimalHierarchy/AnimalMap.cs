using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.AnimalHierarchy
{
    public class AnimalMap : EntityTypeConfiguration<Animal>
    {
        public AnimalMap()
        {
            this.ToTable("Animal");

            this.HasKey(e => e.Id);
            this.Property(e => e.Id);
            this.Property(e => e.DateOfBirth);

            this.HasMany(e => e.Zoos)
                .WithMany(e => e.Animals)
                .Map(c =>
                {
                    c.MapLeftKey("ZooId");
                    c.MapRightKey("AnimalId");
                    c.ToTable("ZooAnimal");
                });

            this.HasOptional(e => e.Owner)
                .WithOptionalDependent(e => e.Animal)
                .Map(c => c.MapKey("OwnerUserId"));
        }
    }
}