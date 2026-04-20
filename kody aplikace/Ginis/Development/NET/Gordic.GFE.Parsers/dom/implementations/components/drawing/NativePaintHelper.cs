//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NativePaintHelper.cs                     </Name>
//    <Description> pomocná třída kreslení nativního objektu                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers.Gui;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// pomocná třída kreslení nativního objektu
    /// </summary>
    public sealed class NativeColorHelper : IGFormatGRRColor
    {
        readonly Color color;
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="color">barva kreslení</param>
        public NativeColorHelper(Color color)
        {
            this.color = color;
        }
        #region IGFormatGRRColor Members

        int IGFormatGRRColor.getIndexInColorTable(out int idx)
        {
            idx = 0;
            return 1;
        }
        int IGFormatGRRColor.getName(out string cn)
        {
            cn = null;// IntPtr.Zero;
            return 1;
        }
        int IGFormatGRRColor.getRGB(out int cr)
        {
            cr = System.Drawing.ColorTranslator.ToWin32(color);
            return 0;
        }
        int IGFormatGRRColor.isTransparent(out bool ct)
        {
            ct = color == System.Drawing.Color.Transparent;
            return 0;
        }

        #endregion
    }
    /// <summary>
    /// pomocná třída kreslení DRAWING objektu
    /// </summary>
    public class NativePaintHelper : IDisposable, IGNativeStringOwner, IGFormatGRRCellStyle
    {
        GNativeStringCache IGNativeStringOwner.NativeStringCache { [System.Security.SecurityCritical] get; } = new GNativeStringCache();
        public GAttrList Attributes;
        public NativeColorHelper Color;
        public NativeColorHelper ForeColor;
        public NativePaintHelper(IBackground c, XmlElement xml)
        {
            Attributes = new Gordic.Report.Implementation.GAttrList(this, xml.Attributes.Count);
            foreach (XmlAttribute a in xml.Attributes)
                Attributes.Add(a.Name, a.Value);
            this.Color = new NativeColorHelper(c.BackColor.Color);
            if (c is ITextHandler th)
            {
                var foreColor = th.Text?.TextFont?.ForeColor;
                if (foreColor != null)
                    this.ForeColor = new NativeColorHelper(foreColor.Color);
            }
            else this.ForeColor = new NativeColorHelper(new Color());
        }

        public NativePaintHelper(IBackground c, GFEList attributes)
        {
            Attributes = new Gordic.Report.Implementation.GAttrList(this, attributes.Count);
            foreach (var a in attributes)
                Attributes.Add(a.Key, a.Value);
            this.Color = new NativeColorHelper(c.BackColor.Color);
            if (c is ITextHandler th)
            {
                var foreColor = th.Text?.TextFont?.ForeColor;
                if (foreColor != null)
                    this.ForeColor = new NativeColorHelper(foreColor.Color);
            }
            else this.ForeColor = new NativeColorHelper(new Color());
        }

        #region IDisposable
        /// <exclude/>
        [System.Security.SecuritySafeCritical]
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(Core.GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}{GNativeStringCache.DebugString(this)}");
#endif
            GNativeStringCache.Free(this);
        }
        ~NativePaintHelper() { Dispose(false); }
        #endregion

        #region IGFormatGRRCellStyle Members

        int IGFormatGRRCellStyle.getBackColor(out IGFormatGRRColor clr)
        {
            clr = Color;
            return 0;
        }

        int IGFormatGRRCellStyle.getBorderWidths(out Grr06Widths ws)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getBottomBorder(out IGFormatGRRBorder bd)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getEllipsisChar(out char elc)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getEllipsisStyle(out Grr06ElStyle els)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontBold(out bool fbold)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontCharset(out int fcharset)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontColor(out IGFormatGRRColor clr)
        {
            if (ForeColor != null)
            {
                clr = ForeColor;
                return 0;
            }
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontFace(out string fface)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontFaceIndex(out Grr06FontFace ffidx)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontItalic(out bool fitalic)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontSize(out int fsize)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontStrokeOut(out bool fstroked)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getFontUnderlined(out bool funder)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getHorzAlign(out Grr06HAlign alg)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getLeftBorder(out IGFormatGRRBorder bd)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getMultiline(out bool multil)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getPadding(out Grr06Widths pad)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getRightBorder(out IGFormatGRRBorder bd)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getSpacing(out Grr06Widths spa)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getStyleAttribute(string name, out string value)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getStyleAttributes(out IGAttrList atrs)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getTextOrientation(out int orient)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getTopBorder(out IGFormatGRRBorder bd)
        {
            throw new NotImplementedException();
        }

        int IGFormatGRRCellStyle.getVertAlign(out Grr06VAlign alg)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
