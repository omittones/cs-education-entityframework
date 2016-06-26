using System.Linq;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class DefaultQuery<TRequest, TView> : IQuery<TRequest, TView>
        where TRequest : GridRequest
        where TView : Root
    {
        private readonly Context context;

        public DefaultQuery(Context context)
        {
            this.context = context;
        }

        public virtual TView ResolveOne(int id)
        {
            return this.context.Set<TView>()
                .FirstOrDefault(e => e.Id == id);
        }

        public virtual TView[] Resolve()
        {
            return this.context.Set<TView>().ToArray();
        }

        public virtual TView[] Resolve(TRequest request)
        {
            var inner = this.context.Set<TView>().OrderBy(e => e.Id);
            return request
                .ApplyTo(inner)
                .ToArray();
        }
    }
}