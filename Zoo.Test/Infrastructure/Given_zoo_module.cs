using System;
using Autofac;
using Xunit;
using Zoo.API.Configuration;
using Zoo.API.Controllers;
using Zoo.API.Domain;
using Zoo.Entity.Model;

namespace Zoo.Test.Infrastructure
{
    public class Given_zoo_module : IDisposable
    {
        private readonly IContainer container;

        public Given_zoo_module()
        {
            var builder = new ContainerBuilder();

            builder.RegisterModule(new ZooModule());

            this.container = builder.Build();
        }

        [Fact]
        public void Services_should_work()
        {
            var a = this.container.Resolve<IService<Animal>>();
            Assert.NotNull(a);

            var b = this.container.Resolve<IQuery<GridRequest, Animal>>();
            Assert.NotNull(b);
        }

        [Fact]
        public void Default_controllers_should_work()
        {
            var a = this.container.Resolve<DefaultController<Animal>>();
            Assert.NotNull(a);

            var b = this.container.Resolve<DefaultController<Animal, GridRequest, Animal>>();
            Assert.NotNull(b);
        }

        public void Dispose()
        {
            this.container.Dispose();
        }
    }
}