/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adx.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adx.WebControls\Gordic.Adx.WebControls.csproj
*    created     2026-02-16 14:33:49
*    files       Gin\Adx\Dto\GAdxBaseDetailObj.d.ts
*                Gin\Adx\Dto\GAdxDictionaryObject.d.ts
*                Gin\Adx\Dto\GAdxLoginDto.d.ts
*                Gin\Adx\Dto\GAdxSimplePermissionObj.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adx.WebControls\Gin\Adx\Dto\GAdxBaseDetailObj.d.ts 

declare namespace Gordic.Adx.WebControls {
	/**Obecný detail pro získání detailu z obsahu výběrové skupiny*/
	interface GAdxBaseDetailObj {
		/**Seznam parametrů*/
		paramsList?: Gordic.Adx.WebControls.GAdxDictionaryObject[]|null;
		detailName?: string|null;
	}
	const enum GAdxBaseDetailObjNames { paramsList = "paramsList", detailName = "detailName",}
	const enum GAdxBaseDetailObjFragments { paramsList = "*", detailName = "*",}
	const enum GAdxBaseDetailObjTypes { paramsList = "Gordic.Adx.WebControls.GAdxDictionaryObject[]", detailName = "string",}
	const enum GAdxBaseDetailObjTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.WebControls\Gin\Adx\Dto\GAdxDictionaryObject.d.ts 

declare namespace Gordic.Adx.WebControls {
	/**Objekt repreyentující dvojici hodnot*/
	interface GAdxDictionaryObject {
		/**Klíč*/
		key?: string|null;
		/**Value*/
		value?: string|null;
	}
	const enum GAdxDictionaryObjectNames { key = "key", value = "value",}
	const enum GAdxDictionaryObjectFragments { key = "*", value = "*",}
	const enum GAdxDictionaryObjectTypes { key = "string", value = "string",}
	const enum GAdxDictionaryObjectTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.WebControls\Gin\Adx\Dto\GAdxLoginDto.d.ts 

declare namespace Gordic.Adx.WebControls {
	/**Login info ADX*/
	interface GAdxLoginDto {
		/**Ixs osoby*/
		ixs_ref?: string|null;
		/**Uživatel*/
		ixs_ref_txt?: string|null;
		/**Ixs osoby*/
		ixs_fun?: string|null;
		/**Funkční místo*/
		ixs_fun_txt?: string|null;
		/**Datum přihlášení*/
		dat_login?: JsonDate|null;
		/**Název aplikace*/
		app_name?: string|null;
		/**Fáze*/
		faze?: string|null;
	}
	const enum GAdxLoginDtoNames { ixs_ref = "ixs_ref", ixs_ref_txt = "ixs_ref_txt", ixs_fun = "ixs_fun", ixs_fun_txt = "ixs_fun_txt", dat_login = "dat_login", app_name = "app_name", faze = "faze",}
	const enum GAdxLoginDtoFragments { ixs_ref = "*", ixs_ref_txt = "*", ixs_fun = "*", ixs_fun_txt = "*", dat_login = "*", app_name = "*", faze = "*",}
	const enum GAdxLoginDtoTypes { ixs_ref = "string", ixs_ref_txt = "string", ixs_fun = "string", ixs_fun_txt = "string", dat_login = "JsonDate", app_name = "string", faze = "string",}
	const enum GAdxLoginDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.WebControls\Gin\Adx\Dto\GAdxSimplePermissionObj.d.ts 

declare namespace Gordic.Adx.WebControls {
	interface GAdxSimplePermissionObj {
		/**Write*/
		NewPermission?: boolean|null;
		/**Edit*/
		EditPermission?: boolean|null;
		/**Read*/
		ReadPermission?: boolean|null;
	}
	const enum GAdxSimplePermissionObjNames { NewPermission = "NewPermission", EditPermission = "EditPermission", ReadPermission = "ReadPermission",}
	const enum GAdxSimplePermissionObjFragments { NewPermission = "*", EditPermission = "*", ReadPermission = "*",}
	const enum GAdxSimplePermissionObjTypes { NewPermission = "boolean", EditPermission = "boolean", ReadPermission = "boolean",}
	const enum GAdxSimplePermissionObjTypeLengths {}
}

//#endregion

