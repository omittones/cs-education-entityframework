namespace Zoo.Test.Log
{
    public interface ILogger
    {
        void Debug(string message, params object[] args);
        void Info(string message, params object[] args);
        void Warn(string message, params object[] args);
        void Error(string message, params object[] args);
        void Fatal(string message, params object[] args);
        void Info(string message);
        void Debug(string message);
        void Error(string message);
        void Warn(string message);
        void Fatal(string message);
    }
}