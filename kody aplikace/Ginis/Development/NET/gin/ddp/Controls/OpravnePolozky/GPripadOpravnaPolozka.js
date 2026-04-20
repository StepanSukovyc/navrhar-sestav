"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadOpravnaPolozka.ts               </Name>
//    <Description> Okno s detailem Opravné položky případu                     </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-10                                                  </Created>
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
            let GPripadOpravnaPolozka = class GPripadOpravnaPolozka extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S
                //TODO: cct_ex_base: tbl_opravne_polozky
                //TODO: cdlg_ex_vyber: dlg_DetailOpravnePolozky
                //! místo v guptě kde to najdu !!!!!!
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createCommandBar();
                    that.createForm();
                    // Dosazení hodnot při editaci řešeno při vytvoření v rámci initValue
                    //if (that.Edit) {
                    //    //if (that.DetailAccess == 1) {
                    //    //    return that.dialogs.error("Chyba", "Účetní pohyb je již zaúčtovaný nebo v účtování a nelze jej již změnit!")
                    //    //        .on("close", () => {
                    //    //            that.close();
                    //    //        });
                    //    //}
                    //    //else if (that.DetailAccess == 2) {
                    //    //    return that.dialogs.error("Chyba", "Opravná položka již byla zrušena!")
                    //    //        .on("close", () => {
                    //    //            that.close();
                    //    //        });
                    //    //} else {
                    //        that.findForms().findFields().gfield("model", "apply", that.model, { initialValues: true });
                    //        that.defaultForm!.findFields().gfield("model", "apply", that.model, { initialValues: true });
                    //    //}
                    //}
                    if (!that.Edit) {
                        that.model = {};
                    }
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    let form = new Gordic.Forms.Form({ name: "ddpDetailOprPolozkyForm", layoutDescriptor: "L2M1S1, L-3-9-0, M-3-9-0, S-12-12-0" });
                    form.addSection()
                        .addRow("Identifikátor, Řádek")
                        .addField("gstringbox", "w-8", {
                        name: "ixp",
                        initialValue: that.Ixp,
                        disabled: true, //! PK - nemělo by být ručně editovatelné
                    })
                        .addField("gnumberbox", "w-4", {
                        name: "radek_uhr",
                        initialValue: that.Radek_uhr,
                        disabled: true, //! PK - nemělo by být ručně editovatelné
                    })
                        .addSection()
                        .addRow("Částka")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c",
                        flag: "required",
                        initialValue: that.Edit ? that.model.c : 0,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Datum vzniku, splatnosti")
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku",
                        initialValue: that.Edit ? that.model.dat_vzniku : new Date(),
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl",
                        initialValue: that.Edit ? that.model.dat_spl : new Date(),
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        initialValue: that.Edit ? that.model.poznamka : "",
                    })
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: "popis",
                        initialValue: that.Edit ? that.model.popis : "",
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        helperColumns: ["ktg_upo", "ktg_upo_txt"],
                        serverFilters: {
                            ktg_upo: [1210, 1215, 1211, 1216], //"1210, 1215, 1211, 1216",
                        },
                        initialValue: that.Edit ? { ktg_upo: that.model.ktg_upo } : { ktg_upo: 1210 },
                        dropdown: true,
                    });
                    //$.newDiv().appendTo(that.element).gform("createFrom", form);
                    that.defaultForm = $.newDiv()
                        .appendTo(that.element)
                        .gform("createFrom", form);
                    return form;
                }
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Ok",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                                //.done((retData) => {
                                //    that.close(retData);
                                //}) // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(true); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                //#endregion S E S T A V E N Í   O K N A
                ok() {
                    const that = this;
                    if (!this.defaultForm.gform("isValid"))
                        return;
                    that.element.findForms("ddpDetailOprPolozkyForm").findFields().gfield("model", "collect", that.model);
                    that.model.penKalk = false;
                    if (!that.Edit) { // --- jedná se o nový záznam
                        that.model.editace = false;
                        that.model.radek_uhr = null;
                    }
                    else {
                        that.model.editace = true;
                    }
                    if (that.model.c == new Decimal(0)) {
                        that.endOperation();
                        that.dialogs.error("Chyba", "Nulovou částku opravné položky nelze uložit!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("zakladniInfoForm").findFields("c").gfield('focus');
                            return; // def.reject();
                        });
                    }
                    else
                        WebClient.Common.Base.ProcessResponse(that.isl.OpravnePolozky.ulozOpravnouPolozku(rq => { return { rq: { Data: that.model } }; }).get(), this, true, false);
                    //that.isl.OpravnePolozky.ulozOpravnouPolozku(rq => { return { rq: { Data: that.model } }; }).get()
                    //.done((ret) => {
                    //    //if (ret.Success == true) {
                    //        //that.showFlash("Opravná položka se úspěšně uložila", "success")
                    //        //that.dialogs.messageBox("Uloženo", "Opravná položka se úspěšně uložila", [GDlg.mbbOk], GDlg.mbiSuccess)
                    //        //    .on("close", () => {
                    //        //        that.close()
                    //        //    })
                    //    //} else {
                    //    //    ret.Messages.
                    //    //}
                    //})
                    //.fail(function (jqXHR, typ, obj) {
                    //    if (typ === "exception") {
                    //        obj.handled = true;
                    //        return that.dialogs.error("Chyba", obj.baseMessage);
                    //        //return that.dialogs.confirm(obj.baseMessage + "</br> Přejete si kontrolu přepsat?").createDialogPromise("yes").then(function () { return that.uloz($.extend(params, params.KontrolaExistence = false, { confirm: true })); });
                    //    }
                    //});
                }
            };
            GPripadOpravnaPolozka = __decorate([
                Decorators.gcontent
            ], GPripadOpravnaPolozka);
            WebClient.GPripadOpravnaPolozka = GPripadOpravnaPolozka;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZE9wcmF2bmFQb2xvemthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByaXBhZE9wcmF2bmFQb2xvemthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBOE9mO0FBOU9ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThPbkI7SUE5T2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThPN0I7UUE5T29CLFdBQUEsU0FBUztZQUUxQixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLE9BQUEsWUFBWTtnQkFzQm5ELGdDQUFnQztnQkFFaEMsd0NBQXdDO2dCQUN4QywrQ0FBK0M7Z0JBQy9DLHFDQUFxQztnQkFFckM7OzttQkFHRztnQkFDSCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIscUVBQXFFO29CQUNyRSxrQkFBa0I7b0JBQ2xCLHFDQUFxQztvQkFDckMsd0hBQXdIO29CQUN4SCxvQ0FBb0M7b0JBQ3BDLGlDQUFpQztvQkFDakMsbUJBQW1CO29CQUNuQixTQUFTO29CQUNULDBDQUEwQztvQkFDMUMsbUZBQW1GO29CQUNuRixvQ0FBb0M7b0JBQ3BDLGlDQUFpQztvQkFDakMsbUJBQW1CO29CQUNuQixnQkFBZ0I7b0JBQ2hCLHNHQUFzRztvQkFDdEcsdUdBQXVHO29CQUN2RyxTQUFTO29CQUNULEdBQUc7b0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsQ0FB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MU8sT0FBTztvQkFDUCxLQUFLO2dCQUNqQixDQUFDO2FBMkJKLENBQUE7WUEzT1kscUJBQXFCO2dCQURqQyxVQUFVLENBQUMsUUFBUTtlQUNQLHFCQUFxQixDQTJPakM7WUEzT1ksK0JBQXFCLHdCQTJPakMsQ0FBQTtRQUNMLENBQUMsRUE5T29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQThPN0I7SUFBRCxDQUFDLEVBOU9nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE4T25CO0FBQUQsQ0FBQyxFQTlPUyxNQUFNLEtBQU4sTUFBTSxRQThPZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkT3ByYXZuYVBvbG96a2EudHMgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBzIGRldGFpbGVtIE9wcmF2bsOpIHBvbG/Fvmt5IHDFmcOtcGFkdSAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmlwYWRPcHJhdm5hUG9sb3prYSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLy8jcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7ICAgICAgICBcclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm9txJtubsOhIHBybyB2w71ixJtyIGVkaXRhY2Uvdnl0dm/FmWVuw60gcMWZZWRwaXN1XHJcbiAgICAgICAgICogVHJ1ZSA9IGVkaXRhY2UgcMWZZWRwaXN1XHJcbiAgICAgICAgICogRmFsc2UgPSBub3bDvSBwxZllZHBpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEVkaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIE5hc1xyXG4gICAgICAgIC8vICogMCA9IHZwb8WZw6Fka3UgXHJcbiAgICAgICAgLy8gKiAxID0gIWdmX0plUG9oeWJQcmVkcGlzdU5lWmF1Y3RvdmFueSggaXBfaXhwLGlwX3JhZGVrX3VociApXHJcbiAgICAgICAgLy8gKiAyID0gZ2ZfVnJhdFN0YXZQcmVkcGlzdShpcF9peHAsaXBfcmFkZWtfdWhyICkhPTMwXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL0RldGFpbEFjY2VzczogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEVE8gb3ByYXZuw6kgcG9sb8W+a3kgKHDFmWVkcGlzdSlcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBtb2RlbDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvO1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTXHJcblxyXG4gICAgICAgIC8vVE9ETzogY2N0X2V4X2Jhc2U6IHRibF9vcHJhdm5lX3BvbG96a3lcclxuICAgICAgICAvL1RPRE86IGNkbGdfZXhfdnliZXI6IGRsZ19EZXRhaWxPcHJhdm5lUG9sb3preVxyXG4gICAgICAgIC8vISBtw61zdG8gdiBndXB0xJsga2RlIHRvIG5hamR1ICEhISEhIVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vIERvc2F6ZW7DrSBob2Rub3QgcMWZaSBlZGl0YWNpIMWZZcWhZW5vIHDFmWkgdnl0dm/FmWVuw60gdiByw6FtY2kgaW5pdFZhbHVlXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuRWRpdCkge1xyXG4gICAgICAgICAgICAvLyAgICAvL2lmICh0aGF0LkRldGFpbEFjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIsOaxI1ldG7DrSBwb2h5YiBqZSBqacW+IHphw7rEjXRvdmFuw70gbmVibyB2IMO6xI10b3bDoW7DrSBhIG5lbHplIGplaiBqacW+IHptxJtuaXQhXCIpXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgICAgICAvLyAgICAvL2Vsc2UgaWYgKHRoYXQuRGV0YWlsQWNjZXNzID09IDIpIHtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiT3ByYXZuw6EgcG9sb8W+a2EgamnFviBieWxhIHpydcWhZW5hIVwiKVxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICBcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEEgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZSBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUZvcm0oKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRm9ybXMuRm9ybX0gLSBWcmFjw60gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBEZXRhaWxPcHJQb2xvemt5Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTFTMSwgTC0zLTktMCwgTS0zLTktMCwgUy0xMi0xMi0wXCIgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3IsIMWYw6FkZWtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8hIFBLIC0gbmVtxJtsbyBieSBiw710IHJ1xI1uxJsgZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfdWhyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LlJhZGVrX3VocixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8hIFBLIC0gbmVtxJtsbyBieSBiw710IHJ1xI1uxJsgZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LkVkaXQgPyB0aGF0Lm1vZGVsLmMgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHZ6bmlrdSwgc3BsYXRub3N0aVwiKSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuRWRpdCA/IHRoYXQubW9kZWwuZGF0X3Z6bmlrdSA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5FZGl0ID8gdGhhdC5tb2RlbC5kYXRfc3BsIDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuRWRpdCA/IHRoYXQubW9kZWwucG96bmFta2EgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3Bpc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuRWRpdCA/IHRoYXQubW9kZWwucG9waXMgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvO21vZGVsLmt0Z191cG9fdHh0PXZhbHVlLmt0Z191cG9fdHh0XCIsIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImt0Z191cG9cIiwgXCJrdGdfdXBvX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IFsxMjEwLCAxMjE1LCAxMjExLCAxMjE2XSwvL1wiMTIxMCwgMTIxNSwgMTIxMSwgMTIxNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LkVkaXQgPyB7IGt0Z191cG86IHRoYXQubW9kZWwua3RnX3VwbyB9IDogeyBrdGdfdXBvOiAxMjEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBjb21tYW5kIGJhcnUgcyB0bGHEjcOtdGt5IHBybyB1bG/FvmVuw60gYSB6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ29tbWFuZEJhcigpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5kb25lKChyZXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmNsb3NlKHJldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KSAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSh0cnVlKTsgfSAvLyBaYXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcImRkcERldGFpbE9wclBvbG96a3lGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgIHRoYXQubW9kZWwucGVuS2FsayA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LkVkaXQpIHsgLy8gLS0tIGplZG7DoSBzZSBvIG5vdsO9IHrDoXpuYW1cclxuICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuZWRpdGFjZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5yYWRla191aHIgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5lZGl0YWNlID0gdHJ1ZTsgXHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5jID09IG5ldyBEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOdWxvdm91IMSNw6FzdGt1IG9wcmF2bsOpIHBvbG/Fvmt5IG5lbHplIHVsb8W+aXQhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcInpha2xhZG5pSW5mb0Zvcm1cIikuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRoYXQuaXNsLk9wcmF2bmVQb2xvemt5LnVsb3pPcHJhdm5vdVBvbG96a3UocnEgPT4geyByZXR1cm4geyBycTogeyBEYXRhOiB0aGF0Lm1vZGVsIH0gfTsgfSkuZ2V0KCksIHRoaXMsIHRydWUsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLy90aGF0LmlzbC5PcHJhdm5lUG9sb3preS51bG96T3ByYXZub3VQb2xvemt1KHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogdGhhdC5tb2RlbCB9IH07IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9pZiAocmV0LlN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwiT3ByYXZuw6EgcG9sb8W+a2Egc2Ugw7pzcMSbxaFuxJsgdWxvxb5pbGFcIiwgXCJzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJVbG/FvmVub1wiLCBcIk9wcmF2bsOhIHBvbG/FvmthIHNlIMO6c3DEm8WhbsSbIHVsb8W+aWxhXCIsIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlTdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICB0aGF0LmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcmV0Lk1lc3NhZ2VzLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAvLy5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKG9iai5iYXNlTWVzc2FnZSArIFwiPC9icj4gUMWZZWpldGUgc2kga29udHJvbHUgcMWZZXBzYXQ/XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnVsb3ooJC5leHRlbmQocGFyYW1zLCBwYXJhbXMuS29udHJvbGFFeGlzdGVuY2UgPSBmYWxzZSwgeyBjb25maXJtOiB0cnVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vc2V0V2luZG93TW9kZSgpIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICBpZiAoIXRoYXQuUmFkZWtfdWhyKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBpZiAoIXRoYXQuRWRpdCkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LnRpdGxlID0gYE5vdsOhIG9wcmF2bsOhIHBvbG/FvmthIHBybyBwxZnDrXBhZCAke3RoYXQuSXhwfWA7XHJcbiAgICAgICAgLy8gICAgICAgIGxldCBpbml0aWFsRHRvID0ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAvLyAgICAgICAgICAgIGM6IDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkYXRfdnpuaWt1OiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGF0X3NwbDogbmV3IERhdGUoKSxcclxuICAgICAgICAvLyAgICAgICAgICAgIHBvem5hbWthOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgcG9waXM6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBrdGdfdXBvOiAxMjEwLFxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuZmluZEZvcm1zKCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgaW5pdGlhbER0bywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC50aXRsZSA9IGBOYXN0YXZlbsOtIG9wcmF2bsOpIHBvbG/Fvmt5ICjFmcOhZGVrIMSNLiR7dGhhdC5SYWRla191aHJ9KSBwcm8gcMWZw61wYWQgJHt0aGF0Lkl4cH1gXHJcbiAgICAgICAgLy8gICAgICAgIC8vIGEgdGFkeSBuYcSNw61zdCBkYXRhIHogSVNMdS4uLlxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL31cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgfVxyXG59Il19