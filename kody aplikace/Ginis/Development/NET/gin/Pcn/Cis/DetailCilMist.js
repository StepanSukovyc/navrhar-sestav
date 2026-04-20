"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pcn;
    (function (Pcn) {
        var WebApp;
        (function (WebApp) {
            let gcontent = Decorators.gcontent;
            /**
             * Detail ciloveho mista
             *
             * @author Daniel Bouchal
             * @since 484.1.0.1
             */
            let DetailCilMist = class DetailCilMist extends Gordic.GContentBase {
                onContentReady() {
                    let that = this;
                    this.actions.addRange({
                        actUlozit: {
                            name: "actUlozit",
                            enabled: true,
                            caption: "jres:28301142", //RC 28301142 : Uložit
                            icon: "gi-save",
                            run: function () {
                                that.ulozDetail();
                            }
                        },
                        actZavrit: {
                            name: "actZavrit",
                            enabled: true,
                            caption: "jres:28301143", //RC 28301143 : Zavřít
                            icon: "gi-window-close",
                            run: function () {
                                that.tryClose();
                            }
                        }
                    });
                    this.commandBar(this.actions.createBar(["actUlozit!", "actZavrit"]));
                    var formBuilder = new Gordic.Forms.Form({ name: "DetailCilMist" })
                        .addSection()
                        .addRow("jres:28301144").addField("gstringbox", {
                        name: "misto",
                        flag: "required",
                        tagByValue: Gordic.Prefabs.Field.charCounter(50 /* Gordic.Pcn.Interface.GPcnCiloveMistoDtoTypeLengths.misto */).tagByValue,
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 50 /* Gordic.Pcn.Interface.GPcnCiloveMistoDtoTypeLengths.misto */ })]
                    })
                        .addRow("jres:28301145").addField("gselectbox", Gordic.Prefabs.Select.psccmis(), {
                        disabled: false,
                        dropdown: true,
                        name: "viditelnost",
                        model: "viditelnost=viditelnost",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:28301146").addField("gselectbox", Gordic.Prefabs.Select.gincakt(), {
                        disabled: false,
                        dropdown: true,
                        name: "aktivita",
                        model: "aktivita=aktivita",
                        serverFilters: {
                            aktivita: [100, 900]
                        }
                    })
                        .addRow("jres:28301147").addField("gdatebox", { name: "dat_zmena", disabled: true }) //RC 28301147 : Datum poslední změny
                        .addRow("jres:28301148").addField("gselectbox", Gordic.Prefabs.Select.ginszmp(), {
                        disabled: true,
                        dropdown: false,
                        name: "zmenu_prov",
                        model: "zmenu_prov=ixs_zmp"
                    });
                    var form = $("<div>").appendTo(this.element).gform("createFrom", formBuilder);
                    this.findFields().gfield("model", "apply", this.data, { initialValues: true });
                    if (this.NovyDoklad) {
                        //pro editaci detailu zakazu pole, ktere se nesmi menit
                        this.findFields("aktivita").gfield("option", "disabled", true);
                    }
                }
                closing() {
                    if (this.findForms().gform("hasChanged")) { //RC 28301150 : Dotaz
                        return this.dialogs.messageBox("jres:28301150", "jres:28301149", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 28301149 : Byly provedeny změny. Opravdu chcete detail zavřít bez uložení?
                            .createDialogPromise(GDlg.mbbYes.id);
                    }
                }
                ulozDetail() {
                    // validace formuláře (pouze v js bez serveru)
                    if (!this.element.findForms().gform("isValid"))
                        return;
                    // sebrání hodnot z formuláře
                    this.findFields().gfield("model", "collect", this.data);
                    var that = this;
                    this.call("UlozDetail", { data: this.data })
                        .done(function (r) {
                        that.close(true);
                    });
                }
            };
            DetailCilMist = __decorate([
                gcontent
            ], DetailCilMist);
            WebApp.DetailCilMist = DetailCilMist;
        })(WebApp = Pcn.WebApp || (Pcn.WebApp = {}));
    })(Pcn = Gordic.Pcn || (Gordic.Pcn = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV0YWlsQ2lsTWlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRldGFpbENpbE1pc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTJHZjtBQTNHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyR25CO0lBM0dnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0EyRzFCO1FBM0dvQixXQUFBLE1BQU07WUFDdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBT3BDLGNBQWM7b0JBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRTs0QkFDUCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLElBQUk7NEJBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELElBQUksRUFBRSxTQUFTOzRCQUNmLEdBQUcsRUFBRTtnQ0FDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7NEJBQ3RCLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsSUFBSTs0QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXJFLElBQUks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LENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQywrRUFBK0U7NkJBQzVLLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTyxVQUFVO29CQUNkLDhDQUE4QztvQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzt3QkFBRSxPQUFPO29CQUV2RCw2QkFBNkI7b0JBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXhELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3lCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFDSixDQUFBO1lBaEdZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBZ0d6QjtZQWhHWSxvQkFBYSxnQkFnR3pCLENBQUE7UUFFTCxDQUFDLEVBM0dvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUEyRzFCO0lBQUQsQ0FBQyxFQTNHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkduQjtBQUFELENBQUMsRUEzR1MsTUFBTSxLQUFOLE1BQU0sUUEyR2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBjbi5XZWJBcHAge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIC8qKlxyXG4gICAgICogRGV0YWlsIGNpbG92ZWhvIG1pc3RhXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBEYW5pZWwgQm91Y2hhbFxyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuMVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBEZXRhaWxDaWxNaXN0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBHb3JkaWMuUGNuLkludGVyZmFjZS5HUGNuQ2lsb3ZlTWlzdG9EdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgTm92eURva2xhZDogYm9vbGVhbjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VWxveml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjgzMDExNDJcIiwgLy9SQyAyODMwMTE0MiA6IFVsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96RGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjgzMDExNDNcIiwgLy9SQyAyODMwMTE0MyA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFVsb3ppdCFcIiwgXCJhY3RaYXZyaXRcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtQnVpbGRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRGV0YWlsQ2lsTWlzdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyODMwMTE0NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDI4MzAxMTQ0IDogTcOtc3RvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtaXN0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB0YWdCeVZhbHVlOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5jaGFyQ291bnRlcihHb3JkaWMuUGNuLkludGVyZmFjZS5HUGNuQ2lsb3ZlTWlzdG9EdG9UeXBlTGVuZ3Rocy5taXN0bykudGFnQnlWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IEdvcmRpYy5QY24uSW50ZXJmYWNlLkdQY25DaWxvdmVNaXN0b0R0b1R5cGVMZW5ndGhzLm1pc3RvIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI4MzAxMTQ1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucHNjY21pcygpLCB7IC8vUkMgMjgzMDExNDUgOiBWaWRpdGVsbm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZpZGl0ZWxub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidmlkaXRlbG5vc3Q9dmlkaXRlbG5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI4MzAxMTQ2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2FrdCgpLCB7IC8vUkMgMjgzMDExNDYgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYWt0aXZpdGE9YWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwLCA5MDBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI4MzAxMTQ3XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF96bWVuYVwiLCBkaXNhYmxlZDogdHJ1ZSB9KSAvL1JDIDI4MzAxMTQ3IDogRGF0dW0gcG9zbGVkbsOtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjgzMDExNDhcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zem1wKCksIHsgLy9SQyAyODMwMTE0OCA6IFBvc2xlZG7DrSB6bcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ6bWVudV9wcm92PWl4c196bXBcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtQnVpbGRlcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuZGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuTm92eURva2xhZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9wcm8gZWRpdGFjaSBkZXRhaWx1IHpha2F6dSBwb2xlLCBrdGVyZSBzZSBuZXNtaSBtZW5pdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKFwiYWt0aXZpdGFcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKSkgeyAvL1JDIDI4MzAxMTUwIDogRG90YXpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MjgzMDExNTBcIiwgXCJqcmVzOjI4MzAxMTQ5XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMjgzMDExNDkgOiBCeWx5IHByb3ZlZGVueSB6bcSbbnkuIE9wcmF2ZHUgY2hjZXRlIGRldGFpbCB6YXbFmcOtdCBiZXogdWxvxb5lbsOtP1xyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96RGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2YWxpZGFjZSBmb3JtdWzDocWZZSAocG91emUgdiBqcyBiZXogc2VydmVydSlcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyBzZWJyw6Fuw60gaG9kbm90IHogZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbChcIlVsb3pEZXRhaWxcIiwgeyBkYXRhOiB0aGlzLmRhdGEgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=