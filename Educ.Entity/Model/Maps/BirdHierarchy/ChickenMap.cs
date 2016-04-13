using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.BirdHierarchy
{
    public class ChickenMap : EntityTypeConfiguration<Chicken>
    {
        public ChickenMap()
        {
            HasKey(e => e.Id);

            Map(m =>
            {
                m.ToTable("Birds");
                m.Requires("Type").HasValue("Chicken");
                m.Properties(e => new { e.CrestSize });
            });

            Map(m =>
            {
                m.ToTable("ChickenDetails");
                m.Requires("Type").HasValue("Chicken");
                m.Properties(e => new { e.FeatherColor, e.EggCount });
            });

            Property(e => e.CrestSize).HasColumnName("ChickenCrestSize");
            Property(e => e.FeatherColor).HasColumnName("FeatherColor");
            Property(e => e.EggCount).IsOptional();
        }
    }
}