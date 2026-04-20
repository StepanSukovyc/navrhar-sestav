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
            let GPokPlatbyKartouSeznamTab = class GPokPlatbyKartouSeznamTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [],
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
                    Gordic.Isl.PokDoklad.listPlatbyKartou(rq => {
                        return {
                            ixp: that.ixp
                        };
                    })
                        .get()
                        .done(function (data) {
                        that.grid.ggrid("setData", data);
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "pos_id", caption: "ID terminálu" }); //RC 31302226 : Identifikátor
                    gridFormat.addDateColumn({ name: "trans_date", caption: "Datum transakce" });
                    gridFormat.addTextColumn({ name: "card_no", caption: "Číslo karty" });
                    gridFormat.addTextColumn({ name: "card_iss_id", caption: "Kartu vydal" });
                    gridFormat.addTextColumn({ name: "auth_code", caption: "Autorizační kód" });
                    gridFormat.addCurrencyColumn({ name: "c", caption: "Částka" });
                    gridFormat.addTextColumn({ name: "ucet", caption: "Vlastní bankovní účet" });
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "jres:31302230" }); //RC 31302230 : Datum změny
                    gridFormat.addTextColumn({ name: "zmenu_prov_txt", caption: "jres:31302231" }); //RC 31302231 : Změnu provedl
                    return gridFormat;
                }
            };
            GPokPlatbyKartouSeznamTab = __decorate([
                Decorators.gcontent
            ], GPokPlatbyKartouSeznamTab);
            WebClient.GPokPlatbyKartouSeznamTab = GPokPlatbyKartouSeznamTab;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1BsYXRieUthcnRvdVNlem5hbVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tQbGF0YnlLYXJ0b3VTZXpuYW1UYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWlFZjtBQWpFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpRW5CO0lBakVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpRTdCO1FBakVvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxPQUFBLFlBQVk7Z0JBTXZELGNBQWM7b0JBRVYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3hDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFDLEVBQUU7d0JBQ1AsVUFBVSxFQUFFLE1BQU0sRUFBTSw2Q0FBNkM7d0JBQ3JFLFVBQVUsRUFBRSxLQUFLLEVBQU8sWUFBWTt3QkFDcEMsY0FBYyxFQUFFLEtBQUssRUFBRyxZQUFZO3dCQUNwQywrQkFBK0I7d0JBQy9CLDBCQUEwQjt3QkFDMUIsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7cUJBQ25DLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRXJCLENBQUM7Z0JBRU8sU0FBUztvQkFFYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUN2QyxPQUFPOzRCQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzt5QkFDaEIsQ0FBQTtvQkFDTCxDQUFDLENBQUM7eUJBQ0csR0FBRyxFQUFFO3lCQUNMLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFckMsQ0FBQyxDQUFDLENBQUM7Z0JBR1gsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQTRDLENBQUM7b0JBRXhGLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQTZCO29CQUNwRyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUM3RSxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDdEUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7b0JBQzFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQzVFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQy9ELFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7b0JBQzdFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQSwyQkFBMkI7b0JBQ3pHLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7b0JBRTdHLE9BQU8sVUFBVSxDQUFDO2dCQUV0QixDQUFDO2FBQ0osQ0FBQTtZQTdEWSx5QkFBeUI7Z0JBRHJDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AseUJBQXlCLENBNkRyQztZQTdEWSxtQ0FBeUIsNEJBNkRyQyxDQUFBO1FBQ0wsQ0FBQyxFQWpFb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaUU3QjtJQUFELENBQUMsRUFqRWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlFbkI7QUFBRCxDQUFDLEVBakVTLE1BQU0sS0FBTixNQUFNLFFBaUVmO0FBR0UsMkRBQTJEO0FBQ2xELDJDQUEyQztBQUMzQyx5REFBeUQ7QUFDekQsMkVBQTJFO0FBQzNFLHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFFcEUsMkpBQTJKO0FBQzNKLG9LQUFvSztBQUNwSyx1S0FBdUsiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1BsYXRieUthcnRvdVNlem5hbVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7IFxyXG4gICAgICAgIGl4cDogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpbXSwgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2FjfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBzZWFyY2hDb2x1bW5zOiBbXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hY3RpRGF0YSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmFjdGlEYXRhKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlBva0Rva2xhZC5saXN0UGxhdGJ5S2FydG91KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lml4cFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rUGxhdGJ5S2FydG91RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1BsYXRieUthcnRvdUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9zX2lkXCIsIGNhcHRpb246IFwiSUQgdGVybWluw6FsdVwiIH0pOyAvL1JDIDMxMzAyMjI2IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJ0cmFuc19kYXRlXCIsIGNhcHRpb246IFwiRGF0dW0gdHJhbnNha2NlXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiY2FyZF9ub1wiLCBjYXB0aW9uOiBcIsSMw61zbG8ga2FydHlcIiB9KTsgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImNhcmRfaXNzX2lkXCIsIGNhcHRpb246IFwiS2FydHUgdnlkYWxcIiB9KTsgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiYXV0aF9jb2RlXCIsIGNhcHRpb246IFwiQXV0b3JpemHEjW7DrSBrw7NkXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNcIiwgY2FwdGlvbjogXCLEjMOhc3RrYVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInVjZXRcIiwgY2FwdGlvbjogXCJWbGFzdG7DrSBiYW5rb3Zuw60gw7rEjWV0XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYVwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIyMzBcIiB9KTsvL1JDIDMxMzAyMjMwIDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjMxXCIgfSk7IC8vUkMgMzEzMDIyMzEgOiBabcSbbnUgcHJvdmVkbFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiAgIC8vIC5hZGQoeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcIml4cFwiIH0pICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAuYWRkKHsgbmFtZTogXCJkdXZvZFwiLCBjYXB0aW9uOiBcIkTFr3ZvZFwifSlcclxuICAgICAgICAgICAgLy8gIC5hZGQoeyBuYW1lOiBcImNfcG9jYXRla1wiLCBjYXB0aW9uOiBcIlBvxI3DoXRlayB2IENaS1wiIH0pXHJcbiAgICAgICAgICAgIC8vICAuYWRkKHsgbmFtZTogXCJjX3BvY2F0ZWtfbVwiLCBjYXB0aW9uOiBcIlBvxI3DoXRlayB2IFwiICsgdGhpcy5aa3JhdGthTWVuYSB9KVxyXG4gICAgICAgICAgICAvLyAgLmFkZCh7IG5hbWU6IFwiZGF0X3ptZW5hXCIsIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIgfSlcclxuICAgICAgICAgICAgLy8gICAuYWRkKHsgbmFtZTogXCJuYXpldl9yZlwiLCBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCJ9KVxyXG5cclxuLy9sX29SZXN1bHQuQWRkKG5ldyBHR3JpZENvbHVtbkR0byB7IE5hbWUgPSBcImNfcG9jYXRla19tXCIsIENhcHRpb24gPSBHUmVzb3VyY2VzLkdldFJlc291cmNlVGV4dCgzMTMwMjIyOSkgKyBaa3JhdGthTWVuYSwgRGF0YVR5cGUgPSBHQ29sdW1uVHlwZS5EZWNpbWFsIH0pO1xyXG4vL2xfb1Jlc3VsdC5BZGQobmV3IEdHcmlkQ29sdW1uRHRvIHsgTmFtZSA9IFwiZGF0X3ptZW5hXCIsIENhcHRpb24gPSBHUmVzb3VyY2VzLkdldFJlc291cmNlVGV4dCgzMTMwMjIzMCksIERhdGFUeXBlID0gR0NvbHVtblR5cGUuRGF0ZSB9KTsgLy9SQyAzMTMwMjIzMCA6IERhdHVtIHptxJtueVxyXG4vL2xfb1Jlc3VsdC5BZGQobmV3IEdHcmlkQ29sdW1uRHRvIHsgTmFtZSA9IFwibmF6ZXZfcmZcIiwgQ2FwdGlvbiA9IEdSZXNvdXJjZXMuR2V0UmVzb3VyY2VUZXh0KDMxMzAyMjMxKSwgRGF0YVR5cGUgPSBHQ29sdW1uVHlwZS5TdHJpbmcgfSk7IC8vUkMgMzEzMDIyMzEgOiBabcSbbnUgcHJvdmVkbCJdfQ==