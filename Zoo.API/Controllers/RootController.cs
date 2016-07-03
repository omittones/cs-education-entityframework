using System.Collections.Generic;
using System.Web.Http;

namespace Zoo.API.Controllers
{
    [RoutePrefix("api")]
    public class RootController : System.Web.Http.ApiController
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

        [HttpGet]
        [Route("docs")]
        public IHttpActionResult Docs()
        {
            var endpoints = new List<object>();
            var explorer = this.Configuration.Services.GetApiExplorer();
            foreach (var route in explorer.ApiDescriptions)
                endpoints.Add(new
                {
                    route.RelativePath,
                    route.HttpMethod.Method
                });

            return Ok(endpoints);
        }
    }
}