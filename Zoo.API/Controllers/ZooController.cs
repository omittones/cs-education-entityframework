using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.API.Domain.Services.Command;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/zoo")]
    public class ZooController : DefaultController<EditZooCommand, ZooRequest, ZooView>
    {
        private readonly IQuery<AnimalRequest, AnimalTypeView> animalQuery;

        public ZooController(
            IService<EditZooCommand> service,
            IQuery<ZooRequest, ZooView> zooQuery,
            IQuery<AnimalRequest, AnimalTypeView> animalQuery)
            : base(service, zooQuery)
        {
            this.animalQuery = animalQuery;
        }

        [HttpGet]
        [Route("{zooId:int}/animals")]
        public virtual IHttpActionResult AllAnimals(int zooId, [FromUri] GridRequest request)
        {
            var proper = new AnimalRequest(request);
            proper.belongsToZooId = zooId;

            var animals = animalQuery.Resolve(proper);
            return Ok(animals);
        }

        [HttpGet]
        [Route("{zooId:int}/animals/{animalId:int}")]
        public virtual IHttpActionResult OneAnimals(int zooId, int animalId)
        {
            //TODO - make sure animalId belongs to zooId
            var animals = animalQuery.ResolveOne(animalId);
            return Ok(animals);
        }
    }
}