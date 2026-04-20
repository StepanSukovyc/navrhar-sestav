"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.VymahaniPreview.ts                       </Name>
//    <Description> Preview pro detail vymáhání                                 </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-06-16                                                  </Created>
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
                    Gordic.Previews.register("ddp:VymahaniPreview", {
                        canRender: (dto) => {
                            return dto.ixp_nvy != null;
                        },
                        render: (div, dto) => {
                            var currentElement = $(div);
                            currentElement.empty();
                            $.content(currentElement).beginOperation({ id: "loadData" });
                            var srv = new GContent("Gordic.Ddp.WebClient.GWebDdpContent");
                            var form = $("<div>").appendTo(currentElement);
                            var def = $.Deferred();
                            var ddp_txt_nvycjt;
                            srv.isl.VymahaniDDP.nvycjtProPreview({ ixpNvy: dto.ixp_nvy })
                                .get()
                                .done((result) => {
                                ddp_txt_nvycjt = result;
                                def.resolve();
                            });
                            def.done(() => {
                                srv.isl.VymahaniDDP.read({
                                    data: dto
                                }).getData().done((data) => {
                                    let formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, breaks-300-400" })
                                        .addSection()
                                        .addRow("Identifikátor")
                                        .addField("gstringbox", {
                                        name: "ixp_nvy",
                                        disabled: true
                                    })
                                        .addRow("Identifikátor případu DDP")
                                        .addField("gstringbox", {
                                        name: "ixp_ddp",
                                        disabled: true
                                    })
                                        .addRow("Pořadí")
                                        .addField("gstringbox", {
                                        name: "poradi",
                                        disabled: true
                                    })
                                        .addRow(ddp_txt_nvycjt ?? "Značka")
                                        .addField("gstringbox", "w-12", {
                                        name: "cj_vym", // Číslo jednací
                                        disabled: true
                                    })
                                        .addRow("Skupina vymáhání")
                                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.skupinaVymahani(), {
                                        name: "ixs_skv",
                                        model: "model.ixs_skv = value.ixs_skv",
                                        graphicInput: "hidden",
                                        customClass: Gordic.Components.GFieldAssist.ignoreClass,
                                        disabled: true,
                                        itemTemplate: (data) => {
                                            let bg = data?.barva != null ? `background-color: ${WebClient.Common.Base.GetHexColor(data?.barva)};` : "";
                                            return `<div style="display: flex; align-items: center;"><div style="${bg} height: 18px; width: 18px; border: 1px solid gray; margin-right: 5px;"></div>${data?.nazev}</div>`;
                                        }
                                    })
                                        .addRow("Zpracovatel")
                                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                        name: "ixs_fun_akt",
                                        model: "model.ixs_fun_akt=value.ixs_fun",
                                        disabled: true
                                    })
                                        .addRow("Datum podání")
                                        .addField("gdatebox", "w-12", {
                                        name: "dat_podani",
                                        disabled: true
                                    })
                                        .addRow("Datum evidence")
                                        .addField("gdatebox", "w-12", {
                                        name: "dat_evid",
                                        disabled: true
                                    })
                                        .addRow("Datum generování")
                                        .addField("gdatebox", {
                                        name: "dat_vyst",
                                        disabled: true
                                    })
                                        .addRow("Adresát")
                                        .addField("gselectbox", "w-12", {
                                        name: "ixs_esu",
                                        disabled: true,
                                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                                    }, Gordic.Esu.Prefabs.vyberEsu({
                                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                                        Logovani: {
                                            Ixp: dto.ixp_nvy ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                                            AktZnacka: dto.ixp_nvy,
                                            DuvodHledaniTxt: "Detail vymáhání"
                                        },
                                    }))
                                        .addRow("Celková částka vymáhání")
                                        .addField("gnumberbox", {
                                        name: "c_vym",
                                        disabled: true
                                    })
                                        .addRow("Krok vymáhání")
                                        .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                                        name: "stav_vym",
                                        model: "model.stav_vym=value.stav_vym, model.stav_vym_txt=value.stav_vym_txt",
                                        disabled: true
                                    })
                                        .addRow("Odkaz na vymáhání")
                                        .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                                        name: "stav_vym_old",
                                        model: "model.stav_vym_old = value.stav_vym, model.stav_vym_old_txt=value.stav_vym_txt",
                                        disabled: true
                                    })
                                        .addRow("Interval vymáhání")
                                        .addField("gintervalbox", {
                                        name: "dat_vym",
                                        disabled: true
                                    });
                                    form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", data);
                                    $.content(currentElement).endOperation({ id: "loadData" });
                                });
                            });
                        }
                    });
                })(Previews = Controls.Previews || (Controls.Previews = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVnltYWhhbmlQcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVnltYWhhbmlQcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUseUZBQXlGO0FBQ3pGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBa0lmO0FBbElELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtJbkI7SUFsSWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtJN0I7UUFsSW9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQWtJdEM7WUFsSThCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLFFBQVEsQ0FrSS9DO2dCQWxJdUMsV0FBQSxRQUFRO29CQUU1QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTt3QkFDNUMsU0FBUyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7NEJBQ3BCLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7d0JBQy9CLENBQUM7d0JBQ0QsTUFBTSxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFOzRCQUMzQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzVCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFFdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTs0QkFDNUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMscUNBQXFDLENBQUMsQ0FBQzs0QkFFOUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFFL0MsSUFBSSxHQUFHLEdBQUcs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LENBQUMsRUFsSVMsTUFBTSxLQUFOLE1BQU0sUUFrSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuVnltYWhhbmlQcmV2aWV3LnRzICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUHJldmlldyBwcm8gZGV0YWlsIHZ5bcOhaMOhbsOtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNi0xNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuUHJldmlld3Mge1xyXG5cclxuICAgIEdvcmRpYy5QcmV2aWV3cy5yZWdpc3RlcihcImRkcDpWeW1haGFuaVByZXZpZXdcIiwge1xyXG4gICAgICAgIGNhblJlbmRlcjogKGR0bzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBkdG8uaXhwX252eSAhPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiAoZGl2OiBhbnksIGR0bzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9ICQoZGl2KTtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgICQuY29udGVudChjdXJyZW50RWxlbWVudCkuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pXHJcbiAgICAgICAgICAgIHZhciBzcnYgPSBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HV2ViRGRwQ29udGVudFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGN1cnJlbnRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciBkZHBfdHh0X252eWNqdDogc3RyaW5nO1xyXG4gICAgICAgICAgICBzcnYuaXNsLlZ5bWFoYW5pRERQLm52eWNqdFByb1ByZXZpZXcoeyBpeHBOdnk6IGR0by5peHBfbnZ5IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRkcF90eHRfbnZ5Y2p0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZGVmLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3J2LmlzbC5WeW1haGFuaUREUC5yZWFkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkdG9cclxuICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtNC04LTAsIE0tNC04LTAsIGJyZWFrcy0zMDAtNDAwXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9udnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciBwxZnDrXBhZHUgRERQXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGRwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/FmWFkw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcmFkaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhkZHBfdHh0X252eWNqdCA/PyBcIlpuYcSNa2FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjal92eW1cIiwgLy8gxIzDrXNsbyBqZWRuYWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmEgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3Quc2t1cGluYVZ5bWFoYW5pKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3NrdiA9IHZhbHVlLml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBHb3JkaWMuQ29tcG9uZW50cy5HRmllbGRBc3Npc3QuaWdub3JlQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBkYXRhPy5iYXJ2YSAhPSBudWxsID8gYGJhY2tncm91bmQtY29sb3I6ICR7Q29tbW9uLkJhc2UuR2V0SGV4Q29sb3IoZGF0YT8uYmFydmEpfTtgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiPjxkaXYgc3R5bGU9XCIke2JnfSBoZWlnaHQ6IDE4cHg7IHdpZHRoOiAxOHB4OyBib3JkZXI6IDFweCBzb2xpZCBncmF5OyBtYXJnaW4tcmlnaHQ6IDVweDtcIj48L2Rpdj4ke2RhdGE/Lm5hemV2fTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacHJhY292YXRlbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9ha3Q9dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHBvZMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wb2RhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBldmlkZW5jZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZXZpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIGdlbmVyb3bDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWRyZXPDoXRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19lc3U9aXhzX2VzdTtlc3VfZGljPWRpYzttb2RlbC5saWM9dmFsdWUubGljO21vZGVsLnBvcl96YXN0PXZhbHVlLnBvcl96YXN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LCAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBkdG8uaXhwX252eSA/PyBcIlwiLCAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksIC8vIHZ5YnJhdCB6IGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogZHRvLml4cF9udnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJEZXRhaWwgdnltw6Fow6Fuw61cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkNlbGtvdsOhIMSNw6FzdGthIHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIktyb2sgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VnltYWhhbmkoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW09dmFsdWUuc3Rhdl92eW0sIG1vZGVsLnN0YXZfdnltX3R4dD12YWx1ZS5zdGF2X3Z5bV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZGtheiBuYSB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnN0YXZWeW1haGFuaSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdnltX29sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW1fb2xkID0gdmFsdWUuc3Rhdl92eW0sIG1vZGVsLnN0YXZfdnltX29sZF90eHQ9dmFsdWUuc3Rhdl92eW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiSW50ZXJ2YWwgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoY3VycmVudEVsZW1lbnQpLmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSJdfQ==