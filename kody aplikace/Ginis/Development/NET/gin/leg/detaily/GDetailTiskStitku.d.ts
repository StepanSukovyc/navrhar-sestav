declare namespace Gordic.Leg.WebClient {
    class GDetailTiskStitku extends GContentBase implements IGContent {
        private form;
        model: any;
        l_sStitek: string;
        l_sFiltrAlv: string;
        l_sTypStitku: string;
        data: any;
        wrp: any;
        onContentReady(): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        private getCustomDtoProTisk;
        private ulozPosledniPouzite;
        createForm(): Gordic.Forms.Form;
        createButtons(many: number): void;
        namyButtonSwitch(retVal: string | null): void;
    }
}
