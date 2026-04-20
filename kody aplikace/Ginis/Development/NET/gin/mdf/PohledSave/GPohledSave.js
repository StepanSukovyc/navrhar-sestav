"use strict";
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
            let GPohledSave = class GPohledSave extends Gordic.GContentBase {
                onContentReady() {
                    this.title = "Uložit pohled";
                    this.init = true;
                    //form pro políčko Soukromý/Veřejný pohled
                    var formBuilder = new Gordic.Forms.Form("L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0");
                    formBuilder.addRow("Typ pohledu").addField("gselectbox", {
                        name: "ptm",
                        data: [{ text: "Soukromý pohled", tema: "mdf_ptm_soukr" }, { text: "Veřejný pohled", tema: "mdf_ptm_verejny" }],
                        itemTemplate: "{text}",
                        initialValue: { text: "Soukromý pohled", tema: "mdf_ptm_soukr" },
                        dropdown: true,
                        change: (a, v) => {
                            let tema = v.value.tema;
                            this.MakeForm(tema);
                        }
                    });
                    $("<div>").appendTo(this.element).gform("createFrom", formBuilder);
                    //zobrazim strom a pole pro nazev
                    this.MakeForm("mdf_ptm_soukr");
                    this.init = false;
                }
                MakeForm(tema) {
                    if (!!this.$tabUmisteni)
                        this.$tabUmisteni.remove();
                    if (!!this.$tabNazev)
                        this.$tabNazev.remove();
                    //debugger;
                    this.subcontent2 = this.createUmisteniContent.call(this, tema === "mdf_ptm_verejny", false);
                    //if (tema === "mdf_ptm_soukr")
                    //    this.subcontent2 = this.subcontentSoukrome;
                    //else
                    //    this.subcontent2 = this.subcontentVerejne;
                    //if (tema === "mdf_ptm_soukr")
                    //    this.subcontent2 = this.createContent([Gordic.Report.WebClient.GReportTreeControlTS, { controlParams: { Tema: "mdf_ptm_soukr", SelectReportOnly: true, ixsStr: this.ixsStrRootSoukromy, ShowJustOneReport: true } }]);
                    //else
                    //    this.subcontent2 = this.createContent([Gordic.Report.WebClient.GReportTreeControlTS, { controlParams: { Tema: "mdf_ptm_verejny", SelectReportOnly: true } }]); 
                    //this.subcontent2.element.on("reportselected.greports", (event, repInfo) => {
                    //    this.pohledDto.ixs_str = repInfo.node.ixsStr;
                    //})
                    //    .on("reportbeforedefaultaction.greports", (event, ri: IGPrintActionReportInfo) => {
                    //        event.preventDefault(); //timto lze prerusit provedeni akce v okne
                    //        //this.selectedReportId = ri.reportId; //info o sestave
                    //        //nactiPohled();
                    //    })
                    //    .on("reportgridformatcreated.greports", function (event, o) {
                    //        const gf = o?.gridFormat as Gordic.Data.GridFormat; // NOTE: Lze menit na primo na instanci
                    //        gf.columns.find((v) => { return v.name == "name"; })!.caption = "Umístění pohledu";
                    //    });
                    this.$tabUmisteni = this.subcontent2.element.appendTo(this.element)
                        .gtab({
                        title: "Umístění pohledu",
                        //opened: true,
                        //open: () => { subcontent3.activate(); }
                    });
                    //form pro políčko název
                    var formBuilder2 = new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-2-10-0, S-2-10-0");
                    formBuilder2.addRow("Název pohledu").addField("gstringbox", {
                        name: "nazev"
                    });
                    this.$tabNazev = $.newDiv().appendTo(this.element)
                        .gtab({
                        title: "Název pohledu",
                        opened: true,
                        //open: () => { subcontent3.activate(); }
                    });
                    this.$tabNazev.gform("createFrom", formBuilder2);
                    this.subcontent2.element.resize();
                    this.subcontent2.readyAwait.then(() => {
                        this.commandBar([{
                                action: new GAction({
                                    name: "closeAct",
                                    caption: "Zavřít",
                                    icon: "fa-times",
                                    run: () => {
                                        this.close();
                                        //this.call("NactiPohled", { reportId: this.selectedReportId });
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "saveAct",
                                    caption: "Uložit",
                                    icon: "gi-save",
                                    primary: true,
                                    run: () => {
                                        if (!this.pohledDto)
                                            this.pohledDto = {};
                                        this.pohledDto.nazev = this.findFields("nazev").gfield("getValue");
                                        this.pohledDto.tema = tema;
                                        this.call("UlozPohled", { dto: this.pohledDto }).then(() => { this.close(); });
                                    }
                                })
                            }]);
                    });
                }
            };
            GPohledSave = __decorate([
                gcontent
            ], GPohledSave);
            WebClient.GPohledSave = GPohledSave;
        })(WebClient = Mdf.WebClient || (Mdf.WebClient = {}));
    })(Mdf = Gordic.Mdf || (Gordic.Mdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaGxlZFNhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9obGVkU2F2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNkhmO0FBN0hELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZIbkI7SUE3SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZIN0I7UUE3SG9CLFdBQUEsU0FBUztZQUUxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxPQUFBLFlBQVk7Z0JBVXpDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVqQiwwQ0FBMEM7b0JBQzFDLElBQUksV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQztvQkFDbkYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNyRCxJQUFJLEVBQUUsS0FBSzt3QkFDWCxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7d0JBQy9HLFlBQVksRUFBRSxRQUFRO3dCQUN0QixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTt3QkFDaEUsUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFNLENBQUMsSUFBSSxD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Q0FBQztvQ0FDaEIsSUFBSSxFQUFFLFNBQVM7b0NBQ2YsT0FBTyxFQUFFLFFBQVE7b0NBQ2pCLElBQUksRUFBRSxTQUFTO29DQUNmLE9BQU8sRUFBRSxJQUFJO29DQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0NBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTOzRDQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO3dDQUV4QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO3dDQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBRW5GLENBQUM7aUNBQ0osQ0FBQzs2QkFDTCxDQUFpQixDQUFDLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7YUFDSixDQUFBO1lBdkhZLFdBQVc7Z0JBRHZCLFFBQVE7ZUFDSSxXQUFXLENBdUh2QjtZQXZIWSxxQkFBVyxjQXVIdkIsQ0FBQTtRQUNMLENBQUMsRUE3SG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZIN0I7SUFBRCxDQUFDLEVBN0hnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2SG5CO0FBQUQsQ0FBQyxFQTdIUyxNQUFNLEtBQU4sTUFBTSxRQTZIZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuTWRmLldlYkNsaWVudCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9obGVkU2F2ZSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7IFxyXG4gICAgICAgIHN1YmNvbnRlbnQyO1xyXG4gICAgICAgICR0YWJVbWlzdGVuaTogSlF1ZXJ5O1xyXG4gICAgICAgICR0YWJOYXpldjogSlF1ZXJ5O1xyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVVtaXN0ZW5pQ29udGVudDsgLy86ICh2ZXJlam5lOiBib29sZWFuKSA9PiBKUXVlcnlQcm9taXNlPEdDb250ZW50PElHQ29udGVudEJhc2UsIGFueT4gJiBPYmplY3RMaXRlcmFsPGFueT4+XHJcbiAgICAgICAgcHVibGljIHNlbGVjdGVkUmVwb3J0SWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaXhzU3RyUm9vdFNvdWtyb215OiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGl4c1N0clJvb3RWZXJlam55OiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIHBvaGxlZER0bzogTWRmLkludGVyZmFjZS5HUG9obGVkRHRvO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJVbG/Fvml0IHBvaGxlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JtIHBybyBwb2zDrcSNa28gU291a3JvbcO9L1ZlxZllam7DvSBwb2hsZWRcclxuICAgICAgICAgICAgdmFyIGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIpO1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlci5hZGRSb3coXCJUeXAgcG9obGVkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwdG1cIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IFt7IHRleHQ6IFwiU291a3JvbcO9IHBvaGxlZFwiLCB0ZW1hOiBcIm1kZl9wdG1fc291a3JcIiB9LCB7IHRleHQ6IFwiVmXFmWVqbsO9IHBvaGxlZFwiLCB0ZW1hOiBcIm1kZl9wdG1fdmVyZWpueVwiIH1dLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHRleHQ6IFwiU291a3JvbcO9IHBvaGxlZFwiLCB0ZW1hOiBcIm1kZl9wdG1fc291a3JcIiB9LFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IChhLCB2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbWEgPSB2LnZhbHVlIS50ZW1hOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYWtlRm9ybSh0ZW1hKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtQnVpbGRlcik7XHJcblxyXG4gICAgICAgICAgICAvL3pvYnJhemltIHN0cm9tIGEgcG9sZSBwcm8gbmF6ZXZcclxuICAgICAgICAgICAgdGhpcy5NYWtlRm9ybShcIm1kZl9wdG1fc291a3JcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTWFrZUZvcm0odGVtYTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghIXRoaXMuJHRhYlVtaXN0ZW5pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGFiVW1pc3RlbmkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGlmICghIXRoaXMuJHRhYk5hemV2KVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGFiTmF6ZXYucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnQyID0gdGhpcy5jcmVhdGVVbWlzdGVuaUNvbnRlbnQuY2FsbCh0aGlzLCB0ZW1hID09PSBcIm1kZl9wdG1fdmVyZWpueVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vaWYgKHRlbWEgPT09IFwibWRmX3B0bV9zb3VrclwiKVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnN1YmNvbnRlbnQyID0gdGhpcy5zdWJjb250ZW50U291a3JvbWU7XHJcbiAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnN1YmNvbnRlbnQyID0gdGhpcy5zdWJjb250ZW50VmVyZWpuZTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRlbWEgPT09IFwibWRmX3B0bV9zb3VrclwiKVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnN1YmNvbnRlbnQyID0gdGhpcy5jcmVhdGVDb250ZW50KFtHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUywgeyBjb250cm9sUGFyYW1zOiB7IFRlbWE6IFwibWRmX3B0bV9zb3VrclwiLCBTZWxlY3RSZXBvcnRPbmx5OiB0cnVlLCBpeHNTdHI6IHRoaXMuaXhzU3RyUm9vdFNvdWtyb215LCBTaG93SnVzdE9uZVJlcG9ydDogdHJ1ZSB9IH1dKTtcclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc3ViY29udGVudDIgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLCB7IGNvbnRyb2xQYXJhbXM6IHsgVGVtYTogXCJtZGZfcHRtX3ZlcmVqbnlcIiwgU2VsZWN0UmVwb3J0T25seTogdHJ1ZSB9IH1dKTsgXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc3ViY29udGVudDIuZWxlbWVudC5vbihcInJlcG9ydHNlbGVjdGVkLmdyZXBvcnRzXCIsIChldmVudCwgcmVwSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLnBvaGxlZER0by5peHNfc3RyID0gcmVwSW5mby5ub2RlLml4c1N0cjtcclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvLyAgICAub24oXCJyZXBvcnRiZWZvcmVkZWZhdWx0YWN0aW9uLmdyZXBvcnRzXCIsIChldmVudCwgcmk6IElHUHJpbnRBY3Rpb25SZXBvcnRJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL3RpbXRvIGx6ZSBwcmVydXNpdCBwcm92ZWRlbmkgYWtjZSB2IG9rbmVcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vdGhpcy5zZWxlY3RlZFJlcG9ydElkID0gcmkucmVwb3J0SWQ7IC8vaW5mbyBvIHNlc3RhdmVcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vbmFjdGlQb2hsZWQoKTtcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLm9uKFwicmVwb3J0Z3JpZGZvcm1hdGNyZWF0ZWQuZ3JlcG9ydHNcIiwgZnVuY3Rpb24gKGV2ZW50LCBvKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25zdCBnZiA9IG8/LmdyaWRGb3JtYXQgYXMgR29yZGljLkRhdGEuR3JpZEZvcm1hdDsgLy8gTk9URTogTHplIG1lbml0IG5hIHByaW1vIG5hIGluc3RhbmNpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBnZi5jb2x1bW5zLmZpbmQoKHYpID0+IHsgcmV0dXJuIHYubmFtZSA9PSBcIm5hbWVcIjsgfSkhLmNhcHRpb24gPSBcIlVtw61zdMSbbsOtIHBvaGxlZHVcIjtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiR0YWJVbWlzdGVuaSA9IHRoaXMuc3ViY29udGVudDIuZWxlbWVudC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVW3DrXN0xJtuw60gcG9obGVkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3BlbjogKCkgPT4geyBzdWJjb250ZW50My5hY3RpdmF0ZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9ybSBwcm8gcG9sw63EjWtvIG7DoXpldlxyXG4gICAgICAgICAgICB2YXIgZm9ybUJ1aWxkZXIyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTItMTAtMCwgTS0yLTEwLTAsIFMtMi0xMC0wXCIpO1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlcjIuYWRkUm93KFwiTsOhemV2IHBvaGxlZHVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRhYk5hemV2ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTsOhemV2IHBvaGxlZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vcGVuOiAoKSA9PiB7IHN1YmNvbnRlbnQzLmFjdGl2YXRlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiR0YWJOYXpldi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybUJ1aWxkZXIyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3ViY29udGVudDIuZWxlbWVudC5yZXNpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50Mi5yZWFkeUF3YWl0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFt7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbG9zZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2FsbChcIk5hY3RpUG9obGVkXCIsIHsgcmVwb3J0SWQ6IHRoaXMuc2VsZWN0ZWRSZXBvcnRJZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNhdmVBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvaGxlZER0bylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2hsZWREdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2hsZWREdG8ubmF6ZXYgPSB0aGlzLmZpbmRGaWVsZHMoXCJuYXpldlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaGxlZER0by50ZW1hID0gdGVtYTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiVWxvelBvaGxlZFwiLCB7IGR0bzogdGhpcy5wb2hsZWREdG8gfSkudGhlbigoKSA9PiB7IHRoaXMuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=