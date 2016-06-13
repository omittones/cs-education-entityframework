namespace Zoo.API.Domain
{
    public interface IQuery<in TInput, out TOutput> : IQuery<TOutput>
    {
        TOutput[] Resolve(TInput request);
    }

    public interface IQuery<out TOutput>
    {
        TOutput ResolveOne(int id);

        TOutput[] Resolve();
    }
}