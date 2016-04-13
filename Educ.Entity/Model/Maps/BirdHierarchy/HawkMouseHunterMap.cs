using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.BirdHierarchy
{
    public class HawkMouseHunterMap : EntityTypeConfiguration<HawkMouseHunter>
    {
        public HawkMouseHunterMap()
        {
            Map(m =>
            {
                m.ToTable("Birds");
                m.Requires("Type").HasValue("HawkMouseHunter");
                m.Properties(e => new { });
            });

            HasRequired(e => e.Details)
                .WithRequiredPrincipal();
        }
    }
}