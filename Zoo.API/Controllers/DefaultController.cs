using System.Web.Http;
using Zoo.API.Domain;

namespace Zoo.API.Controllers
{
    public class DefaultController<TWriteModel, TReadModel> : ApiController
    {
        private readonly IService<TWriteModel> service;
        private readonly IQuery<TReadModel> query;

        public DefaultController(
            IService<TWriteModel> service,
            IQuery<TReadModel> query)
        {
            this.service = service;
            this.query = query;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(query.Resolve());
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

    public class DefaultController<TModel> : DefaultController<TModel, TModel>
    {
        public DefaultController(
            IService<TModel> service,
            IQuery<TModel> query) : base(service, query)
        {
        }
    }
}