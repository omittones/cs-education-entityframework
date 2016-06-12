using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.BirdHierarchy
{
    public class HawkChickenHunterMap : EntityTypeConfiguration<HawkChickenHunter>
    {
        public HawkChickenHunterMap()
        {
            Map(m =>
            {
                m.ToTable("Birds");
                m.Requires("Type").HasValue("HawkChickenHunter");
                m.PropertiesWithFixedNullMembers(e => new { });
            });

            HasRequired(e => e.Details)
                .WithRequiredPrincipal();
        }
    }
}