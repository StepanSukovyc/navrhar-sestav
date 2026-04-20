namespace Gordic.Sko.Globals.ListSupport {

    export function WarningColumn(): GGridColumn<any> {
        return {
            name: "warn_ico",
            caption: " ",
            //description: "jres:25200019", //RC 25200019 : Obrázek elektronického dokumentu
            width: 40,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row: any) {
                if (row["mat_c_celk_sko"] == null) {
                    return { icon: "fa-exclamation-triangle g-state-text g-state-error", tooltip: "Není uvedena výše škody!" };
                }
                return null;
            }
        }
    }

}