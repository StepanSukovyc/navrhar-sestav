//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RtfContent.cs                          </Name>
//    <Description> Obsah RTF objektu                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using Gordic.GFE.Parsers;
using System.Drawing.Design;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Services;
using Gordic.Documents.Rtf;
using Gordic.Report.Implementation;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Obsah RTF objektu
    /// </summary>
    class RtfContent : IScriptHandler, IFormatting, IComponent, IAttributeHandler, IPositionHandler, IBarcode
    {
        #region IFormatting
        /// <summary>
        /// Formátování textu
        /// </summary>
        [Category("Obsah")]
        [DisplayName("formát")]
        [Description("Vlastní formát textu")]
        [EditorAttribute(typeof(TextFormattingEditor), typeof(UITypeEditor))]
        public string Format { get; set; }
        #endregion

        #region IScriptHandler
        readonly UndoRedo<GFEScriptList> scripts = new UndoRedo<GFEScriptList>();
        /// <summary>
        /// Dostupné skripty objektu
        /// </summary>
        [DisplayName("skripty")]
        [Description("Dostupné skripty objektu")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public GFEScriptList Scripts { get { return scripts.Value; } set { scripts.Value = value; } }
        #endregion

        #region IComponent
        /// <exclude/>
        public event EventHandler Disposed;
        /// <exclude/>
        [Browsable(false)]
        public ISite Site { get; set; }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Disposed?.Invoke(this, EventArgs.Empty);
        }
        #endregion

        #region IAttributeHandler
        readonly UndoRedo<GFEAttrList> attrlist = new UndoRedo<GFEAttrList>();
        /// <summary>
        /// Všechny atributy objektu
        /// </summary>
        [DisplayName("atributy")]
        [Description("Všechny atributy objektu")]
        [EditorAttribute(typeof(AttributeListEditor), typeof(UITypeEditor))]
        public GFEAttrList AttrList { get { return attrlist.Value; } set { attrlist.Value = value; } }

        List<string> knownTags = null;
        /// <summary>
        /// Seznam znamých atributů
        /// </summary>
        [Browsable(false)]
        public virtual List<string> KnownTags
        {
            get
            {
                if (knownTags == null && MacroButtonType != GRTFField.GMBType.unknown)
                    if (MacroButtonType == GRTFField.GMBType.field)
                        knownTags = AddInTree.BuildItem("/ReportDesigner/RtfList/ValueOfTags", null) as List<string>;
                    else
                        knownTags = AddInTree.BuildItem("/ReportDesigner/RtfList/RegionTags", null) as List<string>;
                return knownTags;
            }
        }

        /// <summary>
        /// Neznámé značky buňky
        /// </summary>
        [Browsable(false)]
        public virtual Dictionary<string, string> Unknowns
        {
            get
            {
                return AttrList == null || KnownTags == null || Scripts == null
                    ? new Dictionary<string, string>()
                    : AttrList.FindAllByKey(attr => !KnownTags.Contains(attr) && !Scripts.ContainsKey(attr));
            }
        }
        #endregion

        #region IPositionHandler
        /// <summary>
        /// Začátek pozice
        /// </summary>
        [Browsable(false)]
        public int StartPosition { get; set; }
        /// <summary>
        /// Konec pozice
        /// </summary>
        [Browsable(false)]
        public int EndPosition { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public string PSType { get { return "value-of"; } }
        /// <summary>
        /// typ objektu
        /// </summary>
        [Browsable(false)]
        public bool IsInStyle { get { return false; } }
        /// <summary>
        /// 
        /// </summary>
        [Browsable(false)]
        public bool CanBeSameANested { get { return false; } }

        #endregion

        #region IBarcode
        readonly UndoRedo<ITextHandler> textable = new UndoRedo<ITextHandler>();
        /// <summary>
        /// vnitřní objekt
        /// </summary>
        [Browsable(false)]
        public ITextHandler Textable
        {
            get => textable.Value;
            set => textable.Value = value;
        }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("typ (řetězec)")]
        [Description("Typ objektu (řetězcová prezentace)")]
        public string TypeRaw { get; set; }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Browsable(false)]
        public BarcodeTypeEnum Type { get; set; }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Browsable(false)]
        public int O1 { get; set; }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Browsable(false)]
        public int O2 { get; set; }

        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Browsable(false)]
        public int O3 { get; set; }

        /// <summary>
        /// indikuje, že text lze změnít bez přetažení datové položky
        /// </summary>
        [ReadOnly(false)]
        [Category("Čárový kód")]
        [DisplayName("lze editovat")]
        [Description("Pokud tato hodnota je nastavená na TRUE, pak nejde editovat text, protože obsahem je datová položka.")]
        [TypeConverter(typeof(BooleanTypeConverter))]
        [Browsable(false)]
        public bool Editable { get => Textable == null || !(Textable is IDataItem); }

        /// <summary>
        /// vnitřní text pro případ, že objekt neobsahuje vůbec nic
        /// </summary>
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("text")]
        [Description("textový obsah objektu")]
        [Browsable(false)]
        public string Text
        {
            get;
            set;
        }

        readonly UndoRedo<string> imageWidth = new UndoRedo<string>();
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("šířka")]
        [Description("Šířka obrázku čárového kódu")]
        public string ImageWidth
        {
            get => imageWidth.Value;
            set
            {
                imageWidth.Value = value;
                if (!AttrList.ContainsKey("image-height"))
                    AttrList.Add("image-width", value);
                else AttrList["image-width"] = value;
            }
        }

        readonly UndoRedo<string> imageHeight = new UndoRedo<string>();
        /// <summary>
        /// typ objektu BARCODE
        /// </summary>
        [Category("Čárový kód")]
        [DisplayName("výška")]
        [Description("Výška obrázku čárového kódu")]
        public string ImageHeight
        {
            get => imageHeight.Value;
            set
            {
                imageHeight.Value = value;
                if (!AttrList.ContainsKey("image-height"))
                    AttrList.Add("image-height", value);
                else AttrList["image-height"] = value;
            }
        }
        #endregion

        #region JINÉ
        readonly UndoRedo<string> officeItemType = new UndoRedo<string>();
        /// <summary>
        /// Typ položky
        /// </summary>
        [Category("Obsah")]
        [DisplayName("typ položky")]
        [Description("Podporovaná transformace datové položky")]
        [TypeConverter(typeof(OfficeItemTypeConverter))]
        public string ItemType { get => officeItemType.Value; set => officeItemType.Value = value; }

        /// <summary>
        /// region položky
        /// </summary>
        [Browsable(false)]
        public GFERegion Region { get; set; }

        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("identifikátor")]
        [Description("Jednoznačný identifikátor položky")]
        public Guid Guid { get; set; }

        /// <summary>
        /// typ macrobuttonu
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("typ")]
        [Description("typ položky")]
        public GRTFField.GMBType MacroButtonType { get; set; }

        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(false)]
        [DisplayName("script-název")]
        [Description("Skriptovací název položky - pokud hodnota není prázdna a liší se od 'name', pak při uložení položky proběhne změna názvu 'name' na 'scriptname'")]
        public string ScriptName { get; set; }

        /// <summary>
        /// Instance
        /// </summary>
        [ReadOnly(false)]
        [DisplayName("instance")]
        [Description("Instance objektu: FORMTEXT, TEXT")]
        [TypeConverter(typeof(OfficeInstanceConverter))]
        public string Instance { get; set; }

        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název položky")]
        public string Name { get; set; }
        [Browsable(false)]
        public object COMObject { get; set; }
        #endregion

        /// <summary>
        /// indikuje vybranost objektu
        /// </summary>
        [Browsable(false)]
        public bool IsSelected { get; set; }

        /// <summary>
        /// Počáteční pozice Offset
        /// </summary>
        [Browsable(false)]
        public int Start { get; set; }

        /// <summary>
        /// Koncová pozice Offset objektu
        /// </summary>
        [Browsable(false)]
        public int End { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public RtfContent()
        {
            Scripts = new GFEScriptList(UndoRedoService.Manager);
            Scripts.AddRange(CommonService.Scripts);
            Scripts.SynchronizeByOrigin();
            Guid = Guid.Empty;
            MacroButtonType = GRTFField.GMBType.field;
            AttrList = new GFEAttrList(UndoRedoService.Manager);
            TypeRaw = CommonService.BarcodeTypes["0"];
            ItemType = CommonService.OfficeItemTypes["0"];
            Instance = CommonService.OfficeInstance["0"];
            ImageHeight = "auto";
            ImageWidth = "auto";
            Start = 0;
            End = 0;
        }

        /// <summary>
        /// Kopírování vlastnosti daného objektu
        /// </summary>
        /// <param name="original">Daný objekt</param>
        public void Copy(object original)
        {
            //Pokud objekt není RTF objekt, pak není co řešit
            if (!(original is RtfContent))
                return;

            //zafixujeme objekt
            RtfContent _content = (RtfContent)original;

            //Nakopírujeme skripty
            Scripts.AddRange(_content.Scripts);
            Scripts.SynchronizeByOrigin();
            MacroButtonType = _content.MacroButtonType;
            // zkopírujeme i formát
            Format = _content.Format;
            // zkopírujeme i skriptovací název
            ScriptName = _content.ScriptName;

            if (original is IBarcode)
            {
                Type = (original as IBarcode).Type;
                ImageWidth = _content.ImageWidth;
                ImageHeight = _content.ImageHeight;
            }
            ItemType = _content.ItemType;
            Instance = _content.Instance;

            AttrList = new GFEAttrList(UndoRedoService.Manager);
            AttrList.AddRange(_content.Unknowns);
            AttrList.SynchronizeByOrigin();
            Start = _content.Start;
            End = _content.End;
        }

        /// <summary>
        /// Načtení atributu datové struktury
        /// </summary>
        /// <param name="gAttr">Seznam atributu</param>
        public void LoadAttributes(GAttrList gAttr)
        {
            for (int _index = 0; _index < gAttr.Count; _index++)
            {
                var _item = gAttr.GetPair(_index);
                if (_item.Key.StartsWith("default_") && _item.Key.Length > 8)
                {
                    var _key = _item.Key.Substring(8);
                    if (_key.StartsWith("on", StringComparison.InvariantCulture))
                    {
                        if (!Scripts.ContainsKey(_key))
                            Scripts.Add(_key, _item.Value);
                        else
                            Scripts[_key] = _item.Value;
                    }
                    else if (!AttrList.ContainsKey(_key))
                        AttrList.Add(_key, _item.Value);
                    else
                        AttrList[_key] = _item.Value;
                }
            }
        }
    }
}
