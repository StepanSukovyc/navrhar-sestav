"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadKontace.ts                      </Name>
//    <Description> Okno s detailem/seznamem kontací pro detail případu         </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-19                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//TODO: Editace kontace - na konci dokumentu jsou poznámky k tomu
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno s detailem/seznamem kontací pro detail případu
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-09-15
             * @lastModified 2025-##-##
             */
            let GPripadKontace = class GPripadKontace extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S  
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createCommandBar();
                    that.createActions();
                    that.createUctovaniGrid();
                    that.createForm();
                    that.createPredkontaceGrid();
                    that.element.findForms().findFields("rok_ixe").gfield("model", "apply", { rok: that.RokDen }, { initialValues: true });
                    that.element.findForms().findFields("ktg_upo").gfield("model", "apply", { ktg_upo: 0 }, { initialValues: true });
                    let view = new Gordic.Data.View([that.DetailDto], { /*key: "ixp,radek_pol,subradek,radek_av"*/});
                    that.$gridUctovani.ggrid("setData", view);
                    that.nactiData();
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
                            caption: "OK",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ulozit().done(() => { that.close(); }); // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře s výběrem období a kategorie pohybu
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GDdpFormPripadKontace", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0" });
                    //#region form
                    mainForm
                        .addSection({ customClass: "ddp-section-width-60" })
                        .addRow({ label: "Období", customClass: "left" })
                        .addField("gselectbox", Gordic.Prefabs.Select.nEkosobd(), {
                        name: "rok_ixe",
                        model: "model.rok=value.rok_ixe",
                        dropdown: true,
                        change: function (ev, input) {
                            that.nactiData();
                        }
                    })
                        .addSection({ customClass: "ddp-section-width-40" })
                        .addRow({ label: "Kategorie pohybu", customClass: "left" })
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo",
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        serverFilters: {
                            ktg_upo: WebClient.Common.Base.naplneniPoleKtgUpoPre(0, 199)
                        },
                        dropdown: true,
                        change: function (ev, input) {
                            that.nactiData();
                        }
                    });
                    //#endregion
                    that.defaultForm = $.newDiv( /*ID*/).appendTo(that.element).gform("createFrom", mainForm);
                    return mainForm;
                }
                /**
                 * Metoda pro vytvoření gridu s předkontacemi pohybu předpisu
                 * @method createPredkontaceGrid()
                 */
                createUctovaniGrid() {
                    const that = this;
                    that.$gridUctovani = $.newDiv()
                        //.css("height", "100%")
                        .gautofit({ minimalHeight: 200 })
                        .appendTo(this.element)
                        .ggrid({
                        name: "gridUctovani",
                        // TODO: grid dodělat
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                        // defaultAction: 
                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                        columns: WebClient.Common.GridFormats.PripadKontaceUctovani(that, that.dataSentence), //new Gordic.Data.GridFormat<Gordic.Fuc.Interface.GUeTeDto>().addSortedEkoCfuSet(that)                    
                    })
                        .ggridroweditor({
                        allowCopy: true,
                        cancel: function (ev, obj) { debugger; },
                        commit: function (ev, obj) { debugger; },
                        rowBar: Gordic.Widget.GMagicPreFiller.buttons,
                    });
                }
                /**
                 * Metoda pro vytvoření gridu s předkontacemi pohybu předpisu
                 * @method createPredkontaceGrid()
                 */
                createPredkontaceGrid() {
                    const that = this;
                    that.$gridPredkontace = $.newDiv()
                        .css("height", "100%")
                        .gautofit({ minimalHeight: 200 })
                        .appendTo(this.element)
                        .ggrid({
                        name: "gridPredkontace",
                        // TODO: grid dodělat
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                        // defaultAction: 
                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                        columns: WebClient.Common.GridFormats.PripadKontacePredkontace(that)
                    });
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoření action list a jednotlivých akcí
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
                        {
                            name: "actDefaultGridAction",
                            run: () => {
                                //const here = this;
                                //let row = that.grid.ggrid("activeRow");
                                //// let row = that.grid.ggrid<Ddp.Interface.GNázevDto­kaPoužívanýmVgridu>("activeRow")
                                //// let rows = that.grid.ggrid<Ddp.Interface.GNázevDto­kaPoužívanýmVgridu>("getSelection")[0];
                                //if (!row) return that.dialogs.warning("Není vybrán žádný řádek.");
                                //// else code here what to do . . . 
                            }
                        },
                    ]);
                }
                /**
                 * Nahrání a zobrazení způsobu zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                nactiData() {
                    let that = this;
                    let rokIxe = that.element.findForms().findFields("rok_ixe").gfield("getValue"); //GEkosobdAktivniDto
                    let ktgUpo = that.element.findForms().findFields("ktg_upo").gfield("getValue");
                    let typUpr = that.Typ_upr;
                    let rok = rokIxe?.rok ?? that.RokDen;
                    //that.beginOperation("Probíhá načtení informací");
                    that.viewKontace = new Gordic.Isl.View(that.isl.PripadKontace
                        .list(rq => {
                        return {
                            filters: {
                                typ_upr: typUpr,
                                rok_ixe: rok,
                                ktg_upo: ktgUpo?.ktg_upo ?? 0
                            }
                        };
                    }));
                    that.$gridPredkontace.ggrid("setData", that.viewKontace);
                    that.viewKontace.getLoadingPromise().done(function () {
                        that.nastavDataSentence(rok);
                        that.$gridUctovani.ggrid("refresh"); //aby se aplikovaly změny v editovatelnosti
                        //that.endOperation();
                    });
                }
                nastavDataSentence(rok) {
                    const that = this;
                    const editableFields = ['uea_t', 'ueb_t', 'uec_t', 'ued_t', 'uee_t', 'uef_t', 'ueg_t', 'ueh_t', 'uei_t', 'uej_t', 'te0_t', 'te1_t', 'te2_t', 'te3_t', 'te4_t', 'uek_t', 'uel_t', 'uem_t', 'uen_t', 'te5_t', 'te6_t', 'te7_t', 'te8_t', 'te9_t'];
                    that.dataSentence.rok = rok;
                    //nejprve nastavím všechny řádky ne needitovatelné
                    that.dataSentence.allSortedDataWords?.forEach((radek) => {
                        radek.CanEdit = false;
                    });
                    //poté projedu načtené kontace a porovnám jednotlivé sloupce zda se mohou editovat
                    that.viewKontace.getDataRows().forEach((radek) => {
                        editableFields.forEach((fieldName) => {
                            const value = radek[fieldName]?.trim?.();
                            if (value && value[0] === '#') {
                                const baseName = fieldName.split('_')[0]; // nebo s regexem
                                const word = that.dataSentence.allSortedDataWords?.find(w => w.DbNazev === baseName);
                                if (word) {
                                    word.CanEdit = true;
                                }
                            }
                        });
                    });
                    //const editableFields = ['uea', 'ueb', 'uec', 'ued', 'uee', 'uef', 'ueg', 'ueh', 'uei', 'uej', 'te0', 'te1', 'te2', 'te3', 'te4', 'uek', 'uel', 'uem', 'uen', 'te5', 'te6', 'te7', 'te8', 'te9'];
                    //that["dataSentence"].rok = rok;
                    ////nejprve nastavím všechny řádky ne needitovatelné
                    //that["dataSentence"].allSortedDataWords?.forEach((radek) => {
                    //    radek.CanEdit = false;
                    //})
                    ////poté projedu načtené kontace a porovnám jednotlivé sloupce zda se mohou editovat
                    //that.viewKontace.getDataRows().forEach((radek) => {
                    //    editableFields.forEach((fieldName) => {
                    //        const value = radek[fieldName]?.trim?.();
                    //        if (value && value[0] === '#') {
                    //            const word = that["dataSentence"].allSortedDataWords?.find(w => w.DbNazev === fieldName);
                    //            if (word) {
                    //                word.CanEdit = true;
                    //            }
                    //        }
                    //    });
                    //});
                }
                /**
                 * Metoda pro uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit() {
                    const that = this;
                    //var def = $.Deferred<void>();                                            // Vytvoření promisu
                    //that.beginOperation({ id: "opSaveContentLoading", text: "Ukládám..." }); // Zobrazení dialogu s načítáním
                    //that.isl.NazevTridyISLu.islMetodaProUlozeni({ data: dataKuložení })      // Zavolání ISL metody k uložení dat lhůty
                    //    .get()
                    //    .done(function (ret) {                                               // V případě úspěchu
                    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
                    //        return def.resolve();                                            // Vrací promise_resolve = úspěch
                    //    })
                    //    .fail(function (jqXHR, typ, obj) {                                   // V případě chyby
                    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
                    //        if (typ === "exception") {                                       // V případě výjimky
                    //            obj.handled = true;                                          // Nastavení výjimky jako ošetřené
                    //            that.dialogs.error("Chyba", obj.baseMessage)                 // Zobrazení dialogu s chybou
                    //                .on("close", (ev, retVal) => {                           // Po zavření dialogu
                    //                    return def.reject();                                 // Vrací promise_reject = chyba
                    //                });
                    //        }
                    //        else { return def.reject(); }                                    // Vrací promise_reject = chyba (i když se nejedná o ošetřenou výjimku)
                    //    });
                    //return def.promise();                                                    // Vrací promise
                    return $.Deferred().resolve().promise(); // Jestliže není potřeba volat ISL metodu, vracím zde rovnou promise + resolve
                }
            };
            GPripadKontace = __decorate([
                Decorators.gcontent
            ], GPripadKontace);
            WebClient.GPripadKontace = GPripadKontace;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
/*

TODO: Editace kontace - zřejmě při zakládaní gridu kde dávám data ve formátu Eko.WebClient.GDataSentenceDto musí obsahovat mnou načtené předkontace a ne ty obecné/globální

    Povedlo se mi nastavit editor kontace, avšak nepřišel jsme na to jak do něj dostat „pravidla“ která si načítám sám
        ale používají se nějaké eko globální, což způsobuje, že jsou editovatelné sloupce které by neměli (nebo naopak nejsou editovatelné ty které potřebuju)
    
    Musím zjistit jak to dto funguje a co vše je tam potřeba načítat
        – jelikož na políčkách také funguje akce pod zkratkou F4 která otevře nabídku se seznamem řádků které lze vložit

    Další věc, dlouhodobě jsem se brzdil na problému, který mi vyskakoval chybu, ale zřejmě jde o chybu právě na onom případě/typu pohledávky/db
        – protože když jsem to začal testovat na mepro chyba mi nevyskočila. Co je větší záhadou je že mi vyskakuje chyba (i když jiná) tak také v TK.
            - V TK mi to vyskočí když na editovatelném poli stisknu F4
            - Ve WK mi to vyskoči během kontrol sloujpců po aktivaci editačního režimu
            
   Prozatím jsme nechal deaktivovanou ukládací možnost a okno s kontacemi bude sloužit pouze pro prohlížení dokud nedodělám editaci kontace.
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZEtvbnRhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkS29udGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLGlFQUFpRTtBQUVqRSxJQUFVLE1BQU0sQ0F3VGY7QUF4VEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd1RuQjtJQXhUZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBd1Q3QjtRQXhUb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7ZUFNRztZQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBK0I1QyxrQ0FBa0M7Z0JBRWxDOzs7bUJBR0c7Z0JBQ0gsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDdkgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFP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M0YsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyw4RUFBOEU7Z0JBQ2pJLENBQUM7YUFFSixDQUFBO1lBOVNZLGNBQWM7Z0JBRDFCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsY0FBYyxDQThTMUI7WUE5U1ksd0JBQWMsaUJBOFMxQixDQUFBO1FBQ0wsQ0FBQyxFQXhUb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd1Q3QjtJQUFELENBQUMsRUF4VGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdUbkI7QUFBRCxDQUFDLEVBeFRTLE1BQU0sS0FBTixNQUFNLFFBd1RmO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZEtvbnRhY2UudHMgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcyBkZXRhaWxlbS9zZXpuYW1lbSBrb250YWPDrSBwcm8gZGV0YWlsIHDFmcOtcGFkdSAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAg77+9IEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTE5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG4vL1RPRE86IEVkaXRhY2Uga29udGFjZSAtIG5hIGtvbmNpIGRva3VtZW50dSBqc291IHBvem7DoW1reSBrIHRvbXVcclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIE9rbm8gcyBkZXRhaWxlbS9zZXpuYW1lbSBrb250YWPDrSBwcm8gZGV0YWlsIHDFmcOtcGFkdVxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNlxyXG4gICAgICogQGNyZWF0ZWQgMjAyNS0wOS0xNVxyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI1LSMjLSMjXHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1ByaXBhZEtvbnRhY2UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCDDmsSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRVY3RvdmFuaTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIFDFmWVka29udGFjZVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFByZWRrb250YWNlOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSVNMIFZpZXcgUHJvIGtvbnRhY2VcclxuICAgICAgICAgKiBAdHlwZSB7SXNsLlZpZXc8Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdLb250YWNlOiBJc2wuVmlldzxEZHAuSW50ZXJmYWNlLkdEZHBSYWRla1pwekR0bz47IFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEVE8gZGV0YWlsdSBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvO1xyXG4gICAgICAgIC8qKiBSb2sga25paHkgLSBla29wYXJhbXMgKi9cclxuICAgICAgICBSb2tEZW46IG51bWJlcjtcclxuICAgICAgICBUeXBfdXByOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbnRlbmNlOiBHb3JkaWMuRWtvLldlYkNsaWVudC5HRGF0YVNlbnRlbmNlRHRvO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlVWN0b3ZhbmlHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVByZWRrb250YWNlR3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJyb2tfaXhlXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyByb2s6IHRoYXQuUm9rRGVuIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBrdGdfdXBvOiAwIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt0aGF0LkRldGFpbER0b10sIHsgLyprZXk6IFwiaXhwLHJhZGVrX3BvbCxzdWJyYWRlayxyYWRla19hdlwiKi8gfSk7XHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWRVY3RvdmFuaS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbW1hbmRCYXIoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWxveml0KCkuZG9uZSgoKSA9PiB7IHRoYXQuY2xvc2UoKTsgfSkgLy8gVWxvxb5lbsOtIGRhdCBhIHphdsWZZW7DrSBva25hIHYgcMWZw61wYWTEmyDDunNwxJtjaHUgbWV0b2R5LlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIHMgdsO9YsSbcmVtIG9iZG9iw60gYSBrYXRlZ29yaWUgcG9oeWJ1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkZvcm1zLkZvcm19IC0gVnJhY8OtIGZvcm11bMOhxZlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwRm9ybVByaXBhZEtvbnRhY2VcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtNC04LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gZm9ybVxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJkZHAtc2VjdGlvbi13aWR0aC02MFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiT2Jkb2LDrVwiLCBjdXN0b21DbGFzczogXCJsZWZ0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QubkVrb3NvYmQoKSwgeyAvLyBla29zb2JkQWt0aXZuaVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2l4ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZS5yb2tfaXhlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6IFwiZGRwLXNlY3Rpb24td2lkdGgtNDBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkthdGVnb3JpZSBwb2h5YnVcIiwgY3VzdG9tQ2xhc3M6IFwibGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogQ29tbW9uLkJhc2UubmFwbG5lbmlQb2xlS3RnVXBvUHJlKDAsIDE5OSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiUMWZZWRrb250YWNlXCIsIG5hbWU6IFwiR0RkcFNlY3Rpb25QcmlwYWRLb250YWNlXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdigvKklEKi8pLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG1haW5Gb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5Gb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBncmlkdSBzIHDFmWVka29udGFjZW1pIHBvaHlidSBwxZllZHBpc3VcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVByZWRrb250YWNlR3JpZCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVVY3RvdmFuaUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC4kZ3JpZFVjdG92YW5pID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogMjAwIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkVWN0b3ZhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgbsSbamFrw6EgZGVmYXVsdG7DrSBha2NlPyBqZXN0bGkgYW5vLCB0YWsgYnXEjyBvcHJhdmEgcG9sb8W+a3kgbmVibyBuxJtqYWvDvSBub3bDvSBkZXRhaWwgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QcmlwYWRLb250YWNlVWN0b3ZhbmkodGhhdCwgdGhhdC5kYXRhU2VudGVuY2UpLCAvL25ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlRHRvPigpLmFkZFNvcnRlZEVrb0NmdVNldCh0aGF0KSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93ZWRpdG9yPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gKGV2LCBvYmopIHsgZGVidWdnZXI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0OiBmdW5jdGlvbiAoZXYsIG9iaikgeyBkZWJ1Z2dlcjsgfSxcclxuICAgICAgICAgICAgICAgICAgICByb3dCYXI6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLmJ1dHRvbnMsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBncmlkdSBzIHDFmWVka29udGFjZW1pIHBvaHlidSBwxZllZHBpc3VcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVByZWRrb250YWNlR3JpZCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmVka29udGFjZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC4kZ3JpZFByZWRrb250YWNlID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IG1pbmltYWxIZWlnaHQ6IDIwMCB9KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUmFkZWtacHpEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQcmVka29udGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDoSBkZWZhdWx0bsOtIGFrY2U/IGplc3RsaSBhbm8sIHRhayBidcSPIG9wcmF2YSBwb2xvxb5reSBuZWJvIG7Em2pha8O9IG5vdsO9IGRldGFpbCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRBY3Rpb246IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByaXBhZEtvbnRhY2VQcmVka29udGFjZSh0aGF0KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBIEMgVCBJIE8gTiBTIC0gViBZIFQgViBPIMWYIEUgTiDDjSAgQSAgRCBFIEYgSSBOIEkgQyBFXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gYWN0aW9uIGxpc3QgYSBqZWRub3RsaXbDvWNoIGFrY8OtXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFBvdG9ta3lDb250ZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERlZmF1bHRHcmlkQWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgaGVyZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuR07DoXpldkR0b8Kta2FQb3XFvsOtdmFuw71tVmdyaWR1PihcImFjdGl2ZVJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIGxldCByb3dzID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuR07DoXpldkR0b8Kta2FQb3XFvsOtdmFuw71tVmdyaWR1PihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXJvdykgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSDFmcOhZGVrLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBlbHNlIGNvZGUgaGVyZSB3aGF0IHRvIGRvIC4gLiAuIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHpwxa9zb2J1IHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFjdGlEYXRhKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm9rSXhlID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJyb2tfaXhlXCIpLmdmaWVsZDxHb3JkaWMuRGF0YS5SZWFkZXJzLk5Fa29zb2JkRHRvPihcImdldFZhbHVlXCIpOyAvL0dFa29zb2JkQWt0aXZuaUR0b1xyXG4gICAgICAgICAgICBsZXQga3RnVXBvID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZDxHb3JkaWMuRGF0YS5SZWFkZXJzLkZ1Y2N1cG9EdG8+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCB0eXBVcHIgPSB0aGF0LlR5cF91cHI7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm9rID0gcm9rSXhlPy5yb2sgPz8gdGhhdC5Sb2tEZW47XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgbmHEjXRlbsOtIGluZm9ybWFjw61cIik7XHJcbiAgICAgICAgICAgIHRoYXQudmlld0tvbnRhY2UgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuUHJpcGFkS29udGFjZVxyXG4gICAgICAgICAgICAgICAgLmxpc3QocnEgPT4geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91cHI6IHR5cFVwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19peGU6IHJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IGt0Z1Vwbz8ua3RnX3VwbyA/PyAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWRQcmVka29udGFjZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3S29udGFjZSk7XHJcbiAgICAgICAgICAgIHRoYXQudmlld0tvbnRhY2UuZ2V0TG9hZGluZ1Byb21pc2UoKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2RGF0YVNlbnRlbmNlKHJvaylcclxuICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRVY3RvdmFuaS5nZ3JpZChcInJlZnJlc2hcIik7IC8vYWJ5IHNlIGFwbGlrb3ZhbHkgem3Em255IHYgZWRpdG92YXRlbG5vc3RpXHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hc3RhdkRhdGFTZW50ZW5jZShyb2s6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZWRpdGFibGVGaWVsZHMgPSBbJ3VlYV90JywgJ3VlYl90JywgJ3VlY190JywgJ3VlZF90JywgJ3VlZV90JywgJ3VlZl90JywgJ3VlZ190JywgJ3VlaF90JywgJ3VlaV90JywgJ3Vlal90JywgJ3RlMF90JywgJ3RlMV90JywgJ3RlMl90JywgJ3RlM190JywgJ3RlNF90JywgJ3Vla190JywgJ3VlbF90JywgJ3VlbV90JywgJ3Vlbl90JywgJ3RlNV90JywgJ3RlNl90JywgJ3RlN190JywgJ3RlOF90JywgJ3RlOV90J107XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YVNlbnRlbmNlLnJvayA9IHJvaztcclxuICAgICAgICAgICAgLy9uZWpwcnZlIG5hc3RhdsOtbSB2xaFlY2hueSDFmcOhZGt5IG5lIG5lZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICB0aGF0LmRhdGFTZW50ZW5jZS5hbGxTb3J0ZWREYXRhV29yZHM/LmZvckVhY2goKHJhZGVrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByYWRlay5DYW5FZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vcG90w6kgcHJvamVkdSBuYcSNdGVuw6kga29udGFjZSBhIHBvcm92bsOhbSBqZWRub3RsaXbDqSBzbG91cGNlIHpkYSBzZSBtb2hvdSBlZGl0b3ZhdFxyXG4gICAgICAgICAgICB0aGF0LnZpZXdLb250YWNlLmdldERhdGFSb3dzKCkuZm9yRWFjaCgocmFkZWspID0+IHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlRmllbGRzLmZvckVhY2goKGZpZWxkTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcmFkZWtbZmllbGROYW1lXT8udHJpbT8uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlWzBdID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZU5hbWUgPSBmaWVsZE5hbWUuc3BsaXQoJ18nKVswXTsgLy8gbmVibyBzIHJlZ2V4ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZCA9IHRoYXQuZGF0YVNlbnRlbmNlLmFsbFNvcnRlZERhdGFXb3Jkcz8uZmluZCh3ID0+IHcuRGJOYXpldiA9PT0gYmFzZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZC5DYW5FZGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9jb25zdCBlZGl0YWJsZUZpZWxkcyA9IFsndWVhJywgJ3VlYicsICd1ZWMnLCAndWVkJywgJ3VlZScsICd1ZWYnLCAndWVnJywgJ3VlaCcsICd1ZWknLCAndWVqJywgJ3RlMCcsICd0ZTEnLCAndGUyJywgJ3RlMycsICd0ZTQnLCAndWVrJywgJ3VlbCcsICd1ZW0nLCAndWVuJywgJ3RlNScsICd0ZTYnLCAndGU3JywgJ3RlOCcsICd0ZTknXTtcclxuICAgICAgICAgICAgLy90aGF0W1wiZGF0YVNlbnRlbmNlXCJdLnJvayA9IHJvaztcclxuICAgICAgICAgICAgLy8vL25lanBydmUgbmFzdGF2w61tIHbFoWVjaG55IMWZw6Fka3kgbmUgbmVlZGl0b3ZhdGVsbsOpXHJcbiAgICAgICAgICAgIC8vdGhhdFtcImRhdGFTZW50ZW5jZVwiXS5hbGxTb3J0ZWREYXRhV29yZHM/LmZvckVhY2goKHJhZGVrKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJhZGVrLkNhbkVkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvLy8vcG90w6kgcHJvamVkdSBuYcSNdGVuw6kga29udGFjZSBhIHBvcm92bsOhbSBqZWRub3RsaXbDqSBzbG91cGNlIHpkYSBzZSBtb2hvdSBlZGl0b3ZhdFxyXG4gICAgICAgICAgICAvL3RoYXQudmlld0tvbnRhY2UuZ2V0RGF0YVJvd3MoKS5mb3JFYWNoKChyYWRlaykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBlZGl0YWJsZUZpZWxkcy5mb3JFYWNoKChmaWVsZE5hbWUpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnN0IHZhbHVlID0gcmFkZWtbZmllbGROYW1lXT8udHJpbT8uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWVbMF0gPT09ICcjJykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB0aGF0W1wiZGF0YVNlbnRlbmNlXCJdLmFsbFNvcnRlZERhdGFXb3Jkcz8uZmluZCh3ID0+IHcuRGJOYXpldiA9PT0gZmllbGROYW1lKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAod29yZCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB3b3JkLkNhbkVkaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdWxvxb5lbsOtIGRhdCB6IG9ic2FodVxyXG4gICAgICAgICAqIEBtZXRob2QgdWxveml0KClcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZSA8VWtvbsSNZW7DrSBtZXRvZHkgdm9pZD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1bG96aXQoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3ZhciBkZWYgPSAkLkRlZmVycmVkPHZvaWQ+KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBwcm9taXN1XHJcbiAgICAgICAgICAgIC8vdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZUNvbnRlbnRMb2FkaW5nXCIsIHRleHQ6IFwiVWtsw6Fkw6FtLi4uXCIgfSk7IC8vIFpvYnJhemVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuICAgICAgICAgICAgLy90aGF0LmlzbC5OYXpldlRyaWR5SVNMdS5pc2xNZXRvZGFQcm9VbG96ZW5pKHsgZGF0YTogZGF0YUt1bG/FvmVuw60gfSkgICAgICAvLyBaYXZvbMOhbsOtIElTTCBtZXRvZHkgayB1bG/FvmVuw60gZGF0IGxoxa90eVxyXG4gICAgICAgICAgICAvLyAgICAuZ2V0KClcclxuICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKHJldCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIMO6c3DEm2NodVxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiIH0pOyAgICAgICAgICAgICAgIC8vIFVrb27EjWVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVzb2x2ZSA9IMO6c3DEm2NoXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFYgcMWZw61wYWTEmyBjaHlieVxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiIH0pOyAgICAgICAgICAgICAgIC8vIFVrb27EjWVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgdsO9amlta3lcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSB2w71qaW1reSBqYWtvIG/FoWV0xZllbsOpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKSAgICAgICAgICAgICAgICAgLy8gWm9icmF6ZW7DrSBkaWFsb2d1IHMgY2h5Ym91XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gemF2xZllbsOtIGRpYWxvZ3VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVqZWN0ID0gY2h5YmFcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBlbHNlIHsgcmV0dXJuIGRlZi5yZWplY3QoKTsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlX3JlamVjdCA9IGNoeWJhIChpIGtkecW+IHNlIG5lamVkbsOhIG8gb8WhZXTFmWVub3UgdsO9amlta3UpXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDx2b2lkPigpLnJlc29sdmUoKS5wcm9taXNlKCk7IC8vIEplc3RsacW+ZSBuZW7DrSBwb3TFmWViYSB2b2xhdCBJU0wgbWV0b2R1LCB2cmFjw61tIHpkZSByb3Zub3UgcHJvbWlzZSArIHJlc29sdmVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEUgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vKlxyXG5cclxuVE9ETzogRWRpdGFjZSBrb250YWNlIC0gesWZZWptxJsgcMWZaSB6YWtsw6FkYW7DrSBncmlkdSBrZGUgZMOhdsOhbSBkYXRhIHZlIGZvcm3DoXR1IEVrby5XZWJDbGllbnQuR0RhdGFTZW50ZW5jZUR0byBtdXPDrSBvYnNhaG92YXQgbW5vdSBuYcSNdGVuw6kgcMWZZWRrb250YWNlIGEgbmUgdHkgb2JlY27DqS9nbG9iw6FsbsOtIFxyXG5cclxuICAgIFBvdmVkbG8gc2UgbWkgbmFzdGF2aXQgZWRpdG9yIGtvbnRhY2UsIGF2xaFhayBuZXDFmWnFoWVsIGpzbWUgbmEgdG8gamFrIGRvIG7Em2ogZG9zdGF0IOKAnnByYXZpZGxh4oCcIGt0ZXLDoSBzaSBuYcSNw610w6FtIHPDoW1cclxuICAgICAgICBhbGUgcG91xb7DrXZhasOtIHNlIG7Em2pha8OpIGVrbyBnbG9iw6FsbsOtLCBjb8W+IHpwxa9zb2J1amUsIMW+ZSBqc291IGVkaXRvdmF0ZWxuw6kgc2xvdXBjZSBrdGVyw6kgYnkgbmVtxJtsaSAobmVibyBuYW9wYWsgbmVqc291IGVkaXRvdmF0ZWxuw6kgdHkga3RlcsOpIHBvdMWZZWJ1anUpXHJcbiAgICBcclxuICAgIE11c8OtbSB6amlzdGl0IGphayB0byBkdG8gZnVuZ3VqZSBhIGNvIHbFoWUgamUgdGFtIHBvdMWZZWJhIG5hxI3DrXRhdCBcclxuICAgICAgICDigJMgamVsaWtvxb4gbmEgcG9sw63EjWvDoWNoIHRha8OpIGZ1bmd1amUgYWtjZSBwb2QgemtyYXRrb3UgRjQga3RlcsOhIG90ZXbFmWUgbmFiw61ka3Ugc2Ugc2V6bmFtZW0gxZnDoWRrxa8ga3RlcsOpIGx6ZSB2bG/Fvml0XHJcblxyXG4gICAgRGFsxaHDrSB2xJtjLCBkbG91aG9kb2LEmyBqc2VtIHNlIGJyemRpbCBuYSBwcm9ibMOpbXUsIGt0ZXLDvSBtaSB2eXNrYWtvdmFsIGNoeWJ1LCBhbGUgesWZZWptxJsgamRlIG8gY2h5YnUgcHLDoXbEmyBuYSBvbm9tIHDFmcOtcGFkxJsvdHlwdSBwb2hsZWTDoXZreS9kYiBcclxuICAgICAgICDigJMgcHJvdG/FvmUga2R5xb4ganNlbSB0byB6YcSNYWwgdGVzdG92YXQgbmEgbWVwcm8gY2h5YmEgbWkgbmV2eXNrb8SNaWxhLiBDbyBqZSB2xJt0xaHDrSB6w6FoYWRvdSBqZSDFvmUgbWkgdnlza2FrdWplIGNoeWJhIChpIGtkecW+IGppbsOhKSB0YWsgdGFrw6kgdiBUSy5cclxuICAgICAgICAgICAgLSBWIFRLIG1pIHRvIHZ5c2tvxI3DrSBrZHnFviBuYSBlZGl0b3ZhdGVsbsOpbSBwb2xpIHN0aXNrbnUgRjRcclxuICAgICAgICAgICAgLSBWZSBXSyBtaSB0byB2eXNrb8SNaSBixJtoZW0ga29udHJvbCBzbG91anBjxa8gcG8gYWt0aXZhY2kgZWRpdGHEjW7DrWhvIHJlxb5pbXVcclxuICAgICAgICAgICAgXHJcbiAgIFByb3phdMOtbSBqc21lIG5lY2hhbCBkZWFrdGl2b3Zhbm91IHVrbMOhZGFjw60gbW/Fvm5vc3QgYSBva25vIHMga29udGFjZW1pIGJ1ZGUgc2xvdcW+aXQgcG91emUgcHJvIHByb2hsw63FvmVuw60gZG9rdWQgbmVkb2TEm2zDoW0gZWRpdGFjaSBrb250YWNlLiAgICAgICAgIFxyXG4qLyJdfQ==