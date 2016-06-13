namespace Zoo.API.Domain
{
    public interface IService<in TModel>
    {
        void Save(int id, TModel model);

        int Create(TModel model);
    }
}