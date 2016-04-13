using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model.Maps.ReqsHierarchy
{
    public class DependentMap : EntityTypeConfiguration<Dependent>
    {
        public DependentMap()
        {
            this.ToTable("Dependent");
            this.HasKey(e => e.Id);
            this.Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}