"use strict";
//  <FileHeader xmlns="http:/ / www.gordic.cz / shared / file - header / v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyjimkyKategoriiPohybu.ts             </Name>
//    <Description> Vyjímky kategorií pohybů                                    </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-04                                                  </Created>
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
            var Controls;
            (function (Controls) {
                var Ciselniky;
                (function (Ciselniky) {
                    let GVyjimkyKategoriiPohybu = class GVyjimkyKategoriiPohybu extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Výjimky kategorií pohybů`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGVyjimkyKategoriiPohybuZavritPotomky"]
                                }]);
                            this.createForm();
                            WebClient.Common.Base.nastaveniPoleKtgUpo(this, this.IxpDen, this.data.typ_phl_z ?? "", "ktg_upo_z");
                            WebClient.Common.Base.nastaveniPoleKtgUpo(this, this.IxpDen, this.data.typ_phl_do ?? "", "ktg_upo_do");
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Typ pohledávky Z", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                                name: "typ_phl_z",
                                model: "model.typ_phl_z=value.typ_phl",
                                serverFilters: {
                                    aktivita: 100
                                },
                                change: (ev, obj) => {
                                    WebClient.Common.Base.aktualizovatPoleKtgUpo(this, this.IxpDen, obj.value?.typ_phl ?? "", "ktg_upo_z");
                                }
                            })
                                .addRow({ label: "Typ pohledávky Do", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                                name: "typ_phl_do",
                                model: "model.typ_phl_do=value.typ_phl",
                                serverFilters: {
                                    aktivita: 100
                                },
                                change: (ev, obj) => {
                                    WebClient.Common.Base.aktualizovatPoleKtgUpo(this, this.IxpDen, obj.value?.typ_phl ?? "", "ktg_upo_do");
                                }
                            })
                                .addRow({ label: "Transformace–původní kat. poh.", required: true }) //původně: Kategorie pohybu Z
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo_z",
                                model: "model.ktg_upo_z=value.ktg_upo",
                                dropdown: true,
                            })
                                .addRow({ label: "Transformace-výsledná kat. poh.", required: true }) //původně: Kategorie pohybu Do
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo_do",
                                model: "model.ktg_upo_do=value.ktg_upo",
                                dropdown: true,
                            })
                                .addRow({ label: "Transformovat", })
                                .addField("gselectbox", {
                                name: "invert",
                                dropdown: true,
                                itemTemplate: "{popis}",
                                model: "model.id=value.invert", //model pro zobrazení invertu 1/0 na název(popis) - NUTNO OTESTOVAT!
                                initialValue: { id: 0, popis: "Typ_pohledávky Do", },
                                data: [{ id: 0, popis: "Typ_pohledávky Do", }, { id: 1, popis: "Typ pohledávky Z", }]
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", this.data);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGVyjimkyKategoriiPohybuZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                }]);
                        }
                        ok() {
                            const that = this;
                            if (!this.defaultForm.gform("isValid"))
                                return;
                            else {
                                let dtoOld = $.extend({}, this.data);
                                let dtoNew = $.extend({}, this.data);
                                this.defaultForm.findFields().gfield("model", "collect", dtoNew);
                                var smt = dtoNew;
                                var smt2 = dtoOld;
                                let task;
                                if (this.editMode) {
                                    task = that.isl.VyjimkyKategoriiPohybu.update(rq => {
                                        return {
                                            rq: {
                                                Data: {
                                                    typ_phl_z: dtoOld.typ_phl_z,
                                                    typ_phl_do: dtoOld.typ_phl_do,
                                                    ktg_upo_z: dtoOld.ktg_upo_z,
                                                    ktg_upo_do: dtoOld.ktg_upo_do,
                                                    editedData: dtoNew,
                                                    invert: dtoOld.invert
                                                }
                                            }
                                        };
                                    });
                                }
                                else {
                                    task = that.isl.VyjimkyKategoriiPohybu.create(rq => {
                                        return {
                                            rq: {
                                                Data: dtoNew
                                            }
                                        };
                                    });
                                }
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GVyjimkyKategoriiPohybu = __decorate([
                        Decorators.gcontent
                    ], GVyjimkyKategoriiPohybu);
                    Ciselniky.GVyjimkyKategoriiPohybu = GVyjimkyKategoriiPohybu;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5amlta3lLYXRlZ29yaWlQb2h5YnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnlqaW1reUthdGVnb3JpaVBvaHlidS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0ZBQW9GO0FBQ3BGLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWlJZjtBQWpJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpSW5CO0lBaklnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpSTdCO1FBaklvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0FpSXRDO1lBakk4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxTQUFTLENBaUloRDtnQkFqSXVDLFdBQUEsU0FBUztvQkFFN0MsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxPQUFBLFlBQVk7d0JBT3JELGNBQWM7NEJBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQzs0QkFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSztvQ0FDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUNBQXlDLENBQUM7aUNBQ2xFLENBQUMsQ0FBQyxDQUFDOzRCQUVKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFFbEIsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQzs0QkFDM0YsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUks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Q0FBdUIsMEJBOEhuQyxDQUFBO2dCQUNMLENBQUMsRUFqSXVDLFNBQVMsR0FBVCxrQkFBUyxLQUFULGtCQUFTLFFBaUloRDtZQUFELENBQUMsRUFqSThCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBaUl0QztRQUFELENBQUMsRUFqSW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlJN0I7SUFBRCxDQUFDLEVBaklnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpSW5CO0FBQUQsQ0FBQyxFQWpJUyxNQUFNLEtBQU4sTUFBTSxRQWlJZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6LyAvIHd3dy5nb3JkaWMuY3ogLyBzaGFyZWQgLyBmaWxlIC0gaGVhZGVyIC8gdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnUudHMgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFZ5asOtbWt5IGthdGVnb3Jpw60gcG9oeWLFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudcWhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAyLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5amlta3lLYXRlZ29yaWlQb2h5YnUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVEdG87XHJcbiAgICAgICAgZWRpdE1vZGU6IGJvb2xlYW47XHJcbiAgICAgICAgdmFsaWRhdG9yczogYW55O1xyXG4gICAgICAgIEl4cERlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBWw71qaW1reSBrYXRlZ29yacOtIHBvaHlixa9gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1Z5amlta3lLYXRlZ29yaWlQb2h5YnVaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgdGhpcy5kYXRhLnR5cF9waGxfeiA/PyBcIlwiLCBcImt0Z191cG9felwiKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgdGhpcy5kYXRhLnR5cF9waGxfZG8gPz8gXCJcIiwgXCJrdGdfdXBvX2RvXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJUeXAgcG9obGVkw6F2a3kgWlwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQaGxTaW1wbGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobF96XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobF96PXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuYWt0dWFsaXpvdmF0UG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgb2JqLnZhbHVlPy50eXBfcGhsID8/IFwiXCIsIFwia3RnX3Vwb196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHBvaGxlZMOhdmt5IERvXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBobFNpbXBsZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobF9kbz12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmFrdHVhbGl6b3ZhdFBvbGVLdGdVcG8odGhpcywgdGhpcy5JeHBEZW4sIG9iai52YWx1ZT8udHlwX3BobCA/PyBcIlwiLCBcImt0Z191cG9fZG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJUcmFuc2Zvcm1hY2XigJNwxa92b2Ruw60ga2F0LiBwb2guXCIsIHJlcXVpcmVkOiB0cnVlIH0pIC8vcMWvdm9kbsSbOiBLYXRlZ29yaWUgcG9oeWJ1IFpcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvX3pcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvX3o9dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJUcmFuc2Zvcm1hY2UtdsO9c2xlZG7DoSBrYXQuIHBvaC5cIiwgcmVxdWlyZWQ6IHRydWUgfSkgLy9wxa92b2RuxJs6IEthdGVnb3JpZSBwb2h5YnUgRG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwb19kbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlRyYW5zZm9ybW92YXRcIiwgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW52ZXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwb3Bpc31cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pZD12YWx1ZS5pbnZlcnRcIiwgLy9tb2RlbCBwcm8gem9icmF6ZW7DrSBpbnZlcnR1IDEvMCBuYSBuw6F6ZXYocG9waXMpIC0gTlVUTk8gT1RFU1RPVkFUIVxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCwgcG9waXM6IFwiVHlwX3BvaGxlZMOhdmt5IERvXCIsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW3sgaWQ6IDAsIHBvcGlzOiBcIlR5cF9wb2hsZWTDoXZreSBEb1wiLCB9LCB7IGlkOiAxLCBwb3BpczogXCJUeXAgcG9obGVkw6F2a3kgWlwiLCB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1WmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHRvT2xkOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVEdG8gPSAkLmV4dGVuZCh7fSwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBkdG9OZXc6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0byA9ICQuZXh0ZW5kKHt9LCB0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9OZXcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNtdCA9IGR0b05ldztcclxuICAgICAgICAgICAgICAgIHZhciBzbXQyID0gZHRvT2xkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2s6IElzbC5fVGFzazx7IHJxOiBJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVxdWVzdDxhbnk+IH0sIEludGVyZmFjZS5MSy5Jc2wuQ29tbW9uLkdSZXNwb25zZTxhbnk+PjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayA9IHRoYXQuaXNsLlZ5amlta3lLYXRlZ29yaWlQb2h5YnUudXBkYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX3o6IGR0b09sZC50eXBfcGhsX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGxfZG86IGR0b09sZC50eXBfcGhsX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX3o6IGR0b09sZC5rdGdfdXBvX3osXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG9fZG86IGR0b09sZC5rdGdfdXBvX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0ZWREYXRhOiBkdG9OZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmVydDogZHRvT2xkLmludmVydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2sgPSB0aGF0LmlzbC5WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1LmNyZWF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGR0b05ld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19