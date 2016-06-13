namespace Zoo.API.Domain.Queries.Requests
{
    public class ZooRequest : GridRequest
    {
        public bool? isOpen { get; set; }
    }
}