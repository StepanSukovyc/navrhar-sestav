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
            let GPokHistoriePocStavuKnihyTab = class GPokHistoriePocStavuKnihyTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    this.nactiData();
                }
                nactiData() {
                    var that = this;
                    Gordic.Isl.PokKniha.seznamHisPocStavu(rq => {
                        return {
                            ixpDen: that.ixpDen
                        };
                    })
                        .get()
                        .done(function (data) {
                        that.grid.ggrid("setData", data.data);
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp_den", caption: "jres:31302226" }); //RC 31302226 : Identifikátor
                    gridFormat.addTextColumn({ name: "duvod", caption: "jres:31302227" }); //RC 31302227 : Důvod
                    if (this.ciziMena)
                        gridFormat.addCurrencyColumn({ name: "c_pocatek", caption: "jres:31302228" }); //RC 31302228 : Počátek v CZK
                    gridFormat.addCurrencyColumn({ name: "c_pocatek_m", caption: ("jres:31302229" + this.zkratkaMena) }); //RC 31302229 : Počátek v 
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "jres:31302230" }); //RC 31302230 : Datum změny
                    gridFormat.addTextColumn({ name: "nazev_rf", caption: "jres:31302231" }); //RC 31302231 : Změnu provedl
                    return gridFormat;
                }
            };
            GPokHistoriePocStavuKnihyTab = __decorate([
                Decorators.gcontent
            ], GPokHistoriePocStavuKnihyTab);
            WebClient.GPokHistoriePocStavuKnihyTab = GPokHistoriePocStavuKnihyTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
// .add({ name: "ixp", caption: "ixp" })                   
// .add({ name: "duvod", caption: "Důvod"})
//  .add({ name: "c_pocatek", caption: "Počátek v CZK" })
//  .add({ name: "c_pocatek_m", caption: "Počátek v " + this.ZkratkaMena })
//  .add({ name: "dat_zmena", caption: "Datum změny" })
//   .add({ name: "nazev_rf", caption: "Změnu provedl"})
//l_oResult.Add(new GGridColumnDto { Name = "c_pocatek_m", Caption = GResources.GetResourceText(31302229) + ZkratkaMena, DataType = GColumnType.Decimal });
//l_oResult.Add(new GGridColumnDto { Name = "dat_zmena", Caption = GResources.GetResourceText(31302230), DataType = GColumnType.Date }); //RC 31302230 : Datum změny
//l_oResult.Add(new GGridColumnDto { Name = "nazev_rf", Caption = GResources.GetResourceText(31302231), DataType = GColumnType.String }); //RC 31302231 : Změnu provedl
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hpc3RvcmllUG9jU3RhdnVLbmloeVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tIaXN0b3JpZVBvY1N0YXZ1S25paHlUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWlFZjtBQWpFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpRW5CO0lBakVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpRTdCO1FBakVvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNkIsU0FBUSxPQUFBLFlBQVk7Z0JBUTFELGNBQWM7b0JBRVYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3hDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFDLEVBQUUsRUFBSSx5SUFBeUk7d0JBQ3BKLFVBQVUsRUFBRSxNQUFNLEVBQU0sNkNBQTZDO3dCQUNyRSxVQUFVLEVBQUUsS0FBSyxFQUFPLFlBQVk7d0JBQ3BDLGNBQWMsRUFBRSxLQUFLLEVBQUcsWUFBWTt3QkFDcEMsK0JBQStCO3dCQUMvQiwwQkFBMEI7d0JBQzFCLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3FCQUNuQyxDQUFDLENBQUM7b0JBRVAsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVyQixDQUFDO2dCQUVPLFNBQVM7b0JBRWIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDdkMsT0FBTzs0QkFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07eUJBQ3RCLENBQUE7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNHLEdBQUcsRUFBRTt5QkFDTCxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUUxQyxDQUFDLENBQUMsQ0FBQztnQkFHWCxDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBNEMsQ0FBQztvQkFFeEYsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7b0JBQ3RHLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUUscUJBQXFCO29CQUM3RixJQUFJLElBQUksQ0FBQyxRQUFRO3dCQUNiLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7b0JBQ2hILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSwwQkFBMEI7b0JBQ2pJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQSwyQkFBMkI7b0JBQ3pHLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQTZCO29CQUV2RyxPQUFPLFVBQVUsQ0FBQztnQkFFdEIsQ0FBQzthQUNKLENBQUE7WUE3RFksNEJBQTRCO2dCQUR4QyxVQUFVLENBQUMsUUFBUTtlQUNQLDRCQUE0QixDQTZEeEM7WUE3RFksc0NBQTRCLCtCQTZEeEMsQ0FBQTtRQUNMLENBQUMsRUFqRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlFN0I7SUFBRCxDQUFDLEVBakVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpRW5CO0FBQUQsQ0FBQyxFQWpFUyxNQUFNLEtBQU4sTUFBTSxRQWlFZjtBQUdFLDJEQUEyRDtBQUNsRCwyQ0FBMkM7QUFDM0MseURBQXlEO0FBQ3pELDJFQUEyRTtBQUMzRSx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBRXBFLDJKQUEySjtBQUMzSixvS0FBb0s7QUFDcEssdUtBQXVLIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tIaXN0b3JpZVBvY1N0YXZ1S25paHlUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICBcclxuICAgICAgICBjaXppTWVuYTogYm9vbGVhbjtcclxuICAgICAgICB6a3JhdGthTWVuYTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aXRsZTogc3RyaW5nOyBcclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6W10sICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbEhlbHBlclRlbXBsYXRlOiBcInthY31cIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYWN0aURhdGEoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5hY3RpRGF0YSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLbmloYS5zZXpuYW1IaXNQb2NTdGF2dShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cERlbjogdGhhdC5peHBEZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCBkYXRhLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rSGlzdFBvY1N0YXZ1RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0hpc3RQb2NTdGF2dUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwX2RlblwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMjZcIiB9KTsgLy9SQyAzMTMwMjIyNiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZHV2b2RcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjI3XCIgfSk7ICAvL1JDIDMxMzAyMjI3IDogRMWvdm9kXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNpemlNZW5hKVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwiY19wb2NhdGVrXCIsIGNhcHRpb246IFwianJlczozMTMwMjIyOFwiIH0pOyAvL1JDIDMxMzAyMjI4IDogUG/EjcOhdGVrIHYgQ1pLXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfcG9jYXRla19tXCIsIGNhcHRpb246IChcImpyZXM6MzEzMDIyMjlcIiArIHRoaXMuemtyYXRrYU1lbmEpIH0pOyAgLy9SQyAzMTMwMjIyOSA6IFBvxI3DoXRlayB2IFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHsgbmFtZTogXCJkYXRfem1lbmFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjMwXCIgfSk7Ly9SQyAzMTMwMjIzMCA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2X3JmXCIsIGNhcHRpb246IFwianJlczozMTMwMjIzMVwiIH0pOyAvL1JDIDMxMzAyMjMxIDogWm3Em251IHByb3ZlZGxcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4gICAvLyAuYWRkKHsgbmFtZTogXCJpeHBcIiwgY2FwdGlvbjogXCJpeHBcIiB9KSAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gLmFkZCh7IG5hbWU6IFwiZHV2b2RcIiwgY2FwdGlvbjogXCJExa92b2RcIn0pXHJcbiAgICAgICAgICAgIC8vICAuYWRkKHsgbmFtZTogXCJjX3BvY2F0ZWtcIiwgY2FwdGlvbjogXCJQb8SNw6F0ZWsgdiBDWktcIiB9KVxyXG4gICAgICAgICAgICAvLyAgLmFkZCh7IG5hbWU6IFwiY19wb2NhdGVrX21cIiwgY2FwdGlvbjogXCJQb8SNw6F0ZWsgdiBcIiArIHRoaXMuWmtyYXRrYU1lbmEgfSlcclxuICAgICAgICAgICAgLy8gIC5hZGQoeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgLmFkZCh7IG5hbWU6IFwibmF6ZXZfcmZcIiwgY2FwdGlvbjogXCJabcSbbnUgcHJvdmVkbFwifSlcclxuXHJcbi8vbF9vUmVzdWx0LkFkZChuZXcgR0dyaWRDb2x1bW5EdG8geyBOYW1lID0gXCJjX3BvY2F0ZWtfbVwiLCBDYXB0aW9uID0gR1Jlc291cmNlcy5HZXRSZXNvdXJjZVRleHQoMzEzMDIyMjkpICsgWmtyYXRrYU1lbmEsIERhdGFUeXBlID0gR0NvbHVtblR5cGUuRGVjaW1hbCB9KTtcclxuLy9sX29SZXN1bHQuQWRkKG5ldyBHR3JpZENvbHVtbkR0byB7IE5hbWUgPSBcImRhdF96bWVuYVwiLCBDYXB0aW9uID0gR1Jlc291cmNlcy5HZXRSZXNvdXJjZVRleHQoMzEzMDIyMzApLCBEYXRhVHlwZSA9IEdDb2x1bW5UeXBlLkRhdGUgfSk7IC8vUkMgMzEzMDIyMzAgOiBEYXR1bSB6bcSbbnlcclxuLy9sX29SZXN1bHQuQWRkKG5ldyBHR3JpZENvbHVtbkR0byB7IE5hbWUgPSBcIm5hemV2X3JmXCIsIENhcHRpb24gPSBHUmVzb3VyY2VzLkdldFJlc291cmNlVGV4dCgzMTMwMjIzMSksIERhdGFUeXBlID0gR0NvbHVtblR5cGUuU3RyaW5nIH0pOyAvL1JDIDMxMzAyMjMxIDogWm3Em251IHByb3ZlZGwiXX0=