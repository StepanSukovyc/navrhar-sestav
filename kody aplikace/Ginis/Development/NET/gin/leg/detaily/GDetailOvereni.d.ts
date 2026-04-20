declare namespace Gordic.Leg.WebClient {
    class GDetailOvereni extends GDetailBuilderContent<//Gordic.Leg.Dialogs.UsedComponentsNew>
    //Gordic.Leg.Dialogs.UsedComponentsNew>
    Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions>> & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Leg.WebClient.GRobsvidDto> & ThisType<GContent<Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Gordic.Leg.WebClient.GRobsvidDto>>>> implements IGContent {
        private tabGroupUdaje;
        private tabGroupZakladni;
        IxsVid: string;
        TypVidNew: string;
        IxsFun: string;
        rezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        model: any;
        ixp: any;
        tabGroupTest: JQuery<HTMLElement>;
        VyberEsu_DuvodHledaniTxt: string;
        onContentReady(): void;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void;
        afterLoadDataForTab(tabControl: JQuery<HTMLElement>): void;
        createForm(): Gordic.Forms.Form;
        createUdaje(): Gordic.Forms.Form;
        createZakladni(): Gordic.Forms.Form;
    }
}
