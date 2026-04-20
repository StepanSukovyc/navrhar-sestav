var server = server || {};
/// <summary>Stav generovani reportu</summary>
server.GReportStateDto = function() {
	/// <field name="State" type="Number">Stav</field>
	this.State = 0;
	/// <field name="SessionName" type="String">Nazev session</field>
	this.SessionName = '';
	/// <field name="Progress" type="Object">Detail progressu</field>
	this.Progress = { };
};

