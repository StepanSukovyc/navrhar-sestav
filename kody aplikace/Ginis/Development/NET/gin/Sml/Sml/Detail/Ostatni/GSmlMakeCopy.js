"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlMakeCopy.ts                        </Name>
//    <Description> Content pro vytvoření kopie dokladu                         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-12-12                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** Content pro vytvoření kopie dokladu */
            let GSmlMakeCopy = class GSmlMakeCopy extends Gordic.GContentBase {
                onContentReady() {
                    //rozlišení dokladu s fin. profilem
                    this.no_fin_dok = this.smlpid.ktg_typ == 1620 /* Interface.KategorieTypuSmluv.ng_ktgtypKDSNoEko */ || this.smlpid.ktg_typ == 1650 /* Interface.KategorieTypuSmluv.ng_ktgtypKOSNoEko */
                        || this.smlpid.ktg_typ == 1624 /* Interface.KategorieTypuSmluv.ng_ktgtypKDSObjNoEko */ || this.smlpid.ktg_typ == 1654 /* Interface.KategorieTypuSmluv.ng_ktgtypKOSObjNoEko */;
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.$form.findFields().gfield("model", "apply", {
                        ixp_den: this.ixp_den,
                        rok_obd: this.ekosden.rok,
                        dat_uzavreni: this.smlpid.dat_uzavreni,
                        dat_platnost: this.smlpid.dat_platnost,
                        dat_ucinnost: this.smlpid.dat_ucinnost,
                        fin_od: (!this.no_fin_dok) ? this.smlpid.fin_od : void 0,
                        fin_do: (!this.no_fin_dok) ? this.smlpid.fin_do : void 0,
                    }, { initialValues: true });
                    this.$form.findFields("cb_pol_fp").gfield("option", "disabled", !(this.ekosden.rok == this.rok && !this.no_fin_dok));
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: function (ev, ctx) {
                                this.setPending(that.actOkFunc());
                            }
                        }),
                        actZrusit: Gordic.Eko.Action.actionZrusit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZrusit"]));
                }
                /** Vytvoření formuláře*/
                createForm() {
                    var ktg_den_filtr;
                    //knihou - povolím tedy pouze přeevidovat do knihy stejné kategorie
                    if (this.smlpid.ktg_den == 1670 /* Interface.KategorieKnih.ng_ktgdenSML */ || this.smlpid.ktg_den == 1650 /* Interface.KategorieKnih.ng_ktgdenSMLNoEko */) {
                        ktg_den_filtr = [this.smlpid.ktg_den, 1600 /* Interface.KategorieKnih.ng_ktgdenKDS */, 1630 /* Interface.KategorieKnih.ng_ktgdenKOS */];
                    }
                    else if (this.smlpid.ktg_den == 1675 /* Interface.KategorieKnih.ng_ktgdenOBJ */ || this.smlpid.ktg_den == 1680 /* Interface.KategorieKnih.ng_ktgdenOBJNoEko */) {
                        ktg_den_filtr = [this.smlpid.ktg_den, 1625 /* Interface.KategorieKnih.ng_ktgdenKDSObj */, 1645 /* Interface.KategorieKnih.ng_ktgdenKOSObj */];
                    }
                    else {
                        ktg_den_filtr = this.smlpid.ktg_den;
                    }
                    const typ_dok = this.smlpid.typ_dok;
                    //default je pro objednávku
                    var lbl_dat_uzavreni = "jres:33600531"; //RC 33600531 : Datum vystavení
                    var lbl_dat_platnost = "jres:33600532"; //RC 33600532 : Termín
                    //390.1 29.09.22 zohledněn dodatek objednávky pomocí dod_obj
                    if (typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ ||
                        (typ_dok == 30 /* Interface.TypDokladu.ng_typdokSmlAcc */ && this.smlpid.dod_obj == 0) ||
                        typ_dok == 22 /* Interface.TypDokladu.ng_typdokInd */ || typ_dok == 40 /* Interface.TypDokladu.ng_typdokJinyPrijemLim */ ||
                        typ_dok == 42 /* Interface.TypDokladu.ng_typdokJinyPrijemInd */) {
                        lbl_dat_platnost = "jres:33600535"; //RC 33600535 : Datum konce platnosti
                        if (typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ || typ_dok == 30 /* Interface.TypDokladu.ng_typdokSmlAcc */) {
                            lbl_dat_uzavreni = "jres:33600506"; //RC 33600506 : Datum uzavření
                        }
                        else {
                            lbl_dat_uzavreni = "jres:33600531"; //RC 33600531 : Datum vystavení
                        }
                    }
                    var form = new Gordic.Forms.Form({
                        name: "formMakeCopy",
                        layoutDescriptor: "L1M1S1"
                    })
                        .addSection({ label: "jres:33600533" /*, layoutDescriptor: "L-8-4-0"*/ }) //RC 33600533 : Údaje dokladu
                        .addRow("jres:33600534") //RC 33600534 : Kniha
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosdenAll(), {
                        name: "ixp_den",
                        model: "model.ixp_den=value.ixp_den",
                        flag: 'required',
                        serverFilters: {
                            //ico: this.ico,
                            ucs: this.ucs,
                            rok: { o: ">=", v: this.rok },
                            ktg_den: ktg_den_filtr,
                            ixs_fun: this.ixs_fun,
                            aktivita: 100
                        },
                        validators: [new Gordic.Validators.Required()],
                        change: (ev, ctx) => {
                            if (ctx.value) {
                                var rok_dbd_field = this.$form.findFields("rok_obd");
                                var prevRok = rok_dbd_field.gfield("getValue");
                                rok_dbd_field.gfield("setValue", ctx.value.rok);
                                //376.6 28.12.15 předplní se i roky financování
                                this.$form.findFields("fin_od").gfield("setValue", ctx.value.rok);
                                this.$form.findFields("fin_do").gfield("setValue", ctx.value.rok);
                                const cb_pol_fp = this.$form.findFields("cb_pol_fp");
                                if (ctx.value.rok != prevRok) {
                                    //když se nová kniha nerovná předchozímu přednastavenému roku, takže vymažu hodnoty datumů
                                    this.$form.findFields("dat_uzavreni, dat_platnost, dat_ucinnost").gfield("setValue", void 0);
                                }
                                if (ctx.value.rok != this.rok) {
                                    cb_pol_fp.gfield("setValue", false);
                                    cb_pol_fp.gfield("option", "disabled", true);
                                }
                                else {
                                    cb_pol_fp.gfield("option", "disabled", this.no_fin_dok);
                                }
                            }
                        }
                    })
                        .addRow("jres:33600536") //RC 33600536 : Období
                        .addField("gnumberbox", {
                        name: "rok_obd",
                        model: "model.rok_obd=>value",
                        disabled: true
                    })
                        .addRow("jres:33600537") //RC 33600537 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_sml",
                        disabled: this.sml_def_acsml != "man",
                        flag: (this.sml_def_acsml == "man") ? 'required' : void 0,
                        validators: (this.sml_def_acsml == "man") ? [new Gordic.Validators.Required()] : void 0, //kontrola duplicity až na serveru (CheckDuplAc)
                    })
                        .addRow(lbl_dat_uzavreni)
                        .addField("gdatebox", {
                        name: "dat_uzavreni",
                        flag: 'required',
                        validators: [new Gordic.Validators.Required()],
                        change: (ev, ctx) => {
                            //343.1 02.05.02 - přednastavím datum účinnosti
                            if (ctx?.value) {
                                var dat_ucinnost = $(ev.target).closest(".gform").findFields("dat_ucinnost");
                                //setnu hodnotu pouze pokud je pole prázdné
                                if (!dat_ucinnost.gfield("getValue")) {
                                    dat_ucinnost.gfield("setValue", ctx.value);
                                }
                            }
                        }
                    })
                        .addRow(lbl_dat_platnost)
                        .addField("gdatebox", {
                        name: "dat_platnost",
                        disabled: this.smlpid.typ_platnost != 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */, //řízení na základě typ platnosti
                        flag: 'required',
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                message: "jres:33600508", //RC 33600508 : Datum platnosti smlouvy je menší než datum uzavření
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //pro dobu určitou
                                    if (this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        var dat_uzavreni = form.findFields("dat_uzavreni").gfield("getValue");
                                        //pokud je některý nulový, vracím Ok
                                        if (!value || !dat_uzavreni) {
                                            return true;
                                        }
                                        if (dat_uzavreni > value) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            }),
                            new Gordic.Validators.Base({
                                errorType: "warning",
                                stopping: false,
                                message: "jres:33600509", //RC 33600509 : Rok platnosti smlouvy nesouhlasí s rokem uzavření
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //pro dobu určitou
                                    if (this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        var dat_uzavreni = form.findFields("dat_uzavreni").gfield("getValue");
                                        //pokud je některý nulový, vracím Ok
                                        if (!value || !dat_uzavreni) {
                                            return true;
                                        }
                                        if (parseDate(value).getFullYear() != parseDate(dat_uzavreni).getFullYear()) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            })
                        ]
                    })
                        .addRow("jres:33600510") //RC 33600510 : Datum účinnosti
                        .addField("gdatebox", {
                        name: "dat_ucinnost",
                        flag: 'required',
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                message: "jres:33600511", //RC 33600511 : Datum účinnosti nesmí být nižší než datum uzavření smlouvy
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //nikdy nesmí být nižší než datum uzavření
                                    var dat_uzavreni = form.findFields("dat_uzavreni").gfield("getValue");
                                    if (value < dat_uzavreni) {
                                        //Call dfDatUcinnost._put( dfDatUzavreni._get( ) )
                                        return false;
                                    }
                                    return true;
                                }
                            }),
                            new Gordic.Validators.Base({
                                message: "jres:33600512", //RC 33600512 : Datum účinnosti nesmí být vyšší než datum platnosti smlouvy
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //pro dobu určitou
                                    if (this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        var dat_platnost = form.findFields("dat_platnost").gfield("getValue");
                                        if (value > dat_platnost) {
                                            //Call dfDatUcinnost._put( dfDatPlatnost._get( ) )
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            })
                        ]
                    })
                        .addRow("jres:33600538") //RC 33600538 : Období financování od, do
                        .addField("gnumberbox", "w-6", {
                        name: "fin_od",
                        disabled: this.no_fin_dok,
                        flag: (!this.no_fin_dok) ? "required" : void 0,
                        validators: [
                            new Gordic.Validators.Range({ min: 1930, max: 2990 }),
                            new Gordic.Validators.Base({
                                message: "jres:33600539", //RC 33600539 : Doba financování nemůže klesnout pod začátek účinnosti
                                validate: (value, src) => {
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    var dat_ucinnost_field = this.$form.findFields("dat_ucinnost");
                                    dat_ucinnost_field.gfield("validate");
                                    if (dat_ucinnost_field.gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //368.8 10.08.12 pro LP musí být období financování pouze jeden rok
                                    var dat_ucinnost = dat_ucinnost_field.gfield("getValue");
                                    return value >= parseDate(dat_ucinnost).getFullYear();
                                    //Set df_fin_od =  SalDateYear( df_dat_ucinnost._get( ) )
                                }
                            }),
                            new Gordic.Validators.Base({
                                message: "jres:33600541".format(this.dokTypName), //RC 33600541 : Doba financování je vyšší než platnost {0}
                                //errorType: "warning", //v TK sice jako info, ale stejně změní hodnotu a nedovolí mu uložit
                                //stopping: false,
                                validate: (value, src) => {
                                    //pokud je již zadána doba platnosti a typ platnosti je nadobu určitou - kontroluju, zda fin_do nepřesáhlo dobu platnosti
                                    if (this.smlpid.typ_platnost != 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        return true;
                                    } //kontrola pouze pro určitou
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    var dat_platnost_field = this.$form.findFields("dat_platnost");
                                    dat_platnost_field.gfield("validate");
                                    if (dat_platnost_field.gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //347.1 03.07.03 pevná kontrola financování změněna na varování - VUL GORDP001YNCH
                                    var dat_platnost = dat_platnost_field.gfield("getValue");
                                    return value <= parseDate(dat_platnost).getFullYear();
                                    //Set df_fin_od =  SalDateYear( df_dat_ucinnost._get( ) )
                                }
                            })
                        ]
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "fin_do",
                        disabled: this.no_fin_dok,
                        flag: (!this.no_fin_dok) ? "required" : void 0,
                        validators: [
                            new Gordic.Validators.Range({ min: 1930, max: 2990 }),
                            new Gordic.Validators.Base({
                                message: "jres:33600540", //RC 33600540 : Limitovaný příslib je možné financovat pouze v jednom roce
                                validate: (value, src) => {
                                    if (this.smlpid.ktg_sml != 90 /* Interface.KategorieDokladu.ng_ktgsmlLimPrislib */) {
                                        return true;
                                    } //kontrola pouze pro limitovaný příslib
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    var fin_od_field = this.$form.findFields("fin_od");
                                    fin_od_field.gfield("validate");
                                    if (fin_od_field.gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //368.8 10.08.12 pro LP musí být období financování pouze jeden rok
                                    var fin_od = fin_od_field.gfield("getValue");
                                    return fin_od == value;
                                    //Set df_fin_do = df_fin_od
                                }
                            }),
                            new Gordic.Validators.Base({
                                message: "jres:33600541".format(this.dokTypName), //RC 33600541 : Doba financování je vyšší než platnost {0}
                                //errorType: "warning", //v TK sice jako info, ale stejně změní hodnotu a nedovolí mu uložit
                                //stopping: false,
                                validate: (value, src) => {
                                    //pokud je již zadána doba platnosti a typ platnosti je nadobu určitou - kontroluju, zda fin_do nepřesáhlo dobu platnosti
                                    if (this.smlpid.typ_platnost != 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        return true;
                                    } //kontrola pouze pro určitou
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    var dat_platnost_field = this.$form.findFields("dat_platnost");
                                    dat_platnost_field.gfield("validate");
                                    if (dat_platnost_field.gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //347.1 03.07.03 pevná kontrola financování změněna na varování - VUL GORDP001YNCH
                                    var dat_platnost = dat_platnost_field.gfield("getValue");
                                    return value <= parseDate(dat_platnost).getFullYear();
                                    //Set df_fin_od =  SalDateYear( df_dat_ucinnost._get( ) )
                                }
                            })
                        ]
                    })
                        .addSection({ label: "jres:33600542", layoutDescriptor: "L-11-1-0 M-11-1-0 S-11-1-0" }) //RC 33600542 : Údaje odvozené
                        //vytvoření rozpisu na roky
                        .addRow("jres:33600543") //RC 33600543 : Vytvořit nulové záznamy rozpisu na částky na období
                        .addField("gcheck", {
                        name: "cb_rozpis",
                        disabled: this.no_fin_dok
                    })
                        //vytvoření položek fp
                        .addRow("jres:33600544") //RC 33600544 : Vytvořit nulové položky finančního profilu
                        .addField("gcheck", {
                        name: "cb_pol_fp",
                        disabled: this.no_fin_dok,
                        change: (ev, ctx) => {
                            //finanční profil nelze bez rozpisu
                            var cb_rozpis_field = this.$form.findFields("cb_rozpis");
                            if (ctx.value) {
                                cb_rozpis_field.gfield("setValue", true);
                                cb_rozpis_field.gfield("disable");
                            }
                            else {
                                cb_rozpis_field.gfield("option", "disabled", this.no_fin_dok);
                            }
                        }
                    })
                        //vytvoření položek vp
                        .addRow("jres:33600545") //RC 33600545 : Vytvořit nulové položky věcného profilu
                        .addField("gcheck", {
                        name: "cb_pol_vp"
                    })
                        //vazba na nadřazený případ
                        .addRow("jres:33600546") //RC 33600546 : Vytvořit vazbu na původní případ
                        .addField("gcheck", {
                        name: "cb_bnd_sml",
                        disabled: !((typ_dok == 10 /* Interface.TypDokladu.ng_typdokObj */ || typ_dok == 30 /* Interface.TypDokladu.ng_typdokSmlAcc */ || typ_dok == 20 /* Interface.TypDokladu.ng_typdokLim */ ||
                            typ_dok == 40 /* Interface.TypDokladu.ng_typdokJinyPrijemLim */ ||
                            (typ_dok == 0 /* Interface.TypDokladu.ng_typdokSml */ && !(this.smlpid.ktg_typ == 1615 /* Interface.KategorieTypuSmluv.ng_ktgtypKDSRS */ || this.smlpid.ktg_typ == 1645 /* Interface.KategorieTypuSmluv.ng_ktgtypKOSRS */)))
                            && ((this.smlpid.ixp_sml?.trim() ?? "".length > 0) && this.smlpid.ixp_sml != this.smlpid.ixp))
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /** Akce uložení */
                actOkFunc() {
                    if (!this.$form.gform("isValid")) {
                        return $.Deferred().reject().promise();
                    }
                    var modelData = {};
                    this.$form.findFields().gfield("model", "collect", modelData);
                    modelData["ixp"] = this.smlpid.ixp;
                    modelData["zpusobGenerovani"] = parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp));
                    var rok_obd = this.$form.findFields("rok_obd").gfield("getValue");
                    var texts = [];
                    if (parseDate(modelData.dat_uzavreni).getFullYear() < rok_obd) {
                        texts.push("jres:33600547"); //RC 33600547 : Opravdu požadujete ponechat datum uzavření s rokem nižším, než má zvolená kniha?
                    }
                    if (parseDate(modelData.dat_ucinnost).getFullYear() < rok_obd) {
                        texts.push("jres:33600548"); //RC 33600548 : Opravdu požadujete ponechat datum účinnosti s rokem nižším, než má zvolená kniha?
                    }
                    if (this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */ && parseDate(modelData.dat_platnost).getFullYear() < rok_obd) {
                        texts.push("jres:33600549"); //RC 33600549 : Opravdu požadujete ponechat datum platnosti s rokem nižším, než má zvolená kniha?
                    }
                    if (modelData.fin_od < rok_obd || modelData.fin_do < rok_obd) {
                        texts.push("jres:33600550"); //RC 33600550 : Opravdu požadujete ponechat financování v roce nižším, než má zvolená kniha?
                    }
                    if (texts.length > 0) {
                        return this.dialogs.confirm("jres:33600551", texts.join('\n')).createDialogPromise("yes").then(() => {
                            return this.makeCopyIsl(modelData);
                        });
                    }
                    return this.makeCopyIsl(modelData);
                }
                makeCopyIsl(modelData) {
                    return this.isl.SmlMakeCopy.makeCopy(modelData).getData().then((res) => {
                        this.tryClose({ ixp: res.ixp });
                    }).fail((xhr, type, o) => {
                        if (type === "validation") {
                            //o.handled = true;
                            this.$form.findFields().gfield("model", "validations", o);
                        }
                    });
                }
            };
            GSmlMakeCopy = __decorate([
                Decorators.gcontent
            ], GSmlMakeCopy);
            WebClient.GSmlMakeCopy = GSmlMakeCopy;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbE1ha2VDb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbE1ha2VDb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBK2FmO0FBL2FELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQSthbkI7SUEvYWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQSthN0I7UUEvYW9CLFdBQUEsU0FBUztZQVcxQiwwQ0FBMEM7WUFFMUMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLE9BQUEsWUFBWTtnQkEwQjFDLGNBQWM7b0JBQ1YsbUNBQW1DO29CQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyw2REFBa0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sNkRBQWtEOzJCQUN6SixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sZ0VBQXFELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGdFQUFxRCxDQUFDO29CQUM1SixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7d0JBQzdDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt3QkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzt3QkFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTt3QkFDdEMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTt3QkFDdEMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTt3QkFDdEMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3hELE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3FCQUMzRCxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pILENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOzRCQUM5QixPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQztxQkFDTCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBRUQseUJBQXlCO2dCQUNqQixVQUFVO29CQUNkLElBQUksYUFBYSxDQUFDO29CQUNsQixtRUFBbUU7b0JBQ25FLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLG1EQUF3QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx3REFBNkMsRUFBRSxDQUFDO3dCQUNsSSxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sbUdBQTZFLENBQUM7b0JBQ3RILENBQUM7eUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sbURBQXdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLHdEQUE2QyxFQUFFLENBQUM7d0JBQ3pJLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyx5R0FBbUYsQ0FBQztvQkFDNUgsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDeEMsQ0FBQztvQkFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDcEMsMkJBQTJCO29CQUMzQixJQUFJLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjtvQkFDdkUsSUFBSSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsQ0FBQyxzQkFBc0I7b0JBQzlELDREQUE0RDtvQkFDNUQsSUFBSSxPQUFPLDZDQUFxQyxJQUFJLE9BQU8sOENBQXFDO3dCQUM1RixDQUFDLE9BQU8saURBQXdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO3dCQUM3RSxPQUFPLDhDQUFxQyxJQUFJLE9BQU8sd0RBQStDO3dCQUN0RyxPQUFPLHdEQUErQyxFQUFFLENBQUM7d0JBQ3pELGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxDQUFDLHFDQUFxQzt3QkFDekUsSUFBSSxPQUFPLDZDQUFxQyxJQUFJLE9BQU8saURBQXdDLEVBQUUsQ0FBQzs0QkFDbEcsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLENBQUMsOEJBQThCO3dCQUN0RSxDQUFDOzZCQUFNLENBQUM7NEJBQ0osZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLENBQUMsK0JBQStCO3dCQUN2RSxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDNUI7d0JBQ0ksSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLGdCQUFnQixFQUFFLFFBQVE7cUJBQzdCLENBQUM7eUJBQ0QsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQSxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsNkJBQTZCO3lCQUNyRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMscUJBQXFCO3lCQUM3QyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFO3dCQUN4RCxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsNkJBQTZCO3dCQUNwQyxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsYUFBYSxFQUFFOzRCQUNYLGdCQUFnQjs0QkFDaEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzRCQUNiLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQzdCLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87NEJBQ3JCLFFBQVEsRUFBRSxHQUFHO3lCQUNoQjt3QkFDRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0NBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3JELElBQUksT0FBTyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQy9DLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ2hELCtDQUErQztnQ0FDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBRWxFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNyRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO29DQUMzQiwwRkFBMEY7b0NBQzFGLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLDBDQUEwQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNqRyxDQUFDO2dDQUNELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29DQUM1QixTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQ0FDcEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNqRCxDQUFDO3FDQUFNLENBQUM7b0NBQ0osU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDNUQsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsc0JBQXNCO3lCQUM5QyxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsc0JBQXNCO3dCQUM3QixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsOEJBQThCO3lCQUN0RCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLO3dCQUNyQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDekQsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsZ0RBQWdEO3FCQUM1SSxDQUFDO3lCQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzt5QkFDeEIsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbEIsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLElBQUksRUFBRSxVQUFVO3dCQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQzlDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsK0NBQStDOzRCQUMvQyxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQ0FDYixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQzdFLDJDQUEyQztnQ0FDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQ0FDbkMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUMvQyxDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzt5QkFDeEIsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDbEIsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksOERBQXFELEVBQUUsaUNBQWlDO3dCQUMxSCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsVUFBVSxFQUFFOzRCQUNSLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2hDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0NBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUVBQW1FO2dDQUM3RixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0NBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0NBQ3BDLGtCQUFrQjtvQ0FDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksOERBQXFELEVBQUUsQ0FBQzt3Q0FDaEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQ3RFLG9DQUFvQzt3Q0FDcEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRDQUFDLE9BQU8sSUFBSSxDQUFDO3dDQUFDLENBQUM7d0NBQzdDLElBQUksWUFBWSxHQUFHLEtBQUssRUFBRSxDQUFDOzRDQUN2QixPQUFPLEtBQUssQ0FBQzt3Q0FDakIsQ0FBQztvQ0FDTCxDQUFDO29DQUNELE9BQU8sSUFBSSxDQUFDO2dDQUNoQixDQUFDOzZCQUNKLENBQUM7NEJBQ0YsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQ0FDdkIsU0FBUyxFQUFFLFNBQVM7Z0NBQ3BCLFFBQVEsRUFBRSxLQUFLO2dDQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUVBQWlFO2dDQUMzRixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0NBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0NBQ3BDLGtCQUFrQjtvQ0FDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksOERBQXFELEVBQUUsQ0FBQzt3Q0FDaEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQ3RFLG9DQUFvQzt3Q0FDcEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRDQUFDLE9BQU8sSUFBSSxDQUFDO3dDQUFDLENBQUM7d0NBQzdDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDOzRDQUMxRSxPQUFPLEtBQUssQ0FBQzt3Q0FDakIsQ0FBQztvQ0FDTCxDQUFDO29DQUNELE9BQU8sSUFBSSxDQUFDO2dDQUNoQixDQUFDOzZCQUNKLENBQUM7eUJBQ0w7cUJBQ0osQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsK0JBQStCO3lCQUN2RCxRQUFRLENBQUMsVUFBVSxFQUFFO3dCQUNsQixJQUFJLEVBQUUsY0FBYzt3QkFDcEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFVBQVUsRUFBRTs0QkFDUixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNoQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dDQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLDBFQUEwRTtnQ0FDcEcsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNyQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29DQUNwQywwQ0FBMEM7b0NBQzFDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUN0RSxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQUUsQ0FBQzt3Q0FDdkIsa0RBQWtEO3dDQUNsRCxPQUFPLEtBQUssQ0FBQztvQ0FDakIsQ0FBQztvQ0FDRCxPQUFPLElBQUksQ0FBQztnQ0FDaEIsQ0FBQzs2QkFDSixDQUFDOzRCQUNGLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0NBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkVBQTJFO2dDQUNyRyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0NBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0NBQ3BDLGtCQUFrQjtvQ0FDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksOERBQXFELEVBQUUsQ0FBQzt3Q0FDaEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQ3RFLElBQUksS0FBSyxHQUFHLFlBQVksRUFBRSxDQUFDOzRDQUN2QixrREFBa0Q7NENBQ2xELE9BQU8sS0FBSyxDQUFDO3dDQUNqQixDQUFDO29DQUNMLENBQUM7b0NBQ0QsT0FBTyxJQUFJLENBQUM7Z0NBQ2hCLENBQUM7NkJBQ0osQ0FBQzt5QkFDTDtxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx5Q0FBeUM7eUJBQ2pFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFO3dCQUMzQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQ3pCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDOUMsVUFBVSxFQUFFOzRCQUNSLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQzs0QkFDckQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQ0FDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxzRUFBc0U7Z0NBQ2hHLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtvQ0FDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3Q0FBQyxPQUFPLElBQUksQ0FBQztvQ0FBQyxDQUFDO29DQUMzRCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFBO29DQUM5RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ3RDLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3Q0FDcEQsT0FBTyxJQUFJLENBQUM7b0NBQ2hCLENBQUM7b0NBQ0QsbUVBQW1FO29DQUNuRSxJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ3pELE9BQU8sS0FBSyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQ0FDdEQseURBQXlEO2dDQUM3RCxDQUFDOzZCQUNKLENBQUM7NEJBQ0YsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQ0FDdkIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLDBEQUEwRDtnQ0FDNUcsNEZBQTRGO2dDQUM1RixrQkFBa0I7Z0NBQ2xCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtvQ0FDckIseUhBQXlIO29DQUN6SCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSw4REFBcUQsRUFBRSxDQUFDO3dDQUFDLE9BQU8sSUFBSSxDQUFDO29DQUFDLENBQUMsQ0FBQyw0QkFBNEI7b0NBQ2hJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQUMsT0FBTyxJQUFJLENBQUM7b0NBQUMsQ0FBQztvQ0FDM0QsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQ0FDOUQsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUN0QyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQ3BELE9BQU8sSUFBSSxDQUFDO29DQUNoQixDQUFDO29DQUNELGtGQUFrRjtvQ0FDbEYsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUN6RCxPQUFPLEtBQUssSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7b0NBQ3RELHlEQUF5RDtnQ0FDN0QsQ0FBQzs2QkFDSixDQUFDO3lCQUNMO3FCQUNKLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxRQUFRO3dCQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVTt3QkFDekIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUM5QyxVQUFVLEVBQUU7NEJBQ1IsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDOzRCQUNyRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dDQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLDBFQUEwRTtnQ0FDcEcsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTywyREFBa0QsRUFBRSxDQUFDO3dDQUFDLE9BQU8sSUFBSSxDQUFBO29DQUFDLENBQUMsQ0FBQyx1Q0FBdUM7b0NBQ2xJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQUMsT0FBTyxJQUFJLENBQUM7b0NBQUMsQ0FBQztvQ0FDM0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7b0NBQ2xELFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ2hDLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQzlDLE9BQU8sSUFBSSxDQUFDO29DQUNoQixDQUFDO29DQUNELG1FQUFtRTtvQ0FDbkUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQ0FDN0MsT0FBTyxNQUFNLElBQUksS0FBSyxDQUFDO29DQUN2QiwyQkFBMkI7Z0NBQy9CLENBQUM7NkJBQ0osQ0FBQzs0QkFDRixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dDQUN2QixPQUFPLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsMERBQTBEO2dDQUM1Ryw0RkFBNEY7Z0NBQzVGLGtCQUFrQjtnQ0FDbEIsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO29DQUNyQix5SEFBeUg7b0NBQ3pILElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLDhEQUFxRCxFQUFFLENBQUM7d0NBQUMsT0FBTyxJQUFJLENBQUM7b0NBQUMsQ0FBQyxDQUFDLDRCQUE0QjtvQ0FDaEksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3Q0FBQyxPQUFPLElBQUksQ0FBQztvQ0FBQyxDQUFDO29DQUMzRCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFBO29DQUM5RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ3RDLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3Q0FDcEQsT0FBTyxJQUFJLENBQUM7b0NBQ2hCLENBQUM7b0NBQ0Qsa0ZBQWtGO29DQUNsRixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ3pELE9BQU8sS0FBSyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQ0FDdEQseURBQXlEO2dDQUM3RCxDQUFDOzZCQUNKLENBQUM7eUJBQ0w7cUJBQ0osQ0FBQzt5QkFDRCxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLDRCQUE0QixFQUFFLENBQUMsQ0FBQyw4QkFBOEI7d0JBQ3RILDJCQUEyQjt5QkFDMUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG1FQUFtRTt5QkFDM0YsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVTtxQkFDNUIsQ0FBQzt3QkFDRixzQkFBc0I7eUJBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywwREFBMEQ7eUJBQ2xGLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxXQUFXO3dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsbUNBQW1DOzRCQUNuQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDekQsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0NBQ1osZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3RDLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNsRSxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQzt3QkFDRixzQkFBc0I7eUJBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx1REFBdUQ7eUJBQy9FLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxXQUFXO3FCQUNwQixDQUFDO3dCQUNGLDJCQUEyQjt5QkFDMUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdEQUFnRDt5QkFDeEUsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLDhDQUFxQyxJQUFJLE9BQU8saURBQXdDLElBQUksT0FBTyw4Q0FBcUM7NEJBQ3hKLE9BQU8sd0RBQStDOzRCQUN0RCxDQUFDLE9BQU8sNkNBQXFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTywwREFBK0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sMERBQStDLENBQUMsQ0FBQyxDQUFDOytCQUMzTCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNuRyxDQUFDLENBQUE7b0JBRU4sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUVELG1CQUFtQjtnQkFDWCxTQUFTO29CQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUMvQixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzlELFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDbkMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxLQUFLLEdBQWEsRUFBRSxDQUFDO29CQUN6QixJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7d0JBQzVELEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxnR0FBZ0c7b0JBQ2pJLENBQUM7b0JBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO3dCQUM1RCxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUdBQWlHO29CQUNsSSxDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLDhEQUFxRCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7d0JBQzdJLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxpR0FBaUc7b0JBQ2xJLENBQUM7b0JBQ0QsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDO3dCQUMzRCxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsNEZBQTRGO29CQUM3SCxDQUFDO29CQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ2hHLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQztvQkFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRU8sV0FBVyxDQUFDLFNBQWM7b0JBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNyQixJQUFJLElBQUksS0FBSyxZQUFZLEVBQUUsQ0FBQzs0QkFDeEIsbUJBQW1COzRCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7YUFDSixDQUFBO1lBamFZLFlBQVk7Z0JBRHhCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsWUFBWSxDQWlheEI7WUFqYVksc0JBQVksZUFpYXhCLENBQUE7UUFDTCxDQUFDLEVBL2FvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErYTdCO0lBQUQsQ0FBQyxFQS9hZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK2FuQjtBQUFELENBQUMsRUEvYVMsTUFBTSxLQUFOLE1BQU0sUUErYWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbE1ha2VDb3B5LnRzICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHZ5dHZvxZllbsOtIGtvcGllIGRva2xhZHUgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMi0xMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxNYWtlQ29weURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICAvKiogQ2Vsa292w70gcmVjb3JkIC0gZG9rbGFkICsgcMWZw61wYWQgKi9cclxuICAgICAgICBzbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sTWFrZUNvcHlEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgLyoqIEl4cCBub3bDqWhvIGRva2xhZHUgdnl0dm/FmWVuw6lobyBrb3Bpw60gKi9cclxuICAgICAgICBpeHA/OiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udGVudCBwcm8gdnl0dm/FmWVuw60ga29waWUgZG9rbGFkdSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sTWFrZUNvcHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBDZWxrb3bDvSByZWNvcmQgLSBkb2tsYWQgKyBwxZnDrXBhZCAqL1xyXG4gICAgICAgIHB1YmxpYyBzbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvO1xyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogR2xvYmFsbsOtIHByb23Em25uw6kgU01MICovXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzOiBJbnRlcmZhY2UuR1NtbEdsb2JhbHNEdG87XHJcbiAgICAgICAgLyoqIERvZGF0ZcSNbsOpIGluZm9ybWFjZSBvIGtuaXplIGRva2xhZHUqL1xyXG4gICAgICAgIHByaXZhdGUgZWtvc2RlbjogR29yZGljLkVrby5JbnRlcmZhY2UuR0Vrb3NkZW5EdG87XHJcbiAgICAgICAgLyoqIERCIHBhcmFtIC0gWnDFr3NvYiBkZWZpbmljZSBhZ2VuZG92w71jaCDEjcOtc2VsIGRva2xhZMWvKi9cclxuICAgICAgICBwcml2YXRlIHNtbF9kZWZfYWNzbWw6IHN0cmluZztcclxuICAgICAgICAvKiogREIgcGFyYW0gLSBBdXRvbWF0aWNrw6kgZ2VuZXJvdsOhbsOtIGlkZW50aWZpa8OhdG9ydSovXHJcbiAgICAgICAgcHJpdmF0ZSBnaW5fZ2VuX2l4cDogc3RyaW5nO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBpeHNfcmVmOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpY286IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHVjczogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHNfZnVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHBfZGVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBkb2tUeXBOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiByb3psacWhZW7DrSBkb2tsYWR1IHMgZmluLiBwcm9maWxlbSovXHJcbiAgICAgICAgcHJpdmF0ZSBub19maW5fZG9rOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBGb3JtdWzDocWZKi9cclxuICAgICAgICBwcml2YXRlICRmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgLy9yb3psacWhZW7DrSBkb2tsYWR1IHMgZmluLiBwcm9maWxlbVxyXG4gICAgICAgICAgICB0aGlzLm5vX2Zpbl9kb2sgPSB0aGlzLnNtbHBpZC5rdGdfdHlwID09IEludGVyZmFjZS5LYXRlZ29yaWVUeXB1U21sdXYubmdfa3RndHlwS0RTTm9Fa28gfHwgdGhpcy5zbWxwaWQua3RnX3R5cCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllVHlwdVNtbHV2Lm5nX2t0Z3R5cEtPU05vRWtvXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnNtbHBpZC5rdGdfdHlwID09IEludGVyZmFjZS5LYXRlZ29yaWVUeXB1U21sdXYubmdfa3RndHlwS0RTT2JqTm9Fa28gfHwgdGhpcy5zbWxwaWQua3RnX3R5cCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllVHlwdVNtbHV2Lm5nX2t0Z3R5cEtPU09iak5vRWtvO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHtcclxuICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoaXMuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgIHJva19vYmQ6IHRoaXMuZWtvc2Rlbi5yb2ssXHJcbiAgICAgICAgICAgICAgICBkYXRfdXphdnJlbmk6IHRoaXMuc21scGlkLmRhdF91emF2cmVuaSxcclxuICAgICAgICAgICAgICAgIGRhdF9wbGF0bm9zdDogdGhpcy5zbWxwaWQuZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgZGF0X3VjaW5ub3N0OiB0aGlzLnNtbHBpZC5kYXRfdWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBmaW5fb2Q6ICghdGhpcy5ub19maW5fZG9rKSA/IHRoaXMuc21scGlkLmZpbl9vZCA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgIGZpbl9kbzogKCF0aGlzLm5vX2Zpbl9kb2spID8gdGhpcy5zbWxwaWQuZmluX2RvIDogdm9pZCAwLFxyXG4gICAgICAgICAgICB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNiX3BvbF9mcFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhKHRoaXMuZWtvc2Rlbi5yb2sgPT0gdGhpcy5yb2sgJiYgIXRoaXMubm9fZmluX2RvaykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RPazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5hY3RPa0Z1bmMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdFpydXNpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBrdGdfZGVuX2ZpbHRyO1xyXG4gICAgICAgICAgICAvL2tuaWhvdSAtIHBvdm9sw61tIHRlZHkgcG91emUgcMWZZWV2aWRvdmF0IGRvIGtuaWh5IHN0ZWpuw6kga2F0ZWdvcmllXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC5rdGdfZGVuID09IEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2RlblNNTCB8fCB0aGlzLnNtbHBpZC5rdGdfZGVuID09IEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2RlblNNTE5vRWtvKSB7XHJcbiAgICAgICAgICAgICAgICBrdGdfZGVuX2ZpbHRyID0gW3RoaXMuc21scGlkLmt0Z19kZW4sIEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2RlbktEUywgSW50ZXJmYWNlLkthdGVnb3JpZUtuaWgubmdfa3RnZGVuS09TXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNtbHBpZC5rdGdfZGVuID09IEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2Rlbk9CSiB8fCB0aGlzLnNtbHBpZC5rdGdfZGVuID09IEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2Rlbk9CSk5vRWtvKSB7XHJcbiAgICAgICAgICAgICAgICBrdGdfZGVuX2ZpbHRyID0gW3RoaXMuc21scGlkLmt0Z19kZW4sIEludGVyZmFjZS5LYXRlZ29yaWVLbmloLm5nX2t0Z2RlbktEU09iaiwgSW50ZXJmYWNlLkthdGVnb3JpZUtuaWgubmdfa3RnZGVuS09TT2JqXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGt0Z19kZW5fZmlsdHIgPSB0aGlzLnNtbHBpZC5rdGdfZGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cF9kb2sgPSB0aGlzLnNtbHBpZC50eXBfZG9rO1xyXG4gICAgICAgICAgICAvL2RlZmF1bHQgamUgcHJvIG9iamVkbsOhdmt1XHJcbiAgICAgICAgICAgIHZhciBsYmxfZGF0X3V6YXZyZW5pID0gXCJqcmVzOjMzNjAwNTMxXCI7IC8vUkMgMzM2MDA1MzEgOiBEYXR1bSB2eXN0YXZlbsOtXHJcbiAgICAgICAgICAgIHZhciBsYmxfZGF0X3BsYXRub3N0ID0gXCJqcmVzOjMzNjAwNTMyXCI7IC8vUkMgMzM2MDA1MzIgOiBUZXJtw61uXHJcbiAgICAgICAgICAgIC8vMzkwLjEgMjkuMDkuMjIgem9obGVkbsSbbiBkb2RhdGVrIG9iamVkbsOhdmt5IHBvbW9jw60gZG9kX29ialxyXG4gICAgICAgICAgICBpZiAodHlwX2RvayA9PSBJbnRlcmZhY2UuVHlwRG9rbGFkdS5uZ190eXBkb2tTbWwgfHwgdHlwX2RvayA9PSBJbnRlcmZhY2UuVHlwRG9rbGFkdS5uZ190eXBkb2tMaW0gfHxcclxuICAgICAgICAgICAgICAgICh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva1NtbEFjYyAmJiB0aGlzLnNtbHBpZC5kb2Rfb2JqID09IDApIHx8XHJcbiAgICAgICAgICAgICAgICB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0luZCB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0ppbnlQcmlqZW1MaW0gfHxcclxuICAgICAgICAgICAgICAgIHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rSmlueVByaWplbUluZCkge1xyXG4gICAgICAgICAgICAgICAgbGJsX2RhdF9wbGF0bm9zdCA9IFwianJlczozMzYwMDUzNVwiOyAvL1JDIDMzNjAwNTM1IDogRGF0dW0ga29uY2UgcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwX2RvayA9PSBJbnRlcmZhY2UuVHlwRG9rbGFkdS5uZ190eXBkb2tTbWwgfHwgdHlwX2RvayA9PSBJbnRlcmZhY2UuVHlwRG9rbGFkdS5uZ190eXBkb2tTbWxBY2MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYmxfZGF0X3V6YXZyZW5pID0gXCJqcmVzOjMzNjAwNTA2XCI7IC8vUkMgMzM2MDA1MDYgOiBEYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxibF9kYXRfdXphdnJlbmkgPSBcImpyZXM6MzM2MDA1MzFcIjsgLy9SQyAzMzYwMDUzMSA6IERhdHVtIHZ5c3RhdmVuw61cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1NYWtlQ29weVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcImpyZXM6MzM2MDA1MzNcIi8qLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtOC00LTBcIiovIH0pIC8vUkMgMzM2MDA1MzMgOiDDmmRhamUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MzRcIikgLy9SQyAzMzYwMDUzNCA6IEtuaWhhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zZGVuQWxsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pY286IHRoaXMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoaXMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHsgbzogXCI+PVwiLCB2OiB0aGlzLnJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfZGVuOiBrdGdfZGVuX2ZpbHRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuOiB0aGlzLml4c19mdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9rX2RiZF9maWVsZCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcInJva19vYmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldlJvayA9IHJva19kYmRfZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZGJkX2ZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGN0eC52YWx1ZS5yb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zNzYuNiAyOC4xMi4xNSBwxZllZHBsbsOtIHNlIGkgcm9reSBmaW5hbmNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoXCJmaW5fb2RcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY3R4LnZhbHVlLnJvayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoXCJmaW5fZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY3R4LnZhbHVlLnJvayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2JfcG9sX2ZwID0gdGhpcy4kZm9ybS5maW5kRmllbGRzKFwiY2JfcG9sX2ZwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZS5yb2sgIT0gcHJldlJvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va2R5xb4gc2Ugbm92w6Ega25paGEgbmVyb3Zuw6EgcMWZZWRjaG96w61tdSBwxZllZG5hc3RhdmVuw6ltdSByb2t1LCB0YWvFvmUgdnltYcW+dSBob2Rub3R5IGRhdHVtxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoXCJkYXRfdXphdnJlbmksIGRhdF9wbGF0bm9zdCwgZGF0X3VjaW5ub3N0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlLnJvayAhPSB0aGlzLnJvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiX3BvbF9mcC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2JfcG9sX2ZwLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYl9wb2xfZnAuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdGhpcy5ub19maW5fZG9rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUzNlwiKSAvL1JDIDMzNjAwNTM2IDogT2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tfb2JkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucm9rX29iZD0+dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTM3XCIpIC8vUkMgMzM2MDA1MzcgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxfZGVmX2Fjc21sICE9IFwibWFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogKHRoaXMuc21sX2RlZl9hY3NtbCA9PSBcIm1hblwiKSA/ICdyZXF1aXJlZCcgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogKHRoaXMuc21sX2RlZl9hY3NtbCA9PSBcIm1hblwiKSA/IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gOiB2b2lkIDAsIC8va29udHJvbGEgZHVwbGljaXR5IGHFviBuYSBzZXJ2ZXJ1IChDaGVja0R1cGxBYylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KGxibF9kYXRfdXphdnJlbmkpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdXphdnJlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzM0My4xIDAyLjA1LjAyIC0gcMWZZWRuYXN0YXbDrW0gZGF0dW0gw7rEjWlubm9zdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eD8udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdWNpbm5vc3QgPSAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwiZGF0X3VjaW5ub3N0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXRudSBob2Rub3R1IHBvdXplIHBva3VkIGplIHBvbGUgcHLDoXpkbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdF91Y2lubm9zdC5nZmllbGQoXCJnZXRWYWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF91Y2lubm9zdC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3cobGJsX2RhdF9wbGF0bm9zdClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbGF0bm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbHBpZC50eXBfcGxhdG5vc3QgIT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSwgLy/FmcOtemVuw60gbmEgesOha2xhZMSbIHR5cCBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDUwOFwiLCAvL1JDIDMzNjAwNTA4IDogRGF0dW0gcGxhdG5vc3RpIHNtbG91dnkgamUgbWVuxaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChzcmMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcm8gZG9idSB1csSNaXRvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC50eXBfcGxhdG5vc3QgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bva3VkIGplIG7Em2t0ZXLDvSBudWxvdsO9LCB2cmFjw61tIE9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUgfHwgIWRhdF91emF2cmVuaSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3V6YXZyZW5pID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA1MDlcIiwgLy9SQyAzMzYwMDUwOSA6IFJvayBwbGF0bm9zdGkgc21sb3V2eSBuZXNvdWhsYXPDrSBzIHJva2VtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChzcmMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wcm8gZG9idSB1csSNaXRvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC50eXBfcGxhdG5vc3QgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bva3VkIGplIG7Em2t0ZXLDvSBudWxvdsO9LCB2cmFjw61tIE9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUgfHwgIWRhdF91emF2cmVuaSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEYXRlKHZhbHVlKS5nZXRGdWxsWWVhcigpICE9IHBhcnNlRGF0ZShkYXRfdXphdnJlbmkpLmdldEZ1bGxZZWFyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MTBcIikgLy9SQyAzMzYwMDUxMCA6IERhdHVtIMO6xI1pbm5vc3RpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWNpbm5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAncmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDUxMVwiLCAvL1JDIDMzNjAwNTExIDogRGF0dW0gw7rEjWlubm9zdGkgbmVzbcOtIGLDvXQgbmnFvsWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtIHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChzcmMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uaWtkeSBuZXNtw60gYsO9dCBuacW+xaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IGRhdF91emF2cmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgZGZEYXRVY2lubm9zdC5fcHV0KCBkZkRhdFV6YXZyZW5pLl9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNTEyXCIsIC8vUkMgMzM2MDA1MTIgOiBEYXR1bSDDusSNaW5ub3N0aSBuZXNtw60gYsO9dCB2ecWhxaHDrSBuZcW+IGRhdHVtIHBsYXRub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoc3JjKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJvIGRvYnUgdXLEjWl0b3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxwaWQudHlwX3BsYXRub3N0ID09IEludGVyZmFjZS5UeXBQbGF0bm9zdFNtbG91dnkubmdfdHlwcGxhdG5vc3RVcmNpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9wbGF0bm9zdCA9IGZvcm0uZmluZEZpZWxkcyhcImRhdF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gZGF0X3BsYXRub3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgZGZEYXRVY2lubm9zdC5fcHV0KCBkZkRhdFBsYXRub3N0Ll9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUzOFwiKSAvL1JDIDMzNjAwNTM4IDogT2Jkb2LDrSBmaW5hbmNvdsOhbsOtIG9kLCBkb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaW5fb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5ub19maW5fZG9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6ICghdGhpcy5ub19maW5fZG9rKSA/IFwicmVxdWlyZWRcIiA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMTkzMCwgbWF4OiAyOTkwIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA1MzlcIiwgLy9SQyAzMzYwMDUzOSA6IERvYmEgZmluYW5jb3bDoW7DrSBuZW3Fr8W+ZSBrbGVzbm91dCBwb2QgemHEjcOhdGVrIMO6xI1pbm5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzcmMpLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF91Y2lubm9zdF9maWVsZCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImRhdF91Y2lubm9zdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF91Y2lubm9zdF9maWVsZC5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3VjaW5ub3N0X2ZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM2OC44IDEwLjA4LjEyIHBybyBMUCBtdXPDrSBiw710IG9iZG9iw60gZmluYW5jb3bDoW7DrSBwb3V6ZSBqZWRlbiByb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3VjaW5ub3N0ID0gZGF0X3VjaW5ub3N0X2ZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSBwYXJzZURhdGUoZGF0X3VjaW5ub3N0KS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2Zpbl9vZCA9ICBTYWxEYXRlWWVhciggZGZfZGF0X3VjaW5ub3N0Ll9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNTQxXCIuZm9ybWF0KHRoaXMuZG9rVHlwTmFtZSksIC8vUkMgMzM2MDA1NDEgOiBEb2JhIGZpbmFuY292w6Fuw60gamUgdnnFocWhw60gbmXFviBwbGF0bm9zdCB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3JUeXBlOiBcIndhcm5pbmdcIiwgLy92IFRLIHNpY2UgamFrbyBpbmZvLCBhbGUgc3Rlam7EmyB6bcSbbsOtIGhvZG5vdHUgYSBuZWRvdm9sw60gbXUgdWxvxb5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdG9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bva3VkIGplIGppxb4gemFkw6FuYSBkb2JhIHBsYXRub3N0aSBhIHR5cCBwbGF0bm9zdGkgamUgbmFkb2J1IHVyxI1pdG91IC0ga29udHJvbHVqdSwgemRhIGZpbl9kbyBuZXDFmWVzw6FobG8gZG9idSBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxwaWQudHlwX3BsYXRub3N0ICE9IEludGVyZmFjZS5UeXBQbGF0bm9zdFNtbG91dnkubmdfdHlwcGxhdG5vc3RVcmNpdGEpIHsgcmV0dXJuIHRydWU7IH0gLy9rb250cm9sYSBwb3V6ZSBwcm8gdXLEjWl0b3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzcmMpLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9wbGF0bm9zdF9maWVsZCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImRhdF9wbGF0bm9zdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9wbGF0bm9zdF9maWVsZC5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3BsYXRub3N0X2ZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM0Ny4xIDAzLjA3LjAzIHBldm7DoSBrb250cm9sYSBmaW5hbmNvdsOhbsOtIHptxJtuxJtuYSBuYSB2YXJvdsOhbsOtIC0gVlVMIEdPUkRQMDAxWU5DSFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfcGxhdG5vc3QgPSBkYXRfcGxhdG5vc3RfZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIDw9IHBhcnNlRGF0ZShkYXRfcGxhdG5vc3QpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgZGZfZmluX29kID0gIFNhbERhdGVZZWFyKCBkZl9kYXRfdWNpbm5vc3QuX2dldCggKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubm9fZmluX2RvayxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiAoIXRoaXMubm9fZmluX2RvaykgPyBcInJlcXVpcmVkXCIgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDE5MzAsIG1heDogMjk5MCB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNTQwXCIsIC8vUkMgMzM2MDA1NDAgOiBMaW1pdG92YW7DvSBwxZnDrXNsaWIgamUgbW/Fvm7DqSBmaW5hbmNvdmF0IHBvdXplIHYgamVkbm9tIHJvY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC5rdGdfc21sICE9IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbExpbVByaXNsaWIpIHsgcmV0dXJuIHRydWUgfSAvL2tvbnRyb2xhIHBvdXplIHBybyBsaW1pdG92YW7DvSBwxZnDrXNsaWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzcmMpLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbl9vZF9maWVsZCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImZpbl9vZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbl9vZF9maWVsZC5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluX29kX2ZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM2OC44IDEwLjA4LjEyIHBybyBMUCBtdXPDrSBiw710IG9iZG9iw60gZmluYW5jb3bDoW7DrSBwb3V6ZSBqZWRlbiByb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluX29kID0gZmluX29kX2ZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5fb2QgPT0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgZGZfZmluX2RvID0gZGZfZmluX29kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA1NDFcIi5mb3JtYXQodGhpcy5kb2tUeXBOYW1lKSwgLy9SQyAzMzYwMDU0MSA6IERvYmEgZmluYW5jb3bDoW7DrSBqZSB2ecWhxaHDrSBuZcW+IHBsYXRub3N0IHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lcnJvclR5cGU6IFwid2FybmluZ1wiLCAvL3YgVEsgc2ljZSBqYWtvIGluZm8sIGFsZSBzdGVqbsSbIHptxJtuw60gaG9kbm90dSBhIG5lZG92b2zDrSBtdSB1bG/Fvml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0b3BwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9rdWQgamUgamnFviB6YWTDoW5hIGRvYmEgcGxhdG5vc3RpIGEgdHlwIHBsYXRub3N0aSBqZSBuYWRvYnUgdXLEjWl0b3UgLSBrb250cm9sdWp1LCB6ZGEgZmluX2RvIG5lcMWZZXPDoWhsbyBkb2J1IHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbHBpZC50eXBfcGxhdG5vc3QgIT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkgeyByZXR1cm4gdHJ1ZTsgfSAvL2tvbnRyb2xhIHBvdXplIHBybyB1csSNaXRvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3BsYXRub3N0X2ZpZWxkID0gdGhpcy4kZm9ybS5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3BsYXRub3N0X2ZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRfcGxhdG5vc3RfZmllbGQuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzQ3LjEgMDMuMDcuMDMgcGV2bsOhIGtvbnRyb2xhIGZpbmFuY292w6Fuw60gem3Em27Em25hIG5hIHZhcm92w6Fuw60gLSBWVUwgR09SRFAwMDFZTkNIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9wbGF0bm9zdCA9IGRhdF9wbGF0bm9zdF9maWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPD0gcGFyc2VEYXRlKGRhdF9wbGF0bm9zdCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBkZl9maW5fb2QgPSAgU2FsRGF0ZVllYXIoIGRmX2RhdF91Y2lubm9zdC5fZ2V0KCApIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMzNjAwNTQyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0xMS0xLTAgTS0xMS0xLTAgUy0xMS0xLTBcIiB9KSAvL1JDIDMzNjAwNTQyIDogw5pkYWplIG9kdm96ZW7DqVxyXG4gICAgICAgICAgICAgICAgLy92eXR2b8WZZW7DrSByb3pwaXN1IG5hIHJva3lcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTQzXCIpIC8vUkMgMzM2MDA1NDMgOiBWeXR2b8WZaXQgbnVsb3bDqSB6w6F6bmFteSByb3pwaXN1IG5hIMSNw6FzdGt5IG5hIG9iZG9iw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYl9yb3pwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5ub19maW5fZG9rXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy92eXR2b8WZZW7DrSBwb2xvxb5layBmcFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1NDRcIikgLy9SQyAzMzYwMDU0NCA6IFZ5dHZvxZlpdCBudWxvdsOpIHBvbG/Fvmt5IGZpbmFuxI1uw61obyBwcm9maWx1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2JfcG9sX2ZwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubm9fZmluX2RvayxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluYW7EjW7DrSBwcm9maWwgbmVsemUgYmV6IHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNiX3JvenBpc19maWVsZCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNiX3JvenBpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Jfcm96cGlzX2ZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Jfcm96cGlzX2ZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYl9yb3pwaXNfZmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdGhpcy5ub19maW5fZG9rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL3Z5dHZvxZllbsOtIHBvbG/FvmVrIHZwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU0NVwiKSAvL1JDIDMzNjAwNTQ1IDogVnl0dm/FmWl0IG51bG92w6kgcG9sb8W+a3kgdsSbY27DqWhvIHByb2ZpbHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYl9wb2xfdnBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vdmF6YmEgbmEgbmFkxZlhemVuw70gcMWZw61wYWRcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTQ2XCIpIC8vUkMgMzM2MDA1NDYgOiBWeXR2b8WZaXQgdmF6YnUgbmEgcMWvdm9kbsOtIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2JfYm5kX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhKCh0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva09iaiB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva1NtbEFjYyB8fCB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0xpbSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfZG9rID09IEludGVyZmFjZS5UeXBEb2tsYWR1Lm5nX3R5cGRva0ppbnlQcmlqZW1MaW0gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cF9kb2sgPT0gSW50ZXJmYWNlLlR5cERva2xhZHUubmdfdHlwZG9rU21sICYmICEodGhpcy5zbWxwaWQua3RnX3R5cCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllVHlwdVNtbHV2Lm5nX2t0Z3R5cEtEU1JTIHx8IHRoaXMuc21scGlkLmt0Z190eXAgPT0gSW50ZXJmYWNlLkthdGVnb3JpZVR5cHVTbWx1di5uZ19rdGd0eXBLT1NSUykpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoKHRoaXMuc21scGlkLml4cF9zbWw/LnRyaW0oKT8/XCJcIi5sZW5ndGggPiAwKSAmJiB0aGlzLnNtbHBpZC5peHBfc21sICE9IHRoaXMuc21scGlkLml4cCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQWtjZSB1bG/FvmVuw60gKi9cclxuICAgICAgICBwcml2YXRlIGFjdE9rRnVuYygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1vZGVsRGF0YTogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICBtb2RlbERhdGFbXCJpeHBcIl0gPSB0aGlzLnNtbHBpZC5peHA7XHJcbiAgICAgICAgICAgIG1vZGVsRGF0YVtcInpwdXNvYkdlbmVyb3ZhbmlcIl0gPSBwYXJzZUludChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGlzLCB0aGlzLmdpbl9nZW5faXhwKSk7XHJcbiAgICAgICAgICAgIHZhciByb2tfb2JkID0gdGhpcy4kZm9ybS5maW5kRmllbGRzKFwicm9rX29iZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHRleHRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VEYXRlKG1vZGVsRGF0YS5kYXRfdXphdnJlbmkpLmdldEZ1bGxZZWFyKCkgPCByb2tfb2JkKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0cy5wdXNoKFwianJlczozMzYwMDU0N1wiKTsgLy9SQyAzMzYwMDU0NyA6IE9wcmF2ZHUgcG/FvmFkdWpldGUgcG9uZWNoYXQgZGF0dW0gdXphdsWZZW7DrSBzIHJva2VtIG5pxb7FocOtbSwgbmXFviBtw6EgenZvbGVuw6Ega25paGE/XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcnNlRGF0ZShtb2RlbERhdGEuZGF0X3VjaW5ub3N0KS5nZXRGdWxsWWVhcigpIDwgcm9rX29iZCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHMucHVzaChcImpyZXM6MzM2MDA1NDhcIik7IC8vUkMgMzM2MDA1NDggOiBPcHJhdmR1IHBvxb5hZHVqZXRlIHBvbmVjaGF0IGRhdHVtIMO6xI1pbm5vc3RpIHMgcm9rZW0gbmnFvsWhw61tLCBuZcW+IG3DoSB6dm9sZW7DoSBrbmloYT9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zbWxwaWQudHlwX3BsYXRub3N0ID09IEludGVyZmFjZS5UeXBQbGF0bm9zdFNtbG91dnkubmdfdHlwcGxhdG5vc3RVcmNpdGEgJiYgcGFyc2VEYXRlKG1vZGVsRGF0YS5kYXRfcGxhdG5vc3QpLmdldEZ1bGxZZWFyKCkgPCByb2tfb2JkKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0cy5wdXNoKFwianJlczozMzYwMDU0OVwiKTsgLy9SQyAzMzYwMDU0OSA6IE9wcmF2ZHUgcG/FvmFkdWpldGUgcG9uZWNoYXQgZGF0dW0gcGxhdG5vc3RpIHMgcm9rZW0gbmnFvsWhw61tLCBuZcW+IG3DoSB6dm9sZW7DoSBrbmloYT9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW9kZWxEYXRhLmZpbl9vZCA8IHJva19vYmQgfHwgbW9kZWxEYXRhLmZpbl9kbyA8IHJva19vYmQpIHtcclxuICAgICAgICAgICAgICAgIHRleHRzLnB1c2goXCJqcmVzOjMzNjAwNTUwXCIpOyAvL1JDIDMzNjAwNTUwIDogT3ByYXZkdSBwb8W+YWR1amV0ZSBwb25lY2hhdCBmaW5hbmNvdsOhbsOtIHYgcm9jZSBuacW+xaHDrW0sIG5lxb4gbcOhIHp2b2xlbsOhIGtuaWhhP1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGV4dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMzYwMDU1MVwiLCB0ZXh0cy5qb2luKCdcXG4nKSkuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKS50aGVuKCgpID0+IHsgLy9SQyAzMzYwMDU1MSA6IFBvdHZyemVuw61cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlQ29weUlzbChtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlQ29weUlzbChtb2RlbERhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtYWtlQ29weUlzbChtb2RlbERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21sTWFrZUNvcHkubWFrZUNvcHkobW9kZWxEYXRhKS5nZXREYXRhKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKHsgaXhwOiByZXMuaXhwIH0pO1xyXG4gICAgICAgICAgICB9KS5mYWlsKCh4aHIsIHR5cGUsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIG8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==