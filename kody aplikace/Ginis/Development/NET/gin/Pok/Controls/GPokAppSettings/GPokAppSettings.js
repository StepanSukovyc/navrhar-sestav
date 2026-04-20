"use strict";
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var GPokAppSettings;
        (function (GPokAppSettings) {
            function DefiniceFormulare(GinGenIxp) {
                const protokoly = new Gordic.Data.View([
                    { key: 10, popis: "Monet+ Gapa" },
                    { key: 20, popis: "GPE" },
                    { key: 30, popis: "Sonet - HyperCom" },
                    { key: 40, popis: "DotyPay" },
                    { key: 50, popis: "Comgate" }
                ], { key: "key" });
                let form = new Gordic.Forms
                    .Form({ name: "pokSetting", tabOptions: { title: "Nastavení", opened: true } })
                    .addSection("jres:31302327") //RC 31302327 : Přednastavený ESU
                    .addRow("jres:31302119") //RC 31302119 : Externí subjekt
                    .addField("gselectbox", {
                    name: "prednastavenyEsu",
                    model: "Pok.Nastaveni.PrednastavenyEsu=ixs_esu"
                }, Gordic.Esu.Prefabs.vyberEsu({
                    typ: 1, Logovani: {
                        Ixp: "0000X0000003",
                        DuvodHledaniTxt: "Lokální nastavení - přednastavený ESU",
                        AktZnacka: 'aktZnacka',
                        DuvodHledani: 40
                    }
                }))
                    .addSection("jres:31302328") //RC 31302328 : Přednastavená kontace
                    .addRow("jres:31302329") //RC 31302329 : Kód kontace
                    .addField("gstringbox", { name: "ixpKontace", model: "Pok.Nastaveni.IxpKontace = value" })
                    .addSection("jres:31302330") //RC 31302330 : Tisk pokladních dokladů
                    .addRow("jres:31302331") //RC 31302331 : Počet kopií - příjmový
                    .addField("gnumberbox", { name: "pocKopii", model: "Pok.Nastaveni.PocKopii = value", decimals: 0, returnType: "number" })
                    .addRow("jres:31302332") //RC 31302332 : Počet kopií - výdajový
                    .addField("gnumberbox", { name: "pocKopiiVydajovy", model: "Pok.Nastaveni.PocKopiiVydajovy = value" })
                    //.addRow("jres:31302333") //RC 31302333 : Odstránkování
                    .addField("gcheck", { name: "odstrankovani", label: "jres:31302333", model: "Pok.Nastaveni.Odstrankovani = value" })
                    .addSection("jres:31302334") //RC 31302334 : Nastavení pokladny
                    .addRow("jres:31302335") //RC 31302335 : Datum salda DDP
                    .addField("gdatebox", { name: "datSaldaDdp", model: "Pok.Nastaveni.DatSaldaDdp = value" })
                    .addRow("jres:31302336") //RC 31302336 : Identifikátor dokl.
                    .addField("gstringbox", { name: "pidDokladu", model: "Pok.Nastaveni.PidDokladu = value" })
                    // .addRow("jres:31302337") //RC 31302337 : Kontrola vyplatitelnosti částku v dokladu
                    .addField("gcheck", { name: "kontrolVyplatitelnost", label: "jres:31302337", model: "Pok.Nastaveni.KontrolVyplatitelnost = value" })
                    //  .addRow("jres:31302338") //RC 31302338 : Při evidenci aut. mazat řádky pokladního dokladu bez uvedené předkontace
                    .addField("gcheck", { name: "mazatBezKontace", label: "jres:31302338", model: "Pok.Nastaveni.MazatBezKontace = value" })
                    //    .addRow("jres:31302339") //RC 31302339 : Při evidenci aut. mazat řádky pokladního dokladu s nulovou částkou
                    .addField("gcheck", { name: "mazatBezCastky", label: "jres:31302339", model: "Pok.Nastaveni.MazatBezCastky = value" })
                    //   .addRow("jres:31302340") //RC 31302340 : Automatické načtení seznamu bankovních plateb při otevření formuláře
                    .addField("gcheck", { name: "autNacteniBankPlateb", label: "jres:31302340", model: "Pok.Nastaveni.AutNacteniBankPlateb = value" })
                    //   .addRow("jres:31302341") //RC 31302341 : Automatické načtení seznamu pokladních dokladů při otevření formuláře
                    .addField("gcheck", { name: "autNacteniSezDokladu", label: "jres:31302341", model: "Pok.Nastaveni.AutNacteniSezDokladu = value" })
                    //  .addRow("jres:31302342") //RC 31302342 : Automatické načtení seznamu smluv při otevření formuláře
                    .addField("gcheck", { name: "autNacteniSmluv", label: "jres:31302342", model: "Pok.Nastaveni.AutNacteniSmluv = value" })
                    //     .addRow("jres:31302343") //RC 31302343 : Nastavení vzhledu seznamu pokladních položek ukládat pro aktuální knihu
                    .addField("gcheck", { name: "gridProKnihu", label: "jres:31302343", model: "Pok.Nastaveni.GridProKnihu = value" })
                    //.addRow("jres:31302344") //RC 31302344 : Automaticky uzavřít okno se zadáním pidu po vyplnění
                    .addField("gcheck", { name: "uzavritPid", label: "jres:31302344", model: "Pok.Nastaveni.UzavritPid = value" })
                    //Automaticky plnit do hlavičky pok. dokladu externí subjekt z případu SML
                    .addField("gcheck", { name: "autSubjektSmlouva", label: "Automaticky plnit do hlavičky pok. dokladu externí subjekt z případu SML", model: "Pok.Nastaveni.AutSubjektSmlouva = value" })
                    //Automaticky plnit do popisu pokladního dokladu popis z případu SML
                    .addField("gcheck", { name: "autPopisSmlouvy", label: "Automaticky plnit do popisu pokladního dokladu popis z případu SML", model: "Pok.Nastaveni.AutPopisSmlouvy = value" })
                    .addRow("jres:31302345") //RC 31302345 : Výchozí políčko na dokladu
                    .addField("gselectbox", {
                    name: "vychoziFocus",
                    model: "Pok.Nastaveni.VychoziFocus=value.key",
                    data: new Gordic.Data.View([
                        { key: 10, popis: "Popis" },
                        { key: 20, popis: "Ico" },
                        { key: 30, popis: "Dic" },
                        { key: 40, popis: "Rc" },
                        { key: 50, popis: "Oc" },
                        { key: 60, popis: "Název ESU" },
                        { key: 70, popis: "Ns" },
                        { key: 80, popis: "Typ dokladu" },
                        { key: 90, popis: "Druh dokladu" }
                    ], { key: "key" }),
                    dropdown: true,
                    itemTemplate: "{popis}"
                })
                    .addRow("jres:31302346") //RC 31302346 : Výchozí políčko v oč. platbách
                    .addField("gselectbox", {
                    name: "vychoziFocusOcPlatby",
                    model: "Pok.Nastaveni.VychoziFocusOcPlatby=value.key",
                    data: new Gordic.Data.View([
                        { key: 10, popis: "Ico" },
                        { key: 20, popis: "Rc" },
                        { key: 30, popis: "Název" },
                        { key: 40, popis: "Agenda" },
                        { key: 50, popis: "Ulice" },
                        { key: 60, popis: "Číslo popisné" },
                        { key: 70, popis: "Ag. číslo" },
                        { key: 80, popis: "Typ pohl. DDP" },
                        { key: 90, popis: "Vs" },
                        { key: 100, popis: "Ss" },
                        { key: 110, popis: "Ks" },
                        { key: 120, popis: "Kategorie platby" },
                        { key: 130, popis: "Datum splatnosti od" },
                        { key: 140, popis: "Datum splatnosti do" },
                        { key: 150, popis: "Směr platby" },
                        { key: 160, popis: "Měna" },
                        { key: 170, popis: "Popis předpisu" },
                        { key: 180, popis: "Způsob platby" },
                        { key: 190, popis: "Číslo orientační" },
                        { key: 200, popis: "Obec" },
                        { key: 210, popis: "Část obce" },
                        { key: 220, popis: "Popis případu" }
                    ], { key: "key" }),
                    dropdown: true,
                    itemTemplate: "{popis}"
                })
                    .addSection("Platební terminály")
                    .addRow("Terminál 1 - Prokotol/Terminál ID/Popis")
                    .addField("gselectbox", "w-3", {
                    name: "terminalProtokol1",
                    model: "Pok.Nastaveni.TerminalProtokol1 = value.key",
                    data: protokoly,
                    dropdown: true,
                    itemTemplate: "{popis}",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalPosId1").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.bucskap(), {
                    name: "terminalPosId1",
                    model: "Pok.Nastaveni.TerminalPosId1 = value.pos_id",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit ID terminálu!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalProtokol1").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gstringbox", "w-4", { name: "terminalPopis1", model: "Pok.Nastaveni.TerminalPopis1 = value" })
                    .addField("gcheck", "w-2", {
                    name: "terminalPosVisible1",
                    label: "Vybrat",
                    model: "Pok.Nastaveni.TerminalPosVisible1 = value",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol a ID terminálu!",
                            validate: function (value, source) {
                                if (value == true) {
                                    let content = $.content(source);
                                    let secondValue = content.findFields("terminalPosId1").gfield("getValue");
                                    let secondValueTwo = content.findFields("terminalProtokol1").gfield("getValue");
                                    if (secondValue == null && secondValueTwo == null) {
                                        content.showFlash({ id: "flashError", icon: "", label: "Nelze vybrat, nejsou vyplněny povinné údaje terminálu.", customClass: "g-state-error" });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        })]
                })
                    .addRow("Terminál 2 - Prokotol/Terminál ID/Popis")
                    .addField("gselectbox", "w-3", {
                    name: "terminalProtokol2",
                    model: "Pok.Nastaveni.TerminalProtokol2 = value.key",
                    data: protokoly,
                    dropdown: true,
                    itemTemplate: "{popis}",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalPosId2").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.bucskap(), {
                    name: "terminalPosId2",
                    model: "Pok.Nastaveni.TerminalPosId2 = value.pos_id",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit ID terminálu!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalProtokol2").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gstringbox", "w-4", { name: "terminalPopis2", model: "Pok.Nastaveni.TerminalPopis2 = value" })
                    .addField("gcheck", "w-2", {
                    name: "terminalPosVisible2",
                    label: "Vybrat",
                    model: "Pok.Nastaveni.TerminalPosVisible2 = value",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol a ID terminálu!",
                            validate: function (value, source) {
                                if (value == true) {
                                    let content = $.content(source);
                                    let secondValue = content.findFields("terminalPosId2").gfield("getValue");
                                    let secondValueTwo = content.findFields("terminalProtokol2").gfield("getValue");
                                    if (secondValue == null && secondValueTwo == null) {
                                        content.showFlash({ id: "flashError", icon: "", label: "Nelze vybrat, nejsou vyplněny povinné údaje terminálu.", customClass: "g-state-error" });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        })]
                })
                    .addRow("Terminál 3 - Prokotol/Terminál ID/Popis")
                    .addField("gselectbox", "w-3", {
                    name: "terminalProtokol3",
                    model: "Pok.Nastaveni.TerminalProtokol3 = value.key",
                    data: protokoly,
                    dropdown: true,
                    itemTemplate: "{popis}",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalPosId3").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.bucskap(), {
                    name: "terminalPosId3",
                    model: "Pok.Nastaveni.TerminalPosId3 = value.pos_id",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit ID terminálu!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalProtokol3").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gstringbox", "w-4", { name: "terminalPopis3", model: "Pok.Nastaveni.TerminalPopis3 = value" })
                    .addField("gcheck", "w-2", {
                    name: "terminalPosVisible3",
                    label: "Vybrat",
                    model: "Pok.Nastaveni.TerminalPosVisible3 = value",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol a ID terminálu!",
                            validate: function (value, source) {
                                if (value == true) {
                                    let content = $.content(source);
                                    let secondValue = content.findFields("terminalPosId3").gfield("getValue");
                                    let secondValueTwo = content.findFields("terminalProtokol3").gfield("getValue");
                                    if (secondValue == null && secondValueTwo == null) {
                                        content.showFlash({ id: "flashError", icon: "", label: "Nelze vybrat, nejsou vyplněny povinné údaje terminálu.", customClass: "g-state-error" });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        })]
                })
                    .addRow("Terminál 4 - Prokotol/Terminál ID/Popis")
                    .addField("gselectbox", "w-3", {
                    name: "terminalProtokol4",
                    model: "Pok.Nastaveni.TerminalProtokol4 = value.key",
                    data: protokoly,
                    dropdown: true,
                    itemTemplate: "{popis}",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalPosId4").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.bucskap(), {
                    name: "terminalPosId4",
                    model: "Pok.Nastaveni.TerminalPosId4 = value.pos_id",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit ID terminálu!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalProtokol4").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gstringbox", "w-4", { name: "terminalPopis4", model: "Pok.Nastaveni.TerminalPopis4 = value" })
                    .addField("gcheck", "w-2", {
                    name: "terminalPosVisible4",
                    label: "Vybrat",
                    model: "Pok.Nastaveni.TerminalPosVisible4 = value",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol a ID terminálu!",
                            validate: function (value, source) {
                                if (value == true) {
                                    let content = $.content(source);
                                    let secondValue = content.findFields("terminalPosId4").gfield("getValue");
                                    let secondValueTwo = content.findFields("terminalProtokol4").gfield("getValue");
                                    if (secondValue == null && secondValueTwo == null) {
                                        content.showFlash({ id: "flashError", icon: "", label: "Nelze vybrat, nejsou vyplněny povinné údaje terminálu.", customClass: "g-state-error" });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        })]
                })
                    .addRow("Terminál 5 - Prokotol/Terminál ID/Popis")
                    .addField("gselectbox", "w-3", {
                    name: "terminalProtokol5",
                    model: "Pok.Nastaveni.TerminalProtokol5 = value.key",
                    data: protokoly,
                    dropdown: true,
                    itemTemplate: "{popis}",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalPosId5").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.bucskap(), {
                    name: "terminalPosId5",
                    model: "Pok.Nastaveni.TerminalPosId5 = value.pos_id",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit ID terminálu!",
                            validate: function (value, source) {
                                let content = $.content(source);
                                let secondValue = content.findFields("terminalProtokol5").gfield("getValue");
                                if (secondValue != null && value == null) {
                                    return false;
                                }
                                return true;
                            }
                        })]
                })
                    .addField("gstringbox", "w-4", { name: "terminalPopis5", model: "Pok.Nastaveni.TerminalPopis5 = value" })
                    .addField("gcheck", "w-2", {
                    name: "terminalPosVisible5",
                    label: "Vybrat",
                    model: "Pok.Nastaveni.TerminalPosVisible5 = value",
                    validators: [new Gordic.Validators.Base({
                            message: "Je nutné vyplnit protokol a ID terminálu!",
                            validate: function (value, source) {
                                if (value == true) {
                                    let content = $.content(source);
                                    let secondValue = content.findFields("terminalPosId5").gfield("getValue");
                                    let secondValueTwo = content.findFields("terminalProtokol5").gfield("getValue");
                                    if (secondValue == null && secondValueTwo == null) {
                                        content.showFlash({ id: "flashError", icon: "", label: "Nelze vybrat, nejsou vyplněny povinné údaje terminálu.", customClass: "g-state-error" });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        })]
                })
                    .addRow()
                    .addField("gcheck", { name: "terminalTestovaci", label: "Přidat do výběru platebních terminálů testovací virtuální terminály", model: "Pok.Nastaveni.TerminalTestovaci = value" });
                //.addSection("jres:31302347") //RC 31302347 : Automatické vytvoření položky na dokladu po podání
                //.addRow({ label: "Možnosti" }
                //.addField("gradio", {
                //    name: "autoPol",
                //    model: "Pok.Nastaveni.AutoPol=value",
                //    itemClass: "",
                //    // initialValue: this.model.autoPol,
                //    radios: [
                //        { value: '10', label: 'Nevytvářet' },
                //        { value: '20', label: 'Otevřít kontace' },
                //        { value: '30', label: 'Otevřít oč. platby' }
                //    ]
                //});
                form.addSection("Diagnostika konektorů")
                    .addField("gbutton", "", {
                    params: {
                        action: new GAction({
                            caption: "NATHAN",
                            customClass: "",
                            name: 'actPokDiagnostikaNathan', run: (ev, ctx) => {
                                let content = $.content();
                                content.beginOperation("Diagnostika konektoru NATHAN");
                                content.isl.PokDoklad.test({ typtest: 2 }).get()
                                    .done(function (retVal) {
                                    Gordic.Gin.WebClient.CreateAibConnectorDialog(retVal);
                                })
                                    .always(function () {
                                    content.endOperation();
                                });
                            }
                        })
                    }
                })
                    .addField("gbutton", "", {
                    params: {
                        action: new GAction({
                            caption: "Brána platebních terminálů",
                            customClass: "",
                            name: 'actPokDiagnostikaBrana', run: (ev, ctx) => {
                                let content = $.content();
                                content.beginOperation("Diagnostika brány platebních terminálů");
                                content.isl.PokDoklad.test({ typtest: 1 }).get()
                                    .done(function (retVal) {
                                    Gordic.Gin.WebClient.CreateAibConnectorDialog(retVal);
                                })
                                    .always(function () {
                                    content.endOperation();
                                });
                            }
                        })
                    }
                });
                let report = Gordic.Report.WebClient.GReportsUserSettings();
                let elSoubory = Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm();
                let color = Gordic.Wfl.AppSettings.ColorPickerSettingsForm();
                let sejmuti = Gordic.Eko.Utils.EkoUserSettingsPid(GinGenIxp);
                let book = Gordic.Eko.Utils.EkoUserSettingsEkoBook();
                let test = Gordic.Eko.Utils.EkoUserSettingsList();
                //
                return [report, elSoubory, color, sejmuti, book, test, form];
            }
            GPokAppSettings.DefiniceFormulare = DefiniceFormulare;
        })(GPokAppSettings = Pok.GPokAppSettings || (Pok.GPokAppSettings = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0FwcFNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0FwcFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0F1Z0JmO0FBdmdCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1Z0JuQjtJQXZnQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsZUFBZSxDQXVnQm5DO1FBdmdCb0IsV0FBQSxlQUFlO1lBRWhDLFNBQWdCLGlCQUFpQixDQUFDLFNBQWlCO2dCQUUvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNsQztvQkFDQSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtvQkFDakMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7b0JBQ3pCLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7b0JBQ3RDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO29CQUM3QixFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtpQkFBQyxFQUU5QixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUdwQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3FCQUN0QixJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFTLENBQUM7cUJBQ3JGLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxpQ0FBaUM7cUJBQzdELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywrQkFBK0I7cUJBQ3ZELFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0JBQ3BCLElBQUksRUFB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TUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDckQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFFbEQsRUFBRTtnQkFFRixPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakUsQ0FBQztZQXBnQmUsaUNBQWlCLG9CQW9nQmhDLENBQUE7UUFDTCxDQUFDLEVBdmdCb0IsZUFBZSxHQUFmLG1CQUFlLEtBQWYsbUJBQWUsUUF1Z0JuQztJQUFELENBQUMsRUF2Z0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1Z0JuQjtBQUFELENBQUMsRUF2Z0JTLE1BQU0sS0FBTixNQUFNLFFBdWdCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLkdQb2tBcHBTZXR0aW5ncyB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERlZmluaWNlRm9ybXVsYXJlKEdpbkdlbkl4cDogc3RyaW5nKTogRm9ybXMuRm9ybVtdIHsgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IHByb3Rva29seSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHsga2V5OiAxMCwgcG9waXM6IFwiTW9uZXQrIEdhcGFcIiB9LFxyXG4gICAgICAgICAgICB7IGtleTogMjAsIHBvcGlzOiBcIkdQRVwiIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiAzMCwgcG9waXM6IFwiU29uZXQgLSBIeXBlckNvbVwiIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiA0MCwgcG9waXM6IFwiRG90eVBheVwiIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiA1MCwgcG9waXM6IFwiQ29tZ2F0ZVwiIH1dLFxyXG5cclxuICAgICAgICAgICAgeyBrZXk6IFwia2V5XCIgfSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLkZvcm0oeyBuYW1lOiBcInBva1NldHRpbmdcIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJOYXN0YXZlbsOtXCIsIG9wZW5lZDogdHJ1ZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIzMjdcIikgLy9SQyAzMTMwMjMyNyA6IFDFmWVkbmFzdGF2ZW7DvSBFU1VcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIxMTlcIikgLy9SQyAzMTMwMjExOSA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZWRuYXN0YXZlbnlFc3VcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuUHJlZG5hc3RhdmVueUVzdT1peHNfZXN1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwOiAxLCBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IFwiMDAwMFgwMDAwMDAzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJMb2vDoWxuw60gbmFzdGF2ZW7DrSAtIHDFmWVkbmFzdGF2ZW7DvSBFU1VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiAnYWt0Wm5hY2thJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiA0MFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIzMjhcIikgLy9SQyAzMTMwMjMyOCA6IFDFmWVkbmFzdGF2ZW7DoSBrb250YWNlXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzI5XCIpIC8vUkMgMzEzMDIzMjkgOiBLw7NkIGtvbnRhY2VcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhwS29udGFjZVwiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLkl4cEtvbnRhY2UgPSB2YWx1ZVwifSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyMzMwXCIpIC8vUkMgMzEzMDIzMzAgOiBUaXNrIHBva2xhZG7DrWNoIGRva2xhZMWvXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzMxXCIpIC8vUkMgMzEzMDIzMzEgOiBQb8SNZXQga29wacOtIC0gcMWZw61qbW92w71cclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwicG9jS29waWlcIiwgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5Qb2NLb3BpaSA9IHZhbHVlXCIsIGRlY2ltYWxzOiAwLCByZXR1cm5UeXBlOiBcIm51bWJlclwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzMyXCIpIC8vUkMgMzEzMDIzMzIgOiBQb8SNZXQga29wacOtIC0gdsO9ZGFqb3bDvVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJwb2NLb3BpaVZ5ZGFqb3Z5XCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuUG9jS29waWlWeWRham92eSA9IHZhbHVlXCIgfSlcclxuICAgICAgICAgICAgLy8uYWRkUm93KFwianJlczozMTMwMjMzM1wiKSAvL1JDIDMxMzAyMzMzIDogT2RzdHLDoW5rb3bDoW7DrVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcIm9kc3RyYW5rb3ZhbmlcIiwgbGFiZWw6IFwianJlczozMTMwMjMzM1wiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLk9kc3RyYW5rb3ZhbmkgPSB2YWx1ZVwifSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyMzM0XCIpIC8vUkMgMzEzMDIzMzQgOiBOYXN0YXZlbsOtIHBva2xhZG55XHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzM1XCIpIC8vUkMgMzEzMDIzMzUgOiBEYXR1bSBzYWxkYSBERFBcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdFNhbGRhRGRwXCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuRGF0U2FsZGFEZHAgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzM2XCIpIC8vUkMgMzEzMDIzMzYgOiBJZGVudGlmaWvDoXRvciBkb2tsLlxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwaWREb2tsYWR1XCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuUGlkRG9rbGFkdSA9IHZhbHVlXCIgfSlcclxuICAgICAgICAgICAgLy8gLmFkZFJvdyhcImpyZXM6MzEzMDIzMzdcIikgLy9SQyAzMTMwMjMzNyA6IEtvbnRyb2xhIHZ5cGxhdGl0ZWxub3N0aSDEjcOhc3RrdSB2IGRva2xhZHVcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJrb250cm9sVnlwbGF0aXRlbG5vc3RcIiwgbGFiZWw6IFwianJlczozMTMwMjMzN1wiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLktvbnRyb2xWeXBsYXRpdGVsbm9zdCA9IHZhbHVlXCIgIH0pXHJcbiAgICAgICAgICAgIC8vICAuYWRkUm93KFwianJlczozMTMwMjMzOFwiKSAvL1JDIDMxMzAyMzM4IDogUMWZaSBldmlkZW5jaSBhdXQuIG1hemF0IMWZw6Fka3kgcG9rbGFkbsOtaG8gZG9rbGFkdSBiZXogdXZlZGVuw6kgcMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwibWF6YXRCZXpLb250YWNlXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIzMzhcIiwgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5NYXphdEJlektvbnRhY2UgPSB2YWx1ZVwiICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwianJlczozMTMwMjMzOVwiKSAvL1JDIDMxMzAyMzM5IDogUMWZaSBldmlkZW5jaSBhdXQuIG1hemF0IMWZw6Fka3kgcG9rbGFkbsOtaG8gZG9rbGFkdSBzIG51bG92b3UgxI3DoXN0a291XHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwibWF6YXRCZXpDYXN0a3lcIiwgbGFiZWw6IFwianJlczozMTMwMjMzOVwiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLk1hemF0QmV6Q2FzdGt5ID0gdmFsdWVcIiB9KVxyXG4gICAgICAgICAgICAvLyAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzQwXCIpIC8vUkMgMzEzMDIzNDAgOiBBdXRvbWF0aWNrw6kgbmHEjXRlbsOtIHNlem5hbXUgYmFua292bsOtY2ggcGxhdGViIHDFmWkgb3RldsWZZW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcImF1dE5hY3RlbmlCYW5rUGxhdGViXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIzNDBcIiwgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5BdXROYWN0ZW5pQmFua1BsYXRlYiA9IHZhbHVlXCIgIH0pXHJcbiAgICAgICAgICAgIC8vICAgLmFkZFJvdyhcImpyZXM6MzEzMDIzNDFcIikgLy9SQyAzMTMwMjM0MSA6IEF1dG9tYXRpY2vDqSBuYcSNdGVuw60gc2V6bmFtdSBwb2tsYWRuw61jaCBkb2tsYWTFryBwxZlpIG90ZXbFmWVuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJhdXROYWN0ZW5pU2V6RG9rbGFkdVwiLCBsYWJlbDogXCJqcmVzOjMxMzAyMzQxXCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuQXV0TmFjdGVuaVNlekRva2xhZHUgPSB2YWx1ZVwiICB9KVxyXG4gICAgICAgICAgICAvLyAgLmFkZFJvdyhcImpyZXM6MzEzMDIzNDJcIikgLy9SQyAzMTMwMjM0MiA6IEF1dG9tYXRpY2vDqSBuYcSNdGVuw60gc2V6bmFtdSBzbWx1diBwxZlpIG90ZXbFmWVuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJhdXROYWN0ZW5pU21sdXZcIiwgbGFiZWw6IFwianJlczozMTMwMjM0MlwiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLkF1dE5hY3RlbmlTbWx1diA9IHZhbHVlXCIgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAuYWRkUm93KFwianJlczozMTMwMjM0M1wiKSAvL1JDIDMxMzAyMzQzIDogTmFzdGF2ZW7DrSB2emhsZWR1IHNlem5hbXUgcG9rbGFkbsOtY2ggcG9sb8W+ZWsgdWtsw6FkYXQgcHJvIGFrdHXDoWxuw60ga25paHVcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJncmlkUHJvS25paHVcIiwgbGFiZWw6IFwianJlczozMTMwMjM0M1wiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLkdyaWRQcm9LbmlodSA9IHZhbHVlXCIgIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZFJvdyhcImpyZXM6MzEzMDIzNDRcIikgLy9SQyAzMTMwMjM0NCA6IEF1dG9tYXRpY2t5IHV6YXbFmcOtdCBva25vIHNlIHphZMOhbsOtbSBwaWR1IHBvIHZ5cGxuxJtuw61cclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ1emF2cml0UGlkXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIzNDRcIiwgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5VemF2cml0UGlkID0gdmFsdWVcIiB9KVxyXG4gICAgICAgICAgICAvL0F1dG9tYXRpY2t5IHBsbml0IGRvIGhsYXZpxI1reSBwb2suIGRva2xhZHUgZXh0ZXJuw60gc3ViamVrdCB6IHDFmcOtcGFkdSBTTUxcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJhdXRTdWJqZWt0U21sb3V2YVwiLCBsYWJlbDogXCJBdXRvbWF0aWNreSBwbG5pdCBkbyBobGF2acSNa3kgcG9rLiBkb2tsYWR1IGV4dGVybsOtIHN1Ympla3QgeiBwxZnDrXBhZHUgU01MXCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuQXV0U3ViamVrdFNtbG91dmEgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC8vQXV0b21hdGlja3kgcGxuaXQgZG8gcG9waXN1IHBva2xhZG7DrWhvIGRva2xhZHUgcG9waXMgeiBwxZnDrXBhZHUgU01MXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiYXV0UG9waXNTbWxvdXZ5XCIsIGxhYmVsOiBcIkF1dG9tYXRpY2t5IHBsbml0IGRvIHBvcGlzdSBwb2tsYWRuw61obyBkb2tsYWR1IHBvcGlzIHogcMWZw61wYWR1IFNNTFwiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLkF1dFBvcGlzU21sb3V2eSA9IHZhbHVlXCIgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjM0NVwiKSAvL1JDIDMxMzAyMzQ1IDogVsO9Y2hvesOtIHBvbMOtxI1rbyBuYSBkb2tsYWR1XHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2eWNob3ppRm9jdXNcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVnljaG96aUZvY3VzPXZhbHVlLmtleVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAxMCwgcG9waXM6IFwiUG9waXNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAyMCwgcG9waXM6IFwiSWNvXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogMzAsIHBvcGlzOiBcIkRpY1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDQwLCBwb3BpczogXCJSY1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDUwLCBwb3BpczogXCJPY1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDYwLCBwb3BpczogXCJOw6F6ZXYgRVNVXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogNzAsIHBvcGlzOiBcIk5zXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogODAsIHBvcGlzOiBcIlR5cCBkb2tsYWR1XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogOTAsIHBvcGlzOiBcIkRydWggZG9rbGFkdVwiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBcImtleVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMzQ2XCIpIC8vUkMgMzEzMDIzNDYgOiBWw71jaG96w60gcG9sw63EjWtvIHYgb8SNLiBwbGF0YsOhY2hcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWNob3ppRm9jdXNPY1BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVnljaG96aUZvY3VzT2NQbGF0Ynk9dmFsdWUua2V5XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDEwLCBwb3BpczogXCJJY29cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMjAsIHBvcGlzOiBcIlJjXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDMwLCBwb3BpczogXCJOw6F6ZXZcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogNDAsIHBvcGlzOiBcIkFnZW5kYVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiA1MCwgcG9waXM6IFwiVWxpY2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogNjAsIHBvcGlzOiBcIsSMw61zbG8gcG9waXNuw6lcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogNzAsIHBvcGlzOiBcIkFnLiDEjcOtc2xvXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDgwLCBwb3BpczogXCJUeXAgcG9obC4gRERQXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDkwLCBwb3BpczogXCJWc1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAxMDAsIHBvcGlzOiBcIlNzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDExMCwgcG9waXM6IFwiS3NcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMTIwLCBwb3BpczogXCJLYXRlZ29yaWUgcGxhdGJ5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDEzMCwgcG9waXM6IFwiRGF0dW0gc3BsYXRub3N0aSBvZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAxNDAsIHBvcGlzOiBcIkRhdHVtIHNwbGF0bm9zdGkgZG9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMTUwLCBwb3BpczogXCJTbcSbciBwbGF0YnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMTYwLCBwb3BpczogXCJNxJtuYVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAxNzAsIHBvcGlzOiBcIlBvcGlzIHDFmWVkcGlzdVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAxODAsIHBvcGlzOiBcIlpwxa9zb2IgcGxhdGJ5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDE5MCwgcG9waXM6IFwixIzDrXNsbyBvcmllbnRhxI1uw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMjAwLCBwb3BpczogXCJPYmVjXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IDIxMCwgcG9waXM6IFwixIzDoXN0IG9iY2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogMjIwLCBwb3BpczogXCJQb3BpcyBwxZnDrXBhZHVcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwia2V5XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwb3Bpc31cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBsYXRlYm7DrSB0ZXJtaW7DoWx5XCIpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJUZXJtaW7DoWwgMSAtIFByb2tvdG9sL1Rlcm1pbsOhbCBJRC9Qb3Bpc1wiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0zXCIse1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFByb3Rva29sMVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFByb3Rva29sMSA9IHZhbHVlLmtleVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcHJvdG9rb2x5LFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLCAgICAgXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgcHJvdG9rb2whXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkMVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFBvc0lkMVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc0lkMSA9IHZhbHVlLnBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZSA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2wxXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFZhbHVlICE9IG51bGwgJiYgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7IG5hbWU6IFwidGVybWluYWxQb3BpczFcIiwgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvcGlzMSA9IHZhbHVlXCIgfSkgICAgICAgXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGVybWluYWxQb3NWaXNpYmxlMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVGVybWluYWxQb3NWaXNpYmxlMSA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IHByb3Rva29sIGEgSUQgdGVybWluw6FsdSFcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUsIHNvdXJjZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSAkLmNvbnRlbnQoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlY29uZFZhbHVlID0gY29udGVudC5maW5kRmllbGRzKFwidGVybWluYWxQb3NJZDFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZVR3byA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2wxXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY29uZFZhbHVlID09IG51bGwgJiYgc2Vjb25kVmFsdWVUd28gPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvclwiLCBpY29uOiBcIlwiLCBsYWJlbDogXCJOZWx6ZSB2eWJyYXQsIG5lanNvdSB2eXBsbsSbbnkgcG92aW5uw6kgw7pkYWplIHRlcm1pbsOhbHUuXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVGVybWluw6FsIDIgLSBQcm9rb3RvbC9UZXJtaW7DoWwgSUQvUG9waXNcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUHJvdG9rb2wyXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLlRlcm1pbmFsUHJvdG9rb2wyID0gdmFsdWUua2V5XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm90b2tvbHksXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgcHJvdG9rb2whXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkMlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFBvc0lkMlwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc0lkMiA9IHZhbHVlLnBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFByb3Rva29sMlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInRlcm1pbmFsUG9waXMyXCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVGVybWluYWxQb3BpczIgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUG9zVmlzaWJsZTJcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc1Zpc2libGUyID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJKZSBudXRuw6kgdnlwbG5pdCBwcm90b2tvbCBhIElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkMlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZVR3byA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2wyXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSA9PSBudWxsICYmIHNlY29uZFZhbHVlVHdvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JcIiwgaWNvbjogXCJcIiwgbGFiZWw6IFwiTmVsemUgdnlicmF0LCBuZWpzb3UgdnlwbG7Em255IHBvdmlubsOpIMO6ZGFqZSB0ZXJtaW7DoWx1LlwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVGVybWluw6FsIDMgLSBQcm9rb3RvbC9UZXJtaW7DoWwgSUQvUG9waXNcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUHJvdG9rb2wzXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLlRlcm1pbmFsUHJvdG9rb2wzID0gdmFsdWUua2V5XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm90b2tvbHksXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgcHJvdG9rb2whXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkM1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFBvc0lkM1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc0lkMyA9IHZhbHVlLnBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFByb3Rva29sM1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInRlcm1pbmFsUG9waXMzXCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVGVybWluYWxQb3BpczMgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUG9zVmlzaWJsZTNcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc1Zpc2libGUzID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJKZSBudXRuw6kgdnlwbG5pdCBwcm90b2tvbCBhIElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkM1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZVR3byA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2wzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSA9PSBudWxsICYmIHNlY29uZFZhbHVlVHdvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JcIiwgaWNvbjogXCJcIiwgbGFiZWw6IFwiTmVsemUgdnlicmF0LCBuZWpzb3UgdnlwbG7Em255IHBvdmlubsOpIMO6ZGFqZSB0ZXJtaW7DoWx1LlwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVGVybWluw6FsIDQgLSBQcm9rb3RvbC9UZXJtaW7DoWwgSUQvUG9waXNcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUHJvdG9rb2w0XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLlRlcm1pbmFsUHJvdG9rb2w0ID0gdmFsdWUua2V5XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm90b2tvbHksXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgcHJvdG9rb2whXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkNFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFBvc0lkNFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc0lkNCA9IHZhbHVlLnBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFByb3Rva29sNFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInRlcm1pbmFsUG9waXM0XCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVGVybWluYWxQb3BpczQgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUG9zVmlzaWJsZTRcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc1Zpc2libGU0ID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJKZSBudXRuw6kgdnlwbG5pdCBwcm90b2tvbCBhIElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkNFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZVR3byA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2w0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSA9PSBudWxsICYmIHNlY29uZFZhbHVlVHdvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JcIiwgaWNvbjogXCJcIiwgbGFiZWw6IFwiTmVsemUgdnlicmF0LCBuZWpzb3UgdnlwbG7Em255IHBvdmlubsOpIMO6ZGFqZSB0ZXJtaW7DoWx1LlwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVGVybWluw6FsIDUgLSBQcm9rb3RvbC9UZXJtaW7DoWwgSUQvUG9waXNcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUHJvdG9rb2w1XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLlRlcm1pbmFsUHJvdG9rb2w1ID0gdmFsdWUua2V5XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm90b2tvbHksXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSmUgbnV0bsOpIHZ5cGxuaXQgcHJvdG9rb2whXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkNVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTNcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NrYXAoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXJtaW5hbFBvc0lkNVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc0lkNSA9IHZhbHVlLnBvc19pZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkplIG51dG7DqSB2eXBsbml0IElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFByb3Rva29sNVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSAhPSBudWxsICYmIHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInRlcm1pbmFsUG9waXM1XCIsIG1vZGVsOiBcIlBvay5OYXN0YXZlbmkuVGVybWluYWxQb3BpczUgPSB2YWx1ZVwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRlcm1pbmFsUG9zVmlzaWJsZTVcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5YnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiUG9rLk5hc3RhdmVuaS5UZXJtaW5hbFBvc1Zpc2libGU1ID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJKZSBudXRuw6kgdnlwbG5pdCBwcm90b2tvbCBhIElEIHRlcm1pbsOhbHUhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSwgc291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJ0ZXJtaW5hbFBvc0lkNVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWNvbmRWYWx1ZVR3byA9IGNvbnRlbnQuZmluZEZpZWxkcyhcInRlcm1pbmFsUHJvdG9rb2w1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRWYWx1ZSA9PSBudWxsICYmIHNlY29uZFZhbHVlVHdvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JcIiwgaWNvbjogXCJcIiwgbGFiZWw6IFwiTmVsemUgdnlicmF0LCBuZWpzb3UgdnlwbG7Em255IHBvdmlubsOpIMO6ZGFqZSB0ZXJtaW7DoWx1LlwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ0ZXJtaW5hbFRlc3RvdmFjaVwiLCBsYWJlbDogXCJQxZlpZGF0IGRvIHbDvWLEm3J1IHBsYXRlYm7DrWNoIHRlcm1pbsOhbMWvIHRlc3RvdmFjw60gdmlydHXDoWxuw60gdGVybWluw6FseVwiLCBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLlRlcm1pbmFsVGVzdG92YWNpID0gdmFsdWVcIiB9KVxyXG4gICAgICAgICAgICAvLy5hZGRTZWN0aW9uKFwianJlczozMTMwMjM0N1wiKSAvL1JDIDMxMzAyMzQ3IDogQXV0b21hdGlja8OpIHZ5dHZvxZllbsOtIHBvbG/Fvmt5IG5hIGRva2xhZHUgcG8gcG9kw6Fuw61cclxuICAgICAgICAgICAgLy8uYWRkUm93KHsgbGFiZWw6IFwiTW/Fvm5vc3RpXCIgfVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYXV0b1BvbFwiLFxyXG4gICAgICAgICAgICAvLyAgICBtb2RlbDogXCJQb2suTmFzdGF2ZW5pLkF1dG9Qb2w9dmFsdWVcIixcclxuICAgICAgICAgICAgLy8gICAgaXRlbUNsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAvLyBpbml0aWFsVmFsdWU6IHRoaXMubW9kZWwuYXV0b1BvbCxcclxuICAgICAgICAgICAgLy8gICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IHZhbHVlOiAnMTAnLCBsYWJlbDogJ05ldnl0dsOhxZlldCcgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHsgdmFsdWU6ICcyMCcsIGxhYmVsOiAnT3RldsWZw610IGtvbnRhY2UnIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IHZhbHVlOiAnMzAnLCBsYWJlbDogJ090ZXbFmcOtdCBvxI0uIHBsYXRieScgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgXVxyXG4gICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIGZvcm0uYWRkU2VjdGlvbihcIkRpYWdub3N0aWthIGtvbmVrdG9yxa9cIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcIlwiLCB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOQVRIQU5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdhY3RQb2tEaWFnbm9zdGlrYU5hdGhhbicsIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcIkRpYWdub3N0aWthIGtvbmVrdG9ydSBOQVRIQU5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuUG9rRG9rbGFkLnRlc3QoeyB0eXB0ZXN0OiAyIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5DcmVhdGVBaWJDb25uZWN0b3JEaWFsb2cocmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcIlwiLCB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJCcsOhbmEgcGxhdGVibsOtY2ggdGVybWluw6Fsxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdhY3RQb2tEaWFnbm9zdGlrYUJyYW5hJywgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwiRGlhZ25vc3Rpa2EgYnLDoW55IHBsYXRlYm7DrWNoIHRlcm1pbsOhbMWvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuaXNsLlBva0Rva2xhZC50ZXN0KHsgdHlwdGVzdDogMSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkdpbi5XZWJDbGllbnQuQ3JlYXRlQWliQ29ubmVjdG9yRGlhbG9nKHJldFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcmVwb3J0ID0gR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydHNVc2VyU2V0dGluZ3MoKTtcclxuICAgICAgICBsZXQgZWxTb3Vib3J5ID0gR29yZGljLldmbC5BcHBTZXR0aW5ncy5BdHRhY2htZW50T3BlblNldHRpbmdzRm9ybSgpO1xyXG4gICAgICAgIGxldCBjb2xvciA9IEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQ29sb3JQaWNrZXJTZXR0aW5nc0Zvcm0oKTtcclxuICAgICAgICBsZXQgc2VqbXV0aSA9IEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzUGlkKEdpbkdlbkl4cCk7XHJcbiAgICAgICAgbGV0IGJvb2sgPSBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc0Vrb0Jvb2soKTtcclxuICAgICAgICBsZXQgdGVzdCA9IEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzTGlzdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIHJldHVybiBbcmVwb3J0LCBlbFNvdWJvcnksIGNvbG9yLCBzZWptdXRpLCBib29rLCB0ZXN0LCBmb3JtXTtcclxuICAgIH1cclxufSJdfQ==