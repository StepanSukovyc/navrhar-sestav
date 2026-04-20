"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GDetailKontrolnihoHlaseni = 
            /**
             *  Detail zna. obdobi dph
             */
            class GDetailKontrolnihoHlaseni extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.refresh = false;
                    /**
                     * Atribut urcujici, zda se jiz byl porveden tisk
                     * */
                    this.printed = false;
                }
                onContentReady() {
                    var that = this;
                    //at.model.eko_akt_txt
                    // doplnění prvků do tabu
                    var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L2M2S1" })
                        .addSection()
                        .addRow("jres:30250019").addField("gstringbox", //RC 30250019 : Rok
                    {
                        name: "rok_dph", disabled: true,
                    })
                        .addRow("jres:30250020").addField("gstringbox", {
                        name: "mesic_dph", disabled: true,
                    })
                        .addSection()
                        .addRow("jres:30250142").addField("gstringbox", {
                        name: "por_cislo", disabled: true,
                    })
                        .addSection(" ")
                        .addRow("jres:30250143").addField("gdatebox", { name: "dat_priz_max", disabled: true }) //RC 30250143 : Max. datum pro podání KH
                        .addRow("jres:30250144").addField("gstringbox", {
                        name: "typ_priz_dph_txt", disabled: true
                    })
                        .addRow("jres:30250145").addField("gdatebox", {
                        name: "dat_priz_dph", disabled: !that.editace,
                        change: function (ev, obj) {
                            //debugger;
                            that.reload(obj.value);
                        }
                    }) //RC 30250145 : Datum skutečného podání KH
                        .addRow("jres:30250146").addField("gdatebox", {
                        name: "dat_zjist_dod",
                        disabled: !this.datumDuvoduEnable,
                        validators: that.datumDuvoduEnable ? [new Gordic.Validators.Required()] : [],
                        flag: that.datumDuvoduEnable ? "required" : "",
                    }) //RC 30250146 : Datum zjištění důvodů pro následné KH
                        .addRow("jres:30250149") //RC 30250149 : Číslo jednací výzvy
                        .addField("gcheck", "w-2", {
                        name: "cj_vyzvych",
                        initialValue: false,
                        model: "",
                        label: "",
                        emptyValue: false,
                        disabled: !that.editace,
                        change: function (event, value) {
                            var cnt = that.element;
                            //var cnt = $.content(this);
                            //debugger;
                            cnt
                                .findFields("vyzva_odp,cj_vyzvy") // nalezeni jineho/ych policek
                                .gfield("clear"); // vymazani mesice
                            cnt.findFields("vyzva_odp,cj_vyzvy") // nalezeni jineho/ych policek
                                .gfield("option", { disabled: typeof value === "undefined" || value == null || value.value === false });
                        },
                    })
                        .addField("gformattedbox", "w-10", {
                        name: "cj_vyzvy", disabled: true,
                        allowedChars: "0123456789\/-",
                        placeholder: "NNNNNNNN/NN/NNNN-NNNNN-NNNNNN",
                        validators: [that.ValidatorCJ,
                            //new Gordic.Validators.RegExp({ pattern: "(\\d{0,8}/\\d{0,2}/\\d{0,4}\-\\d{0,5}-\\d{0,6})*", errorType: "error", stopping: true, message: "Chybný formát" })
                        ],
                    })
                        .addRow("jres:30250148").addField("gselectbox", {
                        name: "vyzva_odp", multi: false, list: false, itemWidth: "", disabled: true,
                        dropdown: true
                        //, model: "model.s_zau=value.stav_evi", itemTemplate: "{stav_evi_txt}"
                        ,
                        helperColumns: ["vyzva_odp_txt"],
                        itemTemplate: "{vyzva_odp_txt}",
                        model: "model.vyzva_odp=value.vyzva_odp",
                        initialValue: { vyzva_odp_txt: "" },
                        data: new Gordic.Data.View([
                            { vyzva_odp_txt: "jres:30250150", vyzva_odp: "B" } //RC 30250150 : B - Nemám povinnost podat KH
                            ,
                            { vyzva_odp_txt: "jres:30250151", vyzva_odp: "P" } //RC 30250151 : P - Potvrzuji správnost
                        ], { key: "vyzva_odp" })
                    });
                    var tabHead = $("<div>")
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    //fieldchange
                    // akce seznamu
                    this.actions.addRange({
                        actUlozit: {
                            name: "actUlozit",
                            caption: "jres:30250486", //RC 30250486 : Přiznat
                            icon: "gi-save",
                            enabled: false,
                            visible: that.editace,
                            //enabled: false,
                            run: function (ev, ctx) {
                                if (!that.element.findForms().gform("isValid"))
                                    return;
                                that.dialogs.messageBox("jres:30450045" //RC 30450045 : Kontrolní hlášení
                                , "jres:30450046", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30450046 : Provést kontolní hlášení DPH (nevratná operace) ???
                                    .on("yes", function () {
                                    that.dialogs.messageBox("jres:30450045" //RC 30450045 : Kontrolní hlášení
                                    , "jres:30450047", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30450047 : Opravdu provést kontolní hlášení DPH (nevratná operace) ???
                                        .on("yes", function () {
                                        that.Ulozit()
                                            .done(function () {
                                            that.refresh = true;
                                            that.close({ refresh: true });
                                        });
                                    });
                                });
                                //this.setPending($.content(this).Ulozeni(that));
                                //Gordic.Eko.WebClient.DetailPredkontaceMethod.Ulozeni(that);
                            }
                        },
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018", //RC 30250018 : Tisk
                            tooltip: "jres:30250018", //RC 30250018 : Tisk
                            icon: "gi-print",
                            tema: "inu_ptm_dankohl",
                            platnost: that.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            dialogClosed: () => { that.printed = true; that.NastaveniAkci(); },
                            enabled: true,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                var v_datum = that.findFields("dat_zjist_dod").gfield("getValue");
                                rep.customDto = {
                                    Tema: rep.tema,
                                    IDSestavy: 120 /* GEIDSestavy.DetailPriznaniDPH */,
                                    Mesic: that.mesic,
                                    TypPriznani: that.model.typ_priz_dph,
                                    PorCislo: that.porCislo,
                                    DatZjisteniDod: v_datum
                                };
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } })
                    });
                    // Tlacitko zavrit
                    that.commandBar([
                        { action: this.actions.actTisk, favorite: true },
                        { action: this.actions.actUlozit },
                        {
                            customClass: "g-button--primary",
                            action: this.actions.actZavrit
                        },
                    ]);
                    //this.menuBar([
                    //    //{ action: this.actions.actUlozit, favorite: true },
                    //    { action: this.actions.actTisk, favorite: true },                
                    //]);
                    that.typPriznani = that.model.typ_priz_dph;
                    //plnění hlavičkového formuláře
                    that.findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", that.model, { initialValues: true, setFlags: { triggerChange: false } }) // verificationNeeded: false 
                    ;
                    //that.element.findFields("vyzva_odp").gfield("setValue", { vyzva_odp: that.model.vyzva_odp }, false);
                    that.NastaveniAkci();
                    // focus na prvni editovatelnou bunku
                    if (this.editace)
                        this.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                }
                ValidatorCJ(value, object, content) {
                    //debugger;
                    if (value === null || typeof value === "undefined" || value.trim() == "")
                        return true;
                    var patt = new RegExp("\\d{0,8}/\\d{0,2}/\\d{0,4}\-\\d{0,5}-\\d{0,8}");
                    var res = patt.test(value);
                    return res;
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    this.actions.actUlozit?.update({ enabled: false });
                    if (this.editace) {
                        if (this.printed) {
                            this.actions.actUlozit?.update({ enabled: true, tooltip: "jres:30250481" }); //RC 30250481 : Uložení hlášení k DPH
                        }
                        else
                            this.actions.actUlozit?.update({ ennabled: false, tooltip: "jres:30250482" }); //RC 30250482 : Hlášení není vytištěné
                    }
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku)
                        this.actions.actTisk?.update({ enabled: true, tooltip: "" }); //RC 30250106 : Přiznání DPH
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    if (this.porCislo < 1) {
                        // novy zaznam
                        this.findFields("dat_zjist_dod").gfield("option", "disabled", this.typPriznani !== 30 /* Interface.GETypPriznaniDPH.Dodatecne */);
                        this.findFields("dat_zjist_dod").gfield("option", "flag", this.typPriznani == 30 /* Interface.GETypPriznaniDPH.Dodatecne */ ? "required" : "");
                        this.findFields("dat_zjist_dod").gfield("option", "validators", this.typPriznani == 30 /* Interface.GETypPriznaniDPH.Dodatecne */ ? [new Gordic.Validators.Required()] : []);
                    }
                }
                /**
                 * Ulozeni dat
                 *
                 * */
                Ulozit(vstup, deferrer) {
                    var that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250038"); //RC 30250038 : Probíhá ukládání
                        let result = {};
                        that.findFields().gfield("model", "collect", result); // verificationNeeded: false 
                        //vstup.rok = that.rok;
                        //debugger;
                        vstup = {};
                        vstup.Vstup = this.model;
                        vstup.Vstup.por_cislo = that.porCislo;
                        vstup.Vstup.cj_vyzvy = result.cj_vyzvy;
                        vstup.Vstup.dat_zjist_dod = result.dat_zjist_dod;
                        vstup.Vstup.dat_priz_dph = result.dat_priz_dph;
                        vstup.Vstup.vyzva_odp = result.vyzva_odp;
                    }
                    return that.isl.InuKontrolniHlaseni.upsert({ rq: vstup })
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        //debugger;
                        that.endOperation();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }
                    //,
                    //(jqXHR, type, obj) => {
                    //    //debugger;
                    //    that.endOperation();
                    //}
                    , function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object" /*type === "validation"*/) {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        //debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.Ulozit(vstup, deferrer);
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload(datPriznani) {
                    var that = this;
                    //debugger;
                    var def = $.Deferred();
                    that.beginOperation("jres:30250126"); //RC 30250126 : Načítam data
                    return Gordic.Isl.InuKontrolniHlaseni.read({ mesic: that.mesic, porCislo: this.porCislo, skutdatPriznani: datPriznani })
                        .get()
                        .done(function (result) {
                        //debugger;
                        // pro spravne naplneni
                        result.data.dat_priz_dph = datPriznani;
                        that.findFields().gfield("model", "apply", result.data, { initialValues: true, setFlags: { triggerChange: false } }); // verificationNeeded: false 
                        that.typPriznani = result.data.typ_priz_dph;
                        that.NastaveniAkci();
                        //});
                        //return def.resolve(res);
                    })
                        .always(function () { that.endOperation(); });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    // pokud se needituje, je možné detail zavřít
                    def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true });
                    return def.promise();
                }
            };
            GDetailKontrolnihoHlaseni = __decorate([
                gcontent
                /**
                 *  Detail zna. obdobi dph
                 */
            ], GDetailKontrolnihoHlaseni);
            WebClient.GDetailKontrolnihoHlaseni = GDetailKontrolnihoHlaseni;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEtvbnRyb2xuaWhvSGxhc2VuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxLb250cm9sbmlob0hsYXNlbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW1ZZjtBQW5ZRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtWW5CO0lBbllnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtWTdCO1FBbllvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQU1uQyxJQUFhLHlCQUF5QjtZQUh0Qzs7ZUFFRztZQUNILE1BQWEseUJBQTBCLFNBQVEsT0FBQSxZQUFZO2dCQUEzRDs7b0JBeUJJOzs7O3VCQUlHO29CQUNJLGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBSTNCLFlBQU8sR0FBRyxLQUFLLENBQUM7b0JBQ3ZCOzt5QkFFSztvQkFDRyxZQUFPLEdBQVksS0FBSyxDQUFDO2dCQXFWckMsQ0FBQztnQkFwVkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQzt5QkFDL0UsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLG1CQUFtQjtvQkFDakU7d0JBQ0ksSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSTtxQkFDbEMsQ0FBQzt5QkFDTCxNQUFNLENBQUMsZUFBZSxDQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDN0MsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSTtxQkFD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QUFILFVBQUcsUUFtWW5CO0FBQUQsQ0FBQyxFQW5ZUyxNQUFNLEtBQU4sTUFBTSxRQW1ZZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgLyoqXHJcbiAgICAgKiAgRGV0YWlsIHpuYS4gb2Jkb2JpIGRwaFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbEtvbnRyb2xuaWhvSGxhc2VuaSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBamF4IHByb3BlcnR5XHJcbiAgICAgICAgICogIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBtb2RlbDogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2hraGxEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICByZWFkb25seSBHbG9iYWxQYXJhbXM6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVHbG9iYWxEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBwb3JDaXNsbzogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCBwcml6bmFuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHR5cFByaXpuYW5pOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBIOyAgICAgICAgXHJcbiAgICAgICAgLy8gcmV6aW0gZWRpdGFjZVxyXG4gICAgICAgIHB1YmxpYyBlZGl0YWNlOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1lc2ljIHByaXpuYW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbmkgZWRpdGFjZSBkYXR1bXUgZHV2b2R1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgZGF0dW1EdXZvZHVFbmFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG15TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgcmVmcmVzaCA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEF0cmlidXQgdXJjdWppY2ksIHpkYSBzZSBqaXogYnlsIHBvcnZlZGVuIHRpc2tcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJpbnRlZDogYm9vbGVhbiA9IGZhbHNlOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9hdC5tb2RlbC5la29fYWt0X3R4dFxyXG4gICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAxOVwiLCApLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwMDE5IDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19kcGhcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAyMFwiLCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMDI1MDAyMCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljX2RwaFwiLCBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE0MlwiLCkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMDI1MDE0MiA6IFBvxZlhZMOtXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3JfY2lzbG9cIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiIFwiKSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTQzXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9wcml6X21heFwiLCBkaXNhYmxlZDogdHJ1ZSB9KSAvL1JDIDMwMjUwMTQzIDogTWF4LiBkYXR1bSBwcm8gcG9kw6Fuw60gS0hcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTQ0XCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMTQ0IDogVHlwIHBvZGFuw6lobyBLSFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ByaXpfZHBoX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTQ1XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsIGRpc2FibGVkOiAhdGhhdC5lZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQob2JqLnZhbHVlIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDE0NSA6IERhdHVtIHNrdXRlxI1uw6lobyBwb2TDoW7DrSBLSFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxNDZcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IC8vUkMgMzAyNTAxNDYgOiBEYXR1bSB6amnFoXTEm27DrSBkxa92b2TFryBwcm8gbsOhc2xlZG7DqSBrb250cm9sbsOtIGhsw6HFoWVuw61cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96amlzdF9kb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoaXMuZGF0dW1EdXZvZHVFbmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogdGhhdC5kYXR1bUR1dm9kdUVuYWJsZSA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiB0aGF0LmRhdHVtRHV2b2R1RW5hYmxlID8gXCJyZXF1aXJlZFwiIDogXCJcIixcclxuXHJcbiAgICAgICAgICAgICAgICB9KSAvL1JDIDMwMjUwMTQ2IDogRGF0dW0gemppxaF0xJtuw60gZMWvdm9kxa8gcHJvIG7DoXNsZWRuw6kgS0hcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE0OVwiKSAvL1JDIDMwMjUwMTQ5IDogxIzDrXNsbyBqZWRuYWPDrSB2w716dnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqX3Z5enZ5Y2hcIlxyXG4gICAgICAgICAgICAgICAgICAgICxpbml0aWFsVmFsdWU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLG1vZGVsOlwiXCJcclxuICAgICAgICAgICAgICAgICAgICAsbGFiZWw6XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhdGhhdC5lZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9IHRoYXQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgY250ID0gJC5jb250ZW50KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKFwidnl6dmFfb2RwLGNqX3Z5enZ5XCIpIC8vIG5hbGV6ZW5pIGppbmVoby95Y2ggcG9saWNla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImNsZWFyXCIpOyAvLyB2eW1hemFuaSBtZXNpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LmZpbmRGaWVsZHMoXCJ2eXp2YV9vZHAsY2pfdnl6dnlcIikgLy8gbmFsZXplbmkgamluZWhvL3ljaCBwb2xpY2VrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB2YWx1ZSA9PSBudWxsICB8fCB2YWx1ZS52YWx1ZSA9PT0gZmFsc2UgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2Zvcm1hdHRlZGJveFwiLCBcInctMTBcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2pfdnl6dnlcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcXC8tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6XCJOTk5OTk5OTi9OTi9OTk5OLU5OTk5OLU5OTk5OTlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFt0aGF0LlZhbGlkYXRvckNKLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZWdFeHAoeyBwYXR0ZXJuOiBcIihcXFxcZHswLDh9L1xcXFxkezAsMn0vXFxcXGR7MCw0fVxcLVxcXFxkezAsNX0tXFxcXGR7MCw2fSkqXCIsIGVycm9yVHlwZTogXCJlcnJvclwiLCBzdG9wcGluZzogdHJ1ZSwgbWVzc2FnZTogXCJDaHlibsO9IGZvcm3DoXRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDE0OFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMwMjUwMTQ4IDogUnljaGzDoSBvZHBvdsSbxI9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5enZhX29kcFwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IGZhbHNlLCBpdGVtV2lkdGg6IFwiXCIsIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbDogXCJtb2RlbC5zX3phdT12YWx1ZS5zdGF2X2V2aVwiLCBpdGVtVGVtcGxhdGU6IFwie3N0YXZfZXZpX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgaGVscGVyQ29sdW1uczogW1widnl6dmFfb2RwX3R4dFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcInt2eXp2YV9vZHBfdHh0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC52eXp2YV9vZHA9dmFsdWUudnl6dmFfb2RwXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGluaXRpYWxWYWx1ZTogeyB2eXp2YV9vZHBfdHh0OiBcIlwiIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdnl6dmFfb2RwX3R4dDogXCJqcmVzOjMwMjUwMTUwXCIsIHZ5enZhX29kcDogXCJCXCIgfSAvL1JDIDMwMjUwMTUwIDogQiAtIE5lbcOhbSBwb3Zpbm5vc3QgcG9kYXQgS0hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCB7IHZ5enZhX29kcF90eHQ6IFwianJlczozMDI1MDE1MVwiLCB2eXp2YV9vZHA6IFwiUFwiIH0gLy9SQyAzMDI1MDE1MSA6IFAgLSBQb3R2cnp1amkgc3Byw6F2bm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcInZ5enZhX29kcFwiIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0YWJIZWFkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8gcHJvIHZhbGlkYXRvcnkgemUgc2VydmVydVxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gdGhpcy5lbGVtZW50Oy8vdGFiSGVhZDtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRUbyh0YWJIZWFkKTtcclxuXHJcbiAgICAgICAgICAgIC8vZmllbGRjaGFuZ2VcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VWxveml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg2XCIsIC8vUkMgMzAyNTA0ODYgOiBQxZlpem5hdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuZWRpdGFjZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzA0NTAwNDVcIiAvL1JDIDMwNDUwMDQ1IDogS29udHJvbG7DrSBobMOhxaFlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFwianJlczozMDQ1MDA0NlwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDMwNDUwMDQ2IDogUHJvdsOpc3Qga29udG9sbsOtIGhsw6HFoWVuw60gRFBIIChuZXZyYXRuw6Egb3BlcmFjZSkgPz8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDQ1MDA0NVwiIC8vUkMgMzA0NTAwNDUgOiBLb250cm9sbsOtIGhsw6HFoWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzA0NTAwNDdcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAzMDQ1MDA0NyA6IE9wcmF2ZHUgcHJvdsOpc3Qga29udG9sbsOtIGhsw6HFoWVuw60gRFBIIChuZXZyYXRuw6Egb3BlcmFjZSkgPz8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlVsb3ppdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHsgcmVmcmVzaDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNldFBlbmRpbmcoJC5jb250ZW50KHRoaXMpLlVsb3plbmkodGhhdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uV2ViQ2xpZW50LkRldGFpbFByZWRrb250YWNlTWV0aG9kLlVsb3plbmkodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1fZGFua29obFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSz8udG9TdHJpbmcoKS50cmltKCkgKyBcIjEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nQ2xvc2VkOiAoKSA9PiB7IHRoYXQucHJpbnRlZCA9IHRydWU7IHRoYXQuTmFzdGF2ZW5pQWtjaSgpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfZGF0dW0gPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiBHRUlEU2VzdGF2eS5EZXRhaWxQcml6bmFuaURQSCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiB0aGF0Lm1lc2ljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwUHJpem5hbmk6IHRoYXQubW9kZWwudHlwX3ByaXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9yQ2lzbG86IHRoYXQucG9yQ2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRaamlzdGVuaURvZDogdl9kYXR1bSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICwgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUbGFjaXRrbyB6YXZyaXRcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VWxveml0IH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RaYXZyaXRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgLy8gICAgLy97IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFVsb3ppdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vXSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQudHlwUHJpem5hbmk9IHRoYXQubW9kZWwudHlwX3ByaXpfZHBoIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEg7XHJcbiAgICAgICAgICAgIC8vcGxuxJtuw60gaGxhdmnEjWtvdsOpaG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgICAgIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgIC0gbmV2eXZvbGEgc2UgdmFsaWRhY2UgeiBkYXRhYmF6ZSwgemRhIGplIGhvZG5vdGEgb2tcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlIFxyXG4vLyAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQuZG9jVmFsaWRhdG9ycylcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcInZ5enZhX29kcFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHZ5enZhX29kcDogdGhhdC5tb2RlbC52eXp2YV9vZHAgfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgIC8vIGZvY3VzIG5hIHBydm5pIGVkaXRvdmF0ZWxub3UgYnVua3VcclxuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpJykuZmlyc3QoKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgVmFsaWRhdG9yQ0oodmFsdWU6c3RyaW5nLG9iamVjdCxjb250ZW50KSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZT09PW51bGwgfHx0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsdWUudHJpbSgpID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHBhdHQgPSBuZXcgUmVnRXhwKFwiXFxcXGR7MCw4fS9cXFxcZHswLDJ9L1xcXFxkezAsNH1cXC1cXFxcZHswLDV9LVxcXFxkezAsOH1cIik7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBwYXR0LnRlc3QodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgTmFzdGF2ZW5pQWtjaSgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRhY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByaW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWxveml0Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODFcIiB9KTsgLy9SQyAzMDI1MDQ4MSA6IFVsb8W+ZW7DrSBobMOhxaFlbsOtIGsgRFBIXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdD8udXBkYXRlKHsgZW5uYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODJcIiB9KTsgLy9SQyAzMDI1MDQ4MiA6IEhsw6HFoWVuw60gbmVuw60gdnl0acWhdMSbbsOpXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0aXNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pVGlza3UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSwgdG9vbHRpcDogXCJcIiB9KTsgLy9SQyAzMDI1MDEwNiA6IFDFmWl6bsOhbsOtIERQSFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDEwNVwiIH0pOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gcG92b2xlbm8gcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3JDaXNsbyA8IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vdnkgemF6bmFtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRoaXMudHlwUHJpem5hbmkgIT09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILkRvZGF0ZWNuZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgdGhpcy50eXBQcml6bmFuaSA9PSBJbnRlcmZhY2UuR0VUeXBQcml6bmFuaURQSC5Eb2RhdGVjbmUgPyBcInJlcXVpcmVkXCIgOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcImRhdF96amlzdF9kb2RcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnR5cFByaXpuYW5pID09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILkRvZGF0ZWNuZSA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gOiBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgVWxveml0KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVBvZGF0SGxhc2VuaVJlcXVlc3REdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDAzOFwiKTsgLy9SQyAzMDI1MDAzOCA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2hraGxEdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCByZXN1bHQpIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgXHJcbiAgICAgICAgICAgICAgICAvL3ZzdHVwLnJvayA9IHRoYXQucm9rO1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5Wc3R1cCA9IHRoaXMubW9kZWw7XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5Wc3R1cC5wb3JfY2lzbG8gPSB0aGF0LnBvckNpc2xvO1xyXG4gICAgICAgICAgICAgICAgdnN0dXAuVnN0dXAuY2pfdnl6dnkgPSByZXN1bHQuY2pfdnl6dnk7XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5Wc3R1cC5kYXRfemppc3RfZG9kID0gcmVzdWx0LmRhdF96amlzdF9kb2Q7XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5Wc3R1cC5kYXRfcHJpel9kcGggPSByZXN1bHQuZGF0X3ByaXpfZHBoO1xyXG4gICAgICAgICAgICAgICAgdnN0dXAuVnN0dXAudnl6dmFfb2RwID0gcmVzdWx0LnZ5enZhX29kcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkludUtvbnRyb2xuaUhsYXNlbmkudXBzZXJ0KHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVQb2RhdEhsYXNlbmlSZXF1ZXN0RHRvfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFjb250ZW50Lm90ZXZyZW5pQmV6U2V6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8oanFYSFIsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIi8qdHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7IC8vdHJhbnNNc2cuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5VbG96aXQodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQoZGF0UHJpem5hbmk6IERhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxMjZcIik7IC8vUkMgMzAyNTAxMjYgOiBOYcSNw610YW0gZGF0YVxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVLb250cm9sbmlIbGFzZW5pLnJlYWQoeyBtZXNpYzogdGhhdC5tZXNpYywgcG9yQ2lzbG86IHRoaXMucG9yQ2lzbG8sIHNrdXRkYXRQcml6bmFuaTogZGF0UHJpem5hbmkgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvIHNwcmF2bmUgbmFwbG5lbmlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0YS5kYXRfcHJpel9kcGggPSBkYXRQcml6bmFuaTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHJlc3VsdC5kYXRhLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUsIHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0gfSk7IC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50eXBQcml6bmFuaT0gcmVzdWx0LmRhdGEudHlwX3ByaXpfZHBoIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUocmVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdHlwZW9mIHRoYXQucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGF0LnJlZnJlc2ggPT09IHRydWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==