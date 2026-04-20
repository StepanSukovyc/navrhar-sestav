"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Mdf;
    (function (Mdf) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var MdfGridTS = /** @class */ (function (_super) {
                __extends(MdfGridTS, _super);
                function MdfGridTS() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MdfGridTS.prototype.onContentReady = function () {
                    //*************************************************************
                    // Seznam akcí
                    //*************************************************************
                    var _this = this;
                    this.actions.addRange({
                        actGenerate: {
                            name: "actGenerate",
                            caption: "Generovat pohled",
                            icon: "gi-generate",
                            run: function () {
                                _this.call("GenerujPohled", { sql: "SELECT hodnota_c1, hodnota_s1, hodnota_s3 FROM vas.ekoddpr WHERE id_dpo = 'MDFUCR03' AND hodnota_s1 IN ('10194', '10124', '10144', '10103', '10002', '10001', '10114', '10134') AND hodnota_i1 = '2016' AND hodnota_s2 = '0' AND hodnota_s3 IN ('11', '12', '13') AND hodnota_s4 = '0' AND hodnota_s5 = '0' AND hodnota_s6 = '0' ORDER BY  hodnota_s1, hodnota_s3" }).done(function (result) {
                                    var columns = new Gordic.Data.GridFormat();
                                    columns.addTextColumn({ name: "Column1" });
                                    columns.addTextColumn({ name: "Column2" });
                                    columns.addTextColumn({ name: "Column3" });
                                    columns.addTextColumn({ name: "Column4" });
                                    _this.$grid.ggrid("option", { columns: columns });
                                    var cells = result.cells;
                                    var colCount = cells[0].length;
                                    var dtos = [];
                                    for (var r = 0; r < cells.length; r++) {
                                        var dto = {};
                                        for (var c = 0; c < colCount; c++) {
                                            dto["Column" + (c + 1)] = cells[r][c];
                                        }
                                        dtos.push(dto);
                                    }
                                    _this.$grid.ggrid("setData", dtos);
                                });
                            }
                        }
                    });
                    //*************************************************************
                    // MenuBar
                    //*************************************************************
                    this.menuBar([
                        //DetailPoložky
                        {
                            action: this.actions.actGenerate,
                            favorite: true
                        }
                    ]);
                    /*var filterDto: Gordic.Eko.Interface.GPolozkaGlobalnihoCiselnikuFilterDto = {};
                    //filterDto.gdc = this.gdc;
        
                    this.islViewPolozky = new Gordic.Isl.View(
                        this.isl.PolozkaGlobalnihoCiselniku.list({ filters: filterDto }),
                        {
                            key: "id",
                            processors: {
                                zkratkaNazev: new Gordic.Data.ComputedFieldsProcessor((diff, rows) => rows.map((row) => {
                                    if (row.data.rokmes_od)
                                        row.zkratkaNazev = row.data.rokmes_od.substr(0, 4) + "/" + row.data.rokmes_od.substr(4, 2) + "-" + row.data.rokmes_do!.substr(0, 4) + "/" + row.data.rokmes_do!.substr(4, 2) + "    " + row.data.zkratka + " " + row.data.nazev;
                                    else
                                        if (row.data.kod_gdc === -1)
                                            row.zkratkaNazev = "Nezařazené"
                                        else
                                            row.zkratkaNazev = row.data.zkratka + " - " + row.data.nazev;  //uložím do metadat
                                }
                                )),
                                tree: new Gordic.Data.Tree<Gordic.Eko.Interface.GEkodgdtDto, any>(Gordic.Data.Tree.parentIdOrganizer("id_nad"), { filterKeepStructure: true, defaultState: "closed" })
                            }
                        }
                    );*/
                    this.$grid = $("<div class='js-mujGrid'>")
                        .css('margin-left', '10px')
                        .appendTo(this.element)
                        .ggrid({
                        searchColumns: ["@zkratkaNazev"],
                        data: [],
                        columns: new Gordic.Data.GridFormat()
                            .addStructureColumn({
                            name: "zkratkaNazev",
                            caption: "",
                            customClass: "ui-disabled",
                            field: "@zkratkaNazev", //tím se řekne že je to v metadatech
                            /*iconTemplate: (data: Gordic.Eko.Interface.GEkodgdtDto, meta?: MetaRow<Gordic.Eko.Interface.GEkodgdtDto>) => {
                                if (data.rokmes_od)
                                    return {
                                        icon: "gi-calendar g-state-text g-state-success", tooltip: "Roční hodnota", text: meta!.zkratkaNazev
                                    };
                                else {
                                    if (data.kod_gdc === -1)
                                        return { icon: "gi-folder_bold g-state-text g-state-error", tooltip: "Položka globálního číselníku", text: meta!.zkratkaNazev };
                                    else
                                        return { icon: "gi-folder_bold g-state-text g-state-warning", tooltip: "Položka globálního číselníku", text: meta!.zkratkaNazev };
                                }
                            }*/
                        }),
                        selection: function (ev, o) {
                            var row = o.getSelection(true)[0];
                            if (row) {
                                //this.islViewPolozky.getDataRows()
                                //this.actions.actDelete?.enabled(!row.tree0.children);
                                var currentPolozkaDto = row.data; // this.$gridPolozky.ggrid<Gordic.Eko.Interface.GEkodgdtDto>("getSelection")[0];
                            }
                        },
                        beforeExport: function (ev, ctx) {
                            debugger;
                            var d = ctx.data;
                        }
                    });
                };
                MdfGridTS = __decorate([
                    gcontent
                ], MdfGridTS);
                return MdfGridTS;
            }(Gordic.GContentBase));
            WebClient.MdfGridTS = MdfGridTS;
        })(WebClient = Mdf.WebClient || (Mdf.WebClient = {}));
    })(Mdf = Gordic.Mdf || (Gordic.Mdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=MdfGridTS.js.map