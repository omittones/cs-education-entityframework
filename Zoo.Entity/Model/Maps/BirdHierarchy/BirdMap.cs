using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.BirdHierarchy
{
    public class BirdMap : EntityTypeConfiguration<Bird>
    {
        public BirdMap()
        {
            ToTable("Birds");

            HasKey(e => e.Id);

            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}