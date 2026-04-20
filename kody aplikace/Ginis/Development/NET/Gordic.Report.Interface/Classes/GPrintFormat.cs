//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GPrintFormat.cs                     </Name>
//    <Description> Předvolba tisku                                             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2008                  </Copyright>
//    <Created>     2008-11-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.Serialization;
using Microsoft.Win32;
using System.Runtime.InteropServices;
using Gordic.General;
using Gordic.Report.Interface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Předvolba tisku (abstraktní předek)
    /// </summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public abstract class GPrintFormat : GUnsafeRepWrapper.IPrintFormat
    {
        internal GPrintFormat()
        {
        }
        /// <summary>konstruktor</summary>
        protected GPrintFormat(RegistryKey key)
        {
            Name = key.GetValue("Name").ToString();
            string[] spl = key.Name.Split('\\','.');
            PrintName = spl[spl.Length - 2];
            Index = Int32.Parse(spl[spl.Length - 1]);

            PrintName = PrintName.Replace("~~", "~");
            PrintName = PrintName.Replace("~/", @"\");
        }

        ///// <summary>konstruktor</summary>
        //protected GPrintFormat(SerializationInfo info, StreamingContext context)
        //{
        //}

        /// <summary>
        /// Serializace
        /// </summary>
        public string Serialize()
        {
            try
            {
                var fmt = new System.Runtime.Serialization.Formatters. Binary.BinaryFormatter(null, new StreamingContext(StreamingContextStates.Persistence));
                fmt.TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.XsdString;                
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                using (var zs = new System.IO.Compression.DeflateStream(ms, System.IO.Compression.CompressionMode.Compress))
                {
                    fmt.Serialize(zs, this);
                }
                return Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Error serialize print preset " + Name + ":\n" + e.Message);
                return "";
            }
        }

        /// <summary>
        /// Serializace
        /// </summary>
        public static GPrintFormat Deserialize(string str)
        {
            try
            {
                var fmt = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter(null,new StreamingContext(StreamingContextStates.Persistence));
                fmt.TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.XsdString;
                System.IO.MemoryStream ms = new System.IO.MemoryStream(Convert.FromBase64String(str));
                using (var zs = new System.IO.Compression.DeflateStream(ms, System.IO.Compression.CompressionMode.Decompress))
                {
                    return fmt.Deserialize(zs) as GPrintFormat;
                }
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Error deserialize print preset :\n" + e.Message);
                return null;
            }
        }
        /// <summary>
        /// Load - jediné načtení
        /// </summary>
        public static GPrintFormat Load(RegistryKey key)
        {
            try
            {
                string[] spl = key.Name.Split('.');
                if (spl.Length != 2) return null;
                if (key.GetValue("Name") == null) return null;
                object tp = key.GetValue("TextPrint");
                if (tp == null) return null;

                if(tp.ToString() == "1")
                    return new GTextPrintFormat(key);
                return new GGDIPrintFormat(key);
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Error loading print preset " + key.Name + ":\n" + e.Message);
                return null;
            }
        }

        //------------------------------------------------------------------
        ///<summary>Jméno předvolby</summary>
        public string Name
        {
            get;
            protected set;
        }
        //------------------------------------------------------------------
        ///<summary>Jméno tiskárny</summary>
        public string PrintName
        {
            get;
            protected set;
        }
        //------------------------------------------------------------------
        ///<summary>Index v rámci tiskárny</summary>
        public int Index
        {
            get;
            protected set;
        }
        //------------------------------------------------------------------
        ///<summary>Jméno tiskárny : jméno předvolby</summary>
        public string FullName
        {
            get
            {
                if (PrintName == null) return Name;
                return PrintName + " : " + Name;
            }
        }
        /// <exclude/>
        public override string ToString()
        {
            return FullName;
        }

        /// <exclude/>
        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj is GPrintFormat) obj = ((GPrintFormat)obj).FullName;
            return FullName.Equals(obj);
        }
        /// <exclude/>
        public override int GetHashCode()
        {
            return FullName.GetHashCode();
        }

        //------------------------------------------------------------------
        ///<summary>Velikost stránky ve znacích</summary>
        public abstract System.Drawing.Point TextSize { get; protected set; }

        /// <exclude/>
        protected IntPtr m_ptr;
        /// <exclude/>
        protected IntPtr _s(string s)
        {
            return m_ptr = Marshal.StringToCoTaskMemAnsi(s);
        }
        /// <exclude/>
        ~GPrintFormat()
        {
            FreePtr();
        }
        /// <exclude/>
        protected void FreePtr()
        {
            if (m_ptr != IntPtr.Zero) Marshal.FreeCoTaskMem(m_ptr);
            m_ptr = IntPtr.Zero;
        }

        #region IPrintFormat Members

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormat.GetName()
        {
            FreePtr();
            return _s(Name);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormat.GetPrinterName()
        {
            FreePtr();
            return _s(PrintName);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormat.GetDisplayName()
        {
            FreePtr();
            return _s(PrintName);
        }

        #endregion
    }

    /// <summary>
    /// Grafická předvolba tisku
    /// </summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GGDIPrintFormat : GPrintFormat, GUnsafeRepWrapper.IPrintFormatGDI
    {
        /// <summary>Výčet orientace papíru</summary>
        public enum PrinterOrientation 
        {
            /// <summary>Portrait</summary>
            Portrait,
            /// <summary>Landscape</summary>
            Landscape 
        };

        public struct Padding
        {
            public int Left { get; set; }
            public int Right { get; set; }
            public int Top { get; set; }
            public int Bottom { get; set; }
            public int All
            {
                get => Top == Left && Top == Right && Top == Bottom ? Top : -1;
                set => Top = Left = Right = Bottom = value;
            }
            public Padding(int all)
            {
                Top = Left = Right = Bottom = all;
            }
            public Padding(int left, int top, int right, int bottom)
            {
                Top = top;
                Left = left;
                Right = right;
                Bottom = bottom;
            }
            
            public override bool Equals(object other)
            {
                if (other is Padding) return (Padding)other == this;
                return false;
            }
            public static bool operator ==(Padding p1, Padding p2) => p1.Left == p2.Left && p1.Top == p2.Top && p1.Right == p2.Right && p1.Bottom == p2.Bottom;
            public static bool operator !=(Padding p1, Padding p2) => !(p1 == p2);
            public override int GetHashCode() => Left ^ (Top << 8) ^ (Right << 16) ^ (Bottom << 24);
            public override string ToString() => $"{{Left={Left},Top={Top},Right={Right},Bottom={Bottom}}}";
        }


        internal GGDIPrintFormat()
        {
        }

        internal GGDIPrintFormat(RegistryKey key)
            : base(key)
        {
            PaperName = GetKeyString(key, "PaperSize");
            PaperOrientation = (PrinterOrientation)GetKeyInt(key, "PaperOrientation");
            string[] l_font = GetKeyString(key, "Font").Split(',');
            Font = l_font[0];
            if (l_font.Length >= 1) FontSize = Int32.Parse(l_font[1]);
            if (l_font.Length >= 2) FontCharset = Int32.Parse(l_font[2]);
            string[] l_margins = GetKeyString(key, "Margins").Split(',');
            if (l_margins.Length >= 4)
            {
                Margins = new Padding(Int32.Parse(l_margins[0]), Int32.Parse(l_margins[2]), Int32.Parse(l_margins[1]), Int32.Parse(l_margins[3]));
            }

            Duplex = GetKeyInt(key, "Duplex");
            Color = GetKeyInt(key, "Color");
            CustomString = GetKeyString(key, "Custom");

            string[] l_cachedValues = GetKeyString(key, "CachedValues").Split(',');
            if (l_cachedValues.Length >= 8)
            {
                PaperSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[0]), Int32.Parse(l_cachedValues[1]));
                PageSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[2]), Int32.Parse(l_cachedValues[3]));
                TextSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[4]), Int32.Parse(l_cachedValues[5]));
                CharSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[6]), Int32.Parse(l_cachedValues[7]));
            }
        }

        /// <summary>Adhoc formát</summary>
        /// <param name="paperSize">velikost papíru v setinnách mm; default Point(21000,29700)</param>
        /// <param name="margins">Okraje stránky v mm; default Padding(10)</param>
        /// <param name="charSize">Velikost jednoho znaku v setinnách mm; default Point(212, 373) odpovídá písmu Courier New 10</param>
        /// <param name="font">Řez písma</param>
        /// <param name="fontSize">Velikost písma</param>
        /// <param name="fontCharset">Charset fontu</param>
        /// <param name="orientation">Orientace stránky papíru</param>
        /// <param name="name">Název formátu</param>
        public static GGDIPrintFormat AdHocFormat(
            System.Drawing.Point? paperSize = null
            , Padding? margins = null
            , System.Drawing.Point? charSize = null
            , string font = "Courier New"
            , int fontSize = 10
            , int fontCharset = 1
            , PrinterOrientation orientation = PrinterOrientation.Portrait
            , string name = null
            )
        {
            var f = new GGDIPrintFormat();
            f.PaperSize = paperSize ?? new System.Drawing.Point(21000,29700);
            f.PaperOrientation = orientation;
            if (orientation == PrinterOrientation.Landscape) //otoceni
                f.PaperSize = new System.Drawing.Point(f.PaperSize.Y, f.PaperSize.X);

            f.Margins = margins ?? new Padding(10);
            f.CharSize = charSize ?? new System.Drawing.Point(212, 373);
            f.Font = font;
            f.FontSize = fontSize;
            f.FontCharset = fontCharset;
            f.Name = name;

            f.PageSize = new System.Drawing.Point(f.PaperSize.X - (f.Margins.Left + f.Margins.Top) * 100, f.PaperSize.Y - (f.Margins.Top + f.Margins.Bottom) * 100);
            f.TextSize = new System.Drawing.Point(f.PageSize.X / f.CharSize.X, f.PageSize.Y / f.CharSize.Y);
            return f;
        }

        public static GGDIPrintFormat AdHocA4Standard(Padding? margins = null, string name = null)
        {
            return AdHocFormat(margins: margins, name: name);
        }
        public static GGDIPrintFormat AdHocA4StandardLanscape(Padding? margins = null, string name = null)
        {
            return AdHocFormat(margins: margins, name: name, orientation: PrinterOrientation.Landscape);
        }
        public static GGDIPrintFormat AdHocA4Small(Padding? margins = null, string name = null)
        {
            return AdHocFormat(margins: margins, name: name, fontSize:8, charSize: new System.Drawing.Point(169,300));
        }
        public static GGDIPrintFormat AdHocA4SmallLanscape(Padding? margins = null, string name = null)
        {
            return AdHocFormat(margins: margins, name: name, fontSize:8, charSize: new System.Drawing.Point(169,300), orientation: PrinterOrientation.Landscape);
        }

        public static GGDIPrintFormat AdHocA3Standard(Padding? margins = null, string name = null)
        {
            return AdHocFormat(paperSize: new System.Drawing.Point(29700, 42000), margins: margins, name: name);
        }
        public static GGDIPrintFormat AdHocA3StandardLanscape(Padding? margins = null, string name = null)
        {
            return AdHocFormat(paperSize: new System.Drawing.Point(29700, 42000), margins: margins, name: name, orientation: PrinterOrientation.Landscape);
        }
        public static GGDIPrintFormat AdHocA3Small(Padding? margins = null, string name = null)
        {
            return AdHocFormat(paperSize: new System.Drawing.Point(29700, 42000), margins: margins, name: name, fontSize:8, charSize: new System.Drawing.Point(169,300));
        }
        public static GGDIPrintFormat AdHocA3SmallLanscape(Padding? margins = null, string name = null)
        {
            return AdHocFormat(paperSize: new System.Drawing.Point(29700, 42000), margins: margins, name: name, fontSize:8, charSize: new System.Drawing.Point(169,300), orientation: PrinterOrientation.Landscape);
        }
	

        private static string GetKeyString(RegistryKey key, string keyName)
        {
            var val = key.GetValue(keyName);
            if (val == null) return "";
            return val.ToString();
        }
        private static int GetKeyInt(RegistryKey key, string keyName)
        {
            var val = key.GetValue(keyName);
            if (val == null) return 0;
            int r;
            if (Int32.TryParse(val.ToString(), out r)) return r;
            return 0;
        }
        //------------------------------------------------------------------
        ///<summary>Velikost stránky</summary>
        public string PaperName { get; protected set; }
        ///<summary>Orientace stránky papíru</summary>
        public PrinterOrientation PaperOrientation { get; protected set; }
        ///<summary>Řez písma</summary>
        public string Font { get; protected set; }
        ///<summary>Velikost písma</summary>
        public int FontSize { get; protected set; }
        ///<summary>Charset fontu</summary>
        public int FontCharset { get; protected set; }
        ///<summary>Okraje stránky v mm</summary>
        public Padding Margins { get; protected set; }
        ///<summary>velikost papíru v setinnách mm</summary>
        public System.Drawing.Point PaperSize { get; protected set; }
        ///<summary>velikost stránky bez okrajů mm</summary>
        public System.Drawing.Point PageSize { get; protected set; }
        ///<summary>Velikost stránky ve znacích</summary>        
        public override System.Drawing.Point TextSize { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]protected set; }
        ///<summary>Velikost jednoho znaku v setinnách mm</summary>
        public System.Drawing.Point CharSize { get; protected set; }
        ///<summary>Příznam Duplex</summary>
        public int Duplex { get; protected set; }
        ///<summary>Příznak barevného tisku</summary>
        public int Color { get; protected set; }
        ///<summary> </summary>
        public string CustomString { get; protected set; }

        #region IPrintFormatGDI Members
        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetName();
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetPrinterName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetPrinterName();
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetDisplayName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetDisplayName();
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetBottomMargin()
        {
            return Margins.Bottom;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetColor()
        {
            return Color;
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetCustomString()
        {
            FreePtr();
            return _s(CustomString);
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetDuplex()
        {
            return Duplex;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetFontCharset()
        {
            return FontCharset;
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetFontName()
        {
            FreePtr();
            return _s(Font);
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetFontSize()
        {
            return FontSize;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetLeftMargin()
        {
            return Margins.Left;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetOrientation()
        {
            return (int)PaperOrientation;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetPageHeight()
        {
            return PageSize.Y;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetPageWidth()
        {
            return PageSize.X;
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatGDI.GetPaperName()
        {
            FreePtr();
            return _s(PaperName);
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetRightMargin()
        {
            return Margins.Right;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetTextHeight()
        {
            return TextSize.Y;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetTextWidth()
        {
            return TextSize.X;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatGDI.GetTopMargin()
        {
            return Margins.Top;
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.GetmmCharSize(out System.Drawing.Point p)
        {
            p = CharSize;
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.GetmmPageMargins(out System.Drawing.Rectangle p)
        {
            p = new System.Drawing.Rectangle(Margins.Left * 100, Margins.Top * 100, Margins.Right * 100, Margins.Bottom * 100);
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.GetmmPaperSize(out System.Drawing.Point p)
        {
            p = PaperSize;
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.__stub1()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.__stub2()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatGDI.__stub3()
        {
            throw new NotImplementedException();
        }

        #endregion
    }

    /// <summary>
    /// Textová předvolba tisku
    /// </summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GTextPrintFormat : GPrintFormat, GUnsafeRepWrapper.IPrintFormatText
    {
        internal GTextPrintFormat()
        {
        }

        internal GTextPrintFormat(RegistryKey key)
            : base(key)
        {
            PaperName = key.GetValue("PaperSize").ToString();

            if (GBoolean.Parse(key.GetValue("TextCsOn")))
                CsCode = key.GetValue("TextCsCode").ToString();
            else
                CsCode = "bez češtiny"; //nelokalizovat!

            TextSize = new System.Drawing.Point(Int32.Parse(key.GetValue("TextWidth").ToString()), Int32.Parse(key.GetValue("TextHeight").ToString()));
            MarginTop = Int32.Parse(key.GetValue("TopMargin").ToString());
            MarginLeft = Int32.Parse(key.GetValue("LeftMargin").ToString());

            TextInitString = key.GetValue("TextInitString").ToString();
            TextFiniString = key.GetValue("TextFiniString").ToString();
            TextBlockInitString = key.GetValue("TextBlockInitString").ToString();
            TextBlockFiniString = key.GetValue("TextBlockFiniString").ToString();
            TextPageString = key.GetValue("TextPageString").ToString();

            string[] l_cachedValues = key.GetValue("CachedValues").ToString().Split(',');
            PaperSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[0]), Int32.Parse(l_cachedValues[1]));
            PageSize = new System.Drawing.Point(Int32.Parse(l_cachedValues[2]), Int32.Parse(l_cachedValues[3]));
            PageOrigin = new System.Drawing.Point(Int32.Parse(l_cachedValues[4]), Int32.Parse(l_cachedValues[5]));
        }

        /// <summary>Adhoc formát</summary>
        /// <param name="pageWidth">Šířka ve znacích</param>
        /// <param name="pageLength">Výška ve znacích</param>
        /// <param name="paperSize">velikost papíru v setinnách mm; default Point(21000,29700)</param>
        /// <param name="name">Název formátu</param>
        public static GTextPrintFormat AdHocFormat(
            int pageWidth, int pageLength
            , System.Drawing.Point? paperSize = null
            , string name = null
            )
        {
            var f = new GTextPrintFormat();
            f.PaperSize = paperSize ?? new System.Drawing.Point(21000, 29700);
            f.TextSize = new System.Drawing.Point(pageWidth, pageLength);
            f.Name = name;
            return f;
        }

        //------------------------------------------------------------------
        ///<summary>Velikost stránky</summary>
        public string PaperName { get; protected set; }
        ///<summary>Okraje stránky - levý</summary>
        public int MarginLeft { get; protected set; }
        ///<summary>Okraje stránky - vrchní</summary>
        public int MarginTop { get; protected set; }
        ///<summary>Kódování češtiny</summary>
        public string CsCode { get; protected set; }
        ///<summary>TextInitString</summary>
        public string TextInitString { get; protected set; }
        ///<summary>TextFiniString</summary>
        public string TextFiniString { get; protected set; }
        ///<summary>TextBlockInitString</summary>
        public string TextBlockInitString { get; protected set; }
        ///<summary>TextBlockFiniString</summary>
        public string TextBlockFiniString { get; protected set; }
        ///<summary>TextPageString</summary>
        public string TextPageString { get; protected set; }
        ///<summary>velikost papíru v mm</summary>
        public System.Drawing.Point PaperSize { get; protected set; }
        ///<summary>velikost stránky bez okrajů mm</summary>
        public System.Drawing.Point PageSize { get; protected set; }
        ///<summary>Velikost stránky ve znacích</summary>        
        public override System.Drawing.Point TextSize { [System.Security.SecurityCritical]get; [System.Security.SecurityCritical]protected set; }
        ///<summary>PageOrigin</summary>
        public System.Drawing.Point PageOrigin { get; protected set; }

        #region IPrintFormatText Members

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetName();
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetPrinterName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetPrinterName();
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetDisplayName()
        {
            return ((GUnsafeRepWrapper.IPrintFormat)this).GetDisplayName();
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetPaperName()
        {
            FreePtr();
            return _s(PaperName);
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetTextWidth()
        {
            return TextSize.X;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetTextHeight()
        {
            return TextSize.Y;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetTopMargin()
        {
            return MarginTop;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetLeftMargin()
        {
            return MarginLeft;
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetCsCode()
        {
            FreePtr();
            return _s(CsCode);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetInitString()
        {
            FreePtr();
            return _s(TextInitString);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetFiniString()
        {
            FreePtr();
            return _s(TextFiniString);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetBlockInitString()
        {
            FreePtr();
            return _s(TextBlockInitString);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetBlockFiniString()
        {
            FreePtr();
            return _s(TextBlockFiniString);
        }

        [System.Security.SecurityCritical]
        IntPtr GUnsafeRepWrapper.IPrintFormatText.GetPageString()
        {
            FreePtr();
            return _s(TextPageString);
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetPageWidth()
        {
            return PageSize.X;
        }

        [System.Security.SecurityCritical]
        int GUnsafeRepWrapper.IPrintFormatText.GetPageHeight()
        {
            return PageSize.Y;
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.__stub1()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.__stub2()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.__stub3()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.__stub4()
        {
            throw new NotImplementedException();
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.GetmmPaperSize(out System.Drawing.Point p)
        {
            p = PaperSize;
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.GetmmPageMargins(out System.Drawing.Rectangle p)
        {
            System.Drawing.Point l_charSize = new System.Drawing.Point();
            l_charSize.X = PageSize.X / TextSize.X;
            l_charSize.Y = PageSize.Y / TextSize.Y;

            p = new System.Drawing.Rectangle(
                PageOrigin.X + MarginLeft * l_charSize.X,
                PageOrigin.Y + MarginTop * l_charSize.Y,
                PaperSize.X - PageOrigin.X - PageSize.X,
                PaperSize.Y - PageOrigin.Y - PageSize.Y
                );
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.GetmmCharSize(out System.Drawing.Point p)
        {
            p = new System.Drawing.Point(
                PageSize.X / TextSize.X,
                PageSize.Y / TextSize.Y
                );
        }

        [System.Security.SecurityCritical]
        void GUnsafeRepWrapper.IPrintFormatText.GetmmPageOrigin(out System.Drawing.Point p)
        {
            p = PageOrigin;
        }
        #endregion
    }


}
