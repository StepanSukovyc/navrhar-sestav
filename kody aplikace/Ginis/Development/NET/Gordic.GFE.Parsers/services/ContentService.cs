//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentService.cs                        </Name>
//    <Description> Služba pro práci s obsahem                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro práci s obsahem
    /// </summary>
    public static class ContentService
    {
        /// <summary>
        /// Sjednocení metodiky uložení obsahu pohledů
        /// </summary>
        /// <param name="viewContents">Seznam pohledů k uložení</param>
        /// <returns>Seznam neuložených pohledů</returns>
        public static List<IViewContent> Save(IList<IViewContent> viewContents)
        {
            List<IViewContent> remainingViewContents = new List<IViewContent>();

            foreach (IViewContent content in viewContents)
            {
                // pokus spuštění vlastního Save As Command
                if (content is ICustomizedCommands && (content as ICustomizedCommands).SaveAsCommand())
                    continue;

                if (content.IsViewOnly)
                    continue;

                remainingViewContents.Add(content);
            }
            return remainingViewContents;
        }

        /// <summary>
        /// Sjednocení metodiky uložení obsahu pohledů
        /// </summary>
        /// <param name="viewContents">Seznam pohledů k uložení</param>
        /// <returns>Seznam neuložených pohledů</returns>
        public static List<IViewContent> SaveAs(IList<IViewContent> viewContents)
        {
            List<IViewContent> remainingViewContents = new List<IViewContent>();

            foreach (IViewContent content in viewContents)
            {
                // pokus spuštění vlastního Save As Command
                if (content is ICustomizedCommands && (content as ICustomizedCommands).SaveAsCommand())
                    continue;

                if (content.IsViewOnly)
                    continue;

                remainingViewContents.Add(content);
            }
            return remainingViewContents;
        }

        /// <summary>
        /// Uožení souboru (s vyvoláním okna Uložit jako)
        /// </summary>
        /// <param name="file">Ukládaný soubor</param>
        /// <param name="mainForm">Ovladač pro zobrazení dialogu</param>
        public static void SaveOpenedFile(OpenedFile file, Form mainForm = null)
        {
            DialogResult result = FileService.GetNewName(file, out string fileName, mainForm);
            if (result != DialogResult.OK)
            {
                file.CancelSaving = true;
                return;
            }

            if (string.IsNullOrEmpty(fileName))
                throw new ErrorFileNameException(GResources.GetResourceText(29450487)); //RC 29450487 : Název souboru nesmí být prázdná hodnota!

            FileUtility.ObservedSave(new NamedFileOperationDelegate(file.SaveToDisk), fileName, true);
        }

        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="content">Pohled na obsah</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        public static void Save(IViewContent content, Form mainForm = null)
        {
            if (content != null && content.IsDirty)
            {
                if (content is ICustomizedCommands)
                    if (((ICustomizedCommands)content).SaveCommand())
                        return;
                if (content.IsViewOnly)
                    return;

                foreach (OpenedFile file in content.Files.ToArray())
                    if (file.IsDirty)
                        Save(file, mainForm);
            }
        }

        /// <summary>
        /// Uložení obsahu
        /// </summary>
        /// <param name="content">Pohled na obsah</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        public static void SaveAs(IViewContent content, Form mainForm = null)
        {
            if (content != null 
                // && content.IsDirty - SaveAs by se neměla ptát, jestli je nebo není soubor pozměněn
                )
            {
                if (content is ICustomizedCommands)
                    if (((ICustomizedCommands)content).SaveAsCommand())
                        return;
                if (content.IsViewOnly)
                    return;

                foreach (OpenedFile file in content.Files.ToArray())
                    if (file.IsDirty)
                        Save(file, mainForm);
            }
        }

        /// <summary>
        /// Uložení otevřeného souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        /// <param name="addRecentOpen">Záznam naposledy otevřeného souboru</param>
        public static void Save(OpenedFile file, Form mainForm = null, bool addRecentOpen = true)
        {
            if (file.IsUntitled)
                SaveOpenedFile(file, mainForm);
            else
            {
                FileAttributes attr = FileAttributes.ReadOnly | FileAttributes.Directory | FileAttributes.Offline | FileAttributes.System;
                if (File.Exists(file.FileName) && (File.GetAttributes(file.FileName) & attr) != 0)
                    SaveOpenedFile(file, mainForm);
                else
                    FileUtility.ObservedSave(new NamedFileOperationDelegate(file.SaveToDisk), file.FileName, FileErrorPolicy.ProvideAlternative, addRecentOpen);
            }
        }

    }

    /// <summary>
    /// Uložení souboru.
    /// Pouze pro sekundární obsah.
    /// Není určeno pro primární obsah.
    /// </summary>
    class SaveFile : AbstractMenuCommand
    {
        /// <summary>
        /// Indikuje dostupnost operace
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                return Owner is DefaultAbstractViewContent content ? content.IsDirty : false;
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is DefaultAbstractSecondaryViewContent content)
                ContentService.Save(content.PrimaryViewContent);
        }

        /// <summary>
        /// Uložení otevřeného souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        public static void Save(OpenedFile file)
        {
            ContentService.Save(file);
        }
    }

    /// <summary>
    /// Uložení souboru
    /// Pouze pro sekundární obsah.
    /// Není určeno pro primární obsah.
    /// </summary>
    class SaveFileAs : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (Owner is DefaultAbstractSecondaryViewContent content)
                ContentService.SaveAs(content.PrimaryViewContent);
        }

        /// <summary>
        /// Uložení otevřeného souboru
        /// </summary>
        /// <param name="file">otevřený soubor</param>
        /// <param name="mainForm">Ovladač dialogu</param>
        public static void Save(OpenedFile file, Form mainForm = null)
        {
            ContentService.SaveOpenedFile(file, mainForm);
        }
    }
}
