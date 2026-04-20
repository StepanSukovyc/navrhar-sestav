"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GROBHromParam.ts                       </Name>
//    <Description> Okno zadání parametrů pro hromadnou akci ROB                </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-15                                                  </Created>
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
            let GROBHromParam = class GROBHromParam extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    // menubar, commandbar akce
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "OK",
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
                    that.commandBar(this.actions.createBar(["actSave!", "actClose"]));
                    that.createForm();
                    var filter = that.robHromParamUserSettings(null);
                    that.findFields().gfield("model", "apply", filter);
                }
                //#region Inicilizace/Obsluha uživatelských nastavení
                /**
                 * Získá uživatelská nastavení pro hromadné založení nových případů
                 * @param ixsDsa
                 * @returns
                 */
                robHromParamUserSettings(ixsDsa) {
                    var that = this;
                    var filter = {};
                    if (that.typZadani == "1") {
                        // Pro typ zadání "1" (úbytky) se načítají pouze společná nastavení
                        filter.ktg_upo = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.ktg_upo`) ?? 100;
                        filter.zp_castka = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.zp_castka`) ?? 0;
                        filter.zp_zao = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.zp_zao`) ?? 0;
                        filter.dat_vzniku = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.dat_vzniku`) ?? 0;
                        // rc_add není potřeba pro typ zadání "1"
                        return filter;
                    }
                    // Pro typ zadání "0" (přírůstky) se načítají nastavení včetně šablony
                    if (ixsDsa != null)
                        filter.ixs_dsa = ixsDsa;
                    else
                        filter.ixs_dsa = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}${that.typPhl}.ixs_dsa`) ?? "";
                    if (filter.ixs_dsa != null) {
                        filter.ktg_upo = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${filter.ixs_dsa}${that.typZadani}.ktg_upo`) ?? 100;
                        filter.zp_castka = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${filter.ixs_dsa}${that.typZadani}.zp_castka`) ?? 0;
                        filter.zp_zao = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${filter.ixs_dsa}${that.typZadani}.zp_zao`) ?? 0;
                        filter.dat_vzniku = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${filter.ixs_dsa}${that.typZadani}.dat_vzniku`) ?? 0;
                        filter.rc_add = that.globalSettings?.get(`Global.Ddp.ROBSettings.rob_hrom_param.${filter.ixs_dsa}${that.typZadani}.rc_add`) ?? 10;
                    }
                    else { // seems useless, but just in case
                        filter.ktg_upo = 100;
                        filter.zp_castka = 0;
                        filter.zp_zao = 0;
                        filter.dat_vzniku = 0;
                        filter.rc_add = 10;
                    }
                    return filter;
                }
                /**
                 * Při změně šablony se načtou uživatelská nastavení ostatních polí pro zvolenou šablonu
                 * @param ixsDsa
                 */
                robHromParamUserSettingsChange(ixsDsa) {
                    var that = this;
                    var filter = that.robHromParamUserSettings(ixsDsa.ixs_dsa);
                    that.aktualniIxsDsa = filter.ixs_dsa;
                    var form = that.findForms("robHromParamForm");
                    form.findFields().gfield("model", "apply", filter);
                }
                /**
                 * Uloží uživatelská nastavení pro hromadné založení nových případů
                 * @param model
                 */
                robHromParamUserSettingsSave(model) {
                    var that = this;
                    if (that.typZadani == "1") {
                        // Pro typ zadání "1" (úbytky) se ukládají pouze společná nastavení bez ixs_dsa
                        that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.ktg_upo`, model.ktg_upo);
                        that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.zp_castka`, model.zp_castka);
                        that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.zp_zao`, model.zp_zao);
                        that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}.dat_vzniku`, model.dat_vzniku);
                        return;
                    }
                    // Pro typ zadání "0" (přírůstky) se ukládají nastavení včetně šablony
                    if (model.ixs_dsa == null)
                        return;
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${that.typZadani}${that.typPhl}.ixs_dsa`, model.ixs_dsa);
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${model.ixs_dsa}${that.typZadani}.ktg_upo`, model.ktg_upo);
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${model.ixs_dsa}${that.typZadani}.zp_castka`, model.zp_castka);
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${model.ixs_dsa}${that.typZadani}.zp_zao`, model.zp_zao);
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${model.ixs_dsa}${that.typZadani}.dat_vzniku`, model.dat_vzniku);
                    that.globalSettings?.set(`Global.Ddp.ROBSettings.rob_hrom_param.${model.ixs_dsa}${that.typZadani}.rc_add`, model.rc_add);
                }
                createForm() {
                    var that = this;
                    var typZadani = that.typZadani;
                    var form = new Gordic.Forms.Form({ name: "robHromParamForm", layoutDescriptor: "L1M1S1 LMS-12-12-0" });
                    // Pokud je typ zadání 0 (vyřízení karet - přírůstků), zobrazí se výběr šablony
                    if (typZadani == "0") {
                        form.addRow("Šablona")
                            .addField("gselectbox", Gordic.Prefabs.Select.ddpsdsa(), {
                            name: "ixs_dsa",
                            model: "model.ixs_dsa=value.ixs_dsa;",
                            modelDefaults: { typ_phl: that.typPhl, ixp_den: that.ixpDen },
                            flag: "required",
                            validators: [new Gordic.Validators.Required()],
                            change: (ev, field) => {
                                if (field.value != null && that.aktualniIxsDsa != field.value.ixs_dsa)
                                    that.robHromParamUserSettingsChange(field.value);
                            }
                        });
                    }
                    form.addRow("Způsob výpočtu částky předpisů")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpctgp(), {
                        name: "zp_castka",
                        model: "model.zp_castka=value.pri_tgp;",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Způsob zaokrouhlení částky")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpZaokrouhleni(), {
                        name: "zp_zao",
                        model: "model.zp_zao = value.typ_zcg",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Kategorie pohybu předpisů")
                        .addField("gselectbox", Gordic.Prefabs.Select.omezenePredpisy(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("Určení data vzniku předpisů")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcdvg(), {
                        name: "dat_vzniku",
                        model: "model.dat_vzniku=value.zp_dvg",
                        flag: "required",
                        validators: [new Gordic.Validators.Required()]
                    });
                    if (typZadani == "0") {
                        form.addRow("RČ převzít i do") // způsob přenosu RČ z ROB na případ
                            .addField("gselectbox", Gordic.Prefabs.Select.ddpcsdu(), {
                            name: "rc_add",
                            model: "model.rc_add=value.typ_sdu",
                            flag: "required",
                            validators: [new Gordic.Validators.Required()]
                        });
                    }
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                }
                ok() {
                    var that = this;
                    var model = {};
                    that.findFields().gfield("model", "collect", model);
                    //uložit uživatelská nastavení
                    that.robHromParamUserSettingsSave(model);
                    // vrátit hodnoty formuláře
                    that.close({ model: model });
                }
            };
            GROBHromParam = __decorate([
                Decorators.gcontent
            ], GROBHromParam);
            WebClient.GROBHromParam = GROBHromParam;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JPQkhyb21QYXJhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdST0JIcm9tUGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0F3TWY7QUF4TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBd01uQjtJQXhNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBd003QjtRQXhNb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBVzNDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQiwyQkFBMkI7b0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsSUFBSTs0QkFDYixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQzt5QkFDakMsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDLENBQUM7eUJBQ3BDLENBQUM7cUJBQ0wsQ0FBQyxDQUFBO29CQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsRSxJQUFJLENB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IHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdST0JIcm9tUGFyYW0udHMgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHphZMOhbsOtIHBhcmFtZXRyxa8gcHJvIGhyb21hZG5vdSBha2NpIFJPQiAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTEwLTE1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1JPQkhyb21QYXJhbSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8qKiBUeXAgcG9obGVkw6F2a3kgICovXHJcbiAgICAgICAgdHlwUGhsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEtuaWhhICovXHJcbiAgICAgICAgaXhwRGVuOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFVyxI11amUgemRhIHNlIGplZG7DoSBvIHDFmWlkw6Fuw60ga2FyZXQgLSBwxZnDrXJ1c3Rrxa8gKDApIG5lYm8gdnnFmcOtemVuw60ga2FyZXQgLSDDumJ5dGvFryAoMSkgKi9cclxuICAgICAgICB0eXBaYWRhbmk6IHN0cmluZztcclxuICAgICAgICAvKiogQWt0dcOhbG7DrSBpeHNfZHNhLCB6YW1lenVqZSBvcGFrb3ZhbsOpaG8gbmHEjcOtdMOhbsOtIHDFmWkgYWtjaSAnY2hhbmdlJyAqL1xyXG4gICAgICAgIGFrdHVhbG5pSXhzRHNhOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG1lbnViYXIsIGNvbW1hbmRiYXIgYWtjZVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKSB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKSB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gdGhhdC5yb2JIcm9tUGFyYW1Vc2VyU2V0dGluZ3MobnVsbCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGZpbHRlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEluaWNpbGl6YWNlL09ic2x1aGEgdcW+aXZhdGVsc2vDvWNoIG5hc3RhdmVuw61cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhIHXFvml2YXRlbHNrw6EgbmFzdGF2ZW7DrSBwcm8gaHJvbWFkbsOpIHphbG/FvmVuw60gbm92w71jaCBwxZnDrXBhZMWvXHJcbiAgICAgICAgICogQHBhcmFtIGl4c0RzYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcm9iSHJvbVBhcmFtVXNlclNldHRpbmdzKGl4c0RzYTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC50eXBaYWRhbmkgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBybyB0eXAgemFkw6Fuw60gXCIxXCIgKMO6Ynl0a3kpIHNlIG5hxI3DrXRhasOtIHBvdXplIHNwb2xlxI1uw6EgbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmt0Z191cG8gPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHt0aGF0LnR5cFphZGFuaX0ua3RnX3Vwb2ApID8/IDEwMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci56cF9jYXN0a2EgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHt0aGF0LnR5cFphZGFuaX0uenBfY2FzdGthYCkgPz8gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci56cF96YW8gPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHt0aGF0LnR5cFphZGFuaX0uenBfemFvYCkgPz8gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5kYXRfdnpuaWt1ID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7dGhhdC50eXBaYWRhbml9LmRhdF92em5pa3VgKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgLy8gcmNfYWRkIG5lbsOtIHBvdMWZZWJhIHBybyB0eXAgemFkw6Fuw60gXCIxXCJcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFBybyB0eXAgemFkw6Fuw60gXCIwXCIgKHDFmcOtcsWvc3RreSkgc2UgbmHEjcOtdGFqw60gbmFzdGF2ZW7DrSB2xI1ldG7EmyDFoWFibG9ueVxyXG4gICAgICAgICAgICBpZiAoaXhzRHNhICE9IG51bGwpIGZpbHRlci5peHNfZHNhID0gaXhzRHNhO1xyXG4gICAgICAgICAgICBlbHNlIGZpbHRlci5peHNfZHNhID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7dGhhdC50eXBaYWRhbml9JHt0aGF0LnR5cFBobH0uaXhzX2RzYWApID8/IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLml4c19kc2EgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmt0Z191cG8gPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHtmaWx0ZXIuaXhzX2RzYX0ke3RoYXQudHlwWmFkYW5pfS5rdGdfdXBvYCkgPz8gMTAwO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnpwX2Nhc3RrYSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChgR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfaHJvbV9wYXJhbS4ke2ZpbHRlci5peHNfZHNhfSR7dGhhdC50eXBaYWRhbml9LnpwX2Nhc3RrYWApID8/IDA7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuenBfemFvID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7ZmlsdGVyLml4c19kc2F9JHt0aGF0LnR5cFphZGFuaX0uenBfemFvYCkgPz8gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5kYXRfdnpuaWt1ID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7ZmlsdGVyLml4c19kc2F9JHt0aGF0LnR5cFphZGFuaX0uZGF0X3Z6bmlrdWApID8/IDA7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIucmNfYWRkID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7ZmlsdGVyLml4c19kc2F9JHt0aGF0LnR5cFphZGFuaX0ucmNfYWRkYCkgPz8gMTA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIHNlZW1zIHVzZWxlc3MsIGJ1dCBqdXN0IGluIGNhc2VcclxuICAgICAgICAgICAgICAgIGZpbHRlci5rdGdfdXBvID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnpwX2Nhc3RrYSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuenBfemFvID0gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5kYXRfdnpuaWt1ID0gMDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5yY19hZGQgPSAxMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWkgem3Em27EmyDFoWFibG9ueSBzZSBuYcSNdG91IHXFvml2YXRlbHNrw6EgbmFzdGF2ZW7DrSBvc3RhdG7DrWNoIHBvbMOtIHBybyB6dm9sZW5vdSDFoWFibG9udVxyXG4gICAgICAgICAqIEBwYXJhbSBpeHNEc2FcclxuICAgICAgICAgKi9cclxuICAgICAgICByb2JIcm9tUGFyYW1Vc2VyU2V0dGluZ3NDaGFuZ2UoaXhzRHNhOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoYXQucm9iSHJvbVBhcmFtVXNlclNldHRpbmdzKGl4c0RzYS5peHNfZHNhKTtcclxuICAgICAgICAgICAgdGhhdC5ha3R1YWxuaUl4c0RzYSA9IGZpbHRlci5peHNfZHNhO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwicm9iSHJvbVBhcmFtRm9ybVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmaWx0ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvxb7DrSB1xb5pdmF0ZWxza8OhIG5hc3RhdmVuw60gcHJvIGhyb21hZG7DqSB6YWxvxb5lbsOtIG5vdsO9Y2ggcMWZw61wYWTFr1xyXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJvYkhyb21QYXJhbVVzZXJTZXR0aW5nc1NhdmUobW9kZWw6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC50eXBaYWRhbmkgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBybyB0eXAgemFkw6Fuw60gXCIxXCIgKMO6Ynl0a3kpIHNlIHVrbMOhZGFqw60gcG91emUgc3BvbGXEjW7DoSBuYXN0YXZlbsOtIGJleiBpeHNfZHNhXHJcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHt0aGF0LnR5cFphZGFuaX0ua3RnX3Vwb2AsIG1vZGVsLmt0Z191cG8pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxTZXR0aW5ncz8uc2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7dGhhdC50eXBaYWRhbml9LnpwX2Nhc3RrYWAsIG1vZGVsLnpwX2Nhc3RrYSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHt0aGF0LnR5cFphZGFuaX0uenBfemFvYCwgbW9kZWwuenBfemFvKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3M/LnNldChgR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfaHJvbV9wYXJhbS4ke3RoYXQudHlwWmFkYW5pfS5kYXRfdnpuaWt1YCwgbW9kZWwuZGF0X3Z6bmlrdSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFBybyB0eXAgemFkw6Fuw60gXCIwXCIgKHDFmcOtcsWvc3RreSkgc2UgdWtsw6FkYWrDrSBuYXN0YXZlbsOtIHbEjWV0bsSbIMWhYWJsb255XHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5peHNfZHNhID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3M/LnNldChgR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfaHJvbV9wYXJhbS4ke3RoYXQudHlwWmFkYW5pfSR7dGhhdC50eXBQaGx9Lml4c19kc2FgLCBtb2RlbC5peHNfZHNhKTtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxTZXR0aW5ncz8uc2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7bW9kZWwuaXhzX2RzYX0ke3RoYXQudHlwWmFkYW5pfS5rdGdfdXBvYCwgbW9kZWwua3RnX3Vwbyk7XHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3M/LnNldChgR2xvYmFsLkRkcC5ST0JTZXR0aW5ncy5yb2JfaHJvbV9wYXJhbS4ke21vZGVsLml4c19kc2F9JHt0aGF0LnR5cFphZGFuaX0uenBfY2FzdGthYCwgbW9kZWwuenBfY2FzdGthKTtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxTZXR0aW5ncz8uc2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7bW9kZWwuaXhzX2RzYX0ke3RoYXQudHlwWmFkYW5pfS56cF96YW9gLCBtb2RlbC56cF96YW8pO1xyXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbFNldHRpbmdzPy5zZXQoYEdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2hyb21fcGFyYW0uJHttb2RlbC5peHNfZHNhfSR7dGhhdC50eXBaYWRhbml9LmRhdF92em5pa3VgLCBtb2RlbC5kYXRfdnpuaWt1KTtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxTZXR0aW5ncz8uc2V0KGBHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9ocm9tX3BhcmFtLiR7bW9kZWwuaXhzX2RzYX0ke3RoYXQudHlwWmFkYW5pfS5yY19hZGRgLCBtb2RlbC5yY19hZGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHR5cFphZGFuaSA9IHRoYXQudHlwWmFkYW5pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInJvYkhyb21QYXJhbUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTEyLTEyLTBcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBva3VkIGplIHR5cCB6YWTDoW7DrSAwICh2ecWZw616ZW7DrSBrYXJldCAtIHDFmcOtcsWvc3Rrxa8pLCB6b2JyYXrDrSBzZSB2w71ixJtyIMWhYWJsb255XHJcbiAgICAgICAgICAgIGlmICh0eXBaYWRhbmkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwixaBhYmxvbmFcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcHNkc2EoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kc2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2RzYT12YWx1ZS5peHNfZHNhO1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERlZmF1bHRzOiB7IHR5cF9waGw6IHRoYXQudHlwUGhsLCBpeHBfZGVuOiB0aGF0Lml4cERlbiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBmaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLnZhbHVlICE9IG51bGwgJiYgdGhhdC5ha3R1YWxuaUl4c0RzYSAhPSBmaWVsZC52YWx1ZS5peHNfZHNhKSB0aGF0LnJvYkhyb21QYXJhbVVzZXJTZXR0aW5nc0NoYW5nZShmaWVsZC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJacMWvc29iIHbDvXBvxI10dSDEjcOhc3RreSBwxZllZHBpc8WvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBjdGdwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwX2Nhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnpwX2Nhc3RrYT12YWx1ZS5wcmlfdGdwO1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwxa9zb2IgemFva3JvdWhsZW7DrSDEjcOhc3RreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwWmFva3JvdWhsZW5pKCksIHsgLy9kZHBjemNnXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cF96YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC56cF96YW8gPSB2YWx1ZS50eXBfemNnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidSBwxZllZHBpc8WvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0Lm9tZXplbmVQcmVkcGlzeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVXLEjWVuw60gZGF0YSB2em5pa3UgcMWZZWRwaXPFr1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBjZHZnKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kYXRfdnpuaWt1PXZhbHVlLnpwX2R2Z1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBaYWRhbmkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwiUsSMIHDFmWV2esOtdCBpIGRvXCIpIC8vIHpwxa9zb2IgcMWZZW5vc3UgUsSMIHogUk9CIG5hIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBjc2R1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyY19hZGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucmNfYWRkPXZhbHVlLnR5cF9zZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9rKCkgeyAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy91bG/Fvml0IHXFvml2YXRlbHNrw6EgbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICB0aGF0LnJvYkhyb21QYXJhbVVzZXJTZXR0aW5nc1NhdmUobW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gdnLDoXRpdCBob2Rub3R5IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBtb2RlbDogbW9kZWwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==