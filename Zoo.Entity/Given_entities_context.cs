using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zoo.Entity.Log;
using Zoo.Entity.Model;
using Zoo.Entity.Model.Maps;
using Should;
using Xunit;

namespace Zoo.Entity
{
    public class Given_entities_context : Given_database_context
    {
        public Given_entities_context() : base(recreate: false)
        {
        }

        [Fact(Skip = "not now")]
        public void Creation_should_work()
        {
            var reqone = context.Set<ReqOne>().Create();
            reqone.Dependent = new Dependent
            {
            };
            context.Set<ReqOne>().Add(reqone);
            context.SaveChanges();

            var user = context.Set<User>().Create();
            user.Gender = UserGender.Male;
            context.Set<User>().Add(user);

            var employee = context.Set<Employee>().Create();
            employee.Name = "John Man";
            employee.Extra = new EmployeeExtra
            {
            };
            context.Set<Employee>().Add(employee);
            context.SaveChanges();

            var zoo = context.Set<Zoo>().Create();
            zoo.Id = 1;
            zoo.Name = "Zoomanity";
            zoo.Animals = new List<Animal>();
            zoo.Keepers = new List<ZooKeeper>();
            context.Set<Zoo>().Add(zoo);

            var closedZoo = context.Set<ClosedZoo>().Create();
            closedZoo.Id = 2;
            closedZoo.Name = "Zoo Europa";
            closedZoo.ClosingDate = DateTime.Now;
            context.Set<ClosedZoo>().Add(closedZoo);

            var demolishedZoo = context.Set<DemolishedZoo>().Create();
            demolishedZoo.Id = 3;
            demolishedZoo.Name = "Zoo Magnifice";
            demolishedZoo.ClosingDate = DateTime.Now;
            demolishedZoo.DestructionDate = DateTime.Now;
            context.Set<DemolishedZoo>().Add(demolishedZoo);
            context.SaveChanges();

            var keeper = context.Set<ZooKeeper>().Create();
            keeper.Name = "Keeper";
            keeper.NoKeys = 2;
            context.Set<ZooKeeper>().Add(keeper);
            zoo.Keepers.Add(keeper);
            context.SaveChanges();

            var admin = context.Set<ZooAdmin>().Create();
            admin.Name = "Admin";
            admin.NoKeys = 4;
            admin.Handlebars = "mustache";
            context.Set<ZooAdmin>().Add(admin);
            zoo.Keepers.Add(admin);
            context.SaveChanges();

            var helper = context.Set<ZooKeeperHelper>().Create();
            helper.Name = "Helper";
            helper.Days = 10;
            context.Set<ZooKeeperHelper>().Add(helper);
            context.SaveChanges();

            var weasel = context.Set<Weasel>().Create();
            weasel.NoLairs = 1;
            weasel.Owner = null;
            weasel.DateOfBirth = DateTime.Now;
            weasel.Zoos = new List<Zoo>();
            context.Set<Weasel>().Add(weasel);
            context.SaveChanges();

            var ferret = context.Set<Ferret>().Create();
            ferret.Owner = null;
            ferret.DateOfBirth = DateTime.Now;
            ferret.Zoos = new List<Zoo>();
            ferret.FurValue = 1002.2F;
            context.Set<Ferret>().Add(ferret);
            context.SaveChanges();

            var marten = context.Set<Marten>().Create();
            marten.Owner = null;
            marten.DateOfBirth = DateTime.Now;
            marten.Zoos = new List<Zoo>();
            marten.FurValue = 2010.4F;
            marten.FurColor = "marten-red";
            context.Set<Marten>().Add(marten);
            context.SaveChanges();

            var ape = context.Set<Ape>().Create();
            ape.DateOfBirth = DateTime.Now;
            ape.Name = "Amy";
            ape.Trainer = employee;
            ape.Weight = 110.4;
            ape.Owner = user;
            ape.Zoos = new List<Zoo> { zoo };
            context.Set<Ape>().Add(ape);
            context.SaveChanges();

            var chimp = context.Set<Chimpanzee>().Create();
            chimp.ChimpFurColor = 4;
            chimp.DateOfBirth = DateTime.Now;
            chimp.NoChimpRelatives = 5;
            chimp.Name = "Cheetah";
            chimp.Trainer = employee;
            context.Set<Chimpanzee>().Add(chimp);
            context.SaveChanges();

            var chicken = context.Set<Chicken>().Create();
            chicken.CrestSize = 1;
            chicken.EggCount = 10;
            chicken.FeatherColor = "brown";
            context.Set<Chicken>().Add(chicken);
            context.SaveChanges();

            var fowl = context.Set<Fowl>().Create();
            fowl.CrestSize = 4;
            fowl.FeatherColor = "black-brown";
            context.Set<Fowl>().Add(fowl);
            context.SaveChanges();

            var hawk = context.Set<HawkChickenHunter>().Create();
            hawk.Details = new HawkDetails
            {
                Prey = "chickens",
                SoaringHeight = 100
            };
            context.Set<HawkChickenHunter>().Add(hawk);
            context.SaveChanges();
        }

        //[Fact]
        //public void Enums_should_convert_to_int_and_back()
        //{
        //    Creation_should_work();

        //    var employee = context.Set<Employee>().Create();
        //    employee.Name = "Jon Stewart";
        //    employee.OptionalDependentUser = context.Set<User>().First();
        //    context.Set<Employee>().Add(employee);
        //    context.SaveChanges();

        //    //enums can be converted to int, and back
        //    employee.OptionalDependentUser.Gender.ShouldEqual(UserGender.Male);

        //    employee.Id.ShouldBeGreaterThan(0);
        //    employee.OptionalDependentUser.ShouldNotBeNull();
        //    employee.OptionalDependentUser.Id.ShouldBeGreaterThan(0);
        //}

        [Fact]
        public void All_animals_should_work()
        {
            Creation_should_work();

            this.log.ToInfo().H3("All_animals_should_work");

            var zoos = (from x in context.Set<Zoo>()
                select new
                {
                    x.Id,
                    x.Name,
                    x.Animals.Count
                }).ToArray();

            this.log.ToInfo().Table(zoos);

            var keepers = (from x in context.Set<ZooKeeper>()
                select new
                {
                    x.Id,
                    x.Name,
                    x.NoKeys
                });

            this.log.ToInfo().Table(keepers);

            var animals = (from x in context.Set<Animal>()
                select new
                {
                    x.Id,
                    x.DateOfBirth
                }).ToArray();

            this.log.ToInfo().Table(animals);

            var weasels = (from a in context.Set<Weasel>()
                select a)
                .ToArray();

            this.log.ToInfo().Table(weasels);

            var ferrets = (from a in context.Set<Ferret>()
                select new
                {
                    a.Id,
                    a.DateOfBirth,
                    a.FurValue
                })
                .ToArray();

            this.log.ToInfo().Table(ferrets);

            var apes = (from a in context.Set<Ape>()
                select a).ToArray();

            this.log.ToInfo().Table(apes);

            var chimps = (from a in context.Set<Chimpanzee>()
                select a).ToArray();

            this.log.ToInfo().Table(chimps);
        }
    }
}