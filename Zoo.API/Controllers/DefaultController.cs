using System.Web.Http;
using Zoo.API.Domain;

namespace Zoo.API.Controllers
{
    public class DefaultController<TModel> : DefaultController<TModel, GridRequest, TModel>
    {
        public DefaultController(IService<TModel> service, IQuery<GridRequest, TModel> query) :
            base(service, query)
        {
        }
    }

    public class DefaultController<TWriteModel, TReadRequest, TReadModel> : ApiController
    {
        private readonly IService<TWriteModel> service;
        private readonly IQuery<TReadRequest, TReadModel> query;

        public DefaultController(
            IService<TWriteModel> service,
            IQuery<TReadRequest, TReadModel> query)
        {
            this.service = service;
            this.query = query;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll([FromUri] TReadRequest request)
        {
            if (request == null)
            {
                return Ok(query.Resolve());
            }
            else
            {
                return Ok(query.Resolve(request));
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetOne(int id)
        {
            var read = query.ResolveOne(id);
            if (read == null)
                return NotFound();

            return Ok(read);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create([FromBody] TWriteModel model)
        {
            var id = this.service.Create(model);

            var read = this.query.ResolveOne(id);

            return Ok(read);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, [FromBody] TWriteModel model)
        {
            this.service.Save(id, model);

            var read = this.query.ResolveOne(id);

            return Ok(read);
        }
    }
}