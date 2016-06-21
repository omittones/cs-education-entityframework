using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.Entity.Model;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/animal")]
    public class AnimalController : DefaultController<Animal, AnimalRequest, Animal>
    {
        public AnimalController(IService<Animal> service, IQuery<AnimalRequest, Animal> animalQuery) :
            base(service, animalQuery)
        {
        }
    }
}