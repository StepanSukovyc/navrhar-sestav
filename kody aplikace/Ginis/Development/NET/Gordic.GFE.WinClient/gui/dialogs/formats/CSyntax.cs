//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CSyntax.cs                             </Name>
//    <Description> Ovladač změny syntaxe textu                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-05-22                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.WinClient.Gui;
using System.Collections;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.DefaultEditor;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Ovladač změny syntaxe textu
    /// </summary>
    partial class CSyntax : UserControl, IDialogDefaultable
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        private CSyntax()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Konstruktor třídy dle obsahu
        /// </summary>
        /// <param name="content">Obsah</param>
        public CSyntax(IViewContent content)
            : this()
        {
            Content = content;
            Loading = true;
        }

        #region IDialogDefaultable
        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        public bool Loading { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        public bool Canceling { get; set; }

        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }

        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        public bool Change { get; set; }
        /// <summary>
        /// Titulek ovladače
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450450); } } //RC 29450450 : Změna syntaxe
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept()
        {
        }

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel()
        {
            //if (Content != null && Content is ITextEditorControlProvider)
            //    (Content as ITextEditorControlProvider).SetSyntax(oldSyntax);
        }

        string oldSyntax;
        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault()
        {
            if (Content != null && Content is ITextEditorControlProvider)
            {
                listBoxSyntax.Items.Clear();
                if (string.IsNullOrEmpty(oldSyntax))
                    oldSyntax = (Content as ITextEditorControlProvider).TextEditorControl.Document.HighlightingStrategy.Name;
                //else (Content as ITextEditorControlProvider).SetSyntax(oldSyntax);

                foreach (DictionaryEntry entry in HighlightingManager.Manager.HighlightingDefinitions)
                    listBoxSyntax.Items.Add(new SyntaxItem(entry.Key.ToString()));
                    //item.Checked = control.Document.HighlightingStrategy.Name == ;

                if (!string.IsNullOrEmpty(oldSyntax))
                    listBoxSyntax.SelectedIndex = listBoxSyntax.Items.IndexOf(oldSyntax);
            }
            Change = false;
        }
        #endregion

        private void listBoxSyntax_SelectedIndexChanged(object sender, EventArgs e)
        {
            //if (Content != null && Content is ITextEditorControlProvider)
            //    (Content as ITextEditorControlProvider).SetSyntax((listBoxSyntax.SelectedItem as SyntaxItem).Name);
        }

        /// <summary>
        /// Položka seznamu syntaxí
        /// </summary>
        sealed class SyntaxItem
        {
            /// <summary>
            /// Název položky
            /// </summary>
            public string Name { get; set; }
            /// <summary>
            /// Hodnota položky
            /// </summary>
            public string Value { get; set; }

            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="nameValue">Hodnota obsahující jak název položky tak i hodnotu položky</param>
            public SyntaxItem(string nameValue)
            {
                string[] newValue = nameValue.Split(';');
                if (newValue.Length == 1)
                {
                    this.Name = newValue[0];
                    this.Value = newValue[0];
                }
                else if (newValue.Length == 0)
                {
                    this.Name = string.Empty;
                    this.Value = string.Empty;
                }
                else if (newValue.Length == 2)
                {
                    this.Name = newValue[1];
                    this.Value = newValue[0];
                }
            }

            /// <summary>
            /// Přetížení kvůli zobrazení v seznamu
            /// </summary>
            /// <returns></returns>
            public override string ToString()
            {
                return this.Value;
            }

            /// <summary>
            /// Toto přetížení je vyžadováno při přetížení ToString
            /// </summary>
            /// <returns></returns>
            public override int GetHashCode()
            {
                return base.GetHashCode();
            }

            /// <summary>
            /// Přetížení kvůli porovnání s řetězcovou hodnotou
            /// </summary>
            /// <param name="obj">Objekt porovnání</param>
            /// <returns></returns>
            public override bool Equals(object obj)
            {
                if (obj is string)
                    return String.Equals((obj as string), this.Name, StringComparison.InvariantCultureIgnoreCase);
                else if (!(obj is SyntaxItem))
                    return base.Equals(obj);

                SyntaxItem objasof = (obj as SyntaxItem);
                return (this.Name == objasof.Name) && (this.Value == objasof.Value);
            }
        }

        private void LBSyntaxMouseDoubleClick(object sender, MouseEventArgs e)
        {
            if (AcceptEvent != null)
                AcceptEvent(sender, e);
        }

        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;
    }
}
