declare namespace Gordic.Spr.WebApp {
    class GVyberPohledavkySubjektu extends GContentBase {
        IxpSpis: string;
        IxsEsu: string;
        private grid;
        private dataView;
        onContentReady(): void;
        private CreateMenu;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto>;
        private okClick;
    }
}
