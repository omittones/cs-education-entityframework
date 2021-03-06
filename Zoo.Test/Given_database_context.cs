﻿using System;
using System.Data.Entity;
using Xunit.Abstractions;
using Zoo.Entity.Model;
using Zoo.Test.Log;

namespace Zoo.Test
{
    public class Given_database_context : IDisposable
    {
        protected readonly ILogger log;
        protected readonly Context context;
        protected readonly DbContextTransaction transaction;
        protected readonly CountingDatabaseLogger databaseTracker;

        public Given_database_context(
            ITestOutputHelper output = null,
            bool recreate = false)
        {
            if (recreate)
            {
                Database.SetInitializer(new DropCreateDatabaseAlways<Context>());
            }
            else
            {
                Database.SetInitializer<Context>(null);
            }

            if (output != null)
                this.log = new XUnitLogger(output);
            else
                this.log = Logger.Root();

            this.context = Context.Connect("SampleZoo");
            this.transaction = this.context.Database.BeginTransaction(isolationLevel: System.Data.IsolationLevel.Serializable);
            this.databaseTracker = new CountingDatabaseLogger(this.context, this.log.ToDebug());
        }

        public void Dispose()
        {
            this.databaseTracker.Dispose();
            this.transaction.Rollback();
            this.transaction.Dispose();
            this.context.Dispose();
        }
    }
}