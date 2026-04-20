//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.validate.cs                            </Name>
//    <Description> Validační pravidla pro komponenty                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2017-02-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System;
using Gordic.GFE.Parsers.Core;
using System.ComponentModel;
using System.Xml;
using Gordic.GFE.WinClient.Gui;
using System.Collections.Generic;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Reprezentuje validační pravidlo pro komponenty
    /// </summary>
    class Validate : IValidate
    {
        #region Private Fields
        readonly UndoRedo<ValidType> type = new UndoRedo<ValidType>();
        readonly UndoRedo<string> message = new UndoRedo<string>();
        readonly UndoRedo<string> min_value = new UndoRedo<string>();
        readonly UndoRedo<string> max_value = new UndoRedo<string>();
        readonly UndoRedo<string> allowed = new UndoRedo<string>();
        readonly UndoRedo<string> disallowed = new UndoRedo<string>();
        readonly UndoRedo<string> ext = new UndoRedo<string>();

        List<string> knownTags;
        GFEFormatTag formatTag;
        #endregion

        #region Public Properties
        /// <summary>
        /// Typ validace
        /// </summary>
        public ValidType Type
        {
            get => type.Value;
            set => type.Value = value;
        }

        /// <summary>
        /// Chybová zpráva validace
        /// </summary>
        public string Message
        {
            get => message.Value;
            set => message.Value = value;
        }

        /// <summary>
        /// Minimální hodnota
        /// </summary>
        public string MinValue
        {
            get => min_value.Value;
            set => min_value.Value = value;
        }

        /// <summary>
        /// Maximální hodnota
        /// </summary>
        public string MaxValue
        {
            get => max_value.Value;
            set => max_value.Value = value;
        }

        /// <summary>
        /// Povolené hodnoty
        /// </summary>
        public string Allowed
        {
            get => allowed.Value;
            set => allowed.Value = value;
        }

        /// <summary>
        /// Nepovolené hodnoty
        /// </summary>
        public string Disallowed
        {
            get => disallowed.Value;
            set => disallowed.Value = value;
        }

        /// <summary>
        /// Přípony souborů
        /// </summary>
        public string Ext
        {
            get => ext.Value;
            set => ext.Value = value;
        }

        /// <summary>
        /// Placeholder pro chybovou zprávu (nese se při inicializaci, ale není součástí dat)
        /// </summary>
        [Browsable(false)]
        public string MessagePlaceholder { get; set; }

        /// <summary>
        /// Placeholder pro minimální hodnotu
        /// </summary>
        [Browsable(false)]
        public string MinValuePlaceholder { get; set; }

        /// <summary>
        /// Placeholder pro maximální hodnotu
        /// </summary>
        [Browsable(false)]
        public string MaxValuePlaceholder { get; set; }

        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public List<string> KnownTags
        {
            get
            {
                if (knownTags == null)
                    knownTags = AddInTree.BuildItem("/ReportDesigner/GrfList/ValidateTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Informace o formátu objektu
        /// </summary>
        [Browsable(false)]
        public GFEFormatTag FormatTag
        {
            get => formatTag;
            protected set => formatTag = value;
        }
        #endregion

        #region Constructors
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public Validate()
        {
        }

        /// <summary>
        /// Konstruktor s parametrem formátovací značky
        /// </summary>
        /// <param name="pFormatTag">Formátovací značka</param>
        public Validate(GFEFormatTag pFormatTag)
        {
            FormatTag = pFormatTag;
            if (pFormatTag != null)
            {
                foreach (var item in pFormatTag.Attributes)
                {
                    switch (item.Key)
                    {
                        case "type":
                            if (Enum.TryParse(item.Value, out ValidType parsedType))
                                Type = parsedType;
                            break;
                        case "message":
                            Message = item.Value;
                            break;
                        case "min":
                            MinValue = item.Value;
                            break;
                        case "max":
                            MaxValue = item.Value;
                            break;
                        case "allowed":
                            Allowed = item.Value;
                            break;
                        case "disallowed":
                            Disallowed = item.Value;
                            break;
                        case "ext":
                            Ext = item.Value;
                            break;
                    }
                }
            }
        }

        /// <summary>
        /// Kopie objektu
        /// </summary>
        /// <param name="item">Zdrojový validační objekt</param>
        public Validate(IValidate item)
        {
            if (item == null) return;

            Message = item.Message;
            Type = item.Type;
            MinValue = item.MinValue;
            MaxValue = item.MaxValue;
            Allowed = item.Allowed;
            Disallowed = item.Disallowed;
            Ext = item.Ext;
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// Generování XML obsahu objektu
        /// </summary>
        /// <param name="xmlDoc">XML dokument</param>
        /// <param name="namespaceUri">Namespace URI</param>
        /// <returns>XML uzel s validačními daty</returns>
        public XmlNode GetDataContent(XmlDocumentPosition xmlDoc, string namespaceUri = null)
        {
            XmlElement xmlNode = xmlDoc.CreateElement("validate",
                string.IsNullOrEmpty(namespaceUri) ? ReportDesignerProperties.Instance.AlfReportXmlns : namespaceUri);

            xmlNode.SetAttribute("type", Type.ToString());

            // Ukládej pouze skutečné hodnoty, ne placeholdery
            if (!string.IsNullOrEmpty(Message) && !IsPlaceholderValue(Message, MessagePlaceholder))
                xmlNode.SetAttribute("message", Message);

            if (!string.IsNullOrEmpty(MinValue) && !IsPlaceholderValue(MinValue, MinValuePlaceholder))
                xmlNode.SetAttribute("min", MinValue);

            if (!string.IsNullOrEmpty(MaxValue) && !IsPlaceholderValue(MaxValue, MaxValuePlaceholder))
                xmlNode.SetAttribute("max", MaxValue);

            if (!string.IsNullOrEmpty(Allowed))
                xmlNode.SetAttribute("allowed", Allowed);

            if (!string.IsNullOrEmpty(Disallowed))
                xmlNode.SetAttribute("disallowed", Disallowed);

            if (!string.IsNullOrEmpty(Ext))
                xmlNode.SetAttribute("ext", Ext);

            return xmlNode;
        }

        /// <summary>
        /// Kontroluje, zda hodnota odpovídá placeholderu
        /// </summary>
        /// <param name="value">Kontrolovaná hodnota</param>
        /// <param name="placeholder">Placeholder text</param>
        /// <returns>True pokud hodnota je placeholder</returns>
        private bool IsPlaceholderValue(string value, string placeholder)
        {
            return !string.IsNullOrEmpty(placeholder) && value == placeholder;
        }

        /// <summary>
        /// Indikuje, zda je validace prázdná
        /// </summary>
        /// <returns>True pokud má pouze zprávu a nic jiného</returns>
        internal bool IsEmpty()
        {
            return !string.IsNullOrEmpty(Message) &&
                   string.IsNullOrEmpty(MinValue) &&
                   string.IsNullOrEmpty(MaxValue) &&
                   string.IsNullOrEmpty(Allowed) &&
                   string.IsNullOrEmpty(Disallowed) &&
                   string.IsNullOrEmpty(Ext);
        }

        /// <summary>
        /// Textová reprezentace objektu
        /// </summary>
        /// <returns>Řetězec "validace"</returns>
        public override string ToString() => "validace";
        #endregion
    }
}
