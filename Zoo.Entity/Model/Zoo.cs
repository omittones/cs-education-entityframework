using System.Collections.Generic;

namespace Zoo.Entity.Model
{
    public class Zoo : Root
    {
        public string Name { get; set; }

        public virtual ICollection<Animal> Animals { get; set; }

        public virtual ICollection<ZooKeeper> Keepers { get; set; }
    }
}