"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPohybyPripadu.ts                      </Name>
//    <Description> Okno pohybů předpisů a plateb na případu                    </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-30                                                  </Created>
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
            //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.GPohybyPripadu", { ID: "DDPGPohybyPripadu#", ixp: this.Ixp }); přičemž this.Ixp bude odpovídat aktualní ixp
            let GPohybyPripadu = class GPohybyPripadu extends Gordic.GContentBase {
                onContentReady() {
                    //z nějakého důvodu se ne vždy zašle hodnota, tak to hodíme sami
                    if (this.zobrazeni == null || this.zobrazeni == 20)
                        this.zobrazeni = 0;
                    var that = this;
                    this.taskId = "actGPohybyPripadu";
                    this.createActions();
                    that.setBreadcrumbs([{
                            caption: "Pohyby případu " + this.ixp,
                            action: this.actions.actPripadyZavritPotomky,
                        }]);
                    this.createFilterForm();
                }
                createActions() {
                    var that = this;
                    // položky menuBaru
                    that.actions.addRange({
                        actPripadyZavritPotomky: {
                            name: "zavritpotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                    });
                }
                createFilterForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "mainForm" })
                        .addRow({ label: "Typ zobrazeni" }).addField("gradio", {
                        name: "typ",
                        itemClass: "w-12",
                        initialValue: that.zobrazeni,
                        radios: [
                            { value: 0, label: 'Splátkové' },
                            { value: 10, label: 'Účetní' },
                        ],
                    })
                        .addRow({ label: "Interval pro zobrazení" })
                        .addField("gdatebox", {
                        name: "dat_od",
                        initialValue: that.dat_od,
                    })
                        .addField("gdatebox", {
                        name: "dat_do",
                        initialValue: that.dat_do,
                    })
                        .addRow("Zaškrtávací pole ")
                        .addField("gcheck", {
                        name: "secist_den",
                        label: "Sečíst předpisy/platby v jednom dni",
                    })
                        .addField("gcheck", {
                        name: "napojene",
                        label: "Započíst i napojené případy",
                    });
                    that.filter = $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfterCreatePanel: true,
                        apply: (event, obj) => {
                            that.ziskejData(obj.filter);
                        }
                    });
                    that.gridPohybu = $("<div>").appendTo(that.element)
                        .ggrid({
                        data: [],
                        renderMode: "auto", //auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", //fit, full
                        navigationMode: "row", //row, cell                
                        defaultAction: that.actions.actDetail,
                        columns: WebClient.Common.GridFormats.PohybyPripadu(),
                        defaultProfile: {
                            rowNumbers: false,
                        },
                        profiles: [{
                                name: "radek", _locked: true, _default: true,
                                columnList: "radek, predpis, platba, stav, datum1, datum2, dat_kontr, poznamka, ktg_upo, ixs_esu_txt, ixp",
                                condFormats: [
                                    { description: "#", formula: 'ISBLANK(@radek)', bold: true },
                                ]
                            }]
                    });
                }
                ziskejData(filter) {
                    var that = this;
                    filter.ixp = that.ixp;
                    that.beginOperation({ id: "loadData", text: "Načítání dat" });
                    that.isl.PohybyPripadu.pohybyPripadu(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        if (dto == null) {
                            that.view = null;
                        }
                        else
                            that.view = new Gordic.Data.View(dto.data);
                        that.gridPohybu.ggrid("setData", that.view);
                        that.endOperation({ id: "loadData" });
                    });
                }
            };
            GPohybyPripadu = __decorate([
                Decorators.gcontent
            ], GPohybyPripadu);
            WebClient.GPohybyPripadu = GPohybyPripadu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaHlieVByaXBhZHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9oeWJ5UHJpcGFkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXFJZjtBQXJJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxSW5CO0lBcklnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxSTdCO1FBcklvQixXQUFBLFNBQVM7WUFFMUIsZ0xBQWdMO1lBRWhMLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBYTVDLGNBQWM7b0JBQ1YsZ0VBQWdFO29CQUNoRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTt3QkFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQTtvQkFDdEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO29CQUVsQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBRXJCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakIsT0FBTyxFQUFFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHOzRCQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUI7eUJBQy9DLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVPLGFBQWE7b0JBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsbUJBQW1CO29CQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFD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QVMsS0FBVCxhQUFTLFFBcUk3QjtJQUFELENBQUMsRUFySWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFJbkI7QUFBRCxDQUFDLEVBcklTLE1BQU0sS0FBTixNQUFNLFFBcUlmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2h5YnlQcmlwYWR1LnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBvaHlixa8gcMWZZWRwaXPFryBhIHBsYXRlYiBuYSBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTEtMzAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy96YXZvbGF0IHogamluw6lobyBtw61zdGEgcG9tb2PDrTogdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2h5YnlQcmlwYWR1XCIsIHsgSUQ6IFwiRERQR1BvaHlieVByaXBhZHUjXCIsIGl4cDogdGhpcy5JeHAgfSk7IHDFmWnEjWVtxb4gdGhpcy5JeHAgYnVkZSBvZHBvdsOtZGF0IGFrdHVhbG7DrSBpeHBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BvaHlieVByaXBhZHUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+OyAgICAgICBcclxuICAgICAgICBwdWJsaWMgZ3JpZFBvaHlidTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgdmlldztcclxuXHJcbiAgICAgICAgLy9VUDc2WDAwMjgzT0VcclxuXHJcbiAgICAgICAgLy9kYXRhIHplIHNhbGRhXHJcbiAgICAgICAgaXhwOiBzdHJpbmc7XHJcbiAgICAgICAgem9icmF6ZW5pOiBudW1iZXI7XHJcbiAgICAgICAgZGF0X29kOiBEYXRlO1xyXG4gICAgICAgIGRhdF9kbzogRGF0ZTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIC8veiBuxJtqYWvDqWhvIGTFr3ZvZHUgc2UgbmUgdsW+ZHkgemHFoWxlIGhvZG5vdGEsIHRhayB0byBob2TDrW1lIHNhbWlcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9icmF6ZW5pID09IG51bGwgfHwgdGhpcy56b2JyYXplbmkgPT0gMjApIHRoaXMuem9icmF6ZW5pID0gMFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gXCJhY3RHUG9oeWJ5UHJpcGFkdVwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvaHlieSBwxZnDrXBhZHUgXCIgKyB0aGlzLml4cCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFByaXBhZHlaYXZyaXRQb3RvbWt5LFxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyRm9ybSgpOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBwb2xvxb5reSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJpcGFkeVphdnJpdFBvdG9ta3k6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInphdnJpdHBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgIFxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIm1haW5Gb3JtXCIgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHpvYnJhemVuaVwiIH0pLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LnpvYnJhemVuaSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdTcGzDoXRrb3bDqScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMTAsIGxhYmVsOiAnw5rEjWV0bsOtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJbnRlcnZhbCBwcm8gem9icmF6ZW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuZGF0X29kLFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LmRhdF9kbyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWmHFoWtydMOhdmFjw60gcG9sZSBcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWNpc3RfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2XEjcOtc3QgcMWZZWRwaXN5L3BsYXRieSB2IGplZG5vbSBkbmlcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFwb2plbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaYXBvxI3DrXN0IGkgbmFwb2plbsOpIHDFmcOtcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtoZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEob2JqLmZpbHRlcik7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFBvaHlidSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy9hdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvL3JvdywgY2VsbCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Qb2h5YnlQcmlwYWR1KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla1wiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJyYWRlaywgcHJlZHBpcywgcGxhdGJhLCBzdGF2LCBkYXR1bTEsIGRhdHVtMiwgZGF0X2tvbnRyLCBwb3puYW1rYSwga3RnX3VwbywgaXhzX2VzdV90eHQsIGl4cFwiLCAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIiNcIiwgZm9ybXVsYTogJ0lTQkxBTksoQHJhZGVrKScsIGJvbGQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5peHA7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe2lkOiBcImxvYWREYXRhXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdFwifSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb2h5YnlQcmlwYWR1LnBvaHlieVByaXBhZHVcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZHRvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBvaHlidS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==