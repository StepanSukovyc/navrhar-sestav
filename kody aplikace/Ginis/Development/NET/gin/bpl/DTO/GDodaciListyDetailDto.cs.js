var server = server || {};
/// <summary>The GDodaciListyDetailDto class as defined in Gordic.Bpl.WebClient.GDodaciListyDetailDto</summary>
server.GDodaciListyDetailDto = function() {
	/// <field name="ixp" type="String">Identifikátor dokladu</field>
	this.ixp = '';
	/// <field name="ps_fak" type="String">Agendové číslo</field>
	this.ps_fak = '';
	/// <field name="ixp_dl" type="String">ID dodacího listu</field>
	this.ixp_dl = '';
	/// <field name="nks" type="String">NKS</field>
	this.nks = '';
	/// <field name="ucs" type="String">UCS</field>
	this.ucs = '';
	/// <field name="uus" type="String">UUS</field>
	this.uus = '';
	/// <field name="c" type="Object">Castka</field>
	this.c = { };
	/// <field name="ps_fak_stav" type="String">stav</field>
	this.ps_fak_stav = '';
	/// <field name="dat_zmena" type="Date">Datum změny</field>
	this.dat_zmena = new Date();
	/// <field name="zmenu_prov" type="String">Změnu provedl</field>
	this.zmenu_prov = '';
};

