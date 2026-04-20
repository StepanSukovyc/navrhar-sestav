/**
 * GUdaDialogs.ts
 *
 * @author Jindřich Vácha
 * @since 480.2.0.0
 */
declare namespace Gordic.Uda.Dialogs {
    /**
     * Vyvěšení na úřední desku
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    function VyveseniNaUredniDesku(parentContent: GContent, opt?: {
        /**
         * Ixp dokladu – povinné
         * @type {string}
         */
        Ixp: string;
        /**
         * Ixb souboru – volitelné, bude zaškrtnut
         * @type {string}
         */
        Ixb?: string;
        /**
         * Název – volitelné, předvyplní se
         * @type {string}
         */
        Nazev?: string;
        /**
         * Popis – volitelné, předvyplní se
         * @type {string}
         */
        Popis?: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Zveřejnění souboru
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    function ZverejneniSouboru(parentContent: GContent, opt?: {
        /**
         * Ixb souboru – povinné
         * @type {string}
         */
        Ixb: string;
        /**
         * Ixp dokladu – volitelné, ale raději uvést
         * @type {string}
         */
        Ixp?: string;
        /**
         * Název / titulek – volitelné, předvyplní se
         * @type {string}
         */
        Nazev?: string;
        /**
         * Popis – volitelné, předvyplní se
         * @type {string}
         */
        Popis?: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Zveřejnění souboru
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    function ZverejneniSouboruHistorie(parentContent: GContent, opt?: {
        /**
         * Ixb souboru – povinné
         * @type {string}
         */
        Ixb: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQuery | undefined;
}
declare namespace Gordic.Uda.WebControls {
    /**
     * Všeobecné testy
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class ObecneTesty extends GContentBase {
        taskId: string;
        /**
         * model (definovane jako ContentValues)
         * @type {Gordic.Uda.WebControls.ObecneTestyDto}
         */
        protected model: Gordic.Uda.WebControls.ObecneTestyDto;
        /**
         * model (definovane jako ContentValues)
         * @type {Gordic.Uda.WebControls.ObecneTestyDto}
         */
        protected jsonProp?: Gordic.Uda.WebControls.ObecneTestyDto;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
        /**
         * otevriVyveseni
         *
         * @param {Gordic.Gin.Globals.Enums.ModOtevreni} mod
         */
        private otevriVyveseni;
        private setJsonProperty;
        private emptyJsonProperty;
        private setSession;
        private emptySession;
        private logNastaveni;
        private varLetTest;
    }
}
declare namespace Gordic.Uda.WebControls {
    /**
     * SamplePage
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class SamplePage extends GContentBase {
        /**
         * model
         * @type {Gordic.Uda.WebControls.SamplePageDto}
         */
        protected model: Gordic.Uda.WebControls.SamplePageDto;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
    }
}
declare namespace Gordic.Uda.WebControls {
    /**
     * Test bez cs
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class TestBezCs extends GContentBase {
        taskId: string;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
    }
}
declare namespace Gordic.Uda.WebControls {
    /**
     * Vyvěšení na úřední desku
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class VyveseniTabs extends GContentBase {
        taskId: string;
        /**
         * Obsah tabu (subtasku) vyvěšení
         * @type {JQuery}
         */
        private $vyveseniDiv;
        /**
         * Obsah tabu (subtasku) historie
         * @type {JQuery}
         */
        private $historyDiv;
        /**
         * Grid se souborama pro vyvěšení
         * @type {JQuery}
         */
        private $gridVyveseniSoubory;
        /**
         * Grid s historií
         * @type {JQuery}
         */
        private $gridHistory;
        /**
         * Výpis detailu řádku historie (dynamicky při změně řádku – zdrojem pro data je history grid)
         * @type {JQuery}
         */
        private $historyDetailTabObsah;
        /**
         * Grid s vyvěšenýma souborama u záznamu historie
         * @type {JQuery}
         */
        private $gridHistorySoubory;
        /**
         * Zda už došlo k loadu vyveseni tab
         * @type {boolean}
         */
        private isVyveseniTabAlreadyLoaded;
        /**
         * Zda už došlo k loadu hist. tab
         * @type {boolean}
         */
        private isHistorieTabAlreadyLoaded;
        /**
         * model (definovane jako ContentValues)
         * @type {Gordic.Uda.WebControls.VyveseniTabsDto}
         */
        protected model: Gordic.Uda.WebControls.VyveseniTabsDto;
        /**
         * validators (definovane jako ContentValues)
         * @type {any}
         */
        protected validators: any;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
        /**
         * 'closing()' okna – test, jestli je možné okno zavřít
         *
         * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít), boolean určuje, jestli přeselektovat seznam (true) nebo ne (false)
         */
        closing(): JQueryPromise<any>;
        /**
         * Tab (subtask) 'Vyvěšení'
         */
        private LoadVyveseniTab;
        /**
         * Tab (subtask) historie
         */
        private LoadHistorieTab;
        /**
         * Uložení
         */
        private saveDetail;
        /**
         * Uložení (vlastní)
         */
        private saveDetailReal;
        /**
         * Zobrazení detailu k řádku historie (data se berou z gridu – i data gridu souborů)
         */
        private showHistoryDetail;
    }
}
declare namespace Gordic.Uda.WebControls {
    /**
     * SeznamVyveseni
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class SeznamVyveseni extends GContentBase {
        /**
         * Filtr nad gridem
         * @type {JQuery}
         */
        private $filterForm;
        /**
         * Aktuální hodnoty filtru
         * @type {Gordic.Uda.Interface.SeznamDokumentuUDFilterDto | null}
         */
        private currentFilter;
        /**
         * Grid se seznamem
         * @type {JQuery}
         */
        private $grid;
        /**
         * model
         * @type {Gordic.Uda.WebControls.SeznamVyveseniDto}
         */
        protected model: Gordic.Uda.WebControls.SeznamVyveseniDto;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
        private nacteniSeznamu;
        /**
         * Nastavení prvků ve formuláři
         */
        private enable;
    }
}
declare namespace Gordic.Uda.WebControls {
    /**
     * Zveřejnění el. obrazu / přílohy do poblikačního úložiště
     *
     * @author Jindřich Vácha
     * @since 480.2.0.0
     */
    class ZverejneniTabs extends GContentBase {
        /**
         * Obsah tabu (subtasku) zveřejnění
         * @type {JQuery}
         */
        private $zverejneniDiv;
        /**
         * Obsah tabu (subtasku) historie
         * @type {JQuery}
         */
        private $historyDiv;
        /**
         * Grid s historií
         * @type {JQuery}
         */
        private $gridHistory;
        /**
         * Výpis detailu řádku historie (dynamicky při změně řádku – zdrojem pro data je history grid)
         * @type {JQuery}
         */
        private $historyDetailTabObsah;
        /**
         * Zda už došlo k loadu zveřejnění tab
         * @type {boolean}
         */
        private isZverejneniTabAlreadyLoaded;
        /**
         * Zda už došlo k loadu hist. tab
         * @type {boolean}
         */
        private isHistorieTabAlreadyLoaded;
        /**
         * model (definovane jako ContentValues)
         * @type {Gordic.Uda.WebControls.ZverejneniDto}
         */
        protected model: Gordic.Uda.WebControls.ZverejneniDto;
        /**
         * validators (definovane jako ContentValues)
         * @type {any}
         */
        protected validators: any;
        /**
         * Definice formuláře
         */
        onContentReady(): void;
        /**
         * 'closing()' okna – test, jestli je možné okno zavřít
         *
         * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít), boolean určuje, jestli přeselektovat seznam (true) nebo ne (false)
         */
        closing(): JQueryPromise<any>;
        /**
         * Tab (subtask) 'Zveřejnění'
         */
        private LoadZverejneniTab;
        /**
         * Tab (subtask) historie
         */
        private LoadHistorieTab;
        /**
         * Stisk tlačítka [Zveřejnit]
         */
        private saveDetail;
        /**
         * Uložení (vlastní)
         */
        private saveDetailReal;
        /**
         * Zobrazení detailu k řádku historie (data se berou z gridu – i data gridu souborů)
         */
        private showHistoryDetail;
    }
}
