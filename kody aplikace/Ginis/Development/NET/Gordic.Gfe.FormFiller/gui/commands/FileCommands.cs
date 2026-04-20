//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FileCommands.cs                       </Name>
//    <Description> Otevřit                                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.WinForms.Controls;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.FileCommands
{
    /// <summary>
    /// Otevřit
    /// </summary>
    class OpenFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu Open
        /// </summary>
        public override void Run()
        {
            //if (this.Owner is GLinkLabel && !string.IsNullOrEmpty((string)((GLinkLabel)Owner).Tag))
            //    FileAgent.OpenFile((string)((GLinkLabel)Owner).Tag);
            //else 
            OpenNew();
        }

        static void OpenNew()
        {
            using (OpenFileDialog fdiag = new OpenFileDialog())
            {
                fdiag.AddExtension = true;

                string[] fileFilters = (string[])(AddInTree.GetTreeNode("/FormFiller/Desktop/OpenFileFilter").BuildChildItems(null)).ToArray(typeof(string));
                fdiag.Filter = String.Join("|", fileFilters);
                bool foundFilter = false;

                // nastavení filtru hledání souboru
                if (!foundFilter)
                {
                    IViewContent content = SimpleDesktop.Desktop.ActiveViewContent;
                    if (content != null)
                    {
                        string extension = Path.GetExtension(content.PrimaryFileName);
                        if (string.IsNullOrEmpty(extension) == false)
                            for (int i = 0; i < fileFilters.Length; ++i)
                                if (fileFilters[i].IndexOf(extension) >= 0)
                                {
                                    fdiag.FilterIndex = i + 1;
                                    foundFilter = true;
                                    break;
                                }
                    }
                }

                if (!foundFilter)
                    fdiag.FilterIndex = fileFilters.Length;

                fdiag.Multiselect = true;
                fdiag.CheckFileExists = true;

                if (fdiag.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                    foreach (string name in fdiag.FileNames)
                        FileAgent.OpenFile(name);
            }
        }

        /// <summary>
        /// Otevření souboru
        /// </summary>
        /// <param name="sender">vlastník příkazu</param>
        /// <param name="args">argumenty příkazu</param>
        public static void OnOpen(object sender, EventArgs args)
        {
            if (sender is GLinkLabel && ((GLinkLabel)sender).Tag is RecentOpenFile)
                FileAgent.OpenFile(((GLinkLabel)sender).Tag as RecentOpenFile);
            else OpenNew();
        }
    }
    /// <summary>
    /// Uložení souboru
    /// </summary>
    class SaveFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            Save(SimpleDesktop.Desktop.ActiveDesktopWindow);
        }

        /// <summary>
        /// Uložení souboru okna
        /// </summary>
        /// <param name="window">Okno s pohledem na obsah</param>
        internal static void Save(IDesktopWindow window)
        {
            window.ViewContents.ForEach(Save);
        }

        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="content">Obsah pro uložení</param>
        public static void Save(IViewContent content)
        {
            using (AsynchronousWaitDialog monitor = new AsynchronousWaitDialog(GResources.GetResourceText(29450055))) //RC 29450055 : uložení dokumentu
            {
                ContentService.Save(content, SimpleDesktop.MainForm);
                monitor.Stop();
            }
        }

        /// <summary>
        /// Uložení otevřeného souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        public static void Save(OpenedFile file)
        {
            using (AsynchronousWaitDialog monitor = new AsynchronousWaitDialog(GResources.GetResourceText(29450055))) //RC 29450055 : uložení dokumentu
            {
                ContentService.Save(file, SimpleDesktop.MainForm, false);
                monitor.Stop();
            }
        }
    }

    /// <summary>
    /// Příkaz Uložit jako...
    /// </summary>
    class SaveFileAs : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                return SimpleDesktop.Desktop.ActiveViewContent != null && SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile != null;
            }
        }
        /// <summary>
        /// Spuštění příkazu Uložit jako...
        /// </summary>
        public override void Run()
        {
            Save(SimpleDesktop.Desktop.ActiveDesktopWindow);
        }

        /// <summary>
        /// Uložení obsahu okna
        /// </summary>
        /// <param name="window">Okno pro uložení</param>
        internal static void Save(IDesktopWindow window)
        {
            // uložime zbývající soubory najednou (zobrazení Save As dialogu)
            ContentService.SaveAs(window.ViewContents).SelectMany(content => content.Files).Distinct().ForEach(Save);
        }

        /// <summary>
        /// Uožení souboru (s vyvoláním okna Uložit jako)
        /// </summary>
        /// <param name="file">Ukládaný soubor</param>
        public static void Save(OpenedFile file)
        {
            ContentService.SaveOpenedFile(file, SimpleDesktop.MainForm);
        }
    }
    /// <summary>
    /// Uložení souboru
    /// </summary>
    class SaveFileToDatabase : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                return SimpleDesktop.Desktop.ActiveViewContent != null
                    && SimpleDesktop.Desktop.ActiveViewContent.PrimaryFile != null;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            //DatabaseService.ObservedSave();
        }

        /// <summary>
        /// Uložení obsahu do databáze
        /// </summary>
        /// <param name="eventHandlerOpenedFileArgument"></param>
        internal static void Save(EventHandlerOpenedFileArgument eventHandlerOpenedFileArgument)
        {
            foreach (IViewContent content in SimpleDesktop.Desktop.ActiveDesktopWindow.ViewContents)
                Save(content, eventHandlerOpenedFileArgument);
        }

        static void Save(IViewContent content, EventHandlerOpenedFileArgument eventHandlerOpenedFileArgument)
        {
            if (content != null)
            {
                if (content is ICustomizedCommands)
                    if (((ICustomizedCommands)content).SaveToDatabaseCommand(eventHandlerOpenedFileArgument))
                        return;

                if (content.IsViewOnly)
                    return;
            }
        }

    }
    /// <summary>
    /// Zavření souboru
    /// </summary>
    class CloseFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveDesktopWindow != null)
                SimpleDesktop.Desktop.ActiveDesktopWindow.CloseWindow(false);
        }
    }

    /// <summary>
    /// Otevře složku obsahující vybraný soubor.
    /// </summary>
    class OpenFolderContainingFile : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            RecentOpenFile rof = this.Owner is GLinkLabel ? ((GLinkLabel)Owner).Tag as RecentOpenFile : null;
            if (rof != null)
                OpenContainingFolderInExplorer(rof.Path);
            //OpenContainingFolderInExplorer(this.Owner is GLinkLabel ? (string)((GLinkLabel)Owner).Tag : string.Empty);
        }

        /// <summary>
        /// Otevření složky obsahující uvedený soubor
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static void OpenContainingFolderInExplorer(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
                if (!File.Exists(fileName))
                    MessageService.ShowError(string.Format(GResources.GetResourceText(29450044) + " '{0}' " + GResources.GetResourceText(29450049), fileName)); //RC 29450044 : Soubor
                else
                    Process.Start("explorer", "/select,\"" + fileName + "\"");
        }

    }
    /// <summary>
    /// Otevře složku obsahující vybraný soubor.
    /// </summary>
    class RemoveRecentOpen : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            RecentOpenFile fileName = this.Owner is GLinkLabel ? ((GLinkLabel)Owner).Tag as RecentOpenFile : null;
            if (fileName != null)
                FileAgent.RecentOpen.FileOrProjectRemove(null, new FileEventArgs(fileName.Path, false));
        }
    }

    /// <summary>
    /// Zavření všech oken
    /// </summary>
    class CloseAllWindows : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            SimpleDesktop.Desktop.CloseAllViews();
        }
    }

    /// <summary>
    /// Uložit všechny aktuálně otevřené
    /// </summary>
    class SaveAllFiles : AbstractMenuCommand
    {
        /// <summary>
        /// Uložit vše
        /// </summary>
        public static void SaveAll()
        {
            foreach (IViewContent content in SimpleDesktop.Desktop.ViewContentCollection)
                if (content is ICustomizedCommands && content.IsDirty)
                    ((ICustomizedCommands)content).SaveCommand();
            foreach (OpenedFile file in FileAgent.OpenedFiles)
                if (file.IsDirty)
                    SaveFile.Save(file);
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { SaveAll(); }
    }

}
