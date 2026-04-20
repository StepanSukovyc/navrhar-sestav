//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CommonService.cs                         </Name>
//    <Description> Možné stavy okna                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Word = Microsoft.Office.Interop.Word;
using System.Reflection;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.General;
using Gordic.Documents.Rtf;
using System.Collections.Concurrent;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Možnosti orámování
    /// </summary>
    public enum SurroundType
    {
        /// <summary>
        /// žádné
        /// </summary>
        nothing = 0,
        /// <summary>
        /// dokola
        /// </summary>
        around = 1,
        /// <summary>
        /// uvnitř
        /// </summary>
        inside = 2,
        /// <summary>
        /// uvnitř a dokola
        /// </summary>
        aroundinside = 3,
        /// <summary>
        /// zleva
        /// </summary>
        left = 4,
        /// <summary>
        /// sprava
        /// </summary>
        right = 5,
        /// <summary>
        /// nahoře
        /// </summary>
        top = 6,
        /// <summary>
        /// dole
        /// </summary>
        bottom = 7,
        /// <summary>
        /// uprostřed horizontálně
        /// </summary>
        middlehorizontal = 8,
        /// <summary>
        /// uprostřed vertikálně
        /// </summary>
        middlevertical = 9,
        /// <summary>
        /// šikmo nahoru
        /// </summary>
        up = 10,
        /// <summary>
        /// šikmo dolů
        /// </summary>
        down = 11
    }

    /// <summary>
    /// pozice tlačítka
    /// </summary>
    [TypeConverter(typeof(CornerPositionTypeConverter))]
    public enum CornerPositionType
    {
        /// <summary>
        /// levý-horní roh
        /// </summary>
        LeftTop = 0,
        /// <summary>
        /// pravý-horní roh
        /// </summary>
        RightTop = 1,
        /// <summary>
        /// levý-dolní roh
        /// </summary>
        LeftBottom = 2,
        /// <summary>
        /// pravý-dolní roh
        /// </summary>
        RightBottom = 3
    }

    /// <summary>
    /// Enumerátor možných rotaci textu
    /// </summary>
    [TypeConverter(typeof(RotateTypeConverter))]
    public enum RotateType
    {
        /// <summary>
        /// 0°
        /// </summary>
        RotateNoneFlipNone = 0,
        /// <summary>
        /// 90°
        /// </summary>
        Rotate90FlipXY = 1,
        /// <summary>
        /// 180°
        /// </summary>
        Rotate180FlipXY = 2,
        /// <summary>
        /// 270°
        /// </summary>
        Rotate270FlipXY = 3
    }

    /// <summary>
    /// Výčet všech možných vertikálních zarovnání textu
    /// </summary>
    [TypeConverter(typeof(VerticalAlignConverter))]
    public enum VAlign
    {
        /// <summary>
        ///  dolů
        /// </summary>
        bottom = 1,
        /// <summary>
        /// na střed
        /// </summary>
        center = 2,
        /// <summary>
        /// nahoru
        /// </summary>
        top = 0
    }

    /// <summary>
    /// Výčet všech možných přizpůsobení textu
    /// </summary>
    [TypeConverter(typeof(FitTextConverter))]
    public enum FitText
    {
        /// <summary>
        ///  zvětšit
        /// </summary>
        grow = 2,
        /// <summary>
        /// zmenšit
        /// </summary>
        shrink = 1,
        /// <summary>
        /// žádné
        /// </summary>
        none = 0,
        /// <summary>
        /// oboji
        /// </summary>
        all = 3
    }

    /// <summary>
    /// Výčet všech možných horizontálních zarovnání textu
    /// </summary>
    [TypeConverter(typeof(HorizontalAlignConverter))]
    public enum HAlign
    {
        /// <summary>
        /// doleva
        /// </summary>
        left = 0,
        /// <summary>
        /// doprava
        /// </summary>
        right = 1,
        /// <summary>
        /// na střed
        /// </summary>
        center = 2,
        /// <summary>
        /// nastavená
        /// </summary>
        justify = 3,
    }

    /// <summary>
    /// rozhraní zarovnání
    /// </summary>
    public interface IAlign
    {
        /// <summary>
        /// horizontální zarovnání
        /// </summary>
        HAlign Horizontal { get; set; }
        /// <summary>
        /// vertikální zarovnání
        /// </summary>
        VAlign Vertical { get; set; }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <returns></returns>
        IAlign Initialize();
    }

    /// <summary>
    /// Třída prezentující zarovnání obsahu 
    /// </summary>
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class Align : IAlign
    {
        /// <summary>
        /// Horizontální 
        /// </summary>
        [DisplayName("horizontální")]
        [Description("Horizontální zarovnání textu")]
        public virtual HAlign Horizontal { get; set; }

        /// <summary>
        /// Vertikální 
        /// </summary>
        [DisplayName("vertikální")]
        [Description("Vertikální zarovnání textu")]
        public virtual VAlign Vertical { get; set; }

        /// <summary>
        /// Konstrultor třídy
        /// </summary>
        public Align() { }

        /// <exclude/>
        public IAlign Initialize()
        {
            Horizontal = HAlign.left;
            Vertical = VAlign.top;
            return this;
        }

        /// <summary>
        /// Převod objektu na řetězec
        /// </summary>
        /// <returns>Prezentace objektu jako řetězce</returns>
        public override string ToString() => string.Format("[" + GResources.GetResourceText(29450477) + ": {0}; " + GResources.GetResourceText(29450478) + ": {1}]", Horizontal, Vertical); //RC 29450478 : vertikální

    }

    /// <summary>
    /// Třída prezentující zarovnání obsahu 
    /// </summary>
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class URAlign : Align
    {
        readonly UndoRedo<HAlign> horizontal = new UndoRedo<HAlign>();
        /// <summary>
        /// Horizontální 
        /// </summary>
        [DisplayName("horizontální")]
        [Description("Horizontální zarovnání textu")]
        public override HAlign Horizontal { get => horizontal.Value; set { horizontal.Value = value; } }

        readonly UndoRedo<VAlign> vertical = new UndoRedo<VAlign>();
        /// <summary>
        /// Vertikální 
        /// </summary>
        [DisplayName("vertikální")]
        [Description("Vertikální zarovnání textu")]
        public override VAlign Vertical { get => vertical.Value; set { vertical.Value = value; } }

        /// <summary>
        /// Konstrultor třídy
        /// </summary>
        public URAlign()
            : base()
        {
        }
    }

    /// <summary>
    /// typ výběru
    /// </summary>
    public enum SelectionType
    {
        /// <summary>
        /// radio button
        /// </summary>
        radio = 0,
        /// <summary>
        /// checkbox
        /// </summary>
        check = 1,
        /// <summary>
        /// vícevýběr
        /// </summary>
        multicheck = 2
    }

    /// <summary>
    /// typ výběru
    /// </summary>
    public enum SelectionOptionTyp
    {
        /// <summary>
        /// obrázek
        /// </summary>
        image = 0,
        /// <summary>
        /// výkres
        /// </summary>
        drawing = 1,
        /// <summary>
        /// Text
        /// </summary>
        text = 2
    }

    /// <summary>
    /// Enumerátor pořadí čtverečků, vykreslených u aktivního elementu
    /// </summary>
    public enum DrawSquares
    {
        /// <summary>
        /// Levý horní
        /// </summary>
        leftTop = 0,
        /// <summary>
        /// Prostřední horní
        /// </summary>
        top = 1,
        /// <summary>
        /// Pravý horní
        /// </summary>
        rightTop = 2,
        /// <summary>
        /// Levý prostřední
        /// </summary>
        left = 3,
        /// <summary>
        /// Pravý prostřední
        /// </summary>
        right = 4,
        /// <summary>
        /// Levý dolní
        /// </summary>
        leftBottom = 5,
        /// <summary>
        /// Prostřední dolní
        /// </summary>
        bottom = 6,
        /// <summary>
        /// Pravý dolní
        /// </summary>
        rightBottom = 7,
        /// <summary>
        /// Žádný
        /// </summary>
        nothing = -1
    }

    /// <summary>
    /// Handler bez argumentů ale s výsledkem String
    /// </summary>
    public delegate string EventHandlerNonArgumentStringResult();

    /// <summary>
    /// Handler s dynamic argumentem výsledkem String
    /// </summary>
    /// <param name="unt"></param>
    /// <returns></returns>
    public delegate string EventHandlerDynamicArgumentStringResult(dynamic unt = null);

    /// <summary>
    /// Handler bez argumentů.
    /// Výsledkem je formulář
    /// </summary>
    public delegate Form EventHandlerNonArgumentForm();

    /// <summary>
    /// Delegát na prováděnou operaci
    /// </summary>
    public delegate void ComOperationDelegate();

    /// <summary>
    /// Handler se parametrem řetězce a návratovou hodnotou object
    /// </summary>
    /// <param name="parameter">Parametr metody</param>
    /// <returns>Výsledek metody</returns>
    public delegate object EventHandlerStringArgument(string parameter);

    /// <summary>
    /// Výsledky dialogu
    /// </summary>
    public enum DialogMessage
    {
        /// <summary>
        /// Akceptování změ provedených v dialogovém okně
        /// </summary>
        ok,
        /// <summary>
        /// Zrušení dialogového okna
        /// </summary>
        cancel,
        /// <summary>
        /// indikuje Help tlačítko (v budoucnu)
        /// </summary>
        help,
        /// <summary>
        /// indikuje záměr přepnutí se na následující panel dialogu
        /// </summary>
        next,
        /// <summary>
        /// indikuje záměr přepnutí se na předchozí panel dialogu
        /// </summary>
        prev,
        /// <summary>
        /// Ukončení dialogu
        /// </summary>
        finish,
        /// <summary>
        /// Idnikuje, že panel byl aktivován
        /// </summary>
        activated,
        /// <summary>
        /// výchozí nastavení
        /// </summary>
        def
    }

    /// <summary>
    /// Typ komponenty
    /// </summary>
    [Serializable]
    public enum ComponentType
    {
        /// <summary>
        /// Nic
        /// </summary>
        none = 0,
        /// <summary>
        ///  Komponenta je regionem
        /// </summary>
        region = 1,
        /// <summary>
        /// Komponenta je datovou položkou
        /// </summary>
        valueof = 2,
        /// <summary>
        /// Komponenta je textovým polem
        /// </summary>
        text = 3,
        /// <summary>
        /// Komponenta je obrázkem
        /// </summary>
        image = 4,
        /// <summary>
        /// Komponenta je datový obrázek
        /// </summary>
        imageof = 5,
        /// <summary>
        /// Komponenta je stránka
        /// </summary>
        page = 6,
        /// <summary>
        /// Komponenta je komentář
        /// </summary>
        comment = 7,
        /// <summary>
        /// Komponenta je tabulka
        /// </summary>
        table = 8,
        /// <summary>
        /// Komponenta je proměnna
        /// </summary>
        variable = 9,
        /// <summary>
        /// Komponenta je textový kontejner
        /// </summary>
        textbox = 10,
        /// <summary>
        /// Komponenta je graf
        /// </summary>
        chart = 11,
        /// <summary>
        /// existující obrázek
        /// </summary>
        imagelink = 12,
        /// <summary>
        /// čárový kód
        /// </summary>
        barcode = 13,
        /// <summary>
        /// vektorová grafika
        /// </summary>
        drawing = 14,
        /// <summary>
        /// tlačítko
        /// </summary>
        button = 15,
        /// <summary>
        /// grid
        /// </summary>
        grid = 16,
        /// <summary>
        /// skupina
        /// </summary>
        group = 17,
        /// <summary>
        /// příloha
        /// </summary>
        attachment = 18,
        /// <summary>
        /// oblast s tlačítkem Přidat
        /// </summary>
        addbuttonarea = 19,
        /// <summary>
        /// podpis
        /// </summary>
        signature = 20,
        /// <summary>
        /// objekt select
        /// </summary>
        select = 21,
        /// <summary>
        /// položka výběru checkboxu
        /// </summary>
        option = 22,
        /// <summary>
        /// oblast P
        /// </summary>
        contentp = 23,
        /// <summary>
        /// Součást
        /// </summary>
        part = 24
    }

    /// <summary>
    /// Možné stavy okna
    /// </summary>
    public enum WindowState
    {
        /// <summary>
        /// žádný
        /// </summary>
        None = 0,
        /// <summary>
        /// bez titulku
        /// </summary>
        Untitled = 1,
        /// <summary>
        /// pozměněn
        /// </summary>
        Dirty = 2,
        /// <summary>
        /// pouze pro čtení
        /// </summary>
        ViewOnly = 4
    }

    /// <summary>
    /// enumerátor typů aktivních polí.
    /// </summary>
    public enum ControlType
    {
        /// <summary>
        /// řetězec
        /// </summary>
        StringType,
        /// <summary>
        /// číslo
        /// </summary>
        NumberType,
        /// <summary>
        /// datum
        /// </summary>
        DatetimeType,
        /// <summary>
        /// seznam
        /// </summary>
        List,
        /// <summary>
        /// seznam stringů. moznost doplneni hodnoty
        /// </summary>
        List1,
        /// <summary>
        /// esu
        /// </summary>
        Esu,
        /// <summary>
        /// vlastní typ
        /// </summary>
        CustomType,
        CheckBox,
        RadioButton,
        MultiCheckBox,
        Attachment,
        DateType, //přidáno 12.5.2021
    }

    class CachPaddingItem
    {
        public string Value { get; set; }
        public float Pixels { get; set; }
        public ScaleUni Scale { get; set; }

        private CachPaddingItem()
        {
        }
        public CachPaddingItem(string _value, float _pixels, ScaleUni _scale)
        {
            Value = _value;
            Pixels = _pixels;
            Scale = _scale;
        }
    }

    /// <summary>
    /// Společná třída
    /// </summary>
    public static class CommonService
    {
        #region Conversion Constants
        /// <summary>
        /// Konverze twips na pixely (96 DPI)
        /// </summary>
        private const float TWIPS_TO_PIXELS = 96f / 1440f;

        /// <summary>
        /// Konverze milimetrů na pixely (96 DPI)
        /// </summary>
        private const float MM_TO_PIXELS = 96f / 25.4f;

        /// <summary>
        /// Konverze pointů na pixely (96 DPI)
        /// </summary>
        private const float POINTS_TO_PIXELS = 96f / 72f;

        /// <summary>
        /// Konverze pixelů na pointy
        /// </summary>
        private const float PIXELS_TO_POINTS = 72f / 96f;

        /// <summary>
        /// Konverze milimetrů na pointy
        /// </summary>
        private const float MM_TO_POINTS = 72f / 25.4f;

        /// <summary>
        /// Konverze twips na pointy
        /// </summary>
        private const float TWIPS_TO_POINTS = 72f / 1440f;
        #endregion

        #region Designer
        /// <summary>
        /// Velikost černého průhu na stránce dole (simulace stránky)
        /// </summary>
        public static int BottomDark { get => 3; }
        /// <summary>
        /// Velikost černého průhu po prave stráně (simulace stránky)
        /// </summary>
        public static int RightDark { get => 3; }
        #endregion

        #region textový editor
        /// <summary>
        /// Barva pozadí vybraného textu
        /// </summary>
        public static Color BCMarkerText { get; set; } = Color.Silver;

        /// <summary>
        /// Barva vybraného textu
        /// </summary>
        public static Color CMarkerText { get; set; } = SystemColors.HighlightText;
        #endregion

        /// <summary>
        /// Barva aktivních okrajů
        /// </summary>
        public static readonly Color BorderColorActive = Color.Blue;

        /// <summary>
        /// Barva neaktivních okrajů
        /// </summary>
        public static Color BorderColorNonactive { get; set; } = SystemColors.ControlDark;

        /// <summary>
        /// Podbarvení datové položky
        /// </summary>
        public static Color ValueOfColor { get; set; } = Color.FromArgb(255, 255, 225);

        /// <summary>
        /// Barva aktivního textu
        /// </summary>
        public static readonly Color TextColorActive = Color.Blue;
        /// <summary>
        /// Barva neaktivního textu
        /// </summary>
        public static readonly Color TextColorNonactive = SystemColors.ControlText;
        /// <summary>
        /// Barva aktivního pozadí
        /// </summary>
        public static readonly Color BackgroundColorActive = SystemColors.ButtonShadow;
        /// <summary>
        /// Barva neaktivního pozadí
        /// </summary>
        public static readonly Color BackgroundColorNonactive = Color.LightBlue;
        /// <summary>
        /// Barva aktivního pozadí obsahu
        /// </summary>
        public static readonly Color BackgroundColorContentActive = Color.LightBlue;
        /// <summary>
        /// Barva neaktivního pozadí obsahu
        /// </summary>
        public static readonly Color BackgroundColorContentNonactive = Color.Transparent;

        /// <summary>
        /// Helper pro lazy inicializaci slovníků s fallbackem na standardní hodnoty
        /// </summary>
        private static Dictionary<string, string> InitializeDictionary(ref Dictionary<string, string> field, string dictionaryName, Func<Dictionary<string, string>> standardFactory)
        {
            return LazyInitializer.EnsureInitialized(ref field, () =>
            {
                if (IsLC)
                    return standardFactory();
                try { return GlobalListLoader.GetDictionary(dictionaryName); }
                catch (Exception) { return standardFactory(); }
            });
        }

        static Dictionary<string, string> fonts = null;
        /// <summary>
        /// Textové formáty
        /// </summary>
        public static Dictionary<string, string> Fonts => InitializeDictionary(ref fonts, "Fonts", SetStandardFonts);

        static Dictionary<string, string> SetStandardFonts()
        {
            var f = new Dictionary<string, string>
            {
                { "arial", "arial" },
                { "courier", "courier" },
                { "times", "times" }
            };
            return f;
        }

        static Dictionary<string, string> scripts = null;
        /// <summary>
        /// Textové formáty
        /// </summary>
        public static Dictionary<string, string> Scripts => InitializeDictionary(ref scripts, "scripts", SetStandardScripts);

        static Dictionary<string, string> SetStandardScripts()
        {
            var f = new Dictionary<string, string>
            {
                { "onLoad", "" },
                { "onEnter", "" },
                { "onData", "" },
                { "onPrint", "" },
                { "onClick", "" },
                { "onValidate", "" },
                { "onEdit", "" },
                { "onChange", "" }
            };
            return f;
        }

        static Dictionary<string, string> formats = null;
        /// <summary>
        /// Dostupné formáty stránek
        /// </summary>
        public static Dictionary<string, string> Formats => InitializeDictionary(ref formats, "PageFormats", SetStandardFormats);

        static Dictionary<string, string> SetStandardFormats()
        {
            var f = new Dictionary<string, string>
            {
                { "841 x 1189", "A0 (841 x 1189)" },
                { "594 x 841", "A1 (594 x 841)" },
                { "420 x 594", "A2 (420 x 594)" },
                { "297 x 420", "A3 (297 x 420)" },
                { "210 x 297", "A4 (210 x 297)" },
                { "148 x 210", "A5 (148 x 210)" },
                { "105 x 148", "A6 (105 x 148)" },
                { "74 x 105", "A7 (74 x 105)" },
                { "52 x 74", "A8 (52 x 74)" },
                { "37 x 52", "A9 (37 x 52)" },
                { "26 x 37", "A10 (26 x 37)" }
            };
            return f;
        }

        static Dictionary<string, string> barcodeTypes = null;
        /// <summary>
        /// Dostupné formáty stránek
        /// </summary>
        public static Dictionary<string, string> BarcodeTypes => InitializeDictionary(ref barcodeTypes, "BarcodeTypes", SetStandardBarcodeTypes);

        static Dictionary<string, string> SetStandardBarcodeTypes()
         => new Dictionary<string, string>
            {
                { "0", "code39" },
                { "1", "71" },
                { "2", "pdf417,5,3" },
                { "3", "qrcode,1" },
                { "4", "qrcode,4" },
                { "5", "qrcode,4,10" },
                { "6", "ean" },
                { "7", "ean14" }
            };

        static Dictionary<string, string> officeItemTypes = null;
        /// <summary>
        /// Dostupné formáty stránek
        /// </summary>
        public static Dictionary<string, string> OfficeItemTypes => InitializeDictionary(ref officeItemTypes, "OfficeItemTypes", SetStandardOfficeItemTypes);

        static Dictionary<string, string> SetStandardOfficeItemTypes()
        {
            var f = new Dictionary<string, string>
            {
                { "0", GResources.GetResourceText(29450592) },
                { "1", GResources.GetResourceText(29450746) }
            };
            return f;
        }

        static Dictionary<string, string> officeInstance = null;
        /// <summary>
        /// Dostupné formáty stránek
        /// </summary>
        public static Dictionary<string, string> OfficeInstance => InitializeDictionary(ref officeInstance, "OfficeInstance", SetStandardOfficeInstance);

        static Dictionary<string, string> SetStandardOfficeInstance()
        {
            var f = new Dictionary<string, string>
            {
                { "0", "FORMTEXT" },
                { "1", "TEXT" }
            };
            return f;
        }

        static Dictionary<string, string> sizeValueComboBox = null;
        /// <summary>
        /// Dostupné formáty stránek
        /// </summary>
        public static Dictionary<string, string> SizeValueComboBox => InitializeDictionary(ref sizeValueComboBox, "SizeValueComboBox", SetStandardSizeValueComboBox);

        static Dictionary<string, string> SetStandardSizeValueComboBox()
        {
            var f = new Dictionary<string, string>
            {
                { "0", GResources.GetResourceText(29450721) },
                { "1", "mm" },
                { "2", "%" }
            };
            return f;
        }

        static Dictionary<string, string> dashstyle = null;
        /// <summary>
        /// Styl
        /// </summary>
        public static Dictionary<string, string> DashStyles => InitializeDictionary(ref dashstyle, "DashStyle", SetStandardDashStyles);

        static Dictionary<string, string> SetStandardDashStyles()
        {
            var f = new Dictionary<string, string>
            {
                { "unspec", GResources.GetResourceText(29450747) },
                { "solid", GResources.GetResourceText(29450748) },
                { "dashed", GResources.GetResourceText(29450749) },
                { "dotted", GResources.GetResourceText(29450750) },
                { "double", GResources.GetResourceText(29450751) }
            };
            return f;
        }


        static Dictionary<string, string> floatdashstyle = null;
        /// <summary>
        /// Styl
        /// </summary>
        public static Dictionary<string, string> FloatDashStyles => InitializeDictionary(ref floatdashstyle, "FloatDashStyle", SetStandardFloatDashStyles);

        static Dictionary<string, string> SetStandardFloatDashStyles()
        {
            var f = new Dictionary<string, string>
            {
                { "-1", GResources.GetResourceText(29450747) },
                { "1", GResources.GetResourceText(29450748) },
                { "8 5", GResources.GetResourceText(29450749) },
                { "1 2", GResources.GetResourceText(29450750) },
                { "0", GResources.GetResourceText(29450751) }
            };
            return f;
        }

        static Dictionary<string, string> bitmapextensions = null;
        /// <summary>
        /// Styl
        /// </summary>
        public static Dictionary<string, string> BitmapExtensions => InitializeDictionary(ref bitmapextensions, "BitmapExtensions", SetStandardBitmapExtensions);

        static Dictionary<string, string> SetStandardBitmapExtensions()
        {
            var f = new Dictionary<string, string>
            {
                { "1", ".bmp" },
                { "2", ".png" },
                { "3", ".jpg" },
                { "4", ".jpeg" }
            };
            return f;
        }

        static Dictionary<string, string> textformats = null;
        /// <summary>
        /// Textové formáty
        /// </summary>
        public static Dictionary<string, string> TextFormats => InitializeDictionary(ref textformats, "TextFormats", SetStandardTextFormats);

        static Dictionary<string, string> SetStandardTextFormats()
        {
            var f = new Dictionary<string, string>
            {
                { "0,00", "1" },
                { "# 0,00", "1" },
                { "#0,##", "1" },
                { "# 0,##", "1" },
                { "#,##", "1" },
                { "_-# 0,00;-# 0,00", "1" },

                { "dd.mm.yyyy;", "2" },
                { "d.m.yyyy;", "2" },
                { "d.mmmmm.yy;", "2" },
                { "dd.mm.yyyy HH:MM:SS;", "2" },
                { "d.m.yyyy HH:MM:SS;", "2" },
                { "d.mmmmm.yy HH:MM;", "2" },
                { "(ddd) d.mmmmm.yy;", "2" },
                { "(dddd) d.mmmmmm.yy;", "2" },
                { "(ddd) d.mmmmm.yy HH:MM;", "2" },
                { "(dddd) d.mmmmmm.yy HH:MM;", "2" },

                { "# 0,00_-;# 0,00-", "3" },
                { "# 0,00_-;[red]# ,00-", "3" },
                { "# 0,00;[red]-# ,00", "3" },
                { "_-# 0,00;[red]-# ,00", "3" },
                { "[red]_-# 0,00;-# ,00", "3" },
                { "[green]# 0,00;[red]-# 0,00;", "3" },
                { "[green]# 0,00;[red]-# 0,00;[align=center]nula", "3" },
                { "[green]# 0,00;[red]-# 0,00;[align=center][#12e2e2]nula", "3" }
            };
            return f;
        }

        static List<string> textformatstype = null;
        /// <summary>
        /// Druhy formátování textu
        /// </summary>
        public static List<string> TextFormatsType
        {
            get
            => LazyInitializer.EnsureInitialized(ref textformatstype, () => { if (CommonService.IsLC) return SetStandardTextFormatsType(); else try { return GlobalListLoader.GetDictionary("TextFormatsType").Keys.ToList(); } catch (Exception) { return SetStandardTextFormatsType(); } });
        }

        static List<string> SetStandardTextFormatsType()
        {
            var l = new List<string>
            {
                GResources.GetResourceText(29450259),
                GResources.GetResourceText(29450752),
                GResources.GetResourceText(29450753),
                GResources.GetResourceText(29450754),
                GResources.GetResourceText(29450755)
            };
            return l;
        }        

        public static string SHEET = "sheet";

        public static string MSE_FIELD = "MSEField";
        public static string MSE_END_SECTION = "MSEEndSection";
        public static string MSE_END_Section = MSE_END_SECTION + ":";
        public static string MSE_BEGIN_SECTION_HEADER = "MSEBeginSectionHeader";
        public static string MSE_BEGIN_SECTION_BODY = "MSEBeginSectionBody";
        public static string MSE_BEGIN_SECTION_FOOTER = "MSEBeginSectionFooter";

        public static string HEADER = "header";
        public static string BODY = "body";
        public static string FOOTER = "footer";
        public static string GROUP = "group";

        public static string[] MSE_MARKERS = new string[]
        {
            MSE_BEGIN_SECTION_BODY,
            MSE_BEGIN_SECTION_HEADER,
            MSE_BEGIN_SECTION_FOOTER,
            MSE_END_SECTION,
            MSE_FIELD
        };

        /// <summary>
        /// Neexistující hodnota
        /// </summary>
        public static object MISSVALUE = System.Reflection.Missing.Value;
        /// <summary>
        /// False hodnota
        /// </summary>
        public static object FALSE = (object)false;
        /// <summary>
        /// True hodnota
        /// </summary>
        public static object TRUE = (object)true;

        /// <summary>
        /// Implicitní hodnota RECT objektů bez argumentu RECT
        /// </summary>
        public static string DefaultRectValue = "10mm,10mm,20mm,20mm";

        /// <summary>
        /// Zaokrouhlení
        /// </summary>
        /// <param name="value"></param>
        /// <param name="digits"></param>
        /// <returns></returns>
        public static double GetRoundedValue(double value, int digits) => Math.Round(value, digits);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="region"></param>
        /// <param name="formatTagRegionDataFullName"></param>
        /// <param name="itemName"></param>
        /// <param name="isItem"></param>
        /// <param name="isRoot"></param>
        /// <returns></returns>
        public static string GetFullName(GFERegion region, string formatTagRegionDataFullName, string itemName, bool isItem, ref bool isRoot) =>
            GetFullName(region, itemName.Contains('.') ? itemName : (formatTagRegionDataFullName + "." + itemName), isItem, ref isRoot);

        /// <summary>
        /// Získání zkráceného názvu atributu pro daný region
        /// </summary>
        /// <param name="itemFullName">Plný název položky</param>
        /// <param name="regionDataFullName">Plný název regionu</param>
        /// <returns>Zkrácený název - pokud výsledek obsahuje více než 2 segmenty, vrací jen poslední dva</returns>
        public static string GetNameForAttribute(string itemFullName, string regionDataFullName)
        {
            if (string.IsNullOrEmpty(itemFullName))
                return string.Empty;

            if (string.IsNullOrEmpty(regionDataFullName))
                return itemFullName;

            var itemParts = itemFullName.Split('.');
            var regionParts = regionDataFullName.Split('.');

            string result;

            // 1) Pokud jsou prefixy shodné celé → odeber celý prefix
            if (itemFullName.StartsWith(regionDataFullName + "."))
            {
                result = itemFullName.Substring(regionDataFullName.Length + 1);
            }
            // 2) Pokud je společný prefix až do předposledního segmentu
            else if (itemParts.Length > 1 && regionParts.Length > 1 && itemParts.Length >= regionParts.Length)
            {
                bool allButLastMatch = true;

                for (int i = 0; i < regionParts.Length - 1; i++)
                {
                    if (itemParts[i] != regionParts[i])
                    {
                        allButLastMatch = false;
                        break;
                    }
                }

                if (allButLastMatch)
                    result = string.Join(".", itemParts.Skip(1));
                else
                    result = itemFullName;
            }
            // 3) Jinak vrať celé jméno
            else
            {
                result = itemFullName;
            }

            // Pokud výsledek obsahuje více než 1 tečku (tj. více než 2 segmenty),
            // ponech jen poslední dva segmenty (text kolem poslední tečky)
            var resultParts = result.Split('.');
            if (resultParts.Length > 2)
            {
                return resultParts[resultParts.Length - 2] + "." + resultParts[resultParts.Length - 1];
            }

            return result;
        }

        /// <summary>
        /// Nalezení úplného názvu položky
        /// </summary>
        /// <param name="region">Kořenový region</param>
        /// <param name="itemName">Název položky</param>
        /// <param name="isRoot">indikuje, že region je hlavní</param>
        /// <param name="isItem">TRUE - jedná se o název položky, FALSE - regionu</param>
        /// <returns></returns>
        public static string GetFullName(GFERegion region, string itemName, bool isItem, ref bool isRoot)
        {
            if (region == null)
                return null;

            if (string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase))
                isRoot = true;

            foreach (var item in region.Items)
                if (!string.IsNullOrEmpty(itemName))
                    if ((itemName.Contains('.') && itemName.Contains(region.Name))
                        || !itemName.Contains('.'))
                    {
                        if (!itemName.Contains('.') && itemName.Equals(item.Name, StringComparison.OrdinalIgnoreCase))
                            return item.Name;
                        else if (itemName.IndexOf("." + item.Name) > 0 && (itemName.IndexOf("." + item.Name + ".") > 0) || itemName.EndsWith("." + item.Name))
                            if (!itemName.StartsWith("ROOT", StringComparison.InvariantCultureIgnoreCase))
                                return item.Name;
                    }

            foreach (GFERegion item in region.Children)
            {
                if (string.Equals(item.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase))
                    isRoot = true;

                if (string.IsNullOrEmpty(itemName)
                    // jedná se o název regionu
                    || (!isItem && item.Name.CompareTo(itemName) == 0))
                {
                    isRoot = true;
                    return string.IsNullOrEmpty(itemName) ? item.Name : GetFullPath(region, itemName, isItem);
                }
                else if (!string.IsNullOrEmpty(itemName) && itemName.Contains('.') && itemName.Contains(item.Name))
                {
                    if (itemName.IndexOf(item.Name) == 0)
                    {
                        isRoot = true;
                        return !string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase)
                            ? region.Name + "." + itemName : itemName;
                    }
                }
                else
                    foreach (var subItem in item.Items)
                        if (subItem.Name.Equals(itemName, StringComparison.InvariantCultureIgnoreCase))
                        {
                            isRoot = false;
                            return GetFullPath(item, itemName, isItem);
                        }

                string fn = GetFullName(item, itemName, isItem, ref isRoot);
                if (fn != null)
                {
                    isRoot = false;
                    return !string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase)
                            ? region.Name + "." + fn : fn;
                }
            }
            return null;
        }

        public static bool IsReservedWord(string word) => "BLOCK".Equals(word);

        /// <summary>
        /// Nalezení úplného názvu položky
        /// Citlivá na velikost písmen
        /// </summary>
        /// <param name="region">Kořenový region</param>
        /// <param name="itemName">Název položky</param>
        /// <param name="recurse">Indikuje rekurzivní volání metody</param>
        /// <param name="isItem">indikuje položku</param>
        /// <returns></returns>
        public static string GetFullName(GFERegion region, string itemName, bool recurse = false, bool isItem = true)
        {
            if (region == null)
                return null;

            if (string.IsNullOrEmpty(itemName) || IsReservedWord(itemName))
                return itemName;

            if (region.Name.Equals(itemName))
                return GetFullPath(region, itemName, isItem);

            // najdeme úplný název prvního regionu a k němu připojíme zbytek názvu položky
            if (itemName.Contains('.'))
            {
                List<string> nms = itemName.Split('.').ToList();
                string parentRegion = GetFullName(region, nms.First(), true, false);
                if (!string.IsNullOrEmpty(parentRegion))
                    for (int i = 1; i < nms.Count; i++)
                        parentRegion += '.' + nms[i];
                else
                    parentRegion = itemName;

                // zde musíme zkontrolovat existencí položky
                return ExistsItem(region, parentRegion) ? parentRegion : null;
            }

            foreach (var item in region.Items)
                if (itemName.IndexOf(item.Name + '.') == 0
                    || itemName.Equals(item.Name))
                    return recurse ? item.Name
                        : !string.Equals(region.Name, "ROOT")
                            ? region.Name + "." + item.Name : item.Name;

            foreach (GFERegion item in region.Children)
            {
                if (item.Name.CompareTo(itemName) == 0)
                    return GetFullPath(region, itemName, true);
                else if (itemName.Contains('.')
                    && (itemName.StartsWith(item.Name + ".") || itemName.EndsWith("." + item.Name) || itemName.Contains("." + item.Name + ".")))
                {
                    if (itemName.IndexOf(item.Name + '.') == 0)
                        return !string.Equals(region.Name, "ROOT")
                            ? region.Name + "." + itemName : itemName;
                }
                else foreach (var subItem in item.Items)
                        if (subItem.Name.Equals(itemName))
                            return GetFullPath(item, itemName, false);

                string fn = GetFullName(item, itemName, true);
                if (fn != null)
                    return fn;
            }
            // možná je to jeden z předem definovaných objektu PAGE, NOW atd.
            return ExistsItem(region, itemName) ? itemName : null;
        }

        static bool ExistsItem(GFERegion region, string itemFullName)
        {
            if (region == null || string.IsNullOrEmpty(itemFullName))
                return false;

            if (itemFullName.StartsWith("ROOT."))
                itemFullName = itemFullName.Substring(5);

            while (region.Parent != null)
                region = region.Parent;

            List<string> items = itemFullName.Split('.').ToList();
            while (items.Count != 0)
            {
                GFERegion reg = region.Children.FirstOrNull(itm => itm.Name.Equals(items.First()));
                if (reg == null)
                    return items.Count == 1 && region.Items.FirstOrNull(itm => itm.Name.Equals(items.First())) != null;
                else
                {
                    region = reg;
                    items.RemoveAt(0);
                    if (items.Count == 0)
                        return true;
                }
            }
            return false;
        }

        static string GetFullPath(GFERegion region, string itemName, bool isItem)
        {
            while (region != null
                &&
                ((!isItem
                    && !region.Name.Equals(itemName, StringComparison.InvariantCultureIgnoreCase))
                || isItem)
                && !string.Equals(region.Name, "ROOT", StringComparison.InvariantCultureIgnoreCase))
            {
                itemName = region.Name + '.' + itemName;
                region = region.Parent;
            }
            return itemName;
        }
        /// <summary>
        /// Vstupní pole
        /// </summary>
        /// <param name="title">Titulek</param>
        /// <param name="prompttext">štítek</param>
        /// <param name="defaultvalue">Implicitní hodnotas</param>
        /// <returns></returns>
        public static string InputBox(string title, string prompttext, string defaultvalue)
        {
            Form form = new Form();
            Label label = new Label();
            TextBox textBox = new TextBox();
            Button buttonOk = new Button();
            Button buttonCancel = new Button();

            form.Text = title;
            label.Text = prompttext;
            textBox.Text = defaultvalue;

            buttonOk.Text = GResources.GetResourceText(29450481); //RC 29450481 : OK
            buttonCancel.Text = GResources.GetResourceText(29450480); //RC 29450480 : Storno
            buttonOk.DialogResult = DialogResult.OK;
            buttonCancel.DialogResult = DialogResult.Cancel;

            label.SetBounds(9, 20, 372, 13);
            textBox.SetBounds(12, 36, 372, 20);
            buttonOk.SetBounds(228, 72, 75, 23);
            buttonCancel.SetBounds(309, 72, 75, 23);

            label.AutoSize = true;
            textBox.Anchor = textBox.Anchor | AnchorStyles.Right;
            buttonOk.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            buttonCancel.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;

            form.ClientSize = new Size(396, 107);
            form.Controls.AddRange(new Control[] { label, textBox, buttonOk, buttonCancel });
            form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);
            form.FormBorderStyle = FormBorderStyle.FixedDialog;
            form.StartPosition = FormStartPosition.CenterScreen;
            form.MinimizeBox = false;
            form.MaximizeBox = false;
            form.AcceptButton = buttonOk;
            form.CancelButton = buttonCancel;

            if (form.ShowDialog() == DialogResult.OK)
                return textBox.Text;
            else return null;
        }

        /// <summary>
        /// Zaokrouhlení hodnoty
        /// </summary>
        /// <param name="changeValue">měněná hodnota</param>
        /// <param name="step">krok změny</param>
        /// <returns></returns>
        public static float GetChangedValue(float changeValue, float step)
        {
            float changedValue = changeValue;
            //zaokrouhlíme šířku
            //čistě matematický postup
            float _dbl = changedValue / step;
            _dbl = (float)Math.Round(_dbl);

            float _newWidth = _dbl * step - changedValue;

            if (Math.Round(_newWidth, 2) != 0)
                return changeValue + _newWidth;

            return changeValue;
        }
        /// <summary>
        /// Získání hodnoty Float v milimetrech
        /// </summary>
        /// <param name="floatValue">Hodnota</param>
        /// <param name="decimals">
        /// počet čislic po zaokrouhlení. 
        /// Použij záporné číslo pro žádné zaokrouhlení
        /// </param>
        /// <returns>Zaokrouhlené dle <paramref name="decimals"/> číslo, vyjádřující danou hodnotu <paramref name="floatValue"/> v milimetréch</returns>
        public static float GetMilimeters<T>(T floatValue, int decimals = -1)
        {
            float value = 0;
            if (typeof(T) == typeof(SizeValue))
                value = (float)(new SizeValue(floatValue, "mm") / MM_TO_PIXELS);
            else if (typeof(T) == typeof(float))
                value = (float)((floatValue as float?) / MM_TO_PIXELS);

            if (decimals > 0)
                value = (float)Math.Round(value, decimals);

            return value;
        }

        /// <summary>
        /// Kontrola, zda objekt je prázdný, či nikoliv
        /// </summary>
        /// <param name="o">objekt, který je zapotřebí ověřit</param>
        /// <returns>vrací TRUE pokud objekt je NULL, nebo objekt typu string je Empty</returns>
        public static bool IsEmpty(object o)
        {
            if (o == null)
                return true;

            if (o is string)
                return (o as string) == string.Empty;

            return false;
        }

        /// <summary>
        /// Struktura reprezentující zónu kurzoru
        /// </summary>
        private struct CursorZone
        {
            public Func<float, float, RectangleF, bool> IsInZone;
            public Cursor Cursor;
            public int Direction;

            public CursorZone(Func<float, float, RectangleF, bool> isInZone, Cursor cursor, int direction)
            {
                IsInZone = isInZone;
                Cursor = cursor;
                Direction = direction;
            }
        }

        /// <summary>
        /// Tolerance pro výpočet pozice kurzoru
        /// </summary>
        private const float CURSOR_TOLERANCE = 2f;

        /// <summary>
        /// Definice všech zón kurzoru
        /// </summary>
        private static readonly CursorZone[] CursorZones = new CursorZone[]
        {
            // Levý horní čtvereček
            new CursorZone(
                (mx, my, b) => mx <= CURSOR_TOLERANCE && mx >= -CURSOR_TOLERANCE && my <= CURSOR_TOLERANCE && my >= -CURSOR_TOLERANCE,
                Cursors.SizeNWSE,
                0),
            // Horní kraj
            new CursorZone(
                (mx, my, b) => my <= CURSOR_TOLERANCE && my >= -CURSOR_TOLERANCE && mx < b.Width - CURSOR_TOLERANCE && mx > CURSOR_TOLERANCE,
                Cursors.SizeNS,
                1),
            // Pravý horní čtvereček
            new CursorZone(
                (mx, my, b) => mx >= b.Width - CURSOR_TOLERANCE && mx <= b.Width + CURSOR_TOLERANCE && my <= CURSOR_TOLERANCE && my >= -CURSOR_TOLERANCE,
                Cursors.SizeNESW,
                2),
            // Levý okraj
            new CursorZone(
                (mx, my, b) => mx <= CURSOR_TOLERANCE && mx >= -CURSOR_TOLERANCE && my < b.Height - CURSOR_TOLERANCE && my > CURSOR_TOLERANCE,
                Cursors.SizeWE,
                3),
            // Pravý okraj
            new CursorZone(
                (mx, my, b) => mx >= b.Width - CURSOR_TOLERANCE && mx <= b.Width + CURSOR_TOLERANCE && my < b.Height - CURSOR_TOLERANCE && my > CURSOR_TOLERANCE,
                Cursors.SizeWE,
                4),
            // Levý dolní čtvereček
            new CursorZone(
                (mx, my, b) => mx <= CURSOR_TOLERANCE && mx >= -CURSOR_TOLERANCE && my <= b.Height + CURSOR_TOLERANCE && my >= b.Height - CURSOR_TOLERANCE,
                Cursors.SizeNESW,
                5),
            // Dolní okraj
            new CursorZone(
                (mx, my, b) => mx < b.Width - CURSOR_TOLERANCE && mx > CURSOR_TOLERANCE && my >= b.Height - CURSOR_TOLERANCE && my <= b.Height + CURSOR_TOLERANCE,
                Cursors.SizeNS,
                6),
            // Pravý dolní čtvereček
            new CursorZone(
                (mx, my, b) => mx >= b.Width - CURSOR_TOLERANCE && mx <= b.Width + CURSOR_TOLERANCE && my <= b.Height + CURSOR_TOLERANCE && my >= b.Height - CURSOR_TOLERANCE,
                Cursors.SizeNWSE,
                7)
        };

        /// <summary>
        /// Získání vzhledu kurzóru dle jeho umístění
        /// </summary>
        /// <param name="pointF">Umístění kurzóru</param>
        /// <param name="direction">Směr pohybu</param>
        /// <param name="bound">Ohraničení pro kontorolu</param>
        /// <returns>Vzhled kurzoru</returns>
        public static Cursor GetCursor(PointF pointF, RectangleF bound, ref int direction)
        {
            // Pozice kurzoru vzhledem k objektu
            float mx = pointF.X - bound.Left;
            float my = pointF.Y - bound.Top;

            // Kontrola všech zón
            foreach (var zone in CursorZones)
            {
                if (zone.IsInZone(mx, my, bound))
                {
                    direction = zone.Direction;
                    return zone.Cursor;
                }
            }

            // Na okrají objektu se kurzor nenachází
            direction = -1;
            return Cursors.Default;
        }

        /// <summary>
        /// Získání upravené dle rozlíšení hodnoty.
        /// </summary>
        /// <param name="value">Stará - neupravená hodnota</param>
        /// <param name="resolution">Rozlíšení</param>
        /// <returns></returns>
        public static float AlignValueByResolution(float value, float resolution = -1)
        {
            if (resolution == -1)
                resolution = GraphicSettingService.Resolution;

            if (resolution > 0)
            {
                double residue = value < 0 ? (-1) * value + Math.Abs(Math.Round(value / resolution) * resolution) : value - Math.Abs(Math.Round(value / resolution) * resolution);
                /* úprava zaokrouhlování
                 * if (value < 0)
                 *    residue = (-1) * value + Math.Abs((int)(value / resolution) * resolution);
                 * else
                 *    residue = value - Math.Abs((int)(value / resolution) * resolution);
                 */

                return (float)Math.Round(value - residue, 2);
            }
            else
                return value;
        }

        /// <summary>
        /// Odstranění nevhodných značek klíče
        /// </summary>
        /// <param name="key">Daný klíč</param>
        /// <returns>Normalizovaný klíč</returns>
        public static string NormalizeKey(string key) => key.Replace(' ', '_');

        public static string MakeValidFileName(string pName, string replace)
        {
            string name = new string(Encoding.ASCII.GetChars(Encoding.ASCII.GetBytes(pName)));
            string invalidChars = System.Text.RegularExpressions.Regex.Escape(new string(Path.GetInvalidFileNameChars()));
            string invalidRegStr = string.Format(@"([{0}]*\.+$)|([{0}]+)", invalidChars);

            return System.Text.RegularExpressions.Regex.Replace(name, invalidRegStr, replace);
        }

        /// <summary>
        /// Získání nového obrázku
        /// </summary>
        /// <param name="imageName">název obrázku</param>
        /// <returns>Vybraný obrázek, nebo NULL</returns>
        public static Image GetNewImageByDialog(ref string imageName)
        {
            using (OpenFileDialog l_oVyberSoubor = new OpenFileDialog())
            {
                // nastavení filtru hledání souboru
                string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/NewImageFilter").BuildChildItems(null)).ToArray(typeof(string));
                l_oVyberSoubor.Filter = String.Join("|", fileFilters);
                l_oVyberSoubor.CheckFileExists = true;

                if (l_oVyberSoubor.ShowDialog(ProcessService.Desktop.MainForm) == DialogResult.OK
                    && !string.IsNullOrEmpty(l_oVyberSoubor.FileName))
                {
                    imageName = MakeValidFileName(GCommon.RemoveDiacritics(l_oVyberSoubor.SafeFileName), "_");

                    try { return ImageService.GetImage(l_oVyberSoubor.FileName, true); }
                    catch (ErrorImageException)
                    {
                        if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450280) + " '{0}' " + GResources.GetResourceText(29450482) + '\n' //RC 29450482 : v seznamu již existuje.
                            + GResources.GetResourceText(29450483) //RC 29450483 : Pokud ho v seznamu nevidíte, pak je to způsobeno chybou uložení sestavy - uložte sestavu bez obrázků a načtěte znovu.
                            + '\n' + GResources.GetResourceText(29450484), (new FileInfo(l_oVyberSoubor.FileName)).Name))) //RC 29450484 : Přejete si ho načíst? Pokud NE, pak ho přejmenujte nebo načtěte jiný.
                            return ImageService.GetImage(l_oVyberSoubor.FileName, false);
                    }
                    catch (Exception ex) { MessageService.ShowError(string.Format(GResources.GetResourceText(29450485) + ": {0}", ex.Message)); } //RC 29450485 : Obrázek nelze načíst
                }
            }
            return null;
        }

        #region RTF
        /// <summary>
        /// Hledání hodnoty parametru v textu
        /// </summary>
        /// <param name="text">text, ve kterém se hledá hodnota parametru</param>
        /// <param name="c_Word">název control wordu, např. '\ffstatetext'</param>
        /// <param name="brackets">obsah mezi '(',')'</param>
        /// <returns>hodnota parametru</returns>
        public static string GetControlWordContent(string text, string c_Word, bool brackets = false)
        {
            if (IsEmpty(text) || IsEmpty(c_Word) || text.ToLower().IndexOf(c_Word.ToLower()) == -1)
                return null;

            char endChar = brackets ? ')' : ' ';
            StringBuilder result = new StringBuilder();
            int startIndex = text.ToLower().IndexOf(c_Word.ToLower()) + c_Word.Length;

            for (int i = startIndex; i < text.Length; i++)
            {
                char ch = text[i];
                if (!brackets && (ch == '\\' || ch == '}' || ch == '{'))
                    break;
                if (brackets && ch == endChar)
                    break;
                result.Append(ch);
            }

            return result.Length > 0 ? result.ToString() : null;
        }
        /// <summary>
        /// Společný helper pro zpracování výsledků z RTF field metod
        /// Odstraňuje závorky, zpracovává regiony a odstraňuje GUID
        /// </summary>
        /// <param name="result">Výsledný text k zpracování</param>
        /// <returns>Zpracovaný text nebo null</returns>
        private static string ProcessFieldResult(string result)
        {
            if (IsEmpty(result))
                return null;

            // Odstranění závorek
            result = result.Trim('{').Trim('}');

            if (IsEmpty(result))
                return null;

            // Zpracování regionů - pokud je více než 2 části, použij jen části za první
            string[] regions = result.Split('.');
            if (regions.Length > 2)
            {
                result = string.Join(".", regions.Skip(1));
            }

            // Odstranění GUID na konci
            int guidIndex = result.IndexOf("[#");
            if (guidIndex != -1)
            {
                result = result.Substring(0, guidIndex).Trim();
            }

            return IsEmpty(result) ? null : result;
        }

        static bool ValueFromParentRegion(GFERegion region, string p)
        {
            if (region == null || region.Parent == null)
                return false;

            return string.Equals(region.Parent.Name, p, StringComparison.InvariantCultureIgnoreCase) 
                || ValueFromParentRegion(region.Parent, p);
        }
        static GFERegion GetFirstRegion(GFERegion region, string item)
        {
            if (region.Children.Count() == 0)
                return null;

            foreach (GFERegion itemReg in region.Children)
                if (string.Equals(itemReg.Name, item, StringComparison.InvariantCultureIgnoreCase))
                    return itemReg;
                else
                {
                    GFERegion result = GetFirstRegion(itemReg, item);
                    if (result != null)
                        return result;
                }

            return null;
        }

        /// <summary>
        /// Veškerý text za indexem který neobsahuje nepovolené znaky
        /// </summary>
        /// <param name="p_text">Text, ze kterého se vybírá</param>
        /// <param name="p_index">Daný index</param>
        /// <returns></returns>
        static object GetTextAfter(string p_text, int p_index)
        {
            string _result = string.Empty;
            for (int _index = p_index + 1; _index < p_text.Length; _index++)
            {
                if ((Char.IsLetterOrDigit(p_text[_index]) || p_text[_index] == '.' || p_text[_index] == '_')
                    && (p_text[_index] != '['))
                    _result += Convert.ToString(p_text[_index]);
                else break;
            }
            return _result;
        }
        /// <summary>
        /// Veškerý text před indexem který neobsahuje nepovolené znaky
        /// </summary>
        /// <param name="p_text">Text, ze kterého se vybírá</param>
        /// <param name="p_index">Daný index</param>
        /// <returns></returns>
        static string GetTextBefoure(string p_text, int p_index)
        {
            string _result = string.Empty;
            for (int _index = p_index - 1; _index >= 0; _index--)
            {
                if (Char.IsLetterOrDigit(p_text[_index]) || p_text[_index] == '_')
                    _result = Convert.ToString(p_text[_index]) + _result;
                else break;
            }
            return _result;
        }
        static char GetSymbol(string p_text, ref int p_index)
        {
            string _result = string.Empty;
            int _index = p_index;
            int _count = 0;
            while (_index < p_text.Length && _count != 2)
            {
                char ch = p_text[_index++];
                if (!Char.IsLetterOrDigit(ch))
                    break;
                _result += ch;
                _count++;
            }

            if (_result.ToLower() == "ec")
            {
                p_index = _index - 1;
                return 'ě';
            }
            else if (_result.ToLower() == "ed")
            {
                p_index = _index - 1;
                return 'í';
            }
            else if (_result.ToLower() == "e1")
            {
                p_index = _index - 1;
                return 'á';
            }

            return p_text[p_index];
        }
        static char Hex(char p1, char p2)
        {
            p1 = Char.ToUpper(p1);
            p2 = Char.ToUpper(p2);
            int i1 = p1 >= 'A' ? p1 - 'A' + 10 : p1 - '0';
            int i2 = p2 >= 'A' ? p2 - 'A' + 10 : p2 - '0';
            return Encoding.Default.GetString(new byte[] { (byte)(i1 * 16 + i2) })[0];
        }
        static int GetIndexOf(string p_fldinst, string p_instance)
        {
            Dictionary<int, int> _arrayOfIndexes = new Dictionary<int, int>();
            string _newText = DeleteUnspecificSymbols(p_fldinst, ref _arrayOfIndexes).ToString();
            return _arrayOfIndexes[_newText.IndexOf(p_instance)];
        }
        static StringBuilder DeleteUnspecificSymbols(string p_text, ref Dictionary<int, int> _arrayOfIndexes)
        {
            StringBuilder sb = new StringBuilder();
            int _index = 0;

            while (_index < p_text.Length)
            {
                char ch = p_text[_index++];
                if (ch == '\\')
                {
                    while (_index < p_text.Length && Char.IsLetter(p_text, _index)) _index++;
                    if (_index < p_text.Length && p_text[_index] == '-') _index++;
                    while (_index < p_text.Length && Char.IsDigit(p_text, _index)) _index++;
                    if (_index < p_text.Length && p_text[_index] == ' ') _index++;
                    continue;
                }

                if (ch == '\'')
                {
                    int _oldIndex = _index;
                    sb.Append(GetSymbol(p_text, ref _index));
                    _arrayOfIndexes.Add(sb.Length - 1, _oldIndex - 1);
                    continue;
                }

                if (ch == '\r')
                {
                    if (_index < p_text.Length && p_text[_index] == '\n')
                        _index++;
                    continue;
                }
                if (ch == '\n')
                    continue;
                if (ch == '*'
                    && (_index - 1 >= 0 && p_text[_index - 1] == '\\')
                    && (_index + 1 < p_text.Length && p_text[_index + 1] == '\\'))
                    continue;

                sb.Append(ch);
                _arrayOfIndexes.Add(sb.Length - 1, _index - 1);
            }

            return sb;
            //p_text.Substring(0, _arrayOfSymbols[_result.IndexOf("ělo")] - 1)
        }

        /// <summary>
        /// Nalezeni specifického textu (name) uvnitř textu (MSWField:)
        /// </summary>
        /// <param name="text">libovolný text, ve kterém na začátku je veličina podobna hodnotě položky</param>
        /// <param name="p_field">MSWField nebo MSEField</param>
        /// <returns>nalezený text</returns>
        /// <remarks>MSWField: pisemnost.vlastnik_nazev_rf</remarks>
        public static string GetNameValueOf(string text, string p_field)
        {
            if (IsEmpty(text))
                return null;

            try
            {
                string result = GetControlWordContent(text, p_field + ": ");
                return ProcessFieldResult(result);
            }
            catch (ArgumentException)
            {
                // Očekávaná výjimka při neplatném formátu textu
                return null;
            }
        }
        public static string GetClearText(string p_text)
        {
            Dictionary<int, int> _arrayOfIndexes = new Dictionary<int, int>();
            return DeleteUnspecificSymbols(p_text, ref _arrayOfIndexes).ToString();
        }
        /// <summary>
        /// Najde region z prislusneho textu
        /// </summary>
        /// <param name="text">text v kterem se hleda region name</param>
        /// <returns>název regionu</returns>
        public static string GetRegion(string text)
        {
            if (IsEmpty(text))
                return null;

            try
            {
                //{\b\insrsid16080220\charrsid16080220  MACROBUTTON MSWBeginSectionBody(pisemnost) T\'eclo: }
                if (text.IndexOf("MACROBUTTON ") != -1)
                {
                    string result = GetControlWordContent(text, "MACROBUTTON ");

                    if (!IsEmpty(result) && result.IndexOf('(') < result.IndexOf(')'))
                    {
                        result = result.Substring(result.IndexOf('(') + 1, result.IndexOf(')') - result.IndexOf('(') - 1);
                    }
                    return result;
                }
                else if (text.IndexOf("MSWField:") != -1)
                {
                    string result = text.Remove(0, text.IndexOf("MWSField:") + 10).Trim();
                    if (result.Split('.').Length > 1)
                        return result.Split('.')[0];

                    if (result.IndexOf("[#") != -1)
                        result = result.Substring(0, result.IndexOf("[#"));
                    return result;
                }
            }
            catch (ArgumentOutOfRangeException)
            {
                // Očekávaná výjimka při neplatných indexech v substring operacích
                return null;
            }

            return null;
        }

        /// <summary>
        /// Získání názvu z textu
        /// </summary>
        /// <param name="text">Text objektu</param>
        /// <param name="rtfType">typ hledaného objektu</param>
        /// <returns>Získáný název</returns>
        public static string GetFieldName(string text, ref GRTFField.GMBType rtfType)
        {
            if (IsEmpty(text))
                return null;

            string result = null;

            foreach (var item in Enum.GetNames(typeof(GRTFField.GMBType)))
            {
                rtfType = (GRTFField.GMBType)Enum.Parse(typeof(GRTFField.GMBType), item);

                if (text.ToLower().Contains(item + "("))
                {
                    result = GetControlWordContent(text, item + "(", true);
                    break;
                }
                else if (text.ToLower().Contains(item + ":"))
                {
                    result = GetControlWordContent(text, item + ":");
                    break;
                }
            }

            return ProcessFieldResult(result);
        }

        /// <summary>
        /// Nalezeni specifického textu (name) uvnitř textu (MSWField:)
        /// </summary>
        /// <param name="text">libovolný text, ve kterém na začátku je veličina podobna hodnotě položky</param>
        /// <param name="MMSWField">true - MACROBUTTON, false - MSWField</param>
        /// <returns>nalezený text</returns>
        /// <remarks>MSWField: pisemnost.vlastnik_nazev_rf</remarks>
        public static string GetNameMSWField(string text, bool MMSWField)
        {
            if (IsEmpty(text))
                return null;

            try
            {
                string result = MMSWField 
                    ? GetControlWordContent(text, "MSWField(", true)
                    : GetControlWordContent(text, "MSWField: ");

                return ProcessFieldResult(result);
            }
            catch (ArgumentException)
            {
                // Očekávaná výjimka při neplatném formátu textu
                return null;
            }
        }
        /// <summary>
        /// Vrácení atributu RTF
        /// </summary>
        /// <param name="p_fldinst">Text ze kterého se bere atribut RTF</param>
        /// <param name="p_instance">Instance</param>
        /// <returns>\insrsid16739571  MACROBUTTON MSWField(FVZ382d_PO.p13_predm_VZ): N\'e1vrh Ano/Ne</returns>
        /// //TODO:
        public static string GetAtrRtf(string p_fldinst, GRTFField.GFieldType p_instance)
        {
            if (string.IsNullOrEmpty(p_fldinst) || p_instance == GRTFField.GFieldType.unknown)
                return string.Empty;

            return p_fldinst.Substring(0, GetIndexOf(p_fldinst, p_instance.ToString())).Trim();
            //p_fldinst.IndexOf(p_instance.ToString())).Trim();
        }
        /// <summary>
        /// TODO:
        /// </summary>
        /// <param name="m_fldinst"></param>
        /// <returns></returns>
        public static string GetRSID(string m_fldinst)
        {
            string _result = string.Empty;
            //m_fldinst = m_fldinst.Substring(0, m_fldinst.IndexOf("MACROBUTTON")).Trim();
            m_fldinst = m_fldinst.Substring(0, GetIndexOf(m_fldinst, "MACROBUTTON")).Trim();
            if (m_fldinst.IndexOf(@"\insrsid") != -1
                && m_fldinst.IndexOf(@"\insrsid") != 0)
            {
                m_fldinst = m_fldinst.Remove(0, m_fldinst.IndexOf(@"\insrsid"));
                _result = m_fldinst[0].ToString();
                m_fldinst = m_fldinst.Remove(0, 1);
                if (m_fldinst.IndexOf(@"\") != -1)
                    _result += m_fldinst.Substring(0, m_fldinst.IndexOf(@"\"));
                else _result += m_fldinst;
            }
            if (!string.IsNullOrEmpty(_result))
                return _result;
            else return m_fldinst;
        }
        /// <summary>
        /// Vyhodí typ položky pro potřeby ALF formátu
        /// </summary>
        /// <param name="p_formfield">Řetězec, ve kterém se typ hledá</param>
        /// <returns>\fftype0\ffownstat\fftypetxt0\ffhps20{\*\ffname Text1}	
        /// {\*\ffdeftext \'c8\'edslo objedn\'e1vky	}
        /// {\*\ffstattext MSWField: FVZ382d_PO.cis_obj[b25EYXRhPSJhPTMiIA==][#61e7a21b-b620-43fa-b0c7-66b9eabe78e7#]	}</returns>
        public static string GetAtrType(string p_formfield) => p_formfield.Substring(0, p_formfield.IndexOf('{'));

        /// <summary>
        /// Získání atributu NAME
        /// </summary>
        /// <param name="p_text">Text ze kterého se bere atribut NAME</param>
        /// <param name="p_instance">Instance</param>
        /// <returns></returns>
        public static string GetAtrName(string p_text, GRTFField.GFieldType p_instance)
        {
            p_text = GetClearText(p_text);

            switch (p_instance)
            {
                case GRTFField.GFieldType.macrobutton:
                    p_text = p_text.Remove(0, p_text.IndexOf('(') + 1);
                    return p_text.Substring(0, p_text.IndexOf(')'));

                case GRTFField.GFieldType.formfield:
                    string result = string.Format("{0}{1}{2}", GetTextBefoure(p_text, p_text.IndexOf('.')), '.', GetTextAfter(p_text, p_text.IndexOf('.')));
                    if (result == ".")
                    {
                        /* *MSWField: DATE[#3fd336a4-4a16-430e-9ec9-e2547d3d573c#]}}*/
                        string substring = p_text.Substring(0, p_text.IndexOf('['));
                        result = string.Empty;
                        int index = substring.Length - 1;
                        while (index >= 0 && substring[index] != ' ' && substring[index] != ':')
                        {
                            result = substring[index] + result;
                            index--;
                        }
                    }
                    return result;

                default:
                    return string.Empty;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="p_ffstatetext"></param>
        /// <returns>\fftype0\ffownstat\fftypetxt0\ffhps20{\*\ffname Text1}	
        /// {\*\ffdeftext \'c8\'edslo objedn\'e1vky	}
        /// {\*\ffstattext MSWField: FVZ382d_PO.cis_obj[b25EYXRhPSJhPTMiIA==][#61e7a21b-b620-43fa-b0c7-66b9eabe78e7#]	}</returns>
        public static string GetAtrGuid(string p_ffstatetext)
        {
            p_ffstatetext = GetClearText(p_ffstatetext);
            if (p_ffstatetext.Contains(@"[#") == false || p_ffstatetext.Contains(@"#]") == false)
                return string.Empty;
            //odstraníme text před symboly '[#' včetně samotných symbolů
            p_ffstatetext = p_ffstatetext.Remove(0, p_ffstatetext.IndexOf(@"[#") + 2);
            //a vrátíme vše před symboly '#]'
            return p_ffstatetext.Substring(0, p_ffstatetext.IndexOf(@"#]"));
        }
        /// <summary>
        /// získání textu ze závorek
        /// </summary>
        /// <param name="p_rtf">RTF obsah</param>
        /// <returns>text v závorkách</returns>
        public static string GetTextInBrackets(string p_rtf)
        {
            int _open = 0,
                _close = 0;
            string _text = string.Empty;
            int _indexOpen = p_rtf.IndexOf('{'),
                _indexClose = p_rtf.IndexOf('}');

            if (_indexOpen == -1 || _indexClose == -1)
                return p_rtf;

            while (string.IsNullOrEmpty(_text)
                || (_indexClose != -1 && _indexOpen != -1 && _open != _close)
                || (_indexClose != -1 && _indexOpen == -1 && _open >= _close))
            {
                if (_indexOpen < _indexClose && _indexOpen != -1)
                {
                    _text += p_rtf.Substring(0, _indexOpen + 1);
                    if (_indexOpen == 0 || ((_indexOpen != -1) && p_rtf[_indexOpen - 1] != '\\'))
                        _open++;
                    p_rtf = p_rtf.Remove(0, _indexOpen + 1);
                }
                else
                {
                    _text += p_rtf.Substring(0, _indexClose + 1);
                    if (_indexClose == 0 || p_rtf[_indexClose - 1] != '\\')
                        _close++;
                    p_rtf = p_rtf.Remove(0, _indexClose + 1);
                }
                _indexOpen = p_rtf.IndexOf('{');
                _indexClose = p_rtf.IndexOf('}');
            }
            return _text;
        }

        /// <summary>
        /// Indikuje COM operaci
        /// </summary>
        /// <param name="comOperationDelegate"></param>
        public static bool IsComOperation(ComOperationDelegate comOperationDelegate)
        {
            // Takovéto části kódu jsou kritické – chyba spočívá v tom, 
            // že Excel nestíhá zpracovat operaci a potřebuje čas na zpracování dat. 
            // Proto zde je smyčka
            bool comException = true;

            while (comException)
            {
                try
                {
                    comOperationDelegate();
                    comException = false;
                }
                catch (COMException) { comException = true; Thread.Sleep(100); }
                catch (InvalidComObjectException) { return false; }
                // jinou chybu jsem zatím nechytil
            }
            return true;
        }

        /// <summary>
        /// záměna jednoznačných identifikátorů
        /// </summary>
        /// <param name="field">pole pro záměnu</param>
        /// <param name="oldGuid">starý identifikátor</param>
        /// <param name="newGuid">nový identifikátor</param>
        public static void ReplaceGuid(Word.Field field, Guid oldGuid, Guid newGuid)
        {
            if (field != null)
                field.Code.Text = field.Code.Text.Replace(string.Format("[#{0}#]", oldGuid.ToString()), string.Format("[#{0}#]", newGuid.ToString()));
        }
        /// <summary>
        /// Získání regionu ze struktury dle názvu
        /// </summary>
        /// <param name="p">Název</param>
        /// <param name="region"></param>
        /// <param name="structure">Datová struktura</param>
        /// <returns>Region datové struktury</returns>
        public static GFERegion GetRegion(GFEStructure structure, string p, GFERegion region)
        {
            return structure.GetRegion(p, region);
        }

        /// <summary>
        /// Získání atributu instance
        /// </summary>
        /// <param name="p_text">Text ve kterém se hledá atribut</param>
        /// <returns>//TODO:</returns>
        public static GRTFField.GFieldType GetAtrInstance(string p_text)
        {
            string _text = GetClearText(p_text);
            if (_text.ToUpper().Contains("MACROBUTTON"))
                return GRTFField.GFieldType.macrobutton;
            else if (_text.ToUpper().Contains("FORMTEXT"))
                return GRTFField.GFieldType.formfield;
            else return GRTFField.GFieldType.unknown;
        }

        /// <summary>
        /// Zjištění typu u Macrobuttonu (field, BeginSection, ...)
        /// </summary>
        /// TODO:
        // \insrsid16739571  MACROBUTTON MSWField(FVZ382d_PO.cis_obj): \'c8\'edslo objedn\'e1vky 
        //{\field\flddirty{\*\fldinst {\rtlch\fcs1 \ab\af0 \ltrch\fcs0 \b\insrsid12660391 \hich\af0\dbch\af31505\loch\f0  MACROBUTTON MSWBeginSectionB\hich\af0\dbch\af31505\loch\f0 \hich\f0 ody(HLAVVYROK) T\'ec\loch\f0 lo: }
        public static GRTFField.GMBType GetMacrobuttonType(string fldinst, out string name)
        {
            fldinst = GetClearText(fldinst);
            //pokud instance neprezentuje MACROBUTTON, pak není co řešit
            if (!fldinst.ToUpper().Contains("MACROBUTTON"))
            { name = ""; return GRTFField.GMBType.unknown; }

            int index = fldinst.IndexOf("MACROBUTTON") + 12;
            StringBuilder sb = new StringBuilder();
            string type = "";
            while (index < fldinst.Length)
            {
                char ch = fldinst[index++];
                if (ch == '\\')
                {
                    while (index < fldinst.Length && Char.IsLetter(fldinst, index)) index++;
                    if (index < fldinst.Length && fldinst[index] == '-') index++;
                    while (index < fldinst.Length && Char.IsDigit(fldinst, index)) index++;
                    if (index < fldinst.Length && fldinst[index] == ' ') index++;
                    continue;
                }
                if (ch == '{')
                {
                    int l = 1;
                    while (index < fldinst.Length && l > 0)
                    {
                        char n = fldinst[index++];
                        if (n == '{') l++;
                        else if (n == '}') l--;
                    }
                    continue;
                }
                if (ch == '\'') { ch = (char)Hex(fldinst[index++], fldinst[index++]); }
                if (ch == '(') { type = sb.ToString(); sb.Clear(); continue; }
                if (ch == ')') break;
                if (ch >= ' ') sb.Append(ch); //kontrolni znaky nepocitam (treba konec radku)
            }
            name = sb.ToString();

            if (Enum.TryParse<GRTFField.GMBType>(type, out GRTFField.GMBType result))
                return result;
            return GRTFField.GMBType.unknown;
            //return (RtfMacrobuttonType)Enum.Parse(typeof(RtfMacrobuttonType), fldinst);
        }
        #endregion

        /// <summary>
        /// Vytvoření slovníku
        /// </summary>
        /// <typeparam name="T1">Typ klíče</typeparam>
        /// <typeparam name="T2">Typ hodnoty</typeparam>
        /// <param name="component">Seznam komponent pro vytvoření položek slovníku</param>
        /// <param name="revers">Indikuje, že klíč a hodnota se mají vyměnit místy</param>
        /// <param name="defaultKey">Výchozí klíč - pokud komponenty nejsou dané</param>
        /// <param name="defaultValue">Výchozí hodnota - pokud komponenty nejsou dané</param>
        /// <returns></returns>
        public static Dictionary<T1, T2> BuildDictionary<T1, T2>(object component, bool revers, T1 defaultKey, T2 defaultValue)
        {
            Dictionary<T1, T2> dict = new Dictionary<T1, T2>();
            if (component is CustomComponentItem)
                foreach (DictionaryEntry item in (component as CustomComponentItem).Attributes)
                    if (revers)
                        dict.Add((T1)item.Value, (T2)item.Key);
                    else
                        dict.Add((T1)item.Key, (T2)item.Value);
            return dict;
        }

        #region Structure
        /// <summary>
        /// Získání typu ze struktury dat dle cesty
        /// </summary>
        /// <param name="fullfieldname">Cesta k položce</param>
        /// <param name="structure">Datová struktura</param>
        /// <param name="isDataItem">TRUE - se jedná o datovou položku</param>
        public static string GetTypeFromStructure(GFEStructure structure, string fullfieldname, byte isDataItem = 0)
        {
            GFEDataItem di = (GFEDataItem)GetItemFromStructure(structure, fullfieldname, isDataItem);

            return GetTypeFromStructure(di);
        }

        /// <summary>
        /// Získání oblasti z datové struktury
        /// </summary>
        /// <param name="structure">Datová struktura ve které se hledá položka</param>
        /// <param name="fullfieldname">Název položky</param>
        public static GFERegion GetRegionFromStructure(GFEStructure structure, string fullfieldname)
        {
            var s = fullfieldname.Split('.');
            return GetRegionFromStructure(structure, s, s.Length - 1);
        }
        /// <summary>
        /// Získání oblasti z datové struktury
        /// </summary>
        public static GFERegion GetRegionFromStructure(GFEStructure structure, string[] path, int index = 0)
        {
            var n = path[index];
            if (n == "ROOT") return structure.Root;
            return structure.GetRegion(n);
        }

        /// <summary>
        /// Získání položky datové struktury
        /// </summary>
        /// <param name="structure">Datová struktura ve které se hledá položka</param>
        /// <param name="fullfieldname">Název položky</param>
        /// <param name="isDataItem">indikuje, že se jedná o datovou položku: 0 - hledat dle jméne, 1 - je datová položka; 2 - najit region</param>
        /// <returns>Datová položka</returns>
        public static object GetItemFromStructure(GFEStructure structure, string fullfieldname, byte isDataItem = 0)
        {
            if (structure != null && !string.IsNullOrEmpty(fullfieldname))
            {
                string[] path = fullfieldname.Split('.');

                foreach (GFERegion item in structure.Root.Children)
                    if (string.Equals(path[0], item.Name, StringComparison.InvariantCultureIgnoreCase))
                        return GetItemFromStructure(path, item, 1, isDataItem);
                return GetItemFromStructure(path, structure.Root, 0, isDataItem);
            }

            return null;
        }
        /// <summary>
        /// Získání argumentu 'edit-type' z datové položky
        /// </summary>
        /// <param name="dataItem">Datová položka</param>
        /// <returns>hodnota atributu 'edit-type' datové položky</returns>
        public static string GetTypeFromStructure(GFEDataItem dataItem)
        {
            if (dataItem == null)
                return "string";
            var editType = dataItem.Attributes.GetWithDefault("edit-type", "");
            if (editType != "")
                return editType;

            var datatype = dataItem.Attributes.GetWithDefault("datatype", "string");
            switch (datatype)
            {
                case "string":
                case "number":
                case "decimal":
                case "int16":
                case "int32":
                case "int64":
                case "datetime":
                case "date":
                case "rtf-formatted":
                case "rtf-compressed":
                case "string-preserve-spaces":
                    return datatype;
            }
            return dataItem.DataType.ToString().ToLower(); //melo by vratit "string", nebot jine moznosti jsou nahore ve switch
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="gFERegion"></param>
        /// <param name="position"></param>
        /// <param name="isDataItem">indikuje, že se jedná o datovou položku: 0 - hledat dle jméne, 1 - je datová položka; 2 - najit region</param>
        /// <returns></returns>
        static object GetItemFromStructure(string[] path, GFERegion gFERegion, int position, byte isDataItem = 0)
        {
            if (position < path.Length - 1)
            {
                foreach (GFERegion item in gFERegion.Children)
                    if (string.Equals(path[position], item.Name, StringComparison.InvariantCultureIgnoreCase))
                    {
                        position++;
                        return GetItemFromStructure(path, item, position, isDataItem);
                    }
            }
            //else
            if (position == path.Length - 1)
            {
                if (isDataItem == 1)
                    foreach (GFEDataItem item in gFERegion.Items)
                        if (string.Equals(path[position], item.Name, StringComparison.InvariantCultureIgnoreCase))
                            return item;

                foreach (GFERegion item in gFERegion.Children)
                    if (string.Equals(path[position], item.Name, StringComparison.InvariantCultureIgnoreCase))
                    {
                        position++;
                        return GetItemFromStructure(path, item, position, isDataItem);
                    }

            }
            else if (position == path.Length)
                if (string.Equals(path.Last(), gFERegion.Name, StringComparison.InvariantCultureIgnoreCase))
                    return gFERegion;

            return null;
        }
        #endregion

        #region Zoom, ShowGrid, Resolution, ShowColorOf
        static readonly IDictionary<IViewContent, GraphicSettingService.Item> gsItems = new ConcurrentDictionary<IViewContent, GraphicSettingService.Item>();

        /// <summary>
        /// Helper pro přidání event handleru k gsItems
        /// </summary>
        private static void AddEventHandler(IViewContent content, EventHandler handler, Action<GraphicSettingService.Item, EventHandler> subscribe)
        {
            if (content == null) return;

            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            subscribe(gsItems[content], handler);
        }

        /// <summary>
        /// Helper pro odebrání event handleru z gsItems
        /// </summary>
        private static void RemoveEventHandler(IViewContent content, EventHandler handler, Action<GraphicSettingService.Item, EventHandler> unsubscribe)
        {
            if (content == null) return;

            if (gsItems.ContainsKey(content))
                unsubscribe(gsItems[content], handler);
        }

        /// <summary>
        /// Helper pro získání nebo vytvoření GraphicSettingService.Item
        /// </summary>
        private static GraphicSettingService.Item GetOrCreateItem(IViewContent content)
        {
            if (content == null) return null;

            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            return gsItems[content];
        }

        /// <summary>
        /// Získání hodnoty rozlišení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <param name="resolution">Výchozí rozlišení</param>
        /// <returns>Hodnota rozlišení</returns>
        public static SizeValue GetResolution(IViewContent content, string resolution)
        {
            if (content == null)
                return new SizeValue(resolution);

            if (!gsItems.ContainsKey(content))
            {
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));
                gsItems[content].Resolution = new SizeValue(resolution);
            }

            return gsItems[content].Resolution;
        }
        /// <summary>
        /// Nastavení rozlišení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetResolution(IViewContent content, SizeValue value)
        {
            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            gsItems[content].Resolution = value;
        }
        /// <summary>
        /// Nastavení metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            AddEventHandler(content, handlerChanged, (item, handler) => item.ResolutionChanged += handler);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            RemoveEventHandler(content, handlerChanged, (item, handler) => item.ResolutionChanged -= handler);
        }

        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <param name="showgrid">výchozí zobrazení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static bool GetShowGrid(IViewContent content, bool showgrid)
        {
            if (content == null)
                return showgrid;

            if (!gsItems.ContainsKey(content))
            {
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));
                gsItems[content].ShowGrid = showgrid;
            }

            return gsItems.ContainsKey(content) ? gsItems[content].ShowGrid : showgrid;
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky.
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowGrid(IViewContent content, bool value)
        {
            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            gsItems[content].ShowGrid = value;
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            AddEventHandler(content, handlerChanged, (item, handler) => item.ShowGridChanged += handler);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            RemoveEventHandler(content, handlerChanged, (item, handler) => item.ShowGridChanged -= handler);
        }
        /// <summary>
        /// Získání hodnoty ShowOrder z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení řazení</param>
        /// <param name="showorder">výchozí zobrazení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit řazení jinak FALSE</returns>
        public static bool GetShowOrder(IViewContent content, bool showorder)
        {
            if (content == null)
                return showorder;

            if (!gsItems.ContainsKey(content))
            {
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));
                gsItems[content].ShowOrder = showorder;
            }

            return gsItems.ContainsKey(content) ? gsItems[content].ShowOrder : showorder;
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení řazení.
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowOrder(IViewContent content, bool value)
        {
            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            gsItems[content].ShowOrder = value;
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení řazení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            AddEventHandler(content, handlerChanged, (item, handler) => item.ShowOrderChanged += handler);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            RemoveEventHandler(content, handlerChanged, (item, handler) => item.ShowOrderChanged -= handler);
        }

        /// <summary>
        /// Získání faktoru zvětšení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání faktoru zvětšení</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public static float GetZoom(IViewContent content) => GetZoom(content, 1);

        /// <summary>
        /// Získání faktoru zvětšení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání faktoru zvětšení</param>
        /// <param name="zoom">Výchozí hodnota zvětšení</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public static float GetZoom(IViewContent content, float zoom)
        {
            if (content == null)
                return zoom;

            if (!gsItems.ContainsKey(content))
            {
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));
                gsItems[content].Zoom = zoom;
            }

            return gsItems[content].Zoom;
        }
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetZoom(IViewContent content, float value)
        {
            if (content == null)
                return;

            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            if (gsItems.ContainsKey(content))
                gsItems[content].Zoom = value;
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            AddEventHandler(content, handlerChanged, (item, handler) => item.ZoomChanged += handler);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            RemoveEventHandler(content, handlerChanged, (item, handler) => item.ZoomChanged -= handler);
        }

        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <param name="showColorOf">Výchozí hodnota podbarvení</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public static bool GetShowColorOf(IViewContent content, bool showColorOf)
        {
            if (content == null)
                return showColorOf;

            if (!gsItems.ContainsKey(content))
            {
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));
                gsItems[content].ShowColorOf = showColorOf;
            }

            return gsItems[content].ShowColorOf;
        }
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public static void SetShowColorOf(IViewContent content, bool value)
        {
            if (content == null)
                return;

            if (!gsItems.ContainsKey(content))
                gsItems.Add(content, new GraphicSettingService.Item(ServiceManager.GraphicSettingService));

            gsItems[content].ShowColorOf = value;
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            AddEventHandler(content, handlerChanged, (item, handler) => item.ShowColorOfChanged += handler);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public static void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            RemoveEventHandler(content, handlerChanged, (item, handler) => item.ShowColorOfChanged -= handler);
        }

        /// <summary>
        /// Uvolnění cach pro daný pohled
        /// </summary>
        /// <param name="content">Pohled</param>
        public static void RemoveItem(IViewContent content)
        {
            if (content == null)
                return;

            if (gsItems.ContainsKey(content))
                gsItems.Remove(content);
        }

        #endregion

        /// <summary>
        /// Zobrazení kontextového menu
        /// </summary>
        /// <param name="selectedobject">Vybrané objekty sestavy</param>
        /// <param name="position">Pozice na stránce, kde se má zobrazit kontextové menu</param>
        public static void ShowContextMenu(object selectedobject, Point position)
        {
            ContextMenuStrip strip = MenuService.CreateContextMenu(selectedobject, new EventArgsContextMenu("/Formation/ContextMenu/SelectedObject"));
            strip?.Show(position);
        }

        /// <summary>
        /// Získání konvertoru
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        internal static object GetConverter(string className)
        {
            if (string.IsNullOrEmpty(className) || className == "System.String")
                return null;

            object o = Assembly.GetExecutingAssembly().CreateInstance(className);
            if (o != null)
                return o;

            Type type = GetCustomType(className) ?? Type.GetType(className);

            if (type != null)
            {
                o = Activator.CreateInstance(type);
                if (o != null)
                    return o;
            }

            return null;
        }

        /// <summary>
        /// Získání speciálního typu dle názvu třídy
        /// </summary>
        /// <param name="className">Název třídy hledaného typu</param>
        /// <returns>Typ třídy</returns>
        static Type GetCustomType(string className)
        {
            switch (className)
            {
                case "System.Drawing.ColorConverter":
                case "Drawing.ColorConverter":
                case "ColorConverter":
                    return typeof(System.Drawing.ColorConverter);
                default:
                    break;
            }

            return null;
        }

        /// <summary>
        /// Indikuje, že je spuštěn Návrhář
        /// </summary>
        public static bool IsDesigner
        {
            get
            {
                Assembly caller;
                try { caller = Assembly.GetEntryAssembly(); }
                catch { return false; }

                return caller != null && caller.GetName().Name.Equals("Gordic.GFE.WinClient");
            }
        }

        /// <summary>
        /// Indikuje, že se jedná o lehkého klienta
        /// </summary>
        public static bool IsLC { get; set; }

        /// <summary>
        /// Generický helper pro aplikaci "all-or-individual" atributů (border, spacing, padding)
        /// </summary>
        /// <param name="attributes">Seznam atributů</param>
        /// <param name="allKey">Klíč pro "all" hodnotu</param>
        /// <param name="leftKey">Klíč pro levou hodnotu</param>
        /// <param name="rightKey">Klíč pro pravou hodnotu</param>
        /// <param name="topKey">Klíč pro horní hodnotu</param>
        /// <param name="bottomKey">Klíč pro dolní hodnotu</param>
        /// <param name="setAll">Akce pro nastavení "all" hodnoty</param>
        /// <param name="setLeft">Akce pro nastavení levé hodnoty</param>
        /// <param name="setRight">Akce pro nastavení pravé hodnoty</param>
        /// <param name="setTop">Akce pro nastavení horní hodnoty</param>
        /// <param name="setBottom">Akce pro nastavení dolní hodnoty</param>
        private static void ApplyBoxAttribute(
            GFEAttrList attributes,
            string allKey,
            string leftKey,
            string rightKey,
            string topKey,
            string bottomKey,
            Action<string> setAll,
            Action<string> setLeft,
            Action<string> setRight,
            Action<string> setTop,
            Action<string> setBottom)
        {
            if (attributes.ContainsKey(allKey))
            {
                setAll(attributes[allKey]);
            }
            else
            {
                if (attributes.ContainsKey(leftKey))
                    setLeft(attributes[leftKey]);
                if (attributes.ContainsKey(rightKey))
                    setRight(attributes[rightKey]);
                if (attributes.ContainsKey(topKey))
                    setTop(attributes[topKey]);
                if (attributes.ContainsKey(bottomKey))
                    setBottom(attributes[bottomKey]);
            }
        }

        /// <summary>
        /// Helper pro aplikaci border width atributů
        /// </summary>
        private static void ApplyBorderWidths(ISurroundable surroundable, GFEAttrList attributes)
        {
            ApplyBoxAttribute(
                attributes,
                "border-width",
                "left-border-width",
                "right-border-width",
                "top-border-width",
                "bottom-border-width",
                value => surroundable.Surround.Width.AllValue = value,
                value => surroundable.Surround.Width.LeftValue = value,
                value => surroundable.Surround.Width.RightValue = value,
                value => surroundable.Surround.Width.TopValue = value,
                value => surroundable.Surround.Width.BottomValue = value);
        }

        /// <summary>
        /// Helper pro aplikaci border color atributů
        /// </summary>
        private static void ApplyBorderColors(ISurroundable surroundable, GFEAttrList attributes)
        {
            ApplyBoxAttribute(
                attributes,
                "border-color",
                "left-border-color",
                "right-border-color",
                "top-border-color",
                "bottom-border-color",
                value =>
                {
                    surroundable.Surround.FrameColor.AllValue = new URComplexColor();
                    surroundable.Surround.FrameColor.AllValue.Initialize(value);
                },
                value =>
                {
                    surroundable.Surround.FrameColor.LeftValue = new URComplexColor();
                    surroundable.Surround.FrameColor.LeftValue.Initialize(value);
                },
                value =>
                {
                    surroundable.Surround.FrameColor.RightValue = new URComplexColor();
                    surroundable.Surround.FrameColor.RightValue.Initialize(value);
                },
                value =>
                {
                    surroundable.Surround.FrameColor.TopValue = new URComplexColor();
                    surroundable.Surround.FrameColor.TopValue.Initialize(value);
                },
                value =>
                {
                    surroundable.Surround.FrameColor.BottomValue = new URComplexColor();
                    surroundable.Surround.FrameColor.BottomValue.Initialize(value);
                });
        }

        /// <summary>
        /// Helper pro aplikaci border style atributů
        /// </summary>
        private static void ApplyBorderStyles(ISurroundable surroundable, GFEAttrList attributes)
        {
            ApplyBoxAttribute(
                attributes,
                "border-style",
                "left-border-style",
                "right-border-style",
                "top-border-style",
                "bottom-border-style",
                value => surroundable.Surround.DashStyle.AllValue = ComplexDashStyle.Parse(value),
                value => surroundable.Surround.DashStyle.LeftValue = ComplexDashStyle.Parse(value),
                value => surroundable.Surround.DashStyle.RightValue = ComplexDashStyle.Parse(value),
                value => surroundable.Surround.DashStyle.TopValue = ComplexDashStyle.Parse(value),
                value => surroundable.Surround.DashStyle.BottomValue = ComplexDashStyle.Parse(value));
        }

        /// <summary>
        /// Helper pro aplikaci spacing atributů
        /// </summary>
        private static void ApplySpacing(ITagComponent component, GFEAttrList attributes)
        {
            ApplyBoxAttribute(
                attributes,
                "spacing",
                "left-spacing",
                "right-spacing",
                "top-spacing",
                "bottom-spacing",
                value => component.Spacing.AllValue = value,
                value => component.Spacing.LeftValue = value,
                value => component.Spacing.RightValue = value,
                value => component.Spacing.TopValue = value,
                value => component.Spacing.BottomValue = value);
        }

        /// <summary>
        /// Helper pro aplikaci padding atributů
        /// </summary>
        private static void ApplyPadding(ITagComponent component, GFEAttrList attributes)
        {
            ApplyBoxAttribute(
                attributes,
                "padding",
                "left-padding",
                "right-padding",
                "top-padding",
                "bottom-padding",
                value => component.Padding.AllValue = value,
                value => component.Padding.LeftValue = value,
                value => component.Padding.RightValue = value,
                value => component.Padding.TopValue = value,
                value => component.Padding.BottomValue = value);
        }

        /// <summary>
        /// aplikace atributu na objekt
        /// </summary>
        /// <param name="com">daný objekt</param>
        /// <param name="attributes">seznam atributů</param>
        public static void ApplayStyle(dynamic com, GFEAttrList attributes)
        {
#pragma warning disable CS0618 // Typ nebo člen je zastaralý.
            ApplayStyleSizable(com as ISizable, attributes);
#pragma warning restore CS0618 // Typ nebo člen je zastaralý.

            bool boolValue = false;
            int intValue = 0;

            if (com is ITextHandler)
            {
                if (attributes.ContainsKey("font-name"))
                    (com as ITextHandler).Text.TextFont = new URTagTextFont().Initialize(attributes["font-name"]);
                else if (attributes.ContainsKey("font-face"))
                    (com as ITextHandler).Text.TextFont = new URTagTextFont().Initialize(attributes["font-face"]);

                #region Font-Style
                if (attributes.ContainsKey("font-bold"))
                    if (Boolean.TryParse(attributes["font-bold"], out boolValue)
                        && boolValue && !(com as ITextHandler).Text.TextFont.Font.Bold)
                        (com as ITextHandler).Text.Bold(true);
                if (attributes.ContainsKey("font-italic"))
                    if (Boolean.TryParse(attributes["font-italic"], out boolValue)
                        && boolValue && !(com as ITextHandler).Text.TextFont.Font.Italic)
                        (com as ITextHandler).Text.Italic();
                if (attributes.ContainsKey("font-strikeout"))
                    if (Boolean.TryParse(attributes["font-strikeout"], out boolValue)
                        && boolValue && !(com as ITextHandler).Text.TextFont.Font.Strikeout)
                        (com as ITextHandler).Text.Strikeout();
                if (attributes.ContainsKey("font-underline"))
                    if (Boolean.TryParse(attributes["font-underline"], out boolValue)
                        && boolValue && !(com as ITextHandler).Text.TextFont.Font.Underline)
                        (com as ITextHandler).Text.Underline();
                #endregion

                if (attributes.ContainsKey("font-size"))
                    (com as ITextHandler).Text.TextFont.Size.Value = attributes["font-size"];
                if (attributes.ContainsKey("font-color"))
                {
                    (com as ITextHandler).Text.TextFont.ForeColor = new URComplexColor();
                    (com as ITextHandler).Text.TextFont.ForeColor.Initialize(attributes["font-color"]);
                }
                if (attributes.ContainsKey("background-color"))
                {
                    (com as ITextHandler).Text.TextFont.BackColor = new URComplexColor();
                    (com as ITextHandler).Text.TextFont.BackColor.Initialize(attributes["background-color"]);
                }

                if (attributes.ContainsKey("format"))
                    (com as ITextHandler).Text.Format = attributes["format"];

                if (attributes.ContainsKey("horizontal-align"))
                {
                    HAlign halign = HAlign.left;
                    if (Enum.TryParse(attributes["horizontal-align"], out halign))
                        (com as ITextHandler).Text.Align.Horizontal = halign;
                }

                if (attributes.ContainsKey("vertical-align"))
                    if (Enum.TryParse(attributes["vertical-align"], out VAlign valign))
                        (com as ITextHandler).Text.Align.Vertical = valign;
                if (attributes.ContainsKey("ellipsis-style"))
                    if (Enum.TryParse(attributes["ellipsis-style"], out ElStyle elStyle))
                        (com as ITextHandler).Text.Ellipsis.Style = elStyle;
                if (attributes.ContainsKey("ellipsis-char"))
                    if (Char.TryParse(attributes["ellipsis-char"], out char chr))
                        (com as ITextHandler).Text.Ellipsis.Char = chr;
                if (attributes.ContainsKey("multiline"))
                    if (Boolean.TryParse(attributes["multiline"], out boolValue))
                        (com as ITextHandler).Text.MultiLine = boolValue;

                if (attributes.ContainsKey("text-orientation"))
                    switch (attributes["text-orientation"].ToLowerInvariant())
                    {
                        case "90":
                            (com as ITextHandler).Text.Orientation = RotateType.Rotate270FlipXY;
                            break;
                        case "180":
                            (com as ITextHandler).Text.Orientation = RotateType.Rotate180FlipXY;
                            break;
                        case "270":
                            (com as ITextHandler).Text.Orientation = RotateType.Rotate90FlipXY;
                            break;
                        default:
                            break;
                    }
            }
            if (com is ISurroundable)
            {
                #region ISurround
                ApplyBorderWidths(com as ISurroundable, attributes);
                ApplyBorderColors(com as ISurroundable, attributes);

                if (attributes.ContainsKey("inside-border"))
                    if (Boolean.TryParse(attributes["inside-border"], out boolValue))
                        (com as ISurroundable).Surround.InsideBorder = boolValue;

                if (attributes.ContainsKey("radius-border"))
                    if (int.TryParse(attributes["radius-border"], out intValue))
                        (com as ISurroundable).Surround.Radius = intValue;
                if (attributes.ContainsKey("corners-border"))
                    if (int.TryParse(attributes["corners-border"], out intValue))
                        (com as ISurroundable).Surround.Corners = (ComplexSurroundCorners)intValue;

                ApplyBorderStyles(com as ISurroundable, attributes);
                #endregion
                #region IInnerSurround
                if (attributes.ContainsKey("diagonalup-border-width"))
                    (com as ISurroundable).InnerSurround.UpWidth.Value = attributes["diagonalup-border-width"];
                if (attributes.ContainsKey("diagonaldown-border-width"))
                    (com as ISurroundable).InnerSurround.DownWidth.Value = attributes["diagonaldown-border-width"];

                if (attributes.ContainsKey("border-color"))
                {
                    (com as ISurroundable).InnerSurround.UpFrameColor = new URComplexColor();
                    (com as ISurroundable).InnerSurround.UpFrameColor.Initialize(attributes["border-color"]);
                    (com as ISurroundable).InnerSurround.DownFrameColor = new URComplexColor();
                    (com as ISurroundable).InnerSurround.DownFrameColor.Initialize(attributes["border-color"]);
                }
                else
                {
                    if (attributes.ContainsKey("diagonalup-border-color"))
                    {
                        (com as ISurroundable).InnerSurround.UpFrameColor = new URComplexColor();
                        (com as ISurroundable).InnerSurround.UpFrameColor.Initialize(attributes["diagonalup-border-color"]);
                    }
                    if (attributes.ContainsKey("diagonaldown-border-color"))
                    {
                        (com as ISurroundable).InnerSurround.DownFrameColor = new URComplexColor();
                        (com as ISurroundable).InnerSurround.DownFrameColor.Initialize(attributes["diagonaldown-border-color"]);
                    }
                }

                if (attributes.ContainsKey("border-style"))
                {
                    (com as ISurroundable).InnerSurround.UpDashStyle.Value = ComplexDashStyle.Parse(attributes["border-style"]);
                    (com as ISurroundable).InnerSurround.DownDashStyle.Value = ComplexDashStyle.Parse(attributes["border-style"]);
                }
                else
                {
                    if (attributes.ContainsKey("diagonalup-border-style"))
                        (com as ISurroundable).InnerSurround.UpDashStyle.Value = ComplexDashStyle.Parse(attributes["diagonalup-border-style"]);
                    if (attributes.ContainsKey("diagonaldown-border-style"))
                        (com as ISurroundable).InnerSurround.DownDashStyle.Value = ComplexDashStyle.Parse(attributes["diagonaldown-border-style"]);
                }
                #endregion
            }

            if (com is ITagComponent)
            {
                ApplySpacing(com as ITagComponent, attributes);
                ApplyPadding(com as ITagComponent, attributes);
            }

            if (com is IBackground && !(com is ITextHandler))
            {
                if (attributes.ContainsKey("background-color"))
                {
                    (com as IBackground).BackColor = new URComplexColor();
                    (com as IBackground).BackColor.Initialize(attributes["background-color"]);
                }
                (com as IBackground).ShowBackground = (com as IBackground).BackColor.Color != Color.Transparent;
            }
            ApplayStyleDrawing(com as IDrawing, attributes);
        }

        /// <summary>
        /// aplikace atributu rozhraní ISizable na objekt
        /// </summary>
        /// <param name="com">daný objekt</param>
        /// <param name="attributes">seznam atributů</param>
        [Obsolete("cte jen atributy stylu, ale width/height se maji davat hlavne na content samotny")]
        public static void ApplayStyleSizable(ISizable com, GFEList attributes)
        {
            if (com != null)
            {
                if (com.Height.Value == null)
                    TagService.SetHeightByAttribute(com, attributes);
                if (com.Width.Value == null)
                    TagService.SetWidthByAttribute(com, attributes);
                if (com is ISizeByContent)
                {
                    (com as ISizeByContent).IsHeightByContent = com.Height.Value == null;
                    (com as ISizeByContent).IsWidthByContent = com.Width.Value == null;
                }
            }
        }

        /// <summary>
        /// aplikace atributu rizhraní IDrawing na objekt
        /// </summary>
        /// <param name="com">daný objekt</param>
        /// <param name="attributes">seznam atributů</param>
        public static void ApplayStyleDrawing(IDrawing com, GFEList attributes)
        {
            if (com != null)
            {
                if (attributes.ContainsKey("fill"))
                    com.Fill = new URComplexColor().Initialize(Convert.ToString(attributes["fill"]));
                if (attributes.ContainsKey("shape"))
                    com.Shape = Convert.ToString(attributes["shape"]);

                com.Gap = attributes.ContainsKey("gap") ? Int32.TryParse(attributes["gap"], out int val) ? val : -1 : 0;
                com.Angle = attributes.ContainsKey("angle") ? int.TryParse(attributes["angle"], out int lval) ? lval : -1 : 0;
                com.Edge = attributes.ContainsKey("edge") ? new URComplexColor().Initialize(attributes["edge"]) : new URComplexColor().Initialize();
            }
        }
        /// <summary>
        /// Kreslení defaultního obrázku
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="rect">Místo na vykreslení</param>
        public static void DrawNoImage(Graphics graphics, RectangleF rect)
        {
            if (graphics != null)
            {
                graphics.DrawLine(new Pen(Color.Red) { Width = 3 }, rect.Left, rect.Top, rect.Left + rect.Width, rect.Top + rect.Height);
                graphics.DrawLine(new Pen(Color.Red) { Width = 3 }, rect.Left, rect.Top + rect.Height, rect.Left + rect.Width, rect.Top);
            }
        }

        /// <summary>
        /// získání indexu koncovky primárního souboru uvedené sestavy <paramref name="content"/>
        /// v seznamu dostupných koncovek
        /// </summary>
        /// <param name="content">pohled, pro který se hledá</param>
        /// <param name="fileFilters">seznam koncovek</param>
        public static int GetAktualFileFilterIndex(IViewContent content, string[] fileFilters)
        {
            if (content != null)
            {
                string extension = Path.GetExtension(content.PrimaryFileName);
                if (!string.IsNullOrEmpty(extension))
                    for (int i = 0; i < fileFilters.Length; ++i)
                        if (fileFilters[i].IndexOf(extension) >= 0)
                            return i + 1;
            }
            return 0;
        }

        /// <summary>
        /// převod seznamu objektů na seznam komponent
        /// </summary>
        /// <param name="list">daný seznam objektů</param>
        /// <returns></returns>
        public static IEnumerable<IComponent> GetComponents(IList<object> list)
        {
            List<IComponent> result = new List<IComponent>();

            foreach (var item in list)
                if (item is IComponent)
                    result.Add(item as IComponent);
                else if (item is List<object>)
                    result.AddRange(GetComponents(item as List<object>));

            return result;
        }

        /// <summary>
        /// indikace zamknutosti objektu
        /// </summary>
        /// <param name="o">objekt ke kontrole</param>
        /// <returns></returns>
        public static bool IsLocked(object o)
        {
            if (!Monitor.TryEnter(o))
                return true;

            Monitor.Exit(o);
            return false;
        }

        internal static void RemoveView(DefaultViewContent content)
        {
            gsItems.Remove(content); //pokud neni, nepadne
        }

        /// <summary>
        /// písmo
        /// </summary>
        public static FontFamily Serif = new FontFamily(System.Drawing.Text.GenericFontFamilies.Serif);
        /// <summary>
        /// písmo
        /// </summary>
        public static FontFamily SansSerif = new FontFamily(System.Drawing.Text.GenericFontFamilies.SansSerif);
        /// <summary>
        /// písmo
        /// </summary>
        public static FontFamily Monospace = new FontFamily(System.Drawing.Text.GenericFontFamilies.Monospace);

        static readonly ConcurrentDictionary<string, CachPaddingItem> cachPItem = new ConcurrentDictionary<string, CachPaddingItem>();
        static readonly ConcurrentDictionary<string, CachPaddingItem> cachFItem = new ConcurrentDictionary<string, CachPaddingItem>();

        /// <summary>
        /// nastavení paddingu dle hodnoty
        /// </summary>
        /// <param name="value"></param>
        /// <param name="_value"></param>
        /// <param name="_pixels"></param>
        /// <param name="_scale"></param>
        internal static void PaddingSetByRule(string value, ref string _value, ref float _pixels, ref ScaleUni _scale)
        {
            if (cachPItem.ContainsKey(value))
            {
                var itm = cachPItem[value];

                _value = itm.Value;
                _pixels = itm.Pixels;
                _scale = itm.Scale;
            }
            else
            {
                _value = value;

                //Nastavení hodnoty dle pravidla:
                //celé kladné číslo v rozmezí od 0 do 25, 
                //které udává přesnou velikost v twipech  
                //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
                //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
                //Zkusíme převést hodnotu
                if (!float.TryParse(_value, out float _unsp))
                    _value = null;
                else
                {
                    if (_unsp < 0)
                        _unsp = 0;

                    //pokud hodnota je větší než 25, pak se převede na twipy
                    if (_unsp <= 25)
                        _value = Convert.ToString(_unsp);
                    else
                        _value = Convert.ToString((_unsp - 1) * 10) + "tw";

                    if (_unsp > 1)
                        _unsp = (_unsp - 1) * 10;

                    _pixels = _unsp * TWIPS_TO_PIXELS;
                }

                _scale = ScaleUni.unspec;

                cachPItem.GetOrAdd(value, new CachPaddingItem(_value, _pixels, _scale));
            }
        }

        static readonly int[] fontSizes = new int[] { 0, 141, 179, 213, 250, 325, 433, 650, 831 };
        internal static void FontSizeSetByRule(string value, ref string _value, ref ScaleUni _scale, ref float _point)
        {

            if (cachFItem.ContainsKey(value))
            {
                var itm = cachFItem[value];

                _value = itm.Value;
                _point = itm.Pixels;
                _scale = itm.Scale;
            }
            else if (!string.IsNullOrEmpty(value))
            {
                bool isValue = false;

                FontSizeSetByRule(value, ref _value, ref _scale, ref _point, ref isValue);

                if (!isValue)
                {
                    // nastavení hodnoty dle pravidla 1-8, *npsize
                    // pokusíme se převést hodnotu
                    if (!int.TryParse(value, out int _unsp))
                        FontSizeSetByRule("2", ref _value, ref _scale, ref _point);
                    //Value = "2";
                    else
                    {
                        if (_unsp < 0)
                            _unsp = 1;

                        if (_unsp > 8)
                            _unsp = 8;

                        float _fValue = fontSizes[_unsp] * TWIPS_TO_POINTS;

                        _point = (float)Math.Round(_fValue, 2);
                        _scale = ScaleUni.unspec;
                    }
                }
                cachFItem.GetOrAdd(value, new CachPaddingItem(_value, _point, _scale));
            }
        }

        static void FontSizeSetByRule(string value, ref string _value, ref ScaleUni _scale, ref float _point, ref bool isValue)
        {
            if (value.EndsWith("mm"))
            {
                _scale = ScaleUni.mm;
                _value = value;


                // pokusíme se převést hodnotu na pointy
                if (float.TryParse(value.Replace("mm", "").Replace(".", ","), out float _mm))
                    _point = (float)Math.Round((_mm * MM_TO_POINTS), 2);
                isValue = true;
            }
            else if (value.EndsWith("px"))
            {
                _scale = ScaleUni.px;
                _value = value;


                // pokusíme se převést hodnotu na pointy
                if (float.TryParse(value.Replace("px", "").Replace(".", ","), out float _px))
                    _point = (float)Math.Round(_px * PIXELS_TO_POINTS, 2);
                isValue = true;
            }
            else if (value.EndsWith("pt"))
            {
                _scale = ScaleUni.pt;
                _value = value;


                // pokusíme se převést hodnotu na pointy
                if (float.TryParse(value.Replace("pt", "").Replace(".", ","), out float _pt))
                    _point = (float)Math.Round(_pt, 2);
                isValue = true;
            }
            else if (value.EndsWith("tw"))
            {
                _scale = ScaleUni.tw;
                _value = value;


                // pokusíme se převést hodnotu na pointy
                if (float.TryParse(value.Replace("tw", "").Replace(".", ","), out float _tw))
                    _point = (float)Math.Round(_tw * TWIPS_TO_POINTS, 2);
                isValue = true;
            }
        }

        public static string GetParametr(string key, Dictionary<string, string> attributes) => attributes != null && attributes.ContainsKey(key) ? attributes[key] : string.Empty;

        public static void AddParametr(string key, string value, Dictionary<string, string> attributes)
        {
            if (attributes != null && !key.IsNullOrEmpty())
            {
                if (attributes.ContainsKey(key))
                    attributes.Remove(key);
                if (!value.IsNullOrEmpty())
                    attributes.Add(key, value);
            }
        }

        /// <summary>
        /// Zjištění, zda region je validní dle struktury či nikoliv
        /// </summary>
        /// <param name="regionFullName">Úplný název regionu</param>
        /// <param name="dataFullName">Úplný název objektu</param>
        /// <param name="isRegion">TRUE - se jedná o kontrolu regionu</param>
        /// <returns></returns>
        public static bool IsValidateByStructure(string dataFullName, string regionFullName, bool isRegion)
        {
            if (regionFullName.IsNullOrEmpty() || dataFullName.IsNullOrEmpty())
                return true;

            // u regionů je zapotřebí kontrola úrovně
            int itemLevel = isRegion ? dataFullName.Split('.').Length : 0;
            int regionLevel = isRegion ? regionFullName.Split('.').Length : 0;

            // získáme region položky
            string[] arr = dataFullName.Split('.');
            string itemRegion = isRegion ? dataFullName : string.Join(".", arr.Take(arr.Length - 1).ToArray());
            return ("ROOT".Equals(itemRegion.ToUpper())
                || regionFullName.IndexOf(itemRegion + ".") != -1
                || regionFullName.Equals(itemRegion)
                // jedná se o různé úrvně
                // - například dva regiony stejné úrpvně v nadřazeném regionu - je správně
                // - ale dva regiony stejné úrovně, kde jeden je vnořen do druhého - je špatné
                || (itemLevel > regionLevel && itemRegion.IndexOf(regionFullName + ".") != -1));
        }

        /// <summary>
        /// Analýza řetězce BARCODE
        /// </summary>
        /// <param name="t">Řetězec prezentující hodnotu BARCODE</param>
        /// <returns>Typ BARCODE</returns>
        /// <exception cref="System.ArgumentOutOfRangeException"></exception>
        public static BarcodeTypeEnum ParseBarcodeString(string t)
        {
            switch (t)
            {
                case "code39": return BarcodeTypeEnum.BARCODE_TYPE_CODE39;
                case "qrcode": return BarcodeTypeEnum.BARCODE_TYPE_QRCODE;
                case "microqr": return BarcodeTypeEnum.BARCODE_TYPE_MICROQR;
                case "pdf417": return BarcodeTypeEnum.BARCODE_TYPE_PDF417;
                case "ean": return BarcodeTypeEnum.BARCODE_TYPE_EANX;
                case "ean14": return BarcodeTypeEnum.BARCODE_TYPE_EAN14;
                case "ean128": return BarcodeTypeEnum.BARCODE_TYPE_EAN128;
                case "isbn": return BarcodeTypeEnum.BARCODE_TYPE_ISBNX;
            }
            if (Int32.TryParse(t, out var ires))
                return (BarcodeTypeEnum)ires;

            try
            {
                return (BarcodeTypeEnum)Enum.Parse(typeof(BarcodeTypeEnum), t);
            }
            catch (Exception)
            {
                throw new System.ArgumentOutOfRangeException("barcode-type");
            }
        }

        /// <summary>
        /// Analýza řetězce BARCODE
        /// </summary>
        /// <param name="t">Řetězec prezentující hodnotu BARCODE</param>
        /// <returns>Typ BARCODE</returns>
        /// <exception cref="System.ArgumentOutOfRangeException"></exception>
        public static string ParseStringBarcode(BarcodeTypeEnum t)
        {
            switch (t)
            {
                case BarcodeTypeEnum.BARCODE_TYPE_CODE39: return "code39";
                case BarcodeTypeEnum.BARCODE_TYPE_QRCODE: return "qrcode";
                case BarcodeTypeEnum.BARCODE_TYPE_MICROQR: return "microqr";
                case BarcodeTypeEnum.BARCODE_TYPE_PDF417: return "pdf417";
                case BarcodeTypeEnum.BARCODE_TYPE_EANX: return "ean";
                case BarcodeTypeEnum.BARCODE_TYPE_EAN14: return "ean14";
                case BarcodeTypeEnum.BARCODE_TYPE_EAN128: return "ean128";
                case BarcodeTypeEnum.BARCODE_TYPE_ISBNX: return "isbn";
            }
            return Enum.GetName(t.GetType(), t);
        }
        /// <summary>
        /// Nastavení hodnot BARCODE dle řetězcové prezentace
        /// </summary>
        /// <param name="typeRaw"></param>
        /// <param name="type">Typ barcode</param>
        /// <param name="o1">První hodnota</param>
        /// <param name="o2">Druhá hodnota</param>
        /// <param name="o3">Třetí hodnota</param>
        public static void SetBarcodeValues(string typeRaw, out BarcodeTypeEnum type, out int o1, out int o2, out int o3)
        {
            var typs = typeRaw.Split(',');
            type = ParseBarcodeString(typs[0]);
            o1 = typs.Length > 1 ? Int32.Parse(typs[1]) : 0;
            o2 = typs.Length > 2 ? Int32.Parse(typs[2]) : 0;
            o3 = typs.Length > 3 ? Int32.Parse(typs[3]) : 0;
        }

        /// <summary>
        /// Kolekce standardních ohdnot BarcodeType
        /// </summary>
        /// <returns></returns>
        public static ICollection GetStandardValuesCollectionBarcodeTypes()
        {
            List<BarcodeTypeEnum> values = Enum.GetValues(typeof(BarcodeTypeEnum)).Cast<BarcodeTypeEnum>().ToList();
            values.Sort(new BarcodeTypesComparer());
            return values;
        }

        /// <summary>
        /// Vykreslení čarového kódu
        /// </summary>
        /// <param name="c">Objekt s informaci o čarovém kódu</param>
        /// <param name="children">Vnořené objekty daného objektu</param>
        /// <param name="typeRaw">Typ čarového kódu</param>
        /// <param name="attrList">Atributy objektu kreslení</param>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="bounds">Ohraničení objektu</param>
        public static void DrawBarcode(IBackground c, IEnumerable<ITagComponent> children, string typeRaw, GFEAttrList attrList, Graphics graphics, RectangleF bounds)
        {
            string text = "";
            foreach (var child in children)
                if (child is IEditableContent ec)
                    text += ec.FormattedText;
                else
                    text += (child as ITextHandler).Text.Text;

            if (text.Length > 0)
            {
                CommonService.SetBarcodeValues(typeRaw, out BarcodeTypeEnum type, out int o1, out int o2, out int o3);

                using (var help = new NativePaintHelper(c, attrList))
                {
                    using (var i = Gordic.Report.Implementation.Charting.CreateBarcode(
                        text,
                        (int)bounds.Width, (int)bounds.Height,
                        (int)type, o1, o2, o3,
                        help.Attributes, help))
                    {
                        var l_oldIM = graphics.InterpolationMode;
                        graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.NearestNeighbor;
                        //https://stackoverflow.com/questions/50419325/drawimage-resized-image-too-small
                        var l_oldOM = graphics.PixelOffsetMode;
                        graphics.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;

                        graphics.DrawImage(i, bounds);
                        graphics.InterpolationMode = l_oldIM;
                        graphics.PixelOffsetMode = l_oldOM;
                    }
                }
            }
#if DEBUG
            //graphics.DrawRectangles(Pens.Red, new [] { bounds });
            //graphics.DrawRectangles(Pens.Blue, new[] { ContentBounds });
#endif
            //graphics.DrawString(text, SystemFonts.DefaultFont, Brushes.Black, ContentBounds);
        }
    }

    class BarcodeTypesComparer : IComparer<BarcodeTypeEnum>
    {
        readonly static List<BarcodeTypeEnum> defaultValues = new List<BarcodeTypeEnum>()
            {
                BarcodeTypeEnum.BARCODE_TYPE_CODE39,
                BarcodeTypeEnum.BARCODE_TYPE_QRCODE,
                BarcodeTypeEnum.BARCODE_TYPE_MICROQR,
                BarcodeTypeEnum.BARCODE_TYPE_PDF417,
                BarcodeTypeEnum.BARCODE_TYPE_EANX,
                BarcodeTypeEnum.BARCODE_TYPE_EAN14,
                BarcodeTypeEnum.BARCODE_TYPE_EAN128,
                BarcodeTypeEnum.BARCODE_TYPE_ISBNX
            };

        /// <summary>
        /// Porovnání typů
        /// První je výčet výchozích hodnot seřazen textově
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public int Compare(BarcodeTypeEnum x, BarcodeTypeEnum y)
        {
            // pokud X a Y oba jsou v seznamu nebo oba mimo sesznam - řádíme dle textu
            if (defaultValues.Contains(y) && defaultValues.Contains(x)
                || !defaultValues.Contains(y) && !defaultValues.Contains(x))
                return CommonService.ParseStringBarcode(x).CompareTo(CommonService.ParseStringBarcode(y));
            // jinak řadíme dle příslušnosti seznamu
            return defaultValues.Contains(y).CompareTo(defaultValues.Contains(x));
        }
    }

}
