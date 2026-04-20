"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            let GVyberVecnePrislusnostiProSpis = class GVyberVecnePrislusnostiProSpis extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.CreateMenu();
                    that.loadData(); //that
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        defaultAction: new GAction({
                            name: "actShow",
                            run: function (ev, ctx) {
                                that.okClick(ctx.cellInfo.data);
                            }
                        }),
                        columnMode: "full",
                        navigationMode: "row",
                        columns: this.createGridFormat(),
                        searchColumns: ["zakon_txt", "poznamka"]
                    });
                }
                CreateMenu() {
                    const that = this;
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: that.actions.add(new GAction({
                            name: "actOk",
                            caption: "jres:25200124", //RC 25200124 : Vybrat
                            tooltip: "jres:25200124", //RC 25200124 : Vybrat
                            run: function () {
                                var selection;
                                selection = that.grid.ggrid("getSelection");
                                if (selection.length == 1) {
                                    that.okClick(selection[0]);
                                }
                            }
                        })),
                        favorite: true,
                        customClass: "g-button--primary"
                    });
                    commandBarPole.push({
                        action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    that.commandBar(that.actions.createBar(commandBarPole));
                }
                okClick(vecnaPrislusnost) {
                    var that = this;
                    that.tryClose({ ixs_vpr: vecnaPrislusnost.ixs_vpr, ixp_spis: this.ixpSpis });
                }
                //nahrani dat
                loadData(filter) {
                    var that = this;
                    if (filter == undefined)
                        filter = new Object();
                    var prom = this.call("LoadData", { filter: filter })
                        .done(function (ret) {
                        if (that.grid.hasClass("ggrid")) {
                            that.grid.ggrid("setData", ret);
                        }
                    });
                    return prom;
                }
                createGridFormat() {
                    // Věcná příslušnost - zařízení
                    if (this.typVazby == "10") {
                        return new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "pismeno",
                            caption: "jres:25500104", //RC 25500104 : Písmeno
                            width: 120,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25500113", //RC 25500113 : Popis zařízení
                            width: 300,
                            fragment: ""
                        });
                    }
                    // Věcná příslušnost - státní dozor
                    else if (this.typVazby == "20") {
                        return new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "kategorie",
                            caption: "jres:25500105", //RC 25500105 : Číslo kategorie
                            width: 120,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "zakon_txt",
                            caption: "jres:25500106", //RC 25500106 : Kategorie nedostatků
                            width: 350,
                            fragment: ""
                        });
                    }
                    // Věcná příslušnost - obecná
                    else {
                        return new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "zakon_txt",
                            caption: "jres:25500114", //RC 25500114 : Název věcné příslušnosti
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25200058", //RC 25200058 : Poznámka
                            width: 300,
                            fragment: ""
                        });
                    }
                }
            };
            GVyberVecnePrislusnostiProSpis = __decorate([
                gcontent
            ], GVyberVecnePrislusnostiProSpis);
            WebApp.GVyberVecnePrislusnostiProSpis = GVyberVecnePrislusnostiProSpis;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyVmVjbmVQcmlzbHVzbm9zdGlQcm9TcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5YmVyVmVjbmVQcmlzbHVzbm9zdGlQcm9TcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0SWY7QUE1SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEluQjtJQTVJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBNEkxQjtRQTVJb0IsV0FBQSxNQUFNO1lBRXZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBK0IsU0FBUSxPQUFBLFlBQVk7Z0JBWTVELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07b0JBRXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJO3dCQUNMLDRIQUE0SDt5QkFDM0gsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsYUFBYSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUN2QixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBOzRCQUNuQyxDQUFDO3lCQUNKLENBQUM7d0JBQ0YsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNoQyxhQUFh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QUFELENBQUMsRUE1SWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRJbkI7QUFBRCxDQUFDLEVBNUlTLE1BQU0sS0FBTixNQUFNLFFBNElmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyVmVjbmVQcmlzbHVzbm9zdGlQcm9TcGlzIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHsgXHJcbiAgICAgICAgdHlwVmF6Ynk6IHN0cmluZztcclxuICAgICAgICBpeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICBUeXBTcjogbnVtYmVyO1xyXG4gICAgICAgIERydWhaYXI6IG51bWJlcjtcclxuICAgICAgICBGaWx0ZXJEYXRlRnJvbTogc3RyaW5nO1xyXG4gICAgICAgIEZpbHRlckRhdGVUbzogc3RyaW5nO1xyXG4gICAgICAgIFpuYWNrYVRleHREQlBhcmFtOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnUoKVxyXG4gICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7IC8vdGhhdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArIHRoYXQuJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXZlbsOtIHbDvcWha3kgZWxlbWVudHUsIG5hIGt0ZXLDvSBidWRlIHDFmWlkw6FuIGdyaWQuXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNob3dcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5va0NsaWNrKGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiemFrb25fdHh0XCIsIFwicG96bmFta2FcIl1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTI0XCIsIC8vUkMgMjUyMDAxMjQgOiBWeWJyYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVnByRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5va0NsaWNrKHNlbGVjdGlvblswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihjb21tYW5kQmFyUG9sZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBva0NsaWNrKHZlY25hUHJpc2x1c25vc3Q6IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WcHJEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHsgaXhzX3ZwcjogdmVjbmFQcmlzbHVzbm9zdC5peHNfdnByLCBpeHBfc3BpczogdGhpcy5peHBTcGlzIH0pOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmFocmFuaSBkYXRcclxuICAgICAgICBwdWJsaWMgbG9hZERhdGEoZmlsdGVyPzogT2JqZWN0KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGZpbHRlciA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gdGhpcy5jYWxsKFwiTG9hZERhdGFcIiwgeyBmaWx0ZXI6IGZpbHRlciB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWQuaGFzQ2xhc3MoXCJnZ3JpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVnByRHRvPiB7XHJcbiAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSB6YcWZw616ZW7DrVxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBWYXpieSA9PSBcIjEwXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVnByRHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpc21lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTA0XCIsIC8vUkMgMjU1MDAxMDQgOiBQw61zbWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDExM1wiLCAvL1JDIDI1NTAwMTEzIDogUG9waXMgemHFmcOtemVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSBzdMOhdG7DrSBkb3pvclxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cFZhemJ5ID09IFwiMjBcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WcHJEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2F0ZWdvcmllXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDEwNVwiLCAvL1JDIDI1NTAwMTA1IDogxIzDrXNsbyBrYXRlZ29yaWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWtvbl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1NTAwMTA2XCIsIC8vUkMgMjU1MDAxMDYgOiBLYXRlZ29yaWUgbmVkb3N0YXRrxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFbEm2Nuw6EgcMWZw61zbHXFoW5vc3QgLSBvYmVjbsOhXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WcHJEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpha29uX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDExNFwiLCAvL1JDIDI1NTAwMTE0IDogTsOhemV2IHbEm2Nuw6kgcMWZw61zbHXFoW5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDU4XCIsIC8vUkMgMjUyMDAwNTggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==