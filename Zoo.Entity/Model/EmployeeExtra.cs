namespace Zoo.Entity.Model
{
    public class EmployeeExtra
    {
        public int Id { get; set; }

        //public virtual int OptionalDependentUserId { get; set; }
        public virtual User OptionalDependentUser { get; set; }
        public virtual User OptionalPrincipalUser { get; set; }
        public virtual User OptionalWithManyUser { get; set; }
        public virtual int? OptionalWithManyUserId { get; set; }
    }
}