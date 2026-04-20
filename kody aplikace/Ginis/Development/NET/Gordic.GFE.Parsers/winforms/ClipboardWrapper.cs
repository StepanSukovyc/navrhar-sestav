//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ClipboardWrapper.cs                    </Name>
//    <Description> Pomocná třída pro přístup ke schránce                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-09                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.WinForm
{
    /// <summary>
    /// Pomocná třída pro přístup ke schránce
    /// </summary>
    public static class ClipboardWrapper
    {
        /// <summary>
        /// Obsahuje text
        /// </summary>
        public static bool ContainsText
        {
            get
            {
                try { return Clipboard.ContainsText(); }
                catch (ExternalException) { return false; }
            }
        }

        /// <summary>
        /// Získání textu
        /// </summary>
        /// <returns></returns>
        public static string GetText()
        {
            try { return Clipboard.GetText(); }
            catch (ExternalException) { return Clipboard.GetText(); }
        }

        /// <summary>
        /// Nastavení textu
        /// </summary>
        /// <param name="text">Nastavovaný text</param>
        public static void SetText(string text)
        {
            DataObject data = new DataObject();
            data.SetData(DataFormats.UnicodeText, true, text);
            SetDataObject(data);
        }

        /// <summary>
        /// Získání aktuálního obsahu schránky.
        /// Může vrátit NULL!
        /// </summary>
        public static IDataObject GetDataObject()
        {
            try { return Clipboard.GetDataObject(); }
            catch (ExternalException)
            {
                try { return Clipboard.GetDataObject(); }
                catch (ExternalException) { return null; }
            }
        }

        /// <summary>
        /// Nastavení objektu do schránky
        /// </summary>
        /// <param name="data">Objekt</param>
        public static void SetDataObject(object data)
        {
            SafeSetClipboard(data);
        }

        [ThreadStatic]
        static int SafeSetClipboardDataVersion;

        static void SafeSetClipboard(object dataObject)
        {
            int version = unchecked(++SafeSetClipboardDataVersion);
            try { Clipboard.SetDataObject(dataObject, true); }
            catch (ExternalException)
            {
                Timer timer = new Timer
                {
                    Interval = 100
                };
                timer.Tick += delegate
                {
                    timer.Stop();
                    timer.Dispose();
                    if (SafeSetClipboardDataVersion == version)
                        try { Clipboard.SetDataObject(dataObject, true, 10, 50); }
                        catch (ExternalException) { }
                };
                timer.Start();
            }
        }
    }
}
