using System;
using System.Diagnostics;
using System.Reflection;
using InheritBDD.xUnit;
using Xunit;

[assembly: TestFramework(Framework.TypeName, Framework.AssemblyName)]

namespace Zoo.Test
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            SelfHostedRunner.MaxThreadCount = 1;
            SelfHostedRunner.RunAll(Assembly.GetExecutingAssembly());

            if (Debugger.IsAttached)
            {
                Console.WriteLine("Press any key to continue...");
                Console.ReadLine();
            }
        }
    }
}