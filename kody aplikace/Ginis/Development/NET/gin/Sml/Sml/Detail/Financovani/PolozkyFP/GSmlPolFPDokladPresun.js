"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlPolFPDokladPresun.ts               </Name>
//    <Description> Content pro přesun prostředků z jedné položky FP na jinou   </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-30                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** Content pro přesun prostředků z jedné položky FP na jinou */
            let GSmlPolFPDokladPresun = class GSmlPolFPDokladPresun extends Gordic.GContentBase {
                closing() {
                    return this.changed;
                }
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    this.$form.findFields().gfield("model", "apply", this.data, { initialValues: true });
                }
                /** Vytvoření akcí*/
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: function (ev, ctx) {
                                if (!that.$form.gform("isValid")) {
                                    return;
                                }
                                var formData = {};
                                that.$form.findFields().gfield("model", "collect", formData);
                                this.setPending(that.isl.SmlFinPresun.presunCastky({
                                    ixp: that.data.ixp,
                                    cislo: that.data.cislo,
                                    rok: that.data.rok,
                                    ixp_cil: formData.ixp_cil,
                                    cislo_cil: formData.cislo_cil,
                                    c_pol_prev: formData.c_pol_prev,
                                    dat_zmena: that.data.dat_zmena
                                }).get().done(() => { that.changed = true; that.tryClose(); }));
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function (ev, ctx) {
                                this.setPending(that.tryClose());
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /** Vytvoření formuláře */
                createForm() {
                    var c_pol_prev_error = "";
                    var c_pol_afprev_error = "";
                    const data = this.data;
                    var form = new Gordic.Forms.Form({
                        name: "formPresunCastky",
                        layoutDescriptor: "L2M2S1, L-5-7-0, M-5-7-0, S-12-12-0, breaks-500-1000"
                    })
                        //1.sloupec
                        .addSection("jres:33600462") //RC 33600462 : Zdrojová položka
                        .addRow("jres:33600463") //RC 33600463 : Identifikátor dokladu
                        .addField("gstringbox", {
                        name: "ixp_akt",
                        model: "model.ixp=value",
                        disabled: true
                    })
                        .addRow("jres:33600464") //RC 33600464 : Období
                        .addField("gnumberbox", {
                        name: "rok_akt",
                        model: "model.rok=value",
                        disabled: true
                    })
                        .addRow("jres:33600465") //RC 33600465 : Číslo položky
                        .addField("gnumberbox", {
                        name: "cislo_akt",
                        model: "model.cislo=value",
                        disabled: true
                    })
                        .addRow("jres:33600466") //RC 33600466 : Částka položky
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_pol_akt",
                        model: "model.c=value",
                        disabled: true
                    })
                        .addRow("jres:33600467") //RC 33600467 : Převáděná částka
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_pol_prev",
                        flag: "required",
                        validators: [new Gordic.Validators.Base({
                                message: "jres:33600468", //RC 33600468 : Převáděná částka musí být větší než 0
                                validate: (val, src) => {
                                    return val > 0;
                                }
                            }),
                            new Gordic.Validators.Base({
                                getMessage: (val) => { return "jres:33600469" + c_pol_prev_error; }, //RC 33600469 : Převáděná částka překročila přípustnou disponibilní hodnotu - výsledná částka položky nesmí klesnout pod úroveň rezervovaných a vázaných prostředků 
                                validate: (value, src) => {
                                    //vyhodnocovat pouze, pokud neexistuje error na tomto políčku z předchozího validátoru
                                    if ($(src).gfield("getErrors").length > 0) {
                                        return true;
                                    }
                                    c_pol_prev_error = "";
                                    var bOk = false;
                                    var data = this.data;
                                    const val = parseDecimal(value ?? 0);
                                    const c_pri = parseDecimal(data.c_pri ?? 0);
                                    const c_fak = parseDecimal(data.c_fak ?? 0);
                                    const c_obj_sml = parseDecimal(data.c_obj_sml ?? 0);
                                    const c = parseDecimal(data.c ?? 0);
                                    //kontrola závisí na stavu položky FP - pokud je schválená, proběhne kontrola na disponibilní množství
                                    if (data.up_stav >= 30 && data.up_stav < 90) {
                                        //mohu převést disponibilní množství -to je dáno  rozdílem ceny položky stavu a vázaných rezervací a c_obj_sml
                                        const c_disp = c_pri.minus(c_fak).minus(c_obj_sml);
                                        if (c_disp.greaterThan(c)) {
                                            bOk = val.lessThanOrEqualTo(c);
                                        }
                                        else {
                                            bOk = val.lessThanOrEqualTo(c_disp);
                                        }
                                        c_pol_prev_error = "jres:33600470".format(c_pri.toFixed(2), c_fak.toFixed(2), c_obj_sml.toFixed(2)); //RC 33600470 : Částka položky: {0} Rezervováno: {1} Objednáno: {2}
                                    }
                                    else {
                                        //lze převést vše
                                        bOk = val.lessThanOrEqualTo(c);
                                        c_pol_prev_error = "jres:33600471".format(val.toFixed(), c.toFixed(2)); //RC 33600471 : Částka položky původní: {0} Částka položky nová: {1}
                                    }
                                    return bOk;
                                }
                            }),
                            new Gordic.Validators.Base({
                                getMessage: (val) => { return c_pol_afprev_error; },
                                validate: (value, src) => {
                                    //kontrola přípustnosti převáděné částky - v smlpolpri.c_rok = je rozpis na daný rok
                                    if ($(src).gfield("getErrors").length > 0 || !this.$form.findFields("ixp_cil").gfield("getValue")) {
                                        return true;
                                    }
                                    c_pol_afprev_error = "";
                                    const c_rok = parseDecimal(this.$form.findFields("ixp_cil").gfield("getValue")?.c_rok ?? 0);
                                    const c_pol_cil = parseDecimal(this.$form.findFields("c_pol_cil").gfield("getValue") ?? 0);
                                    const c_pol_prev = parseDecimal(value);
                                    //částka položky a změny musí být menší než rozpis
                                    if ((c_pol_cil.plus(c_pol_prev)).greaterThan(c_rok)) {
                                        const max = c_pol_prev.minus((c_pol_cil).plus(c_pol_prev).minus(c_rok));
                                        c_pol_afprev_error = "jres:33600472" //RC 33600472 : Cílová částka položky překročila hodnotu rozpisu na roky. Maximálně lze převést: {0} CZK Rozpis na aktuální rok: {1} CZK
                                            .format(max.toFixed(2), c_rok.toFixed(2));
                                        //Set df_c_pol_prev = 0
                                        //Set df_c_pol_afprev = 0
                                        return false;
                                    }
                                    return true;
                                }
                            })],
                        change: (ev, ctx) => {
                            var c_pol_cil = this.$form.findFields("c_pol_cil").gfield("getValue");
                            var c_pol_afprev = parseDecimal(c_pol_cil ?? 0).plus(parseDecimal(ctx.value ?? 0));
                            this.$form.findFields("c_pol_afprev").gfield("setValue", c_pol_afprev);
                        }
                    })
                        //2.sloupec
                        .addSection("jres:33600473") //RC 33600473 : Cílová položka
                        .addRow("jres:33600474") //RC 33600474 : Identifikátor dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.vyberPolozky(), {
                        name: "ixp_cil",
                        model: "model.ixp_cil<=value.ixp;model.rok=value.rok;model.cislo=>value.cislo;model.cislo_cil<=value.cislo", //model.ixp=>value.ixp;
                        flag: "required",
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            ixp: { o: "!=", v: data.ixp },
                            cis_real: data.cis_real,
                            ixs_fun_vyriz: data.ixs_fun_vyriz,
                            rok: data.rok,
                            cis_pol_pla: data.cis_pol_pla,
                            drd: data.drd,
                            ico: data.ico,
                            ucs: data.ucs,
                            nks: data.nks,
                            uea: data.uea,
                            ueb: data.ueb,
                            uec: data.uec,
                            ued: data.ued,
                            uee: data.uee,
                            uef: data.uef,
                            ueg: data.ueg,
                            ueh: data.ueh,
                            uei: data.uei,
                            uej: data.uej,
                            te0: data.te0,
                            te1: data.te1,
                            te2: data.te2,
                            te3: data.te3,
                            te4: data.te4,
                            uek: data.uek,
                            uel: data.uel,
                            uem: data.uem,
                            uen: data.uen,
                            te5: data.te5,
                            te6: data.te6,
                            te7: data.te7,
                            te8: data.te8,
                            te9: data.te9,
                            uea_rr: data.uea_rr,
                            ueb_rr: data.ueb_rr,
                            ixp_sml: data.ixp_sml,
                            rok_sml: data.rok_sml,
                            cislo_sml: data.cislo_sml,
                            priz_zaz: data.priz_zaz,
                            ixs_pri: data.ixs_pri ?? " ",
                            por_cis: data.por_cis
                        },
                        change: (ev, ctx) => {
                            if ((ctx.flags?.valid ?? false)) {
                                this.$form.findFields("cislo_cil").gfield("setValue", ctx.value?.cislo);
                                this.$form.findFields("c_pol_cil").gfield("setValue", ctx.value?.c);
                                var c_pol_afprev = parseDecimal(ctx.value?.c ?? 0).plus(parseDecimal(this.$form.findFields("c_pol_prev").gfield("getValue")) ?? 0);
                                this.$form.findFields("c_pol_afprev").gfield("setValue", c_pol_afprev);
                                this.$form.findFields("c_pol_prev").gfield("validate");
                            }
                        }
                    })
                        .addRow("jres:33600475") //RC 33600475 : Období
                        .addField("gnumberbox", {
                        name: "rok_cil",
                        model: "model.rok=value",
                        disabled: true
                    })
                        .addRow("jres:33600476") //RC 33600476 : Číslo položky
                        .addField("gnumberbox", {
                        name: "cislo_cil",
                        disabled: true,
                        validators: [new Gordic.Validators.Base({
                                message: "jres:33600477", //RC 33600477 : Číslo položky musí být větší než 0
                                validate: (val, src) => {
                                    return val > 0;
                                }
                            })],
                    })
                        .addRow("jres:33600478") //RC 33600478 : Částka položky
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_pol_cil",
                        disabled: true
                    })
                        .addRow("jres:33600479") //RC 33600479 : Očekávaná částka
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_pol_afprev",
                        disabled: true,
                        validators: [new Gordic.Validators.Base({
                                message: "jres:33600480", //RC 33600480 : Očekávaná částka musí být větší než 0
                                validate: (val, src) => {
                                    return val > 0;
                                }
                            })],
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
            };
            GSmlPolFPDokladPresun = __decorate([
                Decorators.gcontent
            ], GSmlPolFPDokladPresun);
            WebClient.GSmlPolFPDokladPresun = GSmlPolFPDokladPresun;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFBvbEZQRG9rbGFkUHJlc3VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFBvbEZQRG9rbGFkUHJlc3VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFJakIsSUFBVSxNQUFNLENBMFJmO0FBMVJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBSbkI7SUExUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBSN0I7UUExUm9CLFdBQUEsU0FBUztZQWExQixnRUFBZ0U7WUFFaEUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBa0JuRCxPQUFPO29CQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLENBQUM7Z0JBRUQsb0JBQW9CO2dCQUNaLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7NEJBQzlCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxVQUFVLEVB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UyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMFI3QjtJQUFELENBQUMsRUExUmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBSbkI7QUFBRCxDQUFDLEVBMVJTLE1BQU0sS0FBTixNQUFNLFFBMFJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sRlBEb2tsYWRQcmVzdW4udHMgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHDFmWVzdW4gcHJvc3TFmWVka8WvIHogamVkbsOpIHBvbG/Fvmt5IEZQIG5hIGppbm91ICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMC0zMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cblxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgLyoqIFZzdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1IFDFmWVzdW4gxI3DoXN0a2EgKFBvbG/Fvmt5IEZQKSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxQb2xGUERva2xhZFByZXN1bkRsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICBpeHA6IHN0cmluZyxcclxuICAgICAgICByb2s6IG51bWJlcixcclxuICAgICAgICBjaXNsbzogbnVtYmVyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqVsO9c3R1cG7DrSBwYXJhbWV0cnkgZGlhbG9ndSBQxZllc3VuIMSNw6FzdGthIChQb2xvxb5reSBGUCkqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUG9sRlBEb2tsYWRQcmVzdW5EbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgY2hhbmdlZDogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250ZW50IHBybyBwxZllc3VuIHByb3N0xZllZGvFryB6IGplZG7DqSBwb2xvxb5reSBGUCBuYSBqaW5vdSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sUG9sRlBEb2tsYWRQcmVzdW4gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBJeHAgcG9sb8W+a3kgKi9cclxuICAgICAgICBwdWJsaWMgaXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayBwb2xvxb5reSAqL1xyXG4gICAgICAgIHB1YmxpYyByb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogxIzDrXNsbyBwb2xvxb5reSAqL1xyXG4gICAgICAgIHB1YmxpYyBjaXNsbzogbnVtYmVyO1xyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogRGF0YSBwcm8gcMWZZXN1biBwcm9zdMWZZWRrxa8qL1xyXG4gICAgICAgIHByaXZhdGUgZGF0YTogSW50ZXJmYWNlLkdTbWxGaW5QcmVzdW5EdG87XHJcblxyXG4gICAgICAgIC8qKiBQxZnDrXpuYWssIHpkYSBkb8WhbG8ga2Ugem3Em27EmyB2IHLDoW1jaSBjb250ZW50dSovXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VkOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKiogRm9ybXVsw6HFmSAqL1xyXG4gICAgICAgIHByaXZhdGUgJGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhpcy4kZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RPazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuJGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybURhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZm9ybURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5pc2wuU21sRmluUHJlc3VuLnByZXN1bkNhc3RreSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuZGF0YS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNsbzogdGhhdC5kYXRhLmNpc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LmRhdGEucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2NpbDogZm9ybURhdGEuaXhwX2NpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvX2NpbDogZm9ybURhdGEuY2lzbG9fY2lsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY19wb2xfcHJldjogZm9ybURhdGEuY19wb2xfcHJldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96bWVuYTogdGhhdC5kYXRhLmRhdF96bWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKS5kb25lKCgpID0+IHsgdGhhdC5jaGFuZ2VkID0gdHJ1ZTsgIHRoYXQudHJ5Q2xvc2UoKTsgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnRyeUNsb3NlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBjX3BvbF9wcmV2X2Vycm9yID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGNfcG9sX2FmcHJldl9lcnJvciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVByZXN1bkNhc3RreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTUtNy0wLCBNLTUtNy0wLCBTLTEyLTEyLTAsIGJyZWFrcy01MDAtMTAwMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8xLnNsb3VwZWNcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDQ2MlwiKSAvL1JDIDMzNjAwNDYyIDogWmRyb2pvdsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDQ2M1wiKSAvL1JDIDMzNjAwNDYzIDogSWRlbnRpZmlrw6F0b3IgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDQ2NFwiKSAvL1JDIDMzNjAwNDY0IDogT2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucm9rPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDQ2NVwiKSAvL1JDIDMzNjAwNDY1IDogxIzDrXNsbyBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb19ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5jaXNsbz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0NjZcIikgLy9SQyAzMzYwMDQ2NiA6IMSMw6FzdGthIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BvbF9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5jPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDQ2N1wiKSAvL1JDIDMzNjAwNDY3IDogUMWZZXbDoWTEm27DoSDEjcOhc3RrYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wb2xfcHJldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA0NjhcIiwgLy9SQyAzMzYwMDQ2OCA6IFDFmWV2w6FkxJtuw6EgxI3DoXN0a2EgbXVzw60gYsO9dCB2xJt0xaHDrSBuZcW+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA+IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWVzc2FnZTogKHZhbCkgPT4geyByZXR1cm4gXCJqcmVzOjMzNjAwNDY5XCIgKyBjX3BvbF9wcmV2X2Vycm9yOyB9LCAvL1JDIDMzNjAwNDY5IDogUMWZZXbDoWTEm27DoSDEjcOhc3RrYSBwxZlla3JvxI1pbGEgcMWZw61wdXN0bm91IGRpc3BvbmliaWxuw60gaG9kbm90dSAtIHbDvXNsZWRuw6EgxI3DoXN0a2EgcG9sb8W+a3kgbmVzbcOtIGtsZXNub3V0IHBvZCDDunJvdmXFiCByZXplcnZvdmFuw71jaCBhIHbDoXphbsO9Y2ggcHJvc3TFmWVka8WvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWx1ZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92eWhvZG5vY292YXQgcG91emUsIHBva3VkIG5lZXhpc3R1amUgZXJyb3IgbmEgdG9tdG8gcG9sw63EjWt1IHogcMWZZWRjaG96w61obyB2YWxpZMOhdG9ydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3BvbF9wcmV2X2Vycm9yID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYk9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VEZWNpbWFsKHZhbHVlID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNfcHJpID0gcGFyc2VEZWNpbWFsKGRhdGEuY19wcmkgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY19mYWsgPSBwYXJzZURlY2ltYWwoZGF0YS5jX2ZhayA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjX29ial9zbWwgPSBwYXJzZURlY2ltYWwoZGF0YS5jX29ial9zbWwgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYyA9IHBhcnNlRGVjaW1hbChkYXRhLmMgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9rb250cm9sYSB6w6F2aXPDrSBuYSBzdGF2dSBwb2xvxb5reSBGUCAtIHBva3VkIGplIHNjaHbDoWxlbsOhLCBwcm9ixJtobmUga29udHJvbGEgbmEgZGlzcG9uaWJpbG7DrSBtbm/FvnN0dsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXBfc3RhdiEgPj0gMzAgJiYgZGF0YS51cF9zdGF2ISA8IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9odSBwxZlldsOpc3QgZGlzcG9uaWJpbG7DrSBtbm/FvnN0dsOtIC10byBqZSBkw6FubyAgcm96ZMOtbGVtIGNlbnkgcG9sb8W+a3kgc3RhdnUgYSB2w6F6YW7DvWNoIHJlemVydmFjw60gYSBjX29ial9zbWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY19kaXNwID0gY19wcmkubWludXMoY19mYWspLm1pbnVzKGNfb2JqX3NtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjX2Rpc3AuZ3JlYXRlclRoYW4oYykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJPayA9IHZhbC5sZXNzVGhhbk9yRXF1YWxUbyhjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJPayA9IHZhbC5sZXNzVGhhbk9yRXF1YWxUbyhjX2Rpc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfcG9sX3ByZXZfZXJyb3IgPSBcImpyZXM6MzM2MDA0NzBcIi5mb3JtYXQoY19wcmkudG9GaXhlZCgyKSwgY19mYWsudG9GaXhlZCgyKSwgY19vYmpfc21sLnRvRml4ZWQoMikpOyAvL1JDIDMzNjAwNDcwIDogxIzDoXN0a2EgcG9sb8W+a3k6IHswfSBSZXplcnZvdsOhbm86IHsxfSBPYmplZG7DoW5vOiB7Mn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2x6ZSBwxZlldsOpc3QgdsWhZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiT2sgPSB2YWwubGVzc1RoYW5PckVxdWFsVG8oYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfcG9sX3ByZXZfZXJyb3IgPSBcImpyZXM6MzM2MDA0NzFcIi5mb3JtYXQodmFsLnRvRml4ZWQoKSwgYy50b0ZpeGVkKDIpKTsgLy9SQyAzMzYwMDQ3MSA6IMSMw6FzdGthIHBvbG/Fvmt5IHDFr3ZvZG7DrTogezB9IMSMw6FzdGthIHBvbG/Fvmt5IG5vdsOhOiB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJPaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1lc3NhZ2U6ICh2YWwpID0+IHsgcmV0dXJuIGNfcG9sX2FmcHJldl9lcnJvcjsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va29udHJvbGEgcMWZw61wdXN0bm9zdGkgcMWZZXbDoWTEm27DqSDEjcOhc3RreSAtIHYgc21scG9scHJpLmNfcm9rID0gamUgcm96cGlzIG5hIGRhbsO9IHJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNyYykuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCA+IDAgfHwgIXRoaXMuJGZvcm0uZmluZEZpZWxkcyhcIml4cF9jaWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3BvbF9hZnByZXZfZXJyb3IgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNfcm9rID0gcGFyc2VEZWNpbWFsKHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcIml4cF9jaWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LmNfcm9rID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNfcG9sX2NpbCA9IHBhcnNlRGVjaW1hbCh0aGlzLiRmb3JtLmZpbmRGaWVsZHMoXCJjX3BvbF9jaWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY19wb2xfcHJldiA9IHBhcnNlRGVjaW1hbCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/EjcOhc3RrYSBwb2xvxb5reSBhIHptxJtueSBtdXPDrSBiw710IG1lbsWhw60gbmXFviByb3pwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNfcG9sX2NpbC5wbHVzKGNfcG9sX3ByZXYpKS5ncmVhdGVyVGhhbihjX3JvaykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gY19wb2xfcHJldi5taW51cygoY19wb2xfY2lsKS5wbHVzKGNfcG9sX3ByZXYpLm1pbnVzKGNfcm9rKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfcG9sX2FmcHJldl9lcnJvciA9IFwianJlczozMzYwMDQ3MlwiIC8vUkMgMzM2MDA0NzIgOiBDw61sb3bDoSDEjcOhc3RrYSBwb2xvxb5reSBwxZlla3JvxI1pbGEgaG9kbm90dSByb3pwaXN1IG5hIHJva3kuIE1heGltw6FsbsSbIGx6ZSBwxZlldsOpc3Q6IHswfSBDWksgUm96cGlzIG5hIGFrdHXDoWxuw60gcm9rOiB7MX0gQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvcm1hdChtYXgudG9GaXhlZCgyKSwgY19yb2sudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2NfcG9sX3ByZXYgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IGRmX2NfcG9sX2FmcHJldiA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNfcG9sX2NpbCA9IHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNfcG9sX2NpbFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNfcG9sX2FmcHJldiA9IHBhcnNlRGVjaW1hbChjX3BvbF9jaWwgPz8gMCkucGx1cyhwYXJzZURlY2ltYWwoY3R4LnZhbHVlPz8wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNfcG9sX2FmcHJldlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjX3BvbF9hZnByZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLzIuc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwNDczXCIpIC8vUkMgMzM2MDA0NzMgOiBDw61sb3bDoSBwb2xvxb5rYVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0NzRcIikgLy9SQyAzMzYwMDQ3NCA6IElkZW50aWZpa8OhdG9yIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnZ5YmVyUG9sb3preSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2NpbDw9dmFsdWUuaXhwO21vZGVsLnJvaz12YWx1ZS5yb2s7bW9kZWwuY2lzbG89PnZhbHVlLmNpc2xvO21vZGVsLmNpc2xvX2NpbDw9dmFsdWUuY2lzbG9cIiwgLy9tb2RlbC5peHA9PnZhbHVlLml4cDtcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogeyBvOiBcIiE9XCIsIHY6IGRhdGEuaXhwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpc19yZWFsOiBkYXRhLmNpc19yZWFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX3Z5cml6OiBkYXRhLml4c19mdW5fdnlyaXosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogZGF0YS5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpc19wb2xfcGxhOiBkYXRhLmNpc19wb2xfcGxhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmQ6IGRhdGEuZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGRhdGEuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IGRhdGEudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBua3M6IGRhdGEubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWE6IGRhdGEudWVhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IGRhdGEudWViLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWM6IGRhdGEudWVjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWQ6IGRhdGEudWVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWU6IGRhdGEudWVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWY6IGRhdGEudWVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWc6IGRhdGEudWVnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWg6IGRhdGEudWVoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWk6IGRhdGEudWVpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWo6IGRhdGEudWVqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IGRhdGEudGUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTE6IGRhdGEudGUxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTI6IGRhdGEudGUyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IGRhdGEudGUzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTQ6IGRhdGEudGU0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWs6IGRhdGEudWVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWw6IGRhdGEudWVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZW06IGRhdGEudWVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZW46IGRhdGEudWVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTU6IGRhdGEudGU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTY6IGRhdGEudGU2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTc6IGRhdGEudGU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTg6IGRhdGEudGU4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZTk6IGRhdGEudGU5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWFfcnI6IGRhdGEudWVhX3JyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ZWJfcnI6IGRhdGEudWViX3JyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sOiBkYXRhLml4cF9zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJva19zbWw6IGRhdGEucm9rX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG9fc21sOiBkYXRhLmNpc2xvX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpel96YXo6IGRhdGEucHJpel96YXosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19wcmk6IGRhdGEuaXhzX3ByaSA/PyBcIiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9yX2NpczogZGF0YS5wb3JfY2lzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY3R4LmZsYWdzPy52YWxpZCA/PyBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNpc2xvX2NpbFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWU/LmNpc2xvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNfcG9sX2NpbFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWU/LmMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNfcG9sX2FmcHJldiA9IHBhcnNlRGVjaW1hbChjdHgudmFsdWU/LmMgPz8gMCkucGx1cyhwYXJzZURlY2ltYWwodGhpcy4kZm9ybS5maW5kRmllbGRzKFwiY19wb2xfcHJldlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoXCJjX3BvbF9hZnByZXZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19wb2xfYWZwcmV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcm0uZmluZEZpZWxkcyhcImNfcG9sX3ByZXZcIikuZ2ZpZWxkKFwidmFsaWRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0NzVcIikgLy9SQyAzMzYwMDQ3NSA6IE9iZG9iw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2NpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0NzZcIikgLy9SQyAzMzYwMDQ3NiA6IMSMw61zbG8gcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9fY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwNDc3XCIsIC8vUkMgMzM2MDA0NzcgOiDEjMOtc2xvIHBvbG/Fvmt5IG11c8OtIGLDvXQgdsSbdMWhw60gbmXFviAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNDc4XCIpIC8vUkMgMzM2MDA0NzggOiDEjMOhc3RrYSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wb2xfY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDQ3OVwiKSAvL1JDIDMzNjAwNDc5IDogT8SNZWvDoXZhbsOhIMSNw6FzdGthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BvbF9hZnByZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA0ODBcIiwgLy9SQyAzMzYwMDQ4MCA6IE/EjWVrw6F2YW7DoSDEjcOhc3RrYSBtdXPDrSBiw710IHbEm3TFocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsID4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=