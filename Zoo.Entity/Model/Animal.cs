using System;
using System.Collections.Generic;

namespace Zoo.Entity.Model
{
    public class Animal : Root
    {
        public DateTime DateOfBirth { get; set; }

        public virtual User Owner { get; set; }

        public virtual ICollection<Zoo> Zoos { get; set; }
    }
}