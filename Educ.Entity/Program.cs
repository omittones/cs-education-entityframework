using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Educ.Entity.XUnit;
using Should;
using Xunit;

[assembly: TestFramework("Educ.Entity.XUnit.BDDFramework", "Educ.Entity")]

namespace Educ.Entity
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