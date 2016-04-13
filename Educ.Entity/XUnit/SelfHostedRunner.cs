using System;
using System.Reflection;
using Xunit;
using Xunit.ConsoleClient;
using Xunit.Sdk;

namespace Educ.Entity.XUnit
{
    public static class SelfHostedRunner
    {
        private static readonly object consoleLock = new object();

        static SelfHostedRunner()
        {
            MaxThreadCount = 1;
        }

        public static int MaxThreadCount { get; set; }

        public static int RunAll(Assembly assembly)
        {
            var logger = new StandardOutputVisitor(consoleLock, false,
                Environment.CurrentDirectory, null, () => false);

            var xassembly = new ReflectionAssemblyInfo(assembly);

            var discoveryOptions = TestFrameworkOptions.ForDiscovery();
            discoveryOptions.SetSynchronousMessageReporting(true);
            discoveryOptions.SetDiagnosticMessages(true);

            var executionOptions = TestFrameworkOptions.ForExecution();
            executionOptions.SetSynchronousMessageReporting(true);
            executionOptions.SetDiagnosticMessages(true);
            executionOptions.SetMaxParallelThreads(MaxThreadCount);
            executionOptions.SetDisableParallelization(MaxThreadCount <= 1);

            XunitFrontController controller = new XunitFrontController(xassembly.AssemblyPath,
                shadowCopy: false,
                diagnosticMessageSink: logger);

            controller.RunAll(logger, discoveryOptions, executionOptions);

            return 0;
        }
    }
}