using System.Linq;
using Zoo.API.Domain.Queries.Requests;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Queries
{
    public class BaseAnimalQuery
    {
        private readonly Context context;

        protected BaseAnimalQuery(Context context)
        {
            this.context = context;
        }

        protected IOrderedQueryable<Animal> ProcessRequest(AnimalRequest request)
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

            return animals.OrderBy(a => a.Id);
        }
    }
}