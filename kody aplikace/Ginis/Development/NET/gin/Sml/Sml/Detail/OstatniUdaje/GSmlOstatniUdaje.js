"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlOstatniUdaje.ts                              </Name>
//    <Description> Záložka ostatni udaje                                                 </Description>
//    <Author>      Adam Černý                                                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                                      </Copyright>
//    <Created>     2022-03-10                                                            </Created>
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
            var gcontent = Decorators.gcontent;
            let GSmlOstatniUdaje = class GSmlOstatniUdaje extends Gordic.GContentBase {
                onContentReady() {
                    //Vytvoření formu
                    this._createForm();
                    //Vyplnění formu
                    this._fillForm();
                    //Nastavení labelů
                    this.setLabel();
                }
                //Nastavení labelů
                setLabel() {
                    /*
                    ! 372.8 26.02.14 viditelnost polí pro obsluhu dotací: VFP-SML-DDP
                    380.14 11.06.18 přidána i možnost generovat poukazy (přenos VS z BLK do POU)
                     */
                    if (!(this.globals.submodel_ddp_akt && this._param.sml_rad_vyd2ddp == 1 || this._param.sml_rad_sezhgep == 1)) {
                        this.findForms().findFields("typ_phl").gfield("option", "hide", true);
                        this.findForms().findFields("vs").gfield("option", "hide", true);
                    }
                }
                //Vyplnění formu
                _fillForm() {
                    //přiřazení hodnot modelu
                    this.$form?.findForms("OstatniUdaje-Form").findFields().gfield("model", "apply", this.model, { initialValues: true });
                    this.typ_phl_before = this.model.findoc?.typ_phl ?? "";
                }
                //Vytvoření formu
                _createForm() {
                    const formVZ = new Gordic.Forms.Form({
                        name: "OstatniUdaje-Form",
                        layoutDescriptor: "L2M2S1, L-5-7-0, M-5-7-0, S-12-12-0, breaks-660-800",
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500384") //RC 33500384 : Účinnost
                        .addField("gstringbox", {
                        name: "ucinnost",
                        disabled: false,
                    })
                        .addRow("jres:33500385") //RC 33500385 : Způsob ukončení
                        .addField("gselectbox", Gordic.Prefabs.Select.smlszuk(), {
                        name: "ixs_zuk",
                        model: "model.ixs_zuk = value.ixs_zuk",
                        disabled: false,
                    })
                        .addRow("jres:33500386") //RC 33500386 : Datum ukončení
                        .addField("gdatebox", {
                        name: "dat_uko",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500387") //RC 33500387 : Stav odeslání
                        .addField("gstringbox", {
                        name: "s_dor",
                        disabled: true,
                    })
                        .addRow("jres:33500388") //RC 33500388 : Datum odeslání
                        .addField("gdatebox", {
                        name: "dat_odes",
                        disabled: true,
                    })
                        .addRow("jres:33500389") //RC 33500389 : Stav rozhodného zveřejnění
                        .addField("gstringbox", {
                        name: "stav_zpv",
                        disabled: true,
                    })
                        .addRow("jres:33500390") //RC 33500390 : Datum rozhodného zveřejnění
                        .addField("gdatebox", {
                        name: "dat_zve",
                        disabled: true,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500391") //RC 33500391 : Související dokument 1, Datum
                        .addField("gstringbox", "w-8", {
                        name: "ac_dok_1",
                        disabled: false,
                    })
                        .addField("gdatebox", "w-4", {
                        name: "dat_dok_1",
                        disabled: false,
                    })
                        .addRow("jres:33500392") //RC 33500392 : Související dokument 2, Datum
                        .addField("gstringbox", "w-8", {
                        name: "ac_dok_2",
                        disabled: false,
                    })
                        .addField("gdatebox", "w-4", {
                        name: "dat_dok_2",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500393") //RC 33500393 : Možnost opce
                        .addField("gselectbox", {
                        data: new Gordic.Data.View([0, 1]),
                        defaultValue: 0,
                        itemTemplate: (value) => {
                            if (value == 0)
                                return "jres:33500394"; //RC 33500394 : Ne
                            else if (value == 1)
                                return "jres:33500395"; //RC 33500395 : Ano
                            else
                                return "";
                        },
                        helperItemTemplate: (value) => {
                            if (value == 0)
                                return "jres:33500396"; //RC 33500396 : Ne
                            else if (value == 1)
                                return "jres:33500397"; //RC 33500397 : Ano
                            else
                                return "";
                        },
                        name: "priz_opce",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp_vl(), {
                        name: "typ_phl",
                        model: "model.findoc.typ_phl=value.typ_phl",
                        change: (fx, value) => {
                            debugger;
                            Gordic.Isl.OstatniUdaje.changeTypPhl({ data: { typ_phl_new: value?.value?.typ_phl } }).getData().done((value) => {
                                if (value.State == 0) {
                                    this.$form?.findFields("vs").gfield("setValue", value.HelpValueStringOne);
                                    this.typ_phl_before = this.$form?.findFields("typ_phl").gfield("getValue").typ_phl;
                                }
                                else if (value.State == -1) {
                                    this.$form?.findFields("typ_phl").gfield("setValue", this.typ_phl_before);
                                }
                            });
                        },
                        disabled: false,
                    })
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        model: "model.findoc.vs",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500398") //RC 33500398 : Účetní kód dokladu
                        .addField("gstringbox", {
                        name: "ucetni_kod",
                        disabled: true,
                    })
                        .addSection({ label: "Poznámka", layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow("jres:33500399") //RC 33500399 : Poznámka
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        model: "model.poznamka=value",
                        disabled: false,
                        rows: 3,
                    });
                    this.$form = $("<div>").appendTo(this.element).gform("createFrom", formVZ);
                }
            };
            GSmlOstatniUdaje = __decorate([
                gcontent
            ], GSmlOstatniUdaje);
            WebClient.GSmlOstatniUdaje = GSmlOstatniUdaje;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbE9zdGF0bmlVZGFqZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxPc3RhdG5pVWRhamUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSxpR0FBaUc7QUFDakcsd0dBQXdHO0FBQ3hHLG1HQUFtRztBQUNuRyxzR0FBc0c7QUFDdEcsb0dBQW9HO0FBQ3BHLGlCQUFpQjs7Ozs7OztBQUtqQixJQUFVLE1BQU0sQ0E2TWY7QUE3TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNk1uQjtJQTdNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNk03QjtRQTdNb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFXbkMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxPQUFBLFlBQVk7Z0JBaUI5QyxjQUFjO29CQUNWLGlCQUFpQjtvQkFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsa0JBQWtCO29CQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsa0JBQWtCO2dCQUNsQixRQUFRO29CQUNKOzs7dUJBR0c7b0JBRUgsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDM0csSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFVB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QUFTLFFBNk03QjtJQUFELENBQUMsRUE3TWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZNbkI7QUFBRCxDQUFDLEVBN01TLE1BQU0sS0FBTixNQUFNLFFBNk1mIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxPc3RhdG5pVWRhamUudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gWsOhbG/FvmthIG9zdGF0bmkgdWRhamUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBBZGFtIMSMZXJuw70gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjItMDMtMTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxPc3RhdG5pVWRhamVJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgX3BhcmFtOiBJbnRlcmZhY2UuR1NtbERldGFpbFBhcmFtZXRyeUR0bztcclxuICAgICAgICBnbG9iYWxzOiBHb3JkaWMuU21sLkludGVyZmFjZS5HU21sR2xvYmFsc0R0bztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxPc3RhdG5pVWRhamVSZXR1cm5WYWx1ZSB7XHJcbiAgICB9XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbE9zdGF0bmlVZGFqZSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vUGFyYW1ldHJ5IHogREJcclxuICAgICAgICBwcml2YXRlIF9wYXJhbTogSW50ZXJmYWNlLkdTbWxEZXRhaWxQYXJhbWV0cnlEdG87XHJcbiAgICAgICAgLy9HbG9iYWxzXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzOiBHb3JkaWMuU21sLkludGVyZmFjZS5HU21sR2xvYmFsc0R0bztcclxuICAgICAgICAvL0RUTyBNT0RFTFVcclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBJbnRlcmZhY2UuR1NtbF9EZXRhaWxEdG9cclxuICAgICAgICAvL2Zvcm0ganFcclxuICAgICAgICBwcml2YXRlICRmb3JtPzogSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG4gICAgICAgIC8vVHlwIHBvaGxlZMOhdmt5IHDFmWVkIGNoYW5nZVxyXG4gICAgICAgIHByaXZhdGUgdHlwX3BobF9iZWZvcmU6IHN0cmluZ1xyXG4gICAgICAgIC8vRGF0YSBwcm8gZ3JpZFxyXG4gICAgICAgIGRhdGFHcmlkOiBJc2wuVmlldzxhbnksIElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8SW50ZXJmYWNlLkdTbWxkcG9sRHRvPj47XHJcbiAgICAgICAgLy9HUklEXHJcbiAgICAgICAgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICAvL1Z5dHZvxZllbsOtIGZvcm11XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgLy9WeXBsbsSbbsOtIGZvcm11XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxGb3JtKCk7XHJcbiAgICAgICAgICAgIC8vTmFzdGF2ZW7DrSBsYWJlbMWvXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TGFiZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vTmFzdGF2ZW7DrSBsYWJlbMWvXHJcbiAgICAgICAgc2V0TGFiZWwoKSB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICEgMzcyLjggMjYuMDIuMTQgdmlkaXRlbG5vc3QgcG9sw60gcHJvIG9ic2x1aHUgZG90YWPDrTogVkZQLVNNTC1ERFBcclxuICAgICAgICAgICAgMzgwLjE0IDExLjA2LjE4IHDFmWlkw6FuYSBpIG1vxb5ub3N0IGdlbmVyb3ZhdCBwb3VrYXp5IChwxZllbm9zIFZTIHogQkxLIGRvIFBPVSlcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICBpZiAoISh0aGlzLmdsb2JhbHMuc3VibW9kZWxfZGRwX2FrdCAmJiB0aGlzLl9wYXJhbS5zbWxfcmFkX3Z5ZDJkZHAgPT0gMSB8fCB0aGlzLl9wYXJhbS5zbWxfcmFkX3NlemhnZXAgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiaGlkZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInZzXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImhpZGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9WeXBsbsSbbsOtIGZvcm11XHJcbiAgICAgICAgcHJpdmF0ZSBfZmlsbEZvcm0oKSB7XHJcbiAgICAgICAgICAgIC8vcMWZacWZYXplbsOtIGhvZG5vdCBtb2RlbHVcclxuICAgICAgICAgICAgdGhpcy4kZm9ybT8uZmluZEZvcm1zKFwiT3N0YXRuaVVkYWplLUZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIHRoaXMudHlwX3BobF9iZWZvcmUgPSB0aGlzLm1vZGVsLmZpbmRvYz8udHlwX3BobCA/PyBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Z5dHZvxZllbsOtIGZvcm11XHJcbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybVZaID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiT3N0YXRuaVVkYWplLUZvcm1cIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC01LTctMCwgTS01LTctMCwgUy0xMi0xMi0wLCBicmVha3MtNjYwLTgwMFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcIiZuYnNwXCIsIGN1c3RvbUNsYXNzOiBcIlwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDAzODRcIikgLy9SQyAzMzUwMDM4NCA6IMOaxI1pbm5vc3RcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNpbm5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzg1XCIpIC8vUkMgMzM1MDAzODUgOiBacMWvc29iIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbHN6dWsoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3p1a1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c196dWsgPSB2YWx1ZS5peHNfenVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDAzODZcIikgLy9SQyAzMzUwMDM4NiA6IERhdHVtIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91a29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzg3XCIpIC8vUkMgMzM1MDAzODcgOiBTdGF2IG9kZXNsw6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19kb3JcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDAzODhcIikgLy9SQyAzMzUwMDM4OCA6IERhdHVtIG9kZXNsw6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzg5XCIpIC8vUkMgMzM1MDAzODkgOiBTdGF2IHJvemhvZG7DqWhvIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl96cHZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDM5MFwiKSAvL1JDIDMzNTAwMzkwIDogRGF0dW0gcm96aG9kbsOpaG8genZlxZllam7Em27DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3p2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcIiZuYnNwXCIsIGN1c3RvbUNsYXNzOiBcIlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDM5MVwiKSAvL1JDIDMzNTAwMzkxIDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAxLCBEYXR1bVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctOFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19kb2tfMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9rXzFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzkyXCIpIC8vUkMgMzM1MDAzOTIgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50IDIsIERhdHVtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2Rva18yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9rXzJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSkgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDM5M1wiKSAvL1JDIDMzNTAwMzkzIDogTW/Fvm5vc3Qgb3BjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoWzAsIDFdKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzk0XCI7IC8vUkMgMzM1MDAzOTQgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzUwMDM5NVwiIC8vUkMgMzM1MDAzOTUgOiBBbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJJdGVtVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDAzOTZcIjsgLy9SQyAzMzUwMDM5NiA6IE5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwMzk3XCIgLy9SQyAzMzUwMDM5NyA6IEFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9vcGNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcHN0cHBfdmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmZpbmRvYy50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChmeCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuT3N0YXRuaVVkYWplLmNoYW5nZVR5cFBobCh7IGRhdGE6IHsgdHlwX3BobF9uZXc6IHZhbHVlPy52YWx1ZT8udHlwX3BobCB9IH0pLmdldERhdGEoKS5kb25lKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLlN0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtPy5maW5kRmllbGRzKFwidnNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUuSGVscFZhbHVlU3RyaW5nT25lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cF9waGxfYmVmb3JlID0gdGhpcy4kZm9ybT8uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikudHlwX3BobDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLlN0YXRlID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9ybT8uZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhpcy50eXBfcGhsX2JlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVlNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5maW5kb2MudnNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzk4XCIpIC8vUkMgMzM1MDAzOTggOiDDmsSNZXRuw60ga8OzZCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRuaV9rb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcIlBvem7DoW1rYVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwifSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwMzk5XCIpIC8vUkMgMzM1MDAzOTkgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucG96bmFta2E9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czozLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybVZaKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=