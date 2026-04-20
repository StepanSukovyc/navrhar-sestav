declare namespace Gordic.Leg.WebClient {
    export class GAdministraceLeg extends GContentBase {
        model: any;
        subTask: subTask;
        Aktivita: number;
        private gridKnihy;
        private gridFunkce;
        private filterForm;
        private subtask;
        private grid;
        onContentReady(): void;
        private createMenuBar;
        private createsubTask;
        private createFilterAndGrid;
        loadData(): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat;
        openDetail(): void;
        novyZaznam(): void;
        private reload;
        private removeAll;
    }
    enum subTask {
        Knihy = 0,
        Funkce = 1
    }
    export {};
}
