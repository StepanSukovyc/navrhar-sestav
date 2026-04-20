/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       akc.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Akc.Interface\Gordic.Akc.Interface.csproj
*    created     2026-02-16 14:33:54
*    files       Database\IGDatabaseLocksIsl.d.ts
*                Database\IGDatabaseSanitizingIsl.d.ts
*                Database\IGDbZamkyUzivatele.d.ts
*                DataSets\GErrorLogs.Dto.d.ts
*                DTOs\GActiveUserLoginInformixDto.d.ts
*                DTOs\GActiveUserLoginMsSqlDto.d.ts
*                DTOs\GActiveUserLoginOracleDto.d.ts
*                DTOs\GAkcDBLockDto.d.ts
*                DTOs\GDBSanitizedStringValueDto.d.ts
*                DTOs\GDBStringColumnDto.d.ts
*                DTOs\GDbZamekUzivatelBaseDto.d.ts
*                DTOs\GDbZamekUzivatelInfDto.d.ts
*                DTOs\GDbZamekUzivatelMsSqlDto.d.ts
*                DTOs\GDbZamekUzivatelOraDto.d.ts
*                DTOs\GErrorLogEmailDto.d.ts
*                DTOs\GErrorLogSendEmailFromFilesRequestDto.d.ts
*                DTOs\Gordic.Akc.Interface.DTOs.GActiveUserLoginsDto.d.ts
*                DTOs\Gordic.Akc.Interface.DTOs.GConcurrentUserLoginDto.d.ts
*                DTOs\Gordic.Akc.Interface.DTOs.GUnauthorizedAttemptDto.d.ts
*                DTOs\GSoubeznePracujiciUzivatele.d.ts
*                Email\Gordic.Akc.Interface.GErrorLogEmail.d.ts
*                Email\Gordic.Akc.Interface.GErrorLogIsl.d.ts
*                Email\Gordic.Akc.Interface.GErrorlogSettingParams.d.ts
*                Email\Gordic.Akc.Interface.IGErrorLogLogic.d.ts
*                Users\Gordic.Akc.Interface.IGActiveUsersIsl.d.ts
*                Users\Gordic.Akc.Interface.IGConcurrentUsersIsl.d.ts
*                Users\Gordic.Akc.Interface.IGSoucasnePracujiciUzivatele.d.ts
*                Users\Gordic.Akc.Interface.IGUnauthorizedAttempts.d.ts
*                Users\Gordic.Akc.Interface.IGUsersLoginHistory.d.ts
*                Users\Gordic.Akc.Interface.IGUsersLoginsLogic.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Database\IGDatabaseLocksIsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro ISL GDatabaseLocks*/
	interface GDatabaseLocks {
		/**Metoda pro výpis error logů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GAkcDBLockDto>>;
		/**Zastavení procesu*/
		stopProcess(rq?:CallParams<{akcLock:Gordic.Akc.Interface.DTOs.GAkcDBLockDto}>): _Task<{akcLock:Gordic.Akc.Interface.DTOs.GAkcDBLockDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GDatabaseLocks: ServiceBase & Catalog.GDatabaseLocks;
	}
	const GDatabaseLocks: Client["GDatabaseLocks"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Database\IGDatabaseSanitizingIsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Isl pro sanitizaci textů z databáze*/
	interface DbSanitizing {
		/**Výpis všech sloupců z databáze*/
		listAllColumns(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GDBStringColumnDto>>;
		/**Výpis všech záznamů z tabulke a sloupců*/
		listSanitizingTexts(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GDBSanitizedStringValueDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DbSanitizing: ServiceBase & Catalog.DbSanitizing;
	}
	const DbSanitizing: Client["DbSanitizing"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Database\IGDbZamkyUzivatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro databázové zámky uživatelů*/
	interface DbZamkyUzivatele {
		/**Metoda pro výpis zámků uživatelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.GDbZamekUzivatelBaseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DbZamkyUzivatele: ServiceBase & Catalog.DbZamkyUzivatele;
	}
	const DbZamkyUzivatele: Client["DbZamkyUzivatele"];
}
declare namespace Gordic.Akc.Interface {
	/**Filter pro zámky uživatelů*/
	const enum GDbZamkyUzivateleFilter {
		/**lockThisDb - zámky pouze pro tuto db (INFORMIX)*/
		locksThisDb,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DataSets\GErrorLogs.Dto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**DBTABLE:ErrorLog*/
	interface GErrorLogsDto {
		/**DBCOLUMN:ErrorLog.faze*/
		faze?: string|null;
		/**DBCOLUMN:ErrorLog.ser_cis_err*/
		ser_cis_err?: number|null;
		/**DBCOLUMN:ErrorLog.gor_err*/
		gor_err?: number|null;
		/**DBCOLUMN:ErrorLog.db_err*/
		db_err?: number|null;
		/**DBCOLUMN:ErrorLog.dat_err*/
		dat_err?: JsonDate|null;
		/**DBCOLUMN:ErrorLog.txt_err_orig*/
		txt_err_orig?: string|null;
		/**DBCOLUMN:ErrorLog.txt_err*/
		txt_err?: string|null;
		/**DBCOLUMN:ErrorLog.lok_err*/
		lok_err?: string|null;
		/**DBCOLUMN:ErrorLog.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:ErrorLog.lic*/
		lic?: string|null;
		/**DBCOLUMN:ErrorLog.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ErrorLog.proces_id*/
		proces_id?: string|null;
		/**DBCOLUMN:ErrorLog.proces_txt*/
		proces_txt?: string|null;
		/**DBCOLUMN:ErrorLog.isam_err*/
		isam_err?: number|null;
		/**DBCOLUMN:ErrorLog.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ErrorLog.severity_txt*/
		severity_txt?: string|null;
		/**DBCOLUMN:ErrorLog.severity_popis*/
		severity_popis?: string|null;
		/**DBCOLUMN:ErrorLog.stanice*/
		stanice?: string|null;
		/**DBCOLUMN:ErrorLog.os*/
		os?: string|null;
		/**DBCOLUMN:ErrorLog.revize*/
		revize?: string|null;
		/**DBCOLUMN:ErrorLog.db_verze*/
		db_verze?: string|null;
		/**DBCOLUMN:ErrorLog.db_type*/
		db_type?: string|null;
		/**DBCOLUMN:ErrorLog.db_client*/
		db_client?: string|null;
		/**DBCOLUMN:ErrorLog.db_provider*/
		db_provider?: string|null;
		/**DBCOLUMN:ErrorLog.db_profil*/
		db_profil?: string|null;
	}
	const enum GErrorLogsDtoNames { faze = "faze", ser_cis_err = "ser_cis_err", gor_err = "gor_err", db_err = "db_err", dat_err = "dat_err", txt_err_orig = "txt_err_orig", txt_err = "txt_err", lok_err = "lok_err", log_por_cislo = "log_por_cislo", lic = "lic", aktivita = "aktivita", proces_id = "proces_id", proces_txt = "proces_txt", isam_err = "isam_err", iud_por = "iud_por", severity_txt = "severity_txt", severity_popis = "severity_popis", stanice = "stanice", os = "os", revize = "revize", db_verze = "db_verze", db_type = "db_type", db_client = "db_client", db_provider = "db_provider", db_profil = "db_profil",}
	const enum GErrorLogsDtoFragments { faze = "*", ser_cis_err = "*", gor_err = "*", db_err = "*", dat_err = "*", txt_err_orig = "*", txt_err = "*", lok_err = "*", log_por_cislo = "*", lic = "*", aktivita = "*", proces_id = "*", proces_txt = "*", isam_err = "*", iud_por = "*", severity_txt = "*", severity_popis = "*", stanice = "*", os = "*", revize = "*", db_verze = "*", db_type = "*", db_client = "*", db_provider = "*", db_profil = "*",}
	const enum GErrorLogsDtoTypes { faze = "string", ser_cis_err = "number", gor_err = "number", db_err = "number", dat_err = "JsonDate", txt_err_orig = "string", txt_err = "string", lok_err = "string", log_por_cislo = "number", lic = "string", aktivita = "number", proces_id = "string", proces_txt = "string", isam_err = "number", iud_por = "number", severity_txt = "string", severity_popis = "string", stanice = "string", os = "string", revize = "string", db_verze = "string", db_type = "string", db_client = "string", db_provider = "string", db_profil = "string",}
	const enum GErrorLogsDtoTypeLengths { faze = 8, lok_err = 254, lic = 4, proces_id = 254, proces_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GActiveUserLoginInformixDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Pr8v2 p5ihl83en9 u6ivatel0 Informix*/
	interface GActiveUserLoginInformixDto extends Gordic.Akc.Interface.DTOs.GActiveUserLoginDto {
		/**Hostname*/
		hostname?: string|null;
		/**Konekt vytvořen*/
		conn_dt?: JsonDate|null;
		/**Feprogram*/
		feprogram?: string|null;
		/**Uživatelské jméno*/
		username?: string|null;
	}
	const enum GActiveUserLoginInformixDtoNames { hostname = "hostname", conn_dt = "conn_dt", feprogram = "feprogram", username = "username", log_por_cislo = "log_por_cislo", faze = "faze", faze_nazev = "faze_nazev", verze = "verze", sub_verze = "sub_verze", revize = "revize", dat_login = "dat_login", dat_ping = "dat_ping", dat_logout = "dat_logout", ixs_ref = "ixs_ref", ip_adr = "ip_adr", ixs_fun = "ixs_fun", rezim = "rezim", ixs_ins = "ixs_ins", login_uziv = "login_uziv", login_usr = "login_usr", sessid = "sessid", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", login_win = "login_win", comp_name = "comp_name", ixs_ins_txt = "ixs_ins_txt", session_id = "session_id",}
	const enum GActiveUserLoginInformixDtoFragments { hostname = "*", conn_dt = "*", feprogram = "*", username = "*", log_por_cislo = "*", faze = "*", faze_nazev = "*", verze = "*", sub_verze = "*", revize = "*", dat_login = "*", dat_ping = "*", dat_logout = "*", ixs_ref = "*", ip_adr = "*", ixs_fun = "*", rezim = "*", ixs_ins = "*", login_uziv = "*", login_usr = "*", sessid = "*", nazev_ref = "*", nazev_fun = "*", login_win = "*", comp_name = "*", ixs_ins_txt = "*", session_id = "*",}
	const enum GActiveUserLoginInformixDtoTypes { hostname = "string", conn_dt = "JsonDate", feprogram = "string", username = "string", log_por_cislo = "number", faze = "string", faze_nazev = "string", verze = "number", sub_verze = "number", revize = "string", dat_login = "JsonDate", dat_ping = "JsonDate", dat_logout = "JsonDate", ixs_ref = "string", ip_adr = "string", ixs_fun = "string", rezim = "number", ixs_ins = "string", login_uziv = "string", login_usr = "string", sessid = "number", nazev_ref = "string", nazev_fun = "string", login_win = "string", comp_name = "string", ixs_ins_txt = "string", session_id = "number",}
	const enum GActiveUserLoginInformixDtoTypeLengths { faze = 8, ixs_ref = 12, ip_adr = 50, ixs_fun = 12, ixs_ins = 12, login_uziv = 60, login_usr = 60, nazev_ref = 50, nazev_fun = 50, login_win = 60, comp_name = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GActiveUserLoginMsSqlDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Aktivn9 u6ivatel0 pro MSSql*/
	interface GActiveUserLoginMsSqlDto extends Gordic.Akc.Interface.DTOs.GActiveUserLoginDto {
		/**Počet otevřených transakcí*/
		open_tran?: number|null;
		/**Poslední příkaz*/
		cmd?: string|null;
		/**Blokováno*/
		blocked?: string|null;
		/**Blokováno*/
		net_library?: string|null;
		/**Poslední dávka*/
		last_batch?: JsonDate|null;
		/**Využití CPU*/
		cpu?: number|null;
		/**Využití IO*/
		physical_io?: number|null;
		/**Využití IO*/
		memusage?: number|null;
		/**Status*/
		status?: string|null;
		/**Typ připojení*/
		typ_pripojeni?: number|null;
		/**Název programu*/
		program_name?: string|null;
		/**Login name*/
		login_name?: string|null;
	}
	const enum GActiveUserLoginMsSqlDtoNames { open_tran = "open_tran", cmd = "cmd", blocked = "blocked", net_library = "net_library", last_batch = "last_batch", cpu = "cpu", physical_io = "physical_io", memusage = "memusage", status = "status", typ_pripojeni = "typ_pripojeni", program_name = "program_name", login_name = "login_name", log_por_cislo = "log_por_cislo", faze = "faze", faze_nazev = "faze_nazev", verze = "verze", sub_verze = "sub_verze", revize = "revize", dat_login = "dat_login", dat_ping = "dat_ping", dat_logout = "dat_logout", ixs_ref = "ixs_ref", ip_adr = "ip_adr", ixs_fun = "ixs_fun", rezim = "rezim", ixs_ins = "ixs_ins", login_uziv = "login_uziv", login_usr = "login_usr", sessid = "sessid", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", login_win = "login_win", comp_name = "comp_name", ixs_ins_txt = "ixs_ins_txt", session_id = "session_id",}
	const enum GActiveUserLoginMsSqlDtoFragments { open_tran = "*", cmd = "*", blocked = "*", net_library = "*", last_batch = "*", cpu = "*", physical_io = "*", memusage = "*", status = "*", typ_pripojeni = "*", program_name = "*", login_name = "*", log_por_cislo = "*", faze = "*", faze_nazev = "*", verze = "*", sub_verze = "*", revize = "*", dat_login = "*", dat_ping = "*", dat_logout = "*", ixs_ref = "*", ip_adr = "*", ixs_fun = "*", rezim = "*", ixs_ins = "*", login_uziv = "*", login_usr = "*", sessid = "*", nazev_ref = "*", nazev_fun = "*", login_win = "*", comp_name = "*", ixs_ins_txt = "*", session_id = "*",}
	const enum GActiveUserLoginMsSqlDtoTypes { open_tran = "number", cmd = "string", blocked = "string", net_library = "string", last_batch = "JsonDate", cpu = "number", physical_io = "number", memusage = "number", status = "string", typ_pripojeni = "number", program_name = "string", login_name = "string", log_por_cislo = "number", faze = "string", faze_nazev = "string", verze = "number", sub_verze = "number", revize = "string", dat_login = "JsonDate", dat_ping = "JsonDate", dat_logout = "JsonDate", ixs_ref = "string", ip_adr = "string", ixs_fun = "string", rezim = "number", ixs_ins = "string", login_uziv = "string", login_usr = "string", sessid = "JsonDecimal", nazev_ref = "string", nazev_fun = "string", login_win = "string", comp_name = "string", ixs_ins_txt = "string", session_id = "JsonDecimal",}
	const enum GActiveUserLoginMsSqlDtoTypeLengths { faze = 8, ixs_ref = 12, ip_adr = 50, ixs_fun = 12, ixs_ins = 12, login_uziv = 60, login_usr = 60, nazev_ref = 50, nazev_fun = 50, login_win = 60, comp_name = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GActiveUserLoginOracleDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Aktivni uzivatele - Oracle*/
	interface GActiveUserLoginOracleDto extends Gordic.Akc.Interface.DTOs.GActiveUserLoginDto {
		/**status*/
		status?: string|null;
		/**client identifier*/
		client_identifier?: string|null;
		/**uzivatel os*/
		os_user?: string|null;
		/**machine*/
		machine?: string|null;
		/**terminal*/
		terminal?: string|null;
		/**Modul*/
		module?: string|null;
		/**Akce*/
		action?: string|null;
		/**Client info*/
		client_info?: string|null;
		/**Session status*/
		event_name?: string|null;
		/**Session status*/
		session_status?: string|null;
		/**Session status*/
		state?: string|null;
		/**Datum připojení connectu*/
		conn_dt?: JsonDate|null;
		/**Typ připojení*/
		typ_pripojeni?: number|null;
	}
	const enum GActiveUserLoginOracleDtoNames { status = "status", client_identifier = "client_identifier", os_user = "os_user", machine = "machine", terminal = "terminal", module = "module", action = "action", client_info = "client_info", event_name = "event_name", session_status = "session_status", state = "state", conn_dt = "conn_dt", typ_pripojeni = "typ_pripojeni", log_por_cislo = "log_por_cislo", faze = "faze", faze_nazev = "faze_nazev", verze = "verze", sub_verze = "sub_verze", revize = "revize", dat_login = "dat_login", dat_ping = "dat_ping", dat_logout = "dat_logout", ixs_ref = "ixs_ref", ip_adr = "ip_adr", ixs_fun = "ixs_fun", rezim = "rezim", ixs_ins = "ixs_ins", login_uziv = "login_uziv", login_usr = "login_usr", sessid = "sessid", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", login_win = "login_win", comp_name = "comp_name", ixs_ins_txt = "ixs_ins_txt", session_id = "session_id",}
	const enum GActiveUserLoginOracleDtoFragments { status = "*", client_identifier = "*", os_user = "*", machine = "*", terminal = "*", module = "*", action = "*", client_info = "*", event_name = "*", session_status = "*", state = "*", conn_dt = "*", typ_pripojeni = "*", log_por_cislo = "*", faze = "*", faze_nazev = "*", verze = "*", sub_verze = "*", revize = "*", dat_login = "*", dat_ping = "*", dat_logout = "*", ixs_ref = "*", ip_adr = "*", ixs_fun = "*", rezim = "*", ixs_ins = "*", login_uziv = "*", login_usr = "*", sessid = "*", nazev_ref = "*", nazev_fun = "*", login_win = "*", comp_name = "*", ixs_ins_txt = "*", session_id = "*",}
	const enum GActiveUserLoginOracleDtoTypes { status = "string", client_identifier = "string", os_user = "string", machine = "string", terminal = "string", module = "string", action = "string", client_info = "string", event_name = "string", session_status = "string", state = "string", conn_dt = "JsonDate", typ_pripojeni = "number", log_por_cislo = "number", faze = "string", faze_nazev = "string", verze = "number", sub_verze = "number", revize = "string", dat_login = "JsonDate", dat_ping = "JsonDate", dat_logout = "JsonDate", ixs_ref = "string", ip_adr = "string", ixs_fun = "string", rezim = "number", ixs_ins = "string", login_uziv = "string", login_usr = "string", sessid = "JsonDecimal", nazev_ref = "string", nazev_fun = "string", login_win = "string", comp_name = "string", ixs_ins_txt = "string", session_id = "JsonDecimal",}
	const enum GActiveUserLoginOracleDtoTypeLengths { faze = 100, ixs_ref = 12, ip_adr = 50, ixs_fun = 12, ixs_ins = 12, login_uziv = 60, login_usr = 60, nazev_ref = 50, nazev_fun = 50, login_win = 60, comp_name = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GAkcDBLockDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Dto for database lock*/
	interface GAkcDBLockDto {
		/**The table name*/
		table_name?: string|null;
		/**The type*/
		type?: string|null;
		/**The user*/
		user?: Gordic.Akc.Interface.DTOs.GActiveUserLoginDto|null;
	}
	const enum GAkcDBLockDtoNames { table_name = "table_name", type = "type", user = "user",}
	const enum GAkcDBLockDtoFragments { table_name = "*", type = "*", user = "*",}
	const enum GAkcDBLockDtoTypes { table_name = "string", type = "string", user = "Gordic.Akc.Interface.DTOs.GActiveUserLoginDto",}
	const enum GAkcDBLockDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDBSanitizedStringValueDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Dto with original value, sanitized value, and column info.*/
	interface GDBSanitizedStringValueDto {
		/**The column*/
		column?: Gordic.Akc.Interface.DTOs.GDBStringColumnDto|null;
		/**The original value*/
		original_value?: string|null;
		/**The sanitized value*/
		sanitized_value?: string|null;
		/**The reasons*/
		reasons?: string|null;
	}
	const enum GDBSanitizedStringValueDtoNames { column = "column", original_value = "original_value", sanitized_value = "sanitized_value", reasons = "reasons",}
	const enum GDBSanitizedStringValueDtoFragments { column = "*", original_value = "*", sanitized_value = "*", reasons = "*",}
	const enum GDBSanitizedStringValueDtoTypes { column = "Gordic.Akc.Interface.DTOs.GDBStringColumnDto", original_value = "string", sanitized_value = "string", reasons = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDBStringColumnDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**Dto for column and name of his table.*/
	interface GDBStringColumnDto {
		/**The table name*/
		table_name?: string|null;
		/**The column name*/
		column_name?: string|null;
	}
	const enum GDBStringColumnDtoNames { table_name = "table_name", column_name = "column_name",}
	const enum GDBStringColumnDtoFragments { table_name = "*", column_name = "*",}
	const enum GDBStringColumnDtoTypes { table_name = "string", column_name = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDbZamekUzivatelBaseDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**GDbZamekUzivatelBaseDto*/
	interface GDbZamekUzivatelBaseDto {
		/**Ixs_ref*/
		ixs_ref?: string|null;
		/**Ixs_ref*/
		ixs_fun?: string|null;
		/**Ixs_ref*/
		ixs_ins?: string|null;
		/**Log por_cislo*/
		log_por_cislo?: number|null;
		/**Verze*/
		verze?: number|null;
		/**Sub_verze*/
		sub_verze?: number|null;
		/**Login win*/
		login_win?: string|null;
		/**Login win*/
		login_uziv?: string|null;
		/**Stanice*/
		stanice?: string|null;
		/**Aplikace*/
		aplikace?: string|null;
		/**Osoba*/
		nazev_ref?: string|null;
		/**Funkční místo*/
		nazev_fun?: string|null;
		/**PC*/
		pc?: string|null;
		/**Datum a čas přihlášení*/
		dat_login?: JsonDate|null;
		/**Zjištěný začátek zámku*/
		lock_start?: JsonDate|null;
		/**revize*/
		revize?: string|null;
		/**ID session*/
		session_id?: number|null;
	}
	const enum GDbZamekUzivatelBaseDtoNames { ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ixs_ins = "ixs_ins", log_por_cislo = "log_por_cislo", verze = "verze", sub_verze = "sub_verze", login_win = "login_win", login_uziv = "login_uziv", stanice = "stanice", aplikace = "aplikace", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", pc = "pc", dat_login = "dat_login", lock_start = "lock_start", revize = "revize", session_id = "session_id",}
	const enum GDbZamekUzivatelBaseDtoFragments { ixs_ref = "*", ixs_fun = "*", ixs_ins = "*", log_por_cislo = "*", verze = "*", sub_verze = "*", login_win = "*", login_uziv = "*", stanice = "*", aplikace = "*", nazev_ref = "*", nazev_fun = "*", pc = "*", dat_login = "*", lock_start = "*", revize = "*", session_id = "*",}
	const enum GDbZamekUzivatelBaseDtoTypes { ixs_ref = "string", ixs_fun = "string", ixs_ins = "string", log_por_cislo = "number", verze = "number", sub_verze = "number", login_win = "string", login_uziv = "string", stanice = "string", aplikace = "string", nazev_ref = "string", nazev_fun = "string", pc = "string", dat_login = "JsonDate", lock_start = "JsonDate", revize = "string", session_id = "number",}
	const enum GDbZamekUzivatelBaseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDbZamekUzivatelInfDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Zámek uživatele pro informix*/
	interface GDbZamekUzivatelInfDto extends Gordic.Akc.Interface.GDbZamekUzivatelBaseDto {
		/**Uživatelské jméno*/
		username?: string|null;
		/**hostname*/
		hostname?: string|null;
		/**tty*/
		tty?: string|null;
		/**databáze*/
		dbsname?: string|null;
		/**Tabulka*/
		tabname?: string|null;
		/**Typ*/
		type?: string|null;
		/**owner*/
		owner?: number|null;
	}
	const enum GDbZamekUzivatelInfDtoNames { username = "username", hostname = "hostname", tty = "tty", dbsname = "dbsname", tabname = "tabname", type = "type", owner = "owner", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ixs_ins = "ixs_ins", log_por_cislo = "log_por_cislo", verze = "verze", sub_verze = "sub_verze", login_win = "login_win", login_uziv = "login_uziv", stanice = "stanice", aplikace = "aplikace", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", pc = "pc", dat_login = "dat_login", lock_start = "lock_start", revize = "revize", session_id = "session_id",}
	const enum GDbZamekUzivatelInfDtoFragments { username = "*", hostname = "*", tty = "*", dbsname = "*", tabname = "*", type = "*", owner = "*", ixs_ref = "*", ixs_fun = "*", ixs_ins = "*", log_por_cislo = "*", verze = "*", sub_verze = "*", login_win = "*", login_uziv = "*", stanice = "*", aplikace = "*", nazev_ref = "*", nazev_fun = "*", pc = "*", dat_login = "*", lock_start = "*", revize = "*", session_id = "*",}
	const enum GDbZamekUzivatelInfDtoTypes { username = "string", hostname = "string", tty = "string", dbsname = "string", tabname = "string", type = "string", owner = "number", ixs_ref = "string", ixs_fun = "string", ixs_ins = "string", log_por_cislo = "number", verze = "number", sub_verze = "number", login_win = "string", login_uziv = "string", stanice = "string", aplikace = "string", nazev_ref = "string", nazev_fun = "string", pc = "string", dat_login = "JsonDate", lock_start = "JsonDate", revize = "string", session_id = "number",}
	const enum GDbZamekUzivatelInfDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDbZamekUzivatelMsSqlDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Dto zámků pro uživatele*/
	interface GDbZamekUzivatelMsSqlDto extends Gordic.Akc.Interface.GDbZamekUzivatelBaseDto {
		/**[resource_associated_entity_id]*/
		resource_associated_entity_id?: JsonDecimal|null;
		/**[indid]*/
		indid?: number|null;
		/**[resource type]*/
		resource_type?: string|null;
		/**[request_mode]*/
		request_mode?: string|null;
		/**ID objektu*/
		object_name?: string|null;
		/**[schema_name]*/
		schema_name?: string|null;
		/**ID indexu*/
		index_name?: string|null;
		/**[request_status]*/
		request_status?: string|null;
	}
	const enum GDbZamekUzivatelMsSqlDtoNames { resource_associated_entity_id = "resource_associated_entity_id", indid = "indid", resource_type = "resource_type", request_mode = "request_mode", object_name = "object_name", schema_name = "schema_name", index_name = "index_name", request_status = "request_status", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ixs_ins = "ixs_ins", log_por_cislo = "log_por_cislo", verze = "verze", sub_verze = "sub_verze", login_win = "login_win", login_uziv = "login_uziv", stanice = "stanice", aplikace = "aplikace", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", pc = "pc", dat_login = "dat_login", lock_start = "lock_start", revize = "revize", session_id = "session_id",}
	const enum GDbZamekUzivatelMsSqlDtoFragments { resource_associated_entity_id = "*", indid = "*", resource_type = "*", request_mode = "*", object_name = "*", schema_name = "*", index_name = "*", request_status = "*", ixs_ref = "*", ixs_fun = "*", ixs_ins = "*", log_por_cislo = "*", verze = "*", sub_verze = "*", login_win = "*", login_uziv = "*", stanice = "*", aplikace = "*", nazev_ref = "*", nazev_fun = "*", pc = "*", dat_login = "*", lock_start = "*", revize = "*", session_id = "*",}
	const enum GDbZamekUzivatelMsSqlDtoTypes { resource_associated_entity_id = "JsonDecimal", indid = "number", resource_type = "string", request_mode = "string", object_name = "string", schema_name = "string", index_name = "string", request_status = "string", ixs_ref = "string", ixs_fun = "string", ixs_ins = "string", log_por_cislo = "number", verze = "number", sub_verze = "number", login_win = "string", login_uziv = "string", stanice = "string", aplikace = "string", nazev_ref = "string", nazev_fun = "string", pc = "string", dat_login = "JsonDate", lock_start = "JsonDate", revize = "string", session_id = "number",}
	const enum GDbZamekUzivatelMsSqlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GDbZamekUzivatelOraDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Zámek pro oracle*/
	interface GDbZamekUzivatelOraDto extends Gordic.Akc.Interface.GDbZamekUzivatelBaseDto {
		/**Uživatelské jméno*/
		oracle_username?: string|null;
		/**Uživatelské jméno os*/
		os_user_name?: string|null;
		/**Locked mode*/
		locked_mode?: number|null;
		/**Id objektu*/
		object_id?: number|null;
		/**Id procesu*/
		audsid?: number|null;
		/**Název objektu*/
		object_name?: string|null;
		/**Název objektu*/
		object_type?: string|null;
		/**Vlastník*/
		owner?: string|null;
	}
	const enum GDbZamekUzivatelOraDtoNames { oracle_username = "oracle_username", os_user_name = "os_user_name", locked_mode = "locked_mode", object_id = "object_id", audsid = "audsid", object_name = "object_name", object_type = "object_type", owner = "owner", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ixs_ins = "ixs_ins", log_por_cislo = "log_por_cislo", verze = "verze", sub_verze = "sub_verze", login_win = "login_win", login_uziv = "login_uziv", stanice = "stanice", aplikace = "aplikace", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", pc = "pc", dat_login = "dat_login", lock_start = "lock_start", revize = "revize", session_id = "session_id",}
	const enum GDbZamekUzivatelOraDtoFragments { oracle_username = "*", os_user_name = "*", locked_mode = "*", object_id = "*", audsid = "*", object_name = "*", object_type = "*", owner = "*", ixs_ref = "*", ixs_fun = "*", ixs_ins = "*", log_por_cislo = "*", verze = "*", sub_verze = "*", login_win = "*", login_uziv = "*", stanice = "*", aplikace = "*", nazev_ref = "*", nazev_fun = "*", pc = "*", dat_login = "*", lock_start = "*", revize = "*", session_id = "*",}
	const enum GDbZamekUzivatelOraDtoTypes { oracle_username = "string", os_user_name = "string", locked_mode = "number", object_id = "number", audsid = "number", object_name = "string", object_type = "string", owner = "string", ixs_ref = "string", ixs_fun = "string", ixs_ins = "string", log_por_cislo = "number", verze = "number", sub_verze = "number", login_win = "string", login_uziv = "string", stanice = "string", aplikace = "string", nazev_ref = "string", nazev_fun = "string", pc = "string", dat_login = "JsonDate", lock_start = "JsonDate", revize = "string", session_id = "number",}
	const enum GDbZamekUzivatelOraDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GErrorLogEmailDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Třída pro práci s 05 aplikacemi (zjednodušení GErrorLogEmail)*/
	interface GErrorLogEmailDto {
		/**Seznam autorů*/
		recipients?: string|null;
		/**Název přílohy bez zip*/
		attachment?: string|null;
		/**Chyby, které si autor přeje odeslat*/
		errorLogs?: Gordic.Akc.Interface.GErrorLogsDto[]|null;
		/**Předmět*/
		subject?: string|null;
		/**Text*/
		text?: string|null;
	}
	const enum GErrorLogEmailDtoNames { recipients = "recipients", attachment = "attachment", errorLogs = "errorLogs", subject = "subject", text = "text",}
	const enum GErrorLogEmailDtoFragments { recipients = "*", attachment = "*", errorLogs = "*", subject = "*", text = "*",}
	const enum GErrorLogEmailDtoTypes { recipients = "string", attachment = "string", errorLogs = "Gordic.Akc.Interface.GErrorLogsDto[]", subject = "string", text = "string",}
	const enum GErrorLogEmailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GErrorLogSendEmailFromFilesRequestDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Hroamdné odeslání emailů podle několika souborů*/
	interface GErrorLogSendEmailFromFilesRequestDto {
		/**Pole guidů uploadovaných souborů.*/
		files?: string[]|null;
		/**Výběr způsobu odeslání, 0 = podle fází, 1= podle autorů, null= jeden email*/
		authorMatching?: number|null;
		/**konfigurace emailu pro případ authorMatching = null*/
		emailConfiguration?: Gordic.Akc.Interface.GErrorLogEmail|null;
	}
	const enum GErrorLogSendEmailFromFilesRequestDtoNames { files = "files", authorMatching = "authorMatching", emailConfiguration = "emailConfiguration",}
	const enum GErrorLogSendEmailFromFilesRequestDtoFragments { files = "*", authorMatching = "*", emailConfiguration = "*",}
	const enum GErrorLogSendEmailFromFilesRequestDtoTypes { files = "string[]", authorMatching = "number", emailConfiguration = "Gordic.Akc.Interface.GErrorLogEmail",}
	const enum GErrorLogSendEmailFromFilesRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\Gordic.Akc.Interface.DTOs.GActiveUserLoginsDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**DBTABLE:ginllog*/
	interface GActiveUserLoginDto {
		/**DBCOLUMN:ginllog.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:ginllog.faze*/
		faze?: string|null;
		/**DBCOLUMN:gincfaz.faze_txt*/
		faze_nazev?: string|null;
		/**DBCOLUMN:ginllog.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginllog.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:ginllog.revize*/
		revize?: string|null;
		/**DBCOLUMN:ginllog.dat_login*/
		dat_login?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_ping*/
		dat_ping?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_logout*/
		dat_logout?: JsonDate|null;
		/**DBCOLUMN:ginllog.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginllog.ip_adr*/
		ip_adr?: string|null;
		/**DBCOLUMN:ginllog.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:gintgpr.rezim*/
		rezim?: number|null;
		/**DBCOLUMN:ginllog.ixs_ins*/
		ixs_ins?: string|null;
		/**DBCOLUMN:ginllog.login_uziv*/
		login_uziv?: string|null;
		/**DBCOLUMN:ginllog.login_usr*/
		login_usr?: string|null;
		/**DBCOLUMN:ginllog.sessid*/
		sessid?: JsonDecimal|null;
		/**DBCOLUMN:ginsref.nazev*/
		nazev_ref?: string|null;
		/**DBCOLUMN:ginsfun.nazev*/
		nazev_fun?: string|null;
		/**DBCOLUMN:ginllog.login_win*/
		login_win?: string|null;
		/**DBCOLUMN:ginllog.comp_name*/
		comp_name?: string|null;
		/**instance*/
		ixs_ins_txt?: string|null;
		/**session id*/
		session_id?: JsonDecimal|null;
	}
	const enum GActiveUserLoginDtoNames { log_por_cislo = "log_por_cislo", faze = "faze", faze_nazev = "faze_nazev", verze = "verze", sub_verze = "sub_verze", revize = "revize", dat_login = "dat_login", dat_ping = "dat_ping", dat_logout = "dat_logout", ixs_ref = "ixs_ref", ip_adr = "ip_adr", ixs_fun = "ixs_fun", rezim = "rezim", ixs_ins = "ixs_ins", login_uziv = "login_uziv", login_usr = "login_usr", sessid = "sessid", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", login_win = "login_win", comp_name = "comp_name", ixs_ins_txt = "ixs_ins_txt", session_id = "session_id",}
	const enum GActiveUserLoginDtoFragments { log_por_cislo = "*", faze = "*", faze_nazev = "*", verze = "*", sub_verze = "*", revize = "*", dat_login = "*", dat_ping = "*", dat_logout = "*", ixs_ref = "*", ip_adr = "*", ixs_fun = "*", rezim = "*", ixs_ins = "*", login_uziv = "*", login_usr = "*", sessid = "*", nazev_ref = "*", nazev_fun = "*", login_win = "*", comp_name = "*", ixs_ins_txt = "*", session_id = "*",}
	const enum GActiveUserLoginDtoTypes { log_por_cislo = "number", faze = "string", faze_nazev = "string", verze = "number", sub_verze = "number", revize = "string", dat_login = "JsonDate", dat_ping = "JsonDate", dat_logout = "JsonDate", ixs_ref = "string", ip_adr = "string", ixs_fun = "string", rezim = "number", ixs_ins = "string", login_uziv = "string", login_usr = "string", sessid = "JsonDecimal", nazev_ref = "string", nazev_fun = "string", login_win = "string", comp_name = "string", ixs_ins_txt = "string", session_id = "JsonDecimal",}
	const enum GActiveUserLoginDtoTypeLengths { faze = 100, ixs_ref = 12, ip_adr = 50, ixs_fun = 12, ixs_ins = 12, login_uziv = 60, login_usr = 60, nazev_ref = 50, nazev_fun = 50, login_win = 60, comp_name = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\Gordic.Akc.Interface.DTOs.GConcurrentUserLoginDto.d.ts 

declare namespace Gordic.Akc.Interface.DTOs {
	/**DBTABLE:ginllog*/
	interface GConcurrentUserLoginDto {
		/**DBCOLUMN:ginllog.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginllog.login_uziv*/
		login_uziv?: string|null;
		/**DBCOLUMN:ginllog.dat_login*/
		dat_login?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_logout*/
		dat_logout?: JsonDate|null;
		/**DBCOLUMN:ginllog.ip_adr*/
		ip_adr?: string|null;
		/**DBCOLUMN:ginllog.sessid*/
		sessid?: number|null;
		/**DBCOLUMN:ginszmp.nazev_rf*/
		nazev_rf_a?: string|null;
		/**DBCOLUMN:ginszmp.nazev_rf*/
		nazev_rf_b?: string|null;
		/**DBCOLUMN:ginllog.dat_login*/
		dat_login_b?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_logout*/
		dat_logout_b?: JsonDate|null;
		/**DBCOLUMN:ginllog.ip_adr*/
		ip_adr_b?: string|null;
	}
	const enum GConcurrentUserLoginDtoNames { faze = "faze", login_uziv = "login_uziv", dat_login = "dat_login", dat_logout = "dat_logout", ip_adr = "ip_adr", sessid = "sessid", nazev_rf_a = "nazev_rf_a", nazev_rf_b = "nazev_rf_b", dat_login_b = "dat_login_b", dat_logout_b = "dat_logout_b", ip_adr_b = "ip_adr_b",}
	const enum GConcurrentUserLoginDtoFragments { faze = "*", login_uziv = "*", dat_login = "*", dat_logout = "*", ip_adr = "*", sessid = "*", nazev_rf_a = "*", nazev_rf_b = "*", dat_login_b = "*", dat_logout_b = "*", ip_adr_b = "*",}
	const enum GConcurrentUserLoginDtoTypes { faze = "string", login_uziv = "string", dat_login = "JsonDate", dat_logout = "JsonDate", ip_adr = "string", sessid = "number", nazev_rf_a = "string", nazev_rf_b = "string", dat_login_b = "JsonDate", dat_logout_b = "JsonDate", ip_adr_b = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\Gordic.Akc.Interface.DTOs.GUnauthorizedAttemptDto.d.ts 

declare namespace Gordic.Akc.Interface {
	/**DBTABLE:ginlhac*/
	interface GUnauthorizedAttemptDto {
		/**DBCOLUMN:ginlhac.dat_login*/
		dat_login?: JsonDate|null;
		/**DBCOLUMN:ginlhac.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginlhac.faze*/
		faze_nazev?: string|null;
		/**DBCOLUMN:ginlhac.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginlhac.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:ginlhac.revize*/
		revize?: string|null;
		/**DBCOLUMN:ginlhac.ip_adr*/
		ip_adr?: string|null;
		/**DBCOLUMN:ginlhac.login_name*/
		login_name?: string|null;
		/**DBCOLUMN:ginlhac.gor_err*/
		gor_err?: number|null;
	}
	const enum GUnauthorizedAttemptDtoNames { dat_login = "dat_login", faze = "faze", faze_nazev = "faze_nazev", verze = "verze", sub_verze = "sub_verze", revize = "revize", ip_adr = "ip_adr", login_name = "login_name", gor_err = "gor_err",}
	const enum GUnauthorizedAttemptDtoFragments { dat_login = "*", faze = "*", faze_nazev = "*", verze = "*", sub_verze = "*", revize = "*", ip_adr = "*", login_name = "*", gor_err = "*",}
	const enum GUnauthorizedAttemptDtoTypes { dat_login = "JsonDate", faze = "string", faze_nazev = "string", verze = "number", sub_verze = "number", revize = "string", ip_adr = "string", login_name = "string", gor_err = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\DTOs\GSoubeznePracujiciUzivatele.d.ts 

declare namespace Gordic.Akc.Interface {
	/**DBTABLE:gincfaz
	*      Programová fáze
	*/
	interface GSoubeznePracujiciUzivatele {
		/**Programová fáze
		*      Interní označení programové fáze aplikace systému GINIS.
		*/
		faze?: string|null;
		/**Programová fáze
		*      Lidský název programové fáze
		*/
		faze_txt?: string|null;
		/**Datum a čas loginu*/
		cas?: JsonDate|null;
		/**Po4et sou4asn2 p5ihl83en7ch u6ivatel;*/
		pocet?: number|null;
		/**Jestli je to webová aplikace*/
		isWebApp?: boolean|null;
	}
	const enum GSoubeznePracujiciUzivateleNames { faze = "faze", faze_txt = "faze_txt", cas = "cas", pocet = "pocet", isWebApp = "isWebApp",}
	const enum GSoubeznePracujiciUzivateleFragments { faze = "*", faze_txt = "onlyFaze", cas = "*", pocet = "*", isWebApp = "*",}
	const enum GSoubeznePracujiciUzivateleTypes { faze = "string", faze_txt = "string", cas = "JsonDate", pocet = "number", isWebApp = "boolean",}
	const enum GSoubeznePracujiciUzivateleTypeLengths { faze = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Email\Gordic.Akc.Interface.GErrorLogEmail.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Třída reprezentující email.*/
	interface GErrorLogEmail {
		/**Předmět emailu*/
		Subject?: string|null;
		/**Text emailu*/
		Text?: string|null;
		/**Název přílohy*/
		AttachmentName?: string|null;
		/**Datum a čas vytvoření emailu*/
		TimeStamp?: JsonDate|null;
		/**Všichni příjemci.*/
		readonly AllReceivers?: any|null;
		/**Kódy autorů, kterým se má email poslat - může být dvoj/troj-číselné nebo celý kód chyby*/
		readonly AuthorCodesToParse?: number[]|null;
		/**Fáze autorů, kterým se má email poslat*/
		readonly FazesToParse?: string[]|null;
		/**Počet záznamů v emailu*/
		readonly ErrorsCount?: number|null;
	}
	const enum GErrorLogEmailNames { Subject = "Subject", Text = "Text", AttachmentName = "AttachmentName", TimeStamp = "TimeStamp", AllReceivers = "AllReceivers", AuthorCodesToParse = "AuthorCodesToParse", FazesToParse = "FazesToParse", ErrorsCount = "ErrorsCount",}
	const enum GErrorLogEmailFragments { Subject = "*", Text = "*", AttachmentName = "*", TimeStamp = "*", AllReceivers = "*", AuthorCodesToParse = "*", FazesToParse = "*", ErrorsCount = "*",}
	const enum GErrorLogEmailTypes { Subject = "string", Text = "string", AttachmentName = "string", TimeStamp = "JsonDate", AllReceivers = "any", AuthorCodesToParse = "number[]", FazesToParse = "string[]", ErrorsCount = "number",}
	const enum GErrorLogEmailTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Email\Gordic.Akc.Interface.GErrorLogIsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro ISL ErrorLogu*/
	interface GErrorLog {
		/**Interface pro zjednodušený výpis Error Logů*/
		list(rq?:CallParams<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>}>): _Task<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>},GServiceListResponse<Gordic.Akc.Interface.GErrorLogsDto>>;
		/**Interface pro kompletní výpis ErrorLogů (použití pro detail) - pouze pro databázi v souboru je to dáno automaticky*/
		listCompleted(rq?:CallParams<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>}>): _Task<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>},GServiceListResponse<Gordic.Akc.Interface.GErrorLogsDto>>;
		/**Získání výpisu podrobností k emailu*/
		getEmailDetail(rq?:CallParams<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>}>): _Task<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>},Gordic.Akc.Interface.GErrorLogEmailDto>;
		/**Funkce pro export zip file to path*/
		exportToZipFile(rq?:CallParams<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>}>): _Task<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>},number>;
		/**Odeslání emailu podle fáze*/
		sendEmailAutomatic(rq?:CallParams<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>}>): _Task<{rq:Gordic.Akc.Interface.Email.GErrorLogServiceRequest<Gordic.Akc.Interface.Email.FilterErrorLog>},number>;
		/**Odeslání mailu*/
		sendEmail(rq?:CallParams<{emailDto:Gordic.Akc.Interface.GErrorLogEmailDto}>): _Task<{emailDto:Gordic.Akc.Interface.GErrorLogEmailDto},boolean>;
		/**Získání data posledního zpracování*/
		getLastAutomaticDateTime(rq?:CallParams<{}>): _Task<{},JsonDate>;
		/**Nastavení nového automatického data a času*/
		setNewAutomaticDateTime(rq?:CallParams<{newDateTime:JsonDate}>): _Task<{newDateTime:JsonDate},void>;
		/**Vezme několik souborů, sestaví zprávy a rozešle email/emaily.
		*     Pokud není nastaven authorMatching a je vyplněn emailConfiguration, dojde k odeslání v jednom emailu. 
		*     Jinak dojde k odeslání více emailů podle authorMatching.
		*     ///
		*/
		sendEmailFromFile(rq?:Gordic.Akc.Interface.GErrorLogSendEmailFromFilesRequestDto|CallParams<GServiceActionRequest<Gordic.Akc.Interface.GErrorLogSendEmailFromFilesRequestDto>>): _Task<GServiceActionRequest<Gordic.Akc.Interface.GErrorLogSendEmailFromFilesRequestDto>,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GErrorLog: ServiceBase & Catalog.GErrorLog;
	}
	const GErrorLog: Client["GErrorLog"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Email\Gordic.Akc.Interface.GErrorlogSettingParams.d.ts 

declare namespace Gordic.Akc.Interface.Email {
	/**Paramtry pro nastavení funkcí použití v ISL*/
	interface GErrorLogSettingParams {
		/**true - bere se od posledního data zpracování, false - bere se interval v datumu*/
		automatic?: boolean|null;
		/**soubor kam se ukládá*/
		filename?: string|null;
		/**zdrojový soubor (prázdný řetězec = DB)*/
		sourcefile?: string|null;
		/**metoda poslání mailu*/
		sendingMethod?: number|null;
	}
	const enum GErrorLogSettingParamsNames { automatic = "automatic", filename = "filename", sourcefile = "sourcefile", sendingMethod = "sendingMethod",}
	const enum GErrorLogSettingParamsFragments { automatic = "*", filename = "*", sourcefile = "*", sendingMethod = "*",}
	const enum GErrorLogSettingParamsTypes { automatic = "boolean", filename = "string", sourcefile = "string", sendingMethod = "number",}
	/**GErrorLogServiceRequest*/
	interface GErrorLogServiceRequest<FilterErrorLogs> extends Gordic.Isl.GServiceListRequest {
		/**Pridana data*/
		inputData?: Gordic.Akc.Interface.Email.GErrorLogSettingParams|null;
	}
	const enum GErrorLogServiceRequestNames { inputData = "inputData", data = "data", filters = "filters", FilterDto = "FilterDto", rowStart = "rowStart", rowLimit = "rowLimit", fragments = "fragments", fastFilter = "fastFilter", context = "context",}
	const enum GErrorLogServiceRequestFragments { inputData = "*", data = "*", filters = "*", FilterDto = "*", rowStart = "*", rowLimit = "*", fragments = "*", fastFilter = "*", context = "*",}
	const enum GErrorLogServiceRequestTypes { inputData = "Gordic.Akc.Interface.Email.GErrorLogSettingParams", data = "Gordic.General.IGDto", filters = "Gordic.General.GFilter<Gordic.Akc.Interface.Email.FilterErrorLog>[]", FilterDto = "Gordic.General.IGFilterDto<Gordic.Akc.Interface.Email.FilterErrorLog>", rowStart = "number", rowLimit = "number", fragments = "string[]", fastFilter = "Gordic.General.ApplicationInterface.GFastFilterDto", context = "Gordic.General.ApplicationInterface.GRequestContext",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Email\Gordic.Akc.Interface.IGErrorLogLogic.d.ts 

declare namespace Gordic.Akc.Interface.Email {
	/**Filtry pro seznam chyb*/
	const enum FilterErrorLog {
		/**Začátek intervalu vzniku chyby*/
		dat_err_od,
		/**Konec intervalu vzniku chyby*/
		dat_err_do,
		/**Číslo chyby*/
		ser_cis_err,
		/**Identifikace chyby a autora*/
		gor_err,
		/**Přeskočit nedůležité chyby - začínající # a oznámení o spuštění servisního režimu.*/
		skip_unimportant,
		/**Like / NotLike - funguje jako Contains - texty uzavřené do "" , oddělené čárkou (OR)*/
		txt_err,
		/**Omezení na max počet řádek.*/
		limit,
	}
	/**Způsob jakým přiřazovat chyby autorům*/
	const enum AuthorMatching {
		/**Přiřazovat chyby podle číselníku vyjímek*/
		Code,
		/**Přiřazovat chyby podle fáze*/
		Faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGActiveUsersIsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Isl pro výpis aktuálně přihlášených uživatelů*/
	interface GActiveUsers {
		/**List*/
		listActiveDatabaseConnects(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GActiveUserLoginDto>>;
		/**ListActiveUsers*/
		listActiveUsers(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GActiveUserLoginDto>>;
		/**Žádost o ukončení práce jednoho uživatele*/
		zadostUkonceniPrace(rq?:CallParams<{idPrihlaseni:string[]}>): _Task<{idPrihlaseni:string[]},void>;
		/**Žádost o ukončení práce všech uživatelů*/
		zadostUkonceniPraceAll(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GActiveUsers: ServiceBase & Catalog.GActiveUsers;
	}
	const GActiveUsers: Client["GActiveUsers"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGConcurrentUsersIsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Souběžně přihlášení uživatelé*/
	interface GConcurrentUsers {
		/**Výpis uživatelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GConcurrentUserLoginDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GConcurrentUsers: ServiceBase & Catalog.GConcurrentUsers;
	}
	const GConcurrentUsers: Client["GConcurrentUsers"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGSoucasnePracujiciUzivatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Třída pro zjištění současně pracujících uživatelů*/
	interface SoucasnePracujiciUzivatele {
		/**Vypíše fáze za období*/
		listFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.GSoubeznePracujiciUzivatele>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SoucasnePracujiciUzivatele: ServiceBase & Catalog.SoucasnePracujiciUzivatele;
	}
	const SoucasnePracujiciUzivatele: Client["SoucasnePracujiciUzivatele"];
}
declare namespace Gordic.Akc.Interface {
	/**Filter SoucasnePracujiciUzivatele*/
	const enum GSoucasnePracujiciUzivateleFilter {
		/**Datum OD*/
		datum_od,
		/**Datum DO*/
		datum_do,
		/**Vybrané fáze*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGUnauthorizedAttempts.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Isl pro neoprávněné pokusy*/
	interface UnauthorizedUsers {
		/**Výpis neoprávněných pokusů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.GUnauthorizedAttemptDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UnauthorizedUsers: ServiceBase & Catalog.UnauthorizedUsers;
	}
	const UnauthorizedUsers: Client["UnauthorizedUsers"];
}
declare namespace Gordic.Akc.Interface.Users {
	/**Filtr pro neoprávněné pokusy*/
	const enum FilterUnauthorizedAttempts {
		/**Datum neoprávněného pokusu*/
		dat_login,
		/**Fáze*/
		faze,
		/**Verze*/
		verze,
		/**Revize*/
		revize,
		/**Login*/
		login_name,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGUsersLoginHistory.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Iterface pro zobrazení uživatelské historie*/
	interface GLoginHistory {
		/**Výpis historie uživatelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Akc.Interface.DTOs.GActiveUserLoginDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GLoginHistory: ServiceBase & Catalog.GLoginHistory;
	}
	const GLoginHistory: Client["GLoginHistory"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Akc.Interface\Users\Gordic.Akc.Interface.IGUsersLoginsLogic.d.ts 

declare namespace Gordic.Akc.Interface {
	/**Filter on user*/
	const enum FilterUser {
		/**The sessid*/
		sessid,
		/**The dat login*/
		dat_login,
		/**The limit of rows*/
		limit,
		/**The log por cislo*/
		log_por_cislo,
		/**The ixs fun*/
		ixs_fun,
		/**The ixs reference*/
		ixs_ref,
		/**The login win*/
		login_win,
		/**The comp name*/
		comp_name,
		/**Faze*/
		faze,
		/**activeUsersThisDb - aktivní uživatelé pouze pro tuto db (INFORMIX)*/
		activeUsersThisDb,
		/**Typ připojení*/
		typ_pripojeni,
	}
}

//#endregion

