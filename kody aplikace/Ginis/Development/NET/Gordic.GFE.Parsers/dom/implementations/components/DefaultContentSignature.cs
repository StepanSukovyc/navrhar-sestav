//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentSignature.cs               </Name>
//    <Description> Podpis sestavy GRF                                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-11-09                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Podpis sestavy GRF
    /// </summary>
    public class DefaultContentSignature : DefaultAbstractContent, IDefaultDataItemHandler, IScriptable, IMouseComponent, IEditableContent
    {
        #region Init

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.signature;
            LoadInformation();
        }

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            base.LoadInformation();

            Text.Align.Horizontal = HAlign.center;
            Text.Align.Vertical = VAlign.center;

            //čtení textu tlačítka
            Text.Text = FormatTag.Attributes.GetValueDefault("text");
            if (string.IsNullOrEmpty(Text.Text))
                if (FormatTag is GFEFormatUnknownContent but)
                    Text.Text = but.InnerText;
            if (string.IsNullOrEmpty(Text.Text))
                Text.Text = FormatTag.Attributes.GetValueDefault("value");

            isLoaded = true;
        }

        /// <summary>Správce skriptů</summary>
        public ScriptManager ScriptManager { get { return dataItem.ScriptManager; } }

        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                dataItem = new DefaultDataItem();
                dataItem.AttachData(this, dataRegion);
            }
        }
        #endregion

        #region IMouseComponent
        /// <summary>
        /// kliknutí tlačítka
        /// </summary>
        /// <param name="x">abscissa kliknutí</param>
        /// <param name="y">ordinata kliknutí</param>
        public void Click(float x, float y)
        {
            //GScript s;
            //var l_script = Scripts.GetValueDefault("onClick", string.Empty);
            //if (l_script.Length == 0) return;
            //s = ScriptManager.PrepareScript(l_script, this);
            //if (s == null) return;
            //try { ScriptManager.RunScript(s); }
            //finally { s.Dispose(); }
            var d = new SignDialog(DataItem.Value);
            d.Save += delegate { UpdateContent(d.Value); };
            d.ShowDialog();
        }
        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, true);
        }
        #endregion

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            value = null;
            return 1;
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            return 1;
        }

        #endregion

        protected override void DrawContent(Graphics graphics)
        {
            base.DrawContent(graphics);
            graphics.DrawRectangle(SystemPens.ActiveBorder, LeftZoom, TopZoom, WidthZoom, HeightZoom);
        }


        #region IEditableContent Members

        GFEDataItem structItem;
        /// <summary>
        /// Položka struktury
        /// </summary>
        public GFEDataItem StructureItem
        {
            get
            {
                if (structItem == null)
                    if (!string.IsNullOrEmpty(DataName) && PageControl != null)
                        structItem = (GFEDataItem)CommonService.GetItemFromStructure(PageControl.Structure, DataFullPath, 1);
                return structItem;
            }
        }
        /// <summary>Titulek pole</summary>
        public string StructureItemTitle => StructureItem?.FullName;
        /// <summary>Popis pole</summary>
        public string StructureItemDescription => StructureItem?.Description;

        string IEditableContent.Tooltip
        {
            get
            {
                return "";
            }
            set
            {
            }
        }

        void IEditableContent.OnTextChanged()
        {
        }

        string IEditableContent.FormattedText
        {
            get { DataItem.SetDisplayValue(); return Text.Text; }
        }

        string IEditableContent.ComboItems
        {
            get { return ""; }
        }

        string IEditableContent.ComboKeyName
        {
            get { return ""; }
        }

        string IEditableContent.ComboValueName
        {
            get { return ""; }
        }

        #endregion

        #region IDefaultDataItemHandler Members

        /// <summary>
        /// Aktualizace datového obsahu
        /// </summary>
        /// <param name="content">aktuální obsah</param>
        public void UpdateContent(object content)
        {
            dataItem.UpdateDataContent(DataName, content, true);
        }
        /// <summary>
        /// Update souvisejícího obsahu (ale není přímo vázána)
        /// </summary>
        public void UpdateContent(string dataName, object content)
        {
            if (string.IsNullOrEmpty(dataName)) //tak nic
                return;
            dataItem.UpdateDataContent(dataName, content, false);
        }

        DefaultDataItem dataItem;
        /// <summary>
        /// Propojení mezí daty a danou položkou
        /// </summary>
        public IDefaultDataItem DataItem { get { return dataItem; } }

        #endregion
    }
}
