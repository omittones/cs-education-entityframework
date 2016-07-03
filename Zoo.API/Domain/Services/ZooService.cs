using System;
using System.Linq;
using Zoo.API.Domain.Services.Command;
using Zoo.Entity.Model;

namespace Zoo.API.Domain.Services
{
    public class ZooService : IService<EditZooCommand>
    {
        private readonly Context context;

        public ZooService(Context context)
        {
            this.context = context;
        }

        public void Save(int id, EditZooCommand command)
        {
            var model = this.context
                .Set<Entity.Model.Zoo>()
                .FirstOrDefault(z => z.Id == id);

            if (model == null)
                throw new ApplicationException("Zoo not found!");

            model.Name = command.Name;

            this.context.SaveChanges();
        }

        public int Create(EditZooCommand command)
        {
            var entity = this.context.Set<Entity.Model.Zoo>().Create();
            this.context.Set<Entity.Model.Zoo>().Add(entity);

            entity.Name = command.Name;

            entity.Id = GetNextId();

            this.context.SaveChanges();

            return entity.Id;
        }

        internal int GetNextId()
        {
            var maxId = this.context.Set<Entity.Model.Zoo>().Select(z => (int?) z.Id)
                .Union(this.context.Set<DemolishedZoo>().Select(z => (int?) z.Id))
                .Max();

            return maxId.GetValueOrDefault(0) + DateTime.Now.Millisecond;
        }
    }
}