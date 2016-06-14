using System.Web.Http;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.API.Domain.Services;
using Zoo.API.Domain.Services.Command;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api/zoo")]
    public class ZooController : DefaultController<EditZooCommand, ZooRequest, ZooView>
    {
        public ZooController(IService<EditZooCommand> service, IQuery<ZooRequest, ZooView> query)
            : base(service, query)
        {
        }
    }
}