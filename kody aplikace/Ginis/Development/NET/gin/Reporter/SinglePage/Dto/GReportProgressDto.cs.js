var server = server || {};
/// <summary>Udaje progresu generovani sestavy</summary>
server.GReportProgressDto = function() {
	/// <field name="BottomLabel" type="String">V TK spodni popisek</field>
	this.BottomLabel = '';
	/// <field name="Canceled" type="Boolean">Canceled</field>
	this.Canceled = false;
	/// <field name="Caption" type="String">V TK popisek okna</field>
	this.Caption = '';
	/// <field name="TopLabel" type="String">V TK horni popisek (nad teplomerem?)</field>
	this.TopLabel = '';
	/// <field name="Value" type="Number">Hodnota progresu</field>
	this.Value = 0;
};

