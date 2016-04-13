using System;

namespace Educ.Entity.Log
{
    public static class LoggerExtension
    {
        private static LoggerHelper createHelper(Action<string> output)
        {
            try
            {
                return new LoggerHelper(output, Console.WindowWidth);
            }
            catch
            {
                return new LoggerHelper(output, 80);
            }
        }

        public static LoggerHelper ToDebug(this ILogger log)
        {
            return createHelper(log.Debug);
        }

        public static LoggerHelper ToInfo(this ILogger log)
        {
            return createHelper(log.Info);
        }

        public static LoggerHelper ToError(this ILogger log)
        {
            return createHelper(log.Error);
        }

        public static LoggerHelper ToWarn(this ILogger log)
        {
            return createHelper(log.Warn);
        }

        public static LoggerHelper ToFatal(this ILogger log)
        {
            return createHelper(log.Fatal);
        }
    }
}