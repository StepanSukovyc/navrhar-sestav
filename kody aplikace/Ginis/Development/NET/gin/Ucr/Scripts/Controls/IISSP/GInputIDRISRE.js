"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GInputIDRISRE = class GInputIDRISRE extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GInputIDRISRE#";
                    this.specialSelect = false;
                    this.zatrideno = false;
                }
                prepareContent(row) {
                    if (!row)
                        return;
                    this.init(row);
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init(options) {
                    if (!options)
                        return;
                    let that = this;
                    // pocatecni nastaveni atributu
                    this.row = options;
                    that.specialSelect = this.row.id_hdr_ris === "0";
                    this.title = "jres:30250333"; //RC 30250333 : Zadejte indetifikaci RISRE
                    this.actions.addRange({
                        actUlozit: {
                            enabled: true, visible: true,
                            caption: "jres:30250341", //RC 30250341 : Zatřídit
                            run: function () {
                                this.setPending(that.Save());
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } })
                    });
                    // prikazova lista
                    that.commandBar([
                        {
                            action: this.actions.actUlozit
                        },
                        {
                            customClass: "g-button--primary",
                            action: this.actions.actZavrit
                        },
                    ]);
                    var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L2M2S1" })
                        .addSection()
                        .addRow("jres:30250334").addField("gstringbox", //RC 30250334 : Identifikace RISRE
                    {
                        name: "id_hdr_ris",
                        change: function (ev, value) { that.changeValue("id_hdr_ris", value); },
                        model: "model.id_hdr_ris=value",
                        maxLength: 10,
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Length({ min: 1, max: 10 }),
                        ]
                    })
                        .addSection()
                        .addRow({ label: "jres:30250335", customClass: "js-radek_hdr" }).addField("gnumberbox", //RC 30250335 : Řádek
                    {
                        name: "radek_hdr",
                        customClass: "js-radek_hdr",
                        returnType: "number",
                        decimals: 0,
                        minValue: 0,
                        decimalSeparator: "",
                        //maxLength: 8,
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Length({ min: 1, max: 8 }),
                        ]
                    });
                    //if (that.specialSelect) {
                    let data;
                    let debug = false;
                    if (debug) {
                        data = new Gordic.Data.View([
                            { txt: "jres:30250340", id_hdr_ris: "-", radek_hdr: 0 } //RC 30250340 : Nezařadit (servis)
                            ,
                            { txt: "jres:30250338", id_hdr_ris: "0", radek_hdr: null } //RC 30250338 : Mimo IISSP
                            ,
                            { txt: "jres:30250339", id_hdr_ris: "0", radek_hdr: 0 } //RC 30250339 : Příjem IISSP
                        ], { key: "id_hdr_ris,radek_hdr" });
                    }
                    else
                        data = new Gordic.Data.View([
                            { txt: "jres:30250338", id_hdr_ris: "0", radek_hdr: null } //RC 30250338 : Mimo IISSP
                            ,
                            { txt: "jres:30250339", id_hdr_ris: "0", radek_hdr: 0 } //RC 30250339 : Příjem IISSP
                        ], { key: "id_hdr_ris,radek_hdr" });
                    form.addRow({ label: "jres:30250342", customClass: "js-spec" }).addField("gselectbox", {
                        name: "radek_hdr2", multi: false, list: false, itemWidth: "", customClass: "js-spec",
                        dropdown: true,
                        helperColumns: ["txt"],
                        itemTemplate: "{txt}",
                        model: "model.id_hdr_ris=value.id_hdr_ris;model.radek_hdr=value.radek_hdr", initialValue: { txt: "jres:30250338", id_hdr_ris: "0", radek_hdr: null } //RC 30250338 : Mimo IISSP
                        ,
                        data: data
                    });
                    var tabHead = $.newDiv()
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    // vyplneni hodnot
                    that.fillValues(tabHead);
                }
                /**
                 * Skryti selectoru
                 *
                 * @param {string} selector
                 */
                hideBySelector(selector) {
                    this.find(selector).hide();
                }
                /**
                 * Zobrazeni selectoru
                 *
                 * @param {string} selector
                 */
                showBySelector(selector) {
                    this.find(selector).show();
                }
                changeValue(itemName, value) {
                    let that = this;
                    debugger;
                    that.specialSelect = false;
                    if (itemName === "id_hdr_ris") {
                        if (value.value === "0") {
                            that.specialSelect = true;
                            that.showBySelector(".js-spec");
                            that.hideBySelector(".js-radek_hdr");
                        }
                        else {
                            that.hideBySelector(".js-spec");
                            that.showBySelector(".js-radek_hdr");
                        }
                    }
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    let editing = false;
                    //if (that.inputValues.currentRow.priz_opak !== 1) {
                    // zjisteni zmen
                    var fields = that.findFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (fields.gfield("hasChanged")) {
                            editing = true;
                            break;
                        }
                    }
                    if (editing && !that.zatrideno)
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        this.dialogs.messageBox("jres:30250070" //RC 30250070 : Upozornění
                        , "jres:30250069", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250069 : Opravdu chcete zavřít detail bez uložení?
                            .on("yes", function () {
                            def.resolve();
                        })
                            .on("close", def.reject);
                    return def.resolve({ zatrideno: that.zatrideno }).promise();
                }
                /**
                 * Vyplneni dat
                 * @param form
                 */
                fillValues(form) {
                    let that = this;
                    if (!that.specialSelect) {
                        form.findFields("id_hdr_ris").gfield("setValue", this.row.id_hdr_ris);
                        form.findFields("radek_hdr").gfield("setValue", this.row.radek_hdr);
                        // nastaveni policek dle hodnot
                        that.changeValue("id_hdr_ris", { value: this.row.id_hdr_ris });
                    }
                }
                /**
                 * Ulozeni hodnot
                 *
                 * */
                Save() {
                    var that = this;
                    if (that.closed)
                        return $.Deferred().resolve().promise();
                    debugger;
                    var dtoSaveData = { id_hdr_ris: "", radek_hdr: 0 };
                    if (that.specialSelect)
                        that.findFields().gfield("model", "collect", dtoSaveData);
                    else {
                        dtoSaveData.id_hdr_ris = that.findFields("id_hdr_ris").gfield("getValue");
                        dtoSaveData.radek_hdr = that.findFields("radek_hdr").gfield("getValue");
                    }
                    //that.row.ico = "ico";
                    //that.row.rok = 2012;
                    //that.row.ac= "test_ac";
                    that.beginOperation("jres:30250331"); //RC 30250331 : Probíhá zatříďovaní...
                    return that.isl.UcrRisreSkutecnost.zatridit({ zapis: that.row, id_hdr_ris: dtoSaveData.id_hdr_ris, radek_hdr: dtoSaveData.radek_hdr })
                        .get()
                        .then(() => {
                        that.showFlash("jres:30250332");
                        that.zatrideno = true;
                        that.tryClose();
                        return;
                    }) //RC 30250332 : Zatřídění provedeno
                        .always(() => that.endOperation());
                    //return def.promise();
                }
            };
            GInputIDRISRE = __decorate([
                Decorators.gcontent
            ], GInputIDRISRE);
            WebClient.GInputIDRISRE = GInputIDRISRE;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0lucHV0SURSSVNSRS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdJbnB1dElEUklTUkUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQStPZjtBQS9PRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErT25CO0lBL09nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErTzdCO1FBL09vQixXQUFBLFNBQVM7WUFJMUIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFBL0M7O29CQUNJLFFBQUcsR0FBRyxnQkFBZ0IsQ0FBQztvQkFHZixrQkFBYSxHQUFZLEtBQUssQ0FBQztvQkFDL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztnQkFxTzlCLENBQUM7Z0JBbk9HLGNBQWMsQ0FBQyxHQUFrRDtvQkFFN0QsSUFBSSxDQUFDLEdBQUc7d0JBQUUsT0FBTztvQkFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNFLElBQUksQ0FBQyxPQUFzRDtvQkFFOUQsSUFBSSxDQUFDLE9BQU87d0JBQUUsT0FBTztvQkFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQiwrQkFBK0I7b0JBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO29CQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQztvQkFFakQsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQywwQ0FBMEM7b0JBR3hFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSTs0QkFDNUIsT0FBTyxFQUFDLGVBQWUsRUFBRSx3QkFBd0I7NEJBQ2pELEdBQUcs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QkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO3lCQUNsSSxHQUFHLEVBQUU7eUJBQ0wsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixPQUFPO29CQUNYLENBQUMsQ0FBQyxDQUFDLG1DQUFtQzt5QkFDckMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUNqQztvQkFHTCx1QkFBdUI7Z0JBQzNCLENBQUM7YUFFSixDQUFBO1lBMU9ZLGFBQWE7Z0JBRHpCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsYUFBYSxDQTBPekI7WUExT1ksdUJBQWEsZ0JBME96QixDQUFBO1FBQ0wsQ0FBQyxFQS9Pb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK083QjtJQUFELENBQUMsRUEvT2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQStPbkI7QUFBRCxDQUFDLEVBL09TLE1BQU0sS0FBTixNQUFNLFFBK09mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHSW5wdXRJRFJJU1JFIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICB1aWQgPSBcIkdJbnB1dElEUklTUkUjXCI7XHJcbiAgICAgICAgLy8gdnN0dXBuaSBob2Rub3R5XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bztcclxuICAgICAgICBwcml2YXRlIHNwZWNpYWxTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIHphdHJpZGVubyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChyb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gcG9jYXRlY25pIG5hc3RhdmVuaSBhdHJpYnV0dVxyXG4gICAgICAgICAgICB0aGlzLnJvdyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoYXQuc3BlY2lhbFNlbGVjdCA9IHRoaXMucm93LmlkX2hkcl9yaXMgPT09IFwiMFwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMDI1MDMzM1wiOyAvL1JDIDMwMjUwMzMzIDogWmFkZWp0ZSBpbmRldGlmaWthY2kgUklTUkVcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VWxveml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOlwianJlczozMDI1MDM0MVwiLCAvL1JDIDMwMjUwMzQxIDogWmF0xZnDrWRpdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5TYXZlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7IGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnRyeUNsb3NlKCk7IH0gfSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHByaWthem92YSBsaXN0YVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFVsb3ppdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFphdnJpdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMzM0XCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgLy9SQyAzMDI1MDMzNCA6IElkZW50aWZpa2FjZSBSSVNSRVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCB2YWx1ZSkgeyB0aGF0LmNoYW5nZVZhbHVlKFwiaWRfaGRyX3Jpc1wiLCB2YWx1ZSkgfSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pZF9oZHJfcmlzPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOjEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDEsIG1heDogMTAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzM1XCIsIGN1c3RvbUNsYXNzOlwianMtcmFkZWtfaGRyXCIgfSkuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsICAvL1JDIDMwMjUwMzM1IDogxZjDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtcmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYXhMZW5ndGg6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMSwgbWF4OiA4IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuc3BlY2lhbFNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5EYXRhLlZpZXc7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVidWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHh0OiBcImpyZXM6MzAyNTAzNDBcIiwgaWRfaGRyX3JpczogXCItXCIsIHJhZGVrX2hkcjogMCB9IC8vUkMgMzAyNTAzNDAgOiBOZXphxZlhZGl0IChzZXJ2aXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICx7IHR4dDogXCJqcmVzOjMwMjUwMzM4XCIsIGlkX2hkcl9yaXM6IFwiMFwiLCByYWRla19oZHI6IG51bGwgfSAvL1JDIDMwMjUwMzM4IDogTWltbyBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHsgdHh0OiBcImpyZXM6MzAyNTAzMzlcIiwgaWRfaGRyX3JpczogXCIwXCIsIHJhZGVrX2hkcjogMCB9IC8vUkMgMzAyNTAzMzkgOiBQxZnDrWplbSBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLCB7IGtleTogXCJpZF9oZHJfcmlzLHJhZGVrX2hkclwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHR4dDogXCJqcmVzOjMwMjUwMzM4XCIsIGlkX2hkcl9yaXM6IFwiMFwiLCByYWRla19oZHI6IG51bGwgfSAvL1JDIDMwMjUwMzM4IDogTWltbyBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHsgdHh0OiBcImpyZXM6MzAyNTAzMzlcIiwgaWRfaGRyX3JpczogXCIwXCIsIHJhZGVrX2hkcjowIH0gLy9SQyAzMDI1MDMzOSA6IFDFmcOtamVtIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcImlkX2hkcl9yaXMscmFkZWtfaGRyXCIgfSk7XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzQyXCIsIGN1c3RvbUNsYXNzOlwianMtc3BlY1wifSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMDI1MDM0MiA6IFp2bMOhxaF0bsOtIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkcjJcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiBmYWxzZSwgaXRlbVdpZHRoOiBcIlwiLCBjdXN0b21DbGFzczogXCJqcy1zcGVjXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBoZWxwZXJDb2x1bW5zOiBbXCJ0eHRcIl1cclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dHh0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5pZF9oZHJfcmlzPXZhbHVlLmlkX2hkcl9yaXM7bW9kZWwucmFkZWtfaGRyPXZhbHVlLnJhZGVrX2hkclwiLCBpbml0aWFsVmFsdWU6IHsgdHh0OiBcImpyZXM6MzAyNTAzMzhcIiwgaWRfaGRyX3JpczogXCIwXCIsIHJhZGVrX2hkcjogbnVsbCB9IC8vUkMgMzAyNTAzMzggOiBNaW1vIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiSGVhZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAvLy5ndGFiKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG9wZW5lZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyBwcm8gdmFsaWRhdG9yeSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSB0aGlzLmVsZW1lbnQ7Ly90YWJIZWFkO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZFRvKHRhYkhlYWQpO1xyXG4gICAgICAgICAgICAvLyB2eXBsbmVuaSBob2Rub3RcclxuICAgICAgICAgICAgdGhhdC5maWxsVmFsdWVzKHRhYkhlYWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2tyeXRpIHNlbGVjdG9ydVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaGlkZUJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmQoc2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHNlbGVjdG9ydVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd0J5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmQoc2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VWYWx1ZShpdGVtTmFtZTogc3RyaW5nLHZhbHVlOmFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGF0LnNwZWNpYWxTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1OYW1lID09PSBcImlkX2hkcl9yaXNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc3BlY2lhbFNlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93QnlTZWxlY3RvcihcIi5qcy1zcGVjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaGlkZUJ5U2VsZWN0b3IoXCIuanMtcmFkZWtfaGRyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5oaWRlQnlTZWxlY3RvcihcIi5qcy1zcGVjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0J5U2VsZWN0b3IoXCIuanMtcmFkZWtfaGRyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9pZiAodGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnByaXpfb3BhayAhPT0gMSkge1xyXG4gICAgICAgICAgICAvLyB6amlzdGVuaSB6bWVuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRzID0gdGhhdC5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZHMuZ2ZpZWxkKFwiaGFzQ2hhbmdlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVkaXRpbmcgJiYgIXRoYXQuemF0cmlkZW5vKVxyXG4gICAgICAgICAgICAgICAgLy8gdiBlZGl0YcSNbsOtbSByZcW+aW11ICh0ai4gaSBwbyBwb2TDoW7DrSkgZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw61cclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDA3MFwiIC8vUkMgMzAyNTAwNzAgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAsIFwianJlczozMDI1MDA2OVwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDMwMjUwMDY5IDogT3ByYXZkdSBjaGNldGUgemF2xZnDrXQgZGV0YWlsIGJleiB1bG/FvmVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGRlZi5yZWplY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoeyB6YXRyaWRlbm86IHRoYXQuemF0cmlkZW5vfSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXBsbmVuaSBkYXRcclxuICAgICAgICAgKiBAcGFyYW0gZm9ybVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlsbFZhbHVlcyhmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGF0LnNwZWNpYWxTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImlkX2hkcl9yaXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5yb3cuaWRfaGRyX3Jpcyk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJyYWRla19oZHJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5yb3cucmFkZWtfaGRyKTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBwb2xpY2VrIGRsZSBob2Rub3RcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlVmFsdWUoXCJpZF9oZHJfcmlzXCIsIHsgdmFsdWU6dGhpcy5yb3cuaWRfaGRyX3JpcyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG96ZW5pIGhvZG5vdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBTYXZlKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdmFyIGR0b1NhdmVEYXRhID0geyBpZF9oZHJfcmlzOiBcIlwiLCByYWRla19oZHI6MCB9O1xyXG4gICAgICAgICAgICBpZiAodGhhdC5zcGVjaWFsU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0b1NhdmVEYXRhKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0b1NhdmVEYXRhLmlkX2hkcl9yaXMgPSB0aGF0LmZpbmRGaWVsZHMoXCJpZF9oZHJfcmlzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgZHRvU2F2ZURhdGEucmFkZWtfaGRyID0gdGhhdC5maW5kRmllbGRzKFwicmFkZWtfaGRyXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhhdC5yb3cuaWNvID0gXCJpY29cIjtcclxuICAgICAgICAgICAgLy90aGF0LnJvdy5yb2sgPSAyMDEyO1xyXG4gICAgICAgICAgICAvL3RoYXQucm93LmFjPSBcInRlc3RfYWNcIjtcclxuICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzMzFcIik7IC8vUkMgMzAyNTAzMzEgOiBQcm9iw61ow6EgemF0xZnDrcSPb3ZhbsOtLi4uXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5VY3JSaXNyZVNrdXRlY25vc3QuemF0cmlkaXQoeyB6YXBpczogdGhhdC5yb3csIGlkX2hkcl9yaXM6IGR0b1NhdmVEYXRhLmlkX2hkcl9yaXMhLCByYWRla19oZHI6IGR0b1NhdmVEYXRhLnJhZGVrX2hkciB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzMyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuemF0cmlkZW5vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDMzMiA6IFphdMWZw61kxJtuw60gcHJvdmVkZW5vXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=