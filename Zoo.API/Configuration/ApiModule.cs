using System.Web.Http;
using Owin;
using Autofac;
using Autofac.Integration.WebApi;

namespace Zoo.API.Configuration
{
    public static class ApiModule
    {
        public static void Configure(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            var config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});

            ConfigureFormatters(config);

            builder.RegisterModule(new ZooModule());

            builder.Register(c => new ControllerSelector(new[]
            {
                typeof (Entity.Model.Animal),
                typeof (Entity.Model.Zoo),
                typeof (Entity.Model.Employee),
                typeof (Entity.Model.User),
                typeof (Entity.Model.Bird),
                typeof (Entity.Model.Cage)
            }, config))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterApiControllers();
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterWebApiModelBinderProvider();

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
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