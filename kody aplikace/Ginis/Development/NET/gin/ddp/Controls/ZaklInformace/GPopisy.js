"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPopisy.ts                             </Name>
//    <Description> Okno popisů                                                 </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-01-29                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GPopisy = class GPopisy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.filter = {};
                    this.dto = {};
                }
                onContentReady() {
                    var that = this;
                    this.beginOperation({ id: "inicializace" });
                    //menubar, commandbar akce
                    this.actions.addRange({
                        actOk: {
                            name: "actOk",
                            caption: "Ok",
                            //enabled: false,
                            run: function () { that.ok(); }
                        },
                        actClose: {
                            caption: "Zrušit",
                            run: function () { that.close(); }
                        },
                        actSave: {
                            name: "actSave",
                            caption: "Uložit",
                            run: function () { that.save(); }
                        },
                        actDelete: {
                            name: "actDelete",
                            caption: "Smazat",
                            run: function () { that.delete(); }
                        }
                    });
                    if (this.Okno == "pripad") {
                        that.filter.pripad = true;
                        that.filter.predpis = false;
                        that.dto.pripad = true;
                        that.dto.predpis = false;
                    }
                    else if (this.Okno == "predpis") {
                        that.filter.pripad = false;
                        that.filter.predpis = true;
                        that.dto.pripad = false;
                        that.dto.predpis = true;
                    }
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "40%")
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                                  
                        columns: WebClient.Common.GridFormats.Popisy(),
                    });
                    this.createForm();
                    this.refresh();
                    this.endOperation({ id: "inicializace" });
                }
                createForm() {
                    var that = this;
                    var filtrRazeniForm = new Gordic.Forms.Form({ name: "filtrRazeniForm", layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-12-12-0" })
                        .addSection("Filtr")
                        .addField("gcheck", "w-6", {
                        name: "vlastni",
                        label: "Vlastní",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "pro_knihu",
                        label: "Pro tuto knihu",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "dle_popisu",
                        label: "Podle popisu",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addSection("Řazení")
                        .addField("gradio", {
                        name: "razeni",
                        itemClass: "w-6",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: 'podle času použití' },
                            { value: 1, label: 'podle abecedy' },
                            { value: 2, label: 'podle četnosti použití' },
                            { value: 3, label: 'podle pořadí vzniku' },
                        ],
                        change: function (ev, changeObj) {
                            that.refresh();
                        }
                    });
                    var popisForm = new Gordic.Forms.Form({ name: "popisForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addSection("Popis")
                        .addField("gstringbox", {
                        name: "popis",
                        rows: 5,
                        initialValue: this.Popis,
                        change: function (ev, input) {
                            if ((input.value == null || input.value == undefined) && that.actions.actSave) {
                                that.actions.actSave.enabled(false);
                            }
                            else if (that.actions.actSave)
                                that.actions.actSave.enabled(true);
                        }
                    });
                    var ukladaniForm = new Gordic.Forms.Form({ name: "ukladaniForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-12-12-0" })
                        .addSection("Ukladání")
                        .addField("gcheck", "w-3", {
                        name: "save_vlastni",
                        label: "jako vlastní",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addField("gcheck", "w-3", {
                        name: "save_kniha",
                        label: "s knihou",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    });
                    $("<div>").appendTo(this.element).gform("createFrom", filtrRazeniForm);
                    $("<div>").appendTo(this.element).gform("createFrom", popisForm);
                    $("<div>").appendTo(this.element).gform("createFrom", ukladaniForm);
                    this.commandBar(this.actions.createBar(["actOk", "actClose", "actSave", "actDelete"]));
                }
                refresh() {
                    var that = this;
                    var filtrRazeniForm = this.findForms("filtrRazeniForm");
                    var popisForm = this.findForms("popisForm");
                    var ukladaniForm = this.findForms("ukladaniForm");
                    that.filter.vlastni = filtrRazeniForm.findFields("vlastni").gfield("getValue");
                    that.filter.pro_knihu = filtrRazeniForm.findFields("pro_knihu").gfield("getValue");
                    that.filter.dle_popisu = filtrRazeniForm.findFields("dle_popisu").gfield("getValue");
                    that.filter.razeni = filtrRazeniForm.findFields("razeni").gfield("getValue");
                    var popis = popisForm.findFields("popis").gfield("getValue");
                    that.filter.popis = popis;
                    that.filter.save_vlastni = ukladaniForm.findFields("save_vlastni").gfield("getValue");
                    that.filter.save_kniha = ukladaniForm.findFields("save_kniha").gfield("getValue");
                    that.loadData();
                }
                loadData() {
                    var that = this;
                    that.beginOperation({ id: "loadData" });
                    that.isl.Popisy.list(rq => {
                        return {
                            filters: that.filter
                        };
                    }).get().done(function (dto) {
                        for (var i = 0; i < dto.data.length; i++) {
                            var popis = dto.data[i].popis;
                            if (popis != null) {
                                dto.data[i].popis = popis.replace(/\/n/g, '\n');
                            }
                        }
                        that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                        debugger;
                        if (dto.data.length == 0 && (that.actions.actOk && that.actions.actDelete)) {
                            that.actions.actOk.enabled(false);
                            that.actions.actDelete.enabled(false);
                        }
                        else if (that.actions.actOk && that.actions.actDelete) {
                            that.actions.actOk.enabled(true);
                            that.actions.actDelete.enabled(true);
                        }
                        that.endOperation({ id: "loadData" });
                    });
                }
                ok() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    that.dto.radek = selection[0].radek;
                    that.dto.cetnost = selection[0].cetnost;
                    that.beginOperation({ id: "saveOKData" });
                    that.isl.Popisy.pouziti({
                        dto: that.dto
                    }).get().done(function (dto) {
                        that.endOperation({ id: "saveOKData" });
                    }).fail(function (dto) { that.endOperation({ id: "saveOKData" }); });
                    that.close(selection[0].popis);
                }
                save() {
                    var that = this;
                    that.beginOperation({ id: "saveData" });
                    var popisForm = this.findForms("popisForm");
                    var ukladaniForm = this.findForms("ukladaniForm");
                    var popis = popisForm.findFields("popis").gfield("getValue");
                    var save_vlastni = ukladaniForm.findFields("save_vlastni").gfield("getValue");
                    var save_kniha = ukladaniForm.findFields("save_kniha").gfield("getValue");
                    that.dto.popis = popis.replace(/\n/g, '/n'); //nahrazení nového řádku znakem nového řádku - "/n""
                    that.dto.save_vlastni = save_vlastni;
                    that.dto.save_kniha = save_kniha;
                    that.isl.Popisy.save({
                        dto: that.dto
                    }).get().done(function (dto) {
                        that.endOperation({ id: "saveData" });
                        that.loadData();
                        var resp = dto.Dto?.response;
                        if (resp != null)
                            that.showFlash(resp, "error"); //když je resp prázdná string (""), tak se stejně neukáže (což je fajn)
                    }).fail(function (dto) { that.endOperation({ id: "saveData" }); });
                }
                delete() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection"); //Seznam zaškrtnutých řádků lze přečíst metodou getSelection()
                    this.dialogs.confirm("Smazat", "Opravdu checete smazat popis: " + selection[0].popis)
                        .on("close", (ev, retVal) => {
                        if (retVal === "yes") {
                            that.beginOperation({ id: "deleteData" });
                            that.dto.radek = selection[0].radek;
                            that.dto.cetnost = selection[0].cetnost;
                            that.isl.Popisy.delete({
                                dto: that.dto
                            }).get().done(function (dto) {
                                that.endOperation({ id: "deleteData" });
                                that.loadData();
                            }).fail(function (dto) { that.endOperation({ id: "deleteData" }); });
                        }
                    });
                }
            };
            GPopisy = __decorate([
                Decorators.gcontent
            ], GPopisy);
            WebClient.GPopisy = GPopisy;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvcGlzeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb3Bpc3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0E0UWY7QUE1UUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNFFuQjtJQTVRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNFE3QjtRQTVRb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQVEsU0FBUSxPQUFBLFlBQVk7Z0JBQXpDOztvQkFNWSxXQUFNLEdBQVEsRUFBRSxDQUFDO29CQUNqQixRQUFHLEdBQVEsRUFBRSxDQUFDO2dCQWlRMUIsQ0FBQztnQkEvUEcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFFNUMsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFOzRCQUNILElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxJQUFJOzRCQUNiLGlCQUFpQjs0QkFDakIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDakM7d0JBQ0QsUUFBUSxFQUFFOzRCQUNOLE9BQU8sRUFBRSxRQUFROzRCQUNqQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDO3lCQUNwQzt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLEdBQUcsRUFBRSxj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YUFBUyxRQTRRN0I7SUFBRCxDQUFDLEVBNVFnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0UW5CO0FBQUQsQ0FBQyxFQTVRUyxNQUFNLEtBQU4sTUFBTSxRQTRRZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUG9waXN5LnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwb3Bpc8WvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDEtMjkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb3Bpc3kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyB2aWV3O1xyXG5cclxuICAgICAgICBQb3BpczogU3RyaW5nO1xyXG4gICAgICAgIE9rbm86IFN0cmluZztcclxuICAgICAgICBwcml2YXRlIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgcHJpdmF0ZSBkdG86IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiaW5pY2lhbGl6YWNlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvL21lbnViYXIsIGNvbW1hbmRiYXIgYWtjZVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKSB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc2F2ZSgpIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERlbGV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU21hemF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZGVsZXRlKCkgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuT2tubyA9PSBcInByaXBhZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbHRlci5wcmlwYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIucHJlZHBpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kdG8ucHJpcGFkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZHRvLnByZWRwaXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5Pa25vID09IFwicHJlZHBpc1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbHRlci5wcmlwYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLnByZWRwaXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kdG8ucHJpcGFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmR0by5wcmVkcGlzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCI0MCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Qb3Bpc3koKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZVwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmaWx0clJhemVuaUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZpbHRyUmF6ZW5pRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJGaWx0clwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZsYXN0bmlcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWbGFzdG7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb19rbmlodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBybyB0dXRvIGtuaWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGxlX3BvcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvZGxlIHBvcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCLFmGF6ZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhemVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAncG9kbGUgxI1hc3UgcG91xb5pdMOtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ3BvZGxlIGFiZWNlZHknIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIsIGxhYmVsOiAncG9kbGUgxI1ldG5vc3RpIHBvdcW+aXTDrScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMywgbGFiZWw6ICdwb2RsZSBwb8WZYWTDrSB2em5pa3UnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIHBvcGlzRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicG9waXNGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhpcy5Qb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChpbnB1dC52YWx1ZSA9PSBudWxsIHx8IGlucHV0LnZhbHVlID09IHVuZGVmaW5lZCkgJiYgdGhhdC5hY3Rpb25zLmFjdFNhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQuYWN0aW9ucy5hY3RTYXZlKSB0aGF0LmFjdGlvbnMuYWN0U2F2ZS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgdWtsYWRhbmlGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ1a2xhZGFuaUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVWtsYWTDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNhdmVfdmxhc3RuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpha28gdmxhc3Ruw61cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYXZlX2tuaWhhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwicyBrbmlob3VcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmaWx0clJhemVuaUZvcm0pO1xyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgcG9waXNGb3JtKTtcclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHVrbGFkYW5pRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPa1wiLCBcImFjdENsb3NlXCIsIFwiYWN0U2F2ZVwiLCBcImFjdERlbGV0ZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdHJSYXplbmlGb3JtID0gdGhpcy5maW5kRm9ybXMoXCJmaWx0clJhemVuaUZvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBwb3Bpc0Zvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInBvcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIHVrbGFkYW5pRm9ybSA9IHRoaXMuZmluZEZvcm1zKFwidWtsYWRhbmlGb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIudmxhc3RuaSA9IGZpbHRyUmF6ZW5pRm9ybS5maW5kRmllbGRzKFwidmxhc3RuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIucHJvX2tuaWh1ID0gZmlsdHJSYXplbmlGb3JtLmZpbmRGaWVsZHMoXCJwcm9fa25paHVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyLmRsZV9wb3Bpc3UgPSBmaWx0clJhemVuaUZvcm0uZmluZEZpZWxkcyhcImRsZV9wb3Bpc3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyLnJhemVuaSA9IGZpbHRyUmF6ZW5pRm9ybS5maW5kRmllbGRzKFwicmF6ZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvcGlzID0gcG9waXNGb3JtLmZpbmRGaWVsZHMoXCJwb3Bpc1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIucG9waXMgPSBwb3BpcyBcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyLnNhdmVfdmxhc3RuaSA9IHVrbGFkYW5pRm9ybS5maW5kRmllbGRzKFwic2F2ZV92bGFzdG5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbHRlci5zYXZlX2tuaWhhID0gdWtsYWRhbmlGb3JtLmZpbmRGaWVsZHMoXCJzYXZlX2tuaWhhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb3Bpc3kubGlzdFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHRoYXQuZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0by5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcGlzID0gZHRvLmRhdGFbaV0ucG9waXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcGlzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmRhdGFbaV0ucG9waXMgPSBwb3Bpcy5yZXBsYWNlKC9cXC9uL2csICdcXG4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgaWYgKGR0by5kYXRhLmxlbmd0aCA9PSAwICYmICh0aGF0LmFjdGlvbnMuYWN0T2sgJiYgdGhhdC5hY3Rpb25zLmFjdERlbGV0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T2suZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERlbGV0ZS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5hY3Rpb25zLmFjdE9rICYmIHRoYXQuYWN0aW9ucy5hY3REZWxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T2suZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGVsZXRlLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2soKSB7ICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5HUG9waXN5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgdGhhdC5kdG8ucmFkZWsgPSBzZWxlY3Rpb25bMF0ucmFkZWs7XHJcbiAgICAgICAgICAgIHRoYXQuZHRvLmNldG5vc3QgPSBzZWxlY3Rpb25bMF0uY2V0bm9zdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJzYXZlT0tEYXRhXCJ9KVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb3Bpc3kucG91eml0aSh7XHJcbiAgICAgICAgICAgICAgICBkdG86IHRoYXQuZHRvXHJcbiAgICAgICAgICAgIH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJzYXZlT0tEYXRhXCIgfSk7XHJcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGR0bykgeyB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInNhdmVPS0RhdGFcIiB9KTsgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNsb3NlKHNlbGVjdGlvblswXS5wb3Bpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNhdmUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInNhdmVEYXRhXCIgfSk7XHJcbiAgICAgICAgICAgIHZhciBwb3Bpc0Zvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInBvcGlzRm9ybVwiKTtcclxuICAgICAgICAgICAgdmFyIHVrbGFkYW5pRm9ybSA9IHRoaXMuZmluZEZvcm1zKFwidWtsYWRhbmlGb3JtXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBwb3BpcyA9IHBvcGlzRm9ybS5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBzYXZlX3ZsYXN0bmkgPSB1a2xhZGFuaUZvcm0uZmluZEZpZWxkcyhcInNhdmVfdmxhc3RuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHNhdmVfa25paGEgPSB1a2xhZGFuaUZvcm0uZmluZEZpZWxkcyhcInNhdmVfa25paGFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZHRvLnBvcGlzID0gcG9waXMucmVwbGFjZSgvXFxuL2csICcvbicpOyAvL25haHJhemVuw60gbm92w6lobyDFmcOhZGt1IHpuYWtlbSBub3bDqWhvIMWZw6Fka3UgLSBcIi9uXCJcIlxyXG4gICAgICAgICAgICB0aGF0LmR0by5zYXZlX3ZsYXN0bmkgPSBzYXZlX3ZsYXN0bmk7XHJcbiAgICAgICAgICAgIHRoYXQuZHRvLnNhdmVfa25paGEgPSBzYXZlX2tuaWhhO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUG9waXN5LnNhdmUoe1xyXG4gICAgICAgICAgICAgICAgZHRvOiB0aGF0LmR0b1xyXG4gICAgICAgICAgICB9KS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwic2F2ZURhdGFcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwID0gZHRvLkR0bz8ucmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwICE9IG51bGwpIHRoYXQuc2hvd0ZsYXNoKHJlc3AsIFwiZXJyb3JcIik7IC8va2R5xb4gamUgcmVzcCBwcsOhemRuw6Egc3RyaW5nIChcIlwiKSwgdGFrIHNlIHN0ZWpuxJsgbmV1a8Ohxb5lIChjb8W+IGplIGZham4pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZHRvKSB7IHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwic2F2ZURhdGFcIiB9KTsgfSk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWxldGUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5HUG9waXN5RHRvPihcImdldFNlbGVjdGlvblwiKTsgLy9TZXpuYW0gemHFoWtydG51dMO9Y2ggxZnDoWRrxa8gbHplIHDFmWXEjcOtc3QgbWV0b2RvdSBnZXRTZWxlY3Rpb24oKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJTbWF6YXRcIiwgXCJPcHJhdmR1IGNoZWNldGUgc21hemF0IHBvcGlzOiBcIiArIHNlbGVjdGlvblswXS5wb3BpcylcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiZGVsZXRlRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmR0by5yYWRlayA9IHNlbGVjdGlvblswXS5yYWRlaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kdG8uY2V0bm9zdCA9IHNlbGVjdGlvblswXS5jZXRub3N0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9waXN5LmRlbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG86IHRoYXQuZHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJkZWxldGVEYXRhXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGR0bykgeyB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImRlbGV0ZURhdGFcIiB9KTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==