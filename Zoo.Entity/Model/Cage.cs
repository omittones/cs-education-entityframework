namespace Zoo.Entity.Model
{
    public class Cage : Root
    {
        public string NoBars { get; set; }

        public double TensileStrength { get; set; }

        public virtual Primate PrimateTenant { get; set; }

        public virtual Weasel WeaselTenant { get; set; }
    }
}