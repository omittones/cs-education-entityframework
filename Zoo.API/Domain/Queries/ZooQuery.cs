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

        private IOrderedQueryable<Entity.Model.Zoo> ProcessRequest(ZooRequest request)
        {
            var inner = (IQueryable<Entity.Model.Zoo>) this.context.Set<Entity.Model.Zoo>();

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

        public ZooView[] Resolve(ZooRequest request)
        {
            var filtered = ProcessRequest(request);

            return Project(filtered).ToArray();
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
            return from zoo in query
                join admin in this.context.Set<ZooAdmin>() on zoo.Id equals admin.ZooId into admins
                join keeper in this.context.Set<ZooKeeper>() on zoo.Id equals keeper.ZooId into keepers
                let admin = admins.FirstOrDefault()
                select new ZooView
                {
                    Id = zoo.Id,
                    Name = zoo.Name,
                    NoAnimals = zoo.Animals.Count(),
                    NoKeepers = zoo.Keepers.Count(),
                    Managers = keepers.Select(m => new EmployeeView
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