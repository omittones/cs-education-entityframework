using System.Reflection;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace Zoo.Entity.XUnit
{
    public class BDDFramework : XunitTestFramework
    {
        public BDDFramework(IMessageSink messageSink) : base(messageSink)
        {
            this.SourceInformationProvider = new NullSourceInformationProvider();
        }

        protected override ITestFrameworkDiscoverer CreateDiscoverer(IAssemblyInfo assemblyInfo)
        {
            return new Discoverer(assemblyInfo, this.SourceInformationProvider, this.DiagnosticMessageSink);
        }

        protected override ITestFrameworkExecutor CreateExecutor(AssemblyName assemblyName)
        {
            return new Executor(assemblyName, this.SourceInformationProvider, this.DiagnosticMessageSink);
        }
    }
}