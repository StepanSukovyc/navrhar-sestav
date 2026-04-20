declare namespace Gordic.Report.Interface {
	/**DBTABLE:ginssag*/
	interface GSablonaKonvenceGordicDto {
		/**Název souboru (včetně prefixu)*/
		soubor?: string|null;
		/**Cesta*/
		cesta?: string|null;
		/**Popis
		*       Popis souboru
		*/
		popis?: string|null;
		/**Kopie
		*       Uložený soubor v db jako blob
		*/
		kopie?: JsonBlob|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		prefix?: string|null;
		priz_spis?: number|null;
		/**Ičo*/
		ico?: string|null;
	}
	const enum GSablonaKonvenceGordicDtoNames { soubor = "soubor", cesta = "cesta", popis = "popis", kopie = "kopie", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prefix = "prefix", priz_spis = "priz_spis", ico = "ico",}
	const enum GSablonaKonvenceGordicDtoFragments { soubor = "*", cesta = "*", popis = "*", kopie = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prefix = "*", priz_spis = "*", ico = "*",}
	const enum GSablonaKonvenceGordicDtoTypes { soubor = "string", cesta = "string", popis = "string", kopie = "JsonBlob", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prefix = "string", priz_spis = "number", ico = "string",}
	const enum GSablonaKonvenceGordicDtoTypeLengths { soubor = 100, cesta = 100, popis = 254, zmenu_prov = 12, prefix = 20,}
}
