namespace Gordic.Spr.WebApp {

    export type UsedComponentsNew = Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>;
    export const VyberEsu_DuvodHledaniTxt = 'zadaniucastnikarizeni';



    export function UpravRequiredNaFieldu(parentContent: GContent, fieldName: string, required: boolean) {
        parentContent.findFields(fieldName).each(function (index, element) {
            var puvodniValidatory = $(element).gfield("option", "validators");
            if (puvodniValidatory == undefined)
                puvodniValidatory = [];
            var noveValidatory = puvodniValidatory.filter(function (Validator) {
                return !(Validator instanceof Gordic.Validators.Required);
            });
            if (required) {
                noveValidatory.push(new Gordic.Validators.Required());
            }
            $(element).gfield("option", "validators", noveValidatory);

            //var puvodniValidatory = $(element).gfield("option", "validators");
            //var noveValidatory = puvodniValidatory.filter(function (Validator) {
            //    return !(Validator instanceof Gordic.Validators.Required);
            //});
            //if (required) {
            //    noveValidatory.push(new Gordic.Validators.Required());
            //}
            //$(element).gfield("option", "validators", noveValidatory);
        });
    }

    export function VyhledatDlePID_SPR(content: GContent, taskId: string) {
        Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(content, { taskId: taskId })
            .done(function (retVal) {
                if (retVal && retVal.ixp) {
                    var l_oContent: GContent;
                    l_oContent = content.createServiceContent("Gordic.Spr.WebApp.GSprUtils");

                    l_oContent.call("FindIxpInSpr", { ixp: retVal.ixp }) // kontrola zda existuje
                        .done((ixpSpis) => {
                            if (ixpSpis != "") {
                                content.navigate(["Gordic.Spr.WebApp.GDetailSpravnihoRizeni", {}], {
                                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                                    IxpSpis: ixpSpis,
                                    Id: "spravniRizeni_detail"
                                }, {});
                            }
                            else {
                                content.dialogs.alert("jres:25200395"); //RC 25200395 : Hledaný dokument/spis není v systému evidován.
                            }
                        });
                }
            });
    }




}

