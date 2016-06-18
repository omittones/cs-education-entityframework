using System;
using System.Linq;
using System.Collections.Generic;
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

            builder.RegisterModule(new ZooModule());

            builder.RegisterType<ControllerSelector>()
                .WithParameter("configuration", config)
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterApiControllers();
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterWebApiModelBinderProvider();

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            ConfigureRoutes(container, config);

            ConfigureFormatters(config);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
        }

        private static void ConfigureRoutes(IContainer container, HttpConfiguration config)
        {
            var types = container.Resolve<IList<Type>>();
            foreach (var type in types)
            {
                var routeTemplate = $"api/{type.Name.ToLower()}/{{id}}";
                if (config.Routes.All(r => r.RouteTemplate != routeTemplate))
                {
                    config.Routes.MapHttpRoute(
                        name: $"{type.Name}Route",
                        routeTemplate: routeTemplate,
                        defaults: new {id = RouteParameter.Optional, controller = "Default"});
                }
            }

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});
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