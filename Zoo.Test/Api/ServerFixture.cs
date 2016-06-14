using System;
using Microsoft.Owin.Hosting;
using RestSharp;
using Zoo.API;

namespace Zoo.Test.Api
{
    public class ServerFixture : IDisposable
    {
        private readonly Random random;
        private readonly int port;
        private readonly IDisposable server;
        private readonly RestClient client;

        public ServerFixture()
        {
            this.random = new Random(DateTime.Now.Millisecond);
            this.port = random.Next(10000, 20000);
            this.server = WebApp.Start<Startup>($"http://localhost:{this.port}");
            this.client = new RestClient($"http://localhost:{this.port}/api");
        }

        public dynamic Get(string url)
        {
            var request = new RestRequest(url, Method.GET);
            return this.client.Get<dynamic>(request).Data;
        }

        public dynamic Post(string url, object model)
        {
            var request = new RestRequest(url, Method.POST);
            request.AddJsonBody(model);
            return this.client.Post<dynamic>(request).Data;
        }

        public void Dispose()
        {
            this.server.Dispose();
        }
    }
}