using System.Collections.Generic;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;

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