//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractCompletionDataProvider.cs      </Name>
//    <Description> Abstraktní třída doplnění dat                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-19                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.TextEditor.Gui.CompletionWindow;
using System.Windows.Forms;
using Gordic.TextEditor;
using Gordic.GFE.Parsers.Services;
using System.Collections;
using Gordic.GFE.Parsers.Binding;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Abstraktní třída doplnění dat
    /// </summary>
    public abstract class AbstractCompletionDataProvider : ICompletionDataProvider
    {
        /// <summary>
        /// Seznam obrázků
        /// </summary>
        public virtual ImageList ImageList
        {
            get { return ClassBrowserIconService.ImageList; }
        }

        /// <summary>
        /// Index prvku v seznamu, který je vybrán jako výchozí.
        /// </summary>
        public int DefaultIndex { get; set; }
        /// <exclude/>
        protected string preSelection = null;
        /// <summary>
        /// Před výbraný text
        /// </summary>
        public string PreSelection { get { return preSelection; } }

        /// <summary>
        /// Indikuje vložení prázdného místa před doplněným textem
        /// </summary>
        public bool InsertSpace { get; set; }

        /// <summary>
        /// nastavení doplňování dat
        /// </summary>
        public ICompletionOptions Options { get; set; }

        /// <summary>
        /// Zjišťuje, zda stisknuta klávesa je podnětem pro vložení textu
        /// </summary>
        /// <param name="key">Stisknutá klávesa</param>
        public virtual CompletionDataProviderKeyResult ProcessKey(char key)
        {
            CompletionDataProviderKeyResult res;
            if (key == ' ' && InsertSpace)
            {
                InsertSpace = false; // vložit pouze jednu mezeru
                res = CompletionDataProviderKeyResult.BeforeStartKey;
            }
            else if (char.IsLetterOrDigit(key) || key == '_' 
                // složite atributy typu border-color
                || key == '-')
            {
                InsertSpace = false; // nevkládat mezeru, pokud uživatel piše normálně
                res = CompletionDataProviderKeyResult.NormalKey;
            }
            else
                // nevyplňuje mezerou po vložení
                res = CompletionDataProviderKeyResult.InsertionKey;
            return res;
        }
        /// <summary>
        /// Akce vložení textu z doplňovače dat
        /// </summary>
        /// <param name="data">data </param>
        /// <param name="textArea">oblast nad kterou se pracuje</param>
        /// <param name="insertionOffset">offset vkládaného textu</param>
        /// <param name="key">klíč</param>
        /// <returns></returns>
        public virtual bool InsertAction(ICompletionData data, TextArea textArea, int insertionOffset, char key)
        {
            if (InsertSpace)
                textArea.Document.Insert(insertionOffset++, " ");
            textArea.Caret.Position = textArea.Document.OffsetToPosition(insertionOffset);
            return data.InsertAction(textArea, key);
        }

        /// <summary>
        /// Generuje data pro doplnění.
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <param name="textArea">prostor pro práci</param>
        /// <param name="charTyped">již napsané písmenka</param>
        /// <returns></returns>
        public abstract ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped);
    }

    /// <summary>
    /// rozšíření abstraktních nápovědných dat
    /// </summary>
    public abstract class AbstractCodeCompletionDataProvider : AbstractCompletionDataProvider
    {
        Hashtable insertedElements = new Hashtable();
        Hashtable insertedPropertiesElements = new Hashtable();
        Hashtable insertedEventElements = new Hashtable();

        protected int caretLineNumber;
        protected int caretColumn;
        protected string fileName;

        protected List<ICompletionData> completionData = null;
        protected ExpressionContext overrideContext;

        /// <summary>
        /// generování nápovědných dat. Se volá ovladačem textu.
        /// </summary>
        public override ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped)
        {
            completionData = new List<ICompletionData>();
            this.fileName = fileName;
            IDocument document = textArea.Document;

            caretLineNumber = document.GetLineNumberForOffset(textArea.Caret.Offset) + 1;
            caretColumn = textArea.Caret.Offset - document.GetLineSegment(caretLineNumber - 1).Offset + 1;

            GenerateCompletionData(textArea, charTyped);

            return completionData.ToArray();
        }
        /// <summary>
        /// získání výrazu
        /// </summary>
        /// <param name="textArea">pracovní oblast</param>
        /// <returns></returns>
        protected virtual ExpressionResult GetExpression(TextArea textArea)
        {
            IDocument document = textArea.Document;
            IExpressionFinder expressionFinder = ParserService.GetExpressionFinder(fileName);
            if (expressionFinder == null)
                return new ExpressionResult(TextUtilities.GetExpressionBeforeOffset(textArea, textArea.Caret.Offset));
            else
            {
                ExpressionResult res = expressionFinder.FindExpression(document.GetText(0, textArea.Caret.Offset), textArea.Caret.Offset);
                if (overrideContext != null)
                    res.Context = overrideContext;
                return res;
            }
        }

        protected abstract void GenerateCompletionData(TextArea textArea, char charTyped);
        /// <summary>
        /// přidání nalezených výsledků
        /// </summary>
        /// <param name="list">kolekce dostupných možnosti</param>
        /// <param name="context">kontext textu</param>
        protected void AddResolveResults(ICollection list, ExpressionContext context)
        {
            if (list == null)
                return;
            completionData.Capacity += list.Count;
            CodeCompletionData suggestedData = null;
            foreach (object o in list)
            {
                if (context != null && !context.ShowEntry(o))
                    continue;
                CodeCompletionData ccd = CreateItem(o, context);
                if (context != null && object.Equals(o, context.SuggestedItem))
                    suggestedData = ccd;

                if (ccd != null)
                    completionData.Add(ccd);
            }

            if (context != null 
                && context.SuggestedItem != null)
            {
                if (suggestedData == null)
                {
                    suggestedData = CreateItem(context.SuggestedItem, context);
                    if (suggestedData != null)
                        completionData.Add(suggestedData);
                }
                if (suggestedData != null)
                {
                    completionData.Sort(DefaultCompletionData.Compare);
                    this.DefaultIndex = completionData.IndexOf(suggestedData);
                }
            }
        }

        CodeCompletionData CreateItem(object o, ExpressionContext context)
        {
            if (o is string)
            {
                int img = ClassBrowserIconService.AttributeIndex;
                return new CodeCompletionData(o.ToString(), img);
            }
            else if (o is IField)
                return new CodeCompletionData((IField)o);
            else if (o is ICompletationEntity)
                return new CodeCompletionData((ICompletationEntity)o);
            else if (o is TokenObject)
                return new CodeCompletionData(o as TokenObject);
            return null;
        }

        protected void AddResolveResults(ResolveResult results, ExpressionContext context)
        {
            insertedElements.Clear();
            insertedPropertiesElements.Clear();
            insertedEventElements.Clear();

            //if (results != null)
            //    AddResolveResults(results.GetCompletionData(ParserService.CurrentProjectContent), context);
        }
    }
}
