"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.PripadPreview.ts                       </Name>
//    <Description> Preview pro detail případu                                  </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Previews;
                (function (Previews) {
                    Gordic.Previews.register("ddp:PripadPreview", {
                        canRender: (dto) => {
                            return dto.ixp != null;
                        },
                        render: (div, dto) => {
                            //const that = this;
                            var currentElement = $(div);
                            currentElement.empty();
                            var srv = new GContent("Gordic.Ddp.WebClient.GWebDdpContent");
                            var form = $("<div>").appendTo(currentElement);
                            var grid = $("<div>").appendTo(currentElement);
                            srv.isl.Pripad.read({
                                data: dto,
                                fragments: ["Preview", "ExterniSubjekt.Preview"]
                            }).getData().done((data) => {
                                var defPopis = $.Deferred();
                                var popisRadku;
                                var popisCtvrti;
                                srv.isl.DdpInterfaceNew.popisRadkuDleParam({ typPhl: data.typ_phl ?? "" }).get()
                                    .done((radekPopis) => {
                                    popisRadku = radekPopis ?? "Řádek";
                                    if (popisCtvrti != null)
                                        defPopis.resolve();
                                });
                                srv.isl.DdpInterfaceNew.popisCtvrtiDleParam({ typPhl: data.typ_phl ?? "" }).get()
                                    .done((ctvrtPopis) => {
                                    popisCtvrti = ctvrtPopis ?? "Čtvrť";
                                    if (popisRadku != null)
                                        defPopis.resolve();
                                });
                                defPopis.done(() => {
                                    let formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, breaks-300-400" })
                                        .addSection()
                                        .addRow("Identifikátor")
                                        .addField("gstringbox", {
                                        name: "ixp",
                                        disabled: true
                                    })
                                        .addRow("Agendové číslo")
                                        .addField("gstringbox", {
                                        name: "ac",
                                        disabled: true
                                    })
                                        .addRow("Datum evidence")
                                        .addField("gdatebox", {
                                        name: "dat_evid",
                                        disabled: true
                                    })
                                        .addRow("Typ pohledávky")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                                        name: "typ_phl",
                                        model: "typ_phl=typ_phl",
                                        disabled: true
                                    })
                                        .addRow("Kniha")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ddpsden(), {
                                        name: "ixp_den",
                                        model: "ixp_den=ixp_den",
                                        disabled: true
                                    })
                                        .addRow("Nákladové středisko")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                                        name: "nks",
                                        model: "model.nks=value.nks,model.ico=value.ico",
                                        disabled: true
                                    })
                                        .addRow("Zpracovatel")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                        name: "ixs_fun_akt",
                                        model: "model.ixs_fun_akt=value.ixs_fun",
                                        disabled: true
                                    })
                                        .addRow(`${popisRadku}, ${popisCtvrti}`)
                                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.gNReaderDdpsrad(), {
                                        name: "ddp_radek",
                                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_radek=value.ddp_radek",
                                        disabled: true
                                    })
                                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.gNReaderDdpsctv(), {
                                        name: "ddp_ctvrt",
                                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_ctvrt=value.ddp_ctvrt",
                                        disabled: true
                                    })
                                        .addRow("Typ dokladu")
                                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                                        name: "ixs_typ",
                                        model: "model.ixs_typ=value.ixs_typ",
                                        serverFilters: { ktg_typ: [1795, 1796] },
                                        disabled: true
                                    })
                                        .addRow("Kategorie pohledávky")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcktp(), {
                                        name: "ktg_phl",
                                        model: "model.ktg_phl=value.ktg_phl",
                                        disabled: true
                                    })
                                        .addRow("Bankovní účet vlastní")
                                        .addField("gstringbox", "w-8", {
                                        name: "bu_vl",
                                        disabled: true
                                    })
                                        .addText("/", "w-1 center")
                                        .addField("gstringbox", "w-3", {
                                        name: "sk_vl",
                                        disabled: true
                                    })
                                        .addRow("IČO, DIČ")
                                        .addField("gstringbox", "w-6", {
                                        name: "ExterniSubjekt.ico",
                                        disabled: true
                                    })
                                        .addField("gstringbox", "w-6", {
                                        name: "ExterniSubjekt.dic",
                                        disabled: true
                                    })
                                        .addRow("RČ, Datum narození")
                                        .addField("gstringbox", "w-6", {
                                        name: "ExterniSubjekt.rc",
                                        disabled: true
                                    })
                                        .addField("gdatebox", "w-6", {
                                        name: "ExterniSubjekt.dat_nar",
                                        disabled: true
                                    })
                                        .addRow("Poplatník")
                                        .addField("gstringbox", {
                                        name: "ExterniSubjekt.esu_txt",
                                        disabled: true
                                    });
                                    form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", data);
                                });
                            });
                            Gordic.Ddp.WebClient.Common.Pripady.createGridStavUhradyPripadu(dto.ixp, grid);
                        }
                    });
                })(Previews = Controls.Previews || (Controls.Previews = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpcGFkUHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByaXBhZFByZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0FpSmY7QUFqSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUpuQjtJQWpKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaUo3QjtRQWpKb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBaUp0QztZQWpKOEIsV0FBQSxRQUFRO2dCQUFDLElBQUEsUUFBUSxDQWlKL0M7Z0JBakp1QyxXQUFBLFFBQVE7b0JBRTVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO3dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO3dCQUMzQixDQUFDO3dCQUNELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDakIsb0JBQW9COzRCQUNwQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzVCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFFdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMscUNBQXFDLENBQUMsQ0FBQzs0QkFFOUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDL0MsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFFL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxN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RSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUN0RixDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzs0QkFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ25GLENBQUM7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUMsRUFqSnVDLFFBQVEsR0FBUixpQkFBUSxLQUFSLGlCQUFRLFFBaUovQztZQUFELENBQUMsRUFqSjhCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBaUp0QztRQUFELENBQUMsRUFqSm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlKN0I7SUFBRCxDQUFDLEVBakpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSm5CO0FBQUQsQ0FBQyxFQWpKUyxNQUFNLEtBQU4sTUFBTSxRQWlKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5QcmlwYWRQcmV2aWV3LnRzICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUHJldmlldyBwcm8gZGV0YWlsIHDFmcOtcGFkdSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmV2aWV3cyB7XHJcblxyXG4gICAgR29yZGljLlByZXZpZXdzLnJlZ2lzdGVyKFwiZGRwOlByaXBhZFByZXZpZXdcIiwge1xyXG4gICAgICAgIGNhblJlbmRlcjogKGR0bykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZHRvLml4cCAhPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiAoZGl2LCBkdG8pID0+IHtcclxuICAgICAgICAgICAgLy9jb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJChkaXYpO1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNydiA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdXZWJEZHBDb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY3VycmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhjdXJyZW50RWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBzcnYuaXNsLlByaXBhZC5yZWFkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IGR0byxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiUHJldmlld1wiLCBcIkV4dGVybmlTdWJqZWt0LlByZXZpZXdcIl1cclxuICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLmRvbmUoKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmUG9waXMgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcGlzUmFka3U6IHN0cmluZztcclxuICAgICAgICAgICAgICAgIHZhciBwb3Bpc0N0dnJ0aTogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIHNydi5pc2wuRGRwSW50ZXJmYWNlTmV3LnBvcGlzUmFka3VEbGVQYXJhbSh7IHR5cFBobDogZGF0YS50eXBfcGhsID8/IFwiXCIgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmFkZWtQb3BpcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3Bpc1JhZGt1ID0gcmFkZWtQb3BpcyA/PyBcIsWYw6FkZWtcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcGlzQ3R2cnRpICE9IG51bGwpIGRlZlBvcGlzLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHNydi5pc2wuRGRwSW50ZXJmYWNlTmV3LnBvcGlzQ3R2cnRpRGxlUGFyYW0oeyB0eXBQaGw6IGRhdGEudHlwX3BobCA/PyBcIlwiIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGN0dnJ0UG9waXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9waXNDdHZydGkgPSBjdHZydFBvcGlzID8/IFwixIx0dnLFpVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9waXNSYWRrdSAhPSBudWxsKSBkZWZQb3Bpcy5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZQb3Bpcy5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybUJ1aWxkZXIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC00LTgtMCwgTS00LTgtMCwgYnJlYWtzLTMwMC00MDBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWdlbmRvdsOpIMSNw61zbG9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZXZpZGVuY2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZXZpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBzdHBwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidHlwX3BobD10eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwc2RlbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4cF9kZW49aXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoWtsYWRvdsOpIHN0xZllZGlza29cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc25rcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubmtzPXZhbHVlLm5rcyxtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnByYWNvdmF0ZWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2FrdD12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KGAke3BvcGlzUmFka3V9LCAke3BvcGlzQ3R2cnRpfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdOUmVhZGVyRGRwc3JhZCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF9yYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuLG1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobCxtb2RlbC5kZHBfcmFkZWs9dmFsdWUuZGRwX3JhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5nTlJlYWRlckRkcHNjdHYoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfY3R2cnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbixtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGwsbW9kZWwuZGRwX2N0dnJ0PXZhbHVlLmRkcF9jdHZydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBkb2tsYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfdHlwPXZhbHVlLml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsga3RnX3R5cDogWzE3OTUsIDE3OTZdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcGNrdHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfcGhsPXZhbHVlLmt0Z19waGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCIvXCIsIFwidy0xIGNlbnRlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2tfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJxIxPLCBEScSMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJFeHRlcm5pU3ViamVrdC5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJFeHRlcm5pU3ViamVrdC5kaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSxIwsIERhdHVtIG5hcm96ZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRXh0ZXJuaVN1Ympla3QucmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRXh0ZXJuaVN1Ympla3QuZGF0X25hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGxhdG7DrWtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkV4dGVybmlTdWJqZWt0LmVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtQnVpbGRlcikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5QcmlwYWR5LmNyZWF0ZUdyaWRTdGF2VWhyYWR5UHJpcGFkdShkdG8uaXhwLCBncmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSJdfQ==