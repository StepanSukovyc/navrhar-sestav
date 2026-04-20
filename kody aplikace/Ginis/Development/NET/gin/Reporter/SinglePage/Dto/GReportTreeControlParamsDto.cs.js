var server = server || {};
/// <summary>Parametry tematu pro zobrazeni stromu reportu</summary>
server.GReportTreeControlParamsDto = function() {
	/// <field name="Tema" type="String">Tema sestav</field>
	this.Tema = '';
	/// <field name="Platnost" type="String">Platnost sestavy</field>
	this.Platnost = '';
	/// <field name="ReportGeneratorType" type="String">Typ generatoru ke generovani reportu (musi byt GReportGenerator nebo odvozeny)</field>
	this.ReportGeneratorType = '';
	/// <field name="SelectReportOnly" type="Boolean">SelectReportOnly</field>
	this.SelectReportOnly = false;
	/// <field name="SelectDefaultFormatOnly" type="Boolean">Je-li true, nezobrazi dalsi typy formatu</field>
	this.SelectDefaultFormatOnly = false;
	/// <field name="ServerRestrictionMethod" type="String">The ServerRestrictionMethod property as defined in Gordic.Report.WebClient.Reporter.SinglePage.Dto.GReportTreeControlParamsDto</field>
	this.ServerRestrictionMethod = '';
	/// <field name="RestrictionAlf" type="String">The RestrictionAlf property as defined in Gordic.Report.WebClient.Reporter.SinglePage.Dto.GReportTreeControlParamsDto</field>
	this.RestrictionAlf = '';
	/// <field name="RestrictionAlv" type="String">The RestrictionAlv property as defined in Gordic.Report.WebClient.Reporter.SinglePage.Dto.GReportTreeControlParamsDto</field>
	this.RestrictionAlv = '';
};

