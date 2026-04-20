"use strict";
/**
 * Výběr případů
 *
 * @author Vojtěch Čech
 * @date 03.04.2024
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var GVyberPripadu_1;
            let GVyberPripadu = GVyberPripadu_1 = class GVyberPripadu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.formModel = {};
                    this.probihaLoad = false;
                }
                // Helper method to find popis by id
                getPopisById(id) {
                    const option = GVyberPripadu_1.filtrOptions.find(item => item.id === id);
                    return option ? option.popis : "";
                }
                onContentReady() {
                    const that = this;
                    that.title = "Výběr případů";
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Vybrat",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.createHeader();
                    that.initialData();
                    that.createGrid();
                    that.ziskejData();
                }
                /** Vytvoří formulář */
                createHeader() {
                    var that = this;
                    let header = new Gordic.Forms.Form({ name: "headerForm" })
                        .addSection()
                        .addRow("Rozsah vyhledávání")
                        .addField("gselectbox", {
                        name: "filtr",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        itemTemplate: "{popis}",
                        model: "model.filtr=value.id",
                        data: GVyberPripadu_1.filtrOptions,
                        initialValue: { id: 0, popis: "Aktuální typ pohledávky" },
                        dropdown: true,
                        change: () => {
                            that.ziskejData();
                        }
                    })
                        .addRow("Subjekt")
                        .addField("gselectbox", Gordic.Prefabs.Select.vazbaSubPrip(), {
                        name: "subjekt", // Typ vazby mezi subjektem a případem
                        model: "model.subjekt = value.typ_svp",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: { typ_svp: 0 },
                        change: () => {
                            that.ziskejData();
                        }
                    })
                        .addRow("Druh vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdva(), {
                        name: "ixs_dva",
                        model: "model.ixs_dva = value.ixs_dva",
                        emptyValue: { nazev: "Všechny", ixs_dva: null },
                        renderEmpty: true,
                        serverFilters: {
                            aktivita: 100
                        },
                        change: (ev, obj) => {
                            if (obj.value?.nazev == "Všechny")
                                $(ev.target).gfield("setValue", { nazev: "Všechny" });
                            that.ziskejData();
                        }
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", header);
                }
                /** Počáteční data formuláře */
                initialData() {
                    var that = this;
                    if (Object.keys(that.formModel).length > 0) {
                        var form = that.findForms("headerForm");
                        form.findFields().gfield("model", "apply", that.formModel);
                        form.findFields("filtr").gfield("setValue", { id: that.formModel.filtr, popis: that.getPopisById(that.formModel.filtr) });
                    }
                }
                /** Vytvoří tabulku  */
                createGrid() {
                    var that = this;
                    that.grid = $.newDiv().appendTo(that.element).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Identifikátor", formula: `EQUALS(@ixp, '${that.ixp}')`, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.blue }
                            ]
                        },
                        multi: true,
                        columnMode: "full",
                        name: "grid",
                        columns: WebClient.Common.GridFormats.VyberPripadu()
                    });
                }
                /** Načte data do tabulky, pomocí filtrů v hlavičce */
                ziskejData() {
                    var that = this;
                    var filter = {};
                    that.findForms("headerForm").findFields().gfield("model", "collect", filter);
                    filter.ixp = that.ixp;
                    filter.ixs_esu = that.ixsEsu;
                    filter.subjekt = filter.subjekt ?? 0;
                    // Zamezení duplicitního načítání
                    if (that.probihaLoad)
                        return;
                    else
                        that.probihaLoad = true;
                    that.beginOperation({ id: "loadVyberPripadu", text: "Načítání dat..." });
                    that.isl.VymahaniDDP.listVyberPripadu(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto);
                        // Pokud máme nějaké vybrané případy z minulejšího výběru, označíme je v tabulce
                        if (that.pripadyVymahaniNapojene.length > 0) {
                            var newView = new Gordic.Data.View();
                            that.pripadyVymahaniNapojene;
                            var rows = view.getDataRows(true);
                            rows.forEach((row) => {
                                // Check if each row should be marked as selected based on previously selected cases
                                if (that.pripadyVymahaniNapojene && Array.isArray(that.pripadyVymahaniNapojene) && that.pripadyVymahaniNapojene.length > 0) {
                                    row.checked = that.pripadyVymahaniNapojene.some((selectedCase) => selectedCase.ixp === row.data.ixp);
                                }
                            });
                            newView = new Gordic.Data.View(rows);
                            that.grid.ggrid("setData", newView);
                        }
                        else
                            that.grid.ggrid("setData", view);
                    })
                        .always(() => {
                        that.probihaLoad = false;
                        that.endOperation({ id: "loadVyberPripadu" });
                    });
                }
                /** Úspěšné uzavření okna s vybranými daty */
                ok() {
                    var that = this;
                    var form = that.findForms("headerForm");
                    form.findFields().gfield("model", "collect", that.formModel);
                    var data = that.grid.ggrid("getSelection");
                    that.close({ data: data, formModel: that.formModel });
                }
            };
            // Static array for filter options
            GVyberPripadu.filtrOptions = [
                { id: 0, popis: "Aktuální typ pohledávky" },
                { id: 1, popis: "Všechny dostupné typy pohledávek" },
                { id: 2, popis: "Exekuční typy pohledávek" },
                { id: 3, popis: "Insolvenční typy pohledávek" }
            ];
            GVyberPripadu = GVyberPripadu_1 = __decorate([
                Decorators.gcontent
            ], GVyberPripadu);
            WebClient.GVyberPripadu = GVyberPripadu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyUHJpcGFkdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeWJlclByaXBhZHUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7Ozs7O0FBRUgsSUFBVSxNQUFNLENBa01mO0FBbE1ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtNbkI7SUFsTWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtNN0I7UUFsTW9CLFdBQUEsU0FBUzs7WUFFMUIsSUFBYSxhQUFhLHFCQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFLVyxjQUFTLEdBQVEsRUFBRSxDQUFDO29CQUlwQixnQkFBVyxHQUFZLEtBQUssQ0FBQztnQkFzTHhDLENBQUM7Z0JBNUtHLG9DQUFvQztnQkFDNUIsWUFBWSxDQUFDLEVBQVU7b0JBQzNCLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDdkUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7b0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRTtnQ0FDRCxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ2QsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUks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QzVDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUU7YUFDbEQsQUFMMEIsQ0FLekI7WUFqQk8sYUFBYTtnQkFEekIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxhQUFhLENBK0x6QjtZQS9MWSx1QkFBYSxnQkErTHpCLENBQUE7UUFDTCxDQUFDLEVBbE1vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFrTTdCO0lBQUQsQ0FBQyxFQWxNZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa01uQjtBQUFELENBQUMsRUFsTVMsTUFBTSxLQUFOLE1BQU0sUUFrTWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVsO9YsSbciBwxZnDrXBhZMWvXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAqIEBkYXRlIDAzLjA0LjIwMjRcclxuICovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJQcmlwYWR1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHVibGljIGl4cDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpeHNFc3U6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgcHJpcGFkeVZ5bWFoYW5pTmFwb2plbmU6IGFueTtcclxuICAgICAgICBwdWJsaWMgZm9ybU1vZGVsOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgcHVibGljIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHB1YmxpYyBwcm9iaWhhTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBTdGF0aWMgYXJyYXkgZm9yIGZpbHRlciBvcHRpb25zXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZmlsdHJPcHRpb25zID0gW1xyXG4gICAgICAgICAgICB7IGlkOiAwLCBwb3BpczogXCJBa3R1w6FsbsOtIHR5cCBwb2hsZWTDoXZreVwiIH0sXHJcbiAgICAgICAgICAgIHsgaWQ6IDEsIHBvcGlzOiBcIlbFoWVjaG55IGRvc3R1cG7DqSB0eXB5IHBvaGxlZMOhdmVrXCIgfSxcclxuICAgICAgICAgICAgeyBpZDogMiwgcG9waXM6IFwiRXhla3XEjW7DrSB0eXB5IHBvaGxlZMOhdmVrXCIgfSxcclxuICAgICAgICAgICAgeyBpZDogMywgcG9waXM6IFwiSW5zb2x2ZW7EjW7DrSB0eXB5IHBvaGxlZMOhdmVrXCIgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIEhlbHBlciBtZXRob2QgdG8gZmluZCBwb3BpcyBieSBpZFxyXG4gICAgICAgIHByaXZhdGUgZ2V0UG9waXNCeUlkKGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBHVnliZXJQcmlwYWR1LmZpbHRyT3B0aW9ucy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uID8gb3B0aW9uLnBvcGlzIDogXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiVsO9YsSbciBwxZnDrXBhZMWvXCI7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdGlhbERhdGEoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBmb3JtdWzDocWZICovXHJcbiAgICAgICAgY3JlYXRlSGVhZGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJoZWFkZXJGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSb3pzYWggdnlobGVkw6F2w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdHJcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZmlsdHI9dmFsdWUuaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogR1Z5YmVyUHJpcGFkdS5maWx0ck9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAwLCBwb3BpczogXCJBa3R1w6FsbsOtIHR5cCBwb2hsZWTDoXZreVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3ViamVrdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudmF6YmFTdWJQcmlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1Ympla3RcIiwgLy8gVHlwIHZhemJ5IG1lemkgc3ViamVrdGVtIGEgcMWZw61wYWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN1Ympla3QgPSB2YWx1ZS50eXBfc3ZwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3N2cDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRydWggdmF6YnlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbHNkdmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19kdmEgPSB2YWx1ZS5peHNfZHZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogeyBuYXpldjogXCJWxaFlY2hueVwiLCBpeHNfZHZhOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyRW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWU/Lm5hemV2ID09IFwiVsWhZWNobnlcIikgJChldi50YXJnZXQpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgbmF6ZXY6IFwiVsWhZWNobnlcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXIpOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUG/EjcOhdGXEjW7DrSBkYXRhIGZvcm11bMOhxZllICovXHJcbiAgICAgICAgaW5pdGlhbERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGF0LmZvcm1Nb2RlbCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImhlYWRlckZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuZm9ybU1vZGVsKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImZpbHRyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgaWQ6IHRoYXQuZm9ybU1vZGVsLmZpbHRyLCBwb3BpczogdGhhdC5nZXRQb3Bpc0J5SWQodGhhdC5mb3JtTW9kZWwuZmlsdHIpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIHRhYnVsa3UgICovXHJcbiAgICAgICAgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJWw71jaG96w60gcG9obGVkXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJJZGVudGlmaWvDoXRvclwiLCBmb3JtdWxhOiBgRVFVQUxTKEBpeHAsICcke3RoYXQuaXhwfScpYCwgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmJsdWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuVnliZXJQcmlwYWR1KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hxI10ZSBkYXRhIGRvIHRhYnVsa3ksIHBvbW9jw60gZmlsdHLFryB2IGhsYXZpxI1jZSAqL1xyXG4gICAgICAgIHppc2tlakRhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiaGVhZGVyRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5peHA7XHJcbiAgICAgICAgICAgIGZpbHRlci5peHNfZXN1ID0gdGhhdC5peHNFc3U7XHJcbiAgICAgICAgICAgIGZpbHRlci5zdWJqZWt0ID0gZmlsdGVyLnN1Ympla3QgPz8gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIFphbWV6ZW7DrSBkdXBsaWNpdG7DrWhvIG5hxI3DrXTDoW7DrVxyXG4gICAgICAgICAgICBpZiAodGhhdC5wcm9iaWhhTG9hZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIHRoYXQucHJvYmloYUxvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRWeWJlclByaXBhZHVcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0Li4uXCIgfSlcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubGlzdFZ5YmVyUHJpcGFkdShcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgbcOhbWUgbsSbamFrw6kgdnlicmFuw6kgcMWZw61wYWR5IHogbWludWxlasWhw61obyB2w71ixJtydSwgb3puYcSNw61tZSBqZSB2IHRhYnVsY2VcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnByaXBhZHlWeW1haGFuaU5hcG9qZW5lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3c6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBlYWNoIHJvdyBzaG91bGQgYmUgbWFya2VkIGFzIHNlbGVjdGVkIGJhc2VkIG9uIHByZXZpb3VzbHkgc2VsZWN0ZWQgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJpcGFkeVZ5bWFoYW5pTmFwb2plbmUgJiYgQXJyYXkuaXNBcnJheSh0aGF0LnByaXBhZHlWeW1haGFuaU5hcG9qZW5lKSAmJiB0aGF0LnByaXBhZHlWeW1haGFuaU5hcG9qZW5lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZS5zb21lKChzZWxlY3RlZENhc2U6IGFueSkgPT4gc2VsZWN0ZWRDYXNlLml4cCA9PT0gcm93LmRhdGEuaXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyb3dzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ld1ZpZXcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9iaWhhTG9hZCA9IGZhbHNlOyBcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFZ5YmVyUHJpcGFkdVwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgXHJcbiAgICAgICAgLyoqIMOac3DEm8WhbsOpIHV6YXbFmWVuw60gb2tuYSBzIHZ5YnJhbsO9bWkgZGF0eSAqL1xyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiaGVhZGVyRm9ybVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQuZm9ybU1vZGVsKTtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeWJlclByaXBhZHVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jbG9zZSh7IGRhdGE6IGRhdGEsIGZvcm1Nb2RlbDogdGhhdC5mb3JtTW9kZWwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19