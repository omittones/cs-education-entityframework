using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.API.Domain.Services.Command;
using Zoo.Entity.Model;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/zoo")]
    public class ZooController : DefaultController<EditZooCommand, ZooRequest, ZooView>
    {
        private readonly IQuery<AnimalRequest, Animal> animalQuery;

        public ZooController(
            IService<EditZooCommand> service,
            IQuery<ZooRequest, ZooView> zooQuery,
            IQuery<AnimalRequest, Animal> animalQuery)
            : base(service, zooQuery)
        {
            this.animalQuery = animalQuery;
        }

        [HttpGet]
        [Route("{id:int}/animals")]
        public virtual IHttpActionResult AllAnimals(int id, [FromUri] AnimalRequest request)
        {
            request.belongsToZooId = id;
            var animals = animalQuery.Resolve(request);
            return Ok(animals);
        }
    }
}