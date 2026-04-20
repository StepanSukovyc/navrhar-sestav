//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NamedService.cs                          </Name>
//    <Description> Služba vytváření názvu                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba vytváření názvu
    /// </summary>
    public static class NamedService
    {
        /// <summary>
        /// Vytvoření unikatního názvu v ramci uvedené kolekci objektů
        /// </summary>
        /// <param name="componentCollection">Daná kolekce objektů</param>
        /// <param name="type">Typ objektu</param>
        /// <returns>Unikatní název</returns>
        public static string CreateUniqueName(System.ComponentModel.ComponentCollection componentCollection, Type type)
        {
            string result = type.ToString();
            int index = 1;
            while (Exists(componentCollection, result + index))
                index++;
            return result + index;
        }

        /// <summary>
        /// Zjistí, zda v dané kolekcí <paramref name="componentCollection"/> existuje komponenta s názvem
        /// <paramref name="name"/>.
        /// </summary>
        /// <param name="componentCollection">Kolekce komopnentů</param>
        /// <param name="name">Hledaný název</param>
        /// <returns>TRUE - v kolekcí existuje komponenta s názvem <paramref name="name"/>.</returns>
        static bool Exists(System.ComponentModel.ComponentCollection componentCollection, string name)
        {
            foreach (IComponent item in componentCollection)
                if (item.Site.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            return false;
        }

        /// <summary>
        /// Vytvoření unikatního názvu v ramci uvedené kolekci položek seznamu
        /// </summary>
        /// <param name="collection">kolekce již existujících položek</param>
        /// <returns>Unikatní název</returns>
        public static string CreateUniqueName(GFEList collection)
        {
            string result = "DictionaryItem";
            int index = 1;
            while (Exists(collection, result + index))
                index++;
            return result + index;
        }

        static bool Exists(GFEList collection, string name)
        {
            return collection.ExistsByKey(key => key.Equals(name, StringComparison.InvariantCultureIgnoreCase));
        }

        /// <summary>
        /// Informace o případné agregační funkci
        /// </summary>
        /// <param name="dataName"></param>
        /// <returns></returns>
        public static AggregationInfo IsAggregate(string dataName)
        {
            AggregationInfo info = new AggregationInfo();
            if (dataName != null)
            {
                var i = dataName.IndexOf('(');
                if (i < 0) { info.DataName = dataName; info.Aggregate = false; return info; }
                var a = dataName.Substring(0, i);
                info.DataName = dataName.Substring(i + 1);
                i = info.DataName.IndexOf(')');
                if (i > 0) info.DataName = info.DataName.Substring(0, i);
                switch (a)
                {
                    case "ROWNUM":
                    case "SUM":
                    case "MIN":
                    case "MAX":
                    case "TOTAL-COUNT":
                    case "TOTAL-SUM":
                    case "TOTAL-MIN":
                    case "TOTAL-MAX":
                    case "FORW-COUNT":
                    case "FORW-SUM":
                    case "FORW-MIN":
                    case "FORW-MAX": info.Function = a; info.Aggregate = true; break;
                }
            }
            return info;
        }
    }
}
