namespace Gordic.Leg.WebClient {
    var gcontent = Decorators.gcontent;

    @gcontent
    export class GDetailOsobyLeg extends GDetailBuilderContent<Gordic.Leg.Dialogs.UsedComponentsNew>
        implements IGContent {

        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        DataToFilterPanel: Gordic.Esu.WebClient.GKartotekaFilterDto;

        onContentReady() {
            var that = this;
            console.log("onContentReadyOsoba", this.RezimDetailu);

            that.setRezim(that.RezimDetailu, that);
            // naplnění fields
            that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
        }

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void {
            console.log("build");
            var that = this;

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25500091"; //RC 25500091 : Následující záznam<br>Osoba: {jmeno}
            this.detailMoveComponentPrevTemplate = "jres:25500092"; //RC 25500092 : Předchozí záznam<br>Osoba: {jmeno}

            
            
            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("typ_uca_txt").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); // dostupné pouze v režimu new
            }
            this.enableActions = function (enable: boolean) {
                that.actions["actEsu"]?.enabled(this.Rezim != Gordic.Gin.Interface.RegSpa.GRezimContentu.View);
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
                that.actions["actDelete"]?.enabled(this.Rezim != (Gordic.Gin.Interface.RegSpa.GRezimContentu.New || Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace));
            };

            this.afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions) {
                // návrat na detail ověření
                content.tryClose();
            }
        }

        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;
            console.log("init");

            builder.withComponent<this>("GDetailOsobyLeg", {
                headerForm: this.createHeaderForm(),
                tabs:
                {
                    tabZakladni:
                    {
                        init: function (tab) {
                            that.defaultForm = tab.gform("createFrom", that.createForm());
                        }
                    },
                },
                actions:
                {
                    actRob:
                    {
                        name: "actRob",
                        caption: "ROB",
                        icon: "",
                        visible: false,
                        enabled: false, //zatím není tato možnost v Rob  
                        run: function (this: GAction, ev, ctx) {
                        }
                    },
                    actEsu:
                    {
                        name: "actEsu",
                        caption: "ESU",
                        icon: "gi-esu", // gi-esu
                        enabled: true,
                        run: function (this: GAction, ev, ctx) {
                            var ulice = that.findFields("ulice").gfield("getValue");
                            var jmeno = that.findFields("jmeno").gfield("getValue");
                            var obec;
                            if (that.findFields("obec").gfield("hasValue")) {
                                var val = that.findFields("obec").gfield("getValue");
                                if (val.obec != '') {
                                    obec = val.obec;
                                }
                                else obec = null;
                            }
                            else obec = null;


                            that.call("DataToFilterEsu", { nazev: jmeno, obec: obec, ulice: ulice }).done(function (ev) { //obec: obec.obec,
                                var Logovani = {
                                    Ixp: "0000P000000N",    // "0000X000004J", //ixp null
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu, //kartotekaVMenuAplikace 
                                    AktZnacka: ""
                                }
                                var options;
                                if (jmeno != null || ulice != null || obec != null) { //|| obec.obec != ''
                                    options = {
                                        ID: "ESUKartotekaEsuDlg#",
                                        Ucel: 1,
                                        Logovani: Logovani,
                                        DataToFilterPanel: ev
                                    };
                                }
                                else {
                                    options = {
                                        ID: "ESUKartotekaEsuDlg#",
                                        Ucel: 1,
                                        Logovani: Logovani
                                    };
                                }
                                Gordic.Esu.Dialogs.KartotekaEsuDlg(that, options) //Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain
                                    ?.on(("close"), function (ev, retVal) { //on("close")
                                        if (retVal != null) {
                                            if (retVal.subjekty[0].ixs_esu != "" && retVal.subjekty[0].ixs_esu != null) { // pokud Esu vrati ixs
                                                that.call("NactiOsobuGinsesu", { ixsEsu: retVal.subjekty[0].ixs_esu, l_oOsoba: that.model }) // najdu data pomoci isx_esu
                                                    .done((data) => {
                                                        that.findFields().gfield("model", "apply", data, { initialValues: true }); // projde všechna pole a naplní je z modelu v tomto případě z data
                                                    });

                                            }
                                        }

                                    })
                            });
                        }
                    },
                    actSzrRob: {
                        name: "actSzrRob",
                        caption: "Ověřit v SZR",
                        icon: "gi-iszr",
                        run: function (this: GAction, ev, ctx) {
                            // vytahnu udaje pro nacteni
                            var jmeno = that.findFields("jmeno").gfield("getValue");
                            var prijmeni = that.findFields("prijmeni").gfield("getValue");
                            var datNar = that.findFields("dat_nar").gfield("getValue");
                            var prukazCislo = that.findFields("prukaz_cislo").gfield("getValue");
                            // Typ prukazu - v Esu je jen OP a CP
                            var typPruk = that.findFields("prukaz_typ").gfield("getValue");
                            var typPrukazu = "";
                            if (prukazCislo != 0) {
                                switch (typPruk) {
                                    case "občanský průkaz":
                                        typPrukazu = "ID - občanský průkaz";
                                        break;
                                    case "cestovní doklad":
                                        typPrukazu = "P - cestovní pas";
                                        break;
                                    default:
                                        typPrukazu = "";
                                        break;
                                }
                            }
                            // vytahám údaje pro porovnání
                            let stat_nar = that.findFields("stat_nar").gfield("getValue");
                            let obec = that.findFields("obec").gfield("getValue");
                            let ctvrt = that.findFields("ctvrt").gfield("getValue");
                            let ulice = that.findFields("ulice").gfield("getValue");
                            let cpop = that.findFields("cpop").gfield("getValue");
                            let cor = that.findFields("cor").gfield("getValue");
                            // naplnění GDetailEsuItemsDto
                            var opt = {
                                EditMode: true,
                                esuDto: {
                                    Jmeno: jmeno,
                                    Prijmeni: prijmeni,
                                    DatNar: datNar,
                                    StatSp: stat_nar.stat,
                                    Obec: obec.obec,
                                    CastObce: ctvrt,
                                    Ulice: ulice,
                                    CisloPopisne: cpop,
                                    CisloOrientacni: cor
                                },
                                VyberZRobItemsDto: { Prukaz: prukazCislo, TypPrukazu: typPrukazu }
                            };
                            
                            // volani dialogu
                            Gordic.Esu.Dialogs.VyberZRobDlg(that, opt)?.on("closed", function (ev, retVal) {
                                if (retVal) {
                                    // nactu prukaz pokud nemam
                                    if (prukazCislo != 0) {
                                        that.model.prukaz_cislo = prukazCislo;
                                        that.model.prukaz_typ = typPruk;
                                    }
                                    else if (retVal.AifoText != "") {
                                        that.call("NajdiPrukazDleAIFO", { aifo: retVal.AifoText }).then(function (ev) {
                                            that.model.prukaz_cislo = ev.Item1;
                                            that.model.prukaz_typ = ev.Item2;
                                            that.findFields("prukaz_cislo").gfield("setValue", ev.Item1);
                                            that.findFields("prukaz_typ").gfield("setValue", ev.Item2);
                                        })
                                    }
                                    // ulozim do modelu
                                    that.model.jmeno = that.titleCaseWord(retVal.Jmeno);
                                    that.model.prijmeni = that.titleCaseWord(retVal.Prijmeni);
                                    that.model.dat_nar = retVal.DatNar;
                                    that.model.misto_nar = retVal.MistoNar;

                                    that.model.ulice = retVal.GUlice;
                                    that.model.cpop = retVal.GCisPopisne;
                                    that.model.cor = retVal.GCisOrientacni;
                                    that.model.psc = retVal.PostaKod;
                                    that.model.obec = retVal.GObec;
                                    that.model.ctvrt = retVal.GCastObce;
                                    // naplnim co mam 
                                    that.findFields().gfield("model", "apply", that.model, { initialValues: true });
                                    // naplneni okresu
                                    that.najdiOkres(retVal.MistoNar, "okres_nar");
                                    that.najdiOkres(retVal.GObec, "okres");
                                }
                            })
                        }
                    }
                },
                menuBar: [
                    //{ id: "rob", action: "actRob", favorite: true },
                    { id: "esu", action: "actEsu", favorite: true },
                    { id: "actSzrRob", action: "actSzrRob", favorite: true },
                    { id: "odstranit", action: "actOdstranit", favorite: true }
                ]
            }, true);
        }

        // vrátí první velké ostatní malé
        titleCaseWord(word: string) {
            if (!word) return word;
            return word[0].toUpperCase() + word.substring(1).toLowerCase();
        }

        // najde a vybere první okres pomocí obce a naplni predany field
        najdiOkres(obec, field): void {
            var that = this;
            that.call("NajdiOkres", { obec: obec }).done(function (ev) {
                that.findFields(field).gfield("setValue", ev);
            })
        }
        
        //hlavicka
        createHeaderForm(): Gordic.Forms.Form {
            console.log("hlavicka");
            var that = this;
            
            var form = new Gordic.Forms.Form()
            
                form.addSection({ customClass: "w-L-6 w-M-6", layoutDescriptor: "L-4-8-0, M-6-6-0, S-12-12-0" })
                    .addRow("jres:25500085") //RC 25500085 : Typ osoby

                    .addField("gselectbox", "w-10", { 
                        name: "typ_uca_txt", customClass: "enabled",
                        dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        data: function () {
                            return that.model.list_typ_osoba;
                        },
                            //{ typ_uca: 0, typ_uca_txt: "Neurčeno" },
                            //{ typ_uca: 10, typ_uca_txt: "Žadatel" },
                            //{ typ_uca: 20, typ_uca_txt: "Svědek legalizace" },
                            //{ typ_uca: 30, typ_uca_txt: "Osoba na pokladní doklad" },
                            //{ typ_uca: 10, typ_uca_txt: "Osoba jejíž podpis je legalizován" }
                    })

                    .addRow("jres:25500067") //RC 25500067 : Průkaz
                    .addField("gselectbox", "w-10", {
                        name: "prukaz_typ", customClass: "enabled",
                        dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        data: function () {
                            return that.model.list_prukaz
                        },
                    })
                    .addRow("jres:25500068") //RC 25500068 : Číslo
                    .addField("gnumberbox", "w-10", { name: "prukaz_cislo", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" })

                    //.addSection()
                    .addSection({ name: "sec_doklad", customClass: "w-L-6 w-M-6", layoutDescriptor: "L-3-9-0, M-4-8-0, S-12-12-0" })
                    .addRow("jres:25500069") //RC 25500069 : Dne
                    .addField("gdatebox", "w-10", { name: "prukaz_dat_vyd", customClass: "enabled" })
                    .addRow("jres:25500070") //RC 25500070 : Vydal
                    .addField("gstringbox", "w-10", { name: "prukaz_vydal", customClass: "enabled" })

            return form;
        }

        //hlavni form
        createForm(): Gordic.Forms.Form {
            console.log("createFormOsoba");
            var that = this;

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" })

                .addSection("jres:25500046") //RC 25500046 : Základní informace
                .addRow("jres:25500047") //RC 25500047 : Rodné číslo
                .addField("gstringbox", "w-10", {
                    name: "rc", customClass: "enabled",
                    validators: [new Gordic.Validators.RodneCislo()],
                    change: function () {
                        var rc = that.findFields("rc").gfield("getValue");
                        that.call("ZiskejDatumNarozeniZRc", { rc: rc }).done(function (ev) {
                            that.findFields("dat_nar").gfield("setValue", ev);
                        })
                    }
                })
                .addRow("jres:25500048") //RC 25500048 : Tit. před jménem
                .addField("gstringbox", "w-10", { name: "tit_pred", customClass: "enabled" })
                .addRow("jres:25500049") //RC 25500049 : Jméno / Firma
                .addField("gstringbox", "w-10", { name: "jmeno", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" })
                .addRow("jres:25500050") //RC 25500050 : Příjmení
                .addField("gstringbox", "w-10", { name: "prijmeni", customClass: "enabled" })
                .addRow("jres:25500051") //RC 25500051 : Tit. za jménem
                .addField("gstringbox", "w-10", { name: "tit_za", customClass: "enabled" })
                .addRow("jres:25500052") //RC 25500052 : Rodné příjmení
                .addField("gstringbox", "w-10", { name: "rod_prij", customClass: "enabled" })
                .addRow("jres:25500053") //RC 25500053 : Datum narození
                .addField("gdatebox", "w-10", { name: "dat_nar", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" })
                .addRow("jres:25500054") //RC 25500054 : Místo narození
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robsobn(), {
                    name: "misto_nar", customClass: "enabled", flag: "requied", invalidTransform: function (strValue) {
                        if (typeof strValue === "string")
                            return { obec: strValue };
                        return strValue;

                    }, validators: [new Gordic.Validators.Required(), {
                        validate: (value) => {
                            if (value.obec == '') { return false; }
                            if (value == null) { return false; }
                            if (value.obec == null) { return false; }
                            else { return true; }
                        }
                    }], model: "model.misto_nar=value.obec", strict: false,
                    change: function (ev, changeObj) {
                        var okresField = that.findFields("okres_nar");
                        if (changeObj.value != null && okresField.gfield("getValue") == null) {
                            okresField.gfield("setValue", changeObj.value.okres);
                        }
                    }
                })
                .addRow("jres:25500055") //RC 25500055 : Okres narození
                .addField("gstringbox", "w-10", { name: "okres_nar", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" }) // ve starém automatické vyplnění
                .addRow("jres:25500056") //RC 25500056 : Stát narození
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.gincsta(), { name: "stat_nar", model: "model.stat_nar=value.stat", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" }) // gint16

                .addSection("jres:25500057") //RC 25500057 : Adresa
                .addRow("jres:25500058") //RC 25500058 : Ulice
                .addField("gstringbox", "w-10", { name: "ulice", customClass: "enabled" })
                .addRow("jres:25500059") //RC 25500059 : Číslo domu (Č.p.), (Č.o.)
                .addField("gstringbox", "w-5", { name: "cpop", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" })
                .addField("gstringbox", "w-5", { name: "cor", customClass: "enabled" })
                .addRow("jres:25500060") //RC 25500060 : Část obce
                .addField("gstringbox", "w-10", { name: "ctvrt", customClass: "enabled" })
                .addRow("jres:25500061") //RC 25500061 : PSČ
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.ginspsc(), { name: "psc", model: "model.psc=value.psc", customClass: "enabled", strict: false }) //validators: [new Gordic.Validators.Required()], flag: "requied"
                .addRow("jres:25500062") //RC 25500062 : Obec
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.robsobn(), {
                    name: "obec", customClass: "enabled", flag: "requied", invalidTransform: function (strValue) {
                        if (typeof strValue === "string")
                            return { obec: strValue };
                        return strValue;

                    }, validators: [new Gordic.Validators.Required(), {
                        validate: (value) => {
                            if (value.obec == '') { return false; }
                            if (value == null) { return false; }
                            if (value.obec == null) { return false; }
                            else { return true; }
                        }
                    }], model: "model.obec=value.obec", strict: false,
                    change: function (ev, changeObj) {
                        var okresField = that.findFields("okres");
                        if (changeObj.value != null && okresField.gfield("getValue") == null) {
                            okresField.gfield("setValue", changeObj.value.okres);
                        }
                    }
                }) // Gordic.Rob.Client GReaderRobsobn
                .addRow("jres:25500063") //RC 25500063 : Okres
                .addField("gstringbox", "w-10", { name: "okres", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" }) // ve starém automatické vyplnění
                .addRow("jres:25500064") //RC 25500064 : Stát
                .addField("gselectbox", "w-10", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat", customClass: "enabled", validators: [new Gordic.Validators.Required()], flag: "requied" }) // gint16
                .addRow("jres:25500065") //RC 25500065 : Typ pobytu
                .addField("gselectbox", "w-10", {
                    name: "poznamka", //model: "poznamka=value.poznamka",
                    dropdown: true, customClass: "enabled", data: function () {
                        return that.model.list_adresa;
                    },
                    validators: [new Gordic.Validators.Required()]
                })

            return form;
        }
                
    }
}