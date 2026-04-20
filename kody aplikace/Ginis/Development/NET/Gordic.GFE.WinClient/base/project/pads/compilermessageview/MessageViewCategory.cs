//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MessageViewCategory.cs                 </Name>
//    <Description> Prezentuje kategorii s textovou obsluhou ve výstupní podložce (CompilerMessageView)</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Prezentuje kategorii s textovou obsluhou ve výstupní podložce (CompilerMessageView)
    /// </summary>
    class MessageViewCategory
    {
        #region Staticeké metody vytvoření MessageViewCategories
        /// <summary>
        /// Vytvoření nové instance třídy se specifickou kategorii
        /// a přidání jí do podložky CompilerMessageView.
        /// </summary>
        public static void Create(ref MessageViewCategory messageViewCategory, string category)
        {
            Create(ref messageViewCategory, category, category);
        }

        /// <summary>
        /// Vytvoření nové instance třídy se specifickou kategorii
        /// a přidání jí do podložky CompilerMessageView.
        /// </summary>
        public static void Create(ref MessageViewCategory messageViewCategory, string category, string displayCategory)
        {
            if (CompilerMessageView.Instance != null)
            {
                MessageViewCategory newMessageViewCategory = new MessageViewCategory(category, displayCategory);
                if (System.Threading.Interlocked.CompareExchange(ref messageViewCategory, newMessageViewCategory, null) == null)
                    CompilerMessageView.Instance.AddCategory(newMessageViewCategory);
            }
        }
        #endregion

        string category;
        string displayCategory;
        readonly StringBuilder textBuilder = new StringBuilder();

        /// <summary>
        /// Získání objektu, ve kterém je MessageViewCategory uzamčeno.
        /// </summary>
        public object SyncRoot { get { return textBuilder; } }

        /// <summary>
        /// Kategorie
        /// </summary>
        public string Category { get { return category; } }

        /// <summary>
        /// Zpbrazovaný název kategorie
        /// </summary>
        public string DisplayCategory { get { return displayCategory; } }
        /// <summary>
        /// Text
        /// </summary>
        public string Text { get { lock (textBuilder) { return textBuilder.ToString(); } } }

        /// <summary>
        /// Vytvořenéní nové instance třídy s určitou kategorii
        /// </summary>
        /// <param name="category">Kategorie třídy</param>
        /// <param name="displayCategory">Zobrazovaný název kategorie</param>
        public MessageViewCategory(string category, string displayCategory)
        {
            this.category = category;
            this.displayCategory = displayCategory;
        }

        /// <summary>
        /// Přidání řádku
        /// </summary>
        /// <param name="text">Přidávaný text</param>
        public void AppendLine(string text)
        {
            AppendText(text + Environment.NewLine);
        }
        /// <summary>
        /// Přidání textu jako řádku
        /// </summary>
        /// <param name="text">Přidávaný text</param>
        public void AppendText(string text)
        {
            const int MaxTextSize = 50 * 1000 * 1000; // 50m symbolů = 100 MB
            string TruncatedText = '<' + GResources.GetResourceText(29450339) + ">\r\n"; //RC 29450339 : Text byl zkrácen, protože byl příliš dlouhý

            lock (textBuilder)
            {
                if (textBuilder.Length + text.Length > MaxTextSize)
                {
                    int amountToCopy = MaxTextSize / 2 - text.Length;
                    if (amountToCopy <= 0)
                        SetText(TruncatedText + text.Substring(text.Length - MaxTextSize / 2, MaxTextSize / 2));
                    else
                        SetText(TruncatedText + textBuilder.ToString(textBuilder.Length - amountToCopy, amountToCopy) + text);
                }
                else
                {
                    textBuilder.Append(text);
                    OnTextAppended(new TextEventArgs(text));
                }
            }
        }
        /// <summary>
        /// Nastavení textu
        /// </summary>
        /// <param name="text">Nastavovaný text</param>
        public void SetText(string text)
        {
            lock (textBuilder)
            {
                // vyčištění textu:
                textBuilder.Length = 0;
                // obnovení kapacity:
                textBuilder.Capacity = text.Length + 16;
                textBuilder.Append(text);
                OnTextSet(new TextEventArgs(text));
            }
        }
        /// <summary>
        /// čištění textu
        /// </summary>
        public void ClearText() { SetText(string.Empty); }
        /// <exclude/>
        protected virtual void OnTextAppended(TextEventArgs e)
        {
            TextAppended?.Invoke(this, e);
        }
        /// <exclude/>
        protected virtual void OnTextSet(TextEventArgs e)
        {
            TextSet?.Invoke(this, e);
        }

        /// <summary>
        /// Volá se po přidání textu do MessageViewCategory.
        /// </summary>
        public event TextEventHandler TextAppended;

        /// <summary>
        /// Volá se po přidání textu do MessageViewCategory.
        /// </summary>
        public event TextEventHandler TextSet;
    }
}
