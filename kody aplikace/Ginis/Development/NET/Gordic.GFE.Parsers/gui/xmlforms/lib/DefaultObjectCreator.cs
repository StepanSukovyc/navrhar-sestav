//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultObjectCreator.cs                  </Name>
//    <Description> Výchozí implementace rozhraní IObjectCreator.               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Reflection;
using System.Xml;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Výchozí implementace rozhraní IObjectCreator.
    /// </summary>
    public class DefaultObjectCreator : IObjectCreator
    {
        /// <summary>
        /// Získání typu objektu dle názvu
        /// </summary>
        /// <param name="name">Název</param>
        /// <returns></returns>
        public virtual Type GetType(string name)
        {
            Type t = typeof(Control).Assembly.GetType(name);

            // snaha o vytvoření System.Drawing.* objektu
            if (t == null)
                t = typeof(System.Drawing.Point).Assembly.GetType(name);

            // snaha o vytvoření System.* objektu
            if (t == null)
                t = typeof(String).Assembly.GetType(name);

            // pokus o vytvořenoí objektu z nějaké assembly, která momentálně běží
            if (t == null)
            {
                Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

                foreach (Assembly assembly in assemblies)
                {
                    t = assembly.GetType(name);
                    if (t != null)
                        break;
                }
            }

            return t;
        }
        /// <summary>
        /// Vytvoření objektu
        /// </summary>
        /// <param name="name">název</param>
        /// <param name="el">element s popisem</param>
        /// <returns></returns>
        public virtual object CreateObject(string name, XmlElement el)
        {
            try
            {
                // snah o vytvoření System.Windows.Forms.*
                object newObject = typeof(Control).Assembly.CreateInstance(name);

                // snaha o vytvoření System.Drawing.* objektu
                if (newObject == null)
                    newObject = typeof(System.Drawing.Point).Assembly.CreateInstance(name);

                // snaha o vytvoření System.* objektu
                if (newObject == null)
                    newObject = typeof(String).Assembly.CreateInstance(name);

                // pokus o vytvořenoí objektu z nějaké assembly, která momentálně běží
                if (newObject == null)
                {
                    Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

                    foreach (Assembly assembly in assemblies)
                    {
                        newObject = assembly.CreateInstance(name);
                        if (newObject != null)
                            break;
                    }
                }

                if (newObject is Control)
                    ((Control)newObject).SuspendLayout();

                return newObject;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
