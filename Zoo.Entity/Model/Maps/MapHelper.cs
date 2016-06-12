using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq.Expressions;
using System.Reflection;

namespace Zoo.Entity.Model.Maps
{
    public static class MapHelper
    {
        // This method is used as a hack to help map empty properties like this: m.Properties(t => new {})
        // Problem arises when compiling projects with C# compiler that ships with VS2015, in runtime using above construct caused Members to be null and that crashed EF 6.1.x
        public static void PropertiesWithFixedNullMembers<TEntityType, TObject>(this EntityMappingConfiguration<TEntityType> entityMappingConfiguration, Expression<Func<TEntityType, TObject>> mappingExpression) where TEntityType : class
        {
            var mappingExpressionBody = mappingExpression.Body as NewExpression;

            if (mappingExpressionBody.Members == null)
            {
                typeof(NewExpression)
                    .GetField("_members", BindingFlags.Instance | BindingFlags.NonPublic)
                    .SetValue(mappingExpressionBody, new ReadOnlyCollection<MemberInfo>(new List<MemberInfo>()));
            }

            entityMappingConfiguration.Properties(mappingExpression);
        }
    }
}