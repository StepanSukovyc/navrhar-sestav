/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       dks.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Dks.WebControls\Gordic.Dks.WebControls.csproj
*    created     2026-02-16 14:34:04
*    files       Gin\Dks\Dto\GDksConvertServiceDto.d.ts
*                Gin\Dks\Dto\GDksConvertServiceOutputDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Dks.WebControls\Gin\Dks\Dto\GDksConvertServiceDto.d.ts 

declare namespace Gordic.Dks.WebControls {
	/**konverzní služba + info o souboru (DTO)*/
	interface GDksConvertServiceFileDto {
		/**guid soubor*/
		guid?: string|null;
		/**název souboru + koncovka*/
		filename?: string|null;
	}
	const enum GDksConvertServiceFileDtoNames { guid = "guid", filename = "filename",}
	const enum GDksConvertServiceFileDtoFragments { guid = "*", filename = "*",}
	const enum GDksConvertServiceFileDtoTypes { guid = "string", filename = "string",}
	/**konverzní služba (DTO)*/
	interface GDksConvertServiceDto {
		/**info o souboru*/
		file?: Gordic.Dks.WebControls.GDksConvertServiceFileDto[]|null;
		/**cílový typ souboru*/
		target?: number|null;
		/**OCR*/
		ocr?: boolean|null;
		/**Vložit přílohy*/
		insertAttachments?: boolean|null;
		/**Konvertovat přílohy*/
		convertAttachments?: boolean|null;
	}
	const enum GDksConvertServiceDtoNames { file = "file", target = "target", ocr = "ocr", insertAttachments = "insertAttachments", convertAttachments = "convertAttachments",}
	const enum GDksConvertServiceDtoFragments { file = "*", target = "*", ocr = "*", insertAttachments = "*", convertAttachments = "*",}
	const enum GDksConvertServiceDtoTypes { file = "Gordic.Dks.WebControls.GDksConvertServiceFileDto[]", target = "number", ocr = "boolean", insertAttachments = "boolean", convertAttachments = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dks.WebControls\Gin\Dks\Dto\GDksConvertServiceOutputDto.d.ts 

declare namespace Gordic.Dks.WebControls {
	/**konverzní služba výstupní (DTO)*/
	interface GDksConvertServiceOutputDto {
		/**název souboru*/
		name?: string|null;
		/**původní koncovka*/
		oldext?: string|null;
		/**guid souboru*/
		guid?: string|null;
	}
	const enum GDksConvertServiceOutputDtoNames { name = "name", oldext = "oldext", guid = "guid",}
	const enum GDksConvertServiceOutputDtoFragments { name = "*", oldext = "*", guid = "*",}
	const enum GDksConvertServiceOutputDtoTypes { name = "string", oldext = "string", guid = "string",}
}

//#endregion

