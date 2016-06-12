using System.Collections.Generic;
using Xunit.Abstractions;
using Xunit.Sdk;

namespace Zoo.Entity.XUnit
{
    internal class ExtendedFactDiscoverer : IXunitTestCaseDiscoverer
    {
        private readonly IXunitTestCaseDiscoverer inner;

        public IMessageSink DiagnosticMessageSink { get; set; }

        public ExtendedFactDiscoverer(IXunitTestCaseDiscoverer inner)
        {
            this.inner = inner;
            this.DiagnosticMessageSink = new NullMessageSink();
        }

        public IEnumerable<IXunitTestCase> Discover(
            ITestFrameworkDiscoveryOptions discoveryOptions,
            ITestMethod testMethod,
            IAttributeInfo factAttribute)
        {
            foreach (var test in this.inner.Discover(discoveryOptions, testMethod, factAttribute))
            {
                yield return new ExtendedFact(this.DiagnosticMessageSink, test, factAttribute);
            }
        }
    }
}