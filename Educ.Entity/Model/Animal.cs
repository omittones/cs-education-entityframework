using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;

namespace Educ.Entity.Model
{
    public class Animal
    {
        public int Id { get; set; }

        public DateTime DateOfBirth { get; set; }

        public virtual User Owner { get; set; }

        public virtual ICollection<Zoo> Zoos { get; set; }
    }
}