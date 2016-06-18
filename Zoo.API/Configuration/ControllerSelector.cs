using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

        public ControllerSelector(
            IList<Type> entityTypes,
            HttpConfiguration configuration) : base(configuration)
        {
            this.entityTypes = entityTypes;
        }

        public override HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            var info = base.SelectController(request);
            if (info.ControllerType == typeof (DefaultController))
            {

            }

            return info;
        }
    }
}