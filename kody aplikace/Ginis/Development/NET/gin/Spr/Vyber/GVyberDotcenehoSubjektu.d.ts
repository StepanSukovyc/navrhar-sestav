declare namespace Gordic.Spr.WebApp {
    class GVyberDotcenehoSubjektu extends GContentBase {
        Jednotlive: boolean;
        Zastupovani: boolean;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        private grid;
        private dataView;
        onContentReady(): void;
        private CreateMenu;
        loadData(filter?: Object): JQueryPromise<any>;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>;
        private okClick;
        private pridatDotcSubj;
    }
}
