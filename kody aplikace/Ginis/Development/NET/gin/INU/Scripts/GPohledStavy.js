"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GPohledObdobi.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
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
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GPohledStavy = class GPohledStavy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Historie přepočtu stavů";
                }
                // private globals = Gordic.Inu.Globals.GAdaGlobals;
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    this.title = "Historie přepočtu stavů";
                    this.title = "Historie přepočtu stavů";
                    console.log("Data přepočtu UCT", this.modeluct);
                    console.log("Data přepočtu ROZ", this.modelroz);
                    $tab.empty();
                    var cnt = this;
                    //var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    var actEdit = new GAction({
                        name: "dblclick",
                        run: function (ev, ctx) {
                            GDlg.alert("Dvojklik");
                            // ctx.cellInfo.data
                        }
                    });
                    var $mainTable = $("<div>")
                        .css("height", "50%")
                        .appendTo(this.element)
                        //.gautofit()
                        .gtab({
                        title: "Měsíční období účetnictví", opened: true, locked: false,
                    })
                        .ggrid({
                        columnMode: "fit",
                        sort: "!dat_zmena",
                        searchColumns: ["ucs"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "lic",
                            caption: "Lic",
                            width: 10
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: "UCS",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "mesic",
                            caption: "Měsíc",
                            width: 10
                        })
                            .addTextColumn({
                            name: "nazev_ref",
                            caption: "Provedl",
                            width: 40
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Provedeno",
                            width: 15
                        })
                    });
                    var $mainTable2 = $("<div>")
                        //.css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        .gtab({
                        title: "Měsíční období rozpočtu", opened: true, locked: false,
                    })
                        .ggrid({
                        columnMode: "fit",
                        sort: "!dat_zmena",
                        searchColumns: ["ucs"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "lic",
                            caption: "Lic",
                            width: 10
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: "UCS",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 10
                        })
                            .addNumberColumn({
                            name: "mesic",
                            caption: "Měsíc",
                            width: 10
                        })
                            .addTextColumn({
                            name: "nazev_ref",
                            caption: "Provedl",
                            width: 40
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Provedeno",
                            width: 15
                        })
                    });
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("rok"), { defaultState: "open" });
                    var view = new Gordic.Data.View(this.modeluct, { key: "mesic", processors: { tree: treeProcessor } });
                    $mainTable.ggrid("setData", view, true);
                    var view = new Gordic.Data.View(this.modelroz);
                    $mainTable2.ggrid("setData", view, true);
                }
            };
            GPohledStavy = __decorate([
                gcontent
            ], GPohledStavy);
            WebClient.GPohledStavy = GPohledStavy;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZFN0YXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BvaGxlZFN0YXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBNklmO0FBN0lELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZJbkI7SUE3SWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZJN0I7UUE3SW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxPQUFBLFlBQVk7Z0JBQTlDOztvQkFFSSxVQUFLLEdBQUcseUJBQXlCLENBQUM7Z0JBc0l0QyxDQUFDO2dCQS9IRyxvREFBb0Q7Z0JBRXBELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO29CQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO29CQUV2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWhELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWhCLG9JQUFvSTtvQkFFbkksSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUM7d0JBQ3RCLElBQUksRUFBRSxVQUFVO3dCQUNoQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FB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QkFDZixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7cUJBQ1QsQ0FBQyxDQUFDO29CQUdQLElBQUksYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBRXpFLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDdEcsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDL0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUU3QyxDQUFDO2FBRUosQ0FBQTtZQXhJWSxZQUFZO2dCQUR4QixRQUFRO2VBQ0ksWUFBWSxDQXdJeEI7WUF4SVksc0JBQVksZUF3SXhCLENBQUE7UUFDTCxDQUFDLEVBN0lvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2STdCO0lBQUQsQ0FBQyxFQTdJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNkluQjtBQUFELENBQUMsRUE3SVMsTUFBTSxLQUFOLE1BQU0sUUE2SWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR1BvaGxlZE9iZG9iaS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9obGVkU3RhdnkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiSGlzdG9yaWUgcMWZZXBvxI10dSBzdGF2xa9cIjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsdWN0OiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvbHN0dkR0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbHJvejogR29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2xzdHZEdG9bXTtcclxuICAgICAgICBwcm90ZWN0ZWQgdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgb2JkRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkhpc3RvcmllIHDFmWVwb8SNdHUgc3RhdsWvXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkhpc3RvcmllIHDFmWVwb8SNdHUgc3RhdsWvXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGEgcMWZZXBvxI10dSBVQ1RcIiwgdGhpcy5tb2RlbHVjdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwxZllcG/EjXR1IFJPWlwiLCB0aGlzLm1vZGVscm96KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAvL3ZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN0eC5jZWxsSW5mby5kYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCI1MCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAvLy5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTcSbc8OtxI1uw60gb2Jkb2LDrSDDusSNZXRuaWN0dsOtXCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCIhZGF0X3ptZW5hXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInVjc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVDU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3Em3PDrWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3ZlZGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlMiA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTcSbc8OtxI1uw60gb2Jkb2LDrSByb3pwb8SNdHVcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1widWNzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVUNTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTcSbc8OtY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdmVkZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0cmVlUHJvY2Vzc29yID0gbmV3IEdvcmRpYy5EYXRhLlRyZWU8R29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2xzdHZEdG9bXT4oXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwicm9rXCIpLCB7IGRlZmF1bHRTdGF0ZTogXCJvcGVuXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMubW9kZWx1Y3QsIHsga2V5OiBcIm1lc2ljXCIsIHByb2Nlc3NvcnM6IHsgdHJlZTogdHJlZVByb2Nlc3NvciB9IH0pO1xyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLm1vZGVscm96KTtcclxuICAgICAgICAgICAgJG1haW5UYWJsZTIuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcsIHRydWUpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSAgICBcclxufSJdfQ==