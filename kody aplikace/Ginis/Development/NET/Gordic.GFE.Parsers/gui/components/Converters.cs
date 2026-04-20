//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Converters.cs                            </Name>
//    <Description> Dostupné konvertory                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design.Serialization;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.Runtime.InteropServices;
using System.Globalization;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Konverter formátu stránky
    /// </summary>
    [ComVisible(false)]
    public class PageFormatConverter : StringConverter
    {
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            string[] list = ListOfFormats.Formats;
            Array.Sort(list);

            return new StandardValuesCollection(list);
        }
    }

    /// <summary>
    /// Konverze mezí klasickými Bollean hodnotami a možnýmy hodnotami {'ano', 'ne'}.
    /// </summary>
    [ComVisible(false)]
    public class BooleanTypeConverter : BooleanConverter
    {
        /// <summary>
        /// Zjištění, jestli vstupní parametr prezentuje výchozí hoídnotu
        /// </summary>
        /// <param name="value">Analyzovaný objekt</param>
        /// <returns>TRUE - pokud objektu vstupníhoparametru prezentuje výchozí hodnotu, jinak FALSE</returns>
        public static bool IsDefault(object value)
        {
            if (value is string vstring)
                return vstring.ToLowerInvariant().Equals("ne") || vstring.ToLowerInvariant().Equals("false");
            if (value is bool boolean)
                return boolean;
            return false;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch ((value as string).ToLowerInvariant())
            {
                case "ano": //RC 29450373 : ano
                case "true":
                    return true;
                default:
                    return false;
            }
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
            if (value is bool boolean)
                return boolean ? GResources.GetResourceText(29450373) : GResources.GetResourceText(29450374);

            if (value is string)
                switch ((value as string).ToLowerInvariant())
                {
                    case "true":
                    case "ano":
                        return "true";
                    default:
                        return "false";
                }

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konverze pozic rohů.
    /// </summary>
    [ComVisible(false)]
    public class CornerPositionTypeConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public CornerPositionTypeConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "levý-horní":
                    return CornerPositionType.LeftTop;
                case "pravý-horní":
                    return CornerPositionType.RightTop;
                case "levý-dolní":
                    return CornerPositionType.LeftBottom;
                default:
                    return CornerPositionType.RightBottom;
            }
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
            if (value is CornerPositionType)
                switch ((CornerPositionType)value)
                {
                    case CornerPositionType.LeftTop:
                        return "levý-horní";
                    case CornerPositionType.RightTop:
                        return "pravý-horní";
                    case CornerPositionType.LeftBottom:
                        return "levý-dolní";
                    default:
                        return "pravý-dolní";
                }

            if (value is string && destinationType == typeof(string))
                return value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konverze typu obsahu
    /// </summary>
    [ComVisible(false)]
    public class ComponentTypeTypeConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public ComponentTypeTypeConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            string _value = value as string;
            return "value-of".Equals(_value) ? ComponentType.valueof : (ComponentType)Enum.Parse(typeof(ComponentType), _value);
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
            if (value is ComponentType)
                switch ((ComponentType)value)
                {
                    case ComponentType.addbuttonarea:
                    case ComponentType.attachment:
                    case ComponentType.barcode:
                    case ComponentType.button:
                    case ComponentType.chart:
                    case ComponentType.comment:
                    case ComponentType.contentp:
                    case ComponentType.drawing:
                    case ComponentType.grid:
                    case ComponentType.group:
                    case ComponentType.image:
                    case ComponentType.imagelink:
                    case ComponentType.imageof:
                    case ComponentType.none:
                    case ComponentType.option:
                    case ComponentType.page:
                    case ComponentType.part:
                    case ComponentType.region:
                    case ComponentType.select:
                    case ComponentType.signature:
                    case ComponentType.table:
                    case ComponentType.text:
                    case ComponentType.textbox:
                    case ComponentType.variable:
                        return (string)value;
                    default:
                        return "value-of";
                }

            if (value is string && destinationType == typeof(string))
                return value;

            return base.ConvertTo(context, culture, value, destinationType);
        }

        /// <summary>
        /// vlastní konverze
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public ComponentType SConvertFrom(string value)
        {
            string _value = value as string;
            return "value-of".Equals(_value) ? ComponentType.valueof : (ComponentType)Enum.Parse(typeof(ComponentType), _value);
        }
    }

    /// <summary>
    /// Konverze orientace.
    /// </summary>
    [ComVisible(false)]
    public class RotateTypeConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public RotateTypeConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "90°":
                    return RotateType.Rotate90FlipXY;
                case "180°":
                    return RotateType.Rotate180FlipXY;
                case "270°":
                    return RotateType.Rotate270FlipXY;
                default:
                    return RotateType.RotateNoneFlipNone;
            }
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
            if (value is RotateType)
                switch ((RotateType)value)
                {
                    case RotateType.Rotate90FlipXY:
                        return "90°";
                    case RotateType.Rotate180FlipXY:
                        return "180°";
                    case RotateType.Rotate270FlipXY:
                        return "270°";
                    default:
                        return "0°";
                }

            if (value is string && destinationType == typeof(string))
                return value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konvertor horizontálního zarovnání
    /// </summary>
    [ComVisible(false)]
    public class HorizontalAlignConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public HorizontalAlignConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "vlevo":
                    return HAlign.left;
                case "vpravo":
                    return HAlign.right;
                case "na střed":
                    return HAlign.center;
                default:
                    return HAlign.justify;
            }
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
            if (value is HAlign)
                switch ((HAlign)value)
                {
                    case HAlign.left:
                        return GResources.GetResourceText(29450375); //RC 29450375 : vlevo
                    case HAlign.right:
                        return GResources.GetResourceText(29450376); //RC 29450376 : vpravo
                    case HAlign.center:
                        return GResources.GetResourceText(29450377); //RC 29450377 : na střed
                    default:
                        return GResources.GetResourceText(29450378); //RC 29450378 : do bloku
                }

            if (value is string && destinationType == typeof(string))
                // případ, kdy se má vrátit textová prezentace FontStyleEnum
                return context == null ? ConvertFrom(context, culture, value) : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konvertor horizontálního zarovnání
    /// </summary>
    [ComVisible(false)]
    public class VerticalAlignConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public VerticalAlignConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "dolů":
                    return VAlign.bottom;
                case "na střed":
                    return VAlign.center;
                default:
                    return VAlign.top;
            }
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
            if (value is VAlign)
                switch ((VAlign)value)
                {
                    case VAlign.bottom:
                        return GResources.GetResourceText(29450379); //RC 29450379 : dolů
                    case VAlign.center:
                        return GResources.GetResourceText(29450377); //RC 29450377 : na střed
                    default:
                        return GResources.GetResourceText(29450380); //RC 29450380 : nahoru
                }

            if (value is string && destinationType == typeof(string))
                // případ, kdy se má vrátit textová prezentace FontStyleEnum
                return context == null ? ConvertFrom(context, culture, value) : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konvertor horizontálního zarovnání
    /// </summary>
    [ComVisible(false)]
    public class FitTextConverter : EnumConverter
    {
        /// <summary>
        /// Zjištění, jestli vstupní parametr prezentuje výchozí hoídnotu
        /// </summary>
        /// <param name="value">Analyzovaný objekt</param>
        /// <returns>TRUE - pokud objektu vstupníhoparametru prezentuje výchozí hodnotu, jinak FALSE</returns>
        public static bool IsDefault(object value)
        {
            if (value is FitText text && text == FitText.none)
                return true;
            if (value is string)
                return value.Equals("none") || value.Equals("žádné");

            return false;
        }
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public FitTextConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "grow":
                case "zvětšit":
                    return FitText.grow;
                case "shrink":
                case "zmenšit":
                    return FitText.shrink;
                case "all":
                case "obojí":
                    return FitText.all;
                default:
                    return FitText.none;
            }
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
            if (value is FitText align)
                switch (align)
                {
                    case FitText.all:
                        return culture == CultureInfo.InvariantCulture ? "all" : "obojí";
                    case FitText.shrink:
                        return culture == CultureInfo.InvariantCulture ? "shrink" : "zmenšit";
                    case FitText.grow:
                        return culture == CultureInfo.InvariantCulture ? "grow" : "zvětšit";
                    default:
                        return culture == CultureInfo.InvariantCulture ? "none" : "žádné";
                }

            if (value is string && destinationType == typeof(string))
                // případ, kdy se má vrátit textová prezentace FontStyleEnum
                return context == null ? ConvertFrom(context, culture, value) : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// převod řetězce na SizeValue veličinu
    /// </summary>
    [ComVisible(false)]
    public class _StringSizeValueConverter : EnumConverter
    {
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context) =>
            CommonService.SizeValueComboBox.Count != 0
            ? new StandardValuesCollection(CommonService.SizeValueComboBox.Values.ToArray())
            : new StandardValuesCollection(new List<string>());

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
            if (value is string || value == null)
                return string.IsNullOrEmpty(value as string) && CommonService.SizeValueComboBox.Count != 0
                    ? CommonService.SizeValueComboBox.First().Value
                    : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }

        /// <summary>
        /// Converts the given object to the type of this converter, 
        /// using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <param name="culture">The CultureInfo to use as the current culture.</param>
        /// <param name="value">The Object to convert.</param>
        /// <returns>An Object that represents the converted value.</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value) =>
            value is string ? value as string : base.ConvertFrom(context, culture, value);

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public _StringSizeValueConverter(Type type)
            : base(type)
        {
        }
    }

    /// <summary>
    /// převod řetězce na SizeValue veličinu
    /// </summary>
    [ComVisible(false)]
    public class BarcodeTypeConverter : EnumConverter
    {
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context) =>
            new StandardValuesCollection(CommonService.GetStandardValuesCollectionBarcodeTypes());

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
            if (value == null)
                return Enum.GetValues(typeof(BarcodeTypeEnum)).GetValue(0);

            if (destinationType.Name.Equals("String"))
                return CommonService.ParseStringBarcode((BarcodeTypeEnum)value);

            return CommonService.ParseBarcodeString(value as string);
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
            if (value is string)
                return CommonService.ParseBarcodeString(value as string);

            return CommonService.ParseStringBarcode((BarcodeTypeEnum)value);
        }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public BarcodeTypeConverter(Type type)
            : base(type)
        {
        }
    }

    /// <summary>
    /// Konverter hodnoty velikostí
    /// </summary>
    [ComVisible(false)]
    public class SizeValueConverter : StringConverter
    {
        /// <summary>
        /// Returns whether this converter can convert an object of the given type to the type of 
        /// this converter, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</param>
        /// <param name="sourceType">A Type that represents the type you want to convert from.</param>
        /// <returns>TRUE if this converter can perform the conversion; otherwise, FALSE.</returns>
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            if (sourceType == typeof(string))
                return true;
            return base.CanConvertFrom(context, sourceType);
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
            string _value = (string)value;
            SizeValue newValue;
            if (_value.CompareTo("tw") == 0
                || _value.CompareTo("px") == 0
                || _value.CompareTo("pt") == 0
                || _value.CompareTo("mm") == 0)
            {
                newValue = new SizeValue(context.PropertyDescriptor.GetValue(context.Instance))
                {
                    Metrics = _value
                };
            }
            else
                try { newValue = new SizeValue(value); }
                catch
                {
                    newValue = new SizeValue(context.PropertyDescriptor.GetValue(context.Instance))
                    {
                        Metrics = _value
                    };
                }
            return newValue;
        }
    }

    /// <summary>
    /// Konverter hodnoty velikostí
    /// </summary>
    [ComVisible(false)]
    public class ImageFileNameConverter : StringConverter
    {
        /// <summary>
        /// Returns whether this converter can convert an object of the given type to the type of 
        /// this converter, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context.</param>
        /// <param name="sourceType">A Type that represents the type you want to convert from.</param>
        /// <returns>TRUE if this converter can perform the conversion; otherwise, FALSE.</returns>
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            if (sourceType == typeof(object))
                return false;

            return base.CanConvertFrom(context, sourceType);
        }
    }

    /// <summary>
    /// Konvertor velikosti
    /// </summary>
    [ComVisible(false)]
    public class FontSizeValueConverter : StringConverter
    {
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
            return value is string ? new FontSizeValue(value as string) : base.ConvertFrom(context, culture, value);
        }
    }

    /// <summary>
    /// Konvertor stylu rámečku
    /// </summary>
    [ComVisible(false)]
    public class ComplexDashStyleConverter : EnumConverter
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="type">Typ</param>
        public ComplexDashStyleConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Converts the given object to the type of this converter, 
        /// using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <param name="culture">The CultureInfo to use as the current culture.</param>
        /// <param name="value">The Object to convert.</param>
        /// <returns>An Object that represents the converted value.</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value) => !(value is string) ? base.ConvertFrom(context, culture, value) : ComplexDashStyle.Parse(value as string);

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
            => value is string ? ComplexDashStyle.ToCzName(value as string) : base.ConvertTo(context, culture, value, destinationType);

        StandardValuesCollection svc = null;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            if (svc == null && CommonService.FloatDashStyles.Count != 0)
                svc = new StandardValuesCollection(CommonService.FloatDashStyles.Values.ToArray());

            if (svc != null)
                return svc;

            return new StandardValuesCollection(new List<string>());
        }
    }

    /// <summary>
    /// Konvertor stylu (řezu) písma
    /// </summary>
    [ComVisible(false)]
    public class FontStyleEnumConverter : EnumConverter
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="type">Typ</param>
        public FontStyleEnumConverter(Type type)
            : base(type)
        {
        }

        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            return new StandardValuesCollection(ListOfFontStyles.Styles.Keys.ToList());
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            foreach (KeyValuePair<FontStyle, string> item in ListOfFontStyles.Styles)
                if (item.Value.Equals(value as string, StringComparison.InvariantCultureIgnoreCase))
                    return item.Key;

            return base.ConvertFrom(context, culture, value);
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
                var ctor = typeof(FontStyle).GetConstructor(new Type[] { value.GetType() });
                return new InstanceDescriptor(ctor, new object[] { value });
            }

            if (destinationType == typeof(string))
                if (value is string)
                    // případ, kdy se má vrátit textová prezentace FontStyleEnum
                    return context == null ? ConvertFrom(context, culture, value) : value;

            if (value is FontStyleEnum || value is FontStyle)
                if (ListOfFontStyles.Styles.ContainsKey((FontStyle)value))
                    return ListOfFontStyles.Styles[(FontStyle)value];

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konvertor stylu typu umístění obrázku
    /// </summary>
    [ComVisible(false)]
    public class ImageSizeValueTypeConverter : EnumConverter
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="type">Typ</param>
        public ImageSizeValueTypeConverter(Type type)
            : base(type)
        {
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "buňka": return ImageSizeValueType.cell;
                case "obrázek": return ImageSizeValueType.image;
                default: return ImageSizeValueType.spec;
            }
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
            if (value is ImageSizeValueType)
                switch ((ImageSizeValueType)value)
                {
                    case ImageSizeValueType.cell: return GResources.GetResourceText(29450386); //RC 29450386 : buňka
                    case ImageSizeValueType.image: return GResources.GetResourceText(29450387); //RC 29450387 : obrázek
                    default: return GResources.GetResourceText(29450388); //RC 29450388 : rozměr
                }

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konvertor barvy
    /// </summary>
    public class ComplexColorConverter : TypeConverter
    {
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context) => new StandardValuesCollection(ColorService.Colors);

        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;

        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType) => sourceType == typeof(InstanceDescriptor) || sourceType == typeof(string);

        public override bool CanConvertTo(ITypeDescriptorContext context, Type destinationType) => destinationType == typeof(InstanceDescriptor) || destinationType == typeof(string);

        /// <summary>
        /// Converts the given object to the type of this converter, 
        /// using the specified context and culture information.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <param name="culture">The CultureInfo to use as the current culture.</param>
        /// <param name="value">The Object to convert.</param>
        /// <returns>An Object that represents the converted value.</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value) => value is string @string ? URComplexColor.Parse(@string) : base.ConvertFrom(context, culture, value);

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
                var ctor = typeof(URComplexColor).GetConstructor(new Type[] { value.GetType() });

                return new InstanceDescriptor(ctor, new object[] { value });
            }

            if (/*tohle by melo byt vzdy*/(value is URComplexColor) && destinationType == typeof(string))
            {
                if (!ColorService.Colors.Contains((value as URComplexColor).Name))
                    ColorService.AddColorItem((value as URComplexColor).Name, (value as URComplexColor).Name, (value as URComplexColor).Color);

                return (value as URComplexColor).Name;
            }

            if (value is string && destinationType == typeof(string))
                return context == null ? ConvertFrom(context, culture, value) : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }

        public override bool IsValid(ITypeDescriptorContext context, object value) => value is string @string ? URComplexColor.TryParse(@string) != null : value is URComplexColor;
    }

    /// <summary>
    /// Konvertor horizontálního zarovnání
    /// </summary>
    [ComVisible(false)]
    public class ComplexSurroundCornersConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public ComplexSurroundCornersConverter(Type type)
            : base(type)
        {
            if (svc == null && ComplexSurround.ListCorners.Count != 0)
                svc = new StandardValuesCollection(ComplexSurround.ListCorners.ToArray());

            if (svc != null)
                this.Values = svc;
            else
                this.Values = new StandardValuesCollection(new List<string>());
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => true;
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;

        readonly StandardValuesCollection svc = null;
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            if (ComplexSurround.ListCorners.Contains(value as string))
                return ComplexSurround.ListCorners.IndexOf(value as string);
            else
            {
                int _i = -1;
                if (Int32.TryParse(value as string, out _i))
                    return _i;
            }

            return value;
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
            if (value is int || value is ComplexSurroundCorners)
                if (this.Values.Count > (int)value)
                    return this.Values[(int)value];

            if (value is string && destinationType == typeof(string))
                // případ, kdy se má vrátit textová prezentace FontStyleEnum
                return context == null ? ConvertFrom(context, culture, value) : value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// Konverze orientace.
    /// </summary>
    [ComVisible(false)]
    public class ImageStretchConverter : EnumConverter
    {
        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public ImageStretchConverter(Type type)
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
            if (!(value is string))
                return base.ConvertFrom(context, culture, value);

            switch (value as string)
            {
                case "ByImage":
                case "dle obrázku":
                    return ImageStretch.ByImage;
                case "ByObject":
                case "dle objektu":
                    return ImageStretch.ByObject;
                default:
                    return ImageStretch.None;
            }
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
            if (value is ImageStretch)
                switch ((ImageStretch)value)
                {
                    case ImageStretch.ByImage:
                        return "dle obrázku";
                    case ImageStretch.ByObject:
                        return "dle objektu";
                    default:
                        return "originál";
                }

            if (value is string && destinationType == typeof(string))
                return value;

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }

    /// <summary>
    /// převod řetězce na SizeValue veličinu
    /// </summary>
    [ComVisible(false)]
    public class OfficeItemTypeConverter : EnumConverter
    {
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            if (CommonService.OfficeItemTypes.Count != 0)
                return new StandardValuesCollection(CommonService.OfficeItemTypes.Values.ToArray());
            return new StandardValuesCollection(new List<string>());
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
            if (value is string || value == null)
            {
                if (string.IsNullOrEmpty(value as string) && CommonService.OfficeItemTypes.Count != 0)
                    return CommonService.OfficeItemTypes.First().Value;
                else return value;
            }

            return base.ConvertTo(context, culture, value, destinationType);
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
            if (value is string)
                return value as string;
            return base.ConvertFrom(context, culture, value);
        }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public OfficeItemTypeConverter(Type type)
            : base(type)
        {
        }
    }

    /// <summary>
    /// převod řetězce na SizeValue veličinu
    /// </summary>
    [ComVisible(false)]
    public class OfficeInstanceConverter : EnumConverter
    {
        /// <summary>
        /// Returns whether this object supports a standard set of values that 
        /// can be picked from a list, using the specified context.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that provides a format context. </param>
        /// <returns>
        /// TRUE if GetStandardValues should be called to find a common set of values 
        /// the object supports; otherwise, FALSE.
        /// </returns>
        public override bool GetStandardValuesSupported(ITypeDescriptorContext context) => true;
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
        public override bool GetStandardValuesExclusive(ITypeDescriptorContext context) => false;
        /// <summary>
        /// Vrácí kolekci standardních hodnot z výchozího kontextu pro datový typ určený konvertorem
        /// </summary>
        /// <param name="context">Kontext výchozích hodnot</param>
        /// <returns>Kolekce dostupných hodnot</returns>
        public override TypeConverter.StandardValuesCollection GetStandardValues(ITypeDescriptorContext context)
        {
            if (CommonService.OfficeInstance.Count != 0)
                return new StandardValuesCollection(CommonService.OfficeInstance.Values.ToArray());
            return new StandardValuesCollection(new List<string>());
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
            if (value is string || value == null)
            {
                if (string.IsNullOrEmpty(value as string) && CommonService.OfficeInstance.Count != 0)
                    return CommonService.OfficeInstance.First().Value;
                else return value;
            }

            return base.ConvertTo(context, culture, value, destinationType);
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
            if (value is string)
                return value as string;
            return base.ConvertFrom(context, culture, value);
        }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        /// <param name="type">Type</param>
        public OfficeInstanceConverter(Type type)
            : base(type)
        {
        }
    }
}
