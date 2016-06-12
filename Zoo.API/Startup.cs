using System.Web.Http;
using Microsoft.Owin.Logging;
using Owin;
using Zoo.API.Configuration;

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

            ApiModule.Configure(builder);

            this.log.WriteWarning("Configuration finished");
        }
    }
}