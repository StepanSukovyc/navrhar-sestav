/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       smz.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Smz.Interface\Gordic.Smz.Interface.csproj
*    created     2026-02-16 14:36:03
*    files       ISL\IGSmzAplikaceUzivatele.d.ts
*                ISL\IGSmzCertifikat.d.ts
*                ISL\IGSmzExtUser.d.ts
*                ISL\IGSmzPrehledZarizeni.d.ts
*                ISL\IGSmzQrCodeSetting.d.ts
*                SMZ\ExtUserDto.d.ts
*                Subsystems\SMZ\DATASET\GSmzZarizeniDto.d.ts
*                Subsystems\SMZ\DTO\GSmzAplikaceUzivateleDto.d.ts
*                Subsystems\SMZ\DTO\GSmzCertDto.d.ts
*                Subsystems\SMZ\DTO\GSmzQrCodeDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\ISL\IGSmzAplikaceUzivatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro přehled zařízení pro*/
	interface SmzAplikaceUzivatele {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Smz.Interface.GSmzAplikaceUzivateleDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmzAplikaceUzivatele: ServiceBase & Catalog.SmzAplikaceUzivatele;
	}
	const SmzAplikaceUzivatele: Client["SmzAplikaceUzivatele"];
}
declare namespace Gordic.Smz.Interface {
	const enum GFilterSmzAplikaceUzivatele {
		ixs_zar,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\ISL\IGSmzCertifikat.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro přehled zařízení pro*/
	interface SmzCertifikat {
		upsert(rq?:Gordic.Smz.Interface.GSmzCertDto|CallParams<GServiceSaveRequest<Gordic.Smz.Interface.GSmzCertDto>>): _Task<GServiceSaveRequest<Gordic.Smz.Interface.GSmzCertDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmzCertifikat: ServiceBase & Catalog.SmzCertifikat;
	}
	const SmzCertifikat: Client["SmzCertifikat"];
}
declare namespace Gordic.Smz.Interface {
	const enum GFilterSmzCertifikat {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\ISL\IGSmzExtUser.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro externího uživatele SMZ*/
	interface SmzExtUser {
		read(rq?:Gordic.Smz.Interface.GExtUserDto|CallParams<GServiceReadRequest<Gordic.Smz.Interface.GExtUserDto>>): _Task<GServiceReadRequest<Gordic.Smz.Interface.GExtUserDto>,GServiceReadResponse<Gordic.Smz.Interface.GExtUserDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmzExtUser: ServiceBase & Catalog.SmzExtUser;
	}
	const SmzExtUser: Client["SmzExtUser"];
}
declare namespace Gordic.Smz.Interface {
	const enum GFilterSmzExtUser {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\ISL\IGSmzPrehledZarizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro přehled zařízení pro*/
	interface SmzZarizeni {
		/**Metoda pro výpis mých zařízení*/
		listZarizeniAktualniUzivatel(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Smz.Interface.GSmzZarizeniDto>>;
		/**Metoda pro výpis všech aktivních zařízení pro admninistrátora*/
		listZarizeni(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Smz.Interface.GSmzZarizeniDto>>;
		/**Povolení zařízení*/
		povolit(rq?:Gordic.Smz.Interface.GSmzZarizeniDto|CallParams<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>>): _Task<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>,void>;
		/**Zakázané zařízení*/
		zakazat(rq?:Gordic.Smz.Interface.GSmzZarizeniDto|CallParams<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>>): _Task<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>,void>;
		/**Odstranění zařízení*/
		remove(rq?:Gordic.Smz.Interface.GSmzZarizeniDto|CallParams<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>>): _Task<GServiceSaveRequest<Gordic.Smz.Interface.GSmzZarizeniDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmzZarizeni: ServiceBase & Catalog.SmzZarizeni;
	}
	const SmzZarizeni: Client["SmzZarizeni"];
}
declare namespace Gordic.Smz.Interface {
	const enum GFilterSmzPrehledZarizeni {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\ISL\IGSmzQrCodeSetting.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro QrCode pro nastavení*/
	interface SmzQrCodeSetting {
		/**Interface pro načtení Qr kódu pro nastavení*/
		readQrCode(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Smz.Interface.GSmzQrCodeDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmzQrCodeSetting: ServiceBase & Catalog.SmzQrCodeSetting;
	}
	const SmzQrCodeSetting: Client["SmzQrCodeSetting"];
}
declare namespace Gordic.Smz.Interface {
	const enum GFilterSmzQrCodeSetting {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\SMZ\ExtUserDto.d.ts 

declare namespace Gordic.Smz.Interface {
	/**NajdiIxsExtResult*/
	interface GExtUserDto {
		/**LoginNameExt*/
		LoginNameExt?: string|null;
		/**ExtSystemName*/
		ExtSystemName?: string|null;
		/**IxsExt*/
		IxsExt?: string|null;
	}
	const enum GExtUserDtoNames { LoginNameExt = "LoginNameExt", ExtSystemName = "ExtSystemName", IxsExt = "IxsExt",}
	const enum GExtUserDtoFragments { LoginNameExt = "*", ExtSystemName = "*", IxsExt = "*",}
	const enum GExtUserDtoTypes { LoginNameExt = "string", ExtSystemName = "string", IxsExt = "string",}
	const enum GExtUserDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\Subsystems\SMZ\DATASET\GSmzZarizeniDto.d.ts 

declare namespace Gordic.Smz.Interface {
	/**DBTABLE:GSmzZarizeni*/
	interface GSmzZarizeniDto {
		/**DBCOLUMN:GSmzZarizeni.ixs_moz*/
		ixs_moz?: string|null;
		/**DBCOLUMN:GSmzZarizeni.unique_id*/
		unique_id?: string|null;
		/**DBCOLUMN:GSmzZarizeni.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:GSmzZarizeni.stav_za*/
		stav_za?: number|null;
		/**DBCOLUMN:GSmzZarizeni.platforma_id*/
		platforma_id?: number|null;
		/**DBCOLUMN:GSmzZarizeni.platforma_nazev*/
		platforma_nazev?: string|null;
		/**DBCOLUMN:GSmzZarizeni.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:GSmzZarizeni.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GSmzZarizeniDtoNames { ixs_moz = "ixs_moz", unique_id = "unique_id", nazev = "nazev", stav_za = "stav_za", platforma_id = "platforma_id", platforma_nazev = "platforma_nazev", aktivita = "aktivita", dat_zmena = "dat_zmena",}
	const enum GSmzZarizeniDtoFragments { ixs_moz = "*", unique_id = "*", nazev = "*", stav_za = "*", platforma_id = "*", platforma_nazev = "*", aktivita = "*", dat_zmena = "*",}
	const enum GSmzZarizeniDtoTypes { ixs_moz = "string", unique_id = "string", nazev = "string", stav_za = "number", platforma_id = "number", platforma_nazev = "string", aktivita = "number", dat_zmena = "JsonDate",}
	const enum GSmzZarizeniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\Subsystems\SMZ\DTO\GSmzAplikaceUzivateleDto.d.ts 

declare namespace Gordic.Smz.Interface {
	/**Aplikace pro jednotlivé uživatele*/
	interface GSmzAplikaceUzivateleDto {
		/**Identifikátor uživatele*/
		ixs_ref?: string|null;
		/**Název uživatele*/
		ixs_ref_txt?: string|null;
		/**Fáze*/
		sfa?: string|null;
		/**Textová reprezentace fáze*/
		sfa_txt?: string|null;
		/**Příznak mobilního zařízení*/
		priz_mobil?: number|null;
		/**Datum zmeny*/
		dat_zmena?: JsonDate|null;
	}
	const enum GSmzAplikaceUzivateleDtoNames { ixs_ref = "ixs_ref", ixs_ref_txt = "ixs_ref_txt", sfa = "sfa", sfa_txt = "sfa_txt", priz_mobil = "priz_mobil", dat_zmena = "dat_zmena",}
	const enum GSmzAplikaceUzivateleDtoFragments { ixs_ref = "*", ixs_ref_txt = "*", sfa = "*", sfa_txt = "*", priz_mobil = "*", dat_zmena = "*",}
	const enum GSmzAplikaceUzivateleDtoTypes { ixs_ref = "string", ixs_ref_txt = "string", sfa = "string", sfa_txt = "string", priz_mobil = "number", dat_zmena = "JsonDate",}
	const enum GSmzAplikaceUzivateleDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\Subsystems\SMZ\DTO\GSmzCertDto.d.ts 

declare namespace Gordic.Smz.Interface {
	/**DBTABLE:gintmoz
	*      Pracovní tabulka pro přihlašování mobilních zařízení
	*/
	interface GSmzCertDto {
		/**Osoba*/
		ixs_ref?: string|null;
		ixs_moz?: string|null;
		pwd?: string|null;
		pfx?: JsonBlob|null;
		dat_platnost?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Unikátní id*/
		unique_id?: string|null;
	}
	const enum GSmzCertDtoNames { ixs_ref = "ixs_ref", ixs_moz = "ixs_moz", pwd = "pwd", pfx = "pfx", dat_platnost = "dat_platnost", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", unique_id = "unique_id",}
	const enum GSmzCertDtoFragments { ixs_ref = "*", ixs_moz = "*", pwd = "*", pfx = "*", dat_platnost = "*", dat_zmena = "*", zmenu_prov = "*", unique_id = "*",}
	const enum GSmzCertDtoTypes { ixs_ref = "string", ixs_moz = "string", pwd = "string", pfx = "JsonBlob", dat_platnost = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", unique_id = "string",}
	const enum GSmzCertDtoTypeLengths { ixs_ref = 12, ixs_moz = 12, pwd = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Smz.Interface\Subsystems\SMZ\DTO\GSmzQrCodeDto.d.ts 

declare namespace Gordic.Smz.Interface {
	/**Dto pro zobrazení párovacího QR kódu*/
	interface GSmzQrCodeDto {
		/**QR code pro nastavení mobilního zařízení*/
		qr_code?: JsonBlob|null;
	}
	const enum GSmzQrCodeDtoNames { qr_code = "qr_code",}
	const enum GSmzQrCodeDtoFragments { qr_code = "*",}
	const enum GSmzQrCodeDtoTypes { qr_code = "JsonBlob",}
	const enum GSmzQrCodeDtoTypeLengths {}
}

//#endregion

