"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Bar.WebClient.GBarVerze.js                                                        </Name>
//    <Description> GBarVerze                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GBarVerze = class GBarVerze extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Přehled balančních verzí"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamPozadavku"; // označení položky v taskListu
                    this.row = null;
                }
                ;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        selection: function (ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                            }
                        },
                        searchColumns: ["*verze_c", "*verze_k", "*popis"],
                        columns: new Gordic.Data.GridFormat()
                            //.addIconColumn({
                            //    name: "aktivita",
                            //    field: "aktivita",
                            //    caption: "Stav",
                            //    // width: 25,
                            //    formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            //    iconTemplate: function (data) {
                            //        switch (data.aktivita) {
                            //            case 100: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                            //            case 300: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                            //            case 500: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                            //            default: return null;
                            //        }
                            //    }
                            //})
                            .addTextColumn({
                            name: "komp_dec_txt",
                            caption: "Kompetence",
                            width: 200
                        })
                            .addTextColumn({
                            name: "verze_c",
                            caption: "Cen.",
                            align: "center",
                            width: 50
                        })
                            .addNumberColumn({
                            name: "verze_k",
                            caption: "Dec.",
                            align: "center",
                            width: 50
                        })
                            .addTextColumn({
                            name: "popis",
                            caption: "Popis",
                            width: 400
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Datum změny",
                            customClass: "dt-left",
                            width: 140,
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "Změnu provedl",
                            width: 400
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.BalancniVerze.list({}));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
            };
            GBarVerze = __decorate([
                gcontent
            ], GBarVerze);
            WebClient.GBarVerze = GBarVerze;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhclZlcnplLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dCYXJWZXJ6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQWlHZjtBQWpHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpR25CO0lBakdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpRzdCO1FBakdvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO2dCQUEzQzs7b0JBRUksVUFBSyxHQUFHLDBCQUEwQixDQUFDLENBQUMsbUVBQW1FO29CQUN2RyxXQUFNLEdBQUcsb0JBQW9CLENBQUMsQ0FBQywrQkFBK0I7b0JBR3RELFFBQUcsR0FBNEMsSUFBSSxDQUFDO2dCQXNGaEUsQ0FBQztnQkF0RitELENBQUM7Z0JBTzdELGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3ZCLHdCQUF3Qjt5QkFDdkIsUUFBUSxDQUFDLFFBQVEsQ0FBQzt5QkFDbEIsUUFBUSxFQUFFO3lCQUNWLEtBQUssQ0FBQzt3QkFDSCxVQUFVLEVBQUUsTUFBTTt3QkFFbEIsU0FBUyxFQUFFLFVBQVMsRUFBRSxFQUFFLEdBQUc7NEJBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDekMsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDOzRCQUN4QixDQUFDO3dCQUNMLENBQUM7d0JBRUQsYUFBYSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7d0JBQ2pELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOzRCQUNqQyxrQkFBa0I7NEJBQ2xCLHVCQUF1Qjs0QkFDdkIsd0JBQXdCOzRCQUN4QixzQkFBc0I7NEJBQ3RCLG1CQUFtQjs0QkFDbkIsa0VBQWtFOzRCQUNsRSxxQ0FBcUM7NEJBQ3JDLGtDQUFrQzs0QkFDbEMsbUpBQW1KOzRCQUNuSiwySUFBMkk7NEJBQzNJLDhJQUE4STs0QkFDOUksbUNBQW1DOzRCQUNuQyxXQUFXOzRCQUNYLE9BQU87NEJBQ1AsSUFBSTs2QkFDSCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLE9BQU8sRUFBRSxZQUFZOzRCQUNyQixLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsTUFBTTs0QkFDZixLQUFLLEVBQUUsUUFBUTs0QkFDZixLQUFLLEVBQUUsRUFBRTt5QkFDWixDQUFDOzZCQUNELGVBQWUsQ0FBQzs0QkFDYixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsTUFBTTs0QkFDZixLQUFLLEVBQUUsUUFBUTs0QkFDZixLQUFLLEVBQUUsRUFBRTt5QkFDWixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsT0FBTzs0QkFDYixPQUFPLEVBQUUsT0FBTzs0QkFDaEIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxpQkFBaUIsQ0FBQzs0QkFDZixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxTQUFTOzRCQUN0QixLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsZ0JBQWdCOzRCQUN0QixPQUFPLEVBQUUsZUFBZTs0QkFDeEIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQztxQkFDVCxDQUFDLENBQUM7b0JBRVAsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFHLENBQUMsQ0FBQyxDQUFDO29CQUV0RSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRS9DLENBQUM7YUFDSixDQUFBO1lBNUZZLFNBQVM7Z0JBRHJCLFFBQVE7ZUFDSSxTQUFTLENBNEZyQjtZQTVGWSxtQkFBUyxZQTRGckIsQ0FBQTtRQUNMLENBQUMsRUFqR29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlHN0I7SUFBRCxDQUFDLEVBakdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpR25CO0FBQUQsQ0FBQyxFQWpHUyxNQUFNLEtBQU4sTUFBTSxRQWlHZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQmFyLldlYkNsaWVudC5HQmFyVmVyemUuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQmFyVmVyemUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQmFyLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdCYXJWZXJ6ZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJQxZllaGxlZCBiYWxhbsSNbsOtY2ggdmVyesOtXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtUG96YWRhdmt1XCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbGJhcjogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhcnN2ZXJEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkJhci5JbnRlcmZhY2UuR0JhcnN2ZXJEdG8gfCBudWxsID0gbnVsbDs7XHJcblxyXG4gICAgICAgIC8vICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQmFyLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcbi8vICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5CYXIuV2ViQ2xpZW50LkdCYXJHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkJhci5JbnRlcmZhY2UuR0JhcnN2ZXJEdG8+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqdmVyemVfY1wiLCBcIip2ZXJ6ZV9rXCIsIFwiKnBvcGlzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhc2UgMzAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvbXBfZGVjX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb21wZXRlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVyemVfY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDZW4uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVyemVfa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZWMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSB6bcSbbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQmFsYW5jbmlWZXJ6ZS5saXN0KHsgfSkpO1xyXG5cclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=