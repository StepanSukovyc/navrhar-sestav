//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Tokens.cs                              </Name>
//    <Description> Klíče pro nápovědný text                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-09-19                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Refactoring.Lexer;
using Gordic.General;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// Klíče pro nápovědný text ALF obsahu
    /// </summary>
    public class ALFTokens : AbstractTokens
    {
        // ----- keywords -----

        // ----- XML deklarace -----
        /// <exclude/>
        public const int Xml = 49;
        /// <exclude/>
        public const int Version = 50;
        /// <exclude/>
        public const int Encoding = 51;
        // ^^^ XML deklarace -------

        // ----- hlavní větve ----- BranchMain
        /// <exclude/>
        public const int Format = 52;
        /// <exclude/>
        public const int Info = 53;
        /// <exclude/>
        public const int Region = 54;
        /// <exclude/>
        public const int Head = 55;
        /// <exclude/>
        public const int Body = 56;
        /// <exclude/>
        public const int Foot = 57;
        /// <exclude/>
        public const int PaperSetting = 59;
        /// <exclude/>
        public const int Style = 64;
        /// <exclude/>
        public const int Group = 68;
        /// <exclude/>
        public const int CopyAndFill = 69;
        /// <exclude/>
        public const int Template = 166;
        /// <exclude/>
        public const int Script = 167;
        // ^^^ hlavní větve -------

        // ----- INFO větve ----- BranchINFO
        /// <exclude/>
        public const int Xmlns = 70;
        /// <exclude/>
        public const int Type = 71;

        /// <exclude/>
        public const int IxsFrm = 72;
        /// <exclude/>
        public const int IxsXme = 73;
        /// <exclude/>
        public const int XmetaVer = 74;
        /// <exclude/>
        public const int XmetaSubverMin = 75;
        /// <exclude/>
        public const int Nazev = 76;
        /// <exclude/>
        public const int IxsAlv = 77;
        /// <exclude/>
        public const int Poznamka = 78;
        /// <exclude/>
        public const int RokmesOd = 79;
        /// <exclude/>
        public const int RokmesDo = 80;
        
        /// <exclude/>
        public const int VerMinor = 148;
        /// <exclude/>
        public const int VerMajor = 149;

        /// <exclude/>
        public const int Maker = 146;
        /// <exclude/>
        public const int Popis = 147;
        // ^^^ INFO větve -------

        // ----- větve grafických objektů ----- BranchGraphicsObjects
        /// <exclude/>
        public const int Variable = 58;
        /// <exclude/>
        public const int Table = 60;
        /// <exclude/>
        public const int ValueOf = 61;
        /// <exclude/>
        public const int Text = 62;
        /// <exclude/>
        public const int Image = 63;
        /// <exclude/>
        public const int Button = 65;
        /// <exclude/>
        public const int Line = 90;
        /// <exclude/>
        public const int Chart = 154;
        /// <exclude/>
        public const int Cell = 156;
        // ^^^ větve grafických objektů -------

        // ----- atributy stránky ----- BranchAttributePaper
        /// <exclude/>
        public const int PaperWidth = 84;
        /// <exclude/>
        public const int PaperHeight = 85;
        /// <exclude/>
        public const int LeftMargin = 86;
        /// <exclude/>
        public const int RightMargin = 87;
        /// <exclude/>
        public const int TopMargin = 88;
        /// <exclude/>
        public const int BottomMargin = 89;
        /// <exclude/>
        public const int PageCount = 164;
        // ^^^ atributy stránky -------

        // ----- atributy SKRIPTY ----- BranchAttributeScripts
        /// <exclude/>
        public const int OnPrint = 91;
        /// <exclude/>
        public const int OnEnter = 92;
        /// <exclude/>
        public const int OnData = 93;
        /// <exclude/>
        public const int OnLoad = 94;
        // ^^^ atributy SKRIPTY -------

        // ----- speciální atributy obrázku ----- BranchAttributeImage
        /// <exclude/>
        public const int File = 101;
        /// <exclude/>
        public const int Global = 102;
        /// <exclude/>
        public const int ImageWidth = 103;
        /// <exclude/>
        public const int ImageHeight = 104;
        /// <exclude/>
        public const int ImageStretch = 143;
        /// <exclude/>
        public const int ImageOrientation = 144;
        /// <exclude/>
        public const int ComponentStretch = 145;
        // ^^^ speciální atributy obrázku -------

        // ----- speciální atributy písma ----- BranchAttributeFont
        /// <exclude/>
        public const int FontFace = 106;
        /// <exclude/>
        public const int FontName = 107;
        /// <exclude/>
        public const int FontCharset = 108;
        /// <exclude/>
        public const int FontSize = 109;
        /// <exclude/>
        public const int FontBold = 110;
        /// <exclude/>
        public const int FontItalic = 111;
        /// <exclude/>
        public const int FontUnderline = 112;
        /// <exclude/>
        public const int FontStrikeout = 113;
        /// <exclude/>
        public const int FontColor = 114;
        // ^^^ speciální atributy písma -------

        // ----- speciální atributy orámování ----- BranchAttributeBorder
        /// <exclude/>
        public const int BorderWidth = 115;
        /// <exclude/>
        public const int LeftBorderWidth = 116;
        /// <exclude/>
        public const int RightBorderWidth = 117;
        /// <exclude/>
        public const int TopBorderWidth = 118;
        /// <exclude/>
        public const int BottomBorderWidth = 119;
        /// <exclude/>
        public const int BorderColor = 120;
        /// <exclude/>
        public const int LeftBorderColor = 121;
        /// <exclude/>
        public const int RightBorderColor = 122;
        /// <exclude/>
        public const int TopBorderColor = 123;
        /// <exclude/>
        public const int BottomBorderColor = 124;
        /// <exclude/>
        public const int BorderStyle = 125;
        /// <exclude/>
        public const int LeftBorderStyle = 126;
        /// <exclude/>
        public const int RightBorderStyle = 127;
        /// <exclude/>
        public const int TopBorderStyle = 128;
        /// <exclude/>
        public const int BottomBorderStyle = 129;
        // ^^^ speciální atributy orámování -------

        // ----- speciální atributy textu ----- BranchAttributeText
        /// <exclude/>
        public const int HorizontalAlign = 130;
        /// <exclude/>
        public const int Align = 131;
        /// <exclude/>
        public const int VerticalAlign = 132;
        /// <exclude/>
        public const int EllipsisStyle = 133;
        /// <exclude/>
        public const int EllipsisChar = 134;
        /// <exclude/>
        public const int Multiline = 135;
        /// <exclude/>
        public const int Padding = 136;
        /// <exclude/>
        public const int LeftPadding = 137;
        /// <exclude/>
        public const int RightPadding = 138;
        /// <exclude/>
        public const int TopPadding = 139;
        /// <exclude/>
        public const int BottomPadding = 140;
        /// <exclude/>
        public const int BackgroundColor = 141;
        /// <exclude/>
        public const int TextOrientation = 142;
        // ^^^ speciální atributy textu -------

        // ----- speciální atributy řádku ----- BranchAttributeLine
        /// <exclude/>
        public const int OnEachPage = 150;
        /// <exclude/>
        public const int BreakPageBefore = 151;
        /// <exclude/>
        public const int BreakPageAfter = 152;
        /// <exclude/>
        public const int Endpage = 153;
        // ^^^ speciální atributy řádku -------

        // ----- speciální atributy velikosti ----- BranchAttributeObjectSize
        /// <exclude/>
        public const int Width = 95;
        /// <exclude/>
        public const int Height = 96;
        /// <exclude/>
        public const int Rect = 97;
        // ^^^ speciální atributy velikosti -------

        // ----- speciální atributy regionu ----- BranchAttributeRegion
        /// <exclude/>
        public const int Name = 81;
        /// <exclude/>
        public const int OnlyIf = 82;
        /// <exclude/>
        public const int FilterOut = 83;
        // ^^^ speciální atributy regionu -------

        // ----- speciální atributy CopyAndFill ----- BranchAttributeCopyAndFill
        /// <exclude/>
        public const int From = 157;
        /// <exclude/>
        public const int To = 158;
        // ^^^ speciální atributy CopyAndFill -------

        // ----- speciální atributy šablony ----- BranchAttributeTemplate
        /// <exclude/>
        public const int Filename = 155;
        // ^^^ speciální atributy šablony -------

        // ----- speciální atributy šablony ----- BranchAttributeTemplate
        /// <exclude/>
        public const int By = 165;
        // ^^^ speciální atributy šablony -------

        // ^^^ keywords ------------

        // ----- keywords -----
        /// <exclude/>
        public const int Structure = 66;
        /// <exclude/>
        public const int Item = 67;

        // ----- speciální atributy -----
        /// <exclude/>
        public const int Page = 98;
        /// <exclude/>
        public const int Row = 99;

        /// <exclude/>
        public const int textValue = 100;

        /// <exclude/>
        public const int Id = 105;

        /// <exclude/>
        public const int Instance = 159;

        /// <exclude/>
        public const int XmlLang = 160;
        /// <exclude/>
        public const int Note = 161;
        /// <exclude/>
        public const int ResourceIdValue = 162;
        /// <exclude/>
        public const int ResourceId = 163;
        // ----- speciální atributy ^ -----

        // ----- hodnoty atributů -----
        /// <exclude/>
        public const int varName = 168;
        /// <exclude/>
        public const int varValue = 169;
        /// <exclude/>
        public const int varDataType = 170;
        /// <exclude/>
        public const int textStyle = 171;

        // ----- hodnoty atributů ^ -----
        // ----- kódování ------------
        /// <exclude/>
        public const int valueOfName = 172;
        /// <exclude/>
        public const int valueOfFormat = 173;

        // ----- kódování ^ ------------

        /// <exclude/>
        public const int DatModif = 174;

        // ------ xmlns ------------
        /// <exclude/>
        public const int http1_3 = 175;
        /// <exclude/>
        public const int http1_4 = 176;
        // ------ xmlns ^------------

        // ------ filename ------------
        /// <exclude/>
        public const int sablonaDoc = 177;
        /// <exclude/>
        public const int sablonaXls = 178;
        // ------ filename ^------------

        /// <exclude/>
        public const int RtfRef = 179;
        /// <exclude/>
        public const int Start = 180;
        /// <exclude/>
        public const int End = 181;
        /// <exclude/>
        public const int FilterIn = 182;
        /// <exclude/>
        public const int OrderBy = 183;
        /// <exclude/>
        public const int LastModif = 184;

        // ------ filename ------------
        /// <exclude/>
        public const int PaperMarginTop = 185;
        /// <exclude/>
        public const int PaperMarginLeft = 186;
        /// <exclude/>
        public const int PaperMarginRight = 187;
        /// <exclude/>
        public const int PaperMarginBottom = 188;
        // ------ filename ^------------

        /// <exclude/>
        public const int Grid = 189;
        /// <exclude/>
        public const int Drawing = 190;
        /// <exclude/>
        public const int Barcode = 191;
        /// <exclude/>
        public const int Attachment = 192;

        // ------ spacing ------------
        /// <exclude/>
        public const int Spacing = 193;
        /// <exclude/>
        public const int LeftSpacing = 194;
        /// <exclude/>
        public const int RightSpacing = 195;
        /// <exclude/>
        public const int TopSpacing = 196;
        /// <exclude/>
        public const int BottomSpacing = 197;
        // ------ spacing ^------------

        /// <exclude/>
        public const int InsideBorder = 198;

        /// <exclude/>
        public override int MaxToken { get { return 199; } }

        /// <summary>
        /// seznam všech klíčových slov
        /// </summary>
        public BitArray KeyWords { get { return keyWords; } }

        static readonly LookupTable keywords = new LookupTable(true);
        static AbstractTokens instance;
        /// <summary>
        /// instance záložky
        /// </summary>
        public static AbstractTokens ThisInstance
        {
            get
            {
                if (instance == null)
                {
                    instance = new AbstractTokens();
                    instance.Initialize();
                }
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public ALFTokens()
            : base()
        {
        }

        public override void Initialize()
        {
            base.Initialize();
            instance = this;

            tokenList.AddRange(
                new List<TokenItem>
                {
                    // ----- keywords -----
                    new TokenItem("xml"),
                    new TokenItem("version"),
                    new TokenItem("encoding", GResources.GetResourceText(29450582)),
                    new TokenItem("format", GResources.GetResourceText(29450583)),
                    new TokenItem("info", GResources.GetResourceText(29450584)),
                    new TokenItem("region", GResources.GetResourceText(29450585)),
                    new TokenItem("head", GResources.GetResourceText(29450586)),
                    new TokenItem("body", GResources.GetResourceText(29450587)),
                    new TokenItem("foot", GResources.GetResourceText(29450588)),
                    new TokenItem("variable", GResources.GetResourceText(29450589)),
                    new TokenItem("paper-setting", GResources.GetResourceText(29450590)),
                    new TokenItem("table", GResources.GetResourceText(29450591)),
                    new TokenItem("value-of", GResources.GetResourceText(29450592)),
                    new TokenItem("text", GResources.GetResourceText(29450593)),
                    new TokenItem("image", GResources.GetResourceText(29450387)),
                    new TokenItem("style", GResources.GetResourceText(29450594)),
                    new TokenItem("button"),
                    new TokenItem("structure", GResources.GetResourceText(29450583)), //XME
                    new TokenItem("item", GResources.GetResourceText(29450592)), //XME
                    new TokenItem("group", GResources.GetResourceText(29450595)),
                    new TokenItem("copy-and-fill"),
                    new TokenItem("xmlns", GResources.GetResourceText(29450596)),
                    new TokenItem("type", GResources.GetResourceText(29450597)),
                    new TokenItem("ixs_frm", GResources.GetResourceText(29450598)),
                    new TokenItem("ixs_xme", GResources.GetResourceText(29450599)),
                    new TokenItem("xmeta_ver", GResources.GetResourceText(29450600)),
                    new TokenItem("xmeta_subver_min", GResources.GetResourceText(29450601)),
                    new TokenItem("nazev", GResources.GetResourceText(29450602)),
                    new TokenItem("ixs_alv", GResources.GetResourceText(29450603)),
                    new TokenItem("poznamka", GResources.GetResourceText(29450604)),
                    new TokenItem("rokmes_od", GResources.GetResourceText(29450605)),
                    new TokenItem("rokmes_do", GResources.GetResourceText(29450606)),

                    new TokenItem("name", GResources.GetResourceText(29450607)),
                    new TokenItem("only-if", GResources.GetResourceText(29450608)),
                    new TokenItem("filter-out", GResources.GetResourceText(29450609)),
                    new TokenItem("filter-in", GResources.GetResourceText(29450796)), //RC 29450796 : výraz podmíněného zobrazení (in)

                    new TokenItem("paper-width", GResources.GetResourceText(29450610)),
                    new TokenItem("paper-height", GResources.GetResourceText(29450611)),
                    new TokenItem("left-margin", GResources.GetResourceText(29450612)),
                    new TokenItem("right-margin", GResources.GetResourceText(29450613)),
                    new TokenItem("top-margin", GResources.GetResourceText(29450614)),
                    new TokenItem("bottom-margin", GResources.GetResourceText(29450615)),
                    new TokenItem("line", GResources.GetResourceText(29450616)),

                    new TokenItem("onPrint", GResources.GetResourceText(29450617)),
                    new TokenItem("onEnter", GResources.GetResourceText(29450618)),
                    new TokenItem("onData", GResources.GetResourceText(29450619)),
                    new TokenItem("onLoad", GResources.GetResourceText(29450620)),
                    new TokenItem("width", GResources.GetResourceText(29450621)),
                    new TokenItem("height", GResources.GetResourceText(29450621)),
                    new TokenItem("rect", GResources.GetResourceText(29450622)),
                    new TokenItem("page", GResources.GetResourceText(29450623)),
                    new TokenItem("row", GResources.GetResourceText(29450624)),

                    new TokenItem("value", GResources.GetResourceText(29450593)),

                    new TokenItem("file", GResources.GetResourceText(29450625)),
                    new TokenItem("global", GResources.GetResourceText(29450626)),
                    new TokenItem("image-width", GResources.GetResourceText(29450627)),
                    new TokenItem("image-height", GResources.GetResourceText(29450628)),

                    new TokenItem("id", GResources.GetResourceText(29450629)),
                    new TokenItem("font-face", GResources.GetResourceText(29450630)),
                    new TokenItem("font-name", GResources.GetResourceText(29450631)),
                    new TokenItem("font-charset", GResources.GetResourceText(29450632)),
                    new TokenItem("font-size", GResources.GetResourceText(29450633)),
                    new TokenItem("font-bold", GResources.GetResourceText(29450634)),
                    new TokenItem("font-italic", GResources.GetResourceText(29450351)),
                    new TokenItem("font-underline", GResources.GetResourceText(29450635)),
                    new TokenItem("font-strikeout", GResources.GetResourceText(29450636)),
                    new TokenItem("font-color", GResources.GetResourceText(29450637)),
                    new TokenItem("border-width", GResources.GetResourceText(29450638)),
                    new TokenItem("left-border-width", GResources.GetResourceText(29450639)),
                    new TokenItem("right-border-width", GResources.GetResourceText(29450640)),
                    new TokenItem("top-border-width", GResources.GetResourceText(29450641)),
                    new TokenItem("bottom-border-width", GResources.GetResourceText(29450642)),
                    new TokenItem("border-color", GResources.GetResourceText(29450643)),
                    new TokenItem("left-border-color", GResources.GetResourceText(29450644)),
                    new TokenItem("right-border-color", GResources.GetResourceText(29450645)),
                    new TokenItem("top-border-color", GResources.GetResourceText(29450646)),
                    new TokenItem("bottom-border-color", GResources.GetResourceText(29450647)),
                    new TokenItem("border-style", GResources.GetResourceText(29450648)),
                    new TokenItem("left-border-style", GResources.GetResourceText(29450649)),
                    new TokenItem("right-border-style", GResources.GetResourceText(29450650)),
                    new TokenItem("top-border-style", GResources.GetResourceText(29450651)),
                    new TokenItem("bottom-border-style", GResources.GetResourceText(29450652)),
                    new TokenItem("horizontal-align", GResources.GetResourceText(29450653)),
                    new TokenItem("align", GResources.GetResourceText(29450654)),
                    new TokenItem("vertical-align", GResources.GetResourceText(29450655)),
                    new TokenItem("ellipsis-style", GResources.GetResourceText(29450656)),
                    new TokenItem("ellipsis-char", GResources.GetResourceText(29450657)),
                    new TokenItem("multiline", GResources.GetResourceText(29450658)),
                    new TokenItem("padding", GResources.GetResourceText(29450659)),
                    new TokenItem("left-padding", GResources.GetResourceText(29450660)),
                    new TokenItem("right-padding", GResources.GetResourceText(29450661)),
                    new TokenItem("top-padding", GResources.GetResourceText(29450662)),
                    new TokenItem("bottom-padding", GResources.GetResourceText(29450663)),
                    new TokenItem("background-color", GResources.GetResourceText(29450664)),
                    new TokenItem("text-orientation", GResources.GetResourceText(29450665)),

                    new TokenItem("image-stretch"),
                    new TokenItem("image-orientation"),
                    new TokenItem("component-stretch"),

                    new TokenItem("maker"),
                    new TokenItem("popis"),

                    new TokenItem("ver_minor", GResources.GetResourceText(29450666)),
                    new TokenItem("ver_major", GResources.GetResourceText(29450667)),

                    new TokenItem("on-each-page", GResources.GetResourceText(29450668)),
                    new TokenItem("break-page-before", GResources.GetResourceText(29450669)),
                    new TokenItem("break-page-after", GResources.GetResourceText(29450670)),
                    new TokenItem("endpage", GResources.GetResourceText(29450671)),
                    new TokenItem("chart"),

                    new TokenItem("filename", GResources.GetResourceText(29450672)),
                    new TokenItem("cell"),
                    new TokenItem("from", GResources.GetResourceText(29450101)),
                    new TokenItem("to", GResources.GetResourceText(29450450)),

                    new TokenItem("instance"),

                    new TokenItem("xml:lang"),
                    new TokenItem("note"),
                    new TokenItem("resource-id-value"),
                    new TokenItem("resource-id"),
                    new TokenItem("page-count", GResources.GetResourceText(29450673)),
                    new TokenItem("interactive-media", GResources.GetResourceText(29450674)),
                    new TokenItem("media", GResources.GetResourceText(29450675)),
                    new TokenItem("by", GResources.GetResourceText(29450676)),
                    new TokenItem("template", GResources.GetResourceText(29450677)),
                    new TokenItem("script", GResources.GetResourceText(29450678)),
                    new TokenItem("name", GResources.GetResourceText(29450679)),
                    new TokenItem("value", GResources.GetResourceText(29450680)),
                    new TokenItem("datatype", GResources.GetResourceText(29450681)),
                    new TokenItem("style", GResources.GetResourceText(29450682)),
                    new TokenItem("name", GResources.GetResourceText(29450683)),
                    new TokenItem("format", GResources.GetResourceText(29450684)),
                    new TokenItem("dat_modif", GResources.GetResourceText(29450685)),
                    new TokenItem("http://www.gordic.cz/TR/alf/1.3/", "http://www.gordic.cz/TR/alf/1.3/"),
                    new TokenItem("http://www.gordic.cz/TR/alf/1.4/", "http://www.gordic.cz/TR/alf/1.4/"),
                    new TokenItem("sablona.doc", GResources.GetResourceText(29450686)),
                    new TokenItem("sablona.xls", GResources.GetResourceText(29450687)),
                    new TokenItem("sablona.xlsx", GResources.GetResourceText(29450688)),
                    new TokenItem("rtfref", GResources.GetResourceText(29450689)),
                    new TokenItem("start", GResources.GetResourceText(29450690)),
                    new TokenItem("end", GResources.GetResourceText(29450691)),
                    new TokenItem("filter-in", ""),
                    new TokenItem("order-by", GResources.GetResourceText(29450692)),
                    new TokenItem("last_modif", GResources.GetResourceText(29450685)),
                    new TokenItem("top-margin", ""),
                    new TokenItem("left-margin", ""),
                    new TokenItem("right-margin", ""),
                    new TokenItem("bottom-margin", ""),
                    new TokenItem("grid", GResources.GetResourceText(29450693)),
                    new TokenItem("drawing", GResources.GetResourceText(29450694)),
                    new TokenItem("barcode", GResources.GetResourceText(29450695)),
                    new TokenItem("attachment", GResources.GetResourceText(29450696)),
                    new TokenItem("spacing", GResources.GetResourceText(29450697)),
                    new TokenItem("left-spacing", GResources.GetResourceText(29450698)),
                    new TokenItem("right-spacing", GResources.GetResourceText(29450699)),
                    new TokenItem("top-spacing", GResources.GetResourceText(29450700)),
                    new TokenItem("bottom-spacing", GResources.GetResourceText(29450701)),
                    new TokenItem("inside-border", GResources.GetResourceText(29450702))
                }
            );

            keyWords = NewSet(
                Xml,
                Version,
                Encoding,
                Format,
                Info,
                Region,
                Head,
                Body,
                Foot,
                Variable,
                PaperSetting,
                Table,
                ValueOf,
                Text,
                Image,
                Style,
                Button,
                Item,
                Group,
                CopyAndFill,
                Xmlns,
                Type,
                IxsFrm,
                IxsXme,
                XmetaVer,
                XmetaSubverMin,
                Nazev,
                IxsAlv,
                Poznamka,
                RokmesOd,
                RokmesDo,
                Name,
                OnlyIf,
                FilterOut,
                PaperWidth,
                PaperHeight,
                LeftMargin,
                RightMargin,
                TopMargin,
                BottomMargin,
                Line,
                OnPrint,
                OnEnter,
                OnData,
                OnLoad,
                Width,
                Height,
                Rect,
                Page,
                Row,
                textValue,
                File,
                Global,
                ImageWidth,
                ImageHeight,
                Id,
                FontFace,
                FontName,
                FontCharset,
                FontSize,
                FontBold,
                FontItalic,
                FontUnderline,
                FontStrikeout,
                FontColor,
                BorderWidth,
                LeftBorderWidth,
                RightBorderWidth,
                TopBorderWidth,
                BottomBorderWidth,
                BorderColor,
                LeftBorderColor,
                RightBorderColor,
                TopBorderColor,
                BottomBorderColor,
                BorderStyle,
                LeftBorderStyle,
                RightBorderStyle,
                TopBorderStyle,
                BottomBorderStyle,
                HorizontalAlign,
                Align,
                VerticalAlign,
                EllipsisStyle,
                EllipsisChar,
                Multiline,
                Padding,
                LeftPadding,
                RightPadding,
                TopPadding,
                BottomPadding,
                BackgroundColor,
                TextOrientation,
                ImageStretch,
                ImageOrientation,
                ComponentStretch,
                Maker,
                Popis,
                VerMinor,
                VerMajor,
                OnEachPage,
                BreakPageBefore,
                BreakPageAfter,
                Endpage,
                Chart,
                Filename,
                Cell,
                From,
                To,
                Instance,
                XmlLang,
                Note,
                ResourceIdValue,
                ResourceId,
                PageCount,
                By,
                Template,
                Script,
                RtfRef
            );

            for (int i = 0; i < tokenList.Count; ++i)
                keywords[tokenList[i].Word] = i;

        }

        /// <summary>
        /// získání klíče dle klíčového slova
        /// </summary>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public static int GetToken(string keyword) { return keywords[keyword]; }

        /// <summary>
        /// získání klíčových slov dle kontextu
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override BitArray GetKeywordsByContext(ExpressionContext context)
        {
            if (context == ExpressionContext.Global)
                return global;

            if (context == ExpressionContext.Global || context == ExpressionContext.Default)
                return base.GetKeywordsByContext(context);
            return empty;
        }
    }
}
