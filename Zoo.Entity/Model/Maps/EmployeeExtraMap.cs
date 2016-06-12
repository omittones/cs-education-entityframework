using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps
{
    public class EmployeeExtraMap : EntityTypeConfiguration<EmployeeExtra>
    {
        public EmployeeExtraMap()
        {
            ToTable("Employees");

            HasKey(e => e.Id);
            Property(e => e.Id);

            //optional:optional
            //the foreign key OptionalDependentUserId will be created in Employee
            //Employee should not have a property named OptionalDependentUserId because framework will
            //complain that it cannot create FK named OptionalDependentUserId because same named column already exists
            HasOptional(e => e.OptionalDependentUser)
                .WithOptionalDependent()
                .Map(m => m.MapKey("OptionalDependentUserId"));

            //optional:optional
            //the foreign key OptionalPrincipalEmployeeId will be created in User
            HasOptional(e => e.OptionalPrincipalUser)
                .WithOptionalPrincipal()
                .Map(m => m.MapKey("OptionalPrincipalEmployeeId"));

            //optional:many
            //the Employee has a foreign key to user
            HasOptional(e => e.OptionalWithManyUser)
                .WithMany()
                .HasForeignKey(e => e.OptionalWithManyUserId);
        }
    }
}