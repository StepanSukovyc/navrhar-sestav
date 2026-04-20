"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDetailKontroly.ts                     </Name>
//    <Description> Okno s detailem kontroly (detail a vytvoření)               </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-01-13                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * PŘEHLED KONTROL
             * Okno s detailem kontroly (detail a vytvoření)
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2022-01-13
             * @lastModified 2025-03-21
             */
            let GDetailKontroly = class GDetailKontroly extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    let req = (that.DatKontr == null) ?
                        Gordic.Isl.PripadKontrola.readDetailHeader(rq => {
                            return {
                                data: {
                                    ixp: that.Ixp,
                                }
                            };
                        }).get()
                        :
                            Gordic.Isl.PripadKontrola.read(rq => {
                                return {
                                    data: {
                                        ixp: that.Ixp,
                                        dat_kontr: that.DatKontr
                                    }
                                };
                            }).get();
                    that.createCommandBar();
                    that.createForm();
                    that.data = { ixp: that.Ixp };
                    if (req != null) {
                        req.done((data) => {
                            that.data = data.data;
                            that.defaultForm.findFields().gfield("model", "apply", data.data, { initialValues: true });
                            that.defaultForm.findFields().gfield("model", "validators", that.validators);
                        });
                    }
                    else {
                        that.defaultForm.findFields().gfield("model", "validators", that.validators);
                    }
                    //that.element.findForms("ddpDetailKontrolyForm").findFields().gfield("model", "apply", that.data, { initialValues: true });
                }
                createCommandBar() {
                    const that = this;
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
                            run: function () { that.close(false); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    ;
                }
                createForm() {
                    const that = this;
                    var kontrolaForm = new Gordic.Forms.Form({ name: "ddpDetailKontrolyForm", layoutDescriptor: "L2M1S1, L-3-9-0, M-3-9-0, S-12-12-0" })
                        .addSection()
                        .addRow("Identifikátor (PID)")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        disabled: true,
                    })
                        .addRow("Variabilní symbol")
                        .addField("gstringbox", {
                        name: "vs",
                        disabled: true,
                    })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        disabled: true,
                    })
                        .addSection()
                        .addRow("Poplatník")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        disabled: true,
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            Ixp: that.Ixp,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            AktZnacka: that.Ixp,
                            DuvodHledaniTxt: "Detail kontroly případu"
                        },
                    }))
                        //.addRow("Poplatník")
                        //.addField("gstringbox", {
                        //    name: "esu_txt",
                        //    disabled: true,
                        //    rows: 2,
                        //})
                        //.addRow("IČO")
                        //.addField("gstringbox", {
                        //    name: "ico_esu",
                        //    disabled: true,
                        //})
                        //.addRow("RČ")
                        //.addField("gstringbox", {
                        //    name: "rc_esu",
                        //    disabled: true,
                        //    validators: [new Gordic.Validators.RodneCislo({})]
                        //})
                        //.addRow("Název")
                        //.addField("gstringbox", {
                        //    name: "nazev_esu",
                        //    disabled: true,
                        //})
                        .addSection()
                        .addRow({ label: "Datum kontroly", required: true })
                        .addField("gdatebox", {
                        format: "dd.MM.yyyy",
                        name: "dat_kontr",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        disabled: !that.NovaKontrola,
                    })
                        .addRow({ label: "Typ kontroly", required: true })
                        .addField("gselectbox", Gordic.Prefabs.Select.typKontroly(), {
                        name: "typ_kont",
                        model: "model.typ_kont=value.typ_kont",
                        flag: "required",
                        defaultValue: { typ_kont: 0 },
                    })
                        .addSection()
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka"
                    })
                        .addRow()
                        .addField("gcheck", WebClient.Common.Prefabs.Checkbox(), {
                        name: "provedeno",
                        label: "Provedeno",
                        initialValue: false,
                        emptyValue: null,
                    });
                    that.defaultForm = $.newDiv()
                        .appendTo(that.element)
                        .gform("createFrom", kontrolaForm);
                }
                ok() {
                    const that = this;
                    if (!this.defaultForm.gform("isValid"))
                        return;
                    if (!this.defaultForm.gform("hasChanged"))
                        return that.showFlash({ content: "Žádné údaje se nezměnily, není nutné nic ukládat!", state: "warning", id: "jinyTypPohledavkyFlash" });
                    that.beginOperation("Ukládám kontrolu...");
                    let dto = this.data;
                    this.defaultForm.findFields().gfield("model", "collect", dto);
                    let req = rq => {
                        return {
                            rq: { Data: dto }
                        };
                    };
                    let task = this.NovaKontrola ? Gordic.Isl.PripadKontrola.create(req) : Gordic.Isl.PripadKontrola.update(req);
                    //Common.Base.ProcessResponse(task.get(), this, true);
                    task.get()
                        .done(function (ret) {
                        that.endOperation();
                        that.dialogs.messageBox("Uloženo", "Kontrola byla úspěšně uložena", [GDlg.mbbOk], "g-state-success", 280, 150)
                            .on("close", function (ev) {
                            that.close(true);
                        });
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (typ === "exception") {
                            obj.handled = true;
                            that.endOperation();
                            return that.dialogs.error("Chyba", obj.baseMessage);
                        }
                    });
                }
            };
            GDetailKontroly = __decorate([
                Decorators.gcontent
            ], GDetailKontroly);
            WebClient.GDetailKontroly = GDetailKontroly;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEtvbnRyb2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbEtvbnRyb2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBc1FmO0FBdFFELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXNRbkI7SUF0UWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXNRN0I7UUF0UW9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7OztlQU9HO1lBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBa0I3QyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQy9CLE9BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRTs0QkFDckMsT0FBTztnQ0FDSCxJQUFJLEVBQUU7b0NBQ0YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2lDQUNoQjs2QkFDSixDQUFBO3dCQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTt3QkFDUixDQUFDOzRCQUNELE9BQUEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQ3pCLE9BQU87b0NBQ0gsSUFBSSxFQUFFO3dDQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzt3Q0FDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUNBQzNCO2lDQUNKLENBQUM7NEJBQ04sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBRWIsSUFBSSxDQUFDLGdCQUFn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RUFBRSxVQUFVLEVBQUU7NEJBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JCLENBQUMsQ0FBQyxDQUFDO29CQUVYLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUc7d0JBQzNCLElBQUksR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUFDOzRCQUN0QixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3hELENBQUM7b0JBRUwsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQTRDSixDQUFBO1lBM1BZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQTJQM0I7WUEzUFkseUJBQWUsa0JBMlAzQixDQUFBO1FBQ0wsQ0FBQyxFQXRRb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc1E3QjtJQUFELENBQUMsRUF0UWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNRbkI7QUFBRCxDQUFDLEVBdFFTLE1BQU0sS0FBTixNQUFNLFFBc1FmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxLb250cm9seS50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHMgZGV0YWlsZW0ga29udHJvbHkgKGRldGFpbCBhIHZ5dHZvxZllbsOtKSAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjItMDEtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogUMWYRUhMRUQgS09OVFJPTCBcclxuICAgICAqIE9rbm8gcyBkZXRhaWxlbSBrb250cm9seSAoZGV0YWlsIGEgdnl0dm/FmWVuw60pXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICAgICAqIEBjb3B5cmlnaHQgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2XHJcbiAgICAgKiBAY3JlYXRlZCAyMDIyLTAxLTEzICBcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0wMy0yMSAgICAgIFxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxLb250cm9seSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8qKiBUaXR1bGVrIG9rbmEgKi9cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBJZGVudGlmaWthY2UgcMWZw61wYWR1ICovXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERhdHVtIGtvbnRyb2x5ICovXHJcbiAgICAgICAgRGF0S29udHI6IERhdGU7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFVyxI11amUgcmXFvmltIG90ZXbFmWVuw60gb2tuYSBcclxuICAgICAgICAgKiB0cnVlIC0gbm92w6Ega29udHJvbGFcclxuICAgICAgICAgKiBmYWxzZSAtIGVkaXRhY2UgZXhpc3R1asOtY8OtIGtvbnRyb2x5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTm92YUtvbnRyb2xhOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBEYXRhIGRldGFpbHUga29udHJvbHkgKi9cclxuICAgICAgICBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcSA9ICh0aGF0LkRhdEtvbnRyID09IG51bGwpID9cclxuICAgICAgICAgICAgICAgIElzbC5QcmlwYWRLb250cm9sYS5yZWFkRGV0YWlsSGVhZGVyKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgIElzbC5QcmlwYWRLb250cm9sYS5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X2tvbnRyOiB0aGF0LkRhdEtvbnRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YSA9IHsgaXhwOiB0aGF0Lkl4cCB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXEuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhhdC52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiZGRwRGV0YWlsS29udHJvbHlGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuZGF0YSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZShmYWxzZSk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBrb250cm9sYUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcERldGFpbEtvbnRyb2x5Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTFTMSwgTC0zLTktMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciAoUElEKVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWYXJpYWJpbG7DrSBzeW1ib2xcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3BsYXRuw61rXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1O2VzdV9kaWM9ZGljO21vZGVsLmxpYz12YWx1ZS5saWM7bW9kZWwucG9yX3phc3Q9dmFsdWUucG9yX3phc3RcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIkRldGFpbCBrb250cm9seSBwxZnDrXBhZHVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pIGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJQb3BsYXRuw61rXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJlc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHJvd3M6IDIsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJJxIxPXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpY29fZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIlLEjFwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicmNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUm9kbmVDaXNsbyh7fSldXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJOw6F6ZXZcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIm5hemV2X2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIGtvbnRyb2x5XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcImRkLk1NLnl5eXlcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9rb250clwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5Ob3ZhS29udHJvbGEsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBrb250cm9seVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBLb250cm9seSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfa29udFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9rb250PXZhbHVlLnR5cF9rb250XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogeyB0eXBfa29udDogMCB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIENvbW1vbi5QcmVmYWJzLkNoZWNrYm94KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb3ZlZGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlByb3ZlZGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwga29udHJvbGFGb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2hvd0ZsYXNoKHsgY29udGVudDogXCLFvcOhZG7DqSDDumRhamUgc2UgbmV6bcSbbmlseSwgbmVuw60gbnV0bsOpIG5pYyB1a2zDoWRhdCFcIiwgc3RhdGU6IFwid2FybmluZ1wiLCBpZDogXCJqaW55VHlwUG9obGVkYXZreUZsYXNoXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJVa2zDoWTDoW0ga29udHJvbHUuLi5cIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBycTogeyBEYXRhOiBkdG8gfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSB0aGlzLk5vdmFLb250cm9sYSA/IElzbC5QcmlwYWRLb250cm9sYS5jcmVhdGUocmVxKSA6IElzbC5QcmlwYWRLb250cm9sYS51cGRhdGUocmVxKTtcclxuICAgICAgICAgICAgLy9Db21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRhc2suZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiVWxvxb5lbm9cIiwgXCJLb250cm9sYSBieWxhIMO6c3DEm8WhbsSbIHVsb8W+ZW5hXCIsIFtHRGxnLm1iYk9rXSwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMjgwLCAxNTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9va1N0YXJlKCkge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHZhciBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkS29udHJvbGFEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgLy8gICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcImRkcERldGFpbEtvbnRyb2x5Rm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG4gICAgICAgIC8vICAgIGR0by5peHAgPSB0aGF0Lkl4cDtcclxuICAgICAgICAvLyAgICBkdG8uS29udHJvbGFFeGlzdGVuY2UgPSB0aGF0Lk5vdmFLb250cm9sYTtcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIGVkaXQgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiZGRwRGV0YWlsS29udHJvbHlGb3JtXCIpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuXHJcbiAgICAgICAgLy8gICAgaWYgKGVkaXQpIHsgLy8gbsSbY28gc2Ugem3Em25pbG8gbmVibyBqZSB6w6F6bmFtIHpydcWhZW4sIHTDrW0gaG8gemFzZSB6YWt0aXZuw61tXHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQudWxveihkdG8pO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgLy90aGF0LnNob3dGbGFzaChcIsW9w6FkbsOpIMO6ZGFqZSBzZSBuZXptxJtuaWx5LCBuZW7DrSBudXRuw6kgbmljIHVrbMOhZGF0IVwiLCBcImctc3RhdGUtd2FybmluZ1wiKTtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBjb250ZW50OiBcIsW9w6FkbsOpIMO6ZGFqZSBzZSBuZXptxJtuaWx5LCBuZW7DrSBudXRuw6kgbmljIHVrbMOhZGF0IVwiLCBzdGF0ZTogXCJ3YXJuaW5nXCIsIGlkOiBcImppbnlUeXBQb2hsZWRhdmt5Rmxhc2hcIn0pO1xyXG5cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSB1bG96KHBhcmFtczogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0bykge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oKVxyXG4gICAgICAgIC8vICAgIHRoYXQuaXNsLlByZWhsZWRLb250cm9sLnVwcmF2Vnl0dm9yS29udHJvbHUocnEgPT4geyByZXR1cm4geyBkYXRhOiBwYXJhbXMgfSB9KVxyXG4gICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJabcSbbnkgw7pzcMSbxaFuxJsgdWxvxb5lbnlcIiwgXCJnLXN0YXRlLXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIlVsb8W+ZW5vXCIsIFwiS29udHJvbGEgYnlsYSDDunNwxJvFoW7EmyB1bG/FvmVuYVwiLCBbR0RsZy5tYmJPa10sIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDI4MCwgMTUwKTsgLy9UT0RPIG1vxb5uw6EgamXFoXTEmyB1cHJhdml0IGhsw6HFoWt1IG8gw7pzcMSbxaFuw6ltIHVsb8W+ZW7DrT8gTmVibyBqaSBvZGVicmF0P1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5jbG9zZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG59Il19