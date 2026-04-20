//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGReportProvider.cs           </Name>
//    <Description> Interface pro komunikaci s .Server          </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-08-25                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gordic.General;

namespace Gordic.Report.Interface
{
	/// <summary>
	/// Interface pro komunikaci s Gordic.Report.Server
	/// </summary>
	/// <remarks>
	/// Tento interface je pouze pro interní použití v Gordic reporteru, NEPOUŽÍVAT
	/// </remarks>
	[ActivatedObject("Gordic.Report.Server.GReportProvider")]
    [System.Security.SecurityCritical]
	public interface IGReportProvider 
	{
        /// <summary>
        /// Vrací report vytažený z databáze
        /// </summary>
        /// <param name="identity">identita sestavy pro vyhledání</param>
        /// <param name="reportSource">Umístění, z kterého se vezmou data reportu</param>
        /// <param name="platnost">platnost</param>
        /// <param name="restrictionALF">Další omezení pro výběr formátů sestav do stromu sestav, tento parametr se vloží do SELECTu na 
        /// konec WHERE.</param>
        /// <returns>Vytažená sestava (nevygenerovaná)</returns>
        /// <exception cref="GException">Pokud taková sestava v databázi není, nebo při jiné chybě</exception>
        /// <example><see cref="IGReport"/></example>
        GReportDto GetReportDto(GReportIdentity identity, GReportSource reportSource, GEkoDate platnost, string restrictionALF);

        /// <summary>
        /// Vrací report vytažený z databáze
        /// </summary>
        /// <param name="identity">identita sestavy pro vyhledání</param>
        /// <param name="reportSource">Umístění, z kterého se vezmou data reportu</param>
        /// <param name="platnost">platnost</param>
        /// <param name="restrictionALF">Další omezení pro výběr formátů sestav do stromu sestav, tento parametr se vloží do SELECTu na 
        /// konec WHERE.</param>
        /// <returns>Vytažená sestava (nevygenerovaná)</returns>
        /// <exception cref="GException">Pokud taková sestava v databázi není, nebo při jiné chybě</exception>
        /// <example><see cref="IGReport"/></example>
        IGReport GetReport(GReportIdentity identity, GReportSource reportSource, GEkoDate platnost, string restrictionALF);

		/// <summary>
		/// Vrací report vytažený z databáze, Grafický report
		/// </summary>
		/// <remarks>
		/// Soubory alv se získávají z cesty uvedené v 
		/// GPrmContext.Params.GetParam(GInitConst.RootConfigGroup,"AlvStorageFolder");
		/// název konkrétního ALV souboru se získá z databáze + se k němu přidá výše
		/// uvedená cesta
		/// </remarks>
		/// <param name="ixs_alv">Jednoznačný identifikátor sestavy</param>
		/// <param name="ixs_frm">Jednoznačný identifikátor formátu - defaultní formát</param>
		/// <param name="reportSource">Umístění, z kterého se vezmou data reportu</param>
        /// <param name="platnost">platnost</param>
        /// <param name="restrictionALF">Další omezení pro výběr formátů sestav do stromu sestav, tento parametr se vloží do SELECTu na 
        /// konec WHERE.</param>
        /// <returns>Vytažená sestava (nevygenerovaná)</returns>
		/// <exception cref="GException">Pokud taková sestava v databázi není, nebo při jiné chybě</exception>
		/// <example><see cref="IGReport"/></example>
        IGReport GetReport(string ixs_alv, string ixs_frm, GReportSource reportSource, GEkoDate platnost, string restrictionALF);

		/// <summary>
		/// Vrací report vytažený z databáze, Textový report a dávka
		/// </summary>		
		/// /// <remarks>
		/// Soubory alv se získávají z cesty uvedené v 
		/// GPrmContext.Params.GetParam(GInitConst.RootConfigGroup,"AlvStorageFolder");
		/// název konkrétního ALV souboru se získá z databáze + se k němu přidá výše
		/// uvedená cesta
		/// </remarks>
		/// <param name="ixs_alv">Jednoznačný identifikátor sestavy</param>
		/// <param name="reportSource">Umístění, z kterého se vezmou data reportu</param>
		/// <returns>Vytažená sestava (nevygenerovaná)</returns>
		/// <exception cref="GException">Pokud taková sestava v databázi není, nebo při jiné chybě</exception>
		/// <example><see cref="IGReport"/></example>
        IGReport GetReport(string ixs_alv, GReportSource reportSource);

        /// <summary>
        /// Načte popisek dané sestavy
        /// </summary>
        string ReadReportDescription(GString ixs_alv);

        /// <summary>
        /// Čtení sestavy se souboru
        /// </summary>
        IGReport ReadFile(string fileName, System.IO.Stream fileStream);

        /// <summary>Nacte XME soubor dle jeho ixs_xme nebo jmena souboru</summary>
        IGMemoryFile LoadXmeFile(GString ixsXme, GReportSource reportSource);

        /// <summary>Nacte ALF+ZIP soubor dle jeho ixs_alf</summary>
        void LoadAlfFile(GString ixsAlf, GReportSource reportSource, out IGMemoryFile alf, out IGMemoryFile zip, string storageFolders = null);

        /// <summary>
        /// Zjistí seznam vlastností uložených vevnitř v sestavě (ALV)
        /// </summary>
        System.Data.DataTable GetInnerPropertyList(string fileName, System.IO.Stream fileStream);
        /// <summary>
        /// Zjistí seznam vlastností uložených vevnitř v sestavě (ALV)
        /// </summary>
        System.Data.DataTable GetInnerPropertyList(GReportIdentity identity, GReportSource reportSource);
        /// <summary>
        /// Typ distribuce sestavy. Rozlišení uživatelských a distribučních sestav
        /// </summary>
        GReportDistributionType GetDistributionType(GReportIdentity identity, GReportSource reportSource);

        /// <summary>
        /// Možné výstupní typy sestavy
        /// </summary>
        string GetReportOutputTypes(GReportSource reportSource, GVisualRepresentationDto reportVisual);
        /// <summary>
        /// Soubory sestavy
        /// </summary>
        GReportFilesDto GetFiles(GReportSource reportSource, GVisualRepresentationDto reportVisual);

        GReportFilesDto Generate(GReportDto report, System.IO.Stream continueStream);
        GReportFilesDto ContinueGeneration(GReportDto report, System.IO.Stream continueStream, string dataFile, Dictionary<string, object> vals);
        Task<GReportFilesDto> GenerateAsync(GReportDto report, System.IO.Stream continueStream, System.Threading.CancellationToken cancel, IProgress<GenerateProgress> progress);
        Task<GReportFilesDto> ContinueGenerationAsync(GReportDto report, System.IO.Stream continueStream, string dataFile, Dictionary<string, object> vals, System.Threading.CancellationToken cancel, IProgress<GenerateProgress> progress);

        /// <summary>
        /// Formátování výstupu (RunBridge)
        /// </summary>
        GMemoryFile Format(GReportDto report, IGMemoryFile data, string bridge, string outname);

        /// <summary>
        /// Vytáhnutí server side loga
        /// </summary>
        IGMemoryFile GetZnakFileName(GString ico = null);

    }

    public class GenerateProgress
    {
        /// <summary>
        /// Nastavení procentuálního posuvu
        /// </summary>
        public int Value { get; set; }

        ///// <summary>
        ///// Zjištění zda nebylo stisknuto tlačítko Zrušit
        ///// </summary>
        //bool Canceled { get; }

        /// <summary>
        /// Nápis nad teploměrem
        /// </summary>
        public string TopLabel { get; set; }

        /// <summary>
        /// Nápis pod teploměrem
        /// </summary>
        public string BottomLabel { get; set; }

        /// <summary>
        /// Nadpis okna
        /// </summary>
        public string Caption { get; set; }
    }

}
