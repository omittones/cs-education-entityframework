using System.Reflection;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace Educ.Entity.XUnit
{
    internal class Executor : XunitTestFrameworkExecutor
    {
        public Executor(
            AssemblyName assemblyName,
            ISourceInformationProvider sourceInformationProvider,
            IMessageSink diagnosticMessageSink) : base(assemblyName, sourceInformationProvider, diagnosticMessageSink)
        {
        }

        protected override ITestFrameworkDiscoverer CreateDiscoverer()
        {
            return new Discoverer(this.AssemblyInfo, this.SourceInformationProvider, this.DiagnosticMessageSink);
        }
    }
}