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
        public void Getting_zoos_work()
        {
            var result = this.server.Get("zoo");
            Assert.True(result.Count > 0);

            dynamic zoo = result[0];
            var id = (int) zoo["Id"];
            Assert.True(id > 0);

            zoo = this.server.Get($"zoo/{id}");
            Assert.NotNull(zoo);
            Assert.Equal(id, zoo["Id"]);

            var animals = this.server.Get($"zoo/{id}/animals");
            Assert.NotNull(animals);
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