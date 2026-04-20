var server = server || {};
/// <summary>Detail Esu Items Dto</summary>
server.GDetailEsuItemsDto = function() {
	/// <field name="AlType" type="Object">Datový typ interface AL</field>
	this.AlType = { };
	/// <field name="LzeEditovatZastupnouOsobu" type="Boolean">Zkontroluje zda lze editovat ZO</field>
	this.LzeEditovatZastupnouOsobu = false;
	/// <field name="IxsEsu" type="Object">Identifikátor externího subjektu</field>
	this.IxsEsu = { };
	/// <field name="TypEsu" type="Object">Typ externího subjektu</field>
	this.TypEsu = { };
	/// <field name="TypEsuString" type="Object">Typ externího subjektu String</field>
	this.TypEsuString = { };
	/// <field name="Nazev" type="Object">Název externího subjektu</field>
	this.Nazev = { };
	/// <field name="Zkratka" type="Object">Zratka</field>
	this.Zkratka = { };
	/// <field name="Poznamka" type="Object">Poznámka</field>
	this.Poznamka = { };
	/// <field name="StupenVerifikace" type="Object">StupenVerifikace</field>
	this.StupenVerifikace = { };
	/// <field name="Stat" type="Object">Stat</field>
	this.Stat = { };
	/// <field name="Stat_String" type="Object">Stat</field>
	this.Stat_String = { };
	/// <field name="StatSp" type="Object">Statni prislusnost</field>
	this.StatSp = { };
	/// <field name="Psc" type="Object">Psc</field>
	this.Psc = { };
	/// <field name="Obec" type="Object">Obec</field>
	this.Obec = { };
	/// <field name="CastObce" type="Object">CastObce</field>
	this.CastObce = { };
	/// <field name="Ulice" type="Object">Ulice</field>
	this.Ulice = { };
	/// <field name="CisloOrientacni" type="Object">CisloOrientacni</field>
	this.CisloOrientacni = { };
	/// <field name="CisloPopisne" type="Object">CisloPopisne</field>
	this.CisloPopisne = { };
	/// <field name="KodUirAdr" type="Object">KodUirAdr</field>
	this.KodUirAdr = { };
	/// <field name="KodUirAdrDoruc" type="Object">KodUirAdrDoruc - doručovací adresy</field>
	this.KodUirAdrDoruc = { };
	/// <field name="PoBox" type="Object">PoBox</field>
	this.PoBox = { };
	/// <field name="Telefon" type="Object">KodUirAdr</field>
	this.Telefon = { };
	/// <field name="EMail" type="Object">EMail</field>
	this.EMail = { };
	/// <field name="Fax" type="Object">Fax</field>
	this.Fax = { };
	/// <field name="ObchodniJmeno" type="Object">ObchodniJmeno</field>
	this.ObchodniJmeno = { };
	/// <field name="TypOrganizace" type="Object">TypOrganizace</field>
	this.TypOrganizace = { };
	/// <field name="Ico" type="Object">Ico</field>
	this.Ico = { };
	/// <field name="Dic" type="Object">Dic</field>
	this.Dic = { };
	/// <field name="RodneCislo" type="Object">RodneCislo</field>
	this.RodneCislo = { };
	/// <field name="Jmeno" type="Object">Jméno</field>
	this.Jmeno = { };
	/// <field name="Prijmeni" type="Object">Prijmeni</field>
	this.Prijmeni = { };
	/// <field name="TitulPred" type="Object">TitulPred</field>
	this.TitulPred = { };
	/// <field name="TitulZa" type="Object">TitulPred</field>
	this.TitulZa = { };
	/// <field name="St0" type="Object">Obálková adresa řádek 0</field>
	this.St0 = { };
	/// <field name="St1" type="Object">Obálková adresa řádek 1</field>
	this.St1 = { };
	/// <field name="St2" type="Object">Obálková adresa řádek 2</field>
	this.St2 = { };
	/// <field name="St3" type="Object">Obálková adresa řádek 3</field>
	this.St3 = { };
	/// <field name="St4" type="Object">Obálková adresa řádek 4</field>
	this.St4 = { };
	/// <field name="St5" type="Object">Obálková adresa řádek 5</field>
	this.St5 = { };
	/// <field name="St6" type="Object">Obálková adresa řádek 6</field>
	this.St6 = { };
	/// <field name="St7" type="Object">Obálková adresa řádek 7</field>
	this.St7 = { };
	/// <field name="UrPri" type="Object">Úroveň přístupu</field>
	this.UrPri = { };
	/// <field name="EsuTxt" type="Object">Textové vyjádření esu</field>
	this.EsuTxt = { };
	/// <field name="PrizDph" type="Object">Příznak, zda je plátce DPH</field>
	this.PrizDph = { };
	/// <field name="NeaktObaInt" type="Object">neaktualizovat obálkovou adresu z modulu INT</field>
	this.NeaktObaInt = { };
	/// <field name="Url" type="Object">url adresa organizace nebo občana</field>
	this.Url = { };
	/// <field name="DatNar" type="Object">datum narození</field>
	this.DatNar = { };
	/// <field name="Bio" type="Object">bezvýznamový identifikátor osoby</field>
	this.Bio = { };
	/// <field name="KodO" type="Object">kód oblasti (pro RRO)</field>
	this.KodO = { };
	/// <field name="Pco" type="Object">kód oblasti (pro RRO)</field>
	this.Pco = { };
	/// <field name="ixsOso" type="Object">idenitifikátor osoby (ROB)</field>
	this.ixsOso = { };
	/// <field name="ZmenuProv" type="Object">změnu provedl</field>
	this.ZmenuProv = { };
	/// <field name="IxsNad" type="Object">identifikátor hlavního ESU (pro pobočky)</field>
	this.IxsNad = { };
	/// <field name="IxsEko" type="Object">identifikátor hlavního eko ESU (pro pobočky a ekonomické subjekty)</field>
	this.IxsEko = { };
	/// <field name="IxsPrev" type="Object">identifikátor hlavního  ESU (při opravách esu vazba na nejnovější aktivní)</field>
	this.IxsPrev = { };
	/// <field name="Aifo" type="Object">agendový identifikátor v ROB</field>
	this.Aifo = { };
	/// <field name="AifoIseo" type="Object">agendový identifikátor v AISEO</field>
	this.AifoIseo = { };
	/// <field name="NahradniAifo" type="Object">příznak náhradního aifo</field>
	this.NahradniAifo = { };
	/// <field name="RegOdpovedId" type="Object">identifikátor AgendaZadostId</field>
	this.RegOdpovedId = { };
	/// <field name="AgendaZadostId" type="Object">identifikátor AgendaZadostId</field>
	this.AgendaZadostId = { };
	/// <field name="FrontaIszrZadostId" type="Object">identifikátor asynchronní žádosti do SZR</field>
	this.FrontaIszrZadostId = { };
	/// <field name="IszrZadostId" type="Object">identifikátor žádosti do SZR (pro uložení do &quot;V&quot; tabulek)</field>
	this.IszrZadostId = { };
	/// <field name="TypUpadkuTxt" type="Object">typ úpadku txt</field>
	this.TypUpadkuTxt = { };
	/// <field name="UrlUpadku" type="Object">url úpadku</field>
	this.UrlUpadku = { };
	/// <field name="GpsSirka" type="Object">gps šířka</field>
	this.GpsSirka = { };
	/// <field name="GpsDelka" type="Object">GPS délka</field>
	this.GpsDelka = { };
	/// <field name="PrizUmrti" type="Object">Příznak úmrtí</field>
	this.PrizUmrti = { };
	/// <field name="DatUmrti" type="Object">Datum úmrtí</field>
	this.DatUmrti = { };
	/// <field name="Oc" type="Object">Osobní číslo</field>
	this.Oc = { };
	/// <field name="Pohlavi" type="Object">m_nPohlavi</field>
	this.Pohlavi = { };
	/// <field name="RodStav" type="Object">m_nRodStav</field>
	this.RodStav = { };
	/// <field name="TypAdr" type="Object">m_nTypAdr</field>
	this.TypAdr = { };
	/// <field name="PrizInt" type="Object">Příznak interní adresy</field>
	this.PrizInt = { };
	/// <field name="RodPrijmeni" type="Object">m_sRodPrijmeni</field>
	this.RodPrijmeni = { };
	/// <field name="MistoNar" type="Object">m_sMistoNar</field>
	this.MistoNar = { };
	/// <field name="Prezdivka" type="Object">m_sPrezdivka</field>
	this.Prezdivka = { };
	/// <field name="IxsEsuZam" type="Object">m_sIxsEsuZam</field>
	this.IxsEsuZam = { };
	/// <field name="IdDs" type="Object">IdDs</field>
	this.IdDs = { };
	/// <field name="IdGex" type="Object">IdGex</field>
	this.IdGex = { };
	/// <field name="PartnerUct" type="Object">PartnerUct</field>
	this.PartnerUct = { };
	/// <field name="Aktivita" type="Object">Aktivita</field>
	this.Aktivita = { };
	/// <field name="DatZmena" type="Object">datum změny</field>
	this.DatZmena = { };
	/// <field name="MiJmeno" type="Object">MiJmeno</field>
	this.MiJmeno = { };
	/// <field name="MiPrijmeni" type="Object">MiPrijmeni</field>
	this.MiPrijmeni = { };
	/// <field name="Bic" type="Object">m_sBic</field>
	this.Bic = { };
	/// <field name="BicPoznamka" type="Object">m_sBic</field>
	this.BicPoznamka = { };
	/// <field name="BicAktivita" type="Object">BicAktivita</field>
	this.BicAktivita = { };
	/// <field name="BicTypBan" type="Object">BicTypBan</field>
	this.BicTypBan = { };
	/// <field name="GenerateSt" type="Boolean">Automatické generování obálkové adresy</field>
	this.GenerateSt = false;
	/// <field name="AutomatickeNacteniDetailu" type="Boolean">Určuje, zda se má automaticky provádět načítání detailů do objektů po volání metod, které provádí změnu dat v detailu.</field>
	this.AutomatickeNacteniDetailu = false;
	/// <field name="Insolvence" type="Object">Insolvence</field>
	this.Insolvence = { };
	/// <field name="IcoOrig" type="Object">IcoOrig</field>
	this.IcoOrig = { };
	/// <field name="FlagUlozeno" type="Boolean">FlagUlozeno saveESU old</field>
	this.FlagUlozeno = false;
	/// <field name="CheckBoxOpravit" type="Boolean">zaškrtávátko opravit u obálkové adresy</field>
	this.CheckBoxOpravit = false;
	/// <field name="ISZRtxt" type="Object">Obsah políčka ISZRtxt</field>
	this.ISZRtxt = { };
	/// <field name="doklady" type="Object[]">Dto s osobnímy doklady</field>
	this.doklady = [];
	/// <field name="obec_kod" type="Object">kod obce v adrese</field>
	this.obec_kod = { };
};

