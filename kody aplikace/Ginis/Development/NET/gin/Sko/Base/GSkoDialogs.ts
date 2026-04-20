namespace Gordic.Sko.Dialogs {

    export function OpenDetail(content: GContent, modal: boolean, contentInitializer?: string | object | IGClientContentObject | (string | ObjectLiteral<any>)[], inputParams?: ObjectLiteral<any>, options?: GDialogOptions): JQuery<any>
    {
        if (modal) return content.dialogs.showWindow(contentInitializer!, inputParams, options);
        else return content.navigate(contentInitializer, inputParams, options);
    }

    export function DuvodStornaSkodyDlg(content: GContent) {

        var def = $.Deferred();
       
        var form = new Gordic.Forms.Form()
            .addRow("jres:25800195", true).addField("gstringbox", { name: "duvod", validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 80 })] });

        var dlg = content.dialogs.simpleForm("jres:25800196", form, { }, { height: 200, modal: true, noClose: false }); //RC 25800196 : Důvod storna dokladu
        dlg.on("close", function (ev, retVal) {
            if (retVal) { 
                def.resolve(retVal.duvod);
            } 
            else {
                def.reject();
            }
        });

        return def;
    }

    export function VyberTypuPohledavky(content: GContent) {

        var def = $.Deferred();

        var form = new Gordic.Forms.Form()
            .addRow("jres:25800321", true).addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), { dropdown: false, name: "typ_pohledavky", validators: [new Gordic.Validators.Required()] }) //RC 25800321 : Typ pohledávky
        var dlg = content.dialogs.simpleForm("jres:25800196", form, {}, { height: 200, modal: true, noClose: false }); //RC 25800196 : Výběr typu pohledávky
        dlg.on("close", function (ev, retVal) {
            if (retVal) {
                def.resolve(retVal.typ_pohledavky);
            }
            else {
                def.reject();
            }
        });

        return def;
    }
       

    export function VyberFunkceNksDlg(content: GContent) {
        var def = $.Deferred();

        var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-1-11-0, M-2-10-0, S-12-12-0"})
            .addRow("jres:25800047", true).addField("gselectbox", Gordic.Prefabs.Select.skoSeznamNks(), { dropdown: false, name: "nks", validators: [new Gordic.Validators.Required()] }) //RC 25800047 : NS
            .addRow("jres:25800211", true).addField("gselectbox", Gordic.Prefabs.Select.skoSeznamFunkciNksDdp(), { serverFilters: { nks: new Gordic.Forms.Dependency("nks", "nks", true) } }, { dropdown: false, name: "ixs_fun", validators: [new Gordic.Validators.Required()] }); //RC 25800211 : Funkce

        var dlg = content.dialogs.simpleForm("jres:25800212", form, {}, { height: 300, modal: true, noClose: false }); //RC 25800212 : Zadání cílového subjektu
               
        dlg.on("close", function (ev, retVal) {
            if (retVal) {
                def.resolve(retVal);
            }
            else {
                def.reject();
            }
        });

        return def;
    }

    export function PodaniSkody(content: GContent, modal: boolean): JQueryPromise<any> {

        var def = $.Deferred();

        var options = {
            TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
            TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
            ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremUsuGenPid
        };
        console.log("GenerovaniIxp");
        Gordic.Wfl.Dialogs.GenerovaniIxp(content, options, Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (rv, cont) {
            console.log("rv...");
            console.log(rv);
            if (rv) {
                if (rv.IxpExist === false) {
                    var width = 800;
                    var height = 500;

                    //content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody",], {
                    Gordic.Sko.Dialogs.OpenDetail(content, modal,["Gordic.Sko.WebApp.GDetailSkody",], {
                        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.New,
                        IxpNew: rv.Ixp,
                        Id: "detail_skody"
                    }, { width: width, height: height, modal: modal })
                        .on("close", (ev, r) => {
                            def.resolve(r);
                        });
                } else def.reject();

            } else def.reject();
        });

        return def;
    }

    export function HledaniSkody(content: GContent, modal: boolean): JQueryPromise<any> {

        var def = $.Deferred();

        var width = 600;
        var height = 400;

        content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailHledaniSkody",], { Id: "detail_hledani_skody"}, { width: width, height: height, modal: modal }).on("close", (ev, r) => {

            if (r != null && r.Vybrano && r.Ixp != null)
            {
                width = 800;
                height = 500;
                modal = true;

                //content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody",], {
                Gordic.Sko.Dialogs.OpenDetail(content, modal,["Gordic.Sko.WebApp.GDetailSkody",], {
                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                    Ixp: r.Ixp,
                    Id: "detail_skody"
                }, { width: width, height: height, modal: modal })
                    .on("close", (ev, r) => {
                        def.resolve(r);
                    });

            } else def.reject();
        });

        return def;
    }

    export function TiskSestav(content: GContent): JQueryPromise<any> {
                
        var def = $.Deferred();

        var width = 600;
        var height = 400;

        content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailTiskSestav",], { Id: "detail_tisk_sestav"}, { width: width, height: height, modal: true }).on("close", (ev, r) => {
            def.resolve();
            //if (r != null && r.Vybrano && r.Ixp != null) {
            //    width = 800;
            //    height = 500;
            //    modal = true;

            //    //content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody",], {
            //    Gordic.Sko.Dialogs.OpenDetail(content, modal, ["Gordic.Sko.WebApp.GDetailSkody",], {
            //        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
            //        Ixp: r.Ixp,
            //        Id: "detail_skody"
            //    }, { width: width, height: height, modal: modal })
            //        .on("close", (ev, r) => {
            //            def.resolve(r);
            //        });

            //} else def.reject();
        });

        return def;
    }

    export function VyberVlastniSeskupeniNs(content: GContent, vyber: boolean): JQueryPromise<string> {

        var def = $.Deferred();
        
        var width = 600;
        var height = 400;

        content.dialogs.showWindow(["Gordic.Sko.WebApp.GVyberVlastniSeskupeniNs",], { Id: "vyber_vlastni_seskupeni_ns", Tema: "sko_ptm_psko", Vyber: vyber }, { width: width, height: height, modal: true }).on("close", (ev, r) => {
            if (r != null && r != undefined && r.Vybrano && r.IxsMas != null && r.IxsMas != undefined && r.IxsMas != "") def.resolve(r.IxsMas);
            else def.reject();
        });

        return def.promise();
    }

    export function VyberMajetku(content: GContent) {
        var def = $.Deferred();

        var width = 600;
        var height = 400;

        var widthMaj = 700;
        var heightMaj = 600;

        content.dialogs.showWindow(["Gordic.Sko.WebApp.GVyberMajetku"], { Id: "vyber_majetku" }, { width: width, height: height, modal: true }).on("close", (ev, r) => {
            if (r != null && r != undefined && r.Zmena) {
                content.dialogs.showWindow(["Gordic.Sko.WebApp.GDetailMajetku"], { Id: "detail_majetku", InvCis: r.InvCis, Kcm: r.Kcm }, { width: widthMaj, height: heightMaj, modal: true }).on("close", (event, retVal) => {
                    if (retVal && retVal.Zmena) def.resolve(retVal);
                });
            }
            else def.reject();
        });

        return def.promise();
    }
   
}
