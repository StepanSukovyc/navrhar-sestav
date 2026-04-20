"use strict";
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
            let GSeznamChyb = class GSeznamChyb extends Gordic.GContentBase {
                /**
                 * Seznam nezauctovanych dokladu
                 * */
                //public data: Gordic.Inu.Interface.GInuChybyUzaverkyDto[];
                prepareContent(vstup) {
                    var that = this;
                    // definice akci
                    that.createAction();
                    // definicie gridu
                    var grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: vstup.data,
                        columns: that.createCols()
                    });
                    that.commandBar([
                        {
                            action: that.actions.actZavrit, favorite: true
                        },
                    ]);
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "popischyby",
                        caption: "jres:30250222", //RC 30250222 : Chyba
                        width: 150
                    });
                    Gordic.Eko.Grid.Column.addDruhDokladu(gridFormat, { name: "drd" });
                    Gordic.Eko.Grid.Column.addRok(gridFormat, { name: "rok" });
                    Gordic.Eko.Grid.Column.addMesic(gridFormat, { name: "mesic" });
                    Gordic.Eko.Grid.Column.addDen(gridFormat, { name: "den" });
                    Gordic.Eko.Grid.Column.addCisloDokladu(gridFormat, { name: "ac" });
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks, //this.GlobalParams.Zkratky?.Nks,
                        width: 50
                    });
                    gridFormat.addSortedEkoCfuSet(this, { isEditable: false })
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: "jres:30250282", //RC 30250282 : MD
                        width: 110,
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250283", //RC 30250283 : Dal
                        width: 110,
                    });
                    Gordic.Eko.Grid.Column.addPid(gridFormat, { name: "ixp" });
                    gridFormat.addDateColumn({
                        name: "dat_zmena",
                        caption: "jres:30250189", //RC 30250189 : Datum změny
                        width: 160
                    });
                    gridFormat.addTextColumn({
                        name: "zmenu_prov",
                        caption: "jres:30250190", //RC 30250190 : Změnu provedl
                        width: 90
                    });
                    gridFormat.addNumberColumn({
                        name: "radek_z",
                        caption: "jres:30250191", //RC 30250191 : Řádek
                        width: 40
                    });
                    return gridFormat;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createAction() {
                    var that = this;
                    this.actions.addRange({
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
            };
            GSeznamChyb = __decorate([
                gcontent
            ], GSeznamChyb);
            WebClient.GSeznamChyb = GSeznamChyb;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUNoeWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtQ2h5Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBd0dmO0FBeEdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdHbkI7SUF4R2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdHN0I7UUF4R29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxPQUFBLFlBQVk7Z0JBQ3pDOztxQkFFSztnQkFDTCwyREFBMkQ7Z0JBQzNELGNBQWMsQ0FBQyxLQUE0RDtvQkFDdkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsa0JBQWtCO29CQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUNoQixHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzt5QkFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7cUJBQzdCLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNaOzRCQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUMsSUFBSTt5QkFDaEQ7cUJBRUosQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRyxVQUFVO29CQUNkLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQTZDLENBQUM7b0JBQ3pGLFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ1QsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDbkUsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDckIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBQyxpQ0FBaUM7d0JBQ3hFLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQztvQkFFSCxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO3lCQUVyRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsSUFBSTt3QkFDVixxQkFBcUI7d0JBQ3JCLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsR0FBRztxQkFFYixDQUFDLENBQUM7b0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDckIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUNyRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBQ0YsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDckIsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO3dCQUN2RCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUM7b0JBQ0gsVUFBVSxDQUFDLGVBQWUsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7d0JBQy9DLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQTtvQkFFRixPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRDs7O3FCQUdLO2dCQUNHLFlBQVk7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sQ0FBQztvQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQUMsQ0FBQzs0QkFDeEIsQ0FBQzt5QkFDSixDQUFDO3FCQUlMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQTtZQXBHWSxXQUFXO2dCQUR2QixRQUFRO2VBQ0ksV0FBVyxDQW9HdkI7WUFwR1kscUJBQVcsY0FvR3ZCLENBQUE7UUFDTCxDQUFDLEVBeEdvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3RzdCO0lBQUQsQ0FBQyxFQXhHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd0duQjtBQUFELENBQUMsRUF4R1MsTUFBTSxLQUFOLE1BQU0sUUF3R2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1DaHliIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gbmV6YXVjdG92YW55Y2ggZG9rbGFkdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgLy9wdWJsaWMgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludUNoeWJ5VXphdmVya3lEdG9bXTtcclxuICAgICAgICBwcmVwYXJlQ29udGVudCh2c3R1cDogeyBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51Q2h5YnlVemF2ZXJreUR0b1tdIH0pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBha2NpXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2c3R1cC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29scygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WmF2cml0LCBmYXZvcml0ZTp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51Q2h5YnlVemF2ZXJreUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVDaHlieVV6YXZlcmt5RHRvPigpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzY2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIyMlwiLCAvL1JDIDMwMjUwMjIyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREcnVoRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiZHJkXCIgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhncmlkRm9ybWF0LCB7IG5hbWU6IFwibWVzaWNcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREZW4oZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImRlblwiIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENpc2xvRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiYWNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcywvL3RoaXMuR2xvYmFsUGFyYW1zLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMsIHsgaXNFZGl0YWJsZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vTURcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdHJ1Y3R1cmVMZWFkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgyXCIsIC8vUkMgMzAyNTAyODIgOiBNRFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvLyBEQUxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgzXCIsIC8vUkMgMzAyNTAyODMgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBpZChncmlkRm9ybWF0LCB7IG5hbWU6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg5XCIsIC8vUkMgMzAyNTAxODkgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTkwXCIsIC8vUkMgMzAyNTAxOTAgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE5MVwiLCAvL1JDIDMwMjUwMTkxIDogxZjDoWRla1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhhdC50cnlDbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==