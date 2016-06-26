using System.Linq;
using Zoo.API.Domain.Queries.Requests;
using Zoo.API.Domain.Queries.Views;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class AnimalQuery :
        IQuery<AnimalRequest, AnimalTypeView>,
        IQuery<AnimalRequest, AnimalView>
    {
        private readonly Context context;

        public AnimalQuery(Context context)
        {
            this.context = context;
        }

        private IQueryable<AnimalView> ProjectToAnimal(IQueryable<Animal> query)
        {
            return from a in query
                select new AnimalView
                {
                    Id = a.Id
                };
        }

        private IQueryable<AnimalTypeView> ProjectToAnimalType(IQueryable<Animal> query)
        {
            return from a in query
                select new AnimalTypeView
                {
                    Id = a.Id,
                    Name = "N/A",
                    Type = ""
                };
        }

        private IQueryable<Animal> ProcessRequest(AnimalRequest request)
        {
            IQueryable<Animal> animals;
            if (request.belongsToZooId.HasValue)
            {
                animals = from zoo in this.context.Set<Entity.Model.Zoo>()
                    from a in zoo.Animals
                    where zoo.Id == request.belongsToZooId.Value
                    select a;
            }
            else
            {
                animals = from a in this.context.Set<Animal>()
                    select a;
            }

            return request.ApplyTo(animals.OrderBy(a => a.Id));
        }

        public AnimalTypeView[] Resolve(AnimalRequest request)
        {
            var inner = ProcessRequest(request);
            return ProjectToAnimalType(inner).ToArray();
        }

        public AnimalTypeView ResolveOne(int id)
        {
            var inner = from a in this.context.Set<Animal>()
                where a.Id == id
                select a;
            return ProjectToAnimalType(inner).FirstOrDefault();
        }

        public AnimalTypeView[] Resolve()
        {
            var inner = from a in this.context.Set<Animal>()
                select a;
            return ProjectToAnimalType(inner).ToArray();
        }

        AnimalView IQuery<AnimalRequest, AnimalView>.ResolveOne(int id)
        {
            var inner = from a in this.context.Set<Animal>()
                where a.Id == id
                select a;
            return ProjectToAnimal(inner).FirstOrDefault();
        }

        AnimalView[] IQuery<AnimalRequest, AnimalView>.Resolve()
        {
            var inner = from a in this.context.Set<Animal>()
                select a;
            return ProjectToAnimal(inner).ToArray();
        }

        AnimalView[] IQuery<AnimalRequest, AnimalView>.Resolve(AnimalRequest request)
        {
            var inner = ProcessRequest(request);

            return ProjectToAnimal(inner).ToArray();
        }
    }
}