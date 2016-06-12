using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps
{
    public class CageMap : EntityTypeConfiguration<Cage>
    {
        public CageMap()
        {
            this.HasKey(c => c.Id);

            this.ToTable("Cage");

            this.Property(c => c.NoBars);

            this.Property(c => c.TensileStrength);

            this.HasOptional(c => c.PrimateTenant)
                .WithOptionalDependent(a => a.Cage)
                .Map(c => c.MapKey("TenantApeId"));

            this.HasOptional(c => c.WeaselTenant)
                .WithOptionalDependent()
                .Map(c => c.MapKey("TenantWeaselId"));
        }
    }
}