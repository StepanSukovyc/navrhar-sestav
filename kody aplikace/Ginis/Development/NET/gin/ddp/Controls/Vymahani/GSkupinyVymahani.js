"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSkupinyVymahani.ts                    </Name>
//    <Description> Skupiny vymáhání                                            </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GSkupinyVymahani = class GSkupinyVymahani extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.taskId = "actGSkupinyVymahani";
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
                            aktivita: 100,
                            ixp_den: that.ixp_den
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
            GSkupinyVymahani = __decorate([
                Decorators.gcontent
            ], GSkupinyVymahani);
            WebClient.GSkupinyVymahani = GSkupinyVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NrdXBpbnlWeW1haGFuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTa3VwaW55VnltYWhhbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0E2TWY7QUE3TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNk1uQjtJQTdNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNk03QjtRQTdNb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQVE5QyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU8sU0FBUztvQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMs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QkFBZ0IsQ0EwTTVCO1lBMU1ZLDBCQUFnQixtQkEwTTVCLENBQUE7UUFDTCxDQUFDLEVBN01vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2TTdCO0lBQUQsQ0FBQyxFQTdNZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNk1uQjtBQUFELENBQUMsRUE3TVMsTUFBTSxLQUFOLE1BQU0sUUE2TWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1NrdXBpbnlWeW1haGFuaS50cyAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNrdXBpbnkgdnltw6Fow6Fuw60gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDItMTggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NrdXBpbnlWeW1haGFuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTa3VwaW5hVnltYWhhbmlEdG8+O1xyXG5cclxuICAgICAgICByb2s6IG51bWJlcjtcclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgaXhwX2Rlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHU2t1cGlueVZ5bWFoYW5pXCI7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIlNrdXBpbnkgdnltw6Fow6Fuw61cIjtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3VpKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUd1aSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlIVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTa3VwaW55VnltYWhhbmlQcmlkYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHU2t1cGlueVZ5bWFoYW5pRGV0YWlsXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1NrdXBpbnlWeW1haGFuaU9kZWJyYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHU2t1cGlueVZ5bWFoYW5pS29waXJvdmF0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQucm9rXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6F6ZXZcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyh7IGRlZmF1bHRPcGVyYXRvcjogXCJMSUtFXCIsIG9wZXJhdG9yczogW1wiTElLRVwiLCBcIkNPTlRBSU5TXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCJDT05UQUlOU1wiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgeyBwYXJhbXM6IHsgcHJpbWFyeTogdHJ1ZSwgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiwgaWQ6IFwiYWN0R1NrdXBpbnlWeW1haGFuaVZ5aGxlZGF0X2J1dHRvblwiLCBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTa3VwaW55VnltYWhhbmlWeWhsZWRhdFwiXSB9IH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgdHlwX3BobDogdGhhdC50eXBfcGhsIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybS5nZm9ybShcIndhaXRGb3JWYWx1ZXNcIilcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IElzbC5WaWV3KElzbC5Ta3VwaW5hVnltYWhhbmkubGlzdChycSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGY6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGYpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhzX3NrdiwgYmFydmEsIG5hemV2LCBwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHU2t1cGlueVZ5bWFoYW5pRGV0YWlsXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Ta3VwaW5hVnltYWhhbmkoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbnlWeW1haGFuaVphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGlueVZ5bWFoYW5pVnlobGVkYXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlobGVkYXRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlQcmlkYXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w6FcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pLkdTa3VwaW5hVnltYWhhbmlcIiwgeyBJRDogXCJERFBHU2t1cGluYVZ5bWFoYW5pI1wiLCAgcmVhZE9ubHk6IGZhbHNlLCBlZGl0TW9kZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NrdXBpbmFWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaXhzX3NrdiA9PT0gXCIwMDAwQU5WMDAwMDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJOZWx6ZSBlZGl0b3ZhdFwiLCBcIlR1dG8gc2t1cGludSB2eW3DoWjDoW7DrSBuZWx6ZSBlZGl0b3ZhdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HU2t1cGluYVZ5bWFoYW5pXCIsIHsgSUQ6IFwiRERQR1NrdXBpbmFWeW1haGFuaSNcIiwgaXhzX3Nrdjogcm93Lml4c19za3YhLCBuYXpldjogcm93Lm5hemV2LCByZWFkT25seTogZmFsc2UsIGVkaXRNb2RlOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2t1cGlueVZ5bWFoYW5pT2RlYnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTbWF6YXRcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTa3VwaW5hVnltYWhhbmlEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93Lml4c19za3YgPT09IFwiMDAwMEFOVjAwMDAwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiTmVsemUgc21hemF0XCIsIFwiVHV0byBza3VwaW51IHZ5bcOhaMOhbsOtIG5lbHplIHNtYXphdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiU21hemF0P1wiLCBcIk9wcmF2ZHUgY2hjZXRlIHNtYXphdCBza3VwaW51IHZ5bcOhaMOhbsOtP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5Ta3VwaW5hVnltYWhhbmkuZGVsZXRlKHsgcnE6IHsgRGF0YTogcm93IH0gfSkuZ2V0KCksIHRoYXQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTa3VwaW55VnltYWhhbmlLb3Bpcm92YXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29ww61yb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NrdXBpbmFWeW1haGFuaUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5WeW1haGFuaS5HTmF6ZXZTa3VwaW55VnltYWhhbmlcIiwgeyBJRDpcIkREUEdOYXpldlNrdXBpbnlWeW1haGFuaSNcIiB9LCBcIk7DoXpldiBza3VwaW55IHZ5bcOhaMOhbsOtXCIsNDAwLDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShJc2wuU2t1cGluYVZ5bWFoYW5pLmNvcHkoeyBycTogeyBEYXRhOiB7IGl4c19za3Y6IHJvdy5peHNfc2t2ISwgbmF6ZXY6IHJldFZhbCB9IH0gfSkuZ2V0KCksIHRoYXQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19