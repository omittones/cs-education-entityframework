using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.BirdHierarchy
{
    public class HawkChickenHunterMap : EntityTypeConfiguration<HawkChickenHunter>
    {
        public HawkChickenHunterMap()
        {
            Map(m =>
            {
                m.ToTable("Birds");
                m.Requires("Type").HasValue("HawkChickenHunter");
                m.Properties(e => new { });
            });

            HasRequired(e => e.Details)
                .WithRequiredPrincipal();
        }
    }
}