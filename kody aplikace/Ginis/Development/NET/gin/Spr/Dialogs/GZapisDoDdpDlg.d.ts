declare namespace Gordic.Spr.WebApp {
    interface GZapisDoDdpDlgInputParams {
        IxpSpis: string;
        RadekPop: number;
        VysePlatby?: Decimal;
        IxpDdpSpol?: string;
        VSSpol?: string;
    }
    interface GZapisDoDdpDlgReturnValue {
        Zmena?: boolean;
    }
    class GZapisDoDdpDlg extends GContentBase {
        private $Form;
        model: any;
        onContentReady(): void;
        private CreateMenu;
        private CreateForm;
        private closing;
        private okClick;
    }
}
