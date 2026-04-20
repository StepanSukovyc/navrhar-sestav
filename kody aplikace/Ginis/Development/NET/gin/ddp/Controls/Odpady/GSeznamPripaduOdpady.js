"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSeznamPripaduOdpady.ts                </Name>
//    <Description> Seznam případů kde je evidována nemovitost                  </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-15                                                  </Created>
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
            /**
             * Odpady - Seznam případů kde je evidována nemovitost
             * @author Vojtěch Čech
             * @date 15.01.2026
             */
            let GSeznamPripaduOdpady = class GSeznamPripaduOdpady extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Seznam případů odpadů";
                    that.taskId = "actGSeznamPripaduOdpady";
                    that.createGrid();
                    that.createActions();
                    that.createMenuBar();
                    that.ziskejData();
                }
                /** Vytvoří grid/seznam případů */
                createGrid() {
                    return this.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GSeznamPripaduOdpadyGrid",
                        data: [],
                        columnMode: "fit",
                        renderMode: "auto",
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.PripadyOdpadu(),
                        rowNumbers: false
                    });
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actOdpady: {
                            name: "actOdpady",
                            caption: "Odpady",
                            tooltip: "", //todo
                            run: () => {
                                var row = that.grid.ggrid("activeRow");
                                if (row != undefined)
                                    that.navigate("Gordic.Ddp.WebClient.GNastaveniSvozuSeznam", { ID: "DDPGNastaveniSvozuSeznam#", dto: row });
                            }
                        }
                    });
                }
                /** Vytvoření položek v menubaru*/
                createMenuBar() {
                    const that = this;
                    let menu = [];
                    menu.push({ action: that.actions.actOdpady, favorite: true });
                    that.menuBar(menu);
                }
                /**
                 * Funkce pro získání dat
                 */
                ziskejData() {
                    const that = this;
                    var filter = {
                        typ_obj: 20,
                        id_jednotky: that.dto.id_jednotky,
                        id_budovy: that.dto.id_budovy
                    };
                    that.view = new Gordic.Isl.View(that.isl.Odpady.listPripadyOdpadu(rq => {
                        return {
                            filters: filter,
                            fragments: ["Default"]
                        };
                    }));
                    that.grid.ggrid("setData", that.view);
                }
            };
            GSeznamPripaduOdpady = __decorate([
                Decorators.gcontent
            ], GSeznamPripaduOdpady);
            WebClient.GSeznamPripaduOdpady = GSeznamPripaduOdpady;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXBhZHVPZHBhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtUHJpcGFkdU9kcGFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXFHZjtBQXJHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxR25CO0lBckdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxRzdCO1FBckdvQixXQUFBLFNBQVM7WUFDMUI7Ozs7ZUFJRztZQUVILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQVlsRCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztvQkFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQztvQkFFeEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsVUFBVTtvQkFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQXlDO3dCQUMzQyxJQUFJLEVBQUUsMEJBQTBCO3dCQUNoQyxJQUFJLEVBQUUsRUFBRTt3QkFDUixVQUFVLEVBQUUsS0FBSzt3QkFDakIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixPQUFPLEVBQUUsVUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTt3QkFDM0MsVUFBVSxFQUFFLEtBQUs7cUJBQ3BCLENBQUMsQ0FBQTtnQkFDVixDQUFDO2dCQUVELDRDQUE0QztnQkFDcEMsYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDckI7d0JBQ0ksU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNOzRCQUNuQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUErQyxXQUFXLENBQUMsQ0FBQztnQ0FDckYsSUFBRyxHQUFHLElBQUksU0FBUztvQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLDRDQUE0QyxFQUFFLEVBQUUsRUFBRSxFQUFFLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDOzRCQUNwSSxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLElBQUksR0FBaUIsRUFBRSxDQUFDO29CQUU1QixJQUFJLENBQUMsSUFBSSxDQUNMLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FDckQsQ0FBQTtvQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxVQUFVO29CQUNkLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxNQUFNLEdBQUc7d0JBQ1QsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVzt3QkFDakMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztxQkFDaEMsQ0FBQTtvQkFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUN0RCxFQUFFLENBQUMsRUFBRTt3QkFDRCxPQUFPOzRCQUNILE9BQU8sRUFBRSxNQUFNOzRCQUNmLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQzt5QkFDekIsQ0FBQTtvQkFDTCxDQUFDLENBQ0osQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7YUFDSixDQUFBO1lBN0ZZLG9CQUFvQjtnQkFEaEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxvQkFBb0IsQ0E2RmhDO1lBN0ZZLDhCQUFvQix1QkE2RmhDLENBQUE7UUFDTCxDQUFDLEVBckdvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxRzdCO0lBQUQsQ0FBQyxFQXJHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcUduQjtBQUFELENBQUMsRUFyR1MsTUFBTSxLQUFOLE1BQU0sUUFxR2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Nlem5hbVByaXBhZHVPZHBhZHkudHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNlem5hbSBwxZnDrXBhZMWvIGtkZSBqZSBldmlkb3bDoW5hIG5lbW92aXRvc3QgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI2LTAxLTE1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPZHBhZHkgLSBTZXpuYW0gcMWZw61wYWTFryBrZGUgamUgZXZpZG92w6FuYSBuZW1vdml0b3N0XHJcbiAgICAgKiBAYXV0aG9yIFZvanTEm2NoIMSMZWNoXHJcbiAgICAgKiBAZGF0ZSAxNS4wMS4yMDI2XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVByaXBhZHVPZHBhZHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKiogRGF0YSB2eWJyYW7DqWhvIMWZw6Fka3UgKi9cclxuICAgICAgICBkdG86IEludGVyZmFjZS5MSy5Jc2wuR05lbW92aXRvc3RpRHRvO1xyXG4gICAgICAgIC8qKiBUYWJ1bGthIHDFmcOtcGFkxa8gKi9cclxuICAgICAgICBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVmlldyBwcm8gZ3JpZFxyXG4gICAgICAgICogQHR5cGUge0lzbC5WaWV3PFREYXRhPn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHZpZXc6IElzbC5WaWV3O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIlNlem5hbSBwxZnDrXBhZMWvIG9kcGFkxa9cIjtcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdTZXpuYW1QcmlwYWR1T2RwYWR5XCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZw60gZ3JpZC9zZXpuYW0gcMWZw61wYWTFryAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpOiBKUXVlcnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdTZXpuYW1QcmlwYWR1T2RwYWR5R3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlByaXBhZHlPZHBhZHUoKSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gcG9sb8W+a3kgdiBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RPZHBhZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RwYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIiwgLy90b2RvXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTaW1wbGVQcmlwYWREdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyb3cgIT0gdW5kZWZpbmVkKSB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR05hc3RhdmVuaVN2b3p1U2V6bmFtXCIsIHsgSUQ6IFwiRERQR05hc3RhdmVuaVN2b3p1U2V6bmFtI1wiLCBkdG86IHJvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gcG9sb8W+ZWsgdiBtZW51YmFydSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaChcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2RwYWR5LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihtZW51KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHrDrXNrw6Fuw60gZGF0IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwX29iajogMjAsXHJcbiAgICAgICAgICAgICAgICBpZF9qZWRub3RreTogdGhhdC5kdG8uaWRfamVkbm90a3ksXHJcbiAgICAgICAgICAgICAgICBpZF9idWRvdnk6IHRoYXQuZHRvLmlkX2J1ZG92eVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuT2RwYWR5Lmxpc3RQcmlwYWR5T2RwYWR1KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJEZWZhdWx0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==