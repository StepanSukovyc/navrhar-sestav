declare namespace Gordic.Adt.Dialogs {
    /**
    * Dialog detailu tabulky
    *
    * @author  Tomáš Hažmuka
    * @date    12.06.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSloupceDlg(parentContent: GContent, opt: {
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu tabulky
    *
    * @author  Tomáš Hažmuka
    * @date    12.06.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailTabulkyDlg(parentContent: GContent, opt: {
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu balíčku
    *
    * @author  Tomáš Hažmuka
    * @date    07.11.2018
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalickuDlg(parentContent: GContent, opt: {
        /** identifikátor balíčku */
        ixs_gdt: string;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** detail typu verze souboru */
        typeOfHistoryVersion?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu licence
    *
    * @author  Tomáš Hažmuka
    * @date    21.02.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicenceDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Skupiny databazi - z detailu GDZ baliku
    *
    * @author  Vojtěch Blabla
    * @date    14.01.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailGDZBalikSkupinyDBDlg(parentContent: GContent, opt: {
        ixs_gdt: any;
        dataRow: any;
        editMode: any;
        Autor: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize
    *
    * @author  Vojtěch Blabla
    * @date    05.03.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailRevizeDlg(parentContent: GContent, opt: {
        vybraneRevize: string[];
        verejnyDuvodZakazu: string[];
        interniDuvodZakazu: string[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize
    *
    * @author  Vojtěch Blabla
    * @date    05.03.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailStavReviziDlg(parentContent: GContent, opt: {
        vybraneRevize: string[];
        verejnyDuvodZakazu: string[];
        interniDuvodZakazu: string[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize modulu
    *
    * @author  Vojtěch Blabla
    * @date    16.12.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpenDetailRevizeDlg(parentContent: GContent, opt: {
        revize: string[];
        revize_info: any;
        revize_typ_t: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize modulu
    *
    * @author  Vojtěch Blabla
    * @date    16.12.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpenDetailRevDlg(parentContent: GContent, opt: {
        revize: string[];
        revize_typ_t: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize modulu
    *
    * @author  Vojtěch Blabla
    * @date    16.12.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpenDetailRevizeFazeDlg(parentContent: GContent, opt: {
        revize: string;
        revize_info: any;
        revize_typ_t: boolean;
        mod: number;
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu chyb z reinstalaci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailChybyReinstalaciDlg(parentContent: GContent, opt: {
        /** data */
        dataRow: any;
        vybraneRadky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadnou editaci produktu
    *
    * @author  Vojtěch Blabla
    * @date   14.03.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailEditProduktyDlg(parentContent: GContent, opt: {
        vybraneProdukty: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPrehledLicenciDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Skupiny databazi
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupinyDatabaziDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: string;
        typ_vdb: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie skupin DB
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistorieSkupinyDBDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Primarnich licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistoriePrimLicDBDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Licence databazi
    *
    * @author  Vojtěch Blabla
    * @date    24.11.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistorieLicDBDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Licenci rad PID
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistorieLicRadPIDBDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu novaskupina databazi
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovaSkupinaDatabaziDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho baliku licencii
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovyBalikLicenciDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho tagu programové fáze
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailTagFazeDlg(parentContent: GContent, opt: {
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * Dialog detailu pro hromadnou editaci revizí
     *
     * @param {GContent} parentContent
     * @param {{ vybraneRevize: any} opt
     * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<undefined>}
     */
    function DetailEditRevizeDlg(parentContent: GContent, opt: {
        vybraneRevize: any;
        userParam: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * Dialog detailu pro hromadnou editaci GDZ balíků
     *
     * @param {GContent} parentContent
     * @param {{ vybraneRevize: any} opt
     * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<undefined>}
     */
    function DetailBulkEditGDZDlg(parentContent: GContent, opt: {
        vybraneGDZ: any;
        userParam: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * Dialog detailu pro editaci popisů vývojových databází
     *
     * @param {GContent} parentContent
     * @param {{ vybraneRevize: any} opt
     * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<undefined>}
     */
    function DetailEditVyvojoveDatabazeDlg(parentContent: GContent, opt: {
        id_databaze: any;
        id_server: any;
        dataRow: any;
        userParam: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadnou editaci baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailEditBalikyLicenciDlg(parentContent: GContent, opt: {
        vybraneBaliky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadnou editaci Podpolozek
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailEditPodpolozkyDlg(parentContent: GContent, opt: {
        vybranePodpolozky: any;
        vybranePolozky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadnou editaci Produktu
    *
    * @author  Vojtěch Blabla
    * @date    21.06.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailEditProduktDlg(parentContent: GContent, opt: {
        vybraneProdukty: {};
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadne odeslani revizi do uloziste
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailMoveToStorageDlg(parentContent: GContent, opt: {
        vybraneRevize: any;
        vybraneRevizeRegistrRevizi: any;
        lic: string;
        format: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog pro náhled fronty automatického testování
    *
    * @author  Vojtěch Blabla
    * @date    07.10.2025
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailTestQueueDlg(parentContent: GContent, opt: {
        revize: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro pridani popisu zmen spolecne komponenty
    *
    * @author  Vojtěch Blabla
    * @date    12.09.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPopisKomponentDlg(parentContent: GContent, opt: {
        vybraneRevize: any;
        vybraneRevizeRegistrRevizi: any;
        lic: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro odeslani Souboru na uloziste
    *
    * @author  Vojtěch Blabla
    * @date    01.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailMoveFileToStorageDlg(parentContent: GContent, opt: {
        ixs_dif: string;
        nazev: string;
        velikost: number;
        typSouboru: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro hromadnou editaci baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistoryBalikyLicenciDlg(parentContent: GContent, opt: {
        vybraneBaliky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu nove licence rady PID
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovaLicRadPIDDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu nove Licence databaze
    *
    * @author  Vojtěch Blabla
    * @date    24.11.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovaLicDBDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu nove Primarni licence
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovaPrimLicDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho ICA pro administraci
    *
    * @author  Vojtěch Blabla
    * @date    11.01.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNoveIcoAdmDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho ICA pro fakturaci
    *
    * @author  Vojtěch Blabla
    * @date    11.01.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNoveIcoFaktDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho baliku Produktu
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovyBalikProduktuDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu nove Skupiny Produktu
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovaSkupinaProduktuDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Primarni licence databazi
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPrimarniLicenceDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Licence databaze
    *
    * @author  Vojtěch Blabla
    * @date    24.11.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicenceDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: string;
        grid: JQuery<HTMLElement>;
        ico_adm_pid_exist: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Licence rad PID
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicenceRadPIDDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        lic_fyz: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Baliky licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalikyLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: string;
        grid: JQuery<HTMLElement>;
        vybraneBaliky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ICA pro administraci
    *
    * @author  Vojtěch Blabla
    * @date    12.01.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailIcoAdmDlg(parentContent: GContent, opt: {
        /** ICO pro administraci */
        ico_adm: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ICA pro fakturaci
    *
    * @author  Vojtěch Blabla
    * @date    12.01.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailIcoFaktDlg(parentContent: GContent, opt: {
        /** ICO pro fakturaci */
        ico_fakt: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Typ implementace
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailTypImplementaceDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Ico pro administraci
    *
    * @author  Vojtěch Blabla
    * @date    05.03.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicRadPIDICOAdmDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        lic_fyz: string;
        ico_adm: string;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu seznamu licenci - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSeznamLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu období osvobození - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailObdobiBezLicPoplatkuDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
        newLic: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu obdobi osvobozeni (položky) - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPolBezLicPoplatkuDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
        newLic: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu obdobi osvobozeni (položky) - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicCertBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu fakturace - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFakturaceNaJineIcoDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
        newLic: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Marketingove licence - ze seznamu MArketingovych licenci v uloze Licencni poplatky
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailMarketingoveLicenceDlg(parentContent: GContent, opt: {
        /** licence */
        dataRow: any;
        editMode: any;
        technologicke: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog multieditačního detailu Marketingove/Technologické licence
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBulkEditPrehledLicenceDlg(parentContent: GContent, opt: {
        /** licence */
        dataRow: any;
        editMode: any;
        technologicke: any;
        vybraneRadky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Pristupova prava - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPristupovaPravaDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
        spravceSkupiny: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Pristupova prava - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistPristupovaPravaDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Primarni licence databazi - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPrimarniLicenceDatabaziDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
        prod_rada: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Historie - Primarni licence databazi - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistPrimarniLicenceDatabaziDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Fyzicke databaze - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFyzickeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie - Fyzicke databaze - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistFyzickeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Vyjmenovane revize- z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailVyjmenovaneRevizeDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Vyjmenovane produkcni faze - z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    11.03.2025
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailVyjmenovaneProdukcniFazeDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Vyjmenovane revize- z detailu skupiny DB
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistVyjmenovaneRevizeDlg(parentContent: GContent, opt: {
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Vyjmenovane GDZ baliky
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailVyjmenovaneGDZBalikyDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Vyjmenovane GDZ baliky
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistVyjmenovaneGDZBalikyDlg(parentContent: GContent, opt: {
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Povolene verze databaze- z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPovoleneVerzeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_sdb: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Povolene verze databaze- z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    17.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPrimLicPovoleneVerzeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Baliky licenci (Registr Licenci -> Primarni licence databazi -> Licence rad -> Seznam baliky licenci)
    *
    * @author  Vojtěch Blabla
    * @date    27.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamLicRadPIDBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        typ_vdb: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Komentare k licenci (Registr Licenci -> Baliky licenci -> Obsah baliku licenci -> Seznam Komentare k licenci)
    *
    * @author  Vojtěch Blabla
    * @date    11.08.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamKomentareKLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        radek_lip: any;
        typ_vdb: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Obdobi nehrazeni licencnich poplatku (Registr Licenci -> Baliky licenci -> Obsah baliku licenci-> Seznam Obdobi nehrazeni licencnich poplatku)
    *
    * @author  Vojtěch Blabla
    * @date    11.08.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamObdNehrLicPoplDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        typ_vdb: string;
        radek_lip: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Obdobi nehrazeni licencnich poplatku (Registr Licenci -> Baliky licenci -> Obsah baliku licenci-> Seznam Obdobi nehrazeni licencnich poplatku)
    *
    * @author  Vojtěch Blabla
    * @date    11.08.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistObsahBalLicDlg(parentContent: GContent, opt: {
        /** Balik licenci */
        ixs_lip: any;
        vybraneRadky: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Skupiny databazi (Registr Licenci -> Primarni licence databazi -> Fyzicke databaze -> Seznam skupiny databazi)
    *
    * @author  Vojtěch Blabla
    * @date    27.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamFyzDBSkupinyDBDlg(parentContent: GContent, opt: {
        /** licence */
        db_guid: any;
        typ_vdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Baliky licenci (Registr Licenci -> Primarni licence databazi -> Fyzicke databaze -> Seznam baliky licenci)
    *
    * @author  Vojtěch Blabla
    * @date    27.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamFyzDBBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        db_guid: any;
        typ_vdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Primarni licence databazi - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupinyDBDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Garanta DB - z detailu licence databaze
    *
    * @author  Vojtěch Blabla
    * @date    09.01.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailGarantDBDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Skupiny databazi - z detailu Souboru
    *
    * @author  Vojtěch Blabla
    * @date    01.07.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailDalsiSouborySkupinyDBDlg(parentContent: GContent, opt: {
        ixs_dif: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Skupiny databazi - z detailu Souboru
    *
    * @author  Vojtěch Blabla
    * @date    01.07.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupinyDBDalsiSouboryDlg(parentContent: GContent, opt: {
        ixs_sdb: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Licence rad
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPrimLicLicenceRadPIDDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Baliky licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicenceRadPIDBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Verze databaze
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailVerzeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Subverze databaze
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSubverzeDatabazeDlg(parentContent: GContent, opt: {
        /** licence */
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Produkty z detailu baliku produktu
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalProdProduktyDlg(parentContent: GContent, opt: {
        ixs_bpr: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Souvisejici polozky z detailu skupiny produktu
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupProdSouvPolDlg(parentContent: GContent, opt: {
        ixs_spr: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Souvisejici podpolozky z detailu skupiny produktu
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupProdSouvPodPolDlg(parentContent: GContent, opt: {
        ixs_spr: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Obsah baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailObsahBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
        rowCount: number;
        vybraneRadky: any;
        ultimate: boolean;
        firstRow: boolean;
        pol_jadro: string;
        ppol_jadro: string;
        prod_rada: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Obsah baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function MaxWindowObsahBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Zodpovednost za balik licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailZodpovednostZaBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog pro Import baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    29.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailImportBalLicDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog pro Import obshu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    29.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailImportObsahBalLicDlg(parentContent: GContent, opt: {
        ixs_lip: any;
        nazev: any;
        ppolJadro: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog pro Import pausalnich sluzeb
    *
    * @author  Vojtěch Blabla
    * @date    03.10.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailImportPausalniSluzbyDlg(parentContent: GContent, opt: {
        ixs_lip: any;
        nazev: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Historie Zodpovednosti za bal. lic.
    *
    * @author  Vojtěch Blabla
    * @date    02.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistZodpovednostZaBalLicDlg(parentContent: GContent, opt: {
        /** Balik licenci */
        ixs_lip: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Zodpovednost za balik licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalikyProduktuDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_bpr: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Detail skupiny produktu
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSkupinyProduktuDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_spr: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Licence rad - na detailu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalLicLicenceRadPIDDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
        prod_rada: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Licence rad - na detailu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalLicLicencniCertifikatDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Historie Lic. rad PID pro bal. lic.
    *
    * @author  Vojtěch Blabla
    * @date    02.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistBalLicLicRadPIDDlg(parentContent: GContent, opt: {
        /** Balik licenci */
        ixs_lip: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Fyzicke databaze - na detailu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalLicFyzickeDBDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Pausalni sluzby - na detailu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    04.02.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPausalniSluzbyDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Sluzby z licencni smlouvy - na detailu baliku licenci
    *
    * @author  Vojtěch Blabla
    * @date    04.02.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSluzbyLicencniSmlouvyDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * seznam Historie Fyzickych DB pro bal. lic.
    *
    * @author  Vojtěch Blabla
    * @date    02.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistFyzickeDBDlg(parentContent: GContent, opt: {
        /** Balik licenci */
        ixs_lip: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Export KOF - na detailu baliku licenci - zalozka maintenance Ultimate
    *
    * @author  Vojtěch Blabla
    * @date    31.08.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailExportKOFDlg(parentContent: GContent, opt: {
        /** data pro export */
        dataRows: any[];
        dataValues: any;
        distributor: any;
        obchodnik: any;
        var: any;
        zak: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Skupiny databazi
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFyzDBSkupinyDBDlg(parentContent: GContent, opt: {
        /** licence */
        db_guid: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog FyzDBBalLic
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFyzDBBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        db_guid: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu obdobi nehrazeni licencnich poplatku
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailObdNehrLicPoplDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        radek_lip: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Komentaru k bal. licenci
    *
    * @author  Vojtěch Blabla
    * @date    03.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistObdNeplLicPoplDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        radek_lip: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Historie Komentaru k bal. licenci
    *
    * @author  Vojtěch Blabla
    * @date    03.03.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistKomentareKLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        radek_lip: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Komentare k licenci
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailKomentareKLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        ixs_lip: any;
        radek_lip: any;
        dataRow: any;
        editMode: any;
        rowCount: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog Fyzicke DB
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFyzickeDBDlg(parentContent: GContent, opt: {
        /** licence */
        lic_fyz: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Baliky licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktyDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Baliky licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolozkyDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        grid: JQuery<HTMLElement>;
        vybranePpol: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Baliky licenci
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailCenikyDlg(parentContent: GContent, opt: {
        /** licence */
        gcenik: number;
        grid: JQuery<HTMLElement>;
        ixp_ccm: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Komentare k produktu
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktyKomentareDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        dataRow: any;
        editMode: boolean;
        rowCount: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Komentare k produktu
    *
    * @author  Vojtěch Blabla
    * @date    23.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktyProdListyDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu zalozeni nove podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    22.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktyPodpolDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dat_pol_od: any;
        dataRow: any;
        new: boolean;
        editMode: boolean;
        copyMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Historie polozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailHistoriePolDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        dataRow: any;
        dataHeaderForm: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Komentare podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolKomentareDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
        rowCount: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Produktove listy podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolProdListyDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Programove faze podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolProgFazeDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Souvisejici produkty podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolSouvisejiciDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Zavislost na jinych produktech  podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolZavislostDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
        zavislePpol: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Zamennost s jinymi produkty podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolZamennostDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Zaklad procentualni ceny podpolozky
    *
    * @author  Vojtěch Blabla
    * @date    25.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailPodpolZakladProcCenyDlg(parentContent: GContent, opt: {
        /** licence */
        pol: string;
        ppol: string;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho produktu
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovyProduktDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ulohy Produkty
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktuDlg(parentContent: GContent, opt: {
        faze: string;
        grid: JQuery<HTMLElement>;
        checkMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ulohy Produktove listy
    *
    * @author  Vojtěch Blabla
    * @date    21.07.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProduktoveListyDlg(parentContent: GContent, opt: {
        id_listu: number;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Souvisejici polozky produktoveho listu
    *
    * @author  Vojtěch Blabla
    * @date    23.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProdListySouvPolDlg(parentContent: GContent, opt: {
        /** licence */
        id_listu: number;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu Souvisejici podpolozky produktoveho listu
    *
    * @author  Vojtěch Blabla
    * @date    23.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailProdListySouvPodpolDlg(parentContent: GContent, opt: {
        /** licence */
        id_listu: number;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu noveho ceniku
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovyCenikDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu polozky ceniku
    *
    * @author  Vojtěch Blabla
    * @date    23.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailCenikyPolozkyDlg(parentContent: GContent, opt: {
        /** licence */
        ixp_ccm: any;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu polozky ceniku
    *
    * @author  Vojtěch Blabla
    * @date    21.02.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailCenikyObsahCenikuDlg(parentContent: GContent, opt: {
        /** licence */
        ixp_ccm: any;
        dataRow: any;
        editMode: boolean;
        obsahCenikuVyberRadku: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu podpolozky ceniku
    *
    * @author  Vojtěch Blabla
    * @date    23.09.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailCenikyPodpolozkyDlg(parentContent: GContent, opt: {
        /** licence */
        gcenik: number;
        dataRow: any;
        editMode: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ulohy Dalsi soubory
    *
    * @author  Vojtěch Blabla
    * @date    23.06.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailDalsiSouboryDlg(parentContent: GContent, opt: {
        ixs_dif: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro upload souboru v uloze Dalsi soubory
    *
    * @author  Vojtěch Blabla
    * @date    29.06.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailDalsiSouboryUploadDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro upload souboru a odeslani do Distribuce z Registru revizi
    *
    * @author  Vojtěch Blabla
    * @date    04.12.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailDistribuceUploadDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * export function DetailPrehledKomponentDlg
     *
     * @param {GContent} parentContent
     * @param {{ file_name: string, faze: string, grid: JQuery<HTMLElement>} opt
     * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<undefined>}
     */
    function DetailPrehledKomponentDlg(parentContent: GContent, opt: {
        file_name: string;
        faze: string;
        grid: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog noveho Popisu zmeny
    *
    * @author  Vojtěch Blabla
    * @date    01.09.2023
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNovyPopisZmenDlg(parentContent: GContent, opt: {
        popis_typ: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro editaci popisu změny
    *
    * @author  Vojtěch Blabla
    * @date    12.04.2024
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailEditPopisZmenDlg(parentContent: GContent, opt: {
        ixs_kmp: string;
        typ_zmeny: string;
        priz_verejny: number;
        popis: string | null | undefined;
        interni_popis: string | null | undefined;
        tagy: string[];
        fieldStaticTagy: string[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro editaci popisu změny
    *
    * @author  Vojtěch Blabla
    * @date    12.04.2024
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailNewPopisZmenDlg(parentContent: GContent, opt: {
        tagy: string[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu pro editaci popisu změny
    *
    * @author  Vojtěch Blabla
    * @date    12.04.2024
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailImportZmenDlg(parentContent: GContent, opt: {
        revize: string;
        revize_info: any;
        importNovyDetailRevize: boolean;
        poleIxsKmp: string[];
        revize_typ_t: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adt.Utils {
    /**
     * update Akce
     */
    function updateAction(Action: GAction | undefined, enabled: boolean): void;
    /**
     * konverze base64 to UTF-8
     * @param str string
     */
    function b64DecodeUnicode(str: string): string;
    /**
     * test, jestli je grid prázdný
     */
    function isGridEmpty(grid: any): boolean;
    /**
     * otevřít okno nápovědy v novém tabu
     */
    function openHelp(): void;
    /** enum pro políčko aktivita */
    enum AdtGincaktEnum {
        Aktivni = 100,
        Pripraven = 300,
        Neaktivni = 500,
        Navrh = 600,
        Zrusen = 900,
        Chyba = 666
    }
    function setDataAktivita(): IAdtAktivita[];
    interface IAdtAktivita {
        value: AdtGincaktEnum;
        caption: string;
    }
    function setCaptionAktivita(value: Utils.AdtGincaktEnum): IAdtAktivita;
    /** enum pro políčko aktivita */
    enum AdtGincaktVseEnum {
        Aktivni = 100,
        Pripraven = 300,
        Neaktivni = 500,
        Navrh = 600,
        Zrusen = 900,
        Vse = 666,
        Chyba = 777
    }
    function setDataAktivitaVse(): IAdtAktivitaVse[];
    interface IAdtAktivitaVse {
        value: AdtGincaktVseEnum;
        caption: string;
    }
    function setCaptionAktivitaVse(value: Utils.AdtGincaktVseEnum): IAdtAktivitaVse;
    /** enum pro políčko GINIS */
    enum AdtGINISEnum {
        Ano = 1,
        Ne = 0,
        Chyba = 777
    }
    function setDataGINIS(): IAdtGINIS[];
    interface IAdtGINIS {
        value: AdtGINISEnum;
        caption: string;
    }
    function setCaptionGINIS(value: Utils.AdtGINISEnum): IAdtGINIS;
    /** enum pro políčko aktivita */
    enum AdtGincfatEnum {
        Moduly = 0,
        Aplikace = 10,
        Sestavy = 20,
        Dokumentace = 30,
        Helpy = 40,
        Chyba = 666
    }
    function setDataTypFaze(): IAdtTypFaze[];
    interface IAdtTypFaze {
        value: AdtGincfatEnum;
        caption: string;
    }
    function setCaptionTypFaze(value: Utils.AdtGincfatEnum): IAdtTypFaze;
    /** enum pro políčko aktivita */
    enum AdtGdecaktEnum {
        Neaktualizovat = 0,
        Aktualizovat = 1,
        Chyba = 666
    }
    function setDataAktivitaGdecakt(): IAdtAktivitaGdecakt[];
    interface IAdtAktivitaGdecakt {
        value: AdtGdecaktEnum;
        caption: string;
    }
    function setCaptionAktivitaGdecakt(value: Utils.AdtGdecaktEnum): IAdtAktivitaGdecakt;
    /** enum pro políčko Priznak DEMO DB */
    enum AdtPrizDEnum {
        Ostra = 0,
        Demo = 1,
        Zamek = 2
    }
    function setDataPrizD(): IAdtPrizD[];
    interface IAdtPrizD {
        value: AdtPrizDEnum;
        caption: string;
    }
    function setCaptionPrizD(value: Utils.AdtPrizDEnum): IAdtPrizD;
    /** enum pro políčko Priznak DEMO DB */
    enum AdtPrizVerejnyEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPrizVerejny(): IAdtPrizVerejny[];
    interface IAdtPrizVerejny {
        value: AdtPrizVerejnyEnum;
        caption: string;
    }
    function setCaptionPrizVerejny(value: Utils.AdtPrizVerejnyEnum): IAdtPrizVerejny;
    /** enum pro políčko Stav kontroly ADL */
    enum AdtGdecskaEnum {
        Neurceno = 0,
        BezChyb = 10,
        Opraveno = 20,
        CekaNaPodrobnejsiAnalyzu = 30,
        ProbihaReseniChyb = 40,
        Chyba = 666
    }
    function setDataStavKontrolyADL(): IAdtStavKontrolyADL[];
    interface IAdtStavKontrolyADL {
        value: AdtGdecskaEnum;
        caption: string;
    }
    function setCaptionStavKontrolyADL(value: Utils.AdtGdecskaEnum): IAdtStavKontrolyADL;
    /** enum pro políčko kultura */
    enum AdtGinckulEnum {
        Cestina = 0,
        Slovencina = 10,
        English = 20,
        Rustina = 30,
        Srbsko = 40,
        Ukraine = 50,
        CestinaTestLokace = 999,
        International = 1000,
        Chyba = 666
    }
    function setDataKultura(): IAdtKultura[];
    interface IAdtKultura {
        value: AdtGinckulEnum;
        caption: string;
    }
    function setCaptionKultura(value: Utils.AdtGinckulEnum): IAdtKultura;
    /** enum pro políčko kultura */
    enum AdtGincrelReduceEnum {
        Radna = 0,
        Technologicka = 10,
        Marketingova = 20,
        Chyba = 666
    }
    function setDataRezimLicence(): IAdtRezimLicence[];
    interface IAdtRezimLicence {
        value: AdtGincrelReduceEnum;
        caption: string;
    }
    function setCaptionRezimLicence(value: Utils.AdtGincrelReduceEnum): IAdtRezimLicence;
    /** enum pro políčko Typ implementace (tyi_number) */
    enum AdtGinctiyEnum {
        MO = 1,//"A",
        ISTA = 2,// "B",
        USC = 3,//"C",
        POUSC = 4,//"D",
        AnglickaMutace = 5,//"G",
        USCSPPOL = 6,//"M",
        OSS = 7,//"O",
        UP = 8,//"P",
        POOSS = 9,//"Q",
        Univerzalni = 10,//"X",
        SlovenskaMutace = 11
    }
    function setDataTypImplementace(): IAdtTypImplementace[];
    interface IAdtTypImplementace {
        value: AdtGinctiyEnum;
        caption: string;
    }
    function setCaptionTypImplementace(value: Utils.AdtGinctiyEnum): IAdtTypImplementace;
    /** enum pro políčko Typ ceny (tyi_number) */
    enum AdtGincticEnum {
        PROC = 1,//"A",
        IND = 2,// "B",
        KC = 3
    }
    function setDataTypCeny(): IAdtTypCeny[];
    interface IAdtTypCeny {
        value: AdtGincticEnum;
        caption: string;
    }
    function setCaptionTypCeny(value: Utils.AdtGincticEnum): IAdtTypCeny;
    /** enum pro políčko Typ ceniku (gcenik) */
    enum AdtGdesgceEnum {
        ExpressG0 = 0,
        Standard = 1000,
        Ultimate = 1010,
        UltimateSSL = 1012,
        UltimateSSD = 1014,
        Defence = 1020,
        Enterprise = 1030,
        EnterprisePlus = 1031,
        RadyG2G4 = 2000,
        ExpressG3 = 3500,
        CenovyMenual = 9999
    }
    function setDataTypCeniku(): IAdtTypCeniku[];
    interface IAdtTypCeniku {
        value: AdtGdesgceEnum;
        caption: string;
    }
    function setCaptionTypCeniku(value: Utils.AdtGdesgceEnum): IAdtTypCeniku;
    /** enum pro políčko typu gdt */
    enum AdtGinctygEnum {
        /**
         * Neveřejný / jednorázový (dříve Neurčeno)
         */
        NeverejnyJednorazovy = 0,
        ReinstalaceAktualizace = 10,
        OpravaDat = 20,
        OpravaAplikacniLogiky = 30,
        AktivaceDeaktivace = 40,
        DiagnostikaDat = 50,
        ServisniScriptPodleZadaniZakaznika = 60,
        MakraProZUD = 70,
        AktualizaceCiselniku = 80,
        Chyba = 666
    }
    function setDataTypGdt(): IAdtGinctyg[];
    /**
     * inteface pro políčko typu gdt
     */
    interface IAdtGinctyg {
        caption: string;
        value: AdtGinctygEnum;
    }
    function setCaptionTypGdt(value: Utils.AdtGinctygEnum): IAdtGinctyg;
    /** enum pro políčko typu GDZ baliku */
    enum AdtTypGDZEnum {
        Doporucene = 90,
        Diagnosticke = 50,
        Servisni = 60,
        Reinstalacni = 10,
        Chyba = 666
    }
    function setDataTypGDZ(): IAdtTypGDZ[];
    /**
     * inteface pro políčko typu gdt
     */
    interface IAdtTypGDZ {
        caption: string;
        value: AdtTypGDZEnum;
    }
    function setCaptionTypGDZ(value: Utils.AdtTypGDZEnum): IAdtTypGDZ;
    /** enum pro políčko typu Stav revize */
    enum AdtStavRevizeEnum {
        Doporucena = 0,
        Betatest = 10,
        Alfatest = 20,
        Nedoporucena = 50,
        Zakazana = 90,
        Chyba = 666
    }
    function setDataStavRevize(): IAdtStavRevize[];
    /**
     * inteface pro políčko stav revize
     */
    interface IAdtStavRevize {
        caption: string;
        value: AdtStavRevizeEnum;
    }
    function setCaptionStavRevize(value: Utils.AdtStavRevizeEnum): IAdtStavRevize;
    enum AdtSeznamAutomatuEnum {
        hodina = 0,
        den = 10,
        tyden = 20,
        mesic = 30,
        rok = 40,
        Chyba = 666
    }
    function setDataSeznamAutomatu(): IAdtSeznamAutomatu[];
    interface IAdtSeznamAutomatu {
        value: AdtSeznamAutomatuEnum;
        caption: string;
    }
    function setCaptionSeznamAutomatu(value: Utils.AdtSeznamAutomatuEnum): IAdtSeznamAutomatu;
    /** enum pro políčko priorita gdt */
    enum AdtGincprgEnum {
        Neurceno = 0,
        Doporuceno = 10,
        Dulezita = 20,
        Kriticka = 30,
        Chyba = 666
    }
    function setDataPrioritaGdt(): IAdtPrioritaGdt[];
    interface IAdtPrioritaGdt {
        value: AdtGincprgEnum;
        caption: string;
    }
    function setCaptionPrioritaGdt(value: Utils.AdtGincprgEnum): IAdtPrioritaGdt;
    /** enum pro políčko typ_vdb */
    enum AdtgdecsdfEnum {
        SpravceSkupiny = 0,
        AktivniPristup = 10,
        PouzeProhlizeni = 20,
        Chyba = 666
    }
    function setDataTypVdb(): IAdtTypVdb[];
    interface IAdtTypVdb {
        value: AdtgdecsdfEnum;
        caption: string;
    }
    function setCaptionTypVdb(value: Utils.AdtgdecsdfEnum): IAdtTypVdb;
    /** enum pro políčko Typ skupiny databazi*/
    enum AdtgdecsdbEnum {
        ZakladniRozdeleniPodleGrantu = 0,
        OperativniSkupinaDatabazi = 10,
        Chyba = 666
    }
    function setDataTypSkupinyDatabazi(): IAdtTypSkupinyDatabazi[];
    interface IAdtTypSkupinyDatabazi {
        value: AdtgdecsdbEnum;
        caption: string;
    }
    function setCaptionTypSkupinyDatabazi(value: Utils.AdtgdecsdbEnum): IAdtTypSkupinyDatabazi;
    /** enum pro políčko Rezim aktualizace */
    enum AdtgdectakEnum {
        Vyvojove = 0,
        Produkcni = 5,
        Stabilni = 10,
        Vyjmenovane = 20,
        Chyba = 666
    }
    function setDataRezimAktualizace(): IAdtRezimAktualizace[];
    interface IAdtRezimAktualizace {
        value: AdtgdectakEnum;
        caption: string;
    }
    function setCaptionRezimAktualizace(value: Utils.AdtgdectakEnum): IAdtRezimAktualizace;
    /** enum pro políčko Rada produktu */
    enum AdtgincprrEnum {
        G0 = 0,
        G1 = 1000,
        G3 = 3000,
        Chyba = 666
    }
    function setDataRadaProduktu(): IAdtRadaProduktu[];
    interface IAdtRadaProduktu {
        value: AdtgincprrEnum;
        caption: string;
    }
    function setCaptionRadaProduktu(value: Utils.AdtgincprrEnum): IAdtRadaProduktu;
    /** enum pro políčko Povoleni akutnich gdz */
    enum AdtgincpanEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPovoleniAkutnichGdz(): IAdtPovoleniAkutnichGdz[];
    interface IAdtPovoleniAkutnichGdz {
        value: AdtgincpanEnum;
        caption: string;
    }
    function setCaptionPovoleniAkutnichGdz(value: Utils.AdtgincpanEnum): IAdtPovoleniAkutnichGdz;
    /** enum pro políčko Příznak multilicence */
    enum AdtMultilicenceEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPriznakMultilicence(): IAdtPriznakMultilicence[];
    interface IAdtPriznakMultilicence {
        value: AdtMultilicenceEnum;
        caption: string;
    }
    function setCaptionPriznakMultilicence(value: Utils.AdtMultilicenceEnum): IAdtPriznakMultilicence;
    /** enum pro políčko Příznak specialni ceny */
    enum AdtSpecCenaEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPriznakSpecCeny(): IAdtPriznakSpecCeny[];
    interface IAdtPriznakSpecCeny {
        value: AdtSpecCenaEnum;
        caption: string;
    }
    function setCaptionPriznakSpecCeny(value: Utils.AdtSpecCenaEnum): IAdtPriznakSpecCeny;
    /** enum pro políčko Příznak specialni vyse maintenance */
    enum AdtSpecVyseMaintenanceEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPriznakSpecVyseMaintenance(): IAdtPriznakSpecVyseMaintenance[];
    interface IAdtPriznakSpecVyseMaintenance {
        value: AdtSpecVyseMaintenanceEnum;
        caption: string;
    }
    function setCaptionPriznakSpecVyseMaintenance(value: Utils.AdtSpecVyseMaintenanceEnum): IAdtPriznakSpecVyseMaintenance;
    /** enum pro políčko (Režim licencování) */
    enum AdtgincrelEnum {
        Radna = 0,
        Technologicka = 10,
        Marketingova = 20,
        SaaS = 30,
        Gordic = 40,
        Ultimate = 50,
        Navrh = 90,
        Chyba = 666
    }
    function setDataRezimLicencovani(): IAdtRezimLicencovani[];
    interface IAdtRezimLicencovani {
        value: AdtgincrelEnum;
        caption: string;
    }
    function setCaptionRezimLicencovani(value: Utils.AdtgincrelEnum): IAdtRezimLicencovani;
    /** enum pro políčko (Režim licencování edit) */
    enum AdtgincrelEnumEdit {
        Technologicka = 10,
        Marketingova = 20,
        Gordic = 40,
        Ultimate = 50,
        Chyba = 666
    }
    function setDataRezimLicencovaniEdit(): IAdtRezimLicencovaniEdit[];
    interface IAdtRezimLicencovaniEdit {
        value: AdtgincrelEnumEdit;
        caption: string;
    }
    function setCaptionRezimLicencovaniEdit(value: Utils.AdtgincrelEnumEdit): IAdtRezimLicencovaniEdit;
    /** enum pro políčko (Režim licencování Ne-ultimate) */
    enum AdtgincrelLicEnum {
        Radna = 0,
        Technologicka = 10,
        Marketingova = 20,
        SaaS = 30,
        Gordic = 40,
        Navrh = 90,
        Chyba = 666
    }
    function setDataRezimLicencovaniLic(): IAdtRezimLicencovaniLic[];
    interface IAdtRezimLicencovaniLic {
        value: AdtgincrelLicEnum;
        caption: string;
    }
    function setCaptionRezimLicencovaniLic(value: Utils.AdtgincrelLicEnum): IAdtRezimLicencovaniLic;
    /** enum pro políčko (Obchodní model) */
    enum AdtgdecobmEnum {
        TrvalaLicence = 0,
        SaaS = 10,
        Chyba = 666
    }
    function setDataObchodniModel(): IAdtObchodniModel[];
    interface IAdtObchodniModel {
        value: AdtgdecobmEnum;
        caption: string;
    }
    function setCaptionObchodniModel(value: Utils.AdtgdecobmEnum): IAdtObchodniModel;
    /** enum pro políčko (Speciální výše maintenance) */
    enum AdtPrizSpecCenaEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPrizSpecCena(): IAdtPrizSpecCena[];
    interface IAdtPrizSpecCena {
        value: AdtPrizSpecCenaEnum;
        caption: string;
    }
    function setCaptionPrizSpecCena(value: Utils.AdtPrizSpecCenaEnum): IAdtPrizSpecCena;
    /** enum pro políčko (Speciální výše maintenance) */
    enum AdtPrizSpecMaintEnum {
        Ne = 0,
        Ano = 1,
        VynasobitKoeficientem = 2,
        Chyba = 666
    }
    function setDataPrizSpecMaint(): IAdtPrizSpecMaint[];
    interface IAdtPrizSpecMaint {
        value: AdtPrizSpecMaintEnum;
        caption: string;
    }
    function setCaptionPrizSpecMaint(value: Utils.AdtPrizSpecMaintEnum): IAdtPrizSpecMaint;
    /** enum pro políčko (Perioda plateb) */
    enum AdtgdecpssEnum {
        Mesic = 1,
        Ctvrtleti = 3,
        Pololeti = 6,
        Rok = 12,
        Chyba = 666
    }
    function setDataPeriodaPlateb(): IAdtPeriodaPlateb[];
    interface IAdtPeriodaPlateb {
        value: AdtgdecpssEnum;
        caption: string;
    }
    function setCaptionPeriodaPlateb(value: Utils.AdtgdecpssEnum): IAdtPeriodaPlateb;
    /** enum pro políčko (Distributor) */
    enum AdtgdesdisEnum {
        Centrala = 0,
        PobockaPraha = 1,
        PobockaBrno = 2,
        PobockaOstrava = 3,
        KMS = 4,
        BNSOFT = 5,
        Haida = 6,
        Datab = 7,
        Chyba = 666
    }
    function setDataDistributor(): IAdtDistributor[];
    interface IAdtDistributor {
        value: AdtgdesdisEnum;
        caption: string;
    }
    function setCaptionDistributor(value: Utils.AdtgdesdisEnum): IAdtDistributor;
    /** enum pro políčko Typ komentáře */
    enum AdtgdectykEnum {
        Verejny = 0,
        Interni = 10,
        Navrh = 20,
        Chyba = 666
    }
    function setDataTypKomentare(): IAdtTypKomentare[];
    interface IAdtTypKomentare {
        value: AdtgdectykEnum;
        caption: string;
    }
    function setCaptionTypKomentare(value: Utils.AdtgdectykEnum): IAdtTypKomentare;
    /** enum pro políčko Kategorie */
    enum AdtgdeckpoEnum {
        Fakturacni = 0,
        Nadpisova = 10,
        Vzorova = 20,
        Chyba = 666
    }
    function setDataKategoriePolozky(): IAdtKategoriePolozky[];
    interface IAdtKategoriePolozky {
        value: AdtgdeckpoEnum;
        caption: string;
    }
    function setCaptionKategoriePolozky(value: Utils.AdtgdeckpoEnum): IAdtKategoriePolozky;
    /** enum pro políčko (Kategorie podpolozky) */
    enum AdtgdeckppEnum {
        Neurceno = 0,
        Server = 1,
        Klient = 101,
        Rozsireni = 300,
        Ultimate = 352,
        DoplatekSleva = 400,
        SaaS = 430,
        Maintenance = 480,
        Programovani = 500,
        Metodika = 520,
        Dokumentace = 530,
        Skolení = 600,
        Konzultace = 680,
        Sluzby = 700,
        Asistence = 740,
        Analyza = 760,
        Hotline = 780,
        Ostatni = 790,
        Chyba = 666
    }
    function setDataKategoriePodpolozky(): IAdtKategoriePodpolozky[];
    interface IAdtKategoriePodpolozky {
        value: AdtgdeckppEnum;
        caption: string;
    }
    function setCaptionKategoriePodpolozky(value: Utils.AdtgdeckppEnum): IAdtKategoriePodpolozky;
    /** enum pro políčko Kategorie */
    enum AdtgdecverEnum {
        Development = 0,
        Production = 5,
        Stable = 10,
        Archiv = 20,
        Chyba = 666
    }
    function setDataStavVerze(): IAdtStavVerze[];
    interface IAdtStavVerze {
        value: AdtgdecverEnum;
        caption: string;
    }
    function setCaptionStavVerze(value: Utils.AdtgdecverEnum): IAdtStavVerze;
    /** enum pro políčko Kategorie */
    enum AdtgdecverDBEnum {
        Vyvoj = 0,
        Distribuce = 10,
        Uzavreno = 20,
        Chyba = 666
    }
    function setDataStavVerzeDB(): IAdtStavVerzeDB[];
    interface IAdtStavVerzeDB {
        value: AdtgdecverDBEnum;
        caption: string;
    }
    function setCaptionStavVerzeDB(value: Utils.AdtgdecverDBEnum): IAdtStavVerzeDB;
    /** enum pro políčko Provozní databáze */
    enum AdtgdelfazEnum {
        Ano = 0,
        Ne = 1,
        Chyba = 666
    }
    function setDataProvozniDatabaze(): IAdtProvozniDatabaze[];
    interface IAdtProvozniDatabaze {
        value: AdtgdelfazEnum;
        caption: string;
    }
    function setCaptionProvozniDatabaze(value: Utils.AdtgdelfazEnum): IAdtProvozniDatabaze;
    /** enum pro políčko Poslední údaj */
    enum AdtgdelfazPosledniUdajEnum {
        Ano = 1,
        Ne = 0,
        Chyba = 666
    }
    function setDataPosledniUdaj(): IAdtPosledniUdaj[];
    interface IAdtPosledniUdaj {
        value: AdtgdelfazPosledniUdajEnum;
        caption: string;
    }
    function setCaptionPosledniUdaj(value: Utils.AdtgdelfazPosledniUdajEnum): IAdtPosledniUdaj;
    /** enum pro políčko Typ souboru */
    enum AdtGdecdifEnum {
        Ostatni = 0,
        InstalacniDVD = 10,
        GINISExpress = 20,
        ProduktyTretichStran = 30,
        Chyba = 666
    }
    function setDataTypSouboru(): IAdtTypSouboru[];
    interface IAdtTypSouboru {
        value: AdtGdecdifEnum;
        caption: string;
    }
    function setCaptionTypSouboru(value: Utils.AdtGdecdifEnum): IAdtTypSouboru;
    /** enum pro políčko Stav externí komponenty */
    enum AdtGdecsekEnum {
        Neznamy = 0,
        Ok = 10,
        Warning = 20,
        Obsolete = 30,
        Disable = 90,
        Chyba = 666
    }
    function setDataStavExterniKomponenty(): IAdtStavExterniKomponenty[];
    interface IAdtStavExterniKomponenty {
        value: AdtGdecsekEnum;
        caption: string;
    }
    function setCaptionStavExterniKomponenty(value: Utils.AdtGdecsekEnum): IAdtStavExterniKomponenty;
    /** enum pro políčko Distribuce externí komponenty */
    enum AdtGdecdekEnum {
        Nesirime = 0,
        Sirime = 1,
        Chyba = 666
    }
    function setDataDistribuceExterniKomponenty(): IAdtDistribuceExterniKomponenty[];
    interface IAdtDistribuceExterniKomponenty {
        value: AdtGdecdekEnum;
        caption: string;
    }
    function setCaptionDistribuceExterniKomponenty(value: Utils.AdtGdecdekEnum): IAdtDistribuceExterniKomponenty;
    /** enum pro políčko kumulovat (Pausalni sluzby) */
    enum AdtGincpanEnum {
        Nekumulovat = 0,
        Kumulovat = 1,
        Chyba = 666
    }
    function setDataKumulovat(): IAdtKumulace[];
    interface IAdtKumulace {
        value: AdtGincpanEnum;
        caption: string;
    }
    function setCaptionKumulace(value: Utils.AdtGincpanEnum): IAdtKumulace;
    /** enum pro políčko kumulovat (Pausalni sluzby) */
    enum AdtGdecorjEnum {
        Neurceno = 0,
        Osoba = 10,
        Organizace = 20,
        Chyba = 666
    }
    function setDataKategorieORJ(): IAdtKategorieORJ[];
    interface IAdtKategorieORJ {
        value: AdtGdecorjEnum;
        caption: string;
    }
    function setCaptionKategorieORJ(value: Utils.AdtGdecorjEnum): IAdtKategorieORJ;
    /** enum pro políčko Typ komponenty (Popisy změn) */
    enum AdtGdeckmpEnum {
        Faze = 0,
        Komponenta = 20,
        Sestava = 30,
        Databaze = 50,
        Chyba = 666
    }
    function setDataTypKomponenty(): IAdtTypKomponenty[];
    interface IAdtTypKomponenty {
        value: AdtGdeckmpEnum;
        caption: string;
    }
    function setCaptionTypKomponenty(value: Utils.AdtGdeckmpEnum): IAdtTypKomponenty;
    /** enum pro políčko Stav programové fáze (T39716) */
    enum AdtGincfasEnum {
        Neurceno = 0,
        Ukoncena = 10,
        Neperspektivni = 20,
        Docasna = 30,
        Vyvoj = 40,
        Ktestovani = 50,
        Nova = 60,
        Perspektivni = 90,
        Chyba = 666
    }
    function setDataStavFaze(): IAdtStavFaze[];
    interface IAdtStavFaze {
        value: AdtGincfasEnum;
        caption: string;
    }
    function setCaptionStavFaze(value: Utils.AdtGincfasEnum): IAdtStavFaze;
    /**
     * aktivovat balík/ky
     */
    function aktivovat(ixs_gdt: string | string[]): any;
    /**
     * deaktivovat balík/ky
     */
    function deaktivovat(ixs_gdt: string | string[]): any;
    /**
     * zrušit balík/ky
     */
    function zrusit(ixs_gdt: string | string[]): any;
    /**
     * akceptovat code review za balík/ky
     */
    function akceptCodeReview(ixs_gdt: string | string[]): any;
    /**
     * provede záznam do žurnálu o code review za balík/ky
     */
    function logCodeReview(ixs_gdt: string | string[]): any;
    /**
   * na akci změní property visibled - zobrazí nebo zneviditelní - pridano vblabla
   * @param Action
   * @param visible
   */
    function setActionVisible(Action: GAction | undefined, visible: boolean | null | undefined): void;
    /**
    * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
    *
    * @param {JQuery<HTMLElement>} form předaný element formuláře
    * @returns {JQueryPromise<boolean>} výsledek stavu
    */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Dalsi soubory
     */
    class GAutenticator extends GContentBase {
        /**
         * Timeinterval
         * @type {number}
         */
        private Timeinterval;
        /**
        * element subtasku pro oddělení průvodce pro generování přístupového kódu od Historie záznamů
        */
        private subtaskAutenticator;
        /**
        * element wizzardu
        */
        private wizzardAutenticator;
        /**
         *  DB parametr adt_user_licenc
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         * Lic - Licence databáze
         * @type {string}
         */
        private Lic;
        /**
         * Faze - Programová fáze
         * @type {string}
         */
        private Faze;
        /**
         * level_exp  - Uroven přístupu
         * @type {number}
         */
        private level_exp;
        /**
         * fazeUloha - Identifikátor úlohy programové fáze
         * @type {any}
         */
        private fazeUloha;
        /**
         * lic - Identifikátor licence databáze
         * @type {string}
         */
        private lic;
        /**
         * Ověřovací kód
         * @type {string}
         */
        private code;
        private countDownNumber;
        /**
         * formát sloupců gridu pro Historii
         */
        private gridFormatHistorie;
        /**
         * element seznamu pro Historii
         */
        private gridHistorie;
        /**
         * isl view gridu pro Historii
         */
        private viewHistorie;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        private createMenuBar;
        private setMenuButtons;
        private createMenuButtons;
        private checkExpertModeButton;
        /**
        * otevřít dialog kontroly expertního režimu
        */
        private openCheckExpertMode;
        /**
         * Průvodce generováním autentizačního kódu
         */
        private createWizzard;
        /**
         * createFormZadani - Vytvoreni formulare k zadani vstupnich parametru autentikatoru
         *
         * @returns {Gordic.Forms.Form}
         */
        private createFormZadani;
        /**
         * createFormCode - Vytvoreni formulare k zobrazeníověřovacího kódu
         *
         * @returns {Gordic.Forms.Form}
         */
        private createFormCode;
        /**
         * generujKod - Generování ověřovacího kodu
         *
         * @param {string} lic
         * @param {string} faze
         */
        private generujKod;
        private countDownTimer;
        /**
         * vytvořit seznam s Historií záznamů
         */
        private createGridHistorie;
        /**
         * vytvořit formát sloupců seznamu Historie Autenticatoru
         */
        private createGridFormatHistorie;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1/G3) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * SeznamHistorieDatabaziDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamBase {
        /** element gridu */
        grid: JQuery<HTMLElement>;
        /** sloupce seznamu */
        gridSearchColumns: string[];
        /** formát sloupců gridu */
        gridFormat: Gordic.Data.GridFormat;
        /** element sidebaru */
        sidebar: JQuery<HTMLElement>;
        /** panel id (string) */
        panelId: string;
        /** element panelu v sidebaru */
        panelElement: JQuery<HTMLElement>;
        /** data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1] */
        row: any;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** formulář pro přidávání políček filtru */
        filterForm: Gordic.Forms.Form;
        /**
         * SeznamHistorieDatabaziDesignerInit
         *
         * @param {GContentType<SeznamBase>} that
         */
        static SeznamBaseInit(that: GContentType<SeznamBase>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd...
         SPECIFIC
         */
        static createGridFormatBase(that: GContentType<SeznamBase>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilterBase(that: GContentType<SeznamBase>, a_form: Forms.Form): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterFormBase(that: GContentType<SeznamBase>): Forms.Form;
    }
}
declare namespace Gordic.Adt.WebControls {
    class GAdtDashboard extends GContentBase {
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        /** načíst informace o modulu */
        private loadModuleInfo;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Chyby reinstalaci */
    class DetailChybyReinstalaci extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         * data z gridu Chyby z reinstalaci
         */
        private dataRow;
        /**
         * priznak k editaci vice radku
         */
        private multiEdit;
        private vybraneRadky;
        private formChybyReinstalaciUserSettings;
        /**
        * element gtabu s obecnymi udaji o radcich
        */
        private gtabObecneUdaje;
        /**
         * element formulare s obecnymi udaji
         */
        private formObecneUdaje;
        /**
        * element gtabu s vyberem radku
        */
        private gtab;
        /**
         * element gridu s Vyberem radku chyb z reinstalaci
         */
        private grid;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private allRowsInfo;
        private vyberJednotlivychRadku;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyvvořit menu buttons pro multi edit rezim
         */
        private createMultiEditMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar pro multi edit rezim
         */
        private createMultiEditMenuBar;
        /**
         * vytvořit commandbar pro multi edit rezim
         */
        private createMultiEditCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvoři gtab pro grid s vyberem radku chyb
         */
        private createGTabRadkyChyb;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu licence */
    class DetailLicence extends GContentBase {
        /** licence */
        private lic;
        /*** element panelu v sidebaru */
        private panelElement;
        private panelId;
        /** elmenet sidebaru */
        private sidebar;
        /** data detailu */
        private data;
        /** příznak přímého přístupu na detail */
        private detailCommand;
        /**
         *  Identifikator ixs_fun
         */
        private ixsFun;
        /**
         * isl view gridu
         */
        private view;
        /** element seznam v gtabu */
        private grid_historie_spusteni;
        /** pole sloupců v gtabu*/
        private columns_historie_spusteni;
        /** formát gridu v gtabu */
        private gridFormatHistorieSpusteni;
        /**data řádku historie spuštění */
        private row_historie_spusteni;
        private refreshDetail;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** vytvořit statusbar */
        private createStatusBar;
        /** Načtení dat ze serveru na následné nastavení na detail okně */
        private setData;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář a načtení dat ze serveru */
        private createForm;
        /** vytvořit menubar */
        private createMenuBar;
        /**
         * nastavit stavy (enable) v menu
         * @param {Utils.AdtGincaktEnum} activity úroveň aktivity
         */
        private setStateOfEnableOnMenuBarActions;
        /**
         * aktivovat balík
         */
        private activatePackage;
        /** vytvořit commandbar */
        private createCommandBar;
        /** odstranit všechny vlastní třídy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** změna hodnoty statusbaru */
        private changeStatusBar;
        /** vytvořit panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvořit sidebar */
        private createSidebar;
        /** občerstvení panelu v sidebaru */
        private refreshPanel;
        private setPreviewEmpty;
        /** vytvořit gtaby pro seznamy */
        private createGTab;
        private createGridBalicekHistorieSpusteniGTab;
        private createGridFormatBalicekHistorieSpusteniGTab;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu zákazu revizí */
    class DetailRevizi extends GContentBase {
        private vybraneRevize;
        private verejnyDuvodZakazu;
        private interniDuvodZakazu;
        private interniPopisRevize;
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** vytvořit commandbar */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu sloupce */
    class DetailSloupce extends GContentBase {
        /** onContentReady */
        onContentReady(): void;
        private init;
        /** vytvořit formulář */
        private createForm;
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu tabulky */
    class DetailTabulky extends GContentBase {
        /** onContentReady */
        onContentReady(): void;
        private init;
        private elementSeznamSloupcu;
        private createMenuTabDetailSloupce;
        /**
         * vytvořit gtaby pro seznamy
         */
        private createGTab;
        /** vytvořit formulář */
        private createForm;
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Produkty */
    class DetailBalProdProdukty extends GContentBase {
        /**
         * Identifikator baliku produktu
         */
        private ixs_bpr;
        /**
         * data z gridu Produkty
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeBalikyProduktu = Gordic.Adt.Interface.GGdesbprDto;
    type UsedComponentsBalikyProduktu = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeBalikyProduktu>;
    /** Dialog detailu ulohy Baliky produktu (poduloha Ceniku produktu*/
    class DetailBalikyProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator uzivatele - ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator baliku produktu
         */
        private ixs_bpr;
        /**
        * Dto pro detailBuilder
        */
        private GGdesbprDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Produkty
        */
        private viewProdukty;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Baliky licenci
        */
        private gridProdukty;
        /**
        * format gridu Produkty
        */
        private gridFormatProdukty;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Produkty
        */
        private createGridFormatProdukty;
        private openDetailFormProdukty;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNovyBalikProduktu extends GContentBase {
        /**
         * Identifikator baliku produktu
         */
        private ixs_bpr;
        /**
         * data z gridu Baliky produktu
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeCeniky = Gordic.Adt.Interface.GGdesccmDto;
    type UsedComponentsCeniky = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeCeniky>;
    /** Dialog detailu ulohy Ceniky (poduloha Ceniku produktu)*/
    class DetailCeniky extends GContentBase<UsedComponentsCeniky> implements IGContent {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele ("20" = Správce ceníku)
         */
        private UserParam;
        /**
         * Identifikator gordickeho ceniku
         */
        private gcenik;
        /**
         * PID ceniku
         */
        private ixp_ccm;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        /**
        * Dto pro detailBuilder
        */
        private GGdesccmDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * Pole vybranych radku z gridu pro Obsah ceniku
         */
        private obsahCenikuVyberRadku;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro grid s obsahem ceniku
        */
        private viewObsahCeniku;
        /**
        * isl view gridu pro grid podpolozky
        */
        private viewPolozky;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid obsah ceniku
        */
        private gridObsahCeniku;
        /**
        * grid polozky
        */
        private gridPolozky;
        /**
        * format gridu polozky
        */
        private gridFormatObsahCeniku;
        /**
        * format gridu polozky
        */
        private gridFormatPolozky;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců gridu Polozky
        */
        private createGridFormatObsahCeniku;
        /**
        * vytvořit formát sloupců gridu Polozky
        */
        private createGridFormatPolozky;
        /**
         * otevřít detail gridu polozky
         */
        private openDetailObsahCeniku;
        /**
         * otevřít detail gridu polozky
         */
        private openDetailPolozky;
        /**
         *  Funkce pro zatrhnuti radku
         */
        private prepareCheckData;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit - V této funkci je možné ovlivňovat komponenty, se kterými builder bude pracovat.
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu polozek ceniku */
    class DetailCenikyObsahCeniku extends GContentBase {
        /**
         * PID ceniku
         */
        private ixp_ccm;
        /**
         * Pole vybranych radku z gridu pro Obsah ceniku
         */
        private obsahCenikuVyberRadku;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * polPopis
         */
        private polPopis;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Obecne udaje
         */
        private GtabFormObecneUdaje;
        /**
         * element gtabu pro grid s Vyberem podpolozek
         */
        private gridGtabVybranePodpolozky;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element formu s obecnymi udaji
        */
        private formObecneUdaje;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybranePodpolozky;
        private vybranePolozky;
        private formUserSettings;
        private allRowsInfo;
        private vyberPodpolozek;
        private vyberPolozek;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * nastavit titulek dialogu
         */
        private setTitleMultiEdit;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtonsMultiEdit;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBarMultiEdit;
        /**
         * vytvořit commandbar
         */
        private createCommandBarMultiEdit;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdajeMultiEdit;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem baliku licenci
         */
        private createGTabPodpolozky;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu polozek ceniku */
    class DetailCenikyPolozky extends GContentBase {
        /**
         * PID ceniku produktu Gordic
         */
        private ixp_ccm;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * polVzorEnabled - priznak pro kopírování dle produktů dle vzorové ceníkové položky
         */
        private polVzorEnabled;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         *  vytvořit formulář
         */
        private createFormVzorovaPolozka;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    class DetailCompCenik extends GContentBase {
        /**
         *  Pole řádků s ceníky
         */
        private ccmField;
        /**
         * prodPpol- Přepínač, kterým by se omezí výčet kontrolovaných řádků podmínkou ppol< 350
         * @type {boolean}
         * @default true
         */
        private prodPpol;
        /**
         * compareRows
         * @type {any}
         */
        private compareRows;
        /**
         * isComparisonInited - Příznak započatého porovnávání
         * @type {boolean}
         */
        private isComparisonInited;
        /**
         * element comparatoru
         */
        private comparator;
        /**
         * element přepínače - pro rozhodavací logiku porovnávání
         */
        private switch;
        /**
         * counterLic
         * @type {number}
         * @default 0
         */
        private counterCenik;
        /**
         * Badge element pro zobrazení počtu porovnávaných záznamů
         */
        private comparisonBadge;
        onContentReady(): void;
        /**
        * Vytvoreni definice formulare
        * @returns {Forms.Form} Form
        */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        private vytvorPrepinac;
        private nactiCompData;
        /**
         * showComparison - Funkce pro zobrazení/přidání do porovnávače
         *
         * @param {any} metaRows
         */
        private showComparison;
        /**
         * createComparisonFormat - Formát zobrazení dat
         *
         * @param {any[]} data
         */
        private createComparisonFormat;
        /**
         * otevřít detail ulohy Licence databaze
         */
        private openDetail;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho ceniku pro cenik produktu */
    class DetailNovyCenik extends GContentBase {
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vyčistit cache prohližeče
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Souvisejici podpolozky produktovych listu */
    class DetailProdListySouvPodpol extends GContentBase {
        /**
         * Proktovy list
         */
        private id_listu;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Souvisejici polozky produktovych listu */
    class DetailProdListySouvPol extends GContentBase {
        /**
         * Proktovy list
         */
        private id_listu;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _createTemplateGridFormat?(): JQueryPromise<Gordic.Data.GridFormat<Gordic.Adt.Interface.GGdesprlDto>>;
        _templateListContent: GContent;
    }
    type DtoTypeProduktoveListy = Gordic.Adt.Interface.GGdesprlDto;
    type UsedComponentsProduktoveListy = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeProduktoveListy>;
    /** Dialog detailu ulohy Produktove listy (poduloha Ceniku produktu)*/
    class DetailProduktoveListy extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator produktoveho listu
         */
        private id_listu;
        /**
        * Dto pro detailBuilder
        */
        private readonly GGdesprlDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro grid souvisejici polozky
        */
        private viewSouvisejiciPolozky;
        /**
        * isl view gridu pro grid souvisejici podpolozky
        */
        private viewSouvisejiciPodpolozky;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Souvisejici polozky
        */
        private gridSouvisejiciPolozky;
        /**
        * grid Souvisejici podpolozky
        */
        private gridSouvisejiciPodpolozky;
        /**
        * format gridu Souvisejici polozky
        */
        private gridFormatSouvisejiciPolozky;
        /**
        * format gridu Souvisejici podpolozky
        */
        private gridFormatSouvisejiciPodpolozky;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců gridu Souvisejici polozky
        */
        private createGridFormatSouvisejiciPolozky;
        /**
        * vytvořit formát sloupců gridu Souvisejici podpolozky
        */
        private createGridFormatSouvisejiciPodpolozky;
        /**
         * otevřít detail gridu Souvisejici polozky
         */
        private openDetailSouvisejiciPolozky;
        /**
         * otevřít detail gridu Souvisejici podpolozky
         */
        private openDetailSouvisejiciPodpolozky;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit - V této funkci je možné ovlivňovat komponenty, se kterými builder bude pracovat.
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog hromadné úpravy Produktů
     *
     * @author vblabla
     * @since 490.1.0.169
     */
    class DetailEditProdukt extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamRevize;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Obecne udaje
         */
        private GtabFormObecneUdaje;
        /**
         * element gtabu pro grid s Vyberem podpolozek
         */
        private gridGtabVybraneProdukty;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element formu s obecnymi udaji
        */
        private formObecneUdaje;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybraneProdukty;
        private formUserSettings;
        private allRowsInfo;
        private vyberProduktu;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem produktu
         */
        private createGTabProdukty;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho Produktu */
    class DetailNovyProdukt extends GContentBase {
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeProdukt = Gordic.Adt.Interface.GGdecfazDto;
    type UsedComponentsProdukt = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeProdukt>;
    /** Dialog detailu ulohy Produktove listy (poduloha Ceniku produktu)*/
    class DetailProduktu extends GContentBase<UsedComponentsProdukt> implements IGContent {
        /**
         * Příznak ukládání dat
         */
        private ukladaniDat;
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele (20 = Vedoucí vývojového teamu)
         */
        private UserParamRevize;
        /**
         * Identifikator produktoveho listu
         */
        private faze;
        /**
         * Identifikator kontrolniho modu
         */
        private checkMode;
        /**
        * Dto pro detailBuilder
        */
        private readonly GGdecfazDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro grid Licence
        */
        private viewLicence;
        /**
        * isl view gridu pro grid Dostupnost ve verzi
        */
        private viewDostupnostVeVerzi;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Licence
        */
        private gridLicence;
        /**
        * grid Dostupnost ve verzi
        */
        private gridDostupnostVeVerzi;
        /**
        * format gridu Licence
        */
        private gridFormatLicence;
        /**
        * format gridu Dostupnost ve verzi
        */
        private gridFormatDostupnostVeVerzi;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců gridu Licence
        */
        private createGridFormatLicence;
        /**
        * vytvořit formát sloupců gridu Dostupnost ve verzi
        */
        private createGridFormatDostupnostVeVerzi;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit - V této funkci je možné ovlivňovat komponenty, se kterými builder bude pracovat.
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _createTemplateGridFormat?(): JQueryPromise<Gordic.Data.GridFormat<Gordic.Adt.Interface.GGdevnpoDto>>;
        _templateListContent: GContent;
    }
    type DtoTypeProdukty = Gordic.Adt.Interface.GGdecnpoDto;
    type UsedComponentsProdukty = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeProdukty>;
    /** Dialog detailu ulohy Produkty (poduloha Ceniku produktu)*/
    class DetailProdukty extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator produktu (cenikova polozka - pol)
         */
        private pol;
        /**
        * Dto pro detailBuilder
        */
        private GGdecnpoDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro grid Historie zmen na detailu Produktu v uloze Cenik produktu
        */
        private viewHistorieZmen;
        /**
        * isl view gridu pro grid Komentare na detailu Produktu v uloze Cenik produktu
        */
        private viewKomentare;
        /**
        * isl view gridu pro grid Produktove listy na detailu Produktu v uloze Cenik produktu
        */
        private viewProduktoveListy;
        /**
        * isl view gridu pro grid Programove faze
        */
        private viewProgramoveFaze;
        /**
        * isl view gridu pro grid Podpolozky na detailu Produktu v uloze Cenik produktu
        */
        private viewPodpolozky;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid pro loadnuti podpolozek
        */
        private gridLoad;
        /**
        * gcover pro zobrazeni nacitaci zpravy
        */
        private loadMessage;
        /**
        * grid Historie
        */
        private gridHistorie;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * grid Komentare
        */
        private gridKomentare;
        /**
        * grid ProduktoveListy
        */
        private gridProduktoveListy;
        /**
        * grid Programove faze
        */
        private gridProgramoveFaze;
        /**
        * grid Podpolozky
        */
        private gridPodpolozky;
        /**
        * format gridu Historie
        */
        private gridFormatHistorie;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * format gridu Komentare
        */
        private gridFormatKomentare;
        /**
        * format gridu Programove faze
        */
        private gridFormatProgramoveFaze;
        /**
        * format gridu Produktove listy
        */
        private gridFormatProduktoveListy;
        /**
        * format gridu Podpolozky
        */
        private gridFormatPodpolozky;
        /**
        * sloupce gridu Historie
        */
        private columnsHistorie;
        /**
        * sloupce gridu Komentare
        */
        private columnsKomentare;
        /**
        * sloupce gridu Produktove listy
        */
        private columnsProduktoveListy;
        /**
        * sloupce gridu Podpolozky
        */
        private columnsPodpolozky;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců gridu Historie
        */
        private createGridFormatHistorie;
        /**
        * vytvořit formát sloupců gridu Historie zmen
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců gridu Komentare
        */
        private createGridFormatKomentare;
        /**
        * vytvořit formát sloupců gridu Programove faze
        */
        private createGridFormatProgramoveFaze;
        /**
        * vytvořit formát sloupců gridu Produktove Listy
        */
        private createGridFormatProduktoveListy;
        /**
        * vytvořit formát sloupců gridu Podpolozky
        */
        private createGridFormatPodpolozky;
        /**
         * otevřít detail dialog gridu Historie polozky
         */
        /**
         * otevřít detail Komentare produktu
         */
        private openDetailProduktyKomentare;
        /**
         * otevřít detail gridu Produktove listy
         */
        private openDetailProduktoveListy;
        /**
         * otevřít detail ulohy Produkty
         */
        private openDetailProdukt;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit - V této funkci je možné ovlivňovat komponenty, se kterými builder bude pracovat.
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Komentare k produktu */
    class DetailProduktyKomentare extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * rowCount - priznak existujicich radku komentaru
         */
        private rowCount;
        /**
        * pole s radky baliku licenci
        */
        radky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog pro zalozani novych podpolozek */
    class DetailProduktyPodpolDlg extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova polozka
         */
        private dat_pol_od;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Podpolozky
         */
        private dataRow;
        /**
         * data z historie podpolozky
         */
        private dataRowHistoriePpol;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * copyMode - priznak pro rezim kopírování podpoložek
         */
        private copyMode;
        /**
         * new - priznak nove podpolozky
         */
        private new;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         *  vytvořit formulář pro novou podpolozku v uloze podpolozky
         */
        private createFormNewPpol;
        /**
         *  vytvořit formulář pro kopírování podpoložek k ceníkové položce
         */
        private createFormCopyPpol;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyčistit cache prohližeče
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Dialog Podpolozek ulohy Produkty
    */
    class DetailProduktyPodpolozky extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Polozka
         */
        private pol;
        /**
         * Pocatek platnosti polozky
         */
        private dat_pol_od;
        /**
         * Podpolozka
         */
        private ppol;
        /**
         * editMode
         */
        private editMode;
        /**
         * editMode
         */
        private copyMode;
        /**
        * isl view gridu pro Seznam podpolozek
        */
        private view;
        /**
        * element filterPanelu
        */
        private filter;
        private gridGtab;
        private rowGridGtab;
        private gridFormat;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * element seznamu
         */
        private gridPodpolozky;
        /**
         * formát sloupců gridu
         */
        private gridFormatPodpolozky;
        /**
        * prazdny view gridu
        */
        private viewEmpty;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři gtab pro grid s podpolozkami
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit format sloupcu gridu
         */
        private createGridFormat;
        /**
        * otevřít detail Podpolozky (na zalozce Podpolozky)
        */
        private openDetailPodpolozky;
        /**
        * otevřít dialog nove podpolozky
        */
        private openDetailProduktyPodpolDlg;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Produktove listy k jednotlivym produktum */
    class DetailProduktyProdListy extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Podpolozek pro hromadnou editaci */
    class DetailEditPodpolozky extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Obecne udaje
         */
        private GtabFormObecneUdaje;
        /**
         * element gtabu pro grid s Vyberem podpolozek
         */
        private gridGtabVybranePodpolozky;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element formu s obecnymi udaji
        */
        private formObecneUdaje;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybranePodpolozky;
        private vybranePolozky;
        private formUserSettings;
        private allRowsInfo;
        private vyberPodpolozek;
        private vyberPolozek;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem baliku licenci
         */
        private createGTabPodpolozky;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Komentare podpolozky */
    class DetailPodpolKomentare extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * rowCount - priznak existujicich radku komentaru
         */
        private rowCount;
        /**
        * pole s radky baliku licenci
        */
        radky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Produktove listy podpolozky */
    class DetailPodpolProdListy extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Programove faze podpolozky */
    class DetailPodpolProgFaze extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Souvisejici produkty podpolozky */
    class DetailPodpolSouvisejici extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Zaklad procentualni ceny podpolozky */
    class DetailPodpolZakladProcCeny extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Zamennost s jinymi produkty podpolozky */
    class DetailPodpolZamennost extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Yavislost na jinych produktech podpolozky */
    class DetailPodpolZavislost extends GContentBase {
        /**
         * Cenikova polozka
         */
        private pol;
        /**
         * Cenikova podpolozka
         */
        private ppol;
        /**
         * data z gridu Komentare
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * zavisle - priznak dialogu zavislych ppol
         */
        private zavislePpol;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypePodpolozky = Gordic.Adt.Interface.GGdecproDto;
    type UsedComponentsPodpolozky = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypePodpolozky>;
    /** Dialog detailu zalozky Podpolozky (Na detailu Produktu - poduloha Ceniku produktu)*/
    class DetailPodpolozky extends GContentBase<UsedComponentsPodpolozky> implements IGContent {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator produktu (cenikova polozka - pol)
         */
        private pol;
        /**
         * Identifikator podpolozky
         */
        private ppol;
        /**
        * Dto pro detailBuilder
        */
        private GGdecproDto?;
        private vybranePpol;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro grid Historie zmen
        */
        private viewHistorieZmen;
        /**
        * isl view gridu pro grid Komentare
        */
        private viewKomentare;
        /**
        * isl view gridu pro grid Produktove listy
        */
        private viewProduktoveListy;
        /**
        * isl view gridu pro grid Programove faze
        */
        private viewProgramoveFaze;
        /**
        * isl view gridu pro grid Související produkty
        */
        private viewSouvisejiciProdukty;
        /**
        * isl view gridu pro grid Zavislost na jinych produktech
        */
        private viewZavislostNaJinychProduktech;
        /**
        * isl view gridu pro grid Zavislost na PPol
        */
        private viewZavislostNaPpol;
        /**
        * isl view gridu pro grid Zavislych PPol
        */
        private viewZavislePpol;
        /**
        * isl view gridu pro grid Zamennost s jinymi produkty
        */
        private viewZamennostSJinymiProdukty;
        /**
        * isl view gridu pro grid Zaklad procentualni ceny
        */
        private viewZakladProcentualniCeny;
        /**
        * grid Historie
        */
        private gridHistorie;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * grid Komentare
        */
        private gridKomentare;
        /**
        * grid ProduktoveListy
        */
        private gridProduktoveListy;
        /**
        * grid Programove faze
        */
        private gridProgramoveFaze;
        /**
        * grid Souvisejici produkty
        */
        private gridSouvisejiciProdukty;
        /**
        * grid Zavislost na jinych produktech
        */
        private gridZavislostNaJinychProduktech;
        /**
        * grid Zavislost na Ppol
        */
        private gridZavislostNaPpol;
        /**
        * grid Zavisle Ppol
        */
        private gridZavislePpol;
        /**
        * grid Zamennost s jinymi produkty
        */
        private gridZamennostSJinymiProdukty;
        /**
        * grid Zaklad procentualni ceny
        */
        private gridZakladProcentualniCeny;
        /**
        * format gridu Historie
        */
        private gridFormatHistorie;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * format gridu Komentare
        */
        private gridFormatKomentare;
        /**
        * format gridu Produktove listy
        */
        private gridFormatProduktoveListy;
        /**
        * format gridu Programove faze
        */
        private gridFormatProgramoveFaze;
        /**
        * format gridu Souvisejici produkty
        */
        private gridFormatSouvisejiciProdukty;
        /**
        * format gridu Zavislost na jinych produktech
        */
        private gridFormatZavislostNaJinychProduktech;
        /**
        * format gridu Zavislost na Ppol
        */
        private gridFormatZavislostNaPpol;
        /**
        * format gridu Zavisle Ppol
        */
        private gridFormatZavislePpol;
        /**
        * format gridu Zamennost s jinymi produkty
        */
        private gridFormatZamennostSJinymiProdukty;
        /**
        * format gridu Zaklad procentualni ceny
        */
        private gridFormatZakladProcentualniCeny;
        /**
         * editMode
         */
        private editMode;
        /**
         * zavislePpol
         */
        private zavislePpol;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * otevřít detail gridu Komentare
         */
        private openDetailPodpolKomentare;
        /**
         * otevřít detail gridu Produktove listy
         */
        private openDetailPodpolProdListy;
        /**
         * otevřít detail gridu Programove faze
         */
        private openDetailPodpolProgFaze;
        /**
         * otevřít detail gridu Souvisejici produkty
         */
        private openDetailPodpolSouvisejici;
        /**
         * otevřít detail gridu Zavislost na jinych produktech
         */
        private openDetailPodpolZavislost;
        /**
         * otevřít detail gridu Zamennost s jinymi produkty
         */
        private openDetailPodpolZamennost;
        /**
         * otevřít detail gridu Zaklad procentualni ceny
         */
        private openDetailPodpolZakladProcCeny;
        /**
         * otevřít detail ulohy Produkty
         */
        private openDetailProdukt;
        /**
        * vytvořit formát sloupců gridu Historie zmen
        */
        private createGridFormatHistorie;
        /**
        * vytvořit formát sloupců gridu Historie zmen
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců gridu Komentare
        */
        private createGridFormatKomentare;
        /**
        * vytvořit formát sloupců gridu Produktove listy
        */
        private createGridFormatProduktoveListy;
        /**
        * vytvořit formát sloupců gridu Programove faze
        */
        private createGridFormatProgramoveFaze;
        /**
        * vytvořit formát sloupců gridu Souvisejici produkty
        */
        private createGridFormatSouvisejiciProdukty;
        /**
        * vytvořit formát sloupců gridu Zavislost na jinych produktech
        */
        private createGridFormatZavislostNaJinychProduktech;
        /**
        * vytvořit formát sloupců gridu Zavislost na Ppol
        */
        private createGridFormatZavislostNaPpol;
        /**
        * vytvořit formát sloupců gridu Zavisle Ppol
        */
        private createGridFormatZavislePpol;
        /**
        * vytvořit formát sloupců gridu Zamennost s jinymi produkty
        */
        private createGridFormatZamennostSJinymiProdukty;
        /**
        * vytvořit formát sloupců gridu Zaklad procentualni ceny
        */
        private createGridFormatZakladProcentualniCeny;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit - V této funkci je možné ovlivňovat komponenty, se kterými builder bude pracovat.
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNovaSkupinaProduktu extends GContentBase {
        /**
         * Identifikator skupiny produktu
         */
        private ixs_spr;
        /**
         * data z gridu Skupiny produktu
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Produkty */
    class DetailSkupProdSouvPodPol extends GContentBase {
        /**
         * Identifikator skupiny produktu
         */
        private ixs_spr;
        /**
         * data z gridu Produkty
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Produkty */
    class DetailSkupProdSouvPol extends GContentBase {
        /**
         * Identifikator skupiny produktu
         */
        private ixs_spr;
        /**
         * data z gridu Produkty
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeSkupinyProduktu = Gordic.Adt.Interface.GGdessprDto;
    type UsedComponentsSkupinyProduktu = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeSkupinyProduktu>;
    /** Dialog detailu ulohy Skupiny produktu (poduloha Ceniku produktu*/
    class DetailSkupinyProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator uzivatele - ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator skupiny produktu
         */
        private ixs_spr;
        /**
        * Dto pro detailBuilder
        */
        private GGdessprDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Souvisejici polozky
        */
        private viewSouvisejiciPolozky;
        /**
        * isl view gridu pro Seznam Souvisejici podpolozky
        */
        private viewSouvisejiciPodpolozky;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Souvisejici polozky
        */
        private gridSouvisejiciPolozky;
        /**
        * grid Souvisejici podpolozky
        */
        private gridSouvisejiciPodpolozky;
        /**
        * format gridu Souvisejici polozky
        */
        private gridFormatSouvisejiciPolozky;
        /**
        * format gridu Souvisejici Podpolozky
        */
        private gridFormatSouvisejiciPodpolozky;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Souvisejici polozky
        */
        private createGridFormatSouvisejiciPolozky;
        /**
        * vytvořit formát sloupců seznamu Souvisejici podpolozky
        */
        private createGridFormatSouvisejiciPodpolozky;
        private openDetailFormSouvisejiciPolozky;
        private openDetailFormSouvisejiciPodpolozky;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeDalsiSoubory = Gordic.Adt.Interface.GGdesdifDto;
    type UsedComponentsDalsiSoubory = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeDalsiSoubory>;
    /** Dialog detailu ulohy Dalsi soubory*/
    class DetailDalsiSoubory extends GContentBase<UsedComponentsDalsiSoubory> implements IGContent {
        /**
         *  DB parametr adt_user_dif - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  IxsZmp - pro zjisteni pristupovych prav uzivatele
         */
        private IxsZmp;
        /**
         * identifikator souboru
         */
        private ixs_dif;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
         * Příznak aktualizace souboru
         */
        private fileUpdated;
        /**
         * Příznak uložení detailu
         */
        private detailSaved;
        /**
        * Dto pro detailBuilder
        */
        private GGdesdifDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
         *  maxSize - pro zjisteni pripustne velikosti souboru pro stazeni prohlizecem
         */
        private maxSize;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Skupiny databazi
        */
        private viewSkupinyDatabazi;
        /**
        * isl view gridu Historie zmen
        */
        private viewHistorieZmen;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Skupiny databazi
        */
        private gridSkupinyDatabazi;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * format gridu Skupiny databazi
        */
        private gridFormatSkupinyDatabazi;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Skupiny databazi
        */
        private createGridFormatSkupinyDatabazi;
        /**
        * vytvořit formát sloupců seznamu Historie zmen
        */
        private createGridFormatHistorieZmen;
        /**
         * otevřít detail seznamu Skupiny databazi
         */
        private openDetailSkupinyDB;
        /**
        * otevřít dialog odeslani souboru do FTPS uloziste
        */
        private openDetailMoveFileToStorage;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
         * otevřít detail okno pro upload souboru
         */
        private openDetailUpload;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Skupiny databazi */
    class DetailDalsiSouborySkupinyDB extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator skupiny DB
         */
        private ixs_sdb;
        /**
         *  Identifikator souboru
         */
        private ixs_dif;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro upload souboru v uloze Dalsi soubory */
    class DetailDalsiSouboryUpload extends GContentBase {
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        private ixs_dif;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        private callToImport;
        /**
         * vytvoři gtab pro grid s Historií obsahu balíků
         */
        private createGTab;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu odeslani souboru na FTPi */
    class DetailSouboruOdeslaniNaFTP extends GContentBase {
        /**
         *  DB parametr adt_user_dif - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private ixsRef;
        /**
         *  ID souboru
         */
        private ixs_dif;
        /**
         *  Nazev souboru
         */
        private nazev;
        /**
         *  Velikost souboru
         */
        private velikost;
        /**
         *  Typ souboru
         */
        private typSouboru;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář pro soubor
         */
        private createForm;
        /**
         *  vytvořit formulář
         */
        private createFileForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
    }
}
declare namespace Gordic.Adt.WebControls {
    enum ITypePanel {
        VerzeBalicku = 0,
        ObsazeneSoubory = 1,
        HistorieSpusteni = 2,
        ADLSoubory = 3,
        SkupinyDB = 4,
        HistorieCodeReview = 5,
        Neurceno = 99
    }
    /** Dialog detailu balíčku */
    class DetailBalicku extends GContentBase {
        /**
         * Příznak ukládání Code review
         */
        private codeReviewEdit;
        /**
         * Příznak ukládání detailu balíku
         */
        private detailEdit;
        /**
         * Příznak aktualizace detailu balíku
         */
        private detailRefresh;
        private file_dto;
        /*** element panelu v sidebaru */
        private panelElement;
        private panelId;
        private panelPopisId;
        /** detail typu historie verzí balíčku */
        private typeOfHistoryVersion;
        /** elmenet sidebaru */
        private sidebar;
        /** identifikátor balíčku */
        private ixs_gdt;
        /** data detailu */
        private data;
        /** příznak přímého přístupu na detail */
        private detailCommand;
        private grid_soubor;
        private ixs_gdt_obsazeny_soubor;
        private soubor_obsazeny_soubor;
        private soubor_verze_nazev;
        private soubor_verze;
        private soubor_ADLsoubor;
        private soubor_historieCodeReview;
        private obsazeny_soubor_decode_content;
        private obsazeny_soubor_code_content;
        private obsazeny_soubor_nazev;
        private gridHistorie;
        /** ixs_gdt v gridu verzi */
        private ixs_gdt_verze;
        /** grid_historie_spusteni */
        private grid_historie_spusteni;
        /** vblabla - grid_ADL_soubory */
        private grid_ADL_soubory;
        /** vblabla - grid_skupinyDB */
        private grid_skupinyDB;
        /** vblabla - grid_historieCodeReview */
        private grid_historieCodeReview;
        private initSidebar;
        private panelType;
        /**
         * editMode na skupiny databazi
         */
        private editModeSkupinyDB;
        private Autor;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserType;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserTypeRev;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator ixs_ref
         */
        private IxsRef;
        /**
         *  Identifikator autora GDZ baliku
         */
        private isUserAutor;
        private pocet_historie_spusteni;
        /**
         * isl view gridu Verze bslíků
         */
        private viewVerzeBaliku;
        /**
         * isl view gridu Obsazene soubory
         */
        private viewObsazeneSoubory;
        /**
         * isl view gridu Historie spuštění
         */
        private viewHistorieSpusteni;
        /**
         * isl view gridu ADL soubory
         */
        private viewADLSoubory;
        /**
         * isl view gridu Skupiny DB
         */
        private viewSkupinyDB;
        /**
         * isl view gridu Historie code review
         */
        private viewCodeReview;
        /**
         * isl view pro přehled DB změn
         */
        private viewZmeny;
        /**
         * isl view pro přehled DB změn pro distributory
         */
        private viewZmenyDistributor;
        /**
         *  elmenet GPreviewController pro verze baliku
         */
        private previewControllerVerzeBaliku;
        /**
         *  elmenet GPreviewController pro historii spusteni
         */
        private previewControllerHistorieSpusteni;
        /**
         *  elmenet GPreviewController pro ADL soubory
         */
        private previewControllerADLSoubory;
        /**
         *  elmenet GPreviewController pro Historii Code review
         */
        private previewControllerHistorieCodeReview;
        /**
         * tab_element_five	- Pro navázání Historie Code review
         * @type {JQuery<HTMLElement>}
         */
        private tab_element_five;
        /**
         * tab_element_six	- Pro navázání popisů DB změn
         * @type {JQuery<HTMLElement>}
         */
        private tab_element_six;
        /**
         * MDProcessor
         * @type {any}
         */
        private MDProcessor;
        /**
         * typView - Pohled pro přehled DB změn
         * @type {number}
         * @default 0 //0= výchozí / 1=dle typu popisu / 2=dle typu revize
         */
        private typView;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        private resSearch;
        private gridFormat;
        private pocetZaznamu;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private newDescLink;
        private captionLink;
        private searchValue;
        private fieldVyberTagu;
        private mainLogsPanel;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        private popisTyp;
        private fieldPopisTagy;
        private typZmeny;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private refreshDetail;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        private closing;
        /** setnout data */
        private setData;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** vytvořit menubar */
        private createMenuBar;
        /**
         * nastavení aktivity po změně
         */
        private setAktivita;
        /**
         * nastavit stavy (enable) v menu
         * @param {Utils.AdtGincaktEnum} activity úroveň aktivity
         */
        private setStateOfEnableOnMenuBarActions;
        /**
         * aktivovat balík
         */
        private activatePackage;
        /** vytvořit commandbar */
        private createCommandBar;
        /** vytvořit statusbar */
        private createStatusBar;
        /** odstranit všechny vlastní třídy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** změna hodnoty statusbaru */
        private changeStatusBar;
        /**
         * ukázat panel s veřejným a privátním popisem
         */
        private showPanelPopis;
        /**
         * validace veřejného popisu
         */
        private validatePopisVerejny;
        /**
         * validace soukromého popisu
         */
        private validatePopisPrivatni;
        /** vytvořit panel */
        private createPanelPopis;
        /** vytvořit panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvořit sidebar */
        private createSidebar;
        private openDetail;
        private refreshGridOnGTab;
        private row_verze_balicku;
        private columns_verze_balicku;
        /** formát gridu verze balíčku */
        private gridFormatVerzeBalicku;
        private createGridVerzeBalickuOnGTab;
        private createGridFormatGTab;
        private createGridBalicekObsazenySouborGTab;
        private refreshPanel;
        private setPreviewEmpty;
        private setObsazenySoubor;
        private createGridFormatBalicekObsazenySouborGTab;
        /**
         * vytvořit gtaby pro seznamy
         */
        private createGTab;
        private row_historie_spusteni;
        private columns_historie_spusteni;
        private gridFormatHistorieSpusteni;
        private createGridBalicekHistorieSpusteniGTab;
        private createGridFormatBalicekHistorieSpusteniGTab;
        private row_ADL_soubory;
        private columns_ADL_soubory;
        private gridFormatADLSoubory;
        private createGridBalicekADLSouboryGTab;
        private createGridFormatBalicekADLSouboryGTab;
        private row_skupinyDB;
        private columns_skupinyDB;
        private gridFormatSkupinyDB;
        private createGridBalicekSkupinyDBGTab;
        private createGridFormatBalicekSkupinyDBGTab;
        private row_historieCodeReview;
        private columns_historieCodeReview;
        private gridFormatHistorieCodeReview;
        private createGridHistorieCodeReviewGTab;
        private createGridFormatHistorieCodeReviewGTab;
        /**
         * otevřít detail seznamu Skupiny databazi
         */
        private openDetailSkupinyDB;
        /**
         * otevřít detail ulohy Skupiny databazi
         */
        private openDetailSkupinyDatabazi;
        /**
         *  vytvořit sidebar
         */
        private createNewSidebar;
        private getMdProcessor;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        private ulozPopisKomponenty;
        /**
        * nastavit data Popisů Změn
        */
        private _createChangeLog;
        /**
        * nastavit data Popisů Změn
        */
        private _createChangeLogView;
        private createGridFormat;
        private createGridFormatView;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * _createView
         * this.options.data je nahrazeno za this.viewZmenyDistributor
         */
        _createView(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingView(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setDataView(data: any): void;
        _reloadDataView(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsView(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickView(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataView(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRowView(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesView(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog hromadných úprav GDZ balíků */
    class DetailEditGDZ extends GContentBase {
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele ke GDZ balíkům
         */
        private userParam;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Nový popis změny - Přidat
         */
        private GtabFormNovyPopis;
        /**
         * element gtabu pro grid s Vyberem GDZ balíků
         */
        private gridGtabVybraneGDZ;
        /**
        * element gtabu s vybranými revizemi
        */
        private gtabGDZ;
        /**
        * element formu s novým popisem změny - Přidat
        */
        private formNovyPopis;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybraneGDZ;
        private formUserSettings;
        private allRowsInfo;
        private vyberGDZ;
        private captionLink;
        private popisTyp;
        private typZmeny;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        private fieldIxsKmp;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        /**
        * element filterpanelu
        * */
        private filterPopis;
        private formImport;
        private dat_od;
        private dat_do;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        private searchValue;
        private resSearch;
        /**
        * Data view k popisům změn
        */
        private viewZmeny;
        /**
        * Data view k vzhledávání popisů změn
        */
        private viewSearchZmeny;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private mainLogsPanel;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form s přidáním nového popisu změny
         */
        private createGTabPridatPopis;
        /**
         * vytvořit form Nového popisu změny pro gtab
         */
        private createGTabFormNovyPopis;
        /**
         * vytvořit grid pro gtab s vybranými GDZ balíky
         */
        private createGTabGDZGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem GDZ baliku
         */
        private createGTabGDZ;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Chyby reinstalaci */
    class DetailVyvojovaDB extends GContentBase {
        /**
         *  ID databáze
         */
        private id_databaze;
        /**
         *  ID serveru
         */
        private id_server;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         * data z gridu Vývojové databáze
         */
        private dataRow;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro úpravu popisu změn
     */
    class DetailEditPopisZmen extends GContentBase {
        /**
         * ixs_kmp - Identifikátor změny
         * @type {string}
         */
        private ixs_kmp;
        /**
         * typ_zmeny
         * @type {string}
         */
        private typ_zmeny;
        /**
         * typ_zmeny
         * @type {number}
         */
        private typZmeny;
        /**
         * Příznak veřejné změny
         * @type {number}
         */
        private priz_verejny;
        /**
         * Příznak veřejné změny
         * @type {number}
         */
        private priz_verejnyEdit;
        /**
         * popis
         * @type {string}
         */
        private popis;
        /**
         * interni_popis
         * @type {string}
         */
        private interni_popis;
        /**
         * tagy
         * @type {string[]}
         */
        private tagy;
        /**
         * editDesc - Příznak editace popisu změny (true = editace / new = nový popis změny)
         * @type {boolean}
         * @default true
         */
        private editDesc;
        /**
         * editDescForm - formulář pro popis změny
         * @type {JQuery<HTMLElement>}
         */
        private editDescForm;
        /**
        * kontrola vlastnosti  - Veřejná změna
        */
        private checkPublic;
        private captionLink;
        /**
         * popisTyp
         * @type {string}
         */
        private popisTyp;
        private fieldVyberTagu;
        private fieldPopisTagy;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private fieldPopisTagyProUlozeni;
        private fieldTagy;
        private fieldStaticTagy;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * createEditDescForm
         */
        private createEditDescForm;
        private ulozPopis;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro Přehled všech změn
     */
    class DetailImportZmen extends GContentBase {
        private fieldIxsKmp;
        private polePopisuZmen;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        /**
        * element subtasku pro jednotlivé contenty - Splečné popisy změn k programové fázi / Vyhnledání společných popisů změn dle Tagů a data změny popisu
        */
        private subtaskImport;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
         * userStringMemo - příznak uživatelského textu pro import více změn k revizi
         * @type {boolean}
         * @default false
         */
        private userStringMemo;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        /**
         * revize
         * @type {string}
         */
        private revize;
        /**
         * importZmen - Příznak pro import společných popisů změn
         * @type {boolean}
         */
        private importZmen;
        /**
         * importNovyDetailRevize - Příznak importu změn k novému detailu revize
         * @type {boolean}
         */
        private importNovyDetailRevize;
        /**
         * fazeTab - Příznak aktivního tabu s filtrací dle programové fáze
         * @type {boolean}
         * @default true
         */
        private fazeTab;
        /**
         * ostatniTab - Příznak aktivního tabu s ostatními popisy změn
         * @type {boolean}
         * @default true
         */
        private ostatniTab;
        /**
         * fileTab - Příznak aktivního tabu s impoertem změn ze souboru
         * @type {boolean}
         * @default true
         */
        private fileTab;
        /**
        * element gtabu souboru
        */
        private gtabFile;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
         * revize_info
         * @type {any}
         */
        private revize_info;
        private revize_typ_t;
        private dat_od;
        private dat_do;
        private tagySearch;
        private fazeSearch;
        private verzeSearch;
        private legZmenySearch;
        private typView;
        private resSearch;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private mainLogsPanel;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private pocetZaznamu;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * poleIxsKmp - pole již importovaných popisů změn
         * @type {string[]}
         */
        private poleIxsKmp;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
         * priz_pouzity	- příznak již použitých popisů změn
         * @type {boolean}
         * @default false
         */
        private priz_pouzity;
        /**
         * priz_kotva - příznak pro hledání popisů změn dle kotvy
         * @type {boolean}
         * @default false
         */
        private priz_kotva;
        /**
         * priz_kotvy - příznak filtrace změn dle kotev
         * @type {boolean}
         * @default false
         */
        private priz_kotvy;
        /**
         * kotva
         * @type {string}
         */
        private kotva;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        private importPopis;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        private containsObject;
        /**
        * nastavit data
        */
        private _createChangeLog;
        /**
         * removeByAttr	 - Odstraní objekt z pole
         *
         * @param {any} arr
         * @param {any} attr
         * @param {any} value
         * @returns {[]}
         */
        private removeByAttr;
        private createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        private pridatPopisKomponenty;
        private getMdProcessor;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        private createFilterForm;
        /**
        * createMainTagPanelByTag	- Zobrazení hlavních tagů do panelu
        */
        private createMainTagsPanelByTag;
        /**
         *  vytvořit formulář
         */
        private createFormImportFile;
        /**
         *  vytvořit formulář
         */
        private createFormImportText;
        /**
         * vytvoři gtab pro náhled k importovanému souboru
         */
        private createGTabText;
        /**
         * importFromFile - import popisů změn ze souboru
         */
        private importFromFile;
        /**
                 * importFromFile - import popisů změn ze souboru
                 */
        private importUserChangelog;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNovyPopisZmen extends GContentBase {
        /**
         * Identifikátor typu popisu změn (0 = Komponenty / 1 = Faze / 2 = Databaze)
         */
        private popis_typ;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailPopisyZmen extends GContentBase {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        private resSearch;
        private gridFormat;
        private typView;
        private pocetZaznamu;
        private MDProcessor;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private captionLink;
        private searchValue;
        private fieldVyberTagu;
        /**
         * counterRadekZmena
         * @type {number}
         * @default 1
         */
        private counterRadekZmena;
        private _searchBoxTimer;
        /**
         * radekMax	- Nejvyssi radek karty s popisy zmen
         * @type {number}
         */
        private radekMax;
        /**
         * ixs_kta - Identifikátor skupiny/karty s popisy změn
         * @type {string}
         */
        private ixs_kta;
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private btnTool;
        /**
         * collapsible element pro skupinu Oprav
         * @type {JQuery<HTMLElement>}
         */
        private collElPatch;
        /**
         * Pole collapsible elementů pro skupiny popisů
         * @type {JQuery<HTMLElement>}
         */
        private fieldCollEl;
        /**
         * fieldRevizeTagy
         * @type {string[]}
         */
        private fieldCollElTyp;
        private mainLogsPanel;
        private fieldcollElRevize;
        private elKnownBug;
        private fieldcollElFazeText;
        /**
         * collapsible element pro skupinu Novinek
         * @type {JQuery<HTMLElement>}
         */
        private collElNewFeature;
        /**
         * collapsible element pro skupinu Známých chyb
         * @type {JQuery<HTMLElement>}
         */
        private collElKnownBug;
        /**
         * gtab pro novy popis změny
         * @type {JQuery<HTMLElement>}
         */
        private gtabNovyPopisZmeny;
        /**
         * element políčka pro úpravu popisu změny
         */
        private mdfieldPopis;
        /**
         * element panelu pro mdfield
         */
        private mdfieldButtonPanel;
        private fazeCollEl;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private fieldPopisTagy;
        private fieldPopisTagyProUlozeni;
        private popisTyp;
        private patchCollapsed;
        private newFeatureCollapsed;
        private knownBugCollapsed;
        private fieldTagy;
        private fieldTagyPopis;
        private typZmeny;
        private cntName;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmenyOrig;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
         * editDescForm - formulář pro editaci popisu změny
         * @type {JQuery<HTMLElement>}
         */
        private editDescForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private editForm;
        /**
         * aktivni zalozka
         * @type {any}
         */
        private subtask;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        /**
         * createMainTagPanel - Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private createMainContent;
        private ulozPopisKomponenty;
        private getMdProcessor;
        /**
        * nastavit data Popisů Změn
        */
        private _createChangeLog;
        private createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * filterData
         *
         * @param {any} value
         */
        private filterData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailPopisyZmenDB extends GContentBase {
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private gtabPopisyZmen;
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private btnTool;
        /**
         * collapsible element pro skupinu Oprav
         * @type {JQuery<HTMLElement>}
         */
        private collElPatch;
        /**
         * collapsible element pro skupinu Novinek
         * @type {JQuery<HTMLElement>}
         */
        private collElNewFeature;
        /**
         * gtab pro novy popis změny
         * @type {JQuery<HTMLElement>}
         */
        private gtabNovyPopisZmeny;
        /**
         * element políčka pro úpravu popisu změny
         */
        private mdfieldPopis;
        /**
         * element panelu pro mdfield
         */
        private mdfieldButtonPanel;
        /**
         * Popisný text
         */
        private mdfieldText;
        private popisTyp;
        private patchCollapsed;
        private newFeatureCollapsed;
        private fieldTagy;
        private cntName;
        private itteration;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
         * revize_infoData
         * @type {any}
         */
        private zmena_infoData;
        /**
         * aktivni zalozka
         * @type {any}
         */
        private subtask;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /**
         * vytvořit gtab pro popis změny
         */
        private createFormChangelog;
        /**
         * vytvořit gtab pro popis změny
         */
        private createGTabPopisZmeny;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvořit commandbar
         */
        private createMenuBar;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private createMainContent;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private changeLogsPanel;
        /**
         * updateChangeLogsPanel - Refresh changelogů v panelu
         */
        private updateChangeLogsPanel;
        /**
         * renderChangeLogPanelContent - Vykreslení contentu v changelog panelu
         *
         * @param {any} data
         * @param {any} wrapper
         */
        private renderChangeLogPanelContent;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailPopisyZmenKomponent extends GContentBase {
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private gtabPopisyZmen;
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private btnTool;
        /**
         * collapsible element pro skupinu Oprav
         * @type {JQuery<HTMLElement>}
         */
        private collElPatch;
        /**
         * collapsible element pro skupinu Novinek
         * @type {JQuery<HTMLElement>}
         */
        private collElNewFeature;
        /**
         * gtab pro novy popis změny
         * @type {JQuery<HTMLElement>}
         */
        private gtabNovyPopisZmeny;
        /**
         * element políčka pro úpravu popisu změny
         */
        private mdfieldPopis;
        /**
         * element panelu pro mdfield
         */
        private mdfieldButtonPanel;
        /**
         * Popisný text
         */
        private mdfieldText;
        private popisTyp;
        private patchCollapsed;
        private newFeatureCollapsed;
        private fieldTagy;
        private cntName;
        private itteration;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
         * revize_infoData
         * @type {any}
         */
        private zmena_infoData;
        /**
         * aktivni zalozka
         * @type {any}
         */
        private subtask;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /**
         * vytvořit gtab pro popis změny
         */
        private createFormChangelog;
        /**
         * vytvořit gtab pro popis změny
         */
        private createGTabPopisZmeny;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvořit commandbar
         */
        private createMenuBar;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private createMainContent;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private changeLogsPanel;
        /**
         * updateChangeLogsPanel - Refresh changelogů v panelu
         */
        private updateChangeLogsPanel;
        /**
         * renderChangeLogPanelContent - Vykreslení contentu v changelog panelu
         *
         * @param {any} data
         * @param {any} wrapper
         */
        private renderChangeLogPanelContent;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailProfilZmen extends GContentBase {
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private gridProfil;
        /**
         * gridFormat
         * @type {Gordic.Data.GridFormat}
         */
        private gridFormat;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro Detail revize - záložka Změny
     */
    class DetailRevizeImportZmen extends GContentBase {
        private fieldIxsKmp;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        /**
         * actDataLoaded - příznak načtených aktuálních dat za programovou fázi (true = Data jsou načtena po aktuálně otevřenou revizi fáze / false = Data jsou načtena po nejvyšší vytvořenou revizi fáze)
         * @type {boolean}
         * @default true
         */
        private actDataLoaded;
        private initialLoad;
        private DataFilter?;
        private actRevToOpen;
        /**
        * element subtasku pro jednotlivé contenty - Splečné popisy změn k programové fázi / Vyhnledání společných popisů změn dle Tagů a data změny popisu
        */
        private subtaskImport;
        /**
        * element gtabu pro popisy změn programové fáze
        */
        private gtabMainFazePanel;
        /**
        * element hlavního gtabu
        */
        private gtabMain;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
        * element sidebaru s informacema o revizi
        * */
        private previewRev;
        /**
         * sideBar - nastavení sidebaru
         * @type {GSideBarBarOptions}
         */
        private sideBar;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        /**
         * newPopisZmeny - Objek nového popisu změny pro uložení
         * @type {Gordic.Adt.Interface.GPopisZmenyDto}
         * @default {}
         */
        private newPopisZmeny;
        /**
         * newFieldPopisZmeny - Pole Objektů s novými popisy změny pro uložení
         * @type {Gordic.Adt.Interface.GPopisZmenyDto}
         * @default {}
         */
        private newFieldPopisZmeny;
        private numItteration;
        /**
        * kotva
        * @type {string}
        */
        private kotva;
        /**
        * priz_kotva - příznak pro hledání popisů změn dle kotvy
        * @type {boolean}
        * @default false
        */
        private priz_kotva;
        private tooltipTagy;
        /**
         * revize
         * @type {string}
         */
        private revize;
        /**
         * fazeTab - Příznak aktivního tabu s filtrací dle programové fáze
         * @type {boolean}
         * @default true
         */
        private fazeTab;
        /**
         * revize_info
         * @type {any}
         */
        private revize_info;
        /**
         * revize_typ_t
         * @type {any}
         */
        private revize_typ_t;
        private revBranchesData;
        private loadedChangelogViewData;
        private polePopisAkcept;
        private dat_od;
        private dat_do;
        private tagySearch;
        private fazeSearch;
        private verzeSearch;
        private legZmenySearch;
        private typView;
        private resSearch;
        /**
         * topRevFaze - Příznak nejvyšší revize programové fáze
         * @type {boolean}
         * @default false
         */
        private topRevFaze;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private mainLogsPanel;
        private mainLogsPanelControls;
        private mainLogsPanelFaze;
        private cntLoading;
        private btnPanel;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private emptyFormFaze;
        private captionLink;
        private pocetZaznamu;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn	revize
         */
        private viewZmeny;
        /**
         * Data view k popisům změn programové fáze
         */
        private viewZmenyView;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
         * priz_pouzity	- příznak již použitých popisů změn
         * @type {boolean}
         * @default false
         */
        private priz_pouzity;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamRevize;
        /**
         *  ixs_fun přihlášeného uživatele
         */
        private IxsFun;
        /**
         * mod - Mód zobrazení popisů změn
         * @type {number}
         * @default 1
         */
        private mod;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        private importPopis;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * Nastavit data
         *
         * @param {boolean} fazeTab
         * @param {Gordic.Data.View} dataView
         * @param {number} refreshMode - mod vykreslení dat (0 = původní vykreslení / 1 = Přidání nového popisu změny / 2 = Import několika popisů změn)
         */
        private _createChangeLog;
        private createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainRevizePanel	- Zobrazení relevantních popisů změn do hlavního panelu	 (Automat)
         */
        private createMainRevizePanel;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private akceptovat;
        private checkChangeDescExist;
        /**
         * removeByAttr	 - Odstraní objekt z pole
         *
         * @param {any} arr
         * @param {any} attr
         * @param {any} value
         * @returns {[]}
         */
        private removeByAttr;
        /** setnout data */
        private createEmptyContent;
        private pridatPopisKomponenty;
        private getMdProcessor;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        private createFilterForm;
        /**
         * _createChangeLogView - nastavit data	pro view režim (Distributorský režim)
         *
         * @param {number} refreshMode - mod vykreslení dat (0 = úvodní vykreslení / 1 = Zobrazení všech popisů změn dané větve)
         */
        private _createChangeLogView;
        private createGridFormatView;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _createView(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingView(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setDataView(data: any): void;
        _reloadDataView(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsView(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickView(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataView(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRowView(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesView(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
        * vytvoři gtab pro main faze panel
        */
        private createGtabMainFazePanel;
        /**
         * createMainFazePanel	- Zobrazení popisů změn za programovou fází do panelu (view režim)
         */
        private createMainFazePanel;
        /**
        * createMainLogsPanelFaze	- Zobrazení popisů do panelu s popisy změn za programovou fázi (view režim)
        */
        private createMainLogsPanelFaze;
        /** setnout data */
        private createEmptyContentFaze;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu tagu programové fáze */
    class DetailTagFaze extends GContentBase {
        /**
         * Programová fáze
         */
        private faze;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * GKomponentaInputParams
     *
     * @author vblabla
     * @since 488.1.0.35
     */
    interface GKomponentaInputParams {
        /**
         * Komponenta
         * @type {string}
         */
        Komponenta?: string;
    }
    class DetailKomponent extends GContentBase {
        private readonly DatovyModel;
        onContentReady(): void;
        /**
         * Vytvoreni definice formulare
         * @returns {Forms.Form} Form
         */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        /**
         * Vytvoreni menubaru
         */
        private makeMenu;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypePrehledKomponent = Gordic.Adt.Interface.GGdesexkDto;
    type UsedComponentsPrehledKomponent = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypePrehledKomponent>;
    /** Dialog detailu ulohy Prehled komponent*/
    class DetailPrehledKomponent extends GContentBase<UsedComponentsPrehledKomponent> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Identifikator uzivatele - ixs_fun
         */
        private IxsFun;
        /**
         * licence rady PID
         */
        private file_name;
        /**
         * Primarni licence DB
         */
        private faze;
        /**
        * Dto pro detailBuilder
        */
        private GGdesexkDto?;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Fyzicke databaze */
    class DetailBalLicFyzickeDB extends GContentBase {
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie zodpovednosti za balik licenci  */
    class DetailBalLicFyzickeDBHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad PID */
    class DetailBalLicLicenceRadPID extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator produkční řady
         */
        private prod_rada;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Licence rad PID pro balik licenci  */
    class DetailBalLicLicenceRadPIDHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeBalikyLicenci = Gordic.Adt.Interface.GGdeslipDto;
    type UsedComponentsBalikyLicenci = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeBalikyLicenci>;
    /** Dialog detailu ulohy Baliky licenci (poduloha Registru licenci)*/
    class DetailBalikyLicenci extends GContentBase<UsedComponentsBalikyLicenci> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * UserParamAzure - Řízení specifického přístupu k ADT07 pro členy týmu Azure
         * @type {string}
         */
        private UserParamAzure;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * Identifikator saaas Celkem pro licenci Ultimate
         */
        private saaasCelkemUltimate;
        /**
         * Pole vybranych radku z gridu pro Obsah baliku licenci
         */
        private obsahBalLicVyberRadku;
        /**
         * Pole vybranych radku z gridu pro Zodpovednost za balik licenci
         */
        private zodpovednostVyberRadku;
        private vybraneBaliky;
        private vyberRadkuExport;
        private pausalniSluzbyExport;
        /**
        * Dto pro detailBuilder
        */
        private GGdeslipDto?;
        /**
        * Dto pro detailBuilder
        */
        private readonly GCheckMaintenanceUltimateDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Obsah baliku licenci v detailu ulohy Baliky licenci v registru licenci
        */
        private viewObsahBalikuLicenci;
        /**
        * isl view gridu Zodpovednost za balik licenci
        */
        private viewZodpovednostZaBalikLicenci;
        /**
        * isl view gridu Licence rad
        */
        private viewLicenceRadPID;
        /**
        * isl view gridu Pausalni sluzby
        */
        private viewPausalniSluzby;
        /**
        * isl view gridu Sluzby licencni smlouvy
        */
        private viewSluzbyLicencniSmlouvy;
        /**
        * isl view gridu Maintenance Ultimate
        */
        private viewMaintenanceUltimate;
        /**
        * isl view gridu SaaS Ultimate mesicni
        */
        private viewSaaSUltimateMesicni;
        /**
        * isl view gridu SaaS
        */
        private viewSaaS;
        /**
        * isl view gridu SaaS Ultimate rocni
        */
        private viewSaaSUltimateRocni;
        /**
        * isl view gridu Prodej
        */
        private viewProdej;
        /**
        * isl view gridu Licencni certifikaty
        */
        private viewLicencniCertifikaty;
        /**
        * isl view gridu Historie zmen
        */
        private viewHistorieZmen;
        /**
        * isl view gridu pro Vyzadovane produkty
        */
        private viewVyzadovaneProdukty;
        /**
         * editMode
         */
        private editMode;
        /**
         * flashInfoCheckPol - kontrola platnosti radku licence
         */
        private flashInfoCheckPol;
        /**
         * Priznak SaaS
         */
        private saas;
        /**
         * Priznak exportu pro KOF
         */
        private export_kof;
        /**
         * Typ obchodniho modelu
         */
        private obchodniModel;
        /**
         * Perioda plateb obchodniho modelu SaaS
         */
        private periodaPlateb;
        /**
         * Příznak ukládání dat
         */
        private ukladaniDat;
        /**
         *Příznak platby za cloud
         * @type {number | null | undefined}
         */
        private platbaCloud;
        /**
         *Hodnota zmeny periody plateb periodaPlatebSaaS
         * @type {number | null | undefined}
         */
        private periodaPlatebSaaS;
        /**
         *Hodnota zmeny periody plateb periodaPlatebSluzeb
         * @type {number | null | undefined}
         */
        private periodaPlatebSluzeb;
        /**
         * editMode
         */
        private enabledButton;
        /**
        * valErrField - dodatečná validace záložky s administraci zodpovědnosti za balík licencí
        */
        private valErrField;
        /**
        * alement tabGroups
        */
        private tabGroups;
        /**
        * grid Obsah Baliku Licenci
        */
        private gridObsahBalikuLicenci;
        /**
        * grid Primarni licence databazi
        */
        private gridZodpovednostZaBalikLicenci;
        /**
        * grid Licence rad
        */
        private gridLicenceRadPID;
        /**
        * grid Fyzicke databaze
        */
        private gridFyzickeDatabaze;
        /**
        * grid Pausalni sluzby
        */
        private gridPausalniSluzby;
        /**
        * grid Sluzby licencni smlouvy
        */
        private gridSluzbyLicencniSmlouvy;
        /**
        * grid Maintenance Ultimate
        */
        private gridMaintenanceUltimate;
        /**
        * grid SaaS Ultimate mesicni
        */
        private gridSaaSUltimateMesicni;
        /**
        * grid SaaS Ultimate rocni
        */
        private gridSaaSUltimateRocni;
        /**
        * grid SaaS
        */
        private gridSaaS;
        /**
        * grid Prodej
        */
        private gridProdej;
        /**
        * grid Licencni certifikaty
        */
        private gridLicencniCertyfikaty;
        /**
        * grid pro Vyzadovane produkty
        */
        private gridVyzadovaneProdukty;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * format gridu Pristupova prava
        */
        private gridFormatObsahBalikuLicenci;
        /**
        * format gridu Zodpovednost za balik licenci
        */
        private gridFormatZodpovednostZaBalikLicenci;
        /**
        * format gridu Licence rad
        */
        private gridFormatLicenceRadPID;
        /**
        * format gridu Fyzicke databaze
        */
        private gridFormatFyzickeDatabaze;
        /**
        * format gridu Pausalni sluzby
        */
        private gridFormatPausalniSluzby;
        /**
        * format gridu Sluzby licencni smlouvy
        */
        private gridFormatSluzbyLicencniSmlouvy;
        /**
        * format gridu Maintenance Ultimate
        */
        private gridFormatMaintenanceUltimate;
        /**
        * format gridu SaaS Ultimate mesicni
        */
        private gridFormatSaaSUltimateMesicni;
        /**
        * format gridu SaaS Ultimate rocni
        */
        private gridFormatSaaSUltimateRocni;
        /**
        * format gridu SaaS
        */
        private gridFormatSaaS;
        /**
        * format gridu Prodej
        */
        private gridFormatProdej;
        /**
        * format gridu Licencni certifikaty
        */
        private gridFormatLicencniCertifikaty;
        /**
        * format gridu Vyzadovane produkty
        */
        private gridFormatVyzadovaneProdukty;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * sloupce gridu Obsah baliku licenci
        */
        private columnsObsahBalikuLicenci;
        /**
        * sloupce gridu Zodpovednost za balik licenci
        */
        private columnsZodpovednostZaBalikLicenci;
        /**
        * sloupce gridu Období osvobození s polozkami
        */
        private columnsLicenceRadPID;
        /**
        * sloupce gridu Fyzicke databaze
        */
        private columnsFyzickeDatabaze;
        /**
        * sloupce gridu Maintenance ultimate
        */
        private columnsMaintenanceUltimate;
        /**
        * sloupce gridu Prodej
        */
        private columnsProdej;
        /**
        * sloupce gridu SaaS
        */
        private columnsSaaS;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Obsah Baliku Licenci
        */
        private createGridFormatObsahBalikuLicenci;
        /**
        * vytvořit formát sloupců seznamu Zodpovednost za balik licenci
        */
        private createGridFormatZodpovednostZaBalikLicenci;
        /**
        * vytvořit formát sloupců seznamu Licence rad
        */
        private createGridFormatLicenceRadPID;
        /**
        * vytvořit formát sloupců seznamu Fyzicke databaze
        */
        private createGridFormatFyzickeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Pausalni sluzby
        */
        private createGridFormatPausalniSluzby;
        /**
        * vytvořit formát sloupců seznamu Pausalni sluzby
        */
        private createGridFormatSluzbyLicencniSmlouvy;
        /**
        * vytvořit formát sloupců seznamu Maintenance ultimate
        */
        private createGridFormatMaintenanceUltimate;
        /**
        * vytvořit formát sloupců seznamu SaaS Ultimate mesicni
        */
        private createGridFormatSaaSUltimateMesicni;
        /**
        * vytvořit formát sloupců seznamu SaaS
        */
        private createGridFormatSaaS;
        /**
        * vytvořit formát sloupců seznamu SaaS Ultimate rocni
        */
        private createGridFormatSaaSUltimateRocni;
        /**
        * vytvořit formát sloupců seznamu Prodej
        */
        private createGridFormatProdej;
        /**
        * vytvořit formát sloupců seznamu Historie zmen
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců seznamu Licencni certifikaty
        */
        private createGridFormatLicencniCertifikaty;
        /**
        * otevřít seznam Komentare k licenci (na zalozce Obsah baliku licenci)
        */
        private openSeznamKomentareKLicenci;
        /**
        * otevřít seznam Obdobi nehrazeni licencnich poplatku (na zalozce Obsah baliku licenci)
        */
        private openSeznamObdNehrLicPopl;
        /**
        * otevřít seznam Historie obsahu baliku licenci (na zalozce Obsah baliku licenci)
        */
        private openDetailHistObsahBalLic;
        /**
         * otevřít detail seznamu Obsah baliku licenci
         */
        private openDetailObsahBalLic;
        /**
         * otevřít detail pro Import obsahu baliku licenci
         */
        private openDetailImportObsahBalLic;
        /**
         * otevřít detail pro Import obsahu Pausalnich sluzeb
         */
        private openDetailImportPausalniSluzby;
        /**
         * otevřít detail seznamu Zodpovednost za balik licenci
         */
        private openDetailZodpovednostZaBalLic;
        /**
        * otevřít seznam Historie Zodpovednosti za balik licenci (na zalozce Zodpovednost za balik licenci)
        */
        private openDetailHistZodpovednostZaBalLic;
        /**
         * otevřít detail seznamu Licence rad
         */
        private openDetailBalLicLicenceRadPID;
        /**
        * otevřít seznam Historie Licence rad pro balik licenci (na zalozce Zodpovednost za balik licenci)
        */
        private openDetailHistBalLicLicRadPID;
        /**
         * otevřít detail seznamu Pausalni sluzby
         */
        private openDetailPausalniSluzby;
        /**
         * otevřít detail seznamu Sluzby z licencni smlouvy
         */
        private openDetailSluzbyLicencniSmlouvy;
        /**
         * otevřít detail Exportu KOF
         */
        private openDetailExportKOF;
        private openDetailLicencniCertifikat;
        private mohuOtevritTiskCert;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * vyčistit cache
         */
        private clearCache;
        /**
         * onDetailBuilderInit
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu baliku licenci pro hromadnou editaci */
    class DetailEditBalikyLicenci extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Obecne udaje
         */
        private GtabFormObecneUdaje;
        /**
         * element gtabu pro form - Zodpovedna funkce - Přidat
         */
        private GtabFormZodpovednaFunkce;
        /**
         * element gtabu pro form - Zodpovedna funkce - Odebrat
         */
        private GtabFormZodpovednaFunkceOdebrat;
        /**
         * element gtabu pro form - Licence řad PID
         */
        private GtabFormLicRadPID;
        /**
         * element gtabu pro grid s Vyberem baliku licenci
         */
        private gridGtabVybraneBaliky;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element formu s obecnymi udaji
        */
        private formObecneUdaje;
        /**
        * element formu se zodpovednosti za baliky licenci - Pridat
        */
        private formZodpovednaFunkce;
        /**
        * element formu se zodpovednosti za baliky licenci - Odebrat
        */
        private formZodpovednaFunkceOdebrat;
        /**
        * element formu s Licencema rad PID
        */
        private formLicenceRadPID;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybraneBaliky;
        private formUserSettings;
        private allRowsInfo;
        private vyberBaliku;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvoři gtab pro form se Zodpovednou funkci
         */
        private createGTabZodpovednaFunkce;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormZodpovednaFunkce;
        /**
         * vytvoři gtab pro form odebrani zodpovedne funkce
         */
        private createGTabZodpovednaFunkceOdebrat;
        /**
         * vytvořit form Zodpovedna funkce - odebrat pro gtab
         */
        private createGTabFormZodpovednaFunkceOdebrat;
        /**
         * vytvoři gtab pro form s Licenci rady PID
         */
        private createGTabLicRadPID;
        /**
         * vytvořit form Licence rad PID pro gtab
         */
        private createGTabFormLicRadPID;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem baliku licenci
         */
        private createGTabBalikyLicenci;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro export do KOF */
    class DetailExportKOF extends GContentBase {
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRows;
        /**
         * data z baliku licenci
         */
        private dataValues;
        /**
         * distributor
         * @type {any}
         */
        private distributor;
        /**
         * obchodnik
         * @type {any}
         */
        private obchodnik;
        /**
         * var
         * @type {any}
         */
        private var;
        /**
         * var
         * @type {any}
         */
        private zak;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * nastavit data do formulare
         */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie baliku licenci  */
    class DetailHistorieBalikyLicenci extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private vybraneBaliky;
        private vyberBaliku;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií balíků
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro import baliku licenci */
    class DetailImportBalLic extends GContentBase {
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * nazev baliku licenci
         */
        private nazev;
        /**
         * Podpoložka jádra baliku licenci
         */
        private ppolJadro;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
        * element gtabu
        */
        private gtab;
        private msg;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * zavreni okna
         */
        private closeDialog;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro grid s Historií obsahu balíků
         */
        private createGTab;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro import obsahu baliku licenci */
    class DetailImportObsahBalLic extends GContentBase {
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * nazev baliku licenci
         */
        private nazev;
        /**
         * Podpoložka jádra baliku licenci
         */
        private ppolJadro;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
        * element gtabu
        */
        private gtab;
        private msg;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * zavreni okna
         */
        private closeDialog;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        private callToImport;
        /**
         * vytvoři gtab pro grid s Historií obsahu balíků
         */
        private createGTab;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro import pausalnich sluzeb */
    class DetailImportPausalniSluzby extends GContentBase {
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * nazev baliku licenci
         */
        private nazev;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * zavreni okna
         */
        private closeDialog;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro grid s Historií obsahu balíků
         */
        private createGTab;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad */
    class DetailKomentareKLicenci extends GContentBase {
        /**
         * licence
         */
        private ixs_lip;
        /**
         * radek
         */
        private radek_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * rowCount - priznak existujicich radku komentaru
         */
        private rowCount;
        /**
        * pole s radky baliku licenci
        */
        radky: any[];
        /**
         * poradi - poradi komentare
         */
        private poradi;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Komentaru k licenci  */
    class DetailKomentareKLicenciHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator radku v baliku licenci
         */
        private radek_lip;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad PID */
    class DetailLicencniCertifikat extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNovyBalikLicenci extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Obdobi nehrazeni licencnich poplatku */
    class DetailObdNehrLicPopl extends GContentBase {
        /**
         * Identifikátor Baliku licenci
         */
        private ixs_lip;
        /**
         * Identifikátor radku baliku licenci
         */
        private radek_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s existujicimi radky baliku licenci
        */
        radky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Obdobi nehrazeni lic. poplatku  */
    class DetailObdNehrLicPoplHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator radku v baliku licenci
         */
        private radek_lip;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Obsahu baliku licenci */
    class DetailObsahBalLic extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Příznak ukládání dat
         */
        private dataRef;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele k licencnim poplatkum
         */
        private UserParamLicPop;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Cena ceníkové položky
         */
        private pol_ppol_c;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        private aktualni_pol;
        private aktualni_ppol;
        private pocet_lic_actual;
        private pocet_lic_single;
        private pocet_lic_multi;
        private pocet_licenci_ultimate;
        /**
         * Identifikator prvniho radku do obsahu baliku licenci
         */
        private firstRow;
        /**
         * Identifikator dosazeni porizovaci ceny pri inicializaci detailu k editaci
         */
        private porizovaci_cena_initial;
        /**
         * Identifikator dosazeni pol pri inicializaci detailu k editaci
         */
        private pol_initial;
        /**
         * Priznak multilicence
         */
        private priznak_multilicence;
        /**
         * Identifikator inicializacce detailu
         */
        private initialOpenDetail;
        /**
         * Identifikator dosazeni ppol pri inicializaci detailu k editaci
         */
        private ppol_initial;
        /**
         * Identifikator dosazeni ceny maintenance pri inicializaci detailu k editaci
         */
        private maintenance_cena_initial;
        /**
         * polozka jadra
         */
        private pol_jadro;
        /**
         * podpolozka jadra
         */
        private ppol_jadro;
        /**
         * Počet licencí ve formuláři
         */
        private pocet_licenci;
        /**
         * Cena licence
         */
        private cena_licence;
        /**
         * Identifikator ceniku
         */
        private ixp_ccm;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * rowPocetLicenciVisible
         * @type {boolean}
         * @default true
         */
        private rowPocetLicenciVisible;
        /**
         * rowPocetLicenciUltimateVisible
         * @type {boolean}
         * @default true
         */
        private rowPocetLicenciUltimateVisible;
        /**
         * editMode - priznak pro rezim editace
         */
        private edit;
        private vybraneRadky;
        private formObsahBalLicUserSettings;
        private vyberCislaRadku;
        /**
         * priznak k editaci vice radku
         */
        private multiEdit;
        /**
         * priznak k editaci vice radku jedne licence
         */
        private multiEditPPol;
        /**
         * pol - vybrana cenikova polozka
         */
        private pol;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
         * ultimate - priznak licence ultimate
         */
        private ultimate;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * element gridu s Vyberem radku obsahubaliku licenci
         */
        private grid;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
        * element gtabu s obecnymi udaji o radcich
        */
        private gtabObecneUdaje;
        /**
        * element gtabu s udaji o priznaku pecialni ceny
        */
        private gtabPriznakSpecCeny;
        /**
        * element gtabu s udaji o priznaku pecialni vyse maintenance
        */
        private gtabPriznakSpecMaintenance;
        /**
         * element formulare s obecnymi udaji
         */
        private formObecneUdaje;
        /**
         * element formulare pro priznak specialni ceny
         */
        private formPriznakSpecCeny;
        /**
         * element formulare pro priznak specialni vyse maintenance
         */
        private formPriznakSpecMaintenance;
        /**
         * radek_lip - aktualni radek
         */
        private radek_lip;
        /**
         * prod_rada - řada produktů balíku licencí
         */
        private prod_rada;
        private allRowsInfo;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * nastavit titulek dialogu pro multi edit režim
         */
        private setMultiEditTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyčistit cache
         */
        private clearCache;
        /**
         * vyvvořit menu buttons pro multi edit rezim
         */
        private createMultiEditMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar pro multi edit rezim
         */
        private createMultiEditMenuBar;
        /**
         * vytvořit commandbar pro multi edit rezim
         */
        private createMultiEditCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvoři gtab pro grid s vyberem radku obsahu baliku licenci
         */
        private createGTabRadkyBaliku;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie obsahu baliku licenci  */
    class DetailObsahBalLicHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private vybraneRadky;
        private vyberRadku;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií obsahu balíků
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Maximalizovaneho okna Obsahu baliku licenci */
    class DetailObsahBalLicMax extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
        * Dto pro detailBuilder
        */
        private GGdeslipDto?;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele k licencnim poplatkum
         */
        private UserParamLicPop;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * licence
         */
        private ixs_lip;
        /**
         * Vztah funkce ke skupine databazi
         */
        private typ_vdb;
        /**
        * isl view gridu pro Seznam Obsah baliku licenci v detailu ulohy Baliky licenci v registru licenci
        */
        private viewObsahBalikuLicenci;
        /**
         * flashInfoCheckPol - kontrola platnosti radku licence
         */
        private flashInfoCheckPol;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gtabu
        */
        private ultimate;
        private gridGtab;
        private gridFormat;
        /**
        * sloupce gridu Obsah baliku licenci
        */
        private columnsObsahBalikuLicenci;
        /**
         * editMode
         */
        private editMode;
        /**
         * Pole vybranych radku z gridu pro Obsah baliku licenci
         */
        private obsahBalLicVyberRadku;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Obsahem baliku licenci
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
        * otevřít seznam Komentare k licenci (na zalozce Obsah baliku licenci)
        */
        private openSeznamKomentareKLicenci;
        /**
        * otevřít seznam Obdobi nehrazeni licencnich poplatku (na zalozce Obsah baliku licenci)
        */
        private openSeznamObdNehrLicPopl;
        /**
         * otevřít detail seznamu Obsah baliku licenci
         */
        private openDetailObsahBalLic;
        /**
        * otevřít seznam Historie obsahu baliku licenci (na zalozce Obsah baliku licenci)
        */
        private openDetailHistObsahBalLic;
        /**
         * vyvvořit gtab buttons
         */
        private createGTabButtons;
        /**
         * vyvvořit komentare button
         */
        private komentareButton;
        /**
         * vyvvořit obdobiNehrazeni button
         */
        private obdobiNehrazeniButton;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Pausalnich sluzeb */
    class DetailPausalniSluzby extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele k licencnim poplatkum
         */
        private UserParamLicPop;
        /**
         * zmenaPopis
         * @type {string}
         */
        private zmenaPopis;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        private vyberCislaRadku;
        /**
         * radek_lis - aktualni radek
         */
        private radek_lis;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Maximalizovaneho okna Obsahu baliku licenci */
    class DetailPausalniSluzbyMax extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private pausalniSluzbyExport;
        /**
         * licence
         */
        private ixs_lip;
        /**
         * DTO s informacemi o baliku licenci
         */
        private GGdeslipDto;
        /**
         * Název balíku licencí
         */
        private nazev_baliku;
        /**
         * ICO pro fakturaci
         */
        private ico_fakt;
        /**
         * Hodnota Zak
         */
        private zak;
        /**
         * Název organizace pro fakturaci
         */
        private ico_fakt_nazev;
        /**
        * isl view gridu pro Seznam Obsah baliku licenci v detailu ulohy Baliky licenci v registru licenci
        */
        private viewPausalniSluzby;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * Identifikátor plateb za cloud
        */
        private platbaCloud;
        /**
        * Zodpovednost za balik licenci
        */
        private zodpovednost;
        private gridGtab;
        private gridFormat;
        /**
         * editMode
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Obsahem baliku licenci
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * otevřít detail seznamu Pausalni sluzby
         */
        private openDetailPausalniSluzby;
        /**
         * otevřít detail pro Import obsahu Pausalnich sluzeb
         */
        private openDetailImportPausalniSluzby;
        /**
         * otevřít detail Exportu KOF
         */
        private openDetailExportKOF;
        /**
         * vyvvořit gtab buttons
         */
        private createGTabButtons;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Pausalnich sluzeb */
    class DetailSluzbyLicencniSmlouvy extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele k licencnim poplatkum
         */
        private UserParamLicPop;
        /**
         * zmenaPopis
         * @type {string}
         */
        private zmenaPopis;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        private vyberCislaRadku;
        /**
         * radek_lis - aktualni radek
         */
        private radek_lis;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Zodpovednost za balik licenci */
    class DetailZodpovednostZaBalLic extends GContentBase {
        /**
         * Identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie zodpovednosti za balik licenci  */
    class DetailZodpovednostZaBalLicHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator baliku licenci
         */
        private ixs_lip;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeIcoAdm = Gordic.Adt.Interface.GGdesicaDto;
    type UsedComponentsIcoAdm = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeIcoAdm>;
    /** Dialog detailu ulohy ICO pro administraci (poduloha Registru licenci)*/
    class DetailIcoAdm extends GContentBase<UsedComponentsIcoAdm> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * ICO pro administraci
         */
        private ico_adm;
        /**
         * ixs_fun prihlaseneho uzovatele
         */
        private IxsFun;
        /**
        * Dto pro detailBuilder
        */
        private GGdesicaDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
        * isl view gridu pro Seznam balíků licencí
        */
        private viewLicRadPID;
        /**
        * isl view gridu Historie zmen
        */
        private viewHistorieZmen;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Licence rad PID
        */
        private gridLicRadPID;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * format gridu Seznam baliku licenci
        */
        private gridFormatLicRadPID;
        /**
        * format gridu Histori zmen
        */
        private gridFormatHistorieZmen;
        /**
        * sloupce gridu Historie zmen
        */
        private columnsHistorieZmen;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Licence rad PID
        */
        private createGridFormatLicRadPID;
        /**
        * vytvořit formát sloupců seznamu Historie zaznamu
        */
        private createGridFormatHistorieZmen;
        private openDetailLicRadPID;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeIcoFakt = Gordic.Adt.Interface.GGdesicfDto;
    type UsedComponentsIcoFakt = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeIcoFakt>;
    /** Dialog detailu ulohy ICO pro fakturaci (poduloha Registru licenci)*/
    class DetailIcoFakt extends GContentBase<UsedComponentsIcoFakt> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * ICO pro fakturaci
         */
        private ico_fakt;
        /**
         * ixs_fun prihlaseneho uzovatele
         */
        private IxsFun;
        /**
        * Dto pro detailBuilder
        */
        private GGdesicfDto?;
        /**
         * aktivita
         */
        private aktivita;
        /**
        * isl view gridu pro Seznam balíků licencí
        */
        private viewSeznamBalikuLicenci;
        /**
        * isl view gridu Historie zmen
        */
        private viewHistorieZmen;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Seznam Baliku Licenci
        */
        private gridSeznamBalikuLicenci;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * format gridu Seznam baliku licenci
        */
        private gridFormatSeznamBalikuLicenci;
        /**
        * format gridu Histori zmen
        */
        private gridFormatHistorieZmen;
        /**
        * sloupce gridu Seznam baliku licenci
        */
        private columnsSeznamBalikuLicenci;
        /**
        * sloupce gridu Historie zmen
        */
        private columnsHistorieZmen;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Seznam Baliku Licenci
        */
        private createGridFormatSeznamBalikuLicenci;
        /**
        * vytvořit formát sloupců seznamu Historie zaznamu
        */
        private createGridFormatHistorieZmen;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNoveIcoAdm extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu noveho baliku licenci */
    class DetailNoveIcoFakt extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    class DetailCompLicDB extends GContentBase {
        /**
         *  Pole řádků s licencemi DB
         */
        private licField;
        /**
         * compareRows
         * @type {any}
         */
        private compareRows;
        /**
         * isComparisonInited - Příznak započatého porovnávání
         * @type {boolean}
         */
        private isComparisonInited;
        /**
         * element comparatoru
         */
        private comparator;
        /**
         * counterLic
         * @type {number}
         * @default 0
         */
        private counterLic;
        /**
         * Badge element pro zobrazení počtu porovnávaných záznamů
         */
        private comparisonBadge;
        onContentReady(): void;
        /**
        * Vytvoreni definice formulare
        * @returns {Forms.Form} Form
        */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        private nactiCompData;
        /**
         * showComparison - Funkce pro zobrazení/přidání do porovnávače
         *
         * @param {any} metaRows
         */
        private showComparison;
        /**
        * createComparisonFormat - Vytvori format sloupcu porovnavace
        */
        private createComparisonFormat;
        /**
         * otevřít detail ulohy Licence databaze
         */
        private openDetail;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu obdobi vyjimky od licencnich poplatku */
    class DetailGarantDB extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * data z gridu Garanti provozni databaze
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Primarnich licenci  */
    class DetailHistLicenceDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií skupin DB
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Vstupní parametry dialogu DetailKontrolaLicenceDatabaze.
    *
    * @author  VBlabla
    * @date    14.12.2022
    */
    interface DetailKontrolaLicenceDatabaze {
        /**
         * Identifikator licence databaze
         * @type {string}
         */
        lic_fyz?: string;
        /**
         * vgdeslok_exist
         * @type {number}
         */
        vgdeslok_exist: number;
        /**
         * gdesdbo_exist
         * @type {number}
         */
        gdesdbo_exist: number;
        /**
         * pid_exist
         * @type {number}
         */
        pid_exist: number;
        /**
         * pid_typ_impl_exist
         * @type {number}
         */
        pid_typ_impl_exist: number;
        /**
         * ico_adm_pid_exist
         * @type {number}
         */
        ico_adm_pid_exist: number;
        /**
         * ixs_lip_exist
         * @type {number}
         */
        ixs_lip_exist: number;
        /**
         * dat_od
         * @type {number}
         */
        dat_od: any;
        /**
         * dat_do
         * @type {number}
         */
        dat_do: any;
    }
    class DetailKontrolaLicenceDatabaze extends GContentBase {
        onContentReady(): void;
        /**
         * Vytvoreni definice formulare
         * @returns {Forms.Form} Form
         */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeLicenceDatabaze = Gordic.Adt.Interface.GGdespdbDTO;
    type UsedComponentsLicenceDatabaze = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeLicenceDatabaze>;
    /** Dialog detailu ulohy Primarni licence databazi (poduloha Registru licenci)*/
    class DetailLicenceDatabaze extends GContentBase<UsedComponentsLicenceDatabaze> implements IGContent {
        /**
         * revMaxDatZmenaMax - Nejvyšší datum změny sady zákaznických revizí
         * @type {string}
         */
        private revMaxDatZmenaMax;
        /**
         * TitlerevMaxDatZmenaMax - Titulek nejvyšší datum změny sady zákaznických revizí
         * @type {string}
         */
        private titleRevMaxDatZmenaMax;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * kultura
         */
        private kultura;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * licence
         */
        private lic_fyz;
        /**
         * Vazba ICO administrace na licenci rady PID k licenci databaze
         */
        private ico_adm_pid_exist;
        /**
        * Dto pro detailBuilder
        */
        private GGdespdbDTO?;
        /**
        * element filterPanelu produktů
        */
        private filterProdukty;
        /**
         *  filtr na modulove faze
         */
        private Moduly;
        /**
         * identifikator uploadovaneho souboru
         */
        private fileImportRevMax;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Statistiky databáze
        */
        private viewStatistikaDB;
        /**
        * isl view gridu pro Seznam Garantu provozni databaze
        */
        private viewGarantiDB;
        /**
        * isl view gridu pro Seznam revizi v detailu registru revizí
        */
        private viewSeznamLicenci;
        /**
        * isl view gridu pro Seznam produktu
        */
        private viewProdukty;
        /**
        * isl view gridu pro Seznam Skupiny DB
        */
        private viewSkupinyDB;
        /**
        * isl view gridu pro seznam Licence rad
        */
        private viewLicenceRadPID;
        /**
        * isl view gridu pro seznam Povolene verze databaze
        */
        private viewPovoleneVerzeDatabaze;
        /**
        * isl view gridu pro Historii zmen
        */
        private viewHistorieZmen;
        /**
        * isl view gridu pro Dalsi soubory
        */
        private viewDalsiSoubory;
        /**
        * isl view gridu pro Licencni certifikaty
        */
        private viewLicencniCertifikaty;
        /**
        * isl view gridu pro obdobi bez lic. poplatku
        */
        private viewObdobiBezLicPoplatku;
        /**
        * isl view gridu pro polozky bez lic. poplatku
        */
        private viewPolBezLicPoplatku;
        /**
        * isl view gridu pro Fakturaci na jine ICO
        */
        private viewFakturace;
        /**
        * isl view gridu pro Vyzadovane produkty
        */
        private viewVyzadovaneProdukty;
        /**
        * isl view gridu pro Pouzivane revize
        */
        private viewPouzivaneRevize;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid - Statistika provozni databaze
        */
        private gridStatistikaDB;
        /**
        * grid - Garanti provozni databaze
        */
        private gridGarantiDB;
        /**
        * grid - Produkty
        */
        private gridProdukty;
        /**
        * grid Seznam licenci
        */
        private gridSeznamLicenci;
        /**
        * grid Skupiny databazi
        */
        private gridSkupinyDB;
        /**
        * grid Licence rad
        */
        private gridLicenceRadPID;
        /**
        * grid Fyzicke databaze
        */
        private gridFyzickeDB;
        /**
        * grid Povolene verze databaze
        */
        private gridPovoleneVerzeDatabaze;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * grid Dalsi soubory
        */
        private gridDalsiSoubory;
        /**
        * grid licencni certifikaty
        */
        private gridLicencniCertyfikaty;
        /**
        * grid obdobi bez lic. poplatku
        */
        private gridObdobiBezLicPoplatku;
        /**
        * grid polozky bez lic. poplatku
        */
        private gridPolBezLicPoplatku;
        /**
        * grid pro fakturaci na jine ICO
        */
        private gridFakturace;
        /**
        * grid pro Vyzadovane produkty
        */
        private gridVyzadovaneProdukty;
        /**
        * grid pro Pouzivane revize
        */
        private gridPouzivaneRevize;
        /**
        * format gridu statistika provozni databaze
        */
        private gridFormatStatistikaDB;
        /**
        * format gridu garanti provoznich databazi
        */
        private gridFormatGarantiDB;
        /**
        * format gridu seznam licenci
        */
        private gridFormatSeznamLicenci;
        /**
        * format gridu produkty
        */
        private gridFormatProdukty;
        /**
        * format gridu Skupiny databazi
        */
        private gridFormatSkupinyDB;
        /**
        * format gridu Licence rad
        */
        private gridFormatLicenceRadPID;
        /**
        * format gridu Fyzicke databaze
        */
        private gridFormatFyzickeDB;
        /**
        * format gridu Povolene verze databaze
        */
        private gridFormatPovoleneVerzeDatabaze;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * format gridu Dalsi soubory
        */
        private gridFormatDalsiSoubory;
        /**
        * format gridu Licencni certifikaty
        */
        private gridFormatLicencniCertifikaty;
        /**
        * format gridu obdobi bez lic poplatku
        */
        private gridFormatObdobiBezLicPoplatku;
        /**
        * format gridu polozky bez licencnich poplatku
        */
        private gridFormatPolBezLicPoplatku;
        /**
        * format gridu Fakturace na jine ICO
        */
        private gridFormatFakturace;
        /**
        * format gridu Vyzadovane produkty
        */
        private gridFormatVyzadovaneProdukty;
        /**
        * format gridu Pouzivane revize
        */
        private gridFormatPouzivaneRevize;
        /**
        * sloupce gridu seznam licenci
        */
        private columnsSeznamLicenci;
        /**
        * sloupce gridu Skupiny databazi
        */
        private columnsSkupinyDB;
        /**
        * sloupce gridu Licence rad
        */
        private columnsLicenceRadPID;
        /**
        * sloupce gridu Období bez licencnich poplatku
        */
        private columnsObdobiBezLicPoplatku;
        /**
        * sloupce gridu Polozky bez licencnich polatku
        */
        private columnsPolBezLicPoplatku;
        /**
        * sloupce gridu Fakturace na jine ICO
        */
        private columnsFakturace;
        /**
        * sloupce gridu produkty
        */
        private columnsProdukty;
        /**
        * sloupce gridu Fyzicke databaze
        */
        private columnsFyzickeDB;
        /**
         * errLic - Příznak existence chybné licence (kombinace Pol | PPol)
         * @type {boolean}
         * @default false
         */
        private errLic;
        /**
         *  maxSize - pro zjisteni pripustne velikosti souboru pro stazeni prohlizecem
         */
        private maxSize;
        /**
         * ixs_lip
         * @type {string}
         */
        private ixs_lip;
        /**
         * nazevBalLic
         * @type {string}
         */
        private nazevBalLic;
        /**
         * Příznak ukládání dat
         */
        private ukladaniDat;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců statistika databaze
        */
        private createGridFormatStatistikaDB;
        /**
        * vytvořit formát sloupců seznamu licenci
        */
        private createGridFormatGarantiDB;
        /**
        * vytvořit formát sloupců seznamu licenci
        */
        private createGridFormatSeznamLicenci;
        /**
        * vytvořit formát sloupců seznamu produktu
        */
        private createGridFormatProdukty;
        /**
         * vytvořit formulář filtru	produktů
         */
        private createFilterFormProdukty;
        /**
        * vytvořit formát sloupců seznamu Skupiny databazi
        */
        private createGridFormatSkupinyDB;
        /**
        * vytvořit formát sloupců seznamu Licence rad
        */
        private createGridFormatLicenceRadPID;
        /**
        * vytvořit formát sloupců seznamu Fyzicke databaze
        */
        private createGridFormatFyzickeDB;
        /**
        * vytvořit formát sloupců seznamu Povolene verze databaze
        */
        private createGridFormatPovoleneVerzeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Povolene verze databaze
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců seznamu Dalsi soubory
        */
        private createGridFormatDalsiSoubory;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
        * vytvořit formát sloupců seznamu Licencni certifikaty
        */
        private createGridFormatLicencniCertifikaty;
        /**
        * vytvořit formát sloupců obdobi osvobozeni
        */
        private createGridFormatObdobiBezLicPoplatku;
        /**
        * vytvořit formát sloupců polozky bez lic. poplatku
        */
        private createGridFormatPolBezLicPoplatku;
        /**
        * vytvořit formát sloupců obdobi osvobozeni s polozkami
        */
        private createGridFormatFakturace;
        /**
        * vytvořit formát sloupců Pouzivanych revizi
        */
        private createGridFormatPouzivaneRevize;
        /**
         * otevřít detail ulohy Skupiny databází
         */
        private openDetailSkupinyDatabazi;
        /**
         * otevřít detail seznamu Garant provozni databaze
         */
        private openDetailGarantDB;
        /**
         * otevřít detail seznamu Garant provozni databaze
         */
        private openDetailProdukt;
        /**
         * otevřít detail seznamu Používané revize
         */
        private openDetailPouzivanaRevize;
        /**
         * otevřít detail seznamu Skupiny databazi
         */
        private openDetailSkupinyDB;
        /**
         * otevřít detail seznamu Licence rad
         */
        private openDetailPrimLicLicenceRadPID;
        /**
         * otevřít detail seznamu Povolene verze databaze
         */
        private openDetailPovoleneVerzeDatabaze;
        /**
        * otevřít dialog odeslani souboru do FTPS uloziste
        */
        private openDetailMoveFileToStorage;
        /**
         * otevřít detail pro výběr balíku licencí generovaného licenčního certifikátu
         */
        private openDetailLicCertBalLic;
        /**
         * otevřít detail Obdobi Bez Lic Poplatku
         */
        private openDetailObdobiBezLicPoplatku;
        /**
         * otevřít detail Polozky Bez Lic Poplatku (Položky)
         */
        private openDetailPolBezLicPoplatku;
        /**
         * otevřít detail Fakturace
         */
        private openDetailFakturace;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
        * zjistit kulturu
        */
        private setKultura;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu nove Licence databaze */
    class DetailNovaLicDB extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Dialog seznamu vyzadovanych produktu
    */
    class DetailVyzadovaneProdukty extends GContentBase {
        /**
         * licence databáze
         */
        private lic;
        private potrebne;
        private rowsOpened;
        private doporucene;
        private platne;
        /**
         * název licence databáze / balíku licencí
         */
        private nazev;
        /**
         * podpoložka jádra
         */
        private ppol_jadro;
        /**
         * Identifikátor balíku licencí
         */
        private ixs_lip;
        /**
         * Identifikator vyzadovanych produktu
         */
        private ixs_vyz;
        /**
        * isl view gridu pro Seznam vyzadovanych produktu
        */
        private view;
        /**
        * element filterPanelu
        */
        private filter;
        private gridGtab;
        private gridFormat;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři gtab pro grid s Vyzadovanymi produkty
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit format sloupcu gridu
         */
        private createGridFormat;
        /**
         * vytvořit format sloupcu gridu s chybejicimi revizemi
         */
        private createGridFormatChybejiciRevize;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Licenci rad PID  */
    class DetailHistLicenceRadPID extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií skupin DB
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeLicenceRadyPID = Gordic.Adt.Interface.GGdesldbDto;
    type UsedComponentsLicenceRadyPID = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeLicenceRadyPID>;
    /** Dialog detailu ulohy Licence rady PID (poduloha Registru licenci)*/
    class DetailLicenceRadPID extends GContentBase<UsedComponentsLicenceRadyPID> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Určení správce skupiny DB (0 = NE / 1 = ANO)
         */
        private spravce_sk_db;
        /**
         * Identifikator uzivatele - ixs_fun
         */
        private IxsFun;
        /**
         * licence rady PID
         */
        private lic;
        /**
         * Primarni licence DB
         */
        private lic_fyz;
        /**
        * Dto pro detailBuilder
        */
        private GGdesldbDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Skupiny DB
        */
        private viewBalikyLicenci;
        /**
        * isl view gridu pro Seznam Typ implementace
        */
        private viewTypImplementace;
        /**
        * isl view gridu pro Seznam ICO pro administraci
        */
        private viewICOAdministrace;
        /**
        * isl view gridu pro Seznam Historie zmen
        */
        private viewHistorieZmen;
        /**
         * editMode
         */
        private editMode;
        /**
         * pole primarnich licenci DB pro prihlaseneho uzivatele
         */
        private primLicDB;
        /**
        * grid Baliky licenci
        */
        private gridBalikyLicenci;
        /**
        * grid Typ implementace
        */
        private gridTypImplementace;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * grid ICO pro administraci
        */
        private gridICOAdministrace;
        /**
        * format gridu Typ implementace
        */
        private gridFormatBalikyLicenci;
        /**
        * format gridu Licence rad
        */
        private gridFormatTypImplementace;
        /**
        * format gridu ICO pro administraci
        */
        private gridFormatICOAdministrace;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * sloupce gridu Baliky licenci
        */
        private columnsBalikyLicenci;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Baliky licenci
        */
        private createGridFormatBalikyLicenci;
        /**
        * vytvořit formát sloupců seznamu Typ implementace
        */
        private createGridFormatTypImplementace;
        /**
        * vytvořit formát sloupců seznamu ICO pro administraci
        */
        private createGridFormatICOAdministrace;
        /**
        * vytvořit formát sloupců seznamu ICO pro administraci
        */
        private createGridFormatHistorieZmen;
        /**
         * otevřít detail ulohy Baliky licenci
         */
        private openDetailBalikLicenci;
        private openDetailFormBalikyLicenci;
        private openDetailTypImplementace;
        private openDetailICOAdministrace;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * vyčistit cache
         */
        private clearCache;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad */
    class DetailLicenceRadPIDBalLic extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu ICO pro administraci - Licence rad */
    class DetailLicenceRadPIDICOAdm extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * licence rady PID
         */
        private lic;
        /**
         * Primarni licence DB
         */
        private lic_fyz;
        /**
         * Primarni licence DB
         */
        private lic_fyz_retVal;
        /**
         * ICO pro administraci
         */
        private ico_adm;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Typ implementace */
    class DetailLicenceRadPIDTypImp extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu nove licence rady PID */
    class DetailNovaLicRadPID extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * prod_rada - Identifikátor produkční řady
         * @type {number}
         * @default 1000
         */
        private prod_rada;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vyčistit cache
         */
        private clearCache;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog hromadných úprav revizí */
    class DetailBulkEditLic extends GContentBase {
        /**
         * editMode - priznak pro rezim editace
         */
        private technologicke;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private vybraneRadky;
        private formObsahBalLicUserSettings;
        private vyberCislaRadku;
        /**
         * priznak k editaci vice radku
         */
        private multiEdit;
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * element gridu s Vyberem radku obsahubaliku licenci
         */
        private grid;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
        * element gtabu s obecnymi udaji o radcich
        */
        private gtabObecneUdaje;
        /**
         * element formulare s obecnymi udaji
         */
        private formObecneUdaje;
        private allRowsInfo;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons pro multi edit rezim
         */
        private createMultiEditMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar pro multi edit rezim
         */
        private createMultiEditMenuBar;
        /**
         * vytvořit commandbar pro multi edit rezim
         */
        private createMultiEditCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvoři gtab pro grid s vyberem radku obsahu baliku licenci
         */
        private createGTabRadkyBaliku;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
 * vytvořit formát sloupců seznamu
 */
        private createGridFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro Marketingove licence */
    class DetailMarketingoveLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * data z gridu Obsah baliku licenci
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * editMode - priznak pro rezim editace
         */
        private technologicke;
        private rangeMin;
        private rangeMax;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Dialog seznamu doporucenych revizi
    */
    class DetailDoporuceneRevize extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * Identifikátor skupiny databáze
         */
        private ixs_sdb;
        /**
         * Interni identifikator osoby - ixsRef
         */
        private ixsRef;
        /**
         * modul init
         */
        private initialModul;
        /**
         * sestavy init
         */
        private initialSestavy;
        /**
         * help init
         */
        private initialHelp;
        /**
         * dokumentace init
         */
        private initialDokumentace;
        /**
         * betatest init
         */
        private initialBetatest;
        /**
        * pole s verzemi
        */
        verze: any[];
        /**
        * Hledaná programová fáze
        */
        faze: string;
        /**
        * isl view gridu pro Seznam doporucenych revizi
        */
        private view;
        /**
        * isl view gridu pro Seznam doporucenych revizi
        */
        private viewKontrolaDoporucenychRevizi;
        /**
        * hodnota typu implementace
        */
        tyi: any[];
        /**
        * hodnoty typu implementace
        */
        tyiField: any[];
        /**
        * hodnoty typu revize (S = sestavy, N = moduly, D = dokumentace, H = help, B = Betatest)
        */
        typRevize: any[];
        /**
        *  modul - urcuje vyber datoveho typu stahovaneho souboru (msi/zip)
        * */
        private modul;
        /**
        * element filterPanelu
        */
        private filter;
        private gridGtab;
        /**
         * gridchybejiciRevize
         * @type {JQuery<HTMLElement>}
         */
        private gridchybejiciRevize;
        private rowGridGtab;
        private columnsGridGtab;
        private gridFormat;
        private gridFormatChybejiciRevize;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * element seznamu
         */
        private gridDoporuceneRevize;
        private dataCheckedView;
        /**
         * formát sloupců gridu
         */
        private gridDoporuceneRevizeFormat;
        /**
        * verze_db
        */
        private verze_db;
        /**
        * sub_verze_db
        */
        private sub_verze_db;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři gtab pro grid s doporucenymi revizemi
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit format sloupcu gridu
         */
        private createGridFormat;
        /**
         * vytvořit format sloupcu gridu s chybejicimi revizemi
         */
        private createGridFormatChybejiciRevize;
        /**
        *  Funkce pro zjisteni typu revize
        */
        private prepareData;
        /**
         * openDetailMoveToStorage - otevřít dialog hromadného odeslani revozi do uloziste
         *
         * @param {number} formatRev // 0 = bez určení / 1 = 41*,42*,43* msi / 2 = 41*,42*,43* zip / 3 = pouze msi
         */
        private openDetailMoveToStorage;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu obdobi vyjimky od licencnich poplatku */
    class DetailFakturaceNaJineIco extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * newLic - priznak pro novou licenci
         */
        private newLic;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamLicenc;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog seznamu balíčku
     */
    class DetailGDZBaliky extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element filterpanelu
        */
        private filter;
        private gridGtab;
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
         * doporucne GDZ baliky
         */
        private doporucene;
        /**
         * typ gdt
         */
        private typ_gdt;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * vytvoři gtab pro grid s GDZ baliky
         */
        private createGTab;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * otevřít detail GDZ baliku
         */
        private openDetail;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu seznamu licencí */
    class DetailLicCertBalLic extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data
         */
        private dataRow;
        private enableAct;
        /**
         * ixs_lip
         * @type {string}
         */
        private ixs_lip;
        /**
         * enableCertAction
         * @type {boolean}
         * @default false
         */
        private enableCertAction;
        /**
         * nazevBalLic
         * @type {string}
         */
        private nazevBalLic;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        private mohuOtevritTiskCert;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu seznamu licencí */
    class DetailObdobiBezLicPoplatku extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
         * newLic - priznak pro novou licenci
         */
        private newLic;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamLicenc;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu obdobi vyjimky od licencnich poplatku */
    class DetailPolBezLicPoplatku extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * newLic - priznak pro novou licenci
         */
        private newLic;
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamLicenc;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi polozkami bez duplicit
        */
        cenikovePolozkyUnique: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypePrehledLicDB = Gordic.Adt.Interface.GVgdeslokDto;
    type UsedComponentsPrehledLicDB = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypePrehledLicDB>;
    /** Dialog detailu registru licencí */
    class DetailPrehledLicenciDatabaze extends GContentBase<UsedComponentsPrehledLicDB> implements IGContent {
        /**
         * licence
         */
        private lic;
        /**
         * ixs_lip
         * @type {string}
         */
        private ixs_lip;
        /**
         * nazevBalLic
         * @type {string}
         */
        private nazevBalLic;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         *  maxSize - pro zjisteni pripustne velikosti souboru pro stazeni prohlizecem
         */
        private maxSize;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam; /**

        /**
        * Dto pro detailBuilder
        */
        private readonly GVgdeslokDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
         * kultura
         */
        private kultura;
        /**
         * typ implementace
         */
        private typImplementace;
        /**
        * isl view gridu pro Seznam revizi v detailu registru revizí
        */
        private viewSeznamLicenci;
        /**
        * data pro grid seznam licenci
        */
        private gridDataSeznamLicenci;
        /**
        * isl view gridu pro obdobi osvobozeni v detailu registru revizí
        */
        private viewObdobiBezLicPoplatku;
        /**
        * isl view gridu pro obdobi osvobozeni s polozkami v detailu registru revzí
        */
        private viewPolBezLicPoplatku;
        /**
        * isl view gridu pro Fakturaci v detailu registru revzí
        */
        private viewFakturace;
        /**
        * isl view gridu pro doporucene revize
        */
        private viewDoporuceneRevize;
        /**
        * isl view gridu pro Dalsi soubory
        */
        private viewDalsiSoubory;
        /**
        * isl view gridu pro Licencni certifikaty
        */
        private viewLicencniCertifikaty;
        /**
        * grid licencni certifikaty
        */
        private gridLicencniCertyfikaty;
        /**
        * format gridu Licencni certifikaty
        */
        private gridFormatLicencniCertifikaty;
        /**
         * editMode
         */
        private editMode;
        /**
         * errLic - Příznak existence chybné licence (kombinace Pol | PPol)
         * @type {boolean}
         * @default false
         */
        private errLic;
        /**
        * buttonPanel se stavem licence
        */
        private gridSeznamLicenci;
        /**
        * grid obdobi osvobozeni
        */
        private gridObdobiBezLicPoplatku;
        /**
        * grid obdobi osvobozeni (polozky)
        */
        private gridPolBezLicPoplatku;
        /**
        * grid pro fakturaci
        */
        private gridFakturace;
        /**
        * grid pro doporucene revize
        */
        private gridDoporuceneRevize;
        /**
        * format gridu seznam licenci
        */
        private gridFormatSeznamLicenci;
        /**
        * format gridu obdobi bez lic poplatku
        */
        private gridFormatObdobiBezLicPoplatku;
        /**
        * format gridu polozky bez licencnich poplatku
        */
        private gridFormatPolBezLicPoplatku;
        /**
        * format gridu Fakturace
        */
        private gridFormatFakturace;
        /**
        * format gridu doprucene revize
        */
        private gridFormatDoporuceneRevize;
        /**
        * grid Dalsi soubory
        */
        private gridDalsiSoubory;
        /**
        * format gridu Dalsi soubory
        */
        private gridFormatDalsiSoubory;
        /**
        * sloupce gridu seznam licenci
        */
        private columnsSeznamLicenci;
        /**
        * sloupce gridu Období bez licencnich poplatku
        */
        private columnsObdobiBezLicPoplatku;
        /**
        * sloupce gridu Polozky bez licencnich polatku
        */
        private columnsPolBezLicPoplatku;
        /**
        * sloupce gridu Fakturace
        */
        private columnsFakturace;
        /**
        * sloupce gridu pro doporucene revize
        */
        private columnsDoporuceneRevize;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Dalsi soubory
        */
        private createGridFormatDalsiSoubory;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
        * vytvořit formát sloupců seznamu licenci
        */
        private createGridFormatSeznamLicenci;
        /**
        * vytvořit formát sloupců obdobi osvobozeni
        */
        private createGridFormatObdobiBezLicPoplatku;
        /**
        * vytvořit formát sloupců obdobi osvobozeni s polozkami
        */
        private createGridFormatPolBezLicPoplatku;
        /**
        * vytvořit formát sloupců obdobi osvobozeni s polozkami
        */
        private createGridFormatFakturace;
        /**
        * vytvořit formát sloupců obdobi osvobozeni s polozkami
        */
        private createGridFormatDoporuceneRevize;
        /**
        * vytvořit formát sloupců seznamu Licencni certifikaty
        */
        private createGridFormatLicencniCertifikaty;
        /**
        * otevřít dialog odeslani souboru do FTPS uloziste
        */
        private openDetailMoveFileToStorage;
        /**
         * otevřít detail Obdobi Bez Lic Poplatku
         */
        private openDetailObdobiBezLicPoplatku;
        /**
         * otevřít detail Polozky Bez Lic Poplatku (Položky)
         */
        private openDetailPolBezLicPoplatku;
        /**
         * otevřít detail Fakturace
         */
        private openDetailFakturacePoplatku;
        private onlyUnique;
        /**
         * otevřít detail pro výběr balíku licencí generovaného licenčního certifikátu
         */
        private openDetailLicCertBalLic;
        /**
        * zjistit kulturu
        */
        private setKultura;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
        * zjistit stav implementace
        */
        private setTypImplementace;
        /**
         * vytvoři filtrPanel pro seznam doporučených revizí
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form pro seznam doporucenych revizi
         */
        private createFilterForm;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu baliku licenci pro hromadnou editaci */
    class DetailRevizeOdeslaniNaFTP extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  format: 0 = bez určení / 1 = 41*,42*,43* msi / 2 = 41*,42*,43* zip / 3 = pouze msi
         */
        private format;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro grid s Vyberem revizi
         */
        private gridGtabVybraneRevize;
        /**
        * element gtabu
        */
        private gtab;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private ixsRef;
        /**
         *  licence databaze
         */
        private lic;
        private vybraneRevize;
        private vybraneRevizeRegistrRevizi;
        private vyberRevizi;
        /**
        *  modul - urcuje vyber datoveho typu stahovaneho souboru (msi/zip)
        * */
        private modul;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem baliku licenci
         */
        private createGTabRevize;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog hromadne editace produktu  */
    class DetailEditProdukty extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private vybraneProdukty;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Obecne udaje
         */
        private GtabFormObecneUdaje;
        /**
         * element gtabu pro grid s Vyberem baliku licenci
         */
        private gridGtabVybraneProdukty;
        /**
        * element formu s obecnymi udaji
        */
        private formObecneUdaje;
        /**
        * element gtabu
        */
        private gtab;
        /**
         *  NaposledPouzite - Příznak naposledy pouzitych poli na formulari
         */
        private naposledPouzite;
        private formUserSettings;
        private allRowsInfo;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form s obecnymi udaji
         */
        private createGTabObecneUdaje;
        /**
         * vytvořit form Obecne udaje pro gtab
         */
        private createGTabFormObecneUdaje;
        /**
         * vytvoři gtab pro grid s vyberem produktu
         */
        private createGTabProdukty;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Skupiny databazi */
    class DetailFyzDBSkupinyDB extends GContentBase {
        /**
         * identifikátor ID Instance databaze
         */
        private db_guid;
        /**
         * data z gridu Fyzicke databaze
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data do formulaře
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Fyzicke databaze */
    class DetailFyzickeDB extends GContentBase {
        /**
         * licence
         */
        private lic_fyz;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Primarnich licenci  */
    class DetailHistPrimarniLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií skupin DB
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad */
    class DetailLicRadBalLic extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu nove Primarni licence */
    class DetailNovaPrimLic extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad */
    class DetailPrimLicLicenceRadPID extends GContentBase {
        /**
         * licence
         */
        private lic_fyz;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Povolene verze databaze */
    class DetailPrimLicPovoleneVerzeDB extends GContentBase {
        /**
         * identifikator primarni licence
         */
        private lic_fyz;
        /**
         * data z gridu Povolene verze databaze
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypePrimarniLicenceDB = Gordic.Adt.Interface.GGdespdbDto;
    type UsedComponentsPrimarniLicenceDB = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypePrimarniLicenceDB>;
    /** Dialog detailu ulohy Primarni licence databazi (poduloha Registru licenci)*/
    class DetailPrimarniLicence extends GContentBase<UsedComponentsPrimarniLicenceDB> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * licence
         */
        private lic_fyz;
        /**
        * Dto pro detailBuilder
        */
        private GGdespdbDto?;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
        * isl view gridu pro Seznam Skupiny DB
        */
        private viewSkupinyDB;
        /**
        * isl view gridu pro seznam Licence rad
        */
        private viewLicenceRadPID;
        /**
        * isl view gridu pro seznam Povolene verze databaze
        */
        private viewPovoleneVerzeDatabaze;
        /**
        * isl view gridu pro Historii zmen
        */
        private viewHistorieZmen;
        /**
        * isl view gridu pro Dalsi soubory
        */
        private viewDalsiSoubory;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Skupiny databazi
        */
        private gridSkupinyDB;
        /**
        * grid Licence rad
        */
        private gridLicenceRadPID;
        /**
        * grid Fyzicke databaze
        */
        private gridFyzickeDB;
        /**
        * grid Povolene verze databaze
        */
        private gridPovoleneVerzeDatabaze;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * grid Dalsi soubory
        */
        private gridDalsiSoubory;
        /**
        * format gridu Skupiny databazi
        */
        private gridFormatSkupinyDB;
        /**
        * format gridu Licence rad
        */
        private gridFormatLicenceRadPID;
        /**
        * format gridu Fyzicke databaze
        */
        private gridFormatFyzickeDB;
        /**
        * format gridu Povolene verze databaze
        */
        private gridFormatPovoleneVerzeDatabaze;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * format gridu Dalsi soubory
        */
        private gridFormatDalsiSoubory;
        /**
        * sloupce gridu Skupiny databazi
        */
        private columnsSkupinyDB;
        /**
        * sloupce gridu Licence rad
        */
        private columnsLicenceRadPID;
        /**
        * sloupce gridu Fyzicke databaze
        */
        private columnsFyzickeDB;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Skupiny databazi
        */
        private createGridFormatSkupinyDB;
        /**
        * vytvořit formát sloupců seznamu Licence rad
        */
        private createGridFormatLicenceRadPID;
        /**
        * vytvořit formát sloupců seznamu Fyzicke databaze
        */
        private createGridFormatFyzickeDB;
        /**
        * vytvořit formát sloupců seznamu Povolene verze databaze
        */
        private createGridFormatPovoleneVerzeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Povolene verze databaze
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců seznamu Dalsi soubory
        */
        private createGridFormatDalsiSoubory;
        /**
         * otevřít detail seznamu Skupiny databazi
         */
        private openDetailSkupinyDB;
        /**
         * otevřít detail seznamu Licence rad
         */
        private openDetailPrimLicLicenceRadPID;
        /**
         * otevřít detail seznamu Povolene verze databaze
         */
        private openDetailPovoleneVerzeDatabaze;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Skupiny databazi */
    class DetailSkupinyDB extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * licence
         */
        private lic_fyz;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Licence rad */
    class DetailFyzDBBalLic extends GContentBase {
        /**
         * Identifikátor ID Instance databaze
         */
        private db_guid;
        /**
         * data z gridu Fyzicke databaze
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Fyzicke databaze */
    class DetailFyzickeDatabaze extends GContentBase {
        /**
         * licence
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Fyzickych DB pro skupinu DB  */
    class DetailFyzickeDatabazeHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Skupiny databazi */
    class DetailGDZBalikSkupinyDB extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator autora GDZ baliku
         */
        private Autor;
        /**
         *  Identifikator skupiny DB
         */
        private ixs_sdb;
        /**
         *  Identifikator souboru
         */
        private ixs_gdt;
        /**
         * data z gridu seznam skupiny DB
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie baliku licenci  */
    class DetailHistSkupinyDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií skupin DB
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu nove skupiny databazi */
    class DetailNovaSkupinaDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Fyzickych DB pro skupinu DB  */
    class DetailPrimLicDBHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu obdobi vyjimky od licencnich poplatku */
    class DetailPrimarniLicenceDatabazi extends GContentBase {
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * licence
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator řady produktů GORDIC
         */
        private prod_rada;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu obdobi vyjimky od licencnich poplatku */
    class DetailPristupovaPrava extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  priznam spravce skupiny
         */
        private spravceSkupiny;
        /**
        * Dto
        */
        private readonly datovyModel?;
        /**
         * licence
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Pristupovych prav pro skupinu DB  */
    class DetailPristupovaPravaHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu navazani souboru na skupinu DB */
    class DetailSkupinyDBDalsiSoubory extends GContentBase {
        /**
         *  Identifikator skupiny DB
         */
        private ixs_sdb;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Povolene verze databaze */
    class DetailSkupinyDBPovoleneVerzeDB extends GContentBase {
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeSkupinyDatabazi = Gordic.Adt.Interface.GGdessdbDto;
    type UsedComponentsSkupinyDatabazi = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeSkupinyDatabazi>;
    /** Dialog detailu ulohy Skupiny databazi (poduloha Registru licenci)*/
    class DetailSkupinyDatabazi extends GContentBase<UsedComponentsSkupinyDatabazi> implements IGContent {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * Skupina databazi
         */
        private ixs_sdb;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
        * Dto pro detailBuilder
        */
        private GGdessdbDto?;
        /**
        * element header formu
        */
        private headerForm;
        /**
         * aktivita
         */
        private aktivita;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        /**
         * kultura
         */
        private kultura;
        /**
         * typ implementace
         */
        private typImplementace;
        /**
        * isl view gridu pro Seznam Pristupova prava v detailu ulohy Skupiny databazi v registru licenci
        */
        private viewPristupovaPrava;
        /**
        * isl view gridu Primarni licence databazi
        */
        private viewPrimarniLicenceDatabazi;
        /**
        * isl view gridu Vyjmenovane revize
        */
        private viewVyjmenovaneRevize;
        /**
        * isl view gridu Vyjmenovane produkcni faze
        */
        private viewVyjmenovaneProdukcniFaze;
        /**
        * isl view gridu Vyjmenovane GDZ baliky
        */
        private viewVyjmenovaneGDZBaliky;
        /**
        * isl view gridu Povolene verze databaze
        */
        private viewPovoleneVerzeDatabaze;
        /**
        * isl view gridu Historie zmen
        */
        private viewHistorieZmen;
        /**
        * isl view gridu Dalsi soubory
        */
        private viewDalsiSoubory;
        /**
         * editMode
         */
        private editMode;
        /**
        * grid Pristupova prava
        */
        private gridPristupovaPrava;
        /**
        * grid Primarni licence databazi
        */
        private gridPrimarniLicenceDatabazi;
        /**
        * grid Dalsi soubory
        */
        private gridDalsiSoubory;
        /**
        * Data Gdz baliku
        */
        private GdzBalikData;
        /**
        * grid Fyzicke databaze
        */
        private gridFyzickeDatabaze;
        /**
        * grid Vyjmenovane revize
        */
        private gridVyjmenovaneRevize;
        /**
        * grid Vyjmenovane produkcni faze
        */
        private gridVyjmenovaneProdukcniFaze;
        /**
        * grid Vyjmenovane GDZ baliky
        */
        private gridVyjmenovaneGDZBaliky;
        /**
        * grid Povolene verze databaze
        */
        private gridPovoleneVerzeDatabaze;
        /**
        * grid Historie zmen
        */
        private gridHistorieZmen;
        /**
        * format gridu Pristupova prava
        */
        private gridFormatPristupovaPrava;
        /**
        * format gridu Primarni licence databazi
        */
        private gridFormatPrimarniLicenceDatabazi;
        /**
        * format gridu Fyzicke databaze
        */
        private gridFormatFyzickeDatabaze;
        /**
        * format gridu Vyjmenovane revize
        */
        private gridFormatVyjmenovaneRevize;
        /**
        * format gridu Vyjmenovane produkcni faze
        */
        private gridFormatVyjmenovaneProdukcniFaze;
        /**
        * format gridu Vyjmenovane GDZ baliky
        */
        private gridFormatVyjmenovaneGDZBaliky;
        /**
        * format gridu Povolene verze databaze
        */
        private gridFormatPovoleneVerzeDatabaze;
        /**
        * format gridu Historie zmen
        */
        private gridFormatHistorieZmen;
        /**
        * format gridu Dalsi soubory
        */
        private gridFormatDalsiSoubory;
        /**
        * sloupce gridu Pristupova prava
        */
        private columnsPristupovaPrava;
        /**
        * sloupce gridu Primarni licence databazi
        */
        private columnsPrimarniLicenceDatabazi;
        /**
        * sloupce gridu Období osvobození s polozkami
        */
        private columnsFyzickeDatabaze;
        /**
        * sloupce gridu Vyjmenovane revize
        */
        private columnsVyjmenovaneRevize;
        /**
        * sloupce gridu Vyjmenovane produkcni faze
        */
        private columnsVyjmenovaneProdukcniFaze;
        /**
        * sloupce gridu Vyjmenovane GDZ baliky
        */
        private columnsVyjmenovaneGDZBaliky;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit formát sloupců seznamu Pristupova prava
        */
        private createGridFormatPristupovaPrava;
        /**
        * vytvořit formát sloupců seznamu Primarni licence databazi
        */
        private createGridFormatPrimarniLicenceDatabazi;
        /**
        * vytvořit formát sloupců seznamu Fyzicke databaze
        */
        private createGridFormatFyzickeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Vyjmenovane revize
        */
        private createGridFormatVyjmenovaneRevize;
        /**
        * vytvořit formát sloupců seznamu Vyjmenovane produkcni faze
        */
        private createGridFormatVyjmenovaneProdukcniFaze;
        /**
        * vytvořit formát sloupců seznamu Vyjmenovane GDZ baliky
        */
        private createGridFormatVyjmenovaneGDZBaliky;
        /**
        * vytvořit formát sloupců seznamu Povolene verze databaze
        */
        private createGridFormatPovoleneVerzeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Historie zmen
        */
        private createGridFormatHistorieZmen;
        /**
        * vytvořit formát sloupců seznamu Dalsi soubory
        */
        private createGridFormatDalsiSoubory;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
         * otevřít detail Pristupova prava
         */
        private openDetailPristupovaPrava;
        /**
         * otevřít Historii pro Pristupova prava
         */
        private openDetailHistPristupovaPrava;
        /**
         * otevřít detail seznamu Primarni licence databaze
         */
        private openDetailPrimarniLicenceDatabazi;
        /**
         * otevřít Historii seznamu Primarni licence databaze
         */
        private openDetailHistPrimLicDB;
        /**
         * otevřít detail seznamu Vyjmenovane revize
         */
        private openDetailVyjmenovaneRevize;
        /**
         * otevřít detail seznamu Vyjmenovane produkcni faze
         */
        private openDetailVyjmenovaneProdukcniFaze;
        /**
         * otevřít Historii seznamu Vyjmenovane revize
         */
        private openDetailHistVyjmenovaneRevize;
        /**
         * otevřít detail seznamu Vyjmenovane GDZ baliky
         */
        private openDetailVyjmenovaneGDZBaliky;
        /**
         * otevřít HistoriiVyjmenovanych GDZ baliku
         */
        private openDetailHistVyjmenovaneGDZBaliky;
        /**
         * otevřít detail ulohy Primarni licence
         */
        private openDetailPrimarniLicence;
        /**
         * otevřít detail seznamu Povolene verze databaze
         */
        private openDetailPovoleneVerzeDatabaze;
        /**
         * otevřít detail seznamu DalsiSoubory
         */
        private openDetailDalsiSoubory;
        /**
        * zjistit aktivitu
        */
        private setAktivita;
        /**
        *  Funkce pro zjisteni nazvu GDZ baliku
        */
        private prepareData;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Vyjmenovanych produkcnich fazi */
    class DetailVyjmenovaneFaze extends GContentBase {
        /**
         * closeForm - priznak pro zavreni formulare
         */
        private closeForm;
        /**
         * Identifikátor skupiny databáze
         */
        private ixs_sdb;
        /**
         * data z gridu seznamu vyjmenovanych produkcnich fazi
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Vyjmenované GDZ balíky */
    class DetailVyjmenovaneGDZBaliky extends GContentBase {
        /**
         * licence
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Vyjmenovanych GDZ baliku pro skupinu DB  */
    class DetailVyjmenovaneGDZBalikyHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Vyjmenovane revize */
    class DetailVyjmenovaneRevize extends GContentBase {
        /**
         * licence
         */
        private ixs_sdb;
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * pole s cenikovymi polozkami
        */
        cenikovePolozky: any[];
        /**
        * pole s cenikovymi podpolozkami
        */
        cenikovePodpolozky: any[];
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog Historie Vyjmenovanych revizi pro skupinu DB  */
    class DetailVyjmenovaneRevizeHist extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * identifikator skupiny databazi
         */
        private ixs_sdb;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * isl view gridu
         */
        private view;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gridu
        */
        private grid;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro grid s Historií
         */
        private createGTab;
        /**
         * vytvořit grid pro gtab
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog hromadných úprav revizí */
    class DetailEditRevize extends GContentBase {
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele k registru revizí
         */
        private userParam;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gtabu pro form - Stav revize - Změnit
         */
        private GtabFormStavRevize;
        /**
         * element gtabu pro form - Nový popis změny - Přidat
         */
        private GtabFormNovyPopis;
        /**
         * element gtabu pro form - Navázat popis změn - Navázat
         */
        private GtabFormNavazatPopis;
        /**
         * element gtabu pro grid s Vyberem revizi
         */
        private gridGtabVybraneRevize;
        /**
        * element gtabu s vybranými revizemi
        */
        private gtabRevize;
        /**
        * element formu se stavem revizí - Změnit
        */
        private formStavRevize;
        /**
        * element formu s novým popisem změny - Přidat
        */
        private formNovyPopis;
        /**
        * element formu s navázáním popisu změny - Navázat
        */
        private formNavazatPopis;
        /**
         *  NaposledPouzite
         */
        private naposledPouzite;
        private vybraneRevize;
        /**
         * stavRevize
         * @type {number}
         */
        private stavRevize;
        private formUserSettings;
        private allRowsInfo;
        private vyberRevizi;
        private captionLink;
        private popisTyp;
        private typZmeny;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        private fieldIxsKmp;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        /**
        * element filterpanelu
        * */
        private filterPopis;
        private formImport;
        private dat_od;
        private dat_do;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        private searchValue;
        private resSearch;
        /**
        * Data view k popisům změn
        */
        private viewZmeny;
        /**
        * Data view k vzhledávání popisů změn
        */
        private viewSearchZmeny;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private mainLogsPanel;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit naposled pouzite button
         */
        private naposledPouziteButton;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři gtab pro form se stavy revizí
         */
        private createGTabZmenitStav;
        /**
         * vytvořit form se stavy revizí pro gtab Stav revize
         */
        private createGTabFormStavRevize;
        /**
         * vytvoři gtab pro form s přidáním nového popisu změny
         */
        private createGTabPridatPopis;
        /**
         * vytvořit form Nového popisu změny pro gtab
         */
        private createGTabFormNovyPopis;
        /**
         * vytvoři gtab pro form s navázáním existujícího popisu změny
         */
        private createGTabNavazatPopis;
        /**
         * vytvořit form navázat popis změny pro gtab
         */
        private createGTabFormNavazatPopis;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanelPopis;
        private createFilterForm;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /**
         * vytvořit grid pro gtab s vybranými revizemi
         */
        private createGTabRevizeGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvoři gtab pro grid s vyberem baliku licenci
         */
        private createGTabRevize;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private _createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        private getMdProcessor;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu pro upload souboru pro nasledne odeslani do Distribuce */
    class DetailImportRevize extends GContentBase {
        /**
         * identifikator uploadovanych souboru pro odeslani do distribuce
         */
        private filesField;
        private revFileExist;
        /**
         * element gtabu pro form - Nový popis změny - Přidat
         */
        private GtabFormNovyPopis;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
        * element formu s novým popisem změny - Přidat
        */
        private formNovyPopis;
        private popisTyp;
        private typZmeny;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvoři gtab pro form s přidáním nového popisu změny
         */
        private createGTabPridatPopis;
        /**
         * vytvořit form Nového popisu změny pro gtab
         */
        private createGTabFormNovyPopis;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * callToImport - Volání importu ze souboru
         *
         * @param {[{}]} fileInfo
         */
        private callToImport;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Vstupní parametry dialogu DetailNahledRevize
    *
    * @author  VBlabla
    * @date    27.05.2025
    */
    interface DetailNahledRevize {
        /**
         * Identifikator revize
         * @type {string}
         */
        revize?: string;
        revize_typ_t?: boolean;
        dtoRev: Adt.Interface.GSeznamReviziGdesrevDto;
    }
    class DetailNahledRevize extends GContentBase {
        onContentReady(): void;
        /**
         * Vytvoreni definice formulare
         * @returns {Forms.Form} Form
         */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailRevize extends GContentBase {
        private stavRevizeInit;
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        private tooltipTagy;
        private resSearch;
        private gridFormat;
        private typView;
        private pocetZaznamu;
        /**
        * element subtasku pro rozdělení detailu revize na detail + popisy změn
        */
        private subtaskDetailRevize;
        /**
         * cntChangeLog	- content s přehledem změn k revizi
         * @type {JQueryPromise<any>}
         */
        private cntZmenyRevize;
        /**
         * Příznak ukládání dat
         */
        private ukladaniDat;
        /**
         * revize
         * @type {string}
         */
        private revize;
        /**
        *  modul - urcuje vyber stahovaneho souboru
        * */
        private modul;
        /**
         * revize_typ_t
         * @type {string}
         */
        private revize_typ_t;
        /**
         * revize_infoData
         * @type {any}
         */
        private revize_infoData;
        /**
         * revize_info
         * @type {any}
         */
        private revize_info;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * fieldRevision
         * @type {any[]}
         */
        private dtoRevize;
        private jeZakazano;
        private jeSmazano;
        /**
         * pocetObsazenychSouboru
         * @type {number}
         */
        private pocetObsazenychSouboru;
        /**
        * isl view gridu pro Obsazene soubory
        */
        private dataObsahRevize;
        /**
         * gtab
         * @type {JQuery<HTMLElement>}
         */
        private gtab;
        /**
         * gtab pro pois zmen k revizi
         * @type {JQuery<HTMLElement>}
         */
        private gtabPopisZmen;
        /**
         * gridObsazeneSoubory
         * @type {JQuery<HTMLElement>}
         */
        private gridObsazeneSoubory;
        /**
         * gridFormatObsazeneSoubory
         * @type {Gordic.Data.GridFormat}
         */
        private gridFormatObsazeneSoubory;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * element sidebaru s detailem
         */
        private sidebarDetail;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewController
         */
        private previewControllerDetailRevize;
        /**
         * panelHistorieZmenId
         * @type {string}
         */
        private panelHistorieZmenId;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserParamRevize;
        /**
        *  vybrane revize
        * */
        private revizeField;
        /**
        *  Veřejný důvod zákazu
        * */
        private Verejny_duvod_zakazu;
        /**
        *  Interní důvod zákazu
        * */
        private Interni_duvod_zakazu;
        /**
         * Příznak zakazu revize
         */
        private zakazRevize;
        /**
         *  elmenet previewDiv pro zmeny v revizi
         */
        private previewDivZmeny;
        /**
         * element políčka pro přidání popisu změn k revizi
         */
        private mdfieldRevize;
        /**
        * element buttonpanelu
        */
        private buttonPanel;
        private mainLogsPanel;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private popisTyp;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmenyOrig;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** setnout data */
        private setData;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /** vytvořit statusbar */
        private createStatusBar;
        private createMenuButtons;
        private copyInfoButton;
        /**
         * zakazatButton
         */
        private zakazatButton;
        private downloadButton;
        private ftpsButton;
        /**
        * otevřít dialog hromadného odeslani revozi do uloziste
        */
        private openDetailMoveToStorage;
        /**
        * otevřít dialog pro pridani popisu zmen spolecnych komponent
        */
        private openDetailPopisKomponent;
        private refreshDetail;
        /**
         * vytvořit gtaby pro popis zmen k revizi
         */
        private createGTabPopisZmen;
        /**
         * vytvořit gtaby pro seznamy
         */
        private createGTab;
        private createGridObsazeneSoubory;
        private createGridFormatObsazeneSoubory;
        private createButtonPanel;
        private createMenuBar;
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         *  vytvořit sidebar
         */
        private createSidebarDetail;
        /**
         * createSidebar
         *
         * @param {boolean} changeLog - příznak registrece panelu s přehledem změn k revizi
         */
        private createSidebar;
        /** vytvořit panel s prehledem zmen k revizi */
        private createPanel;
        private createPreviewDivZmeny;
        /**
         * enablePreviewZmeny - Povolení zobrazeni nahledu ke zmenam revize
         *
         * @param {boolean} enabled
         */
        private enablePreviewZmeny;
        private loadPreviewZmeny;
        private zakazatRevize;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        private ulozPopisKomponenty;
        private getMdProcessor;
        /**
         * createEditContent
         *
         * @param {string[]} fieldTags
         * @param {string} cntName
         */
        private createEditContent;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
        * nastavit data
        */
        private _createChangeLog;
        /**
        * nastavit data
        */
        private _createChangeLogOrigin;
        private createGridFormatOrigin;
        private createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        _setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesOrigin(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
        * filterData
        *
        * @param {any} value
        */
        private filterData;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GTemplateComponentExtensions {
        _templateListContent: GContent;
    }
    type DtoTypeRevize = Gordic.Adt.Interface.GSeznamReviziGdesrevDto;
    type UsedComponentsRevize = GTemplateComponentExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoTypeRevize>;
    /** Dialog detailu revize programové fáze*/
    class DetailRevizeFaze extends GContentBase<UsedComponentsRevize> implements IGContent {
        /**
         *  elmenet previewDiv
         */
        private previewDivInfo;
        private sidebarOpened;
        /**
         * Příznak ukládání dat
         */
        private ukladaniDat;
        /**
         * Příznak občerstvení dat
         */
        private obcerstveniDat;
        /**
         * tabPopisyZmen
         * @type {JQuery<HTMLElement>}
         */
        tabPopisyZmen: JQuery<HTMLElement>;
        /**
         * stavRevizeEdit - změněný stav revize
         * @type {number}
         */
        stavRevizeEdit: number;
        /**
         * initialLoad	- přínak nového otevření detailu revize
         * @type {boolean}
         * @default true
         */
        initialLoad: boolean;
        /**
         * Identifikátor revize
         * @type {string}
         */
        private revize;
        /**
         * idTestRevize - ID automatického testování
         * @type {string}
         */
        private idTestRevize;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele (0 = Prohlížení / 10 = Autor / 20 = Vedoucí vývojového teamu / 99 = Supervizor)
         */
        private UserParamRevize;
        /**
         * IxsRef - IxsRef přihlášeného uživatele
         * @type {string}
         */
        private IxsRef;
        /**
         * IxsFun - IxsFun přihlášeného uživatele
         * @type {string}
         */
        private IxsFun;
        /**
         * revize_typ_t - Příznak revize typu T
         * @type {string}
         */
        private revize_typ_t;
        /**
         * revize_infoData - dočasné DTO s doplňujícími infomracemi o revizi (programová fáze/verze/stav atd...)
         * @type {any}
         */
        private revize_infoData;
        /**
         * revize_info - DTO s doplňujícími infomracemi o revizi (programová fáze/verze/stav atd...)
         * @type {any}
         */
        private revize_info;
        private revizeTestDto;
        /**
         * jeZakazano - Příznak zakázané revize (90 = Zakázáno)
         * @type {number}
         */
        private jeZakazano;
        /**
        *  modul - urcuje vyber stahovaneho souboru
        * */
        private modul;
        /**
        * Formulář s podrobnostmi o revizi
        */
        private formPodrobnosti;
        /**
        * Formulář s podrobnostmi o testovani revize
        */
        private formTestovani;
        private enableActRefreshTestRev;
        private enableActDownloadTestRev;
        /**
         * stavRevizeInit - Inicializační hodota stavu revize
         * @type {number}
         */
        private stavRevizeInit;
        /**
         * Aktualizované Informace o revizi
         * @type {any[]}
         */
        private dtoRevize;
        /**
        * isl view gridu pro grid s informacemi o stahování revizí
        */
        private viewDownloadRev;
        /**
        * grid Stahování revizí
        */
        private gridDownloadRev;
        /**
        * format gridu Stahování revizí
        */
        private gridFormatDownloadRev;
        /**
         * mod - Mód zobrazení popisů změn
         * @type {number}
         * @default 1
         */
        private mod;
        /**
        * isl view gridu pro grid s informacemi o testování revize
        */
        private viewTestHist;
        /**
        * grid Historie testování
        */
        private gridTestHist;
        /**
        * format gridu Historie testování revize
        */
        private gridFormatTestHist;
        private actAutTestStav;
        private headerForm;
        private actualFormSections;
        private testExist;
        /**
         * notExistTestScenario - příznak neexistujícího testovacího scénáře (nastaven na true, pokud testovací scénář není nalezen)
         * @type {boolean}
         * @default false
         */
        private notExistTestScenario;
        private testQueued;
        private testEmail;
        /**
         * idActTest - ID aktuálně spouštěného testu
         * @type {string}
         * @default ""
         */
        private idActTest;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
        * vytvořit formulář s podrobnostmi o revizi
        */
        private createFormPodrobnosti;
        /** setnout data */
        private setData;
        private checkAutTest;
        /** setnout data testování */
        private setDataTestovani;
        /**
        * vytvořit formulář s podrobnostmi o testovani revize
        */
        private createFormTestovani;
        private startRevisionTest;
        /**
        * Neexistující automatický test
        */
        private notExistTest;
        /**
        * vytvořit formulář o započatém testovani revize
        */
        private createFormStartTestovani;
        /**
         * getTestState - Zjištění aktuálního stavu testování (voláno pouze na kliknutí tl. Načíst stav)
         *
         * @param {JQuery.Deferred<any>} def
         */
        private getTestState;
        /**
         * getTestState - Zjištění aktuálního stavu testování (voláno pouze na kliknutí tl. Načíst stav)
         *
         * @param {JQuery.Deferred<any>} def
         */
        private getResultTestState;
        /**
        * vytvořit formulář s podrobnostmi o revizi
        */
        private createFormPodrobnostiTestovani;
        private createPreviewDivInfo;
        /**
        * vytvořit formát sloupců gridu Stahování revizí
        */
        private createGridFormatDownloadRev;
        /**
        * vytvořit formát sloupců gridu testování revize
        */
        private createGridFormatTestHist;
        /**
        * otevřít dialog hromadného odeslani revozi do uloziste
        */
        private openDetailMoveToStorage;
        /**
        * otevřít náhled fronty automatického testování revizí
        */
        private openDetailTestQueue;
        /**
         * onDetailBuilderInit
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        setCreateState(): void;
    }
}
declare namespace Gordic.Adt.WebControls {
    class DetailRevizeZmeny extends GContentBase {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        private DataFilter?;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private tagySearch;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        private MDProcessor;
        private Revize;
        onContentReady(): void;
        private getMdProcessor;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private createGridFormat;
        _unEscape(htmlStr: string): string;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        private closeDet;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu zákazu revizí */
    class DetailStavRevizi extends GContentBase {
        private vybraneRevize;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        private verejnyDuvodZakazu;
        private interniDuvodZakazu;
        private interniPopisRevize;
        /**
        * element subtasku pro rozdělení detailu revize na detail + popisy změn
        */
        private subtaskDetailRevize;
        private mainLogsPanel;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private popisTyp;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         * createSubtasks pro oddělení detailu revize a popisu zmen k revizi
         */
        private createSubtasks;
        /** setnout data */
        private createEmptyContent;
        private getMdProcessor;
        /**
         * createEditContent
         *
         * @param {string[]} fieldTags
         * @param {string} cntName
         */
        private createEditContent;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog pro náhled fronty automatického testování */
    class DetailTestQueue extends GContentBase {
        /**
         *  DB parametr adt_user_licenc - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele do registru revizí
         */
        private UserParamRevize;
        /**
        * isl view gridu pro Seznam fronty
        */
        private view;
        private viewData;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element gridu s Vyberem revizi
         */
        private gridQueue;
        /**
        * element gtabu
        */
        private gtab;
        /**
         *  Identifikátor revize
         */
        private revize;
        /**
         * countRequests - počet požadavků na automatické testování
         * @type {string}
         */
        private countRequests;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvořit grid pro gtab s frontou
         */
        private createGTabGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        private setPriorityValue;
        private createButton;
        /**
        * otevřít dialog detailu revize
        */
        private openDetailRevize;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu balíčku */
    class DetailZmenyRevize extends GContentBase {
        /**
         * gtab pro popisy změn
         * @type {JQuery<HTMLElement>}
         */
        private gtabPopisyZmen;
        /**
         * collapsible element pro skupinu Oprav
         * @type {JQuery<HTMLElement>}
         */
        private collElPatch;
        /**
         * collapsible element pro skupinu Novinek
         * @type {JQuery<HTMLElement>}
         */
        private collElNewFeature;
        /**
         * Popisný text
         */
        private mdfieldText;
        private popisTyp;
        private patchCollapsed;
        private newFeatureCollapsed;
        private fieldTagy;
        private cntName;
        /**
         * revize - Název revize
         * @type {string}
         */
        private revize;
        /**
         * revize - Fáze revize
         * @type {string}
         */
        private faze;
        /**
         * faze_txt - Název fáze revize
         * @type {string}
         */
        private faze_txt;
        /**
         * revize - Verze revize
         * @type {string}
         */
        private verze;
        /**
         * revize - Subverze revize
         * @type {string}
         */
        private subverze;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
         * aktivni zalozka
         * @type {any}
         */
        private subtask;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** setnout data */
        private createEmptyContent;
        /** Nový popis změn */
        private createNewDescForm;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        /**
         * changeLogsPanel	- Zobrazení changelogů do panelu
         */
        private changeLogsPanel;
        /**
         * updateChangeLogsPanel - Refresh changelogů v panelu
         */
        private updateChangeLogsPanel;
        /**
         * renderChangeLogPanelContent - Vykreslení contentu v changelog panelu
         *
         * @param {any} data
         * @param {any} wrapper
         */
        private renderChangeLogPanelContent;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Subverze databaze */
    class DetailSubverzeDatabaze extends GContentBase {
        /**
         * data z gridu seznam verzi a subverzi databazi GINIS
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Dialog detailu Verze databaze */
    class DetailVerzeDatabaze extends GContentBase {
        /**
         * data z gridu seznam obdobi osvobozeni
         */
        private dataRow;
        /**
         * editMode - priznak pro rezim editace
         */
        private editMode;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Adt.GridUtils {
    function setPreviewEmpty(panelElement: JQuery<HTMLElement>): void;
    function setPanelGrid(title: string, row: any[] | null, gridFormat: Gordic.Data.GridFormat, panelElement: JQuery<HTMLElement>): void;
    /**
     * export function getColumnsName
     *
     * Z GridFormat vytáhne jména sloupců gridu a vrátí jména sloupců
     *
     * @param {Gordic.Data.GridFormat} gridFormat
     * @returns {string[]}
     */
    function getColumnsName(gridFormat: Gordic.Data.GridFormat): string[];
    /**
    * export function getScopedObj
    *
    * Přístup do vnořených položek zadané třídy na základě stringově definované cesty - Tedy to co lze přistoupit classInstance.item.subItem lze přistoupit také přes: getScopedObj(classInstance, "item.subItem")
    *
    * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
    *
    * @param {any} scope Instance třídy, k jejímž položkám chcete na základě stringové cesty přistupovat
    * @param {string} str Textově definovaná cesta k interním položkám zadané instance
    */
    function getScopedObj(scope: any, str: string): any;
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog seznamu Automatu
     */
    class SeznamAutomatu extends GContentBase {
        /**
        * element seznamu pro Inbox
        */
        private gridInbox;
        /**
        * element seznamu pro Outbox
        */
        private gridOutbox;
        /**
        * element seznamu pro přehled uploadovaných revizí do dostribuce
        */
        private gridUploadRev;
        /**
        * verze databáze
        */
        private verzeDB;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * kontrola zatrhleho gcheck Inf
        */
        private checkInf;
        /**
        * kontrola zatrhleho gcheck Ora
        */
        private checkOra;
        /**
        * kontrola zatrhleho gcheck Mss
        */
        private checkMss;
        /**
        * kontrola zatrhleho gcheck Spg
        */
        private checkSpg;
        /**
        * kontrola zatrhleho gcheck Adl
        */
        private checkAdl;
        /**
        * isl view gridu pro Inbox
        */
        private viewInbox;
        /**
        * prazdny view gridu
        */
        private viewEmpty;
        /**
        * Nazev souboru s contentem pozadavku na automat
        */
        private jmeno_AutPozadavek;
        rozsah: any;
        /**
        * element subtasku
        */
        private subtask;
        /**
        * element sidebaru
        * */
        private sidebar;
        private panelId;
        /**
        * element filterpanelu pro inbox
        * */
        private filterInbox;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * formát sloupců gridu	pro Outbox
         */
        private gridFormatOutbox;
        /**
         * formát sloupců gridu	pro Upload revizí do distribuce
         */
        private gridFormatUploadRev;
        /** vblabla - grid_ObsahPozadavkuInbox */
        private grid_ObsahPozadavkuInbox;
        /** vblabla - mesageidGridInbox */
        private messageidGridInbox;
        /** vblabla - mesageidGridInbox */
        private messageidGridOutbox;
        /** isl view gridu pro Seznam Outboxu */
        private viewOutbox;
        /** isl view gridu pro UploaRevizí do distribuce */
        private viewUploadRev;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        private createSubtasks;
        /**
         * vytvořit seznam pro Inbox
         */
        private createGridInbox;
        /**
         * vytvořit seznam pro Outbox
         */
        private createGridOutbox;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormatOutbox;
        /**
         * vytvoři filtrPanel pro Inbox
         */
        private createFilterPanelInbox;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * createFilterFormInbox
         */
        private createFilterFormInbox;
        private createFilterForm;
        /**
         * vytvoři gtabb pro Inbox Obsah pozadavku
         */
        private createGTabInbox;
        private row_Obsah_PozadavkuInbox;
        private columns_Obsah_PozadavkuInbox;
        private gridFormat_Obsah_PozadavkuInbox;
        private createGridObsahPozadavkuInboxGTab;
        private createGridFormat_ObsahPozadavkuInbox_GTab;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * vytvořit seznam pro přehled uploadu revizí
         */
        private createGridUploadRev;
        private createGridFormatUploadRev;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog seznamu balíčku
     */
    class SeznamBalicku extends GContentBase {
        /**
         *  DB parametr adt_user_licenc - pro zjisteni pristupovych prav uzivatele (Supervizor ADT07 = 99)
         */
        private UserParam;
        /**
         *  DB parametr adt_user_type - pro zjisteni pristupovych prav uzivatele
         */
        private UserType;
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserTypeRev;
        /**
         *  Identifikator ixs_ref
         */
        private IxsRef;
        /**
        * Příznak ukládání Code review
        */
        private codeReviewEdit;
        /**
         * příznak nově (dnes) vytvořených balíčků
         */
        private noveBalickyFlag;
        /** příznak změněných balíčku (dnes) */
        private changeBalickyFlag;
        /**
         * data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1]
         */
        private row;
        /**
         * element seznamu
         */
        private grid;
        /**
         * identifikátor balíčku
         */
        private ixs_gdt;
        /**
         * isl view gridu
         */
        private view;
        /**
         * sloupce seznamu
         */
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private filter;
        private sidebar;
        private panelId;
        private panelElement;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateFromValue;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateChangeValue;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * Funkce pro nastavení Enabled tlačítka Aktivovat
         * @param state
         */
        private setStateAktivovat;
        /**
         * Funkce pro nastavení Enabled tlačítka Deaktivovat
         * @param state
         */
        private setStateDeaktivovat;
        /**
         * Funkce pro nastavení Enabled tlačítka Delete
         * @param state
         */
        private setStateZrusit;
        /**
         * Funkce pro nastavení Enabled tlačítka Code review
         * @param state
         */
        private setStateCodeReview;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        private getIxsGdtArrayFromSelection;
        private actionButtons;
        /**
         * aktualizace stavu aktivity řádku
         */
        private updateAktivitaRow;
        private detailButton;
        private createMenuButtons;
        private setMenuButtons;
        private createContextBar;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private createFilterForm;
        /**
         * vytvořit filtr
         */
        private createFilter;
        private reloadDataOnGrid;
        private refreshPanel;
        /** vytvořit panel */
        private createPanel;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**
         *  vytvořit sidebar
         */
        private createNewSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Chyby z reinstalací
     */
    class SeznamChybyReinstalaci extends GContentBase {
        /**
         *  DB parametr adt_user_adl - pro zjisteni pristupovych prav uzivatele	  (0 – Přístup do podúlohy zakázán (default) / 10 – Pouze pro čtení / 20 – Povolena editace)
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewController check
         */
        private checkPreviewController;
        /**
         *  kontrola zatrhlych checkboxu
         */
        private neurceno;
        private bezChyb;
        private opraveno;
        private cekaNaAnlalyzu;
        private probihaReseniChyb;
        /**
         * Pole vybranych radku z gridu pro Chyby z reinstalaci
         */
        private chybyReinstalaciVyberRadku;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít dialog detailu chyby reinstalace
         */
        private openDetail;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** dialog seznamu Historie Databazi */
    class SeznamDatabaze extends GContentBase<SeznamDatabazeDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * detail button
         */
        private detailButton;
        /**
         * otevřít detail
         */
        private openDetail;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvořit panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * SeznamLicenceDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamDatabazeDesigner extends SeznamBase {
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.Adt.Interface.GGdesdboDto>;
        /**
         * SeznamLicenceDesignerInit
         *
         * @param {GContentType<SeznamLicenceDesigner>} that
         */
        static SeznamDatabazeDesignerInit(that: GContentType<SeznamHistorieDatabaziDesigner>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamDatabazeDesigner>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilter(that: GContentType<SeznamDatabazeDesigner>): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterForm(that: GContentType<SeznamDatabazeDesigner>): Forms.Form;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog seznamu doporučených balíčků
     */
    class SeznamDoporuceneBalicky extends GContentBase {
        /**
         * předaný atribut licence ze seznamu licence
         */
        private lic;
        /**
         * data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1]
         */
        private row;
        /**
         * element seznamu
         */
        private grid;
        /**
         * identifikátor balíčku
         */
        private ixs_gdt;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateChangeValue;
        /**
         * isl view gridu
         */
        private view;
        /**
         * sloupce seznamu
         */
        private columns_seznam_balicku;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private filter;
        private sidebar;
        private panelId;
        private panelElement;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit seznam
         */
        private createGrid;
        private setStateAktivovat;
        private setStateDeaktivovat;
        private setStateZrusit;
        private setStateOfActionButtonsOnMenuBar;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        private getIxsGdtArrayFromSelection;
        private actionButtons;
        private detailButton;
        private createMenuButtons;
        private setMenuButtons;
        private createContextBar;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * vytvořit filtr
         */
        private createFilter;
        private createFilterForm;
        private refreshPanel;
        /** vytvořit panel */
        private createPanel;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** dialog seznamu licencí */
    class SeznamHistorieDatabazi extends GContentBase<SeznamHistorieDatabaziDesigner> {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * detail button
         */
        private detailButton;
        /**
         * tlačítko na přístup na seznam Doporučené Balíčky
         */
        private seznamDoporuceneBalickyButton;
        /**
         * otevřít detail
         */
        private openDetail;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvořit panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * SeznamHistorieDatabaziDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamHistorieDatabaziDesigner extends SeznamBase {
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.Adt.Interface.GGdesdboDto>;
        /**
         * SeznamHistorieDatabaziDesignerInit
         *
         * @param {GContentType<SeznamHistorieDatabaziDesigner>} that
         */
        static SeznamHistorieDatabaziDesignerInit(that: GContentType<SeznamHistorieDatabaziDesigner>, userParam: string, ixsFun: string): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamHistorieDatabaziDesigner>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilter(that: GContentType<SeznamHistorieDatabaziDesigner>, userParam: string, ixsFun: string): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterForm(that: GContentType<SeznamHistorieDatabaziDesigner>, userParam: string, ixsFun: string): Forms.Form;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Hodnocení stavu (enum)
     */
    enum RespStatEnum {
        NeumimPosoudit = 0,
        VPoradku = 10,
        ProblemNevyresen = 20,
        Chyba = 30
    }
    /**
     * Dialog seznamu historie spuštění
     */
    class SeznamHistorieSpusteni extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element gridu
         */
        private grid;
        /**
         * identifikátor ixs_gdt
         */
        private ixs_gdt;
        /**
         * element filtru
         */
        private filter;
        /**
         * isl view gridu
         */
        private view;
        /**
         * data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1]
         */
        private row;
        /**
         * sloupce seznamu
         */
        private columns_historie_spusteni;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private sidebar;
        private panelId;
        private panelElement;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateChangeValue;
        /**
         * onContentReady
         */
        onContentReady(): void;
        private init;
        /**
         * vytvořit titulek
         */
        private setTitle;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        /**
         * set menubar tlačítek
         */
        private setMenuButtons;
        private detailButton;
        /**
         * zkolektování všech políček filtru
         */
        private getFilters;
        /**
         * vytvořit formulář
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         * @param {any} data vstupní data
         */
        private createGrid;
        /**
         * vytvořit contextmenu
         * @returns
         */
        private createContextBar;
        /**
         * vytvořit formát seznamu
         * @returns
         */
        private createGridFormat;
        /**
         * otevřít detail
         */
        private openDetail;
        private refreshPanel;
        /** vytvořit panel */
        private createPanel;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** dialog seznamu licencí */
    class SeznamLicence extends GContentBase<SeznamLicenceDesigner> {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * detail button
         */
        private detailButton;
        /**
         * tlačítko na přístup na seznam Doporučené Balíčky
         */
        private seznamDoporuceneBalickyButton;
        /**
         * otevřít detail
         */
        private openDetail;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvořit panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * SeznamLicenceDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamLicenceDesigner extends SeznamBase {
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.Adt.Interface.GGdesdboDto>;
        /**
         * SeznamLicenceDesignerInit
         *
         * @param {GContentType<SeznamLicenceDesigner>} that
         */
        static SeznamLicenceDesignerInit(that: GContentType<SeznamLicenceDesigner>, ixsFun: string, userParam: string): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamLicenceDesigner>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilter(that: GContentType<SeznamLicenceDesigner>, userParam: string, ixsFun: string): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterForm(that: GContentType<SeznamLicenceDesigner>, userParam: string, ixsFun: string): Forms.Form;
    }
}
declare namespace Gordic.Adt.WebControls {
    enum ITypePanel {
        SeznamRevizi = 0,
        Neprirazeno = 99
    }
    enum ITypeVerze {
        suda = 384
    }
    /**
     * Dialog seznamu Revizi
     */
    class SeznamRevizi extends GContentBase {
        /**
         *  DB parametr adt_user_revize - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * gridProfile - určení grid profilu
         * @type {number}
         * @default 0
         */
        private gridProfile;
        /**
         * identifikator uploadovanych souboru pro odeslani do distribuce
         */
        private filesField;
        /**
         * initial - Přiznak inicializace contentu
         * @type {boolean}
         * @default true
         */
        private initial;
        /**
         * fazeFilter - Příznak vybraneho filtru na programovou fázi
         * @type {boolean}
         * @default false
         */
        private fazeFilter;
        /**
         * sidebarPanelZmenyCreated - priznak basepanelu s prehledem zmen
         * @type {boolean}
         * @default false
         */
        private sidebarPanelZmenyCreated;
        /**
        * element seznamu
        */
        private gridSeznamRevizi;
        private prevZmenyLoaded;
        /**
         * panelPrehledZmen
         * @type {object}
         */
        private panelPrehledZmen;
        /**
         *  elmenet previewDiv
         */
        private previewDivZmeny;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
        *  vybrane revize
        * */
        private revize;
        /**
        *  modul - urcuje vyber datoveho typu stahovaneho souboru (msi/zip)
        * */
        private modul;
        /**
        *  Veřejný důvod zákazu
        * */
        private Verejny_duvod_zakazu;
        /**
        *  Interní důvod zákazu
        * */
        private Interni_duvod_zakazu;
        /** elmenet sidebaru */
        private sidebar;
        /**
        * isl view gridu pro Seznam revizi
        */
        private view;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateValue;
        /**
        * kontrola zmeny gdatecomboboxu
        */
        private checkDateRevokeValue;
        /**
        * pole s verzemi
        */
        verze: any[];
        /**
        * grid format
        */
        private gridFormatSeznamRevizi;
        /**
        * pole se stavy reviyí
        */
        stavy: any[];
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewControllerExtended
         */
        private previewControllerExtended;
        /**
         *  elmenet GPreviewControllerZmeny
         */
        private previewControllerZmeny;
        private dataCheckedView;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * vytvořit seznam revizi
         */
        private createGridSeznamRevizi;
        /**
         * vytvořit formát sloupců seznamu
         */
        private prepareGridFocus;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        private detailButton;
        private zmenitStavButton;
        private zakazatButton;
        private downloadButton;
        /**
         * downloadFile
         *
         * @param {string} guid
         * @param {string} filename
         * @param {string} description
         */
        private downloadFile;
        private ftpsButton;
        private distribuceButton;
        private copyInfoButton;
        /**
         * bulkEditButton - Tlačítko pro hromadné úpravy
         */
        private bulkEditButton;
        private createMenuButtons;
        private setMenuButtons;
        private createContextBar;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * otevřít detail okno pro upload souboru
         */
        private openDetailUpload;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        private createFilterForm;
        private zakazatRevize;
        private zmenitStavRevize;
        /**
         *  vytvořit sidebar
         */
        private createNewSidebar;
        private createPreviewDivZmeny;
        /**
         * enablePreviewZmeny - Povolení zobrazeni nahledu ke zmenam revize
         *
         * @param {boolean} enabled
         */
        private enablePreviewZmeny;
        private loadPreviewZmeny;
        private showPreviewZmeny;
        /**
         *  Funkce pro zjisteni verze revize
         */
        private prepareData;
        /**
         * openDetailMoveToStorage - otevřít dialog hromadného odeslani revozi do uloziste
         *
         * @param {number} formatRev // 0 = bez určení / 1 = 41*,42*,43* msi / 2 = 41*,42*,43* zip / 3 = pouze msi
         */
        private openDetailMoveToStorage;
        /**
        * otevřít dialog detailu revize
        */
        private openDetailRevize;
        /**
         * otevřít dialog hromadné úpravy revizí
         */
        private openDetailEditRevize;
        /**
         * otevřít dialog hromadné úpravy revizí
         */
        private vratSouborRevize;
    }
}
declare namespace Gordic.Adt.WebControls {
    /** Seznam ulohy Verze databaze*/
    class SeznamVerzeDatabaze extends GContentBase {
        /**
        * element subtasku
        */
        private subtasks;
        /**
        * element gtabu Aktualne otevrene reinstalacni baliky
        */
        private tab_elementAktReinstBal;
        /**
        * element gtabu Reinstalacni baliky
        */
        private tab_elementReinstBal;
        /**
        * element gtabu Verze
        */
        private tab_elementVerze;
        /**
        * element gtabu Verze a subverze
        */
        private tab_elementVerzeSubverze;
        /**
        * element gtabu Vydane verze
        */
        private tab_elementVydaneVerze;
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
        * isl view gridu pro Aktuálně otevřené reinstalační balíky
        */
        private aktReinstBal;
        /**
        * isl view gridu pro Reinstalační balíky
        */
        private viewReinstBal;
        /**
        * isl view gridu pro Seznam Verze databaze
        */
        private viewVerzeDatabaze;
        /**
        * isl view gridu pro Seznam Verze a subverze
        */
        private viewVerzeSubverze;
        /**
        * isl view gridu pro Seznam Vydane verze databaze
        */
        private viewVydaneVerze;
        /**
        * grid Aktuálně otevřené reinstalační balíky
        */
        private gridAktReinstBal;
        /**
        * grid Reinstalační balíky
        */
        private gridReinstBal;
        /**
        * grid Verze databaze
        */
        private gridVerzeDatabaze;
        /**
        * grid Verze a subverze
        */
        private gridVerzeSubverze;
        /**
        * grid Vydane verze databaze
        */
        private gridVydaneVerze;
        /**
        * format gridu Aktuálně otevřené reinstalační balíky
        */
        private gridFormatAktReinstBal;
        /**
        * format gridu Reinstalační balíky
        */
        private gridFormatReinstBal;
        /**
        * format gridu Verze databaze
        */
        private gridFormatVerzeDatabaze;
        /**
        * format gridu Verze a subverze
        */
        private gridFormatVerzeSubverze;
        /**
        * format gridu Vydane verze databaze
        */
        private gridFormatVydaneVerze;
        /**
        * editmode
        */
        private editMode;
        private panelType;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
        * vytvořit formát sloupců seznamu Reinstalacni baliky
        */
        private createGridFormatReinstBal;
        /**
        * vytvořit formát sloupců seznamu Verze databaze
        */
        private createGridFormatVerzeDatabaze;
        /**
        * vytvořit formát sloupců seznamu Verze a subverze
        */
        private createGridFormatVerzeSubverze;
        /**
        * vytvořit formát sloupců seznamu Vydane verze databaze
        */
        private createGridFormatVydaneVerze;
        private openDetailFormVerzeDatabaze;
        private openDetailFormSubverzeDatabaze;
        /**
         *  vytvořit sidebar
         */
        private createSidebarVerze;
        /**
         *  vytvořit sidebar pro Verze a subverze
         */
        private createSidebarVerzeSubverze;
        /**
         *  vytvořit sidebar pro Vydane verze
         */
        private createSidebarVydaneVerze;
        /**
         *  vytvořit sidebar pro Aktuálně otevřené reinstalační balíky
         */
        private createSidebarAktReinstBal;
        /**
         *  vytvořit sidebar pro Reinstalační balíky
         */
        private createSidebarReinstBal;
        /**
         * vytvorit Tab Verze Databaze
         */
        private createTabVerzeDatabaze;
        /**
         * vytvorit Tab Verze a Subverze
         */
        private createTabVerzeSubverze;
        /**
         * vytvorit Tab Vydane verze
         */
        private createTabVydaneVerze;
        /**
         * vytvorit Tab Aktuálně otevřené reinstalační balíky
         */
        private createTabAktReinstBal;
        /**
         * vytvorit Tab Reinstalační balíky
         */
        private createTabReinstBal;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Baliky produktu
     */
    class SeznamBalikyProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * editMode
         */
        private editMode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Baliky produktu
         */
        private openDetailBalikyProduktu;
        /**
         * otevřít dialog noveho baliku ptoduktu
         */
        private openDetailNovyBalikProduktu;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Ceniky
     */
    class SeznamCeniky extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * isComparisonInited - Příznak započatého porovnávání
         * @type {boolean}
         */
        private isComparisonInited;
        /**
         * Content pro zobrazení výsledku porovnání
         */
        private comparisonCnt$;
        /**
         * Badge element pro zobrazení počtu porovnávaných záznamů
         */
        private comparisonBadge;
        /**
         * rightSbComparator$
         */
        private rightSbComparator$;
        /**
         * element comparatoru
         */
        private comparator;
        /**
         * compareRows - Řádky pro porovnání produktů ve vybraných cenících produktů
         * @type {any}
         */
        private compareRows;
        /**
         * counterLic
         * @type {number}
         * @default 0
         */
        private counterCenik;
        /**
         * sidebarPanelCompare - priznak basepanelu s porovnáním obsahu licecí DB
         * @type {boolean}
         * @default false
         */
        private sidebarPanelCompare;
        private ccmField;
        /**
         *  elmenet previewDivCompare
         */
        private previewDivCompare;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit delete button
         */
        private deleteButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        private compareButton;
        private enablePreviewCompare;
        /**
 * loadPreviewCompare - načtení kontroly obsahu ceníků
 */
        private loadPreviewCompare;
        /**
         * createPreviewDivCompare
         */
        private createPreviewDivCompare;
        /**
        * metoda doComparison - Spustí porovnání
        */
        private doComparison;
        /**
         * addToComparison - Přidání licence do porovnání
         *
         * @param {any} rows
         */
        private addToComparison;
        /**
        * metoda clearComparison - Provede vyčištění porovnávacího okna
        */
        private clearComparison;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Ceniky
         */
        private openDetail;
        /**
         * otevřít dialog noveho Ceniku
         */
        private openDetailNovyCenik;
        /**
         * showComparison - Funkce pro zobrazení/přidání do porovnávače
         *
         * @param {any} metaRows
         */
        private showComparison;
        /**
         * createComparisonFormat - Formát zobrazení dat
         *
         * @param {any[]} data
         */
        private createComparisonFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Přehled ORJ
     */
    class SeznamORJ extends GContentBase {
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam pro Přehled ORJ
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu ORJ
         */
        private createGridFormat;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
    * Seznam podpolozek ceniku produktu
    */
    class SeznamPodpolozky extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * Polozka
         */
        private pol;
        /**
         * Aktivita
         */
        private aktivita;
        /**
         * Podpolozka
         */
        private ppol;
        /**
         * editMode
         */
        private editMode;
        /**
        *  vybrane podpolozky
        * */
        private vybranePodpolozky;
        /**
        * isl view gridu pro Seznam podpolozek
        */
        private viewPPol;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
        * element filterPanelu
        */
        private filter;
        private grid;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        private dataCheckedView;
        private rowgrid;
        private gridFormat;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * element seznamu
         */
        private gridPodpolozky;
        /**
         * formát sloupců gridu
         */
        private gridFormatPodpolozky;
        /**
        * prazdny view gridu
        */
        private viewEmpty;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři gtab pro grid s podpolozkami
         */
        private createGTab;
        /**
         * vytvořit grid
         */
        private createGrid;
        /**
         * vytvořit format sloupcu gridu
         */
        private createGridFormat;
        /**
        * otevřít detail Podpolozky (na zalozce Podpolozky)
        */
        private openDetailPodpolozky;
        /**
         * otevřít dialog hromadné úpravy Podpoložek
         */
        private openDetailEditPodpolozky;
        /**
         *  Funkce pro zatrhnuti radku
         */
        private prepareCheckData;
        /**
        * otevřít dialog nove podpolozky
        */
        private openDetailProduktyPodpolDlg;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Produktove listy
     */
    class SeznamProduktoveListy extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Produktove listy
         */
        private openDetail;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Produktove listy
     */
    class SeznamProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
        *  DB parametr adt_user_revie - pro zjisteni pristupovych prav uzivatele
        */
        private UserParamRevize;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        /**
         *  aktivita zaznamu
         */
        private Aktivita;
        /**
         *  filtr na modulove faze
         */
        private Moduly;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Produktove listy
         */
        private openDetail;
        /**
         * otevřít dialog hromadné úpravy Produktu
         */
        private openDetailEditProdukty;
        /**
         *  Funkce pro zatrhnuti radku
         */
        private prepareCheckData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Produkty
     */
    class SeznamProdukty extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        private naplnFormular;
        /**
         * otevřít detail ulohy Produkty
         */
        private openDetail;
        /**
         * otevřít dialog noveho Produktu
         */
        private openDetailNovyProdukt;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Skupiny produktu
     */
    class SeznamSkupinyProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Skupiny produktu
         */
        private openDetailSkupinyProduktu;
        /**
         * otevřít dialog nove Skupiny produktu
         */
        private openDetailNovaSkupinaProduktu;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Dalsi soubory
     */
    class SeznamDalsiSoubory extends GContentBase {
        /**
         *  DB parametr adt_user_dif - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit nahravaci button
         */
        private uploadButton;
        /**
         * vyvvořit odebiraci button
         */
        private deleteButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
         * otevřít detail ulohy Dalsi soubory
         */
        private openDetail;
        /**
         * otevřít detail okno pro upload souboru
         */
        private openDetailUpload;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Koncicich licenci
     */
    class SeznamObsahReinstGDZ extends GContentBase {
        /**
        * pole s verzemi
        */
        verze: any[];
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * formát sloupců gridu Reinstalační balíky
         */
        private gridFormatReinstGDZ;
        /**
         * element seznamu reinstalacnich GDZ
         */
        private gridReinstGDZ;
        /** element seznamu pro obsah reinstalacnich GDZ*/
        private grid_ObsahReinstGDZ;
        /**
         * formát sloupců gridu Obsah reinstalacnich GDZ
         */
        private gridFormat_ObsahReinstGDZ;
        /**
         * isl view gridu Reinstalacnich GDZ
         */
        private viewReinstGDZ;
        /**
         * isl view gridu Obsah Reinstlacnich GDZ
         */
        private viewObsahReinstGDZ;
        /**
        * element gtabu Obsah reinstalacnich GDZ
        */
        private gtabObsahReinstGDZ;
        /**
        * element gtabu Reinstalacnich GDZ
        */
        private gtabReinstGDZ;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvoři gtab pro Reinstalacni GDZ baliku
         */
        private createGTabReinstGDZ;
        /**
         * vytvořit filterpanel pro seznam Reinstalacnich GDZ baliku
         */
        private createFilterPanelReinstGDZ;
        private createFilterForm;
        /**
         * vytvořit seznam Reinstalacnich GDZ baliku
         */
        private createGridReinstGDZ;
        /**
        * vytvořit formát sloupců seznamu Reinstalacni GDZ baliky
        */
        private createGridFormatReinstGDZ;
        /**
        * vytvořit formát sloupců seznamu Obsah Reinstalacnich GDZ baliku
        */
        private createGridFormatObsahReinstGDZ;
        /**
         * vytvoři gtab pro obsah Reinstalacnich GDZ baliku
         */
        private createGTabObsahReinstGDZ;
        private createGridObsahReinstGDZ;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Seznam Vyvojovych databazi
     */
    class SeznamVyvojoveDatabaze extends GContentBase {
        /**
         *  DB parametr adt_user_licenc - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  aktivita databaze
         */
        private Aktivita_databaze;
        /**
         *  aktivita serveru
         */
        private Aktivita_server;
        /**
         *  Is GINIS
         */
        private Is_GINIS;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * editButton - Tlačítko pro úpravy
         */
        private editButton;
        /**
         * otevřít dialog pro úpravy popisů databází
         */
        private openDetailEditDatabaze;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Chyby (podukol licencnich polatku)
     */
    class SeznamChyby extends GContentBase {
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element seznamu s Historii pristupu
         */
        private gridHistorie;
        /**
         * element informativniho static fieldu
         */
        private staticField;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
        * element subtasku
        */
        private subtasks;
        /**
         * isl view gridu
         */
        private view;
        /**
         * isl view gridu s Historii kontrol
         */
        private viewHistorie;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewController pro Historii kontrol
         */
        private previewControllerHistorie;
        /**
         *  elmenet GPreviewController check
         */
        private checkPreviewController;
        /**
         *  datum platnosti fakturacnich udaju
         */
        private datAkt;
        private rok_zpet;
        private dva_roky_zpet;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit seznam
         */
        private createGridHistorie;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormatHistorie;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         *  vytvořit sidebar
         */
        private createSidebarHistorie;
        /**
         * otevřít detail ulohy Baliky licenci
         */
        private openDetail;
        /**
         * otevřít dialog noveho baliku licenci
         */
        private openDetailNovyBalikLicenci;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Fakturace na jine ICO
     */
    class SeznamFakturaceNaJineICO extends GContentBase {
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         * editMode
         */
        private editMode;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail Fakturace
         */
        private openDetailFakturacePoplatku;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Vyjimky databaze
     */
    class SeznamVyjimkyDatabaze extends GContentBase {
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * editMode
         */
        private editMode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit staticky formulář
         */
        private createStaticForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail Obdobi Bez Lic Poplatku
         */
        private openDetailObdobiBezLicPoplatku;
        /**
         * Vytvoří menu.
         *
         */
        private createMenu;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Vyjimky databaze Pol
     */
    class SeznamVyjimkyDatabazePol extends GContentBase {
        /**
         *  DB parametr adt_user_licpop - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * editMode
         */
        private editMode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail Polozky Bez Lic Poplatku (Položky)
         */
        private openDetailPolBezLicPoplatku;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GChangeLogOptions<TRow> {
        data?: Gordic.Data.View<TRow> | TRow[];
        columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
        virtualCssClass?: string;
        breakWidth?: number;
        customClass?: string;
        rowsClass?: string | ((row: MetaRow<TRow>, columns: GGridColumn<TRow>[], rowIndex: Number) => string) | null;
        groupingHeaderColumns?: ObjectLiteral<GGridColumn<TRow>>;
    }
    /**
     * Dialog pro Přehled všech změn
     */
    class SeznamHistZmen extends GContentBase {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        private _resizeWidthVersion;
        private _headersVersion;
        private _resizeWidthElementVersion;
        private _dataVersion;
        private groupingHeaderColumnsVersion;
        private _styleElementVersion;
        private cssUidVersion;
        private _columnsVersion;
        private _countItemVersion;
        private uuidVersion;
        private _contentVersion;
        private numberRowVersion;
        static widgetNameVersion: string;
        private DataFilter?;
        private priz_ses;
        private priz_public;
        private origHeigth;
        private origWidth;
        private cloneEl;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
        * element tooltipu revize
        * */
        private revtltp;
        private dataFormat;
        private dataExport;
        private dat_od;
        private dat_do;
        private tagySearch;
        private tooltipTagy;
        private fazeSearch;
        private verzeSearch;
        private legZmenySearch;
        private typView;
        private resSearch;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private gridFormatVersion;
        private mainLogsPanel;
        private mainLogsPanelVersion;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private pocetZaznamu;
        private revtooltip;
        private popisTyp;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private renderTest;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn	dané verze
         */
        private viewZmenyVersion;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmenyOrig;
        private tagySearchPublic;
        private fazeSearchPublic;
        /**
         * initFaze	- Inicializační hodnota programových fází
         * @type {string}
         */
        private initFaze;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
        * vytvořit menu
        */
        private createMenuBar;
        /**
         * setMenuButtons - Definice tlačítek
         */
        private setMenuButtons;
        /**
         * createMenuButtons - Akce pro menubar
         */
        private createMenuButtons;
        /**
         * copyLinkButton - Kopírování přímého odkazu na úlohu s Popisy změn
         */
        private copyLinkButton;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * downloadInnerHtml - Generování reportu změn
         *
         * @param {any} filename
         * @param {any} elId
         * @param {any} mimeType
         * @param {any} dataRange
         * @param {any} dataFormat
         */
        private downloadInnerHtml;
        private getOuterHTMLWithInlineStyle;
        private getRule;
        private downloadInnerHtmlVersion;
        private createFilterForm;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private createGridFormat;
        _unEscape(htmlStr: string): string;
        htmlDecode(input: string): string;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        private configProfile;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        private ulozPopisKomponenty;
        /**
         * getChangeLogsPanel	- vykreslení uložených changelog panelů z databáze (groupování dle revizí)
         */
        private getChangeLogsPanels;
        private getMdProcessor;
        /**
         * createEditContent
         *
         * @param {string[]} fieldTags
         * @param {string} cntName
         */
        private createEditContent;
        /**
         * loadChangeLogsPanel	- načtení uložených changelog panelů z databáze
         */
        private loadChangeLogsWrapper;
        setGroupingProcessor(view: Data.View<Gordic.Adt.Interface.GPopisZmenyDto>, typeOfView: string): void;
        /**
         * createMainLogsPanel	- Vykreslení popisů změn dané verze do main panelu
         */
        private createMainLogsPanelVersion;
        /**
        * nastavit data
        */
        private _createChangeLogVersion;
        private createGridFormatVersion;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _createVersion(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingVersion(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setDataVersion(data: any): void;
        _reloadDataVersion(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsVersion(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickVersion(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataVersion(rows: any[]): any[];
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesVersion(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * filterData
         *
         * @param {any} value
         */
        private filterData;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Hlavní content úlohy Popisy změn
     */
    class SeznamPopisyZmen extends GContentBase {
        /**
        * Dto pro seznam Komponent s popuisy změn
        */
        private GSkupinyTaguDto?;
        private dataDto;
        private cntChangeLog;
        /**
         * Nov popis spolen komponenty
         */
        private toolDescriptionText;
        private nazevText;
        private cssButton;
        private jeNastaveno;
        private emptyForm;
        private fieldVyberTagu;
        /**
         * Inkrementační properta komponent
         */
        private counterGroupKomponenty;
        private fieldKomponenty;
        private fieldFaze;
        private verzeDB;
        private fieldTagyHodnoty;
        private typZmeny;
        /**
         * typ komponenty - 0 = Fáze / 20 = Komponenta / 30 = Sestava / 50 = Databáze
         * @type {number}
         * @default 0
         */
        private typKmp;
        private typVid;
        private fieldTagy;
        private fieldStaticTags;
        private activeSubtaskItem;
        /**
         * Inkrementační properta fází
         */
        private counterGroupFaze;
        /**
         * element contentu pro zadávání popisů změn komponent
         */
        private contentKomponenty;
        private tagsFieldNovaKomponenta;
        private mainTagNovaKomponenta;
        private activeParam;
        /**
         * element contentu pro zadávání popisů změn programových fází
         */
        private contentFaze;
        /**
         * element contentu pro zadávání popisů změn v Databázích
         */
        private contentDatabaze;
        /**
         * element pro nový pois zmen komponent
         * @type {JQuery<HTMLElement>}
         */
        private elementNovyPopisZmenKomponent;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element prázdného seznamu pro společné komponenty
         */
        private tableKomponenty;
        /**
         * element prázdného seznamu programových fází
         */
        private tableFaze;
        /**
         * element prázdného seznamu databazovych zmen
         */
        private tableDatabaze;
        private elementInlineDialog;
        /**
         * element políčka pro přidání popisu změny společné komponenty
         */
        private mdfieldKomponenty;
        /**
        * element subtasku pro jednotlivé Popisy změn
        */
        private subtaskPopisyZmen;
        /**
        * element menu k zalozce Spolecnych komponent
        */
        private subtaskSubMenu;
        /**
         * gtab pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private gtabPridatPopisZmenyModulu;
        private dataReaderTagy;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavení titulku dialogu
         */
        private setTitle;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * setMenuButtons - Definice tlačítek
         */
        private setMenuButtons;
        /**
         * createMenuButtons - Akce pro menubar
         */
        private createMenuButtons;
        /**
         * copyLinkButton - Kopírování přímého odkazu na úlohu s Popisy změn
         */
        private copyLinkButton;
        /**
         * vytvoření základních contentů pro zadávání popisů změn
         */
        private createSubContents;
        private createEmptyContent;
        /**
         * vytvoření hlavních gtabů na jednotlivých contentech
         */
        private createMainContents;
        private createFormTab;
        /**
         * Dialog nového popisu zmněn
         */
        private openDetailNovyPopis;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit gtab/y pro nove popisy změn Komponent
         */
        private createGTabPopisZmenyKomponent;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
        /** vytvořit statusbar */
        private createNewContent;
        /**
         * loadDataReader
         */
        private loadDataReader;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Hlavní content úlohy Popisy změn
     */
    class SeznamPopisyZmenKomponent extends GContentBase {
        /**
        * Dto pro seznam Historie změn komponent
        */
        private GChangelogDto?;
        private cntChangeLog;
        /**
         * Nov popis spolen komponenty
         */
        private toolDescriptionText;
        private nazevText;
        private cssButton;
        private jeNastaveno;
        private emptyForm;
        /**
         * Inkrementační properta komponent
         */
        private counterGroupKomponenty;
        private fieldKomponenty;
        private fieldFaze;
        private verzeDB;
        private fieldTagyHodnoty;
        private typZmeny;
        private typVid;
        private fieldTagy;
        private activeSubtaskItem;
        /**
         * Inkrementační properta fází
         */
        private counterGroupFaze;
        /**
         * element contentu pro zadávání popisů změn komponent
         */
        private contentKomponenty;
        /**
         * element contentu pro zadávání popisů změn programových fází
         */
        private contentFaze;
        /**
         * element contentu pro zadávání popisů změn v Databázích
         */
        private contentDatabaze;
        /**
         * element pro nový pois zmen komponent
         * @type {JQuery<HTMLElement>}
         */
        private elementNovyPopisZmenKomponent;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element prázdného seznamu pro společné komponenty
         */
        private tableKomponenty;
        /**
         * element prázdného seznamu programových fází
         */
        private tableFaze;
        /**
         * element prázdného seznamu databazovych zmen
         */
        private tableDatabaze;
        private elementInlineDialog;
        /**
         * element políčka pro přidání popisu změny společné komponenty
         */
        private mdfieldKomponenty;
        /**
        * element subtasku pro jednotlivé Popisy změn
        */
        private subtaskPopisyZmen;
        /**
        * element menu k zalozce Spolecnych komponent
        */
        private subtaskSubMenu;
        /**
         * gtab pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private gtabPridatPopisZmenyModulu;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavení titulku dialogu
         */
        private setTitle;
        /**
         * vytvoření základních contentů pro zadávání popisů změn
         */
        private createSubContents;
        private createEmptyContent;
        /**
         * vytvoření hlavních gtabů na jednotlivých contentech
         */
        private createMainContents;
        private createFormTab;
        /**
         * Dialog nového popisu zmněn
         */
        private openDetailNovyPopis;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit gtab/y pro nove popisy změn Komponent
         */
        private createGTabPopisZmenyKomponent;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
        /** vytvořit statusbar */
        private createNewContent;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Tagy programových fází
     */
    class SeznamTagyFaze extends GContentBase {
        /**
         *  DB parametr adt_user_cenik - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * element bunky gridu s tagy
         */
        private tagCell;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        /**
         *  aktivita zaznamu
         */
        private Aktivita;
        /**
         *  filtr na modulove faze
         */
        private Moduly;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Produktove listy
         */
        private openDetail;
        /** vytvořit commandbar */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Hlavní content úlohy Popisy změn
     */
    class SeznamVyberTagu extends GContentBase {
        /**
         * typ komponenty - 0 = Fáze / 20 = Komponenta / 30 = Sestava / 50 = Databáze
         * @type {number}
         * @default 0
         */
        private typKmp;
        /**
        * Pole pro získání tagů pro nový popis
        */
        private poleHodnot;
        /**
        * element subtasku pro jednotlivé Popisy změn
        */
        private subtaskTags;
        /**
        * element gridu s fázemi
        */
        private gridFaze;
        /**
        * element gridu s revizemi
        */
        private gridRevize;
        /**
        * element gridu s GDZ balíky
        */
        private gridGDZ;
        /**
        * element gridu s verzemi DB
        */
        private gridVerze;
        /**
        * element gridu s typem modulu
        */
        private gridTypModulu;
        /**
         * formát sloupců gridu	s fazemi
         */
        private gridFazeFormat;
        /**
         * formát sloupců gridu	s revizemi
         */
        private gridRevizeFormat;
        /**
         * formát sloupců gridu	s GDZ balíky
         */
        private gridGDZFormat;
        /**
         * formát sloupců gridu	s verzemi DB
         */
        private gridVerzeFormat;
        /**
         * formát sloupců gridu	s typem modulu
         */
        private gridTypModuluFormat;
        /**
         * isl view gridu k programovým fázím
         */
        private viewFaze;
        /**
         * isl view gridu k revizím
         */
        private viewRevize;
        /**
         * isl view gridu ke GDZ balíkům
         */
        private viewGDZ;
        /**
         * isl view gridu k verzím DB
         */
        private viewVerze;
        /**
         * isl view gridu k typu modulu
         */
        private viewTypModulu;
        /**
         * isl view gridu k typu modulu
         */
        private Orj;
        /**
        * element filterpanelu
        * */
        private filter;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavení titulku dialogu
         */
        private setTitle;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
        /**
         * vytvořit seznam Fází
         */
        private createGridFaze;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFazeFormat;
        /**
         * vytvořit seznam Verzí
         */
        private createGridVerze;
        /**
         * vytvořit formát sloupců seznamu verzí
         */
        private createGridVerzeFormat;
        /**
         * vytvořit seznam Revizí
         */
        private createGridRevize;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridRevizeFormat;
        /**
         * vytvořit seznam GDZ balíků
         */
        private createGridGDZ;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridGDZFormat;
        /**
         * vytvořit seznam Verzí
         */
        private createGridTypModulu;
        /**
         * vytvořit formát sloupců seznamu verzí
         */
        private createGridTypModuluFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * vytvoři filtr pro seznam revizí
         */
        private createFilterRev;
        private createFilterForm;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Prehled komponent
     */
    class SeznamPrehledKomponent extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  aktivita zaznamu
         */
        private Aktivita;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  elmenet previewDiv
         */
        private previewDiv;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        /**
         * otevřít detail ulohy Baliky licenci
         */
        private openDetail;
        /** vytvořit sidebar */
        private createSidebar;
        /** vytvořit panel */
        private createPanel;
        private createPreviewDiv;
        private enablePreview;
        private loadPreview;
        private showPreview;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Baliky licenci
     */
    class SeznamBalikyLicenci extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  DB parametr adt_user_azure - Řízení specifického přístupu k ADT07 pro členy týmu Azure
         */
        private UserParamAzure;
        /**
         *  aktivita zaznamu
         */
        private Aktivita;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Identifikator baliku licenci ixs_lip
         */
        private ixs_lip;
        /**
         * element filterpanelu pro radu G1
         */
        private filterRadaG1;
        /**
         * element filterpanelu pro radu G0
         */
        private filterRadaG0;
        /**
         * element filterpanelu pro radu G3
         */
        private filterRadaG3;
        /**
         * formát sloupců gridu pro radu G1
         */
        private gridFormatRadaG1;
        /**
         * formát sloupců gridu pro radu G0
         */
        private gridFormatRadaG0;
        /**
         * formát sloupců gridu pro radu G3
         */
        private gridFormatRadaG3;
        /**
         * element seznamu pro radu G1
         */
        private gridRadaG1;
        /**
         * element seznamu pro radu G0
         */
        private gridRadaG0;
        /**
         * element seznamu pro radu G3
         */
        private gridRadaG3;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        /**
         * radek gridu vybrany pres defaultaction
         */
        private gridRow;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu pro radu G1
         */
        private viewRadaG1;
        /**
         * isl view gridu pro radu G0
         */
        private viewRadaG0;
        /**
         * isl view gridu pro radu G3
         */
        private viewRadaG3;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewController check
         */
        private checkPreviewController;
        /**
        *  vybrane balikyLicenci
        * */
        private vybraneBaliky;
        /**
         * Pole vybranych radku z gridu baliku licenci
         */
        private balikyLicVyberRadku;
        private dataCheckedView;
        /**
        * element subtasku pro jednotlivé produktové řady (G0/G1/G3) - defaultně zvolená řada = G1, ref T28577
        */
        private subtaskProduktoveRady;
        private radaG1Active;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtrpanel pro radu G1
         */
        private createFilterRadaG1;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit filtrpanel pro radu G0
         */
        private createFilterRadaG0;
        /**
         * vytvořit filtrpanel pro radu G3
         */
        private createFilterRadaG3;
        /**
         * vytvořit seznam baliku licenci pro radu G1
         */
        private createGridRadaG1;
        /**
         * vytvořit formát sloupců seznamu baliku licenci rady G1
         */
        private createGridFormatRadaG1;
        /**
         * vytvořit seznam baliku licenci pro radu G0
         */
        private createGridRadaG0;
        /**
         * vytvořit formát sloupců seznamu baliku licenci rady G0
         */
        private createGridFormatRadaG0;
        /**
         * vytvořit seznam baliku licenci pro radu G3
         */
        private createGridRadaG3;
        /**
         * vytvořit formát sloupců seznamu baliku licenci rady G3
         */
        private createGridFormatRadaG3;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit ImportG0 button
         */
        private importG0Button;
        /**
         * vyvvořit Delete button
         */
        private DeleteButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Baliky licenci pro radu produktu G1
         */
        private openDetailG1;
        /**
         * otevřít detail ulohy Baliky licenci pro radu produktu G0
         */
        private openDetailG0;
        /**
         * otevřít detail ulohy Baliky licenci pro radu produktu G3
         */
        private openDetailG3;
        /**
         * otevřít dialog noveho baliku licenci rady G1
         */
        private openDetailNovyBalikLicenciG1;
        /**
         * otevřít dialog noveho baliku licenci rady G0
         */
        private openDetailNovyBalikLicenciG0;
        /**
         * otevřít dialog noveho baliku licenci rady G3
         */
        private openDetailNovyBalikLicenciG3;
        /**
         * otevřít dialog hromadné úpravy balíků licencí rady G1
         */
        private openDetailEditBalikyLicenciG1;
        /**
         * otevřít dialog hromadné úpravy balíků licencí rady G0
         */
        private openDetailEditBalikyLicenciG0;
        /**
         * otevřít dialog hromadné úpravy balíků licencí rady G3
         */
        private openDetailEditBalikyLicenciG3;
        /**
        * otevřít import dialog baliku licenci rady G0
        */
        private openDetailImportG0;
        /**
        * otevřít detail Historie balíků licencí rady G1
        */
        private openDetailHistoryBalikyLicenciG1;
        /**
        * otevřít detail Historie balíků licencí rady G0
        */
        private openDetailHistoryBalikyLicenciG0;
        /**
        * otevřít detail Historie balíků licencí rady G3
        */
        private openDetailHistoryBalikyLicenciG3;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1/G3) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Baliky licenci (Registr Licenci -> Primarni licence -> Fyzicke databaze -> Seznam Baliky licenci)
     */
    class SeznamFyzDBBalLic extends GContentBase {
        /**
         * licence
         */
        private db_guid;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * editMode
         */
        private editMode;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit upravit button
         */
        private upravitButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vyvvořit aktualizovat button
         */
        private aktualizovatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         * otevřít detail Baliky licenci
         */
        private openDetailFyzDBBalLic;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Baliky licenci (Registr Licenci -> Primarni licence databazi -> Licence rad -> Seznam baliky licenci)
     */
    class SeznamFyzDBSkupinyDB extends GContentBase {
        /**
         * licence
         */
        private db_guid;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * editMode
         */
        private editMode;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit upravit button
         */
        private upravitButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vyvvořit aktualizovat button
         */
        private aktualizovatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy ICO pro administraci
     */
    class SeznamIcoProAdm extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy ICO pro administraci
         */
        private openDetail;
        /**
         * otevřít dialog noveho ICA pro administraci
         */
        private openDetailNoveIcoAdm;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy ICO pro fakturaci
     */
    class SeznamIcoProFakt extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy ICO pro fakturaci
         */
        private openDetail;
        /**
         * otevřít dialog noveho ICA pro fakturaci
         */
        private openDetailNoveIcoFakt;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Komentare k licenci (Registr Licenci -> Baliky licenci -> Obsah baliku licenci -> Seznam Kometare k licenci)
     */
    class SeznamKomentareKLicenci extends GContentBase {
        /**
         * identifikátor balíku licencí
         */
        private ixs_lip;
        /**
         * identifikátor řádku balíku licencí
         */
        private radek_lip;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * editMode
         */
        private editMode;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit historie button
         */
        private historieButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit upravit button
         */
        private upravitButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vyvvořit aktualizovat button
         */
        private aktualizovatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         * otevřít detail Komentare k licenci
         */
        private openDetailKomentareKLicenci;
        /**
         * otevřít Historii Komentare k licenci
         */
        private openDetailHist;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Koncicich licenci
     */
    class SeznamKonciciLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Baliky licenci (Registr Licenci -> Primarni licence -> Licence rad -> Seznam baliky licenci)
     */
    class SeznamLicRadBalLic extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * editMode
         */
        private editMode;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit upravit button
         */
        private upravitButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vyvvořit aktualizovat button
         */
        private aktualizovatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         * otevřít detail ulohy Baliky licenci
         */
        private openDetail;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Seznam ulohy Licence Databazi (Slouceni původnich poduloh: Prehled licenci Databaze + Primarni licence), ref T23567
     */
    class SeznamLicenceDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu pro radu G1
         */
        private filterRadaG1;
        /**
         * element filterpanelu pro radu G0
         */
        private filterRadaG0;
        /**
         * element filterpanelu pro radu G3
         */
        private filterRadaG3;
        /**
         * formát sloupců gridu rady G1
         */
        private gridFormatRadaG1;
        /**
         * formát sloupců gridu rady G0
         */
        private gridFormatRadaG0;
        /**
         * formát sloupců gridu rady G3
         */
        private gridFormatRadaG3;
        /**
         * sidebarPanelInfo - priznak basepanelu s kontrolou administrace
         * @type {boolean}
         * @default false
         */
        private sidebarPanelInfo;
        /**
         * sidebarPanelCompare - priznak basepanelu s porovnáním obsahu licecí DB
         * @type {boolean}
         * @default false
         */
        private sidebarPanelCompare;
        /**
         * element seznamu rady G1
         */
        private gridRadaG1;
        /**
         * element seznamu rady G3
         */
        private gridRadaG3;
        private radaG1Active;
        /**
         * element seznamu rady G0
         */
        private gridRadaG0;
        /**
         * element seznamu s výberem radku
         */
        private gridSelection;
        /**
         * isl view gridu - Rada G1
         */
        private viewRadaG1;
        /**
         * isl view gridu - Rada G0
         */
        private viewRadaG0;
        /**
         * isl view gridu - Rada G3
         */
        private viewRadaG3;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet GPreviewController
         */
        private previewCompareController;
        private dataCheckedView;
        private counterObj;
        private selectionCounter;
        private checkCounterObj;
        private selectedObj;
        private checkSelectedObj;
        /**
         *  elmenet previewDiv
         */
        private previewDivInfo;
        /**
         *  elmenet previewDiv
         */
        private previewDivCompare;
        /**
         *  kontrola supervizora
         */
        private adminMode;
        /**
         * isComparisonInited - Příznak započatého porovnávání
         * @type {boolean}
         */
        private isComparisonInited;
        /**
         * Content pro zobrazení výsledku porovnání
         */
        private comparisonCnt$;
        /**
         * Badge element pro zobrazení počtu porovnávaných záznamů
         */
        private comparisonBadge;
        private selectionActivated;
        /**
         * compareRows
         * @type {any}
         */
        private compareRows;
        /**
         * element comparatoru
         */
        private comparator;
        /**
         * counterLic
         * @type {number}
         * @default 0
         */
        private counterLic;
        /**
         * rightSbComparator$
         */
        private rightSbComparator$;
        /**
        * element subtasku pro jednotlivé produktové řady (G0/G1/G3) - defaultně zvolená řada = G1, ref T28577
        */
        private subtaskProduktoveRady;
        private licDBField;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr - Rada G1
         */
        private createFilterRadaG1;
        /**
         * vytvořit filtr - Rada G0
         */
        private createFilterRadaG0;
        /**
         * vytvořit filtr - Rada G3
         */
        private createFilterRadaG3;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam - Rada G1
         */
        private createGridRadaG1;
        /**
         * vytvořit formát sloupců seznamu - Rada G1
         */
        private createGridRadaG1Format;
        /**
         * vytvořit seznam - Rada G0
         */
        private createGridRadaG0;
        /**
         * vytvořit formát sloupců seznamu - Rada G0
         */
        private createGridRadaG0Format;
        /**
         * vytvořit seznam - Rada G3
         */
        private createGridRadaG3;
        /**
         * vytvořit formát sloupců seznamu - Rada G3
         */
        private createGridRadaG3Format;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        private compareButton;
        /**
        * metoda doComparison - Spustí porovnání
        */
        private doComparison;
        /**
        * createComparisonFormat - Vytvori format sloupcu porovnavace
        */
        private createComparisonFormat;
        /**
         * showComparison - Funkce pro zobrazení/přidání do porovnávače
         *
         * @param {any} metaRows
         */
        private showComparison;
        /**
         * addToComparison - Přidání licence do porovnání
         *
         * @param {any} rows
         */
        private addToComparison;
        /**
     * metoda clearComparison - Provede vyčištění porovnávacího okna
     */
        private clearComparison;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        private createPreviewDivInfo;
        /**
         * createPreviewDivCompare
         */
        private createPreviewDivCompare;
        private enablePreviewInfo;
        private enablePreviewCompare;
        /**
         * loadPreviewInfo - načtení kontroly administrace licence DB
         */
        private loadPreviewInfo;
        /**
         * loadPreviewCompare - načtení kontroly obsahu ceníků
         */
        private loadPreviewCompare;
        /**
         * otevřít detail ulohy Licence databaze rady G1
         */
        private openDetailG1;
        /**
         * otevřít detail ulohy Licence databaze rady G0
         */
        private openDetailG0;
        /**
         * otevřít detail ulohy Licence databaze rady G3
         */
        private openDetailG3;
        /**
         * otevřít dialog nove Licence databaáze
         */
        private openDetailNovaLicDB;
        /**
         * otevřít detail Historie Primarnich licenci
         */
        private openDetailHistorieLicDB;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1/G3) - defaultně zvolená řada = G1, ref T28577
         */
        private createSubtasks;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Licence rad PID
     */
    class SeznamLicenceRadPID extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  kontrola supervizora
         */
        private adminMode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Licence rad PID
         */
        private openDetail;
        /**
         * otevřít dialog nove licence rad PID
         */
        private openDetailNovaLicRadPID;
        /**
         * otevřít detail Historie Licenci rad PID
         */
        private openDetailHistoryLicRadPID;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Marketingové licence
     */
    class SeznamMarketingoveLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet sidebaru
         */
        private sidebar;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  preview elmenet
         */
        private preview;
        /**
         * Id panelu
         */
        private panelId;
        /**
         * element panelu v sidebaru
         */
        private panelElement;
        /**
         * vybraná licence z gridu
         */
        private vybranaLicence;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         * editMode
         */
        private editmode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * copyLinkButton - Kopírování přímého odkazu na úlohu s Popisy změn
         */
        private copyLinkButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Komentare k licenci (Registr Licenci -> Baliky licenci -> Obsah baliku licenci -> Seznam Období nehrazení lic. poplatků)
     */
    class SeznamObdNehrLicPopl extends GContentBase {
        /**
         * licence
         */
        private ixs_lip;
        /**
         * identifikátor řádku balíku licencí
         */
        private radek_lip;
        /**
         * Identifikator vztahu ke skupine databazi
         */
        private typ_vdb;
        /**
         * editMode
         */
        private editMode;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit historie button
         */
        private historieButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit upravit button
         */
        private upravitButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vyvvořit aktualizovat button
         */
        private aktualizovatButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /**
         * otevřít detail Obdobi nehrazeni licencnich poplatku
         */
        private openDetailObdNehrLicPopl;
        /**
         * otevřít Historii Obdobi nehrazeni licencnich poplatku
         */
        private openDetailHist;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam registru licenci
     */
    class SeznamPrehledLicenciDatabaze extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet sidebaru
         */
        private sidebar;
        /**
         * counterLic
         * @type {number}
         * @default 0
         */
        private counterLic;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  preview elmenet
         */
        private preview;
        /**
         * Badge element pro zobrazení počtu porovnávaných záznamů
         */
        private comparisonBadge;
        /**
         * compareRows
         * @type {any}
         */
        private compareRows;
        /**
         * Content pro zobrazení výsledku porovnání
         */
        private comparisonCnt$;
        private defaultGridFormat;
        /**
         * isComparisonInited - Příznak započatého porovnávání
         * @type {boolean}
         */
        private isComparisonInited;
        /**
         * element comparatoru
         */
        private comparator;
        /**
         * rightSbComparator$
         */
        private rightSbComparator$;
        /**
         * vybraná licence z gridu
         */
        private vybranaLicence;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        private compareButton;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * showComparison - Funkce pro zobrazení/přidání do porovnávače
         *
         * @param {any} metaRows
         */
        private showComparison;
        /**
         * addToComparison - Přidání licence do porovnání
         *
         * @param {any} rows
         */
        private addToComparison;
        /**
         * metoda clearComparison - Provede vyčištění porovnávacího okna
         */
        private clearComparison;
        /**
        * metoda doComparison - Spustí porovnání
        */
        private doComparison;
        /**
         * createComparisonFormat - Vytvori format sloupcu porovnavace
         */
        private createComparisonFormat;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Prehled produktu v Registru licenci
     */
    class SeznamPrehledProduktu extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet sidebaru
         */
        private sidebar;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  preview elmenet
         */
        private preview;
        /**
         * Id panelu
         */
        private panelId;
        /**
         * element panelu v sidebaru
         */
        private panelElement;
        /**
         * vybraná licence z gridu
         */
        private vybranaLicence;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit editační detail button
         */
        private editButton;
        /**
         * vyvvořit delete button
         */
        private deleteButton;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openEditDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    interface GChangeLogOptions<TRow> {
        data?: Gordic.Data.View<TRow> | TRow[];
        columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
        virtualCssClass?: string;
        breakWidth?: number;
        customClass?: string;
        rowsClass?: string | ((row: MetaRow<TRow>, columns: GGridColumn<TRow>[], rowIndex: Number) => string) | null;
        groupingHeaderColumns?: ObjectLiteral<GGridColumn<TRow>>;
    }
    /**
     * Dialog pro Přehled všech změn
     */
    class SeznamPrehledZmenLicDB extends GContentBase {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        private _resizeWidthVersion;
        private _headersVersion;
        private _resizeWidthElementVersion;
        private _dataVersion;
        private groupingHeaderColumnsVersion;
        private _styleElementVersion;
        private cssUidVersion;
        private _columnsVersion;
        private _countItemVersion;
        private uuidVersion;
        private _contentVersion;
        private numberRowVersion;
        static widgetNameVersion: string;
        /**
         * revMaxDatZmenaMax - Nejvyšší datum změny sady zákaznických revizí
         * @type {string}
         */
        private revMaxDatZmenaMax;
        private DataFilter?;
        private priz_ses;
        private priz_public;
        private origHeigth;
        private origWidth;
        private cloneEl;
        /**
        * element filterpanelu
        * */
        private filter;
        private dataFormat;
        private dataExport;
        private dat_od;
        private dat_do;
        private tagySearch;
        private tooltipTagy;
        private fazeSearch;
        private verzeSearch;
        private legZmenySearch;
        private typView;
        private resSearch;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private gridFormatVersion;
        private mainLogsPanel;
        private mainLogsPanelVersion;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private pocetZaznamu;
        private popisTyp;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private renderTest;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn	dané verze
         */
        private viewZmenyVersion;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        private tagySearchPublic;
        private fazeSearchPublic;
        private lic;
        private diff;
        /**
        * element gtabu
        */
        private gtab;
        /**
         * identifikator uploadovaneho souboru
         */
        private file;
        /**
         * Pole s objekty programových fází
         */
        private fazeLicDB;
        /**
         * identifikator uploadovaneho souboru
         */
        private fileImportRevMax;
        /**
         * Typ implementace lcence databáze
         */
        private tyi;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
 * vytvoři gtab pro grid s Vyzadovanymi produkty
 */
        private createGTab;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * downloadInnerHtml - Generování reportu změn
         *
         * @param {any} filename
         * @param {any} elId
         * @param {any} mimeType
         * @param {any} dataRange
         * @param {any} dataFormat
         */
        private downloadInnerHtml;
        private getOuterHTMLWithInlineStyle;
        private getRule;
        private downloadInnerHtmlVersion;
        private createFilterForm;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private createGridFormat;
        _unEscape(htmlStr: string): string;
        htmlDecode(input: string): string;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        private configProfile;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        private ulozPopisKomponenty;
        /**
         * getChangeLogsPanel	- vykreslení uložených changelog panelů z databáze (groupování dle revizí)
         */
        private getChangeLogsPanels;
        private getMdProcessor;
        /**
         * createEditContent
         *
         * @param {string[]} fieldTags
         * @param {string} cntName
         */
        private createEditContent;
        /**
         * loadChangeLogsPanel	- načtení uložených changelog panelů z databáze
         */
        private loadChangeLogsWrapper;
        setGroupingProcessor(view: Data.View<Gordic.Adt.Interface.GPopisZmenyDto>, typeOfView: string): void;
        /**
         * createMainLogsPanel	- Vykreslení popisů změn dané verze do main panelu
         */
        private createMainLogsPanelVersion;
        /**
        * nastavit data
        */
        private _createChangeLogVersion;
        private createGridFormatVersion;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _createVersion(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingVersion(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setDataVersion(data: any): void;
        _reloadDataVersion(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsVersion(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickVersion(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataVersion(rows: any[]): any[];
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesVersion(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Primarni licence databazi
     */
    class SeznamPrimarniLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  kontrola supervizora
         */
        private adminMode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Primarni licence
         */
        private openDetail;
        /**
         * otevřít dialog nove Primarni licence
         */
        private openDetailNovaPrimLic;
        /**
         * otevřít detail Historie Primarnich licenci
         */
        private openDetailHistoryPrimLicDB;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Koncicich licenci
     */
    class SeznamPristupovaPrava extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         *  Nazev aktualni skupiny DB
         */
        private nazevSkupinyDB;
        /**
         *  Nazev funkce prihlaseneho uzivatele
         */
        private NazevFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * formát sloupců gridu Baliky licenci
         */
        private gridFormatBalikyLicenci;
        /**
         * element seznamu
         */
        private grid;
        /** element seznamu pro obsah Skupiny DB*/
        private grid_ObsahSkupinyDB;
        /**
         * element seznamu Baliku licenci
         */
        private grid_BalikyLicenci;
        /**
         * search columns pro grid Obsahu Skupiny DB
         */
        private columns_Obsah_SkupinyDB;
        /**
         * formát sloupců gridu Obsah skupiny DB
         */
        private gridFormat_Obsah_SkupinyDB;
        /**
         * isl view gridu
         */
        private view;
        /**
         * isl view gridu Obsah skupiny DB
         */
        private viewObsahSkupinyDB;
        /**
         * isl view gridu Baliky licenci
         */
        private viewBalikyLicenci;
        /**
        * element gtabu Skupiny databazi
        */
        private gtabSkupinyDB;
        /**
        * element gtabu
        */
        private gtab;
        /**
        * element gtabu Baliky licenci
        */
        private gtabBalikyLicenci;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvorit content
         */
        private create;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
        * vytvořit formát sloupců seznamu Pristupova prava
        */
        private createGridFormat;
        /**
         * vytvoři gtab pro dostupne Skupiny DB
         */
        private createGTabSkupinyDB;
        /**
         * vytvoři gtab pro obsah Skupiny DB
         */
        private createGTab;
        private createGridObsahSkupinyDBGTab;
        /**
        * vytvořit formát sloupců seznamu Obsah skupiny DB
        */
        private createGridFormat_ObsahSkupinyDB_GTab;
        /**
         * vytvoři gtab pro obsah Skupiny DB
         */
        private createGTabBalikyLicenci;
        /**
         * vytvořit seznam
         */
        private createGridBalikyLicenci;
        /**
        * vytvořit formát sloupců seznamu Pristupova prava
        */
        private createGridFormatBalikyLicenci;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam ulohy Skupiny databazi
     */
    class SeznamSkupinyDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * element filterpanelu pro radu G0
         */
        private filterRadaG0;
        /**
         * element filterpanelu pro radu G3
         */
        private filterRadaG3;
        /**
         * element seznamu
         */
        private grid;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * formát sloupců gridu	rady G0
         */
        private gridFormatRadaG0;
        /**
         * formát sloupců gridu	rady G3
         */
        private gridFormatRadaG3;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * isl view gridu
         */
        private view;
        /**
         * isl view gridu - Rada G0
         */
        private viewRadaG0;
        /**
         * isl view gridu - Rada G3
         */
        private viewRadaG3;
        /**
        * element subtasku pro jednotlivé produktové řady (G0/G1/G3) - defaultně zvolená řada = G1, ref T39065
        */
        private subtaskProduktoveRady;
        /**
         * radaG1Active - Příznak aktivní produktové řady
         * @type {boolean}
         * @default true
         */
        private radaG1Active;
        /**
         * element seznamu rady G0
         */
        private gridRadaG0;
        /**
         * element seznamu rady G3
         */
        private gridRadaG3;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit filtr
         */
        private createFilterRadaG0;
        /**
         * vytvořit formulář filtru
         */
        private createFilterRadaG0Form;
        /**
         * vytvořit filtr
         */
        private createFilterRadaG3;
        /**
         * vytvořit formulář filtru
         */
        private createFilterRadaG3Form;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit seznam pro řadu G0
         */
        private createGridRadaG0;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormatRadaG0;
        /**
         * vytvořit seznam pro řadu G3
         */
        private createGridRadaG3;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormatRadaG3;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * vyvvořit history button
         */
        private historyButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * otevřít detail ulohy Skupiny databazi
         */
        private openDetail;
        /**
         * otevřít detail ulohy Skupiny databazi pro řadu licencí G0
         */
        private openDetailRadaG0;
        /**
         * otevřít detail ulohy Skupiny databazi pro řadu licencí G3
         */
        private openDetailRadaG3;
        /**
         * otevřít detail ulohy Skupiny databazi
         */
        private openDetailNovaSkupinaDatabazi;
        /**
         * otevřít dialog nové Skupiny databazi rady G0
         */
        private openDetailNovaSkupinaDatabaziRadaG0;
        /**
         * otevřít dialog nové Skupiny databazi rady G3
         */
        private openDetailNovaSkupinaDatabaziRadaG3;
        /**
         * otevřít detail Historie Skupiny databazi
         */
        private openDetailHistorySkupinyDB;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1/G3) - defaultně zvolená řada = G1, ref T39065
         */
        private createSubtasks;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Marketingové licence
     */
    class SeznamTechnologickeLicence extends GContentBase {
        /**
         *  DB parametr adt_user_licence - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet sidebaru
         */
        private sidebar;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  preview elmenet
         */
        private preview;
        /**
         * Id panelu
         */
        private panelId;
        /**
         * element panelu v sidebaru
         */
        private panelElement;
        /**
         * vybraná licence z gridu
         */
        private vybranaLicence;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        /**
         * editMode
         */
        private editmode;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit pridat button
         */
        private pridatButton;
        /**
         * copyLinkButton - Kopírování přímého odkazu na úlohu s Popisy změn
         */
        private copyLinkButton;
        /**
         * vyvvořit edit button
         */
        private editButton;
        /**
         * vyvvořit odstranit button
         */
        private odstranitButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * Získání filtračních hodnot z filterpanelu
         */
        private getFilterValues;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog Authentikace experního režimu databáze
     */
    class GAuthenticatorDlg extends GContentBase {
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Databazi
     */
    class SeznamDatabazi extends GContentBase {
        /**
         *  DB parametr adt_user_stat- pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private viewDatabaze;
        private gridProfileUserSettings;
        /**
        * pole s verzemi
        */
        verze: any[];
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
    }
}
declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog pro seznam Spousteni fazi v Registru licenci
     */
    class SeznamSpousteniFazi extends GContentBase {
        /**
         *  DB parametr adt_user_stat- pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * isl view gridu
         */
        private view;
        private gridProfileUserSettings;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * Funkce volaná při zavírání dialogu.
         */
        private closing;
    }
}
