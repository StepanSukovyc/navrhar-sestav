/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       vyp.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Vyp.WebControls\Gordic.Vyp.WebControls.csproj
*    created     2026-02-16 14:36:13
*    files       Gin\Vyp\AppSettings\GVypBaseSettingsDto.d.ts
*                Gin\Vyp\Lists\GVypDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Vyp.WebControls\Gin\Vyp\AppSettings\GVypBaseSettingsDto.d.ts 

declare namespace Gordic.Vyp.WebControls {
	/**Dto uživatelského nastavení vypravení zásilek v UserSettings (GStore).*/
	interface GVypBaseSettingsDto extends Gordic.Wfl.WebClient.GWflBaseSettingsDto {
		/**Zobrazit okno pro kontrolu zásilky a převzít*/
		prevzit_dle_id_automaticky?: boolean|null;
	}
	const enum GVypBaseSettingsDtoNames { prevzit_dle_id_automaticky = "prevzit_dle_id_automaticky", spustitPosledniTask = "spustitPosledniTask",}
	const enum GVypBaseSettingsDtoFragments { prevzit_dle_id_automaticky = "*", spustitPosledniTask = "*",}
	const enum GVypBaseSettingsDtoTypes { prevzit_dle_id_automaticky = "boolean", spustitPosledniTask = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vyp.WebControls\Gin\Vyp\Lists\GVypDto.d.ts 

declare namespace Gordic.Vyp.WebControls {
	/**struktura pro operace nad seznammy*/
	interface GVypListParamsDto {
		/**soubor na serveru pro ePA*/
		epa_server_jmeno_souboru?: string|null;
		/**param do sestavy*/
		VyberTiskPA?: number|null;
		/**Ixs Isu*/
		IxsIsu?: string|null;
	}
	const enum GVypListParamsDtoNames { epa_server_jmeno_souboru = "epa_server_jmeno_souboru", VyberTiskPA = "VyberTiskPA", IxsIsu = "IxsIsu",}
	const enum GVypListParamsDtoFragments { epa_server_jmeno_souboru = "*", VyberTiskPA = "*", IxsIsu = "*",}
	const enum GVypListParamsDtoTypes { epa_server_jmeno_souboru = "string", VyberTiskPA = "number", IxsIsu = "string",}
}

//#endregion

