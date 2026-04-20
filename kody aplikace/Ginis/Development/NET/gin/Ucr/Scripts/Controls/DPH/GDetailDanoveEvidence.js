"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GDetailDanoveEvidence = class GDetailDanoveEvidence extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailDanoveEvidence#";
                    this.title = "jres:30250098"; //RC 30250098 : Detail daňové evidence
                }
                prepareContent(options) {
                    if (!options)
                        return;
                    this.init(options);
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init(options) {
                    if (!options)
                        return;
                    let that = this;
                    // pocatecni nastaveni atributu
                    this.inputValues = options;
                    //this.title = this.inputValues.currentRow.vykaz as any;        
                    // prikazova lista
                    that.commandBar([
                        {
                            id: "idclosedetail",
                            customClass: "g-button--primary",
                            action: new GAction({ name: "actClose", caption: "jres:30250068", run: function () { that.tryClose(); } }) //RC 30250068 : Zavřít
                        },
                    ]);
                    //that.myPanel = $("<div>")
                    //    .appendTo(this.element)
                    //    .gtab({
                    //        title: "jres:30250090", //RC 30250090 : Detail daňové evidence
                    //        opened: true, locked: true
                    //    });
                    let wrp$ = $("<div style='display: none'>").appendTo(this.element);
                    var detail = $("<div style='display: none'>")
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:30250093", //RC 30250093 : Detail
                        opened: true,
                    });
                    let customClass = this.inputValues.viewMode ? "bold" : "";
                    let form$ = $.newDiv("detail-header")
                        .appendTo(this.element)
                        .gform("setup", this.getFormOptions(this.inputValues.viewMode))
                        //#region Nelze pouzit - zaznamy nemaji ixp
                        //.gformsection("create", "")
                        //    .gformrow("addFieldsRow", "").gpidbar({ pid: "" })
                        //#endregion
                        .gformsection("create", "")
                        .gformrow("addFieldsRow", "jres:30250094") //RC 30250094 : Evidenční číslo daňového dokladu
                        .gstringbox({ name: "ec_dd", disabled: true, customClass: customClass })
                        .gformrow("addFieldsRow", "jres:30250095").gstringbox({ name: "dic", disabled: true, customClass: customClass }) //RC 30250095 : DIČ dodavatele / odběratele
                        .gform("complete");
                    //if (this.inputValues.viewMode) {
                    $(form$).gform("viewMode", "view");
                    wrp$.gtab({
                        title: "jres:30250096", //RC 30250096 : Doklad
                        opened: true,
                    });
                    form$.detach().appendTo(wrp$);
                    //}
                    // vytvorit grid
                    that.editGrid = $.newDiv("js-ucrDetailDPHEvid")
                        .css("height", "100%")
                        .appendTo(detail)
                        .ggrid({
                        columnMode: "fit",
                        multi: false,
                        //                    data: datadto,
                        marking: true,
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:30250091", //RC 30250091 : Název
                            width: 150
                        })
                            .addTextColumn({
                            name: "hodnota",
                            caption: "jres:30250092", //RC 30250092 : Hodnota
                            width: 150
                        }),
                        profileVisible: false,
                        //userSettings: that.inputValues.currentRow.id as string,
                        //                        searchColumns: ["popis"],
                    });
                    this.fillValues(form$);
                }
                getFormOptions(mode) {
                    //if (mode=== false)
                    //    return { layoutDescriptor: "L3M3S2, L-3-9-0, M-12-12-0, S-12-12-0, breaks-800-1190", name: "headForm" };
                    //else 
                    return { layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0, breaks-300-500", name: "headForm" };
                }
                /**
                 * Vyplneni dat
                 * @param form
                 */
                fillValues(form) {
                    form.findFields("ec_dd").gfield("setValue", this.inputValues.currentRow.ec_dd);
                    form.findFields("dic").gfield("setValue", this.inputValues.currentRow.dic);
                    var data = [];
                    for (var i = 0; i < this.inputValues.cols.length; i++) {
                        var a = { nazev: this.inputValues.cols[i].klic_txt, hodnota: this.inputValues.currentRow["H_" + this.inputValues.cols[i].klic] };
                        data.push(a);
                    }
                    debugger;
                    this.editGrid.ggrid("setData", data);
                }
            };
            GDetailDanoveEvidence = __decorate([
                Decorators.gcontent
            ], GDetailDanoveEvidence);
            WebClient.GDetailDanoveEvidence = GDetailDanoveEvidence;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERhbm92ZUV2aWRlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbERhbm92ZUV2aWRlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FvSmY7QUFwSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0puQjtJQXBKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb0o3QjtRQXBKb0IsV0FBQSxTQUFTO1lBUzFCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsT0FBQSxZQUFZO2dCQUF2RDs7b0JBQ0ksUUFBRyxHQUFHLHdCQUF3QixDQUFDO29CQU0vQixVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsc0NBQXNDO2dCQWtJbkUsQ0FBQztnQkFqSUcsY0FBYyxDQUFDLE9BQXFDO29CQUVoRCxJQUFJLENBQUMsT0FBTzt3QkFBRSxPQUFPO29CQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUNEOzs7cUJBR0s7Z0JBQ0UsSUFBSSxDQUFDLE9BQXFDO29CQUU3QyxJQUFJLENBQUMsT0FBTzt3QkFBRSxPQUFPO29CQUNyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLCtCQUErQjtvQkFFL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7b0JBRTNCLGdFQUFnRTtvQkFFaEUsa0JBQWtCO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUVaOzRCQUNJLEVBQUUsRUFBRSxlQUFlOzRCQUNuQixXQUFXLEVBQUUsbUJBQW1COzRCQUNoQyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFB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LENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV6QyxDQUFDO2FBSUosQ0FBQTtZQXpJWSxxQkFBcUI7Z0JBRGpDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AscUJBQXFCLENBeUlqQztZQXpJWSwrQkFBcUIsd0JBeUlqQyxDQUFBO1FBRUwsQ0FBQyxFQXBKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb0o3QjtJQUFELENBQUMsRUFwSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9KbkI7QUFBRCxDQUFDLEVBcEpTLE1BQU0sS0FBTixNQUFNLFFBb0pmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRGV0YWlEYW5vdmFFdmlkZW5jZU9wdGlvbnMge1xyXG4gICAgICAgIGN1cnJlbnRSb3c6IGFueTtcclxuICAgICAgICBjb2xzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdO1xyXG4gICAgICAgIHZpZXdNb2RlOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbERhbm92ZUV2aWRlbmNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICB1aWQgPSBcIkdEZXRhaWxEYW5vdmVFdmlkZW5jZSNcIjtcclxuICAgICAgICAvLyBFZGl0b3ZhdGVsbnkgZ3JpZHVcclxuICAgICAgICBwcml2YXRlIGVkaXRHcmlkOiBKUXVlcnk7XHJcbiAgICAgICAgLy8gdnN0dXBuaSBob2Rub3R5XHJcbiAgICAgICAgcHJpdmF0ZSBpbnB1dFZhbHVlczogSUdEZXRhaURhbm92YUV2aWRlbmNlT3B0aW9ucztcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAwOThcIjsgLy9SQyAzMDI1MDA5OCA6IERldGFpbCBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElHRGV0YWlEYW5vdmFFdmlkZW5jZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5pbml0KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IElHRGV0YWlEYW5vdmFFdmlkZW5jZU9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucykgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHBvY2F0ZWNuaSBuYXN0YXZlbmkgYXRyaWJ1dHVcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZXMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnRpdGxlID0gdGhpcy5pbnB1dFZhbHVlcy5jdXJyZW50Um93LnZ5a2F6IGFzIGFueTsgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImlkY2xvc2VkZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdENsb3NlXCIsIGNhcHRpb246IFwianJlczozMDI1MDA2OFwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pIC8vUkMgMzAyNTAwNjggOiBaYXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQubXlQYW5lbCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDkwXCIsIC8vUkMgMzAyNTAwOTAgOiBEZXRhaWwgZGHFiG92w6kgZXZpZGVuY2VcclxuICAgICAgICAgICAgLy8gICAgICAgIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgd3JwJCA9ICQoXCI8ZGl2IHN0eWxlPSdkaXNwbGF5OiBub25lJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXRhaWwgPSAkKFwiPGRpdiBzdHlsZT0nZGlzcGxheTogbm9uZSc+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTAwOTNcIiwgLy9SQyAzMDI1MDA5MyA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXN0b21DbGFzcyA9IHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUgPyBcImJvbGRcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBmb3JtJCA9ICQubmV3RGl2KFwiZGV0YWlsLWhlYWRlclwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcInNldHVwXCIsIHRoaXMuZ2V0Rm9ybU9wdGlvbnModGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSkpXHJcbiAgICAgICAgICAgICAgICAvLyNyZWdpb24gTmVsemUgcG91eml0IC0gemF6bmFteSBuZW1hamkgaXhwXHJcbiAgICAgICAgICAgICAgICAvLy5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5ncGlkYmFyKHsgcGlkOiBcIlwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgICAgIC5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcImpyZXM6MzAyNTAwOTRcIikgLy9SQyAzMDI1MDA5NCA6IEV2aWRlbsSNbsOtIMSNw61zbG8gZGHFiG92w6lobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuZ3N0cmluZ2JveCh7IG5hbWU6IFwiZWNfZGRcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMDI1MDA5NVwiKS5nc3RyaW5nYm94KHsgbmFtZTogXCJkaWNcIiwgZGlzYWJsZWQ6IHRydWUsIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyB9KSAvL1JDIDMwMjUwMDk1IDogREnEjCBkb2RhdmF0ZWxlIC8gb2RixJtyYXRlbGVcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNvbXBsZXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuaW5wdXRWYWx1ZXMudmlld01vZGUpIHtcclxuICAgICAgICAgICAgICAgICQoZm9ybSQpLmdmb3JtKFwidmlld01vZGVcIiwgXCJ2aWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgd3JwJC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDk2XCIsIC8vUkMgMzAyNTAwOTYgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcm0kLmRldGFjaCgpLmFwcGVuZFRvKHdycCQpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcml0IGdyaWRcclxuICAgICAgICAgICAgdGhhdC5lZGl0R3JpZCA9ICQubmV3RGl2KFwianMtdWNyRGV0YWlsRFBIRXZpZFwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhkZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YWR0byxcclxuICAgICAgICAgICAgICAgICAgICBtYXJraW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5MVwiLCAgLy9SQyAzMDI1MDA5MSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhvZG5vdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5MlwiLCAgLy9SQyAzMDI1MDA5MiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlclNldHRpbmdzOiB0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cuaWQgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wicG9waXNcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFZhbHVlcyhmb3JtJCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Rm9ybU9wdGlvbnMobW9kZTogYm9vbGVhbik6IEdGb3JtT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIC8vaWYgKG1vZGU9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7IGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MyLCBMLTMtOS0wLCBNLTEyLTEyLTAsIFMtMTItMTItMCwgYnJlYWtzLTgwMC0xMTkwXCIsIG5hbWU6IFwiaGVhZEZvcm1cIiB9O1xyXG4gICAgICAgICAgICAvL2Vsc2UgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTktMCwgTS0zLTktMCwgUy0xMi0xMi0wLCBicmVha3MtMzAwLTUwMFwiLCBuYW1lOiBcImhlYWRGb3JtXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5cGxuZW5pIGRhdFxyXG4gICAgICAgICAqIEBwYXJhbSBmb3JtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWxsVmFsdWVzKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZWNfZGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5pbnB1dFZhbHVlcy5jdXJyZW50Um93LmVjX2RkKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGljXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5kaWMpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55W109W107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlcy5jb2xzLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhID0geyBuYXpldjogdGhpcy5pbnB1dFZhbHVlcy5jb2xzW2ldLmtsaWNfdHh0LCBob2Rub3RhOiB0aGlzLmlucHV0VmFsdWVzLmN1cnJlbnRSb3dbXCJIX1wiK3RoaXMuaW5wdXRWYWx1ZXMuY29sc1tpXS5rbGljXSB9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRHcmlkLmdncmlkKFwic2V0RGF0YVwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59Il19