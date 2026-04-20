//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextEditorXmlPanel.cs                  </Name>
//    <Description> Panel nastavení formátování XML obsahu                      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-23                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.TextEditor;
using Gordic.GFE.WinClient.Gui;
using System.Collections.Generic;
using System.Linq;
using Gordic.General;
using Gordic.GFE.Parsers.addins.editors.texteditor.xmlFormatting;

namespace Gordic.GFE.WinClient.Dialogs.OptionPanels
{
    /// <summary>
    /// Panel nastavení formátování XML obsahu
    /// </summary>
    class TextEditorXmlPanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.TextEditorXmlPanel.xfrm");

            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;
            InitializeAttributeRButtons(properties);
        }

        #region Xml Attribute RadioButtons
        const string ATT_RBTNS_PREFIX = "rbAtt";
        void InitializeAttributeRButtons(ReportDesignerTextEditorProperties properties)
        {
            var attButtons = GetAttributeRadioButtons();
            foreach (var button in attButtons)
            {
                button.Value.CheckedChanged += (s, e) =>
                {
                    var senderBtn = (RadioButton)s;
                    if (senderBtn.Checked == false)
                        return;

                    foreach (var item in attButtons)
                        if (item.Key != senderBtn.Name)
                            item.Value.Checked = false;
                };

                button.Value.Checked = (int)GetXmlAttributeEnumByButtonKey(button.Key) == (int)properties.XmlAttributesAlign;
            }
        }

        Dictionary<string, RadioButton> GetAttributeRadioButtons()
        {
            var keys = GetButtonKeysByXmlAttributeEnum();
            var dic = new Dictionary<string, RadioButton>();

            foreach (var key in keys)
                try
                {
                    dic.Add(key, (RadioButton)ControlDictionary[key]);
                }
                catch (Exception ex)
                {
                    throw new Exception(GResources.GetResourceText(29450002).Replace("{key}", key), ex); //RC-EX 2945194 : Button {key} is not implemented!
                }

            return dic;
        }

        List<string> GetButtonKeysByXmlAttributeEnum()
        {
            var list = new List<string>();
            foreach (var item in Enum.GetNames(typeof(XmlAttributesAlign)))
                list.Add(ATT_RBTNS_PREFIX + item);

            return list;
        }

        XmlAttributesAlign GetXmlAttributeEnumByButtonKey(string buttonKey) => (XmlAttributesAlign)Enum.Parse(typeof(XmlAttributesAlign), buttonKey.Replace(ATT_RBTNS_PREFIX, ""), true);
        #endregion

        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public override bool StorePanelContents()
        {
            ReportDesignerTextEditorProperties properties = ReportDesignerTextEditorProperties.Instance;

            var btn = GetAttributeRadioButtons().FirstOrDefault(x => x.Value.Checked);
            properties.XmlAttributesAlign = GetXmlAttributeEnumByButtonKey(btn.Key);

            IViewContent activeViewContent = SimpleDesktop.Desktop.ActiveViewContent;
            if (activeViewContent is ITextEditorControlProvider provider)
            {
                TextEditorControl textarea = provider.TextEditorControl;
                textarea.OptionsChanged();
            }

            return true;
        }
    }
}
