using Xunit;

namespace Zoo.Test.Api
{
    public class Given_api : IClassFixture<ServerFixture>
    {
        private readonly ServerFixture server;

        public Given_api(ServerFixture server)
        {
            this.server = server;
        }

        [Fact]
        public void Creating_zoo_works()
        {
            var result = this.server.Post("zoo",
                new
                {
                    name = "Petting zoo"
                });

            Assert.Equal("Petting zoo", result["Name"]);
        }

        [Fact]
        public void Version_works()
        {
            var json = this.server.Get("version");

            Assert.NotNull(json);

            Assert.Equal(0, (int) json["major"]);
        }
    }
}