using System.Linq;

namespace Zoo.API.Domain.Queries
{
    public static class GridRequestExtensions
    {
        public static IQueryable<TView> ApplyTo<TView>(this GridRequest request, IOrderedQueryable<TView> query)
        {
            var page = request.page;
            var pageSize = request.pageSize;

            if (!page.HasValue)
                page = 0;
            if (!pageSize.HasValue)
                pageSize = int.MaxValue;

            return query
                .Skip(page.Value*pageSize.Value)
                .Take(pageSize.Value);
        }
    }
}