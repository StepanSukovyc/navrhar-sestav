declare namespace Gordic.Spr.WebApp {
    /**
     * GDetail
     *
     * @author Petr Dytrich
     */
    class GDetailSpravnihoRizeni extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSpravniRizeniDto> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSpravniRizeniDto>>>> implements IGContent {
        Zalozeni: boolean;
        IxpSpis: string;
        IxsDsr: string;
        TypSr: number;
        identifikatorUkonu: any;
        porCisloNemovitosti: any;
        DBPar_SprRadVpr: string;
        DBPar_SprRadUcatxt: string;
        DBPar_SprRadEko: boolean;
        DBPar_SprRadPsrdr: boolean;
        DBPar_InsertCJTextLong: string;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        private ouoTab;
        private vecnaPrislusnost0Tab;
        private vecnaPrislusnost10Tab;
        private vecnaPrislusnost20Tab;
        private ucastnici271Tab;
        private ucastnici272Tab;
        private terminyTab;
        private nemovitostiTab;
        private dotceneOrganyTab;
        private ostatniSubjektyTab;
        private zastupciTab;
        private ukonyTab;
        private popTab;
        private customClassFor4Secs;
        private layoutDescriptorFor4Secs;
        private kpi1;
        private kpi2;
        private kpi3;
        private kpi4;
        s_z_uca1: number;
        s_z_uca2: number;
        s_z_dotco: number;
        s_z_ost: number;
        s_z_platby: number;
        obl_sr: number;
        s_ed_dat_z_dsr: number;
        onContentReady(): void;
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
        afterLoadDataForTab(tabControl: JQuery<HTMLElement>): void;
        createForm(): Gordic.Forms.Form;
        createFormProfilRizeni(): Gordic.Forms.Form;
        createFormUTZ1(): Gordic.Forms.Form;
        createFormUTZ2(): Gordic.Forms.Form;
        createFormUTZ3(): Gordic.Forms.Form;
        createFormStavba(): Gordic.Forms.Form;
        createFormStatniDozor(): Gordic.Forms.Form;
        createFormDoprava(): Gordic.Forms.Form;
        createFormDraha(): Gordic.Forms.Form;
        private Zahajit;
        private Prerusit;
        private Pokracovat;
        private ZrusitRozhodnuti;
        private Rozhodnout;
        private Zahajit_OpenDetail;
        private Vyridit_OpenDetail;
        private PredatNadrizenemuSU;
        private VratitPodrizenemuSU;
        private Odvolani;
        private PotvrditRozhodnuti;
        private NabytiPravniMociSpr;
        private ZmenDruhRizeniSpravnihoSpisu;
        private _reloadData;
        private renderKPI;
        private formatDatum;
    }
}
