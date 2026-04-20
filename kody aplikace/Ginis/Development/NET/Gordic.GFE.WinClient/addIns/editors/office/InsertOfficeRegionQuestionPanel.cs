//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InsertOfficeRegionQuestionPanel.cs     </Name>
//    <Description> panel dotazu vložení regionu do office objektů              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-22                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.General;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.AddIns.Editors.Office
{
    /// <summary>
    /// panel dotazu vložení regionu do office objektů
    /// </summary>
    partial class InsertOfficeRegionQuestionPanel : UserControl, IQuestionPanel, IMementoCapable
    {
        #region IQuestionPanel
        /// <summary>
        /// titulek okna
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450187); } } //RC 29450187 : Vložení sekce
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
        IOfficeDocument office;
        /// <exclude/>
        public Property CreateMemento()
        {
            if (office != null)
                office.SetInsertSectionProperty(defaultValue, cbHead.Checked, cbBody.Checked, cbFoot.Checked);

            return new Property();
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            if (office != null)
            {
                bool head = false, body = false, foot = false;
                office.GetInsertSectionProperty(ref defaultValue, ref head, ref body, ref foot);
                cbHead.Checked = head;
                cbBody.Checked = body;
                cbFoot.Checked = foot;
            }
        }
        #endregion

        /// <summary>
        /// Indikuje vytvoření hlavičky
        /// </summary>
        public bool Head { get { return cbHead.Checked; } }

        /// <summary>
        /// Indikuje vytvoření těla
        /// </summary>
        public bool Body { get { return cbBody.Checked; } }

        /// <summary>
        /// Indikuje vytvoření paičky
        /// </summary>
        public bool Foot { get { return cbFoot.Checked; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        InsertOfficeRegionQuestionPanel()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="office">reference na dokument do kterého se vkládá</param>
        public InsertOfficeRegionQuestionPanel(IOfficeDocument office)
            : this()
        {
            this.office = office;
        }
    }
}
