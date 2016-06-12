using System;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using Owin;

namespace Zoo.API.Configuration
{
    public class ApiModule
    {
        public static IDisposable Configure(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

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
                }));

            app.UseWebApi(config);

            return config;
        }
    }
}