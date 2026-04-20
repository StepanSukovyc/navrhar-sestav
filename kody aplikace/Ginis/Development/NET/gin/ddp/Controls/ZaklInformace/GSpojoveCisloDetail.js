"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSpojoveCisloDetail.ts                 </Name>
//    <Description> Okno detailu spojového čísla                                </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-01-23                                                  </Created>
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
            //TODO: datum nesmí být prázdný
            let GSpojoveCisloDetail = class GSpojoveCisloDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dto_new = {};
                }
                onContentReady() {
                    const that = this;
                    //menubar, commandbar akce
                    this.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.save(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    let validator = new Gordic.Validators.Base();
                    validator.getMessage = (value) => {
                        return "Chyba kontrolního součtu spojového čísla";
                    };
                    validator.validate = (value, source) => {
                        if (value == null)
                            return false;
                        const charArray = value.split(""); //string -> str_array
                        const numberArray = charArray.map(Number); //str_array -> num_array
                        if (numberArray.length != 10) {
                            return false;
                        }
                        else {
                            var celkem = 0;
                            celkem += numberArray[0] * 3;
                            celkem += numberArray[1] * 7;
                            celkem += numberArray[2] * 3;
                            celkem += numberArray[3] * 1;
                            celkem += numberArray[4] * 7;
                            celkem += numberArray[5] * 3;
                            celkem += numberArray[6] * 1;
                            celkem += numberArray[7] * 7;
                            celkem += numberArray[8] * 3;
                            celkem += numberArray[9] * 1;
                            var valid = celkem % 10;
                            if (valid == 0) {
                                return true;
                            }
                            else
                                return false;
                        }
                    };
                    this.beginOperation({ id: "loadData" });
                    //form
                    let hForm = new Gordic.Forms.Form({ name: "headerForm" })
                        .addSection()
                        .addRow("Spojové číslo")
                        .addField("gstringbox", "w-12", {
                        name: "spoj_cislo",
                        change: (ev, obj) => {
                            this.mainForm.gform("isValid"); //needed for validator to start validating
                        },
                        validators: [validator]
                    })
                        .addRow("Datum od")
                        .addField("gdatebox", "w-12", {
                        name: "dat_od",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Datum do")
                        .addField("gdatebox", "w-12", {
                        name: "dat_do"
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                    });
                    this.mainForm = $.newDiv().appendTo(this.element).gform("createFrom", hForm);
                    //plocha pro tlačítka dole
                    this.commandBar(this.actions.createBar(["actSave!", "actClose"]));
                    if (that.Poradi != 0) {
                        that.isl.SpojoveCislo.readDetail(rq => { return { data: { ixp: that.Ixp, poradi: that.Poradi }, fragments: ["*"] }; })
                            .get().done((data) => {
                            debugger;
                            that.dto = data.data;
                            that.fillForm();
                        })
                            .always(() => {
                            this.endOperation({ id: "loadData" });
                        });
                    }
                    else {
                        var form = this.element.findForms("headerForm");
                        form.findFields("dat_od").gfield("setValue", new Date());
                        this.endOperation({ id: "loadData" });
                    }
                }
                fillForm() {
                    var that = this;
                    var form = this.element.findForms("headerForm");
                    form.findFields("spoj_cislo").gfield("setValue", that.dto.spoj_cislo);
                    form.findFields("dat_od").gfield("setValue", that.dto.dat_od);
                    form.findFields("dat_do").gfield("setValue", that.dto.dat_do);
                    form.findFields("poznamka").gfield("setValue", that.dto.poznamka);
                }
                save() {
                    var valid = this.mainForm.gform("isValid");
                    if (valid == true) {
                        let def = $.Deferred();
                        var form = this.element.findForms("headerForm");
                        var spoj_cislo_form = form.findFields("spoj_cislo").gfield("getValue");
                        var dat_od_form = form.findFields("dat_od").gfield("getValue").toISOString().slice(0, 19);
                        var dat_do_form = form.findFields("dat_do").gfield("getValue");
                        if (dat_do_form != null) {
                            dat_do_form = dat_do_form.toISOString().slice(0, 19);
                        }
                        var poznamka_form = form.findFields("poznamka").gfield("getValue");
                        if (this.Poradi != 0) {
                            if (this.dto.spoj_cislo != spoj_cislo_form || this.dto.dat_od != dat_od_form || this.dto.dat_do != dat_do_form || this.dto.poznamka != poznamka_form) {
                                this.dialogs.confirm("Uložit", "Chcete uložit změny?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        this.dto.spoj_cislo = spoj_cislo_form;
                                        this.dto.dat_od = dat_od_form;
                                        this.dto.dat_do = dat_do_form;
                                        this.dto.poznamka = poznamka_form;
                                        this.dto.aktivita = 100;
                                        this.doSave(def, this.dto);
                                    }
                                    else
                                        def.resolve();
                                });
                            }
                            else { //nic se nezměnilo, ale updatenem aktivitu, kdyby byla "zrušená" (je to tak v Guptě)
                                this.dto.spoj_cislo = spoj_cislo_form;
                                this.dto.dat_od = dat_od_form;
                                this.dto.dat_do = dat_do_form;
                                this.dto.poznamka = poznamka_form;
                                this.dto.aktivita = 100;
                                this.doSave(def, this.dto);
                            }
                        }
                        else {
                            this.dialogs.confirm("Vytvořit", "Chcete vytvořit nové spojové číslo?")
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    this.dto_new.spoj_cislo = spoj_cislo_form;
                                    this.dto_new.dat_od = dat_od_form;
                                    this.dto_new.dat_do = dat_do_form;
                                    this.dto_new.poznamka = poznamka_form;
                                    this.dto_new.aktivita = "100";
                                    this.dto_new.ixp = this.Ixp;
                                    this.dto_new.poradi = 0;
                                    this.doSave(def, this.dto_new);
                                }
                                else
                                    def.resolve();
                            });
                        }
                        return def.promise();
                    }
                }
                doSave(def, dto) {
                    var that = this;
                    let promise = that.isl.SpojoveCislo.updateDetail({
                        dto: dto
                    }).get();
                    WebClient.Common.Base.ProcessResponse(promise, this, true)
                        .done(() => { def.resolve(); that.close(); })
                        .fail(() => { def.reject(); });
                }
            };
            GSpojoveCisloDetail = __decorate([
                Decorators.gcontent
            ], GSpojoveCisloDetail);
            WebClient.GSpojoveCisloDetail = GSpojoveCisloDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nwb2pvdmVDaXNsb0RldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTcG9qb3ZlQ2lzbG9EZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0E2TWY7QUE3TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNk1uQjtJQTdNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNk03QjtRQTdNb0IsV0FBQSxTQUFTO1lBRTFCLCtCQUErQjtZQUUvQixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLE9BQUEsWUFBWTtnQkFBckQ7O29CQVlZLFlBQU8sR0FBUSxFQUFFLENBQUM7Z0JBNEw5QixDQUFDO2dCQW5MRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUEsQ0FBQyxDQUFDO3lCQUNuQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDcEMsQ0FBQztxQkFDTCxDQUFDLENBQUE7b0JBRUYsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUU3QyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzdCLE9BQU8sMENBQTBDLENBQUM7b0JBQ3RELENBQUMsQ0FBQTtvQkFFRCxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO3dCQUNuQyxJQUFJLEtBQUssSUFBSSxJQUFJOzRCQUFFLE9BQU8sS0FBSyxDQUFDO3dCQUVoQyxNQUFNLFNBQVMsR0FBYSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCO3dCQUNsRSxNQUFNLFdBQVcsR0FBYSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsd0JBQXdCO3dCQUU3RSxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLENBQUM7NEJBQzNCLE9BQU8sS0FBSyxDQUFDO3dCQUNqQixDQUFDOzZCQUFNLENBQUM7NEJBQ0osSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUNmLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM3QixNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDN0IsTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzdCLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM3QixNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDN0IsTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzdCLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM3QixNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDN0IsTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzdCLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM3QixJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDOzRCQUN4QixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDYixPQUFPLElBQUksQ0FBQTs0QkFDZixDQUFDOztnQ0FBTSxPQUFPLEtBQUssQ0FBQzt3QkFDeEIsQ0FBQztvQkFDTCxDQUFDLENBQUE7b0JBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO29CQUN2QyxNQUFNO29CQUNOLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7eUJBQ3BELFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsZUFBZSxDQUFDO3lCQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsSUFBSSxDQUFDLFFBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7d0JBQy9FLENBQUM7d0JBQ0QsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO3FCQUMxQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7eUJBQ2xCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO3dCQUMxQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ2pELENBQUM7eUJBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDbEIsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUU7d0JBQzFCLElBQUksRUFBRSxRQUFRO3FCQUNqQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7eUJBQ2xCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFO3dCQUM1QixJQUFJLEVBQUUsVUFBVTtxQkFDbkIsQ0FBQyxDQUFBO29CQUVOLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFN0UsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbEUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDOzZCQUNoSCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDakIsUUFBUSxDQUFDOzRCQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNwQixDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTs0QkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7d0JBQzFDLENBQUMsQ0FBQyxDQUFBO29CQUNWLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTt3QkFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO2dCQUNMLENBQUM7Z0JBRU0sUUFBUTtvQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO29CQUUvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztnQkFFTyxJQUFJO29CQUNSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTt3QkFDL0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3ZFLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ2xHLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3dCQUM5RCxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDdEIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RCxDQUFDO3dCQUVELElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUUzRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLENBQUM7Z0NBQ25KLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQztxQ0FDakQsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtvQ0FDeEIsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7d0NBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQzt3Q0FDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO3dDQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7d0NBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQzt3Q0FDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dDQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQy9CLENBQUM7O3dDQUNJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDdkIsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQztpQ0FDSSxDQUFDLENBQUMsb0ZBQW9GO2dDQUN2RixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUM7Z0NBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztnQ0FDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO2dDQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7Z0NBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUMvQixDQUFDO3dCQUNMLENBQUM7NkJBRUQsQ0FBQzs0QkFDRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUscUNBQXFDLENBQUM7aUNBQ2xFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0NBQ3hCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO29DQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUM7b0NBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztvQ0FDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO29DQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7b0NBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQ0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29DQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ25DLENBQUM7O29DQUNJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDdkIsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQzt3QkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRztvQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQzt3QkFDN0MsR0FBRyxFQUFFLEdBQUc7cUJBQ1gsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUVULFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7eUJBQzNDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7eUJBQzNDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsQ0FBQzthQUNKLENBQUE7WUF4TVksbUJBQW1CO2dCQUQvQixVQUFVLENBQUMsUUFBUTtlQUNQLG1CQUFtQixDQXdNL0I7WUF4TVksNkJBQW1CLHNCQXdNL0IsQ0FBQTtRQUNMLENBQUMsRUE3TW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZNN0I7SUFBRCxDQUFDLEVBN01nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2TW5CO0FBQUQsQ0FBQyxFQTdNUyxNQUFNLEtBQU4sTUFBTSxRQTZNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HU3Bvam92ZUNpc2xvRGV0YWlsLnRzICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBkZXRhaWx1IHNwb2pvdsOpaG8gxI3DrXNsYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wMS0yMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvL1RPRE86IGRhdHVtIG5lc23DrSBiw710IHByw6F6ZG7DvVxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU3Bvam92ZUNpc2xvRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBTcG9qb3bDqSDEjcOtc2xvIGRldGFpbCAtIGZvcm1cclxuICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbWFpbkZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIFBvcmFkaTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZHRvXHJcbiAgICAgICAgcHJpdmF0ZSBkdG9fbmV3OiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgcHVibGljIHNwb2pfY2lzbG87XHJcbiAgICAgICAgcHVibGljIGRhdF9vZDtcclxuICAgICAgICBwdWJsaWMgZGF0X2RvO1xyXG4gICAgICAgIHB1YmxpYyBwb3puYW1rYTtcclxuICAgICAgICBwdWJsaWMgYWt0aXZpdGE7XHJcbiAgICAgICAgcHVibGljIGl4cDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9tZW51YmFyLCBjb21tYW5kYmFyIGFrY2VcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc2F2ZSgpIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJDaHliYSBrb250cm9sbsOtaG8gc291xI10dSBzcG9qb3bDqWhvIMSNw61zbGFcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlID0gKHZhbHVlLCBzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhckFycmF5OiBzdHJpbmdbXSA9IHZhbHVlLnNwbGl0KFwiXCIpOyAvL3N0cmluZyAtPiBzdHJfYXJyYXlcclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlckFycmF5OiBudW1iZXJbXSA9IGNoYXJBcnJheS5tYXAoTnVtYmVyKTsgLy9zdHJfYXJyYXkgLT4gbnVtX2FycmF5XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlckFycmF5Lmxlbmd0aCAhPSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNlbGtlbSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Vsa2VtICs9IG51bWJlckFycmF5WzBdICogMztcclxuICAgICAgICAgICAgICAgICAgICBjZWxrZW0gKz0gbnVtYmVyQXJyYXlbMV0gKiA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGtlbSArPSBudW1iZXJBcnJheVsyXSAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Vsa2VtICs9IG51bWJlckFycmF5WzNdICogMTtcclxuICAgICAgICAgICAgICAgICAgICBjZWxrZW0gKz0gbnVtYmVyQXJyYXlbNF0gKiA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGtlbSArPSBudW1iZXJBcnJheVs1XSAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Vsa2VtICs9IG51bWJlckFycmF5WzZdICogMTtcclxuICAgICAgICAgICAgICAgICAgICBjZWxrZW0gKz0gbnVtYmVyQXJyYXlbN10gKiA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGtlbSArPSBudW1iZXJBcnJheVs4XSAqIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Vsa2VtICs9IG51bWJlckFycmF5WzldICogMTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSBjZWxrZW0gJSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pXHJcbiAgICAgICAgICAgIC8vZm9ybVxyXG4gICAgICAgICAgICBsZXQgaEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImhlYWRlckZvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNwb2pvdsOpIMSNw61zbG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNwb2pfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbkZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKTsgLy9uZWVkZWQgZm9yIHZhbGlkYXRvciB0byBzdGFydCB2YWxpZGF0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbdmFsaWRhdG9yXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYWluRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy9wbG9jaGEgcHJvIHRsYcSNw610a2EgZG9sZVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5Qb3JhZGkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuU3Bvam92ZUNpc2xvLnJlYWREZXRhaWwocnEgPT4geyByZXR1cm4geyBkYXRhOiB7IGl4cDogdGhhdC5JeHAsIHBvcmFkaTogdGhhdC5Qb3JhZGkgfSwgZnJhZ21lbnRzOiBbXCIqXCJdIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kdG8gPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsbEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImhlYWRlckZvcm1cIilcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZpbGxGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImhlYWRlckZvcm1cIilcclxuXHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInNwb2pfY2lzbG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5kdG8uc3Bval9jaXNsbyk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmR0by5kYXRfb2QpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5kdG8uZGF0X2RvKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG96bmFta2FcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5kdG8ucG96bmFta2EpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlKCkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHZhbGlkID0gdGhpcy5tYWluRm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImhlYWRlckZvcm1cIilcclxuICAgICAgICAgICAgICAgIHZhciBzcG9qX2Npc2xvX2Zvcm0gPSBmb3JtLmZpbmRGaWVsZHMoXCJzcG9qX2Npc2xvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdF9vZF9mb3JtOiBzdHJpbmcgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfb2RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxOSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0X2RvX2Zvcm0gPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgICAgIGlmIChkYXRfZG9fZm9ybSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0X2RvX2Zvcm0gPSBkYXRfZG9fZm9ybS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDE5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBwb3puYW1rYV9mb3JtOiBzdHJpbmcgPSBmb3JtLmZpbmRGaWVsZHMoXCJwb3puYW1rYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Qb3JhZGkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0by5zcG9qX2Npc2xvICE9IHNwb2pfY2lzbG9fZm9ybSB8fCB0aGlzLmR0by5kYXRfb2QgIT0gZGF0X29kX2Zvcm0gfHwgdGhpcy5kdG8uZGF0X2RvICE9IGRhdF9kb19mb3JtIHx8IHRoaXMuZHRvLnBvem5hbWthICE9IHBvem5hbWthX2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJVbG/Fvml0XCIsIFwiQ2hjZXRlIHVsb8W+aXQgem3Em255P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvLnNwb2pfY2lzbG8gPSBzcG9qX2Npc2xvX2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvLmRhdF9vZCA9IGRhdF9vZF9mb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0by5kYXRfZG8gPSBkYXRfZG9fZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdG8ucG96bmFta2EgPSBwb3puYW1rYV9mb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0by5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1NhdmUoZGVmLCB0aGlzLmR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9uaWMgc2UgbmV6bcSbbmlsbywgYWxlIHVwZGF0ZW5lbSBha3Rpdml0dSwga2R5YnkgYnlsYSBcInpydcWhZW7DoVwiIChqZSB0byB0YWsgdiBHdXB0xJspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvLnNwb2pfY2lzbG8gPSBzcG9qX2Npc2xvX2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvLmRhdF9vZCA9IGRhdF9vZF9mb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0by5kYXRfZG8gPSBkYXRfZG9fZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdG8ucG96bmFta2EgPSBwb3puYW1rYV9mb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0by5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1NhdmUoZGVmLCB0aGlzLmR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVnl0dm/FmWl0XCIsIFwiQ2hjZXRlIHZ5dHZvxZlpdCBub3bDqSBzcG9qb3bDqSDEjcOtc2xvP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvX25ldy5zcG9qX2Npc2xvID0gc3Bval9jaXNsb19mb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRvX25ldy5kYXRfb2QgPSBkYXRfb2RfZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0b19uZXcuZGF0X2RvID0gZGF0X2RvX2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdG9fbmV3LnBvem5hbWthID0gcG96bmFta2FfZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0b19uZXcuYWt0aXZpdGEgPSBcIjEwMFwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0b19uZXcuaXhwID0gdGhpcy5JeHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdG9fbmV3LnBvcmFkaSA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYsIHRoaXMuZHRvX25ldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvU2F2ZShkZWYsIGR0bykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoYXQuaXNsLlNwb2pvdmVDaXNsby51cGRhdGVEZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgZHRvOiBkdG9cclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UocHJvbWlzZSwgdGhpcywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHsgZGVmLnJlc29sdmUoKTsgdGhhdC5jbG9zZSgpIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRlZi5yZWplY3QoKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==