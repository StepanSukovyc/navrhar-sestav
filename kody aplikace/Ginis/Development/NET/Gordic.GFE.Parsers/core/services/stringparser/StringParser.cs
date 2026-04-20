//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StringParser.cs                          </Name>
//    <Description> Tato třída analyzuje všechny texty Návrháře ${xyz}.         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Text;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Tato třída analyzuje všechny texty Návrháře ${xyz}.
    /// env.[NAME], kde [NAME] prezentuje řetězec dle kterého bude hodnota dostupná
    /// </summary>
    public static class StringParser
    {
        readonly static Dictionary<string, string> properties;
        readonly static Dictionary<string, IStringTagProvider> stringTagProviders;
        readonly static Dictionary<string, object> propertyObjects;

        /// <summary>
        /// Slovník vlastnosti
        /// </summary>
        public static Dictionary<string, string> Properties { get { return properties; } }

        /// <summary>
        /// Slovník objektů vlastnosti
        /// </summary>
        public static Dictionary<string, object> PropertyObjects { get { return propertyObjects; } }

        static StringParser()
        {
            properties = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            stringTagProviders = new Dictionary<string, IStringTagProvider>(StringComparer.OrdinalIgnoreCase);
            propertyObjects = new Dictionary<string, object>();

            Assembly entryAssembly = Assembly.GetEntryAssembly();
            if (entryAssembly != null)
            {
                string exeName = entryAssembly.Location;
                propertyObjects["exe"] = FileVersionInfo.GetVersionInfo(exeName);
            }
            properties["USER"] = Environment.UserName;
            //properties["Version"] = RevisionClass.FullVersion;

            if (IntPtr.Size == 4)
                properties["Platform"] = "Win32";
            else if (IntPtr.Size == 8)
                properties["Platform"] = "Win64";
            else
                properties["Platform"] = "unknown";
        }

        /// <summary>
        /// Rozšíři ${xyz} styl vlastnosti hodnoty.
        /// </summary>
        /// <param name="input">Hodnota</param>
        public static string Parse(string input)
        {
            return Parse(input, null);
        }

        /// <summary>
        /// Parsuje pole a přemísti objekty v existujícím poli
        /// </summary>
        public static void Parse(string[] inputs)
        {
            for (int i = 0; i < inputs.Length; ++i)
                inputs[i] = Parse(inputs[i], null);
        }

        /// <summary>
        /// Registruje providera
        /// </summary>
        /// <param name="tagProvider">Provider štítků</param>
        public static void RegisterStringTagProvider(IStringTagProvider tagProvider)
        {
            foreach (string str in tagProvider.Tags)
                stringTagProviders[str] = tagProvider;
        }

        /// <summary>
        /// Rozšíři ${xyz} styl vlastnosti hodnoty
        /// </summary>
        /// <param name="input">Hodnota</param>
        /// <param name="customTags">Vlastní štítek</param>
        /// <returns></returns>
        public static string Parse(string input, string[,] customTags)
        {
            if (input == null)
                return null;
            int pos = 0;
            StringBuilder output = null; // nepoužívat pokud hodnota je jednoduchá vlastnost
            do
            {
                int oldPos = pos;
                pos = input.IndexOf("${", pos, StringComparison.Ordinal);
                if (pos < 0)
                {
                    if (output == null)
                        return input;
                    else
                    {
                        if (oldPos < input.Length)
                            // text po poslední vlastnosti
                            output.Append(input, oldPos, input.Length - oldPos);
                        return output.ToString();
                    }
                }
                if (output == null)
                {
                    if (pos == 0)
                        output = new StringBuilder();
                    else
                        output = new StringBuilder(input, 0, pos, pos + 16);
                }
                else
                {
                    if (pos > oldPos)
                        // text mezí dvěma vlastnostmi
                        output.Append(input, oldPos, pos - oldPos);
                }
                int end = input.IndexOf('}', pos + 1);
                if (end < 0)
                {
                    output.Append("${");
                    pos += 2;
                }
                else
                {
                    string property = input.Substring(pos + 2, end - pos - 2);
                    string val = GetValue(property, customTags);
                    if (val == null)
                    {
                        output.Append("${");
                        output.Append(property);
                        output.Append('}');
                    }
                    else
                        output.Append(val);
                    pos = end + 1;
                }
            } while (pos < input.Length);
            return output.ToString();
        }

        static string GetValue(string propertyName, string[,] customTags)
        {
            // hodně vlastnosti začíná na res: malé,
            if (propertyName.StartsWith("res:", StringComparison.OrdinalIgnoreCase))
            {
                //return Parse(ResourceService.GetString(propertyName.Substring(4)), customTags);
                int code = -1;
                if (Int32.TryParse(propertyName.Substring(4), out code))
                    return Parse(GResources.GetResourceText(code));
                return null;
            }
            if (propertyName.StartsWith("DATE:", StringComparison.OrdinalIgnoreCase))
            {
                try { return DateTime.Now.ToString(propertyName.Split(':')[1]); }
                catch (Exception ex) { return ex.Message; }
            }
            if (propertyName.Equals("DATE", StringComparison.OrdinalIgnoreCase))
                return DateTime.Today.ToShortDateString();
            if (propertyName.Equals("TIME", StringComparison.OrdinalIgnoreCase))
                return DateTime.Now.ToShortTimeString();
            if (propertyName.Equals("ProductName", StringComparison.OrdinalIgnoreCase))
                return MessageService.ProductName;
            if (propertyName.Equals("RandomName", StringComparison.OrdinalIgnoreCase))
                return "RandomName";
            if (propertyName.Equals("GUID", StringComparison.OrdinalIgnoreCase))
                return Guid.NewGuid().ToString().ToUpperInvariant();

            if (customTags != null)
                for (int j = 0; j < customTags.GetLength(0); ++j)
                    if (propertyName.Equals(customTags[j, 0], StringComparison.OrdinalIgnoreCase))
                        return customTags[j, 1];

            if (properties.ContainsKey(propertyName))
                return properties[propertyName];

            if (stringTagProviders.ContainsKey(propertyName))
                return stringTagProviders[propertyName].Convert(propertyName);

            return null;
        }

        /// <summary>
        /// Povoluje speciální syntaxi pro získání vlastnosti hodnot
        /// ${property:PropertyName}
        /// ${property:PropertyName??DefaultValue}
        /// ${property:ContainerName/PropertyName}
        /// ${property:ContainerName/PropertyName??DefaultValue}
        /// Kontajner je instance vlastností uložená v PropertyService.
        /// </summary>
        static string GetProperty(string propertyName)
        {
            string defaultValue = "";
            int pos = propertyName.LastIndexOf("??", StringComparison.Ordinal);
            if (pos >= 0)
            {
                defaultValue = propertyName.Substring(pos + 2);
                propertyName = propertyName.Substring(0, pos);
            }
            pos = propertyName.IndexOf('/');
            if (pos >= 0)
            {
                Property properties = PropertyService.Get(propertyName.Substring(0, pos), new Property());
                propertyName = propertyName.Substring(pos + 1);
                pos = propertyName.IndexOf('/');
                while (pos >= 0)
                {
                    properties = properties.Get(propertyName.Substring(0, pos), new Property());
                    propertyName = propertyName.Substring(pos + 1);
                }
                return properties.Get(propertyName, defaultValue);
            }
            else
                return PropertyService.Get(propertyName, defaultValue);
        }

        static string Get(object obj, string name)
        {
            Type type = obj.GetType();
            PropertyInfo prop = type.GetProperty(name);
            if (prop != null)
                return prop.GetValue(obj, null).ToString();

            FieldInfo field = type.GetField(name);
            return field?.GetValue(obj).ToString();
        }
    }
}
