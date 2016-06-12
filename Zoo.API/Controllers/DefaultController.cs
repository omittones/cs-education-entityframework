using System.Web.Http;

namespace Zoo.API.Controllers
{
    public class DefaultController<TModel> : ApiController
    {
        public DefaultController()
        {
            
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok();
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetOne(int id)
        {
            return Ok();
        }
    }
}