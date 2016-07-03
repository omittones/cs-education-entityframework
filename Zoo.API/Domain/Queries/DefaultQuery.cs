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

        protected virtual IQueryable<TView> ProcessRequest(TRequest request)
        {
            var inner = this.context
                .Set<TView>()
                .OrderBy(e => e.Id);
            if (request == null)
                return inner;
            else
                return request.ApplyTo(inner);
        }

        public virtual TView ResolveOne(TRequest request, int id)
        {
            var filtered = ProcessRequest(request);

            return filtered.FirstOrDefault(e => e.Id == id);
        }

        public virtual TView ResolveOne(int id)
        {
            var filtered = ProcessRequest(null);

            return filtered.FirstOrDefault(e => e.Id == id);
        }

        public virtual TView[] Resolve()
        {
            return ProcessRequest(null).ToArray();
        }

        public virtual TView[] Resolve(TRequest request)
        {
            var inner = ProcessRequest(request);

            return inner.ToArray();
        }
    }
}