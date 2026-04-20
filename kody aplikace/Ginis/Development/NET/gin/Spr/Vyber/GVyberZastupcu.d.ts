declare namespace Gordic.Spr.WebApp {
    class GVyberZastupcu extends GContentBase {
        private grid;
        private dataView;
        onContentReady(): void;
        private CreateMenu;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>;
        private okClick;
    }
}
