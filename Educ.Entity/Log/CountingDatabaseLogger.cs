using System;
using System.Data.Entity;

namespace Educ.Entity.Log
{
    public class CountingDatabaseLogger : IDisposable
    {
        public bool ShowOutput { get; set; }
        public int Count { get; private set; }
        
        private readonly DbContext context;
        private readonly LoggerHelper writer;

        public CountingDatabaseLogger(DbContext context, LoggerHelper writer)
        {
            this.ShowOutput = true;

            this.context = context;
            this.writer = writer;

            context.Database.Log = s =>
            {
                s = s.Trim();
                if (s.Length > 0)
                {
                    if (s.StartsWith("--"))
                    {
                        if (ShowOutput)
                            writer.Text(s.Trim());
                    }
                    else
                    {
                        this.Count++;

                        if (ShowOutput)
                        {
                            writer.Text("");
                            writer.H3("SQL COMMAND");
                            writer.Text(s);
                        }
                    }
                }
            };
        }

        public void ResetCount()
        {
            this.Count = 0;
        }

        public int ReturnAndResetCount()
        {
            var value = this.Count;
            this.Count = 0;
            return value;
        }

        public void Dispose()
        {
            context.Database.Log = null;
        }
    }
}