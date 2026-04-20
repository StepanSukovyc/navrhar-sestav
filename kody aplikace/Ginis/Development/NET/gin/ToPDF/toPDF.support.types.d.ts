/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       toPDF.support.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.ToPDF.Support\Gordic.ToPDF.Support.csproj
*    created     2026-02-16 14:33:47
*    files       Text\GPdfPageDto.d.ts
*                Text\GPdfRedactingFieldDto.d.ts
*                Text\GPdfRedactingTemplateDto.d.ts
*                Text\GPdfWordDto.d.ts
*                Validation\PdfType.d.ts
*                Validation\PdfValidationPlugin.d.ts
*                Validation\PdfValidationResult.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Text\GPdfPageDto.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**Dto for pdf page*/
	interface GPdfPageDto {
		/**Number of page in pdf file*/
		pageNumber?: number|null;
		/**Width of page in original size*/
		width?: number|null;
		/**Height of page in original size*/
		height?: number|null;
		/**List of words in page*/
		words?: Gordic.ToPDF.Support.GPdfWordDto[]|null;
	}
	const enum GPdfPageDtoNames { pageNumber = "pageNumber", width = "width", height = "height", words = "words",}
	const enum GPdfPageDtoFragments { pageNumber = "*", width = "*", height = "*", words = "*",}
	const enum GPdfPageDtoTypes { pageNumber = "number", width = "number", height = "number", words = "Gordic.ToPDF.Support.GPdfWordDto[]",}
	const enum GPdfPageDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Text\GPdfRedactingFieldDto.d.ts 

declare namespace Gordic.ToPDF.Support {
    /**Dto For redacting field*/
	interface GPdfRedactingFieldDto extends Gordic.ToPDF.Support.GPdfWordDto {
        /**Number of page, where field is located.*/
		pageNumber?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Text\GPdfRedactingTemplateDto.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**DTO for redacting Template*/
	interface GPdfRedactingTemplateDto {
		/**Name of template*/
		name?: string|null;
		/**Type of template*/
		type?: string|null;
	}
	const enum GPdfRedactingTemplateDtoNames { name = "name", type = "type",}
	const enum GPdfRedactingTemplateDtoFragments { name = "*", type = "*",}
	const enum GPdfRedactingTemplateDtoTypes { name = "string", type = "string",}
	const enum GPdfRedactingTemplateDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Text\GPdfWordDto.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**DTO for word in pdf page*/
	interface GPdfWordDto {
		/**The x coordinance*/
		x?: number|null;
		/**The y coordinance*/
		y?: number|null;
		/**The width*/
		w?: number|null;
		/**The height*/
		h?: number|null;
		/**text of word*/
		text?: string|null;
		/**Is redacted or not*/
		isRedacted?: boolean|null;
	}
	const enum GPdfWordDtoNames { x = "x", y = "y", w = "w", h = "h", text = "text", isRedacted = "isRedacted",}
	const enum GPdfWordDtoFragments { x = "*", y = "*", w = "*", h = "*", text = "*", isRedacted = "*",}
	const enum GPdfWordDtoTypes { x = "number", y = "number", w = "number", h = "number", text = "string", isRedacted = "boolean",}
	const enum GPdfWordDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Validation\PdfType.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**Typ pdf, číselná hodnota je PRONOM ID*/
	const enum PdfType {
		/**PDF Reference 1.0*/
		PDF_1_0=613,
		/**PDF Reference 1.1*/
		PDF_1_1=614,
		/**PDF Reference 1.2*/
		PDF_1_2=615,
		/**PDF Reference 1.3*/
		PDF_1_3=616,
		/**PDF Reference 1.4*/
		PDF_1_4=617,
		/**PDF Reference 1.5*/
		PDF_1_5=618,
		/**PDF Reference 1.6*/
		PDF_1_6=637,
		/**PDF 1.7, ISO 32000-1*/
		PDF_1_7=1016,
		/**PDF/A 1a, ISO 19005-1, Level A compliance*/
		PDFA_1a=770,
		/**PDF/A 1b, ISO 19005-1, Level B compliance*/
		PDFA_1b=1100,
		/**PDF/A 2a, ISO 19005-2, Level A compliance*/
		PDFA_2a=1263,
		/**PDF/A 2b, ISO 19005-2, Level B compliance*/
		PDFA_2b=1264,
		/**PDF/A 2u, ISO 19005-2, Level U compliance*/
		PDFA_2u=1265,
		/**PDF/A 3a, ISO 19005-3, Level A compliance*/
		PDFA_3a=1266,
		/**PDF/A 3b, ISO 19005-3, Level B compliance*/
		PDFA_3b=1267,
		/**PDF/A 3u, ISO 19005-3, Level U compliance*/
		PDFA_3u=1268,
		/**PDF/A 4, ISO 19005-4:2020, PDF/A-4*/
		PDFA_4=2766,
		/**PDF/A 4e, ISO 19005-4:2020, PDF/A-4e, aimed at engineering use-cases*/
		PDFA_4e=2767,
		/**PDF/A 4f, ISO 19005-4:2020, PDF/A-4f allows files of any format to be embedded.*/
		PDFA_4f=2770,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Validation\PdfValidationPlugin.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**Plugin pro validaci PDF/A*/
	const enum PdfValidationPlugin {
		/**DynaPDF*/
		DynaPdf=1,
		/**Adobe LiveCycle*/
		AdobeLiveCycle=2,
		/**Kontrola hlavičky PDF*/
		PdfHeader=3,
		/**3-Height Pdf Validator*/
		HeightsPdfValidator=4,
		/**Validace pomocí DKS*/
		DKS=5,
		/**Validace pomocí Long-Term Docs*/
		LTD=6,
		/**CESYP*/
		CESYP=7,
		/**veraPDF*/
		veraPDF=8,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ToPDF.Support\Validation\PdfValidationResult.d.ts 

declare namespace Gordic.ToPDF.Support {
	/**Výsledek validace*/
	interface PdfValidationResult {
		/**Plugin*/
		readonly Plugin?: Gordic.ToPDF.Support.PdfValidationPlugin|null;
		/**Plugin name*/
		readonly PluginName?: string|null;
		/**Výsledek*/
		readonly Result?: boolean|null;
		/**Zda byla validace provedena*/
		readonly ValidationExecuted?: boolean|null;
		/**Textové hlášení*/
		readonly StringResult?: string|null;
		/**Verze pluginu*/
		PluginVersion?: string|null;
		/**Typ normy*/
		Conformance?: Gordic.ToPDF.Support.PdfType|null;
	}
	const enum PdfValidationResultNames { Plugin = "Plugin", PluginName = "PluginName", Result = "Result", ValidationExecuted = "ValidationExecuted", StringResult = "StringResult", PluginVersion = "PluginVersion", Conformance = "Conformance",}
	const enum PdfValidationResultFragments { Plugin = "*", PluginName = "*", Result = "*", ValidationExecuted = "*", StringResult = "*", PluginVersion = "*", Conformance = "*",}
	const enum PdfValidationResultTypes { Plugin = "Gordic.ToPDF.Support.PdfValidationPlugin", PluginName = "string", Result = "boolean", ValidationExecuted = "boolean", StringResult = "string", PluginVersion = "string", Conformance = "Gordic.ToPDF.Support.PdfType",}
	const enum PdfValidationResultTypeLengths {}
}

//#endregion

