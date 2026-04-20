//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportList.cs                     </Name>
//    <Description> Čtení seznamů sestav, vazeb atp.                            </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2010-01-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using System.Data;

namespace Gordic.Report.Interface
{
    /// <summary>Čtení seznamů sestav, vazeb atp.</summary>
    [ActivatedObject("Gordic.Report.Server.GReportList")]
    [System.Security.SecurityCritical]
    public interface IGReportList
    {
        /// <summary>Seznam sestav</summary>
        GReportListDataSet.AlvDataTable LoadReports(params GFilter<FilterReportList>[] filters);

        /// <summary>Seznam formátů</summary>
        GReportListDataSet.FrmDataTable LoadFormats(params GFilter<FilterFormatList>[] filters);

        /// <summary>Seznam stromů</summary>
        GReportListDataSet.StrDataTable LoadFolders(params GFilter<FilterFolderList>[] filters);
        /// <summary>Seznam stromů s rekurzí na všechny vnořené stromy</summary>
        GReportListDataSet.StrDataTable LoadFoldersRecursive(params GFilter<FilterFolderList>[] filters);

        /// <summary>Seznam přímo navázanýchformátů</summary>
        void LoadFolderFormats(GReportListDataSet.AlvDataTable alv, params GFilter<FilterFolderFormatList>[] filters);

        /// <summary>
        /// Čtení informací o stromech, v kterých je sestava umístěna
        /// </summary>        
        /// <returns>
        /// Tabulku informací o stromech od listového ke kořenovému (kořen je poslední!)
        /// </returns>
        GReportListDataSet.StrDataTable LoadParentFolders(GString ixsStr);

        /// <summary>
        /// Čtení informací o sestavě
        /// </summary>
        GReportListDataSet Detail(GReportIdentity id, Gordic.General.GEkoDate platnost, string restrictionAlf);

        /// <summary>
        /// Zjistí povolení operativního tisku pro dané téma
        /// </summary>
        bool IsOperatingPrintEnabled(string tema);

        /// <summary>
        /// Vrací data pro zobrazení stromu sestav
        /// </summary>
        /// <param name="tema">Název tématu</param>
        /// <param name="platnost">platnost</param>
        /// <param name="restrictionALV">Další omezení pro výběr sestav do stromu sestav, tento parametr se vloží do SELECTu na konec WHERE.</param>
        /// <param name="restrictionALF">Další omezení pro výběr formátů sestav do stromu sestav, tento parametr se vloží do SELECTu na konec WHERE.</param>
        /// <param name="filters">další filtry</param>
        /// <returns>Data pro zobrazení stromu sestav</returns>
        GReportListDataSet GetReportTree(string tema, GEkoDate platnost, string restrictionALV, string restrictionALF, params GFilter<FilterReportList>[] filters);

        /// <summary>
        /// Vrací data pro zobrazení stromu sestav
        /// </summary>
        /// <param name="tema">Název tématu</param>
        /// <param name="ixs_str">id stromu</param>
        /// <param name="platnost">platnost</param>
        /// <param name="restrictionALV">Další omezení pro výběr sestav do stromu sestav, tento parametr se vloží do SELECTu na konec WHERE.</param>
        /// <param name="restrictionALF">Další omezení pro výběr formátů sestav do stromu sestav, tento parametr se vloží do SELECTu na konec WHERE.</param>
        /// <param name="filters">další filtry</param>
        /// <returns>Data pro zobrazení stromu sestav</returns>
        GReportListDataSet GetReportTree(string tema, string ixs_str, GEkoDate platnost, string restrictionALV, string restrictionALF, params GFilter<FilterReportList>[] filters);

    }

    /// <summary>Filtry pro seznam sestav</summary>
    public enum FilterReportList
    {
        /// <summary>konkretni sestava</summary>
        ixs_alv,
        /// <summary>platnost k danemu rokmes</summary>
        platnost,
        /// <summary>faze ktera ma tuto sestavu nekde navazanu</summary>
        faze,
        /// <summary>tema ktera ma tuto sestavu nekde navazanu</summary>
        tema,
        /// <summary>stom ktery ma tuto sestavu primo navazanu</summary>
        strom,
        /// <summary>stom ktery ma tuto sestavu nekde navazanu (vcetne podstromu)</summary>
        podstrom,
        /// <summary>pouze graficke sestavy</summary>
        graphics,
        /// <summary>pripadna dalsi omezeni (valuefilter)</summary>
        restrictionAlv,
        /// <summary>aktivita</summary>
        aktivita,
        /// <summary>G+</summary>
        gplus,
        /// <summary>Pouze sestavy generovane od</summary>
        lastGeneratedSince,

        /// <summary>Pouze generovane sestavy za funkcni misto</summary>
        lastGeneratedBy
    }

    /// <summary>Filtry pro seznam stromů</summary>
    public enum FilterFolderList
    {
        /// <summary>konkretni strom</summary>
        ixs_str,
        /// <summary>podstromy</summary>
        ixs_str_nad,
        /// <summary>aktivita</summary>
        aktivita,
        /// <summary>platnost k danemu rokmes</summary>
        platnost,
        /// <summary>pripadna dalsi omezeni (valuefilter)</summary>
        restrictionAlv,
    }

    /// <summary>Filtry pro seznam formátů</summary>
    public enum FilterFormatList
    {
        /// <summary>konkretni format</summary>
        ixs_frm,
        /// <summary>konkretni sestava</summary>
        ixs_alv,
        /// <summary>aktivita</summary>
        aktivita,
        /// <summary>platnost k danemu rokmes</summary>
        platnost,
        /// <summary>pripadna dalsi omezeni (valuefilter)</summary>
        restrictionAlf,
        /// <summary>G+</summary>
        gplus,
    }

    /// <summary>Filtry pro seznam formátů</summary>
    public enum FilterFolderFormatList
    {
        /// <summary>stom ktery ma tento format primo navazanu</summary>
        strom,
        /// <summary>konkretni sestava</summary>
        ixs_alv,
        /// <summary>konkretni format</summary>
        ixs_frm,
        /// <summary>aktivita</summary>
        aktivita,
        /// <summary>platnost k danemu rokmes</summary>
        platnost,
        /// <summary>pripadna dalsi omezeni (valuefilter)</summary>
        restrictionAlf,
        /// <summary>pripadna dalsi omezeni (valuefilter)</summary>
        restrictionAlv,
        /// <summary>G+</summary>
        gplus,
    }


    //------------------------------------------------------------------
    /// <summary>G+ ze Stromu sestav</summary>
    [Serializable]
    public class GPlusReportList : GPlusFilter<FilterReportList>
    {
        /// <summary/>
        public GPlusReportList()
            : base(kind: 1)
        {
        }
    }
    /// <summary>G+ ze Stromu sestav</summary>
    [Serializable]
    public class GPlusFormatList : GPlusFilter<FilterFormatList>
    {
        /// <summary/>
        public GPlusFormatList()
            : base(kind: 1)
        {
        }
        /// <summary/>
        public GPlusFormatList(GPlusReportList copy)
            : base(copy.Kind)
        {
            this.CasoveRozliseni = copy.CasoveRozliseni;
        }
    }
    /// <summary>G+ ze Stromu sestav</summary>
    [Serializable]
    public class GPlusFolderFormatList : GPlusFilter<FilterFolderFormatList>
    {
        /// <summary/>
        public GPlusFolderFormatList()
            : base(kind: 1)
        {
        }
        /// <summary/>
        public GPlusFolderFormatList(GPlusReportList copy)
            : base(copy.Kind)
        {
            this.CasoveRozliseni = copy.CasoveRozliseni;
        }
    }
    

}
