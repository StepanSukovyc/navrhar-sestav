//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ExplorerItem.cs                        </Name>
//    <Description> Položka prohlížeče                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2012-03-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.GFE.Parsers;
using System.Runtime.InteropServices;
using System.Collections;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Pads
{
    /// <summary>
    /// Položka prohlížeče
    /// </summary>
    class FileExplorerNode : AbstractExtTreeNode
    {
        #region AbstractExtTreeNode
        /// <summary>
        /// Inicializace větve
        /// </summary>
        protected override void Initialize()
        {
            base.Initialize();
            ContextmenuAddinTreePath = "/ReportDesigner/Pads/FileExplorer/ContextMenu/FileNode";
        }
        #endregion
        static Boolean m_bHaveRootExplorer = false;

        /// <summary>
        /// IExplorerFolder rozhraní pro Desktop.
        /// </summary>
        public NativeMethods.IExplorerFolder RootExplorerFolder
        {
            get { return m_shRootExplorer; }
        }
        static NativeMethods.IExplorerFolder m_shRootExplorer = null;

        /// <summary>
        /// IShellFolder rozhraní pro danou položku.
        /// </summary>
        public NativeMethods.IExplorerFolder ExplorerFolder
        {
            get { return m_shExplorerFolder; }
        }
        NativeMethods.IExplorerFolder m_shExplorerFolder = null;

        IntPtr m_pIDL = IntPtr.Zero;
        /// <summary>
        /// Úplný PIDL pro položku Plocha.
        /// </summary>
        public IntPtr PIDL
        {
            get { return m_pIDL; }
        }

        /// <summary>
        /// Identifikuje, že daná položka je složkou
        /// </summary>
        public bool IsFolder { get; set; }

        /// <summary>
        /// Identifikuje, že daná položka má podsložky
        /// </summary>
        public bool HasSubFolder { get; set; }

        /// <summary>
        /// Cesta k této položce
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        protected FileExplorerNode()
        {
            sortOrder = 1;
            canLabelEdit = true;
        }

        /// <summary>
        /// Konstruktor třídy.
        /// Vytvoří položku pro Desktop.
        /// </summary>
        public FileExplorerNode(TreeView view)
            : this()
        {
            if (m_bHaveRootExplorer)
                throw new Exception(GResources.GetResourceText(29450485)); //RC 29450485 : Položka Desktop již existuje!

            int hRes = NativeMethods.SHGetDesktopFolder(ref m_shRootExplorer);
            if (hRes != 0)
                Marshal.ThrowExceptionForHR(hRes);

            hRes = NativeMethods.SHGetSpecialFolderLocation(IntPtr.Zero, NativeMethods.CSIDL.CSIDL_DESKTOP, ref m_pIDL);
            if (hRes != 0)
                Marshal.ThrowExceptionForHR(hRes);

            NativeMethods.SHFILEINFO shInfo = new NativeMethods.SHFILEINFO();
            NativeMethods.SHGetFileInfo(m_pIDL, 0, out shInfo, (uint)Marshal.SizeOf(shInfo),
                NativeMethods.SHGFI.SHGFI_DISPLAYNAME |
                NativeMethods.SHGFI.SHGFI_PIDL |
                NativeMethods.SHGFI.SHGFI_SMALLICON |
                NativeMethods.SHGFI.SHGFI_SYSICONINDEX
            );

            Text = shInfo.szDisplayName;
            ImageIndex = shInfo.iIcon;
            SelectedImageIndex = shInfo.iIcon;
            IsFolder = true;
            HasSubFolder = true;
            FileName = GetPath();

            m_shExplorerFolder = RootExplorerFolder;
            m_bHaveRootExplorer = true;
        }

        /// <summary>
        /// Systémová cesta k dané položce
        /// </summary>
        /// <returns>Řetězec prezentující cestu k položce.</returns>
        public string GetPath()
        {
            StringBuilder strBuffer = new StringBuilder(256);
            NativeMethods.SHGetPathFromIDList(
                m_pIDL,
                strBuffer
            );
            return strBuffer.ToString();
        }

        // TODO: nějak to nefunguje, musím hlídat (!exploreItems.Contains(shChild)) v metodě GetExplorerItems
        NativeMethods.SHCONTF folderFlag = NativeMethods.SHCONTF.SHCONTF_FOLDERS | NativeMethods.SHCONTF.SHCONTF_INCLUDEHIDDEN;
        NativeMethods.SHCONTF fileFlag = NativeMethods.SHCONTF.SHCONTF_NONFOLDERS | NativeMethods.SHCONTF.SHCONTF_INCLUDEHIDDEN;

        /// <summary>
        /// Obnovíme pole objektů ExplorerItem pro dílčí složky této položky
        /// </summary>
        /// <returns>ArrayList ExplorerItem objektů.</returns>
        /// <param name="isFolder">TRUE - berou se složky, FALSE - soubory</param>
        /// <param name="allItems">Indikuje, kdy brat vše bez ohledu na existující objekty v seznamu</param>
        private ArrayList GetSubItems(bool isFolder, bool allItems)
        {
            ArrayList result = new ArrayList();

            // Ujistíme se, že máme složku.
            if (!IsFolder)
                return result;

            try
            {
                // Získáme IEnumIDList rozhraní.
                NativeMethods.IEnumIDList pEnum = null;
                uint hRes = ExplorerFolder.EnumObjects(IntPtr.Zero, isFolder ? folderFlag : fileFlag, out pEnum);
                if (hRes == 0)
                {
                    IntPtr pIDL = IntPtr.Zero;
                    Int32 iGot = 0;

                    pEnum.Next(1, out pIDL, out iGot);

                    // pokračujeme u všech ostatních
                    while (!pIDL.Equals(IntPtr.Zero) && iGot == 1)
                    {
                        bool exists = false;
                        if (!allItems)
                        {
                            // Získáme atributy typu Ikonka atd..
                            NativeMethods.SHFILEINFO shInfo = new NativeMethods.SHFILEINFO();
                            NativeMethods.SHGFI vFlags =
                                NativeMethods.SHGFI.SHGFI_SMALLICON |
                                NativeMethods.SHGFI.SHGFI_SYSICONINDEX |
                                NativeMethods.SHGFI.SHGFI_PIDL |
                                NativeMethods.SHGFI.SHGFI_DISPLAYNAME;
                            NativeMethods.SHGetFileInfo(NativeMethods.ILCombine(PIDL, pIDL), 0, out shInfo, (uint)Marshal.SizeOf(shInfo), vFlags); 
                            string text = shInfo.szDisplayName;
                            foreach (TreeNode item in Nodes)
                                if ((item is FileExplorerNode) && string.Equals(item.Text, text, StringComparison.InvariantCultureIgnoreCase))
                                {
                                    exists = true;
                                    break;
                                }
                        }

                        if (!exists)
                            // Vytvoříme novou položku prohlížeče
                            result.Add(new FileExplorerNode(m_shRootExplorer, pIDL, this, isFolder));

                        Marshal.FreeCoTaskMem(pIDL);
                        pIDL = IntPtr.Zero;
                        iGot = 0;

                        // Jdeme na další položku
                        pEnum.Next(1, out pIDL, out iGot);
                    }

                    if (pEnum != null)
                        Marshal.ReleaseComObject(pEnum);
                }
            }
            catch (Exception ex)
            {
                System.Windows.Forms.MessageBox.Show(ex.Message, GResources.GetResourceText(29450189) + ": ", //RC 29450189 : Chyba
                    System.Windows.Forms.MessageBoxButtons.OK,
                    System.Windows.Forms.MessageBoxIcon.Error
                );
            }

            return result;
        }

        /// <summary>
        /// Konstruktor. 
        /// Vytvoří podpoložku dané položky
        /// </summary>
        /// <param name="shDesktop">IExplorerFolder rozhraní Desktop</param>
        /// <param name="pIDL">PIDL pro tuto položku prohlížeče</param>
        /// <param name="shParent">Nadřazená položka dané položky</param>
        /// <param name="isFolder">Indikuje, že potřebujeme najit všechny složky nebo soubory</param>
        public FileExplorerNode(NativeMethods.IExplorerFolder shDesktop, IntPtr pIDL, FileExplorerNode shParent, bool isFolder)
            : this()
        {
            if (!m_bHaveRootExplorer)
                throw new Exception(GResources.GetResourceText(29450483)); //RC 29450483 : Hlavní položka musí být vytvořena před tvorbou této položky!

            m_pIDL = NativeMethods.ILCombine(shParent.PIDL, pIDL);

            // Získáme vlastnosti dané položky
            NativeMethods.SFGAOF uFlags = NativeMethods.SFGAOF.SFGAO_FOLDER | NativeMethods.SFGAOF.SFGAO_HASSUBFOLDER | NativeMethods.SFGAOF.SFGAO_BROWSABLE
                | NativeMethods.SFGAOF.SFGAO_FILESYSTEM | NativeMethods.SFGAOF.SFGAO_LINK | NativeMethods.SFGAOF.SFGAO_HIDDEN;

            // základní PIDL
            shDesktop.GetAttributesOf(0, out m_pIDL, out uFlags);

            // Získáme atributy typu Ikonka atd..
            NativeMethods.SHFILEINFO shInfo = new NativeMethods.SHFILEINFO();
            NativeMethods.SHGFI vFlags =
                NativeMethods.SHGFI.SHGFI_SMALLICON |
                NativeMethods.SHGFI.SHGFI_SYSICONINDEX |
                NativeMethods.SHGFI.SHGFI_PIDL |
                NativeMethods.SHGFI.SHGFI_DISPLAYNAME;
            NativeMethods.SHGetFileInfo(m_pIDL, 0, out shInfo, (uint)Marshal.SizeOf(shInfo), vFlags);
            Text = shInfo.szDisplayName;
            ImageIndex = shInfo.iIcon;
            SelectedImageIndex = shInfo.iIcon;
            FileName = GetPath();
            //uFlags & win32.SFGAOF.SFGAO_FOLDER
            IsFolder = isFolder;//Directory.Exists(Path) && Convert.ToBoolean(uFlags & win32.SFGAOF.SFGAO_FOLDER);
            HasSubFolder = IsFolder && Convert.ToBoolean(uFlags & NativeMethods.SFGAOF.SFGAO_HASSUBFOLDER);
            EnsureVisible();

            // Vytvoření IExplorerFolder rozhraní pro danou položku.
            if (IsFolder)
            {
                uint hRes = shParent.m_shExplorerFolder.BindToObject(pIDL, IntPtr.Zero, ref NativeMethods.IID_IShellFolder, out m_shExplorerFolder);
                if (hRes != 0)
                    Marshal.ThrowExceptionForHR((int)hRes);
            }
        }

        /// <summary>
        /// Destrukce objektu
        /// </summary>
        ~FileExplorerNode()
        {
            // uvolnění IExplorerFolder rozhraní pro danou položku.
            if (m_shExplorerFolder != null)
                Marshal.ReleaseComObject(m_shExplorerFolder);

            if (!m_pIDL.Equals(IntPtr.Zero))
                Marshal.FreeCoTaskMem(m_pIDL);

            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Přetížení kvůli porovnání
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            if (!(obj is FileExplorerNode))
                return base.Equals(obj);
            FileExplorerNode explorerItem = (FileExplorerNode)obj;
            return this.RootExplorerFolder == explorerItem.RootExplorerFolder && String.Equals(Text, explorerItem.Text, StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Získání všech položek
        /// </summary>
        /// <param name="allItems">TRUE - všechny objekty bez ohledu na již existující</param>
        /// <returns></returns>
        internal List<FileExplorerNode> GetExplorerItems(bool allItems)
        {
            List<FileExplorerNode> exploreItems = new List<FileExplorerNode>();

            // získáme složky
            ArrayList arrChildren = GetSubItems(true, allItems);
            foreach (FileExplorerNode shChild in arrChildren)
                if (!exploreItems.Contains(shChild))
                    exploreItems.Add(shChild);

            // získáme soubory
            ArrayList arrChildrenFiles = GetSubItems(false, allItems);
            foreach (FileExplorerNode shChild in arrChildrenFiles)
                if (!exploreItems.Contains(shChild))
                    exploreItems.Add(shChild);

            return exploreItems;
        }

        /// <summary>
        /// Kvůli přetížení Equals
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        /// <summary>
        /// Řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return FileName;
        }

        #region IClipboardHandler
        /// <exclude/>
        public override bool EnableCut
        {
            get { return IsEditing ? false : true; }
        }

        /// <exclude/>
        public override bool EnableCopy
        {
            get { return IsEditing ? false : true; }
        }

        /// <exclude/>
        public override bool EnablePaste
        {
            get
            {
                IDataObject dataObject = ClipboardWrapper.GetDataObject();
                if (dataObject == null)
                    return false;
                if (dataObject.GetDataPresent(DataFormats.FileDrop))
                    return true;

                if (dataObject.GetDataPresent(typeof(FileExplorerNode)))
                {
                    FileOperationClipboardObject clipboardObject = dataObject.GetData(typeof(FileExplorerNode).ToString()) as FileOperationClipboardObject;
                    return clipboardObject != null && (File.Exists(clipboardObject.FileName) || Directory.Exists(clipboardObject.FileName));
                }
                return false;
            }
        }

        /// <exclude/>
        public override bool EnableDelete
        {
            get { return IsEditing ? false : true; }
        }

        /// <exclude/>
        public override void Delete()
        {
            //if (GMessageBox.ShowQuestion(string.Format(IsFolder ? "Opravdu si přejet odstranit složku '{0}'?" : "Opravdu si přejete odstranit soubor '{0}'?", FileName)) == DialogResult.Yes //RC 29451066 : Opravdu si přejete odstranit soubor 
            //    && FileService.RemoveFile(FileName, IsFolder))
            //{
            //    DockableControl dc = DefaultDesktop.Instance.GetControl(typeof(FileExplorerControl));
            //    if (dc != null && dc.ContentControl is FileExplorerControl)
            //        (dc.ContentControl as FileExplorerControl).Nodes.Remove((TreeNode)this);
            //}
        }

        /// <summary>
        /// Reakce na vyjmutí
        /// </summary>
        public override void Cut()
        {
            DoPerformCut = true;
            //ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, true));
        }

        /// <exclude/>
        public override void Copy()
        {
            //ClipboardWrapper.SetDataObject(FileOperationClipboardObject.CreateDataObject(this, false));
        }

        /// <exclude/>
        public override void Paste()
        {
            IDataObject dataObject = ClipboardWrapper.GetDataObject();
            if (dataObject == null)
                return;
            if (dataObject.GetDataPresent(typeof(FileExplorerNode)))
            {
                FileOperationClipboardObject clipboardObject = (FileOperationClipboardObject)dataObject.GetData(typeof(FileExplorerNode).ToString());
                // kontrola, zda kopírovaný objekt je složka
                if (Directory.Exists(clipboardObject.FileName))
                    CopyFileHere(clipboardObject.FileName, clipboardObject.PerformMove, true);
                // to bude soubor
                else if (File.Exists(clipboardObject.FileName))
                    CopyFileHere(clipboardObject.FileName, clipboardObject.PerformMove, false);

                if (clipboardObject.PerformMove)
                {
                    Clipboard.Clear();
                    //DockableControl dc = DefaultDesktop.Instance.GetControl(typeof(FileExplorerControl));
                    //if (dc != null && dc.ContentControl is FileExplorerControl)
                    //{
                    //    FileExplorerControl control = dc.ContentControl as FileExplorerControl;
                    //    if (control != null)
                    //    {
                    //        control.GetNodeForPath(clipboardObject.FullPath);

                    //        TreeNode node = control.GetNodeForPath(clipboardObject.FullPath);
                    //        if (node != null)
                    //            control.Nodes.Remove(node);
                    //    }
                    //}
                }
            }
        }

        private void CopyFileHere(string fileName, bool performMove, bool isFolder)
        {
            string shortFileName = System.IO.Path.GetFileName(fileName);
            string copiedFileName = IsFolder
                ? System.IO.Path.Combine(FileName, shortFileName)
                : System.IO.Path.Combine((new FileInfo(FileName)).DirectoryName, shortFileName);
            string sourceDirectory = System.IO.Path.GetDirectoryName(fileName);
            string itemPath = System.IO.Path.Combine(sourceDirectory, shortFileName);

            if (FileUtility.IsEqualFileName(fileName, copiedFileName))
                return;

            if (isFolder)
            {
                if (Directory.Exists(copiedFileName))
                {
                    MessageService.ShowWarningFormatted(GResources.GetResourceText(29450482) + " {0} " + GResources.GetResourceText(29450548), copiedFileName); //RC 29450482 : Složka
                    return;
                }
            }
            else if (File.Exists(copiedFileName))
            {
                MessageService.ShowWarningFormatted(GResources.GetResourceText(29450220) + " {0} " + GResources.GetResourceText(29450548), copiedFileName); //RC 29450220 : Soubor
                return;
            }
            //// zkopírovaný objekt je složka
            //if (isFolder)
            //    FileService.CopyDirectory(itemPath, copiedFileName);
            ////skopírovaný objekt je soubor
            //else
                File.Copy(itemPath, copiedFileName);

            if (performMove)
            {
                foreach (OpenedFile file in Gordic.GFE.WinClient.Services.FileAgent.OpenedFiles)
                    if (file.FileName != null &&
                        FileUtility.IsEqualFileName(file.FileName, fileName))
                        file.FileName = copiedFileName;
                Gordic.GFE.WinClient.Services.FileAgent.RemoveFile(fileName, isFolder);
            }
            if (!IsFolder)
            {
                if (Parent != null)
                    (Parent as FileExplorerNode).RefreshItems();
            }
            else
                RefreshItems();

            if (TreeView != null)
                TreeView.SelectedNode = this;
        }

        /// <summary>
        /// Aktualizace neexistujících položek
        /// </summary>
        public void RefreshItems()
        {
            if (Nodes.Count == 1
                && !(Nodes[0] is FileExplorerNode))
                Nodes.RemoveAt(0);

            List<FileExplorerNode> exploreItems = GetExplorerItems(false);
            foreach (FileExplorerNode shChild in exploreItems)
            {
                if (shChild.IsFolder && shChild.HasSubFolder)
                    shChild.Nodes.Add(GResources.GetResourceText(29450486)); //RC 29450486 : Seznam - se aktivuje po výběru.
                shChild.AddTo(this);
            }

            if (TreeView != null)
                TreeView.Sort();
        }
        #endregion

        /// <summary>
        /// Tažený objekt
        /// </summary>
        public override DataObject DragDropDataObject
        {
            get { return new DataObject(this); }
        }

        /// <summary>
        /// Získání efektu tažení (buď kopírování nebo přemístění)
        /// </summary>
        /// <param name="dataObject">Tažený objekt</param>
        /// <param name="proposedEffect">doporučený efekt</param>
        /// <returns></returns>
        public override DragDropEffects GetDragDropEffect(IDataObject dataObject, DragDropEffects proposedEffect)
        {
            if (dataObject.GetDataPresent(typeof(FileExplorerNode)))
            {
                // CTRL stisknuto.
                return System.Windows.Forms.Control.ModifierKeys == Keys.Control
                    ? DragDropEffects.Copy : DragDropEffects.Move;
            }
            
            return dataObject.GetDataPresent(DataFormats.FileDrop) ? DragDropEffects.Copy : DragDropEffects.None;
        }

        /// <summary>
        /// Přetažení objektu na větev
        /// </summary>
        /// <param name="dataObject">tažený objekt</param>
        /// <param name="effect">efekt tažení</param>
        public override void DoDragDrop(IDataObject dataObject, DragDropEffects effect)
        {
            if (dataObject == null)
                return;
            FileExplorerNode node = null;
            if (dataObject.GetDataPresent(typeof(FileExplorerNode)))
            {
                node = (FileExplorerNode)dataObject.GetData(typeof(FileExplorerNode));
                // kontrola, zda kopírovaný objekt je složka
                if (Directory.Exists(node.FileName))
                    CopyFileHere(node.FileName, effect == DragDropEffects.Move, true);
                // to bude soubor
                else if (File.Exists(node.FileName))
                    CopyFileHere(node.FileName, effect == DragDropEffects.Move, false);
            }

            if (effect == DragDropEffects.Move && node != null)
            {
                //DockableControl dc = DefaultDesktop.Instance.GetControl(typeof(FileExplorerControl));
                //if (dc != null && dc.ContentControl is FileExplorerControl)
                //    (dc.ContentControl as FileExplorerControl).Nodes.Remove(node);
            }
        }

        /// <summary>
        /// Po ukončení přemenování položky
        /// </summary>
        /// <param name="newName">Nový název položky</param>
        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;
            
            if (!Gordic.GFE.Parsers.Services.FileService.CheckDirectoryEntryName(newName))
                return;
            
            if (String.Compare(Text, newName, true) == 0)
                return;
            string oldFileName = FileName;
            string newFileName = Path.Combine(Path.GetDirectoryName(oldFileName), newName) + (IsFolder ? string.Empty : (new FileInfo(FileName)).Extension);
            TreeView tv = this.TreeView;
            if (Gordic.GFE.WinClient.Services.FileAgent.RenameFile(oldFileName, newFileName, IsFolder))
            {
                Text = newName;
                FileName = newFileName;
                if (IsFolder && Parent != null)
                {
                    m_pIDL = NativeMethods.ILCreateFromPath(FileName);

                    uint hRes = (Parent as FileExplorerNode).m_shExplorerFolder.BindToObject(PIDL, IntPtr.Zero, ref NativeMethods.IID_IShellFolder, out m_shExplorerFolder);
                    if (hRes != 0)
                        Marshal.ThrowExceptionForHR((int)hRes);
                    if (IsExpanded)
                        Expand();
                }
            }
        }

        /// <summary>
        /// Aktivace položky
        /// </summary>
        public override void ActivateItem()
        {
            Gordic.GFE.WinClient.Services.FileAgent.OpenFile(FileName);
        }
    }
}
