"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSlozkaVymahani.ts                     </Name>
//    <Description> Složka vymáhání                                             </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-21                                                  </Created>
//  </FileHeader>
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
            /**
             * Složka vymáhání
             *
             * @author Vojtěch Čech
             * @date 21.02.2024
            */
            let GSlozkaVymahani = class GSlozkaVymahani extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Složka vymáhání";
                    that.taskId = "actGSlozkaVymahani";
                    that.actions.addRange([
                        new GAction({
                            name: "actOK",
                            caption: "OK",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actOK!", "actClose"]));
                    that.createHeader();
                    that.createActions();
                    that.createGrid();
                    that.editaceSlozky();
                    that.loadData();
                    that.zmenaPripaduDDP(that.model.ixp_ddp);
                }
                /** Vytvoří formulář */
                createHeader() {
                    var that = this;
                    var nulovaCastkaValidator = new Gordic.Validators.Base();
                    nulovaCastkaValidator.getMessage = () => {
                        return "Nelze mít zadanou nulovou částku!";
                    };
                    nulovaCastkaValidator.validate = (value) => {
                        if (value == 0)
                            return false;
                        return true;
                    };
                    let header = new Gordic.Forms.Form({ name: "formHeader", layoutDescriptor: "L3M2S1 L-3-9-0, M-3-10-0, S-12-12-0" })
                        .addSection()
                        .addRow("Případ")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_nvy",
                        disabled: true,
                        initialValue: that.model.ixp_nvy
                    })
                        .addRow("Případ DDP")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_ddp",
                        initialValue: that.model.ixp_ddp,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ min: 12, max: 12 })],
                        change: (_ev, obj) => {
                            that.zmenaPripaduDDP(obj.value ?? "");
                        }
                    })
                        .addRow("Název poplatníka")
                        .addField("gselectbox", {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast",
                        disabled: true
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                        Logovani: {
                            Ixp: that.model.ixp_nvy ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: that.model.ixp_nvy,
                            DuvodHledaniTxt: "Složka vymáhání"
                        },
                    }))
                        .addSection()
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        disabled: true
                    })
                        .addRow("Datum")
                        .addField("gdatebox", {
                        name: "dat_spl",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo",
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt}",
                        dropdown: true,
                        serverFilters: {
                            ktg_upo: { start: 1, end: 200 }
                        },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addSection()
                        .addRow("Vymáhaná částka")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_vym",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), nulovaCastkaValidator]
                    })
                        .addRow("Příznak úhrady")
                        .addField("gnumberbox", {
                        name: "pri_uhr",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addSection({ layoutDescriptor: "L1M1S1 L-1-11-0 M-1-11-0 S-12-12-0" })
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka"
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", header);
                }
                /** Vytvoření akcí */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actPouzit: {
                            name: "actPouzit",
                            caption: "Použít",
                            run: () => {
                                var selection = that.grid.ggrid("activeRow");
                                var rowModel = {};
                                rowModel.ixp_ddp = selection.ixp_ddp;
                                rowModel.dat_spl = selection.dat_spl;
                                rowModel.ktg_upo = selection.ktg_upo;
                                rowModel.c_vym = selection.c;
                                rowModel.pri_uhr = selection.pri_uhr;
                                that.findForms("formHeader").findFields().gfield("model", "apply", rowModel, { initialValues: true });
                                that.zmenaPripaduDDP(rowModel.ixp_ddp);
                            }
                        }
                    });
                }
                /** Vytvoří tabulku předpisů */
                createGrid() {
                    var that = this;
                    that.grid = $.newDiv().appendTo(that.element).gautofit({ resizersOnTab: false })
                        .gtab({
                        title: "Předpisy",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actPouzit"],
                                favorite: true
                            }
                        ]
                    })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                        },
                        multi: false,
                        columnMode: "full",
                        name: "grid",
                        defaultAction: that.actions["actPouzit"],
                        columns: WebClient.Common.GridFormats.PredpisySlozkyVymahani()
                    });
                }
                /** Načte data do tabulky */
                loadData() {
                    var that = this;
                    var ixpFilter = {};
                    ixpFilter.ixp_nvy = that.model.ixp_nvy;
                    ixpFilter.ixp = that.model.ixp_ddp;
                    that.beginOperation({ id: "loadPredpisySlozVym", text: "Načítání dat (Předpisy složky vymáhání)" });
                    that.isl.VymahaniDDP.listPredpisySlozVym(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadPredpisySlozVym" });
                    });
                    if (!that.editace) {
                        that.beginOperation({ id: "nacteniKtgUpo", text: "Načítání kategorie účetního pohybu..." });
                        that.isl.VymahaniDDP.ziskejNejmensiPovoleneKtgUpo({ min: 1, max: 200 }).get()
                            .done((ktgUpo) => {
                            that.findFields("ktg_upo").gfield("setInitial", { ktg_upo: ktgUpo });
                        }).always(() => {
                            that.endOperation({ id: "nacteniKtgUpo" });
                        });
                    }
                }
                /** Nastavení povolení editace polí */
                editaceSlozky() {
                    var that = this;
                    if (that.editace) { // jedná se o editaci složky
                        // zneaktivnění políček formuláře
                        var form = that.findForms("formHeader");
                        form.findFields("ixp_ddp").gfield("disable");
                        form.findFields("dat_spl").gfield("disable");
                        form.findFields("ktg_upo").gfield("disable");
                        form.findFields("pri_uhr").gfield("disable");
                        form.findFields().gfield("model", "apply", that.model, { initialValues: true });
                        that.actions.actPouzit?.enabled(false);
                    }
                }
                /** Získání dat pro případ DDP */
                zmenaPripaduDDP(ixpDdp) {
                    var that = this;
                    that.findFields("ixp_ddp").gfield("validate");
                    if (ixpDdp.length == 12) {
                        that.beginOperation({ id: "nacteniDatDDP", text: "Načítání dat..." });
                        that.isl.VymahaniDDP.ziskejVSaIxsEsu({ ixp: ixpDdp })
                            .get()
                            .done((dto) => {
                            that.findFields("vs").gfield("setValue", dto.vs);
                            that.findFields("ixs_esu").gfield("setInitial", { ixs_esu: dto.ixs_esu });
                        }).always(() => {
                            that.endOperation({ id: "nacteniDatDDP" });
                        });
                    }
                }
                ok() {
                    var that = this;
                    let returnModel = {};
                    var validni = that.findForms("formHeader").gform("isValid");
                    if (validni) {
                        that.findForms("formHeader").findFields().gfield("model", "collect", returnModel);
                        that.close({ data: returnModel });
                    }
                }
            };
            GSlozkaVymahani = __decorate([
                Decorators.gcontent
            ], GSlozkaVymahani);
            WebClient.GSlozkaVymahani = GSlozkaVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nsb3prYVZ5bWFoYW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nsb3prYVZ5bWFoYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBcVJmO0FBclJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFSbkI7SUFyUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFSN0I7UUFyUm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7Y0FLRTtZQUVGLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQVc3QyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNsQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckMsQ0FBQztxQkFDTCxDQUFDLENBQUE7b0JBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUVoQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLENBQUM7Z0JBRUQsdUJBQXVCO2dCQUN2QixZQUFZO29CQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRXpELHFCQUFxQixDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7d0JBQ3BDLE9BQU8sbUNBQW1DLENBQUM7b0JBQy9DLENBQUMsQ0FBQTtvQkFFRCxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDdkMsSUFBSSxLQUFLLElBQUksQ0FBQzs0QkFBRSxPQUFPLEtBQUssQ0FBQzt3QkFDN0IsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQTtvQkFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxxQ0FBcUMsRUFBRSxDQUFDO3lCQUM5RyxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLFFBQVEsQ0FBQzt5QkFDaEIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3JELElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87cUJBQ25DLENBQUM7eUJBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQzt5QkFDcEIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3JELElBQUksRUFBRSxTQUFTO3dCQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87d0JBQ2hDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQztxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDMUIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLCtFQUErRTt3QkFDdEYsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLEVBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUN4QixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSx5Q0FBeUM7d0JBQ3ZHLFFBQVEsRUFDUjs0QkFDSSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLGdEQUFnRDs0QkFDL0UsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCOzRCQUMzRixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzRCQUM3QixlQUFlLEVBQUUsaUJBQWlCO3lCQUNyQztxQkFDSixDQUEyQixDQUFDO3lCQUNoQyxVQUFVLEVBQUU7eUJBQ1osTUFBTSxDQUFDLElBQUksQ0FBQzt5QkFDWixRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsSUFBSTt3QkFDVixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO3lCQUNmLFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQ2xCLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNqRCxDQUFDO3lCQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDMUIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzlDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSw2QkFBNkI7d0JBQ3BDLFlBQVksRUFBRSwyQkFBMkI7d0JBQ3pDLFFBQVEsRUFBRSxJQUFJO3dCQUNkLGFBQWEsRUFBRTs0QkFDWCxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7eUJBQ2xDO3dCQUNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNqRCxDQUFDO3lCQUNELFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsaUJBQWlCLENBQUM7eUJBQ3pCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUMvQyxJQUFJLEVBQUUsT0FBTzt3QkFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7d0JBQ3pDLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQztxQkFDeEUsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTt3QkFDekMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUNqRCxDQUFDO3lCQUNELFVBQVUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLG9DQUFvQyxFQUFFLENBQUM7eUJBQ3RFLE1BQU0sQ0FBQyxVQUFVLENBQUM7eUJBQ2xCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxVQUFVO3FCQUNuQixDQUFDLENBQUE7b0JBRU4sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRCxxQkFBcUI7Z0JBQ3JCLGFBQWE7b0JBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDakI7d0JBQ0ksU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBeUQsV0FBVyxDQUFDLENBQUM7Z0NBRXJHLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztnQ0FDdkIsUUFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO2dDQUNyQyxRQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0NBQ3JDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQ0FDckMsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dDQUM3QixRQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0NBRXJDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0NBQ3RHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMzQyxDQUFDO3lCQUNKO3FCQUNKLENBQ0osQ0FBQTtnQkFDTCxDQUFDO2dCQUVELCtCQUErQjtnQkFDL0IsVUFBVTtvQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO3lCQUMzRSxJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLE9BQU8sRUFBRTs0QkFDTDtnQ0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0NBQ2pDLFFBQVEsRUFBRSxJQUFJOzZCQUNqQjt5QkFDSjtxQkFDSixDQUFDO3lCQUVELEtBQUssQ0FBQzt3QkFDSCxjQUFjLEVBQUU7NEJBQ1osVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJO3lCQUN4RDt3QkFDRCxLQUFLLEVBQUUsS0FBSzt3QkFDWixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsSUFBSSxFQUFFLE1BQU07d0JBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3dCQUN4QyxPQUFPLEVBQUUsVUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFO3FCQUN2RCxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQzVCLFFBQVE7b0JBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7b0JBQ3hCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBRW5DLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLHlDQUF5QyxFQUFFLENBQUMsQ0FBQztvQkFDcEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQ3BDLEdBQUcsRUFBRTt3QkFDRCxPQUFPOzRCQUNILE9BQU8sRUFBRSxTQUFTO3lCQUNyQixDQUFBO29CQUNMLENBQUMsQ0FDSixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7d0JBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSx1Q0FBdUMsRUFBRSxDQUFDLENBQUM7d0JBQzVGLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLDRCQUE0QixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7NkJBQ3hFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOzRCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFOzRCQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQztnQkFDTCxDQUFDO2dCQUVELHNDQUFzQztnQkFDdEMsYUFBYTtvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsNEJBQTRCO3dCQUM1QyxpQ0FBaUM7d0JBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUU3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUVoRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxpQ0FBaUM7Z0JBQ2pDLGVBQWUsQ0FBQyxNQUFjO29CQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7d0JBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs2QkFDaEQsR0FBRyxFQUFFOzZCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDOUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTs0QkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7d0JBQy9DLENBQUMsQ0FBQyxDQUFBO29CQUNWLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxFQUFFO29CQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxXQUFXLEdBQTJELEVBQUUsQ0FBQztvQkFDN0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVELElBQUksT0FBTyxFQUFFLENBQUM7d0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBNVFZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQTRRM0I7WUE1UVkseUJBQWUsa0JBNFEzQixDQUFBO1FBQ0wsQ0FBQyxFQXJSb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcVI3QjtJQUFELENBQUMsRUFyUmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFSbkI7QUFBRCxDQUFDLEVBclJTLE1BQU0sS0FBTixNQUFNLFFBcVJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTbG96a2FWeW1haGFuaS50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTbG/FvmthIHZ5bcOhaMOhbsOtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wMi0yMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU2xvxb5rYSB2eW3DoWjDoW7DrVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAgICAgKiBAZGF0ZSAyMS4wMi4yMDI0XHJcbiAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2xvemthVnltYWhhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogbW9kZWwgdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBtb2RlbDogYW55O1xyXG4gICAgICAgIC8qKiBtb2RlbCBwxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgbW9kZWxFU1U6IGFueTtcclxuICAgICAgICAvKiogUMWZw616bmFrIHpkYSBqZGUgbyBlZGl0YWNpIHrDoXpuYW11IG5lYm8gcMWZaWTDoW7DrSAqL1xyXG4gICAgICAgIGVkaXRhY2U6IGFueTtcclxuICAgICAgICAvKiogdGFidWxrYSAqL1xyXG4gICAgICAgIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiU2xvxb5rYSB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R1Nsb3prYVZ5bWFoYW5pXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T0tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T0shXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5lZGl0YWNlU2xvemt5KCk7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuem1lbmFQcmlwYWR1RERQKHRoYXQubW9kZWwuaXhwX2RkcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGZvcm11bMOhxZkgKi9cclxuICAgICAgICBjcmVhdGVIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG51bG92YUNhc3RrYVZhbGlkYXRvciA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBudWxvdmFDYXN0a2FWYWxpZGF0b3IuZ2V0TWVzc2FnZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIk5lbHplIG3DrXQgemFkYW5vdSBudWxvdm91IMSNw6FzdGt1IVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBudWxvdmFDYXN0a2FWYWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTJTMSBMLTMtOS0wLCBNLTMtMTAtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZnDrXBhZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfbnZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lm1vZGVsLml4cF9udnlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZw61wYWQgRERQXCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGRwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lm1vZGVsLml4cF9kZHAsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAxMiwgbWF4OiAxMiB9KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoX2V2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVByaXBhZHVERFAob2JqLnZhbHVlID8/IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2IHBvcGxhdG7DrWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bW9kZWwubGljPXZhbHVlLmxpYzttb2RlbC5wb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5tb2RlbC5peHBfbnZ5ID8/IFwiXCIsIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksIC8vIHZ5YnJhdCB6IGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoYXQubW9kZWwuaXhwX252eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJTbG/FvmthIHZ5bcOhaMOhbsOtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW1cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zcGxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99IC0ge2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogeyBzdGFydDogMSwgZW5kOiAyMDAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWeW3DoWhhbsOhIMSNw6FzdGthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdnltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBudWxvdmFDYXN0a2FWYWxpZGF0b3JdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmcOtem5hayDDumhyYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaV91aHJcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTEtMTEtMCBNLTEtMTEtMCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXIpOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gKi9cclxuICAgICAgICBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RQb3V6aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQb3V6aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3XFvsOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzeVNsb3preVZ5bWFoYW5pRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93TW9kZWw6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93TW9kZWwuaXhwX2RkcCA9IHNlbGVjdGlvbi5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93TW9kZWwuZGF0X3NwbCA9IHNlbGVjdGlvbi5kYXRfc3BsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93TW9kZWwua3RnX3VwbyA9IHNlbGVjdGlvbi5rdGdfdXBvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93TW9kZWwuY192eW0gPSBzZWxlY3Rpb24uYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd01vZGVsLnByaV91aHIgPSBzZWxlY3Rpb24ucHJpX3VocjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcm93TW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem1lbmFQcmlwYWR1RERQKHJvd01vZGVsLml4cF9kZHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIHRhYnVsa3UgcMWZZWRwaXPFryAqL1xyXG4gICAgICAgIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQxZllZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFBvdXppdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RQb3V6aXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByZWRwaXN5U2xvemt5VnltYWhhbmkoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmHEjXRlIGRhdGEgZG8gdGFidWxreSAqL1xyXG4gICAgICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXhwRmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgaXhwRmlsdGVyLml4cF9udnkgPSB0aGF0Lm1vZGVsLml4cF9udnk7XHJcbiAgICAgICAgICAgIGl4cEZpbHRlci5peHAgPSB0aGF0Lm1vZGVsLml4cF9kZHA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFByZWRwaXN5U2xvelZ5bVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQgKFDFmWVkcGlzeSBzbG/Fvmt5IHZ5bcOhaMOhbsOtKVwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5saXN0UHJlZHBpc3lTbG96VnltKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGl4cEZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFByZWRwaXN5U2xvelZ5bVwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5lZGl0YWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFjdGVuaUt0Z1Vwb1wiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBrYXRlZ29yaWUgw7rEjWV0bsOtaG8gcG9oeWJ1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC56aXNrZWpOZWptZW5zaVBvdm9sZW5lS3RnVXBvKHsgbWluOiAxLCBtYXg6IDIwMCB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKChrdGdVcG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3RnX3Vwb1wiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHsga3RnX3Vwbzoga3RnVXBvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibmFjdGVuaUt0Z1Vwb1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXZlbsOtIHBvdm9sZW7DrSBlZGl0YWNlIHBvbMOtICovXHJcbiAgICAgICAgZWRpdGFjZVNsb3preSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5lZGl0YWNlKSB7IC8vIGplZG7DoSBzZSBvIGVkaXRhY2kgc2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLy8gem5lYWt0aXZuxJtuw60gcG9sw63EjWVrIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZHBcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImt0Z191cG9cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInByaV91aHJcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UG91eml0Py5lbmFibGVkKGZhbHNlKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBaw61za8OhbsOtIGRhdCBwcm8gcMWZw61wYWQgRERQICovXHJcbiAgICAgICAgem1lbmFQcmlwYWR1RERQKGl4cERkcDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhwX2RkcFwiKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpeHBEZHAubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFjdGVuaURhdEREUFwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQuLi5cIiB9KTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnppc2tlalZTYUl4c0VzdSh7IGl4cDogaXhwRGRwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ2c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkdG8udnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgeyBpeHNfZXN1OiBkdG8uaXhzX2VzdSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hY3RlbmlEYXRERFBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuTW9kZWw6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc3lTbG96a3lWeW1haGFuaUR0byA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRuaSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZG5pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCByZXR1cm5Nb2RlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHsgZGF0YTogcmV0dXJuTW9kZWwgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=