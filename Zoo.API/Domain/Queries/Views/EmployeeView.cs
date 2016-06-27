namespace Zoo.API.Domain.Queries.Views
{
    public class EmployeeView : IView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NoKeys { get; set; }
    }
}