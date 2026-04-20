declare namespace Gordic.Spr.WebApp {
    /**
     * GDetail
     *
     * @author Petr Dytrich
     */
    class GDetailOvereniVISEP extends GDetailBuilderContent implements IGContent {
        model: any;
        private grid;
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
        createGridFormat(): Gordic.Data.GridFormat;
    }
}
