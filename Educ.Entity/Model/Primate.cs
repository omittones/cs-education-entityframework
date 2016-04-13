namespace Educ.Entity.Model
{
    public class Primate : Animal
    {
        public string Name { get; set; }

        public int TrainerEmployeeId { get; set; }

        public virtual Employee Trainer { get; set; }

        public virtual Cage Cage { get; set; }
    }
}