"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pou;
    (function (Pou) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Úvodní stránka (dashboard)
             *
             * @author Michal Prošek
             * @since 484.1.0.32
             */
            let GDashboard = class GDashboard extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    var data = new Gordic.Data.View([
                        //definice prvního gbasepanelu
                        {
                            title: "Ginis HUB",
                            id: "ginisHub",
                            mode: "vertical",
                            zone: 0,
                            disabledItems: [2],
                            itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            defaultSelected: false,
                            data: new Gordic.Data.View([
                                {
                                    title: "Čerpání rozpočtu",
                                    id: 1,
                                    chart: {
                                        data: 60,
                                        type: "liquid"
                                    },
                                    text: "<div>Rozpočet vyčerpán z 60%</div>"
                                },
                                {
                                    title: "Počet faktur po splatnosti",
                                    id: 2,
                                    value: 15,
                                    meaning: "negative",
                                    text: "faktur po splatnosti"
                                }
                            ])
                        },
                        {
                            title: "Scorecard",
                            id: "scoreCard",
                            itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            mode: "vertical",
                            zone: 1,
                            defaultSelected: false,
                            disabledItems: [],
                            defaultAction: new GAction({
                                name: "actKpiClickEnter",
                                run: function (ev, obj) {
                                    debugger;
                                }
                            }),
                            data: [
                                {
                                    title: "Disponibilní zdroje FKSP",
                                    chart: {
                                        data: 25,
                                        type: "gauge3"
                                    },
                                    details: [{
                                            description: "RC: ",
                                            value: 3152000,
                                            meaning: "neutral",
                                            formatter: "C"
                                        },
                                        {
                                            description: "Č: ",
                                            value: 788000,
                                            meaning: "neutral",
                                            formatter: "C"
                                        }],
                                },
                                {
                                    title: "Proplacených faktur",
                                    value: 2,
                                    text: "<div>proplacené faktury</div>",
                                    meaning: "positive"
                                },
                                {
                                    title: "Dokumentů ke schválení",
                                    value: 5,
                                    meaning: "negative",
                                    text: "dokumentů"
                                }
                            ]
                        }
                    ]);
                    //vlastní definice widgetu GDashboardPanel, který má v kolekci data oba předdefinované gbasepanely. Budou se skládat vedle sebe díky nastavení layout: "horizontal" a bude obsahovat tři zóny. Umístění gbasepanelů do zón je dáno vlastností zone: cislo_zony_od_nuly v datech samotného gbasepanelu.
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data: data,
                        layout: "horizontal",
                        title: "Test",
                        zones: 3,
                        sortable: true
                    });
                }
            };
            GDashboard = __decorate([
                gcontent
            ], GDashboard);
            WebClient.GDashboard = GDashboard;
        })(WebClient = Pou.WebClient || (Pou.WebClient = {}));
    })(Pou = Gordic.Pou || (Gordic.Pou = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW9LZjtBQXBLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvS25CO0lBcEtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvSzdCO1FBcEtvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBdUR4Qzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFFakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMzQjt3QkFDSSw4QkFBOEI7d0JBQzlCOzRCQUNJLEtBQUssRUFBRSxXQUFXOzRCQUNsQixFQUFFLEVBQUUsVUFBVTs0QkFDZCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsSUFBSSxFQUFFLENBQUM7NEJBQ1AsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNsQixZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxZQUFZOzRCQUN6RSxlQUFlLEVBQUUsS0FBSzs0QkFDdEIsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ3ZCO29DQUNJLEtBQUssRUFBRSxrQkFBa0I7b0NBQ3pCLEVBQUUsRUFBRSxDQUFDO29DQUNMLEtBQUssRUFBRTt3Q0FDSCxJQUFJLEVBQUUsRUFBRTt3Q0FDUixJQUFJLEVBQUUsUUFBUTtxQ0FDakI7b0NBQ0QsSUFBSSxFQUFFLG9DQUFvQztpQ0FDN0M7Z0NBQ0Q7b0NBQ0ksS0FBSyxFQUFFLDRCQUE0QjtvQ0FDbkMsRUFBRSxFQUFFLENBQUM7b0NBQ0wsS0FBSyxFQUFFLEVBQUU7b0NBQ1QsT0FBTyxFQUFFLFVBQVU7b0NBQ25CLElBQUksRUFBRSxzQkFBc0I7aUNBQy9COzZCQUNKLENBQUM7eUJBQ0w7d0JBQ0Q7NEJBQ0ksS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLEVBQUUsRUFBRSxXQUFXOzRCQUNmLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLFlBQVk7NEJBQ3pFLElBQUksRUFBRSxVQUFVOzRCQUNoQixJQUFJLEVBQUUsQ0FBQzs0QkFDUCxlQUFlLEVBQUUsS0FBSzs0QkFDdEIsYUFBYSxFQUFFLEVBQUU7NEJBQ2pCLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQztnQ0FDdkIsSUFBSSxFQUFFLGtCQUFrQjtnQ0FDeEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7b0NBQ2xCLFFBQVEsQ0FBQztnQ0FDYixDQUFDOzZCQUNKLENBQUM7NEJBQ0YsSUFBSSxFQUFFO2dDQUNGO29DQUNJLEtBQUssRUFBRSwwQkFBMEI7b0NBQ2pDLEtBQUssRUFBRTt3Q0FDSCxJQUFJLEVBQUUsRUFBRTt3Q0FDUixJQUFJLEVBQUUsUUFBUTtxQ0FDakI7b0NBQ0QsT0FBTyxFQUFFLENBQUM7NENBQ04sV0FBVyxFQUFFLE1BQU07NENBQ25CLEtBQUssRUFBRSxPQUFPOzRDQUNkLE9BQU8sRUFBRSxTQUFTOzRDQUNsQixTQUFTLEVBQUUsR0FBRzt5Q0FDakI7d0NBQ0Q7NENBQ0ksV0FBVyxFQUFFLEtBQUs7NENBQ2xCLEtBQUssRUFBRSxNQUFNOzRDQUNiLE9BQU8sRUFBRSxTQUFTOzRDQUNsQixTQUFTLEVBQUUsR0FBRzt5Q0FDakIsQ0FBQztpQ0FDTDtnQ0FDRDtvQ0FDSSxLQUFLLEVBQUUscUJBQXFCO29DQUM1QixLQUFLLEVBQUUsQ0FBQztvQ0FDUixJQUFJLEVBQUUsK0JBQStCO29DQUNyQyxPQUFPLEVBQUUsVUFBVTtpQ0FDdEI7Z0NBQ0Q7b0NBQ0ksS0FBSyxFQUFFLHdCQUF3QjtvQ0FDL0IsS0FBSyxFQUFFLENBQUM7b0NBQ1IsT0FBTyxFQUFFLFVBQVU7b0NBQ25CLElBQUksRUFBRSxXQUFXO2lDQUNwQjs2QkFDSjt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRVAsc1NBQXNTO29CQUV0UyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQzlDLElBQUksRUFBRSxJQUFJO3dCQUNWLE1BQU0sRUFBRSxZQUFZO3dCQUNwQixLQUFLLEVBQUUsTUFBTTt3QkFDYixLQUFLLEVBQUUsQ0FBQzt3QkFDUixRQUFRLEVBQUUsSUFBSTtxQkFDakIsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFFSixDQUFBO1lBekpZLFVBQVU7Z0JBRHRCLFFBQVE7ZUFDSSxVQUFVLENBeUp0QjtZQXpKWSxvQkFBVSxhQXlKdEIsQ0FBQTtRQUNMLENBQUMsRUFwS29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW9LN0I7SUFBRCxDQUFDLEVBcEtnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvS25CO0FBQUQsQ0FBQyxFQXBLUyxNQUFNLEtBQU4sTUFBTSxRQW9LZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG91LldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogw5p2b2Ruw60gc3Ryw6Fua2EgKGRhc2hib2FyZClcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1pY2hhbCBQcm/FoWVrXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4zMlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGFzaGJvYXJkIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHJ2a3kgcHJvIHBvxI10eSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PGFueSB8IEdLcGlJdGVtT3B0aW9ucz5bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtwaVVjdG92YW5pOiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHJ2a3kgcHJvIHBvxI10eSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PGFueSB8IEdLcGlJdGVtT3B0aW9ucz5bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtwaVphcG9jdG92ZUxpc3R5OiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHJ2a3kgcHJvIHBvxI10eSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PGFueSB8IEdLcGlJdGVtT3B0aW9ucz5bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtwaU15bG5lUGxhdGJ5OiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdm9sZW7DqSDDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUG92b2xlbm9VY3RvdmFuaTogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdm9sZW7DqSBrYXRlZ29yaWUgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFBvdm9sZW5lS2F0ZWdvcmllVWN0b3Zhbmk6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb3ZvbGVuw6kgc2NodsOhbGVuw60gesOhcG/EjXRvdsOpaG8gbGlzdHVcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUG92b2xlbm9TY2h2YWxlbmlaYXBvY3RvdmVob0xpc3R1OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRG9zdHVwbsOpIGtuaWh5IHrDoXBvxI10b3bDvWNoIGxpc3TFr1xyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HRWtvc2RlbkR0b1tdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRG9zdHVwbmVLbmloeVphcG9jdG92eWNoTGlzdHU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFa29zZGVuRHRvW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbsOhIGxpa3ZpZGFjZSBteWxuw6kgcGxhdGJ5XHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFBvdm9sZW5hTGlrdmlkYWNlTXlsbmVQbGF0Ynk6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUeXAgem9icmF6ZW7DrSAodHJ1ZSA9IHZlbGvDoSBLUEksIGZhbHNlID0gbWFsw70gc2V6bmFtKVxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBUeXBab2JyYXplbmk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgR29yZGljLkRhdGEuVmlldyhcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmluaWNlIHBydm7DrWhvIGdiYXNlcGFuZWx1XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJHaW5pcyBIVUJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZ2luaXNIdWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZEl0ZW1zOiBbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaU5ld011bHRpUm93VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLEjGVycMOhbsOtIHJvenBvxI10dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImxpcXVpZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjxkaXY+Um96cG/EjWV0IHZ5xI1lcnDDoW4geiA2MCU8L2Rpdj5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQb8SNZXQgZmFrdHVyIHBvIHNwbGF0bm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJuZWdhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiZmFrdHVyIHBvIHNwbGF0bm9zdGlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyAvL2RlZmluaWNlIGRydWjDqWhvIGdiYXNlcGFuZWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNjb3JlY2FyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzY29yZUNhcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpTmV3TXVsdGlSb3dUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZEl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RLcGlDbGlja0VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGlzcG9uaWJpbG7DrSB6ZHJvamUgRktTUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImdhdWdlM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSQzogXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzMTUyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcIm5ldXRyYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCLEjDogXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA3ODgwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb3BsYWNlbsO9Y2ggZmFrdHVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCI8ZGl2PnByb3BsYWNlbsOpIGZha3R1cnk8L2Rpdj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcInBvc2l0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRG9rdW1lbnTFryBrZSBzY2h2w6FsZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImRva3VtZW50xa9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZsYXN0bsOtIGRlZmluaWNlIHdpZGdldHUgR0Rhc2hib2FyZFBhbmVsLCBrdGVyw70gbcOhIHYga29sZWtjaSBkYXRhIG9iYSBwxZllZGRlZmlub3ZhbsOpIGdiYXNlcGFuZWx5LiBCdWRvdSBzZSBza2zDoWRhdCB2ZWRsZSBzZWJlIGTDrWt5IG5hc3RhdmVuw60gbGF5b3V0OiBcImhvcml6b250YWxcIiBhIGJ1ZGUgb2JzYWhvdmF0IHTFmWkgesOzbnkuIFVtw61zdMSbbsOtIGdiYXNlcGFuZWzFryBkbyB6w7NuIGplIGTDoW5vIHZsYXN0bm9zdMOtIHpvbmU6IGNpc2xvX3pvbnlfb2RfbnVseSB2IGRhdGVjaCBzYW1vdG7DqWhvIGdiYXNlcGFuZWx1LlxyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgem9uZXM6IDMsXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==