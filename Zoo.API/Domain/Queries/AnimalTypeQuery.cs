using System.Linq;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class AnimalTypeQuery : BaseAnimalQuery,
        IQuery<AnimalRequest, AnimalTypeView>
    {
        private readonly Context context;

        public AnimalTypeQuery(Context context) : base(context)
        {
            this.context = context;
        }

        protected virtual IQueryable<AnimalTypeView> Project(IQueryable<Animal> query)
        {
            return from a in query
                select new AnimalTypeView
                {
                    Id = a.Id,
                    Name = "N/A",
                    Type = ""
                };
        }

        public AnimalTypeView[] Resolve(AnimalRequest request)
        {
            var inner = ProcessRequest(request);
            return Project(inner).ToArray();
        }

        public AnimalTypeView ResolveOne(AnimalRequest request, int id)
        {
            var inner = ProcessRequest(request)
                .Where(e => e.Id == id);
            var views = this.Project(inner);
            return views.FirstOrDefault();
        }

        public AnimalTypeView ResolveOne(int id)
        {
            var inner = from a in this.context.Set<Animal>()
                where a.Id == id
                select a;
            return Project(inner).FirstOrDefault();
        }

        public AnimalTypeView[] Resolve()
        {
            var inner = from a in this.context.Set<Animal>()
                select a;
            return Project(inner).ToArray();
        }
    }
}