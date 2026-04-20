"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokUcetTerminaluKnihyTab = class GPokUcetTerminaluKnihyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: this.nactiData(),
                        renderMode: "auto",
                        columnMode: "fit",
                        navigationMode: "row",
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    that.actions.addRange({
                        actNovy: {
                            caption: "jres:31302295", //RC 31302295 : Nový
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                that.novaVazba();
                            }
                        },
                        actUpravit: {
                            caption: "jres:31302296", //RC 31302296 : Upravit
                            icon: "gi-pencil",
                            run: function (ev, ctx) {
                                that.editovatVazbu();
                            }
                        },
                        actOdstranit: {
                            caption: "jres:31302297", //RC 31302297 : Odstranit
                            icon: "gi-bin",
                            run: function (ev, ctx) {
                                that.odstranVazbu();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actNovy, favorite: true },
                        { action: this.actions.actUpravit, favorite: true },
                        { action: this.actions.actOdstranit, favorite: true }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "pos_id", caption: "ID terminálu" });
                    gridFormat.addTextColumn({ name: "bu_vl", caption: "Číslo účtu" });
                    gridFormat.addTextColumn({ name: "sk_vl", caption: "Směrový kód" });
                    gridFormat.addTextColumn({ name: "ucet_nazev", caption: "Bank. účet" });
                    return gridFormat;
                }
                nactiData() {
                    var that = this;
                    var test = new Gordic.Isl.View(Gordic.Isl.PokKniha.uctyTerminaluKnihy(rq => {
                        return {
                            filters: { ixp_den: that.ixpDen, aktivita: 100 }
                        };
                    }));
                    return test;
                }
                novaVazba() {
                    var that = this;
                    var windowOption = { width: 400, height: 300 };
                    var ParamsJSON = { Edit: true, AktivitaZaznamu: 100, ixpDen: that.ixpDen };
                    that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokUcetTerminaluNovyTab", ParamsJSON, windowOption)
                        .on("close", function (ev) {
                        that.grid.ggrid("setData", that.nactiData());
                    });
                }
                odstranVazbu() {
                    var that = this;
                    var row = this.grid.ggrid("getSelection")[0];
                    if (row == undefined) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrán žádný záznam!");
                        return;
                    }
                    this.dialogs.messageBox("dotaz", "jres:31302300", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31302300 : Opravdu chcete odstranit tento záznam?
                        .on("yes", function () {
                        that.isl.PokKniha.editaceUcetTerminal(rq => { return { data: { ixp_den: that.ixpDen, pos_id: row.pos_id, bu_vl: row.bu_vl, sk_vl: row.sk_vl, aktivita: 900 } }; })
                            .get()
                            .done(function (data) {
                            that.grid.ggrid("setData", that.nactiData());
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Záznam úspěšně odstraněn!");
                        });
                    })
                        .on("no", function () { });
                }
                editovatVazbu() {
                    var that = this;
                    var row = this.grid.ggrid("getSelection")[0];
                    if (row == undefined) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrán žádný záznam!");
                        return;
                    }
                    var windowOption = { width: 400, height: 300 };
                    var ParamsJSON = { Pos_id: row.pos_id, Bu: row.bu_vl, Sk: row.sk_vl, Edit: false, AktivitaZaznamu: row.aktivita, ixpDen: that.ixpDen };
                    that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokUcetTerminaluNovyTab", ParamsJSON, windowOption)
                        .on("close", function (ev) {
                        that.grid.ggrid("setData", that.nactiData());
                    });
                }
            };
            GPokUcetTerminaluKnihyTab = __decorate([
                Decorators.gcontent
            ], GPokUcetTerminaluKnihyTab);
            WebClient.GPokUcetTerminaluKnihyTab = GPokUcetTerminaluKnihyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1VjZXRUZXJtaW5hbHVLbmloeVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tVY2V0VGVybWluYWx1S25paHlUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTRKZjtBQTVKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0Sm5CO0lBNUpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0SjdCO1FBNUpvQixXQUFBLFNBQVM7WUFLMUIsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxPQUFBLFlBQVk7Z0JBTXZELGNBQWM7b0JBR1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRyxhQUFhLEVBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUt0RSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDeEMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQ3JCLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDdEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixjQUFjLEVBQUUsS0FBSzt3QkFDckIsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7cUJBQ25DLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsT0FBTyxFQUFFOzRCQUNMLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9COzRCQUM5QyxJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFF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QUFVLENBQUMsUUFBUTtlQUNQLHlCQUF5QixDQXNKckM7WUF0SlksbUNBQXlCLDRCQXNKckMsQ0FBQTtRQUNMLENBQUMsRUE1Sm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTRKN0I7SUFBRCxDQUFDLEVBNUpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0Sm5CO0FBQUQsQ0FBQyxFQTVKUyxNQUFNLEtBQU4sTUFBTSxRQTRKZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICBcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tVY2V0VGVybWluYWx1S25paHlUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5uYWN0aURhdGEoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIyOTVcIiwgLy9SQyAzMTMwMjI5NSA6IE5vdsO9XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdmFWYXpiYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RVcHJhdml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjk2XCIsLy9SQyAzMTMwMjI5NiA6IFVwcmF2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0b3ZhdFZhemJ1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLCBhY3RPZHN0cmFuaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIyOTdcIiwvL1JDIDMxMzAyMjk3IDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2RzdHJhblZhemJ1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3ROb3Z5LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVcHJhdml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPZHN0cmFuaXQsIGZhdm9yaXRlOiB0cnVlIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxufVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rVWNldFRlcm1pbmFsdUtuaWh5RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1VjZXRUZXJtaW5hbHVLbmloeUR0bz4oKTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwb3NfaWRcIiwgY2FwdGlvbjogXCJJRCB0ZXJtaW7DoWx1XCIgfSk7IFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImJ1X3ZsXCIsIGNhcHRpb246IFwixIzDrXNsbyDDusSNdHVcIiB9KTsgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic2tfdmxcIiwgY2FwdGlvbjogXCJTbcSbcm92w70ga8OzZFwiIH0pOyBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ1Y2V0X25hemV2XCIsIGNhcHRpb246IFwiQmFuay4gw7rEjWV0XCIgfSk7IFxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDsgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aURhdGEoKTogR29yZGljLklzbC5WaWV3XHJcbiAgICAgICAgICAgIHsgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHRlc3QgPSBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuUG9rS25paGEudWN0eVRlcm1pbmFsdUtuaWh5KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyBpeHBfZGVuOiB0aGF0Lml4cERlbiAsIGFrdGl2aXRhIDogMTAwICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5vdmFWYXpiYSgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB3aWR0aDogNDAwLCBoZWlnaHQ6IDMwMCB9O1xyXG4gICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgRWRpdDogdHJ1ZSwgQWt0aXZpdGFaYXpuYW11OiAxMDAsIGl4cERlbjogdGhhdC5peHBEZW4gfTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tVY2V0VGVybWluYWx1Tm92eVRhYlwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYpIHsgLy8gcG90w6kgY28gc2Ugb2tubyB6YXbFmWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0Lm5hY3RpRGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvZHN0cmFuVmF6YnUoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tVY2V0VGVybWluYWx1S25paHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSB6w6F6bmFtIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImRvdGF6XCIsIFwianJlczozMTMwMjMwMFwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDMxMzAyMzAwIDogT3ByYXZkdSBjaGNldGUgb2RzdHJhbml0IHRlbnRvIHrDoXpuYW0/XHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tLbmloYS5lZGl0YWNlVWNldFRlcm1pbmFsKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogeyBpeHBfZGVuOiB0aGF0Lml4cERlbiwgcG9zX2lkOiByb3cucG9zX2lkLCBidV92bDogcm93LmJ1X3ZsLCBza192bDogcm93LnNrX3ZsLCBha3Rpdml0YTogOTAwIH0gfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5uYWN0aURhdGEoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoU3VjY2Vzcyh0aGF0LCBcIlrDoXpuYW0gw7pzcMSbxaFuxJsgb2RzdHJhbsSbbiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJub1wiLCBmdW5jdGlvbiAoKSB7IH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGVkaXRvdmF0VmF6YnUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1VjZXRUZXJtaW5hbHVLbmloeUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB3aWR0aDogNDAwLCBoZWlnaHQ6IDMwMCB9O1xyXG4gICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgUG9zX2lkOiByb3cucG9zX2lkLCBCdTogcm93LmJ1X3ZsLCBTazogcm93LnNrX3ZsLCBFZGl0OiBmYWxzZSwgQWt0aXZpdGFaYXpuYW11OiByb3cuYWt0aXZpdGEsIGl4cERlbjogdGhhdC5peHBEZW4gfTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tVY2V0VGVybWluYWx1Tm92eVRhYlwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYpIHsgLy8gcG90w6kgY28gc2Ugb2tubyB6YXbFmWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0Lm5hY3RpRGF0YSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=