"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpDashboardPhl2.ts                   </Name>
//    <Description> Okno pro custom dashboardem dle typu pohledávky             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GDdpDashboardPhl2 = class GDdpDashboardPhl2 extends Gordic.GContentBase {
                onContentReady() {
                    const data = new Gordic.Data.View([
                        {
                            title: "Pripady",
                            id: "",
                            mode: "vertical",
                            zone: 0,
                            defaultSelected: false,
                            // itemTemplate: this.createProvider(),
                            data: new Gordic.Data.View([
                                {
                                    title: "Aktívne",
                                    id: "",
                                    value: "85",
                                    text: ""
                                },
                                {
                                    title: "Zrušené",
                                    id: "",
                                    value: "17",
                                    text: ""
                                }
                            ])
                        },
                        {
                            title: "Pripady",
                            id: "",
                            mode: "vertical",
                            zone: 1,
                            defaultSelected: false,
                            data: new Gordic.Data.View([
                                {
                                    title: "Aktívne",
                                    id: "",
                                    value: "85",
                                    text: ""
                                },
                                {
                                    title: "Zrušené",
                                    id: "",
                                    value: "17",
                                    text: ""
                                }
                            ])
                        },
                        {
                            title: "Pripady",
                            id: "",
                            mode: "horizontal",
                            zone: 2,
                            defaultSelected: false,
                            data: new Gordic.Data.View([
                                {
                                    title: "Aktívne",
                                    id: "",
                                    value: "85",
                                    text: ""
                                },
                                {
                                    title: "Zrušené",
                                    id: "",
                                    value: "17",
                                    text: ""
                                }
                            ])
                        },
                        {
                            title: "Pripady",
                            id: "",
                            mode: "horizontal",
                            zone: 3,
                            defaultSelected: false,
                            data: new Gordic.Data.View([
                                {
                                    title: "Aktívne",
                                    id: "",
                                    value: "85",
                                    text: ""
                                },
                                {
                                    title: "Zrušené",
                                    id: "",
                                    value: "17",
                                    text: ""
                                }
                            ])
                        }
                    ]);
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data,
                        layout: "vertical",
                        title: "Dashboard",
                        zones: 4,
                        sortable: true,
                    });
                }
                /**
                 * TODO: skopíruj funkciu a uprav implementáciu podľa potreby pre každý provider.
                 *
                 * @param {GContent} gcontent
                 * @param {number} [maxRows] maximální počet zobrazených záznamů (default je 5)
                 * @returns {Gordic.Dashboard.CustomProvider} provided se seznamen
                 */
                createProvider(gcontent, maxRows = 5) {
                    // TODO vytvor list
                    const list = gcontent.isl[""].list({
                        // TODO
                        rowLimits: maxRows
                    });
                    const data = new Gordic.Isl.View(list, {
                        onResponse: (response) => {
                            response.data = response.data.map(() => {
                            });
                            return response;
                        }
                    });
                    data.requestData();
                    return new Gordic.Dashboard.CustomProvider("", "", () => {
                        // TODO vytvor Gordic.Prefabs.Panels.nejakyTemplate() funkciu
                        return $("<div>").gbasepanel({}, {
                            id: "",
                            mode: "vertical",
                            itemTemplate: "", // TODO
                            defaultSelected: false,
                            data,
                            defaultAction: new GAction({
                                name: "",
                                run: () => {
                                    // TODO akcia po kliknutí na element v dashboarde
                                }
                            })
                        });
                    });
                }
            };
            GDdpDashboardPhl2 = __decorate([
                Decorators.gcontent
            ], GDdpDashboardPhl2);
            WebClient.GDdpDashboardPhl2 = GDdpDashboardPhl2;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcERhc2hib2FyZFBobDIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGRwRGFzaGJvYXJkUGhsMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWdKZjtBQWhKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnSm5CO0lBaEpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnSjdCO1FBaEpvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBQy9DLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDOUI7NEJBQ0ksS0FBSyxFQUFFLFNBQVM7NEJBQ2hCLEVBQUUsRUFBRSxFQUFFOzRCQUNOLElBQUksRUFBRSxVQUFVOzRCQUNoQixJQUFJLEVBQUUsQ0FBQzs0QkFDUCxlQUFlLEVBQUUsS0FBSzs0QkFDdkIsdUNBQXVDOzRCQUN0QyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDdkI7b0NBQ0ksS0FBSyxFQUFFLFNBQVM7b0NBQ2hCLEVBQUUsRUFBRSxFQUFFO29DQUNOLEtBQUssRUFBRSxJQUFJO29DQUNYLElBQUksRUFBRSxFQUFFO2lDQUNYO2dDQUNEO29DQUNJLEtBQUssRUFBRSxTQUFTO29DQUNoQixFQUFFLEVBQUUsRUFBRTtvQ0FDTixLQUFLLEVBQUUsSUFBSTtvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDWDs2QkFDSixDQUFDO3lCQUNMO3dCQUNEOzRCQUNJLEtBQUssRUFBRSxTQUFTOzRCQUNoQixFQUFFLEVBQUUsRUFBRTs0QkFDTixJQUFJ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RUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO3dCQUNwRCw2REFBNkQ7d0JBQzdELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUU7NEJBQzdCLEVBQUUsRUFBRSxFQUFFOzRCQUNOLElBQUksRUFBRSxVQUFVOzRCQUNoQixZQUFZLEVBQUUsRUFBRSxFQUFHLE9BQU87NEJBQzFCLGVBQWUsRUFBRSxLQUFLOzRCQUN0QixJQUFJOzRCQUNKLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQztnQ0FDdkIsSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixpREFBaUQ7Z0NBQ3JELENBQUM7NkJBQ0osQ0FBQzt5QkFDTCxDQUFDLENBQUE7b0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQzthQUNKLENBQUE7WUE1SVksaUJBQWlCO2dCQUY3QixVQUFVLENBQUMsUUFBUTtlQUVQLGlCQUFpQixDQTRJN0I7WUE1SVksMkJBQWlCLG9CQTRJN0IsQ0FBQTtRQUNMLENBQUMsRUFoSm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWdKN0I7SUFBRCxDQUFDLEVBaEpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnSm5CO0FBQUQsQ0FBQyxFQWhKUyxNQUFNLEtBQU4sTUFBTSxRQWdKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwRGFzaGJvYXJkUGhsMi50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwcm8gY3VzdG9tIGRhc2hib2FyZGVtIGRsZSB0eXB1IHBvaGxlZMOhdmt5ICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHRGRwRGFzaGJvYXJkUGhsMiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAvLyBpdGVtVGVtcGxhdGU6IHRoaXMuY3JlYXRlUHJvdmlkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFrdMOtdm5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjg1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlpydcWhZW7DqVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIxN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBa3TDrXZuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI4NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJacnXFoWVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMTdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByaXBhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBa3TDrXZuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI4NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJacnXFoWVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMTdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByaXBhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBa3TDrXZuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI4NVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJacnXFoWVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiMTdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRGFzaGJvYXJkXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogNCxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRPRE86IHNrb3DDrXJ1aiBmdW5rY2l1IGEgdXByYXYgaW1wbGVtZW50w6FjaXUgcG9kxL5hIHBvdHJlYnkgcHJlIGthxb5kw70gcHJvdmlkZXIuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gZ2NvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW21heFJvd3NdIG1heGltw6FsbsOtIHBvxI1ldCB6b2JyYXplbsO9Y2ggesOhem5hbcWvIChkZWZhdWx0IGplIDUpXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXJ9IHByb3ZpZGVkIHNlIHNlem5hbWVuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlUHJvdmlkZXIoZ2NvbnRlbnQ6IEdDb250ZW50LCBtYXhSb3dzOiBudW1iZXIgPSA1KTogR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlciB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gdnl0dm9yIGxpc3RcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGdjb250ZW50LmlzbFtcIlwiXS5saXN0KHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgICAgIHJvd0xpbWl0czogbWF4Um93c1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcobGlzdCwge1xyXG4gICAgICAgICAgICAgICAgb25SZXNwb25zZTogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLmRhdGEubWFwKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkYXRhLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcihcIlwiLCBcIlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIHZ5dHZvciBHb3JkaWMuUHJlZmFicy5QYW5lbHMubmVqYWt5VGVtcGxhdGUoKSBmdW5rY2l1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLmdiYXNlcGFuZWwoe30sIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIlwiICwgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBha2NpYSBwbyBrbGlrbnV0w60gbmEgZWxlbWVudCB2IGRhc2hib2FyZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==