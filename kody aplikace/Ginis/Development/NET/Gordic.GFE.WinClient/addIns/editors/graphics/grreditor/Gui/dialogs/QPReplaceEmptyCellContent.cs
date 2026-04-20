//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.QPReplaceEmptyCellContent.cs           </Name>
//    <Description> dotaz ohledně způsobu vložení obsahu do prázdné buňky       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-31                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// dotaz ohledně způsobu vložení obsahu do prázdné buňky
    /// </summary>
    partial class QPReplaceEmptyCellContent : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450063); } } //RC 29450063 : Vložení obsahu do prázdné buňky
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
            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContent = defaultValue;
            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentDivide = radioButton1.Checked;
            ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentReplace = radioButton2.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContent;
            radioButton1.Checked = ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentDivide;
            radioButton2.Checked = ReportDesignerProperties.Instance.GrrAutoReplaceEmptyCellContentReplace;
        }
        #endregion


        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPReplaceEmptyCellContent()
        {
            InitializeComponent();
        }
    }
}
