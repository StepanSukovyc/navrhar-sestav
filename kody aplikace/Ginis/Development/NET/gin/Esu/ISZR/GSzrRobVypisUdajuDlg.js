

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GSzrRobVypisUdajuDlg", {
        onContentReady: function () {
            var that = this;
            this.ZadanPozadavek = false;
            this.UspesneVyzvednutPozadavek = false;
            this.VypisVytisten = false;
            // data
            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { action: this.actions.actEsu }, //RC 26256131 : Nevyřízené
                        { action: this.actions.actSzr }, //RC 26256135 : Vyřízené
                    ]
                });

            var Formik = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L1M1S1" })
                //.addRow("Typ výpisu").addField("gradio", {
                //    name: "TypVypisu",
                //    initialValue: 0,
                //    itemClass: "w-6",
                //    change: function (ev, changeObj) {
                //        var duvodField = that.findFields("DuvodUcel");
                //        if (changeObj.value === "0") {
                //            duvodField.gfield("setValue", "Výpis využití údajů SZR ROB občana", {initialValue:true});
                //        } else {
                //            duvodField.gfield("setValue", "Výpis využití údajů ESU", { initialValue: true });
                //        }
                //        that.enableActions();
                //    },
                //    radios: [
                //        { value: 0, label: 'Využití v SZR' },
                //        { value: 1, label: 'Využití ESU' }
                //    ]
                //})
                //  .addSection("Parametry výpisu")
                .addRow("jres:31900276") //RC 31900276 : Občan
                .addField("gselectbox", {
                    name: "Obcan",
                    change: function (ev, changeObj) {
                        if (changeObj.flags && changeObj.flags.OpravaAifo) {
                            that.enableActions();
                        } else {
                            that.changeObcana(changeObj);
                        }

                    },
                    model: "model.Obcan=value.ixs_esu; model.OdesZastLic=value.lic; model.OdesZastPor=value.por_zast"
                }, Gordic.Esu.Prefabs.vyberEsu({
                    typ: 2,                                     // přidání prefabu   možnost vyberu z karoteky  viz níže (nepovinné)
                    Logovani: this.serverParams.Logovani
                }));
                //typ
                // Režim výběru jednoho externího subjektu
                // typ=1 = SelectEsu,
                // Režim výběru jednoho externího subjektu nebo jedné zástupné osoby
                // typ=2 = SelectEsuOrZo,
                // Režim výběru více externích subjektů a více zástupných osob
                // typ=3 = SelectMultiEsuAndZo    (default) 
            Formik
                .addPrefab(Gordic.Gin.Prefabs.interval({
                    label: "jres:31900277",                 // (povinné)    Label řádku. //RC 31900277 : Období Od Do
                    name: "interval",               // (povinné)    Jméno řádku, to samé jmeno se použije jako jmenou fieldu s příponou  Start/End
                    type: "date",                    // (povinné)    Typ intervalu .. více typů popsáno níže
                    pathInModel: null,              // (nepovinné)  Cesta v modelu (Pozor nejedná se o klasícký gfield model. Zde jde pouze o cestu,
                    //              kde jsou zanořené hodnoty. => Bez zanoření {pathInModel:"model"})    +
                    emptyValue: null,               // emptyValue
                 
                    customOptAll: {
                        change: function (ev, changeObj) {
                            that.enableActions();
                        },
                        validators : [
                            new Gordic.Validators.Required(),
                            
                            new Gordic.Validators.Base({
                                message:  "jres:31900934", //RC 31900934 : Maximální povolený pohled do minulosti jsou dva roky.
                                validate: function (value) {
                                    if (value != null) {
                                        
                                        
                                        if (that.vyuziti === "esu") {
                                            return true;
                                        }

                                        var rozsah = -2;
                                        var XRokyzpet = Gordic.Utils.DateTime.add(Gordic.Utils.DateTime.add(new Date(), rozsah, 'years'), -1, 'days'); 
                                        if (XRokyzpet > value) {
                                            return false
                                        } else {
                                            return true;
                                        }
                                    } else {
                                        return false;
                                    }
                                }
                            }),
                            new Gordic.Validators.Base({
                                message:  "jres:31900935", //RC 31900935 : Maximální povolený pohled do minulosti je deset let.
                                validate: function (value) {
                                    if (value != null) {

                                        var rozsah = -10;
                                        if (that.vyuziti === "szr") {
                                            return true;
                                        }
                                        var XRokyzpet = Gordic.Utils.DateTime.add(Gordic.Utils.DateTime.add(new Date(), rozsah, 'years'), -1, 'days');
                                        if (XRokyzpet > value) {
                                            return false
                                        } else {
                                            return true;
                                        }
                                    } else {
                                        return false;
                                    }
                                }
                            })
                            
                        ]
                    }
                }))

                .addRow("jres:26265101").addField("gstringbox", { //RC 26265101 : Důvod
                    name: "DuvodUcel",
                    customClass: "",
                    change: function (ev, changeObj) {
                        that.enableActions();
                    },
                    initialValue: "jres:26265371" //RC 26265371 : Výpis využití údajů SZR ROB občana
                })
                .addField("gcheck", {
                    name: "PozeVaseOrganizace", customClass: "", initialValue: false, label: "jres:31900278", //RC 31900278 : Tisknout i náhledy v seznamech (může jich být velké množství) - informace o náhledech jsou validní pouze za posledních 5 let
                })
                //.addRow("ID").addField("gstringbox", {
                //    name: "ID",
                //    disabled: true,
                //    customClass: ""
                //})
                //.addRow("ID pro Tisk").addField("gstringbox", {
                //    name: "IDProTisk",
                //    disabled: this.DebugMode,
                //    customClass: ""
                //});


            $("<div>").appendTo(this.element).gform("createFrom", Formik); 

            var obj = {};
            obj.interval = {};
            obj.interval.start = new Date("July 1, 2012"); // new Date(2012, 6, 1); //  new Date("07.01.2012");
            obj.interval.end = new Date();
            this.findFields("intervalStart, intervalEnd").gfield("model", "apply", obj);


            this.enableActions();
        },

        enableActions: function () {
            var esu = this.findFields("Obcan").gfield("getValue");
            var vybranEsu = esu ? true : false;
            var vybranaZo = false;
            if (esu && esu.por_zast != null && esu.lic != null)
                vybranaZo = true;


            var formJeValidni = this.findForms().gform("isValid");
            //if (vybranEsu && esu.Stupen_ver == 55 && esu.Aifo) {
            //    this.actions.actVypisUdaju.update({ enabled: true });
            //}else{
            //    this.actions.actVypisUdaju.update({ enabled: false });
            //}
            var duvodField = this.findFields("DuvodUcel");
            var isDuvod = duvodField.gfield("getValue") != null;
            var TypVypisuSZR = this.vyuziti === "szr";
          
            if (TypVypisuSZR) {
                duvodField.gfield("setValue", "jres:31900284", { initialValue: true }); //RC 31900284 : Výpis využití údajů SZR ROB občana.
            } else {
                if (vybranaZo) {
                    duvodField.gfield("setValue", String.Format("jres:31901177", esu && esu.zast_txt ? esu.zast_txt : "", esu && esu.esu_txt ? esu.esu_txt : "" )  , { initialValue: true }); //RC 31901177 : Výpis pro zástupnou osobu: {0}  a subjekt: {1}
                } else {
                    duvodField.gfield("setValue", String.Format("jres:31901178", esu && esu.esu_txt ? esu.esu_txt : ""), { initialValue: true }); //RC 31901178 : Výpis pro občana: {0}
                }
              
            }

            this.actions.actDetailEsu.update({ enabled: vybranEsu });

            //this.actions.actVypisUdaju.update({ enabled: isDuvod && vybranEsu && TypVypisuSZR });

            //this.actions.actVypisVyzvednout.update({ enabled: this.ZadanPozadavek && TypVypisuSZR });
            this.actions.actTiskVyuzitiSZR.update({
                enabled: this.UspesneVyzvednutPozadavek || (vybranEsu && isDuvod) && TypVypisuSZR && formJeValidni && !vybranaZo,
                visible: this.UspesneVyzvednutPozadavek || (vybranEsu && isDuvod) && TypVypisuSZR && !vybranaZo
            });
            
            this.findFields("interval").gfield("option",

                "disabled", !(this.ZadanPozadavek || this.VypisVytisten || this.UspesneVyzvednutPozadavek));

            this.actions.actTiskVyuzitiESU.update({
                enabled: vybranEsu && isDuvod && !TypVypisuSZR && formJeValidni && !vybranaZo,
                visible: vybranEsu && isDuvod && !TypVypisuSZR && !vybranaZo
            });

            this.actions.actTiskVyuzitiESUZo.update({
                enabled: vybranEsu && isDuvod && !TypVypisuSZR && formJeValidni && vybranaZo,
                visible: vybranEsu && isDuvod && !TypVypisuSZR && vybranaZo
            });

            //visible tisku
            this.actions.actTiskVyuzitiSZR.update({
                visible: (this.vyuziti === "szr") && !vybranaZo
            });

            this.actions.actTiskVyuzitiESU.update({
                visible: (this.vyuziti !== "szr") && !vybranaZo
            });

            this.actions.actTiskVyuzitiESUZo.update({
                visible: (this.vyuziti !== "szr") && vybranaZo
            });
               


        },

        vypisUdaju: function () {
            var that = this;
            var isValid = false;
            if (!this.findForms().gform("isValid")) return;
            var esu = this.findFields("Obcan").gfield("getValue");
            if (esu == null) { return; }
            var IxsEsu = esu.ixs_esu;
            var Nazev = esu.nazev;
            var Aifo = esu.Aifo;

            if (esu.Stupen_ver == 55)
                if (esu.Aifo)
                    isValid = true;
                else {
                    this.dialogs.warning("jres:31900279"); //RC 31900279 : Výpis údajů je možné provést za agendu, kterou byl občan ověřen v SZR ROB.
                    return;
                }

            else { 
                this.dialogs.warning("jres:31900280"); //RC 31900280 : Výpis údajů je možné provést pouze u občanů/externích subjektů ověřených v SZR ROB.
                return;
            }

            var odDo = {};
            this.findFields("intervalStart, intervalEnd").gfield("model", "collect", odDo);
            var Od = odDo.interval.start ? odDo.interval.start : null;
            var Do = odDo.interval.end ? odDo.interval.end : null;
            var Duvod = this.findFields("DuvodUcel").gfield("getValue")

            if (IxsEsu && isValid && Duvod && Od && Do) {

                this.beginOperation();
                this.call("VypisUdaju", { IxsEsu: IxsEsu, Nazev: Nazev, Aifo: Aifo,Od: Od, Do: Do, Duvod: Duvod })
                    .done(function (retVal) {
                        that.findFields("ID").gfield("setValue", retVal.Id_txt);
                        that.ZadanPozadavek = retVal.ZadanPozadavek;
                        that.zkusZobrazitMessage(retVal);
                        
                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });

            }
        },

        vypisVyzvednout: function () {
            var that = this;
            var isValid = false;
            var esu = this.findFields("Obcan").gfield("getValue");
            if (esu == null) { return; }
            if (!this.findForms().gform("isValid")) return;
            var IxsEsu = esu.ixs_esu;
            var Nazev = esu.nazev;

            var Id_txt = this.findFields("ID").gfield("getValue");
            var Duvod = this.findFields("DuvodUcel").gfield("getValue");

            if (IxsEsu && isValid && Duvod && Id_txt) {

                this.beginOperation(); 
                this.call("VyzvednoutVypisUdaju", { IxsEsu: IxsEsu, Nazev: Nazev, Duvod: Duvod, Id_txt: Id_txt })
                    .done(function (retVal) {
                        
                        that.findFields("IDProTisk").gfield("setValue", retVal.IdTisk);
                        that.UspesneVyzvednutPozadavek = retVal.UspesneVyzvednutPozadavek;
                        if (retVal.datumDo) {
                            that.findFields("intervalStart, intervalEnd").gfield("model", "apply", { interval: { end: retVal.datumDo }});
                        }
                        that.zkusZobrazitMessage(retVal);

                        that.endOperation();
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", type, vobj);
                        that.endOperation();
                    });

            }
        },

        zkusZobrazitMessage: function (val) {

            if (val.Message) {
                this.dialogs.warning("jres:31900281", val.Message); //RC 31900281 : Zpráva
            }
            this.enableActions();
        },

        changeObcana: function (changeObj) {

            if (changeObj.value && changeObj.value.ixs_esu) {
                this.readAifo(changeObj.value.ixs_esu);
            } else {
                this.enableActions();
            }
          

        },
        readAifo: function (IxsEsu) {
            var that = this;
            this.beginOperation();
            this.call("ReadAifo", { IxsEsu: IxsEsu})
                .done(function (retVal) {
                    var field = that.findFields("Obcan");
                    var obcan = field.gfield("getValue");

                    if (obcan) {
                        obcan.Aifo = retVal.Aifo;
                        obcan.Stupen_ver = retVal.Stupen_ver;
                        field.gfield("clear");
                        field.gfield("setValue", obcan, { OpravaAifo: true });
                    }
                    that.endOperation();
                })
                .fail(function (xhr, type, vobj) {
                    console.log("typ exception: ", type, vobj);
                    that.endOperation();
                });
        },


        repStartingSZR: function (rep) {
            var tempMoel = {};

            this.findFields().gfield("model", "collect", tempMoel);
            if (tempMoel.Obcan) {
                var esu_txt = this.findFields("Obcan").gfield("getValue").esu_txt;
                var vypisPro = "jres:31900282" +" " + esu_txt; //RC 31900282 : Výpis pro
                console.log("repStarting", rep);
                rep.params.X0000 = "";
                rep.params.X0001 = "1";
                rep.params.X0002 = tempMoel.interval.start;
                rep.params.X0003 = tempMoel.interval.end;
                rep.params.X0004 = tempMoel.Obcan;
                rep.params.X0005 = tempMoel.PozeVaseOrganizace ? "1" : "0";
                rep.params.X0006 = "";
                rep.params.X0007 = "";
                rep.params.X0008 = "";

                var customDto = {
                    EsuTxt: esu_txt
                };
                rep.customDto = customDto;
            }

        },

        repStartingESU: function (rep) {
            var tempMoel = {};
            if (!this.findForms().gform("isValid")) return;
            this.findFields().gfield("model", "collect", tempMoel);
            if (tempMoel.Obcan) {
                var esu_txt = this.findFields("Obcan").gfield("getValue").esu_txt;
                var vypisPro = "jres:31900282" +" "+ esu_txt; //RC 31900282 : Výpis pro
                console.log("repStarting", rep);
                rep.params.X0000 = "";
                rep.params.X0001 = "1";
                rep.params.X0002 = tempMoel.interval.start;
                rep.params.X0003 = tempMoel.interval.end;
                rep.params.X0004 = tempMoel.Obcan;
                rep.params.X0005 = tempMoel.PozeVaseOrganizace ? "1" : "0";
                rep.params.X0006 = "";
                rep.params.X0007 = "";
                rep.params.X0008 = "";

                var customDto = {
                    EsuTxt: esu_txt
                };
                rep.customDto = customDto;
            }

        },
        repStartingESUZo: function (rep) {
            debugger;
            var tempMoel = {};
            if (!this.findForms().gform("isValid")) return;
            this.findFields().gfield("model", "collect", tempMoel);
            if (tempMoel.Obcan) {
                var esu_txt = this.findFields("Obcan").gfield("getValue").esu_txt;
                var vypisPro = "jres:31900282" + " " + esu_txt; //RC 31900282 : Výpis pro
                console.log("repStarting", rep);
                rep.params.X0000 = "";
                rep.params.X0001 = "1";
                rep.params.X0002 = tempMoel.interval.start;
                rep.params.X0003 = tempMoel.interval.end;
                rep.params.X0004 = tempMoel.Obcan;
                rep.params.X0005 = tempMoel.PozeVaseOrganizace ? "1" : "0";
                rep.params.X0006 = tempMoel.OdesZastLic + "|" + tempMoel.OdesZastPor;
                rep.params.X0007 = "";
                rep.params.X0008 = "";

                var customDto = {
                    EsuTxt: esu_txt
                };
                rep.customDto = customDto;
            }

        },

        detailEsu: function () {
            var that = this;
            var esu = this.findFields("Obcan").gfield("getValue");
            if (esu) {
                var opt = {
                    IxsEsu: esu.ixs_esu,
                    Ucel: 2,
                    Logovani: this.Logovani,
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);
            } else {
                that.dialogs.alert("jres:31900283"); //RC 31900283 : Nebyl vybrán externí subjekt.
            }
        },

        vyuzitiSZR: function () {
            this.vyuziti = "szr"
           
            this.enableActions();

        },

        vyuzitiESU: function () {
            this.vyuziti="esu"
            
            this.enableActions();

        },

        starsiVypisy: function () {
            var tema;
            if (this.vyuziti === "szr")
                tema = "gin_ptm_szrrov";
            else
                tema = "gin_ptm_esuvyu";

            var opt = {
                Tema: tema,
                Ixp: "0000P000000N"
            };
            this.navigate("Gordic.Report.WebClient.GStoredReports", opt);

        },

        closeDet: function () {

            //this.nactiDtoBezValidace();
            $.content(this).tryClose();
        },

        

       

    }, { extendIntellisense: GContent });
    

});

   