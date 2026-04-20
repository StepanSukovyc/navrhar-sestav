//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDtoAccesor.cs                               </Name>
//    <Description> Přístup k prvkům DTO objektů                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2017-12-08                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System.Collections;
using System.Diagnostics;
using System.Linq.Expressions;
using System.Runtime.Caching;
using System.Threading;

namespace Gordic.General
{
    /// <summary>
    /// Přístup k prvkům DTO objektů
    /// </summary>
    [DebuggerDisplay("GDtoAccessor: {m_type} ({Count} members)")]
    public class GDtoAccessor : IEnumerable<GDtoAccessor.Field>
    {
        private readonly Type m_type;
        private readonly IEnumerable<GDtoAccessor.Field> m_fields;
        IEnumerator<Field> IEnumerable<Field>.GetEnumerator() => m_fields.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => m_fields.GetEnumerator();
        //public GDtoAccessor Where(Func<GDtoAccessor.Field, int, bool> predicate) { return new GDtoAccessor(m_type, m_fields.Where(predicate)); }
        /// <summary>
        /// Linq style filtr prvků
        /// </summary>
        public GDtoAccessor Where(Func<GDtoAccessor.Field, bool> predicate) { return new GDtoAccessor(m_type, m_fields.Where(predicate)); }
        /// <summary>Počet prvků DTO objektu</summary>
        public int Count => m_fields.Count();

        /// <summary>
        /// Prvek DTO objektu
        /// </summary>
        [DebuggerDisplay("{MemberType} {Type.FullName,nq} {Name,nq}")]
        public class Field
        {
            private readonly MemberInfo mi;
            /// <summary>Typ prvku (Field nebo Property)</summary>
            public MemberTypes MemberType => mi.MemberType;
            /// <summary>Jméno prvku</summary>
            public string Name;
            /// <summary>Typ hodnoty prvku (string, GString, ...)</summary>
            public Type Type;

#if LazyGDtoAccessor
            private Lazy<Func<object, object>> _lazyGetter;
            private Lazy<Action<object, object>> _lazySetter;
            /// <summary>funkce pro získání hodnoty</summary>
            public Func<object/*IGDto*/, object> Getter => _lazyGetter.Value;
            /// <summary>akce pro změnu hodnoty</summary>
            public Action<object/*IGDto*/, object> Setter => _lazySetter.Value;
#else
            /// <summary>funkce pro získání hodnoty</summary>
            public Func<object/*IGDto*/, object> Getter;
            /// <summary>akce pro změnu hodnoty</summary>
            public Action<object/*IGDto*/, object> Setter;
#endif
            /// <summary>Konstruktor</summary>
            public Field(FieldInfo fi)
            {
                this.mi = fi;
                this.Name = fi.Name;
                Type = fi.FieldType;
#if LazyGDtoAccessor
                _lazyGetter = new Lazy<Func<object,object>>(()=> FieldGet(fi.DeclaringType, fi), true);
                _lazySetter = new Lazy<Action<object, object>>(() => FieldSet(fi.DeclaringType, fi),true);
#else
                Getter = FieldGet(fi.DeclaringType, fi);
                Setter = FieldSet(fi.DeclaringType, fi);
#endif
            }
            /// <summary>Konstruktor</summary>
            public Field(PropertyInfo pi)
            {
                this.mi = pi;
                this.Name = pi.Name;
                Type = pi.PropertyType;
#if LazyGDtoAccessor
                if (pi.CanRead) _lazyGetter = new Lazy<Func<object, object>>(() => PropertyGet(pi.DeclaringType, pi), true); else _lazyGetter = new Lazy<Func<object, object>>(()=> ThrowWriteOnly);
                if (pi.CanWrite) _lazySetter = new Lazy<Action<object, object>>(() => PropertySet(pi.DeclaringType, pi),true); else _lazySetter = new Lazy<Action<object, object>>(() => ThrowReadOnly);
#else
                if (pi.CanRead) Getter = PropertyGet(pi.DeclaringType, pi); else Getter = ThrowWriteOnly;
                if (pi.CanWrite) Setter = PropertySet(pi.DeclaringType, pi); else Setter = ThrowReadOnly;
#endif
            }

            private object ThrowWriteOnly(object/*IGDto*/ obj) => throw new GInternalException(21000086, 21090058, mi.DeclaringType.FullName, Name, "write only");
            private void ThrowReadOnly(object/*IGDto*/ obj, object v) => throw new GInternalException(21000087, 21090058, mi.DeclaringType.FullName, Name, "read only");

            /// <summary>Získání hodnoty pro Field</summary>
            public static Func<object/*IGDto*/, object> FieldGet(Type source, FieldInfo fieldInfo)
            {
                if (fieldInfo != null)
                {
                    var sourceParam = Expression.Parameter(typeof(object/*IGDto*/), "dto");
                    Expression returnExpression = Expression.Field(Expression.Convert(sourceParam, source), fieldInfo);
                    if (!fieldInfo.FieldType.IsClass)
                    {
                        returnExpression = Expression.Convert(returnExpression, typeof(object));
                    }
                    var lambda = Expression.Lambda(returnExpression, sourceParam);
                    return (Func<object/*IGDto*/, object>)lambda.Compile();
                }
                return null;
            }
            /// <summary>Získání hodnoty pro Property</summary>
            public static Func<object/*IGDto*/, object> PropertyGet(Type source, PropertyInfo propertyInfo)
            {
                if (propertyInfo != null)
                {
                    var sourceParam = Expression.Parameter(typeof(object/*IGDto*/), "dto");
                    //Expression returnExpression = Expression.Property(Expression.Convert(sourceParam, source), propertyInfo);
                    Expression returnExpression = Expression.Call(Expression.Convert(sourceParam, source), propertyInfo.GetMethod);
                    if (!propertyInfo.PropertyType.IsClass)
                    {
                        returnExpression = Expression.Convert(returnExpression, typeof(object));
                    }
                    var lambda = Expression.Lambda(returnExpression, sourceParam);
                    return (Func<object/*IGDto*/, object>)lambda.Compile();
                }
                return null;
            }
            public Expression GetExpression(Expression sourceParam)
            {
                var converted = Expression.Convert(sourceParam, mi.DeclaringType);
                if (MemberType == MemberTypes.Property)
                {
                    var propertyInfo = (PropertyInfo)mi;
                    Expression expr = Expression.Call(converted, propertyInfo.GetMethod);
                    if (!propertyInfo.PropertyType.IsClass)
                        expr = Expression.Convert(expr, typeof(object));
                    return expr;
                }
                else // Field
                {
                    var fieldInfo = (FieldInfo)mi;
                    Expression expr = Expression.Field(converted, fieldInfo);
                    if (!fieldInfo.FieldType.IsClass)
                        expr = Expression.Convert(expr, typeof(object));
                    return expr;
                }
            }
            public Expression GetExpressionNoConvert(Expression sourceParam)
            {
                //var converted = Expression.Convert(sourceParam, mi.DeclaringType);
                if (MemberType == MemberTypes.Property)
                {
                    var propertyInfo = (PropertyInfo)mi;
                    Expression expr = Expression.Call(sourceParam, propertyInfo.GetMethod);
                    //if (!pi.PropertyType.IsClass)
                    //    expr = Expression.Convert(expr, typeof(object));
                    return expr;
                }
                else // Field
                {
                    var fieldInfo = (FieldInfo)mi;
                    Expression expr = Expression.Field(sourceParam, fieldInfo);
                    //if (!fi.FieldType.IsClass)
                    //    expr = Expression.Convert(expr, typeof(object));
                    return expr;
                }
            }

            /// <summary>Změna hodnoty pro Property</summary>
            public static Action<object/*IGDto*/, object> PropertySet(Type source, PropertyInfo propertyInfo)
            {
                if (propertyInfo != null)
                {
                    var sourceParam = Expression.Parameter(typeof(object/*IGDto*/), "dto");
                    var valueParam = Expression.Parameter(typeof(object));
                    var valueExpression = Expression.Convert(valueParam, propertyInfo.PropertyType);
                    Expression returnExpression = Expression.Call(Expression.Convert(sourceParam, source), propertyInfo.SetMethod, valueExpression);
                    var lambda = Expression.Lambda(returnExpression, sourceParam, valueParam);
                    return (Action<object/*IGDto*/, object>)lambda.Compile();
                }
                return null;
            }
            /// <summary>Změna hodnoty pro Field</summary>
            public static Action<object/*IGDto*/, object> FieldSet(Type source, FieldInfo fieldInfo)
            {
                if (fieldInfo != null)
                {
                    var sourceParam = Expression.Parameter(typeof(object/*IGDto*/), "dto");
                    var valueParam = Expression.Parameter(typeof(object));
                    var valueExpression = Expression.Convert(valueParam, fieldInfo.FieldType);
                    Expression returnExpression = Expression.Assign(Expression.Field(Expression.Convert(sourceParam, source), fieldInfo), valueExpression);
                    if (!fieldInfo.FieldType.IsClass)
                    {
                        returnExpression = Expression.Convert(returnExpression, typeof(object));
                    }
                    var lambda = Expression.Lambda(typeof(Action<object/*IGDto*/, object>), returnExpression, sourceParam, valueParam);
                    return (Action<object/*IGDto*/, object>)lambda.Compile();
                }
                return null;
            }
            public Expression SetExpression(Expression sourceParam, Expression valueExpr)
            {
                var converted = sourceParam.Type == mi.DeclaringType ? sourceParam : Expression.Convert(sourceParam, mi.DeclaringType);
                if (MemberType == MemberTypes.Property)
                {
                    var propertyInfo = (PropertyInfo)mi;
                    var valueExpression = Expression.Convert(valueExpr, propertyInfo.PropertyType);
                    return Expression.Call(converted, propertyInfo.SetMethod, valueExpression);
                }
                else // Field
                {
                    var fieldInfo = (FieldInfo)mi;
                    var valueExpression = Expression.Convert(valueExpr, fieldInfo.FieldType);
                    var fieldAccess = Expression.Field(converted, fieldInfo);
                    Expression returnExpression = Expression.Assign(fieldAccess, valueExpression);
                    if (!fieldInfo.FieldType.IsClass)
                    {
                        returnExpression = Expression.Convert(returnExpression, typeof(object));
                    }
                    return returnExpression;
                }
            }
            public Expression SetExpressionNoConvert(Expression sourceParam, Expression valueExpr)
            {
                //var converted = Expression.Convert(sourceParam, mi.DeclaringType);
                if (MemberType == MemberTypes.Property)
                {
                    var propertyInfo = (PropertyInfo)mi;
                    //var valueExpression = Expression.Convert(valueExpr, propertyInfo.PropertyType);
                    return Expression.Call(sourceParam, propertyInfo.SetMethod, valueExpr);
                }
                else // Field
                {
                    var fieldInfo = (FieldInfo)mi;
                    //var valueExpression = Expression.Convert(valueExpr, fieldInfo.FieldType);
                    var fieldAccess = Expression.Field(sourceParam, fieldInfo);
                    Expression returnExpression = Expression.Assign(fieldAccess, valueExpr);
                    //if (!fieldInfo.FieldType.IsClass)
                    //    returnExpression = Expression.Convert(returnExpression, typeof(object));
                    return returnExpression;
                }
            }


            /// <summary>Lze číst hodnotu prvku?</summary>
            public bool CanRead => mi.MemberType == MemberTypes.Property ? ((PropertyInfo)mi).CanRead : true;
            /// <summary>Lze měnit hodnotu prvku?</summary>
            public bool CanWrite => mi.MemberType == MemberTypes.Property ? ((PropertyInfo)mi).CanWrite : true;

            /// <summary>
            /// Čtení hodnoty prvku v konkrétní instanci objektu
            /// </summary>
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public object GetValue(object/*IGDto*/ obj)
            {
                return Getter(obj);
            }
            /// <summary>
            /// Čtení hodnoty prvku v konkrétní instanci objektu
            /// </summary>
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public TValue GetValue<TValue>(object/*IGDto*/ obj)
            {
                return (TValue)GDtoConverter.Convert(Getter(obj), typeof(TValue));
            }


            /// <summary>
            /// Čtení hodnoty prvku v konkrétní instanci objektu. Pokud byla hodnota null, je vytvořena nová instance hodnoty
            /// </summary>
            public object GetOrCreateValue(object/*IGDto*/ obj)
            {
                var v = GetValue(obj);
                if (v == null)
                {
                    v = Activator.CreateInstance(Type);
                    SetValue(obj, v);
                }
                return v;
            }

            //private Func<object> m_factory;
            ///// <summary>
            ///// Vytvoří novou instance hodnoty
            ///// </summary>
            //[System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            //public object CreateValue(object/*IGDto*/ obj)
            //{
            //    //var v = Activator.CreateInstance(Type);

            //    if (m_factory == null)
            //    {
            //        var newExpr = Expression.New(Type);
            //        var convert = Expression.Convert(newExpr, typeof(object));
            //        m_factory = Expression.Lambda<Func<object>>(convert).Compile();
            //    }
            //    var v = m_factory();

            //    SetValue(obj, v);
            //    return v;
            //}
            ///// <summary>
            ///// Čtení hodnoty prvku v konkrétní instanci objektu. Pokud byla hodnota null, je vytvořena nová instance hodnoty
            ///// </summary>
            //[System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            //public object GetOrCreateValue(object/*IGDto*/ obj)
            //{
            //    return GetValue(obj) ?? CreateValue(obj);
            //}


            public Expression CreateExpression(Expression sourceParam)
            {
                // Create a variable to hold the value: object v;
                var valueVar = Expression.Variable(Type, "v");

                var createInstance = Expression.New(Type);
                var assignNew = Expression.Assign(valueVar, createInstance);
                var setExpr = SetExpressionNoConvert(sourceParam, valueVar);

                // Return block: { object v; v = new; Set(v); return v; }
                return Expression.Block(
                    new[] { valueVar },
                    assignNew, setExpr, valueVar
                );
            }

            public Expression GetOrCreateExpression(Expression sourceParam)
            {
                // Create a variable to hold the value: object v;
                var valueVar = Expression.Variable(Type, "v");
                
                // Get the value: v = GetExpression(sourceParam)
                var getExpr = GetExpressionNoConvert(sourceParam);
                var assignGet = Expression.Assign(valueVar, getExpr);
                
                // Check if null: v == null
                var nullCheck = Expression.Equal(valueVar, Expression.Default(Type));

                var createInstance = Expression.New(Type);
                var assignNew = Expression.Assign(valueVar, createInstance);
                var setExpr = SetExpressionNoConvert(sourceParam, valueVar);
                var ifNullBlock = Expression.Block(assignNew, setExpr);
                
                // Conditional: if (v == null) { v = new; Set(v); }
                var conditional = Expression.IfThen(nullCheck, ifNullBlock);
                
                // Return block: { object v; v = Get(); if (v == null) { v = new; Set(v); } return v; }
                return Expression.Block(
                    new[] { valueVar },
                    assignGet,
                    conditional,
                    valueVar
                );
            }

            /// <summary>
            /// Filtrovací predikát pro konkrétní hodnotu prvku
            /// </summary>
            public Func<object/*IGDto*/, bool> FilterValues(object value)
            {
                return obj => GetValue(obj).Equals(value);
            }
            /// <summary>
            /// Filtrovací predikát pro BaseFilter
            /// </summary>
            public Func<object/*IGDto*/, bool> FilterValues<TValue>(GBaseFilter<TValue> filter) where TValue : IGDbType, ICloneable, IGObject
            {
                return obj => filter.ContainsValue(GetValue<TValue>(obj));
            }
            /// <summary>
            /// Filtrovací predikát pro BaseFilter
            /// </summary>
            public Func<object/*IGDto*/, bool> FilterValues<TValue>(GBaseFilter<TValue> filter, Func<object, TValue> convertFunc) where TValue : IGDbType, ICloneable, IGObject
            {
                return obj => filter.ContainsValue(convertFunc(GetValue(obj)));
            }


            /// <summary>
            /// Změna hodnoty prvku v konkrétní instanci objektu
            /// </summary>
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValue(object/*IGDto*/ obj, object value)
            {
                Setter(obj, value);
            }

            /// <summary>
            /// Změna hodnoty prvku v konkrétní instanci objektu
            /// </summary>
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public void SetValueWithConvert(object/*IGDto*/ obj, object value)
            {
                SetValue(obj, GDtoConverter.Convert(value, this.Type));
            }
            public Expression SetExpressionWithConvert(Expression sourceParam, Expression valueExpr)
            {
                return SetExpression(sourceParam, Expression.Call(typeof(GDtoConverter).GetMethod("Convert"), valueExpr, Expression.Constant(this.Type)));
            }

            /// <summary>čtení custom attributes na tomto prvku, např. GValidationAttribute</summary>
            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public object[] GetCustomAttributes(Type attributeType, bool inherit)
            {
                return mi.GetCustomAttributes(attributeType, inherit);
            }

            //public object[] GetCustomAttributes(bool inherit)
            //{
            //    return mi.GetCustomAttributes(inherit);
            //}

            /// <summary>Seznam fragmentů</summary>
            public IEnumerable<GFragmentAttribute> Fragments => mi.GetCustomAttributes(typeof(GFragmentAttribute), false).Cast<GFragmentAttribute>();
            /// <summary>Klíč nebo null</summary>
            public GKeyAttribute Key => (GKeyAttribute)mi.GetCustomAttributes(typeof(GKeyAttribute), false).FirstOrDefault();
            /// <summary>Omezení na délku nebo null</summary>
            public GLengthAttribute LengthValidation => (GLengthAttribute)mi.GetCustomAttributes(typeof(GLengthAttribute), false).FirstOrDefault();
        }

        private Dictionary<string, Field> m_lookup = null;
        /// <summary>Konkrétní prvek DTO objektu. Hledá bez ohledu na velikost písmen.</summary>
        public Field FindByName(string name)
        {
            if (m_lookup == null)
            {
                try
                {
                    m_lookup = m_fields.ToDictionary(p => p.Name, p => p, StringComparer.OrdinalIgnoreCase);
                }
                catch (ArgumentException)
                {
                    throw new GArgumentException(21000045, 21090051, this.m_type); //RC-EX 21090051 : Typ {0} obsahuje proměnné lišící se pouze velikostí písmen
                }
            }
            if (m_lookup.TryGetValue(name, out var r)) return r;
            return null;

            //return m_fields.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        }
        /// <summary>Konkrétní prvek DTO objektu. Hledá bez ohledu na velikost písmen.</summary>
        public Field this[string index] { get { return FindByName(index); } }

        /// <summary>Tabulka nebo null</summary>
        public GTableAttribute Table => (GTableAttribute)m_type.GetCustomAttributes(typeof(GTableAttribute), false).FirstOrDefault();

        /// <summary>Typ</summary>
        public Type Type => m_type;
        /// <summary>Jméno typu</summary>
        public string TypeName => m_type.Name;

        #region Key Fields
        private Func<object/*IGDto*/, Field[], object[]> KeyValuesGetter = null;
        private Func<object/*IGDto*/, Field[], object[]> BuildKeyValuesGetter()
        {
            var keys = GetKeyFields();
            var sourceParam1 = Expression.Parameter(typeof(object/*IGDto*/), "dto");
            var sourceParam2 = Expression.Parameter(typeof(Field[]), "fs");

            var init = new List<Expression>();
            int i = 0;
            foreach (var key in keys)
            {
#if LazyGDtoAccessor
                var getter = Expression.Property(Expression.ArrayIndex(sourceParam2, Expression.Constant(i)), "Getter");
#else
                var getter = Expression.Field(Expression.ArrayIndex(sourceParam2, Expression.Constant(i)), "Getter");
#endif
                var invoke = Expression.Invoke(getter, sourceParam1);
                init.Add(invoke);
                i++;
            }
            Expression returnExpression = Expression.NewArrayInit(typeof(object), init);

            var lambda = Expression.Lambda(returnExpression, sourceParam1, sourceParam2);
            return (Func<object/*IGDto*/, Field[], object[]>)lambda.Compile();
        }

        /// <summary>Pole hodnot klíčových prvků</summary>
        public object[] GetKeyValues(object/*IGDto*/ obj)
        {
            if (KeyValuesGetter == null) KeyValuesGetter = BuildKeyValuesGetter();
            return KeyValuesGetter(obj, m_keyfields);
            //var fs = GetKeyFields();
            //var ret = new object[fs.Length];
            //int i = 0;
            //foreach (var f in fs)
            //{
            //    ret[i++] = f.GetValue(obj);
            //}
            //return ret;
        }
        /// <summary>SXS klíčových prvků</summary>
        public GString GetKeyValuesAsSxs(object/*IGDto*/ obj)
        {
            return string.Join("#", GetKeyValues(obj).Select(o => o.ToString()));
        }
        /// <summary>Pole názvů klíčových prvků</summary>
        public string[] GetKeyNames()
        {
            return GetKeyFields().Select(f => f.Name).ToArray();
        }
        private Field[] m_keyfields = null;
        /// <summary>Pole klíčových prvků</summary>
        public Field[] GetKeyFields()
        {
            if (m_keyfields == null)
            {
                m_keyfields = m_fields.Where(f => f.Key != null).OrderBy(f => f.Key.Order).ToArray();
            }
            return m_keyfields;
        }
#endregion

        /// <summary>Konstruktor</summary>
        public GDtoAccessor(Type t, IEnumerable<GDtoAccessor.Field> fields) { m_type = t; m_fields = fields; }
        /// <summary>Konstruktor. Používat spíše statické GDtoAccessor.Get</summary>
        public GDtoAccessor(Type t) : this(t, t.GetMembers(BindingFlags.Public | BindingFlags.Instance)) { }
        /// <summary>Konstruktor</summary>
        public GDtoAccessor(Type t, MemberInfo[] ms)
        {
            m_type = t;
            var l = new List<GDtoAccessor.Field>(ms.Length);
            var l_usedNames = new HashSet<string>(); //vyřadí položky z předků, které jsou přetížene přes new/override
            foreach (var mi in ms)
            {
                if (mi.MemberType == MemberTypes.Property)
                {
                    var pi = mi as PropertyInfo;
                    if (pi.GetIndexParameters().Length == 0)
                        if (l_usedNames.Add(mi.Name)) l.Add(new Field(pi));
                }
                else if (mi.MemberType == MemberTypes.Field)
                    if (l_usedNames.Add(mi.Name)) l.Add(new Field(mi as FieldInfo));
            }
            m_fields = l;
        }

        /// <summary>Vraci FindByName(name).Getter</summary>
        public Func<object/*IGDto*/, object> CompoundFieldGet(string name)
        {
            var prop = FindByName(name);
            if (prop != null && prop.CanRead)
            {
                return prop.Getter;
            }

            var obj = this;
            var spl = name.Split(new string[] { "__" }, StringSplitOptions.None);
            var cnt = spl.Length - 1;
            GDtoAccessor.Field[] props = new GDtoAccessor.Field[cnt];
            for (int i = 0; i < cnt; i++)
            {
                var prop1 = obj[spl[i]];
                if (prop1 == null || prop1.CanRead == false) return null;
                obj = GDtoAccessor.Get(prop1.Type);
                props[i] = prop1;
            }
            if (props != null)
            {
                var prop2 = obj[spl[cnt]];
                if (prop2 != null && prop2.CanRead)
                {
                    return delegate (object/*IGDto*/ dto)
                    {
                        object o = dto;
                        for (int i = 0; i < cnt; i++)
                        {
                            var v = props[i].GetValue(o);
                            if (v == null) return v;
                            o = v;
                        }
                        return prop2.GetValue(o);
                    };
                }
                else
                {
                    //var ext = obj.SingleOrDefault(p => p.CanRead && p.GetCustomAttributes(typeof(Newtonsoft.Json.JsonExtensionDataAttribute), true).Any());
                    //if (ext != null
                    //    && ext.Type.IsAssignableToGenericType(typeof(IDictionary<,>)) && ext.Type.GenericTypeArguments[0] == typeof(string)
                    //    )
                    //{
                    //    var l_type = ext.Type.GenericTypeArguments[1];
                    //    return delegate (object/*IGDto*/ dto, object x)
                    //    {
                    //        object o = dto;
                    //        for (int i = 0; i < cnt; i++)
                    //        {
                    //            o = props[i].GetOrCreateValue(o);
                    //        }
                    //        var dict = ext.GetValue(o) as System.Collections.IDictionary /*<string, object>*/;
                    //        dict[spl[cnt]] = GDtoConverter.Convert(x, l_type);
                    //    };
                    //}
                }
            }
            return null;
        }

        /// <summary>Vrací Setter pro nastavení vlastnosti v name pomocí vnořeného delegovaného setteru</summary>
        public Action<object/*IGDto*/, object> CompoundDelegateSet(string name, Action<object/*IGDto*/, object> delegatedSet)
        {
            var obj = this;
            var spl = name.Split(new string[] { "__" }, StringSplitOptions.None);
            var cnt = spl.Length /*- 1*/;
            GDtoAccessor.Field[] props = new GDtoAccessor.Field[cnt];
            for (int i = 0; i < cnt; i++)
            {
                var prop1 = obj[spl[i]];
                if (prop1 == null || prop1.CanRead == false || prop1.CanWrite == false) return null;
                obj = GDtoAccessor.Get(prop1.Type);
                props[i] = prop1;
            }
            return delegate (object/*IGDto*/ dto, object x)
            {
                string n = name; //capture name
                object o = dto;
                for (int i = 0; i < cnt; i++)
                {
                    o = props[i].GetOrCreateValue(o);
                }
                delegatedSet(o, x);
            };
        }
        /// <summary>Vrací Setter pro nastavení vlastnosti v name pomocí vnořeného nižšího setteru</summary>
        [Obsolete("Použít CompoundDelegateSet místo CompoundLowerSet")]
        public Action<object/*IGDto*/, object> CompoundLowerSet(string name, Action<object/*IGDto*/, object> lowerSet)
        {
            var obj = this;
            var spl = name.Split(new string[] { "__" }, StringSplitOptions.None);
            var cnt = spl.Length /*- 1*/;
            GDtoAccessor.Field[] props = new GDtoAccessor.Field[cnt];
            for (int i = 0; i < cnt; i++)
            {
                var prop1 = obj[spl[i]];
                if (prop1 == null || prop1.CanRead == false || prop1.CanWrite == false) return null; //{ props = null; break; }
                obj = GDtoAccessor.Get(prop1.Type);
                props[i] = prop1;
            }
            return delegate (object/*IGDto*/ dto, object x)
            {
                string n = name; //capture name
                object o = dto;
                for (int i = 0; i < cnt; i++)
                {
                    o = props[i].GetOrCreateValue(o);
                }
                lowerSet(o, x);
                //pomaly lowerSet.DynamicInvoke(o, x);
            };
        }
        /// <summary>Vrací Setter pro nastavení vlastnosti v name pomocí složeného jména vlastnosti</summary>
        public Action<object/*IGDto*/, object> CompoundFieldSet(string name)
        {
            var prop = FindByName(name);
            if (prop != null && prop.CanWrite) return prop.SetValueWithConvert;

            var obj = this;
            var spl = name.Split(new string[] { "__" }, StringSplitOptions.None);
            var cnt = spl.Length - 1;
            GDtoAccessor.Field[] props = new GDtoAccessor.Field[cnt];
            for (int i = 0; i < cnt; i++)
            {
                var prop1 = obj[spl[i]];
                if (prop1 == null || prop1.CanRead == false || prop1.CanWrite == false) return null;
                obj = GDtoAccessor.Get(prop1.Type);
                props[i] = prop1;
            }
            var prop2 = obj[spl[cnt]];
            if (prop2 != null && prop2.CanWrite)
            {
                return delegate (object/*IGDto*/ dto, object x)
                {
                    object o = dto;
                    for (int i = 0; i < cnt; i++)
                    {
                        o = props[i].GetOrCreateValue(o);
                    }
                    prop2.SetValueWithConvert(o, x);
                };
            }
            else
            {
                var ext = obj.SingleOrDefault(p => p.CanRead && p.CanWrite && p.GetCustomAttributes(typeof(Newtonsoft.Json.JsonExtensionDataAttribute), true).Any());
                if (ext != null
                    && ext.Type.IsAssignableToGenericType(typeof(IDictionary<,>)) && ext.Type.GenericTypeArguments[0] == typeof(string)
                    )
                {
                    var l_type = ext.Type.GenericTypeArguments[1];
                    return delegate (object/*IGDto*/ dto, object x)
                    {
                        object o = dto;
                        for (int i = 0; i < cnt; i++)
                        {
                            o = props[i].GetOrCreateValue(o);
                        }
                        var dict = ext.GetValue(o) as System.Collections.IDictionary /*<string, object>*/;
                        dict[spl[cnt]] = GDtoConverter.Convert(x, l_type);
                    };
                }
            }
            return null;
        }

        private static readonly MemoryCache _cache = MemoryCache.Default;
        private static readonly CacheItemPolicy _cachePolicy = new CacheItemPolicy() { SlidingExpiration = TimeSpan.FromMinutes(30),  };

        /// <summary>Továrna GDtoAccessor dle typu</summary>
        public static GDtoAccessor Get(Type t)
        {

            var name = "DtoAccessor-" + t.FullName;
            var cached = _cache.Get(name);
            if (cached != null) return (GDtoAccessor)cached;
            else
            {
                    _cache.Add(name, cached = new GDtoAccessor(t), _cachePolicy); ;
                    return (GDtoAccessor)cached;
            }

        }
        /// <summary>Továrna GDtoAccessor dle typu</summary>
        public static GDtoAccessor Get<T>()
        {
            return Get(typeof(T));
        }

        /// <summary>
        /// Čtení hodnoty prvku zadaného stringem v konkrétní instanci objektu
        /// </summary>
        public static object GetInstanceValue(object/*IGDto*/ instance, string fieldName)
        {
            return Get(instance.GetType())[fieldName]?.GetValue(instance);
        }

        /// <summary>
        /// Změna hodnoty prvku zadaného stringem v konkrétní instanci objektu
        /// </summary>
        public static void SetInstanceValue(object/*IGDto*/ instance, string fieldName, object value)
        {
            Get(instance.GetType())[fieldName]?.SetValue(instance, value);
        }

    }
}
