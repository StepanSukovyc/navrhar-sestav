//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OpenedFile.cs                            </Name>
//    <Description> Prezentuje otevřený soubor.                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Prezentuje otevřený soubor.
    /// </summary>
    public abstract class OpenedFile : ICanBeDirty, IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing}");
#endif
            if (disposing)
                if (tempDir != null)
                {
                    tempDir.Dispose();
                    tempDir = null;
                }
        }
        ~OpenedFile() { Dispose(false); }
        #endregion

        /// <summary>
        /// indikuje, že soubor je archiv
        /// </summary>
        public bool IsArchive => !string.IsNullOrEmpty(FileName) && Path.GetExtension(FileName).Equals(".alfx", StringComparison.InvariantCultureIgnoreCase);

        GFETempDir tempDir;
        /// <summary>
        /// dočasné úložiště otevřeného souboru
        /// </summary>
        public GFETempDir TemporaryDirectory
        {
            get
            {
                if (tempDir == null)
                {
                    var _fileName = FileName;

                    if (string.IsNullOrEmpty(_fileName) || !FileUtility.TestFileExists(_fileName))
                        _fileName = ContentFileName;

                    if (FileUtility.TestFileExists(_fileName))
                    {
                        if (!IsArchive && _fileName == ContentFileName)
                        {
                            string zipFile = FileUtility.Combine(Path.GetDirectoryName(_fileName), Path.GetFileNameWithoutExtension(_fileName) + ".zip");
                            if (FileUtility.TestFileExists(zipFile))
                                tempDir = new GFETempDir(zipFile);
                        }
                        else
                            tempDir = new GFETempDir(ContentFileName);
                    }

                    if (tempDir == null)
                        tempDir = new GFETempDir();
                }

                return tempDir;
            }
        }

        #region IsDirty
        bool isDirty;
        /// <summary>
        /// Volá se po změně hodnoty IsDirty
        /// </summary>
        public event EventHandler IsDirtyChanged;

        /// <summary>
        /// Indikuje existencí neuložených změn
        /// </summary>
        public bool IsDirty
        {
            get => isDirty;
            set
            {
                if (isDirty != value)
                {
                    isDirty = value;
                    IsDirtyChanged?.Invoke(this, EventArgs.Empty);
                }
            }
        }

        /// <summary>
        /// Označení souboru jakožto pozměněného,
        ///  pokud momentálně není operace načtení
        /// </summary>
        public virtual void MakeDirty()
        {
            if (!InLoadOperation)
                this.IsDirty = true;
        }
        #endregion

        /// <summary>
        /// indikuje, že soubor pochází z databáze
        /// </summary>
        public bool IsDatabase { get; set; }

        /// <summary>
        /// indikuje rušení operace uložení
        /// </summary>
        public bool CancelSaving { get; set; }

        /// <summary>
        /// kódování souboru uvedené v hlavičce souboru
        /// </summary>
        public Encoding Encoding { get; set; }

        /// <summary>
        /// indikuje, že stav načtení souboru
        /// </summary>
        public bool InLoadOperation { get; set; }

        /// <summary>
        /// Aktuální pohled na soubor
        /// </summary>
        protected IViewContent currentView;
        bool inSaveOperation;

        /// <summary>
        /// data souboru
        /// </summary>
        public byte[] FileData { get; private set; }

        /// <summary>
        /// Indikuje, zda soubor je bez názvu. 
        /// Soubory bez názvu vyvolávají dialogové okno "Uložit jako" když se pokoušíme soubor uložit.
        /// </summary>
        public bool IsUntitled { get; protected set; }

        string fileName;
        /// <summary>
        /// Název souboru.
        /// </summary>
        public string FileName
        {
            get => fileName;
            set
            {
                if (fileName == value) return;

                value = FileUtility.NormalizePath(value);

                if (fileName != value)
                    ChangeFileName(value);
            }
        }

        string contentFileName;
        /// <summary>
        /// název souboru s obsahem
        /// např. ALFX soubor obsahuje main.alf - což je soubor s obsahem
        /// </summary>
        public string ContentFileName
        {
            get => string.IsNullOrEmpty(contentFileName) ? FileName : contentFileName;
            set
            {
                if (contentFileName == value) return;

                value = FileUtility.NormalizePath(value);

                if (contentFileName != value)
                    contentFileName = value;
            }
        }

        /// <summary>
        /// Reakce na změnu názvu souboru
        /// </summary>
        /// <param name="newValue">Nový název souboru</param>
        protected virtual void ChangeFileName(string newValue)
        {
            fileName = newValue;
            FileNameChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Volá se pozměně názvu souboru.
        /// </summary>
        public event EventHandler FileNameChanged;

        /// <summary>
        /// Uložení kopií obsahu souboru na disk se zadaným názvem.
        /// </summary>
        /// <param name="filename">Umístění kopií</param>
        public virtual void SaveTempToDisk(string filename)
        {
            if (string.IsNullOrEmpty(filename))
                return;

            CancelSaving = false;
            using (FileStream fs = new FileStream(filename, FileMode.Create, FileAccess.ReadWrite))
            {
                if (currentView != null)
                    SaveCurrentViewToStream(fs);
                else
                    fs.Write(FileData, 0, FileData.Length);
            }

            if (!CancelSaving)
            {
                string zipsource = ImageService.GetZippedImage(this);

                if (zipsource == null)
                    zipsource = FileUtility.Combine(Path.GetDirectoryName(FileName), Path.GetFileNameWithoutExtension(FileName) + ".zip");

                if (FileUtility.TestFileExists(zipsource))
                    try
                    {
                        string zipdest = FileUtility.Combine(Path.GetDirectoryName(filename), Path.GetFileNameWithoutExtension(filename) + ".zip");
                        File.Move(zipsource, zipdest);
                    }
                    catch (UnauthorizedAccessException) { System.Threading.Thread.Sleep(250); }
            }
        }

        /// <summary>
        /// Uložení souboru na disk s novým názvem.
        /// </summary>
        /// <param name="newFileName">Nový název souboru</param>
        public void SaveToDisk(string newFileName)
        {
            this.FileName = newFileName;
            this.IsUntitled = false;
            SaveToDisk();
        }

        /// <summary>
        /// Registrace pohledu
        /// </summary>
        /// <param name="view">Pohled k registraci</param>
        public abstract void RegisterView(IViewContent view);
        /// <summary>
        /// Odregistrování pohledu
        /// </summary>
        /// <param name="view">Pohled</param>
        public abstract void UnregisterView(IViewContent view);

        /// <summary>
        /// Zavření všech pohledu na soubor
        /// </summary>
        public virtual void CloseIfAllViewsClosed() { FileService.OpenedFileClosed(this); }

        /// <summary>
        /// Rychlá inicializace pohledu.
        /// </summary>
        /// <param name="view">Pohled k inicializací</param>
        public virtual void ForceInitializeView(IViewContent view)
        {
            if (view == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450441)); //RC 29450441 : Pohled nelze inicializovat - není uvedený!

            if (currentView != view)
                if (currentView == null)
                    SwitchedToView(view);  // Zde ignorujeme návrat hodnotu - init se musí provést
                else
                    try
                    {
                        InLoadOperation = true;
                        using (Stream sourceStream = OpenRead())
                            view.Load(this, sourceStream);
                    }
                    finally { InLoadOperation = false; }

            view.OnAfterInitialize();
        }

        /// <summary>
        /// Seznam pohledů registrovaných daným souborem
        /// </summary>
        public abstract IList<IViewContent> RegisteredViewContents { get; }

        /// <summary>
        /// Aktuální pohled, který edituje daný soubor.
        /// Pokud pohledů je více, pak daný je poslední aktivní.
        /// Je NULL, pokud pohledy jsou registrované aposlední aktivní byl uzavřen.
        /// V tomto případě soubor je uložen do pamětí a načte se po aktivací libovolného sekundarního pohledu.
        /// </summary>
        public IViewContent CurrentView => currentView;

        /// <summary>
        /// Otevření souboru pro načtení.
        /// </summary>
        public virtual Stream OpenRead()
        {
            if (FileData != null)
                return new MemoryStream(FileData, false);
            else if (FileUtility.TestFileExists(ContentFileName))
                return new FileStream(ContentFileName, FileMode.Open, FileAccess.Read);

            return new MemoryStream();
        }

        /// <summary>
        /// Otevření souboru pro načtení.
        /// </summary>
        public Stream OpenRead(string refFile)
        {
            if (!string.IsNullOrEmpty(refFile))
                ContentFileName = refFile;

            return OpenRead();
        }

        /// <summary>
        /// Uložení interně uložených dat do specifického bitového pole.
        /// </summary>
        /// <remarks></remarks>
        public virtual void SetData(byte[] fileData)
        {
            if (InLoadOperation)
                throw new InvalidOperationException(GResources.GetResourceText(29450443)); //RC 29450443 : Při načtení data nelze nastavit!
            if (inSaveOperation)
                throw new InvalidOperationException(GResources.GetResourceText(29450444)); //RC 29450444 : Při uložení data nelze nastavit!

            this.FileData = fileData ?? throw new ArgumentNullException(GResources.GetResourceText(29450442));
        }

        /// <summary>
        /// Uložení s použitím dočasných souboru
        /// </summary>
        /// <param name="saveusingtemporaryfile">Indikuje nutnost použití dočasného souboru</param>
        public void SaveToDisk(bool saveusingtemporaryfile)
        {
            if (IsUntitled)
                throw new InvalidOperationException(GResources.GetResourceText(29450445)); //RC 29450445 : Soubor bez názvu nelze uložit!

            CancelSaving = false;
            LoggingService.Debug($"{GResources.GetResourceText(29450446)} '{FileName}' ..."); //RC 29450446 : uložení
            bool safeSaving = saveusingtemporaryfile && File.Exists(FileName);
            string saveAs = safeSaving ? FileName + ".bak" : FileName;
            using (FileStream fs = new FileStream(saveAs, FileMode.Create, FileAccess.Write))
            {
                if (currentView != null)
                    SaveCurrentViewToStream(fs);
                else
                    fs.Write(FileData, 0, FileData.Length);
            }

            if (safeSaving
                && !CancelSaving)
            {
                DateTime creationTime = File.GetCreationTimeUtc(FileName);
                File.Delete(FileName);
                try { File.Move(saveAs, FileName); }
                catch (UnauthorizedAccessException)
                {
                    // občas File.Move vyhodí chyb (TortoiseSVN, Anti-vir ?)
                    // zkusíme znovu po krátké přestavce
                    System.Threading.Thread.Sleep(250);
                    File.Move(saveAs, FileName);
                }
                File.SetCreationTimeUtc(FileName, creationTime);
            }

            if (!CancelSaving)
                IsDirty = false;
        }

        /// <summary>
        /// Uložení souboru na disk.
        /// </summary>
        public virtual void SaveToDisk() { SaveToDisk(true); }
        /// <summary>
        /// kopírování pomocných souboru v archivu (*.zip) do určeného umístění
        /// </summary>
        /// <param name="oldName">starý název sestavy</param>
        public virtual void CopyArchive(string oldName)
        {
            CompilationUnit unit = (CompilationUnit)CompilationService.Units[this];
            LoggingService.DebugFormatted(string.Join(" ", GResources.GetResourceText(29450447), "'{0}'", GResources.GetResourceText(29450448), "'{1}'..."), oldName, FileName); //RC 29450448 : sestavy do nového
            string dest = IsArchive
                ? Path.GetFullPath(FileName)
                : FileUtility.Combine(Path.GetDirectoryName(FileName), Path.GetFileNameWithoutExtension(FileName) + ".zip");

            // odstraníme starý archiv
            if (FileUtility.TestFileExists(dest))
            {
                LoggingService.DebugFormatted(GResources.GetResourceText(29450449) + " '{0}'...", dest); //RC 29450449 : odstranění starého archivu
                File.Delete(dest);
            }

            DirectoryInfo dirInfo = new DirectoryInfo(
                !string.IsNullOrEmpty(unit.ZipResources)
                ? (new GFETempDir(unit.ZipResources)).Path
                : TemporaryDirectory.Path);

            bool destExists = false;
            // pokud se jedná o formát *.alfx
            // pak je zapotřebí nakopírovát main.alf jakožto cílový archiv
            if (IsArchive)
            {
                LoggingService.DebugFormatted(GResources.GetResourceText(29450451) + " '{0}' " + GResources.GetResourceText(29450450) + " '{1}'...", ContentFileName, dest); //RC 29450451 : archivace
                GZip.Zip(ContentFileName, dest);
                destExists = true;
            }

            // teď nakopírujeme vše, co je/bylo v archivu
            List<FileInfo> files = dirInfo.GetFiles().ToList();
            // případ zejména Office sestav, kdy v ZIP archivu nemusí být všechny šablony
            if (!dirInfo.FullName.Equals(TemporaryDirectory.Path))
                files.AddRange(TemporaryDirectory.GetFiles().ToList().Select(f => f).Where(f => !files.Exists(ff => ff.Name.Equals(f.Name)) && (f.Attributes & FileAttributes.Hidden) == 0).ToList());

            // vyloučíme skryté soubory
            var filtered = files.Select(f => f)
                                .Where(f => (f.Attributes & FileAttributes.Hidden) == 0);

            // musíme obsah 'source' rozarchivovat a nakopírovát do 'dest'
            foreach (var item in filtered)
                if (!item.Extension.Equals(".alf", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (!destExists)
                    {
                        GZip.Zip(item.FullName, dest);
                        destExists = true;
                    }
                    else
                        GZip.ZipAdd(item.FullName, dest);
                    // u *.alfx sestav ContentFileName se nachází v dočasné složce
                    // a proto k němu nakopírujeme i zdroje
                    if (IsArchive)
                    {
                        string newName = FileUtility.Combine(Path.GetDirectoryName(ContentFileName), item.Name);
                        if (!FileUtility.TestFileExists(newName))
                            File.Copy(item.FullName, FileUtility.Combine(Path.GetDirectoryName(ContentFileName), item.Name));
                    }
                }

            FileUtility.RaiseArchiveCopied(new FileNameEventArgs(FileName, false));
        }

        /// <summary>
        /// Uložení aktuálního pohledu
        /// </summary>
        protected void SaveCurrentView()
        {
            CancelSaving = false;
            using (MemoryStream memoryStream = new MemoryStream())
            {
                SaveCurrentViewToStream(memoryStream);
                if (!CancelSaving)
                    FileData = memoryStream.ToArray();
            }
        }

        /// <summary>
        /// Přepnutí na pohled
        /// </summary>
        /// <param name="newView">Pohled pro přepnutí</param>
        /// <returns>True pokud se přepnutí podařilo, false pokud bylo zablokováno</returns>
        protected bool SwitchedToView(IViewContent newView)
        {
            if (currentView != null && !currentView.CanSafelySwitchFromThisView)
                return false;  // Zablokováno - nelze bezpečně přepnout

            if (currentView != newView)
            {
                if (currentView != null && (newView.SupportsSwitchToThisWithoutSaveLoad(this, currentView)
                    || currentView.SupportsSwitchFromThisWithoutSaveLoad(this, newView)))
                {
                    // přepnuí bez Save/Load
                    currentView.SwitchFromThisWithoutSaveLoad(this, newView);
                    newView.SwitchToThisWithoutSaveLoad(this, currentView);

                    currentView = newView;
                    return true;
                }
                if (currentView != null)
                    SaveCurrentView();
                try
                {
                    InLoadOperation = true;
                    Property memento = GetMemento(newView);
                    using (Stream sourceStream = OpenRead())
                    {
                        currentView = newView;
                        FileData = null;
                        newView.Load(this, sourceStream);
                    }
                    RestoreMemento(newView, memento);
                }
                finally { InLoadOperation = false; }
            }
            return true;  // Přepnutí úspěšné
        }
        /// <summary>
        /// Odstranění souboru z disku
        /// </summary>
        public virtual void ReloadFromDisk()
        {
            var r = FileUtility.ObservedLoad(ReloadFromDiskInternal, FileName);
            if (r == FileOperationResult.Failed && currentView != null && currentView.DesktopWindow != null)
                currentView.DesktopWindow.CloseWindow(true);
        }

        /// <summary>
        /// nastavení hodnoty IsUntitled dle uvedeného parametru.
        /// </summary>
        /// <param name="value">daný parametr</param>
        public void SetUntitled(bool value) { IsUntitled = true; }

        void ReloadFromDiskInternal()
        {
            FileData = null;
            if (currentView != null)
                try
                {
                    InLoadOperation = true;
                    Property memento = GetMemento(currentView);
                    using (Stream sourceStream = OpenRead())
                        currentView.Load(this, sourceStream);
                    IsDirty = false;
                    RestoreMemento(currentView, memento);
                }
                finally { InLoadOperation = false; }
        }
        void SaveCurrentViewToStream(Stream stream)
        {
            inSaveOperation = true;
            try { currentView.Save(this, stream); }
            finally { inSaveOperation = false; }
        }

        static Property GetMemento(IViewContent viewContent) => (viewContent as IMementoCapable)?.CreateMemento();

        static void RestoreMemento(IViewContent viewContent, Property memento)
        {
            if (memento != null)
                ((IMementoCapable)viewContent).SetMemento(memento);
        }
    }

    /// <summary>
    /// údaje o databázové položce
    /// </summary>
    public class DatabaseItem
    {
        /// <summary>
        /// ixsalv
        /// </summary>
        public string IXSALV { get; set; }

        /// <summary>
        /// ixsfrm
        /// </summary>
        public string IXSFRM { get; set; }
    }
}
