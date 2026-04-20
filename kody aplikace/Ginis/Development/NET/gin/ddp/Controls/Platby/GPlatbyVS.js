"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPlatbyVS.ts                           </Name>
//    <Description> Platby podle VS                                             </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-19                                                  </Created>
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
            let GPlatbyVS = class GPlatbyVS extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.celkem = 0;
                }
                onContentReady() {
                    const that = this;
                    that.taskId = "actGPlatbyVS";
                    //that.createActions();
                    that.createForm();
                    //if (that.InitErrorText != null) {
                    //    that.dialogs.warning("Chyba nastavení", that.InitErrorText,);
                    //} // <<<===== Tímto by mělo končit všechno načítání....
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                //private createActions() {
                //    const that = this;
                //    that.actions.addRange([
                //        new GAction({
                //            name: "actDetail",
                //            caption: "Detail",
                //            icon: "gi-detail",
                //            tooltip: "Zobrazení detailu případu",
                //            run: (ev, ctx) => {
                //                // gridPredpisy // gridPlatby
                //                let row = ctx.cellInfo.data;
                //                if (row) {
                //                    Common.Pripady.openPripadDetail(this, row.ixp);
                //                }
                //            }
                //        }),
                //    ])
                //}
                createForm() {
                    const that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "ddpVSFilter" })
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        initialValue: that.VS
                    });
                    this.filter = $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            this.ziskejData(obj.filter);
                        }
                    });
                    var alist = new GActionList({
                        actMultiAkce: {
                            name: "actDetail",
                            caption: "Zobrazit případ",
                            icon: "gi-detail",
                            //tooltip: "Zobrazení detailu případu",
                            run: (ev, ctx) => {
                                // gridPredpisy // gridPlatby
                                let row = ctx.cellInfo.data;
                                if (row && row?.ixp?.length == 12) {
                                    WebClient.Common.Pripady.openPripadDetail(that, row.ixp_par);
                                }
                                //ctx.selection.forEach(function (item) { item.schvaleno = true; item.datSchvaleni = new Date(); });
                                //$(ctx.grid).ggrid("refreshRows")
                            }
                        }
                    });
                    this.grid = $("<div>").appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                
                        rowNumbers: false,
                        columns: WebClient.Common.GridFormats.PlatbyVS(),
                        //defaultAction: that.actions.actDetail,
                        contextMenu: function (cellContext) {
                            return alist.createBar(["actMultiAkce"]);
                            //return alist.createBar(["polozek: " + cellContext.selection.length.toString(), "actMultiAkce"]) 
                        },
                    });
                    //inicializace saldových políček na spodku gridu
                    var statusWidget = $(".status-widget"); //najití počtového okýnka
                    //salda
                    $(statusWidget).before('<div class="status-widget saldo" >Celkem: </div>'); //nalepení salda k počtu
                    this.saldoStatusWidget = $(".saldo");
                    this.saldoStatusWidget.append('<b class="g-state-text g-state-active">0</b>');
                }
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation({ id: "loadData" });
                    that.isl.PlatbyVS.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                        that.getCelkovouCastku(dto.data);
                        that.endOperation({ id: "loadData" });
                    })
                        .fail(function () {
                        that.endOperation({ id: "loadData" });
                    });
                }
                formatNumberWithSpacesAndDecimals(number) {
                    const formattedNumber = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(number);
                    return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                }
                //vypočet celkové částky dat v gridu
                getCelkovouCastku(data) {
                    var that = this;
                    data.forEach(function (value) {
                        that.celkem = that.celkem + parseFloat(value.c);
                    });
                    var saldo = this.formatNumberWithSpacesAndDecimals(that.celkem);
                    var itemCount = Object.keys(data).length;
                    if (itemCount > 0) {
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(saldo);
                    }
                    else {
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(0);
                    }
                }
            };
            GPlatbyVS = __decorate([
                Decorators.gcontent
            ], GPlatbyVS);
            WebClient.GPlatbyVS = GPlatbyVS;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BsYXRieVZTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BsYXRieVZTLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBNEpmO0FBNUpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRKbkI7SUE1SmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRKN0I7UUE1Sm9CLFdBQUEsU0FBUztZQUcxQixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO2dCQUEzQzs7b0JBV1csV0FBTSxHQUFHLENBQUMsQ0FBQztnQkE2SXRCLENBQUM7Z0JBeklHLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztvQkFDN0IsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLG1DQUFtQztvQkFDbkMsbUVBQW1FO29CQUNuRSx5REFBeUQ7b0JBQ3pELEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFFRCwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLGdDQUFnQztnQkFDaEMsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7Z0JBQ2hDLG1EQUFtRDtnQkFDbkQsaUNBQWlDO2dCQUNqQywrQ0FBK0M7Z0JBQy9DLDhDQUE4QztnQkFDOUMsNEJBQTRCO2dCQUM1QixxRUFBcUU7Z0JBQ3JFLG1CQUFtQjtnQkFDbkIsZUFBZTtnQkFDZixhQUFhO2dC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d3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1BsYXRieVZTLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFBsYXRieSBwb2RsZSBWUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDMtMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGxhdGJ5VlMgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBWUzogc3RyaW5nO1xyXG4gICAgICAgIFR5cFBobDogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyB2aWV3O1xyXG4gICAgICAgIHB1YmxpYyBjZWxrZW0gPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbGRvU3RhdHVzV2lkZ2V0O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHUGxhdGJ5VlNcIjtcclxuICAgICAgICAgICAgLy90aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuSW5pdEVycm9yVGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiQ2h5YmEgbmFzdGF2ZW7DrVwiLCB0aGF0LkluaXRFcnJvclRleHQsKTtcclxuICAgICAgICAgICAgLy99IC8vIDw8PD09PT09IFTDrW10byBieSBtxJtsbyBrb27EjWl0IHbFoWVjaG5vIG5hxI3DrXTDoW7DrS4uLi5cclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5EZHBFa29Jbml0KHRoYXQsIHRoYXQuSW5pdEVycm9yVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgIC8vICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gZGV0YWlsdSBwxZnDrXBhZHVcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBncmlkUHJlZHBpc3kgLy8gZ3JpZFBsYXRieVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhpcywgcm93Lml4cCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KSxcclxuICAgICAgICAvLyAgICBdKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZGRwVlNGaWx0ZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LlZTXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtoZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnppc2tlakRhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIGFsaXN0ID0gbmV3IEdBY3Rpb25MaXN0KHtcclxuICAgICAgICAgICAgICAgIGFjdE11bHRpQWtjZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJab2JyYXppdCBwxZnDrXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcIlpvYnJhemVuw60gZGV0YWlsdSBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWRQcmVkcGlzeSAvLyBncmlkUGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAmJiByb3c/Lml4cD8ubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoYXQsIHJvdy5peHBfcGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2N0eC5zZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyBpdGVtLnNjaHZhbGVubyA9IHRydWU7IGl0ZW0uZGF0U2NodmFsZW5pID0gbmV3IERhdGUoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChjdHguZ3JpZCkuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QbGF0YnlWUygpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogZnVuY3Rpb24gKGNlbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGlzdC5jcmVhdGVCYXIoW1wiYWN0TXVsdGlBa2NlXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBhbGlzdC5jcmVhdGVCYXIoW1wicG9sb3plazogXCIgKyBjZWxsQ29udGV4dC5zZWxlY3Rpb24ubGVuZ3RoLnRvU3RyaW5nKCksIFwiYWN0TXVsdGlBa2NlXCJdKSBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2luaWNpYWxpemFjZSBzYWxkb3bDvWNoIHBvbMOtxI1layBuYSBzcG9ka3UgZ3JpZHVcclxuICAgICAgICAgICAgdmFyIHN0YXR1c1dpZGdldCA9ICQoXCIuc3RhdHVzLXdpZGdldFwiKTsgLy9uYWppdMOtIHBvxI10b3bDqWhvIG9rw71ua2FcclxuICAgICAgICAgICAgLy9zYWxkYVxyXG4gICAgICAgICAgICAkKHN0YXR1c1dpZGdldCkuYmVmb3JlKCc8ZGl2IGNsYXNzPVwic3RhdHVzLXdpZGdldCBzYWxkb1wiID5DZWxrZW06IDwvZGl2PicpOyAvL25hbGVwZW7DrSBzYWxkYSBrIHBvxI10dVxyXG4gICAgICAgICAgICB0aGlzLnNhbGRvU3RhdHVzV2lkZ2V0ID0gJChcIi5zYWxkb1wiKTtcclxuICAgICAgICAgICAgdGhpcy5zYWxkb1N0YXR1c1dpZGdldC5hcHBlbmQoJzxiIGNsYXNzPVwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlXCI+MDwvYj4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHtpZDogXCJsb2FkRGF0YVwifSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlBsYXRieVZTLmxpc3RcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRDZWxrb3ZvdUNhc3RrdShkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKG51bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTnVtYmVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHtcclxuICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICAgICAgfSkuZm9ybWF0KG51bWJlcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyLnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcgJykucmVwbGFjZSgnLicsICcsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3Z5cG/EjWV0IGNlbGtvdsOpIMSNw6FzdGt5IGRhdCB2IGdyaWR1XHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDZWxrb3ZvdUNhc3RrdShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jZWxrZW0gPSB0aGF0LmNlbGtlbSArIHBhcnNlRmxvYXQodmFsdWUuYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgc2FsZG8gPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyh0aGF0LmNlbGtlbSk7XHJcbiAgICAgICAgICAgIHZhciBpdGVtQ291bnQgPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dChzYWxkbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=