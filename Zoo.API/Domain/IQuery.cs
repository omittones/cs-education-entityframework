namespace Zoo.API.Domain
{
    public interface IQuery<in TInput, out TOutput>
    {
        TOutput[] Resolve(TInput request);

        TOutput ResolveOne(TInput request, int id);

        TOutput ResolveOne(int id);

        TOutput[] Resolve();
    }
}