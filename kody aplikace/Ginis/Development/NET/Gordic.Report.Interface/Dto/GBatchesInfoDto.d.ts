declare namespace Gordic.Report.Interface {
	/**Rozsireni pro batch files*/
	interface GBatchesInfoDto extends Gordic.General.ApplicationInterface.GFileInfoDto {
		/**Nazev adresare obs. files*/
		directory?: string|null;
		/**Seznam souboru v adresari*/
		files?: string[]|null;
		/**Hlavni soubor ke stazeni neexistuje (jsou k dispozici jen prop. Files)*/
		isMainFileEmpty?: boolean|null;
	}
	const enum GBatchesInfoDtoNames { directory = "directory", files = "files", isMainFileEmpty = "isMainFileEmpty", metaData = "metaData", guid = "guid", id = "id", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", fileSize = "fileSize", sizeB = "sizeB", tempName = "tempName",}
	const enum GBatchesInfoDtoFragments { directory = "*", files = "*", isMainFileEmpty = "*", metaData = "*", guid = "*", id = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", fileSize = "*", sizeB = "*", tempName = "*",}
	const enum GBatchesInfoDtoTypes { directory = "string", files = "string[]", isMainFileEmpty = "boolean", metaData = "any", guid = "string", id = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", fileSize = "string", sizeB = "number", tempName = "string",}
	const enum GBatchesInfoDtoTypeLengths {}
}
