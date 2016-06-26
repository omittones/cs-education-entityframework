using System;
using System.Collections.Generic;
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

            builder.RegisterInstance(
                new[]
                {
                    typeof (Animal),
                    typeof (Entity.Model.Zoo),
                    typeof (Employee),
                    typeof (User),
                    typeof (Bird),
                    typeof (Cage)
                }).As<IList<Type>>()
                .SingleInstance();


            builder.RegisterGeneric(typeof (DefaultController<,,>))
                .InstancePerLifetimeScope()
                .AsSelf();

            builder.RegisterGeneric(typeof (DefaultController<>))
                .InstancePerLifetimeScope()
                .AsSelf();

            builder.RegisterGeneric(typeof (DefaultService<>))
                .InstancePerLifetimeScope()
                .As(typeof (IService<>));

            builder.RegisterGeneric(typeof (DefaultQuery<,>))
                .InstancePerLifetimeScope()
                .As(typeof (IQuery<,>));

            builder.RegisterType<ZooQuery>()
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<AnimalQuery>()
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ZooService>()
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ZooController>()
                .InstancePerLifetimeScope()
                .AsSelf();

            builder.RegisterType<AnimalController>()
                .InstancePerLifetimeScope()
                .AsSelf();
        }
    }
}