/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       prr.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Prr.Interface\Gordic.Prr.Interface.csproj
*    created     2026-02-16 14:34:41
*    files       Base\Gordic.Prr.Interface.Enums.d.ts
*                Cis\DbBoxes\IGReaderPrrBarvy.d.ts
*                Cis\DbBoxes\IGReaderPrrCastkyUdalostiDeniku.d.ts
*                Cis\DbBoxes\IGReaderPrrFormulare.d.ts
*                Cis\DbBoxes\IGReaderPrrParagrafy.d.ts
*                Cis\DbBoxes\IGReaderPrrPlemenaPsu.d.ts
*                Cis\DbBoxes\IGReaderPrrStraznici.d.ts
*                Cis\DbBoxes\IGReaderPrrTovarniZnacky.d.ts
*                Cis\DbBoxes\IGReaderPrrTypyReseni.d.ts
*                Cis\DbBoxes\IGReaderPrrTypySkutku.d.ts
*                Cis\DbBoxes\IGReaderPrrTypyUcastnika.d.ts
*                Cis\Dto\GReaderPrrBarvaDto.d.ts
*                Cis\Dto\GReaderPrrCastkaUdalostiDenikuDto.d.ts
*                Cis\Dto\GReaderPrrctplDto.d.ts
*                Cis\Dto\GReaderPrrcudaDto.d.ts
*                Cis\Dto\GReaderPrrFormularDto.d.ts
*                Cis\Dto\GReaderPrrGinsfrmDto.d.ts
*                Cis\Dto\GReaderPrrParagrafyDto.d.ts
*                Cis\Dto\GReaderPrrPlemenoPsaDto.d.ts
*                Cis\Dto\GReaderPrrsfrmDto.d.ts
*                Cis\Dto\GReaderPrrsradDto.d.ts
*                Cis\Dto\GReaderPrrStraznikDto.d.ts
*                Cis\Dto\GReaderPrrsudmDto.d.ts
*                Cis\Dto\GReaderPrrTovarniZnackaDto.d.ts
*                Cis\Dto\GReaderPrrTypReseniDto.d.ts
*                Cis\Dto\GReaderPrrTypSkutkuDto.d.ts
*                Cis\Dto\GReaderPrrTypUcastinkaDto.d.ts
*                Cis\Dto\GReaderSprcsprDto.d.ts
*                DTO\GPrrZonyPlacenehoStaniDto.d.ts
*                DTO\Administrace\GPrrCastkaUdalostiDenikuDto.d.ts
*                DTO\Administrace\GPrrDenikDto.d.ts
*                DTO\Administrace\GPrrDukazDenikuDto.d.ts
*                DTO\Administrace\GPrrFormularDenikuDto.d.ts
*                DTO\Administrace\GPrrFormularDto.d.ts
*                DTO\Administrace\GPrrFormularTypUdalostiDto.d.ts
*                DTO\Administrace\GPrrPovoleniDenikuDto.d.ts
*                DTO\ChybaVarovani\GPrrChybaDto.d.ts
*                DTO\ChybaVarovani\GPrrVarovaniDto.d.ts
*                DTO\Cinnosti\GPrrUzivatelskaCinnostDto.d.ts
*                DTO\Cinnosti\GPrrUzivatelskaCinnostKompletniDto.d.ts
*                DTO\Cinnosti\GPrrUzivatelskaCinnostPrestupekDto.d.ts
*                DTO\Cinnosti\GPrrUzivatelskaCinnostReseniDto.d.ts
*                DTO\CRR\GCrrckprDto.d.ts
*                DTO\CRR\GCrrctprDto.d.ts
*                DTO\CRR\GCrrsbroDto.d.ts
*                DTO\CRR\GCrrscprDto.d.ts
*                DTO\CRR\GCrrsmprDto.d.ts
*                DTO\CRR\GCrrsohkDto.d.ts
*                DTO\CRR\GCrrsoprDto.d.ts
*                DTO\CRR\GCrrsosoDto.d.ts
*                DTO\CRR\GCrrspoaDto.d.ts
*                DTO\CRR\GCrrspprDto.d.ts
*                DTO\CRR\GCrrspreDto.d.ts
*                DTO\CRR\GCrrspriDto.d.ts
*                DTO\CRR\GCrrspruDto.d.ts
*                DTO\CRR\GCrrspzkDto.d.ts
*                DTO\CRR\GCrrspzpDto.d.ts
*                DTO\CRR\GCrrspzrDto.d.ts
*                DTO\CRR\GCrrsreqDto.d.ts
*                DTO\CRR\GCrrsresDto.d.ts
*                DTO\CRR\GCrrssbjDto.d.ts
*                DTO\CRR\GCrrszomDto.d.ts
*                DTO\CRR\GCrrszriDto.d.ts
*                DTO\CRV\VstupniDto\GCrvDleCbeInputDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpBlokDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpCinnostDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpPoruseniDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpPrestupekDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpPripadDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpRequestDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpReseniDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpSkutekDto.d.ts
*                DTO\DetailRizeni\GPrrRizeniMpStraznikDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidencePrilohaPripaduDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpBlokDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpCinnostDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPoruseniDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPrestupekDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPripadDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpReseniDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpSkutekDto.d.ts
*                DTO\EvidenceRizeni\GPrrEvidenceRizeniMpStraznikDto.d.ts
*                DTO\ISEP\GPrrLustraceIsepOsobaDto.d.ts
*                DTO\ISEP\GPrrLustraceIsepPrestupekDto.d.ts
*                DTO\ISEP\GPrrLustraceIsepRequestDto.d.ts
*                DTO\ISEP\GPrrLustraceIsepResponseDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuCizinecPravnickaRequestDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuCizinecRequestDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuEsuRequestDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuPravnickaRequestDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuRequestDto.d.ts
*                DTO\ISEP\Requests\GPrrOpisPrestupkuZakladRequestDto.d.ts
*                DTO\ISSS\GPatrmvParametryHledaniDto.d.ts
*                DTO\ISSS\GPatrosParametryHledaniDto.d.ts
*                DTO\ISSS\GPrrPatrmvDto.d.ts
*                DTO\ISSS\GPrrPatrosDto.d.ts
*                DTO\Permissions\GPrrBaseDetailPermissions.d.ts
*                DTO\Permissions\GPrrBaseDetailPermissionsChybaDto.d.ts
*                DTO\Permissions\GPrrBaseDetailPermissionsDto.d.ts
*                DTO\Pripad\GPrrDukazPripaduDto.d.ts
*                DTO\Pripad\GPrrPrilohaPripaduDto.d.ts
*                ISEP\Gordic.Prr.Interface.IGISEP.d.ts
*                ISL\Administrace\IGPrrFormularDenikuService.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Base\Gordic.Prr.Interface.Enums.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Výčtový typ pro stav úhrady - číselník prrcuhr*/
	const enum StavUhradyEnum {
		/**Neurčeno*/
		Neurceno=0,
		/**Neuhrazeno*/
		Neuhrazeno=10,
		/**Uhrazeno částečně*/
		Uhrazeno=20,
		/**Uhrazeno částečně*/
		UhrazenoCastecne=30,
		/**Uhrazeno částečně po termínu*/
		UhrazenoCastecnePoTerminu=40,
		/**Přeplaceno*/
		Preplaceno=50,
		/**Přeplaceno po termínu*/
		PreplacenoPoTerminu=60,
		/**Neuhrazeno po termínu*/
		NeuhrazenoPoTerminu=70,
		/**Uhrazeno po termínu*/
		UhrazenoPoTerminu=80,
		/**Neuhrazeno vratka*/
		NeuhrazenoVratka=90,
		/**Neuhrazeno vratka - vyplaceno*/
		NeuhrazenoVratkaVyplaceno=100,
		/**Nutné provést ruční vratku*/
		NutnaRucniVratka=110,
		/**Nutná ruční vratka - Více účtů*/
		NutnaRucniVratkaVice=120,
		/**Nutná ruční vratka - Žádný účet*/
		NutnaRucniVratkaZadny=130,
		/**Nutná ruční vratka - Změna ve stavu odloženo*/
		NutnaRucniVratkaOdlozeno=140,
	}
	/**Výčtový typ pro manipulaci s případem*/
	const enum ManipulaceSPripademEnum {
		/**Pouze nastavit stav úhrady*/
		PouzeStavUhrady=0,
		/**Nastavit případ na odloženo po řádném zaplacení v termínu*/
		OdlozitPoRadnemZaplaceniVTerminu=1,
		/**Založit událost odložení po řádném zaplacení v termínu*/
		UdalostOdlozeniPoRadnemZaplaceniVTerminu=2,
		/**Nastavit případ na rozhodnuto po řádném zaplacení v termínu a nabytí právní moci (příznak Nabylo právní moci)*/
		RozhodnutoPoRadnemZaplaceniVTerminuANybytiPm=3,
	}
	/**Výčtový typ pro typy událostí*/
	const enum GPrrTypUdalostiEnum {
		/**Neurčeno*/
		Neurceno=0,
		/**Rozhodnutí*/
		Rozhodnuti=10,
		/**Příkaz*/
		Prikaz=20,
		/**Zastavení*/
		Zastaveni=30,
		/**Odložení*/
		Odlozeni=40,
		/**Postoupení*/
		Postoupeni=50,
		/**Smír*/
		Smir=60,
		/**Přerušení řízení*/
		PreruseniRizeni=70,
		/**Obnovení řízení*/
		ObnoveniRizeni=80,
		/**Zastavení výkonu rozhodnutí*/
		ZastaveniVykonuRozhodnuti=90,
		/**Pořádková pokuta*/
		PoradkovaPokuta=100,
		/**Bloková pokuta*/
		BlokovaPokuta=110,
		/**Domluva*/
		Domluva=120,
		/**Pokuta na místě nezaplacená*/
		PokutaNaMisteNezaplacena=130,
		/**Věc je v řešení*/
		VecReseni=140,
		/**Výzva pro nepřítomného pachatele doprav. přestupku*/
		VyzvaProNepritomnehoPachateleDopravPrestupku=150,
		/**Není přestupek*/
		NeniPrestupek=160,
		/**Přezkumné řízení*/
		PrezkumneRizeni=170,
		/**Žádost o postoupení*/
		ZadostOPostoupeni=180,
		/**Výzva k uhrazení určené částky*/
		VyzvaKUhrazeniUrceneCastky=190,
		/**Protokol*/
		Protokol=200,
		/**Obecný úkon*/
		ObecnyUkon=210,
		/**Rozhodnuto ve spol. řízení*/
		RozhodnutoVeSpolRizeni=220,
		/**Sloučení*/
		Slouceni=230,
		/**Obsílka - vyrozumnění*/
		ObsilkaVyrozumneni=240,
		/**Obsílka - upomínka*/
		ObsilkaUpominka=250,
		/**Obsílka - předvolání*/
		ObsilkaPredvolani=260,
		/**Obsílka - předvedení*/
		ObsilkaPredvedeni=270,
		/**Oznámení o přestupku*/
		OznameniOPrestupku=280,
		/**Řešení*/
		Reseni=300,
		/**Pověření oprávněné úřední osoby*/
		PovereniOpravenyUredniOsoby=310,
		/**Odvolání oprávněné úřední osoby*/
		OdvolaniOpravenyUredniOsoby=320,
		/**Rozhodnutí o narovnání*/
		RozhodnutiONarovnani=330,
		/**Příkaz na místě*/
		PrikazNaMiste=340,
		/**Příkaz na místě nezaplacený*/
		PrikazNaMisteNezaplaceny=345,
		/**Předání věci*/
		PredaniVeci=350,
		/**Napomenutí*/
		Napomenuti=360,
		/**Výzva k podání vysvětlení*/
		VyzvaKPodaniVysvetleni=370,
		/**Vysvětlení*/
		Vysvetleni=380,
		/**Vyrozumění*/
		Vyrozumeni=390,
		/**Úřední záznam*/
		UredniZaznam=400,
		/**Usnesení*/
		Usneseni=410,
		/**Výzva ke sdělení řidiče*/
		VyzvaKeSdeleniRidice=420,
	}
	/**Výčtový typ pro typy vozidla*/
	const enum GPrrTypVozidla {
		/**Neurčeno*/
		Neurceno=0,
		/**Osobní*/
		Osobni=10,
		/**Nákladní*/
		Nakladni=20,
		/**Motocykl*/
		Motocykl=30,
		/**Autobus*/
		Autobus=40,
	}
	/**Výčtový typ pro typy účastníka*/
	const enum GPrrTypUcastnika {
		/**Neurčeno*/
		Neurceno=0,
		/**Navrhovatel*/
		Navrhovatel=10,
		/**Obviněný*/
		Obvineny=20,
		/**Poškozený*/
		Poskozeny=30,
		/**Svědek*/
		Svedek=40,
		/**Vlastník*/
		Vlastnik=50,
		/**Oznamovatel*/
		Oznamovatel=60,
		/**Pachatel*/
		Pachatel=70,
		/**Oznámený*/
		Oznameny=80,
		/**Neznámý pachatel*/
		NeznamyPachatel=90,
		/**Zraněná osoba*/
		ZranenaOsoba=100,
		/**Ostatní*/
		Ostatni=110,
		/**Provozovatel vozidla*/
		ProvozovatelVozidla=120,
		/**Podezřelý*/
		Podezrely=130,
		/**Organizátor*/
		Organizator=140,
		/**Návodce*/
		Navodce=150,
		/**Pomocník*/
		Pomocnik=160,
		/**Spolupachatel*/
		Spolupachatel=170,
		/**Vlastník věci*/
		VlastnikVeci=180,
		/**Osoba přímo postižená spácháním přestupku*/
		OsobaPrimoPostizenaSpachanimPrestupku=190,
		/**Obecná osoba*/
		Osoba=500,
		/**Neznámý pachatel (duplicitní záznam, ID 510)*/
		NeznamyPachatel510=510,
	}
	/**Výčtový typ pro věkové kategorie*/
	const enum GPrrVekovaKategorie {
		/**Neuveden*/
		Neuveden=0,
		/**Věk do 15*/
		VekDo15=10,
		/**Věk od 15 do 18*/
		VekOd15Do18=20,
		/**Věk nad 18*/
		VekNad18=30,
	}
	/**Výčtový typ pro způsoby platby*/
	const enum GPrrZpusobPlatby {
		/**Neurčeno*/
		Neurceno=0,
		/**Hotově*/
		Hotove=10,
		/**Převodem*/
		Prevodem=20,
		/**Složenkou*/
		Slozenkou=30,
	}
	/**Výčtový typ pro postoupeni*/
	const enum GPrrZpusobPostoupeni {
		/**Neurčeno*/
		Neurceno,
		/**na finanční odbor MÚ*/
		FinancniOdborMU,
		/**na správní odbor MÚ*/
		SpravniOdborMU,
		/**policii ČR*/
		PoliciiCr,
		/**přestupkové komisi*/
		PrestupkoveKomisi,
	}
	/**Výčtový typ pro typy upomínky*/
	const enum GPrrTypUpominky {
		/**Neurčeno*/
		Neurceno=0,
		/**Dlužné v sankcích*/
		DluhVSankcich=10,
		/**Dlužné v nákladech*/
		DluhVNakladech=20,
	}
	/**Výčtový typ pro typy zavinění*/
	const enum GPrrTypZavineni {
		/**Neurčeno*/
		Neurceno,
		/**Úmysl*/
		Umysl=10,
		/**nedbalost*/
		Nedbalost=20,
	}
	/**Výčtový typ pro typ řízení*/
	const enum GPrrTypRizeni {
		/**Případ*/
		Pripad,
		/**Činnost*/
		Cinnost,
	}
	/**Typ priorovaného záznamu*/
	const enum GPrrTypPriorovanehoZaznamu {
		/**Neurčeno*/
		Neurceno=0,
		/**Událost*/
		Udalost=10,
		/**Dokument*/
		Dokument=20,
		/**Doručené spisy*/
		DoruceneSpisy=30,
		/**Paragrafy*/
		Paragrafy=40,
		/**Skutky*/
		Skutky=50,
		/**Účastníci*/
		Ucastnici=60,
		/**Účetní případy*/
		UcetniPripady=70,
		/**Důkazy*/
		Dukazy=80,
		/**Spis*/
		Spis=90,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrBarvy.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro filtr barev*/
	const enum GReaderPrrBarvyFilterEnum {
		/**DBCOLUMN:prrsbrv.ixs_brv*/
		ixs_brv,
		/**DBCOLUMN:prrsbrv.popis*/
		popis,
		/**DBCOLUMN:prrsbrv.poznamka*/
		poznamka,
		/**DBCOLUMN:prrsbrv.aktivita*/
		aktivita,
		/**DBCOLUMN:prrsbrv.aktivita_txt*/
		aktivita_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrCastkyUdalostiDeniku.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro částky událostí deníku*/
	const enum GReaderPrrCastkyUdalostiDenikuFilterEnum {
		/**DBCOLUMN:prrvrck.ixs_rad*/
		ixs_rad,
		/**DBCOLUMN:prrvrck.typ_uda*/
		typ_uda,
		/**DBCOLUMN:prrvrck.typ_pla*/
		typ_pla,
		/**DBCOLUMN:prrvrck.castka*/
		castka,
		/**DBCOLUMN:prrvrck.poznamka*/
		poznamka,
		/**DBCOLUMN:prrvrck.aktivita*/
		aktivita,
		/**DBCOLUMN:prrvrck.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:prrvrck.zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrFormulare.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro foormulare/šablony*/
	const enum GReaderPrrFormulareFilterEnum {
		/**prrvrad.ixs_rad - deník*/
		ixs_rad,
		/**prrsfrm.sablona*/
		sablona,
		/**prrsfrm.ixs_typ*/
		ixs_typ,
		/**prrsfrm.nazev*/
		nazev,
		/**prrsfrm.poznamka*/
		poznamka,
		/**prrsfrm.aktivita*/
		aktivita,
		/**prrsfrm.umisteni*/
		umisteni,
		/**prrsfrm.ktg_typ*/
		ktg_typ,
		/**prrsfrm.s_frm*/
		s_frm,
		/**prrsfrm.s_mp*/
		s_mp,
		/**prrsfrm.s_obecny*/
		s_obecny,
		/**prrsfrm.s_vse_den*/
		s_vse_den,
		/**prrvfrm.typ_uda*/
		typ_uda,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrParagrafy.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro paragrafy*/
	const enum GReaderPrrParagrafyFilterEnum {
		/**DBCOLUMN:prrsmpr.ixs_mpr*/
		ixs_mpr,
		/**DBCOLUMN:prrsmpr.nazev*/
		nazev,
		/**DBCOLUMN:prrsmpr.zakonik*/
		zakonik,
		/**DBCOLUMN:prrsmpr.rok*/
		rok,
		/**DBCOLUMN:prrsmpr.paragraf*/
		paragraf,
		/**DBCOLUMN:prrsmpr.odstavec*/
		odstavec,
		/**DBCOLUMN:prrsmpr.pismeno*/
		pismeno,
		/**DBCOLUMN:prrsmpr.bod*/
		bod,
		/**DBCOLUMN:prrsmpr.par_txt*/
		par_txt,
		/**DBCOLUMN:prrsmpr.poznamka*/
		poznamka,
		/**DBCOLUMN:prrsmpr.aktivita*/
		aktivita,
		/**DBCOLUMN:prrsmpr.pocet_zno*/
		pocet_zno,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrPlemenaPsu.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro filtr plemen psů*/
	const enum GReaderPrrPlemenaPsuFilterEnum {
		/**DBCOLUMN:psicplm.plemeno*/
		plemeno,
		/**DBCOLUMN:psicplm.plemeno_txt*/
		plemeno_txt,
		/**DBCOLUMN:psicplm.k_v*/
		k_v,
		/**DBCOLUMN:psicplm.k_s*/
		k_s,
		/**DBCOLUMN:psicplm.nazev_orig*/
		nazev_orig,
		/**DBCOLUMN:psicplm.zkratka*/
		zkratka,
		/**DBCOLUMN:psicplm.cis_stand*/
		cis_stand,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrStraznici.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro strážníky*/
	const enum GReaderPrrStrazniciFilterEnum {
		/**DBCOLUMN:ixs_fun*/
		ixs_fun,
		/**DBCOLUMN:ixs_rad*/
		ixs_rad,
		/**DBCOLUMN:aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrTovarniZnacky.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro tovární značky*/
	const enum GReaderPrrTovarniZnackyFilterEnum {
		/**DBCOLUMN:prrstzv.ixs_tzv*/
		ixs_tzv,
		/**DBCOLUMN:prrstzv.typ_tvo*/
		typ_tvo,
		/**DBCOLUMN:prrstzv.popis*/
		popis,
		/**DBCOLUMN:prrstzv.poznamka*/
		poznamka,
		/**DBCOLUMN:prrstzv.aktivita*/
		aktivita,
		/**DBCOLUMN:prrstzv.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:prrstzv.zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrTypyReseni.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro typy řešení*/
	const enum GReaderPrrTypyReseniFilterEnum {
		/**DBCOLUMN:prrcuda.typ_uda*/
		typ_uda,
		/**DBCOLUMN:prrcuda.typ_uda_txt*/
		typ_uda_txt,
		/**DBCOLUMN:prrcuda.k_v*/
		k_v,
		/**DBCOLUMN:prrcuda.k_s*/
		k_s,
		/**DBCOLUMN:prrcuda.stav_rize*/
		stav_rize,
		/**DBCOLUMN:prrcuda.k_xml*/
		k_xml,
		/**DBCOLUMN:prrcuda.s_prr*/
		s_prr,
		/**DBCOLUMN:prrcuda.s_prm*/
		s_prm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrTypySkutku.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro typy skutků*/
	const enum GReaderPrrTypySkutkuFilterEnum {
		/**DBCOLUMN:prrsuts.ixs_uts*/
		ixs_uts,
		/**DBCOLUMN:prrsuts.nazev*/
		nazev,
		/**DBCOLUMN:prrsuts.poznamka*/
		poznamka,
		/**DBCOLUMN:prrsuts.aktivita*/
		aktivita,
		/**DBCOLUMN:prrsuts.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:prrsuts.zmenu_prov*/
		zmenu_prov,
		/**DBCOLUMN:prrsuts.s_mp*/
		s_mp,
		/**DBCOLUMN:prrsuts.ico*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\DbBoxes\IGReaderPrrTypyUcastnika.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Filtrační kritéria pro typy účastníka*/
	const enum GReaderPrrTypyUcastnikaFilterEnum {
		/**DBCOLUMN:prrcuca.typ_uca*/
		typ_uca,
		/**DBCOLUMN:prrcuca.typ_uca_txt*/
		typ_uca_txt,
		/**DBCOLUMN:prrcuca.k_v*/
		k_v,
		/**DBCOLUMN:prrcuca.k_s*/
		k_s,
		/**DBCOLUMN:prrcuca.k_xml*/
		k_xml,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrBarvaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsbrv*/
	interface GReaderPrrBarvaDto {
		/**DBCOLUMN:prrsbrv.ixs_brv*/
		ixs_brv?: string|null;
		/**DBCOLUMN:prrsbrv.popis*/
		popis?: string|null;
		/**DBCOLUMN:prrsbrv.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsbrv.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsbrv.aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GReaderPrrBarvaDtoNames { ixs_brv = "ixs_brv", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GReaderPrrBarvaDtoFragments { ixs_brv = "*", popis = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*",}
	const enum GReaderPrrBarvaDtoTypes { ixs_brv = "string", popis = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string",}
	const enum GReaderPrrBarvaDtoTypeLengths { ixs_brv = 12, popis = 50, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrCastkaUdalostiDenikuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvrck*/
	interface GReaderPrrCastkaUdalostiDenikuDto {
		/**DBCOLUMN:prrvrck.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrvrck.typ_uda*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrvrck.typ_pla*/
		typ_pla?: number|null;
		/**DBCOLUMN:prrvrck.castka*/
		castka?: JsonDecimal|null;
		/**DBCOLUMN:prrvrck.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvrck.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvrck.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrvrck.zmenu_prov*/
		zmenu_prov?: string|null;
		/**typ_uda_txt*/
		typ_uda_txt?: string|null;
		/**typ_pla_txt*/
		typ_pla_txt?: string|null;
	}
	const enum GReaderPrrCastkaUdalostiDenikuDtoNames { ixs_rad = "ixs_rad", typ_uda = "typ_uda", typ_pla = "typ_pla", castka = "castka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_uda_txt = "typ_uda_txt", typ_pla_txt = "typ_pla_txt",}
	const enum GReaderPrrCastkaUdalostiDenikuDtoFragments { ixs_rad = "*", typ_uda = "*", typ_pla = "*", castka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_uda_txt = "*", typ_pla_txt = "*",}
	const enum GReaderPrrCastkaUdalostiDenikuDtoTypes { ixs_rad = "string", typ_uda = "number", typ_pla = "number", castka = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_uda_txt = "string", typ_pla_txt = "string",}
	const enum GReaderPrrCastkaUdalostiDenikuDtoTypeLengths { ixs_rad = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrctplDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrctpl*/
	interface GReaderPrrctplDto {
		/**DBCOLUMN:prrctpl.typ_pla*/
		typ_pla?: number|null;
		/**DBCOLUMN:prrctpl.typ_pla_txt*/
		typ_pla_txt?: string|null;
		/**DBCOLUMN:prrctpl.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:prrctpl.k_s*/
		k_s?: string|null;
	}
	const enum GReaderPrrctplDtoNames { typ_pla = "typ_pla", typ_pla_txt = "typ_pla_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderPrrctplDtoFragments { typ_pla = "*", typ_pla_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderPrrctplDtoTypes { typ_pla = "number", typ_pla_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderPrrctplDtoTypeLengths { typ_pla_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrcudaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrcuda*/
	interface GReaderPrrcudaDto {
		/**DBCOLUMN:prrcuda.typ_uda - Typ události*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrcuda.typ_uda_txt - Typ události TXT*/
		typ_uda_txt?: string|null;
		/**DBCOLUMN:prrcuda.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:prrcuda.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:prrcuda.stav_rize -*/
		stav_rize?: number|null;
		/**DBCOLUMN:prrcuda.k_xml -*/
		k_xml?: string|null;
		/**DBCOLUMN:prrcuda.s_prr -*/
		s_prr?: number|null;
		/**DBCOLUMN:prrcuda.s_prm -*/
		s_prm?: number|null;
	}
	const enum GReaderPrrcudaDtoNames { typ_uda = "typ_uda", typ_uda_txt = "typ_uda_txt", k_v = "k_v", k_s = "k_s", stav_rize = "stav_rize", k_xml = "k_xml", s_prr = "s_prr", s_prm = "s_prm",}
	const enum GReaderPrrcudaDtoFragments { typ_uda = "*", typ_uda_txt = "*", k_v = "*", k_s = "*", stav_rize = "*", k_xml = "*", s_prr = "*", s_prm = "*",}
	const enum GReaderPrrcudaDtoTypes { typ_uda = "number", typ_uda_txt = "string", k_v = "number", k_s = "string", stav_rize = "number", k_xml = "string", s_prr = "number", s_prm = "number",}
	const enum GReaderPrrcudaDtoTypeLengths { typ_uda_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrFormularDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GReaderPrrFormularDto {
		/**DBCOLUMN:Seznam.sablona*/
		sablona?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.s_frm*/
		s_frm?: number|null;
		/**DBCOLUMN:Seznam.sablona_puvodni*/
		sablona_puvodni?: string|null;
		/**DBCOLUMN:Seznam.prrvsku_aktivita*/
		prrvsku_aktivita?: number|null;
		/**DBCOLUMN:Seznam.prrvsku_aktivita_txt*/
		prrvsku_aktivita_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Seznam.lze_editovat*/
		lze_editovat?: number|null;
		/**DBCOLUMN:Seznam.s_mp*/
		s_mp?: number|null;
		/**DBCOLUMN:Seznam.s_obecny*/
		s_obecny?: number|null;
		/**DBCOLUMN:Seznam.s_vse_den*/
		s_vse_den?: number|null;
		/**DBCOLUMN:Seznam.ginsfrm_file_name*/
		ginsfrm_file_name?: string|null;
		/**DBCOLUMN:Seznam.ginsfrm_ixs_xme*/
		ginsfrm_ixs_xme?: string|null;
		/**DBCOLUMN:Seznam.ixs_sku*/
		ixs_sku?: string|null;
		/**DBCOLUMN:Seznam.ginsfrm_nazev*/
		ginsfrm_nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_uda*/
		typ_uda?: number|null;
	}
	const enum GReaderPrrFormularDtoNames { sablona = "sablona", ixs_typ = "ixs_typ", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", umisteni = "umisteni", ktg_typ = "ktg_typ", s_frm = "s_frm", sablona_puvodni = "sablona_puvodni", prrvsku_aktivita = "prrvsku_aktivita", prrvsku_aktivita_txt = "prrvsku_aktivita_txt", aktivita_txt = "aktivita_txt", lze_editovat = "lze_editovat", s_mp = "s_mp", s_obecny = "s_obecny", s_vse_den = "s_vse_den", ginsfrm_file_name = "ginsfrm_file_name", ginsfrm_ixs_xme = "ginsfrm_ixs_xme", ixs_sku = "ixs_sku", ginsfrm_nazev = "ginsfrm_nazev", typ_uda = "typ_uda",}
	const enum GReaderPrrFormularDtoFragments { sablona = "*", ixs_typ = "*", nazev = "*", poznamka = "*", aktivita = "*", umisteni = "*", ktg_typ = "*", s_frm = "*", sablona_puvodni = "*", prrvsku_aktivita = "*", prrvsku_aktivita_txt = "*", aktivita_txt = "*", lze_editovat = "*", s_mp = "*", s_obecny = "*", s_vse_den = "*", ginsfrm_file_name = "*", ginsfrm_ixs_xme = "*", ixs_sku = "*", ginsfrm_nazev = "*", typ_uda = "*",}
	const enum GReaderPrrFormularDtoTypes { sablona = "string", ixs_typ = "string", nazev = "string", poznamka = "string", aktivita = "number", umisteni = "number", ktg_typ = "number", s_frm = "number", sablona_puvodni = "string", prrvsku_aktivita = "number", prrvsku_aktivita_txt = "string", aktivita_txt = "string", lze_editovat = "number", s_mp = "number", s_obecny = "number", s_vse_den = "number", ginsfrm_file_name = "string", ginsfrm_ixs_xme = "string", ixs_sku = "string", ginsfrm_nazev = "string", typ_uda = "number",}
	const enum GReaderPrrFormularDtoTypeLengths { sablona = 20, ixs_typ = 12, nazev = 254, poznamka = 50, sablona_puvodni = 20, prrvsku_aktivita_txt = 50, aktivita_txt = 50, ginsfrm_file_name = 254, ginsfrm_ixs_xme = 12, ixs_sku = 12, ginsfrm_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrGinsfrmDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:ginsfrm*/
	interface GReaderPrrGinsfrmDto {
		/**DBCOLUMN:ginsfrm.ixs_frm -*/
		ixs_frm?: string|null;
		/**DBCOLUMN:ginsfrm.nazev -*/
		nazev?: string|null;
		/**DBCOLUMN:ginsfrm.tema -*/
		tema?: string|null;
		/**DBCOLUMN:ginsfrm.poznamka - Poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsfrm.rokmes_od -*/
		rokmes_od?: string|null;
		/**DBCOLUMN:ginsfrm.rokmes_do -*/
		rokmes_do?: string|null;
		/**DBCOLUMN:ginsfrm.file_name -*/
		file_name?: string|null;
		/**DBCOLUMN:ginsfrm.xmeta_ver -*/
		xmeta_ver?: number|null;
		/**DBCOLUMN:ginsfrm.xmeta_subver_min -*/
		xmeta_subver_min?: number|null;
		/**DBCOLUMN:ginsfrm.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsfrm.dat_zmena - Změněno*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsfrm.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsfrm.ixs_xme -*/
		ixs_xme?: string|null;
		/**DBCOLUMN:ginsfrm.form_vyst -*/
		form_vyst?: string|null;
		/**DBCOLUMN:ginsfrm.format_skup -*/
		format_skup?: string|null;
		/**DBCOLUMN:ginsfrm.zpus_uloz -*/
		zpus_uloz?: number|null;
		/**DBCOLUMN:ginsfrm.priz_zmeny -*/
		priz_zmeny?: number|null;
		/**DBCOLUMN:ginsfrm.filtr_frm -*/
		filtr_frm?: string|null;
	}
	const enum GReaderPrrGinsfrmDtoNames { ixs_frm = "ixs_frm", nazev = "nazev", tema = "tema", poznamka = "poznamka", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", file_name = "file_name", xmeta_ver = "xmeta_ver", xmeta_subver_min = "xmeta_subver_min", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_xme = "ixs_xme", form_vyst = "form_vyst", format_skup = "format_skup", zpus_uloz = "zpus_uloz", priz_zmeny = "priz_zmeny", filtr_frm = "filtr_frm",}
	const enum GReaderPrrGinsfrmDtoFragments { ixs_frm = "*", nazev = "*", tema = "*", poznamka = "*", rokmes_od = "*", rokmes_do = "*", file_name = "*", xmeta_ver = "*", xmeta_subver_min = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_xme = "*", form_vyst = "*", format_skup = "*", zpus_uloz = "*", priz_zmeny = "*", filtr_frm = "*",}
	const enum GReaderPrrGinsfrmDtoTypes { ixs_frm = "string", nazev = "string", tema = "string", poznamka = "string", rokmes_od = "string", rokmes_do = "string", file_name = "string", xmeta_ver = "number", xmeta_subver_min = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_xme = "string", form_vyst = "string", format_skup = "string", zpus_uloz = "number", priz_zmeny = "number", filtr_frm = "string",}
	const enum GReaderPrrGinsfrmDtoTypeLengths { ixs_frm = 12, nazev = 100, tema = 15, poznamka = 254, rokmes_od = 6, rokmes_do = 6, file_name = 254, zmenu_prov = 12, ixs_xme = 12, form_vyst = 10, format_skup = 3, filtr_frm = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrParagrafyDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsmpr*/
	interface GReaderPrrParagrafyDto {
		/**DBCOLUMN:prrsmpr.ixs_mpr*/
		ixs_mpr?: string|null;
		/**DBCOLUMN:prrsmpr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsmpr.zakonik*/
		zakonik?: string|null;
		/**DBCOLUMN:prrsmpr.rok*/
		rok?: number|null;
		/**DBCOLUMN:prrsmpr.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:prrsmpr.odstavec*/
		odstavec?: string|null;
		/**DBCOLUMN:prrsmpr.pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:prrsmpr.bod*/
		bod?: string|null;
		/**DBCOLUMN:prrsmpr.par_txt*/
		par_txt?: string|null;
		/**DBCOLUMN:prrsmpr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsmpr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsmpr.pocet_zno*/
		pocet_zno?: number|null;
	}
	const enum GReaderPrrParagrafyDtoNames { ixs_mpr = "ixs_mpr", nazev = "nazev", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", par_txt = "par_txt", poznamka = "poznamka", aktivita = "aktivita", pocet_zno = "pocet_zno",}
	const enum GReaderPrrParagrafyDtoFragments { ixs_mpr = "*", nazev = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", par_txt = "*", poznamka = "*", aktivita = "*", pocet_zno = "*",}
	const enum GReaderPrrParagrafyDtoTypes { ixs_mpr = "string", nazev = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", par_txt = "string", poznamka = "string", aktivita = "number", pocet_zno = "number",}
	const enum GReaderPrrParagrafyDtoTypeLengths { ixs_mpr = 12, nazev = 254, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3, par_txt = 254, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrPlemenoPsaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:psicplm
	*      Plemeno psa
	*/
	interface GReaderPrrPlemenoPsaDto {
		/**Plemeno psa - kód*/
		plemeno?: number|null;
		/**Název plemene psa*/
		plemeno_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**nazev_orig*/
		nazev_orig?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**cis_stand*/
		cis_stand?: string|null;
	}
	const enum GReaderPrrPlemenoPsaDtoNames { plemeno = "plemeno", plemeno_txt = "plemeno_txt", k_v = "k_v", k_s = "k_s", nazev_orig = "nazev_orig", zkratka = "zkratka", cis_stand = "cis_stand",}
	const enum GReaderPrrPlemenoPsaDtoFragments { plemeno = "*", plemeno_txt = "*", k_v = "*", k_s = "*", nazev_orig = "*", zkratka = "*", cis_stand = "*",}
	const enum GReaderPrrPlemenoPsaDtoTypes { plemeno = "number", plemeno_txt = "string", k_v = "number", k_s = "string", nazev_orig = "string", zkratka = "string", cis_stand = "string",}
	const enum GReaderPrrPlemenoPsaDtoTypeLengths { plemeno_txt = 254, k_s = 15, nazev_orig = 254, zkratka = 16, cis_stand = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrsfrmDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsfrm*/
	interface GReaderPrrsfrmDto {
		/**DBCOLUMN:prrsfrm.sablona*/
		sablona?: string|null;
		/**DBCOLUMN:prrsfrm.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsfrm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsfrm.s_mp*/
		s_mp?: number|null;
		/**ixs_rad*/
		ixs_rad?: string|null;
	}
	const enum GReaderPrrsfrmDtoNames { sablona = "sablona", nazev = "nazev", aktivita = "aktivita", s_mp = "s_mp", ixs_rad = "ixs_rad",}
	const enum GReaderPrrsfrmDtoFragments { sablona = "*", nazev = "*", aktivita = "*", s_mp = "*", ixs_rad = "*",}
	const enum GReaderPrrsfrmDtoTypes { sablona = "string", nazev = "string", aktivita = "number", s_mp = "number", ixs_rad = "string",}
	const enum GReaderPrrsfrmDtoTypeLengths { sablona = 20, nazev = 254, ixs_rad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrsradDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsrad*/
	interface GReaderPrrsradDto {
		/**DBCOLUMN:prrsrad.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrsrad.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsrad.rok*/
		rok?: number|null;
		/**DBCOLUMN:prrsrad.typ_den*/
		typ_den?: number|null;
		/**Typ den txt*/
		typ_den_txt?: string|null;
		/**DBCOLUMN:prrsrad.aktivita*/
		aktivita?: number|null;
		/**s_pristup*/
		s_pristup?: number|null;
	}
	const enum GReaderPrrsradDtoNames { ixs_rad = "ixs_rad", nazev = "nazev", rok = "rok", typ_den = "typ_den", typ_den_txt = "typ_den_txt", aktivita = "aktivita", s_pristup = "s_pristup",}
	const enum GReaderPrrsradDtoFragments { ixs_rad = "*", nazev = "*", rok = "*", typ_den = "*", typ_den_txt = "*", aktivita = "*", s_pristup = "*",}
	const enum GReaderPrrsradDtoTypes { ixs_rad = "string", nazev = "string", rok = "number", typ_den = "number", typ_den_txt = "string", aktivita = "number", s_pristup = "number",}
	const enum GReaderPrrsradDtoTypeLengths { ixs_rad = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrStraznikDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:~*/
	interface GReaderPrrStraznikDto {
		/**DBCOLUMN:Straznici.Id*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Straznici.Nazev*/
		ginsfun_nazev_rf?: string|null;
		/**DBCOLUMN:Straznici.Nazev-referenta*/
		ginsfun_nazev_ref?: string|null;
		/**DBCOLUMN:Straznici.Nazev-funkce*/
		ginsfun_nazev?: string|null;
	}
	const enum GReaderPrrStraznikDtoNames { ixs_fun = "ixs_fun", ginsfun_nazev_rf = "ginsfun_nazev_rf", ginsfun_nazev_ref = "ginsfun_nazev_ref", ginsfun_nazev = "ginsfun_nazev",}
	const enum GReaderPrrStraznikDtoFragments { ixs_fun = "*", ginsfun_nazev_rf = "*", ginsfun_nazev_ref = "*", ginsfun_nazev = "*",}
	const enum GReaderPrrStraznikDtoTypes { ixs_fun = "string", ginsfun_nazev_rf = "string", ginsfun_nazev_ref = "string", ginsfun_nazev = "string",}
	const enum GReaderPrrStraznikDtoTypeLengths { ixs_fun = 12, ginsfun_nazev_rf = 50, ginsfun_nazev_ref = 50, ginsfun_nazev = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrsudmDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsudm*/
	interface GReaderPrrsudmDto {
		/**DBCOLUMN:prrsudm.ixs_udm*/
		ixs_udm?: string|null;
		/**DBCOLUMN:prrsudm.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsudm.ixs_cud*/
		ixs_cud?: string|null;
		/**DBCOLUMN:prrsudm.ixs_skt*/
		ixs_skt?: string|null;
		/**DBCOLUMN:prrsskt.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:prrsudm.nazev*/
		prrscud_nazev?: string|null;
		/**DBCOLUMN:prrsudm.aktivita*/
		aktivita?: number|null;
	}
	const enum GReaderPrrsudmDtoNames { ixs_udm = "ixs_udm", nazev = "nazev", ixs_cud = "ixs_cud", ixs_skt = "ixs_skt", ixs_pri = "ixs_pri", prrscud_nazev = "prrscud_nazev", aktivita = "aktivita",}
	const enum GReaderPrrsudmDtoFragments { ixs_udm = "*", nazev = "*", ixs_cud = "*", ixs_skt = "*", ixs_pri = "*", prrscud_nazev = "*", aktivita = "*",}
	const enum GReaderPrrsudmDtoTypes { ixs_udm = "string", nazev = "string", ixs_cud = "string", ixs_skt = "string", ixs_pri = "string", prrscud_nazev = "string", aktivita = "number",}
	const enum GReaderPrrsudmDtoTypeLengths { ixs_udm = 12, nazev = 254, ixs_cud = 12, ixs_skt = 12, ixs_pri = 12, prrscud_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrTovarniZnackaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrstzv*/
	interface GReaderPrrTovarniZnackaDto {
		/**Identifikátor*/
		ixs_tzv?: string|null;
		/**Typ vozidla*/
		typ_tvo?: number|null;
		/**DBCOLUMN:prrstzv.popis*/
		popis?: string|null;
		/**DBCOLUMN:prrstzv.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrstzv.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrstzv.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrstzv.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Aktivita txt*/
		aktivita_txt?: string|null;
	}
	const enum GReaderPrrTovarniZnackaDtoNames { ixs_tzv = "ixs_tzv", typ_tvo = "typ_tvo", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita_txt = "aktivita_txt",}
	const enum GReaderPrrTovarniZnackaDtoFragments { ixs_tzv = "*", typ_tvo = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", aktivita_txt = "*",}
	const enum GReaderPrrTovarniZnackaDtoTypes { ixs_tzv = "string", typ_tvo = "number", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita_txt = "string",}
	const enum GReaderPrrTovarniZnackaDtoTypeLengths { ixs_tzv = 12, popis = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrTypReseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrcuda*/
	interface GReaderPrrTypReseniDto {
		/**DBCOLUMN:prrcuda.typ_uda*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrcuda.typ_uda_txt*/
		typ_uda_txt?: string|null;
		/**DBCOLUMN:prrcuda.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:prrcuda.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:prrcuda.stav_rize*/
		stav_rize?: number|null;
		/**DBCOLUMN:prrcuda.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:prrcuda.s_prr*/
		s_prr?: number|null;
		/**DBCOLUMN:prrcuda.s_prm*/
		s_prm?: number|null;
	}
	const enum GReaderPrrTypReseniDtoNames { typ_uda = "typ_uda", typ_uda_txt = "typ_uda_txt", k_v = "k_v", k_s = "k_s", stav_rize = "stav_rize", k_xml = "k_xml", s_prr = "s_prr", s_prm = "s_prm",}
	const enum GReaderPrrTypReseniDtoFragments { typ_uda = "*", typ_uda_txt = "*", k_v = "*", k_s = "*", stav_rize = "*", k_xml = "*", s_prr = "*", s_prm = "*",}
	const enum GReaderPrrTypReseniDtoTypes { typ_uda = "number", typ_uda_txt = "string", k_v = "number", k_s = "string", stav_rize = "number", k_xml = "string", s_prr = "number", s_prm = "number",}
	const enum GReaderPrrTypReseniDtoTypeLengths { typ_uda_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrTypSkutkuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsuts*/
	interface GReaderPrrTypSkutkuDto {
		/**DBCOLUMN:prrsuts.ixs_uts*/
		ixs_uts?: string|null;
		/**DBCOLUMN:prrsuts.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsuts.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsuts.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsuts.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrsuts.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:prrsuts.s_mp*/
		s_mp?: number|null;
		/**DBCOLUMN:prrsuts.ico*/
		ico?: string|null;
	}
	const enum GReaderPrrTypSkutkuDtoNames { ixs_uts = "ixs_uts", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_mp = "s_mp", ico = "ico",}
	const enum GReaderPrrTypSkutkuDtoFragments { ixs_uts = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", s_mp = "*", ico = "*",}
	const enum GReaderPrrTypSkutkuDtoTypes { ixs_uts = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_mp = "number", ico = "string",}
	const enum GReaderPrrTypSkutkuDtoTypeLengths { ixs_uts = 12, nazev = 254, poznamka = 254, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderPrrTypUcastinkaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrcuca*/
	interface GReaderPrrTypUcastinkaDto {
		/**DBCOLUMN:prrcuca.typ_uca*/
		typ_uca?: number|null;
		/**DBCOLUMN:prrcuca.typ_uca_txt*/
		typ_uca_txt?: string|null;
		/**DBCOLUMN:prrcuca.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:prrcuca.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:prrcuca.k_xml*/
		k_xml?: string|null;
	}
	const enum GReaderPrrTypUcastinkaDtoNames { typ_uca = "typ_uca", typ_uca_txt = "typ_uca_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GReaderPrrTypUcastinkaDtoFragments { typ_uca = "*", typ_uca_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GReaderPrrTypUcastinkaDtoTypes { typ_uca = "number", typ_uca_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GReaderPrrTypUcastinkaDtoTypeLengths { typ_uca_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\Cis\Dto\GReaderSprcsprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**GReaderSprcsprDto*/
	interface GReaderSprcsprDto {
		/**Autogenerated.*/
		spr?: number|null;
		/**Autogenerated.*/
		spr_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		k_s?: string|null;
	}
	const enum GReaderSprcsprDtoNames { spr = "spr", spr_txt = "spr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderSprcsprDtoFragments { spr = "*", spr_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderSprcsprDtoTypes { spr = "number", spr_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderSprcsprDtoTypeLengths { spr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\GPrrZonyPlacenehoStaniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:zpsskar*/
	interface GPrrZonyPlacenehoStaniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:zpsskar.ixs_kar*/
		ixs_kar?: string|null;
		/**DBCOLUMN:zpsskar.ixs_sub*/
		ixs_sub?: string|null;
		/**DBCOLUMN:zpsskar.cislo_karty*/
		cislo_karty?: string|null;
		/**DBCOLUMN:zpsskar.cislo_cipu*/
		cislo_cipu?: string|null;
		/**DBCOLUMN:zpsskar.vlastnik*/
		vlastnik?: string|null;
		/**DBCOLUMN:zpsskar.typ_vlastnika*/
		typ_vlastnika?: number|null;
		/**DBCOLUMN:zpsskar.cislo_dokladu*/
		cislo_dokladu?: string|null;
		/**DBCOLUMN:zpsskar.typ_pruk*/
		typ_pruk?: number|null;
		/**DBCOLUMN:zpsskar.typ_karty*/
		typ_karty?: number|null;
		/**DBCOLUMN:zpsskar.stav_karty*/
		stav_karty?: number|null;
		/**DBCOLUMN:zpsskar.platnost*/
		platnost?: string|null;
		/**DBCOLUMN:zpsskar.platnost_od*/
		platnost_od?: JsonDate|null;
		/**DBCOLUMN:zpsskar.platnost_do*/
		platnost_do?: JsonDate|null;
		/**DBCOLUMN:zpsskar.datum_zcizeni*/
		datum_zcizeni?: JsonDate|null;
		/**DBCOLUMN:zpsskar.datum_vraceni*/
		datum_vraceni?: JsonDate|null;
		/**DBCOLUMN:zpsskar.datum_storna*/
		datum_storna?: JsonDate|null;
		/**DBCOLUMN:zpsskar.duvod_storna*/
		duvod_storna?: string|null;
		/**DBCOLUMN:ginsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:robcpru.typ_pruk_txt*/
		typ_pruk_txt?: string|null;
		/**DBCOLUMN:zpsstka.popis*/
		typ_karty_String?: string|null;
		/**DBCOLUMN:zpscstk.stav_karty_txt*/
		stav_karty_txt?: string|null;
		/**DBCOLUMN:zpsspka.popis*/
		platnost_String?: string|null;
		/**DBCOLUMN:zpsskar.typ_vlastnika*/
		typ_vlastnika_String?: string|null;
	}
	const enum GPrrZonyPlacenehoStaniDtoNames { ixs_kar = "ixs_kar", ixs_sub = "ixs_sub", cislo_karty = "cislo_karty", cislo_cipu = "cislo_cipu", vlastnik = "vlastnik", typ_vlastnika = "typ_vlastnika", cislo_dokladu = "cislo_dokladu", typ_pruk = "typ_pruk", typ_karty = "typ_karty", stav_karty = "stav_karty", platnost = "platnost", platnost_od = "platnost_od", platnost_do = "platnost_do", datum_zcizeni = "datum_zcizeni", datum_vraceni = "datum_vraceni", datum_storna = "datum_storna", duvod_storna = "duvod_storna", ixs_esu = "ixs_esu", esu_txt = "esu_txt", typ_pruk_txt = "typ_pruk_txt", typ_karty_String = "typ_karty_String", stav_karty_txt = "stav_karty_txt", platnost_String = "platnost_String", typ_vlastnika_String = "typ_vlastnika_String", Permissions = "Permissions",}
	const enum GPrrZonyPlacenehoStaniDtoFragments { ixs_kar = "*", ixs_sub = "*", cislo_karty = "*", cislo_cipu = "*", vlastnik = "*", typ_vlastnika = "*", cislo_dokladu = "*", typ_pruk = "*", typ_karty = "*", stav_karty = "*", platnost = "*", platnost_od = "*", platnost_do = "*", datum_zcizeni = "*", datum_vraceni = "*", datum_storna = "*", duvod_storna = "*", ixs_esu = "*", esu_txt = "*", typ_pruk_txt = "*", typ_karty_String = "*", stav_karty_txt = "*", platnost_String = "*", typ_vlastnika_String = "*", Permissions = "*",}
	const enum GPrrZonyPlacenehoStaniDtoTypes { ixs_kar = "string", ixs_sub = "string", cislo_karty = "string", cislo_cipu = "string", vlastnik = "string", typ_vlastnika = "number", cislo_dokladu = "string", typ_pruk = "number", typ_karty = "number", stav_karty = "number", platnost = "string", platnost_od = "JsonDate", platnost_do = "JsonDate", datum_zcizeni = "JsonDate", datum_vraceni = "JsonDate", datum_storna = "JsonDate", duvod_storna = "string", ixs_esu = "string", esu_txt = "string", typ_pruk_txt = "string", typ_karty_String = "string", stav_karty_txt = "string", platnost_String = "string", typ_vlastnika_String = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrZonyPlacenehoStaniDtoTypeLengths { ixs_kar = 12, ixs_sub = 12, cislo_karty = 30, cislo_cipu = 10, vlastnik = 60, cislo_dokladu = 40, platnost = 1, duvod_storna = 254, ixs_esu = 12, esu_txt = 254, typ_pruk_txt = 50, typ_karty_String = 100, stav_karty_txt = 50, platnost_String = 100, typ_vlastnika_String = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrCastkaUdalostiDenikuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvrck*/
	interface GPrrCastkaUdalostiDenikuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrvrck.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrvrck.typ_uda*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrvrck.typ_pla*/
		typ_pla?: number|null;
		/**DBCOLUMN:prrvrck.castka*/
		castka?: JsonDecimal|null;
		/**DBCOLUMN:prrvrck.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvrck.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvrck.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrvrck.zmenu_prov*/
		zmenu_prov?: string|null;
		/**typ_uda_txt*/
		typ_uda_txt?: string|null;
		/**typ_pla_txt*/
		typ_pla_txt?: string|null;
	}
	const enum GPrrCastkaUdalostiDenikuDtoNames { ixs_rad = "ixs_rad", typ_uda = "typ_uda", typ_pla = "typ_pla", castka = "castka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_uda_txt = "typ_uda_txt", typ_pla_txt = "typ_pla_txt", Permissions = "Permissions",}
	const enum GPrrCastkaUdalostiDenikuDtoFragments { ixs_rad = "*", typ_uda = "*", typ_pla = "*", castka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_uda_txt = "*", typ_pla_txt = "*", Permissions = "*",}
	const enum GPrrCastkaUdalostiDenikuDtoTypes { ixs_rad = "string", typ_uda = "number", typ_pla = "number", castka = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_uda_txt = "string", typ_pla_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrCastkaUdalostiDenikuDtoTypeLengths { ixs_rad = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrDenikDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsrad*/
	interface GPrrDenikDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrsrad.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrsrad.lic*/
		lic?: string|null;
		/**DBCOLUMN:prrsrad.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsrad.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsrad.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:prrsrad.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:prrsrad.ico*/
		ico?: string|null;
		/**DBCOLUMN:prrsrad.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:prrsrad.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsrad.rok*/
		rok?: number|null;
		/**DBCOLUMN:prrsrad.format_ac*/
		format_ac?: string|null;
		/**DBCOLUMN:prrsrad.por_cislo_max*/
		por_cislo_max?: number|null;
		/**DBCOLUMN:prrsrad.subrada_max*/
		subrada_max?: number|null;
		/**DBCOLUMN:prrsrad.len_ac*/
		len_ac?: number|null;
		/**DBCOLUMN:prrsrad.ac_cislo_od*/
		ac_cislo_od?: number|null;
		/**DBCOLUMN:prrsrad.ac_cislo_do*/
		ac_cislo_do?: number|null;
		/**DBCOLUMN:prrsrad.ac_cislo_max*/
		ac_cislo_max?: number|null;
		/**DBCOLUMN:prrsrad.typ_phl_pok*/
		typ_phl_pok?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_nak*/
		typ_phl_nak?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ppok*/
		typ_phl_ppok?: string|null;
		/**DBCOLUMN:prrsrad.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrsrad.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:prrsrad.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:prrsrad.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:prrsrad.typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:prrsrad.ixp_den_ddp*/
		ixp_den_ddp?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ddp*/
		typ_phl_ddp?: string|null;
		/**DBCOLUMN:prrsrad.ixs_pok_zav*/
		ixs_pok_zav?: string|null;
		/**DBCOLUMN:prrsrad.ixs_fun_pok_zav*/
		ixs_fun_pok_zav?: string|null;
		/**DBCOLUMN:prrsrad.ixs_kon_pok_zav*/
		ixs_kon_pok_zav?: string|null;
		/**DBCOLUMN:prrsrad.ixp_den_ddp_pok*/
		ixp_den_ddp_pok?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ddp_pok*/
		typ_phl_ddp_pok?: string|null;
		/**DBCOLUMN:prrsrad.ixp_den_ddp_nak*/
		ixp_den_ddp_nak?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ddp_nak*/
		typ_phl_ddp_nak?: string|null;
		/**DBCOLUMN:prrsrad.ixp_den_ddp_pop*/
		ixp_den_ddp_pop?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ddp_pop*/
		typ_phl_ddp_pop?: string|null;
		/**DBCOLUMN:prrsrad.spr*/
		spr?: number|null;
		/**DBCOLUMN:prrsrad.ixs_zmp_ddp*/
		ixs_zmp_ddp?: string|null;
		/**DBCOLUMN:prrsrad.ixp_den_ddp_pmn*/
		ixp_den_ddp_pmn?: string|null;
		/**DBCOLUMN:prrsrad.typ_phl_ddp_pmn*/
		typ_phl_ddp_pmn?: string|null;
		/**DBCOLUMN:prrsrad.arch_cis_max*/
		arch_cis_max?: number|null;
		/**DBCOLUMN:prrsrad.vs*/
		vs?: string|null;
		/**DBCOLUMN:prrsrad.filtr_frm_vyzv*/
		filtr_frm_vyzv?: string|null;
		/**DBCOLUMN:prrsrad.format_par*/
		format_par?: string|null;
		/**DBCOLUMN:prrsrad.s_ddp_pripad*/
		s_ddp_pripad?: number|null;
		/**DBCOLUMN:prrsrad.s_ddp_predpis*/
		s_ddp_predpis?: number|null;
		/**DBCOLUMN:prrsrad.format_ss*/
		format_ss?: string|null;
		/**DBCOLUMN:prrsrad.por_cislo_ss*/
		por_cislo_ss?: number|null;
		/**DBCOLUMN:prrsrad.ktg_upo_pok*/
		ktg_upo_pok?: number|null;
		/**DBCOLUMN:prrsrad.ktg_upo_nak*/
		ktg_upo_nak?: number|null;
		/**DBCOLUMN:prrsrad.ktg_upo_pop*/
		ktg_upo_pop?: number|null;
		/**DBCOLUMN:prrsrad.ktg_upo_pmn*/
		ktg_upo_pmn?: number|null;
		/**DBCOLUMN:prrsrad.s_povest*/
		s_povest?: number|null;
		/**DBCOLUMN:prrsrad.sablona_ws*/
		sablona_ws?: string|null;
		/**Vazba na aktuální deník*/
		ixs_rad_akt?: string|null;
		/**DBCOLUMN:prrsrad.ktg_upo_nev
		*     Typ pohledávky pro nevratitelný přeplatek
		*/
		ktg_upo_nev?: number|null;
		/**DBCOLUMN:prrsrad.ixs_uts_vychozi
		*     Typ výchozí skutku na deníku
		*/
		ixs_uts_vychozi?: string|null;
		/**Pověst - bool*/
		povest?: boolean|null;
		/**DBCOLUMN:ixs_fun_ddp*/
		ixs_fun_ddp?: string|null;
	}
	const enum GPrrDenikDtoNames { ixs_rad = "ixs_rad", lic = "lic", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", format_ac = "format_ac", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", ac_cislo_od = "ac_cislo_od", ac_cislo_do = "ac_cislo_do", ac_cislo_max = "ac_cislo_max", typ_phl_pok = "typ_phl_pok", typ_phl_nak = "typ_phl_nak", typ_phl_ppok = "typ_phl_ppok", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", ixs_orj = "ixs_orj", typ_den = "typ_den", ixp_den_ddp = "ixp_den_ddp", typ_phl_ddp = "typ_phl_ddp", ixs_pok_zav = "ixs_pok_zav", ixs_fun_pok_zav = "ixs_fun_pok_zav", ixs_kon_pok_zav = "ixs_kon_pok_zav", ixp_den_ddp_pok = "ixp_den_ddp_pok", typ_phl_ddp_pok = "typ_phl_ddp_pok", ixp_den_ddp_nak = "ixp_den_ddp_nak", typ_phl_ddp_nak = "typ_phl_ddp_nak", ixp_den_ddp_pop = "ixp_den_ddp_pop", typ_phl_ddp_pop = "typ_phl_ddp_pop", spr = "spr", ixs_zmp_ddp = "ixs_zmp_ddp", ixp_den_ddp_pmn = "ixp_den_ddp_pmn", typ_phl_ddp_pmn = "typ_phl_ddp_pmn", arch_cis_max = "arch_cis_max", vs = "vs", filtr_frm_vyzv = "filtr_frm_vyzv", format_par = "format_par", s_ddp_pripad = "s_ddp_pripad", s_ddp_predpis = "s_ddp_predpis", format_ss = "format_ss", por_cislo_ss = "por_cislo_ss", ktg_upo_pok = "ktg_upo_pok", ktg_upo_nak = "ktg_upo_nak", ktg_upo_pop = "ktg_upo_pop", ktg_upo_pmn = "ktg_upo_pmn", s_povest = "s_povest", sablona_ws = "sablona_ws", ixs_rad_akt = "ixs_rad_akt", ktg_upo_nev = "ktg_upo_nev", ixs_uts_vychozi = "ixs_uts_vychozi", povest = "povest", ixs_fun_ddp = "ixs_fun_ddp", Permissions = "Permissions",}
	const enum GPrrDenikDtoFragments { ixs_rad = "*", lic = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", format_ac = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", ac_cislo_od = "*", ac_cislo_do = "*", ac_cislo_max = "*", typ_phl_pok = "*", typ_phl_nak = "*", typ_phl_ppok = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", ixs_orj = "*", typ_den = "*", ixp_den_ddp = "*", typ_phl_ddp = "*", ixs_pok_zav = "*", ixs_fun_pok_zav = "*", ixs_kon_pok_zav = "*", ixp_den_ddp_pok = "*", typ_phl_ddp_pok = "*", ixp_den_ddp_nak = "*", typ_phl_ddp_nak = "*", ixp_den_ddp_pop = "*", typ_phl_ddp_pop = "*", spr = "*", ixs_zmp_ddp = "*", ixp_den_ddp_pmn = "*", typ_phl_ddp_pmn = "*", arch_cis_max = "*", vs = "*", filtr_frm_vyzv = "*", format_par = "*", s_ddp_pripad = "*", s_ddp_predpis = "*", format_ss = "*", por_cislo_ss = "*", ktg_upo_pok = "*", ktg_upo_nak = "*", ktg_upo_pop = "*", ktg_upo_pmn = "*", s_povest = "*", sablona_ws = "*", ixs_rad_akt = "*", ktg_upo_nev = "*", ixs_uts_vychozi = "*", povest = "*", ixs_fun_ddp = "*", Permissions = "*",}
	const enum GPrrDenikDtoTypes { ixs_rad = "string", lic = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", format_ac = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", ac_cislo_od = "number", ac_cislo_do = "number", ac_cislo_max = "number", typ_phl_pok = "string", typ_phl_nak = "string", typ_phl_ppok = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", ixs_orj = "string", typ_den = "number", ixp_den_ddp = "string", typ_phl_ddp = "string", ixs_pok_zav = "string", ixs_fun_pok_zav = "string", ixs_kon_pok_zav = "string", ixp_den_ddp_pok = "string", typ_phl_ddp_pok = "string", ixp_den_ddp_nak = "string", typ_phl_ddp_nak = "string", ixp_den_ddp_pop = "string", typ_phl_ddp_pop = "string", spr = "number", ixs_zmp_ddp = "string", ixp_den_ddp_pmn = "string", typ_phl_ddp_pmn = "string", arch_cis_max = "number", vs = "string", filtr_frm_vyzv = "string", format_par = "string", s_ddp_pripad = "number", s_ddp_predpis = "number", format_ss = "string", por_cislo_ss = "number", ktg_upo_pok = "number", ktg_upo_nak = "number", ktg_upo_pop = "number", ktg_upo_pmn = "number", s_povest = "number", sablona_ws = "string", ixs_rad_akt = "string", ktg_upo_nev = "number", ixs_uts_vychozi = "string", povest = "boolean", ixs_fun_ddp = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrDenikDtoTypeLengths { ixs_rad = 12, lic = 4, poznamka = 254, ico = 10, ucs = 10, nazev = 50, format_ac = 50, typ_phl_pok = 4, typ_phl_nak = 4, typ_phl_ppok = 4, zmenu_prov = 12, zkratka = 20, ixs_orj = 12, ixp_den_ddp = 12, typ_phl_ddp = 4, ixs_pok_zav = 12, ixs_fun_pok_zav = 12, ixs_kon_pok_zav = 12, ixp_den_ddp_pok = 12, typ_phl_ddp_pok = 4, ixp_den_ddp_nak = 12, typ_phl_ddp_nak = 4, ixp_den_ddp_pop = 12, typ_phl_ddp_pop = 4, ixs_zmp_ddp = 12, ixp_den_ddp_pmn = 12, typ_phl_ddp_pmn = 4, vs = 12, filtr_frm_vyzv = 254, format_par = 254, format_ss = 254, sablona_ws = 20, ixs_fun_ddp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrDukazDenikuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsdkz*/
	interface GPrrDukazDenikuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrsdkz.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrsdkz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:prrsdkz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsdkz.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:prrsdkz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsdkz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsdkz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrsdkz.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GPrrDukazDenikuDtoNames { ixs_rad = "ixs_rad", por_cislo = "por_cislo", nazev = "nazev", poradi = "poradi", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GPrrDukazDenikuDtoFragments { ixs_rad = "*", por_cislo = "*", nazev = "*", poradi = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GPrrDukazDenikuDtoTypes { ixs_rad = "string", por_cislo = "number", nazev = "string", poradi = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrDukazDenikuDtoTypeLengths { ixs_rad = 12, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrFormularDenikuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvrad*/
	interface GPrrFormularDenikuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrvrad.sablona*/
		sablona?: string|null;
		/**DBCOLUMN:prrvrad.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrvrad.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvrad.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvrad.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrvrad.zmenu_prov*/
		zmenu_prov?: string|null;
		/**prrsrad_nazev*/
		prrsrad_nazev?: string|null;
		/**prrsfrm_nazev*/
		prrsfrm_nazev?: string|null;
	}
	const enum GPrrFormularDenikuDtoNames { sablona = "sablona", ixs_rad = "ixs_rad", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prrsrad_nazev = "prrsrad_nazev", prrsfrm_nazev = "prrsfrm_nazev", Permissions = "Permissions",}
	const enum GPrrFormularDenikuDtoFragments { sablona = "*", ixs_rad = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prrsrad_nazev = "*", prrsfrm_nazev = "*", Permissions = "*",}
	const enum GPrrFormularDenikuDtoTypes { sablona = "string", ixs_rad = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prrsrad_nazev = "string", prrsfrm_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrFormularDenikuDtoTypeLengths { sablona = 20, ixs_rad = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrFormularDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrsfrm*/
	interface GPrrFormularDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrsfrm.sablona*/
		sablona?: string|null;
		/**DBCOLUMN:prrsfrm.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:prrsfrm.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrsfrm.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrsfrm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsfrm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrsfrm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:prrsfrm.umisteni*/
		umisteni?: number|null;
		/**DBCOLUMN:prrsfrm.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:prrsfrm.s_frm*/
		s_frm?: number|null;
		/**DBCOLUMN:prrsfrm.s_mp*/
		s_mp?: number|null;
		/**DBCOLUMN:prrsfrm.s_obecny*/
		s_obecny?: number|null;
		/**DBCOLUMN:prrsfrm.s_vse_den*/
		s_vse_den?: number|null;
		/**DBCOLUMN:prrsfrm.s_pdf*/
		s_pdf?: number|null;
		/**DBCOLUMN:prrsfrm.s_podpis*/
		s_podpis?: number|null;
		/**DBCOLUMN:prrsfrm.ico*/
		ico?: string|null;
		/**Aktivita TXT*/
		aktivita_txt?: string|null;
		/**Šablona původní*/
		sablona_puvodni?: string|null;
		/**Aktivita skupiny*/
		prrvsku_aktivita?: number|null;
		/**Aktivita skupiny - TXT*/
		prrvsku_aktivita_txt?: string|null;
		/**FRM - filename*/
		ginsfrm_file_name?: string|null;
		/**FRM - ixs_xme*/
		ginsfrm_ixs_xme?: string|null;
		/**FRM - název*/
		ginsfrm_nazev?: string|null;
		/**Identifikátor skupiny*/
		ixs_sku?: string|null;
		/**Formát skupiny*/
		ginsfrm_format_skup?: string|null;
		/**Šablona TXT*/
		sablona_txt?: string|null;
		/**Šablona FRM*/
		sablona_frm?: string|null;
		/**PDF*/
		pdf?: boolean|null;
		/**Podepsat*/
		podpis?: boolean|null;
		/**Obecny*/
		obecny?: boolean|null;
		/**Vse den*/
		vse_den?: boolean|null;
	}
	const enum GPrrFormularDtoNames { sablona = "sablona", ixs_typ = "ixs_typ", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", umisteni = "umisteni", ktg_typ = "ktg_typ", s_frm = "s_frm", s_mp = "s_mp", s_obecny = "s_obecny", s_vse_den = "s_vse_den", s_pdf = "s_pdf", s_podpis = "s_podpis", ico = "ico", aktivita_txt = "aktivita_txt", sablona_puvodni = "sablona_puvodni", prrvsku_aktivita = "prrvsku_aktivita", prrvsku_aktivita_txt = "prrvsku_aktivita_txt", ginsfrm_file_name = "ginsfrm_file_name", ginsfrm_ixs_xme = "ginsfrm_ixs_xme", ginsfrm_nazev = "ginsfrm_nazev", ixs_sku = "ixs_sku", ginsfrm_format_skup = "ginsfrm_format_skup", sablona_txt = "sablona_txt", sablona_frm = "sablona_frm", pdf = "pdf", podpis = "podpis", obecny = "obecny", vse_den = "vse_den", Permissions = "Permissions",}
	const enum GPrrFormularDtoFragments { sablona = "*", ixs_typ = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", umisteni = "*", ktg_typ = "*", s_frm = "*", s_mp = "*", s_obecny = "*", s_vse_den = "*", s_pdf = "*", s_podpis = "*", ico = "*", aktivita_txt = "*", sablona_puvodni = "*", prrvsku_aktivita = "*", prrvsku_aktivita_txt = "*", ginsfrm_file_name = "*", ginsfrm_ixs_xme = "*", ginsfrm_nazev = "*", ixs_sku = "*", ginsfrm_format_skup = "*", sablona_txt = "*", sablona_frm = "*", pdf = "*", podpis = "*", obecny = "*", vse_den = "*", Permissions = "*",}
	const enum GPrrFormularDtoTypes { sablona = "string", ixs_typ = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", umisteni = "number", ktg_typ = "number", s_frm = "number", s_mp = "number", s_obecny = "number", s_vse_den = "number", s_pdf = "number", s_podpis = "number", ico = "string", aktivita_txt = "string", sablona_puvodni = "string", prrvsku_aktivita = "number", prrvsku_aktivita_txt = "string", ginsfrm_file_name = "string", ginsfrm_ixs_xme = "string", ginsfrm_nazev = "string", ixs_sku = "string", ginsfrm_format_skup = "string", sablona_txt = "string", sablona_frm = "string", pdf = "boolean", podpis = "boolean", obecny = "boolean", vse_den = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrFormularDtoTypeLengths { sablona = 20, ixs_typ = 12, nazev = 254, poznamka = 50, zmenu_prov = 12, ico = 10, sablona_puvodni = 20, ginsfrm_file_name = 254, ginsfrm_ixs_xme = 12, ginsfrm_nazev = 100, ixs_sku = 12, ginsfrm_format_skup = 3, sablona_txt = 20, sablona_frm = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrFormularTypUdalostiDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvfrm*/
	interface GPrrFormularTypUdalostiDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrvfrm.sablona*/
		sablona?: string|null;
		/**DBCOLUMN:prrvfrm.typ_uda*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrvfrm.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvfrm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrsfrm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrsfrm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Typ uda TXT*/
		typ_uda_txt?: string|null;
	}
	const enum GPrrFormularTypUdalostiDtoNames { sablona = "sablona", typ_uda = "typ_uda", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_uda_txt = "typ_uda_txt", Permissions = "Permissions",}
	const enum GPrrFormularTypUdalostiDtoFragments { sablona = "*", typ_uda = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_uda_txt = "*", Permissions = "*",}
	const enum GPrrFormularTypUdalostiDtoTypes { sablona = "string", typ_uda = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_uda_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrFormularTypUdalostiDtoTypeLengths { sablona = 20, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Administrace\GPrrPovoleniDenikuDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvrfu*/
	interface GPrrPovoleniDenikuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrvrfu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:prrvrfu.ixs_rad*/
		ixs_rad?: string|null;
		/**DBCOLUMN:prrvrfu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvrfu.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:prrvrfu.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:prrvrfu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrvrfu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:prrvrfu.s_pristup*/
		s_pristup?: number|null;
		/**ginsfun_nazev_ref*/
		ginsfun_nazev_ref?: string|null;
		/**ginsfun_nazev_rf*/
		ginsfun_nazev_rf?: string|null;
		/**prrsrad_nazev*/
		prrsrad_nazev?: string|null;
		/**prrsrad_rok*/
		prrsrad_rok?: number|null;
		/**ginsfun_nazev_ref*/
		ginsfun_nazev?: string|null;
		/**pouze_prohlizet*/
		pouze_prohlizet?: boolean|null;
	}
	const enum GPrrPovoleniDenikuDtoNames { ixs_fun = "ixs_fun", ixs_rad = "ixs_rad", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_pristup = "s_pristup", ginsfun_nazev_ref = "ginsfun_nazev_ref", ginsfun_nazev_rf = "ginsfun_nazev_rf", prrsrad_nazev = "prrsrad_nazev", prrsrad_rok = "prrsrad_rok", ginsfun_nazev = "ginsfun_nazev", pouze_prohlizet = "pouze_prohlizet", Permissions = "Permissions",}
	const enum GPrrPovoleniDenikuDtoFragments { ixs_fun = "*", ixs_rad = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", s_pristup = "*", ginsfun_nazev_ref = "*", ginsfun_nazev_rf = "*", prrsrad_nazev = "*", prrsrad_rok = "*", ginsfun_nazev = "*", pouze_prohlizet = "*", Permissions = "*",}
	const enum GPrrPovoleniDenikuDtoTypes { ixs_fun = "string", ixs_rad = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", s_pristup = "number", ginsfun_nazev_ref = "string", ginsfun_nazev_rf = "string", prrsrad_nazev = "string", prrsrad_rok = "number", ginsfun_nazev = "string", pouze_prohlizet = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrPovoleniDenikuDtoTypeLengths { ixs_fun = 12, ixs_rad = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ChybaVarovani\GPrrChybaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Pomocné dto pro obsluhu chyb*/
	interface GPrrChybaDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Kód chyby*/
		kod_chyby?: number|null;
		/**Text chyby*/
		text_chyby?: string|null;
	}
	const enum GPrrChybaDtoNames { kod_chyby = "kod_chyby", text_chyby = "text_chyby", Permissions = "Permissions",}
	const enum GPrrChybaDtoFragments { kod_chyby = "*", text_chyby = "*", Permissions = "*",}
	const enum GPrrChybaDtoTypes { kod_chyby = "number", text_chyby = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrChybaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ChybaVarovani\GPrrVarovaniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Pomocné dto pro obsluhu varování*/
	interface GPrrVarovaniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Kód varování*/
		kod_varovani?: number|null;
		/**Text varování*/
		text_varovani?: string|null;
	}
	const enum GPrrVarovaniDtoNames { kod_varovani = "kod_varovani", text_varovani = "text_varovani", Permissions = "Permissions",}
	const enum GPrrVarovaniDtoFragments { kod_varovani = "*", text_varovani = "*", Permissions = "*",}
	const enum GPrrVarovaniDtoTypes { kod_varovani = "number", text_varovani = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrVarovaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Cinnosti\GPrrUzivatelskaCinnostDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrscud*/
	interface GPrrUzivatelskaCinnostDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:prrscud.ixs_cud*/
		ixs_cud?: string|null;
		/**DBCOLUMN:prrscud.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrscud.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:prrscud.s_paragraf*/
		s_paragraf?: number|null;
		/**DBCOLUMN:prrscud.s_reseni*/
		s_reseni?: number|null;
		/**DBCOLUMN:prrscud.s_statistika*/
		s_statistika?: number|null;
		/**DBCOLUMN:prrscud.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrscud.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrscud.barva*/
		barva?: string|null;
		/**DBCOLUMN:prrscud.s_pripad*/
		s_pripad?: number|null;
		/**DBCOLUMN:prrscud.ixs_scn*/
		ixs_scn?: string|null;
		/**DBCOLUMN:prrscud.ixs_scn_nad*/
		ixs_scn_nad?: string|null;
		/**DBCOLUMN:prrscud.prrsscn_zkratka*/
		prrsscn_zkratka?: string|null;
		/**DBCOLUMN:prrscud.prrsscn_nazev*/
		prrsscn_nazev?: string|null;
		/**DBCOLUMN:prrscud.prrsscnnad_zkratka*/
		prrsscnnad_zkratka?: string|null;
		/**DBCOLUMN:prrscud.prrsscnnad_nazev*/
		prrsscnnad_nazev?: string|null;
	}
	const enum GPrrUzivatelskaCinnostDtoNames { ixs_cud = "ixs_cud", nazev = "nazev", zkratka = "zkratka", s_paragraf = "s_paragraf", s_reseni = "s_reseni", s_statistika = "s_statistika", poznamka = "poznamka", aktivita = "aktivita", barva = "barva", s_pripad = "s_pripad", ixs_scn = "ixs_scn", ixs_scn_nad = "ixs_scn_nad", prrsscn_zkratka = "prrsscn_zkratka", prrsscn_nazev = "prrsscn_nazev", prrsscnnad_zkratka = "prrsscnnad_zkratka", prrsscnnad_nazev = "prrsscnnad_nazev", Permissions = "Permissions",}
	const enum GPrrUzivatelskaCinnostDtoFragments { ixs_cud = "*", nazev = "*", zkratka = "*", s_paragraf = "*", s_reseni = "*", s_statistika = "*", poznamka = "*", aktivita = "*", barva = "*", s_pripad = "*", ixs_scn = "*", ixs_scn_nad = "*", prrsscn_zkratka = "*", prrsscn_nazev = "*", prrsscnnad_zkratka = "*", prrsscnnad_nazev = "*", Permissions = "*",}
	const enum GPrrUzivatelskaCinnostDtoTypes { ixs_cud = "string", nazev = "string", zkratka = "string", s_paragraf = "number", s_reseni = "number", s_statistika = "number", poznamka = "string", aktivita = "number", barva = "string", s_pripad = "number", ixs_scn = "string", ixs_scn_nad = "string", prrsscn_zkratka = "string", prrsscn_nazev = "string", prrsscnnad_zkratka = "string", prrsscnnad_nazev = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrUzivatelskaCinnostDtoTypeLengths { ixs_cud = 12, nazev = 254, zkratka = 50, poznamka = 254, barva = 10, ixs_scn = 12, ixs_scn_nad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Cinnosti\GPrrUzivatelskaCinnostKompletniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrscud*/
	interface GPrrUzivatelskaCinnostKompletniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Detail uživatelské události*/
		Cinnost?: Gordic.Prr.Interface.GPrrUzivatelskaCinnostDto|null;
		/**Seznam prestupků*/
		Prestupky?: Gordic.Prr.Interface.GPrrUzivatelskaCinnostPrestupekDto[]|null;
		/**Seznam porušení*/
		Poruseni?: Gordic.Prr.Interface.GPrrUzivatelskaCinnostPrestupekDto[]|null;
		/**Seznam řešení*/
		Reseni?: Gordic.Prr.Interface.GPrrUzivatelskaCinnostReseniDto[]|null;
	}
	const enum GPrrUzivatelskaCinnostKompletniDtoNames { Cinnost = "Cinnost", Prestupky = "Prestupky", Poruseni = "Poruseni", Reseni = "Reseni", Permissions = "Permissions",}
	const enum GPrrUzivatelskaCinnostKompletniDtoFragments { Cinnost = "*", Prestupky = "*", Poruseni = "*", Reseni = "*", Permissions = "*",}
	const enum GPrrUzivatelskaCinnostKompletniDtoTypes { Cinnost = "Gordic.Prr.Interface.GPrrUzivatelskaCinnostDto", Prestupky = "Gordic.Prr.Interface.GPrrUzivatelskaCinnostPrestupekDto[]", Poruseni = "Gordic.Prr.Interface.GPrrUzivatelskaCinnostPrestupekDto[]", Reseni = "Gordic.Prr.Interface.GPrrUzivatelskaCinnostReseniDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrUzivatelskaCinnostKompletniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Cinnosti\GPrrUzivatelskaCinnostPrestupekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvcud*/
	interface GPrrUzivatelskaCinnostPrestupekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:prrvcud.ixs_cud*/
		ixs_cud?: string|null;
		/**DBCOLUMN:prrvcud.ixs_zno*/
		ixs_zno?: string|null;
		/**DBCOLUMN:prrvcud.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvcud.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvcud.typ_zno*/
		typ_zno?: number|null;
		/**DBCOLUMN:prrvcud.ixs_zno_pre*/
		ixs_zno_pre?: string|null;
		/**DBCOLUMN:prrvcud.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrvcud.zakonik*/
		zakonik?: string|null;
		/**DBCOLUMN:prrvcud.rok*/
		rok?: number|null;
		/**DBCOLUMN:prrvcud.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:prrvcud.odstavec*/
		odstavec?: string|null;
		/**DBCOLUMN:prrvcud.pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:prrvcud.bod*/
		bod?: string|null;
		/**DBCOLUMN:prrvcud.obsah*/
		obsah?: string|null;
		/**DBCOLUMN:prrvcud.par_txt*/
		par_txt?: string|null;
		/**Pomocná hodnota pro počítání přestupku/Poruseni*/
		idPrestupku?: number|null;
	}
	const enum GPrrUzivatelskaCinnostPrestupekDtoNames { ixs_cud = "ixs_cud", ixs_zno = "ixs_zno", poznamka = "poznamka", aktivita = "aktivita", typ_zno = "typ_zno", ixs_zno_pre = "ixs_zno_pre", nazev = "nazev", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", obsah = "obsah", par_txt = "par_txt", idPrestupku = "idPrestupku", Permissions = "Permissions",}
	const enum GPrrUzivatelskaCinnostPrestupekDtoFragments { ixs_cud = "*", ixs_zno = "*", poznamka = "*", aktivita = "*", typ_zno = "*", ixs_zno_pre = "*", nazev = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", obsah = "*", par_txt = "*", idPrestupku = "*", Permissions = "*",}
	const enum GPrrUzivatelskaCinnostPrestupekDtoTypes { ixs_cud = "string", ixs_zno = "string", poznamka = "string", aktivita = "number", typ_zno = "number", ixs_zno_pre = "string", nazev = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", obsah = "string", par_txt = "string", idPrestupku = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrUzivatelskaCinnostPrestupekDtoTypeLengths { ixs_cud = 12, ixs_zno = 12, poznamka = 254, ixs_zno_pre = 12, nazev = 254, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Cinnosti\GPrrUzivatelskaCinnostReseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrvtud*/
	interface GPrrUzivatelskaCinnostReseniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:prrvtud.ixs_cud*/
		ixs_cud?: string|null;
		/**DBCOLUMN:prrvtud.typ_uda*/
		typ_uda?: number|null;
		/**DBCOLUMN:prrvtud.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrvtud.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrvtud.typ_uda_txt*/
		typ_uda_txt?: string|null;
	}
	const enum GPrrUzivatelskaCinnostReseniDtoNames { ixs_cud = "ixs_cud", typ_uda = "typ_uda", poznamka = "poznamka", aktivita = "aktivita", typ_uda_txt = "typ_uda_txt", Permissions = "Permissions",}
	const enum GPrrUzivatelskaCinnostReseniDtoFragments { ixs_cud = "*", typ_uda = "*", poznamka = "*", aktivita = "*", typ_uda_txt = "*", Permissions = "*",}
	const enum GPrrUzivatelskaCinnostReseniDtoTypes { ixs_cud = "string", typ_uda = "number", poznamka = "string", aktivita = "number", typ_uda_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrUzivatelskaCinnostReseniDtoTypeLengths { ixs_cud = 12, poznamka = 254, typ_uda_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrckprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrckpr*/
	interface GCrrckprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrckpr.klasifik*/
		klasifik?: number|null;
		/**DBCOLUMN:crrckpr.klasifik_txt*/
		klasifik_txt?: string|null;
		/**DBCOLUMN:crrckpr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:crrckpr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:crrckpr.k_xml*/
		k_xml?: string|null;
	}
	const enum GCrrckprDtoNames { klasifik = "klasifik", klasifik_txt = "klasifik_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GCrrckprDtoFragments { klasifik = "*", klasifik_txt = "*", k_v = "*", k_s = "*", k_xml = "*", Permissions = "*",}
	const enum GCrrckprDtoTypes { klasifik = "number", klasifik_txt = "string", k_v = "number", k_s = "string", k_xml = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrckprDtoTypeLengths { klasifik_txt = 100, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrctprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrctpr*/
	interface GCrrctprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrctpr.typ_pr*/
		typ_pr?: number|null;
		/**DBCOLUMN:crrctpr.typ_pr_txt*/
		typ_pr_txt?: string|null;
		/**DBCOLUMN:crrctpr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:crrctpr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:crrctpr.k_xml*/
		k_xml?: string|null;
	}
	const enum GCrrctprDtoNames { typ_pr = "typ_pr", typ_pr_txt = "typ_pr_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GCrrctprDtoFragments { typ_pr = "*", typ_pr_txt = "*", k_v = "*", k_s = "*", k_xml = "*", Permissions = "*",}
	const enum GCrrctprDtoTypes { typ_pr = "number", typ_pr_txt = "string", k_v = "number", k_s = "string", k_xml = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrctprDtoTypeLengths { typ_pr_txt = 100, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsbroDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsbro*/
	interface GCrrsbroDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsbro.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsbro.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsbro.skupiny*/
		skupiny?: string|null;
		/**DBCOLUMN:crrsbro.datum_od*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:crrsbro.datum_do*/
		datum_do?: JsonDate|null;
		/**DBCOLUMN:crrsbro.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsbro.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsbro.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsbro.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrsbroDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", skupiny = "skupiny", datum_od = "datum_od", datum_do = "datum_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrsbroDtoFragments { odpoved_id = "*", por_cislo = "*", skupiny = "*", datum_od = "*", datum_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrsbroDtoTypes { odpoved_id = "string", por_cislo = "number", skupiny = "string", datum_od = "JsonDate", datum_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsbroDtoTypeLengths { odpoved_id = 36, skupiny = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrscprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrscpr*/
	interface GCrrscprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrscpr.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrscpr.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrscpr.status*/
		status?: string|null;
		/**DBCOLUMN:crrscpr.cislo_cpr*/
		cislo_cpr?: string|null;
		/**DBCOLUMN:crrscpr.datum_vydani*/
		datum_vydani?: JsonDate|null;
		/**DBCOLUMN:crrscpr.datum_platnosti*/
		datum_platnosti?: JsonDate|null;
		/**DBCOLUMN:crrscpr.stat_naz*/
		stat_naz?: string|null;
		/**DBCOLUMN:crrscpr.stat_kod*/
		stat_kod?: number|null;
		/**DBCOLUMN:crrscpr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrscpr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrscpr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrscpr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrscprDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", cislo_cpr = "cislo_cpr", datum_vydani = "datum_vydani", datum_platnosti = "datum_platnosti", stat_naz = "stat_naz", stat_kod = "stat_kod", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrscprDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", cislo_cpr = "*", datum_vydani = "*", datum_platnosti = "*", stat_naz = "*", stat_kod = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrscprDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", cislo_cpr = "string", datum_vydani = "JsonDate", datum_platnosti = "JsonDate", stat_naz = "string", stat_kod = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrscprDtoTypeLengths { odpoved_id = 36, status = 100, cislo_cpr = 50, stat_naz = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsmprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsmpr*/
	interface GCrrsmprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsmpr.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsmpr.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsmpr.status*/
		status?: string|null;
		/**DBCOLUMN:crrsmpr.cislo_mpr*/
		cislo_mpr?: string|null;
		/**DBCOLUMN:crrsmpr.datum_vydani*/
		datum_vydani?: JsonDate|null;
		/**DBCOLUMN:crrsmpr.datum_platnosti*/
		datum_platnosti?: JsonDate|null;
		/**DBCOLUMN:crrsmpr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsmpr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsmpr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsmpr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrsmprDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", cislo_mpr = "cislo_mpr", datum_vydani = "datum_vydani", datum_platnosti = "datum_platnosti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrsmprDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", cislo_mpr = "*", datum_vydani = "*", datum_platnosti = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrsmprDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", cislo_mpr = "string", datum_vydani = "JsonDate", datum_platnosti = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsmprDtoTypeLengths { odpoved_id = 36, status = 100, cislo_mpr = 15, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsohkDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsohk*/
	interface GCrrsohkDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsohk.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsohk.por_cislo_opr*/
		por_cislo_opr?: number|null;
		/**DBCOLUMN:crrsohk.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsohk.kod*/
		kod?: string|null;
		/**DBCOLUMN:crrsohk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:crrsohk.popis*/
		popis?: string|null;
		/**DBCOLUMN:crrsohk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsohk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsohk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsohk.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrsohkDtoNames { odpoved_id = "odpoved_id", por_cislo_opr = "por_cislo_opr", por_cislo = "por_cislo", kod = "kod", nazev = "nazev", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrsohkDtoFragments { odpoved_id = "*", por_cislo_opr = "*", por_cislo = "*", kod = "*", nazev = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrsohkDtoTypes { odpoved_id = "string", por_cislo_opr = "number", por_cislo = "number", kod = "string", nazev = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsohkDtoTypeLengths { odpoved_id = 36, kod = 100, nazev = 100, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsoprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsopr*/
	interface GCrrsoprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsopr.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsopr.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsopr.status*/
		status?: string|null;
		/**DBCOLUMN:crrsopr.skupina*/
		skupina?: string|null;
		/**DBCOLUMN:crrsopr.datum_udeleni*/
		datum_udeleni?: JsonDate|null;
		/**DBCOLUMN:crrsopr.datum_platnosti*/
		datum_platnosti?: JsonDate|null;
		/**DBCOLUMN:crrsopr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsopr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsopr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsopr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Harmonizované kódy*/
		gCrrsohkDtos?: Gordic.Prr.Interface.GCrrsohkDto[]|null;
	}
	const enum GCrrsoprDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", skupina = "skupina", datum_udeleni = "datum_udeleni", datum_platnosti = "datum_platnosti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", gCrrsohkDtos = "gCrrsohkDtos", Permissions = "Permissions",}
	const enum GCrrsoprDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", skupina = "*", datum_udeleni = "*", datum_platnosti = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", gCrrsohkDtos = "*", Permissions = "*",}
	const enum GCrrsoprDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", skupina = "string", datum_udeleni = "JsonDate", datum_platnosti = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", gCrrsohkDtos = "Gordic.Prr.Interface.GCrrsohkDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsoprDtoTypeLengths { odpoved_id = 36, status = 100, skupina = 10, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsosoDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsoso*/
	interface GCrrsosoDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsoso.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsoso.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsoso.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:crrsoso.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:crrsoso.datum_narozeni*/
		datum_narozeni?: JsonDate|null;
		/**DBCOLUMN:crrsoso.urad_sidlo*/
		urad_sidlo?: string|null;
		/**DBCOLUMN:crrsoso.urad_kod*/
		urad_kod?: string|null;
		/**DBCOLUMN:crrsoso.urad_typ*/
		urad_typ?: string|null;
		/**DBCOLUMN:crrsoso.rodne_cislo*/
		rodne_cislo?: string|null;
		/**DBCOLUMN:crrsoso.rodne_prijmeni*/
		rodne_prijmeni?: string|null;
		/**DBCOLUMN:crrsoso.adr_okres*/
		adr_okres?: string|null;
		/**DBCOLUMN:crrsoso.adr_obec*/
		adr_obec?: string|null;
		/**DBCOLUMN:crrsoso.adr_cast_obce*/
		adr_cast_obce?: string|null;
		/**DBCOLUMN:crrsoso.adr_ulice*/
		adr_ulice?: string|null;
		/**DBCOLUMN:crrsoso.adr_cislo_domu*/
		adr_cislo_domu?: string|null;
		/**DBCOLUMN:crrsoso.adr_psc*/
		adr_psc?: string|null;
		/**DBCOLUMN:crrsoso.adr_stat*/
		adr_stat?: string|null;
		/**DBCOLUMN:crrsoso.adr_stat_kod*/
		adr_stat_kod?: number|null;
		/**DBCOLUMN:crrsoso.adr_kod_ruian*/
		adr_kod_ruian?: number|null;
		/**DBCOLUMN:crrsoso.adr_orp*/
		adr_orp?: string|null;
		/**DBCOLUMN:crrsoso.adr_druh_cd*/
		adr_druh_cd?: string|null;
		/**DBCOLUMN:crrsoso.adr_cor*/
		adr_cor?: number|null;
		/**DBCOLUMN:crrsoso.adr_znak_co*/
		adr_znak_co?: string|null;
		/**DBCOLUMN:crrsoso.adr_status*/
		adr_status?: string|null;
		/**DBCOLUMN:crrsoso.misto_nar_obec*/
		misto_nar_obec?: string|null;
		/**DBCOLUMN:crrsoso.misto_nar_okres*/
		misto_nar_okres?: string|null;
		/**DBCOLUMN:crrsoso.misto_nar_stat*/
		misto_nar_stat?: string|null;
		/**DBCOLUMN:crrsoso.misto_nar_stat_kod*/
		misto_nar_stat_kod?: number|null;
		/**DBCOLUMN:crrsoso.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:crrsoso.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsoso.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsoso.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsoso.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:crrsoso.stat_obc_nazev*/
		stat_obc_nazev?: string|null;
		/**DBCOLUMN:crrsoso.stat_obc_kod*/
		stat_obc_kod?: number|null;
		/**DBCOLUMN:crrsoso.s_ridic*/
		s_ridic?: number|null;
		/**DBCOLUMN:crrsoso.s_pripad*/
		s_pripad?: number|null;
		/**DBCOLUMN:crrsoso.s_blokace_ro*/
		s_blokace_ro?: number|null;
		/**DBCOLUMN:crrsoso.s_blokace_rp*/
		s_blokace_rp?: number|null;
		/**DBCOLUMN:crrsoso.s_zrmv*/
		s_zrmv?: number|null;
		/**DBCOLUMN:crrsoso.s_hk*/
		s_hk?: number|null;
		/**DBCOLUMN:crrsoso.s_mrp*/
		s_mrp?: number|null;
		/**DBCOLUMN:crrsoso.s_pprmv*/
		s_pprmv?: number|null;
	}
	const enum GCrrsosoDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", urad_sidlo = "urad_sidlo", urad_kod = "urad_kod", urad_typ = "urad_typ", rodne_cislo = "rodne_cislo", rodne_prijmeni = "rodne_prijmeni", adr_okres = "adr_okres", adr_obec = "adr_obec", adr_cast_obce = "adr_cast_obce", adr_ulice = "adr_ulice", adr_cislo_domu = "adr_cislo_domu", adr_psc = "adr_psc", adr_stat = "adr_stat", adr_stat_kod = "adr_stat_kod", adr_kod_ruian = "adr_kod_ruian", adr_orp = "adr_orp", adr_druh_cd = "adr_druh_cd", adr_cor = "adr_cor", adr_znak_co = "adr_znak_co", adr_status = "adr_status", misto_nar_obec = "misto_nar_obec", misto_nar_okres = "misto_nar_okres", misto_nar_stat = "misto_nar_stat", misto_nar_stat_kod = "misto_nar_stat_kod", ixs_esu = "ixs_esu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stat_obc_nazev = "stat_obc_nazev", stat_obc_kod = "stat_obc_kod", s_ridic = "s_ridic", s_pripad = "s_pripad", s_blokace_ro = "s_blokace_ro", s_blokace_rp = "s_blokace_rp", s_zrmv = "s_zrmv", s_hk = "s_hk", s_mrp = "s_mrp", s_pprmv = "s_pprmv", Permissions = "Permissions",}
	const enum GCrrsosoDtoFragments { odpoved_id = "*", por_cislo = "*", jmeno = "*", prijmeni = "*", datum_narozeni = "*", urad_sidlo = "*", urad_kod = "*", urad_typ = "*", rodne_cislo = "*", rodne_prijmeni = "*", adr_okres = "*", adr_obec = "*", adr_cast_obce = "*", adr_ulice = "*", adr_cislo_domu = "*", adr_psc = "*", adr_stat = "*", adr_stat_kod = "*", adr_kod_ruian = "*", adr_orp = "*", adr_druh_cd = "*", adr_cor = "*", adr_znak_co = "*", adr_status = "*", misto_nar_obec = "*", misto_nar_okres = "*", misto_nar_stat = "*", misto_nar_stat_kod = "*", ixs_esu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stat_obc_nazev = "*", stat_obc_kod = "*", s_ridic = "*", s_pripad = "*", s_blokace_ro = "*", s_blokace_rp = "*", s_zrmv = "*", s_hk = "*", s_mrp = "*", s_pprmv = "*", Permissions = "*",}
	const enum GCrrsosoDtoTypes { odpoved_id = "string", por_cislo = "number", jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", urad_sidlo = "string", urad_kod = "string", urad_typ = "string", rodne_cislo = "string", rodne_prijmeni = "string", adr_okres = "string", adr_obec = "string", adr_cast_obce = "string", adr_ulice = "string", adr_cislo_domu = "string", adr_psc = "string", adr_stat = "string", adr_stat_kod = "number", adr_kod_ruian = "number", adr_orp = "string", adr_druh_cd = "string", adr_cor = "number", adr_znak_co = "string", adr_status = "string", misto_nar_obec = "string", misto_nar_okres = "string", misto_nar_stat = "string", misto_nar_stat_kod = "number", ixs_esu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stat_obc_nazev = "string", stat_obc_kod = "number", s_ridic = "number", s_pripad = "number", s_blokace_ro = "number", s_blokace_rp = "number", s_zrmv = "number", s_hk = "number", s_mrp = "number", s_pprmv = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsosoDtoTypeLengths { odpoved_id = 36, jmeno = 100, prijmeni = 100, urad_sidlo = 254, urad_kod = 254, urad_typ = 254, rodne_cislo = 10, rodne_prijmeni = 100, adr_okres = 100, adr_obec = 100, adr_cast_obce = 100, adr_ulice = 100, adr_cislo_domu = 100, adr_psc = 100, adr_stat = 100, adr_orp = 254, adr_druh_cd = 10, adr_znak_co = 100, adr_status = 100, misto_nar_obec = 100, misto_nar_okres = 100, misto_nar_stat = 100, ixs_esu = 12, poznamka = 254, zmenu_prov = 12, stat_obc_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspoaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspoa*/
	interface GCrrspoaDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspoa.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspoa.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspoa.status*/
		status?: string|null;
		/**DBCOLUMN:crrspoa.cislo_osv*/
		cislo_osv?: string|null;
		/**DBCOLUMN:crrspoa.datum_vyd*/
		datum_vyd?: JsonDate|null;
		/**DBCOLUMN:crrspoa.datum_plat*/
		datum_plat?: JsonDate|null;
		/**DBCOLUMN:crrspoa.pro_skupiny*/
		pro_skupiny?: string|null;
		/**DBCOLUMN:crrspoa.jine*/
		jine?: string|null;
		/**DBCOLUMN:crrspoa.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspoa.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspoa.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspoa.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspoaDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", cislo_osv = "cislo_osv", datum_vyd = "datum_vyd", datum_plat = "datum_plat", pro_skupiny = "pro_skupiny", jine = "jine", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspoaDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", cislo_osv = "*", datum_vyd = "*", datum_plat = "*", pro_skupiny = "*", jine = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspoaDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", cislo_osv = "string", datum_vyd = "JsonDate", datum_plat = "JsonDate", pro_skupiny = "string", jine = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspoaDtoTypeLengths { odpoved_id = 36, status = 254, cislo_osv = 9, pro_skupiny = 254, jine = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspprDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsppr*/
	interface GCrrspprDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsppr.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsppr.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrsppr.datum_od*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:crrsppr.datum_do*/
		datum_do?: JsonDate|null;
		/**DBCOLUMN:crrsppr.zaevidoval_sidlo*/
		zaevidoval_sidlo?: string|null;
		/**DBCOLUMN:crrsppr.zaevidoval_kod*/
		zaevidoval_kod?: string|null;
		/**DBCOLUMN:crrsppr.zaevidoval_typ*/
		zaevidoval_typ?: string|null;
		/**DBCOLUMN:crrsppr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsppr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsppr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsppr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspprDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", datum_od = "datum_od", datum_do = "datum_do", zaevidoval_sidlo = "zaevidoval_sidlo", zaevidoval_kod = "zaevidoval_kod", zaevidoval_typ = "zaevidoval_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspprDtoFragments { odpoved_id = "*", por_cislo = "*", datum_od = "*", datum_do = "*", zaevidoval_sidlo = "*", zaevidoval_kod = "*", zaevidoval_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspprDtoTypes { odpoved_id = "string", por_cislo = "number", datum_od = "JsonDate", datum_do = "JsonDate", zaevidoval_sidlo = "string", zaevidoval_kod = "string", zaevidoval_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspprDtoTypeLengths { odpoved_id = 36, zaevidoval_sidlo = 254, zaevidoval_kod = 254, zaevidoval_typ = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspreDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspre*/
	interface GCrrspreDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspre.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspre.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspre.por_cislo_pri*/
		por_cislo_pri?: number|null;
		/**DBCOLUMN:crrspre.typ_pr*/
		typ_pr?: number|null;
		/**DBCOLUMN:crrspre.klasifik*/
		klasifik?: number|null;
		/**DBCOLUMN:crrspre.s_sledovany*/
		s_sledovany?: number|null;
		/**DBCOLUMN:crrspre.zakon*/
		zakon?: string|null;
		/**DBCOLUMN:crrspre.paragraf*/
		paragraf?: number|null;
		/**DBCOLUMN:crrspre.p_paragraf*/
		p_paragraf?: string|null;
		/**DBCOLUMN:crrspre.odstavec*/
		odstavec?: number|null;
		/**DBCOLUMN:crrspre.p_odstavec*/
		p_odstavec?: string|null;
		/**DBCOLUMN:crrspre.bod*/
		bod?: number|null;
		/**DBCOLUMN:crrspre.popis*/
		popis?: string|null;
		/**DBCOLUMN:crrspre.alkohol*/
		alkohol?: JsonDecimal|null;
		/**DBCOLUMN:crrspre.s_alk_nemer*/
		s_alk_nemer?: number|null;
		/**DBCOLUMN:crrspre.rychlost_max*/
		rychlost_max?: number|null;
		/**DBCOLUMN:crrspre.rychlost_skut*/
		rychlost_skut?: number|null;
		/**DBCOLUMN:crrspre.rychlost_typ*/
		rychlost_typ?: string|null;
		/**DBCOLUMN:crrspre.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspre.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspre.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspre.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspreDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", por_cislo_pri = "por_cislo_pri", typ_pr = "typ_pr", klasifik = "klasifik", s_sledovany = "s_sledovany", zakon = "zakon", paragraf = "paragraf", p_paragraf = "p_paragraf", odstavec = "odstavec", p_odstavec = "p_odstavec", bod = "bod", popis = "popis", alkohol = "alkohol", s_alk_nemer = "s_alk_nemer", rychlost_max = "rychlost_max", rychlost_skut = "rychlost_skut", rychlost_typ = "rychlost_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspreDtoFragments { odpoved_id = "*", por_cislo = "*", por_cislo_pri = "*", typ_pr = "*", klasifik = "*", s_sledovany = "*", zakon = "*", paragraf = "*", p_paragraf = "*", odstavec = "*", p_odstavec = "*", bod = "*", popis = "*", alkohol = "*", s_alk_nemer = "*", rychlost_max = "*", rychlost_skut = "*", rychlost_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspreDtoTypes { odpoved_id = "string", por_cislo = "number", por_cislo_pri = "number", typ_pr = "number", klasifik = "number", s_sledovany = "number", zakon = "string", paragraf = "number", p_paragraf = "string", odstavec = "number", p_odstavec = "string", bod = "number", popis = "string", alkohol = "JsonDecimal", s_alk_nemer = "number", rychlost_max = "number", rychlost_skut = "number", rychlost_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspreDtoTypeLengths { odpoved_id = 36, zakon = 100, p_paragraf = 10, p_odstavec = 10, popis = 254, rychlost_typ = 10, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspriDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspri*/
	interface GCrrspriDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspri.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspri.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspri.datum_spachani*/
		datum_spachani?: JsonDate|null;
		/**DBCOLUMN:crrspri.evidence_cj*/
		evidence_cj?: string|null;
		/**DBCOLUMN:crrspri.nahl_urad_sidlo*/
		nahl_urad_sidlo?: string|null;
		/**DBCOLUMN:crrspri.nahl_urad_kod*/
		nahl_urad_kod?: string|null;
		/**DBCOLUMN:crrspri.nahl_urad_typ*/
		nahl_urad_typ?: string|null;
		/**DBCOLUMN:crrspri.nahl_cj*/
		nahl_cj?: string|null;
		/**DBCOLUMN:crrspri.evid_urad_sidlo*/
		evid_urad_sidlo?: string|null;
		/**DBCOLUMN:crrspri.evid_urad_kod*/
		evid_urad_kod?: string|null;
		/**DBCOLUMN:crrspri.evid_urad_typ*/
		evid_urad_typ?: string|null;
		/**DBCOLUMN:crrspri.rozhod_datum*/
		rozhod_datum?: JsonDate|null;
		/**DBCOLUMN:crrspri.rozhod_dat_prm*/
		rozhod_dat_prm?: JsonDate|null;
		/**DBCOLUMN:crrspri.rozhod_urad_sidlo*/
		rozhod_urad_sidlo?: string|null;
		/**DBCOLUMN:crrspri.rozhod_urad_kod*/
		rozhod_urad_kod?: string|null;
		/**DBCOLUMN:crrspri.rozhod_urad_typ*/
		rozhod_urad_typ?: string|null;
		/**DBCOLUMN:crrspri.rozhod_cj*/
		rozhod_cj?: string|null;
		/**DBCOLUMN:crrspri.rozhod_op1*/
		rozhod_op1?: string|null;
		/**DBCOLUMN:crrspri.rozhod_op2*/
		rozhod_op2?: string|null;
		/**DBCOLUMN:crrspri.rozhod_pok*/
		rozhod_pok?: JsonDecimal|null;
		/**DBCOLUMN:crrspri.rozhod_podminka*/
		rozhod_podminka?: JsonDate|null;
		/**DBCOLUMN:crrspri.ukon_datum*/
		ukon_datum?: JsonDate|null;
		/**DBCOLUMN:crrspri.ukon_dat_prm*/
		ukon_dat_prm?: JsonDate|null;
		/**DBCOLUMN:crrspri.ukon_urad_sidlo*/
		ukon_urad_sidlo?: string|null;
		/**DBCOLUMN:crrspri.ukon_urad_kod*/
		ukon_urad_kod?: string|null;
		/**DBCOLUMN:crrspri.ukon_urad_typ*/
		ukon_urad_typ?: string|null;
		/**DBCOLUMN:crrspri.ukon_cj*/
		ukon_cj?: string|null;
		/**DBCOLUMN:crrspri.ukon_op1*/
		ukon_op1?: string|null;
		/**DBCOLUMN:crrspri.ukon_op2*/
		ukon_op2?: string|null;
		/**DBCOLUMN:crrspri.ukon_pok*/
		ukon_pok?: JsonDecimal|null;
		/**DBCOLUMN:crrspri.ukon_podminka*/
		ukon_podminka?: JsonDate|null;
		/**DBCOLUMN:crrspri.popis*/
		popis?: string|null;
		/**DBCOLUMN:crrspri.s_nehoda*/
		s_nehoda?: number|null;
		/**DBCOLUMN:crrspri.s_zraneni*/
		s_zraneni?: number|null;
		/**DBCOLUMN:crrspri.s_zadrzeni_rp*/
		s_zadrzeni_rp?: number|null;
		/**DBCOLUMN:crrspri.s_riz_voz*/
		s_riz_voz?: number|null;
		/**DBCOLUMN:crrspri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspri.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Přestupky*/
		gCrrspreDtos?: Gordic.Prr.Interface.GCrrspreDto[]|null;
		/**Nehoda - TXT*/
		nehoda_txt?: string|null;
		/**Zranění - TXT*/
		zraneni_txt?: string|null;
		/**Zadržení - TXT*/
		zadrzeni_rp_txt?: string|null;
		/**Řízení vozidla - TXT*/
		riz_voz_txt?: string|null;
	}
	const enum GCrrspriDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", datum_spachani = "datum_spachani", evidence_cj = "evidence_cj", nahl_urad_sidlo = "nahl_urad_sidlo", nahl_urad_kod = "nahl_urad_kod", nahl_urad_typ = "nahl_urad_typ", nahl_cj = "nahl_cj", evid_urad_sidlo = "evid_urad_sidlo", evid_urad_kod = "evid_urad_kod", evid_urad_typ = "evid_urad_typ", rozhod_datum = "rozhod_datum", rozhod_dat_prm = "rozhod_dat_prm", rozhod_urad_sidlo = "rozhod_urad_sidlo", rozhod_urad_kod = "rozhod_urad_kod", rozhod_urad_typ = "rozhod_urad_typ", rozhod_cj = "rozhod_cj", rozhod_op1 = "rozhod_op1", rozhod_op2 = "rozhod_op2", rozhod_pok = "rozhod_pok", rozhod_podminka = "rozhod_podminka", ukon_datum = "ukon_datum", ukon_dat_prm = "ukon_dat_prm", ukon_urad_sidlo = "ukon_urad_sidlo", ukon_urad_kod = "ukon_urad_kod", ukon_urad_typ = "ukon_urad_typ", ukon_cj = "ukon_cj", ukon_op1 = "ukon_op1", ukon_op2 = "ukon_op2", ukon_pok = "ukon_pok", ukon_podminka = "ukon_podminka", popis = "popis", s_nehoda = "s_nehoda", s_zraneni = "s_zraneni", s_zadrzeni_rp = "s_zadrzeni_rp", s_riz_voz = "s_riz_voz", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", gCrrspreDtos = "gCrrspreDtos", nehoda_txt = "nehoda_txt", zraneni_txt = "zraneni_txt", zadrzeni_rp_txt = "zadrzeni_rp_txt", riz_voz_txt = "riz_voz_txt", Permissions = "Permissions",}
	const enum GCrrspriDtoFragments { odpoved_id = "*", por_cislo = "*", datum_spachani = "*", evidence_cj = "*", nahl_urad_sidlo = "*", nahl_urad_kod = "*", nahl_urad_typ = "*", nahl_cj = "*", evid_urad_sidlo = "*", evid_urad_kod = "*", evid_urad_typ = "*", rozhod_datum = "*", rozhod_dat_prm = "*", rozhod_urad_sidlo = "*", rozhod_urad_kod = "*", rozhod_urad_typ = "*", rozhod_cj = "*", rozhod_op1 = "*", rozhod_op2 = "*", rozhod_pok = "*", rozhod_podminka = "*", ukon_datum = "*", ukon_dat_prm = "*", ukon_urad_sidlo = "*", ukon_urad_kod = "*", ukon_urad_typ = "*", ukon_cj = "*", ukon_op1 = "*", ukon_op2 = "*", ukon_pok = "*", ukon_podminka = "*", popis = "*", s_nehoda = "*", s_zraneni = "*", s_zadrzeni_rp = "*", s_riz_voz = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", gCrrspreDtos = "*", nehoda_txt = "*", zraneni_txt = "*", zadrzeni_rp_txt = "*", riz_voz_txt = "*", Permissions = "*",}
	const enum GCrrspriDtoTypes { odpoved_id = "string", por_cislo = "number", datum_spachani = "JsonDate", evidence_cj = "string", nahl_urad_sidlo = "string", nahl_urad_kod = "string", nahl_urad_typ = "string", nahl_cj = "string", evid_urad_sidlo = "string", evid_urad_kod = "string", evid_urad_typ = "string", rozhod_datum = "JsonDate", rozhod_dat_prm = "JsonDate", rozhod_urad_sidlo = "string", rozhod_urad_kod = "string", rozhod_urad_typ = "string", rozhod_cj = "string", rozhod_op1 = "string", rozhod_op2 = "string", rozhod_pok = "JsonDecimal", rozhod_podminka = "JsonDate", ukon_datum = "JsonDate", ukon_dat_prm = "JsonDate", ukon_urad_sidlo = "string", ukon_urad_kod = "string", ukon_urad_typ = "string", ukon_cj = "string", ukon_op1 = "string", ukon_op2 = "string", ukon_pok = "JsonDecimal", ukon_podminka = "JsonDate", popis = "string", s_nehoda = "number", s_zraneni = "number", s_zadrzeni_rp = "number", s_riz_voz = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", gCrrspreDtos = "Gordic.Prr.Interface.GCrrspreDto[]", nehoda_txt = "string", zraneni_txt = "string", zadrzeni_rp_txt = "string", riz_voz_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspriDtoTypeLengths { odpoved_id = 36, evidence_cj = 50, nahl_urad_sidlo = 254, nahl_urad_kod = 254, nahl_urad_typ = 254, nahl_cj = 50, evid_urad_sidlo = 254, evid_urad_kod = 254, evid_urad_typ = 254, rozhod_urad_sidlo = 254, rozhod_urad_kod = 254, rozhod_urad_typ = 254, rozhod_cj = 50, rozhod_op1 = 254, rozhod_op2 = 254, ukon_urad_sidlo = 254, ukon_urad_kod = 254, ukon_urad_typ = 254, ukon_cj = 50, ukon_op1 = 254, ukon_op2 = 254, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspruDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspru*/
	interface GCrrspruDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspru.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspru.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspru.status*/
		status?: string|null;
		/**DBCOLUMN:crrspru.cislo_rp*/
		cislo_rp?: string|null;
		/**DBCOLUMN:crrspru.datum_vydani*/
		datum_vydani?: JsonDate|null;
		/**DBCOLUMN:crrspru.datum_platnosti*/
		datum_platnosti?: JsonDate|null;
		/**DBCOLUMN:crrspru.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspru.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspru.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspru.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspruDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", cislo_rp = "cislo_rp", datum_vydani = "datum_vydani", datum_platnosti = "datum_platnosti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspruDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", cislo_rp = "*", datum_vydani = "*", datum_platnosti = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspruDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", cislo_rp = "string", datum_vydani = "JsonDate", datum_platnosti = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspruDtoTypeLengths { odpoved_id = 36, status = 100, cislo_rp = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspzkDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspzk*/
	interface GCrrspzkDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspzk.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspzk.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspzk.datum*/
		datum?: JsonDate|null;
		/**DBCOLUMN:crrspzk.datum_opr*/
		datum_opr?: JsonDate|null;
		/**DBCOLUMN:crrspzk.uspel*/
		uspel?: number|null;
		/**DBCOLUMN:crrspzk.urad_sidlo*/
		urad_sidlo?: string|null;
		/**DBCOLUMN:crrspzk.urad_kod*/
		urad_kod?: string|null;
		/**DBCOLUMN:crrspzk.urad_typ*/
		urad_typ?: string|null;
		/**DBCOLUMN:crrspzk.cj*/
		cj?: string|null;
		/**DBCOLUMN:crrspzk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspzk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspzk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspzk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Uspěl TXT*/
		uspel_txt?: string|null;
	}
	const enum GCrrspzkDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", datum = "datum", datum_opr = "datum_opr", uspel = "uspel", urad_sidlo = "urad_sidlo", urad_kod = "urad_kod", urad_typ = "urad_typ", cj = "cj", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uspel_txt = "uspel_txt", Permissions = "Permissions",}
	const enum GCrrspzkDtoFragments { odpoved_id = "*", por_cislo = "*", datum = "*", datum_opr = "*", uspel = "*", urad_sidlo = "*", urad_kod = "*", urad_typ = "*", cj = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uspel_txt = "*", Permissions = "*",}
	const enum GCrrspzkDtoTypes { odpoved_id = "string", por_cislo = "number", datum = "JsonDate", datum_opr = "JsonDate", uspel = "number", urad_sidlo = "string", urad_kod = "string", urad_typ = "string", cj = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uspel_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspzkDtoTypeLengths { odpoved_id = 36, urad_sidlo = 254, urad_kod = 254, urad_typ = 254, cj = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspzpDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspzp*/
	interface GCrrspzpDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspzp.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspzp.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspzp.status*/
		status?: string|null;
		/**DBCOLUMN:crrspzp.cislo_pzp*/
		cislo_pzp?: string|null;
		/**DBCOLUMN:crrspzp.datum_vydani*/
		datum_vydani?: JsonDate|null;
		/**DBCOLUMN:crrspzp.datum_platnosti*/
		datum_platnosti?: JsonDate|null;
		/**DBCOLUMN:crrspzp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspzp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspzp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspzp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspzpDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", status = "status", cislo_pzp = "cislo_pzp", datum_vydani = "datum_vydani", datum_platnosti = "datum_platnosti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspzpDtoFragments { odpoved_id = "*", por_cislo = "*", status = "*", cislo_pzp = "*", datum_vydani = "*", datum_platnosti = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspzpDtoTypes { odpoved_id = "string", por_cislo = "number", status = "string", cislo_pzp = "string", datum_vydani = "JsonDate", datum_platnosti = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspzpDtoTypeLengths { odpoved_id = 36, status = 100, cislo_pzp = 15, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrspzrDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrspzr*/
	interface GCrrspzrDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrspzr.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrspzr.por_cislo_zri*/
		por_cislo_zri?: number|null;
		/**DBCOLUMN:crrspzr.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrspzr.duvod*/
		duvod?: string|null;
		/**DBCOLUMN:crrspzr.cj*/
		cj?: string|null;
		/**DBCOLUMN:crrspzr.datum_od*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:crrspzr.datum_do*/
		datum_do?: JsonDate|null;
		/**DBCOLUMN:crrspzr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrspzr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrspzr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrspzr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrspzrDtoNames { odpoved_id = "odpoved_id", por_cislo_zri = "por_cislo_zri", por_cislo = "por_cislo", duvod = "duvod", cj = "cj", datum_od = "datum_od", datum_do = "datum_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrspzrDtoFragments { odpoved_id = "*", por_cislo_zri = "*", por_cislo = "*", duvod = "*", cj = "*", datum_od = "*", datum_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrspzrDtoTypes { odpoved_id = "string", por_cislo_zri = "number", por_cislo = "number", duvod = "string", cj = "string", datum_od = "JsonDate", datum_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrspzrDtoTypeLengths { odpoved_id = 36, duvod = 254, cj = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsreqDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsreq*/
	interface GCrrsreqDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrsreq.dotaz_id*/
		dotaz_id?: string|null;
		/**DBCOLUMN:crrsreq.dotaz_cas*/
		dotaz_cas?: JsonDate|null;
		/**DBCOLUMN:crrsreq.verze*/
		verze?: string|null;
		/**DBCOLUMN:crrsreq.typ_req*/
		typ_req?: string|null;
		/**DBCOLUMN:crrsreq.ais_kod*/
		ais_kod?: string|null;
		/**DBCOLUMN:crrsreq.ovm_kod*/
		ovm_kod?: string|null;
		/**DBCOLUMN:crrsreq.operator_name*/
		operator_name?: string|null;
		/**DBCOLUMN:crrsreq.autor*/
		autor?: string|null;
		/**DBCOLUMN:crrsreq.duvod*/
		duvod?: string|null;
		/**DBCOLUMN:crrsreq.pozadovane_udaje*/
		pozadovane_udaje?: string|null;
		/**DBCOLUMN:crrsreq.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:crrsreq.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:crrsreq.cislo_rp*/
		cislo_rp?: string|null;
		/**DBCOLUMN:crrsreq.dat_vyd_rp*/
		dat_vyd_rp?: JsonDate|null;
		/**DBCOLUMN:crrsreq.rodne_cislo*/
		rodne_cislo?: string|null;
		/**DBCOLUMN:crrsreq.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:crrsreq.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:crrsreq.rodne_prijmeni*/
		rodne_prijmeni?: string|null;
		/**DBCOLUMN:crrsreq.datum_narozeni*/
		datum_narozeni?: JsonDate|null;
		/**DBCOLUMN:crrsreq.misto_narozeni*/
		misto_narozeni?: string|null;
		/**DBCOLUMN:crrsreq.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsreq.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsreq.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsreq.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrsreqDtoNames { dotaz_id = "dotaz_id", dotaz_cas = "dotaz_cas", verze = "verze", typ_req = "typ_req", ais_kod = "ais_kod", ovm_kod = "ovm_kod", operator_name = "operator_name", autor = "autor", duvod = "duvod", pozadovane_udaje = "pozadovane_udaje", ixs_esu = "ixs_esu", ixp = "ixp", cislo_rp = "cislo_rp", dat_vyd_rp = "dat_vyd_rp", rodne_cislo = "rodne_cislo", prijmeni = "prijmeni", jmeno = "jmeno", rodne_prijmeni = "rodne_prijmeni", datum_narozeni = "datum_narozeni", misto_narozeni = "misto_narozeni", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrsreqDtoFragments { dotaz_id = "*", dotaz_cas = "*", verze = "*", typ_req = "*", ais_kod = "*", ovm_kod = "*", operator_name = "*", autor = "*", duvod = "*", pozadovane_udaje = "*", ixs_esu = "*", ixp = "*", cislo_rp = "*", dat_vyd_rp = "*", rodne_cislo = "*", prijmeni = "*", jmeno = "*", rodne_prijmeni = "*", datum_narozeni = "*", misto_narozeni = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrsreqDtoTypes { dotaz_id = "string", dotaz_cas = "JsonDate", verze = "string", typ_req = "string", ais_kod = "string", ovm_kod = "string", operator_name = "string", autor = "string", duvod = "string", pozadovane_udaje = "string", ixs_esu = "string", ixp = "string", cislo_rp = "string", dat_vyd_rp = "JsonDate", rodne_cislo = "string", prijmeni = "string", jmeno = "string", rodne_prijmeni = "string", datum_narozeni = "JsonDate", misto_narozeni = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsreqDtoTypeLengths { dotaz_id = 36, verze = 10, typ_req = 100, ais_kod = 45, ovm_kod = 45, operator_name = 128, autor = 100, duvod = 254, pozadovane_udaje = 254, ixs_esu = 12, ixp = 12, cislo_rp = 12, rodne_cislo = 10, prijmeni = 100, jmeno = 100, rodne_prijmeni = 100, misto_narozeni = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrsresDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrsres*/
	interface GCrrsresDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsChybaDto {
		/**DBCOLUMN:crrsres.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrsres.dotaz_id*/
		dotaz_id?: string|null;
		/**DBCOLUMN:crrsres.ais*/
		ais_kod?: string|null;
		/**DBCOLUMN:crrsres.odpoved_cas*/
		odpoved_cas?: JsonDate|null;
		/**DBCOLUMN:crrsres.stav_kod*/
		stav_kod?: string|null;
		/**DBCOLUMN:crrsres.zprava_typ*/
		zprava_typ?: string|null;
		/**DBCOLUMN:crrsres.zprava_kod*/
		zprava_kod?: string|null;
		/**DBCOLUMN:crrsres.zprava_popis*/
		zprava_popis?: string|null;
		/**DBCOLUMN:crrsres.pocet_zaz*/
		pocet_zaz?: number|null;
		/**DBCOLUMN:crrsres.max_pocet_zaz*/
		max_pocet_zaz?: number|null;
		/**DBCOLUMN:crrsres.ixb_foto*/
		ixb_foto?: string|null;
		/**DBCOLUMN:crrsres.body*/
		body?: number|null;
		/**DBCOLUMN:crrsres.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrsres.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrsres.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrsres.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Dotaz*/
		GCrrsreqDto?: Gordic.Prr.Interface.GCrrsreqDto|null;
		/**Osoba*/
		gCrrsosoDto?: Gordic.Prr.Interface.GCrrsosoDto|null;
		/**Řidičské oprávnění*/
		gCrrsoprDtos?: Gordic.Prr.Interface.GCrrsoprDto[]|null;
		/**Řidičské průkazy*/
		gCrrspruDtos?: Gordic.Prr.Interface.GCrrspruDto[]|null;
		/**Mezinárodní řidičské průkazy*/
		gCrrsmprDtos?: Gordic.Prr.Interface.GCrrsmprDto[]|null;
		/**Cizí řidičské průkazy*/
		gCrrscprDtos?: Gordic.Prr.Interface.GCrrscprDto[]|null;
		/**Průkazy profesní způsobilost*/
		gCrrspzpDtos?: Gordic.Prr.Interface.GCrrspzpDto[]|null;
		/**Případy*/
		gCrrspriDtos?: Gordic.Prr.Interface.GCrrspriDto[]|null;
		/**Zákazy řízení*/
		gCrrszriDtos?: Gordic.Prr.Interface.GCrrszriDto[]|null;
		/**Pozbytí práva k řízení MV na území ČR*/
		gCrrspprDtos?: Gordic.Prr.Interface.GCrrspprDto[]|null;
		/**Blokace řidičského oprávnění*/
		gCrrsbroDtos?: Gordic.Prr.Interface.GCrrsbroDto[]|null;
		/**Školení bezpečné jízdy*/
		gCrrssbjDtos?: Gordic.Prr.Interface.GCrrssbjDto[]|null;
		/**Přezkoušení*/
		gCrrspzkDtos?: Gordic.Prr.Interface.GCrrspzkDto[]|null;
		/**Zdravotni omezeni*/
		gCrrszomDto?: Gordic.Prr.Interface.GCrrszomDto|null;
		/**Profesní osvědčení učitele autoškoly*/
		gCrrspoaDtos?: Gordic.Prr.Interface.GCrrspoaDto[]|null;
	}
	const enum GCrrsresDtoNames { odpoved_id = "odpoved_id", dotaz_id = "dotaz_id", ais_kod = "ais_kod", odpoved_cas = "odpoved_cas", stav_kod = "stav_kod", zprava_typ = "zprava_typ", zprava_kod = "zprava_kod", zprava_popis = "zprava_popis", pocet_zaz = "pocet_zaz", max_pocet_zaz = "max_pocet_zaz", ixb_foto = "ixb_foto", body = "body", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", GCrrsreqDto = "GCrrsreqDto", gCrrsosoDto = "gCrrsosoDto", gCrrsoprDtos = "gCrrsoprDtos", gCrrspruDtos = "gCrrspruDtos", gCrrsmprDtos = "gCrrsmprDtos", gCrrscprDtos = "gCrrscprDtos", gCrrspzpDtos = "gCrrspzpDtos", gCrrspriDtos = "gCrrspriDtos", gCrrszriDtos = "gCrrszriDtos", gCrrspprDtos = "gCrrspprDtos", gCrrsbroDtos = "gCrrsbroDtos", gCrrssbjDtos = "gCrrssbjDtos", gCrrspzkDtos = "gCrrspzkDtos", gCrrszomDto = "gCrrszomDto", gCrrspoaDtos = "gCrrspoaDtos", Chyba = "Chyba", ExistujeChyba = "ExistujeChyba", Varovani = "Varovani", ExistujeVarování = "ExistujeVarování", Permissions = "Permissions",}
	const enum GCrrsresDtoFragments { odpoved_id = "*", dotaz_id = "*", ais_kod = "*", odpoved_cas = "*", stav_kod = "*", zprava_typ = "*", zprava_kod = "*", zprava_popis = "*", pocet_zaz = "*", max_pocet_zaz = "*", ixb_foto = "*", body = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", GCrrsreqDto = "*", gCrrsosoDto = "*", gCrrsoprDtos = "*", gCrrspruDtos = "*", gCrrsmprDtos = "*", gCrrscprDtos = "*", gCrrspzpDtos = "*", gCrrspriDtos = "*", gCrrszriDtos = "*", gCrrspprDtos = "*", gCrrsbroDtos = "*", gCrrssbjDtos = "*", gCrrspzkDtos = "*", gCrrszomDto = "*", gCrrspoaDtos = "*", Chyba = "*", ExistujeChyba = "*", Varovani = "*", ExistujeVarování = "*", Permissions = "*",}
	const enum GCrrsresDtoTypes { odpoved_id = "string", dotaz_id = "string", ais_kod = "string", odpoved_cas = "JsonDate", stav_kod = "string", zprava_typ = "string", zprava_kod = "string", zprava_popis = "string", pocet_zaz = "number", max_pocet_zaz = "number", ixb_foto = "string", body = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", GCrrsreqDto = "Gordic.Prr.Interface.GCrrsreqDto", gCrrsosoDto = "Gordic.Prr.Interface.GCrrsosoDto", gCrrsoprDtos = "Gordic.Prr.Interface.GCrrsoprDto[]", gCrrspruDtos = "Gordic.Prr.Interface.GCrrspruDto[]", gCrrsmprDtos = "Gordic.Prr.Interface.GCrrsmprDto[]", gCrrscprDtos = "Gordic.Prr.Interface.GCrrscprDto[]", gCrrspzpDtos = "Gordic.Prr.Interface.GCrrspzpDto[]", gCrrspriDtos = "Gordic.Prr.Interface.GCrrspriDto[]", gCrrszriDtos = "Gordic.Prr.Interface.GCrrszriDto[]", gCrrspprDtos = "Gordic.Prr.Interface.GCrrspprDto[]", gCrrsbroDtos = "Gordic.Prr.Interface.GCrrsbroDto[]", gCrrssbjDtos = "Gordic.Prr.Interface.GCrrssbjDto[]", gCrrspzkDtos = "Gordic.Prr.Interface.GCrrspzkDto[]", gCrrszomDto = "Gordic.Prr.Interface.GCrrszomDto", gCrrspoaDtos = "Gordic.Prr.Interface.GCrrspoaDto[]", Chyba = "Gordic.Prr.Interface.GPrrChybaDto", ExistujeChyba = "boolean", Varovani = "Gordic.Prr.Interface.GPrrVarovaniDto", ExistujeVarování = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrsresDtoTypeLengths { odpoved_id = 36, dotaz_id = 36, ais_kod = 45, stav_kod = 20, zprava_typ = 20, zprava_kod = 100, zprava_popis = 254, ixb_foto = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrssbjDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrssbj*/
	interface GCrrssbjDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrssbj.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrssbj.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrssbj.datum*/
		datum?: JsonDate|null;
		/**DBCOLUMN:crrssbj.misto*/
		misto?: string|null;
		/**DBCOLUMN:crrssbj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrssbj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrssbj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrssbj.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GCrrssbjDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", datum = "datum", misto = "misto", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GCrrssbjDtoFragments { odpoved_id = "*", por_cislo = "*", datum = "*", misto = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GCrrssbjDtoTypes { odpoved_id = "string", por_cislo = "number", datum = "JsonDate", misto = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrssbjDtoTypeLengths { odpoved_id = 36, misto = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrszomDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrszom*/
	interface GCrrszomDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrszom.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrszom.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrszom.lek_pos_do*/
		lek_pos_do?: JsonDate|null;
		/**DBCOLUMN:crrszom.zavislost*/
		zavislost?: number|null;
		/**DBCOLUMN:crrszom.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrszom.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrszom.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrszom.zmenu_prov*/
		zmenu_prov?: string|null;
		/**zavislost_txt*/
		zavislost_txt?: string|null;
	}
	const enum GCrrszomDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", lek_pos_do = "lek_pos_do", zavislost = "zavislost", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zavislost_txt = "zavislost_txt", Permissions = "Permissions",}
	const enum GCrrszomDtoFragments { odpoved_id = "*", por_cislo = "*", lek_pos_do = "*", zavislost = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zavislost_txt = "*", Permissions = "*",}
	const enum GCrrszomDtoTypes { odpoved_id = "string", por_cislo = "number", lek_pos_do = "JsonDate", zavislost = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zavislost_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrszomDtoTypeLengths { odpoved_id = 36, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRR\GCrrszriDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:crrszri*/
	interface GCrrszriDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:crrszri.odpoved_id*/
		odpoved_id?: string|null;
		/**DBCOLUMN:crrszri.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:crrszri.skupiny*/
		skupiny?: string|null;
		/**DBCOLUMN:crrszri.datum_od*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:crrszri.datum_do*/
		datum_do?: JsonDate|null;
		/**DBCOLUMN:crrszri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:crrszri.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:crrszri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:crrszri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Přerušení zákazu řízení*/
		gCrrspzrDtos?: Gordic.Prr.Interface.GCrrspzrDto[]|null;
	}
	const enum GCrrszriDtoNames { odpoved_id = "odpoved_id", por_cislo = "por_cislo", skupiny = "skupiny", datum_od = "datum_od", datum_do = "datum_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", gCrrspzrDtos = "gCrrspzrDtos", Permissions = "Permissions",}
	const enum GCrrszriDtoFragments { odpoved_id = "*", por_cislo = "*", skupiny = "*", datum_od = "*", datum_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", gCrrspzrDtos = "*", Permissions = "*",}
	const enum GCrrszriDtoTypes { odpoved_id = "string", por_cislo = "number", skupiny = "string", datum_od = "JsonDate", datum_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", gCrrspzrDtos = "Gordic.Prr.Interface.GCrrspzrDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GCrrszriDtoTypeLengths { odpoved_id = 36, skupiny = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\CRV\VstupniDto\GCrvDleCbeInputDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Vstupní DTO pro CRV dle CBE*/
	interface GCrvDleCbeInputDto extends GPrrBaseDetailPermissionsDto {
		/**Registrační značka*/
		voz_rz?: string|null;
		/**Čas přestupku*/
		cas_prestupku?: JsonDate|null;
		/**ČÍslo jednací*/
		cislo_jednaci?: string|null;
		/**Stát registrace*/
		req_cbe_stat?: string|null;
		/**Kód přestupku*/
		req_cbe_kod_pr?: number|null;
		/**Zda volá městká policie*/
		mp?: boolean|null;
		/**značka doplněk*/
		voz_rz_d?: string|null;
		/**identifikátor skutku*/
		ixs_skt?: string|null;
		/**Identifikátor případu*/
		ixs_pri?: string|null;
		/**identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ účastníka*/
		typ_uca?: number|null;
	}
	const enum GCrvDleCbeInputDtoNames { voz_rz = "voz_rz", cas_prestupku = "cas_prestupku", cislo_jednaci = "cislo_jednaci", req_cbe_stat = "req_cbe_stat", req_cbe_kod_pr = "req_cbe_kod_pr", mp = "mp", voz_rz_d = "voz_rz_d", ixs_skt = "ixs_skt", ixs_pri = "ixs_pri", ixs_oso = "ixs_oso", typ_uca = "typ_uca",}
	const enum GCrvDleCbeInputDtoFragments { voz_rz = "*", cas_prestupku = "*", cislo_jednaci = "*", req_cbe_stat = "*", req_cbe_kod_pr = "*", mp = "*", voz_rz_d = "*", ixs_skt = "*", ixs_pri = "*", ixs_oso = "*", typ_uca = "*",}
	const enum GCrvDleCbeInputDtoTypes { voz_rz = "string", cas_prestupku = "JsonDate", cislo_jednaci = "string", req_cbe_stat = "string", req_cbe_kod_pr = "number", mp = "boolean", voz_rz_d = "string", ixs_skt = "string", ixs_pri = "string", ixs_oso = "string", typ_uca = "number",}
	const enum GCrvDleCbeInputDtoTypeLengths { voz_rz = 50, req_cbe_stat = 100, voz_rz_d = 50, ixs_skt = 12, ixs_pri = 12, ixs_oso = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpBlokDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpBlokDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Bloky.Id-reseni*/
		id_reseni?: string|null;
		/**DBCOLUMN:Bloky.Poradove-cislo*/
		poradove_cislo?: number|null;
		/**DBCOLUMN:Bloky.Id-bloku*/
		id_bloku?: string|null;
		/**DBCOLUMN:Bloky.Cislo-bloku*/
		cislo_bloku?: string|null;
		/**DBCOLUMN:Bloky.odstranit*/
		odstranit?: boolean|null;
		/**DBCOLUMN:Bloky.id_reseni_int*/
		id_reseni_int?: number|null;
	}
	const enum GPrrRizeniMpBlokDtoNames { id_reseni = "id_reseni", poradove_cislo = "poradove_cislo", id_bloku = "id_bloku", cislo_bloku = "cislo_bloku", odstranit = "odstranit", id_reseni_int = "id_reseni_int", Permissions = "Permissions",}
	const enum GPrrRizeniMpBlokDtoFragments { id_reseni = "*", poradove_cislo = "*", id_bloku = "*", cislo_bloku = "*", odstranit = "*", id_reseni_int = "*", Permissions = "*",}
	const enum GPrrRizeniMpBlokDtoTypes { id_reseni = "string", poradove_cislo = "number", id_bloku = "string", cislo_bloku = "string", odstranit = "boolean", id_reseni_int = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpBlokDtoTypeLengths { id_reseni = 12, id_bloku = 12, cislo_bloku = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpCinnostDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpCinnostDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Cinnosti.Id_cinnosti*/
		id_cinnosti?: string|null;
		/**DBCOLUMN:Cinnosti.Id_skutku*/
		id_skutku?: string|null;
		/**DBCOLUMN:Cinnosti.Id_typu_cinnosti*/
		id_typu_cinnosti?: string|null;
		/**DBCOLUMN:Cinnosti.Nazev_typu_cinnosti*/
		nazev_typu_cinnosti?: string|null;
		/**DBCOLUMN:Cinnosti.Id_pripadu*/
		id_pripadu?: string|null;
		/**DBCOLUMN:Cinnosti.Nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Cinnosti.Text*/
		text?: string|null;
		/**DBCOLUMN:Cinnosti.Gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:Cinnosti.Gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:Cinnosti.Misto*/
		misto?: string|null;
		/**DBCOLUMN:Cinnosti.Zacatek*/
		zacatek?: JsonDate|null;
		/**DBCOLUMN:Cinnosti.Konec*/
		konec?: JsonDate|null;
		/**DBCOLUMN:Cinnosti.Pripad*/
		pripad?: boolean|null;
		/**DBCOLUMN:Cinnosti.Statistika*/
		statistika?: boolean|null;
		/**DBCOLUMN:Cinnosti.odstranit*/
		odstranit?: boolean|null;
		/**DBCOLUMN:Cinnosti.id_skutku_int*/
		id_skutku_int?: number|null;
	}
	const enum GPrrRizeniMpCinnostDtoNames { id_cinnosti = "id_cinnosti", id_skutku = "id_skutku", id_typu_cinnosti = "id_typu_cinnosti", nazev_typu_cinnosti = "nazev_typu_cinnosti", id_pripadu = "id_pripadu", nazev = "nazev", text = "text", gps_sirka = "gps_sirka", gps_delka = "gps_delka", misto = "misto", zacatek = "zacatek", konec = "konec", pripad = "pripad", statistika = "statistika", odstranit = "odstranit", id_skutku_int = "id_skutku_int", Permissions = "Permissions",}
	const enum GPrrRizeniMpCinnostDtoFragments { id_cinnosti = "*", id_skutku = "*", id_typu_cinnosti = "*", nazev_typu_cinnosti = "*", id_pripadu = "*", nazev = "*", text = "*", gps_sirka = "*", gps_delka = "*", misto = "*", zacatek = "*", konec = "*", pripad = "*", statistika = "*", odstranit = "*", id_skutku_int = "*", Permissions = "*",}
	const enum GPrrRizeniMpCinnostDtoTypes { id_cinnosti = "string", id_skutku = "string", id_typu_cinnosti = "string", nazev_typu_cinnosti = "string", id_pripadu = "string", nazev = "string", text = "string", gps_sirka = "string", gps_delka = "string", misto = "string", zacatek = "JsonDate", konec = "JsonDate", pripad = "boolean", statistika = "boolean", odstranit = "boolean", id_skutku_int = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpCinnostDtoTypeLengths { id_cinnosti = 12, id_skutku = 12, id_typu_cinnosti = 12, nazev_typu_cinnosti = 254, id_pripadu = 12, nazev = 254, gps_sirka = 12, gps_delka = 12, misto = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		Pripad?: Gordic.Prr.Interface.GPrrRizeniMpPripadDto|null;
		/**Strážníci*/
		Straznici?: Gordic.Prr.Interface.GPrrRizeniMpStraznikDto[]|null;
		/**Skutky*/
		Skutky?: Gordic.Prr.Interface.GPrrRizeniMpSkutekDto[]|null;
		/**Činnosti*/
		Cinnosti?: Gordic.Prr.Interface.GPrrRizeniMpCinnostDto[]|null;
		/**Přestupky*/
		Prestupky?: Gordic.Prr.Interface.GPrrRizeniMpPrestupekDto[]|null;
		/**Porušení*/
		Poruseni?: Gordic.Prr.Interface.GPrrRizeniMpPoruseniDto[]|null;
		/**Řešení*/
		Reseni?: Gordic.Prr.Interface.GPrrRizeniMpReseniDto[]|null;
		/**Blok*/
		Bloky?: Gordic.Prr.Interface.GPrrRizeniMpBlokDto[]|null;
		/**List elektronických příloh případu*/
		PrilohyPripadu?: Gordic.Prr.Interface.GPrrPrilohaPripaduDto[]|null;
	}
	const enum GPrrRizeniMpDtoNames { Pripad = "Pripad", Straznici = "Straznici", Skutky = "Skutky", Cinnosti = "Cinnosti", Prestupky = "Prestupky", Poruseni = "Poruseni", Reseni = "Reseni", Bloky = "Bloky", PrilohyPripadu = "PrilohyPripadu", Permissions = "Permissions",}
	const enum GPrrRizeniMpDtoFragments { Pripad = "*", Straznici = "*", Skutky = "*", Cinnosti = "*", Prestupky = "*", Poruseni = "*", Reseni = "*", Bloky = "*", PrilohyPripadu = "*", Permissions = "*",}
	const enum GPrrRizeniMpDtoTypes { Pripad = "Gordic.Prr.Interface.GPrrRizeniMpPripadDto", Straznici = "Gordic.Prr.Interface.GPrrRizeniMpStraznikDto[]", Skutky = "Gordic.Prr.Interface.GPrrRizeniMpSkutekDto[]", Cinnosti = "Gordic.Prr.Interface.GPrrRizeniMpCinnostDto[]", Prestupky = "Gordic.Prr.Interface.GPrrRizeniMpPrestupekDto[]", Poruseni = "Gordic.Prr.Interface.GPrrRizeniMpPoruseniDto[]", Reseni = "Gordic.Prr.Interface.GPrrRizeniMpReseniDto[]", Bloky = "Gordic.Prr.Interface.GPrrRizeniMpBlokDto[]", PrilohyPripadu = "Gordic.Prr.Interface.GPrrPrilohaPripaduDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpPoruseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpPoruseniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Poruseni.Poradove_cislo*/
		poradove_cislo?: number|null;
		/**DBCOLUMN:Poruseni.Id_zno*/
		id_zno?: string|null;
		/**DBCOLUMN:Poruseni.Poradove_cislo_prestupku*/
		poradove_cislo_prestupku?: number|null;
		/**DBCOLUMN:Poruseni.Nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Poruseni.Zakonik*/
		zakonik?: string|null;
		/**DBCOLUMN:Poruseni.Rok*/
		rok?: number|null;
		/**DBCOLUMN:Poruseni.Paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:Poruseni.Odstavec*/
		odstavec?: string|null;
		/**DBCOLUMN:Poruseni.Pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:Poruseni.Bod*/
		bod?: string|null;
		/**DBCOLUMN:Poruseni.Paragraf_txt*/
		paragraf_txt?: string|null;
		/**DBCOLUMN:Poruseni.Popis*/
		popis?: string|null;
		/**DBCOLUMN:Poruseni.odstranit*/
		odstranit?: boolean|null;
		/**DBCOLUMN:Poruseni.id_prestupku_int*/
		id_prestupku_int?: number|null;
	}
	const enum GPrrRizeniMpPoruseniDtoNames { poradove_cislo = "poradove_cislo", id_zno = "id_zno", poradove_cislo_prestupku = "poradove_cislo_prestupku", nazev = "nazev", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", paragraf_txt = "paragraf_txt", popis = "popis", odstranit = "odstranit", id_prestupku_int = "id_prestupku_int", Permissions = "Permissions",}
	const enum GPrrRizeniMpPoruseniDtoFragments { poradove_cislo = "*", id_zno = "*", poradove_cislo_prestupku = "*", nazev = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", paragraf_txt = "*", popis = "*", odstranit = "*", id_prestupku_int = "*", Permissions = "*",}
	const enum GPrrRizeniMpPoruseniDtoTypes { poradove_cislo = "number", id_zno = "string", poradove_cislo_prestupku = "number", nazev = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", paragraf_txt = "string", popis = "string", odstranit = "boolean", id_prestupku_int = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpPoruseniDtoTypeLengths { id_zno = 12, nazev = 254, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3, paragraf_txt = 254, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpPrestupekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpPrestupekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Prestupky.Poradove_cislo*/
		poradove_cislo?: number|null;
		/**DBCOLUMN:Prestupky.Id_zno*/
		id_zno?: string|null;
		/**DBCOLUMN:Prestupky.Id_skutku*/
		id_skutku?: string|null;
		/**DBCOLUMN:Prestupky.Nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Prestupky.Zakonik*/
		zakonik?: string|null;
		/**DBCOLUMN:Prestupky.Rok*/
		rok?: number|null;
		/**DBCOLUMN:Prestupky.Paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:Prestupky.Odstavec*/
		odstavec?: string|null;
		/**DBCOLUMN:Prestupky.Pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:Prestupky.Bod*/
		bod?: string|null;
		/**DBCOLUMN:Prestupky.Paragraf_txt*/
		paragraf_txt?: string|null;
		/**DBCOLUMN:Prestupky.Popis*/
		popis?: string|null;
		/**DBCOLUMN:Prestupky.Hlavni*/
		hlavni?: boolean|null;
		/**DBCOLUMN:Prestupky.Typ_zavineni*/
		typ_zavineni?: string|null;
		/**DBCOLUMN:Prestupky.odstranit*/
		odstranit?: boolean|null;
		/**DBCOLUMN:Prestupky.id_skutku_int*/
		id_skutku_int?: number|null;
		/**DBCOLUMN:Prestupky.id_prestupku_int*/
		id_prestupku_int?: number|null;
		/**Porušení*/
		Poruseni?: Gordic.Prr.Interface.GPrrRizeniMpPoruseniDto[]|null;
	}
	const enum GPrrRizeniMpPrestupekDtoNames { poradove_cislo = "poradove_cislo", id_zno = "id_zno", id_skutku = "id_skutku", nazev = "nazev", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", paragraf_txt = "paragraf_txt", popis = "popis", hlavni = "hlavni", typ_zavineni = "typ_zavineni", odstranit = "odstranit", id_skutku_int = "id_skutku_int", id_prestupku_int = "id_prestupku_int", Poruseni = "Poruseni", Permissions = "Permissions",}
	const enum GPrrRizeniMpPrestupekDtoFragments { poradove_cislo = "*", id_zno = "*", id_skutku = "*", nazev = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", paragraf_txt = "*", popis = "*", hlavni = "*", typ_zavineni = "*", odstranit = "*", id_skutku_int = "*", id_prestupku_int = "*", Poruseni = "*", Permissions = "*",}
	const enum GPrrRizeniMpPrestupekDtoTypes { poradove_cislo = "number", id_zno = "string", id_skutku = "string", nazev = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", paragraf_txt = "string", popis = "string", hlavni = "boolean", typ_zavineni = "string", odstranit = "boolean", id_skutku_int = "number", id_prestupku_int = "number", Poruseni = "Gordic.Prr.Interface.GPrrRizeniMpPoruseniDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpPrestupekDtoTypeLengths { id_zno = 12, id_skutku = 12, nazev = 254, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3, paragraf_txt = 254, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpPripadDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpPripadDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Pripad.Id_deniku*/
		ixs_rad?: string|null;
		/**DBCOLUMN:Pripad.Nazev_deniku*/
		prrsrad_nazev?: string|null;
		/**DBCOLUMN:Pripad.Id_pripadu*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Pripad.Lze_editovat*/
		lze_editovat?: boolean|null;
		/**DBCOLUMN:Pripad.Cislo_pripadu*/
		cj_pri?: string|null;
		/**DBCOLUMN:Pripad.Datum_zapisu*/
		dat_podani?: JsonDate|null;
		/**DBCOLUMN:Pripad.Vyresit_do*/
		dat_lhuta_roz?: JsonDate|null;
		/**DBCOLUMN:Pripad.Poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Pripad.vyridit*/
		vyridit?: boolean|null;
	}
	const enum GPrrRizeniMpPripadDtoNames { ixs_rad = "ixs_rad", prrsrad_nazev = "prrsrad_nazev", ixs_pri = "ixs_pri", lze_editovat = "lze_editovat", cj_pri = "cj_pri", dat_podani = "dat_podani", dat_lhuta_roz = "dat_lhuta_roz", poznamka = "poznamka", vyridit = "vyridit", Permissions = "Permissions",}
	const enum GPrrRizeniMpPripadDtoFragments { ixs_rad = "*", prrsrad_nazev = "*", ixs_pri = "*", lze_editovat = "*", cj_pri = "*", dat_podani = "*", dat_lhuta_roz = "*", poznamka = "*", vyridit = "*", Permissions = "*",}
	const enum GPrrRizeniMpPripadDtoTypes { ixs_rad = "string", prrsrad_nazev = "string", ixs_pri = "string", lze_editovat = "boolean", cj_pri = "string", dat_podani = "JsonDate", dat_lhuta_roz = "JsonDate", poznamka = "string", vyridit = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpPripadDtoTypeLengths { ixs_rad = 12, prrsrad_nazev = 50, ixs_pri = 12, cj_pri = 40, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpRequestDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**identifikárot případu nebo činnosti - ixs_pri/ixs_udm*/
		id?: string|null;
		/**Zda se má načítat případ nebo činnost*/
		typRizeni?: Gordic.Prr.Interface.GPrrTypRizeni|null;
	}
	const enum GPrrRizeniMpRequestDtoNames { id = "id", typRizeni = "typRizeni", Permissions = "Permissions",}
	const enum GPrrRizeniMpRequestDtoFragments { id = "*", typRizeni = "*", Permissions = "*",}
	const enum GPrrRizeniMpRequestDtoTypes { id = "string", typRizeni = "Gordic.Prr.Interface.GPrrTypRizeni", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpReseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpReseniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Reseni.Id_reseni*/
		id_reseni?: string|null;
		/**DBCOLUMN:Reseni.Typ_reseni_id*/
		typ_reseni_id?: number|null;
		/**DBCOLUMN:Reseni.Typ_reseni_nazev*/
		typ_reseni_nazev?: string|null;
		/**DBCOLUMN:Reseni.Id_ucastnika*/
		id_ucastnika?: string|null;
		/**DBCOLUMN:Reseni.Nazev_ucastnika*/
		nazev_ucastnika?: string|null;
		/**DBCOLUMN:Reseni.Datum_vzniku*/
		datum_vzniku?: JsonDate|null;
		/**DBCOLUMN:Reseni.Sablona*/
		sablona?: string|null;
		/**DBCOLUMN:Reseni.Nazev_sablony*/
		nazev_sablony?: string|null;
		/**DBCOLUMN:Reseni.Pokuta*/
		pokuta?: JsonDecimal|null;
		/**DBCOLUMN:Reseni.Napomenuti*/
		napomenuti?: boolean|null;
		/**DBCOLUMN:Reseni.Datum_ulozeni_pokuty*/
		datum_ulozeni_pokuty?: JsonDate|null;
		/**DBCOLUMN:Reseni.Datum_platnosti_pokuty*/
		datum_platnosti_pokuty?: JsonDate|null;
		/**DBCOLUMN:Reseni.Datum_splatnosti_pokuty*/
		datum_splatnosti_pokuty?: JsonDate|null;
		/**DBCOLUMN:Reseni.Cislo_bloku_pokuty*/
		cislo_bloku_pokuty?: string|null;
		/**DBCOLUMN:Reseni.Pokutu_ulozil_id*/
		pokutu_ulozil_id?: string|null;
		/**DBCOLUMN:Reseni.Pokutu_ulozil_nazev*/
		pokutu_ulozil_nazev?: string|null;
		/**DBCOLUMN:Reseni.Popis*/
		popis?: string|null;
		/**DBCOLUMN:Reseni.Zpusob_platby*/
		zpusob_platby?: string|null;
		/**DBCOLUMN:Reseni.Pokuta_zaplacena*/
		pokuta_zaplacena?: boolean|null;
		/**DBCOLUMN:Reseni.Datum_zaplaceni*/
		datum_zaplaceni?: JsonDate|null;
		/**DBCOLUMN:Reseni.Typ_postoupeni*/
		typ_postoupeni?: string|null;
		/**DBCOLUMN:Reseni.Poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Reseni.Nezobrazovat_v_prehledech*/
		nezobrazovat_v_prehledech?: boolean|null;
		/**DBCOLUMN:Reseni.Datum_obsilky*/
		datum_obsilky?: JsonDate|null;
		/**DBCOLUMN:Reseni.Cas_obsilky*/
		cas_obsilky?: string|null;
		/**DBCOLUMN:Reseni.Duvod_upominky*/
		duvod_upominky?: string|null;
		/**DBCOLUMN:Reseni.id_reseni_int*/
		id_reseni_int?: number|null;
		/**Bloky*/
		Bloky?: Gordic.Prr.Interface.GPrrRizeniMpBlokDto[]|null;
	}
	const enum GPrrRizeniMpReseniDtoNames { id_reseni = "id_reseni", typ_reseni_id = "typ_reseni_id", typ_reseni_nazev = "typ_reseni_nazev", id_ucastnika = "id_ucastnika", nazev_ucastnika = "nazev_ucastnika", datum_vzniku = "datum_vzniku", sablona = "sablona", nazev_sablony = "nazev_sablony", pokuta = "pokuta", napomenuti = "napomenuti", datum_ulozeni_pokuty = "datum_ulozeni_pokuty", datum_platnosti_pokuty = "datum_platnosti_pokuty", datum_splatnosti_pokuty = "datum_splatnosti_pokuty", cislo_bloku_pokuty = "cislo_bloku_pokuty", pokutu_ulozil_id = "pokutu_ulozil_id", pokutu_ulozil_nazev = "pokutu_ulozil_nazev", popis = "popis", zpusob_platby = "zpusob_platby", pokuta_zaplacena = "pokuta_zaplacena", datum_zaplaceni = "datum_zaplaceni", typ_postoupeni = "typ_postoupeni", poznamka = "poznamka", nezobrazovat_v_prehledech = "nezobrazovat_v_prehledech", datum_obsilky = "datum_obsilky", cas_obsilky = "cas_obsilky", duvod_upominky = "duvod_upominky", id_reseni_int = "id_reseni_int", Bloky = "Bloky", Permissions = "Permissions",}
	const enum GPrrRizeniMpReseniDtoFragments { id_reseni = "*", typ_reseni_id = "*", typ_reseni_nazev = "*", id_ucastnika = "*", nazev_ucastnika = "*", datum_vzniku = "*", sablona = "*", nazev_sablony = "*", pokuta = "*", napomenuti = "*", datum_ulozeni_pokuty = "*", datum_platnosti_pokuty = "*", datum_splatnosti_pokuty = "*", cislo_bloku_pokuty = "*", pokutu_ulozil_id = "*", pokutu_ulozil_nazev = "*", popis = "*", zpusob_platby = "*", pokuta_zaplacena = "*", datum_zaplaceni = "*", typ_postoupeni = "*", poznamka = "*", nezobrazovat_v_prehledech = "*", datum_obsilky = "*", cas_obsilky = "*", duvod_upominky = "*", id_reseni_int = "*", Bloky = "*", Permissions = "*",}
	const enum GPrrRizeniMpReseniDtoTypes { id_reseni = "string", typ_reseni_id = "number", typ_reseni_nazev = "string", id_ucastnika = "string", nazev_ucastnika = "string", datum_vzniku = "JsonDate", sablona = "string", nazev_sablony = "string", pokuta = "JsonDecimal", napomenuti = "boolean", datum_ulozeni_pokuty = "JsonDate", datum_platnosti_pokuty = "JsonDate", datum_splatnosti_pokuty = "JsonDate", cislo_bloku_pokuty = "string", pokutu_ulozil_id = "string", pokutu_ulozil_nazev = "string", popis = "string", zpusob_platby = "string", pokuta_zaplacena = "boolean", datum_zaplaceni = "JsonDate", typ_postoupeni = "string", poznamka = "string", nezobrazovat_v_prehledech = "boolean", datum_obsilky = "JsonDate", cas_obsilky = "string", duvod_upominky = "string", id_reseni_int = "number", Bloky = "Gordic.Prr.Interface.GPrrRizeniMpBlokDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpReseniDtoTypeLengths { id_reseni = 12, typ_reseni_nazev = 50, id_ucastnika = 12, nazev_ucastnika = 100, sablona = 20, nazev_sablony = 254, cislo_bloku_pokuty = 254, pokutu_ulozil_id = 12, pokutu_ulozil_nazev = 50, poznamka = 254, cas_obsilky = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpSkutekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpSkutekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Skutky.Id_skutku*/
		id_skutku?: string|null;
		/**DBCOLUMN:Skutky.Typ_skutku_id*/
		typ_skutku_id?: string|null;
		/**DBCOLUMN:Skutky.Typ_skutku_nazev*/
		typ_skutku_nazev?: string|null;
		/**DBCOLUMN:Skutky.Id_ucastnika*/
		id_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.Id_osoby*/
		id_osoby?: string|null;
		/**DBCOLUMN:Skutky.Nazev_ucastnika - JmenoUcastnika*/
		nazev_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.Adresa_ucastnika*/
		adresa_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.Datum_narozeni_ucastnika*/
		datum_narozeni_ucastnika?: JsonDate|null;
		/**DBCOLUMN:Skutky.Typ_ucastnika*/
		typ_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.Vekova_kategorie_ucastnika*/
		vekova_kategorie_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.Misto_spachani*/
		misto_spachani?: string|null;
		/**DBCOLUMN:Skutky.Misto_spachani_gps_sirka*/
		misto_spachani_gps_sirka?: string|null;
		/**DBCOLUMN:Skutky.Misto_spachani_gps_delka*/
		misto_spachani_gps_delka?: string|null;
		/**DBCOLUMN:Skutky.Oznamil*/
		oznamil?: string|null;
		/**DBCOLUMN:Skutky.Rz*/
		rz?: string|null;
		/**DBCOLUMN:Skutky.Typ_vozidla*/
		typ_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Znacka_vozidla*/
		znacka_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Model_vozidla*/
		model_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Barva_vozidla*/
		barva_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Rok_vyroby_vozidla*/
		rok_vyroby_vozidla?: number|null;
		/**DBCOLUMN:Skutky.Objem_vozidla*/
		objem_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Cislo_tp_vozidla*/
		cislo_tp_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Vin_vozidla*/
		vin_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Datum_tk_vozidla*/
		datum_tk_vozidla?: JsonDate|null;
		/**DBCOLUMN:Skutky.Platnost_tk_vozidla*/
		platnost_tk_vozidla?: JsonDate|null;
		/**DBCOLUMN:Skutky.Vrak_vozidla*/
		vrak_vozidla?: boolean|null;
		/**DBCOLUMN:Skutky.Vrak_txt*/
		vrak_txt?: string|null;
		/**DBCOLUMN:Skutky.Datum_skutku*/
		datum_skutku?: JsonDate|null;
		/**DBCOLUMN:Skutky.Cas_skutku*/
		cas_skutku?: string|null;
		/**DBCOLUMN:Skutky.Popis*/
		popis?: string|null;
		/**DBCOLUMN:Skutky.Popis_oznameni*/
		popis_oznameni?: string|null;
		/**DBCOLUMN:Skutky.odstranit*/
		odstranit?: boolean|null;
		/**DBCOLUMN:Skutky.guid_crv*/
		guid_crv?: string|null;
		/**DBCOLUMN:Skutky.typ_zakladani_ucastnika*/
		typ_zakladani_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.typ_ucastnika_puvodni*/
		typ_ucastnika_puvodni?: string|null;
		/**DBCOLUMN:Skutky.jmeno_ucastnika*/
		jmeno_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.prijmeni_ucastnika*/
		prijmeni_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.obec_ucastnika*/
		obec_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.cast_obce_ucastnika*/
		cast_obce_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.psc_ucastnika*/
		psc_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.ulice_ucastnika*/
		ulice_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.cor_ucastnika*/
		cor_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.cpop_ucastnika*/
		cpop_ucastnika?: string|null;
		/**DBCOLUMN:Skutky.stat_ucastnika*/
		stat_ucastnika?: number|null;
		/**DBCOLUMN:Skutky.statni_prislusnost_ucastnika*/
		statni_prislusnost_ucastnika?: number|null;
		/**DBCOLUMN:Skutky.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Skutky.id_skutku_int*/
		id_skutku_int?: number|null;
	}
	const enum GPrrRizeniMpSkutekDtoNames { id_skutku = "id_skutku", typ_skutku_id = "typ_skutku_id", typ_skutku_nazev = "typ_skutku_nazev", id_ucastnika = "id_ucastnika", id_osoby = "id_osoby", nazev_ucastnika = "nazev_ucastnika", adresa_ucastnika = "adresa_ucastnika", datum_narozeni_ucastnika = "datum_narozeni_ucastnika", typ_ucastnika = "typ_ucastnika", vekova_kategorie_ucastnika = "vekova_kategorie_ucastnika", misto_spachani = "misto_spachani", misto_spachani_gps_sirka = "misto_spachani_gps_sirka", misto_spachani_gps_delka = "misto_spachani_gps_delka", oznamil = "oznamil", rz = "rz", typ_vozidla = "typ_vozidla", znacka_vozidla = "znacka_vozidla", model_vozidla = "model_vozidla", barva_vozidla = "barva_vozidla", rok_vyroby_vozidla = "rok_vyroby_vozidla", objem_vozidla = "objem_vozidla", cislo_tp_vozidla = "cislo_tp_vozidla", vin_vozidla = "vin_vozidla", datum_tk_vozidla = "datum_tk_vozidla", platnost_tk_vozidla = "platnost_tk_vozidla", vrak_vozidla = "vrak_vozidla", vrak_txt = "vrak_txt", datum_skutku = "datum_skutku", cas_skutku = "cas_skutku", popis = "popis", popis_oznameni = "popis_oznameni", odstranit = "odstranit", guid_crv = "guid_crv", typ_zakladani_ucastnika = "typ_zakladani_ucastnika", typ_ucastnika_puvodni = "typ_ucastnika_puvodni", jmeno_ucastnika = "jmeno_ucastnika", prijmeni_ucastnika = "prijmeni_ucastnika", obec_ucastnika = "obec_ucastnika", cast_obce_ucastnika = "cast_obce_ucastnika", psc_ucastnika = "psc_ucastnika", ulice_ucastnika = "ulice_ucastnika", cor_ucastnika = "cor_ucastnika", cpop_ucastnika = "cpop_ucastnika", stat_ucastnika = "stat_ucastnika", statni_prislusnost_ucastnika = "statni_prislusnost_ucastnika", zprava_isep = "zprava_isep", id_skutku_int = "id_skutku_int", Permissions = "Permissions",}
	const enum GPrrRizeniMpSkutekDtoFragments { id_skutku = "*", typ_skutku_id = "*", typ_skutku_nazev = "*", id_ucastnika = "*", id_osoby = "*", nazev_ucastnika = "*", adresa_ucastnika = "*", datum_narozeni_ucastnika = "*", typ_ucastnika = "*", vekova_kategorie_ucastnika = "*", misto_spachani = "*", misto_spachani_gps_sirka = "*", misto_spachani_gps_delka = "*", oznamil = "*", rz = "*", typ_vozidla = "*", znacka_vozidla = "*", model_vozidla = "*", barva_vozidla = "*", rok_vyroby_vozidla = "*", objem_vozidla = "*", cislo_tp_vozidla = "*", vin_vozidla = "*", datum_tk_vozidla = "*", platnost_tk_vozidla = "*", vrak_vozidla = "*", vrak_txt = "*", datum_skutku = "*", cas_skutku = "*", popis = "*", popis_oznameni = "*", odstranit = "*", guid_crv = "*", typ_zakladani_ucastnika = "*", typ_ucastnika_puvodni = "*", jmeno_ucastnika = "*", prijmeni_ucastnika = "*", obec_ucastnika = "*", cast_obce_ucastnika = "*", psc_ucastnika = "*", ulice_ucastnika = "*", cor_ucastnika = "*", cpop_ucastnika = "*", stat_ucastnika = "*", statni_prislusnost_ucastnika = "*", zprava_isep = "*", id_skutku_int = "*", Permissions = "*",}
	const enum GPrrRizeniMpSkutekDtoTypes { id_skutku = "string", typ_skutku_id = "string", typ_skutku_nazev = "string", id_ucastnika = "string", id_osoby = "string", nazev_ucastnika = "string", adresa_ucastnika = "string", datum_narozeni_ucastnika = "JsonDate", typ_ucastnika = "string", vekova_kategorie_ucastnika = "string", misto_spachani = "string", misto_spachani_gps_sirka = "string", misto_spachani_gps_delka = "string", oznamil = "string", rz = "string", typ_vozidla = "string", znacka_vozidla = "string", model_vozidla = "string", barva_vozidla = "string", rok_vyroby_vozidla = "number", objem_vozidla = "string", cislo_tp_vozidla = "string", vin_vozidla = "string", datum_tk_vozidla = "JsonDate", platnost_tk_vozidla = "JsonDate", vrak_vozidla = "boolean", vrak_txt = "string", datum_skutku = "JsonDate", cas_skutku = "string", popis = "string", popis_oznameni = "string", odstranit = "boolean", guid_crv = "string", typ_zakladani_ucastnika = "string", typ_ucastnika_puvodni = "string", jmeno_ucastnika = "string", prijmeni_ucastnika = "string", obec_ucastnika = "string", cast_obce_ucastnika = "string", psc_ucastnika = "string", ulice_ucastnika = "string", cor_ucastnika = "string", cpop_ucastnika = "string", stat_ucastnika = "number", statni_prislusnost_ucastnika = "number", zprava_isep = "string", id_skutku_int = "number", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpSkutekDtoTypeLengths { id_skutku = 12, typ_skutku_id = 12, typ_skutku_nazev = 254, id_ucastnika = 12, id_osoby = 12, nazev_ucastnika = 100, adresa_ucastnika = 254, misto_spachani = 254, misto_spachani_gps_sirka = 12, misto_spachani_gps_delka = 12, oznamil = 254, rz = 20, znacka_vozidla = 50, model_vozidla = 50, barva_vozidla = 50, objem_vozidla = 10, cislo_tp_vozidla = 20, vin_vozidla = 50, cas_skutku = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\DetailRizeni\GPrrRizeniMpStraznikDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrRizeniMpStraznikDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**DBCOLUMN:Straznici.Id*/
		id?: string|null;
		/**DBCOLUMN:Straznici.Id_zmp*/
		id_zmp?: string|null;
		/**DBCOLUMN:Straznici.Nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Straznici.Nazev_referenta*/
		nazev_referenta?: string|null;
		/**DBCOLUMN:Straznici.Nazev_funkce*/
		nazev_funkce?: string|null;
		/**DBCOLUMN:Straznici.Vyrizuje*/
		vyrizuje?: boolean|null;
		/**DBCOLUMN:Straznici.novy_zaznam*/
		novy_zaznam?: boolean|null;
		/**DBCOLUMN:Straznici.odstranit*/
		odstranit?: boolean|null;
	}
	const enum GPrrRizeniMpStraznikDtoNames { id = "id", id_zmp = "id_zmp", nazev = "nazev", nazev_referenta = "nazev_referenta", nazev_funkce = "nazev_funkce", vyrizuje = "vyrizuje", novy_zaznam = "novy_zaznam", odstranit = "odstranit", Permissions = "Permissions",}
	const enum GPrrRizeniMpStraznikDtoFragments { id = "*", id_zmp = "*", nazev = "*", nazev_referenta = "*", nazev_funkce = "*", vyrizuje = "*", novy_zaznam = "*", odstranit = "*", Permissions = "*",}
	const enum GPrrRizeniMpStraznikDtoTypes { id = "string", id_zmp = "string", nazev = "string", nazev_referenta = "string", nazev_funkce = "string", vyrizuje = "boolean", novy_zaznam = "boolean", odstranit = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrRizeniMpStraznikDtoTypeLengths { id_zmp = 12, nazev = 50, nazev_referenta = 50, nazev_funkce = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidencePrilohaPripaduDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DTO pro přidání elektronické přílohy k případu*/
	interface GPrrEvidencePrilohaPripaduDto extends GPrrBaseDetailPermissionsDto {
		/**Identifikátor případu.*/
		ixs_pri?: string|null;
		/**Název souboru bez přípony*/
		jmeno_souboru?: string|null;
		/**Přípona souboru bez tečky*/
		pripona_souboru?: string|null;
		/**Textový popis charakterizující stručně obsah elektronického souboru.*/
		titulek_souboru?: string|null;
		/**Textový podrobný popis charakterizující obsah elektronického souboru.*/
		popis_souboru?: string|null;
		/**Binární data souboru v base64 formátu.*/
		data?: any[]|null;
		/**Nastavení aktivity přílohy
		*     POZOR je nutné zadat i hodnotu ixb
		*/
		aktivita?: number|null;
		/**Identifikátor elktronického dokuemntu*/
		ixb?: string|null;
	}
	const enum GPrrEvidencePrilohaPripaduDtoNames { ixs_pri = "ixs_pri", jmeno_souboru = "jmeno_souboru", pripona_souboru = "pripona_souboru", titulek_souboru = "titulek_souboru", popis_souboru = "popis_souboru", data = "data", aktivita = "aktivita", ixb = "ixb",}
	const enum GPrrEvidencePrilohaPripaduDtoFragments { ixs_pri = "*", jmeno_souboru = "*", pripona_souboru = "*", titulek_souboru = "*", popis_souboru = "*", data = "*", aktivita = "*", ixb = "*",}
	const enum GPrrEvidencePrilohaPripaduDtoTypes { ixs_pri = "string", jmeno_souboru = "string", pripona_souboru = "string", titulek_souboru = "string", popis_souboru = "string", data = "any[]", aktivita = "number", ixb = "string",}
	const enum GPrrEvidencePrilohaPripaduDtoTypeLengths { ixs_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpBlokDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Blok (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
	interface GPrrEvidenceRizeniMpBlokDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Interní identifikátor řešení.*/
		id_reseni_int?: number|null;
		/**Pořadové číslo bloku (pokud nebude vyplněno jedná se o nový).*/
		poradove_cislo?: number|null;
		/**Identifikátor bloku z evidence bloků*/
		id_bloku?: string|null;
		/**Číslo bloku pokuty*/
		cislo_bloku?: string|null;
		/**>Zda se má blok odstrait*/
		odstranit?: boolean|null;
	}
	const enum GPrrEvidenceRizeniMpBlokDtoNames { id_reseni_int = "id_reseni_int", poradove_cislo = "poradove_cislo", id_bloku = "id_bloku", cislo_bloku = "cislo_bloku", odstranit = "odstranit", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpBlokDtoFragments { id_reseni_int = "*", poradove_cislo = "*", id_bloku = "*", cislo_bloku = "*", odstranit = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpBlokDtoTypes { id_reseni_int = "number", poradove_cislo = "number", id_bloku = "string", cislo_bloku = "string", odstranit = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpBlokDtoTypeLengths { id_bloku = 12, cislo_bloku = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpCinnostDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Činnost strážníka*/
	interface GPrrEvidenceRizeniMpCinnostDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor činnosti (pokud nebude zadán, jedná se o novou činnost).*/
		id_cinnosti?: string|null;
		/**Interní identifikátor skutku (vazba na skutek) - musí být vyplněno, pokud se zakládá činnost s případem, jinak ne.*/
		id_skutku_int?: number|null;
		/**Identifikátor typu činnosti.*/
		id_typu_cinnosti?: string|null;
		/**Název činnosti.*/
		nazev?: string|null;
		/**Popisný text činnosti.*/
		text?: string|null;
		/**GPS šířka.*/
		gps_sirka?: string|null;
		/**GPS délka.*/
		gps_delka?: string|null;
		/**Místo činnosti.*/
		misto?: string|null;
		/**Začátek činnosti.*/
		zacatek?: JsonDate|null;
		/**Konec činnosti*/
		konec?: JsonDate|null;
		/**Zda se má událost zobrazovat ve statistice*/
		statistika?: boolean|null;
		/**Zda se má událost odstrait*/
		odstranit?: boolean|null;
	}
	const enum GPrrEvidenceRizeniMpCinnostDtoNames { id_cinnosti = "id_cinnosti", id_skutku_int = "id_skutku_int", id_typu_cinnosti = "id_typu_cinnosti", nazev = "nazev", text = "text", gps_sirka = "gps_sirka", gps_delka = "gps_delka", misto = "misto", zacatek = "zacatek", konec = "konec", statistika = "statistika", odstranit = "odstranit", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpCinnostDtoFragments { id_cinnosti = "*", id_skutku_int = "*", id_typu_cinnosti = "*", nazev = "*", text = "*", gps_sirka = "*", gps_delka = "*", misto = "*", zacatek = "*", konec = "*", statistika = "*", odstranit = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpCinnostDtoTypes { id_cinnosti = "string", id_skutku_int = "number", id_typu_cinnosti = "string", nazev = "string", text = "string", gps_sirka = "string", gps_delka = "string", misto = "string", zacatek = "JsonDate", konec = "JsonDate", statistika = "boolean", odstranit = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpCinnostDtoTypeLengths { id_cinnosti = 12, id_typu_cinnosti = 12, nazev = 254, gps_sirka = 12, gps_delka = 12, misto = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrEvidenceRizeniMpDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		Pripad?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpPripadDto|null;
		/**Strážníci*/
		Straznici?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpStraznikDto[]|null;
		/**Skutky*/
		Skutky?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpSkutekDto[]|null;
		/**Činnosti*/
		Cinnosti?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpCinnostDto[]|null;
		/**Přestupky*/
		Prestupky?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpPrestupekDto[]|null;
		/**Porušení*/
		Poruseni?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpPoruseniDto[]|null;
		/**Řešení*/
		Reseni?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpReseniDto[]|null;
		/**Blok*/
		Bloky?: Gordic.Prr.Interface.GPrrEvidenceRizeniMpBlokDto[]|null;
		/**List elektronických příloh případu*/
		PrilohyPripadu?: Gordic.Prr.Interface.GPrrEvidencePrilohaPripaduDto[]|null;
	}
	const enum GPrrEvidenceRizeniMpDtoNames { Pripad = "Pripad", Straznici = "Straznici", Skutky = "Skutky", Cinnosti = "Cinnosti", Prestupky = "Prestupky", Poruseni = "Poruseni", Reseni = "Reseni", Bloky = "Bloky", PrilohyPripadu = "PrilohyPripadu", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpDtoFragments { Pripad = "*", Straznici = "*", Skutky = "*", Cinnosti = "*", Prestupky = "*", Poruseni = "*", Reseni = "*", Bloky = "*", PrilohyPripadu = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpDtoTypes { Pripad = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpPripadDto", Straznici = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpStraznikDto[]", Skutky = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpSkutekDto[]", Cinnosti = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpCinnostDto[]", Prestupky = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpPrestupekDto[]", Poruseni = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpPoruseniDto[]", Reseni = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpReseniDto[]", Bloky = "Gordic.Prr.Interface.GPrrEvidenceRizeniMpBlokDto[]", PrilohyPripadu = "Gordic.Prr.Interface.GPrrEvidencePrilohaPripaduDto[]", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPoruseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Porušení*/
	interface GPrrEvidenceRizeniMpPoruseniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Pořadové číslo porušení (pokud nebude zadáno, jedná se o nové porušení).*/
		poradove_cislo?: number|null;
		/**Interní identifikátor přestupku (vazba na přestupek).*/
		id_prestupku_int?: number|null;
		/**>Interní identifikátor paragrafu. + je nutné zadat zakoni a rok pro kontrolu*/
		id_zno?: string|null;
		/**Zákoník*/
		zakonik?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Paragraf*/
		paragraf?: string|null;
		/**Odstavec*/
		odstavec?: string|null;
		/**Pismeno*/
		pismeno?: string|null;
		/**Bod*/
		bod?: string|null;
		/**DStručný popis paragrafu*/
		popis?: string|null;
		/**Zda se má porušení odstrait*/
		odstranit?: boolean|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		paragraf_txt?: string|null;
	}
	const enum GPrrEvidenceRizeniMpPoruseniDtoNames { poradove_cislo = "poradove_cislo", id_prestupku_int = "id_prestupku_int", id_zno = "id_zno", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", popis = "popis", odstranit = "odstranit", paragraf_txt = "paragraf_txt", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpPoruseniDtoFragments { poradove_cislo = "*", id_prestupku_int = "*", id_zno = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", popis = "*", odstranit = "*", paragraf_txt = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpPoruseniDtoTypes { poradove_cislo = "number", id_prestupku_int = "number", id_zno = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", popis = "string", odstranit = "boolean", paragraf_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpPoruseniDtoTypeLengths { id_zno = 12, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3, popis = 254, paragraf_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPrestupekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Přestupek*/
	interface GPrrEvidenceRizeniMpPrestupekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Pořadové číslo přestupku (pokud nebude zadáno, jedná se o nový přestupek).*/
		poradove_cislo?: number|null;
		/**Interní identifikátor přestupku.*/
		id_prestupku_int?: number|null;
		/**Interní identifikátor skutku (vazba na skutek).*/
		id_skutku_int?: number|null;
		/**Interní identifikátor paragrafu. + je nutné zadat zakoni a rok pro kontrolu*/
		id_zno?: string|null;
		/**Zákoník*/
		zakonik?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Paragraf*/
		paragraf?: string|null;
		/**Odstavec*/
		odstavec?: string|null;
		/**Písmeno*/
		pismeno?: string|null;
		/**Bod*/
		bod?: string|null;
		/**Stručný popis paragrafu*/
		popis?: string|null;
		/**Zda se jedná o hlavní přestupek*/
		hlavni?: boolean|null;
		/**Typ zavinění*/
		typ_zavineni?: string|null;
		/**Zda se má přestupek odstrait*/
		odstranit?: boolean|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		paragraf_txt?: string|null;
	}
	const enum GPrrEvidenceRizeniMpPrestupekDtoNames { poradove_cislo = "poradove_cislo", id_prestupku_int = "id_prestupku_int", id_skutku_int = "id_skutku_int", id_zno = "id_zno", zakonik = "zakonik", rok = "rok", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", bod = "bod", popis = "popis", hlavni = "hlavni", typ_zavineni = "typ_zavineni", odstranit = "odstranit", paragraf_txt = "paragraf_txt", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpPrestupekDtoFragments { poradove_cislo = "*", id_prestupku_int = "*", id_skutku_int = "*", id_zno = "*", zakonik = "*", rok = "*", paragraf = "*", odstavec = "*", pismeno = "*", bod = "*", popis = "*", hlavni = "*", typ_zavineni = "*", odstranit = "*", paragraf_txt = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpPrestupekDtoTypes { poradove_cislo = "number", id_prestupku_int = "number", id_skutku_int = "number", id_zno = "string", zakonik = "string", rok = "number", paragraf = "string", odstavec = "string", pismeno = "string", bod = "string", popis = "string", hlavni = "boolean", typ_zavineni = "string", odstranit = "boolean", paragraf_txt = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpPrestupekDtoTypeLengths { id_zno = 12, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 3, bod = 3, popis = 254, paragraf_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpPripadDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Data případu*/
	interface GPrrEvidenceRizeniMpPripadDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor deníku, který je možné získat z modulu GSAPRM menu Administrace PRM nebo metodou SeznamDeniku.*/
		ixs_rad?: string|null;
		/**Identifikátor případu (pokud nebude zadán, jedná se o nový případ).*/
		ixs_pri?: string|null;
		/**Datum zápisu*/
		dat_podani?: JsonDate|null;
		/**Datum do kdy je třeba případ vyřešit*/
		dat_lhuta_roz?: JsonDate|null;
		/**Poznámka případu*/
		poznamka?: string|null;
		/**Příznak zda se má případ po uložení vyřídit*/
		vyridit?: boolean|null;
	}
	const enum GPrrEvidenceRizeniMpPripadDtoNames { ixs_rad = "ixs_rad", ixs_pri = "ixs_pri", dat_podani = "dat_podani", dat_lhuta_roz = "dat_lhuta_roz", poznamka = "poznamka", vyridit = "vyridit", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpPripadDtoFragments { ixs_rad = "*", ixs_pri = "*", dat_podani = "*", dat_lhuta_roz = "*", poznamka = "*", vyridit = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpPripadDtoTypes { ixs_rad = "string", ixs_pri = "string", dat_podani = "JsonDate", dat_lhuta_roz = "JsonDate", poznamka = "string", vyridit = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpPripadDtoTypeLengths { ixs_rad = 12, ixs_pri = 12, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpReseniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:Seznam*/
	interface GPrrEvidenceRizeniMpReseniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor řešení (pokud nebude zadán, jedná se o nové řešení).*/
		id_reseni?: string|null;
		/**Interní identifikátor řešení.*/
		id_reseni_int?: number|null;
		/**ID typu řešení - z číselníku typů řešení*/
		typ_reseni_id?: number|null;
		/**Identifikátor externího subjektu - konkrétního pachatele, obviněného, provozovatele vozidla.
		*     Musí být uveden v elementu Skutky.
		*/
		id_ucastnika?: string|null;
		/**Datum vzniku řešení*/
		datum_vzniku?: JsonDate|null;
		/**Šablona pro generování dokumentu*/
		sablona?: string|null;
		/**Napomenutí (pro typ řešení "Příkaz na místě")*/
		napomenuti?: boolean|null;
		/**Pokuta, částa k úhradě (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
		pokuta?: JsonDecimal|null;
		/**Datum uložení pokuty (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
		datum_ulozeni_pokuty?: JsonDate|null;
		/**Datum počátku platnosti pokuty (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
		datum_platnosti_pokuty?: JsonDate|null;
		/**Datum splatnosti pokuty (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
		datum_splatnosti_pokuty?: JsonDate|null;
		/**Identifikátor strážníka, který pokutu uložil (pro typ řešení "Bloková pokuta", "Pokuta na místě nezaplacená")*/
		pokutu_ulozil_id?: string|null;
		/**Popis řešení (pouze pro typ řešení "Obecný úkon").*/
		popis?: string|null;
		/**Způsob platby (pro typ řešení "Pokuta na místě nezaplacená")*/
		zpusob_platby?: string|null;
		/**Zda byla pokuta zaplacena (pouze pro typ řešení "Pokuta na místě nezaplacena")*/
		pokuta_zaplacena?: boolean|null;
		/**Datum zaplacení pokuty (pouze pro typ řešení "Pokuta na místě nezaplacena")*/
		datum_zaplaceni?: JsonDate|null;
		/**Typ postoupení (pouze pro typ řešení "Postoupení")*/
		typ_postoupeni?: string|null;
		/**Poznámka (pouze pro typ řešení "Věc je v řešení")*/
		poznamka?: string|null;
		/**Zákaz zobrazení řešení v přehledech (pouze pro typ řešení "Vyzva pro nepřítomného pachatele dopravního přestupku")*/
		nezobrazovat_v_prehledech?: boolean|null;
		/**Datum předvolání/předvedení/dostavení (pouze pro typ řešení "Obsílka - předvedení", "Obsílka - předvolání", "Obsílka - vyrozumění")*/
		datum_obsilky?: JsonDate|null;
		/**Čas předvolání/předvedení/dostavení (pouze pro typ řešení "Obsílka - předvedení", "Obsílka - předvolání", "Obsílka - vyrozumění")*/
		cas_obsilky?: string|null;
		/**Důvod upomínky (pouze pro typ řešení "Obsílka - upomínka")*/
		duvod_upominky?: string|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		typ_reseni_nazev?: string|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		nazev_sablony?: string|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		pokutu_ulozil_nazev?: string|null;
	}
	const enum GPrrEvidenceRizeniMpReseniDtoNames { id_reseni = "id_reseni", id_reseni_int = "id_reseni_int", typ_reseni_id = "typ_reseni_id", id_ucastnika = "id_ucastnika", datum_vzniku = "datum_vzniku", sablona = "sablona", napomenuti = "napomenuti", pokuta = "pokuta", datum_ulozeni_pokuty = "datum_ulozeni_pokuty", datum_platnosti_pokuty = "datum_platnosti_pokuty", datum_splatnosti_pokuty = "datum_splatnosti_pokuty", pokutu_ulozil_id = "pokutu_ulozil_id", popis = "popis", zpusob_platby = "zpusob_platby", pokuta_zaplacena = "pokuta_zaplacena", datum_zaplaceni = "datum_zaplaceni", typ_postoupeni = "typ_postoupeni", poznamka = "poznamka", nezobrazovat_v_prehledech = "nezobrazovat_v_prehledech", datum_obsilky = "datum_obsilky", cas_obsilky = "cas_obsilky", duvod_upominky = "duvod_upominky", typ_reseni_nazev = "typ_reseni_nazev", nazev_sablony = "nazev_sablony", pokutu_ulozil_nazev = "pokutu_ulozil_nazev", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpReseniDtoFragments { id_reseni = "*", id_reseni_int = "*", typ_reseni_id = "*", id_ucastnika = "*", datum_vzniku = "*", sablona = "*", napomenuti = "*", pokuta = "*", datum_ulozeni_pokuty = "*", datum_platnosti_pokuty = "*", datum_splatnosti_pokuty = "*", pokutu_ulozil_id = "*", popis = "*", zpusob_platby = "*", pokuta_zaplacena = "*", datum_zaplaceni = "*", typ_postoupeni = "*", poznamka = "*", nezobrazovat_v_prehledech = "*", datum_obsilky = "*", cas_obsilky = "*", duvod_upominky = "*", typ_reseni_nazev = "*", nazev_sablony = "*", pokutu_ulozil_nazev = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpReseniDtoTypes { id_reseni = "string", id_reseni_int = "number", typ_reseni_id = "number", id_ucastnika = "string", datum_vzniku = "JsonDate", sablona = "string", napomenuti = "boolean", pokuta = "JsonDecimal", datum_ulozeni_pokuty = "JsonDate", datum_platnosti_pokuty = "JsonDate", datum_splatnosti_pokuty = "JsonDate", pokutu_ulozil_id = "string", popis = "string", zpusob_platby = "string", pokuta_zaplacena = "boolean", datum_zaplaceni = "JsonDate", typ_postoupeni = "string", poznamka = "string", nezobrazovat_v_prehledech = "boolean", datum_obsilky = "JsonDate", cas_obsilky = "string", duvod_upominky = "string", typ_reseni_nazev = "string", nazev_sablony = "string", pokutu_ulozil_nazev = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpReseniDtoTypeLengths { id_reseni = 12, id_ucastnika = 12, sablona = 20, pokutu_ulozil_id = 12, poznamka = 254, cas_obsilky = 5, typ_reseni_nazev = 50, nazev_sablony = 254, pokutu_ulozil_nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpSkutekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Skutek*/
	interface GPrrEvidenceRizeniMpSkutekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor skutku (pokud nebude zadán, jedná se o nový skutek).*/
		id_skutku?: string|null;
		/**Interní identifikátor skutku.*/
		id_skutku_int?: number|null;
		/**Typ zakládání účastníka*/
		typ_zakladani_ucastnika?: string|null;
		/**Identifikátor ESU (účastník skutku).*/
		id_ucastnika?: string|null;
		/**Identifikátor osoby (nutné pro editaci).*/
		id_osoby?: string|null;
		/**Identifikátor dotazu ISEP - pokud byl účastník lustrován v ISEP.*/
		zprava_isep?: string|null;
		/**Identifikátor dotazu odpovědi CRV - pokud byl účastník získán z CRV.*/
		guid_crv?: string|null;
		/**Jméno účastníka (pokud nebude zadán identifikátor ESU).*/
		jmeno_ucastnika?: string|null;
		/**Příjmení účastníka (pokud nebude zadán identifikátor ESU).*/
		prijmeni_ucastnika?: string|null;
		/**Datum narození účastníka (pokud nebude zadán identifikátor ESU)*/
		datum_narozeni_ucastnika?: JsonDate|null;
		/**Obec účastníka (pokud nebude zadán identifikátor ESU).*/
		obec_ucastnika?: string|null;
		/**Část obce účastníka (pokud nebude zadán identifikátor ESU).*/
		cast_obce_ucastnika?: string|null;
		/**PSČ účastníka (pokud nebude zadán identifikátor ESU).*/
		psc_ucastnika?: string|null;
		/**Ulice účastníka (pokud nebude zadán identifikátor ESU).*/
		ulice_ucastnika?: string|null;
		/**DČíslo orientační účastníka (pokud nebude zadán identifikátor ESU).*/
		cor_ucastnika?: string|null;
		/**Číslo popisné účastníka (pokud nebude zadán identifikátor ESU).*/
		cpop_ucastnika?: string|null;
		/**Stát účastníka - kód NNN (pokud nebude zadán identifikátor ESU).*/
		stat_ucastnika?: number|null;
		/**Státní příslušnost účastníka - kód NNN (pokud nebude zadán identifikátor ESU).*/
		statni_prislusnost_ucastnika?: number|null;
		/**Typ účastníka*/
		typ_ucastnika?: string|null;
		/**Typ účastníka původní (pro editaci)*/
		typ_ucastnika_puvodni?: string|null;
		/**Věková kategorie pachatele, obviněného*/
		vekova_kategorie_ucastnika?: string|null;
		/**Místo spáchání skutku*/
		misto_spachani?: string|null;
		/**DMísto spáchání skutku - GPS šířka.*/
		misto_spachani_gps_sirka?: string|null;
		/**Místo spáchání skutku - GPS délka.*/
		misto_spachani_gps_delka?: string|null;
		/**Kdo skutek oznámil*/
		oznamil?: string|null;
		/**RZ*/
		rz?: string|null;
		/**Typ vozidla*/
		typ_vozidla?: string|null;
		/**Tovární značka vozidla*/
		znacka_vozidla?: string|null;
		/**Model vozidla*/
		model_vozidla?: string|null;
		/**Barva vozidla*/
		barva_vozidla?: string|null;
		/**DBCOLUMN:Skutky.Rok_vyroby_vozidla*/
		rok_vyroby_vozidla?: number|null;
		/**Objem vozidla*/
		objem_vozidla?: string|null;
		/**Číslo technického průkazu vozidla*/
		cislo_tp_vozidla?: string|null;
		/**VIN kód vozidla*/
		vin_vozidla?: string|null;
		/**Datum poslední technické prohlídky vozidla*/
		datum_tk_vozidla?: JsonDate|null;
		/**Platnost technické prohlídky vozidla*/
		platnost_tk_vozidla?: JsonDate|null;
		/**Datum spáchání skutku*/
		datum_skutku?: JsonDate|null;
		/**Čas spáchání skutku*/
		cas_skutku?: string|null;
		/**Popis skutku.*/
		popis?: string|null;
		/**Id typu skutku*/
		typ_skutku_id?: string|null;
		/**Zda se má skutek odstrait*/
		odstranit?: boolean|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		typ_skutku_nazev?: string|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		adresa_ucastnika_nazev?: string|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		subjekt_nazev?: string|null;
	}
	const enum GPrrEvidenceRizeniMpSkutekDtoNames { id_skutku = "id_skutku", id_skutku_int = "id_skutku_int", typ_zakladani_ucastnika = "typ_zakladani_ucastnika", id_ucastnika = "id_ucastnika", id_osoby = "id_osoby", zprava_isep = "zprava_isep", guid_crv = "guid_crv", jmeno_ucastnika = "jmeno_ucastnika", prijmeni_ucastnika = "prijmeni_ucastnika", datum_narozeni_ucastnika = "datum_narozeni_ucastnika", obec_ucastnika = "obec_ucastnika", cast_obce_ucastnika = "cast_obce_ucastnika", psc_ucastnika = "psc_ucastnika", ulice_ucastnika = "ulice_ucastnika", cor_ucastnika = "cor_ucastnika", cpop_ucastnika = "cpop_ucastnika", stat_ucastnika = "stat_ucastnika", statni_prislusnost_ucastnika = "statni_prislusnost_ucastnika", typ_ucastnika = "typ_ucastnika", typ_ucastnika_puvodni = "typ_ucastnika_puvodni", vekova_kategorie_ucastnika = "vekova_kategorie_ucastnika", misto_spachani = "misto_spachani", misto_spachani_gps_sirka = "misto_spachani_gps_sirka", misto_spachani_gps_delka = "misto_spachani_gps_delka", oznamil = "oznamil", rz = "rz", typ_vozidla = "typ_vozidla", znacka_vozidla = "znacka_vozidla", model_vozidla = "model_vozidla", barva_vozidla = "barva_vozidla", rok_vyroby_vozidla = "rok_vyroby_vozidla", objem_vozidla = "objem_vozidla", cislo_tp_vozidla = "cislo_tp_vozidla", vin_vozidla = "vin_vozidla", datum_tk_vozidla = "datum_tk_vozidla", platnost_tk_vozidla = "platnost_tk_vozidla", datum_skutku = "datum_skutku", cas_skutku = "cas_skutku", popis = "popis", typ_skutku_id = "typ_skutku_id", odstranit = "odstranit", typ_skutku_nazev = "typ_skutku_nazev", adresa_ucastnika_nazev = "adresa_ucastnika_nazev", subjekt_nazev = "subjekt_nazev", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpSkutekDtoFragments { id_skutku = "*", id_skutku_int = "*", typ_zakladani_ucastnika = "*", id_ucastnika = "*", id_osoby = "*", zprava_isep = "*", guid_crv = "*", jmeno_ucastnika = "*", prijmeni_ucastnika = "*", datum_narozeni_ucastnika = "*", obec_ucastnika = "*", cast_obce_ucastnika = "*", psc_ucastnika = "*", ulice_ucastnika = "*", cor_ucastnika = "*", cpop_ucastnika = "*", stat_ucastnika = "*", statni_prislusnost_ucastnika = "*", typ_ucastnika = "*", typ_ucastnika_puvodni = "*", vekova_kategorie_ucastnika = "*", misto_spachani = "*", misto_spachani_gps_sirka = "*", misto_spachani_gps_delka = "*", oznamil = "*", rz = "*", typ_vozidla = "*", znacka_vozidla = "*", model_vozidla = "*", barva_vozidla = "*", rok_vyroby_vozidla = "*", objem_vozidla = "*", cislo_tp_vozidla = "*", vin_vozidla = "*", datum_tk_vozidla = "*", platnost_tk_vozidla = "*", datum_skutku = "*", cas_skutku = "*", popis = "*", typ_skutku_id = "*", odstranit = "*", typ_skutku_nazev = "*", adresa_ucastnika_nazev = "*", subjekt_nazev = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpSkutekDtoTypes { id_skutku = "string", id_skutku_int = "number", typ_zakladani_ucastnika = "string", id_ucastnika = "string", id_osoby = "string", zprava_isep = "string", guid_crv = "string", jmeno_ucastnika = "string", prijmeni_ucastnika = "string", datum_narozeni_ucastnika = "JsonDate", obec_ucastnika = "string", cast_obce_ucastnika = "string", psc_ucastnika = "string", ulice_ucastnika = "string", cor_ucastnika = "string", cpop_ucastnika = "string", stat_ucastnika = "number", statni_prislusnost_ucastnika = "number", typ_ucastnika = "string", typ_ucastnika_puvodni = "string", vekova_kategorie_ucastnika = "string", misto_spachani = "string", misto_spachani_gps_sirka = "string", misto_spachani_gps_delka = "string", oznamil = "string", rz = "string", typ_vozidla = "string", znacka_vozidla = "string", model_vozidla = "string", barva_vozidla = "string", rok_vyroby_vozidla = "number", objem_vozidla = "string", cislo_tp_vozidla = "string", vin_vozidla = "string", datum_tk_vozidla = "JsonDate", platnost_tk_vozidla = "JsonDate", datum_skutku = "JsonDate", cas_skutku = "string", popis = "string", typ_skutku_id = "string", odstranit = "boolean", typ_skutku_nazev = "string", adresa_ucastnika_nazev = "string", subjekt_nazev = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpSkutekDtoTypeLengths { id_skutku = 12, id_ucastnika = 12, id_osoby = 12, misto_spachani = 254, misto_spachani_gps_sirka = 12, misto_spachani_gps_delka = 12, oznamil = 254, rz = 20, znacka_vozidla = 50, model_vozidla = 50, barva_vozidla = 50, objem_vozidla = 10, cislo_tp_vozidla = 20, vin_vozidla = 50, cas_skutku = 5, typ_skutku_id = 12, typ_skutku_nazev = 254, adresa_ucastnika_nazev = 254, subjekt_nazev = 254,}
	const enum GPrrTypZakladaniUcastnikaEnum {
		id,
		udaje,
		guid_crv,
		nezakladat,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\EvidenceRizeni\GPrrEvidenceRizeniMpStraznikDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Strážník*/
	interface GPrrEvidenceRizeniMpStraznikDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor strážníka*/
		id?: string|null;
		/**Identifikátor strážníka (zmp)*/
		id_zmp?: string|null;
		/**Zda je strážník pověřen vyřízením případu*/
		vyrizuje?: boolean|null;
		/**Zda se jedná o nový záznam*/
		novy_zaznam?: boolean|null;
		/**Zda se má strážník odstrait*/
		odstranit?: boolean|null;
		/**Pomocný pouze pro FE
		*     !Na serveru se zahodí!
		*/
		nazev?: string|null;
	}
	const enum GPrrEvidenceRizeniMpStraznikDtoNames { id = "id", id_zmp = "id_zmp", vyrizuje = "vyrizuje", novy_zaznam = "novy_zaznam", odstranit = "odstranit", nazev = "nazev", Permissions = "Permissions",}
	const enum GPrrEvidenceRizeniMpStraznikDtoFragments { id = "*", id_zmp = "*", vyrizuje = "*", novy_zaznam = "*", odstranit = "*", nazev = "*", Permissions = "*",}
	const enum GPrrEvidenceRizeniMpStraznikDtoTypes { id = "string", id_zmp = "string", vyrizuje = "boolean", novy_zaznam = "boolean", odstranit = "boolean", nazev = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrEvidenceRizeniMpStraznikDtoTypeLengths { id_zmp = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\GPrrLustraceIsepOsobaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:~*/
	interface GPrrLustraceIsepOsobaDto extends GPrrBaseDetailPermissionsChybaDto {
		/**Identifikátor účastníka (ESU).*/
		id_ucastnika?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Rodné příjmení*/
		rodne_prijmeni?: string|null;
		/**Adresa*/
		adresa?: string|null;
		/**Datum narození*/
		datum_arozeni?: JsonDate|null;
		/**Rodné číslo*/
		rodne_cislo?: string|null;
	}
	const enum GPrrLustraceIsepOsobaDtoNames { id_ucastnika = "id_ucastnika", jmeno = "jmeno", prijmeni = "prijmeni", rodne_prijmeni = "rodne_prijmeni", adresa = "adresa", datum_arozeni = "datum_arozeni", rodne_cislo = "rodne_cislo",}
	const enum GPrrLustraceIsepOsobaDtoFragments { id_ucastnika = "*", jmeno = "*", prijmeni = "*", rodne_prijmeni = "*", adresa = "*", datum_arozeni = "*", rodne_cislo = "*",}
	const enum GPrrLustraceIsepOsobaDtoTypes { id_ucastnika = "string", jmeno = "string", prijmeni = "string", rodne_prijmeni = "string", adresa = "string", datum_arozeni = "JsonDate", rodne_cislo = "string",}
	const enum GPrrLustraceIsepOsobaDtoTypeLengths { id_ucastnika = 12, jmeno = 100, prijmeni = 100, rodne_prijmeni = 100, adresa = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\GPrrLustraceIsepPrestupekDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:~*/
	interface GPrrLustraceIsepPrestupekDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsChybaDto {
		/**Zákon*/
		zakon?: string|null;
		/**Paragraf*/
		paragraf?: string|null;
		/**Odstavec*/
		odstavec?: number|null;
		/**Písmeno*/
		pismeno?: string|null;
		/**Typ zavinění*/
		typ_zavineni_txt?: string|null;
		/**Složený text přestupku*/
		prestupek_txt?: string|null;
		/**Datum rozhodnutí*/
		datum_rozhodnuti?: JsonDate|null;
		/**Datum právní moci*/
		datum_pravni_moci?: JsonDate|null;
		/**OVM - označení*/
		ovm?: string|null;
		/**OVM - sídlo*/
		ovm_sidlo?: string|null;
		/**Sankce*/
		sankce?: string|null;
	}
	const enum GPrrLustraceIsepPrestupekDtoNames { zakon = "zakon", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", typ_zavineni_txt = "typ_zavineni_txt", prestupek_txt = "prestupek_txt", datum_rozhodnuti = "datum_rozhodnuti", datum_pravni_moci = "datum_pravni_moci", ovm = "ovm", ovm_sidlo = "ovm_sidlo", sankce = "sankce", Chyba = "Chyba", ExistujeChyba = "ExistujeChyba", Varovani = "Varovani", ExistujeVarování = "ExistujeVarování", Permissions = "Permissions",}
	const enum GPrrLustraceIsepPrestupekDtoFragments { zakon = "*", paragraf = "*", odstavec = "*", pismeno = "*", typ_zavineni_txt = "*", prestupek_txt = "*", datum_rozhodnuti = "*", datum_pravni_moci = "*", ovm = "*", ovm_sidlo = "*", sankce = "*", Chyba = "*", ExistujeChyba = "*", Varovani = "*", ExistujeVarování = "*", Permissions = "*",}
	const enum GPrrLustraceIsepPrestupekDtoTypes { zakon = "string", paragraf = "string", odstavec = "number", pismeno = "string", typ_zavineni_txt = "string", prestupek_txt = "string", datum_rozhodnuti = "JsonDate", datum_pravni_moci = "JsonDate", ovm = "string", ovm_sidlo = "string", sankce = "string", Chyba = "Gordic.Prr.Interface.GPrrChybaDto", ExistujeChyba = "boolean", Varovani = "Gordic.Prr.Interface.GPrrVarovaniDto", ExistujeVarování = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrLustraceIsepPrestupekDtoTypeLengths { zakon = 100, paragraf = 4, pismeno = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\GPrrLustraceIsepRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:~*/
	interface GPrrLustraceIsepRequestDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Typ lustrace*/
		typ?: Gordic.Prr.Interface.TypOvereniIsep|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Datum narození*/
		datum_narozeni?: JsonDate|null;
		/**Typ dokladu*/
		typ_dokladu?: Gordic.Prr.Interface.TypDokladuSzr|null;
		/**Číslo dokladu*/
		cislo_dokladu?: string|null;
		/**Státní příslušnost - kód státu (stat_sis_nnn).*/
		stat_kod?: number|null;
		/**Státní příslušnost - stát txt.*/
		stat_txt?: string|null;
		/**Stát narození - kód státu (stat_sis_nnn).*/
		stat_nar_kod?: number|null;
		/**Stát narození - stát txt.*/
		stat_nar_txt?: string|null;
		/**Místo narození*/
		misto_nar?: string|null;
	}
	const enum GPrrLustraceIsepRequestDtoNames { typ = "typ", jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", typ_dokladu = "typ_dokladu", cislo_dokladu = "cislo_dokladu", stat_kod = "stat_kod", stat_txt = "stat_txt", stat_nar_kod = "stat_nar_kod", stat_nar_txt = "stat_nar_txt", misto_nar = "misto_nar", Permissions = "Permissions",}
	const enum GPrrLustraceIsepRequestDtoFragments { typ = "*", jmeno = "*", prijmeni = "*", datum_narozeni = "*", typ_dokladu = "*", cislo_dokladu = "*", stat_kod = "*", stat_txt = "*", stat_nar_kod = "*", stat_nar_txt = "*", misto_nar = "*", Permissions = "*",}
	const enum GPrrLustraceIsepRequestDtoTypes { typ = "Gordic.Prr.Interface.TypOvereniIsep", jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", typ_dokladu = "Gordic.Prr.Interface.TypDokladuSzr", cislo_dokladu = "string", stat_kod = "number", stat_txt = "string", stat_nar_kod = "number", stat_nar_txt = "string", misto_nar = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrLustraceIsepRequestDtoTypeLengths { jmeno = 100, prijmeni = 100, stat_txt = 100, stat_nar_txt = 100, misto_nar = 100,}
	/**Typ ověření pro Isep*/
	const enum TypOvereniIsep {
		/**Dle jména, příjmení a data narození*/
		jmeno_prijmeni_datum_narozeni,
		/**Dle dokladu*/
		doklad,
		/**Dle jména, příjmení, data narození, stát, stát narození*/
		cizinec,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\GPrrLustraceIsepResponseDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:~*/
	interface GPrrLustraceIsepResponseDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsChybaDto {
		/**Identifikátor dotzu ISEP - Zprava-isep*/
		identifikator?: string|null;
		opisPdf?: string|null;
		Osoba?: Gordic.Prr.Interface.GPrrLustraceIsepOsobaDto|null;
		Prestupek?: Gordic.Prr.Interface.GPrrLustraceIsepPrestupekDto[]|null;
	}
	const enum GPrrLustraceIsepResponseDtoNames { identifikator = "identifikator", opisPdf = "opisPdf", Osoba = "Osoba", Prestupek = "Prestupek", Chyba = "Chyba", ExistujeChyba = "ExistujeChyba", Varovani = "Varovani", ExistujeVarování = "ExistujeVarování", Permissions = "Permissions",}
	const enum GPrrLustraceIsepResponseDtoFragments { identifikator = "*", opisPdf = "*", Osoba = "*", Prestupek = "*", Chyba = "*", ExistujeChyba = "*", Varovani = "*", ExistujeVarování = "*", Permissions = "*",}
	const enum GPrrLustraceIsepResponseDtoTypes { identifikator = "string", opisPdf = "string", Osoba = "Gordic.Prr.Interface.GPrrLustraceIsepOsobaDto", Prestupek = "Gordic.Prr.Interface.GPrrLustraceIsepPrestupekDto[]", Chyba = "Gordic.Prr.Interface.GPrrChybaDto", ExistujeChyba = "boolean", Varovani = "Gordic.Prr.Interface.GPrrVarovaniDto", ExistujeVarování = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrLustraceIsepResponseDtoTypeLengths { identifikator = 36,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuCizinecPravnickaRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku pro cizí právnickou osobu.*/
	interface GPrrOpisPrestupkuCizinecPravnickaRequestDto extends Gordic.Prr.Interface.GPrrOpisPrestupkuZakladRequestDto {
		/**SpZn*/
		spZn?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Identifikátor ESU - nemusí být vyplněn*/
		ixsEsu?: string|null;
		/**Název osoby*/
		nazev?: string|null;
		/**Sídlo - obec*/
		obec?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo popisné*/
		cp?: string|null;
		/**ZIP kód*/
		zip?: string|null;
		/**Kód státu (stat_sis_nnn)*/
		statKod?: number|null;
	}
	const enum GPrrOpisPrestupkuCizinecPravnickaRequestDtoNames { spZn = "spZn", ixp = "ixp", ixsEsu = "ixsEsu", nazev = "nazev", obec = "obec", ulice = "ulice", cp = "cp", zip = "zip", statKod = "statKod", vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuCizinecPravnickaRequestDtoFragments { spZn = "*", ixp = "*", ixsEsu = "*", nazev = "*", obec = "*", ulice = "*", cp = "*", zip = "*", statKod = "*", vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuCizinecPravnickaRequestDtoTypes { spZn = "string", ixp = "string", ixsEsu = "string", nazev = "string", obec = "string", ulice = "string", cp = "string", zip = "string", statKod = "number", vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuCizinecPravnickaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuCizinecRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku pro cizince (fyzická osoba).*/
	interface GPrrOpisPrestupkuCizinecRequestDto extends Gordic.Prr.Interface.GPrrOpisPrestupkuZakladRequestDto {
		/**SpZn*/
		spZn?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Datum narození*/
		datumNarozeni?: JsonDate|null;
		/**Kód státu - gincsta.stat_sis_nn*/
		statKod?: number|null;
		/**Stát TXT*/
		statTxt?: string|null;
		/**Místo narození TXT*/
		mistoNarTxt?: string|null;
		/**Stát narození kód - gincsta.stat_sis_nn*/
		statNarkod?: number|null;
		/**Stát narození TXT*/
		statNarTxt?: string|null;
		/**Kód okresu*/
		okresNarKod?: number|null;
		/**Název okresu (max 100)*/
		okresNarTxt?: string|null;
		/**Adresní lokalita (ruain)*/
		mistoNarKod?: number|null;
	}
	const enum GPrrOpisPrestupkuCizinecRequestDtoNames { spZn = "spZn", ixp = "ixp", jmeno = "jmeno", prijmeni = "prijmeni", datumNarozeni = "datumNarozeni", statKod = "statKod", statTxt = "statTxt", mistoNarTxt = "mistoNarTxt", statNarkod = "statNarkod", statNarTxt = "statNarTxt", okresNarKod = "okresNarKod", okresNarTxt = "okresNarTxt", mistoNarKod = "mistoNarKod", vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuCizinecRequestDtoFragments { spZn = "*", ixp = "*", jmeno = "*", prijmeni = "*", datumNarozeni = "*", statKod = "*", statTxt = "*", mistoNarTxt = "*", statNarkod = "*", statNarTxt = "*", okresNarKod = "*", okresNarTxt = "*", mistoNarKod = "*", vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuCizinecRequestDtoTypes { spZn = "string", ixp = "string", jmeno = "string", prijmeni = "string", datumNarozeni = "JsonDate", statKod = "number", statTxt = "string", mistoNarTxt = "string", statNarkod = "number", statNarTxt = "string", okresNarKod = "number", okresNarTxt = "string", mistoNarKod = "number", vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuCizinecRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuEsuRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku podle ESU / spisu / dokumentu.*/
	interface GPrrOpisPrestupkuEsuRequestDto extends Gordic.Prr.Interface.GPrrOpisPrestupkuZakladRequestDto {
		/**Identifikátor ESU*/
		ixsEsu?: string|null;
		/**SpZn*/
		spZn?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
	}
	const enum GPrrOpisPrestupkuEsuRequestDtoNames { ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuEsuRequestDtoFragments { ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuEsuRequestDtoTypes { ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuEsuRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuPravnickaRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku pro právnickou osobu podle IČO.*/
	interface GPrrOpisPrestupkuPravnickaRequestDto extends Gordic.Prr.Interface.GPrrOpisPrestupkuZakladRequestDto {
		/**SpZn*/
		spZn?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Identifikátor ESU - nemusí být vyplněn*/
		ixsEsu?: string|null;
		/**IČO*/
		ico?: number|null;
	}
	const enum GPrrOpisPrestupkuPravnickaRequestDtoNames { spZn = "spZn", ixp = "ixp", ixsEsu = "ixsEsu", ico = "ico", vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuPravnickaRequestDtoFragments { spZn = "*", ixp = "*", ixsEsu = "*", ico = "*", vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuPravnickaRequestDtoTypes { spZn = "string", ixp = "string", ixsEsu = "string", ico = "number", vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuPravnickaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku podle fyzické osoby (jméno, příjmení, datum narození, doklad).*/
	interface GPrrOpisPrestupkuRequestDto extends Gordic.Prr.Interface.GPrrOpisPrestupkuZakladRequestDto {
		/**Zda se dohledává podle dokladu*/
		podleDokladu?: boolean|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Datum narození*/
		datNar?: JsonDate|null;
		/**Typ dokladu*/
		typDokladu?: Gordic.Prr.Interface.TypDokladuSzr|null;
		/**Číslo dokladu*/
		cisloDokladu?: string|null;
	}
	const enum GPrrOpisPrestupkuRequestDtoNames { podleDokladu = "podleDokladu", jmeno = "jmeno", prijmeni = "prijmeni", datNar = "datNar", typDokladu = "typDokladu", cisloDokladu = "cisloDokladu", vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuRequestDtoFragments { podleDokladu = "*", jmeno = "*", prijmeni = "*", datNar = "*", typDokladu = "*", cisloDokladu = "*", vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuRequestDtoTypes { podleDokladu = "boolean", jmeno = "string", prijmeni = "string", datNar = "JsonDate", typDokladu = "Gordic.Prr.Interface.TypDokladuSzr", cisloDokladu = "string", vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISEP\Requests\GPrrOpisPrestupkuZakladRequestDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Opis přestupku základ pro obalení*/
	interface GPrrOpisPrestupkuZakladRequestDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Zda se má získávat PDF*/
		vydejPdf?: boolean|null;
		/**Zda se má zakládat ESU*/
		zakladatEsu?: boolean|null;
		/**Zda se má vytvářet dokuemnt*/
		vytvaretDokument?: boolean|null;
		/**Identifikátor případu*/
		ixsPri?: string|null;
		/**Identifikátor události*/
		ixsUda?: string|null;
		/**Identifikátor události*/
		ixsOso?: string|null;
	}
	const enum GPrrOpisPrestupkuZakladRequestDtoNames { vydejPdf = "vydejPdf", zakladatEsu = "zakladatEsu", vytvaretDokument = "vytvaretDokument", ixsPri = "ixsPri", ixsUda = "ixsUda", ixsOso = "ixsOso", Permissions = "Permissions",}
	const enum GPrrOpisPrestupkuZakladRequestDtoFragments { vydejPdf = "*", zakladatEsu = "*", vytvaretDokument = "*", ixsPri = "*", ixsUda = "*", ixsOso = "*", Permissions = "*",}
	const enum GPrrOpisPrestupkuZakladRequestDtoTypes { vydejPdf = "boolean", zakladatEsu = "boolean", vytvaretDokument = "boolean", ixsPri = "string", ixsUda = "string", ixsOso = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrOpisPrestupkuZakladRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISSS\GPatrmvParametryHledaniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Dto pro GPatrmvParametryHledaniDto*/
	interface GPatrmvParametryHledaniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**mpz*/
		mpz?: string|null;
		/**vin*/
		vin?: string|null;
		/**rz*/
		rz?: string|null;
		/**druh_vozidla*/
		druh_vozidla?: string|null;
		/**vyrobce*/
		vyrobce?: string|null;
		/**typ*/
		typ?: string|null;
		/**barva*/
		barva?: string|null;
		/**důvod/účel*/
		duvod_ucel?: string|null;
		/**certifikát*/
		cert?: string|null;
	}
	const enum GPatrmvParametryHledaniDtoNames { mpz = "mpz", vin = "vin", rz = "rz", druh_vozidla = "druh_vozidla", vyrobce = "vyrobce", typ = "typ", barva = "barva", duvod_ucel = "duvod_ucel", cert = "cert", Permissions = "Permissions",}
	const enum GPatrmvParametryHledaniDtoFragments { mpz = "*", vin = "*", rz = "*", druh_vozidla = "*", vyrobce = "*", typ = "*", barva = "*", duvod_ucel = "*", cert = "*", Permissions = "*",}
	const enum GPatrmvParametryHledaniDtoTypes { mpz = "string", vin = "string", rz = "string", druh_vozidla = "string", vyrobce = "string", typ = "string", barva = "string", duvod_ucel = "string", cert = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPatrmvParametryHledaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISSS\GPatrosParametryHledaniDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Dto pro GPatrosParametryHledaniDto*/
	interface GPatrosParametryHledaniDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**jmeno*/
		jmeno?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**DatumNarozeni*/
		datum_narozeni?: JsonDate|null;
		/**StatniPrislusnost*/
		statni_prislusnost?: string|null;
		/**Pohlavi*/
		pohlavi?: string|null;
		/**důvod/účel*/
		duvod_ucel?: string|null;
		/**certifikát*/
		cert?: string|null;
	}
	const enum GPatrosParametryHledaniDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", statni_prislusnost = "statni_prislusnost", pohlavi = "pohlavi", duvod_ucel = "duvod_ucel", cert = "cert", Permissions = "Permissions",}
	const enum GPatrosParametryHledaniDtoFragments { jmeno = "*", prijmeni = "*", datum_narozeni = "*", statni_prislusnost = "*", pohlavi = "*", duvod_ucel = "*", cert = "*", Permissions = "*",}
	const enum GPatrosParametryHledaniDtoTypes { jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", statni_prislusnost = "string", pohlavi = "string", duvod_ucel = "string", cert = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPatrosParametryHledaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISSS\GPrrPatrmvDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Dto pro PATRMV*/
	interface GPrrPatrmvDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**guid_dotazu*/
		guid_dotazu?: string|null;
		/**cas_vytv_req*/
		cas_vytv_req?: JsonDate|null;
		/**stav_kod*/
		odpoved_cas?: JsonDate|null;
		/**nazev_sluzby*/
		nazev_sluzby?: string|null;
		/**mpz*/
		mpz?: string|null;
		/**rz*/
		rz?: string|null;
		/**vin*/
		vin?: string|null;
		/**druh_vozidla*/
		druh_vozidla?: string|null;
		/**vyrobce*/
		vyrobce?: string|null;
		/**typ*/
		typ?: string|null;
		/**barva*/
		barva?: string|null;
		/**vysledek*/
		vysledek?: string|null;
		/**varovani*/
		varovani?: string|null;
		/**nalezno*/
		dohledano?: boolean|null;
		/**zprava_typ*/
		zprava_typ?: string|null;
		/**zprava_kod*/
		zprava_kod?: string|null;
		/**zprava_popis*/
		zprava_popis?: string|null;
	}
	const enum GPrrPatrmvDtoNames { guid_dotazu = "guid_dotazu", cas_vytv_req = "cas_vytv_req", odpoved_cas = "odpoved_cas", nazev_sluzby = "nazev_sluzby", mpz = "mpz", rz = "rz", vin = "vin", druh_vozidla = "druh_vozidla", vyrobce = "vyrobce", typ = "typ", barva = "barva", vysledek = "vysledek", varovani = "varovani", dohledano = "dohledano", zprava_typ = "zprava_typ", zprava_kod = "zprava_kod", zprava_popis = "zprava_popis", Permissions = "Permissions",}
	const enum GPrrPatrmvDtoFragments { guid_dotazu = "*", cas_vytv_req = "*", odpoved_cas = "*", nazev_sluzby = "*", mpz = "*", rz = "*", vin = "*", druh_vozidla = "*", vyrobce = "*", typ = "*", barva = "*", vysledek = "*", varovani = "*", dohledano = "*", zprava_typ = "*", zprava_kod = "*", zprava_popis = "*", Permissions = "*",}
	const enum GPrrPatrmvDtoTypes { guid_dotazu = "string", cas_vytv_req = "JsonDate", odpoved_cas = "JsonDate", nazev_sluzby = "string", mpz = "string", rz = "string", vin = "string", druh_vozidla = "string", vyrobce = "string", typ = "string", barva = "string", vysledek = "string", varovani = "string", dohledano = "boolean", zprava_typ = "string", zprava_kod = "string", zprava_popis = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrPatrmvDtoTypeLengths { guid_dotazu = 36, nazev_sluzby = 100, zprava_typ = 20, zprava_kod = 100, zprava_popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\ISSS\GPrrPatrosDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Dto pro PATROS*/
	interface GPrrPatrosDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**guid_dotazu*/
		guid_dotazu?: string|null;
		/**cas_vytv_req*/
		cas_vytv_req?: JsonDate|null;
		/**stav_kod*/
		odpoved_cas?: JsonDate|null;
		/**nazev_sluzby*/
		nazev_sluzby?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**DatumNarozeni*/
		datum_narozeni?: JsonDate|null;
		/**StatniPrislusnost*/
		statni_prislusnost?: string|null;
		/**Pohlavi*/
		pohlavi?: string|null;
		/**RodneCislo*/
		rodne_cislo?: string|null;
		/**vysledek*/
		vysledek?: string|null;
		/**varovani*/
		varovani?: string|null;
		/**fotografie*/
		fotografie?: any[]|null;
		/**nalezno*/
		dohledano?: boolean|null;
		/**zprava_typ*/
		zprava_typ?: string|null;
		/**zprava_kod*/
		zprava_kod?: string|null;
		/**zprava_popis*/
		zprava_popis?: string|null;
	}
	const enum GPrrPatrosDtoNames { guid_dotazu = "guid_dotazu", cas_vytv_req = "cas_vytv_req", odpoved_cas = "odpoved_cas", nazev_sluzby = "nazev_sluzby", jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", statni_prislusnost = "statni_prislusnost", pohlavi = "pohlavi", rodne_cislo = "rodne_cislo", vysledek = "vysledek", varovani = "varovani", fotografie = "fotografie", dohledano = "dohledano", zprava_typ = "zprava_typ", zprava_kod = "zprava_kod", zprava_popis = "zprava_popis", Permissions = "Permissions",}
	const enum GPrrPatrosDtoFragments { guid_dotazu = "*", cas_vytv_req = "*", odpoved_cas = "*", nazev_sluzby = "*", jmeno = "*", prijmeni = "*", datum_narozeni = "*", statni_prislusnost = "*", pohlavi = "*", rodne_cislo = "*", vysledek = "*", varovani = "*", fotografie = "*", dohledano = "*", zprava_typ = "*", zprava_kod = "*", zprava_popis = "*", Permissions = "*",}
	const enum GPrrPatrosDtoTypes { guid_dotazu = "string", cas_vytv_req = "JsonDate", odpoved_cas = "JsonDate", nazev_sluzby = "string", jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", statni_prislusnost = "string", pohlavi = "string", rodne_cislo = "string", vysledek = "string", varovani = "string", fotografie = "any[]", dohledano = "boolean", zprava_typ = "string", zprava_kod = "string", zprava_popis = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrPatrosDtoTypeLengths { guid_dotazu = 36, nazev_sluzby = 100, zprava_typ = 20, zprava_kod = 100, zprava_popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Permissions\GPrrBaseDetailPermissions.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Permissions přímo pro modul PRR*/
	interface GPrrBaseDetailPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
	}
	const enum GPrrBaseDetailPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GPrrBaseDetailPermissionsFragments { CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GPrrBaseDetailPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPrrBaseDetailPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Permissions\GPrrBaseDetailPermissionsChybaDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Permissions přímo pro modul PRR doplněno o chyby primárně pro WS*/
	interface GPrrBaseDetailPermissionsChybaDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Detaily chyby; null znamená "žádná chyba".*/
		Chyba?: Gordic.Prr.Interface.GPrrChybaDto|null;
		/**Indikuje, zda došlo k chybě.*/
		readonly ExistujeChyba?: boolean|null;
		/**Detaily varovani; null znamená "žádné varování".*/
		Varovani?: Gordic.Prr.Interface.GPrrVarovaniDto|null;
		/**Indikuje, zda došlo k varování.*/
		readonly ExistujeVarování?: boolean|null;
	}
	const enum GPrrBaseDetailPermissionsChybaDtoNames { Chyba = "Chyba", ExistujeChyba = "ExistujeChyba", Varovani = "Varovani", ExistujeVarování = "ExistujeVarování", Permissions = "Permissions",}
	const enum GPrrBaseDetailPermissionsChybaDtoFragments { Chyba = "*", ExistujeChyba = "*", Varovani = "*", ExistujeVarování = "*", Permissions = "*",}
	const enum GPrrBaseDetailPermissionsChybaDtoTypes { Chyba = "Gordic.Prr.Interface.GPrrChybaDto", ExistujeChyba = "boolean", Varovani = "Gordic.Prr.Interface.GPrrVarovaniDto", ExistujeVarování = "boolean", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrBaseDetailPermissionsChybaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Permissions\GPrrBaseDetailPermissionsDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Obecné DTO pro dědění v PRR
	*     Jsou zde Permissions GBaseDetailPermissions + přímo pro modul PRR
	*/
	interface GPrrBaseDetailPermissionsDto {
		Permissions?: Gordic.Prr.Interface.GPrrBaseDetailPermissions|null;
	}
	const enum GPrrBaseDetailPermissionsDtoNames { Permissions = "Permissions",}
	const enum GPrrBaseDetailPermissionsDtoFragments { Permissions = "*",}
	const enum GPrrBaseDetailPermissionsDtoTypes { Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrBaseDetailPermissionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Pripad\GPrrDukazPripaduDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DBTABLE:prrddkz*/
	interface GPrrDukazPripaduDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:prrddkz.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:prrddkz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:prrddkz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:prrddkz.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:prrddkz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:prrddkz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:prrddkz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:prrddkz.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GPrrDukazPripaduDtoNames { ixs_pri = "ixs_pri", por_cislo = "por_cislo", nazev = "nazev", poradi = "poradi", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GPrrDukazPripaduDtoFragments { ixs_pri = "*", por_cislo = "*", nazev = "*", poradi = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GPrrDukazPripaduDtoTypes { ixs_pri = "string", por_cislo = "number", nazev = "string", poradi = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrrDukazPripaduDtoTypeLengths { ixs_pri = 12, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\DTO\Pripad\GPrrPrilohaPripaduDto.d.ts 

declare namespace Gordic.Prr.Interface {
	/**DTO pro přidání elektronické přílohy k případu*/
	interface GPrrPrilohaPripaduDto extends Gordic.Prr.Interface.GPrrBaseDetailPermissionsDto {
		/**Identifikátor případu.*/
		ixs_pri?: string|null;
		/**Název souboru bez přípony*/
		jmeno_souboru?: string|null;
		/**Přípona souboru bez tečky*/
		pripona_souboru?: string|null;
		/**Textový popis charakterizující stručně obsah elektronického souboru.*/
		titulek_souboru?: string|null;
		/**Textový podrobný popis charakterizující obsah elektronického souboru.*/
		popis_souboru?: string|null;
		/**Binární data souboru v base64 formátu.*/
		data?: any[]|null;
		/**Identifikátor elktronického dokuemntu*/
		ixb?: string|null;
	}
	const enum GPrrPrilohaPripaduDtoNames { ixs_pri = "ixs_pri", jmeno_souboru = "jmeno_souboru", pripona_souboru = "pripona_souboru", titulek_souboru = "titulek_souboru", popis_souboru = "popis_souboru", data = "data", ixb = "ixb", Permissions = "Permissions",}
	const enum GPrrPrilohaPripaduDtoFragments { ixs_pri = "*", jmeno_souboru = "*", pripona_souboru = "*", titulek_souboru = "*", popis_souboru = "*", data = "*", ixb = "*", Permissions = "*",}
	const enum GPrrPrilohaPripaduDtoTypes { ixs_pri = "string", jmeno_souboru = "string", pripona_souboru = "string", titulek_souboru = "string", popis_souboru = "string", data = "any[]", ixb = "string", Permissions = "Gordic.Prr.Interface.GPrrBaseDetailPermissions",}
	const enum GPrrPrilohaPripaduDtoTypeLengths { ixs_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\ISEP\Gordic.Prr.Interface.IGISEP.d.ts 

declare namespace Gordic.Prr.Interface {
	/**Typ dokladu pro SZR*/
	const enum TypDokladuSzr {
		/**Občanský průkaz*/
		ID,
		/**Cestovní pas*/
		P,
		/**Povolení k pobytu*/
		IR,
		/**Vízový štítek*/
		VS,
		/**Pobytový štítek*/
		PS,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Prr.Interface\ISL\Administrace\IGPrrFormularDenikuService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Formuláře navázané na deníky přestupkového řízení/městské policie
	* @domain Prestupky
	* @businessObject PrrFormularDenikuPrestupku
	*/
	interface PrrFormularDenikuPrestupku {
		/**Default*/
		default(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
		/**Read*/
		read(rq?:Gordic.Prr.Interface.GPrrFormularDenikuDto|CallParams<GServiceReadRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>>): _Task<GServiceReadRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>,GServiceReadResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Prr.Interface.GPrrFormularDenikuDto|CallParams<GServiceSaveRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>>): _Task<GServiceSaveRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>,GServiceSaveResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
		/**Odstranit*/
		delete(rq?:Gordic.Prr.Interface.GPrrFormularDenikuDto|CallParams<GServiceActionRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>>): _Task<GServiceActionRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>,GServiceActionResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
		/**Obnovit*/
		restore(rq?:Gordic.Prr.Interface.GPrrFormularDenikuDto|CallParams<GServiceActionRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>>): _Task<GServiceActionRequest<Gordic.Prr.Interface.GPrrFormularDenikuDto>,GServiceActionResponse<Gordic.Prr.Interface.GPrrFormularDenikuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrrFormularDenikuPrestupku: ServiceBase & Catalog.PrrFormularDenikuPrestupku;
	}
	const PrrFormularDenikuPrestupku: Client["PrrFormularDenikuPrestupku"];
}
declare namespace Gordic.Prr.Interface {
	/**Filtr pro formuláře deníků*/
	const enum GPrrFormularDenikuFilterEnum {
		/**Šablona*/
		sablona,
		/**Aktivita*/
		aktivita,
		/**Identifikátor deníku*/
		ixs_rad,
		/**Typ deníku*/
		prrsrad_typ_den,
	}
}

//#endregion

