using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.Spatial;

namespace Zoo.Entity.Model.Maps
{
    public class EmployeeMap : EntityTypeConfiguration<Employee>
    {
        public EmployeeMap()
        {
            Map(m =>
            {
                m.ToTable("Employees");
                m.Properties(t => new { t.Name, t.Surrname });
            });

            Map(m =>
            {
                m.ToTable("EmployeesInformation");
                m.Properties(t => new { t.DateOfBirth, t.Password });
            });

            HasKey(e => e.Id)
                .Property(e => e.Id)
                .HasColumnName("Id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(e => e.Name);
            Property(e => e.Surrname);
            Property(e => e.DateOfBirth)
                .HasColumnType("datetime");
            Property(e => e.Password);

            //table splitting
            HasRequired(e => e.Extra)
                .WithRequiredPrincipal();
        }
    }
}