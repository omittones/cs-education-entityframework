using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.Entity.Model;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/animal")]
    public class AnimalController : DefaultController<Animal, AnimalRequest, AnimalView>
    {
        public AnimalController(IService<Animal> service, IQuery<AnimalRequest, AnimalView> animalQuery) :
            base(service, animalQuery)
        {
        }
    }
}