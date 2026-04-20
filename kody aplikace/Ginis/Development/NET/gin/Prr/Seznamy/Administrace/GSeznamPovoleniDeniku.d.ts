declare namespace Gordic.Prr.UIWebClient {
    class GSeznamPovoleniDeniku extends GContentBase {
        private grid;
        private filterForm;
        private filterValidators;
        private dataView;
        TypDen: number;
        onContentReady(): void;
        openDetail(rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu): void;
        odstranit(): void;
        obnovit(): void;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrDenikDto>;
    }
}
