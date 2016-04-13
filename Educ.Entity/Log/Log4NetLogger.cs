using log4net;

namespace Educ.Entity.Log
{
    public sealed class Log4NetLogger : ILogger
    {
        private readonly ILog logger;

        public Log4NetLogger(ILog logger)
        {
            this.logger = logger;
        }
       
        public void Info(string message, params object[] args)
        {
            logger.InfoFormat(message, args);
        }

        public void Debug(string message, params object[] args)
        {
            logger.DebugFormat(message, args);
        }

        public void Warn(string message, params object[] args)
        {
            logger.WarnFormat(message, args);
        }

        public void Error(string message, params object[] args)
        {
            logger.ErrorFormat(message, args);
        }

        public void Fatal(string message, params object[] args)
        {
            logger.FatalFormat(message, args);
        }

        public void Info(string message)
        {
            logger.InfoFormat(message);
        }

        public void Debug(string message)
        {
            logger.DebugFormat(message);
        }

        public void Error(string message)
        {
            logger.ErrorFormat(message);
        }

        public void Warn(string message)
        {
            logger.WarnFormat(message);
        }

        public void Fatal(string message)
        {
            logger.FatalFormat(message);
        }
    }
}