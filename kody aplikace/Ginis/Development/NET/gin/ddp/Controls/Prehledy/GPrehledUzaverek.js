"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledUzaverek.ts                    </Name>
//    <Description> Okno přehledu uzávěrek                                      </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-13                                                  </Created>
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
            let GPrehledUzaverek = class GPrehledUzaverek extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPrehledUzaverek"; //podsvícení v menubaru, když je vybrán
                    that.createActions();
                    that.createFilterForm();
                    that.grid = $("<div>").appendTo(that.element)
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                
                        rowNumbers: false,
                        columns: WebClient.Common.GridFormats.PrehledUzaverek(),
                        profiles: [{
                                columnList: "typ_phl, dat_uz, zmenu_prov, dat_zmena"
                            }]
                    });
                }
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actPripadyZavritPotomky: {
                            name: "zavritPotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                    });
                }
                createFilterForm() {
                    var headerForm = new Gordic.Forms.Form({ name: "mainForm", layoutDescriptor: " L3M3S1 L-2-10-0 M-2-10-0 S-2-10-0" })
                        .addField("gintervalbox", "w-10", {
                        name: "datum",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "vsechny",
                        label: "Všechny typy pohledávek"
                    });
                    $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (_event, obj) => {
                            this.ziskejData(obj.filter);
                        }
                    });
                }
                ziskejData(filter) {
                    var that = this;
                    that.view = new Gordic.Data.View(undefined);
                    that.grid.ggrid("setData", that.view);
                    that.beginOperation();
                    that.isl.DdpPrehledUzaverek.list(() => {
                        return {
                            filters: filter
                        };
                    })
                        .get()
                        .done(function (dto) {
                        if (dto == null)
                            that.view = null;
                        else
                            that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                    })
                        .always(() => {
                        that.endOperation();
                    });
                }
            };
            GPrehledUzaverek = __decorate([
                Decorators.gcontent
            ], GPrehledUzaverek);
            WebClient.GPrehledUzaverek = GPrehledUzaverek;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRVemF2ZXJlay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmVobGVkVXphdmVyZWsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0EyRmY7QUEzRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkZuQjtJQTNGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkY3QjtRQTNGb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQU05QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLHVDQUF1QztvQkFDNUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFFeEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3hDLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsSUFBSSxFQUFFLEVBQUU7d0JBQ1IsVUFBVSxFQUFFLE1BQU0sRUFBTSw2Q0FBNkM7d0JBQ3JFLFVBQVUsRUFBRSxLQUFLLEVBQU8sWUFBWTt3QkFDcEMsY0FBYyxFQUFFLEtBQUssRUFBRyw0QkFBNEI7d0JBQ3BELFVBQVUsRUFBRSxLQUFLO3dCQUNqQixPQUFPLEVBQUUsVUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRTt3QkFDN0MsUUFBUSxFQUFFLENBQUM7Z0NBQ1AsVUFBVSxFQUFFLHdDQUF3Qzs2QkFDdkQs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LGFBQVMsS0FBVCxhQUFTLFFBMkY3QjtJQUFELENBQUMsRUEzRmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJGbkI7QUFBRCxDQUFDLEVBM0ZTLE1BQU0sS0FBTixNQUFNLFFBMkZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmVobGVkVXphdmVyZWsudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHDFmWVobGVkdSB1esOhdsSbcmVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTEwLTEzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmVobGVkVXphdmVyZWsgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogYW55O1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdQcmVobGVkVXphdmVyZWtcIjsgLy9wb2RzdsOtY2Vuw60gdiBtZW51YmFydSwga2R5xb4gamUgdnlicsOhblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QcmVobGVkVXphdmVyZWsoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwidHlwX3BobCwgZGF0X3V6LCB6bWVudV9wcm92LCBkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByaXBhZHlaYXZyaXRQb3RvbWt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwibWFpbkZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCIgTDNNM1MxIEwtMi0xMC0wIE0tMi0xMC0wIFMtMi0xMC0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdpbnRlcnZhbGJveFwiLCBcInctMTBcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNlY2hueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlbFoWVjaG55IHR5cHkgcG9obGVkw6F2ZWtcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5cclxuICAgICAgICAgICAgICAgIGdmaWx0ZXJwYW5lbCh7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW2hlYWRlckZvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChfZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnppc2tlakRhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpOiB2b2lkIHsgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpOyAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpOyAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLkRkcFByZWhsZWRVemF2ZXJlay5saXN0XHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGR0byA9PSBudWxsKSB0aGF0LnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=