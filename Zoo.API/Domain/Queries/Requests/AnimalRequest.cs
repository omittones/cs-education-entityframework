namespace Zoo.API.Domain.Queries.Requests
{
    public class AnimalRequest : GridRequest
    {
        public int? belongsToZooId { get; set; }

        public AnimalRequest()
        {
        }

        public AnimalRequest(GridRequest request)
        {
            this.page = request.page;
            this.pageSize = request.pageSize;
        }
    }
}