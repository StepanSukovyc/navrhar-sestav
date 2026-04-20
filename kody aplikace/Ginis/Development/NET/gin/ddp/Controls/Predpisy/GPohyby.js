"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPohyby.ts                             </Name>
//    <Description> Úprava pohybů předpisů                                      </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-09                                                  </Created>
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
            //https://phabricator.gordic.cz/T4557
            let GPohyby = class GPohyby extends Gordic.GContentBase {
                onContentReady() {
                    var here = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    this.createForm();
                }
                createForm() {
                    var that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "GPohybyForm" })
                        .addSection("Částky předpisu") //! Částky předpisu
                        .addRow()
                        .addText("Základ daně", "w-4 right")
                        .addText("Daň", "w-4 right")
                        .addText("Celkem", "w-4 right")
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0"
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: true
                    })
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0"
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: true
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z1").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d1").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd1";
                            }
                        }
                    })
                        .addRow("Druhá snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z3").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d3").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd3";
                            }
                        }
                    })
                        .addRow("Základní sazba")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z2").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d2").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd2";
                            }
                        }
                    })
                        .addRow("Zaokrouhlení")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao"
                    })
                        .addSection("Částky předpisu") //! Rozpis předpisu
                        .addRow()
                        .addText("Základ daně", "w-4 right")
                        .addText("Daň", "w-4 right")
                        .addText("Celkem", "w-4 right")
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0"
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: true
                    })
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0"
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: true
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z1").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d1").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd1";
                            }
                        }
                    })
                        .addRow("Druhá snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z3").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d3").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd3";
                            }
                        }
                    })
                        .addRow("Základní sazba")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z2").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d2").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd2";
                            }
                        }
                    })
                        .addRow("Zaokrouhlení")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao"
                    })
                        .addSection("Rozdíl") //! Rozdíl
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    })
                        .addField("gnumberbox", {
                        name: ""
                    });
                }
            };
            GPohyby = __decorate([
                Decorators.gcontent
            ], GPohyby);
            WebClient.GPohyby = GPohyby;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaHlieS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2h5YnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0F3UmY7QUF4UkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd1JuQjtJQXhSZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBd1I3QjtRQXhSb0IsV0FBQSxTQUFTO1lBQ3RCLHFDQUFxQztZQUV6QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEsT0FBQSxZQUFZO2dCQUlyQyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFFbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDO3lCQUMxRCxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxtQkFBbUI7eUJBQ2pELE1BQU0sRUFBRTt5QkFDUixPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQzt5QkFDbkMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7eUJBQzNCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO3lCQUM5QixNQUFNLENBQUMsWUFBWSxDQUFDO3lCQUNwQixRQUFRLENBQUMs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LE1BQU0sS0FBTixNQUFNLFFBd1JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2h5YnkudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiDDmnByYXZhIHBvaHlixa8gcMWZZWRwaXPFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMi0wMy0wOSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgICAgICAvL2h0dHBzOi8vcGhhYnJpY2F0b3IuZ29yZGljLmN6L1Q0NTU3XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2h5YnkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIGhlcmUgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdQb2h5YnlGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDoXN0a3kgcMWZZWRwaXN1XCIpIC8vISDEjMOhc3RreSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJaw6FrbGFkIGRhbsSbXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhxYhcIiwgXCJ3LTQgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiQ2Vsa2VtXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3N2b2JvemVub1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QwXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmV6IGRhbsSbXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQcnZuw60gc27DrcW+ZW7DoVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDFcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDFcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRydWjDoSBzbsOtxb5lbsOhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejNcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkM1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDNcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkM1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196ZDNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2xhZG7DrSBzYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlphb2tyb3VobGVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3phb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDoXN0a3kgcMWZZWRwaXN1XCIpIC8vISBSb3pwaXMgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiWsOha2xhZCBkYW7Em1wiLCBcInctNCByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYcWIXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkNlbGtlbVwiLCBcInctNCByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9zdm9ib3plbm9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJleiBkYW7Em1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJ2bsOtIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QxXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdW0gPSB6LmFkZChkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEcnVow6Egc27DrcW+ZW7DoVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ozXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlrDoWtsYWRuw60gc2F6YmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdW0gPSB6LmFkZChkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rcm91aGxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YW9cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlJvemTDrWxcIikgLy8hIFJvemTDrWxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19