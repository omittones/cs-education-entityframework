namespace Zoo.API.Domain.Queries.Requests
{
    public class AnimalRequest : GridRequest
    {
        public int? belongsToZooId { get; set; }
    }
}