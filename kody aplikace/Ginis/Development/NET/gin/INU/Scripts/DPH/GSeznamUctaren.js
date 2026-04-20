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
            let GSeznamUctaren = class GSeznamUctaren extends Gordic.GContentBase {
                constructor() {
                    /**
                     * Seznam uctaren
                     * */
                    super(...arguments);
                    /**
                     * Vybrany radek
                     * */
                    this.selectedRow = null;
                }
                prepareContent(vstup) {
                    var that = this;
                    // definicie gridu
                    this.grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        data: vstup.data, //[{ agenda: "UCT", doklad: "dsd" }],
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.selectedRow = ctx.cellInfo.data;
                                that.tryClose();
                                //that.ZobrazDetail(ctx.cellInfo.data as any);
                                /*
                                var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                                */
                            }
                        }),
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({ name: "ucs", caption: "Ucs", width: 80, fragment: "simple" })
                            .addTextColumn({ name: "uus", caption: "Uus", width: 80, fragment: "simple" })
                            .addTextColumn({ name: "nazev", caption: "jres:30250116", width: 100, fragment: "simple" }) //RC 30250116 : Název
                    });
                    that.commandBar([
                        {
                            id: "idSelect",
                            customClass: "g-button--primary",
                            action: new GAction({
                                name: "actSelect", caption: "jres:30250117", run: function () {
                                    that.selectedRow = Gordic.Eko.Grid.currentRow(that.grid);
                                    that.tryClose();
                                }
                            }) //RC 30250117 : Ok
                        },
                        {
                            id: "idclosedokladyneprouct",
                            //customClass: "g-button--primary",
                            action: new GAction({ name: "actClose", caption: "jres:30250026", run: function () { that.tryClose(); } }) //RC 30250026 : Zavřít
                        },
                    ]);
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.selectedRow == null) {
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        this.dialogs.messageBox("jres:30250026" //RC 30250026 : Zavřít
                        , "jres:30250118", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250118 : Opravdu chcete zavřít bez výběru účtárny?
                            .on("yes", function () {
                            def.resolve(null);
                        })
                            .on("close", def.reject);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        def.resolve(that.selectedRow);
                    }
                    return def.promise();
                }
            };
            GSeznamUctaren = __decorate([
                gcontent
            ], GSeznamUctaren);
            WebClient.GSeznamUctaren = GSeznamUctaren;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVVjdGFyZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtVWN0YXJlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBMEZmO0FBMUZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBGbkI7SUExRmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBGN0I7UUExRm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBQWhEO29CQUNJOzt5QkFFSzs7b0JBTUw7O3lCQUVLO29CQUNHLGdCQUFXLEdBQTRDLElBQUksQ0FBQztnQkEwRXhFLENBQUM7Z0JBekVHLGNBQWMsQ0FBQyxLQUFtRDtvQkFDOUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt5QkFDakIsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7d0JBQ1gsU0FBUzt3QkFDVCwrQ0FBK0M7d0JBQy9DLElBQUk7eUJBQ0gsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBQyxxQ0FBcUM7d0JBQ3RELHNCQUFzQjt3QkFDdEIsYUFBYSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUN2QixJQUFJLEVBQUUsb0JBQW9COzRCQUMxQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQ0FDckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNoQiw4Q0FBOEM7Z0NBQzlDOzs7a0NBR0U7NEJBQ04sQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFvQzs2QkFDbEUsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDOzZCQUM3RSxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7NkJBQzdFLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtxQkFDeEgsQ0FBQyxDQUFDO29CQUNQLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ1o7NEJBQ0ksRUFBRSxFQUFFLFVBQVU7NEJBQ2QsV0FBVyxFQUFFLG1CQUFtQjs0QkFDaEMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDO2dDQUNoQixJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFO29DQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBbUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUMzRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ3BCLENBQUM7NkJBQ0osQ0FBQyxDQUFDLGtCQUFrQjt5QkFDeEI7d0JBQ0Q7NEJBQ0ksRUFBRSxFQUFFLHdCQUF3Qjs0QkFDNUIsbUNBQW1DOzRCQUNuQyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7eUJBQ3BJO3FCQUVKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ksT0FBTztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksRUFBRSxDQUFDO3dCQUV6QixvRUFBb0U7d0JBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0I7MEJBQ3hELGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyx5REFBeUQ7NkJBQzVHLEVBQUUsQ0FBQyxLQUFLLEVBQUU7NEJBQ1AsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDOzZCQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqQyxDQUFDO3lCQUNJLENBQUM7d0JBQ0YsNkNBQTZDO3dCQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsQ0FBQzthQUNKLENBQUE7WUF0RlksY0FBYztnQkFEMUIsUUFBUTtlQUNJLGNBQWMsQ0FzRjFCO1lBdEZZLHdCQUFjLGlCQXNGMUIsQ0FBQTtRQUNMLENBQUMsRUExRm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBGN0I7SUFBRCxDQUFDLEVBMUZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwRm5CO0FBQUQsQ0FBQyxFQTFGUyxNQUFNLEtBQU4sTUFBTSxRQTBGZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVVjdGFyZW4gZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSB1Y3RhcmVuXHJcbiAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaW5zdGFuY2UgZ3JpZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeWJyYW55IHJhZGVrXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkUm93OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HZWtvc3V1c0R0byB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KHZzdHVwOiB7IGRhdGE6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdla29zdXVzRHRvW10gfSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC8vLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGl0bGU6IFwiUk9aXCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2c3R1cC5kYXRhLC8vW3sgYWdlbmRhOiBcIlVDVFwiLCBkb2tsYWQ6IFwiZHNkXCIgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaG93SGVhZGVyUm93OmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RlZFJvdyA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LlpvYnJhekRldGFpbChjdHguY2VsbEluZm8uZGF0YSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5zaG93V2luZG93KFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdERldGFpbFwiLCB7IEl4cDogcm93Lml4cCB9LCBcIlwiLCA4MDAsIDYwMCwgdHJ1ZSk7IC8vem9icmF6ZW5pIGRhbHNpaG8gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdla29zdXVzRHRvPigpICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ1Y3NcIiwgY2FwdGlvbjogXCJVY3NcIiwgd2lkdGg6IDgwLCBmcmFnbWVudDogXCJzaW1wbGVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidXVzXCIsIGNhcHRpb246IFwiVXVzXCIsIHdpZHRoOiA4MCwgZnJhZ21lbnQ6IFwic2ltcGxlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDExNlwiLCB3aWR0aDogMTAwLCBmcmFnbWVudDogXCJzaW1wbGVcIiB9KSAvL1JDIDMwMjUwMTE2IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFsgICAgICBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJpZFNlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2VsZWN0XCIsIGNhcHRpb246IFwianJlczozMDI1MDExN1wiLCBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZWN0ZWRSb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRWtvLkludGVyZmFjZS5HZWtvc3V1c0R0bz4odGhhdC5ncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAxMTcgOiBPa1xyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaWRjbG9zZWRva2xhZHluZXByb3VjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJhY3RDbG9zZVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjZcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudHJ5Q2xvc2UoKTsgfSB9KSAvL1JDIDMwMjUwMDI2IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuc2VsZWN0ZWRSb3c9PW51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2IGVkaXRhxI1uw61tIHJlxb5pbXUgKHRqLiBpIHBvIHBvZMOhbsOtKSBkb3RheiBuYSB6YXbFmWVuw60gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDI2XCIgLy9SQyAzMDI1MDAyNiA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAxMThcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAzMDI1MDExOCA6IE9wcmF2ZHUgY2hjZXRlIHphdsWZw610IGJleiB2w71ixJtydSDDusSNdMOhcm55P1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmLnJlamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh0aGF0LnNlbGVjdGVkUm93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=