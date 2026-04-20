"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GObdobiMesice.js                                                        </Name>
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
            let GKontrolaObdobi = class GKontrolaObdobi extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                    this.closeSave = false;
                    this.taskId = "GKontrolaObdobiID";
                    this.uid = "GKontrolaObdobiIDU#";
                }
                onContentReady() {
                    var that = this;
                    this.uid = "GKontrolaObdobiIDU#";
                    this.title = "jres:30250403".format(this.MesicTxt); //RC 30250403 : {0} - stav období
                    that.createAction();
                    that.commandBar([
                        {
                            action: that.actions.actUlozit, favorite: true, primary: true,
                        },
                        {
                            action: that.actions.actZavrit, favorite: true
                        },
                    ]);
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar([
                        "actUctovani*", "actKontrola*", "actZkontrolovano*", "actUlozit*", "actZavrit*"
                    ]));
                    // definicie gridu
                    this.grid = $.newDiv("js-myGridKO")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "fit",
                        columns: that.createCols()
                    });
                    //that.DataView = new Gordic.Data.View(that.MesiceData, { key: "id", processors: { provider: provider, treeProcessor: treeProcessor } });
                    //that.DataView = new Gordic.Data.View(that.Data, { key: "ico,ucs,uus" });
                    let keys = { key: "ico,ucs" };
                    if (this.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek == 20 /* Interface.GEUrovenKontrolyMesice.UUS */)
                        keys = { key: "ico,ucs,uus" };
                    else if (this.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek == 30 /* Interface.GEUrovenKontrolyMesice.NKS */)
                        keys = { key: "ico,ucs,nks" };
                    that.DataView = new Gordic.Data.View(that.Data, keys);
                    this.grid.ggrid("setData", that.DataView);
                    that.RefreshAction();
                }
                /**
                 * Aktualizace radku
                 * @param radek
                 */
                setUpdateRow(radek) {
                    var that = this;
                    let view = that.grid.ggrid("getView");
                    view.updateData(radek, "update");
                }
                /**
                 *  Test zmeny dat
                 * */
                testChanged() {
                    var that = this;
                    let view = that.grid.ggrid("getView");
                    var data = view.getDataRows();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].stav_kon != data[i].stav_kon_puv)
                            return true;
                    }
                    return false;
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    //Gordic.Eko.Grid.Column.ad
                    gridFormat.addTextColumn({ name: "ucs", caption: Gordic.Consts.DbShortcuts.ucs, width: 80 });
                    if (this.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek == 20 /* Interface.GEUrovenKontrolyMesice.UUS */)
                        gridFormat.addTextColumn({ name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 80 });
                    else if (this.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek == 30 /* Interface.GEUrovenKontrolyMesice.NKS */)
                        gridFormat.addTextColumn({ name: "nks", caption: Gordic.Consts.DbShortcuts.nks, width: 80 });
                    gridFormat.addTextColumn({ name: "nazev", caption: "jres:30250404", width: 130 }); //RC 30250404 : Název
                    gridFormat.addNumberColumn({
                        name: "stav_kon", caption: "jres:30250405", width: 100, align: "left", cellTemplate: (row) => {
                            var stav = row.stav_kon;
                            var text = "";
                            if (stav == 0 || stav == 10) {
                                text = "jres:30250408"; //RC 30250408 : účtování
                            }
                            else if (stav == 20) {
                                text = "jres:30250411"; //RC 30250411 : kontrola
                            }
                            else if (stav == 30) {
                                text = "jres:30250410"; //RC 30250410 : zkontrolováno
                            }
                            else {
                                text = "jres:30250409"; //RC 30250409 : účtování
                            }
                            return text;
                        }
                    }); //RC 30250405 : Stav období
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "jres:30250406", width: 100 }); //RC 30250406 : Datum změny
                    gridFormat.addTextColumn({ name: "zmenu_prov", caption: "jres:30250407", width: 100 }); //RC 30250407 : Změnu provedl
                    return gridFormat;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createAction() {
                    var that = this;
                    this.actions.addRange({
                        actKontrola: {
                            caption: "jres:30250412", captionVisible: "normal", enabled: false, //RC 30250412 : Kontrola
                            run: function () {
                                var radek = that.getCurrentRow();
                                if (radek != null) {
                                    radek.stav_kon = 20;
                                    that.setUpdateRow(radek);
                                    that.RefreshAction();
                                }
                            }
                        },
                        actUctovani: {
                            caption: "jres:30250413", captionVisible: "normal", enabled: false, //RC 30250413 : Účtování
                            run: function () {
                                var radek = that.getCurrentRow();
                                if (radek != null) {
                                    radek.stav_kon = 10;
                                    that.setUpdateRow(radek);
                                    that.RefreshAction();
                                }
                            }
                        },
                        actZkontrolovano: {
                            caption: "jres:30250414", captionVisible: "normal", enabled: false, //RC 30250414 : Zkontrolováno
                            run: function () {
                                var radek = that.getCurrentRow();
                                if (radek != null) {
                                    radek.stav_kon = 30;
                                    that.setUpdateRow(radek);
                                    that.RefreshAction();
                                }
                            }
                        },
                        actUlozit: Gordic.Eko.Action.actionUlozit({
                            name: "actUlozit",
                            visible: true, run: function () {
                                this.setPending(that.save());
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: () => {
                                {
                                    that.tryClose();
                                }
                            }
                        }),
                    });
                }
                /**
                 * Ulozeni zmen
                 */
                save() {
                    const that = this;
                    let view = that.grid.ggrid("getView");
                    return Gordic.Isl.InuObdobi.ulozeniStavuRucniKontroly({ seznamRucnichKontrol: view.getDataRows(), lokalita: that.Lokalita, mesic: that.Mesic })
                        .get()
                        .then(() => {
                        that.showFlash("jres:30250415", "success", "msgFlash"); //RC 30250415 : Kontrola byla uložena
                        that.closeSave = true;
                        that.tryClose();
                    });
                }
                /**
                 *  Znovunacteni dat
                 */
                Reload() {
                }
                /**
                 * Aktialni radek
                 *
                 * */
                getCurrentRow() {
                    let selectedRows = this.grid.ggrid("getSelection");
                    let currentRow = null;
                    if (selectedRows.length > 0)
                        currentRow = selectedRows[0];
                    return currentRow;
                }
                /**
                 * Aktualizace pristupnosti akci
                 *
                 * */
                RefreshAction() {
                    let that = this;
                    //let view = this.grid.ggrid<Gordic.Inu.Interface.GInuKontrolaObdobiDto>("getView");
                    //var data = view.getDataRows();
                    //var noData = view.getCount() == 0;
                    //let selectedRows = this.grid.ggrid<Gordic.Inu.Interface.GInuKontrolaObdobiDto>("getSelection",);
                    let currentRow = that.getCurrentRow();
                    let noData = currentRow == null || that.StavObdobi == 500;
                    that.actions.actUctovani?.update({ enabled: !noData && that.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek !== 0 /* Inu.Interface.GEUrovenKontrolyMesice.BezKontroly */ && [20, 30].indexOf(currentRow.stav_kon) !== -1 });
                    that.actions.actKontrola?.update({ enabled: !noData && that.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek !== 0 /* Inu.Interface.GEUrovenKontrolyMesice.BezKontroly */ && [0, 10, 30].indexOf(currentRow.stav_kon) !== -1 });
                    that.actions.actZkontrolovano?.update({ enabled: !noData && that.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek !== 0 /* Inu.Interface.GEUrovenKontrolyMesice.BezKontroly */ && [20].indexOf(currentRow.stav_kon) !== -1 });
                    that.actions.actUlozit?.update({ enabled: !noData && (that.testChanged()) && that.globals.Globalni_Parametry.UrovenKontrolyMesicnichUzaverek !== 0 /* Inu.Interface.GEUrovenKontrolyMesice.BezKontroly */ });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    const that = this;
                    if (!that.closeSave && this.testChanged()) {
                        return Gordic.Eko.Detail.messageBoxUnsavedData(this)
                            .createDialogPromise([GDlg.mbbYes.id, GDlg.mbbNo.id])
                            .then(function (retVal) {
                            if (retVal === GDlg.mbbYes.id) {
                                return that.save();
                            }
                            else {
                                return $.Deferred().resolve().promise();
                            }
                        });
                    }
                    that.closeSave = true;
                    return $.Deferred().resolve().promise();
                }
            };
            GKontrolaObdobi = __decorate([
                gcontent
            ], GKontrolaObdobi);
            WebClient.GKontrolaObdobi = GKontrolaObdobi;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0tvbnRyb2xhT2Jkb2JpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0tvbnRyb2xhT2Jkb2JpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBeVJmO0FBelJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlSbkI7SUF6UmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXlSN0I7UUF6Um9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQUFqRDs7b0JBU1ksWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFHekMsY0FBUyxHQUFFLEtBQUssQ0FBRTtvQkFPMUIsV0FBTSxHQUFHLG1CQUFtQixDQUFDO29CQUM3QixRQUFHLEdBQUcscUJBQXFCLENBQUM7Z0JBZ1FoQyxDQUFDO2dCQTlQRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztvQkFFckYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNaOzRCQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxJQUFJO3lCQUMvRDt3QkFDRDs0QkFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUk7eUJBQ2pEO3FCQUVK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QkFvUjNCLENBQUE7UUFDTCxDQUFDLEVBelJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5UjdCO0lBQUQsQ0FBQyxFQXpSZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeVJuQjtBQUFELENBQUMsRUF6UlMsTUFBTSxLQUFOLE1BQU0sUUF5UmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR09iZG9iaU1lc2ljZS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHS29udHJvbGFPYmRvYmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBNZXNpYzogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBNZXNpY1R4dDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBMb2thbGl0YTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBTdGF2T2Jkb2JpOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG4gICAgICAgIHByb3RlY3RlZCBEYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51S29udHJvbGFPYmRvYmlEdG9bXTtcclxuICAgICAgICBwcml2YXRlIERhdGFWaWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgY2xvc2VTYXZlID1mYWxzZSA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICByZWFkb25seSBHbG9iYWxQYXJhbXM6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVHbG9iYWxEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHRhc2tJZCA9IFwiR0tvbnRyb2xhT2Jkb2JpSURcIjtcclxuICAgICAgICB1aWQgPSBcIkdLb250cm9sYU9iZG9iaUlEVSNcIjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy51aWQgPSBcIkdLb250cm9sYU9iZG9iaUlEVSNcIjtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMDI1MDQwM1wiLmZvcm1hdCh0aGlzLk1lc2ljVHh0KTsgLy9SQyAzMDI1MDQwMyA6IHswfSAtIHN0YXYgb2Jkb2LDrVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VWxveml0LCBmYXZvcml0ZTogdHJ1ZSwgcHJpbWFyeTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoWyBcclxuICAgICAgICAgICAgICAgIFwiYWN0VWN0b3ZhbmkqXCIsIFwiYWN0S29udHJvbGEqXCIsIFwiYWN0WmtvbnRyb2xvdmFubypcIiwgXCJhY3RVbG96aXQqXCIsIFwiYWN0WmF2cml0KlwiXHJcbiAgICAgICAgICAgIF0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkLm5ld0RpdihcImpzLW15R3JpZEtPXCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAvLy5ndGFiKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRpdGxlOiBcIlJPWlwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmNyZWF0ZUNvbHMoKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5EYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuTWVzaWNlRGF0YSwgeyBrZXk6IFwiaWRcIiwgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIsIHRyZWVQcm9jZXNzb3I6IHRyZWVQcm9jZXNzb3IgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5EYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuRGF0YSwgeyBrZXk6IFwiaWNvLHVjcyx1dXNcIiB9KTtcclxuICAgICAgICAgICAgbGV0IGtleXMgPSB7IGtleTogXCJpY28sdWNzXCIgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuVXJvdmVuS29udHJvbHlNZXNpY25pY2hVemF2ZXJlayA9PSBJbnRlcmZhY2UuR0VVcm92ZW5Lb250cm9seU1lc2ljZS5VVVMpXHJcbiAgICAgICAgICAgICAgICBrZXlzID0geyBrZXk6IFwiaWNvLHVjcyx1dXNcIiB9O1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlVyb3ZlbktvbnRyb2x5TWVzaWNuaWNoVXphdmVyZWsgPT0gSW50ZXJmYWNlLkdFVXJvdmVuS29udHJvbHlNZXNpY2UuTktTKVxyXG4gICAgICAgICAgICAgICAga2V5cyA9IHsga2V5OiBcImljbyx1Y3MsbmtzXCIgfTtcclxuICAgICAgICAgICAgdGhhdC5EYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuRGF0YSwga2V5cyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5EYXRhVmlldyk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhhdC5SZWZyZXNoQWN0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gcmFkZWtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldFVwZGF0ZVJvdyhyYWRlazogR29yZGljLkludS5JbnRlcmZhY2UuR0ludUtvbnRyb2xhT2Jkb2JpRHRvKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkludS5JbnRlcmZhY2UuR0ludUtvbnRyb2xhT2Jkb2JpRHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShyYWRlaywgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVGVzdCB6bWVueSBkYXRcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdGVzdENoYW5nZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkludS5JbnRlcmZhY2UuR0ludUtvbnRyb2xhT2Jkb2JpRHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdmlldy5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnN0YXZfa29uICE9IGRhdGFbaV0uc3Rhdl9rb25fcHV2KSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51S29udHJvbGFPYmRvYmlEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51S29udHJvbGFPYmRvYmlEdG8+KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInVjc1wiLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcywgd2lkdGg6IDgwIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuVXJvdmVuS29udHJvbHlNZXNpY25pY2hVemF2ZXJlayA9PSBJbnRlcmZhY2UuR0VVcm92ZW5Lb250cm9seU1lc2ljZS5VVVMpXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInV1c1wiLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cywgd2lkdGg6IDgwIH0pO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlVyb3ZlbktvbnRyb2x5TWVzaWNuaWNoVXphdmVyZWsgPT0gSW50ZXJmYWNlLkdFVXJvdmVuS29udHJvbHlNZXNpY2UuTktTKVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJua3NcIiwgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsIHdpZHRoOiA4MCB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA0XCIsIHdpZHRoOiAxMzAgfSk7IC8vUkMgMzAyNTA0MDQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2tvblwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MDVcIiwgd2lkdGg6IDEwMCwgYWxpZ246XCJsZWZ0XCIsICBjZWxsVGVtcGxhdGU6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdiA9IHJvdy5zdGF2X2tvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXYgPT0gMCB8fCBzdGF2ID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzAyNTA0MDhcIjsgLy9SQyAzMDI1MDQwOCA6IMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF2ID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzAyNTA0MTFcIjsgLy9SQyAzMDI1MDQxMSA6IGtvbnRyb2xhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXYgPT0gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwianJlczozMDI1MDQxMFwiOyAvL1JDIDMwMjUwNDEwIDogemtvbnRyb2xvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzAyNTA0MDlcIjsgLy9SQyAzMDI1MDQwOSA6IMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IC8vUkMgMzAyNTA0MDUgOiBTdGF2IG9iZG9iw61cclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MDZcIiwgd2lkdGg6IDEwMCB9KTsgLy9SQyAzMDI1MDQwNiA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInptZW51X3Byb3ZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA3XCIsIHdpZHRoOiAxMDB9KTsgLy9SQyAzMDI1MDQwNyA6IFptxJtudSBwcm92ZWRsXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQxMlwiLCBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIiwgZW5hYmxlZDogZmFsc2UsLy9SQyAzMDI1MDQxMiA6IEtvbnRyb2xhXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuZ2V0Q3VycmVudFJvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuc3Rhdl9rb24gPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VXBkYXRlUm93KHJhZGVrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVmcmVzaEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQxM1wiLCBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIiwgZW5hYmxlZDogZmFsc2UsLy9SQyAzMDI1MDQxMyA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gdGhhdC5nZXRDdXJyZW50Um93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5zdGF2X2tvbiA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRVcGRhdGVSb3cocmFkZWspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SZWZyZXNoQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WmtvbnRyb2xvdmFubzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQxNFwiLCBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIiwgZW5hYmxlZDogZmFsc2UsLy9SQyAzMDI1MDQxNCA6IFprb250cm9sb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuZ2V0Q3VycmVudFJvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsuc3Rhdl9rb24gPSAzMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VXBkYXRlUm93KHJhZGVrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVmcmVzaEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFVsb3ppdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5zYXZlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGF0LnRyeUNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG96ZW5pIHptZW5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNhdmUoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkludS5JbnRlcmZhY2UuR0ludUtvbnRyb2xhT2Jkb2JpRHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludU9iZG9iaS51bG96ZW5pU3RhdnVSdWNuaUtvbnRyb2x5KHsgc2V6bmFtUnVjbmljaEtvbnRyb2w6IHZpZXcuZ2V0RGF0YVJvd3MoKSwgbG9rYWxpdGE6IHRoYXQuTG9rYWxpdGEsIG1lc2ljOiB0aGF0Lk1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTA0MTVcIiwgXCJzdWNjZXNzXCIsIFwibXNnRmxhc2hcIik7IC8vUkMgMzAyNTA0MTUgOiBLb250cm9sYSBieWxhIHVsb8W+ZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZVNhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmVsb2FkKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3RpYWxuaSByYWRla1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDdXJyZW50Um93KCk6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVLb250cm9sYU9iZG9iaUR0b3xudWxsIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93cyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51S29udHJvbGFPYmRvYmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludUtvbnRyb2xhT2Jkb2JpRHRvIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFJvd3MubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93ID0gc2VsZWN0ZWRSb3dzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFJvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZWZyZXNoQWN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVLb250cm9sYU9iZG9iaUR0bz4oXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAvL3ZhciBkYXRhID0gdmlldy5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICAvL3ZhciBub0RhdGEgPSB2aWV3LmdldENvdW50KCkgPT0gMDtcclxuICAgICAgICAgICAgLy9sZXQgc2VsZWN0ZWRSb3dzID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVLb250cm9sYU9iZG9iaUR0bz4oXCJnZXRTZWxlY3Rpb25cIiwpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3cgPSB0aGF0LmdldEN1cnJlbnRSb3coKTtcclxuICAgICAgICAgICAgbGV0IG5vRGF0YSA9IGN1cnJlbnRSb3cgPT0gbnVsbCB8fCB0aGF0LlN0YXZPYmRvYmkgPT0gNTAwO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVY3RvdmFuaT8udXBkYXRlKHsgZW5hYmxlZDogIW5vRGF0YSAmJiB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlVyb3ZlbktvbnRyb2x5TWVzaWNuaWNoVXphdmVyZWsgIT09IEludS5JbnRlcmZhY2UuR0VVcm92ZW5Lb250cm9seU1lc2ljZS5CZXpLb250cm9seSAmJiBbMjAsIDMwXS5pbmRleE9mKGN1cnJlbnRSb3chLnN0YXZfa29uIGFzIG51bWJlcikgIT09IC0xIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGE/LnVwZGF0ZSh7IGVuYWJsZWQ6ICFub0RhdGEgJiYgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Vcm92ZW5Lb250cm9seU1lc2ljbmljaFV6YXZlcmVrICE9PSBJbnUuSW50ZXJmYWNlLkdFVXJvdmVuS29udHJvbHlNZXNpY2UuQmV6S29udHJvbHkgJiYgWzAsIDEwLCAzMF0uaW5kZXhPZihjdXJyZW50Um93IS5zdGF2X2tvbiBhcyBudW1iZXIpICE9PSAtMSB9KTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFprb250cm9sb3Zhbm8/LnVwZGF0ZSh7IGVuYWJsZWQ6ICFub0RhdGEgJiYgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Vcm92ZW5Lb250cm9seU1lc2ljbmljaFV6YXZlcmVrICE9PSBJbnUuSW50ZXJmYWNlLkdFVXJvdmVuS29udHJvbHlNZXNpY2UuQmV6S29udHJvbHkgJiYgWzIwXS5pbmRleE9mKGN1cnJlbnRSb3chLnN0YXZfa29uIGFzIG51bWJlcikgIT09IC0xIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFVsb3ppdD8udXBkYXRlKHsgZW5hYmxlZDogIW5vRGF0YSAmJiAodGhhdC50ZXN0Q2hhbmdlZCgpKSAgJiYgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Vcm92ZW5Lb250cm9seU1lc2ljbmljaFV6YXZlcmVrICE9PSBJbnUuSW50ZXJmYWNlLkdFVXJvdmVuS29udHJvbHlNZXNpY2UuQmV6S29udHJvbHkgIH0pOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGF0LmNsb3NlU2F2ZSAmJiB0aGlzLnRlc3RDaGFuZ2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBFa28uRGV0YWlsLm1lc3NhZ2VCb3hVbnNhdmVkRGF0YSh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKFtHRGxnLm1iYlllcy5pZCwgR0RsZy5tYmJOby5pZF0pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IEdEbGcubWJiWWVzLmlkKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmNsb3NlU2F2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcblxyXG5cclxuXHJcbiAgICB9ICAgIFxyXG59Il19