var server = server || {};
/// <summary>Obecne vlastnosti reportu</summary>
server.GReportPropsDto = function() {
	/// <field name="Platnost" type="String">Platnost (pretypovatelne na GEkoDate)</field>
	this.Platnost = '';
	/// <field name="RestrictionAlf" type="String">?</field>
	this.RestrictionAlf = '';
	/// <field name="RestrictionAlv" type="String">?</field>
	this.RestrictionAlv = '';
	/// <field name="ReportParams" type="Object">Parametry reportu (X0000 - X0009 i dalsi vlastni)</field>
	this.ReportParams = { };
};

