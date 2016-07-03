using System.Data.Entity;
using System.Data.SqlClient;
using Zoo.Entity.Model.Maps;
using Zoo.Entity.Model.Maps.AnimalHierarchy;
using Zoo.Entity.Model.Maps.AnimalHierarchy.PrimateHierarchy;
using Zoo.Entity.Model.Maps.BirdHierarchy;
using Zoo.Entity.Model.Maps.ReqsHierarchy;
using Zoo.Entity.Model.Maps.ZooHierarchy;

namespace Zoo.Entity.Model
{
    public class Context : DbContext
    {
        public static Context Connect(string db)
        {
            return Create(db, false);
        }

        public static Context ResetAndConnect(string db)
        {
            return Create(db, true);
        }

        private static Context Create(string db, bool clean)
        {
            var context = Create(db);

            if (clean)
            {
                var sql = $"ALTER DATABASE {context.Database.Connection.Database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE;";
                context.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, sql);
                context.Database.Delete();
                context.Database.Create();
            }

            //runs database initializer which was setup at the start of program
            context.Database.Initialize(false);

            return context;
        }

        private static Context Create(string db)
        {
            var builder = new SqlConnectionStringBuilder();
            builder.IntegratedSecurity = true;
            builder.DataSource = "localhost";
            builder.InitialCatalog = db;
            builder.ConnectTimeout = 5;

            return new Context(builder.ToString());
        }

        private Context(string connString) : base(connString)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new EmployeeMap());
            modelBuilder.Configurations.Add(new EmployeeExtraMap());
            modelBuilder.Configurations.Add(new UserMap());

            modelBuilder.Configurations.Add(new AnimalMap());
            modelBuilder.Configurations.Add(new WeaselMap());
            modelBuilder.Configurations.Add(new ZooMap());
            modelBuilder.Configurations.Add(new ClosedZooMap());
            modelBuilder.Configurations.Add(new DemolishedZooMap());
            modelBuilder.Configurations.Add(new CageMap());
            modelBuilder.Configurations.Add(new ZooManagementMap());
            modelBuilder.Configurations.Add(new ZooKeeperMap());
            modelBuilder.Configurations.Add(new ZooKeeperHelperMap());
            modelBuilder.Configurations.Add(new ZooAdminMap());
            modelBuilder.Configurations.Add(new FerretMap());
            modelBuilder.Configurations.Add(new PrimateMap());
            modelBuilder.Configurations.Add(new ApeMap());
            modelBuilder.Configurations.Add(new ChimpanzeeMap());
            modelBuilder.Configurations.Add(new MartenMap());

            modelBuilder.Configurations.Add(new BirdMap());
            modelBuilder.Configurations.Add(new ChickenMap());
            modelBuilder.Configurations.Add(new FowlMap());
            modelBuilder.Configurations.Add(new HawkChickenHunterMap());
            modelBuilder.Configurations.Add(new HawkMouseHunterMap());
            modelBuilder.Configurations.Add(new HawkDetailsMap());

            modelBuilder.Configurations.Add(new ReqOneMap());
            modelBuilder.Configurations.Add(new ReqTwoMap());
            modelBuilder.Configurations.Add(new DependentMap());
        }
    }
}