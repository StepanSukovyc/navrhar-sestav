"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSkupinyVymahaniADM.ts                 </Name>
//    <Description> Skupiny vymáhání (verze pro ADX)                            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-14                                                  </Created>
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
            let GSkupinyVymahaniADM = class GSkupinyVymahaniADM extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.taskId = "actGSkupinyVymahaniADM";
                    that.title = "Skupiny vymáhání";
                    that.createActions();
                    that.createGui();
                }
                createGui() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose!"]));
                    that.menuBar([
                        {
                            action: that.actions["actGSkupinyVymahaniPridat"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGSkupinyVymahaniDetail"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGSkupinyVymahaniOdebrat"],
                            favorite: true
                        },
                        {
                            action: that.actions["actGSkupinyVymahaniKopirovat"],
                            favorite: true
                        }
                    ]);
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        serverFilters: {
                            rok: that.rok
                        }
                    })
                        .addRow("Název")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), {
                        name: "nazev"
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), {
                        name: "poznamka"
                    })
                        .addRow({ customClass: "right" })
                        .addField("gbutton", { params: { primary: true, customClass: "right", id: "actGSkupinyVymahaniVyhledat_button", action: that.actions["actGSkupinyVymahaniVyhledat"] } });
                    that.defaultForm = $("<div>")
                        .appendTo(that.element)
                        .gform("createFrom", form);
                    that.defaultForm.findFields().gfield("model", "apply", { typ_phl: that.typ_phl });
                    that.defaultForm.gform("waitForValues")
                        .always(() => {
                        that.createGrid();
                    });
                }
                createGrid() {
                    const that = this;
                    that.view = new Gordic.Isl.View(Gordic.Isl.SkupinaVymahani.list(rq => {
                        let f = {
                            aktivita: 100
                        };
                        that.defaultForm.findFields().gfield("model", "collect", f);
                        return {
                            filters: f
                        };
                    }));
                    that.grid = $("<div>")
                        .appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: that.view,
                        defaultProfile: {
                            rowNumbers: true,
                            columnList: "ixs_skv, barva, nazev, poznamka"
                        },
                        defaultAction: that.actions["actGSkupinyVymahaniDetail"],
                        columns: WebClient.Common.GridFormats.SkupinaVymahani()
                    });
                }
                createActions() {
                    const that = this;
                    that.actions.addRange([{
                            name: "actGSkupinyVymahaniZavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGSkupinyVymahaniVyhledat",
                            caption: "Vyhledat",
                            run: () => {
                                that.view.requestData();
                            }
                        },
                        {
                            name: "actGSkupinyVymahaniPridat",
                            caption: "Nová",
                            icon: "fa-plus",
                            run: () => {
                                that.navigate("Gordic.Ddp.WebClient.Controls.Vymahani.GSkupinaVymahani", { ID: "DDPGSkupinaVymahani#", readOnly: false, editMode: false })
                                    .on("close", () => {
                                    that.view.requestData();
                                });
                            }
                        },
                        {
                            name: "actGSkupinyVymahaniDetail",
                            caption: "Detail",
                            icon: "fa-pencil",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                if (row == null)
                                    return;
                                if (row.ixs_skv === "0000ANV00000") {
                                    that.dialogs.error("Nelze editovat", "Tuto skupinu vymáhání nelze editovat.");
                                    return;
                                }
                                that.navigate("Gordic.Ddp.WebClient.Controls.Vymahani.GSkupinaVymahani", { ID: "DDPGSkupinaVymahani#", ixs_skv: row.ixs_skv, nazev: row.nazev, readOnly: false, editMode: true })
                                    .on("close", () => {
                                    that.view.requestData();
                                });
                            }
                        },
                        {
                            name: "actGSkupinyVymahaniOdebrat",
                            caption: "Smazat",
                            icon: "fa-trash",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                if (row == null)
                                    return;
                                if (row.ixs_skv === "0000ANV00000") {
                                    that.dialogs.error("Nelze smazat", "Tuto skupinu vymáhání nelze smazat.");
                                    return;
                                }
                                that.dialogs.confirm("Smazat?", "Opravdu chcete smazat skupinu vymáhání?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        Ddp.WebClient.Common.Base.ProcessResponse(Gordic.Isl.SkupinaVymahani.delete({ rq: { Data: row } }).get(), that, false)
                                            .done(() => {
                                            that.view.requestData();
                                        });
                                    }
                                });
                            }
                        },
                        {
                            name: "actGSkupinyVymahaniKopirovat",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                let row = that.grid.ggrid("activeRow");
                                if (row == null)
                                    return;
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GNazevSkupinyVymahani", { ID: "DDPGNazevSkupinyVymahani#" }, "Název skupiny vymáhání", 400, 200)
                                    .on("close", (ev, retVal) => {
                                    if (retVal) {
                                        Ddp.WebClient.Common.Base.ProcessResponse(Gordic.Isl.SkupinaVymahani.copy({ rq: { Data: { ixs_skv: row.ixs_skv, nazev: retVal } } }).get(), that, false)
                                            .done(() => {
                                            that.view.requestData();
                                        });
                                    }
                                });
                            }
                        }]);
                }
            };
            GSkupinyVymahaniADM = __decorate([
                Decorators.gcontent
            ], GSkupinyVymahaniADM);
            WebClient.GSkupinyVymahaniADM = GSkupinyVymahaniADM;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NrdXBpbnlWeW1haGFuaUFETS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTa3VwaW55VnltYWhhbmlBRE0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0EyTWY7QUEzTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMk1uQjtJQTNNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMk03QjtRQTNNb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQU9qRCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU8sU0FBUztvQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFX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LHNCQXdNL0IsQ0FBQTtRQUNMLENBQUMsRUEzTW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJNN0I7SUFBRCxDQUFDLEVBM01nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyTW5CO0FBQUQsQ0FBQyxFQTNNUyxNQUFNLEtBQU4sTUFBTSxRQTJNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HU2t1cGlueVZ5bWFoYW5pQURNLnRzICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU2t1cGlueSB2eW3DoWjDoW7DrSAodmVyemUgcHJvIEFEWCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wMi0xNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NrdXBpbnlWeW1haGFuaUFETSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTa3VwaW5hVnltYWhhbmlEdG8+O1xyXG5cclxuICAgICAgICByb2s6IG51bWJlcjtcclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdTa3VwaW55VnltYWhhbmlBRE1cIjtcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiU2t1cGlueSB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHdWkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3VpKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Q2xvc2UhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1NrdXBpbnlWeW1haGFuaVByaWRhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTa3VwaW55VnltYWhhbmlEZXRhaWxcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHU2t1cGlueVZ5bWFoYW5pT2RlYnJhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTa3VwaW55VnltYWhhbmlLb3Bpcm92YXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5yb2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiQ09OVEFJTlNcIiwgXCI9XCJdLCB1c2VyT3BlcmF0b3JzOiBbXSB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyh7IGRlZmF1bHRPcGVyYXRvcjogXCJMSUtFXCIsIG9wZXJhdG9yczogW1wiTElLRVwiLCBcIkNPTlRBSU5TXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCB7IHBhcmFtczogeyBwcmltYXJ5OiB0cnVlLCBjdXN0b21DbGFzczogXCJyaWdodFwiLCBpZDogXCJhY3RHU2t1cGlueVZ5bWFoYW5pVnlobGVkYXRfYnV0dG9uXCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1NrdXBpbnlWeW1haGFuaVZ5aGxlZGF0XCJdIH0gfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgSXNsLlZpZXcoSXNsLlNrdXBpbmFWeW1haGFuaS5saXN0KHJxID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4c19za3YsIGJhcnZhLCBuYXpldiwgcG96bmFta2FcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1NrdXBpbnlWeW1haGFuaURldGFpbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2t1cGluYVZ5bWFoYW5pKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbnlWeW1haGFuaVZ5aGxlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5aGxlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGlueVZ5bWFoYW5pUHJpZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsOhXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBsdXNcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HU2t1cGluYVZ5bWFoYW5pXCIsIHsgSUQ6IFwiRERQR1NrdXBpbmFWeW1haGFuaSNcIiwgcmVhZE9ubHk6IGZhbHNlLCBlZGl0TW9kZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NrdXBpbmFWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaXhzX3NrdiA9PT0gXCIwMDAwQU5WMDAwMDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJOZWx6ZSBlZGl0b3ZhdFwiLCBcIlR1dG8gc2t1cGludSB2eW3DoWjDoW7DrSBuZWx6ZSBlZGl0b3ZhdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HU2t1cGluYVZ5bWFoYW5pXCIsIHsgSUQ6IFwiRERQR1NrdXBpbmFWeW1haGFuaSNcIiwgaXhzX3Nrdjogcm93Lml4c19za3YhLCBuYXpldjogcm93Lm5hemV2LCByZWFkT25seTogZmFsc2UsIGVkaXRNb2RlOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGlueVZ5bWFoYW5pT2RlYnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTbWF6YXRcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTa3VwaW5hVnltYWhhbmlEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93Lml4c19za3YgPT09IFwiMDAwMEFOVjAwMDAwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiTmVsemUgc21hemF0XCIsIFwiVHV0byBza3VwaW51IHZ5bcOhaMOhbsOtIG5lbHplIHNtYXphdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiU21hemF0P1wiLCBcIk9wcmF2ZHUgY2hjZXRlIHNtYXphdCBza3VwaW51IHZ5bcOhaMOhbsOtP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5Ta3VwaW5hVnltYWhhbmkuZGVsZXRlKHsgcnE6IHsgRGF0YTogcm93IH0gfSkuZ2V0KCksIHRoYXQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlLb3Bpcm92YXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29ww61yb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NrdXBpbmFWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HTmF6ZXZTa3VwaW55VnltYWhhbmlcIiwge0lEOiBcIkREUEdOYXpldlNrdXBpbnlWeW1haGFuaSNcIiB9LCBcIk7DoXpldiBza3VwaW55IHZ5bcOhaMOhbsOtXCIsNDAwLDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShJc2wuU2t1cGluYVZ5bWFoYW5pLmNvcHkoeyBycTogeyBEYXRhOiB7IGl4c19za3Y6IHJvdy5peHNfc2t2ISwgbmF6ZXY6IHJldFZhbCB9IH0gfSkuZ2V0KCksIHRoYXQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19