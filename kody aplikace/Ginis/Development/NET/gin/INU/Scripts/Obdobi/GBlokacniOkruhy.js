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
            let GBlokacniOkruhy = class GBlokacniOkruhy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.returnResolve = "";
                }
                prepareContent(vstup) {
                    var that = this;
                    that.returnResolve = "";
                    this.mesic = vstup.mesic;
                    //vstup.data.forEach((item) => { item.aktivita = item.aktivita === 100 ? 1 : 0 });
                    // definice akci
                    that.createAction(vstup.data.length > 0);
                    // definicie gridu 
                    var grid = $("<div class='js-myGrid'>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "fit",
                        data: vstup.data,
                        columns: that.createCols(),
                        multi: false,
                        navigationMode: "cell",
                    }).ggridcelleditor({
                        autoEdit: true,
                        beforeStop: (a, b) => {
                            if (typeof b.cellInfo.data !== "undefined")
                                b.cellInfo.data.aktivita = $(".js-aktivita").closest(".gfield").gfield("getValue");
                            return true;
                        }
                        //allowCopy: true,
                    });
                    //grid.ggridcelleditor("start");
                    that.commandBar([
                        {
                            action: that.actions.actOK, favorite: true
                        },
                        {
                            action: that.actions.actZavrit, favorite: true
                        },
                    ]);
                    //debugger;
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addBooleanColumn({
                        name: "aktivita", caption: "jres:30250386", width: 90, editor: {
                            widget: "gcheck",
                            options: [
                                { name: "aktivita", customClass: "js-aktivita" }
                            ]
                        }
                    }); //RC 30250386 : Blokováno
                    gridFormat.addTextColumn({ name: "nazev", caption: "jres:30250385", width: 150 }); //RC 30250385 : Název
                    gridFormat.addTextColumn({ name: "poznamka", caption: "jres:30250384", width: 200 }); //RC 30250384 : Poznámka
                    return gridFormat;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createAction(dataFound) {
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
                        actOK: Gordic.Eko.Action.actionUlozit({
                            enabled: dataFound,
                            run: () => {
                                {
                                    var grid = $(".js-myGrid");
                                    grid.ggridcelleditor("stop");
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250388") //RC 30250388 :  Opravdu chcete uložit provedené změny?
                                        .done((result) => {
                                        if (result === "YES") {
                                            let data = grid.ggrid("getView").getDataRows(false);
                                            Gordic.Isl.InuBlokacniOkruhy.blokovat({ seznamBlokaci: data, mesic: that.mesic, ucs: data[0].ucs })
                                                .get()
                                                .done(() => {
                                                that.returnResolve = "REFRESH";
                                                that.tryClose();
                                            });
                                        }
                                    });
                                }
                            }
                        }),
                    });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    return $.Deferred().resolve({ result: this.returnResolve }).promise();
                }
            };
            GBlokacniOkruhy = __decorate([
                gcontent
            ], GBlokacniOkruhy);
            WebClient.GBlokacniOkruhy = GBlokacniOkruhy;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Jsb2thY25pT2tydWh5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0Jsb2thY25pT2tydWh5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E4SGY7QUE5SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEhuQjtJQTlIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOEg3QjtRQTlIb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBQWpEOztvQkFNVyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztnQkFvSHRDLENBQUM7Z0JBbkhHLGNBQWMsQ0FBQyxLQUFrRTtvQkFDN0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN6QixrRkFBa0Y7b0JBQ2xGLGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDekMsbUJBQW1CO29CQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUM7eUJBQ2xDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsUUFBUSxFQUFFO3lCQUNWLEtBQUssQ0FBQzt3QkFDSCxVQUFVLEVBQUUsS0FBSzt3QkFDakIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO3dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDMUIsS0FBSyxFQUFFLEtBQUs7d0JBQ1osY0FBYyxF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Q0FBQzs0Q0FDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBbUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRDQUN0RixNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFhLEVBQUUsQ0FBQztpREFDeEcsR0FBRyxFQUFFO2lEQUNMLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0RBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0RBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRDQUNwRCxDQUFDLENBQUMsQ0FBQzt3Q0FFWCxDQUFDO29DQUNMLENBQUMsQ0FBQyxDQUFDO2dDQUVYLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSixDQUFDO3FCQUlMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ksT0FBTztvQkFFVixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFFLENBQUM7YUFDSixDQUFBO1lBMUhZLGVBQWU7Z0JBRDNCLFFBQVE7ZUFDSSxlQUFlLENBMEgzQjtZQTFIWSx5QkFBZSxrQkEwSDNCLENBQUE7UUFDTCxDQUFDLEVBOUhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4SDdCO0lBQUQsQ0FBQyxFQTlIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOEhuQjtBQUFELENBQUMsRUE5SFMsTUFBTSxLQUFOLE1BQU0sUUE4SGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdCbG9rYWNuaU9rcnVoeSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIG5lemF1Y3RvdmFueWNoIGRva2xhZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIC8vcHVibGljIGRhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVDaHlieVV6YXZlcmt5RHRvW107XHJcbiAgICAgICAgcHVibGljIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIHJldHVyblJlc29sdmU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQodnN0dXA6IHsgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR1VjdHNibGtEdG9bXSwgbWVzaWM6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5yZXR1cm5SZXNvbHZlID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5tZXNpYyA9IHZzdHVwLm1lc2ljO1xyXG4gICAgICAgICAgICAvL3ZzdHVwLmRhdGEuZm9yRWFjaCgoaXRlbSkgPT4geyBpdGVtLmFrdGl2aXRhID0gaXRlbS5ha3Rpdml0YSA9PT0gMTAwID8gMSA6IDAgfSk7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGFrY2lcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb24odnN0dXAuZGF0YS5sZW5ndGggPiAwKTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2llIGdyaWR1IFxyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1teUdyaWQnPlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZzdHVwLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVDb2xzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcImNlbGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZGNlbGxlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9FZGl0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0b3A6IChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYi5jZWxsSW5mby5kYXRhICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYi5jZWxsSW5mby5kYXRhLmFrdGl2aXRhID0gJChcIi5qcy1ha3Rpdml0YVwiKS5jbG9zZXN0KFwiLmdmaWVsZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vZ3JpZC5nZ3JpZGNlbGxlZGl0b3IoXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T0ssIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HVWN0c2Jsa0R0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdVY3RzYmxrRHRvPigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQm9vbGVhbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsIGNhcHRpb246IFwianJlczozMDI1MDM4NlwiLCB3aWR0aDogOTAsIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJha3Rpdml0YVwiLCBjdXN0b21DbGFzczogXCJqcy1ha3Rpdml0YVwiIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzg2IDogQmxva292w6Fub1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDM4NVwiLCB3aWR0aDogMTUwIH0pOyAvL1JDIDMwMjUwMzg1IDogTsOhemV2XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG96bmFta2FcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzg0XCIsIHdpZHRoOiAyMDAgfSk7IC8vUkMgMzAyNTAzODQgOiBQb3puw6Fta2FcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbihkYXRhRm91bmQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhhdC50cnlDbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RPSzogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBkYXRhRm91bmQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkID0gJChcIi5qcy1teUdyaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRjZWxsZWRpdG9yKFwic3RvcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAzODhcIikgLy9SQyAzMDI1MDM4OCA6ICBPcHJhdmR1IGNoY2V0ZSB1bG/Fvml0IHByb3ZlZGVuw6kgem3Em255P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBncmlkLmdncmlkPEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdVY3RzYmxrRHRvPihcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVCbG9rYWNuaU9rcnVoeS5ibG9rb3ZhdCh7IHNlem5hbUJsb2thY2k6IGRhdGEsIG1lc2ljOiB0aGF0Lm1lc2ljLCB1Y3M6IGRhdGFbMF0udWNzIGFzIHN0cmluZyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXR1cm5SZXNvbHZlID0gXCJSRUZSRVNIXCI7IHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgcmVzdWx0OiB0aGlzLnJldHVyblJlc29sdmUgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==