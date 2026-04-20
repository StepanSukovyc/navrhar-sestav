"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPlatebKalPoh.ts                    </Name>
//    <Description> Platební kalendář odběratelských dokladů - detail pohledávky </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-14                                                  </Created>
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
            /** Platební kalendář odběratelských dokladů - detail pohledávky */
            let GSmlPlatebKalPoh = class GSmlPlatebKalPoh extends Gordic.GContentBase {
                closing() {
                    return this.changed;
                }
                onContentReady() {
                    this.sum_c_mena = new Decimal(0);
                    this.createActions();
                    //this.createMenuBar();
                    this.createCommandBar();
                    this.createMainForm();
                    this.createTab();
                    this.$formUdaje.findFields().gfield("model", "apply", this.smlskal, { initialValues: true });
                    this.$formUdaje.findFields().gfield("model", "apply", this.smlgen, { initialValues: true });
                    if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                        this.createRozpisForm(this.$tab);
                        this.$formRozpis.findFields().gfield("model", "apply", this.smlskal, { initialValues: true });
                        this.$formRozpis.findFields().gfield("model", "apply", this.smlgen, { initialValues: true });
                    }
                    else if (this.smlgen.typ_gen == 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */) {
                        this.createRozpisGrid(this.$tab);
                        this.actions.actNovyPredpis?.visible(true);
                    }
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            run: function (ev, ctx) {
                                //this.setPending(that.isl.Smlskal.createNewDefaultDto({ ixp: that.smlpid.ixp! }).getData().done((newDto) => {
                                //    newDto.c = that.$gridRozpis.ggrid("getView").getDataRows().find((el, idx, arr) => { return el.rok == that.rok }).c_rozdil;
                                //    that.$grid.ggridroweditor("addRow", newDto);
                                //}))
                            }
                        }),
                        actNovyPredpis: Gordic.Eko.Action.actionNovy({
                            caption: "jres:33600192", //RC 33600192 : Nový předpis
                            enabled: false,
                            visible: false,
                            run: function (ev, ctx) {
                                this.setPending(that.isl.Smlskal.createPredpisPohNewDefaultDto({ ixp: that.smlskal.ixp, cis_platby: that.smlskal.cis_platby, ixp_sml_pri: that.smlskal.ixp_sml_pri }).getData().done((newDto) => {
                                    that.$gridRozpis.ggridroweditor("addRow", newDto);
                                }));
                            }
                        }),
                        actUlozit: Gordic.Eko.Action.actionUlozit({
                            permission: this.smlskal.Permissions?.LzeEditovat,
                            run: function (ev, ctx) {
                                this.setPending(that.save());
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actNovy*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actUlozit!", "actZavrit"]));
                }
                /** Vytvoření hlavního formuláře se základními údaji*/
                createMainForm() {
                    var c_mena_error_msg = "";
                    var form = new Gordic.Forms.Form({
                        name: "formUdajePohledavky",
                        layoutDescriptor: "L2M2S1"
                    })
                        .addSection("Údaje pohledávky")
                        .addRow("jres:33600193") //RC 33600193 : Popis
                        .addField("gstringbox", {
                        name: "popis" /* Interface.GSmlskalDtoNames.popis */
                    })
                        .addRow("jres:33600194") //RC 33600194 : Odběratel
                        .addField("gselectbox", Gordic.Prefabs.Select.smlKalIxsEsuSml(), {
                        name: "ixs_esu" /* Interface.GSmlskalDtoNames.ixs_esu */,
                        model: "model.ixs_esu=value.ixs_esu;model.ixp_sml_pri=>value.ixp_sml_pri",
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            ixp_sml_pri: this.smlskal.ixp_sml_pri,
                        },
                        //change: (ev, ctx) => {
                        //    if (ctx?.flags?.valid) {
                        //        that.$grid.findFields("bu_ci").gfield("model", "apply", { ixs_esu: ctx.value.ixs_esu, bu_ci: ctx.value.bu_ci, sk_ci: ctx.value.sk_ci });
                        //    }
                        //}
                    })
                        .addRow("jres:33600195") //RC 33600195 : Bankovní účet odběratele
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuci(), {
                        name: "bu_ci" /* Interface.GSmlskalDtoNames.bu_ci */,
                        dropdown: false,
                        model: "model.ixs_esu=>value.ixs_esu;model.bu_ci=value.bu_ci;model.sk_ci=value.sk_ci",
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        serverFilters: {
                            aktivita: 100,
                            ixs_esu: new Gordic.Forms.Dependency("ixs_esu", (val) => {
                                if (val == null) {
                                    return this.smlpid.ixs_esu;
                                }
                                ;
                                return val.ixs_esu;
                            }, false, false, this.$formUdaje),
                        },
                    })
                        .addRow("jres:33600196") //RC 33600196 : Šablona pohledávky
                        .addField("gselectbox", Gordic.Prefabs.Select.smlsste(), {
                        name: "ixs_ste" /* Interface.GSmlskalDtoNames.ixs_ste */,
                        dropdown: false,
                        model: "model.ixs_ste=value.ixs_ste",
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100,
                            typ_phl: (this.globals.submodel_ddp_akt && this.sml_rad_vyd2ddp) ? this.smlpid.typ_phl : undefined
                        },
                        change: (ev, ctx) => {
                            if (ctx.flags?.valid && ctx.value) {
                                //odpojení aktuálního contentu tabu, pokud existuje
                                if (this.smlgen.typ_gen == 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */) {
                                    this.$gridRozpis = this.$gridRozpis.detach();
                                    this.actions.actNovyPredpis?.visible(false);
                                }
                                else if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                                    this.$formRozpis = this.$formRozpis.detach();
                                }
                                this.smlgen = ctx.value;
                                this.$tab.gtab({ title: this.getTabTitle(this.smlgen.typ_gen ?? -1) });
                                if (this.smlgen.typ_gen == 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */) {
                                    if (this.$gridRozpis == void 0) {
                                        this.createRozpisGrid(this.$tab);
                                    }
                                    else {
                                        this.$tab.append(this.$gridRozpis);
                                        this.$gridRozpis.ggrid("getView").requestData();
                                    }
                                    //this.actions.actNovyPredpis?.enabled(false);
                                    this.actions.actNovyPredpis?.visible(true);
                                }
                                else if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                                    if (this.$formRozpis == void 0) {
                                        this.createRozpisForm(this.$tab);
                                    }
                                    else {
                                        this.$tab.append(this.$formRozpis);
                                    }
                                    this.$formRozpis.findFormRows("row_c_predp").gformrow("setLabel", this.getCPredpLabel(this.smlgen.typ_gen, this.smlgen.poc_splatek ?? 0));
                                    this.$formRozpis.findFields().gfield("model", "apply", this.smlskal);
                                    this.$formRozpis.findFields().gfield("model", "apply", this.smlgen);
                                }
                                //pokaždé nastavím data ze šablony do hlavních údajů
                                this.$formUdaje.findFields().gfield("model", "apply", this.smlgen);
                            }
                        }
                    })
                        .addRow("jres:33600197") //RC 33600197 : Typ pohledávky
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp_vl(), {
                        name: "typ_phl",
                        disabled: true,
                        model: "model.typ_phl=>value.typ_phl",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("jres:33600198") //RC 33600198 : Způsob úhrady
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                        name: "zp" /* Interface.GSmlskalDtoNames.zp */,
                        disabled: true,
                        model: "model.zp=>value.zp",
                        defaultValue: { zp: 0 },
                    })
                        .addRow("jres:33600199") //RC 33600199 : Způsob vytvoření předpisů
                        .addField("gselectbox", {
                        name: "typ_gen",
                        model: "model.typ_gen=>value.typ_gen",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        data: new Gordic.Data.View([
                            { typ_gen: -1 /* Interface.TypGenerovaniPredpisu.ng_typgenNone */, typ_gen_txt: "jres:33600200" }, //RC 33600200 : Neurčeno
                            { typ_gen: 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */, typ_gen_txt: "jres:33600201" }, //RC 33600201 : Na základě údajů smlouvy
                            { typ_gen: 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */, typ_gen_txt: "jres:33600202" }, //RC 33600202 : Na základě pravidel stanovených platebním kalendářem smlouvy pro rozpis předpisu
                            { typ_gen: 2 /* Interface.TypGenerovaniPredpisu.ng_typgenPrepocet */, typ_gen_txt: "jres:33600203" }, //RC 33600203 : Na základě pravidel DDP pro daný typ pohledávky
                        ], { key: "typ_gen" }),
                        initialValue: { typ_gen: 0 },
                        itemTemplate: "{typ_gen_txt:trim:encode}",
                        disabled: true,
                        helperColumns: ["typ_gen_txt"],
                        helperItemTemplate: "{typ_gen_txt:trim:encode}",
                    })
                        .addRow("jres:33600204") //RC 33600204 : Počet splátek
                        .addField("gnumberbox", {
                        name: "poc_splatek",
                        model: "model.poc_splatek=>value",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600205") //RC 33600205 : Počátek platnosti
                        .addField("gdatebox", {
                        name: "dat_od" /* Interface.GSmlskalDtoNames.dat_od */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                message: "jres:33600206", //RC 33600206 : Datum počátku platnosti pohledávky musí být větší než datum účinnosti
                                validate: (val, src) => {
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //platba musí být větší než datum uzavření
                                    return !(new Date(parseDate(val).toDateString()) < new Date(parseDate(this.smlpid.dat_ucinnost).toDateString()));
                                    //Call df_dat_od._put( smlpid_p.findoc.dat_ucinnost )
                                    //na serveru poté ještě kontrola vůči zadané částce
                                }
                            }),
                            new Gordic.Validators.Base({
                                errorType: "warning",
                                stopping: false,
                                message: "jres:33600207", //RC 33600207 : Datum počátku platnosti pohledávky je větší než datum platnosti
                                validate: (val, src) => {
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    //342.11 15.11.01 - podmínka doplněna o typ platnosti smlouvy
                                    return !(this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */ && new Date(parseDate(val).toDateString()) > new Date(parseDate(this.smlpid.dat_platnost).toDateString()));
                                    //na serveru poté ještě kontrola vůči zadané částce
                                }
                            })
                        ]
                    })
                        .addRow("jres:33600208") //RC 33600208 : Konec platnosti
                        .addField("gdatebox", {
                        name: "dat_do" /* Interface.GSmlskalDtoNames.dat_do */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        validators: [
                            new Gordic.Validators.Base({
                                message: "jres:33600209", //RC 33600209 : Datum počátku platnosti pohledávky nesmí být větší než datum platnosti
                                validate: (val, src) => {
                                    //pokud je doba určitá, kontroluju platnosti smlouvy
                                    return !(this.smlpid.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */ && new Date(parseDate(val).toDateString()) > new Date(parseDate(this.smlpid.dat_platnost).toDateString()));
                                    //na serveru poté ještě kontrola vůči zadané částce
                                }
                            })
                        ]
                    })
                        .addRow("jres:33600210") //RC 33600210 : Měna
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena",
                        disabled: true,
                        model: "model.mena=>value.mena",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        initialValue: { mena: this.smlpid.mena }
                    })
                        .addRow("jres:33600211" + this.smlpid.mena_zkr) //RC 33600211 : Částka pohledávky v 
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena" /* Interface.GSmlskalDtoNames.c_mena */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [
                            new Gordic.Validators.Range({ min: 0.01 }),
                            new Gordic.Validators.Base({
                                getMessage: (val) => { return c_mena_error_msg; },
                                validate: (val, src) => {
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    val = parseDecimal(val);
                                    //386.3 10.11.20 nutno pracovat s částkou za případ, nikoliv dokladu - smlpid_p.findoc.c_mena
                                    //386.3 02.12.20 vzhledem k tomu, že cena pohledávky je definována absolutně, provede se kontrola pouze vůči případu, nikoliv již zadaných záznamů platebního kalendáře
                                    //vyhozeno:  smlpid_p.finpripad.c_mena < smlkal_p.c_mena_kal + df_c_mena - smlkalbuf.c_mena
                                    if (parseDecimal(this.smlpid.pripad?.c_mena ?? 0).lessThan(val.minus(parseDecimal(this.smlskal.c_mena ?? 0)))) {
                                        c_mena_error_msg = "jres:33600212"; //RC 33600212 : Součet částek požadavků na založení pohledávky nemůže být vyšší než celková částka dokladu
                                        return false;
                                        //Set df_c_mena = smlpid_p.finpripad.c_mena - smlkal_p.c_mena_kal + smlkalbuf.c_mena
                                    }
                                    else {
                                        //v závislosti na typu šablony
                                        if (this.smlgen.typ_gen == 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */) {
                                            //kontrola oproti hodnotám předpisů
                                            if (this.sum_c_mena.greaterThan(val)) {
                                                c_mena_error_msg = "jres:33600213"; //RC 33600213 : Částka pohledávky nemůže být nižší než částky jejích předpisů
                                                return false;
                                                //nastavím minimální nutné
                                                //Set df_c_mena = tbl_predp.sumCMena
                                            }
                                        }
                                        else if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                                            if (parseDecimal(this.$formRozpis.findFields("c_predp").gfield("getValue")).greaterThan(val)) {
                                                c_mena_error_msg = "jres:33600214"; //RC 33600214 : Částka pohledávky nemůže být nižší než částky jejích předpisů
                                                return false;
                                                //nastavím minimální nutné
                                                //Set df_c_mena = df_c_predp
                                            }
                                        }
                                    }
                                    //na serveru poté ještě kontrola vůči zadané částce
                                    return true;
                                }
                            })
                        ],
                        change: (ev, ctx) => {
                            if (ctx.flags?.valid == false) {
                                return;
                            }
                            var c;
                            //je to v CZK
                            if (this.smlpid.mena == 0 /* Interface.TypMeny.ng_menaCZK */) {
                                c = ctx.value;
                            }
                            else { //přepočet na CZK dle typu kurzu
                                if (this.smlpid.typ_kurz == 10 /* Interface.TypKurzu.ng_typkurzPevnySml */ || this.smlpid.typ_kurz == 20 /* Interface.TypKurzu.ng_typkurzPevnySyst */) {
                                    c = (parseDecimal(ctx.value).times(this.smlpid.kurz ?? 1)).dividedBy(this.smlpid.m ?? 1);
                                }
                                else {
                                    //musím si zjistit kurz pro daný rok v SMLSROK
                                    c = (parseDecimal(ctx.value).times(this.smlpid.smlrok?.kurz ?? 1)).dividedBy(this.smlpid.smlrok?.m ?? 1);
                                }
                            }
                            this.$formUdaje.findFields("c").gfield("setValue", c);
                        }
                    })
                        .addRow("jres:33600215") //RC 33600215 : Částka pohledávky v CZK
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c" /* Interface.GSmlskalDtoNames.c */,
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    });
                    this.$formUdaje = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /** Vytvoření tabu s dodatečnými údaji */
                createTab() {
                    this.$tab = $.newDiv().appendTo(this.element).gtab({
                        title: this.getTabTitle(this.smlgen.typ_gen ?? -1),
                        opened: true,
                        menuBar: [{
                                action: this.actions.actNovyPredpis,
                                favorite: true,
                            }]
                    });
                }
                /** Vytvoření dodatečného formuláře u typ_gen = ng_typgenRozpis*/
                createRozpisForm(tab) {
                    var form = new Gordic.Forms.Form({
                        name: "formUdajePohledavky",
                        layoutDescriptor: "L2M2S1"
                    })
                        .addRow("jres:33600216") //RC 33600216 : Kategorie předpisu
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=>value.ktg_upo",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600217") //RC 33600217 : Posun data splatnosti (dny)
                        .addField("gnumberbox", {
                        name: "model.posun_dat_spl=>value",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("jres:33600218") //RC 33600218 : Zaokrouhlení předpisu
                        .addField("gselectbox", {
                        name: "priz_zaok",
                        model: "model.priz_zaok=>value.priz_zaok",
                        data: new Gordic.Data.View([
                            { priz_zaok: 0, priz_zaok_txt: "jres:33600219" }, //RC 33600219 : Bez zaokrouhlení
                            { priz_zaok: 1, priz_zaok_txt: "jres:33600220" }, //RC 33600220 : Na jedno desetinné místo
                            { priz_zaok: 2, priz_zaok_txt: "jres:33600221" }, //RC 33600221 : Na celé koruny
                        ], { key: "priz_zaok" }),
                        itemTemplate: "{priz_zaok_txt}",
                        helperColumns: ["priz_zaok_txt"],
                        helperItemTemplate: "{priz_zaok_txt:trim:encode}",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600226") //RC 33600226 : Perioda
                        .addField("gselectbox", {
                        name: "perioda",
                        model: "model.perioda=>value.perioda",
                        data: new Gordic.Data.View([
                            { perioda: 0, perioda_txt: "jres:33600222" }, //RC 33600222 : Neurčeno
                            { perioda: 10, perioda_txt: "jres:33600223" }, //RC 33600223 : Den
                            { perioda: 20, perioda_txt: "jres:33600224" }, //RC 33600224 : Měsíc
                            { perioda: 30, perioda_txt: "jres:33600225" } //RC 33600225 : Rok
                        ], { key: "perioda" }),
                        itemTemplate: "{perioda_txt}",
                        helperColumns: ["perioda_txt"],
                        helperItemTemplate: "{perioda_txt:trim:encode}",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600227") //RC 33600227 : Interval
                        .addField("gnumberbox", {
                        name: "priz_per",
                        model: "model.priz_per=>value",
                        disabled: true,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ name: "row_c_predp", label: this.getCPredpLabel(this.smlgen.typ_gen ?? -1, this.smlgen.poc_splatek ?? 0) })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_predp",
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Range({ min: 0.01 })]
                    })
                        .addRow("jres:33600228") //RC 33600228 : Datum vzniku prvního předpisu
                        .addField("gdatebox", {
                        name: "dat_vzniku_f" /* Interface.GSmlskalDtoNames.dat_vzniku_f */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600229") //RC 33600229 : Datum splatnosti prvního předpisu
                        .addField("gdatebox", {
                        name: "dat_splatnost_f" /* Interface.GSmlskalDtoNames.dat_splatnost_f */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600230") //RC 33600230 : Datum vzniku posledního předpisu
                        .addField("gdatebox", {
                        name: "dat_vzniku_l" /* Interface.GSmlskalDtoNames.dat_vzniku_l */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600231") //RC 33600231 : Datum splatnosti posledního předpisu
                        .addField("gdatebox", {
                        name: "dat_splatnost_l" /* Interface.GSmlskalDtoNames.dat_splatnost_l */,
                        disabled: this.smlskal.status_platby != 0 /* Interface.StatusPlatby.ng_statusplatbyNone */,
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    });
                    this.$formRozpis = $.newDiv().appendTo(tab).gform("createFrom", form);
                }
                /** Vytvoření dodatečného gridu s předpisy pohledávek */
                createRozpisGrid(tab) {
                    this.$gridRozpis = $.newDiv().appendTo(tab).ggrid({
                        name: "gridPlatebKalRozpis",
                        columnMode: "full",
                        data: new Gordic.Isl.View /*<Gordic.Sml.Interface.GSmldkalDto>*/(this.isl.Smlskal.listPredpisPoh({ ixp: this.smlskal.ixp, rq: { filters: { ixp_sml_pri: this.smlskal.ixp_sml_pri, cis_platby: this.smlskal.cis_platby ?? 0 }, fragments: ["Permissions.*"] } }), {
                            onResponse: (data) => {
                                this.servicePermissionsPredpisPoh = data.servicePermissions;
                                this.actions.actNovyPredpis?.updatePermission({
                                    value: this.servicePermissionsPredpisPoh.LzeNovy.value && !this.$formUdaje.gform("hasChanged"),
                                    message: (!this.servicePermissionsPredpisPoh.LzeNovy.value) ? this.servicePermissionsPredpisPoh.LzeNovy.message : "jres:33600232" //RC 33600232 : Formulář obsahuje neuložené změny
                                });
                                //vynuluji součet za předpisy a napočtu znovu
                                this.sum_c_mena = new Decimal(0);
                                for (var dto of data.data) {
                                    this.sum_c_mena = this.sum_c_mena.plus(parseDecimal(dto.c_mena ?? 0));
                                }
                                return data;
                            },
                            key: ["ixp", "cis_platby", "poradi", "ixp_sml_pri"],
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"], {})
                            }
                        }),
                        columns: this.createRozpisGridFormat(),
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$gridRozpis?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        selection: (ev, obj) => {
                            if ((this.$gridRozpis?.find(".row.editing")?.length ?? 1) > 0) {
                                this.actions.actNovyPredpis?.enabled(false);
                            }
                            else {
                                obj.view.getLoadingPromise().done(() => {
                                    this.actions.actNovyPredpis?.updatePermission({
                                        value: this.servicePermissionsPredpisPoh.LzeNovy.value && !this.$formUdaje.gform("hasChanged"),
                                        message: (!this.servicePermissionsPredpisPoh.LzeNovy.value) ? this.servicePermissionsPredpisPoh.LzeNovy.message : "jres:33600232" //RC 33600232 : Formulář obsahuje neuložené změny
                                    });
                                });
                            }
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            if (!(info?.cellInfo?.data?.Permissions?.LzeEditovat?.value ?? false)) {
                                ev.preventDefault();
                            }
                        },
                        start: (ev, info) => {
                            setTimeout(() => {
                                this.actions.actNovyPredpis?.updatePermission({ value: false });
                            }, 1);
                        },
                        save: (data, obj) => {
                            var saveDto = { ...obj.cellInfo.data, ...data };
                            saveDto.ixp_sml_pri = this.smlskal.ixp_sml_pri;
                            saveDto.ixp_sml = this.smlskal.ixp_sml_pri;
                            if (saveDto.flag_DB) {
                                return this.isl.Smlskal.updatePredpisPoh(saveDto).getData().done(() => {
                                    this.changed = true;
                                    this.$gridRozpis.ggrid("getView").requestData();
                                }).fail((xhr, type, o) => {
                                    if (type === "validation" && this.$gridRozpis) {
                                        o.handled = true;
                                        this.$gridRozpis.findFields().gfield("model", "validations", o);
                                    }
                                });
                            }
                            else {
                                return this.isl.Smlskal.createPredpisPoh(saveDto).getData().done(() => {
                                    this.changed = true;
                                    this.$gridRozpis.ggrid("getView").requestData();
                                }).fail((xhr, type, o) => {
                                    if (type === "validation" && this.$gridRozpis) {
                                        o.handled = true;
                                        this.$gridRozpis.findFields().gfield("model", "validations", o);
                                    }
                                });
                            }
                        }
                    });
                }
                /** Vytvoření gridformátu pro rozpisy pohledávek */
                createRozpisGridFormat() {
                    const that = this;
                    var gf = new Gordic.Data.GridFormat();
                    gf.addNumberColumn({
                        name: "poradi" /* Interface.GSmldkalDtoNames.poradi */,
                        caption: "#",
                        width: 30
                    }).addTextColumn({
                        name: "ktg_upo_txt" /* Interface.GSmldkalDtoNames.ktg_upo_txt */,
                        caption: "jres:33600233", //RC 33600233 : Kategorie předpisu
                        width: 150,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.fuccupo(), {
                                    name: "ktg_upo",
                                    model: "model.ktg_upo=value.ktg_upo",
                                    dropdown: false,
                                    flag: "required",
                                    validators: [new Gordic.Validators.Required()]
                                }]
                        }
                    }).addDateColumn({
                        name: "dat_vznik" /* Interface.GSmldkalDtoNames.dat_vznik */,
                        caption: "jres:33600234", //RC 33600234 : Datum vzniku
                        width: 110,
                        editor: function (info) {
                            var val_error = "";
                            return {
                                widget: "gdatebox",
                                options: [{
                                        name: "dat_vznik" /* Interface.GSmldkalDtoNames.dat_vznik */,
                                        flag: "required",
                                        validators: [
                                            new Gordic.Validators.Required(),
                                            new Gordic.Validators.Base({
                                                errorType: "error",
                                                getMessage: () => { return val_error; },
                                                validate: (val, src) => {
                                                    if ($(src).gfield("getErrors").length > 0) {
                                                        return true;
                                                    }
                                                    //nesmí být nižší než datum počátku platnosti
                                                    if (new Date(parseDate(val).toDateString()) < new Date(parseDate(that.$formUdaje.findFields("dat_od").gfield("getValue")).toDateString())) {
                                                        val_error = "jres:33600235"; //RC 33600235 : Datum vzniku předpisu nesmí být menší než datum počátku platnosti pohledávky
                                                        return false;
                                                        //Call dat_vznik._put( df_dat_od._get( ) )
                                                    }
                                                    //nesmí být vyšší než datum konce platnosti
                                                    if (new Date(parseDate(val).toDateString()) > new Date(parseDate(that.$formUdaje.findFields("dat_do").gfield("getValue")).toDateString())) {
                                                        val_error = "jres:33600236"; //RC 33600236 : Datum vzniku předpisu nesmí být větší než datum konce platnosti pohledávky
                                                        return false;
                                                        //Call dat_vznik._put( df_dat_do._get( ) )
                                                    }
                                                    return true;
                                                }
                                            })
                                        ]
                                    }]
                            };
                        }
                    }).addDateColumn({
                        name: "dat_splatnost" /* Interface.GSmldkalDtoNames.dat_splatnost */,
                        caption: "jres:33600237", //RC 33600237 : Datum splatnosti
                        width: 130,
                        editor: {
                            widget: "gdatebox",
                            options: [{
                                    name: "dat_splatnost" /* Interface.GSmldkalDtoNames.dat_splatnost */,
                                    flag: "required",
                                    validators: [
                                        new Gordic.Validators.Required(),
                                        new Gordic.Validators.Base({
                                            errorType: "error",
                                            message: "jres:33600238", //RC 33600238 : Datum splatnosti předpisu nesmí být menší než datum vzniku předpisu pohledávky
                                            validate: (val, src) => {
                                                if ($(src).gfield("getErrors").length > 0) {
                                                    return true;
                                                }
                                                return !(new Date(parseDate(val).toDateString()) < new Date(parseDate(this.$gridRozpis.findFields("dat_vznik").gfield("getValue")).toDateString()));
                                                //Call dat_splatnost._put( dat_vznik._get( ) )
                                            }
                                        })
                                    ]
                                }]
                        }
                    }).addCurrencyColumn({
                        name: "c_mena" /* Interface.GSmldkalDtoNames.c_mena */,
                        caption: "jres:33600239", //RC 33600239 : Částka předpisu
                        width: 130,
                        editor: function (info) {
                            return {
                                widget: "gnumberbox",
                                options: [Gordic.Prefabs.Number.currency(), {
                                        name: "c_mena" /* Interface.GSmldkalDtoNames.c_mena */,
                                        flag: "required",
                                        validators: [
                                            new Gordic.Validators.Range({ min: 0.01 }),
                                            new Gordic.Validators.Base({
                                                errorType: "error",
                                                message: "jres:33600240", //RC 33600240 : Celková částka předpisů nesmí převýšit částku pohledávky
                                                validate: (val, src) => {
                                                    return !(that.sum_c_mena.minus(parseDecimal(info.cellInfo.data.c_mena)).plus(parseDecimal(val))).greaterThan(parseDecimal(that.$formUdaje.findFields("c_mena").gfield("getValue")));
                                                    //Set c_mena = df_c_mena + predpisakt.c_mena - sumCMena
                                                }
                                            })
                                        ],
                                        change: (ev, ctx) => {
                                            if (!ctx.flags?.valid) {
                                                return;
                                            }
                                            var c;
                                            //je to v CZK
                                            if (that.smlpid.mena == 0 /* Interface.TypMeny.ng_menaCZK */) {
                                                c = ctx.value;
                                            }
                                            else { //přepočet na CZK dle typu kurzu
                                                if (that.smlpid.typ_kurz == 10 /* Interface.TypKurzu.ng_typkurzPevnySml */ || that.smlpid.typ_kurz == 20 /* Interface.TypKurzu.ng_typkurzPevnySyst */) {
                                                    c = (parseDecimal(ctx.value).times(that.smlpid.kurz ?? 1)).dividedBy(that.smlpid.m ?? 1);
                                                }
                                                else {
                                                    //musím si zjistit kurz pro daný rok v SMLSROK
                                                    c = (parseDecimal(ctx.value).times(that.smlpid.smlrok?.kurz ?? 1)).dividedBy(that.smlpid.smlrok?.m ?? 1);
                                                }
                                            }
                                            that.$gridRozpis.findFields("c").gfield("setValue", c);
                                        }
                                    }]
                            };
                        }
                    }).addCurrencyColumn({
                        name: "c" /* Interface.GSmldkalDtoNames.c */,
                        caption: "jres:33600241", //RC 33600241 : Částka předpisu v CZK
                        width: 170,
                        editor: {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c" /* Interface.GSmldkalDtoNames.c */,
                                    disabled: true
                                }]
                        }
                    }).addNumberColumn({
                        name: "rok_sml" /* Interface.GSmldkalDtoNames.rok_sml */,
                        caption: "jres:33600242", //RC 33600242 : Období položky FP
                        width: 140,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "rok_sml" /* Interface.GSmldkalDtoNames.rok_sml */
                                }]
                        }
                    }).addNumberColumn({
                        name: "cislo_sml" /* Interface.GSmldkalDtoNames.cislo_sml */,
                        caption: "jres:33600243", //RC 33600243 : Číslo položky FP
                        width: 140,
                        editor: {
                            widget: "gnumberbox",
                            options: [{
                                    name: "cislo_sml" /* Interface.GSmldkalDtoNames.cislo_sml */
                                }]
                        }
                    }).addTextColumn({
                        name: "popis" /* Interface.GSmldkalDtoNames.popis */,
                        caption: "jres:33600244", //RC 33600244 : Popis
                        width: 200,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "popis" /* Interface.GSmldkalDtoNames.popis */,
                                    validators: [new Gordic.Validators.Length({ max: 50 })]
                                }]
                        }
                    });
                    return gf;
                }
                /**
                 * Získání titulku tabu podle typu generování
                 * @param typ_gen
                 * @returns
                 */
                getTabTitle(typ_gen) {
                    switch (typ_gen) {
                        case 0 /* Interface.TypGenerovaniPredpisu.ng_typgenAgExt */:
                            return "jres:33600245"; //RC 33600245 : Požadavky na založení předpisu pohledávky
                        case 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */:
                            return "jres:33600246"; //RC 33600246 : Podmínky rozpisu předpisu pohledávky
                        case 2 /* Interface.TypGenerovaniPredpisu.ng_typgenPrepocet */:
                            return "jres:33600247"; //RC 33600247 : Podmínky generování předpisu pohledávky
                        default:
                            return "";
                    }
                }
                /**
                 * Získání popisu částky předpisu podle typu generování
                 * @param typ_gen
                 * @returns
                 */
                getCPredpLabel(typ_gen, poc_splatek) {
                    //dává smysl jen pro rozpis, ale jelikož jiný formulář nikdy není, tak takto by mělo stačit
                    if (typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */ && poc_splatek > 1) {
                        return "jres:33600248"; //RC 33600248 : Částka prvního předpisu
                    }
                    return "jres:33600249"; //RC 33600249 : Částka předpisu k rozpisu
                }
                /**
                 * Uložení pohledávky
                 * @returns
                 */
                save() {
                    if (!this.$formUdaje.gform("isValid")) {
                        return $.Deferred().reject().promise();
                    }
                    if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                        if (!this.$formRozpis.gform("isValid")) {
                            return $.Deferred().reject().promise();
                        }
                    }
                    var formData = {};
                    this.$formUdaje.findFields().gfield("model", "collect", formData);
                    var saveData = { ...this.smlskal, ...formData };
                    if (this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                        var rozpisData = {};
                        this.$formRozpis.findFields().gfield("model", "collect", rozpisData);
                        saveData = { ...saveData, ...rozpisData };
                    }
                    this.beginOperation();
                    if (saveData.flag_DB) {
                        return this.isl.Smlskal.updatePoh(saveData).getData().done((newDto) => {
                            this.changed = true;
                            this.load({ smlskal: newDto, changed: true });
                        }).fail((xhr, type, o) => {
                            if (type === "validation" && this.$formUdaje) {
                                o.handled = true;
                                this.$formUdaje.findFields().gfield("model", "validations", o);
                                if (this.$formRozpis && this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                                    this.$formRozpis.findFields().gfield("model", "validations", o);
                                }
                            }
                        }).always(() => { this.endOperation(); });
                    }
                    else {
                        return this.isl.Smlskal.createPoh(saveData).getData().done((newDto) => {
                            this.changed = true;
                            this.load({ smlskal: newDto, changed: true });
                        }).fail((xhr, type, o) => {
                            if (type === "validation" && this.$formUdaje) {
                                o.handled = true;
                                this.$formUdaje.findFields().gfield("model", "validations", o);
                                if (this.$formRozpis && this.smlgen.typ_gen == 1 /* Interface.TypGenerovaniPredpisu.ng_typgenRozpis */) {
                                    this.$formRozpis.findFields().gfield("model", "validations", o);
                                }
                            }
                        }).always(() => { this.endOperation(); });
                    }
                }
            };
            GSmlPlatebKalPoh = __decorate([
                Decorators.gcontent
            ], GSmlPlatebKalPoh);
            WebClient.GSmlPlatebKalPoh = GSmlPlatebKalPoh;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBsYXRlYkthbFBvaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxQbGF0ZWJLYWxQb2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsK0ZBQStGO0FBQy9GLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0E2eUJmO0FBN3lCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2eUJuQjtJQTd5QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZ5QjdCO1FBN3lCb0IsV0FBQSxTQUFTO1lBVTFCLG1FQUFtRTtZQUVuRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkE4QjlDLE9BQU87b0JBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQix1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzdGLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxJ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QUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDL0QsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTywyREFBbUQsRUFBRSxDQUFDO29DQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQzs0QkFDeEssQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFoeUJZLGdCQUFnQjtnQkFENUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxnQkFBZ0IsQ0FneUI1QjtZQWh5QlksMEJBQWdCLG1CQWd5QjVCLENBQUE7UUFDTCxDQUFDLEVBN3lCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNnlCN0I7SUFBRCxDQUFDLEVBN3lCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNnlCbkI7QUFBRCxDQUFDLEVBN3lCUyxNQUFNLEtBQU4sTUFBTSxRQTZ5QmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxQbGF0ZWJLYWxQb2gudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gUGxhdGVibsOtIGthbGVuZMOhxZkgb2RixJtyYXRlbHNrw71jaCBkb2tsYWTFryAtIGRldGFpbCBwb2hsZWTDoXZreSA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTAzLTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxQbGF0ZWJLYWxQb2hEbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgc21scGlkOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0byxcclxuICAgICAgICBzbWxza2FsOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG8gfCBudWxsLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFBsYXRlYkthbFBvaERsZ1JldHVyblZhbHVlIHtcclxuICAgICAgICBjaGFuZ2VkOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFBsYXRlYm7DrSBrYWxlbmTDocWZIG9kYsSbcmF0ZWxza8O9Y2ggZG9rbGFkxa8gLSBkZXRhaWwgcG9obGVkw6F2a3kgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbFBsYXRlYkthbFBvaCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIENlbGtvdsO9IHJlY29yZCAtIGRva2xhZCArIHDFmcOtcGFkICovXHJcbiAgICAgICAgcHVibGljIHNtbHBpZDogSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG87XHJcbiAgICAgICAgLyoqIER0byBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIHB1YmxpYyBzbWxza2FsOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG87XHJcblxyXG4gICAgICAgIC8vQ29udGVudFZhbHVlc1xyXG4gICAgICAgIC8qKiBHbG9iYWxuw60gcHJvbcSbbm7DqSBTTUwgKi9cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHM6IEludGVyZmFjZS5HU21sR2xvYmFsc0R0bztcclxuICAgICAgICAvKiogxZjDrXplbsOtIG1vxb5ub3N0aSBnZW5lcm92YXQgeiBkb2RhdmF0ZWxza8OpaG8gZG9rbGFkdSDFvsOhZG9zdCBuYSB6YWxvxb5lbsOtIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzbWxfcmFkX3Z5ZDJkZHA6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIMOaZGFqZSB6ZSDFoWFibG9ueSAqL1xyXG4gICAgICAgIHByaXZhdGUgc21sZ2VuOiBJbnRlcmZhY2UuR1NtbHNzdGVEdG87XHJcblxyXG4gICAgICAgIC8qKiBIbGF2bsOtIGZvcm11bMOhxZkgcyDDmmRhamkgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBwcml2YXRlICRmb3JtVWRhamU6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFRhYiBzIGRvZGF0ZcSNbsO9bWkgw7pkYWppIHBvZGxlIMWhYWJsb255ICovXHJcbiAgICAgICAgcHJpdmF0ZSAkdGFiOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKiBQxZnDrXBhZG7DvSBmb3JtdWzDocWZIHMgZG9kYXRlxI1uw71taSDDumRhamkgcG9kbGUgxaFhYmxvbnkgKi9cclxuICAgICAgICBwcml2YXRlICRmb3JtUm96cGlzOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKiBQxZnDrXBhZG7DvSBncmlkIHMgcm96cGlzeSBwb2hsZWTDoXZlayBwb2RsZSDFoWFibG9ueSAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRSb3pwaXM6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIC8qKiBTdW1hIHphIHDFmWVkcGlzeSAqL1xyXG4gICAgICAgIHByaXZhdGUgc3VtX2NfbWVuYTogRGVjaW1hbDtcclxuICAgICAgICAvKiogUMWZw616bmFrIHpkYSBwcm9ixJtobGEgem3Em25hIHBsYXRieSAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aWNlUGVybWlzc2lvbnNQcmVkcGlzUG9oOiBJbnRlcmZhY2UuR1NtbHNrYWxQZXJtaXNzaW9ucztcclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1bV9jX21lbmEgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1haW5Gb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFiKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm1VZGFqZS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLnNtbHNrYWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy4kZm9ybVVkYWplLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuc21sZ2VuLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNtbGdlbi50eXBfZ2VuID09IEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UubmdfdHlwZ2VuUm96cGlzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJvenBpc0Zvcm0odGhpcy4kdGFiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGZvcm1Sb3pwaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5zbWxza2FsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRmb3JtUm96cGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuc21sZ2VuLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlbkFnRXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJvenBpc0dyaWQodGhpcy4kdGFiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJlZHBpcz8udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROb3Z5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Ob3Z5KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRQZW5kaW5nKHRoYXQuaXNsLlNtbHNrYWwuY3JlYXRlTmV3RGVmYXVsdER0byh7IGl4cDogdGhhdC5zbWxwaWQuaXhwISB9KS5nZXREYXRhKCkuZG9uZSgobmV3RHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5ld0R0by5jID0gdGhhdC4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5maW5kKChlbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIGVsLnJvayA9PSB0aGF0LnJvayB9KS5jX3JvemRpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC4kZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCBuZXdEdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eVByZWRwaXM6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDE5MlwiLCAvL1JDIDMzNjAwMTkyIDogTm92w70gcMWZZWRwaXNcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmlzbC5TbWxza2FsLmNyZWF0ZVByZWRwaXNQb2hOZXdEZWZhdWx0RHRvKHsgaXhwOiB0aGF0LnNtbHNrYWwuaXhwISwgY2lzX3BsYXRieTogdGhhdC5zbWxza2FsLmNpc19wbGF0YnkhLCBpeHBfc21sX3ByaTogdGhhdC5zbWxza2FsLml4cF9zbWxfcHJpISB9KS5nZXREYXRhKCkuZG9uZSgobmV3RHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUm96cGlzLmdncmlkcm93ZWRpdG9yKFwiYWRkUm93XCIsIG5ld0R0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VbG96aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuc21sc2thbC5QZXJtaXNzaW9ucz8uTHplRWRpdG92YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5zYXZlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5KlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RVbG96aXQhXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gaGxhdm7DrWhvIGZvcm11bMOhxZllIHNlIHrDoWtsYWRuw61taSDDumRhamkqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWFpbkZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBjX21lbmFfZXJyb3JfbXNnID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVVkYWplUG9obGVkYXZreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsOaZGFqZSBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxOTNcIikgLy9SQyAzMzYwMDE5MyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy5wb3Bpc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTk0XCIpIC8vUkMgMzM2MDAxOTQgOiBPZGLEm3JhdGVsXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxLYWxJeHNFc3VTbWwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1O21vZGVsLml4cF9zbWxfcHJpPT52YWx1ZS5peHBfc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbHNrYWwuc3RhdHVzX3BsYXRieSAhPSBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieU5vbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sX3ByaTogdGhpcy5zbWxza2FsLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGN0eD8uZmxhZ3M/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcImJ1X2NpXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpeHNfZXN1OiBjdHgudmFsdWUuaXhzX2VzdSwgYnVfY2k6IGN0eC52YWx1ZS5idV9jaSwgc2tfY2k6IGN0eC52YWx1ZS5za19jaSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxOTVcIikgLy9SQyAzMzYwMDE5NSA6IEJhbmtvdm7DrSDDusSNZXQgb2RixJtyYXRlbGVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y2koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZXN1PT52YWx1ZS5peHNfZXN1O21vZGVsLmJ1X2NpPXZhbHVlLmJ1X2NpO21vZGVsLnNrX2NpPXZhbHVlLnNrX2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc21sc2thbC5zdGF0dXNfcGxhdGJ5ICE9IEludGVyZmFjZS5TdGF0dXNQbGF0Ynkubmdfc3RhdHVzcGxhdGJ5Tm9uZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19lc3VcIiwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsKSB7IHJldHVybiB0aGlzLnNtbHBpZC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsLml4c19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlLCBmYWxzZSwgdGhpcy4kZm9ybVVkYWplKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTk2XCIpIC8vUkMgMzM2MDAxOTYgOiDFoGFibG9uYSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sc3N0ZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuaXhzX3N0ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3N0ZT12YWx1ZS5peHNfc3RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc21sc2thbC5zdGF0dXNfcGxhdGJ5ICE9IEludGVyZmFjZS5TdGF0dXNQbGF0Ynkubmdfc3RhdHVzcGxhdGJ5Tm9uZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6ICh0aGlzLmdsb2JhbHMuc3VibW9kZWxfZGRwX2FrdCAmJiB0aGlzLnNtbF9yYWRfdnlkMmRkcCkgPyB0aGlzLnNtbHBpZC50eXBfcGhsIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguZmxhZ3M/LnZhbGlkICYmIGN0eC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vZHBvamVuw60gYWt0dcOhbG7DrWhvIGNvbnRlbnR1IHRhYnUsIHBva3VkIGV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlbkFnRXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcyA9IHRoaXMuJGdyaWRSb3pwaXMuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE5vdnlQcmVkcGlzPy52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm1Sb3pwaXMgPSB0aGlzLiRmb3JtUm96cGlzLmRldGFjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc21sZ2VuID0gY3R4LnZhbHVlITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYi5ndGFiKHsgdGl0bGU6IHRoaXMuZ2V0VGFiVGl0bGUodGhpcy5zbWxnZW4udHlwX2dlbj8/LTEpIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNtbGdlbi50eXBfZ2VuID09IEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UubmdfdHlwZ2VuQWdFeHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kZ3JpZFJvenBpcyA9PSB2b2lkIDApIHsgdGhpcy5jcmVhdGVSb3pwaXNHcmlkKHRoaXMuJHRhYik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGFiLmFwcGVuZCh0aGlzLiRncmlkUm96cGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0Tm92eVByZWRwaXM/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJlZHBpcz8udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtUm96cGlzID09IHZvaWQgMCkgeyB0aGlzLmNyZWF0ZVJvenBpc0Zvcm0odGhpcy4kdGFiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyB0aGlzLiR0YWIuYXBwZW5kKHRoaXMuJGZvcm1Sb3pwaXMpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9ybVJvenBpcy5maW5kRm9ybVJvd3MoXCJyb3dfY19wcmVkcFwiKS5nZm9ybXJvdyhcInNldExhYmVsXCIsIHRoaXMuZ2V0Q1ByZWRwTGFiZWwodGhpcy5zbWxnZW4udHlwX2dlbiwgdGhpcy5zbWxnZW4ucG9jX3NwbGF0ZWsgPz8gMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm1Sb3pwaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5zbWxza2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtUm96cGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuc21sZ2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9rYcW+ZMOpIG5hc3RhdsOtbSBkYXRhIHplIMWhYWJsb255IGRvIGhsYXZuw61jaCDDumRhasWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtVWRhamUuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5zbWxnZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTk3XCIpIC8vUkMgMzM2MDAxOTcgOiBUeXAgcG9obGVkw6F2a3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcHN0cHBfdmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9PnZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDE5OFwiKSAvL1JDIDMzNjAwMTk4IDogWnDFr3NvYiDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNrYWxEdG9OYW1lcy56cCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC56cD0+dmFsdWUuenBcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHsgenA6IDAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDE5OVwiKSAvL1JDIDMzNjAwMTk5IDogWnDFr3NvYiB2eXR2b8WZZW7DrSBwxZllZHBpc8WvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9nZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfZ2VuPT52YWx1ZS50eXBfZ2VuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR5cF9nZW46IEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UubmdfdHlwZ2VuTm9uZSwgdHlwX2dlbl90eHQ6IFwianJlczozMzYwMDIwMFwiIH0sIC8vUkMgMzM2MDAyMDAgOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBfZ2VuOiBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlbkFnRXh0LCB0eXBfZ2VuX3R4dDogXCJqcmVzOjMzNjAwMjAxXCIgfSwgLy9SQyAzMzYwMDIwMSA6IE5hIHrDoWtsYWTEmyDDumRhasWvIHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBfZ2VuOiBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcywgdHlwX2dlbl90eHQ6IFwianJlczozMzYwMDIwMlwiIH0sIC8vUkMgMzM2MDAyMDIgOiBOYSB6w6FrbGFkxJsgcHJhdmlkZWwgc3Rhbm92ZW7DvWNoIHBsYXRlYm7DrW0ga2FsZW5kw6HFmWVtIHNtbG91dnkgcHJvIHJvenBpcyBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBfZ2VuOiBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblByZXBvY2V0LCB0eXBfZ2VuX3R4dDogXCJqcmVzOjMzNjAwMjAzXCIgfSwgLy9SQyAzMzYwMDIwMyA6IE5hIHrDoWtsYWTEmyBwcmF2aWRlbCBERFAgcHJvIGRhbsO9IHR5cCBwb2hsZWTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcInR5cF9nZW5cIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX2dlbjogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dHlwX2dlbl90eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1widHlwX2dlbl90eHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVySXRlbVRlbXBsYXRlOiBcInt0eXBfZ2VuX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIwNFwiKSAvL1JDIDMzNjAwMjA0IDogUG/EjWV0IHNwbMOhdGVrXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY19zcGxhdGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucG9jX3NwbGF0ZWs9PnZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIwNVwiKSAvL1JDIDMzNjAwMjA1IDogUG/EjcOhdGVrIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxza2FsLnN0YXR1c19wbGF0YnkgIT0gSW50ZXJmYWNlLlN0YXR1c1BsYXRieS5uZ19zdGF0dXNwbGF0YnlOb25lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMDZcIiwgLy9SQyAzMzYwMDIwNiA6IERhdHVtIHBvxI3DoXRrdSBwbGF0bm9zdGkgcG9obGVkw6F2a3kgbXVzw60gYsO9dCB2xJt0xaHDrSBuZcW+IGRhdHVtIMO6xI1pbm5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc3JjKS5nZmllbGQoXCJnZXRFcnJvcnNcIikubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGxhdGJhIG11c8OtIGLDvXQgdsSbdMWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEobmV3IERhdGUocGFyc2VEYXRlKHZhbCkudG9EYXRlU3RyaW5nKCkpIDwgbmV3IERhdGUocGFyc2VEYXRlKHRoaXMuc21scGlkLmRhdF91Y2lubm9zdCEpLnRvRGF0ZVN0cmluZygpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgZGZfZGF0X29kLl9wdXQoIHNtbHBpZF9wLmZpbmRvYy5kYXRfdWNpbm5vc3QgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmEgc2VydmVydSBwb3TDqSBqZcWhdMSbIGtvbnRyb2xhIHbFr8SNaSB6YWRhbsOpIMSNw6FzdGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjA3XCIsIC8vUkMgMzM2MDAyMDcgOiBEYXR1bSBwb8SNw6F0a3UgcGxhdG5vc3RpIHBvaGxlZMOhdmt5IGplIHbEm3TFocOtIG5lxb4gZGF0dW0gcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc3JjKS5nZmllbGQoXCJnZXRFcnJvcnNcIikubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzQyLjExIDE1LjExLjAxIC0gcG9kbcOtbmthIGRvcGxuxJtuYSBvIHR5cCBwbGF0bm9zdGkgc21sb3V2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKHRoaXMuc21scGlkLnR5cF9wbGF0bm9zdCA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhICYmIG5ldyBEYXRlKHBhcnNlRGF0ZSh2YWwpLnRvRGF0ZVN0cmluZygpKSA+IG5ldyBEYXRlKHBhcnNlRGF0ZSh0aGlzLnNtbHBpZC5kYXRfcGxhdG5vc3QhKS50b0RhdGVTdHJpbmcoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uYSBzZXJ2ZXJ1IHBvdMOpIGplxaF0xJsga29udHJvbGEgdsWvxI1pIHphZGFuw6kgxI3DoXN0Y2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyMDhcIikgLy9SQyAzMzYwMDIwOCA6IEtvbmVjIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmRhdF9kbyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxza2FsLnN0YXR1c19wbGF0YnkgIT0gSW50ZXJmYWNlLlN0YXR1c1BsYXRieS5uZ19zdGF0dXNwbGF0YnlOb25lLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjA5XCIsIC8vUkMgMzM2MDAyMDkgOiBEYXR1bSBwb8SNw6F0a3UgcGxhdG5vc3RpIHBvaGxlZMOhdmt5IG5lc23DrSBiw710IHbEm3TFocOtIG5lxb4gZGF0dW0gcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wb2t1ZCBqZSBkb2JhIHVyxI1pdMOhLCBrb250cm9sdWp1IHBsYXRub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zbWxwaWQudHlwX3BsYXRub3N0ID09IEludGVyZmFjZS5UeXBQbGF0bm9zdFNtbG91dnkubmdfdHlwcGxhdG5vc3RVcmNpdGEgJiYgbmV3IERhdGUocGFyc2VEYXRlKHZhbCkudG9EYXRlU3RyaW5nKCkpID4gbmV3IERhdGUocGFyc2VEYXRlKHRoaXMuc21scGlkLmRhdF9wbGF0bm9zdCEpLnRvRGF0ZVN0cmluZygpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hIHNlcnZlcnUgcG90w6kgamXFoXTEmyBrb250cm9sYSB2xa/EjWkgemFkYW7DqSDEjcOhc3RjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIxMFwiKSAvL1JDIDMzNjAwMjEwIDogTcSbbmFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9PnZhbHVlLm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHttZW5hOiB0aGlzLnNtbHBpZC5tZW5hfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMjExXCIgKyB0aGlzLnNtbHBpZC5tZW5hX3prcikgLy9SQyAzMzYwMDIxMSA6IMSMw6FzdGthIHBvaGxlZMOhdmt5IHYgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbHNrYWwuc3RhdHVzX3BsYXRieSAhPSBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieU5vbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAwLjAxIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlOiAodmFsKSA9PiB7IHJldHVybiBjX21lbmFfZXJyb3JfbXNnOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZURlY2ltYWwodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM4Ni4zIDEwLjExLjIwIG51dG5vIHByYWNvdmF0IHMgxI3DoXN0a291IHphIHDFmcOtcGFkLCBuaWtvbGl2IGRva2xhZHUgLSBzbWxwaWRfcC5maW5kb2MuY19tZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zODYuMyAwMi4xMi4yMCB2emhsZWRlbSBrIHRvbXUsIMW+ZSBjZW5hIHBvaGxlZMOhdmt5IGplIGRlZmlub3bDoW5hIGFic29sdXRuxJssIHByb3ZlZGUgc2Uga29udHJvbGEgcG91emUgdsWvxI1pIHDFmcOtcGFkdSwgbmlrb2xpdiBqacW+IHphZGFuw71jaCB6w6F6bmFtxa8gcGxhdGVibsOtaG8ga2FsZW5kw6HFmWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Z5aG96ZW5vOiAgc21scGlkX3AuZmlucHJpcGFkLmNfbWVuYSA8IHNtbGthbF9wLmNfbWVuYV9rYWwgKyBkZl9jX21lbmEgLSBzbWxrYWxidWYuY19tZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLnNtbHBpZC5wcmlwYWQ/LmNfbWVuYSA/PyAwKS5sZXNzVGhhbih2YWwubWludXMocGFyc2VEZWNpbWFsKHRoaXMuc21sc2thbC5jX21lbmEgPz8gMCkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX21lbmFfZXJyb3JfbXNnID0gXCJqcmVzOjMzNjAwMjEyXCI7IC8vUkMgMzM2MDAyMTIgOiBTb3XEjWV0IMSNw6FzdGVrIHBvxb5hZGF2a8WvIG5hIHphbG/FvmVuw60gcG9obGVkw6F2a3kgbmVtxa/FvmUgYsO9dCB2ecWhxaHDrSBuZcW+IGNlbGtvdsOhIMSNw6FzdGthIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBkZl9jX21lbmEgPSBzbWxwaWRfcC5maW5wcmlwYWQuY19tZW5hIC0gc21sa2FsX3AuY19tZW5hX2thbCArIHNtbGthbGJ1Zi5jX21lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3YgesOhdmlzbG9zdGkgbmEgdHlwdSDFoWFibG9ueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlbkFnRXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIG9wcm90aSBob2Rub3TDoW0gcMWZZWRwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VtX2NfbWVuYS5ncmVhdGVyVGhhbih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19tZW5hX2Vycm9yX21zZyA9IFwianJlczozMzYwMDIxM1wiOyAvL1JDIDMzNjAwMjEzIDogxIzDoXN0a2EgcG9obGVkw6F2a3kgbmVtxa/FvmUgYsO9dCBuacW+xaHDrSBuZcW+IMSNw6FzdGt5IGplasOtY2ggcMWZZWRwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hc3RhdsOtbSBtaW5pbcOhbG7DrSBudXRuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBkZl9jX21lbmEgPSB0YmxfcHJlZHAuc3VtQ01lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNtbGdlbi50eXBfZ2VuID09IEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UubmdfdHlwZ2VuUm96cGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHRoaXMuJGZvcm1Sb3pwaXMuZmluZEZpZWxkcyhcImNfcHJlZHBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpLmdyZWF0ZXJUaGFuKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX21lbmFfZXJyb3JfbXNnID0gXCJqcmVzOjMzNjAwMjE0XCI7IC8vUkMgMzM2MDAyMTQgOiDEjMOhc3RrYSBwb2hsZWTDoXZreSBuZW3Fr8W+ZSBiw710IG5pxb7FocOtIG5lxb4gxI3DoXN0a3kgamVqw61jaCBwxZllZHBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2w61tIG1pbmltw6FsbsOtIG51dG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2NfbWVuYSA9IGRmX2NfcHJlZHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hIHNlcnZlcnUgcG90w6kgamXFoXTEmyBrb250cm9sYSB2xa/EjWkgemFkYW7DqSDEjcOhc3RjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmZsYWdzPy52YWxpZCA9PSBmYWxzZSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vamUgdG8gdiBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc21scGlkLm1lbmEgPT0gSW50ZXJmYWNlLlR5cE1lbnkubmdfbWVuYUNaSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGN0eC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9wxZllcG/EjWV0IG5hIENaSyBkbGUgdHlwdSBrdXJ6dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc21scGlkLnR5cF9rdXJ6ID09IEludGVyZmFjZS5UeXBLdXJ6dS5uZ190eXBrdXJ6UGV2bnlTbWwgfHwgdGhpcy5zbWxwaWQudHlwX2t1cnogPT0gSW50ZXJmYWNlLlR5cEt1cnp1Lm5nX3R5cGt1cnpQZXZueVN5c3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gKHBhcnNlRGVjaW1hbChjdHgudmFsdWUhKS50aW1lcyh0aGlzLnNtbHBpZC5rdXJ6ID8/IDEpKS5kaXZpZGVkQnkodGhpcy5zbWxwaWQubSA/PyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tdXPDrW0gc2kgemppc3RpdCBrdXJ6IHBybyBkYW7DvSByb2sgdiBTTUxTUk9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IChwYXJzZURlY2ltYWwoY3R4LnZhbHVlISkudGltZXModGhpcy5zbWxwaWQuc21scm9rPy5rdXJ6ID8/IDEpKS5kaXZpZGVkQnkodGhpcy5zbWxwaWQuc21scm9rPy5tID8/IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtVWRhamUuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMjE1XCIpIC8vUkMgMzM2MDAyMTUgOiDEjMOhc3RrYSBwb2hsZWTDoXZreSB2IENaS1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtVWRhamUgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHRhYnUgcyBkb2RhdGXEjW7DvW1pIMO6ZGFqaSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlVGFiKCkge1xyXG4gICAgICAgICAgICB0aGlzLiR0YWIgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5nZXRUYWJUaXRsZSh0aGlzLnNtbGdlbi50eXBfZ2VuPz8tMSksXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5vdnlQcmVkcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBkb2RhdGXEjW7DqWhvIGZvcm11bMOhxZllIHUgdHlwX2dlbiA9IG5nX3R5cGdlblJvenBpcyovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVSb3pwaXNGb3JtKHRhYjogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1VZGFqZVBvaGxlZGF2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyMTZcIikgLy9SQyAzMzYwMDIxNiA6IEthdGVnb3JpZSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89PnZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMjE3XCIpIC8vUkMgMzM2MDAyMTcgOiBQb3N1biBkYXRhIHNwbGF0bm9zdGkgKGRueSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWwucG9zdW5fZGF0X3NwbD0+dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIxOFwiKSAvL1JDIDMzNjAwMjE4IDogWmFva3JvdWhsZW7DrSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel96YW9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucHJpel96YW9rPT52YWx1ZS5wcml6X3phb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcHJpel96YW9rOiAwLCBwcml6X3phb2tfdHh0OiBcImpyZXM6MzM2MDAyMTlcIiB9LCAvL1JDIDMzNjAwMjE5IDogQmV6IHphb2tyb3VobGVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwcml6X3phb2s6IDEsIHByaXpfemFva190eHQ6IFwianJlczozMzYwMDIyMFwiIH0sIC8vUkMgMzM2MDAyMjAgOiBOYSBqZWRubyBkZXNldGlubsOpIG3DrXN0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHByaXpfemFvazogMiwgcHJpel96YW9rX3R4dDogXCJqcmVzOjMzNjAwMjIxXCIgfSwgLy9SQyAzMzYwMDIyMSA6IE5hIGNlbMOpIGtvcnVueVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJwcml6X3phb2tcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3ByaXpfemFva190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wicHJpel96YW9rX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJJdGVtVGVtcGxhdGU6IFwie3ByaXpfemFva190eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIyNlwiKSAvL1JDIDMzNjAwMjI2IDogUGVyaW9kYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZXJpb2RhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucGVyaW9kYT0+dmFsdWUucGVyaW9kYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwZXJpb2RhOiAwLCBwZXJpb2RhX3R4dDogXCJqcmVzOjMzNjAwMjIyXCIgfSwgLy9SQyAzMzYwMDIyMiA6IE5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHBlcmlvZGE6IDEwLCBwZXJpb2RhX3R4dDogXCJqcmVzOjMzNjAwMjIzXCIgfSwgLy9SQyAzMzYwMDIyMyA6IERlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHBlcmlvZGE6IDIwLCBwZXJpb2RhX3R4dDogXCJqcmVzOjMzNjAwMjI0XCIgfSwgLy9SQyAzMzYwMDIyNCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBwZXJpb2RhOiAzMCwgcGVyaW9kYV90eHQ6IFwianJlczozMzYwMDIyNVwiIH0gLy9SQyAzMzYwMDIyNSA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcInBlcmlvZGFcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BlcmlvZGFfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInBlcmlvZGFfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckl0ZW1UZW1wbGF0ZTogXCJ7cGVyaW9kYV90eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIyN1wiKSAvL1JDIDMzNjAwMjI3IDogSW50ZXJ2YWxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9wZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wcml6X3Blcj0+dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBuYW1lOiBcInJvd19jX3ByZWRwXCIsIGxhYmVsOiB0aGlzLmdldENQcmVkcExhYmVsKHRoaXMuc21sZ2VuLnR5cF9nZW4gPz8gLTEsIHRoaXMuc21sZ2VuLnBvY19zcGxhdGVrID8/IDApIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ByZWRwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuc21sc2thbC5zdGF0dXNfcGxhdGJ5ICE9IEludGVyZmFjZS5TdGF0dXNQbGF0Ynkubmdfc3RhdHVzcGxhdGJ5Tm9uZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMC4wMSB9KV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIyOFwiKSAvL1JDIDMzNjAwMjI4IDogRGF0dW0gdnpuaWt1IHBydm7DrWhvIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmRhdF92em5pa3VfZixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxza2FsLnN0YXR1c19wbGF0YnkgIT0gSW50ZXJmYWNlLlN0YXR1c1BsYXRieS5uZ19zdGF0dXNwbGF0YnlOb25lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyMjlcIikgLy9SQyAzMzYwMDIyOSA6IERhdHVtIHNwbGF0bm9zdGkgcHJ2bsOtaG8gcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuZGF0X3NwbGF0bm9zdF9mLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbHNrYWwuc3RhdHVzX3BsYXRieSAhPSBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieU5vbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDIzMFwiKSAvL1JDIDMzNjAwMjMwIDogRGF0dW0gdnpuaWt1IHBvc2xlZG7DrWhvIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2thbER0b05hbWVzLmRhdF92em5pa3VfbCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxza2FsLnN0YXR1c19wbGF0YnkgIT0gSW50ZXJmYWNlLlN0YXR1c1BsYXRieS5uZ19zdGF0dXNwbGF0YnlOb25lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyMzFcIikgLy9SQyAzMzYwMDIzMSA6IERhdHVtIHNwbGF0bm9zdGkgcG9zbGVkbsOtaG8gcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxza2FsRHRvTmFtZXMuZGF0X3NwbGF0bm9zdF9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbHNrYWwuc3RhdHVzX3BsYXRieSAhPSBJbnRlcmZhY2UuU3RhdHVzUGxhdGJ5Lm5nX3N0YXR1c3BsYXRieU5vbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZm9ybVJvenBpcyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZG9kYXRlxI1uw6lobyBncmlkdSBzIHDFmWVkcGlzeSBwb2hsZWTDoXZlayAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUm96cGlzR3JpZCh0YWI6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZ3JpZDxJbnRlcmZhY2UuR1NtbGRrYWxEdG8+KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBsYXRlYkthbFJvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3Lyo8R29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbGRrYWxEdG8+Ki8odGhpcy5pc2wuU21sc2thbC5saXN0UHJlZHBpc1BvaCh7IGl4cDogdGhpcy5zbWxza2FsLml4cCEsIHJxOiB7IGZpbHRlcnM6IHsgaXhwX3NtbF9wcmk6IHRoaXMuc21sc2thbC5peHBfc21sX3ByaSwgY2lzX3BsYXRieTogdGhpcy5zbWxza2FsLmNpc19wbGF0YnkgPz8gMCB9LCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zLipcIl0gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VQZXJtaXNzaW9uc1ByZWRwaXNQb2ggPSBkYXRhLnNlcnZpY2VQZXJtaXNzaW9ucyBhcyBJbnRlcmZhY2UuR1NtbHNrYWxQZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJlZHBpcz8udXBkYXRlUGVybWlzc2lvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VydmljZVBlcm1pc3Npb25zUHJlZHBpc1BvaC5MemVOb3Z5LnZhbHVlICYmICF0aGlzLiRmb3JtVWRhamUuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICghdGhpcy5zZXJ2aWNlUGVybWlzc2lvbnNQcmVkcGlzUG9oLkx6ZU5vdnkudmFsdWUpID8gdGhpcy5zZXJ2aWNlUGVybWlzc2lvbnNQcmVkcGlzUG9oLkx6ZU5vdnkubWVzc2FnZSA6IFwianJlczozMzYwMDIzMlwiIC8vUkMgMzM2MDAyMzIgOiBGb3JtdWzDocWZIG9ic2FodWplIG5ldWxvxb5lbsOpIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Z5bnVsdWppIHNvdcSNZXQgemEgcMWZZWRwaXN5IGEgbmFwb8SNdHUgem5vdnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VtX2NfbWVuYSA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZHRvIG9mIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VtX2NfbWVuYSA9IHRoaXMuc3VtX2NfbWVuYS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY19tZW5hPz8wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJjaXNfcGxhdGJ5XCIsIFwicG9yYWRpXCIsIFwiaXhwX3NtbF9wcmlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25GcmFnbWVudHM6IG5ldyBHb3JkaWMuRGF0YS5GcmFnbWVudE1hbmFnZXIoW1wiUGVybWlzc2lvbnMuKlwiXSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlUm96cGlzR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZUJlZm9yZUNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBlZGl0dWplLCBuZWpzb3UgcG92b2xlbnkgem3Em255IHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJGdyaWRSb3pwaXM/LmZpbmQoXCIucm93LmVkaXRpbmdcIik/Lmxlbmd0aCA/PyAwKSA8IDE7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy4kZ3JpZFJvenBpcz8uZmluZChcIi5yb3cuZWRpdGluZ1wiKT8ubGVuZ3RoID8/IDEpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eVByZWRwaXM/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai52aWV3LmdldExvYWRpbmdQcm9taXNlKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eVByZWRwaXM/LnVwZGF0ZVBlcm1pc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9uc1ByZWRwaXNQb2guTHplTm92eS52YWx1ZSAmJiAhdGhpcy4kZm9ybVVkYWplLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAoIXRoaXMuc2VydmljZVBlcm1pc3Npb25zUHJlZHBpc1BvaC5MemVOb3Z5LnZhbHVlKSA/IHRoaXMuc2VydmljZVBlcm1pc3Npb25zUHJlZHBpc1BvaC5MemVOb3Z5Lm1lc3NhZ2UgOiBcImpyZXM6MzM2MDAyMzJcIiAvL1JDIDMzNjAwMjMyIDogRm9ybXVsw6HFmSBvYnNhaHVqZSBuZXVsb8W+ZW7DqSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2dyaWRyb3dlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlU3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgcG92b2xlbsOtIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpbmZvPy5jZWxsSW5mbz8uZGF0YT8uUGVybWlzc2lvbnM/Lkx6ZUVkaXRvdmF0Py52YWx1ZSA/PyBmYWxzZSkpIHsgZXYucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiAoZXYsIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy9tdXPDrSBkb2LEm2hub3V0IGFrdHXDoWxuw60gcHJvbWlzZSwgYWJ5IHpydcWhaWxhIHNldFBlbmRpbmcgbmEgYWtjaSBhIG1vaGwganNlbSBuYXN0YXZpdCBlbmFibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJlZHBpcz8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNhdmU6IChkYXRhLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZUR0bzogSW50ZXJmYWNlLkdTbWxka2FsRHRvID0geyAuLi5vYmouY2VsbEluZm8uZGF0YSwgLi4uZGF0YSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVEdG8uaXhwX3NtbF9wcmkgPSB0aGlzLnNtbHNrYWwuaXhwX3NtbF9wcmk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUR0by5peHBfc21sID0gdGhpcy5zbWxza2FsLml4cF9zbWxfcHJpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYXZlRHRvLmZsYWdfREIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNrYWwudXBkYXRlUHJlZHBpc1BvaChzYXZlRHRvKS5nZXREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoeGhyLCB0eXBlLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIgJiYgdGhpcy4kZ3JpZFJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNrYWwuY3JlYXRlUHJlZHBpc1BvaChzYXZlRHRvKS5nZXREYXRhKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoeGhyLCB0eXBlLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIgJiYgdGhpcy4kZ3JpZFJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZFJvenBpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBwcm8gcm96cGlzeSBwb2hsZWTDoXZlayAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUm96cGlzR3JpZEZvcm1hdCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMucG9yYWRpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzBcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbGRrYWxEdG9OYW1lcy5rdGdfdXBvX3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIzM1wiLCAvL1JDIDMzNjAwMjMzIDogS2F0ZWdvcmllIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMuZGF0X3Z6bmlrLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjM0XCIsIC8vUkMgMzM2MDAyMzQgOiBEYXR1bSB2em5pa3VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbF9lcnJvciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdkYXRlYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbGRrYWxEdG9OYW1lcy5kYXRfdnpuaWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWVzc2FnZTogKCkgPT4geyByZXR1cm4gdmFsX2Vycm9yOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzcmMpLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25lc23DrSBiw710IG5pxb7FocOtIG5lxb4gZGF0dW0gcG/EjcOhdGt1IHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKHBhcnNlRGF0ZSh2YWwpLnRvRGF0ZVN0cmluZygpKSA8IG5ldyBEYXRlKHBhcnNlRGF0ZSh0aGF0LiRmb3JtVWRhamUuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkudG9EYXRlU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsX2Vycm9yID0gXCJqcmVzOjMzNjAwMjM1XCI7IC8vUkMgMzM2MDAyMzUgOiBEYXR1bSB2em5pa3UgcMWZZWRwaXN1IG5lc23DrSBiw710IG1lbsWhw60gbmXFviBkYXR1bSBwb8SNw6F0a3UgcGxhdG5vc3RpIHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsbCBkYXRfdnpuaWsuX3B1dCggZGZfZGF0X29kLl9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXNtw60gYsO9dCB2ecWhxaHDrSBuZcW+IGRhdHVtIGtvbmNlIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKHBhcnNlRGF0ZSh2YWwpLnRvRGF0ZVN0cmluZygpKSA+IG5ldyBEYXRlKHBhcnNlRGF0ZSh0aGF0LiRmb3JtVWRhamUuZmluZEZpZWxkcyhcImRhdF9kb1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkudG9EYXRlU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsX2Vycm9yID0gXCJqcmVzOjMzNjAwMjM2XCI7IC8vUkMgMzM2MDAyMzYgOiBEYXR1bSB2em5pa3UgcMWZZWRwaXN1IG5lc23DrSBiw710IHbEm3TFocOtIG5lxb4gZGF0dW0ga29uY2UgcGxhdG5vc3RpIHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsbCBkYXRfdnpuaWsuX3B1dCggZGZfZGF0X2RvLl9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbGRrYWxEdG9OYW1lcy5kYXRfc3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjM3XCIsIC8vUkMgMzM2MDAyMzcgOiBEYXR1bSBzcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdkYXRlYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMuZGF0X3NwbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMzhcIiwgLy9SQyAzMzYwMDIzOCA6IERhdHVtIHNwbGF0bm9zdGkgcMWZZWRwaXN1IG5lc23DrSBiw710IG1lbsWhw60gbmXFviBkYXR1bSB2em5pa3UgcMWZZWRwaXN1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzcmMpLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG5ldyBEYXRlKHBhcnNlRGF0ZSh2YWwpLnRvRGF0ZVN0cmluZygpKSA8IG5ldyBEYXRlKHBhcnNlRGF0ZSh0aGlzLiRncmlkUm96cGlzLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpLnRvRGF0ZVN0cmluZygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsbCBkYXRfc3BsYXRub3N0Ll9wdXQoIGRhdF92em5pay5fZ2V0KCApIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjM5XCIsIC8vUkMgMzM2MDAyMzkgOiDEjMOhc3RrYSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbGRrYWxEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2Uoe21pbjogMC4wMX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDI0MFwiLCAvL1JDIDMzNjAwMjQwIDogQ2Vsa292w6EgxI3DoXN0a2EgcMWZZWRwaXPFryBuZXNtw60gcMWZZXbDvcWhaXQgxI3DoXN0a3UgcG9obGVkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEodGhhdC5zdW1fY19tZW5hLm1pbnVzKHBhcnNlRGVjaW1hbChpbmZvLmNlbGxJbmZvLmRhdGEuY19tZW5hKSkucGx1cyhwYXJzZURlY2ltYWwodmFsKSkpLmdyZWF0ZXJUaGFuKHBhcnNlRGVjaW1hbCh0aGF0LiRmb3JtVWRhamUuZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgY19tZW5hID0gZGZfY19tZW5hICsgcHJlZHBpc2FrdC5jX21lbmEgLSBzdW1DTWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3R4LmZsYWdzPy52YWxpZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9qZSB0byB2IENaS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc21scGlkLm1lbmEgPT0gSW50ZXJmYWNlLlR5cE1lbnkubmdfbWVuYUNaSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBjdHgudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL3DFmWVwb8SNZXQgbmEgQ1pLIGRsZSB0eXB1IGt1cnp1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc21scGlkLnR5cF9rdXJ6ID09IEludGVyZmFjZS5UeXBLdXJ6dS5uZ190eXBrdXJ6UGV2bnlTbWwgfHwgdGhhdC5zbWxwaWQudHlwX2t1cnogPT0gSW50ZXJmYWNlLlR5cEt1cnp1Lm5nX3R5cGt1cnpQZXZueVN5c3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IChwYXJzZURlY2ltYWwoY3R4LnZhbHVlISkudGltZXModGhhdC5zbWxwaWQua3VyeiA/PyAxKSkuZGl2aWRlZEJ5KHRoYXQuc21scGlkLm0gPz8gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tdXPDrW0gc2kgemppc3RpdCBrdXJ6IHBybyBkYW7DvSByb2sgdiBTTUxTUk9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSAocGFyc2VEZWNpbWFsKGN0eC52YWx1ZSEpLnRpbWVzKHRoYXQuc21scGlkLnNtbHJvaz8ua3VyeiA/PyAxKSkuZGl2aWRlZEJ5KHRoYXQuc21scGlkLnNtbHJvaz8ubSA/PyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFJvenBpcy5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI0MVwiLCAvL1JDIDMzNjAwMjQxIDogxIzDoXN0a2EgcMWZZWRwaXN1IHYgQ1pLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7IC8vZWRpdG9yIGt2xa9saSBwxZllcG/EjXRlbsOtIGRvIENaSyB6IGNfbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sZGthbER0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sZGthbER0b05hbWVzLnJva19zbWwsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNDJcIiwgLy9SQyAzMzYwMDI0MiA6IE9iZG9iw60gcG9sb8W+a3kgRlBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sZGthbER0b05hbWVzLnJva19zbWxcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMuY2lzbG9fc21sLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjQzXCIsIC8vUkMgMzM2MDAyNDMgOiDEjMOtc2xvIHBvbG/Fvmt5IEZQXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbGRrYWxEdG9OYW1lcy5jaXNsb19zbWxcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sZGthbER0b05hbWVzLnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjQ0XCIsIC8vUkMgMzM2MDAyNDQgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxka2FsRHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHttYXg6IDUwfSldXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhbsOtIHRpdHVsa3UgdGFidSBwb2RsZSB0eXB1IGdlbmVyb3bDoW7DrVxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBfZ2VuXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldFRhYlRpdGxlKHR5cF9nZW46IEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cF9nZW4pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLlR5cEdlbmVyb3ZhbmlQcmVkcGlzdS5uZ190eXBnZW5BZ0V4dDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNjAwMjQ1XCI7IC8vUkMgMzM2MDAyNDUgOiBQb8W+YWRhdmt5IG5hIHphbG/FvmVuw60gcMWZZWRwaXN1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5UeXBHZW5lcm92YW5pUHJlZHBpc3UubmdfdHlwZ2VuUm96cGlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAyNDZcIjsgLy9SQyAzMzYwMDI0NiA6IFBvZG3DrW5reSByb3pwaXN1IHDFmWVkcGlzdSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblByZXBvY2V0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAyNDdcIjsgLy9SQyAzMzYwMDI0NyA6IFBvZG3DrW5reSBnZW5lcm92w6Fuw60gcMWZZWRwaXN1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhbsOtIHBvcGlzdSDEjcOhc3RreSBwxZllZHBpc3UgcG9kbGUgdHlwdSBnZW5lcm92w6Fuw61cclxuICAgICAgICAgKiBAcGFyYW0gdHlwX2dlblxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDUHJlZHBMYWJlbCh0eXBfZ2VuOiBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1LCBwb2Nfc3BsYXRlazogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgLy9kw6F2w6Egc215c2wgamVuIHBybyByb3pwaXMsIGFsZSBqZWxpa2/FviBqaW7DvSBmb3JtdWzDocWZIG5pa2R5IG5lbsOtLCB0YWsgdGFrdG8gYnkgbcSbbG8gc3RhxI1pdFxyXG4gICAgICAgICAgICBpZiAodHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcyAmJiBwb2Nfc3BsYXRlayA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAyNDhcIjsgLy9SQyAzMzYwMDI0OCA6IMSMw6FzdGthIHBydm7DrWhvIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAyNDlcIjsgLy9SQyAzMzYwMDI0OSA6IMSMw6FzdGthIHDFmWVkcGlzdSBrIHJvenBpc3VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb8W+ZW7DrSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJGZvcm1VZGFqZS5nZm9ybShcImlzVmFsaWRcIikpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc21sZ2VuLnR5cF9nZW4gPT0gSW50ZXJmYWNlLlR5cEdlbmVyb3ZhbmlQcmVkcGlzdS5uZ190eXBnZW5Sb3pwaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy4kZm9ybVJvenBpcy5nZm9ybShcImlzVmFsaWRcIikpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZm9ybURhdGEgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy4kZm9ybVVkYWplLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZm9ybURhdGEpO1xyXG4gICAgICAgICAgICB2YXIgc2F2ZURhdGE6IEludGVyZmFjZS5HU21sc2thbER0byA9IHsgLi4udGhpcy5zbWxza2FsLCAuLi5mb3JtRGF0YSB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvenBpc0RhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGZvcm1Sb3pwaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCByb3pwaXNEYXRhKTtcclxuICAgICAgICAgICAgICAgIHNhdmVEYXRhID0geyAuLi5zYXZlRGF0YSwgLi4ucm96cGlzRGF0YSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKHNhdmVEYXRhLmZsYWdfREIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxza2FsLnVwZGF0ZVBvaChzYXZlRGF0YSkuZ2V0RGF0YSgpLmRvbmUoKG5ld0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKHsgc21sc2thbDogbmV3RHRvLCBjaGFuZ2VkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoeGhyLCB0eXBlLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidmFsaWRhdGlvblwiICYmIHRoaXMuJGZvcm1VZGFqZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtVWRhamUuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdGlvbnNcIiwgbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtUm96cGlzICYmIHRoaXMuc21sZ2VuLnR5cF9nZW4gPT0gSW50ZXJmYWNlLlR5cEdlbmVyb3ZhbmlQcmVkcGlzdS5uZ190eXBnZW5Sb3pwaXMpIHsgdGhpcy4kZm9ybVJvenBpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNrYWwuY3JlYXRlUG9oKHNhdmVEYXRhKS5nZXREYXRhKCkuZG9uZSgobmV3RHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoeyBzbWxza2FsOiBuZXdEdG8sIGNoYW5nZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKCh4aHIsIHR5cGUsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIgJiYgdGhpcy4kZm9ybVVkYWplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm1VZGFqZS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJGZvcm1Sb3pwaXMgJiYgdGhpcy5zbWxnZW4udHlwX2dlbiA9PSBJbnRlcmZhY2UuVHlwR2VuZXJvdmFuaVByZWRwaXN1Lm5nX3R5cGdlblJvenBpcykgeyB0aGlzLiRmb3JtUm96cGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIG8pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=