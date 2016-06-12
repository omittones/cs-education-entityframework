using Xunit.Abstractions;

namespace Zoo.Test.Log
{
    public class XUnitLogger : ILogger
    {
        private readonly ITestOutputHelper testoutput;

        public XUnitLogger(ITestOutputHelper testoutput)
        {
            this.testoutput = testoutput;
        }

        public void Debug(string message, params object[] args)
        {
            this.testoutput.WriteLine(message, args);
        }

        public void Info(string message, params object[] args)
        {
            this.testoutput.WriteLine(message, args);
        }

        public void Warn(string message, params object[] args)
        {
            this.testoutput.WriteLine(message, args);
        }

        public void Error(string message, params object[] args)
        {
            this.testoutput.WriteLine(message, args);
        }

        public void Fatal(string message, params object[] args)
        {
            this.testoutput.WriteLine(message, args);
        }

        public void Debug(string message)
        {
            this.testoutput.WriteLine(message);
        }

        public void Info(string message)
        {
            this.testoutput.WriteLine(message);
        }

        public void Warn(string message)
        {
            this.testoutput.WriteLine(message);
        }

        public void Error(string message)
        {
            this.testoutput.WriteLine(message);
        }

        public void Fatal(string message)
        {
            this.testoutput.WriteLine(message);
        }
    }
}