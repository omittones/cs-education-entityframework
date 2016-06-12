using System;
using Microsoft.Owin.Hosting;

namespace Zoo.API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            using (WebApp.Start<Startup>("http://localhost:8080"))
            {
                while (Console.ReadLine() != "quit") ;
            }
        }
    }
}
