using System.Web.Http;
using Microsoft.Owin.Logging;
using Owin;

namespace Zoo.API
{
    public class Startup
    {
        private readonly ILogger log;

        public Startup(ILoggerFactory logFactory)
        {
            this.log = logFactory.Create("Startup");
        }

        public void Configuration(IAppBuilder builder)
        {
            this.log.WriteWarning("Configuration started");

            var httpConfig = new HttpConfiguration();
            httpConfig.MapHttpAttributeRoutes();
            builder.UseWebApi(httpConfig);

            this.log.WriteWarning("Configuration finished");
        }
    }
}