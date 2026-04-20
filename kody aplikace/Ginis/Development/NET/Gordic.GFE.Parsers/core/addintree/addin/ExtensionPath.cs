//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ExtensionPath.cs                         </Name>
//    <Description> Popis Path.                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Xml;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Popis Path.
    /// </summary>
    public class ExtensionPath
    {
        private readonly string name;
        private readonly string insertafter;
        readonly AddIn addIn;
        List<Entity> entities = new List<Entity>();
        readonly Bitmap icon;

        /// <summary>
        /// Položka stromu
        /// </summary>
        public AddIn AddIn { get { return addIn; } }

        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return name; } }

        /// <summary>
        /// Jednotky s informací
        /// </summary>
        public List<Entity> Entities { get { return entities; } }

        /// <summary>
        /// Obrázek
        /// </summary>
        public Bitmap Icon { get { return icon; } }

        /// <summary>
        /// Název
        /// </summary>
        public string InsertAfter { get { return insertafter; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="addIn">Položka</param>
        /// <param name="iconName">Případný název obrázku</param>
        /// <param name="insertafter">Atribut INSERTAFTER</param>
        public ExtensionPath(string name, AddIn addIn, string iconName, string insertafter)
        {
            this.addIn = addIn;
            this.name = name;
            this.insertafter = insertafter;
            if (!string.IsNullOrEmpty(iconName))
                try { icon = WinFormsResourceService.GetBitmap(iconName); }
                catch (ResourceNotFoundException) { }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="extensionPath"></param>
        /// <param name="reader"></param>
        /// <param name="endElement"></param>
        public static void SetUp(ExtensionPath extensionPath, XmlReader reader, string endElement)
        {
            Stack<ICondition> conditionStack = new Stack<ICondition>();
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (string.Equals(reader.LocalName, "Condition", StringComparison.InvariantCultureIgnoreCase)
                            || string.Equals(reader.LocalName, "ComplexCondition", StringComparison.InvariantCultureIgnoreCase))
                            conditionStack.Pop();
                        else if (string.Equals(reader.LocalName, endElement, StringComparison.InvariantCultureIgnoreCase))
                            return;

                        break;
                    case XmlNodeType.Element:
                        string elementName = reader.LocalName;
                        if (string.Equals(elementName, "Condition", StringComparison.InvariantCultureIgnoreCase))
                            conditionStack.Push(Condition.Read(reader));
                        else if (string.Equals(elementName, "ComplexCondition", StringComparison.InvariantCultureIgnoreCase))
                            conditionStack.Push(Condition.ReadComplexCondition(reader));
                        else
                        {
                            Entity newEntity = new Entity(extensionPath.AddIn, elementName, Property.ReadFromAttributes(reader), conditionStack.ToArray());
                            extensionPath.entities.Add(newEntity);
                            if (!reader.IsEmptyElement)
                            {
                                ExtensionPath subPath = extensionPath.AddIn.GetExtensionPath(extensionPath.Name + "/" + newEntity.Id, reader.GetAttribute("icon"), reader.GetAttribute("insertafter"));
                                SetUp(subPath, reader, elementName);
                            }
                        }
                        break;
                }
            }
        }
    }
}
