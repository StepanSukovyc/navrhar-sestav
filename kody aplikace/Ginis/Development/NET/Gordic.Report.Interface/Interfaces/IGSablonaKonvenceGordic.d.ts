declare namespace Gordic.Isl.Catalog {
	/**Šablony konvence Gordic z databáze
	* @businessObject SablonaKonvenceGordic
	*/
	interface SablonaKonvenceGordic {
		/**Načtení šablony včetně obsahu (byte Array)*/
		read(rq?:Gordic.Report.Interface.GSablonaKonvenceGordicDto|CallParams<GServiceReadRequest<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>): _Task<GServiceReadRequest<Gordic.Report.Interface.GSablonaKonvenceGordicDto>,GServiceReadResponse<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>;
		/**Načtení informací o šabloně (bez načtení obsahu šablony)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SablonaKonvenceGordic: ServiceBase & Catalog.SablonaKonvenceGordic;
	}
	const SablonaKonvenceGordic: Client["SablonaKonvenceGordic"];
}
declare namespace Gordic.Report.Interface {
	const enum GSablonaKonvenceGordicEnum {
		/**Cesta k souboru*/
		cesta,
		/**Samotný soubor*/
		soubor,
		/**Příznak spisu*/
		priz_spis,
	}
	const enum GTemplatesControlTypeEnum {
		/**Dokument*/
		Dokument=0,
		/**Spis*/
		Spis=1,
		/**Dolozka*/
		Dolozka=2,
	}
}
