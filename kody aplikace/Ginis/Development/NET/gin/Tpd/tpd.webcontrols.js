"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Tpd.WebClient.StartPage.ts                           </Name>
//    <Description>                                                             </Description>
//    <Author>      Jiří Šindelka                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-01-04                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Tpd;
    (function (Tpd) {
        var Others;
        (function (Others) {
            let StartPage = class StartPage extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.scorecardItems = [];
                }
                onContentReady() {
                    //this.SetData();
                    var div = $("<div>").css("display", "flex").css("align-items", "stretch").css("align-content", "stretch").css("flex-wrap", "wrap").appendTo(this.element);
                    div.width("100%");
                    this.divSection0 = $("<div>").width("100%").appendTo(div);
                    this.divSection1 = $("<div>").width("300px").css("min-width", "300px").css("max-width", "320px").css("flex-grow", "1").appendTo(div);
                    this.divSection2 = $("<div>").css("flex-grow", "3").appendTo(div);
                    if (this.model.LoginInfoDto) {
                        var optModuleInfoToStatistiky = {
                            AppendToDiv: this.divSection0,
                            NazevRef: this.model.LoginInfoDto.NazevRef,
                            NazevFun: this.model.LoginInfoDto.NazevFun,
                            ZastupTxt: this.model.LoginInfoDto.ZastupTxt,
                            ZkratkaSu: this.model.LoginInfoDto.ZkratkaSu,
                            DatLoginTxt: this.model.LoginInfoDto.DatLoginTxt,
                            Image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon(this.model.LoginInfoDto.FazeGinisuNazev),
                            PrimaryText: this.model.LoginInfoDto.FazeGinisuPopis
                        };
                        Gordic.Wfl.Utils.LoadModuleInfoToStatistiky(optModuleInfoToStatistiky);
                    }
                    this.GenerateKpi();
                    Gordic.Wfl.AC.WflBaseAC.InitControl(this);
                    Gordic.Wfl.AC.WflBaseAC.CompleteMenu(this);
                }
                GenerateKpi() {
                    var that = this;
                }
                ;
                ShowCounts() {
                }
                ;
                LoadData() {
                    var that = this;
                    Gordic.Gin.Globals.ShowWaitLoadData(this);
                }
                ReloadData() {
                    this.LoadData();
                }
            };
            StartPage = __decorate([
                Decorators.gcontent
            ], StartPage);
            Others.StartPage = StartPage;
        })(Others = Tpd.Others || (Tpd.Others = {}));
    })(Tpd = Gordic.Tpd || (Gordic.Tpd = {}));
})(Gordic || (Gordic = {}));
;
var Gordic;
(function (Gordic) {
    var Tpd;
    (function (Tpd) {
        var Dlg;
        (function (Dlg) {
            const { gcontent } = Decorators;
            let FieldNames;
            (function (FieldNames) {
                FieldNames["Denik"] = "Denik";
                FieldNames["CjOd"] = "CjOd";
                FieldNames["CjDo"] = "CjDo";
                FieldNames["Rok"] = "Rok";
                FieldNames["IxsSU"] = "IxsSU";
                FieldNames["Datum"] = "Datum";
            })(FieldNames || (FieldNames = {}));
            let TiskPodacihoDenikuDlg = class TiskPodacihoDenikuDlg extends Gordic.GContentBase {
                onContentReady() {
                    Gordic.Wfl.AC.WflBaseAC.InitControl(this);
                    this.CreateForm();
                    //this.findFields().gfield("model", "apply", this.model);
                    this.topActions.push(this.CreateActionTisk());
                    Gordic.Wfl.AC.WflBaseAC.AddBaseActionsToMenu(this);
                    Gordic.Wfl.AC.WflBaseAC.CompleteMenu(this);
                }
                CreateForm() {
                    var Form = new Gordic.Forms.Form({
                        name: "frmTiskPodacihoDeniku",
                        layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000"
                    });
                    let that = this;
                    var form = $("<div>").appendTo(this.element);
                    switch (this.model.Typ) {
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                        case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                            Form.addRow("jres:23900022") //RC 23900022 : Deník
                                .addField("gselectbox", Gordic.Prefabs.Select.sslsden(), {
                                //initialValue: initialValueCj,
                                name: FieldNames.Denik,
                                model: "model.Denik=value.sslden",
                                serverFilters: this.setServerFiltersCj(false),
                                disabled: false,
                                initialValue: { sslden: this.model.Denik },
                                change: (ev, obj) => {
                                    //if (this.userSettings != null) {
                                    //    var sslden = obj.value?.sslden;
                                    //    this.userSettings.set("HledatPidCj", sslden);
                                    //}
                                }
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                            Form.addRow("jres:32000001"); //RC 32000001 : Čj od/do
                            Form.addField("gnumberbox", {
                                name: FieldNames.CjOd,
                                model: "model.CjOd=value",
                                customClass: "w-6",
                                step: 1,
                                initialValue: this.model.CjOd,
                                tooltip: "jres:23900016" //RC 23900016 : Čj od
                            });
                            Form.addField("gnumberbox", {
                                name: FieldNames.CjDo,
                                model: "model.CjDo=value",
                                customClass: "w-6",
                                step: 1,
                                initialValue: this.model.CjDo,
                                tooltip: "jres:23900019" //RC 23900019 : Čj do
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                            Form.addRow("jres:23900011") //RC 23900018 : Rok
                                .addField("gnumberbox", {
                                name: FieldNames.Rok,
                                model: "model.Rok=value",
                                minValue: 1990,
                                maxValue: 2100,
                                step: 1,
                                initialValue: this.model.Rok,
                                tooltip: "jres:23900011" //RC 23900011 : Rok
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                            Form.addRow("jres:23900013").addField("gselectbox", Gordic.Gin.Fields.ginspodSSU(//RC 23900013 : Spisový uzel
                            {
                                name: FieldNames.IxsSU,
                                model: "model.IxsSU=value.ixs_su",
                                serverFilters: {
                                    aktivita: [100],
                                },
                                initialValue: this.model.IxsSU
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE));
                            break;
                    }
                    switch (this.model.Typ) {
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                            Form.addRow().addField("gcheck", {
                                name: "GenerovatDleDataEvidence",
                                label: "jres:23900015", //RC 23900015 : Generovat dle data evidence
                                model: "model.GenerovatDleDataEvidence=value",
                                change: (ev, obj) => {
                                    if (Form) {
                                        that.findFields(FieldNames.Denik).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.CjOd).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.CjDo).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.Rok).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.Datum).gfield("option", "disabled", obj.value == false);
                                    }
                                }
                            });
                            break;
                    }
                    var l_labelDatum = "jres:23900024"; //RC 23900024 : Od - Do
                    //l_labelDatum = "jres:23900021"; //RC 23900024 : Od - Do
                    switch (this.model.Typ) {
                        case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                        case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                            l_labelDatum = "jres:23900021"; //RC 23900021 : Podáno
                            break;
                    }
                    switch (this.model.Typ) {
                        case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                        case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                            Form.addRow({ label: l_labelDatum, name: FieldNames.Datum }) //radek s intervalovymi policky //RC 23900004 : Datum
                                .addField("gdatecombobox", {
                                model: "model.Datum=value.date",
                                name: FieldNames.Datum,
                                defaultInitialValue: "all",
                                daysRangeMax: this.DaysRangeMax,
                                contextMenu: {
                                    daysRange: 50
                                },
                                initialValue: { date: this.model.Datum },
                                userSettings: this.userSettings,
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                            Form.addRow().addField("gcheck", {
                                name: "GenerovatDleDataVytvoreni",
                                label: "jres:23900014", //RC 23900014 : Generovat dle data vytvoření
                                model: "model.GenerovatDleDataVytvoreni=value",
                                change: (ev, obj) => {
                                    if (Form) {
                                        that.findFields(FieldNames.Denik).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.CjOd).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.CjDo).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.Rok).gfield("option", "disabled", obj.value != false);
                                        that.findFields(FieldNames.Datum).gfield("option", "disabled", obj.value == false);
                                    }
                                }
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                            Form.addRow().addField("gcheck", {
                                name: "ZaRokOdAktualnihoData",
                                label: "jres:23900007",
                                model: "model.ZaRokOdAktualnihoData=value",
                            });
                            break;
                    }
                    switch (this.model.Typ) {
                        case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                        case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                            Form.addRow().addField("gcheck", {
                                name: "ZaStredisko",
                                label: "jres:23900006",
                                model: "model.ZaStredisko=value",
                            });
                            break;
                    }
                    form.gform("createFrom", Form);
                    switch (this.model.Typ) {
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                            that.findFields(FieldNames.Datum).gfield("option", "disabled", true);
                            break;
                    }
                }
                setServerFiltersCj(nabizetPouzeUrciteDeniky) {
                    var pouzeAktualniDeniky = false;
                    if (this.globalSettings != null) {
                        var denikyDok = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.DenikyDok");
                        pouzeAktualniDeniky = denikyDok == null ? false : denikyDok;
                    }
                    var aktivita = pouzeAktualniDeniky === true ? [100] : [100, 500];
                    if (nabizetPouzeUrciteDeniky === true) {
                        aktivita = [100];
                    }
                    return {
                        priz_den_cj: [1, 2],
                        aktivita: aktivita,
                        PouzeUzivatelskeDeniky: nabizetPouzeUrciteDeniky
                    };
                }
                CreateActionTisk() {
                    var that = this;
                    function reportStartingInitParams(rep) {
                        var l_start = Gordic.Templates.Formatters.datetime(that.model.Datum.start, "yyyy-MM-dd") ?? "";
                        var l_end = Gordic.Templates.Formatters.datetime(that.model.Datum.end, "yyyy-MM-dd") ?? "";
                        if (that.model.ZaRokOdAktualnihoData == true) {
                            l_start = Gordic.Templates.Formatters.datetime(that.aktualniRok.start, "yyyy-MM-dd") ?? "";
                            l_end = Gordic.Templates.Formatters.datetime(that.aktualniRok.end, "yyyy-MM-dd") ?? "";
                        }
                        switch (that.model.Typ) {
                            case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                                rep.params.X0000 = that.SessionInfo.LogPorCislo?.toString();
                                rep.params.X0001 = l_start;
                                rep.params.X0002 = l_end;
                                rep.params.X0003 = that.model.Rok?.toString();
                                rep.params.X0004 = that.model.ZaStredisko ? "1" : "";
                                rep.params.X0005 = that.SessionInfo.IxsSu;
                                break;
                            case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                                rep.params.X0001 = that.model.CjOd?.toString();
                                rep.params.X0002 = that.model.CjDo?.toString();
                                rep.params.X0003 = that.model.Rok?.toString();
                                rep.params.X0004 = "N";
                                rep.params.X0005 = that.model.IxsSU ?? "";
                                if (that.model.GenerovatDleDataVytvoreni) {
                                    rep.params.X0001 = "";
                                    rep.params.X0002 = "";
                                    rep.params.X0003 = "";
                                    rep.params.X0006 = l_start;
                                    rep.params.X0007 = l_end;
                                }
                                if (that.model.ZaStredisko && that.SessionInfo.IsSamostatneStrediskoSpisovychUzlu) {
                                    if (that.SessionInfo.IxsTre)
                                        rep.params.X0008 = that.SessionInfo.IxsTre;
                                }
                                break;
                            case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                                rep.params.X0000 = that.model.Denik?.toString();
                                rep.params.X0001 = that.model.CjOd?.toString();
                                rep.params.X0002 = that.model.CjDo?.toString();
                                rep.params.X0003 = that.model.Rok?.toString();
                                if (that.model.ZaStredisko && that.SessionInfo.IsSamostatneStrediskoSpisovychUzlu) {
                                    if (that.SessionInfo.IxsTre)
                                        rep.params.X0004 = that.SessionInfo.IxsTre;
                                }
                                if (that.model.GenerovatDleDataVytvoreni || that.model.GenerovatDleDataEvidence) {
                                    rep.params.X0001 = "";
                                    rep.params.X0002 = "";
                                    rep.params.X0003 = "";
                                    rep.params.X0006 = l_start;
                                    rep.params.X0007 = l_end;
                                }
                                break;
                            case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                                rep.params.X0000 = that.model.Denik?.toString();
                                rep.params.X0001 = l_start;
                                rep.params.X0002 = l_end;
                                rep.params.X0005 = that.model.IxsSU?.toString();
                                if (that.model.ZaStredisko && that.SessionInfo.IsSamostatneStrediskoSpisovychUzlu) {
                                    if (that.SessionInfo.IxsTre)
                                        rep.params.X0008 = that.SessionInfo.IxsTre;
                                }
                                break;
                        }
                    }
                    that.findFields().gfield("model", "collect", that.model);
                    let l_tema = "";
                    switch (that.model.Typ) {
                        case 1 /* Wfl.Interface.TypTiskuPodacihoDeniku.knihaDoslePosty */:
                            l_tema = "tpd_ptm_knidp";
                            break;
                        case 2 /* Wfl.Interface.TypTiskuPodacihoDeniku.nevyrizeneSpisySM */:
                            l_tema = "ssl_ptm_poddsp";
                            break;
                        case 3 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikStandard */:
                            l_tema = "ssl_ptm_podden";
                            break;
                        case 4 /* Wfl.Interface.TypTiskuPodacihoDeniku.podaciDenikSM */:
                            l_tema = "ssl_ptm_poddsp";
                            break;
                    }
                    const printAction = this.actions.add(GAction.createPrintAction({
                        name: Gordic.Spi.Globals.ActionsName.tiskStitkuBaliku,
                        tema: l_tema,
                        caption: "jres:23900005", //RC 23900005 : Tisk
                        title: "jres:23900005",
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        dialogOpening: () => {
                            var dfd = $.Deferred();
                            this.waitForValues(this.element)
                                .then((isValid) => { isValid === true ? dfd.resolve() : dfd.reject(); })
                                .fail(() => { dfd.reject(); });
                            return dfd.promise();
                        },
                        reportStarting: (rep) => {
                            reportStartingInitParams(rep);
                        },
                        parentContent: this.parentContent == null ? undefined : this.parentContent,
                        fullScreen: true,
                        reportFinished: (rep) => {
                        },
                    }));
                    return printAction;
                }
                /**
                  * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
                  **/
                waitForValues(form) {
                    var dfd = $.Deferred();
                    form.gform("waitForValues")
                        .then(() => {
                        return form.gform("isValid");
                    })
                        .then((isValid) => {
                        dfd.resolve(isValid);
                    })
                        .fail(() => {
                        dfd.reject(false);
                    });
                    return dfd.promise();
                }
                OKClick() {
                    this.close();
                }
            };
            TiskPodacihoDenikuDlg = __decorate([
                gcontent
            ], TiskPodacihoDenikuDlg);
            Dlg.TiskPodacihoDenikuDlg = TiskPodacihoDenikuDlg;
        })(Dlg = Tpd.Dlg || (Tpd.Dlg = {}));
    })(Tpd = Gordic.Tpd || (Gordic.Tpd = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBkLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTdGFydFBhZ2UudHMiLCJUYWJzL1Rpc2tQb2RhY2lob0RlbmlrdURsZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBRWpCLElBQVUsTUFBTSxDQXNEZjtBQXRERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzRG5CO0lBdERnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0FzRDFCO1FBdERvQixXQUFBLE1BQU07WUFHdkIsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLE9BQUEsWUFBOEI7Z0JBQTdEOztvQkFHSSxtQkFBYyxHQUFVLEVBQUUsQ0FBQztnQkErQy9CLENBQUM7Z0JBMUNHLGNBQWM7b0JBQ1YsaUJBQWlCO29CQUNqQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxSixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENB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QUFLLEVBQUUsQ0FBQztnQkFDakIsQ0FBQzthQUNKLENBQUE7WUF2V1kscUJBQXFCO2dCQURqQyxRQUFRO2VBQ0kscUJBQXFCLENBdVdqQztZQXZXWSx5QkFBcUIsd0JBdVdqQyxDQUFBO1FBQ0wsQ0FBQyxFQXRYb0IsR0FBRyxHQUFILE9BQUcsS0FBSCxPQUFHLFFBc1h2QjtJQUFELENBQUMsRUF0WGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNYbkI7QUFBRCxDQUFDLEVBdFhTLE1BQU0sS0FBTixNQUFNLFFBc1hmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5UcGQuV2ViQ2xpZW50LlN0YXJ0UGFnZS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSDFoGluZGVsa2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIxLTAxLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlRwZC5PdGhlcnNcclxue1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTdGFydFBhZ2UgZXh0ZW5kcyBHQ29udGVudEJhc2U8V2ZsLkFDLldmbEJhc2VBQz5cclxuICAgIHtcclxuICAgICAgICBtb2RlbDogV2ZsLkludGVyZmFjZS5HV2ZsU291aHJuSW5mb0Jhc2VEdG87XHJcbiAgICAgICAgc2NvcmVjYXJkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICAgICAgZGl2U2VjdGlvbjA6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGl2U2VjdGlvbjE6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGl2U2VjdGlvbjI6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICAvL3RoaXMuU2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gJChcIjxkaXY+XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJmbGV4XCIpLmNzcyhcImFsaWduLWl0ZW1zXCIsIFwic3RyZXRjaFwiKS5jc3MoXCJhbGlnbi1jb250ZW50XCIsIFwic3RyZXRjaFwiKS5jc3MoXCJmbGV4LXdyYXBcIiwgXCJ3cmFwXCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGRpdi53aWR0aChcIjEwMCVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjAgPSAkKFwiPGRpdj5cIikud2lkdGgoXCIxMDAlXCIpLmFwcGVuZFRvKGRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjEgPSAkKFwiPGRpdj5cIikud2lkdGgoXCIzMDBweFwiKS5jc3MoXCJtaW4td2lkdGhcIiwgXCIzMDBweFwiKS5jc3MoXCJtYXgtd2lkdGhcIiwgXCIzMjBweFwiKS5jc3MoXCJmbGV4LWdyb3dcIiwgXCIxXCIpLmFwcGVuZFRvKGRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjIgPSAkKFwiPGRpdj5cIikuY3NzKFwiZmxleC1ncm93XCIsIFwiM1wiKS5hcHBlbmRUbyhkaXYpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRNb2R1bGVJbmZvVG9TdGF0aXN0aWt5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFwcGVuZFRvRGl2OiB0aGlzLmRpdlNlY3Rpb24wLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hemV2UmVmOiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuTmF6ZXZSZWYhLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hemV2RnVuOiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuTmF6ZXZGdW4hLFxyXG4gICAgICAgICAgICAgICAgICAgIFphc3R1cFR4dDogdGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8hLlphc3R1cFR4dCEsXHJcbiAgICAgICAgICAgICAgICAgICAgWmtyYXRrYVN1OiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuWmtyYXRrYVN1ISxcclxuICAgICAgICAgICAgICAgICAgICBEYXRMb2dpblR4dDogdGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8hLkRhdExvZ2luVHh0ISxcclxuICAgICAgICAgICAgICAgICAgICBJbWFnZTogR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0LmNyZWF0ZU1vZHVsZUljb24odGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8uRmF6ZUdpbmlzdU5hemV2ISksXHJcbiAgICAgICAgICAgICAgICAgICAgUHJpbWFyeVRleHQ6IHRoaXMubW9kZWwuTG9naW5JbmZvRHRvLkZhemVHaW5pc3VQb3BpcyFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMuTG9hZE1vZHVsZUluZm9Ub1N0YXRpc3Rpa3kob3B0TW9kdWxlSW5mb1RvU3RhdGlzdGlreSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLkdlbmVyYXRlS3BpKCk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQUMuV2ZsQmFzZUFDLkluaXRDb250cm9sKHRoaXMpO1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFDLldmbEJhc2VBQy5Db21wbGV0ZU1lbnUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHZW5lcmF0ZUtwaSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFNob3dDb3VudHMoKSB7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgTG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsIm5hbWVzcGFjZSBHb3JkaWMuVHBkLkRsZ1xyXG57XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcbiAgICBlbnVtIEZpZWxkTmFtZXMge1xyXG4gICAgICAgIERlbmlrID0gXCJEZW5pa1wiLFxyXG4gICAgICAgIENqT2QgPSBcIkNqT2RcIixcclxuICAgICAgICBDakRvID0gXCJDakRvXCIsXHJcbiAgICAgICAgUm9rID0gXCJSb2tcIixcclxuICAgICAgICBJeHNTVSA9IFwiSXhzU1VcIixcclxuICAgICAgICBEYXR1bSA9IFwiRGF0dW1cIixcclxuICAgIH1cclxuXHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgVGlza1BvZGFjaWhvRGVuaWt1RGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlPEdvcmRpYy5XZmwuQUMuV2ZsQmFzZUFDPlxyXG4gICAge1xyXG4gICAgICAgIC8vZGF0YTogSW50ZXJmYWNlLkdQb3R2cnplbmlFbFBvZGFuaUR0b1tdO1xyXG4gICAgICAgIG1vZGVsOiBXZmwuSW50ZXJmYWNlLkdHZW5lcm92YW5pUG9kYWNpY2hEZW5pa3VGaWx0ZXJEdG87XHJcbiAgICAgICAgYWt0dWFsbmlSb2s6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkxpc3RzLldmbERhdGVJbnRlcnZhbER0b1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFDLldmbEJhc2VBQy5Jbml0Q29udHJvbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50b3BBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25UaXNrKCkpO1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFDLldmbEJhc2VBQy5BZGRCYXNlQWN0aW9uc1RvTWVudSh0aGlzKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5BQy5XZmxCYXNlQUMuQ29tcGxldGVNZW51KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmcm1UaXNrUG9kYWNpaG9EZW5pa3VcIixcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5wb2RhY2lEZW5pa1NNOlxyXG4gICAgICAgICAgICAgICAgICAgIEZvcm0uYWRkUm93KFwianJlczoyMzkwMDAyMlwiKSAvL1JDIDIzOTAwMDIyIDogRGVuw61rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHNkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IGluaXRpYWxWYWx1ZUNqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5EZW5payxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkRlbmlrPXZhbHVlLnNzbGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogdGhpcy5zZXRTZXJ2ZXJGaWx0ZXJzQ2ooZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHNzbGRlbjogdGhpcy5tb2RlbC5EZW5payB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgc3NsZGVuID0gb2JqLnZhbHVlPy5zc2xkZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy51c2VyU2V0dGluZ3Muc2V0KFwiSGxlZGF0UGlkQ2pcIiwgc3NsZGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1Lm5ldnlyaXplbmVTcGlzeVNNOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFRpc2t1UG9kYWNpaG9EZW5pa3UucG9kYWNpRGVuaWtTdGFuZGFyZDpcclxuICAgICAgICAgICAgICAgICAgICBGb3JtLmFkZFJvdyhcImpyZXM6MzIwMDAwMDFcIikgLy9SQyAzMjAwMDAwMSA6IMSMaiBvZC9kb1xyXG4gICAgICAgICAgICAgICAgICAgIEZvcm0uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuQ2pPZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkNqT2Q9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5tb2RlbC5Dak9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMDE2XCIgLy9SQyAyMzkwMDAxNiA6IMSMaiBvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBGb3JtLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLkNqRG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5DakRvPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMubW9kZWwuQ2pEbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDAxOVwiIC8vUkMgMjM5MDAwMTkgOiDEjGogZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1Lm5ldnlyaXplbmVTcGlzeVNNOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFRpc2t1UG9kYWNpaG9EZW5pa3UucG9kYWNpRGVuaWtTdGFuZGFyZDpcclxuICAgICAgICAgICAgICAgICAgICBGb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMTFcIikgLy9SQyAyMzkwMDAxOCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5Sb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuUm9rPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDE5OTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDIxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMubW9kZWwuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDAxMVwiIC8vUkMgMjM5MDAwMTEgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwuVHlwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5uZXZ5cml6ZW5lU3Bpc3lTTTpcclxuICAgICAgICAgICAgICAgICAgICBGb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMTNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5HaW4uRmllbGRzLmdpbnNwb2RTU1UoIC8vUkMgMjM5MDAwMTMgOiBTcGlzb3bDvSB1emVsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLkl4c1NVLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5JeHNTVT12YWx1ZS5peHNfc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5tb2RlbC5JeHNTVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ2hvdmFuaVN0cmVkaXNrYURsZVVjZWx1LkJFWk5FKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwuVHlwKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5wb2RhY2lEZW5pa1N0YW5kYXJkOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBGb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR2VuZXJvdmF0RGxlRGF0YUV2aWRlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjIzOTAwMDE1XCIsIC8vUkMgMjM5MDAwMTUgOiBHZW5lcm92YXQgZGxlIGRhdGEgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkdlbmVyb3ZhdERsZURhdGFFdmlkZW5jZT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChGb3JtKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGROYW1lcy5EZW5paykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgb2JqLnZhbHVlICE9IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGROYW1lcy5Dak9kKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgIT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhGaWVsZE5hbWVzLkNqRG8pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIG9iai52YWx1ZSAhPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkTmFtZXMuUm9rKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgIT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhGaWVsZE5hbWVzLkRhdHVtKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgPT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsX2xhYmVsRGF0dW0gPSBcImpyZXM6MjM5MDAwMjRcIjsgLy9SQyAyMzkwMDAyNCA6IE9kIC0gRG9cclxuICAgICAgICAgICAgLy9sX2xhYmVsRGF0dW0gPSBcImpyZXM6MjM5MDAwMjFcIjsgLy9SQyAyMzkwMDAyNCA6IE9kIC0gRG9cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LmtuaWhhRG9zbGVQb3N0eTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU006XHJcbiAgICAgICAgICAgICAgICAgICAgbF9sYWJlbERhdHVtID0gXCJqcmVzOjIzOTAwMDIxXCI7IC8vUkMgMjM5MDAwMjEgOiBQb2TDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LmtuaWhhRG9zbGVQb3N0eTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1Lm5ldnlyaXplbmVTcGlzeVNNOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFRpc2t1UG9kYWNpaG9EZW5pa3UucG9kYWNpRGVuaWtTdGFuZGFyZDpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU006XHJcbiAgICAgICAgICAgICAgICAgICAgRm9ybS5hZGRSb3coeyBsYWJlbDogbF9sYWJlbERhdHVtLCBuYW1lOiBGaWVsZE5hbWVzLkRhdHVtIH0pIC8vcmFkZWsgcyBpbnRlcnZhbG92eW1pIHBvbGlja3kgLy9SQyAyMzkwMDAwNCA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlY29tYm9ib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuRGF0dW09dmFsdWUuZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5EYXR1bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRJbml0aWFsVmFsdWU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2VNYXg6IHRoaXMuRGF5c1JhbmdlTWF4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2U6IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGRhdGU6IHRoaXMubW9kZWwuRGF0dW0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1Lm5ldnlyaXplbmVTcGlzeVNNOlxyXG4gICAgICAgICAgICAgICAgICAgIEZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHZW5lcm92YXREbGVEYXRhVnl0dm9yZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjIzOTAwMDE0XCIsIC8vUkMgMjM5MDAwMTQgOiBHZW5lcm92YXQgZGxlIGRhdGEgdnl0dm/FmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLkdlbmVyb3ZhdERsZURhdGFWeXR2b3Jlbmk9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHsgLy9SQyAyMzkwMDAxNSA6IEdlbmVyb3ZhdCBkbGUgZGF0YSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhGaWVsZE5hbWVzLkRlbmlrKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgIT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGROYW1lcy5Dak9kKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgIT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGROYW1lcy5DakRvKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgIT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGROYW1lcy5Sb2spLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIG9iai52YWx1ZSAhPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhGaWVsZE5hbWVzLkRhdHVtKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBvYmoudmFsdWUgPT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm1vZGVsLlR5cCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFRpc2t1UG9kYWNpaG9EZW5pa3Uua25paGFEb3NsZVBvc3R5OlxyXG4gICAgICAgICAgICAgICAgICAgIEZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJaYVJva09kQWt0dWFsbmlob0RhdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjM5MDAwMDdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLlphUm9rT2RBa3R1YWxuaWhvRGF0YT12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwuVHlwKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5rbmloYURvc2xlUG9zdHk6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5uZXZ5cml6ZW5lU3Bpc3lTTTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5wb2RhY2lEZW5pa1NNOlxyXG4gICAgICAgICAgICAgICAgICAgIEZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJaYVN0cmVkaXNrb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyMzkwMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuWmFTdHJlZGlza289dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTsgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwuVHlwKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5uZXZ5cml6ZW5lU3Bpc3lTTTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkTmFtZXMuRGF0dW0pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U2VydmVyRmlsdGVyc0NqKG5hYml6ZXRQb3V6ZVVyY2l0ZURlbmlreTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2YXIgcG91emVBa3R1YWxuaURlbmlreSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVuaWt5RG9rID0gdGhpcy5nbG9iYWxTZXR0aW5ncy5nZXQoXCJHbG9iYWwuV2ZsLkFwcFNldHRpbmdzLk90aGVyc1NldHRpbmdzLkRlbmlreURva1wiKTtcclxuICAgICAgICAgICAgICAgIHBvdXplQWt0dWFsbmlEZW5pa3kgPSBkZW5pa3lEb2sgPT0gbnVsbCA/IGZhbHNlIDogZGVuaWt5RG9rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBha3Rpdml0YSA9IHBvdXplQWt0dWFsbmlEZW5pa3kgPT09IHRydWUgPyBbMTAwXSA6IFsxMDAsIDUwMF07XHJcbiAgICAgICAgICAgIGlmIChuYWJpemV0UG91emVVcmNpdGVEZW5pa3kgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhID0gWzEwMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByaXpfZGVuX2NqOiBbMSwgMl0sXHJcbiAgICAgICAgICAgICAgICBha3Rpdml0YTogYWt0aXZpdGEsXHJcbiAgICAgICAgICAgICAgICBQb3V6ZVV6aXZhdGVsc2tlRGVuaWt5OiBuYWJpemV0UG91emVVcmNpdGVEZW5pa3lcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENyZWF0ZUFjdGlvblRpc2soKTogR0FjdGlvbiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlcG9ydFN0YXJ0aW5nSW5pdFBhcmFtcyhyZXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsX3N0YXJ0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKHRoYXQubW9kZWwuRGF0dW0hLnN0YXJ0ISwgXCJ5eXl5LU1NLWRkXCIpID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgbF9lbmQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUodGhhdC5tb2RlbC5EYXR1bSEuZW5kISwgXCJ5eXl5LU1NLWRkXCIpID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5aYVJva09kQWt0dWFsbmlob0RhdGEgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxfc3RhcnQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUodGhhdC5ha3R1YWxuaVJvayEuc3RhcnQhLCBcInl5eXktTU0tZGRcIikgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsX2VuZCA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZSh0aGF0LmFrdHVhbG5pUm9rIS5lbmQhLCBcInl5eXktTU0tZGRcIikgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhhdC5tb2RlbC5UeXApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5rbmloYURvc2xlUG9zdHk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSB0aGF0LlNlc3Npb25JbmZvLkxvZ1BvckNpc2xvPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAxID0gbF9zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IGxfZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gdGhhdC5tb2RlbC5Sb2s/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDQgPSB0aGF0Lm1vZGVsLlphU3RyZWRpc2tvID8gXCIxXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gdGhhdC5TZXNzaW9uSW5mby5JeHNTdSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5uZXZ5cml6ZW5lU3Bpc3lTTTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IHRoYXQubW9kZWwuQ2pPZD8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IHRoYXQubW9kZWwuQ2pEbz8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMyA9IHRoYXQubW9kZWwuUm9rPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA0ID0gXCJOXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDUgPSB0aGF0Lm1vZGVsLkl4c1NVID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLkdlbmVyb3ZhdERsZURhdGFWeXR2b3JlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDYgPSBsX3N0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNyA9IGxfZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLlphU3RyZWRpc2tvICYmIHRoYXQuU2Vzc2lvbkluZm8uSXNTYW1vc3RhdG5lU3RyZWRpc2tvU3Bpc292eWNoVXpsdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuU2Vzc2lvbkluZm8uSXhzVHJlKSByZXAucGFyYW1zLlgwMDA4ID0gdGhhdC5TZXNzaW9uSW5mby5JeHNUcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSB0aGF0Lm1vZGVsLkRlbmlrPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAxID0gdGhhdC5tb2RlbC5Dak9kPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gdGhhdC5tb2RlbC5DakRvPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gdGhhdC5tb2RlbC5Sb2s/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLlphU3RyZWRpc2tvICYmIHRoYXQuU2Vzc2lvbkluZm8uSXNTYW1vc3RhdG5lU3RyZWRpc2tvU3Bpc292eWNoVXpsdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuU2Vzc2lvbkluZm8uSXhzVHJlKSByZXAucGFyYW1zLlgwMDA0ID0gdGhhdC5TZXNzaW9uSW5mby5JeHNUcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuR2VuZXJvdmF0RGxlRGF0YVZ5dHZvcmVuaSB8fCB0aGF0Lm1vZGVsLkdlbmVyb3ZhdERsZURhdGFFdmlkZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNiA9IGxfc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA3ID0gbF9lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU006XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSB0aGF0Lm1vZGVsLkRlbmlrPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAxID0gbF9zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IGxfZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gdGhhdC5tb2RlbC5JeHNTVT8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuWmFTdHJlZGlza28gJiYgdGhhdC5TZXNzaW9uSW5mby5Jc1NhbW9zdGF0bmVTdHJlZGlza29TcGlzb3Z5Y2hVemx1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5TZXNzaW9uSW5mby5JeHNUcmUpIHJlcC5wYXJhbXMuWDAwMDggPSB0aGF0LlNlc3Npb25JbmZvLkl4c1RyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICBsZXQgbF90ZW1hID0gXCJcIjtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGF0Lm1vZGVsLlR5cCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFRpc2t1UG9kYWNpaG9EZW5pa3Uua25paGFEb3NsZVBvc3R5OlxyXG4gICAgICAgICAgICAgICAgICAgIGxfdGVtYSA9IFwidHBkX3B0bV9rbmlkcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5uZXZ5cml6ZW5lU3Bpc3lTTTpcclxuICAgICAgICAgICAgICAgICAgICBsX3RlbWEgPSBcInNzbF9wdG1fcG9kZHNwXCJcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBUaXNrdVBvZGFjaWhvRGVuaWt1LnBvZGFjaURlbmlrU3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbF90ZW1hID0gXCJzc2xfcHRtX3BvZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwVGlza3VQb2RhY2lob0RlbmlrdS5wb2RhY2lEZW5pa1NNOlxyXG4gICAgICAgICAgICAgICAgICAgIGxfdGVtYSA9IFwic3NsX3B0bV9wb2Rkc3BcIlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcmludEFjdGlvbiA9IHRoaXMuYWN0aW9ucy5hZGQoR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBTcGkuR2xvYmFscy5BY3Rpb25zTmFtZS50aXNrU3RpdGt1QmFsaWt1LFxyXG4gICAgICAgICAgICAgICAgdGVtYTogbF90ZW1hLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDA1XCIsIC8vUkMgMjM5MDAwMDUgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjIzOTAwMDA1XCIsICBcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS50aXNrLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQWN0aW9uc0dyb3VwTmFtZS5GYXZvcml0ZSxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvclZhbHVlcyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpc1ZhbGlkKSA9PiB7IGlzVmFsaWQgPT09IHRydWUgPyBkZmQucmVzb2x2ZSgpIDogZGZkLnJlamVjdCgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRmZC5yZWplY3QoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogKHJlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nSW5pdFBhcmFtcyhyZXApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q29udGVudCA9PSBudWxsID8gdW5kZWZpbmVkIDogdGhpcy5wYXJlbnRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgZnVsbFNjcmVlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiAocmVwKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSkpIGFzIEdQcmludEFjdGlvblR5cGU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJpbnRBY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogbWV0b2RhLCBrdGVyw6EgcHJvdmVkZSB2YWxpZGFjaSBhIHZyw6F0w60gdsO9c2xlZGVrIHZhbGlkYWNlIGHFviBqZSBmb3JtdWzDocWZIHDFmWlwcmF2ZW5cclxuICAgICAgICAgICoqL1xyXG4gICAgICAgIHByaXZhdGUgd2FpdEZvclZhbHVlcyhmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChpc1ZhbGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoaXNWYWxpZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT0tDbGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==