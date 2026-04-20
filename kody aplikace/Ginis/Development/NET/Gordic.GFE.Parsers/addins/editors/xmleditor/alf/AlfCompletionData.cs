//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlCompletionData.cs                   </Name>
//    <Description> Obsahuje text pro jmenný prostor, podřízený element         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.TextEditor;

namespace Gordic.GFE.Parsers.AlfEditor
{
    /// <summary>
    /// Obsahuje text pro jmenný prostor, podřízený element 
    /// nebo atribut automatického dokončování (intellisense).
    /// </summary>
    public class AlfCompletionData : ICompletionData
    {
        #region ICompletionData
        /// <summary>
        /// index obrázku (položky dokončení) externího seznamu všech dostupných obrázků
        /// </summary>
        public int ImageIndex { get { return 0; } }

        /// <summary>
        /// Udržovaný text
        /// (teď je to pole řetězcu, ale ve skutečnosti potřebujeme jen jeden,
        /// chyba se musí opravit v rozhraní ICompletionData)
        /// </summary>
        public string Text { get; set; }

        readonly string description = String.Empty;
        /// <summary>
        /// Popis textu - položka dokumentace získáná z elementu
        /// xs:annotation/xs:documentation
        /// </summary>
        public string Description { get { return description; } }

        /// <summary>
        /// Získá hodnotu priority pro dokončení datové položky.
        /// Užitečné při výběru položky podle jejich počátečních znaků, 
        /// položka s nejvyšší prioritou je vybrána jako první.
        /// </summary>
        public double Priority { get { return 0; } }

        /// <summary>
        /// Indikuje, jedinečnost dokončovací položky dle počatečních znaků.
        /// </summary>
        public bool IsUnique { get; set; }

        /// <summary>
        /// Vložení prvku do textového editoru
        /// </summary>
        /// <param name="textArea">TextArea do které se vkláda dokončovací položka.</param>
        /// <param name="ch">
        /// Znak, který by měl být po dokončení dat vložen.
        /// Použijte \0, pokud nechcete vkládat žádný znak.
        /// </param>
        /// <returns>
        /// TRUE pokud akce vložení byla dokončená znakem <paramref name="ch"/>; jinak FALSE.
        /// </returns>
        public bool InsertAction(TextArea textArea, char ch)
        {
            if ((dataType == DataType.XmlElement) || (dataType == DataType.XmlAttributeValue))
                textArea.InsertString(Text);
            else if (dataType == DataType.NamespaceUri)
                textArea.InsertString(String.Concat("\"", Text, "\""));
            else
            {
                // vložení atributu
                Caret caret = textArea.Caret;
                textArea.InsertString(String.Concat(Text, "=\"\""));

                // přemístění kurzoru doprostřed uvozovek atributu
                caret.Position = textArea.Document.OffsetToPosition(caret.Offset - 1);
            }
            return false;
        }
        #endregion

        readonly DataType dataType = DataType.XmlElement;

        /// <summary>
        /// Typ udržovaného textu.
        /// </summary>
        public enum DataType
        {
            /// <summary>
            /// element
            /// </summary>
            XmlElement = 1,
            /// <summary>
            /// atribut
            /// </summary>
            XmlAttribute = 2,
            /// <summary>
            /// jmenný prostor
            /// </summary>
            NamespaceUri = 3,
            /// <summary>
            /// hodnota atributu
            /// </summary>
            XmlAttributeValue = 4
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">Text pro vytvoření</param>
        public AlfCompletionData(string text)
            : this(text, String.Empty, DataType.XmlElement)
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">Text pro udržení</param>
        /// <param name="description">Popis textu</param>
        public AlfCompletionData(string text, string description)
            : this(text, description, DataType.XmlElement)
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">Text pro udržení</param>
        /// <param name="dataType">Typ obsahu</param>
        public AlfCompletionData(string text, DataType dataType)
            : this(text, String.Empty, dataType)
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">Text pro udržení</param>
        /// <param name="description">Popis textu</param>
        /// <param name="dataType">Typ udržovaného textu</param>
        public AlfCompletionData(string text, string description, DataType dataType)
        {
            Text = text;
            this.description = description;
            this.dataType = dataType;
        }

        /// <summary>
        /// Akce vložení daného textu do ovladače textu
        /// </summary>
        /// <param name="control">Ovladač textového editoru</param>
        public void InsertAction(TextEditorControl control)
        {
            InsertAction(control.ActiveTextAreaControl.TextArea, ' ');
        }

        /// <summary>
        /// Porovnání objektu s daným
        /// </summary>
        /// <param name="obj">Porovnávaný objekt</param>
        /// <returns></returns>
        public int CompareTo(object obj)
        {
            return obj is ICompletionData
                ? string.Compare(Text, string.Join("", (obj as ICompletionData).Text), StringComparison.InvariantCultureIgnoreCase)
                : -1;
        }
    }
}
