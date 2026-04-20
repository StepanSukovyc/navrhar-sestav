//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.QPSaveNewAlfxFormat.cs                 </Name>
//    <Description> dialogový panel dotazu na typ ukládané sestavy              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-18                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// dialogový panel dotazu na typ ukládané sestavy
    /// </summary>
    partial class QPSaveNewAlfxFormat : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450035); } } //RC 29450035 : Formát uložení
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
            ReportDesignerProperties.Instance.AlfAutoSaveFormat = defaultValue;
            ReportDesignerProperties.Instance.AlfSaveFormatOld = radioButton1.Checked;
            ReportDesignerProperties.Instance.AlfSaveFormatNew = radioButton2.Checked;
            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            defaultValue = ReportDesignerProperties.Instance.AlfAutoSaveFormat;
            radioButton1.Checked = ReportDesignerProperties.Instance.AlfSaveFormatOld;
            radioButton2.Checked = ReportDesignerProperties.Instance.AlfSaveFormatNew;
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public QPSaveNewAlfxFormat() { InitializeComponent(); }
    }
}
