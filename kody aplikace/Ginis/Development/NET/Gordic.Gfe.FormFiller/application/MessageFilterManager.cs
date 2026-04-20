//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.MessageFilterManager.cs               </Name>
//    <Description> Správce filtrů zpráv aplikace                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Gordic.Gfe.FormFiller.Core
{
    /// <summary>
    /// Správce filtrů zpráv aplikace
    /// </summary>
    static class MessageFilterManager
    {
        /// <summary>
        /// dostupné filtry zpráv
        /// </summary>
        static Dictionary<Type, List<IMessageFilter>> filters = new Dictionary<Type, List<IMessageFilter>>();
        /// <summary>
        /// Načtení filtrů dle typu
        /// </summary>
        /// <param name="type">Daný typ</param>
        internal static void LoadMessageFilter(Type type)
        {
            if (!filters.ContainsKey(type))
                CreateMessageFilter(type);

            if (filters.ContainsKey(type))
                foreach (IMessageFilter filter in filters[type])
                    Application.AddMessageFilter(filter);
        }
        /// <summary>
        /// Uvolnění všech filtrů dle typu
        /// </summary>
        /// <param name="type">Daný typ</param>
        internal static void UnloadMessageFilter(Type type)
        {
            if (filters.ContainsKey(type))
                foreach (IMessageFilter filter in filters[type])
                    Application.RemoveMessageFilter(filter);
        }

        static void CreateMessageFilter(Type type)
        {
            if (type.Equals(typeof(FormFillerMain)))
            {
                List<IMessageFilter> list = new List<IMessageFilter>
                {
                    new ApplicationKeyHandler()
                };
                if (!filters.ContainsKey(type))
                    filters.Add(type, list);
            }
        }
    }
}
