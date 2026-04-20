/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ssl.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gordic.Ssl.WebClient.csproj
*    created     2026-02-16 14:33:52
*    files       Gin\Ssl\Detail\DetailBuilderComponents\Dto\GComponentsDto.d.ts
*                Gin\Ssl\Detail\DetailBuilderComponents\Dto\GSsllMinimalDetailDto.d.ts
*                Gin\Ssl\Detail\DetailBuilderComponents\Dto\GSslProfilBaseComponentDto.d.ts
*                Gin\Ssl\Detail\Dto\GSpitkonDto.d.ts
*                Gin\Ssl\Detail\Dto\NprmDto.d.ts
*                Gin\Ssl\Detail\NovyDokument\Dto\VyberDenikuSpzDto.d.ts
*                Gin\Ssl\Detail\NovyDokument\Dto\VytvSpisBezInicPisDto.d.ts
*                Gin\Ssl\Detail\Preview\Dto\GSslDetailDokumentuPreviewDto.d.ts
*                Gin\Ssl\Detail\Vyrizeni\GVyrizeniAjaxContent.d.ts
*                Gin\Ssl\Detail\Vyrizeni\GVyrizeniBase.d.ts
*                Gin\Ssl\Detail\Vyrizeni\GVyrizeniDokument.d.ts
*                Gin\Ssl\Detail\Vyrizeni\GVyrizeniSpis.d.ts
*                Gin\Ssl\Dto\GruzneDto.d.ts
*                Gin\Ssl\Dto\GVecneSkupinyTaskActionSettingsDto.d.ts
*                Gin\Ssl\Dto\SouhrnCountsDto.d.ts
*                Gin\Ssl\Dto\SouhrnDto.d.ts
*                Gin\Ssl\HromadnyImportDoSSL\Dto\GSslHromadnyImportItemDto.d.ts
*                Gin\Ssl\Lists\Base\dto\SelectedRowInfoDto.d.ts
*                Gin\Ssl\Lists\Base\dto\SubjektSelectedInfo.d.ts
*                Gin\Ssl\Others\Eklep\GinEklepRole.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\Dto\GComponentsDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Dto for Linked Docs Component*/
	interface GSslProfilDokumentComponentDto {
		/**ixp*/
		ixp?: string|null;
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**PorZast*/
		PorZast?: number|null;
		/**PorZast*/
		LicZast?: string|null;
		/**PorZast*/
		EsuText?: string|null;
		/**PorZast*/
		ZOText?: string|null;
		/**RezimPodani*/
		RezimPodani?: Gordic.Wfl.Interface.RezimPodaniEnum|null;
		/**InicDok*/
		InicDok?: string|null;
		/**InicDokEnable*/
		InicDokEnable?: boolean|null;
		/**Spisový plán*/
		SpisPl?: string|null;
		/**Spisový znak*/
		SpisZnak?: string|null;
		/**Věcná skupina*/
		IxsVsk?: string|null;
		/**PrizCj*/
		PrizCj?: number|null;
		/**Počet listů*/
		PocListu?: string|null;
		/**počet stran*/
		PocStran?: number|null;
		/**počet příloh*/
		PocPriloh?: number|null;
		/**PocKopii písemnosti v ssl (tlačítko kopie)*/
		PocKopii?: number|null;
		/**Počet listů příloh*/
		PocListuPriloh?: string|null;
		/**g_spis_pl*/
		g_spis_pl?: string|null;
		/**ssl_dok_zprac*/
		ssl_dok_zprac?: number|null;
		/**gin_n23_vecsk*/
		gin_n23_vecsk?: number|null;
		/**usu_povin_odes*/
		usu_povin_odes?: number|null;
		/**VecPodrobneMaxLength*/
		VecPodrobneMaxLength?: number|null;
		/**Místo vzniku dokumentu*/
		MistoVzniku?: string|null;
		/**?*/
		SPrij?: number|null;
		/**Zda patří mezi spřátelené agendy spisovky  - p_agen*/
		PratelskaAgendaWfl?: boolean|null;
		/**Věc*/
		ObsahText?: string|null;
		/**Poznámka*/
		Poznamka?: string|null;
		/**Umisteni dokumentu*/
		Umisteni?: string|null;
		/**Identifikace funkce řešitele*/
		IxsFunResitel?: string|null;
		/**Aktuální vlastník (funkce) dokumentu*/
		IxsFunAkt?: string|null;
		/**Funkce agendového vlastníka*/
		IxsFunWfl?: string|null;
		/**Title///*/
		Title?: string|null;
		/**EditMode*/
		EditMode?: boolean|null;
		/**Datum Nabiti pravni moci*/
		DatPrMoc?: JsonDate|null;
		/**Vykonavatelnost*/
		DatVykonav?: JsonDate|null;
		/**Datum Nabiti pravni moci*/
		DatPrMocVisible?: boolean|null;
		/**Datum Nabiti pravni moci*/
		DatVykonavVisible?: boolean|null;
		/**VyrizenoLabel*/
		VyrizenoLabel?: string|null;
		/**UlozeniButton*/
		ccc?: string|null;
		/**DatEvidovanoLabel*/
		DatEvidovanoLabel?: string|null;
		/**DatPodano*/
		DatPodano?: JsonDate|null;
		/**DatEvidovano*/
		DatEvidovano?: JsonDate|null;
		/**DatVyrizeno*/
		DatVyrizeno?: JsonDate|null;
		/**DatPredpUzav*/
		DatPredpUzav?: JsonDate|null;
		/**UlozeniButton*/
		UlozeniButton?: boolean|null;
		/**UlozeniButton*/
		UlozeniField?: boolean|null;
		/**UlozeniButton*/
		UlozeniHodnota?: string|null;
		/**UlozeniButton*/
		UlozeniLabel?: string|null;
		/**TerminDate*/
		TerminDate?: JsonDate|null;
		/**TerminDuvod*/
		TerminDuvod?: string|null;
		/**TypSpis*/
		TypSpis?: Gordic.Ginis.DbModel.GWflctysEnum|null;
		/**SplnitTerminVisible*/
		SplnitTerminVisible?: boolean|null;
		/**SplnitTerminEnabled*/
		SplnitTerminEnabled?: boolean|null;
		/**AddTerminEnabled*/
		AddTerminEnabled?: boolean|null;
		/**StavTermin*/
		StavTermin?: number|null;
		/**UsingDilciTermin*/
		UsingDilciTermin?: boolean|null;
		/**BaseEnabledDto*/
		BaseEnabledDto?: Gordic.Ssl.WebClient.GSslProfilEnabledBaseComponentDto|null;
		/**UlozeniButton*/
		IxsZup?: string|null;
		IxsSuAkt?: string|null;
		/**Datum poslední změny*/
		DatZmena?: JsonDate|null;
		/**SSDSpisZnakVisible*/
		SSDSpisZnakVisible?: boolean|null;
		/**SSDVlastnikVisible*/
		SSDVlastnikVisible?: boolean|null;
		/**LzeKlicovaSlova*/
		LzeKlicovaSlova?: boolean|null;
		/**PorCisloObd*/
		PorCisloObd?: number|null;
		/**PorCisloVSpisu*/
		PorCisloVSpisu?: number|null;
		/**gin_n23_vedd*/
		gin_n23_vedd?: number|null;
		/**ZpusobVyrizeni*/
		IsSSLVyrizeni?: boolean|null;
		/**ZpusobVyrizeni*/
		IsSkartaceMet2023?: boolean|null;
		/**Příznak konfliktu skartace*/
		PrizKonfliktSka?: number|null;
		/**ZpusobVyrizeni*/
		ZpracovatelVisible?: boolean|null;
		/**DatVyrDoVisible*/
		DatVyrDoDisabled?: boolean|null;
		/**Editable*/
		Editable?: boolean|null;
		/**Editable*/
		LzeVyriditCj?: boolean|null;
		/**DuvodPozSkar*/
		PrizPozSkar?: number|null;
		/**RokDoPozSkar*/
		RokDoPozSkar?: number|null;
		/**DatVyrizDoOrig*/
		DatVyrizDoOrig?: JsonDate|null;
		/**LhutaTypDok*/
		LhutaTypDok?: number|null;
		/**ZpusobVyrizeni*/
		ZpusobVyrizeni?: string|null;
		/**ZpusobVyrizeni*/
		DatVyr?: JsonDate|null;
		/**VyrizDok*/
		VyrizDok?: string|null;
		/**VyrizDok*/
		VyrizDokEnable?: boolean|null;
		/**DatVyrDo*/
		DatVyrDo?: JsonDate|null;
		/**DatUzav*/
		DatUzav?: JsonDate|null;
		/**StavPis*/
		StavPis?: Gordic.Ginis.DbModel.GWflcstpEnum|null;
		/**Komentar*/
		Komentar?: string|null;
		/**SpisZnakVyrDok*/
		SpisZnakVyrDok?: number|null;
		/**SpisZnakVyrDok*/
		SSl?: number|null;
		/**Schvalovatel*/
		Schvalovatel?: string|null;
		/**Zpracovatel*/
		Zpracovatel?: string|null;
		/**DuvodZmenyTerminu*/
		DuvodZmenyTerminu?: JsonDate|null;
		/**IxsSkr*/
		IxsSkr?: string|null;
		/**SkartZnak*/
		SkartZnak?: string|null;
		/**PopisSpousteciUdalosti*/
		PopisSpousteciUdalosti?: string|null;
		/**SkartLhuta*/
		SkartLhuta?: number|null;
		/**RokSpUdal*/
		RokSpUdal?: number|null;
		/**RokKonSpu*/
		RokKonSpu?: number|null;
		/**SkartRizeni*/
		SkartRizeni?: number|null;
		/**DatUlozeni*/
		DatUlozeni?: JsonDate|null;
		/**DatSkartace*/
		DatSkartace?: JsonDate|null;
		/**DuvodPozSkar*/
		DuvodPozSkar?: string|null;
		/**IxsFunUzavrel*/
		IxsFunUzavrel?: string|null;
		/**kopie z GDetSslspid	LzeVyriditDokumentSOhledemNaEpk*/
		LzeVyriditDokumentSOhledemNaEpk?: boolean|null;
		/**LzeVyriditDokumentSOhledemNaEpkDotaz*/
		LzeVyriditDokumentSOhledemNaEpkDotaz?: boolean|null;
		/**S Fyz pto pětipolíčko*/
		SFyz?: number|null;
		/**RemoveVyrizDok*/
		RemoveVyrizDokEnabled?: boolean|null;
		/**TlacitkoBalikVisible*/
		TlacitkoBalikVisible?: boolean|null;
		/**FieldUlozVisible*/
		FieldUlozVisible?: boolean|null;
		/**FieldUlozVisible*/
		FieldUlozDatumVisible?: boolean|null;
		/**FieldUloz*/
		FieldUloz?: string|null;
		/**FieldUloz*/
		FieldUlozDatum?: JsonDate|null;
		/**FieldUloz*/
		FieldUlozLabel?: string|null;
		/**usu_povin_odes*/
		PocetPrilohPisemnosti?: number|null;
		/**ssl_kon_poc_pri*/
		ssl_kon_poc_pri?: number|null;
		/**ssl_kon_poc_pri*/
		ssl_povin_spzn?: number|null;
		/**ssl_kon_poc_pri*/
		JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno?: boolean|null;
		/**LzeEditovatPozastaveniSkartacniOperace*/
		LzeEditovatPozastaveniSkartacniOperace?: boolean|null;
		/**LzeEditovatSpousteciUdalostAPopis*/
		LzeEditovatSpousteciUdalostAPopis?: boolean|null;
		/**LzeEditovatUmisteni*/
		LzeEditovatUmisteni?: boolean|null;
		/**ssl_zmeterspidu*/
		ssl_zmeterspidu?: number|null;
		/**SSChval*/
		SSChval?: number|null;
		/**Aktuální vlastník (funkce) dokumentu*/
		IxsSu?: string|null;
		/**LzeOperativneUlozit*/
		LzeOperativneUlozit?: boolean|null;
		/**UlozenoListuDok*/
		UlozenoListuDok?: number|null;
		/**UlozenoNlPriloh*/
		UlozenoNlPriloh?: string|null;
		/**UlozenoNlPrilohAUlozenoListuDokVisible*/
		UlozenoNlPrilohAUlozenoListuDokVisible?: boolean|null;
		/**IdExtArch*/
		IdExtArch?: string|null;
		/**IxpTss*/
		IxpTss?: string|null;
		/**IxpTssVisible*/
		IxpTssVisible?: boolean|null;
		/**PrizPozSkarRokDoPozSkarVisible*/
		PrizPozSkarRokDoPozSkarVisible?: boolean|null;
		/**DuvodPozSkarVisible*/
		DuvodPozSkarVisible?: boolean|null;
		/**DatVyrizenoVisible*/
		DatVyrizenoVisible?: boolean|null;
		/**InicDokVisible*/
		InicDokVisible?: boolean|null;
		/**VyrizDokVisible*/
		VyrizDokVisible?: boolean|null;
		/**KomentarVisible*/
		KomentarVisible?: boolean|null;
		/**ZpusobVyrizeniVisible*/
		ZpusobVyrizeniVisible?: boolean|null;
		/**Datum smazání / zničení.*/
		DatDel?: JsonDate|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GSslProfilDokumentComponentDtoNames { ixp = "ixp", IxsEsu = "IxsEsu", PorZast = "PorZast", LicZast = "LicZast", EsuText = "EsuText", ZOText = "ZOText", RezimPodani = "RezimPodani", InicDok = "InicDok", InicDokEnable = "InicDokEnable", SpisPl = "SpisPl", SpisZnak = "SpisZnak", IxsVsk = "IxsVsk", PrizCj = "PrizCj", PocListu = "PocListu", PocStran = "PocStran", PocPriloh = "PocPriloh", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh", g_spis_pl = "g_spis_pl", ssl_dok_zprac = "ssl_dok_zprac", gin_n23_vecsk = "gin_n23_vecsk", usu_povin_odes = "usu_povin_odes", VecPodrobneMaxLength = "VecPodrobneMaxLength", MistoVzniku = "MistoVzniku", SPrij = "SPrij", PratelskaAgendaWfl = "PratelskaAgendaWfl", ObsahText = "ObsahText", Poznamka = "Poznamka", Umisteni = "Umisteni", IxsFunResitel = "IxsFunResitel", IxsFunAkt = "IxsFunAkt", IxsFunWfl = "IxsFunWfl", Title = "Title", EditMode = "EditMode", DatPrMoc = "DatPrMoc", DatVykonav = "DatVykonav", DatPrMocVisible = "DatPrMocVisible", DatVykonavVisible = "DatVykonavVisible", VyrizenoLabel = "VyrizenoLabel", ccc = "ccc", DatEvidovanoLabel = "DatEvidovanoLabel", DatPodano = "DatPodano", DatEvidovano = "DatEvidovano", DatVyrizeno = "DatVyrizeno", DatPredpUzav = "DatPredpUzav", UlozeniButton = "UlozeniButton", UlozeniField = "UlozeniField", UlozeniHodnota = "UlozeniHodnota", UlozeniLabel = "UlozeniLabel", TerminDate = "TerminDate", TerminDuvod = "TerminDuvod", TypSpis = "TypSpis", SplnitTerminVisible = "SplnitTerminVisible", SplnitTerminEnabled = "SplnitTerminEnabled", AddTerminEnabled = "AddTerminEnabled", StavTermin = "StavTermin", UsingDilciTermin = "UsingDilciTermin", BaseEnabledDto = "BaseEnabledDto", IxsZup = "IxsZup", IxsSuAkt = "IxsSuAkt", DatZmena = "DatZmena", SSDSpisZnakVisible = "SSDSpisZnakVisible", SSDVlastnikVisible = "SSDVlastnikVisible", LzeKlicovaSlova = "LzeKlicovaSlova", PorCisloObd = "PorCisloObd", PorCisloVSpisu = "PorCisloVSpisu", gin_n23_vedd = "gin_n23_vedd", IsSSLVyrizeni = "IsSSLVyrizeni", IsSkartaceMet2023 = "IsSkartaceMet2023", PrizKonfliktSka = "PrizKonfliktSka", ZpracovatelVisible = "ZpracovatelVisible", DatVyrDoDisabled = "DatVyrDoDisabled", Editable = "Editable", LzeVyriditCj = "LzeVyriditCj", PrizPozSkar = "PrizPozSkar", RokDoPozSkar = "RokDoPozSkar", DatVyrizDoOrig = "DatVyrizDoOrig", LhutaTypDok = "LhutaTypDok", ZpusobVyrizeni = "ZpusobVyrizeni", DatVyr = "DatVyr", VyrizDok = "VyrizDok", VyrizDokEnable = "VyrizDokEnable", DatVyrDo = "DatVyrDo", DatUzav = "DatUzav", StavPis = "StavPis", Komentar = "Komentar", SpisZnakVyrDok = "SpisZnakVyrDok", SSl = "SSl", Schvalovatel = "Schvalovatel", Zpracovatel = "Zpracovatel", DuvodZmenyTerminu = "DuvodZmenyTerminu", IxsSkr = "IxsSkr", SkartZnak = "SkartZnak", PopisSpousteciUdalosti = "PopisSpousteciUdalosti", SkartLhuta = "SkartLhuta", RokSpUdal = "RokSpUdal", RokKonSpu = "RokKonSpu", SkartRizeni = "SkartRizeni", DatUlozeni = "DatUlozeni", DatSkartace = "DatSkartace", DuvodPozSkar = "DuvodPozSkar", IxsFunUzavrel = "IxsFunUzavrel", LzeVyriditDokumentSOhledemNaEpk = "LzeVyriditDokumentSOhledemNaEpk", LzeVyriditDokumentSOhledemNaEpkDotaz = "LzeVyriditDokumentSOhledemNaEpkDotaz", SFyz = "SFyz", RemoveVyrizDokEnabled = "RemoveVyrizDokEnabled", TlacitkoBalikVisible = "TlacitkoBalikVisible", FieldUlozVisible = "FieldUlozVisible", FieldUlozDatumVisible = "FieldUlozDatumVisible", FieldUloz = "FieldUloz", FieldUlozDatum = "FieldUlozDatum", FieldUlozLabel = "FieldUlozLabel", PocetPrilohPisemnosti = "PocetPrilohPisemnosti", ssl_kon_poc_pri = "ssl_kon_poc_pri", ssl_povin_spzn = "ssl_povin_spzn", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno", LzeEditovatPozastaveniSkartacniOperace = "LzeEditovatPozastaveniSkartacniOperace", LzeEditovatSpousteciUdalostAPopis = "LzeEditovatSpousteciUdalostAPopis", LzeEditovatUmisteni = "LzeEditovatUmisteni", ssl_zmeterspidu = "ssl_zmeterspidu", SSChval = "SSChval", IxsSu = "IxsSu", LzeOperativneUlozit = "LzeOperativneUlozit", UlozenoListuDok = "UlozenoListuDok", UlozenoNlPriloh = "UlozenoNlPriloh", UlozenoNlPrilohAUlozenoListuDokVisible = "UlozenoNlPrilohAUlozenoListuDokVisible", IdExtArch = "IdExtArch", IxpTss = "IxpTss", IxpTssVisible = "IxpTssVisible", PrizPozSkarRokDoPozSkarVisible = "PrizPozSkarRokDoPozSkarVisible", DuvodPozSkarVisible = "DuvodPozSkarVisible", DatVyrizenoVisible = "DatVyrizenoVisible", InicDokVisible = "InicDokVisible", VyrizDokVisible = "VyrizDokVisible", KomentarVisible = "KomentarVisible", ZpusobVyrizeniVisible = "ZpusobVyrizeniVisible", DatDel = "DatDel", Validators = "Validators",}
	const enum GSslProfilDokumentComponentDtoFragments { ixp = "*", IxsEsu = "*", PorZast = "*", LicZast = "*", EsuText = "*", ZOText = "*", RezimPodani = "*", InicDok = "*", InicDokEnable = "*", SpisPl = "*", SpisZnak = "*", IxsVsk = "*", PrizCj = "*", PocListu = "*", PocStran = "*", PocPriloh = "*", PocKopii = "*", PocListuPriloh = "*", g_spis_pl = "*", ssl_dok_zprac = "*", gin_n23_vecsk = "*", usu_povin_odes = "*", VecPodrobneMaxLength = "*", MistoVzniku = "*", SPrij = "*", PratelskaAgendaWfl = "*", ObsahText = "*", Poznamka = "*", Umisteni = "*", IxsFunResitel = "*", IxsFunAkt = "*", IxsFunWfl = "*", Title = "*", EditMode = "*", DatPrMoc = "*", DatVykonav = "*", DatPrMocVisible = "*", DatVykonavVisible = "*", VyrizenoLabel = "*", ccc = "*", DatEvidovanoLabel = "*", DatPodano = "*", DatEvidovano = "*", DatVyrizeno = "*", DatPredpUzav = "*", UlozeniButton = "*", UlozeniField = "*", UlozeniHodnota = "*", UlozeniLabel = "*", TerminDate = "*", TerminDuvod = "*", TypSpis = "*", SplnitTerminVisible = "*", SplnitTerminEnabled = "*", AddTerminEnabled = "*", StavTermin = "*", UsingDilciTermin = "*", BaseEnabledDto = "*", IxsZup = "*", IxsSuAkt = "*", DatZmena = "*", SSDSpisZnakVisible = "*", SSDVlastnikVisible = "*", LzeKlicovaSlova = "*", PorCisloObd = "*", PorCisloVSpisu = "*", gin_n23_vedd = "*", IsSSLVyrizeni = "*", IsSkartaceMet2023 = "*", PrizKonfliktSka = "*", ZpracovatelVisible = "*", DatVyrDoDisabled = "*", Editable = "*", LzeVyriditCj = "*", PrizPozSkar = "*", RokDoPozSkar = "*", DatVyrizDoOrig = "*", LhutaTypDok = "*", ZpusobVyrizeni = "*", DatVyr = "*", VyrizDok = "*", VyrizDokEnable = "*", DatVyrDo = "*", DatUzav = "*", StavPis = "*", Komentar = "*", SpisZnakVyrDok = "*", SSl = "*", Schvalovatel = "*", Zpracovatel = "*", DuvodZmenyTerminu = "*", IxsSkr = "*", SkartZnak = "*", PopisSpousteciUdalosti = "*", SkartLhuta = "*", RokSpUdal = "*", RokKonSpu = "*", SkartRizeni = "*", DatUlozeni = "*", DatSkartace = "*", DuvodPozSkar = "*", IxsFunUzavrel = "*", LzeVyriditDokumentSOhledemNaEpk = "*", LzeVyriditDokumentSOhledemNaEpkDotaz = "*", SFyz = "*", RemoveVyrizDokEnabled = "*", TlacitkoBalikVisible = "*", FieldUlozVisible = "*", FieldUlozDatumVisible = "*", FieldUloz = "*", FieldUlozDatum = "*", FieldUlozLabel = "*", PocetPrilohPisemnosti = "*", ssl_kon_poc_pri = "*", ssl_povin_spzn = "*", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "*", LzeEditovatPozastaveniSkartacniOperace = "*", LzeEditovatSpousteciUdalostAPopis = "*", LzeEditovatUmisteni = "*", ssl_zmeterspidu = "*", SSChval = "*", IxsSu = "*", LzeOperativneUlozit = "*", UlozenoListuDok = "*", UlozenoNlPriloh = "*", UlozenoNlPrilohAUlozenoListuDokVisible = "*", IdExtArch = "*", IxpTss = "*", IxpTssVisible = "*", PrizPozSkarRokDoPozSkarVisible = "*", DuvodPozSkarVisible = "*", DatVyrizenoVisible = "*", InicDokVisible = "*", VyrizDokVisible = "*", KomentarVisible = "*", ZpusobVyrizeniVisible = "*", DatDel = "*", Validators = "*",}
	const enum GSslProfilDokumentComponentDtoTypes { ixp = "string", IxsEsu = "string", PorZast = "number", LicZast = "string", EsuText = "string", ZOText = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", InicDok = "string", InicDokEnable = "boolean", SpisPl = "string", SpisZnak = "string", IxsVsk = "string", PrizCj = "number", PocListu = "string", PocStran = "number", PocPriloh = "number", PocKopii = "number", PocListuPriloh = "string", g_spis_pl = "string", ssl_dok_zprac = "number", gin_n23_vecsk = "number", usu_povin_odes = "number", VecPodrobneMaxLength = "number", MistoVzniku = "string", SPrij = "number", PratelskaAgendaWfl = "boolean", ObsahText = "string", Poznamka = "string", Umisteni = "string", IxsFunResitel = "string", IxsFunAkt = "string", IxsFunWfl = "string", Title = "string", EditMode = "boolean", DatPrMoc = "JsonDate", DatVykonav = "JsonDate", DatPrMocVisible = "boolean", DatVykonavVisible = "boolean", VyrizenoLabel = "string", ccc = "string", DatEvidovanoLabel = "string", DatPodano = "JsonDate", DatEvidovano = "JsonDate", DatVyrizeno = "JsonDate", DatPredpUzav = "JsonDate", UlozeniButton = "boolean", UlozeniField = "boolean", UlozeniHodnota = "string", UlozeniLabel = "string", TerminDate = "JsonDate", TerminDuvod = "string", TypSpis = "Gordic.Ginis.DbModel.GWflctysEnum", SplnitTerminVisible = "boolean", SplnitTerminEnabled = "boolean", AddTerminEnabled = "boolean", StavTermin = "number", UsingDilciTermin = "boolean", BaseEnabledDto = "Gordic.Ssl.WebClient.GSslProfilEnabledBaseComponentDto", IxsZup = "string", IxsSuAkt = "string", DatZmena = "JsonDate", SSDSpisZnakVisible = "boolean", SSDVlastnikVisible = "boolean", LzeKlicovaSlova = "boolean", PorCisloObd = "number", PorCisloVSpisu = "number", gin_n23_vedd = "number", IsSSLVyrizeni = "boolean", IsSkartaceMet2023 = "boolean", PrizKonfliktSka = "number", ZpracovatelVisible = "boolean", DatVyrDoDisabled = "boolean", Editable = "boolean", LzeVyriditCj = "boolean", PrizPozSkar = "number", RokDoPozSkar = "number", DatVyrizDoOrig = "JsonDate", LhutaTypDok = "number", ZpusobVyrizeni = "string", DatVyr = "JsonDate", VyrizDok = "string", VyrizDokEnable = "boolean", DatVyrDo = "JsonDate", DatUzav = "JsonDate", StavPis = "Gordic.Ginis.DbModel.GWflcstpEnum", Komentar = "string", SpisZnakVyrDok = "number", SSl = "number", Schvalovatel = "string", Zpracovatel = "string", DuvodZmenyTerminu = "JsonDate", IxsSkr = "string", SkartZnak = "string", PopisSpousteciUdalosti = "string", SkartLhuta = "number", RokSpUdal = "number", RokKonSpu = "number", SkartRizeni = "number", DatUlozeni = "JsonDate", DatSkartace = "JsonDate", DuvodPozSkar = "string", IxsFunUzavrel = "string", LzeVyriditDokumentSOhledemNaEpk = "boolean", LzeVyriditDokumentSOhledemNaEpkDotaz = "boolean", SFyz = "number", RemoveVyrizDokEnabled = "boolean", TlacitkoBalikVisible = "boolean", FieldUlozVisible = "boolean", FieldUlozDatumVisible = "boolean", FieldUloz = "string", FieldUlozDatum = "JsonDate", FieldUlozLabel = "string", PocetPrilohPisemnosti = "number", ssl_kon_poc_pri = "number", ssl_povin_spzn = "number", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "boolean", LzeEditovatPozastaveniSkartacniOperace = "boolean", LzeEditovatSpousteciUdalostAPopis = "boolean", LzeEditovatUmisteni = "boolean", ssl_zmeterspidu = "number", SSChval = "number", IxsSu = "string", LzeOperativneUlozit = "boolean", UlozenoListuDok = "number", UlozenoNlPriloh = "string", UlozenoNlPrilohAUlozenoListuDokVisible = "boolean", IdExtArch = "string", IxpTss = "string", IxpTssVisible = "boolean", PrizPozSkarRokDoPozSkarVisible = "boolean", DuvodPozSkarVisible = "boolean", DatVyrizenoVisible = "boolean", InicDokVisible = "boolean", VyrizDokVisible = "boolean", KomentarVisible = "boolean", ZpusobVyrizeniVisible = "boolean", DatDel = "JsonDate", Validators = "object",}
	const enum GSslProfilDokumentComponentDtoTypeLengths { PocListu = 4, Poznamka = 254,}
	/**Dto for Linked Docs Component*/
	interface GSslProfilComponentInputDto extends Gordic.Ssl.WebClient.GSsllMinimalDetailDto {
		/**GDetSslspid*/
		DetailDokumentu?: any|null;
		/**PredplneniDatProPodani*/
		PredplneniDatProPodani?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GSslProfilComponentInputDtoNames { DetailDokumentu = "DetailDokumentu", PredplneniDatProPodani = "PredplneniDatProPodani", ixp = "ixp", RezimPodani = "RezimPodani", EditMode = "EditMode", VzoryArray = "VzoryArray", SimpleMode = "SimpleMode", InicDok = "InicDok", GSslKpiComponent_DisableFlashJinaAgenda = "GSslKpiComponent_DisableFlashJinaAgenda", NovePodani = "NovePodani", WflspidDto = "WflspidDto", SslspidDto = "SslspidDto", SpisDto = "SpisDto", DokumentDto = "DokumentDto", ZakazatPodaniSSLComponent = "ZakazatPodaniSSLComponent",}
	const enum GSslProfilComponentInputDtoFragments { DetailDokumentu = "*", PredplneniDatProPodani = "*", ixp = "*", RezimPodani = "*", EditMode = "*", VzoryArray = "*", SimpleMode = "*", InicDok = "*", GSslKpiComponent_DisableFlashJinaAgenda = "*", NovePodani = "*", WflspidDto = "*", SslspidDto = "*", SpisDto = "*", DokumentDto = "*", ZakazatPodaniSSLComponent = "*",}
	const enum GSslProfilComponentInputDtoTypes { DetailDokumentu = "any", PredplneniDatProPodani = "Gordic.Ssl.Interface.GDokumentDto", ixp = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", EditMode = "boolean", VzoryArray = "string[]", SimpleMode = "boolean", InicDok = "string", GSslKpiComponent_DisableFlashJinaAgenda = "boolean", NovePodani = "boolean", WflspidDto = "Gordic.Wfl.Interface.GWflspidDto", SslspidDto = "Gordic.Ssl.Interface.GSslspidDto", SpisDto = "Gordic.Ssl.Interface.GSpisDto", DokumentDto = "Gordic.Ssl.Interface.GDokumentDto", ZakazatPodaniSSLComponent = "boolean",}
	const enum GSslProfilComponentInputDtoTypeLengths {}
	/**Dto for Linked Docs Component*/
	interface GSslProfilDokumentComponentEkoDto extends Gordic.Ssl.WebClient.GSslProfilDokumentComponentDto {
		/**Stupeň utajení z sslstyp (typy dokumentů) nebo z sslspidu (profil SSL)*/
		StUtajIdWfl?: number|null;
		/**Typ písemnosti*/
		IxsTyp?: string|null;
		/**LzeEditovatDatumPodaniPriPodani*/
		LzeEditovatDatumPodaniPriPodani?: boolean|null;
		/**LzeEditovatDatumPodani*/
		LzeEditovatDatumPodani?: boolean|null;
		/**JeButtonUPRstupuViditelny*/
		JeButtonUPRstupuViditelny?: boolean|null;
		/**Logovací objekt pro políčko odesilatel*/
		Logovani?: Gordic.Esu.Interface.GLogovani|null;
		/**Nazev*/
		Nazev?: string|null;
		/**Agenda*/
		Agenda?: string|null;
		/**SpZn*/
		SpZn?: string|null;
		/**SpZn*/
		SpZnLabel?: string|null;
		/**CjLabel*/
		CjLabel?: string|null;
		/**CjLabel*/
		ZnackaLabel?: string|null;
		/**Cj*/
		Cj?: string|null;
		/**SpZnHasDetailButton*/
		SpZnHasDetailButton?: boolean|null;
		/**Cj*/
		IxpSpisWfl?: string|null;
		/**PrizVBaliku*/
		PrizVBaliku?: number|null;
		/**S ele pto pětipolíčko*/
		SEle?: number|null;
		/**IxpSpisPrir*/
		IxpSpisPrir?: string|null;
		/**PrizSpis*/
		PrizSpis?: Gordic.Ginis.DbModel.GWflcpriEnum|null;
		/**validatory*/
		readonly Validators?: object|null;
		/**TypInst*/
		TypInst?: number|null;
		/**CjExtVisible*/
		CjExtVisible?: boolean|null;
		/**CjZnVisible*/
		CjZnVisible?: boolean|null;
		/**AgendaVisible*/
		AgendaVisible?: boolean|null;
		/**ExtIdVisible*/
		ExtIdVisible?: boolean|null;
		/**číslo jednací Ext*/
		CjExt?: string|null;
		/**CjZn*/
		CjZn?: string|null;
		/**CjZn*/
		PorSpis?: number|null;
		/**CjZn*/
		ExtId?: string|null;
		/**ZnackaLabelText*/
		ZnackaLabelText?: string|null;
		/**CjZnLabelText*/
		CjZnLabelText?: string|null;
		/**CjZn*/
		AktZnacka?: string|null;
		/**TypAg*/
		TypAg?: number|null;
		/**ssl_edit_znacka*/
		ssl_edit_znacka?: string|null;
		/**LzeEditovatDatumPodani*/
		IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup?: boolean|null;
		/**Permission*/
		Permission?: Gordic.Ssl.Interface.GSslspidPermissionsDto|null;
		/**Je něco na detailu editovatelné ?*/
		IsSomethingEditable?: boolean|null;
		/**IxpSpisVlozenoNeboPriorovano*/
		IxpSpisVlozenoNeboPriorovano?: string|null;
	}
	const enum GSslProfilDokumentComponentEkoDtoNames { StUtajIdWfl = "StUtajIdWfl", IxsTyp = "IxsTyp", LzeEditovatDatumPodaniPriPodani = "LzeEditovatDatumPodaniPriPodani", LzeEditovatDatumPodani = "LzeEditovatDatumPodani", JeButtonUPRstupuViditelny = "JeButtonUPRstupuViditelny", Logovani = "Logovani", Nazev = "Nazev", Agenda = "Agenda", SpZn = "SpZn", SpZnLabel = "SpZnLabel", CjLabel = "CjLabel", ZnackaLabel = "ZnackaLabel", Cj = "Cj", SpZnHasDetailButton = "SpZnHasDetailButton", IxpSpisWfl = "IxpSpisWfl", PrizVBaliku = "PrizVBaliku", SEle = "SEle", IxpSpisPrir = "IxpSpisPrir", PrizSpis = "PrizSpis", Validators = "Validators", TypInst = "TypInst", CjExtVisible = "CjExtVisible", CjZnVisible = "CjZnVisible", AgendaVisible = "AgendaVisible", ExtIdVisible = "ExtIdVisible", CjExt = "CjExt", CjZn = "CjZn", PorSpis = "PorSpis", ExtId = "ExtId", ZnackaLabelText = "ZnackaLabelText", CjZnLabelText = "CjZnLabelText", AktZnacka = "AktZnacka", TypAg = "TypAg", ssl_edit_znacka = "ssl_edit_znacka", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup", Permission = "Permission", IsSomethingEditable = "IsSomethingEditable", IxpSpisVlozenoNeboPriorovano = "IxpSpisVlozenoNeboPriorovano", ixp = "ixp", IxsEsu = "IxsEsu", PorZast = "PorZast", LicZast = "LicZast", EsuText = "EsuText", ZOText = "ZOText", RezimPodani = "RezimPodani", InicDok = "InicDok", InicDokEnable = "InicDokEnable", SpisPl = "SpisPl", SpisZnak = "SpisZnak", IxsVsk = "IxsVsk", PrizCj = "PrizCj", PocListu = "PocListu", PocStran = "PocStran", PocPriloh = "PocPriloh", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh", g_spis_pl = "g_spis_pl", ssl_dok_zprac = "ssl_dok_zprac", gin_n23_vecsk = "gin_n23_vecsk", usu_povin_odes = "usu_povin_odes", VecPodrobneMaxLength = "VecPodrobneMaxLength", MistoVzniku = "MistoVzniku", SPrij = "SPrij", PratelskaAgendaWfl = "PratelskaAgendaWfl", ObsahText = "ObsahText", Poznamka = "Poznamka", Umisteni = "Umisteni", IxsFunResitel = "IxsFunResitel", IxsFunAkt = "IxsFunAkt", IxsFunWfl = "IxsFunWfl", Title = "Title", EditMode = "EditMode", DatPrMoc = "DatPrMoc", DatVykonav = "DatVykonav", DatPrMocVisible = "DatPrMocVisible", DatVykonavVisible = "DatVykonavVisible", VyrizenoLabel = "VyrizenoLabel", ccc = "ccc", DatEvidovanoLabel = "DatEvidovanoLabel", DatPodano = "DatPodano", DatEvidovano = "DatEvidovano", DatVyrizeno = "DatVyrizeno", DatPredpUzav = "DatPredpUzav", UlozeniButton = "UlozeniButton", UlozeniField = "UlozeniField", UlozeniHodnota = "UlozeniHodnota", UlozeniLabel = "UlozeniLabel", TerminDate = "TerminDate", TerminDuvod = "TerminDuvod", TypSpis = "TypSpis", SplnitTerminVisible = "SplnitTerminVisible", SplnitTerminEnabled = "SplnitTerminEnabled", AddTerminEnabled = "AddTerminEnabled", StavTermin = "StavTermin", UsingDilciTermin = "UsingDilciTermin", BaseEnabledDto = "BaseEnabledDto", IxsZup = "IxsZup", IxsSuAkt = "IxsSuAkt", DatZmena = "DatZmena", SSDSpisZnakVisible = "SSDSpisZnakVisible", SSDVlastnikVisible = "SSDVlastnikVisible", LzeKlicovaSlova = "LzeKlicovaSlova", PorCisloObd = "PorCisloObd", PorCisloVSpisu = "PorCisloVSpisu", gin_n23_vedd = "gin_n23_vedd", IsSSLVyrizeni = "IsSSLVyrizeni", IsSkartaceMet2023 = "IsSkartaceMet2023", PrizKonfliktSka = "PrizKonfliktSka", ZpracovatelVisible = "ZpracovatelVisible", DatVyrDoDisabled = "DatVyrDoDisabled", Editable = "Editable", LzeVyriditCj = "LzeVyriditCj", PrizPozSkar = "PrizPozSkar", RokDoPozSkar = "RokDoPozSkar", DatVyrizDoOrig = "DatVyrizDoOrig", LhutaTypDok = "LhutaTypDok", ZpusobVyrizeni = "ZpusobVyrizeni", DatVyr = "DatVyr", VyrizDok = "VyrizDok", VyrizDokEnable = "VyrizDokEnable", DatVyrDo = "DatVyrDo", DatUzav = "DatUzav", StavPis = "StavPis", Komentar = "Komentar", SpisZnakVyrDok = "SpisZnakVyrDok", SSl = "SSl", Schvalovatel = "Schvalovatel", Zpracovatel = "Zpracovatel", DuvodZmenyTerminu = "DuvodZmenyTerminu", IxsSkr = "IxsSkr", SkartZnak = "SkartZnak", PopisSpousteciUdalosti = "PopisSpousteciUdalosti", SkartLhuta = "SkartLhuta", RokSpUdal = "RokSpUdal", RokKonSpu = "RokKonSpu", SkartRizeni = "SkartRizeni", DatUlozeni = "DatUlozeni", DatSkartace = "DatSkartace", DuvodPozSkar = "DuvodPozSkar", IxsFunUzavrel = "IxsFunUzavrel", LzeVyriditDokumentSOhledemNaEpk = "LzeVyriditDokumentSOhledemNaEpk", LzeVyriditDokumentSOhledemNaEpkDotaz = "LzeVyriditDokumentSOhledemNaEpkDotaz", SFyz = "SFyz", RemoveVyrizDokEnabled = "RemoveVyrizDokEnabled", TlacitkoBalikVisible = "TlacitkoBalikVisible", FieldUlozVisible = "FieldUlozVisible", FieldUlozDatumVisible = "FieldUlozDatumVisible", FieldUloz = "FieldUloz", FieldUlozDatum = "FieldUlozDatum", FieldUlozLabel = "FieldUlozLabel", PocetPrilohPisemnosti = "PocetPrilohPisemnosti", ssl_kon_poc_pri = "ssl_kon_poc_pri", ssl_povin_spzn = "ssl_povin_spzn", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno", LzeEditovatPozastaveniSkartacniOperace = "LzeEditovatPozastaveniSkartacniOperace", LzeEditovatSpousteciUdalostAPopis = "LzeEditovatSpousteciUdalostAPopis", LzeEditovatUmisteni = "LzeEditovatUmisteni", ssl_zmeterspidu = "ssl_zmeterspidu", SSChval = "SSChval", IxsSu = "IxsSu", LzeOperativneUlozit = "LzeOperativneUlozit", UlozenoListuDok = "UlozenoListuDok", UlozenoNlPriloh = "UlozenoNlPriloh", UlozenoNlPrilohAUlozenoListuDokVisible = "UlozenoNlPrilohAUlozenoListuDokVisible", IdExtArch = "IdExtArch", IxpTss = "IxpTss", IxpTssVisible = "IxpTssVisible", PrizPozSkarRokDoPozSkarVisible = "PrizPozSkarRokDoPozSkarVisible", DuvodPozSkarVisible = "DuvodPozSkarVisible", DatVyrizenoVisible = "DatVyrizenoVisible", InicDokVisible = "InicDokVisible", VyrizDokVisible = "VyrizDokVisible", KomentarVisible = "KomentarVisible", ZpusobVyrizeniVisible = "ZpusobVyrizeniVisible", DatDel = "DatDel",}
	const enum GSslProfilDokumentComponentEkoDtoFragments { StUtajIdWfl = "*", IxsTyp = "*", LzeEditovatDatumPodaniPriPodani = "*", LzeEditovatDatumPodani = "*", JeButtonUPRstupuViditelny = "*", Logovani = "*", Nazev = "*", Agenda = "*", SpZn = "*", SpZnLabel = "*", CjLabel = "*", ZnackaLabel = "*", Cj = "*", SpZnHasDetailButton = "*", IxpSpisWfl = "*", PrizVBaliku = "*", SEle = "*", IxpSpisPrir = "*", PrizSpis = "*", Validators = "*", TypInst = "*", CjExtVisible = "*", CjZnVisible = "*", AgendaVisible = "*", ExtIdVisible = "*", CjExt = "*", CjZn = "*", PorSpis = "*", ExtId = "*", ZnackaLabelText = "*", CjZnLabelText = "*", AktZnacka = "*", TypAg = "*", ssl_edit_znacka = "*", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "*", Permission = "*", IsSomethingEditable = "*", IxpSpisVlozenoNeboPriorovano = "*", ixp = "*", IxsEsu = "*", PorZast = "*", LicZast = "*", EsuText = "*", ZOText = "*", RezimPodani = "*", InicDok = "*", InicDokEnable = "*", SpisPl = "*", SpisZnak = "*", IxsVsk = "*", PrizCj = "*", PocListu = "*", PocStran = "*", PocPriloh = "*", PocKopii = "*", PocListuPriloh = "*", g_spis_pl = "*", ssl_dok_zprac = "*", gin_n23_vecsk = "*", usu_povin_odes = "*", VecPodrobneMaxLength = "*", MistoVzniku = "*", SPrij = "*", PratelskaAgendaWfl = "*", ObsahText = "*", Poznamka = "*", Umisteni = "*", IxsFunResitel = "*", IxsFunAkt = "*", IxsFunWfl = "*", Title = "*", EditMode = "*", DatPrMoc = "*", DatVykonav = "*", DatPrMocVisible = "*", DatVykonavVisible = "*", VyrizenoLabel = "*", ccc = "*", DatEvidovanoLabel = "*", DatPodano = "*", DatEvidovano = "*", DatVyrizeno = "*", DatPredpUzav = "*", UlozeniButton = "*", UlozeniField = "*", UlozeniHodnota = "*", UlozeniLabel = "*", TerminDate = "*", TerminDuvod = "*", TypSpis = "*", SplnitTerminVisible = "*", SplnitTerminEnabled = "*", AddTerminEnabled = "*", StavTermin = "*", UsingDilciTermin = "*", BaseEnabledDto = "*", IxsZup = "*", IxsSuAkt = "*", DatZmena = "*", SSDSpisZnakVisible = "*", SSDVlastnikVisible = "*", LzeKlicovaSlova = "*", PorCisloObd = "*", PorCisloVSpisu = "*", gin_n23_vedd = "*", IsSSLVyrizeni = "*", IsSkartaceMet2023 = "*", PrizKonfliktSka = "*", ZpracovatelVisible = "*", DatVyrDoDisabled = "*", Editable = "*", LzeVyriditCj = "*", PrizPozSkar = "*", RokDoPozSkar = "*", DatVyrizDoOrig = "*", LhutaTypDok = "*", ZpusobVyrizeni = "*", DatVyr = "*", VyrizDok = "*", VyrizDokEnable = "*", DatVyrDo = "*", DatUzav = "*", StavPis = "*", Komentar = "*", SpisZnakVyrDok = "*", SSl = "*", Schvalovatel = "*", Zpracovatel = "*", DuvodZmenyTerminu = "*", IxsSkr = "*", SkartZnak = "*", PopisSpousteciUdalosti = "*", SkartLhuta = "*", RokSpUdal = "*", RokKonSpu = "*", SkartRizeni = "*", DatUlozeni = "*", DatSkartace = "*", DuvodPozSkar = "*", IxsFunUzavrel = "*", LzeVyriditDokumentSOhledemNaEpk = "*", LzeVyriditDokumentSOhledemNaEpkDotaz = "*", SFyz = "*", RemoveVyrizDokEnabled = "*", TlacitkoBalikVisible = "*", FieldUlozVisible = "*", FieldUlozDatumVisible = "*", FieldUloz = "*", FieldUlozDatum = "*", FieldUlozLabel = "*", PocetPrilohPisemnosti = "*", ssl_kon_poc_pri = "*", ssl_povin_spzn = "*", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "*", LzeEditovatPozastaveniSkartacniOperace = "*", LzeEditovatSpousteciUdalostAPopis = "*", LzeEditovatUmisteni = "*", ssl_zmeterspidu = "*", SSChval = "*", IxsSu = "*", LzeOperativneUlozit = "*", UlozenoListuDok = "*", UlozenoNlPriloh = "*", UlozenoNlPrilohAUlozenoListuDokVisible = "*", IdExtArch = "*", IxpTss = "*", IxpTssVisible = "*", PrizPozSkarRokDoPozSkarVisible = "*", DuvodPozSkarVisible = "*", DatVyrizenoVisible = "*", InicDokVisible = "*", VyrizDokVisible = "*", KomentarVisible = "*", ZpusobVyrizeniVisible = "*", DatDel = "*",}
	const enum GSslProfilDokumentComponentEkoDtoTypes { StUtajIdWfl = "number", IxsTyp = "string", LzeEditovatDatumPodaniPriPodani = "boolean", LzeEditovatDatumPodani = "boolean", JeButtonUPRstupuViditelny = "boolean", Logovani = "Gordic.Esu.Interface.GLogovani", Nazev = "string", Agenda = "string", SpZn = "string", SpZnLabel = "string", CjLabel = "string", ZnackaLabel = "string", Cj = "string", SpZnHasDetailButton = "boolean", IxpSpisWfl = "string", PrizVBaliku = "number", SEle = "number", IxpSpisPrir = "string", PrizSpis = "Gordic.Ginis.DbModel.GWflcpriEnum", Validators = "object", TypInst = "number", CjExtVisible = "boolean", CjZnVisible = "boolean", AgendaVisible = "boolean", ExtIdVisible = "boolean", CjExt = "string", CjZn = "string", PorSpis = "number", ExtId = "string", ZnackaLabelText = "string", CjZnLabelText = "string", AktZnacka = "string", TypAg = "number", ssl_edit_znacka = "string", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "boolean", Permission = "Gordic.Ssl.Interface.GSslspidPermissionsDto", IsSomethingEditable = "boolean", IxpSpisVlozenoNeboPriorovano = "string", ixp = "string", IxsEsu = "string", PorZast = "number", LicZast = "string", EsuText = "string", ZOText = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", InicDok = "string", InicDokEnable = "boolean", SpisPl = "string", SpisZnak = "string", IxsVsk = "string", PrizCj = "number", PocListu = "string", PocStran = "number", PocPriloh = "number", PocKopii = "number", PocListuPriloh = "string", g_spis_pl = "string", ssl_dok_zprac = "number", gin_n23_vecsk = "number", usu_povin_odes = "number", VecPodrobneMaxLength = "number", MistoVzniku = "string", SPrij = "number", PratelskaAgendaWfl = "boolean", ObsahText = "string", Poznamka = "string", Umisteni = "string", IxsFunResitel = "string", IxsFunAkt = "string", IxsFunWfl = "string", Title = "string", EditMode = "boolean", DatPrMoc = "JsonDate", DatVykonav = "JsonDate", DatPrMocVisible = "boolean", DatVykonavVisible = "boolean", VyrizenoLabel = "string", ccc = "string", DatEvidovanoLabel = "string", DatPodano = "JsonDate", DatEvidovano = "JsonDate", DatVyrizeno = "JsonDate", DatPredpUzav = "JsonDate", UlozeniButton = "boolean", UlozeniField = "boolean", UlozeniHodnota = "string", UlozeniLabel = "string", TerminDate = "JsonDate", TerminDuvod = "string", TypSpis = "Gordic.Ginis.DbModel.GWflctysEnum", SplnitTerminVisible = "boolean", SplnitTerminEnabled = "boolean", AddTerminEnabled = "boolean", StavTermin = "number", UsingDilciTermin = "boolean", BaseEnabledDto = "Gordic.Ssl.WebClient.GSslProfilEnabledBaseComponentDto", IxsZup = "string", IxsSuAkt = "string", DatZmena = "JsonDate", SSDSpisZnakVisible = "boolean", SSDVlastnikVisible = "boolean", LzeKlicovaSlova = "boolean", PorCisloObd = "number", PorCisloVSpisu = "number", gin_n23_vedd = "number", IsSSLVyrizeni = "boolean", IsSkartaceMet2023 = "boolean", PrizKonfliktSka = "number", ZpracovatelVisible = "boolean", DatVyrDoDisabled = "boolean", Editable = "boolean", LzeVyriditCj = "boolean", PrizPozSkar = "number", RokDoPozSkar = "number", DatVyrizDoOrig = "JsonDate", LhutaTypDok = "number", ZpusobVyrizeni = "string", DatVyr = "JsonDate", VyrizDok = "string", VyrizDokEnable = "boolean", DatVyrDo = "JsonDate", DatUzav = "JsonDate", StavPis = "Gordic.Ginis.DbModel.GWflcstpEnum", Komentar = "string", SpisZnakVyrDok = "number", SSl = "number", Schvalovatel = "string", Zpracovatel = "string", DuvodZmenyTerminu = "JsonDate", IxsSkr = "string", SkartZnak = "string", PopisSpousteciUdalosti = "string", SkartLhuta = "number", RokSpUdal = "number", RokKonSpu = "number", SkartRizeni = "number", DatUlozeni = "JsonDate", DatSkartace = "JsonDate", DuvodPozSkar = "string", IxsFunUzavrel = "string", LzeVyriditDokumentSOhledemNaEpk = "boolean", LzeVyriditDokumentSOhledemNaEpkDotaz = "boolean", SFyz = "number", RemoveVyrizDokEnabled = "boolean", TlacitkoBalikVisible = "boolean", FieldUlozVisible = "boolean", FieldUlozDatumVisible = "boolean", FieldUloz = "string", FieldUlozDatum = "JsonDate", FieldUlozLabel = "string", PocetPrilohPisemnosti = "number", ssl_kon_poc_pri = "number", ssl_povin_spzn = "number", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "boolean", LzeEditovatPozastaveniSkartacniOperace = "boolean", LzeEditovatSpousteciUdalostAPopis = "boolean", LzeEditovatUmisteni = "boolean", ssl_zmeterspidu = "number", SSChval = "number", IxsSu = "string", LzeOperativneUlozit = "boolean", UlozenoListuDok = "number", UlozenoNlPriloh = "string", UlozenoNlPrilohAUlozenoListuDokVisible = "boolean", IdExtArch = "string", IxpTss = "string", IxpTssVisible = "boolean", PrizPozSkarRokDoPozSkarVisible = "boolean", DuvodPozSkarVisible = "boolean", DatVyrizenoVisible = "boolean", InicDokVisible = "boolean", VyrizDokVisible = "boolean", KomentarVisible = "boolean", ZpusobVyrizeniVisible = "boolean", DatDel = "JsonDate",}
	const enum GSslProfilDokumentComponentEkoDtoTypeLengths { Nazev = 100, CjExt = 10, PocListu = 4, Poznamka = 254,}
	/**Dto for Linked Docs Component*/
	interface GSslProfilComponentInputEkoDto extends Gordic.Ssl.WebClient.GSslProfilComponentInputDto {
		/**Logovací objekt pro políčko odesilatel*/
		Logovani?: Gordic.Esu.Interface.GLogovani|null;
	}
	const enum GSslProfilComponentInputEkoDtoNames { Logovani = "Logovani", DetailDokumentu = "DetailDokumentu", PredplneniDatProPodani = "PredplneniDatProPodani", ixp = "ixp", RezimPodani = "RezimPodani", EditMode = "EditMode", VzoryArray = "VzoryArray", SimpleMode = "SimpleMode", InicDok = "InicDok", GSslKpiComponent_DisableFlashJinaAgenda = "GSslKpiComponent_DisableFlashJinaAgenda", NovePodani = "NovePodani", WflspidDto = "WflspidDto", SslspidDto = "SslspidDto", SpisDto = "SpisDto", DokumentDto = "DokumentDto", ZakazatPodaniSSLComponent = "ZakazatPodaniSSLComponent",}
	const enum GSslProfilComponentInputEkoDtoFragments { Logovani = "*", DetailDokumentu = "*", PredplneniDatProPodani = "*", ixp = "*", RezimPodani = "*", EditMode = "*", VzoryArray = "*", SimpleMode = "*", InicDok = "*", GSslKpiComponent_DisableFlashJinaAgenda = "*", NovePodani = "*", WflspidDto = "*", SslspidDto = "*", SpisDto = "*", DokumentDto = "*", ZakazatPodaniSSLComponent = "*",}
	const enum GSslProfilComponentInputEkoDtoTypes { Logovani = "Gordic.Esu.Interface.GLogovani", DetailDokumentu = "any", PredplneniDatProPodani = "Gordic.Ssl.Interface.GDokumentDto", ixp = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", EditMode = "boolean", VzoryArray = "string[]", SimpleMode = "boolean", InicDok = "string", GSslKpiComponent_DisableFlashJinaAgenda = "boolean", NovePodani = "boolean", WflspidDto = "Gordic.Wfl.Interface.GWflspidDto", SslspidDto = "Gordic.Ssl.Interface.GSslspidDto", SpisDto = "Gordic.Ssl.Interface.GSpisDto", DokumentDto = "Gordic.Ssl.Interface.GDokumentDto", ZakazatPodaniSSLComponent = "boolean",}
	const enum GSslProfilComponentInputEkoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\Dto\GSsllMinimalDetailDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**IDto pro ssl komponenty*/
	interface GSsllMinimalDetailDto {
		/**Gets or sets the ixp.*/
		ixp?: string|null;
		/**Rezim Podani*/
		RezimPodani?: Gordic.Wfl.Interface.RezimPodaniEnum|null;
		/**EditMode*/
		EditMode?: boolean|null;
		/**The vzory array - pole pidu co se použijí jako vzory*/
		VzoryArray?: string[]|null;
		/**SimpleMode*/
		SimpleMode?: boolean|null;
		/**InicDok*/
		InicDok?: string|null;
		/**Nepovinné - zakáže zobrazení flashe s informací z jiné agendy*/
		GSslKpiComponent_DisableFlashJinaAgenda?: boolean|null;
		/**Indikace zda jde o nové podání, v tomto případě nebudou prováděny všechny načítací procedůry*/
		NovePodani?: boolean|null;
		/**Datová objekt musí být naplněný jeden z těchto čtyř WflspidDto, SslspidDto,SpisDto,DokumentDto*/
		WflspidDto?: Gordic.Wfl.Interface.GWflspidDto|null;
		/**Datová objekt musí být naplněný jeden z těchto čtyř WflspidDto, SslspidDto,SpisDto,DokumentDto*/
		SslspidDto?: Gordic.Ssl.Interface.GSslspidDto|null;
		/**Datová objekt musí být naplněný jeden z těchto čtyř WflspidDto, SslspidDto,SpisDto,DokumentDto*/
		SpisDto?: Gordic.Ssl.Interface.GSpisDto|null;
		/**Datová objekt musí být naplněný jeden z těchto čtyř WflspidDto, SslspidDto,SpisDto,DokumentDto*/
		DokumentDto?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**ZakazatPodaniSSLComponent*/
		ZakazatPodaniSSLComponent?: boolean|null;
	}
	const enum GSsllMinimalDetailDtoNames { ixp = "ixp", RezimPodani = "RezimPodani", EditMode = "EditMode", VzoryArray = "VzoryArray", SimpleMode = "SimpleMode", InicDok = "InicDok", GSslKpiComponent_DisableFlashJinaAgenda = "GSslKpiComponent_DisableFlashJinaAgenda", NovePodani = "NovePodani", WflspidDto = "WflspidDto", SslspidDto = "SslspidDto", SpisDto = "SpisDto", DokumentDto = "DokumentDto", ZakazatPodaniSSLComponent = "ZakazatPodaniSSLComponent",}
	const enum GSsllMinimalDetailDtoFragments { ixp = "*", RezimPodani = "*", EditMode = "*", VzoryArray = "*", SimpleMode = "*", InicDok = "*", GSslKpiComponent_DisableFlashJinaAgenda = "*", NovePodani = "*", WflspidDto = "*", SslspidDto = "*", SpisDto = "*", DokumentDto = "*", ZakazatPodaniSSLComponent = "*",}
	const enum GSsllMinimalDetailDtoTypes { ixp = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", EditMode = "boolean", VzoryArray = "string[]", SimpleMode = "boolean", InicDok = "string", GSslKpiComponent_DisableFlashJinaAgenda = "boolean", NovePodani = "boolean", WflspidDto = "Gordic.Wfl.Interface.GWflspidDto", SslspidDto = "Gordic.Ssl.Interface.GSslspidDto", SpisDto = "Gordic.Ssl.Interface.GSpisDto", DokumentDto = "Gordic.Ssl.Interface.GDokumentDto", ZakazatPodaniSSLComponent = "boolean",}
	const enum GSsllMinimalDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\Dto\GSslProfilBaseComponentDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Dto for Linked Docs Component*/
	interface GSslProfilBaseComponentDto {
		/**ixp*/
		ixp?: string|null;
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**PorZast*/
		PorZast?: number|null;
		/**PorZast*/
		LicZast?: string|null;
		/**PorZast*/
		ZOText?: string|null;
		/**RezimPodani*/
		RezimPodani?: Gordic.Wfl.Interface.RezimPodaniEnum|null;
		/**InicDok*/
		InicDok?: string|null;
		/**Spisový plán*/
		SpisPl?: string|null;
		/**Spisový znak*/
		SpisZnak?: string|null;
		/**Věcná skupina*/
		IxsVsk?: string|null;
		/**PrizCj*/
		PrizCj?: number|null;
		/**Počet listů*/
		PocListu?: string|null;
		/**počet stran*/
		PocStran?: number|null;
		/**počet příloh*/
		PocPriloh?: number|null;
		/**PocKopii písemnosti v ssl (tlačítko kopie)*/
		PocKopii?: number|null;
		/**Počet listů příloh*/
		PocListuPriloh?: string|null;
		/**g_spis_pl*/
		g_spis_pl?: string|null;
		/**ssl_dok_zprac*/
		ssl_dok_zprac?: number|null;
		/**gin_n23_vecsk*/
		gin_n23_vecsk?: number|null;
		/**VecPodrobneMaxLength*/
		VecPodrobneMaxLength?: number|null;
		/**Místo vzniku dokumentu*/
		MistoVzniku?: string|null;
		/**?*/
		SPrij?: number|null;
		/**Zda patří mezi spřátelené agendy spisovky  - p_agen*/
		PratelskaAgendaWfl?: boolean|null;
		/**Věc*/
		ObsahText?: string|null;
		/**Poznámka*/
		Poznamka?: string|null;
		/**Umisteni dokumentu*/
		Umisteni?: string|null;
		/**Identifikace funkce řešitele*/
		IxsFunResitel?: string|null;
		/**Aktuální vlastník (funkce) dokumentu*/
		IxsFunAkt?: string|null;
		/**Aktuální vlastník (funkce) dokumentu*/
		IxsSu?: string|null;
		/**Title*/
		Title?: string|null;
		/**EditMode*/
		EditMode?: boolean|null;
		/**BaseEnabledDto*/
		BaseEnabledDto?: Gordic.Ssl.WebClient.GSslProfilEnabledBaseComponentDto|null;
		/**Datum poslední změny*/
		DatZmena?: JsonDate|null;
		/**SSChval*/
		SSChval?: number|null;
		/**SSl*/
		SSl?: number|null;
		/**TypSpis*/
		TypSpis?: Gordic.Ginis.DbModel.GWflctysEnum|null;
		/**IdExtArch*/
		IdExtArch?: string|null;
	}
	const enum GSslProfilBaseComponentDtoNames { ixp = "ixp", IxsEsu = "IxsEsu", PorZast = "PorZast", LicZast = "LicZast", ZOText = "ZOText", RezimPodani = "RezimPodani", InicDok = "InicDok", SpisPl = "SpisPl", SpisZnak = "SpisZnak", IxsVsk = "IxsVsk", PrizCj = "PrizCj", PocListu = "PocListu", PocStran = "PocStran", PocPriloh = "PocPriloh", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh", g_spis_pl = "g_spis_pl", ssl_dok_zprac = "ssl_dok_zprac", gin_n23_vecsk = "gin_n23_vecsk", VecPodrobneMaxLength = "VecPodrobneMaxLength", MistoVzniku = "MistoVzniku", SPrij = "SPrij", PratelskaAgendaWfl = "PratelskaAgendaWfl", ObsahText = "ObsahText", Poznamka = "Poznamka", Umisteni = "Umisteni", IxsFunResitel = "IxsFunResitel", IxsFunAkt = "IxsFunAkt", IxsSu = "IxsSu", Title = "Title", EditMode = "EditMode", BaseEnabledDto = "BaseEnabledDto", DatZmena = "DatZmena", SSChval = "SSChval", SSl = "SSl", TypSpis = "TypSpis", IdExtArch = "IdExtArch",}
	const enum GSslProfilBaseComponentDtoFragments { ixp = "*", IxsEsu = "*", PorZast = "*", LicZast = "*", ZOText = "*", RezimPodani = "*", InicDok = "*", SpisPl = "*", SpisZnak = "*", IxsVsk = "*", PrizCj = "*", PocListu = "*", PocStran = "*", PocPriloh = "*", PocKopii = "*", PocListuPriloh = "*", g_spis_pl = "*", ssl_dok_zprac = "*", gin_n23_vecsk = "*", VecPodrobneMaxLength = "*", MistoVzniku = "*", SPrij = "*", PratelskaAgendaWfl = "*", ObsahText = "*", Poznamka = "*", Umisteni = "*", IxsFunResitel = "*", IxsFunAkt = "*", IxsSu = "*", Title = "*", EditMode = "*", BaseEnabledDto = "*", DatZmena = "*", SSChval = "*", SSl = "*", TypSpis = "*", IdExtArch = "*",}
	const enum GSslProfilBaseComponentDtoTypes { ixp = "string", IxsEsu = "string", PorZast = "number", LicZast = "string", ZOText = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum", InicDok = "string", SpisPl = "string", SpisZnak = "string", IxsVsk = "string", PrizCj = "number", PocListu = "string", PocStran = "number", PocPriloh = "number", PocKopii = "number", PocListuPriloh = "string", g_spis_pl = "string", ssl_dok_zprac = "number", gin_n23_vecsk = "number", VecPodrobneMaxLength = "number", MistoVzniku = "string", SPrij = "number", PratelskaAgendaWfl = "boolean", ObsahText = "string", Poznamka = "string", Umisteni = "string", IxsFunResitel = "string", IxsFunAkt = "string", IxsSu = "string", Title = "string", EditMode = "boolean", BaseEnabledDto = "Gordic.Ssl.WebClient.GSslProfilEnabledBaseComponentDto", DatZmena = "JsonDate", SSChval = "number", SSl = "number", TypSpis = "Gordic.Ginis.DbModel.GWflctysEnum", IdExtArch = "string",}
	const enum GSslProfilBaseComponentDtoTypeLengths {}
	/**Dto for Linked Docs Component*/
	interface GSslProfilEnabledBaseComponentDto {
		/**StupUtajRO*/
		StupUtajRO?: boolean|null;
		/**TypPisRO*/
		TypPisRO?: boolean|null;
		/**SUFuncRefZpracovatelSURO*/
		SUFuncRefZpracovatelSURO?: boolean|null;
		/**SUFuncRefZpracovatelFunkceRO*/
		SUFuncRefZpracovatelFunkceRO?: boolean|null;
		/**SUFuncRefVlastnikSURO*/
		SUFuncRefVlastnikSURO?: boolean|null;
		/**SUFuncRefVlastnikFunkceRO*/
		SUFuncRefVlastnikFunkceRO?: boolean|null;
		/**VecPodrobneRO*/
		VecPodrobneRO?: boolean|null;
		/**PoznamkaRO*/
		PoznamkaRO?: boolean|null;
		/**PoctyListuAllElementsRO*/
		PoctyListuAllElementsRO?: boolean|null;
		/**SpisZnakRO*/
		SpisZnakRO?: boolean|null;
		/**SpisZnakRO*/
		SpisZnakROEKO?: boolean|null;
		/**SpisPlanRO*/
		SpisPlanRO?: boolean|null;
		/**VecnaSkupinaRO*/
		VecnaSkupinaRO?: boolean|null;
		/**UmisteniRO*/
		UmisteniRO?: boolean|null;
		/**OdesilatelRO*/
		OdesilatelRO?: boolean|null;
		/**OdesilatelFlagPredplneniOdesilatele*/
		OdesilatelFlagPredplneniOdesilatele?: boolean|null;
		/**DatPodanoRO*/
		DatPodanoRO?: boolean|null;
		/**KeywordsRO*/
		KeywordsRO?: boolean|null;
		/**IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup*/
		IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup?: boolean|null;
		/**IRPUzivatelMaIRPNesmiZrusitRizenyPristup*/
		IRPUzivatelMaIRPNesmiZrusitRizenyPristup?: boolean|null;
		/**PozastaveniSkartacniOperace*/
		PozastaveniSkartacniOperace?: boolean|null;
		/**LzeEditovatSpousteciUdalostAPopis*/
		LzeEditovatSpousteciUdalostAPopis?: boolean|null;
		/**CjRO*/
		CjRO?: boolean|null;
	}
	const enum GSslProfilEnabledBaseComponentDtoNames { StupUtajRO = "StupUtajRO", TypPisRO = "TypPisRO", SUFuncRefZpracovatelSURO = "SUFuncRefZpracovatelSURO", SUFuncRefZpracovatelFunkceRO = "SUFuncRefZpracovatelFunkceRO", SUFuncRefVlastnikSURO = "SUFuncRefVlastnikSURO", SUFuncRefVlastnikFunkceRO = "SUFuncRefVlastnikFunkceRO", VecPodrobneRO = "VecPodrobneRO", PoznamkaRO = "PoznamkaRO", PoctyListuAllElementsRO = "PoctyListuAllElementsRO", SpisZnakRO = "SpisZnakRO", SpisZnakROEKO = "SpisZnakROEKO", SpisPlanRO = "SpisPlanRO", VecnaSkupinaRO = "VecnaSkupinaRO", UmisteniRO = "UmisteniRO", OdesilatelRO = "OdesilatelRO", OdesilatelFlagPredplneniOdesilatele = "OdesilatelFlagPredplneniOdesilatele", DatPodanoRO = "DatPodanoRO", KeywordsRO = "KeywordsRO", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup", IRPUzivatelMaIRPNesmiZrusitRizenyPristup = "IRPUzivatelMaIRPNesmiZrusitRizenyPristup", PozastaveniSkartacniOperace = "PozastaveniSkartacniOperace", LzeEditovatSpousteciUdalostAPopis = "LzeEditovatSpousteciUdalostAPopis", CjRO = "CjRO",}
	const enum GSslProfilEnabledBaseComponentDtoFragments { StupUtajRO = "*", TypPisRO = "*", SUFuncRefZpracovatelSURO = "*", SUFuncRefZpracovatelFunkceRO = "*", SUFuncRefVlastnikSURO = "*", SUFuncRefVlastnikFunkceRO = "*", VecPodrobneRO = "*", PoznamkaRO = "*", PoctyListuAllElementsRO = "*", SpisZnakRO = "*", SpisZnakROEKO = "*", SpisPlanRO = "*", VecnaSkupinaRO = "*", UmisteniRO = "*", OdesilatelRO = "*", OdesilatelFlagPredplneniOdesilatele = "*", DatPodanoRO = "*", KeywordsRO = "*", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "*", IRPUzivatelMaIRPNesmiZrusitRizenyPristup = "*", PozastaveniSkartacniOperace = "*", LzeEditovatSpousteciUdalostAPopis = "*", CjRO = "*",}
	const enum GSslProfilEnabledBaseComponentDtoTypes { StupUtajRO = "boolean", TypPisRO = "boolean", SUFuncRefZpracovatelSURO = "boolean", SUFuncRefZpracovatelFunkceRO = "boolean", SUFuncRefVlastnikSURO = "boolean", SUFuncRefVlastnikFunkceRO = "boolean", VecPodrobneRO = "boolean", PoznamkaRO = "boolean", PoctyListuAllElementsRO = "boolean", SpisZnakRO = "boolean", SpisZnakROEKO = "boolean", SpisPlanRO = "boolean", VecnaSkupinaRO = "boolean", UmisteniRO = "boolean", OdesilatelRO = "boolean", OdesilatelFlagPredplneniOdesilatele = "boolean", DatPodanoRO = "boolean", KeywordsRO = "boolean", IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup = "boolean", IRPUzivatelMaIRPNesmiZrusitRizenyPristup = "boolean", PozastaveniSkartacniOperace = "boolean", LzeEditovatSpousteciUdalostAPopis = "boolean", CjRO = "boolean",}
	const enum GSslProfilEnabledBaseComponentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Dto\GSpitkonDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Ssl dokument Dto GDetSslspid*/
	interface GSpitkonDto {
		/**Autogenerated.*/
		ixs_puv?: string|null;
		/**Autogenerated.*/
		ixs_zup?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixp_dok?: string|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		ixs_ulo?: string|null;
		/**Autogenerated.*/
		priz_obj_puv?: number|null;
		/**Autogenerated.*/
		priz_obj?: number|null;
		/**Autogenerated.*/
		s_prij?: number|null;
		/**Autogenerated.*/
		typ_sgn?: number|null;
		/**Autogenerated.*/
		text_chyby?: string|null;
		/**Autogenerated.*/
		cislo_chyby?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		typ_chyb?: number|null;
		/**Autogenerated.*/
		kat_chyb?: number|null;
		/**Autogenerated.*/
		kat_oprav?: number|null;
		/**Autogenerated.*/
		kat_hrom_oprav?: number|null;
		/**Autogenerated.*/
		IDPrimaryKeyGriduGenerated?: string|null;
		/**Autogenerated.*/
		ser_cislo?: number|null;
		/**Autogenerated.*/
		ixb?: string|null;
		/**Autogenerated.*/
		ixb_epod?: string|null;
		/**Autogenerated.*/
		ixs_su_akt?: string|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
		/**Autogenerated.*/
		nazev_su_akt?: string|null;
		/**Autogenerated.*/
		nazev_rf_akt?: string|null;
		/**Autogenerated.*/
		typ_elp?: number|null;
		/**Autogenerated.*/
		ixs_zup_skryte?: boolean|null;
		/**Autogenerated.*/
		ixs_spis_skryte?: boolean|null;
		/**Autogenerated.*/
		umisteni?: string|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		m_err?: string|null;
		/**Autogenerated.*/
		cj_spis?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		ixp_ixb?: string|null;
		/**Autogenerated.*/
		info_ikon_add?: number|null;
		/**Autogenerated.*/
		typ_entity_ico?: number|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
	}
	const enum GSpitkonDtoNames { ixs_puv = "ixs_puv", ixs_zup = "ixs_zup", ixp_spis = "ixp_spis", ixp_dok = "ixp_dok", ixp = "ixp", ixs_ulo = "ixs_ulo", priz_obj_puv = "priz_obj_puv", priz_obj = "priz_obj", s_prij = "s_prij", typ_sgn = "typ_sgn", text_chyby = "text_chyby", cislo_chyby = "cislo_chyby", popis = "popis", typ_chyb = "typ_chyb", kat_chyb = "kat_chyb", kat_oprav = "kat_oprav", kat_hrom_oprav = "kat_hrom_oprav", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", ser_cislo = "ser_cislo", ixb = "ixb", ixb_epod = "ixb_epod", ixs_su_akt = "ixs_su_akt", ixs_fun_akt = "ixs_fun_akt", nazev_su_akt = "nazev_su_akt", nazev_rf_akt = "nazev_rf_akt", typ_elp = "typ_elp", ixs_zup_skryte = "ixs_zup_skryte", ixs_spis_skryte = "ixs_spis_skryte", umisteni = "umisteni", m_vyber = "m_vyber", m_err = "m_err", cj_spis = "cj_spis", akt_znacka = "akt_znacka", ixp_ixb = "ixp_ixb", info_ikon_add = "info_ikon_add", typ_entity_ico = "typ_entity_ico", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", stav_pis = "stav_pis",}
	const enum GSpitkonDtoFragments { ixs_puv = "*", ixs_zup = "*", ixp_spis = "*", ixp_dok = "*", ixp = "*", ixs_ulo = "*", priz_obj_puv = "*", priz_obj = "*", s_prij = "*", typ_sgn = "*", text_chyby = "*", cislo_chyby = "*", popis = "*", typ_chyb = "*", kat_chyb = "*", kat_oprav = "*", kat_hrom_oprav = "*", IDPrimaryKeyGriduGenerated = "*", ser_cislo = "*", ixb = "*", ixb_epod = "*", ixs_su_akt = "*", ixs_fun_akt = "*", nazev_su_akt = "*", nazev_rf_akt = "*", typ_elp = "*", ixs_zup_skryte = "*", ixs_spis_skryte = "*", umisteni = "*", m_vyber = "*", m_err = "*", cj_spis = "*", akt_znacka = "*", ixp_ixb = "*", info_ikon_add = "*", typ_entity_ico = "*", priz_spis = "*", typ_spis = "*", typ_ag = "*", s_fyz = "*", s_ele = "*", stav_pis = "*",}
	const enum GSpitkonDtoTypes { ixs_puv = "string", ixs_zup = "string", ixp_spis = "string", ixp_dok = "string", ixp = "string", ixs_ulo = "string", priz_obj_puv = "number", priz_obj = "number", s_prij = "number", typ_sgn = "number", text_chyby = "string", cislo_chyby = "number", popis = "string", typ_chyb = "number", kat_chyb = "number", kat_oprav = "number", kat_hrom_oprav = "number", IDPrimaryKeyGriduGenerated = "string", ser_cislo = "number", ixb = "string", ixb_epod = "string", ixs_su_akt = "string", ixs_fun_akt = "string", nazev_su_akt = "string", nazev_rf_akt = "string", typ_elp = "number", ixs_zup_skryte = "boolean", ixs_spis_skryte = "boolean", umisteni = "string", m_vyber = "number", m_err = "string", cj_spis = "string", akt_znacka = "string", ixp_ixb = "string", info_ikon_add = "number", typ_entity_ico = "number", priz_spis = "number", typ_spis = "number", typ_ag = "number", s_fyz = "number", s_ele = "number", stav_pis = "number",}
	const enum GSpitkonDtoTypeLengths { ixs_puv = 12, ixs_zup = 12, ixp_spis = 12, ixp_dok = 12, ixp = 12, ixs_ulo = 12, text_chyby = 254, popis = 254, ixb = 12, ixb_epod = 12, ixs_su_akt = 12, ixs_fun_akt = 12, nazev_su_akt = 25, nazev_rf_akt = 25, umisteni = 100, cj_spis = 50, akt_znacka = 50, ixp_ixb = 24,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Dto\NprmDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**NPRM dto*/
	interface NprmDto {
		/**Autogenerated.*/
		PrMocDate?: JsonDate|null;
		/**Gets or sets the dat vykonav.*/
		DatVykonav?: JsonDate|null;
	}
	const enum NprmDtoNames { PrMocDate = "PrMocDate", DatVykonav = "DatVykonav",}
	const enum NprmDtoFragments { PrMocDate = "*", DatVykonav = "*",}
	const enum NprmDtoTypes { PrMocDate = "JsonDate", DatVykonav = "JsonDate",}
	const enum NprmDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\NovyDokument\Dto\VyberDenikuSpzDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**VyberDenikuSpzDto*/
	interface VyberDenikuSpzDto {
		/**Autogenerated.*/
		Data?: Gordic.Ssl.Interface.SeznamSpisovychDenikuDto[]|null;
		/**Vybraný deník*/
		DenikSelected?: string|null;
	}
	const enum VyberDenikuSpzDtoNames { Data = "Data", DenikSelected = "DenikSelected",}
	const enum VyberDenikuSpzDtoFragments { Data = "*", DenikSelected = "*",}
	const enum VyberDenikuSpzDtoTypes { Data = "Gordic.Ssl.Interface.SeznamSpisovychDenikuDto[]", DenikSelected = "string",}
	const enum VyberDenikuSpzDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\NovyDokument\Dto\VytvSpisBezInicPisDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**dto k VytvSpisBezInicPis*/
	interface VytvSpisBezInicPisDto {
		/**Gets or sets the denik label.*/
		DenikLabel?: string|null;
		/**Gets or sets the label.*/
		Label?: string|null;
		/**Gets or sets the pid.*/
		Pid?: string|null;
		/**Gets or sets the NazevSpisu.*/
		NazevSpis?: string|null;
		/**Gets or sets the gin SSL spznstu.*/
		gin_ssl_spznstu?: number|null;
		/**Gets or sets the SSL maksbinden.*/
		ssl_maksbinden?: number|null;
		/**Gets or sets the denik.*/
		Denik?: string|null;
		/**Gets or sets the denik.*/
		DenikNaStupUtaj?: string|null;
		/**Gets or sets the typ pis.*/
		TypPis?: string|null;
		/**Autogenerated.*/
		SpisPl?: string|null;
		/**Autogenerated.*/
		SpisZnak?: string|null;
		/**Autogenerated.*/
		IxsVsk?: string|null;
		/**Gets or sets the st utaj identifier WFL.*/
		StUtajIdWfl?: number|null;
		/**Gets or sets the rok.*/
		Rok?: number|null;
		/**Gets or sets the poradi.*/
		Poradi?: number|null;
		/**RokPredplnit*/
		RokPredplnit?: string|null;
		/**CJJednaciText pro předplnění*/
		CJJednaciText?: string|null;
		/**GInt16*/
		RezimNakl?: number|null;
		/**Gets or sets the ssl_povin_spzs.*/
		ssl_povin_spzs?: number|null;
		/**Gets or sets the gin_n23_vecsk.*/
		gin_n23_vecsk?: number|null;
	}
	const enum VytvSpisBezInicPisDtoNames { DenikLabel = "DenikLabel", Label = "Label", Pid = "Pid", NazevSpis = "NazevSpis", gin_ssl_spznstu = "gin_ssl_spznstu", ssl_maksbinden = "ssl_maksbinden", Denik = "Denik", DenikNaStupUtaj = "DenikNaStupUtaj", TypPis = "TypPis", SpisPl = "SpisPl", SpisZnak = "SpisZnak", IxsVsk = "IxsVsk", StUtajIdWfl = "StUtajIdWfl", Rok = "Rok", Poradi = "Poradi", RokPredplnit = "RokPredplnit", CJJednaciText = "CJJednaciText", RezimNakl = "RezimNakl", ssl_povin_spzs = "ssl_povin_spzs", gin_n23_vecsk = "gin_n23_vecsk",}
	const enum VytvSpisBezInicPisDtoFragments { DenikLabel = "*", Label = "*", Pid = "*", NazevSpis = "*", gin_ssl_spznstu = "*", ssl_maksbinden = "*", Denik = "*", DenikNaStupUtaj = "*", TypPis = "*", SpisPl = "*", SpisZnak = "*", IxsVsk = "*", StUtajIdWfl = "*", Rok = "*", Poradi = "*", RokPredplnit = "*", CJJednaciText = "*", RezimNakl = "*", ssl_povin_spzs = "*", gin_n23_vecsk = "*",}
	const enum VytvSpisBezInicPisDtoTypes { DenikLabel = "string", Label = "string", Pid = "string", NazevSpis = "string", gin_ssl_spznstu = "number", ssl_maksbinden = "number", Denik = "string", DenikNaStupUtaj = "string", TypPis = "string", SpisPl = "string", SpisZnak = "string", IxsVsk = "string", StUtajIdWfl = "number", Rok = "number", Poradi = "number", RokPredplnit = "string", CJJednaciText = "string", RezimNakl = "number", ssl_povin_spzs = "number", gin_n23_vecsk = "number",}
	const enum VytvSpisBezInicPisDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Preview\Dto\GSslDetailDokumentuPreviewDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Ssl Input Dto pro dokument*/
	interface GSslDetailDokumentuPreviewDto {
		/**Gets or sets the ixs cj.*/
		CjZn?: string|null;
		/**Gets or sets the spis znak.*/
		SpisZnak?: string|null;
		/**Gets or sets the ixs fun akt.*/
		IxsFunAktTxt?: string|null;
		/**Gets or sets the nazev.*/
		Nazev?: string|null;
		/**Gets or sets the ZKR typ spis.*/
		Typ?: string|null;
		/**Gets or sets the misto vzniku.*/
		MistoVzniku?: string|null;
		/**Gets or sets the obsah text.*/
		ObsahText?: string|null;
		/**Gets or sets the spis pl.*/
		SpisPl?: string|null;
		/**Gets or sets the poznamka.*/
		Poznamka?: string|null;
		/**Gets or sets the uziv poznamka.*/
		UzivPoznamka?: string|null;
		/**Gets or sets the umisteni.*/
		Umisteni?: string|null;
		/**Gets or sets the zpracovatel.*/
		NazevResitel?: string|null;
		/**Gets or sets the st utaj text.*/
		StUtajTxt?: string|null;
		/**Gets or sets the dat pod.*/
		DatPod?: JsonDate|null;
		/**Gets or sets the dat vyriz.*/
		DatVyriz?: JsonDate|null;
		/**Gets or sets the dat ulozeno.*/
		Ulozeno?: string|null;
		/**Gets or sets the dat evid.*/
		DatEvid?: JsonDate|null;
		/**Gets or sets the poc kop.*/
		PocKop?: string|null;
		/**Gets or sets the poc listu.*/
		PocListu?: string|null;
		/**Gets or sets the poc listu priloh.*/
		PocListuPriloh?: string|null;
		/**Gets or sets the poc priloh.*/
		PocPriloh?: string|null;
		/**Gets or sets the poc stran.*/
		PocStran?: string|null;
		/**Gets or sets the spis plan.*/
		SpisPlan?: string|null;
		/**ListSbernyArchSpisu*/
		ListSbernyArchSpisu?: Gordic.Ssl.Interface.SeznamSbernyArchSpisuDto[]|null;
		/**Gets or sets the znacka text.*/
		ZnackaText?: string|null;
		/**Gets or sets the znacka text.*/
		CjSpis?: string|null;
		/**Gets or sets the znacka label texts.*/
		ZnackaLabelText?: string|null;
		/**Gets or sets the znacka label texts.*/
		CjZnLabelText?: string|null;
		/**generated*/
		CjZnVisible?: boolean|null;
		/**generated*/
		AktZnacka?: string|null;
		/**generated*/
		CisJednaciLabelText?: string|null;
	}
	const enum GSslDetailDokumentuPreviewDtoNames { CjZn = "CjZn", SpisZnak = "SpisZnak", IxsFunAktTxt = "IxsFunAktTxt", Nazev = "Nazev", Typ = "Typ", MistoVzniku = "MistoVzniku", ObsahText = "ObsahText", SpisPl = "SpisPl", Poznamka = "Poznamka", UzivPoznamka = "UzivPoznamka", Umisteni = "Umisteni", NazevResitel = "NazevResitel", StUtajTxt = "StUtajTxt", DatPod = "DatPod", DatVyriz = "DatVyriz", Ulozeno = "Ulozeno", DatEvid = "DatEvid", PocKop = "PocKop", PocListu = "PocListu", PocListuPriloh = "PocListuPriloh", PocPriloh = "PocPriloh", PocStran = "PocStran", SpisPlan = "SpisPlan", ListSbernyArchSpisu = "ListSbernyArchSpisu", ZnackaText = "ZnackaText", CjSpis = "CjSpis", ZnackaLabelText = "ZnackaLabelText", CjZnLabelText = "CjZnLabelText", CjZnVisible = "CjZnVisible", AktZnacka = "AktZnacka", CisJednaciLabelText = "CisJednaciLabelText",}
	const enum GSslDetailDokumentuPreviewDtoFragments { CjZn = "*", SpisZnak = "*", IxsFunAktTxt = "*", Nazev = "*", Typ = "*", MistoVzniku = "*", ObsahText = "*", SpisPl = "*", Poznamka = "*", UzivPoznamka = "*", Umisteni = "*", NazevResitel = "*", StUtajTxt = "*", DatPod = "*", DatVyriz = "*", Ulozeno = "*", DatEvid = "*", PocKop = "*", PocListu = "*", PocListuPriloh = "*", PocPriloh = "*", PocStran = "*", SpisPlan = "*", ListSbernyArchSpisu = "*", ZnackaText = "*", CjSpis = "*", ZnackaLabelText = "*", CjZnLabelText = "*", CjZnVisible = "*", AktZnacka = "*", CisJednaciLabelText = "*",}
	const enum GSslDetailDokumentuPreviewDtoTypes { CjZn = "string", SpisZnak = "string", IxsFunAktTxt = "string", Nazev = "string", Typ = "string", MistoVzniku = "string", ObsahText = "string", SpisPl = "string", Poznamka = "string", UzivPoznamka = "string", Umisteni = "string", NazevResitel = "string", StUtajTxt = "string", DatPod = "JsonDate", DatVyriz = "JsonDate", Ulozeno = "string", DatEvid = "JsonDate", PocKop = "string", PocListu = "string", PocListuPriloh = "string", PocPriloh = "string", PocStran = "string", SpisPlan = "string", ListSbernyArchSpisu = "Gordic.Ssl.Interface.SeznamSbernyArchSpisuDto[]", ZnackaText = "string", CjSpis = "string", ZnackaLabelText = "string", CjZnLabelText = "string", CjZnVisible = "boolean", AktZnacka = "string", CisJednaciLabelText = "string",}
	const enum GSslDetailDokumentuPreviewDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Vyrizeni\GVyrizeniAjaxContent.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Vyřízení dokumentu/spisu (GAjaxContent)*/
	interface GVyrizeniAjaxContent {

	}
	const enum GVyrizeniAjaxContentNames { UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVyrizeniAjaxContentFragments { UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVyrizeniAjaxContentTypes { UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Vyrizeni\GVyrizeniBase.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Vyřízení dokumentu/spisu (BASE)*/
	interface GVyrizeniBase extends Gordic.Ssl.WebClient.GVyrizeniAjaxContent {
		/**DTO s daty*/
		dto?: Gordic.Wfl.Interface.GVyrizeniDokSpisDto|null;
		/**Dto se stavy políček*/
		dtoEnabled?: Gordic.Wfl.Interface.GVyrizeniDokSpisEnabledDto|null;
		/**property pro nastavení počátečního stavu Spis.Plánu*/
		StavSpisPlan?: Gordic.Wfl.Interface.GVyrizSpZnDto|null;
		/**Zda existuje profil SSL pro tento dokument*/
		readonly SSl?: number|null;
		/**Min. hodnota skartační lhůty
		*     - pokud uživatel nastaví hodnotu např. na 50, tak ani při změně spis. znaku na kterém bude skar_lhuta 25 se hodnota políčka nezmění
		*/
		SkartLhutaMinValue?: number|null;
		/**Identifikátor dokumentu*/
		Ixp?: string|null;
		/**Pole identifikátorů (ixp, datZmena, prizSpis) u hromadného vyřízení*/
		IXPs?: Gordic.Wfl.Interface.SelectedRowInfoDto[]|null;
		/**Rok spouštěcí události (minimální hodnota)*/
		RokSpUdalMinValue?: number|null;
		/**Příznak hromadného vyřízení
		*     -- možná se do budoucna pokusím oddělit hromadné vyřízení (thazmuka)
		*/
		ViceIxp?: boolean|null;
		/**Příznak čísla jednacího*/
		readonly PrizCj?: number|null;
		/**Filtr příznaku čísla jednacího*/
		FilterPrizCjOnly?: number[]|null;
		/**Návratová hodnota*/
		retval?: Gordic.Wfl.Interface.GVyrizeniDokSpisRetvalDto|null;
		/**Povoleno vyřízení či uzavření*/
		PovolenoVyrizeniCiUzavreni?: boolean|null;
		/**SSL - Používat pole uloženo listů, neevidovaných příloh a odesláno listů a nelistinných příloh*/
		readonly ssl_pouulolisd?: boolean|null;
		/**GIN EPK - Schvalovací proces - filtr osob/funkčních míst (dle fází do kterých mají uživatelé přístup)*/
		readonly gin_epk_schfaz: string;
		/**GIN EPK - schvalování vyřízení spisu*/
		readonly gin_epksvyr?: boolean|null;
		/**SSL - Povolení editace spisového znaku u dokumentů vložených ve spisu*/
		readonly ssl_editspzndvs?: boolean|null;
		/**SSL - Používat pole uloženo listů a odesláno u uzavření spisu*/
		readonly ssl_pouulolistu?: number|null;
		/**SSL - ŘP Zpracovatel na dokumentu*/
		readonly ssl_dok_zprac?: number|null;
		/**SSL - kontrola před vyřízením spisu (GRC sestava)*/
		readonly ssl_kon_vysp?: number|null;
		/**SSL - Kopírovat datum vyřízení do data uzavření při vyřizování-uzavírání spisu*/
		readonly ssl_kopdatvyruz?: boolean|null;
		/**SSL - Spouštěcí událost (možnost zadání skartačního znaku a lhůty při uzavření, ... )*/
		readonly ssl_spouud2?: boolean|null;
		/**SSL - Spouštěcí událost - povolení práce  (možnost zadání události při uzavření, ... )*/
		readonly ssl_spouuda?: boolean|null;
		/**GIN - Kontrolovat metadata při uzavření dokumentů/spisů*/
		readonly ssl_vyrkonmet?: number|null;
		/**SSL - Kontrolovat platnost spisového plánu dle datumu vyřízení (při vyřízení dokumentů/spisů)*/
		readonly ssl_vyrkonspzn?: number|null;
	}
	const enum GVyrizeniBaseNames { dto = "dto", dtoEnabled = "dtoEnabled", StavSpisPlan = "StavSpisPlan", SSl = "SSl", SkartLhutaMinValue = "SkartLhutaMinValue", Ixp = "Ixp", IXPs = "IXPs", RokSpUdalMinValue = "RokSpUdalMinValue", ViceIxp = "ViceIxp", PrizCj = "PrizCj", FilterPrizCjOnly = "FilterPrizCjOnly", retval = "retval", PovolenoVyrizeniCiUzavreni = "PovolenoVyrizeniCiUzavreni", ssl_pouulolisd = "ssl_pouulolisd", gin_epk_schfaz = "gin_epk_schfaz", gin_epksvyr = "gin_epksvyr", ssl_editspzndvs = "ssl_editspzndvs", ssl_pouulolistu = "ssl_pouulolistu", ssl_dok_zprac = "ssl_dok_zprac", ssl_kon_vysp = "ssl_kon_vysp", ssl_kopdatvyruz = "ssl_kopdatvyruz", ssl_spouud2 = "ssl_spouud2", ssl_spouuda = "ssl_spouuda", ssl_vyrkonmet = "ssl_vyrkonmet", ssl_vyrkonspzn = "ssl_vyrkonspzn", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", Icon = "Icon", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVyrizeniBaseFragments { dto = "*", dtoEnabled = "*", StavSpisPlan = "*", SSl = "*", SkartLhutaMinValue = "*", Ixp = "*", IXPs = "*", RokSpUdalMinValue = "*", ViceIxp = "*", PrizCj = "*", FilterPrizCjOnly = "*", retval = "*", PovolenoVyrizeniCiUzavreni = "*", ssl_pouulolisd = "*", gin_epk_schfaz = "*", gin_epksvyr = "*", ssl_editspzndvs = "*", ssl_pouulolistu = "*", ssl_dok_zprac = "*", ssl_kon_vysp = "*", ssl_kopdatvyruz = "*", ssl_spouud2 = "*", ssl_spouuda = "*", ssl_vyrkonmet = "*", ssl_vyrkonspzn = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", Icon = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVyrizeniBaseTypes { dto = "Gordic.Wfl.Interface.GVyrizeniDokSpisDto", dtoEnabled = "Gordic.Wfl.Interface.GVyrizeniDokSpisEnabledDto", StavSpisPlan = "Gordic.Wfl.Interface.GVyrizSpZnDto", SSl = "number", SkartLhutaMinValue = "number", Ixp = "string", IXPs = "Gordic.Wfl.Interface.SelectedRowInfoDto[]", RokSpUdalMinValue = "number", ViceIxp = "boolean", PrizCj = "number", FilterPrizCjOnly = "number[]", retval = "Gordic.Wfl.Interface.GVyrizeniDokSpisRetvalDto", PovolenoVyrizeniCiUzavreni = "boolean", ssl_pouulolisd = "boolean", gin_epk_schfaz = "string", gin_epksvyr = "boolean", ssl_editspzndvs = "boolean", ssl_pouulolistu = "number", ssl_dok_zprac = "number", ssl_kon_vysp = "number", ssl_kopdatvyruz = "boolean", ssl_spouud2 = "boolean", ssl_spouuda = "boolean", ssl_vyrkonmet = "number", ssl_vyrkonspzn = "number", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", Icon = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum GVyrizeniBaseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Vyrizeni\GVyrizeniDokument.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Vyřízení dokumentu/spisu (MAIN)*/
	interface GVyrizeniMain extends Gordic.Ssl.WebClient.GVyrizeniAjaxContent {
	}
	const enum GVyrizeniMainNames { UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", Icon = "Icon", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVyrizeniMainFragments { UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", Icon = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVyrizeniMainTypes { UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", Icon = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum GVyrizeniMainTypeLengths {}
	/**Vyřízení dokumentu*/
	interface GVyrizeniDokument extends Gordic.Ssl.WebClient.GVyrizeniBase {
	}
	const enum GVyrizeniDokumentNames { dto = "dto", dtoEnabled = "dtoEnabled", Wflsdcj = "Wflsdcj", DetSslspid = "DetSslspid", DetSslsdcj = "DetSslsdcj", StavSpisPlan = "StavSpisPlan", SSl = "SSl", SkartLhutaMinValue = "SkartLhutaMinValue", Ixp = "Ixp", IXPs = "IXPs", RokSpUdalMinValue = "RokSpUdalMinValue", ViceIxp = "ViceIxp", PrizCj = "PrizCj", FilterPrizCjOnly = "FilterPrizCjOnly", retval = "retval", PovolenoVyrizeniCiUzavreni = "PovolenoVyrizeniCiUzavreni", ssl_pouulolisd = "ssl_pouulolisd", gin_epk_schfaz = "gin_epk_schfaz", gin_epksvyr = "gin_epksvyr", ssl_editspzndvs = "ssl_editspzndvs", ssl_pouulolistu = "ssl_pouulolistu", ssl_dok_zprac = "ssl_dok_zprac", ssl_kon_vysp = "ssl_kon_vysp", ssl_kopdatvyruz = "ssl_kopdatvyruz", ssl_spouud2 = "ssl_spouud2", ssl_spouuda = "ssl_spouuda", ssl_vyrkonmet = "ssl_vyrkonmet", ssl_vyrkonspzn = "ssl_vyrkonspzn", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", Icon = "Icon", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVyrizeniDokumentFragments { dto = "*", dtoEnabled = "*", Wflsdcj = "*", DetSslspid = "*", DetSslsdcj = "*", StavSpisPlan = "*", SSl = "*", SkartLhutaMinValue = "*", Ixp = "*", IXPs = "*", RokSpUdalMinValue = "*", ViceIxp = "*", PrizCj = "*", FilterPrizCjOnly = "*", retval = "*", PovolenoVyrizeniCiUzavreni = "*", ssl_pouulolisd = "*", gin_epk_schfaz = "*", gin_epksvyr = "*", ssl_editspzndvs = "*", ssl_pouulolistu = "*", ssl_dok_zprac = "*", ssl_kon_vysp = "*", ssl_kopdatvyruz = "*", ssl_spouud2 = "*", ssl_spouuda = "*", ssl_vyrkonmet = "*", ssl_vyrkonspzn = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", Icon = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVyrizeniDokumentTypes { dto = "Gordic.Wfl.Interface.GVyrizeniDokSpisDto", dtoEnabled = "Gordic.Wfl.Interface.GVyrizeniDokSpisEnabledDto", Wflsdcj = "Gordic.Wfl.Client.GWflsdcj", DetSslspid = "Gordic.Ssl.Client.GDetSslspid", DetSslsdcj = "Gordic.Ssl.Client.GDetSslsdcj", StavSpisPlan = "Gordic.Wfl.Interface.GVyrizSpZnDto", SSl = "number", SkartLhutaMinValue = "number", Ixp = "string", IXPs = "Gordic.Wfl.Interface.SelectedRowInfoDto[]", RokSpUdalMinValue = "number", ViceIxp = "boolean", PrizCj = "number", FilterPrizCjOnly = "number[]", retval = "Gordic.Wfl.Interface.GVyrizeniDokSpisRetvalDto", PovolenoVyrizeniCiUzavreni = "boolean", ssl_pouulolisd = "boolean", gin_epk_schfaz = "string", gin_epksvyr = "boolean", ssl_editspzndvs = "boolean", ssl_pouulolistu = "number", ssl_dok_zprac = "number", ssl_kon_vysp = "number", ssl_kopdatvyruz = "boolean", ssl_spouud2 = "boolean", ssl_spouuda = "boolean", ssl_vyrkonmet = "number", ssl_vyrkonspzn = "number", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", Icon = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum GVyrizeniDokumentTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\Vyrizeni\GVyrizeniSpis.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Vyřízení spisu*/
	interface GVyrizeniSpis extends Gordic.Ssl.WebClient.GVyrizeniBase {
	}
	const enum GVyrizeniSpisNames { dto = "dto", dtoEnabled = "dtoEnabled", Wflsdcj = "Wflsdcj", DetSslspid = "DetSslspid", DetSslsdcj = "DetSslsdcj", StavSpisPlan = "StavSpisPlan", SSl = "SSl", SkartLhutaMinValue = "SkartLhutaMinValue", Ixp = "Ixp", IXPs = "IXPs", RokSpUdalMinValue = "RokSpUdalMinValue", ViceIxp = "ViceIxp", PrizCj = "PrizCj", FilterPrizCjOnly = "FilterPrizCjOnly", retval = "retval", PovolenoVyrizeniCiUzavreni = "PovolenoVyrizeniCiUzavreni", ssl_pouulolisd = "ssl_pouulolisd", gin_epk_schfaz = "gin_epk_schfaz", gin_epksvyr = "gin_epksvyr", ssl_editspzndvs = "ssl_editspzndvs", ssl_pouulolistu = "ssl_pouulolistu", ssl_dok_zprac = "ssl_dok_zprac", ssl_kon_vysp = "ssl_kon_vysp", ssl_kopdatvyruz = "ssl_kopdatvyruz", ssl_spouud2 = "ssl_spouud2", ssl_spouuda = "ssl_spouuda", ssl_vyrkonmet = "ssl_vyrkonmet", ssl_vyrkonspzn = "ssl_vyrkonspzn", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", Icon = "Icon", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVyrizeniSpisFragments { dto = "*", dtoEnabled = "*", Wflsdcj = "*", DetSslspid = "*", DetSslsdcj = "*", StavSpisPlan = "*", SSl = "*", SkartLhutaMinValue = "*", Ixp = "*", IXPs = "*", RokSpUdalMinValue = "*", ViceIxp = "*", PrizCj = "*", FilterPrizCjOnly = "*", retval = "*", PovolenoVyrizeniCiUzavreni = "*", ssl_pouulolisd = "*", gin_epk_schfaz = "*", gin_epksvyr = "*", ssl_editspzndvs = "*", ssl_pouulolistu = "*", ssl_dok_zprac = "*", ssl_kon_vysp = "*", ssl_kopdatvyruz = "*", ssl_spouud2 = "*", ssl_spouuda = "*", ssl_vyrkonmet = "*", ssl_vyrkonspzn = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", Icon = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVyrizeniSpisTypes { dto = "Gordic.Wfl.Interface.GVyrizeniDokSpisDto", dtoEnabled = "Gordic.Wfl.Interface.GVyrizeniDokSpisEnabledDto", Wflsdcj = "Gordic.Wfl.Client.GWflsdcj", DetSslspid = "Gordic.Ssl.Client.GDetSslspid", DetSslsdcj = "Gordic.Ssl.Client.GDetSslsdcj", StavSpisPlan = "Gordic.Wfl.Interface.GVyrizSpZnDto", SSl = "number", SkartLhutaMinValue = "number", Ixp = "string", IXPs = "Gordic.Wfl.Interface.SelectedRowInfoDto[]", RokSpUdalMinValue = "number", ViceIxp = "boolean", PrizCj = "number", FilterPrizCjOnly = "number[]", retval = "Gordic.Wfl.Interface.GVyrizeniDokSpisRetvalDto", PovolenoVyrizeniCiUzavreni = "boolean", ssl_pouulolisd = "boolean", gin_epk_schfaz = "string", gin_epksvyr = "boolean", ssl_editspzndvs = "boolean", ssl_pouulolistu = "number", ssl_dok_zprac = "number", ssl_kon_vysp = "number", ssl_kopdatvyruz = "boolean", ssl_spouud2 = "boolean", ssl_spouuda = "boolean", ssl_vyrkonmet = "number", ssl_vyrkonspzn = "number", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", Icon = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum GVyrizeniSpisTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Dto\GruzneDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**LastUsedIxpDto dto*/
	interface LastUsedIxpDto {
		/**Autogenerated.*/
		Ixp?: string|null;
	}
	const enum LastUsedIxpDtoNames { Ixp = "Ixp",}
	const enum LastUsedIxpDtoFragments { Ixp = "*",}
	const enum LastUsedIxpDtoTypes { Ixp = "string",}
	const enum LastUsedIxpDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface KpiVelikostaPocetSoboruDto {
		/**IsVelikostaPocetSoboru*/
		IsVelikostaPocetSoboru?: boolean|null;
		/**VelikostPocetSoboruPocetDok*/
		VelikostPocetSoboruPocetDok?: number|null;
		/**VelikostaPocetSoboruVelikost*/
		VelikostaPocetSoboruVelikost?: string|null;
		/**VelikostaPocetSoboruVarovani*/
		VelikostaPocetSoboruVarovani?: string|null;
	}
	const enum KpiVelikostaPocetSoboruDtoNames { IsVelikostaPocetSoboru = "IsVelikostaPocetSoboru", VelikostPocetSoboruPocetDok = "VelikostPocetSoboruPocetDok", VelikostaPocetSoboruVelikost = "VelikostaPocetSoboruVelikost", VelikostaPocetSoboruVarovani = "VelikostaPocetSoboruVarovani",}
	const enum KpiVelikostaPocetSoboruDtoFragments { IsVelikostaPocetSoboru = "*", VelikostPocetSoboruPocetDok = "*", VelikostaPocetSoboruVelikost = "*", VelikostaPocetSoboruVarovani = "*",}
	const enum KpiVelikostaPocetSoboruDtoTypes { IsVelikostaPocetSoboru = "boolean", VelikostPocetSoboruPocetDok = "number", VelikostaPocetSoboruVelikost = "string", VelikostaPocetSoboruVarovani = "string",}
	const enum KpiVelikostaPocetSoboruDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface GSslEklepPripominkaDlgInputDto {
		/**Ixp*/
		Ixp?: string|null;
	}
	const enum GSslEklepPripominkaDlgInputDtoNames { Ixp = "Ixp",}
	const enum GSslEklepPripominkaDlgInputDtoFragments { Ixp = "*",}
	const enum GSslEklepPripominkaDlgInputDtoTypes { Ixp = "string",}
	const enum GSslEklepPripominkaDlgInputDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface GSslEklepPripominkaDlgReturnDto {
	}
	const enum GSslEklepPripominkaDlgReturnDtoNames {}
	const enum GSslEklepPripominkaDlgReturnDtoFragments {}
	const enum GSslEklepPripominkaDlgReturnDtoTypes {}
	const enum GSslEklepPripominkaDlgReturnDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface GSslEklepOdeslanaPripominkaInputDlg {
		/**Pid_eklep_pripomin*/
		Pid_eklep_pripomin?: string|null;
	}
	const enum GSslEklepOdeslanaPripominkaInputDlgNames { Pid_eklep_pripomin = "Pid_eklep_pripomin",}
	const enum GSslEklepOdeslanaPripominkaInputDlgFragments { Pid_eklep_pripomin = "*",}
	const enum GSslEklepOdeslanaPripominkaInputDlgTypes { Pid_eklep_pripomin = "string",}
	const enum GSslEklepOdeslanaPripominkaInputDlgTypeLengths {}
	interface GSslEklepPripominkoveRizeniInputDlgDto {
		/**Pid_eklep_pripomin*/
		Pid_eklep?: string|null;
	}
	const enum GSslEklepPripominkoveRizeniInputDlgDtoNames { Pid_eklep = "Pid_eklep",}
	const enum GSslEklepPripominkoveRizeniInputDlgDtoFragments { Pid_eklep = "*",}
	const enum GSslEklepPripominkoveRizeniInputDlgDtoTypes { Pid_eklep = "string",}
	const enum GSslEklepPripominkoveRizeniInputDlgDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface GSslEklepNovePripominkoveRizeniDlgInputDto {
		/**Ixp*/
		Ixp?: string|null;
	}
	const enum GSslEklepNovePripominkoveRizeniDlgInputDtoNames { Ixp = "Ixp",}
	const enum GSslEklepNovePripominkoveRizeniDlgInputDtoFragments { Ixp = "*",}
	const enum GSslEklepNovePripominkoveRizeniDlgInputDtoTypes { Ixp = "string",}
	const enum GSslEklepNovePripominkoveRizeniDlgInputDtoTypeLengths {}
	/**KpiVelikostaPocetSoboru dto*/
	interface GSslEklepNovePripominkoveRizeniDlgReturnDto {
	}
	const enum GSslEklepNovePripominkoveRizeniDlgReturnDtoNames {}
	const enum GSslEklepNovePripominkoveRizeniDlgReturnDtoFragments {}
	const enum GSslEklepNovePripominkoveRizeniDlgReturnDtoTypes {}
	const enum GSslEklepNovePripominkoveRizeniDlgReturnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Dto\GVecneSkupinyTaskActionSettingsDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Nastavení povolení akcí.*/
	interface GVecneSkupinyTaskActionSettingsDto {
		/**Povolení přetřídění obsahu.*/
		PretrideniObsahu?: boolean|null;
		/**Povolení pozastavení skartační operace.*/
		PozastaveniSkartacniOperace?: boolean|null;
	}
	const enum GVecneSkupinyTaskActionSettingsDtoNames { PretrideniObsahu = "PretrideniObsahu", PozastaveniSkartacniOperace = "PozastaveniSkartacniOperace",}
	const enum GVecneSkupinyTaskActionSettingsDtoFragments { PretrideniObsahu = "*", PozastaveniSkartacniOperace = "*",}
	const enum GVecneSkupinyTaskActionSettingsDtoTypes { PretrideniObsahu = "boolean", PozastaveniSkartacniOperace = "boolean",}
	const enum GVecneSkupinyTaskActionSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Dto\SouhrnCountsDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**SouhrnDto dto*/
	interface SouhrnCountsDto {
		/**Autogenerated.*/
		PisKeZpr?: number|null;
		/**Autogenerated.*/
		SpisKeZpr?: number|null;
		/**Autogenerated.*/
		PisKeZprVl?: number|null;
		/**Autogenerated.*/
		PisKeZprRe?: number|null;
		/**Autogenerated.*/
		SpisKeZprVl?: number|null;
		/**Autogenerated.*/
		SpisKeZprRe?: number|null;
		/**Autogenerated.*/
		SpisKUzavreni?: number|null;
		/**Autogenerated.*/
		SpisKUzavreniRak?: number|null;
		/**Autogenerated.*/
		SpisPredTerm?: number|null;
		/**Autogenerated.*/
		SpisPoTerm?: number|null;
		/**Autogenerated.*/
		PisPoTerm?: number|null;
		/**Autogenerated.*/
		DokKPredani?: number|null;
		/**Autogenerated.*/
		DokKPrevzeti?: number|null;
		/**Autogenerated.*/
		VraceneZasilky?: number|null;
		/**Autogenerated.*/
		ChybneZasilkyIsds?: number|null;
		/**Autogenerated.*/
		UserA?: number|null;
		/**Autogenerated.*/
		UserB?: number|null;
		/**K vyřízení*/
		EpkPosouzeniSchvaleni?: number|null;
		/**K vyřízení (nepřečteno)*/
		EpkPosouzeniSchvaleniNep?: number|null;
		/**Autogenerated.*/
		EpkVraceno?: number|null;
		/**Autogenerated.*/
		EpkPosouzenoSchvaleno?: number|null;
		/**Vlastní vrácené žádosti*/
		EpkVlastniVraceno?: number|null;
		/**Vlastní vyřízené žádosti*/
		EpkVlastniVyrizeno?: number|null;
		/**Vlastní nevyřízené žádosti*/
		EpkVlastniNevyrizeno?: number|null;
		/**Autogenerated.*/
		EpkNevyrizenoPred?: number|null;
		/**Autogenerated.*/
		EpkNevyrizenoTesnePred?: number|null;
		/**Autogenerated.*/
		EpkPoTerminu?: number|null;
		/**DulezitostKriticka.*/
		Cervena?: number|null;
		/**DulezitostStredni.*/
		Zelena?: number|null;
		/**DulezitostNizka.*/
		Modra?: number|null;
		/**DulezitostNizka.*/
		Fialova?: number|null;
		/**DulezitostNizka.*/
		Zluta?: number|null;
	}
	const enum SouhrnCountsDtoNames { PisKeZpr = "PisKeZpr", SpisKeZpr = "SpisKeZpr", PisKeZprVl = "PisKeZprVl", PisKeZprRe = "PisKeZprRe", SpisKeZprVl = "SpisKeZprVl", SpisKeZprRe = "SpisKeZprRe", SpisKUzavreni = "SpisKUzavreni", SpisKUzavreniRak = "SpisKUzavreniRak", SpisPredTerm = "SpisPredTerm", SpisPoTerm = "SpisPoTerm", PisPoTerm = "PisPoTerm", DokKPredani = "DokKPredani", DokKPrevzeti = "DokKPrevzeti", VraceneZasilky = "VraceneZasilky", ChybneZasilkyIsds = "ChybneZasilkyIsds", UserA = "UserA", UserB = "UserB", EpkPosouzeniSchvaleni = "EpkPosouzeniSchvaleni", EpkPosouzeniSchvaleniNep = "EpkPosouzeniSchvaleniNep", EpkVraceno = "EpkVraceno", EpkPosouzenoSchvaleno = "EpkPosouzenoSchvaleno", EpkVlastniVraceno = "EpkVlastniVraceno", EpkVlastniVyrizeno = "EpkVlastniVyrizeno", EpkVlastniNevyrizeno = "EpkVlastniNevyrizeno", EpkNevyrizenoPred = "EpkNevyrizenoPred", EpkNevyrizenoTesnePred = "EpkNevyrizenoTesnePred", EpkPoTerminu = "EpkPoTerminu", Cervena = "Cervena", Zelena = "Zelena", Modra = "Modra", Fialova = "Fialova", Zluta = "Zluta",}
	const enum SouhrnCountsDtoFragments { PisKeZpr = "*", SpisKeZpr = "*", PisKeZprVl = "*", PisKeZprRe = "*", SpisKeZprVl = "*", SpisKeZprRe = "*", SpisKUzavreni = "*", SpisKUzavreniRak = "*", SpisPredTerm = "*", SpisPoTerm = "*", PisPoTerm = "*", DokKPredani = "*", DokKPrevzeti = "*", VraceneZasilky = "*", ChybneZasilkyIsds = "*", UserA = "*", UserB = "*", EpkPosouzeniSchvaleni = "*", EpkPosouzeniSchvaleniNep = "*", EpkVraceno = "*", EpkPosouzenoSchvaleno = "*", EpkVlastniVraceno = "*", EpkVlastniVyrizeno = "*", EpkVlastniNevyrizeno = "*", EpkNevyrizenoPred = "*", EpkNevyrizenoTesnePred = "*", EpkPoTerminu = "*", Cervena = "*", Zelena = "*", Modra = "*", Fialova = "*", Zluta = "*",}
	const enum SouhrnCountsDtoTypes { PisKeZpr = "number", SpisKeZpr = "number", PisKeZprVl = "number", PisKeZprRe = "number", SpisKeZprVl = "number", SpisKeZprRe = "number", SpisKUzavreni = "number", SpisKUzavreniRak = "number", SpisPredTerm = "number", SpisPoTerm = "number", PisPoTerm = "number", DokKPredani = "number", DokKPrevzeti = "number", VraceneZasilky = "number", ChybneZasilkyIsds = "number", UserA = "number", UserB = "number", EpkPosouzeniSchvaleni = "number", EpkPosouzeniSchvaleniNep = "number", EpkVraceno = "number", EpkPosouzenoSchvaleno = "number", EpkVlastniVraceno = "number", EpkVlastniVyrizeno = "number", EpkVlastniNevyrizeno = "number", EpkNevyrizenoPred = "number", EpkNevyrizenoTesnePred = "number", EpkPoTerminu = "number", Cervena = "number", Zelena = "number", Modra = "number", Fialova = "number", Zluta = "number",}
	const enum SouhrnCountsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Dto\SouhrnDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**SouhrnDto dto*/
	interface SouhrnDto {
		/**Autogenerated.*/
		ZobrazitDokumentyFilter?: number[]|null;
		/**Autogenerated.*/
		Counts?: Gordic.Ssl.WebClient.SouhrnCountsDto|null;
		/**Autogenerated.*/
		PohledZaFilter?: Gordic.Gin.Interface.IxsType|null;
	}
	const enum SouhrnDtoNames { ZobrazitDokumentyFilter = "ZobrazitDokumentyFilter", Counts = "Counts", PohledZaFilter = "PohledZaFilter",}
	const enum SouhrnDtoFragments { ZobrazitDokumentyFilter = "*", Counts = "*", PohledZaFilter = "*",}
	const enum SouhrnDtoTypes { ZobrazitDokumentyFilter = "number[]", Counts = "Gordic.Ssl.WebClient.SouhrnCountsDto", PohledZaFilter = "Gordic.Gin.Interface.IxsType",}
	const enum SouhrnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\HromadnyImportDoSSL\Dto\GSslHromadnyImportItemDto.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**SSL Item hromadný import*/
	interface GSslHromadnyImportItemDto {
		/**Seznam el. souboru pro identifikator*/
		Prilohy?: Gordic.Ssl.WebClient.GSslHromadnyImportPrilohyDto[]|null;
		/**Podle jakeho klice se maji soubory importovat*/
		ImportDle?: Gordic.Ssl.WebClient.GSslHromadnyImportDleEnum|null;
		/**Identifikator souboru ICO, RC nebo jmeno souboru. Zalezi na typu importu*/
		Identifikator?: string|null;
		/**Zda je identifikator validni. Overuje se spravny format ICO, RC.*/
		Valid?: boolean|null;
		/**Detail dokumentu - Vec*/
		Vec?: string|null;
		/**Detail dokumentu - Vec podrobne*/
		VecPodrobne?: string|null;
		/**Detail dokumentu - Typ dokumentu*/
		TypDokumentu?: string|null;
		/**Detail dokumentu - Pristup*/
		Pristup?: number|null;
		/**Detail dokumentu - Poc listu*/
		PocListu?: number|null;
		/**Detail dokumentu - Poc priloh*/
		PocPriloh?: number|null;
		/**Detail dokumentu - Spis Pl.*/
		SpisPl?: string|null;
		/**Detail dokumentu - Spis Zn.*/
		SpisZn?: string|null;
		/**Priznak ulozeni hodnot na detailu*/
		DetailSaved?: boolean|null;
		/**Identifikator externiho subjektu*/
		IxsEsu?: string|null;
		/**Textovy popis ESU*/
		EsuTxt?: string|null;
		/**Priznak hledani Esu: True - bylo hledano, False - nebylo hledano*/
		EsuDohledano?: boolean|null;
		/**Soubor ktery byl vybran jako obraz dokumentu*/
		ElObraz?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Prilohy ktere se priradi k nove naimportovanemu dokumentu*/
		ElPrilohy?: Gordic.General.ApplicationInterface.GFileInfoDto[]|null;
		/**Priznak naimportovani do SSL - pokud doslo k uspesnemu importu nastavi se na true*/
		Imported?: boolean|null;
		/**Pocet priloh*/
		PrilohyCount?: number|null;
		/**PodanoTxt*/
		PodanoTxt?: string|null;
		/**PodanoTxt*/
		IXP?: string|null;
		/**Aktivita*/
		Aktivita?: number|null;
		/**Podano*/
		Podano?: number|null;
	}
	const enum GSslHromadnyImportItemDtoNames { Prilohy = "Prilohy", ImportDle = "ImportDle", Identifikator = "Identifikator", Valid = "Valid", Vec = "Vec", VecPodrobne = "VecPodrobne", TypDokumentu = "TypDokumentu", Pristup = "Pristup", PocListu = "PocListu", PocPriloh = "PocPriloh", SpisPl = "SpisPl", SpisZn = "SpisZn", DetailSaved = "DetailSaved", IxsEsu = "IxsEsu", EsuTxt = "EsuTxt", EsuDohledano = "EsuDohledano", ElObraz = "ElObraz", ElPrilohy = "ElPrilohy", Imported = "Imported", PrilohyCount = "PrilohyCount", PodanoTxt = "PodanoTxt", IXP = "IXP", Aktivita = "Aktivita", Podano = "Podano",}
	const enum GSslHromadnyImportItemDtoFragments { Prilohy = "*", ImportDle = "*", Identifikator = "*", Valid = "*", Vec = "*", VecPodrobne = "*", TypDokumentu = "*", Pristup = "*", PocListu = "*", PocPriloh = "*", SpisPl = "*", SpisZn = "*", DetailSaved = "*", IxsEsu = "*", EsuTxt = "*", EsuDohledano = "*", ElObraz = "*", ElPrilohy = "*", Imported = "*", PrilohyCount = "*", PodanoTxt = "*", IXP = "*", Aktivita = "*", Podano = "*",}
	const enum GSslHromadnyImportItemDtoTypes { Prilohy = "Gordic.Ssl.WebClient.GSslHromadnyImportPrilohyDto[]", ImportDle = "Gordic.Ssl.WebClient.GSslHromadnyImportDleEnum", Identifikator = "string", Valid = "boolean", Vec = "string", VecPodrobne = "string", TypDokumentu = "string", Pristup = "number", PocListu = "number", PocPriloh = "number", SpisPl = "string", SpisZn = "string", DetailSaved = "boolean", IxsEsu = "string", EsuTxt = "string", EsuDohledano = "boolean", ElObraz = "Gordic.General.ApplicationInterface.GFileInfoDto", ElPrilohy = "Gordic.General.ApplicationInterface.GFileInfoDto[]", Imported = "boolean", PrilohyCount = "number", PodanoTxt = "string", IXP = "string", Aktivita = "number", Podano = "number",}
	const enum GSslHromadnyImportItemDtoTypeLengths {}
	interface GSslHromadnyImportPrilohyDto {
		/**Systemove info o souboru*/
		FileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Guid*/
		Guid?: string|null;
		/**Zda se jedna o prilohu*/
		IsPriloha?: boolean|null;
		/**Zda se jedna o el obraz, true - ano, false - ne*/
		IsElObraz?: boolean|null;
	}
	const enum GSslHromadnyImportPrilohyDtoNames { FileInfo = "FileInfo", Guid = "Guid", IsPriloha = "IsPriloha", IsElObraz = "IsElObraz",}
	const enum GSslHromadnyImportPrilohyDtoFragments { FileInfo = "*", Guid = "*", IsPriloha = "*", IsElObraz = "*",}
	const enum GSslHromadnyImportPrilohyDtoTypes { FileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", Guid = "string", IsPriloha = "boolean", IsElObraz = "boolean",}
	const enum GSslHromadnyImportPrilohyDtoTypeLengths {}
	/**Enumerator urcujici dle jakeho kriteria se improtuje do SSL*/
	const enum GSslHromadnyImportDleEnum {
		/**Neoveruje se - kazdy soubor je prijat jako samostatne podani*/
		vse=0,
		/**Podle ICO - pojmenovani importovanych souboru je ve tvari ICOx.ext (ICO 8 mistny, x - libovolny neciselny znak urcujici ze se jedna o prilohu)*/
		ico=1,
		/**Podle Rodneho cisla - pojmenovani importovanych souboru je ve tvari RCx.ext (Rodne cislo, x - libovolny neciselny znak urcujici ze se jedna o prilohu)*/
		rc=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Lists\Base\dto\SelectedRowInfoDto.d.ts 

declare namespace Gordic.Ssl.WebClient.Lists {
    /**SelectedRowInfoDto dto*/
    interface SelectedRowInfoDto {
        /**Autogenerated.*/
        Ixp?: string|null;
        /**Autogenerated.*/
        DatZmena?: JsonDate|null;
        /**Autogenerated.*/
        PrizSpis?: number|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Lists\Base\dto\SubjektSelectedInfo.d.ts 

declare namespace Gordic.Ssl.WebClient.Lists {
	interface SubjektSelectedInfo {
        /**Autogenerated.*/
		Ixs?: string|null;
        /**Autogenerated.*/
		Name?: string|null;
        /**Autogenerated.*/
		TypeIxs?: number|null;
	}
	const enum SubjektSelectedInfoNames { Ixs = "Ixs", Name = "Name", TypeIxs = "TypeIxs",}
	const enum SubjektSelectedInfoFragments { Ixs = "*", Name = "*", TypeIxs = "*",}
	const enum SubjektSelectedInfoTypes { Ixs = "string", Name = "string", TypeIxs = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Others\Eklep\GinEklepRole.d.ts 

declare namespace Gordic.Ssl.WebClient {
	/**Hodnoty parametru GIN eKlep - Role uživatele pro funkčnost eKLEP (gin_eklep_role).*/
	const enum GinEklepRole {
		/**Ne.*/
		Ne,
		/**Uživatel.*/
		Uzivatel,
		/**Super uživatel.*/
		SuperUzivatel,
		/**Správce.*/
		Spravce,
	}
}

//#endregion

