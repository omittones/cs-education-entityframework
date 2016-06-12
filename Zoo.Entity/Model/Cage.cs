namespace Zoo.Entity.Model
{
    public class Cage
    {
        public int Id { get; set; }

        public string NoBars { get; set; }

        public double TensileStrength { get; set; }

        public virtual Primate PrimateTenant { get; set; }

        public virtual Weasel WeaselTenant { get; set; }
    }
}