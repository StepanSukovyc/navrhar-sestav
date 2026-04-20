"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GNacteniElVypisuResult.ts              </Name>
//    <Description> Content pro zobrazení výsledku načtení elektronických bankovních výpisů </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-08-25                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro zobrazení výsledku načtení elektronických bankovních výpisů */
            let GNacteniElVypisuResult = class GNacteniElVypisuResult extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "jres:33600776"; //RC 33600776 : Výsledek načtení el. bankovních výpisů
                }
                prepareContent(opts) {
                    $.extend(true, this, opts);
                    this.createActions();
                    this.createCommandBar();
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), { defaultState: "closed" });
                    let view = new Gordic.Data.View(this.data.items ?? [], {
                        key: ["por_cislo"],
                        processors: { tree: treeProcessor }
                    });
                    $.newDiv().appendTo(this.element).ggrid({
                        name: "gridNacteniElVypisuResult",
                        columns: this.createGridFormat(),
                        data: view,
                        columnMode: "full",
                        defaultProfile: {
                            sort: "dat_nov_zus",
                            condFormats: [{
                                    formula: "ISBLANK(@parentId)",
                                    description: "jres:33600777", //RC 33600777 : Hlavička
                                    bg: Gordic.Components.Grid.CondFormats.CondFormatBg.gray,
                                    bold: true
                                }]
                        }
                    }).gautofit();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: {
                            name: "actZavrit",
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addStructureColumn({
                        name: "nazev_souboru",
                        caption: "jres:33600778", //RC 33600778 : Název souboru/Bankovní účet
                        structureLead: true,
                        width: 200
                    })
                        .addIconColumn({
                        name: "kind", caption: "jres:33600779", width: 70, //RC 33600779 : Výsledek
                        iconTemplate: function (data, meta) {
                            // pro virtuální řádek (součtový a podobně) se ikona nevrací
                            if (meta?._isVirtual)
                                return void 0;
                            if (data.kind === 200 /* Gordic.Isl.GOperationResultKind.Success */) // prošel
                                return { icon: "fa-check-circle g-state-success g-state-text", text: "OK" };
                            else if (data.kind === 206 /* Gordic.Isl.GOperationResultKind.Warning */) // upozornění
                                return { icon: "fa-exclamation-triangle g-state-warning g-state-text", text: "Varování" };
                            else if (data.kind === 400 /* Gordic.Isl.GOperationResultKind.Error */) // chyba
                                return { icon: "fa-times-circle g-state-error g-state-text", text: "Chyba" };
                            else // žádný výsledek neexistuje
                                return { icon: "", text: "", tooltip: "" }; // neutrální
                        }
                    })
                        .addTextColumn({
                        name: "error_txt",
                        caption: "jres:33600780", //RC 33600780 : Výsledek - text
                        width: 300
                    })
                        .addTextColumn({
                        name: "ixp",
                        caption: "jres:33600781", //RC 33600781 : Identifikátor výpisu
                        width: 120
                    })
                        .addNumberColumn({
                        name: "cis_pid",
                        caption: "jres:33600782", //RC 33600782 : Číslo výpisu
                        width: 45
                    })
                        .addDateColumn({
                        name: "dat_nov_zus",
                        caption: "jres:33600783" //RC 33600783 : Datum výpisu
                    })
                        .addCurrencyColumn({
                        name: "nov_zus",
                        caption: "jres:33600784" //RC 33600784 : Konečný zůstatek
                    })
                        .addNumberColumn({
                        name: "pocet_polozek",
                        caption: "jres:33600785", //RC 33600785 : Počet položek
                        width: 45
                    })
                        .addNumberColumn({
                        name: "parentId",
                        caption: "parentId",
                        hidden: true
                    });
                }
            };
            GNacteniElVypisuResult = __decorate([
                Decorators.gcontent
            ], GNacteniElVypisuResult);
            WebClient.GNacteniElVypisuResult = GNacteniElVypisuResult;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hY3RlbmlFbFZ5cGlzdVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsMEdBQTBHO0FBQzFHLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0F1SGY7QUF2SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdUhuQjtJQXZIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdUg3QjtRQXZIb0IsV0FBQSxTQUFTO1lBTzFCLDhFQUE4RTtZQUU5RSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLE9BQUEsWUFBWTtnQkFBeEQ7O29CQUdJLFVBQUssR0FBRyxlQUFlLENBQUEsQ0FBQyxzREFBc0Q7Z0JBMEdsRixDQUFDO2dCQXhHRyxjQUFjLENBQUMsSUFBSTtvQkFDZixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckgsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7d0JBQ25ELEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3QkFDbEIsVUFB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bnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQudHMgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyB6b2JyYXplbsOtIHbDvXNsZWRrdSBuYcSNdGVuw60gZWxla3Ryb25pY2vDvWNoIGJhbmtvdm7DrWNoIHbDvXBpc8WvIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDgtMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnRcclxue1xyXG4gICAgLyoqIEludGVyZmFjZSBwcm8gdsO9c2xlZGVrIGFzeWNocm9ubsOtaG8gbmHEjXRlbsOtIGVsLiBiYW5rb3Zuw61jaCB2w71waXPFryovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdOYWN0ZW5pRWxWeXBpc3VBc3luY091dFB1dER0byB7XHJcbiAgICAgICAgcmVzRHRvOiBJbnRlcmZhY2UuR05hY3RlbmlFbFZ5cGlzdVJlc0R0b1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250ZW50IHBybyB6b2JyYXplbsOtIHbDvXNsZWRrdSBuYcSNdGVuw60gZWxla3Ryb25pY2vDvWNoIGJhbmtvdm7DrWNoIHbDvXBpc8WvICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHB1YmxpYyBkYXRhOiBJbnRlcmZhY2UuR05hY3RlbmlFbFZ5cGlzdVJlc0R0bztcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzM2MDA3NzZcIiAvL1JDIDMzNjAwNzc2IDogVsO9c2xlZGVrIG5hxI10ZW7DrSBlbC4gYmFua292bsOtY2ggdsO9cGlzxa9cclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0cykvKjogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgYW55Ki8ge1xyXG4gICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLCBvcHRzKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICBsZXQgdHJlZVByb2Nlc3NvciA9IG5ldyBHb3JkaWMuRGF0YS5UcmVlKEdvcmRpYy5EYXRhLlRyZWUucGFyZW50SWRPcmdhbml6ZXIoXCJwYXJlbnRJZFwiKSwgeyBkZWZhdWx0U3RhdGU6IFwiY2xvc2VkXCIgfSk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5kYXRhLml0ZW1zID8/IFtdLCB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFtcInBvcl9jaXNsb1wiXSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHsgdHJlZTogdHJlZVByb2Nlc3NvciB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTmFjdGVuaUVsVnlwaXN1UmVzdWx0XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRfbm92X3p1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIklTQkxBTksoQHBhcmVudElkKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNzc3XCIsIC8vUkMgMzM2MDA3NzcgOiBIbGF2acSNa2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbGQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZGZvcm3DoXR1IGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkU3RydWN0dXJlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3NvdWJvcnVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3NzhcIiwgLy9SQyAzMzYwMDc3OCA6IE7DoXpldiBzb3Vib3J1L0Jhbmtvdm7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgICAgICBzdHJ1Y3R1cmVMZWFkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJraW5kXCIsIGNhcHRpb246IFwianJlczozMzYwMDc3OVwiLCB3aWR0aDogNzAsIC8vUkMgMzM2MDA3NzkgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhLCBtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBybyB2aXJ0dcOhbG7DrSDFmcOhZGVrIChzb3XEjXRvdsO9IGEgcG9kb2JuxJspIHNlIGlrb25hIG5ldnJhY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhPy5faXNWaXJ0dWFsKSByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MpICAgICAgICAgIC8vIHByb8WhZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJPS1wiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5XYXJuaW5nKSAgICAgLy8gdXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJWYXJvdsOhbsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yKSAgICAgICAvLyBjaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJDaHliYVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gxb7DoWRuw70gdsO9c2xlZGVrIG5lZXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiXCIsIHRleHQ6IFwiXCIsIHRvb2x0aXA6IFwiXCIgfTsgICAgICAgICAgICAgICAgICAgICAvLyBuZXV0csOhbG7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlcnJvcl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3ODBcIiwgLy9SQyAzMzYwMDc4MCA6IFbDvXNsZWRlayAtIHRleHRcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzgxXCIsIC8vUkMgMzM2MDA3ODEgOiBJZGVudGlmaWvDoXRvciB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzX3BpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDc4MlwiLCAvL1JDIDMzNjAwNzgyIDogxIzDrXNsbyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQ1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X25vdl96dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3ODNcIiAvL1JDIDMzNjAwNzgzIDogRGF0dW0gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub3ZfenVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzg0XCIgLy9SQyAzMzYwMDc4NCA6IEtvbmXEjW7DvSB6xa9zdGF0ZWtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0X3BvbG96ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3ODVcIiwgLy9SQyAzMzYwMDc4NSA6IFBvxI1ldCBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0NVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFyZW50SWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcInBhcmVudElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=