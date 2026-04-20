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
            let GPokPorovnaniRezervaceSmlouvyTab = class GPokPorovnaniRezervaceSmlouvyTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = 'Porovnání FP pol. SML rez. pol. POK';
                    this.grid = $("<div>").appendTo(this.element).gautofit()
                        .ggrid({
                        columnMode: "fit",
                        columns: this.createGridFormat()
                    });
                    that.NactiData();
                }
                NactiData() {
                    let that = this;
                    that.beginOperation("Probíhá načtení rezervačních zápisů");
                    that.call("RezervacniZapisy", { ixp: that.ixp, radek: that.radek })
                        .done(function (row) {
                        var view = new Gordic.Data.View(row);
                        that.grid.ggrid("setData", view);
                        that.endOperation();
                    }) //end call
                        .always(function () {
                        that.endOperation();
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "popis", caption: "" });
                    gridFormat.addTextColumn({ name: "id", caption: "" });
                    gridFormat.addSortedEkoCfuSet(this, true);
                    gridFormat.addTextColumn({ name: "nks", caption: "NKS" });
                    gridFormat.addCurrencyColumn({ name: "c", caption: "Částka pol./zbývá SML" });
                    return gridFormat;
                }
            };
            GPokPorovnaniRezervaceSmlouvyTab = __decorate([
                Decorators.gcontent
            ], GPokPorovnaniRezervaceSmlouvyTab);
            WebClient.GPokPorovnaniRezervaceSmlouvyTab = GPokPorovnaniRezervaceSmlouvyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Bvcm92bmFuaVJlemVydmFjZVNtbG91dnlUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rUG9yb3ZuYW5pUmV6ZXJ2YWNlU21sb3V2eVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBeUVQO0FBekVULFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlFWDtJQXpFUSxXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5RXJCO1FBekVZLFdBQUEsU0FBUztZQUcxQixJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFpQyxTQUFRLE9BQUEsWUFBWTtnQkFNOUQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcscUNBQXFDLENBQUM7b0JBR25ELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFO3lCQUNuRCxLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7cUJBQ25DLENBQUMsQ0FBQztvQkFHUCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRXJCLENBQUM7Z0JBRU8sU0FBUztvQkFHYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMscUNBQXFDLENBQUMsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7eUJBQzlELElBQUksQ0FBQyxVQUFVLEdBQWdDO3dCQUs1QyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFLNUIsQ0FBQyxDQUFDLENBQUMsVUFBVTt5QkFDWixNQUFNLENBQUM7d0JBRUosSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQTtnQkFLbEMsQ0FBQztnQkFHTyxnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWtDLENBQUM7b0JBRTlFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDdEQsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQzFELFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztvQkFHOUUsT0FBTyxVQUFVLENBQUM7Z0JBRXRCLENBQUM7YUFDSixDQUFBO1lBckVZLGdDQUFnQztnQkFENUMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxnQ0FBZ0MsQ0FxRTVDO1lBckVZLDBDQUFnQyxtQ0FxRTVDLENBQUE7UUFDRyxDQUFDLEVBekVZLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlFckI7SUFBRCxDQUFDLEVBekVRLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlFWDtBQUFELENBQUMsRUF6RUMsTUFBTSxLQUFOLE1BQU0sUUF5RVAiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1Bvcm92bmFuaVJlemVydmFjZVNtbG91dnlUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICBcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTsgIFxyXG4gICAgICAgIHB1YmxpYyBpeHA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgcmFkZWs6IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gJ1Bvcm92bsOhbsOtIEZQIHBvbC4gU01MIHJlei4gcG9sLiBQT0snOyAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0Lk5hY3RpRGF0YSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTmFjdGlEYXRhKCk6IHZvaWQge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgbmHEjXRlbsOtIHJlemVydmHEjW7DrWNoIHrDoXBpc8WvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiUmV6ZXJ2YWNuaVphcGlzeVwiLCB7IGl4cDogdGhhdC5peHAsIHJhZGVrOiB0aGF0LnJhZGVrIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocm93OiBHUG9rUG9yb3ZuYW5pUmV6ZXJ2YWNlRHRvW10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSAvL2VuZCBjYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9waXNcIiwgY2FwdGlvbjogXCJcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpZFwiLCBjYXB0aW9uOiBcIlwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJua3NcIiwgY2FwdGlvbjogXCJOS1NcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwiY1wiLCBjYXB0aW9uOiBcIsSMw6FzdGthIHBvbC4vemLDvXbDoSBTTUxcIiB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuIl19