declare namespace Gordic.Spr.WebApp {
    class GVyberDruhuRizeniProFunkci extends GContentBase {
        TypSr: number;
        ShowOkButton: boolean;
        private grid;
        private dataView;
        onContentReady(): void;
        private CreateMenu;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamDruhuRizeniProOuoDto>;
        private okClick;
    }
}
