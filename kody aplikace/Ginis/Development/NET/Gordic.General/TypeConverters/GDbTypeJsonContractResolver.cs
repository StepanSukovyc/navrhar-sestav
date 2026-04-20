//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDbTypeJsonContractResolver.cs               </Name>
//    <Description> Konverze GDbTypů do JSON                                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-05                                                  </Created>
//  </FileHeader>

using System;
using Newtonsoft.Json;
using System.Globalization;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace Gordic.General
{
    /// <summary>
    /// Konverze GDbTypů do JSON
    /// </summary>
    public class GDbTypeJsonContractResolver : DefaultContractResolver
    {
        /// <summary>
        /// Ošetření property objektu, které jsou typu GDbType
        /// </summary>
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var p = base.CreateProperty(member, memberSerialization);
            if (typeof(IGDbType).IsAssignableFrom(p.PropertyType))
            {
                p.NullValueHandling = NullValueHandling.Include;
                p.DefaultValueHandling = DefaultValueHandling.Ignore;
                p.DefaultValue = GDbTypeJsonValueProvider.NullValue; 
                p.ValueProvider = new GDbTypeJsonValueProvider() { InnerValueProvider = p.ValueProvider };
                p.Converter = new GDbTypeJsonConverter(); //BM (2020-02-17)Nutne pro newtonsoft 12, dle: https://www.newtonsoft.com/json/help/html/ContractResolver.htm
            }
            return p;
        }
    }

    internal class GDbTypeJsonValueProvider : IValueProvider
    {
        internal static object NullValue = new object();
        public IValueProvider InnerValueProvider;
        public object GetValue(object target) => InnerValueProvider.GetValue(target) ?? NullValue; //hodnota null se nebude serializovat

        public void SetValue(object target, object value) => InnerValueProvider.SetValue(target, value);
    }

}
