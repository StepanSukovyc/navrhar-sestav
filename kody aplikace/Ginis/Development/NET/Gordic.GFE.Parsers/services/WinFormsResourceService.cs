//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WinFormsResourceService.cs               </Name>
//    <Description> Pomocná třída pro obrázky a ikonky                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Pomocná třída pro obrázky a ikonky
    /// </summary>
    public static class WinFormsResourceService
    {
        #region Obrázky
        static Dictionary<string, Bitmap> bitmapCache = new Dictionary<string, Bitmap>();
        static Dictionary<string, Icon> iconCache = new Dictionary<string, Icon>();

        /// <summary>
        /// Vrácí obrázek z seznamu obrázku.
        /// Není zapotřebí obrázek uvolňovat!
        /// </summary>
        /// <returns>
        /// </returns>
        /// <param name="name">
        /// Název obrázku.
        /// </param>
        /// <exception cref="ResourceNotFoundException">
        /// Se vyvolá v případě, že obrázek není nalezen
        /// </exception>
        public static Bitmap GetBitmap(string name)
        {
            lock (bitmapCache)
            {
                if (bitmapCache.TryGetValue(name, out Bitmap bmp))
                    return bmp;

                bmp = ResourceService.GetImageResource(name) as Bitmap;
                if (bmp != null)
                    bitmapCache[name] = bmp;

                return bmp;
            }
        }

        /// <summary>
        /// Vrící ikonku ze seznamu ikonek.
        /// </summary>
        /// <returns>
        /// </returns>
        /// <param name="name">
        /// Název ikonky.
        /// </param>
        public static Icon GetIcon(string name)
        {
            lock (iconCache)
            {
                if (iconCache.TryGetValue(name, out Icon ico))
                    return ico;

                object iconobj = GetBitmap(name);
                if (iconobj == null)
                    return null;

                if (iconobj is Icon)
                    ico = (Icon)iconobj;
                else
                    ico = BitmapToIcon((Bitmap)iconobj);
                iconCache[name] = ico;
                return ico;
            }
        }
        /// <summary>
        /// Získání ikonky dle bitmapy
        /// </summary>
        /// <param name="bmp"></param>
        /// <returns></returns>
        public static Icon GetIcon(Bitmap bmp)
        {
            return BitmapToIcon(bmp);
        }

        /// <summary>
        /// Konverze bitmap do icon.
        /// </summary>
        /// <param name="bmp">obrázek pro konverzí</param>
        static Icon BitmapToIcon(Bitmap bmp)
        {
            if (bmp == null)
                return null;

            IntPtr hIcon = bmp.GetHicon();
            try
            {
                using (Icon tempIco = Icon.FromHandle(hIcon))
                {
                    return new Icon(tempIco, tempIco.Width, tempIco.Height);
                }
            }
            finally { Gordic.GFE.Parsers.Utils.NativeMethods.DestroyIcon(hIcon); }
        }
        #endregion

        #region Písma
        static Font defaultMonospacedFont;
        /// <summary>
        /// Výchozí písmo
        /// </summary>
        public static Font DefaultMonospacedFont
        {
            get
            {
                if (defaultMonospacedFont == null)
                    defaultMonospacedFont = LoadDefaultMonospacedFont(FontStyle.Regular);
                return defaultMonospacedFont;
            }
        }
        /// <summary>
        /// načtení výchozího písma (Consolas nebo Courier New).
        /// </summary>
        public static Font LoadDefaultMonospacedFont(FontStyle style)
        {
            if (Environment.OSVersion.Platform == PlatformID.Win32NT
                && Environment.OSVersion.Version.Major >= 6)
                return LoadFont("Consolas", 10, style);
            else
                return LoadFont("Courier New", 10, style);
        }
        /// <summary>
        /// Bezpečné načtení písma.
        /// </summary>
        /// <param name="fontName">Název písma pro načtení.</param>
        /// <param name="size">Velikost písma.</param>
        /// <returns>
        /// </returns>
        public static Font LoadFont(string fontName, int size)
        {
            return LoadFont(fontName, size, FontStyle.Regular);
        }
        /// <summary>
        /// Bezpečné načtení písma.
        /// </summary>
        /// <param name="fontName">Název písma pro načtení.</param>
        /// <param name="size">Velikost písma.</param>
        /// <param name="style"><see cref="System.Drawing.FontStyle"/> písma</param>
        /// <returns>
        /// </returns>
        public static Font LoadFont(string fontName, int size, FontStyle style)
        {
            try { return new Font(fontName, size, style); }
            catch { return SystemInformation.MenuFont; }
        }
        /// <summary>
        /// Bezpečné načtení písma.
        /// </summary>
        /// <param name="fontName">Název písma pro načtení.</param>
        /// <param name="size">Velikost písma.</param>
        /// <param name="unit"><see cref="System.Drawing.GraphicsUnit"/> písma</param>
        /// <returns>
        /// </returns>
        public static Font LoadFont(string fontName, int size, GraphicsUnit unit)
        {
            return LoadFont(fontName, size, FontStyle.Regular, unit);
        }
        /// <summary>
        /// Bezpečné načtení písma.
        /// </summary>
        /// <param name="fontName">Název písma pro načtení.</param>
        /// <param name="size">Velikost písma.</param>
        /// <param name="style"><see cref="System.Drawing.FontStyle"/> písma</param>
        /// <param name="unit"><see cref="System.Drawing.GraphicsUnit"/> písma</param>
        /// <returns>
        /// </returns>
        public static Font LoadFont(string fontName, int size, FontStyle style, GraphicsUnit unit)
        {
            try { return new Font(fontName, size, style, unit); }
            catch { return SystemInformation.MenuFont; }
        }
        /// <summary>
        /// Bezpečné načtení písma.
        /// </summary>
        /// <param name="baseFont">Existující písmo ze kterého se vytváří nové.</param>
        /// <param name="newStyle">Nový řez písma.</param>
        /// <returns>
        /// </returns>
        public static Font LoadFont(Font baseFont, FontStyle newStyle)
        {
            try { return new Font(baseFont, newStyle); }
            catch { return baseFont; }
        }
        #endregion
    }
}
