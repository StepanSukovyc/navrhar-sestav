//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGReport.cs                   </Name>
//    <Description> Interface pro aplikaèní pouití reportu     </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-06-29                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;
using System.Collections;
using Gordic.General;

namespace Gordic.Report.Interface
{

    /// <summary>
    /// Enum pro definici formátovací skupiny formátu grafické sestavy
    /// </summary>
    public enum GFormatingGroup
    {
        /// <summary>
        /// Neznámá skupina
        /// </summary>
        Unknown,
        /// <summary>
        /// Wordové šablony pøes OLE
        /// </summary>
        MSW,
        /// <summary>
        /// Excelové šablony pøes OLE
        /// </summary>
        MSE,
        /// <summary>
        /// Wordové šablony pøes RTF, nevyaduje instalaci Wordu
        /// </summary>
        RTF,
        /// <summary>
        /// Sestavy urèené k vyplnìní formuláøù 602 XML Forms
        /// </summary>
        GFF,
        /// <summary>
        /// Nativní grafické sestavy Gordicu
        /// </summary>
        GRR,
        /// <summary>
        /// Formuláøové grafické sestavy Gordicu
        /// </summary>
        GRF,
		/// <summary>
		/// Excelové šablony pøes OpenXml, nevyaduje instalaci Excelu
		/// </summary>
		OXS,
		/// <summary>
		/// Wordové šablony pøes OpenXml, nevyaduje instalaci Wordu
		/// </summary>
		OXD,
	}

	/// <summary>
	/// Urèuje odkud se mají brát reporty
	/// </summary>
	public enum GReportSource 
	{
        /// <summary>
        /// Reporty se nebudou naèítat (není vdy pøípustná hodnota)
        /// </summary>
        None,
		/// <summary>
		/// Reporty se budou brát pouze z lokálního adresáøe
		/// </summary>
		/// <remarks>Pokud soubor nebude existovat zpùsobí to vyjímku</remarks>
		LocalOnly,
        ///// <summary>
        ///// Reporty se budou brát z lokálního adresáøe, pokud tam nebudou vezmou se z databáze
        ///// </summary>
        //LocalDatabase,
        ///// <summary>
        ///// Reporty se budou brát z lokálního adresáøe, pokud tam nebudou nebo budou staršího data
        ///// vezmou se z databáze
        ///// </summary>
        //LocalDatabaseVersionCheck,
        ///// <summary>
        ///// Reporty se budou brát z lokálního adresáøe, pokud tam nebudou vezmou se z databáze a
        ///// zkoupírují se do lokálního adresáøe
        ///// </summary>
        ///// <remarks>Dvojí volání stejného reportu s tímto pøíznakem zpùsobí jeho nahrání
        ///// do lokálního adresáøe pøi prvním volání a pøi druhém se ji pouije lokální kopie.
        ///// Pøi tomto pøíznaku se neovìøuje datum sestavy, pouze její existence v lokálním adresáøi.
        ///// Mùe zpùsobit vyjímku, pokud nebude mono sestavu do lokálního adresáøe uloit napø. z
        ///// dùvodu nedostateènıch práv.
        ///// </remarks>
        //LocalDatabaseUpdateNonExistant,
        ///// <summary>
        ///// Reporty se budou brát z lokálního adresáøe, pokud tam nebudou nebo budou staršího 
        ///// data vezmou se z databáze a zkoupírují se do lokálního adresáøe
        ///// </summary>
        ///// <remarks>Dvojí volání stejného reportu s tímto pøíznakem zpùsobí jeho nahrání
        ///// do lokálního adresáøe pøi prvním volání (v pøípadì e sestava není v lokálním adresáøi 
        ///// nebo není aktuální) a pøi druhém se ji pouije lokální kopie.
        ///// Pøi tomto pøíznaku se ovìøuje datum sestavy.
        ///// Mùe zpùsobit vyjímku, pokud nebude mono sestavu do lokálního adresáøe uloit napø. z
        ///// dùvodu nedostateènıch práv.
        ///// </remarks>
        //LocalDatabaseUpdateOlder,
		/// <summary>
		/// Reporty se budou brát vdy z databáze bez ohledu na lokální adresáø
		/// </summary>
		DatabaseOnly
	}
	
	
	/// <summary>
	/// Stav reportu
	/// </summary>
	public enum GReportState {
		/// <summary>
		/// Report ještì nebyl vygenerován, nebo je potøeba jej pøegenerovat.
		/// </summary>
		Empty,
		/// <summary>
		/// Report se právì generuje.
		/// </summary>
		Working,
		/// <summary>
		/// Report je ji vygenerován a pøipraven.
		/// </summary>
		Done};
	
	/// <summary>
	/// Typ reportu
	/// </summary>
	public enum GReportType 
	{
        /// <summary>
        /// Neznámı typ sestavy
        /// </summary>
        Unknown,
		/// <summary>
		/// Jedná se o grafickı report (sestavu GRR)
		/// </summary>
		Graphics,
		/// <summary>
		/// Jedná se o sestavu pøebírající data z vstupního XML (negeneruje se)
		/// </summary>
		XMLData,
		/// <summary>
		/// Jedná se o textovou sestavu, buïto èistı text, nebo jednoduché rtf
		/// </summary>
		Text,
		/// <summary>
		/// Jedná se o dávku, dávky modou mít i vlastní vizuální reprezentaci.
		/// Po dokonèení je tøeba informovat uivatele o dokonèení dávky s moností uloení
		/// </summary>
		Batch_Text,
        /// <summary>
        /// Jedná se o dávku, dávky modou mít i vlastní vizuální reprezentaci.
        /// Po dokonèení je tøeba informovat uivatele o dokonèení dávky s moností uloení
        /// </summary>
        Batch_Graphics,

		/// <summary>
		/// Jedná se o Excelovskou sestavu GXL
		/// </summary>
		/// <remarks>
		/// V tomto reimu je tøeba mít na klientu nainstalován MS Excel
		/// </remarks>		
		GXL,

        /// <summary>
        /// Sestava pro mapové podklady (PMP)
        /// </summary>
        AXL,

		/// <summary>
		/// Jedná se o operativní tisk, data se vezmou z dodané DataTable
		/// </summary>
		OperatingPrint
	}

	/// <summary>
	/// Interface reprezentující sestavu, pøedlohu pro generování sestavy (vlastních dat)
	/// </summary>
	/// <remarks>
	/// Tento interface reprezentuje report (sestavu) a ji textovou nebo grafickou. Lze ho získat z
	/// Gordic.Report.Server. Obsahuje pouze informace o sestavì a jednotlivıch jejich vizuálních 
	/// reprezentacích (pohledù). Pro zobrazení reportu (sestavy), popøípadì pro její tisk, nebo pro odloené
	/// generování rozsáhlıch sestav pouijte GReportViewer z Gordic.Report.Client.
	/// </remarks>
	/// <example>
	/// Vygenerování a zobrazení sestavy "FIN12" v prezentaèní vrstvì
	/// <code>
	/// IGReport l_oReport = m_Server.GetReport("FIN12"); // Získání reportu z aplikaèní logiky
	/// ReportViewer.GenerateReport(l_oReport);           // Zde se report vygeneruje
	/// ...
	///	ReportViewer.ShowReport(l_oReport);               // Zobrazení reportu v prezentaèní vrstvì
	/// </code>
	/// </example>
    [System.Security.SecurityCritical]
	public interface IGReport
	{
		/// <summary>
		/// Typ reportu
		/// </summary>
		/// <remarks>
		/// Typ reportu lze mìnit jen v pøípadì, e ještì nebyl vygenerován
		/// </remarks>
		GReportType Type 
		{
			get;
			set;
		}

        /// <summary>
        /// Typ distribuce sestavy. Rozlišení uivatelskıch a distribuèních sestav
        /// </summary>
        GReportDistributionType DistributionType
        {
            get;
        }
		/// <summary>
		/// Kolekce spoleènıch Info sekcí sestavy
		/// </summary>
		/// <remarks>
		/// Info sekce pøebrané ze souboru alv, spoleèné pro všechny pohledy, Info sekce je strukturována
		/// jako dvojice klíè - hodnota <see cref="IDictionary"/>.
		/// </remarks>
		/// <example>
		/// Pøíklad nalezení autora sestavy.
		/// <code>
		/// IGReport l_oReport = GetReport();
		/// string l_sMaker = l_oReport.CommonInfos["maker"];
		/// </code>
		/// </example>
		IDictionary CommonInfos 
		{
			get;
		}

		/// <summary>
		/// Všechny moné pohledy na tuto sestavu
		/// </summary>
		/// <remarks>
		/// Všechny pohledy na sestavu (data) tak jak jsou definovány v .srz (.ssr). V pøípadì
		/// textovıch sestav vrací pole délky 1, tedy textové sestavy mají vdy jen jeden pohled 
		/// na data. Zde je zaruèeno, e kadá sestava má alespoò jeden pohled, jinak se nevytvoøí
		/// IGReport, vznikne vyjímka ji pøi volání funkce z Gordic.Report.Server.
		/// </remarks>
		/// <example>
		/// Pøíklad zobrazení názvù všech pohledù
		/// <code>
		/// IGReport l_oReport = GetReport();
		/// foreach(IGVisualRepresentation l_oVisualRep in l_oReport.VisualRepresentations)
		/// {
		///		ShowName(l_oVisualRep.LocalInfos["nazev"]);	
		/// }
		/// </code>
		/// </example>
		IGVisualRepresentation[] VisualRepresentations
		{
			get;
		}
        /// <summary>
        /// Obdoba VisualRepresentations bez pøeházeného poøadí aby vıchozí formát byl první (zde není první)
        /// </summary>
        IGVisualRepresentation[] VisualRepresentationsOrdered
        {
            get;
        }
        /// <summary>
        /// Index vıchozího formátu v VisualRepresentationsOrdered
        /// </summary>
        int DefaultVisualRepresentation
        {
            get;
        }

		/// <summary>
		/// Nastavitelné parametry reportu pouité pøi generování sestavy
		/// </summary>
		/// <remarks>
		/// Nastavení parametrù ovlivòuje zpùsob generování sestavy. Jejich nastavení
		/// pro ji vygenerovanou sestavu má za následek pøenastavení stavu na Empty. Po té je
		/// nutno sestavu znovu vygenerovat.
		/// </remarks>
		/// <example>
		/// Pøíklad ukazuje nastavení parametrù v aplikaèní logice
		/// <code>
		/// IGReport l_oReport = ReportProvider.GetReport("FIN12"); // Získání reportu
		/// l_oReport.Parameters[GReportParams.X0001] = "rok=2003 AND mesic=2"; // Nastavení parametru
		/// l_oReport.Parameters[GReportParams.X0009] = "1";
		/// </code>
		/// </example>
		IDictionary Parameters
		{
			get;
		}

		/// <summary>
		/// Nastavitelné parametry prohlíeèe
		/// </summary>
		/// <remarks>
		/// Nìkteré parametry prohlíeèe se nastavují automaticky, jsou to ty které lze zjistit
		/// z kontextu aplikace. Další parametry pro prohlíeè lze nastavit pomocí této vlastnosti.
		/// Parametry zde nastavené mají pøednost pøed internì nastavovanımi. V pøípadì lehkého
		/// klienta nemají parametry ádnı vıznam.
		/// </remarks>
		/// <example>
		/// Tento pøíklad ukazuje nastavení parametru MAKE_LOG
		/// <code>
		/// IGReport l_oReport = ReportProvider.GetReport("FIN12"); // Získání reportu
		/// l_oReport.ViewerParameters[GReportParams.Make_Log] = "TMP";
		/// </code>
		/// </example>
		IDictionary ViewerParameters
		{
			get;
		}
		
		/// <summary>
		/// Reprezentuje stav reportu.
		/// </summary>
		/// <remarks>
		/// Report mùe mít stavy: Empty - report ještì nebyl vygenerován, Working - report je právì
		/// generován, Done - report je ji vygenerován.
		/// </remarks>
		GReportState State
		{
			get;
            set;
		}

        /// <summary>
        /// Identita reportu. Podle tohoto lze report kdykoliv opìt vyhledat.
        /// </summary>
        /// <remarks>
        /// Obsahuje PID stromu, alv a frm + pøíznak, zda byl dohledán pøez vazbu ginvfos
        /// </remarks>
        GReportIdentity Identity
        {
            get;
        }

        /// <summary>
        /// Zjistí seznam vlastností uloenıch vevnitø v sestavì (ALV)
        /// </summary>
        System.Data.DataTable GetInnerPropertyList();

        ///// <summary>
        ///// Zajistí nastavení parametrù pro operativní tisk
        ///// </summary>
        ///// <param name="gfp">provider (grid,filter,...)</param>
        ///// <param name="head">Informace pro záhlaví operativního tisku. Mùe bıt null.</param>
        //void PrepareOperatingPrint(IGGridFormatProvider gfp, GReportHeader head);

        /// <summary>
        /// Moné vıstupní typy této sestavy
        /// </summary>
        string GetOutputTypes();

        /// <summary>
        /// Formátování vıstupu (RunBridge)
        /// </summary>
        void Format(string bridge, string outname);
    }

	/// <summary>
	/// Reprezentuje jednotlivı pohled na data.
	/// </summary>
	/// <remarks>
	/// Pohled na data, u grafickıch sestav odpovídá jednotlivım souborùm .alf, u textovıch sestav
	/// je toto rozhraní pouze jedno a vychází z .alv
	/// </remarks>
    [System.Security.SecurityCritical]
	public interface IGVisualRepresentation
	{
		/// <summary>
		/// Kolekce Info sekcí pohledu.
		/// </summary>
		/// <remarks>
		/// Info sekce pøebrané ze souboru .alf, platící pro tento pohled, Info sekce je strukturována
		/// jako dvojice klíè - hodnota <see cref="IDictionary"/>.
		/// </remarks>
		IDictionary LocalInfos		
		{
			get;
		}
	}

	#region delegáty pro pouití v eventech pro tlaèítka

    /// <summary>Tøída pro události kolem sestav</summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GReportEventArgs : EventArgs
    {
        private IGReport m_Report;
        ///<summary>Sestava</summary>
        public IGReport Report
        {
            get { return m_Report; }
        }


        //------------------------------------------------------------------
        private bool m_Cancel = false;
        ///<summary>Zrušení operace</summary>
        public bool Cancel
        {
            get { return m_Cancel; }
            set { m_Cancel = value; }
        }

        //------------------------------------------------------------------
        /// <summary>Konstuktor</summary>
        public GReportEventArgs(IGReport report) { m_Report = report; }
    }
    /// <summary>Tøída pro události operativního tisku</summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GReportOperatingPrintEventArgs : GReportEventArgs
    {
        private GOperationPrintParameters m_pars;
        ///<summary>Sestava</summary>
        public GOperationPrintParameters Parameters
        {
            get { return m_pars; }
        }

        /// <summary>Konstuktor</summary>
        public GReportOperatingPrintEventArgs(IGReport report, GOperationPrintParameters pars) : base(report) { m_pars = pars; }
    }

    /// <summary>Delegát pouitı pro sestavove eventy</summary>
    [System.Security.SecurityCritical]
    public delegate void ReportEventHandler(object sender, GReportEventArgs e);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøi operativním tisku</summary>
    [System.Security.SecurityCritical]
    public delegate void ReportOperatingPrintStartingEventHandler(object sender, GReportOperatingPrintEventArgs e);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøi získání IGReport ze serveru</summary>
    //[Obsolete]
    [System.Security.SecurityCritical]
    public delegate void ReportRetrieveEventHandler(IGReport report);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøi operativním tisku</summary>
    [Obsolete]
    [System.Security.SecurityCritical]
    public delegate void DataTableRetrieveEventHandler(out System.Data.DataTable data, out GColumnList columns, out GReportHeader header);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøi operativním tisku</summary>
    [Obsolete]
    [System.Security.SecurityCritical]
    public delegate void OperationPrintEventHandler(GOperationPrintParameters opParams);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøi operativním tisku</summary>
    [Obsolete]
    [System.Security.SecurityCritical]
    public delegate void ReportOperatingPrintEventHandler(IGReport report);

    /// <summary>Delegát pouitı pro event, kterı se vyvolává pøed generováním reportu pro dotaz, zda vùbec report generovat</summary>
    [Obsolete]
    [System.Security.SecurityCritical]
    public delegate bool ReportAskGenerateEventHandler(IGReport report);

	#endregion
}

