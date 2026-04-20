/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       usn.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Usn.Interface\Gordic.Usn.Interface.csproj
*    created     2026-02-16 14:36:33
*    files       Dto\GHlasAsyncTaskDto.d.ts
*                Dto\GUsssahlDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Usn.Interface\Dto\GHlasAsyncTaskDto.d.ts 

declare namespace Gordic.Usn.Interface {
	/**GHlasAsyncTaskInputDto*/
	interface GHlasAsyncTaskInputDto {
	}
	const enum GHlasAsyncTaskInputDtoNames {}
	const enum GHlasAsyncTaskInputDtoFragments {}
	const enum GHlasAsyncTaskInputDtoTypes {}
	/**GHlasAsyncTaskOutputDto*/
	interface GHlasAsyncTaskOutputDto {
		/**Název materiálu*/
		Nazev?: string|null;
		/**Podrobný popis materiálu*/
		Popis?: string|null;
		/**Zda probíhá hlasování*/
		IsHlasovani?: boolean|null;
		/**Časová značka*/
		Timestamp?: JsonDate|null;
	}
	const enum GHlasAsyncTaskOutputDtoNames { Nazev = "Nazev", Popis = "Popis", IsHlasovani = "IsHlasovani", Timestamp = "Timestamp",}
	const enum GHlasAsyncTaskOutputDtoFragments { Nazev = "*", Popis = "*", IsHlasovani = "*", Timestamp = "*",}
	const enum GHlasAsyncTaskOutputDtoTypes { Nazev = "string", Popis = "string", IsHlasovani = "boolean", Timestamp = "JsonDate",}
	/**GHlasProgressDto*/
	interface GHlasAsyncProgressDto extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
		/**Název materiálu*/
		Nazev?: string|null;
		/**Podrobný popis materiálu*/
		Popis?: string|null;
		/**Zda probíhá hlasování*/
		IsHlasovani?: boolean|null;
		/**Časová značka*/
		Timestamp?: JsonDate|null;
	}
	const enum GHlasAsyncProgressDtoNames { Nazev = "Nazev", Popis = "Popis", IsHlasovani = "IsHlasovani", Timestamp = "Timestamp", current = "current", total = "total", text = "text",}
	const enum GHlasAsyncProgressDtoFragments { Nazev = "*", Popis = "*", IsHlasovani = "*", Timestamp = "*", current = "*", total = "*", text = "*",}
	const enum GHlasAsyncProgressDtoTypes { Nazev = "string", Popis = "string", IsHlasovani = "boolean", Timestamp = "JsonDate", current = "number", total = "number", text = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Usn.Interface\Dto\GUsssahlDto.d.ts 

declare namespace Gordic.Usn.Interface {
	/**Třída pro datovou komunikaci s GWAUSH05 - hlasování*/
	interface GUsssahlDto {
		/**identifikátor jednání*/
		ixp_jed?: string|null;
		/**identifikátor bodu*/
		ixp_bod?: string|null;
		/**identifikátor výroku*/
		ixs_vyr?: string|null;
		/**datum a čas*/
		dat_zmena?: JsonDate|null;
		/**název materiálu*/
		nazev?: string|null;
		/**podrobný popis materiálu*/
		popis?: string|null;
		/**informace zda je spuštěno hlasování*/
		hlasovani?: number|null;
	}
	const enum GUsssahlDtoNames { ixp_jed = "ixp_jed", ixp_bod = "ixp_bod", ixs_vyr = "ixs_vyr", dat_zmena = "dat_zmena", nazev = "nazev", popis = "popis", hlasovani = "hlasovani",}
	const enum GUsssahlDtoFragments { ixp_jed = "*", ixp_bod = "*", ixs_vyr = "*", dat_zmena = "*", nazev = "*", popis = "*", hlasovani = "*",}
	const enum GUsssahlDtoTypes { ixp_jed = "string", ixp_bod = "string", ixs_vyr = "string", dat_zmena = "JsonDate", nazev = "string", popis = "string", hlasovani = "number",}
}

//#endregion

