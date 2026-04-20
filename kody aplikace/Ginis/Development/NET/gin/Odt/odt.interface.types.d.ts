/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       odt.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Odt.Interface\Gordic.Odt.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       Conversions\GOdtPdilConfigDto.d.ts
*                Interfaces\GOdtPostProcessorResultDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Odt.Interface\Conversions\GOdtPdilConfigDto.d.ts 

declare namespace Gordic.Odt.Interface {
	/**Konfigurace pdil pro modul ODT*/
	interface GOdtPdilConfigDto {
		/**Cesta k zipu obs. vsechny soubory*/
		FilePath?: string|null;
		/**Odstrani soubor v property DeleteFile*/
		DeleteFile?: boolean|null;
		/**Vycet souboru k analyze*/
		AnalyzeFiles?: string[]|null;
		/**Jednotlive volby PDIL*/
		Config?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]|null;
	}
	const enum GOdtPdilConfigDtoNames { FilePath = "FilePath", DeleteFile = "DeleteFile", AnalyzeFiles = "AnalyzeFiles", Config = "Config",}
	const enum GOdtPdilConfigDtoFragments { FilePath = "*", DeleteFile = "*", AnalyzeFiles = "*", Config = "*",}
	const enum GOdtPdilConfigDtoTypes { FilePath = "string", DeleteFile = "boolean", AnalyzeFiles = "string[]", Config = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]",}
	const enum GOdtPdilConfigDtoTypeLengths {}
	/**Vysledek analyzy*/
	interface GOdtPdilAnalysisResultDto {
		/**Vysledky po jednotlivych souborech*/
		Files?: Gordic.Odt.Interface.GOdtPdilAnalysisSingleResultDto[]|null;
		/**Vstupni konfigurace*/
		Config?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]|null;
	}
	const enum GOdtPdilAnalysisResultDtoNames { Files = "Files", Config = "Config",}
	const enum GOdtPdilAnalysisResultDtoFragments { Files = "*", Config = "*",}
	const enum GOdtPdilAnalysisResultDtoTypes { Files = "Gordic.Odt.Interface.GOdtPdilAnalysisSingleResultDto[]", Config = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]",}
	const enum GOdtPdilAnalysisResultDtoTypeLengths {}
	/**Vysledek jednoho souboru*/
	interface GOdtPdilAnalysisSingleResultDto {
		/**Nazev*/
		FileName?: string|null;
		/**Vysledky PDIL*/
		Results?: Gordic.Pdil.Interface.Dtos.GPdilLookupResultDto|null;
	}
	const enum GOdtPdilAnalysisSingleResultDtoNames { FileName = "FileName", Results = "Results",}
	const enum GOdtPdilAnalysisSingleResultDtoFragments { FileName = "*", Results = "*",}
	const enum GOdtPdilAnalysisSingleResultDtoTypes { FileName = "string", Results = "Gordic.Pdil.Interface.Dtos.GPdilLookupResultDto",}
	const enum GOdtPdilAnalysisSingleResultDtoTypeLengths {}
	/**Konfigurace k anonymizaci celeho vystupu ODT*/
	interface GOdtPdilAnonymizeConfigDto {
		/**Cesta k zipu obs. vsechny soubory*/
		FilePath?: string|null;
		/**Vysledky lookups*/
		Lookups?: Gordic.Pdil.Interface.Dtos.GPdilLookupResultDto|null;
	}
	const enum GOdtPdilAnonymizeConfigDtoNames { FilePath = "FilePath", Lookups = "Lookups",}
	const enum GOdtPdilAnonymizeConfigDtoFragments { FilePath = "*", Lookups = "*",}
	const enum GOdtPdilAnonymizeConfigDtoTypes { FilePath = "string", Lookups = "Gordic.Pdil.Interface.Dtos.GPdilLookupResultDto",}
	const enum GOdtPdilAnonymizeConfigDtoTypeLengths {}
	/**Konfigurace k anonymizaci jednoho souboru*/
	interface GOdtPdilAnonymizeAsyncTaskInputDto {
		/**FileInfo*/
		FileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Jednotlive volby PDIL*/
		PdilConfig?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]|null;
	}
	const enum GOdtPdilAnonymizeAsyncTaskInputDtoNames { FileInfo = "FileInfo", PdilConfig = "PdilConfig",}
	const enum GOdtPdilAnonymizeAsyncTaskInputDtoFragments { FileInfo = "*", PdilConfig = "*",}
	const enum GOdtPdilAnonymizeAsyncTaskInputDtoTypes { FileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", PdilConfig = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]",}
	const enum GOdtPdilAnonymizeAsyncTaskInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Odt.Interface\Interfaces\GOdtPostProcessorResultDto.d.ts 

declare namespace Gordic.Odt.Interface {
	/**Result pro PostProcess*/
	interface GOdtPostProcessorResultDto {
		/**Message*/
		Message?: string|null;
	}
	const enum GOdtPostProcessorResultDtoNames { Message = "Message",}
	const enum GOdtPostProcessorResultDtoFragments { Message = "*",}
	const enum GOdtPostProcessorResultDtoTypes { Message = "string",}
	const enum GOdtPostProcessorResultDtoTypeLengths {}
	/**Result pro upload pres HTTP*/
	interface GOdtHttpPostProcessorResultDto extends Gordic.Odt.Interface.GOdtPostProcessorResultDto {
		/**HTTP StatusCode*/
		StatusCode?: number|null;
	}
	const enum GOdtHttpPostProcessorResultDtoNames { StatusCode = "StatusCode", Message = "Message",}
	const enum GOdtHttpPostProcessorResultDtoFragments { StatusCode = "*", Message = "*",}
	const enum GOdtHttpPostProcessorResultDtoTypes { StatusCode = "number", Message = "string",}
	const enum GOdtHttpPostProcessorResultDtoTypeLengths {}
}

//#endregion

