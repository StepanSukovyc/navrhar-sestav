using System;
using System.Drawing;
using System.Runtime.InteropServices;

namespace Gordic.TextEditor.Misc.Util
{
    static class ImageService
    {
        /// <summary>
        /// Konverze bitmap do icon.
        /// </summary>
        /// <param name="bmp">obrázek pro konverzí</param>
        internal static Icon BitmapToIcon(Bitmap bmp)
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
            finally { DestroyIcon(hIcon); }
        }
        /// <summary>
        /// Uvolnění ikonky
        /// </summary>
        /// <param name="handle">handle ikonky</param>
        /// <returns></returns>
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool DestroyIcon(IntPtr handle);


        internal static Image GetBitmap(Type type, string name)
        {
            return new Bitmap(type.Assembly.GetManifestResourceStream("Gordic.TextEditor.Resources.Misc.SearchAndReplace." + name));
        }

    }
}
