declare namespace Gordic.Spr.WebApp {
    /**
     * GDetail
     *
     * @author Petr Dytrich
     */
    class GDetailNemovitosti extends GDetailBuilderContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaReloadComponentExtensions>> & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto>>>> implements IGContent {
        IxpSpis: string;
        Porcislo: number;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
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
