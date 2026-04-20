var server = server || {};
/// <summary>DTO s parametry pro generovani reportu pomoci WS</summary>
server.GCreateReportDto = function() {
	/// <field name="Wrid" type="String">Identifikator reportu</field>
	this.Wrid = '';
	/// <field name="OutputStyle" type="String">OutputStyle - pozadovana pripona vygenerovaneho reportu</field>
	this.OutputStyle = '';
	/// <field name="Preselect" type="Boolean">Preselect</field>
	this.Preselect = false;
	/// <field name="RunAgain" type="Boolean">RunAgain</field>
	this.RunAgain = false;
	/// <field name="Props" type="Object">Vlastnosti reportu</field>
	this.Props = { };
	/// <field name="ReportGeneratorType" type="String">Typ generatoru, ktery se pouzije pro generovani reportu</field>
	this.ReportGeneratorType = '';
	/// <field name="ReportGeneratorParams" type="Object">Dalsi parametry pro generator (ke zpracovani v PrepareReport)</field>
	this.ReportGeneratorParams = { };
	/// <field name="ReportGeneratorWaitToAsync" type="Number">Doba, po kterou se generuje synchronne v requestu. Pokud sestava trva dele po uplynuti doby se rozjede asynchronne.</field>
	this.ReportGeneratorWaitToAsync = 0;
	/// <field name="ServerParameterMethod" type="String">Nazev tridy a metody pro upravu parametru sestavy pred generovanim. Metoda musi byt staticka a musi obsahovat argumenty: GUserProcess, IGReport a volitelne vlastni DTO objekt (ten se plni v customDto v gprintAction).</field>
	this.ServerParameterMethod = '';
	/// <field name="CustomDto" type="Object">Custom dto pro doplneni parametru sestavy v ServerParameterMethod</field>
	this.CustomDto = { };
};

