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
            let GEditaceZapisu = class GEditaceZapisu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GEditaceZapisu#";
                    this.title = "jres:30250668"; //RC 30250668 : Oprava zápisu
                }
                onContentReady() {
                    this.init(this.inputValues);
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
                    // vytvoreni akce
                    this.createActions();
                    // prikazova lista
                    //this.commandBar([
                    //    { action: that.actions.actUlozit },
                    //    { action: that.actions.actZavrit, primary: true },
                    //]);
                    that.commandBar(this.actions.createBar(["actUlozit!", "actZavrit"]));
                    this.menuBar(this.actions.createBar(["actUlozit*", "actZavrit*" /*, "edit*", "fixEcdd*", "<detail*", "<print*"*/]));
                    //this.menuBar([
                    //    { action: that.actions.actUlozit, favorite: true }
                    //]);
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
                /**
                 * Vytvoreni akci
                 * */
                createActions() {
                    let that = this;
                    that.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionUlozit({ enabled: false, run: function () { this.setPending(that.save()); } }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                    });
                }
                /**
                 * Ulozeni radku
                 *
                 */
                save() {
                    let def = $.Deferred();
                    return def.resolve().promise();
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
            GEditaceZapisu = __decorate([
                Decorators.gcontent
            ], GEditaceZapisu);
            WebClient.GEditaceZapisu = GEditaceZapisu;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0VkaXRhY2VaYXBpc3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRWRpdGFjZVphcGlzdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNktmO0FBN0tELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZLbkI7SUE3S2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZLN0I7UUE3S29CLFdBQUEsU0FBUztZQVMxQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsT0FBQSxZQUFZO2dCQUFoRDs7b0JBQ0ksUUFBRyxHQUFHLGlCQUFpQixDQUFDO29CQU14QixVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsNkJBQTZCO2dCQTJKMUQsQ0FBQztnQkExSkcsY0FBYztvQkFFVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxjQUFjLENBQUMsT0FBOEI7b0JBRXpDLElBQUksQ0FBQyxPQUFPO3dCQUFFLE9BQU87b0JBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRSxJQUFJLENBQUMsT0FBOEI7b0JBRXRDLElBQUksQ0FBQyxPQUFPO3dCQUFFLE9BQU87b0JBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsK0JBQStCO29CQUUvQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztvQkFHM0IsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQix5Q0FBeUM7b0JBQ3pDLHdEQUF3RDtvQkFDeEQsS0FBSztvQkFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxD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LEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2S25CO0FBQUQsQ0FBQyxFQTdLUyxNQUFNLEtBQU4sTUFBTSxRQTZLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRWRpdGFjZVphcGlzdU9wdGlvbnMge1xyXG4gICAgICAgIGN1cnJlbnRSb3c6IGFueTtcclxuICAgICAgICBjb2xzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdO1xyXG4gICAgICAgIHZpZXdNb2RlOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0VkaXRhY2VaYXBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIHVpZCA9IFwiR0VkaXRhY2VaYXBpc3UjXCI7XHJcbiAgICAgICAgLy8gRWRpdG92YXRlbG55IGdyaWR1XHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0R3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vIHZzdHVwbmkgaG9kbm90eVxyXG4gICAgICAgIHByaXZhdGUgaW5wdXRWYWx1ZXM6IElFZGl0YWNlWmFwaXN1T3B0aW9ucztcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTA2NjhcIjsgLy9SQyAzMDI1MDY2OCA6IE9wcmF2YSB6w6FwaXN1XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5pbnB1dFZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbnM6IElFZGl0YWNlWmFwaXN1T3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmluaXQob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogSW5pY2lhbGl6YWNlIGZvcm11bGFyZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGluaXQob3B0aW9uczogSUVkaXRhY2VaYXBpc3VPcHRpb25zKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBwb2NhdGVjbmkgbmFzdGF2ZW5pIGF0cmlidXR1XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWVzID0gb3B0aW9uczsgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgYWtjZVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIC8vdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RVbG96aXQgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIHByaW1hcnk6IHRydWUgfSxcclxuICAgICAgICAgICAgLy9dKTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0VWxveml0IVwiLCBcImFjdFphdnJpdFwiXSkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RVbG96aXQqXCIsIFwiYWN0WmF2cml0KlwiLyosIFwiZWRpdCpcIiwgXCJmaXhFY2RkKlwiLCBcIjxkZXRhaWwqXCIsIFwiPHByaW50KlwiKi9dKSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgLy9dKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5teVBhbmVsID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTAwOTBcIiwgLy9SQyAzMDI1MDA5MCA6IERldGFpbCBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB3cnAkID0gJChcIjxkaXYgc3R5bGU9J2Rpc3BsYXk6IG5vbmUnPlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRldGFpbCA9ICQoXCI8ZGl2IHN0eWxlPSdkaXNwbGF5OiBub25lJz5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDA5M1wiLCAvL1JDIDMwMjUwMDkzIDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1c3RvbUNsYXNzID0gdGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSA/IFwiYm9sZFwiIDogXCJcIjtcclxuICAgICAgICAgICAgbGV0IGZvcm0kID0gJC5uZXdEaXYoXCJkZXRhaWwtaGVhZGVyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwic2V0dXBcIiwgdGhpcy5nZXRGb3JtT3B0aW9ucyh0aGlzLmlucHV0VmFsdWVzLnZpZXdNb2RlKSlcclxuICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBOZWx6ZSBwb3V6aXQgLSB6YXpuYW15IG5lbWFqaSBpeHBcclxuICAgICAgICAgICAgICAgIC8vLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiXCIpLmdwaWRiYXIoeyBwaWQ6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwianJlczozMDI1MDA5NFwiKSAvL1JDIDMwMjUwMDk0IDogRXZpZGVuxI1uw60gxI3DrXNsbyBkYcWIb3bDqWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5nc3RyaW5nYm94KHsgbmFtZTogXCJlY19kZFwiLCBkaXNhYmxlZDogdHJ1ZSwgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJqcmVzOjMwMjUwMDk1XCIpLmdzdHJpbmdib3goeyBuYW1lOiBcImRpY1wiLCBkaXNhYmxlZDogdHJ1ZSwgY3VzdG9tQ2xhc3M6IGN1c3RvbUNsYXNzIH0pIC8vUkMgMzAyNTAwOTUgOiBEScSMIGRvZGF2YXRlbGUgLyBvZGLEm3JhdGVsZVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY29tcGxldGVcIik7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5pbnB1dFZhbHVlcy52aWV3TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgJChmb3JtJCkuZ2Zvcm0oXCJ2aWV3TW9kZVwiLCBcInZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICB3cnAkLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTAwOTZcIiwgLy9SQyAzMDI1MDA5NiA6IERva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9ybSQuZGV0YWNoKCkuYXBwZW5kVG8od3JwJCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm9yaXQgZ3JpZFxyXG4gICAgICAgICAgICB0aGF0LmVkaXRHcmlkID0gJC5uZXdEaXYoXCJqcy11Y3JEZXRhaWxEUEhFdmlkXCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKGRldGFpbClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbi8vICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhZHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkxXCIsICAvL1JDIDMwMjUwMDkxIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaG9kbm90YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkyXCIsICAvL1JDIDMwMjUwMDkyIDogSG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2VyU2V0dGluZ3M6IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5pZCBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5maWxsVmFsdWVzKGZvcm0kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHsgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zYXZlKCkpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb3plbmkgcmFka3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNhdmUoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2V0Rm9ybU9wdGlvbnMobW9kZTogYm9vbGVhbik6IEdGb3JtT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIC8vaWYgKG1vZGU9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7IGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MyLCBMLTMtOS0wLCBNLTEyLTEyLTAsIFMtMTItMTItMCwgYnJlYWtzLTgwMC0xMTkwXCIsIG5hbWU6IFwiaGVhZEZvcm1cIiB9O1xyXG4gICAgICAgICAgICAvL2Vsc2UgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTktMCwgTS0zLTktMCwgUy0xMi0xMi0wLCBicmVha3MtMzAwLTUwMFwiLCBuYW1lOiBcImhlYWRGb3JtXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5cGxuZW5pIGRhdFxyXG4gICAgICAgICAqIEBwYXJhbSBmb3JtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWxsVmFsdWVzKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZWNfZGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy5pbnB1dFZhbHVlcy5jdXJyZW50Um93LmVjX2RkKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGljXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoaXMuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5kaWMpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55W109W107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnB1dFZhbHVlcy5jb2xzLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhID0geyBuYXpldjogdGhpcy5pbnB1dFZhbHVlcy5jb2xzW2ldLmtsaWNfdHh0LCBob2Rub3RhOiB0aGlzLmlucHV0VmFsdWVzLmN1cnJlbnRSb3dbXCJIX1wiK3RoaXMuaW5wdXRWYWx1ZXMuY29sc1tpXS5rbGljXSB9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRHcmlkLmdncmlkKFwic2V0RGF0YVwiLCBkYXRhKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59Il19