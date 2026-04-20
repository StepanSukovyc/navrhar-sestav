declare namespace Gordic.Spr.WebApp {
    class GVyberDokumentuProVazbuCJ extends GContentBase {
        IxpSpis: string;
        private grid;
        private dataView;
        onContentReady(): void;
        private CreateMenu;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto>;
        private closing;
        private okClick;
    }
}
