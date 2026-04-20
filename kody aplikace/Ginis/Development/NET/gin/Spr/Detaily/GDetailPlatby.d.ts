declare namespace Gordic.Spr.WebApp {
    /**
     * GDetail
     *
     * @author Petr Dytrich
     */
    class GDetailPlatby extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        RadekPop: number;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        EkoMode: boolean;
        private m_oActVybratDotcenySubjekt;
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
        createForm(): Gordic.Forms.Form;
        LzePovolitStavPlatbyDdp(DokValue: string | null): boolean;
        GetZapisDoDdpParams(): JQueryPromise<object>;
    }
}
