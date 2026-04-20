//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InsertLineQuestionPanel.cs             </Name>
//    <Description> dialogový panel na vložení nového řádku před/za daný        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-23                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// dialogový panel na vložení nového řádku před/za daný
    /// </summary>
    partial class QPInsertLine : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450061); } } //RC 29450061 : Nový řádek
        bool defaultValue;
        /// <summary>
        /// indikuje, že hodnota je výchozí
        /// </summary>
        public bool DefaultValue { get { return defaultValue; } set { defaultValue = value; } }
        /// <summary>
        /// načtení panelu
        /// </summary>
        public void LoadPanel() { SetMemento(new Property()); }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public Property CreateMemento()
        {
            ReportDesignerProperties.Instance.GrrAutoInsertLine = defaultValue;
            ReportDesignerProperties.Instance.GrrAutoInsertLineEmpty = radioButton1.Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertLineContent = radioButton2.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.GrrAutoInsertLine;
            radioButton1.Checked = ReportDesignerProperties.Instance.GrrAutoInsertLineEmpty;
            radioButton2.Checked = ReportDesignerProperties.Instance.GrrAutoInsertLineContent;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPInsertLine()
        {
            InitializeComponent();
        }
    }
}
