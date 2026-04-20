intellisense.annotate(Gordic.Data.Readers.GAdtReaderBalikyLicenci, function(options) {
/// <summary>
/// Klientská část AL - Baliky licenci
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderBalikyLicenci, function(options) {
/// <summary> Klientská část AL - Baliky licenci
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_lip"]
/// &#10;columns = ["nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderCenik, function(options) {
/// <summary>
/// Klientská část AL - Dostupne polozky noveho ceniku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderCenik, function(options) {
/// <summary> Klientská část AL - Dostupne polozky noveho ceniku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixp_ccm","nazev"]
/// &#10;columns = ["ixp_ccm","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderCenikovePolozky, function(options) {
/// <summary>
/// Klientská část AL - Dostupne verze pro doporučene revize
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderCenikovePolozky, function(options) {
/// <summary> Klientská část AL - Dostupne verze pro doporučene revize
/// &#10;
/// &#10;# Data
/// &#10;keys = ["pol", "ppol"]
/// &#10;columns = ["pol", "ppol"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{pol} | {ppol}"
/// &#10;helperItemTemplate = "<b>{pol}</b> | {ppol}"
/// &#10;helperColumns = ["pol", "ppol"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderDalsiSoubory, function(options) {
/// <summary>
/// Klientská část AL - Dalsi Soubory
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderDalsiSoubory, function(options) {
/// <summary> Klientská část AL - Dalsi Soubory
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_dif"]
/// &#10;columns = ["ixs_dif"/"nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderDistributor, function(options) {
/// <summary>
/// Klientská část AL - Distributor
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderDistributor, function(options) {
/// <summary> Klientská část AL - Distributor
/// &#10;
/// &#10;# Data
/// &#10;keys = ["distributor"]
/// &#10;columns = ["nazev_distributor"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev_distributor}"
/// &#10;helperItemTemplate = "{nazev_distributor}"
/// &#10;helperColumns = ["nazev_distributor"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderDostupneVerzeRevize, function(options) {
/// <summary>
/// Klientská část AL - Dostupne verze pro doporučene revize
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderDostupneVerzeRevize, function(options) {
/// <summary> Klientská část AL - Dostupne verze pro doporučene revize
/// &#10;
/// &#10;# Data
/// &#10;keys = ["verze_db"]
/// &#10;columns = ["verze_db", "sub_verze_db"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{verze_db}.{sub_verze_db}"
/// &#10;helperColumns = ["verze_db", "sub_verze_db"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderFaze, function(options) {
/// <summary>
/// Klientská část AL - Dostupne faze pro statistiku fazi
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderFaze, function(options) {
/// <summary> Klientská část AL - Dostupne faze pro statistiku fazi
/// &#10;
/// &#10;# Data
/// &#10;keys = "faze"
/// &#10;columns = ["faze","faze_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{faze} | {faze_txt}"
/// &#10;helperItemTemplate = "<b>{faze}</b> | {faze_txt}"
/// &#10;helperColumns = ["faze", "faze_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderGDZBaliky, function(options) {
/// <summary>
/// Klientská část AL - Dostupne GDZ baliky
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderGDZBaliky, function(options) {
/// <summary> Klientská část AL - Dostupne GDZ baliky
/// &#10;
/// &#10;# Data
/// &#10;keys = "ixs_gdt"
/// &#10;columns = ["ixs_gdt", "popis"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ixs_gdt} | {popis}"
/// &#10;helperItemTemplate = "<b>{ixs_gdt}</b> | {popis}"
/// &#10;helperColumns = ["ixs_gdt", "popis"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderIcoAdministrace, function(options) {
/// <summary>
/// Klientská část AL - Dostupna ICA pro administraci
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderIcoAdministrace, function(options) {
/// <summary> Klientská část AL - Dostupna ICA pro administraci
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico_adm"]
/// &#10;columns = ["ico_adm", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ico_adm} | {nazev}"
/// &#10;helperItemTemplate = "<b>{ico_adm}</b> | {nazev}"
/// &#10;helperColumns = ["ico_adm", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderIcoFakturace, function(options) {
/// <summary>
/// Klientská část AL - Dostupna ICA pro fakturaci
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderIcoFakturace, function(options) {
/// <summary> Klientská část AL - Dostupna ICA pro fakturaci
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico_fakt"]
/// &#10;columns = ["ico_fakt", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ico_fakt} | {nazev}"
/// &#10;helperItemTemplate = "<b>{ico_fakt}</b> | {nazev}"
/// &#10;helperColumns = ["ico_fakt", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderLicenceDatabazi, function(options) {
/// <summary>
/// Klientská část AL - Vlastni licence databazi
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderLicenceDatabazi, function(options) {
/// <summary> Klientská část AL - Vlastni licence databazi
/// &#10;
/// &#10;# Data
/// &#10;keys = ["lic_fyz"]
/// &#10;columns = ["lic_fyz","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{lic_fyz} | {nazev}"
/// &#10;helperItemTemplate = "<b>{lic_fyz}</b> | {nazev}"
/// &#10;helperColumns = ["lic_fyz", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderObc, function(options) {
/// <summary>
/// Klientská část AL - gdesobc
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderObc, function(options) {
/// <summary> Klientská část AL - gdesobc
/// &#10;
/// &#10;# Data
/// &#10;keys = ["obchodnik","distributor"]
/// &#10;columns = ["nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev_obc}"
/// &#10;helperItemTemplate = "{nazev_obc}"
/// &#10;helperColumns = ["nazev_obc"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderORJ, function(options) {
/// <summary>
/// Klientská část AL - Dostupne ORJ
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderORJ, function(options) {
/// <summary> Klientská část AL - Dostupne ORJ
/// &#10;
/// &#10;# Data
/// &#10;keys = "orj"
/// &#10;columns = ["orj", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{orj} | {nazev}"
/// &#10;helperItemTemplate = "<b>{orj}</b> | {nazev}"
/// &#10;helperColumns = ["orj", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderPol, function(options) {
/// <summary>
/// Klientská část AL - Dostupne cenikove polozky
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderPol, function(options) {
/// <summary> Klientská část AL - Dostupne cenikove polozky
/// &#10;
/// &#10;# Data
/// &#10;keys = "pol"
/// &#10;columns = ["pol","popis_pol"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{pol} | {popis_pol}"
/// &#10;helperItemTemplate = "<b>{pol}</b> | {popis_pol}"
/// &#10;helperColumns = ["pol", "popis_pol"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderPolBezLicPopl, function(options) {
/// <summary>
/// Klientská část AL - Dostupne polozky bez licencnich polatku pro danou licenci
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderPolBezLicPopl, function(options) {
/// <summary> Klientská část AL - Dostupne polozky bez licencnich polatku pro danou licenci
/// &#10;
/// &#10;# Data
/// &#10;keys = "pol"
/// &#10;columns = ["pol", "popis_pol"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{pol} | {popis_pol}"
/// &#10;helperItemTemplate = "<b>{pol}</b> | {popis_pol}"
/// &#10;helperColumns = ["pol", "popis_pol"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderPpol, function(options) {
/// <summary>
/// Klientská část AL - Dostupne cenikove podpolozky
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderPpol, function(options) {
/// <summary> Klientská část AL - Dostupne cenikove podpolozky
/// &#10;
/// &#10;# Data
/// &#10;keys = "ppol"
/// &#10;columns = ["ppol","popis"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ppol} | {popis}"
/// &#10;helperItemTemplate = "<b>{ppol}</b> | {popis}"
/// &#10;helperColumns = ["ppol", "popis"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderProdListy, function(options) {
/// <summary>
/// Klientská část AL - Dostupne Produktove listy
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderProdListy, function(options) {
/// <summary> Klientská část AL - Dostupne Produktove listy
/// &#10;
/// &#10;# Data
/// &#10;keys = ["id_listu"]
/// &#10;columns = ["id_listu","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{id_listu} | {nazev}"
/// &#10;helperItemTemplate = "<b>{id_listu}</b> | {nazev}"
/// &#10;helperColumns = ["id_listu", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderRevize, function(options) {
/// <summary>
/// Klientská část AL - Dostupne nezakazane Revize
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderRevize, function(options) {
/// <summary> Klientská část AL - Dostupne nezakazane Revize
/// &#10;
/// &#10;# Data
/// &#10;keys = ["revize"]
/// &#10;columns = ["revize"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{revize}"
/// &#10;helperItemTemplate = "<b>{revize}</b>"
/// &#10;helperColumns = ["revize"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderSkupinyDatabazi, function(options) {
/// <summary>
/// Klientská část AL - Vlastni skupiny databazi
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderSkupinyDatabazi, function(options) {
/// <summary> Klientská část AL - Vlastni skupiny databazi
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_sdb"]
/// &#10;columns = ["ixs_sdb", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ixs_sdb} | {nazev}"
/// &#10;helperItemTemplate = "<b>{ixs_sdb}</b> | {nazev}"
/// &#10;helperColumns = ["ixs_sdb", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderTypImpl, function(options) {
/// <summary>
/// Klientská část AL - Typ implementace
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderTypImpl, function(options) {
/// <summary> Klientská část AL - Typ implementace
/// &#10;
/// &#10;# Data
/// &#10;keys = ["tyi"]
/// &#10;columns = ["tyi_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{tyi_txt}"
/// &#10;helperItemTemplate = "{tyi_txt}"
/// &#10;helperColumns = ["tyi_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderVerzeDB, function(options) {
/// <summary>
/// Klientská část AL - Dostupne verze databaze
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderVerzeDB, function(options) {
/// <summary> Klientská část AL - Dostupne verze databaze
/// &#10;
/// &#10;# Data
/// &#10;keys = ["verze_db"]
/// &#10;columns = ["verze_db"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{verze_db}"
/// &#10;helperItemTemplate = "{verze_db}"
/// &#10;helperColumns = ["verze_db"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderVerzeGDZBaliku, function(options) {
/// <summary>
/// Klientská část AL - Dostupne verze GDZ baliku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderVerzeGDZBaliku, function(options) {
/// <summary> Klientská část AL - Dostupne verze GDZ baliku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["verze_db"]
/// &#10;columns = ["verze_db", "sub_verze_db", "revize_adz"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{verze_db}.{sub_verze_db}.{revize_adz}"
/// &#10;helperColumns = ["verze_db", "sub_verze_db", "revize_adz"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderVlastniLicDB, function(options) {
/// <summary>
/// Klientská část AL - Vlastni licence DB
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderVlastniLicDB, function(options) {
/// <summary> Klientská část AL - Vlastni licence DB
/// &#10;
/// &#10;# Data
/// &#10;keys = "lic"
/// &#10;columns = ["lic", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{lic} | {nazev}"
/// &#10;helperItemTemplate = "<b>{lic}</b> | {nazev}"
/// &#10;helperColumns = ["lic", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GAdtReaderVlastniLicRad, function(options) {
/// <summary>
/// Klientská část AL - Vlastni licence rad PID
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gAdtReaderVlastniLicRad, function(options) {
/// <summary> Klientská část AL - Vlastni licence rad PID
/// &#10;
/// &#10;# Data
/// &#10;keys = "lic"
/// &#10;columns = ["lic", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{lic} | {nazev}"
/// &#10;helperItemTemplate = "<b>{lic}</b> | {nazev}"
/// &#10;helperColumns = ["lic", "nazev"]
/// </summary>
});
