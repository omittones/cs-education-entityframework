using System;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using Owin;

namespace Zoo.API.Configuration
{
    public static class ApiModule
    {
        public static IDisposable Configure(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

            ConfigureFormatters(config);

            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});

            config.Services.Replace(typeof (IHttpControllerSelector), new ControllerSelector(
                new[]
                {
                    typeof (Entity.Model.Zoo),
                    typeof (Entity.Model.Employee),
                    typeof (Entity.Model.User),
                    typeof (Entity.Model.Animal)
                }, config));

            app.UseWebApi(config);

            return config;
        }

        private static void ConfigureFormatters(HttpConfiguration config)
        {
            var json = config.Formatters.JsonFormatter;
            var xml = config.Formatters.XmlFormatter;
            config.Formatters.Remove(xml);

            json.UseDataContractJsonSerializer = false;
        }
    }
}