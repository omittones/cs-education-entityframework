using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.ReqsHierarchy
{
    public class ReqTwoMap : EntityTypeConfiguration<ReqTwo>
    {
        public ReqTwoMap()
        {
            this.ToTable("ReqTwo");
            this.HasKey(e => e.Id);
            this.Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.HasOptional(e => e.Dependent)
                .WithOptionalPrincipal()
                .Map(m =>
                {
                    m.ToTable("Dependent");
                    m.MapKey("ReqTwoId");
                });

        }
    }
}