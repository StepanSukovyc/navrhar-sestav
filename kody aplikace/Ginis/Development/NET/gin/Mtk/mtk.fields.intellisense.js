intellisense.annotate(Gordic.Data.Readers.Robctyp, function(options) {
/// <summary>
/// Klientská část AL - číselník kategorie deníku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.robctyp, function(options) {
/// <summary> Klientská část AL - číselník kategorie deníku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ktg_den"]
/// &#10;columns = ["ktg_den","ktg_den_txt","k_v"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ktg_den_txt}"
/// &#10;helperColumns = ["ktg_den_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Robcvid, function(options) {
/// <summary>
/// Klientská část AL - číselník typ události
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.robcvid, function(options) {
/// <summary> Klientská část AL - číselník typ události
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_vid"]
/// &#10;columns = ["typ_vid","typ_vid_txt","k_v"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{typ_vid_txt}"
/// &#10;helperColumns = ["typ_vid", "typ_vid_txt", "k_v", "k_s"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.PokvkonDto, function(options) {
/// <summary>
/// Klientská část AL - číselník Spojení pokladních sad předkontací a předkontací
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.pokvkonDto, function(options) {
/// <summary> Klientská část AL - číselník Spojení pokladních sad předkontací a předkontací
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_vpk","ixs_kon"]
/// &#10;columns = ["ixs_vpk","ixs_kon","aktivita","dat_zmena","zmenu_prov","typ_kon","kod","nazev","zkratka"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{kod}"
/// &#10;helperColumns = ["ixs_kon", "kod", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.PokvrfuDto, function(options) {
/// <summary>
/// Klientská část AL - číselník Spojení funkce a pokladní knihy
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.pokvrfuDto, function(options) {
/// <summary> Klientská část AL - číselník Spojení funkce a pokladní knihy
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_fun","ixp_den","subrada"]
/// &#10;columns = ["ixs_fun","ixp_den","subrada","aktivita","dat_od","dat_do","dat_zmena","zmenu_prov","ixs_fun","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Poksden, function(options) {
/// <summary>
/// Klientská část AL - Pokladní kniha
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.poksden, function(options) {
/// <summary> Klientská část AL - Pokladní kniha
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixp_den"]
/// &#10;columns = ["ixp_den","nazev","ixs_vpk"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Pokvkon, function(options) {
/// <summary>
/// Klientská část AL - Kontace pro knihu
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.pokvkon, function(options) {
/// <summary> Klientská část AL - Kontace pro knihu
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_kon"]
/// &#10;columns = ["ixs_kon","kod","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{kod}"
/// &#10;helperColumns = ["ixs_kon", "kod", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Pokvrfu, function(options) {
/// <summary>
/// Klientská část AL - Pokladníci
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.pokvrfu, function(options) {
/// <summary> Klientská část AL - Pokladníci
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_fun"]
/// &#10;columns = ["ixs_fun","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Robsdmd, function(options) {
/// <summary>
/// Klientská část AL - Knihy MTK
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.robsdmd, function(options) {
/// <summary> Klientská část AL - Knihy MTK
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixp_dmd"]
/// &#10;columns = ["ixp_dmd","nazev","rok"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = false
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["ixp_dmd", "nazev", "rok"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Robsjme, function(options) {
/// <summary>
/// Klientská část AL - Číselník jmen
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.robsjme, function(options) {
/// <summary> Klientská část AL - Číselník jmen
/// &#10;
/// &#10;# Data
/// &#10;keys = ["jmeno"]
/// &#10;columns = ["jmeno","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{jmeno}"
/// &#10;helperColumns = ["jmeno"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Robspri, function(options) {
/// <summary>
/// Klientská část AL - Číselník příjmení
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.robspri, function(options) {
/// <summary> Klientská část AL - Číselník příjmení
/// &#10;
/// &#10;# Data
/// &#10;keys = ["prijmeni"]
/// &#10;columns = ["prijmeni","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{prijmeni}"
/// &#10;helperColumns = ["prijmeni"]
/// </summary>
});
