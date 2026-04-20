declare namespace Gordic.Esp.WebClient {
    class GCalculator extends GContentBase {
        private OsobaESP;
        private absence_rok;
        private absence_dny;
        private seznam_vyloucenych_dob;
        private protokol;
        private rok_obd_mzdy;
        private esp_messluzprij;
        private esp_zpgenodchod;
        private esp_genervysluh;
        private esp_genumrtne;
        private pam_servis_wk;
        onContentReady(): void;
        /**
      * Sestavení akcí
      */
        private vytvorAkce;
        povolAkce(): void;
        /**
           * Vytvoření menu baru
        * */
        vytvorBar(): void;
        /**
        * Přepočítání sumy
        * */
        private PrepoctiSumu;
    }
}
declare namespace Gordic.Esp.WebClient {
    class GDetailOsoby extends GContentBase {
        static NazvyAkci: {
            NactiDetiAct: string;
            DobyNactiAct: string;
            DobyInsertAct: string;
            DobyUpdateAct: string;
            DobyDeleteAct: string;
            KontaktniUdajePERNactiAct: string;
            RozhodnutiNactiAct: string;
            RozhodnutiInsertAct: string;
            RozhodnutiUpdateAct: string;
            RozhodnutiDeleteAct: string;
            RozhodnutiChangeRowAct: string;
            DuchodoveNactiAct: string;
            DuchodoveInsertAct: string;
            DuchodoveUpdateAct: string;
            DuchodoveDeleteAct: string;
            DetiNactiAct: string;
            DetiInsertAct: string;
            DetiUpdateAct: string;
            DetiDeleteAct: string;
            ElPrilohyAct: string;
        };
        static SeznamDIVu: {
            hlavni: string;
            deti: string;
            duchodove: string;
            doby: string;
            rozhodnuti: string;
            kontaktyPER: string;
        };
        /**
         * Titulek contentu.
         */
        readonly taskId = "taskDetailOsoby";
        readonly OsobaESP: Gordic.Pam.Interface.GOsobaEspDto;
        private RQ_KONTAKTNI_UDAJE_PER;
        readonly RAZITKA: Gordic.Pam.Interface.GStatickeTextyRazitekESPDto[];
        readonly Lic: string;
        private viewDeti;
        private viewDuchodove;
        private viewDoby;
        private viewRozhodnutiPER;
        private viewKontaktniUdajePER;
        onContentReady(): void;
        /**
       * Sestavení akcí
       */
        private vytvorAkce;
        povolAkce(): void;
        /**
         * Vytvoření menu baru
         */
        vytvorBar(): void;
        /**
         * Grid formát pro děti
         * */
        private DetiGridFormat;
        /**
        * Grid formát pro důchodové spoření
        * */
        private DuchodoveGridFormat;
        /**
        * Grid formát pro přehled dob
        * */
        private DobyGridFormat;
        /**
        * Grid formát pro kontaktní udaje  z PER
        * */
        private KontaktniUdajePerGridFormat;
        /**
      * Grid formát pro rozhodnutí z PER
      * */
        private RozhodnutiGridFormat;
        /**
        * Změna řádku v gridu s Dětmi
        * @param ev
        * @param obj
        */
        changeRowDeti(ev: any, obj: {
            cellInfo: CellInfo<any>;
            originalCellInfo: CellInfo<any>;
            view: Data.View<any>;
        }): void;
        /**
         * Manipulace se důchodovým spořením
         * @param akce
         */
        DuchodoveSporeni(akce: "insert" | "update" | "delete"): void;
        /**
        * Manipulace s rozhodnutím z PER
        * @param akce
        */
        Rozhodnuti(akce: "insert" | "update" | "delete"): void;
        /**
        * Manipulace s dobami pojištění
        * @param akce
        */
        Doby(akce: "insert" | "update" | "delete"): void;
        /**
       * Manipulace s dětmi vlastními /osvojenými
       * @param akce
       */
        Deti(akce: "insert" | "update" | "delete"): void;
    }
}
declare namespace Gordic.Esp.WebClient {
    class GElPrilohyESP extends GContentBase {
        private fileInfo;
        private titulek;
        private popis;
        private viewElPrilohy;
        private previewController;
        onContentReady(): void;
        /**
      * Sestavení akcí
      */
        private vytvorAkce;
        /**
 * zobrazit dialog
 */
        VlozPrilohu(): JQueryPromise<any>;
        /**
        * Grid formát pro elektornické přílohy
        * */
        private ElPrilohyGridFormat;
        private RegisterReview;
        /**
           * Vytvoření menu baru
        * */
        vytvorBar(): void;
    }
}
declare namespace Gordic.Esp.WebClient {
    class GEpp extends GContentBase {
        static NazvyAkci: {
            detail: string;
            novaOsoba: string;
            editaceOsoby: string;
            zruseniOsoby: string;
            changeRow: string;
            reload: string;
            insertDebugData: string;
        };
        static TRACER: Diagnostics.GLog;
        private _TR;
        private esp_evidecnipp;
        private pam_servis_wk;
        private _seznamOsobEpp;
        onContentReady(): void;
        /**
         * Sestavení akcí
         */
        private SestavAkce;
        /**
         * Vytvoření menu baru
         */
        vytvorBar(): void;
        /**
        * Povolení akcí na základě přístupových práv a stavu dat
        *
        * */
        povolAkce(): void;
        editFrmOsoba(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Esp.WebClient {
    class GReportCustomFrm extends GContentBase {
        init(): void;
        mujClose(): void;
    }
}
declare namespace Gordic.Esp.WebClient {
    class GSeznamOsob extends GContentBase {
        static NazvyAkci: {
            detail: string;
            calculator: string;
            tiskAct: string;
            refreshByFilterAct: string;
            esppra01Act: string;
            seznamChangeRow: string;
            odchodneAct: string;
            odchodneVyplatit: string;
            vysluhaAct: string;
            vysluhaVyplatit: string;
            umrtneAct: string;
        };
        readonly titleBase = "jres:27350002";
        private _seznamOsob;
        private filterPanel;
        private grfmObject;
        private esp_zpgenodchod;
        private esp_genervysluh;
        private esp_genumrtne;
        private Rokobdmzdy;
        private LICENCE;
        onContentReady(): void;
        /**
         * Sestaví výčet sloupců v závislosti na licenci a parametrech pro zobrazební v gridu
         */
        private _vycetSloupcu;
        /**
         * Transformace filtru pro z vizuální podoby do té zpracovatelné
         * @param zadanyFilter Data sesbíraná z formuláře filtru
         */
        private _TransformujFiltr;
        /**
         * Načtení dat do gridu s pomocí filtru
        * @param zadanyFilter Data sesbíraná z formuláře filtru
         */
        private _reloadGridData;
        /**
         * Sestavení akcí
         */
        private SestavAkce;
        /**
         * Připraví podklady pro sestavu (gintkey + pamtses)
         * @param reportId reportIs vybrané sestavy
         * @param OsobaESP  vybraná osoba
         */
        PripravSestavuProTisk(reportId: string, OsobaESP: Gordic.Pam.Interface.GOsobaEspDto): JQueryPromise<undefined>;
        /**
         * Vytvoření menu baru
         */
        vytvorBar(): void;
        /**
        * Povolení akcí na základě přístupových práv a stavu dat
        *
        * */
        povolAkce(): void;
    }
}
