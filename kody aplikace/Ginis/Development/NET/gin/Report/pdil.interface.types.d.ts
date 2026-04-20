/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pdil.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pdil.Interface\Gordic.Pdil.Interface.csproj
*    created     2026-02-16 14:33:49
*    files       IGPdilAnonymousCheckService.d.ts
*                Dtos\GPdilAnalyzerOptionsDto.d.ts
*                Dtos\GPdilAnonymizedElementDto.d.ts
*                Dtos\GPdilFileInfoDto.d.ts
*                Dtos\GPdilLookupMatchDto.d.ts
*                Dtos\GPdilLookupResultDto.d.ts
*                Dtos\GPdilObjectStructure.d.ts
*                Dtos\GPdilTextLocationDto.d.ts
*                Enums\GPdilEnumFileParts.d.ts
*                Enums\GPdilEnumLookupTypeCategories.d.ts
*                Enums\GPdilEnumLookupTypes.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\IGPdilAnonymousCheckService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro třídu služby ISL které se používá při kontrole anonymizace.*/
	interface PdilAnonymousCheckService {
		/**/// Předpřipraví soubor pro kontrolu anonymizace.*/
		getFileToImport(rq?:CallParams<{filePath:string}>): _Task<{filePath:string},string>;
		/**Získá informace o souboru, umí vytáhnout soubory ze zipu a získat informace o těch souborech v zipu.*/
		getFiles(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto},Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[]>;
		/**Připraví soubor a vrátí ho jako base64.*/
		filesToExport_Zipped(rq?:CallParams<{files:Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[]}>): _Task<{files:Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[]},string>;
		/**Vymaže všechny dočasné soubory.*/
		cleanup(rq?:CallParams<{files:Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[]}>): _Task<{files:Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PdilAnonymousCheckService: ServiceBase & Catalog.PdilAnonymousCheckService;
	}
	const PdilAnonymousCheckService: Client["PdilAnonymousCheckService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilAnalyzerOptionsDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	interface GPdilAnalyzerOptionsDto {
		EnumLookupTypesToAnalyze?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]|null;
	}
	const enum GPdilAnalyzerOptionsDtoNames { EnumLookupTypesToAnalyze = "EnumLookupTypesToAnalyze",}
	const enum GPdilAnalyzerOptionsDtoFragments { EnumLookupTypesToAnalyze = "*",}
	const enum GPdilAnalyzerOptionsDtoTypes { EnumLookupTypesToAnalyze = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilAnonymizedElementDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	/**Třída drží informaci o jednom elementu k anonymizaci.*/
	interface GPdilAnonymizedElementDto {
		/**Číslený identifikátor položky.*/
		Id?: number|null;
		/**Id elementu, který zajišťuje zvýraznění v textu.*/
		HtmlElementId?: string|null;
		/**Typ textu, který se anonymizuje.*/
		Type?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType|null;
		/**Text, typu anonymizace.*/
		TypeText?: string|null;
		/**Text který má být anonymizován.*/
		AnonymText?: string|null;
		/**Příznak, jestli je v textu tento item anonymizován, nebo není.*/
		IsAnnonym?: boolean|null;
	}
	const enum GPdilAnonymizedElementDtoNames { Id = "Id", HtmlElementId = "HtmlElementId", Type = "Type", TypeText = "TypeText", AnonymText = "AnonymText", IsAnnonym = "IsAnnonym",}
	const enum GPdilAnonymizedElementDtoFragments { Id = "*", HtmlElementId = "*", Type = "*", TypeText = "*", AnonymText = "*", IsAnnonym = "*",}
	const enum GPdilAnonymizedElementDtoTypes { Id = "number", HtmlElementId = "string", Type = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType", TypeText = "string", AnonymText = "string", IsAnnonym = "boolean",}
	const enum GPdilAnonymizedElementDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilFileInfoDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	/**Třída která nese informace o souboru k anonymizaci.*/
	interface GPdilFileInfoDto {
		/**Názve souboru.*/
		FileName?: string|null;
		/**Cesta k adresáři.*/
		DirName?: string|null;
		/**Cesta k souboru.*/
		readonly FilePath?: string|null;
		/**Velikost souboru, textově.*/
		FileSize?: string|null;
		/**Obsah souboru držený jako text.*/
		FileContent?: string|null;
		/**Obsah souboru bez servisních tagů, držený jako text.*/
		FileContentClear?: string|null;
		/**Soupis všech prvků k anonymizaci pro daný soubor.*/
		ToAnonymizationList?: Gordic.Pdil.Interface.Dtos.GPdilAnonymizedElementDto[]|null;
		/**Obsahuje soubor něco k anonymizaci?*/
		readonly ToAnonymization?: boolean|null;
		/**Drží informace o souboru, ze kterého vznikl.*/
		SourceFile?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GPdilFileInfoDtoNames { FileName = "FileName", DirName = "DirName", FilePath = "FilePath", FileSize = "FileSize", FileContent = "FileContent", FileContentClear = "FileContentClear", ToAnonymizationList = "ToAnonymizationList", ToAnonymization = "ToAnonymization", SourceFile = "SourceFile",}
	const enum GPdilFileInfoDtoFragments { FileName = "*", DirName = "*", FilePath = "*", FileSize = "*", FileContent = "*", FileContentClear = "*", ToAnonymizationList = "*", ToAnonymization = "*", SourceFile = "*",}
	const enum GPdilFileInfoDtoTypes { FileName = "string", DirName = "string", FilePath = "string", FileSize = "string", FileContent = "string", FileContentClear = "string", ToAnonymizationList = "Gordic.Pdil.Interface.Dtos.GPdilAnonymizedElementDto[]", ToAnonymization = "boolean", SourceFile = "Gordic.General.ApplicationInterface.GFileInfoDto",}
	const enum GPdilFileInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilLookupMatchDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	interface GPdilLookupMatchDto {
		EnumLookupType?: Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType|null;
		Value?: string|null;
		ValueStartIndex?: number|null;
		ValueEndIndex?: number|null;
		ContextBefore?: string|null;
		ContextAfter?: string|null;
		TextLocationDto?: Gordic.Pdil.Interface.Dtos.GPdilTextLocationDto|null;
	}
	const enum GPdilLookupMatchDtoNames { EnumLookupType = "EnumLookupType", Value = "Value", ValueStartIndex = "ValueStartIndex", ValueEndIndex = "ValueEndIndex", ContextBefore = "ContextBefore", ContextAfter = "ContextAfter", TextLocationDto = "TextLocationDto",}
	const enum GPdilLookupMatchDtoFragments { EnumLookupType = "*", Value = "*", ValueStartIndex = "*", ValueEndIndex = "*", ContextBefore = "*", ContextAfter = "*", TextLocationDto = "*",}
	const enum GPdilLookupMatchDtoTypes { EnumLookupType = "Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes.GPdilEnumLookupType", Value = "string", ValueStartIndex = "number", ValueEndIndex = "number", ContextBefore = "string", ContextAfter = "string", TextLocationDto = "Gordic.Pdil.Interface.Dtos.GPdilTextLocationDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilLookupResultDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	interface GPdilLookupResultDto {
		LookupMatches?: Gordic.Pdil.Interface.Dtos.GPdilLookupMatchDto[]|null;
	}
	const enum GPdilLookupResultDtoNames { LookupMatches = "LookupMatches",}
	const enum GPdilLookupResultDtoFragments { LookupMatches = "*",}
	const enum GPdilLookupResultDtoTypes { LookupMatches = "Gordic.Pdil.Interface.Dtos.GPdilLookupMatchDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilObjectStructure.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	/**Třída slouží pro držení výsledků analýzy objektu.*/
	interface GPdilObjectStructure {
		/**Drží název uzlu/objektu.*/
		Name?: string|null;
		/**Drží potomky daného uzlu/objektu.*/
		Childern?: Gordic.Pdil.Interface.Dtos.GPdilObjectStructure[]|null;
	}
	const enum GPdilObjectStructureNames { Name = "Name", Childern = "Childern",}
	const enum GPdilObjectStructureFragments { Name = "*", Childern = "*",}
	const enum GPdilObjectStructureTypes { Name = "string", Childern = "Gordic.Pdil.Interface.Dtos.GPdilObjectStructure[]",}
	const enum GPdilObjectStructureTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Dtos\GPdilTextLocationDto.d.ts 

declare namespace Gordic.Pdil.Interface.Dtos {
	interface GPdilTextLocationDto {
		FilePart?: Gordic.Pdil.Interface.Enums.GPdilEnumFileParts.GPdilEnumFilePart|null;
		LineIndex?: number|null;
		PageIndex?: number|null;
		WorksheetName?: string|null;
		WorksheetIndex?: number|null;
		RowIndex?: number|null;
		CellIndex?: number|null;
		SlideIndex?: number|null;
		ShapeIndex?: number|null;
		ParagraphIndex?: number|null;
        /**GemBox: Run is an Inline element used to insert textual content to a document.*/
		RunIndex?: number|null;
	}
	const enum GPdilTextLocationDtoNames { FilePart = "FilePart", LineIndex = "LineIndex", PageIndex = "PageIndex", WorksheetName = "WorksheetName", WorksheetIndex = "WorksheetIndex", RowIndex = "RowIndex", CellIndex = "CellIndex", SlideIndex = "SlideIndex", ShapeIndex = "ShapeIndex", ParagraphIndex = "ParagraphIndex", RunIndex = "RunIndex",}
	const enum GPdilTextLocationDtoFragments { FilePart = "*", LineIndex = "*", PageIndex = "*", WorksheetName = "*", WorksheetIndex = "*", RowIndex = "*", CellIndex = "*", SlideIndex = "*", ShapeIndex = "*", ParagraphIndex = "*", RunIndex = "*",}
	const enum GPdilTextLocationDtoTypes { FilePart = "Gordic.Pdil.Interface.Enums.GPdilEnumFileParts.GPdilEnumFilePart", LineIndex = "number", PageIndex = "number", WorksheetName = "string", WorksheetIndex = "number", RowIndex = "number", CellIndex = "number", SlideIndex = "number", ShapeIndex = "number", ParagraphIndex = "number", RunIndex = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Enums\GPdilEnumFileParts.d.ts 

declare namespace Gordic.Pdil.Interface.Enums {
	interface GPdilEnumFileParts {
	}
	const enum GPdilEnumFilePartsNames {}
	const enum GPdilEnumFilePartsFragments {}
	const enum GPdilEnumFilePartsTypes {}
}
declare namespace Gordic.Pdil.Interface.Enums.GPdilEnumFileParts {
	const enum GPdilEnumFilePart {
		Name=1,
		Body//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		SheetName//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		From//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		To//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		CC//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		Subject//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		TextPlainBody//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		HtmlBody//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		AttachmentName//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Enums\GPdilEnumLookupTypeCategories.d.ts 

declare namespace Gordic.Pdil.Interface.Enums {
	interface GPdilEnumLookupTypeCategories {
	}
	const enum GPdilEnumLookupTypeCategoriesNames {}
	const enum GPdilEnumLookupTypeCategoriesFragments {}
	const enum GPdilEnumLookupTypeCategoriesTypes {}
}
declare namespace Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypeCategories {
	const enum GPdilEnumLookupTypeCategory {
		Top=-1,
		Name=-2,
		Document=-3,
		Contact=-4,
		Address=-5,
		Bank=-6,
		Other=-7,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pdil.Interface\Enums\GPdilEnumLookupTypes.d.ts 

declare namespace Gordic.Pdil.Interface.Enums {
	interface GPdilEnumLookupTypes {
	}
	const enum GPdilEnumLookupTypesNames {}
	const enum GPdilEnumLookupTypesFragments {}
	const enum GPdilEnumLookupTypesTypes {}
}
declare namespace Gordic.Pdil.Interface.Enums.GPdilEnumLookupTypes {
	const enum GPdilEnumLookupType {
		FirstName=-1,
		LastName=-2,
		Title=-3,
		City=-4,
		ZIPCode=-5,
		Phone=-6,
		Email=-7,
		Nin=-8,
		NicNo=-9,
		PassportNo=-10,
		TIN=-11,
		VATIN=-12,
		VIN=-13,
		IP=-14,
		MAC=-15,
		Street=-16,
		CityPart=-17,
		FullNameTitle=-18,
		StreetWithNumber=-19,
		Address=-20,
		BankAccountNumber=-22,
		IBAN=-23,
		CreditCardNumber=-24,
	}
}

//#endregion

