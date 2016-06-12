using System.Linq;
using System.Reflection;
using log4net;
using log4net.Config;

namespace Zoo.Entity.Log
{
    public static class Logger
    {
        private static bool isDebugMode;
        private static ILogger overridingLogger;

        static Logger()
        {
            Configure();
        }

        public static void Configure()
        {
            var name = Assembly
                .GetExecutingAssembly()
                .GetManifestResourceNames()
                .First(n => n.EndsWith("log4net.config.xml"));
            var xml_config_stream = Assembly.GetExecutingAssembly()
                .GetManifestResourceStream(name);
            XmlConfigurator.Configure(xml_config_stream);
        }

        public static void SetDebugMode()
        {
            isDebugMode = true;
        }

        public static void OverrideLogger(ILogger instance)
        {
            overridingLogger = instance;
        }

        public static ILogger Root()
        {
            return For(null);
        }

        public static ILogger For(object @object = null)
        {
            if (overridingLogger == null)
            {
                string logName = string.Empty;
                if (@object != null)
                    logName = @object.ToString();

                var log = LogManager.GetLogger(logName);
                var logger = (log4net.Repository.Hierarchy.Logger) log.Logger;
                if (isDebugMode)
                {
                    logger.Level = log4net.Core.Level.Debug;
                }

                return new Log4NetLogger(log);
            }

            return overridingLogger;
        }
    }
}