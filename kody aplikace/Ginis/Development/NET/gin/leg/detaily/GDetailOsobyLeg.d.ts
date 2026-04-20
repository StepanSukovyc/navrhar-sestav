declare namespace Gordic.Leg.WebClient {
    class GDetailOsobyLeg extends GDetailBuilderContent<Gordic.Leg.Dialogs.UsedComponentsNew> implements IGContent {
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        DataToFilterPanel: Gordic.Esu.WebClient.GKartotekaFilterDto;
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
        titleCaseWord(word: string): string;
        najdiOkres(obec: any, field: any): void;
        createHeaderForm(): Gordic.Forms.Form;
        createForm(): Gordic.Forms.Form;
    }
}
