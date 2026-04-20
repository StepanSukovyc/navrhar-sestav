declare namespace Gordic.Iissp.WebControls {
    function foo(): void;
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspHistoryDetailPskOptions {
        id_ext?: string | null;
        id_volani_ssp?: number | null;
    }
    class GIisspHistoryDetailPsk extends GContentBase implements IGClientContent {
        uid: string;
        prepareContent(options: IGIisspHistoryDetailPskOptions): void;
        renderContent(data: Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIsspHistoryOptions {
        id_ext: string;
    }
    class GIisspHistoryPsk extends GContentBase implements IGClientContent {
        private options;
        title: string;
        uid: string;
        prepareContent(options: IGIsspHistoryOptions): void;
        showDetail(d: Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface GIsspPreuctovaniSkutecnostiOptions {
        ico: string;
        hromRez?: boolean;
        rok: number;
        ucs: string;
        ixb: string;
        ixs_vkz: string;
        por_cislo: number;
    }
    class GIisspPreuctovaniSkutecnosti extends GContentBase implements IGClientContent {
        title: string;
        uid: string;
        prepareContent(options: GIsspPreuctovaniSkutecnostiOptions): void;
        private showTypOdpovediDlg;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspRezDetailOptions {
        ixs_hpr: string;
        ico: string;
        ucs: string;
        rok: number;
        /** zda se p�i otev�en� okna sou�asn� provede tak� dotaz do IISSP */
        volatWebSluzbu: boolean;
        /** mo�nost zadat referenta, pod kter�m dotaz prob�hne< */
        ixs_ref?: string;
        /** mo�nost zadat ��slo rezervace, na kter�m se okno otev�e */
        id_hdr?: number;
        /** mo�nost zadat ��slo rezervace, na kter�m se okno otev�e */
        id_hdr_ris?: string;
        /** mo�nost zadat ��slo ��dku, kter� se v okn� polo�ek zv�razn� */
        radek_hdr_ris?: number;
    }
    /**
     * Porovnani stavu rezervace, v TK: n:\ginis\Development\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GRezDetailTab.cs
     *
     * @author bmartinek
     * @since 52530.1
     */
    class GIisspRezDetail extends GContent implements IGClientContent {
        private options;
        private stavyRezervaciForm;
        private detailForm;
        private grid;
        private view;
        private readonly iconOtevreno;
        private readonly iconUzavreno;
        prepareContent(options: IGIisspRezDetailOptions): void;
        /**  Kompletni reload okna. */
        private reload;
        /** Nacteni detailu */
        private loadDetailsData;
        private overitStav;
        private porovnat;
        private showHistStavu;
        private showHistVolani;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspRezDetailExtOptions {
        ixs_hpr: string;
        ico: string;
        ucs: string;
        rok: number;
        /** zda se při otevření okna současně provede také dotaz do IISSP */
        volatWebSluzbu: boolean;
        /** možnost zadat referenta, pod kterým dotaz proběhne< */
        ixs_ref?: string;
        /** možnost zadat číslo rezervace, na kterém se okno otevře */
        id_hdr?: number;
        /** možnost zadat číslo rezervace, na kterém se okno otevře */
        id_hdr_ris?: string;
        /** možnost zadat číslo řádku, které se v okně položek zvýrazní */
        radek_hdr_ris?: number;
    }
    /**
     * Detail rezervace (v TK ekv. N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GRezDetailExtTab.cs)
     *
     * @author bmartinek
     * @since 490.1.0.24
     */
    class GIisspRezDetailExt extends GContent implements IGClientContent {
        private options;
        private stavyRezervaciForm;
        private detailForm;
        private grid;
        private view;
        private readonly iconOtevreno;
        private readonly iconUzavreno;
        prepareContent(options: IGIisspRezDetailExtOptions): void;
        /**  Kompletni reload okna. */
        private reload;
        /** Nacteni detailu */
        private loadDetailsData;
        private overitStav;
        private showHistStavu;
        private uzavrit;
        private uzavritRez;
        private otevritRez;
        private showHistVolani;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspRezHistoryOptions {
        ixs_hpr: string;
    }
    class GIisspRezHistory extends GContent implements IGClientContent {
        private readonly iconOtevreno;
        private readonly iconUzavreno;
        prepareContent(options: IGIisspRezHistoryOptions): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspRezWsCallHistoryOptions {
        ixs_hpr: string;
    }
    /**
     * GIisspRezWsCallHistory
     *
     * TK ekv.: N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GIisspHistoryTab.cs
     *
     * @author bmartinek
     * @since 490.1.0.0
     */
    class GIisspRezWsCallHistory extends GContent implements IGClientContent {
        prepareContent(options: IGIisspRezWsCallHistoryOptions): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGIisspRezWsCallHistoryDetailsOptions {
        id_volani_ssp: number;
    }
    /**
     * GIisspRezWsCallHistoryDetails
     * TK Ekv: N:\GINIS\489\DEV\NET\Gordic.Iissp.WinClient\Dnp\Tabs\GIisspHistoryDetailTab.cs
     * @author bmartinek
     * @since 490.1.0.1
     */
    class GIisspRezWsCallHistoryDetails extends GContent implements IGClientContent {
        prepareContent(options: IGIisspRezWsCallHistoryDetailsOptions): void;
        private createOnlineGridFormat;
        private createOfflineGridFormat;
    }
}
declare namespace Gordic.Iissp.WebControls {
    class GInbox extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        private filterpanel;
        private grid;
        private view;
        private prevzitAct;
        private historieAct;
        private obsahAct;
        private refreshAct;
        private stornoAct;
        prepareContent(): void;
        private createGridFormat;
        private getData;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGInboxBatchContentOptions {
        id_inbox_ssp: number;
    }
    /**
     * Dle TK Gordic.Iissp.WinClient.GObsahInboxTab
     *
     * @author bmartinek
     * @since 488.1.0.16
     */
    class GInboxBatchContent extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        private grid;
        private view;
        private curr_vystup_zprava_id?;
        private curr_obsah?;
        prepareContent(options: IGInboxBatchContentOptions): void;
        private setStatus;
        private loadVystup;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGInboxHistoryOptions {
        id_inbox_ssp: number;
        id_inbox_user?: number;
        typ: "inbox" | "vykaz";
    }
    class GInboxHistory extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        private grid;
        private view;
        private options;
        private detailAct;
        prepareContent(options: IGInboxHistoryOptions): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGInboxHistoryDetailOptions {
        id_volani_ssp: number;
    }
    /**
     * Dle TK Gordic.Iissp.WinClient.GInboxHistorieObsahTab
     *
     * @author bmartinek
     * @since 488.1.0.16
     */
    class GInboxHistoryDetail extends GContentBase implements IGClientContent {
        uid: string;
        prepareContent(options: IGInboxHistoryDetailOptions): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    /**Content se strukturou IISSP (pro SML05, FUC05, ?) */
    class GStrukturaIISSP extends GContentBase {
        /**Identifikátor */
        ixs_hpr: string;
        /** Data */
        private data;
        /** Referent */
        private ixs_ref;
        /** IČO */
        private ico;
        /** UCS */
        private ucs;
        /** Rok */
        private rok;
        /** DB parametr - EKO – ŘP Zjištění stavu čerpání rezervace v IISSP*/
        private eko_rad_iisspcs;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /**Vytvoření gridu*/
        private createGrid;
        /** Definice gridformátu struktury */
        private createGridFormatStruktura;
        /** Definice gridformátu rezervačního případu */
        private createGridFormatPripad;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGStskPohybyOptions {
        id_volani_ssp: number;
        radek_ik: number;
        radek_pol: number;
    }
    class GStskPohyby extends GContent implements IGClientContent {
        title: string;
        prepareContent(options: IGStskPohybyOptions): void;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGVykazyOptions {
        ico: string;
        ucs: string;
        rok: number;
        fim: string;
    }
    class GVykazy extends GContent implements IGClientContent {
        uid: string;
        title: string;
        private options?;
        private view;
        private grid;
        private filterpanel;
        prepareContent(options: IGVykazyOptions): void;
        private loadData;
        private createForm;
        private createGridFormat;
        private generate;
        private generateNew;
    }
}
declare namespace Gordic.Iissp.WebControls {
    interface IGVykazyPorovnaniOptions {
        rok: number;
        mesic_do: number;
        isp_fim: string;
        vykaz_typ_iissp: string;
        dat_zadal: JsonDate;
        pocet_rozdilu: number;
    }
    /**
     * GVykazyPorovnani
     * Vytvoreno dle: N:\GINIS\489\dev\net\Gordic.Iissp.WinClient\Inbox\GInboxPorovnaniTab.cs
     *
     * @author bmartinek
     * @since 490.1.0.16
     */
    class GVykazyPorovnani extends GContent implements IGClientContent {
        uid: string;
        private view;
        prepareContent(options: IGVykazyPorovnaniOptions): void;
        private prepareRV01;
        private prepareRV02RV06;
        private prepareRV03;
        private prepareRV04RV05;
    }
}
declare namespace Gordic.Prefabs.GridFormats {
    function GIisspEkisSpPskHistorieDtoGfPrefab(): Gordic.Data.GridFormat<Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto>;
}
