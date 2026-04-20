//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CommentCompletionDataProvider.cs         </Name>
//    <Description> Zprostředkovatel dat pro dokončování kódu                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System.Collections;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Zprostředkovatel dat pro dokončování kódu
    /// </summary>
    public class CommentCompletionDataProvider : AbstractCompletionDataProvider
    {
        int caretLineNumber;
        int caretColumn;
        readonly string[][] commentTags = new string[][] { };

        /// <summary>
        /// TRUE pokud dané koordinatz jsou uvnitř.
        /// </summary>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <param name="region"></param>
        /// <returns></returns>
        bool IsBetween(int row, int column, DomRegion region)
        {
            return row >= region.BeginLine && (row <= region.EndLine || region.EndLine == -1);
        }

        /// <exclude/>
        public override ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped)
        {
            caretLineNumber = textArea.Caret.Line;
            caretColumn = textArea.Caret.Column;
            LineSegment caretLine = textArea.Document.GetLineSegment(caretLineNumber);
            string lineText = textArea.Document.GetText(caretLine.Offset, caretLine.Length);
            if (!lineText.Trim().StartsWith("///") && !lineText.Trim().StartsWith("'''"))
                return null;

            ArrayList completionData = new ArrayList();
            foreach (string[] tag in commentTags)
                completionData.Add(new CommentCompletionData(tag[0], tag[1]));
            return (ICompletionData[])completionData.ToArray(typeof(ICompletionData));
        }

        /// <summary>
        /// dokončovací položka komentáře
        /// </summary>
        class CommentCompletionData : ICompletionData
        {
            /// <summary>
            /// index obrázku (položky dokončení) externího seznamu všech dostupných obrázků
            /// </summary>
            public int ImageIndex { get { return ClassBrowserIconService.MethodIndex; } }

            string text;
            /// <summary>
            /// text položky
            /// </summary>
            public string Text
            {
                get { return text; }
                set { text = value; }
            }

            readonly string description;
            /// <summary>
            /// popis položky
            /// </summary>
            public string Description { get { return description; } }

            /// <summary>
            /// Indikuje, jedinečnost dokončovací položky dle počatečních znaků.
            /// </summary>
            public bool IsUnique { get; set; }

            /// <summary>
            /// Získá hodnotu priority pro dokončení datové položky.
            /// Užitečné při výběru položky podle jejich počátečních znaků, 
            /// položka s nejvyšší prioritou je vybrána jako první.
            /// </summary>
            public double Priority { get { return 0; } }

            /// <summary>
            /// Vložení prvku do textového editoru
            /// </summary>
            /// <param name="textArea">TextArea do které se vkláda dokončovací položka</param>
            /// <param name="ch">
            /// Znak, který by měl být po dokončení dat vložen.
            /// Použijte \0, pokud nechcete vkládat žádný znak.
            /// </param>
            /// <returns>
            /// TRUE pokud akce vložení byla dokončená znakem <paramref name="ch"/>; jinak FALSE.
            /// </returns>
            public bool InsertAction(TextArea textArea, char ch)
            {
                textArea.InsertString(text);
                return false;
            }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="text">text dokončovací položky</param>
            /// <param name="description">popis položky</param>
            public CommentCompletionData(string text, string description)
            {
                this.text = text;
                this.description = description;
            }
        }
    }
}
