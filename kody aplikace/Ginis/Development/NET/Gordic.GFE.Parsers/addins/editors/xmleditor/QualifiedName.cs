//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.QualifiedName.cs                       </Name>
//    <Description> <see cref="XmlQualifiedName"/> s prefixem jmenného prostoru </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// <see cref="XmlQualifiedName"/> s prefixem jmenného prostoru
    /// </summary>
    public class QualifiedName
    {
        XmlQualifiedName xmlQualifiedName = XmlQualifiedName.Empty;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public QualifiedName()
        {
            Prefix = String.Empty;
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="namespaceUri">URI jmenného prostoru</param>
        public QualifiedName(string name, string namespaceUri)
            : this(name, namespaceUri, String.Empty)
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="namespaceUri">URI jmenného prostoru</param>
        /// <param name="prefix">prefix</param>
        public QualifiedName(string name, string namespaceUri, string prefix)
            : this()
        {
            xmlQualifiedName = new XmlQualifiedName(name, namespaceUri);
            Prefix = prefix;
        }

        /// <summary>
        /// Operace porovnání dvou názvů
        /// </summary>
        /// <param name="lhs">Levý argument</param>
        /// <param name="rhs">Pravý argument</param>
        /// <returns></returns>
        public static bool operator ==(QualifiedName lhs, QualifiedName rhs)
        {
            bool equals = false;

            if (!(lhs is null) && !(rhs is null))
                equals = lhs.Equals(rhs);
            else if ((lhs is null) && (rhs is null))
                equals = true;

            return equals;
        }
        /// <summary>
        /// Operace nerovností dvou objektu daného typu
        /// </summary>
        /// <param name="lhs">Levý argument</param>
        /// <param name="rhs">Pravý argument</param>
        /// <returns></returns>
        public static bool operator !=(QualifiedName lhs, QualifiedName rhs)
        {
            return !(lhs == rhs);
        }

        /// <summary>
        /// Porovnání objektu s jiným objektem
        /// </summary>
        /// <param name="obj">Jiný objekt</param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            bool equals = false;

            QualifiedName qualifiedName = obj as QualifiedName;
            if (qualifiedName != null)
                equals = xmlQualifiedName.Equals(qualifiedName.xmlQualifiedName);
            else
            {
                XmlQualifiedName name = obj as XmlQualifiedName;
                if (name != null)
                    equals = xmlQualifiedName.Equals(name);
            }

            return equals;
        }
        /// <exclude/>
        public override int GetHashCode()
        {
            return xmlQualifiedName.GetHashCode();
        }

        /// <summary>
        /// jmenný prostor kvalifikovaného názvu.
        /// </summary>
        public string Namespace
        {
            get { return xmlQualifiedName.Namespace; }
            set { xmlQualifiedName = new XmlQualifiedName(xmlQualifiedName.Name, value); }
        }

        /// <summary>
        /// Název elementu.
        /// </summary>
        public string Name
        {
            get { return xmlQualifiedName.Name; }
            set { xmlQualifiedName = new XmlQualifiedName(value, xmlQualifiedName.Namespace); }
        }

        /// <summary>
        /// Použitý prefix jmenného prostoru.
        /// </summary>
        public string Prefix { get; set; }

        /// <summary>
        /// řetězec prezentující kvalifikovaný název.
        /// </summary>
        public override string ToString()
        {
            if (xmlQualifiedName.Namespace.Length > 0)
            {
                string prefixToString = String.Empty;
                if (!String.IsNullOrEmpty(Prefix))
                    prefixToString = Prefix + ":";
                return String.Concat(prefixToString, xmlQualifiedName.Name, " [", xmlQualifiedName.Namespace, "]");
            }
            else if (!String.IsNullOrEmpty(Prefix))
                return Prefix + ":" + xmlQualifiedName.Name;
            return xmlQualifiedName.Name;
        }
    }
}
