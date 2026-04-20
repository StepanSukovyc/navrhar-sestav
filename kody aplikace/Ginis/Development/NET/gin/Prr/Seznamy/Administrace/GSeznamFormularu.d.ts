declare namespace Gordic.Prr.UIWebClient {
    class GSeznamFormularu extends GContentBase {
        private grid;
        private filterForm;
        private filterValidators;
        private dataView;
        Mp: boolean;
        onContentReady(): void;
        openDetail(rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu): void;
        odstranit(): void;
        obnovit(): void;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrFormularDto>;
    }
}
