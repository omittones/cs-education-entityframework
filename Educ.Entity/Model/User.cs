namespace Educ.Entity.Model
{
    public class User : Root
    {
        public UserGender Gender { get; set; }

        public virtual Animal Animal { get; set; }
    }
}