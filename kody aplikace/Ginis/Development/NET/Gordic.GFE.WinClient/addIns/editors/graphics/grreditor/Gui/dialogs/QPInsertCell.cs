//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InsertCellQuestionPanel.cs             </Name>
//    <Description> dotaz ohledně způsobu vložení nové buňky                    </Description>
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
    /// dotaz ohledně způsobu vložení nové buňky
    /// </summary>
    partial class QPInsertCell : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450060); } } //RC 29450060 : Vytvoření buňky
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
            ReportDesignerProperties.Instance.GrrAutoInsertCell = defaultValue;
            ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty = radioButton1.Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat = radioButton2.Checked;
            ReportDesignerProperties.Instance.GrrAutoInsertCellContent = radioButton3.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.GrrAutoInsertCell;
            radioButton1.Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellEmpty;
            radioButton2.Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellEmptyFormat;
            radioButton3.Checked = ReportDesignerProperties.Instance.GrrAutoInsertCellContent;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPInsertCell()
        {
            InitializeComponent();
        }
    }
}
