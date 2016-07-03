using System.Linq;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class AnimalQuery : BaseAnimalQuery,
        IQuery<AnimalRequest, AnimalView>
    {
        private readonly Context context;

        public AnimalQuery(Context context) : base(context)
        {
            this.context = context;
        }

        protected virtual IQueryable<AnimalView> Project(IQueryable<Animal> query)
        {
            return from a in query
                select new AnimalView
                {
                    Id = a.Id
                };
        }

        public AnimalView ResolveOne(AnimalRequest request, int id)
        {
            var inner = ProcessRequest(request)
                .Where(e => e.Id == id);
            var views = this.Project(inner);
            return views.FirstOrDefault();
        }

        public AnimalView ResolveOne(int id)
        {
            var inner = from a in this.context.Set<Animal>()
                where a.Id == id
                select a;
            return Project(inner).FirstOrDefault();
        }

        public AnimalView[] Resolve()
        {
            var inner = from a in this.context.Set<Animal>()
                select a;
            return Project(inner).ToArray();
        }

        public AnimalView[] Resolve(AnimalRequest request)
        {
            var inner = ProcessRequest(request);
            var views = Project(inner)
                .OrderBy(e => e.Id);
            return request.ApplyTo(views).ToArray();
        }
    }
}