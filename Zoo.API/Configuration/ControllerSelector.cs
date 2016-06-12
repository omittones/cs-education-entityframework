using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Zoo.API.Controllers;

namespace Zoo.API.Configuration
{
    public class ControllerSelector : IHttpControllerSelector
    {
        private readonly IList<Type> entityTypes;

        public ControllerSelector(IList<Type> entityTypes)
        {
            this.entityTypes = entityTypes;
        }

        public HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            var selectedController = request.GetRouteData().Values["controller"].ToString();

            var entityType = entityTypes.FirstOrDefault(t => t.Name.ToLower() == selectedController.ToLower());
            if (entityType != null)
            {
                return new HttpControllerDescriptor(request.GetConfiguration(),
                    selectedController + "Controller",
                    typeof (DefaultController<>).MakeGenericType(entityType));
            }

            return null;
        }

        public IDictionary<string, HttpControllerDescriptor> GetControllerMapping()
        {
            return null;
        }
    }
}