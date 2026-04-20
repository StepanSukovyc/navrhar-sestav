//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.QPIncludeLineContent.cs                </Name>
//    <Description> dotaz na vložení nového regionu                             </Description>
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
    /// dotaz na vložení nového regionu
    /// </summary>
    partial class QPIncludeLineContent : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450059); } } //RC 29450059 : Vložení regionu
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
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContent = defaultValue;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineBefore = radioButton1.Checked;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineAfter = radioButton3.Checked;
            ReportDesignerProperties.Instance.GrrAutoIncludeLineContentIncludeLine = radioButton2.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.GrrAutoIncludeLineContent;
            radioButton1.Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineBefore;
            radioButton2.Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentIncludeLine;
            radioButton3.Checked = ReportDesignerProperties.Instance.GrrAutoIncludeLineContentNewLineAfter;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPIncludeLineContent()
        {
            InitializeComponent();
        }
    }
}
