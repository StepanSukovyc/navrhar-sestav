declare namespace Gordic.Spr.WebApp {
    interface GTiskPrehleduDlgInputParams {
    }
    interface GTiskPrehleduDlgReturnValue {
    }
    class GTiskPrehleduDlg extends GContentBase {
        private $Form;
        model: any;
        onContentReady(): void;
        private CreateMenu;
        private CreateForm;
        mohuOtevritTisk(): boolean;
    }
}
