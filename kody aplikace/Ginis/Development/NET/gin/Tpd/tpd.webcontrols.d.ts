declare namespace Gordic.Tpd.Others {
    class StartPage extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Wfl.Interface.GWflSouhrnInfoBaseDto;
        scorecardItems: any[];
        divSection0: JQuery<HTMLElement> | undefined;
        divSection1: JQuery<HTMLElement> | undefined;
        divSection2: JQuery<HTMLElement> | undefined;
        onContentReady(): void;
        GenerateKpi(): void;
        ShowCounts(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Tpd.Dlg {
    class TiskPodacihoDenikuDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        model: Wfl.Interface.GGenerovaniPodacichDenikuFilterDto;
        aktualniRok: Gordic.Wfl.Interface.Lists.WflDateIntervalDto;
        validators: any;
        onContentReady(): void;
        CreateForm(): void;
        setServerFiltersCj(nabizetPouzeUrciteDeniky: boolean): {
            priz_den_cj: number[];
            aktivita: number[];
            PouzeUzivatelskeDeniky: boolean;
        };
        CreateActionTisk(): GAction;
        /**
          * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
          **/
        private waitForValues;
        OKClick(): void;
    }
}
