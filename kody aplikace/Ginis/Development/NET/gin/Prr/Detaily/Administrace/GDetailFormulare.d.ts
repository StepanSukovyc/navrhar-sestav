declare namespace Gordic.Prr.UIWebClient {
    class GDetailFormulare extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>> implements IGContent {
        Sablona?: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        Mp: boolean;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        typyUdalostiFormulareTab: JQuery<HTMLElement>;
        denikyFormulareTab: JQuery<HTMLElement>;
        skupinyFormulareTab: JQuery<HTMLElement>;
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
    }
}
