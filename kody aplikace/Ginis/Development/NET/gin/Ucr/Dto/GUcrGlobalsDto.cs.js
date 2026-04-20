var server = server || {};
/// <summary>ReadOnly DTO s podmnozinou globalnich parametru UCR</summary>
server.GUcrGlobalsDto = function() {
	/// <field name="PlatnostPM" type="Object">Datum, ke kterému se vztahuje platnost pevné masky</field>
	this.PlatnostPM = { };
	/// <field name="RezimProvozu" type="Object">Režim provozu</field>
	this.RezimProvozu = { };
	/// <field name="MaxRezimProvozu" type="Object">Maximální režim provozu</field>
	this.MaxRezimProvozu = { };
	/// <field name="TypSumarizace" type="Object">Typ sumarizace</field>
	this.TypSumarizace = { };
	/// <field name="PredplnUCS" type="Boolean">predplnovani ucs</field>
	this.PredplnUCS = false;
	/// <field name="PredplnPri" type="Object">predplnovani pristupu k NS</field>
	this.PredplnPri = { };
	/// <field name="VlastniZahlavi" type="Boolean">moznost nastaveni vlastniho zahlavi</field>
	this.VlastniZahlavi = false;
	/// <field name="Rad_NovyPozadavek" type="Boolean">povoleni na ulozeni noveho pozadavku</field>
	this.Rad_NovyPozadavek = false;
	/// <field name="Rad_ZrusPozadavek" type="Boolean">povoleni na zruseni pozadavku</field>
	this.Rad_ZrusPozadavek = false;
	/// <field name="Rad_ZrusCiziPozadavek" type="Boolean">povoleni na zruseni cizich pozadavku</field>
	this.Rad_ZrusCiziPozadavek = false;
	/// <field name="Rad_NovaMaska" type="Boolean">povoleni na ulozeni nove masky</field>
	this.Rad_NovaMaska = false;
	/// <field name="Rad_ZrusMasku" type="Boolean">povoleni na zruseni masky</field>
	this.Rad_ZrusMasku = false;
	/// <field name="Rad_OdeslatMail" type="Boolean">odeslání sestavy generované mailem</field>
	this.Rad_OdeslatMail = false;
	/// <field name="Rad_Financovani" type="Boolean">povolení prohlížení Financování</field>
	this.Rad_Financovani = false;
	/// <field name="Rad_Dph" type="Boolean">povolení prohlížení DPH</field>
	this.Rad_Dph = false;
	/// <field name="Rad_Rzp" type="Boolean">povolení Registru P/Z</field>
	this.Rad_Rzp = false;
	/// <field name="Rad_Vdu" type="Object">povolení Vykaznictvi DU</field>
	this.Rad_Vdu = { };
	/// <field name="Dph_Rezim" type="Object">režim zpracování DPH</field>
	this.Dph_Rezim = { };
	/// <field name="Rad_DefaultSes" type="Boolean">ŘP - Možnost mít prázdnou pevnou masku. Při false nezobrazí nic pokud nemá administovánu pevnou masku.</field>
	this.Rad_DefaultSes = false;
	/// <field name="Rad_NabidkaSubrad" type="Boolean">možnost nabídky subřad na F4 na polích ac</field>
	this.Rad_NabidkaSubrad = false;
	/// <field name="Rad_ZobrazMdDal" type="Boolean">možnost zobrazení rozdílu MD-Dal v prohlížení</field>
	this.Rad_ZobrazMdDal = false;
	/// <field name="Rad_ZrusCiziODL" type="Boolean">mazání cizích požadavků ODL</field>
	this.Rad_ZrusCiziODL = false;
	/// <field name="Rad_EditCiziODL" type="Boolean">editace cizích požadavků ODL</field>
	this.Rad_EditCiziODL = false;
	/// <field name="Rad_ODLEnabled" type="Boolean">povolení ODL</field>
	this.Rad_ODLEnabled = false;
	/// <field name="Rad_Pap" type="Object">Povoleni PAP kontrol a oprav</field>
	this.Rad_Pap = { };
	/// <field name="Rad_PapRocniPrepocetStavu" type="Boolean">Povoleni prepoctu stavu od zacatku roku</field>
	this.Rad_PapRocniPrepocetStavu = false;
	/// <field name="Rad_PapPovoleniZauctovani" type="Boolean">Povoleni zauctovani pap zapisu</field>
	this.Rad_PapPovoleniZauctovani = false;
	/// <field name="Rad_PapKontrolovatStrany" type="Boolean">Atribut, zda kontrolovat strany v PAP</field>
	this.Rad_PapKontrolovatStrany = false;
	/// <field name="RezimZpracovaniPap" type="Object">Rezim zpracovani vykazu v PAP nastroji</field>
	this.RezimZpracovaniPap = { };
	/// <field name="RezimZatridovani" type="Object">Rezim zatridovani analytik</field>
	this.RezimZatridovani = { };
	/// <field name="RezimVyrovnavaniPripadu" type="Object">Rezim vyrovnavani pripadu pap zapisy</field>
	this.RezimVyrovnavaniPripadu = { };
	/// <field name="FiltrNaTridy789Pap" type="String">Filtrovani na tridy 7,8,9</field>
	this.FiltrNaTridy789Pap = '';
	/// <field name="Rad_Risre" type="Object">povolení RISRE</field>
	this.Rad_Risre = { };
	/// <field name="Rad_Risdrez" type="Object">povolení RISRE/PS dávky rezervací</field>
	this.Rad_Risdrez = { };
	/// <field name="Rad_Risdrop" type="Object">povolení RISRE/PS dávky rozpočtu</field>
	this.Rad_Risdrop = { };
	/// <field name="Rad_RisStav" type="Object">povolení RISRE IISSP stavy rezervaci</field>
	this.Rad_RisStav = { };
	/// <field name="Rad_RisStrc" type="Object">povolení RISRE IISSP stavy rozpoctu a cerpani (Inbox)</field>
	this.Rad_RisStrc = { };
	/// <field name="Rad_RisStsk" type="Object">povolení RISRE IISSP stavy skutecnosti (Inbox)</field>
	this.Rad_RisStsk = { };
	/// <field name="Rad_RisVyka" type="Object">povolení RISRE IISSP stavy skutecnosti (Inbox)</field>
	this.Rad_RisVyka = { };
	/// <field name="Rad_RisOdes" type="Object">způsob odeslání RISRE/PS</field>
	this.Rad_RisOdes = { };
	/// <field name="Rad_Konsolidace" type="Object">povolení Konsolidace</field>
	this.Rad_Konsolidace = { };
	/// <field name="Rad_Ukazatele" type="Object">povolení Ukazatele</field>
	this.Rad_Ukazatele = { };
	/// <field name="Rad_UkazateleVL" type="Object">povolení Ukazatele VLZR</field>
	this.Rad_UkazateleVL = { };
	/// <field name="TypPraceWfl" type="Object">nastavení prace s WFL</field>
	this.TypPraceWfl = { };
	/// <field name="TypPraceESU" type="Object">nastavení prace s ESU</field>
	this.TypPraceESU = { };
	/// <field name="Rad_Esu_RcZobr" type="Boolean">možnost zobrazeni RČ</field>
	this.Rad_Esu_RcZobr = false;
	/// <field name="Rad_Esu_RcVyhl" type="Boolean">možnost vyhledávání RČ</field>
	this.Rad_Esu_RcVyhl = false;
	/// <field name="DelkaAcUct" type="Number">Délka AC pro UCT</field>
	this.DelkaAcUct = 0;
	/// <field name="DelkaAcRoz" type="Number">Délka AC pro ROZ</field>
	this.DelkaAcRoz = 0;
	/// <field name="DelkaAcMax" type="Number">Max(DelkaAcUct, DelkaAcRoz)</field>
	this.DelkaAcMax = 0;
	/// <field name="OtevreneObdobi" type="Boolean">Příznak, zda je aktuální období (EkoParams.Rok) otevřené (aktivita 100)</field>
	this.OtevreneObdobi = false;
};

