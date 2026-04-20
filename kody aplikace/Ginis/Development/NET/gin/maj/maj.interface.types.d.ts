/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       maj.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Maj.Interface\Gordic.Maj.Interface.csproj
*    created     2026-02-16 14:33:52
*    files       Gordic.Maj.Interface.Enums.d.ts
*                Gordic.Maj.Interface.IGMajetek.d.ts
*                ALDataSets\GItemSettingsDto.d.ts
*                ALDataSets\GKrtSeznamRefDto.d.ts
*                ALDataSets\GMajCommonReportDto.d.ts
*                ALDataSets\GMajldpdDto.d.ts
*                ALDataSets\GMajProdejDto.d.ts
*                ALDataSets\GMajsdinDto.d.ts
*                ALDataSets\GMajsresDto.d.ts
*                ALDataSets\GMajtbufDto.d.ts
*                ALDataSets\GMajxpocDto.d.ts
*                ALDataSets\GPohybyMajDokladuDto.d.ts
*                ALDataSets\GProvozPodminkyDto.d.ts
*                ALDataSets\GTzhDto.d.ts
*                ALDataSets\GTzhStavDto.d.ts
*                ALDataSets\GWflDokladDto.d.ts
*                Ciselniky\Gordic.Maj.Interface.IGMajCiselniky.d.ts
*                Ciselniky\Gordic.Maj.Interface.IGMajsskm.d.ts
*                Ciselniky\IGMajCasoveZavislyUcet.d.ts
*                Ciselniky\IGMajDruhMajetku.d.ts
*                Ciselniky\IGMajElementarniMajetkovyPohyb.d.ts
*                Ciselniky\IGMajEvidencniStredisko.d.ts
*                Ciselniky\IGMajExterniLokalizace1.d.ts
*                Ciselniky\IGMajExterniLokalizace2.d.ts
*                Ciselniky\IGMajExterniLokalizace3.d.ts
*                Ciselniky\IGMajKategorieZarizeni.d.ts
*                Ciselniky\IGMajKlasifikace.d.ts
*                Ciselniky\IGMajKmenovyList.d.ts
*                Ciselniky\IGMajMajetkovyPohyb.d.ts
*                Ciselniky\IGMajMaterialovaTrida.d.ts
*                Ciselniky\IGMajMaterialoveCislo.d.ts
*                Ciselniky\IGMajMernaJednotka.d.ts
*                Ciselniky\IGMajMobilita.d.ts
*                Ciselniky\IGMajObjekt.d.ts
*                Ciselniky\IGMajObjektBudova.d.ts
*                Ciselniky\IGMajObjektStredisko.d.ts
*                Ciselniky\IGMajPodminkyProvozu.d.ts
*                Ciselniky\IGMajProdejniPrirazka.d.ts
*                Ciselniky\IGMajRizikoPriPoruse.d.ts
*                Ciselniky\IGMajSkupinaMajetku.d.ts
*                Ciselniky\IGMajStavPoPrevzeti.d.ts
*                Ciselniky\IGMajTridaBezpecnosti.d.ts
*                Ciselniky\IGMajTypDokladu.d.ts
*                Ciselniky\IGMajTypOdpisu.d.ts
*                Ciselniky\IGMajTypZodpovednosti.d.ts
*                Ciselniky\IGMajUcty.d.ts
*                Ciselniky\IGMajVariantaTransformaceUctu.d.ts
*                Ciselniky\IGMajVazbaVarianty.d.ts
*                Ciselniky\IGMajZpusobVyuziti.d.ts
*                Ciselniky\DataSets\GEkocktlDto.d.ts
*                Ciselniky\DataSets\GGinsmisDto.d.ts
*                Ciselniky\DataSets\GMajcaktDto.d.ts
*                Ciselniky\DataSets\GMajcdemDto.d.ts
*                Ciselniky\DataSets\GMajcodsDto.d.ts
*                Ciselniky\DataSets\GMajctykDto.d.ts
*                Ciselniky\DataSets\GMajctyzDto.d.ts
*                Ciselniky\DataSets\GMajczevDto.d.ts
*                Ciselniky\DataSets\GMajscfuDto.d.ts
*                Ciselniky\DataSets\GUniversalDialDto.d.ts
*                Ciselniky\DataSets\Vyber\GVyberJmenaSouboruDto.d.ts
*                Ciselniky\Filtry\GFilterEnumCiselniky.d.ts
*                Doklady\GMajpidZmenaDto.d.ts
*                Doklady\GMajWflspidDto.d.ts
*                Doklady\IGMajDokladService.d.ts
*                DTO\GBplspidDto.d.ts
*                DTO\GDataUupTrfDto.d.ts
*                DTO\GDokladMajXxxOperationDto.d.ts
*                DTO\GEkosklaDto.d.ts
*                DTO\GEkosobjDto.d.ts
*                DTO\GEkosstrDto.d.ts
*                DTO\GEkovkzoDto.d.ts
*                DTO\GEkovobbDto.d.ts
*                DTO\GEkovobsDto.d.ts
*                DTO\GGincmejDto.d.ts
*                DTO\GGinskovDto.d.ts
*                DTO\GKontrolaDotaceDto.d.ts
*                DTO\GMajcosmDto.d.ts
*                DTO\GMajcstpDto.d.ts
*                DTO\GMajdpohDto.d.ts
*                DTO\GMajhsodDto.d.ts
*                DTO\GMajmajDto.d.ts
*                DTO\GMajmajInfoDto.d.ts
*                DTO\GMajMajPolDto.d.ts
*                DTO\GMajOdpAllDto.d.ts
*                DTO\GMajOdpFiltrDto.d.ts
*                DTO\GMajOdpisDto.d.ts
*                DTO\GMajpidDto.d.ts
*                DTO\GMajpidmajDto.d.ts
*                DTO\GMajPolozkaDto.d.ts
*                DTO\GMajscimDto.d.ts
*                DTO\GMajsdenDto.d.ts
*                DTO\GMajsdprDto.d.ts
*                DTO\GMajsdrmDto.d.ts
*                DTO\GMajsel1Dto.d.ts
*                DTO\GMajsel2Dto.d.ts
*                DTO\GMajsel3Dto.d.ts
*                DTO\GMajSeznamDto.d.ts
*                DTO\GMajSeznamWflDto.d.ts
*                DTO\GMajsiabDto.d.ts
*                DTO\GMajsiaoDto.d.ts
*                DTO\GMajsiapDto.d.ts
*                DTO\GMajsklmDto.d.ts
*                DTO\GMajsktzDto.d.ts
*                DTO\GMajsmobDto.d.ts
*                DTO\GMajsobmDto.d.ts
*                DTO\GMajsodDto.d.ts
*                DTO\GMajspohDto.d.ts
*                DTO\GMajspopDto.d.ts
*                DTO\GMajspriDto.d.ts
*                DTO\GMajsripDto.d.ts
*                DTO\GMajsrpbDto.d.ts
*                DTO\GMajsrpbPKDto.d.ts
*                DTO\GMajsskmDto.d.ts
*                DTO\GMajssouDto.d.ts
*                DTO\GMajsstpDto.d.ts
*                DTO\GMajstodDto.d.ts
*                DTO\GMajstrbDto.d.ts
*                DTO\GMajstrfDto.d.ts
*                DTO\GMajstriDto.d.ts
*                DTO\GMajstrsDto.d.ts
*                DTO\GMajstyzDto.d.ts
*                DTO\GMajsueaDto.d.ts
*                DTO\GMajsvueDto.d.ts
*                DTO\GMajszzhDto.d.ts
*                DTO\GMajTransferCasDto.d.ts
*                DTO\GMajUctKontoDto.d.ts
*                DTO\GMajvdroDto.d.ts
*                DTO\GMajvvueDto.d.ts
*                DTO\GOdpisStartDto.d.ts
*                DTO\GOdpMaxDto.d.ts
*                DTO\GOdpRecDto.d.ts
*                DTO\GPolozkyMajDokladuDto.d.ts
*                DTO\GPrimDokladyDto.d.ts
*                DTO\GProdejniPrirazkyDto.d.ts
*                DTO\GProtokolOdpisuDto.d.ts
*                DTO\GProtokolOdpisuInputDto.d.ts
*                DTO\GProvedenyOdpisDto.d.ts
*                DTO\GSpCheckResultDto.d.ts
*                DTO\GTopologieDto.d.ts
*                DTO\GZkontrolujDanovyOdpisInputDto.d.ts
*                DTO\GZkontrolujDanovyOdpisOutputDto.d.ts
*                DTO\ReadersDTO\GReaderEkosdprDto.d.ts
*                DTO\ReadersDTO\GReaderMajcaodDto.d.ts
*                DTO\ReadersDTO\GReaderMajceodDto.d.ts
*                DTO\ReadersDTO\GReaderMajciodDto.d.ts
*                DTO\ReadersDTO\GReaderMajcktpDto.d.ts
*                DTO\ReadersDTO\GReaderMajcosmDto.d.ts
*                DTO\ReadersDTO\GReaderMajcpodDto.d.ts
*                DTO\ReadersDTO\GReaderMajcsodDto.d.ts
*                DTO\ReadersDTO\GReaderMajctdm.d.ts
*                DTO\ReadersDTO\GReaderMajctodDto.d.ts
*                DTO\ReadersDTO\GReaderMajctrpDto.d.ts
*                DTO\ReadersDTO\GReaderMajctskDto.d.ts
*                DTO\ReadersDTO\GReaderMajctvpDto.d.ts
*                DTO\ReadersDTO\GReaderMajcudpDto.d.ts
*                DTO\ReadersDTO\GReaderMajcvodDto.d.ts
*                DTO\ReadersDTO\GReaderMajcxodDto.d.ts
*                DTO\ReadersDTO\GReaderMajczodDto.d.ts
*                DTO\ReadersDTO\GReaderMajsvueDto.d.ts
*                Filtry\Gordic.Maj.Interface.FilterMajmaj.d.ts
*                Filtry\Gordic.Maj.Interface.FilterMajPid.d.ts
*                ISL\IGMajDokladPolozkaService.d.ts
*                Majetek\IGMajKartaService.d.ts
*                Majetek\IGMajObchodniMajetek.d.ts
*                Majetek\IGWflsesxMaj.d.ts
*                Majetek\Odpisy\IGMajOdpisService.d.ts
*                Ostatni\IGAgenda.d.ts
*                Ostatni\IGKniha.d.ts
*                Ostatni\IGPomocne.d.ts
*                RegistrNM\IGMajRegistrNM.d.ts
*                Stepan\GMajSmlDto.d.ts
*                Stepan\IGMajSml.d.ts
*                Zadosti\IGMajZadosti.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Gordic.Maj.Interface.Enums.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Výčet typů masek majetkových dokladů*/
	const enum GTypMaskyMajDokladu {
		/**Všechny masky*/
		Vsechny,
		/**Osobní*/
		Osobni,
		/**Veřejné*/
		Verejne,
		/**Pevné*/
		Pevne,
	}
	/**Výčet tabulek externí lokalizace majetku*/
	const enum GTabulkaMajsel {
		majsel1,
		majsel2,
		majsel3,
	}
	/**režimy dialogu registru Tzh*/
	const enum GMajEnumRezimyDialoguRegistru {
		modetzhKrtDok=0,
		modetzhKrt=10,
		modetzhObd=20,
		modetzhObdView=30,
		modetzhObdStorno=40,
		/**změna druhu z UU na Na*/
		modetzh2Na=50,
		/**změna druhu z UU na Na - storno*/
		modetzh2NaStorno=52,
		/**změna druhu z UU na Nv*/
		modetzh2Nv=60,
		/**změna druhu z UU na Nv - storno*/
		modetzh2NvStorno=62,
		/**změna druhu z Nm na Na*/
		modetzhNm2Na=70,
		/**změna druhu z Nm na Na - storno*/
		modetzhNm2NaStorno=72,
	}
	/**Výčet režimů přehledu TZH*/
	const enum GMajEnumRezimPrehleduTzh {
		/**Neurčeno*/
		neurceno=-1,
		/**Volitelně*/
		volitelne=0,
		/**Povinně*/
		povinne=10,
	}
	/**Výčet druhů záznamu v registru TZH*/
	const enum GMajEnumDruhZaznamuTzh {
		/**Neurčeno*/
		neurceno=-1,
		/**Uspořádací účet*/
		UU=0,
		/**Náklady*/
		NA=10,
		/**Nedokončený majetek*/
		NM=20,
		/**UU + NM*/
		UUaNM=12,
	}
	/**Výčet stavů v registru TZH*/
	const enum GMajEnumStavTzh {
		/**Neurčeno*/
		neurceno=-1,
		/**Připraveno*/
		pripraveno=0,
		/**Realizováno*/
		realizovano=10,
		/**Vyřazeno*/
		vyrazeno=20,
		/**Stornováno*/
		stornovano=90,
	}
	/**Vztah majetku k registru TZH*/
	const enum GMajEnumVztahKTzh {
		/**Neurčeno*/
		neurceno=0,
		/**Připraveno k realizaci*/
		pripraveno=10,
		/**Realizováno*/
		realizovano=20,
		/**Vyřazeno z realizace*/
		vyrazeno=30,
	}
	/**Stav žádosti ze SEM ( část číselníku VAS.MAJCCSV )*/
	const enum GMajEnumStavZadostiSEM {
		neurceno,
		pripraveno=10,
		rozpracovano=20,
		zpracovano=30,
		stornovano=90,
	}
	/**Stav reservace*/
	const enum GMajEnumStavReservace {
		neurceno=-1,
		ano=1,
		ne=0,
		castecna=2,
	}
	/**Druh přehledu majetku, vesměs podle MAJCAKT*/
	const enum GMajEnumDruhPrehleduMajetku {
		/**druh není specifikován - vše se řídí pouze přes filtry*/
		neurceno,
		/**nedokončený majetek (v pořízení)*/
		porizeni,
		/**v evidenci (aktivním užívání)*/
		evidence,
		vydany,
		vyrazeny,
		stornovany,
		/**návrh*/
		navrh,
		/**není ve fázi návrhu (používá se při hledání MAJ!)*/
		neni_navrh,
		/**Výběr evidovaného majetku a majetku ve stavu pořízení*/
		vyber1820,
		/**Výběr evidovaného majetku a stornovaného majetku (pro pohyb RozM)*/
		vyber2040,
	}
	/**Typ funkce manipulující s majetkem (DB par. maj_fun_pristup)*/
	const enum GMajEnumTypFunkce {
		/**Kompetent*/
		kompetent=4,
		/**Gen. kompetent*/
		gen_kompetent=5,
		/**Hospodář*/
		hospodar=1,
		/**niemann :o)*/
		nenastaveno=0,
	}
	/**Režim topologie majetku. Hodnoty pramaetru 'maj_ico_idtop'.*/
	const enum GMajEnumIdRezimTopologie {
		/**Klasický systém převodů majetku mezi více NKS*/
		NKS,
		/**Umožní převody mezi Evidenčními středisky. POZOR: Podmínkou je existence pouze jednoho NKS v rámci IČO.*/
		EVS,
	}
	/**Způsob rozpisu transferu*/
	const enum GMajEnumRozpisTransferu {
		/**-*/
		neurceno=0,
		/**transfer JE plně rozepsán na poskytovatele*/
		plne_rozepsan=10,
		/**transfer NENÍ plně rozepsán na poskytovatele*/
		neni_plne_rozepsan=20,
	}
	/**Způsob vedení MZ (VAS.MAJCMVM)*/
	const enum GMajEnumMetodaSkladu {
		/**AVG - arit. průměr*/
		AVG=0,
		/**fronta*/
		FIFO=10,
		/**stack*/
		LIFO=20,
	}
	/**Příznak inventarizované karty (VAS.MAJCSIN)*/
	const enum GMajEnumInvIn {
		/**(nevybráno)*/
		neurceno=-1,
		/**Ne*/
		ne=0,
		/**Ano*/
		ano=10,
	}
	/**Příznak povolení odpisu (VAS.MAJCEOD)*/
	const enum GMajEnumPriznakOdpisu {
		/**(nevybráno)*/
		neurceno=-1,
		/**Odpis není povolen*/
		nepovoleno=0,
		/**Odpis je povolen*/
		povoleno=10,
	}
	/**Druh odpisu (VAS.MAJCDOD)*/
	const enum GMajEnumDruhOdpisu {
		/**(nevybráno)*/
		neurceno=0,
		/**účetní*/
		ucetni=10,
		/**změna metody odepisování*/
		zmena_metody=12,
		/**daňový*/
		danovy=20,
	}
	/**Interval odpisu (VAS.MAJCIOD)*/
	const enum GMajEnumIntervalOdpisu {
		/**(nevybráno)*/
		neurceno=0,
		/**měsíční*/
		mesicni=10,
		/**čtvrtletní*/
		ctvrtletni=20,
		/**roční*/
		rocni=30,
	}
	/**Způsob provedení odpisu*/
	const enum GMajEnumZpusobOdpisu {
		/**plán*/
		plan=2,
		/**zkušební odpis*/
		zkusebni=1,
		/**ostrý odpis*/
		ostry=3,
	}
	/**Typ zaokrouhlení odpisu (VAS.MAJCZOD)*/
	const enum GMajEnumTypZaokrouhl {
		nahoru=0,
		matematicky=10,
		dolu=20,
	}
	/**Čas začátku odpisu  (VAS.MAJCSOD)*/
	const enum GMajEnumStartOdpisu {
		ihned=0,
		za_mesic=10,
	}
	/**Hodnota odpisu za roční období(VAS.MAJCPOD)*/
	const enum GMajEnumOdpisPomerHodnota {
		/**Plná roční sazba*/
		plna=0,
		/**Poměrná část odpovídající počtu měsíců v evidenci*/
		pomerna=10,
	}
	/**Definice výpočtu odpisu ve 12. měsíci období*/
	const enum GMajEnumOdpis12tyMesic {
		/**Dorovnání do plné roční sazby*/
		plne_dorovnani=0,
		/**Bez dorovnání do plné roční sazby*/
		bez_dorovnani=10,
	}
	/**Přesnost odpisu (VAS.MAJCXOD)*/
	const enum GMajEnumOdpisu {
		/**Dorovnání do plné roční sazby*/
		mesic=0,
		/**Bez dorovnání do plné roční sazby*/
		den=10,
	}
	/**Obecný výčet ANO/NE/nevybráno*/
	const enum GMajEnumAnoNe {
		/**(nevybráno)*/
		neurceno=-1,
		/**ANO = 1*/
		ano=1,
		/**NE = 0*/
		ne=0,
	}
	/**Stav odpisování majetku*/
	const enum GMajEnumStavOdpisovani {
		/**(nevybráno)*/
		neurceno=0,
		/**Plně odepsán*/
		odepsan=10,
		/**Odpis probíhá*/
		probiha_odpis=20,
		/**Připraveno k odpisu*/
		pripravovano=30,
	}
	/**Typ objektu při výběru RP majetku*/
	const enum GMajEnumTypObjRP {
		/**(nevybráno)*/
		neurceno=0,
		/**Parcela*/
		parcela=10,
		/**Budova*/
		budova=20,
		/**Jednotka*/
		jednotka=40,
	}
	/**Režim pohledu na knihy*/
	const enum GMajRezimKnihy {
		/**pohled na aktuálně vybranou knihu*/
		aktualni=0,
		/**pohled na všechny knihy*/
		vsechny=10,
		/**pohled na všechny knihy aktuálního roku*/
		knihy_akt_roku=12,
	}
	/**Stavy evidence v knize*/
	const enum GMajStavEvidence {
		/**Evidované*/
		evidovane=10,
		/**Neevidované*/
		neevidovane=20,
		/**Aktuálně evidované*/
		aktualne_evidovane=30,
		/**Přeevidované z*/
		preevidovane_z=40,
		/**Přeevidované do*/
		preevidovane_do=50,
		/**Původní*/
		puvodni=60,
	}
	/**Typ přístupu (VAS.GINCTYA)*/
	const enum GMajTypPristup {
		/**Jen ke čtení*/
		RO=0,
		/**Povoleny úpravy*/
		RW=10,
	}
	/**Režim proúčtování dokladu (DB parametr maj_prouct_dok)*/
	const enum GMajEnumRezimProuctovaniDkl {
		/**automatický, tzn. při schválení dokladu se ihned provede i vygenerování účetních zápisů 
		*     a jejich proúčtování do deníku účetních zápisů. Nejsou tudíž rozlišeny úrovně přístupových práv schvalování a účtování.
		*/
		automat,
		/**poloautomatický, tzn. po schválení přejde doklad do stavu, umožňujícího proúčtování. 
		*     Pro uživatele s úrovní přístupových práv účtování a výše se zpřístupní proúčtování dokladu, 
		*     pro uživatele s úrovní přístupových práv schvalování (a nižší) se proúčtování dokladu nezpřístupní.
		*/
		poloautomat,
	}
	/**Režim proúčtování dokladu (DB parametr maj_prouct_dok)*/
	const enum GMajEnumRezimImplementace {
		/**dokladový režim*/
		doklad,
		/**kartový režim*/
		karta,
	}
	/**Typ instalace databáze. V podstatě se jedná o hodnoty DB parametru 'gin_typ_inst'*/
	const enum GMajEnumGinTypInst {
		/**???*/
		LOC,
		/**samostatná*/
		SAM,
		/**decentrální*/
		DEC,
		/**centrální*/
		CEN,
	}
	/**Hodnoty parametru maj_maj_sort*/
	const enum GMajEnumMajMajSort {
		/**Třídění podle inventárního čísla*/
		INV_CIS,
		/**třídění podle materiálového a inventárního čísla*/
		MAT_INV_CIS,
	}
	/**Hodnoty parametru maj_maj_fillnks*/
	const enum GMajEnumMajMajFillNks {
		/**Vlastní NKS se nepředplní do výběrové masky majetku*/
		ne=0,
		/**Vlastní NKS se automaticky předplní do výběrové masky majetku*/
		ano=1,
		/**Vlastní NKS a UCS se automaticky předplní do výběrové masky majetku bez možnosti změny*/
		ano_vzdy=2,
	}
	/**Hodnoty parametru maj_esu_vtab*/
	const enum GMajEnumChovaniVlastnichESU {
		/**Vlastní externí subjekty se chovají jako vlastní ve všech agendách*/
		spolecne,
		/**Vlastní externí subjekty se chovají jako vlastní jen v agendě, ve které byly pořízeny.*/
		agendove,
	}
	/**Hodnoty parametru maj_esu_vtyp*/
	const enum GMajEnumTypVlastnichESU {
		/**Vlastní externí subjekty jsou subjekty, pořízené uživateli v aktuální agendové knize.*/
		kniha,
		/**Vlastní externí subjekty jsou subjekty, pořízené funkcí aktuálně přihlášeného uživatele.*/
		funkce,
		/**Vlastní externí subjekty jsou subjekty, pořízené osobou aktuálního uživatele (kteroukoli z funkcí přiřazených k jeho osobě).*/
		osoba,
		/**Vlastní externí subjekty jsou subjekty, pořízené všemi uživateli, příslušejícími k aktuálnímu spisovému uzlu.*/
		uzel,
	}
	/**Hodnoty DB parametru 'maj_dok_prizps' - režim zadání párovacího symbolu.*/
	const enum GMajEnumRezimZadavaniPsFak {
		/**Nepovinné zadání párovacího symbolu.*/
		ne=0,
		/**Povinné zadání párovacího symbolu*/
		povinna_vazba=1,
		/**Zadání párovacího symbolu není povinné.*/
		volna_vazba=2,
	}
	/**Hodnoty parametru maj_bnd_majren*/
	const enum GMajEnumVazbaNaREN {
		/**Vazba RP na REN nepovolena*/
		ne=0,
		/**Vazba RP na REN01 povolena*/
		ano_ren01=1,
		/**Vazba RP na REN02 povolena*/
		ano_ren02=2,
	}
	/**Hodnoty parametru maj_def_acag*/
	const enum GMajEnumZpusobDefiniceAcAg {
		/**Agendové číslo dokladu je totožné s agendovým číslem*/
		ac,
		/**Agendové číslo dokladu je definováno manuálně*/
		manual,
		/**Agendové číslo dokladu je definováno automatizovaně na základě řady agendových čísel*/
		rada,
	}
	/**Hodnoty parametru maj_dok_frmps*/
	const enum GMajEnumFormatPsFak {
		/**Formát obsahu PS není kontrolován. Může obsahovat libovolný znak*/
		libovolny=0,
		pouze_cislice=1,
		pouze_pismena=2,
	}
	/**Hodnoty parametru maj_def_bndpec*/
	const enum GMajEnumTypZavislostiVlastnostiPol {
		/**Vlastnosti položek evidenční karty jsou závislé na aktuální hodnotě účetního střediska.*/
		ucs=0,
		/**Vlastnosti položek evidenční karty jsou závislé na funkci aktuálního uživatele modulu MAJ.*/
		fun=1,
	}
	/**Hodnoty parametru maj_dok_nazpos*/
	const enum GMajEnumPoradiNazvu {
		/**Normální - Pořadí sloupců s názvy karty je Název, Technický název.*/
		nazev_technazev=0,
		/**Reverzní - Pořadí sloupců s názvy karty je Technický název, Název.*/
		technazev_nazev=1,
	}
	/**Hodnoty parametru maj_rez_gnidpri*/
	const enum GMajEnumRezimGenerIdPrisls {
		/**Identifikátor příslušenství majetku je tvořen shodně jako inventární číslo*/
		jako_invcis=0,
		/**Identifikátor příslušenství majetku je zadáván manuálně*/
		manualne=1,
	}
	/**Hodnoty parametru maj_ico_odcuszh*/
	const enum GMajEnumAlgOdpisuDM {
		/**Odpis a časové rozlišení transferu je počítáno z rozdílu zůstatkové ceny a zbytkové hodnoty.*/
		varianta_A=0,
		/**Odpis a časové rozlišení transferu je počítáno pouze ze zůstatkové ceny.*/
		varianta_B=1,
	}
	/**Hodnoty parametru maj_ico_odcusop*/
	const enum GMajEnumAlgOpravek {
		/**Dooprávkování v rámci ZMO se provede plně v souladu s bodem 7.3.2 ČÚS 708*/
		cus708=0,
		/**V rámci ZMO nedojde ke změně stávající oprávky*/
		beze_zmeny=1,
	}
	/**Hodnoty parametru inm_mod_setexpk*/
	const enum GMajEnumInmRezimPrepisuKarty {
		/**Přepis údajů o inventarizaci karty proběhne vždy.*/
		prepsat=0,
		/**Přepis údajů o inventarizaci karty proběhne dle výsledku odpovědi uživatele na dotaz.*/
		rozhodne_uzivatel=1,
		/**Údaje o inventarizaci karty jsou vždy zachovány.*/
		neprepsat=2,
	}
	/**Režim motoru UCT*/
	const enum GMajEnumRezimUctMotoru {
		/**účtuje*/
		uctuje=0,
		/**kontroluje proti rozvrhu*/
		kontroluje=1,
	}
	/**Stav inventarizace*/
	const enum GMajEnumStavInventarizace {
		/**neurčeno*/
		neurceno=0,
		/**zahájeno*/
		zahajeno=10,
		/**ukončeno*/
		ukonceno=20,
	}
	/**Příznak komunikace s IISSP*/
	const enum GMajEnumIsspKomunikace {
		/**nekomunikujeme s IISSP*/
		ne=0,
		/**komunikujeme s IISSP - pasivní varianta EDS/SMVS*/
		pasivni_varianta=1,
		/**komunikujeme s IISSP - aktivní varianta EDS/SMVS*/
		aktivni_varianta=2,
	}
	/**Časový režim rezervace IISSP*/
	const enum GMajEnumRezimRezervaceIssp {
		jednolety=0,
		vicelety=10,
	}
	/**Mód pořizovače MAJ dokladů*/
	const enum GMajEnumModPorizovace {
		prohlizeni=0,
		/**režim nuceného podání dokladu*/
		podani=2,
		/**režim nuceného podání s kartama v bufferu*/
		nucene_podani_buff=21,
		/**režim nuceného podání - zpracování žádostí o založení dokladu*/
		nucene_podani_zadost=22,
		/**převzetí dokladu z WFL*/
		prevzeti_z_WFL=4,
	}
	/**356.3 20.02.07 režim čtení údajů o žádosti*/
	const enum GMajEnumRezimCteniZadostiSEM {
		podleID=0,
		podleIXP=10,
	}
	/**Výčet hodnot parametru "maj_rad_idmgen" (způsob zadání jednotného neměnného identifikátoru majetku)*/
	const enum GMajEnumIdmGenMode {
		/**Jednotný neměnný identifikátor majetku je zadán manuálně při pořízení nového majetku*/
		manualne=0,
		/**Jednotný neměnný identifikátor majetku je generován ve tvaru provotního identifikátoru*/
		pid=1,
		/**Jednotný neměnný identifikátor majetku je generován dle pravidel přidělené řady*/
		subrada=2,
	}
	/**Speciální režim obsluhy EČ - hodnoty parametru MAJ_RAD_SREZEC*/
	const enum GMajEnumSpecRezimEviCis {
		/**Speciální režim obsluhy EČ není povolen*/
		ne=0,
		/**Speciální režim obsluhy EČ je povolen a umožní automatické generování EČ u veškerého unikátního majetku*/
		automaticke_generovani=1,
		/**Speciální režim obsluhy EČ je povolen a umožní generování EČ na vyžádání uživatelem*/
		generovani_na_vyzadani=2,
		/**Speciální režim obsluhy EČ je povolen a umožní standardní obsluhu EČ*/
		standardni_obsluha=3,
	}
	/**Příznak sazby či koeficientu odpisu*/
	const enum GMajEnumOdpSazbaKoef {
		neurceno=0,
		/**sazba*/
		sazba=10,
		/**koeficient*/
		koef=20,
	}
	/**Typ subjektu, který si majetek zapůjčil*/
	const enum GMajEnumTypSubjektuZapujceni {
		neurceno=0,
		/**NS*/
		NKS=20,
		/**referent*/
		referent=10,
	}
	/**Typ klasifikace*/
	const enum GMajEnumTypKlasifikace {
		/**SKP*/
		SKP=0,
		/**CZ-CC*/
		CZ_CC=1,
		/**KPOZ*/
		KPOZ=2,
		/**CZ_CPA*/
		CZ_CPA=3,
		/**Vše*/
		VSE=24,
	}
	/**Enum pro permissions*/
	const enum GMajEnumStavyDokladuPolozkyPohybu {
		/**nezadaný enum*/
		ng_null=-1,
		/**!vložení prvků do souboru*/
		ng_operSouIn=1,
		/**!vyjmutí prvků ze souboru*/
		ng_operSouOut=2,
		/**!návrh dokladu*/
		ng_sdNavrh=10,
		/**!zapůjčení majetku*/
		ng_operPuj=11,
		/**!Vrácení zapůjčeného majetku*/
		ng_operPujRet=12,
		/**V pořízení*/
		ng_majaktPor=18,
		/**!evidence dokladu*/
		ng_sdEvidence=20,
		/**!doklad připraven k proúčtování*/
		ng_sdBeforeUct=30,
		/**!doklad proúčtování*/
		ng_sdAfterUct=40,
		/**!doklad proúčtování*/
		ng_sdClose=50,
		/**!doklad stornován*/
		ng_sdStorno=90,
		/**!neurčeno*/
		ng_typdokNone=0,
		/**!příjem*/
		ng_typdokP=100,
		/**!aktivace vyřazeného*/
		ng_typdokAktVyr=102,
		/**!zařazení majetku do užívání ze stavu Pořízení*/
		ng_typdokZarUzi=110,
		/**!příjem převodem*/
		ng_typdokPP=120,
		/**!příjem pro jiné NKS*/
		ng_typdokPNKS=140,
		/**!výdej MZ do operativní evidence*/
		ng_typdokVMzOe=150,
		/**!výdej externímu subjektu*/
		ng_typdokV=200,
		/**!likvidace*/
		ng_typdokVL=201,
		/**!výdej převodem*/
		ng_typdokVP=220,
		/**!změna hodnot = interní - druh,SuAu*/
		ng_typdokZ=300,
		/**!změna hodnot = interní - skupina*/
		ng_typdokZSk=305,
		/**!změna hodnot = interní - druh evidence*/
		ng_typdokZDev=306,
		/**!změna hodnot = interní - topologie*/
		ng_typdokZTop=307,
		/**!vložení do soupravy*/
		ng_typdokSIn=310,
		/**!sloučení majetku*/
		ng_typdokSlcM=312,
		/**!vyjmutí ze soupravy*/
		ng_typdokSOut=320,
		/**!rozdělení majetku*/
		ng_typdokRozM=322,
		/**!reservace = zápůjčka externí*/
		ng_typdokResZap=330,
		/**!reservace = zápůjčka interní*/
		ng_typdokResZapI=332,
		/**!reservace = do opravy*/
		ng_typdokResOpT=335,
		/**!reservace = vrácení zápůjčky*/
		ng_typdokResRet=340,
		/**!reservace = vrácení zápůjčky*/
		ng_typdokResRetI=342,
		/**!reservace = vrácení z opravy*/
		ng_typdokResOpF=345,
		/**!změna ceny +*/
		ng_typdokZcPlus=350,
		/**!změna ceny -*/
		ng_typdokZcMinus=355,
		/**!příznak možného technického zhodnocení - registr TZH*/
		ng_typdokRegTzh=360,
		/**!technické zhodnocení*/
		ng_typdokTzh=362,
		/**!změna druhu v registru TZH na Náklady*/
		ng_typdokRegTzh2Na=364,
		/**!změna druhu v registru TZH na Nedokončenou výrobu*/
		ng_typdokRegTzh2Nv=365,
		/**!změna druhu v registru TZH z NM na Náklady*/
		ng_typdokRegTzhNm2Na=366,
		/**!účetní odpis*/
		ng_typdokUO=370,
		/**!účetní změna metody odpisování*/
		ng_typdokUZMO=371,
		/**!daňový odpis*/
		ng_typdokDO=372,
		/**!individuální účetní odpis*/
		ng_typdokIUO=374,
		/**!interní žádanka*/
		ng_typdokIZad=380,
		/**!interní požadavek*/
		ng_typdokIPoz=382,
	}
	/**Kategorie knihy*/
	const enum GMajEnumKtgDen {
		/**Kniha dokladů účtování majetku*/
		KnihaDokladuUctovaniMajetku=1200,
		/**kniha opravných dokladů účtování majetku*/
		KnihaOpravnychDokladuUctovaniMajetku=1210,
		/**kniha materiálových dokladů*/
		KnihaMaterialovychDokladu=1260,
	}
	interface enumTools {
	}
	const enum enumToolsNames {}
	const enum enumToolsFragments {}
	const enum enumToolsTypes {}
	const enum enumToolsTypeLengths {}
	const enum GMajEnumTypOkna {
		/**frm pořizovače MUD*/
		ng_wMudPor=1,
		/**frm kartotéky majetku v evidenci*/
		ng_wMajKartEvi=10,
		/**frm kartotéky majetku vyřazeného*/
		ng_wMajKartVyr=11,
		/**frm kartotéky majetku - soubory*/
		ng_wMajKartSou=12,
		/**frm kartotéky majetku po skupinách*/
		ng_wMajKartSkp=13,
		/**frm kartotéky zapůjčeného majetku*/
		ng_wMajKartRes=14,
		/**frm kartotéky majetku vydaného*/
		ng_wMajKartVyd=15,
		/**frm kartotéky majetku stornovaného*/
		ng_wMajKartStorno=16,
		/**frm kartotéky majetku ve stavu pořízení*/
		ng_wMajKartPor=17,
		/**frm kartotéky majetku s kartama v poznámkovém bloku*/
		ng_wMajKartPoznBlok=18,
		/**frm deníku MUD*/
		ng_wMudDen=1260,
	}
	const enum GMajEnumPriznakInventarizaceKarty {
		/**Není příznak*/
		ng_invinNone=-1,
		/**Karta není inventarizována*/
		ng_invinNo=0,
		/**Karta je inventarizována*/
		ng_invinYes=10,
	}
	/**Stavy majetkové karty*/
	const enum GMajEnumStavyKarty {
		/**ng_majaktNone*/
		neurceno=0,
		/**ng_majaktNavrh*/
		navrh=10,
		/**ng_majaktPor*/
		vPorizeni=18,
		/**ng_majaktEvi*/
		evidence=20,
		/**ng_majaktVyr*/
		vyrazeno=30,
		/**ng_majaktVyd*/
		vydano=35,
		/**ng_majaktStorno*/
		storno=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Gordic.Maj.Interface.IGMajetek.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GItemSettingsDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GItemSettingsDto {
		/**DBCOLUMN:Seznam.pol_id*/
		pol_id?: number|null;
		/**DBCOLUMN:Seznam.db_nazev*/
		db_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.priz_ded*/
		priz_ded?: number|null;
		/**DBCOLUMN:Seznam.priz_edit*/
		priz_edit?: number|null;
		/**DBCOLUMN:Seznam.priz_edit_txt*/
		priz_edit_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_edit_dok*/
		priz_edit_dok?: number|null;
		/**DBCOLUMN:Seznam.priz_edit_dok_txt*/
		priz_edit_dok_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_vp*/
		priz_vp?: number|null;
		/**DBCOLUMN:Seznam.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:Seznam.priz_pov_txt*/
		priz_pov_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_vid*/
		priz_vid?: number|null;
		/**DBCOLUMN:Seznam.priz_vid_txt*/
		priz_vid_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_num*/
		priz_num?: number|null;
		/**DBCOLUMN:Seznam.priz_odp*/
		priz_odp?: number|null;
		/**DBCOLUMN:Seznam.s_inst*/
		s_inst?: number|null;
		/**DBCOLUMN:Seznam.s_inst_txt*/
		s_inst_txt?: string|null;
		/**DBCOLUMN:Seznam.col_pos*/
		col_pos?: number|null;
		/**DBCOLUMN:Seznam.priz_com*/
		priz_com?: number|null;
		/**DBCOLUMN:Seznam.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:Seznam.priz_zvyr*/
		priz_zvyr?: number|null;
		/**DBCOLUMN:Seznam.priz_zvyr_txt*/
		priz_zvyr_txt?: string|null;
		/**Sloupec tabulky v databázi*/
		db_col?: string|null;
	}
	const enum GItemSettingsDtoNames { pol_id = "pol_id", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", priz_ded = "priz_ded", priz_edit = "priz_edit", priz_edit_txt = "priz_edit_txt", priz_edit_dok = "priz_edit_dok", priz_edit_dok_txt = "priz_edit_dok_txt", priz_vp = "priz_vp", priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt", priz_vid = "priz_vid", priz_vid_txt = "priz_vid_txt", priz_num = "priz_num", priz_odp = "priz_odp", s_inst = "s_inst", s_inst_txt = "s_inst_txt", col_pos = "col_pos", priz_com = "priz_com", priz_dph = "priz_dph", priz_zvyr = "priz_zvyr", priz_zvyr_txt = "priz_zvyr_txt", db_col = "db_col",}
	const enum GItemSettingsDtoFragments { pol_id = "*", db_nazev = "*", nazev = "*", zkratka = "*", priz_ded = "*", priz_edit = "*", priz_edit_txt = "*", priz_edit_dok = "*", priz_edit_dok_txt = "*", priz_vp = "*", priz_pov = "*", priz_pov_txt = "*", priz_vid = "*", priz_vid_txt = "*", priz_num = "*", priz_odp = "*", s_inst = "*", s_inst_txt = "*", col_pos = "*", priz_com = "*", priz_dph = "*", priz_zvyr = "*", priz_zvyr_txt = "*", db_col = "*",}
	const enum GItemSettingsDtoTypes { pol_id = "number", db_nazev = "string", nazev = "string", zkratka = "string", priz_ded = "number", priz_edit = "number", priz_edit_txt = "string", priz_edit_dok = "number", priz_edit_dok_txt = "string", priz_vp = "number", priz_pov = "number", priz_pov_txt = "string", priz_vid = "number", priz_vid_txt = "string", priz_num = "number", priz_odp = "number", s_inst = "number", s_inst_txt = "string", col_pos = "number", priz_com = "number", priz_dph = "number", priz_zvyr = "number", priz_zvyr_txt = "string", db_col = "string",}
	const enum GItemSettingsDtoTypeLengths { db_nazev = 20, nazev = 20, zkratka = 16, priz_edit_txt = 20, priz_edit_dok_txt = 20, priz_pov_txt = 20, priz_vid_txt = 20, s_inst_txt = 20, priz_zvyr_txt = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GKrtSeznamRefDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GKrtSeznamRefDto {
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:Seznam.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.oc*/
		oc?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_txt*/
		ixs_su_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Seznam.mail*/
		mail?: string|null;
		/**DBCOLUMN:Seznam.tel*/
		tel?: string|null;
		/**DBCOLUMN:Seznam.tel_privat*/
		tel_privat?: string|null;
		/**DBCOLUMN:Seznam.tel_mobil*/
		tel_mobil?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.typ_zodp*/
		typ_zodp?: number|null;
		/**DBCOLUMN:Seznam.typ_zodp_txt*/
		typ_zodp_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_tyz*/
		ixs_tyz?: string|null;
		/**ixs_maj*/
		ixs_maj?: string|null;
	}
	const enum GKrtSeznamRefDtoNames { ixs_ref = "ixs_ref", nazev = "nazev", tit_pred = "tit_pred", tit_za = "tit_za", jmeno = "jmeno", prijmeni = "prijmeni", oc = "oc", ixs_su_txt = "ixs_su_txt", ixs_su = "ixs_su", mail = "mail", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", typ_zodp = "typ_zodp", typ_zodp_txt = "typ_zodp_txt", dat_od = "dat_od", dat_do = "dat_do", ixs_tyz = "ixs_tyz", ixs_maj = "ixs_maj",}
	const enum GKrtSeznamRefDtoFragments { ixs_ref = "*", nazev = "*", tit_pred = "*", tit_za = "*", jmeno = "*", prijmeni = "*", oc = "*", ixs_su_txt = "*", ixs_su = "*", mail = "*", tel = "*", tel_privat = "*", tel_mobil = "*", zkratka = "*", poznamka = "*", aktivita = "*", typ_zodp = "*", typ_zodp_txt = "*", dat_od = "*", dat_do = "*", ixs_tyz = "*", ixs_maj = "*",}
	const enum GKrtSeznamRefDtoTypes { ixs_ref = "string", nazev = "string", tit_pred = "string", tit_za = "string", jmeno = "string", prijmeni = "string", oc = "string", ixs_su_txt = "string", ixs_su = "string", mail = "string", tel = "string", tel_privat = "string", tel_mobil = "string", zkratka = "string", poznamka = "string", aktivita = "number", typ_zodp = "number", typ_zodp_txt = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_tyz = "string", ixs_maj = "string",}
	const enum GKrtSeznamRefDtoTypeLengths { ixs_ref = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajCommonReportDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO běžného reportu*/
	interface GMajCommonReportDto {
		/**klíč*/
		id?: number|null;
		text1?: string|null;
		text2?: string|null;
		text3?: string|null;
		num1?: number|null;
		num2?: number|null;
		num3?: number|null;
	}
	const enum GMajCommonReportDtoNames { id = "id", text1 = "text1", text2 = "text2", text3 = "text3", num1 = "num1", num2 = "num2", num3 = "num3",}
	const enum GMajCommonReportDtoFragments { id = "*", text1 = "*", text2 = "*", text3 = "*", num1 = "*", num2 = "*", num3 = "*",}
	const enum GMajCommonReportDtoTypes { id = "number", text1 = "string", text2 = "string", text3 = "string", num1 = "number", num2 = "number", num3 = "number",}
	const enum GMajCommonReportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajldpdDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majldpd*/
	interface GMajldpdDto {
		/**DBCOLUMN:majldpd.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:majldpd.rok*/
		rok?: number|null;
		/**DBCOLUMN:majldpd.typ_zm_dph*/
		typ_zm_dph?: number|null;
		/**DBCOLUMN:majldpd.dat_zm_dph*/
		dat_zm_dph?: JsonDate|null;
		/**DBCOLUMN:majldpd.koef_dph*/
		koef_dph?: JsonDecimal|null;
		/**DBCOLUMN:majldpd.c_dph_odpocet*/
		c_dph_odpocet?: JsonDecimal|null;
		/**DBCOLUMN:majldpd.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:majldpd.kod_vyu*/
		kod_vyu?: number|null;
		/**DBCOLUMN:majldpd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majldpd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majldpd.ico*/
		ico?: string|null;
	}
	const enum GMajldpdDtoNames { inv_cis = "inv_cis", rok = "rok", typ_zm_dph = "typ_zm_dph", dat_zm_dph = "dat_zm_dph", koef_dph = "koef_dph", c_dph_odpocet = "c_dph_odpocet", c_dph = "c_dph", kod_vyu = "kod_vyu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico",}
	const enum GMajldpdDtoFragments { inv_cis = "*", rok = "*", typ_zm_dph = "*", dat_zm_dph = "*", koef_dph = "*", c_dph_odpocet = "*", c_dph = "*", kod_vyu = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*",}
	const enum GMajldpdDtoTypes { inv_cis = "string", rok = "number", typ_zm_dph = "number", dat_zm_dph = "JsonDate", koef_dph = "JsonDecimal", c_dph_odpocet = "JsonDecimal", c_dph = "JsonDecimal", kod_vyu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string",}
	const enum GMajldpdDtoTypeLengths { inv_cis = 50, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajProdejDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**record údajů o prodeji majetku { cfc_MajProdej }*/
	interface GMajProdejDto {
		/**datum rozhodnutí o prodeji - odpovídá datumu UUP*/
		dat_rop?: JsonDate|null;
		/**datum uvažovaného prodeje*/
		dat_pro?: JsonDate|null;
		/**měna, v níž bude majetek odprodán*/
		mena?: number|null;
		/**uvažovaná prodejní částka v měně*/
		c_mena_real?: JsonDecimal|null;
		poznamka?: string|null;
		/**stav záznamu - hodnoty odpovídají stavu karty*/
		mp_stav?: number|null;
		typ_zdroj?: string|null;
	}
	const enum GMajProdejDtoNames { dat_rop = "dat_rop", dat_pro = "dat_pro", mena = "mena", c_mena_real = "c_mena_real", poznamka = "poznamka", mp_stav = "mp_stav", typ_zdroj = "typ_zdroj",}
	const enum GMajProdejDtoFragments { dat_rop = "*", dat_pro = "*", mena = "*", c_mena_real = "*", poznamka = "*", mp_stav = "*", typ_zdroj = "*",}
	const enum GMajProdejDtoTypes { dat_rop = "JsonDate", dat_pro = "JsonDate", mena = "number", c_mena_real = "JsonDecimal", poznamka = "string", mp_stav = "number", typ_zdroj = "string",}
	const enum GMajProdejDtoTypeLengths { poznamka = 50, typ_zdroj = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajsdinDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsdin*/
	interface GMajsdinDto {
		/**DBCOLUMN:majsdin.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majsdin.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:majsdin.di*/
		di?: string|null;
		/**DBCOLUMN:majsdin.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsdin.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsdin.typ_di*/
		typ_di?: string|null;
		zmenu_prov_txt?: string|null;
	}
	const enum GMajsdinDtoNames { ixs_maj = "ixs_maj", por_cislo = "por_cislo", di = "di", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_di = "typ_di", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GMajsdinDtoFragments { ixs_maj = "*", por_cislo = "*", di = "*", dat_zmena = "*", zmenu_prov = "*", typ_di = "*", zmenu_prov_txt = "*",}
	const enum GMajsdinDtoTypes { ixs_maj = "string", por_cislo = "number", di = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_di = "string", zmenu_prov_txt = "string",}
	const enum GMajsdinDtoTypeLengths { ixs_maj = 12, di = 254, zmenu_prov = 12, typ_di = 12, zmenu_prov_txt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajsresDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajsresDto {
		/**DBCOLUMN:Seznam.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.pmj*/
		pmj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.subjekt_txt*/
		subjekt_txt?: string|null;
		/**DBCOLUMN:Seznam.subjekt*/
		subjekt?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_res*/
		typ_res?: number|null;
		/**DBCOLUMN:Seznam.typ_res_txt*/
		typ_res_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_res*/
		stav_res?: number|null;
		/**DBCOLUMN:Seznam.stav_res_txt*/
		stav_res_txt?: string|null;
		/**DBCOLUMN:Seznam.druh_res_txt*/
		druh_res_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_res*/
		dat_res?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_termin*/
		dat_termin?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vraceni*/
		dat_vraceni?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ser_cis*/
		ser_cis?: number|null;
	}
	const enum GMajsresDtoNames { ixs_maj = "ixs_maj", ser_cislo = "ser_cislo", pmj = "pmj", c = "c", subjekt_txt = "subjekt_txt", subjekt = "subjekt", prevzal_txt = "prevzal_txt", typ_res = "typ_res", typ_res_txt = "typ_res_txt", stav_res = "stav_res", stav_res_txt = "stav_res_txt", druh_res_txt = "druh_res_txt", dat_res = "dat_res", dat_termin = "dat_termin", dat_vraceni = "dat_vraceni", ixp = "ixp", ser_cis = "ser_cis",}
	const enum GMajsresDtoFragments { ixs_maj = "*", ser_cislo = "*", pmj = "*", c = "*", subjekt_txt = "*", subjekt = "*", prevzal_txt = "*", typ_res = "*", typ_res_txt = "*", stav_res = "*", stav_res_txt = "*", druh_res_txt = "*", dat_res = "*", dat_termin = "*", dat_vraceni = "*", ixp = "*", ser_cis = "*",}
	const enum GMajsresDtoTypes { ixs_maj = "string", ser_cislo = "number", pmj = "JsonDecimal", c = "JsonDecimal", subjekt_txt = "string", subjekt = "string", prevzal_txt = "string", typ_res = "number", typ_res_txt = "string", stav_res = "number", stav_res_txt = "string", druh_res_txt = "string", dat_res = "JsonDate", dat_termin = "JsonDate", dat_vraceni = "JsonDate", ixp = "string", ser_cis = "number",}
	const enum GMajsresDtoTypeLengths { ixs_maj = 12, subjekt = 12, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajtbufDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majtbuf*/
	interface GMajtbufDto {
		/**DBCOLUMN:majtbuf.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:majtbuf.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majtbuf.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:majtbuf.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:majtbuf.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:majtbuf.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:majtbuf.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:majtbuf.inv_cis*/
		inv_cis?: string|null;
	}
	const enum GMajtbufDtoNames { log_por_cislo = "log_por_cislo", ixs_maj = "ixs_maj", poradi = "poradi", m = "m", c = "c", ser_cislo = "ser_cislo", ikc = "ikc", inv_cis = "inv_cis",}
	const enum GMajtbufDtoFragments { log_por_cislo = "*", ixs_maj = "*", poradi = "*", m = "*", c = "*", ser_cislo = "*", ikc = "*", inv_cis = "*",}
	const enum GMajtbufDtoTypes { log_por_cislo = "number", ixs_maj = "string", poradi = "number", m = "JsonDecimal", c = "JsonDecimal", ser_cislo = "number", ikc = "JsonDecimal", inv_cis = "string",}
	const enum GMajtbufDtoTypeLengths { ixs_maj = 12, inv_cis = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GMajxpocDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajxpocDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:Seznam.skp*/
		skp?: string|null;
		/**DBCOLUMN:Seznam.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_skp*/
		nazev_skp?: string|null;
		/**DBCOLUMN:Seznam.dat_por*/
		dat_por?: JsonDate|null;
		/**DBCOLUMN:Seznam.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:Seznam.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:Seznam.drh_zkr*/
		drh_zkr?: string|null;
	}
	const enum GMajxpocDtoNames { ixp = "ixp", ser_cislo = "ser_cislo", kod_poh = "kod_poh", skp = "skp", ueab_evi = "ueab_evi", mj = "mj", m = "m", c = "c", inv_cis = "inv_cis", vyr_cis = "vyr_cis", nazev = "nazev", nazev_skp = "nazev_skp", dat_por = "dat_por", evi_cis = "evi_cis", dat_vyr = "dat_vyr", lic = "lic", skupina_zkr = "skupina_zkr", drh_zkr = "drh_zkr",}
	const enum GMajxpocDtoFragments { ixp = "*", ser_cislo = "*", kod_poh = "*", skp = "*", ueab_evi = "*", mj = "*", m = "*", c = "*", inv_cis = "*", vyr_cis = "*", nazev = "*", nazev_skp = "*", dat_por = "*", evi_cis = "*", dat_vyr = "*", lic = "*", skupina_zkr = "*", drh_zkr = "*",}
	const enum GMajxpocDtoTypes { ixp = "string", ser_cislo = "number", kod_poh = "number", skp = "string", ueab_evi = "string", mj = "string", m = "JsonDecimal", c = "JsonDecimal", inv_cis = "string", vyr_cis = "string", nazev = "string", nazev_skp = "string", dat_por = "JsonDate", evi_cis = "string", dat_vyr = "JsonDate", lic = "string", skupina_zkr = "string", drh_zkr = "string",}
	const enum GMajxpocDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GPohybyMajDokladuDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GPohybyMajDokladuDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:Seznam.typ_dok*/
		typ_dok?: number|null;
		/**DBCOLUMN:Seznam.typ_dok_zkr*/
		typ_dok_zkr?: string|null;
		/**DBCOLUMN:Seznam.dev*/
		dev?: number|null;
		/**DBCOLUMN:Seznam.dev_zkr*/
		dev_zkr?: string|null;
		/**DBCOLUMN:Seznam.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:Seznam.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:Seznam.por_poh*/
		por_poh?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ser_pcislo*/
		ser_pcislo?: number|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_poh*/
		typ_poh?: number|null;
		/**DBCOLUMN:Seznam.druh_poh*/
		druh_poh?: number|null;
		/**DBCOLUMN:Seznam.druh_poh_zkr*/
		druh_poh_zkr?: string|null;
		/**DBCOLUMN:Seznam.dat_poh*/
		dat_poh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uct*/
		dat_uct?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.tka*/
		tka?: number|null;
		/**DBCOLUMN:Seznam.mp_stav*/
		mp_stav?: number|null;
		/**DBCOLUMN:Seznam.mp_stav_zkr*/
		mp_stav_zkr?: string|null;
		/**DBCOLUMN:Seznam.st_stav*/
		st_stav?: number|null;
		/**DBCOLUMN:Seznam.status_com*/
		status_com?: number|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cmj*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.skp*/
		skp?: string|null;
		/**DBCOLUMN:Seznam.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:Seznam.ueab_por*/
		ueab_por?: string|null;
		/**DBCOLUMN:Seznam.ueab_opr*/
		ueab_opr?: string|null;
		/**DBCOLUMN:Seznam.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:Seznam.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:Seznam.trida*/
		trida?: string|null;
		/**DBCOLUMN:Seznam.ser_hst_maj*/
		ser_hst_maj?: number|null;
		/**DBCOLUMN:Seznam.ser_hst_odp*/
		ser_hst_odp?: number|null;
		/**DBCOLUMN:Seznam.typ_soubor*/
		typ_soubor?: number|null;
		/**DBCOLUMN:Seznam.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:Seznam.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:Seznam.naklad_p1*/
		naklad_p1?: string|null;
		/**DBCOLUMN:Seznam.naklad_p2*/
		naklad_p2?: string|null;
		/**DBCOLUMN:Seznam.naklad_p3*/
		naklad_p3?: string|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:Seznam.nazev_poh*/
		nazev_poh?: string|null;
		/**DBCOLUMN:Seznam.ser_cis*/
		ser_cis?: string|null;
		/**DBCOLUMN:Seznam.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:Seznam.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:Seznam.nazev_skp*/
		nazev_skp?: string|null;
		/**DBCOLUMN:Seznam.nazev_tech*/
		nazev_tech?: string|null;
		/**DBCOLUMN:Seznam.pmj_krt*/
		pmj_krt?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_krt*/
		c_krt?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_por*/
		dat_por?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zar*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**DBCOLUMN:Seznam.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:Seznam.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:Seznam.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_txt*/
		ixs_ref_txt?: string|null;
		/**DBCOLUMN:Seznam.jmeno_soubor*/
		jmeno_soubor?: string|null;
		/**DBCOLUMN:Seznam.inv_cis_soubor*/
		inv_cis_soubor?: string|null;
		/**DBCOLUMN:Seznam.drh_txt*/
		drh_txt?: string|null;
		/**DBCOLUMN:Seznam.mat_akt*/
		mat_akt?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.sarze*/
		sarze?: string|null;
		/**DBCOLUMN:Seznam.expirace*/
		expirace?: JsonDate|null;
		/**DBCOLUMN:Seznam.ean*/
		ean?: string|null;
		/**DBCOLUMN:Seznam.c_dph_maj*/
		c_dph_maj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_dph_maj*/
		c_c_dph_maj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.akce*/
		akce?: string|null;
		/**DBCOLUMN:Seznam.segment_kod*/
		segment_kod?: string|null;
		/**DBCOLUMN:Seznam.dat_uct0123*/
		dat_uct0123?: JsonDate|null;
		/**DBCOLUMN:Seznam.lhuta_zaruka*/
		lhuta_zaruka?: number|null;
		/**DBCOLUMN:Seznam.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:Seznam.stat_puvod_txt*/
		stat_puvod_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vyr_txt*/
		ixs_esu_vyr_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_dod_txt*/
		ixs_esu_dod_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_servis_txt*/
		ixs_esu_servis_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_maj*/
		typ_maj?: string|null;
		/**DBCOLUMN:Seznam.ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**DBCOLUMN:Seznam.rozmer_l*/
		rozmer_l?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_w*/
		rozmer_w?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_h*/
		rozmer_h?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.hmotnost*/
		hmotnost?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.prev_stav_txt*/
		prev_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.mobilita_txt*/
		mobilita_txt?: string|null;
		/**DBCOLUMN:Seznam.trida_bezp_txt*/
		trida_bezp_txt?: string|null;
		/**DBCOLUMN:Seznam.riziko_por_txt*/
		riziko_por_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vla_txt*/
		ixs_esu_vla_txt?: string|null;
		/**DBCOLUMN:Seznam.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:Seznam.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:Seznam.ext_1_txt*/
		ext_1_txt?: string|null;
		/**DBCOLUMN:Seznam.ext_2_txt*/
		ext_2_txt?: string|null;
		/**DBCOLUMN:Seznam.ext_3_txt*/
		ext_3_txt?: string|null;
		/**DBCOLUMN:Seznam.c_poriz*/
		c_poriz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_opr_pol*/
		c_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dotace*/
		c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ke_pap*/
		ke_pap?: string|null;
	}
	const enum GPohybyMajDokladuDtoNames { ixp = "ixp", ser_cislo = "ser_cislo", kod_poh = "kod_poh", typ_dok = "typ_dok", typ_dok_zkr = "typ_dok_zkr", dev = "dev", dev_zkr = "dev_zkr", skupina_id = "skupina_id", skupina_zkr = "skupina_zkr", por_poh = "por_poh", lic = "lic", ser_pcislo = "ser_pcislo", ac = "ac", ixs_maj = "ixs_maj", inv_cis = "inv_cis", nazev = "nazev", typ_poh = "typ_poh", druh_poh = "druh_poh", druh_poh_zkr = "druh_poh_zkr", dat_poh = "dat_poh", dat_uct = "dat_uct", ico = "ico", ucs = "ucs", nks = "nks", tka = "tka", mp_stav = "mp_stav", mp_stav_zkr = "mp_stav_zkr", st_stav = "st_stav", status_com = "status_com", mj = "mj", m = "m", c = "c", cmj = "cmj", skp = "skp", drh_id = "drh_id", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", skupina_odp = "skupina_odp", trida = "trida", ser_hst_maj = "ser_hst_maj", ser_hst_odp = "ser_hst_odp", typ_soubor = "typ_soubor", c_dph = "c_dph", c_c_dph = "c_c_dph", vyr_cis = "vyr_cis", mat_cis = "mat_cis", naklad_p1 = "naklad_p1", naklad_p2 = "naklad_p2", naklad_p3 = "naklad_p3", mena = "mena", mena_zkr = "mena_zkr", c_mena = "c_mena", kurz = "kurz", dat_uup = "dat_uup", nazev_poh = "nazev_poh", ser_cis = "ser_cis", evi_cis = "evi_cis", rok_vyr = "rok_vyr", nazev_skp = "nazev_skp", nazev_tech = "nazev_tech", pmj_krt = "pmj_krt", c_krt = "c_krt", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_orj_txt = "ixs_orj_txt", ixs_ref = "ixs_ref", ixs_ref_txt = "ixs_ref_txt", jmeno_soubor = "jmeno_soubor", inv_cis_soubor = "inv_cis_soubor", drh_txt = "drh_txt", mat_akt = "mat_akt", poznamka = "poznamka", sarze = "sarze", expirace = "expirace", ean = "ean", c_dph_maj = "c_dph_maj", c_c_dph_maj = "c_c_dph_maj", akce = "akce", segment_kod = "segment_kod", dat_uct0123 = "dat_uct0123", lhuta_zaruka = "lhuta_zaruka", objekt = "objekt", stat_puvod_txt = "stat_puvod_txt", ixs_esu_vyr_txt = "ixs_esu_vyr_txt", ixs_esu_dod_txt = "ixs_esu_dod_txt", ixs_esu_servis_txt = "ixs_esu_servis_txt", typ_maj = "typ_maj", ktg_zar_txt = "ktg_zar_txt", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", hmotnost = "hmotnost", prev_stav_txt = "prev_stav_txt", mobilita_txt = "mobilita_txt", trida_bezp_txt = "trida_bezp_txt", riziko_por_txt = "riziko_por_txt", ixs_esu_vla_txt = "ixs_esu_vla_txt", gps_sirka = "gps_sirka", gps_delka = "gps_delka", ext_1_txt = "ext_1_txt", ext_2_txt = "ext_2_txt", ext_3_txt = "ext_3_txt", c_poriz = "c_poriz", c_opr_pol = "c_opr_pol", c_real = "c_real", c_dotace = "c_dotace", ke_pap = "ke_pap",}
	const enum GPohybyMajDokladuDtoFragments { ixp = "*", ser_cislo = "*", kod_poh = "*", typ_dok = "*", typ_dok_zkr = "*", dev = "*", dev_zkr = "*", skupina_id = "*", skupina_zkr = "*", por_poh = "*", lic = "*", ser_pcislo = "*", ac = "*", ixs_maj = "*", inv_cis = "*", nazev = "*", typ_poh = "*", druh_poh = "*", druh_poh_zkr = "*", dat_poh = "*", dat_uct = "*", ico = "*", ucs = "*", nks = "*", tka = "*", mp_stav = "*", mp_stav_zkr = "*", st_stav = "*", status_com = "*", mj = "*", m = "*", c = "*", cmj = "*", skp = "*", drh_id = "*", ueab_por = "*", ueab_opr = "*", ueab_evi = "*", skupina_odp = "*", trida = "*", ser_hst_maj = "*", ser_hst_odp = "*", typ_soubor = "*", c_dph = "*", c_c_dph = "*", vyr_cis = "*", mat_cis = "*", naklad_p1 = "*", naklad_p2 = "*", naklad_p3 = "*", mena = "*", mena_zkr = "*", c_mena = "*", kurz = "*", dat_uup = "*", nazev_poh = "*", ser_cis = "*", evi_cis = "*", rok_vyr = "*", nazev_skp = "*", nazev_tech = "*", pmj_krt = "*", c_krt = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", stredisko = "*", budova_kod = "*", mistnost_kod = "*", ixs_orj = "*", ixs_orj_txt = "*", ixs_ref = "*", ixs_ref_txt = "*", jmeno_soubor = "*", inv_cis_soubor = "*", drh_txt = "*", mat_akt = "*", poznamka = "*", sarze = "*", expirace = "*", ean = "*", c_dph_maj = "*", c_c_dph_maj = "*", akce = "*", segment_kod = "*", dat_uct0123 = "*", lhuta_zaruka = "*", objekt = "*", stat_puvod_txt = "*", ixs_esu_vyr_txt = "*", ixs_esu_dod_txt = "*", ixs_esu_servis_txt = "*", typ_maj = "*", ktg_zar_txt = "*", rozmer_l = "*", rozmer_w = "*", rozmer_h = "*", hmotnost = "*", prev_stav_txt = "*", mobilita_txt = "*", trida_bezp_txt = "*", riziko_por_txt = "*", ixs_esu_vla_txt = "*", gps_sirka = "*", gps_delka = "*", ext_1_txt = "*", ext_2_txt = "*", ext_3_txt = "*", c_poriz = "*", c_opr_pol = "*", c_real = "*", c_dotace = "*", ke_pap = "*",}
	const enum GPohybyMajDokladuDtoTypes { ixp = "string", ser_cislo = "number", kod_poh = "number", typ_dok = "number", typ_dok_zkr = "string", dev = "number", dev_zkr = "string", skupina_id = "number", skupina_zkr = "string", por_poh = "number", lic = "string", ser_pcislo = "number", ac = "string", ixs_maj = "string", inv_cis = "string", nazev = "string", typ_poh = "number", druh_poh = "number", druh_poh_zkr = "string", dat_poh = "JsonDate", dat_uct = "string", ico = "string", ucs = "string", nks = "string", tka = "number", mp_stav = "number", mp_stav_zkr = "string", st_stav = "number", status_com = "number", mj = "string", m = "JsonDecimal", c = "JsonDecimal", cmj = "JsonDecimal", skp = "string", drh_id = "number", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", skupina_odp = "string", trida = "string", ser_hst_maj = "number", ser_hst_odp = "number", typ_soubor = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", vyr_cis = "string", mat_cis = "string", naklad_p1 = "string", naklad_p2 = "string", naklad_p3 = "string", mena = "number", mena_zkr = "string", c_mena = "JsonDecimal", kurz = "JsonDecimal", dat_uup = "JsonDate", nazev_poh = "string", ser_cis = "string", evi_cis = "string", rok_vyr = "number", nazev_skp = "string", nazev_tech = "string", pmj_krt = "JsonDecimal", c_krt = "JsonDecimal", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_orj_txt = "string", ixs_ref = "string", ixs_ref_txt = "string", jmeno_soubor = "string", inv_cis_soubor = "string", drh_txt = "string", mat_akt = "number", poznamka = "string", sarze = "string", expirace = "JsonDate", ean = "string", c_dph_maj = "JsonDecimal", c_c_dph_maj = "JsonDecimal", akce = "string", segment_kod = "string", dat_uct0123 = "JsonDate", lhuta_zaruka = "number", objekt = "string", stat_puvod_txt = "string", ixs_esu_vyr_txt = "string", ixs_esu_dod_txt = "string", ixs_esu_servis_txt = "string", typ_maj = "string", ktg_zar_txt = "string", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", hmotnost = "JsonDecimal", prev_stav_txt = "string", mobilita_txt = "string", trida_bezp_txt = "string", riziko_por_txt = "string", ixs_esu_vla_txt = "string", gps_sirka = "string", gps_delka = "string", ext_1_txt = "string", ext_2_txt = "string", ext_3_txt = "string", c_poriz = "JsonDecimal", c_opr_pol = "JsonDecimal", c_real = "JsonDecimal", c_dotace = "JsonDecimal", ke_pap = "string",}
	const enum GPohybyMajDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GProvozPodminkyDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GProvozPodminkyDto {
		/**DBCOLUMN:Seznam.provoz_podm*/
		provoz_podm?: number|null;
		/**DBCOLUMN:Seznam.provoz_podm_zkr*/
		provoz_podm_zkr?: string|null;
		/**DBCOLUMN:Seznam.provoz_podm_txt*/
		provoz_podm_txt?: string|null; 
		/**DBCOLUMN:Seznam.aktivita_vpop*/
		aktivita_vpop?: number|null; 
	}
	const enum GProvozPodminkyDtoNames { provoz_podm = "provoz_podm", provoz_podm_zkr = "provoz_podm_zkr", provoz_podm_txt = "provoz_podm_txt", aktivita_vpop = "aktivita_vpop",}
	const enum GProvozPodminkyDtoFragments { provoz_podm = "*", provoz_podm_zkr = "*", provoz_podm_txt = "*", aktivita_vpop = "*",}
	const enum GProvozPodminkyDtoTypes { provoz_podm = "number", provoz_podm_zkr = "string", provoz_podm_txt = "string", aktivita_vpop = "number",}
	const enum GProvozPodminkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GTzhDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GTzhDto {
		/**DBCOLUMN:Seznam.tzh_stav*/
		tzh_stav?: number|null;
		/**MAJCTZS*/
		tzh_stav_zkr?: string|null;
		/**MAJCTZS*/
		tzh_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:Seznam.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:Seznam.dev*/
		dev?: number|null;
		/**DBCOLUMN:Seznam.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:Seznam.dat_tzh*/
		dat_tzh?: JsonDate|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.tzh_stav_prim*/
		tzh_stav_prim?: number|null;
		/**DBCOLUMN:Seznam.tzh_stav_st*/
		tzh_stav_st?: number|null;
		/**DBCOLUMN:Seznam.rokobd_odp_u*/
		rokobd_odp_u?: number|null;
		/**DBCOLUMN:Seznam.mesobd_odp_u*/
		mesobd_odp_u?: number|null;
		/**DBCOLUMN:Seznam.rokobd_odp_d*/
		rokobd_odp_d?: number|null;
		/**DBCOLUMN:Seznam.mesobd_odp_d*/
		mesobd_odp_d?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vstup_u*/
		c_vstup_u?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vstup_d*/
		c_vstup_d?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dotace*/
		c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_zbytek_u*/
		c_zbytek_u?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_zkr*/
		typ_ag_zkr?: string|null;
		/**DBCOLUMN:Seznam.ixp_ftzh*/
		ixp_ftzh?: string|null;
		/**DBCOLUMN:Seznam.ixp_tzh*/
		ixp_tzh?: string|null;
		/**DBCOLUMN:Seznam.st_stav_ftzh*/
		st_stav_ftzh?: number|null;
		/**DBCOLUMN:Seznam.ac_tzh*/
		ac_tzh?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		typ_esu?: number|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.drh_tzh*/
		drh_tzh?: number|null;
		/**DBCOLUMN:Seznam.drh_tzh_zkr*/
		drh_tzh_zkr?: string|null;
		mat_akt?: number|null;
		popis_pol?: string|null;
		uea?: string|null;
		ueb?: string|null;
		uec?: string|null;
		ued?: string|null;
		uee?: string|null;
		uef?: string|null;
		ueg?: string|null;
		ueh?: string|null;
		uei?: string|null;
		uej?: string|null;
		te0?: string|null;
		te1?: string|null;
		te2?: string|null;
		te3?: string|null;
		te4?: string|null;
		/**DBCOLUMN:Seznam.row_checked*/
		row_checked?: boolean|null;
	}
	const enum GTzhDtoNames { tzh_stav = "tzh_stav", tzh_stav_zkr = "tzh_stav_zkr", tzh_stav_txt = "tzh_stav_txt", ser_cislo = "ser_cislo", rok = "rok", inv_cis = "inv_cis", nazev = "nazev", skupina_id = "skupina_id", drh_id = "drh_id", dev = "dev", ixs_maj = "ixs_maj", dat_tzh = "dat_tzh", popis = "popis", tzh_stav_prim = "tzh_stav_prim", tzh_stav_st = "tzh_stav_st", rokobd_odp_u = "rokobd_odp_u", mesobd_odp_u = "mesobd_odp_u", rokobd_odp_d = "rokobd_odp_d", mesobd_odp_d = "mesobd_odp_d", c = "c", c_vstup_u = "c_vstup_u", c_vstup_d = "c_vstup_d", c_dotace = "c_dotace", c_zbytek_u = "c_zbytek_u", typ_ag = "typ_ag", typ_ag_zkr = "typ_ag_zkr", ixp_ftzh = "ixp_ftzh", ixp_tzh = "ixp_tzh", st_stav_ftzh = "st_stav_ftzh", ac_tzh = "ac_tzh", zmenu_prov_txt = "zmenu_prov_txt", ixs_esu = "ixs_esu", esu_txt = "esu_txt", typ_esu = "typ_esu", ac_ag = "ac_ag", drh_tzh = "drh_tzh", drh_tzh_zkr = "drh_tzh_zkr", mat_akt = "mat_akt", popis_pol = "popis_pol", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", row_checked = "row_checked",}
	const enum GTzhDtoFragments { tzh_stav = "*", tzh_stav_zkr = "*", tzh_stav_txt = "*", ser_cislo = "*", rok = "*", inv_cis = "*", nazev = "*", skupina_id = "*", drh_id = "*", dev = "*", ixs_maj = "*", dat_tzh = "*", popis = "*", tzh_stav_prim = "*", tzh_stav_st = "*", rokobd_odp_u = "*", mesobd_odp_u = "*", rokobd_odp_d = "*", mesobd_odp_d = "*", c = "*", c_vstup_u = "*", c_vstup_d = "*", c_dotace = "*", c_zbytek_u = "*", typ_ag = "*", typ_ag_zkr = "*", ixp_ftzh = "*", ixp_tzh = "*", st_stav_ftzh = "*", ac_tzh = "*", zmenu_prov_txt = "*", ixs_esu = "*", esu_txt = "*", typ_esu = "*", ac_ag = "*", drh_tzh = "*", drh_tzh_zkr = "*", mat_akt = "*", popis_pol = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", row_checked = "*",}
	const enum GTzhDtoTypes { tzh_stav = "number", tzh_stav_zkr = "string", tzh_stav_txt = "string", ser_cislo = "number", rok = "number", inv_cis = "string", nazev = "string", skupina_id = "number", drh_id = "number", dev = "number", ixs_maj = "string", dat_tzh = "JsonDate", popis = "string", tzh_stav_prim = "number", tzh_stav_st = "number", rokobd_odp_u = "number", mesobd_odp_u = "number", rokobd_odp_d = "number", mesobd_odp_d = "number", c = "JsonDecimal", c_vstup_u = "JsonDecimal", c_vstup_d = "JsonDecimal", c_dotace = "JsonDecimal", c_zbytek_u = "JsonDecimal", typ_ag = "number", typ_ag_zkr = "string", ixp_ftzh = "string", ixp_tzh = "string", st_stav_ftzh = "number", ac_tzh = "string", zmenu_prov_txt = "string", ixs_esu = "string", esu_txt = "string", typ_esu = "number", ac_ag = "string", drh_tzh = "number", drh_tzh_zkr = "string", mat_akt = "number", popis_pol = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", row_checked = "boolean",}
	const enum GTzhDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GTzhStavDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GTzhStavDto {
		/**DBCOLUMN:Seznam.sum_c_vstup_u*/
		sum_c_vstup_u?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_vstup_d*/
		sum_c_vstup_d?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_zbytek_u*/
		sum_c_zbytek_u?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_zbytek_d*/
		sum_c_zbytek_d?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_dotace*/
		sum_c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c*/
		sum_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_dph*/
		sum_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sum_c_c_dph*/
		sum_c_c_dph?: JsonDecimal|null;
	}
	const enum GTzhStavDtoNames { sum_c_vstup_u = "sum_c_vstup_u", sum_c_vstup_d = "sum_c_vstup_d", sum_c_zbytek_u = "sum_c_zbytek_u", sum_c_zbytek_d = "sum_c_zbytek_d", sum_c_dotace = "sum_c_dotace", sum_c = "sum_c", sum_c_dph = "sum_c_dph", sum_c_c_dph = "sum_c_c_dph",}
	const enum GTzhStavDtoFragments { sum_c_vstup_u = "*", sum_c_vstup_d = "*", sum_c_zbytek_u = "*", sum_c_zbytek_d = "*", sum_c_dotace = "*", sum_c = "*", sum_c_dph = "*", sum_c_c_dph = "*",}
	const enum GTzhStavDtoTypes { sum_c_vstup_u = "JsonDecimal", sum_c_vstup_d = "JsonDecimal", sum_c_zbytek_u = "JsonDecimal", sum_c_zbytek_d = "JsonDecimal", sum_c_dotace = "JsonDecimal", sum_c = "JsonDecimal", sum_c_dph = "JsonDecimal", sum_c_c_dph = "JsonDecimal",}
	const enum GTzhStavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ALDataSets\GWflDokladDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GWflDokladDto {
		/**PID - identifikátor dokumentu*/
		ixp?: string|null;
		/**ID typu agendy, které dokument patří*/
		typ_ag?: number|null;
		/**Zkratka typu agendy, které dokument patří*/
		typ_ag_zkr?: string|null;
		/**Značka*/
		akt_znacka?: string|null;
		/**ID typu dokumentu - viz modul ADM (Subjekty -> Workflow)*/
		ixs_typ?: string|null;
		/**Popis typu dokumentu*/
		ixs_typ_txt?: string|null;
		/**Název / Věc*/
		nazev?: string|null;
		/**ID vlastníka dokumentu*/
		ixs_fun_akt?: string|null;
		/**Vlastník dokumentu*/
		ixs_fun_akt_txt?: string|null;
		/**ID knihy, ve které se doklad nachází*/
		ixp_den?: string|null;
		/**Subřada knihy, ve které se doklad nachází*/
		subrada?: number|null;
		/**evidenční číslo dokladu*/
		ac?: string|null;
		/**agendové číslo dokladu*/
		ac_ag?: string|null;
		/**Období*/
		rok?: number|null;
	}
	const enum GWflDokladDtoNames { ixp = "ixp", typ_ag = "typ_ag", typ_ag_zkr = "typ_ag_zkr", akt_znacka = "akt_znacka", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_txt = "ixs_fun_akt_txt", ixp_den = "ixp_den", subrada = "subrada", ac = "ac", ac_ag = "ac_ag", rok = "rok",}
	const enum GWflDokladDtoFragments { ixp = "*", typ_ag = "*", typ_ag_zkr = "*", akt_znacka = "*", ixs_typ = "*", ixs_typ_txt = "*", nazev = "*", ixs_fun_akt = "*", ixs_fun_akt_txt = "*", ixp_den = "*", subrada = "*", ac = "*", ac_ag = "*", rok = "*",}
	const enum GWflDokladDtoTypes { ixp = "string", typ_ag = "number", typ_ag_zkr = "string", akt_znacka = "string", ixs_typ = "string", ixs_typ_txt = "string", nazev = "string", ixs_fun_akt = "string", ixs_fun_akt_txt = "string", ixp_den = "string", subrada = "number", ac = "string", ac_ag = "string", rok = "number",}
	const enum GWflDokladDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\Gordic.Maj.Interface.IGMajCiselniky.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Fitry universálního číselníku*/
	const enum FilterUniversalDial {
		kod,
		nazev,
		zkratka,
		k_v,
		k_s,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\Gordic.Maj.Interface.IGMajsskm.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Filtry číselníku (Skupiny majetku)*/
	const enum FilterMajsskm {
		/**(PK)*/
		ixs_skm,
		/**.*/
		skupina_id,
		/**.*/
		skupina_txt,
		/**.*/
		skupina_zkr,
		/**Režim odpisu*/
		mode_odp,
		/**Typ skupiny MAJ*/
		skupina_typ,
		/**.*/
		distribuce,
		/**.*/
		k_v,
		/**.*/
		k_s,
		/**Příznak unikátnosti*/
		s_unique,
		/**.*/
		aktivita,
		/**.*/
		dat_zmena,
		/**.*/
		zmenu_prov,
		/**.*/
		c_min_dp,
		/**Typ dlouhodobého majetku*/
		typ_dm,
		/**Typ přístupu - vazba na VAS.MAJVFSK - má smysl pokud je "maj_rad_accskm=1". Typ přístupu nabývá hodnot dle VAS.GINCTYA*/
		typ_pristup,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajCasoveZavislyUcet.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Časově závislý účet - majvdro
	* @domain GinisAdmin
	* @businessObject MajCasoveZavislyUcet
	*/
	interface MajCasoveZavislyUcet {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajCasoveZavislyUcetDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajCasoveZavislyUcetDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajCasoveZavislyUcetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajCasoveZavislyUcet: ServiceBase & Catalog.MajCasoveZavislyUcet;
	}
	const MajCasoveZavislyUcet: Client["MajCasoveZavislyUcet"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Časově závislý účet - majvdro*/
	interface GMajCasoveZavislyUcetDto extends Gordic.Maj.Interface.GMajvdroDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajCasoveZavislyUcetDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", drh_id = "drh_id", rok_od = "rok_od", uea_evi = "uea_evi", uea_por = "uea_por", uea_opr = "uea_opr", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea_opp = "uea_opp",}
	const enum GMajCasoveZavislyUcetDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", drh_id = "*", rok_od = "*", uea_evi = "*", uea_por = "*", uea_opr = "*", rok_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uea_opp = "*",}
	const enum GMajCasoveZavislyUcetDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", drh_id = "number", rok_od = "number", uea_evi = "string", uea_por = "string", uea_opr = "string", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea_opp = "string",}
	const enum GMajCasoveZavislyUcetDtoTypeLengths { uea_evi = 3, uea_por = 3, uea_opr = 3, zmenu_prov = 12, uea_opp = 3,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GMajCasoveZavislyUcetFilterEnum {
		/**Aktivita*/
		aktivita,
		/**drh_id*/
		drh_id,
		/**rok_od*/
		rok_od,
		/**rokEkoParams*/
		rokEkoParams,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajDruhMajetku.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Druh majetku
	* @domain GinisAdmin
	* @businessObject MajDruhMajetku
	*/
	interface MajDruhMajetku {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajDruhMajetkuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajDruhMajetkuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajDruhMajetkuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajDruhMajetkuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajDruhMajetkuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajDruhMajetkuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajDruhMajetkuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajDruhMajetkuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajDruhMajetkuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajDruhMajetku: ServiceBase & Catalog.MajDruhMajetku;
	}
	const MajDruhMajetku: Client["MajDruhMajetku"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Druh majetku - majsdrm*/
	interface GMajDruhMajetkuDto extends Gordic.Maj.Interface.GMajsdrmDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajDruhMajetkuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_drm = "ixs_drm", drh_id = "drh_id", skupina_id = "skupina_id", drh_txt = "drh_txt", drh_zkr = "drh_zkr", mode_odp = "mode_odp", distribuce = "distribuce", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_rp = "typ_rp", in_soubor = "in_soubor", s_prodej = "s_prodej",}
	const enum GMajDruhMajetkuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_drm = "*", drh_id = "*", skupina_id = "*", drh_txt = "*", drh_zkr = "*", mode_odp = "*", distribuce = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_rp = "*", in_soubor = "*", s_prodej = "*",}
	const enum GMajDruhMajetkuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_drm = "string", drh_id = "number", skupina_id = "number", drh_txt = "string", drh_zkr = "string", mode_odp = "number", distribuce = "number", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_rp = "number", in_soubor = "number", s_prodej = "number",}
	const enum GMajDruhMajetkuDtoTypeLengths { ixs_drm = 12, drh_txt = 50, drh_zkr = 16, k_s = 15, zmenu_prov = 12,}
	/**Filtry pro druhy majetku*/
	const enum GMajDruhMajetkuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**ixs_drm*/
		ixs_drm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajElementarniMajetkovyPohyb.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Elementární majetkové pohyby - majdpoh
	* @domain GinisAdmin
	* @businessObject MajElementarniMajetkovyPohyb
	*/
	interface MajElementarniMajetkovyPohyb {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajdpohDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajElementarniMajetkovyPohyb: ServiceBase & Catalog.MajElementarniMajetkovyPohyb;
	}
	const MajElementarniMajetkovyPohyb: Client["MajElementarniMajetkovyPohyb"];
}
declare namespace Gordic.Maj.Interface {
	/**Filtry pro požadavky na budování LISTu*/
	const enum GMajElementarniMajetkovyPohybFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Identifikace pohybu*/
		id_poh,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajEvidencniStredisko.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Evidenční středisko
	* @domain GinisAdmin
	* @businessObject MajEvidencniStredisko
	*/
	interface MajEvidencniStredisko {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajEvidencniStrediskoDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajEvidencniStrediskoDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajEvidencniStrediskoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajEvidencniStredisko: ServiceBase & Catalog.MajEvidencniStredisko;
	}
	const MajEvidencniStredisko: Client["MajEvidencniStredisko"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Evidenční středisko - ekosstr*/
	interface GMajEvidencniStrediskoDto extends Gordic.Maj.Interface.GEkosstrDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajEvidencniStrediskoDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", stredisko = "stredisko", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_isl = "priz_isl", aktivita = "aktivita",}
	const enum GMajEvidencniStrediskoDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", stredisko = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", priz_isl = "*", aktivita = "*",}
	const enum GMajEvidencniStrediskoDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", stredisko = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_isl = "number", aktivita = "number",}
	const enum GMajEvidencniStrediskoDtoTypeLengths { ico = 10, stredisko = 12, nazev = 50, zmenu_prov = 12,}
	/**Filtry pro evidenční středisko*/
	const enum GMajEvidencniStrediskoFilterEnum {
		/**Aktivita*/
		aktivita,
		/**EvidencniStredisko*/
		stredisko,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajExterniLokalizace1.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Externí lokalizace 1
	* @domain GinisAdmin
	* @businessObject MajExterniLokalizace1
	*/
	interface MajExterniLokalizace1 {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajExterniLokalizace1Dto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>,GServiceReadResponse<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajExterniLokalizace1Dto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajExterniLokalizace1Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajExterniLokalizace1: ServiceBase & Catalog.MajExterniLokalizace1;
	}
	const MajExterniLokalizace1: Client["MajExterniLokalizace1"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - ExterniLokalizace1 - majsel1*/
	interface GMajExterniLokalizace1Dto extends Gordic.Maj.Interface.GMajsel1Dto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajExterniLokalizace1DtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ext_1 = "ext_1", ico = "ico", ext_1_zkr = "ext_1_zkr", ext_1_txt = "ext_1_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajExterniLokalizace1DtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ext_1 = "*", ico = "*", ext_1_zkr = "*", ext_1_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajExterniLokalizace1DtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ext_1 = "number", ico = "string", ext_1_zkr = "string", ext_1_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajExterniLokalizace1DtoTypeLengths { ico = 10, ext_1_zkr = 16, ext_1_txt = 50, zmenu_prov = 12,}
	/**Filtry pro externí lokalizaci 1*/
	const enum GMajExterniLokalizace1FilterEnum {
		/**Aktivita*/
		aktivita,
		/**ExterniLokalizace1*/
		ext_1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajExterniLokalizace2.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Externí lokalizace 2
	* @domain GinisAdmin
	* @businessObject MajExterniLokalizace2
	*/
	interface MajExterniLokalizace2 {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajExterniLokalizace2Dto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>,GServiceReadResponse<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajExterniLokalizace2Dto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajExterniLokalizace2Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajExterniLokalizace2: ServiceBase & Catalog.MajExterniLokalizace2;
	}
	const MajExterniLokalizace2: Client["MajExterniLokalizace2"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - ExterniLokalizace2 - majsel2*/
	interface GMajExterniLokalizace2Dto extends Gordic.Maj.Interface.GMajsel2Dto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajExterniLokalizace2DtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ext_2 = "ext_2", ico = "ico", ext_2_zkr = "ext_2_zkr", ext_2_txt = "ext_2_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajExterniLokalizace2DtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ext_2 = "*", ico = "*", ext_2_zkr = "*", ext_2_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajExterniLokalizace2DtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ext_2 = "number", ico = "string", ext_2_zkr = "string", ext_2_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajExterniLokalizace2DtoTypeLengths { ico = 10, ext_2_zkr = 16, ext_2_txt = 50, zmenu_prov = 12,}
	/**Filtry pro externí lokalizaci 2*/
	const enum GMajExterniLokalizace2FilterEnum {
		/**Aktivita*/
		aktivita,
		/**ExterniLokalizace2*/
		ext_2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajExterniLokalizace3.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Externí lokalizace 3
	* @domain GinisAdmin
	* @businessObject MajExterniLokalizace3
	*/
	interface MajExterniLokalizace3 {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajExterniLokalizace3Dto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>,GServiceReadResponse<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajExterniLokalizace3Dto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajExterniLokalizace3Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajExterniLokalizace3: ServiceBase & Catalog.MajExterniLokalizace3;
	}
	const MajExterniLokalizace3: Client["MajExterniLokalizace3"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - ExterniLokalizace3 - majsel3*/
	interface GMajExterniLokalizace3Dto extends Gordic.Maj.Interface.GMajsel3Dto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajExterniLokalizace3DtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ext_3 = "ext_3", ico = "ico", ext_3_zkr = "ext_3_zkr", ext_3_txt = "ext_3_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajExterniLokalizace3DtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ext_3 = "*", ico = "*", ext_3_zkr = "*", ext_3_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajExterniLokalizace3DtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ext_3 = "number", ico = "string", ext_3_zkr = "string", ext_3_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajExterniLokalizace3DtoTypeLengths { ico = 10, ext_3_zkr = 16, ext_3_txt = 50, zmenu_prov = 12,}
	/**Filtry pro externí lokalizaci*/
	const enum GMajExterniLokalizace3FilterEnum {
		/**Aktivita*/
		aktivita,
		/**ExterniLokalizace3*/
		ext_3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajKategorieZarizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Kategorie zařízení
	* @domain GinisAdmin
	* @businessObject MajKategorieZarizeni
	*/
	interface MajKategorieZarizeni {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajKategorieZarizeniDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajKategorieZarizeniDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajKategorieZarizeniDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajKategorieZarizeniDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajKategorieZarizeniDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajKategorieZarizeniDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajKategorieZarizeniDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajKategorieZarizeniDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajKategorieZarizeniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajKategorieZarizeni: ServiceBase & Catalog.MajKategorieZarizeni;
	}
	const MajKategorieZarizeni: Client["MajKategorieZarizeni"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Kategorie zařízení - majsktz*/
	interface GMajKategorieZarizeniDto extends Gordic.Maj.Interface.GMajsktzDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajKategorieZarizeniDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ktg_zar = "ktg_zar", ico = "ico", ktg_zar_zkr = "ktg_zar_zkr", ktg_zar_txt = "ktg_zar_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajKategorieZarizeniDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ktg_zar = "*", ico = "*", ktg_zar_zkr = "*", ktg_zar_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajKategorieZarizeniDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ktg_zar = "number", ico = "string", ktg_zar_zkr = "string", ktg_zar_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajKategorieZarizeniDtoTypeLengths { ico = 10, ktg_zar_zkr = 16, ktg_zar_txt = 50, zmenu_prov = 12,}
	/**Filtry pro katerii zažízení*/
	const enum GMajKategorieZarizeniFilterEnum {
		/**Aktivita*/
		aktivita,
		/**kategorie zařízení*/
		ktg_zar,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajKlasifikace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL pro klasifikaci majetku
	* @domain MAJ
	*/
	interface MajKlasifikace {
		/**Načte číselník klasifikace*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GEkosklaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GEkosklaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GEkosklaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GEkosklaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GEkosklaDto>>;
		/**Založení nebo aktualizace skupiny*/
		upsertSkupina(rq?:Gordic.Maj.Interface.GEkovkzoDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GEkovkzoDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GEkovkzoDto>,GServiceSaveResponse<Gordic.Maj.Interface.GEkovkzoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajKlasifikace: ServiceBase & Catalog.MajKlasifikace;
	}
	const MajKlasifikace: Client["MajKlasifikace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajKmenovyList.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kmenový list
	* @domain GinisAdmin
	* @businessObject MajKmenovyList
	*/
	interface MajKmenovyList {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajKmenovyListDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajKmenovyListDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajKmenovyListDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajKmenovyListDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajKmenovyListDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajKmenovyListDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajKmenovyListDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajKmenovyListDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajKmenovyListDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajKmenovyList: ServiceBase & Catalog.MajKmenovyList;
	}
	const MajKmenovyList: Client["MajKmenovyList"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Kmenový list - majsklm*/
	interface GMajKmenovyListDto extends Gordic.Maj.Interface.GMajsklmDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajKmenovyListDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mat_cis = "mat_cis", skupina_id = "skupina_id", zev = "zev",}
	const enum GMajKmenovyListDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", dat_zmena = "*", zmenu_prov = "*", mat_cis = "*", skupina_id = "*", zev = "*",}
	const enum GMajKmenovyListDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mat_cis = "string", skupina_id = "number", zev = "number",}
	const enum GMajKmenovyListDtoTypeLengths { ico = 10, zmenu_prov = 12, mat_cis = 20,}
	/**Filtry pro kmenovy list*/
	const enum GMajKmenovyListFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Materiálové číslo*/
		mat_cis,
		/**Skupina_id*/
		skupina_id,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajMajetkovyPohyb.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Třída bezpečnosti
	* @domain GinisAdmin
	* @businessObject MajMajetkovyPohyb
	*/
	interface MajMajetkovyPohyb {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajMajetkovyPohybDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMajetkovyPohybDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMajetkovyPohybDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMajetkovyPohybDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajMajetkovyPohybDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajMajetkovyPohybDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajMajetkovyPohybDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajMajetkovyPohybDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajMajetkovyPohybDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajMajetkovyPohyb: ServiceBase & Catalog.MajMajetkovyPohyb;
	}
	const MajMajetkovyPohyb: Client["MajMajetkovyPohyb"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Majetkový pohyb - majspoh*/
	interface GMajMajetkovyPohybDto extends Gordic.Maj.Interface.GMajspohDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajMajetkovyPohybDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", nazev = "nazev", ico = "ico", ucs = "ucs", distribuce = "distribuce", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", kod_poh_anti = "kod_poh_anti", typ_dok_anti = "typ_dok_anti", druh_poh = "druh_poh", gin_typ_inst = "gin_typ_inst", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", storno_poh = "storno_poh", nks_cil = "nks_cil", priz_ps = "priz_ps", id_poh = "id_poh", id_poh_anti = "id_poh_anti",}
	const enum GMajMajetkovyPohybDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", kod_poh = "*", typ_dok = "*", dev = "*", nazev = "*", ico = "*", ucs = "*", distribuce = "*", aktivita = "*", dat_od = "*", dat_do = "*", kod_poh_anti = "*", typ_dok_anti = "*", druh_poh = "*", gin_typ_inst = "*", dat_zmena = "*", zmenu_prov = "*", storno_poh = "*", nks_cil = "*", priz_ps = "*", id_poh = "*", id_poh_anti = "*",}
	const enum GMajMajetkovyPohybDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", kod_poh = "number", typ_dok = "number", dev = "number", nazev = "string", ico = "string", ucs = "string", distribuce = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", kod_poh_anti = "number", typ_dok_anti = "number", druh_poh = "number", gin_typ_inst = "string", dat_zmena = "JsonDate", zmenu_prov = "string", storno_poh = "number", nks_cil = "string", priz_ps = "number", id_poh = "string", id_poh_anti = "string",}
	const enum GMajMajetkovyPohybDtoTypeLengths { nazev = 254, ico = 10, ucs = 10, gin_typ_inst = 10, zmenu_prov = 12, nks_cil = 12, id_poh = 15, id_poh_anti = 15,}
	/**Filtry pro majetkové pohyby*/
	const enum GMajMajetkovyPohybFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Identifikace pohybu*/
		id_poh,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajMaterialovaTrida.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Materiálová třída
	* @domain GinisAdmin
	* @businessObject MajMaterialovaTrida
	*/
	interface MajMaterialovaTrida {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajMaterialovaTridaDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMaterialovaTridaDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMaterialovaTridaDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMaterialovaTridaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajMaterialovaTridaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajMaterialovaTridaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajMaterialovaTridaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajMaterialovaTridaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajMaterialovaTridaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajMaterialovaTrida: ServiceBase & Catalog.MajMaterialovaTrida;
	}
	const MajMaterialovaTrida: Client["MajMaterialovaTrida"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Materiálová třída - majstri*/
	interface GMajMaterialovaTridaDto extends Gordic.Maj.Interface.GMajstriDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajMaterialovaTridaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", trida = "trida", nazev = "nazev", ico = "ico", nks_komp = "nks_komp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", hs_nks = "hs_nks",}
	const enum GMajMaterialovaTridaDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", trida = "*", nazev = "*", ico = "*", nks_komp = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", hs_nks = "*",}
	const enum GMajMaterialovaTridaDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", trida = "string", nazev = "string", ico = "string", nks_komp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", hs_nks = "number",}
	const enum GMajMaterialovaTridaDtoTypeLengths { trida = 4, nazev = 50, ico = 10, nks_komp = 12, zmenu_prov = 12,}
	/**Filtry pro matariálovou třídu*/
	const enum GMajMaterialovaTridaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Třída*/
		trida,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajMaterialoveCislo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Materiálové číslo
	* @domain GinisAdmin
	* @businessObject MajMaterialoveCislo
	*/
	interface MajMaterialoveCislo {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajMaterialoveCisloDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMaterialoveCisloDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMaterialoveCisloDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMaterialoveCisloDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajMaterialoveCisloDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajMaterialoveCisloDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajMaterialoveCisloDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajMaterialoveCisloDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajMaterialoveCisloDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajMaterialoveCislo: ServiceBase & Catalog.MajMaterialoveCislo;
	}
	const MajMaterialoveCislo: Client["MajMaterialoveCislo"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Materiálové číslo - majscim*/
	interface GMajMaterialoveCisloDto extends Gordic.Maj.Interface.GMajscimDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajMaterialoveCisloDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", mat_cis = "mat_cis", skp = "skp", nazev = "nazev", aktivita = "aktivita", distribuce = "distribuce", cs_nazev = "cs_nazev", pmj_min = "pmj_min", pmj_max = "pmj_max", dan_typ = "dan_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_rp = "typ_rp", mj = "mj", mena = "mena", cmj_mena_nak = "cmj_mena_nak", cmj_pro = "cmj_pro", rez_dph_in = "rez_dph_in", rokmes_od_in = "rokmes_od_in", rez_dph_out = "rez_dph_out", rokmes_od_out = "rokmes_od_out",}
	const enum GMajMaterialoveCisloDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", mat_cis = "*", skp = "*", nazev = "*", aktivita = "*", distribuce = "*", cs_nazev = "*", pmj_min = "*", pmj_max = "*", dan_typ = "*", dat_zmena = "*", zmenu_prov = "*", typ_rp = "*", mj = "*", mena = "*", cmj_mena_nak = "*", cmj_pro = "*", rez_dph_in = "*", rokmes_od_in = "*", rez_dph_out = "*", rokmes_od_out = "*",}
	const enum GMajMaterialoveCisloDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", mat_cis = "string", skp = "string", nazev = "string", aktivita = "number", distribuce = "number", cs_nazev = "string", pmj_min = "JsonDecimal", pmj_max = "JsonDecimal", dan_typ = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_rp = "number", mj = "string", mena = "number", cmj_mena_nak = "JsonDecimal", cmj_pro = "JsonDecimal", rez_dph_in = "number", rokmes_od_in = "string", rez_dph_out = "number", rokmes_od_out = "string",}
	const enum GMajMaterialoveCisloDtoTypeLengths { mat_cis = 20, skp = 15, nazev = 254, cs_nazev = 254, zmenu_prov = 12, mj = 5, rokmes_od_in = 6, rokmes_od_out = 6,}
	/**Filtry pro materiálové číslo*/
	const enum GMajMaterialoveCisloFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Materiálové číslo*/
		mat_cis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajMernaJednotka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Měrné jednotky
	* @domain GinisAdmin
	* @businessObject MajMernaJednotka
	*/
	interface MajMernaJednotka {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajMernaJednotkaDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMernaJednotkaDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMernaJednotkaDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMernaJednotkaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajMernaJednotkaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajMernaJednotkaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajMernaJednotkaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajMernaJednotkaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajMernaJednotkaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajMernaJednotka: ServiceBase & Catalog.MajMernaJednotka;
	}
	const MajMernaJednotka: Client["MajMernaJednotka"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - $Popis - $Table*/
	interface GMajMernaJednotkaDto extends Gordic.Maj.Interface.GGincmejDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajMernaJednotkaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", mj = "mj", mj_txt = "mj_txt", mj_zkr = "mj_zkr", k_v = "k_v", k_s = "k_s", dat_zmena = "dat_zmena", aktivita = "aktivita", zmenu_prov = "zmenu_prov", uic = "uic", mj_kod_typ = "mj_kod_typ", mj_pk = "mj_pk", mj_typ = "mj_typ", priz_def = "priz_def",}
	const enum GMajMernaJednotkaDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", mj = "*", mj_txt = "*", mj_zkr = "*", k_v = "*", k_s = "*", dat_zmena = "*", aktivita = "*", zmenu_prov = "*", uic = "*", mj_kod_typ = "*", mj_pk = "*", mj_typ = "*", priz_def = "*",}
	const enum GMajMernaJednotkaDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", mj = "string", mj_txt = "string", mj_zkr = "string", k_v = "number", k_s = "string", dat_zmena = "JsonDate", aktivita = "number", zmenu_prov = "string", uic = "string", mj_kod_typ = "string", mj_pk = "JsonDecimal", mj_typ = "string", priz_def = "string",}
	const enum GMajMernaJednotkaDtoTypeLengths { mj = 5, mj_txt = 50, mj_zkr = 16, k_s = 15, zmenu_prov = 12, uic = 2, mj_kod_typ = 2, mj_typ = 1, priz_def = 1,}
	/**Filtry pro měrnou jednotku*/
	const enum GMajMernaJednotkaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Měrná jednotka*/
		mj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajMobilita.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Mobilita
	* @domain GinisAdmin
	* @businessObject MajMobilita
	*/
	interface MajMobilita {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajMobilitaDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMobilitaDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMobilitaDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMobilitaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajMobilitaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajMobilitaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajMobilitaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajMobilitaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajMobilitaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajMobilita: ServiceBase & Catalog.MajMobilita;
	}
	const MajMobilita: Client["MajMobilita"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Mobilita - majsmob*/
	interface GMajMobilitaDto extends Gordic.Maj.Interface.GMajsmobDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajMobilitaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", mobilita = "mobilita", ico = "ico", mobilita_zkr = "mobilita_zkr", mobilita_txt = "mobilita_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajMobilitaDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", mobilita = "*", ico = "*", mobilita_zkr = "*", mobilita_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajMobilitaDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", mobilita = "number", ico = "string", mobilita_zkr = "string", mobilita_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajMobilitaDtoTypeLengths { ico = 10, mobilita_zkr = 16, mobilita_txt = 50, zmenu_prov = 12,}
	/**Filtry pro mobilitu*/
	const enum GMajMobilitaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Mobilita*/
		mobilita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajObjekt.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Objekt
	* @domain GinisAdmin
	* @businessObject MajObjekt
	*/
	interface MajObjekt {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajObjektDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajObjektDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajObjektDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajObjektDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajObjektDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajObjekt: ServiceBase & Catalog.MajObjekt;
	}
	const MajObjekt: Client["MajObjekt"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Objekt - ekosobj*/
	interface GMajObjektDto extends Gordic.Maj.Interface.GEkosobjDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajObjektDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", objekt = "objekt", ico = "ico", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajObjektDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", objekt = "*", ico = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajObjektDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", objekt = "string", ico = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajObjektDtoTypeLengths { objekt = 8, ico = 10, nazev = 50, zmenu_prov = 12,}
	/**Filtry pro objekt*/
	const enum GMajObjektFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Objekt*/
		objekt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajObjektBudova.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba objektů a středisek
	* @domain GinisAdmin
	* @businessObject MajObjektBudova
	*/
	interface MajObjektBudova {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajObjektBudovaDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektBudovaDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektBudovaDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajObjektBudovaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajObjektBudovaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektBudovaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajObjektBudovaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajObjektBudovaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajObjektBudova: ServiceBase & Catalog.MajObjektBudova;
	}
	const MajObjektBudova: Client["MajObjektBudova"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Vazba objektů a budov - ekovobb*/
	interface GMajObjektBudovaDto extends Gordic.Maj.Interface.GEkovobbDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajObjektBudovaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", objekt = "objekt", budova_kod = "budova_kod", ico = "ico", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_obj = "nazev_obj", budova_naz = "budova_naz",}
	const enum GMajObjektBudovaDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", objekt = "*", budova_kod = "*", ico = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_obj = "*", budova_naz = "*",}
	const enum GMajObjektBudovaDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", objekt = "string", budova_kod = "string", ico = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_obj = "string", budova_naz = "string",}
	const enum GMajObjektBudovaDtoTypeLengths { objekt = 8, budova_kod = 8, ico = 10, zmenu_prov = 12,}
	/**Filtry pro vazbu objektů a budov*/
	const enum GMajObjektBudovaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Objekt*/
		objekt,
		/**Budova kód*/
		budova_kod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajObjektStredisko.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba objektů a středisek
	* @domain GinisAdmin
	* @businessObject MajObjektStredisko
	*/
	interface MajObjektStredisko {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajObjektStrediskoDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektStrediskoDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajObjektStrediskoDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajObjektStrediskoDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajObjektStrediskoDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektStrediskoDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajObjektStrediskoDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajObjektStrediskoDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajObjektStrediskoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajObjektStredisko: ServiceBase & Catalog.MajObjektStredisko;
	}
	const MajObjektStredisko: Client["MajObjektStredisko"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Vazba objektů a středisek - ekovobs*/
	interface GMajObjektStrediskoDto extends Gordic.Maj.Interface.GEkovobsDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajObjektStrediskoDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", objekt = "objekt", stredisko = "stredisko", ico = "ico", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_obj = "nazev_obj", nazev_str = "nazev_str",}
	const enum GMajObjektStrediskoDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", objekt = "*", stredisko = "*", ico = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_obj = "*", nazev_str = "*",}
	const enum GMajObjektStrediskoDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", objekt = "string", stredisko = "string", ico = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_obj = "string", nazev_str = "string",}
	const enum GMajObjektStrediskoDtoTypeLengths { objekt = 8, stredisko = 12, ico = 10, zmenu_prov = 12,}
	/**Filtry pro vazbu objektů a středisek*/
	const enum GMajObjektStrediskoFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Objekt*/
		objekt,
		/**Středisko*/
		stredisko,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajPodminkyProvozu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Podmínky provozu
	* @domain GinisAdmin
	* @businessObject MajPodminkyProvozu
	*/
	interface MajPodminkyProvozu {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajPodminkyProvozuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajPodminkyProvozuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajPodminkyProvozuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajPodminkyProvozuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajPodminkyProvozuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajPodminkyProvozuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajPodminkyProvozuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajPodminkyProvozuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajPodminkyProvozuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajPodminkyProvozu: ServiceBase & Catalog.MajPodminkyProvozu;
	}
	const MajPodminkyProvozu: Client["MajPodminkyProvozu"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - PodminkyProvozu - majspop*/
	interface GMajPodminkyProvozuDto extends Gordic.Maj.Interface.GMajspopDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajPodminkyProvozuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", provoz_podm = "provoz_podm", ico = "ico", provoz_podm_zkr = "provoz_podm_zkr", provoz_podm_txt = "provoz_podm_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajPodminkyProvozuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", provoz_podm = "*", ico = "*", provoz_podm_zkr = "*", provoz_podm_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajPodminkyProvozuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", provoz_podm = "number", ico = "string", provoz_podm_zkr = "string", provoz_podm_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajPodminkyProvozuDtoTypeLengths { ico = 10, provoz_podm_zkr = 16, provoz_podm_txt = 50, zmenu_prov = 12,}
	/**Filtry pro podmínky provozu*/
	const enum GMajPodminkyProvozuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PodminkyProvozu*/
		provoz_podm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajProdejniPrirazka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Prodejní přirážka
	* @domain GinisAdmin
	* @businessObject MajProdejniPrirazka
	*/
	interface MajProdejniPrirazka {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajProdejniPrirazkaDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajProdejniPrirazkaDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajProdejniPrirazkaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajProdejniPrirazka: ServiceBase & Catalog.MajProdejniPrirazka;
	}
	const MajProdejniPrirazka: Client["MajProdejniPrirazka"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Prodejní přirážka - majsdpr*/
	interface GMajProdejniPrirazkaDto extends Gordic.Maj.Interface.GMajsdprDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajProdejniPrirazkaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", prirazka = "prirazka", nazev = "nazev", c = "c", ktg_pri = "ktg_pri", typ_vyp_pri = "typ_vyp_pri", dph_pri = "dph_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dan_typ = "dan_typ",}
	const enum GMajProdejniPrirazkaDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", prirazka = "*", nazev = "*", c = "*", ktg_pri = "*", typ_vyp_pri = "*", dph_pri = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dan_typ = "*",}
	const enum GMajProdejniPrirazkaDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", prirazka = "string", nazev = "string", c = "JsonDecimal", ktg_pri = "number", typ_vyp_pri = "number", dph_pri = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dan_typ = "number",}
	const enum GMajProdejniPrirazkaDtoTypeLengths { ico = 10, prirazka = 10, nazev = 50, zmenu_prov = 12,}
	/**Filtry pro prodejní přirážku*/
	const enum GMajProdejniPrirazkaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Přirážka*/
		prirazka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajRizikoPriPoruse.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Riziko při poruše
	* @domain GinisAdmin
	* @businessObject MajRizikoPriPoruse
	*/
	interface MajRizikoPriPoruse {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajRizikoPriPoruseDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajRizikoPriPoruseDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajRizikoPriPoruseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajRizikoPriPoruse: ServiceBase & Catalog.MajRizikoPriPoruse;
	}
	const MajRizikoPriPoruse: Client["MajRizikoPriPoruse"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - RizikoPriPoruse - majsrip*/
	interface GMajRizikoPriPoruseDto extends Gordic.Maj.Interface.GMajsripDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajRizikoPriPoruseDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", riziko_por = "riziko_por", ico = "ico", riziko_por_zkr = "riziko_por_zkr", riziko_por_txt = "riziko_por_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajRizikoPriPoruseDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", riziko_por = "*", ico = "*", riziko_por_zkr = "*", riziko_por_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajRizikoPriPoruseDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", riziko_por = "number", ico = "string", riziko_por_zkr = "string", riziko_por_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajRizikoPriPoruseDtoTypeLengths { ico = 10, riziko_por_zkr = 16, riziko_por_txt = 50, zmenu_prov = 12,}
	/**Filtry pro riziko při poruše*/
	const enum GMajRizikoPriPoruseFilterEnum {
		/**Aktivita*/
		aktivita,
		/**RizikoPriPoruse*/
		riziko_por,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajSkupinaMajetku.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Skupina majetku
	* @domain GinisAdmin
	* @businessObject MajSkupinaMajetku
	*/
	interface MajSkupinaMajetku {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajSkupinaMajetkuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajSkupinaMajetkuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajSkupinaMajetkuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajSkupinaMajetku: ServiceBase & Catalog.MajSkupinaMajetku;
	}
	const MajSkupinaMajetku: Client["MajSkupinaMajetku"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Skupina majetku - majsskm*/
	interface GMajSkupinaMajetkuDto extends Gordic.Maj.Interface.GMajsskmDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajSkupinaMajetkuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_skm = "ixs_skm", skupina_id = "skupina_id", skupina_txt = "skupina_txt", skupina_zkr = "skupina_zkr", mode_odp = "mode_odp", skupina_typ = "skupina_typ", distribuce = "distribuce", k_v = "k_v", k_s = "k_s", s_unique = "s_unique", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_min_dp = "c_min_dp", typ_dm = "typ_dm", s_prodej = "s_prodej", mode_odp_txt = "mode_odp_txt", skupina_typ_zkr = "skupina_typ_zkr", typ_dm_zkr = "typ_dm_zkr", s_prodej_txt = "s_prodej_txt",}
	const enum GMajSkupinaMajetkuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_skm = "*", skupina_id = "*", skupina_txt = "*", skupina_zkr = "*", mode_odp = "*", skupina_typ = "*", distribuce = "*", k_v = "*", k_s = "*", s_unique = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", c_min_dp = "*", typ_dm = "*", s_prodej = "*", mode_odp_txt = "*", skupina_typ_zkr = "*", typ_dm_zkr = "*", s_prodej_txt = "*",}
	const enum GMajSkupinaMajetkuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_skm = "string", skupina_id = "number", skupina_txt = "string", skupina_zkr = "string", mode_odp = "number", skupina_typ = "number", distribuce = "number", k_v = "number", k_s = "string", s_unique = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_min_dp = "JsonDecimal", typ_dm = "number", s_prodej = "number", mode_odp_txt = "string", skupina_typ_zkr = "string", typ_dm_zkr = "string", s_prodej_txt = "string",}
	const enum GMajSkupinaMajetkuDtoTypeLengths { ixs_skm = 12, skupina_txt = 50, skupina_zkr = 16, k_s = 15, zmenu_prov = 12,}
	/**Filtry pro skupinu majetku*/
	const enum GMajSkupinaMajetkuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Skupina majetku*/
		ixs_skm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajStavPoPrevzeti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Stav po převzetí
	* @domain GinisAdmin
	* @businessObject MajStavPoPrevzeti
	*/
	interface MajStavPoPrevzeti {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajStavPoPrevzetiDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajStavPoPrevzetiDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajStavPoPrevzetiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajStavPoPrevzeti: ServiceBase & Catalog.MajStavPoPrevzeti;
	}
	const MajStavPoPrevzeti: Client["MajStavPoPrevzeti"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - StavPoPrevzeti - majsstp*/
	interface GMajStavPoPrevzetiDto extends Gordic.Maj.Interface.GMajsstpDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajStavPoPrevzetiDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", prev_stav = "prev_stav", ico = "ico", prev_stav_zkr = "prev_stav_zkr", prev_stav_txt = "prev_stav_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajStavPoPrevzetiDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", prev_stav = "*", ico = "*", prev_stav_zkr = "*", prev_stav_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajStavPoPrevzetiDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", prev_stav = "number", ico = "string", prev_stav_zkr = "string", prev_stav_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajStavPoPrevzetiDtoTypeLengths { ico = 10, prev_stav_zkr = 16, prev_stav_txt = 50, zmenu_prov = 12,}
	/**Filtry pro stav po převzetí*/
	const enum GMajStavPoPrevzetiFilterEnum {
		/**Aktivita*/
		aktivita,
		/**StavPoPrevzeti*/
		prev_stav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajTridaBezpecnosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Třída bezpečnosti
	* @domain GinisAdmin
	* @businessObject MajTridaBezpecnosti
	*/
	interface MajTridaBezpecnosti {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajTridaBezpecnostiDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajTridaBezpecnostiDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajTridaBezpecnostiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajTridaBezpecnosti: ServiceBase & Catalog.MajTridaBezpecnosti;
	}
	const MajTridaBezpecnosti: Client["MajTridaBezpecnosti"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Třída bezpečnosti - majstrb*/
	interface GMajTridaBezpecnostiDto extends Gordic.Maj.Interface.GMajstrbDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajTridaBezpecnostiDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", trida_bezp = "trida_bezp", ico = "ico", trida_bezp_zkr = "trida_bezp_zkr", trida_bezp_txt = "trida_bezp_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajTridaBezpecnostiDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", trida_bezp = "*", ico = "*", trida_bezp_zkr = "*", trida_bezp_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajTridaBezpecnostiDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", trida_bezp = "number", ico = "string", trida_bezp_zkr = "string", trida_bezp_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajTridaBezpecnostiDtoTypeLengths { ico = 10, trida_bezp_zkr = 16, trida_bezp_txt = 50, zmenu_prov = 12,}
	/**Filtry pro třídu bezpečnosti*/
	const enum GMajTridaBezpecnostiFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Třída bezpečnosti*/
		trida_bezp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajTypDokladu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Typ dokladu
	* @domain GinisAdmin
	* @businessObject MajTypDokladu
	*/
	interface MajTypDokladu {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajTypDokladuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajTypDokladuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajTypDokladuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajTypDokladuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajTypDokladuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypDokladuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypDokladuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajTypDokladuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajTypDokladuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajTypDokladu: ServiceBase & Catalog.MajTypDokladu;
	}
	const MajTypDokladu: Client["MajTypDokladu"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Kategorie zařízení - majsktz*/
	interface GMajTypDokladuDto extends Gordic.Maj.Interface.GMajcstpDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajTypDokladuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", typ_dok = "typ_dok", typ_dok_txt = "typ_dok_txt", typ_dok_zkr = "typ_dok_zkr", k_v = "k_v", gin_typ_inst = "gin_typ_inst", aktivita = "aktivita", typ_obs = "typ_obs",}
	const enum GMajTypDokladuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", typ_dok = "*", typ_dok_txt = "*", typ_dok_zkr = "*", k_v = "*", gin_typ_inst = "*", aktivita = "*", typ_obs = "*",}
	const enum GMajTypDokladuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", typ_dok = "number", typ_dok_txt = "string", typ_dok_zkr = "string", k_v = "number", gin_typ_inst = "string", aktivita = "number", typ_obs = "number",}
	const enum GMajTypDokladuDtoTypeLengths { typ_dok_txt = 50, typ_dok_zkr = 16, gin_typ_inst = 10,}
	/**Filtry pro typ dokladu*/
	const enum GMajTypDokladuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**typ dokladu*/
		typ_dok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajTypOdpisu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Typ odpisu
	* @domain GinisAdmin
	* @businessObject MajTypOdpisu
	*/
	interface MajTypOdpisu {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajTypOdpisuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajTypOdpisuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajTypOdpisuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajTypOdpisuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajTypOdpisuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypOdpisuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypOdpisuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajTypOdpisuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajTypOdpisuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajTypOdpisu: ServiceBase & Catalog.MajTypOdpisu;
	}
	const MajTypOdpisu: Client["MajTypOdpisu"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Typ odpisu - majstod*/
	interface GMajTypOdpisuDto extends Gordic.Maj.Interface.GMajstodDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajTypOdpisuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", typ_odp = "typ_odp", rok_start_typ = "rok_start_typ", rok_stop_typ = "rok_stop_typ", zkratka = "zkratka", nazev = "nazev", priorita = "priorita", def_odp = "def_odp", def_odp_zkr = "def_odp_zkr", filtr = "filtr", distribuce = "distribuce", dan_def = "dan_def", dan_def_zkr = "dan_def_zkr", pocet_odp = "pocet_odp", def_vector1 = "def_vector1", def_vector2 = "def_vector2", def_vector3 = "def_vector3", def_vector4 = "def_vector4", def_vector5 = "def_vector5", def_vector6 = "def_vector6", def_vector7 = "def_vector7", def_vector8 = "def_vector8", def_vector9 = "def_vector9", def_vector10 = "def_vector10", def_vector11 = "def_vector11", def_vector12 = "def_vector12", aktivita = "aktivita", aktivita_txt = "aktivita_txt", ixs_tod = "ixs_tod", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_cov = "c_cov",}
	const enum GMajTypOdpisuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", typ_odp = "*", rok_start_typ = "*", rok_stop_typ = "*", zkratka = "*", nazev = "*", priorita = "*", def_odp = "*", def_odp_zkr = "*", filtr = "*", distribuce = "*", dan_def = "*", dan_def_zkr = "*", pocet_odp = "*", def_vector1 = "*", def_vector2 = "*", def_vector3 = "*", def_vector4 = "*", def_vector5 = "*", def_vector6 = "*", def_vector7 = "*", def_vector8 = "*", def_vector9 = "*", def_vector10 = "*", def_vector11 = "*", def_vector12 = "*", aktivita = "*", aktivita_txt = "*", ixs_tod = "*", dat_zmena = "*", zmenu_prov = "*", c_cov = "*",}
	const enum GMajTypOdpisuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", typ_odp = "number", rok_start_typ = "number", rok_stop_typ = "number", zkratka = "string", nazev = "string", priorita = "number", def_odp = "number", def_odp_zkr = "string", filtr = "string", distribuce = "number", dan_def = "number", dan_def_zkr = "string", pocet_odp = "number", def_vector1 = "JsonDecimal", def_vector2 = "JsonDecimal", def_vector3 = "JsonDecimal", def_vector4 = "JsonDecimal", def_vector5 = "JsonDecimal", def_vector6 = "JsonDecimal", def_vector7 = "JsonDecimal", def_vector8 = "JsonDecimal", def_vector9 = "JsonDecimal", def_vector10 = "JsonDecimal", def_vector11 = "JsonDecimal", def_vector12 = "JsonDecimal", aktivita = "number", aktivita_txt = "string", ixs_tod = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c_cov = "JsonDecimal",}
	const enum GMajTypOdpisuDtoTypeLengths { zmenu_prov = 12,}
	/**Filtry pro typ dokladu*/
	const enum GMajTypOdpisuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**typ odpisu*/
		typ_odp,
		/**rok_start_typ*/
		rok_start_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajTypZodpovednosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ zodpovědnosti
	* @domain GinisAdmin
	* @businessObject MajTypZodpovednosti
	*/
	interface MajTypZodpovednosti {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajTypZodpovednostiDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajTypZodpovednostiDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajTypZodpovednostiDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajTypZodpovednostiDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajTypZodpovednostiDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypZodpovednostiDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajTypZodpovednostiDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajTypZodpovednostiDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajTypZodpovednostiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajTypZodpovednosti: ServiceBase & Catalog.MajTypZodpovednosti;
	}
	const MajTypZodpovednosti: Client["MajTypZodpovednosti"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Typ Zodpovědnosti - majstyz*/
	interface GMajTypZodpovednostiDto extends Gordic.Maj.Interface.GMajstyzDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajTypZodpovednostiDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tyz = "ixs_tyz", nazev = "nazev", zkratka = "zkratka", typ_zodp = "typ_zodp", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajTypZodpovednostiDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tyz = "*", nazev = "*", zkratka = "*", typ_zodp = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajTypZodpovednostiDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tyz = "string", nazev = "string", zkratka = "string", typ_zodp = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajTypZodpovednostiDtoTypeLengths { ixs_tyz = 12, nazev = 50, zkratka = 16, zmenu_prov = 12,}
	/**Filtry pro typ zodpovědnosti*/
	const enum GMajTypZodpovednostiFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Měrná jednotka*/
		ixs_tyz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajUcty.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Účty
	* @domain GinisAdmin
	* @businessObject MajUcty
	*/
	interface MajUcty {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajUctyDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajUctyDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajUctyDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajUctyDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajUctyDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajUctyDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajUctyDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajUctyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajUctyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajUcty: ServiceBase & Catalog.MajUcty;
	}
	const MajUcty: Client["MajUcty"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Účty - majsuea*/
	interface GMajUctyDto extends Gordic.Maj.Interface.GMajsueaDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajUctyDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", drh_id = "drh_id", dev = "dev", ueb = "ueb", uea = "uea", ixs_vue = "ixs_vue", ueab_xxx = "ueab_xxx", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dev_zkr = "dev_zkr", drh_zkr = "drh_zkr",}
	const enum GMajUctyDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", drh_id = "*", dev = "*", ueb = "*", uea = "*", ixs_vue = "*", ueab_xxx = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dev_zkr = "*", drh_zkr = "*",}
	const enum GMajUctyDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", drh_id = "number", dev = "number", ueb = "string", uea = "string", ixs_vue = "string", ueab_xxx = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dev_zkr = "string", drh_zkr = "string",}
	const enum GMajUctyDtoTypeLengths { ueb = 4, uea = 3, ixs_vue = 12, ueab_xxx = 7, popis = 50, zmenu_prov = 12,}
	/**Filtry pro ucty*/
	const enum GMajUctyFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Třída bezpečnosti*/
		drh_id,
		/**druh evidence - vlastní, nevlastní, ...*/
		dev,
		/**AU - Analytický účet*/
		ueb,
		/**SU - Syntetický účet*/
		uea,
		ixs_vue,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajVariantaTransformaceUctu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Varianta transformace účtů
	* @domain GinisAdmin
	* @businessObject MajVariantaTransformaceUctu
	*/
	interface MajVariantaTransformaceUctu {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajVariantaTransformaceUctu: ServiceBase & Catalog.MajVariantaTransformaceUctu;
	}
	const MajVariantaTransformaceUctu: Client["MajVariantaTransformaceUctu"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Varianta transformace účtů - majsvue*/
	interface GMajVariantaTransformaceUctuDto extends Gordic.Maj.Interface.GMajsvueDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajVariantaTransformaceUctuDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_vue = "ixs_vue", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajVariantaTransformaceUctuDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_vue = "*", aktivita = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajVariantaTransformaceUctuDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_vue = "string", aktivita = "number", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajVariantaTransformaceUctuDtoTypeLengths { ixs_vue = 12, nazev = 50, poznamka = 50, zmenu_prov = 12,}
	/**Filtry pro variantu transformace účtů*/
	const enum GMajVariantaTransformaceUctuFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Varianta*/
		ixs_vue,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajVazbaVarianty.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba varianty transformačních účtů
	* @domain GinisAdmin
	* @businessObject MajVazbaVarianty
	*/
	interface MajVazbaVarianty {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajVazbaVariantyDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajVazbaVariantyDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajVazbaVariantyDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajVazbaVariantyDto>>;
		/**Read - načtení výchozích hodnot pro nový záznam*/
		readDefaults(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Maj.Interface.GMajVazbaVariantyDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajVazbaVariantyDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajVazbaVariantyDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajVazbaVariantyDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajVazbaVariantyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajVazbaVariantyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajVazbaVarianty: ServiceBase & Catalog.MajVazbaVarianty;
	}
	const MajVazbaVarianty: Client["MajVazbaVarianty"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Vazba varianty transformačních účtů - majvvuea*/
	interface GMajVazbaVariantyDto extends Gordic.Maj.Interface.GMajvvueDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajVazbaVariantyDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", ixs_vue = "ixs_vue", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajVazbaVariantyDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", rok = "*", ixs_vue = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajVazbaVariantyDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", ixs_vue = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajVazbaVariantyDtoTypeLengths { ico = 10, ixs_vue = 12, zmenu_prov = 12,}
	/**Filtry pro třídu bezpečnosti*/
	const enum GMajVazbaVariantyFilterEnum {
		/**Aktivita*/
		aktivita,
		/**IČO*/
		ico,
		/**Rok*/
		rok,
		/**ixs_vue*/
		ixs_vue,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\IGMajZpusobVyuziti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Číselník - Způsob využití
	* @domain GinisAdmin
	* @businessObject MajZpusobVyuziti
	*/
	interface MajZpusobVyuziti {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajZpusobVyuzitiDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajZpusobVyuzitiDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajZpusobVyuzitiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajZpusobVyuziti: ServiceBase & Catalog.MajZpusobVyuziti;
	}
	const MajZpusobVyuziti: Client["MajZpusobVyuziti"];
}
declare namespace Gordic.Maj.Interface {
	/**DTO pro ISL - Způsob využití - ginskov*/
	interface GMajZpusobVyuzitiDto extends Gordic.Maj.Interface.GGinskovDto {
		/**Textové reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GMajZpusobVyuzitiDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", kod_vyu = "kod_vyu", kod_vyu_txt = "kod_vyu_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", kod_vyu_rsx = "kod_vyu_rsx",}
	const enum GMajZpusobVyuzitiDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", kod_vyu = "*", kod_vyu_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", kod_vyu_rsx = "*",}
	const enum GMajZpusobVyuzitiDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", kod_vyu = "number", kod_vyu_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", kod_vyu_rsx = "number",}
	const enum GMajZpusobVyuzitiDtoTypeLengths { kod_vyu_txt = 50, zmenu_prov = 12, ixs_lpc = 12,}
	/**Filtry pro způsob využití*/
	const enum GMajZpusobVyuzitiFilterEnum {
		/**Aktivita*/
		aktivita,
		/**Kód využití*/
		kod_vyu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GEkocktlDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GEkocktlDto {
		/**DBCOLUMN:Seznam.typ_kla*/
		typ_kla?: number|null;
		/**DBCOLUMN:Seznam.typ_kla_txt*/
		typ_kla_txt?: string|null;
	}
	const enum GEkocktlDtoNames { typ_kla = "typ_kla", typ_kla_txt = "typ_kla_txt",}
	const enum GEkocktlDtoFragments { typ_kla = "*", typ_kla_txt = "*",}
	const enum GEkocktlDtoTypes { typ_kla = "number", typ_kla_txt = "string",}
	const enum GEkocktlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GGinsmisDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO místností*/
	interface GGinsmisDto {
		/**PK*/
		ico?: string|null;
		/**PK*/
		budova_kod?: string|null;
		/**PK*/
		segment_kod?: string|null;
		/**PK*/
		mistnost_kod?: string|null;
		/**název*/
		mistnost_naz?: string|null;
		/**patro*/
		patro?: string|null;
		/**Identifikační kód*/
		id_kod?: string|null;
		/**aktivita záznamu*/
		aktivita?: number|null;
		/**aktivita záznamu - textově*/
		aktivita_txt?: string|null;
		/**zodpovědná osoba*/
		ixs_ref?: string|null;
		stredisko?: string|null;
		objekt?: string|null;
		/**ORJ*/
		ixs_orj?: string|null;
	}
	const enum GGinsmisDtoNames { ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", mistnost_naz = "mistnost_naz", patro = "patro", id_kod = "id_kod", aktivita = "aktivita", aktivita_txt = "aktivita_txt", ixs_ref = "ixs_ref", stredisko = "stredisko", objekt = "objekt", ixs_orj = "ixs_orj",}
	const enum GGinsmisDtoFragments { ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", mistnost_naz = "*", patro = "*", id_kod = "*", aktivita = "*", aktivita_txt = "*", ixs_ref = "*", stredisko = "*", objekt = "*", ixs_orj = "*",}
	const enum GGinsmisDtoTypes { ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", mistnost_naz = "string", patro = "string", id_kod = "string", aktivita = "number", aktivita_txt = "string", ixs_ref = "string", stredisko = "string", objekt = "string", ixs_orj = "string",}
	const enum GGinsmisDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajcaktDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajcaktDto {
		/**DBCOLUMN:Seznam.mat_akt*/
		mat_akt?: number|null;
		/**DBCOLUMN:Seznam.mat_akt_txt*/
		mat_akt_txt?: string|null;
		/**DBCOLUMN:Seznam.mat_akt_zkr*/
		mat_akt_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_xml*/
		k_xml?: string|null;
	}
	const enum GMajcaktDtoNames { mat_akt = "mat_akt", mat_akt_txt = "mat_akt_txt", mat_akt_zkr = "mat_akt_zkr", k_xml = "k_xml",}
	const enum GMajcaktDtoFragments { mat_akt = "*", mat_akt_txt = "*", mat_akt_zkr = "*", k_xml = "*",}
	const enum GMajcaktDtoTypes { mat_akt = "number", mat_akt_txt = "string", mat_akt_zkr = "string", k_xml = "string",}
	const enum GMajcaktDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajcdemDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajcdemDto {
		/**DBCOLUMN:Seznam.dev*/
		dev?: number|null;
		/**DBCOLUMN:Seznam.dev_txt*/
		dev_txt?: string|null;
		/**DBCOLUMN:Seznam.dev_zkr*/
		dev_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:Seznam.k_xml*/
		k_xml?: string|null;
	}
	const enum GMajcdemDtoNames { dev = "dev", dev_txt = "dev_txt", dev_zkr = "dev_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMajcdemDtoFragments { dev = "*", dev_txt = "*", dev_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMajcdemDtoTypes { dev = "number", dev_txt = "string", dev_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMajcdemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajcodsDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajcodsDto {
		/**DBCOLUMN:Seznam.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:Seznam.skupina_odp_txt*/
		skupina_odp_txt?: string|null;
		/**DBCOLUMN:Seznam.skupina_odp_zkr*/
		skupina_odp_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.doba_odp*/
		doba_odp?: number|null;
	}
	const enum GMajcodsDtoNames { skupina_odp = "skupina_odp", skupina_odp_txt = "skupina_odp_txt", skupina_odp_zkr = "skupina_odp_zkr", k_v = "k_v", doba_odp = "doba_odp",}
	const enum GMajcodsDtoFragments { skupina_odp = "*", skupina_odp_txt = "*", skupina_odp_zkr = "*", k_v = "*", doba_odp = "*",}
	const enum GMajcodsDtoTypes { skupina_odp = "string", skupina_odp_txt = "string", skupina_odp_zkr = "string", k_v = "number", doba_odp = "number",}
	const enum GMajcodsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajctykDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajctykDto {
		/**DBCOLUMN:Seznam.tka*/
		tka?: number|null;
		/**DBCOLUMN:Seznam.tka_txt*/
		tka_txt?: string|null;
		/**DBCOLUMN:Seznam.tka_zkr*/
		tka_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:Seznam.k_xml*/
		k_xml?: string|null;
	}
	const enum GMajctykDtoNames { tka = "tka", tka_txt = "tka_txt", tka_zkr = "tka_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMajctykDtoFragments { tka = "*", tka_txt = "*", tka_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMajctykDtoTypes { tka = "number", tka_txt = "string", tka_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMajctykDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajctyzDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajctyzDto {
		/**DBCOLUMN:Seznam.typ_zodp*/
		typ_zodp?: number|null;
		/**DBCOLUMN:Seznam.typ_zodp_txt*/
		typ_zodp_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_zodp_zkr*/
		typ_zodp_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
	}
	const enum GMajctyzDtoNames { typ_zodp = "typ_zodp", typ_zodp_txt = "typ_zodp_txt", typ_zodp_zkr = "typ_zodp_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GMajctyzDtoFragments { typ_zodp = "*", typ_zodp_txt = "*", typ_zodp_zkr = "*", k_v = "*", k_s = "*",}
	const enum GMajctyzDtoTypes { typ_zodp = "number", typ_zodp_txt = "string", typ_zodp_zkr = "string", k_v = "number", k_s = "string",}
	const enum GMajctyzDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajczevDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajczevDto {
		/**DBCOLUMN:Seznam.zev*/
		zev?: number|null;
		/**DBCOLUMN:Seznam.zev_txt*/
		zev_txt?: string|null;
		/**DBCOLUMN:Seznam.zev_zkr*/
		zev_zkr?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:Seznam.k_xml*/
		k_xml?: string|null;
	}
	const enum GMajczevDtoNames { zev = "zev", zev_txt = "zev_txt", zev_zkr = "zev_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMajczevDtoFragments { zev = "*", zev_txt = "*", zev_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMajczevDtoTypes { zev = "number", zev_txt = "string", zev_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMajczevDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GMajscfuDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Varianta vlastností položek karty*/
	interface GMajscfuDto {
		/**ID varianty*/
		ixs_cfu?: string|null;
		nazev?: string|null;
		zkratka?: string|null;
		poznamka?: string|null;
		/**aktivita záznamu*/
		aktivita?: number|null;
		aktivita_txt?: string|null;
		/**příznak filtrace položky při převodech*/
		priz_com?: number|null;
		/**příznak aktuální varianty*/
		selected?: number|null;
	}
	const enum GMajscfuDtoNames { ixs_cfu = "ixs_cfu", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", priz_com = "priz_com", selected = "selected",}
	const enum GMajscfuDtoFragments { ixs_cfu = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", priz_com = "*", selected = "*",}
	const enum GMajscfuDtoTypes { ixs_cfu = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", priz_com = "number", selected = "number",}
	const enum GMajscfuDtoTypeLengths { ixs_cfu = 12, nazev = 20, zkratka = 16, poznamka = 50, aktivita_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\GUniversalDialDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GUniversalDialDto {
		/**DBCOLUMN:Seznam.kod*/
		kod?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
	}
	const enum GUniversalDialDtoNames { kod = "kod", nazev = "nazev", zkratka = "zkratka", k_v = "k_v", k_s = "k_s",}
	const enum GUniversalDialDtoFragments { kod = "*", nazev = "*", zkratka = "*", k_v = "*", k_s = "*",}
	const enum GUniversalDialDtoTypes { kod = "number", nazev = "string", zkratka = "string", k_v = "number", k_s = "string",}
	const enum GUniversalDialDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\DataSets\Vyber\GVyberJmenaSouboruDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GVyberJmenaSouboruDto {
		/**DBCOLUMN:Seznam.jmeno_soubor*/
		jmeno_soubor?: string|null;
		/**DBCOLUMN:Seznam.a*/
		a?: string|null;
	}
	const enum GVyberJmenaSouboruDtoNames { jmeno_soubor = "jmeno_soubor", a = "a",}
	const enum GVyberJmenaSouboruDtoFragments { jmeno_soubor = "*", a = "*",}
	const enum GVyberJmenaSouboruDtoTypes { jmeno_soubor = "string", a = "string",}
	const enum GVyberJmenaSouboruDtoTypeLengths { jmeno_soubor = 50, a = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ciselniky\Filtry\GFilterEnumCiselniky.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Filtrační enum prázdný*/
	const enum GFilterEnumEmpty {
	}
	/**Filtrační enum pro klasifikaci majetku*/
	const enum GFilterEnumEkoskla {
		skp,
		typ_kla,
		cs_nazev,
		aktivita,
		sUcetniOdpisovouSkupinou,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Doklady\GMajpidZmenaDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO změnových informací MAJ dokladu*/
	interface GMajpidZmenaDto {
		/**PID*/
		ixp?: string|null;
		/**součet za všechny položky dokladu bez ohledu na typ položky*/
		c_c?: JsonDecimal|null;
		/**počet položek dokladu*/
		pocet_pol?: number|null;
		/**celková cena s DPH*/
		c_c_dph?: JsonDecimal|null;
		/**datum poslední změny dokladu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMajpidZmenaDtoNames { ixp = "ixp", c_c = "c_c", pocet_pol = "pocet_pol", c_c_dph = "c_c_dph", dat_zmena = "dat_zmena",}
	const enum GMajpidZmenaDtoFragments { ixp = "*", c_c = "*", pocet_pol = "*", c_c_dph = "*", dat_zmena = "*",}
	const enum GMajpidZmenaDtoTypes { ixp = "string", c_c = "JsonDecimal", pocet_pol = "number", c_c_dph = "JsonDecimal", dat_zmena = "JsonDate",}
	const enum GMajpidZmenaDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Doklady\GMajWflspidDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO detailu WFL  - { cfc_Wflpid }*/
	interface GMajWflspidDto {
		/**ID funkce vlastníka písemnosti*/
		ixs_fun_akt?: string|null;
		/**příznak, že se jedná o přijatou či vlastní písemnost (VAS.WFLCSPR)*/
		s_prij?: number|null;
		/**ID uzlu, kterému písemnost náleží*/
		ixs_su_akt?: string|null;
		/**Stavy písemnosti - distribuční (VAS.WFLCSTA)*/
		stav_dist?: number|null;
		/**Příznak elektronické písemnosti (VAS.WFLCELE)*/
		s_ele?: number|null;
		/**stav původní příslušnosti k agendě (VAS.WFLCSDA)*/
		stav_sda?: number|null;
	}
	const enum GMajWflspidDtoNames { ixs_fun_akt = "ixs_fun_akt", s_prij = "s_prij", ixs_su_akt = "ixs_su_akt", stav_dist = "stav_dist", s_ele = "s_ele", stav_sda = "stav_sda",}
	const enum GMajWflspidDtoFragments { ixs_fun_akt = "*", s_prij = "*", ixs_su_akt = "*", stav_dist = "*", s_ele = "*", stav_sda = "*",}
	const enum GMajWflspidDtoTypes { ixs_fun_akt = "string", s_prij = "number", ixs_su_akt = "string", stav_dist = "number", s_ele = "number", stav_sda = "number",}
	const enum GMajWflspidDtoTypeLengths { ixs_fun_akt = 12, ixs_su_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Doklady\IGMajDokladService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL pro BO majetkového dokladu
	* @domain MAJ
	* @businessObject MajDoklad
	*/
	interface MajDokladService {
		/**Načte detail majetkového dokladu (včetně zápisu o přístupu do WFL)*/
		read(rq?:Gordic.Maj.Interface.GMajpidDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajpidDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajpidDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajpidDto>>;
		/**Načte seznam majetkových dokladů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajpidDto>>;
		/**Podání nového maj. dokladu*/
		create(rq?:Gordic.Maj.Interface.GMajpidDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>,GServiceSaveResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Vytvoří doklad typu PP (příjem převodem)*/
		createPPDoklad(rq?:Gordic.Maj.Interface.GMajpidmajDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidmajDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidmajDto>,GServiceSaveResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**cfc_MajPid.init( ) init prázdného dokladu*/
		createMajpid(rq?:CallParams<{}>): _Task<{},Gordic.Maj.Interface.GMajpidDto>;
		/**Iniciace údajů hlavičky*/
		initHdr(rq?:CallParams<{data:Gordic.Maj.Interface.GMajpidDto,typDok:number}>): _Task<{data:Gordic.Maj.Interface.GMajpidDto,typDok:number},Gordic.Maj.Interface.GMajpidDto>;
		/**Nový doklad - elektronicky*/
		podaniDokladuElektronicke(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,nazevSouboru:string,titulek:string,popisek:string}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,nazevSouboru:string,titulek:string,popisek:string},Gordic.Maj.Interface.GDokladMajPkDto>;
		/**Upraví existující maj. doklad*/
		update(rq?:Gordic.Maj.Interface.GMajpidDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajpidDto>>;
		/**Provede storno dokladu*/
		delete(rq?:Gordic.Maj.Interface.GMajpidDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajpidDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajpidDto>>;
		/**Proúčtování dokladu*/
		prouctovaniDokladu(rq?:CallParams<{ixp:string,idTop:string,nksExt:string,psFak:string,datUup:JsonDate}>): _Task<{ixp:string,idTop:string,nksExt:string,psFak:string,datUup:JsonDate},string>;
		/**Kontrola předaných dokladů před schválením / zrušením schválení*/
		zkontrolujPredSchvalenim(rq?:Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Schválení / zrušení schválení dokladu*/
		schval(rq?:Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné schválení / zrušení schválení předaných dokladů*/
		hromadneSchval(rq?:Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola předaných dokladů před Zaúčtováním*/
		zkontrolujPredZauctovanim(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Zaúčtování*/
		zauctuj(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné zaúčtování předaných dokladů*/
		hromadneZauctuj(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola předaných dokladů před uzavřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Zaúčtování*/
		uzavri(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné zaúčtování předaných dokladů*/
		hromadneUzavri(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola metadat*/
		zkontrolujMetadata(rq?:Gordic.Maj.Interface.GDokladMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GDokladMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola dokladů před předáním*/
		zkontrolujPredPredanim(rq?:Gordic.Maj.Interface.GDokladMajPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Předání dokladu*/
		predej(rq?:Gordic.Maj.Interface.GDokladMajPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné předání dokladů*/
		hromadnePredej(rq?:Gordic.Maj.Interface.GDokladMajPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPredaniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola dokladů před převzetím*/
		zkontrolujPredPrevzetim(rq?:Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Převzetí dokladu*/
		prevezmi(rq?:Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné převzetí dokladů*/
		hromadnePrevezmi(rq?:Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola dokladů před přidělením*/
		zkontrolujPredPridelenim(rq?:Gordic.Maj.Interface.GDokladMajPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Přidělení dokladu*/
		pridel(rq?:Gordic.Maj.Interface.GDokladMajPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné přidělení dokladů*/
		hromadnePridel(rq?:Gordic.Maj.Interface.GDokladMajPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPrideleniOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola dokladů před přeevidováním*/
		zkontrolujPredPreevidovanim(rq?:Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Přeevidování dokladu*/
		preeviduj(rq?:Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>,GServiceActionResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Hromadné přeevidování dokladů*/
		hromadnePreeviduj(rq?:Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GDokladMajPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GDokladMajPkDto>>;
		/**Kontrola přítomnosti kategorie pohybu pro daný DEV, kódu pohybu a typ dokladu*/
		checkKtgPoh(rq?:CallParams<{ktgPoh:number,id_poh:string,skupinaId:number}>): _Task<{ktgPoh:number,id_poh:string,skupinaId:number},boolean>;
		/**Report počtu dokladů podle stavu*/
		dashboardViewByStatus(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},GServiceListResponse<Gordic.Maj.Interface.GMajCommonReportDto>>;
		/**Hledání majetkových dokladů*/
		search(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GWflDokladDto>>;
		/**Hledání dokladů*/
		hledej(rq?:CallParams<{ixp:string,ac:string,acAg:string}>): _Task<{ixp:string,ac:string,acAg:string},Gordic.Maj.Interface.GWflDokladDto[]>;
		/**Načte účty pro aktuální EKO období*/
		getUcty(rq?:CallParams<{drhId:number}>): _Task<{drhId:number},GServiceReadResponse<Gordic.Maj.Interface.GMajvdroDto>>;
		/**Přehled provedených odpisů majetku*/
		prehledOdpisu(rq?:CallParams<{druhOdp:number}>): _Task<{druhOdp:number},GServiceListResponse<Gordic.Maj.Interface.GProvedenyOdpisDto>>;
		/**Nabídka prodejních přirážek*/
		prodejniPrirazky(rq?:CallParams<{prizNavazane:number,ixp:string,prizJenAktivni:number}>): _Task<{prizNavazane:number,ixp:string,prizJenAktivni:number},GServiceListResponse<Gordic.Maj.Interface.GProdejniPrirazkyDto>>;
		/**Vrátí oprávnění dokladů SML (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Maj.Interface.GDokladMajServicePermission>;
		/**Načte seznam dokladů pro Párovací symbol z jiných agend*/
		listParovaciSymbol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GBplspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajDokladService: ServiceBase & Catalog.MajDokladService;
	}
	const MajDokladService: Client["MajDokladService"];
}
declare namespace Gordic.Maj.Interface {
	/**Enum pro permissions*/
	const enum GDokladPermEnum {
		LzeSchvalit,
		LzeHromadneSchvalit,
		LzeZauctovat,
		LzeHromadneZauctovat,
		LzeUzavrit,
		LzeHromadneUzavrit,
		LzeZkontrolovatMetadata,
		LzePredat,
		LzeHromadnePredat,
		LzePrevzit,
		LzeHromadnePrevzit,
		LzePridelit,
		LzeHromadnePridelit,
		LzePreevidovat,
		LzeHromadnePreevidovat,
	}
	/**Oprávnění pro práci nad seznamem dokladů MAJ	Oprávnění pro jeden doklad SML*/
	interface GDokladMajPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadneSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze proúčtovat*/
		LzeZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně proúčtovat*/
		LzeHromadneZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze ukončit*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně ukončit*/
		LzeHromadneUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit schválení*/
		LzeHromadneZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit kopii*/
		LzeVytvoritKopii: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit objednávku*/
		LzeVytvoritObjednavku: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně předat*/
		LzeHromadnePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně převzít*/
		LzeHromadnePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně přidělit*/
		LzeHromadnePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně přeevidovat*/
		LzeHromadnePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDokladMajPermissionNames { LzeSchvalit = "LzeSchvalit", LzeHromadneSchvalit = "LzeHromadneSchvalit", LzeZauctovat = "LzeZauctovat", LzeHromadneZauctovat = "LzeHromadneZauctovat", LzeUzavrit = "LzeUzavrit", LzeHromadneUzavrit = "LzeHromadneUzavrit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeHromadneZrusitSchvaleni = "LzeHromadneZrusitSchvaleni", LzeVytvoritKopii = "LzeVytvoritKopii", LzeVytvoritObjednavku = "LzeVytvoritObjednavku", LzePredat = "LzePredat", LzeHromadnePredat = "LzeHromadnePredat", LzePrevzit = "LzePrevzit", LzeHromadnePrevzit = "LzeHromadnePrevzit", LzePridelit = "LzePridelit", LzeHromadnePridelit = "LzeHromadnePridelit", LzePreevidovat = "LzePreevidovat", LzeHromadnePreevidovat = "LzeHromadnePreevidovat", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata",}
	const enum GDokladMajPermissionFragments { LzeSchvalit = "*", LzeHromadneSchvalit = "*", LzeZauctovat = "*", LzeHromadneZauctovat = "*", LzeUzavrit = "*", LzeHromadneUzavrit = "*", LzeZrusitSchvaleni = "*", LzeHromadneZrusitSchvaleni = "*", LzeVytvoritKopii = "*", LzeVytvoritObjednavku = "*", LzePredat = "*", LzeHromadnePredat = "*", LzePrevzit = "*", LzeHromadnePrevzit = "*", LzePridelit = "*", LzeHromadnePridelit = "*", LzePreevidovat = "*", LzeHromadnePreevidovat = "*", LzeZkontrolovatMetadata = "*",}
	const enum GDokladMajPermissionTypes { LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritKopii = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritObjednavku = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDokladMajPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GDokladMajPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GDokladMajPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GDokladMajPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GDokladMajPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GDokladMajPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad doklady MAJ*/
	interface GDokladMajServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadneSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze proúčtovat*/
		LzeZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně proúčtovat*/
		LzeHromadneZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze ukončit*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně ukončit*/
		LzeHromadneUzavrit: Gordic.General.ApplicationInterface.GPermission;
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		LzeHromadneZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně předat*/
		LzeHromadnePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzeHromadnePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzeHromadnePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadne přeevidovat*/
		LzeHromadnePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDokladMajServicePermissionNames { LzeSchvalit = "LzeSchvalit", LzeHromadneSchvalit = "LzeHromadneSchvalit", LzeZauctovat = "LzeZauctovat", LzeHromadneZauctovat = "LzeHromadneZauctovat", LzeUzavrit = "LzeUzavrit", LzeHromadneUzavrit = "LzeHromadneUzavrit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeHromadneZrusitSchvaleni = "LzeHromadneZrusitSchvaleni", LzePredat = "LzePredat", LzeHromadnePredat = "LzeHromadnePredat", LzePrevzit = "LzePrevzit", LzeHromadnePrevzit = "LzeHromadnePrevzit", LzePridelit = "LzePridelit", LzeHromadnePridelit = "LzeHromadnePridelit", LzePreevidovat = "LzePreevidovat", LzeHromadnePreevidovat = "LzeHromadnePreevidovat", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata",}
	const enum GDokladMajServicePermissionFragments { LzeSchvalit = "*", LzeHromadneSchvalit = "*", LzeZauctovat = "*", LzeHromadneZauctovat = "*", LzeUzavrit = "*", LzeHromadneUzavrit = "*", LzeZrusitSchvaleni = "*", LzeHromadneZrusitSchvaleni = "*", LzePredat = "*", LzeHromadnePredat = "*", LzePrevzit = "*", LzeHromadnePrevzit = "*", LzePridelit = "*", LzeHromadnePridelit = "*", LzePreevidovat = "*", LzeHromadnePreevidovat = "*", LzeZkontrolovatMetadata = "*",}
	const enum GDokladMajServicePermissionTypes { LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDokladMajServicePermissionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GBplspidDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:kdfspid*/
	interface GBplspidDto {
		/**DBCOLUMN:kdfspid.ixp*/
		ixp?: string|null;
		/**Identifikátor externího subjektu (dodavatele)*/
		ixs_esu?: string|null;
		/**DBCOLUMN:kdfspid.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:ginsesu.nazev*/
		nazev_esu?: string|null;
		/**DBCOLUMN:ginsesu.stupen_ver*/
		stupen_ver?: number|null;
		/**Evidenční číslo přidělené dokladu v systému vystavovatele*/
		ac_esu?: string|null;
		/**DBCOLUMN:kdfspid.vs*/
		vs?: string|null;
		/**DBCOLUMN:kdfspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:kdfspid.mena*/
		mena?: number|null;
		/**DBCOLUMN:kdfspid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:ekocmen.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:kdfspid.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:ekodkur.m*/
		m_kurz?: JsonDecimal|null;
		/**Datum prvotní evidence dokladu do agendy.*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:kdfsden.rok*/
		rok?: number|null;
		/**DBCOLUMN:kdfspid.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:kdfspid.ac_ag*/
		ac_ag?: string|null;
		/**Typ agendy*/
		typ_ag?: number|null;
	}
	const enum GBplspidDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ico_esu = "ico_esu", nazev_esu = "nazev_esu", stupen_ver = "stupen_ver", ac_esu = "ac_esu", vs = "vs", ac = "ac", mena = "mena", c_mena = "c_mena", mena_zkr = "mena_zkr", c_celk = "c_celk", c_kuhr = "c_kuhr", c_zust = "c_zust", m_kurz = "m_kurz", dat_evid = "dat_evid", rok = "rok", kurz = "kurz", dat_uup = "dat_uup", ac_ag = "ac_ag", typ_ag = "typ_ag",}
	const enum GBplspidDtoFragments { ixp = "*", ixs_esu = "*", ico_esu = "*", nazev_esu = "*", stupen_ver = "*", ac_esu = "*", vs = "*", ac = "*", mena = "*", c_mena = "*", mena_zkr = "*", c_celk = "*", c_kuhr = "*", c_zust = "*", m_kurz = "*", dat_evid = "*", rok = "*", kurz = "*", dat_uup = "*", ac_ag = "*", typ_ag = "*",}
	const enum GBplspidDtoTypes { ixp = "string", ixs_esu = "string", ico_esu = "string", nazev_esu = "string", stupen_ver = "number", ac_esu = "string", vs = "string", ac = "string", mena = "number", c_mena = "JsonDecimal", mena_zkr = "string", c_celk = "JsonDecimal", c_kuhr = "JsonDecimal", c_zust = "JsonDecimal", m_kurz = "JsonDecimal", dat_evid = "JsonDate", rok = "number", kurz = "JsonDecimal", dat_uup = "JsonDate", ac_ag = "string", typ_ag = "number",}
	const enum GBplspidDtoTypeLengths { ixp = 12, ixs_esu = 12, ico_esu = 10, nazev_esu = 100, ac_esu = 60, vs = 12, ac = 20, mena_zkr = 16, ac_ag = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GDataUupTrfDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**nabídka výběru data UUP transferu*/
	interface GDataUupTrfDto {
		/**popis nabídky*/
		typ_dok?: number|null;
		dat_uup?: JsonDate|null;
		/**popis nabídky*/
		popis?: string|null;
	}
	const enum GDataUupTrfDtoNames { typ_dok = "typ_dok", dat_uup = "dat_uup", popis = "popis",}
	const enum GDataUupTrfDtoFragments { typ_dok = "*", dat_uup = "*", popis = "*",}
	const enum GDataUupTrfDtoTypes { typ_dok = "number", dat_uup = "JsonDate", popis = "string",}
	const enum GDataUupTrfDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GDokladMajXxxOperationDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Parametry schválení / zrušení schválení dokladů*/
	interface GDokladMajSchvaleniOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = schválení, false = zrušení schválení)*/
		schvalit?: boolean|null;
		/**příznak změněné(nové) ceny v MAJPID*/
		zmenitCenu?: boolean|null;
		/**pole prodejních přirážek - může být null*/
		prodPrirazky?: Gordic.Maj.Interface.GProdejniPrirazkyDto[]|null;
	}
	const enum GDokladMajSchvaleniOperationDtoNames { schvalit = "schvalit", zmenitCenu = "zmenitCenu", prodPrirazky = "prodPrirazky", ikc = "ikc", rows = "rows",}
	const enum GDokladMajSchvaleniOperationDtoFragments { schvalit = "*", zmenitCenu = "*", prodPrirazky = "*", ikc = "*", rows = "*",}
	const enum GDokladMajSchvaleniOperationDtoTypes { schvalit = "boolean", zmenitCenu = "boolean", prodPrirazky = "Gordic.Maj.Interface.GProdejniPrirazkyDto[]", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajSchvaleniOperationDtoTypeLengths {}
	/**Parametry operací nad doklady*/
	interface GDokladMajOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
	}
	const enum GDokladMajOperationDtoNames { ikc = "ikc", rows = "rows",}
	const enum GDokladMajOperationDtoFragments { ikc = "*", rows = "*",}
	const enum GDokladMajOperationDtoTypes { ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajOperationDtoTypeLengths {}
	/**Parametry předání dokladů*/
	interface GDokladMajPredaniOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = předat)*/
		predat?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**změnit kompetenta?*/
		zmenit_kompetenta?: boolean|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladMajPredaniOperationDtoNames { predat = "predat", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", zmenit_kompetenta = "zmenit_kompetenta", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladMajPredaniOperationDtoFragments { predat = "*", ixs_su = "*", ixs_fun_akt = "*", zmenit_kompetenta = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladMajPredaniOperationDtoTypes { predat = "boolean", ixs_su = "string", ixs_fun_akt = "string", zmenit_kompetenta = "boolean", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajPredaniOperationDtoTypeLengths {}
	/**Parametry převzetí dokladů*/
	interface GDokladMajPrevzetiOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = převzít)*/
		prevzit?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**změnit kompetenta?*/
		zmenit_kompetenta?: boolean|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladMajPrevzetiOperationDtoNames { prevzit = "prevzit", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", zmenit_kompetenta = "zmenit_kompetenta", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladMajPrevzetiOperationDtoFragments { prevzit = "*", ixs_su = "*", ixs_fun_akt = "*", zmenit_kompetenta = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladMajPrevzetiOperationDtoTypes { prevzit = "boolean", ixs_su = "string", ixs_fun_akt = "string", zmenit_kompetenta = "boolean", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajPrevzetiOperationDtoTypeLengths {}
	/**Parametry přidělení dokladů*/
	interface GDokladMajPrideleniOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = přidělit)*/
		pridelit?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladMajPrideleniOperationDtoNames { pridelit = "pridelit", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladMajPrideleniOperationDtoFragments { pridelit = "*", ixs_su = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladMajPrideleniOperationDtoTypes { pridelit = "boolean", ixs_su = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajPrideleniOperationDtoTypeLengths {}
	/**Parametry přeevidence dokladů*/
	interface GDokladMajPreevidenceOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = přidělit)*/
		preevidovat?: boolean|null;
		/**kniha*/
		ixp_den?: string|null;
		/**subřada*/
		subrada?: number|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
		/**uvolnění prostředků - upravit celkovou částku*/
		uvoln_celk_c?: boolean|null;
		/**uvolnění prostředků - upravit rozpis částky*/
		uvoln_rozpis_c?: boolean|null;
		/**uvolnění prostředků - stornovat doklad pfk*/
		uvoln_storno_pfk?: boolean|null;
	}
	const enum GDokladMajPreevidenceOperationDtoNames { preevidovat = "preevidovat", ixp_den = "ixp_den", subrada = "subrada", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", uvoln_celk_c = "uvoln_celk_c", uvoln_rozpis_c = "uvoln_rozpis_c", uvoln_storno_pfk = "uvoln_storno_pfk", ikc = "ikc", rows = "rows",}
	const enum GDokladMajPreevidenceOperationDtoFragments { preevidovat = "*", ixp_den = "*", subrada = "*", ixs_su = "*", ixs_fun_akt = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", uvoln_celk_c = "*", uvoln_rozpis_c = "*", uvoln_storno_pfk = "*", ikc = "*", rows = "*",}
	const enum GDokladMajPreevidenceOperationDtoTypes { preevidovat = "boolean", ixp_den = "string", subrada = "number", ixs_su = "string", ixs_fun_akt = "string", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", uvoln_celk_c = "boolean", uvoln_rozpis_c = "boolean", uvoln_storno_pfk = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajPreevidenceOperationDtoTypeLengths {}
	/**Parametry vrácení dokladů do WFL*/
	interface GDokladMajVraceniDoWflOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajpidDto> {
		/**požadovaná operace (true = vrátit)*/
		vratit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladMajVraceniDoWflOperationDtoNames { vratit = "vratit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladMajVraceniDoWflOperationDtoFragments { vratit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladMajVraceniDoWflOperationDtoTypes { vratit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajpidDto[]",}
	const enum GDokladMajVraceniDoWflOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkosklaDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekoskla*/
	interface GEkosklaDto {
		/**DBCOLUMN:ekoskla.skp*/
		skp?: string|null;
		/**DBCOLUMN:ekoskla.typ_kla*/
		typ_kla?: number|null;
		/**DBCOLUMN:ekoskla.typ_kla_txt*/
		typ_kla_txt?: string|null;
		/**DBCOLUMN:ekoskla.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekoskla.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekoskla.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:ekoskla.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ekoskla.kla_cast1*/
		kla_cast1?: string|null;
		/**DBCOLUMN:ekoskla.kla_cast2*/
		kla_cast2?: string|null;
		/**DBCOLUMN:ekoskla.kla_cast3*/
		kla_cast3?: string|null;
		/**DBCOLUMN:ekoskla.kla_cast4*/
		kla_cast4?: string|null;
		/**DBCOLUMN:ekoskla.kla_cast5*/
		kla_cast5?: string|null;
		/**DBCOLUMN:ekoskla.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekoskla.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkosklaDtoNames { skp = "skp", typ_kla = "typ_kla", typ_kla_txt = "typ_kla_txt", nazev = "nazev", aktivita = "aktivita", distribuce = "distribuce", cs_nazev = "cs_nazev", kla_cast1 = "kla_cast1", kla_cast2 = "kla_cast2", kla_cast3 = "kla_cast3", kla_cast4 = "kla_cast4", kla_cast5 = "kla_cast5", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkosklaDtoFragments { skp = "*", typ_kla = "*", typ_kla_txt = "*", nazev = "*", aktivita = "*", distribuce = "*", cs_nazev = "*", kla_cast1 = "*", kla_cast2 = "*", kla_cast3 = "*", kla_cast4 = "*", kla_cast5 = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkosklaDtoTypes { skp = "string", typ_kla = "number", typ_kla_txt = "string", nazev = "string", aktivita = "number", distribuce = "number", cs_nazev = "string", kla_cast1 = "string", kla_cast2 = "string", kla_cast3 = "string", kla_cast4 = "string", kla_cast5 = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkosklaDtoTypeLengths { skp = 15, nazev = 600, cs_nazev = 376, kla_cast1 = 2, kla_cast2 = 2, kla_cast3 = 2, kla_cast4 = 2, kla_cast5 = 2, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkosobjDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekosobj*/
	interface GEkosobjDto {
		/**DBCOLUMN:ekosobj.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:ekosobj.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekosobj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosobj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosobj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosobj.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkosobjDtoNames { objekt = "objekt", ico = "ico", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkosobjDtoFragments { objekt = "*", ico = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkosobjDtoTypes { objekt = "string", ico = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkosobjDtoTypeLengths { objekt = 8, ico = 10, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkosstrDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekosstr*/
	interface GEkosstrDto {
		/**DBCOLUMN:ekosstr.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekosstr.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:ekosstr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosstr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosstr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekosstr.priz_isl*/
		priz_isl?: number|null;
		/**DBCOLUMN:ekosstr.aktivita*/
		aktivita?: number|null;
	}
	const enum GEkosstrDtoNames { ico = "ico", stredisko = "stredisko", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_isl = "priz_isl", aktivita = "aktivita",}
	const enum GEkosstrDtoFragments { ico = "*", stredisko = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", priz_isl = "*", aktivita = "*",}
	const enum GEkosstrDtoTypes { ico = "string", stredisko = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_isl = "number", aktivita = "number",}
	const enum GEkosstrDtoTypeLengths { ico = 10, stredisko = 12, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkovkzoDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekovkzo*/
	interface GEkovkzoDto {
		/**DBCOLUMN:ekovkzo.skp*/
		skp?: string|null;
		/**DBCOLUMN:ekovkzo.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:ekovkzo.polozka_odp*/
		polozka_odp?: number|null;
		/**DBCOLUMN:ekovkzo.typ_kla*/
		typ_kla?: number|null;
		/**DBCOLUMN:ekovkzo.c_sazba_uc*/
		c_sazba_uc?: JsonDecimal|null;
		/**DBCOLUMN:ekovkzo.doba_uc*/
		doba_uc?: number|null;
		/**DBCOLUMN:ekovkzo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovkzo.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:ekovkzo.nazev_dp*/
		nazev_dp?: string|null;
		/**DBCOLUMN:ekovkzo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovkzo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekovkzo.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:ekovkzo.rok_do*/
		rok_do?: number|null;
	}
	const enum GEkovkzoDtoNames { skp = "skp", skupina_odp = "skupina_odp", polozka_odp = "polozka_odp", typ_kla = "typ_kla", c_sazba_uc = "c_sazba_uc", doba_uc = "doba_uc", aktivita = "aktivita", distribuce = "distribuce", nazev_dp = "nazev_dp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rok_od = "rok_od", rok_do = "rok_do",}
	const enum GEkovkzoDtoFragments { skp = "*", skupina_odp = "*", polozka_odp = "*", typ_kla = "*", c_sazba_uc = "*", doba_uc = "*", aktivita = "*", distribuce = "*", nazev_dp = "*", dat_zmena = "*", zmenu_prov = "*", rok_od = "*", rok_do = "*",}
	const enum GEkovkzoDtoTypes { skp = "string", skupina_odp = "string", polozka_odp = "number", typ_kla = "number", c_sazba_uc = "JsonDecimal", doba_uc = "number", aktivita = "number", distribuce = "number", nazev_dp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", rok_od = "number", rok_do = "number",}
	const enum GEkovkzoDtoTypeLengths { skp = 15, skupina_odp = 4, nazev_dp = 600, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkovobbDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekovobb*/
	interface GEkovobbDto {
		/**DBCOLUMN:ekovobb.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:ekovobb.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:ekovobb.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekovobb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovobb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovobb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Název objektu*/
		nazev_obj?: string|null;
		/**Název budovy*/
		budova_naz?: string|null;
	}
	const enum GEkovobbDtoNames { objekt = "objekt", budova_kod = "budova_kod", ico = "ico", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_obj = "nazev_obj", budova_naz = "budova_naz",}
	const enum GEkovobbDtoFragments { objekt = "*", budova_kod = "*", ico = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_obj = "*", budova_naz = "*",}
	const enum GEkovobbDtoTypes { objekt = "string", budova_kod = "string", ico = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_obj = "string", budova_naz = "string",}
	const enum GEkovobbDtoTypeLengths { objekt = 8, budova_kod = 8, ico = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GEkovobsDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekovobs*/
	interface GEkovobsDto {
		/**DBCOLUMN:ekovobs.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:ekovobs.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:ekovobs.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekovobs.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovobs.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovobs.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Název objektu*/
		nazev_obj?: string|null;
		/**Název střediska*/
		nazev_str?: string|null;
	}
	const enum GEkovobsDtoNames { objekt = "objekt", stredisko = "stredisko", ico = "ico", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_obj = "nazev_obj", nazev_str = "nazev_str",}
	const enum GEkovobsDtoFragments { objekt = "*", stredisko = "*", ico = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_obj = "*", nazev_str = "*",}
	const enum GEkovobsDtoTypes { objekt = "string", stredisko = "string", ico = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_obj = "string", nazev_str = "string",}
	const enum GEkovobsDtoTypeLengths { objekt = 8, stredisko = 12, ico = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GGincmejDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:gincmej*/
	interface GGincmejDto {
		/**DBCOLUMN:gincmej.mj*/
		mj?: string|null;
		/**DBCOLUMN:gincmej.mj_txt*/
		mj_txt?: string|null;
		/**DBCOLUMN:gincmej.mj_zkr*/
		mj_zkr?: string|null;
		/**DBCOLUMN:gincmej.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincmej.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincmej.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincmej.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincmej.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gincmej.uic*/
		uic?: string|null;
		/**DBCOLUMN:gincmej.mj_kod_typ*/
		mj_kod_typ?: string|null;
		/**DBCOLUMN:gincmej.mj_pk*/
		mj_pk?: JsonDecimal|null;
		/**DBCOLUMN:gincmej.mj_typ*/
		mj_typ?: string|null;
		/**DBCOLUMN:gincmej.priz_def*/
		priz_def?: string|null;
	}
	const enum GGincmejDtoNames { mj = "mj", mj_txt = "mj_txt", mj_zkr = "mj_zkr", k_v = "k_v", k_s = "k_s", dat_zmena = "dat_zmena", aktivita = "aktivita", zmenu_prov = "zmenu_prov", uic = "uic", mj_kod_typ = "mj_kod_typ", mj_pk = "mj_pk", mj_typ = "mj_typ", priz_def = "priz_def",}
	const enum GGincmejDtoFragments { mj = "*", mj_txt = "*", mj_zkr = "*", k_v = "*", k_s = "*", dat_zmena = "*", aktivita = "*", zmenu_prov = "*", uic = "*", mj_kod_typ = "*", mj_pk = "*", mj_typ = "*", priz_def = "*",}
	const enum GGincmejDtoTypes { mj = "string", mj_txt = "string", mj_zkr = "string", k_v = "number", k_s = "string", dat_zmena = "JsonDate", aktivita = "number", zmenu_prov = "string", uic = "string", mj_kod_typ = "string", mj_pk = "JsonDecimal", mj_typ = "string", priz_def = "string",}
	const enum GGincmejDtoTypeLengths { mj = 5, mj_txt = 50, mj_zkr = 16, k_s = 15, zmenu_prov = 12, uic = 2, mj_kod_typ = 2, mj_typ = 1, priz_def = 1,}
	/**ENUM:gincmej*/
	const enum GGincmejEnum {
		_0,
		/**Unce GB, US (31,10348 g)*/
		APZ,
		/**Suchý barel - US (115,627 dm3)*/
		BLD,
		/**Barel (petrolej) - US (158,987 dm3)*/
		BLL,
		/**Bušl - US (35,2391 dm3)*/
		BUA,
		/**Buši - UK (36,36874 dm3)*/
		BUI,
		/**Centilitr*/
		CLT,
		/**Čtvereční centimetr*/
		CMK,
		/**Krychlový centimetr*/
		CMQ,
		/**Centimetr*/
		CMT,
		/**Sto balíků*/
		CNP,
		/**Cent - GB (45,359237 kg)*/
		CNT,
		/**Karát (200 mg=2.10 kg)*/
		CTM,
		/**Cent - US (45,3592 kg)*/
		CWA,
		/**(Velký) cent GB (50,802345 kg)*/
		CWI,
		/**Decilitr*/
		DLT,
		/**Čtvereční decimetr*/
		DMK,
		/**Krychlový decimetr*/
		DMQ,
		/**Decimetr*/
		DMT,
		/**Tucet párů*/
		DPR,
		/**Dram US (3,887935 g)*/
		DRA,
		/**Dram GB (1,771745 g)*/
		DRI,
		/**Tucet svitků*/
		DRL,
		/**Drachm GB (3,887935 g=1/16 unce)*/
		DRM,
		/**Decituna*/
		DTN,
		/**Dvacetina unce GB, US (1,555174 g)*/
		DWT,
		/**Tucet (12)*/
		DZN,
		/**Tucet balíků*/
		DZP,
		/**Stopa (0,3048 m)*/
		FOT,
		/**Čtvereční stopa*/
		FTK,
		/**Krychlová stopa*/
		FTQ,
		/**Tucet veletuctů (12x144)*/
		GGR,
		/**Čtvrtka pinty - gill US (11,8294 dm3)*/
		GIA,
		/**Suchý galon - US (4,404884 dm3)*/
		GLD,
		/**Galon - UK (4,546092 dm3)*/
		GLI,
		/**Kapalný galon US (3,78541dm3)*/
		GLL,
		/**Gram*/
		GRM,
		/**Gran - grain GB, US (64,79891 mg=1/16 g)*/
		GRN,
		/**Veletucet (144)*/
		GRO,
		/**Čtvrtka pinty - gill UK (0,142065 dm3)*/
		Gll,
		/**Hektogram*/
		HGM,
		/**Sto mezinárodních jednotek*/
		HIU,
		/**Hektolitr*/
		HLT,
		/**Milion krychlových metrů*/
		HMQ,
		/**Hektometr*/
		HMT,
		/**Hektolitr čistého alkoholu*/
		HPA,
		/**Palec (25,4 mm)*/
		INH,
		/**Čtvereční palec*/
		INK,
		/**Krychlový palec*/
		INQ,
		/**Joule*/
		JOU,
		/**Kilogram*/
		KGM,
		/**Kilojoule*/
		KJO,
		/**Kilogram na m3*/
		KMQ,
		/**Kilogram dusíku*/
		KNI,
		/**Kilogram jmenovité substance*/
		KNS,
		/**Kilogram hydroxidu potaše*/
		KPH,
		/**Kilogram oxidu potaše*/
		KPO,
		/**Kilogram anhydridu fosforu*/
		KPP,
		/**Kus*/
		KS,
		/**Kilogram 90% suché substance*/
		KSD,
		/**Kilogram hydroxidu sody*/
		KSH,
		/**Kilotuna*/
		KTN,
		/**Kilogram uranu*/
		KUR,
		/**Kilowatt*/
		KWT,
		/**Libra (0,45359237 kg)*/
		LBR,
		/**Trojská libra US (373,242 g)*/
		LBT,
		/**Litr čistého alkoholu*/
		LPA,
		/**Velká tuna GB, US (1,0160469 tuny)*/
		LTN,
		/**Litr (1 dm3)*/
		LTR,
		/**Megalitr*/
		MAL,
		/**Megametr*/
		MAM,
		/**Megawatt*/
		MAW,
		/**Miligram*/
		MGM,
		/**Milion mezinárodních jednotek*/
		MIU,
		/**Mililitr*/
		MLT,
		/**Čtvereční milimetr*/
		MMK,
		/**Krychlový milimetr*/
		MMQ,
		/**Milimetr*/
		MMT,
		/**Čtvereční metr*/
		MTK,
		/**Krychlový metr*/
		MTQ,
		/**Metr*/
		MTR,
		/**Počet kusů*/
		NAR,
		/**Počet cívek*/
		NBB,
		/**Počet mazinárodních jednotek*/
		NIU,
		/**Počet balíků*/
		NMP,
		/**Počet balíčků*/
		NPL,
		/**Počet párů*/
		NPR,
		/**Počet druhů*/
		NPT,
		/**Počet svitků*/
		NRL,
		/**Unce GB, US (28,349523 g)*/
		ONZ,
		/**Kapalná unce - US (29,5735 cm3)*/
		OZA,
		/**Kapalná unce - UK (28,413 cm3)*/
		OZI,
		/**Cejchovaný galon*/
		PGL,
		/**Suchá pinta - US (0,55061 dm3)*/
		PTD,
		/**Pinta - UK (0,568262 dm3)*/
		PTI,
		/**Kapalná pinta (0,473176 dm3)*/
		PTL,
		/**Suchý čtvrtgalon - US (1,101221dm3)*/
		QTD,
		/**Čtvrtgalon - quart UK (1,136523 dm3)*/
		QTI,
		/**Kapalný čtvrtgalon - US (0,946353 dm3)*/
		QTL,
		/**Čtvrtcent GB (12,700586 kg)*/
		QTR,
		/**Score (20)*/
		SCO,
		/**Skrupul - Scruple GB, US (1,295982 g)*/
		SCR,
		/**Souprava*/
		SET,
		/**Lodní tuna*/
		SHT,
		/**Míle.-.(Statute).mile (1609,344 m)*/
		SMI,
		/**Krátký standard (7200 zápalek)*/
		SST,
		/**Kámen GB - stone GB (6,350293 kg=14 liber)*/
		STI,
		/**Malá tuna - short ton GB,US (0,90718474 tuny)*/
		STN,
		/**Metrická tuna (1000 kg)*/
		TNE,
		/**Deset párů*/
		TPR,
		/**Tuna 90% suché substance*/
		TSD,
		/**Sáh - cord (3,63 m3)*/
		WCD,
		/**Standard*/
		WSD,
		/**Watt*/
		WTT,
		/**Čtverečný yard*/
		YDK,
		/**Krychlový yard*/
		YDQ,
		/**Yard (0,9144 m)*/
		YRD,
	}
	function GGincmejEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincmejEnum, Gordic.Maj.Interface.GGincmejDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GGinskovDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ginskov*/
	interface GGinskovDto {
		/**Způsob využití*/
		kod_vyu?: number|null;
		/**Způsob využití*/
		kod_vyu_txt?: string|null;
		/**DBCOLUMN:ginskov.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginskov.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginskov.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginskov.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginskov.kod_vyu_rsx*/
		kod_vyu_rsx?: number|null;
	}
	const enum GGinskovDtoNames { kod_vyu = "kod_vyu", kod_vyu_txt = "kod_vyu_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", kod_vyu_rsx = "kod_vyu_rsx",}
	const enum GGinskovDtoFragments { kod_vyu = "*", kod_vyu_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", kod_vyu_rsx = "*",}
	const enum GGinskovDtoTypes { kod_vyu = "number", kod_vyu_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", kod_vyu_rsx = "number",}
	const enum GGinskovDtoTypeLengths { kod_vyu_txt = 50, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GKontrolaDotaceDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO pro data kontroly dotace*/
	interface GKontrolaDotaceDto {
		rokmes_uup?: number|null;
		priz_tzh?: number|null;
		rokmes_tzh?: number|null;
		/**částka TZH za období*/
		c_dotace_prev?: JsonDecimal|null;
		dat_tzh?: JsonDate|null;
		/**Celková částka transferu k UUP*/
		c_dotace_krt?: JsonDecimal|null;
		/**částky rozpisu k aktuálnímu období*/
		c_dotace_rozpis?: JsonDecimal|null;
	}
	const enum GKontrolaDotaceDtoNames { rokmes_uup = "rokmes_uup", priz_tzh = "priz_tzh", rokmes_tzh = "rokmes_tzh", c_dotace_prev = "c_dotace_prev", dat_tzh = "dat_tzh", c_dotace_krt = "c_dotace_krt", c_dotace_rozpis = "c_dotace_rozpis",}
	const enum GKontrolaDotaceDtoFragments { rokmes_uup = "*", priz_tzh = "*", rokmes_tzh = "*", c_dotace_prev = "*", dat_tzh = "*", c_dotace_krt = "*", c_dotace_rozpis = "*",}
	const enum GKontrolaDotaceDtoTypes { rokmes_uup = "number", priz_tzh = "number", rokmes_tzh = "number", c_dotace_prev = "JsonDecimal", dat_tzh = "JsonDate", c_dotace_krt = "JsonDecimal", c_dotace_rozpis = "JsonDecimal",}
	const enum GKontrolaDotaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajcosmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO odpisové skupiny*/
	interface GMajcosmDto {
		/**identifikace SKM*/
		skupina_odp?: string|null;
		rok_start?: number|null;
		rok_stop?: number|null;
		/**počet let odpisování*/
		doba_odp?: number|null;
		/**počet let oprávek*/
		doba_opr?: number|null;
	}
	const enum GMajcosmDtoNames { skupina_odp = "skupina_odp", rok_start = "rok_start", rok_stop = "rok_stop", doba_odp = "doba_odp", doba_opr = "doba_opr",}
	const enum GMajcosmDtoFragments { skupina_odp = "*", rok_start = "*", rok_stop = "*", doba_odp = "*", doba_opr = "*",}
	const enum GMajcosmDtoTypes { skupina_odp = "string", rok_start = "number", rok_stop = "number", doba_odp = "number", doba_opr = "number",}
	const enum GMajcosmDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajcstpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcstp*/
	interface GMajcstpDto {
		/**DBCOLUMN:majcstp.typ_dok*/
		typ_dok?: number|null;
		/**DBCOLUMN:majcstp.typ_dok_txt*/
		typ_dok_txt?: string|null;
		/**DBCOLUMN:majcstp.typ_dok_zkr*/
		typ_dok_zkr?: string|null;
		/**DBCOLUMN:majcstp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:majcstp.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**DBCOLUMN:majcstp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majcstp.typ_obs*/
		typ_obs?: number|null;
	}
	const enum GMajcstpDtoNames { typ_dok = "typ_dok", typ_dok_txt = "typ_dok_txt", typ_dok_zkr = "typ_dok_zkr", k_v = "k_v", gin_typ_inst = "gin_typ_inst", aktivita = "aktivita", typ_obs = "typ_obs",}
	const enum GMajcstpDtoFragments { typ_dok = "*", typ_dok_txt = "*", typ_dok_zkr = "*", k_v = "*", gin_typ_inst = "*", aktivita = "*", typ_obs = "*",}
	const enum GMajcstpDtoTypes { typ_dok = "number", typ_dok_txt = "string", typ_dok_zkr = "string", k_v = "number", gin_typ_inst = "string", aktivita = "number", typ_obs = "number",}
	const enum GMajcstpDtoTypeLengths { typ_dok_txt = 50, typ_dok_zkr = 16, gin_typ_inst = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajdpohDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majdpoh*/
	interface GMajdpohDto {
		/**DBCOLUMN:majdpoh.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:majdpoh.typ_dok*/
		typ_dok?: number|null;
		/**DBCOLUMN:majdpoh.dev*/
		dev?: number|null;
		/**DBCOLUMN:majdpoh.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majdpoh.por_poh*/
		por_poh?: number|null;
		/**DBCOLUMN:majdpoh.typ_poh*/
		typ_poh?: number|null;
		/**DBCOLUMN:majdpoh.storno_poh*/
		storno_poh?: number|null;
		/**DBCOLUMN:majdpoh.druh_poh*/
		druh_poh?: number|null;
		/**DBCOLUMN:majdpoh.nks_poh*/
		nks_poh?: number|null;
		/**DBCOLUMN:majdpoh.tev_cil*/
		tev_cil?: number|null;
		/**DBCOLUMN:majdpoh.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:majdpoh.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majdpoh.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majdpoh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majdpoh.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:majdpoh.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:majdpoh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majdpoh.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majdpoh.priz_tzh*/
		priz_tzh?: number|null;
		/**DBCOLUMN:majdpoh.real_tzh*/
		real_tzh?: number|null;
		/**DBCOLUMN:majdpoh.ktg_poh*/
		ktg_poh?: number|null;
		/**DBCOLUMN:majdpoh.ico*/
		ico?: string|null;
		/**PK pohybu*/
		id_poh?: string|null;
		/**skupina_zkr*/
		skupina_zkr?: string|null;
		/**priz_tzh_zkr*/
		priz_tzh_zkr?: string|null;
		/**real_tzh_zkr*/
		real_tzh_zkr?: string|null;
		/**ktg_poh_txt*/
		ktg_poh_txt?: string|null;
		/**ixs_zpz_txt*/
		ixs_zpz_txt?: string|null;
		/**dev_zkr*/
		dev_zkr?: string|null;
		/**typ_dok_zkr*/
		typ_dok_zkr?: string|null;
		/**typ_poh_zkr*/
		typ_poh_zkr?: string|null;
		/**Dru pohybu*/
		druh_poh_zkr?: string|null;
		/**nks pohybu*/
		nks_poh_txt?: string|null;
		/**tev_cil_zkr*/
		tev_cil_zkr?: string|null;
		/**Zkratka storna pohybu*/
		storno_poh_zkr?: string|null;
	}
	const enum GMajdpohDtoNames { kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", skupina_id = "skupina_id", por_poh = "por_poh", typ_poh = "typ_poh", storno_poh = "storno_poh", druh_poh = "druh_poh", nks_poh = "nks_poh", tev_cil = "tev_cil", ixs_zpz = "ixs_zpz", nazev = "nazev", distribuce = "distribuce", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_tzh = "priz_tzh", real_tzh = "real_tzh", ktg_poh = "ktg_poh", ico = "ico", id_poh = "id_poh", skupina_zkr = "skupina_zkr", priz_tzh_zkr = "priz_tzh_zkr", real_tzh_zkr = "real_tzh_zkr", ktg_poh_txt = "ktg_poh_txt", ixs_zpz_txt = "ixs_zpz_txt", dev_zkr = "dev_zkr", typ_dok_zkr = "typ_dok_zkr", typ_poh_zkr = "typ_poh_zkr", druh_poh_zkr = "druh_poh_zkr", nks_poh_txt = "nks_poh_txt", tev_cil_zkr = "tev_cil_zkr", storno_poh_zkr = "storno_poh_zkr",}
	const enum GMajdpohDtoFragments { kod_poh = "*", typ_dok = "*", dev = "*", skupina_id = "*", por_poh = "*", typ_poh = "*", storno_poh = "*", druh_poh = "*", nks_poh = "*", tev_cil = "*", ixs_zpz = "*", nazev = "*", distribuce = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", priz_tzh = "*", real_tzh = "*", ktg_poh = "*", ico = "*", id_poh = "*", skupina_zkr = "*", priz_tzh_zkr = "*", real_tzh_zkr = "*", ktg_poh_txt = "*", ixs_zpz_txt = "*", dev_zkr = "*", typ_dok_zkr = "*", typ_poh_zkr = "*", druh_poh_zkr = "*", nks_poh_txt = "*", tev_cil_zkr = "*", storno_poh_zkr = "*",}
	const enum GMajdpohDtoTypes { kod_poh = "number", typ_dok = "number", dev = "number", skupina_id = "number", por_poh = "number", typ_poh = "number", storno_poh = "number", druh_poh = "number", nks_poh = "number", tev_cil = "number", ixs_zpz = "string", nazev = "string", distribuce = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", priz_tzh = "number", real_tzh = "number", ktg_poh = "number", ico = "string", id_poh = "string", skupina_zkr = "string", priz_tzh_zkr = "string", real_tzh_zkr = "string", ktg_poh_txt = "string", ixs_zpz_txt = "string", dev_zkr = "string", typ_dok_zkr = "string", typ_poh_zkr = "string", druh_poh_zkr = "string", nks_poh_txt = "string", tev_cil_zkr = "string", storno_poh_zkr = "string",}
	const enum GMajdpohDtoTypeLengths { ixs_zpz = 12, nazev = 254, zmenu_prov = 12, ico = 10, id_poh = 17,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajhsodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majhsod*/
	interface GMajhsodDto {
		/**DBCOLUMN:majhsod.druh_odp*/
		druh_odp?: number|null;
		/**DBCOLUMN:majhsod.ico*/
		ico?: string|null;
		/**DBCOLUMN:majhsod.def_odp*/
		def_odp?: number|null;
		/**DBCOLUMN:majhsod.interval_odp*/
		interval_odp?: number|null;
		/**DBCOLUMN:majhsod.povolen*/
		povolen?: number|null;
		/**DBCOLUMN:majhsod.typ_round*/
		typ_round?: number|null;
		/**DBCOLUMN:majhsod.start_odp*/
		start_odp?: number|null;
		/**DBCOLUMN:majhsod.odpis_pomer*/
		odpis_pomer?: number|null;
		/**DBCOLUMN:majhsod.odp_12_month*/
		odp_12_month?: number|null;
		/**DBCOLUMN:majhsod.presnost_odp*/
		presnost_odp?: number|null;
		/**DBCOLUMN:majhsod.proc_vyrazeni*/
		proc_vyrazeni?: JsonDecimal|null;
		/**DBCOLUMN:majhsod.odp_vyr_month*/
		odp_vyr_month?: number|null;
		/**DBCOLUMN:majhsod.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majhsod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majhsod.rok*/
		rok?: number|null;
		/**DBCOLUMN:majhsod.c_min_dnm*/
		c_min_dnm?: JsonDecimal|null;
		/**DBCOLUMN:majhsod.c_min_dhm*/
		c_min_dhm?: JsonDecimal|null;
		/**DBCOLUMN:majhsod.zbytek_proc*/
		zbytek_proc?: JsonDecimal|null;
		/**Název algoritmu odpisu*/
		nazev?: string|null;
		/**Textový popis intervalu odpisu*/
		interval_odp_txt?: string|null;
		/**Textový popis příznaku odpisu*/
		priz_odp_txt?: string|null;
		/**Textový popis typu zaokrouhlení*/
		typ_round_txt?: string|null;
		/**Textový popis začátku odpisu*/
		start_odp_txt?: string|null;
		/**Textový popis poměru odpisu*/
		odpis_pomer_txt?: string|null;
		/**Textový popis 12 měsíčního odpisu*/
		odp_12_month_txt?: string|null;
		/**Textový popis přesnosti odpisu*/
		presnost_odp_txt?: string|null;
		/**Textový popis procenta vyřazení*/
		odp_vyr_m_txt?: string|null;
		/**Název režimu odpisu*/
		nazev_rf?: string|null;
	}
	const enum GMajhsodDtoNames { druh_odp = "druh_odp", ico = "ico", def_odp = "def_odp", interval_odp = "interval_odp", povolen = "povolen", typ_round = "typ_round", start_odp = "start_odp", odpis_pomer = "odpis_pomer", odp_12_month = "odp_12_month", presnost_odp = "presnost_odp", proc_vyrazeni = "proc_vyrazeni", odp_vyr_month = "odp_vyr_month", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rok = "rok", c_min_dnm = "c_min_dnm", c_min_dhm = "c_min_dhm", zbytek_proc = "zbytek_proc", nazev = "nazev", interval_odp_txt = "interval_odp_txt", priz_odp_txt = "priz_odp_txt", typ_round_txt = "typ_round_txt", start_odp_txt = "start_odp_txt", odpis_pomer_txt = "odpis_pomer_txt", odp_12_month_txt = "odp_12_month_txt", presnost_odp_txt = "presnost_odp_txt", odp_vyr_m_txt = "odp_vyr_m_txt", nazev_rf = "nazev_rf",}
	const enum GMajhsodDtoFragments { druh_odp = "*", ico = "*", def_odp = "*", interval_odp = "*", povolen = "*", typ_round = "*", start_odp = "*", odpis_pomer = "*", odp_12_month = "*", presnost_odp = "*", proc_vyrazeni = "*", odp_vyr_month = "*", dat_zmena = "*", zmenu_prov = "*", rok = "*", c_min_dnm = "*", c_min_dhm = "*", zbytek_proc = "*", nazev = "*", interval_odp_txt = "*", priz_odp_txt = "*", typ_round_txt = "*", start_odp_txt = "*", odpis_pomer_txt = "*", odp_12_month_txt = "*", presnost_odp_txt = "*", odp_vyr_m_txt = "*", nazev_rf = "*",}
	const enum GMajhsodDtoTypes { druh_odp = "number", ico = "string", def_odp = "number", interval_odp = "number", povolen = "number", typ_round = "number", start_odp = "number", odpis_pomer = "number", odp_12_month = "number", presnost_odp = "number", proc_vyrazeni = "JsonDecimal", odp_vyr_month = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rok = "number", c_min_dnm = "JsonDecimal", c_min_dhm = "JsonDecimal", zbytek_proc = "JsonDecimal", nazev = "string", interval_odp_txt = "string", priz_odp_txt = "string", typ_round_txt = "string", start_odp_txt = "string", odpis_pomer_txt = "string", odp_12_month_txt = "string", presnost_odp_txt = "string", odp_vyr_m_txt = "string", nazev_rf = "string",}
	const enum GMajhsodDtoTypeLengths { ico = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajmajDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GMajmajDto extends Gordic.Maj.Interface.GMajSeznamDto {
		/**PID - kvůli WFL, v MAJ se nepoužívá*/
		ixp?: string|null;
		/**jednoznačný ID maj. karty*/
		ixs_maj?: string|null;
		/**licence DB*/
		lic?: string|null;
		/**inventární číslo maj. karty*/
		inv_cis?: string|null;
		/**sériové číslo maj. karty*/
		ser_cis?: string|null;
		/**evidenční číslo maj. karty*/
		evi_cis?: string|null;
		/**výrobní číslo maj. karty*/
		vyr_cis?: string|null;
		/**rok výroby*/
		rok_vyr?: number|null;
		/**klasifikace výroby a produkce*/
		skp?: string|null;
		/**název zděděný z číselníku SKP*/
		nazev_skp?: string|null;
		/**uživatelem zadaný název*/
		nazev?: string|null;
		/**Su-Au pořízení*/
		ueab_por?: string|null;
		/**Su-Au oprávek*/
		ueab_opr?: string|null;
		/**Su-Au evidence*/
		ueab_evi?: string|null;
		/**cena za MJ (měrnou jednotku)*/
		cmj?: JsonDecimal|null;
		/**počet MJ*/
		pmj?: JsonDecimal|null;
		/**aktuální cena*/
		c?: JsonDecimal|null;
		/**minimální počet MJ (u množ. karty)*/
		pmj_min?: JsonDecimal|null;
		/**maximální počet MJ*/
		pmj_max?: JsonDecimal|null;
		/**reservovaný počet MJ*/
		pmj_res?: JsonDecimal|null;
		/**datum pořízení*/
		dat_por?: JsonDate|null;
		/**datum zařazení*/
		dat_zar?: JsonDate|null;
		/**datum vyřazení*/
		dat_vyr?: JsonDate|null;
		/**datum vzniku karty*/
		dat_vznik?: JsonDate|null;
		/**Datum vyřazení k zobrazení*/
		dat_vyr_show?: JsonDate|null;
		/**účetní středisko organizace*/
		ucs?: string|null;
		/**nákladové středisko organizace*/
		nks?: string|null;
		/**NKS nebo ID_TOP k zobrazení*/
		nks_show?: string|null;
		/**evidenční třída majetku, je-li tak členěn*/
		trida?: string|null;
		/**evidenční středisko organizace*/
		stredisko?: string|null;
		/**kód budovy*/
		budova_kod?: string|null;
		/**kód místnosti*/
		mistnost_kod?: string|null;
		/**organizační jednotka*/
		ixs_orj?: string|null;
		ixs_orj_txt?: string|null;
		/**zodpovědný člověk*/
		ixs_ref?: string|null;
		ixs_ref_txt?: string|null;
		/**ukazatel na soubor*/
		ixs_maj_nad?: string|null;
		/**typ souboru - účetní či logistický*/
		typ_soubor?: number|null;
		/**název souboru majetku*/
		jmeno_soubor?: string|null;
		/**inv. číslo souboru majetku*/
		inv_cis_soubor?: string|null;
		/**druh majetku*/
		drh_id?: number|null;
		drh_zkr?: string|null;
		/**skupina majetku*/
		skupina_id?: number|null;
		skupina_zkr?: string|null;
		/**měrná jednotka*/
		mj?: string|null;
		/**odpisová skupina*/
		skupina_odp?: string|null;
		/**položka zákona o dani z příjmu přidělující odpisovou skupinu*/
		polozka_odp?: number|null;
		/**typ evidence majetku dle MAJCTEM*/
		tev?: number|null;
		tev_zkr?: string|null;
		/**druh evidence majetku (např. vlastní, nevlastní...) dle MAJCDEM*/
		dev?: number|null;
		dev_zkr?: string|null;
		/**typ maj. karty dle MAJCTYK*/
		tka?: number|null;
		tka_zkr?: string|null;
		/**aktivita karty ( pořízení, evidence, vyřazená ) dle MAJCAKT*/
		mat_akt?: number|null;
		/**kód pohybu vyřazení karty*/
		kod_vyr?: number|null;
		/**kód pohybu pořízení karty*/
		kod_por?: number|null;
		poznamka?: string|null;
		/**příznak tisku etikety s inv. číslem*/
		tisk_eti?: number|null;
		/**příznak odpisu karty (podle režimu odpisu aktuální SKM)*/
		priz_odp?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**identifikace topologie karty - buď NKS nebo EVS (středisko)*/
		id_top?: string|null;
		/**identifikátor pořadí množinové karty pro ZEV = ng_zevMnozPorCis*/
		id_mnoz?: number|null;
		/**materiálové číslo - základní klasifikace majetku dle MAJSCIM*/
		mat_cis?: string|null;
		/**šarže*/
		sarze?: string|null;
		/**způsob evidence karty (šarže, UNQ apod.) dle MAJCZEV*/
		zev?: number|null;
		zev_zkr?: string|null;
		/**datum vypršení záruční lhůty*/
		expirace?: JsonDate|null;
		/**čárový kód*/
		ean?: string|null;
		/**odečet od daně z příjmu (v %PC)*/
		dp_ode?: JsonDecimal|null;
		/**typ DPH dle EKOCDAP*/
		dan_typ?: number|null;
		/**částka DPH*/
		c_dph?: JsonDecimal|null;
		/**celková částka včetně DPH*/
		c_c_dph?: JsonDecimal|null;
		/**způsob využití*/
		kod_vyu?: number|null;
		/**identifikace akce*/
		akce?: string|null;
		/**kód segmentu budovy dle GINSSBU*/
		segment_kod?: string|null;
		/**datum zaúčtování na skupinu účtů 01,02,03*/
		dat_uct_0123?: JsonDate|null;
		/**typ dokladu pořízení karty*/
		typ_dok_por?: number|null;
		/**typ dokladu vyřazení karty*/
		typ_dok_vyr?: number|null;
		/**příznak inventarizace karty*/
		inv_in?: number|null;
		/**stav karty v okamžiku zavedení do DB - měnitelné zařazením do užívání ( pořízení, evidence, vyřazená )*/
		stav_maj?: number|null;
		/**záruční lhůta v měsících*/
		lhuta_zaruka?: number|null;
		/**DBCOLUMN:Seznam.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:Seznam.stat_puvod*/
		stat_puvod?: number|null;
		/**DBCOLUMN:Seznam.stat_puvod_txt*/
		stat_puvod_txt?: string|null;
		/**identifikátor výrobce*/
		ixs_esu_vyr?: string|null;
		/**výrobce*/
		ixs_esu_vyr_txt?: string|null;
		/**identifikátor dodavatele*/
		ixs_esu_dod?: string|null;
		/**dodavatel*/
		ixs_esu_dod_txt?: string|null;
		/**identifikátor servisní organizace*/
		ixs_esu_servis?: string|null;
		/**servisní organizace*/
		ixs_esu_servis_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_maj*/
		typ_maj?: string|null;
		/**DBCOLUMN:Seznam.ktg_zar*/
		ktg_zar?: number|null;
		/**DBCOLUMN:Seznam.ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**délka*/
		rozmer_l?: JsonDecimal|null;
		/**šířka*/
		rozmer_w?: JsonDecimal|null;
		/**výška*/
		rozmer_h?: JsonDecimal|null;
		hmotnost?: JsonDecimal|null;
		/**kód stavu při převzetí*/
		prev_stav?: number|null;
		/**stav při převzetí*/
		prev_stav_txt?: string|null;
		mobilita?: number|null;
		mobilita_txt?: string|null;
		/**kód třídy bezpečnosti*/
		trida_bezp?: number|null;
		/**třída bezpečnosti*/
		trida_bezp_txt?: string|null;
		/**kód rizika při poruše*/
		riziko_por?: number|null;
		/**riziko při poruše*/
		riziko_por_txt?: string|null;
		/**hodnota odpočtu DPH*/
		c_dph_odpocet?: JsonDecimal|null;
		/**identifikátor vlastníka*/
		ixs_esu_vla?: string|null;
		/**vlastník*/
		ixs_esu_vla_txt?: string|null;
		/**GPS souřadnice - zeměpisná šířka*/
		gps_sirka?: string|null;
		/**GPS souřadnice - zeměpisná délka*/
		gps_delka?: string|null;
		/**externí lokalizace majetku*/
		ext_1?: number|null;
		/**externí lokalizace majetku*/
		ext_1_txt?: string|null;
		/**externí lokalizace majetku*/
		ext_2?: number|null;
		/**externí lokalizace majetku*/
		ext_2_txt?: string|null;
		/**externí lokalizace majetku*/
		ext_3?: number|null;
		/**externí lokalizace majetku*/
		ext_3_txt?: string|null;
		exists_rpren?: number|null;
		/**identifikátor množinové karty oddělující množinu karet s dočasně sníženou cenou nebo reálně oceněnou pro prodej*/
		id_krt_dev?: string|null;
		/**pořizovací cena karty*/
		c_poriz?: JsonDecimal|null;
		/**pořizovací cena karty*/
		c_dph_poriz?: JsonDecimal|null;
		/**pořizovací cena karty*/
		c_c_dph_poriz?: JsonDecimal|null;
		/**opravná položka karty*/
		c_opr_pol?: JsonDecimal|null;
		/**opravná položka karty*/
		c_dph_opr_pol?: JsonDecimal|null;
		/**opravná položka karty*/
		c_c_dph_opr_pol?: JsonDecimal|null;
		/**reálná cena karty*/
		c_real?: JsonDecimal|null;
		/**reálná cena karty*/
		c_dph_real?: JsonDecimal|null;
		/**reálná cena karty*/
		c_c_dph_real?: JsonDecimal|null;
		/**hodnota dotace/transferu*/
		c_dotace?: JsonDecimal|null;
		/**analytický údaj PAP/POR*/
		ke_pap?: string|null;
		/**analytický údaj PAP/POR*/
		kt_pap?: string|null;
		/**DBCOLUMN:Seznam.id_maj*/
		id_maj?: string|null;
		/**kód kategorie kulturní památky*/
		ktg_kp?: number|null;
		/**katalogové číslo v rejstříku*/
		cis_rejstrik_kp?: string|null;
		/**ID rejstříku*/
		id_rejstrik_kp?: string|null;
		/**datum UUP změny karty*/
		dat_uup?: JsonDate|null;
		/**prodejní cena*/
		cmj_pro1?: JsonDecimal|null;
		/**prodejní cena*/
		cmj_pro2?: JsonDecimal|null;
		/**prodejní cena*/
		cmj_pro3?: JsonDecimal|null;
		/**příznak*/
		s_prodej_skm?: number|null;
		/**příznak*/
		s_prodej_drm?: number|null;
		/**počítané políčko df_pro_r*/
		pro_r?: number|null;
		/**počítané políčko df_pro_m*/
		pro_m?: number|null;
		/**text pro políčko*/
		presnost_odp_txt?: string|null;
		/**nerozp. transfer*/
		c_dotace_ner?: JsonDecimal|null;
		/**PK pohybu*/
		id_poh?: string|null;
		/**DBCOLUMN:Seznam.ser_hst_maj*/
		ser_hst_maj?: number|null;
		/**rozšířený profil budovy*/
		rpb?: Gordic.Maj.Interface.GMajsrpbDto|null;
		/**DBCOLUMN:Seznam.kod_por_txt*/
		kod_por_txt?: string|null;
		/**DBCOLUMN:Seznam.kod_vyr_txt*/
		kod_vyr_txt?: string|null;
		/**odpisové údaje*/
		odp?: Gordic.Maj.Interface.GMajOdpisDto|null;
		/**odpisové údaje*/
		provoz_podm?: number[]|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Maj.Interface.GKartaMajPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GMajmajDtoNames { ixp = "ixp", ixs_maj = "ixs_maj", lic = "lic", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", rok_vyr = "rok_vyr", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", cmj = "cmj", pmj = "pmj", c = "c", pmj_min = "pmj_min", pmj_max = "pmj_max", pmj_res = "pmj_res", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_vznik = "dat_vznik", dat_vyr_show = "dat_vyr_show", ucs = "ucs", nks = "nks", nks_show = "nks_show", trida = "trida", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_orj_txt = "ixs_orj_txt", ixs_ref = "ixs_ref", ixs_ref_txt = "ixs_ref_txt", ixs_maj_nad = "ixs_maj_nad", typ_soubor = "typ_soubor", jmeno_soubor = "jmeno_soubor", inv_cis_soubor = "inv_cis_soubor", drh_id = "drh_id", drh_zkr = "drh_zkr", skupina_id = "skupina_id", skupina_zkr = "skupina_zkr", mj = "mj", skupina_odp = "skupina_odp", polozka_odp = "polozka_odp", tev = "tev", tev_zkr = "tev_zkr", dev = "dev", dev_zkr = "dev_zkr", tka = "tka", tka_zkr = "tka_zkr", mat_akt = "mat_akt", kod_vyr = "kod_vyr", kod_por = "kod_por", poznamka = "poznamka", tisk_eti = "tisk_eti", priz_odp = "priz_odp", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", id_top = "id_top", id_mnoz = "id_mnoz", mat_cis = "mat_cis", sarze = "sarze", zev = "zev", zev_zkr = "zev_zkr", expirace = "expirace", ean = "ean", dp_ode = "dp_ode", dan_typ = "dan_typ", c_dph = "c_dph", c_c_dph = "c_c_dph", kod_vyu = "kod_vyu", akce = "akce", segment_kod = "segment_kod", dat_uct_0123 = "dat_uct_0123", typ_dok_por = "typ_dok_por", typ_dok_vyr = "typ_dok_vyr", inv_in = "inv_in", stav_maj = "stav_maj", lhuta_zaruka = "lhuta_zaruka", objekt = "objekt", stat_puvod = "stat_puvod", stat_puvod_txt = "stat_puvod_txt", ixs_esu_vyr = "ixs_esu_vyr", ixs_esu_vyr_txt = "ixs_esu_vyr_txt", ixs_esu_dod = "ixs_esu_dod", ixs_esu_dod_txt = "ixs_esu_dod_txt", ixs_esu_servis = "ixs_esu_servis", ixs_esu_servis_txt = "ixs_esu_servis_txt", typ_maj = "typ_maj", ktg_zar = "ktg_zar", ktg_zar_txt = "ktg_zar_txt", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", hmotnost = "hmotnost", prev_stav = "prev_stav", prev_stav_txt = "prev_stav_txt", mobilita = "mobilita", mobilita_txt = "mobilita_txt", trida_bezp = "trida_bezp", trida_bezp_txt = "trida_bezp_txt", riziko_por = "riziko_por", riziko_por_txt = "riziko_por_txt", c_dph_odpocet = "c_dph_odpocet", ixs_esu_vla = "ixs_esu_vla", ixs_esu_vla_txt = "ixs_esu_vla_txt", gps_sirka = "gps_sirka", gps_delka = "gps_delka", ext_1 = "ext_1", ext_1_txt = "ext_1_txt", ext_2 = "ext_2", ext_2_txt = "ext_2_txt", ext_3 = "ext_3", ext_3_txt = "ext_3_txt", exists_rpren = "exists_rpren", id_krt_dev = "id_krt_dev", c_poriz = "c_poriz", c_dph_poriz = "c_dph_poriz", c_c_dph_poriz = "c_c_dph_poriz", c_opr_pol = "c_opr_pol", c_dph_opr_pol = "c_dph_opr_pol", c_c_dph_opr_pol = "c_c_dph_opr_pol", c_real = "c_real", c_dph_real = "c_dph_real", c_c_dph_real = "c_c_dph_real", c_dotace = "c_dotace", ke_pap = "ke_pap", kt_pap = "kt_pap", id_maj = "id_maj", ktg_kp = "ktg_kp", cis_rejstrik_kp = "cis_rejstrik_kp", id_rejstrik_kp = "id_rejstrik_kp", dat_uup = "dat_uup", cmj_pro1 = "cmj_pro1", cmj_pro2 = "cmj_pro2", cmj_pro3 = "cmj_pro3", s_prodej_skm = "s_prodej_skm", s_prodej_drm = "s_prodej_drm", pro_r = "pro_r", pro_m = "pro_m", presnost_odp_txt = "presnost_odp_txt", c_dotace_ner = "c_dotace_ner", id_poh = "id_poh", ser_hst_maj = "ser_hst_maj", rpb = "rpb", kod_por_txt = "kod_por_txt", kod_vyr_txt = "kod_vyr_txt", odp = "odp", provoz_podm = "provoz_podm", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajmajDtoFragments { ixp = "Base", ixs_maj = "Base", lic = "Base", inv_cis = "Base", ser_cis = "Base", evi_cis = "Base", vyr_cis = "Base", rok_vyr = "Base", skp = "Base", nazev_skp = "Base", nazev = "Base", ueab_por = "Base", ueab_opr = "Base", ueab_evi = "Base", cmj = "Base", pmj = "Base", c = "Base", pmj_min = "Base", pmj_max = "Base", pmj_res = "Base", dat_por = "Base", dat_zar = "Base", dat_vyr = "Base", dat_vznik = "Base", dat_vyr_show = "Base", ucs = "Base", nks = "Base", nks_show = "Base", trida = "Base", stredisko = "Base", budova_kod = "Base", mistnost_kod = "Base", ixs_orj = "Base", ixs_orj_txt = "Base", ixs_ref = "Base", ixs_ref_txt = "Base", ixs_maj_nad = "Base", typ_soubor = "Base", jmeno_soubor = "Base", inv_cis_soubor = "Base", drh_id = "Base", drh_zkr = "Base", skupina_id = "Base", skupina_zkr = "Base", mj = "Base", skupina_odp = "Base", polozka_odp = "Base", tev = "Base", tev_zkr = "Base", dev = "Base", dev_zkr = "Base", tka = "Base", tka_zkr = "Base", mat_akt = "Base", kod_vyr = "Base", kod_por = "Base", poznamka = "Base", tisk_eti = "Base", priz_odp = "Base", dat_zmena = "Base", zmenu_prov_txt = "Base", id_top = "Base", id_mnoz = "Base", mat_cis = "Base", sarze = "Base", zev = "Base", zev_zkr = "Base", expirace = "Base", ean = "Base", dp_ode = "Base", dan_typ = "Base", c_dph = "Base", c_c_dph = "Base", kod_vyu = "Base", akce = "Base", segment_kod = "Base", dat_uct_0123 = "Base", typ_dok_por = "Base", typ_dok_vyr = "Base", inv_in = "Base", stav_maj = "Base", lhuta_zaruka = "Base", objekt = "Base", stat_puvod = "Base", stat_puvod_txt = "Base", ixs_esu_vyr = "Base", ixs_esu_vyr_txt = "Base", ixs_esu_dod = "Base", ixs_esu_dod_txt = "Base", ixs_esu_servis = "Base", ixs_esu_servis_txt = "Base", typ_maj = "Base", ktg_zar = "Base", ktg_zar_txt = "Base", rozmer_l = "Base", rozmer_w = "Base", rozmer_h = "Base", hmotnost = "Base", prev_stav = "Base", prev_stav_txt = "Base", mobilita = "Base", mobilita_txt = "Base", trida_bezp = "Base", trida_bezp_txt = "Base", riziko_por = "Base", riziko_por_txt = "Base", c_dph_odpocet = "Base", ixs_esu_vla = "Base", ixs_esu_vla_txt = "Base", gps_sirka = "Base", gps_delka = "Base", ext_1 = "Base", ext_1_txt = "Base", ext_2 = "Base", ext_2_txt = "Base", ext_3 = "Base", ext_3_txt = "Base", exists_rpren = "Base", id_krt_dev = "Base", c_poriz = "Base", c_dph_poriz = "Base", c_c_dph_poriz = "Base", c_opr_pol = "Base", c_dph_opr_pol = "Base", c_c_dph_opr_pol = "Base", c_real = "Base", c_dph_real = "Base", c_c_dph_real = "Base", c_dotace = "Base", ke_pap = "Base", kt_pap = "Base", id_maj = "Base", ktg_kp = "Base", cis_rejstrik_kp = "Base", id_rejstrik_kp = "Base", dat_uup = "Base", cmj_pro1 = "Base", cmj_pro2 = "Base", cmj_pro3 = "Base", s_prodej_skm = "Base", s_prodej_drm = "Base", pro_r = "Base", pro_m = "Base", presnost_odp_txt = "Base", c_dotace_ner = "Base", id_poh = "Base", ser_hst_maj = "Base", rpb = "Base", kod_por_txt = "Base", kod_vyr_txt = "Base", odp = "Base", provoz_podm = "Base", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GMajmajDtoTypes { ixp = "string", ixs_maj = "string", lic = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", rok_vyr = "number", skp = "string", nazev_skp = "string", nazev = "string", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", cmj = "JsonDecimal", pmj = "JsonDecimal", c = "JsonDecimal", pmj_min = "JsonDecimal", pmj_max = "JsonDecimal", pmj_res = "JsonDecimal", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_vznik = "JsonDate", dat_vyr_show = "JsonDate", ucs = "string", nks = "string", nks_show = "string", trida = "string", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_orj_txt = "string", ixs_ref = "string", ixs_ref_txt = "string", ixs_maj_nad = "string", typ_soubor = "number", jmeno_soubor = "string", inv_cis_soubor = "string", drh_id = "number", drh_zkr = "string", skupina_id = "number", skupina_zkr = "string", mj = "string", skupina_odp = "string", polozka_odp = "number", tev = "number", tev_zkr = "string", dev = "number", dev_zkr = "string", tka = "number", tka_zkr = "string", mat_akt = "number", kod_vyr = "number", kod_por = "number", poznamka = "string", tisk_eti = "number", priz_odp = "number", dat_zmena = "JsonDate", zmenu_prov_txt = "string", id_top = "string", id_mnoz = "number", mat_cis = "string", sarze = "string", zev = "number", zev_zkr = "string", expirace = "JsonDate", ean = "string", dp_ode = "JsonDecimal", dan_typ = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", kod_vyu = "number", akce = "string", segment_kod = "string", dat_uct_0123 = "JsonDate", typ_dok_por = "number", typ_dok_vyr = "number", inv_in = "number", stav_maj = "number", lhuta_zaruka = "number", objekt = "string", stat_puvod = "number", stat_puvod_txt = "string", ixs_esu_vyr = "string", ixs_esu_vyr_txt = "string", ixs_esu_dod = "string", ixs_esu_dod_txt = "string", ixs_esu_servis = "string", ixs_esu_servis_txt = "string", typ_maj = "string", ktg_zar = "number", ktg_zar_txt = "string", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", hmotnost = "JsonDecimal", prev_stav = "number", prev_stav_txt = "string", mobilita = "number", mobilita_txt = "string", trida_bezp = "number", trida_bezp_txt = "string", riziko_por = "number", riziko_por_txt = "string", c_dph_odpocet = "JsonDecimal", ixs_esu_vla = "string", ixs_esu_vla_txt = "string", gps_sirka = "string", gps_delka = "string", ext_1 = "number", ext_1_txt = "string", ext_2 = "number", ext_2_txt = "string", ext_3 = "number", ext_3_txt = "string", exists_rpren = "number", id_krt_dev = "string", c_poriz = "JsonDecimal", c_dph_poriz = "JsonDecimal", c_c_dph_poriz = "JsonDecimal", c_opr_pol = "JsonDecimal", c_dph_opr_pol = "JsonDecimal", c_c_dph_opr_pol = "JsonDecimal", c_real = "JsonDecimal", c_dph_real = "JsonDecimal", c_c_dph_real = "JsonDecimal", c_dotace = "JsonDecimal", ke_pap = "string", kt_pap = "string", id_maj = "string", ktg_kp = "number", cis_rejstrik_kp = "string", id_rejstrik_kp = "string", dat_uup = "JsonDate", cmj_pro1 = "JsonDecimal", cmj_pro2 = "JsonDecimal", cmj_pro3 = "JsonDecimal", s_prodej_skm = "number", s_prodej_drm = "number", pro_r = "number", pro_m = "number", presnost_odp_txt = "string", c_dotace_ner = "JsonDecimal", id_poh = "string", ser_hst_maj = "number", rpb = "Gordic.Maj.Interface.GMajsrpbDto", kod_por_txt = "string", kod_vyr_txt = "string", odp = "Gordic.Maj.Interface.GMajOdpisDto", provoz_podm = "number[]", Permissions = "Gordic.Maj.Interface.GKartaMajPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GMajmajDtoTypeLengths { ixp = 12, id_poh = 17,}
	/**Primární klíč dokladu MAJ*/
	interface GKartaMajPkDto {
		/**PID dokladu SML*/
		ixs_maj?: string|null;
	}
	const enum GKartaMajPkDtoNames { ixs_maj = "ixs_maj",}
	const enum GKartaMajPkDtoFragments { ixs_maj = "*",}
	const enum GKartaMajPkDtoTypes { ixs_maj = "string",}
	const enum GKartaMajPkDtoTypeLengths { ixs_maj = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajmajInfoDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Dto pro základní informace o majetku*/
	interface GMajmajInfoDto {
		ixs_maj?: string|null;
		inv_cis?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**evidenční středisko*/
		stredisko?: string|null;
		/**organizační jednotka*/
		ixs_orj?: string|null;
		/**skupina*/
		skupina_id?: number|null;
		/**materiálové číslo - základní klasifikace majetku*/
		mat_cis?: string|null;
	}
	const enum GMajmajInfoDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", nks = "nks", stredisko = "stredisko", ixs_orj = "ixs_orj", skupina_id = "skupina_id", mat_cis = "mat_cis",}
	const enum GMajmajInfoDtoFragments { ixs_maj = "*", inv_cis = "*", nks = "*", stredisko = "*", ixs_orj = "*", skupina_id = "*", mat_cis = "*",}
	const enum GMajmajInfoDtoTypes { ixs_maj = "string", inv_cis = "string", nks = "string", stredisko = "string", ixs_orj = "string", skupina_id = "number", mat_cis = "string",}
	const enum GMajmajInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajMajPolDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_MajMajPol } DTO položky+karty MAJ dokladu*/
	interface GMajMajPolDto {
		/**Řádek položky dokladu*/
		pol?: Gordic.Maj.Interface.GMajpolozkaDto|null;
		/**record evidenční karty majetku*/
		maj?: Gordic.Maj.Interface.GMajmajDto|null;
		/**record na odprodeje majetku*/
		prodej?: Gordic.Maj.Interface.GMajProdejDto|null;
		/**účetní věta pro nedokončený majetek*/
		uct?: Gordic.Maj.Interface.GMajUctKontoDto|null;
		/**příznak existence položky v DB*/
		flagDB?: number|null;
		/**identifikace topologie*/
		id_top?: string|null;
		/**externí NKS*/
		nks_ext?: string|null;
		/**externí IČO*/
		ico_ext?: string|null;
		/**externí UCS*/
		ucs_ext?: string|null;
		/**Počet položek dokladu*/
		pocet_pol?: number|null;
		/**počet vybraných karet*/
		countMaj?: number|null;
		/**Datum změny (dokladu?)*/
		dat_zmena?: JsonDate|null;
		/**Termín zápůjčky*/
		dat_termin?: JsonDate|null;
		/**Datum uskutečnění účet.pohybu*/
		dat_uup?: JsonDate|null;
		/**ID exterbního subjektu*/
		ixs_esu?: string|null;
		/**popis ext. subjektu*/
		esu_txt?: string|null;
		sdat_zmena?: string|null;
		sdat_termin?: string|null;
		sdat_uup?: string|null;
		/**příznak commitu při gen. inv. čísla*/
		l_commit?: number|null;
		/**Celková cena (za doklad) bez DPH*/
		c_c?: JsonDecimal|null;
		/**Celková cena (za doklad) včetně DPH*/
		c_c_dph?: JsonDecimal|null;
		/**příznak, zda definuju cenu položek dokladu s DPH či ne*/
		c_with_dph?: boolean|null;
		/**příznak, zda budu přepočítávat cenu dle příznaku definice ceny s DPH nebo bez*/
		work_dph?: boolean|null;
		/**příznak, žda se uplatňuje odpočet dph*/
		odpocet_dph_no?: boolean|null;
		/**pro režim předplnění technického názvu z hlavičky dokladu*/
		nazev?: string|null;
		/**pro režim předplnění evi_cis hodnotou majpid.ac_ext*/
		ac_ext?: string|null;
		/**pomocné proměnné pro sazbu DPH*/
		c_sazbaDPH_low?: JsonDecimal|null;
		/**pomocné proměnné pro sazbu DPH*/
		c_sazbaDPH_base?: JsonDecimal|null;
		/**příznak, zda u účetního odpisu přecenit cenu při registraci k DPH*/
		uct_odp_changevc?: number|null;
		/**pomocná proměnná*/
		l_count?: number|null;
		/**pomocná proměnná*/
		l_count2?: number|null;
		log_por_cislo?: number|null;
		/**buffer pro kategorie pohybu dokladu*/
		ktg_poh_dok?: number[]|null;
		/**pomocná proměnná*/
		t1?: string|null;
		/**pomocná proměnná*/
		t2?: string|null;
		/**pomocná proměnná*/
		t3?: string|null;
		/**pomocná proměnná*/
		t4?: string|null;
		/**! 525.21 06.01.25*/
		dev_zkr?: string|null;
	}
	const enum GMajMajPolDtoNames { pol = "pol", maj = "maj", prodej = "prodej", uct = "uct", flagDB = "flagDB", id_top = "id_top", nks_ext = "nks_ext", ico_ext = "ico_ext", ucs_ext = "ucs_ext", pocet_pol = "pocet_pol", countMaj = "countMaj", dat_zmena = "dat_zmena", dat_termin = "dat_termin", dat_uup = "dat_uup", ixs_esu = "ixs_esu", esu_txt = "esu_txt", sdat_zmena = "sdat_zmena", sdat_termin = "sdat_termin", sdat_uup = "sdat_uup", l_commit = "l_commit", c_c = "c_c", c_c_dph = "c_c_dph", c_with_dph = "c_with_dph", work_dph = "work_dph", odpocet_dph_no = "odpocet_dph_no", nazev = "nazev", ac_ext = "ac_ext", c_sazbaDPH_low = "c_sazbaDPH_low", c_sazbaDPH_base = "c_sazbaDPH_base", uct_odp_changevc = "uct_odp_changevc", l_count = "l_count", l_count2 = "l_count2", log_por_cislo = "log_por_cislo", ktg_poh_dok = "ktg_poh_dok", t1 = "t1", t2 = "t2", t3 = "t3", t4 = "t4", dev_zkr = "dev_zkr",}
	const enum GMajMajPolDtoFragments { pol = "*", maj = "*", prodej = "*", uct = "*", flagDB = "*", id_top = "*", nks_ext = "*", ico_ext = "*", ucs_ext = "*", pocet_pol = "*", countMaj = "*", dat_zmena = "*", dat_termin = "*", dat_uup = "*", ixs_esu = "*", esu_txt = "*", sdat_zmena = "*", sdat_termin = "*", sdat_uup = "*", l_commit = "*", c_c = "*", c_c_dph = "*", c_with_dph = "*", work_dph = "*", odpocet_dph_no = "*", nazev = "*", ac_ext = "*", c_sazbaDPH_low = "*", c_sazbaDPH_base = "*", uct_odp_changevc = "*", l_count = "*", l_count2 = "*", log_por_cislo = "*", ktg_poh_dok = "*", t1 = "*", t2 = "*", t3 = "*", t4 = "*", dev_zkr = "*",}
	const enum GMajMajPolDtoTypes { pol = "Gordic.Maj.Interface.GMajpolozkaDto", maj = "Gordic.Maj.Interface.GMajmajDto", prodej = "Gordic.Maj.Interface.GMajProdejDto", uct = "Gordic.Maj.Interface.GMajUctKontoDto", flagDB = "number", id_top = "string", nks_ext = "string", ico_ext = "string", ucs_ext = "string", pocet_pol = "number", countMaj = "number", dat_zmena = "JsonDate", dat_termin = "JsonDate", dat_uup = "JsonDate", ixs_esu = "string", esu_txt = "string", sdat_zmena = "string", sdat_termin = "string", sdat_uup = "string", l_commit = "number", c_c = "JsonDecimal", c_c_dph = "JsonDecimal", c_with_dph = "boolean", work_dph = "boolean", odpocet_dph_no = "boolean", nazev = "string", ac_ext = "string", c_sazbaDPH_low = "JsonDecimal", c_sazbaDPH_base = "JsonDecimal", uct_odp_changevc = "number", l_count = "number", l_count2 = "number", log_por_cislo = "number", ktg_poh_dok = "number[]", t1 = "string", t2 = "string", t3 = "string", t4 = "string", dev_zkr = "string",}
	const enum GMajMajPolDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajOdpAllDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ ctbl_MajOdpAll }  Rekord historie odpisových údajů karty*/
	interface GMajOdpAllDto {
		/**inventární číslo karty*/
		inv_cis?: string|null;
		/**odpisová skupina majetku*/
		skupina_odp_u?: string|null;
		typ_odp_u_txt?: string|null;
		/**vstupní cena odpisu*/
		c_vstup_u?: JsonDecimal|null;
		/**sazba odpisu*/
		c_sazba_odp_u?: JsonDecimal|null;
		saz_koef_txt_u?: string|null;
		/**doba používání majetku*/
		doba_uziti_u?: number|null;
		/**výkon.odpis - částka odpisu související s měřitelnou jednotkou*/
		c_odp_mj_u?: JsonDecimal|null;
		/**oprávka odpisu*/
		c_opr_u?: JsonDecimal|null;
		/**Zůstatková cena*/
		c_zust_u?: JsonDecimal|null;
		/**zbytková hodnota*/
		c_zbytek_u?: JsonDecimal|null;
		/**odpis v aktuálním roce*/
		c_rok_odp_u?: JsonDecimal|null;
		/**poslední odpis*/
		c_last_odp_u?: JsonDecimal|null;
		/**částka aktuální hodnoty poměrné částky odpisu vůči dotaci*/
		c_dotace_odp_u?: JsonDecimal|null;
		/**částka celkové oprávky poměrné částky odpisu vůči dotaci*/
		c_dotace_opr_u?: JsonDecimal|null;
		/**vyskládaný text období z gf_setObd( rokobd_odp_u, mesobd_odp_u )*/
		obd_odp_u?: string|null;
		/**rok počátku odpisu*/
		rok_start_odp_u?: number|null;
		/**rok odpisování*/
		rok_odpisov_u?: number|null;
		/**rok technického zhodnocení*/
		rok_zvys_vc_u?: number|null;
		/**rok odpisování po technickém zhodnocení*/
		rok_odpisov_zvc_u?: number|null;
		/**příznak pozastavení odpisu*/
		stop_odpis_u?: number|null;
		/**počet roků, kdy byl pozastaven odpisu*/
		stop_rok_odp_u?: number|null;
		/**počet roků odpisu ze zvýšené vstupní ceny, kdy byl pozastaven odpisu*/
		stop_rok_odp_zvc_u?: number|null;
		/**pro speciální typy odpisu*/
		pocet_odp_u?: number|null;
		/**pro speciální typy odpisu*/
		presnost_odp_u?: number|null;
		skp_d?: string|null;
		/**odpisová skupina majetku*/
		skupina_odp_d?: string|null;
		typ_odp_d_txt?: string|null;
		/**sazba odpisu*/
		c_sazba_odp_d?: JsonDecimal|null;
		saz_koef_txt_d?: string|null;
		/**vstupní cena odpisu*/
		c_vstup_d?: JsonDecimal|null;
		/**oprávka odpisu*/
		c_opr_d?: JsonDecimal|null;
		/**Zůstatková cena*/
		c_zust_d?: JsonDecimal|null;
		/**zbytková hodnota*/
		c_zbytek_d?: JsonDecimal|null;
		/**odpis v aktuálním roce*/
		c_rok_odp_d?: JsonDecimal|null;
		/**poslední odpis*/
		c_last_odp_d?: JsonDecimal|null;
		/**vyskládaný text období z gf_setObd( rokobd_odp_u, mesobd_odp_u )*/
		obd_odp_d?: string|null;
		/**rok počátku odpisu*/
		rok_start_odp_d?: number|null;
		/**rok odpisování*/
		rok_odpisov_d?: number|null;
		/**rok technického zhodnocení*/
		rok_zvys_vc_d?: number|null;
		/**rok odpisování po technickém zhodnocení*/
		rok_odpisov_zvc_d?: number|null;
		/**příznak pozastavení odpisu*/
		stop_odpis_d?: number|null;
		/**počet roků, kdy byl pozastaven odpisu*/
		stop_rok_odp_d?: number|null;
		/**počet roků odpisu ze zvýšené vstupní ceny, kdy byl pozastaven odpisu*/
		stop_rok_odp_zvc_d?: number|null;
		/**pro speciální typy odpisu*/
		pocet_odp_d?: number|null;
		/**pro speciální typy odpisu*/
		presnost_odp_d?: number|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov?: string|null;
		zmenu_prov_txt?: string|null;
		ixs_maj?: string|null;
		/**pro speciální typy odpisu*/
		ser_hst_odp?: number|null;
		/**typ odpisu*/
		typ_odp_u?: number|null;
		/**příznak sazby nebo koef. (10=sazba. 20=koef)*/
		saz_koef_u?: number|null;
		/**typ odpisu - jemnější členění PK*/
		rok_start_typ_u?: number|null;
		/**Období odpisu (rok)*/
		rokobd_odp_u?: number|null;
		/**Období odpisu (měsíc)*/
		mesobd_odp_u?: number|null;
		/**typ odpisu*/
		typ_odp_d?: number|null;
		/**příznak sazby nebo koef. (10=sazba. 20=koef)*/
		saz_koef_d?: number|null;
		/**typ odpisu - jemnější členění PK*/
		rok_start_typ_d?: number|null;
		/**Období odpisu (rok)*/
		rokobd_odp_d?: number|null;
		/**Období odpisu (měsíc)*/
		mesobd_odp_d?: number|null;
		/**Ostrý odpis znamená hodnota 1*/
		ostry_odpis?: number|null;
	}
	const enum GMajOdpAllDtoNames { inv_cis = "inv_cis", skupina_odp_u = "skupina_odp_u", typ_odp_u_txt = "typ_odp_u_txt", c_vstup_u = "c_vstup_u", c_sazba_odp_u = "c_sazba_odp_u", saz_koef_txt_u = "saz_koef_txt_u", doba_uziti_u = "doba_uziti_u", c_odp_mj_u = "c_odp_mj_u", c_opr_u = "c_opr_u", c_zust_u = "c_zust_u", c_zbytek_u = "c_zbytek_u", c_rok_odp_u = "c_rok_odp_u", c_last_odp_u = "c_last_odp_u", c_dotace_odp_u = "c_dotace_odp_u", c_dotace_opr_u = "c_dotace_opr_u", obd_odp_u = "obd_odp_u", rok_start_odp_u = "rok_start_odp_u", rok_odpisov_u = "rok_odpisov_u", rok_zvys_vc_u = "rok_zvys_vc_u", rok_odpisov_zvc_u = "rok_odpisov_zvc_u", stop_odpis_u = "stop_odpis_u", stop_rok_odp_u = "stop_rok_odp_u", stop_rok_odp_zvc_u = "stop_rok_odp_zvc_u", pocet_odp_u = "pocet_odp_u", presnost_odp_u = "presnost_odp_u", skp_d = "skp_d", skupina_odp_d = "skupina_odp_d", typ_odp_d_txt = "typ_odp_d_txt", c_sazba_odp_d = "c_sazba_odp_d", saz_koef_txt_d = "saz_koef_txt_d", c_vstup_d = "c_vstup_d", c_opr_d = "c_opr_d", c_zust_d = "c_zust_d", c_zbytek_d = "c_zbytek_d", c_rok_odp_d = "c_rok_odp_d", c_last_odp_d = "c_last_odp_d", obd_odp_d = "obd_odp_d", rok_start_odp_d = "rok_start_odp_d", rok_odpisov_d = "rok_odpisov_d", rok_zvys_vc_d = "rok_zvys_vc_d", rok_odpisov_zvc_d = "rok_odpisov_zvc_d", stop_odpis_d = "stop_odpis_d", stop_rok_odp_d = "stop_rok_odp_d", stop_rok_odp_zvc_d = "stop_rok_odp_zvc_d", pocet_odp_d = "pocet_odp_d", presnost_odp_d = "presnost_odp_d", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ixs_maj = "ixs_maj", ser_hst_odp = "ser_hst_odp", typ_odp_u = "typ_odp_u", saz_koef_u = "saz_koef_u", rok_start_typ_u = "rok_start_typ_u", rokobd_odp_u = "rokobd_odp_u", mesobd_odp_u = "mesobd_odp_u", typ_odp_d = "typ_odp_d", saz_koef_d = "saz_koef_d", rok_start_typ_d = "rok_start_typ_d", rokobd_odp_d = "rokobd_odp_d", mesobd_odp_d = "mesobd_odp_d", ostry_odpis = "ostry_odpis",}
	const enum GMajOdpAllDtoFragments { inv_cis = "*", skupina_odp_u = "*", typ_odp_u_txt = "*", c_vstup_u = "*", c_sazba_odp_u = "*", saz_koef_txt_u = "*", doba_uziti_u = "*", c_odp_mj_u = "*", c_opr_u = "*", c_zust_u = "*", c_zbytek_u = "*", c_rok_odp_u = "*", c_last_odp_u = "*", c_dotace_odp_u = "*", c_dotace_opr_u = "*", obd_odp_u = "*", rok_start_odp_u = "*", rok_odpisov_u = "*", rok_zvys_vc_u = "*", rok_odpisov_zvc_u = "*", stop_odpis_u = "*", stop_rok_odp_u = "*", stop_rok_odp_zvc_u = "*", pocet_odp_u = "*", presnost_odp_u = "*", skp_d = "*", skupina_odp_d = "*", typ_odp_d_txt = "*", c_sazba_odp_d = "*", saz_koef_txt_d = "*", c_vstup_d = "*", c_opr_d = "*", c_zust_d = "*", c_zbytek_d = "*", c_rok_odp_d = "*", c_last_odp_d = "*", obd_odp_d = "*", rok_start_odp_d = "*", rok_odpisov_d = "*", rok_zvys_vc_d = "*", rok_odpisov_zvc_d = "*", stop_odpis_d = "*", stop_rok_odp_d = "*", stop_rok_odp_zvc_d = "*", pocet_odp_d = "*", presnost_odp_d = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", ixs_maj = "*", ser_hst_odp = "*", typ_odp_u = "*", saz_koef_u = "*", rok_start_typ_u = "*", rokobd_odp_u = "*", mesobd_odp_u = "*", typ_odp_d = "*", saz_koef_d = "*", rok_start_typ_d = "*", rokobd_odp_d = "*", mesobd_odp_d = "*", ostry_odpis = "*",}
	const enum GMajOdpAllDtoTypes { inv_cis = "string", skupina_odp_u = "string", typ_odp_u_txt = "string", c_vstup_u = "JsonDecimal", c_sazba_odp_u = "JsonDecimal", saz_koef_txt_u = "string", doba_uziti_u = "number", c_odp_mj_u = "JsonDecimal", c_opr_u = "JsonDecimal", c_zust_u = "JsonDecimal", c_zbytek_u = "JsonDecimal", c_rok_odp_u = "JsonDecimal", c_last_odp_u = "JsonDecimal", c_dotace_odp_u = "JsonDecimal", c_dotace_opr_u = "JsonDecimal", obd_odp_u = "string", rok_start_odp_u = "number", rok_odpisov_u = "number", rok_zvys_vc_u = "number", rok_odpisov_zvc_u = "number", stop_odpis_u = "number", stop_rok_odp_u = "number", stop_rok_odp_zvc_u = "number", pocet_odp_u = "number", presnost_odp_u = "number", skp_d = "string", skupina_odp_d = "string", typ_odp_d_txt = "string", c_sazba_odp_d = "JsonDecimal", saz_koef_txt_d = "string", c_vstup_d = "JsonDecimal", c_opr_d = "JsonDecimal", c_zust_d = "JsonDecimal", c_zbytek_d = "JsonDecimal", c_rok_odp_d = "JsonDecimal", c_last_odp_d = "JsonDecimal", obd_odp_d = "string", rok_start_odp_d = "number", rok_odpisov_d = "number", rok_zvys_vc_d = "number", rok_odpisov_zvc_d = "number", stop_odpis_d = "number", stop_rok_odp_d = "number", stop_rok_odp_zvc_d = "number", pocet_odp_d = "number", presnost_odp_d = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ixs_maj = "string", ser_hst_odp = "number", typ_odp_u = "number", saz_koef_u = "number", rok_start_typ_u = "number", rokobd_odp_u = "number", mesobd_odp_u = "number", typ_odp_d = "number", saz_koef_d = "number", rok_start_typ_d = "number", rokobd_odp_d = "number", mesobd_odp_d = "number", ostry_odpis = "number",}
	const enum GMajOdpAllDtoTypeLengths { skupina_odp_u = 4, skp_d = 15, skupina_odp_d = 4, zmenu_prov = 12, ixs_maj = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajOdpFiltrDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_OdpFiltrRec } DTO pro filtraci odpisových hodnot*/
	interface GMajOdpFiltrDto {
		/**záznam účetního odpisu karty*/
		ucet?: Gordic.Maj.Interface.GOdpRecDto|null;
		/**záznam daňového odpisu karty*/
		dan?: Gordic.Maj.Interface.GOdpRecDto|null;
	}
	const enum GMajOdpFiltrDtoNames { ucet = "ucet", dan = "dan",}
	const enum GMajOdpFiltrDtoFragments { ucet = "*", dan = "*",}
	const enum GMajOdpFiltrDtoTypes { ucet = "Gordic.Maj.Interface.GOdpRecDto", dan = "Gordic.Maj.Interface.GOdpRecDto",}
	const enum GMajOdpFiltrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajOdpisDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_MajOdp } ODP údaje MAJ karty*/
	interface GMajOdpisDto {
		/**Id. karty - často využito pro ověření EXISTENCE! odpisu pro danou KRT*/
		ixs_maj?: string|null;
		/**inv.č. karty*/
		inv_cis?: string|null;
		/**příznak, že došlo ke změně hodnot odpisu*/
		Changed?: boolean|null;
		/**záznam účetního odpisu karty*/
		ucet?: Gordic.Maj.Interface.GOdpRecDto|null;
		/**záznam daňového odpisu karty*/
		dan?: Gordic.Maj.Interface.GOdpRecDto|null;
	}
	const enum GMajOdpisDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", Changed = "Changed", ucet = "ucet", dan = "dan",}
	const enum GMajOdpisDtoFragments { ixs_maj = "*", inv_cis = "*", Changed = "*", ucet = "*", dan = "*",}
	const enum GMajOdpisDtoTypes { ixs_maj = "string", inv_cis = "string", Changed = "boolean", ucet = "Gordic.Maj.Interface.GOdpRecDto", dan = "Gordic.Maj.Interface.GOdpRecDto",}
	const enum GMajOdpisDtoTypeLengths { ixs_maj = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajpidDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_Majpid } DTO detailu MAJ dokladu*/
	interface GMajpidDto extends Gordic.Maj.Interface.GMajSeznamWflDto {
		/**Licence vzniku dokladu*/
		lic?: string|null;
		/**Datum podání dokladu*/
		dat_prij_pod?: JsonDate|null;
		/**Datum evidence*/
		dat_evid?: JsonDate|null;
		/**Identifikace knihy ve které je doklad evidován*/
		ixp_den?: string|null;
		/**Rok knihy*/
		rok_den?: number|null;
		/**Identifikace knihy ve které je doklad evidován - textově*/
		ixp_den_txt?: string|null;
		/**subřada knihy ve které je doklad evidován*/
		subrada?: number|null;
		/**evidenční číslo v knize dokladů*/
		ac?: string|null;
		/**agendové číslo v knize dokladů*/
		ac_ag?: string|null;
		/**IČO organizace kde je majetek veden*/
		ico?: string|null;
		/**Účetní středisko kde je majetek veden*/
		ucs?: string|null;
		/**Nákladové středisko kde je majetek veden*/
		nks?: string|null;
		/**topologická identifikace (buď NKS nebo EVS, které je hlediska převodů vlastní)*/
		id_top?: string|null;
		/**NKS nebo ev. středisko externí - druhé strany (příjemce nebo výdejce - podle statusu dokladu )*/
		nks_ext?: string|null;
		/**ico externí UJ*/
		ico_ext?: string|null;
		/**ucs externí UJ*/
		ucs_ext?: string|null;
		/**Příznak příslušnosti druhé strany k organizaci*/
		status_ext?: number|null;
		/**agendové číslo v externím informačním systému*/
		ac_ext?: string|null;
		/**datum vystavení dokladu v externím informačním systému*/
		dat_ext?: JsonDate|null;
		/**identifikátor externí druhé strany*/
		ixs_esu_ext?: string|null;
		esu_txt?: string|null;
		/**osoba/referent interní zápůjčky*/
		ixs_ref_int?: string|null;
		/**IČ externího subjektu*/
		ico_esu?: string|null;
		/**Rodné č. externího subjektu*/
		rc_esu?: string|null;
		/**Popis dokladu*/
		popis?: string|null;
		/**součet za všechny položky dokladu bez ohledu na typ položky*/
		c_c?: JsonDecimal|null;
		/**Součet příjmů za všechny položky dokladu*/
		c_1?: JsonDecimal|null;
		/**počet položek dokladu*/
		pocet_pol?: number|null;
		/**makro elementárních pohybů*/
		kod_poh?: number|null;
		/**ID typu materiálového dokladu*/
		typ_dok?: number|null;
		/**Název typu materiálového dokladu*/
		typ_dok_zkr?: string|null;
		/**název typu dokladu*/
		typ_dok_txt?: string|null;
		/**ID druhu evidence majetku*/
		dev?: number|null;
		/**Zkratka popisu druhu evidence majetku*/
		dev_zkr?: string|null;
		/**Status dokladu ( 0 = neúplný, 10 = úplný )*/
		status_mud?: number|null;
		/**příznak komunikace dokladu ( 0 = nekomunikuje, 10 = komunikuje)*/
		status_com?: number|null;
		/**Kategorie typu dokladu - grupa typů*/
		ktg_typ?: number|null;
		/**identifikátor typu dokumentu*/
		ixs_typ?: string|null;
		/**datum uskutečnění účetního případu*/
		dat_uup?: JsonDate|null;
		/**Datum proúčtování dokladu*/
		dat_uct?: string|null;
		/**ID stavu dokladu*/
		mp_stav?: number|null;
		/**zkratka pro popis stavu dokladu*/
		mp_stav_zkr?: string|null;
		/**Příznak proúčtování dokladu*/
		uct_stav?: number|null;
		/**aktivita záznamu dokladu*/
		aktivita?: number|null;
		/**párovací symbol na fakturu*/
		ps_fak?: string|null;
		/**stav párování na fakturu*/
		ps_fak_stav?: number|null;
		/**Rozpočtová položka ( rezerva )*/
		uex?: string|null;
		/**zatřídění dokladu do účetní období*/
		rok_obd?: number|null;
		/**DPH snížená sazba*/
		c_dph_s?: JsonDecimal|null;
		/**DPH normální sazba*/
		c_dph_n?: JsonDecimal|null;
		/**DPH 2. snížená sazba*/
		c_dph_3?: JsonDecimal|null;
		/**DPH 3. snížená sazba*/
		c_dph_4?: JsonDecimal|null;
		/**celková cena s DPH*/
		c_c_dph?: JsonDecimal|null;
		/**PID vázaného dokladu*/
		ixp_vaz?: string|null;
		/**identifikátor souboru, s kterým manipuluje doklad*/
		ixs_maj_nad?: string|null;
		/**sekundární vlastnost - inv. číslo souboru/majetku*/
		inv_cis_soub?: string|null;
		/**sekundární vlastnost -*/
		jmeno_soubor?: string|null;
		/**sekundární vlastnost - (.NET) název, popis souboru/majetku { cfc_Majpid.ixpEx }*/
		nazev_maj?: string|null;
		/**sekundární vlastnost - typ souboru, který je obsluhován dokladem*/
		typ_soubor?: number|null;
		/**identifikátor zapůjčené karty*/
		ixs_maj?: string|null;
		/**termín vrácení - (MAJSRES.DAT_TERMIN)*/
		dat_termin?: JsonDate|null;
		/**datum poslední změny dokladu*/
		dat_zmena?: JsonDate|null;
		/**sekundární vlastnost - Příznak tunelování na jiné NKS - je dán kombinací EKOSNKS.PRIZ_ISL a externího parametru vnucené havarijní obsluhy NKS k dané funkci MajInit.hs_nks.*/
		priz_tunel?: boolean|null;
		/**příznak přečtení dokladu*/
		priz_view?: number|null;
		/**zdůvodnění storna dokladu*/
		storno_duvod?: string|null;
		/**???*/
		odliti?: number|null;
		/**identifikátor navázaného dokladu*/
		ixp_prim?: string|null;
		/**Typ agendy navázaného dokladu*/
		typ_ag_prim?: number|null;
		/**Příznak odpisu majetku (u typu dokladu sloučení/rozdělení)*/
		priz_odp?: number|null;
		/**??? viz Init() - nevím zda bude třeba*/
		platce_dph?: number|null;
		/**celková cena s přirážkou*/
		c_pri?: JsonDecimal|null;
		/**Spotřeba - uživ.pole 1*/
		naklad_1?: string|null;
		/**Spotřeba - uživ.pole 2*/
		naklad_2?: string|null;
		/**Spotřeba - uživ.pole 3*/
		naklad_3?: string|null;
		/**Spotřeba - ORJ*/
		ixs_orj?: string|null;
		/**Spotřeba - osoba/referent*/
		ixs_ref?: string|null;
		/**Spotřeba - středisko EVS*/
		stredisko?: string|null;
		/**Spotřeba - objekt*/
		objekt?: string|null;
		/**Spotřeba - třída majetku*/
		trida?: string|null;
		/**Spotřeba - externí lokace 1*/
		ext_1?: number|null;
		/**Spotřeba - externí lokace 2*/
		ext_2?: number|null;
		/**Spotřeba - externí lokace 3*/
		ext_3?: number|null;
		/**sekundární/pomocná vlastnost - Skupina majetku (u dokladu typu sloučení/rozdělení)*/
		skupina_id?: number|null;
		/**???*/
		id_ext_poz?: number|null;
		/**kontrola správnosti tvaru PID typu X,Y*/
		check_exists?: boolean|null;
		/**datum zdanitelného plnění dokladu*/
		dat_zdan?: JsonDate|null;
		/**stupeň verifikace ESU*/
		stupen_ver?: number|null;
		/**sekundární/pomocná vlastnost - ID druhu majetku (karty)*/
		drh_id?: number|null;
		/**???*/
		l_rcp_subrada?: number|null;
		/**suma částky trannsferů za doklad - sesbírá to z položek*/
		c_dotace?: JsonDecimal|null;
		/**sekundární vlastnost - SU-AU evidence vybrané karty (u typu dokladu sloučení/rozdělení)*/
		ueab_evi?: string|null;
		/**typ ESU kvůli GDPR*/
		typ_esu?: number|null;
		/**Kód měny*/
		mena?: number|null;
		/**Zkratka měny*/
		mena_zkr?: string|null;
		/**Položka kurzovního lístku*/
		kurz?: JsonDecimal|null;
		/**Položka kurzovního lístku*/
		m_kurz?: JsonDecimal|null;
		/**celková částka v cizí měně*/
		c_c_mena?: JsonDecimal|null;
		/**ID kategorie majetkového pohybu*/
		ktg_poh?: number|null;
		/**počet nestornovaných položek dokladu*/
		pocet_pol_no_st?: number|null;
		/**údaj WFL - počet el.příloh*/
		poc_epri?: number|null;
		/**údaj WFL - typ el. přílohy*/
		typ_elp_txt?: string|null;
		/**údaj WFL - popis el. souboru*/
		popis_ixb?: string|null;
		/**údaj WFL - ID el. souboru*/
		ixb?: string|null;
		/**údaj WFL - příznak digitální formy dokumentu*/
		s_ele?: number|null;
		/**údaj WFL - příznak analogové formy dokumentu*/
		s_fyz?: number|null;
		/**údaj WFL - příznak el. podepsání dokumentu*/
		s_sgn?: number|null;
		/**údaj WFL - redistribuční stav písemnosti*/
		stav_dist?: number|null;
		/**sekundární/pomocná vlastnost - Hodnota KPI celkové ceny (c_c nebo c_pri)*/
		kpi_cpri?: JsonDecimal|null;
		/**sekundární/pomocná vlastnost - Hodnota KPI celkové ceny s DPH nebo v cizí měně (c_c_dph nebo c_c_mena)*/
		kpi_ccmena_ccdph?: JsonDecimal|null;
		/**sekundární/pomocná vlastnost - NKS příjemce (jen pro určité typy dokladu)*/
		nks_ext_pri?: string|null;
		/**sekundární/pomocná vlastnost - celková změna ceny dokladu*/
		c_c_zmena?: JsonDecimal|null;
		/**PK pohybu*/
		id_poh?: string|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_ref)*/
		referent?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_vyriz)*/
		kompetent?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**přístup k dokumentu*/
		pristup?: Gordic.Wfl.Interface.GWflPristupInfo|null;
		/**navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**údaj WFL - ID vlastníka*/
		ixs_fun_akt?: string|null;
		/**příznak, že se jedná o přijatou či vlastní písemnost (VAS.WFLCSPR)*/
		s_prij?: number|null;
		/**ID uzlu, kterému písemnost náleží*/
		ixs_su_akt?: string|null;
		/**stav původní příslušnosti k agendě (VAS.WFLCSDA)*/
		stav_sda?: number|null;
		/**pomocná proměnná - aktuální kniha z MAJSPID (může se lišit při přeevidenci)*/
		ixp_den_akt?: string|null;
		/**pomocná proměnná pro grid*/
		color_pview?: number|null;
		/**pomocná proměnná pro grid - Stav přeevidence dokladu*/
		stav_preevid?: string|null;
		/**pomocná proměnná pro grid - počty záznamů v tbl xxxspac - zjištění, zda doklad by přeevidován či nikoliv*/
		preevid?: number|null;
		/**Je doklad veden v jiné agendě?*/
		readonly JeVJineAgende?: boolean|null;
		/**Je doklad podaný?*/
		readonly JePodany?: boolean|null;
		/**Je doklad evidovaný?*/
		readonly JeEvidovany?: boolean|null;
		/**Je doklad schválený?*/
		readonly JeSchvaleny?: boolean|null;
		/**Je doklad zaúčtovaný?*/
		readonly JeZauctovany?: boolean|null;
		/**Je doklad ukončený?*/
		readonly JeUkonceny?: boolean|null;
		/**Je doklad stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Maj.Interface.GDokladMajPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GMajpidDtoNames { lic = "lic", dat_prij_pod = "dat_prij_pod", dat_evid = "dat_evid", ixp_den = "ixp_den", rok_den = "rok_den", ixp_den_txt = "ixp_den_txt", subrada = "subrada", ac = "ac", ac_ag = "ac_ag", ico = "ico", ucs = "ucs", nks = "nks", id_top = "id_top", nks_ext = "nks_ext", ico_ext = "ico_ext", ucs_ext = "ucs_ext", status_ext = "status_ext", ac_ext = "ac_ext", dat_ext = "dat_ext", ixs_esu_ext = "ixs_esu_ext", esu_txt = "esu_txt", ixs_ref_int = "ixs_ref_int", ico_esu = "ico_esu", rc_esu = "rc_esu", popis = "popis", c_c = "c_c", c_1 = "c_1", pocet_pol = "pocet_pol", kod_poh = "kod_poh", typ_dok = "typ_dok", typ_dok_zkr = "typ_dok_zkr", typ_dok_txt = "typ_dok_txt", dev = "dev", dev_zkr = "dev_zkr", status_mud = "status_mud", status_com = "status_com", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_uup = "dat_uup", dat_uct = "dat_uct", mp_stav = "mp_stav", mp_stav_zkr = "mp_stav_zkr", uct_stav = "uct_stav", aktivita = "aktivita", ps_fak = "ps_fak", ps_fak_stav = "ps_fak_stav", uex = "uex", rok_obd = "rok_obd", c_dph_s = "c_dph_s", c_dph_n = "c_dph_n", c_dph_3 = "c_dph_3", c_dph_4 = "c_dph_4", c_c_dph = "c_c_dph", ixp_vaz = "ixp_vaz", ixs_maj_nad = "ixs_maj_nad", inv_cis_soub = "inv_cis_soub", jmeno_soubor = "jmeno_soubor", nazev_maj = "nazev_maj", typ_soubor = "typ_soubor", ixs_maj = "ixs_maj", dat_termin = "dat_termin", dat_zmena = "dat_zmena", priz_tunel = "priz_tunel", priz_view = "priz_view", storno_duvod = "storno_duvod", odliti = "odliti", ixp_prim = "ixp_prim", typ_ag_prim = "typ_ag_prim", priz_odp = "priz_odp", platce_dph = "platce_dph", c_pri = "c_pri", naklad_1 = "naklad_1", naklad_2 = "naklad_2", naklad_3 = "naklad_3", ixs_orj = "ixs_orj", ixs_ref = "ixs_ref", stredisko = "stredisko", objekt = "objekt", trida = "trida", ext_1 = "ext_1", ext_2 = "ext_2", ext_3 = "ext_3", skupina_id = "skupina_id", id_ext_poz = "id_ext_poz", check_exists = "check_exists", dat_zdan = "dat_zdan", stupen_ver = "stupen_ver", drh_id = "drh_id", l_rcp_subrada = "l_rcp_subrada", c_dotace = "c_dotace", ueab_evi = "ueab_evi", typ_esu = "typ_esu", mena = "mena", mena_zkr = "mena_zkr", kurz = "kurz", m_kurz = "m_kurz", c_c_mena = "c_c_mena", ktg_poh = "ktg_poh", pocet_pol_no_st = "pocet_pol_no_st", poc_epri = "poc_epri", typ_elp_txt = "typ_elp_txt", popis_ixb = "popis_ixb", ixb = "ixb", s_ele = "s_ele", s_fyz = "s_fyz", s_sgn = "s_sgn", stav_dist = "stav_dist", kpi_cpri = "kpi_cpri", kpi_ccmena_ccdph = "kpi_ccmena_ccdph", nks_ext_pri = "nks_ext_pri", c_c_zmena = "c_c_zmena", id_poh = "id_poh", vlastnik = "vlastnik", referent = "referent", kompetent = "kompetent", pristup = "pristup", dokument = "dokument", vlastnosti = "vlastnosti", ixs_fun_akt = "ixs_fun_akt", s_prij = "s_prij", ixs_su_akt = "ixs_su_akt", stav_sda = "stav_sda", ixp_den_akt = "ixp_den_akt", color_pview = "color_pview", stav_preevid = "stav_preevid", preevid = "preevid", JeVJineAgende = "JeVJineAgende", JePodany = "JePodany", JeEvidovany = "JeEvidovany", JeSchvaleny = "JeSchvaleny", JeZauctovany = "JeZauctovany", JeUkonceny = "JeUkonceny", JeStornovany = "JeStornovany", Permissions = "Permissions", PrimaryKey = "PrimaryKey", ixp = "ixp", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajpidDtoFragments { lic = "Base", dat_prij_pod = "Base", dat_evid = "Base", ixp_den = "Base", rok_den = "Base", ixp_den_txt = "Base", subrada = "Base", ac = "Base", ac_ag = "Base", ico = "Base", ucs = "Base", nks = "Base", id_top = "Base", nks_ext = "Base", ico_ext = "Base", ucs_ext = "Base", status_ext = "Base", ac_ext = "Base", dat_ext = "Base", ixs_esu_ext = "Base", esu_txt = "Base", ixs_ref_int = "Base", ico_esu = "Base", rc_esu = "Base", popis = "Base", c_c = "Base", c_1 = "Base", pocet_pol = "Base", kod_poh = "Base", typ_dok = "Base", typ_dok_zkr = "typ_dokladu", typ_dok_txt = "typ_dokladu", dev = "Base", dev_zkr = "Base", status_mud = "Base", status_com = "Base", ktg_typ = "Base", ixs_typ = "Base", dat_uup = "Base", dat_uct = "Base", mp_stav = "Base", mp_stav_zkr = "Base", uct_stav = "Base", aktivita = "Base", ps_fak = "Base", ps_fak_stav = "Base", uex = "Base", rok_obd = "Base", c_dph_s = "Base", c_dph_n = "Base", c_dph_3 = "Base", c_dph_4 = "Base", c_c_dph = "Base", ixp_vaz = "Base", ixs_maj_nad = "Base", inv_cis_soub = "Base", jmeno_soubor = "Base", nazev_maj = "Base", typ_soubor = "Base", ixs_maj = "Base", dat_termin = "Base", dat_zmena = "Base", priz_tunel = "Base", priz_view = "Base", storno_duvod = "Base", odliti = "Base", ixp_prim = "Base", typ_ag_prim = "Base", priz_odp = "Base", platce_dph = "Base", c_pri = "Base", naklad_1 = "Base", naklad_2 = "Base", naklad_3 = "Base", ixs_orj = "Base", ixs_ref = "Base", stredisko = "Base", objekt = "Base", trida = "Base", ext_1 = "Base", ext_2 = "Base", ext_3 = "Base", skupina_id = "Base", id_ext_poz = "Base", check_exists = "Base", dat_zdan = "Base", stupen_ver = "Base", drh_id = "Base", l_rcp_subrada = "Base", c_dotace = "Base", ueab_evi = "Base", typ_esu = "Base", mena = "Base", mena_zkr = "Base", kurz = "Base", m_kurz = "Base", c_c_mena = "Base", ktg_poh = "Base", pocet_pol_no_st = "Base", poc_epri = "Base", typ_elp_txt = "Base", popis_ixb = "Base", ixb = "Base", s_ele = "Base", s_fyz = "Base", s_sgn = "Base", stav_dist = "Base", kpi_cpri = "Base", kpi_ccmena_ccdph = "Base", nks_ext_pri = "Base", c_c_zmena = "Base", id_poh = "Base", vlastnik = "vlastnik", referent = "referent", kompetent = "kompetent", pristup = "pristup", dokument = "dokument", vlastnosti = "vlastnosti", ixs_fun_akt = "Base", s_prij = "Base", ixs_su_akt = "Base", stav_sda = "Base", ixp_den_akt = "Base", color_pview = "Base", stav_preevid = "Base", preevid = "Base", JeVJineAgende = "Base", JePodany = "Base", JeEvidovany = "Base", JeSchvaleny = "Base", JeZauctovany = "Base", JeUkonceny = "Base", JeStornovany = "Base", Permissions = "Permissions", PrimaryKey = "*", ixp = "Base", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", PrimaryKeyInFilters = "*",}
	const enum GMajpidDtoTypes { lic = "string", dat_prij_pod = "JsonDate", dat_evid = "JsonDate", ixp_den = "string", rok_den = "number", ixp_den_txt = "string", subrada = "number", ac = "string", ac_ag = "string", ico = "string", ucs = "string", nks = "string", id_top = "string", nks_ext = "string", ico_ext = "string", ucs_ext = "string", status_ext = "number", ac_ext = "string", dat_ext = "JsonDate", ixs_esu_ext = "string", esu_txt = "string", ixs_ref_int = "string", ico_esu = "string", rc_esu = "string", popis = "string", c_c = "JsonDecimal", c_1 = "JsonDecimal", pocet_pol = "number", kod_poh = "number", typ_dok = "number", typ_dok_zkr = "string", typ_dok_txt = "string", dev = "number", dev_zkr = "string", status_mud = "number", status_com = "number", ktg_typ = "number", ixs_typ = "string", dat_uup = "JsonDate", dat_uct = "string", mp_stav = "number", mp_stav_zkr = "string", uct_stav = "number", aktivita = "number", ps_fak = "string", ps_fak_stav = "number", uex = "string", rok_obd = "number", c_dph_s = "JsonDecimal", c_dph_n = "JsonDecimal", c_dph_3 = "JsonDecimal", c_dph_4 = "JsonDecimal", c_c_dph = "JsonDecimal", ixp_vaz = "string", ixs_maj_nad = "string", inv_cis_soub = "string", jmeno_soubor = "string", nazev_maj = "string", typ_soubor = "number", ixs_maj = "string", dat_termin = "JsonDate", dat_zmena = "JsonDate", priz_tunel = "boolean", priz_view = "number", storno_duvod = "string", odliti = "number", ixp_prim = "string", typ_ag_prim = "number", priz_odp = "number", platce_dph = "number", c_pri = "JsonDecimal", naklad_1 = "string", naklad_2 = "string", naklad_3 = "string", ixs_orj = "string", ixs_ref = "string", stredisko = "string", objekt = "string", trida = "string", ext_1 = "number", ext_2 = "number", ext_3 = "number", skupina_id = "number", id_ext_poz = "number", check_exists = "boolean", dat_zdan = "JsonDate", stupen_ver = "number", drh_id = "number", l_rcp_subrada = "number", c_dotace = "JsonDecimal", ueab_evi = "string", typ_esu = "number", mena = "number", mena_zkr = "string", kurz = "JsonDecimal", m_kurz = "JsonDecimal", c_c_mena = "JsonDecimal", ktg_poh = "number", pocet_pol_no_st = "number", poc_epri = "number", typ_elp_txt = "string", popis_ixb = "string", ixb = "string", s_ele = "number", s_fyz = "number", s_sgn = "number", stav_dist = "number", kpi_cpri = "JsonDecimal", kpi_ccmena_ccdph = "JsonDecimal", nks_ext_pri = "string", c_c_zmena = "JsonDecimal", id_poh = "string", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", referent = "Gordic.Gin.Interface.GFunkcniMistoDto", kompetent = "Gordic.Gin.Interface.GFunkcniMistoDto", pristup = "Gordic.Wfl.Interface.GWflPristupInfo", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixs_fun_akt = "string", s_prij = "number", ixs_su_akt = "string", stav_sda = "number", ixp_den_akt = "string", color_pview = "number", stav_preevid = "string", preevid = "number", JeVJineAgende = "boolean", JePodany = "boolean", JeEvidovany = "boolean", JeSchvaleny = "boolean", JeZauctovany = "boolean", JeUkonceny = "boolean", JeStornovany = "boolean", Permissions = "Gordic.Maj.Interface.GDokladMajPermission", PrimaryKey = "string", ixp = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", PrimaryKeyInFilters = "string",}
	const enum GMajpidDtoTypeLengths { id_poh = 17, ixs_su_akt = 12, ixp = 12,}
	/**Primární klíč dokladu MAJ*/
	interface GDokladMajPkDto {
		/**PID dokladu SML*/
		ixp?: string|null;
	}
	const enum GDokladMajPkDtoNames { ixp = "ixp",}
	const enum GDokladMajPkDtoFragments { ixp = "*",}
	const enum GDokladMajPkDtoTypes { ixp = "string",}
	const enum GDokladMajPkDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajpidmajDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Dto pro doklad a kartu*/
	interface GMajpidmajDto {
		/**Doklad*/
		pid?: Gordic.Maj.Interface.GMajpidDto|null;
		/**Karta*/
		maj?: Gordic.Maj.Interface.GMajmajDto|null;
	}
	const enum GMajpidmajDtoNames { pid = "pid", maj = "maj",}
	const enum GMajpidmajDtoFragments { pid = "*", maj = "*",}
	const enum GMajpidmajDtoTypes { pid = "Gordic.Maj.Interface.GMajpidDto", maj = "Gordic.Maj.Interface.GMajmajDto",}
	const enum GMajpidmajDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajPolozkaDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_MajPol } DTO položky MAJ dokladu*/
	interface GMajpolozkaDto {
		/**PID*/
		ixp?: string|null;
		/**Licence*/
		lic?: string|null;
		/**poř. číslo položky dokladu*/
		ser_cislo?: number|null;
		ser_pcislo?: number|null;
		/**pořadí elem. pohybu v makru*/
		por_poh?: number|null;
		/**číslo pohybu*/
		kod_poh?: number|null;
		/**kód typu dokladu*/
		typ_dok?: number|null;
		/**druh evidence*/
		dev?: number|null;
		/**PK pohybu*/
		id_poh?: string|null;
		/**PK pohybu anti*/
		id_poh_anti?: string|null;
		/**identifikátor karty*/
		ixs_maj?: string|null;
		/**inv. číslo karty*/
		inv_cis?: string|null;
		/**výrobní číslo karty*/
		vyr_cis?: string|null;
		/**id. skupiny majetku*/
		skupina_id?: number|null;
		/**AČ dokladu*/
		ac?: string|null;
		/**uživatelem zadaný název*/
		nazev?: string|null;
		/**algoritmus pohybu*/
		typ_poh?: number|null;
		/**druh pohybu(U, O )*/
		druh_poh?: number|null;
		/**datum pohybu*/
		dat_poh?: JsonDate|null;
		/**datum proúčtování pohybu*/
		dat_uct?: string|null;
		/**organizace*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**Typ karty*/
		tka?: number|null;
		/**Stav*/
		mp_stav?: number|null;
		/**Příznak storna pohybu*/
		st_stav?: number|null;
		/**příznak komunikace*/
		status_com?: number|null;
		/**měrná jednotka - kód dle VAS.GINCMEJ*/
		mj?: string|null;
		/**množství manipulované pohybem*/
		m?: JsonDecimal|null;
		/**cena manipulovaná pohybem*/
		c?: JsonDecimal|null;
		/**cena za 1 MJ*/
		cmj?: JsonDecimal|null;
		/**základní klasifikace - mat.číslo*/
		mat_cis?: string|null;
		/**klasifikace SKP*/
		skp?: string|null;
		/**druh majetku (VAS.MAJSDRM)*/
		drh_id?: number|null;
		/**SuAu pořízení*/
		ueab_por?: string|null;
		/**SuAu evidence*/
		ueab_evi?: string|null;
		/**SuAu oprávek*/
		ueab_opr?: string|null;
		/**odpisová skupina*/
		skupina_odp?: string|null;
		/**maj.třída*/
		trida?: string|null;
		/**ukazatel na řádek v historii karty*/
		ser_hst_maj?: number|null;
		/**ukazatel na řádek v historii odpisů karty*/
		ser_hst_odp?: number|null;
		/**typ souboru - UCT,LOG*/
		typ_soubor?: number|null;
		/**DPH (částka)*/
		c_dph?: JsonDecimal|null;
		/**celková cena s DPH*/
		c_c_dph?: JsonDecimal|null;
		/**odpočet DPH*/
		c_dph_odpocet?: JsonDecimal|null;
		c_pri?: JsonDecimal|null;
		/**transfer (částka)*/
		c_dotace?: JsonDecimal|null;
		/**identifikátor souboru, s kterým manipuluje doklad*/
		ixs_maj_nad?: string|null;
		/**sekundární vlastnost - inv. číslo souboru/majetku*/
		inv_cis_soubor?: string|null;
		/**IXP dodacího listu*/
		ixp_dod?: string|null;
		/**příznak odpisu*/
		priz_odp?: number|null;
		/**číslo položky "dodáku"*/
		cis_dod?: number|null;
		/**vazba na prim. doklad*/
		ixp_xpl?: string|null;
		/**vazba na VP prim.dokladu*/
		cis_xpl?: number|null;
		/**vazba na VP prim.dokladu*/
		tev_cil?: number|null;
		/**Popis*/
		popis?: string|null;
		/**příznak položek/pohybů v rámci jedné operace*/
		oper_cislo?: number|null;
		/**vazba dokladu na požadavky*/
		ixp_bnd?: string|null;
		/**vazba dokladu na požadavky*/
		lic_bnd?: string|null;
		/**vazba dokladu na požadavky*/
		ser_cislo_bnd?: number|null;
		/**kód měny (VAS.EKOCMEN)*/
		mena?: number|null;
		kurz?: JsonDecimal|null;
		/**transfer (částka)*/
		m_kurz?: JsonDecimal|null;
		/**částka v dané měně*/
		c_mena?: JsonDecimal|null;
		/**zkratka měny*/
		mena_zkr?: string|null;
		priz_tzh?: number|null;
		real_tzh?: number|null;
		ser_cislo_tzh?: number|null;
		ktg_poh?: number|null;
		skupina_id_cil?: number|null;
		/**pomocmé proměnné pro uložení externích ID (žádosti - SEM)*/
		id_ext?: string|null;
		/**Polozka zadosti*/
		pol_ext?: number|null;
		/**id množiny zgrupovaných žádostí v případě hromadné obsluhy žádostí*/
		id_ext_poz?: number|null;
		/**pomocmé proměnné pro uložení externích ID (žádosti - SEM)*/
		cis_ext?: number|null;
		/**nákladové položky*/
		naklad_p1?: string|null;
		/**nákladové položky*/
		naklad_p2?: string|null;
		/**nákladové položky*/
		naklad_p3?: string|null;
		/**aktivita záznamu (VAS.GINCAKT)*/
		aktivita?: number|null;
	}
	const enum GMajpolozkaDtoNames { ixp = "ixp", lic = "lic", ser_cislo = "ser_cislo", ser_pcislo = "ser_pcislo", por_poh = "por_poh", kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", id_poh = "id_poh", id_poh_anti = "id_poh_anti", ixs_maj = "ixs_maj", inv_cis = "inv_cis", vyr_cis = "vyr_cis", skupina_id = "skupina_id", ac = "ac", nazev = "nazev", typ_poh = "typ_poh", druh_poh = "druh_poh", dat_poh = "dat_poh", dat_uct = "dat_uct", ico = "ico", ucs = "ucs", nks = "nks", tka = "tka", mp_stav = "mp_stav", st_stav = "st_stav", status_com = "status_com", mj = "mj", m = "m", c = "c", cmj = "cmj", mat_cis = "mat_cis", skp = "skp", drh_id = "drh_id", ueab_por = "ueab_por", ueab_evi = "ueab_evi", ueab_opr = "ueab_opr", skupina_odp = "skupina_odp", trida = "trida", ser_hst_maj = "ser_hst_maj", ser_hst_odp = "ser_hst_odp", typ_soubor = "typ_soubor", c_dph = "c_dph", c_c_dph = "c_c_dph", c_dph_odpocet = "c_dph_odpocet", c_pri = "c_pri", c_dotace = "c_dotace", ixs_maj_nad = "ixs_maj_nad", inv_cis_soubor = "inv_cis_soubor", ixp_dod = "ixp_dod", priz_odp = "priz_odp", cis_dod = "cis_dod", ixp_xpl = "ixp_xpl", cis_xpl = "cis_xpl", tev_cil = "tev_cil", popis = "popis", oper_cislo = "oper_cislo", ixp_bnd = "ixp_bnd", lic_bnd = "lic_bnd", ser_cislo_bnd = "ser_cislo_bnd", mena = "mena", kurz = "kurz", m_kurz = "m_kurz", c_mena = "c_mena", mena_zkr = "mena_zkr", priz_tzh = "priz_tzh", real_tzh = "real_tzh", ser_cislo_tzh = "ser_cislo_tzh", ktg_poh = "ktg_poh", skupina_id_cil = "skupina_id_cil", id_ext = "id_ext", pol_ext = "pol_ext", id_ext_poz = "id_ext_poz", cis_ext = "cis_ext", naklad_p1 = "naklad_p1", naklad_p2 = "naklad_p2", naklad_p3 = "naklad_p3", aktivita = "aktivita",}
	const enum GMajpolozkaDtoFragments { ixp = "*", lic = "*", ser_cislo = "*", ser_pcislo = "*", por_poh = "*", kod_poh = "*", typ_dok = "*", dev = "*", id_poh = "*", id_poh_anti = "*", ixs_maj = "*", inv_cis = "*", vyr_cis = "*", skupina_id = "*", ac = "*", nazev = "*", typ_poh = "*", druh_poh = "*", dat_poh = "*", dat_uct = "*", ico = "*", ucs = "*", nks = "*", tka = "*", mp_stav = "*", st_stav = "*", status_com = "*", mj = "*", m = "*", c = "*", cmj = "*", mat_cis = "*", skp = "*", drh_id = "*", ueab_por = "*", ueab_evi = "*", ueab_opr = "*", skupina_odp = "*", trida = "*", ser_hst_maj = "*", ser_hst_odp = "*", typ_soubor = "*", c_dph = "*", c_c_dph = "*", c_dph_odpocet = "*", c_pri = "*", c_dotace = "*", ixs_maj_nad = "*", inv_cis_soubor = "*", ixp_dod = "*", priz_odp = "*", cis_dod = "*", ixp_xpl = "*", cis_xpl = "*", tev_cil = "*", popis = "*", oper_cislo = "*", ixp_bnd = "*", lic_bnd = "*", ser_cislo_bnd = "*", mena = "*", kurz = "*", m_kurz = "*", c_mena = "*", mena_zkr = "*", priz_tzh = "*", real_tzh = "*", ser_cislo_tzh = "*", ktg_poh = "*", skupina_id_cil = "*", id_ext = "*", pol_ext = "*", id_ext_poz = "*", cis_ext = "*", naklad_p1 = "*", naklad_p2 = "*", naklad_p3 = "*", aktivita = "*",}
	const enum GMajpolozkaDtoTypes { ixp = "string", lic = "string", ser_cislo = "number", ser_pcislo = "number", por_poh = "number", kod_poh = "number", typ_dok = "number", dev = "number", id_poh = "string", id_poh_anti = "string", ixs_maj = "string", inv_cis = "string", vyr_cis = "string", skupina_id = "number", ac = "string", nazev = "string", typ_poh = "number", druh_poh = "number", dat_poh = "JsonDate", dat_uct = "string", ico = "string", ucs = "string", nks = "string", tka = "number", mp_stav = "number", st_stav = "number", status_com = "number", mj = "string", m = "JsonDecimal", c = "JsonDecimal", cmj = "JsonDecimal", mat_cis = "string", skp = "string", drh_id = "number", ueab_por = "string", ueab_evi = "string", ueab_opr = "string", skupina_odp = "string", trida = "string", ser_hst_maj = "number", ser_hst_odp = "number", typ_soubor = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", c_dph_odpocet = "JsonDecimal", c_pri = "JsonDecimal", c_dotace = "JsonDecimal", ixs_maj_nad = "string", inv_cis_soubor = "string", ixp_dod = "string", priz_odp = "number", cis_dod = "number", ixp_xpl = "string", cis_xpl = "number", tev_cil = "number", popis = "string", oper_cislo = "number", ixp_bnd = "string", lic_bnd = "string", ser_cislo_bnd = "number", mena = "number", kurz = "JsonDecimal", m_kurz = "JsonDecimal", c_mena = "JsonDecimal", mena_zkr = "string", priz_tzh = "number", real_tzh = "number", ser_cislo_tzh = "number", ktg_poh = "number", skupina_id_cil = "number", id_ext = "string", pol_ext = "number", id_ext_poz = "number", cis_ext = "number", naklad_p1 = "string", naklad_p2 = "string", naklad_p3 = "string", aktivita = "number",}
	const enum GMajpolozkaDtoTypeLengths { ixp = 12, lic = 4, id_poh = 17, id_poh_anti = 17, ixs_maj = 12, ixp_dod = 12, ixp_xpl = 12, ixp_bnd = 12, lic_bnd = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajscimDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majscim*/
	interface GMajscimDto {
		/**DBCOLUMN:majscim.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:majscim.skp*/
		skp?: string|null;
		/**DBCOLUMN:majscim.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majscim.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majscim.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majscim.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:majscim.pmj_min*/
		pmj_min?: JsonDecimal|null;
		/**DBCOLUMN:majscim.pmj_max*/
		pmj_max?: JsonDecimal|null;
		/**DBCOLUMN:majscim.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:majscim.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majscim.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majscim.typ_rp*/
		typ_rp?: number|null;
		/**DBCOLUMN:majscim.mj*/
		mj?: string|null;
		/**DBCOLUMN:majscim.mena*/
		mena?: number|null;
		/**DBCOLUMN:majscim.cmj_mena_nak*/
		cmj_mena_nak?: JsonDecimal|null;
		/**DBCOLUMN:majscim.cmj_pro*/
		cmj_pro?: JsonDecimal|null;
		/**DBCOLUMN:majscim.rez_dph_in*/
		rez_dph_in?: number|null;
		/**DBCOLUMN:majscim.rokmes_od_in*/
		rokmes_od_in?: string|null;
		/**DBCOLUMN:majscim.rez_dph_out*/
		rez_dph_out?: number|null;
		/**DBCOLUMN:majscim.rokmes_od_out*/
		rokmes_od_out?: string|null;
		/**dan_typ_txt - subselect pro dan_typ*/
		dan_typ_txt?: string|null;
		/**typ_rp_zkr - subselect pro typ_rp*/
		typ_rp_zkr?: string|null;
		/**mena_zkr - subselect pro mena*/
		mena_zkr?: string|null;
		/**rez_dph_in_txt - subselect pro rez_dph_in*/
		rez_dph_in_txt?: string|null;
		/**rez_dph_out_txt - subselect pro rez_dph_out*/
		rez_dph_out_txt?: string|null;
	}
	const enum GMajscimDtoNames { mat_cis = "mat_cis", skp = "skp", nazev = "nazev", aktivita = "aktivita", distribuce = "distribuce", cs_nazev = "cs_nazev", pmj_min = "pmj_min", pmj_max = "pmj_max", dan_typ = "dan_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_rp = "typ_rp", mj = "mj", mena = "mena", cmj_mena_nak = "cmj_mena_nak", cmj_pro = "cmj_pro", rez_dph_in = "rez_dph_in", rokmes_od_in = "rokmes_od_in", rez_dph_out = "rez_dph_out", rokmes_od_out = "rokmes_od_out", dan_typ_txt = "dan_typ_txt", typ_rp_zkr = "typ_rp_zkr", mena_zkr = "mena_zkr", rez_dph_in_txt = "rez_dph_in_txt", rez_dph_out_txt = "rez_dph_out_txt",}
	const enum GMajscimDtoFragments { mat_cis = "*", skp = "*", nazev = "*", aktivita = "*", distribuce = "*", cs_nazev = "*", pmj_min = "*", pmj_max = "*", dan_typ = "*", dat_zmena = "*", zmenu_prov = "*", typ_rp = "*", mj = "*", mena = "*", cmj_mena_nak = "*", cmj_pro = "*", rez_dph_in = "*", rokmes_od_in = "*", rez_dph_out = "*", rokmes_od_out = "*", dan_typ_txt = "*", typ_rp_zkr = "*", mena_zkr = "*", rez_dph_in_txt = "*", rez_dph_out_txt = "*",}
	const enum GMajscimDtoTypes { mat_cis = "string", skp = "string", nazev = "string", aktivita = "number", distribuce = "number", cs_nazev = "string", pmj_min = "JsonDecimal", pmj_max = "JsonDecimal", dan_typ = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_rp = "number", mj = "string", mena = "number", cmj_mena_nak = "JsonDecimal", cmj_pro = "JsonDecimal", rez_dph_in = "number", rokmes_od_in = "string", rez_dph_out = "number", rokmes_od_out = "string", dan_typ_txt = "string", typ_rp_zkr = "string", mena_zkr = "string", rez_dph_in_txt = "string", rez_dph_out_txt = "string",}
	const enum GMajscimDtoTypeLengths { mat_cis = 20, skp = 15, nazev = 254, cs_nazev = 254, zmenu_prov = 12, mj = 5, rokmes_od_in = 6, rokmes_od_out = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsdenDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Filtry přehledu knih maj. dokladů*/
	const enum FilterMajsden {
		/**Autogenerated.*/
		ixp_den,
		typ_ag,
		/**Autogenerated.*/
		lic,
		/**Autogenerated.*/
		aktivita,
		/**Autogenerated.*/
		arw,
		/**Autogenerated.*/
		poznamka,
		/**Autogenerated.*/
		dat_od,
		/**Autogenerated.*/
		dat_do,
		/**Autogenerated.*/
		ico,
		/**Autogenerated.*/
		ucs,
		/**Autogenerated.*/
		nks,
		/**Autogenerated.*/
		nazev,
		/**Autogenerated.*/
		rok,
		/**Autogenerated.*/
		typ_den,
		/**Autogenerated.*/
		ktg_den,
		/**Autogenerated.*/
		dat_zmena,
		/**Autogenerated.*/
		zmenu_prov,
		/**Autogenerated.*/
		por_cislo_max,
		/**Autogenerated.*/
		subrada_max,
		/**Autogenerated.*/
		ixs_vpk,
		/**Autogenerated.*/
		subrada_duz,
		/**Autogenerated.*/
		len_ac,
		/**Autogenerated.*/
		krok_uza,
		/**Autogenerated.*/
		ixp_den_old,
		/**Autogenerated.*/
		uus,
		/**Autogenerated.*/
		prefix,
		/**Autogenerated.*/
		suffix,
		/**Autogenerated.*/
		uex,
		/**subřada deníku .*/
		subrada,
	}
	/**DBTABLE:majsden*/
	interface GMajsdenDto extends Gordic.Eko.Interface.GEkosdenDto {
		/**DBCOLUMN:majsden.lic*/
		lic?: string|null;
		/**DBCOLUMN:majsden.arw*/
		arw?: number|null;
		/**DBCOLUMN:majsden.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:majsden.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:majsden.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:majsden.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsden.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majsden.nks*/
		nks?: string|null;
		/**DBCOLUMN:majsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsden.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsden.por_cislo_max*/
		por_cislo_max?: number|null;
		/**DBCOLUMN:majsden.subrada_max*/
		subrada_max?: number|null;
		/**DBCOLUMN:majsden.subrada_duz*/
		subrada_duz?: number|null;
		/**DBCOLUMN:majsden.len_ac*/
		len_ac?: number|null;
		/**DBCOLUMN:majsden.krok_uza*/
		krok_uza?: number|null;
		/**DBCOLUMN:majsden.ixp_den_old*/
		ixp_den_old?: string|null;
		/**DBCOLUMN:majsden.uus*/
		uus?: string|null;
		/**DBCOLUMN:majsden.uex*/
		uex?: string|null;
	}
	const enum GMajsdenDtoNames { lic = "lic", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nks = "nks", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", uex = "uex", ixp_den = "ixp_den", aktivita = "aktivita", nazev = "nazev", rok = "rok", prefix = "prefix", suffix = "suffix", ktg_den = "ktg_den", typ_den = "typ_den", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", akt_subrady_txt = "akt_subrady_txt", typ_ag = "typ_ag", ixs_vpk = "ixs_vpk",}
	const enum GMajsdenDtoFragments { lic = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nks = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", subrada_duz = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", uex = "*", ixp_den = "*", aktivita = "*", nazev = "*", rok = "*", prefix = "*", suffix = "*", ktg_den = "*", typ_den = "*", zkratka = "*", subrada = "*", akt_subrady = "*", ktg_den_txt = "*", akt_subrady_txt = "*", typ_ag = "*", ixs_vpk = "*",}
	const enum GMajsdenDtoTypes { lic = "string", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nks = "string", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", uex = "string", ixp_den = "string", aktivita = "number", nazev = "string", rok = "number", prefix = "string", suffix = "string", ktg_den = "number", typ_den = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", akt_subrady_txt = "string", typ_ag = "number", ixs_vpk = "string",}
	const enum GMajsdenDtoTypeLengths { lic = 4, poznamka = 50, ico = 10, ucs = 10, nks = 12, zmenu_prov = 12, ixp_den_old = 12, uus = 10, uex = 16, ixp_den = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsdprDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsdpr*/
	interface GMajsdprDto {
		/**DBCOLUMN:majsdpr.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsdpr.prirazka*/
		prirazka?: string|null;
		/**DBCOLUMN:majsdpr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majsdpr.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:majsdpr.ktg_pri*/
		ktg_pri?: number|null;
		/**DBCOLUMN:majsdpr.typ_vyp_pri*/
		typ_vyp_pri?: number|null;
		/**DBCOLUMN:majsdpr.dph_pri*/
		dph_pri?: number|null;
		/**DBCOLUMN:majsdpr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsdpr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsdpr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsdpr.dan_typ*/
		dan_typ?: number|null;
		/**ktg_pri_zkr*/
		ktg_pri_zkr?: string|null;
		/**typ_vyp_pri_zkr*/
		typ_vyp_pri_zkr?: string|null;
		/**dph_pri_zkr*/
		dph_pri_zkr?: string|null;
		/**dan_typ_txt*/
		dan_typ_txt?: string|null;
	}
	const enum GMajsdprDtoNames { ico = "ico", prirazka = "prirazka", nazev = "nazev", c = "c", ktg_pri = "ktg_pri", typ_vyp_pri = "typ_vyp_pri", dph_pri = "dph_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dan_typ = "dan_typ", ktg_pri_zkr = "ktg_pri_zkr", typ_vyp_pri_zkr = "typ_vyp_pri_zkr", dph_pri_zkr = "dph_pri_zkr", dan_typ_txt = "dan_typ_txt",}
	const enum GMajsdprDtoFragments { ico = "*", prirazka = "*", nazev = "*", c = "*", ktg_pri = "*", typ_vyp_pri = "*", dph_pri = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dan_typ = "*", ktg_pri_zkr = "*", typ_vyp_pri_zkr = "*", dph_pri_zkr = "*", dan_typ_txt = "*",}
	const enum GMajsdprDtoTypes { ico = "string", prirazka = "string", nazev = "string", c = "JsonDecimal", ktg_pri = "number", typ_vyp_pri = "number", dph_pri = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dan_typ = "number", ktg_pri_zkr = "string", typ_vyp_pri_zkr = "string", dph_pri_zkr = "string", dan_typ_txt = "string",}
	const enum GMajsdprDtoTypeLengths { ico = 10, prirazka = 10, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsdrmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsdrm*/
	interface GMajsdrmDto {
		/**DBCOLUMN:majsdrm.ixs_drm*/
		ixs_drm?: string|null;
		/**DBCOLUMN:majsdrm.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:majsdrm.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majsdrm.drh_txt*/
		drh_txt?: string|null;
		/**DBCOLUMN:majsdrm.drh_zkr*/
		drh_zkr?: string|null;
		/**DBCOLUMN:majsdrm.mode_odp*/
		mode_odp?: number|null;
		/**DBCOLUMN:majsdrm.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majsdrm.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:majsdrm.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:majsdrm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsdrm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsdrm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsdrm.typ_rp*/
		typ_rp?: number|null;
		/**DBCOLUMN:majsdrm.in_soubor*/
		in_soubor?: number|null;
		/**DBCOLUMN:majsdrm.s_prodej*/
		s_prodej?: number|null;
		/**DBCOLUMN:majsskm.skupina_zkr*/
		skupina_zkr?: string|null;
		/**mode_odp_txt - majcrod*/
		mode_odp_txt?: string|null;
		/**s_prodej_txt - majcppr*/
		s_prodej_txt?: string|null;
		/**typ rozšířeného profilu*/
		typ_rp_zkr?: string|null;
		/**aktivita txt*/
		aktivita_txt?: string|null;
	}
	const enum GMajsdrmDtoNames { ixs_drm = "ixs_drm", drh_id = "drh_id", skupina_id = "skupina_id", drh_txt = "drh_txt", drh_zkr = "drh_zkr", mode_odp = "mode_odp", distribuce = "distribuce", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_rp = "typ_rp", in_soubor = "in_soubor", s_prodej = "s_prodej", skupina_zkr = "skupina_zkr", mode_odp_txt = "mode_odp_txt", s_prodej_txt = "s_prodej_txt", typ_rp_zkr = "typ_rp_zkr", aktivita_txt = "aktivita_txt",}
	const enum GMajsdrmDtoFragments { ixs_drm = "*", drh_id = "*", skupina_id = "*", drh_txt = "*", drh_zkr = "*", mode_odp = "*", distribuce = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_rp = "*", in_soubor = "*", s_prodej = "*", skupina_zkr = "*", mode_odp_txt = "*", s_prodej_txt = "*", typ_rp_zkr = "*", aktivita_txt = "*",}
	const enum GMajsdrmDtoTypes { ixs_drm = "string", drh_id = "number", skupina_id = "number", drh_txt = "string", drh_zkr = "string", mode_odp = "number", distribuce = "number", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_rp = "number", in_soubor = "number", s_prodej = "number", skupina_zkr = "string", mode_odp_txt = "string", s_prodej_txt = "string", typ_rp_zkr = "string", aktivita_txt = "string",}
	const enum GMajsdrmDtoTypeLengths { ixs_drm = 12, drh_txt = 50, drh_zkr = 16, k_s = 15, zmenu_prov = 12, skupina_zkr = 16,}
	/**ENUM:majsdrm*/
	const enum GMajsdrmEnum {
		/**0000AJI0A00T*/
		_0000AJI0A00T,
		/**0000AJI0A01O*/
		_0000AJI0A01O,
		/**0000AJI0A02J*/
		_0000AJI0A02J,
		/**0000AJI0A03E*/
		_0000AJI0A03E,
		/**0000AJI0A049*/
		_0000AJI0A049,
		/**0000AJI0A054*/
		_0000AJI0A054,
		/**0000AJI0A06Z*/
		_0000AJI0A06Z,
		/**0000AJI0A08P*/
		_0000AJI0A08P,
		/**0000AJI0A09K*/
		_0000AJI0A09K,
		/**0000AJI0A0AF*/
		_0000AJI0A0AF,
		/**0000AJI0A0BA*/
		_0000AJI0A0BA,
		/**0000AJI0A0C5*/
		_0000AJI0A0C5,
		/**0000AJI0A0D0*/
		_0000AJI0A0D0,
		/**0000AJI0A0EV*/
		_0000AJI0A0EV,
		/**0000AJI0A0FQ*/
		_0000AJI0A0FQ,
		/**0000AJI0A0GL*/
		_0000AJI0A0GL,
		/**0000AJI0A0HG*/
		_0000AJI0A0HG,
		/**0000AJI0A0IB*/
		_0000AJI0A0IB,
		/**0000AJI0A0J6*/
		_0000AJI0A0J6,
		/**0000AJI0A0K1*/
		_0000AJI0A0K1,
		/**0000AJI0A0LW*/
		_0,
		/**0000AJI0A0MR*/
		_0000AJI0A0MR,
		/**0000AJI0A0NM*/
		_0000AJI0A0NM,
		/**0000AJI0A0OH*/
		_0000AJI0A0OH,
		/**0000AJI0A0PC*/
		_0000AJI0A0PC,
		/**0000AJI0A0Q7*/
		_0000AJI0A0Q7,
	}
	function GMajsdrmEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMajsdrmEnum, Gordic.Maj.Interface.GMajsdrmDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsel1Dto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsel1*/
	interface GMajsel1Dto {
		/**DBCOLUMN:majsel1.ext_1*/
		ext_1?: number|null;
		/**DBCOLUMN:majsel1.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsel1.ext_1_zkr*/
		ext_1_zkr?: string|null;
		/**DBCOLUMN:majsel1.ext_1_txt*/
		ext_1_txt?: string|null;
		/**DBCOLUMN:majsel1.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsel1.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsel1.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsel1DtoNames { ext_1 = "ext_1", ico = "ico", ext_1_zkr = "ext_1_zkr", ext_1_txt = "ext_1_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsel1DtoFragments { ext_1 = "*", ico = "*", ext_1_zkr = "*", ext_1_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsel1DtoTypes { ext_1 = "number", ico = "string", ext_1_zkr = "string", ext_1_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsel1DtoTypeLengths { ico = 10, ext_1_zkr = 16, ext_1_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsel2Dto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsel2*/
	interface GMajsel2Dto {
		/**DBCOLUMN:majsel2.ext_2*/
		ext_2?: number|null;
		/**DBCOLUMN:majsel2.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsel2.ext_2_zkr*/
		ext_2_zkr?: string|null;
		/**DBCOLUMN:majsel2.ext_2_txt*/
		ext_2_txt?: string|null;
		/**DBCOLUMN:majsel2.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsel2.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsel2.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsel2DtoNames { ext_2 = "ext_2", ico = "ico", ext_2_zkr = "ext_2_zkr", ext_2_txt = "ext_2_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsel2DtoFragments { ext_2 = "*", ico = "*", ext_2_zkr = "*", ext_2_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsel2DtoTypes { ext_2 = "number", ico = "string", ext_2_zkr = "string", ext_2_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsel2DtoTypeLengths { ico = 10, ext_2_zkr = 16, ext_2_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsel3Dto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsel3*/
	interface GMajsel3Dto {
		/**DBCOLUMN:majsel3.ext_3*/
		ext_3?: number|null;
		/**DBCOLUMN:majsel3.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsel3.ext_3_zkr*/
		ext_3_zkr?: string|null;
		/**DBCOLUMN:majsel3.ext_3_txt*/
		ext_3_txt?: string|null;
		/**DBCOLUMN:majsel3.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsel3.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsel3.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsel3DtoNames { ext_3 = "ext_3", ico = "ico", ext_3_zkr = "ext_3_zkr", ext_3_txt = "ext_3_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsel3DtoFragments { ext_3 = "*", ico = "*", ext_3_zkr = "*", ext_3_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsel3DtoTypes { ext_3 = "number", ico = "string", ext_3_zkr = "string", ext_3_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsel3DtoTypeLengths { ico = 10, ext_3_zkr = 16, ext_3_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajSeznamDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Společný předek seznamového DTO*/
	interface GMajSeznamDto {
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
		/**Primární klíč tabulky v položkách filtrů (sloupce oddělené čárkami)*/
		readonly PrimaryKeyInFilters?: string|null;
	}
	const enum GMajSeznamDtoNames { PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajSeznamDtoFragments { PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GMajSeznamDtoTypes { PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GMajSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajSeznamWflDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Společný předek seznamového DTO rozšířený o sloupce WFL*/
	interface GMajSeznamWflDto extends Gordic.Maj.Interface.GMajSeznamDto {
		/**PID*/
		ixp?: string|null;
		/**přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy)*/
		preevidence?: number|null;
		/**vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel)*/
		vlastnictvi?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**el. přílohy - počet příloh*/
		el_prilohy_pocet?: number|null;
	}
	const enum GMajSeznamWflDtoNames { ixp = "ixp", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajSeznamWflDtoFragments { ixp = "Base", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GMajSeznamWflDtoTypes { ixp = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GMajSeznamWflDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsiabDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsiab*/
	interface GMajsiabDto extends Gordic.Maj.Interface.GMajSeznamDto {
		/**DBCOLUMN:majsiab.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:majsiab.id_ext_poz*/
		id_ext_poz?: number|null;
		/**DBCOLUMN:majsiab.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:majsiab.zadost_stav*/
		zadost_stav?: number|null;
		/**DBCOLUMN:majsiab.typ_zdroj*/
		typ_zdroj?: string|null;
		/**DBCOLUMN:majsiab.dat_import*/
		dat_import?: JsonDate|null;
		/**DBCOLUMN:majsiab.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:majsiab.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsiab.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majsiab.nks*/
		nks?: string|null;
		/**DBCOLUMN:majsiab.nks_ext*/
		nks_ext?: string|null;
		/**DBCOLUMN:majsiab.ac_ext*/
		ac_ext?: string|null;
		/**DBCOLUMN:majsiab.dat_ext*/
		dat_ext?: JsonDate|null;
		/**DBCOLUMN:majsiab.ixs_esu_ext*/
		ixs_esu_ext?: string|null;
		/**DBCOLUMN:majsiab.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:majsiab.popis*/
		popis?: string|null;
		/**DBCOLUMN:majsiab.c_c*/
		c_c?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.c_1*/
		c_1?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.pocet_pol*/
		pocet_pol?: number|null;
		/**DBCOLUMN:majsiab.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:majsiab.typ_dok*/
		typ_dok?: number|null;
		/**DBCOLUMN:majsiab.dev*/
		dev?: number|null;
		/**DBCOLUMN:majsiab.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:majsiab.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:majsiab.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:majsiab.ps_fak*/
		ps_fak?: string|null;
		/**DBCOLUMN:majsiab.c_dph_s*/
		c_dph_s?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.c_dph_n*/
		c_dph_n?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.dat_termin*/
		dat_termin?: JsonDate|null;
		/**DBCOLUMN:majsiab.id_maj_nad*/
		id_maj_nad?: string|null;
		/**DBCOLUMN:majsiab.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:majsiab.c_pri*/
		c_pri?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:majsiab.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsiab.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsiab.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:majsiab.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:majsiab.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:majsiab.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:majsiab.trida*/
		trida?: string|null;
		/**DBCOLUMN:majsiab.ext_1*/
		ext_1?: number|null;
		/**DBCOLUMN:majsiab.ext_2*/
		ext_2?: number|null;
		/**DBCOLUMN:majsiab.ext_3*/
		ext_3?: number|null;
		/**DBCOLUMN:majsiab.naklad_1*/
		naklad_1?: string|null;
		/**DBCOLUMN:majsiab.naklad_2*/
		naklad_2?: string|null;
		/**DBCOLUMN:majsiab.naklad_3*/
		naklad_3?: string|null;
		/**DBCOLUMN:majsiab.ixs_maj_nad*/
		ixs_maj_nad?: string|null;
		/**DBCOLUMN:majsiab.c_dph_3*/
		c_dph_3?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.c_dph_4*/
		c_dph_4?: JsonDecimal|null;
		/**DBCOLUMN:majsiab.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:majsiab.inv_cis_soubor*/
		inv_cis_soubor?: string|null;
		/**DBCOLUMN:majsiab.ico_ext*/
		ico_ext?: string|null;
		/**DBCOLUMN:majsiab.ucs_ext*/
		ucs_ext?: string|null;
		/**DBCOLUMN:majsiab.id_poh*/
		id_poh?: string|null;
		/**Zkratka typu dokladu*/
		typ_dok_zkr?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Maj.Interface.GZadostMajPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GMajsiabDtoNames { id_ext = "id_ext", id_ext_poz = "id_ext_poz", ixp = "ixp", zadost_stav = "zadost_stav", typ_zdroj = "typ_zdroj", dat_import = "dat_import", ixp_den = "ixp_den", ico = "ico", ucs = "ucs", nks = "nks", nks_ext = "nks_ext", ac_ext = "ac_ext", dat_ext = "dat_ext", ixs_esu_ext = "ixs_esu_ext", ico_esu = "ico_esu", popis = "popis", c_c = "c_c", c_1 = "c_1", pocet_pol = "pocet_pol", kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_uup = "dat_uup", ps_fak = "ps_fak", c_dph_s = "c_dph_s", c_dph_n = "c_dph_n", c_c_dph = "c_c_dph", dat_termin = "dat_termin", id_maj_nad = "id_maj_nad", ac_ag = "ac_ag", c_pri = "c_pri", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_orj = "ixs_orj", ixs_ref = "ixs_ref", stredisko = "stredisko", objekt = "objekt", trida = "trida", ext_1 = "ext_1", ext_2 = "ext_2", ext_3 = "ext_3", naklad_1 = "naklad_1", naklad_2 = "naklad_2", naklad_3 = "naklad_3", ixs_maj_nad = "ixs_maj_nad", c_dph_3 = "c_dph_3", c_dph_4 = "c_dph_4", dat_zdan = "dat_zdan", inv_cis_soubor = "inv_cis_soubor", ico_ext = "ico_ext", ucs_ext = "ucs_ext", id_poh = "id_poh", typ_dok_zkr = "typ_dok_zkr", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajsiabDtoFragments { id_ext = "*", id_ext_poz = "*", ixp = "*", zadost_stav = "*", typ_zdroj = "*", dat_import = "*", ixp_den = "*", ico = "*", ucs = "*", nks = "*", nks_ext = "*", ac_ext = "*", dat_ext = "*", ixs_esu_ext = "*", ico_esu = "*", popis = "*", c_c = "*", c_1 = "*", pocet_pol = "*", kod_poh = "*", typ_dok = "*", dev = "*", ktg_typ = "*", ixs_typ = "*", dat_uup = "*", ps_fak = "*", c_dph_s = "*", c_dph_n = "*", c_c_dph = "*", dat_termin = "*", id_maj_nad = "*", ac_ag = "*", c_pri = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_orj = "*", ixs_ref = "*", stredisko = "*", objekt = "*", trida = "*", ext_1 = "*", ext_2 = "*", ext_3 = "*", naklad_1 = "*", naklad_2 = "*", naklad_3 = "*", ixs_maj_nad = "*", c_dph_3 = "*", c_dph_4 = "*", dat_zdan = "*", inv_cis_soubor = "*", ico_ext = "*", ucs_ext = "*", id_poh = "*", typ_dok_zkr = "*", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GMajsiabDtoTypes { id_ext = "string", id_ext_poz = "number", ixp = "string", zadost_stav = "number", typ_zdroj = "string", dat_import = "JsonDate", ixp_den = "string", ico = "string", ucs = "string", nks = "string", nks_ext = "string", ac_ext = "string", dat_ext = "JsonDate", ixs_esu_ext = "string", ico_esu = "string", popis = "string", c_c = "JsonDecimal", c_1 = "JsonDecimal", pocet_pol = "number", kod_poh = "number", typ_dok = "number", dev = "number", ktg_typ = "number", ixs_typ = "string", dat_uup = "JsonDate", ps_fak = "string", c_dph_s = "JsonDecimal", c_dph_n = "JsonDecimal", c_c_dph = "JsonDecimal", dat_termin = "JsonDate", id_maj_nad = "string", ac_ag = "string", c_pri = "JsonDecimal", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_orj = "string", ixs_ref = "string", stredisko = "string", objekt = "string", trida = "string", ext_1 = "number", ext_2 = "number", ext_3 = "number", naklad_1 = "string", naklad_2 = "string", naklad_3 = "string", ixs_maj_nad = "string", c_dph_3 = "JsonDecimal", c_dph_4 = "JsonDecimal", dat_zdan = "JsonDate", inv_cis_soubor = "string", ico_ext = "string", ucs_ext = "string", id_poh = "string", typ_dok_zkr = "string", Permissions = "Gordic.Maj.Interface.GZadostMajPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GMajsiabDtoTypeLengths { id_ext = 50, ixp = 12, typ_zdroj = 10, ixp_den = 12, ico = 10, ucs = 10, nks = 12, nks_ext = 12, ac_ext = 20, ixs_esu_ext = 12, ico_esu = 10, popis = 254, ixs_typ = 12, ps_fak = 20, id_maj_nad = 50, ac_ag = 20, poznamka = 254, zmenu_prov = 12, ixs_orj = 12, ixs_ref = 12, stredisko = 12, objekt = 8, trida = 4, naklad_1 = 16, naklad_2 = 16, naklad_3 = 16, ixs_maj_nad = 12, inv_cis_soubor = 50, ico_ext = 10, ucs_ext = 10, id_poh = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsiaoDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsiao*/
	interface GMajsiaoDto {
		/**DBCOLUMN:majsiao.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:majsiao.pol_ext*/
		pol_ext?: number|null;
		/**DBCOLUMN:majsiao.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:majsiao.druh_odp*/
		druh_odp?: number|null;
		/**DBCOLUMN:majsiao.def_odp*/
		def_odp?: number|null;
		/**DBCOLUMN:majsiao.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:majsiao.c_vstup*/
		c_vstup?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_rok_odp*/
		c_rok_odp?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_last_odp*/
		c_last_odp?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_poriz*/
		c_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.rokobd_odp*/
		rokobd_odp?: number|null;
		/**DBCOLUMN:majsiao.mesobd_odp*/
		mesobd_odp?: number|null;
		/**DBCOLUMN:majsiao.rok_start_odp*/
		rok_start_odp?: number|null;
		/**DBCOLUMN:majsiao.rok_odpisov*/
		rok_odpisov?: number|null;
		/**DBCOLUMN:majsiao.rok_zvys_vc*/
		rok_zvys_vc?: number|null;
		/**DBCOLUMN:majsiao.rok_odpisov_zvc*/
		rok_odpisov_zvc?: number|null;
		/**DBCOLUMN:majsiao.c_sazba_odp*/
		c_sazba_odp?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.pocet_odp*/
		pocet_odp?: number|null;
		/**DBCOLUMN:majsiao.presnost_odp*/
		presnost_odp?: number|null;
		/**DBCOLUMN:majsiao.saz_koef*/
		saz_koef?: number|null;
		/**DBCOLUMN:majsiao.typ_odp*/
		typ_odp?: number|null;
		/**DBCOLUMN:majsiao.rok_start_typ*/
		rok_start_typ?: number|null;
		/**DBCOLUMN:majsiao.stop_rok_odp*/
		stop_rok_odp?: number|null;
		/**DBCOLUMN:majsiao.stop_rok_odp_zvc*/
		stop_rok_odp_zvc?: number|null;
		/**DBCOLUMN:majsiao.c_opr*/
		c_opr?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.pocet_odp_real*/
		pocet_odp_real?: number|null;
		/**DBCOLUMN:majsiao.c_vstup_dnm*/
		c_vstup_dnm?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_zbytek*/
		c_zbytek?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.skp*/
		skp?: string|null;
		/**DBCOLUMN:majsiao.polozka_odp*/
		polozka_odp?: number|null;
		/**DBCOLUMN:majsiao.rok_skp_od*/
		rok_skp_od?: number|null;
		/**DBCOLUMN:majsiao.doba_uziti*/
		doba_uziti?: number|null;
		/**DBCOLUMN:majsiao.doba_uziti_zbyv*/
		doba_uziti_zbyv?: number|null;
		/**DBCOLUMN:majsiao.doba_uziti_ind*/
		doba_uziti_ind?: number|null;
		/**DBCOLUMN:majsiao.mj*/
		mj?: string|null;
		/**DBCOLUMN:majsiao.c_odp_mj*/
		c_odp_mj?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.pc_poc_uzi_mj*/
		pc_poc_uzi_mj?: number|null;
		/**DBCOLUMN:majsiao.py_poc_uzi_mj*/
		py_poc_uzi_mj?: number|null;
		/**DBCOLUMN:majsiao.rc_poc_uzi_mj*/
		rc_poc_uzi_mj?: number|null;
		/**DBCOLUMN:majsiao.ro_poc_uzi_mj*/
		ro_poc_uzi_mj?: number|null;
		/**DBCOLUMN:majsiao.c_dotace_odp*/
		c_dotace_odp?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_dotace_opr*/
		c_dotace_opr?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_zbytek_proc*/
		c_zbytek_proc?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.oc_714_b*/
		oc_714_b?: number|null;
		/**DBCOLUMN:majsiao.oc_715_b*/
		oc_715_b?: number|null;
		/**DBCOLUMN:majsiao.skupina_odp_d*/
		skupina_odp_d?: string|null;
		/**DBCOLUMN:majsiao.c_vstup_d*/
		c_vstup_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_zust_d*/
		c_zust_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_rok_odp_d*/
		c_rok_odp_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_last_odp_d*/
		c_last_odp_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.rokobd_odp_d*/
		rokobd_odp_d?: number|null;
		/**DBCOLUMN:majsiao.mesobd_odp_d*/
		mesobd_odp_d?: number|null;
		/**DBCOLUMN:majsiao.rok_start_odp_d*/
		rok_start_odp_d?: number|null;
		/**DBCOLUMN:majsiao.rok_odpisov_d*/
		rok_odpisov_d?: number|null;
		/**DBCOLUMN:majsiao.rok_zvys_vc_d*/
		rok_zvys_vc_d?: number|null;
		/**DBCOLUMN:majsiao.rok_odpisov_zvc_d*/
		rok_odpisov_zvc_d?: number|null;
		/**DBCOLUMN:majsiao.pocet_odp_d*/
		pocet_odp_d?: number|null;
		/**DBCOLUMN:majsiao.presnost_odp_d*/
		presnost_odp_d?: number|null;
		/**DBCOLUMN:majsiao.saz_koef_d*/
		saz_koef_d?: number|null;
		/**DBCOLUMN:majsiao.typ_odp_d*/
		typ_odp_d?: number|null;
		/**DBCOLUMN:majsiao.rok_start_typ_d*/
		rok_start_typ_d?: number|null;
		/**DBCOLUMN:majsiao.stop_rok_odp_d*/
		stop_rok_odp_d?: number|null;
		/**DBCOLUMN:majsiao.stop_rok_odp_zvc_d*/
		stop_rok_odp_zvc_d?: number|null;
		/**DBCOLUMN:majsiao.c_opr_d*/
		c_opr_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.c_vstup_dnm_d*/
		c_vstup_dnm_d?: JsonDecimal|null;
		/**DBCOLUMN:majsiao.skp_d*/
		skp_d?: string|null;
		/**DBCOLUMN:majsiao.polozka_odp_d*/
		polozka_odp_d?: number|null;
		/**DBCOLUMN:majsiao.rok_skp_od_d*/
		rok_skp_od_d?: number|null;
	}
	const enum GMajsiaoDtoNames { id_ext = "id_ext", pol_ext = "pol_ext", inv_cis = "inv_cis", druh_odp = "druh_odp", def_odp = "def_odp", skupina_odp = "skupina_odp", c_vstup = "c_vstup", c_zust = "c_zust", c_rok_odp = "c_rok_odp", c_last_odp = "c_last_odp", c_poriz = "c_poriz", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", rok_start_odp = "rok_start_odp", rok_odpisov = "rok_odpisov", rok_zvys_vc = "rok_zvys_vc", rok_odpisov_zvc = "rok_odpisov_zvc", c_sazba_odp = "c_sazba_odp", pocet_odp = "pocet_odp", presnost_odp = "presnost_odp", saz_koef = "saz_koef", typ_odp = "typ_odp", rok_start_typ = "rok_start_typ", stop_rok_odp = "stop_rok_odp", stop_rok_odp_zvc = "stop_rok_odp_zvc", c_opr = "c_opr", pocet_odp_real = "pocet_odp_real", c_vstup_dnm = "c_vstup_dnm", c_zbytek = "c_zbytek", skp = "skp", polozka_odp = "polozka_odp", rok_skp_od = "rok_skp_od", doba_uziti = "doba_uziti", doba_uziti_zbyv = "doba_uziti_zbyv", doba_uziti_ind = "doba_uziti_ind", mj = "mj", c_odp_mj = "c_odp_mj", pc_poc_uzi_mj = "pc_poc_uzi_mj", py_poc_uzi_mj = "py_poc_uzi_mj", rc_poc_uzi_mj = "rc_poc_uzi_mj", ro_poc_uzi_mj = "ro_poc_uzi_mj", c_dotace_odp = "c_dotace_odp", c_dotace_opr = "c_dotace_opr", c_zbytek_proc = "c_zbytek_proc", oc_714_b = "oc_714_b", oc_715_b = "oc_715_b", skupina_odp_d = "skupina_odp_d", c_vstup_d = "c_vstup_d", c_zust_d = "c_zust_d", c_rok_odp_d = "c_rok_odp_d", c_last_odp_d = "c_last_odp_d", rokobd_odp_d = "rokobd_odp_d", mesobd_odp_d = "mesobd_odp_d", rok_start_odp_d = "rok_start_odp_d", rok_odpisov_d = "rok_odpisov_d", rok_zvys_vc_d = "rok_zvys_vc_d", rok_odpisov_zvc_d = "rok_odpisov_zvc_d", pocet_odp_d = "pocet_odp_d", presnost_odp_d = "presnost_odp_d", saz_koef_d = "saz_koef_d", typ_odp_d = "typ_odp_d", rok_start_typ_d = "rok_start_typ_d", stop_rok_odp_d = "stop_rok_odp_d", stop_rok_odp_zvc_d = "stop_rok_odp_zvc_d", c_opr_d = "c_opr_d", c_vstup_dnm_d = "c_vstup_dnm_d", skp_d = "skp_d", polozka_odp_d = "polozka_odp_d", rok_skp_od_d = "rok_skp_od_d",}
	const enum GMajsiaoDtoFragments { id_ext = "*", pol_ext = "*", inv_cis = "*", druh_odp = "*", def_odp = "*", skupina_odp = "*", c_vstup = "*", c_zust = "*", c_rok_odp = "*", c_last_odp = "*", c_poriz = "*", rokobd_odp = "*", mesobd_odp = "*", rok_start_odp = "*", rok_odpisov = "*", rok_zvys_vc = "*", rok_odpisov_zvc = "*", c_sazba_odp = "*", pocet_odp = "*", presnost_odp = "*", saz_koef = "*", typ_odp = "*", rok_start_typ = "*", stop_rok_odp = "*", stop_rok_odp_zvc = "*", c_opr = "*", pocet_odp_real = "*", c_vstup_dnm = "*", c_zbytek = "*", skp = "*", polozka_odp = "*", rok_skp_od = "*", doba_uziti = "*", doba_uziti_zbyv = "*", doba_uziti_ind = "*", mj = "*", c_odp_mj = "*", pc_poc_uzi_mj = "*", py_poc_uzi_mj = "*", rc_poc_uzi_mj = "*", ro_poc_uzi_mj = "*", c_dotace_odp = "*", c_dotace_opr = "*", c_zbytek_proc = "*", oc_714_b = "*", oc_715_b = "*", skupina_odp_d = "*", c_vstup_d = "*", c_zust_d = "*", c_rok_odp_d = "*", c_last_odp_d = "*", rokobd_odp_d = "*", mesobd_odp_d = "*", rok_start_odp_d = "*", rok_odpisov_d = "*", rok_zvys_vc_d = "*", rok_odpisov_zvc_d = "*", pocet_odp_d = "*", presnost_odp_d = "*", saz_koef_d = "*", typ_odp_d = "*", rok_start_typ_d = "*", stop_rok_odp_d = "*", stop_rok_odp_zvc_d = "*", c_opr_d = "*", c_vstup_dnm_d = "*", skp_d = "*", polozka_odp_d = "*", rok_skp_od_d = "*",}
	const enum GMajsiaoDtoTypes { id_ext = "string", pol_ext = "number", inv_cis = "string", druh_odp = "number", def_odp = "number", skupina_odp = "string", c_vstup = "JsonDecimal", c_zust = "JsonDecimal", c_rok_odp = "JsonDecimal", c_last_odp = "JsonDecimal", c_poriz = "JsonDecimal", rokobd_odp = "number", mesobd_odp = "number", rok_start_odp = "number", rok_odpisov = "number", rok_zvys_vc = "number", rok_odpisov_zvc = "number", c_sazba_odp = "JsonDecimal", pocet_odp = "number", presnost_odp = "number", saz_koef = "number", typ_odp = "number", rok_start_typ = "number", stop_rok_odp = "number", stop_rok_odp_zvc = "number", c_opr = "JsonDecimal", pocet_odp_real = "number", c_vstup_dnm = "JsonDecimal", c_zbytek = "JsonDecimal", skp = "string", polozka_odp = "number", rok_skp_od = "number", doba_uziti = "number", doba_uziti_zbyv = "number", doba_uziti_ind = "number", mj = "string", c_odp_mj = "JsonDecimal", pc_poc_uzi_mj = "number", py_poc_uzi_mj = "number", rc_poc_uzi_mj = "number", ro_poc_uzi_mj = "number", c_dotace_odp = "JsonDecimal", c_dotace_opr = "JsonDecimal", c_zbytek_proc = "JsonDecimal", oc_714_b = "number", oc_715_b = "number", skupina_odp_d = "string", c_vstup_d = "JsonDecimal", c_zust_d = "JsonDecimal", c_rok_odp_d = "JsonDecimal", c_last_odp_d = "JsonDecimal", rokobd_odp_d = "number", mesobd_odp_d = "number", rok_start_odp_d = "number", rok_odpisov_d = "number", rok_zvys_vc_d = "number", rok_odpisov_zvc_d = "number", pocet_odp_d = "number", presnost_odp_d = "number", saz_koef_d = "number", typ_odp_d = "number", rok_start_typ_d = "number", stop_rok_odp_d = "number", stop_rok_odp_zvc_d = "number", c_opr_d = "JsonDecimal", c_vstup_dnm_d = "JsonDecimal", skp_d = "string", polozka_odp_d = "number", rok_skp_od_d = "number",}
	const enum GMajsiaoDtoTypeLengths { id_ext = 50, inv_cis = 50, skupina_odp = 4, skp = 15, mj = 5, skupina_odp_d = 4, skp_d = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsiapDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajsiapDto extends Gordic.Maj.Interface.GMajSeznamDto {
		/**DBCOLUMN:Seznam.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:Seznam.pol_ext*/
		pol_ext?: number|null;
		/**DBCOLUMN:Seznam.zadost_stav*/
		zadost_stav?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dph_odpocet*/
		c_dph_odpocet?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.typ_zdroj*/
		typ_zdroj?: string|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.ser_cis*/
		ser_cis?: string|null;
		/**DBCOLUMN:Seznam.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:Seznam.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:Seznam.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:Seznam.skp*/
		skp?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ueab_por*/
		ueab_por?: string|null;
		/**DBCOLUMN:Seznam.ueab_opr*/
		ueab_opr?: string|null;
		/**DBCOLUMN:Seznam.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:Seznam.dat_por*/
		dat_por?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zar*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**DBCOLUMN:Seznam.trida*/
		trida?: string|null;
		/**DBCOLUMN:Seznam.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:Seznam.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:Seznam.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_txt*/
		ixs_ref_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_maj_nad*/
		ixs_maj_nad?: string|null;
		/**DBCOLUMN:Seznam.typ_soubor*/
		typ_soubor?: number|null;
		/**DBCOLUMN:Seznam.jmeno_soubor*/
		jmeno_soubor?: string|null;
		/**DBCOLUMN:Seznam.inv_cis_soubor*/
		inv_cis_soubor?: string|null;
		/**DBCOLUMN:Seznam.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:Seznam.drh_zkr*/
		drh_zkr?: string|null;
		/**DBCOLUMN:Seznam.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:Seznam.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:Seznam.dev*/
		dev?: number|null;
		/**DBCOLUMN:Seznam.dev_zkr*/
		dev_zkr?: string|null;
		/**DBCOLUMN:Seznam.tka*/
		tka?: number|null;
		/**DBCOLUMN:Seznam.tka_zkr*/
		tka_zkr?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.priz_odp*/
		priz_odp?: number|null;
		/**DBCOLUMN:Seznam.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:Seznam.sarze*/
		sarze?: string|null;
		/**DBCOLUMN:Seznam.zev*/
		zev?: number|null;
		/**DBCOLUMN:Seznam.expirace*/
		expirace?: JsonDate|null;
		/**DBCOLUMN:Seznam.ean*/
		ean?: string|null;
		/**DBCOLUMN:Seznam.dp_ode*/
		dp_ode?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Seznam.kod_vyu*/
		kod_vyu?: number|null;
		/**DBCOLUMN:Seznam.akce*/
		akce?: string|null;
		/**DBCOLUMN:Seznam.segment_kod*/
		segment_kod?: string|null;
		/**DBCOLUMN:Seznam.dat_uct_0123*/
		dat_uct_0123?: JsonDate|null;
		/**DBCOLUMN:Seznam.lhuta_zaruka*/
		lhuta_zaruka?: number|null;
		/**DBCOLUMN:Seznam.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:Seznam.stat_puvod*/
		stat_puvod?: number|null;
		/**DBCOLUMN:Seznam.stat_puvod_txt*/
		stat_puvod_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vyr*/
		ixs_esu_vyr?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vyr_txt*/
		ixs_esu_vyr_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_dod*/
		ixs_esu_dod?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_dod_txt*/
		ixs_esu_dod_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_servis*/
		ixs_esu_servis?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_servis_txt*/
		ixs_esu_servis_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_maj*/
		typ_maj?: string|null;
		/**DBCOLUMN:Seznam.ktg_zar*/
		ktg_zar?: number|null;
		/**DBCOLUMN:Seznam.ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**DBCOLUMN:Seznam.hmotnost*/
		hmotnost?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.prev_stav*/
		prev_stav?: number|null;
		/**DBCOLUMN:Seznam.prev_stav_txt*/
		prev_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.mobilita*/
		mobilita?: number|null;
		/**DBCOLUMN:Seznam.mobilita_txt*/
		mobilita_txt?: string|null;
		/**DBCOLUMN:Seznam.trida_bezp*/
		trida_bezp?: number|null;
		/**DBCOLUMN:Seznam.trida_bezp_txt*/
		trida_bezp_txt?: string|null;
		/**DBCOLUMN:Seznam.riziko_por*/
		riziko_por?: number|null;
		/**DBCOLUMN:Seznam.riziko_por_txt*/
		riziko_por_txt?: string|null;
		/**DBCOLUMN:Seznam.rozmer_l*/
		rozmer_l?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_w*/
		rozmer_w?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_h*/
		rozmer_h?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_esu_vla*/
		ixs_esu_vla?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vla_txt*/
		ixs_esu_vla_txt?: string|null;
		/**DBCOLUMN:Seznam.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:Seznam.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:Seznam.ext_1*/
		ext_1?: number|null;
		/**DBCOLUMN:Seznam.ext_1_txt*/
		ext_1_txt?: string|null;
		/**DBCOLUMN:Seznam.ext_2*/
		ext_2?: number|null;
		/**DBCOLUMN:Seznam.ext_2_txt*/
		ext_2_txt?: string|null;
		/**DBCOLUMN:Seznam.ext_3*/
		ext_3?: number|null;
		/**DBCOLUMN:Seznam.ext_3_txt*/
		ext_3_txt?: string|null;
		/**DBCOLUMN:Seznam.c_dotace*/
		c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ke_pap*/
		ke_pap?: string|null;
		/**DBCOLUMN:Seznam.id_maj*/
		id_maj?: string|null;
		/**DBCOLUMN:Seznam.dat_pro*/
		dat_pro?: JsonDate|null;
		/**DBCOLUMN:Seznam.mena_pro*/
		mena_pro?: number|null;
		/**DBCOLUMN:Seznam.c_mena_pro*/
		c_mena_pro?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cmj_pro1*/
		cmj_pro1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cmj_pro2*/
		cmj_pro2?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cmj_pro3*/
		cmj_pro3?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_maj*/
		ixs_maj?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Maj.Interface.GZadostMajPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GMajsiapDtoNames { id_ext = "id_ext", pol_ext = "pol_ext", zadost_stav = "zadost_stav", lic = "lic", m = "m", c = "c", c_dph = "c_dph", c_c_dph = "c_c_dph", c_dph_odpocet = "c_dph_odpocet", popis = "popis", typ_zdroj = "typ_zdroj", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", rok_vyr = "rok_vyr", skp = "skp", nazev = "nazev", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", trida = "trida", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_orj_txt = "ixs_orj_txt", ixs_ref = "ixs_ref", ixs_ref_txt = "ixs_ref_txt", ixs_maj_nad = "ixs_maj_nad", typ_soubor = "typ_soubor", jmeno_soubor = "jmeno_soubor", inv_cis_soubor = "inv_cis_soubor", drh_id = "drh_id", drh_zkr = "drh_zkr", skupina_id = "skupina_id", skupina_zkr = "skupina_zkr", mj = "mj", skupina_odp = "skupina_odp", dev = "dev", dev_zkr = "dev_zkr", tka = "tka", tka_zkr = "tka_zkr", poznamka = "poznamka", priz_odp = "priz_odp", mat_cis = "mat_cis", sarze = "sarze", zev = "zev", expirace = "expirace", ean = "ean", dp_ode = "dp_ode", dan_typ = "dan_typ", kod_vyu = "kod_vyu", akce = "akce", segment_kod = "segment_kod", dat_uct_0123 = "dat_uct_0123", lhuta_zaruka = "lhuta_zaruka", objekt = "objekt", stat_puvod = "stat_puvod", stat_puvod_txt = "stat_puvod_txt", ixs_esu_vyr = "ixs_esu_vyr", ixs_esu_vyr_txt = "ixs_esu_vyr_txt", ixs_esu_dod = "ixs_esu_dod", ixs_esu_dod_txt = "ixs_esu_dod_txt", ixs_esu_servis = "ixs_esu_servis", ixs_esu_servis_txt = "ixs_esu_servis_txt", typ_maj = "typ_maj", ktg_zar = "ktg_zar", ktg_zar_txt = "ktg_zar_txt", hmotnost = "hmotnost", prev_stav = "prev_stav", prev_stav_txt = "prev_stav_txt", mobilita = "mobilita", mobilita_txt = "mobilita_txt", trida_bezp = "trida_bezp", trida_bezp_txt = "trida_bezp_txt", riziko_por = "riziko_por", riziko_por_txt = "riziko_por_txt", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", ixs_esu_vla = "ixs_esu_vla", ixs_esu_vla_txt = "ixs_esu_vla_txt", gps_sirka = "gps_sirka", gps_delka = "gps_delka", ext_1 = "ext_1", ext_1_txt = "ext_1_txt", ext_2 = "ext_2", ext_2_txt = "ext_2_txt", ext_3 = "ext_3", ext_3_txt = "ext_3_txt", c_dotace = "c_dotace", ke_pap = "ke_pap", id_maj = "id_maj", dat_pro = "dat_pro", mena_pro = "mena_pro", c_mena_pro = "c_mena_pro", cmj_pro1 = "cmj_pro1", cmj_pro2 = "cmj_pro2", cmj_pro3 = "cmj_pro3", ixs_maj = "ixs_maj", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMajsiapDtoFragments { id_ext = "*", pol_ext = "*", zadost_stav = "*", lic = "*", m = "*", c = "*", c_dph = "*", c_c_dph = "*", c_dph_odpocet = "*", popis = "*", typ_zdroj = "*", inv_cis = "*", ser_cis = "*", evi_cis = "*", vyr_cis = "*", rok_vyr = "*", skp = "*", nazev = "*", ueab_por = "*", ueab_opr = "*", ueab_evi = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", trida = "*", stredisko = "*", budova_kod = "*", mistnost_kod = "*", ixs_orj = "*", ixs_orj_txt = "*", ixs_ref = "*", ixs_ref_txt = "*", ixs_maj_nad = "*", typ_soubor = "*", jmeno_soubor = "*", inv_cis_soubor = "*", drh_id = "*", drh_zkr = "*", skupina_id = "*", skupina_zkr = "*", mj = "*", skupina_odp = "*", dev = "*", dev_zkr = "*", tka = "*", tka_zkr = "*", poznamka = "*", priz_odp = "*", mat_cis = "*", sarze = "*", zev = "*", expirace = "*", ean = "*", dp_ode = "*", dan_typ = "*", kod_vyu = "*", akce = "*", segment_kod = "*", dat_uct_0123 = "*", lhuta_zaruka = "*", objekt = "*", stat_puvod = "*", stat_puvod_txt = "*", ixs_esu_vyr = "*", ixs_esu_vyr_txt = "*", ixs_esu_dod = "*", ixs_esu_dod_txt = "*", ixs_esu_servis = "*", ixs_esu_servis_txt = "*", typ_maj = "*", ktg_zar = "*", ktg_zar_txt = "*", hmotnost = "*", prev_stav = "*", prev_stav_txt = "*", mobilita = "*", mobilita_txt = "*", trida_bezp = "*", trida_bezp_txt = "*", riziko_por = "*", riziko_por_txt = "*", rozmer_l = "*", rozmer_w = "*", rozmer_h = "*", ixs_esu_vla = "*", ixs_esu_vla_txt = "*", gps_sirka = "*", gps_delka = "*", ext_1 = "*", ext_1_txt = "*", ext_2 = "*", ext_2_txt = "*", ext_3 = "*", ext_3_txt = "*", c_dotace = "*", ke_pap = "*", id_maj = "*", dat_pro = "*", mena_pro = "*", c_mena_pro = "*", cmj_pro1 = "*", cmj_pro2 = "*", cmj_pro3 = "*", ixs_maj = "*", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GMajsiapDtoTypes { id_ext = "string", pol_ext = "number", zadost_stav = "number", lic = "string", m = "JsonDecimal", c = "JsonDecimal", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", c_dph_odpocet = "JsonDecimal", popis = "string", typ_zdroj = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", rok_vyr = "number", skp = "string", nazev = "string", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", trida = "string", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_orj_txt = "string", ixs_ref = "string", ixs_ref_txt = "string", ixs_maj_nad = "string", typ_soubor = "number", jmeno_soubor = "string", inv_cis_soubor = "string", drh_id = "number", drh_zkr = "string", skupina_id = "number", skupina_zkr = "string", mj = "string", skupina_odp = "string", dev = "number", dev_zkr = "string", tka = "number", tka_zkr = "string", poznamka = "string", priz_odp = "number", mat_cis = "string", sarze = "string", zev = "number", expirace = "JsonDate", ean = "string", dp_ode = "JsonDecimal", dan_typ = "number", kod_vyu = "number", akce = "string", segment_kod = "string", dat_uct_0123 = "JsonDate", lhuta_zaruka = "number", objekt = "string", stat_puvod = "number", stat_puvod_txt = "string", ixs_esu_vyr = "string", ixs_esu_vyr_txt = "string", ixs_esu_dod = "string", ixs_esu_dod_txt = "string", ixs_esu_servis = "string", ixs_esu_servis_txt = "string", typ_maj = "string", ktg_zar = "number", ktg_zar_txt = "string", hmotnost = "JsonDecimal", prev_stav = "number", prev_stav_txt = "string", mobilita = "number", mobilita_txt = "string", trida_bezp = "number", trida_bezp_txt = "string", riziko_por = "number", riziko_por_txt = "string", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", ixs_esu_vla = "string", ixs_esu_vla_txt = "string", gps_sirka = "string", gps_delka = "string", ext_1 = "number", ext_1_txt = "string", ext_2 = "number", ext_2_txt = "string", ext_3 = "number", ext_3_txt = "string", c_dotace = "JsonDecimal", ke_pap = "string", id_maj = "string", dat_pro = "JsonDate", mena_pro = "number", c_mena_pro = "JsonDecimal", cmj_pro1 = "JsonDecimal", cmj_pro2 = "JsonDecimal", cmj_pro3 = "JsonDecimal", ixs_maj = "string", Permissions = "Gordic.Maj.Interface.GZadostMajPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GMajsiapDtoTypeLengths {}
	/**Primární klíč žádosti*/
	interface GZadostMajPkDto {
		/**ID zadosti*/
		id_ext?: string|null;
		/**Polozka zadosti*/
		pol_ext?: number|null;
	}
	const enum GZadostMajPkDtoNames { id_ext = "id_ext", pol_ext = "pol_ext",}
	const enum GZadostMajPkDtoFragments { id_ext = "*", pol_ext = "*",}
	const enum GZadostMajPkDtoTypes { id_ext = "string", pol_ext = "number",}
	const enum GZadostMajPkDtoTypeLengths { id_ext = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsklmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO pro přenos mezi AL - rodic pro db DTO*/
	interface GMajsklmDtoBase {
		/**DBCOLUMN:majsklm.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:majsklm.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majsklm.zev*/
		zev?: number|null;
		/**DBCOLUMN:majsklm.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:majsklm.skupina_zkr*/
		zev_zkr?: string|null;
	}
	const enum GMajsklmDtoBaseNames { mat_cis = "mat_cis", skupina_id = "skupina_id", zev = "zev", skupina_zkr = "skupina_zkr", zev_zkr = "zev_zkr",}
	const enum GMajsklmDtoBaseFragments { mat_cis = "*", skupina_id = "*", zev = "*", skupina_zkr = "*", zev_zkr = "*",}
	const enum GMajsklmDtoBaseTypes { mat_cis = "string", skupina_id = "number", zev = "number", skupina_zkr = "string", zev_zkr = "string",}
	const enum GMajsklmDtoBaseTypeLengths { mat_cis = 20,}
	/**DBTABLE:majsklm*/
	interface GMajsklmDto extends Gordic.Maj.Interface.GMajsklmDtoBase {
		/**DBCOLUMN:majsklm.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsklm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsklm.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsklmDtoNames { ico = "ico", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mat_cis = "mat_cis", skupina_id = "skupina_id", zev = "zev", skupina_zkr = "skupina_zkr", zev_zkr = "zev_zkr",}
	const enum GMajsklmDtoFragments { ico = "*", dat_zmena = "*", zmenu_prov = "*", mat_cis = "*", skupina_id = "*", zev = "*", skupina_zkr = "*", zev_zkr = "*",}
	const enum GMajsklmDtoTypes { ico = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mat_cis = "string", skupina_id = "number", zev = "number", skupina_zkr = "string", zev_zkr = "string",}
	const enum GMajsklmDtoTypeLengths { ico = 10, zmenu_prov = 12, mat_cis = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsktzDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsktz*/
	interface GMajsktzDto {
		/**DBCOLUMN:majsktz.ktg_zar*/
		ktg_zar?: number|null;
		/**DBCOLUMN:majsktz.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsktz.ktg_zar_zkr*/
		ktg_zar_zkr?: string|null;
		/**DBCOLUMN:majsktz.ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**DBCOLUMN:majsktz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsktz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsktz.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsktzDtoNames { ktg_zar = "ktg_zar", ico = "ico", ktg_zar_zkr = "ktg_zar_zkr", ktg_zar_txt = "ktg_zar_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsktzDtoFragments { ktg_zar = "*", ico = "*", ktg_zar_zkr = "*", ktg_zar_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsktzDtoTypes { ktg_zar = "number", ico = "string", ktg_zar_zkr = "string", ktg_zar_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsktzDtoTypeLengths { ico = 10, ktg_zar_zkr = 16, ktg_zar_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsmobDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsmob*/
	interface GMajsmobDto {
		/**DBCOLUMN:majsmob.mobilita*/
		mobilita?: number|null;
		/**DBCOLUMN:majsmob.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsmob.mobilita_zkr*/
		mobilita_zkr?: string|null;
		/**DBCOLUMN:majsmob.mobilita_txt*/
		mobilita_txt?: string|null;
		/**DBCOLUMN:majsmob.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsmob.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsmob.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsmobDtoNames { mobilita = "mobilita", ico = "ico", mobilita_zkr = "mobilita_zkr", mobilita_txt = "mobilita_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsmobDtoFragments { mobilita = "*", ico = "*", mobilita_zkr = "*", mobilita_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsmobDtoTypes { mobilita = "number", ico = "string", mobilita_zkr = "string", mobilita_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsmobDtoTypeLengths { ico = 10, mobilita_zkr = 16, mobilita_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsobmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsobm*/
	interface GMajsobmDto {
		/**DBCOLUMN:majsobm.id_maj*/
		id_maj?: string|null;
		/**DBCOLUMN:majsobm.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:majsobm.dat_obm_zar*/
		dat_obm_zar?: JsonDate|null;
		/**DBCOLUMN:majsobm.podil_obm*/
		podil_obm?: JsonDecimal|null;
		/**DBCOLUMN:majsobm.nazev_obm*/
		nazev_obm?: string|null;
		/**DBCOLUMN:majsobm.popis_obm*/
		popis_obm?: string|null;
		/**DBCOLUMN:majsobm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsobm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsobm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Zkratka skupiny*/
		skupina_zkr?: string|null;
		/**Zkratka druhu*/
		drh_zkr?: string|null;
		/**Stav*/
		mat_akt_txt?: string|null;
		/**Majetková karta*/
		maj?: Gordic.Maj.Interface.GMajmajDto|null;
	}
	const enum GMajsobmDtoNames { id_maj = "id_maj", inv_cis = "inv_cis", dat_obm_zar = "dat_obm_zar", podil_obm = "podil_obm", nazev_obm = "nazev_obm", popis_obm = "popis_obm", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", skupina_zkr = "skupina_zkr", drh_zkr = "drh_zkr", mat_akt_txt = "mat_akt_txt", maj = "maj",}
	const enum GMajsobmDtoFragments { id_maj = "*", inv_cis = "*", dat_obm_zar = "*", podil_obm = "*", nazev_obm = "*", popis_obm = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", skupina_zkr = "*", drh_zkr = "*", mat_akt_txt = "*", maj = "*",}
	const enum GMajsobmDtoTypes { id_maj = "string", inv_cis = "string", dat_obm_zar = "JsonDate", podil_obm = "JsonDecimal", nazev_obm = "string", popis_obm = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", skupina_zkr = "string", drh_zkr = "string", mat_akt_txt = "string", maj = "Gordic.Maj.Interface.GMajmajDto",}
	const enum GMajsobmDtoTypeLengths { id_maj = 40, inv_cis = 50, nazev_obm = 2000, popis_obm = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_majsod } Definice odpisových poměrů pro IČO a druh odpisu*/
	interface GMajsodDto {
		/**Druh odpisu dle VAS.MAJCDOD*/
		druh_odp?: number|null;
		/**Algoritmus odpisu dle VAS.MAJCAOD*/
		def_odp?: number|null;
		/**Interval odpisu dle VAS.MAJCIOD*/
		interval_odp?: number|null;
		/**Povolení odpisu dle VAS.MAJCEOD (0 - není, 10 - je povolen)*/
		povolen?: number|null;
		/**Typ zaokrouhlení odpisu dle VAS.MAJCZOD*/
		typ_round?: number|null;
		/**Čas začátku odpisu dle VAS.MAJCSOD*/
		start_odp?: number|null;
		/**Hodnota odpisu za roční období dle VAS.MAJCPOD ( 0 - Plná roční sazba, 10 - Poměrná část odpovídající počtu měsíců v evidenci)*/
		odpis_pomer?: number|null;
		/**Definice výpočtu odpisu ve 12. měsíci období dle VAS.MAJCTOD (0 - s dorovnáním do plné roční sazby, 10 - bez dorovnání)*/
		odp_12_month?: number|null;
		/**Přesnost odpisu dle VAS.MAJCXOD (0 - měsíc, 10 - den)*/
		presnost_odp?: number|null;
		/**DBCOLUMN:Seznam.proc_vyrazeni*/
		proc_vyrazeni?: JsonDecimal|null;
		/**Příznak odpisu v měsíci vyřazení dle VAS.MAJCVOD (0 - ne, 10 - ano)*/
		odp_vyr_month?: number|null;
		/**Období definice vlastností odpisu*/
		rok?: number|null;
		/**minimání povinná hranice odpisu DNM*/
		c_min_dnm?: JsonDecimal|null;
		/**minimání povinná hranice odpisu DHM*/
		c_min_dhm?: JsonDecimal|null;
		/**Procentuální část pořizovací ceny pro určení zbytkové hodnoty*/
		zbytek_proc?: JsonDecimal|null;
		/**Druh evidence majetku*/
		dev?: number|null;
		/**Rok posledního odpisu*/
		rokobd_odp?: number|null;
		/**Měsíc posledního odpisu*/
		mesobd_odp?: number|null;
		/**okamžik provedení posledního odpisu*/
		datuup_odp?: JsonDate|null;
		k_cus708?: number|null;
	}
	const enum GMajsodDtoNames { druh_odp = "druh_odp", def_odp = "def_odp", interval_odp = "interval_odp", povolen = "povolen", typ_round = "typ_round", start_odp = "start_odp", odpis_pomer = "odpis_pomer", odp_12_month = "odp_12_month", presnost_odp = "presnost_odp", proc_vyrazeni = "proc_vyrazeni", odp_vyr_month = "odp_vyr_month", rok = "rok", c_min_dnm = "c_min_dnm", c_min_dhm = "c_min_dhm", zbytek_proc = "zbytek_proc", dev = "dev", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", datuup_odp = "datuup_odp", k_cus708 = "k_cus708",}
	const enum GMajsodDtoFragments { druh_odp = "*", def_odp = "*", interval_odp = "*", povolen = "*", typ_round = "*", start_odp = "*", odpis_pomer = "*", odp_12_month = "*", presnost_odp = "*", proc_vyrazeni = "*", odp_vyr_month = "*", rok = "*", c_min_dnm = "*", c_min_dhm = "*", zbytek_proc = "*", dev = "*", rokobd_odp = "*", mesobd_odp = "*", datuup_odp = "*", k_cus708 = "*",}
	const enum GMajsodDtoTypes { druh_odp = "number", def_odp = "number", interval_odp = "number", povolen = "number", typ_round = "number", start_odp = "number", odpis_pomer = "number", odp_12_month = "number", presnost_odp = "number", proc_vyrazeni = "JsonDecimal", odp_vyr_month = "number", rok = "number", c_min_dnm = "JsonDecimal", c_min_dhm = "JsonDecimal", zbytek_proc = "JsonDecimal", dev = "number", rokobd_odp = "number", mesobd_odp = "number", datuup_odp = "JsonDate", k_cus708 = "number",}
	const enum GMajsodDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajspohDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majspoh*/
	interface GMajspohDto {
		/**DBCOLUMN:majspoh.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:majspoh.typ_dok*/
		typ_dok?: number|null;
		/**Druh evidence*/
		dev?: number|null;
		/**DBCOLUMN:majspoh.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majspoh.ico*/
		ico?: string|null;
		/**DBCOLUMN:majspoh.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majspoh.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majspoh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majspoh.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:majspoh.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:majspoh.kod_poh_anti*/
		kod_poh_anti?: number|null;
		/**DBCOLUMN:majspoh.typ_dok_anti*/
		typ_dok_anti?: number|null;
		/**DBCOLUMN:majspoh.druh_poh*/
		druh_poh?: number|null;
		/**DBCOLUMN:majspoh.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**DBCOLUMN:majspoh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majspoh.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majspoh.storno_poh*/
		storno_poh?: number|null;
		/**DBCOLUMN:majspoh.nks_cil*/
		nks_cil?: string|null;
		/**Příznak povinnosti párovacího symbolu*/
		priz_ps?: number|null;
		/**Základní identifikace pohybu - součást PK + ICO*/
		id_poh?: string|null;
		/**DBCOLUMN:majspoh.id_poh_anti*/
		id_poh_anti?: string|null;
		/**typ_dok_zkr*/
		typ_dok_zkr?: string|null;
		/**Zkratka druhu pohybu*/
		druh_poh_zkr?: string|null;
		/**Zkratka druhu evidence*/
		dev_zkr?: string|null;
		/**Zkratka storna pohybu*/
		storno_poh_zkr?: string|null;
	}
	const enum GMajspohDtoNames { kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", nazev = "nazev", ico = "ico", ucs = "ucs", distribuce = "distribuce", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", kod_poh_anti = "kod_poh_anti", typ_dok_anti = "typ_dok_anti", druh_poh = "druh_poh", gin_typ_inst = "gin_typ_inst", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", storno_poh = "storno_poh", nks_cil = "nks_cil", priz_ps = "priz_ps", id_poh = "id_poh", id_poh_anti = "id_poh_anti", typ_dok_zkr = "typ_dok_zkr", druh_poh_zkr = "druh_poh_zkr", dev_zkr = "dev_zkr", storno_poh_zkr = "storno_poh_zkr",}
	const enum GMajspohDtoFragments { kod_poh = "*", typ_dok = "*", dev = "*", nazev = "*", ico = "*", ucs = "*", distribuce = "*", aktivita = "*", dat_od = "*", dat_do = "*", kod_poh_anti = "*", typ_dok_anti = "*", druh_poh = "*", gin_typ_inst = "*", dat_zmena = "*", zmenu_prov = "*", storno_poh = "*", nks_cil = "*", priz_ps = "*", id_poh = "*", id_poh_anti = "*", typ_dok_zkr = "*", druh_poh_zkr = "*", dev_zkr = "*", storno_poh_zkr = "*",}
	const enum GMajspohDtoTypes { kod_poh = "number", typ_dok = "number", dev = "number", nazev = "string", ico = "string", ucs = "string", distribuce = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", kod_poh_anti = "number", typ_dok_anti = "number", druh_poh = "number", gin_typ_inst = "string", dat_zmena = "JsonDate", zmenu_prov = "string", storno_poh = "number", nks_cil = "string", priz_ps = "number", id_poh = "string", id_poh_anti = "string", typ_dok_zkr = "string", druh_poh_zkr = "string", dev_zkr = "string", storno_poh_zkr = "string",}
	const enum GMajspohDtoTypeLengths { nazev = 254, ico = 10, ucs = 10, gin_typ_inst = 10, zmenu_prov = 12, nks_cil = 12, id_poh = 15, id_poh_anti = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajspopDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majspop*/
	interface GMajspopDto {
		/**DBCOLUMN:majspop.provoz_podm*/
		provoz_podm?: number|null;
		/**DBCOLUMN:majspop.ico*/
		ico?: string|null;
		/**DBCOLUMN:majspop.provoz_podm_zkr*/
		provoz_podm_zkr?: string|null;
		/**DBCOLUMN:majspop.provoz_podm_txt*/
		provoz_podm_txt?: string|null;
		/**DBCOLUMN:majspop.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majspop.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majspop.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajspopDtoNames { provoz_podm = "provoz_podm", ico = "ico", provoz_podm_zkr = "provoz_podm_zkr", provoz_podm_txt = "provoz_podm_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajspopDtoFragments { provoz_podm = "*", ico = "*", provoz_podm_zkr = "*", provoz_podm_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajspopDtoTypes { provoz_podm = "number", ico = "string", provoz_podm_zkr = "string", provoz_podm_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajspopDtoTypeLengths { ico = 10, provoz_podm_zkr = 16, provoz_podm_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajspriDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajspriDto {
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.dat_in*/
		dat_in?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_out*/
		dat_out?: JsonDate|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.pmj*/
		pmj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.stav_pri*/
		stav_pri?: number|null;
		/**DBCOLUMN:Seznam.id_pri*/
		id_pri?: string|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:Seznam.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:Seznam.ser_cis*/
		ser_cis?: string|null;
		/**DBCOLUMN:Seznam.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:Seznam.sarze*/
		sarze?: string|null;
		/**DBCOLUMN:Seznam.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:Seznam.skp*/
		skp?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.dat_por*/
		dat_por?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zar*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_maj*/
		typ_maj?: string|null;
		/**DBCOLUMN:Seznam.stat_puvod*/
		stat_puvod?: number|null;
		/**DBCOLUMN:Seznam.stat_puvod_txt*/
		stat_puvod_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vyr*/
		ixs_esu_vyr?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_vyr_txt*/
		ixs_esu_vyr_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_esu_vyr*/
		typ_esu_vyr?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu_dod*/
		ixs_esu_dod?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_dod_txt*/
		ixs_esu_dod_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_esu_dod*/
		typ_esu_dod?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu_servis*/
		ixs_esu_servis?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_servis_txt*/
		ixs_esu_servis_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_esu_servis*/
		typ_esu_servis?: number|null;
		/**DBCOLUMN:Seznam.ktg_zar*/
		ktg_zar?: number|null;
		/**DBCOLUMN:Seznam.ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**DBCOLUMN:Seznam.rozmer_l*/
		rozmer_l?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_w*/
		rozmer_w?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.rozmer_h*/
		rozmer_h?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.hmotnost*/
		hmotnost?: JsonDecimal|null;
	}
	const enum GMajspriDtoNames { inv_cis = "inv_cis", por_cis = "por_cis", dat_in = "dat_in", dat_out = "dat_out", c = "c", pmj = "pmj", stav_pri = "stav_pri", id_pri = "id_pri", mj = "mj", rok_vyr = "rok_vyr", vyr_cis = "vyr_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", sarze = "sarze", mat_cis = "mat_cis", skp = "skp", nazev = "nazev", popis = "popis", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", typ_maj = "typ_maj", stat_puvod = "stat_puvod", stat_puvod_txt = "stat_puvod_txt", ixs_esu_vyr = "ixs_esu_vyr", ixs_esu_vyr_txt = "ixs_esu_vyr_txt", typ_esu_vyr = "typ_esu_vyr", ixs_esu_dod = "ixs_esu_dod", ixs_esu_dod_txt = "ixs_esu_dod_txt", typ_esu_dod = "typ_esu_dod", ixs_esu_servis = "ixs_esu_servis", ixs_esu_servis_txt = "ixs_esu_servis_txt", typ_esu_servis = "typ_esu_servis", ktg_zar = "ktg_zar", ktg_zar_txt = "ktg_zar_txt", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", hmotnost = "hmotnost",}
	const enum GMajspriDtoFragments { inv_cis = "*", por_cis = "*", dat_in = "*", dat_out = "*", c = "*", pmj = "*", stav_pri = "*", id_pri = "*", mj = "*", rok_vyr = "*", vyr_cis = "*", ser_cis = "*", evi_cis = "*", sarze = "*", mat_cis = "*", skp = "*", nazev = "*", popis = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", typ_maj = "*", stat_puvod = "*", stat_puvod_txt = "*", ixs_esu_vyr = "*", ixs_esu_vyr_txt = "*", typ_esu_vyr = "*", ixs_esu_dod = "*", ixs_esu_dod_txt = "*", typ_esu_dod = "*", ixs_esu_servis = "*", ixs_esu_servis_txt = "*", typ_esu_servis = "*", ktg_zar = "*", ktg_zar_txt = "*", rozmer_l = "*", rozmer_w = "*", rozmer_h = "*", hmotnost = "*",}
	const enum GMajspriDtoTypes { inv_cis = "string", por_cis = "number", dat_in = "JsonDate", dat_out = "JsonDate", c = "JsonDecimal", pmj = "JsonDecimal", stav_pri = "number", id_pri = "string", mj = "string", rok_vyr = "number", vyr_cis = "string", ser_cis = "string", evi_cis = "string", sarze = "string", mat_cis = "string", skp = "string", nazev = "string", popis = "string", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", typ_maj = "string", stat_puvod = "number", stat_puvod_txt = "string", ixs_esu_vyr = "string", ixs_esu_vyr_txt = "string", typ_esu_vyr = "number", ixs_esu_dod = "string", ixs_esu_dod_txt = "string", typ_esu_dod = "number", ixs_esu_servis = "string", ixs_esu_servis_txt = "string", typ_esu_servis = "number", ktg_zar = "number", ktg_zar_txt = "string", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", hmotnost = "JsonDecimal",}
	const enum GMajspriDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsripDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsrip*/
	interface GMajsripDto {
		/**DBCOLUMN:majsrip.riziko_por*/
		riziko_por?: number|null;
		/**DBCOLUMN:majsrip.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsrip.riziko_por_zkr*/
		riziko_por_zkr?: string|null;
		/**DBCOLUMN:majsrip.riziko_por_txt*/
		riziko_por_txt?: string|null;
		/**DBCOLUMN:majsrip.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsrip.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsrip.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsripDtoNames { riziko_por = "riziko_por", ico = "ico", riziko_por_zkr = "riziko_por_zkr", riziko_por_txt = "riziko_por_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsripDtoFragments { riziko_por = "*", ico = "*", riziko_por_zkr = "*", riziko_por_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsripDtoTypes { riziko_por = "number", ico = "string", riziko_por_zkr = "string", riziko_por_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsripDtoTypeLengths { ico = 10, riziko_por_zkr = 16, riziko_por_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsrpbDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GMajsrpbDto {
		/**IČO*/
		ico?: string|null;
		/**Inventární číslo*/
		inv_cis?: string|null;
		/**Druhy budovy - číselník GINCBUD*/
		druh_bud?: number|null;
		/**Id.ESU*/
		ixs_esu?: string|null;
		/**Cena posudku*/
		c_pos?: JsonDecimal|null;
		/**Cena posudku upravená*/
		c_upr?: JsonDecimal|null;
		/**ČJ kolaudace*/
		cj_kol?: string|null;
		/**Datum kolaudace*/
		dat_kol?: JsonDate|null;
		/**Velikost obestavěného prostoru*/
		obest_prostor?: JsonDecimal|null;
		/**Velikost zastavěné plochy*/
		zast_plocha?: JsonDecimal|null;
		/**Počet podlaží*/
		podlazi?: number|null;
		/**příznak existence RPB(!) v DB*/
		exists?: boolean|null;
		/**příznak změny RPB*/
		rpb_changed?: boolean|null;
		/**Kód budovy (GINSBUD)*/
		budova_kod?: string|null;
		/**Id.ESU uživatele*/
		ixs_esu_uziv?: string|null;
		/**Id. ESU správce*/
		ixs_esu_spr?: string|null;
		budova_druh?: number|null;
		/**příznak změny RPB*/
		bud_changed?: boolean|null;
	}
	const enum GMajsrpbDtoNames { ico = "ico", inv_cis = "inv_cis", druh_bud = "druh_bud", ixs_esu = "ixs_esu", c_pos = "c_pos", c_upr = "c_upr", cj_kol = "cj_kol", dat_kol = "dat_kol", obest_prostor = "obest_prostor", zast_plocha = "zast_plocha", podlazi = "podlazi", exists = "exists", rpb_changed = "rpb_changed", budova_kod = "budova_kod", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", budova_druh = "budova_druh", bud_changed = "bud_changed",}
	const enum GMajsrpbDtoFragments { ico = "*", inv_cis = "*", druh_bud = "*", ixs_esu = "*", c_pos = "*", c_upr = "*", cj_kol = "*", dat_kol = "*", obest_prostor = "*", zast_plocha = "*", podlazi = "*", exists = "*", rpb_changed = "*", budova_kod = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", budova_druh = "*", bud_changed = "*",}
	const enum GMajsrpbDtoTypes { ico = "string", inv_cis = "string", druh_bud = "number", ixs_esu = "string", c_pos = "JsonDecimal", c_upr = "JsonDecimal", cj_kol = "string", dat_kol = "JsonDate", obest_prostor = "JsonDecimal", zast_plocha = "JsonDecimal", podlazi = "number", exists = "boolean", rpb_changed = "boolean", budova_kod = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", budova_druh = "number", bud_changed = "boolean",}
	const enum GMajsrpbDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsrpbPKDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO pro primární klíč rozšířeného profilu budovy*/
	interface GMajsrpbPKDto {
		/**IČO*/
		ico?: string|null;
		/**Inventární číslo*/
		inv_cis?: string|null;
	}
	const enum GMajsrpbPKDtoNames { ico = "ico", inv_cis = "inv_cis",}
	const enum GMajsrpbPKDtoFragments { ico = "*", inv_cis = "*",}
	const enum GMajsrpbPKDtoTypes { ico = "string", inv_cis = "string",}
	const enum GMajsrpbPKDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsskmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsskm*/
	interface GMajsskmDto {
		/**DBCOLUMN:majsskm.ixs_skm*/
		ixs_skm?: string|null;
		/**DBCOLUMN:majsskm.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majsskm.skupina_txt*/
		skupina_txt?: string|null;
		/**DBCOLUMN:majsskm.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:majsskm.mode_odp*/
		mode_odp?: number|null;
		/**DBCOLUMN:majsskm.skupina_typ*/
		skupina_typ?: number|null;
		/**DBCOLUMN:majsskm.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majsskm.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:majsskm.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:majsskm.s_unique*/
		s_unique?: number|null;
		/**DBCOLUMN:majsskm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsskm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsskm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsskm.c_min_dp*/
		c_min_dp?: JsonDecimal|null;
		/**DBCOLUMN:majsskm.typ_dm*/
		typ_dm?: number|null;
		/**DBCOLUMN:majsskm.s_prodej*/
		s_prodej?: number|null;
		/**mode_odp_txt - majcrod*/
		mode_odp_txt?: string|null;
		/**typ skupiny - majckts*/
		skupina_typ_zkr?: string|null;
		/**typ_dm_zkr - majctdm*/
		typ_dm_zkr?: string|null;
		/**s_prodej_txt - majcppr*/
		s_prodej_txt?: string|null;
	}
	const enum GMajsskmDtoNames { ixs_skm = "ixs_skm", skupina_id = "skupina_id", skupina_txt = "skupina_txt", skupina_zkr = "skupina_zkr", mode_odp = "mode_odp", skupina_typ = "skupina_typ", distribuce = "distribuce", k_v = "k_v", k_s = "k_s", s_unique = "s_unique", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_min_dp = "c_min_dp", typ_dm = "typ_dm", s_prodej = "s_prodej", mode_odp_txt = "mode_odp_txt", skupina_typ_zkr = "skupina_typ_zkr", typ_dm_zkr = "typ_dm_zkr", s_prodej_txt = "s_prodej_txt",}
	const enum GMajsskmDtoFragments { ixs_skm = "*", skupina_id = "*", skupina_txt = "*", skupina_zkr = "*", mode_odp = "*", skupina_typ = "*", distribuce = "*", k_v = "*", k_s = "*", s_unique = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", c_min_dp = "*", typ_dm = "*", s_prodej = "*", mode_odp_txt = "*", skupina_typ_zkr = "*", typ_dm_zkr = "*", s_prodej_txt = "*",}
	const enum GMajsskmDtoTypes { ixs_skm = "string", skupina_id = "number", skupina_txt = "string", skupina_zkr = "string", mode_odp = "number", skupina_typ = "number", distribuce = "number", k_v = "number", k_s = "string", s_unique = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_min_dp = "JsonDecimal", typ_dm = "number", s_prodej = "number", mode_odp_txt = "string", skupina_typ_zkr = "string", typ_dm_zkr = "string", s_prodej_txt = "string",}
	const enum GMajsskmDtoTypeLengths { ixs_skm = 12, skupina_txt = 50, skupina_zkr = 16, k_s = 15, zmenu_prov = 12,}
	/**ENUM:majsskm*/
	const enum GMajsskmEnum {
		/**0000AJG0A00V*/
		_0000AJG0A00V,
		/**0000AJG0A01Q*/
		_0000AJG0A01Q,
		/**0000AJG0A02L*/
		_0000AJG0A02L,
		/**0000AJG0A03G*/
		_0000AJG0A03G,
		/**0000AJG0A04B*/
		_0000AJG0A04B,
		/**0000AJG0A056*/
		_0000AJG0A056,
		/**0000AJG0A061*/
		_0000AJG0A061,
		/**0000AJG0A07W*/
		_0000AJG0A07W,
		/**0000AJG0A08R*/
		_0000AJG0A08R,
	}
	function GMajsskmEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMajsskmEnum, Gordic.Maj.Interface.GMajsskmDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajssouDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majssou*/
	interface GMajssouDto {
		/**DBCOLUMN:majssou.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majssou.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:majssou.ixs_maj_prvek*/
		ixs_maj_prvek?: string|null;
		/**DBCOLUMN:majssou.typ_soubor*/
		typ_soubor?: number|null;
		/**DBCOLUMN:majssou.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:majssou.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majssou.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majssou.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:majssou.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:majssou.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:majssou.skp*/
		skp?: string|null;
		/**DBCOLUMN:majssou.pmj*/
		pmj?: JsonDecimal|null;
		/**DBCOLUMN:majssou.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:majssou.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:majssou.datum_in*/
		datum_in?: JsonDate|null;
		/**DBCOLUMN:majssou.datum_out*/
		datum_out?: JsonDate|null;
		/**DBCOLUMN:majssou.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:majssou.stav_prvek*/
		stav_prvek?: number|null;
		/**DBCOLUMN:majssou.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:majssou.mj*/
		mj?: string|null;
		/**DBCOLUMN:majssou.ico*/
		ico?: string|null;
		/**DBCOLUMN:majssou.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majssou.nks*/
		nks?: string|null;
		/**DBCOLUMN:majssou.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majssou.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majssou.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:majssou.oper_cislo*/
		oper_cislo?: number|null;
		/**DBCOLUMN:majssou.id_top*/
		id_top?: string|null;
		/**DBCOLUMN:majssou.mat_cis*/
		mat_cis?: string|null;
		skupina_zkr?: string|null;
		drh_zkr?: string|null;
		trida?: string|null;
	}
	const enum GMajssouDtoNames { ixs_maj = "ixs_maj", ser_cislo = "ser_cislo", ixs_maj_prvek = "ixs_maj_prvek", typ_soubor = "typ_soubor", drh_id = "drh_id", skupina_id = "skupina_id", nazev = "nazev", rok_vyr = "rok_vyr", evi_cis = "evi_cis", vyr_cis = "vyr_cis", skp = "skp", pmj = "pmj", c = "c", skupina_odp = "skupina_odp", datum_in = "datum_in", datum_out = "datum_out", poznamka = "poznamka", stav_prvek = "stav_prvek", inv_cis = "inv_cis", mj = "mj", ico = "ico", ucs = "ucs", nks = "nks", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ueab_evi = "ueab_evi", oper_cislo = "oper_cislo", id_top = "id_top", mat_cis = "mat_cis", skupina_zkr = "skupina_zkr", drh_zkr = "drh_zkr", trida = "trida",}
	const enum GMajssouDtoFragments { ixs_maj = "*", ser_cislo = "*", ixs_maj_prvek = "*", typ_soubor = "*", drh_id = "*", skupina_id = "*", nazev = "*", rok_vyr = "*", evi_cis = "*", vyr_cis = "*", skp = "*", pmj = "*", c = "*", skupina_odp = "*", datum_in = "*", datum_out = "*", poznamka = "*", stav_prvek = "*", inv_cis = "*", mj = "*", ico = "*", ucs = "*", nks = "*", dat_zmena = "*", zmenu_prov = "*", ueab_evi = "*", oper_cislo = "*", id_top = "*", mat_cis = "*", skupina_zkr = "*", drh_zkr = "*", trida = "*",}
	const enum GMajssouDtoTypes { ixs_maj = "string", ser_cislo = "number", ixs_maj_prvek = "string", typ_soubor = "number", drh_id = "number", skupina_id = "number", nazev = "string", rok_vyr = "number", evi_cis = "string", vyr_cis = "string", skp = "string", pmj = "JsonDecimal", c = "JsonDecimal", skupina_odp = "string", datum_in = "JsonDate", datum_out = "JsonDate", poznamka = "string", stav_prvek = "number", inv_cis = "string", mj = "string", ico = "string", ucs = "string", nks = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ueab_evi = "string", oper_cislo = "number", id_top = "string", mat_cis = "string", skupina_zkr = "string", drh_zkr = "string", trida = "string",}
	const enum GMajssouDtoTypeLengths { ixs_maj = 12, ixs_maj_prvek = 12, nazev = 2000, evi_cis = 40, vyr_cis = 40, skp = 15, skupina_odp = 4, poznamka = 254, inv_cis = 50, mj = 5, ico = 10, ucs = 10, nks = 12, zmenu_prov = 12, ueab_evi = 7, id_top = 12, mat_cis = 20, skupina_zkr = 16, drh_zkr = 16, trida = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsstpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsstp*/
	interface GMajsstpDto {
		/**DBCOLUMN:majsstp.prev_stav*/
		prev_stav?: number|null;
		/**DBCOLUMN:majsstp.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsstp.prev_stav_zkr*/
		prev_stav_zkr?: string|null;
		/**DBCOLUMN:majsstp.prev_stav_txt*/
		prev_stav_txt?: string|null;
		/**DBCOLUMN:majsstp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsstp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsstp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsstpDtoNames { prev_stav = "prev_stav", ico = "ico", prev_stav_zkr = "prev_stav_zkr", prev_stav_txt = "prev_stav_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsstpDtoFragments { prev_stav = "*", ico = "*", prev_stav_zkr = "*", prev_stav_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsstpDtoTypes { prev_stav = "number", ico = "string", prev_stav_zkr = "string", prev_stav_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsstpDtoTypeLengths { ico = 10, prev_stav_zkr = 16, prev_stav_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majstod*/
	interface GMajstodDto {
		/**DBCOLUMN:majstod.typ_odp*/
		typ_odp?: number|null;
		/**DBCOLUMN:majstod.rok_start_typ*/
		rok_start_typ?: number|null;
		/**DBCOLUMN:majstod.rok_stop_typ*/
		rok_stop_typ?: number|null;
		/**DBCOLUMN:majstod.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:majstod.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majstod.priorita*/
		priorita?: number|null;
		/**DBCOLUMN:majstod.def_odp*/
		def_odp?: number|null;
		/**DBCOLUMN:majstod.filtr*/
		filtr?: string|null;
		/**DBCOLUMN:majstod.distribuce*/
		distribuce?: number|null;
		/**DBCOLUMN:majstod.dan_def*/
		dan_def?: number|null;
		/**DBCOLUMN:majstod.pocet_odp*/
		pocet_odp?: number|null;
		/**DBCOLUMN:majstod.def_vector1*/
		def_vector1?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector2*/
		def_vector2?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector3*/
		def_vector3?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector4*/
		def_vector4?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector5*/
		def_vector5?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector6*/
		def_vector6?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector7*/
		def_vector7?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector8*/
		def_vector8?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector9*/
		def_vector9?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector10*/
		def_vector10?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector11*/
		def_vector11?: JsonDecimal|null;
		/**DBCOLUMN:majstod.def_vector12*/
		def_vector12?: JsonDecimal|null;
		/**DBCOLUMN:majstod.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majstod.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majstod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majstod.ixs_tod*/
		ixs_tod?: string|null;
		/**DBCOLUMN:majstod.c_cov*/
		c_cov?: JsonDecimal|null;
		/**vazba_exist*/
		vazba_exist?: number|null;
		/**vazba_aktivita*/
		vazba_aktivita?: number|null;
		/**zkratka algoritmu*/
		def_odp_zkr?: string|null;
		/**zkratka  daň*/
		dan_def_zkr?: string|null;
	}
	const enum GMajstodDtoNames { typ_odp = "typ_odp", rok_start_typ = "rok_start_typ", rok_stop_typ = "rok_stop_typ", zkratka = "zkratka", nazev = "nazev", priorita = "priorita", def_odp = "def_odp", filtr = "filtr", distribuce = "distribuce", dan_def = "dan_def", pocet_odp = "pocet_odp", def_vector1 = "def_vector1", def_vector2 = "def_vector2", def_vector3 = "def_vector3", def_vector4 = "def_vector4", def_vector5 = "def_vector5", def_vector6 = "def_vector6", def_vector7 = "def_vector7", def_vector8 = "def_vector8", def_vector9 = "def_vector9", def_vector10 = "def_vector10", def_vector11 = "def_vector11", def_vector12 = "def_vector12", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tod = "ixs_tod", c_cov = "c_cov", vazba_exist = "vazba_exist", vazba_aktivita = "vazba_aktivita", def_odp_zkr = "def_odp_zkr", dan_def_zkr = "dan_def_zkr",}
	const enum GMajstodDtoFragments { typ_odp = "*", rok_start_typ = "*", rok_stop_typ = "*", zkratka = "*", nazev = "*", priorita = "*", def_odp = "*", filtr = "*", distribuce = "*", dan_def = "*", pocet_odp = "*", def_vector1 = "*", def_vector2 = "*", def_vector3 = "*", def_vector4 = "*", def_vector5 = "*", def_vector6 = "*", def_vector7 = "*", def_vector8 = "*", def_vector9 = "*", def_vector10 = "*", def_vector11 = "*", def_vector12 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_tod = "*", c_cov = "*", vazba_exist = "*", vazba_aktivita = "*", def_odp_zkr = "*", dan_def_zkr = "*",}
	const enum GMajstodDtoTypes { typ_odp = "number", rok_start_typ = "number", rok_stop_typ = "number", zkratka = "string", nazev = "string", priorita = "number", def_odp = "number", filtr = "string", distribuce = "number", dan_def = "number", pocet_odp = "number", def_vector1 = "JsonDecimal", def_vector2 = "JsonDecimal", def_vector3 = "JsonDecimal", def_vector4 = "JsonDecimal", def_vector5 = "JsonDecimal", def_vector6 = "JsonDecimal", def_vector7 = "JsonDecimal", def_vector8 = "JsonDecimal", def_vector9 = "JsonDecimal", def_vector10 = "JsonDecimal", def_vector11 = "JsonDecimal", def_vector12 = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tod = "string", c_cov = "JsonDecimal", vazba_exist = "number", vazba_aktivita = "number", def_odp_zkr = "string", dan_def_zkr = "string",}
	const enum GMajstodDtoTypeLengths { zkratka = 16, nazev = 254, filtr = 4, zmenu_prov = 12, ixs_tod = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstrbDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majstrb*/
	interface GMajstrbDto {
		/**DBCOLUMN:majstrb.trida_bezp*/
		trida_bezp?: number|null;
		/**DBCOLUMN:majstrb.ico*/
		ico?: string|null;
		/**DBCOLUMN:majstrb.trida_bezp_zkr*/
		trida_bezp_zkr?: string|null;
		/**DBCOLUMN:majstrb.trida_bezp_txt*/
		trida_bezp_txt?: string|null;
		/**DBCOLUMN:majstrb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majstrb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majstrb.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajstrbDtoNames { trida_bezp = "trida_bezp", ico = "ico", trida_bezp_zkr = "trida_bezp_zkr", trida_bezp_txt = "trida_bezp_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajstrbDtoFragments { trida_bezp = "*", ico = "*", trida_bezp_zkr = "*", trida_bezp_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajstrbDtoTypes { trida_bezp = "number", ico = "string", trida_bezp_zkr = "string", trida_bezp_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajstrbDtoTypeLengths { ico = 10, trida_bezp_zkr = 16, trida_bezp_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstrfDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GMajstrfDto {
		/**inventární číslo maj. karty*/
		inv_cis?: string|null;
		/**poskytovatel*/
		ixs_esu?: string|null;
		/**datum UÚP*/
		dat_pri?: JsonDate|null;
		dat_pri_old?: JsonDate|null;
		/**částka transferu/dotace*/
		c_dotace?: JsonDecimal|null;
		poznamka?: string|null;
		/**kód analytiky PAP - výnosy*/
		kt_pap?: string|null;
		/**AÚ transferu*/
		ueb_tr?: string|null;
		/**AÚ výnosu*/
		ueb_vyn?: string|null;
		/**aktivita zázanmu*/
		aktivita?: number|null;
		/**rozpuštěný transfer*/
		c_dotace_opr?: JsonDecimal|null;
		/**část účetní věty - ÚZ*/
		ueg?: string|null;
		/**pro SPG*/
		ueg_old?: string|null;
		/**pro dohledání původního záznamu*/
		ueg_db?: string|null;
		/**část účetní věty - POL*/
		ueg_v?: string|null;
		/**část účetní věty - ORG*/
		te1?: string|null;
		/**datum příjmu*/
		dat_prijmu?: JsonDate|null;
		/**rok odpisu*/
		rokobd_odp?: number|null;
		/**měsíc odpisu*/
		mesobd_odp?: number|null;
		/**opravná položka*/
		c_opr_pol?: JsonDecimal|null;
		/**kód analytiky PAP - transfery*/
		kt_pap_tr?: string|null;
		/**kód analytiky PAP - transfery*/
		kt_pap_tr_old?: string|null;
		/**IČO poskytovatele*/
		ico_esu?: string|null;
		/**typ ESU poskytovatele*/
		typ_esu?: number|null;
		/**poskytovatel*/
		ixs_esu_txt?: string|null;
		/**celkový rozpuštěný transfer*/
		c_dotace_opr_all?: JsonDecimal|null;
		/**nerozpuštěný transfer*/
		c_dotace_rest?: JsonDecimal|null;
	}
	const enum GMajstrfDtoNames { inv_cis = "inv_cis", ixs_esu = "ixs_esu", dat_pri = "dat_pri", dat_pri_old = "dat_pri_old", c_dotace = "c_dotace", poznamka = "poznamka", kt_pap = "kt_pap", ueb_tr = "ueb_tr", ueb_vyn = "ueb_vyn", aktivita = "aktivita", c_dotace_opr = "c_dotace_opr", ueg = "ueg", ueg_old = "ueg_old", ueg_db = "ueg_db", ueg_v = "ueg_v", te1 = "te1", dat_prijmu = "dat_prijmu", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", c_opr_pol = "c_opr_pol", kt_pap_tr = "kt_pap_tr", kt_pap_tr_old = "kt_pap_tr_old", ico_esu = "ico_esu", typ_esu = "typ_esu", ixs_esu_txt = "ixs_esu_txt", c_dotace_opr_all = "c_dotace_opr_all", c_dotace_rest = "c_dotace_rest",}
	const enum GMajstrfDtoFragments { inv_cis = "*", ixs_esu = "*", dat_pri = "*", dat_pri_old = "*", c_dotace = "*", poznamka = "*", kt_pap = "*", ueb_tr = "*", ueb_vyn = "*", aktivita = "*", c_dotace_opr = "*", ueg = "*", ueg_old = "*", ueg_db = "*", ueg_v = "*", te1 = "*", dat_prijmu = "*", rokobd_odp = "*", mesobd_odp = "*", c_opr_pol = "*", kt_pap_tr = "*", kt_pap_tr_old = "*", ico_esu = "*", typ_esu = "*", ixs_esu_txt = "*", c_dotace_opr_all = "*", c_dotace_rest = "*",}
	const enum GMajstrfDtoTypes { inv_cis = "string", ixs_esu = "string", dat_pri = "JsonDate", dat_pri_old = "JsonDate", c_dotace = "JsonDecimal", poznamka = "string", kt_pap = "string", ueb_tr = "string", ueb_vyn = "string", aktivita = "number", c_dotace_opr = "JsonDecimal", ueg = "string", ueg_old = "string", ueg_db = "string", ueg_v = "string", te1 = "string", dat_prijmu = "JsonDate", rokobd_odp = "number", mesobd_odp = "number", c_opr_pol = "JsonDecimal", kt_pap_tr = "string", kt_pap_tr_old = "string", ico_esu = "string", typ_esu = "number", ixs_esu_txt = "string", c_dotace_opr_all = "JsonDecimal", c_dotace_rest = "JsonDecimal",}
	const enum GMajstrfDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstriDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majstri*/
	interface GMajstriDto {
		/**DBCOLUMN:majstri.trida*/
		trida?: string|null;
		/**DBCOLUMN:majstri.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majstri.ico*/
		ico?: string|null;
		/**DBCOLUMN:majstri.nks_komp*/
		nks_komp?: string|null;
		/**DBCOLUMN:majstri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majstri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majstri.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majstri.hs_nks*/
		hs_nks?: number|null;
	}
	const enum GMajstriDtoNames { trida = "trida", nazev = "nazev", ico = "ico", nks_komp = "nks_komp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", hs_nks = "hs_nks",}
	const enum GMajstriDtoFragments { trida = "*", nazev = "*", ico = "*", nks_komp = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", hs_nks = "*",}
	const enum GMajstriDtoTypes { trida = "string", nazev = "string", ico = "string", nks_komp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", hs_nks = "number",}
	const enum GMajstriDtoTypeLengths { trida = 4, nazev = 50, ico = 10, nks_komp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstrsDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Šablona transferu vybraného poskytovatele*/
	interface GMajstrsDto {
		/**kód analytiky PAP - výnosy*/
		kt_pap?: string|null;
		/**AÚ transferu*/
		ueb_tr?: string|null;
		/**AÚ výnosu*/
		ueb_vyn?: string|null;
		/**kód analytiky PAP - transfer*/
		kt_pap_tr?: string|null;
		/**část účetní věty - ÚZ*/
		ueg?: string|null;
		/**část účetní věty - POL*/
		ueg_v?: string|null;
		/**část účetní věty - ORG*/
		te1?: string|null;
	}
	const enum GMajstrsDtoNames { kt_pap = "kt_pap", ueb_tr = "ueb_tr", ueb_vyn = "ueb_vyn", kt_pap_tr = "kt_pap_tr", ueg = "ueg", ueg_v = "ueg_v", te1 = "te1",}
	const enum GMajstrsDtoFragments { kt_pap = "*", ueb_tr = "*", ueb_vyn = "*", kt_pap_tr = "*", ueg = "*", ueg_v = "*", te1 = "*",}
	const enum GMajstrsDtoTypes { kt_pap = "string", ueb_tr = "string", ueb_vyn = "string", kt_pap_tr = "string", ueg = "string", ueg_v = "string", te1 = "string",}
	const enum GMajstrsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajstyzDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majstyz*/
	interface GMajstyzDto {
		/**DBCOLUMN:majstyz.ixs_tyz*/
		ixs_tyz?: string|null;
		/**DBCOLUMN:majstyz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majstyz.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:majstyz.typ_zodp*/
		typ_zodp?: number|null;
		/**DBCOLUMN:majstyz.typ_zodp*/
		typ_zodp_txt?: string|null;
		/**DBCOLUMN:majstyz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majstyz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majstyz.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajstyzDtoNames { ixs_tyz = "ixs_tyz", nazev = "nazev", zkratka = "zkratka", typ_zodp = "typ_zodp", typ_zodp_txt = "typ_zodp_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajstyzDtoFragments { ixs_tyz = "*", nazev = "*", zkratka = "*", typ_zodp = "*", typ_zodp_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajstyzDtoTypes { ixs_tyz = "string", nazev = "string", zkratka = "string", typ_zodp = "number", typ_zodp_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajstyzDtoTypeLengths { ixs_tyz = 12, nazev = 50, zkratka = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsueaDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsuea*/
	interface GMajsueaDto {
		/**DBCOLUMN:majsuea.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:majsuea.dev*/
		dev?: number|null;
		/**DBCOLUMN:majsuea.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:majsuea.uea*/
		uea?: string|null;
		/**DBCOLUMN:majsuea.ixs_vue*/
		ixs_vue?: string|null;
		/**DBCOLUMN:majsuea.ueab_xxx*/
		ueab_xxx?: string|null;
		/**DBCOLUMN:majsuea.popis*/
		popis?: string|null;
		/**DBCOLUMN:majsuea.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsuea.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsuea.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Zkratka DEV*/
		dev_zkr?: string|null;
		/**Zkratka druhu majetku*/
		drh_zkr?: string|null;
	}
	const enum GMajsueaDtoNames { drh_id = "drh_id", dev = "dev", ueb = "ueb", uea = "uea", ixs_vue = "ixs_vue", ueab_xxx = "ueab_xxx", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dev_zkr = "dev_zkr", drh_zkr = "drh_zkr",}
	const enum GMajsueaDtoFragments { drh_id = "*", dev = "*", ueb = "*", uea = "*", ixs_vue = "*", ueab_xxx = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dev_zkr = "*", drh_zkr = "*",}
	const enum GMajsueaDtoTypes { drh_id = "number", dev = "number", ueb = "string", uea = "string", ixs_vue = "string", ueab_xxx = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dev_zkr = "string", drh_zkr = "string",}
	const enum GMajsueaDtoTypeLengths { ueb = 4, uea = 3, ixs_vue = 12, ueab_xxx = 7, popis = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajsvueDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsvue*/
	interface GMajsvueDto {
		/**DBCOLUMN:majsvue.ixs_vue*/
		ixs_vue?: string|null;
		/**DBCOLUMN:majsvue.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majsvue.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majsvue.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:majsvue.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:majsvue.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:majsvue.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsvue.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajsvueDtoNames { ixs_vue = "ixs_vue", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajsvueDtoFragments { ixs_vue = "*", aktivita = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajsvueDtoTypes { ixs_vue = "string", aktivita = "number", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajsvueDtoTypeLengths { ixs_vue = 12, nazev = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajszzhDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majszzh*/
	interface GMajszzhDto {
		/**DBCOLUMN:majszzh.ico*/
		ico?: string|null;
		/**DBCOLUMN:majszzh.druh_odp*/
		druh_odp?: number|null;
		/**DBCOLUMN:majszzh.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:majszzh.ueab_opr*/
		ueab_opr?: string|null;
		/**DBCOLUMN:majszzh.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:majszzh.c_zbytek_dec*/
		c_zbytek_dec?: JsonDecimal|null;
		/**DBCOLUMN:majszzh.c_zbytek_proc*/
		c_zbytek_proc?: JsonDecimal|null;
		/**DBCOLUMN:majszzh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majszzh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majszzh.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajszzhDtoNames { ico = "ico", druh_odp = "druh_odp", rok_od = "rok_od", ueab_opr = "ueab_opr", rok_do = "rok_do", c_zbytek_dec = "c_zbytek_dec", c_zbytek_proc = "c_zbytek_proc", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajszzhDtoFragments { ico = "*", druh_odp = "*", rok_od = "*", ueab_opr = "*", rok_do = "*", c_zbytek_dec = "*", c_zbytek_proc = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajszzhDtoTypes { ico = "string", druh_odp = "number", rok_od = "number", ueab_opr = "string", rok_do = "number", c_zbytek_dec = "JsonDecimal", c_zbytek_proc = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajszzhDtoTypeLengths { ico = 10, ueab_opr = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajTransferCasDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**VAS.MAJLTRF*/
	interface GMajTransferCasDto {
		/**PK majltrf*/
		ser_cislo_odp?: number|null;
		/**doklad*/
		ixp?: string|null;
		ser_cislo?: number|null;
		ser_hst_odp?: number|null;
		/**poskytovatel*/
		ixs_esu?: string|null;
		/**poskytovatel*/
		ico_esu?: string|null;
		/**poskytovatel*/
		ixs_esu_txt?: string|null;
		/**typ ESU poskytovatele*/
		typ_esu?: number|null;
		/**částka transferu/dotace*/
		c_dotace?: JsonDecimal|null;
		/**časové rozlišené*/
		c_dotace_odp?: JsonDecimal|null;
		/**rozpuštěný transfer*/
		c_dotace_opr?: JsonDecimal|null;
		/**opravná položka*/
		c_opr_pol?: JsonDecimal|null;
		/**celkový rozpuštěný transfer - POČÍTANÝ sloupec*/
		c_dotace_opr_all?: JsonDecimal|null;
		/**nerozpuštěný transfer - POČÍTANÝ sloupec*/
		c_dotace_rest?: JsonDecimal|null;
		/**rok odpisu*/
		rokobd_odp?: number|null;
		/**měsíc odpisu*/
		mesobd_odp?: number|null;
		/**období - POČÍTANÝ sloupec*/
		obd_odp?: string|null;
		/**typ maj. karty*/
		tka?: number|null;
		/**typ maj. souboru*/
		typ_soubor?: number|null;
	}
	const enum GMajTransferCasDtoNames { ser_cislo_odp = "ser_cislo_odp", ixp = "ixp", ser_cislo = "ser_cislo", ser_hst_odp = "ser_hst_odp", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ixs_esu_txt = "ixs_esu_txt", typ_esu = "typ_esu", c_dotace = "c_dotace", c_dotace_odp = "c_dotace_odp", c_dotace_opr = "c_dotace_opr", c_opr_pol = "c_opr_pol", c_dotace_opr_all = "c_dotace_opr_all", c_dotace_rest = "c_dotace_rest", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", obd_odp = "obd_odp", tka = "tka", typ_soubor = "typ_soubor",}
	const enum GMajTransferCasDtoFragments { ser_cislo_odp = "*", ixp = "*", ser_cislo = "*", ser_hst_odp = "*", ixs_esu = "*", ico_esu = "*", ixs_esu_txt = "*", typ_esu = "*", c_dotace = "*", c_dotace_odp = "*", c_dotace_opr = "*", c_opr_pol = "*", c_dotace_opr_all = "*", c_dotace_rest = "*", rokobd_odp = "*", mesobd_odp = "*", obd_odp = "*", tka = "*", typ_soubor = "*",}
	const enum GMajTransferCasDtoTypes { ser_cislo_odp = "number", ixp = "string", ser_cislo = "number", ser_hst_odp = "number", ixs_esu = "string", ico_esu = "string", ixs_esu_txt = "string", typ_esu = "number", c_dotace = "JsonDecimal", c_dotace_odp = "JsonDecimal", c_dotace_opr = "JsonDecimal", c_opr_pol = "JsonDecimal", c_dotace_opr_all = "JsonDecimal", c_dotace_rest = "JsonDecimal", rokobd_odp = "number", mesobd_odp = "number", obd_odp = "string", tka = "number", typ_soubor = "number",}
	const enum GMajTransferCasDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajUctKontoDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_UctKonto } účetní věta pro nedokončený majetek*/
	interface GMajUctKontoDto {
		uea?: string|null;
		ueb?: string|null;
		uec?: string|null;
		ued?: string|null;
		uee?: string|null;
		uef?: string|null;
		ueg?: string|null;
		ueh?: string|null;
		uei?: string|null;
		uej?: string|null;
		te0?: string|null;
		te1?: string|null;
		te2?: string|null;
		te3?: string|null;
		te4?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
	}
	const enum GMajUctKontoDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GMajUctKontoDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GMajUctKontoDtoTypes { uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GMajUctKontoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajvdroDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majvdro*/
	interface GMajvdroDto {
		/**DBCOLUMN:majvdro.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:majvdro.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:majvdro.uea_evi*/
		uea_evi?: string|null;
		/**DBCOLUMN:majvdro.uea_por*/
		uea_por?: string|null;
		/**DBCOLUMN:majvdro.uea_opr*/
		uea_opr?: string|null;
		/**DBCOLUMN:majvdro.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:majvdro.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majvdro.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majvdro.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majvdro.uea_opp*/
		uea_opp?: string|null;
		/**aktivita txt*/
		aktivita_txt?: string|null;
	}
	const enum GMajvdroDtoNames { drh_id = "drh_id", rok_od = "rok_od", uea_evi = "uea_evi", uea_por = "uea_por", uea_opr = "uea_opr", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea_opp = "uea_opp", aktivita_txt = "aktivita_txt",}
	const enum GMajvdroDtoFragments { drh_id = "*", rok_od = "*", uea_evi = "*", uea_por = "*", uea_opr = "*", rok_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uea_opp = "*", aktivita_txt = "*",}
	const enum GMajvdroDtoTypes { drh_id = "number", rok_od = "number", uea_evi = "string", uea_por = "string", uea_opr = "string", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea_opp = "string", aktivita_txt = "string",}
	const enum GMajvdroDtoTypeLengths { uea_evi = 3, uea_por = 3, uea_opr = 3, zmenu_prov = 12, uea_opp = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GMajvvueDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majvvue*/
	interface GMajvvueDto {
		/**DBCOLUMN:majvvue.ico*/
		ico?: string|null;
		/**DBCOLUMN:majvvue.rok*/
		rok?: number|null;
		/**DBCOLUMN:majvvue.ixs_vue*/
		ixs_vue?: string|null;
		/**DBCOLUMN:majvvue.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:majvvue.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majvvue.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMajvvueDtoNames { ico = "ico", rok = "rok", ixs_vue = "ixs_vue", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMajvvueDtoFragments { ico = "*", rok = "*", ixs_vue = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMajvvueDtoTypes { ico = "string", rok = "number", ixs_vue = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMajvvueDtoTypeLengths { ico = 10, ixs_vue = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GOdpisStartDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO dialogu pro spuštění odpisu*/
	interface GOdpisStartDto {
		druh_odp?: number|null;
		dev?: number|null;
		typ_dok?: number|null;
		ico?: string|null;
		/**datum UÚP*/
		dat_uup?: JsonDate|null;
		/**datum odpisu - datum zdanitelného plnění*/
		dat_zdan?: JsonDate|null;
		kod_poh?: number|null;
		zpusob?: number|null;
		plan_do?: number|null;
		vice_mesicu?: boolean|null;
		/**kód intervalu ODP (10 - měsíční, 20 - čtvrtletní, 30 - roční)*/
		interval_odp?: number|null;
		/**datum posledního odpisu dlouhodobého majetku*/
		dat_uup_odp?: JsonDate|null;
		/**ID pohybu*/
		id_poh?: string|null;
		/**Kniha*/
		ixp_den?: string|null;
		/**Subřada*/
		subrada?: number|null;
		/**LogPorCislo - kvuli asynchronním úlohám*/
		logPorCislo?: number|null;
	}
	const enum GOdpisStartDtoNames { druh_odp = "druh_odp", dev = "dev", typ_dok = "typ_dok", ico = "ico", dat_uup = "dat_uup", dat_zdan = "dat_zdan", kod_poh = "kod_poh", zpusob = "zpusob", plan_do = "plan_do", vice_mesicu = "vice_mesicu", interval_odp = "interval_odp", dat_uup_odp = "dat_uup_odp", id_poh = "id_poh", ixp_den = "ixp_den", subrada = "subrada", logPorCislo = "logPorCislo",}
	const enum GOdpisStartDtoFragments { druh_odp = "*", dev = "*", typ_dok = "*", ico = "*", dat_uup = "*", dat_zdan = "*", kod_poh = "*", zpusob = "*", plan_do = "*", vice_mesicu = "*", interval_odp = "*", dat_uup_odp = "*", id_poh = "*", ixp_den = "*", subrada = "*", logPorCislo = "*",}
	const enum GOdpisStartDtoTypes { druh_odp = "number", dev = "number", typ_dok = "number", ico = "string", dat_uup = "JsonDate", dat_zdan = "JsonDate", kod_poh = "number", zpusob = "number", plan_do = "number", vice_mesicu = "boolean", interval_odp = "number", dat_uup_odp = "JsonDate", id_poh = "string", ixp_den = "string", subrada = "number", logPorCislo = "number",}
	const enum GOdpisStartDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GOdpMaxDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ dlg_MakeOdpis.tbl_OdpMax } DTO přípustných DEV pro odpis majetku*/
	interface GOdpMaxDto {
		/**ID druhu evidence majetku*/
		dev?: number|null;
		/**druh evidence majetku*/
		dev_txt?: string|null;
		/**druh evidence majetku - zkratka*/
		dev_zkr?: string|null;
		/**počet karet*/
		count?: number|null;
		/**období odpisu - rok*/
		rokobd_odp?: number|null;
		/**období odpisu - měsíc*/
		mesobd_odp?: number|null;
		/**vyskládaný text posledních odpisu (MES/ROK)*/
		obd_odp?: string|null;
		/**období posledního ostrého odpisu - rok*/
		rokobd_odp_last?: number|null;
		/**období posledního ostrého odpisu - měsíc*/
		mesobd_odp_last?: number|null;
	}
	const enum GOdpMaxDtoNames { dev = "dev", dev_txt = "dev_txt", dev_zkr = "dev_zkr", count = "count", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", obd_odp = "obd_odp", rokobd_odp_last = "rokobd_odp_last", mesobd_odp_last = "mesobd_odp_last",}
	const enum GOdpMaxDtoFragments { dev = "*", dev_txt = "*", dev_zkr = "*", count = "*", rokobd_odp = "*", mesobd_odp = "*", obd_odp = "*", rokobd_odp_last = "*", mesobd_odp_last = "*",}
	const enum GOdpMaxDtoTypes { dev = "number", dev_txt = "string", dev_zkr = "string", count = "number", rokobd_odp = "number", mesobd_odp = "number", obd_odp = "string", rokobd_odp_last = "number", mesobd_odp_last = "number",}
	const enum GOdpMaxDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GOdpRecDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ cfc_OdpRec }  Rekord odpisových údajů karty*/
	interface GOdpRecDto {
		/**vstupní cena odpisu*/
		c_vstup?: JsonDecimal|null;
		/**zbytková hodnota*/
		c_zbytek?: JsonDecimal|null;
		/**oprávka odpisu*/
		c_opr?: JsonDecimal|null;
		/**Zůstatková cena*/
		c_zust?: JsonDecimal|null;
		/**odpis v aktuálním roce*/
		c_rok_odp?: JsonDecimal|null;
		/**poslední odpis*/
		c_last_odp?: JsonDecimal|null;
		/**Období odpisu (rok)*/
		rokobd_odp?: number|null;
		/**Období odpisu (měsíc)*/
		mesobd_odp?: number|null;
		/**typ odpisu*/
		typ_odp?: number|null;
		/**typ odpisu - jemnější členění PK*/
		rok_start_typ?: number|null;
		/**rok počátku odpisu*/
		rok_start_odp?: number|null;
		/**rok odpisování*/
		rok_odpisov?: number|null;
		/**rok technického zhodnocení*/
		rok_zvys_vc?: number|null;
		/**rok odpisování po technickém zhodnocení*/
		rok_odpisov_zvc?: number|null;
		/**sazba odpisu*/
		c_sazba_odp?: JsonDecimal|null;
		/**pro speciální typy odpisu*/
		pocet_odp?: number|null;
		/**pro speciální typy odpisu*/
		presnost_odp?: number|null;
		/**příznak aktivace odpisových hodnot programem nebo uživ.*/
		aktivace?: number|null;
		/**příznak sazby nebo koef. (10=sazba. 20=koef)*/
		saz_koef?: number|null;
		/**příznak rozdílnosti vstupní ceny odpisu od pořizovací ceny*/
		vstup_b?: number|null;
		/**příznak pozastavení odpisu*/
		stop_odpis?: number|null;
		/**počet roků, kdy byl pozastaven odpisu*/
		stop_rok_odp?: number|null;
		/**počet roků odpisu ze zvýšené vstupní ceny, kdy byl pozastaven odpisu*/
		stop_rok_odp_zvc?: number|null;
		/**detail typu ODP*/
		TypOdpisu?: Gordic.Maj.Interface.GMajstodDto|null;
		/**odpisová skupina majetku*/
		skupina_odp?: string|null;
		skp?: string|null;
		/**odkaz na položku odpisu v EKOVKZO*/
		polozka_odp?: number|null;
		/**počet již realizovaných odpisů dnm*/
		pocet_odp_real?: number|null;
		/**vstupní hodnota odpisu pro algoritmus DLinDNM*/
		c_vstup_dnm?: JsonDecimal|null;
		/**doba používání majetku*/
		doba_uziti?: number|null;
		/**příznak individuálního nastavení doby používání majetku*/
		doba_uziti_ind?: number|null;
		/**hodnota pro měsíc (doba ind.používání)*/
		doba_uziti_ind_m?: number|null;
		/**ukazatel do definice účetní skupiny závislé na klasifikaci (EKOVKZO)*/
		rok_skp_od?: number|null;
		/**měrná jednotka výkonového odpisu*/
		mj?: string|null;
		/**částka odpisu související s měřitelnou jednotkou*/
		c_odp_mj?: JsonDecimal|null;
		/**předpokládaný počet užití celkem*/
		pc_poc_uzi_mj?: number|null;
		/**předpokládaný počet užití za jeden rok (kvůli plánu odpisu)*/
		py_poc_uzi_mj?: number|null;
		/**skutečný počet užití celkem*/
		rc_poc_uzi_mj?: number|null;
		/**skutečný počet užití celkem za období odpisu*/
		ro_poc_uzi_mj?: number|null;
		/**částka aktuální hodnoty poměrné částky odpisu vůči dotaci*/
		c_dotace_odp?: JsonDecimal|null;
		/**částka celkové oprávky poměrné částky odpisu vůči dotaci*/
		c_dotace_opr?: JsonDecimal|null;
		/**procentuální část pořizovací ceny pro stanovení zbytkové hodnoty*/
		c_zbytek_proc?: JsonDecimal|null;
		/**příznak stanovení oprávky ve výši 40% ocenění – ČÚS 708 7.1.4*/
		oc_714_b?: number|null;
		/**příznak stanovení oprávky dle prilohy 4 – ČÚS 708 7.1.5*/
		oc_715_b?: number|null;
		/**zbývající doba používání majetku*/
		DobaUzitiZbyv?: number|null;
		/**sub-podmínka masky, zda došlo v daném období k TZH*/
		TzhAktObd?: number|null;
		c_vstup_v?: JsonDecimal|null;
		c_zust_v?: JsonDecimal|null;
		c_zbytek_v?: JsonDecimal|null;
		c_dotace_v?: JsonDecimal|null;
		c_dotace_zust_v?: JsonDecimal|null;
		c_dotace_zbytek_v?: JsonDecimal|null;
		/**FILTR - počet měsíců, za které byl odepsán majetek (spojením vznikne pocet_odp_real_u)*/
		odp_real_m?: number|null;
		/**FILTR - počet let, za které byl odepsán majetek (spojením vznikne pocet_odp_real_u)*/
		odp_real_r?: number|null;
		/**FILTR - Nerozpuštěný transfer (rozdíl maj.c_dotace - odp.c_dotace_opr_u )*/
		c_dotace_rzd?: JsonDecimal|null;
		/**pořizovací cena majetku*/
		C?: JsonDecimal|null;
		/**stav majetku*/
		MatAkt?: number|null;
		/**počátek platnosti klasifikace*/
		RokOd?: number|null;
		/**datum zařazení karty do užívání*/
		DatZar?: JsonDate|null;
		/**datum aktuálního odepisování*/
		DatUup?: JsonDate|null;
		/**filtr pro omezení výběru typu odpisu*/
		Filtr?: string|null;
		CDotace?: JsonDecimal|null;
		CPoriz?: JsonDecimal|null;
		/**opravná položka poskytovatele transferu*/
		CDotaceOprPol?: JsonDecimal|null;
		/**počet ostrých odpisů v MAJ*/
		PocetOdpMaj?: number|null;
	}
	const enum GOdpRecDtoNames { c_vstup = "c_vstup", c_zbytek = "c_zbytek", c_opr = "c_opr", c_zust = "c_zust", c_rok_odp = "c_rok_odp", c_last_odp = "c_last_odp", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", typ_odp = "typ_odp", rok_start_typ = "rok_start_typ", rok_start_odp = "rok_start_odp", rok_odpisov = "rok_odpisov", rok_zvys_vc = "rok_zvys_vc", rok_odpisov_zvc = "rok_odpisov_zvc", c_sazba_odp = "c_sazba_odp", pocet_odp = "pocet_odp", presnost_odp = "presnost_odp", aktivace = "aktivace", saz_koef = "saz_koef", vstup_b = "vstup_b", stop_odpis = "stop_odpis", stop_rok_odp = "stop_rok_odp", stop_rok_odp_zvc = "stop_rok_odp_zvc", TypOdpisu = "TypOdpisu", skupina_odp = "skupina_odp", skp = "skp", polozka_odp = "polozka_odp", pocet_odp_real = "pocet_odp_real", c_vstup_dnm = "c_vstup_dnm", doba_uziti = "doba_uziti", doba_uziti_ind = "doba_uziti_ind", doba_uziti_ind_m = "doba_uziti_ind_m", rok_skp_od = "rok_skp_od", mj = "mj", c_odp_mj = "c_odp_mj", pc_poc_uzi_mj = "pc_poc_uzi_mj", py_poc_uzi_mj = "py_poc_uzi_mj", rc_poc_uzi_mj = "rc_poc_uzi_mj", ro_poc_uzi_mj = "ro_poc_uzi_mj", c_dotace_odp = "c_dotace_odp", c_dotace_opr = "c_dotace_opr", c_zbytek_proc = "c_zbytek_proc", oc_714_b = "oc_714_b", oc_715_b = "oc_715_b", DobaUzitiZbyv = "DobaUzitiZbyv", TzhAktObd = "TzhAktObd", c_vstup_v = "c_vstup_v", c_zust_v = "c_zust_v", c_zbytek_v = "c_zbytek_v", c_dotace_v = "c_dotace_v", c_dotace_zust_v = "c_dotace_zust_v", c_dotace_zbytek_v = "c_dotace_zbytek_v", odp_real_m = "odp_real_m", odp_real_r = "odp_real_r", c_dotace_rzd = "c_dotace_rzd", C = "C", MatAkt = "MatAkt", RokOd = "RokOd", DatZar = "DatZar", DatUup = "DatUup", Filtr = "Filtr", CDotace = "CDotace", CPoriz = "CPoriz", CDotaceOprPol = "CDotaceOprPol", PocetOdpMaj = "PocetOdpMaj",}
	const enum GOdpRecDtoFragments { c_vstup = "*", c_zbytek = "*", c_opr = "*", c_zust = "*", c_rok_odp = "*", c_last_odp = "*", rokobd_odp = "*", mesobd_odp = "*", typ_odp = "*", rok_start_typ = "*", rok_start_odp = "*", rok_odpisov = "*", rok_zvys_vc = "*", rok_odpisov_zvc = "*", c_sazba_odp = "*", pocet_odp = "*", presnost_odp = "*", aktivace = "*", saz_koef = "*", vstup_b = "*", stop_odpis = "*", stop_rok_odp = "*", stop_rok_odp_zvc = "*", TypOdpisu = "*", skupina_odp = "*", skp = "*", polozka_odp = "*", pocet_odp_real = "*", c_vstup_dnm = "*", doba_uziti = "*", doba_uziti_ind = "*", doba_uziti_ind_m = "*", rok_skp_od = "*", mj = "*", c_odp_mj = "*", pc_poc_uzi_mj = "*", py_poc_uzi_mj = "*", rc_poc_uzi_mj = "*", ro_poc_uzi_mj = "*", c_dotace_odp = "*", c_dotace_opr = "*", c_zbytek_proc = "*", oc_714_b = "*", oc_715_b = "*", DobaUzitiZbyv = "*", TzhAktObd = "*", c_vstup_v = "*", c_zust_v = "*", c_zbytek_v = "*", c_dotace_v = "*", c_dotace_zust_v = "*", c_dotace_zbytek_v = "*", odp_real_m = "*", odp_real_r = "*", c_dotace_rzd = "*", C = "*", MatAkt = "*", RokOd = "*", DatZar = "*", DatUup = "*", Filtr = "*", CDotace = "*", CPoriz = "*", CDotaceOprPol = "*", PocetOdpMaj = "*",}
	const enum GOdpRecDtoTypes { c_vstup = "JsonDecimal", c_zbytek = "JsonDecimal", c_opr = "JsonDecimal", c_zust = "JsonDecimal", c_rok_odp = "JsonDecimal", c_last_odp = "JsonDecimal", rokobd_odp = "number", mesobd_odp = "number", typ_odp = "number", rok_start_typ = "number", rok_start_odp = "number", rok_odpisov = "number", rok_zvys_vc = "number", rok_odpisov_zvc = "number", c_sazba_odp = "JsonDecimal", pocet_odp = "number", presnost_odp = "number", aktivace = "number", saz_koef = "number", vstup_b = "number", stop_odpis = "number", stop_rok_odp = "number", stop_rok_odp_zvc = "number", TypOdpisu = "Gordic.Maj.Interface.GMajstodDto", skupina_odp = "string", skp = "string", polozka_odp = "number", pocet_odp_real = "number", c_vstup_dnm = "JsonDecimal", doba_uziti = "number", doba_uziti_ind = "number", doba_uziti_ind_m = "number", rok_skp_od = "number", mj = "string", c_odp_mj = "JsonDecimal", pc_poc_uzi_mj = "number", py_poc_uzi_mj = "number", rc_poc_uzi_mj = "number", ro_poc_uzi_mj = "number", c_dotace_odp = "JsonDecimal", c_dotace_opr = "JsonDecimal", c_zbytek_proc = "JsonDecimal", oc_714_b = "number", oc_715_b = "number", DobaUzitiZbyv = "number", TzhAktObd = "number", c_vstup_v = "JsonDecimal", c_zust_v = "JsonDecimal", c_zbytek_v = "JsonDecimal", c_dotace_v = "JsonDecimal", c_dotace_zust_v = "JsonDecimal", c_dotace_zbytek_v = "JsonDecimal", odp_real_m = "number", odp_real_r = "number", c_dotace_rzd = "JsonDecimal", C = "JsonDecimal", MatAkt = "number", RokOd = "number", DatZar = "JsonDate", DatUup = "JsonDate", Filtr = "string", CDotace = "JsonDecimal", CPoriz = "JsonDecimal", CDotaceOprPol = "JsonDecimal", PocetOdpMaj = "number",}
	const enum GOdpRecDtoTypeLengths { skupina_odp = 4, skp = 15, mj = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GPolozkyMajDokladuDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:Seznam*/
	interface GPolozkyMajDokladuDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.kod_poh*/
		kod_poh?: number|null;
		/**DBCOLUMN:Seznam.typ_dok*/
		typ_dok?: number|null;
		/**DBCOLUMN:Seznam.dev*/
		dev?: number|null;
		/**DBCOLUMN:Seznam.dev*/
		dev_zkr?: string|null;
		/**DBCOLUMN:Seznam.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:Seznam.skupina_zkr*/
		skupina_zkr?: string|null;
		/**DBCOLUMN:Seznam.por_poh*/
		por_poh?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_poh*/
		typ_poh?: number|null;
		/**DBCOLUMN:Seznam.druh_poh*/
		druh_poh?: number|null;
		/**DBCOLUMN:Seznam.dat_poh*/
		dat_poh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uct*/
		dat_uct?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.tka*/
		tka?: number|null;
		/**DBCOLUMN:Seznam.mp_stav*/
		mp_stav?: number|null;
		/**DBCOLUMN:Seznam.mp_stav_zkr*/
		mp_stav_zkr?: string|null;
		/**DBCOLUMN:Seznam.st_stav*/
		st_stav?: number|null;
		/**DBCOLUMN:Seznam.status_com*/
		status_com?: number|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cmj*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.skp*/
		skp?: string|null;
		/**DBCOLUMN:Seznam.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:Seznam.drh_zkr*/
		drh_zkr?: string|null;
		/**DBCOLUMN:Seznam.ueab_por*/
		ueab_por?: string|null;
		/**DBCOLUMN:Seznam.ueab_opr*/
		ueab_opr?: string|null;
		/**DBCOLUMN:Seznam.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:Seznam.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:Seznam.trida*/
		trida?: string|null;
		/**DBCOLUMN:Seznam.ser_hst_maj*/
		ser_hst_maj?: number|null;
		/**DBCOLUMN:Seznam.ser_hst_odp*/
		ser_hst_odp?: number|null;
		/**DBCOLUMN:Seznam.typ_soubor*/
		typ_soubor?: number|null;
		/**DBCOLUMN:Seznam.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_maj_nad*/
		ixs_maj_nad?: string|null;
		/**DBCOLUMN:Seznam.oper_cislo*/
		oper_cislo?: number|null;
		/**DBCOLUMN:Seznam.inv_cis_soubor*/
		inv_cis_soubor?: string|null;
		/**DBCOLUMN:Seznam.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:Seznam.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.akce*/
		akce?: string|null;
		/**DBCOLUMN:Seznam.c_pri*/
		c_pri?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.skupina_id_cil*/
		skupina_id_cil?: number|null;
		/**DBCOLUMN:Seznam.skupina_zkr_cil*/
		skupina_zkr_cil?: string|null;
		/**DBCOLUMN:Seznam.c_dph_odpocet*/
		c_dph_odpocet?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dotace*/
		c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ser_cislo_tzh*/
		ser_cislo_tzh?: number|null;
		/**DBCOLUMN:Seznam.naklad_p1*/
		naklad_p1?: string|null;
		/**DBCOLUMN:Seznam.naklad_p1*/
		naklad_p2?: string|null;
		/**DBCOLUMN:Seznam.naklad_p1*/
		naklad_p3?: string|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m_kurz*/
		m_kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		b_priz_tzh?: number|null;
		/**DBCOLUMN:Seznam.ser_cis*/
		ser_cis?: string|null;
		/**DBCOLUMN:Seznam.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev_maj*/
		nazev_maj?: string|null;
		/**DBCOLUMN:Seznam.dat_zar*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:Seznam.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:Seznam.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:Seznam.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj_nazev*/
		ixs_orj_nazev?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_nazev*/
		ixs_ref_nazev?: string|null;
		/**DBCOLUMN:Seznam.priz_odp*/
		priz_odp?: number|null;
		/**DBCOLUMN:Seznam.sarze*/
		sarze?: string|null;
		/**DBCOLUMN:Seznam.segment_kod*/
		segment_kod?: string|null;
		/**DBCOLUMN:Seznam.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:Seznam.id_krt_dev*/
		id_krt_dev?: string|null;
		/**DBCOLUMN:Seznam.pmj*/
		pmj_krt?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_akt*/
		c_krt?: JsonDecimal|null;
	}
	const enum GPolozkyMajDokladuDtoNames { ixp = "ixp", ser_cislo = "ser_cislo", kod_poh = "kod_poh", typ_dok = "typ_dok", dev = "dev", dev_zkr = "dev_zkr", skupina_id = "skupina_id", skupina_zkr = "skupina_zkr", por_poh = "por_poh", lic = "lic", ac = "ac", ixs_maj = "ixs_maj", inv_cis = "inv_cis", nazev = "nazev", typ_poh = "typ_poh", druh_poh = "druh_poh", dat_poh = "dat_poh", dat_uct = "dat_uct", ico = "ico", ucs = "ucs", nks = "nks", tka = "tka", mp_stav = "mp_stav", mp_stav_zkr = "mp_stav_zkr", st_stav = "st_stav", status_com = "status_com", mj = "mj", m = "m", c = "c", cmj = "cmj", skp = "skp", drh_id = "drh_id", drh_zkr = "drh_zkr", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", skupina_odp = "skupina_odp", trida = "trida", ser_hst_maj = "ser_hst_maj", ser_hst_odp = "ser_hst_odp", typ_soubor = "typ_soubor", c_dph = "c_dph", c_c_dph = "c_c_dph", ixs_maj_nad = "ixs_maj_nad", oper_cislo = "oper_cislo", inv_cis_soubor = "inv_cis_soubor", vyr_cis = "vyr_cis", mat_cis = "mat_cis", popis = "popis", akce = "akce", c_pri = "c_pri", skupina_id_cil = "skupina_id_cil", skupina_zkr_cil = "skupina_zkr_cil", c_dph_odpocet = "c_dph_odpocet", c_dotace = "c_dotace", ser_cislo_tzh = "ser_cislo_tzh", naklad_p1 = "naklad_p1", naklad_p2 = "naklad_p2", naklad_p3 = "naklad_p3", mena = "mena", kurz = "kurz", m_kurz = "m_kurz", c_mena = "c_mena", b_priz_tzh = "b_priz_tzh", ser_cis = "ser_cis", evi_cis = "evi_cis", nazev_maj = "nazev_maj", dat_zar = "dat_zar", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_orj_nazev = "ixs_orj_nazev", ixs_ref = "ixs_ref", ixs_ref_nazev = "ixs_ref_nazev", priz_odp = "priz_odp", sarze = "sarze", segment_kod = "segment_kod", objekt = "objekt", id_krt_dev = "id_krt_dev", pmj_krt = "pmj_krt", c_krt = "c_krt",}
	const enum GPolozkyMajDokladuDtoFragments { ixp = "*", ser_cislo = "*", kod_poh = "*", typ_dok = "*", dev = "*", dev_zkr = "*", skupina_id = "*", skupina_zkr = "*", por_poh = "*", lic = "*", ac = "*", ixs_maj = "*", inv_cis = "*", nazev = "*", typ_poh = "*", druh_poh = "*", dat_poh = "*", dat_uct = "*", ico = "*", ucs = "*", nks = "*", tka = "*", mp_stav = "*", mp_stav_zkr = "*", st_stav = "*", status_com = "*", mj = "*", m = "*", c = "*", cmj = "*", skp = "*", drh_id = "*", drh_zkr = "*", ueab_por = "*", ueab_opr = "*", ueab_evi = "*", skupina_odp = "*", trida = "*", ser_hst_maj = "*", ser_hst_odp = "*", typ_soubor = "*", c_dph = "*", c_c_dph = "*", ixs_maj_nad = "*", oper_cislo = "*", inv_cis_soubor = "*", vyr_cis = "*", mat_cis = "*", popis = "*", akce = "*", c_pri = "*", skupina_id_cil = "*", skupina_zkr_cil = "*", c_dph_odpocet = "*", c_dotace = "*", ser_cislo_tzh = "*", naklad_p1 = "*", naklad_p2 = "*", naklad_p3 = "*", mena = "*", kurz = "*", m_kurz = "*", c_mena = "*", b_priz_tzh = "*", ser_cis = "*", evi_cis = "*", nazev_maj = "*", dat_zar = "*", stredisko = "*", budova_kod = "*", mistnost_kod = "*", ixs_orj = "*", ixs_orj_nazev = "*", ixs_ref = "*", ixs_ref_nazev = "*", priz_odp = "*", sarze = "*", segment_kod = "*", objekt = "*", id_krt_dev = "*", pmj_krt = "*", c_krt = "*",}
	const enum GPolozkyMajDokladuDtoTypes { ixp = "string", ser_cislo = "number", kod_poh = "number", typ_dok = "number", dev = "number", dev_zkr = "string", skupina_id = "number", skupina_zkr = "string", por_poh = "number", lic = "string", ac = "string", ixs_maj = "string", inv_cis = "string", nazev = "string", typ_poh = "number", druh_poh = "number", dat_poh = "JsonDate", dat_uct = "string", ico = "string", ucs = "string", nks = "string", tka = "number", mp_stav = "number", mp_stav_zkr = "string", st_stav = "number", status_com = "number", mj = "string", m = "JsonDecimal", c = "JsonDecimal", cmj = "JsonDecimal", skp = "string", drh_id = "number", drh_zkr = "string", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", skupina_odp = "string", trida = "string", ser_hst_maj = "number", ser_hst_odp = "number", typ_soubor = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", ixs_maj_nad = "string", oper_cislo = "number", inv_cis_soubor = "string", vyr_cis = "string", mat_cis = "string", popis = "string", akce = "string", c_pri = "JsonDecimal", skupina_id_cil = "number", skupina_zkr_cil = "string", c_dph_odpocet = "JsonDecimal", c_dotace = "JsonDecimal", ser_cislo_tzh = "number", naklad_p1 = "string", naklad_p2 = "string", naklad_p3 = "string", mena = "number", kurz = "JsonDecimal", m_kurz = "JsonDecimal", c_mena = "JsonDecimal", b_priz_tzh = "number", ser_cis = "string", evi_cis = "string", nazev_maj = "string", dat_zar = "JsonDate", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_orj_nazev = "string", ixs_ref = "string", ixs_ref_nazev = "string", priz_odp = "number", sarze = "string", segment_kod = "string", objekt = "string", id_krt_dev = "string", pmj_krt = "JsonDecimal", c_krt = "JsonDecimal",}
	const enum GPolozkyMajDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GPrimDokladyDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GPrimDokladyDto {
		/**PID primárního dokladu*/
		ixp?: string|null;
		/**agenda*/
		agenda?: string|null;
		/**agendové číslo primárního dokladu*/
		ac_ag?: string|null;
		/**popis*/
		popis?: string|null;
		/**Elektronický soubor/obsah*/
		ixb?: string|null;
		/**soubor z tabulky wflsixb*/
		soubor?: string|null;
		/**popis z tabulky wflsixb*/
		popisWfl?: string|null;
		/**velikost z tabulky wflsixb*/
		velikost?: JsonDecimal|null;
	}
	const enum GPrimDokladyDtoNames { ixp = "ixp", agenda = "agenda", ac_ag = "ac_ag", popis = "popis", ixb = "ixb", soubor = "soubor", popisWfl = "popisWfl", velikost = "velikost",}
	const enum GPrimDokladyDtoFragments { ixp = "Base", agenda = "Base", ac_ag = "Base", popis = "Base", ixb = "Base", soubor = "Base", popisWfl = "Base", velikost = "Base",}
	const enum GPrimDokladyDtoTypes { ixp = "string", agenda = "string", ac_ag = "string", popis = "string", ixb = "string", soubor = "string", popisWfl = "string", velikost = "JsonDecimal",}
	const enum GPrimDokladyDtoTypeLengths { ixp = 12, ixb = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GProdejniPrirazkyDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GProdejniPrirazkyDto {
		ixp?: string|null;
		ico?: string|null;
		prirazka?: string|null;
		nazev?: string|null;
		c?: JsonDecimal|null;
		ktg_pri?: number|null;
		ktg_pri_zkr?: string|null;
		typ_vyp_pri?: number|null;
		typ_vyp_pri_zkr?: string|null;
		dph_pri?: number|null;
		dph_pri_zkr?: string|null;
		aktivita?: number|null;
		aktivita_txt?: string|null;
		dan_typ?: number|null;
		dan_typ_txt?: string|null;
		/**COUNT*/
		pouzito?: number|null;
	}
	const enum GProdejniPrirazkyDtoNames { ixp = "ixp", ico = "ico", prirazka = "prirazka", nazev = "nazev", c = "c", ktg_pri = "ktg_pri", ktg_pri_zkr = "ktg_pri_zkr", typ_vyp_pri = "typ_vyp_pri", typ_vyp_pri_zkr = "typ_vyp_pri_zkr", dph_pri = "dph_pri", dph_pri_zkr = "dph_pri_zkr", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dan_typ = "dan_typ", dan_typ_txt = "dan_typ_txt", pouzito = "pouzito",}
	const enum GProdejniPrirazkyDtoFragments { ixp = "*", ico = "*", prirazka = "*", nazev = "*", c = "*", ktg_pri = "*", ktg_pri_zkr = "*", typ_vyp_pri = "*", typ_vyp_pri_zkr = "*", dph_pri = "*", dph_pri_zkr = "*", aktivita = "*", aktivita_txt = "*", dan_typ = "*", dan_typ_txt = "*", pouzito = "*",}
	const enum GProdejniPrirazkyDtoTypes { ixp = "string", ico = "string", prirazka = "string", nazev = "string", c = "JsonDecimal", ktg_pri = "number", ktg_pri_zkr = "string", typ_vyp_pri = "number", typ_vyp_pri_zkr = "string", dph_pri = "number", dph_pri_zkr = "string", aktivita = "number", aktivita_txt = "string", dan_typ = "number", dan_typ_txt = "string", pouzito = "number",}
	const enum GProdejniPrirazkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GProtokolOdpisuDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ ctbl_MajOdp }  Protokol odpisu*/
	interface GProtokolOdpisuDto {
		poradi?: number|null;
		/**vyskládaný text období*/
		obd_odp?: string|null;
		/**období odpisu - rok*/
		rokobd_odp?: number|null;
		/**období odpisu - měsíc*/
		mesobd_odp?: number|null;
		/**inventární číslo karty*/
		inv_cis?: string|null;
		/**kód druhu odpisu (VAS.MAJCDOD - 10 = účetní, 20 = daňový)*/
		druh_odp?: number|null;
		druh_odp_txt?: string|null;
		/**algoritmus odpisu (VAS.MAJCAOD)*/
		def_odp?: number|null;
		def_odp_txt?: string|null;
		/**kód intervalu odpisu*/
		interval_odp?: number|null;
		interval_odp_txt?: string|null;
		/**vstupní cena odpisu*/
		c_vstup?: JsonDecimal|null;
		/**pořizovací cena*/
		c_poriz?: JsonDecimal|null;
		/**sazba odpisu*/
		c_sazba?: JsonDecimal|null;
		pocet_odp?: number|null;
		/**sazba odpisu*/
		c_sazba_odp?: JsonDecimal|null;
		/**sazba či koeficient*/
		saz_koef?: number|null;
		/**typ sazby - sazba anebo koeficient*/
		saz_koef_txt?: string|null;
		/**doba používání majetku*/
		doba_uziti?: number|null;
		/**částka (posledního) odpisu*/
		c_last_odp?: JsonDecimal|null;
		/**odpis v aktuálním roce*/
		c_rok_odp?: JsonDecimal|null;
		c_rocni_odp?: JsonDecimal|null;
		/**oprávka odpisu*/
		c_opr?: JsonDecimal|null;
		/**Zůstatková cena*/
		c_zust?: JsonDecimal|null;
		/**zbytková hodnota*/
		c_zbytek?: JsonDecimal|null;
		/**časové rozlišení TRF - částka aktuální hodnoty poměrné částky odpisu vůči dotaci*/
		c_dotace_odp?: JsonDecimal|null;
		/**rozpuštěný TRF - částka celkové oprávky poměrné částky odpisu vůči dotaci*/
		c_dotace_opr?: JsonDecimal|null;
		/**opravná položka transferu*/
		c_opr_pol_dotace?: JsonDecimal|null;
		/**celkový rozpuštěný TRF*/
		c_dotace_opr_all?: JsonDecimal|null;
		/**NS/ES majetku*/
		id_top?: string|null;
		/**ID typu karty*/
		tka?: number|null;
		/**odkaz na ID souboru*/
		ixs_maj_nad?: string|null;
		/**ID typu souboru majetku (VAS.MAJCTMS)*/
		typ_soubor?: number|null;
	}
	const enum GProtokolOdpisuDtoNames { poradi = "poradi", obd_odp = "obd_odp", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", inv_cis = "inv_cis", druh_odp = "druh_odp", druh_odp_txt = "druh_odp_txt", def_odp = "def_odp", def_odp_txt = "def_odp_txt", interval_odp = "interval_odp", interval_odp_txt = "interval_odp_txt", c_vstup = "c_vstup", c_poriz = "c_poriz", c_sazba = "c_sazba", pocet_odp = "pocet_odp", c_sazba_odp = "c_sazba_odp", saz_koef = "saz_koef", saz_koef_txt = "saz_koef_txt", doba_uziti = "doba_uziti", c_last_odp = "c_last_odp", c_rok_odp = "c_rok_odp", c_rocni_odp = "c_rocni_odp", c_opr = "c_opr", c_zust = "c_zust", c_zbytek = "c_zbytek", c_dotace_odp = "c_dotace_odp", c_dotace_opr = "c_dotace_opr", c_opr_pol_dotace = "c_opr_pol_dotace", c_dotace_opr_all = "c_dotace_opr_all", id_top = "id_top", tka = "tka", ixs_maj_nad = "ixs_maj_nad", typ_soubor = "typ_soubor",}
	const enum GProtokolOdpisuDtoFragments { poradi = "*", obd_odp = "*", rokobd_odp = "*", mesobd_odp = "*", inv_cis = "*", druh_odp = "*", druh_odp_txt = "*", def_odp = "*", def_odp_txt = "*", interval_odp = "*", interval_odp_txt = "*", c_vstup = "*", c_poriz = "*", c_sazba = "*", pocet_odp = "*", c_sazba_odp = "*", saz_koef = "*", saz_koef_txt = "*", doba_uziti = "*", c_last_odp = "*", c_rok_odp = "*", c_rocni_odp = "*", c_opr = "*", c_zust = "*", c_zbytek = "*", c_dotace_odp = "*", c_dotace_opr = "*", c_opr_pol_dotace = "*", c_dotace_opr_all = "*", id_top = "*", tka = "*", ixs_maj_nad = "*", typ_soubor = "*",}
	const enum GProtokolOdpisuDtoTypes { poradi = "number", obd_odp = "string", rokobd_odp = "number", mesobd_odp = "number", inv_cis = "string", druh_odp = "number", druh_odp_txt = "string", def_odp = "number", def_odp_txt = "string", interval_odp = "number", interval_odp_txt = "string", c_vstup = "JsonDecimal", c_poriz = "JsonDecimal", c_sazba = "JsonDecimal", pocet_odp = "number", c_sazba_odp = "JsonDecimal", saz_koef = "number", saz_koef_txt = "string", doba_uziti = "number", c_last_odp = "JsonDecimal", c_rok_odp = "JsonDecimal", c_rocni_odp = "JsonDecimal", c_opr = "JsonDecimal", c_zust = "JsonDecimal", c_zbytek = "JsonDecimal", c_dotace_odp = "JsonDecimal", c_dotace_opr = "JsonDecimal", c_opr_pol_dotace = "JsonDecimal", c_dotace_opr_all = "JsonDecimal", id_top = "string", tka = "number", ixs_maj_nad = "string", typ_soubor = "number",}
	const enum GProtokolOdpisuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GProtokolOdpisuInputDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GProtokolOdpisuInputDto {
		/**Veškerý majetek*/
		veskeryMaj?: boolean|null;
		/**Pouze vlastní majetek*/
		pouzeVlastniNs?: boolean|null;
		/**Včetně prvků*/
		vcetnePrvku?: boolean|null;
		/**Kumulované*/
		kumulovane?: boolean|null;
		/**Období plánu*/
		obdobiPlanu?: number|null;
		/**režim contentu (mode_p) : 
		*     100 = historie odpisů ke kartě 
		*     200 = protokol o ostrém odpisu, 
		*     1,2,3 - okamžitý protokol (1 - zkušební odpis, 2 - plán odpisu, 3 - ostrý odpis)
		*/
		argRezim?: number|null;
		/**ID dočasného protokolu (zkušebního či plánu)*/
		argIkc?: JsonDecimal|null;
		/**ID druhu odpisu dle MAJCDOD*/
		argDruhOdp?: number|null;
		/**MM/RRRR - období odpisu (pro protokol)*/
		argObdobiOdp?: string|null;
		/**///  PID dokladu odpisu (pro protokol)	PID dokladu odpisu (pro protokol)*/
		ixpOdp?: string|null;
		/**Název contentu, který se zobrazí v záhlaví okna*/
		title?: string|null;
	}
	const enum GProtokolOdpisuInputDtoNames { veskeryMaj = "veskeryMaj", pouzeVlastniNs = "pouzeVlastniNs", vcetnePrvku = "vcetnePrvku", kumulovane = "kumulovane", obdobiPlanu = "obdobiPlanu", argRezim = "argRezim", argIkc = "argIkc", argDruhOdp = "argDruhOdp", argObdobiOdp = "argObdobiOdp", ixpOdp = "ixpOdp", title = "title",}
	const enum GProtokolOdpisuInputDtoFragments { veskeryMaj = "*", pouzeVlastniNs = "*", vcetnePrvku = "*", kumulovane = "*", obdobiPlanu = "*", argRezim = "*", argIkc = "*", argDruhOdp = "*", argObdobiOdp = "*", ixpOdp = "*", title = "*",}
	const enum GProtokolOdpisuInputDtoTypes { veskeryMaj = "boolean", pouzeVlastniNs = "boolean", vcetnePrvku = "boolean", kumulovane = "boolean", obdobiPlanu = "number", argRezim = "number", argIkc = "JsonDecimal", argDruhOdp = "number", argObdobiOdp = "string", ixpOdp = "string", title = "string",}
	const enum GProtokolOdpisuInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GProvedenyOdpisDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Záznam o provedení ostrého odpisu*/
	interface GProvedenyOdpisDto {
		/**umělý klíč*/
		poradi?: number|null;
		/**datum uskutečnění účetního případu*/
		dat_uup?: JsonDate|null;
		dat_zmena?: JsonDate|null;
		/**evidenční číslo v knize dokladů*/
		ac?: string|null;
		/**agendové číslo v knize dokladů*/
		ac_ag?: string|null;
		/**PID*/
		ixp?: string|null;
		/**ID stavu dokladu*/
		mp_stav?: number|null;
		/**popis stavu dokladu*/
		mp_stav_txt?: string|null;
		/**ID druhu evidence majetku*/
		dev?: number|null;
		/**období odpisu - rok*/
		rokobd_odp?: number|null;
		/**období odpisu - měsíc*/
		mesobd_odp?: number|null;
		/**období odpisu (MES/ROK)*/
		obdobi?: string|null;
		/**původce poslední změny záznamu - referent a funkce*/
		zmenu_prov?: string|null;
	}
	const enum GProvedenyOdpisDtoNames { poradi = "poradi", dat_uup = "dat_uup", dat_zmena = "dat_zmena", ac = "ac", ac_ag = "ac_ag", ixp = "ixp", mp_stav = "mp_stav", mp_stav_txt = "mp_stav_txt", dev = "dev", rokobd_odp = "rokobd_odp", mesobd_odp = "mesobd_odp", obdobi = "obdobi", zmenu_prov = "zmenu_prov",}
	const enum GProvedenyOdpisDtoFragments { poradi = "*", dat_uup = "*", dat_zmena = "*", ac = "*", ac_ag = "*", ixp = "*", mp_stav = "*", mp_stav_txt = "*", dev = "*", rokobd_odp = "*", mesobd_odp = "*", obdobi = "*", zmenu_prov = "*",}
	const enum GProvedenyOdpisDtoTypes { poradi = "number", dat_uup = "JsonDate", dat_zmena = "JsonDate", ac = "string", ac_ag = "string", ixp = "string", mp_stav = "number", mp_stav_txt = "string", dev = "number", rokobd_odp = "number", mesobd_odp = "number", obdobi = "string", zmenu_prov = "string",}
	const enum GProvedenyOdpisDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GSpCheckResultDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DTO pro návrat dat z kontroly odpisu*/
	interface GSpCheckResultDto {
		/**číslo chyby*/
		errCode?: number|null;
		/**něco pro uživatele*/
		userText?: string|null;
		/**typ dialogu od měkkého k netvrdšímu (0 = nic, 1 = OK ale upozornění, 2 = OK ale s potvrzením od uživatele, 3 = error )*/
		errLevel?: number|null;
	}
	const enum GSpCheckResultDtoNames { errCode = "errCode", userText = "userText", errLevel = "errLevel",}
	const enum GSpCheckResultDtoFragments { errCode = "*", userText = "*", errLevel = "*",}
	const enum GSpCheckResultDtoTypes { errCode = "number", userText = "string", errLevel = "number",}
	const enum GSpCheckResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GTopologieDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**{ dlg_MakeOdpis.tbl_OdpMax } DTO pro Umístění (topologii) majetku*/
	interface GTopologieDto {
		/**evidenční třída majetku, je-li tak členěn*/
		trida?: string|null;
		/**evidenční středisko organizace*/
		stredisko?: string|null;
		/**DBCOLUMN:Seznam.objekt*/
		objekt?: string|null;
		/**organizační jednotka*/
		ixs_orj?: string|null;
		/**kód budovy*/
		budova_kod?: string|null;
		/**kód segmentu budovy dle GINSSBU*/
		segment_kod?: string|null;
		/**kód místnosti*/
		mistnost_kod?: string|null;
		/**externí lokalizace majetku*/
		ext_1?: number|null;
		/**externí lokalizace majetku*/
		ext_2?: number|null;
		/**externí lokalizace majetku*/
		ext_3?: number|null;
		/**GPS souřadnice - zeměpisná šířka*/
		gps_sirka?: string|null;
		/**GPS souřadnice - zeměpisná délka*/
		gps_delka?: string|null;
	}
	const enum GTopologieDtoNames { trida = "trida", stredisko = "stredisko", objekt = "objekt", ixs_orj = "ixs_orj", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", ext_1 = "ext_1", ext_2 = "ext_2", ext_3 = "ext_3", gps_sirka = "gps_sirka", gps_delka = "gps_delka",}
	const enum GTopologieDtoFragments { trida = "*", stredisko = "*", objekt = "*", ixs_orj = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", ext_1 = "*", ext_2 = "*", ext_3 = "*", gps_sirka = "*", gps_delka = "*",}
	const enum GTopologieDtoTypes { trida = "string", stredisko = "string", objekt = "string", ixs_orj = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", ext_1 = "number", ext_2 = "number", ext_3 = "number", gps_sirka = "string", gps_delka = "string",}
	const enum GTopologieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GZkontrolujDanovyOdpisInputDto.d.ts 

declare namespace Gordic.Maj.Interface {
	interface GZkontrolujDanovyOdpisInputDto {
		/**Zda bude kontrolováno, zda byl proveden daňový odpis 1-ano, 0-ne*/
		dan_ignoruj?: number|null;
	}
	const enum GZkontrolujDanovyOdpisInputDtoNames { dan_ignoruj = "dan_ignoruj",}
	const enum GZkontrolujDanovyOdpisInputDtoFragments { dan_ignoruj = "*",}
	const enum GZkontrolujDanovyOdpisInputDtoTypes { dan_ignoruj = "number",}
	const enum GZkontrolujDanovyOdpisInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\GZkontrolujDanovyOdpisOutputDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Dto pro kontrolu daňového odpisu*/
	interface GZkontrolujDanovyOdpisOutputDto {
		/**Zda storovka dopadla bez chyby*/
		operationResult?: Gordic.Maj.Interface.DanOdpisOperationResult|null;
		/**Hláška ze storovky*/
		message?: string|null;
		/**Zda bylo kontrolováno, zda byl proveden daňový odpis 1-neignoruj, 0-ignoruj*/
		dan_ignoruj?: number|null;
	}
	const enum GZkontrolujDanovyOdpisOutputDtoNames { operationResult = "operationResult", message = "message", dan_ignoruj = "dan_ignoruj",}
	const enum GZkontrolujDanovyOdpisOutputDtoFragments { operationResult = "*", message = "*", dan_ignoruj = "*",}
	const enum GZkontrolujDanovyOdpisOutputDtoTypes { operationResult = "Gordic.Maj.Interface.DanOdpisOperationResult", message = "string", dan_ignoruj = "number",}
	const enum GZkontrolujDanovyOdpisOutputDtoTypeLengths {}
	const enum DanOdpisOperationResult {
		/**Kontrola dopadla bez chyby*/
		OK=0,
		/**Kontrola dopadla s chybou*/
		Error=1,
		/**Bude vyhozen dotaz*/
		Question=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderEkosdprDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:ekosdpr*/
	interface GReaderEkosdprDto {
		/**DBCOLUMN:ekosdpr.rez_dph -*/
		rez_dph?: number|null;
		/**DBCOLUMN:ekosdpr.rokmes_od -*/
		rokmes_od?: string|null;
		/**DBCOLUMN:ekosdpr.rokmes_do -*/
		rokmes_do?: string|null;
		/**DBCOLUMN:ekosdpr.zj -*/
		zj?: string|null;
		/**DBCOLUMN:ekosdpr.rez_dph_zkr -*/
		rez_dph_zkr?: string|null;
		/**DBCOLUMN:ekosdpr.rez_dph_txt -*/
		rez_dph_txt?: string|null;
		/**DBCOLUMN:ekosdpr.kod_ext -*/
		kod_ext?: number|null;
		/**DBCOLUMN:ekosdpr.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosdpr.dat_zmena - Změněno*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosdpr.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GReaderEkosdprDtoNames { rez_dph = "rez_dph", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", zj = "zj", rez_dph_zkr = "rez_dph_zkr", rez_dph_txt = "rez_dph_txt", kod_ext = "kod_ext", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderEkosdprDtoFragments { rez_dph = "*", rokmes_od = "*", rokmes_do = "*", zj = "*", rez_dph_zkr = "*", rez_dph_txt = "*", kod_ext = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GReaderEkosdprDtoTypes { rez_dph = "number", rokmes_od = "string", rokmes_do = "string", zj = "string", rez_dph_zkr = "string", rez_dph_txt = "string", kod_ext = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GReaderEkosdprDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zj = 20, rez_dph_zkr = 16, rez_dph_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcaodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcaod*/
	interface GReaderMajcaodDto {
		/**DBCOLUMN:majcaod.def_odp -*/
		def_odp?: number|null;
		/**DBCOLUMN:majcaod.zkratka - Zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:majcaod.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:majcaod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcaod.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:majcaod.dan_def -*/
		dan_def?: number|null;
	}
	const enum GReaderMajcaodDtoNames { def_odp = "def_odp", zkratka = "zkratka", nazev = "nazev", k_v = "k_v", aktivita = "aktivita", dan_def = "dan_def",}
	const enum GReaderMajcaodDtoFragments { def_odp = "*", zkratka = "*", nazev = "*", k_v = "*", aktivita = "*", dan_def = "*",}
	const enum GReaderMajcaodDtoTypes { def_odp = "number", zkratka = "string", nazev = "string", k_v = "number", aktivita = "number", dan_def = "number",}
	const enum GReaderMajcaodDtoTypeLengths { zkratka = 16, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajceodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majceod*/
	interface GReaderMajceodDto {
		/**DBCOLUMN:majceod.priz_odp - Povolení odpisu*/
		priz_odp?: number|null;
		/**DBCOLUMN:majceod.priz_odp_txt -*/
		priz_odp_txt?: string|null;
		/**DBCOLUMN:majceod.priz_odp_zkr -*/
		priz_odp_zkr?: string|null;
		/**DBCOLUMN:majceod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majceod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:majceod.k_xml - Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GReaderMajceodDtoNames { priz_odp = "priz_odp", priz_odp_txt = "priz_odp_txt", priz_odp_zkr = "priz_odp_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GReaderMajceodDtoFragments { priz_odp = "*", priz_odp_txt = "*", priz_odp_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GReaderMajceodDtoTypes { priz_odp = "number", priz_odp_txt = "string", priz_odp_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GReaderMajceodDtoTypeLengths { priz_odp_txt = 50, priz_odp_zkr = 16, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajciodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majciod*/
	interface GReaderMajciodDto {
		/**DBCOLUMN:majciod.interval_odp - Interval odpisu*/
		interval_odp?: number|null;
		/**DBCOLUMN:majciod.interval_odp_txt -*/
		interval_odp_txt?: string|null;
		/**DBCOLUMN:majciod.interval_odp_zkr -*/
		interval_odp_zkr?: string|null;
		/**DBCOLUMN:majciod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majciod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajciodDtoNames { interval_odp = "interval_odp", interval_odp_txt = "interval_odp_txt", interval_odp_zkr = "interval_odp_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajciodDtoFragments { interval_odp = "*", interval_odp_txt = "*", interval_odp_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajciodDtoTypes { interval_odp = "number", interval_odp_txt = "string", interval_odp_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajciodDtoTypeLengths { interval_odp_txt = 50, interval_odp_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcktpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcktp*/
	interface GReaderMajcktpDto {
		/**DBCOLUMN:majcktp.ktg_pri -*/
		ktg_pri?: number|null;
		/**DBCOLUMN:majcktp.ktg_pri_txt -*/
		ktg_pri_txt?: string|null;
		/**DBCOLUMN:majcktp.ktg_pri_zkr -*/
		ktg_pri_zkr?: string|null;
		/**DBCOLUMN:majcktp.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcktp.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcktpDtoNames { ktg_pri = "ktg_pri", ktg_pri_txt = "ktg_pri_txt", ktg_pri_zkr = "ktg_pri_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcktpDtoFragments { ktg_pri = "*", ktg_pri_txt = "*", ktg_pri_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcktpDtoTypes { ktg_pri = "number", ktg_pri_txt = "string", ktg_pri_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcktpDtoTypeLengths { ktg_pri_txt = 50, ktg_pri_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcosmDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcosm*/
	interface GReaderMajcosmDto {
		/**DBCOLUMN:majcosm.skupina_odp -*/
		skupina_odp?: string|null;
		/**DBCOLUMN:majcosm.rok_start -*/
		rok_start?: number|null;
		/**DBCOLUMN:majcosm.rok_stop -*/
		rok_stop?: number|null;
		/**DBCOLUMN:majcosm.doba_odp -*/
		doba_odp?: number|null;
		/**DBCOLUMN:majcosm.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:majcosm.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcosm.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:majcosm.doba_opr -*/
		doba_opr?: number|null;
	}
	const enum GReaderMajcosmDtoNames { skupina_odp = "skupina_odp", rok_start = "rok_start", rok_stop = "rok_stop", doba_odp = "doba_odp", aktivita = "aktivita", k_v = "k_v", k_s = "k_s", doba_opr = "doba_opr",}
	const enum GReaderMajcosmDtoFragments { skupina_odp = "*", rok_start = "*", rok_stop = "*", doba_odp = "*", aktivita = "*", k_v = "*", k_s = "*", doba_opr = "*",}
	const enum GReaderMajcosmDtoTypes { skupina_odp = "string", rok_start = "number", rok_stop = "number", doba_odp = "number", aktivita = "number", k_v = "number", k_s = "string", doba_opr = "number",}
	const enum GReaderMajcosmDtoTypeLengths { skupina_odp = 4, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcpodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcpod*/
	interface GReaderMajcpodDto {
		/**DBCOLUMN:majcpod.odpis_pomer - Hodnota odpisu za roční období*/
		odpis_pomer?: number|null;
		/**DBCOLUMN:majcpod.odpis_pomer_txt -*/
		odpis_pomer_txt?: string|null;
		/**DBCOLUMN:majcpod.odpis_pomer_zkr -*/
		odpis_pomer_zkr?: string|null;
		/**DBCOLUMN:majcpod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcpod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcpodDtoNames { odpis_pomer = "odpis_pomer", odpis_pomer_txt = "odpis_pomer_txt", odpis_pomer_zkr = "odpis_pomer_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcpodDtoFragments { odpis_pomer = "*", odpis_pomer_txt = "*", odpis_pomer_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcpodDtoTypes { odpis_pomer = "number", odpis_pomer_txt = "string", odpis_pomer_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcpodDtoTypeLengths { odpis_pomer_txt = 50, odpis_pomer_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcsodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcsod*/
	interface GReaderMajcsodDto {
		/**DBCOLUMN:majcsod.start_odp - Začátek odpisu*/
		start_odp?: number|null;
		/**DBCOLUMN:majcsod.start_odp_txt -*/
		start_odp_txt?: string|null;
		/**DBCOLUMN:majcsod.start_odp_zkr -*/
		start_odp_zkr?: string|null;
		/**DBCOLUMN:majcsod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcsod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcsodDtoNames { start_odp = "start_odp", start_odp_txt = "start_odp_txt", start_odp_zkr = "start_odp_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcsodDtoFragments { start_odp = "*", start_odp_txt = "*", start_odp_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcsodDtoTypes { start_odp = "number", start_odp_txt = "string", start_odp_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcsodDtoTypeLengths { start_odp_txt = 50, start_odp_zkr = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajctdm.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majctdm*/
	interface GReaderMajctdmDto {
		/**DBCOLUMN:majctdm.typ_dm -*/
		typ_dm?: number|null;
		/**DBCOLUMN:majctdm.typ_dm_txt -*/
		typ_dm_txt?: string|null;
		/**DBCOLUMN:majctdm.typ_dm_zkr -*/
		typ_dm_zkr?: string|null;
		/**DBCOLUMN:majctdm.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majctdm.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajctdmDtoNames { typ_dm = "typ_dm", typ_dm_txt = "typ_dm_txt", typ_dm_zkr = "typ_dm_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajctdmDtoFragments { typ_dm = "*", typ_dm_txt = "*", typ_dm_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajctdmDtoTypes { typ_dm = "number", typ_dm_txt = "string", typ_dm_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajctdmDtoTypeLengths { typ_dm_txt = 50, typ_dm_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajctodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majctod*/
	interface GReaderMajctodDto {
		/**DBCOLUMN:majctod.odp_12_month - Definice výpočtu odpisu ve 12. měsíci období*/
		odp_12_month?: number|null;
		/**DBCOLUMN:majctod.odp_12_month_txt -*/
		odp_12_month_txt?: string|null;
		/**DBCOLUMN:majctod.odp_12_month_zkr -*/
		odp_12_month_zkr?: string|null;
		/**DBCOLUMN:majctod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majctod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajctodDtoNames { odp_12_month = "odp_12_month", odp_12_month_txt = "odp_12_month_txt", odp_12_month_zkr = "odp_12_month_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajctodDtoFragments { odp_12_month = "*", odp_12_month_txt = "*", odp_12_month_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajctodDtoTypes { odp_12_month = "number", odp_12_month_txt = "string", odp_12_month_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajctodDtoTypeLengths { odp_12_month_txt = 50, odp_12_month_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajctrpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majctrp*/
	interface GReaderMajctrpDto {
		/**DBCOLUMN:majctrp.typ_rp - Typ rozšíř. profilu*/
		typ_rp?: number|null;
		/**DBCOLUMN:majctrp.typ_rp_txt -*/
		typ_rp_txt?: string|null;
		/**DBCOLUMN:majctrp.typ_rp_zkr -*/
		typ_rp_zkr?: string|null;
		/**DBCOLUMN:majctrp.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majctrp.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajctrpDtoNames { typ_rp = "typ_rp", typ_rp_txt = "typ_rp_txt", typ_rp_zkr = "typ_rp_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajctrpDtoFragments { typ_rp = "*", typ_rp_txt = "*", typ_rp_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajctrpDtoTypes { typ_rp = "number", typ_rp_txt = "string", typ_rp_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajctrpDtoTypeLengths { typ_rp_txt = 50, typ_rp_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajctskDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majctsk*/
	interface GReaderMajctskDto {
		/**DBCOLUMN:majctsk.skupina_typ -*/
		skupina_typ?: number|null;
		/**DBCOLUMN:majctsk.skupina_typ_txt -*/
		skupina_typ_txt?: string|null;
		/**DBCOLUMN:majctsk.skupina_typ_zkr -*/
		skupina_typ_zkr?: string|null;
		/**DBCOLUMN:majctsk.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majctsk.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:majctsk.k_xml - Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GReaderMajctskDtoNames { skupina_typ = "skupina_typ", skupina_typ_txt = "skupina_typ_txt", skupina_typ_zkr = "skupina_typ_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GReaderMajctskDtoFragments { skupina_typ = "*", skupina_typ_txt = "*", skupina_typ_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GReaderMajctskDtoTypes { skupina_typ = "number", skupina_typ_txt = "string", skupina_typ_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GReaderMajctskDtoTypeLengths { skupina_typ_txt = 50, skupina_typ_zkr = 16, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajctvpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majctvp*/
	interface GReaderMajctvpDto {
		/**DBCOLUMN:majctvp.typ_vyp_pri -*/
		typ_vyp_pri?: number|null;
		/**DBCOLUMN:majctvp.typ_vyp_pri_txt -*/
		typ_vyp_pri_txt?: string|null;
		/**DBCOLUMN:majctvp.typ_vyp_pri_zkr -*/
		typ_vyp_pri_zkr?: string|null;
		/**DBCOLUMN:majctvp.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majctvp.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajctvpDtoNames { typ_vyp_pri = "typ_vyp_pri", typ_vyp_pri_txt = "typ_vyp_pri_txt", typ_vyp_pri_zkr = "typ_vyp_pri_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajctvpDtoFragments { typ_vyp_pri = "*", typ_vyp_pri_txt = "*", typ_vyp_pri_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajctvpDtoTypes { typ_vyp_pri = "number", typ_vyp_pri_txt = "string", typ_vyp_pri_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajctvpDtoTypeLengths { typ_vyp_pri_txt = 50, typ_vyp_pri_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcudpDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcudp*/
	interface GReaderMajcudpDto {
		/**DBCOLUMN:majcudp.dph_pri -*/
		dph_pri?: number|null;
		/**DBCOLUMN:majcudp.dph_pri_txt -*/
		dph_pri_txt?: string|null;
		/**DBCOLUMN:majcudp.dph_pri_zkr -*/
		dph_pri_zkr?: string|null;
		/**DBCOLUMN:majcudp.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcudp.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcudpDtoNames { dph_pri = "dph_pri", dph_pri_txt = "dph_pri_txt", dph_pri_zkr = "dph_pri_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcudpDtoFragments { dph_pri = "*", dph_pri_txt = "*", dph_pri_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcudpDtoTypes { dph_pri = "number", dph_pri_txt = "string", dph_pri_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcudpDtoTypeLengths { dph_pri_txt = 50, dph_pri_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcvodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcvod*/
	interface GReaderMajcvodDto {
		/**DBCOLUMN:majcvod.odp_vyr_m - Odpis v měsíci vyřazení*/
		odp_vyr_m?: number|null;
		/**DBCOLUMN:majcvod.odp_vyr_m_txt -*/
		odp_vyr_m_txt?: string|null;
		/**DBCOLUMN:majcvod.odp_vyr_m_zkr -*/
		odp_vyr_m_zkr?: string|null;
		/**DBCOLUMN:majcvod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcvod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcvodDtoNames { odp_vyr_m = "odp_vyr_m", odp_vyr_m_txt = "odp_vyr_m_txt", odp_vyr_m_zkr = "odp_vyr_m_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcvodDtoFragments { odp_vyr_m = "*", odp_vyr_m_txt = "*", odp_vyr_m_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcvodDtoTypes { odp_vyr_m = "number", odp_vyr_m_txt = "string", odp_vyr_m_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcvodDtoTypeLengths { odp_vyr_m_txt = 50, odp_vyr_m_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajcxodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majcxod*/
	interface GReaderMajcxodDto {
		/**DBCOLUMN:majcxod.presnost_odp - Přesnost odpisu*/
		presnost_odp?: number|null;
		/**DBCOLUMN:majcxod.presnost_odp_txt -*/
		presnost_odp_txt?: string|null;
		/**DBCOLUMN:majcxod.presnost_odp_zkr -*/
		presnost_odp_zkr?: string|null;
		/**DBCOLUMN:majcxod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcxod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcxodDtoNames { presnost_odp = "presnost_odp", presnost_odp_txt = "presnost_odp_txt", presnost_odp_zkr = "presnost_odp_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcxodDtoFragments { presnost_odp = "*", presnost_odp_txt = "*", presnost_odp_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcxodDtoTypes { presnost_odp = "number", presnost_odp_txt = "string", presnost_odp_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcxodDtoTypeLengths { presnost_odp_txt = 50, presnost_odp_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajczodDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majczod*/
	interface GReaderMajczodDto {
		/**DBCOLUMN:majczod.typ_round - Typ zaokrouhlení odpisu*/
		typ_round?: number|null;
		/**DBCOLUMN:majczod.typ_round_txt -*/
		typ_round_txt?: string|null;
		/**DBCOLUMN:majczod.typ_round_zkr -*/
		typ_round_zkr?: string|null;
		/**DBCOLUMN:majczod.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majczod.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajczodDtoNames { typ_round = "typ_round", typ_round_txt = "typ_round_txt", typ_round_zkr = "typ_round_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajczodDtoFragments { typ_round = "*", typ_round_txt = "*", typ_round_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajczodDtoTypes { typ_round = "number", typ_round_txt = "string", typ_round_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajczodDtoTypeLengths { typ_round_txt = 50, typ_round_zkr = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\DTO\ReadersDTO\GReaderMajsvueDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:majsvue*/
	interface GReaderMajsvueDto {
		/**DBCOLUMN:majsvue.ixs_vue - varianta transformace účtů dle typu evidence*/
		ixs_vue?: string|null;
		/**DBCOLUMN:majsvue.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:majsvue.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:majsvue.poznamka - Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:majsvue.dat_od - Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:majsvue.dat_do - Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:majsvue.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsvue.zmenu_prov - Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GReaderMajsvueDtoNames { ixs_vue = "ixs_vue", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderMajsvueDtoFragments { ixs_vue = "*", aktivita = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GReaderMajsvueDtoTypes { ixs_vue = "string", aktivita = "number", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GReaderMajsvueDtoTypeLengths { ixs_vue = 12, nazev = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Filtry\Gordic.Maj.Interface.FilterMajmaj.d.ts 

declare namespace Gordic.Maj.Interface {
	/**
	*     Filtry přehledu majetku
	*     
	*/
	const enum FilterMajmaj {
		matAkt,
		prizRes,
		/**
		*     GMajFiltrRecDto 
		*     
		*/
		maj,
		/**druh přehledu*/
		druhPrehledu,
		/**Odpisový režim (VAS.MAJCROD) - řídí zda ve výsledných datech zobrazit sloupce odpisování*/
		odpRezim,
		/**příznak, zda tbl.zobrazuje skupinu IM a je konfigurována vazba na REN*/
		modeImSkp4Ren,
		/**Typ skupiny majetku (VAS.MAJCTSK)*/
		MAJCSKM_skupina_typ,
		/**Typ souboru (VAS.MAJCTMS)*/
		typ_soubor,
		/**Vlastník (u nevlastního majetku) (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_vla,
		/**Příznak inventarizované karty (VAS.MAJCSIN)*/
		inv_in,
		/**Příznak povolení odpisu (VAS.MAJCEOD)*/
		priz_odp,
		/**Odečet od daně z příjmu*/
		dp_ode,
		/**Typ daně (VAS.EKOCDAT)*/
		dan_typ,
		/**Id. poznámkového bloku (VAS.GINDPBS)*/
		GINDPBS_ixs_pbs,
		/**ID karty*/
		ixs_maj,
		/**Inventární číslo*/
		inv_cis,
		/**Inventární číslo - do*/
		inv_cis_do,
		/**
		*     Druh evidence (VAS.MAJCDEM)
		*     
		*/
		dev,
		/**
		*     Typ evidence (VAS.MAJCTEM)
		*     
		*/
		tev,
		/**
		*     Typ karty (VAS.MAJCTYK)
		*     
		*/
		tka,
		/**Materiálové číslo (VAS.MAJSCIM)*/
		mat_cis,
		/**Materiálové číslo do (VAS.MAJSCIM)*/
		mat_cis_do,
		/**Klasifikace (VAS.EKOSKLA)*/
		skp,
		/**Klasifikace do (VAS.EKOSKLA)*/
		skp_do,
		/**
		*     Evidenční číslo
		*     
		*/
		evi_cis,
		/**
		*     Evidenční číslo do
		*     
		*/
		evi_cis_do,
		/**
		*     Výrobní číslo
		*     
		*/
		vyr_cis,
		/**
		*     Výrobní číslo do
		*     
		*/
		vyr_cis_do,
		/**
		*     Sériové číslo
		*     
		*/
		ser_cis,
		/**
		*     Sériové číslo do
		*     
		*/
		ser_cis_do,
		/**
		*     Šarže
		*     
		*/
		sarze,
		/**
		*     Šarže do
		*     
		*/
		sarze_do,
		/**
		*     Metoda vedení mat. zásob v rámci skladu (VAS.MAJCMVM). Filtr funguje pouze s operátorem Equal (=).
		*     
		*/
		MAJSMVM_met_skl,
		/**
		*     (VAS.MAJSUEA)
		*     
		*/
		ueab_por,
		ueab_evi,
		ueab_opr,
		/**
		*     Skupina majetku (VAS.MAJCSKM)
		*     
		*/
		skupina_id,
		/**
		*     Druh majetku (VAS.MAJCDRM)
		*     
		*/
		drh_id,
		/**
		*     Datum pořízení
		*     
		*/
		dat_por,
		/**
		*     Datum pořízení do
		*     
		*/
		dat_por_do,
		/**
		*     Datum zařazení
		*     
		*/
		dat_zar,
		/**
		*     Datum zařazení
		*     
		*/
		dat_zar_do,
		/**
		*     Datum vyřazení
		*     
		*/
		dat_vyr,
		/**
		*     Datum vyřazení do
		*     
		*/
		dat_vyr_do,
		/**
		*     Datum zaúčtování
		*     
		*/
		dat_uct_0123,
		/**
		*     Datum zaúčtování do
		*     
		*/
		dat_uct_0123_do,
		/**
		*     Rok výroby
		*     
		*/
		rok_vyr,
		/**
		*     Rok výroby do
		*     
		*/
		rok_vyr_do,
		/**
		*     Prvky souboru (vrací pak typ karty 30 = prvek soupravy)
		*     
		*/
		ixs_maj_nad,
		/**
		*     Způsob evidence (VAS.MAJCZEV)
		*     
		*/
		zev,
		/**
		*     Název
		*     
		*/
		nazev_skp,
		/**
		*     Technický název 
		*     
		*/
		nazev,
		/**
		*     Měrná jednotka (VAS.GINCMEJ)
		*     
		*/
		mj,
		/**
		*     Číslo akce (VAS.SRVSCIA)
		*     
		*/
		akce,
		/**
		*     Záruční lhůta [měsíce]
		*     
		*/
		lhuta_zaruka,
		/**
		*     Záruční lhůta [měsíce] do
		*     
		*/
		lhuta_zaruka_do,
		/**
		*     Účetní cena
		*     
		*/
		c,
		/**
		*     Účetní cena do
		*     
		*/
		c_do,
		/**
		*     Počet MJ
		*     
		*/
		pmj,
		/**
		*     Počet MJ do
		*     
		*/
		pmj_do,
		/**
		*     Cena za MJ
		*     
		*/
		cmj,
		/**
		*     Cena za MJ do
		*     
		*/
		cmj_do,
		/**
		*     Částka DPH
		*     
		*/
		c_dph,
		/**
		*     Částka DPH
		*     
		*/
		c_dph_do,
		/**
		*     Odpočet DPH
		*     
		*/
		c_dph_odpocet,
		/**
		*     Odpočet DPH do
		*     
		*/
		c_dph_odpocet_do,
		/**
		*     Transfer
		*     
		*/
		c_dotace,
		/**
		*     Transfer
		*     
		*/
		c_dotace_do,
		/**
		*     Pořizovací cena
		*     
		*/
		c_poriz,
		/**
		*     Pořizovací cena do
		*     
		*/
		c_poriz_do,
		/**
		*     Reálná cena
		*     
		*/
		c_real,
		/**
		*     Reálná cena do
		*     
		*/
		c_real_do,
		/**
		*     Opravná položka
		*     
		*/
		c_opr_pol,
		/**
		*     Opravná položka do
		*     
		*/
		c_opr_pol_do,
		/**
		*     Prodejní cena 1
		*     
		*/
		cmj_pro1,
		/**
		*     Prodejní cena 1 do
		*     
		*/
		cmj_pro1_do,
		/**
		*     Prodejní cena 2
		*     
		*/
		cmj_pro2,
		/**
		*     Prodejní cena 2 do
		*     
		*/
		cmj_pro2_do,
		/**
		*     Prodejní cena 3
		*     
		*/
		cmj_pro3,
		/**
		*     Prodejní cena 3 do
		*     
		*/
		cmj_pro3_do,
		/**
		*     Poznámka
		*     
		*/
		poznamka,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_inv_cis,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_mat_cis,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_skp,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_evi_cis,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_vyr_cis,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ser_cis,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_sarze,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ueab_por,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ueab_evi,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ueab_opr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_skupina_id,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_drh_id,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_dat_por,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_dat_zar,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_dat_vyr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_dat_uct_0123,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_mj,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_lhuta_zaruka,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_cmj,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_pmj,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_dph,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_dph_odpocet,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_dotace,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_poriz,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_real,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_c_opr_pol,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_cmj_pro1,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_cmj_pro2,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_cmj_pro3,
		/**
		*     SÚAÚ Pořízení
		*     
		*/
		por_drh,
		por_dev,
		por_a,
		por_b,
		/**
		*     SÚAÚ Evidence
		*     
		*/
		evi_drh,
		evi_dev,
		evi_a,
		evi_b,
		/**
		*     SÚAÚ Oprávky
		*     
		*/
		opr_drh,
		opr_dev,
		opr_a,
		opr_b,
		/**
		*     SÚAÚ Opravné položky
		*     
		*/
		ueab_opr_pol,
		/**
		*     Skupina majetku
		*     
		*/
		ixs_skm,
		/**
		*     Druh majetku
		*     
		*/
		ixs_drm,
		/**
		*     odpisy
		*     
		*/
		o_0,
		o_1,
		dan,
		/**
		*     Typ klasifikace
		*     
		*/
		typ_kla,
		/**
		*      Registr TZH
		*     
		*/
		p_tzh,
		/**
		*     Doplňková informace
		*     
		*/
		di,
		/**
		*     Analytika PAP
		*     
		*/
		ke_pap_0,
		/**
		*     Agendové číslo dokladu MAJ
		*     
		*/
		ac,
		/**
		*     Číslo účetního dokladu
		*     
		*/
		ac_uct,
		/**
		*     Celková cena s DPH
		*     
		*/
		c_c_dph,
		/**
		*     Celková cena s DPH do
		*     
		*/
		c_c_dph_do,
		/**
		*     Rozpis transferu
		*     
		*/
		cmb_transfer_roz,
		/**
		*     Stav odpisování
		*     
		*/
		cmb_stav_odpD,
		/**
		*     Životnost
		*     
		*/
		dat_expirace,
		/**
		*     Životnost do
		*     
		*/
		dat_expirace_do,
		/**
		*     parcela
		*     
		*/
		id_par,
		/**
		*     vztah k REN
		*     
		*/
		vazba_ren,
		/**
		*     Ocenění
		*     
		*/
		c_cena,
		/**
		*     Ocenění do
		*     
		*/
		c_cena_do,
		/**
		*     Nevráceno k termínu
		*     
		*/
		dat_after,
		/**id. obecného seskupení*/
		ixs_ose,
		/**IČO org.*/
		ico,
		/**účetní středisko org.*/
		ucs,
		/**nákladové středisko org.*/
		nks,
		/**rok - Ekoparams*/
		rok,
		/**nadřazené NS*/
		id_top,
		/**Materiálová třída (VAS.MAJSTRI)*/
		trida,
		/**EVS (evidenční středisko) (VAS.EKOSSTR)*/
		stredisko,
		/**Referát (ORJ)*/
		ixs_orj,
		/**Zodpovídá (Referent)*/
		ixs_ref,
		/**Objekt (VAS.EKOSOBJ)*/
		objekt,
		/**Kód budovy (VAS.GINSBUD)*/
		budova_kod,
		/**odpojím model SBU od BUD (kód budovy z df_segment_kod je nezávislý na dfBudova)*/
		budova_kod_2,
		/**Kód segmentu budovy (VAS.GINSSBU)*/
		segment_kod,
		/**Kód místnosti budovy/segmentu (VAS.GINSMIS)*/
		mistnost_kod,
		/**Externí lokace 1 (VAS.MAJSEL1)*/
		ext_1,
		/**Externí lokace 2 (VAS.MAJSEL2)*/
		ext_2,
		/**Externí lokace 3 (VAS.MAJSEL3)*/
		ext_3,
		gps_sirka,
		gps_delka,
		/**Analytika PAP/POR - kód evidence pro PAP (vas.majckep)*/
		ke_pap,
		/**Jméno souboru*/
		jmeno_soubor,
		/**Kód způsobu využití majetku (VAS.GINSKOV)*/
		kod_vyu,
		/**Kód pořízení*/
		kod_por,
		/**Kód vyřazení*/
		kod_vyr,
		/**Země původu (VAS.GINCSTA)*/
		stat_puvod,
		/**Doplňková informace (VAS.MAJSDIN)*/
		MAJSDIN_di,
		/**Číslo dokladu (na pohybu v MAJSPEP)*/
		MAJSPEP_ac,
		/**Typ zodpovědnosti za karty (často v kombinaci s referentem (zodpovídá))  (VAS.MAJCTYZ/MAJSREF)*/
		typ_zodp,
		/**Zápůčka - stav rezervace. Ordinální hodnota výčtu GMajEnumStavReservace - jiné hodnoty nejsou přípustné. Automaticky se použije operátor EQUAL - ostatní operátory jsou ignorovány!*/
		res,
		/**Zapůjčenec (VAS.MAJSRES).
		*     POZOR! Filtr je možné použít pouze v kombinaci s filtrem GMajEnumStavReservace o hodnotě ANO nebo ANO-ČÁSTEČNÁ.
		*/
		res_subjekt_txt,
		/**ID subjektu (zapůjčence), typicky IXS_ESU (VAS.MAJSRES).
		*     POZOR! Filtr je možné použít pouze v kombinaci s filtrem GMajEnumStavReservace o hodnotě ANO nebo ANO-ČÁSTEČNÁ.
		*/
		res_subjekt,
		/**ID subjektu (zapůjčence), typicky IXS_ESU (VAS.MAJSRES).
		*     POZOR! Filtr je možné použít pouze v kombinaci s filtrem GMajEnumStavReservace o hodnotě ANO nebo ANO-ČÁSTEČNÁ.
		*/
		MAJSRES_subjekt,
		/**
		*     Datum vrácení (u zápůjčky/reservace) (VAS.MAJSRES).
		*     POZOR! Filtr je možné použít pouze v kombinaci s filtrem GMajEnumStavReservace o hodnotě ANO nebo ANO-ČÁSTEČNÁ.
		*     
		*/
		dat_termin,
		/**
		*     Datum vrácení (u zápůjčky/reservace) (VAS.MAJSRES). do
		*     POZOR! Filtr je možné použít pouze v kombinaci s filtrem GMajEnumStavReservace o hodnotě ANO nebo ANO-ČÁSTEČNÁ.
		*     
		*/
		dat_termin_do,
		/**
		*     Typ rezervace dle VAS.MAJCTYR - slouží k odlišení zápůjčky a opravy
		*     
		*/
		typ_res,
		/**
		*     Typ rezervace dle VAS.MAJCTYR - slouží k odlišení zápůjčky a opravy
		*     
		*/
		MAJSRES_typ_res,
		/**
		*     Příznak tisku etiket ( 0 - ne, 1 - ano)
		*     
		*/
		tisk_eti,
		/**
		*     Vztah k registru TZH. Ordinální hodnota výčtu GMajEnumVztahKTzh. Jiné hodnoty nejsou přípustné. Použitelné operátory jsou EQUAL a NOT. Ostatní operátory jsou považovány za chybu.
		*     
		*/
		GVztahKTzh,
		/**
		*     Číslo účetního dokladu (v UCTDXMA)
		*     
		*/
		UCTDXMA_ac,
		/**
		*     Typ klasifikace (podle VAS.EKOCKTL, EKOSKLA.TYP_KLA)
		*     
		*/
		EKOSKLA_typ_kla,
		/**Zprávy dohledového systému ( 0 - ne, 1 - ano). Funkčnost je podmíněna lic. certifikátem (1100-330).*/
		ZpravyDsg,
		/**Příznak podlimitního množství (u množinových karet)*/
		PmjPodLimit,
		/**Příznak nadlimitního množství (u množinových karet)*/
		PmjNadLimit,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_trida,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_stredisko,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_objekt,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_budova_kod,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_segment_kod,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_mistnost_kod,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ext_1,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ext_2,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ext_3,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_gps_sirka,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_gps_delka,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_ke_pap,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSREF_typ_zodp,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSRES_dat_termin,
		/**Negace příznaků podlimitního/nadlimitního množství (u množinových karet)*/
		NEG_PmjPodNadLimit,
		/**Odpisová skupina (majsodp.skupina_odp_u - VAS.MAJCODS)*/
		MAJSODP_skupina_odp_u,
		/**
		*     Vstupní cena (majsodp.c_vstup_u)
		*     
		*/
		MAJSODP_c_vstup_u,
		/**
		*     Vstupní cena (majsodp.c_vstup_u) do
		*     
		*/
		MAJSODP_c_vstup_u_do,
		/**
		*     Zbytková hodnota (majsodp.c_zbytek_u)
		*     
		*/
		MAJSODP_c_zbytek_u,
		/**
		*     Zbytková hodnota (majsodp.c_zbytek_u) do
		*     
		*/
		MAJSODP_c_zbytek_u_do,
		/**
		*     Oprávky (majsodp.c_opr_u)
		*     
		*/
		MAJSODP_c_opr_u,
		/**
		*     Oprávky (majsodp.c_opr_u) do
		*     
		*/
		MAJSODP_c_opr_u_do,
		/**
		*     Zůstatková cena (majsodp.c_zust_u)
		*     
		*/
		MAJSODP_c_zust_u,
		/**
		*     Zůstatková cena (majsodp.c_zust_u) do
		*     
		*/
		MAJSODP_c_zust_u_do,
		/**
		*     Hodnota odpisu v aktuálním roce (majsodp.c_rok_odp_u)
		*     
		*/
		MAJSODP_c_rok_odp_u,
		/**
		*     Hodnota odpisu v aktuálním roce (majsodp.c_rok_odp_u) do
		*     
		*/
		MAJSODP_c_rok_odp_u_do,
		/**
		*      Hodnota posledního odpisu (majsodp.c_last_odp_u)
		*     
		*/
		MAJSODP_c_last_odp_u,
		/**
		*      Hodnota posledního odpisu (majsodp.c_last_odp_u) do
		*     
		*/
		MAJSODP_c_last_odp_u_do,
		MAJSODP_rok_start_odp_u,
		MAJSODP_rok_start_odp_u_do,
		/**
		*       Aktuální rok odpisu (majsodp.rok_odpisov_u)
		*     
		*/
		MAJSODP_rok_odpisov_u,
		/**
		*       Aktuální rok odpisu (majsodp.rok_odpisov_u) do
		*     
		*/
		MAJSODP_rok_odpisov_u_do,
		/**
		*       Typ odpisu (majsodp.typ_odp_u / VAS.MAJSTOD)
		*     
		*/
		MAJSODP_typ_odp_u,
		/**
		*     Typ odpisu - rok počátku (jemnější členění typů odp.)
		*     
		*/
		MAJSODP_rok_start_typ_u,
		/**
		*     Stav odpisování (Ordinální hodnota výčtu GMajEnumStavOdpisovani: 10 - plně odepsán, 20 = probíhá, 30 = příprava)
		*     
		*/
		MAJSODP_GStavOdpisovani,
		/**
		*     Příznak stanovení oprávky ve výši 40% ocenění – ČÚS 708 7.1.4. Závislé i na změně metody odepisování (oc_714_b >= 10  nebyla-li změna provedena).
		*     
		*/
		MAJSODP_oc_714_b_u,
		/**
		*     Příznak stanovení oprávky dle přílohy 4 – ČÚS 708 7.1.5
		*     
		*/
		MAJSODP_oc_715_b_u,
		/**Rozpis transferu (Ordinální hodnota výčtu GMajEnumRozpisTransferu: 0 = neurčeno, 10 = transfer je plně rozepsán na poskytovatele, 20 = není plně rozepsán)*/
		MAJSODP_transfer_roz,
		/**
		*     Doba použití (v letech) (majsodp.doba_uziti_u)
		*     
		*/
		MAJSODP_doba_uziti_u,
		/**
		*     Doba použití (v letech) (majsodp.doba_uziti_u) do
		*     
		*/
		MAJSODP_doba_uziti_u_do,
		/**
		*     Specializovaný filtr - zbývající doba použití v měsících(!). Operátor filtru je IGNOROVÁN. 
		*     
		*/
		MAJSODP_ZbyvDobaUziti,
		/**
		*     Specializovaný filtr - zbývající doba použití v měsících(!). Operátor filtru je IGNOROVÁN. do
		*     
		*/
		MAJSODP_ZbyvDobaUziti_do,
		/**
		*     Období odpisu - číselný údaj R*100+MM
		*     
		*/
		MAJSODP_obdobi_odp_u,
		/**
		*     Období odpisu - číselný údaj R*100+MM do
		*     
		*/
		MAJSODP_obdobi_odp_u_do,
		/**
		*     Procenta pro výpočet zbytkové hodnoty (majsodp.c_zbytek_proc_u)
		*     
		*/
		MAJSODP_c_zbytek_proc_u,
		/**
		*     Částka odpisu za jednu MJ (majsodp.c_odp_mj_u)
		*     
		*/
		MAJSODP_c_odp_mj_u,
		/**
		*     Částka odpisu za jednu MJ (majsodp.c_odp_mj_u) do
		*     
		*/
		MAJSODP_c_odp_mj_u_do,
		/**
		*     Počet užití za období odpisu/rok  (majsodp.ro_poc_uzi_mj_u)
		*     
		*/
		MAJSODP_ro_poc_uzi_mj_u,
		/**
		*     Počet užití za období odpisu/rok  (majsodp.ro_poc_uzi_mj_u) do
		*     
		*/
		MAJSODP_ro_poc_uzi_mj_u_do,
		/**Počet užití celkem  (majsodp.rc_poc_uzi_mj_u)*/
		MAJSODP_rc_poc_uzi_mj_u,
		/**Počet užití celkem  (majsodp.rc_poc_uzi_mj_u) do*/
		MAJSODP_rc_poc_uzi_mj_u_do,
		/**Předpokládaný počet užití celkem  (majsodp.pc_poc_uzi_mj_u)*/
		MAJSODP_pc_poc_uzi_mj_u,
		/**Předpokládaný počet užití celkem  (majsodp.pc_poc_uzi_mj_u) do*/
		MAJSODP_pc_poc_uzi_mj_u_do,
		/**Předpokládaný počet užití za rok  (majsodp.py_poc_uzi_mj_u)*/
		MAJSODP_py_poc_uzi_mj_u,
		/**Předpokládaný počet užití za rok  (majsodp.py_poc_uzi_mj_u) do*/
		MAJSODP_py_poc_uzi_mj_u_do,
		/**Rok TZH (technického zhodnocení) (majsodp.rok_zvys_vc_u)*/
		MAJSODP_rok_zvys_vc_u,
		/**Aktuální rok odpisu ze ZVC (majsodp.rok_odpisov_zvc_u)*/
		MAJSODP_rok_odpisov_zvc_u,
		/**počet měsíců, za které byl odepsán majetek*/
		MAJSODP_pocet_odp_real_u,
		/**počet měsíců, za které byl odepsán majetek do*/
		MAJSODP_pocet_odp_real_u_do,
		/**měrná jednotka pro výkonový odpis*/
		MAJSODP_mj_u,
		/**Rozpuštěný transfer*/
		MAJSODP_c_dotace_opr_u,
		/**Rozpuštěný transfer do*/
		MAJSODP_c_dotace_opr_u_do,
		/**Nerozpuštěný transfer*/
		MAJSODP_c_dotace_rzd,
		/**Nerozpuštěný transfer do*/
		MAJSODP_c_dotace_rzd_do,
		/**Časové rozlišení transferu*/
		MAJSODP_c_dotace_odp_u,
		/**Časové rozlišení transferu do*/
		MAJSODP_c_dotace_odp_u_do,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_skupina_odp_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_vstup_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_zbytek_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_opr_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_zust_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_rok_odp_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_last_odp_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_start_odp_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_odpisov_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_doba_uziti_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_ZbyvDobaUziti,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_ObdOdpisuU,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_zbytek_proc_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_odp_mj_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_ro_poc_uzi_mj_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_zvys_vc_u,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_odpisov_zvc_u,
		/**
		*     Klasifikace (majsodp.skp_odp_d - VAS.EKOSKLA)
		*     
		*/
		MAJSODP_skp_d,
		/**
		*     Klasifikace (majsodp.skp_odp_d - VAS.EKOSKLA) do
		*     
		*/
		MAJSODP_skp_d_do,
		/**
		*     Odpisová skupina (majsodp.skupina_odp_d - VAS.MAJCODS)
		*     
		*/
		MAJSODP_skupina_odp_d,
		/**
		*     Vstupní cena (majsodp.c_vstup_d)
		*     
		*/
		MAJSODP_c_vstup_d,
		/**
		*     Vstupní cena (majsodp.c_vstup_d) do
		*     
		*/
		MAJSODP_c_vstup_d_do,
		/**
		*     Oprávky (majsodp.c_opr_d)
		*     
		*/
		MAJSODP_c_opr_d,
		/**
		*     Oprávky (majsodp.c_opr_d) do
		*     
		*/
		MAJSODP_c_opr_d_do,
		/**
		*     Zůstatková cena (majsodp.c_zust_d)
		*     
		*/
		MAJSODP_c_zust_d,
		/**
		*     Zůstatková cena (majsodp.c_zust_d) do
		*     
		*/
		MAJSODP_c_zust_d_do,
		/**
		*     Hodnota odpisu v aktuálním roce (majsodp.c_rok_odp_d)
		*     
		*/
		MAJSODP_c_rok_odp_d,
		/**
		*     Hodnota odpisu v aktuálním roce (majsodp.c_rok_odp_d) do
		*     
		*/
		MAJSODP_c_rok_odp_d_do,
		/**
		*      Hodnota posledního odpisu (majsodp.c_last_odp_d)
		*     
		*/
		MAJSODP_c_last_odp_d,
		/**
		*      Hodnota posledního odpisu (majsodp.c_last_odp_d) do
		*     
		*/
		MAJSODP_c_last_odp_d_do,
		/**
		*       Rok počátku odpisu (majsodp.rok_start_odp_d)
		*     
		*/
		MAJSODP_rok_start_odp_d,
		/**
		*       Rok počátku odpisu (majsodp.rok_start_odp_d)
		*     
		*/
		MAJSODP_rok_start_odp_d_do,
		/**
		*       Aktuální rok odpisu (majsodp.rok_odpisov_d)
		*     
		*/
		MAJSODP_rok_odpisov_d,
		/**
		*       Aktuální rok odpisu (majsodp.rok_odpisov_d) do
		*     
		*/
		MAJSODP_rok_odpisov_d_do,
		/**
		*       Typ odpisu (majsodp.typ_odp_d / VAS.MAJSTOD)
		*     
		*/
		MAJSODP_typ_odp_d,
		/**
		*     Typ odpisu - rok počátku  (jemnější členění typů odp.)
		*     
		*/
		MAJSODP_rok_start_typ_d,
		/**Období odpisu - rok (majsodp.rokobd_odp_d)*/
		MAJSODP_rokobd_odp_d,
		/**Období odpisu - měsíc (majsodp.mesobd_odp_d)*/
		MAJSODP_mesobd_odp_d,
		/**Období odpisu - číselný údaj R*100+MM*/
		MAJSODP_obdobi_odp_d,
		/**Období odpisu - číselný údaj R*100+MM do*/
		MAJSODP_obdobi_odp_d_do,
		/**
		*      Rok TZH (technického zhodnocení) (majsodp.rok_zvys_vc_d)
		*     
		*/
		MAJSODP_rok_zvys_vc_d,
		/**
		*     Aktuální rok odpisu ze ZVC (majsodp.rok_odpisov_zvc_d)
		*     
		*/
		MAJSODP_rok_odpisov_zvc_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_skp_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_skupina_odp_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_vstup_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_opr_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_zust_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_rok_odp_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_c_last_odp_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_start_odp_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_odpisov_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_zvys_vc_d,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSODP_rok_odpisov_zvc_d,
		/**Výrobce (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_vyr,
		/**Dodavatel (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_dod,
		/**Servisní organizace (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_servis,
		/**Životnost*/
		expirace,
		/**EAN*/
		ean,
		/**EAN do*/
		ean_do,
		/**Délka*/
		rozmer_l,
		/**Délka do*/
		rozmer_l_do,
		/**Šířka*/
		rozmer_w,
		/**Šířka do*/
		rozmer_w_do,
		/**Výška*/
		rozmer_h,
		/**Výška do*/
		rozmer_h_do,
		/**Hmotnost*/
		hmotnost,
		/**Hmotnost do*/
		hmotnost_do,
		/**Kategorie kulturní památky (VAS.MAJCKKP)*/
		ktg_kp,
		/**Číslo rejstříku kulturní památky*/
		cis_rejstrik_kp,
		/**Identifikátor rejstříku kulturní památky*/
		id_rejstrik_kp,
		/**Typ výrobku*/
		typ_maj,
		/**Kategorie zařízení (VAS.MAJSKTZ)*/
		ktg_zar,
		/**Stav při převzetí (VAS.MAJSSTP)*/
		prev_stav,
		/**Mobilita (VAS.MAJSMOB)*/
		mobilita,
		/**Třída bezpečnosti (VAS.MAJSTRB)*/
		trida_bezp,
		/**Riziko při poruše zařízení (VAS.MAJSRIP)*/
		riziko_por,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_expirace,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_rozmer_l,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_rozmer_w,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_rozmer_h,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_hmotnost,
		/**Rozšířený profil nemovitosti (REN02) - Uživatel pozemku (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_uziv,
		/**Rozšířený profil nemovitosti (REN02) - Uživatel pozemku (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_uziv_poz,
		/**Rozšířený profil nemovitosti (REN02) - Typ objektu. Nastaveno na "parcela", není-li uvedeno jinak. (VAS.MAJCOBJ)*/
		typ_obj,
		/**Rozšířený profil nemovitosti (REN02) - Číslo parcely (ale i budovy/jednotky apod. dle zvoleného typ_obj)*/
		kmen_cislo_par,
		/**Rozšířený profil nemovitosti (REN02) - Číslo smlouvy*/
		sml_esu,
		/**Rozšířený profil nemovitosti (REN02) - Příznak vazby v REN ( 0 = neexistující, 1 = existující vazba)*/
		PriznakVazbyREN,
		/**Rozšířený profil nemovitosti (REN02) - Druh pozemku (VAS.NEMSDPO)*/
		druh_poz,
		/**Rozšířený profil nemovitosti (REN02) - Katastrální území (VAS.NEMSKAT)*/
		kod_kat_uzemi,
		/**Rozšířený profil nemovitosti (REN02) - Výměra*/
		vymera_par,
		/**Rozšířený profil nemovitosti (REN02) - Výměra do*/
		vymera_do,
		/**Rozšířený profil nemovitosti (REN02) - Ocenění*/
		c_cena_oc,
		/**Rozšířený profil nemovitosti (REN02) - Příznak věcného břemene (0 = ne, 1 = ano)*/
		s_zastavni_pravo,
		/**Rozšířený profil nemovitosti (REN02) - Příznak zástavnío práva (0 = ne, 1 = ano)*/
		s_vecne_bremeno,
		/**Rozšířený profil budovy - Správce budovy (VAS.GINSESU přes IXS_PREV)*/
		ixs_esu_spr,
		/**Rozšířený profil budovy - Druh budovy (VAS.GINCBUD)*/
		budova_druh,
		/**Rozšířený profil budovy - ČJ kolaudace*/
		cj_kol,
		/**Rozšířený profil budovy - Počet podlaží*/
		podlazi,
		/**Rozšířený profil budovy - Počet podlaží do*/
		podlazi_do,
		/**Rozšířený profil budovy - Datum kolaudace*/
		dat_kol,
		/**Rozšířený profil budovy - Datum kolaudace do*/
		dat_kol_do,
		/**Rozšířený profil budovy - obestavěný prostor*/
		obest_prostor,
		/**Rozšířený profil budovy - obestavěný prostor do*/
		obest_prostor_do,
		/**Rozšířený profil budovy - zastavěná plocha*/
		zast_plocha,
		/**Rozšířený profil budovy - zastavěná plocha do*/
		zast_plocha_do,
		/**Rozšířený profil budovy - cena posudku*/
		c_pos,
		/**Rozšířený profil budovy - cena posudku do*/
		c_pos_do,
		/**Rozšířený profil budovy - cena upravená*/
		c_upr,
		/**Rozšířený profil budovy - cena upravená*/
		c_upr_do,
		/**Rozšířený profil - text 1 (VAS.GINDRPP)*/
		RPP_text1,
		/**Rozšířený profil - dlouhý text 1*/
		RPP_vtext1,
		/**Rozšířený profil - dlouhý text 2*/
		RPP_vtext2,
		/**
		*     Datum UUP
		*     
		*/
		trf_0_dat_pri,
		/**
		*     Datum UUP do
		*     
		*/
		trf_1_dat_pri,
		/**
		*     Datum přijetí transferu
		*     
		*/
		trf_0_dat_prijmu,
		/**
		*     Datum přijetí transferu do
		*     
		*/
		trf_1_dat_prijmu,
		/**
		*     Transfer
		*     
		*/
		trf_0_c_dotace,
		/**
		*     Transfer do
		*     
		*/
		trf_1_c_dotace,
		/**
		*     Rozpuštěný transfer
		*     
		*/
		trf_0_c_dotace_opr,
		/**
		*     Rozpuštěný transfer do
		*     
		*/
		trf_1_c_dotace_opr,
		/**
		*     Opravná položka
		*     
		*/
		trf_0_c_opr_pol,
		/**
		*     Opravná položka do
		*     
		*/
		trf_1_c_opr_pol,
		/**
		*     Analytika PAP/Výnosy
		*     
		*/
		trf_0_kt_pap,
		/**
		*     Analytika PAP/Výnosy do
		*     
		*/
		trf_1_kt_pap,
		/**
		*     Analytika PAP/Transfery
		*     
		*/
		trf_0_kt_pap_tr,
		/**
		*     Analytika PAP/Transfery do
		*     
		*/
		trf_1_kt_pap_tr,
		/**
		*     AU Transferu
		*     
		*/
		trf_0_ueb_tr,
		/**
		*     AU Transferu do
		*     
		*/
		trf_1_ueb_tr,
		/**
		*     AU výnosu
		*     
		*/
		trf_0_ueb_vyn,
		/**
		*     AU výnosu do
		*     
		*/
		trf_1_ueb_vyn,
		trf_0_ueg_v,
		trf_1_ueg_v,
		trf_0_ueg,
		trf_1_ueg,
		trf_0_te1,
		trf_1_te1,
		/**
		*     Poskytovatel
		*     
		*/
		trf_0_ixs_esu,
		/**
		*     Zprávy DSG
		*     
		*/
		maj_dsg,
		/**Transfer - IXS_ESU poskytovatele*/
		MAJSTRF_ixs_esu,
		/**Transfer - datum UÚP*/
		MAJSTRF_dat_pri,
		/**Transfer - částka transferu*/
		MAJSTRF_c_dotace,
		/**Transfer - částka rozpuštěného transferu*/
		MAJSTRF_c_dotace_opr,
		/**Transfer - opravná položka*/
		MAJSTRF_c_opr_pol,
		/**Transfer - Analytika PAP / Výnosy*/
		MAJSTRF_kt_pap,
		/**Transfer - Analytika PAP*/
		MAJSTRF_kt_pap_tr,
		/**Transfer - AÚ*/
		MAJSTRF_ueb_tr,
		/**Transfer - AÚ výnosu*/
		MAJSTRF_ueb_vyn,
		/**Transfer - POL*/
		MAJSTRF_ueg_v,
		/**Transfer - ÚZ*/
		MAJSTRF_ueg,
		/**Transfer - ORG*/
		MAJSTRF_te1,
		/**Transfer - datum příjmu*/
		MAJSTRF_dat_prijmu,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_dat_pri,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_c_dotace,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_c_dotace_opr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_c_opr_pol,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_kt_pap,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_kt_pap_tr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_ueb_tr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_ueb_vyn,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_ueg_v,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_ueg,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSTRF_te1,
		/**IXS_ESU konsolidovaného partnera*/
		MAJSKON_ixs_esu,
		/**Datum UÚP konsolidovaného partnera*/
		MAJSKON_dat_pri,
		/**Vstupní cena konsolidovaného partnera*/
		MAJSKON_c_vstup,
		/**Oprávky konsolidovaného partnera*/
		MAJSKON_c_opr,
		/**Zůstatková cena konsolidovaného partnera*/
		MAJSKON_c_zust,
		/**Opravná položka konsolidovaného partnera*/
		MAJSKON_c_opr_pol,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSKON_dat_pri,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSKON_c_vstup,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSKON_c_opr,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSKON_c_zust,
		/**Příznak negace výrazu nad daným sloupcem - má význam především u nagace rozsahů, jež není jak poslat skrze filtry*/
		NEG_MAJSKON_c_opr_pol,
		/**SML - Příznak vazby na položku VP SML. Filtr NEMÁ(!) smysl použít, pokud je vybrán PID | AC | EC | Popis!*/
		sml_pol_vp,
		/**SML - Identifikátor dokladu*/
		sml_ixp,
		/**SML - Agendové číslo dokladu*/
		sml_ac_sml,
		/**SML - Agendové číslo dokladu do*/
		sml_ac_sml_do,
		/**SML - Evidenční číslo dokladu*/
		sml_ac,
		/**SML - Evidenční číslo dokladu do*/
		sml_ac_do,
		/**SML - Popis dokladu*/
		sml_popis,
		/**Typ položky VP SML*/
		sml_ixs_dup,
		/**Datum UUP změny karty*/
		dat_uup,
		/**Datum UUP změny karty do*/
		dat_uup_do,
		/**aktivita*/
		mat_akt,
		/**vstup celoaplik. vyhledávání*/
		fulltext,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Filtry\Gordic.Maj.Interface.FilterMajPid.d.ts 

declare namespace Gordic.Maj.Interface {
	/**Filtry MAJ dokladů*/
	const enum FilterMajPid {
		/**Identifikátor dokladu*/
		ixp,
		/**Agendové číslo*/
		ac_ag,
		/**Evidenční číslo*/
		ac,
		/**Stav evidence - konstantový číselník mimo DB v rámci MAJ32.*/
		stav_evi,
		/**Stav dokladu/pohybu (VAS.MAJCCSV)*/
		mp_stav,
		/**Vlastník*/
		ixs_fun,
		/**Vlastníkem i v minulosti. Výchozí je FALSE.*/
		ixs_fun_Hst,
		/**Příznak přečtení (VAS.GINCVIE)*/
		priz_view,
		/**Celková cena od*/
		c_c,
		/**Celková cena do*/
		c_c_do,
		/**Popis dokladu*/
		popis,
		/**Zprávy dohledového systému GINIS (0 = ne, 1 = ano)*/
		ZpravyDohledSystemu,
		/**Klíčová slova (oddělena čárkou)*/
		KlicovaSlova,
		/**Kód pohybu od*/
		kod_poh,
		/**Kód pohybu do*/
		kod_poh_do,
		/**Typ dokladu (VAS.MAJCSTP)*/
		typ_dok,
		/**Datum uskutečnění účetního pohybu od*/
		dat_uup,
		/**Datum uskutečnění účetního pohybu do*/
		dat_uup_do,
		/**Datum podání / evidence od*/
		dat_prij_pod,
		/**Datum podání / evidence do*/
		dat_prij_pod_do,
		/**Datum zaúčtování od*/
		dat_uct,
		/**Datum zaúčtování do*/
		dat_uct_do,
		/**NKS vlastní*/
		NksVlastni,
		/**EVS vlastní*/
		EvsVlastni,
		/**NKS příjemce/výdejce*/
		NksPrijemVydej,
		/**EVS příjemce/výdejce*/
		EvsPrijemVydej,
		/**Párovací symbol*/
		ps_fak,
		/**Id. dodavatele (ixs_esu)*/
		ixs_esu_ext,
		/**Id. dodavatele (ixs_esu)*/
		DodavatelIxsEko,
		/**Doklad - cizí*/
		ac_ext,
		/**Zodpovídá (Referent)*/
		ixs_ref,
		/**Zodpovídá (Referent) - negace*/
		ixs_ref_non,
		/**Identifikátor v ext. systému (SEM).*/
		id_ext,
		/**Příznak vzniku žádosti v ext. systému (SEM).*/
		VznikExterni,
		/**Referát (ORJ)*/
		ixs_orj,
		/**Referát (ORJ) - příznak negace*/
		ixs_orj_non,
		/**Evidenční středisko*/
		stredisko,
		/**Evidenční středisko-negace*/
		stredisko_non,
		/**majspid.objekt od*/
		ObjektOd,
		/**majspid.objekt do*/
		ObjektDo,
		/**majspid.objekt příznak negace*/
		Objekt_non,
		/**Materiálová třída (VAS.MAJSTRI) od*/
		TridaOd,
		/**Materiálová třída (VAS.MAJSTRI) do*/
		TridaDo,
		/**Materiálová třída (VAS.MAJSTRI) - negace*/
		Trida_non,
		/**Externí lokace 1 (VAS.MAJSEL1) od*/
		ExterniLokace1Od,
		/**Externí lokace 1 (VAS.MAJSEL1) do*/
		ExterniLokace1Do,
		/**Externí lokace 1 (VAS.MAJSEL1) negace*/
		ExterniLokace1_non,
		/**Externí lokace 2 (VAS.MAJSEL2) od*/
		ExterniLokace2Od,
		/**Externí lokace 2 (VAS.MAJSEL2) do*/
		ExterniLokace2Do,
		/**Externí lokace 2 (VAS.MAJSEL2) negace*/
		ExterniLokace2_non,
		/**Externí lokace 3 (VAS.MAJSEL3) od*/
		ExterniLokace3Od,
		/**Externí lokace 3 (VAS.MAJSEL3) do*/
		ExterniLokace3Do,
		/**Externí lokace 3 (VAS.MAJSEL3) negace*/
		ExterniLokace3_non,
		/**Skupina majetku položky od*/
		pol_skupina_id_od,
		/**Skupina majetku položky do*/
		pol_skupina_id_do,
		/**Skupina majetku položky - příznak negace*/
		pol_skupina_id_non,
		/**Druh majetku položky (VAS.MAJCDRM) od*/
		pol_drh_id_od,
		/**Druh majetku položky (VAS.MAJCDRM) do*/
		pol_drh_id_do,
		/**Druh majetku položky - Příznak negace*/
		pol_drh_id_non,
		/**Inventární číslo položky*/
		pol_inv_cis,
		/**Inventární číslo položky - příznak negace*/
		pol_inv_cis_non,
		/**Materiálové číslo položky (VAS.MAJSCIM) od*/
		pol_mat_cis_od,
		/**Materiálové číslo položky (VAS.MAJSCIM) do*/
		pol_mat_cis_do,
		/**Materiálové číslo položky (VAS.MAJSCIM) non*/
		pol_mat_cis_non,
		/**Výrobní číslo položky*/
		pol_vyr_cis,
		/**Výrobní číslo položky - příznak negace*/
		pol_vyr_cis_non,
		/**Klasifikace položky (VAS.EKOSKLA) od*/
		pol_skp_od,
		/**Klasifikace položky (VAS.EKOSKLA) do*/
		pol_skp_do,
		/**Klasifikace položky - Příznak negace*/
		pol_skp_non,
		/**SU-AU evidence položky od*/
		pol_ueab_evi_od,
		/**SU-AU evidence položky do*/
		pol_ueab_evi_do,
		/**SU-AU evidence položky - příznak negace*/
		pol_ueab_evi_non,
		/**Majetková třída položky (VAS.MAJSTRI) od*/
		pol_trida_od,
		/**Majetková třída položky (VAS.MAJSTRI) do*/
		pol_trida_do,
		/**Majetková třída položky - Příznak negace*/
		pol_trida_non,
		/**Cena položky od*/
		pol_c_od,
		/**Cena položky od*/
		pol_c_do,
		/**Cena položky - Příznak negace*/
		pol_c_non,
		/**Množství položky od*/
		pol_m_od,
		/**Množství položky do*/
		pol_m_do,
		/**Příznak negace výrazu nad položkou*/
		pol_m_non,
		/**Evidenční středisko položky od*/
		pol_stredisko_od,
		/**Evidenční středisko položky do*/
		pol_stredisko_do,
		/**Evidenční středisko položky - Příznak negace*/
		pol_stredisko_non,
		/**Objekt položky od*/
		pol_objekt_od,
		/**Objekt položky do*/
		pol_objekt_do,
		/**Objekt položky - Příznak negace*/
		pol_objekt_non,
		/**Referát (ORJ) položky*/
		pol_ixs_orj,
		/**Referát (ORJ) položky - příznak negace*/
		pol_ixs_orj_non,
		/**Kód budovy položky (VAS.GINSBUD) od*/
		pol_budova_kod_od,
		/**Kód budovy položky (VAS.GINSBUD) do*/
		pol_budova_kod_do,
		/**Kód budovy položky (VAS.GINSBUD) - Příznak negace*/
		pol_budova_kod_non,
		/**Kód segmentu budovy položky (VAS.GINSSBU) od*/
		pol_segment_kod_od,
		/**Kód segmentu budovy položky (VAS.GINSSBU) do*/
		pol_segment_kod_do,
		/**Kód segmentu budovy položky (VAS.GINSSBU) - Příznak negace*/
		pol_segment_kod_non,
		/**Kód místnosti budovy/segmentu položky (VAS.GINSMIS) od*/
		pol_mistnost_kod_od,
		/**Kód místnosti budovy/segmentu položky (VAS.GINSMIS) do*/
		pol_mistnost_kod_do,
		/**Kód místnosti budovy/segmentu položky - Příznak negace*/
		pol_mistnost_kod_non,
		/**Filtr popisných vlastností*/
		vlastnosti_p,
		/**Filtr rozšířených vlastností*/
		vlastnosti_r,
		/**ID knihy dokladů*/
		ixp_den,
		/**Rok knihy*/
		rok_den,
		/**Režim knih*/
		rezimKnih,
		/**Typ přístupu*/
		typPristupu,
	}
	/**Filtr enum pro seznamy z agend v párovacím symbolu*/
	const enum FilterBplPid {
		/**pid*/
		ixp,
		/**ixs_esu*/
		ixs_esu,
		evCislo,
		agCislo,
		obdobi,
		jenDodavatel,
		bezDokladu,
		/**pouze doklady s kontací nákupu majetku*/
		sKontaciNakupu,
		/**Agenda, pro kterou je seznam volán - KDF, KOF, POU, PRE, SML*/
		agenda,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\ISL\IGMajDokladPolozkaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL pro BO položky maj. dokladu
	* @domain MAJ
	*/
	interface MajDokladPolozka {
		/**Načte položku majetkového dokladu (doklad + karta)*/
		read(rq?:Gordic.Maj.Interface.GMajMajPolDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajMajPolDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajMajPolDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajMajPolDto>>;
		/**Načte přehled položek majetkových dokladů*/
		list(rq?:CallParams<GServiceListRequestWithData<Gordic.Maj.Interface.GMajMajPolDto>>): _Task<GServiceListRequestWithData<Gordic.Maj.Interface.GMajMajPolDto>,GServiceListResponse<Gordic.Maj.Interface.GMajMajPolDto>>;
		/**Test možnosti uložit položku*/
		checkBeforeSave(rq?:CallParams<{majpol:Gordic.Maj.Interface.GMajMajPolDto,majpid:Gordic.Maj.Interface.GMajpidDto}>): _Task<{majpol:Gordic.Maj.Interface.GMajMajPolDto,majpid:Gordic.Maj.Interface.GMajpidDto},Gordic.Maj.Interface.GSpCheckResultDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajDokladPolozka: ServiceBase & Catalog.MajDokladPolozka;
	}
	const MajDokladPolozka: Client["MajDokladPolozka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Majetek\IGMajKartaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL pro BO majetkové karty
	* @domain MAJ
	*/
	interface MajKarta {
		/**Načte detail majetkové karty*/
		read(rq?:Gordic.Maj.Interface.GMajmajDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajmajDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajmajDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Načte detail majetkové karty*/
		readWithPermissions(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Maj.Interface.GMajmajDto>,permissions:Gordic.Maj.Interface.GMajEnumStavyDokladuPolozkyPohybu[]}>): _Task<{rq:GServiceReadRequest<Gordic.Maj.Interface.GMajmajDto>,permissions:Gordic.Maj.Interface.GMajEnumStavyDokladuPolozkyPohybu[]},GServiceReadResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Načte kartotéku majetku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Zjistí počet dokladů na seznamu*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení nové maj. karty*/
		create(rq?:Gordic.Maj.Interface.GMajmajDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Upraví existující maj. kartu*/
		update(rq?:Gordic.Maj.Interface.GMajmajDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Provede založení nové maj. karty nebo upraví existující kartu*/
		upsert(rq?:Gordic.Maj.Interface.GMajmajDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajmajDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Hledání majetkové karty*/
		search(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**Načte přehled doplňkových informací ke kartě majetku*/
		prehledDI(rq?:CallParams<{ixsMaj:string}>): _Task<{ixsMaj:string},GServiceListResponse<Gordic.Maj.Interface.GMajsdinDto>>;
		/**Načte přehled historie údajů DPH*/
		historieDph(rq?:CallParams<{invCis:string}>): _Task<{invCis:string},GServiceListResponse<Gordic.Maj.Interface.GMajldpdDto>>;
		/**Dohledání vybraného majetku*/
		preLoad(rq?:CallParams<{ixsMaj:string}>): _Task<{ixsMaj:string},Gordic.Maj.Interface.GMajmajDto>;
		/**Vytvoření zodpovědné osoby*/
		createZodpovednaOsoba(rq?:Gordic.Maj.Interface.GKrtSeznamRefDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GKrtSeznamRefDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GKrtSeznamRefDto>,GServiceSaveResponse<Gordic.Maj.Interface.GKrtSeznamRefDto>>;
		/**Odstranění zodpovědné osoby*/
		deleteZodpovednaOsoba(rq?:Gordic.Maj.Interface.GKrtSeznamRefDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GKrtSeznamRefDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GKrtSeznamRefDto>,GServiceSaveResponse<Gordic.Maj.Interface.GKrtSeznamRefDto>>;
		/**Průběh časového rozlišení transferu majetku*/
		casoveRozliseniTransferu(rq?:CallParams<{invCis:string}>): _Task<{invCis:string},GServiceListResponse<Gordic.Maj.Interface.GMajTransferCasDto>>;
		/**Uloží záznam o dotaci*/
		ulozitTransfer(rq?:CallParams<{ixsMaj:string,data:Gordic.Maj.Interface.GMajstrfDto}>): _Task<{ixsMaj:string,data:Gordic.Maj.Interface.GMajstrfDto},JsonDecimal>;
		/**Uloží záznamy o dotaci*/
		ulozitTransfery(rq?:CallParams<{ixsMaj:string,data:Gordic.Maj.Interface.GMajstrfDto[]}>): _Task<{ixsMaj:string,data:Gordic.Maj.Interface.GMajstrfDto[]},void>;
		/**Odstraní jeden záznam o dotaci*/
		smazatTransfer(rq?:CallParams<{invCis:string,ixsEsu:string,datPri:JsonDate,ueg:string,ktPap:string,ixsMaj:string}>): _Task<{invCis:string,ixsEsu:string,datPri:JsonDate,ueg:string,ktPap:string,ixsMaj:string},JsonDecimal>;
		/**Vytvoření šablony ze záznamu TRF*/
		vytvoritSablonuTransferu(rq?:CallParams<{invCis:string,ixsEsu:string,datPri:JsonDate,ueg:string,ktPap:string}>): _Task<{invCis:string,ixsEsu:string,datPri:JsonDate,ueg:string,ktPap:string},void>;
		/**kontrola souladu částek TRF a TZH k danému okamžiku*/
		kontrolaCastkyTransferu(rq?:CallParams<{invCis:string,datUup:JsonDate,cDotaceKrt:JsonDecimal}>): _Task<{invCis:string,datUup:JsonDate,cDotaceKrt:JsonDecimal},Gordic.Maj.Interface.GKontrolaDotaceDto>;
		/**Uloží přehled doplňkových informací ke kartě majetku*/
		ulozeniPrehleduDI(rq?:CallParams<{ixsMaj:string,di:Gordic.Maj.Interface.GMajsdinDto[],generujPorCislo:boolean}>): _Task<{ixsMaj:string,di:Gordic.Maj.Interface.GMajsdinDto[],generujPorCislo:boolean},void>;
		/**Uloží hromadně přehled doplňkových informací ke kartě majetku*/
		hromadneUlozeniPrehleduDI(rq?:CallParams<{karty:Gordic.Maj.Interface.GMajmajInfoDto[],di:Gordic.Maj.Interface.GMajsdinDto[],generujPorCislo:boolean}>): _Task<{karty:Gordic.Maj.Interface.GMajmajInfoDto[],di:Gordic.Maj.Interface.GMajsdinDto[],generujPorCislo:boolean},void>;
		/**Kontrola před změnou karty*/
		checkBeforeHromadneZmenKartu(rq?:Gordic.Maj.Interface.GKartaMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKartaMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKartaMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GKartaMajPkDto>>;
		/**Hromadná změna karty*/
		hromadneZmenKartu(rq?:Gordic.Maj.Interface.GKartaMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKartaMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKartaMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GKartaMajPkDto>>;
		/**Kontrola před výdejem karty*/
		checkBeforeHromadneVydej(rq?:Gordic.Maj.Interface.GKartaVydejMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKartaVydejMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKartaVydejMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GKartaMajPkDto>>;
		/**Hromadný výdej*/
		hromadnaOperace(rq?:Gordic.Maj.Interface.GKartaVydejMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKartaVydejMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKartaVydejMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GKartaMajPkDto>>;
		/**Načte navázané primární doklady*/
		listPrimDoklady(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GPrimDokladyDto>>;
		/**{ cfc_MajRpb._setSelect( ) } Vrací data rozšířeného profilu budovy*/
		readRozsirenyProfilBudovy(rq?:Gordic.Maj.Interface.GMajsrpbPKDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajsrpbPKDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajsrpbPKDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajsrpbDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajKarta: ServiceBase & Catalog.MajKarta;
	}
	const MajKarta: Client["MajKarta"];
}
declare namespace Gordic.Maj.Interface {
	/**filter pro seznam primárních (navázaných) dokladů ke kartě*/
	const enum FilterPrimDoklady {
		/**inventární číslo*/
		inv_cis,
	}
	/**Oprávnění pro práci nad kartotékou MAJ*/
	interface GMajKartaSeznamPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze editovat*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**Lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**Lze účtovat*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uhradit*/
		LzeUhradit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GMajKartaSeznamPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeEditovat = "LzeEditovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeTisknout = "LzeTisknout", LzeUctovat = "LzeUctovat", LzePredat = "LzePredat", LzePridelit = "LzePridelit", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzeUhradit = "LzeUhradit",}
	const enum GMajKartaSeznamPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeEditovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeTisknout = "*", LzeUctovat = "*", LzePredat = "*", LzePridelit = "*", LzePrevzit = "*", LzePreevidovat = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzeUhradit = "*",}
	const enum GMajKartaSeznamPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzeUhradit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GMajKartaSeznamPermissionTypeLengths {}
	/**Parametry hromadných změn nad kartami*/
	interface GKartaMajOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajmajDto> {
		/**materiálové číslo*/
		mat_cis?: string|null;
		/**klasifikace*/
		skp?: string|null;
		/**technický název*/
		nazev?: string|null;
		/**množstevní jednotka*/
		mj?: string|null;
		/**nové hodoty z formuláře pro hromadné operace - ten je typu majetková karta*/
		newValues?: Gordic.Maj.Interface.GMajmajDto|null;
	}
	const enum GKartaMajOperationDtoNames { mat_cis = "mat_cis", skp = "skp", nazev = "nazev", mj = "mj", newValues = "newValues", ikc = "ikc", rows = "rows",}
	const enum GKartaMajOperationDtoFragments { mat_cis = "*", skp = "*", nazev = "*", mj = "*", newValues = "*", ikc = "*", rows = "*",}
	const enum GKartaMajOperationDtoTypes { mat_cis = "string", skp = "string", nazev = "string", mj = "string", newValues = "Gordic.Maj.Interface.GMajmajDto", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajmajDto[]",}
	const enum GKartaMajOperationDtoTypeLengths {}
	/**Parametry operací nad kartami typu výdej, likvidace atd*/
	interface GKartaVydejMajOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajmajDto> {
		/**Typ dokladu (200 výdej atd.)*/
		typ_dok?: number|null;
		/**nové hodnoty z formuláře na doklad pro hromadné operace - formulář nad vybranými kartami je doklad*/
		newValues?: Gordic.Maj.Interface.GMajpidDto|null;
		/**nové hodnoty z formuláře na doklad pro hromadné operace - formulář nad vybranými kartami je doklad*/
		topologie?: Gordic.Maj.Interface.GTopologieDto|null;
	}
	const enum GKartaVydejMajOperationDtoNames { typ_dok = "typ_dok", newValues = "newValues", topologie = "topologie", ikc = "ikc", rows = "rows",}
	const enum GKartaVydejMajOperationDtoFragments { typ_dok = "*", newValues = "*", topologie = "*", ikc = "*", rows = "*",}
	const enum GKartaVydejMajOperationDtoTypes { typ_dok = "number", newValues = "Gordic.Maj.Interface.GMajpidDto", topologie = "Gordic.Maj.Interface.GTopologieDto", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajmajDto[]",}
	const enum GKartaVydejMajOperationDtoTypeLengths {}
	/**Oprávnění pro jednu kartu MAJ*/
	interface GKartaMajPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze vydat*/
		LzeVydat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vydat likvidací*/
		LzeVydatLikvidaci: Gordic.General.ApplicationInterface.GPermission;
		/**lze vydat likvidací*/
		LzeVydatPrevodem: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zápůjčka účetní*/
		LzeZapujckaUcetni: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vydat do opravy*/
		LzeVydatDoOpravy: Gordic.General.ApplicationInterface.GPermission;
		/**Lze IUO*/
		LzeIndivdualniUcetniOdpis: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zařazení do užívání*/
		LzeZarazeniDoUzivani: Gordic.General.ApplicationInterface.GPermission;
		/**Lze aktivace vyřazeného majetku*/
		LzeAktivaceVyrazenehoMajetku: Gordic.General.ApplicationInterface.GPermission;
		/**Lze změna topologie*/
		LzeZmenaTopologie: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vložení do souboru*/
		LzeVlozeniDoSouboru: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vyjmutí ze souboru*/
		LzeVyjmutiZeSouboru: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GKartaMajPermissionNames { LzeVydat = "LzeVydat", LzeVydatLikvidaci = "LzeVydatLikvidaci", LzeVydatPrevodem = "LzeVydatPrevodem", LzeZapujckaUcetni = "LzeZapujckaUcetni", LzeVydatDoOpravy = "LzeVydatDoOpravy", LzeIndivdualniUcetniOdpis = "LzeIndivdualniUcetniOdpis", LzeZarazeniDoUzivani = "LzeZarazeniDoUzivani", LzeAktivaceVyrazenehoMajetku = "LzeAktivaceVyrazenehoMajetku", LzeZmenaTopologie = "LzeZmenaTopologie", LzeVlozeniDoSouboru = "LzeVlozeniDoSouboru", LzeVyjmutiZeSouboru = "LzeVyjmutiZeSouboru",}
	const enum GKartaMajPermissionFragments { LzeVydat = "*", LzeVydatLikvidaci = "*", LzeVydatPrevodem = "*", LzeZapujckaUcetni = "*", LzeVydatDoOpravy = "*", LzeIndivdualniUcetniOdpis = "*", LzeZarazeniDoUzivani = "*", LzeAktivaceVyrazenehoMajetku = "*", LzeZmenaTopologie = "*", LzeVlozeniDoSouboru = "*", LzeVyjmutiZeSouboru = "*",}
	const enum GKartaMajPermissionTypes { LzeVydat = "Gordic.General.ApplicationInterface.GPermission", LzeVydatLikvidaci = "Gordic.General.ApplicationInterface.GPermission", LzeVydatPrevodem = "Gordic.General.ApplicationInterface.GPermission", LzeZapujckaUcetni = "Gordic.General.ApplicationInterface.GPermission", LzeVydatDoOpravy = "Gordic.General.ApplicationInterface.GPermission", LzeIndivdualniUcetniOdpis = "Gordic.General.ApplicationInterface.GPermission", LzeZarazeniDoUzivani = "Gordic.General.ApplicationInterface.GPermission", LzeAktivaceVyrazenehoMajetku = "Gordic.General.ApplicationInterface.GPermission", LzeZmenaTopologie = "Gordic.General.ApplicationInterface.GPermission", LzeVlozeniDoSouboru = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmutiZeSouboru = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GKartaMajPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GKartaMajPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GKartaMajPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GKartaMajPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GKartaMajPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GKartaMajPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad doklady MAJ*/
	interface GKartaMajServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze vydat*/
		LzeVydat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vydat likvidací*/
		LzeVydatLikvidaci: Gordic.General.ApplicationInterface.GPermission;
		/**lze vydat likvidací*/
		LzeVydatPrevodem: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zápůjčka účetní*/
		LzeZapujckaUcetni: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vydat do opravy*/
		LzeVydatDoOpravy: Gordic.General.ApplicationInterface.GPermission;
		/**Lze IUO*/
		LzeIndivdualniUcetniOdpis: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zařazení do užívání*/
		LzeZarazeniDoUzivani: Gordic.General.ApplicationInterface.GPermission;
		/**Lze aktivace vyřazeného majetku*/
		LzeAktivaceVyrazenehoMajetku: Gordic.General.ApplicationInterface.GPermission;
		/**Lze změna topologie*/
		LzeZmenaTopologie: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vložení do souboru*/
		LzeVlozeniDoSouboru: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vyjmutí ze souboru*/
		LzeVyjmutiZeSouboru: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GKartaMajServicePermissionNames { LzeVydat = "LzeVydat", LzeVydatLikvidaci = "LzeVydatLikvidaci", LzeVydatPrevodem = "LzeVydatPrevodem", LzeZapujckaUcetni = "LzeZapujckaUcetni", LzeVydatDoOpravy = "LzeVydatDoOpravy", LzeIndivdualniUcetniOdpis = "LzeIndivdualniUcetniOdpis", LzeZarazeniDoUzivani = "LzeZarazeniDoUzivani", LzeAktivaceVyrazenehoMajetku = "LzeAktivaceVyrazenehoMajetku", LzeZmenaTopologie = "LzeZmenaTopologie", LzeVlozeniDoSouboru = "LzeVlozeniDoSouboru", LzeVyjmutiZeSouboru = "LzeVyjmutiZeSouboru",}
	const enum GKartaMajServicePermissionFragments { LzeVydat = "*", LzeVydatLikvidaci = "*", LzeVydatPrevodem = "*", LzeZapujckaUcetni = "*", LzeVydatDoOpravy = "*", LzeIndivdualniUcetniOdpis = "*", LzeZarazeniDoUzivani = "*", LzeAktivaceVyrazenehoMajetku = "*", LzeZmenaTopologie = "*", LzeVlozeniDoSouboru = "*", LzeVyjmutiZeSouboru = "*",}
	const enum GKartaMajServicePermissionTypes { LzeVydat = "Gordic.General.ApplicationInterface.GPermission", LzeVydatLikvidaci = "Gordic.General.ApplicationInterface.GPermission", LzeVydatPrevodem = "Gordic.General.ApplicationInterface.GPermission", LzeZapujckaUcetni = "Gordic.General.ApplicationInterface.GPermission", LzeVydatDoOpravy = "Gordic.General.ApplicationInterface.GPermission", LzeIndivdualniUcetniOdpis = "Gordic.General.ApplicationInterface.GPermission", LzeZarazeniDoUzivani = "Gordic.General.ApplicationInterface.GPermission", LzeAktivaceVyrazenehoMajetku = "Gordic.General.ApplicationInterface.GPermission", LzeZmenaTopologie = "Gordic.General.ApplicationInterface.GPermission", LzeVlozeniDoSouboru = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmutiZeSouboru = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GKartaMajServicePermissionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Majetek\IGMajObchodniMajetek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface k obchodnímu majetku
	* @domain MAJ
	* @businessObject MajObchodniMajetek
	*/
	interface MajObchodniMajetek {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajsobmDto>>;
		/**Save - založení nebo aktualizace obchodního majetku*/
		save(rq?:Gordic.Maj.Interface.GMajsobmSaveDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajsobmSaveDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajsobmSaveDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajsobmDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajObchodniMajetek: ServiceBase & Catalog.MajObchodniMajetek;
	}
	const MajObchodniMajetek: Client["MajObchodniMajetek"];
}
declare namespace Gordic.Maj.Interface {
	interface GMajsobmSaveDto extends Gordic.Maj.Interface.GMajsobmDto {
		/**Režim uložení*/
		mode?: number|null;
		/**Karty*/
		karty?: Gordic.Maj.Interface.GMajKartaInfoDto[]|null;
	}
	const enum GMajsobmSaveDtoNames { mode = "mode", karty = "karty", id_maj = "id_maj", inv_cis = "inv_cis", dat_obm_zar = "dat_obm_zar", podil_obm = "podil_obm", nazev_obm = "nazev_obm", popis_obm = "popis_obm", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", skupina_zkr = "skupina_zkr", drh_zkr = "drh_zkr", mat_akt_txt = "mat_akt_txt", maj = "maj",}
	const enum GMajsobmSaveDtoFragments { mode = "*", karty = "*", id_maj = "*", inv_cis = "*", dat_obm_zar = "*", podil_obm = "*", nazev_obm = "*", popis_obm = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", skupina_zkr = "*", drh_zkr = "*", mat_akt_txt = "*", maj = "*",}
	const enum GMajsobmSaveDtoTypes { mode = "number", karty = "Gordic.Maj.Interface.GMajKartaInfoDto[]", id_maj = "string", inv_cis = "string", dat_obm_zar = "JsonDate", podil_obm = "JsonDecimal", nazev_obm = "string", popis_obm = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", skupina_zkr = "string", drh_zkr = "string", mat_akt_txt = "string", maj = "Gordic.Maj.Interface.GMajmajDto",}
	const enum GMajsobmSaveDtoTypeLengths { id_maj = 40, inv_cis = 50, nazev_obm = 2000, popis_obm = 254, zmenu_prov = 12,}
	interface GMajKartaInfoDto {
		/**Identifikátor karty*/
		ixs_maj?: string|null;
		/**Inventární číslo karty*/
		inv_cis?: string|null;
	}
	const enum GMajKartaInfoDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis",}
	const enum GMajKartaInfoDtoFragments { ixs_maj = "*", inv_cis = "*",}
	const enum GMajKartaInfoDtoTypes { ixs_maj = "string", inv_cis = "string",}
	const enum GMajKartaInfoDtoTypeLengths { ixs_maj = 40, inv_cis = 50,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GMajsobmFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky -*/
		id_maj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Majetek\IGWflsesxMaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**I(Isl)GWflsesx - Přílohy obecného subjektu.
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface MajKartaPrilohy {
		/**Vrátí seznam historie písemnosti dle zMajných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		read(rq?:Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		upsert(rq?:Gordic.Wfl.Interface.GAttachmentUploadDto|CallParams<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>>): _Task<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>,GServiceSaveResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		remove(rq?:Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		/**DownloadAll*/
		downloadAll(rq?:Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GDownloadAllAttachmentsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajKartaPrilohy: ServiceBase & Catalog.MajKartaPrilohy;
	}
	const MajKartaPrilohy: Client["MajKartaPrilohy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Majetek\Odpisy\IGMajOdpisService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL - BO odpis majetku
	* @domain MAJ
	*/
	interface MajOdpis {
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Maj.Interface.GMajsodDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajsodDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajsodDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajsodDto>>;
		/**Založení nebo aktualizace majszzh*/
		upsertMajszzh(rq?:Gordic.Maj.Interface.GMajszzhDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajszzhDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajszzhDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajszzhDto>>;
		/**Načte seznam závislostí výše zbytkové hodnoty na účtu oprávek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajszzhDto>>;
		/**Načte historii parametrů odpisu*/
		listHistorieParametruOdpisu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajhsodDto>>;
		/**kontrola definice pohybu*/
		checkDefPoh(rq?:CallParams<{odpisStartData:Gordic.Maj.Interface.GOdpisStartDto}>): _Task<{odpisStartData:Gordic.Maj.Interface.GOdpisStartDto},boolean>;
		/**Odstranění posledního odpisu karty*/
		odstraneniPoslednihoOdpisu(rq?:CallParams<{inv_cis:string}>): _Task<{inv_cis:string},boolean>;
		/**Odstranění posledního odpisu za NKS*/
		odstraneniPoslednihoOdpisuNks(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajOdpis: ServiceBase & Catalog.MajOdpis;
	}
	const MajOdpis: Client["MajOdpis"];
}
declare namespace Gordic.Maj.Interface {
	/**Filtry pro majszzh*/
	const enum GMajszzhFilterEnum {
		/**Druh odpisu*/
		druh_odp,
		ico,
		ueab_opr,
		rok_od,
	}
	const enum GMajhsodFilterEnum {
		/**druh_odp*/
		druh_odp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ostatni\IGAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Agenda
	* @domain MAJ
	*/
	interface AgendaMaj {
		/**Načte seznam agend*/
		list(rq?:Gordic.Eko.Interface.GEkoAgendaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Kontrola agend před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Maj.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavření / otevření agendy*/
		uzavri(rq?:Gordic.Maj.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných agend*/
		hromadneUzavri(rq?:Gordic.Maj.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Vrátí oprávnění uzávěrky agendy (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
		/**Vrátí oprávnění uzávěrky agendy*/
		getPermissions(rq?:CallParams<{typAg:number}>): _Task<{typAg:number},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AgendaMaj: ServiceBase & Catalog.AgendaMaj;
	}
	const AgendaMaj: Client["AgendaMaj"];
}
declare namespace Gordic.Maj.Interface {
	/**Parametry uzavření / zrušení uzavření agendy*/
	interface GAgendaUzavreniOperationDto {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: Gordic.Eko.Interface.GEkoAgendaDto[]|null;
	}
	const enum GAgendaUzavreniOperationDtoNames { uzavrit = "uzavrit", rows = "rows",}
	const enum GAgendaUzavreniOperationDtoFragments { uzavrit = "*", rows = "*",}
	const enum GAgendaUzavreniOperationDtoTypes { uzavrit = "boolean", rows = "Gordic.Eko.Interface.GEkoAgendaDto[]",}
	const enum GAgendaUzavreniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ostatni\IGKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha
	* @domain MAJ
	*/
	interface KnihaMaj {
		/**Načte seznam knih*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoKnihaDto>>;
		/**Kontrola knih před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Maj.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavření / otevření knihy*/
		uzavri(rq?:Gordic.Maj.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Kontrola daňového odpisu*/
		zkontrolujDanovyOdpis(rq?:Gordic.Maj.Interface.GZkontrolujDanovyOdpisInputDto|CallParams<GServiceActionRequest<Gordic.Maj.Interface.GZkontrolujDanovyOdpisInputDto>>): _Task<GServiceActionRequest<Gordic.Maj.Interface.GZkontrolujDanovyOdpisInputDto>,GServiceActionResponse<Gordic.Maj.Interface.GZkontrolujDanovyOdpisOutputDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných knih*/
		hromadneUzavri(rq?:Gordic.Maj.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Vrátí oprávnění uzávěrky knih (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoKnihaPermissions>;
		/**Vrátí oprávnění uzávěrky knihy*/
		getPermissions(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Eko.Interface.GEkoKnihaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KnihaMaj: ServiceBase & Catalog.KnihaMaj;
	}
	const KnihaMaj: Client["KnihaMaj"];
}
declare namespace Gordic.Maj.Interface {
	/**Parametry uzavření / zrušení uzavření knihy*/
	interface GKnihaUzavreniOperationDto {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: Gordic.Eko.Interface.GEkoVybraneKnihyDto[]|null;
	}
	const enum GKnihaUzavreniOperationDtoNames { uzavrit = "uzavrit", rows = "rows",}
	const enum GKnihaUzavreniOperationDtoFragments { uzavrit = "*", rows = "*",}
	const enum GKnihaUzavreniOperationDtoTypes { uzavrit = "boolean", rows = "Gordic.Eko.Interface.GEkoVybraneKnihyDto[]",}
	const enum GKnihaUzavreniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Ostatni\IGPomocne.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pomocné metody
	* @domain Majetek
	*/
	interface PomocneMaj {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PomocneMaj: ServiceBase & Catalog.PomocneMaj;
	}
	const PomocneMaj: Client["PomocneMaj"];
}
declare namespace Gordic.Maj.Interface {
	/**Společné parametry (hromadné) MAJ operace*/
	interface GMajOperationDto<TDto> {
		/**aktuální IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: TDto[]|null;
	}
	const enum GMajOperationDtoNames { ikc = "ikc", rows = "rows",}
	const enum GMajOperationDtoFragments { ikc = "*", rows = "*",}
	const enum GMajOperationDtoTypes { ikc = "Gordic.General.GIkc", rows = "TDto[]",}
	const enum GMajOperationDtoTypeLengths {}
	/**DTO pro vstup do asynchronního odpisu*/
	interface GOdpisInputDto extends Gordic.Maj.Interface.GOdpisStartDto {
	}
	const enum GOdpisInputDtoNames { druh_odp = "druh_odp", dev = "dev", typ_dok = "typ_dok", ico = "ico", dat_uup = "dat_uup", dat_zdan = "dat_zdan", kod_poh = "kod_poh", zpusob = "zpusob", plan_do = "plan_do", vice_mesicu = "vice_mesicu", interval_odp = "interval_odp", dat_uup_odp = "dat_uup_odp", id_poh = "id_poh", ixp_den = "ixp_den", subrada = "subrada", logPorCislo = "logPorCislo",}
	const enum GOdpisInputDtoFragments { druh_odp = "*", dev = "*", typ_dok = "*", ico = "*", dat_uup = "*", dat_zdan = "*", kod_poh = "*", zpusob = "*", plan_do = "*", vice_mesicu = "*", interval_odp = "*", dat_uup_odp = "*", id_poh = "*", ixp_den = "*", subrada = "*", logPorCislo = "*",}
	const enum GOdpisInputDtoTypes { druh_odp = "number", dev = "number", typ_dok = "number", ico = "string", dat_uup = "JsonDate", dat_zdan = "JsonDate", kod_poh = "number", zpusob = "number", plan_do = "number", vice_mesicu = "boolean", interval_odp = "number", dat_uup_odp = "JsonDate", id_poh = "string", ixp_den = "string", subrada = "number", logPorCislo = "number",}
	const enum GOdpisInputDtoTypeLengths {}
	/**DTO pro výstup z asynchronního odpisu*/
	interface GOdpisOutputDto extends Gordic.Maj.Interface.GOdpisStartDto {
		/**Ikc*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GOdpisOutputDtoNames { ikc = "ikc", druh_odp = "druh_odp", dev = "dev", typ_dok = "typ_dok", ico = "ico", dat_uup = "dat_uup", dat_zdan = "dat_zdan", kod_poh = "kod_poh", zpusob = "zpusob", plan_do = "plan_do", vice_mesicu = "vice_mesicu", interval_odp = "interval_odp", dat_uup_odp = "dat_uup_odp", id_poh = "id_poh", ixp_den = "ixp_den", subrada = "subrada", logPorCislo = "logPorCislo",}
	const enum GOdpisOutputDtoFragments { ikc = "*", druh_odp = "*", dev = "*", typ_dok = "*", ico = "*", dat_uup = "*", dat_zdan = "*", kod_poh = "*", zpusob = "*", plan_do = "*", vice_mesicu = "*", interval_odp = "*", dat_uup_odp = "*", id_poh = "*", ixp_den = "*", subrada = "*", logPorCislo = "*",}
	const enum GOdpisOutputDtoTypes { ikc = "Gordic.General.GIkc", druh_odp = "number", dev = "number", typ_dok = "number", ico = "string", dat_uup = "JsonDate", dat_zdan = "JsonDate", kod_poh = "number", zpusob = "number", plan_do = "number", vice_mesicu = "boolean", interval_odp = "number", dat_uup_odp = "JsonDate", id_poh = "string", ixp_den = "string", subrada = "number", logPorCislo = "number",}
	const enum GOdpisOutputDtoTypeLengths {}
	/**DTO pro vstup a výstup asynchronního mazání odpisu*/
	interface GOdpisDelDto {
	}
	const enum GOdpisDelDtoNames {}
	const enum GOdpisDelDtoFragments {}
	const enum GOdpisDelDtoTypes {}
	const enum GOdpisDelDtoTypeLengths {}
	/**DTO pro vstup do asynchronního účtování*/
	interface GUctovaniInputDto {
		mode?: number|null;
	}
	const enum GUctovaniInputDtoNames { mode = "mode",}
	const enum GUctovaniInputDtoFragments { mode = "*",}
	const enum GUctovaniInputDtoTypes { mode = "number",}
	const enum GUctovaniInputDtoTypeLengths {}
	/**DTO pro výstup z asynchronního účtování*/
	interface GUctovaniOutputDto {
	}
	const enum GUctovaniOutputDtoNames {}
	const enum GUctovaniOutputDtoFragments {}
	const enum GUctovaniOutputDtoTypes {}
	const enum GUctovaniOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\RegistrNM\IGMajRegistrNM.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní ISL pro Registr nedokončeného majetku
	* @domain MAJ
	*/
	interface RegistrNM {
		/**Načte registr nedokončeného majetku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GTzhDto>>;
		/**Vrátí část WHERE podle zadaných filtrů pro předání do sestavy*/
		vytvorSelectProSestavy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,any>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RegistrNM: ServiceBase & Catalog.RegistrNM;
	}
	const RegistrNM: Client["RegistrNM"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Stepan\GMajSmlDto.d.ts 

declare namespace Gordic.Maj.Interface {
	/**DBTABLE:smlspid
	*      Smlouvy
	*/
	interface GMajSmlDto {
		/**
		*      Identifikátor dokumentu
		*      Základní identrifikátor dokladu
		*     
		*/
		sml_ixp?: string|null;
		cis_smo?: number|null;
		c_pol?: JsonDecimal|null;
		c_dod?: JsonDecimal|null;
		ico_esu?: string|null;
		rc_esu?: string|null;
		bu_ci?: string|null;
		soutez?: string|null;
		ucinnost?: string|null;
		ac_dok_1?: string|null;
		ac_dok_2?: string|null;
		dat_dok_1?: JsonDate|null;
		dat_dok_2?: JsonDate|null;
		ixs_pri?: string|null;
		ixs_ref_zast_txt?: string|null;
		ixs_esu_zast_txt?: string|null;
		/**
		*     Protistrana ixs_esu text
		*     
		*/
		ixs_esu_txt?: string|null;
		/**
		*      Stručný popis dokladu
		*     
		*/
		popis?: string|null;
		/**
		*      Evidenční číslo dokladu
		*     
		*/
		ac?: string|null;
		nks?: string|null;
		c?: JsonDecimal|null;
		/**
		*      Agendové číslo
		*      Neměnný identifikátor dokladu bez ohledu na knihu
		*     
		*/
		ac_sml?: string|null;
		ixs_typ_txt?: string|null;
		typ_ceny_txt?: string|null;
		c_fak?: JsonDecimal|null;
		/**
		*      Stav dokladu text
		*     
		*/
		sml_stav_txt?: string|null;
		/**
		*      Datum uzavření/vystavení
		*      Datum uzavření v rámci smluv, u ostatních dokaldů Datum vystavení
		*     
		*/
		dat_uzavreni?: JsonDate|null;
		/**
		*      Datum platnosti
		*      Datum, do kdy je doklad platný
		*     
		*/
		dat_platnost?: JsonDate|null;
		/**
		*      Kompetent
		*      Smluvní kompetent text
		*     
		*/
		ixs_fun_vyriz_txt?: string|null;
		/**vyřizující referent text*/
		ixs_fun_ref_txt?: string|null;
		/**
		*      Všeobecná textová poznámka
		*     
		*/
		poznamka?: string|null;
		/**
		*      Měna
		*     
		*/
		mena_txt?: string|null;
		fin_od?: number|null;
		fin_do?: number|null;
		/**
		*      Typ platnosti text
		*     
		*/
		typ_platnost_txt?: string|null;
		/**
		*      Úplný název smlouvy
		*     
		*/
		nazev?: string|null;
		/**
		*      Název z tabulky smlsden
		*     
		*/
		nazev_den?: string|null;
		/**
		*      Agendové číslo případu BLK
		*      V závislosti na navázaném typu agendy blokačného případu se názvosloví měni
		*     
		*/
		ac_ver_zak?: string|null;
		/**
		*      Organizační jednotka, která vytvořila smlouvu nebo je v rámci ní vedena
		*      Organizační jednotka
		*     
		*/
		ixs_orj_txt?: string|null;
		/**
		*      Celková částka v měně
		*      Celková částka financování v měně
		*     
		*/
		c_mena?: JsonDecimal|null;
		/**
		*      Datum účinnosti
		*      Definuje datum účinnosti smlouvy
		*     
		*/
		dat_ucinnost?: JsonDate|null;
		dat_prij_pod?: JsonDate|null;
		ixs_zuk_txt?: string|null;
		dat_uko?: JsonDate|null;
		ixp_sml_pri?: string|null;
		c_mena_doc?: JsonDecimal|null;
	}
	const enum GMajSmlDtoNames { sml_ixp = "sml_ixp", cis_smo = "cis_smo", c_pol = "c_pol", c_dod = "c_dod", ico_esu = "ico_esu", rc_esu = "rc_esu", bu_ci = "bu_ci", soutez = "soutez", ucinnost = "ucinnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_pri = "ixs_pri", ixs_ref_zast_txt = "ixs_ref_zast_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", ixs_esu_txt = "ixs_esu_txt", popis = "popis", ac = "ac", nks = "nks", c = "c", ac_sml = "ac_sml", ixs_typ_txt = "ixs_typ_txt", typ_ceny_txt = "typ_ceny_txt", c_fak = "c_fak", sml_stav_txt = "sml_stav_txt", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", poznamka = "poznamka", mena_txt = "mena_txt", fin_od = "fin_od", fin_do = "fin_do", typ_platnost_txt = "typ_platnost_txt", nazev = "nazev", nazev_den = "nazev_den", ac_ver_zak = "ac_ver_zak", ixs_orj_txt = "ixs_orj_txt", c_mena = "c_mena", dat_ucinnost = "dat_ucinnost", dat_prij_pod = "dat_prij_pod", ixs_zuk_txt = "ixs_zuk_txt", dat_uko = "dat_uko", ixp_sml_pri = "ixp_sml_pri", c_mena_doc = "c_mena_doc",}
	const enum GMajSmlDtoFragments { sml_ixp = "*", cis_smo = "*", c_pol = "*", c_dod = "*", ico_esu = "*", rc_esu = "*", bu_ci = "*", soutez = "*", ucinnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_pri = "*", ixs_ref_zast_txt = "*", ixs_esu_zast_txt = "*", ixs_esu_txt = "*", popis = "*", ac = "*", nks = "*", c = "*", ac_sml = "*", ixs_typ_txt = "*", typ_ceny_txt = "*", c_fak = "*", sml_stav_txt = "*", dat_uzavreni = "*", dat_platnost = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", poznamka = "*", mena_txt = "*", fin_od = "*", fin_do = "*", typ_platnost_txt = "*", nazev = "*", nazev_den = "*", ac_ver_zak = "*", ixs_orj_txt = "*", c_mena = "*", dat_ucinnost = "*", dat_prij_pod = "*", ixs_zuk_txt = "*", dat_uko = "*", ixp_sml_pri = "*", c_mena_doc = "*",}
	const enum GMajSmlDtoTypes { sml_ixp = "string", cis_smo = "number", c_pol = "JsonDecimal", c_dod = "JsonDecimal", ico_esu = "string", rc_esu = "string", bu_ci = "string", soutez = "string", ucinnost = "string", ac_dok_1 = "string", ac_dok_2 = "string", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_pri = "string", ixs_ref_zast_txt = "string", ixs_esu_zast_txt = "string", ixs_esu_txt = "string", popis = "string", ac = "string", nks = "string", c = "JsonDecimal", ac_sml = "string", ixs_typ_txt = "string", typ_ceny_txt = "string", c_fak = "JsonDecimal", sml_stav_txt = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", poznamka = "string", mena_txt = "string", fin_od = "number", fin_do = "number", typ_platnost_txt = "string", nazev = "string", nazev_den = "string", ac_ver_zak = "string", ixs_orj_txt = "string", c_mena = "JsonDecimal", dat_ucinnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_zuk_txt = "string", dat_uko = "JsonDate", ixp_sml_pri = "string", c_mena_doc = "JsonDecimal",}
	const enum GMajSmlDtoTypeLengths { sml_ixp = 12, popis = 254, ac = 30, ac_sml = 30, poznamka = 500, nazev = 4000, nazev_den = 4000, ac_ver_zak = 30, ixp_sml_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Stepan\IGMajSml.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain GinisAdmin
	* @businessObject MajSml
	*/
	interface MajSml {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajSmlDto>>;
		save(rq?:Gordic.Maj.Interface.GMajSmlSaveDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GMajSmlSaveDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GMajSmlSaveDto>,GServiceSaveResponse<Gordic.Maj.Interface.GMajSmlSaveDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajSml: ServiceBase & Catalog.MajSml;
	}
	const MajSml: Client["MajSml"];
}
declare namespace Gordic.Maj.Interface {
	const enum GMajSmlDtoFilterEnum {
		sml_ixp,
		inv_cis,
		ixs_maj,
	}
	interface GMajSmlSaveDto {
		inv_cis_p?: string|null;
		ixp_sml?: string|null;
		ac_sml?: string|null;
		ixp_sml_pri?: string|null;
		ixs_maj_p?: string|null;
		cis_smo_p?: number|null;
		aktivita_p?: number|null;
	}
	const enum GMajSmlSaveDtoNames { inv_cis_p = "inv_cis_p", ixp_sml = "ixp_sml", ac_sml = "ac_sml", ixp_sml_pri = "ixp_sml_pri", ixs_maj_p = "ixs_maj_p", cis_smo_p = "cis_smo_p", aktivita_p = "aktivita_p",}
	const enum GMajSmlSaveDtoFragments { inv_cis_p = "*", ixp_sml = "*", ac_sml = "*", ixp_sml_pri = "*", ixs_maj_p = "*", cis_smo_p = "*", aktivita_p = "*",}
	const enum GMajSmlSaveDtoTypes { inv_cis_p = "string", ixp_sml = "string", ac_sml = "string", ixp_sml_pri = "string", ixs_maj_p = "string", cis_smo_p = "number", aktivita_p = "number",}
	const enum GMajSmlSaveDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Interface\Zadosti\IGMajZadosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Žádosti - majsiab
	* @domain MAJ
	* @businessObject MajZadosti
	*/
	interface MajZadosti {
		/**Read*/
		read(rq?:Gordic.Maj.Interface.GMajsiabDto|CallParams<GServiceReadRequest<Gordic.Maj.Interface.GMajsiabDto>>): _Task<GServiceReadRequest<Gordic.Maj.Interface.GMajsiabDto>,GServiceReadResponse<Gordic.Maj.Interface.GMajsiabDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajsiabDto>>;
		/**List*/
		listPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajsiapDto>>;
		/**Dto pro předvyplnění karty majetku, kterou hromadně změním položky žádosti*/
		hZPolozekKartaPrefill(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Maj.Interface.GMajmajDto>>;
		/**List*/
		listOdpisy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Maj.Interface.GMajsiaoDto>>;
		/**Update položky žádosti*/
		updatePolozky(rq?:Gordic.Maj.Interface.GSavePolozkaZadostiDto|CallParams<GServiceSaveRequest<Gordic.Maj.Interface.GSavePolozkaZadostiDto>>): _Task<GServiceSaveRequest<Gordic.Maj.Interface.GSavePolozkaZadostiDto>,GServiceGroupResponse<Gordic.Maj.Interface.GMajsiapDto>>;
		/**Kontrola počtu nezpracovaných žádostí SEM*/
		pocetNezpracovanychZadostiSEM(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},number>;
		/**Kontrola žádosti před zpracováním*/
		checkBeforeZpracuj(rq?:Gordic.Maj.Interface.GZadostiMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GZadostiMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GZadostiMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GZadostMajPkDto>>;
		/**Hromadné zpracování žádostí*/
		hromadnaOperace(rq?:Gordic.Maj.Interface.GZadostiMajOperationDto|CallParams<GServiceGroupRequest<Gordic.Maj.Interface.GZadostiMajOperationDto>>): _Task<GServiceGroupRequest<Gordic.Maj.Interface.GZadostiMajOperationDto>,GServiceGroupResponse<Gordic.Maj.Interface.GZadostMajPkDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MajZadosti: ServiceBase & Catalog.MajZadosti;
	}
	const MajZadosti: Client["MajZadosti"];
}
declare namespace Gordic.Maj.Interface {
	/**Filtry pro požadavky na budování LISTu žádostí*/
	const enum GMajsiabFilterEnum {
		/**PK tabulky - Externí ID objektu*/
		id_ext,
		/**Identifikátor*/
		ixp,
		/**Inventární číslo*/
		inv_cis,
		/**Okamžik příjmu od*/
		dat_import_od,
		/**Okamžik příjmu do*/
		dat_import_do,
		/**Popis*/
		popis,
		/**Stav*/
		zadost_stav,
	}
	/**Filtry pro požadavky na budování LISTu položek*/
	const enum GMajsiapFilterEnum {
		/**PK tabulky - Externí ID objektu*/
		id_ext,
		/**Položka žádosti*/
		pol_ext,
	}
	/**Parametry operací nad polozkami zadosti typu výdej, likvidace atd*/
	interface GZadostiMajOperationDto extends Gordic.Maj.Interface.GMajOperationDto<Gordic.Maj.Interface.GMajsiapDto> {
		/**Typ dokladu (200 výdej atd.)*/
		typ_dok?: number|null;
		/**Identifikátor žádosti*/
		id_ext?: string|null;
		/**nové hodnoty z formuláře na doklad pro hromadné operace - formulář nad vybranými kartami je doklad*/
		newValues?: Gordic.Maj.Interface.GMajpidDto|null;
		/**nové hodnoty z formuláře na doklad pro hromadné operace - formulář nad vybranými kartami je doklad*/
		topologie?: Gordic.Maj.Interface.GTopologieDto|null;
		/**Hlavičky žádostí z majsiab*/
		zadosti?: Gordic.Maj.Interface.GMajsiabDto[]|null;
	}
	const enum GZadostiMajOperationDtoNames { typ_dok = "typ_dok", id_ext = "id_ext", newValues = "newValues", topologie = "topologie", zadosti = "zadosti", ikc = "ikc", rows = "rows",}
	const enum GZadostiMajOperationDtoFragments { typ_dok = "*", id_ext = "*", newValues = "*", topologie = "*", zadosti = "*", ikc = "*", rows = "*",}
	const enum GZadostiMajOperationDtoTypes { typ_dok = "number", id_ext = "string", newValues = "Gordic.Maj.Interface.GMajpidDto", topologie = "Gordic.Maj.Interface.GTopologieDto", zadosti = "Gordic.Maj.Interface.GMajsiabDto[]", ikc = "Gordic.General.GIkc", rows = "Gordic.Maj.Interface.GMajsiapDto[]",}
	const enum GZadostiMajOperationDtoTypeLengths {}
	/**Dto pro update položky žádosti typu příjem*/
	interface GSavePolozkaZadostiDto {
		/**Položky žádosti, které se mají updatovat*/
		polozkyZadosti?: Gordic.Maj.Interface.GMajsiapDto[]|null;
		/**Fiktivní karta, na které uživatel zadal změny pro položku majsiap*/
		karta?: Gordic.Maj.Interface.GMajmajDto|null;
	}
	const enum GSavePolozkaZadostiDtoNames { polozkyZadosti = "polozkyZadosti", karta = "karta",}
	const enum GSavePolozkaZadostiDtoFragments { polozkyZadosti = "*", karta = "*",}
	const enum GSavePolozkaZadostiDtoTypes { polozkyZadosti = "Gordic.Maj.Interface.GMajsiapDto[]", karta = "Gordic.Maj.Interface.GMajmajDto",}
	const enum GSavePolozkaZadostiDtoTypeLengths {}
	/**Oprávnění pro jednu žádost MAJ*/
	interface GZadostMajPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Lze zpracovat*/
		LzeZpracovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GZadostMajPermissionNames { LzeZpracovat = "LzeZpracovat",}
	const enum GZadostMajPermissionFragments { LzeZpracovat = "*",}
	const enum GZadostMajPermissionTypes { LzeZpracovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GZadostMajPermissionTypeLengths {}
}

//#endregion

