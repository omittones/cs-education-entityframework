using System.Collections.Generic;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;
using Zoo.API.Controllers;

namespace Zoo.API.Configuration
{
    public class RouteProvider : DefaultDirectRouteProvider
    {
        protected override IReadOnlyList<IDirectRouteFactory> GetActionRouteFactories(
            HttpActionDescriptor actionDescriptor)
        {
            //inherit route attributes decorated on base class controller's actions
            return actionDescriptor.GetCustomAttributes<IDirectRouteFactory>(inherit: true);
        }

        protected override string GetRoutePrefix(HttpControllerDescriptor controllerDescriptor)
        {
            //IRoutePrefix cannot be used becuase it does not have information about the type of entity
            if (controllerDescriptor.ControllerType.IsGenericType)
            {
                var genericType = controllerDescriptor.ControllerType.GetGenericTypeDefinition();
                if (genericType == typeof (DefaultController<>))
                {
                    var entity = controllerDescriptor.ControllerType.GetGenericArguments()[0];
                    return "api/" + entity.Name.ToLower();
                }
            }

            return base.GetRoutePrefix(controllerDescriptor);
        }
    }
}