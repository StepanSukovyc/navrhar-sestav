//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.TypeExtensions.cs                            </Name>
//    <Description> Pomocná třída pro obecnou práci s Type                      </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-11-18                                                  </Created>
//  </FileHeader>



using System;
using System.Globalization;
using System.Reflection;
using System.Runtime.CompilerServices;


namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro obecnou práci s Type
    /// Část rozšíření pro string je obsažena také v Gordic.General.GExtensionMethods - možná časem přesunout sem, ať je to na jednom místě
    /// </summary>
    public static class TypeExtensions
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static Assembly GetAssembly( this Type type )
        {
            return Assembly.GetAssembly(type);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="param"></param>
        /// <returns></returns>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static Assembly GetAssembly<T>(this T param ) where T : class
        {
            return GetAssembly(typeof(T));
        }
        

        /// <summary>
        /// Funkce pro otestování, že typ je přiřaditelný do zadaného typu. Používám např. pro test, zda třída je potomkem zadané třídy a nebo zda implementuje zadané rozhraní.
        /// 
        /// Příklad použití: a_set.GetType().IsAssignableTo(typeof(IGDto))
        /// </summary>
        /// <param name="type">Zadaný typ pro test, zda jej lze přiřazovat.</param>
        /// <param name="assignableType">Typ do kterého se testuje přiřaditelnost zadaného typu</param>
        /// <returns>Příznak, že lze přiřazovat</returns>
        public static Boolean IsAssignableTo(this Type type, Type assignableType)
        {
            return TypeHelpers.IsAssignableTo(type, assignableType);
        }

        /// <summary>
        /// Funkce pro otestování, že typ je přiřaditelný do zadaného typu. Používám např. pro test, zda třída je potomkem zadané třídy a nebo zda implementuje zadané rozhraní.
        /// 
        /// Příklad použití: a_set.GetType().IsAssignableTo&lt;IGDto&gt;()
        /// </summary>
        /// <typeparam name="TAssignable"></typeparam>
        /// <param name="type"></param>
        /// <returns></returns>
        public static Boolean IsAssignableTo<TAssignable>(this Type type)
        {
            return TypeHelpers.IsAssignableTo<TAssignable>(type);
        }
        /// <summary>
        /// Test, že zadaný TYPE podporuje vložení NULL hodnoty
        /// https://docs.microsoft.com/cs-cz/dotnet/csharp/programming-guide/nullable-types/how-to-identify-a-nullable-type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static bool IsNullableType(this Type type)
        {
            
            return Nullable.GetUnderlyingType(type) != null;
        }

        /// <summary>
        /// Test, že proměnná je typu podporující vložení NULL
        /// https://docs.microsoft.com/cs-cz/dotnet/csharp/programming-guide/nullable-types/how-to-identify-a-nullable-type
        /// </summary>
        /// <typeparam name="T">Odpovídající typ hondoty</typeparam>
        /// <param name="instance">Hodnota</param>
        /// <returns>true pokud proměnná umožňuje vložení null hodnoty</returns>
        public static bool IsNullableType<T>(this T instance)
        {
            var type = typeof(T);
            return Nullable.GetUnderlyingType(type) != null;
        }

        /// <summary>
        /// Funkce pro otestování, zda object je typu Anonymous
        /// </summary>
        /// <param name="type">Testovaný typ</param>
        /// <returns>Příznak, že se jedná o anonymous class</returns>
        public static bool IsAnonymous(this Type type)
        {
            if (type.IsGenericType)
            {
                var d = type.GetGenericTypeDefinition();
                if (d.IsClass && d.IsSealed && d.Attributes.HasFlag(TypeAttributes.NotPublic))
                {
                    var attributes = d.GetCustomAttributes(typeof(CompilerGeneratedAttribute), false);
                    if (attributes != null && attributes.Length > 0)
                    {
                        if (type.Name.Contains("AnonymousType"))
                            return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// Funkce pro otestování, zda object je typu Anonymous
        /// </summary>
        /// <typeparam name="T">Obecný typ</typeparam>
        /// <param name="instance">Obecný objekt</param>
        /// <returns>Příznak, že instance typu object je typu Anonymous class</returns>
        public static bool IsAnonymousType<T>(this T instance)
        {
            return IsAnonymous(instance.GetType());
        }

        /// <summary>
        /// Zjisti, zda dany typ je odvozeny od urciteho generickeho typu.
        /// Priklad pouziti: type.IsAssignableToGenericType(typeof(GAsyncTaskAppServer&lt;,&gt;))
        /// </summary>
        /// <param name="givenType"></param>
        /// <param name="genericType"></param>
        /// <returns></returns>
        public static bool IsAssignableToGenericType(this Type givenType, Type genericType)
        {
            var interfaceTypes = givenType.GetInterfaces();

            foreach (var it in interfaceTypes)
            {
                if (it.IsGenericType && it.GetGenericTypeDefinition() == genericType)
                    return true;
            }

            if (givenType.IsGenericType && givenType.GetGenericTypeDefinition() == genericType)
                return true;

            Type baseType = givenType.BaseType;
            if (baseType == null) return false;

            return IsAssignableToGenericType(baseType, genericType);
        }


        /// <summary>
        /// Pomocná třída pro test přiřaditelnosti
        /// </summary>
        public static class TypeHelpers
        {
            /// <summary>
            ///  Funkce pro otestování, že typ je přiřaditelný do zadaného typu. Používám např. pro test, zda třída je potomkem zadané třídy a nebo zda implementuje zadané rozhraní.
            /// </summary>
            /// <param name="type">Typ zdroje přiřazení</param>
            /// <param name="assignableType">Typ cíle přiřazení</param>
            /// <returns>Příznak přiřaditelnosti</returns>
            public static Boolean IsAssignableTo(Type type, Type assignableType)
            {
                return assignableType.IsAssignableFrom(type);
            }

            /// <summary>
            ///  Funkce pro otestování, že typ je přiřaditelný do zadaného typu. Používám např. pro test, zda třída je potomkem zadané třídy a nebo zda implementuje zadané rozhraní.
            /// </summary>
            /// <typeparam name="TAssignable">Typ cíle přiřazení</typeparam>
            /// <param name="type">Typ zdroje přiřazení</param>
            /// <returns>Příznak přiřaditelnosti</returns>
            public static Boolean IsAssignableTo<TAssignable>(Type type)
            {
                return TypeHelpers.IsAssignableTo(type, typeof(TAssignable));
            }
        }


    }
}
