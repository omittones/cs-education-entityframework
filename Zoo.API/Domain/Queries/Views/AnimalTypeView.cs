namespace Zoo.API.Domain.Queries.Views
{
    public class AnimalTypeView : IView
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
    }
}