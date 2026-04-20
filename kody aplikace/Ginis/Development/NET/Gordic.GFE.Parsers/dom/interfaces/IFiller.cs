//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFiller.cs                               </Name>
//    <Description> Rozhraní prohlížečů                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System.Drawing;
using System;

namespace Gordic.GFE.Parsers.Dom
{
    #region EventHandlerFillerSaveAs
    /// <summary>
    /// Delegát metody na vytvoření kontextového menu
    /// </summary>
    /// <param name="sender">objekt, který spustil událost</param>
    /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
    public delegate void EventHandlerFillerSaveAs(object sender, EventArgsFillerSaveAs e);

    /// <summary>
    /// Data události <see cref="EventHandlerFillerSaveAs"/>
    /// </summary>
    public class EventArgsFillerSaveAs : EventArgs
    {
        readonly string fileName;
        /// <summary>
        /// Stará pozice
        /// </summary>
        public string FileName { get { return fileName; } }

        readonly bool saveBefore;
        /// <summary>
        /// Indikuje nutnost před uložit jako... spuštění operace Save
        /// </summary>
        public bool SaveBefore { get { return saveBefore; } }

        /// <summary>
        /// Zobrazení hlášení o uložená souboru
        /// </summary>
        public bool ShowSaveDialog = true;

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public EventArgsFillerSaveAs() { }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="saveBefore">Indikuje nutnost před uložit jako... spuštění operace Save</param>
        /// <param name="fileName">Úplný název nového souboru. NULL - vyvolá dialogové okno.</param>
        public EventArgsFillerSaveAs(string fileName, bool saveBefore)
        {
            this.fileName = fileName;
            this.saveBefore = saveBefore;
        }
    }
    #endregion

    /// <summary>
    /// Rozhraní prohlížečů
    /// </summary>
    public interface IFiller
    {
        /// <summary>
        /// Název souboru formuláře (třeba formular.gfrm nebo balicek.srz atd.)
        /// </summary>
        string FileName { get; }
        /// <summary>
        /// Složka souboru formuláře
        /// </summary>
        string Directory { get; }
        /// <summary>
        /// indikuje filler pro LK
        /// </summary>
        bool IsLK { get; }
        /// <summary>
        /// Sekce (informace o souborech) formuláře
        /// </summary>
        List<ProjectSection> ProjectSections { get; }

        /// <summary>
        /// Soubor formuláře ALF
        /// </summary>
        ProjectSection FormatFile { get; }
        /// <summary>
        /// Sekce datové struktury
        /// </summary>
        ProjectSection StructureSection { get; }

        /// <summary>
        /// Volá se po uložení souboru
        /// </summary>
        event FileNameEventHandler FileSaved;
        /// <summary>
        /// Volá se před načtením formuláře
        /// </summary>
        void OnBeforeLoad();

        //po načtení dat
        void OnDataLoaded();
        // po načtení pohledu formátu
        void OnViewLoaded();

        /// <summary>
        /// Uložení formuláře
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void Save(object sender, EventArgs e);
        /// <summary>
        /// Uložení jako... formuláře
        /// z dialogovým oknem.
        /// Jsou dvě metody kvůli delegátům.
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void SaveAs(object sender, EventArgsFillerSaveAs e);

        /// <summary>
        /// Primární pohledy
        /// </summary>
        List<IViewContent> PrimaryContents { get; }

        /// <summary>
        /// Registrace externích skriptů
        /// </summary>
        ScriptManager.IScriptRegistrar ScriptRegistrar { get; }

        /// <summary>Parametry pro skripty</summary>
        string StartFragment { get; set; }

    }

    /// <summary>
    /// Rozhraní pro práci s obsahem formuláře
    /// </summary>
    public interface IFillerContent
    {
        /// <summary>
        /// Kolekce stránek sekundárního obsahu pohledu na formulář
        /// </summary>
        IPages Pages { get; }
        /// <summary>
        /// formát stránek
        /// </summary>
        GFEFormat Format { get; }
        /// <summary>
        /// grafika pro výpočty
        /// </summary>
        Graphics ComputeGraphics { get; set; }
    }
}
