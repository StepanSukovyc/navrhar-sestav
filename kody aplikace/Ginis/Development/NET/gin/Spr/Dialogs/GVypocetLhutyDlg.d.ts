declare namespace Gordic.Spr.WebApp {
    interface GVypocetLhutyDlgInputParams {
        DatumZahajeni?: Date;
        PocetDnu?: Decimal;
        ShowOkButton?: boolean;
    }
    interface GVypocetLhutyDlgReturnValue {
        VypocetLhuty: Interface.GVypocetLhutyDto;
    }
    class GVypocetLhutyDlg extends GContentBase {
        private dto;
        private $Form;
        onContentReady(): void;
        private CreateMenu;
        private static CreateForm;
        private closing;
        private okClick;
    }
}
