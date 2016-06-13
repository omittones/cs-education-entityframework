using System;
using Microsoft.Owin.Hosting;
using Newtonsoft.Json.Linq;
using RestSharp;
using Zoo.API;

namespace Zoo.Test.Api
{
    public class ServerFixture : IDisposable
    {
        private readonly Random random;
        private readonly int port;
        private readonly IDisposable server;
        private RestClient client;

        public ServerFixture()
        {
            this.random = new Random(DateTime.Now.Millisecond);
            this.port = random.Next(10000, 20000);
            this.server = WebApp.Start<Startup>($"http://localhost:{this.port}");
            this.client = new RestSharp.RestClient($"http://localhost:{this.port}/api");
        }

        public dynamic Get(string url)
        {
            return this.client.Get<dynamic>(new RestRequest(url, Method.GET)
            {
            }).Data;
        }

        public void Dispose()
        {
            this.server.Dispose();
        }
    }
}