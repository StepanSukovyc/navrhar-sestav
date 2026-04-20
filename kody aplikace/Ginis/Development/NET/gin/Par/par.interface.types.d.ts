/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       par.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Par.Interface\Gordic.Par.Interface.csproj
*    created     2026-02-16 14:36:16
*    files       StorageCheck\GResult.d.ts
*                StorageCheck\GStorageCheckAction.d.ts
*                StorageCheck\GStorageCheckAsyncInputDto.d.ts
*                StorageCheck\GStorageCheckAsyncProgressDto.d.ts
*                StorageCheck\GStorageCheckType.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Par.Interface\StorageCheck\GResult.d.ts 

declare namespace Gordic.Par.Interface {
	/**Result severity*/
	const enum GResult {
		/**None*/
		None=0,
		/**OK*/
		OK=1,
		/**Warning*/
		Warning=2,
		/**Error*/
		Error=4,
		/**Not performed*/
		NotPerformed=8,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Par.Interface\StorageCheck\GStorageCheckAction.d.ts 

declare namespace Gordic.Par.Interface {
	/**Zvolená akce na kontrole uložiště*/
	const enum GStorageCheckAction {
		/**Kontrola*/
		Check=10,
		/**Odhad*/
		Estimate=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Par.Interface\StorageCheck\GStorageCheckAsyncInputDto.d.ts 

declare namespace Gordic.Par.Interface {
	/**GStorageCheckAsyncDate*/
	interface GStorageCheckAsyncDate {
		/**Start*/
		start?: JsonDate|null;
		/**End*/
		end?: JsonDate|null;
	}
	const enum GStorageCheckAsyncDateNames { start = "start", end = "end",}
	const enum GStorageCheckAsyncDateFragments { start = "*", end = "*",}
	const enum GStorageCheckAsyncDateTypes { start = "JsonDate", end = "JsonDate",}
	const enum GStorageCheckAsyncDateTypeLengths {}
	/**GStorageCheckAsyncInputDto*/
	interface GStorageCheckAsyncInputDto {
		/**Datumový interval*/
		Date?: Gordic.Par.Interface.GStorageCheckAsyncDate|null;
		/**Zvolená akce*/
		Action?: Gordic.Par.Interface.GStorageCheckAction|null;
		/**Typ kontroly*/
		CheckType?: Gordic.Par.Interface.GStorageCheckType|null;
		/**Zobraz výsledky kontrol
		*     E - Chyba, W - Varování, O - V pořádku
		*/
		CheckResult?: Gordic.Par.Interface.GResult[]|null;
		/**Počet vláken ke zpracování*/
		NumThreadCountValue?: number|null;
	}
	const enum GStorageCheckAsyncInputDtoNames { Date = "Date", Action = "Action", CheckType = "CheckType", CheckResult = "CheckResult", NumThreadCountValue = "NumThreadCountValue",}
	const enum GStorageCheckAsyncInputDtoFragments { Date = "*", Action = "*", CheckType = "*", CheckResult = "*", NumThreadCountValue = "*",}
	const enum GStorageCheckAsyncInputDtoTypes { Date = "Gordic.Par.Interface.GStorageCheckAsyncDate", Action = "Gordic.Par.Interface.GStorageCheckAction", CheckType = "Gordic.Par.Interface.GStorageCheckType", CheckResult = "Gordic.Par.Interface.GResult[]", NumThreadCountValue = "number",}
	const enum GStorageCheckAsyncInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Par.Interface\StorageCheck\GStorageCheckAsyncProgressDto.d.ts 

declare namespace Gordic.Par.Interface {
	/**GStorageCheckAsyncProgressDto*/
	interface GStorageCheckAsyncProgressDto {
		/**progressPercentage*/
		progressPercentage?: number|null;
		/**index*/
		index?: number|null;
		/**info*/
		info?: string|null;
	}
	const enum GStorageCheckAsyncProgressDtoNames { progressPercentage = "progressPercentage", index = "index", info = "info",}
	const enum GStorageCheckAsyncProgressDtoFragments { progressPercentage = "*", index = "*", info = "*",}
	const enum GStorageCheckAsyncProgressDtoTypes { progressPercentage = "number", index = "number", info = "string",}
	const enum GStorageCheckAsyncProgressDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Par.Interface\StorageCheck\GStorageCheckType.d.ts 

declare namespace Gordic.Par.Interface {
	/**Storage check type*/
	const enum GStorageCheckType {
		/**IXB values integrity accross whole database- every IXB have its representation in wfls(h)ixb - every IXB from wfls(h)ixb have its IXS_ULO value represented in wflsulo - every IXS_ULO from wflsulo have its reference in wfls(h)ixb*/
		IxbValuesIntegrity,
		/**Check if a file truly exists in a file storageAll files from wfsulo*/
		RegisteredFileExistence,
		/**Check if any spare files exist in a file storageAll files which are not registered in wflsulo table are reported*/
		SpareFileExistence,
		/**Check if all registered files marked as deleted are truly deleted from DMS*/
		DeletedRegisteredFiles,
	}
}

//#endregion

