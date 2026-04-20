"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Otevře prehled vypravencych
             *
             * @author  JSindelka
             * @date    7.1.2019
             *
             * @param {gcontent} parentContent The content.
             * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
             * @param {!object} opt Parametry dialogu.
             * @returns {JQueryPromise<undefined>} Promise.
             */
            function OpenProvedenaVypraveniDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    Id: "ProvedenaVypraveniZasilekObsahListPage#",
                    TridVyp: opt ? opt.TridVyp : "",
                    ZpusobDorProp: opt ? opt.ZpusobDor : ""
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.ProvedenaVypraveniZasilekObsahListPage', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.OpenProvedenaVypraveniDlg = OpenProvedenaVypraveniDlg;
            function EditaceZasilkyDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "EditaceZasilkyDlg#",
                    Data: opt ? opt.data : null,
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.EditaceZasilkyDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.EditaceZasilkyDlg = EditaceZasilkyDlg;
            function PredplneniZasilkyDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "PredplneniZasilkyDlg#",
                    Predplneni: opt ? opt.data : null,
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.PredplneniZasilkyDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.PredplneniZasilkyDlg = PredplneniZasilkyDlg;
            function CenikSluzebDlg(parentContent, ModOtevreni) {
                const options = {
                    ID: "GCenikSluzebDlg#",
                    Typ: 1 /* Wfl.Interface.TypCenikuPosty.cenikPostovnichSluzeb */
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.GCenikDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.CenikSluzebDlg = CenikSluzebDlg;
            function CenikZasilekDlg(parentContent, ModOtevreni) {
                const options = {
                    ID: "CenikZasilekDlg#",
                    Typ: 2 /* Wfl.Interface.TypCenikuPosty.cenikZasilek */
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.GCenikDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.CenikZasilekDlg = CenikZasilekDlg;
            function EditacePolozkyCenikuDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "EditacePolozkyCenikuDlg#",
                    Detail: opt ? opt.Detail : null,
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.EditacePolozkyCenikuDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.EditacePolozkyCenikuDlg = EditacePolozkyCenikuDlg;
            /**
        * automaticke ukladani
        *
        * @author  JSindelka
        * @date    22.11.2019
        *
        * @param {gcontent} parentContent The content.
        * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
        * @param {!object} opt Parametry dialogu.
        * @returns {JQueryPromise<undefined>} Promise.
        */
            function DataMatrixCteckaCallDlg(parentContent, opt, ModOtevreni) {
                const options = {
                    Id: "DataMatrixCteckaDlg#",
                    DataMatrixDto: opt ? opt.DataMatrixDto : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                const windowParams = undefined;
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Vyp.WebControls.DataMatrixCteckaDlg', ModOtevreni, options, windowParams);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.DataMatrixCteckaCallDlg = DataMatrixCteckaCallDlg;
        })(Dialogs = Vyp.Dialogs || (Vyp.Dialogs = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Icons;
        (function (Icons) {
            let ActionEnum;
            (function (ActionEnum) {
                ActionEnum["frankovaniOnline"] = "fa-pencil-square-o";
                ActionEnum["frankovaniOffline"] = "fa-link";
            })(ActionEnum = Icons.ActionEnum || (Icons.ActionEnum = {}));
        })(Icons = Vyp.Icons || (Vyp.Icons = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Globals;
        (function (Globals) {
            var Enums;
            (function (Enums) {
                let ActionsName;
                (function (ActionsName) {
                    ActionsName["Vypravit"] = "actVypravit";
                    ActionsName["OveritAdresaty"] = "actOveritAdresaty";
                    ActionsName["FrankovaniOnline"] = "actFrankovaniOnline";
                    ActionsName["FrankovaniOffline"] = "actFrankovaniOffline";
                    ActionsName["PrevzitSFrankovanim"] = "actPrevzitSFrankovanim";
                    ActionsName["ImportDatEpaPosty"] = "actImportDatEpaPosty";
                    ActionsName["TiskPodacihoArchu"] = "actTiskPodacihoArchu";
                    ActionsName["TiskEvidListPostovneho"] = "actTiskEvidListPostovneho";
                    ActionsName["TiskKnihyVypravenePosty"] = "actTiskKnihyVypravenePosty";
                    ActionsName["TiskVykazu"] = "actTiskVykazu";
                    ActionsName["TiskNakladu"] = "actTiskNakladu";
                })(ActionsName = Enums.ActionsName || (Enums.ActionsName = {}));
                //---------------------------------------------------------------------
                let TypTiskuPodacihoArchu;
                (function (TypTiskuPodacihoArchu) {
                    TypTiskuPodacihoArchu[TypTiskuPodacihoArchu["netisknou"] = 0] = "netisknou";
                    TypTiskuPodacihoArchu[TypTiskuPodacihoArchu["tisknout"] = 10] = "tisknout";
                    TypTiskuPodacihoArchu[TypTiskuPodacihoArchu["tisknoutDoporucene"] = 30] = "tisknoutDoporucene";
                    TypTiskuPodacihoArchu[TypTiskuPodacihoArchu["tisknoutDoZahranici"] = 50] = "tisknoutDoZahranici";
                    TypTiskuPodacihoArchu[TypTiskuPodacihoArchu["tisknoutDoZahraniciDoporucene"] = 60] = "tisknoutDoZahraniciDoporucene";
                })(TypTiskuPodacihoArchu = Enums.TypTiskuPodacihoArchu || (Enums.TypTiskuPodacihoArchu = {}));
            })(Enums = Globals.Enums || (Globals.Enums = {}));
        })(Globals = Vyp.Globals || (Vyp.Globals = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Vyp.WebControls.StartPage.ts                         </Name>
//    <Description>                                                             </Description>
//    <Author>      Jiří Šindelka                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-02                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Others;
        (function (Others) {
            let StartPage = class StartPage extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.scorecardItems = [];
                }
                onContentReady() {
                    //this.SetData();
                    debugger;
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
        })(Others = Vyp.Others || (Vyp.Others = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
;
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Vyp.WebControls.VypraveniSettingsForm.ts                 </Name>
//    <Description> Uživatelské nastavení zásilek.                              </Description>
//    <Author>      JSindelka                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-05-22                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Cesta k objetu nastavení zásilky v GStore.
             *
             * @author  JSindelka
             * @date    30.04.2019
             */
            AppSettings.VypBaseSettingsPath = "Global.Vyp.AppSettings.VypBaseSettings";
            /**
             * Vrátí hodnoty uživatelského nastavení zásilky.
             *
             * @author  JSindelka
             * @date    30.04.2019
             *
             * @returns {Gordic.Vyp.WebControls.GVypBaseSettingsDto} Hodnoty uživatelského nastavení zásilky.
             */
            function GetVypBaseSettings() {
                const settings = window.gstor.get(AppSettings.VypBaseSettingsPath, true);
                if (settings) {
                    return settings;
                }
                else {
                    return {
                        prevzit_dle_id_automaticky: false
                    };
                }
            }
            AppSettings.GetVypBaseSettings = GetVypBaseSettings;
            /**
             * Nastaví hodnoty uživatelského nastavení zásilky.
             *
             * @author  JSindelka
             * @date    30.04.2019
             *
             * @param {Gordic.Vyp.AppSettings.GVypBaseSettingsDto | null} value Hodnoty uživatelského nastavení zásilky.
             */
            function SetVypBaseSettings(value) {
                window.gstor.set(AppSettings.VypBaseSettingsPath, value);
            }
            AppSettings.SetVypBaseSettings = SetVypBaseSettings;
            /**
             * Formulář uživatelského nastavení vypravení.
             *
             * @author  JSindelka
             * @date    30.04.2019
             */
            function VypBaseSettingsForm() {
                const formName = "VypBaseSettingsForm";
                let modelProperty;
                const form = new Gordic.Forms.Form({
                    name: formName,
                    tabOptions: {
                        title: "jres:23900130", //RC 23900130 : Základní nastavení
                        opened: false
                    }
                });
                form.addSection("jres:23900141"); //RC 23900141 : Start aplikace
                form.addRow().addField("gcheck", "", { name: "spustitPosledniTask", model: AppSettings.VypBaseSettingsPath + "." + (modelProperty = "spustitPosledniTask"), label: "jres:23900142" }); //RC 23900142 : Spustit poslední otevřenou úlohu
                form.addSection("jres:23900131"); //RC 23900131 : Automatický příjem zásilek dle ID
                form.addRow().addField("gcheck", "", { name: "prevzit_dle_id_automaticky", model: AppSettings.VypBaseSettingsPath + "." + (modelProperty = "prevzit_dle_id_automaticky"), label: "jres:23900132" }); //RC 23900132 : Zobrazit okno pro kontrolu zásilky a převzít
                return form;
            }
            AppSettings.VypBaseSettingsForm = VypBaseSettingsForm;
        })(AppSettings = Vyp.AppSettings || (Vyp.AppSettings = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Vyp.WebControls.VypraveniSettingsForm.ts                 </Name>
//    <Description> Uživatelské nastavení zásilek.                              </Description>
//    <Author>      JSindelka                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-05-22                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var AppSettings;
        (function (AppSettings) {
            let fieldNames;
            (function (fieldNames) {
                fieldNames["stat"] = "stat";
                fieldNames["psc"] = "psc";
                fieldNames["frankovani_podaci_cislo"] = "frankovani_podaci_cislo";
                fieldNames["frankovani_pretridit"] = "frankovani_pretridit";
                fieldNames["tridit_dle_souboru"] = "tridit_dle_souboru";
                fieldNames["kontrolovat_spravnost_dle_souboru"] = "kontrolovat_spravnost_dle_souboru";
                fieldNames["opravit_data_dle_souboru"] = "opravit_data_dle_souboru";
                fieldNames["pouzivat_soubor_bez_pidu"] = "pouzivat_soubor_bez_pidu";
                fieldNames["frankovat_pri_prevzeti"] = "frankovat_pri_prevzeti";
            })(fieldNames || (fieldNames = {}));
            /**
             * Cesta k objetu nastavení zásilky v GStore.
             *
             * @author  JSindelka
             * @date    30.04.2019
             */
            AppSettings.VypraveniSettingsPath = "Global.Vyp.AppSettings.VypraveniSettings";
            /**
         * Vrátí hodnoty uživatelského nastavení zásilky.
         *
         * @author  JSindelka
         * @date    30.04.2019
         *
         * @returns {Gordic.Vyp.WebControls.GVypraveniSettingsDto} Hodnoty uživatelského nastavení zásilky.
         */
            function GetVypraveniSettings(content) {
                const settings = content.globalSettings.get(AppSettings.VypraveniSettingsPath, true);
                if (settings) {
                    return settings;
                }
                else {
                    return {
                        text_za: "",
                        text_pred: "",
                        posledniPodaciCislo: null,
                        poplatek: null,
                        vaha: null,
                        stat: 42,
                        psc: "",
                        dotaz_pri_vypraveni: true,
                    };
                }
            }
            AppSettings.GetVypraveniSettings = GetVypraveniSettings;
            /**
             * Nastaví hodnoty uživatelského nastavení zásilky.
             *
             * @author  JSindelka
             * @date    30.04.2019
             *
             * @param {Gordic.Vyp.AppSettings.IGVypraveniSettings | null} value Hodnoty uživatelského nastavení zásilky.
             */
            function SetVypraveniSettings(content, value) {
                content.globalSettings.merge(AppSettings.VypraveniSettingsPath, value);
            }
            AppSettings.SetVypraveniSettings = SetVypraveniSettings;
            /**
             * Formulář uživatelského nastavení vypravení.
             *
             * @author  JSindelka
             * @date    30.04.2019
             */
            function VypraveniSettingsForm() {
                const formName = "VypraveniSettingsForm";
                let modelProperty;
                const form = new Gordic.Forms.Form({
                    name: formName,
                    tabOptions: {
                        title: "jres:23900055", //RC 23900055 : Vypravení zásilek
                        opened: false
                    }
                });
                //Nastavení počátečních hodnot pro vypravení zásilek
                form.addSection("jres:23900138"); //RC 23900138 : Nastavení chování aplikace při vypravení zásilek
                form.addRow().addField("gcheck", "", { name: "zasilky_k_vypraveni_neoznacovat", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "zasilky_k_vypraveni_neoznacovat"), label: "jres:23900139" }); //RC 23900139 : Zásilky k vypravení standardně neoznačovat
                form.addRow().addField("gcheck", "", { name: "dotaz_pri_vypraveni", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "dotaz_pri_vypraveni"), label: "jres:23900140" }); //RC 23900140 : Dotaz na potvrzení operace vypravení
                form.addSection("jres:23900056"); //RC 23900056 : Nastavení počátečních hodnot pro vypravení zásilek
                form.addRow("jres:23900021" + ", " + "jres:23900022")
                    .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ginspsc(), {
                    name: fieldNames.psc,
                    model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "psc") + "=value.psc; " +
                        AppSettings.VypraveniSettingsPath + "." + (modelProperty = "stat") + "=value.stat",
                    change: function (event, input) {
                        if (input && input.value) {
                            const statField = $(event.target).gform().findForms(formName).findFields(fieldNames.stat);
                            statField.gfield("setInitial", { stat: input.value.stat }, false);
                        }
                    }
                }) //RC 23900021 : PSČ
                    .addField("gselectbox", "w-8", Gordic.Prefabs.Select.gincsta(), {
                    name: fieldNames.stat, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "stat") + "=value.stat"
                }); //RC 23900022 : Stát
                form.addRow().addField("gcheck", "", { name: "novePodaciCislo", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "novePodaciCislo"), label: "jres:23900189" }); //RC 23900189 : Nové podací číslo
                form.addRow("jres:23900023").addField("gselectbox", Gordic.Prefabs.Select.wflsdos(), { name: "dor_sluzba", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "dor_sluzba") + "=value.dor_sluzba" }); //RC 23900023 : Doručovací služba
                form.addRow("jres:23900043" + ", " + "jres:23900044" + ", " + "jres:23900045") //RC 23900046 : Nové pod. číslo
                    .addField("gstringbox", "w-3", { name: "text_pred", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "text_pred") })
                    .addField("gnumberbox", "w-3", { name: "posledniPodaciCislo", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "posledniPodaciCislo") })
                    .addField("gstringbox", "w-3", { name: "text_za", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "text_za") })
                    //.addField("gcheck", "", { name: "novePodaciCislo" }) 
                    .addRow("jres:23900015" + ", " + "jres:23900016") //RC 23900015 : Poplatek
                    .addField("gnumberbox", "w-3", { name: "poplatek", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "poplatek"), decimals: 4, minValue: 0, maxValue: 99.9999 })
                    .addField("gnumberbox", "w-3", { name: "vaha", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "vaha"), decimals: 4, minValue: 0, maxValue: 99.9999 });
                //Frankování
                form.addSection("jres:23900116"); //RC 23900116 : Frankování
                form.addRow({ label: "jres:23900124" }).addField("gradio", {
                    name: "typ_frankovani",
                    // model: VypraveniSettingsPath + "." + (modelProperty = "typ_frankovani"),
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply": // naplneni multivalue policka z DTO
                                var l_val = dto.Global.Vyp.AppSettings.VypraveniSettings.typ_frankovani;
                                if (l_val == null)
                                    l_val = 0 /* Wfl.Interface.TypFrankovacihoStroje.neurceno */;
                                //$(this).gfield("setValue", l_val); //dsebesta 19.05.2022
                                $(this).gfield("setInitial", l_val);
                                $(this).gfield("confirm");
                                return;
                            case "collect": // naplneni DTO hodnotou z multivalue policka (vraci vzdy pole)                      
                                var l_po = $(this).gfield("getValue");
                                //if (l_po != null) Gordic.Utils.setValueByKeyPath("Global.Vyp.AppSettings.VypraveniSettings.typ_frankovani", dto, l_po) 
                                if (l_po != null)
                                    Gordic.Utils.setValueByKeyPath(AppSettings.VypraveniSettingsPath + "." + (modelProperty = "typ_frankovani"), dto, l_po);
                                return;
                        }
                        return "typ_frankovani";
                    },
                    radios: [
                        { value: 0 /* Wfl.Interface.TypFrankovacihoStroje.neurceno */, label: 'jres:23900119' }, //RC 23900119 : Žádné
                        { value: 25 /* Wfl.Interface.TypFrankovacihoStroje.FramaSoubor */, label: 'jres:23900120' }, //RC 23900120 : Frama - import ze souboru
                        { value: 16 /* Wfl.Interface.TypFrankovacihoStroje.NeopostDataMatrixCtecka */, label: 'jres:23900118' }, //RC 23900118 : Data-matrixová 2D čtečka
                    ], change: function (event, input) {
                        let l_disableDataMatrixSettings = true;
                        let l_disableFramaFileSettings = true;
                        if (input.value) {
                            switch (input.value) {
                                case 16 /* Wfl.Interface.TypFrankovacihoStroje.NeopostDataMatrixCtecka */:
                                    l_disableDataMatrixSettings = false;
                                    break;
                                case 25 /* Wfl.Interface.TypFrankovacihoStroje.FramaSoubor */:
                                    l_disableFramaFileSettings = false;
                                    break;
                            }
                        }
                        var l_form = $(this).closest(".gform");
                        if (l_form) {
                            l_form.findFields(fieldNames.tridit_dle_souboru).gfield("option", "disabled", l_disableFramaFileSettings);
                            l_form.findFields(fieldNames.kontrolovat_spravnost_dle_souboru).gfield("option", "disabled", l_disableFramaFileSettings);
                            l_form.findFields(fieldNames.opravit_data_dle_souboru).gfield("option", "disabled", l_disableFramaFileSettings);
                            l_form.findFields(fieldNames.pouzivat_soubor_bez_pidu).gfield("option", "disabled", l_disableFramaFileSettings);
                            l_form.findFields(fieldNames.frankovani_pretridit).gfield("option", "disabled", l_disableDataMatrixSettings);
                            l_form.findFields(fieldNames.frankovani_podaci_cislo).gfield("option", "disabled", l_disableDataMatrixSettings);
                            l_form.findFields(fieldNames.frankovat_pri_prevzeti).gfield("option", "disabled", l_disableDataMatrixSettings);
                        }
                    },
                });
                form.addRow().addField("gcheck", "", { name: fieldNames.tridit_dle_souboru, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.tridit_dle_souboru), label: "jres:23900143" }); //RC 23900143 : Třídit zásilky dle souboru
                form.addRow().addField("gcheck", "", { name: fieldNames.kontrolovat_spravnost_dle_souboru, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.kontrolovat_spravnost_dle_souboru), label: "jres:23900144" }); //RC 23900144 : Kontrolovat správnost zásilek dle souboru
                form.addRow().addField("gcheck", "", { name: fieldNames.opravit_data_dle_souboru, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.opravit_data_dle_souboru), label: "jres:23900145" }); //RC 23900145 : Opravit zásilky v GINISu dle souboru
                form.addRow().addField("gcheck", "", { name: fieldNames.pouzivat_soubor_bez_pidu, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.pouzivat_soubor_bez_pidu), label: "jres:23900146" }); //RC 23900146 : Používat soubor bez PIDů
                form.addRow().addField("gcheck", "", { name: fieldNames.frankovani_pretridit, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.frankovani_pretridit), label: "jres:23900122" }); //RC 23900122 : Přetřídit dle frankování
                form.addRow().addField("gcheck", "", { name: fieldNames.frankovani_podaci_cislo, model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = fieldNames.frankovani_podaci_cislo), label: "jres:23900123" }); //RC 23900123 : Snímat i podací číslo
                //Tisk podacího archu a výkazu
                form.addSection("jres:23900103") //RC 23900103 : Tisk podacího archu a výkazu
                    .addRow("jres:23900057") //RC 23900058 : Uživatel VS
                    .addField("gstringbox", "w-6", { name: "cislo_podavatele", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "cislo_podavatele") })
                    .addRow("jres:23900058") //RC 23900058 : Uživatel VS
                    .addField("gstringbox", "w-6", { name: "uzivatel_vs", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "uzivatel_vs") });
                form.addRow("jres:23900137") //RC 23900137 : Číslo zákaznické karty odesilatele
                    .addField("gstringbox", "w-6", { name: "cislo_zakaznicke_karty_odesilatele", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "cislo_zakaznicke_karty_odesilatele") });
                form.addSection("jres:23900059") //RC 23900059 : Nastavení pro generování elektronického podacího archu (ePA)
                    .addRow("jres:23900134") //RC 23900134 : Identifikace podavatele pro ePA
                    .addField("gstringbox", "w-6", { name: "epa_identifikace_podavatele", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "epa_identifikace_podavatele") })
                    .addRow("jres:23900136") //RC 23900136 : Jméno souboru [.CSV]
                    .addField("gstringbox", "w-6", { name: "epa_jmeno_souboru", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "epa_jmeno_souboru") })
                    .addRow("jres:23900135") //RC 23900135 : Údaje o odesílateli pro ePA v definovaném formátu
                    .addField("gstringbox", { name: "epa_data_odesilatele", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "epa_data_odesilatele") });
                form.addRow().addField("gcheck", "", { name: "epa_jednoznacne_jmeno", model: AppSettings.VypraveniSettingsPath + "." + (modelProperty = "epa_jednoznacne_jmeno"), label: "jres:23900060" }); //RC 23900060 : Generovat jednoznačné jméno
                // ceniky
                form.addSection("jres:23900094") //RC 23900094 : Ceníky
                    .addRow()
                    .addField("gbuttonpanel", {
                    params: [
                        {
                            action: new GAction({
                                name: "actCenikSluzeb",
                                caption: "jres:23900093", //RC 23900093 : Poplatek za služby
                                tooltip: "jres:23900093",
                                run: function (event, actionContext) {
                                    Gordic.Vyp.Dialogs.CenikSluzebDlg(undefined, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                                }
                            })
                        },
                        {
                            action: new GAction({
                                name: "actCenikZasilek",
                                caption: "jres:23900095", //RC 23900095 : Poplatek za zásilky
                                tooltip: "jres:23900093",
                                run: function (event, actionContext) {
                                    Gordic.Vyp.Dialogs.CenikZasilekDlg(undefined, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                                }
                            })
                        }
                    ]
                });
                return form;
            }
            AppSettings.VypraveniSettingsForm = VypraveniSettingsForm;
        })(AppSettings = Vyp.AppSettings || (Vyp.AppSettings = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var AppSettings;
        (function (AppSettings) {
            function VypPrintSettingsForm() {
                let form = new Gordic.Forms
                    .Form({ name: "VypPrintSettingsForm", tabOptions: { title: "jres:23900174", opened: false } }) //RC 23900174 : Tisk
                    .addRow("").addField("gcheck", {
                    name: "TiskPodArch",
                    label: "jres:23900176", //RC 23900176 : Implicitně tisknout podací arch (výpravní protokol)
                    model: "Global.Vyp.AppSettings.PrintSettings.TiskPodArch=value",
                    initialValue: true
                });
                return form;
            }
            AppSettings.VypPrintSettingsForm = VypPrintSettingsForm;
        })(AppSettings = Vyp.AppSettings || (Vyp.AppSettings = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            const { gcontent } = Decorators;
            let DataMatrixCteckaDlg = class DataMatrixCteckaDlg extends Gordic.GContentBase {
                onContentReady() {
                    this.CreateForm();
                }
                CreateForm() {
                    const form = new Gordic.Forms.Form({ name: "FormSPISPI", layoutDescriptor: "L1M1S1" });
                    form.addSection();
                    const that = this;
                    form.addRow("jres:23900107").addField("gstringbox", { name: "Kod" /* Wfl.Interface.GDataMatrixDtoNames.Kod */, disabled: false, change: function (event, input) { if (input?.value)
                            that.ZpracujData(); } });
                    form.addSection();
                    form.addRow("jres:23900106") //RC 23900106 : Adresát
                        .addField("gstringbox", { name: "InfoAdresat" /* Wfl.Interface.GDataMatrixDtoNames.InfoAdresat */, disabled: true });
                    form.addRow("jres:23900107") //RC 23900107 : Identifikace zásilky
                        .addField("gstringbox", { name: "id_dorucenky" /* Wfl.Interface.GDataMatrixDtoNames.id_dorucenky */, disabled: true });
                    form.addRow("jres:23900015").addField("gnumberbox", "w-3", { name: "poplatek" /* Wfl.Interface.GDataMatrixDtoNames.poplatek */, decimals: 4, minValue: 0, maxValue: 99.9999, disabled: true });
                    form.addRow("jres:23900016").addField("gnumberbox", "w-3", { name: "vaha" /* Wfl.Interface.GDataMatrixDtoNames.vaha */, decimals: 4, minValue: 0, maxValue: 99.9999, disabled: true }); //RC 23900016 : Váha
                    if (this.model.CistIPodaciCislo)
                        form.addRow("jres:23900044").addField("gstringbox", "w-3", { name: "pod_cislo" /* Wfl.Interface.GDataMatrixDtoNames.pod_cislo */, disabled: true }); //RC 23900044 : Podací číslo
                    form.addPrefab(Gordic.Gin.Prefabs.GSuFunRef({
                        name: "predavajici",
                        model: "model.akt_ixs_fun=value.ixs_fun",
                        disabled: true
                    }, {
                        label: "jres:23900197", //RC 23900197 : Vlastník
                    }, {
                        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO
                    }));
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.validators);
                    if (this.model.Warning) {
                        Gordic.Wfl.AC.WflBaseAC.ShowFlashWarning(this, this.model.Warning);
                        this.model.Warning = "";
                    }
                    this.SetField();
                }
                SetField() {
                    var l_idPole = this.findFields("Id");
                    if (l_idPole) {
                        let l_label = "";
                        switch (this.model.KrokCislo) {
                            case 1:
                                l_label = "jres:23900126"; //RC 23900126 : Zadejte identifikaci zásilky
                                break;
                            case 2:
                                l_label = "jres:23900114"; //RC 23900114 : Zadejte data-matrix kód
                                break;
                            case 3:
                                l_label = "jres:23900125"; //RC 23900044 : Podací číslo
                                break;
                            default:
                        }
                        l_idPole.gformrow("setLabel", l_label);
                        l_idPole.gfield("focus");
                    }
                }
                SetInfo() {
                    Gordic.Wfl.AC.WflBaseAC.ShowFlashByContentInfo(this);
                    this.SetField();
                }
                ZpracujData() {
                    debugger;
                    this.findFields().gfield("model", "collect", this.model);
                    if (this.model.Kod) {
                        if (this.model.PracovatNadSeznamem) {
                            switch (this.model.KrokCislo) {
                                case 1:
                                    this.ZpracujDataZasilky();
                                    break;
                                case 2:
                                    this.ZpracujDataMatrix();
                                    break;
                                case 3:
                                    this.ZpracujPodaciCislo();
                                    break;
                            }
                        }
                        else {
                            //TODO
                        }
                    }
                }
                ZpracujDataZasilky() {
                    debugger;
                    this.findFields().gfield("model", "collect", this.model);
                    if (this.model.Kod)
                        this.model.id_dorucenky = this.model.Kod.trim();
                    this.close(this.model);
                }
                OKClick() {
                    this.ZpracujData();
                }
                ZpracujDataMatrix() {
                    if (this.model.Kod) {
                        if (this.model.Kod.trim().length < 30) {
                            Gordic.Wfl.AC.WflBaseAC.ShowFlashWarning(this, "jres:23900115");
                            this.SetField();
                        }
                        else {
                            Gordic.Wfl.AC.WflBaseAC.HideFlashByContent(this);
                            const that = this;
                            this.call("ZpracujDataMatrix", { "model": this.model })
                                .done(function (model) {
                                if (model) {
                                    that.model = model;
                                    if (that.model.CistIPodaciCislo && that.model.DoporucenaZasilka) {
                                        that.model.KrokCislo = 3;
                                        //that.Info = "jres:23900125"; //RC 23900125 : Zadejte podací číslo
                                        //that.ResultType = Gin.Interface.TypVysledkuOperace.Neurceno;
                                        that.model.Kod = "";
                                        that.SetInfo();
                                        that.ApplyModel();
                                    }
                                    else
                                        that.close(that.model);
                                }
                            })
                                .fail(function (reason) {
                                that.dialogs.error(reason.statusText);
                                that.SetField();
                            });
                        }
                    }
                }
                ZpracujPodaciCislo() {
                    this.model.pod_cislo = this.model.Kod;
                    this.close(this.model);
                }
                ApplyModel() {
                    this.findFields().gfield("model", "apply", this.model);
                    this.findFields("Id").gfield("focus");
                }
                ExitClick() {
                    if (this.model) {
                        this.close(null);
                    }
                }
            };
            DataMatrixCteckaDlg = __decorate([
                gcontent
            ], DataMatrixCteckaDlg);
            Lists.DataMatrixCteckaDlg = DataMatrixCteckaDlg;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Dlg;
        (function (Dlg) {
            const { gcontent } = Decorators;
            let EditacePolozkyCenikuDlg = class EditacePolozkyCenikuDlg extends Gordic.GContentBase {
                onContentReady() {
                    var l_labelNazev = "";
                    switch (this.model.typ) {
                        case 1 /* Gordic.Wfl.Interface.TypCenikuPosty.cenikPostovnichSluzeb */:
                            l_labelNazev = "jres:23900090";
                            break;
                        case 2 /* Gordic.Wfl.Interface.TypCenikuPosty.cenikZasilek */:
                            l_labelNazev = "jres:23900097"; //RC 23900097 : Druh zásilky
                            break;
                    }
                    const form = new Gordic.Forms.Form({ name: "FormEdit", layoutDescriptor: "L1M1S1" });
                    form.addSection();
                    form.addRow(l_labelNazev)
                        .addField("gstringbox", { name: "nazev", model: "model.nazev = value", disabled: true });
                    form.addRow("jres:23900100") //RC 23900100 : Váha od - do
                        .addField("gnumberbox", "w-6", { name: "vaha_od", model: "model.vaha_od = value", disabled: true, decimals: 2 })
                        .addField("gnumberbox", "w-6", { name: "vaha_do", model: "model.vaha_do = value", disabled: true, decimals: 2 });
                    form.addRow("jres:23900017") //RC 23900017 : Cena
                        .addField("gnumberbox", { name: "cena", model: "model.cena = value", decimals: 3 });
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.validators);
                    this.findFields("cena").gfield("focus");
                }
                OKClick() {
                    const that = this;
                    if (this.defaultForm) {
                        if (!this.defaultForm.gform("isValid"))
                            return;
                        this.findFields().gfield("model", "collect", this.model);
                        this.call("SaveData", { model: that.model })
                            .done(function (data) {
                            that.close(that.model);
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
            };
            EditacePolozkyCenikuDlg = __decorate([
                gcontent
            ], EditacePolozkyCenikuDlg);
            Dlg.EditacePolozkyCenikuDlg = EditacePolozkyCenikuDlg;
        })(Dlg = Vyp.Dlg || (Vyp.Dlg = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
;
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Dlg;
        (function (Dlg) {
            const { gcontent } = Decorators;
            let EditaceZasilkyDlg = class EditaceZasilkyDlg extends Gordic.GContentBase {
                onContentReady() {
                    const form = new Gordic.Forms.Form({ name: "FormZasEdit", layoutDescriptor: "L1M1S1" });
                    form.addSection();
                    form.addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumnetuSpisu({ fieldOpt: { model: "model.ixp = value", disabled: true } }));
                    form.addRow("jres:23900044").addField("gstringbox", "w-3", { name: "pod_cislo", model: "model.pod_cislo = value" }); //RC 23900044 : Podací číslo
                    form.addRow("jres:23900015").addField("gnumberbox", "w-3", { name: "poplatek", model: "model.poplatek = value", decimals: 2, minValue: 0, maxValue: 999.99 });
                    form.addRow("jres:23900016").addField("gnumberbox", "w-3", { name: "vaha", model: "model.vaha = value", decimals: 4, minValue: 0, maxValue: 99.9999 }); //RC 23900016 : Váha
                    form.addRow("jres:23900017").addField("gnumberbox", "w-3", { name: "cena", model: "model.cena = value", decimals: 2, minValue: 0, maxValue: 1099.99 }); //RC 23900017 : Cena
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.validators);
                }
                OKClick() {
                    if (this.defaultForm) {
                        if (!this.defaultForm.gform("isValid"))
                            return;
                        this.findFields().gfield("model", "collect", this.model);
                        this.close(this.model);
                    }
                }
            };
            EditaceZasilkyDlg = __decorate([
                gcontent
            ], EditaceZasilkyDlg);
            Dlg.EditaceZasilkyDlg = EditaceZasilkyDlg;
        })(Dlg = Vyp.Dlg || (Vyp.Dlg = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let GCenikDlg = class GCenikDlg extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    Gordic.Wfl.ListAC.WflListBaseAC.InitList(this);
                    //this.specialActions.push(this.CreateActionZmenaHodnot(true));
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .on("gfilterpanelapply", function (event, obj) {
                        that.LoadData(obj.filter);
                    }).gfilterpanel({
                        forms: this.CreateFilterForm(), // poleFormu ktere budou pouzity pro podminky
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: Gordic.Gin.Globals.Enums.LayoutDescriptorType.list,
                    });
                    this.filterForm.gfilterpanel("applyFilter", $.extend(this.model), false);
                }
                ReloadData() {
                    this.LoadData();
                }
                CreateFilterForm() {
                    const that = this;
                    const filterForm = new Gordic.Forms
                        .Form({ name: "FormSPISPI", layoutDescriptor: "L1M1S1" })
                        .addSection();
                    filterForm.addRow("jres:23900022") //RC 23900022 : Stát
                        .addField("gselectbox", "w-8", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat" }); //RC 23900022 : Stát
                    //this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", filterForm);
                    that.findFields().gfield("model", "apply", this.model);
                    return [filterForm];
                }
                CreateGrid() {
                    const that = this;
                    var gf = Gordic.Wfl.ListAC.WflListBaseAC.GetGridFormat();
                    var l_labelNazev = "";
                    switch (this.TypCeniku) {
                        case 1 /* Gordic.Wfl.Interface.TypCenikuPosty.cenikPostovnichSluzeb */:
                            l_labelNazev = "jres:23900090";
                            break;
                        case 2 /* Gordic.Wfl.Interface.TypCenikuPosty.cenikZasilek */:
                            l_labelNazev = "jres:23900097"; //RC 23900097 : Druh zásilky
                            break;
                    }
                    gf.addTextColumn({ name: "nazev", caption: l_labelNazev, width: 250 }); //RC 23900090 : Poštovní služby
                    gf.addTextColumn({ name: "zkratka", caption: "jres:23900091", width: 70 }); //RC 23900091 : Zkratka
                    for (var i = 0; i < this.KategorieCen.length; i++) {
                        gf.addDecimalColumn({ name: "cena_" + i, caption: this.KategorieCen[i].nazev, width: 100, format: "D2" });
                    }
                    var OpenInfo = new GAction({
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            if (ctx.cellInfo.column) {
                                if (ctx.cellInfo.column.columnType == "number") {
                                    var l_det = {};
                                    var l_name = ctx.cellInfo.column.name;
                                    var index = l_name.substring(l_name.length - 1, l_name.length);
                                    l_det.id = rowData.id;
                                    var l_cena = rowData["cena_" + index];
                                    if (l_cena == undefined) {
                                        that.dialogs.warning("jres:23900102"); //RC 23900102 : Tato hodnota není podporována pro tuto službu a stát.
                                    }
                                    else {
                                        l_det.vaha_do = rowData["vaha_do_" + index];
                                        l_det.stat = that.model.stat;
                                        l_det.typ = that.model.typ;
                                        Gordic.Vyp.Dialogs.EditacePolozkyCenikuDlg(that, { Detail: l_det }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                            .done(function (retVal) {
                                            debugger;
                                            if (retVal && retVal.cena) {
                                                rowData["cena_" + index] = new Decimal(retVal.cena).toFixed(2);
                                                Gordic.Wfl.ListAC.WflListBaseAC.UpdateRowData(that, rowData);
                                                that.NeulozenaData = true;
                                                //hat.view.updateData(rowData, "update");
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
                    this.gridOptions = {};
                    this.gridOptions.defaultAction = OpenInfo;
                    if (this.mainGrid)
                        this.mainGrid.remove();
                    var grid = Gordic.Wfl.ListAC.WflListBaseAC.CreateGridBase(this, gf);
                    this.mainGrid = grid;
                    Gordic.Wfl.ListAC.WflListBaseAC.AfterCreateGrid(this);
                }
                SetData() {
                    if (this.data) {
                        this.view = new Gordic.Data.View(this.data, { key: this.IDPrimaryKeyGridu }); //key je dulezity kvuli pripadnemu vyhledavani radku
                        if (this.view && this.mainGrid && this.mainGrid.ggrid)
                            this.mainGrid.ggrid("setData", this.view);
                    }
                }
                LoadData(filtr) {
                    var that = this;
                    Gordic.Gin.Globals.ShowWaitLoadData(this);
                    //nacteni dat do gridu
                    this.findFields().gfield("model", "collect", this.model);
                    this.model = $.extend({}, this.model, filtr);
                    if (filtr && filtr.stat) {
                        this.call("LoadDataCeniku", { model: filtr })
                            .done(function (data) {
                            that.CreateGrid();
                            that.data = data;
                            that.SetData();
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
            };
            GCenikDlg = __decorate([
                Decorators.gcontent
            ], GCenikDlg);
            Lists.GCenikDlg = GCenikDlg;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Dlg;
        (function (Dlg) {
            const { gcontent } = Decorators;
            let PredplneniZasilkyDlg = class PredplneniZasilkyDlg extends Gordic.GContentBase {
                onContentReady() {
                    const form = new Gordic.Forms.Form({ name: "FormZasEdit", layoutDescriptor: "L1M1S1" });
                    form.addPrefab(Vyp.VypPrefabs.SekcePredplneniZasilek());
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.validators);
                }
                OKClick() {
                    if (this.defaultForm) {
                        if (!this.defaultForm.gform("isValid"))
                            return;
                        this.findFields().gfield("model", "collect", this.model);
                        this.close(this.model);
                    }
                }
            };
            PredplneniZasilkyDlg = __decorate([
                gcontent
            ], PredplneniZasilkyDlg);
            Dlg.PredplneniZasilkyDlg = PredplneniZasilkyDlg;
        })(Dlg = Vyp.Dlg || (Vyp.Dlg = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let PrijemZasilekDleIDListPage = class PrijemZasilekDleIDListPage extends Gordic.GContentBase {
                onContentReady() {
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.InitList(this);
                    this.topActions.push(this.CreateActionPridat());
                    this.specialActions.push(Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateActionPrevzitZasilky(this, true));
                    Lists.VypListBasePage.CreateFrankovaniActions(this);
                    Lists.VypListBasePage.CreateActionsTisk(this);
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", this.CreateDefaultForm());
                    this.findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.model);
                    Lists.VypListBasePage.CreateGridZasilekVyp(this);
                    Gordic.Wfl.AC.WflBaseAC.ResolveInfo(this);
                    this.findFields().gfield("model", "apply", this.model);
                    this.model.PlnitTempTabulku = false;
                    Gordic.Wfl.ListAC.WflListBaseAC.SetEnableActionsByData(this);
                    Gordic.Wfl.ListAC.WflListBaseAC.SetActionEnabled(this, Vyp.Globals.Enums.ActionsName.FrankovaniOffline, true);
                    this.ZadejZasilku();
                    //this.LoadData();
                    //this.model.PlnitTempTabulku = false;
                }
                CreateDefaultForm() {
                    const that = this;
                    const form = new Gordic.Forms.Form({ name: "Form", layoutDescriptor: "L1;M1;S1;" });
                    form.addRow().addField("gcheck", "", {
                        name: "ObraceneRazeni", model: "Settings.ObraceneRazeni=value", label: "jres:23900128", change: function (ev, obj) {
                            if (obj?.value) {
                                that.Settings.ObraceneRazeni = obj?.value;
                            }
                        }
                    }); //RC 23900128 : Řadit obráceně
                    return form;
                }
                ZadejZasilku() {
                    // form
                    const that = this;
                    Gordic.Wfl.Dialogs.HledaniZasilekDleIdDlg(this, { TypHledani: 2 /* Wfl.Interface.TypHledaniZasilek.HledaniZasilekProPrevzeti */ }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        .done(function (data) {
                        Gordic.Wfl.AC.WflBaseAC.HideFlashByContent(that);
                        if (data) {
                            that.ZpracujDataIdentifikace(data);
                        }
                    });
                }
                ZpracujDataIdentifikace(data) {
                    //switch (data.typHledaniDle)
                    //{
                    //    case Gordic.Wfl.Interface.TypHledaniDlePolozky.id_dorucenky:
                    //        this.ZpracujDataHledani(data);
                    //        break;
                    //    case Gordic.Wfl.Interface.TypHledaniDlePolozky.ixs:
                    //        this.ZpracujDataHledani(data);
                    //}
                    this.ZpracujDataHledani(data);
                }
                ZpracujDataHledani(data) {
                    let that = this;
                    this.call("ZpracujDataHledani", { DataHledani: data, Dialog: that.Settings.DialogPrevzeti, RaditObracene: this.Settings.ObraceneRazeni })
                        .done(function (IDs) {
                        if (IDs && that.ResultType == 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */) {
                            if (IDs.length > 0) {
                                if (that.Settings.DialogPrevzeti) {
                                    that.DoShowDialog(IDs);
                                }
                                else {
                                    that.ResolveVyberZasilky(IDs, false);
                                }
                            }
                            else {
                                //let l_settings = that.VypraveniSettings;
                                //if (l_settings.frankovani_podaci_cislo)
                                //{
                                //    that.DoFrankovani(IDs[0])
                                //    Wfl.ListAC.WflListBaseAC.ResolveResultInfoContentu(that);
                                //}
                            }
                        }
                        else {
                            Gordic.Wfl.AC.WflBaseAC.ShowFlashByContentInfo(that);
                            that.ZadejZasilku();
                        }
                    })
                        .fail(function (reason) {
                        that.dialogs.error(reason.statusText);
                    });
                }
                //ZpracujDataDokumentu(data: Wfl.Interface.GHledaniZasilekDleIdDto) {
                //    let that = this;
                //    Wfl.Dialogs.VyberZasilkyDlg(that, { Data: data.dataZasilek! }, Global.Enums.ModOtevreni.showModalWindow)
                //        .done(function (res) {
                //            if (res)
                //            {
                //                that.LoadData();
                //                //that.load();
                //                that.dialogs.alert("jres:23900366") //RC 23900366 : Heslo bylo změněno.    
                //            }
                //        })
                //        .always(function () {
                //            that.endOperation();
                //        });
                //}
                DoFrankovani(sxs) {
                    let promis = $.Deferred();
                    Gordic.Wfl.Dialogs.ZasilkyInfoDlg(this, { Sxs: sxs, ModFormu: 2 /* Wfl.Interface.ModFormuZasilkaInfo.balickovani */ })
                        .done(function (ret) { promis.resolve(ret); })
                        .fail(function (reason) { promis.resolve(true); });
                    return promis.promise();
                }
                ResolveVyberZasilky(IDs, prevzit) {
                    let that = this;
                    this.ZpracujeZasilky(IDs, prevzit)
                        .done(function (retVal) {
                        if (retVal) {
                            if (that.Settings.Balickovani) {
                                var promises = [];
                                for (var i = 0; i < IDs.length; i++) {
                                    promises.push(that.ShowDialogBalickovanmi(IDs[i]));
                                }
                                $.when.apply(null, promises).done(function () {
                                    that.LoadData();
                                    //var l_ok = Gordic.Wfl.Commmon.GetPocetProvedenych(that.resultInfo) > 0;
                                    //Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo);
                                    //promis.resolve(l_ok);
                                });
                            }
                            else {
                                that.LoadData();
                            }
                        }
                        else
                            that.dialogs.warning("ERROR 23920061");
                    });
                }
                DoShowDialog(Ids) {
                    //mel by se vrátit pouze jedno SXS
                    let that = this;
                    this.Poradi = 0;
                    var promises = [];
                    for (var i = 0; i < Ids.length; i++) {
                        promises.push(that.ShowDialogZasilkaInfo(Ids[i]));
                    }
                    $.when.apply(null, promises).done(function (ok) {
                        if (ok) {
                            that.ResolveVyberZasilky(Ids, true);
                        }
                        //var l_ok = Gordic.Wfl.Commmon.GetPocetProvedenych(that.resultInfo) > 0;
                        //Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo);
                        //promis.resolve(l_ok);
                    });
                }
                ShowDialogZasilkaInfo(sxs) {
                    let promis = $.Deferred();
                    Gordic.Wfl.Dialogs.ZasilkyInfoDlg(this, { Sxs: sxs, ModFormu: 1 /* Wfl.Interface.ModFormuZasilkaInfo.prevzeti */ })
                        .done(function (ret) { promis.resolve(ret); })
                        .fail(function (reason) { promis.resolve(true); });
                    return promis.promise();
                }
                ShowDialogBalickovanmi(sxs) {
                    let promis = $.Deferred();
                    Gordic.Wfl.Dialogs.ZasilkyInfoDlg(this, { Sxs: sxs, ModFormu: 2 /* Wfl.Interface.ModFormuZasilkaInfo.balickovani */ })
                        .done(function (ret) { promis.resolve(ret); })
                        .fail(function (reason) { promis.resolve(true); });
                    return promis.promise();
                }
                ZpracujeZasilky(Ids, prevzit) {
                    let that = this;
                    let promis = $.Deferred();
                    if (prevzit) {
                        this.call("PrevzitZasilky", { Sxs: Ids[0] })
                            .done(function (Ok) {
                            promis.resolve(Ok);
                        })
                            .fail(function (retVal) {
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildAkce(that, retVal.statusText);
                            promis.resolve(false);
                        });
                    }
                    else {
                        this.call("NastavVyberZasilky", { IDs: Ids })
                            .done(function () { promis.resolve(true); })
                            .fail(function (retVal) {
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildAkce(that, retVal.statusText);
                            promis.resolve(false);
                        });
                    }
                    return promis.promise();
                }
                LoadData() {
                    const that = this;
                    Gordic.Gin.Globals.ShowWaitLoadData(this);
                    return this.call("LoadDataThis", { model: this.model, Prevzato: this.Settings.Prevzato, RaditObracene: this.Settings.ObraceneRazeni })
                        .done(function (data) {
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultData(that, data);
                        Gordic.Wfl.ListAC.WflListBaseAC.SetEnableActionsByData(that);
                        Gordic.Wfl.AC.WflBaseAC.ResolveInfo(that).done(function () {
                            that.ZadejZasilku();
                            Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDlePriznaku(that);
                        });
                    })
                        .always(function () {
                        Gordic.Wfl.ListAC.WflListBaseAC.AfterLoadData(that);
                        Gordic.Wfl.ListAC.WflListBaseAC.SetActionEnabled(that, Vyp.Globals.Enums.ActionsName.FrankovaniOffline, true);
                    });
                }
                CreateActionPridat() {
                    const that = this;
                    var action = new GAction({
                        name: Gordic.Gin.Icons.ActionEnum.pridat,
                        icon: Gordic.Gin.Icons.ActionEnum.pridat,
                        caption: "jres:23900157", //RC 23900157 : Přidat
                        tooltip: "jres:23900157",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.FavoriteAlwaysEnabled,
                        run: function (ev, ctx) {
                            that.ZadejZasilku();
                        }
                    });
                    return action;
                }
                ReloadData() {
                    this.LoadData();
                }
            };
            PrijemZasilekDleIDListPage = __decorate([
                Decorators.gcontent
            ], PrijemZasilekDleIDListPage);
            Lists.PrijemZasilekDleIDListPage = PrijemZasilekDleIDListPage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let ProvedenaVypraveniZasilekListPage = class ProvedenaVypraveniZasilekListPage extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.LoadPreview = Gordic.Utils.debounced(function (content, row) {
                        if (content && content.PreviewDiv) {
                            var previewDivCnt = $.content(content.PreviewDiv);
                            previewDivCnt.loadingAwait.done(() => { previewDivCnt.load({ TridVyp: row.trid_vyp, ZpusobDorProp: row.zpusob_dor }); });
                        }
                    }, 300);
                }
                onContentReady() {
                    var that = this;
                    Gordic.Wfl.ListAC.WflListBaseAC.InitList(this);
                    Gordic.Wfl.ListAC.WflListBaseAC.AddBaseActionsToMenu(this);
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    // samotná definice gfilterpanelu
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .on("gfilterpanelapply", function (event, obj) {
                        that.LoadData(obj.filter);
                    }).gfilterpanel({
                        forms: that.CreateFilterForms(), // poleFormu ktere budou pouzity pro podminky
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favorites: "all", // defaultní oblíbené
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store({ tema: "vyp_ptm_provyp", parentContent: this }),
                        poVyhledaniZobrazit: "OblibenePodminky",
                        favoriteLayoutDescriptor: Gordic.Gin.Globals.Enums.LayoutDescriptorType.list,
                    });
                    this.cellActiveProp = function (ev, row) {
                        if (row.cellInfo.column && row.cellInfo.column.name === "xx") {
                        }
                        if (that.PreviewDiv !== null && that.PreviewDiv !== undefined) {
                            if (that.PreviewDiv.gtab("option").opened) {
                                if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                    Gordic.Wfl.ListAC.WflListBaseAC.EnablePreview(that, true);
                                    that.LoadPreview(that, row.cellInfo.data);
                                }
                                else {
                                    Gordic.Wfl.ListAC.WflListBaseAC.EnablePreview(that, false);
                                }
                            }
                        }
                    };
                    this.CreateGrid();
                    this.CreateGridObsah();
                    this.filterForm.gfilterpanel("applyFilter", this.model, !this.NacistSeznamPriOtevreni);
                }
                CreateGridObsah() {
                    this.PreviewDiv = $("<div>").appendTo(this.element).gcontent("Gordic.Vyp.WebControls.ProvedenaVypraveniZasilekObsahListPage", { uid: "ProvedenaVypraveniZasilekObsahListPage" }).gtab({ title: "Obsah", opened: true });
                }
                CreateGrid() {
                    var that = this;
                    var gf = Gordic.Wfl.ListAC.WflListBaseAC.GetGridFormat();
                    gf.addDateTimeColumn(Gordic.Wfl.ListPrefabs.datVypraveniColumn());
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.zpusobDoruceniColumn());
                    gf.addTextColumn({ name: "dor_sluzba_txt", caption: "jres:23900023", width: 120, }); //RC 23900023 : Doručovací služba
                    gf.addTextColumn({ name: "posta", caption: "jres:23900031", width: 120, }); //RC 23900031 : Pošta
                    gf.addTextColumn({ name: "nazev_akt_su", caption: "jres:23900032", width: 200, }); //RC 23900032 : Vypravující
                    gf.addTextColumn({ name: "nazev_fun_zmenuprov", caption: "jres:23900033", width: 200, }); //RC 23900033 : Poslední změnu provedl
                    this.gridOptions = {};
                    var grid = Gordic.Wfl.ListAC.WflListBaseAC.CreateGridBase(this, gf);
                    this.mainGrid = grid;
                    Gordic.Wfl.ListAC.WflListBaseAC.AfterCreateGrid(this);
                }
                LoadData(filtr) {
                    var that = this;
                    Gordic.Gin.Globals.ShowWaitLoadData(this);
                    //nacteni dat do gridu
                    this.call("LoadData", { model: filtr })
                        .done(function (data) {
                        Gordic.Wfl.ListAC.WflListBaseAC.SetData(that, data);
                    })
                        .always(function () {
                        Gordic.Wfl.ListAC.WflListBaseAC.AfterLoadData(that);
                    });
                    //if (filtr) that.model = filtr;
                }
                ReloadData() {
                    this.LoadData(this.model);
                }
                CreateFilterForms() {
                    var filterForm = new Gordic.Forms.Form({ name: "FormDocsList", tabLabel: "jres:23900173", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }); //RC 23900173 : Kompletní filtr
                    filterForm.addSection()
                        .addRow({ label: "jres:23900034", name: "dateIntervalRow" }) //RC 23900034 : Datum vypravení
                        .addField("gdatecombobox", {
                        model: "model.Datum=value.date",
                        defaultInitialValue: "all",
                        //initialValue: { value: this.model.Datum },    
                        daysRangeMax: this.DaysRangeMax,
                        contextMenu: {
                            daysRange: 50
                        },
                        userSettings: this.userSettings,
                    });
                    filterForm.addSection().addRow().addField("gcheck", "", { name: "Vlastni", model: "model.Vlastni=value", label: "jres:23900011" }); //RC 23900011 : Vlastní
                    return [filterForm];
                }
            };
            ProvedenaVypraveniZasilekListPage = __decorate([
                Decorators.gcontent
            ], ProvedenaVypraveniZasilekListPage);
            Lists.ProvedenaVypraveniZasilekListPage = ProvedenaVypraveniZasilekListPage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let ProvedenaVypraveniZasilekObsahListPage = class ProvedenaVypraveniZasilekObsahListPage extends Gordic.GContentBase {
                onContentReady() {
                    this.IsObsah = true;
                    this.minimalHeightObsahu = 500;
                    Gordic.Wfl.AC.WflBaseAC.ClearControl(this);
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.InitList(this);
                    Lists.VypListBasePage.CreateFrankovaniActions(this);
                    ////this.specialActions.push(Wfl.ListAC.WflZasilkyListBaseAC.CreateActionZnovuodeslatZasilky(this, false));
                    //Wfl.ListAC.WflZasilkyListBaseAC.CreateActionZnovuodeslatZasilky(this, false);
                    //VypListBasePage.CreateActionsPredplneni(this);
                    this.specialActions.push(Lists.VypListBasePage.CreateActionEditaceDatPredplneni(this, true));
                    this.specialActions.push(Lists.VypListBasePage.CreateActionZmenaHodnot(this, true));
                    Lists.VypListBasePage.CreateActionsPredplneni(this);
                    this.specialActions.push(Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateActionUlozitZmenyZasilek(this, true));
                    this.specialActions.push(Lists.VypListBasePage.CreateActionImportDatEpaPosty(this));
                    Lists.VypListBasePage.CreateActionsTisk(this);
                    this.printActionsSubmenu.push(Lists.VypListBasePage.CreateActionTiskVypravenychDokSpis(this));
                    this.printActionsSubmenu.push(Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateActionTiskObalek(this));
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    Lists.VypListBasePage.CreateGridZasilekVyp(this);
                    this.SetData();
                }
                LoadData() {
                    if (this.TridVyp) {
                        var that = this;
                        Gordic.Gin.Globals.ShowWaitLoadData(this);
                        this.call("LoadDataThis", { TridVypParam: this.TridVyp })
                            .done(function (data) {
                            if (data) {
                                that.data = data;
                                that.SetData();
                            }
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
                SetData() {
                    if (this.data) {
                        var view = new Gordic.Data.View(this.data, { key: this.IDPrimaryKeyGridu }); //key je dulezity kvuli pripadnemu vyhledavani radku
                        this.mainGrid.ggrid("setData", view);
                    }
                }
                ReloadData() {
                    this.LoadData();
                }
            };
            ProvedenaVypraveniZasilekObsahListPage = __decorate([
                Decorators.gcontent
            ], ProvedenaVypraveniZasilekObsahListPage);
            Lists.ProvedenaVypraveniZasilekObsahListPage = ProvedenaVypraveniZasilekObsahListPage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let VypraveneZasilkyListPage = class VypraveneZasilkyListPage extends Gordic.GContentBase {
                onContentReady() {
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.InitList(this);
                    this.specialActions.push(Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateActionServisniSeznamDZ(this, true));
                    this.printActionsSubmenu.push(Lists.VypListBasePage.CreateActionTiskKnihyVypravenePosty(this));
                    this.printActionsSubmenu.push(Lists.VypListBasePage.CreateActionTiskVykazu(this));
                    this.printActionsSubmenu.push(Lists.VypListBasePage.CreateActionTiskNakladu(this));
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateList(this);
                }
                ReloadData() {
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.LoadDataZasilek(this, this.model);
                }
            };
            VypraveneZasilkyListPage = __decorate([
                Decorators.gcontent
            ], VypraveneZasilkyListPage);
            Lists.VypraveneZasilkyListPage = VypraveneZasilkyListPage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            let VypraveniZasilekListPage = class VypraveniZasilekListPage extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.OverovatDS = false;
                }
                onContentReady() {
                    const that = this;
                    this.IfPredplnení = this.IfMoznoPredplneni();
                    this.model.ZpusobDor = this.ZpusobDorProp;
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.InitList(this);
                    this.specialActions.push(this.CreateActionVypravit());
                    if (this.ZpusobDorProp == 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */) {
                        this.specialActions.push(this.CreateActionOveritAdresaty());
                        if (this.PovolenoHKP)
                            this.specialActions.push(Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateActionDetailEsuNad(this, false));
                    }
                    if (this.ZpusobDorProp == 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */ && this.paramInfoOStavechHK == 2)
                        this.specialActions.push(this.CreateActionInfoOZasilkachHP());
                    if (this.IfPredplnení) {
                        Lists.VypListBasePage.CreateActionsPredplneni(this);
                        this.specialActions.push(Lists.VypListBasePage.CreateActionZmenaHodnot(this, true));
                    }
                    if (this.ZpusobDorProp == 10 /* Wfl.Interface.WflczpdEnum.Posta */) {
                        Lists.VypListBasePage.CreateFrankovaniActions(this);
                        if (this.VypraveniSettings.prevzetiDataMatrixEnabled)
                            this.specialActions.push(Lists.VypListBasePage.CreateActionPrevzitSFrankovanim(this));
                    }
                    Lists.VypListBasePage.CreateActionsTisk(this);
                    this.printActionsSubmenu.push(Lists.VypListBasePage.CreateActionTiskVypravenychDokSpis(this));
                    Gordic.Wfl.ListAC.WflListBaseAC.CompleteMenu(this);
                    // samotná definice gfilterpanelu
                    this.filterForm = $("<div>")
                        .appendTo(this.element)
                        .on("gfilterpanelapply", function (event, obj) {
                        that.LoadData(obj.filter, true);
                    }).gfilterpanel({
                        forms: that.CreateFilterForm(), // poleFormu ktere budou pouzity pro podminky
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favorites: "all", // defaultní oblíbené
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store({ tema: "vyp_ptm_vypzas", parentContent: this }),
                        poVyhledaniZobrazit: "OblibenePodminky",
                        favoriteLayoutDescriptor: Gordic.Gin.Globals.Enums.LayoutDescriptorType.list,
                    });
                    this.filterForm.gfilterpanel("applyFilter", $.extend(this.model), !this.NacistSeznamPriOtevreni);
                    //form    
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", this.CreateDefaultForm());
                    this.findForms("FormVyp").findFields().gfield("model", "apply", this.model).gfield("model", "validators", this.model);
                    this.findForms("FormVyp").findFields().gfield("model", "apply", this.VypraveniDto).gfield("model", "validators", this.VypraveniDto);
                    this.findForms("FormVyp").findFields().gfield("model", "apply", this.Predplneni).gfield("model", "validators", this.Predplneni);
                    Lists.VypListBasePage.CreateGridZasilekVyp(this);
                    Gordic.Wfl.AC.WflBaseAC.ResolveInfo(this);
                }
                CreateFilterForm() {
                    var filterForm = new Gordic.Forms.Form({ name: "FormDocsList", tabLabel: "jres:23900172", layoutDescriptor: "L2M2S1, L-3-8-1;, M-1;2-1;-1;, S-1;2-1;-1;, breaks-700-1;000" }); //RC 23900172 : Kompletní filtr
                    filterForm.addRow().addField("gcheck", "", { name: "Vlastni", model: "model.Vlastni=value", label: "jres:23900011", initialValue: this.model.Vlastni }); //RC 23900011 : Vlastní
                    return [filterForm];
                }
                CreateDefaultForm() {
                    // form
                    const form = new Gordic.Forms.Form({ name: "FormVyp", layoutDescriptor: "L1;M1;S1;" });
                    form.addSection();
                    if (this.ZpusobDorProp == 10 /* Wfl.Interface.WflczpdEnum.Posta */) {
                        form.addRow("jres:23900021" + ", " + "jres:23900022")
                            .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ginspsc(), { name: "psc", model: "model.psc=value.psc; model.stat=value.stat" }) //RC 23900021; : PSČ
                            .addField("gselectbox", "w-8", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat" }); //RC 23900022 : Stát
                    }
                    if (this.ZpusobDorProp == 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */) {
                        form.addRow("jres:23900023").addField("gselectbox", Gordic.Prefabs.Select.wflsdos(), { name: "dor_sluzba", model: "model.dor_sluzba=value.dor_sluzba" }); //RC 23900023 : Doručovací služba
                    }
                    if (this.ZpusobDorProp == 30 /* Wfl.Interface.WflczpdEnum.Kuryr */ && this.PovoleneKuryry.length > 1) {
                        form.addRow("jres:23900198").addField("gselectbox", Gordic.Prefabs.Select.wflczpd(), { name: "zpusob_dor", model: "model.ZpusobDor=value.zpusob_dor", data: new Gordic.Data.View(this.PovoleneKuryry, { key: "zpusob_dor" }) }); //RC 23900198 : Typ kurýra
                    }
                    switch (this.ZpusobDorProp) {
                        case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                        case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                        case 200 /* Wfl.Interface.WflczpdEnum.GEX */:
                        case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                            form.addRow().addField("gcheck", "", { name: "VratitNevypravene", model: "model.VratitNevypravene=value", label: "jres:23900064" }); //RC 23900064 : Automaticky vrátit nevypravené zásilky odesílateli
                            break;
                    }
                    if (this.IfPredplnení)
                        form.addPrefab(Vyp.VypPrefabs.SekcePredplneniZasilek());
                    return form;
                }
                IfMoznoPredplneni() {
                    var l_ret = false;
                    switch (this.ZpusobDorProp) {
                        case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                        case 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */:
                        case 30 /* Wfl.Interface.WflczpdEnum.Kuryr */:
                            l_ret = true;
                            break;
                    }
                    return l_ret;
                }
                LoadData(filtr, plnitTempTabulku) {
                    const that = this;
                    Gordic.Gin.Globals.ShowWaitLoadData(this);
                    that.findForms("FormVyp").findFields().gfield("model", "collect", that.model);
                    this.model = $.extend({}, this.model, filtr);
                    this.call("LoadDataThis", { model: this.model, plnitTempTabulku: plnitTempTabulku })
                        .done(function (data) {
                        if (plnitTempTabulku)
                            Gordic.Wfl.ListAC.WflListBaseAC.ClearResultInfo(that);
                        else {
                            if (that.resultInfo && that.resultInfo.length > 0) {
                                Gordic.Wfl.ListAC.WflListBaseAC.ApplyResultInfo(that, data);
                            }
                        }
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultData(that, data, true, 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */);
                        if (!plnitTempTabulku || !Gordic.Vyp.AppSettings.GetVypraveniSettings(that).zasilky_k_vypraveni_neoznacovat) {
                            Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDlePriznaku(that);
                        }
                    })
                        .always(function () { Gordic.Wfl.ListAC.WflListBaseAC.AfterLoadData(that); });
                }
                ReloadData() {
                    this.LoadData(this.model, true);
                }
                RefreshData() {
                    this.LoadData(this.model, false);
                }
                CreateActionVypravit() {
                    const that = this;
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.Vypravit,
                        icon: Gordic.Gin.Icons.ActionEnum.vypravit,
                        caption: "jres:23900012", //RC 2390001;2 : Vypravit
                        tooltip: "jres:23900012",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        enabled: that.MoznoVypravit,
                        run: function (ev, ctx) {
                            that.findForms("FormVyp").findFields().gfield("model", "collect", that.VypraveniDto);
                            that.VypraveniDto.UkoncitDnesniVypraveni = true;
                            var l_asSelected = that.GetSelectedZasilkyVypraveniListDto();
                            if (l_asSelected.length > 0) {
                                that.TypProvedeneAkce = 8 /* Wfl.Interface.TypAkce.vypraveni */;
                                that.resultInfo = [];
                                switch (that.ZpusobDorProp) {
                                    case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                                        if (!that.VypraveniDto.psc) {
                                            that.dialogs.warning("jres:23900025"); //RC 23900025 : Není vyplněna pošta pro vypravení zásilek.
                                            return;
                                        }
                                        if (!that.VypraveniDto.stat) {
                                            that.dialogs.warning("jres:23900053"); //RC 23900053 : Není vyplněn stát
                                            return;
                                        }
                                        break;
                                    case 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */:
                                        if (!that.VypraveniDto.dor_sluzba) {
                                            that.dialogs.warning("jres:23900024"); //RC 23900024 : Není vyplněna doručovací služba pro vypravení zásilek.
                                            return;
                                        }
                                        break;
                                }
                                if (Gordic.Vyp.AppSettings.GetVypraveniSettings(that).dotaz_pri_vypraveni) {
                                    that.dialogs.confirm("jres:23900014", "jres:23900013").on("close", function (ev, retVal) {
                                        if (retVal && retVal === "yes")
                                            that.Vypravit(l_asSelected);
                                    });
                                }
                                else
                                    that.Vypravit(l_asSelected);
                            }
                            else
                                Gordic.Wfl.ListAC.WflListBaseAC.ShowInfoNeniVybranZadnyRadek(that);
                        }
                    });
                    return action;
                }
                Vypravit(_asSelected) {
                    const that = this;
                    var l_asSelected = Gordic.Wfl.ListAC.WflZasilkyListBaseAC.GetSelectedGZasilkaEditListDto(this);
                    if (l_asSelected.length > 0) {
                        if (this.NeulozenaData === true) {
                            this.call("UlozitZmenyZasilek", { Selected: l_asSelected })
                                .done(function (r) {
                                that.VypravitPoUlozeni(_asSelected);
                            });
                        }
                        else {
                            that.VypravitPoUlozeni(_asSelected);
                        }
                    }
                    else
                        Gordic.Wfl.ListAC.WflListBaseAC.ShowInfoNeniVybranZadnyRadek(this);
                }
                VypravitPoUlozeni(_asSelected) {
                    const that = this;
                    that.log.trace("VypravitPoUlozeni 23920097/1: " + _asSelected.length);
                    Gordic.Wfl.ListAC.WflListBaseAC.ClearResultInfo(this);
                    that.call("PripravaKVypraveni", { Balickovani: that.VypraveniDto.Balickovani })
                        .done(function (data) {
                        switch (that.ZpusobDorProp) {
                            case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                                that.IfBalickovaniDotaz().done(function (vypravit) { if (vypravit)
                                    that.Vypraveni(_asSelected); });
                                break;
                            case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                                Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900079"); //RC 23900079 : Probíhá příprava vypravení
                                that.OdeslatZasilkyFyzicky(_asSelected)
                                    .done(function (isOK) {
                                    if (isOK)
                                        that.Vypraveni(_asSelected);
                                })
                                    .fail(function () { that.log.trace("OdemknoutZamceneMailboxy 23920097/2 CH1"); })
                                    .always(function () { that.endOperation(); });
                                break;
                            case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900079"); //RC 23900079 : Probíhá příprava vypravení
                                that.KontrolaStavuDSOdesilatele().done(function (isOK) {
                                    if (isOK) {
                                        Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900075"); //RC 23900075 : Probíhá kontrola
                                        that.OvereniDSAdresatu(_asSelected).done(function (isOK) {
                                            if (isOK) {
                                                if (that.OverovatDS == true && Gordic.Wfl.Common.GetPocetProvedenych(that.resultInfo) == 0) {
                                                    Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo, 1 /* Wfl.Interface.TypAkce.kontrola */);
                                                }
                                                else {
                                                    Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900089"); //RC 23900089 : Probíhá odesílání
                                                    that.OdeslatZasilkyFyzicky(_asSelected)
                                                        .done(function (isOK) {
                                                        if (isOK)
                                                            that.Vypraveni(_asSelected);
                                                    })
                                                        .fail(function () { that.log.trace("SendSignedMessage 23920097/4: "); })
                                                        .always(function () { that.endOperation(); });
                                                }
                                            }
                                        })
                                            .fail(function () { that.log.trace("SendSignedMessage 23920097/5: "); })
                                            .always(function () { that.endOperation(); });
                                    }
                                })
                                    .fail(function () { that.log.trace("SendSignedMessage 23920097/6: "); })
                                    .always(function () { that.endOperation(); });
                                break;
                            case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                                Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900079"); //RC 23900079 : Probíhá příprava vypravení
                                that.KontrolaStavuMailboxyHP(_asSelected).done(function (isOK) {
                                    that.endOperation();
                                    if (isOK) {
                                        that.OdeslatZasilkyFyzicky(_asSelected).done(function (isOK) {
                                            if (isOK)
                                                that.Vypraveni(_asSelected);
                                        })
                                            .fail(function () { that.log.trace("SendSignedMessage 23920097/7: "); })
                                            .always(function () { that.endOperation(); });
                                    }
                                })
                                    .fail(function () { that.log.trace("SendSignedMessage 23920097/8: "); })
                                    .always(function () { that.endOperation(); });
                                break;
                            default:
                                that.Vypraveni(_asSelected);
                                break;
                        }
                    });
                }
                CreateActionInfoOZasilkachHP() {
                    const that = this;
                    var action = new GAction({
                        name: Gordic.Wfl.Globals.Enums.ActionsName.InfoOZasilkachHP,
                        icon: Gordic.Wfl.Icons.EntitiEnum.informace,
                        caption: "jres:23900185", //RC 23900185 : Načíst informace o zásilkách hybridní pošty
                        tooltip: "jres:23900185",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        run: function (ev, ctx) {
                            Gordic.Wfl.Dialogs.InfoOZasilkachHPDlg(that, undefined, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                        }
                    });
                    return action;
                }
                GetPocetProvedenych(result) {
                    var l_pocet = 0;
                    for (var i = 0; i < result.length; i++) {
                        switch (result[i].oznaceni) {
                            case 2 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Provedeno */:
                            case 4 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.ProvedenoSUpozornenim */:
                                l_pocet += 1;
                                break;
                        }
                    }
                    return l_pocet;
                }
                CreateActionOveritAdresaty() {
                    const that = this;
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.OveritAdresaty,
                        icon: Gordic.Gin.Icons.ActionEnum.kontrola,
                        caption: "jres:23900073", //RC 23900073 : Ověřit adresáty
                        tooltip: "jres:23900073",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        run: function (ev, ctx) {
                            that.resultInfo = [];
                            that.findFields().gfield("model", "collect", that.VypraveniDto);
                            var l_asSelected = that.GetSelectedZasilkyVypraveniListDto();
                            if (l_asSelected.length > 0) {
                                Gordic.Wfl.ListAC.WflListBaseAC.SetTypProvedenaAkce(that, 1 /* Wfl.Interface.TypAkce.kontrola */);
                                that.KontrolaStavuDSOdesilatele().done(function (isOK) {
                                    if (isOK) {
                                        Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900075"); //RC 23900075 : Probíhá kontrola
                                        that.OvereniDSAdresatu(l_asSelected).done(function (isOK) {
                                            if (isOK) {
                                                Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo, 1 /* Wfl.Interface.TypAkce.kontrola */);
                                            }
                                            else {
                                                that.dialogs.warning("jres: 23900074"); //RC 23900074 : Akce se nepodařila.
                                            }
                                        })
                                            .always(function () { that.endOperation(); });
                                    }
                                });
                            }
                            else
                                Gordic.Wfl.ListAC.WflListBaseAC.ShowInfoNeniVybranZadnyRadek(that);
                        }
                    });
                    return action;
                }
                IfBalickovaniDotaz() {
                    const that = this;
                    let promis = $.Deferred();
                    if (that.VypraveniDto.Balickovani) {
                        that.dialogs.confirm("jres:23900014", "jres:23900070").on("close", function (ev, retVal) {
                            that.VypraveniDto.UkoncitDnesniVypraveni = retVal && retVal === "yes";
                            promis.resolve(true);
                        });
                    }
                    else
                        promis.resolve(true);
                    return promis.promise();
                }
                Vypraveni(_selected) {
                    let that = this;
                    that.log.trace("OdeslatZasilkyFyzicky 23920108/1: " + _selected.length);
                    Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900078"); //RC 23900078 : Probíhá vypravení
                    that.call("Vypravit", { Selected: _selected, ResultInfo: that.resultInfo, ModelVypraveni: that.VypraveniDto })
                        .done(function (r) {
                        if (r.length > 0) {
                            that.resultInfo = r;
                            //Wfl.ListAC.WflListBaseAC.AddResultInfos(that, r);
                        }
                        that.log.trace("OdeslatZasilkyFyzicky 23920108/2: " + _selected.length);
                        that.RefreshData();
                        Gordic.Wfl.ListAC.WflListBaseAC.SetTypProvedenaAkce(that, 8 /* Wfl.Interface.TypAkce.vypraveni */);
                        //TiskPodArchu pro fyzicke zasilky
                        switch (that.ZpusobDorProp) {
                            case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                            case 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */:
                            case 30 /* Wfl.Interface.WflczpdEnum.Kuryr */:
                                if (that.ResultType == 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */) {
                                    let tiskPodArch = true;
                                    if (that.SessionInfo.Faze == 2 /* Gin.Interface.FazeGinisuEnum.GWAVYP05 */) {
                                        tiskPodArch = that.globalSettings?.get("Global.Vyp.AppSettings.PrintSettings.TiskPodArch", true);
                                    }
                                    if (tiskPodArch === true)
                                        that.TiskPodacihoArchuSDialogem();
                                }
                                break;
                        }
                        that.log.trace("OdeslatZasilkyFyzicky 23920108/3: " + _selected.length);
                        if (that.paramInfoOStavechHK === 1) {
                            Gordic.Wfl.Dialogs.InfoOZasilkachHPDlg(that, undefined, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                OdeslatZasilkyFyzickyOLD(_selected) {
                    let promis = $.Deferred();
                    const that = this;
                    var l_poradi = 1;
                    this.PocetCelkem = 0;
                    //zjistim pocet k vypraveni
                    Gordic.Wfl.ListAC.WflListBaseAC.ClearResultInfo(this);
                    that.log.trace("OdeslatZasilkyFyzicky 23920107/1: " + _selected.length);
                    for (var i = 0; i < _selected.length; i++) {
                        if (_selected[i].oznaceni != 3 /* Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */) {
                            _selected[i].poradi = l_poradi;
                            l_poradi += 1;
                            this.PocetCelkem += 1;
                            that.log.trace("OdeslatZasilkyFyzicky 23920107/2: l_poradi: " + l_poradi + "PocetCelkem: " + this.PocetCelkem);
                        }
                    }
                    if (this.PocetCelkem > 0) {
                        this.Poradi = 0;
                        var promises = [];
                        for (var i = 0; i < _selected.length; i++) {
                            that.log.trace("OdeslatZasilkyFyzicky 23920107/2: poradi: " + i);
                            if (_selected.oznaceni != 3 /* Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */) {
                                switch (that.ZpusobDorProp) {
                                    case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                                        promises.push(that.SendSignedMessage(_selected[i]));
                                        break;
                                    case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                        promises.push(that.SendMessage(_selected[i]));
                                        break;
                                    case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                                        promises.push(that.SendMessage(_selected[i]));
                                        break;
                                    default:
                                        that.dialogs.warning("ERROR 23920045");
                                        break;
                                }
                            }
                        }
                        $.when.apply(null, promises).done(function () {
                            var l_ok = Gordic.Wfl.Common.GetPocetProvedenych(that.resultInfo) > 0;
                            if (that.VypraveniDto.VratitNevypravene) {
                                switch (that.ZpusobDorProp) {
                                    case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                    case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                                        l_ok = true;
                                        break;
                                }
                            }
                            //l_ok = true; nevim proc
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo, 8 /* Wfl.Interface.TypAkce.vypraveni */, true);
                            that.log.trace("OdeslatZasilkyFyzicky 23920107/3: l_ok: " + l_ok);
                            promis.resolve(l_ok);
                        });
                    }
                    else {
                        promis.resolve(false);
                    }
                    return promis.promise();
                }
                OdeslatZasilkyFyzicky(_selected) {
                    let promis = $.Deferred();
                    const that = this;
                    var l_poradi = 1;
                    this.PocetCelkem = 0;
                    //zjistim pocet k vypraveni
                    Gordic.Wfl.ListAC.WflListBaseAC.ClearResultInfo(this);
                    that.log.trace("OdeslatZasilkyFyzicky 23920107/1: " + _selected.length);
                    for (var i = 0; i < _selected.length; i++) {
                        if (_selected[i].oznaceni != 3 /* Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */) {
                            _selected[i].poradi = l_poradi;
                            l_poradi += 1;
                            this.PocetCelkem += 1;
                            that.log.trace("OdeslatZasilkyFyzicky 23920107/2: l_poradi: " + l_poradi + "PocetCelkem: " + this.PocetCelkem);
                        }
                    }
                    if (this.PocetCelkem > 0) {
                        this.Poradi = 0;
                        let promise = $.Deferred().resolve().promise();
                        for (let i = 0, ii = _selected.length; i < ii; i++) {
                            promise = promise.then(() => {
                                that.log.trace("OdeslatZasilkyFyzicky 23920107/2: poradi: " + i);
                                if (_selected.oznaceni != 3 /* Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */) {
                                    switch (that.ZpusobDorProp) {
                                        case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                                            return that.SendSignedMessage(_selected[i]);
                                        case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                            return that.SendMessage(_selected[i]);
                                        case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                                            return that.SendMessage(_selected[i]);
                                        default:
                                            that.dialogs.warning("ERROR 23920045");
                                            return false;
                                    }
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        $.when(promise).then(() => {
                            var l_ok = Gordic.Wfl.Common.GetPocetProvedenych(that.resultInfo) > 0;
                            if (that.VypraveniDto.VratitNevypravene) {
                                switch (that.ZpusobDorProp) {
                                    case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                    case 305 /* Wfl.Interface.WflczpdEnum.HybridniPosta */:
                                        l_ok = true;
                                        break;
                                }
                            }
                            //l_ok = true; nevim proc
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultInfo(that, that.resultInfo, 8 /* Wfl.Interface.TypAkce.vypraveni */, true);
                            that.log.trace("OdeslatZasilkyFyzicky 23920107/3: l_ok: " + l_ok);
                            promis.resolve(l_ok);
                        });
                    }
                    else {
                        promis.resolve(false);
                    }
                    return promis.promise();
                }
                // odeslani jednouho radku
                SendMessage(item, sign) {
                    let promis = $.Deferred();
                    var that = this;
                    Gordic.Wfl.ListAC.WflListBaseAC.ShowWaitInfoProgress(this, "jres:23900081", true);
                    this.Poradi = this.Poradi + 1;
                    that.log.trace("SendMessage 23920107/1: poradi: " + this.Poradi);
                    that.call("OdeslatZasilku", { Sxs: item.sxs, Sign: sign })
                        .done(function (r) {
                        if (r) {
                            Gordic.Wfl.ListAC.WflListBaseAC.AddResultInfo(that, r);
                            item.oznaceni = Gordic.Gin.Globals.GetTypOznaceniRadkuSeznamu(r.Vysledek);
                            item.err_status = r.Info;
                            that.endOperation();
                            promis.resolve(true);
                        }
                        else {
                            item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                            that.log.trace("SendMessage 23920096/1: Sxs: " + item.sxs?.toString());
                            item.info = "ERROR 23920077";
                            that.endOperation();
                            promis.resolve(false);
                        }
                    })
                        .fail(function (retVal) {
                        that.log.trace("SendMessage 23920096/2: " + retVal.statusText);
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildRadku(that, item.sxs, retVal.statusText);
                        item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                        promis.resolve(false);
                    })
                        .always(function () { that.endOperation(); });
                    return promis.promise();
                }
                // odeslani jednouho radku mailu
                SendSignedMessage(item) {
                    let promis = $.Deferred();
                    const that = this;
                    this.Poradi = this.Poradi + 1;
                    that.log.trace("SendSignedMessage 23920099/1 poradi: " + this.Poradi);
                    if (item.s_sign && item.s_sign > 0) // podepisovat
                     {
                        that.log.trace("SendSignedMessage 23920099/2");
                        Gordic.Wfl.ListAC.WflListBaseAC.ShowWaitInfoProgress(this, "jres:23900088");
                        that.call("CreateMail", { Sxs: item.sxs })
                            .done(function (r) {
                            if (r) {
                                item.oznaceni = Gordic.Gin.Globals.GetTypOznaceniRadkuSeznamu(r.Vysledek);
                                switch (r.Vysledek) {
                                    case 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */:
                                        that.CreateSign(item.sxs, r.Info)
                                            .done(function (sign) {
                                            that.endOperation();
                                            if (sign) {
                                                that.SendMessage(item, sign).done(function (r) {
                                                    if (r)
                                                        promis.resolve(r);
                                                    else
                                                        promis.resolve(false);
                                                });
                                            }
                                            else {
                                                promis.resolve(false);
                                            }
                                        })
                                            .fail(function () {
                                            that.log.trace("SendSignedMessage 23920099/3: ");
                                        })
                                            .always(function () { that.endOperation(); });
                                        break;
                                    default:
                                        that.resultInfo.push(r);
                                        promis.resolve(false);
                                        break;
                                }
                            }
                            else {
                                item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                                promis.resolve(false);
                            }
                        })
                            .fail(function () {
                            item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildRadku(that, item.sxs, "ERROR 23920106");
                            that.log.trace("SendSignedMessage 23920099/4: ");
                            promis.resolve(false);
                        })
                            .always(function () { that.endOperation(); });
                    }
                    else // je nutno vytvorit mail a podepsat
                     {
                        that.SendMessage(item).done(function (r) {
                            if (r)
                                promis.resolve(r);
                            else
                                promis.resolve(false);
                        }).fail(function () {
                            Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildRadku(that, item.sxs, "ERROR 23920050");
                        });
                    }
                    return promis.promise();
                }
                CreateSign(_sxs, guid) {
                    let promis = $.Deferred();
                    const that = this;
                    //var fileName = "Mail{0}.eml".format(Date().format("YYYYMMDDhhmmss"));
                    var fileName = "MailKVypraveni_" + _sxs + ".eml";
                    var l_certInfo = this.globalSettings?.get(Gordic.Wfl.AttachmentUtils.certInfoOdeslaniUserSettingsKey);
                    if (l_certInfo)
                        Gordic.Wfl.Utils.SignObj.PodepisovaniApp.setCertificate(l_certInfo);
                    Gordic.Wfl.Utils.SignObj.PodepisovaniApp.sign({
                        file: guid,
                        fileName: fileName,
                        signTime: new Date(),
                        idSigningReason: this.IxsDpo,
                        signatureType: 12 /* Gordic.Security.Service.SignatureType.P7S */,
                        certMoreInfo: l_certInfo?.certMoreInfo
                    })
                        .then((signedConfig) => {
                        promis.resolve(signedConfig);
                    }, (reason) => {
                        that.endOperation();
                        Gordic.Gui.WebApp.Utils.showReasonFlash(that, reason);
                        if (!reason.handled) {
                            that.dialogs.warning(reason.reason);
                        }
                        promis.resolve(null);
                    });
                    return promis.promise();
                }
                TiskPodacihoArchuSDialogem() {
                    const that = this;
                    that.dialogs.messageBox("jres:23900014", "jres:23900065", [{ id: "ano", text: "jres:23900066" }, { id: "dopor", text: "jres:23900067" }, { id: "ne", text: "jres:23900068" },]) //RC 23900067 : Ano - dopor.
                        .on("close", function (ev, ctx) {
                        var l_typ = Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.netisknou;
                        switch (ctx) {
                            case "ano":
                                l_typ = Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknout;
                                break;
                            case "dopor":
                                l_typ = Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoporucene;
                                break;
                        }
                        if (l_typ != Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.netisknou)
                            Lists.VypListBasePage.TiskPodacihoArchuPriprava(that, l_typ);
                    });
                }
                KontrolaStavuDSOdesilatele() {
                    let promis = $.Deferred();
                    const that = this;
                    var selected = that.mainGrid.ggrid("getSelection").map((o) => { return { Id: o.id_ds_odes }; });
                    Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900075"); //RC 23900075 : Probíhá kontrola
                    this.call("GetZamceneMailboxy", { DsOdes: selected })
                        .done(function (zamceneMailboxy) {
                        that.log.trace("KontrolaStavuDSOdesilatele 23920090/1");
                        if (zamceneMailboxy.length > 0) {
                            that.log.trace("KontrolaStavuDSOdesilatele 23920090/2");
                            that.dialogs.confirm("jres:23900014", "jres:23900029").on("close", function (ev, retVal) {
                                if (retVal && retVal === "yes") {
                                    that.OdemknoutZamceneMailboxy(zamceneMailboxy).then(() => { promis.resolve(true); }, () => { promis.resolve(false); });
                                    //that.OdemknoutZamceneMailboxy(zamceneMailboxy);
                                }
                                else
                                    promis.resolve(false);
                            });
                        }
                        else {
                            that.log.trace("KontrolaStavuDSOdesilatele 23920090/3");
                            promis.resolve(true);
                        }
                    })
                        .fail(function () {
                        that.endOperation();
                        promis.resolve(false);
                    });
                    return promis.promise();
                }
                KontrolaStavuMailboxyHP(_selected) {
                    let promis = $.Deferred();
                    const that = this;
                    that.log.trace("KontrolaStavuMailboxyHP 23920100/1");
                    Gordic.Gin.Globals.ShowWaitInfo(that, "jres:23900075"); //RC 23900075 : Probíhá kontrola
                    this.call("KontrolaZamkuOdeslani")
                        .done(function (res) {
                        if (res.Vysledek == 3 /* Gordic.Gin.Interface.TypVysledkuOperace.Neprovedeno */) {
                            that.endOperation();
                            that.dialogs.confirm("jres:23900014", res.Info).on("close", function (ev, retVal) {
                                if (retVal && retVal === "yes") {
                                    that.OdemknoutZamekOdeslani().done(function (isOK) {
                                        promis.resolve(isOK);
                                    });
                                }
                                else
                                    promis.resolve(false);
                            });
                        }
                        else {
                            that.endOperation();
                            promis.resolve(true);
                        }
                    })
                        .fail(function (jqXHR, typ, textStatus) {
                        that.endOperation();
                        that.log.trace("KontrolaStavuMailboxyHP 23920100/2");
                    });
                    return promis.promise();
                }
                IfOverovatDSAdresatu() {
                    let promis = $.Deferred();
                    switch (this.VypraveniDto.OverovatDSAdresatu) {
                        case 2:
                            promis.resolve(true);
                            break;
                        case 1:
                            this.dialogs.confirm("jres:23900014", "jres:23900069").on("close", function (ev, retVal) {
                                if (retVal === "yes") {
                                    promis.resolve(true);
                                }
                                else {
                                    promis.resolve(false);
                                }
                            });
                            break;
                        default:
                            promis.resolve(false);
                            break;
                    }
                    return promis.promise();
                }
                // kontrola jednouho radku
                KontrolaDSAdresatu(item) {
                    let promis = $.Deferred();
                    var IsGex = this.ZpusobDorProp == 200 /* Wfl.Interface.WflczpdEnum.GEX */;
                    const that = this;
                    that.log.trace("KontrolaDSAdresatu 23920101/1");
                    if (item.oznaceni != 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */) {
                        var l_res = {};
                        l_res.Ixs = item.sxs;
                        Gordic.Wfl.ListAC.WflListBaseAC.ShowWaitInfoProgress(this, "jres:23900080");
                        Gordic.Esu.Utils.OverISDSzWFL({
                            flagGex: IsGex ? "1" : "0",
                            content: this,
                            //Ucel: false,
                            PrevzitVOkne: true,
                            IxsEsu: item.ixs_esu,
                            overovatJenExistenciSchranky: this.SessionInfo.IsVyvoj ? "1" : "0" // "1;" = jenom existenci
                        })
                            .done(function (retVal) {
                            //that.endOperation();
                            if (retVal && retVal.stav && typeof retVal.stav === "string") {
                                switch (retVal.stav) {
                                    case "nalezeno":
                                        l_res.ErrorText = "";
                                        l_res.Vysledek = 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */;
                                        break;
                                    case "prevzato":
                                        l_res.ErrorText = "jres:23900077"; //RC 23900077 : Data adresáta byla převzata z ISDS
                                        l_res.Vysledek = 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */;
                                        break;
                                    case "neprevzato":
                                        l_res.ErrorText = "Data adresáta nebyla převzata z ISDS";
                                        l_res.Vysledek = 4 /* Gordic.Gin.Interface.TypVysledkuOperace.ProvedenoSUpozornenim */;
                                        break;
                                    case "nenalezeno":
                                        if (IsGex) {
                                            //zacniOvereni(TypSchranky.Ds);
                                        }
                                        else {
                                            l_res.ErrorText = "Datová schránka adresáta nebyla nalezena";
                                            l_res.Vysledek = 3 /* Gordic.Gin.Interface.TypVysledkuOperace.Neprovedeno */;
                                            item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                                            item.info = l_res.ErrorText;
                                        }
                                        break;
                                    default:
                                        l_res.Vysledek = 3 /* Gordic.Gin.Interface.TypVysledkuOperace.Neprovedeno */;
                                        l_res.ErrorText = retVal.stav;
                                        break;
                                }
                                that.resultInfo.push(l_res);
                            }
                            else {
                                l_res.ErrorText = "CHYBA 23920036";
                                that.log.trace("KontrolaDSAdresatu 23920101/2");
                                l_res.Vysledek = 3 /* Gordic.Gin.Interface.TypVysledkuOperace.Neprovedeno */;
                                item.oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                                item.info = l_res.ErrorText;
                                that.resultInfo.push(l_res);
                                //vyhodnotOvereni({ stav: "fail" }, overGex);
                            }
                            promis.resolve(true);
                        })
                            .fail(function (retVal) {
                            that.endOperation();
                            l_res.ErrorText = "CHYBA 23920037 " + retVal;
                            that.log.trace("KontrolaDSAdresatu 23920101/3: " + l_res.ErrorText);
                            l_res.Vysledek = 3 /* Gordic.Gin.Interface.TypVysledkuOperace.Neprovedeno */;
                            that.resultInfo.push(l_res);
                            promis.resolve(false);
                            //vyhodnotOvereni({ stav: "fail" }, overGex);
                        });
                    }
                    return promis.promise();
                }
                OvereniDSAdresatuOld(_selected) {
                    let promis = $.Deferred();
                    const that = this;
                    for (var i = 0; i < _selected.length; i++) {
                        _selected[i].poradi = i;
                        if (!_selected[i].ixs_esu) {
                            _selected[i].oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                            _selected[i].info = "jres:23900072";
                        }
                    }
                    that.PocetCelkem = _selected.length;
                    this.Poradi = 0;
                    this.IfOverovatDSAdresatu().done(function (overit) {
                        if (overit) {
                            that.OverovatDS = true;
                            var promises = [];
                            for (var i = 0; i < _selected.length; i++) {
                                promises.push(that.KontrolaDSAdresatu(_selected[i]));
                            }
                            $.when.apply(null, promises).done(function () {
                                promis.resolve(true);
                            });
                        }
                        else {
                            that.OverovatDS = false;
                            promis.resolve(true);
                        }
                    });
                    return promis.promise();
                }
                OvereniDSAdresatu(_selected) {
                    let promis = $.Deferred();
                    const that = this;
                    for (var i = 0; i < _selected.length; i++) {
                        _selected[i].poradi = i;
                        if (!_selected[i].ixs_esu) {
                            _selected[i].oznaceni = 3 /* Gordic.Gin.Interface.TypOznaceniRadkuSeznamu.Neprovedeno */;
                            _selected[i].info = "jres:23900072";
                        }
                    }
                    that.PocetCelkem = _selected.length;
                    this.Poradi = 0;
                    this.IfOverovatDSAdresatu().done(function (overit) {
                        if (overit) {
                            that.OverovatDS = true;
                            //let promise = $.when(false);
                            let promise = $.Deferred().resolve().promise();
                            for (let i = 0, ii = _selected.length; i < ii; i++) {
                                promise = promise.then(() => {
                                    return that.KontrolaDSAdresatu(_selected[i]);
                                });
                            }
                            $.when(promise).then(() => {
                                //return pokracovaniPoCyklu();
                                promis.resolve(true);
                            });
                        }
                        else {
                            that.OverovatDS = false;
                            promis.resolve(true);
                        }
                    });
                    return promis.promise();
                }
                OdemknoutZamceneMailboxy(lockedMaibox) {
                    let promis = $.Deferred();
                    const that = this;
                    that.log.trace("OdemknoutZamceneMailboxy 23920091/1");
                    Gordic.Gin.Globals.ShowWaitInfo(this, "jres:23900076"); //RC 23900076 : Odemykám zamčené schránky
                    this.call("OdemknoutZamceneMaiboxy", { LockedMaibox: lockedMaibox })
                        .done(function (r) {
                        promis.resolve(r && r.Vysledek == 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */);
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    return promis.promise();
                }
                OdemknoutZamekOdeslani() {
                    let promis = $.Deferred();
                    const that = this;
                    Gordic.Gin.Globals.ShowWaitInfo(this, "jres:23900076"); //RC 23900076 : Odemykám zamčené schránky
                    this.call("OdemkniZamekOdeslani")
                        .done(function (r) {
                        promis.resolve(true);
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    return promis.promise();
                }
                GetSelectedZasilkyVypraveniListDto() {
                    return this.mainGrid.ggrid("getSelection").map((o) => { return { sxs: o.sxs, ixs_esu: o.ixs_esu, akt_ixs_su: o.akt_ixs_su, start_ixs_su: o.start_ixs_su, start_ixs_fun: o.start_ixs_fun, s_sign: o.s_sign }; });
                }
            };
            VypraveniZasilekListPage = __decorate([
                Decorators.gcontent
            ], VypraveniZasilekListPage);
            Lists.VypraveniZasilekListPage = VypraveniZasilekListPage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var Lists;
        (function (Lists) {
            var VypListBasePage_1;
            let VypListBasePage = VypListBasePage_1 = class VypListBasePage extends Gordic.GContentBase {
                static CreateActionsTisk(content) {
                    content.printActionsSubmenu.push(this.CreateActionTiskPodacihoArchu(content, Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknout));
                    content.printActionsSubmenu.push(this.CreateActionTiskPodacihoArchu(content, Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoporucene));
                    content.printActionsSubmenu.push(this.CreateActionTiskPodacihoArchu(content, Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoZahranici));
                    content.printActionsSubmenu.push(this.CreateActionTiskPodacihoArchu(content, Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoZahraniciDoporucene));
                    content.printActionsSubmenu.push(this.CreateActionTiskEvidListPostovneho(content));
                }
                static CreateActionsPredplneni(content) {
                    if (content.submenuActions == undefined)
                        content.submenuActions = [];
                    content.submenuActions.push(this.CreateActionPredplnit(content, 0 /* Wfl.Interface.TypPredplneniEnum.PodaciCislo */));
                    content.submenuActions.push(this.CreateActionPredplnit(content, 2 /* Wfl.Interface.TypPredplneniEnum.Vaha */));
                    content.submenuActions.push(this.CreateActionPredplnit(content, 1 /* Wfl.Interface.TypPredplneniEnum.Poplatek */));
                    content.submenuActions.push(this.CreateActionPredplnit(content, 3 /* Wfl.Interface.TypPredplneniEnum.Vse */));
                    content.submenuActions.push(this.CreateActionPredplnitPoplatekDlePrednastaveni(content));
                    content.submenuActions.push(this.CreateActionPredplnitDlePrednastaveni(content));
                    content.submenuActions.push(this.CreateActionUlozitPredplneni(content));
                    Gordic.Wfl.AC.WflBaseAC.AddSubMenu(content, "jres:23900047", Gordic.Gin.Icons.ActionEnum.editovat); //RC 23900047 : Předplnit
                }
                static CreateGridZasilekVyp(content) {
                    var gf = Gordic.Wfl.ListAC.WflListBaseAC.GetGridFormat();
                    gf.addIconColumn(Gordic.Gin.Globals.GridIconOptResulInfo());
                    gf.addIconColumn(Gordic.Wfl.ListAC.DelegateTypZasilkyIcon());
                    gf.addIconColumn(Gordic.Wfl.ListAC.DelegateSablonaZasilkyIcon());
                    if (content.model.TypSeznamu == 6 /* Wfl.Interface.TypSeznamuZasilek.vypraveni */) {
                        switch (content.ZpusobDorProp) {
                            case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                                gf.addIconColumn(Gordic.Wfl.ListAC.DelegateSSignIcon());
                                break;
                        }
                    }
                    if (content.SessionInfo.IsVyvoj) {
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.SXSColumn());
                        gf.addNumberColumn(Gordic.Wfl.ListPrefabs.tridVypColumn());
                        gf.addNumberColumn(Gordic.Wfl.ListPrefabs.KVColumn());
                    }
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatColumn());
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.zastOsobaNazevColumn());
                    //gf.add(Gordic.Wfl.ListPrefabs.vecColumn());
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.ixpColumn());
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.zpusobDoruceniColumn());
                    switch (content.ZpusobDorProp) {
                        case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                        case 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */:
                        case 30 /* Wfl.Interface.WflczpdEnum.Kuryr */:
                            gf.add(Gordic.Wfl.ListPrefabs.podaciCisloColumn());
                            gf.addDecimalColumn(Vyp.VypPrefabs.poplatekColumn());
                            gf.addDecimalColumn(Vyp.VypPrefabs.vahaColumn());
                            gf.addDecimalColumn(Vyp.VypPrefabs.cenaColumn());
                            break;
                    }
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.postSluzbColumn());
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.druhZasilkyColumn());
                    if (content.model.TypSeznamu == 6 /* Wfl.Interface.TypSeznamuZasilek.vypraveni */) {
                        gf.add(Gordic.Wfl.ListPrefabs.vecColumn());
                    }
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.idDorucenky());
                    gf.add(Gordic.Wfl.ListPrefabs.odesilajiciAktStartColumn());
                    if (content.model.TypSeznamu == 6 /* Wfl.Interface.TypSeznamuZasilek.vypraveni */) {
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.odesilajiciAktStartSUColumn());
                    }
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.cisloJednaciColumn(content.LabelCisloJednaci));
                    if (content.model.TypSeznamu == 6 /* Wfl.Interface.TypSeznamuZasilek.vypraveni */) {
                        switch (content.ZpusobDorProp) {
                            case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                            case 200 /* Wfl.Interface.WflczpdEnum.GEX */:
                                gf.addTextColumn(Vyp.VypPrefabs.idDSOdesiltele());
                                break;
                        }
                        gf.addDateTimeColumn(Gordic.Wfl.ListPrefabs.datOdesColumn());
                        gf.add(Gordic.Wfl.ListPrefabs.adresatJmenoColumn());
                        switch (content.ZpusobDorProp) {
                            case 10 /* Wfl.Interface.WflczpdEnum.Posta */:
                            case 40 /* Wfl.Interface.WflczpdEnum.DorucovaciSluzba */:
                            case 30 /* Wfl.Interface.WflczpdEnum.Kuryr */:
                                gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatPostaColumn());
                                gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatAdresaColumn());
                                break;
                        }
                    }
                    if (content.model.TypSeznamu == 9 /* Wfl.Interface.TypSeznamuZasilek.kPrevzetiDleID */) {
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.nazevStartSUColumn());
                        gf.addDateColumn(Gordic.Wfl.ListPrefabs.datOdesColumn());
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatJmenoColumn());
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatPostaColumn());
                        gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatAdresaColumn());
                        gf.addDateColumn(Gordic.Wfl.ListPrefabs.datDatZmenaColumn());
                    }
                    if (content.model.TypSeznamu == 6 /* Wfl.Interface.TypSeznamuZasilek.vypraveni */) {
                        switch (content.ZpusobDorProp) {
                            case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                            case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                            case 200 /* Wfl.Interface.WflczpdEnum.GEX */:
                                gf.addNumberColumn({ name: "pocet_el_souboru", caption: "jres:23900020", width: 80 }); //RC 23900020 : Počet el. příloh
                                break;
                        }
                        switch (content.ZpusobDorProp) {
                            case 50 /* Wfl.Interface.WflczpdEnum.EMail */:
                                gf.addTextColumn(Gordic.Wfl.ListPrefabs.odesilatelSchrankaColumn());
                                gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatSchrankaColumn());
                                break;
                            case 100 /* Wfl.Interface.WflczpdEnum.DatovaSchranka */:
                                if (content.PovolenoHKP)
                                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.adresatHKPcolumn());
                                break;
                        }
                    }
                    gf.addTextColumn(Gordic.Wfl.ListPrefabs.errorTextColumn());
                    content.gridFormat = gf;
                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.CreateGridBaseZasilek(content);
                }
                static GetSelectedGDataZasilkyProVypocetVahyAPoplatkuDto(content) {
                    return content.mainGrid.ggrid("getSelection").map((o) => { return { sxs: o.sxs, poplatek: o.poplatek, vaha: o.vaha, stat: o.stat, druh_zas: o.druh_zas, komb_sluzeb: o.komb_sluzeb, priz_doruc: o.priz_doruc }; });
                }
                static GetAllZasilkaIdSXSDto(content) {
                    return content.mainGrid.ggrid("getSelection").map((o) => { return { sxs: o.sxs, id_dorunky: o.id_dorucenky }; });
                }
                static CreateActionPredplnit(content, typ, favorite) {
                    var l_caption = "jres:23900047" + " "; //RC 23900047 : Předplnit
                    switch (typ) {
                        case 0 /* Wfl.Interface.TypPredplneniEnum.PodaciCislo */:
                            l_caption += "jres:23900048"; //RC 23900048 : podací číslo
                            break;
                        case 2 /* Wfl.Interface.TypPredplneniEnum.Vaha */:
                            l_caption += "jres:23900049"; //RC 23900049 : váhu
                            break;
                        case 1 /* Wfl.Interface.TypPredplneniEnum.Poplatek */:
                            l_caption += "jres:23900050"; //RC 23900050 : poplatek
                            break;
                        case 3 /* Wfl.Interface.TypPredplneniEnum.Vse */:
                            l_caption += "jres:23900052"; //RC 23900052 : vše
                            break;
                    }
                    var action = new GAction({
                        name: "actPredplnit_" + typ,
                        icon: Gordic.Gin.Icons.ActionEnum.editovat,
                        caption: l_caption,
                        tooltip: l_caption,
                        run: function (ev, ctx) {
                            content.findFields().gfield("model", "collect", content.Predplneni);
                            if (content.Predplneni) {
                                // predplneni na client
                                var l_ifPodCislo = false;
                                var l_ifVaha = false;
                                var l_ifPoplatek = false;
                                let predplneniServer = false;
                                switch (typ) {
                                    case 0 /* Wfl.Interface.TypPredplneniEnum.PodaciCislo */:
                                        l_ifPodCislo = true;
                                        predplneniServer = true;
                                        break;
                                    case 2 /* Wfl.Interface.TypPredplneniEnum.Vaha */:
                                        l_ifVaha = true;
                                        break;
                                    case 1 /* Wfl.Interface.TypPredplneniEnum.Poplatek */:
                                        l_ifPoplatek = true;
                                        break;
                                    case 3 /* Wfl.Interface.TypPredplneniEnum.Vse */:
                                        predplneniServer = true;
                                        l_ifPodCislo = true;
                                        l_ifVaha = true;
                                        l_ifPoplatek = true;
                                        break;
                                }
                                Gordic.Vyp.AppSettings.SetVypraveniSettings(content, { novePodaciCislo: content.Predplneni.novePodaciCislo });
                                if (predplneniServer) {
                                    var l_selected = Gordic.Wfl.ListAC.WflZasilkyListBaseAC.GetSelectedGZasilkaEditListDto(content);
                                    if (l_selected.length > 0) {
                                        content.call("PredplnitZasilky", { Selected: l_selected, Typ: typ, Predplneni: content.Predplneni })
                                            .done(function (data) {
                                            if (!content.Info) {
                                                //posledni podaci cislo
                                                content.Predplneni.pod_cislo = content.PosledniPodaciCislo;
                                                content.findFields("pod_cislo").gfield("setValue", content.PosledniPodaciCislo);
                                                Gordic.Vyp.AppSettings.SetVypraveniSettings(content, { posledniPodaciCislo: content.PosledniPodaciCislo });
                                            }
                                            var l_view = content.mainGrid.ggrid("getView");
                                            var l_dataRows = l_view.getDataRows(true);
                                            for (var i = 0; i < data.length; i++) {
                                                var find = l_dataRows.filter((it) => it.data.sxs && it.key === data[i].sxs);
                                                var l_row = find.length === 1 ? find[0] : null;
                                                if (l_row) {
                                                    if (l_ifPodCislo)
                                                        l_row.data.pod_cislo = data[i].pod_cislo;
                                                    if (l_ifVaha)
                                                        l_row.data.vaha = data[i].vaha;
                                                    if (l_ifPoplatek)
                                                        l_row.data.poplatek = data[i].poplatek;
                                                }
                                            }
                                            l_view.updateData(l_dataRows, "reset");
                                        })
                                            .always(function () {
                                            content.endOperation();
                                        });
                                    }
                                    else
                                        Gordic.Wfl.ListAC.WflListBaseAC.ShowInfoNeniVybranZadnyRadek(content);
                                }
                                else {
                                    var l_view = content.mainGrid.ggrid("getView");
                                    var l_dataRows = l_view.getDataRows(true);
                                    for (var i = 0; i < l_dataRows.length; i++) {
                                        if (l_dataRows[i].checked) {
                                            if (l_ifPodCislo) {
                                                var l_podCislo = "";
                                                if (content.Predplneni.text_pred)
                                                    l_podCislo += content.Predplneni.text_pred;
                                                if (content.Predplneni.pod_cislo)
                                                    l_podCislo += content.Predplneni.pod_cislo;
                                                if (content.Predplneni.text_za)
                                                    l_podCislo += content.Predplneni.text_za;
                                                l_dataRows[i].data["pod_cislo"] = l_podCislo;
                                            }
                                            if (l_ifVaha)
                                                l_dataRows[i].data["vaha"] = content.Predplneni.vaha;
                                            if (l_ifPoplatek)
                                                l_dataRows[i].data["poplatek"] = content.Predplneni.poplatek;
                                        }
                                    }
                                    l_view.updateData(l_dataRows, "reset");
                                    content.call("UlozPredplneni", { model: content.Predplneni })
                                        .done(function (data) { });
                                }
                            }
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static CreateActionPredplnitDlePrednastaveni(content, favorite) {
                    var action = new GAction({
                        name: "actPredplnitVahuPoplatekDlePrednastaveni",
                        icon: Gordic.Gin.Icons.ActionEnum.editovat,
                        caption: "jres:23900061", //RC 23900061 : Předplnit poplatek/váhu dle přednastavení
                        tooltip: "jres:23900061",
                        run: function (ev, ctx) {
                            VypListBasePage_1.PredplnitPoplatekDlePrednastaveni(content, false);
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static CreateActionPredplnitPoplatekDlePrednastaveni(content, favorite) {
                    var action = new GAction({
                        name: "actPredplnitVahuPoplatekDlePrednastaveni",
                        icon: Gordic.Gin.Icons.ActionEnum.editovat,
                        caption: "jres:23900200", //RC 23900200 : Předplnit poplatek dle přednastavení
                        tooltip: "jres:23900200",
                        run: function (ev, ctx) {
                            VypListBasePage_1.PredplnitPoplatekDlePrednastaveni(content, true);
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static PredplnitPoplatekDlePrednastaveni(content, _pouzePoplatek) {
                    var l_selected = VypListBasePage_1.GetSelectedGDataZasilkyProVypocetVahyAPoplatkuDto(content);
                    if (l_selected.length > 0) {
                        content.call("PredplnitPoplatekAVahuDlePrednastaveni", { Selected: l_selected, PouzePoplatek: _pouzePoplatek })
                            .done(function (data) {
                            var l_view = content.mainGrid.ggrid("getView");
                            var l_dataRows = l_view.getDataRows(true);
                            for (var i = 0; i < data.length; i++) {
                                var find = l_dataRows.filter((it) => it.data.sxs && it.key === data[i].sxs);
                                var l_row = find.length === 1 ? find[0] : null;
                                if (l_row) {
                                    l_row.data.vaha = data[i].vaha;
                                    l_row.data.poplatek = data[i].poplatek;
                                }
                            }
                            l_view.updateData(l_dataRows, "reset");
                        })
                            .always(function () {
                            content.endOperation();
                        });
                    }
                    else
                        Gordic.Wfl.ListAC.WflListBaseAC.ShowInfoNeniVybranZadnyRadek(content);
                }
                static CreateActionEditaceDatPredplneni(content, favorite) {
                    var action = new GAction({
                        name: "actEditaceDatPredplneni",
                        icon: Gordic.Gin.Icons.ActionEnum.editovat,
                        caption: "jres:23900178", //RC 23900178 : Nastaveni hodnot přeplnění
                        tooltip: "jres:23900178",
                        run: function (ev, ctx) {
                            var rowData = Gordic.Wfl.ListAC.WflListBaseAC.GetActiveRow(content);
                            if (rowData) {
                                Gordic.Vyp.Dialogs.PredplneniZasilkyDlg(content, { data: content.Predplneni }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .done(function (retVal) {
                                    if (retVal != null) {
                                        content.Predplneni = retVal;
                                    }
                                });
                            }
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static CreateActionZmenaHodnot(content, favorite) {
                    var action = new GAction({
                        name: "actZmenaHodnot",
                        icon: Gordic.Gin.Icons.ActionEnum.editovat,
                        caption: "jres:23900062", //RC 23900062 : Změnit hodnoty řádku
                        tooltip: "jres:23900062",
                        run: function (ev, ctx) {
                            var rowData = Gordic.Wfl.ListAC.WflListBaseAC.GetActiveRow(content);
                            if (rowData) {
                                Gordic.Vyp.Dialogs.EditaceZasilkyDlg(content, { data: rowData }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .done(function (retVal) {
                                    if (retVal != null) {
                                        rowData.pod_cislo = retVal.pod_cislo;
                                        rowData.cena = retVal.cena;
                                        rowData.poplatek = retVal.poplatek;
                                        rowData.vaha = retVal.vaha;
                                        Gordic.Wfl.ListAC.WflListBaseAC.UpdateRowData(content, rowData);
                                        content.NeulozenaData = true;
                                    }
                                });
                            }
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static CreateFrankovaniActions(content) {
                    let l_settings = content.VypraveniSettings;
                    if (l_settings && l_settings.typ_frankovani) {
                        switch (l_settings.typ_frankovani) {
                            case 16 /* Wfl.Interface.TypFrankovacihoStroje.NeopostDataMatrixCtecka */:
                                if (content.model.TypSeznamu != 9 /* Gordic.Wfl.Interface.TypSeznamuZasilek.kPrevzetiDleID */) {
                                    if (content.VypraveniSettings.TypFrankovaniDbParam == 3 /* Wfl.Interface.TypFrankovaniDbParam.datamatrixCtecka */) {
                                        if (content.Info)
                                            Gordic.Wfl.AC.WflBaseAC.ShowFlashWarning(content, content.Info);
                                        content.specialActions.push(VypListBasePage_1.CreateActionFrankovaniOnLine(content, l_settings.typ_frankovani));
                                    }
                                }
                                break;
                            case 25 /* Wfl.Interface.TypFrankovacihoStroje.FramaSoubor */:
                                content.specialActions.push(VypListBasePage_1.CreateActionFrankovaniOffLine(content, l_settings.typ_frankovani));
                                VypListBasePage_1.CreateGetFileField(content);
                                break;
                        }
                    }
                }
                static CreateActionUlozitPredplneni(content, favorite) {
                    var action = new GAction({
                        name: "actUlozitPredplneni",
                        icon: Gordic.Gin.Icons.ActionEnum.ulozit,
                        caption: "jres:23900051", //RC 23900051 : Uložit předplnění
                        tooltip: "jres:23900051",
                        run: function (ev, ctx) {
                            content.findFields().gfield("model", "collect", content.Predplneni);
                            Gordic.Vyp.AppSettings.SetVypraveniSettings(content, {
                                text_pred: content.Predplneni.text_pred,
                                posledniPodaciCislo: content.Predplneni.pod_cislo,
                                text_za: content.Predplneni.text_za,
                                poplatek: content.Predplneni.poplatek,
                                vaha: content.Predplneni.vaha,
                                novePodaciCislo: content.Predplneni.novePodaciCislo
                                //psc: undefined,
                                //stat: content.Predpln,
                                //dor_sluzba: undefined,
                            });
                        }
                    });
                    if (favorite && favorite == true)
                        action.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });
                    return action;
                }
                static CreateActionTiskPodacihoArchu(content, typ) {
                    var l_caption = "jres:23900039";
                    switch (typ) {
                        case Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknout:
                            break;
                        case Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoporucene:
                            l_caption += " " + "(" + "jres:23900040" + ")"; //RC 23900040 : doporučené
                            break;
                        case Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoZahranici:
                            l_caption += " " + "jres:23900168"; //RC 23900168 : do zahraničí
                            break;
                        case Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu.tisknoutDoZahraniciDoporucene:
                            l_caption += " " + "jres:23900170" + " " + "(" + "jres:23900040" + ")"; //RC 23900170 : do zahr.
                            break;
                    }
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskPodacihoArchu,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: l_caption, //RC 23900039 : Tisk - Podací arch                
                        tooltip: l_caption,
                        run: function (ev, ctx) {
                            VypListBasePage_1.TiskPodacihoArchuPriprava(content, typ);
                        }
                    });
                    return action;
                }
                static TiskPodacihoArchuPriprava(content, typ) {
                    if (content.ListParams.VyberTiskPA == 1) {
                        var l_asSelectedSxs = Gordic.Wfl.ListAC.WflZasilkyListBaseAC.GetSxsArrayFromSelection(content);
                        if (l_asSelectedSxs.length > 0) {
                            //oznaceni v temp
                            content.call("UpdateVyberRadku", { Selected: l_asSelectedSxs })
                                .done(function () {
                                VypListBasePage_1.TiskPodacihoArchu(content, typ);
                            });
                        }
                        else
                            content.showFlash("jres:23900183", Gordic.Gin.Globals.Enums.StateEnum.error, content.FlashPanelTimer); //RC 23900183 : Není vybrán žádný řádek k tisku.
                    }
                    else {
                        VypListBasePage_1.TiskPodacihoArchu(content, typ);
                    }
                }
                static TiskPodacihoArchu(content, typ, event) {
                    var l_ptm = "vyp_ptm_pdarch";
                    var act = GAction.createPrintAction({
                        name: "dlgTisk",
                        caption: "jres:23900163", //RC 23900163 : Generovani s dialogem
                        tooltip: "jres:23900163",
                        tema: l_ptm,
                        reportStarting: function (rep) {
                            let l_settings = content.VypraveniSettings;
                            rep.params.X0000 = content.SessionInfo.LogPorCislo.toString();
                            rep.params.X0001 = typ.toString();
                            rep.params.X0002 = content.ZpusobDorProp.toString();
                            rep.params.X0003 = content.LabelZnacka;
                            rep.params.X0004 = content.ListParams.VyberTiskPA.toString();
                            rep.params.X0005 = content.ListParams.IxsIsu ? content.ListParams.IxsIsu : "";
                            rep.params.X0006 = content.ListParams.epa_server_jmeno_souboru ? content.ListParams.epa_server_jmeno_souboru : "";
                            let l_sIDpodavatele = "";
                            if (l_settings.epa_identifikace_podavatele)
                                l_sIDpodavatele = l_settings.epa_identifikace_podavatele.trim();
                            if (l_settings.cislo_zakaznicke_karty_odesilatele)
                                l_sIDpodavatele += "#" + l_settings.cislo_zakaznicke_karty_odesilatele.trim();
                            if (l_settings.epa_data_odesilatele)
                                l_sIDpodavatele += "|" + l_settings.epa_data_odesilatele.trim();
                            rep.params.X0007 = l_sIDpodavatele;
                            rep.params.X0008 = l_settings.epa_jednoznacne_jmeno ? "2" : "1";
                        }
                    });
                    act.run({ shiftKey: event?.shiftKey });
                    ;
                }
                static CreateActionTiskKnihyVypravenePosty(content) {
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskKnihyVypravenePosty,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: "jres:23900161", //RC 23900161 : Tisk knihy vypravené pošty
                        run: function (ev, ctx) {
                            var act = GAction.createPrintAction({
                                name: "dlgTisk",
                                caption: "jres:23900162", //RC 23900162 : Generovani s dialogem
                                tooltip: "jres:23900162",
                                tema: "vyp_ptm_knvypp",
                                reportStarting: function (rep) {
                                    var l_date = Gordic.Wfl.Globals.GetWflDateIntervalForReport(content.IntervalOdDo, 1 /* Gordic.Wfl.Interface.FormatDateType.yyyyMMdd */, content.SessionInfo.DatabaseType);
                                    rep.params.X0000 = content.SessionInfo.IxsSu.toString();
                                    rep.params.X0001 = l_date.start;
                                    rep.params.X0002 = l_date.end;
                                    rep.params.X0004 = content.LabelZnacka;
                                }
                            });
                            act.run({ shiftKey: ev?.shiftKey });
                        }
                    });
                    return action;
                }
                static CreateActionTiskVykazu(content) {
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskVykazu,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: "jres:23900164", //RC 23900164 : Tisk výkazů
                        run: function (ev, ctx) {
                            var act = GAction.createPrintAction({
                                name: "dlgTisk",
                                caption: "jres:23900165", //RC 23900165 : Generovani s dialogem
                                tooltip: "jres:23900165",
                                tema: "vyp_ptm_denvyk",
                                reportStarting: function (rep) {
                                    let l_settings = content.VypraveniSettings;
                                    var l_date = Gordic.Wfl.Globals.GetWflDateIntervalForReport(content.IntervalOdDo, 0 /* Gordic.Wfl.Interface.FormatDateType.ddMMyyyy */, content.SessionInfo.DatabaseType);
                                    rep.params.X0000 = content.SessionInfo.IxsSu.toString();
                                    rep.params.X0001 = l_date.start;
                                    rep.params.X0002 = l_date.end;
                                    rep.params.X0003 = l_settings.cislo_podavatele ? l_settings.cislo_podavatele : "";
                                    rep.params.X0004 = l_settings.uzivatel_vs ? l_settings.uzivatel_vs : "";
                                    rep.params.X0005 = content.SessionInfo.IxsSu.toString();
                                    rep.params.X0006 = l_settings.psc ? l_settings.psc : "";
                                    rep.params.X0007 = Gordic.Wfl.Globals.GetDateStringFromJsonDate(content.IntervalOdDo.end, 0 /* Gordic.Wfl.Interface.FormatDateType.ddMMyyyy */);
                                }
                            });
                            act.run({ shiftKey: ev?.shiftKey });
                        }
                    });
                    return action;
                }
                static CreateActionTiskNakladu(content) {
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskVykazu,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: "jres:23900166", //RC 23900166 : Tisk nákladu
                        tooltip: "jres:23900166",
                        run: function (ev, ctx) {
                            var act = GAction.createPrintAction({
                                name: "dlgTisk",
                                caption: "jres:23900165", //RC 23900165 : Generovani s dialogem
                                tooltip: "jres:23900165",
                                tema: "vyp_ptm_naklady",
                                reportStarting: function (rep) {
                                    var l_date = Gordic.Wfl.Globals.GetWflDateIntervalForReport(content.IntervalOdDo, 0 /* Gordic.Wfl.Interface.FormatDateType.ddMMyyyy */, content.SessionInfo.DatabaseType);
                                    rep.params.X0000 = content.SessionInfo.IxsSu.toString();
                                    rep.params.X0001 = l_date.start;
                                    rep.params.X0002 = l_date.end;
                                    rep.params.X0003 = Gordic.Wfl.Globals.GetDateStringFromJsonDate(content.IntervalOdDo.end, 0 /* Gordic.Wfl.Interface.FormatDateType.ddMMyyyy */);
                                    rep.params.X0004 = content.SessionInfo.IxsSu.toString();
                                }
                            });
                            act.run({ shiftKey: ev?.shiftKey });
                        }
                    });
                    return action;
                }
                static CreateActionTiskVypravenychDokSpis(content) {
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskVykazu,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: "jres:23900167", //RC 23900167 : Tisk přehledu vypravených dokumentů/spisů
                        tooltip: "jres:23900167",
                        run: function (ev, ctx) {
                            var act = GAction.createPrintAction({
                                name: "dlgTisk",
                                caption: "jres:23900165", //RC 23900165 : Generovani s dialogem
                                tooltip: "jres:23900165",
                                tema: "vyp_ptm_pre_vyp",
                                reportStarting: function (rep) {
                                    rep.params.X0000 = content.SessionInfo.LogPorCislo.toString();
                                    rep.params.X0001 = content.ListParams.VyberTiskPA.toString();
                                    rep.params.X0002 = content.ListParams.IxsIsu ? content.ListParams.IxsIsu : "";
                                    rep.params.X0003 = content.LabelZnacka;
                                    rep.params.X0004 = content.ZpusobDorProp.toString();
                                }
                            });
                            act.run({ shiftKey: ev?.shiftKey });
                        }
                    });
                    return action;
                }
                static CreateActionTiskEvidListPostovneho(content) {
                    var action = new GAction({
                        name: Gordic.Vyp.Globals.Enums.ActionsName.TiskEvidListPostovneho,
                        icon: Gordic.Gin.Icons.ActionEnum.tisk,
                        caption: "jres:23900038", //RC 23900038 : Tisk - Evideční lístek poštovného
                        tooltip: "jres:23900038",
                        run: function (ev, ctx) {
                            var l_ptm = "vyp_ptm_elpost";
                            var act = GAction.createPrintAction({
                                name: "dlgTisk",
                                caption: "jres:23900037", //RC 23900037 : Generovani s dialogem
                                tooltip: "jres:23900037",
                                tema: l_ptm,
                                reportStarting: function (rep) {
                                    rep.params.X0000 = content.SessionInfo.LogPorCislo.toString();
                                    rep.params.X0001 = content.ListParams.VyberTiskPA.toString();
                                }
                            });
                            act.run({ shiftKey: ev?.shiftKey });
                        }
                    });
                    return action;
                }
                static CreateActionFrankovaniOnLine(content, typ) {
                    var action = new GAction({
                        name: Vyp.Globals.Enums.ActionsName.FrankovaniOnline,
                        icon: Vyp.Icons.ActionEnum.frankovaniOnline,
                        caption: "jres:23900105", //RC 23900105 : Frankovat - online
                        tooltip: "jres:23900105",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        run: function (ev, ctx) {
                            Gordic.Wfl.ListAC.WflListBaseAC.OdznacVsechnyRadky(content);
                            VypListBasePage_1.NoveFrankovani(content);
                        }
                    });
                    return action;
                }
                static CreateActionFrankovaniOffLine(content, typ) {
                    var action = new GAction({
                        name: Vyp.Globals.Enums.ActionsName.FrankovaniOffline,
                        icon: Vyp.Icons.ActionEnum.frankovaniOffline,
                        caption: "jres:23900150", //RC 23900150 : Import dat frankovacího stroje
                        tooltip: "jres:23900150",
                        groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite,
                        run: event => {
                            // this.signModule.signFile({ fileName: "test.pdf", filePath: "D:\\test.pdf", signWithTimeStamp: false }).then((signedConfig) => { ; }, (reason) => { ; })
                            VypListBasePage_1.addFileDoc(content);
                        }
                    });
                    return action;
                }
                static CreateActionPrevzitSFrankovanim(content) {
                    var action = new GAction({
                        name: Vyp.Globals.Enums.ActionsName.PrevzitSFrankovanim,
                        icon: Gordic.Gin.Icons.ActionEnum.prevzit,
                        caption: "jres:23900190", //RC 23900190 : Převzít s ofrankováním
                        tooltip: "jres:23900191", //RC 23900191 : Převzít dle čtečky s ofrankováním
                        run: function (ev, ctx) {
                            Gordic.Wfl.ListAC.WflListBaseAC.OdznacVsechnyRadky(content);
                            Gordic.Wfl.ListAC.WflListBaseAC.ZmenOznaceniVsechRadkuVTempTabulce(content, 0 /* Gin.Interface.TypOznaceniRadkuSeznamu.Neurceno */)
                                .done(function (ret) {
                                VypListBasePage_1.CallDataMatrix(content, 2 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.prevzetiSFrankovanim */, true);
                            })
                                .fail(function (reason) { Gordic.Wfl.ListAC.WflListBaseAC.ResolveFaildAkce(content, reason); });
                        }
                    });
                    return action;
                }
                static CreateActionImportDatEpaPosty(content) {
                    VypListBasePage_1.CreateGetFileFieldEPA(content);
                    var action = new GAction({
                        name: Vyp.Globals.Enums.ActionsName.ImportDatEpaPosty,
                        icon: Gordic.Gin.Icons.ActionEnum.importovat,
                        caption: "jres:23900180", //RC 23900180 : Import dat podacího archu
                        tooltip: "jres:23900180",
                        run: event => {
                            VypListBasePage_1.addFileEPA(content);
                        }
                    });
                    return action;
                }
                static CreateGetFileField(content) {
                    // filefield se nerenderuje, používá se pouze interně
                    // kvuli importu file
                    content._$fileField = $("<div>").gfilefield({
                        fileUploaded: (event, data) => VypListBasePage_1._addFileFrankovani(content, data.fileInfo, data.customData),
                    });
                }
                static CreateGetFileFieldEPA(content) {
                    // filefield se nerenderuje, používá se pouze interně
                    // kvuli importu file
                    content._$fileField = $("<div>").gfilefield({
                        fileUploaded: (event, data) => VypListBasePage_1._addFileEPA(content, data.fileInfo, data.customData),
                    });
                }
                static _addFileFrankovani(content, fileInfo, customData) {
                    let l_data;
                    if (content.VypraveniSettings.pouzivat_soubor_bez_pidu) {
                        l_data = content.mainGrid.ggrid("getSelection");
                        if (!l_data || l_data.length == 0) {
                            content.dialogs.warning("jres:23900156"); //RC 23900156 : Nejsou označeny žádné řádky pro import dat.
                            return;
                        }
                    }
                    else {
                        l_data = content.mainGrid.ggrid("getView").getDataRows(false);
                    }
                    content.call("NactiFileFrankovani", { FileInfo: fileInfo, Data: l_data })
                        .done(function (data) {
                        Gordic.Wfl.ListAC.WflListBaseAC.UpdateData(content, data);
                        //zobrazí chyby
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultData(content);
                        //zobrazi global vysledek - stavajici content.Info se prepise
                        Gordic.Wfl.AC.WflBaseAC.ShowFlashByContentInfo(content);
                        if (content.VypraveniSettings.tridit_dle_souboru) {
                            //content.SortColumnName = "trid_vyp, k_v";
                            var l_view = content.mainGrid.ggrid("getView");
                            l_view.process({ mujSort: new Gordic.Data.SortProcessor("trid_vyp, k_v") });
                        }
                        Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDlePriznaku(content, 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */);
                        if (content.ResultType == 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */) {
                            if (content.model.TypSeznamu == 9 /* Gordic.Wfl.Interface.TypSeznamuZasilek.kPrevzetiDleID */) {
                                Gordic.Wfl.ListAC.WflListBaseAC.SetEnableActionsByData(content);
                                Gordic.Wfl.ListAC.WflListBaseAC.SetActionEnabled(content, Vyp.Globals.Enums.ActionsName.FrankovaniOffline, true);
                            }
                            else {
                                let l_text = content.Info;
                                l_text += Gordic.Gin.Globals.Enums.UsedStrings.newLine + "jres:23900155";
                                content.dialogs.confirm("jres:23900014", l_text).on("yes", (ev, obj) => {
                                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.UlozData(content, content.actions.getActions()[0]);
                                });
                            }
                        }
                        else
                            Gordic.Wfl.AC.WflBaseAC.ResolveInfo(content);
                    })
                        .always(function () {
                        content.endOperation();
                    });
                }
                static _addFileEPA(content, fileInfo, customData) {
                    let l_data = content.mainGrid.ggrid("getView").getDataRows(false);
                    content.call("NactiFileEPA", { FileInfo: fileInfo, Data: l_data })
                        .done(function (data) {
                        Gordic.Wfl.ListAC.WflListBaseAC.UpdateData(content, data);
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultData(content);
                        Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDlePriznaku(content, 2 /* Gordic.Gin.Interface.TypVysledkuOperace.Provedeno */);
                        if (content.ResultType == 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */) {
                            if (content.model.TypSeznamu == 9 /* Gordic.Wfl.Interface.TypSeznamuZasilek.kPrevzetiDleID */) {
                                Gordic.Wfl.ListAC.WflListBaseAC.SetEnableActionsByData(content);
                            }
                            else {
                                let l_text = content.Info;
                                l_text += Gordic.Gin.Globals.Enums.UsedStrings.newLine + "jres:23900155";
                                content.dialogs.confirm("jres:23900014", l_text).on("yes", (ev, obj) => {
                                    Gordic.Wfl.ListAC.WflZasilkyListBaseAC.UlozData(content, content.actions.getActions()[0]);
                                });
                            }
                        }
                        else
                            Gordic.Wfl.AC.WflBaseAC.ResolveInfo(content);
                    })
                        .always(function () {
                        content.endOperation();
                    });
                }
                static addFileDoc(content) {
                    content._$fileField.gfilefield("option", "customData", function () { return { isFavorite: true }; });
                    content._$fileField.gfilefield("instance").inputDiv.trigger("click");
                }
                static addFileEPA(content) {
                    content._$fileField.gfilefield("option", "customData", function () { return { isFavorite: true }; });
                    content._$fileField.gfilefield("instance").inputDiv.trigger("click");
                }
                static CallDataMatrix(content, _typ, prvniVolani, warning) {
                    content.DataMatrixDto = {};
                    content.DataMatrixDto.KrokCislo = 1;
                    content.DataMatrixDto.TypPouziti = _typ;
                    content.DataMatrixDto.PracovatNadSeznamem = true;
                    content.DataMatrixDto.PrvniVolani = prvniVolani;
                    if (warning)
                        content.DataMatrixDto.Warning = warning;
                    switch (_typ) {
                        case 0 /* Wfl.Interface.TypPouzitiDataMatrixCtecky.frankovani */:
                            content.DataMatrixDto.CistIPodaciCislo = content.VypraveniSettings.frankovani_podaci_cislo;
                            break;
                        case 2 /* Wfl.Interface.TypPouzitiDataMatrixCtecky.prevzetiSFrankovanim */:
                            content.DataMatrixDto.CistIPodaciCislo = false;
                            break;
                    }
                    VypListBasePage_1.CallDataMatrixDialog(content);
                }
                static NoveFrankovani(content) {
                    switch (content.VypraveniSettings.typ_frankovani) {
                        case 16 /* Wfl.Interface.TypFrankovacihoStroje.NeopostDataMatrixCtecka */:
                            VypListBasePage_1.CallDataMatrix(content, 0 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.frankovani */, true);
                            break;
                    }
                }
                static CallDataMatrixDialog(content) {
                    Vyp.Dialogs.DataMatrixCteckaCallDlg(content, { DataMatrixDto: content.DataMatrixDto }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        .done(function (retVal) {
                        if (retVal != null) {
                            content.DataMatrixDto = retVal;
                            if (content.DataMatrixDto.id_dorucenky) {
                                switch (content.DataMatrixDto.KrokCislo) {
                                    case 1:
                                        VypListBasePage_1.ZpracujDataMatrix_krok_1(content);
                                        break;
                                    case 2:
                                        VypListBasePage_1.ZpracujDataMatrix_krok_2(content);
                                        break;
                                }
                            }
                        }
                    });
                }
                static ZpracujDataMatrix_krok_1(content) {
                    switch (content.DataMatrixDto.TypPouziti) {
                        case 0 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.frankovani */:
                            var l_pocet = Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDleIDAVratPocet(content, content.DataMatrixDto.id_dorucenky, Gordic.Wfl.Globals.Enums.FieldName.IdZasilky);
                            switch (l_pocet) {
                                case 1:
                                    VypListBasePage_1.ZpracujDataMatrix(content);
                                    break;
                                default:
                                    let l_text = "";
                                    if (l_pocet == 0)
                                        l_text = "jres:23900111"; //RC 23900111 : Zásilka nebyla dohledána.
                                    else
                                        l_text = "jres:23900109"; //RC 23900109 : Identifikace zásilky není jednoznačná.
                                    VypListBasePage_1.CallDataMatrix(content, content.DataMatrixDto.TypPouziti, false, l_text);
                                    break;
                            }
                            break;
                        case 2 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.prevzetiSFrankovanim */:
                            VypListBasePage_1.ZpracujDataMatrix(content);
                            break;
                    }
                }
                static ZpracujDataMatrix_krok_2(content) {
                    switch (content.DataMatrixDto.TypPouziti) {
                        case 0 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.frankovani */:
                            let l_sxs = Gordic.Wfl.ListAC.WflZasilkyListBaseAC.GetSXSRowByIDDorucenky(content, content.DataMatrixDto.id_dorucenky);
                            var l_row = Gordic.Wfl.ListAC.WflListBaseAC.GetRowByID(content, l_sxs);
                            var l_data = l_row.data;
                            if (content.DataMatrixDto.CistIPodaciCislo)
                                l_data.pod_cislo = content.DataMatrixDto.pod_cislo;
                            l_data.poplatek = content.DataMatrixDto.poplatek;
                            l_data.vaha = content.DataMatrixDto.vaha;
                            Gordic.Wfl.ListAC.WflListBaseAC.UpdateRowData(content, l_data);
                            content.NeulozenaData = true;
                            if (content.VypraveniSettings.frankovani_pretridit) {
                                if (content.DataMatrixDto.PrvniVolani)
                                    content.Poradi = 0;
                                Gordic.Wfl.ListAC.WflListBaseAC.SetPoradiRadku(content, l_sxs, content.Poradi);
                                content.Poradi += 1;
                            }
                            VypListBasePage_1.CallDataMatrix(content, content.DataMatrixDto.TypPouziti, false);
                            break;
                        case 2 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.prevzetiSFrankovanim */:
                            VypListBasePage_1.PrevzitOfrankovanouZasilku(content);
                            VypListBasePage_1.CallDataMatrix(content, content.DataMatrixDto.TypPouziti, false);
                            break;
                    }
                }
                static PrevzitOfrankovanouZasilku(content) {
                    Gordic.Gin.Globals.ShowWaitLoadData(content);
                    content.call("PrevzitOfrankovanouZasilku", { Data: content.DataMatrixDto, model: content.model })
                        .done(function (data) {
                        Gordic.Wfl.ListAC.WflListBaseAC.ResolveResultData(content, data, true, 2 /* Gin.Interface.TypVysledkuOperace.Provedeno */);
                        Gordic.Wfl.ListAC.WflListBaseAC.OznacRadkyDlePriznaku(content);
                    })
                        .always(function () { Gordic.Wfl.ListAC.WflListBaseAC.AfterLoadData(content); });
                }
                static ZpracujDataMatrix(content) {
                    switch (content.DataMatrixDto.TypPouziti) {
                        case 0 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.frankovani */:
                            let l_sxs = Gordic.Wfl.ListAC.WflZasilkyListBaseAC.GetSXSRowByIDDorucenky(content, content.DataMatrixDto.id_dorucenky);
                            if (l_sxs) {
                                Gordic.Gin.Globals.ShowFlash(content, "", Gordic.Gin.Globals.Enums.StateEnum.info, content.FlashPanelTimer, "Info");
                                content.DataMatrixDto.sxs = l_sxs;
                            }
                            else {
                                Gordic.Gin.Globals.ShowFlash(content, "ERROR 23920060", Gordic.Gin.Globals.Enums.StateEnum.warning, content.FlashPanelTimer, "Info");
                            }
                            break;
                        case 2 /* Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky.prevzetiSFrankovanim */:
                            //VypListBasePage.PrevzitOfrankovanouZasilku(content);
                            break;
                    }
                    content.DataMatrixDto.KrokCislo = 2;
                    this.CallDataMatrixDialog(content);
                }
            };
            VypListBasePage = VypListBasePage_1 = __decorate([
                Decorators.gcontent
            ], VypListBasePage);
            Lists.VypListBasePage = VypListBasePage;
        })(Lists = Vyp.Lists || (Vyp.Lists = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Vyp;
    (function (Vyp) {
        var VypPrefabs;
        (function (VypPrefabs) {
            function poplatekColumn() {
                return {
                    name: "poplatek",
                    caption: "jres:23900015", //RC 23900015 : Poplatek
                    width: 80,
                    format: "D2"
                };
            }
            VypPrefabs.poplatekColumn = poplatekColumn;
            function vahaColumn() {
                return {
                    name: "vaha",
                    caption: "jres:23900016", //RC 23900016 : Váha
                    width: 80,
                    format: "D3"
                };
            }
            VypPrefabs.vahaColumn = vahaColumn;
            function cenaColumn() {
                return {
                    name: "cena",
                    caption: "jres:23900017", //RC 23900017 : Cena
                    width: 80,
                    format: "D2"
                };
            }
            VypPrefabs.cenaColumn = cenaColumn;
            function TridVypColumn() {
                return {
                    name: "trid_vyp",
                    caption: "xxxx", //RC 23900017 : Cena
                    width: 80
                };
            }
            VypPrefabs.TridVypColumn = TridVypColumn;
            function idDSOdesiltele() {
                return {
                    name: "id_ds_odes",
                    caption: "jres:23900018", //RC 23900018 : ID DS odesílatele
                    width: 100,
                };
            }
            VypPrefabs.idDSOdesiltele = idDSOdesiltele;
            function SekcePredplneniZasilek() {
                return Gordic.Gin.Prefabs.preReturn(new Gordic.Forms
                    .Form({ name: "RedistribucePrefabForm", tabLabel: "jres:23900042" }) //RC 23900042 : Předplnění
                    .addSection()
                    .addRow("jres:23900043" + ", " + "jres:23900044" + ", " + "jres:23900045") //RC 23900046 : Nové pod. číslo
                    //.addRow("jres:23900043" + ", " + "jres:23900044" + ", " + "jres:23900045" + ", " + "jres:23900046") //RC 23900046 : Nové pod. číslo
                    .addField("gstringbox", "w-3", { name: "text_pred" })
                    .addField("gnumberbox", "w-3", { name: "pod_cislo" })
                    .addField("gstringbox", "w-3", { name: "text_za" })
                    // .addField("gcheck", "", { name: "novePodaciCislo" }) 
                    .addRow("jres:23900015" + ", " + "jres:23900016") //RC 23900015 : Poplatek
                    .addField("gnumberbox", "w-3", { name: "poplatek", decimals: 2, minValue: 0, maxValue: 999.9999 })
                    .addField("gnumberbox", "w-3", { name: "vaha", decimals: 4, minValue: 0, maxValue: 99.9999 }));
            }
            VypPrefabs.SekcePredplneniZasilek = SekcePredplneniZasilek;
        })(VypPrefabs = Vyp.VypPrefabs || (Vyp.VypPrefabs = {}));
    })(Vyp = Gordic.Vyp || (Gordic.Vyp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnlwLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHVnlwRGlhbG9ncy50cyIsIkdWeXBHbG9iYWxzLnRzIiwiU3RhcnRQYWdlLnRzIiwiQXBwU2V0dGluZ3MvR1Z5cEJhc2VTZXR0aW5nc0Zvcm0udHMiLCJBcHBTZXR0aW5ncy9HVnlwcmF2ZW5pU2V0dGluZ3NGb3JtLnRzIiwiQXBwU2V0dGluZ3MvVnlwUHJpbnRTZXR0aW5nc0Zvcm0udHMiLCJEbGcvRGF0YU1hdHJpeEN0ZWNrYURsZy50cyIsIkRsZy9FZGl0YWNlUG9sb3preUNlbmlrdURsZy50cyIsIkRsZy9FZGl0YWNlWmFzaWxreURsZy50cyIsIkRsZy9HQ2VuaWtEbGcudHMiLCJEbGcvUHJlZHBsbmVuaVphc2lsa3lEbGcudHMiLCJMaXN0cy9QcmlqZW1aYXNpbGVrRGxlSURMaXN0UGFnZS50cyIsIkxpc3RzL1Byb3ZlZGVuYVZ5cHJhdmVuaVphc2lsZWtMaXN0UGFnZS50cyIsIkxpc3RzL1Byb3ZlZGVuYVZ5cHJhdmVuaVphc2lsZWtPYnNhaExpc3RQYWdlLnRzIiwiTGlzdHMvVnlwcmF2ZW5lWmFzaWxreUxpc3RQYWdlLnRzIiwiTGlzdHMvVnlwcmF2ZW5pWmFzaWxla0xpc3RQYWdlLnRzIiwiTGlzdHMvQmFzZS9WeXBMaXN0QmFzZVBhZ2UudHMiLCJQcmVmYWJzL0dWeXBQcmVmYWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0E4TWY7QUE5TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOE1uQjtJQTlNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxPQUFPLENBOE0zQjtRQTlNb0IsV0FBQSxPQUFPO1lBRXhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFnQix5QkFBeUIsQ0FDckMsYUFBdUIsRUFDdkIsR0FBK0QsRUFDL0QsV0FBNkM7Z0JBRTdDLE1BQU0sT0FBTyxHQUFHO29CQUNaLEVBQUUsRUFBRSx5Q0FBeUM7b0JBQzdDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQy9CLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQzFDLENBQUM7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdFLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDaEYsTUFBTSxZQUFZLEdBQStCLFNBQVMsQ0FBQztnQkFFM0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLCtEQUErRCxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzVKLENBQUM7cUJBQU0sQ0FBQztvQkFDSixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsQ0FBQztZQXZCZSxpQ0FBeUIsNEJBdUJ4QyxDQUFBO1lBRUQsU0FBZ0IsaUJBQWlCLENBQzdCLGFBQXVCLEVBQ3ZCLEdBQStDLEVBQy9DLFdBQTZDO2dCQUc3QyxNQUFNLE9BQU8sR0FBRztvQkFDWixFQUFFLEVBQUUsb0JBQW9CO29CQUN4QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUM5QixDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWhGLE1BQU0sWUFBWSxHQUErQixTQUFTLENBQUM7Z0JBRTNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSwwQ0FBMEMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2SSxDQUFDO3FCQUFNLENBQUM7b0JBQ0osUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLENBQUM7WUF6QmUseUJBQWlCLG9CQXlCaEMsQ0FBQTtZQUVELFNBQWdCLG9CQUFvQixDQUNoQyxhQUF1QixFQUN2QixHQUFrRCxFQUNsRCxXQUE2QztnQkFHN0MsTUFBTSxPQUFPLEdBQUc7b0JBQ1osRUFBRSxFQUFFLHVCQUF1QjtvQkFDM0IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtpQkFDcEMsQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUVoRixNQUFNLFlBQVksR0FBK0IsU0FBUyxDQUFDO2dCQUUzRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsNkNBQTZDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDMUksQ0FBQztxQkFBTSxDQUFDO29CQUNKLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5QixDQUFDO1lBekJlLDRCQUFvQix1QkF5Qm5DLENBQUE7WUFFRCxTQUFnQixjQUFjLENBQzFCLGFBQXVCLEVBQ3ZCLFdBQTZDO2dCQUc3QyxNQUFNLE9BQU8sR0FBRztvQkFDWixFQUFFLEVBQUUsa0JBQWtCO29CQUN0QixHQUFHLDREQUFvRDtpQkFDMUQsQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUVoRixNQUFNLFlBQVksR0FBK0IsU0FBUyxDQUFDO2dCQUUzRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsa0NBQWtDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDL0gsQ0FBQztxQkFBTSxDQUFDO29CQUNKLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5QixDQUFDO1lBeEJlLHNCQUFjLGlCQXdCN0IsQ0FBQTtZQUVELFNBQWdCLGVBQWUsQ0FDM0IsYUFBdUIsRUFDdkIsV0FBNkM7Z0JBRzdDLE1BQU0sT0FBTyxHQUFHO29CQUNaLEVBQUUsRUFBRSxrQkFBa0I7b0JBQ3RCLEdBQUcsbURBQTJDO2lCQUNqRCxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWhGLE1BQU0sWUFBWSxHQUErQixTQUFTLENBQUM7Z0JBRTNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxrQ0FBa0MsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUMvSCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLENBQUM7WUF4QmUsdUJBQWUsa0JBd0I5QixDQUFBO1lBRUQsU0FBZ0IsdUJBQXVCLENBQ25DLGFBQXVCLEVBQ3ZCLEdBQW1ELEVBQ25ELFdBQTZDO2dCQUc3QyxNQUFNLE9BQU8sR0FBRztvQkFDWixFQUFFLEVBQUUsMEJBQTBCO29CQUM5QixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUNsQyxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWhGLE1BQU0sWUFBWSxHQUErQixTQUFTLENBQUM7Z0JBRTNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxnREFBZ0QsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SSxDQUFDO3FCQUFNLENBQUM7b0JBQ0osUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLENBQUM7WUF6QmUsK0JBQXVCLDBCQXlCdEMsQ0FBQTtZQUVEOzs7Ozs7Ozs7O1VBVUY7WUFDRSxTQUFnQix1QkFBdUIsQ0FDbkMsYUFBdUIsRUFDdkIsR0FBc0QsRUFDdEQsV0FBNkM7Z0JBRTdDLE1BQU0sT0FBTyxHQUFHO29CQUNaLEVBQUUsRUFBRSxzQkFBc0I7b0JBQzFCLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVM7aUJBQ3JELENBQUM7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdFLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDaEYsTUFBTSxZQUFZLEdBQStCLFNBQVMsQ0FBQztnQkFFM0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLDRDQUE0QyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3pJLENBQUM7cUJBQU0sQ0FBQztvQkFDSixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsQ0FBQztZQXRCZSwrQkFBdUIsMEJBc0J0QyxDQUFBO1FBRUwsQ0FBQyxFQTlNb0IsT0FBTyxHQUFQLFdBQU8sS0FBUCxXQUFPLFFBOE0zQjtJQUFELENBQUMsRUE5TWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThNbkI7QUFBRCxDQUFDLEVBOU1TLE1BQU0sS0FBTixNQUFNLFFBOE1mO0FDL01ELElBQVUsTUFBTSxDQU9mO0FBUEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBT25CO0lBUGdCLFdBQUEsR0FBRztRQUFDLElBQUEsS0FBSyxDQU96QjtRQVBvQixXQUFBLEtBQUs7WUFFdEIsSUFBWSxVQUlYO1lBSkQsV0FBWSxVQUFVO2dCQUVsQixxREFBdUMsQ0FBQTtnQkFDdkMsMkNBQTZCLENBQUE7WUFDakMsQ0FBQyxFQUpXLFVBQVUsR0FBVixnQkFBVSxLQUFWLGdCQUFVLFFBSXJCO1FBQ0wsQ0FBQyxFQVBvQixLQUFLLEdBQUwsU0FBSyxLQUFMLFNBQUssUUFPekI7SUFBRCxDQUFDLEVBUGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQU9uQjtBQUFELENBQUMsRUFQUyxNQUFNLEtBQU4sTUFBTSxRQU9mO0FBRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd0JuQjtJQXhCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxPQUFPLENBd0IzQjtRQXhCb0IsV0FBQSxPQUFPO1lBQUMsSUFBQSxLQUFLLENBd0JqQztZQXhCNEIsV0FBQSxLQUFLO2dCQUU5QixJQUFZLFdBWVg7Z0JBWkQsV0FBWSxXQUFXO29CQUNuQix1Q0FBd0IsQ0FBQTtvQkFDeEIsbURBQW9DLENBQUE7b0JBQ3BDLHVEQUF3QyxDQUFBO29CQUN4Qyx5REFBMEMsQ0FBQTtvQkFDMUMsNkRBQThDLENBQUE7b0JBQzlDLHlEQUEwQyxDQUFBO29CQUMxQyx5REFBMEMsQ0FBQTtvQkFDMUMsbUVBQW9ELENBQUE7b0JBQ3BELHFFQUFzRCxDQUFBO29CQUN0RCwyQ0FBNEIsQ0FBQTtvQkFDNUIsNkNBQThCLENBQUE7Z0JBQ2xDLENBQUMsRUFaVyxXQUFXLEdBQVgsaUJBQVcsS0FBWCxpQkFBVyxRQVl0QjtnQkFFRCx1RUFBdUU7Z0JBQ3ZFLElBQVkscUJBTVg7Z0JBTkQsV0FBWSxxQkFBcUI7b0JBQzdCLDJFQUFhLENBQUE7b0JBQ2IsMEVBQWEsQ0FBQTtvQkFDYiw4RkFBdUIsQ0FBQTtvQkFDdkIsZ0dBQXdCLENBQUE7b0JBQ3hCLG9IQUFrQyxDQUFBO2dCQUN0QyxDQUFDLEVBTlcscUJBQXFCLEdBQXJCLDJCQUFxQixLQUFyQiwyQkFBcUIsUUFNaEM7WUFDTCxDQUFDLEVBeEI0QixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUF3QmpDO1FBQUQsQ0FBQyxFQXhCb0IsT0FBTyxHQUFQLFdBQU8sS0FBUCxXQUFPLFFBd0IzQjtJQUFELENBQUMsRUF4QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdCbkI7QUFBRCxDQUFDLEVBeEJTLE1BQU0sS0FBTixNQUFNLFFBd0JmO0FDakNELDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0EyRGY7QUEzREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkRuQjtJQTNEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBMkQxQjtRQTNEb0IsV0FBQSxNQUFNO1lBR3ZCLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxPQUFBLFlBQThCO2dCQUE3RDs7b0JBR0ksbUJBQWMsR0FBVSxFQUFFLENBQUM7Z0JBb0QvQixDQUFDO2dCQS9DRyxjQUFjO29CQUVWLGlCQUFpQjtvQkFDakIsUUFBUSxDQUFDO29CQUNULElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFKLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQzFCLElBQUkseUJBQXlCLEdBQUc7NEJBQzVCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzs0QkFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBYSxDQUFDLFFBQVM7NEJBQzVDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWEsQ0FBQyxRQUFTOzRCQUM1QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFhLENBQUMsU0FBVTs0QkFDOUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBYSxDQUFDLFNBQVU7NEJBQzlDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWEsQ0FBQyxXQUFZOzRCQUNsRCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWdCLENBQUM7NEJBQ3RHLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxlQUFnQjt5QkFDeEQsQ0FBQTt3QkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUMzRSxDQUFDO29CQUdELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztnQkFFRCxXQUFXO29CQUVQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDcEIsQ0FBQztnQkFBQSxDQUFDO2dCQUVGLFVBQVU7Z0JBRVYsQ0FBQztnQkFBQSxDQUFDO2dCQUVGLFFBQVE7b0JBRUosSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsVUFBVTtvQkFDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7YUFDSixDQUFBO1lBdkRZLFNBQVM7Z0JBRHJCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsU0FBUyxDQXVEckI7WUF2RFksZ0JBQVMsWUF1RHJCLENBQUE7UUFDTCxDQUFDLEVBM0RvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUEyRDFCO0lBQUQsQ0FBQyxFQTNEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkRuQjtBQUFELENBQUMsRUEzRFMsTUFBTSxLQUFOLE1BQU0sUUEyRGY7QUFBQSxDQUFDO0FDbkVGLDBFQUEwRTtBQUMxRSwyRkFBMkY7QUFDM0YsOEZBQThGO0FBQzlGLDRGQUE0RjtBQUM1Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0FpRWY7QUFqRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUVuQjtJQWpFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBaUUvQjtRQWpFb0IsV0FBQSxXQUFXO1lBQzVCOzs7OztlQUtHO1lBQ1UsK0JBQW1CLEdBQUcsd0NBQXdDLENBQUE7WUFFM0U7Ozs7Ozs7ZUFPRztZQUNILFNBQWdCLGtCQUFrQjtnQkFDOUIsTUFBTSxRQUFRLEdBQW1FLE1BQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQUEsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JJLElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ1gsT0FBTyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7cUJBQU0sQ0FBQztvQkFDSixPQUFPO3dCQUNILDBCQUEwQixFQUFFLEtBQUs7cUJBQ3BDLENBQUM7Z0JBQ04sQ0FBQztZQUNMLENBQUM7WUFUZSw4QkFBa0IscUJBU2pDLENBQUE7WUFFRDs7Ozs7OztlQU9HO1lBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsS0FBd0Q7Z0JBQ3RGLE1BQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQUEsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUZlLDhCQUFrQixxQkFFakMsQ0FBQTtZQUVEOzs7OztlQUtHO1lBQ0gsU0FBZ0IsbUJBQW1CO2dCQUMvQixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztnQkFDdkMsSUFBSSxhQUE2RSxDQUFDO2dCQUVsRixNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUMvQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7d0JBQzFELE1BQU0sRUFBRSxLQUFLO3FCQUNoQjtpQkFDRyxDQUFDLENBQUM7Z0JBRVYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDLDhCQUE4QjtnQkFDL0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxZQUFBLG1CQUFtQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO2dCQUUzTixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMsaURBQWlEO2dCQUNsRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxFQUFFLFlBQUEsbUJBQW1CLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLDRCQUE0QixDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyw0REFBNEQ7Z0JBQ3JQLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFsQmUsK0JBQW1CLHNCQWtCbEMsQ0FBQTtRQUNMLENBQUMsRUFqRW9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQWlFL0I7SUFBRCxDQUFDLEVBakVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpRW5CO0FBQUQsQ0FBQyxFQWpFUyxNQUFNLEtBQU4sTUFBTSxRQWlFZjtBQ3pFRCwwRUFBMEU7QUFDMUUsMkZBQTJGO0FBQzNGLDhGQUE4RjtBQUM5Riw0RkFBNEY7QUFDNUYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFFakIsSUFBVSxNQUFNLENBMk9mO0FBM09ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJPbkI7SUEzT2dCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQTJPL0I7UUEzT29CLFdBQUEsV0FBVztZQUU1QixJQUFLLFVBVUo7WUFWRCxXQUFLLFVBQVU7Z0JBQ1gsMkJBQWEsQ0FBQTtnQkFDYix5QkFBVyxDQUFBO2dCQUNYLGlFQUFtRCxDQUFBO2dCQUNuRCwyREFBNkMsQ0FBQTtnQkFDN0MsdURBQXlDLENBQUE7Z0JBQ3pDLHFGQUF1RSxDQUFBO2dCQUN2RSxtRUFBcUQsQ0FBQTtnQkFDckQsbUVBQXFELENBQUE7Z0JBQ3JELCtEQUFpRCxDQUFBO1lBQ3JELENBQUMsRUFWSSxVQUFVLEtBQVYsVUFBVSxRQVVkO1lBRUQ7Ozs7O2VBS0c7WUFDVSxpQ0FBcUIsR0FBRywwQ0FBMEMsQ0FBQTtZQUUvRTs7Ozs7OztXQU9EO1lBQ0MsU0FBZ0Isb0JBQW9CLENBQUMsT0FBaUI7Z0JBRWxELE1BQU0sUUFBUSxHQUFrRSxPQUFPLENBQUMsY0FBZSxDQUFDLEdBQUcsQ0FBQyxZQUFBLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6SSxJQUFJLFFBQVEsRUFDWixDQUFDO29CQUNHLE9BQU8sUUFBUSxDQUFDO2dCQUNwQixDQUFDO3FCQUVELENBQUM7b0JBQ0csT0FBTzt3QkFDSCxPQUFPLEVBQUUsRUFBRTt3QkFDWCxTQUFTLEVBQUUsRUFBRTt3QkFDYixtQkFBbUIsRUFBRSxJQUFJO3dCQUN6QixRQUFRLEVBQUUsSUFBSTt3QkFDZCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsRUFBRTt3QkFDUixHQUFHLEVBQUUsRUFBRTt3QkFDUCxtQkFBbUIsRUFBRSxJQUFJO3FCQUM1QixDQUFDO2dCQUNOLENBQUM7WUFDTCxDQUFDO1lBcEJlLGdDQUFvQix1QkFvQm5DLENBQUE7WUFFRDs7Ozs7OztlQU9HO1lBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsT0FBaUIsRUFBRSxLQUF3RDtnQkFDNUcsT0FBTyxDQUFDLGNBQWUsQ0FBQyxLQUFLLENBQUMsWUFBQSxxQkFBcUIsRUFBRSxLQUFNLENBQUMsQ0FBQztZQUNqRSxDQUFDO1lBRmUsZ0NBQW9CLHVCQUVuQyxDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFDSCxTQUFnQixxQkFBcUI7Z0JBQ2pDLE1BQU0sUUFBUSxHQUFHLHVCQUF1QixDQUFDO2dCQUN6QyxJQUFJLGFBQTZFLENBQUM7Z0JBRWxGLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQy9CLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDUixLQUFLLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzt3QkFDekQsTUFBTSxFQUFFLEtBQUs7cUJBQ2hCO2lCQUNHLENBQUMsQ0FBQztnQkFFVixvREFBb0Q7Z0JBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQyxnRUFBZ0U7Z0JBQ2pHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsaUNBQWlDLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLDBEQUEwRDtnQkFDL1AsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0RBQW9EO2dCQUVqTyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMsa0VBQWtFO2dCQUNuRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO3FCQUNoRCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFDOUQ7b0JBQ0ksSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHO29CQUNwQixLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEdBQUcsY0FBYzt3QkFDekUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsYUFBYTtvQkFDMUUsTUFBTSxFQUFFLFVBQVUsS0FBSyxFQUFFLEtBQUs7d0JBQzFCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDdkIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUYsU0FBUyxDQUFDLE1BQU0sQ0FBaUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3RHLENBQUM7b0JBQ0wsQ0FBQztpQkFDSixDQUFDLENBQUMsbUJBQW1CO3FCQUVyQixRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDNUQsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLGFBQWE7aUJBQ3ZHLENBQUMsQ0FBQSxDQUFDLG9CQUFvQjtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO2dCQUV0TSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsR0FBRyxtQkFBbUIsRUFBQyxDQUFDLENBQUEsQ0FBQyxpQ0FBaUM7Z0JBRXhPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjtxQkFDekcsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDO3FCQUN4SCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUMsRUFBRSxDQUFDO3FCQUM1SSxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3JILHVEQUF1RDtxQkFDdEQsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDLENBQUMsd0JBQXdCO3FCQUN6RSxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxFQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7cUJBQ3BLLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUVqSyxZQUFZO2dCQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQSwwQkFBMEI7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO29CQUN2RCxJQUFJLEVBQUUsZ0JBQWdCO29CQUN2QiwyRUFBMkU7b0JBQzFFLEtBQUssRUFBRSxVQUFVLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWTt3QkFDekMsUUFBUSxTQUFTLEVBQUUsQ0FBQzs0QkFDaEIsS0FBSyxPQUFPLEVBQUcsb0NBQW9DO2dDQUMvQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO2dDQUN4RSxJQUFJLEtBQUssSUFBSSxJQUFJO29DQUFFLEtBQUssdURBQStDLENBQUM7Z0NBQ3hFLDBEQUEwRDtnQ0FDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQzFCLE9BQU87NEJBQ1gsS0FBSyxTQUFTLEVBQUUscUZBQXFGO2dDQUNqRyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUN0Qyx5SEFBeUg7Z0NBQ3pILElBQUksSUFBSSxJQUFJLElBQUk7b0NBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtnQ0FDN0gsT0FBTzt3QkFDZixDQUFDO3dCQUNELE9BQU8sZ0JBQWdCLENBQUM7b0JBQzVCLENBQUM7b0JBRUQsTUFBTSxFQUFFO3dCQUNBLEVBQUUsS0FBSyxzREFBOEMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQUUscUJBQXFCO3dCQUN0RyxFQUFFLEtBQUssMERBQWlELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUFFLHlDQUF5Qzt3QkFDN0gsRUFBRSxLQUFLLHNFQUE2RCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFBRSx3Q0FBd0M7cUJBQy9JLEVBQUUsTUFBTSxFQUFFLFVBQVUsS0FBSyxFQUFFLEtBQUs7d0JBRzdCLElBQUksMkJBQTJCLEdBQUcsSUFBSSxDQUFDO3dCQUN2QyxJQUFJLDBCQUEwQixHQUFHLElBQUksQ0FBQzt3QkFDdEMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUNmLENBQUM7NEJBQ0csUUFBUSxLQUFLLENBQUMsS0FBSyxFQUNuQixDQUFDO2dDQUNHO29DQUNJLDJCQUEyQixHQUFHLEtBQUssQ0FBQztvQ0FDcEMsTUFBTTtnQ0FDVjtvQ0FDSSwwQkFBMEIsR0FBRyxLQUFLLENBQUM7b0NBQ25DLE1BQU07NEJBQ2QsQ0FBQzt3QkFDTCxDQUFDO3dCQUVELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBRXZDLElBQUksTUFBTSxFQUFFLENBQUM7NEJBQ1QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDOzRCQUMxRyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLDBCQUEwQixDQUFDLENBQUM7NEJBQ3pILE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsMEJBQTBCLENBQUMsQ0FBQzs0QkFDaEgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDOzRCQUVoSCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLDJCQUEyQixDQUFDLENBQUM7NEJBQzdHLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzs0QkFDaEgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO3dCQUNuSCxDQUFDO29CQUNMLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsMENBQTBDO2dCQUN2TyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlDQUFpQyxFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsaUNBQWlDLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtnQkFDcFIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxvREFBb0Q7Z0JBQzdQLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO2dCQUVqUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztnQkFDek8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7Z0JBRTVPLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQSw0Q0FBNEM7cUJBQ3ZFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywyQkFBMkI7cUJBQ25ELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxZQUFBLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxDQUFDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7cUJBQ3RJLE1BQU0sQ0FBRSxlQUFlLENBQUMsQ0FBQywyQkFBMkI7cUJBQ3BELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGtEQUFrRDtxQkFDMUUsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQW9DLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLG9DQUFvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVoTCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRFQUE0RTtxQkFDeEcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLCtDQUErQztxQkFDdkUsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLDZCQUE2QixDQUFDLEVBQUUsQ0FBQztxQkFDNUosTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9DQUFvQztxQkFDNUQsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLFlBQUEscUJBQXFCLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztxQkFDeEksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlFQUFpRTtxQkFDekYsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBRTVJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsWUFBQSxxQkFBcUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsdUJBQXVCLENBQUMsRUFBRyxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLDJDQUEyQztnQkFFN04sU0FBUztnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHNCQUFzQjtxQkFDbEQsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyxjQUFjLEVBQUU7b0JBQ3RCLE1BQU0sRUFBRTt3QkFDSjs0QkFDSSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7Z0NBQ2hCLElBQUksRUFBRSxnQkFBZ0I7Z0NBQ3RCLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO2dDQUM1RCxPQUFPLEVBQUUsZUFBZTtnQ0FDeEIsR0FBRyxFQUFFLFVBQVUsS0FBSyxFQUFFLGFBQWE7b0NBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQ0FDeEcsQ0FBQzs2QkFDSixDQUFDO3lCQUNMO3dCQUNEOzRCQUNJLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQztnQ0FDaEIsSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7Z0NBQzdELE9BQU8sRUFBRSxlQUFlO2dDQUN4QixHQUFHLEVBQUUsVUFBVSxLQUFLLEVBQUUsYUFBYTtvQ0FDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dDQUN6RyxDQUFDOzZCQUNKLENBQUM7eUJBQ0w7cUJBQ0o7aUJBQ0osQ0FBQyxDQUFBO2dCQUVOLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFwS2UsaUNBQXFCLHdCQW9LcEMsQ0FBQTtRQUNMLENBQUMsRUEzT29CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQTJPL0I7SUFBRCxDQUFDLEVBM09nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyT25CO0FBQUQsQ0FBQyxFQTNPUyxNQUFNLEtBQU4sTUFBTSxRQTJPZjtBQ2xQRCxJQUFVLE1BQU0sQ0FpQlg7QUFqQkwsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUJmO0lBakJZLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWlCM0I7UUFqQmdCLFdBQUEsV0FBVztZQUU1QixTQUFnQixvQkFBb0I7Z0JBRWhDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUs7cUJBRXRCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBUyxDQUFDLENBQUMsb0JBQW9CO3FCQUN6SCxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxlQUFlLEVBQUUsbUVBQW1FO29CQUMzRixLQUFLLEVBQUUsd0RBQXdEO29CQUMvRCxZQUFZLEVBQUUsSUFBSTtpQkFDckIsQ0FBQyxDQUNEO2dCQUVMLE9BQU8sSUFBSSxDQUFDO1lBQ1osQ0FBQztZQWRXLGdDQUFvQix1QkFjL0IsQ0FBQTtRQUNMLENBQUMsRUFqQmdCLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQWlCM0I7SUFBRCxDQUFDLEVBakJZLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlCZjtBQUFELENBQUMsRUFqQkssTUFBTSxLQUFOLE1BQU0sUUFpQlg7QUNsQkwsSUFBVSxNQUFNLENBd0xmO0FBeExELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdMbkI7SUF4TGdCLFdBQUEsR0FBRztRQUFDLElBQUEsS0FBSyxDQXdMekI7UUF4TG9CLFdBQUEsS0FBSztZQUV0QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFBO1lBRy9CLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUE4QjtnQkFNbkUsY0FBYztvQkFFVixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsVUFBVTtvQkFFTixNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUV2RixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxtREFBdUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEtBQUssRUFBRSxLQUFLLElBQUksSUFBSSxLQUFLLEVBQUUsS0FBSzs0QkFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUMvTCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsdUJBQXVCO3lCQUNuRCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxtRUFBK0MsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtvQkFDaEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQ0FBb0M7eUJBQ2hFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLHFFQUFnRCxFQUFHLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUVuRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSw2REFBNEMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUkscURBQXdDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBaUIsb0JBQW9CO29CQUMvTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO3dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLCtEQUE2QyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO29CQUVoTSxJQUFJLENBQUMsU0FBUyxDQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDeEI7d0JBQ0ksSUFBSSxFQUFFLGFBQWE7d0JBQ25CLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixFQUNEO3dCQUNJLEtBQUssRUFBRSxlQUFlLEVBQUUsd0JBQXdCO3FCQUNuRCxFQUNEO3dCQUNJLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRO3FCQUN2RixDQUFDLENBQUMsQ0FBQztvQkFFWixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUV0RyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUN0QixDQUFDO3dCQUNHLE9BQUEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQztvQkFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsUUFBUTtvQkFFSixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQyxJQUFJLFFBQVEsRUFDWixDQUFDO3dCQUNHLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDakIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUMzQixLQUFLLENBQUM7Z0NBQ0YsT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLDRDQUE0QztnQ0FDdkUsTUFBTTs0QkFDVixLQUFLLENBQUM7Z0NBQ0YsT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHVDQUF1QztnQ0FDbEUsTUFBTTs0QkFDVixLQUFLLENBQUM7Z0NBQ0YsT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLDRCQUE0QjtnQ0FDdkQsTUFBTTs0QkFDVixRQUFRO3dCQUNaLENBQUM7d0JBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxPQUFPO29CQUVILE9BQUEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCxXQUFXO29CQUVQLFFBQVEsQ0FBQztvQkFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNsQixDQUFDO3dCQUNHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDOzRCQUVqQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0NBQzNCLEtBQUssQ0FBQztvQ0FDRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQ0FDMUIsTUFBTTtnQ0FDVixLQUFLLENBQUM7b0NBQ0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0NBQ3pCLE1BQU07Z0NBQ1YsS0FBSyxDQUFDO29DQUNGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29DQUMxQixNQUFNOzRCQUNkLENBQUM7d0JBQ0wsQ0FBQzs2QkFFRCxDQUFDOzRCQUNHLE1BQU07d0JBQ1YsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsa0JBQWtCO29CQUVkLFFBQVEsQ0FBQztvQkFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzt3QkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtvQkFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBRUQsT0FBTztvQkFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUQsaUJBQWlCO29CQUViLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQ2xCLENBQUM7d0JBQ0csSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUNyQyxDQUFDOzRCQUNHLE9BQUEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDOzRCQUN6RCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3BCLENBQUM7NkJBRUQsQ0FBQzs0QkFDRyxPQUFBLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQStCLG1CQUFtQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQ0FDaEYsSUFBSSxDQUFDLFVBQVUsS0FBSztnQ0FDakIsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQ0FDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQ0FDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQy9ELENBQUM7d0NBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dDQUN6QixtRUFBbUU7d0NBQ25FLDhEQUE4RDt3Q0FDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO3dDQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0NBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29DQUN0QixDQUFDOzt3Q0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDbEMsQ0FBQzs0QkFDTCxDQUFDLENBQUM7aUNBQ0QsSUFBSSxDQUFDLFVBQVUsTUFBTTtnQ0FFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUVELGtCQUFrQjtvQkFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBRUQsVUFBVTtvQkFFTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFFRCxTQUFTO29CQUVMLElBQUksSUFBSSxDQUFDLEtBQUssRUFDZCxDQUFDO3dCQUNHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JCLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFsTFksbUJBQW1CO2dCQUQvQixRQUFRO2VBQ0ksbUJBQW1CLENBa0wvQjtZQWxMWSx5QkFBbUIsc0JBa0wvQixDQUFBO1FBQ0wsQ0FBQyxFQXhMb0IsS0FBSyxHQUFMLFNBQUssS0FBTCxTQUFLLFFBd0x6QjtJQUFELENBQUMsRUF4TGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdMbkI7QUFBRCxDQUFDLEVBeExTLE1BQU0sS0FBTixNQUFNLFFBd0xmO0FDeExELElBQVUsTUFBTSxDQXVEZjtBQXZERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1RG5CO0lBdkRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLEdBQUcsQ0F1RHZCO1FBdkRvQixXQUFBLEdBQUc7WUFFcEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQTtZQUcvQixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLE9BQUEsWUFBWTtnQkFLckQsY0FBYztvQkFFVixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDckI7NEJBQ0ksWUFBWSxHQUFHLGVBQWUsQ0FBQzs0QkFDL0IsTUFBTTt3QkFDVjs0QkFDSSxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsNEJBQTRCOzRCQUM1RCxNQUFNO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzt5QkFDcEIsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUU1RixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBRzt5QkFDakgsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVySCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9CQUFvQjt5QkFDNUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUV2RixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9FLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN0RyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFFRCxPQUFPO29CQUVILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUNwQixDQUFDO3dCQUNHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQUUsT0FBTzt3QkFDL0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLElBQUksQ0FBVSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOzZCQUNoRCxJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDOzZCQUNELE1BQU0sQ0FBQzs0QkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFqRFksdUJBQXVCO2dCQURuQyxRQUFRO2VBQ0ksdUJBQXVCLENBaURuQztZQWpEWSwyQkFBdUIsMEJBaURuQyxDQUFBO1FBQ0wsQ0FBQyxFQXZEb0IsR0FBRyxHQUFILE9BQUcsS0FBSCxPQUFHLFFBdUR2QjtJQUFELENBQUMsRUF2RGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVEbkI7QUFBRCxDQUFDLEVBdkRTLE1BQU0sS0FBTixNQUFNLFFBdURmO0FDdkRELENBQUM7QUFBQyxJQUFVLE1BQU0sQ0FrQ2pCO0FBbENDLFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtDckI7SUFsQ2tCLFdBQUEsR0FBRztRQUFDLElBQUEsR0FBRyxDQWtDekI7UUFsQ3NCLFdBQUEsR0FBRztZQUV0QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFBO1lBRy9CLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQUsvQyxjQUFjO29CQUVWLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3hGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2SCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO29CQUNoSixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUM5SixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQWlCLG9CQUFvQjtvQkFDNUwsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFpQixvQkFBb0I7b0JBRTVMLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFHLENBQUM7Z0JBRUQsT0FBTztvQkFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQ3BCLENBQUM7d0JBQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs0QkFBRSxPQUFPO3dCQUMvQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTVCWSxpQkFBaUI7Z0JBRDdCLFFBQVE7ZUFDSSxpQkFBaUIsQ0E0QjdCO1lBNUJZLHFCQUFpQixvQkE0QjdCLENBQUE7UUFDTCxDQUFDLEVBbENzQixHQUFHLEdBQUgsT0FBRyxLQUFILE9BQUcsUUFrQ3pCO0lBQUQsQ0FBQyxFQWxDa0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa0NyQjtBQUFELENBQUMsRUFsQ1csTUFBTSxLQUFOLE1BQU0sUUFrQ2pCO0FDbENELElBQVUsTUFBTSxDQXlKZjtBQXpKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5Sm5CO0lBekpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLEtBQUssQ0F5SnpCO1FBekpvQixXQUFBLEtBQUs7WUFHdEIsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLE9BQUEsWUFBc0M7Z0JBT2pFLGNBQWM7b0JBRVYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsK0RBQStEO29CQUUvRCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUN2QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUc7d0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLDZDQUE2Qzt3QkFDN0UscUJBQXFCO3dCQUNyQixnQ0FBZ0M7d0JBQ2hDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTt3QkFDckMsbUJBQW1CO3dCQUNuQix3QkFBd0IsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSTtxQkFDL0UsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFDNUUsQ0FBQztnQkFFRCxVQUFVO29CQUVOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCxnQkFBZ0I7b0JBRVosTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3lCQUM5QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxDQUFDO3lCQUN4RCxVQUFVLEVBQUUsQ0FBQTtvQkFDakIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQkFBb0I7eUJBQ2xELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFBLENBQUMsb0JBQW9CO29CQUUxSSx1RkFBdUY7b0JBQ3ZGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxVQUFVO29CQUNOLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUV6RCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUNyQjs0QkFDSSxZQUFZLEdBQUcsZUFBZSxDQUFDOzRCQUMvQixNQUFNO3dCQUNWOzRCQUNJLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyw0QkFBNEI7NEJBQzVELE1BQU07b0JBQ2QsQ0FBQztvQkFFRCxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUUsK0JBQStCO29CQUN2RyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUUsdUJBQXVCO29CQUVuRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ2pELENBQUM7d0JBQ0csRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQy9HLENBQUM7b0JBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQStDLENBQUMsQ0FBQyxxQ0FBcUM7NEJBRWpILElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3ZCLENBQUM7Z0NBQ0csSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxFQUM5QyxDQUFDO29DQUNHLElBQUksS0FBSyxHQUE4QyxFQUFFLENBQUE7b0NBQ3pELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQWMsQ0FBQztvQ0FDaEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQy9ELEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQ0FDdEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQTtvQ0FDckMsSUFBSSxNQUFNLElBQUksU0FBUyxFQUN2QixDQUFDO3dDQUNHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMscUVBQXFFO29DQUMvRyxDQUFDO3lDQUVELENBQUM7d0NBQ0csS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDO3dDQUM1QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dDQUM3QixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dDQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs2Q0FDL0csSUFBSSxDQUFDLFVBQVUsTUFBTTs0Q0FDbEIsUUFBUSxDQUFDOzRDQUNULElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQ3pCLENBQUM7Z0RBQ0csT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dEQUMvRCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0RBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dEQUMxQix5Q0FBeUM7NENBQzdDLENBQUM7d0NBQ0wsQ0FBQyxDQUFDLENBQUM7b0NBQ1gsQ0FBQztnQ0FDTCxDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztvQkFDMUMsSUFBSSxJQUFJLENBQUMsUUFBUTt3QkFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMxQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBRUQsT0FBTztvQkFFSCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUUsb0RBQW9EO3dCQUNuSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7NEJBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckcsQ0FBQztnQkFDTCxDQUFDO2dCQUVELFFBQVEsQ0FBQyxLQUF5QztvQkFFOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM3QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUN2QixDQUFDO3dCQUNHLElBQUksQ0FBQyxJQUFJLENBQTRDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDOzZCQUNuRixJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUVoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7d0JBQ2xCLENBQUMsQ0FBQzs2QkFDRCxNQUFNLENBQUM7NEJBQ0osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztvQkFFWCxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBckpZLFNBQVM7Z0JBRHJCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsU0FBUyxDQXFKckI7WUFySlksZUFBUyxZQXFKckIsQ0FBQTtRQUNMLENBQUMsRUF6Sm9CLEtBQUssR0FBTCxTQUFLLEtBQUwsU0FBSyxRQXlKekI7SUFBRCxDQUFDLEVBekpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5Sm5CO0FBQUQsQ0FBQyxFQXpKUyxNQUFNLEtBQU4sTUFBTSxRQXlKZjtBQ3pKRCxJQUFVLE1BQU0sQ0E0QmY7QUE1QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEJuQjtJQTVCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxHQUFHLENBNEJ2QjtRQTVCb0IsV0FBQSxHQUFHO1lBRXBCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUE7WUFHL0IsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBS2xELGNBQWM7b0JBRVYsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDeEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFBLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFHLENBQUM7Z0JBRUQsT0FBTztvQkFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQ3BCLENBQUM7d0JBQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs0QkFBRSxPQUFPO3dCQUMvQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQXRCWSxvQkFBb0I7Z0JBRGhDLFFBQVE7ZUFDSSxvQkFBb0IsQ0FzQmhDO1lBdEJZLHdCQUFvQix1QkFzQmhDLENBQUE7UUFDTCxDQUFDLEVBNUJvQixHQUFHLEdBQUgsT0FBRyxLQUFILE9BQUcsUUE0QnZCO0lBQUQsQ0FBQyxFQTVCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNEJuQjtBQUFELENBQUMsRUE1QlMsTUFBTSxLQUFOLE1BQU0sUUE0QmY7QUM1QkQsSUFBVSxNQUFNLENBa1JmO0FBbFJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtSbkI7SUFsUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsS0FBSyxDQWtSekI7UUFsUm9CLFdBQUEsS0FBSztZQUV0QixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLE9BQUEsWUFBNkI7Z0JBSXpFLGNBQWM7b0JBRVYsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRyxNQUFBLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUMsTUFBQSxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRW5ELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUNuRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFpQjtvQkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFFcEIsa0JBQWtCO29CQUNsQixzQ0FBc0M7Z0JBQzFDLENBQUM7Z0JBRUQsaUJBQWlCO29CQUViLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO3dCQUNqQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBRTdHLElBQUksR0FBRyxFQUFFLEtBQUssRUFDZCxDQUFDO2dDQUNHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUM7NEJBQzlDLENBQUM7d0JBQ0wsQ0FBQztxQkFBRSxDQUFHLENBQUMsQ0FBQyw4QkFBOEI7b0JBQzFDLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELFlBQVk7b0JBRVIsT0FBTztvQkFDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLG1FQUEyRCxFQUFFLEVBQUUsT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7eUJBQ3hKLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBRWhCLE9BQUEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLElBQUksSUFBSSxFQUNSLENBQUM7NEJBQ0csSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN2QyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFBO2dCQUNWLENBQUM7Z0JBRUQsdUJBQXVCLENBQUMsSUFBMkM7b0JBRS9ELDZCQUE2QjtvQkFDN0IsR0FBRztvQkFDSCxrRUFBa0U7b0JBQ2xFLHdDQUF3QztvQkFDeEMsZ0JBQWdCO29CQUNoQix5REFBeUQ7b0JBQ3pELHdDQUF3QztvQkFDeEMsR0FBRztvQkFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRUQsa0JBQWtCLENBQUMsSUFBMkM7b0JBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLElBQUksQ0FBVyxvQkFBb0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO3lCQUM5SSxJQUFJLENBQUMsVUFBVSxHQUFHO3dCQUNmLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLHNEQUE4QyxFQUFFLENBQUM7NEJBQ3ZFLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO29DQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUMzQixDQUFDO3FDQUNJLENBQUM7b0NBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQ0FDekMsQ0FBQzs0QkFDTCxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsMENBQTBDO2dDQUMxQyx5Q0FBeUM7Z0NBQ3pDLEdBQUc7Z0NBQ0gsK0JBQStCO2dDQUMvQiwrREFBK0Q7Z0NBQy9ELEdBQUc7NEJBQ1AsQ0FBQzt3QkFDTCxDQUFDOzZCQUNJLENBQUM7NEJBQ0YsT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsVUFBVSxNQUFNO3dCQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQscUVBQXFFO2dCQUNyRSxzQkFBc0I7Z0JBQ3RCLDhHQUE4RztnQkFFOUcsZ0NBQWdDO2dCQUNoQyxzQkFBc0I7Z0JBQ3RCLGVBQWU7Z0JBR2Ysa0NBQWtDO2dCQUNsQyxnQ0FBZ0M7Z0JBQ2hDLDZGQUE2RjtnQkFFN0YsZUFBZTtnQkFDZixZQUFZO2dCQUNaLCtCQUErQjtnQkFDL0Isa0NBQWtDO2dCQUNsQyxhQUFhO2dCQUNiLEdBQUc7Z0JBRUgsWUFBWSxDQUFDLEdBQVc7b0JBRXBCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSx1REFBK0MsRUFBRSxDQUFDO3lCQUN6RyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDNUMsSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsbUJBQW1CLENBQUMsR0FBYSxFQUFFLE9BQWdCO29CQUUvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQzt5QkFDN0IsSUFBSSxDQUFDLFVBQVUsTUFBTTt3QkFDbEIsSUFBSSxNQUFNLEVBQUUsQ0FBQzs0QkFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0NBQzVCLElBQUksUUFBUSxHQUEwQixFQUFFLENBQUM7Z0NBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0NBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3ZELENBQUM7Z0NBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDN0I7b0NBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUVoQix5RUFBeUU7b0NBQ3pFLG9FQUFvRTtvQ0FDcEUsdUJBQXVCO2dDQUMzQixDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3dCQUNMLENBQUM7OzRCQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ2hELENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsWUFBWSxDQUFDLEdBQWE7b0JBRXRCLGtDQUFrQztvQkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQTBCLEVBQUUsQ0FBQztvQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ25DLENBQUM7d0JBQ0csUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQztvQkFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM3QixVQUFVLEVBQUU7d0JBRVIsSUFBSSxFQUFFLEVBQ04sQ0FBQzs0QkFDRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUN4QyxDQUFDO3dCQUNELHlFQUF5RTt3QkFDekUsb0VBQW9FO3dCQUNwRSx1QkFBdUI7b0JBQzNCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQscUJBQXFCLENBQUMsR0FBVztvQkFFN0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLG9EQUE0QyxFQUFFLENBQUM7eUJBQ3RHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUM1QyxJQUFJLENBQUMsVUFBVSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV0RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxzQkFBc0IsQ0FBQyxHQUFXO29CQUM5QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsdURBQStDLEVBQUUsQ0FBQzt5QkFDekcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7eUJBQzVDLElBQUksQ0FBQyxVQUFVLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELGVBQWUsQ0FBQyxHQUFhLEVBQUUsT0FBZ0I7b0JBRTNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxJQUFJLE9BQU8sRUFDWCxDQUFDO3dCQUNHLElBQUksQ0FBQyxJQUFJLENBQVUsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NkJBQ2hELElBQUksQ0FBQyxVQUFVLEVBQUU7NEJBRWQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQyxVQUFVLE1BQU07NEJBQ2xCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDbkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQzt5QkFFRCxDQUFDO3dCQUNHLElBQUksQ0FBQyxJQUFJLENBQVcsb0JBQW9CLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7NkJBQ2xELElBQUksQ0FBQyxjQUFjLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQzNDLElBQUksQ0FBQyxVQUFVLE1BQU07NEJBQ2xCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDbkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxRQUFRO29CQUVKLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQXlDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt5QkFDekssSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFFaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFFM0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hFLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBRUosTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM5RyxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVELGtCQUFrQjtvQkFFZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU07d0JBQ3hDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTTt3QkFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7d0JBQ2hELE9BQU8sRUFBRSxlQUFlO3dCQUN4QixTQUFTLEVBQUUsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUI7d0JBQ25FLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3hCLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVELFVBQVU7b0JBRU4sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQixDQUFDO2FBQ0osQ0FBQTtZQS9RWSwwQkFBMEI7Z0JBRHRDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsMEJBQTBCLENBK1F0QztZQS9RWSxnQ0FBMEIsNkJBK1F0QyxDQUFBO1FBQ0wsQ0FBQyxFQWxSb0IsS0FBSyxHQUFMLFNBQUssS0FBTCxTQUFLLFFBa1J6QjtJQUFELENBQUMsRUFsUmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtSbkI7QUFBRCxDQUFDLEVBbFJTLE1BQU0sS0FBTixNQUFNLFFBa1JmO0FDbFJELElBQVUsTUFBTSxDQXNIZjtBQXRIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzSG5CO0lBdEhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLEtBQUssQ0FzSHpCO1FBdEhvQixXQUFBLEtBQUs7WUFHdEIsSUFBYSxpQ0FBaUMsR0FBOUMsTUFBYSxpQ0FBa0MsU0FBUSxPQUFBLFlBQXNDO2dCQUE3Rjs7b0JBdURJLGdCQUFXLEdBQUcsT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsT0FBd0QsRUFBRSxHQUE4RDt3QkFDNUosSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUFDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxDQUFDO29CQUN0TixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBeURaLENBQUM7Z0JBOUdHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEQsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTVDLGlDQUFpQztvQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUN2QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUc7d0JBRXpDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLDZDQUE2Qzt3QkFDOUUscUJBQXFCO3dCQUNyQixnQ0FBZ0M7d0JBQ2hDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTt3QkFDckMsbUJBQW1CO3dCQUNuQixTQUFTLEVBQUUsS0FBSyxFQUE0QixxQkFBcUI7d0JBQ2pFLG9CQUFvQixFQUFFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO3dCQUNoSCxtQkFBbUIsRUFBRSxrQkFBa0I7d0JBQ3ZDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO3FCQUMvRSxDQUFDLENBQUE7b0JBRU4sSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHO3dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQzdELENBQUM7d0JBRUQsQ0FBQzt3QkFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFLENBQUM7NEJBQzVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQ3hDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FDbkUsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29DQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUMvQyxDQUFDO3FDQUFNLENBQUM7b0NBQ0osT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dDQUN4RCxDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUE7Z0JBQzFGLENBQUM7Z0JBRUQsZUFBZTtvQkFFWCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQywrREFBK0QsRUFBRSxFQUFFLEdBQUcsRUFBRSx3Q0FBd0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDNU4sQ0FBQztnQkFNRCxVQUFVO29CQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN6RCxFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUNsRSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztvQkFDaEUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMsaUNBQWlDO29CQUNySCxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMscUJBQXFCO29CQUNoRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMsMkJBQTJCO29CQUM3RyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQyxzQ0FBc0M7b0JBQy9ILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN0QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBRUQsUUFBUSxDQUFDLEtBQTBDO29CQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsc0JBQXNCO29CQUN0QixJQUFJLENBQUMsSUFBSSxDQUE4RCxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7eUJBQy9GLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4RCxDQUFDLENBQUM7eUJBQ0QsTUFBTSxDQUFDO3dCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUNQLGdDQUFnQztnQkFDeEMsQ0FBQztnQkFFRCxVQUFVO29CQUVOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUVELGlCQUFpQjtvQkFFYixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLHdEQUF3RCxFQUFFLENBQUMsQ0FBQyxDQUFFLCtCQUErQjtvQkFFek0sVUFBVSxDQUFDLFVBQVUsRUFBRTt5QkFDbEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLCtCQUErQjt5QkFDM0YsUUFBUSxDQUFDLGVBQWUsRUFBRTt3QkFDdkIsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsbUJBQW1CLEVBQUUsS0FBSzt3QkFDMUIsZ0RBQWdEO3dCQUNoRCxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7d0JBQy9CLFdBQVcsRUFBRTs0QkFDVCxTQUFTLEVBQUUsRUFBRTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO3FCQUNsQyxDQUFDLENBQUM7b0JBRVAsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7b0JBRTNKLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsQ0FBQzthQUNKLENBQUE7WUFsSFksaUNBQWlDO2dCQUQ3QyxVQUFVLENBQUMsUUFBUTtlQUNQLGlDQUFpQyxDQWtIN0M7WUFsSFksdUNBQWlDLG9DQWtIN0MsQ0FBQTtRQUNMLENBQUMsRUF0SG9CLEtBQUssR0FBTCxTQUFLLEtBQUwsU0FBSyxRQXNIekI7SUFBRCxDQUFDLEVBdEhnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzSG5CO0FBQUQsQ0FBQyxFQXRIUyxNQUFNLEtBQU4sTUFBTSxRQXNIZjtBQ3RIRCxJQUFVLE1BQU0sQ0FrRWY7QUFsRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa0VuQjtJQWxFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxLQUFLLENBa0V6QjtRQWxFb0IsV0FBQSxLQUFLO1lBR3RCLElBQWEsc0NBQXNDLEdBQW5ELE1BQWEsc0NBQXVDLFNBQVEsT0FBQSxZQUE2QjtnQkFNckYsY0FBYztvQkFFVixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0MsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsTUFBQSxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlDLDJHQUEyRztvQkFDM0csK0VBQStFO29CQUMvRSxnREFBZ0Q7b0JBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQUEsZUFBZSxDQUFDLGdDQUFnQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFBLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDOUUsTUFBQSxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBQSxlQUFlLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFOUUsTUFBQSxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBQSxlQUFlLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDdkYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO29CQUNsRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuRCxLQUFLLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsUUFBUTtvQkFFSixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQ2hCLENBQUM7d0JBQ0csSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNoQixPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQXlDLGNBQWMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NkJBQzVGLElBQUksQ0FBQyxVQUFVLElBQUk7NEJBQ2hCLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0NBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDbkIsQ0FBQzt3QkFDTCxDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDOzRCQUNKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDTCxDQUFDO2dCQUVELE9BQU87b0JBRUgsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUNiLENBQUM7d0JBQ0csSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBRSxvREFBb0Q7d0JBQ2xJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDekMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELFVBQVU7b0JBRU4sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQixDQUFDO2FBQ0osQ0FBQTtZQTlEWSxzQ0FBc0M7Z0JBRGxELFVBQVUsQ0FBQyxRQUFRO2VBQ1Asc0NBQXNDLENBOERsRDtZQTlEWSw0Q0FBc0MseUNBOERsRCxDQUFBO1FBQ0wsQ0FBQyxFQWxFb0IsS0FBSyxHQUFMLFNBQUssS0FBTCxTQUFLLFFBa0V6QjtJQUFELENBQUMsRUFsRWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtFbkI7QUFBRCxDQUFDLEVBbEVTLE1BQU0sS0FBTixNQUFNLFFBa0VmO0FDbEVELElBQVUsTUFBTSxDQXFCZjtBQXJCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxQm5CO0lBckJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLEtBQUssQ0FxQnpCO1FBckJvQixXQUFBLEtBQUs7WUFHdEIsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLFlBQTZCO2dCQUV2RSxjQUFjO29CQUVWLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFBLGVBQWUsQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN6RixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQUEsZUFBZSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzVFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBQSxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDN0UsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsVUFBVTtvQkFFTixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7YUFDSixDQUFBO1lBakJZLHdCQUF3QjtnQkFEcEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCx3QkFBd0IsQ0FpQnBDO1lBakJZLDhCQUF3QiwyQkFpQnBDLENBQUE7UUFDTCxDQUFDLEVBckJvQixLQUFLLEdBQUwsU0FBSyxLQUFMLFNBQUssUUFxQnpCO0lBQUQsQ0FBQyxFQXJCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcUJuQjtBQUFELENBQUMsRUFyQlMsTUFBTSxLQUFOLE1BQU0sUUFxQmY7QUNyQkQsSUFBVSxNQUFNLENBdytCZjtBQXgrQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdytCbkI7SUF4K0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLEtBQUssQ0F3K0J6QjtRQXgrQm9CLFdBQUEsS0FBSztZQUV0QixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLE9BQUEsWUFBNkI7Z0JBQTNFOztvQkFNSSxlQUFVLEdBQVksS0FBSyxDQUFDO2dCQSs5QmhDLENBQUM7Z0JBMzlCRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFDMUMsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxJQUFJLENBQUMsYUFBYSxzREFBNEMsRUFDbEUsQ0FBQzt3QkFDRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RCxJQUFJLElBQUksQ0FBQyxXQUFXOzRCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDMUgsQ0FBQztvQkFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLHFEQUEyQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDO3dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUM7b0JBRWxLLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixNQUFBLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBQSxlQUFlLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2xGLENBQUM7b0JBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSw0Q0FBbUMsRUFDekQsQ0FBQzt3QkFDRyxNQUFBLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMseUJBQXlCOzRCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQUEsZUFBZSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzFJLENBQUM7b0JBRUQsTUFBQSxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBQSxlQUFlLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDdkYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxLQUFLLEVBQUUsR0FBRzt3QkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLDZDQUE2Qzt3QkFDN0UsY0FBYyxFQUFFLGNBQWMsQ0FBQyxNQUFNO3dCQUNyQyxtQkFBbUI7d0JBQ25CLFNBQVMsRUFBRSxLQUFLLEVBQTRCLHFCQUFxQjt3QkFDakUsb0JBQW9CLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ2hILG1CQUFtQixFQUFFLGtCQUFrQjt3QkFDdkMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUk7cUJBQy9FLENBQUMsQ0FBQTtvQkFFTixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtvQkFFaEcsVUFBVTtvQkFDVixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQkFDbkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0SCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEksS0FBSyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsZ0JBQWdCO29CQUNaLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsOERBQThELEVBQUUsQ0FBQyxDQUFBLENBQUMsK0JBQStCO29CQUM3TSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7b0JBQ2pMLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxpQkFBaUI7b0JBQ2IsT0FBTztvQkFDUCxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN2RixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksSUFBSSxDQUFDLGFBQWEsNENBQW1DLEVBQUUsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQzs2QkFDaEQsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSw0Q0FBNEMsRUFBRSxDQUFDLENBQUMsb0JBQW9COzZCQUN6SixRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQSxDQUFDLG9CQUFvQjtvQkFDOUksQ0FBQztvQkFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLHVEQUE4QyxFQUNwRSxDQUFDO3dCQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLG1DQUFtQyxFQUFFLENBQUUsQ0FBQSxDQUFDLGlDQUFpQztvQkFDL0wsQ0FBQztvQkFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLDRDQUFtQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDM0YsQ0FBQzt3QkFDRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxrQ0FBa0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsMEJBQTBCO29CQUM5UCxDQUFDO29CQUVELFFBQVEsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUN6Qiw4Q0FBcUM7d0JBQ3JDLHdEQUE4Qzt3QkFDOUMsNkNBQW1DO3dCQUNuQzs0QkFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0VBQWtFOzRCQUN2TSxNQUFNO29CQUNkLENBQUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWTt3QkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUEsVUFBVSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztvQkFDM0UsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsaUJBQWlCO29CQUNiLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsUUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3pCLDhDQUFxQzt3QkFDckMseURBQWdEO3dCQUNoRDs0QkFDSSxLQUFLLEdBQUcsSUFBSSxDQUFDOzRCQUNiLE1BQU07b0JBQ2QsQ0FBQztvQkFDRCxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQztnQkFFRCxRQUFRLENBQUMsS0FBNkMsRUFBRSxnQkFBMEI7b0JBQzlFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUU3QyxJQUFJLENBQUMsSUFBSSxDQUF5QyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3lCQUN2SCxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUVoQixJQUFJLGdCQUFnQjs0QkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUN2RSxDQUFDOzRCQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBMEMsQ0FBQyxDQUFBOzRCQUNyRyxDQUFDO3dCQUNMLENBQUM7d0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxxREFBNkMsQ0FBQzt3QkFDaEgsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsK0JBQStCLEVBQzNHLENBQUM7NEJBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoRSxDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsY0FBYyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLENBQUM7Z0JBRUQsVUFBVTtvQkFFTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRUQsV0FBVztvQkFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsb0JBQW9CO29CQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRO3dCQUNuRCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVE7d0JBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRO3dCQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7d0JBQzNCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFFckYsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7NEJBQ2hELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDOzRCQUM3RCxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0NBQzFCLElBQUksQ0FBQyxnQkFBZ0IsMENBQWtDLENBQUM7Z0NBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dDQUNyQixRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQ0FDekI7d0NBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7NENBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsMERBQTBEOzRDQUNqRyxPQUFPO3dDQUNYLENBQUM7d0NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7NENBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUNBQWlDOzRDQUN4RSxPQUFPO3dDQUNYLENBQUM7d0NBQ0QsTUFBTTtvQ0FDVjt3Q0FDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0Q0FDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxzRUFBc0U7NENBQzdHLE9BQU87d0NBQ1gsQ0FBQzt3Q0FDRCxNQUFNO2dDQUNkLENBQUM7Z0NBRUQsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsRUFDekUsQ0FBQztvQ0FDRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxNQUFNO3dDQUVuRixJQUFJLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSzs0Q0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO29DQUNoRSxDQUFDLENBQUMsQ0FBQztnQ0FDUCxDQUFDOztvQ0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBOzRCQUN0QyxDQUFDOztnQ0FDSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNyRSxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxPQUFPLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxRQUFRLENBQUMsV0FBeUQ7b0JBRTlELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxZQUFZLEdBQUcsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4RixJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUMzQixDQUFDO3dCQUNHLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUUsQ0FBQzs0QkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBOEIsb0JBQW9CLEVBQUUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUM7aUNBQ25GLElBQUksQ0FBQyxVQUFVLENBQUM7Z0NBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN4QyxDQUFDLENBQUMsQ0FBQTt3QkFDVixDQUFDOzZCQUVELENBQUM7NEJBQ0csSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN4QyxDQUFDO29CQUNMLENBQUM7O3dCQUFNLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBRUQsaUJBQWlCLENBQUMsV0FBeUQ7b0JBRXZFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0RSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3lCQUMxRSxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUNoQixRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDekI7Z0NBQ0ksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsUUFBUSxJQUFJLElBQUksUUFBUTtvQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ25HLE1BQU07NEJBRVY7Z0NBQ0ksT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7Z0NBQzNGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUM7cUNBQ2xDLElBQUksQ0FBQyxVQUFVLElBQUk7b0NBQ2hCLElBQUksSUFBSTt3Q0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUMxQyxDQUFDLENBQUM7cUNBQ0QsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztxQ0FDL0UsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2xELE1BQU07NEJBRVY7Z0NBQ0ksT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7Z0NBQzNGLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7b0NBQ2pELElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ1AsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7d0NBQ2pGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJOzRDQUNuRCxJQUFJLElBQUksRUFBRSxDQUFDO2dEQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFDMUYsQ0FBQztvREFDRyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSx5Q0FBaUMsQ0FBQztnREFDdEcsQ0FBQztxREFFRCxDQUFDO29EQUNHLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO29EQUNsRixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDO3lEQUNsQyxJQUFJLENBQUMsVUFBVSxJQUFJO3dEQUVoQixJQUFJLElBQUk7NERBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDMUMsQ0FBQyxDQUFDO3lEQUNELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eURBQ3ZFLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dEQUN0RCxDQUFDOzRDQUNMLENBQUM7d0NBQ0wsQ0FBQyxDQUFDOzZDQUNELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkNBQ3ZFLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNsRCxDQUFDO2dDQUNMLENBQUMsQ0FBQztxQ0FDRyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FDQUMzRSxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDOUMsTUFBTTs0QkFFVjtnQ0FDSSxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztnQ0FDM0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7b0NBRXpELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQ0FDcEIsSUFBSSxJQUFJLEVBQ1IsQ0FBQzt3Q0FDRyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTs0Q0FDdkQsSUFBSSxJQUFJO2dEQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7d0NBQzFDLENBQUMsQ0FBQzs2Q0FDRCxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZDQUN2RSxNQUFNLENBQUMsY0FBYyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDbEQsQ0FBQztnQ0FDTCxDQUFDLENBQUM7cUNBQ0csSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQ0FDM0UsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzlDLE1BQU07NEJBRVY7Z0NBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQ0FDM0IsTUFBTTt3QkFDZCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsNEJBQTRCO29CQUV4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7d0JBQzNELElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUzt3QkFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSwyREFBMkQ7d0JBQ3JGLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVE7d0JBQzdELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0csQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsbUJBQW1CLENBQUMsTUFBb0Q7b0JBRXBFLElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQztvQkFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFFckMsUUFBUSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3pCLG9FQUE0RDs0QkFDNUQ7Z0NBQ0ksT0FBTyxJQUFJLENBQUMsQ0FBQztnQ0FDYixNQUFNO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxPQUFPLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCwwQkFBMEI7b0JBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWM7d0JBQ3pELElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUTt3QkFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELE9BQU8sRUFBRSxlQUFlO3dCQUN4QixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVE7d0JBQzdELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDaEUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7NEJBQzdELElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDMUIsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLHlDQUFpQyxDQUFDO2dDQUNuRixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO29DQUNqRCxJQUFJLElBQUksRUFDUixDQUFDO3dDQUNHLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO3dDQUNqRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTs0Q0FDcEQsSUFBSSxJQUFJLEVBQ1IsQ0FBQztnREFDRyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSx5Q0FBaUMsQ0FBQzs0Q0FDdEcsQ0FBQztpREFDSSxDQUFDO2dEQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQyxtQ0FBbUM7NENBQzlFLENBQUM7d0NBQ0wsQ0FBQyxDQUFDOzZDQUNELE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNsRCxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7O2dDQUNJLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JFLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVELGtCQUFrQjtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQztvQkFFbkMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxNQUFNOzRCQUVuRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixHQUFHLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxDQUFDOzRCQUN0RSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDOzt3QkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxTQUFTLENBQUMsU0FBdUQ7b0JBQzdELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4RSxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztvQkFDbEYsSUFBSSxDQUFDLElBQUksQ0FBOEIsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3lCQUN0SSxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNiLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hCLENBQUM7NEJBQ0csSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7NEJBQ3BCLG1EQUFtRDt3QkFDdkQsQ0FBQzt3QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDbkIsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDBDQUFrQyxDQUFDO3dCQUVwRixrQ0FBa0M7d0JBQ2xDLFFBQVEsSUFBSSxDQUFDLGFBQWEsRUFDMUIsQ0FBQzs0QkFDRyw4Q0FBcUM7NEJBQ3JDLHlEQUFnRDs0QkFDaEQ7Z0NBRUksSUFBSSxJQUFJLENBQUMsVUFBVSxzREFBOEMsRUFDakUsQ0FBQztvQ0FDRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7b0NBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGlEQUF5QyxFQUNsRSxDQUFDO3dDQUNHLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxrREFBa0QsRUFBRSxJQUFJLENBQUUsQ0FBQztvQ0FDdEcsQ0FBQztvQ0FDRCxJQUFJLFdBQVcsS0FBSyxJQUFJO3dDQUFFLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dDQUNoRSxDQUFDO2dDQUNELE1BQU07d0JBQ2QsQ0FBQzt3QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3hFLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLENBQUMsRUFDbEMsQ0FBQzs0QkFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0csQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsTUFBTSxDQUFDO3dCQUNKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCx3QkFBd0IsQ0FBQyxTQUF1RDtvQkFDNUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLDJCQUEyQjtvQkFDM0IsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFeEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDeEMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSw2REFBcUQsRUFBRSxDQUFDOzRCQUM3RSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQzs0QkFDL0IsUUFBUSxJQUFJLENBQUMsQ0FBQzs0QkFDZCxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsOENBQThDLEdBQUcsUUFBUSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ25ILENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLFFBQVEsR0FBMEIsRUFBRSxDQUFDO3dCQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDakUsSUFBSyxTQUFzRCxDQUFDLFFBQVEsNkRBQXFELEVBQUUsQ0FBQztnQ0FDeEgsUUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0NBQ3pCO3dDQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ3BELE1BQU07b0NBQ1Y7d0NBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQzlDLE1BQU07b0NBQ1Y7d0NBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQzlDLE1BQU07b0NBQ1Y7d0NBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3Q0FDNUMsTUFBSztnQ0FDYixDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQzt3QkFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM3Qjs0QkFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN0RSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQ3ZDLENBQUM7Z0NBQ0csUUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0NBQ3pCLHdEQUE4QztvQ0FDOUM7d0NBQ0ksSUFBSSxHQUFHLElBQUksQ0FBQzt3Q0FDWixNQUFNO2dDQUNkLENBQUM7NEJBQ0wsQ0FBQzs0QkFFRCx5QkFBeUI7NEJBQ3pCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLDJDQUFtQyxJQUFJLENBQUMsQ0FBQzs0QkFDekcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMENBQTBDLEdBQUcsSUFBSSxDQUFDLENBQUM7NEJBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELHFCQUFxQixDQUFDLFNBQXVEO29CQUN6RSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUM7b0JBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDckIsMkJBQTJCO29CQUMzQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUV4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN4QyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLDZEQUFxRCxFQUFFLENBQUM7NEJBQzdFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDOzRCQUMvQixRQUFRLElBQUksQ0FBQyxDQUFDOzRCQUNkLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDOzRCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsR0FBRyxRQUFRLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbkgsQ0FBQztvQkFDTCxDQUFDO29CQUVELElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQ3hCLENBQUM7d0JBQ0csSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7d0JBRWhCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFFL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNqRCxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0NBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUNqRSxJQUFLLFNBQXNELENBQUMsUUFBUSw2REFBcUQsRUFBRSxDQUFDO29DQUN4SCxRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3Q0FDekI7NENBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ2hEOzRDQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FDMUM7NENBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUMxQzs0Q0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzRDQUM1QyxPQUFPLEtBQUssQ0FBQztvQ0FDckIsQ0FBQztnQ0FDTCxDQUFDO3FDQUVELENBQUM7b0NBQ0csT0FBTyxLQUFLLENBQUM7Z0NBQ2pCLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUE7d0JBQ04sQ0FBQzt3QkFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBRXRCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3RFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dDQUN0QyxRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQ0FDekIsd0RBQThDO29DQUM5Qzt3Q0FDSSxJQUFJLEdBQUcsSUFBSSxDQUFDO3dDQUNaLE1BQU07Z0NBQ2QsQ0FBQzs0QkFDTCxDQUFDOzRCQUVELHlCQUF5Qjs0QkFDekIsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsMkNBQW1DLElBQUksQ0FBQyxDQUFDOzRCQUN6RyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsQ0FBQzs0QkFDbEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekIsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsMEJBQTBCO2dCQUMxQixXQUFXLENBQUMsSUFBZ0QsRUFBRSxJQUF3RDtvQkFDbEgsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUVqRSxJQUFJLENBQUMsSUFBSSxDQUE0QixnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDYixJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUNKLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsUUFBUyxDQUFDLENBQUM7NEJBQzNFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDOzZCQUNJLENBQUM7NEJBQ0YsSUFBSSxDQUFDLFFBQVEsbUVBQTJELENBQUM7NEJBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzs0QkFDdkUsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQzs0QkFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsVUFBVSxNQUFNO3dCQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQy9ELE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMvRSxJQUFJLENBQUMsUUFBUSxtRUFBMkQsQ0FBQzt3QkFDekUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxnQ0FBZ0M7Z0JBQ2hDLGlCQUFpQixDQUFDLElBQWdEO29CQUM5RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUM7b0JBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0RSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsY0FBYztxQkFDbEQsQ0FBQzt3QkFDRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO3dCQUMvQyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQzt3QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBNEIsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs2QkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDYixJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLFFBQVMsQ0FBQyxDQUFDO2dDQUMzRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDakI7d0NBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBSSxFQUFFLENBQUMsQ0FBQyxJQUFLLENBQUM7NkNBQzlCLElBQUksQ0FBQyxVQUFVLElBQUk7NENBRWhCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0Q0FDcEIsSUFBSSxJQUFJLEVBQUUsQ0FBQztnREFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29EQUN6QyxJQUFJLENBQUM7d0RBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7d0RBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0RBQy9CLENBQUMsQ0FBQyxDQUFBOzRDQUNOLENBQUM7aURBQ0ksQ0FBQztnREFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRDQUFDLENBQUM7d0NBQy9CLENBQUMsQ0FDSjs2Q0FDQSxJQUFJLENBQUM7NENBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzt3Q0FDckQsQ0FBQyxDQUFDOzZDQUNELE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNsRCxNQUFNO29DQUNWO3dDQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO3dDQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dDQUN0QixNQUFNO2dDQUNkLENBQUM7NEJBQ0wsQ0FBQztpQ0FDSSxDQUFDO2dDQUNGLElBQUksQ0FBQyxRQUFRLG1FQUEyRCxDQUFDO2dDQUN6RSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUMxQixDQUFDO3dCQUNMLENBQUMsQ0FBQzs2QkFDRCxJQUFJLENBQUM7NEJBRUYsSUFBSSxDQUFDLFFBQVEsbUVBQTJELENBQUM7NEJBQ3pFLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDOUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzs0QkFDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDOzZCQUNELE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDO3lCQUNJLG9DQUFvQztxQkFDekMsQ0FBQzt3QkFDRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ25DLElBQUksQ0FBQztnQ0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQ0FDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNKLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDakYsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxVQUFVLENBQUMsSUFBWSxFQUFFLElBQVk7b0JBQ2pDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQTRELENBQUM7b0JBQ3BGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsdUVBQXVFO29CQUN2RSxJQUFJLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUNqRCxJQUFJLFVBQVUsR0FBYSxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO29CQUNoSCxJQUFJLFVBQVU7d0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3BGLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUN4Qzt3QkFDRyxJQUFJLEVBQUUsSUFBSTt3QkFDVixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFO3dCQUNwQixlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQzVCLGFBQWEsb0RBQTJDO3dCQUN4RCxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVk7cUJBQ3pDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLENBQUMsWUFBK0QsRUFBRSxFQUFFO3dCQUN0RSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNqQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFBQyxDQUFDO3dCQUM3RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQTtvQkFDVixPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCwwQkFBMEI7b0JBRXRCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyw0QkFBNEI7eUJBQ3ZNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzt3QkFDMUIsSUFBSSxLQUFLLEdBQW1ELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7d0JBRXJILFFBQVEsR0FBRyxFQUFFLENBQUM7NEJBQ1YsS0FBSyxLQUFLO2dDQUNOLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDO2dDQUNoRSxNQUFNOzRCQUNWLEtBQUssT0FBTztnQ0FDUixLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDO2dDQUMxRSxNQUFNO3dCQUNkLENBQUM7d0JBQ0QsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFNBQVM7NEJBQUUsTUFBQSxlQUFlLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNqSSxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVELDBCQUEwQjtvQkFFdEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFnQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUE4QixDQUFDO29CQUM1SixPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztvQkFDakYsSUFBSSxDQUFDLElBQUksQ0FBbUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQ2xGLElBQUksQ0FBQyxVQUFVLGVBQWU7d0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7d0JBRXhELElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzs0QkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzs0QkFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTTtnQ0FFbkYsSUFBSSxNQUFNLElBQUksTUFBTSxLQUFLLEtBQUssRUFDOUIsQ0FBQztvQ0FDRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNySCxpREFBaUQ7Z0NBQ3JELENBQUM7O29DQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pDLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUM7NkJBQ0ksQ0FBQzs0QkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOzRCQUN4RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUM7d0JBRUYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztvQkFDUCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCx1QkFBdUIsQ0FBQyxTQUF1RDtvQkFDM0UsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7b0JBQ3JELE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO29CQUNqRixJQUFJLENBQUMsSUFBSSxDQUE0Qix1QkFBdUIsQ0FBQzt5QkFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRzt3QkFDZixJQUFJLEdBQUcsQ0FBQyxRQUFRLCtEQUF1RCxFQUN2RSxDQUFDOzRCQUNHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07Z0NBRTdFLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQzlCLENBQUM7b0NBQ0csSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTt3Q0FFN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDekIsQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsQ0FBQzs7b0NBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekIsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVO3dCQUVsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELG9CQUFvQjtvQkFDaEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDO29CQUNuQyxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDM0MsS0FBSyxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3JCLE1BQU07d0JBQ1YsS0FBSyxDQUFDOzRCQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07Z0NBQ25GLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO29DQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUN6QixDQUFDO3FDQUFNLENBQUM7b0NBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDMUIsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxNQUFNO3dCQUNWOzRCQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3RCLE1BQU07b0JBQ2QsQ0FBQztvQkFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCwwQkFBMEI7Z0JBQzFCLGtCQUFrQixDQUFDLElBQWdEO29CQUMvRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFPLENBQUM7b0JBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLDJDQUFpQyxDQUFDO29CQUNoRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7b0JBQ2hELElBQUksSUFBSSxDQUFDLFFBQVEsb0VBQTRELEVBQUUsQ0FBQzt3QkFDNUUsSUFBSSxLQUFLLEdBQThCLEVBQUUsQ0FBQzt3QkFDMUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUNyQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQzt3QkFFckUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzRCQUMxQixPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7NEJBQzFCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLGNBQWM7NEJBQ2QsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBaUI7NEJBQzlCLDRCQUE0QixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUI7eUJBQy9GLENBQUM7NkJBQ0csSUFBSSxDQUFDLFVBQVUsTUFBTTs0QkFDbEIsc0JBQXNCOzRCQUN0QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQ0FDM0QsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7b0NBQ2xCLEtBQUssVUFBVTt3Q0FDWCxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzt3Q0FDckIsS0FBSyxDQUFDLFFBQVEsNERBQW9ELENBQUM7d0NBQ25FLE1BQU07b0NBRVYsS0FBSyxVQUFVO3dDQUNYLEtBQUssQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLENBQUMsa0RBQWtEO3dDQUNyRixLQUFLLENBQUMsUUFBUSw0REFBb0QsQ0FBQzt3Q0FDbkUsTUFBTTtvQ0FFVixLQUFLLFlBQVk7d0NBQ2IsS0FBSyxDQUFDLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQzt3Q0FDekQsS0FBSyxDQUFDLFFBQVEsd0VBQWdFLENBQUM7d0NBQy9FLE1BQU07b0NBRVYsS0FBSyxZQUFZO3dDQUNiLElBQUksS0FBSyxFQUFFLENBQUM7NENBQ1IsK0JBQStCO3dDQUNuQyxDQUFDOzZDQUNJLENBQUM7NENBQ0YsS0FBSyxDQUFDLFNBQVMsR0FBRywwQ0FBMEMsQ0FBQzs0Q0FDN0QsS0FBSyxDQUFDLFFBQVEsOERBQXNELENBQUM7NENBQ3JFLElBQUksQ0FBQyxRQUFRLG1FQUEyRCxDQUFDOzRDQUN6RSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7d0NBQ2hDLENBQUM7d0NBQ0QsTUFBTTtvQ0FFVjt3Q0FDSSxLQUFLLENBQUMsUUFBUSw4REFBc0QsQ0FBQzt3Q0FDckUsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3dDQUM5QixNQUFNO2dDQUNkLENBQUM7Z0NBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2hDLENBQUM7aUNBQ0ksQ0FBQztnQ0FDRixLQUFLLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO2dDQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dDQUNoRCxLQUFLLENBQUMsUUFBUSw4REFBc0QsQ0FBQztnQ0FDckUsSUFBSSxDQUFDLFFBQVEsbUVBQTJELENBQUM7Z0NBQ3pFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQ0FDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQzVCLDZDQUE2Qzs0QkFDakQsQ0FBQzs0QkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUM7NkJBQ0QsSUFBSSxDQUFDLFVBQVUsTUFBTTs0QkFFbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFpQixHQUFHLE1BQWdCLENBQUM7NEJBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDcEUsS0FBSyxDQUFDLFFBQVEsOERBQXNELENBQUM7NEJBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN0Qiw2Q0FBNkM7d0JBQ2pELENBQUMsQ0FBQyxDQUNEO29CQUNULENBQUM7b0JBQ0QsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsb0JBQW9CLENBQUMsU0FBdUQ7b0JBQ3hFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQztvQkFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDekMsQ0FBQzt3QkFDRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDeEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsbUVBQTJELENBQUM7NEJBQ2pGLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFBO3dCQUN2QyxDQUFDO29CQUNMLENBQUM7b0JBSUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTt3QkFDN0MsSUFBSSxNQUFNLEVBQUUsQ0FBQzs0QkFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDdkIsSUFBSSxRQUFRLEdBQTBCLEVBQUUsQ0FBQzs0QkFFekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekQsQ0FBQzs0QkFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM3QjtnQ0FDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN6QixDQUFDLENBQUMsQ0FBQzt3QkFFWCxDQUFDOzZCQUVELENBQUM7NEJBQ0csSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7NEJBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3pCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBR0QsaUJBQWlCLENBQUMsU0FBdUQ7b0JBQ3JFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQztvQkFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN4QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDeEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsbUVBQTJELENBQUM7NEJBQ2pGLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFBO3dCQUN2QyxDQUFDO29CQUNMLENBQUM7b0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTt3QkFDN0MsSUFBSSxNQUFNLEVBQ1YsQ0FBQzs0QkFDRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFFeEIsOEJBQThCOzRCQUM3QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBRS9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQ2xELENBQUM7Z0NBQ0csT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29DQUN4QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDakQsQ0FBQyxDQUFDLENBQUE7NEJBQ04sQ0FBQzs0QkFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0NBQ3RCLDhCQUE4QjtnQ0FDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekIsQ0FBQyxDQUFDLENBQUE7d0JBQ04sQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOzRCQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNGLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUdELHdCQUF3QixDQUFDLFlBQThDO29CQUNuRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUM7b0JBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztvQkFDdEQsT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7b0JBQzFGLElBQUksQ0FBQyxJQUFJLENBQW1DLHlCQUF5QixFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDO3lCQUNqRyxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLDZEQUFxRCxDQUFDLENBQUM7b0JBQ3pGLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBQ0osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDUCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxzQkFBc0I7b0JBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQztvQkFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLHlDQUF5QztvQkFDMUYsSUFBSSxDQUFDLElBQUksQ0FBbUMsc0JBQXNCLENBQUM7eUJBQzlELElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELGtDQUFrQztvQkFDOUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBZ0MsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBb0MsQ0FBQztnQkFDdFIsQ0FBQzthQUNKLENBQUE7WUFyK0JZLHdCQUF3QjtnQkFEcEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCx3QkFBd0IsQ0FxK0JwQztZQXIrQlksOEJBQXdCLDJCQXErQnBDLENBQUE7UUFDTCxDQUFDLEVBeCtCb0IsS0FBSyxHQUFMLFNBQUssS0FBTCxTQUFLLFFBdytCekI7SUFBRCxDQUFDLEVBeCtCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdytCbkI7QUFBRCxDQUFDLEVBeCtCUyxNQUFNLEtBQU4sTUFBTSxRQXcrQmY7QUN4K0JELElBQVUsTUFBTSxDQXc1QmY7QUF4NUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXc1Qm5CO0lBeDVCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxLQUFLLENBdzVCekI7UUF4NUJvQixXQUFBLEtBQUs7O1lBRXRCLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBNkM7Z0JBV3ZFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFzQztvQkFDbEUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN2SSxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFDakosT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7b0JBQ2xKLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO29CQUM1SixPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixDQUFDO2dCQUVNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFzQztvQkFDeEUsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLFNBQVM7d0JBQUUsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7b0JBQ3JFLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLHNEQUE4QyxDQUFDLENBQUM7b0JBQzlHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLCtDQUF1QyxDQUFDLENBQUM7b0JBQ3ZHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLG1EQUEyQyxDQUFDLENBQUM7b0JBQzNHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLDhDQUFzQyxDQUFDLENBQUM7b0JBQ3RHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6RixPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDakYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7Z0JBQ2pJLENBQUM7Z0JBRU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQXNDO29CQUNyRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztvQkFDN0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7b0JBQ2pFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLHFEQUE2QyxFQUFFLENBQUM7d0JBQ3hFLFFBQVEsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUM1QjtnQ0FDSSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQ0FDeEQsTUFBTTt3QkFDZCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM5QixFQUFFLENBQUMsYUFBYSxDQUFDLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUM5QyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRCxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDekQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLDZDQUE2QztvQkFFN0MsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUNyRCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztvQkFFaEUsUUFBUSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQzVCLDhDQUFxQzt3QkFDckMseURBQWdEO3dCQUNoRDs0QkFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7NEJBQzVDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFBLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDOzRCQUNqRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBQSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDN0MsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUEsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQzdDLE1BQU07b0JBQ2QsQ0FBQztvQkFFRCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7b0JBQzNELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUU3RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxxREFBNkMsRUFBRSxDQUFDO3dCQUN4RSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQy9DLENBQUM7b0JBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN2RCxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztvQkFFM0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUscURBQTZDLEVBQ3pFLENBQUM7d0JBQ0csRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUM7b0JBQzNFLENBQUM7b0JBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUV2RixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxxREFBNkMsRUFDekUsQ0FBQzt3QkFDRyxRQUFRLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDNUIsd0RBQThDOzRCQUM5QztnQ0FDSSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUEsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0NBQzlDLE1BQU07d0JBQ2QsQ0FBQzt3QkFDRCxFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzt3QkFFN0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7d0JBQ3BELFFBQVEsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUM1Qiw4Q0FBcUM7NEJBQ3JDLHlEQUFnRDs0QkFDaEQ7Z0NBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0NBQzlELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dDQUMvRCxNQUFNO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSwwREFBa0QsRUFBRSxDQUFDO3dCQUM3RSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQzt3QkFDOUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQzt3QkFDOUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7d0JBQzlELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO3dCQUMvRCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztvQkFDakUsQ0FBQztvQkFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxxREFBNkMsRUFBRSxDQUFDO3dCQUN4RSxRQUFRLE9BQU8sQ0FBQyxhQUFhLEVBQzdCLENBQUM7NEJBQ0csOENBQXFDOzRCQUNyQyx3REFBOEM7NEJBQzlDO2dDQUNJLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFDLGdDQUFnQztnQ0FDdEgsTUFBTTt3QkFDZCxDQUFDO3dCQUNELFFBQVEsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUM1QjtnQ0FDSSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7Z0NBQzdELEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztnQ0FDMUQsTUFBTTs0QkFDVjtnQ0FDSSxJQUFJLE9BQU8sQ0FBQyxXQUFXO29DQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBQSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQ0FDOUUsTUFBTTt3QkFDZCxDQUFDO29CQUNMLENBQUM7b0JBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO29CQUMzRCxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFFLENBQUM7Z0JBRU0sTUFBTSxDQUFDLGlEQUFpRCxDQUFDLE9BQXNDO29CQUNsRyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFnQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFvQyxDQUFDO2dCQUN6UixDQUFDO2dCQUVNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFzQztvQkFDdEUsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBaUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBcUMsQ0FBQztnQkFDekwsQ0FBQztnQkFFTSxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBc0MsRUFBRSxHQUFvQyxFQUFFLFFBQWtCO29CQUVoSSxJQUFJLFNBQVMsR0FBRyxlQUFlLEdBQUcsR0FBRyxDQUFDLENBQUMseUJBQXlCO29CQUNoRSxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUNWOzRCQUFrRCxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsNEJBQTRCOzRCQUN4RyxNQUFLO3dCQUNUOzRCQUEyQyxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsb0JBQW9COzRCQUN6RixNQUFLO3dCQUNUOzRCQUErQyxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsd0JBQXdCOzRCQUNqRyxNQUFLO3dCQUNUOzRCQUEwQyxTQUFTLElBQUksZUFBZSxDQUFDLENBQUMsbUJBQW1COzRCQUN2RixNQUFLO29CQUNiLENBQUM7b0JBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxlQUFlLEdBQUcsR0FBRzt3QkFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRO3dCQUMxQyxPQUFPLEVBQUUsU0FBUzt3QkFDbEIsT0FBTyxFQUFFLFNBQVM7d0JBQ2xCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNwRSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQ0FDckIsdUJBQXVCO2dDQUN2QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7Z0NBQ3pCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztnQ0FDckIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO2dDQUN6QixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQ0FFN0IsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQ0FDVjt3Q0FDSSxZQUFZLEdBQUcsSUFBSSxDQUFDO3dDQUNwQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7d0NBQ3hCLE1BQUs7b0NBQ1Q7d0NBQ0ksUUFBUSxHQUFHLElBQUksQ0FBQzt3Q0FDaEIsTUFBSztvQ0FDVDt3Q0FDSSxZQUFZLEdBQUcsSUFBSSxDQUFDO3dDQUNwQixNQUFLO29DQUNUO3dDQUNJLGdCQUFnQixHQUFHLElBQUksQ0FBQzt3Q0FDeEIsWUFBWSxHQUFHLElBQUksQ0FBQzt3Q0FDcEIsUUFBUSxHQUFHLElBQUksQ0FBQzt3Q0FDaEIsWUFBWSxHQUFHLElBQUksQ0FBQzt3Q0FDcEIsTUFBSztnQ0FDYixDQUFDO2dDQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0NBRTlHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztvQ0FDbkIsSUFBSSxVQUFVLEdBQUcsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUN6RixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQTZDLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7NkNBQzNJLElBQUksQ0FBQyxVQUFVLElBQUk7NENBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0RBQ2hCLHVCQUF1QjtnREFDdkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDO2dEQUMzRCxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0RBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7NENBQy9HLENBQUM7NENBRUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQTJDLFNBQVMsQ0FBQyxDQUFDOzRDQUN6RixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzRDQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dEQUNuQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnREFDNUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dEQUMvQyxJQUFJLEtBQUssRUFBRSxDQUFDO29EQUNSLElBQUksWUFBWTt3REFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29EQUMzRCxJQUFJLFFBQVE7d0RBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvREFDN0MsSUFBSSxZQUFZO3dEQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0RBQzdELENBQUM7NENBQ0wsQ0FBQzs0Q0FDRCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzt3Q0FDM0MsQ0FBQyxDQUFDOzZDQUNELE1BQU0sQ0FBQzs0Q0FDSixPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQzNCLENBQUMsQ0FBQyxDQUFDO29DQUNYLENBQUM7O3dDQUFNLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzFFLENBQUM7cUNBQ0ksQ0FBQztvQ0FDRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDL0MsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FFMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3Q0FDekMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7NENBQ3hCLElBQUksWUFBWSxFQUFFLENBQUM7Z0RBQ2YsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dEQUNwQixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUztvREFBRSxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0RBQzdFLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTO29EQUFFLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnREFDN0UsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU87b0RBQUUsVUFBVSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dEQUN6RSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs0Q0FDakQsQ0FBQzs0Q0FFRCxJQUFJLFFBQVE7Z0RBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0Q0FFbkUsSUFBSSxZQUFZO2dEQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7d0NBQ25GLENBQUM7b0NBQ0wsQ0FBQztvQ0FDRCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQ0FDdkMsT0FBTyxDQUFDLElBQUksQ0FBVSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7eUNBQ2pFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDbkMsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxJQUFJO3dCQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ25ILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxPQUFzQyxFQUFFLFFBQWtCO29CQUUxRyxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLDBDQUEwQzt3QkFDaEQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRO3dCQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlEQUF5RDt3QkFDbkYsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixpQkFBZSxDQUFDLGlDQUFpQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFDckUsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLElBQUk7d0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbkgsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLDZDQUE2QyxDQUFDLE9BQXNDLEVBQUUsUUFBa0I7b0JBRWxILElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsMENBQTBDO3dCQUNoRCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVE7d0JBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0RBQW9EO3dCQUM5RSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLGlCQUFlLENBQUMsaUNBQWlDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO3dCQUNwRSxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSTt3QkFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNuSCxPQUFPLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFFTSxNQUFNLENBQUMsaUNBQWlDLENBQUMsT0FBc0MsRUFBRSxjQUF1QjtvQkFFM0csSUFBSSxVQUFVLEdBQUcsaUJBQWUsQ0FBQyxpREFBaUQsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUYsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUF5Qyx3Q0FBd0MsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxDQUFDOzZCQUNsSixJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNoQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBdUMsU0FBUyxDQUFDLENBQUM7NEJBQ3JGLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ25DLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUM1RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQy9DLElBQUksS0FBSyxFQUFFLENBQUM7b0NBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQ0FDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQ0FDM0MsQ0FBQzs0QkFDTCxDQUFDOzRCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMzQyxDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDOzRCQUNKLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQzs7d0JBQU0sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFFTSxNQUFNLENBQUMsZ0NBQWdDLENBQUMsT0FBc0MsRUFBRSxRQUFrQjtvQkFDckcsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSx5QkFBeUI7d0JBQy9CLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUTt3QkFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSwwQ0FBMEM7d0JBQ3BFLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxPQUFPLEdBQUcsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFxQyxDQUFDOzRCQUNqRyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dDQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztxQ0FDMUgsSUFBSSxDQUFDLFVBQVUsTUFBTTtvQ0FDbEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ2pCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO29DQUNoQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNYLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLElBQUk7d0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbkgsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQXNDLEVBQUUsUUFBa0I7b0JBQzVGLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVE7d0JBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0NBQW9DO3dCQUM5RCxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBRWxCLElBQUksT0FBTyxHQUFHLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBcUMsQ0FBQzs0QkFDakcsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQ0FDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztxQ0FDNUcsSUFBSSxDQUFDLFVBQVUsTUFBTTtvQ0FDbEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7d0NBQ2pCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3Q0FDckMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3dDQUMzQixPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7d0NBQ25DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzt3Q0FDM0IsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dDQUN6RCxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQ0FDakMsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxJQUFJO3dCQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ25ILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFzQztvQkFDeEUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO29CQUMzQyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQzFDLFFBQVEsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUNoQztnQ0FDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxpRUFBeUQsRUFBRSxDQUFDO29DQUNwRixJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsK0RBQXVELEVBQ3pHLENBQUM7d0NBQ0csSUFBSSxPQUFPLENBQUMsSUFBSTs0Q0FBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDbEYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0NBQ2xILENBQUM7Z0NBQ0wsQ0FBQztnQ0FDRCxNQUFNOzRCQUVWO2dDQUNJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFlLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dDQUMvRyxpQkFBZSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUM1QyxNQUFNO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUVNLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxPQUFzQyxFQUFFLFFBQWtCO29CQUNqRyxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLHFCQUFxQjt3QkFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNO3dCQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzt3QkFDM0QsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQy9DO2dDQUNJLFNBQVMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVM7Z0NBQ3ZDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUztnQ0FDakQsT0FBTyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTztnQ0FDbkMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUTtnQ0FDckMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSTtnQ0FDN0IsZUFBZSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZTtnQ0FDbkQsaUJBQWlCO2dDQUNqQix3QkFBd0I7Z0NBQ3hCLHdCQUF3Qjs2QkFDM0IsQ0FBQyxDQUFBO3dCQUNWLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxJQUFJO3dCQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ25ILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxPQUFzQyxFQUFFLEdBQW1EO29CQUNuSSxJQUFJLFNBQVMsR0FBRyxlQUFlLENBQUM7b0JBQ2hDLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ1YsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUTs0QkFDeEQsTUFBTTt3QkFDVixLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0I7NEJBQ2xFLFNBQVMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQywwQkFBMEI7NEJBQzFFLE1BQU07d0JBQ1YsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsbUJBQW1COzRCQUNuRSxTQUFTLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjs0QkFDaEUsTUFBTTt3QkFDVixLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyw2QkFBNkI7NEJBQzdFLFNBQVMsSUFBSSxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDLHdCQUF3Qjs0QkFDaEcsTUFBTTtvQkFDZCxDQUFDO29CQUNELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUI7d0JBQzVELElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSTt3QkFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxrREFBa0Q7d0JBQ3RFLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsaUJBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzVELENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFzQyxFQUFFLEdBQW1EO29CQUUvSCxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN0QyxJQUFJLGVBQWUsR0FBRyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRXhGLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzs0QkFDN0IsaUJBQWlCOzRCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO2lDQUMxRCxJQUFJLENBQUM7Z0NBQ0YsaUJBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ3BELENBQUMsQ0FBQyxDQUFBO3dCQUNWLENBQUM7OzRCQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFFLGdEQUFnRDtvQkFDbkssQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLGlCQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxDQUFDO2dCQUNMLENBQUM7Z0JBR00sTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQXNDLEVBQUUsR0FBbUQsRUFBRSxLQUF5QjtvQkFDbEosSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7b0JBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDaEMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7d0JBQy9ELE9BQU8sRUFBRSxlQUFlO3dCQUN4QixJQUFJLEVBQUUsS0FBSzt3QkFDWCxjQUFjLEVBQUUsVUFBVSxHQUFHOzRCQUN6QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7NEJBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBWSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUMvRCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7NEJBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBWSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5RCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDOUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUNsSCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7NEJBQ3pCLElBQUksVUFBVSxDQUFDLDJCQUEyQjtnQ0FBRSxlQUFlLEdBQUcsVUFBVSxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSxDQUFDOzRCQUM1RyxJQUFJLFVBQVUsQ0FBQyxrQ0FBa0M7Z0NBQUUsZUFBZSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsa0NBQWtDLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2pJLElBQUksVUFBVSxDQUFDLG9CQUFvQjtnQ0FBRSxlQUFlLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDckcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDOzRCQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO3dCQUNwRSxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUFBLENBQUM7Z0JBQzVDLENBQUM7Z0JBRU0sTUFBTSxDQUFDLG1DQUFtQyxDQUFDLE9BQXNEO29CQUNwRyxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCO3dCQUNsRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUk7d0JBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsMENBQTBDO3dCQUNwRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dDQUNoQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHFDQUFxQztnQ0FDL0QsT0FBTyxFQUFFLGVBQWU7Z0NBQ3hCLElBQUksRUFBRSxnQkFBZ0I7Z0NBQ3RCLGNBQWMsRUFBRSxVQUFVLEdBQUc7b0NBQ3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxZQUFZLHdEQUFnRCxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQWEsQ0FBQyxDQUFDO29DQUNuSyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQU0sQ0FBQztvQ0FDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUksQ0FBQztvQ0FDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQ0FDM0MsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLHNCQUFzQixDQUFDLE9BQXNDO29CQUN2RSxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVTt3QkFDckQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJO3dCQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDaEMsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7Z0NBQy9ELE9BQU8sRUFBRSxlQUFlO2dDQUN4QixJQUFJLEVBQUUsZ0JBQWdCO2dDQUN0QixjQUFjLEVBQUUsVUFBVSxHQUFHO29DQUN6QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7b0NBQzNDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxZQUFZLHdEQUFnRCxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQWEsQ0FBRyxDQUFDO29DQUNySyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQU0sQ0FBQztvQ0FDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUksQ0FBQztvQ0FDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDbEYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29DQUN4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29DQUN4RCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUksdURBQStDLENBQUM7Z0NBQzdJLENBQUM7NkJBQ0osQ0FBQyxDQUFDOzRCQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3hDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFzQztvQkFDeEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVU7d0JBQ3JELElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSTt3QkFDdEMsT0FBTyxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0JBQ3RELE9BQU8sRUFBRSxlQUFlO3dCQUN4QixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dDQUNoQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHFDQUFxQztnQ0FDL0QsT0FBTyxFQUFFLGVBQWU7Z0NBQ3hCLElBQUksRUFBRSxpQkFBaUI7Z0NBQ3ZCLGNBQWMsRUFBRSxVQUFVLEdBQUc7b0NBQ3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxZQUFZLHdEQUFnRCxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQWEsQ0FBQyxDQUFDO29DQUNuSyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQU0sQ0FBQztvQ0FDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUksQ0FBQztvQ0FDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFJLHVEQUErQyxDQUFDO29DQUN6SSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDN0QsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLGtDQUFrQyxDQUFDLE9BQXNDO29CQUNuRixJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVTt3QkFDckQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJO3dCQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlEQUF5RDt3QkFDbkYsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Z0NBQ2hDLElBQUksRUFBRSxTQUFTO2dDQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUscUNBQXFDO2dDQUMvRCxPQUFPLEVBQUUsZUFBZTtnQ0FDeEIsSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsY0FBYyxFQUFFLFVBQVUsR0FBRztvQ0FDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQy9ELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUM5RCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDOUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQ0FDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDeEQsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLGtDQUFrQyxDQUFDLE9BQXNDO29CQUNuRixJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDckIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsc0JBQXNCO3dCQUNqRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUk7d0JBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsaURBQWlEO3dCQUMzRSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDOzRCQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Z0NBQ2hDLElBQUksRUFBRSxTQUFTO2dDQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUscUNBQXFDO2dDQUMvRCxPQUFPLEVBQUUsZUFBZTtnQ0FDeEIsSUFBSSxFQUFFLEtBQUs7Z0NBQ1gsY0FBYyxFQUFFLFVBQVUsR0FBRztvQ0FDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQy9ELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNsRSxDQUFDOzZCQUNKLENBQUMsQ0FBQzs0QkFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUN4QyxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxPQUFPLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFFTSxNQUFNLENBQUMsNEJBQTRCLENBQUMsT0FBc0MsRUFBRSxHQUF3QztvQkFDdkgsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQjt3QkFDaEQsSUFBSSxFQUFFLElBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7d0JBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUM1RCxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsU0FBUyxFQUFFLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUTt3QkFDdEQsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2pCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3RELGlCQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM1QyxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxPQUFPLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFFTSxNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBc0MsRUFBRSxHQUF3QztvQkFDeEgsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQjt3QkFDakQsSUFBSSxFQUFFLElBQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7d0JBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsOENBQThDO3dCQUN4RSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsU0FBUyxFQUFFLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUTt3QkFDdEQsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFOzRCQUNULDBKQUEwSjs0QkFDMUosaUJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3hDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxPQUFzQztvQkFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQjt3QkFDbkQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPO3dCQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHNDQUFzQzt3QkFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxpREFBaUQ7d0JBQzNFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNyRCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtDQUFrQyxDQUFDLE9BQU8seURBQWlEO2lDQUMvRyxJQUFJLENBQUMsVUFBVSxHQUFHO2dDQUVmLGlCQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sZ0ZBQXdFLElBQUksQ0FBQyxDQUFDOzRCQUN4SCxDQUFDLENBQUM7aUNBQ0QsSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pHLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVNLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxPQUFzQztvQkFDOUUsaUJBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFL0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQjt3QkFDakQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVO3dCQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLHlDQUF5Qzt3QkFDbkUsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTs0QkFDVCxpQkFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQXNDO29CQUNuRSxxREFBcUQ7b0JBQ3JELHFCQUFxQjtvQkFDckIsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDO3dCQUN4QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxpQkFBZSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7cUJBQzdHLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUVNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFzQztvQkFDdEUscURBQXFEO29CQUNyRCxxQkFBcUI7b0JBQ3JCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQzt3QkFDeEMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsaUJBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztxQkFDdEcsQ0FBQyxDQUFBO2dCQUNOLENBQUM7Z0JBRU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQXNDLEVBQUUsUUFBMEQsRUFBRSxVQUFlO29CQUNoSixJQUFJLE1BQThDLENBQUM7b0JBQ25ELElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUM7d0JBQ3JELE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBdUMsY0FBYyxDQUFDLENBQUM7d0JBQ3RGLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQywyREFBMkQ7NEJBQ3JHLE9BQU87d0JBQ1gsQ0FBQztvQkFDTCxDQUFDO3lCQUNJLENBQUM7d0JBQ0YsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUF1QyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hHLENBQUM7b0JBRUQsT0FBTyxDQUFDLElBQUksQ0FBdUMscUJBQXFCLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzt5QkFDMUcsSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFFaEIsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNuRCxlQUFlO3dCQUNmLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3BELDZEQUE2RDt3QkFDN0QsT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQ2hELENBQUM7NEJBQ0csMkNBQTJDOzRCQUMzQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDaEYsQ0FBQzt3QkFFRCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sNERBQW9ELENBQUM7d0JBQzNHLElBQUksT0FBTyxDQUFDLFVBQVUsc0RBQThDLEVBQUUsQ0FBQzs0QkFDbkUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsaUVBQXlELEVBQ3JGLENBQUM7Z0NBQ0csT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUNqSCxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDMUIsTUFBTSxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7Z0NBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNuRSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3ZGLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7d0JBQ0wsQ0FBQzs7NEJBQU0sT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pELENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBQ0osT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBc0MsRUFBRSxRQUEwRCxFQUFFLFVBQWU7b0JBQ3pJLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUF1QyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXhHLE9BQU8sQ0FBQyxJQUFJLENBQXVDLGNBQWMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lCQUNuRyxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUNoQixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25ELE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3BELE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsT0FBTyw0REFBb0QsQ0FBQzt3QkFDM0csSUFBSSxPQUFPLENBQUMsVUFBVSxzREFBOEMsRUFBRSxDQUFDOzRCQUNuRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxpRUFBeUQsRUFBRSxDQUFDO2dDQUNwRixPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUM3RCxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDMUIsTUFBTSxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7Z0NBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNuRSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3ZGLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7d0JBQ0wsQ0FBQzs7NEJBQU0sT0FBQSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pELENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBQ0osT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBc0M7b0JBQzNELE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsY0FBYyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BHLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3hFLENBQUM7Z0JBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFzQztvQkFDM0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxjQUFjLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDeEUsQ0FBQztnQkFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQXNDLEVBQUUsSUFBcUQsRUFBRSxXQUFvQixFQUFFLE9BQWdCO29CQUU5SixPQUFPLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztvQkFDM0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNwQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO29CQUNqRCxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQ2hELElBQUksT0FBTzt3QkFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3JELFFBQVEsSUFBSSxFQUFFLENBQUM7d0JBQ1g7NEJBQ0ksT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7NEJBQzNGLE1BQU07d0JBQ1Y7NEJBQ0ksT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQy9DLE1BQU07b0JBQ2QsQ0FBQztvQkFDRCxpQkFBZSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBc0M7b0JBRS9ELFFBQVEsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFDaEQsQ0FBQzt3QkFDRzs0QkFDSSxpQkFBZSxDQUFDLGNBQWMsQ0FBQyxPQUFPLHNFQUE4RCxJQUFJLENBQUMsQ0FBQTs0QkFDekcsTUFBTTtvQkFDZCxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQXNDO29CQUVyRSxJQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7eUJBQzlILElBQUksQ0FBQyxVQUFVLE1BQU07d0JBQ2xCLElBQUksTUFBTSxJQUFJLElBQUksRUFDbEIsQ0FBQzs0QkFDRyxPQUFPLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs0QkFDL0IsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksRUFDdEMsQ0FBQztnQ0FDRyxRQUFRLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7b0NBQ3RDLEtBQUssQ0FBQzt3Q0FDRixpQkFBZSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dDQUNsRCxNQUFNO29DQUVWLEtBQUssQ0FBQzt3Q0FDRixpQkFBZSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dDQUNsRCxNQUFNO2dDQUNkLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUMsQ0FDSixDQUFDO2dCQUNOLENBQUM7Z0JBRU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQXNDO29CQUN6RSxRQUFRLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVyxFQUN6QyxDQUFDO3dCQUNHOzRCQUNJLElBQUksT0FBTyxHQUFHLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBYSxFQUFFLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBOzRCQUNySixRQUFRLE9BQU8sRUFBRSxDQUFDO2dDQUNkLEtBQUssQ0FBQztvQ0FDRixpQkFBZSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUMzQyxNQUFNO2dDQUVWO29DQUNJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQ0FDaEIsSUFBSSxPQUFPLElBQUksQ0FBQzt3Q0FBRSxNQUFNLEdBQUcsZUFBZSxDQUFBLENBQUMseUNBQXlDOzt3Q0FDL0UsTUFBTSxHQUFHLGVBQWUsQ0FBQSxDQUFDLHNEQUFzRDtvQ0FDcEYsaUJBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQ0FDMUYsTUFBTTs0QkFDZCxDQUFDOzRCQUNELE1BQU07d0JBRVY7NEJBQ0ksaUJBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDM0MsTUFBTTtvQkFDZCxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQXNDO29CQUN6RSxRQUFRLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVyxFQUN6QyxDQUFDO3dCQUNHOzRCQUNJLElBQUksS0FBSyxHQUFHLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFhLENBQUMsQ0FBQTs0QkFDaEgsSUFBSSxLQUFLLEdBQUcsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUNoRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN4QixJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCO2dDQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7NEJBQy9GLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7NEJBQ2pELE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7NEJBQ3pDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDeEQsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQzdCLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0NBQ2pELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXO29DQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dDQUMxRCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQ0FDdkUsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7NEJBQ3hCLENBQUM7NEJBQ0QsaUJBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVyxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUNsRixNQUFNO3dCQUVWOzRCQUNJLGlCQUFlLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3BELGlCQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDbEYsTUFBTTtvQkFDZCxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sTUFBTSxDQUFDLDBCQUEwQixDQUFDLE9BQXNDO29CQUUzRSxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQXlDLDRCQUE0QixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDcEksSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxxREFBNkMsQ0FBQzt3QkFDbkgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGNBQWMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixDQUFDO2dCQUVNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFzQztvQkFFbEUsUUFBUSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVcsRUFDekMsQ0FBQzt3QkFDRzs0QkFDSSxJQUFJLEtBQUssR0FBRyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBYSxDQUFDLENBQUE7NEJBQ2hILElBQUksS0FBSyxFQUNULENBQUM7Z0NBQ0csT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQzdHLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQzs0QkFDdEMsQ0FBQztpQ0FDSSxDQUFDO2dDQUNGLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQ2xJLENBQUM7NEJBQ0QsTUFBTTt3QkFFVjs0QkFDSSxzREFBc0Q7NEJBQ3RELE1BQU07b0JBQ2QsQ0FBQztvQkFFRCxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsQ0FBQzthQUNKLENBQUE7WUFyNUJZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQXE1QjNCO1lBcjVCWSxxQkFBZSxrQkFxNUIzQixDQUFBO1FBQ0wsQ0FBQyxFQXg1Qm9CLEtBQUssR0FBTCxTQUFLLEtBQUwsU0FBSyxRQXc1QnpCO0lBQUQsQ0FBQyxFQXg1QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXc1Qm5CO0FBQUQsQ0FBQyxFQXg1QlMsTUFBTSxLQUFOLE1BQU0sUUF3NUJmO0FDeDVCRCxJQUFVLE1BQU0sQ0EwRGY7QUExREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMERuQjtJQTFEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxVQUFVLENBMEQ5QjtRQTFEb0IsV0FBQSxVQUFVO1lBRTNCLFNBQWdCLGNBQWM7Z0JBQzFCLE9BQU87b0JBQ0gsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO29CQUNsRCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxNQUFNLEVBQUUsSUFBSTtpQkFDZixDQUFBO1lBQ0wsQ0FBQztZQVBlLHlCQUFjLGlCQU83QixDQUFBO1lBQ0QsU0FBZ0IsVUFBVTtnQkFDdEIsT0FBTztvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQjtvQkFDOUMsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQTtZQUNMLENBQUM7WUFQZSxxQkFBVSxhQU96QixDQUFBO1lBQ0QsU0FBZ0IsVUFBVTtnQkFDdEIsT0FBTztvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQjtvQkFDOUMsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQTtZQUNMLENBQUM7WUFQZSxxQkFBVSxhQU96QixDQUFBO1lBQ0QsU0FBZ0IsYUFBYTtnQkFDekIsT0FBTztvQkFDSCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxvQkFBb0I7b0JBQ3JDLEtBQUssRUFBRSxFQUFFO2lCQUVaLENBQUE7WUFDTCxDQUFDO1lBUGUsd0JBQWEsZ0JBTzVCLENBQUE7WUFDRCxTQUFnQixjQUFjO2dCQUMxQixPQUFPO29CQUNILElBQUksRUFBRSxZQUFZO29CQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLGlDQUFpQztvQkFDM0QsS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQTtZQUNMLENBQUM7WUFOZSx5QkFBYyxpQkFNN0IsQ0FBQTtZQUVELFNBQWdCLHNCQUFzQjtnQkFFbEMsT0FBTyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUs7cUJBQ3hDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQywwQkFBMEI7cUJBQzlGLFVBQVUsRUFBRTtxQkFDWixNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjtvQkFDMUcscUlBQXFJO3FCQUNwSSxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQztxQkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7cUJBQ3BELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO29CQUNwRCx3REFBd0Q7cUJBQ3RELE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLHdCQUF3QjtxQkFDekUsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUcsUUFBUSxFQUFHLENBQUM7cUJBQ25HLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRyxDQUFDLENBQUMsQ0FDOUY7WUFDVCxDQUFDO1lBZmUsaUNBQXNCLHlCQWVyQyxDQUFBO1FBQ0wsQ0FBQyxFQTFEb0IsVUFBVSxHQUFWLGNBQVUsS0FBVixjQUFVLFFBMEQ5QjtJQUFELENBQUMsRUExRGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBEbkI7QUFBRCxDQUFDLEVBMURTLE1BQU0sS0FBTixNQUFNLFFBMERmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuVnlwLkRpYWxvZ3Mge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3RldsWZZSBwcmVobGVkIHZ5cHJhdmVuY3ljaFxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yICBKU2luZGVsa2FcclxuICAgICAqIEBkYXRlICAgIDcuMS4yMDE5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtnY29udGVudH0gcGFyZW50Q29udGVudCBUaGUgY29udGVudC5cclxuICAgICAqIEBwYXJhbSB7P0dvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmk9R29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk5hdmlnYXRlfSBtb2RPdGV2cmVuaSBNw7NkIG90ZXbFmWVuw60gZGlhbG9ndS5cclxuICAgICAqIEBwYXJhbSB7IW9iamVjdH0gb3B0IFBhcmFtZXRyeSBkaWFsb2d1LlxyXG4gICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dW5kZWZpbmVkPn0gUHJvbWlzZS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE9wZW5Qcm92ZWRlbmFWeXByYXZlbmlEbGcoXHJcbiAgICAgICAgcGFyZW50Q29udGVudDogR0NvbnRlbnQsXHJcbiAgICAgICAgb3B0PzogeyBUcmlkVnlwOiBudW1iZXIsIFpwdXNvYkRvcjogV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bSB9LFxyXG4gICAgICAgIE1vZE90ZXZyZW5pPzogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaVxyXG4gICAgKTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgSWQ6IFwiUHJvdmVkZW5hVnlwcmF2ZW5pWmFzaWxla09ic2FoTGlzdFBhZ2UjXCIsXHJcbiAgICAgICAgICAgIFRyaWRWeXA6IG9wdCA/IG9wdC5UcmlkVnlwIDogXCJcIixcclxuICAgICAgICAgICAgWnB1c29iRG9yUHJvcDogb3B0ID8gb3B0LlpwdXNvYkRvciA6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcbiAgICAgICAgTW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuICAgICAgICBjb25zdCB3aW5kb3dQYXJhbXM6IEdEaWFsb2dPcHRpb25zIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgR29yZGljLkd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nKHBDb250ZW50LCBkZWZlcnJlZCwgJ0dvcmRpYy5WeXAuV2ViQ29udHJvbHMuUHJvdmVkZW5hVnlwcmF2ZW5pWmFzaWxla09ic2FoTGlzdFBhZ2UnLCBNb2RPdGV2cmVuaSwgb3B0aW9ucywgd2luZG93UGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEVkaXRhY2VaYXNpbGt5RGxnKFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIG9wdDogeyBkYXRhOiBXZmwuSW50ZXJmYWNlLkdFZGl0YWNlWmFzaWxreUR0byB9LFxyXG4gICAgICAgIE1vZE90ZXZyZW5pPzogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaVxyXG4gICAgKTogSlF1ZXJ5UHJvbWlzZTxXZmwuSW50ZXJmYWNlLkdFZGl0YWNlWmFzaWxreUR0bz4ge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJRDogXCJFZGl0YWNlWmFzaWxreURsZyNcIixcclxuICAgICAgICAgICAgRGF0YTogb3B0ID8gb3B0LmRhdGEgOiBudWxsLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcbiAgICAgICAgTW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2luZG93UGFyYW1zOiBHRGlhbG9nT3B0aW9ucyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIEdvcmRpYy5HdWkuRGlhbG9ncy5fb3BlbkRpYWxvZyhwQ29udGVudCwgZGVmZXJyZWQsICdHb3JkaWMuVnlwLldlYkNvbnRyb2xzLkVkaXRhY2VaYXNpbGt5RGxnJywgTW9kT3RldnJlbmksIG9wdGlvbnMsIHdpbmRvd1BhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcmVkcGxuZW5pWmFzaWxreURsZyhcclxuICAgICAgICBwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBvcHQ6IHsgZGF0YTogV2ZsLkludGVyZmFjZS5HUHJlZHBsbmVuaVphc2lsZWtEdG8gfSxcclxuICAgICAgICBNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuICAgICk6IEpRdWVyeVByb21pc2U8V2ZsLkludGVyZmFjZS5HUHJlZHBsbmVuaVphc2lsZWtEdG8+IHtcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgSUQ6IFwiUHJlZHBsbmVuaVphc2lsa3lEbGcjXCIsXHJcbiAgICAgICAgICAgIFByZWRwbG5lbmk6IG9wdCA/IG9wdC5kYXRhIDogbnVsbCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG4gICAgICAgIE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbmRvd1BhcmFtczogR0RpYWxvZ09wdGlvbnMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCAnR29yZGljLlZ5cC5XZWJDb250cm9scy5QcmVkcGxuZW5pWmFzaWxreURsZycsIE1vZE90ZXZyZW5pLCBvcHRpb25zLCB3aW5kb3dQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ2VuaWtTbHV6ZWJEbGcoXHJcbiAgICAgICAgcGFyZW50Q29udGVudDogR0NvbnRlbnQsXHJcbiAgICAgICAgTW9kT3RldnJlbmk/OiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApOiBKUXVlcnlQcm9taXNlPFdmbC5JbnRlcmZhY2UuR0VkaXRhY2VaYXNpbGt5RHRvPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIElEOiBcIkdDZW5pa1NsdXplYkRsZyNcIixcclxuICAgICAgICAgICAgVHlwOiBXZmwuSW50ZXJmYWNlLlR5cENlbmlrdVBvc3R5LmNlbmlrUG9zdG92bmljaFNsdXplYlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcbiAgICAgICAgTW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2luZG93UGFyYW1zOiBHRGlhbG9nT3B0aW9ucyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIEdvcmRpYy5HdWkuRGlhbG9ncy5fb3BlbkRpYWxvZyhwQ29udGVudCwgZGVmZXJyZWQsICdHb3JkaWMuVnlwLldlYkNvbnRyb2xzLkdDZW5pa0RsZycsIE1vZE90ZXZyZW5pLCBvcHRpb25zLCB3aW5kb3dQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ2VuaWtaYXNpbGVrRGxnKFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIE1vZE90ZXZyZW5pPzogR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaVxyXG4gICAgKTogSlF1ZXJ5UHJvbWlzZTxXZmwuSW50ZXJmYWNlLkdFZGl0YWNlWmFzaWxreUR0bz4ge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJRDogXCJDZW5pa1phc2lsZWtEbGcjXCIsXHJcbiAgICAgICAgICAgIFR5cDogV2ZsLkludGVyZmFjZS5UeXBDZW5pa3VQb3N0eS5jZW5pa1phc2lsZWtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG4gICAgICAgIE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbmRvd1BhcmFtczogR0RpYWxvZ09wdGlvbnMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCAnR29yZGljLlZ5cC5XZWJDb250cm9scy5HQ2VuaWtEbGcnLCBNb2RPdGV2cmVuaSwgb3B0aW9ucywgd2luZG93UGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEVkaXRhY2VQb2xvemt5Q2VuaWt1RGxnKFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIG9wdDogeyBEZXRhaWw6IFdmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlEZXRhaWxEdG8gfSxcclxuICAgICAgICBNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuICAgICk6IEpRdWVyeVByb21pc2U8V2ZsLkludGVyZmFjZS5HQ2VuaWtQb3N0eURldGFpbER0bz4ge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJRDogXCJFZGl0YWNlUG9sb3preUNlbmlrdURsZyNcIixcclxuICAgICAgICAgICAgRGV0YWlsOiBvcHQgPyBvcHQuRGV0YWlsIDogbnVsbCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG4gICAgICAgIE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbmRvd1BhcmFtczogR0RpYWxvZ09wdGlvbnMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCAnR29yZGljLlZ5cC5XZWJDb250cm9scy5FZGl0YWNlUG9sb3preUNlbmlrdURsZycsIE1vZE90ZXZyZW5pLCBvcHRpb25zLCB3aW5kb3dQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuKiBhdXRvbWF0aWNrZSB1a2xhZGFuaVxyXG4qXHJcbiogQGF1dGhvciAgSlNpbmRlbGthXHJcbiogQGRhdGUgICAgMjIuMTEuMjAxOVxyXG4qXHJcbiogQHBhcmFtIHtnY29udGVudH0gcGFyZW50Q29udGVudCBUaGUgY29udGVudC5cclxuKiBAcGFyYW0gez9Hb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pPUdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5OYXZpZ2F0ZX0gbW9kT3RldnJlbmkgTcOzZCBvdGV2xZllbsOtIGRpYWxvZ3UuXHJcbiogQHBhcmFtIHshb2JqZWN0fSBvcHQgUGFyYW1ldHJ5IGRpYWxvZ3UuXHJcbiogQHJldHVybnMge0pRdWVyeVByb21pc2U8dW5kZWZpbmVkPn0gUHJvbWlzZS5cclxuKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBEYXRhTWF0cml4Q3RlY2thQ2FsbERsZyhcclxuICAgICAgICBwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBvcHQ/OiB7IERhdGFNYXRyaXhEdG86IFdmbC5JbnRlcmZhY2UuR0RhdGFNYXRyaXhEdG87IH0sXHJcbiAgICAgICAgTW9kT3RldnJlbmk/OiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApOiBKUXVlcnlQcm9taXNlPFdmbC5JbnRlcmZhY2UuR0RhdGFNYXRyaXhEdG8gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJZDogXCJEYXRhTWF0cml4Q3RlY2thRGxnI1wiLFxyXG4gICAgICAgICAgICBEYXRhTWF0cml4RHRvOiBvcHQgPyBvcHQuRGF0YU1hdHJpeER0byA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgY29uc3QgcENvbnRlbnQgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5aa29udHJvbHVqQ29udGVudChwYXJlbnRDb250ZW50KTtcclxuICAgICAgICBNb2RPdGV2cmVuaSA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlVwcmF2TW9kT3RldnJuaShwQ29udGVudCwgTW9kT3RldnJlbmkpO1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd1BhcmFtczogR0RpYWxvZ09wdGlvbnMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCAnR29yZGljLlZ5cC5XZWJDb250cm9scy5EYXRhTWF0cml4Q3RlY2thRGxnJywgTW9kT3RldnJlbmksIG9wdGlvbnMsIHdpbmRvd1BhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuSWNvbnNcclxue1xyXG4gICAgZXhwb3J0IGVudW0gQWN0aW9uRW51bVxyXG4gICAge1xyXG4gICAgICAgIGZyYW5rb3ZhbmlPbmxpbmUgPSBcImZhLXBlbmNpbC1zcXVhcmUtb1wiLFxyXG4gICAgICAgIGZyYW5rb3ZhbmlPZmZsaW5lID0gXCJmYS1saW5rXCIsXHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXNcclxue1xyXG4gICAgZXhwb3J0IGVudW0gQWN0aW9uc05hbWUge1xyXG4gICAgICAgIFZ5cHJhdml0ID0gXCJhY3RWeXByYXZpdFwiLFxyXG4gICAgICAgIE92ZXJpdEFkcmVzYXR5ID0gXCJhY3RPdmVyaXRBZHJlc2F0eVwiLFxyXG4gICAgICAgIEZyYW5rb3ZhbmlPbmxpbmUgPSBcImFjdEZyYW5rb3ZhbmlPbmxpbmVcIixcclxuICAgICAgICBGcmFua292YW5pT2ZmbGluZSA9IFwiYWN0RnJhbmtvdmFuaU9mZmxpbmVcIixcclxuICAgICAgICBQcmV2eml0U0ZyYW5rb3ZhbmltID0gXCJhY3RQcmV2eml0U0ZyYW5rb3ZhbmltXCIsXHJcbiAgICAgICAgSW1wb3J0RGF0RXBhUG9zdHkgPSBcImFjdEltcG9ydERhdEVwYVBvc3R5XCIsXHJcbiAgICAgICAgVGlza1BvZGFjaWhvQXJjaHUgPSBcImFjdFRpc2tQb2RhY2lob0FyY2h1XCIsXHJcbiAgICAgICAgVGlza0V2aWRMaXN0UG9zdG92bmVobyA9IFwiYWN0VGlza0V2aWRMaXN0UG9zdG92bmVob1wiLFxyXG4gICAgICAgIFRpc2tLbmloeVZ5cHJhdmVuZVBvc3R5ID0gXCJhY3RUaXNrS25paHlWeXByYXZlbmVQb3N0eVwiLFxyXG4gICAgICAgIFRpc2tWeWthenUgPSBcImFjdFRpc2tWeWthenVcIixcclxuICAgICAgICBUaXNrTmFrbGFkdSA9IFwiYWN0VGlza05ha2xhZHVcIixcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZXhwb3J0IGVudW0gVHlwVGlza3VQb2RhY2lob0FyY2h1IHtcclxuICAgICAgICBuZXRpc2tub3UgPSAwLFxyXG4gICAgICAgIHRpc2tub3V0ID0gMTAsXHJcbiAgICAgICAgdGlza25vdXREb3BvcnVjZW5lID0gMzAsXHJcbiAgICAgICAgdGlza25vdXREb1phaHJhbmljaSA9IDUwLFxyXG4gICAgICAgIHRpc2tub3V0RG9aYWhyYW5pY2lEb3BvcnVjZW5lID0gNjAsXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5WeXAuV2ViQ29udHJvbHMuU3RhcnRQYWdlLnRzICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSDFoGluZGVsa2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTAxLTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlZ5cC5PdGhlcnNcclxue1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBTdGFydFBhZ2UgZXh0ZW5kcyBHQ29udGVudEJhc2U8V2ZsLkFDLldmbEJhc2VBQz5cclxuICAgIHtcclxuICAgICAgICBtb2RlbDogV2ZsLkludGVyZmFjZS5HV2ZsU291aHJuSW5mb0Jhc2VEdG87XHJcbiAgICAgICAgc2NvcmVjYXJkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICAgICAgZGl2U2VjdGlvbjA6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGl2U2VjdGlvbjE6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGl2U2VjdGlvbjI6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5TZXREYXRhKCk7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gJChcIjxkaXY+XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJmbGV4XCIpLmNzcyhcImFsaWduLWl0ZW1zXCIsIFwic3RyZXRjaFwiKS5jc3MoXCJhbGlnbi1jb250ZW50XCIsIFwic3RyZXRjaFwiKS5jc3MoXCJmbGV4LXdyYXBcIiwgXCJ3cmFwXCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGRpdi53aWR0aChcIjEwMCVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjAgPSAkKFwiPGRpdj5cIikud2lkdGgoXCIxMDAlXCIpLmFwcGVuZFRvKGRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjEgPSAkKFwiPGRpdj5cIikud2lkdGgoXCIzMDBweFwiKS5jc3MoXCJtaW4td2lkdGhcIiwgXCIzMDBweFwiKS5jc3MoXCJtYXgtd2lkdGhcIiwgXCIzMjBweFwiKS5jc3MoXCJmbGV4LWdyb3dcIiwgXCIxXCIpLmFwcGVuZFRvKGRpdik7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2U2VjdGlvbjIgPSAkKFwiPGRpdj5cIikuY3NzKFwiZmxleC1ncm93XCIsIFwiM1wiKS5hcHBlbmRUbyhkaXYpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRNb2R1bGVJbmZvVG9TdGF0aXN0aWt5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFwcGVuZFRvRGl2OiB0aGlzLmRpdlNlY3Rpb24wLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hemV2UmVmOiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuTmF6ZXZSZWYhLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hemV2RnVuOiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuTmF6ZXZGdW4hLFxyXG4gICAgICAgICAgICAgICAgICAgIFphc3R1cFR4dDogdGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8hLlphc3R1cFR4dCEsXHJcbiAgICAgICAgICAgICAgICAgICAgWmtyYXRrYVN1OiB0aGlzLm1vZGVsLkxvZ2luSW5mb0R0byEuWmtyYXRrYVN1ISxcclxuICAgICAgICAgICAgICAgICAgICBEYXRMb2dpblR4dDogdGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8hLkRhdExvZ2luVHh0ISxcclxuICAgICAgICAgICAgICAgICAgICBJbWFnZTogR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0LmNyZWF0ZU1vZHVsZUljb24odGhpcy5tb2RlbC5Mb2dpbkluZm9EdG8uRmF6ZUdpbmlzdU5hemV2ISksXHJcbiAgICAgICAgICAgICAgICAgICAgUHJpbWFyeVRleHQ6IHRoaXMubW9kZWwuTG9naW5JbmZvRHRvLkZhemVHaW5pc3VQb3BpcyEgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLlV0aWxzLkxvYWRNb2R1bGVJbmZvVG9TdGF0aXN0aWt5KG9wdE1vZHVsZUluZm9Ub1N0YXRpc3Rpa3kpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5HZW5lcmF0ZUtwaSgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFDLldmbEJhc2VBQy5Jbml0Q29udHJvbCh0aGlzKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5BQy5XZmxCYXNlQUMuQ29tcGxldGVNZW51KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2VuZXJhdGVLcGkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcbiAgICAgXHJcbiAgICAgICAgU2hvd0NvdW50cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIExvYWREYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuVnlwLldlYkNvbnRyb2xzLlZ5cHJhdmVuaVNldHRpbmdzRm9ybS50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrSB6w6FzaWxlay4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEpTaW5kZWxrYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxOCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE4LTA1LTIyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlZ5cC5BcHBTZXR0aW5ncyB7XHJcbiAgICAvKipcclxuICAgICAqIENlc3RhIGsgb2JqZXR1IG5hc3RhdmVuw60gesOhc2lsa3kgdiBHU3RvcmUuXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgIEpTaW5kZWxrYVxyXG4gICAgICogQGRhdGUgICAgMzAuMDQuMjAxOVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY29uc3QgVnlwQmFzZVNldHRpbmdzUGF0aCA9IFwiR2xvYmFsLlZ5cC5BcHBTZXR0aW5ncy5WeXBCYXNlU2V0dGluZ3NcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnLDoXTDrSBob2Rub3R5IHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHrDoXNpbGt5LlxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgIEpTaW5kZWxrYVxyXG4gICAgICogQGRhdGUgICAgMzAuMDQuMjAxOVxyXG4gICAgICogIFxyXG4gICAgICogQHJldHVybnMge0dvcmRpYy5WeXAuV2ViQ29udHJvbHMuR1Z5cEJhc2VTZXR0aW5nc0R0b30gSG9kbm90eSB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSB6w6FzaWxreS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldFZ5cEJhc2VTZXR0aW5ncygpOiBHb3JkaWMuVnlwLldlYkNvbnRyb2xzLkdWeXBCYXNlU2V0dGluZ3NEdG8ge1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzOiBHb3JkaWMuVnlwLldlYkNvbnRyb2xzLkdWeXBCYXNlU2V0dGluZ3NEdG8gfCBudWxsIHwgdW5kZWZpbmVkID0gKHdpbmRvdyBhcyBhbnkpLmdzdG9yLmdldChWeXBCYXNlU2V0dGluZ3NQYXRoLCB0cnVlKTtcclxuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2eml0X2RsZV9pZF9hdXRvbWF0aWNreTogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYXN0YXbDrSBob2Rub3R5IHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHrDoXNpbGt5LlxyXG4gICAgICogIFxyXG4gICAgICogQGF1dGhvciAgSlNpbmRlbGthXHJcbiAgICAgKiBAZGF0ZSAgICAzMC4wNC4yMDE5XHJcbiAgICAgKiAgXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5WeXAuQXBwU2V0dGluZ3MuR1Z5cEJhc2VTZXR0aW5nc0R0byB8IG51bGx9IHZhbHVlIEhvZG5vdHkgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60gesOhc2lsa3kuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTZXRWeXBCYXNlU2V0dGluZ3ModmFsdWU6IEdvcmRpYy5WeXAuV2ViQ29udHJvbHMuR1Z5cEJhc2VTZXR0aW5nc0R0byB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuZ3N0b3Iuc2V0KFZ5cEJhc2VTZXR0aW5nc1BhdGgsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcm11bMOhxZkgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60gdnlwcmF2ZW7DrS5cclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yICBKU2luZGVsa2FcclxuICAgICAqIEBkYXRlICAgIDMwLjA0LjIwMTlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZ5cEJhc2VTZXR0aW5nc0Zvcm0oKTogRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgY29uc3QgZm9ybU5hbWUgPSBcIlZ5cEJhc2VTZXR0aW5nc0Zvcm1cIjtcclxuICAgICAgICBsZXQgbW9kZWxQcm9wZXJ0eTogKGtleW9mIEdvcmRpYy5WeXAuV2ViQ29udHJvbHMuR1Z5cEJhc2VTZXR0aW5nc0R0bykgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICBuYW1lOiBmb3JtTmFtZSxcclxuICAgICAgICAgICAgdGFiT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyMzkwMDEzMFwiLCAvL1JDIDIzOTAwMTMwIDogWsOha2xhZG7DrSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGFzIGFueSk7XHJcblxyXG4gICAgICAgIGZvcm0uYWRkU2VjdGlvbihcImpyZXM6MjM5MDAxNDFcIikgLy9SQyAyMzkwMDE0MSA6IFN0YXJ0IGFwbGlrYWNlXHJcbiAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IFwic3B1c3RpdFBvc2xlZG5pVGFza1wiLCBtb2RlbDogVnlwQmFzZVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInNwdXN0aXRQb3NsZWRuaVRhc2tcIiksIGxhYmVsOiBcImpyZXM6MjM5MDAxNDJcIiB9KTsgLy9SQyAyMzkwMDE0MiA6IFNwdXN0aXQgcG9zbGVkbsOtIG90ZXbFmWVub3Ugw7psb2h1XHJcblxyXG4gICAgICAgIGZvcm0uYWRkU2VjdGlvbihcImpyZXM6MjM5MDAxMzFcIikgLy9SQyAyMzkwMDEzMSA6IEF1dG9tYXRpY2vDvSBwxZnDrWplbSB6w6FzaWxlayBkbGUgSURcclxuICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogXCJwcmV2eml0X2RsZV9pZF9hdXRvbWF0aWNreVwiLCBtb2RlbDogVnlwQmFzZVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInByZXZ6aXRfZGxlX2lkX2F1dG9tYXRpY2t5XCIpLCBsYWJlbDogXCJqcmVzOjIzOTAwMTMyXCIgfSk7IC8vUkMgMjM5MDAxMzIgOiBab2JyYXppdCBva25vIHBybyBrb250cm9sdSB6w6FzaWxreSBhIHDFmWV2esOtdFxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5WeXAuV2ViQ29udHJvbHMuVnlwcmF2ZW5pU2V0dGluZ3NGb3JtLnRzICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtIHrDoXNpbGVrLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSlNpbmRlbGthICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE4ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTgtMDUtMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuVnlwLkFwcFNldHRpbmdzIHtcclxuXHJcbiAgICBlbnVtIGZpZWxkTmFtZXMge1xyXG4gICAgICAgIHN0YXQgPSBcInN0YXRcIixcclxuICAgICAgICBwc2MgPSBcInBzY1wiLFxyXG4gICAgICAgIGZyYW5rb3ZhbmlfcG9kYWNpX2Npc2xvID0gXCJmcmFua292YW5pX3BvZGFjaV9jaXNsb1wiLFxyXG4gICAgICAgIGZyYW5rb3ZhbmlfcHJldHJpZGl0ID0gXCJmcmFua292YW5pX3ByZXRyaWRpdFwiLFxyXG4gICAgICAgIHRyaWRpdF9kbGVfc291Ym9ydSA9IFwidHJpZGl0X2RsZV9zb3Vib3J1XCIsXHJcbiAgICAgICAga29udHJvbG92YXRfc3ByYXZub3N0X2RsZV9zb3Vib3J1ID0gXCJrb250cm9sb3ZhdF9zcHJhdm5vc3RfZGxlX3NvdWJvcnVcIixcclxuICAgICAgICBvcHJhdml0X2RhdGFfZGxlX3NvdWJvcnUgPSBcIm9wcmF2aXRfZGF0YV9kbGVfc291Ym9ydVwiLFxyXG4gICAgICAgIHBvdXppdmF0X3NvdWJvcl9iZXpfcGlkdSA9IFwicG91eml2YXRfc291Ym9yX2Jlel9waWR1XCIsXHJcbiAgICAgICAgZnJhbmtvdmF0X3ByaV9wcmV2emV0aSA9IFwiZnJhbmtvdmF0X3ByaV9wcmV2emV0aVwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDZXN0YSBrIG9iamV0dSBuYXN0YXZlbsOtIHrDoXNpbGt5IHYgR1N0b3JlLlxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yICBKU2luZGVsa2FcclxuICAgICAqIEBkYXRlICAgIDMwLjA0LjIwMTlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCA9IFwiR2xvYmFsLlZ5cC5BcHBTZXR0aW5ncy5WeXByYXZlbmlTZXR0aW5nc1wiXHJcblxyXG4gICAgLyoqXHJcbiAqIFZyw6F0w60gaG9kbm90eSB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSB6w6FzaWxreS5cclxuICpcclxuICogQGF1dGhvciAgSlNpbmRlbGthXHJcbiAqIEBkYXRlICAgIDMwLjA0LjIwMTlcclxuICogIFxyXG4gKiBAcmV0dXJucyB7R29yZGljLlZ5cC5XZWJDb250cm9scy5HVnlwcmF2ZW5pU2V0dGluZ3NEdG99IEhvZG5vdHkgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60gesOhc2lsa3kuXHJcbiAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldFZ5cHJhdmVuaVNldHRpbmdzKGNvbnRlbnQ6IEdDb250ZW50KTogR29yZGljLldmbC5JbnRlcmZhY2UuR1Z5cHJhdmVuaVNldHRpbmdzRHRvXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3M6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdWeXByYXZlbmlTZXR0aW5nc0R0byB8IG51bGwgfCB1bmRlZmluZWQgPSBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoVnlwcmF2ZW5pU2V0dGluZ3NQYXRoLCB0cnVlKTtcclxuICAgICAgICBpZiAoc2V0dGluZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3phOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dF9wcmVkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcG9zbGVkbmlQb2RhY2lDaXNsbzogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvcGxhdGVrOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdmFoYTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0YXQ6IDQyLFxyXG4gICAgICAgICAgICAgICAgcHNjOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZG90YXpfcHJpX3Z5cHJhdmVuaTogdHJ1ZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYXN0YXbDrSBob2Rub3R5IHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHrDoXNpbGt5LlxyXG4gICAgICogIFxyXG4gICAgICogQGF1dGhvciAgSlNpbmRlbGthXHJcbiAgICAgKiBAZGF0ZSAgICAzMC4wNC4yMDE5XHJcbiAgICAgKiAgXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5WeXAuQXBwU2V0dGluZ3MuSUdWeXByYXZlbmlTZXR0aW5ncyB8IG51bGx9IHZhbHVlIEhvZG5vdHkgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60gesOhc2lsa3kuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTZXRWeXByYXZlbmlTZXR0aW5ncyhjb250ZW50OiBHQ29udGVudCwgdmFsdWU6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdWeXByYXZlbmlTZXR0aW5nc0R0byB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5tZXJnZShWeXByYXZlbmlTZXR0aW5nc1BhdGgsIHZhbHVlISk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtdWzDocWZIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHZ5cHJhdmVuw60uXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciAgSlNpbmRlbGthXHJcbiAgICAgKiBAZGF0ZSAgICAzMC4wNC4yMDE5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBWeXByYXZlbmlTZXR0aW5nc0Zvcm0oKTogRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgY29uc3QgZm9ybU5hbWUgPSBcIlZ5cHJhdmVuaVNldHRpbmdzRm9ybVwiO1xyXG4gICAgICAgIGxldCBtb2RlbFByb3BlcnR5OiAoa2V5b2YgR29yZGljLldmbC5JbnRlcmZhY2UuR1Z5cHJhdmVuaVNldHRpbmdzRHRvKSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgIG5hbWU6IGZvcm1OYW1lLFxyXG4gICAgICAgICAgICB0YWJPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjIzOTAwMDU1XCIsIC8vUkMgMjM5MDAwNTUgOiBWeXByYXZlbsOtIHrDoXNpbGVrXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGFzIGFueSk7XHJcblxyXG4gICAgICAgIC8vTmFzdGF2ZW7DrSBwb8SNw6F0ZcSNbsOtY2ggaG9kbm90IHBybyB2eXByYXZlbsOtIHrDoXNpbGVrXHJcbiAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwianJlczoyMzkwMDEzOFwiKSAvL1JDIDIzOTAwMTM4IDogTmFzdGF2ZW7DrSBjaG92w6Fuw60gYXBsaWthY2UgcMWZaSB2eXByYXZlbsOtIHrDoXNpbGVrXHJcbiAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IFwiemFzaWxreV9rX3Z5cHJhdmVuaV9uZW96bmFjb3ZhdFwiLCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwiemFzaWxreV9rX3Z5cHJhdmVuaV9uZW96bmFjb3ZhdFwiKSwgbGFiZWw6IFwianJlczoyMzkwMDEzOVwiIH0pOyAvL1JDIDIzOTAwMTM5IDogWsOhc2lsa3kgayB2eXByYXZlbsOtIHN0YW5kYXJkbsSbIG5lb3puYcSNb3ZhdFxyXG4gICAgICAgIGZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJcIiwgeyBuYW1lOiBcImRvdGF6X3ByaV92eXByYXZlbmlcIiwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcImRvdGF6X3ByaV92eXByYXZlbmlcIiksIGxhYmVsOiBcImpyZXM6MjM5MDAxNDBcIiB9KTsgLy9SQyAyMzkwMDE0MCA6IERvdGF6IG5hIHBvdHZyemVuw60gb3BlcmFjZSB2eXByYXZlbsOtXHJcblxyXG4gICAgICAgIGZvcm0uYWRkU2VjdGlvbihcImpyZXM6MjM5MDAwNTZcIikgLy9SQyAyMzkwMDA1NiA6IE5hc3RhdmVuw60gcG/EjcOhdGXEjW7DrWNoIGhvZG5vdCBwcm8gdnlwcmF2ZW7DrSB6w6FzaWxla1xyXG4gICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDAyMVwiICsgXCIsIFwiICsgXCJqcmVzOjIzOTAwMDIyXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNwc2MoKSwgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGZpZWxkTmFtZXMucHNjLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInBzY1wiKSArIFwiPXZhbHVlLnBzYzsgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInN0YXRcIikgKyBcIj12YWx1ZS5zdGF0XCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQgJiYgaW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdEZpZWxkID0gJChldmVudC50YXJnZXQpLmdmb3JtKCkuZmluZEZvcm1zKGZvcm1OYW1lKS5maW5kRmllbGRzKGZpZWxkTmFtZXMuc3RhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRGaWVsZC5nZmllbGQ8R29yZGljLkRhdGEuUmVhZGVycy5HaW5jc3RhRHRvPihcInNldEluaXRpYWxcIiwgeyBzdGF0OiBpbnB1dC52YWx1ZS5zdGF0IH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pIC8vUkMgMjM5MDAwMjEgOiBQU8SMXHJcblxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jc3RhKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGZpZWxkTmFtZXMuc3RhdCwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInN0YXRcIikgKyBcIj12YWx1ZS5zdGF0XCJcclxuICAgICAgICAgICAgfSkgLy9SQyAyMzkwMDAyMiA6IFN0w6F0XHJcbiAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IFwibm92ZVBvZGFjaUNpc2xvXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJub3ZlUG9kYWNpQ2lzbG9cIiksIGxhYmVsOiBcImpyZXM6MjM5MDAxODlcIiB9KTsgLy9SQyAyMzkwMDE4OSA6IE5vdsOpIHBvZGFjw60gxI3DrXNsb1xyXG5cclxuICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMjNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZG9zKCksIHsgbmFtZTogXCJkb3Jfc2x1emJhXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJkb3Jfc2x1emJhXCIpICsgXCI9dmFsdWUuZG9yX3NsdXpiYVwifSkgLy9SQyAyMzkwMDAyMyA6IERvcnXEjW92YWPDrSBzbHXFvmJhXHJcblxyXG4gICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDA0M1wiICsgXCIsIFwiICsgXCJqcmVzOjIzOTAwMDQ0XCIgKyBcIiwgXCIgKyBcImpyZXM6MjM5MDAwNDVcIikgLy9SQyAyMzkwMDA0NiA6IE5vdsOpIHBvZC4gxI3DrXNsb1xyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJ0ZXh0X3ByZWRcIiwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInRleHRfcHJlZFwiKSB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJwb3NsZWRuaVBvZGFjaUNpc2xvXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJwb3NsZWRuaVBvZGFjaUNpc2xvXCIpIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInRleHRfemFcIiwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInRleHRfemFcIikgfSlcclxuICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJcIiwgeyBuYW1lOiBcIm5vdmVQb2RhY2lDaXNsb1wiIH0pIFxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczoyMzkwMDAxNVwiICsgXCIsIFwiICsgXCJqcmVzOjIzOTAwMDE2XCIpIC8vUkMgMjM5MDAwMTUgOiBQb3BsYXRla1xyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJwb3BsYXRla1wiLCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwicG9wbGF0ZWtcIiksICBkZWNpbWFsczogNCwgbWluVmFsdWU6IDAsIG1heFZhbHVlOiA5OS45OTk5IH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInZhaGFcIiwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcInZhaGFcIiksIGRlY2ltYWxzOiA0LCBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5Ljk5OTkgfSk7XHJcblxyXG4gICAgICAgIC8vRnJhbmtvdsOhbsOtXHJcbiAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwianJlczoyMzkwMDExNlwiKTsvL1JDIDIzOTAwMTE2IDogRnJhbmtvdsOhbsOtXHJcbiAgICAgICAgZm9ybS5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjIzOTAwMTI0XCIgfSkuYWRkRmllbGQoXCJncmFkaW9cIiwgeyAvL1JDIDIzOTAwMTI0IDogVHlwXHJcbiAgICAgICAgICAgIG5hbWU6IFwidHlwX2ZyYW5rb3ZhbmlcIixcclxuICAgICAgICAgICAvLyBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwidHlwX2ZyYW5rb3ZhbmlcIiksXHJcbiAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjogIC8vIG5hcGxuZW5pIG11bHRpdmFsdWUgcG9saWNrYSB6IERUT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF92YWwgPSBkdG8uR2xvYmFsLlZ5cC5BcHBTZXR0aW5ncy5WeXByYXZlbmlTZXR0aW5ncy50eXBfZnJhbmtvdmFuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfdmFsID09IG51bGwpIGxfdmFsID0gV2ZsLkludGVyZmFjZS5UeXBGcmFua292YWNpaG9TdHJvamUubmV1cmNlbm87ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbF92YWwpOyAvL2RzZWJlc3RhIDE5LjA1LjIwMjJcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGxfdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJjb25maXJtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogLy8gbmFwbG5lbmkgRFRPIGhvZG5vdG91IHogbXVsdGl2YWx1ZSBwb2xpY2thICh2cmFjaSB2emR5IHBvbGUpICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9wbyA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGxfcG8gIT0gbnVsbCkgR29yZGljLlV0aWxzLnNldFZhbHVlQnlLZXlQYXRoKFwiR2xvYmFsLlZ5cC5BcHBTZXR0aW5ncy5WeXByYXZlbmlTZXR0aW5ncy50eXBfZnJhbmtvdmFuaVwiLCBkdG8sIGxfcG8pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9wbyAhPSBudWxsKSBHb3JkaWMuVXRpbHMuc2V0VmFsdWVCeUtleVBhdGgoVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwidHlwX2ZyYW5rb3ZhbmlcIiksIGR0bywgbF9wbykgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBcInR5cF9mcmFua292YW5pXCI7IFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogV2ZsLkludGVyZmFjZS5UeXBGcmFua292YWNpaG9TdHJvamUubmV1cmNlbm8sIGxhYmVsOiAnanJlczoyMzkwMDExOScgfSwgLy9SQyAyMzkwMDExOSA6IMW9w6FkbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogV2ZsLkludGVyZmFjZS5UeXBGcmFua292YWNpaG9TdHJvamUuRnJhbWFTb3Vib3IsIGxhYmVsOiAnanJlczoyMzkwMDEyMCcgfSwgLy9SQyAyMzkwMDEyMCA6IEZyYW1hIC0gaW1wb3J0IHplIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBXZmwuSW50ZXJmYWNlLlR5cEZyYW5rb3ZhY2lob1N0cm9qZS5OZW9wb3N0RGF0YU1hdHJpeEN0ZWNrYSwgbGFiZWw6ICdqcmVzOjIzOTAwMTE4JyB9LCAvL1JDIDIzOTAwMTE4IDogRGF0YS1tYXRyaXhvdsOhIDJEIMSNdGXEjWthXHJcbiAgICAgICAgICAgIF0sIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBpbnB1dClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsX2Rpc2FibGVEYXRhTWF0cml4U2V0dGluZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxfZGlzYWJsZUZyYW1hRmlsZVNldHRpbmdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGlucHV0LnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cEZyYW5rb3ZhY2lob1N0cm9qZS5OZW9wb3N0RGF0YU1hdHJpeEN0ZWNrYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGlzYWJsZURhdGFNYXRyaXhTZXR0aW5ncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBGcmFua292YWNpaG9TdHJvamUuRnJhbWFTb3Vib3I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2Rpc2FibGVGcmFtYUZpbGVTZXR0aW5ncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX2Zvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxfZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxfZm9ybS5maW5kRmllbGRzKGZpZWxkTmFtZXMudHJpZGl0X2RsZV9zb3Vib3J1KS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2Rpc2FibGVGcmFtYUZpbGVTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbF9mb3JtLmZpbmRGaWVsZHMoZmllbGROYW1lcy5rb250cm9sb3ZhdF9zcHJhdm5vc3RfZGxlX3NvdWJvcnUpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfZGlzYWJsZUZyYW1hRmlsZVNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBsX2Zvcm0uZmluZEZpZWxkcyhmaWVsZE5hbWVzLm9wcmF2aXRfZGF0YV9kbGVfc291Ym9ydSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9kaXNhYmxlRnJhbWFGaWxlU2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxfZm9ybS5maW5kRmllbGRzKGZpZWxkTmFtZXMucG91eml2YXRfc291Ym9yX2Jlel9waWR1KS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2Rpc2FibGVGcmFtYUZpbGVTZXR0aW5ncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxfZm9ybS5maW5kRmllbGRzKGZpZWxkTmFtZXMuZnJhbmtvdmFuaV9wcmV0cmlkaXQpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfZGlzYWJsZURhdGFNYXRyaXhTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbF9mb3JtLmZpbmRGaWVsZHMoZmllbGROYW1lcy5mcmFua292YW5pX3BvZGFjaV9jaXNsbykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9kaXNhYmxlRGF0YU1hdHJpeFNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBsX2Zvcm0uZmluZEZpZWxkcyhmaWVsZE5hbWVzLmZyYW5rb3ZhdF9wcmlfcHJldnpldGkpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfZGlzYWJsZURhdGFNYXRyaXhTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7ICBcclxuXHJcbiAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IGZpZWxkTmFtZXMudHJpZGl0X2RsZV9zb3Vib3J1LCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IGZpZWxkTmFtZXMudHJpZGl0X2RsZV9zb3Vib3J1KSwgbGFiZWw6IFwianJlczoyMzkwMDE0M1wiIH0pOyAvL1JDIDIzOTAwMTQzIDogVMWZw61kaXQgesOhc2lsa3kgZGxlIHNvdWJvcnVcclxuICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogZmllbGROYW1lcy5rb250cm9sb3ZhdF9zcHJhdm5vc3RfZGxlX3NvdWJvcnUsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gZmllbGROYW1lcy5rb250cm9sb3ZhdF9zcHJhdm5vc3RfZGxlX3NvdWJvcnUpLCBsYWJlbDogXCJqcmVzOjIzOTAwMTQ0XCIgfSk7IC8vUkMgMjM5MDAxNDQgOiBLb250cm9sb3ZhdCBzcHLDoXZub3N0IHrDoXNpbGVrIGRsZSBzb3Vib3J1XHJcbiAgICAgICAgZm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IGZpZWxkTmFtZXMub3ByYXZpdF9kYXRhX2RsZV9zb3Vib3J1LCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IGZpZWxkTmFtZXMub3ByYXZpdF9kYXRhX2RsZV9zb3Vib3J1KSwgbGFiZWw6IFwianJlczoyMzkwMDE0NVwiIH0pOyAvL1JDIDIzOTAwMTQ1IDogT3ByYXZpdCB6w6FzaWxreSB2IEdJTklTdSBkbGUgc291Ym9ydVxyXG4gICAgICAgIGZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJcIiwgeyBuYW1lOiBmaWVsZE5hbWVzLnBvdXppdmF0X3NvdWJvcl9iZXpfcGlkdSwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBmaWVsZE5hbWVzLnBvdXppdmF0X3NvdWJvcl9iZXpfcGlkdSksIGxhYmVsOiBcImpyZXM6MjM5MDAxNDZcIiB9KTsgLy9SQyAyMzkwMDE0NiA6IFBvdcW+w612YXQgc291Ym9yIGJleiBQSUTFr1xyXG5cclxuICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogZmllbGROYW1lcy5mcmFua292YW5pX3ByZXRyaWRpdCwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBmaWVsZE5hbWVzLmZyYW5rb3ZhbmlfcHJldHJpZGl0KSwgbGFiZWw6IFwianJlczoyMzkwMDEyMlwiIH0pOyAvL1JDIDIzOTAwMTIyIDogUMWZZXTFmcOtZGl0IGRsZSBmcmFua292w6Fuw61cclxuICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogZmllbGROYW1lcy5mcmFua292YW5pX3BvZGFjaV9jaXNsbywgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBmaWVsZE5hbWVzLmZyYW5rb3ZhbmlfcG9kYWNpX2Npc2xvKSwgbGFiZWw6IFwianJlczoyMzkwMDEyM1wiIH0pOyAvL1JDIDIzOTAwMTIzIDogU27DrW1hdCBpIHBvZGFjw60gxI3DrXNsb1xyXG5cclxuICAgICAgICAvL1Rpc2sgcG9kYWPDrWhvIGFyY2h1IGEgdsO9a2F6dVxyXG4gICAgICAgIGZvcm0uYWRkU2VjdGlvbihcImpyZXM6MjM5MDAxMDNcIikvL1JDIDIzOTAwMTAzIDogVGlzayBwb2RhY8OtaG8gYXJjaHUgYSB2w71rYXp1XHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjIzOTAwMDU3XCIpIC8vUkMgMjM5MDAwNTggOiBVxb5pdmF0ZWwgVlNcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IG5hbWU6IFwiY2lzbG9fcG9kYXZhdGVsZVwiLCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwiY2lzbG9fcG9kYXZhdGVsZVwiKSB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KCBcImpyZXM6MjM5MDAwNThcIikgLy9SQyAyMzkwMDA1OCA6IFXFvml2YXRlbCBWU1xyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJ1eml2YXRlbF92c1wiLCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwidXppdmF0ZWxfdnNcIikgfSk7XHJcbiAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMTM3XCIpIC8vUkMgMjM5MDAxMzcgOiDEjMOtc2xvIHrDoWthem5pY2vDqSBrYXJ0eSBvZGVzaWxhdGVsZVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJjaXNsb196YWthem5pY2tlX2thcnR5X29kZXNpbGF0ZWxlXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJjaXNsb196YWthem5pY2tlX2thcnR5X29kZXNpbGF0ZWxlXCIpIH0pO1xyXG4gICAgXHJcbiAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwianJlczoyMzkwMDA1OVwiKSAvL1JDIDIzOTAwMDU5IDogTmFzdGF2ZW7DrSBwcm8gZ2VuZXJvdsOhbsOtIGVsZWt0cm9uaWNrw6lobyBwb2RhY8OtaG8gYXJjaHUgKGVQQSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjM5MDAxMzRcIikgLy9SQyAyMzkwMDEzNCA6IElkZW50aWZpa2FjZSBwb2RhdmF0ZWxlIHBybyBlUEFcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IG5hbWU6IFwiZXBhX2lkZW50aWZpa2FjZV9wb2RhdmF0ZWxlXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJlcGFfaWRlbnRpZmlrYWNlX3BvZGF2YXRlbGVcIikgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjM5MDAxMzZcIikgLy9SQyAyMzkwMDEzNiA6IEptw6lubyBzb3Vib3J1IFsuQ1NWXVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJlcGFfam1lbm9fc291Ym9ydVwiLCBtb2RlbDogVnlwcmF2ZW5pU2V0dGluZ3NQYXRoICsgXCIuXCIgKyAobW9kZWxQcm9wZXJ0eSA9IFwiZXBhX2ptZW5vX3NvdWJvcnVcIikgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjM5MDAxMzVcIikgLy9SQyAyMzkwMDEzNSA6IMOaZGFqZSBvIG9kZXPDrWxhdGVsaSBwcm8gZVBBIHYgZGVmaW5vdmFuw6ltIGZvcm3DoXR1XHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImVwYV9kYXRhX29kZXNpbGF0ZWxlXCIsIG1vZGVsOiBWeXByYXZlbmlTZXR0aW5nc1BhdGggKyBcIi5cIiArIChtb2RlbFByb3BlcnR5ID0gXCJlcGFfZGF0YV9vZGVzaWxhdGVsZVwiKSB9KVxyXG5cclxuICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogXCJlcGFfamVkbm96bmFjbmVfam1lbm9cIiwgbW9kZWw6IFZ5cHJhdmVuaVNldHRpbmdzUGF0aCArIFwiLlwiICsgKG1vZGVsUHJvcGVydHkgPSBcImVwYV9qZWRub3puYWNuZV9qbWVub1wiKSAsIGxhYmVsOiBcImpyZXM6MjM5MDAwNjBcIiB9KTsgLy9SQyAyMzkwMDA2MCA6IEdlbmVyb3ZhdCBqZWRub3puYcSNbsOpIGptw6lub1xyXG5cclxuICAgICAgICAvLyBjZW5pa3lcclxuICAgICAgICBmb3JtLmFkZFNlY3Rpb24oXCJqcmVzOjIzOTAwMDk0XCIpIC8vUkMgMjM5MDAwOTQgOiBDZW7DrWt5XHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9ucGFuZWxcIiwge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2VuaWtTbHV6ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDA5M1wiLCAvL1JDIDIzOTAwMDkzIDogUG9wbGF0ZWsgemEgc2x1xb5ieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMDkzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldmVudCwgYWN0aW9uQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5WeXAuRGlhbG9ncy5DZW5pa1NsdXplYkRsZyh1bmRlZmluZWQgYXMgYW55LCBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdykgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDZW5pa1phc2lsZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDA5NVwiLCAvL1JDIDIzOTAwMDk1IDogUG9wbGF0ZWsgemEgesOhc2lsa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDA5M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXZlbnQsIGFjdGlvbkNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVnlwLkRpYWxvZ3MuQ2VuaWtaYXNpbGVrRGxnKHVuZGVmaW5lZCBhcyBhbnksIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG59IiwiXHJcbm5hbWVzcGFjZSBHb3JkaWMuVnlwLkFwcFNldHRpbmdzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVnlwUHJpbnRTZXR0aW5nc0Zvcm0gKCk6Rm9ybXMuRm9ybXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuXHJcbiAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogXCJWeXBQcmludFNldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcImpyZXM6MjM5MDAxNzRcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KSAvL1JDIDIzOTAwMTc0IDogVGlza1xyXG4gICAgICAgICAgICAuYWRkUm93KFwiXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVGlza1BvZEFyY2hcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjM5MDAxNzZcIiwgLy9SQyAyMzkwMDE3NiA6IEltcGxpY2l0bsSbIHRpc2tub3V0IHBvZGFjw60gYXJjaCAodsO9cHJhdm7DrSBwcm90b2tvbClcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5WeXAuQXBwU2V0dGluZ3MuUHJpbnRTZXR0aW5ncy5UaXNrUG9kQXJjaD12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH0iLCJuYW1lc3BhY2UgR29yZGljLlZ5cC5MaXN0c1xyXG57XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgRGF0YU1hdHJpeEN0ZWNrYURsZyBleHRlbmRzIEdDb250ZW50QmFzZTxXZmwuQUMuV2ZsQmFzZUFDPlxyXG4gICAge1xyXG4gICAgICAgIC8vIGZpbHRyIHNlem5hbXVcclxuICAgICAgICBtb2RlbDogV2ZsLkludGVyZmFjZS5HRGF0YU1hdHJpeER0bztcclxuICAgICAgICB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ3JlYXRlRm9ybSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb3JtU1BJU1BJXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDEwN1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBXZmwuSW50ZXJmYWNlLkdEYXRhTWF0cml4RHRvTmFtZXMuS29kLCBkaXNhYmxlZDogZmFsc2UsIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBpbnB1dCkgeyBpZiAoaW5wdXQ/LnZhbHVlKSB0aGF0LlpwcmFjdWpEYXRhKCkgfSB9KVxyXG4gICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMTA2XCIpIC8vUkMgMjM5MDAxMDYgOiBBZHJlc8OhdFxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogV2ZsLkludGVyZmFjZS5HRGF0YU1hdHJpeER0b05hbWVzLkluZm9BZHJlc2F0LCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAxMDdcIikgLy9SQyAyMzkwMDEwNyA6IElkZW50aWZpa2FjZSB6w6FzaWxreVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogV2ZsLkludGVyZmFjZS5HRGF0YU1hdHJpeER0b05hbWVzLmlkX2RvcnVjZW5reSwgIGRpc2FibGVkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMDE1XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7IG5hbWU6IFdmbC5JbnRlcmZhY2UuR0RhdGFNYXRyaXhEdG9OYW1lcy5wb3BsYXRlaywgZGVjaW1hbHM6IDQsIG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTkuOTk5OSwgZGlzYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDAxNlwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBXZmwuSW50ZXJmYWNlLkdEYXRhTWF0cml4RHRvTmFtZXMudmFoYSwgZGVjaW1hbHM6IDQsIG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTkuOTk5OSwgZGlzYWJsZWQ6IHRydWUgfSk7ICAgICAgICAgICAgICAgICAvL1JDIDIzOTAwMDE2IDogVsOhaGFcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuQ2lzdElQb2RhY2lDaXNsbykgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMDQ0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctM1wiLCB7IG5hbWU6IFdmbC5JbnRlcmZhY2UuR0RhdGFNYXRyaXhEdG9OYW1lcy5wb2RfY2lzbG8sIGRpc2FibGVkOiB0cnVlIH0pOyAvL1JDIDIzOTAwMDQ0IDogUG9kYWPDrSDEjcOtc2xvXHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFByZWZhYihcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5HaW4uUHJlZmFicy5HU3VGdW5SZWYoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZWRhdmFqaWNpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFrdF9peHNfZnVuPXZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjM5MDAxOTdcIiwgLy9SQyAyMzkwMDE5NyA6IFZsYXN0bsOta1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG92YW5pU3RyZWRpc2thRGxlVWNlbHU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5DaG92YW5pU3RyZWRpc2thRGxlVWNlbHUuTkVVUkNFTk9cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuV2FybmluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgV2ZsLkFDLldmbEJhc2VBQy5TaG93Rmxhc2hXYXJuaW5nKHRoaXMsIHRoaXMubW9kZWwuV2FybmluZyk7ICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLldhcm5pbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RmllbGQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldEZpZWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsX2lkUG9sZSA9IHRoaXMuZmluZEZpZWxkcyhcIklkXCIpO1xyXG4gICAgICAgICAgICBpZiAobF9pZFBvbGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBsX2xhYmVsID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5Lcm9rQ2lzbG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfbGFiZWwgPSBcImpyZXM6MjM5MDAxMjZcIjsgLy9SQyAyMzkwMDEyNiA6IFphZGVqdGUgaWRlbnRpZmlrYWNpIHrDoXNpbGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF9sYWJlbCA9IFwianJlczoyMzkwMDExNFwiOyAvL1JDIDIzOTAwMTE0IDogWmFkZWp0ZSBkYXRhLW1hdHJpeCBrw7NkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF9sYWJlbCA9IFwianJlczoyMzkwMDEyNVwiOyAvL1JDIDIzOTAwMDQ0IDogUG9kYWPDrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsX2lkUG9sZS5nZm9ybXJvdyhcInNldExhYmVsXCIsIGxfbGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbF9pZFBvbGUuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldEluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ZsLkFDLldmbEJhc2VBQy5TaG93Rmxhc2hCeUNvbnRlbnRJbmZvKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEZpZWxkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBacHJhY3VqRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5Lb2QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLlByYWNvdmF0TmFkU2V6bmFtZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLm1vZGVsLktyb2tDaXNsbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlpwcmFjdWpEYXRhWmFzaWxreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuWnByYWN1akRhdGFNYXRyaXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlpwcmFjdWpQb2RhY2lDaXNsbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ET1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBacHJhY3VqRGF0YVphc2lsa3koKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuS29kKSB0aGlzLm1vZGVsLmlkX2RvcnVjZW5reSA9IHRoaXMubW9kZWwuS29kIS50cmltKClcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9LQ2xpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5acHJhY3VqRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgWnByYWN1akRhdGFNYXRyaXgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuS29kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5Lb2QudHJpbSgpLmxlbmd0aCA8IDMwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFdmbC5BQy5XZmxCYXNlQUMuU2hvd0ZsYXNoV2FybmluZyh0aGlzLCBcImpyZXM6MjM5MDAxMTVcIik7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZXRGaWVsZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFdmbC5BQy5XZmxCYXNlQUMuSGlkZUZsYXNoQnlDb250ZW50KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbDxXZmwuSW50ZXJmYWNlLkdEYXRhTWF0cml4RHRvPihcIlpwcmFjdWpEYXRhTWF0cml4XCIsIHsgXCJtb2RlbFwiOiB0aGlzLm1vZGVsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1vZGVsLkNpc3RJUG9kYWNpQ2lzbG8gJiYgdGhhdC5tb2RlbC5Eb3BvcnVjZW5hWmFzaWxrYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuS3Jva0Npc2xvID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LkluZm8gPSBcImpyZXM6MjM5MDAxMjVcIjsgLy9SQyAyMzkwMDEyNSA6IFphZGVqdGUgcG9kYWPDrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5SZXN1bHRUeXBlID0gR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuTmV1cmNlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuS29kID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuQXBwbHlNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0aGF0LmNsb3NlKHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAocmVhc29uKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKHJlYXNvbi5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU2V0RmllbGQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBacHJhY3VqUG9kYWNpQ2lzbG8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5wb2RfY2lzbG8gPSB0aGlzLm1vZGVsLktvZDtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEFwcGx5TW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiSWRcIikuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFeGl0Q2xpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UobnVsbCk7ICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuRGxnXHJcbntcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0YWNlUG9sb3preUNlbmlrdURsZyBleHRlbmRzIEdDb250ZW50QmFzZVxyXG4gICAge1xyXG4gICAgICAgIG1vZGVsOiBXZmwuSW50ZXJmYWNlLkdDZW5pa1Bvc3R5RGV0YWlsRHRvO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxfbGFiZWxOYXpldiA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC50eXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLldmbC5JbnRlcmZhY2UuVHlwQ2VuaWt1UG9zdHkuY2VuaWtQb3N0b3ZuaWNoU2x1emViOlxyXG4gICAgICAgICAgICAgICAgICAgIGxfbGFiZWxOYXpldiA9IFwianJlczoyMzkwMDA5MFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBDZW5pa3VQb3N0eS5jZW5pa1phc2lsZWs6XHJcbiAgICAgICAgICAgICAgICAgICAgbF9sYWJlbE5hemV2ID0gXCJqcmVzOjIzOTAwMDk3XCI7IC8vUkMgMjM5MDAwOTcgOiBEcnVoIHrDoXNpbGt5XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRm9ybUVkaXRcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KGxfbGFiZWxOYXpldilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIsIG1vZGVsOiBcIm1vZGVsLm5hemV2ID0gdmFsdWVcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDEwMFwiKSAvL1JDIDIzOTAwMTAwIDogVsOhaGEgb2QgLSBkb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7IG5hbWU6IFwidmFoYV9vZFwiLCBtb2RlbDogXCJtb2RlbC52YWhhX29kID0gdmFsdWVcIiwgZGlzYWJsZWQ6IHRydWUsIGRlY2ltYWxzOiAyIH0sIClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyBuYW1lOiBcInZhaGFfZG9cIiwgbW9kZWw6IFwibW9kZWwudmFoYV9kbyA9IHZhbHVlXCIsIGRpc2FibGVkOiB0cnVlLCBkZWNpbWFsczogMiB9KTsgXHJcblxyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMTdcIikgLy9SQyAyMzkwMDAxNyA6IENlbmFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcImNlbmFcIiwgbW9kZWw6IFwibW9kZWwuY2VuYSA9IHZhbHVlXCIsIGRlY2ltYWxzOiAzIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJjZW5hXCIpLmdmaWVsZChcImZvY3VzXCIpOyAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgIFxyXG5cclxuICAgICAgICBPS0NsaWNrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0Rm9ybSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsPGJvb2xlYW4+KFwiU2F2ZURhdGFcIiwgeyBtb2RlbDogdGhhdC5tb2RlbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodGhhdC5tb2RlbCk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCI7IG5hbWVzcGFjZSBHb3JkaWMuVnlwLkRsZ1xyXG57XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdGFjZVphc2lsa3lEbGcgZXh0ZW5kcyBHQ29udGVudEJhc2VcclxuICAgIHtcclxuICAgICAgICBtb2RlbDogV2ZsLkludGVyZmFjZS5HRWRpdGFjZVphc2lsa3lEdG87XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb3JtWmFzRWRpdFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pO1xyXG4gICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgZm9ybS5hZGRQcmVmYWIoV2ZsLlByZWZhYnMuR0lkZW50aWZpa2F0b3JEb2t1bW5ldHVTcGlzdSh7IGZpZWxkT3B0OiB7IG1vZGVsOiBcIm1vZGVsLml4cCA9IHZhbHVlXCIsIGRpc2FibGVkOiB0cnVlIH0gfSkpO1xyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwNDRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJwb2RfY2lzbG9cIiwgbW9kZWw6IFwibW9kZWwucG9kX2Npc2xvID0gdmFsdWVcIn0pOyAvL1JDIDIzOTAwMDQ0IDogUG9kYWPDrSDEjcOtc2xvXHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDAxNVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInBvcGxhdGVrXCIsIG1vZGVsOiBcIm1vZGVsLnBvcGxhdGVrID0gdmFsdWVcIiwgZGVjaW1hbHM6IDIsIG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5Ljk5IH0pO1xyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMTZcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJ2YWhhXCIsIG1vZGVsOiBcIm1vZGVsLnZhaGEgPSB2YWx1ZVwiLCBkZWNpbWFsczogNCwgbWluVmFsdWU6IDAsIG1heFZhbHVlOiA5OS45OTk5IH0pOyAgICAgICAgICAgICAgICAgLy9SQyAyMzkwMDAxNiA6IFbDoWhhXHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDAxN1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcImNlbmFcIiwgbW9kZWw6IFwibW9kZWwuY2VuYSA9IHZhbHVlXCIsIGRlY2ltYWxzOiAyLCBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDEwOTkuOTkgfSk7ICAgICAgICAgICAgICAgICAvL1JDIDIzOTAwMDE3IDogQ2VuYVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9LQ2xpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy5tb2RlbCk7ICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuTGlzdHNcclxue1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQ2VuaWtEbGcgZXh0ZW5kcyBHQ29udGVudEJhc2U8V2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDPlxyXG4gICAge1xyXG4gICAgICAgIFR5cENlbmlrdTogR29yZGljLldmbC5JbnRlcmZhY2UuVHlwQ2VuaWt1UG9zdHk7XHJcbiAgICAgICAgbW9kZWw6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdDZW5pa1Bvc3R5RmlsdHJEdG87XHJcbiAgICAgICAgZGF0YTogR29yZGljLldmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlMaXN0RHRvW107XHJcbiAgICAgICAgS2F0ZWdvcmllQ2VuOiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HQ2VuaWtQb3N0eUthdGVnb3JpZUR0b1tdO1xyXG4gICAgICAgIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLldmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlLYXRlZ29yaWVEdG8+O1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuSW5pdExpc3QodGhpcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zcGVjaWFsQWN0aW9ucy5wdXNoKHRoaXMuQ3JlYXRlQWN0aW9uWm1lbmFIb2Rub3QodHJ1ZSkpO1xyXG5cclxuICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkNvbXBsZXRlTWVudSh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZ2ZpbHRlcnBhbmVsYXBwbHlcIiwgZnVuY3Rpb24gKGV2ZW50LCBvYmopIHsgICAgICAgICAvLyBldmVudGEga3RlcsOhIGplIHZ5dm9sw6FuYSBwxZlpIHZ5aGxlZMOhdsOhbsOtLiBvYmouZmlsdGVyIC0+IGhsZWRhbsO9IHNlem5hbSBwb2Rtw61uZWtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LkxvYWREYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogdGhpcy5DcmVhdGVGaWx0ZXJGb3JtKCksIC8vIHBvbGVGb3JtdSBrdGVyZSBidWRvdSBwb3V6aXR5IHBybyBwb2RtaW5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5MYXlvdXREZXNjcmlwdG9yVHlwZS5saXN0LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgJC5leHRlbmQodGhpcy5tb2RlbCksIGZhbHNlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVsb2FkRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDcmVhdGVGaWx0ZXJGb3JtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG4gICAgICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcIkZvcm1TUElTUElcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtLmFkZFJvdyhcImpyZXM6MjM5MDAwMjJcIikgLy9SQyAyMzkwMDAyMiA6IFN0w6F0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jc3RhKCksIHsgbmFtZTogXCJzdGF0XCIsIG1vZGVsOiBcIm1vZGVsLnN0YXQ9dmFsdWUuc3RhdFwiIH0pIC8vUkMgMjM5MDAwMjIgOiBTdMOhdFxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZpbHRlckZvcm0pO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gW2ZpbHRlckZvcm1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ3JlYXRlR3JpZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuR2V0R3JpZEZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxfbGFiZWxOYXpldiA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5UeXBDZW5pa3UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLldmbC5JbnRlcmZhY2UuVHlwQ2VuaWt1UG9zdHkuY2VuaWtQb3N0b3ZuaWNoU2x1emViOlxyXG4gICAgICAgICAgICAgICAgICAgIGxfbGFiZWxOYXpldiA9IFwianJlczoyMzkwMDA5MFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBDZW5pa3VQb3N0eS5jZW5pa1phc2lsZWs6XHJcbiAgICAgICAgICAgICAgICAgICAgbF9sYWJlbE5hemV2ID0gXCJqcmVzOjIzOTAwMDk3XCI7IC8vUkMgMjM5MDAwOTcgOiBEcnVoIHrDoXNpbGt5XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IGxfbGFiZWxOYXpldiwgd2lkdGg6IDI1MCB9KSAgLy9SQyAyMzkwMDA5MCA6IFBvxaF0b3Zuw60gc2x1xb5ieVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6a3JhdGthXCIsIGNhcHRpb246IFwianJlczoyMzkwMDA5MVwiLCB3aWR0aDogNzAgfSkgIC8vUkMgMjM5MDAwOTEgOiBaa3JhdGthXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuS2F0ZWdvcmllQ2VuLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjZW5hX1wiICsgaSwgY2FwdGlvbjogdGhpcy5LYXRlZ29yaWVDZW5baV0ubmF6ZXYhLCB3aWR0aDogMTAwLCBmb3JtYXQ6IFwiRDJcIiB9KTsgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBPcGVuSW5mbyA9IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3dEYXRhID0gY3R4LmNlbGxJbmZvLmRhdGEgYXMgR29yZGljLldmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlMaXN0RHRvOyAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mby5jb2x1bW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvLmNvbHVtbi5jb2x1bW5UeXBlID09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RldDogR29yZGljLldmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlEZXRhaWxEdG8gPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfbmFtZSA9IGN0eC5jZWxsSW5mby5jb2x1bW4ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBsX25hbWUuc3Vic3RyaW5nKGxfbmFtZS5sZW5ndGggLSAxLCBsX25hbWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGV0LmlkID0gcm93RGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2NlbmEgPSByb3dEYXRhW1wiY2VuYV9cIiArIGluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfY2VuYSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjIzOTAwMTAyXCIpIC8vUkMgMjM5MDAxMDIgOiBUYXRvIGhvZG5vdGEgbmVuw60gcG9kcG9yb3bDoW5hIHBybyB0dXRvIHNsdcW+YnUgYSBzdMOhdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2RldC52YWhhX2RvID0gcm93RGF0YVtcInZhaGFfZG9fXCIgKyBpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9kZXQuc3RhdCA9IHRoYXQubW9kZWwuc3RhdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2RldC50eXAgPSB0aGF0Lm1vZGVsLnR5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVnlwLkRpYWxvZ3MuRWRpdGFjZVBvbG96a3lDZW5pa3VEbGcodGhhdCwgeyBEZXRhaWw6IGxfZGV0IH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmNlbmEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93RGF0YVtcImNlbmFfXCIgKyBpbmRleF0gPSBuZXcgRGVjaW1hbChyZXRWYWwuY2VuYSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuVXBkYXRlUm93RGF0YSh0aGF0LCByb3dEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5ldWxvemVuYURhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaGF0LnZpZXcudXBkYXRlRGF0YShyb3dEYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEFjdGlvbiA9IE9wZW5JbmZvO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYWluR3JpZCkgdGhpcy5tYWluR3JpZC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdmFyIGdyaWQgPSBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkNyZWF0ZUdyaWRCYXNlKHRoaXMsIGdmKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluR3JpZCA9IGdyaWQ7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQWZ0ZXJDcmVhdGVHcmlkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLmRhdGEsIHsga2V5OiB0aGlzLklEUHJpbWFyeUtleUdyaWR1IH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlldyAmJiB0aGlzLm1haW5HcmlkICYmIHRoaXMubWFpbkdyaWQuZ2dyaWQpIHRoaXMubWFpbkdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoaXMudmlldyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExvYWREYXRhKGZpbHRyPzogV2ZsLkludGVyZmFjZS5HQ2VuaWtQb3N0eUZpbHRyRHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdExvYWREYXRhKHRoaXMpO1xyXG4gICAgICAgICAgICAvL25hY3RlbmkgZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9ICQuZXh0ZW5kKHt9LCB0aGlzLm1vZGVsLCBmaWx0cik7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ciAmJiBmaWx0ci5zdGF0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGw8R29yZGljLldmbC5JbnRlcmZhY2UuR0NlbmlrUG9zdHlMaXN0RHRvW10+KFwiTG9hZERhdGFDZW5pa3VcIiwgeyBtb2RlbDogZmlsdHIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5DcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuRGxnXHJcbntcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBQcmVkcGxuZW5pWmFzaWxreURsZyBleHRlbmRzIEdDb250ZW50QmFzZVxyXG4gICAge1xyXG4gICAgICAgIG1vZGVsOiBXZmwuSW50ZXJmYWNlLkdQcmVkcGxuZW5pWmFzaWxla0R0bztcclxuICAgICAgICB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1aYXNFZGl0XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkUHJlZmFiKFZ5cFByZWZhYnMuU2VrY2VQcmVkcGxuZW5pWmFzaWxlaygpKTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLm1vZGVsKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9LQ2xpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy5tb2RlbCk7ICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuTGlzdHMge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBQcmlqZW1aYXNpbGVrRGxlSURMaXN0UGFnZSBleHRlbmRzIEdDb250ZW50QmFzZTxWeXBMaXN0QmFzZVBhZ2U+XHJcbiAgICB7XHJcbiAgICAgICAgU2V0dGluZ3M6IFdmbC5JbnRlcmZhY2UuR1ByZXZ6ZXRpRGxlSWRTZXR0aW5nc0R0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5Jbml0TGlzdCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy50b3BBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25QcmlkYXQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbEFjdGlvbnMucHVzaChXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkNyZWF0ZUFjdGlvblByZXZ6aXRaYXNpbGt5KHRoaXMsIHRydWUpKTtcclxuICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUZyYW5rb3ZhbmlBY3Rpb25zKHRoaXMpO1xyXG4gICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uc1Rpc2sodGhpcyk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQ29tcGxldGVNZW51KHRoaXMpO1xyXG4gICBcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGlzLkNyZWF0ZURlZmF1bHRGb3JtKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgTGlzdHMuVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUdyaWRaYXNpbGVrVnlwKHRoaXMpO1xyXG4gICAgICAgICAgICBXZmwuQUMuV2ZsQmFzZUFDLlJlc29sdmVJbmZvKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLlBsbml0VGVtcFRhYnVsa3UgPSBmYWxzZSAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2V0RW5hYmxlQWN0aW9uc0J5RGF0YSh0aGlzKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TZXRBY3Rpb25FbmFibGVkKHRoaXMsIEdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuRnJhbmtvdmFuaU9mZmxpbmUsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlphZGVqWmFzaWxrdSgpO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLkxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tb2RlbC5QbG5pdFRlbXBUYWJ1bGt1ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDcmVhdGVEZWZhdWx0Rm9ybSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxO00xO1MxO1wiIH0pO1xyXG4gICAgICAgICAgICBmb3JtLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiT2JyYWNlbmVSYXplbmlcIiwgbW9kZWw6IFwiU2V0dGluZ3MuT2JyYWNlbmVSYXplbmk9dmFsdWVcIiwgbGFiZWw6IFwianJlczoyMzkwMDEyOFwiLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmo/LnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TZXR0aW5ncy5PYnJhY2VuZVJhemVuaSA9IG9iaj8udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB9LCApOyAvL1JDIDIzOTAwMTI4IDogxZhhZGl0IG9icsOhY2VuxJtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBaYWRlalphc2lsa3UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZm9ybVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuSGxlZGFuaVphc2lsZWtEbGVJZERsZyh0aGlzLCB7IFR5cEhsZWRhbmk6IFdmbC5JbnRlcmZhY2UuVHlwSGxlZGFuaVphc2lsZWsuSGxlZGFuaVphc2lsZWtQcm9QcmV2emV0aSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgV2ZsLkFDLldmbEJhc2VBQy5IaWRlRmxhc2hCeUNvbnRlbnQodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpwcmFjdWpEYXRhSWRlbnRpZmlrYWNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgWnByYWN1akRhdGFJZGVudGlmaWthY2UoZGF0YTogV2ZsLkludGVyZmFjZS5HSGxlZGFuaVphc2lsZWtEbGVJZER0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc3dpdGNoIChkYXRhLnR5cEhsZWRhbmlEbGUpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBjYXNlIEdvcmRpYy5XZmwuSW50ZXJmYWNlLlR5cEhsZWRhbmlEbGVQb2xvemt5LmlkX2RvcnVjZW5reTpcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuWnByYWN1akRhdGFIbGVkYW5pKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgIGNhc2UgR29yZGljLldmbC5JbnRlcmZhY2UuVHlwSGxlZGFuaURsZVBvbG96a3kuaXhzOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5acHJhY3VqRGF0YUhsZWRhbmkoZGF0YSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB0aGlzLlpwcmFjdWpEYXRhSGxlZGFuaShkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFpwcmFjdWpEYXRhSGxlZGFuaShkYXRhOiBXZmwuSW50ZXJmYWNlLkdIbGVkYW5pWmFzaWxla0RsZUlkRHRvKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDxzdHJpbmdbXT4oXCJacHJhY3VqRGF0YUhsZWRhbmlcIiwgeyBEYXRhSGxlZGFuaTogZGF0YSwgRGlhbG9nOiB0aGF0LlNldHRpbmdzLkRpYWxvZ1ByZXZ6ZXRpLCBSYWRpdE9icmFjZW5lOiB0aGlzLlNldHRpbmdzLk9icmFjZW5lUmF6ZW5pIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoSURzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElEcyAmJiB0aGF0LlJlc3VsdFR5cGUgPT0gR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuUHJvdmVkZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJRHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuU2V0dGluZ3MuRGlhbG9nUHJldnpldGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkRvU2hvd0RpYWxvZyhJRHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SZXNvbHZlVnliZXJaYXNpbGt5KElEcywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgbF9zZXR0aW5ncyA9IHRoYXQuVnlwcmF2ZW5pU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChsX3NldHRpbmdzLmZyYW5rb3ZhbmlfcG9kYWNpX2Npc2xvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LkRvRnJhbmtvdmFuaShJRHNbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdEluZm9Db250ZW50dSh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZmwuQUMuV2ZsQmFzZUFDLlNob3dGbGFzaEJ5Q29udGVudEluZm8odGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWmFkZWpaYXNpbGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IocmVhc29uLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1pwcmFjdWpEYXRhRG9rdW1lbnR1KGRhdGE6IFdmbC5JbnRlcmZhY2UuR0hsZWRhbmlaYXNpbGVrRGxlSWREdG8pIHtcclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgV2ZsLkRpYWxvZ3MuVnliZXJaYXNpbGt5RGxnKHRoYXQsIHsgRGF0YTogZGF0YS5kYXRhWmFzaWxlayEgfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdylcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChyZXMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICB7XHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LkxvYWREYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LmxvYWQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjIzOTAwMzY2XCIpIC8vUkMgMjM5MDAzNjYgOiBIZXNsbyBieWxvIHptxJtuxJtuby4gICAgXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBEb0ZyYW5rb3Zhbmkoc3hzOiBzdHJpbmcpOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHByb21pcyA9ICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLlphc2lsa3lJbmZvRGxnKHRoaXMsIHsgU3hzOiBzeHMsIE1vZEZvcm11OiBXZmwuSW50ZXJmYWNlLk1vZEZvcm11WmFzaWxrYUluZm8uYmFsaWNrb3ZhbmkgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHsgcHJvbWlzLnJlc29sdmUocmV0KSB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJlYXNvbikgeyBwcm9taXMucmVzb2x2ZSh0cnVlKSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZXNvbHZlVnliZXJaYXNpbGt5KElEczogc3RyaW5nW10sIHByZXZ6aXQ6IGJvb2xlYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuWnByYWN1amVaYXNpbGt5KElEcywgcHJldnppdClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlNldHRpbmdzLkJhbGlja292YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZXM6IEpRdWVyeS5Qcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBJRHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoYXQuU2hvd0RpYWxvZ0JhbGlja292YW5taShJRHNbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQud2hlbi5hcHBseShudWxsLCBwcm9taXNlcykuZG9uZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTG9hZERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGxfb2sgPSBHb3JkaWMuV2ZsLkNvbW1tb24uR2V0UG9jZXRQcm92ZWRlbnljaCh0aGF0LnJlc3VsdEluZm8pID4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdEluZm8odGhhdCwgdGhhdC5yZXN1bHRJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcm9taXMucmVzb2x2ZShsX29rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiRVJST1IgMjM5MjAwNjFcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIERvU2hvd0RpYWxvZyhJZHM6IHN0cmluZ1tdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9tZWwgYnkgc2UgdnLDoXRpdCBwb3V6ZSBqZWRubyBTWFNcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlBvcmFkaSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlczogSlF1ZXJ5LlByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgSWRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoYXQuU2hvd0RpYWxvZ1phc2lsa2FJbmZvKElkc1tpXSkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJC53aGVuLmFwcGx5KG51bGwsIHByb21pc2VzKS5kb25lKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKG9rKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvaylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVzb2x2ZVZ5YmVyWmFzaWxreShJZHMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBsX29rID0gR29yZGljLldmbC5Db21tbW9uLkdldFBvY2V0UHJvdmVkZW55Y2godGhhdC5yZXN1bHRJbmZvKSA+IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdEluZm8odGhhdCwgdGhhdC5yZXN1bHRJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Byb21pcy5yZXNvbHZlKGxfb2spO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTaG93RGlhbG9nWmFzaWxrYUluZm8oc3hzOiBzdHJpbmcpIDogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuWmFzaWxreUluZm9EbGcodGhpcywgeyBTeHM6IHN4cywgTW9kRm9ybXU6IFdmbC5JbnRlcmZhY2UuTW9kRm9ybXVaYXNpbGthSW5mby5wcmV2emV0aSB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkgeyBwcm9taXMucmVzb2x2ZShyZXQpIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAocmVhc29uKSB7IHByb21pcy5yZXNvbHZlKHRydWUpIH0pOyAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXMucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2hvd0RpYWxvZ0JhbGlja292YW5taShzeHM6IHN0cmluZyk6IEpRdWVyeS5Qcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgbGV0IHByb21pcyA9ICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLlphc2lsa3lJbmZvRGxnKHRoaXMsIHsgU3hzOiBzeHMsIE1vZEZvcm11OiBXZmwuSW50ZXJmYWNlLk1vZEZvcm11WmFzaWxrYUluZm8uYmFsaWNrb3ZhbmkgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHsgcHJvbWlzLnJlc29sdmUocmV0KSB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJlYXNvbikgeyBwcm9taXMucmVzb2x2ZSh0cnVlKSB9KTsgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXMucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgWnByYWN1amVaYXNpbGt5KElkczogc3RyaW5nW10sIHByZXZ6aXQ6IGJvb2xlYW4pIDogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIGlmIChwcmV2eml0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGw8Ym9vbGVhbj4oXCJQcmV2eml0WmFzaWxreVwiLCB7IFN4czogSWRzWzBdIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKE9rKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUoT2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZUZhaWxkQWtjZSh0aGF0LCByZXRWYWwuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsPHN0cmluZ1tdPihcIk5hc3RhdlZ5YmVyWmFzaWxreVwiLCB7IElEczogSWRzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkgeyBwcm9taXMucmVzb2x2ZSh0cnVlKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5SZXNvbHZlRmFpbGRBa2NlKHRoYXQsIHJldFZhbC5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMb2FkRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YSh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG9bXT4oXCJMb2FkRGF0YVRoaXNcIiwgeyBtb2RlbDogdGhpcy5tb2RlbCwgUHJldnphdG86IHRoaXMuU2V0dGluZ3MuUHJldnphdG8sIFJhZGl0T2JyYWNlbmU6IHRoaXMuU2V0dGluZ3MuT2JyYWNlbmVSYXplbmkgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdERhdGEodGhhdCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TZXRFbmFibGVBY3Rpb25zQnlEYXRhKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuQUMuV2ZsQmFzZUFDLlJlc29sdmVJbmZvKHRoYXQpLmRvbmUoZnVuY3Rpb24gKClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWmFkZWpaYXNpbGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuT3puYWNSYWRreURsZVByaXpuYWt1KHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkFmdGVyTG9hZERhdGEodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TZXRBY3Rpb25FbmFibGVkKHRoYXQsIEdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuRnJhbmtvdmFuaU9mZmxpbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDcmVhdGVBY3Rpb25QcmlkYXQoKTogR0FjdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ucHJpZGF0LFxyXG4gICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnByaWRhdCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDE1N1wiLCAvL1JDIDIzOTAwMTU3IDogUMWZaWRhdFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTU3XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cE5hbWU6IEdpbi5HbG9iYWxzLkVudW1zLkFjdGlvbnNHcm91cE5hbWUuRmF2b3JpdGVBbHdheXNFbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuWmFkZWpaYXNpbGt1KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVsb2FkRGF0YSgpXHJcbiAgICAgICAgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuTG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIm5hbWVzcGFjZSBHb3JkaWMuVnlwLkxpc3RzXHJcbntcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgUHJvdmVkZW5hVnlwcmF2ZW5pWmFzaWxla0xpc3RQYWdlIGV4dGVuZHMgR0NvbnRlbnRCYXNlPFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQz5cclxuICAgIHtcclxuICAgICAgICBtb2RlbDogR29yZGljLldmbC5JbnRlcmZhY2UuR1Nlem5hbUZpbHRlckJhc2VEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkluaXRMaXN0KHRoaXMpO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQWRkQmFzZUFjdGlvbnNUb01lbnUodGhpcyk7XHJcbiAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5Db21wbGV0ZU1lbnUodGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBzYW1vdG7DoSBkZWZpbmljZSBnZmlsdGVycGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5vbihcImdmaWx0ZXJwYW5lbGFwcGx5XCIsIGZ1bmN0aW9uIChldmVudCwgb2JqKVxyXG4gICAgICAgICAgICAgICAgeyAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LkxvYWREYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogdGhhdC5DcmVhdGVGaWx0ZXJGb3JtcygpLCAvLyBwb2xlRm9ybXUga3RlcmUgYnVkb3UgcG91eml0eSBwcm8gcG9kbWlua3lcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRuw60gb2Jsw61iZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSh7IHRlbWE6IFwidnlwX3B0bV9wcm92eXBcIiwgcGFyZW50Q29udGVudDogdGhpcyB9KSxcclxuICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIk9ibGliZW5lUG9kbWlua3lcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5MYXlvdXREZXNjcmlwdG9yVHlwZS5saXN0LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2VsbEFjdGl2ZVByb3AgPSBmdW5jdGlvbiAoZXYsIHJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5jZWxsSW5mby5jb2x1bW4gJiYgcm93LmNlbGxJbmZvLmNvbHVtbiEubmFtZSA9PT0gXCJ4eFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LlByZXZpZXdEaXYgIT09IG51bGwgJiYgdGhhdC5QcmV2aWV3RGl2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5QcmV2aWV3RGl2Lmd0YWIoXCJvcHRpb25cIikub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cuY2VsbEluZm8gIT0gbnVsbCAmJiByb3cuY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuRW5hYmxlUHJldmlldyh0aGF0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkxvYWRQcmV2aWV3KHRoYXQsIHJvdy5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5FbmFibGVQcmV2aWV3KHRoYXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5DcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlR3JpZE9ic2FoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB0aGlzLm1vZGVsLCAhdGhpcy5OYWNpc3RTZXpuYW1QcmlPdGV2cmVuaSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENyZWF0ZUdyaWRPYnNhaCgpOiB2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlByZXZpZXdEaXYgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nY29udGVudChcIkdvcmRpYy5WeXAuV2ViQ29udHJvbHMuUHJvdmVkZW5hVnlwcmF2ZW5pWmFzaWxla09ic2FoTGlzdFBhZ2VcIiwgeyB1aWQ6IFwiUHJvdmVkZW5hVnlwcmF2ZW5pWmFzaWxla09ic2FoTGlzdFBhZ2VcIiB9KS5ndGFiKHsgdGl0bGU6IFwiT2JzYWhcIiwgb3BlbmVkOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9hZFByZXZpZXcgPSBVdGlscy5kZWJvdW5jZWQoZnVuY3Rpb24gKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxQcm92ZWRlbmFWeXByYXZlbmlaYXNpbGVrTGlzdFBhZ2U+LCByb3c6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLlNlem5hbVByb3ZlZGVueWNoVnlwcmF2ZW5pWmFzaWxla0R0byk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LlByZXZpZXdEaXYpIHsgdmFyIHByZXZpZXdEaXZDbnQgPSAkLmNvbnRlbnQoY29udGVudC5QcmV2aWV3RGl2KTsgcHJldmlld0RpdkNudC5sb2FkaW5nQXdhaXQuZG9uZSgoKSA9PiB7IHByZXZpZXdEaXZDbnQubG9hZCh7IFRyaWRWeXA6IHJvdy50cmlkX3Z5cCwgWnB1c29iRG9yUHJvcDogcm93LnpwdXNvYl9kb3IgfSkgfSk7IH1cclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgXHJcbiAgICAgICAgQ3JlYXRlR3JpZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkdldEdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5kYXRWeXByYXZlbmlDb2x1bW4oKSk7XHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy56cHVzb2JEb3J1Y2VuaUNvbHVtbigpKTtcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZG9yX3NsdXpiYV90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDIzXCIsIHdpZHRoOiAxMjAsIH0pIC8vUkMgMjM5MDAwMjMgOiBEb3J1xI1vdmFjw60gc2x1xb5iYVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwb3N0YVwiLCBjYXB0aW9uOiBcImpyZXM6MjM5MDAwMzFcIiwgd2lkdGg6IDEyMCwgfSkgLy9SQyAyMzkwMDAzMSA6IFBvxaF0YVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldl9ha3Rfc3VcIiwgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDMyXCIsIHdpZHRoOiAyMDAsIH0pIC8vUkMgMjM5MDAwMzIgOiBWeXByYXZ1asOtY8OtXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2X2Z1bl96bWVudXByb3ZcIiwgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDMzXCIsIHdpZHRoOiAyMDAsIH0pIC8vUkMgMjM5MDAwMzMgOiBQb3NsZWRuw60gem3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9IEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQ3JlYXRlR3JpZEJhc2UodGhpcywgZ2YpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5HcmlkID0gZ3JpZDtcclxuICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5BZnRlckNyZWF0ZUdyaWQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMb2FkRGF0YShmaWx0cj86IFdmbC5JbnRlcmZhY2UuR1Nlem5hbUZpbHRlckJhc2VEdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dXYWl0TG9hZERhdGEodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvL25hY3RlbmkgZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGw8R29yZGljLldmbC5JbnRlcmZhY2UuU2V6bmFtUHJvdmVkZW55Y2hWeXByYXZlbmlaYXNpbGVrRHRvW10+KFwiTG9hZERhdGFcIiwgeyBtb2RlbDogZmlsdHIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlNldERhdGEodGhhdCwgZGF0YSk7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5BZnRlckxvYWREYXRhKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoZmlsdHIpIHRoYXQubW9kZWwgPSBmaWx0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbG9hZERhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2FkRGF0YSh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgIFxyXG4gICAgICAgIENyZWF0ZUZpbHRlckZvcm1zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb3JtRG9jc0xpc3RcIiwgdGFiTGFiZWw6IFwianJlczoyMzkwMDE3M1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiIH0pOyAgLy9SQyAyMzkwMDE3MyA6IEtvbXBsZXRuw60gZmlsdHJcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm0uYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczoyMzkwMDAzNFwiLCBuYW1lOiBcImRhdGVJbnRlcnZhbFJvd1wiIH0pIC8vUkMgMjM5MDAwMzQgOiBEYXR1bSB2eXByYXZlbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWNvbWJvYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5EYXR1bT12YWx1ZS5kYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEluaXRpYWxWYWx1ZTogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogeyB2YWx1ZTogdGhpcy5tb2RlbC5EYXR1bSB9LCAgICBcclxuICAgICAgICAgICAgICAgICAgICBkYXlzUmFuZ2VNYXg6IHRoaXMuRGF5c1JhbmdlTWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXNSYW5nZTogNTBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRlckZvcm0uYWRkU2VjdGlvbigpLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwiXCIsIHsgbmFtZTogXCJWbGFzdG5pXCIsIG1vZGVsOiBcIm1vZGVsLlZsYXN0bmk9dmFsdWVcIiwgbGFiZWw6IFwianJlczoyMzkwMDAxMVwiIH0pOyAvL1JDIDIzOTAwMDExIDogVmxhc3Ruw61cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbZmlsdGVyRm9ybV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJuYW1lc3BhY2UgR29yZGljLlZ5cC5MaXN0c1xyXG57XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3ZlZGVuYVZ5cHJhdmVuaVphc2lsZWtPYnNhaExpc3RQYWdlIGV4dGVuZHMgR0NvbnRlbnRCYXNlPFZ5cExpc3RCYXNlUGFnZT5cclxuICAgIHtcclxuICAgICAgICBUcmlkVnlwOiBudW1iZXI7XHJcbiAgICAgICAgWnB1c29iRG9yUHJvcDogR29yZGljLldmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW07XHJcbiAgICAgICAgZGF0YTogR29yZGljLldmbC5JbnRlcmZhY2UuR1phc2lsa3lMaXN0RHRvW107XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSXNPYnNhaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWluaW1hbEhlaWdodE9ic2FodSA9IDUwMDtcclxuICAgICAgICAgICAgR29yZGljLldmbC5BQy5XZmxCYXNlQUMuQ2xlYXJDb250cm9sKHRoaXMpO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkluaXRMaXN0KHRoaXMpO1xyXG4gICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlRnJhbmtvdmFuaUFjdGlvbnModGhpcyk7ICBcclxuICAgICAgICAgICAgLy8vL3RoaXMuc3BlY2lhbEFjdGlvbnMucHVzaChXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkNyZWF0ZUFjdGlvblpub3Z1b2Rlc2xhdFphc2lsa3kodGhpcywgZmFsc2UpKTtcclxuICAgICAgICAgICAgLy9XZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkNyZWF0ZUFjdGlvblpub3Z1b2Rlc2xhdFphc2lsa3kodGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1Z5cExpc3RCYXNlUGFnZS5DcmVhdGVBY3Rpb25zUHJlZHBsbmVuaSh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVjaWFsQWN0aW9ucy5wdXNoKFZ5cExpc3RCYXNlUGFnZS5DcmVhdGVBY3Rpb25FZGl0YWNlRGF0UHJlZHBsbmVuaSh0aGlzLCB0cnVlKSk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbEFjdGlvbnMucHVzaChWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uWm1lbmFIb2Rub3QodGhpcywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uc1ByZWRwbG5lbmkodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbEFjdGlvbnMucHVzaChXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkNyZWF0ZUFjdGlvblVsb3ppdFptZW55WmFzaWxlayh0aGlzLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbEFjdGlvbnMucHVzaChWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uSW1wb3J0RGF0RXBhUG9zdHkodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvbnNUaXNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnByaW50QWN0aW9uc1N1Ym1lbnUucHVzaChWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uVGlza1Z5cHJhdmVueWNoRG9rU3Bpcyh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5wcmludEFjdGlvbnNTdWJtZW51LnB1c2goR29yZGljLldmbC5MaXN0QUMuV2ZsWmFzaWxreUxpc3RCYXNlQUMuQ3JlYXRlQWN0aW9uVGlza09iYWxlayh0aGlzKSlcclxuICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5Db21wbGV0ZU1lbnUodGhpcyk7XHJcbiAgICAgICAgICAgIExpc3RzLlZ5cExpc3RCYXNlUGFnZS5DcmVhdGVHcmlkWmFzaWxla1Z5cCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5TZXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgTG9hZERhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVHJpZFZ5cClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG9bXT4oXCJMb2FkRGF0YVRoaXNcIiwgeyBUcmlkVnlwUGFyYW06IHRoaXMuVHJpZFZ5cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTZXREYXRhKClcclxuICAgICAgICB7ICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLmRhdGEsIHsga2V5OiB0aGlzLklEUHJpbWFyeUtleUdyaWR1IH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluR3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZWxvYWREYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIm5hbWVzcGFjZSBHb3JkaWMuVnlwLkxpc3RzXHJcbntcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgVnlwcmF2ZW5lWmFzaWxreUxpc3RQYWdlIGV4dGVuZHMgR0NvbnRlbnRCYXNlPFZ5cExpc3RCYXNlUGFnZT5cclxuICAgIHtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkluaXRMaXN0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2goV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5DcmVhdGVBY3Rpb25TZXJ2aXNuaVNlem5hbURaKHRoaXMsIHRydWUpKTtcclxuICAgICAgICAgICAgdGhpcy5wcmludEFjdGlvbnNTdWJtZW51LnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvblRpc2tLbmloeVZ5cHJhdmVuZVBvc3R5KHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5wcmludEFjdGlvbnNTdWJtZW51LnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvblRpc2tWeWthenUodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLnByaW50QWN0aW9uc1N1Ym1lbnUucHVzaChWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uVGlza05ha2xhZHUodGhpcykpO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQ29tcGxldGVNZW51KHRoaXMpO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkNyZWF0ZUxpc3QodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZWxvYWREYXRhKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsWmFzaWxreUxpc3RCYXNlQUMuTG9hZERhdGFaYXNpbGVrKHRoaXMsIHRoaXMubW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgR29yZGljLlZ5cC5MaXN0cyB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIFZ5cHJhdmVuaVphc2lsZWtMaXN0UGFnZSBleHRlbmRzIEdDb250ZW50QmFzZTxWeXBMaXN0QmFzZVBhZ2U+XHJcbiAgICB7XHJcbiAgICAgICAgSWZQcmVkcGxuZW7DrTogYm9vbGVhbjtcclxuICAgICAgICBJeHNEcG86IHN0cmluZztcclxuICAgICAgICBWeXByYXZlbmlEdG86IFdmbC5JbnRlcmZhY2UuR1Z5cHJhdmVuaVphc2lsZWtEdG9cclxuICAgICAgICBNb3pub1Z5cHJhdml0OiBib29sZWFuO1xyXG4gICAgICAgIE92ZXJvdmF0RFM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwYXJhbUluZm9PU3RhdmVjaEhLOiBudW1iZXI7XHJcbiAgICAgICAgUG92b2xlbmVLdXJ5cnk6IFdmbC5JbnRlcmZhY2UuR1dmbGN6cGREdG9bXTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLklmUHJlZHBsbmVuw60gPSB0aGlzLklmTW96bm9QcmVkcGxuZW5pKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuWnB1c29iRG9yID0gdGhpcy5acHVzb2JEb3JQcm9wO1xyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkluaXRMaXN0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25WeXByYXZpdCgpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuWnB1c29iRG9yUHJvcCA9PSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRhdG92YVNjaHJhbmthKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25PdmVyaXRBZHJlc2F0eSgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBvdm9sZW5vSEtQKSB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2goV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5DcmVhdGVBY3Rpb25EZXRhaWxFc3VOYWQodGhpcywgZmFsc2UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWnB1c29iRG9yUHJvcCA9PSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkh5YnJpZG5pUG9zdGEgJiYgdGhpcy5wYXJhbUluZm9PU3RhdmVjaEhLID09IDIpIHRoaXMuc3BlY2lhbEFjdGlvbnMucHVzaCh0aGlzLkNyZWF0ZUFjdGlvbkluZm9PWmFzaWxrYWNoSFAoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5JZlByZWRwbG5lbsOtKSB7XHJcbiAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uc1ByZWRwbG5lbmkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvblptZW5hSG9kbm90KHRoaXMsIHRydWUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWnB1c29iRG9yUHJvcCA9PSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLlBvc3RhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlRnJhbmtvdmFuaUFjdGlvbnModGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5WeXByYXZlbmlTZXR0aW5ncy5wcmV2emV0aURhdGFNYXRyaXhFbmFibGVkKSB0aGlzLnNwZWNpYWxBY3Rpb25zLnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvblByZXZ6aXRTRnJhbmtvdmFuaW0odGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ3JlYXRlQWN0aW9uc1Rpc2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbnRBY3Rpb25zU3VibWVudS5wdXNoKFZ5cExpc3RCYXNlUGFnZS5DcmVhdGVBY3Rpb25UaXNrVnlwcmF2ZW55Y2hEb2tTcGlzKHRoaXMpKVxyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkNvbXBsZXRlTWVudSh0aGlzKTtcclxuICAgICAgICAgICAgLy8gc2Ftb3Ruw6EgZGVmaW5pY2UgZ2ZpbHRlcnBhbmVsdVxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAub24oXCJnZmlsdGVycGFuZWxhcHBseVwiLCBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuTG9hZERhdGEob2JqLmZpbHRlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiB0aGF0LkNyZWF0ZUZpbHRlckZvcm0oKSwgLy8gcG9sZUZvcm11IGt0ZXJlIGJ1ZG91IHBvdXppdHkgcHJvIHBvZG1pbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBcImFsbFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRuw60gb2Jsw61iZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSh7IHRlbWE6IFwidnlwX3B0bV92eXB6YXNcIiwgcGFyZW50Q29udGVudDogdGhpcyB9KSxcclxuICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIk9ibGliZW5lUG9kbWlua3lcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5MYXlvdXREZXNjcmlwdG9yVHlwZS5saXN0LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCAkLmV4dGVuZCh0aGlzLm1vZGVsKSwgIXRoaXMuTmFjaXN0U2V6bmFtUHJpT3RldnJlbmkpXHJcblxyXG4gICAgICAgICAgICAvL2Zvcm0gICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhpcy5DcmVhdGVEZWZhdWx0Rm9ybSgpKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRm9ybXMoXCJGb3JtVnlwXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRm9ybXMoXCJGb3JtVnlwXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuVnlwcmF2ZW5pRHRvKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy5WeXByYXZlbmlEdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGb3JtcyhcIkZvcm1WeXBcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5QcmVkcGxuZW5pKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy5QcmVkcGxuZW5pKTtcclxuICAgICAgICAgICAgTGlzdHMuVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUdyaWRaYXNpbGVrVnlwKHRoaXMpO1xyXG4gICAgICAgICAgICBXZmwuQUMuV2ZsQmFzZUFDLlJlc29sdmVJbmZvKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ3JlYXRlRmlsdGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1Eb2NzTGlzdFwiLCB0YWJMYWJlbDogXCJqcmVzOjIzOTAwMTcyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xOywgTS0xOzItMTstMTssIFMtMTsyLTE7LTE7LCBicmVha3MtNzAwLTE7MDAwXCIgfSkgLy9SQyAyMzkwMDE3MiA6IEtvbXBsZXRuw60gZmlsdHJcclxuICAgICAgICAgICAgZmlsdGVyRm9ybS5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBcIlwiLCB7IG5hbWU6IFwiVmxhc3RuaVwiLCBtb2RlbDogXCJtb2RlbC5WbGFzdG5pPXZhbHVlXCIsIGxhYmVsOiBcImpyZXM6MjM5MDAwMTFcIiwgaW5pdGlhbFZhbHVlOiB0aGlzLm1vZGVsLlZsYXN0bmkgIH0pOyAvL1JDIDIzOTAwMDExIDogVmxhc3Ruw61cclxuICAgICAgICAgICAgcmV0dXJuIFtmaWx0ZXJGb3JtXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENyZWF0ZURlZmF1bHRGb3JtKCkge1xyXG4gICAgICAgICAgICAvLyBmb3JtXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvcm1WeXBcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMTtNMTtTMTtcIiB9KTtcclxuICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlpwdXNvYkRvclByb3AgPT0gV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5Qb3N0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMDIxXCIgKyBcIiwgXCIgKyBcImpyZXM6MjM5MDAwMjJcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zcHNjKCksIHsgbmFtZTogXCJwc2NcIiwgbW9kZWw6IFwibW9kZWwucHNjPXZhbHVlLnBzYzsgbW9kZWwuc3RhdD12YWx1ZS5zdGF0XCIgfSkgLy9SQyAyMzkwMDAyMTsgOiBQU8SMXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctOFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3N0YSgpLCB7IG5hbWU6IFwic3RhdFwiLCBtb2RlbDogXCJtb2RlbC5zdGF0PXZhbHVlLnN0YXRcIiB9KSAvL1JDIDIzOTAwMDIyIDogU3TDoXRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5acHVzb2JEb3JQcm9wID09IFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRG9ydWNvdmFjaVNsdXpiYSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjIzOTAwMDIzXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2Zsc2RvcygpLCB7IG5hbWU6IFwiZG9yX3NsdXpiYVwiLCBtb2RlbDogXCJtb2RlbC5kb3Jfc2x1emJhPXZhbHVlLmRvcl9zbHV6YmFcIiB9ICkgLy9SQyAyMzkwMDAyMyA6IERvcnXEjW92YWPDrSBzbHXFvmJhXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlpwdXNvYkRvclByb3AgPT0gV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5LdXJ5ciAmJiB0aGlzLlBvdm9sZW5lS3VyeXJ5Lmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczoyMzkwMDE5OFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGN6cGQoKSwgeyBuYW1lOiBcInpwdXNvYl9kb3JcIiwgbW9kZWw6IFwibW9kZWwuWnB1c29iRG9yPXZhbHVlLnpwdXNvYl9kb3JcIiwgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5Qb3ZvbGVuZUt1cnlyeSwgeyBrZXk6IFwienB1c29iX2RvclwiIH0pIH0pIC8vUkMgMjM5MDAxOTggOiBUeXAga3Vyw71yYVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuWnB1c29iRG9yUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkVNYWlsOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRhdG92YVNjaHJhbmthOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkdFWDpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5IeWJyaWRuaVBvc3RhOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJcIiwgeyBuYW1lOiBcIlZyYXRpdE5ldnlwcmF2ZW5lXCIsIG1vZGVsOiBcIm1vZGVsLlZyYXRpdE5ldnlwcmF2ZW5lPXZhbHVlXCIsIGxhYmVsOiBcImpyZXM6MjM5MDAwNjRcIiB9KTsgLy9SQyAyMzkwMDA2NCA6IEF1dG9tYXRpY2t5IHZyw6F0aXQgbmV2eXByYXZlbsOpIHrDoXNpbGt5IG9kZXPDrWxhdGVsaVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklmUHJlZHBsbmVuw60pIGZvcm0uYWRkUHJlZmFiKFZ5cFByZWZhYnMuU2VrY2VQcmVkcGxuZW5pWmFzaWxlaygpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJZk1vem5vUHJlZHBsbmVuaSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGxfcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uUG9zdGE6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRG9ydWNvdmFjaVNsdXpiYTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5LdXJ5cjpcclxuICAgICAgICAgICAgICAgICAgICBsX3JldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxfcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9hZERhdGEoZmlsdHI/OiBXZmwuSW50ZXJmYWNlLkdTZXpuYW1aYXNpbGVrRmlsdGVyRHRvLCBwbG5pdFRlbXBUYWJ1bGt1PzogQm9vbGVhbikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiRm9ybVZ5cFwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gJC5leHRlbmQoe30sIHRoaXMubW9kZWwsIGZpbHRyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG9bXT4oXCJMb2FkRGF0YVRoaXNcIiwgeyBtb2RlbDogdGhpcy5tb2RlbCwgcGxuaXRUZW1wVGFidWxrdTogcGxuaXRUZW1wVGFidWxrdSB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsbml0VGVtcFRhYnVsa3UpIEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQ2xlYXJSZXN1bHRJbmZvKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yZXN1bHRJbmZvICYmIHRoYXQucmVzdWx0SW5mby5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkFwcGx5UmVzdWx0SW5mbyh0aGF0LCBkYXRhIGFzIFdmbC5JbnRlcmZhY2UuR1Jlc3VsdFdvcmtMaXN0RHRvW10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5SZXNvbHZlUmVzdWx0RGF0YSh0aGF0LCBkYXRhLCB0cnVlLCBHaW4uSW50ZXJmYWNlLlR5cFZ5c2xlZGt1T3BlcmFjZS5Qcm92ZWRlbm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGxuaXRUZW1wVGFidWxrdSB8fCAhR29yZGljLlZ5cC5BcHBTZXR0aW5ncy5HZXRWeXByYXZlbmlTZXR0aW5ncyh0aGF0KS56YXNpbGt5X2tfdnlwcmF2ZW5pX25lb3puYWNvdmF0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5Pem5hY1JhZGt5RGxlUHJpem5ha3UodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkFmdGVyTG9hZERhdGEodGhhdCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVsb2FkRGF0YSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWREYXRhKHRoaXMubW9kZWwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVmcmVzaERhdGEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZERhdGEodGhpcy5tb2RlbCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ3JlYXRlQWN0aW9uVnlwcmF2aXQoKTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLkFjdGlvbnNOYW1lLlZ5cHJhdml0LFxyXG4gICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnZ5cHJhdml0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDEyXCIsIC8vUkMgMjM5MDAwMTsyIDogVnlwcmF2aXRcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDAxMlwiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQWN0aW9uc0dyb3VwTmFtZS5GYXZvcml0ZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuTW96bm9WeXByYXZpdCxcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcIkZvcm1WeXBcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGF0LlZ5cHJhdmVuaUR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuVnlwcmF2ZW5pRHRvLlVrb25jaXREbmVzbmlWeXByYXZlbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsX2FzU2VsZWN0ZWQgPSB0aGF0LkdldFNlbGVjdGVkWmFzaWxreVZ5cHJhdmVuaUxpc3REdG8oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobF9hc1NlbGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UeXBQcm92ZWRlbmVBa2NlID0gV2ZsLkludGVyZmFjZS5UeXBBa2NlLnZ5cHJhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXN1bHRJbmZvID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhhdC5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uUG9zdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LlZ5cHJhdmVuaUR0by5wc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjIzOTAwMDI1XCIpOyAvL1JDIDIzOTAwMDI1IDogTmVuw60gdnlwbG7Em25hIHBvxaF0YSBwcm8gdnlwcmF2ZW7DrSB6w6FzaWxlay5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuVnlwcmF2ZW5pRHRvLnN0YXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjIzOTAwMDUzXCIpOyAvL1JDIDIzOTAwMDUzIDogTmVuw60gdnlwbG7Em24gc3TDoXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5Eb3J1Y292YWNpU2x1emJhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5WeXByYXZlbmlEdG8uZG9yX3NsdXpiYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MjM5MDAwMjRcIik7IC8vUkMgMjM5MDAwMjQgOiBOZW7DrSB2eXBsbsSbbmEgZG9ydcSNb3ZhY8OtIHNsdcW+YmEgcHJvIHZ5cHJhdmVuw60gesOhc2lsZWsuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVnlwLkFwcFNldHRpbmdzLkdldFZ5cHJhdmVuaVNldHRpbmdzKHRoYXQpLmRvdGF6X3ByaV92eXByYXZlbmkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyMzkwMDAxNFwiLCBcImpyZXM6MjM5MDAwMTNcIikub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkvL1JDIDIzOTAwMDEzIDogT3ByYXZkdSBjaGNldGUgdnlicmFuw6kgesOhc2lsa3kgdnlwcmF2aXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwgPT09IFwieWVzXCIpIHRoYXQuVnlwcmF2aXQobF9hc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGhhdC5WeXByYXZpdChsX2FzU2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlNob3dJbmZvTmVuaVZ5YnJhblphZG55UmFkZWsodGhhdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVnlwcmF2aXQoX2FzU2VsZWN0ZWQ6IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0b1tdIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbF9hc1NlbGVjdGVkID0gV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5HZXRTZWxlY3RlZEdaYXNpbGthRWRpdExpc3REdG8odGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChsX2FzU2VsZWN0ZWQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTmV1bG96ZW5hRGF0YSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbDxHaW4uSW50ZXJmYWNlLkdSZXN1bHRJbmZvW10+KFwiVWxveml0Wm1lbnlaYXNpbGVrXCIsIHsgU2VsZWN0ZWQ6IGxfYXNTZWxlY3RlZCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5WeXByYXZpdFBvVWxvemVuaShfYXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5WeXByYXZpdFBvVWxvemVuaShfYXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2hvd0luZm9OZW5pVnlicmFuWmFkbnlSYWRlayh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFZ5cHJhdml0UG9VbG96ZW5pKF9hc1NlbGVjdGVkOiBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5VnlwcmF2ZW5pV29ya0xpc3REdG9bXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIlZ5cHJhdml0UG9VbG96ZW5pIDIzOTIwMDk3LzE6IFwiICsgX2FzU2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkNsZWFyUmVzdWx0SW5mbyh0aGlzKTtcclxuICAgICAgICAgICAgdGhhdC5jYWxsKFwiUHJpcHJhdmFLVnlwcmF2ZW5pXCIsIHsgQmFsaWNrb3Zhbmk6IHRoYXQuVnlwcmF2ZW5pRHRvLkJhbGlja292YW5pIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhhdC5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5Qb3N0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuSWZCYWxpY2tvdmFuaURvdGF6KCkuZG9uZShmdW5jdGlvbiAodnlwcmF2aXQpIHsgaWYgKHZ5cHJhdml0KSB0aGF0LlZ5cHJhdmVuaShfYXNTZWxlY3RlZCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRU1haWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdEluZm8odGhhdCwgXCJqcmVzOjIzOTAwMDc5XCIpOyAvL1JDIDIzOTAwMDc5IDogUHJvYsOtaMOhIHDFmcOtcHJhdmEgdnlwcmF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5PZGVzbGF0WmFzaWxreUZ5emlja3koX2FzU2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGlzT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT0spIHRoYXQuVnlwcmF2ZW5pKF9hc1NlbGVjdGVkKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2cudHJhY2UoXCJPZGVta25vdXRaYW1jZW5lTWFpbGJveHkgMjM5MjAwOTcvMiBDSDFcIik7fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5EYXRvdmFTY2hyYW5rYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dXYWl0SW5mbyh0aGF0LCBcImpyZXM6MjM5MDAwNzlcIik7IC8vUkMgMjM5MDAwNzkgOiBQcm9iw61ow6EgcMWZw61wcmF2YSB2eXByYXZlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktvbnRyb2xhU3RhdnVEU09kZXNpbGF0ZWxlKCkuZG9uZShmdW5jdGlvbiAoaXNPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dXYWl0SW5mbyh0aGF0LCBcImpyZXM6MjM5MDAwNzVcIik7IC8vUkMgMjM5MDAwNzUgOiBQcm9iw61ow6Ega29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5PdmVyZW5pRFNBZHJlc2F0dShfYXNTZWxlY3RlZCkuZG9uZShmdW5jdGlvbiAoaXNPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5PdmVyb3ZhdERTID09IHRydWUgJiYgR29yZGljLldmbC5Db21tb24uR2V0UG9jZXRQcm92ZWRlbnljaCh0aGF0LnJlc3VsdEluZm8pID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdEluZm8odGhhdCwgdGhhdC5yZXN1bHRJbmZvLCBXZmwuSW50ZXJmYWNlLlR5cEFrY2Uua29udHJvbGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdEluZm8odGhhdCwgXCJqcmVzOjIzOTAwMDg5XCIpOyAvL1JDIDIzOTAwMDg5IDogUHJvYsOtaMOhIG9kZXPDrWzDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk9kZXNsYXRaYXNpbGt5Rnl6aWNreShfYXNTZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpc09LKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09LKSB0aGF0LlZ5cHJhdmVuaShfYXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkgeyB0aGF0LmxvZy50cmFjZShcIlNlbmRTaWduZWRNZXNzYWdlIDIzOTIwMDk3LzQ6IFwiKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2cudHJhY2UoXCJTZW5kU2lnbmVkTWVzc2FnZSAyMzkyMDA5Ny81OiBcIik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2cudHJhY2UoXCJTZW5kU2lnbmVkTWVzc2FnZSAyMzkyMDA5Ny82OiBcIik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5IeWJyaWRuaVBvc3RhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRJbmZvKHRoYXQsIFwianJlczoyMzkwMDA3OVwiKTsgLy9SQyAyMzkwMDA3OSA6IFByb2LDrWjDoSBwxZnDrXByYXZhIHZ5cHJhdmVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS29udHJvbGFTdGF2dU1haWxib3h5SFAoX2FzU2VsZWN0ZWQpLmRvbmUoZnVuY3Rpb24gKGlzT0spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPSylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT2Rlc2xhdFphc2lsa3lGeXppY2t5KF9hc1NlbGVjdGVkKS5kb25lKGZ1bmN0aW9uIChpc09LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPSykgdGhhdC5WeXByYXZlbmkoX2FzU2VsZWN0ZWQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkgeyB0aGF0LmxvZy50cmFjZShcIlNlbmRTaWduZWRNZXNzYWdlIDIzOTIwMDk3Lzc6IFwiKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkgeyB0aGF0LmxvZy50cmFjZShcIlNlbmRTaWduZWRNZXNzYWdlIDIzOTIwMDk3Lzg6IFwiKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVnlwcmF2ZW5pKF9hc1NlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDcmVhdGVBY3Rpb25JbmZvT1phc2lsa2FjaEhQKCk6IEdBY3Rpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLkFjdGlvbnNOYW1lLkluZm9PWmFzaWxrYWNoSFAsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuV2ZsLkljb25zLkVudGl0aUVudW0uaW5mb3JtYWNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTg1XCIsIC8vUkMgMjM5MDAxODUgOiBOYcSNw61zdCBpbmZvcm1hY2UgbyB6w6FzaWxrw6FjaCBoeWJyaWRuw60gcG/FoXR5XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxODVcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkFjdGlvbnNHcm91cE5hbWUuRmF2b3JpdGUsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkluZm9PWmFzaWxrYWNoSFBEbGcodGhhdCwgdW5kZWZpbmVkLCBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2V0UG9jZXRQcm92ZWRlbnljaChyZXN1bHQ6IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0b1tdKTogbnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbF9wb2NldDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHRbaV0ub3puYWNlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE96bmFjZW5pUmFka3VTZXpuYW11LlByb3ZlZGVubzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE96bmFjZW5pUmFka3VTZXpuYW11LlByb3ZlZGVub1NVcG96b3JuZW5pbTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF9wb2NldCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbF9wb2NldDtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBDcmVhdGVBY3Rpb25PdmVyaXRBZHJlc2F0eSgpOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuT3Zlcml0QWRyZXNhdHksXHJcbiAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ua29udHJvbGEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAwNzNcIiwgLy9SQyAyMzkwMDA3MyA6IE92xJvFmWl0IGFkcmVzw6F0eVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMDczXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cE5hbWU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5BY3Rpb25zR3JvdXBOYW1lLkZhdm9yaXRlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdWx0SW5mbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB0aGF0LlZ5cHJhdmVuaUR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfYXNTZWxlY3RlZCA9IHRoYXQuR2V0U2VsZWN0ZWRaYXNpbGt5VnlwcmF2ZW5pTGlzdER0bygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsX2FzU2VsZWN0ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2V0VHlwUHJvdmVkZW5hQWtjZSh0aGF0LCBXZmwuSW50ZXJmYWNlLlR5cEFrY2Uua29udHJvbGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LktvbnRyb2xhU3RhdnVEU09kZXNpbGF0ZWxlKCkuZG9uZShmdW5jdGlvbiAoaXNPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT0spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRJbmZvKHRoYXQsIFwianJlczoyMzkwMDA3NVwiKTsgLy9SQyAyMzkwMDA3NSA6IFByb2LDrWjDoSBrb250cm9sYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuT3ZlcmVuaURTQWRyZXNhdHUobF9hc1NlbGVjdGVkKS5kb25lKGZ1bmN0aW9uIChpc09LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09LKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdEluZm8odGhhdCwgdGhhdC5yZXN1bHRJbmZvLCBXZmwuSW50ZXJmYWNlLlR5cEFrY2Uua29udHJvbGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOiAyMzkwMDA3NFwiKSAvL1JDIDIzOTAwMDc0IDogQWtjZSBzZSBuZXBvZGHFmWlsYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2hvd0luZm9OZW5pVnlicmFuWmFkbnlSYWRlayh0aGF0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJZkJhbGlja292YW5pRG90YXooKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHByb21pcyA9ICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlZ5cHJhdmVuaUR0by5CYWxpY2tvdmFuaSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjIzOTAwMDE0XCIsIFwianJlczoyMzkwMDA3MFwiKS5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKS8vUkMgMjM5MDAwNzAgOiBDaGNldGUgdWtvbsSNaXQgZG5lxaFuw60gdnlwcmF2ZW7DrSB6w6FzaWxlaz9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlZ5cHJhdmVuaUR0by5Va29uY2l0RG5lc25pVnlwcmF2ZW5pID0gcmV0VmFsICYmIHJldFZhbCA9PT0gXCJ5ZXNcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgcHJvbWlzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXMucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVnlwcmF2ZW5pKF9zZWxlY3RlZDogV2ZsLkludGVyZmFjZS5HWmFzaWxreVZ5cHJhdmVuaVdvcmtMaXN0RHRvW10pOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIk9kZXNsYXRaYXNpbGt5Rnl6aWNreSAyMzkyMDEwOC8xOiBcIiArIF9zZWxlY3RlZC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdEluZm8odGhhdCwgXCJqcmVzOjIzOTAwMDc4XCIpOyAvL1JDIDIzOTAwMDc4IDogUHJvYsOtaMOhIHZ5cHJhdmVuw61cclxuICAgICAgICAgICAgdGhhdC5jYWxsPEdpbi5JbnRlcmZhY2UuR1Jlc3VsdEluZm9bXT4oXCJWeXByYXZpdFwiLCB7IFNlbGVjdGVkOiBfc2VsZWN0ZWQsIFJlc3VsdEluZm86IHRoYXQucmVzdWx0SW5mbywgTW9kZWxWeXByYXZlbmk6IHRoYXQuVnlwcmF2ZW5pRHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VsdEluZm8gPSByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1dmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5BZGRSZXN1bHRJbmZvcyh0aGF0LCByKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJPZGVzbGF0WmFzaWxreUZ5emlja3kgMjM5MjAxMDgvMjogXCIgKyBfc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlNldFR5cFByb3ZlZGVuYUFrY2UodGhhdCwgV2ZsLkludGVyZmFjZS5UeXBBa2NlLnZ5cHJhdmVuaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVGlza1BvZEFyY2h1IHBybyBmeXppY2tlIHphc2lsa3lcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoYXQuWnB1c29iRG9yUHJvcClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5Qb3N0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRvcnVjb3ZhY2lTbHV6YmE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5LdXJ5cjpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5SZXN1bHRUeXBlID09IEdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLlByb3ZlZGVubylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlza1BvZEFyY2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlNlc3Npb25JbmZvLkZhemUgPT0gR2luLkludGVyZmFjZS5GYXplR2luaXN1RW51bS5HV0FWWVAwNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpc2tQb2RBcmNoID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLlZ5cC5BcHBTZXR0aW5ncy5QcmludFNldHRpbmdzLlRpc2tQb2RBcmNoXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpc2tQb2RBcmNoID09PSB0cnVlKSB0aGF0LlRpc2tQb2RhY2lob0FyY2h1U0RpYWxvZ2VtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJPZGVzbGF0WmFzaWxreUZ5emlja3kgMjM5MjAxMDgvMzogXCIgKyBfc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJhbUluZm9PU3RhdmVjaEhLID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkluZm9PWmFzaWxrYWNoSFBEbGcodGhhdCwgdW5kZWZpbmVkLCBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT2Rlc2xhdFphc2lsa3lGeXppY2t5T0xEKF9zZWxlY3RlZDogV2ZsLkludGVyZmFjZS5HWmFzaWxreVZ5cHJhdmVuaVdvcmtMaXN0RHRvW10pOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbF9wb3JhZGkgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLlBvY2V0Q2Vsa2VtID0gMDtcclxuICAgICAgICAgICAgLy96amlzdGltIHBvY2V0IGsgdnlwcmF2ZW5pXHJcbiAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5DbGVhclJlc3VsdEluZm8odGhpcyk7XHJcbiAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiT2Rlc2xhdFphc2lsa3lGeXppY2t5IDIzOTIwMTA3LzE6IFwiICsgX3NlbGVjdGVkLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9zZWxlY3RlZFtpXS5vem5hY2VuaSAhPSBHaW4uSW50ZXJmYWNlLlR5cE96bmFjZW5pUmFka3VTZXpuYW11Lk5lcHJvdmVkZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkW2ldLnBvcmFkaSA9IGxfcG9yYWRpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxfcG9yYWRpICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Qb2NldENlbGtlbSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiT2Rlc2xhdFphc2lsa3lGeXppY2t5IDIzOTIwMTA3LzI6IGxfcG9yYWRpOiBcIiArIGxfcG9yYWRpICsgXCJQb2NldENlbGtlbTogXCIgKyB0aGlzLlBvY2V0Q2Vsa2VtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuUG9jZXRDZWxrZW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBvcmFkaSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZXM6IEpRdWVyeS5Qcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJPZGVzbGF0WmFzaWxreUZ5emlja3kgMjM5MjAxMDcvMjogcG9yYWRpOiBcIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoX3NlbGVjdGVkIGFzIEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGt5V29ya0xpc3REdG8pLm96bmFjZW5pICE9IEdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGF0LlpwdXNvYkRvclByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5FTWFpbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoYXQuU2VuZFNpZ25lZE1lc3NhZ2UoX3NlbGVjdGVkW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRGF0b3ZhU2NocmFua2E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGF0LlNlbmRNZXNzYWdlKF9zZWxlY3RlZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkh5YnJpZG5pUG9zdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGF0LlNlbmRNZXNzYWdlKF9zZWxlY3RlZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJFUlJPUiAyMzkyMDA0NVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQud2hlbi5hcHBseShudWxsLCBwcm9taXNlcykuZG9uZShcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29rID0gR29yZGljLldmbC5Db21tb24uR2V0UG9jZXRQcm92ZWRlbnljaCh0aGF0LnJlc3VsdEluZm8pID4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuVnlwcmF2ZW5pRHRvLlZyYXRpdE5ldnlwcmF2ZW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoYXQuWnB1c29iRG9yUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5EYXRvdmFTY2hyYW5rYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uSHlicmlkbmlQb3N0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xfb2sgPSB0cnVlOyBuZXZpbSBwcm9jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5SZXNvbHZlUmVzdWx0SW5mbyh0aGF0LCB0aGF0LnJlc3VsdEluZm8sIFdmbC5JbnRlcmZhY2UuVHlwQWtjZS52eXByYXZlbmksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIk9kZXNsYXRaYXNpbGt5Rnl6aWNreSAyMzkyMDEwNy8zOiBsX29rOiBcIiArIGxfb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShsX29rKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9kZXNsYXRaYXNpbGt5Rnl6aWNreShfc2VsZWN0ZWQ6IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0b1tdKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGxfcG9yYWRpID0gMTtcclxuICAgICAgICAgICAgdGhpcy5Qb2NldENlbGtlbSA9IDA7XHJcbiAgICAgICAgICAgIC8vemppc3RpbSBwb2NldCBrIHZ5cHJhdmVuaVxyXG4gICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQ2xlYXJSZXN1bHRJbmZvKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIk9kZXNsYXRaYXNpbGt5Rnl6aWNreSAyMzkyMDEwNy8xOiBcIiArIF9zZWxlY3RlZC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChfc2VsZWN0ZWRbaV0ub3puYWNlbmkgIT0gR2luLkludGVyZmFjZS5UeXBPem5hY2VuaVJhZGt1U2V6bmFtdS5OZXByb3ZlZGVubykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFtpXS5wb3JhZGkgPSBsX3BvcmFkaTtcclxuICAgICAgICAgICAgICAgICAgICBsX3BvcmFkaSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUG9jZXRDZWxrZW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIk9kZXNsYXRaYXNpbGt5Rnl6aWNreSAyMzkyMDEwNy8yOiBsX3BvcmFkaTogXCIgKyBsX3BvcmFkaSArIFwiUG9jZXRDZWxrZW06IFwiICsgdGhpcy5Qb2NldENlbGtlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBvY2V0Q2Vsa2VtID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Qb3JhZGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gX3NlbGVjdGVkLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJPZGVzbGF0WmFzaWxreUZ5emlja3kgMjM5MjAxMDcvMjogcG9yYWRpOiBcIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9zZWxlY3RlZCBhcyBHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreVdvcmtMaXN0RHRvKS5vem5hY2VuaSAhPSBHaW4uSW50ZXJmYWNlLlR5cE96bmFjZW5pUmFka3VTZXpuYW11Lk5lcHJvdmVkZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoYXQuWnB1c29iRG9yUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5FTWFpbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuU2VuZFNpZ25lZE1lc3NhZ2UoX3NlbGVjdGVkW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRGF0b3ZhU2NocmFua2E6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlNlbmRNZXNzYWdlKF9zZWxlY3RlZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkh5YnJpZG5pUG9zdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlNlbmRNZXNzYWdlKF9zZWxlY3RlZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJFUlJPUiAyMzkyMDA0NVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkLndoZW4ocHJvbWlzZSkudGhlbigoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsX29rID0gR29yZGljLldmbC5Db21tb24uR2V0UG9jZXRQcm92ZWRlbnljaCh0aGF0LnJlc3VsdEluZm8pID4gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5WeXByYXZlbmlEdG8uVnJhdGl0TmV2eXByYXZlbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGF0LlpwdXNvYkRvclByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5EYXRvdmFTY2hyYW5rYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5IeWJyaWRuaVBvc3RhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2xfb2sgPSB0cnVlOyBuZXZpbSBwcm9jXHJcbiAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlJlc29sdmVSZXN1bHRJbmZvKHRoYXQsIHRoYXQucmVzdWx0SW5mbywgV2ZsLkludGVyZmFjZS5UeXBBa2NlLnZ5cHJhdmVuaSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJPZGVzbGF0WmFzaWxreUZ5emlja3kgMjM5MjAxMDcvMzogbF9vazogXCIgKyBsX29rKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShsX29rKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvZGVzbGFuaSBqZWRub3VobyByYWRrdVxyXG4gICAgICAgIFNlbmRNZXNzYWdlKGl0ZW06IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0bywgc2lnbj86IEdvcmRpYy5XZmwuV2ViQ2xpZW50LkdTaWduYXR1cmVSZXN1bHREdG9XaXRoR3VpZHMpOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlNob3dXYWl0SW5mb1Byb2dyZXNzKHRoaXMsIFwianJlczoyMzkwMDA4MVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5Qb3JhZGkgPSB0aGlzLlBvcmFkaSArIDE7XHJcbiAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiU2VuZE1lc3NhZ2UgMjM5MjAxMDcvMTogcG9yYWRpOiBcIiArIHRoaXMuUG9yYWRpKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY2FsbDxHaW4uSW50ZXJmYWNlLkdSZXN1bHRJbmZvPihcIk9kZXNsYXRaYXNpbGt1XCIsIHsgU3hzOiBpdGVtLnN4cywgU2lnbjogc2lnbiB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuQWRkUmVzdWx0SW5mbyh0aGF0LCByKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vem5hY2VuaSA9IEdvcmRpYy5HaW4uR2xvYmFscy5HZXRUeXBPem5hY2VuaVJhZGt1U2V6bmFtdShyLlZ5c2xlZGVrISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZXJyX3N0YXR1cyA9IHIuSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm96bmFjZW5pID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiU2VuZE1lc3NhZ2UgMjM5MjAwOTYvMTogU3hzOiBcIiArIGl0ZW0uc3hzPy50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pbmZvID0gXCJFUlJPUiAyMzkyMDA3N1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIlNlbmRNZXNzYWdlIDIzOTIwMDk2LzI6IFwiICsgcmV0VmFsLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5SZXNvbHZlRmFpbGRSYWRrdSh0aGF0LCBpdGVtLnN4cyEsIHJldFZhbC5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm96bmFjZW5pID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXMucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb2Rlc2xhbmkgamVkbm91aG8gcmFka3UgbWFpbHVcclxuICAgICAgICBTZW5kU2lnbmVkTWVzc2FnZShpdGVtOiBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5VnlwcmF2ZW5pV29ya0xpc3REdG8pOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlBvcmFkaSA9IHRoaXMuUG9yYWRpICsgMTtcclxuICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJTZW5kU2lnbmVkTWVzc2FnZSAyMzkyMDA5OS8xIHBvcmFkaTogXCIgKyB0aGlzLlBvcmFkaSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnNfc2lnbiAmJiBpdGVtLnNfc2lnbiA+IDApIC8vIHBvZGVwaXNvdmF0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiU2VuZFNpZ25lZE1lc3NhZ2UgMjM5MjAwOTkvMlwiKTtcclxuICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TaG93V2FpdEluZm9Qcm9ncmVzcyh0aGlzLCBcImpyZXM6MjM5MDAwODhcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNhbGw8R2luLkludGVyZmFjZS5HUmVzdWx0SW5mbz4oXCJDcmVhdGVNYWlsXCIsIHsgU3hzOiBpdGVtLnN4cyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm96bmFjZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkdldFR5cE96bmFjZW5pUmFka3VTZXpuYW11KHIuVnlzbGVkZWshKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoci5WeXNsZWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLlByb3ZlZGVubzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5DcmVhdGVTaWduKGl0ZW0uc3hzISwgci5JbmZvISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChzaWduKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TZW5kTWVzc2FnZShpdGVtLCBzaWduKS5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocikgcHJvbWlzLnJlc29sdmUocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IHByb21pcy5yZXNvbHZlKGZhbHNlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJTZW5kU2lnbmVkTWVzc2FnZSAyMzkyMDA5OS8zOiBcIik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXN1bHRJbmZvLnB1c2gocilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub3puYWNlbmkgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBPem5hY2VuaVJhZGt1U2V6bmFtdS5OZXByb3ZlZGVubztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub3puYWNlbmkgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBPem5hY2VuaVJhZGt1U2V6bmFtdS5OZXByb3ZlZGVubztcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlJlc29sdmVGYWlsZFJhZGt1KHRoYXQsIGl0ZW0uc3hzISwgXCJFUlJPUiAyMzkyMDEwNlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJTZW5kU2lnbmVkTWVzc2FnZSAyMzkyMDA5OS80OiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIC8vIGplIG51dG5vIHZ5dHZvcml0IG1haWwgYSBwb2RlcHNhdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LlNlbmRNZXNzYWdlKGl0ZW0pLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocikgcHJvbWlzLnJlc29sdmUocik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBwcm9taXMucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZUZhaWxkUmFka3UodGhhdCwgaXRlbS5zeHMhLCBcIkVSUk9SIDIzOTIwMDUwXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENyZWF0ZVNpZ24oX3N4czogc3RyaW5nLCBndWlkOiBzdHJpbmcpOiBKUXVlcnkuUHJvbWlzZTxHb3JkaWMuV2ZsLldlYkNsaWVudC5HU2lnbmF0dXJlUmVzdWx0RHRvV2l0aEd1aWRzfG51bGw+IHtcclxuICAgICAgICAgICAgbGV0IHByb21pcyA9ICQuRGVmZXJyZWQ8R29yZGljLldmbC5XZWJDbGllbnQuR1NpZ25hdHVyZVJlc3VsdER0b1dpdGhHdWlkcyB8IG51bGw+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3ZhciBmaWxlTmFtZSA9IFwiTWFpbHswfS5lbWxcIi5mb3JtYXQoRGF0ZSgpLmZvcm1hdChcIllZWVlNTUREaGhtbXNzXCIpKTtcclxuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gXCJNYWlsS1Z5cHJhdmVuaV9cIiArIF9zeHMgKyBcIi5lbWxcIjtcclxuICAgICAgICAgICAgdmFyIGxfY2VydEluZm86IENlcnRJbmZvID0gdGhpcy5nbG9iYWxTZXR0aW5ncz8uZ2V0KEdvcmRpYy5XZmwuQXR0YWNobWVudFV0aWxzLmNlcnRJbmZvT2Rlc2xhbmlVc2VyU2V0dGluZ3NLZXkpOyAgIFxyXG4gICAgICAgICAgICBpZiAobF9jZXJ0SW5mbykgR29yZGljLldmbC5VdGlscy5TaWduT2JqLlBvZGVwaXNvdmFuaUFwcC5zZXRDZXJ0aWZpY2F0ZShsX2NlcnRJbmZvKTtcclxuICAgICAgICAgICAgR29yZGljLldmbC5VdGlscy5TaWduT2JqLlBvZGVwaXNvdmFuaUFwcC5zaWduXHJcbiAgICAgICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IGd1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25UaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkU2lnbmluZ1JlYXNvbjogdGhpcy5JeHNEcG8sXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlVHlwZTogR29yZGljLlNlY3VyaXR5LlNlcnZpY2UuU2lnbmF0dXJlVHlwZS5QN1MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VydE1vcmVJbmZvOiBsX2NlcnRJbmZvPy5jZXJ0TW9yZUluZm9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2lnbmVkQ29uZmlnOiBHb3JkaWMuV2ZsLldlYkNsaWVudC5HU2lnbmF0dXJlUmVzdWx0RHRvV2l0aEd1aWRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUoc2lnbmVkQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH0sIChyZWFzb24pID0+IHsgLy9mYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2godGhhdCwgcmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWFzb24uaGFuZGxlZCkgeyB0aGF0LmRpYWxvZ3Mud2FybmluZyhyZWFzb24ucmVhc29uKTsgfSAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRpc2tQb2RhY2lob0FyY2h1U0RpYWxvZ2VtKCk6IHZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjM5MDAwMTRcIiwgXCJqcmVzOjIzOTAwMDY1XCIsIFt7IGlkOiBcImFub1wiLCB0ZXh0OiBcImpyZXM6MjM5MDAwNjZcIiB9LCB7IGlkOiBcImRvcG9yXCIsIHRleHQ6IFwianJlczoyMzkwMDA2N1wiIH0sIHsgaWQ6IFwibmVcIiwgdGV4dDogXCJqcmVzOjIzOTAwMDY4XCIgfSxdKSAvL1JDIDIzOTAwMDY3IDogQW5vIC0gZG9wb3IuXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsX3R5cDogR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLlR5cFRpc2t1UG9kYWNpaG9BcmNodSA9IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUubmV0aXNrbm91O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3R5cCA9IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUudGlza25vdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRvcG9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3R5cCA9IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUudGlza25vdXREb3BvcnVjZW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsX3R5cCAhPSBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1Lm5ldGlza25vdSkgVnlwTGlzdEJhc2VQYWdlLlRpc2tQb2RhY2lob0FyY2h1UHJpcHJhdmEodGhhdCwgbF90eXApXHJcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgS29udHJvbGFTdGF2dURTT2Rlc2lsYXRlbGUoKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSB0aGF0Lm1haW5HcmlkLmdncmlkPFdmbC5JbnRlcmZhY2UuR1phc2lsa3lMaXN0RHRvPihcImdldFNlbGVjdGlvblwiKS5tYXAoKG8pID0+IHsgcmV0dXJuIHsgSWQ6IG8uaWRfZHNfb2RlcyB9OyB9KSBhcyBXZmwuSW50ZXJmYWNlLkdTZXpuYW1JZFtdO1xyXG4gICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdEluZm8odGhhdCwgXCJqcmVzOjIzOTAwMDc1XCIpOyAvL1JDIDIzOTAwMDc1IDogUHJvYsOtaMOhIGtvbnRyb2xhXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HU2V6bmFtSWRbXT4oXCJHZXRaYW1jZW5lTWFpbGJveHlcIiwgeyBEc09kZXM6IHNlbGVjdGVkIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoemFtY2VuZU1haWxib3h5KSB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJLb250cm9sYVN0YXZ1RFNPZGVzaWxhdGVsZSAyMzkyMDA5MC8xXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoemFtY2VuZU1haWxib3h5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJLb250cm9sYVN0YXZ1RFNPZGVzaWxhdGVsZSAyMzkyMDA5MC8yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjM5MDAwMTRcIiwgXCJqcmVzOjIzOTAwMDI5XCIpLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpLy9SQyAyMzkwMDAyOSA6IE9kZW1rbm91dCB6YW3EjWVuw6kgc2NocsOhbmt5P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbCA9PT0gXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk9kZW1rbm91dFphbWNlbmVNYWlsYm94eSh6YW1jZW5lTWFpbGJveHkpLnRoZW4oKCkgPT4geyBwcm9taXMucmVzb2x2ZSh0cnVlKSB9LCAoKSA9PiB7IHByb21pcy5yZXNvbHZlKGZhbHNlKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuT2RlbWtub3V0WmFtY2VuZU1haWxib3h5KHphbWNlbmVNYWlsYm94eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcHJvbWlzLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiS29udHJvbGFTdGF2dURTT2Rlc2lsYXRlbGUgMjM5MjAwOTAvM1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBLb250cm9sYVN0YXZ1TWFpbGJveHlIUChfc2VsZWN0ZWQ6IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0b1tdKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJLb250cm9sYVN0YXZ1TWFpbGJveHlIUCAyMzkyMDEwMC8xXCIpO1xyXG4gICAgICAgICAgICBHaW4uR2xvYmFscy5TaG93V2FpdEluZm8odGhhdCwgXCJqcmVzOjIzOTAwMDc1XCIpOyAvL1JDIDIzOTAwMDc1IDogUHJvYsOtaMOhIGtvbnRyb2xhXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDxHaW4uSW50ZXJmYWNlLkdSZXN1bHRJbmZvPihcIktvbnRyb2xhWmFta3VPZGVzbGFuaVwiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuVnlzbGVkZWsgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLk5lcHJvdmVkZW5vKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjIzOTAwMDE0XCIsIHJlcy5JbmZvISkub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwgPT09IFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5PZGVta25vdXRaYW1la09kZXNsYW5pKCkuZG9uZShmdW5jdGlvbiAoaXNPSylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGlzT0spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIHRleHRTdGF0dXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIktvbnRyb2xhU3RhdnVNYWlsYm94eUhQIDIzOTIwMTAwLzJcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJZk92ZXJvdmF0RFNBZHJlc2F0dSgpOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5WeXByYXZlbmlEdG8uT3Zlcm92YXREU0FkcmVzYXR1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjIzOTAwMDE0XCIsIFwianJlczoyMzkwMDA2OVwiKS5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7IC8vUkMgMjM5MDAwMTQgOiBEb3RhelxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pcy5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBrb250cm9sYSBqZWRub3VobyByYWRrdVxyXG4gICAgICAgIEtvbnRyb2xhRFNBZHJlc2F0dShpdGVtOiBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5VnlwcmF2ZW5pV29ya0xpc3REdG8pOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGFueT4oKTtcclxuICAgICAgICAgICAgdmFyIElzR2V4ID0gdGhpcy5acHVzb2JEb3JQcm9wID09IFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uR0VYO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJLb250cm9sYURTQWRyZXNhdHUgMjM5MjAxMDEvMVwiKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ub3puYWNlbmkgIT0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBsX3JlczogR2luLkludGVyZmFjZS5HUmVzdWx0SW5mbyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbF9yZXMuSXhzID0gaXRlbS5zeHM7XHJcbiAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2hvd1dhaXRJbmZvUHJvZ3Jlc3ModGhpcywgXCJqcmVzOjIzOTAwMDgwXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlV0aWxzLk92ZXJJU0RTeldGTCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ0dleDogSXNHZXggPyBcIjFcIiA6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9VY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBQcmV2eml0Vk9rbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiBpdGVtLml4c19lc3UgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJvdmF0SmVuRXhpc3RlbmNpU2NocmFua3k6IHRoaXMuU2Vzc2lvbkluZm8uSXNWeXZvaiA/IFwiMVwiIDogXCIwXCIgLy8gXCIxO1wiID0gamVub20gZXhpc3RlbmNpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5zdGF2ICYmIHR5cGVvZiByZXRWYWwuc3RhdiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXRWYWwuc3Rhdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYWxlemVub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3Jlcy5FcnJvclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3Jlcy5WeXNsZWRlayA9IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cFZ5c2xlZGt1T3BlcmFjZS5Qcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJldnphdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yZXMuRXJyb3JUZXh0ID0gXCJqcmVzOjIzOTAwMDc3XCI7IC8vUkMgMjM5MDAwNzcgOiBEYXRhIGFkcmVzw6F0YSBieWxhIHDFmWV2emF0YSB6IElTRFNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yZXMuVnlzbGVkZWsgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuUHJvdmVkZW5vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5lcHJldnphdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yZXMuRXJyb3JUZXh0ID0gXCJEYXRhIGFkcmVzw6F0YSBuZWJ5bGEgcMWZZXZ6YXRhIHogSVNEU1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3Jlcy5WeXNsZWRlayA9IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cFZ5c2xlZGt1T3BlcmFjZS5Qcm92ZWRlbm9TVXBvem9ybmVuaW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmVuYWxlemVub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNHZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vemFjbmlPdmVyZW5pKFR5cFNjaHJhbmt5LkRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfcmVzLkVycm9yVGV4dCA9IFwiRGF0b3bDoSBzY2hyw6Fua2EgYWRyZXPDoXRhIG5lYnlsYSBuYWxlemVuYVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yZXMuVnlzbGVkZWsgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm96bmFjZW5pID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluZm8gPSBsX3Jlcy5FcnJvclRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfcmVzLlZ5c2xlZGVrID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLk5lcHJvdmVkZW5vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3Jlcy5FcnJvclRleHQgPSByZXRWYWwuc3RhdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VsdEluZm8ucHVzaChsX3Jlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3Jlcy5FcnJvclRleHQgPSBcIkNIWUJBIDIzOTIwMDM2XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIktvbnRyb2xhRFNBZHJlc2F0dSAyMzkyMDEwMS8yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yZXMuVnlzbGVkZWsgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm96bmFjZW5pID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmVwcm92ZWRlbm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluZm8gPSBsX3Jlcy5FcnJvclRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VsdEluZm8ucHVzaChsX3Jlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Z5aG9kbm90T3ZlcmVuaSh7IHN0YXY6IFwiZmFpbFwiIH0sIG92ZXJHZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJldFZhbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfcmVzLkVycm9yVGV4dCA9IFwiQ0hZQkEgMjM5MjAwMzcgXCIgKyByZXRWYWwgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIktvbnRyb2xhRFNBZHJlc2F0dSAyMzkyMDEwMS8zOiBcIiArIGxfcmVzLkVycm9yVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfcmVzLlZ5c2xlZGVrID0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLk5lcHJvdmVkZW5vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VsdEluZm8ucHVzaChsX3Jlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92eWhvZG5vdE92ZXJlbmkoeyBzdGF2OiBcImZhaWxcIiB9LCBvdmVyR2V4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZXJlbmlEU0FkcmVzYXR1T2xkKF9zZWxlY3RlZDogV2ZsLkludGVyZmFjZS5HWmFzaWxreVZ5cHJhdmVuaVdvcmtMaXN0RHRvW10pOiBKUXVlcnkuUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXMgPSAkLkRlZmVycmVkPGJvb2xlYW4+KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2VsZWN0ZWQubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZFtpXS5wb3JhZGkgPSBpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfc2VsZWN0ZWRbaV0uaXhzX2VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFtpXS5vem5hY2VuaSA9IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cE96bmFjZW5pUmFka3VTZXpuYW11Lk5lcHJvdmVkZW5vO1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFtpXS5pbmZvID0gXCJqcmVzOjIzOTAwMDcyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LlBvY2V0Q2Vsa2VtID0gX3NlbGVjdGVkLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5Qb3JhZGkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLklmT3Zlcm92YXREU0FkcmVzYXR1KCkuZG9uZShmdW5jdGlvbiAob3Zlcml0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3Zlcml0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5PdmVyb3ZhdERTID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZXM6IEpRdWVyeS5Qcm9taXNlPGFueT5bXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoYXQuS29udHJvbGFEU0FkcmVzYXR1KF9zZWxlY3RlZFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC53aGVuLmFwcGx5KG51bGwsIHByb21pc2VzKS5kb25lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuT3Zlcm92YXREUyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBPdmVyZW5pRFNBZHJlc2F0dShfc2VsZWN0ZWQ6IFdmbC5JbnRlcmZhY2UuR1phc2lsa3lWeXByYXZlbmlXb3JrTGlzdER0b1tdKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRbaV0ucG9yYWRpID0gaTtcclxuICAgICAgICAgICAgICAgIGlmICghX3NlbGVjdGVkW2ldLml4c19lc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRbaV0ub3puYWNlbmkgPSBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBPem5hY2VuaVJhZGt1U2V6bmFtdS5OZXByb3ZlZGVubztcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRbaV0uaW5mbyA9IFwianJlczoyMzkwMDA3MlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuUG9jZXRDZWxrZW0gPSBfc2VsZWN0ZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLlBvcmFkaSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSWZPdmVyb3ZhdERTQWRyZXNhdHUoKS5kb25lKGZ1bmN0aW9uIChvdmVyaXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvdmVyaXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5PdmVyb3ZhdERTID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvL2xldCBwcm9taXNlID0gJC53aGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBfc2VsZWN0ZWQubGVuZ3RoOyBpIDwgaWk7IGkrKykgXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LktvbnRyb2xhRFNBZHJlc2F0dShfc2VsZWN0ZWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC53aGVuKHByb21pc2UpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBwb2tyYWNvdmFuaVBvQ3lrbHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuT3Zlcm92YXREUyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pcy5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBPZGVta25vdXRaYW1jZW5lTWFpbGJveHkobG9ja2VkTWFpYm94OiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HU2V6bmFtSWRbXSk6IEpRdWVyeS5Qcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgbGV0IHByb21pcyA9ICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKTtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiT2RlbWtub3V0WmFtY2VuZU1haWxib3h5IDIzOTIwMDkxLzFcIik7XHJcbiAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dXYWl0SW5mbyh0aGlzLCBcImpyZXM6MjM5MDAwNzZcIik7IC8vUkMgMjM5MDAwNzYgOiBPZGVteWvDoW0gemFtxI1lbsOpIHNjaHLDoW5reVxyXG4gICAgICAgICAgICB0aGlzLmNhbGw8R29yZGljLkdpbi5JbnRlcmZhY2UuR1Jlc3VsdEluZm8+KFwiT2RlbWtub3V0WmFtY2VuZU1haWJveHlcIiwgeyBMb2NrZWRNYWlib3g6IGxvY2tlZE1haWJveCB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZShyICYmIHIuVnlzbGVkZWsgPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLlByb3ZlZGVubyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9kZW1rbm91dFphbWVrT2Rlc2xhbmkoKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzID0gJC5EZWZlcnJlZDxib29sZWFuPigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRJbmZvKHRoaXMsIFwianJlczoyMzkwMDA3NlwiKTsgLy9SQyAyMzkwMDA3NiA6IE9kZW15a8OhbSB6YW3EjWVuw6kgc2NocsOhbmt5XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDxHb3JkaWMuR2luLkludGVyZmFjZS5HUmVzdWx0SW5mbz4oXCJPZGVta25pWmFtZWtPZGVzbGFuaVwiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXMucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2V0U2VsZWN0ZWRaYXNpbGt5VnlwcmF2ZW5pTGlzdER0bygpOiBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5VnlwcmF2ZW5pV29ya0xpc3REdG9bXSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1haW5HcmlkLmdncmlkPFdmbC5JbnRlcmZhY2UuR1phc2lsa3lMaXN0RHRvPihcImdldFNlbGVjdGlvblwiKS5tYXAoKG8pID0+IHsgcmV0dXJuIHsgc3hzOiBvLnN4cywgaXhzX2VzdTogby5peHNfZXN1LCBha3RfaXhzX3N1OiBvLmFrdF9peHNfc3UsIHN0YXJ0X2l4c19zdTogby5zdGFydF9peHNfc3UsIHN0YXJ0X2l4c19mdW46IG8uc3RhcnRfaXhzX2Z1biwgc19zaWduOiBvLnNfc2lnbiB9OyB9KSBhcyBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0b1tdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEdvcmRpYy5WeXAuTGlzdHMge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBWeXBMaXN0QmFzZVBhZ2UgZXh0ZW5kcyBHQ29udGVudEJhc2U8V2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQz5cclxuICAgIHtcclxuICAgICAgICBacHVzb2JEb3JQcm9wOiBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtO1xyXG4gICAgICAgIExpc3RQYXJhbXM6IFZ5cC5XZWJDb250cm9scy5HVnlwTGlzdFBhcmFtc0R0bztcclxuICAgICAgICBQcmVkcGxuZW5pOiBXZmwuSW50ZXJmYWNlLkdQcmVkcGxuZW5pWmFzaWxla0R0bztcclxuICAgICAgICBWeXByYXZlbmlTZXR0aW5nczogV2ZsLkludGVyZmFjZS5HVnlwcmF2ZW5pU2V0dGluZ3NEdG87XHJcbiAgICAgICAgUHJlZHBsbmVuaVZhbGlkb3RvcnM6IGFueTtcclxuICAgICAgICBEYXRhTWF0cml4RHRvOiBXZmwuSW50ZXJmYWNlLkdEYXRhTWF0cml4RHRvO1xyXG4gICAgICAgIFBvc2xlZG5pUG9kYWNpQ2lzbG86IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIF8kZmlsZUZpZWxkOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlQWN0aW9uc1Rpc2soY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pOiB2b2lkIHtcclxuICAgICAgICAgICAgY29udGVudC5wcmludEFjdGlvbnNTdWJtZW51LnB1c2godGhpcy5DcmVhdGVBY3Rpb25UaXNrUG9kYWNpaG9BcmNodShjb250ZW50LCBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1LnRpc2tub3V0KSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQucHJpbnRBY3Rpb25zU3VibWVudS5wdXNoKHRoaXMuQ3JlYXRlQWN0aW9uVGlza1BvZGFjaWhvQXJjaHUoY29udGVudCwgR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLlR5cFRpc2t1UG9kYWNpaG9BcmNodS50aXNrbm91dERvcG9ydWNlbmUpKTtcclxuICAgICAgICAgICAgY29udGVudC5wcmludEFjdGlvbnNTdWJtZW51LnB1c2godGhpcy5DcmVhdGVBY3Rpb25UaXNrUG9kYWNpaG9BcmNodShjb250ZW50LCBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1LnRpc2tub3V0RG9aYWhyYW5pY2kpKTtcclxuICAgICAgICAgICAgY29udGVudC5wcmludEFjdGlvbnNTdWJtZW51LnB1c2godGhpcy5DcmVhdGVBY3Rpb25UaXNrUG9kYWNpaG9BcmNodShjb250ZW50LCBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1LnRpc2tub3V0RG9aYWhyYW5pY2lEb3BvcnVjZW5lKSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQucHJpbnRBY3Rpb25zU3VibWVudS5wdXNoKHRoaXMuQ3JlYXRlQWN0aW9uVGlza0V2aWRMaXN0UG9zdG92bmVobyhjb250ZW50KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvbnNQcmVkcGxuZW5pKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN1Ym1lbnVBY3Rpb25zID09IHVuZGVmaW5lZCkgY29udGVudC5zdWJtZW51QWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBjb250ZW50LnN1Ym1lbnVBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25QcmVkcGxuaXQoY29udGVudCwgV2ZsLkludGVyZmFjZS5UeXBQcmVkcGxuZW5pRW51bS5Qb2RhY2lDaXNsbykpO1xyXG4gICAgICAgICAgICBjb250ZW50LnN1Ym1lbnVBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25QcmVkcGxuaXQoY29udGVudCwgV2ZsLkludGVyZmFjZS5UeXBQcmVkcGxuZW5pRW51bS5WYWhhKSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3VibWVudUFjdGlvbnMucHVzaCh0aGlzLkNyZWF0ZUFjdGlvblByZWRwbG5pdChjb250ZW50LCBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlBvcGxhdGVrKSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3VibWVudUFjdGlvbnMucHVzaCh0aGlzLkNyZWF0ZUFjdGlvblByZWRwbG5pdChjb250ZW50LCBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlZzZSkpO1xyXG4gICAgICAgICAgICBjb250ZW50LnN1Ym1lbnVBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25QcmVkcGxuaXRQb3BsYXRla0RsZVByZWRuYXN0YXZlbmkoY29udGVudCkpO1xyXG4gICAgICAgICAgICBjb250ZW50LnN1Ym1lbnVBY3Rpb25zLnB1c2godGhpcy5DcmVhdGVBY3Rpb25QcmVkcGxuaXREbGVQcmVkbmFzdGF2ZW5pKGNvbnRlbnQpKTtcclxuICAgICAgICAgICAgY29udGVudC5zdWJtZW51QWN0aW9ucy5wdXNoKHRoaXMuQ3JlYXRlQWN0aW9uVWxveml0UHJlZHBsbmVuaShjb250ZW50KSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQUMuV2ZsQmFzZUFDLkFkZFN1Yk1lbnUoY29udGVudCwgXCJqcmVzOjIzOTAwMDQ3XCIsIEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5lZGl0b3ZhdCk7IC8vUkMgMjM5MDAwNDcgOiBQxZllZHBsbml0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUdyaWRaYXNpbGVrVnlwKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KSB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IEdvcmRpYy5XZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuR2V0R3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKEdvcmRpYy5HaW4uR2xvYmFscy5HcmlkSWNvbk9wdFJlc3VsSW5mbygpKTtcclxuICAgICAgICAgICAgZ2YuYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkxpc3RBQy5EZWxlZ2F0ZVR5cFphc2lsa3lJY29uKCkpO1xyXG4gICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuTGlzdEFDLkRlbGVnYXRlU2FibG9uYVphc2lsa3lJY29uKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29udGVudC5tb2RlbC5UeXBTZXpuYW11ID09IFdmbC5JbnRlcmZhY2UuVHlwU2V6bmFtdVphc2lsZWsudnlwcmF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnQuWnB1c29iRG9yUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5FTWFpbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkxpc3RBQy5EZWxlZ2F0ZVNTaWduSWNvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuU2Vzc2lvbkluZm8uSXNWeXZvaikge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihXZmwuTGlzdFByZWZhYnMuU1hTQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKFdmbC5MaXN0UHJlZmFicy50cmlkVnlwQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKFdmbC5MaXN0UHJlZmFicy5LVkNvbHVtbigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuYWRyZXNhdENvbHVtbigpKTtcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLnphc3RPc29iYU5hemV2Q29sdW1uKCkpO1xyXG4gICAgICAgICAgICAvL2dmLmFkZChHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLnZlY0NvbHVtbigpKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5peHBDb2x1bW4oKSk7XHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy56cHVzb2JEb3J1Y2VuaUNvbHVtbigpKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uUG9zdGE6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uRG9ydWNvdmFjaVNsdXpiYTpcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5LdXJ5cjpcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGQoV2ZsLkxpc3RQcmVmYWJzLnBvZGFjaUNpc2xvQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZERlY2ltYWxDb2x1bW4oVnlwUHJlZmFicy5wb3BsYXRla0NvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKFZ5cFByZWZhYnMudmFoYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKFZ5cFByZWZhYnMuY2VuYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLnBvc3RTbHV6YkNvbHVtbigpKTtcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLmRydWhaYXNpbGt5Q29sdW1uKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQubW9kZWwuVHlwU2V6bmFtdSA9PSBXZmwuSW50ZXJmYWNlLlR5cFNlem5hbXVaYXNpbGVrLnZ5cHJhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMudmVjQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuaWREb3J1Y2Vua3koKSk7XHJcbiAgICAgICAgICAgIGdmLmFkZChHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLm9kZXNpbGFqaWNpQWt0U3RhcnRDb2x1bW4oKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGVudC5tb2RlbC5UeXBTZXpuYW11ID09IFdmbC5JbnRlcmZhY2UuVHlwU2V6bmFtdVphc2lsZWsudnlwcmF2ZW5pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMub2Rlc2lsYWppY2lBa3RTdGFydFNVQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuY2lzbG9KZWRuYWNpQ29sdW1uKGNvbnRlbnQuTGFiZWxDaXNsb0plZG5hY2kpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm1vZGVsLlR5cFNlem5hbXUgPT0gV2ZsLkludGVyZmFjZS5UeXBTZXpuYW11WmFzaWxlay52eXByYXZlbmkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRhdG92YVNjaHJhbmthOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5HRVg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oVnlwUHJlZmFicy5pZERTT2Rlc2lsdGVsZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZi5hZGREYXRlVGltZUNvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLmRhdE9kZXNDb2x1bW4oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuYWRyZXNhdEptZW5vQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZW50LlpwdXNvYkRvclByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uUG9zdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRvcnVjb3ZhY2lTbHV6YmE6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkt1cnlyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuYWRyZXNhdFBvc3RhQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuYWRyZXNhdEFkcmVzYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm1vZGVsLlR5cFNlem5hbXUgPT0gV2ZsLkludGVyZmFjZS5UeXBTZXpuYW11WmFzaWxlay5rUHJldnpldGlEbGVJRCkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLm5hemV2U3RhcnRTVUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZERhdGVDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5kYXRPZGVzQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbihHb3JkaWMuV2ZsLkxpc3RQcmVmYWJzLmFkcmVzYXRKbWVub0NvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5hZHJlc2F0UG9zdGFDb2x1bW4oKSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKEdvcmRpYy5XZmwuTGlzdFByZWZhYnMuYWRyZXNhdEFkcmVzYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZERhdGVDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5kYXREYXRabWVuYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQubW9kZWwuVHlwU2V6bmFtdSA9PSBXZmwuSW50ZXJmYWNlLlR5cFNlem5hbXVaYXNpbGVrLnZ5cHJhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZW50LlpwdXNvYkRvclByb3ApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkVNYWlsOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5XZmxjenBkRW51bS5EYXRvdmFTY2hyYW5rYTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuV2ZsY3pwZEVudW0uR0VYOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInBvY2V0X2VsX3NvdWJvcnVcIiwgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDIwXCIsIHdpZHRoOiA4MCB9KSAvL1JDIDIzOTAwMDIwIDogUG/EjWV0IGVsLiBwxZnDrWxvaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5acHVzb2JEb3JQcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkVNYWlsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKFdmbC5MaXN0UHJlZmFicy5vZGVzaWxhdGVsU2NocmFua2FDb2x1bW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oV2ZsLkxpc3RQcmVmYWJzLmFkcmVzYXRTY2hyYW5rYUNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLldmbGN6cGRFbnVtLkRhdG92YVNjaHJhbmthOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5Qb3ZvbGVub0hLUCkgZ2YuYWRkVGV4dENvbHVtbihXZmwuTGlzdFByZWZhYnMuYWRyZXNhdEhLUGNvbHVtbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oR29yZGljLldmbC5MaXN0UHJlZmFicy5lcnJvclRleHRDb2x1bW4oKSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZ3JpZEZvcm1hdCA9IGdmO1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5DcmVhdGVHcmlkQmFzZVphc2lsZWsoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEdldFNlbGVjdGVkR0RhdGFaYXNpbGt5UHJvVnlwb2NldFZhaHlBUG9wbGF0a3VEdG8oY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pOiBXZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0b1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubWFpbkdyaWQuZ2dyaWQ8V2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG8+KFwiZ2V0U2VsZWN0aW9uXCIpLm1hcCgobykgPT4geyByZXR1cm4geyBzeHM6IG8uc3hzLCBwb3BsYXRlazogby5wb3BsYXRlaywgdmFoYTogby52YWhhLCBzdGF0OiBvLnN0YXQsIGRydWhfemFzOiBvLmRydWhfemFzLCBrb21iX3NsdXplYjogby5rb21iX3NsdXplYiwgcHJpel9kb3J1Yzogby5wcml6X2RvcnVjIH07IH0pIGFzIFdmbC5JbnRlcmZhY2UuR1phc2lsa3lMaXN0RHRvW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEdldEFsbFphc2lsa2FJZFNYU0R0byhjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IFdmbC5JbnRlcmZhY2UuR1phc2lsa2FJZFNYU0R0b1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQubWFpbkdyaWQuZ2dyaWQ8V2ZsLkludGVyZmFjZS5HWmFzaWxrYUlkU1hTRHRvPihcImdldFNlbGVjdGlvblwiKS5tYXAoKG8pID0+IHsgcmV0dXJuIHsgc3hzOiBvLnN4cywgaWRfZG9ydW5reTogby5pZF9kb3J1Y2Vua3kgfTsgfSkgYXMgV2ZsLkludGVyZmFjZS5HWmFzaWxrYUlkU1hTRHRvW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvblByZWRwbG5pdChjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgdHlwOiBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLCBmYXZvcml0ZT86IGJvb2xlYW4pOiBHQWN0aW9uIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBsX2NhcHRpb24gPSBcImpyZXM6MjM5MDAwNDdcIiArIFwiIFwiOyAvL1JDIDIzOTAwMDQ3IDogUMWZZWRwbG5pdFxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlBvZGFjaUNpc2xvOiBsX2NhcHRpb24gKz0gXCJqcmVzOjIzOTAwMDQ4XCI7IC8vUkMgMjM5MDAwNDggOiBwb2RhY8OtIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlZhaGE6IGxfY2FwdGlvbiArPSBcImpyZXM6MjM5MDAwNDlcIjsgLy9SQyAyMzkwMDA0OSA6IHbDoWh1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgV2ZsLkludGVyZmFjZS5UeXBQcmVkcGxuZW5pRW51bS5Qb3BsYXRlazogbF9jYXB0aW9uICs9IFwianJlczoyMzkwMDA1MFwiOyAvL1JDIDIzOTAwMDUwIDogcG9wbGF0ZWtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlZzZTogbF9jYXB0aW9uICs9IFwianJlczoyMzkwMDA1MlwiOyAvL1JDIDIzOTAwMDUyIDogdsWhZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZWRwbG5pdF9cIiArIHR5cCxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IGxfY2FwdGlvbixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IGxfY2FwdGlvbixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgY29udGVudC5QcmVkcGxuZW5pKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5QcmVkcGxuZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZWRwbG5lbmkgbmEgY2xpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2lmUG9kQ2lzbG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfaWZWYWhhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2lmUG9wbGF0ZWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByZWRwbG5lbmlTZXJ2ZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwUHJlZHBsbmVuaUVudW0uUG9kYWNpQ2lzbG86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9pZlBvZENpc2xvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGxuZW5pU2VydmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlZhaGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9pZlZhaGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwUHJlZHBsbmVuaUVudW0uUG9wbGF0ZWs6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9pZlBvcGxhdGVrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFByZWRwbG5lbmlFbnVtLlZzZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGxuZW5pU2VydmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2lmUG9kQ2lzbG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfaWZWYWhhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX2lmUG9wbGF0ZWsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5WeXAuQXBwU2V0dGluZ3MuU2V0VnlwcmF2ZW5pU2V0dGluZ3MoY29udGVudCwgeyBub3ZlUG9kYWNpQ2lzbG86IGNvbnRlbnQuUHJlZHBsbmVuaS5ub3ZlUG9kYWNpQ2lzbG8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZHBsbmVuaVNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfc2VsZWN0ZWQgPSBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLkdldFNlbGVjdGVkR1phc2lsa2FFZGl0TGlzdER0byhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsX3NlbGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNhbGw8R29yZGljLldmbC5JbnRlcmZhY2UuR1phc2lsa2FFZGl0TGlzdER0b1tdPihcIlByZWRwbG5pdFphc2lsa3lcIiwgeyBTZWxlY3RlZDogbF9zZWxlY3RlZCwgVHlwOiB0eXAsIFByZWRwbG5lbmk6IGNvbnRlbnQuUHJlZHBsbmVuaSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRlbnQuSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9zbGVkbmkgcG9kYWNpIGNpc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5QcmVkcGxuZW5pLnBvZF9jaXNsbyA9IGNvbnRlbnQuUG9zbGVkbmlQb2RhY2lDaXNsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZpbmRGaWVsZHMoXCJwb2RfY2lzbG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY29udGVudC5Qb3NsZWRuaVBvZGFjaUNpc2xvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVnlwLkFwcFNldHRpbmdzLlNldFZ5cHJhdmVuaVNldHRpbmdzKGNvbnRlbnQsIHsgcG9zbGVkbmlQb2RhY2lDaXNsbzogY29udGVudC5Qb3NsZWRuaVBvZGFjaUNpc2xvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3ZpZXcgPSBjb250ZW50Lm1haW5HcmlkLmdncmlkPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGthRWRpdExpc3REdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RhdGFSb3dzID0gbF92aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmQgPSBsX2RhdGFSb3dzLmZpbHRlcigoaXQpID0+IGl0LmRhdGEuc3hzICYmIGl0LmtleSA9PT0gZGF0YVtpXS5zeHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3JvdyA9IGZpbmQubGVuZ3RoID09PSAxID8gZmluZFswXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsX2lmUG9kQ2lzbG8pIGxfcm93LmRhdGEucG9kX2Npc2xvID0gZGF0YVtpXS5wb2RfY2lzbG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsX2lmVmFoYSkgbF9yb3cuZGF0YS52YWhhID0gZGF0YVtpXS52YWhhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9pZlBvcGxhdGVrKSBsX3Jvdy5kYXRhLnBvcGxhdGVrID0gZGF0YVtpXS5wb3BsYXRlaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3ZpZXcudXBkYXRlRGF0YShsX2RhdGFSb3dzLCBcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TaG93SW5mb05lbmlWeWJyYW5aYWRueVJhZGVrKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfdmlldyA9IGNvbnRlbnQubWFpbkdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfZGF0YVJvd3MgPSBsX3ZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsX2RhdGFSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfZGF0YVJvd3NbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9pZlBvZENpc2xvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9wb2RDaXNsbyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5QcmVkcGxuZW5pLnRleHRfcHJlZCkgbF9wb2RDaXNsbyArPSBjb250ZW50LlByZWRwbG5lbmkudGV4dF9wcmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuUHJlZHBsbmVuaS5wb2RfY2lzbG8pIGxfcG9kQ2lzbG8gKz0gY29udGVudC5QcmVkcGxuZW5pLnBvZF9jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LlByZWRwbG5lbmkudGV4dF96YSkgbF9wb2RDaXNsbyArPSBjb250ZW50LlByZWRwbG5lbmkudGV4dF96YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGF0YVJvd3NbaV0uZGF0YVtcInBvZF9jaXNsb1wiXSA9IGxfcG9kQ2lzbG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsX2lmVmFoYSkgbF9kYXRhUm93c1tpXS5kYXRhW1widmFoYVwiXSA9IGNvbnRlbnQuUHJlZHBsbmVuaS52YWhhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfaWZQb3BsYXRlaykgbF9kYXRhUm93c1tpXS5kYXRhW1wicG9wbGF0ZWtcIl0gPSBjb250ZW50LlByZWRwbG5lbmkucG9wbGF0ZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbF92aWV3LnVwZGF0ZURhdGEobF9kYXRhUm93cywgXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2FsbDxib29sZWFuPihcIlVsb3pQcmVkcGxuZW5pXCIsIHsgbW9kZWw6IGNvbnRlbnQuUHJlZHBsbmVuaSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZhdm9yaXRlICYmIGZhdm9yaXRlID09IHRydWUpIGFjdGlvbi51cGRhdGUoeyBncm91cE5hbWU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5BY3Rpb25zR3JvdXBOYW1lLkZhdm9yaXRlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25QcmVkcGxuaXREbGVQcmVkbmFzdGF2ZW5pKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+LCBmYXZvcml0ZT86IGJvb2xlYW4pOiBHQWN0aW9uIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZWRwbG5pdFZhaHVQb3BsYXRla0RsZVByZWRuYXN0YXZlbmlcIixcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5lZGl0b3ZhdCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDA2MVwiLCAvL1JDIDIzOTAwMDYxIDogUMWZZWRwbG5pdCBwb3BsYXRlay92w6FodSBkbGUgcMWZZWRuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAwNjFcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuUHJlZHBsbml0UG9wbGF0ZWtEbGVQcmVkbmFzdGF2ZW5pKGNvbnRlbnQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZhdm9yaXRlICYmIGZhdm9yaXRlID09IHRydWUpIGFjdGlvbi51cGRhdGUoeyBncm91cE5hbWU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5BY3Rpb25zR3JvdXBOYW1lLkZhdm9yaXRlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25QcmVkcGxuaXRQb3BsYXRla0RsZVByZWRuYXN0YXZlbmkoY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4sIGZhdm9yaXRlPzogYm9vbGVhbik6IEdBY3Rpb24ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJlZHBsbml0VmFodVBvcGxhdGVrRGxlUHJlZG5hc3RhdmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLmVkaXRvdmF0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMjAwXCIsIC8vUkMgMjM5MDAyMDAgOiBQxZllZHBsbml0IHBvcGxhdGVrIGRsZSBwxZllZG5hc3RhdmVuw61cclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDIwMFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFZ5cExpc3RCYXNlUGFnZS5QcmVkcGxuaXRQb3BsYXRla0RsZVByZWRuYXN0YXZlbmkoY29udGVudCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChmYXZvcml0ZSAmJiBmYXZvcml0ZSA9PSB0cnVlKSBhY3Rpb24udXBkYXRlKHsgZ3JvdXBOYW1lOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQWN0aW9uc0dyb3VwTmFtZS5GYXZvcml0ZSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUHJlZHBsbml0UG9wbGF0ZWtEbGVQcmVkbmFzdGF2ZW5pKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+LCBfcG91emVQb3BsYXRlazogYm9vbGVhbik6IHZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsX3NlbGVjdGVkID0gVnlwTGlzdEJhc2VQYWdlLkdldFNlbGVjdGVkR0RhdGFaYXNpbGt5UHJvVnlwb2NldFZhaHlBUG9wbGF0a3VEdG8oY29udGVudCk7XHJcbiAgICAgICAgICAgIGlmIChsX3NlbGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG9bXT4oXCJQcmVkcGxuaXRQb3BsYXRla0FWYWh1RGxlUHJlZG5hc3RhdmVuaVwiLCB7IFNlbGVjdGVkOiBsX3NlbGVjdGVkLCBQb3V6ZVBvcGxhdGVrOiBfcG91emVQb3BsYXRlayB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3ZpZXcgPSBjb250ZW50Lm1haW5HcmlkLmdncmlkPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0bz4oXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9kYXRhUm93cyA9IGxfdmlldy5nZXREYXRhUm93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluZCA9IGxfZGF0YVJvd3MuZmlsdGVyKChpdCkgPT4gaXQuZGF0YS5zeHMgJiYgaXQua2V5ID09PSBkYXRhW2ldLnN4cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9yb3cgPSBmaW5kLmxlbmd0aCA9PT0gMSA/IGZpbmRbMF0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxfcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9yb3cuZGF0YS52YWhhID0gZGF0YVtpXS52YWhhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfcm93LmRhdGEucG9wbGF0ZWsgPSBkYXRhW2ldLnBvcGxhdGVrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfdmlldy51cGRhdGVEYXRhKGxfZGF0YVJvd3MsIFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TaG93SW5mb05lbmlWeWJyYW5aYWRueVJhZGVrKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25FZGl0YWNlRGF0UHJlZHBsbmVuaShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgZmF2b3JpdGU/OiBib29sZWFuKTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEVkaXRhY2VEYXRQcmVkcGxuZW5pXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0uZWRpdG92YXQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAxNzhcIiwgLy9SQyAyMzkwMDE3OCA6IE5hc3RhdmVuaSBob2Rub3QgcMWZZXBsbsSbbsOtXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxNzhcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93RGF0YSA9IFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5HZXRBY3RpdmVSb3coY29udGVudCkgYXMgV2ZsLkludGVyZmFjZS5HRWRpdGFjZVphc2lsa3lEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlZ5cC5EaWFsb2dzLlByZWRwbG5lbmlaYXNpbGt5RGxnKGNvbnRlbnQsIHsgZGF0YTogY29udGVudC5QcmVkcGxuZW5pIH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlByZWRwbG5lbmkgPSByZXRWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZhdm9yaXRlICYmIGZhdm9yaXRlID09IHRydWUpIGFjdGlvbi51cGRhdGUoeyBncm91cE5hbWU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5BY3Rpb25zR3JvdXBOYW1lLkZhdm9yaXRlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25abWVuYUhvZG5vdChjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgZmF2b3JpdGU/OiBib29sZWFuKTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFptZW5hSG9kbm90XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0uZWRpdG92YXQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAwNjJcIiwgLy9SQyAyMzkwMDA2MiA6IFptxJtuaXQgaG9kbm90eSDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAwNjJcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvd0RhdGEgPSBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuR2V0QWN0aXZlUm93KGNvbnRlbnQpIGFzIFdmbC5JbnRlcmZhY2UuR0VkaXRhY2VaYXNpbGt5RHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5WeXAuRGlhbG9ncy5FZGl0YWNlWmFzaWxreURsZyhjb250ZW50LCB7IGRhdGE6IHJvd0RhdGEgfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGEucG9kX2Npc2xvID0gcmV0VmFsLnBvZF9jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93RGF0YS5jZW5hID0gcmV0VmFsLmNlbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGEucG9wbGF0ZWsgPSByZXRWYWwucG9wbGF0ZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGEudmFoYSA9IHJldFZhbC52YWhhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuVXBkYXRlUm93RGF0YShjb250ZW50LCByb3dEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5OZXVsb3plbmFEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZmF2b3JpdGUgJiYgZmF2b3JpdGUgPT0gdHJ1ZSkgYWN0aW9uLnVwZGF0ZSh7IGdyb3VwTmFtZTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkFjdGlvbnNHcm91cE5hbWUuRmF2b3JpdGUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUZyYW5rb3ZhbmlBY3Rpb25zKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBsX3NldHRpbmdzID0gY29udGVudC5WeXByYXZlbmlTZXR0aW5ncztcclxuICAgICAgICAgICAgaWYgKGxfc2V0dGluZ3MgJiYgbF9zZXR0aW5ncy50eXBfZnJhbmtvdmFuaSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChsX3NldHRpbmdzLnR5cF9mcmFua292YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cEZyYW5rb3ZhY2lob1N0cm9qZS5OZW9wb3N0RGF0YU1hdHJpeEN0ZWNrYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQubW9kZWwuVHlwU2V6bmFtdSAhPSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBTZXpuYW11WmFzaWxlay5rUHJldnpldGlEbGVJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3MuVHlwRnJhbmtvdmFuaURiUGFyYW0gPT0gV2ZsLkludGVyZmFjZS5UeXBGcmFua292YW5pRGJQYXJhbS5kYXRhbWF0cml4Q3RlY2thKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LkluZm8pIEdvcmRpYy5XZmwuQUMuV2ZsQmFzZUFDLlNob3dGbGFzaFdhcm5pbmcoY29udGVudCwgY29udGVudC5JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNwZWNpYWxBY3Rpb25zLnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvbkZyYW5rb3ZhbmlPbkxpbmUoY29udGVudCwgbF9zZXR0aW5ncy50eXBfZnJhbmtvdmFuaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFdmbC5JbnRlcmZhY2UuVHlwRnJhbmtvdmFjaWhvU3Ryb2plLkZyYW1hU291Ym9yOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNwZWNpYWxBY3Rpb25zLnB1c2goVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUFjdGlvbkZyYW5rb3ZhbmlPZmZMaW5lKGNvbnRlbnQsIGxfc2V0dGluZ3MudHlwX2ZyYW5rb3ZhbmkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLkNyZWF0ZUdldEZpbGVGaWVsZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlQWN0aW9uVWxveml0UHJlZHBsbmVuaShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgZmF2b3JpdGU/OiBib29sZWFuKTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFVsb3ppdFByZWRwbG5lbmlcIixcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS51bG96aXQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAwNTFcIiwgLy9SQyAyMzkwMDA1MSA6IFVsb8W+aXQgcMWZZWRwbG7Em27DrVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMDUxXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGNvbnRlbnQuUHJlZHBsbmVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlZ5cC5BcHBTZXR0aW5ncy5TZXRWeXByYXZlbmlTZXR0aW5ncyhjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0X3ByZWQ6IGNvbnRlbnQuUHJlZHBsbmVuaS50ZXh0X3ByZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NsZWRuaVBvZGFjaUNpc2xvOiBjb250ZW50LlByZWRwbG5lbmkucG9kX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dF96YTogY29udGVudC5QcmVkcGxuZW5pLnRleHRfemEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3BsYXRlazogY29udGVudC5QcmVkcGxuZW5pLnBvcGxhdGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFoYTogY29udGVudC5QcmVkcGxuZW5pLnZhaGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZlUG9kYWNpQ2lzbG86IGNvbnRlbnQuUHJlZHBsbmVuaS5ub3ZlUG9kYWNpQ2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHNjOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXQ6IGNvbnRlbnQuUHJlZHBsbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZG9yX3NsdXpiYTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZhdm9yaXRlICYmIGZhdm9yaXRlID09IHRydWUpIGFjdGlvbi51cGRhdGUoeyBncm91cE5hbWU6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5BY3Rpb25zR3JvdXBOYW1lLkZhdm9yaXRlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25UaXNrUG9kYWNpaG9BcmNodShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgdHlwOiBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1KTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBsX2NhcHRpb24gPSBcImpyZXM6MjM5MDAwMzlcIjtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXApIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLlR5cFRpc2t1UG9kYWNpaG9BcmNodS50aXNrbm91dDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLlR5cFRpc2t1UG9kYWNpaG9BcmNodS50aXNrbm91dERvcG9ydWNlbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgbF9jYXB0aW9uICs9IFwiIFwiICsgXCIoXCIgKyBcImpyZXM6MjM5MDAwNDBcIiArIFwiKVwiOyAvL1JDIDIzOTAwMDQwIDogZG9wb3J1xI1lbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUudGlza25vdXREb1phaHJhbmljaTpcclxuICAgICAgICAgICAgICAgICAgICBsX2NhcHRpb24gKz0gXCIgXCIgKyBcImpyZXM6MjM5MDAxNjhcIjsgLy9SQyAyMzkwMDE2OCA6IGRvIHphaHJhbmnEjcOtXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUudGlza25vdXREb1phaHJhbmljaURvcG9ydWNlbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgbF9jYXB0aW9uICs9IFwiIFwiICsgXCJqcmVzOjIzOTAwMTcwXCIgKyBcIiBcIiArIFwiKFwiICsgXCJqcmVzOjIzOTAwMDQwXCIgKyBcIilcIjsgLy9SQyAyMzkwMDE3MCA6IGRvIHphaHIuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5BY3Rpb25zTmFtZS5UaXNrUG9kYWNpaG9BcmNodSxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS50aXNrLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogbF9jYXB0aW9uLCAvL1JDIDIzOTAwMDM5IDogVGlzayAtIFBvZGFjw60gYXJjaCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IGxfY2FwdGlvbixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuVGlza1BvZGFjaWhvQXJjaHVQcmlwcmF2YShjb250ZW50LCB0eXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVGlza1BvZGFjaWhvQXJjaHVQcmlwcmF2YShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgdHlwOiBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuVHlwVGlza3VQb2RhY2lob0FyY2h1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuTGlzdFBhcmFtcy5WeWJlclRpc2tQQSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbF9hc1NlbGVjdGVkU3hzID0gV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5HZXRTeHNBcnJheUZyb21TZWxlY3Rpb24oY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxfYXNTZWxlY3RlZFN4cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vem5hY2VuaSB2IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNhbGwoXCJVcGRhdGVWeWJlclJhZGt1XCIsIHsgU2VsZWN0ZWQ6IGxfYXNTZWxlY3RlZFN4cyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuVGlza1BvZGFjaWhvQXJjaHUoY29udGVudCwgdHlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZW50LnNob3dGbGFzaChcImpyZXM6MjM5MDAxODNcIiwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLlN0YXRlRW51bS5lcnJvciwgY29udGVudC5GbGFzaFBhbmVsVGltZXIpOyAgLy9SQyAyMzkwMDE4MyA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayBrIHRpc2t1LlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLlRpc2tQb2RhY2lob0FyY2h1KGNvbnRlbnQsIHR5cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRpc2tQb2RhY2lob0FyY2h1KGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+LCB0eXA6IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5UeXBUaXNrdVBvZGFjaWhvQXJjaHUsIGV2ZW50PzogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICAgICAgdmFyIGxfcHRtID0gXCJ2eXBfcHRtX3BkYXJjaFwiO1xyXG4gICAgICAgICAgICB2YXIgYWN0ID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRsZ1Rpc2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDE2M1wiLCAvL1JDIDIzOTAwMTYzIDogR2VuZXJvdmFuaSBzIGRpYWxvZ2VtXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxNjNcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IGxfcHRtLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbF9zZXR0aW5ncyA9IGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMCA9IGNvbnRlbnQuU2Vzc2lvbkluZm8uTG9nUG9yQ2lzbG8hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IHR5cC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDIgPSBjb250ZW50LlpwdXNvYkRvclByb3AudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gY29udGVudC5MYWJlbFpuYWNrYTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA0ID0gY29udGVudC5MaXN0UGFyYW1zLlZ5YmVyVGlza1BBIS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDUgPSBjb250ZW50Lkxpc3RQYXJhbXMuSXhzSXN1ID8gY29udGVudC5MaXN0UGFyYW1zLkl4c0lzdSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNiA9IGNvbnRlbnQuTGlzdFBhcmFtcy5lcGFfc2VydmVyX2ptZW5vX3NvdWJvcnUgPyBjb250ZW50Lkxpc3RQYXJhbXMuZXBhX3NlcnZlcl9qbWVub19zb3Vib3J1IDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbF9zSURwb2RhdmF0ZWxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobF9zZXR0aW5ncy5lcGFfaWRlbnRpZmlrYWNlX3BvZGF2YXRlbGUpIGxfc0lEcG9kYXZhdGVsZSA9IGxfc2V0dGluZ3MuZXBhX2lkZW50aWZpa2FjZV9wb2RhdmF0ZWxlLnRyaW0oKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsX3NldHRpbmdzLmNpc2xvX3pha2F6bmlja2Vfa2FydHlfb2Rlc2lsYXRlbGUpIGxfc0lEcG9kYXZhdGVsZSArPSBcIiNcIiArIGxfc2V0dGluZ3MuY2lzbG9femFrYXpuaWNrZV9rYXJ0eV9vZGVzaWxhdGVsZS50cmltKCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAobF9zZXR0aW5ncy5lcGFfZGF0YV9vZGVzaWxhdGVsZSkgbF9zSURwb2RhdmF0ZWxlICs9IFwifFwiICsgbF9zZXR0aW5ncy5lcGFfZGF0YV9vZGVzaWxhdGVsZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNyA9IGxfc0lEcG9kYXZhdGVsZTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA4ID0gbF9zZXR0aW5ncy5lcGFfamVkbm96bmFjbmVfam1lbm8gPyBcIjJcIiA6IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWN0LnJ1bih7IHNoaWZ0S2V5OiBldmVudD8uc2hpZnRLZXkgfSk7O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25UaXNrS25paHlWeXByYXZlbmVQb3N0eShjb250ZW50OiBHQ29udGVudFR5cGU8V2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQz4pOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5BY3Rpb25zTmFtZS5UaXNrS25paHlWeXByYXZlbmVQb3N0eSxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS50aXNrLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTYxXCIsIC8vUkMgMjM5MDAxNjEgOiBUaXNrIGtuaWh5IHZ5cHJhdmVuw6kgcG/FoXR5XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRsZ1Rpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTYyXCIsIC8vUkMgMjM5MDAxNjIgOiBHZW5lcm92YW5pIHMgZGlhbG9nZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTYyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwidnlwX3B0bV9rbnZ5cHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RhdGUgPSBHb3JkaWMuV2ZsLkdsb2JhbHMuR2V0V2ZsRGF0ZUludGVydmFsRm9yUmVwb3J0KGNvbnRlbnQuSW50ZXJ2YWxPZERvLCBHb3JkaWMuV2ZsLkludGVyZmFjZS5Gb3JtYXREYXRlVHlwZS55eXl5TU1kZCwgY29udGVudC5TZXNzaW9uSW5mby5EYXRhYmFzZVR5cGUhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSBjb250ZW50LlNlc3Npb25JbmZvLkl4c1N1IS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IGxfZGF0ZS5zdGFydCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gbF9kYXRlLmVuZCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA0ID0gY29udGVudC5MYWJlbFpuYWNrYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdC5ydW4oeyBzaGlmdEtleTogZXY/LnNoaWZ0S2V5IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlQWN0aW9uVGlza1Z5a2F6dShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IEdBY3Rpb24ge1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR29yZGljLlZ5cC5HbG9iYWxzLkVudW1zLkFjdGlvbnNOYW1lLlRpc2tWeWthenUsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0udGlzayxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDE2NFwiLCAvL1JDIDIzOTAwMTY0IDogVGlzayB2w71rYXrFr1xyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3QgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbGdUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDE2NVwiLCAvL1JDIDIzOTAwMTY1IDogR2VuZXJvdmFuaSBzIGRpYWxvZ2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyMzkwMDE2NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcInZ5cF9wdG1fZGVudnlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbF9zZXR0aW5ncyA9IGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9kYXRlID0gR29yZGljLldmbC5HbG9iYWxzLkdldFdmbERhdGVJbnRlcnZhbEZvclJlcG9ydChjb250ZW50LkludGVydmFsT2REbywgR29yZGljLldmbC5JbnRlcmZhY2UuRm9ybWF0RGF0ZVR5cGUuZGRNTXl5eXksIGNvbnRlbnQuU2Vzc2lvbkluZm8uRGF0YWJhc2VUeXBlISwgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSBjb250ZW50LlNlc3Npb25JbmZvLkl4c1N1IS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IGxfZGF0ZS5zdGFydCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gbF9kYXRlLmVuZCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gbF9zZXR0aW5ncy5jaXNsb19wb2RhdmF0ZWxlID8gbF9zZXR0aW5ncy5jaXNsb19wb2RhdmF0ZWxlIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDQgPSBsX3NldHRpbmdzLnV6aXZhdGVsX3ZzID8gbF9zZXR0aW5ncy51eml2YXRlbF92cyA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gY29udGVudC5TZXNzaW9uSW5mby5JeHNTdSEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDYgPSBsX3NldHRpbmdzLnBzYyA/IGxfc2V0dGluZ3MucHNjIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDcgPSBHb3JkaWMuV2ZsLkdsb2JhbHMuR2V0RGF0ZVN0cmluZ0Zyb21Kc29uRGF0ZShjb250ZW50LkludGVydmFsT2REby5lbmQhLCBHb3JkaWMuV2ZsLkludGVyZmFjZS5Gb3JtYXREYXRlVHlwZS5kZE1NeXl5eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhY3QucnVuKHsgc2hpZnRLZXk6IGV2Py5zaGlmdEtleSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvblRpc2tOYWtsYWR1KGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHb3JkaWMuVnlwLkdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuVGlza1Z5a2F6dSxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS50aXNrLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTY2XCIsIC8vUkMgMjM5MDAxNjYgOiBUaXNrIG7DoWtsYWR1XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxNjZcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0ID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGxnVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAxNjVcIiwgLy9SQyAyMzkwMDE2NSA6IEdlbmVyb3ZhbmkgcyBkaWFsb2dlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxNjVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ2eXBfcHRtX25ha2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RhdGUgPSBHb3JkaWMuV2ZsLkdsb2JhbHMuR2V0V2ZsRGF0ZUludGVydmFsRm9yUmVwb3J0KGNvbnRlbnQuSW50ZXJ2YWxPZERvLCBHb3JkaWMuV2ZsLkludGVyZmFjZS5Gb3JtYXREYXRlVHlwZS5kZE1NeXl5eSwgY29udGVudC5TZXNzaW9uSW5mby5EYXRhYmFzZVR5cGUhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSBjb250ZW50LlNlc3Npb25JbmZvLkl4c1N1IS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IGxfZGF0ZS5zdGFydCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gbF9kYXRlLmVuZCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAzID0gR29yZGljLldmbC5HbG9iYWxzLkdldERhdGVTdHJpbmdGcm9tSnNvbkRhdGUoY29udGVudC5JbnRlcnZhbE9kRG8uZW5kISwgR29yZGljLldmbC5JbnRlcmZhY2UuRm9ybWF0RGF0ZVR5cGUuZGRNTXl5eXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNCA9IGNvbnRlbnQuU2Vzc2lvbkluZm8uSXhzU3UhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhY3QucnVuKHsgc2hpZnRLZXk6IGV2Py5zaGlmdEtleSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvblRpc2tWeXByYXZlbnljaERva1NwaXMoY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5BY3Rpb25zTmFtZS5UaXNrVnlrYXp1LFxyXG4gICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnRpc2ssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAxNjdcIiwgLy9SQyAyMzkwMDE2NyA6IFRpc2sgcMWZZWhsZWR1IHZ5cHJhdmVuw71jaCBkb2t1bWVudMWvL3NwaXPFr1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTY3XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRsZ1Rpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTY1XCIsIC8vUkMgMjM5MDAxNjUgOiBHZW5lcm92YW5pIHMgZGlhbG9nZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTY1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwidnlwX3B0bV9wcmVfdnlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAwID0gY29udGVudC5TZXNzaW9uSW5mby5Mb2dQb3JDaXNsbyEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSBjb250ZW50Lkxpc3RQYXJhbXMuVnliZXJUaXNrUEEhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gY29udGVudC5MaXN0UGFyYW1zLkl4c0lzdSA/IGNvbnRlbnQuTGlzdFBhcmFtcy5JeHNJc3UgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMyA9IGNvbnRlbnQuTGFiZWxabmFja2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA0ID0gY29udGVudC5acHVzb2JEb3JQcm9wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhY3QucnVuKHsgc2hpZnRLZXk6IGV2Py5zaGlmdEtleSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvblRpc2tFdmlkTGlzdFBvc3Rvdm5laG8oY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdvcmRpYy5WeXAuR2xvYmFscy5FbnVtcy5BY3Rpb25zTmFtZS5UaXNrRXZpZExpc3RQb3N0b3ZuZWhvLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnRpc2ssXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAwMzhcIiwgLy9SQyAyMzkwMDAzOCA6IFRpc2sgLSBFdmlkZcSNbsOtIGzDrXN0ZWsgcG/FoXRvdm7DqWhvXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAwMzhcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbF9wdG0gPSBcInZ5cF9wdG1fZWxwb3N0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRsZ1Rpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDM3XCIsIC8vUkMgMjM5MDAwMzcgOiBHZW5lcm92YW5pIHMgZGlhbG9nZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMDM3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IGxfcHRtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMCA9IGNvbnRlbnQuU2Vzc2lvbkluZm8uTG9nUG9yQ2lzbG8hLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAxID0gY29udGVudC5MaXN0UGFyYW1zLlZ5YmVyVGlza1BBIS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0LnJ1bih7IHNoaWZ0S2V5OiBldj8uc2hpZnRLZXkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVBY3Rpb25GcmFua292YW5pT25MaW5lKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+LCB0eXA6IFdmbC5JbnRlcmZhY2UuVHlwRnJhbmtvdmFjaWhvU3Ryb2plKTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHbG9iYWxzLkVudW1zLkFjdGlvbnNOYW1lLkZyYW5rb3ZhbmlPbmxpbmUsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBJY29ucy5BY3Rpb25FbnVtLmZyYW5rb3ZhbmlPbmxpbmUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAxMDVcIiwgLy9SQyAyMzkwMDEwNSA6IEZyYW5rb3ZhdCAtIG9ubGluZVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTA1XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cE5hbWU6IEdpbi5HbG9iYWxzLkVudW1zLkFjdGlvbnNHcm91cE5hbWUuRmF2b3JpdGUsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5PZHpuYWNWc2VjaG55UmFka3koY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLk5vdmVGcmFua292YW5pKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlQWN0aW9uRnJhbmtvdmFuaU9mZkxpbmUoY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4sIHR5cDogV2ZsLkludGVyZmFjZS5UeXBGcmFua292YWNpaG9TdHJvamUpOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuRnJhbmtvdmFuaU9mZmxpbmUsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBJY29ucy5BY3Rpb25FbnVtLmZyYW5rb3ZhbmlPZmZsaW5lLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTUwXCIsIC8vUkMgMjM5MDAxNTAgOiBJbXBvcnQgZGF0IGZyYW5rb3ZhY8OtaG8gc3Ryb2plXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjM5MDAxNTBcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogR2luLkdsb2JhbHMuRW51bXMuQWN0aW9uc0dyb3VwTmFtZS5GYXZvcml0ZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2lnbk1vZHVsZS5zaWduRmlsZSh7IGZpbGVOYW1lOiBcInRlc3QucGRmXCIsIGZpbGVQYXRoOiBcIkQ6XFxcXHRlc3QucGRmXCIsIHNpZ25XaXRoVGltZVN0YW1wOiBmYWxzZSB9KS50aGVuKChzaWduZWRDb25maWcpID0+IHsgOyB9LCAocmVhc29uKSA9PiB7IDsgfSlcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuYWRkRmlsZURvYyhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvblByZXZ6aXRTRnJhbmtvdmFuaW0oY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pOiBHQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuUHJldnppdFNGcmFua292YW5pbSxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5wcmV2eml0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTkwXCIsIC8vUkMgMjM5MDAxOTAgOiBQxZlldnrDrXQgcyBvZnJhbmtvdsOhbsOtbVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTkxXCIsIC8vUkMgMjM5MDAxOTEgOiBQxZlldnrDrXQgZGxlIMSNdGXEjWt5IHMgb2ZyYW5rb3bDoW7DrW1cclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuT2R6bmFjVnNlY2hueVJhZGt5KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5abWVuT3puYWNlbmlWc2VjaFJhZGt1VlRlbXBUYWJ1bGNlKGNvbnRlbnQsIEdpbi5JbnRlcmZhY2UuVHlwT3puYWNlbmlSYWRrdVNlem5hbXUuTmV1cmNlbm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZ5cExpc3RCYXNlUGFnZS5DYWxsRGF0YU1hdHJpeChjb250ZW50LCBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBQb3V6aXRpRGF0YU1hdHJpeEN0ZWNreS5wcmV2emV0aVNGcmFua292YW5pbSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChyZWFzb24pIHsgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlJlc29sdmVGYWlsZEFrY2UoY29udGVudCwgcmVhc29uKTsgfSk7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUFjdGlvbkltcG9ydERhdEVwYVBvc3R5KGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogR0FjdGlvbiB7XHJcbiAgICAgICAgICAgIFZ5cExpc3RCYXNlUGFnZS5DcmVhdGVHZXRGaWxlRmllbGRFUEEoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR2xvYmFscy5FbnVtcy5BY3Rpb25zTmFtZS5JbXBvcnREYXRFcGFQb3N0eSxcclxuICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5pbXBvcnRvdmF0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMTgwXCIsIC8vUkMgMjM5MDAxODAgOiBJbXBvcnQgZGF0IHBvZGFjw61obyBhcmNodVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjIzOTAwMTgwXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuYWRkRmlsZUVQQShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUdldEZpbGVGaWVsZChjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPikge1xyXG4gICAgICAgICAgICAvLyBmaWxlZmllbGQgc2UgbmVyZW5kZXJ1amUsIHBvdcW+w612w6Egc2UgcG91emUgaW50ZXJuxJtcclxuICAgICAgICAgICAgLy8ga3Z1bGkgaW1wb3J0dSBmaWxlXHJcbiAgICAgICAgICAgIGNvbnRlbnQuXyRmaWxlRmllbGQgPSAkKFwiPGRpdj5cIikuZ2ZpbGVmaWVsZCh7XHJcbiAgICAgICAgICAgICAgICBmaWxlVXBsb2FkZWQ6IChldmVudCwgZGF0YSkgPT4gVnlwTGlzdEJhc2VQYWdlLl9hZGRGaWxlRnJhbmtvdmFuaShjb250ZW50LCBkYXRhLmZpbGVJbmZvLCBkYXRhLmN1c3RvbURhdGEpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDcmVhdGVHZXRGaWxlRmllbGRFUEEoY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4pIHtcclxuICAgICAgICAgICAgLy8gZmlsZWZpZWxkIHNlIG5lcmVuZGVydWplLCBwb3XFvsOtdsOhIHNlIHBvdXplIGludGVybsSbXHJcbiAgICAgICAgICAgIC8vIGt2dWxpIGltcG9ydHUgZmlsZVxyXG4gICAgICAgICAgICBjb250ZW50Ll8kZmlsZUZpZWxkID0gJChcIjxkaXY+XCIpLmdmaWxlZmllbGQoe1xyXG4gICAgICAgICAgICAgICAgZmlsZVVwbG9hZGVkOiAoZXZlbnQsIGRhdGEpID0+IFZ5cExpc3RCYXNlUGFnZS5fYWRkRmlsZUVQQShjb250ZW50LCBkYXRhLmZpbGVJbmZvLCBkYXRhLmN1c3RvbURhdGEpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBfYWRkRmlsZUZyYW5rb3ZhbmkoY29udGVudDogR0NvbnRlbnRUeXBlPFZ5cExpc3RCYXNlUGFnZT4sIGZpbGVJbmZvOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG8sIGN1c3RvbURhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgbF9kYXRhOiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG9bXTtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3MucG91eml2YXRfc291Ym9yX2Jlel9waWR1KSB7XHJcbiAgICAgICAgICAgICAgICBsX2RhdGEgPSBjb250ZW50Lm1haW5HcmlkLmdncmlkPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxfZGF0YSB8fCBsX2RhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MjM5MDAxNTZcIik7IC8vUkMgMjM5MDAxNTYgOiBOZWpzb3Ugb3puYcSNZW55IMW+w6FkbsOpIMWZw6Fka3kgcHJvIGltcG9ydCBkYXQuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbF9kYXRhID0gY29udGVudC5tYWluR3JpZC5nZ3JpZDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnQuY2FsbDxHb3JkaWMuV2ZsLkludGVyZmFjZS5HWmFzaWxreUxpc3REdG8+KFwiTmFjdGlGaWxlRnJhbmtvdmFuaVwiLCB7IEZpbGVJbmZvOiBmaWxlSW5mbywgRGF0YTogbF9kYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuVXBkYXRlRGF0YShjb250ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3pvYnJhesOtIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlJlc29sdmVSZXN1bHREYXRhKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vem9icmF6aSBnbG9iYWwgdnlzbGVkZWsgLSBzdGF2YWppY2kgY29udGVudC5JbmZvIHNlIHByZXBpc2VcclxuICAgICAgICAgICAgICAgICAgICBXZmwuQUMuV2ZsQmFzZUFDLlNob3dGbGFzaEJ5Q29udGVudEluZm8oY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3MudHJpZGl0X2RsZV9zb3Vib3J1KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50LlNvcnRDb2x1bW5OYW1lID0gXCJ0cmlkX3Z5cCwga192XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX3ZpZXcgPSBjb250ZW50Lm1haW5HcmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF92aWV3LnByb2Nlc3MoeyBtdWpTb3J0OiBuZXcgR29yZGljLkRhdGEuU29ydFByb2Nlc3NvcihcInRyaWRfdnlwLCBrX3ZcIikgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuT3puYWNSYWRreURsZVByaXpuYWt1KGNvbnRlbnQsIEdvcmRpYy5HaW4uSW50ZXJmYWNlLlR5cFZ5c2xlZGt1T3BlcmFjZS5Qcm92ZWRlbm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LlJlc3VsdFR5cGUgPT0gR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuUHJvdmVkZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50Lm1vZGVsLlR5cFNlem5hbXUgPT0gR29yZGljLldmbC5JbnRlcmZhY2UuVHlwU2V6bmFtdVphc2lsZWsua1ByZXZ6ZXRpRGxlSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TZXRFbmFibGVBY3Rpb25zQnlEYXRhKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5TZXRBY3Rpb25FbmFibGVkKGNvbnRlbnQsIEdsb2JhbHMuRW51bXMuQWN0aW9uc05hbWUuRnJhbmtvdmFuaU9mZmxpbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxfdGV4dCA9IGNvbnRlbnQuSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfdGV4dCArPSBHaW4uR2xvYmFscy5FbnVtcy5Vc2VkU3RyaW5ncy5uZXdMaW5lICsgXCJqcmVzOjIzOTAwMTU1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjM5MDAwMTRcIiwgbF90ZXh0KS5vbihcInllc1wiLCAoZXYsIG9iaikgPT4geyAvL1JDIDIzOTAwMDE0IDogRG90YXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbFphc2lsa3lMaXN0QmFzZUFDLlVsb3pEYXRhKGNvbnRlbnQsIGNvbnRlbnQuYWN0aW9ucy5nZXRBY3Rpb25zKClbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgV2ZsLkFDLldmbEJhc2VBQy5SZXNvbHZlSW5mbyhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIF9hZGRGaWxlRVBBKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+LCBmaWxlSW5mbzogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvLCBjdXN0b21EYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGxfZGF0YSA9IGNvbnRlbnQubWFpbkdyaWQuZ2dyaWQ8R29yZGljLldmbC5JbnRlcmZhY2UuR1phc2lsa3lMaXN0RHRvPihcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgY29udGVudC5jYWxsPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0bz4oXCJOYWN0aUZpbGVFUEFcIiwgeyBGaWxlSW5mbzogZmlsZUluZm8sIERhdGE6IGxfZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuVXBkYXRlRGF0YShjb250ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuUmVzb2x2ZVJlc3VsdERhdGEoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLk96bmFjUmFka3lEbGVQcml6bmFrdShjb250ZW50LCBHb3JkaWMuR2luLkludGVyZmFjZS5UeXBWeXNsZWRrdU9wZXJhY2UuUHJvdmVkZW5vKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5SZXN1bHRUeXBlID09IEdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLlByb3ZlZGVubykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5tb2RlbC5UeXBTZXpuYW11ID09IEdvcmRpYy5XZmwuSW50ZXJmYWNlLlR5cFNlem5hbXVaYXNpbGVrLmtQcmV2emV0aURsZUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2V0RW5hYmxlQWN0aW9uc0J5RGF0YShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsX3RleHQgPSBjb250ZW50LkluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsX3RleHQgKz0gR2luLkdsb2JhbHMuRW51bXMuVXNlZFN0cmluZ3MubmV3TGluZSArIFwianJlczoyMzkwMDE1NVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjIzOTAwMDE0XCIsIGxfdGV4dCkub24oXCJ5ZXNcIiwgKGV2LCBvYmopID0+IHsgLy9SQyAyMzkwMDAxNCA6IERvdGF6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5VbG96RGF0YShjb250ZW50LCBjb250ZW50LmFjdGlvbnMuZ2V0QWN0aW9ucygpWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIFdmbC5BQy5XZmxCYXNlQUMuUmVzb2x2ZUluZm8oY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRGaWxlRG9jKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuXyRmaWxlRmllbGQuZ2ZpbGVmaWVsZChcIm9wdGlvblwiLCBcImN1c3RvbURhdGFcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4geyBpc0Zhdm9yaXRlOiB0cnVlIH0gfSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuXyRmaWxlRmllbGQuZ2ZpbGVmaWVsZChcImluc3RhbmNlXCIpLmlucHV0RGl2LnRyaWdnZXIoXCJjbGlja1wiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRGaWxlRVBBKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuXyRmaWxlRmllbGQuZ2ZpbGVmaWVsZChcIm9wdGlvblwiLCBcImN1c3RvbURhdGFcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4geyBpc0Zhdm9yaXRlOiB0cnVlIH0gfSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuXyRmaWxlRmllbGQuZ2ZpbGVmaWVsZChcImluc3RhbmNlXCIpLmlucHV0RGl2LnRyaWdnZXIoXCJjbGlja1wiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDYWxsRGF0YU1hdHJpeChjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPiwgX3R5cDogR29yZGljLldmbC5JbnRlcmZhY2UuVHlwUG91eml0aURhdGFNYXRyaXhDdGVja3ksIHBydm5pVm9sYW5pOiBib29sZWFuLCB3YXJuaW5nPzogc3RyaW5nKTogdm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGVudC5EYXRhTWF0cml4RHRvID0ge307XHJcbiAgICAgICAgICAgIGNvbnRlbnQuRGF0YU1hdHJpeER0by5Lcm9rQ2lzbG8gPSAxO1xyXG4gICAgICAgICAgICBjb250ZW50LkRhdGFNYXRyaXhEdG8uVHlwUG91eml0aSA9IF90eXA7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuRGF0YU1hdHJpeER0by5QcmFjb3ZhdE5hZFNlem5hbWVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29udGVudC5EYXRhTWF0cml4RHRvLlBydm5pVm9sYW5pID0gcHJ2bmlWb2xhbmk7XHJcbiAgICAgICAgICAgIGlmICh3YXJuaW5nKSBjb250ZW50LkRhdGFNYXRyaXhEdG8uV2FybmluZyA9IHdhcm5pbmc7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX3R5cCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFBvdXppdGlEYXRhTWF0cml4Q3RlY2t5LmZyYW5rb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5EYXRhTWF0cml4RHRvLkNpc3RJUG9kYWNpQ2lzbG8gPSBjb250ZW50LlZ5cHJhdmVuaVNldHRpbmdzLmZyYW5rb3ZhbmlfcG9kYWNpX2Npc2xvO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cFBvdXppdGlEYXRhTWF0cml4Q3RlY2t5LnByZXZ6ZXRpU0ZyYW5rb3ZhbmltOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuRGF0YU1hdHJpeER0by5DaXN0SVBvZGFjaUNpc2xvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLkNhbGxEYXRhTWF0cml4RGlhbG9nKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBOb3ZlRnJhbmtvdmFuaShjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IHZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5WeXByYXZlbmlTZXR0aW5ncy50eXBfZnJhbmtvdmFuaSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBXZmwuSW50ZXJmYWNlLlR5cEZyYW5rb3ZhY2lob1N0cm9qZS5OZW9wb3N0RGF0YU1hdHJpeEN0ZWNrYTpcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ2FsbERhdGFNYXRyaXgoY29udGVudCwgR29yZGljLldmbC5JbnRlcmZhY2UuVHlwUG91eml0aURhdGFNYXRyaXhDdGVja3kuZnJhbmtvdmFuaSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDYWxsRGF0YU1hdHJpeERpYWxvZyhjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IHZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpYWxvZ3MuRGF0YU1hdHJpeEN0ZWNrYUNhbGxEbGcoY29udGVudCwgeyBEYXRhTWF0cml4RHRvOiBjb250ZW50LkRhdGFNYXRyaXhEdG8gfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5EYXRhTWF0cml4RHRvID0gcmV0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5EYXRhTWF0cml4RHRvLmlkX2RvcnVjZW5reSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZW50LkRhdGFNYXRyaXhEdG8uS3Jva0Npc2xvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuWnByYWN1akRhdGFNYXRyaXhfa3Jva18xKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuWnByYWN1akRhdGFNYXRyaXhfa3Jva18yKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgWnByYWN1akRhdGFNYXRyaXhfa3Jva18xKGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5EYXRhTWF0cml4RHRvLlR5cFBvdXppdGkhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5XZmwuSW50ZXJmYWNlLlR5cFBvdXppdGlEYXRhTWF0cml4Q3RlY2t5LmZyYW5rb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfcG9jZXQgPSBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuT3puYWNSYWRreURsZUlEQVZyYXRQb2NldChjb250ZW50LCBjb250ZW50LkRhdGFNYXRyaXhEdG8uaWRfZG9ydWNlbmt5ISwgV2ZsLkdsb2JhbHMuRW51bXMuRmllbGROYW1lLklkWmFzaWxreSlcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGxfcG9jZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLlpwcmFjdWpEYXRhTWF0cml4KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxfdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9wb2NldCA9PSAwKSBsX3RleHQgPSBcImpyZXM6MjM5MDAxMTFcIiAvL1JDIDIzOTAwMTExIDogWsOhc2lsa2EgbmVieWxhIGRvaGxlZMOhbmEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGxfdGV4dCA9IFwianJlczoyMzkwMDEwOVwiIC8vUkMgMjM5MDAxMDkgOiBJZGVudGlmaWthY2UgesOhc2lsa3kgbmVuw60gamVkbm96bmHEjW7DoS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZ5cExpc3RCYXNlUGFnZS5DYWxsRGF0YU1hdHJpeChjb250ZW50LCBjb250ZW50LkRhdGFNYXRyaXhEdG8uVHlwUG91eml0aSEsIGZhbHNlLCBsX3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLldmbC5JbnRlcmZhY2UuVHlwUG91eml0aURhdGFNYXRyaXhDdGVja3kucHJldnpldGlTRnJhbmtvdmFuaW06XHJcbiAgICAgICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLlpwcmFjdWpEYXRhTWF0cml4KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFpwcmFjdWpEYXRhTWF0cml4X2tyb2tfMihjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IHZvaWQge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnQuRGF0YU1hdHJpeER0by5UeXBQb3V6aXRpISlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBQb3V6aXRpRGF0YU1hdHJpeEN0ZWNreS5mcmFua292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsX3N4cyA9IFdmbC5MaXN0QUMuV2ZsWmFzaWxreUxpc3RCYXNlQUMuR2V0U1hTUm93QnlJRERvcnVjZW5reShjb250ZW50LCBjb250ZW50LkRhdGFNYXRyaXhEdG8uaWRfZG9ydWNlbmt5ISlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbF9yb3cgPSBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuR2V0Um93QnlJRChjb250ZW50LCBsX3N4cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfZGF0YSA9IGxfcm93LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuRGF0YU1hdHJpeER0by5DaXN0SVBvZGFjaUNpc2xvKSBsX2RhdGEucG9kX2Npc2xvID0gY29udGVudC5EYXRhTWF0cml4RHRvLnBvZF9jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICBsX2RhdGEucG9wbGF0ZWsgPSBjb250ZW50LkRhdGFNYXRyaXhEdG8ucG9wbGF0ZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgbF9kYXRhLnZhaGEgPSBjb250ZW50LkRhdGFNYXRyaXhEdG8udmFoYTtcclxuICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuVXBkYXRlUm93RGF0YShjb250ZW50LCBsX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuTmV1bG96ZW5hRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuVnlwcmF2ZW5pU2V0dGluZ3MuZnJhbmtvdmFuaV9wcmV0cmlkaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuRGF0YU1hdHJpeER0by5QcnZuaVZvbGFuaSkgY29udGVudC5Qb3JhZGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXZmwuTGlzdEFDLldmbExpc3RCYXNlQUMuU2V0UG9yYWRpUmFka3UoY29udGVudCwgbF9zeHMsIGNvbnRlbnQuUG9yYWRpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlBvcmFkaSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuQ2FsbERhdGFNYXRyaXgoY29udGVudCwgY29udGVudC5EYXRhTWF0cml4RHRvLlR5cFBvdXppdGkhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBQb3V6aXRpRGF0YU1hdHJpeEN0ZWNreS5wcmV2emV0aVNGcmFua292YW5pbTpcclxuICAgICAgICAgICAgICAgICAgICBWeXBMaXN0QmFzZVBhZ2UuUHJldnppdE9mcmFua292YW5vdVphc2lsa3UoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVnlwTGlzdEJhc2VQYWdlLkNhbGxEYXRhTWF0cml4KGNvbnRlbnQsIGNvbnRlbnQuRGF0YU1hdHJpeER0by5UeXBQb3V6aXRpISwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFByZXZ6aXRPZnJhbmtvdmFub3VaYXNpbGt1KGNvbnRlbnQ6IEdDb250ZW50VHlwZTxWeXBMaXN0QmFzZVBhZ2U+KTogdm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2luLkdsb2JhbHMuU2hvd1dhaXRMb2FkRGF0YShjb250ZW50KTtcclxuICAgICAgICAgICAgY29udGVudC5jYWxsPEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdaYXNpbGt5TGlzdER0b1tdPihcIlByZXZ6aXRPZnJhbmtvdmFub3VaYXNpbGt1XCIsIHsgRGF0YTogY29udGVudC5EYXRhTWF0cml4RHRvLCBtb2RlbDogY29udGVudC5tb2RlbCB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLlJlc29sdmVSZXN1bHREYXRhKGNvbnRlbnQsIGRhdGEsIHRydWUsIEdpbi5JbnRlcmZhY2UuVHlwVnlzbGVka3VPcGVyYWNlLlByb3ZlZGVubyk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5MaXN0QUMuV2ZsTGlzdEJhc2VBQy5Pem5hY1JhZGt5RGxlUHJpem5ha3UoY29udGVudCk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyBHb3JkaWMuV2ZsLkxpc3RBQy5XZmxMaXN0QmFzZUFDLkFmdGVyTG9hZERhdGEoY29udGVudCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBacHJhY3VqRGF0YU1hdHJpeChjb250ZW50OiBHQ29udGVudFR5cGU8VnlwTGlzdEJhc2VQYWdlPik6IHZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29udGVudC5EYXRhTWF0cml4RHRvLlR5cFBvdXppdGkhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5XZmwuSW50ZXJmYWNlLlR5cFBvdXppdGlEYXRhTWF0cml4Q3RlY2t5LmZyYW5rb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxfc3hzID0gV2ZsLkxpc3RBQy5XZmxaYXNpbGt5TGlzdEJhc2VBQy5HZXRTWFNSb3dCeUlERG9ydWNlbmt5KGNvbnRlbnQsIGNvbnRlbnQuRGF0YU1hdHJpeER0by5pZF9kb3J1Y2Vua3khKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsX3N4cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dGbGFzaChjb250ZW50LCBcIlwiLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuU3RhdGVFbnVtLmluZm8sIGNvbnRlbnQuRmxhc2hQYW5lbFRpbWVyLCBcIkluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuRGF0YU1hdHJpeER0by5zeHMgPSBsX3N4cztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdpbi5HbG9iYWxzLlNob3dGbGFzaChjb250ZW50LCBcIkVSUk9SIDIzOTIwMDYwXCIsIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5TdGF0ZUVudW0ud2FybmluZywgY29udGVudC5GbGFzaFBhbmVsVGltZXIsIFwiSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuV2ZsLkludGVyZmFjZS5UeXBQb3V6aXRpRGF0YU1hdHJpeEN0ZWNreS5wcmV2emV0aVNGcmFua292YW5pbTpcclxuICAgICAgICAgICAgICAgICAgICAvL1Z5cExpc3RCYXNlUGFnZS5QcmV2eml0T2ZyYW5rb3Zhbm91WmFzaWxrdShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGVudC5EYXRhTWF0cml4RHRvLktyb2tDaXNsbyA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FsbERhdGFNYXRyaXhEaWFsb2coY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJuYW1lc3BhY2UgR29yZGljLlZ5cC5WeXBQcmVmYWJzXHJcbntcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBwb3BsYXRla0NvbHVtbigpOiBHR3JpZENvbHVtbjxhbnk+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBcInBvcGxhdGVrXCIsXHJcbiAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDAxNVwiLCAvL1JDIDIzOTAwMDE1IDogUG9wbGF0ZWtcclxuICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IFwiRDJcIiBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdmFoYUNvbHVtbigpOiBHR3JpZENvbHVtbjxhbnk+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBcInZhaGFcIixcclxuICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjIzOTAwMDE2XCIsIC8vUkMgMjM5MDAwMTYgOiBWw6FoYVxyXG4gICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgIGZvcm1hdDogXCJEM1wiIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjZW5hQ29sdW1uKCk6IEdHcmlkQ29sdW1uPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiY2VuYVwiLFxyXG4gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjM5MDAwMTdcIiwgLy9SQyAyMzkwMDAxNyA6IENlbmFcclxuICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IFwiRDJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBUcmlkVnlwQ29sdW1uKCk6IEdHcmlkQ29sdW1uPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwidHJpZF92eXBcIixcclxuICAgICAgICAgICAgY2FwdGlvbjogXCJ4eHh4XCIsIC8vUkMgMjM5MDAwMTcgOiBDZW5hXHJcbiAgICAgICAgICAgIHdpZHRoOiA4MFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaWREU09kZXNpbHRlbGUoKTogR0dyaWRDb2x1bW48YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogXCJpZF9kc19vZGVzXCIsXHJcbiAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyMzkwMDAxOFwiLCAvL1JDIDIzOTAwMDE4IDogSUQgRFMgb2Rlc8OtbGF0ZWxlXHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTZWtjZVByZWRwbG5lbmlaYXNpbGVrKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtU2VjdGlvbltdXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdpbi5QcmVmYWJzLnByZVJldHVybihuZXcgR29yZGljLkZvcm1zXHJcbiAgICAgICAgICAgIC5Gb3JtKHsgbmFtZTogXCJSZWRpc3RyaWJ1Y2VQcmVmYWJGb3JtXCIsIHRhYkxhYmVsOiBcImpyZXM6MjM5MDAwNDJcIiB9KSAvL1JDIDIzOTAwMDQyIDogUMWZZWRwbG7Em27DrVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjIzOTAwMDQzXCIgKyBcIiwgXCIgKyBcImpyZXM6MjM5MDAwNDRcIiArIFwiLCBcIiArIFwianJlczoyMzkwMDA0NVwiKSAvL1JDIDIzOTAwMDQ2IDogTm92w6kgcG9kLiDEjcOtc2xvXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdyhcImpyZXM6MjM5MDAwNDNcIiArIFwiLCBcIiArIFwianJlczoyMzkwMDA0NFwiICsgXCIsIFwiICsgXCJqcmVzOjIzOTAwMDQ1XCIgKyBcIiwgXCIgKyBcImpyZXM6MjM5MDAwNDZcIikgLy9SQyAyMzkwMDA0NiA6IE5vdsOpIHBvZC4gxI3DrXNsb1xyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJ0ZXh0X3ByZWRcIiB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJwb2RfY2lzbG9cIiB9KVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJ0ZXh0X3phXCIgfSlcclxuICAgICAgICAgICAvLyAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJcIiwgeyBuYW1lOiBcIm5vdmVQb2RhY2lDaXNsb1wiIH0pIFxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczoyMzkwMDAxNVwiICsgXCIsIFwiICsgXCJqcmVzOjIzOTAwMDE2XCIpIC8vUkMgMjM5MDAwMTUgOiBQb3BsYXRla1xyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHsgbmFtZTogXCJwb3BsYXRla1wiLCBkZWNpbWFsczogMiwgbWluVmFsdWU6IDAsIG1heFZhbHVlIDogOTk5Ljk5OTkgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgeyBuYW1lOiBcInZhaGFcIiwgZGVjaW1hbHM6IDQsIG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTkuOTk5OSAgfSkpXHJcbiAgICAgICAgICAgIDsgICAgICAgIFxyXG4gICAgfVxyXG59Il19