//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlSelected.cs                           </Name>
//    <Description> Třída potřebná pro počet řádků před uložením daného řádku do XML dokumentu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Xml;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Třída potřebná pro počet řádků před uložením daného řádku do XML dokumentu
    /// </summary>
    public class StringWriterCounter : StringWriter
    {
        /// <summary>
        /// Aktuální pozice writeru v dokumentu 
        /// </summary>
        public int Position = 1;

        /// <summary>
        /// Přetížení metody kvůli počítání
        /// </summary>
        public override void WriteLine()
        {
            Position++;
            base.WriteLine();
        }

        /// <summary>
        /// Přetížení metody kvůli počítání
        /// </summary>
        /// <param name="p_value">
        /// Řádek může obsahovat několik symbolů ukončení řádku, 
        /// což writer hodí do nových řádků mimo metodu WriteLine
        /// </param>
        public override void Write(string p_value)
        {
            int l = p_value.Split('\n').Length;
            if (l > 1)
                Position += l - 1;

            base.Write(p_value);
        }
    }

    /// <summary>
    /// Vybraný objekt v číslech pozic řádků
    /// </summary>
    sealed class SelectedPosition : IPositionHandler
    {
        int start = -1;
        /// <summary>
        /// Začátek vybraného objektu
        /// </summary>
        public int StartPosition { get { return start; } set { start = value; } }

        int end = -1;
        /// <summary>
        /// Konec vybraného objektu
        /// </summary>
        public int EndPosition { get { return end; } set { end = value; } }

        readonly string ps_type = null;
        /// <summary>
        /// typ objektu
        /// </summary>
        public string PSType { get { return ps_type; } }
        /// <summary>
        /// typ objektu
        /// </summary>
        public bool IsInStyle { get { return false; } }
        /// <summary>
        /// 
        /// </summary>
        public bool CanBeSameANested { get { return false; } }


        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="ps_type"></param>
        public SelectedPosition(string ps_type)
        {
            this.ps_type = ps_type;
        }
    }

    /// <summary>
    /// Třída pro „pamatování“ pozic řádku prezentujících vybrané elementy
    /// </summary>
    [ComVisible(false)]
    public class XmlDocumentPosition : XmlDocument
    {
        readonly Dictionary<object, IPositionHandler> selected = new Dictionary<object, IPositionHandler>();
        /// <summary>
        /// Seznam pozic vybraných  řádků
        /// </summary>
        public Dictionary<object, IPositionHandler> Selected { get { return selected; } }

        /// <summary>
        /// Zároveň i počítadlo pozic objektů
        /// </summary>
        public StringWriterCounter Counter { get; set; }

        /// <summary>
        /// Nastavení pozici začátek
        /// </summary>
        /// <param name="selectedObject">Objekt pro který se začátek nastavuje</param>
        internal void SetBegin(object selectedObject)
        {
            // pokud počítadlo je aktivováno
            if (Counter != null)
            {
                if (selectedObject is IPositionHandler)
                {
                    (selectedObject as IPositionHandler).StartPosition = Counter.Position;
                    if (!Selected.ContainsKey(selectedObject))
                        Selected.Add(selectedObject, selectedObject as IPositionHandler);
                    else Selected[selectedObject] = selectedObject as IPositionHandler;
                }
                else
                {
                    SelectedPosition _sp = new SelectedPosition(null)
                    {
                        StartPosition = Counter.Position
                    };
                    if (!Selected.ContainsKey(selectedObject))
                        Selected.Add(selectedObject, _sp);
                }
            }
        }
        /// <summary>
        /// Nastavení pozici konec
        /// </summary>
        /// <param name="selectedObject">Objekt pro který se nastavuje konec</param>
        internal void SetEnd(object selectedObject)
        {
            // pokud počítadlo je aktivováno
            if (Counter != null && Selected.Count != 0)
                // poslednímu vloženému nastavíme pozici konce
                Selected[selectedObject].EndPosition = Counter.Position - 1;
        }
    }

    /// <summary>
    /// XML prezentace vybraného objektu
    /// </summary>
    [ComVisible(false)]
    public class XmlElementSelected : XmlElement
    {
        /// <summary>
        /// Vybraný objekt
        /// </summary>
        public object SelectedObject { get; set; }

        XmlElement e;
        /// <summary>
        /// Přetížení konstruktoru
        /// </summary>
        /// <param name="e">Element prezentovaného objektu</param>
        public XmlElementSelected(XmlElement e)
            : base(e.Prefix, e.LocalName, e.NamespaceURI, e.OwnerDocument)
        {
            this.e = e;
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="selectedObject">vybraný objekt</param>
        /// <returns></returns>
        public XmlElementSelected Initialize(object selectedObject)
        {
            if (e.ChildNodes.Count != 0)
                while (e.ChildNodes.Count != 0)
                    foreach (XmlNode item in e.ChildNodes)
                        AppendChild(item);

            List<XmlAttribute> c = new List<XmlAttribute>(e.Attributes.Count);
            foreach (XmlAttribute item in e.Attributes)
                c.Add(item);

            foreach (XmlAttribute item in c)
                Attributes.Append(item);

            SelectedObject = selectedObject;
            return this;
        }

        /// <summary>
        /// Přetížení kvůli počítání pozic vybraných elementů
        /// </summary>
        /// <param name="p_w"></param>
        public override void WriteTo(XmlWriter p_w)
        {
            (OwnerDocument as XmlDocumentPosition).SetBegin(SelectedObject);
            base.WriteTo(p_w);
            (OwnerDocument as XmlDocumentPosition).SetEnd(SelectedObject);
        }
    }
}
