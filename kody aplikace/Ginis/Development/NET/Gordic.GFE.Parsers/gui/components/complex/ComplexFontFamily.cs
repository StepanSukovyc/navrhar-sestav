//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexFontFamily.cs                  </Name>
//    <Description> Komplexní třída názvu písma                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design.Serialization;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.General;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// třída pro práci s písmem
    /// </summary>
    public interface IComplexFontFamily
    {
        /// <summary>
        /// písmo
        /// </summary>
        FontFamily FontFamily { get; set; }
        /// <summary>
        /// název písma
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// indikuje, že family inicializované dle uvedeného názvu
        /// </summary>
        /// <param name="fontfamily">název family</param>
        /// <returns></returns>
        bool IsInitialized(string fontfamily);

        /// <summary>
        /// Inicializace dle názvu písma
        /// </summary>
        /// <param name="fontName">Název písma</param>
        /// <returns></returns>
        IComplexFontFamily Initialize(string fontName);
    }

    /// <summary>
    /// Komplexní třída názvu písma
    /// </summary>
    [TypeConverter(typeof(ComplexFontFamilyConverter))]
    public class ComplexFontFamily : IComplexFontFamily, IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (_cacheFontFamily != null)
                {
                    _cacheFontFamily.Dispose();
                    _cacheFontFamily = null;
                }
        }
        ~ComplexFontFamily() { Dispose(false); }
        #endregion

        #region IComplexFontFamily
        /// <summary>
        /// indikuje, že family inicializované dle uvedeného názvu
        /// </summary>
        /// <param name="fontfamily">název family</param>
        /// <returns></returns>
        public bool IsInitialized(string fontfamily)
        {
            return !string.IsNullOrEmpty(Fontname) && Fontname == fontfamily;
        }

        /// <summary>
        /// vnitřní pomocná proměnná
        /// </summary>
        protected virtual string Fontname { get; set; }
        /// <summary>
        /// písmo
        /// </summary>
        [Browsable(false)]
        public FontFamily FontFamily
        {
            get
            {
                if (!IsInicialized())
                    Load();

                return _cacheFontFamily;
            }
            set { SetName(value.Name); }
        }

        /// <summary>
        /// Název
        /// </summary>
        [Browsable(false)]
        public string Name { get { return Fontname; } set { Fontname = value; } }
        #endregion

        FontFamily _cacheFontFamily;
        readonly object syncRoot = new object();

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public ComplexFontFamily() { }

        /// <summary>
        /// Inicializace dle názvu písma
        /// </summary>
        /// <param name="fontName">Název písma</param>
        /// <returns></returns>
        public virtual IComplexFontFamily Initialize(string fontName)
        {
            if (string.IsNullOrEmpty(fontName))
                Fontname = "times";
            else
                Fontname = fontName;
            return this;
        }

        /// <exclude/>
        public override string ToString() { return Name; }

        /// <summary>
        /// Přetížení porovnání objektu s komponentou dané třídy
        /// </summary>
        /// <param name="obj">Objekt, který se porovnává s daným</param>
        /// <returns>Pokud jsou stejné pak se vrací TRUE jinak FALSE</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is IComplexFontFamily iCF))
                return false;

            if (this.Name != null)
                return this.Name.Equals(iCF.Name, StringComparison.InvariantCultureIgnoreCase);

            return iCF.Name == null;
        }

        /// <summary>
        /// Přetížení dané metody
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() { return base.GetHashCode(); }
        
        bool IsInicialized()
        {
            if (_cacheFontFamily == null)
                return false;
            if (_cacheFontFamily.Name == Fontname)
                return true;

            if (_cacheFontFamily.Name == CommonService.Serif.Name && Fontname == "times")
                return true;
            if (_cacheFontFamily.Name == CommonService.SansSerif.Name && Fontname == "arial")
                return true;
            if (_cacheFontFamily.Name == CommonService.Monospace.Name && Fontname == "courier")
                return true;

            return false;
        }

        void Load()
        {
            if (string.IsNullOrEmpty(Fontname))
                _cacheFontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Serif);
            else if (Fontname.Equals("times", StringComparison.InvariantCultureIgnoreCase))
                _cacheFontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Serif);
            else if (Fontname.Equals("arial", StringComparison.InvariantCultureIgnoreCase))
                _cacheFontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.SansSerif);
            else if (Fontname.Equals("courier", StringComparison.InvariantCultureIgnoreCase))
                _cacheFontFamily = new FontFamily(System.Drawing.Text.GenericFontFamilies.Monospace);
            else
                _cacheFontFamily = new FontFamily(Fontname);
        }
        /// <summary>
        /// Název dle FontFamily
        /// </summary>
        /// <returns></returns>
        void SetName(string value)
        {
            lock (syncRoot)
                if (value == CommonService.Serif.Name)
                    Fontname = "times";
                else if (value == CommonService.SansSerif.Name
                    || value.Equals("arial", StringComparison.InvariantCultureIgnoreCase))
                    Fontname = "arial";
                else if (value == CommonService.Monospace.Name)
                    Fontname = "courier";
                else
                    Fontname = value;
        }
    }

    /// <summary>
    /// Komplexní třída názvu písma
    /// </summary>
    [TypeConverter(typeof(ComplexFontFamilyConverter))]
    public class URComplexFontFamily : ComplexFontFamily
    {
        readonly UndoRedo<string> _fontname = new UndoRedo<string>();
        /// <summary>
        /// pomocná proměnna
        /// </summary>
        protected override string Fontname
        {
            get { return _fontname.Value; }
            set { _fontname.Value = value; }
        }
    }

    /// <summary>
    /// konverter pro práci s písmem
    /// </summary>
    [ComVisible(false)]
    public class ComplexFontFamilyConverter : EnumConverter
    {
        static StandardValuesCollection svc = null;
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="type">Typ</param>
        public ComplexFontFamilyConverter(Type type)
            : base(type)
        {
        }

        /// <summary>
        /// Converts the given object to the type of this converter, 
        /// using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <param name="culture">The CultureInfo to use as the current culture.</param>
        /// <param name="value">The Object to convert.</param>
        /// <returns>An Object that represents the converted value.</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
        {
            if (!UndoRedoService.IsTransactionStarted)
                UndoRedoService.StartTransaction(GResources.GetResourceText(29450349)); //RC 29450349 : změna písma

            var result = value is string ? new URComplexFontFamily().Initialize(value as string) : base.ConvertFrom(context, culture, value);
            ThreadService.WaitForLockers();

            return result;
        }

        /// <summary>
        /// Returns whether the collection of standard 
        /// values returned from GetStandardValues is an exclusive list of possible values, 
        /// using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</param>
        /// <returns>
        /// true if the TypeConverter.StandardValuesCollection returned 
        /// from GetStandardValues is an exhaustive list of possible values; 
        /// false if other values are possible.
        /// </returns>
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) { return false; }
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) { return true; }

        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            if (svc == null)
                svc = new StandardValuesCollection(ListOfFonts.Fonts);
            return svc;
        }

        /// <summary>
        /// Converts the given value object to the specified type, 
        /// using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</param>
        /// <param name="culture">A CultureInfo. If null is passed, the current culture is assumed.</param>
        /// <param name="value">The Object to convert.</param>
        /// <param name="destinationType">The Type to convert the value parameter to.</param>
        /// <returns>An Object that represents the converted value.</returns>
        public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
        {
            if (destinationType == typeof(InstanceDescriptor))
            {
                var ctor = typeof(URComplexFontFamily).GetConstructor(new Type[] { value.GetType() });
                return new InstanceDescriptor(ctor, new object[] { value });
            }

            if (destinationType == typeof(string))
                if (value is string)
                    // případ, kdy se má vrátit textová prezentace FontStyleEnum
                    return context == null ? ConvertFrom(context, culture, value) : value;
                else
                    if (value is URComplexFontFamily)
                        return Convert.ToString(value);

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Seznam dostupných písem
    /// </summary>
    public class ListOfFonts
    {
        static string[] fonts; 
        /// <summary>
        /// Seznam dostupných písem
        /// </summary>
        public static string[] Fonts
        {
            get
            {
                if (fonts == null)
                {
                    List<string> list = new List<string>();
                    list.AddRange(CommonService.Fonts.Values.ToList());

                    InstalledFontCollection ifc = new InstalledFontCollection();
                    foreach (FontFamily item in ifc.Families)
                        if (item.IsStyleAvailable(FontStyle.Regular)
                            && item.IsStyleAvailable(FontStyle.Bold)
                            && item.IsStyleAvailable(FontStyle.Italic))
                            list.Add(item.Name);

                    fonts = new string[list.Count];
                    list.CopyTo(fonts, 0);
                }
                return fonts;
            }
        }
    }

    /// <summary>
    /// Seznam předdefinovaných stylů písma
    /// </summary>
    public static class ListOfFontStyles
    {
        static Dictionary<FontStyle, string> styles
            = new Dictionary<FontStyle, string>()
            {
                {FontStyle.Bold, GResources.GetResourceText(29450350)}, //RC 29450350 : tučné
                {FontStyle.Italic, GResources.GetResourceText(29450351)}, //RC 29450351 : kurzíva
                {FontStyle.Regular, GResources.GetResourceText(29450352)},             //RC 29450352 : obyčejné
                {FontStyle.Strikeout, GResources.GetResourceText(29450353)}, //RC 29450353 : přeškrtnuté
                {FontStyle.Underline, GResources.GetResourceText(29450354)},  //RC 29450354 : podtržené
                {FontStyle.Bold | FontStyle.Italic, GResources.GetResourceText(29450355)}, //RC 29450355 : tučná kurzíva
                {FontStyle.Bold | FontStyle.Strikeout, GResources.GetResourceText(29450356)}, //RC 29450356 : přeškrtnuté tučné
                {FontStyle.Bold | FontStyle.Underline, GResources.GetResourceText(29450357)}, //RC 29450357 : podtržené tučné

                {FontStyle.Italic | FontStyle.Strikeout, GResources.GetResourceText(29450358)}, //RC 29450358 : přeškrtnutá kurzíva
                {FontStyle.Italic | FontStyle.Underline, GResources.GetResourceText(29450359)}, //RC 29450359 : podtržená kurzíva

                {FontStyle.Strikeout | FontStyle.Underline, GResources.GetResourceText(29450360)}, //RC 29450360 : přeškrtnuté podtržené

                {FontStyle.Bold | FontStyle.Italic | FontStyle.Strikeout, GResources.GetResourceText(29450361)}, //RC 29450361 : přeškrtnutá tučná kurzíva
                {FontStyle.Bold | FontStyle.Italic | FontStyle.Underline, GResources.GetResourceText(29450362)}, //RC 29450362 : podtržená tučná kurzíva
                {FontStyle.Bold | FontStyle.Strikeout | FontStyle.Underline, GResources.GetResourceText(29450363)}, //RC 29450363 : přeškrtnuté podtržené tučné

                {FontStyle.Italic | FontStyle.Strikeout | FontStyle.Underline, GResources.GetResourceText(29450364)}, //RC 29450364 : přeškrtnutá podtržená kurzíva

                {FontStyle.Bold | FontStyle.Italic | FontStyle.Strikeout | FontStyle.Underline, GResources.GetResourceText(29450365)} //RC 29450365 : přeškrtnutá podtržená tučná kurzíva
            };

        /// <summary>
        /// Seznam předdefinovaných stylů písma
        /// </summary>
        public static List<KeyValuePair<FontStyle, string>> StylesList { get { return styles.ToList(); } }

        /// <summary>
        /// Styly
        /// </summary>
        public static Dictionary<FontStyle, string> Styles { get { return styles; } }
    }
}
