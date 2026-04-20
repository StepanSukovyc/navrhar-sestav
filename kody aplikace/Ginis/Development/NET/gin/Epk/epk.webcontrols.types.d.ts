/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       epk.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Epk.WebControls\Gordic.Epk.WebControls.csproj
*    created     2026-02-16 14:34:14
*    files       Gin\Epk\Dto\EpkSeznamNavazCertDto.d.ts
*                Gin\Epk\Enum\Enums.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Epk.WebControls\Gin\Epk\Dto\EpkSeznamNavazCertDto.d.ts 

declare namespace Gordic.Epk.WebControls {
	/**EpkSeznamNavazCertDto*/
	interface EpkSeznamNavazCertDto {
		/**aktivita*/
		aktivita?: number|null;
		/**jméno certifikátu*/
		jmeno?: string|null;
		/**datum od*/
		dat_od?: JsonDate|null;
		/**datum do*/
		dat_do?: JsonDate|null;
		/**Název certifikační autority*/
		cau_nazev?: string|null;
		/**Název typ certifikátu*/
		typ_cer_txt?: string|null;
	}
	const enum EpkSeznamNavazCertDtoNames { aktivita = "aktivita", jmeno = "jmeno", dat_od = "dat_od", dat_do = "dat_do", cau_nazev = "cau_nazev", typ_cer_txt = "typ_cer_txt",}
	const enum EpkSeznamNavazCertDtoFragments { aktivita = "*", jmeno = "*", dat_od = "*", dat_do = "*", cau_nazev = "*", typ_cer_txt = "*",}
	const enum EpkSeznamNavazCertDtoTypes { aktivita = "number", jmeno = "string", dat_od = "JsonDate", dat_do = "JsonDate", cau_nazev = "string", typ_cer_txt = "string",}
	const enum EpkSeznamNavazCertDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epk.WebControls\Gin\Epk\Enum\Enums.d.ts 


//#endregion

