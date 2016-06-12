using System.Web.Http;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api")]
    public class RootController : ApiController
    {
        [HttpGet]
        [Route("version")]
        public IHttpActionResult Version()
        {
            return Ok(new
            {
                major = 0,
                minor = 1,
                build = "*"
            });
        }
    }
}