//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RegionPanel.cs                     </Name>
//    <Description> Panel vlastnosti regionu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-21                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Editor;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel vlastnosti atributu
    /// </summary>
    class RegionPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => null; }
        
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            try
            {
                if (Service != null)
                    // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                    foreach (object item in Service.SelectedComponents)
                    {
                        IRegion region = item as IRegion;
                        if (region != null)
                        {
                            if (item is ILabel)
                                ((Label)ControlDictionary["label"]).Text = GResources.GetResourceText(29451504) + ":'" + (item as ILabel).DataFullName + "'";
                            ((GLabeledTextBox)ControlDictionary["tbFilterIn"]).Text = region.FilterIn;
                            ((GLabeledTextBox)ControlDictionary["tbFilterOut"]).Text = region.FilterOut;
                            ((GLabeledTextBox)ControlDictionary["tbOrderBy"]).Text = region.OrderBy;
                            ((GLabeledTextBox)ControlDictionary["tbOnlyIf"]).Text = region.OnlyIf;
                        }
                    }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " RegionPanel:" + ex.Message); }
            _changeOnlyIf = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_changeOnlyIf || _changeOrderBy || _changeFilterOut || _changeFilterIn)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29451505));

                foreach (object item in Service.SelectedComponents)
                {
                    IRegion region = item as IRegion;
                    if (region != null)
                    {
                        region.FilterIn = ((GLabeledTextBox)ControlDictionary["tbFilterIn"]).Text;
                        region.FilterOut = ((GLabeledTextBox)ControlDictionary["tbFilterOut"]).Text;
                        region.OrderBy = ((GLabeledTextBox)ControlDictionary["tbOrderBy"]).Text;
                        region.OnlyIf = ((GLabeledTextBox)ControlDictionary["tbOnlyIf"]).Text;
                    }
                }
            }
            return base.Accept();
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.RegionPanel.xfrm");
                ((GLabeledTextBox)ControlDictionary["tbFilterIn"]).TextChanged += delegate{_changeFilterIn = true;};
                ((GLabeledTextBox)ControlDictionary["tbFilterOut"]).TextChanged += delegate { _changeFilterOut = true; };
                ((GLabeledTextBox)ControlDictionary["tbOrderBy"]).TextChanged += delegate { _changeOrderBy = true; };
                ((GLabeledTextBox)ControlDictionary["tbOnlyIf"]).TextChanged += delegate { _changeOnlyIf = true; };
                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " RegionPanel.xfrm:" + ex.Message); }
        }
        
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => item is IRegion);
        }
        #endregion

        bool _changeOnlyIf, _changeOrderBy, _changeFilterOut, _changeFilterIn;
    }
}
