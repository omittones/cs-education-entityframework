using System;

namespace Educ.Entity.Model
{
    public class Employee : Root
    {
        protected Employee()
        {
            this.DateOfBirth = DateTime.Now;
            this.Password = new byte[] { };
            this.Extra = new EmployeeExtra();
        }

        public string Name { get; set; }

        public string Surrname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public byte[] Password { get; set; }

        public virtual EmployeeExtra Extra { get; set; }
    }
}