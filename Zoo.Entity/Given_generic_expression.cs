using System;
using System.Linq;
using System.Linq.Expressions;
using Zoo.Entity.Model;
using Should;
using Xunit;

namespace Zoo.Entity
{
    public class Given_generic_expression : Given_entities_context
    {
        private Expression<Func<T, bool>> InterfaceExpression<T>()
            where T : IRoot
        {
            return r => r.Id > 10;
        }

        private Expression<Func<T, bool>> ClassExpression<T>()
            where T : Root
        {
            return r => r.Id > 10;
        }

        [Fact(Skip = "not now")]
        public void Specific_works_only_for_class_constraints()
        {
            var predicate = ClassExpression<Employee>();

            var employee = this.context.Set<Employee>()
                .Where(predicate)
                .FirstOrDefault();

            employee.ShouldBeNull();
        }

        [Fact(Skip = "not now")]
        public void Specific_does_not_work_for_interface_constraints()
        {
            Assert.ThrowsAny<Exception>(() =>
            {
                var predicate = InterfaceExpression<Employee>();

                var employee = this.context.Set<Employee>()
                    .Where(predicate)
                    .FirstOrDefault();

                employee.ShouldBeNull();
            });
        }
    }
}