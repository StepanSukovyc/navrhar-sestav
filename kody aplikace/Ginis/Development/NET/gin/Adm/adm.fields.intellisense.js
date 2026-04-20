intellisense.annotate(Gordic.Data.Readers.Gincprf, function(options) {
/// <summary>
/// Klientská část AL - číselník Typ funkce
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincprf, function(options) {
/// <summary> Klientská část AL - číselník Typ funkce
/// &#10;
/// &#10;# Data
/// &#10;keys = ["pri_fun"]
/// &#10;columns = ["pri_fun","pri_fun_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{pri_fun_txt:trim:encode}"
/// &#10;helperColumns = ["pri_fun","pri_fun_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincpri, function(options) {
/// <summary>
/// Klientská část AL - číselník Priorita
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincpri, function(options) {
/// <summary> Klientská část AL - číselník Priorita
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priorita_max"]
/// &#10;columns = ["priorita_max","priorita_max_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priorita_max_txt:trim:encode}"
/// &#10;helperColumns = ["priorita_max","priorita_max_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincstf, function(options) {
/// <summary>
/// Klientská část AL - číselník Status funkce
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincstf, function(options) {
/// <summary> Klientská část AL - číselník Status funkce
/// &#10;
/// &#10;# Data
/// &#10;keys = ["status_fun"]
/// &#10;columns = ["status_fun","status_fun_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{status_fun_txt:trim:encode}"
/// &#10;helperColumns = ["status_fun","status_fun_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincufu, function(options) {
/// <summary>
/// Klientská část AL - číselník Úrovně funkčních míst
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincufu, function(options) {
/// <summary> Klientská část AL - číselník Úrovně funkčních míst
/// &#10;
/// &#10;# Data
/// &#10;keys = ["uroven_fun"]
/// &#10;columns = ["uroven_fun","uroven_fun_txt","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{uroven_fun_txt:trim:encode}"
/// &#10;helperColumns = ["uroven_fun","uroven_fun_txt","aktivita"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginsspu, function(options) {
/// <summary>
/// Klientská část AL - číselník Spouštění událost
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginsspu, function(options) {
/// <summary> Klientská část AL - číselník Spouštění událost
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_spu"]
/// &#10;columns = ["ixs_spu","zkratka","nazev","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginszap, function(options) {
/// <summary>
/// Klientská část AL - číselník Zpracování osobních údajů
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginszap, function(options) {
/// <summary> Klientská část AL - číselník Zpracování osobních údajů
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_zap"]
/// &#10;columns = ["ixs_zap","ktg_zap","nazev","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev:trim:encode}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmGincakt, function(options) {
/// <summary>
/// Klientská část AL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admGincakt, function(options) {
/// <summary> Klientská část AL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["aktivita"]
/// &#10;columns = ["aktivita","aktivita_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{aktivita_txt}"
/// &#10;helperColumns = ["aktivita_txt", "aktivita"]
/// &#10;dropdown = true
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmGinsmbx, function(options) {
/// <summary>
/// Klientská část AL - číselník Schránka
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admGinsmbx, function(options) {
/// <summary> Klientská část AL - číselník Schránka
/// &#10;
/// &#10;# Data
/// &#10;keys = ["mailbox"]
/// &#10;columns = ["mailbox","ixs_su_txt","nazev", "poznamka"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{mailbox:trim:encode}"
/// &#10;helperColumns = ["mailbox", "ixs_su_txt", "nazev", "poznamka"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmInterniSubjekt, function(options) {
/// <summary>
/// Klientská část prefabu pro AdmInterniSubjekt
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admInterniSubjekt, function(options) {
/// <summary> Klientská část prefabu pro AdmInterniSubjekt
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_esu"]
/// &#10;columns = ["ixs_esu","esu_txt","zkratka","poznamka","ico","dic","priz_hlavni_txt","ob_jmeno","ulice","cor","cpop","cast_obce","obec","psc","tel","mail","fax","st1","st2","st3","st4","st5","st6","st7","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{esu_txt}"
/// &#10;helperColumns = ["esu_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSrvspla, function(options) {
/// <summary>
/// Klientská část AL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admSrvspla, function(options) {
/// <summary> Klientská část AL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_pla"]
/// &#10;columns = ["ixs_pla", "nazev", "aktivita", "rok", "ico", "zkratka"]
/// &#10;
/// &#10;# Options
/// &#10;helperColumns = ["rok", "nazev", "zkratka"]
/// &#10;itemTemplate = "{nazev:trim:encode} ({rok})"
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSrvsprr, function(options) {
/// <summary>
/// Klientská část AL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admSrvsprr, function(options) {
/// <summary> Klientská část AL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_prr"]
/// &#10;columns = ["ixs_prr","nazev","poznamka","aktivita","zkratka"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSrvstip, function(options) {
/// <summary>
/// Klientská část AL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admSrvstip, function(options) {
/// <summary> Klientská část AL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tip"]
/// &#10;columns = ["ixs_tip", "nazev", "aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.DbLogins, function(options) {
/// <summary>
/// Číselník gincpar
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.dbLogins, function(options) {
/// <summary> Číselník gincpar
/// &#10;
/// &#10;# Data
/// &#10;keys = ["name"]
/// &#10;columns = ["name"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{name}"
/// &#10;helperColumns = ["name"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincaut, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincaut, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_aute"]
/// &#10;columns = ["typ_aute","typ_aute_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{typ_aute_txt}"
/// &#10;helperColumns = ["typ_aute_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginccfg, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginccfg, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["uroven_cfg"]
/// &#10;columns = ["uroven_cfg","uroven_cfg_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{uroven_cfg_txt}"
/// &#10;helperColumns = ["uroven_cfg_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincdat, function(options) {
/// <summary>
/// Číselník Sslcpdc
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincdat, function(options) {
/// <summary> Číselník Sslcpdc
/// &#10;
/// &#10;# Data
/// &#10;keys = ["dat_typ"]
/// &#10;columns = ["dat_typ","dat_typ_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{dat_typ_txt}"
/// &#10;helperColumns = ["dat_typ_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincevn, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincevn, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ktg_evn"]
/// &#10;columns = ["ktg_evn","ktg_evn_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{ktg_evn_txt}"
/// &#10;helperColumns = ["ktg_evn_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincmbx, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincmbx, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_mbx"]
/// &#10;columns = ["typ_mbx","typ_mbx_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{typ_mbx_txt}"
/// &#10;helperColumns = ["typ_mbx_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincorj, function(options) {
/// <summary>
/// Číselník Gincorj
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincorj, function(options) {
/// <summary> Číselník Gincorj
/// &#10;
/// &#10;# Data
/// &#10;keys = ["uroven_orj"]
/// &#10;columns = ["uroven_orj", "uroven_orj_txt", "aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{uroven_orj_txt}"
/// &#10;helperColumns = ["uroven_orj_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincpar, function(options) {
/// <summary>
/// Číselník gincpar
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincpar, function(options) {
/// <summary> Číselník gincpar
/// &#10;
/// &#10;# Data
/// &#10;keys = ["param"]
/// &#10;columns = ["param", "param_txt", "aktivita", "popis"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{param_txt:trim:encode} ({param:trim:encode})"
/// &#10;helperColumns = ["param_txt", "param"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincsve, function(options) {
/// <summary>
/// Klientská část pro reader světadíl
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincsve, function(options) {
/// <summary> Klientská část pro reader světadíl
/// &#10;
/// &#10;# Data
/// &#10;keys = ["svetadil"]
/// &#10;columns = ["svetadil","svetadil_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{svetadil_txt}"
/// &#10;helperColumns = ["svetadil_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginctau, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginctau, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_aut"]
/// &#10;columns = ["typ_aut","typ_aut_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{typ_aut_txt}"
/// &#10;helperColumns = ["typ_aut_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginctvp, function(options) {
/// <summary>
/// Číselník Sslcpdc
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginctvp, function(options) {
/// <summary> Číselník Sslcpdc
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_vla"]
/// &#10;columns = ["typ_vla","typ_vla_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{typ_vla_txt}"
/// &#10;helperColumns = ["typ_vla_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Gincuvl, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.gincuvl, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["uroven_vla"]
/// &#10;columns = ["uroven_vla","uroven_vla_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{uroven_vla_txt}"
/// &#10;helperColumns = ["uroven_vla_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginchop, function(options) {
/// <summary>
/// Číselník ginchop - param, config, config_txt, popis, aktivita
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginchop, function(options) {
/// <summary> Číselník ginchop - param, config, config_txt, popis, aktivita
/// &#10;
/// &#10;# Data
/// &#10;keys = ["param","config"]
/// &#10;columns = ["param","config","config_txt","popis","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{config_txt}"
/// &#10;helperColumns = ["config_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginsins, function(options) {
/// <summary>
/// Číselník ginsins
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginsins, function(options) {
/// <summary> Číselník ginsins
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_ins"]
/// &#10;columns = ["ixs_ins","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev}"
/// &#10;helperColumns = ["nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginssta, function(options) {
/// <summary>
/// Klientská část Stanice
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginssta, function(options) {
/// <summary> Klientská část Stanice
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ip_adr"]
/// &#10;columns = ["ip_adr","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{ip_adr:trim:encode}"
/// &#10;helperItemTemplate = "<b>{ip_adr:trim:encode}</b>&nbsp;<span>{nazev:trim:encode}</span>"
/// &#10;helperColumns = ["ip_adr", "nazev"]
/// &#10;graphicInput = "oninput"
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Ginstre, function(options) {
/// <summary>
/// Číselník Ginstre
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.ginstre, function(options) {
/// <summary> Číselník Ginstre
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_tre"]
/// &#10;columns = ["ixs_tre","nazev", "ico" ]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev:trim:encode}"
/// &#10;helperColumns = ["ico","nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Srvscsp, function(options) {
/// <summary>
/// Klientská část AL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.srvscsp, function(options) {
/// <summary> Klientská část AL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_csp"]
/// &#10;columns = ["ixs_csp","nazev","zkratka","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = (obj) => {
/// &#10;		var result = "";
/// &#10;	    result += "{0}".format(obj.nazev)
/// &#10;		if (obj.zkratka.trim() != "" && obj.zkratka != undefined)
/// &#10;			result += " ({0})".format(obj.zkratka)
/// &#10;		return result
/// &#10;	}
/// &#10;helperColumns = ["nazev", "zkratka"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslcpco, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslcpco, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_cj_only"]
/// &#10;columns = ["priz_cj_only","priz_cj_only_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{priz_cj_only_txt}"
/// &#10;helperColumns = ["priz_cj_only_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslcpdc, function(options) {
/// <summary>
/// Číselník Sslcpdc
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslcpdc, function(options) {
/// <summary> Číselník Sslcpdc
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_den_cj"]
/// &#10;columns = ["priz_den_cj","priz_den_cj_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_den_cj_txt}"
/// &#10;helperColumns = ["priz_den_cj_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslcpuz, function(options) {
/// <summary>
/// Číselník Sslcpuz
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslcpuz, function(options) {
/// <summary> Číselník Sslcpuz
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_uzav"]
/// &#10;columns = ["priz_uzav","priz_uzav_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_uzav_txt}"
/// &#10;helperColumns = ["priz_uzav_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslctyd, function(options) {
/// <summary>
/// Číselník Sslctyd
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslctyd, function(options) {
/// <summary> Číselník Sslctyd
/// &#10;
/// &#10;# Data
/// &#10;keys = ["typ_den"]
/// &#10;columns = ["typ_den","typ_den_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{typ_den_txt}"
/// &#10;helperColumns = ["typ_den_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslsump, function(options) {
/// <summary>
/// Číselník ginctau
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslsump, function(options) {
/// <summary> Číselník ginctau
/// &#10;
/// &#10;# Data
/// &#10;keys = ["umisteni"]
/// &#10;columns = ["umisteni","umisteni_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{umisteni_txt}"
/// &#10;helperColumns = ["umisteni_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Wflcpak, function(options) {
/// <summary>
/// Číselník wflcpak
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.wflcpak, function(options) {
/// <summary> Číselník wflcpak
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_akr"]
/// &#10;columns = ["priz_akr","priz_akr_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_akr_txt}"
/// &#10;helperColumns = ["priz_akr_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.WindowsLogins, function(options) {
/// <summary>
/// Číselník WindowsLogins
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.windowsLogins, function(options) {
/// <summary> Číselník WindowsLogins
/// &#10;
/// &#10;# Data
/// &#10;keys = ["name"]
/// &#10;columns = ["name"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{name}"
/// &#10;helperColumns = ["name"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Intcpes, function(options) {
/// <summary>
/// Klientská část AL - číselník Skartace pozastavena
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.intcpes, function(options) {
/// <summary> Klientská část AL - číselník Skartace pozastavena
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_ess"]
/// &#10;columns = ["priz_ess","priz_ess_txt"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_ess_txt}"
/// &#10;helperColumns = ["priz_ess_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslcpfy, function(options) {
/// <summary>
/// Klientská část AL - číselník Forma dokumentu
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslcpfy, function(options) {
/// <summary> Klientská část AL - číselník Forma dokumentu
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_fyz"]
/// &#10;columns = ["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_fyz_txt:trim:encode}"
/// &#10;helperColumns = ["priz_fyz_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Sslcusz, function(options) {
/// <summary>
/// Klientská část AL - číselník Určení spis.znaku
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.sslcusz, function(options) {
/// <summary> Klientská část AL - číselník Určení spis.znaku
/// &#10;
/// &#10;# Data
/// &#10;keys = ["urceni_spis_z"]
/// &#10;columns = ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{urceni_spis_z_txt:trim:encode}"
/// &#10;helperColumns = ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSslsden, function(options) {
/// <summary>
/// Klientská část AL - číselník Deník SSL
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admsslsden, function(options) {
/// <summary> Klientská část AL - číselník Deník SSL
/// &#10;
/// &#10;# Data
/// &#10;keys = ["sslden"]
/// &#10;columns = ["sslden","aktivita","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev:trim:encode}"
/// &#10;helperColumns = ["sslden","aktivita","nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSslsspl, function(options) {
/// <summary>
/// Klientská část AL - číselník Spisový plán
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admsslsspl, function(options) {
/// <summary> Klientská část AL - číselník Spisový plán
/// &#10;
/// &#10;# Data
/// &#10;keys = ["spis_pl"]
/// &#10;columns = ["spis_pl","aktivita","nazev"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{nazev:trim:encode}"
/// &#10;helperColumns = ["spis_pl","aktivita","nazev"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmSslsspz, function(options) {
/// <summary>
/// Klientská část AL - číselník Spisový znak
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admsslsspz, function(options) {
/// <summary> Klientská část AL - číselník Spisový znak
/// &#10;
/// &#10;# Data
/// &#10;keys = ["spis_pl","spis_znak"]
/// &#10;columns = ["spis_pl", "spis_znak", "aktivita", "nazev","spis_znak_pod_next"]
/// &#10;
/// &#10;# Options
/// &#10;graphicInput = "exclusive"
/// &#10;itemTemplate = function
/// &#10;helperColumns = ["spis_pl", "spis_znak", "aktivita", "nazev","spis_znak_pod_next"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmWflscer, function(options) {
/// <summary>
/// Klientská část AL - číselník Elektronické certifikáty
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admWflscer, function(options) {
/// <summary> Klientská část AL - číselník Elektronické certifikáty
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_cer"]
/// &#10;columns = ["jmeno_txt"]
/// &#10;
/// &#10;# Options
/// &#10;dropdown = true
/// &#10;itemTemplate = "{jmeno_txt:trim:encode}"
/// &#10;helperColumns = ["jmeno_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Wflcpdo, function(options) {
/// <summary>
/// Klientská část AL - číselník Příznak doručenky
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.wflcpdo, function(options) {
/// <summary> Klientská část AL - číselník Příznak doručenky
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_doruc"]
/// &#10;columns = ["priz_doruc","priz_doruc_txt","k_v","k_s","k_xml","priz_doruc_rsx"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_doruc_txt:trim:encode}"
/// &#10;helperColumns = ["priz_doruc_txt"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Wflcpso, function(options) {
/// <summary>
/// Klientská část AL - číselník Skartace pozastavena
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.wflcpso, function(options) {
/// <summary> Klientská část AL - číselník Skartace pozastavena
/// &#10;
/// &#10;# Data
/// &#10;keys = ["priz_poz_skar"]
/// &#10;columns = ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{priz_poz_skar_txt:trim:encode}"
/// &#10;helperColumns = ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.Wflscau, function(options) {
/// <summary>
/// Klientská část AL - číselník Certifikační autorita
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.wflscau, function(options) {
/// <summary> Klientská část AL - číselník Certifikační autorita
/// &#10;
/// &#10;# Data
/// &#10;keys = ["ixs_cau"]
/// &#10;columns = ["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "{jmeno:trim:encode}"
/// &#10;helperColumns = ["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]
/// </summary>
});
intellisense.annotate(Gordic.Data.Readers.AdmWflsksl, function(options) {
/// <summary>
/// Klientská část AL - číselník Oblíbená kombinace poštovních služeb
/// </summary>
/// <param name="options" type="object">Reader options (viz. Gordic.Data.Readers.Base):
/// &#10;readerClass, columns, sort, readAll, rowSize, permanent, limit, cached
/// </param>
});
intellisense.annotate(Gordic.Prefabs.Select.admWflsksl, function(options) {
/// <summary> Klientská část AL - číselník Oblíbená kombinace poštovních služeb
/// &#10;
/// &#10;# Data
/// &#10;keys = ["komb_sluzeb"]
/// &#10;columns = ["komb_sluzeb", "komb_sluzeb_txt", "aktivita", "dat_zmena", "zmenu_prov", "filtr_format"]
/// &#10;
/// &#10;# Options
/// &#10;itemTemplate = "<b>{komb_sluzeb_txt:trim:encode}</b> - {nazev:trim:encode}"
/// &#10;helperColumns = ["komb_sluzeb", "komb_sluzeb_txt"]
/// &#10;graphicInput = "oninput"
/// </summary>
});
