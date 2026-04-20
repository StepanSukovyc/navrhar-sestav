intellisense.annotate(Gordic.Data.Readers.EkoskomADA, function(options) {
/// <summary>
/// Klientská část AL - Kompetent
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ekoskomADA, function(options) {
/// <summary> Klientská část AL - Kompetent
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico","ixs_fun"]
/// &#10;columns = ["nazev", "nazev_rf", "nazev_su", "nazev_orj"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = function
/// &#10;graphicInput = "oninput"
/// &#10;itemTooltipTemplate = function
/// &#10;verticalButtons = true
/// &#10;helperColumns = ["nazev_ref", "nazev", "nazev_su", "nazev_orj"]
/// &#10;states = [{
/// &#10;        icon: "gi-user",
/// &#10;        align: "opposite",
/// &#10;        customClass: "g-inactive-prefabState"
/// &#10;    }]
/// </summary>
});
intellisense.annotate(Gordic.Prefabs.Select.ekoskomADAMini, function(options) {
/// <summary> Klientská část AL - Kompetent
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico","ixs_fun"]
/// &#10;columns = ["nazev", "nazev_rf", "nazev_su", "nazev_orj"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev_rf:trim:encode}"
/// &#10;itemTooltipTemplate = "{nazev_rf:trim:encode}"
/// &#10;graphicInput = "oninput"
/// &#10;verticalButtons = true
/// &#10;helperColumns = ["nazev_rf"]
/// &#10;states = [{
/// &#10;        icon: "gi-user",
/// &#10;        align: "opposite",
/// &#10;        customClass: "g-inactive-prefabState"
/// &#10;    }]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.EkosrarADA, function(options) {
/// <summary>
/// Typ ceny
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ekosrarADA, function(options) {
/// <summary> Typ ceny
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico"]
/// &#10;columns = ["ico","nazev","aktivita","dor2","org","typ_org"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.EvzcspeADA, function(options) {
/// <summary>
/// Stavy ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.evzcspeADA, function(options) {
/// <summary> Stavy ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["schv_spec"]
/// &#10;columns = ["schv_spec","schv_spec_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{schv_spec_txt}"
/// &#10;helperColumns = ["schv_spec_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.GincaktADA, function(options) {
/// <summary>
/// aktivita ADA
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincaktADA, function(options) {
/// <summary> aktivita ADA
/// &#10;
/// &#10;# Data
/// &#10;keys = ["aktivita"]
/// &#10;columns = ["aktivita","aktivita_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{aktivita_txt:trim:encode}"
/// &#10;helperColumns = ["aktivita", "aktivita_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.ISPPriloha, function(options) {
/// <summary>
/// ISP Priloha
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.iSPPriloha, function(options) {
/// <summary> ISP Priloha
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixb"]
/// &#10;columns = ["ixb","ixs","popis"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{popis}"
/// &#10;helperColumns = ["popis"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.MajsmajADA, function(options) {
/// <summary>
/// Klientská část AL - číselník Inventárních čísel majetku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.majsmajADA, function(options) {
/// <summary> Klientská část AL - číselník Inventárních čísel majetku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["inv_cis"]
/// &#10;columns = ["inv_cis","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{inv_cis} - {nazev}"
/// &#10;helperColumns = ["inv_cis", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.MatskcmADA, function(options) {
/// <summary>
/// Klientská část AL - číselník Inventárních čísel majetku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.matskcmADA, function(options) {
/// <summary> Klientská část AL - číselník Inventárních čísel majetku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["idk"]
/// &#10;columns = ["idk","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{idk} - {nazev}"
/// &#10;helperColumns = ["idk", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvcsaz, function(options) {
/// <summary>
/// Stavy ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvcsaz, function(options) {
/// <summary> Stavy ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["stav_az"]
/// &#10;columns = ["stav_az","stav_az_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{stav_az_txt}"
/// &#10;helperColumns = ["stav_az_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvcsre, function(options) {
/// <summary>
/// Stavy ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvcsre, function(options) {
/// <summary> Stavy ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["stav_real"]
/// &#10;columns = ["stav_real","stav_real_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{stav_real_txt}"
/// &#10;helperColumns = ["stav_real_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvctas, function(options) {
/// <summary>
/// Stavy ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvctas, function(options) {
/// <summary> Stavy ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_akce_sum"]
/// &#10;columns = ["typ_akce_sum","typ_akce_sum_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{typ_akce_sum_txt}"
/// &#10;helperColumns = ["typ_akce_sum_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvctva, function(options) {
/// <summary>
/// Stav položky VP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvctva, function(options) {
/// <summary> Stav položky VP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_vzb"]
/// &#10;columns = ["typ_vzb", "typ_vzb_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{typ_vzb_txt}"
/// &#10;helperColumns = ["typ_vzb_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvscia, function(options) {
/// <summary>
/// Akce
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvscia, function(options) {
/// <summary> Akce
/// &#10;
/// &#10;# Data
/// &#10;keys = ["cislo"]
/// &#10;columns = ["cislo","nazev","rok","ico","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{cislo}"
/// &#10;helperColumns = ["cislo" ]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvsdde, function(options) {
/// <summary>
/// Subřady akcí
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvsdde, function(options) {
/// <summary> Subřady akcí
/// &#10;
/// &#10;# Data
/// &#10;keys = ["subrada"]
/// &#10;columns = ["rok","ico","ixs_pla","subrada","nazev","maska","cislo_od","cislo_do"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{subrada}-{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvspla, function(options) {
/// <summary>
/// Typ ceny
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvspla, function(options) {
});
intellisense.annotate(Gordic.Data.Readers.Srvsprr, function(options) {
/// <summary>
/// Stav položky VP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvsprr, function(options) {
/// <summary> Stav položky VP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_prr"]
/// &#10;columns = ["ixs_prr","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvspsk, function(options) {
/// <summary>
/// Klientská část AL - číselník Podskupina
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvspsk, function(options) {
/// <summary> Klientská část AL - číselník Podskupina
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_csp","skp_akc","psk_akc"]
/// &#10;columns = ["ixs_csp","skp_akc","psk_akc","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{psk_akc} - {nazev}"
/// &#10;helperColumns = ["psk_akc", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvspsp, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvspsp, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["id_psp"]
/// &#10;columns = ["id_psp","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{id_psp} - {nazev}"
/// &#10;helperColumns = ["id_psp", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvsskp, function(options) {
/// <summary>
/// Klientská část AL - číselník Skupina
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvsskp, function(options) {
/// <summary> Klientská část AL - číselník Skupina
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_csp","skp_akc"]
/// &#10;columns = ["ixs_csp","skp_akc","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{skp_akc} - {nazev}"
/// &#10;helperColumns = ["skp_akc", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvstip, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvstip, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip"]
/// &#10;columns = ["ixs_tip", "nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.SrvstipADA, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvstipADA, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip"]
/// &#10;columns = ["ixs_tip", "nazev", "priz_pov"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = function
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.SrvstipADAAll, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvstipADAAll, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip"]
/// &#10;columns = ["ixs_tip","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvstri, function(options) {
/// <summary>
/// Stav položky VP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvstri, function(options) {
/// <summary> Stav položky VP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tri"]
/// &#10;columns = ["ixs_tri","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvstzd, function(options) {
/// <summary>
/// TZD
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvstzd, function(options) {
/// <summary> TZD
/// &#10;
/// &#10;# Data
/// &#10;keys = ["id_tzd"]
/// &#10;columns = ["id_tzd","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{id_tzd} - {nazev}"
/// &#10;helperColumns = ["id_tzd", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvsxpf, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvsxpf, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["xpf_pf"]
/// &#10;columns = ["xpf_pf","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{xpf_pf} - {nazev}"
/// &#10;helperColumns = ["xpf_pf", "nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.SrvvprrADA, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvvprrADA, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip","ixs_prr"]
/// &#10;columns = ["ixs_tip", "nazev", "priz_pov"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = function
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.SrvvtipADA, function(options) {
/// <summary>
/// ISP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvvtipADA, function(options) {
/// <summary> ISP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip","ixs_pla"]
/// &#10;columns = ["ixs_tip", "nazev", "priz_pov"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperItemTemplate = function
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Vepcstp, function(options) {
/// <summary>
/// Stav položky VP
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.vepcstp, function(options) {
/// <summary> Stav položky VP
/// &#10;
/// &#10;# Data
/// &#10;keys = ["vp_stav"]
/// &#10;columns = ["vp_stav","vp_stav_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{vp_stav_txt}"
/// &#10;helperColumns = ["vp_stav_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Zadavetel, function(options) {
/// <summary>
/// Typ ceny
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.zadavetel, function(options) {
/// <summary> Typ ceny
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico","ixs_fun"]
/// &#10;columns = ["nazev", "nazev_rf", "nazev_su", "nazev_orj"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = function
/// &#10;graphicInput = "oninput"
/// &#10;itemTooltipTemplate = function
/// &#10;verticalButtons = true
/// &#10;helperColumns = ["nazev_ref", "nazev", "nazev_su", "nazev_orj"]
/// &#10;states = [{
/// &#10;        icon: "gi-user",
/// &#10;        align: "opposite",
/// &#10;        customClass: "g-inactive-prefabState"
/// &#10;    }]
/// </summary>
});
intellisense.annotate(Gordic.Prefabs.Select.zadavetelMini, function(options) {
/// <summary> Typ ceny
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ico","ixs_fun"]
/// &#10;columns = ["nazev", "nazev_rf", "nazev_su", "nazev_orj"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev_ref:trim:encode}"
/// &#10;itemTooltipTemplate = "{nazev_ref:trim:encode}"
/// &#10;graphicInput = "oninput"
/// &#10;verticalButtons = true
/// &#10;helperColumns = ["nazev_ref"]
/// &#10;states = [{
/// &#10;        icon: "gi-user",
/// &#10;        align: "opposite",
/// &#10;        customClass: "g-inactive-prefabState"
/// &#10;    }]
/// </summary>
});
