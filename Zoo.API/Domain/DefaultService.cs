using System;
using Zoo.Entity.Model;

namespace Zoo.API.Domain
{
    public class DefaultService<TModel> : IService<TModel>
        where TModel : Root
    {
        private readonly Context context;

        public DefaultService(Context context)
        {
            this.context = context;
        }

        public virtual void Save(int id, TModel model)
        {
            var entity = this.context.Set<TModel>().Find(id);

            if (entity == null)
                throw new ArgumentException($"{typeof (TModel).Name} with Id={id} not found!", nameof(id));

            AutoMapper.Mapper.Map(model, entity);

            this.context.SaveChanges();
        }

        public virtual int Create(TModel model)
        {
            var entity = this.context.Set<TModel>().Create();
            this.context.Set<TModel>().Add(entity);

            AutoMapper.Mapper.Map<TModel, TModel>(model, entity);

            this.context.SaveChanges();

            return entity.Id;
        }
    }
}