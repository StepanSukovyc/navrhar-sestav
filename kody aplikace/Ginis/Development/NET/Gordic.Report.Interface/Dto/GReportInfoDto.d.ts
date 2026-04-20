declare namespace Gordic.Report.Interface {
	/**Info o sestave*/
	interface GReportInfoDto extends Gordic.Report.Interface.GReportMinimalInfoDto {
		isAktivni?: boolean|null;
		outputInfo?: Gordic.Report.Interface.GReportOutputInfoDto|null;
		/**Graficka*/
		graficka?: boolean|null;
		/**IxsStr*/
		ixsStr?: string|null;
		/**IxsXme*/
		ixsXme?: string|null;
		/**FormVyst*/
		formVyst?: string|null;
		/**TypVyst*/
		typVyst?: string|null;
		/**Nazev*/
		nazev?: string|null;
		/**TypAlv*/
		typAlv?: string|null;
		/**Tema*/
		tema?: string|null;
		alv?: ObjectLiteral<string>|null;
		/**Podmonozina commoninfos*/
		commonInfos?: ObjectLiteral<string>|null;
		/**Lze sestavu odlozit?*/
		isOdlozitelne?: boolean|null;
	}
	const enum GReportInfoDtoNames { isAktivni = "isAktivni", outputInfo = "outputInfo", graficka = "graficka", ixsStr = "ixsStr", ixsXme = "ixsXme", formVyst = "formVyst", typVyst = "typVyst", nazev = "nazev", typAlv = "typAlv", tema = "tema", alv = "alv", commonInfos = "commonInfos", isOdlozitelne = "isOdlozitelne", ixsAlv = "ixsAlv", idSes = "idSes", datModif = "datModif",}
	const enum GReportInfoDtoFragments { isAktivni = "*", outputInfo = "*", graficka = "*", ixsStr = "*", ixsXme = "*", formVyst = "*", typVyst = "*", nazev = "*", typAlv = "*", tema = "*", alv = "*", commonInfos = "*", isOdlozitelne = "*", ixsAlv = "*", idSes = "*", datModif = "*",}
	const enum GReportInfoDtoTypes { isAktivni = "boolean", outputInfo = "Gordic.Report.Interface.GReportOutputInfoDto", graficka = "boolean", ixsStr = "string", ixsXme = "string", formVyst = "string", typVyst = "string", nazev = "string", typAlv = "string", tema = "string", alv = "ObjectLiteral<string>", commonInfos = "ObjectLiteral<string>", isOdlozitelne = "boolean", ixsAlv = "string", idSes = "string", datModif = "string",}
	const enum GReportInfoDtoTypeLengths {}
}
