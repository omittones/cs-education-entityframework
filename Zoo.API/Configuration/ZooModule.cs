using Autofac;
using Zoo.API.Controllers;
using Zoo.API.Domain;
using Zoo.API.Domain.Queries;
using Zoo.API.Domain.Services;
using Zoo.Entity.Model;

namespace Zoo.API.Configuration
{
    public class ZooModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.Register(c => Context.Connect("SampleZoo"))
                .AsSelf()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof (DefaultController<,,>))
                .InstancePerLifetimeScope()
                .AsSelf();

            builder.RegisterGeneric(typeof (DefaultController<>))
                .InstancePerLifetimeScope()
                .AsSelf();

            builder.RegisterGeneric(typeof (DefaultService<>))
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterGeneric(typeof (DefaultQuery<,>))
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ZooQuery>()
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ZooService>()
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ZooController>()
                .InstancePerLifetimeScope()
                .AsSelf();
        }
    }
}