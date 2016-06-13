using System;
using System.Linq;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Default
{
    public class SimpleService<TModel> : IService<TModel>
        where TModel : class, IIdentifiable
    {
        private readonly Context context;

        public SimpleService(Context context)
        {
            this.context = context;
        }

        public void Save(int id, TModel model)
        {
            var entity = this.context.Set<TModel>().Find(id);

            if (entity == null)
                throw new ArgumentException($"{typeof (TModel).Name} with Id={id} not found!", nameof(id));

            //TODO - map to original

            this.context.SaveChanges();
        }

        public int Create(TModel model)
        {
            var entity = this.context.Set<TModel>().Add(model);

            this.context.SaveChanges();

            return entity.Id;
        }
    }
}