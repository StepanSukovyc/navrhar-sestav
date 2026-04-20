declare namespace Gordic.Spr.WebApp {
    class GVyberVecnePrislusnostiProSpis extends GContentBase {
        typVazby: string;
        ixpSpis: string;
        width: number;
        height: number;
        TypSr: number;
        DruhZar: number;
        FilterDateFrom: string;
        FilterDateTo: string;
        ZnackaTextDBParam: string;
        private grid;
        onContentReady(): void;
        private CreateMenu;
        private okClick;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVprDto>;
    }
}
