namespace Zoo.Entity.Model
{
    public class ReqOne
    {
        public int Id { get; set; }

        public virtual Dependent Dependent { get; set; }
    }
}