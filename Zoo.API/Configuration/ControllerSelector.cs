using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Zoo.API.Controllers;

namespace Zoo.API.Configuration
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class ControllerSelector : DefaultHttpControllerSelector
    {
        private readonly IList<Type> entityTypes;
        private readonly HttpConfiguration configuration;

        public ControllerSelector(
            IList<Type> entityTypes,
            HttpConfiguration configuration) : base(configuration)
        {
            this.entityTypes = entityTypes;
            this.configuration = configuration;
        }

        public override IDictionary<string, HttpControllerDescriptor> GetControllerMapping()
        {
            var controllers = base.GetControllerMapping();
            foreach (var entity in entityTypes)
            {
                var name = entity.Name;
                if (!controllers.ContainsKey(name))
                {
                    var info = new HttpControllerDescriptor(configuration, name,
                        typeof (DefaultController<>).MakeGenericType(entity));
                    controllers.Add(name, info);
                }
            }

            return controllers;
        }
    }
}