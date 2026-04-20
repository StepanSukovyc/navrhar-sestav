declare namespace Gordic.Leg.WebClient {
    class GSeznamLegalizace extends GContentBase {
        private grid;
        private filterForm;
        dataView: Data.View<any>;
        ixsFun: any;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        onContentReady(): void;
        loadData(filter: any): JQueryPromise<any>;
        novyZaznam(): void;
        openDetail(): void;
        private createGridFormat;
    }
}
