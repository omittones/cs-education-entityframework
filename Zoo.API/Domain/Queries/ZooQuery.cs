using System.Linq;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class ZooQuery : IQuery<ZooRequest, ZooView>
    {
        private readonly Context context;

        public ZooQuery(Context context)
        {
            this.context = context;
        }

        public ZooView[] Resolve(ZooRequest request)
        {
            var filtered = ProcessRequest(request);

            return Project(filtered).ToArray();
        }

        private IOrderedQueryable<Entity.Model.Zoo> ProcessRequest(ZooRequest request)
        {
            var inner = this.context.Set<Entity.Model.Zoo>().AsQueryable();

            if (request.isOpen.HasValue && request.isOpen.Value)
            {
                inner = from i in inner
                    join d in this.context.Set<DemolishedZoo>() on i.Id equals d.Id into demolished
                    join c in this.context.Set<ClosedZoo>() on i.Id equals c.Id into closed
                    where !demolished.Any() && !closed.Any()
                    select i;
            }
            else if (request.isOpen.HasValue && !request.isOpen.Value)
            {
                inner = (from i in inner
                    join d in this.context.Set<DemolishedZoo>() on i.Id equals d.Id
                    select i).Union(
                        from i in inner
                        join c in this.context.Set<ClosedZoo>() on i.Id equals c.Id
                        select i);
            }

            return inner.OrderBy(e => e.Id);
        }

        public ZooView ResolveOne(ZooRequest request, int id)
        {
            var filtered = ProcessRequest(request);

            return Project(filtered).FirstOrDefault(e => e.Id == id);
        }

        public ZooView ResolveOne(int id)
        {
            return Project(this.context.Set<Entity.Model.Zoo>().Where(z => z.Id == id)).FirstOrDefault();
        }

        public ZooView[] Resolve()
        {
            return Project(this.context.Set<Entity.Model.Zoo>()).ToArray();
        }

        private IQueryable<ZooView> Project(IQueryable<Entity.Model.Zoo> query)
        {
            return from z in query
                let admin = z.Keepers.OfType<ZooAdmin>().FirstOrDefault()
                let managers = z.Keepers.OfType<ZooKeeper>()
                select new ZooView
                {
                    Id = z.Id,
                    Name = z.Name,
                    NoAnimals = z.Animals.Count(),
                    NoKeepers = z.Keepers.Count(),
                    Managers = managers.Select(m => new EmployeeView
                    {
                        Id = m.Id,
                        Name = m.Name + " " + m.Surrname,
                        NoKeys = m.NoKeys
                    }),
                    Admin = admin == null
                        ? null
                        : new EmployeeView
                        {
                            Id = admin.Id,
                            Name = admin.Name + " " + admin.Surrname,
                            NoKeys = admin.NoKeys
                        }
                };
        }
    }
}