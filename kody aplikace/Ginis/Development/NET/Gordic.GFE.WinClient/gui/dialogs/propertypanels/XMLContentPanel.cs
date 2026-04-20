//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XMLContentPanel.cs                     </Name>
//    <Description> panel editace XML obsahu                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-29                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel editace XML obsahu
    /// </summary>
    class XMLContentPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return XMLContent; } }
        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            XMLContent = string.Empty;
            try
            {
                if (Service != null)
                {
                    bool first = true;
                    foreach (object selecteditem in Service.SelectedComponents)
                        if (selecteditem is IXMLContent)
                            if (first)
                            {
                                first = false;
                                XMLContent = (selecteditem as IXMLContent).InnerText;
                            }
                            else
                            {
                                string newText = (selecteditem as IXMLContent).InnerText;
                                if (!newText.Equals(XMLContent, StringComparison.InvariantCultureIgnoreCase))
                                    XMLContent = string.Empty;
                            }
                }
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " XMLContentPanel:" + ex.Message); }

            textEditorControl.Text = XMLContent;
            textEditorControl.Refresh();
            _change = false;
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.XMLContentPanel.xfrm");
                textEditorControl = (TextEditorControl)ControlDictionary["textEditorControl"];
                textEditorControl.TextChanged += delegate { _change = true; ThreadService.SafeThreadAsyncCall(XmlValidate); };
                ContextMenuStrip strip = MenuService.CreateContextMenu(textEditorControl, new EventArgsContextMenu("/SinglePropertyDialog/ContextMenu/XMLContentPanel"));
                if (strip != null)
                    textEditorControl.ContextMenuStrip = strip;
                errorProvider = new ErrorProvider();
                errorProvider.ContainerControl = this;
                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " XMLContentPanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (_change)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450489)); //RC 29450489 : změna XML obashu

                foreach (object item in Service.SelectedComponents)
                    if (item is IXMLContent)
                        (item as IXMLContent).InnerText = XMLContent;
            }
            return base.Accept();
        }

        void XmlValidate()
        {
            try
            {
                XMLContent = textEditorControl.Text;
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(string.Format("<root>{0}</root>", textEditorControl.Text));
                errorProvider.Clear();
            }
            catch (Exception ex) { errorProvider.SetError(textEditorControl, ex.Message); }
        }

        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => !(item is IGRRLabel) && item is IXMLContent);
        }
        #endregion

        string XMLContent;
        bool _change = false;
        TextEditorControl textEditorControl;
        ErrorProvider errorProvider;
    }
}
