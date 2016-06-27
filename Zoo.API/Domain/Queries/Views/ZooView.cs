using System.Collections.Generic;

namespace Zoo.API.Domain.Queries.Views
{
    public class ZooView : IView
    {
        public int Id { get; set; }
        public int NoAnimals { get; set; }
        public int NoKeepers { get; set; }
        public string Name { get; set; }
        public EmployeeView Admin { get; set; }
        public IEnumerable<EmployeeView> Managers { get; set; }
    }
}