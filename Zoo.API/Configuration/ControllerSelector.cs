using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Zoo.API.Controllers;

namespace Zoo.API.Configuration
{
    public class ControllerSelector : DefaultHttpControllerSelector
    {
        private readonly IList<Type> entityTypes;

        public ControllerSelector(IList<Type> entityTypes, HttpConfiguration configuration) : base(configuration)
        {
            this.entityTypes = entityTypes;
        }

        public override HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            try
            {
                var info = base.SelectController(request);
                return info;
            }
            catch (Exception)
            {
                var controllerName = GetControllerName(request).ToLower();

                var entity = this.entityTypes.FirstOrDefault(e => e.Name.ToLower() == controllerName);
                if (entity == null)
                    throw;

                return new HttpControllerDescriptor(request.GetConfiguration(), controllerName,
                    typeof (DefaultController<>).MakeGenericType(entity));
            }
        }
    }
}