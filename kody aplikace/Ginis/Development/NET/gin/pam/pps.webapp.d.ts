declare namespace Gordic.Pps.WebApp {
    /**
     * Definice formul��� pro u�ivatelsk� nastaven�
     *
     * @returns {Forms.Form[]} formul��e
     */
    function ListsSettingsForm(): Forms.Form[];
}
declare namespace Gordic.Pps.WebApp {
    class GAtributyNks extends GContentBase {
        private dtoNks;
        private formAtributyNks;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceAtributyNksUlozit: string;
            akceAtributyNksVycistit: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GDashboard extends GContentBase {
        private ico;
        private rokobdmzdy;
        static NazvyAkci: {
            akceDashboardNovy: string;
            akceDashboardEditovat: string;
            akceDashboardAktualizovat: string;
            akceDashboardZmenaRadku: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GFiltry extends GContentBase {
        private tabmanager;
        private divGrids;
        private tabAktivniFiltryJednotlive;
        private gridAktivniFiltryJednotlive;
        private viewAktivniFiltryJednotlive;
        private SouhrnAktivnichFiltruJednotlive;
        private SouhrnAktivnichFiltruJednotliveP;
        private tabAktivniFiltryKategorie;
        private gridAktivniFiltryKategorie;
        private viewAktivniFiltryKategorie;
        private SouhrnAktivnichFiltruKategorie;
        private SouhrnAktivnichFiltruKategorieP;
        private pocetRadku;
        private idFiltru;
        private idTab;
        static NazvyAkci: {
            akceFiltryAktualizovat: string;
            akceFiltryJednotliveAktualizovat: string;
            akceFiltryKategorieAktualizovat: string;
            akceFiltryZobrazitPodrobnosti: string;
        };
        private readonly logger;
        onContentReady(): void;
        private vytvorTaby;
        private vytvorAkce;
        private vytvorBar;
    }
}
declare namespace Gordic.Pps.WebApp {
    /** Souhrn povinných filtrů při nenastavené masce
    * @param {GContent} cnt content
    * @param {boolean} pridatObdobi [false] Zda přidat výchozí období
    * @param {boolean} pridatVychoziStrom [false] Zda přidat výchozí strom
    * @param {boolean} pridatMasku [false] Zda přidat výchozí masku
    * @returns {Pam.Interface.GFiltrDto[]} Pole Dto se souhrnem povinných filtrů při nenastavené masce
    */
    function SouhrnPovinnychFiltru(cnt: GContent, pridatObdobi?: boolean, pridatVychoziStrom?: boolean, pridatMasku?: boolean): Pam.Interface.GFiltrDto[];
    /** Souhrn všech filtrů ze všech aktivních filtrů
    * @param cnt Kontext
    * @param navicPovinne Zda zahrnout ke všem filtrům navíc povinné filtry (výchozí stav ano)
    * @param pouzePovinne Zda zahrnout pouze povinné filtry (výchozí stav ne)
    * @param zahrnoutVychoziStrom Zda zahrnout výchozí strom (výchozí stav ne)
    * @returns Dto se souhrnem všech uložených filtrů
    */
    function SouhrnVsechFiltru(cnt: GContent, navicPovinne?: boolean, pouzePovinne?: boolean, zahrnoutVychoziStrom?: boolean): Pam.Interface.GFiltrVseDto;
    /** Souhrn aktivních filtrů (kategorie)
    * @param cnt Kontext
    * @param navicPovinne Zda zahrnout navíc povinné filtry (výchozí stav ano)
    * @param pouzePovinne Zda zahrnout pouze povinné filtry (výchozí stav ne)
    * @param zahrnoutVychoziStrom Zda zahrnout výchozí strom (výchozí stav ne)
    * @returns Dto se seznamem aktivních filtrů (kategorie) s počtem filtračních kritérií
    */
    function SouhrnAktivnichFiltruKategorie(cnt: GContent, navicPovinne?: boolean, pouzePovinne?: boolean, zahrnoutVychoziStrom?: boolean): Pam.Interface.GFiltrVseDto;
    /** Souhrn aktivních filtrů (jednotlivě)
    * @param cnt Kontext
    * @param navicPovinne Zda zahrnout navíc povinné filtry (výchozí stav ano)
    * @param pouzePovinne Zda zahrnout pouze povinné filtry (výchozí stav ne)
    * @param zahrnoutVychoziStrom Zda zahrnout výchozí strom (výchozí stav ne)
    * @param ixsMas PID masky pro výběr jen uložených filtrů dané masky (výchozí stav je "")
    * @returns Dto se seznamem aktivních filtrů (jednotlivě) - každé kritérium na jednom řádku
    */
    function SouhrnAktivnichFiltruJednotlive(cnt: GContent, navicPovinne?: boolean, pouzePovinne?: boolean, zahrnoutVychoziStrom?: boolean, ixsMas?: string): Pam.Interface.GFiltrVseDto;
    /** Nastaví filtry dle vstupního DTO s filtry
    * @param cnt Kontext
    * @param filtry Dto se souhrnem všech filtrů pro nastavení
    * @param nechatVychoziMasku Zda nechat výchozí masku
    */
    function NastavitFiltry(cnt: GContent, filtry: Pam.Interface.GFiltrVseDto, nechatVychoziMasku?: boolean): void;
}
declare namespace Gordic.Pps.WebApp {
    class GMaskaDetail extends GContentBase {
        private tabManager;
        private gridMaskaDetail;
        private viewMaskaDetail;
        private SouhrnAktivnichFiltruJednotlive;
        private SouhrnAktivnichFiltruJednotliveP;
        private pocetRadku;
        private ixs_mas;
        static NazvyAkci: {
            akceMaskaDetailAktualizovat: string;
        };
        private readonly logger;
        onContentReady(): void;
        private vytvorAkce;
        private vytvorBar;
        private vytvorTabs;
        private vytvorForm;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GMasky extends GContentBase {
        private ixsFun;
        private viewMasky;
        private dtoMaska;
        private dtoMaskaVychozi;
        private gridMasky;
        private dtoFiltry;
        private formUkladaciDialog;
        private formMasky;
        static NazvyAkci: {
            akceMaskyNovy: string;
            akceMaskyEditovat: string;
            akceMaskyUlozit: string;
            akceMaskyVycistit: string;
            akceMaskySmazat: string;
            akceMaskyAktualizovat: string;
            akceMaskyZmenaRadku: string;
            akceMaskyUlozitDo: string;
            akceMaskyNacist: string;
            akceMaskyDetail: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukládací dialog
        * @param {GMasky} mainContent
        * @param {Gordic.Pam.Interface.GMaskaDto} dto Dto pro ukládaná data
        * @param {GAction} akce akce, která vyvolala dialog
        * @param {any} ctx
        */
        UkladaciDialog(mainContent: GMasky, dto: Gordic.Pam.Interface.GMaskaDto, akce: GAction, ctx: any): void;
        vytvorBar(): void;
        zakazatAkce(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GObdobi extends GContentBase {
        private dtoObdobi;
        private formObdobi;
        private pocetRadku;
        private idFiltru;
        private rok;
        private mesic;
        private rokobdmzdy;
        static NazvyAkci: {
            akceObdobiUlozit: string;
            akceObdobiDlePrihlaseni: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GVlastniNks extends GContentBase {
        private viewVlastniNks;
        private ixsFun;
        static NazvyAkci: {
            akceVlastniNksAktualizovat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSlozkyDnp extends GContentBase {
        private gridSlozkyDnp;
        private viewSlozkyDnp;
        private grid;
        private view;
        private slozkyDnp;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSlozkyDnpPridat: string;
            akceSlozkyDnpOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSlozkyDnp} mainContent
        * @param {Gordic.Pam.Interface.GSlozkaMzdyDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSlozkyDnp, _dto: Gordic.Pam.Interface.GSlozkaMzdyDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSlozkyMzm extends GContentBase {
        private gridSlozkyMzm;
        private viewSlozkyMzm;
        private grid;
        private view;
        private slozkyMzm;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSlozkyMzmPridat: string;
            akceSlozkyMzmOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSlozkyMzm} mainContent
        * @param {Gordic.Pam.Interface.GSlozkaMzdyDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSlozkyMzm, _dto: Gordic.Pam.Interface.GSlozkaMzdyDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GDosazeneVzdelani extends GContentBase {
        private gridDosazeneVzdelani;
        private viewDosazeneVzdelani;
        private grid;
        private view;
        private dosazeneVzdelani;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceDosazeneVzdelaniPridat: string;
            akceDosazeneVzdelaniOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GDosazeneVzdelani} mainContent
        * @param {Gordic.Pam.Interface.GDosazeneVzdelaniDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GDosazeneVzdelani, _dto: Gordic.Pam.Interface.GDosazeneVzdelaniDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GKategorieSystMista extends GContentBase {
        private gridKategorieSystMista;
        private viewKategorieSystMista;
        private grid;
        private view;
        private kategorieSystMista;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceKategorieSystMistaPridat: string;
            akceKategorieSystMistaOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GKategorieSystMista} mainContent
        * @param {Gordic.Pam.Interface.GKategorieSystMistaDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GKategorieSystMista, _dto: Gordic.Pam.Interface.GKategorieSystMistaDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GKodFunkce extends GContentBase {
        private gridKodFunkce;
        private viewKodFunkce;
        private grid;
        private view;
        private kodFunkce;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceKodFunkcePridat: string;
            akceKodFunkceOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GKodFunkce} mainContent
        * @param {Gordic.Pam.Interface.GKodFunkceDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GKodFunkce, _dto: Gordic.Pam.Interface.GKodFunkceDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GOboryStatniSluzby extends GContentBase {
        private gridOboryStatniSluzby;
        private viewOboryStatniSluzby;
        private grid;
        private view;
        private oboryStatniSluzby;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceOboryStatniSluzbyPridat: string;
            akceOboryStatniSluzbyOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GOboryStatniSluzby} mainContent
        * @param {Gordic.Pam.Interface.GCiselnikSpeDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GOboryStatniSluzby, _dto: Gordic.Pam.Interface.GCiselnikSpeDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSpecifickePozadavky extends GContentBase {
        private gridSpecifickePozadavky;
        private viewSpecifickePozadavky;
        private grid;
        private view;
        private specifickePozadavky;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSpecifickePozadavkyPridat: string;
            akceSpecifickePozadavkyOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSpecifickePozadavky} mainContent
        * @param {Gordic.Pam.Interface.GCiselnikSpeDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSpecifickePozadavky, _dto: Gordic.Pam.Interface.GCiselnikSpeDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GZdravotnictvi extends GContentBase {
        private gridZdravotnictvi;
        private viewZdravotnictvi;
        private grid;
        private view;
        private zdravotnictvi;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceZdravotnictviPridat: string;
            akceZdravotnictviOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GZdravotnictvi} mainContent
        * @param {Gordic.Pam.Interface.GZdravotnictviDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GZdravotnictvi, _dto: Gordic.Pam.Interface.GZdravotnictviDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GAdresyOsob extends GContentBase {
        private gridAdresyOsob;
        private viewAdresyOsob;
        private formUkladaciDialog;
        private aktivniPridat;
        private zadanoTypAdo;
        private zadanoUlice;
        private zadanoCor;
        private zadanoCpop;
        private zadanoObec;
        private zadanoCastObce;
        private zadanoPsc;
        private zadanoStat;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceAdresyOsobPridat: string;
            akceAdresyOsobOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GAdresyOsob} mainContent
        * @param {Gordic.Pam.Interface.GAdresaDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GAdresyOsob, _dto: Gordic.Pam.Interface.GAdresaDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GHodnotovePersonalniUdaje extends GContentBase {
        private gridHodnotovePersonalniUdaje;
        private viewHodnotovePersonalniUdaje;
        private ixscis;
        private typUda;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceHodnotovePersonalniUdajePridat: string;
            akceHodnotovePersonalniUdajeOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GAdresyOsob} mainContent
        * @param {Gordic.Pam.Interface.GAdresaDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GHodnotovePersonalniUdaje, _dto: Gordic.Pam.Interface.GPersonalniUdajDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GVyctovePersonalniUdaje extends GContentBase {
        private gridVyctovePersonalniUdaje;
        private viewVyctovePersonalniUdaje;
        private grid;
        private view;
        private vyctovePersonalniUdaje;
        private ixscis;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceVyctovePersonalniUdajePridat: string;
            akceVyctovePersonalniUdajeOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GVyctovePersonalniUdaje} mainContent
        * @param {Gordic.Pam.Interface.GPersonalniUdajDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GVyctovePersonalniUdaje, _dto: Gordic.Pam.Interface.GPersonalniUdajDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GDruhyPpv extends GContentBase {
        private gridDruhyPpv;
        private viewDruhyPpv;
        private grid;
        private view;
        private druhyPpv;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceDruhyPpvPridat: string;
            akceDruhyPpvOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GDruhyPpv} mainContent
        * @param {Gordic.Pam.Interface.GPpvDruhPpvDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GDruhyPpv, _dto: Gordic.Pam.Interface.GPpvDruhPpvDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GDruhyVyneti extends GContentBase {
        private gridDruhyVyneti;
        private viewDruhyVyneti;
        private grid;
        private view;
        private druhyVyneti;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceDruhyVynetiPridat: string;
            akceDruhyVynetiOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GDruhyVyneti} mainContent
        * @param {Gordic.Pam.Interface.GPpvDruhVynetiDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GDruhyVyneti, _dto: Gordic.Pam.Interface.GPpvDruhVynetiDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GKlasifikaceZamestnani extends GContentBase {
        private gridKlasifikaceZamestnani;
        private viewKlasifikaceZamestnani;
        private grid;
        private view;
        private klasifikaceZamestnani;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceKlasifikaceZamestnaniPridat: string;
            akceKlasifikaceZamestnaniOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukládací dialog
        * @param {GKlasifikaceZamestnani} mainContent
        * @param {Gordic.Pam.Interface.GKlasifikaceZamestnaniDto} _dto Dto pro ukládaná data
        * @param {GAction} akce akce, která vyvolala dialog
        */
        UkladaciDialog(mainContent: GKlasifikaceZamestnani, _dto: Gordic.Pam.Interface.GKlasifikaceZamestnaniDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GObecne extends GContentBase {
        private dtoPpvObecne;
        private formObecne;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceObecneUlozit: string;
            akceObecneVycistit: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSablonyPpv extends GContentBase {
        private gridSablonyPpv;
        private viewSablonyPpv;
        private grid;
        private view;
        private sablonyPpv;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSablonyPpvPridat: string;
            akceSablonyPpvOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GDruhyVyneti} mainContent
        * @param {Gordic.Pam.Interface.GPpvDruhVynetiDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSablonyPpv, _dto: Gordic.Pam.Interface.GSablonaPpvDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GStupneRizeni extends GContentBase {
        private gridStupneRizeni;
        private viewStupneRizeni;
        private grid;
        private view;
        private stupneRizeni;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceStupneRizeniPridat: string;
            akceStupneRizeniOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GStupneRizeni} mainContent
        * @param {Gordic.Pam.Interface.GStupenRizeniDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GStupneRizeni, _dto: Gordic.Pam.Interface.GStupenRizeniDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSystMista extends GContentBase {
        private gridSystMista;
        private viewSystMista;
        private grid1;
        private grid2;
        private grid3;
        private view1;
        private view2;
        private view3;
        private systMista;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSystMistaPridat: string;
            akceSystMistaOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GContent} _mainContent
        * @param {Gordic.Pam.Interface.GSystMistoDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(_mainContent: GContent, _dto: Gordic.Pam.Interface.GSystMistoDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GNaplneniDat extends GContentBase {
        private rok;
        private mesic;
        private rokobdmzdy;
        private rokObdLeden;
        private mesice;
        private dtoNaplneniDat;
        private formNaplneniDat;
        private pocetRadku;
        private idFiltru;
        private mesicOd;
        private mesicDo;
        readonly asyncTaskClass = "Gordic.Pam.Server.GPpsNaplneniDatAsync";
        static NazvyAkci: {
            akceNaplneniDatAsynchronni: string;
            akceNaplneniDatUlozit: string;
            akceNaplneniDatVycistit: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zakazatAkce(): void;
        povolitAkce(): void;
        TaskStart(_guid: string): void;
        TaskDone(task: Gordic.Async.IGTask): void;
        TaskFail(task: Gordic.Async.IGTask): void;
        TaskAlways(task: Gordic.Async.IGTask): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GZpristupneniDat extends GContentBase {
        private rok;
        private mesic;
        private rokobdmzdy;
        private stavUza;
        private stavUzaTxt;
        private stavUzaStyl;
        private dtoZpristupneniDat;
        private formZpristupneniDat;
        static NazvyAkci: {
            akceZpristupneniDatPovolitJakoPristupna: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSlozkyTrvale extends GContentBase {
        private gridSlozkyTrvale;
        private viewSlozkyTrvale;
        private grid;
        private view;
        private slozkyTrvale;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSlozkyTrvalePridat: string;
            akceSlozkyTrvaleOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSlozkyTrvale} mainContent
        * @param {Gordic.Pam.Interface.GSlozkaMzdyDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSlozkyTrvale, _dto: Gordic.Pam.Interface.GSlozkaMzdyDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSlozkyVypoctene extends GContentBase {
        private gridSlozkyVypoctene;
        private viewSlozkyVypoctene;
        private grid;
        private view;
        private slozkyVypoctene;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSlozkyVypoctenePridat: string;
            akceSlozkyVypocteneOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSlozkyVypoctene} mainContent
        * @param {Gordic.Pam.Interface.GSlozkaMzdyDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSlozkyVypoctene, _dto: Gordic.Pam.Interface.GSlozkaMzdyDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GSrazky extends GContentBase {
        private gridSrazky;
        private viewSrazky;
        private grid;
        private view;
        private srazky;
        private formUkladaciDialog;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceSrazkyPridat: string;
            akceSrazkyOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GSrazky} mainContent
        * @param {Gordic.Pam.Interface.GSlozkaMzdyDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GSrazky, _dto: Gordic.Pam.Interface.GSlozkaMzdyDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GStromOce extends GContentBase {
        private ixsFun;
        private viewStromOce;
        private formStromOce;
        private grid;
        private dtoUlozeneUzly;
        private pocetRadku;
        private idFiltru;
        private treeProcessor;
        static NazvyAkci: {
            akceStromOceAktualizovat: string;
            akceStromOceUlozitVybraneUzly: string;
            akceStromOceVycistit: string;
            akceStromOceVybratVse: string;
            akceStromOceZrusitVyber: string;
            akceStromOceRozbalitVse: string;
            akceStromOceSbalitVse: string;
            akceStromOceOznacitUroven: string;
            akceStromOceOdznacitUroven: string;
            akceStromOceOznacitVsePod: string;
            akceStromOceOdznacitVsePod: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        /**
        * Kontextové menu řádku
        * @param cellContext
        */
        kontextoveMenu(cellContext: IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>): MenuParams[];
    }
}
declare namespace Gordic.Pps.WebApp {
    type modZatrzitek = "zaskrtnout" | "odskrtnout";
    export class GStromSnk extends GContentBase {
        private ixsFun;
        private viewStromSnk;
        private kategorieSeskupeniDtos;
        private formStromSnk;
        private grid;
        private prvniKategorieSeskupeni;
        private ulozenaKategorieSeskupeni;
        private zvolenaKategorieSeskupeni;
        private ixsKto;
        private typOseTxt;
        private treeProcessor;
        private dtoUlozeneUzly;
        private pocetRadku;
        private idFiltru;
        static NazvyAkci: {
            akceStromSnkAktualizovat: string;
            akceStromSnkUlozitVybraneUzly: string;
            akceStromSnkVycistit: string;
            akceStromSnkVybratVse: string;
            akceStromSnkZrusitVyber: string;
            akceStromSnkRozbalitVse: string;
            akceStromSnkSbalitVse: string;
            akceStromSnkOznacitUroven: string;
            akceStromSnkOdznacitUroven: string;
            akceStromSnkOznacitVsePod: string;
            akceStromSnkOdznacitVsePod: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** nastavení zatržítek a rozbalení uložených uzlů stromu na gridu
        * @param ixsKto pid kategorie seskupení
        * @param uzly uzly
        * @param rezim zaskrtnout|odskrtnout
        */
        nastaveniZatrzitekGridu(ixsKto: string, uzly: Pam.Interface.GStromUzelDto[], rezim?: modZatrzitek): void;
        vytvorBar(): void;
        /**
        * Kontextové menu řádku
        * @param {IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>} _cellContext
        * @returns {MenuParams[]}
        */
        kontextoveMenu(_cellContext: IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>): MenuParams[];
    }
    export {};
}
declare namespace Gordic.Pps.WebApp {
    class GStromUus extends GContentBase {
        private ixsFun;
        private viewStromUus;
        private formStromUus;
        private grid;
        private dtoUlozeneUzly;
        private pocetRadku;
        private idFiltru;
        private treeProcessor;
        static NazvyAkci: {
            akceStromUusAktualizovat: string;
            akceStromUusUlozitVybraneUzly: string;
            akceStromUusVycistit: string;
            akceStromUusVybratVse: string;
            akceStromUusZrusitVyber: string;
            akceStromUusRozbalitVse: string;
            akceStromUusSbalitVse: string;
            akceStromUusOznacitUroven: string;
            akceStromUusOdznacitUroven: string;
            akceStromUusOznacitVsePod: string;
            akceStromUusOdznacitVsePod: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        /**
        * Kontextové menu řádku
        * @param {IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>} cellContext
        * @returns {MenuParams[]}
        */
        kontextoveMenu(cellContext: IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>): MenuParams[];
    }
}
declare namespace Gordic.Pps.WebApp {
    class GTisky extends GContentBase {
        private rokobdmzdy;
        private rokmes;
        private fileInfoDto;
        static NazvyAkci: {
            akceTiskyTisk: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GUcetniProfily extends GContentBase {
        private gridUcetniProfily;
        private viewUcetniProfily;
        private formUkladaciDialog;
        private gridFormatDto;
        private pocetRadku;
        private idFiltru;
        private ixsFun;
        static NazvyAkci: {
            akceUcetniProfilyPridat: string;
            akceUcetniProfilyOdebrat: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        /** ukl�dac� dialog
        * @param {GUcetniProfily} mainContent
        * @param {Gordic.Pam.Interface.GUcetniVetaPAMDto} _dto Dto pro ukl�dan� data
        * @param {GAction} akce akce, kter� vyvolala dialog
        */
        UkladaciDialog(mainContent: GUcetniProfily, _dto: Gordic.Pam.Interface.GUcetniVetaPAMDto, akce: GAction): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pps.WebApp {
    class GDokumenty extends GContentBase {
        private gridDokumenty;
        private viewDokumenty;
        private ixsFun;
        private dokumentDto;
        static NazvyAkci: {
            akceDokumentyAktualizovat: string;
            akceDokumentyElObraz: string;
            akceDokumentyPrilohy: string;
            akceDokumentyDetailDokumentu: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
