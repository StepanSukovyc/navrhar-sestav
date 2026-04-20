declare namespace Gordic.Report.Interface {
	/**Pomocna trida pro udrzeni informaci o formatu*/
	interface GFormatTypeInfoDto {
		/**Pripona soubour*/
		extension: string;
		/**Popis formatu*/
		description: string;
	}
	const enum GFormatTypeInfoDtoNames { extension = "extension", description = "description",}
	const enum GFormatTypeInfoDtoFragments { extension = "*", description = "*",}
	const enum GFormatTypeInfoDtoTypes { extension = "string", description = "string",}
	const enum GFormatTypeInfoDtoTypeLengths {}
}
