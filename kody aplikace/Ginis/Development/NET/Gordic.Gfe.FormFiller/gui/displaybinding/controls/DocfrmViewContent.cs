//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DocfrmViewContent.cs                  </Name>
//    <Description> Sekundární pohled na obsah zobrazeného GRF dokumentu.       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Linq;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Sekundární pohled na obsah zobrazeného GRF dokumentu.
    /// </summary>
    class DocfrmViewContent : DefaultViewContent, IMementoCapable, IZoomHandler, IDesignerPropertyHandler, IPreviewHandler
    {
        #region DefaultViewContent
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                ServiceManager.GraphicSettingService.RemoveItem(this);

            base.Dispose(disposing);
        }

        /// <exclude/>
        public override void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
            StatusBarService.Visible = false;
            if (file.Equals(PrimaryFile)
                && !oldView.Equals(this))
                primaryViewContent.SwitchToThisWithoutSaveLoad(file, oldView);
        }

        /// <exclude/>
        public override bool SwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView)
        {
            StatusBarService.Visible = true;
            return base.SwitchFromThisWithoutSaveLoad(file, newView);
        }
        #endregion

        #region IMementoCapable
        /// <exclude/>
        public Property CreateMemento()
        {
            Property property = new Property();
            property.Set("zoom", GraphicSettingService.GetZoom(this));
            property.Set("showgrid", GraphicSettingService.GetShowGrid(this));
            property.Set("showorder", GraphicSettingService.GetShowOrder(this));
            property.Set("showcolorof", GraphicSettingService.GetShowColorOf(this));
            return property;
        }

        /// <exclude/>
        public void SetMemento(Property memento)
        {
            GraphicSettingService.SetZoom(this, memento.Get("zoom", FormFillerProperties.Instance.Zoom));
            GraphicSettingService.SetShowGrid(this, memento.Get("showgrid", FormFillerProperties.Instance.ShowGrid));
            GraphicSettingService.SetShowOrder(this, memento.Get("showorder", FormFillerProperties.Instance.ShowOrder));
            GraphicSettingService.SetShowColorOf(this, memento.Get("showcolorof", FormFillerProperties.Instance.ShowColorOf));
            GraphicSettingService.SetResolution(this, new SizeValue(memento.Get("resolution", FormFillerProperties.Instance.Resolution)));
        }
        #endregion

        #region IZoomHandler
        /// <summary>
        /// Hodnota zvětšení
        /// </summary>
        /// <remarks>Math.Round být musí, protože bez něj se místo 90 % zobrazí pouze 89 %</remarks>
        public string ZoomValue
        {
            get { return string.Format("{0} %", (int)Math.Round(Zoom * 100)); }
            set
            {
                if (string.IsNullOrEmpty(value))
                    return;
                float zoom = -1;
                value = value.Replace("%", string.Empty);
                if (float.TryParse(value, out zoom))
                {
                    if (zoom != -1)
                        Zoom = zoom / 100;
                }
                else
                    try
                    {
                        IPage page = PagePanel.Pages.First();
                        if (page != null)
                            Zoom = (PagePanel.Width - 20 - 2 * page.Left) / page.Width;// 20 - šířka vertikalního posuvníku
                    }
                    catch (Exception ex)
                    {
                        MessageService.ShowErrorFormatted(GResources.GetResourceText(29450060) + " '{0}' " + GResources.GetResourceText(29450059) + "!\r\n{1}", value, ex.Message); //RC 29450060 : Hodnota zvětšení
                    }
            }
        }
        #endregion

        #region IDesignerPropertyHandler
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti rozlišení
        /// </summary>
        public bool EnableShowGrid { get { return true; } }
        /// <summary>
        /// veličina indikujíci dostupnosti změny viditelnosti řazení
        /// </summary>
        public bool EnableShowOrder { get { return false; } }

        /// <summary>
        /// Indikátor podbarevní datových položek
        /// </summary>
        public bool ShowColorOf
        {
            get { return GraphicSettingService.ShowColorOf; }
            set { GraphicSettingService.ShowColorOf = value; }
        }
        /// <summary>
        /// Indikátor podbarevní datových položek
        /// </summary>
        public bool ShowColorOfObjects
        {
            get { return GraphicSettingService.ShowColorOf; }
            set { GraphicSettingService.ShowColorOf = value; }
        }
        /// <summary>
        /// Indikátor zobrazení mřížky
        /// </summary>
        public bool ShowGrid
        {
            get { return GraphicSettingService.ShowGrid; }
            set { GraphicSettingService.ShowGrid = value; }
        }
        /// <summary>
        /// Indikátor zobrazení řazení
        /// </summary>
        public bool ShowOrder
        {
            get { return GraphicSettingService.ShowOrder; }
            set { GraphicSettingService.ShowOrder = value; }
        }
        /// <summary>
        /// Faktor zvětšení
        /// </summary>
        public float Zoom
        {
            get { return GraphicSettingService.Zoom; }
            set { GraphicSettingService.Zoom = value; }
        }
        /// <summary>
        /// Pře indexace
        /// </summary>
        public bool Reindex
        {
            get { return false; }
            set { }
        }
        #endregion

        #region IPreviewHandler
        /// <exclude/>
        public bool EnablePreviewEdit { get { return true; } }
        /// <exclude/>
        public void Preview()
        {
            //var structureSection = (primaryViewContent as IDataManagerHandler).Filler.StructureSection;
            //string xmefileName = FileUtility.Combine(structureSection.Items[0].Location, structureSection.Items[0].Name);

            var alf = new FileInfo(FormFile.ContentFileName);
            var dat = new FileInfo(PrimaryFileName);
            var srz = PreviewService.CreateSrzFile(alf, dat, /*xmefileName,*/ "Náhled", out GFETempDir tmp);
            //uz je zaregistrovano TemporaryService.RegisterDirectory(
            if (!FileUtility.StartVidRun(srz.FullName)) MessageService.ShowWarning(GResources.GetResourceText(29450088)); //RC 29450088 : Nejde vytvořit náhled souboru!
        } 
        
        /// <exclude/>
        public void PreviewEdit() { }
        #endregion
    }
}
