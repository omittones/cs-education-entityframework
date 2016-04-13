using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model
{
    public class FowlMap : EntityTypeConfiguration<Fowl>
    {
        public FowlMap()
        {
            HasKey(e => e.Id);

            Map(m =>
            {
                m.ToTable("Birds");
                m.Requires("Type").HasValue("Fowl");
                m.Properties(e => new { e.CrestSize });
            });

            Map(m =>
            {
                m.ToTable("ChickenDetails");
                m.Requires("Type").HasValue("Fowl");
                m.Properties(e => new { e.FeatherColor });
            });

            Property(e => e.CrestSize).HasColumnName("ChickenCrestSize");
            Property(e => e.FeatherColor).HasColumnName("FeatherColor");
        }
    }
}