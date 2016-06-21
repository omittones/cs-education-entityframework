using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Routing;
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

            builder.RegisterType<RouteProvider>()
                .AsImplementedInterfaces()
                .SingleInstance();

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
            var provider = container.Resolve<IDirectRouteProvider>();

            config.MapHttpAttributeRoutes(provider);
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