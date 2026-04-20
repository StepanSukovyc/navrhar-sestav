"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRozpisDph.ts                          </Name>
//    <Description> Okno pro zobrazení/zadání/výpočtu částek DPH                </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-10-18                                                  </Created>
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
            /** Okno pro zadání a výpočet DPH */
            let GRozpisDph = class GRozpisDph extends Gordic.GContentBase {
                /** Základní metoda pro obsah contentu */
                onContentReady() {
                    const that = this;
                    that.title = that.Title || `Rozpis DPH`;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.createForm();
                }
                /** Metoda pro vytvoření formuláře */
                createForm() {
                    const that = this;
                    that.form = $.newDiv().appendTo(that.element).gform("createFrom", new Gordic.Forms.Form({ name: "frmRozpisDph" })
                        .addSection("Složení DPH")
                        .addRow()
                        .addText("Základ daně", "w-4 right")
                        .addText("Daň", "w-4 right")
                        .addText("Celkem", "w-4 right")
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: false, //!that.permsDto.c_d0,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_d0celkem").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            //        that.prepocetCastek(0)
                            //    }
                            //}
                        }
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0celkem",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setInitial", $(this).gform().findFields("c_d0").gfield("getValue"));
                                    return;
                                case "collect": return;
                                default: return "c_d0celkem";
                            }
                        }
                    })
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: false, //!that.permsDto.c_z0,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_z0celkem").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            //        that.prepocetCastek(1);
                            //    }
                            //}
                        }
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0celkem",
                        //initialValue: 0, //TEST
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setInitial", $(this).gform().findFields("c_z0").gfield("getValue"));
                                    return;
                                case "collect": return;
                                default: return "c_z0celkem";
                            }
                        }
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        disabled: false, //!that.permsDto.c_z1,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            //        that.prepocetCastek(1)
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        disabled: false, //!that.permsDto.c_d1,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            //        that.prepocetCastek(0)
                            //    }
                            //}
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
                        disabled: false, //!that.permsDto.c_z3,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            //        that.prepocetCastek(1)
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        disabled: false, //!that.permsDto.c_d3,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            //        that.prepocetCastek(0)
                            //    }
                            //}
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
                        disabled: false, //!that.permsDto.c_z2,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            //        that.prepocetCastek(1)
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        disabled: false, //!that.permsDto.c_d2,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            //        that.prepocetCastek(0)
                            //    }
                            //}
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
                        name: "c_zao",
                        disabled: false, //!that.permsDto.c_zao,
                        change: function (ev, input) {
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            //        that.prepocetCastek(0)
                            //    }
                            //}
                        }
                    }));
                }
                /** Metoda pro uložení */
                ok() {
                    return 0;
                }
            };
            GRozpisDph = __decorate([
                Decorators.gcontent
            ], GRozpisDph);
            WebClient.GRozpisDph = GRozpisDph;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenBpc0RwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSb3pwaXNEcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FtUmY7QUFuUkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbVJuQjtJQW5SZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbVI3QjtRQW5Sb0IsV0FBQSxTQUFTO1lBQzFCLG9DQUFvQztZQUVwQyxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEsT0FBQSxZQUFZO2dCQXlCeEMseUNBQXlDO2dCQUN6QyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQztvQkFFeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDbEMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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O1lBL1FZLFVBQVU7Z0JBRHRCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsVUFBVSxDQStRdEI7WUEvUVksb0JBQVUsYUErUXRCLENBQUE7UUFDTCxDQUFDLEVBblJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtUjdCO0lBQUQsQ0FBQyxFQW5SZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbVJuQjtBQUFELENBQUMsRUFuUlMsTUFBTSxLQUFOLE1BQU0sUUFtUmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1JvenBpc0RwaC50cyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHpvYnJhemVuw60vemFkw6Fuw60vdsO9cG/EjXR1IMSNw6FzdGVrIERQSCAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTEwLTE4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqIE9rbm8gcHJvIHphZMOhbsOtIGEgdsO9cG/EjWV0IERQSCAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm96cGlzRHBoIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogVGl0dWxlayBva25hICovXHJcbiAgICAgICAgVGl0bGU6IHN0cmluZztcclxuICAgICAgICAvKiogUElEIHDFmcOtcGFkdSAgKi9cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICAvKiogxZjDoWRlayDDumhyYWR5ICovXHJcbiAgICAgICAgUmFkZWtfdWhyOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFR5cCBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIFR5cF9waGw6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIERUTyBwxZnDrXBhZHUgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvfSAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbFByaXBhZHU6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvO1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBEVE8gVHlwdSBwb2hsZWTDoXZreSBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvfSAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbFR5cHVQaGw6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRFRPIHDFmWVkcGlzdSBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvfSAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbFByZWRwaXN1OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG87XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBGb3JtdWzDocWZIEB0eXBlIHtKUXVlcnl9Ki9cclxuICAgICAgICBwcml2YXRlIGZvcm06IEpRdWVyeTtcclxuXHJcblxyXG4gICAgICAgIC8qKiBaw6FrbGFkbsOtIG1ldG9kYSBwcm8gb2JzYWggY29udGVudHUgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gdGhhdC5UaXRsZSB8fCBgUm96cGlzIERQSGA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpczsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsXHJcbiAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZybVJvenBpc0RwaFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJTbG/FvmVuw60gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJaw6FrbGFkIGRhbsSbXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYcWIXCIsIFwidy00IHJpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJDZWxrZW1cIiwgXCJ3LTQgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3N2b2JvemVub1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCAvLyF0aGF0LnBlcm1zRHRvLmNfZDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QwY2Vsa2VtXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX2QwY2Vsa2VtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCZXogZGFuxJtcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8hdGhhdC5wZXJtc0R0by5jX3owLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MGNlbGtlbVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAwLCAvL1RFU1RcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196MGNlbGtlbVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJ2bsOtIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8hdGhhdC5wZXJtc0R0by5jX3oxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDFcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfelwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIC8vIXRoYXQucGVybXNEdG8uY19kMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aMOhIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ozXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8hdGhhdC5wZXJtc0R0by5jX3ozLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfelwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIC8vIXRoYXQucGVybXNEdG8uY19kMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3ozXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkM1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2xhZG7DrSBzYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCAvLyF0aGF0LnBlcm1zRHRvLmNfejIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMlwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8hdGhhdC5wZXJtc0R0by5jX2QyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rcm91aGxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgLy8hdGhhdC5wZXJtc0R0by5jX3phbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gdWxvxb5lbsOtICovXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=