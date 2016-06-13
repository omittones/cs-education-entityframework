using System.Linq;
using Zoo.Entity.Model;

namespace Zoo.API.Domain
{
    public class DefaultQuery<TRequest, TView> : IQuery<TRequest, TView>
        where TView : Root
        where TRequest : GridRequest
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
            return this.context.Set<TView>()
                .Skip(request.page*request.pageSize)
                .Take(request.pageSize)
                .ToArray();
        }
    }
}