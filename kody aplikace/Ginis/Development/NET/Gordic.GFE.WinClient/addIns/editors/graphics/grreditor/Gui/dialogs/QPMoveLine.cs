//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MoveLineQuestionPanel.cs               </Name>
//    <Description> dotazovací panel na přemístění řádku do určitého štítku     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// dotazovací panel na přemístění řádku do určitého štítku
    /// </summary>
    partial class QPMoveLine : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450062); } } //RC 29450062 : Přemístění řádku
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
            ReportDesignerProperties.Instance.GrrAutoMove = defaultValue;
            ReportDesignerProperties.Instance.GrrAutoMoveGroup = radioButton2.Checked;
            ReportDesignerProperties.Instance.GrrAutoMoveRegion = radioButton1.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.GrrAutoMove;
            radioButton2.Checked = ReportDesignerProperties.Instance.GrrAutoMoveGroup;
            radioButton1.Checked = ReportDesignerProperties.Instance.GrrAutoMoveRegion;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPMoveLine()
        {
            InitializeComponent();
        }

    }
}
