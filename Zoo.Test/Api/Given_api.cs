using System.Collections.Generic;
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
        public void Zoo_works()
        {
            var json = this.server.Get("zoo?pageSize=10") as ICollection<dynamic>;
            Assert.NotNull(json);
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