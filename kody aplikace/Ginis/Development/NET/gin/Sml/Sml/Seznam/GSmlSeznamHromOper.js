"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlSeznamHromOper.ts                  </Name>
//    <Description> Hromadné operace na seznamem dokladů                        </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-12-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            //TODO: přesunout sem i hromadné uvolnění nebo nechat v rámci složky uvolnění?
            /**
             * Průvodce hromadné změny údajů dokladů
             * @param cnt content
             * @param rows pole dokladů
             * @param gridFormat gridformát pro průvodce
             * @param gridProfile profil pro grid
             * @param keys klíče seznamu/dto
             * @returns Promise
             */
            function hromadnaZmenaUdajuWizard(cnt, rows, gridFormat, gridProfile, keys) {
                if (rows.length < 1) {
                    return $.Deferred().reject().promise();
                } //nevybrán žádný řádek
                return cnt.createServiceContent("Gordic.Sml.WebClient.GSmlSeznamHromOperService").call("GetDbParamsForHromZmenaUdaju").then((params) => {
                    var wizardChanged = false;
                    var wizardForm = new Gordic.Forms.Form({
                        name: "formHromZmenaUdaju",
                        layoutDescriptor: "L2M2S1"
                    })
                        .addSection()
                        .addRow("jres:33600504") //RC 33600504 : Typ platnosti
                        .addField("gselectbox", Gordic.Prefabs.Select.smlctpl(), {
                        name: "typ_platnost",
                        model: "model.typ_platnost=value.typ_platnost",
                        tooltip: "jres:33600505", //RC 33600505 : Určení typu platnosti smlouvy
                        serverFilters: {
                            typ_platnost: { o: ">", v: 0 }
                        },
                        change: (ev, ctx) => {
                            if (ctx) {
                                //řízení na základě typ platnosti
                                var enabledDatPlatnost = !ctx.value?.typ_platnost || (ctx.value?.typ_platnost ?? -1) == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */;
                                var dat_platnost = $(ev.target).closest(".gform").findFields("dat_platnost");
                                dat_platnost.gfield("option", "disabled", !enabledDatPlatnost);
                                if (!enabledDatPlatnost) {
                                    dat_platnost.gfield("reset");
                                }
                            }
                        }
                    })
                        .addRow("jres:33600506") //RC 33600506 : Datum uzavření
                        .addField("gdatebox", {
                        name: "dat_uzavreni",
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
                        .addRow("jres:33600507") //RC 33600507 : Datum ukončení platnosti
                        .addField("gdatebox", {
                        name: "dat_platnost",
                        validators: [
                            new Gordic.Validators.Base({
                                message: "jres:33600508", //RC 33600508 : Datum platnosti smlouvy je menší než datum uzavření
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //pro dobu určitou
                                    if ((form.findFields("typ_platnost").gfield("getValue") ?? 0) == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
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
                                    if ((form.findFields("typ_platnost").gfield("getValue") ?? 0) == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
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
                        validators: [
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
                                    if ((form.findFields("typ_platnost").gfield("getValue") ?? 0) == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
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
                        .addRow("jres:33600513") //RC 33600513 : Datum ukončení
                        .addField("gdatebox", {
                        name: "dat_uko",
                        validators: [
                            new Gordic.Validators.Base({
                                message: "jres:33600514", //RC 33600514 : Datum ukončení nesmí být nižší než datum uzavření
                                validate: (value, src) => {
                                    var form = $(src).closest(".gform");
                                    //nikdy nesmí být nižší než datum uzavření
                                    var dat_uzavreni = form.findFields("dat_uzavreni").gfield("getValue");
                                    if (dat_uzavreni && value && dat_uzavreni > value) {
                                        //Call dfDatUko._put( dfDatUzavreni._get( ) )
                                        return false;
                                    }
                                    return true;
                                }
                            })
                        ]
                    })
                        .addSection()
                        .addRow("jres:33600515") //RC 33600515 : Účinnost
                        .addField("gstringbox", {
                        name: "ucinnost"
                    })
                        .addRow("jres:33600516") //RC 33600516 : Organizační jednotka
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), {
                        name: "ixs_orj",
                        model: "model.ixs_orj=value.ixs_orj"
                    })
                        .addRow(params.sml_lbl_dok1)
                        .addField("gstringbox", {
                        name: "ac_dok_1"
                    })
                        .addRow(params.sml_lbl_dok2)
                        .addField("gstringbox", {
                        name: "ac_dok_2"
                    })
                        .addSection({ layoutDescriptor: "L2M2S1, L-2-10-0, M-12-12-0, S-12-12-0" })
                        .addRow("jres:33600517") //RC 33600517 : Popis
                        .addField("gstringbox", {
                        name: "popis"
                    });
                    return cnt.navigate(Gordic.Eko.Components.ThreeStepsContent, {
                        ID: "HromadnaZmenaUdaju#",
                        title: "jres:33600518", //RC 33600518 : Hromadná změna údajů
                        gridFormat: gridFormat,
                        gridProfile: gridProfile,
                        keys: keys,
                        data: rows,
                        indicatorType: "KPI",
                        firstStep: {
                            gridTabTitle: "jres:33600519", //RC 33600519 : Doklady
                            title: "jres:33600520", //RC 33600520 : Zadání údajů
                            description: "jres:33600521", //RC 33600521 : Akce změní údaje u vybraných (zaškrtnutých) dokladů podle vyplněného formuláře. Požadované údaje budou změněny pouze u těch vybraných dokladů, jejichž hodnoty splní nutné požadavky. Pokud ne, hodnoty údajů zůstanou beze změny.
                            form: wizardForm,
                            formTabTitle: "jres:33600522", //RC 33600522 : Údaje
                            enableFormFields: true,
                            nextAction: (model, data) => {
                                var ixps = data.map((val, idx, arr) => { return val.ixp; });
                                return cnt.isl.SmlHromOperace.checkMassPermissionsBeforeZmenaUdaju({ ixps: ixps, ...model }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        secondStep: {
                            gridTabTitle: "jres:33600285", //RC 33600285 : Výběr dokladů
                            title: "jres:33600523", //RC 33600523 : Kontrola a výběr dokladů
                            description: "jres:33600521", //RC 33600521 : Akce změní údaje u vybraných (zaškrtnutých) dokladů podle vyplněného formuláře. Požadované údaje budou změněny pouze u těch vybraných dokladů, jejichž hodnoty splní nutné požadavky. Pokud ne, hodnoty údajů zůstanou beze změny.
                            form: wizardForm,
                            formTabTitle: "jres:33600522", //RC 33600522 : Údaje
                            enableFormFields: false,
                            showIndicator: true,
                            checkAction: (model, data) => {
                                var ixps = data.map((val, idx, arr) => { return val.ixp; });
                                return cnt.isl.SmlHromOperace.checkMassPermissionsBeforeZmenaUdaju({ ixps: ixps, ...model }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, data) => {
                                var ixps = data.map((val, idx, arr) => { return val.ixp; });
                                return cnt.isl.SmlHromOperace.massZmenaUdaju({ ixps: ixps, ...model }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                            title: "jres:33600088", //RC 33600088 : Výsledek hromadné operace
                            form: wizardForm,
                            formTabTitle: "jres:33600522", //RC 33600522 : Údaje
                            enableFormFields: false
                        },
                        completeDelegate: () => { }
                    }).createDialogPromise();
                });
            }
            WebClient.hromadnaZmenaUdajuWizard = hromadnaZmenaUdajuWizard;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFNlem5hbUhyb21PcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFNlem5hbUhyb21PcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFHakIsSUFBVSxNQUFNLENBa09mO0FBbE9ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtPbkI7SUFsT2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtPN0I7UUFsT29CLFdBQUEsU0FBUztZQUUxQiw4RUFBOEU7WUFFOUU7Ozs7Ozs7O2VBUUc7WUFDSCxTQUFnQix3QkFBd0IsQ0FBQyxHQUFhLEVBQUUsSUFBYyxFQUFFLFVBQWtDLEVBQUUsV0FBNkIsRUFBRSxJQUF3QjtnQkFDL0osSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFDLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ3ZGLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixDQUFDLGdEQUFnRCxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0QsRUFBRSxFQUFFO29CQUNuTCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2xDO3dCQUNJLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLGdCQUFnQixFQUFFLFFBQVE7cUJBQzdCLENBQUM7eUJBQ0QsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyw2QkFBNkI7eUJBQ3JELFFBQVEsQ0FBQyxZQUFZLEVB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TnZDLENBQUE7UUFDTCxDQUFDLEVBbE9vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFrTzdCO0lBQUQsQ0FBQyxFQWxPZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa09uQjtBQUFELENBQUMsRUFsT1MsTUFBTSxLQUFOLE1BQU0sUUFrT2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxTZXpuYW1Icm9tT3Blci50cyAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gSHJvbWFkbsOpIG9wZXJhY2UgbmEgc2V6bmFtZW0gZG9rbGFkxa8gICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTEyLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG5cclxuICAgIC8vVE9ETzogcMWZZXN1bm91dCBzZW0gaSBocm9tYWRuw6kgdXZvbG7Em27DrSBuZWJvIG5lY2hhdCB2IHLDoW1jaSBzbG/Fvmt5IHV2b2xuxJtuw60/XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcsWvdm9kY2UgaHJvbWFkbsOpIHptxJtueSDDumRhasWvIGRva2xhZMWvXHJcbiAgICAgKiBAcGFyYW0gY250IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSByb3dzIHBvbGUgZG9rbGFkxa9cclxuICAgICAqIEBwYXJhbSBncmlkRm9ybWF0IGdyaWRmb3Jtw6F0IHBybyBwcsWvdm9kY2VcclxuICAgICAqIEBwYXJhbSBncmlkUHJvZmlsZSBwcm9maWwgcHJvIGdyaWRcclxuICAgICAqIEBwYXJhbSBrZXlzIGtsw63EjWUgc2V6bmFtdS9kdG9cclxuICAgICAqIEByZXR1cm5zIFByb21pc2VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhyb21hZG5hWm1lbmFVZGFqdVdpemFyZChjbnQ6IEdDb250ZW50LCByb3dzOiBvYmplY3RbXSwgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgZ3JpZFByb2ZpbGU6IEdyaWRQcm9maWxlPGFueT4sIGtleXM6IERhdGEuVmlld0tleXM8YW55Pikge1xyXG4gICAgICAgIGlmIChyb3dzLmxlbmd0aCA8IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9uZXZ5YnLDoW4gxb7DoWRuw70gxZnDoWRla1xyXG4gICAgICAgIHJldHVybiBjbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU21sU2V6bmFtSHJvbU9wZXJTZXJ2aWNlXCIpLmNhbGwoXCJHZXREYlBhcmFtc0Zvckhyb21abWVuYVVkYWp1XCIpLnRoZW4oKHBhcmFtczogeyBzbWxfbGJsX2RvazE6IHN0cmluZywgc21sX2xibF9kb2syOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgd2l6YXJkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1Icm9tWm1lbmFVZGFqdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUwNFwiKSAvL1JDIDMzNjAwNTA0IDogVHlwIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sY3RwbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGxhdG5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGxhdG5vc3Q9dmFsdWUudHlwX3BsYXRub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwNTA1XCIsIC8vUkMgMzM2MDA1MDUgOiBVcsSNZW7DrSB0eXB1IHBsYXRub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGxhdG5vc3Q6IHsgbzogXCI+XCIsIHY6IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL8WZw616ZW7DrSBuYSB6w6FrbGFkxJsgdHlwIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVuYWJsZWREYXRQbGF0bm9zdCA9ICFjdHgudmFsdWU/LnR5cF9wbGF0bm9zdCB8fCAoY3R4LnZhbHVlPy50eXBfcGxhdG5vc3Q/Py0xKSA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9wbGF0bm9zdCA9ICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmb3JtXCIpLmZpbmRGaWVsZHMoXCJkYXRfcGxhdG5vc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfcGxhdG5vc3QuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIWVuYWJsZWREYXRQbGF0bm9zdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVuYWJsZWREYXRQbGF0bm9zdCkgeyBkYXRfcGxhdG5vc3QuZ2ZpZWxkKFwicmVzZXRcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUwNlwiKSAvL1JDIDMzNjAwNTA2IDogRGF0dW0gdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3V6YXZyZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzM0My4xIDAyLjA1LjAyIC0gcMWZZWRuYXN0YXbDrW0gZGF0dW0gw7rEjWlubm9zdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eD8udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdWNpbm5vc3QgPSAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwiZGF0X3VjaW5ub3N0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXRudSBob2Rub3R1IHBvdXplIHBva3VkIGplIHBvbGUgcHLDoXpkbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdF91Y2lubm9zdC5nZmllbGQoXCJnZXRWYWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF91Y2lubm9zdC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTA3XCIpIC8vUkMgMzM2MDA1MDcgOiBEYXR1bSB1a29uxI1lbsOtIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BsYXRub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA1MDhcIiwgLy9SQyAzMzYwMDUwOCA6IERhdHVtIHBsYXRub3N0aSBzbWxvdXZ5IGplIG1lbsWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoc3JjKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJvIGRvYnUgdXLEjWl0b3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZvcm0uZmluZEZpZWxkcyhcInR5cF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA/PyAwKSA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdXphdnJlbmkgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfdXphdnJlbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9rdWQgamUgbsSba3RlcsO9IG51bG92w70sIHZyYWPDrW0gT2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCAhZGF0X3V6YXZyZW5pKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRfdXphdnJlbmkgPiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDUwOVwiLCAvL1JDIDMzNjAwNTA5IDogUm9rIHBsYXRub3N0aSBzbWxvdXZ5IG5lc291aGxhc8OtIHMgcm9rZW0gdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWx1ZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHNyYykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BybyBkb2J1IHVyxI1pdG91XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGxhdG5vc3RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPz8gMCkgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bva3VkIGplIG7Em2t0ZXLDvSBudWxvdsO9LCB2cmFjw61tIE9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUgfHwgIWRhdF91emF2cmVuaSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEYXRlKHZhbHVlKS5nZXRGdWxsWWVhcigpICE9IHBhcnNlRGF0ZShkYXRfdXphdnJlbmkpLmdldEZ1bGxZZWFyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MTBcIikgLy9SQyAzMzYwMDUxMCA6IERhdHVtIMO6xI1pbm5vc3RpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWNpbm5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDUxMVwiLCAvL1JDIDMzNjAwNTExIDogRGF0dW0gw7rEjWlubm9zdGkgbmVzbcOtIGLDvXQgbmnFvsWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtIHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChzcmMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uaWtkeSBuZXNtw60gYsO9dCBuacW+xaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IGRhdF91emF2cmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgZGZEYXRVY2lubm9zdC5fcHV0KCBkZkRhdFV6YXZyZW5pLl9nZXQoICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNTEyXCIsIC8vUkMgMzM2MDA1MTIgOiBEYXR1bSDDusSNaW5ub3N0aSBuZXNtw60gYsO9dCB2ecWhxaHDrSBuZcW+IGRhdHVtIHBsYXRub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoc3JjKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJvIGRvYnUgdXLEjWl0b3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZvcm0uZmluZEZpZWxkcyhcInR5cF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA/PyAwKSA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfcGxhdG5vc3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfcGxhdG5vc3RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IGRhdF9wbGF0bm9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxsIGRmRGF0VWNpbm5vc3QuX3B1dCggZGZEYXRQbGF0bm9zdC5fZ2V0KCApIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MTNcIikgLy9SQyAzMzYwMDUxMyA6IERhdHVtIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91a29cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDUxNFwiLCAvL1JDIDMzNjAwNTE0IDogRGF0dW0gdWtvbsSNZW7DrSBuZXNtw60gYsO9dCBuacW+xaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChzcmMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uaWtkeSBuZXNtw60gYsO9dCBuacW+xaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3V6YXZyZW5pID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRfdXphdnJlbmkgJiYgdmFsdWUgJiYgZGF0X3V6YXZyZW5pID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxsIGRmRGF0VWtvLl9wdXQoIGRmRGF0VXphdnJlbmkuX2dldCggKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTE1XCIpIC8vUkMgMzM2MDA1MTUgOiDDmsSNaW5ub3N0XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjaW5ub3N0XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUxNlwiKSAvL1JDIDMzNjAwNTE2IDogT3JnYW5pemHEjW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc29yaigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfb3JqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX29yaj12YWx1ZS5peHNfb3JqXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHBhcmFtcy5zbWxfbGJsX2RvazEpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2Rva18xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHBhcmFtcy5zbWxfbGJsX2RvazIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2Rva18yXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MTdcIikgLy9SQyAzMzYwMDUxNyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY250Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5UaHJlZVN0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkhyb21hZG5hWm1lbmFVZGFqdSNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA1MThcIiwgLy9SQyAzMzYwMDUxOCA6IEhyb21hZG7DoSB6bcSbbmEgw7pkYWrFr1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiBncmlkUHJvZmlsZSxcclxuICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dzISxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDUxOVwiLCAvL1JDIDMzNjAwNTE5IDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA1MjBcIiwgLy9SQyAzMzYwMDUyMCA6IFphZMOhbsOtIMO6ZGFqxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNTIxXCIsIC8vUkMgMzM2MDA1MjEgOiBBa2NlIHptxJtuw60gw7pkYWplIHUgdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIGRva2xhZMWvIHBvZGxlIHZ5cGxuxJtuw6lobyBmb3JtdWzDocWZZS4gUG/FvmFkb3ZhbsOpIMO6ZGFqZSBidWRvdSB6bcSbbsSbbnkgcG91emUgdSB0xJtjaCB2eWJyYW7DvWNoIGRva2xhZMWvLCBqZWppY2jFviBob2Rub3R5IHNwbG7DrSBudXRuw6kgcG/FvmFkYXZreS4gUG9rdWQgbmUsIGhvZG5vdHkgw7pkYWrFryB6xa9zdGFub3UgYmV6ZSB6bcSbbnkuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDUyMlwiLCAvL1JDIDMzNjAwNTIyIDogw5pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cHMgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4gdmFsLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5pc2wuU21sSHJvbU9wZXJhY2UuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVabWVuYVVkYWp1KHsgaXhwczogaXhwcywgLi4ubW9kZWwgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlY29uZFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDI4NVwiLCAvL1JDIDMzNjAwMjg1IDogVsO9YsSbciBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA1MjNcIiwgLy9SQyAzMzYwMDUyMyA6IEtvbnRyb2xhIGEgdsO9YsSbciBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1MjFcIiwgLy9SQyAzMzYwMDUyMSA6IEFrY2Ugem3Em27DrSDDumRhamUgdSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgZG9rbGFkxa8gcG9kbGUgdnlwbG7Em27DqWhvIGZvcm11bMOhxZllLiBQb8W+YWRvdmFuw6kgw7pkYWplIGJ1ZG91IHptxJtuxJtueSBwb3V6ZSB1IHTEm2NoIHZ5YnJhbsO9Y2ggZG9rbGFkxa8sIGplamljaMW+IGhvZG5vdHkgc3BsbsOtIG51dG7DqSBwb8W+YWRhdmt5LiBQb2t1ZCBuZSwgaG9kbm90eSDDumRhasWvIHrFr3N0YW5vdSBiZXplIHptxJtueS5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwNTIyXCIsIC8vUkMgMzM2MDA1MjIgOiDDmmRhamVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cHMgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4gdmFsLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5pc2wuU21sSHJvbU9wZXJhY2UuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVabWVuYVVkYWp1KHsgaXhwczogaXhwcywgLi4ubW9kZWwgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cHMgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4gdmFsLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5pc2wuU21sSHJvbU9wZXJhY2UubWFzc1ptZW5hVWRhanUoeyBpeHBzOiBpeHBzLCAuLi5tb2RlbCB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDA4N1wiLCAvL1JDIDMzNjAwMDg3IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDA4OFwiLCAvL1JDIDMzNjAwMDg4IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDUyMlwiLCAvL1JDIDMzNjAwNTIyIDogw5pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoKSA9PiB7IH1cclxuICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=