declare namespace Gordic.Spr.WebApp {
    /**
     * GDetail
     *
     * @author Petr Dytrich
     */
    class GDetailUkonu extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions>> & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSprUkonDto> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GSprUkonDto>>>> implements IGContent {
        IxpSpis: string;
        IxpUkon: string;
        IxsDsr: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        private dotcSubjUkonuTab;
        private Param_SprRadParcj;
        private Param_SprRadVparcj;
        private Param_SprRadRegen;
        private kpi1;
        private kpi;
        private gridHasRows;
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
        private GetCustomDtoProTisk;
        private KonvertovatSchvalit;
        private ParovatPriSchvaleni;
        private VyberDeniku;
        private VyberDokumentuInitCj;
        private VlozitDoSpisu;
        private KeSchvaleni;
        private Schvalit;
        private Stornovat;
        private NastavitLhutu;
        private NabytPravniMoc;
        private DetailDokumentu;
        private Pokyny;
        private Vzor;
        private Poznamka;
        private TiskSablony;
        private OtevreniElektronickehoObrazu;
        private Odeslat;
        private KonverzePdf;
        _reloadData(): void;
        private ZadostOPodpis;
        private SchvalovaciProces;
        private formatDatum;
    }
}
