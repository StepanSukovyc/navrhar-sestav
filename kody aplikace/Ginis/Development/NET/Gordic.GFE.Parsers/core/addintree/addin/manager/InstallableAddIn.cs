//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InstallableAddIn.cs                      </Name>
//    <Description> tøída instalovatelných doplòkù                              </Description>
//    <Author>      Mgr. Stepan Sukovyè                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Gordic.GFE.Parsers.AddInManager
{
    /// <summary>
    /// soubor doplòku
    /// </summary>
    class ZipFile : IEnumerable
    {
        #region IEnumerable
        /// <exclude/>
        public IEnumerator GetEnumerator()
        {
            throw new NotImplementedException();
        }
        #endregion

        readonly string fileName;
        /// <summary>
        /// vytvoøení nové instace tøídy
        /// </summary>
        /// <param name="fileName">název souboru</param>
        public ZipFile(string fileName)
        {
            // TODO: Complete member initialization
            this.fileName = fileName;
        }

        /// <summary>
        /// získání vstupního proudu
        /// </summary>
        /// <param name="addInEntry">jednotka doplòku</param>
        /// <returns></returns>
        internal Stream GetInputStream(ZipEntry addInEntry)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// uzavøení souboru doplòku
        /// </summary>
        internal void Close()
        {
            throw new NotImplementedException();
        }
    }
    /// <summary>
    /// jednotka archivu
    /// </summary>
    class ZipEntry : ICloneable
    {
        #region ICloneable
        /// <exclude/>
        public object Clone()
        {
            throw new NotImplementedException();
        }
        #endregion

        /// <summary>
        /// název jednotky
        /// </summary>
        public string Name { get; set; }
    }
    /// <summary>
    /// rychlý archiv
    /// </summary>
    class FastZip
    {
        public FastZip() { }
        /// <summary>
        /// vytoøení prázdné složky
        /// </summary>
        public bool CreateEmptyDirectories { get; set; }

        public void CreateZip(string zipFileName, string sourceDirectory, bool recurse, string fileFilter)
        { }
        public void CreateZip(string zipFileName, string sourceDirectory, bool recurse, string fileFilter, string directoryFilter) { }
        public void ExtractZip(string zipFileName, string targetDirectory, string fileFilter) { }
        public void ExtractZip(string zipFileName, string targetDirectory, FastZip.Overwrite overwrite, FastZip.ConfirmOverwriteDelegate confirmDelegate, string fileFilter, string directoryFilter) { }

        /// <summary>
        /// stavy vytvoøení archivu
        /// </summary>
        public enum Overwrite
        {
            Prompt = 0,
            Never = 1,
            Always = 2,
        }
        /// <summary>
        /// operace, která probìhné po potvrzení pøepisu
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public delegate bool ConfirmOverwriteDelegate(string fileName);
    }

    /// <summary>
    /// tøída instalovatelných doplòkù
    /// </summary>
    public class InstallableAddIn
    {
        AddIn addIn;
        /// <summary>
        /// doplnìk
        /// </summary>
        public AddIn AddIn { get { return addIn; } }

        readonly string fileName;
        readonly bool isPackage;

        /// <summary>
        /// vytvoøení nové instzance tøídy
        /// </summary>
        /// <param name="fileName">název souboru doplòku</param>
        /// <param name="isPackage">balíèek, ve kterém se soubor nachází</param>
        public InstallableAddIn(string fileName, bool isPackage)
        {
            this.fileName = fileName;
            this.isPackage = isPackage;
            if (isPackage)
            {
                ZipFile file = new ZipFile(fileName);
                try { LoadAddInFromZip(file); }
                finally { file.Close(); }
            }
            else
                addIn = AddIn.Load(fileName);
            
            if (addIn.Manifest.PrimaryIdentity == null)
                throw new AddInLoadException(GResources.GetResourceText(29450539));
        }

        /// <summary>
        /// instalaced doplòku
        /// </summary>
        /// <param name="isUpdate">TRUE - nejedná se o instalaci ale pouze o aktualizací</param>
        public void Install(bool isUpdate)
        {
            foreach (string identity in addIn.Manifest.Identities.Keys)
                Core.AddInManager.AbortRemoveUserAddInOnNextStart(identity);

            if (isPackage)
            {
                string targetDir = Path.Combine(Core.AddInManager.AddInInstallTemp, addIn.Manifest.PrimaryIdentity);
                if (Directory.Exists(targetDir))
                    Directory.Delete(targetDir, true);

                Directory.CreateDirectory(targetDir);
                FastZip fastZip = new FastZip
                {
                    CreateEmptyDirectories = true
                };
                fastZip.ExtractZip(fileName, targetDir, null);

                addIn.Action = AddInAction.Install;
                if (!isUpdate)
                    AddInTree.InsertAddIn(addIn);
            }
            else
                Core.AddInManager.AddExternalAddIns(new AddIn[] { addIn });
        }
        /// <summary>
        /// zrušení aktualizace seznamu doplòkù
        /// </summary>
        /// <param name="addIns">seznam doplòkù ke zrušení instalace</param>
        public static void CancelUpdate(IList<AddIn> addIns)
        {
            foreach (AddIn addIn in addIns)
                foreach (string identity in addIn.Manifest.Identities.Keys)
                {
                    // odstranìní z doèasné složky instalace doplòku (pokud probíhá insatlace nebo aktualizace)
                    string targetDir = Path.Combine(Core.AddInManager.AddInInstallTemp, identity);
                    if (Directory.Exists(targetDir))
                        Directory.Delete(targetDir, true);
                }
        }
        /// <summary>
        /// odinstalování doplòkù
        /// </summary>
        /// <param name="addIns">seznam doplòkù k odinstalací</param>
        public static void Uninstall(IList<AddIn> addIns)
        {
            CancelUpdate(addIns);
            foreach (AddIn addIn in addIns)
                foreach (string identity in addIn.Manifest.Identities.Keys)
                {
                    // odstrtanìní uživatelského doplòku
                    string targetDir = Path.Combine(Core.AddInManager.UserAddInPath, identity);
                    if (Directory.Exists(targetDir))
                    {
                        if (!addIn.Enabled)
                            try
                            {
                                Directory.Delete(targetDir, true);
                                continue;
                            }
                            catch { }
                        Core.AddInManager.RemoveUserAddInOnNextStart(identity);
                    }
                }
        }

        void LoadAddInFromZip(ZipFile file)
        {
            ZipEntry addInEntry = null;
            foreach (ZipEntry entry in file)
                if (entry.Name.EndsWith(".addin"))
                {
                    if (addInEntry != null)
                        throw new AddInLoadException(GResources.GetResourceText(29450540));
                    addInEntry = entry;
                }

            if (addInEntry == null)
                throw new AddInLoadException(GResources.GetResourceText(29450541));

            using (Stream s = file.GetInputStream(addInEntry))
            using (StreamReader r = new StreamReader(s))
                addIn = AddIn.Load(r);
        }

    }
}
