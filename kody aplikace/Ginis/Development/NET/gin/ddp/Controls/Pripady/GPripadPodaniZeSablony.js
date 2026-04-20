"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadPodaniZeSablony.ts              </Name>
//    <Description> Okno pro výběr šablony při podání případu ze šablony        </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-02                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno pro výběr šablony při podání případu ze šablony
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-04-01
             * @lastModified 2025-04-03
             * @gupta dlg_ZalPripZeSablony
             * @description dialog pro výběr šablony v případě flag bitu-zobraz_vyber_esu na TRUE zobrazí ještě výběr externího subjektu
             *                a po stisku OK založí případ (dle šablony a esu)
             *                při zavolání dlg_ZalPripZeSablony se po stiku OK provede inicializace případu
             */
            let GPripadPodaniZeSablony = class GPripadPodaniZeSablony extends Gordic.GContentBase {
                constructor() {
                    //#region P R O P E R T I E S
                    super(...arguments);
                    /** pro první pokus o podání případu bez šablony */
                    this.firstTry = true;
                    /** Identifikátor pro výběr bez šablony */
                    this.nullIxsDsa = WebClient.Common.Globals.sgNull.nullSablony;
                    //#endregion A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                }
                //
                //RETURN -> kon_oso_phl: Boolean; //! kontrola osoby v dané pohledávce
                //RETURN -> akt_rob_esu: Boolean; //! aktualizovat z ROB již evidovaným ESU
                //RETURN -> ixs_dsa: String; // Identifikátor šablony
                //RETURN -> ixs_esu: String; // Identifikátor ESU 
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.title = (that.zobraz_vyber_esu ? "Založení případu ze šablony" : "Hromadné založení případů ze šablony");
                    that.createCommandBar();
                    that.createActions();
                    that.createForm();
                    that.onAfterInit();
                }
                /**
                 * Metoda pro nastavení políček a dat okna
                 * @method setWindow()
                 */
                onAfterInit() {
                    const that = this;
                    if (!that.zobraz_vyber_esu) { // vybírám šablony bez esu
                        if (that.Params.ddp_esu_check == 0) {
                            that.defaultForm.findFields("cb_kon_oso_phl").gfield("option", "disabled", true);
                        }
                        that.defaultForm.findFields("ixs_esu").gfield("option", "disabled", true);
                    }
                    else { // vybírm šablony i esu
                        that.defaultForm.findFields("cb_kon_oso_phl").gfield("option", "disabled", true);
                        //TODO: Function: VybiratNejaktualnejsiVerziESU("ddp_wu_use")
                    }
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Ok",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ulozit()
                                    .done((retData) => {
                                    that.close(retData);
                                }) // Uložení dat a zavření okna v případě úspěchu metody.
                                    .fail(() => {
                                    //that.dialogs.warning("Chyba při načtení dat z formuláře!"); // TODO: Chyba při ukládání dat
                                });
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "formGPripadPodaniZeSablony" });
                    //#region form
                    mainForm
                        .addSection({ name: "sectionGPripadPodaniZeSablony" })
                        //.addRow("Identifikátor")
                        //.addField("gstringbox", Prefabs.String.ixs(true), {
                        //    name: "ixp",
                        //    change: function (ev, input) { }
                        //})
                        .addSection()
                        .addRow({ label: "Zadejte šablonu" /*, required: true*/ })
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ddpsdsa(), {
                        name: "ixs_dsa",
                        model: "ixs_dsa=ixs_dsa;",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            zobraz_vyber_esu: that.zobraz_vyber_esu
                        },
                        change: (ev, ctx) => {
                            if (ctx.value.ixs_dsa == that.nullIxsDsa) {
                                that.disableFields(true);
                            }
                            else {
                                that.disableFields(false);
                            }
                        }
                    });
                    if (!that.rob) {
                        mainForm.addRow({ label: "Poplatník" /*, required: true*/ })
                            .addField("gselectbox", "w-12", {
                            name: "ixs_esu",
                            flag: "required",
                            change: function (ev, ctx) {
                                //that.poZmeneSubjektu(ctx);                                                                       
                            },
                            model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                        }, Gordic.Esu.Prefabs.vyberEsu({
                            typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                            Logovani: {
                                Ixp: /*that.Ixp ?? */ WebClient.Common.Globals.sgNull.NullIxp,
                                AktZnacka: /*that.Ixp ??*/ "",
                                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                                DuvodHledaniTxt: "Načtení poplatníka při zakládání případu (ze šablony)"
                            },
                        }));
                    }
                    mainForm
                        .addSection()
                        .addField("gcheck", "w-12", {
                        name: "cb_kon_oso_phl",
                        defaultValue: false,
                        label: "Kontrolovat existenci osoby v dané pohledávce?"
                    })
                        .addField("gcheck", "w-12", {
                        name: "cb_akt_rob_esu",
                        defaultValue: false,
                        label: "Aktualizovat údaje z ROB pro již evidované ESU?"
                    });
                    //#endregion
                    that.defaultForm = $.newDiv().appendTo(that.element).gform("createFrom", mainForm);
                    return mainForm;
                }
                /**
                 *
                 * @param changingValue
                 */
                disableFields(changingValue) {
                    const that = this;
                    that.defaultForm.findFields("cb_kon_oso_phl").gfield("option", "disabled", changingValue);
                    that.defaultForm.findFields("cb_akt_rob_esu").gfield("option", "disabled", changingValue);
                    that.defaultForm.findFields("ixs_esu").gfield("option", "disabled", changingValue);
                    if (changingValue) { // když se jají vypnout pole, tak se také vymaže hodnota
                        that.defaultForm.findFields("cb_kon_oso_phl").gfield("setValue", null);
                        that.defaultForm.findFields("cb_akt_rob_esu").gfield("setValue", null);
                        that.defaultForm.findFields("ixs_esu").gfield("setValue", null);
                        that.defaultForm.findFields("ixs_esu").gfield("option", "flag", "");
                        that.defaultForm.findFields("ixs_esu").gfield("setValidators", []);
                    }
                    else { // po výběru šablony se poplatníkovi zase nastaví required flag a validator
                        that.defaultForm.findFields("ixs_esu").gfield("option", "flag", "required");
                        that.defaultForm.findFields("ixs_esu").gfield("setValidators", [new Gordic.Validators.Required()]);
                    }
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoří tlačítko nad seznamem kontrol
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actZavritPotomkyContentu",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                    ]);
                }
                /**
                 * Metoda pro uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit() {
                    const that = this;
                    var def = $.Deferred();
                    // kontrola validace formuláře 
                    if (!that.defaultForm.gform("isValid")) {
                        return def.reject().promise();
                    }
                    var retData = new Object();
                    that.defaultForm.findFields().gfield("model", "collect", retData);
                    if (retData.ixs_dsa == "" || retData.ixs_dsa == null) { //! pokud není vybraná šablona nelze pokračovat
                        that.dialogs.error("Vyber šablonu pro podání!");
                        return def.reject().promise();
                    }
                    if (retData.ixs_dsa == that.nullIxsDsa) { // && that.firstTry) {
                        //that.firstTry = false; // zvláštní upozornění v guptě, po druhé by se to nemělo neukazovat | - ale zřejmě i tak vrátí chybu - idk jak to funguje :D
                        //that.dialogs.warning("Zadejte prosím šablonu.")
                        that.dialogs.confirm("Opravdu chcete podat případ bez šablony?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                def.resolve(retData);
                            }
                            else {
                                def.reject();
                            }
                        });
                        return def.promise();
                    }
                    else {
                        //
                        //! zapamatuje se vybraná šablona
                        //todo: Call gf_UlozLokalniParametr( 'ddp_vybrana_sablona', op_ixs_dsa )
                        //            
                        if (that.zobraz_vyber_esu) {
                            if ((retData.ixs_esu == "" || retData.ixs_esu == WebClient.Common.Globals.sgNull.NullEsu) && retData.ixs_dsa != that.nullIxsDsa) { //! bez ixs_esu a zároveň podání šablonou
                                that.dialogs.error("Vyberte poplatníka (externí subjekt) pro založení případu!");
                                return def.reject().promise();
                            }
                            else {
                                retData.kon_oso_phl = false; // tak to udělám opačně a doplním null tam kde nechci
                                // else NASTAVIT ixs_esu do proměnné retData.ixs_esu //-jinak bych ta data neměl vracet
                            }
                        }
                        else {
                            retData.ixs_esu = null; // tak to udělám opačně a doplním null tam kde nechci
                            // else NASTAVIT kon_oso_phl do proměnné retData.kon_oso_phl  //-jinak bych ta data neměl vracet
                        }
                        return def.resolve(retData).promise(); // Jestliže není potřeba volat ISL metodu, vracím zde rovnou promise + resolve
                    }
                }
            };
            GPripadPodaniZeSablony = __decorate([
                Decorators.gcontent
            ], GPripadPodaniZeSablony);
            WebClient.GPripadPodaniZeSablony = GPripadPodaniZeSablony;
            //interface retDataSablony {
            //    zobraz_vyber_esu: Boolean; //! zobrazí výběr esu
            //    kon_oso_phl: Boolean | null; //! kontrola osoby v dané pohledávce
            //    akt_rob_esu: Boolean | null; //! aktualizovat z ROB již evidovaným ESU
            //    ixs_dsa: String | null; // Identifikátor šablony
            //    ixs_esu: String | null; // Identifikátor ESU
            //}
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFBvZGFuaVplU2FibG9ueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmlwYWRQb2RhbmlaZVNhYmxvbnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0E0UmY7QUE1UkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNFJuQjtJQTVSZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNFI3QjtRQTVSb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7Ozs7O2VBVUc7WUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLE9BQUEsWUFBWTtnQkFBeEQ7b0JBRUksNkJBQTZCOztvQkFhN0IsbURBQW1EO29CQUMzQyxhQUFRLEdBQVksSUFBSSxDQUFDO29CQUNqQywwQ0FBMEM7b0JBQ2xDLGVBQVUsR0FBVyxVQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFtUC9ELGtFQUFrRTtnQkFDdEUsQ0FBQztnQkFqUEcsRUFBRTtnQkFDRixzRUFBc0U7Z0JBQ3RFLDJFQUEyRTtnQkFDM0UscURBQXFEO2dCQUNyRCxrREFBa0Q7Z0JBRWxELGlDQUFpQztnQkFFakM7OzttQkFHRztnQkFDSCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBRTlHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxV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T0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyw4RUFBOEU7b0JBQ3pILENBQUM7Z0JBQ0wsQ0FBQzthQUVKLENBQUE7WUF0UVksc0JBQXNCO2dCQURsQyxVQUFVLENBQUMsUUFBUTtlQUNQLHNCQUFzQixDQXNRbEM7WUF0UVksZ0NBQXNCLHlCQXNRbEMsQ0FBQTtZQUVELDRCQUE0QjtZQUM1QixzREFBc0Q7WUFDdEQsdUVBQXVFO1lBQ3ZFLDRFQUE0RTtZQUM1RSxzREFBc0Q7WUFDdEQsa0RBQWtEO1lBQ2xELEdBQUc7UUFDUCxDQUFDLEVBNVJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0UjdCO0lBQUQsQ0FBQyxFQTVSZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNFJuQjtBQUFELENBQUMsRUE1UlMsTUFBTSxLQUFOLE1BQU0sUUE0UmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZFBvZGFuaVplU2FibG9ueS50cyAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvWLEm3IgxaFhYmxvbnkgcMWZaSBwb2TDoW7DrSBwxZnDrXBhZHUgemUgxaFhYmxvbnkgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2tubyBwcm8gdsO9YsSbciDFoWFibG9ueSBwxZlpIHBvZMOhbsOtIHDFmcOtcGFkdSB6ZSDFoWFibG9ueSAgIFxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNlxyXG4gICAgICogQGNyZWF0ZWQgMjAyNS0wNC0wMVxyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI1LTA0LTAzXHJcbiAgICAgKiBAZ3VwdGEgZGxnX1phbFByaXBaZVNhYmxvbnlcclxuICAgICAqIEBkZXNjcmlwdGlvbiBkaWFsb2cgcHJvIHbDvWLEm3IgxaFhYmxvbnkgdiBwxZnDrXBhZMSbIGZsYWcgYml0dS16b2JyYXpfdnliZXJfZXN1IG5hIFRSVUUgem9icmF6w60gamXFoXTEmyB2w71ixJtyIGV4dGVybsOtaG8gc3ViamVrdHVcclxuICAgICAqICAgICAgICAgICAgICAgIGEgcG8gc3Rpc2t1IE9LIHphbG/FvsOtIHDFmcOtcGFkIChkbGUgxaFhYmxvbnkgYSBlc3UpXHJcbiAgICAgKiAgICAgICAgICAgICAgICBwxZlpIHphdm9sw6Fuw60gZGxnX1phbFByaXBaZVNhYmxvbnkgc2UgcG8gc3Rpa3UgT0sgcHJvdmVkZSBpbmljaWFsaXphY2UgcMWZw61wYWR1XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZFBvZGFuaVplU2FibG9ueSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTXHJcblxyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBwxZnDrXBhZHUgKi9cclxuICAgICAgICBwcml2YXRlIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8vLyoqIElkZW50aWZpa8OhdG9yIGtuaWh5IC0gZWtvcGFyYW1zICovXHJcbiAgICAgICAgLy9wcml2YXRlIEl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIC8vLyoqIFR5cCBwb2hsZWTDoXZreSAtIGVrb3BhcmFtcyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBUeXBQaGw6IHN0cmluZztcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8qKiBQYXJhbWV0cnkgKi9cclxuICAgICAgICBwcml2YXRlIFBhcmFtczogR29yZGljLkRkcC5JbnRlcmZhY2UuR0RkcFBhcmFtZXRyeUR0bztcclxuICAgICAgICAvLyEgem9icmF6w60gdsO9YsSbciBlc3VcclxuICAgICAgICBwcml2YXRlIHpvYnJhel92eWJlcl9lc3U6IGJvb2xlYW47IFxyXG4gICAgICAgIC8qKiBwcm8gcHJ2bsOtIHBva3VzIG8gcG9kw6Fuw60gcMWZw61wYWR1IGJleiDFoWFibG9ueSAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlyc3RUcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBwcm8gdsO9YsSbciBiZXogxaFhYmxvbnkgKi9cclxuICAgICAgICBwcml2YXRlIG51bGxJeHNEc2E6IHN0cmluZyA9IENvbW1vbi5HbG9iYWxzLnNnTnVsbC5udWxsU2FibG9ueTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByb2I6IGJvb2xlYW47XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL1JFVFVSTiAtPiBrb25fb3NvX3BobDogQm9vbGVhbjsgLy8hIGtvbnRyb2xhIG9zb2J5IHYgZGFuw6kgcG9obGVkw6F2Y2VcclxuICAgICAgICAvL1JFVFVSTiAtPiBha3Rfcm9iX2VzdTogQm9vbGVhbjsgLy8hIGFrdHVhbGl6b3ZhdCB6IFJPQiBqacW+IGV2aWRvdmFuw71tIEVTVVxyXG4gICAgICAgIC8vUkVUVVJOIC0+IGl4c19kc2E6IFN0cmluZzsgLy8gSWRlbnRpZmlrw6F0b3IgxaFhYmxvbnlcclxuICAgICAgICAvL1JFVFVSTiAtPiBpeHNfZXN1OiBTdHJpbmc7IC8vIElkZW50aWZpa8OhdG9yIEVTVSBcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSAodGhhdC56b2JyYXpfdnliZXJfZXN1ID8gXCJaYWxvxb5lbsOtIHDFmcOtcGFkdSB6ZSDFoWFibG9ueVwiIDogXCJIcm9tYWRuw6kgemFsb8W+ZW7DrSBwxZnDrXBhZMWvIHplIMWhYWJsb255XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhhdC5vbkFmdGVySW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYXN0YXZlbsOtIHBvbMOtxI1layBhIGRhdCBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBzZXRXaW5kb3coKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb25BZnRlckluaXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQuem9icmF6X3Z5YmVyX2VzdSkgeyAvLyB2eWLDrXLDoW0gxaFhYmxvbnkgYmV6IGVzdVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuUGFyYW1zLmRkcF9lc3VfY2hlY2sgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjYl9rb25fb3NvX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyB2eWLDrXJtIMWhYWJsb255IGkgZXN1XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2Jfa29uX29zb19waGxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IEZ1bmN0aW9uOiBWeWJpcmF0TmVqYWt0dWFsbmVqc2lWZXJ6aUVTVShcImRkcF93dV91c2VcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEEgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBjb21tYW5kIGJhcnUgcyB0bGHEjcOtdGt5IHBybyB1bG/FvmVuw60gYSB6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ29tbWFuZEJhcigpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96aXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHJldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgLy8gVWxvxb5lbsOtIGRhdCBhIHphdsWZZW7DrSBva25hIHYgcMWZw61wYWTEmyDDunNwxJtjaHUgbWV0b2R5LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJDaHliYSBwxZlpIG5hxI10ZW7DrSBkYXQgeiBmb3JtdWzDocWZZSFcIik7IC8vIFRPRE86IENoeWJhIHDFmWkgdWtsw6Fkw6Fuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH0gLy8gWmF2xZllbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkZvcm1zLkZvcm19IC0gVnJhY8OtIGZvcm11bMOhxZlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtR1ByaXBhZFBvZGFuaVplU2FibG9ueVwiIH0pO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gZm9ybVxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBuYW1lOiBcInNlY3Rpb25HUHJpcGFkUG9kYW5pWmVTYWJsb255XCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJaYWRlanRlIMWhYWJsb251XCIgLyosIHJlcXVpcmVkOiB0cnVlKi8gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmRkcHNkc2EoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2RzYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19kc2E9aXhzX2RzYTtcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpvYnJhel92eWJlcl9lc3U6IHRoYXQuem9icmF6X3Z5YmVyX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlIS5peHNfZHNhID09IHRoYXQubnVsbEl4c0RzYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaXNhYmxlRmllbGRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaXNhYmxlRmllbGRzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LnJvYikge1xyXG4gICAgICAgICAgICAgICAgbWFpbkZvcm0uYWRkUm93KHsgbGFiZWw6IFwiUG9wbGF0bsOta1wiIC8qLCByZXF1aXJlZDogdHJ1ZSovIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucG9abWVuZVN1Ympla3R1KGN0eCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1O2VzdV9kaWM9ZGljO21vZGVsLmxpYz12YWx1ZS5saWM7bW9kZWwucG9yX3phc3Q9dmFsdWUucG9yX3phc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IC8qdGhhdC5JeHAgPz8gKi9Db21tb24uR2xvYmFscy5zZ051bGwuTnVsbEl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IC8qdGhhdC5JeHAgPz8qLyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiTmHEjXRlbsOtIHBvcGxhdG7DrWthIHDFmWkgemFrbMOhZMOhbsOtIHDFmcOtcGFkdSAoemUgxaFhYmxvbnkpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5Gb3JtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNiX2tvbl9vc29fcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJLb250cm9sb3ZhdCBleGlzdGVuY2kgb3NvYnkgdiBkYW7DqSBwb2hsZWTDoXZjZT9cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2JfYWt0X3JvYl9lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFrdHVhbGl6b3ZhdCDDumRhamUgeiBST0IgcHJvIGppxb4gZXZpZG92YW7DqSBFU1U/XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYWluRm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBjaGFuZ2luZ1ZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaXNhYmxlRmllbGRzKGNoYW5naW5nVmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjYl9rb25fb3NvX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBjaGFuZ2luZ1ZhbHVlKVxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2JfYWt0X3JvYl9lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgY2hhbmdpbmdWYWx1ZSlcclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgY2hhbmdpbmdWYWx1ZSlcclxuICAgICAgICAgICAgaWYgKGNoYW5naW5nVmFsdWUpIHsgLy8ga2R5xb4gc2UgamFqw60gdnlwbm91dCBwb2xlLCB0YWsgc2UgdGFrw6kgdnltYcW+ZSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2Jfa29uX29zb19waGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbClcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjYl9ha3Rfcm9iX2VzdVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbClcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoXCJzZXRWYWxpZGF0b3JzXCIsIFtdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gcG8gdsO9YsSbcnUgxaFhYmxvbnkgc2UgcG9wbGF0bsOta292aSB6YXNlIG5hc3RhdsOtIHJlcXVpcmVkIGZsYWcgYSB2YWxpZGF0b3JcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgXCJyZXF1aXJlZFwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICBcclxuICAgICAgICAvLyNlbmRyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gQSBDIFQgSSBPIE4gUyAtIFYgWSBUIFYgTyDFmCBFIE4gw40gIEEgIEQgRSBGIEkgTiBJIEMgRVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSB0bGHEjcOtdGtvIG5hZCBzZXpuYW1lbSBrb250cm9sIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQWN0aW9ucygpXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IC0gVWtvbsSNZW7DrSBtZXRvZHkgdm9pZFxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0UG90b21reUNvbnRlbnR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB1bG/FvmVuw60gZGF0IHogb2JzYWh1IFxyXG4gICAgICAgICAqIEBtZXRob2QgdWxveml0KClcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZSA8VWtvbsSNZW7DrSBtZXRvZHkgdm9pZD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1bG96aXQoKTogSlF1ZXJ5UHJvbWlzZTxEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRGF0YVByb1NhYmxvbnVEdG8+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREYXRhUHJvU2FibG9udUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIHZhbGlkYWNlIGZvcm11bMOhxZllIFxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByZXREYXRhOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRGF0YVByb1NhYmxvbnVEdG8gPSBuZXcgT2JqZWN0KCkgYXMgRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZERhdGFQcm9TYWJsb251RHRvO1xyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHJldERhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJldERhdGEuaXhzX2RzYSA9PSBcIlwiIHx8IHJldERhdGEuaXhzX2RzYSA9PSBudWxsKSB7IC8vISBwb2t1ZCBuZW7DrSB2eWJyYW7DoSDFoWFibG9uYSBuZWx6ZSBwb2tyYcSNb3ZhdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiVnliZXIgxaFhYmxvbnUgcHJvIHBvZMOhbsOtIVwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJldERhdGEuaXhzX2RzYSA9PSB0aGF0Lm51bGxJeHNEc2EpIHsgLy8gJiYgdGhhdC5maXJzdFRyeSkge1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmZpcnN0VHJ5ID0gZmFsc2U7IC8vIHp2bMOhxaF0bsOtIHVwb3pvcm7Em27DrSB2IGd1cHTEmywgcG8gZHJ1aMOpIGJ5IHNlIHRvIG5lbcSbbG8gbmV1a2F6b3ZhdCB8IC0gYWxlIHrFmWVqbcSbIGkgdGFrIHZyw6F0w60gY2h5YnUgLSBpZGsgamFrIHRvIGZ1bmd1amUgOkRcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJaYWRlanRlIHByb3PDrW0gxaFhYmxvbnUuXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIk9wcmF2ZHUgY2hjZXRlIHBvZGF0IHDFmcOtcGFkIGJleiDFoWFibG9ueT9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXREYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyEgemFwYW1hdHVqZSBzZSB2eWJyYW7DoSDFoWFibG9uYVxyXG4gICAgICAgICAgICAgICAgLy90b2RvOiBDYWxsIGdmX1Vsb3pMb2thbG5pUGFyYW1ldHIoICdkZHBfdnlicmFuYV9zYWJsb25hJywgb3BfaXhzX2RzYSApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuem9icmF6X3Z5YmVyX2VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmV0RGF0YS5peHNfZXN1ID09IFwiXCIgfHwgcmV0RGF0YS5peHNfZXN1ID09IENvbW1vbi5HbG9iYWxzLnNnTnVsbC5OdWxsRXN1KSAmJiByZXREYXRhLml4c19kc2EgIT0gdGhhdC5udWxsSXhzRHNhKSB7IC8vISBiZXogaXhzX2VzdSBhIHrDoXJvdmXFiCBwb2TDoW7DrSDFoWFibG9ub3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSBwb3BsYXRuw61rYSAoZXh0ZXJuw60gc3ViamVrdCkgcHJvIHphbG/FvmVuw60gcMWZw61wYWR1IVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXREYXRhLmtvbl9vc29fcGhsID0gZmFsc2U7IC8vIHRhayB0byB1ZMSbbMOhbSBvcGHEjW7EmyBhIGRvcGxuw61tIG51bGwgdGFtIGtkZSBuZWNoY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBOQVNUQVZJVCBpeHNfZXN1IGRvIHByb23Em25uw6kgcmV0RGF0YS5peHNfZXN1IC8vLWppbmFrIGJ5Y2ggdGEgZGF0YSBuZW3Em2wgdnJhY2V0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXREYXRhLml4c19lc3UgPSBudWxsOyAvLyB0YWsgdG8gdWTEm2zDoW0gb3BhxI1uxJsgYSBkb3BsbsOtbSBudWxsIHRhbSBrZGUgbmVjaGNpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBOQVNUQVZJVCBrb25fb3NvX3BobCBkbyBwcm9txJtubsOpIHJldERhdGEua29uX29zb19waGwgIC8vLWppbmFrIGJ5Y2ggdGEgZGF0YSBuZW3Em2wgdnJhY2V0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmV0RGF0YSkucHJvbWlzZSgpOyAvLyBKZXN0bGnFvmUgbmVuw60gcG90xZllYmEgdm9sYXQgSVNMIG1ldG9kdSwgdnJhY8OtbSB6ZGUgcm92bm91IHByb21pc2UgKyByZXNvbHZlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEVcclxuICAgIH1cclxuXHJcbiAgICAvL2ludGVyZmFjZSByZXREYXRhU2FibG9ueSB7XHJcbiAgICAvLyAgICB6b2JyYXpfdnliZXJfZXN1OiBCb29sZWFuOyAvLyEgem9icmF6w60gdsO9YsSbciBlc3VcclxuICAgIC8vICAgIGtvbl9vc29fcGhsOiBCb29sZWFuIHwgbnVsbDsgLy8hIGtvbnRyb2xhIG9zb2J5IHYgZGFuw6kgcG9obGVkw6F2Y2VcclxuICAgIC8vICAgIGFrdF9yb2JfZXN1OiBCb29sZWFuIHwgbnVsbDsgLy8hIGFrdHVhbGl6b3ZhdCB6IFJPQiBqacW+IGV2aWRvdmFuw71tIEVTVVxyXG4gICAgLy8gICAgaXhzX2RzYTogU3RyaW5nIHwgbnVsbDsgLy8gSWRlbnRpZmlrw6F0b3IgxaFhYmxvbnlcclxuICAgIC8vICAgIGl4c19lc3U6IFN0cmluZyB8IG51bGw7IC8vIElkZW50aWZpa8OhdG9yIEVTVVxyXG4gICAgLy99XHJcbn0iXX0=