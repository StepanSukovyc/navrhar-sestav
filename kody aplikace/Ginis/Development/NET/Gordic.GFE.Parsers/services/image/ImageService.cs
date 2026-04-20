//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ImageService.cs                          </Name>
//    <Description> Služba pro práci s obrázky                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Chyba obrázku
    /// </summary>
    public class ErrorImageException : Exception
    {
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public ErrorImageException() : base() { }
    }

    /// <summary>
    /// Služba pro práci s obrázky
    /// </summary>
    public static class ImageService
    {
        /// <summary>
        /// Kolekce obrázů pro otevřený soubor
        /// </summary>
        sealed class ImageCollection : IDictionary<string, Image>, IDisposable
        {
            #region IDisposable
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            void Dispose(bool disposing)
            {
                if (disposing)
                {
                    if (tempDir != null)
                    {
                        tempDir.Dispose();
                        tempDir = null;
                    }
                    if (tempForZip != null)
                    {
                        tempForZip.Dispose();
                        tempForZip = null;
                    }
                }
            }
            ~ImageCollection() { Dispose(false); }
            #endregion

            GFETempDir tempDir;
            GFETempDir tempForZip;
            readonly Dictionary<string, Image> dictionary = new Dictionary<string, Image>();

            /// <summary>
            /// Získání/nastavení dočasného souboru s obrázky
            /// </summary>
            public GFETempDir TempDir { get => tempDir; }

            /// <summary>
            /// Vytvoření kolekce pro otevřený soubor
            /// </summary>
            /// <param name="openedFile">Otevřený soubor</param>
            public ImageCollection(OpenedFile openedFile)
            {
                if (openedFile == null)
                    return;

                savedImages = new List<string>();
                tempDir = openedFile.TemporaryDirectory;

                //if (openedFile.FileName != null)
                //{
                //    var fileName = openedFile.FileName;

                //    if (string.IsNullOrEmpty(fileName) || !FileUtility.TestFileExists(fileName))
                //        fileName = openedFile.ContentFileName;

                //    if (FileUtility.TestFileExists(fileName))
                //    {
                //        string zipFile;
                //        if (fileName == openedFile.ContentFileName)
                //        {
                //            zipFile = FileUtility.Combine(Path.GetDirectoryName(fileName), Path.GetFileNameWithoutExtension(fileName) + ".zip");
                //            if (FileUtility.TestFileExists(zipFile))
                //                TempDir = new GFETempDir(zipFile);
                //        }
                //        else
                //            TempDir = new GFETempDir(Path.GetDirectoryName(openedFile.ContentFileName));
                //    }
                //}

                if (tempDir != null)
                    foreach (string item in Directory.GetFiles(tempDir.Path))
                        Add(item);
            }

            public void Add(string filepath)
            {
                FileInfo info = new FileInfo(filepath);

                if (dictionary.ContainsKey(info.Name))
                    dictionary[info.Name] = ImageService.GetImageByPath(filepath);
                else
                {
                    Image img = ImageService.GetImageByPath(filepath);
                    if (img != null)
                        dictionary.Add(info.Name, img);
                }
            }

            public void Add(string key, Image value)
            {
                if (!dictionary.ContainsKey(key))
                    dictionary.Add(key, value);
            }

            public bool ContainsKey(string key) => dictionary.ContainsKey(key);

            public bool Remove(string key) => dictionary.Remove(key);

            public bool TryGetValue(string key, out Image value) => dictionary.TryGetValue(key, out value);

            /// <summary>
            /// seznam hodnot kolekce
            /// </summary>
            public ICollection<Image> Values { get => dictionary.Values; }
            /// <summary>
            /// seznam klíčů kolekce
            /// </summary>
            public ICollection<string> Keys { get => dictionary.Keys; }
            /// <summary>
            /// získání/nastavení hodnoty kolekce dle klíče
            /// </summary>
            /// <param name="key"></param>
            /// <returns></returns>
            public Image this[string key]
            {
                get => dictionary[key];
                set => dictionary[key] = value;
            }

            public void Add(KeyValuePair<string, Image> item)
            {
                if (!dictionary.Contains(item))
                    dictionary.Add(item.Key, item.Value);
            }

            public void Clear() { dictionary.Clear(); }

            public bool Contains(KeyValuePair<string, Image> item) => dictionary.Contains(item);

            public void CopyTo(KeyValuePair<string, Image>[] array, int arrayIndex)
            {
            }

            /// <summary>
            /// počet položek kolekce
            /// </summary>
            public int Count { get => dictionary.Count; }
            /// <summary>
            /// indikuje pouze čítelnost kolekce
            /// </summary>
            public bool IsReadOnly { get => false; }

            public bool Remove(KeyValuePair<string, Image> item) => dictionary.Remove(item.Key);

            public IEnumerator<KeyValuePair<string, Image>> GetEnumerator() => dictionary.GetEnumerator();

            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => dictionary.GetEnumerator();

            internal void CopyItem(string newName, Image img)
            {
                if (newName.ToLower().EndsWith(".bmp"))
                    img.Save(tempDir.Path + "\\" + newName, ImageFormat.Bmp);
                else if (newName.ToLower().EndsWith(".jpg") || newName.ToLower().EndsWith(".jpeg"))
                    img.Save(tempDir.Path + "\\" + newName, ImageFormat.Jpeg);
                else if (newName.ToLower().EndsWith(".png"))
                    img.Save(tempDir.Path + "\\" + newName, ImageFormat.Png);
                else if (newName.ToLower().EndsWith(".gif"))
                    img.Save(tempDir.Path + "\\" + newName, ImageFormat.Gif);
                else if (newName.ToLower().EndsWith(".icon"))
                    img.Save(tempDir.Path + "\\" + newName, ImageFormat.Icon);
                else
                    img.Save(tempDir.Path + "\\" + newName);

                Add(tempDir.Path + "\\" + newName);
            }

            List<string> savedImages;
            /// <summary>
            /// Nastavení atributu obrázku jako "použitý"
            /// </summary>
            /// <param name="fileName">Název obrázku</param>
            internal void SetSaved(string fileName)
            {
                if (!savedImages.Contains(fileName))
                    savedImages.Add(fileName);
            }

            readonly object syncRoot = new object();

            /// <summary>
            /// Získání složky s obrázky pro účel zipování při uložení
            /// </summary>
            /// <returns></returns>
            internal GFETempDir GetTempForZip()
            {
                lock (syncRoot)
                {
                    try
                    {
                        if (tempForZip != null)
                            GTempFiles.DeleteTempDirectoryContent(tempForZip.Path);
                    }
                    catch { }

                    if (tempDir == null)
                        return null;

                    foreach (string item in Directory.GetFiles(tempDir.Path))
                    {
                        string fiName = Path.GetFileName(item), fnd = string.Empty;

                        if (savedImages.Count != 0)
                            fnd = savedImages.FirstOrNull(im => string.Equals(im, fiName, StringComparison.InvariantCultureIgnoreCase));

                        if (!string.IsNullOrEmpty(fnd)
                            || MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450745), fiName)))
                        {
                            if (tempForZip == null)
                                tempForZip = new GFETempDir();

                            File.Copy(item, tempForZip.Path + "\\" + fiName);
                        }
                        else
                        {

                            if (dictionary.ContainsKey(fiName))
                                dictionary.Remove(fiName);

                            FileUtility.ObservedDelete(new List<string>() { item });
                        }
                    }
                }
                return tempForZip;
            }

            /// <summary>
            /// Uvolnění seznamu uložených obrázků
            /// </summary>
            /// <returns></returns>
            internal void ClearSaved() { savedImages.Clear(); }
        }

        /// <summary>
        /// Konvertuje Bitmap do Icon.
        /// </summary>
        public static Icon BitmapToIcon(Bitmap bmp)
        {
            IntPtr hIcon = bmp.GetHicon();
            try
            {
                using (Icon tempIco = Icon.FromHandle(hIcon))
                    return new Icon(tempIco, tempIco.Width, tempIco.Height);
            }
            finally { NativeMethods.DestroyIcon(hIcon); }
        }

        /// <summary>
        /// Uvolnění dočasných souborů
        /// </summary>
        public static void Unload()
        {
            images.ForEach(Unload);
            images.Clear();
        }

        static void Unload(KeyValuePair<OpenedFile, ImageCollection> keypair)
        {
            keypair.Value.Clear();
        }

        /// <summary>
        /// Resize the image to the specified width and height.
        /// </summary>
        /// <param name="image">The image to resize.</param>
        /// <param name="width">The width to resize to.</param>
        /// <param name="height">The height to resize to.</param>
        /// <returns>The resized image.</returns>
        public static Bitmap ResizeImage(Image image, float width, float height)
        {
            /* FIX: zacyklení chyby zobrazení obrázku */
            if (width <= 0 || height <= 0)
                return null;

            Rectangle destRect = new Rectangle(0, 0, (int)width, (int)height);
            var destImage = new Bitmap((int)width, (int)height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }

        /// <summary>
        /// Vytvoří zešedlou (zakázanou ikonu)
        /// </summary>
        /// <param name="image">Běžný obrázek (povolená ikona)</param>
        public static Image MakeDisabledImage(Image image)
        {
            Bitmap l_oImageTemp = new Bitmap(image.Width, image.Height);

            using (Graphics l_oGraphics = Graphics.FromImage(l_oImageTemp))
            {
                // prevedeni do sede (Khouzamova korekce barev) + rescale jasu z 0-255 => 170-255 (x/3+0.66*256)+ 10% transparency
                ColorMatrix l_oCM = new ColorMatrix(new float[][]{
                                    new float[]{0.11f,0.11f,0.11f,    0,   0},
                                    new float[]{0.19f,0.19f,0.19f,    0,   0},
                                    new float[]{0.04f,0.04f,0.04f,    0,   0},
                                    new float[]{0    ,0    ,0    ,   1f,   0},
                                    new float[]{0.66f,0.66f,0.66f,-0.1f,   1}});

                ImageAttributes l_oIA = new ImageAttributes();
                l_oIA.SetColorMatrix(l_oCM);
                l_oGraphics.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy; // neni treba blending - nahravame do prazdne ikony
                l_oGraphics.DrawImage(image, new Rectangle(0, 0, image.Width, image.Height), 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, l_oIA);
            }
            return l_oImageTemp;
        }

        private static IntPtr m_pImgHandle = IntPtr.Zero;
        private static Boolean m_bImgInit = false;
        private const UInt32 TVSIL_NORMAL = 0;
        private const UInt32 TVM_SETIMAGELIST = 4361;

        private static void InitImageList()
        {
            if (m_bImgInit)
                throw new Exception(GResources.GetResourceText(29450453)); //RC 29450453 : Seznám systémových obrázků již byl načten!

            NativeMethods.SHFILEINFO shInfo = new NativeMethods.SHFILEINFO();
            NativeMethods.SHGFI dwAttribs =
                NativeMethods.SHGFI.SHGFI_USEFILEATTRIBUTES |
                NativeMethods.SHGFI.SHGFI_SMALLICON |
                NativeMethods.SHGFI.SHGFI_SYSICONINDEX;
            m_pImgHandle = NativeMethods.SHGetFileInfo(".txt", NativeMethods.FILE_ATTRIBUTE_NORMAL, out shInfo, (uint)Marshal.SizeOf(shInfo), dwAttribs);

            if (m_pImgHandle.Equals(IntPtr.Zero))
                throw new Exception(GResources.GetResourceText(29450454)); //RC 29450454 : Systémové obrázky nelze načíst!

            m_bImgInit = true;
        }

        /// <summary>
        /// Nastavení seznamu obrázků
        /// </summary>
        /// <param name="tvwHandle">Handle pro treeview</param>
        public static void SetTVImageList(IntPtr tvwHandle)
        {
            InitImageList();
            Int32 hRes = NativeMethods.SendMessage(tvwHandle, TVM_SETIMAGELIST, TVSIL_NORMAL, m_pImgHandle);
            if (hRes != 0)
                Marshal.ThrowExceptionForHR(hRes);
        }

        /// <summary>
        /// Nastavení seznamu obrázků
        /// </summary>
        /// <param name="view">Strom</param>
        public static void SetStructureExplorerImageList(TreeView view)
        {
            ImageList imgList = new ImageList
            {
                ColorDepth = ColorDepth.Depth8Bit,
                TransparentColor = Color.Transparent
            };

            imgList.Images.Add("dirOpen", Properties.Resources.Icons__Gin__slozka_otevrena);
            imgList.Images.Add("dir", Properties.Resources.Icons__Gin__slozka);
            imgList.Images.Add("item", Properties.Resources.Icons__Gin__polozky);
            imgList.Images.Add("time", Properties.Resources.Icons__Gin__casove_platne);
            imgList.Images.Add("number", Properties.Resources.Icons__Gin__symbol_cislo);
            imgList.Images.Add("variable", Properties.Resources.Icons__Gin__ciselnik);
            imgList.Images.Add("object", Properties.Resources.Icons__Gin__polozky_uzamcene);
            imgList.Images.Add("rtftext", Properties.Resources.Icons__Gin__polozky_neplanovane);
            imgList.Images.Add("rtfcompressed", Properties.Resources.Icons__Gin__polozky_neplanovane);
            imgList.Images.Add("stringnontrimmed", Properties.Resources.Icons__Gin__polozky);
            imgList.Images.Add("unknown", Properties.Resources.Icons__Gin__polozka_povinna);
            view.ImageList = imgList;
        }
        /// <summary>
        /// Nastavení seznamu obrázků
        /// </summary>
        /// <param name="view">Strom</param>
        public static void SetVariableExplorerImageList(TreeView view)
        {
            ImageList imgList = new ImageList
            {
                ColorDepth = ColorDepth.Depth8Bit,
                TransparentColor = Color.Transparent
            };

            imgList.Images.Add("rootNode", Properties.Resources.Icons__Gin__ciselnik);
            imgList.Images.Add("variable", Properties.Resources.Icons__Gin__polozky);
            view.ImageList = imgList;
        }

        /// <summary>
        /// Získání systémového obrázku dle typu souboru
        /// viz. http://support.microsoft.com/kb/319350
        /// </summary>
        /// <param name="filename">Cesta k souboru</param>
        /// <returns></returns>
        public static Image GetSystemImage(string filename)
        {
            if (string.IsNullOrEmpty(filename))
                return null;

            IntPtr hImgSmall;
            NativeMethods.SHFILEINFO shinfo = new NativeMethods.SHFILEINFO();
            try
            {
                if (File.Exists(filename))
                {
                    hImgSmall = NativeMethods.SHGetFileInfo(filename, 0, out shinfo, (uint)Marshal.SizeOf(shinfo), NativeMethods.SHGFI.SHGFI_ICON | NativeMethods.SHGFI.SHGFI_SMALLICON);
                    System.Drawing.Icon myIcon = System.Drawing.Icon.FromHandle(shinfo.hIcon);
                    return myIcon.ToBitmap();
                }
            }
            catch { }
            return null;
        }

        static ImageList icons;
        /// <summary>
        /// Seznam ikonek
        /// </summary>
        public static ImageList Icons { get => icons; }

        /// <summary>
        /// Iniciaizace služby
        /// </summary>
        public static void InitializeService()
        {
            icons = new ImageList();
            icons.Images.Add(Properties.Resources.Icons__Gin__pridat);
            icons.Images.Add(Properties.Resources.Icons__Gin__odebrat);
            icons.Images.Add(Properties.Resources.Icons__Gin__stornovat);
            icons.Images.Add(Properties.Resources.Icons__Gin__fajfka_zelena);
        }

        /// <summary>
        /// Nastavení atributu obrázku jako "použitý"
        /// </summary>
        /// <param name="openedFile">Prser obsahu</param>
        /// <param name="fileName">Název obrázku</param>
        public static void SetSaved(string fileName, OpenedFile openedFile)
        {
            if (string.IsNullOrEmpty(fileName) && openedFile == null)
            {
                LoggingService.Warning(GResources.GetResourceText(29450455)); //RC 29450455 : Obrázky nejsou uložené!
                return;
            }
            if (openedFile == null)
                SetSaved(fileName);

            if (openedFile == null)
                return;

            if (!images.ContainsKey(openedFile))
                return;

            images[openedFile].SetSaved(fileName);
        }

        /// <summary>
        /// Nastavení atributu obrázku jako "použitý/uložený"
        /// </summary>
        /// <param name="imageName">Název obrázku</param>
        public static void SetSaved(string imageName)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (desktop != null)
            {
                IViewContent content = desktop.ActiveViewContent;
                if (content != null && content.PrimaryFile != null)
                    SetSaved(imageName, content.PrimaryFile);
            }
        }

        /// <summary>
        /// Uvolnění seznamu uložených obrázků
        /// </summary>
        /// <param name="openedFile">Otevřený soubor sestavy</param>
        public static void ClearSaved(OpenedFile openedFile)
        {
            if (openedFile != null)
            {
                if (!images.ContainsKey(openedFile))
                    return;

                images[openedFile].ClearSaved();
            }
        }

        /// <summary>
        /// Odstraní záznam z cach tabulky
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        public static bool RemoveImages(OpenedFile openedFile)
        {
            if (!images.ContainsKey(openedFile))
                return false;

            images[openedFile].ClearSaved();
            //images[openedFile].Dispose(); - způsobuje problémy s odstraněním vazby na dočásnou složku
            images.Remove(openedFile);
            return true;
        }

        #region NewService
        //static Dictionary<string, Image> cachImages = new Dictionary<string, Image>();
        static readonly Dictionary<OpenedFile, ImageCollection> images = new Dictionary<OpenedFile, ImageCollection>();

        /// <summary>
        /// Uložení obrázku do datové složky editoru určené pro dočasné obrázky.
        /// </summary>
        /// <param name="image">Obrázek pro uložení</param>
        /// <param name="fileName">Název souboru, do kterého se obrázek uložil</param>
        /// <returns>úplný název souboru, do kterého se obrázek uložil</returns>
        public static string SetTempBackImage(Image image, string fileName)
        {
            if (image == null || image.Size == Size.Empty)
                return string.Empty;

            //...pak ho dočasně uložíme
            if (!Directory.Exists(FileUtility.GetOrCreateDirectory(PropertyService.DataDirectory, "images")))
                return null;

            if (string.IsNullOrEmpty(fileName))
                fileName = FileUtility.Combine(FileUtility.GetOrCreateDirectory(PropertyService.DataDirectory, "images"), Guid.NewGuid().ToString() + ".tmp");

            // uložíme obrázek do složky editoru
            image.Save(fileName);

            return fileName;
        }
        /// <summary>
        /// Získání uloženého obrázku
        /// </summary>
        /// <param name="fileName">úplná cesta k souboru obrázku</param>
        /// <param name="ignoreExt">indikuje nutnost ignorovat koncovku</param>
        /// <returns>Obrázek dle cesty pokud existuje</returns>
        public static Image GetTempBackImage(string fileName, bool ignoreExt = false) => string.IsNullOrEmpty(fileName) ? null : GetImageByPath(fileName);

        /// <summary>
        /// Načtení obrázku ze souboru
        /// </summary>
        /// <param name="path">úplná cesta k souboru obrázku</param>
        /// <param name="ignoreExt">indikuje nutnost ignorovat koncovku</param>
        /// <returns>Obrázek ze souboru</returns>
        public static Image GetImageByPath(string path, bool ignoreExt = false)
        {
            //if (cachImages.ContainsKey(path))
            //    return cachImages[path];

            if (!FileUtility.TestFileExists(path)
                || (ignoreExt && !IsBitmapExtension(path)))
                return null;

            Bitmap bmp = null;
            try
            {
                using (Stream stream = new FileStream(path, FileMode.Open))
                using (var image = Image.FromStream(stream, false, true))
                    bmp = new Bitmap(image);
            }
            catch (System.ArgumentException)
            {
                try
                {
                    //Načtení obrázku
                    //*result = (HBITMAP)LoadImage(0, fname, IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE | LR_CREATEDIBSECTION);0x00002010 
                    IntPtr hImage = NativeMethods.LoadImage(IntPtr.Zero, path, 0, 0, 0, 0x00002010);

                    bmp = Image.FromHbitmap(hImage);
                }
                catch
                {
                    try
                    {
                        // je to tak kostrbaté, protože v případě nezdaru načtení se pokusíme načíst obrázek jinak
                        Image _bmp = Image.FromFile(path);
                        bmp = new Bitmap(_bmp);
                        _bmp.Dispose();
                    }
                    catch { }
                }
            }
            catch { }

            if (bmp == null)
                return null;

            //cachImages[path] = bmp;
            return bmp;
        }

        static bool IsBitmapExtension(string path)
        {
            if (!CommonService.IsDesigner)
                return true;

            string ext = Path.GetExtension(path);
            foreach (var item in CommonService.BitmapExtensions)
                if (item.Value.Equals(ext, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            return false;
        }

        /// <summary>
        /// Získání všech načtených obrázků pohledu
        /// </summary>
        /// <param name="content">Pohled</param>
        /// <returns>Slovník obrázků</returns>
        public static Dictionary<string, Image> GetImages(IViewContent content) => content == null ? new Dictionary<string, Image>() : GetImages(content.PrimaryFile);

        /// <summary>
        /// Získání všech načtených obrázků otevřeného souboru
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns>Slovník obrázů</returns>
        public static Dictionary<string, Image> GetImages(OpenedFile openedFile) =>
            !images.ContainsKey(openedFile) ? new Dictionary<string, Image>()
                : images[openedFile].ToDictionary(fn => fn.Key, fn => fn.Value);

        /// <summary>
        /// seznam všech obrázku daného otevřeného souboru
        /// </summary>
        /// <param name="openedFile">otevřený soubor sesatvy</param>
        /// <returns></returns>
        public static List<string> GetImagesForFile(OpenedFile openedFile)
        {
            if (openedFile != null)
            {
                if (!images.ContainsKey(openedFile))
                    images.Add(openedFile, new ImageCollection(openedFile));

                if (images.ContainsKey(openedFile))
                    return images[openedFile].Keys.ToList();
            }
            return new List<string>();
        }

        /// <summary>
        /// Získání obrázku dle názvu a aktuálně otevřený soubor
        /// </summary>
        /// <param name="imageName">Název obrázku</param>
        /// <param name="openedFile">Aktuálně otevřený soubor</param>
        /// <param name="newImage">Indikuje, že obrázek je úplně nový</param>
        /// <returns>Obrázek. Pokud neexistuje, pak NULL</returns>
        public static Image GetImage(string imageName, OpenedFile openedFile, bool newImage)
        {
            if (openedFile == null)
                return GetImage(imageName, newImage);

            if (!images.ContainsKey(openedFile))
                images.Add(openedFile, new ImageCollection(openedFile));

            if (string.IsNullOrEmpty(imageName))
                return null;

            KeyValuePair<string, Image> item = images[openedFile].FirstOrDefault(img => string.Equals(img.Key, imageName, StringComparison.InvariantCultureIgnoreCase));
            if (item.Value == null)
            {
                // pokus číslo 2
                // zřejmě je to nový obrázek - musí být s plnou cestou. relativní obrázky musí být v zipu, tj. najdou se v images^^
                if (!Path.IsPathRooted(imageName) || !File.Exists(imageName))
                    return null;

                FileInfo fi = new FileInfo(imageName);

                string fiName = CommonService.MakeValidFileName(GCommon.RemoveDiacritics(fi.Name), "_");

                if (images[openedFile].ContainsKey(fiName))
                    if (newImage)
                        throw new ErrorImageException();
                    else
                        return images[openedFile][fiName];

                string fullName = fi.FullName.Replace(fi.DirectoryName, openedFile.TemporaryDirectory.Path).Replace(fi.Name, fiName);
                File.Copy(imageName, fullName);

                images[openedFile].Add(fullName);
                if (images[openedFile].Count != 0)
                    return images[openedFile].First(img => string.Equals(img.Key, fiName, StringComparison.InvariantCultureIgnoreCase)).Value;
                else
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450456) + ' ' + GResources.GetResourceText(29450457) + " '{0}' " + GResources.GetResourceText(29450458) + '\n' + GResources.GetResourceText(29450459) + " Parsers-list.xml", fi.Extension); //RC 29450459 : Konfigurační soubor
                    return null;
                }
            }
            return item.Value;
        }
        /// <summary>
        /// Získání obrázku dle názvu.
        /// Obrázek se bere z seznamu příslušného aktuálně otevřenému souboru.
        /// </summary>
        /// <param name="imageName">Název obrázku</param>
        /// <param name="newImage">Indikuje, že obrázek je úplně nový</param>
        /// <returns>Obrázek, pokud neexistuje, pak NULL</returns>
        public static Image GetImage(string imageName, bool newImage)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (desktop != null)
            {
                IViewContent content = desktop.ActiveViewContent;
                if (content != null && content.PrimaryFile != null)
                    return GetImage(imageName, content.PrimaryFile, newImage);
            }
            return null;
        }

        /// <summary>
        /// Všechny obrázky souboru
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns>Kolekce obrázku otevřeného souboru</returns>
        public static ICollection<Image> Images(OpenedFile openedFile) =>
            openedFile != null && images.ContainsKey(openedFile) ? images[openedFile].Values : new List<Image>();

        /// <summary>
        /// Všechny názvy obrázků otevřeného souboru
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns>Kolekce názvů souboru otevřeného souboru sesatavy</returns>
        public static ICollection<string> Names(OpenedFile openedFile) =>
            openedFile != null && images.ContainsKey(openedFile) ? images[openedFile].Keys : new List<string>();

        /// <summary>
        /// Získání dočasné složky obrázků souboru
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns>Dočasná složka s obrázky otevřeného souboru</returns>
        public static GFETempDir GetTempDir(OpenedFile openedFile) => (images.ContainsKey(openedFile)) ? images[openedFile].TempDir : null;
        /// <summary>
        /// Získání dočasné složky obrázků souboru
        /// </summary>
        /// <param name="openedFile">Otevřený soubor</param>
        /// <returns>Dočasná složka s obrázky otevřeného souboru</returns>
        public static string GetZippedImage(OpenedFile openedFile)
        {
            if (images.ContainsKey(openedFile))
            {
                GFETempDir dir = images[openedFile].GetTempForZip();
                if (dir != null && Directory.GetFiles(dir.Path).Length != 0)
                {
                    string backFile = FileUtility.Combine(Path.GetDirectoryName(dir.Path), Guid.NewGuid().ToString() + ".tmp");
                    GZip.Zip(dir.Path + "\\*.*", backFile);
                    TemporaryService.RegisterFile(backFile);
                    return backFile;
                }
            }
            return null;
        }

        /// <summary>
        /// Získání dočasné složky obrázků souboru
        /// </summary>
        /// <param name="filename">Název Souboru</param>
        /// <returns>Dočasná složka s obrázky</returns>
        public static GTempFile GetZippedImage(string filename)
        {
            foreach (KeyValuePair<OpenedFile, ImageCollection> item in images)
                if (item.Key.FileName.Equals(filename, StringComparison.InvariantCultureIgnoreCase))
                {
                    GTempFile bakFile = new GTempFile(true);
                    GZip.Zip(item.Value.TempDir.Path + "\\*.*", bakFile.Path);
                    return bakFile;
                }
            return null;
        }

        /// <summary>
        /// Přejmenování obrázku
        /// </summary>
        /// <param name="oldName">Starý název obrázku</param>
        /// <param name="newName">Nový název obrázku</param>
        public static bool CopyImage(string oldName, string newName)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (desktop != null)
            {
                IViewContent content = desktop.ActiveViewContent;
                if (content != null)
                    return content.PrimaryFile != null ? CopyImage(oldName, newName, content.PrimaryFile) : false;
            }
            return false;
        }

        /// <summary>
        /// Přejmenování obrázku
        /// </summary>
        /// <param name="openedFile">otevřený soubor sestavy</param>
        /// <param name="oldName">Starý název obrázku</param>
        /// <param name="newName">Nový název obrázku</param>
        public static bool CopyImage(string oldName, string newName, OpenedFile openedFile)
        {
            if ((openedFile != null && !images.ContainsKey(openedFile))
                || string.IsNullOrEmpty(oldName)
                || string.IsNullOrEmpty(newName)
                || string.Equals(oldName, newName, StringComparison.InvariantCultureIgnoreCase))
                return CopyImage(oldName, newName);

            foreach (KeyValuePair<OpenedFile, ImageCollection> item in images)
                foreach (KeyValuePair<string, Image> subIte in item.Value)
                    if (string.Equals(subIte.Key, oldName, StringComparison.InvariantCultureIgnoreCase))
                    {
                        Image img = subIte.Value;
                        if (img != null)
                            images[openedFile].CopyItem(newName, img);

                        return true;
                    }

            return false;
        }
        #endregion
    }
}
