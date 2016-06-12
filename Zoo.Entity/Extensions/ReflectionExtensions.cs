using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Zoo.Entity.Extensions
{
    public static class ReflectionExtensions
    {
        public static IEnumerable<Type> BaseTypes(this Type type)
        {
            while (type.BaseType != null)
            {
                yield return type.BaseType;
                type = type.BaseType;
            }
        }

        public static IEnumerable<Type> GetTypesWithEntityFrameworkMappings(this Assembly asm)
        {
            return asm
                .GetTypes()
                .Select(t =>
                {
                    var configType = t
                        .BaseTypes()
                        .FirstOrDefault(b =>
                            b.IsGenericType &&
                            b.GenericTypeArguments.Length == 1 &&
                            b.Name.StartsWith("EntityTypeConfiguration"));

                    if (configType != null)
                        return configType.GenericTypeArguments[0];

                    return null;
                })
                .Where(t => t != null);
        }
    }
}
