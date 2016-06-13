using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using Zoo.API.Controllers;

namespace Zoo.API.Configuration
{
    public class ControllerSelector : IHttpControllerSelector
    {
        private readonly IList<Type> entityTypes;
        private readonly HttpConfiguration configuration;
        private readonly Lazy<IDictionary<string, HttpControllerDescriptor>> controllerMappings;

        public ControllerSelector(IList<Type> entityTypes,
            HttpConfiguration configuration)
        {
            this.entityTypes = entityTypes;
            this.configuration = configuration;

            this.controllerMappings = new Lazy<IDictionary<string, HttpControllerDescriptor>>(
                InitializeCache);
        }

        private IDictionary<string, HttpControllerDescriptor> InitializeCache()
        {
            return this.entityTypes
                .Select(type => CreateDefaultDescriptor(this.configuration, type))
                .ToDictionary(info => info.ControllerName, info => info);
        }

        protected virtual HttpControllerDescriptor CreateDefaultDescriptor(
            HttpConfiguration config,
            Type entityType)
        {
            return new HttpControllerDescriptor(config, (entityType.Name + "Controller").ToLower(),
                typeof (DefaultController<,>).MakeGenericType(entityType, entityType));
        }

        public HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            var selectedController = request.GetRouteData().Values["controller"].ToString();

            var controllerName = (selectedController + "Controller").ToLower();

            HttpControllerDescriptor info;
            if (this.controllerMappings.Value.TryGetValue(controllerName, out info))
            {
                return CreateDefaultDescriptor(request.GetConfiguration(), info.ControllerType.GenericTypeArguments[0]);
            }

            var message = $"Controller for '{selectedController}' not found!";
            throw new HttpResponseException(request.CreateErrorResponse(HttpStatusCode.NotFound, message,
                new Exception(message)));
        }

        public IDictionary<string, HttpControllerDescriptor> GetControllerMapping()
        {
            return controllerMappings.Value;
        }
    }
}