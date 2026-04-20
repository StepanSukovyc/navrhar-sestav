declare namespace Gordic.Spr.WebApp {
    class GSeznamVazebSubjektu extends GContentBase {
        IxpSpis: string;
        TypVzVazby: number;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        private grid;
        private dataView;
        onContentReady(): void;
        odstranit(): void;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVazebSubjektuDto>;
    }
}
