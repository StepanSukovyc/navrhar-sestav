//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.IconDescriptor.cs                     </Name>
//    <Description> Descriptor ikonek                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using Gordic.GFE.Parsers.Core;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Služba pro práci s ikonkami
    /// </summary>
    static class IconService
    {
        static Dictionary<string, string> extensionHashtable = new Dictionary<string, string>();

        readonly static char[] separators = { Path.DirectorySeparatorChar, Path.VolumeSeparatorChar };

        static IconService()
        {
            try { InitializeIcons(AddInTree.GetTreeNode("/Workspace/Icons")); }
            catch (TreePathNotFoundException) { }
        }

        /// <summary>
        /// Získání obrázku dle názvu
        /// </summary>
        /// <param name="name">Název obrázku</param>
        /// <returns></returns>
        public static Bitmap GetGhostBitmap(string name)
        {
            return GetGhostBitmap(GetBitmap(name));
        }

        /// <summary>
        /// Získání obrázku dle originálu
        /// </summary>
        /// <param name="bitmap">originál</param>
        /// <returns></returns>
        public static Bitmap GetGhostBitmap(Bitmap bitmap)
        {
            ColorMatrix clrMatrix = new ColorMatrix(new float[][] {
			                                        	new float[] {1, 0, 0, 0, 0},
			                                        	new float[] {0, 1, 0, 0, 0},
			                                        	new float[] {0, 0, 1, 0, 0},
			                                        	new float[] {0, 0, 0, 0.5f, 0},
			                                        	new float[] {0, 0, 0, 0, 1}
			                                        });

            ImageAttributes imgAttributes = new ImageAttributes();
            imgAttributes.SetColorMatrix(clrMatrix,
                                         ColorMatrixFlag.Default,
                                         ColorAdjustType.Bitmap);

            Bitmap ghostBitmap = new Bitmap(bitmap.Width, bitmap.Height, PixelFormat.Format32bppArgb);

            using (Graphics g = Graphics.FromImage(ghostBitmap))
            {
                g.FillRectangle(SystemBrushes.Window, new Rectangle(0, 0, bitmap.Width, bitmap.Height));
                g.DrawImage(bitmap, new Rectangle(0, 0, bitmap.Width, bitmap.Height), 0, 0, bitmap.Width, bitmap.Height, GraphicsUnit.Pixel, imgAttributes);
            }

            return ghostBitmap;
        }

        /// <summary>
        /// Získání obrázku dle názvu
        /// </summary>
        /// <param name="name">název obrázku</param>
        /// <returns></returns>
        public static Bitmap GetBitmap(string name)
        {
            Bitmap bmp;
            try { bmp = WinFormsResourceService.GetBitmap(name); }
            catch (ResourceNotFoundException) { bmp = null; }

            if (bmp != null)
                return bmp;

            return WinFormsResourceService.GetBitmap("Icons.16x16.MiscFiles");
        }

        /// <summary>
        /// Získání ikonky dle názvu
        /// </summary>
        /// <param name="name">Název ikonky</param>
        /// <returns></returns>
        public static Icon GetIcon(string name)
        {
            Icon icon = WinFormsResourceService.GetIcon(name);
            if (icon != null)
                return icon;

            return WinFormsResourceService.GetIcon("Icons.16x16.MiscFiles");
        }

        /// <summary>
        /// Získání obrázku dle typu projektu
        /// </summary>
        /// <param name="projectType"></param>
        /// <returns></returns>
        public static string GetImageForProjectType(string projectType)
        {
            return "Icons.16x16.SolutionIcon";
        }

        /// <summary>
        /// Získání obrázku dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <returns></returns>
        public static string GetImageForFile(string fileName)
        {
            string extension = Path.GetExtension(fileName).ToUpperInvariant();
            if (extension.Length == 0) extension = ".TXT";
            if (extensionHashtable.ContainsKey(extension))
                return extensionHashtable[extension];

            return "Icons.16x16.MiscFiles";
        }

        static void InitializeIcons(AddInTreeNode treeNode)
        {
            IconDescriptor[] icons = (IconDescriptor[])treeNode.BuildChildItems(null).ToArray(typeof(IconDescriptor));
            for (int i = 0; i < icons.Length; ++i)
            {
                IconDescriptor iconEntity = icons[i];
                string imageName = iconEntity.Resource ?? iconEntity.Id;

                if (iconEntity.Extensions != null)
                    foreach (string ext in iconEntity.Extensions)
                        extensionHashtable[ext.ToUpperInvariant()] = imageName;
            }
        }
    }
}
