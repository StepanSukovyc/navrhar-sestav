//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IProject.cs                            </Name>
//    <Description> Základní rozhraní projektů.                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.AddIns;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Základní rozhraní projektů.
    /// </summary>
    interface IProject : ISolutionFolder, IDisposable, IMementoCapable
    {
        /// <summary>
        /// Získání seznam položek projektu.
        /// </summary>
        ReadOnlyCollection<ProjectItem> Items { get; }

        /// <summary>
        /// Získání všech položek projektu specifického typu
        /// </summary>
        IEnumerable<ProjectItem> GetItemsOfType(ItemType type);

        /// <summary>
        /// Získání výchozí položky souboru
        /// </summary>
        /// <param name="fileName">úplná cesta k položce definující soubor</param>
        ItemType GetDefaultItemType(string fileName);

        /// <summary>
        /// Získání seznamů sekci projektu uložených v sestavení
        /// </summary>
        List<IProjectSection> ProjectSections { get; }

        /// <summary>
        /// Získání jazykových vlastnosti daného projektu.
        /// </summary>
        LanguageProperties LanguageProperties { get; }

        /// <summary>
        /// Název souboru projektu.
        /// (úplný název, například: @"D:\Folder\ReportDesigner\samples\CustomPad\CustomPad.ext")
        /// </summary>
        string FileName { get; set; }

        /// <summary>
        /// Název projektu.
        /// </summary>
        new string Name { get; set; }

        /// <summary>
        /// Složka souboru projektu
        /// Je ekvivalent Path.GetDirectoryName(project.FileName);
        /// </summary>
        string Directory { get; }

        /// <summary>
        /// True pokud projekt je pouze pro čtení.
        /// </summary>
        bool ReadOnly { get; }

        /// <summary>
        /// Uložení projektu se stávajícím názvem
        /// </summary>
        /// <param name="changeDirty">TRUE - indikuje, že po uložení se nezmění stav souboru</param>
        void Save(bool changeDirty = true);

        /// <summary>
        /// Vrácí TRUE pokud specifický soubor se nachází uvnitř projektu (dle názvu)
        /// </summary>
        /// <param name="fileName">úplný název souboru</param>
        bool IsFileInProject(string fileName);

        /// <summary>
        /// Specifická položka souboru projektu, nebo null, pokud soubor nebude nalezen.
        /// </summary>
        /// <param name="fileName">úplný název souboru</param>
        FileProjectItem FindFile(string fileName);

        /// <summary>
        /// jazyk vazby projektu.
        /// </summary>
        string ProjectType { get; }

        /// <summary>
        /// Indikuje, že projekt lze spustit
        /// </summary>
        bool IsStartable { get; }

        /// <summary>
        /// Spuštění projektu.
        /// </summary>
        void Start();
        /// <summary>
        /// Spuštění projektu - může být externí volání nějaké aplkace k tomuto účelu
        /// </summary>
        void Run();
        /// <summary>
        /// reakce na změnu názvu větve
        /// </summary>
        /// <param name="eventArgs">argument s aktuální informaci</param>
        void AfterLabelEdit(AfterFileNodeEditEventArgs eventArgs);
        /// <summary>
        /// nastavení výchozí položky
        /// </summary>
        /// <param name="item">položka k nastavení</param>
        /// <param name="withoutSave">TRUE - proběhne nastavení bez uložení</param>
        /// <param name="forceSave">TRUE - pokud položka odpovídá parametrům výchozí hodnoty, pak uloží i přesto</param>
        bool SetDefault(ProjectItem item, bool withoutSave = false, bool forceSave = false);
    }

    interface IProjectItemListProvider
    {
        /// <summary>
        /// Seznam položek projektu.
        /// </summary>
        ReadOnlyCollection<ProjectItem> Items { get; }

        /// <summary>
        /// Přidání nové položky
        /// </summary>
        /// <param name="item">přidávaná položka projektu</param>
        /// <param name="fileNode">větev projektu</param>
        void AddProjectItem(ProjectItem item, AbstractFileTreeNode fileNode);

        /// <summary>
        /// Odstranění položky
        /// </summary>
        bool RemoveProjectItem(ProjectItem item);
    }

    /// <summary>
    /// Projekt nebo sestavení
    /// </summary>
    interface IBuildable
    {
        /// <summary>
        /// Start kompilace
        /// </summary>
        void StartBuild();

        /// <summary>
        /// Název kompilované položky.
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Nadřazené sestavení
        /// </summary>
        Solution ParentSolution { get; }
    }

}
