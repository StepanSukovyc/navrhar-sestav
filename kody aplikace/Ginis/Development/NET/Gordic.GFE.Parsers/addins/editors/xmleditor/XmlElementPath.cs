//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlElementPath.cs                      </Name>
//    <Description> Prezentuje cestu k XML elemntu začínaje kořenovým elementem dokumentu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Text;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Prezentuje cestu k XML elemntu začínaje kořenovým elementem dokumentu
    /// </summary>
    public class XmlElementPath
    {
        QualifiedNameCollection elements = new QualifiedNameCollection();
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlElementPath()
        {
        }

        /// <summary>
        /// Prvky určující cestu.
        /// </summary>
        /// <remarks>Pořadí prvků určuje cestu.</remarks>
        public QualifiedNameCollection Elements
        {
            get { return elements; }
        }

        /// <summary>
        /// Komprimuje cestu tak, 
        /// že obsahuje pouze prvky určitého jmenného prostoru (z posledního prvnku v cestě).
        /// </summary>
        /// <remarks>
        /// </remarks>
        public void Compact()
        {
            if (elements.Count > 0)
            {
                QualifiedName lastName = Elements[Elements.Count - 1];
                if (lastName != null)
                {
                    int index = FindNonMatchingParentElement(lastName.Namespace);
                    if (index != -1)
                        RemoveParentElements(index);
                }
            }
        }

        /// <summary>
        /// Porovnání se zadaným objektem
        /// </summary>
        /// <param name="obj">Objekt k porovnání</param>
        public override bool Equals(object obj)
        {
            if (!(obj is XmlElementPath)) return false;
            if (this == obj) return true;

            XmlElementPath rhs = (XmlElementPath)obj;
            if (elements.Count == rhs.elements.Count)
            {

                for (int i = 0; i < elements.Count; ++i)
                    if (!elements[i].Equals(rhs.elements[i]))
                        return false;
                return true;
            }

            return false;
        }

        /// <exclude/>
        public override int GetHashCode()
        {
            return elements.GetHashCode();
        }

        /// <summary>
        /// řetězec prezentující daný objekt
        /// </summary>
        public override string ToString()
        {
            if (elements.Count > 0)
            {
                StringBuilder toString = new StringBuilder();
                int lastIndex = elements.Count - 1;
                for (int i = 0; i < elements.Count; ++i)
                {
                    string elementToString = GetElementToString(elements[i]);
                    if (i == lastIndex)
                        toString.Append(elementToString);
                    else
                    {
                        toString.Append(elementToString);
                        toString.Append(" > ");
                    }
                }
                return toString.ToString();
            }
            return String.Empty;
        }

        void RemoveParentElements(int index)
        {
            while (index >= 0)
            {
                --index;
                elements.RemoveFirst();
            }
        }

        int FindNonMatchingParentElement(string namespaceUri)
        {
            int index = -1;

            if (elements.Count > 1)
                for (int i = elements.Count - 2; i >= 0; --i)
                {
                    QualifiedName name = elements[i];
                    if (name.Namespace != namespaceUri)
                    {
                        index = i;
                        break;
                    }
                }
            return index;
        }

        static string GetElementToString(QualifiedName name)
        {
            return name.Prefix.Length > 0 ? name.Prefix + ":" + name.Name : name.Name;
        }
    }
}
