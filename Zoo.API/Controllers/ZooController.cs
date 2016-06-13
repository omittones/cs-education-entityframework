using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/zoo")]
    public class ZooController : DefaultController<Entity.Model.Zoo, ZooRequest, ZooView>
    {
        public ZooController(
            IService<Entity.Model.Zoo> service,
            IQuery<ZooRequest, ZooView> query) : base(service, query)
        {
        }
    }
}