"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GOpravnyPredpis.ts                     </Name>
//    <Description> Opravný předpis                                             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-12-19                                                  </Created>
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
            let GOpravnyPredpis = class GOpravnyPredpis extends Gordic.GContentBase {
                onContentReady() {
                    this.title = `Opravný předpis pro případ ${this.Ixp}`;
                    this.createActions();
                    this.setBreadcrumbs([{
                            caption: this.title,
                            action: this.actions["actGOpravnyPredpisZavritPotomky"]
                        }]);
                    this.createForm();
                }
                createForm() {
                    var form = new Gordic.Forms.Form()
                        .addRow({ label: "Částka předpisu", required: true }).addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "c" })
                        .addRow({ label: "Datum vzniku", required: true }).addField("gdatebox", { name: "dat_vzniku" })
                        .addRow({ label: "Datum splatnosti", required: true }).addField("gdatebox", { name: "dat_spl" })
                        .addRow("Spec. symbol").addField("gstringbox", { name: "ss" })
                        .addRow("Poznámka").addField("gstringbox", { name: "poznamka" })
                        .addRow({ label: "Typ", required: true }).addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", model: "model.ktg_upo=value.ktg_upo", serverFilters: {
                            bez_nula_upo: 1,
                            ktg_upo: {
                                o: "<",
                                v: 200
                            }
                        },
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    });
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.defaultForm.findFields().gfield("model", "validators", this.validators);
                }
                createActions() {
                    this.actions.addRange([{
                            name: "actGOpravnyPredpisZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }]);
                }
                ok() {
                    if (!this.defaultForm.gform("isValid"))
                        return;
                    else {
                        let dto = { ixp: this.Ixp };
                        this.defaultForm.findFields().gfield("model", "collect", dto);
                        let task = Gordic.Isl.Predpisy.generovatOpravnyPredpis(rq => {
                            return {
                                rq: { Data: dto }
                            };
                        });
                        WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                    }
                }
            };
            GOpravnyPredpis = __decorate([
                Decorators.gcontent
            ], GOpravnyPredpis);
            WebClient.GOpravnyPredpis = GOpravnyPredpis;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09wcmF2bnlQcmVkcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR09wcmF2bnlQcmVkcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBb0VmO0FBcEVELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9FbkI7SUFwRWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9FN0I7UUFwRW9CLFdBQUEsU0FBUztZQUcxQixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFLN0MsY0FBYztvQkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLDhCQUE4QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO3lCQUMxRCxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBRXRCLENBQUM7Z0JBRU8sVUFBVTtvQkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBRTt5QkFDdEIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxDQUFDO3lCQUNsSCxNQUFNLENBQUMsRUFB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QUcsS0FBSCxVQUFHLFFBb0VuQjtBQUFELENBQUMsRUFwRVMsTUFBTSxLQUFOLE1BQU0sUUFvRWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR09wcmF2bnlQcmVkcGlzLnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9wcmF2bsO9IHDFmWVkcGlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0xMi0xOSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdPcHJhdm55UHJlZHBpcyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgT3ByYXZuw70gcMWZZWRwaXMgcHJvIHDFmcOtcGFkICR7dGhpcy5JeHB9YDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdPcHJhdm55UHJlZHBpc1phdnJpdFBvdG9ta3lcIl1cclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLEjMOhc3RrYSBwxZllZHBpc3VcIiwgcmVxdWlyZWQ6IHRydWUgfSkuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtuYW1lOlwiY1wifSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB2em5pa3VcIiwgcmVxdWlyZWQ6IHRydWUgfSkuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3Z6bmlrdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiRGF0dW0gc3BsYXRub3N0aVwiLCByZXF1aXJlZDogdHJ1ZSB9KS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJkYXRfc3BsXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTcGVjLiBzeW1ib2xcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJzc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOlwiVHlwXCIsIHJlcXVpcmVkOiB0cnVlIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIiwgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmV6X251bGFfdXBvOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvOiBcIjxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHY6IDIwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99IC0ge2t0Z191cG9fdHh0OnRyaW06ZW5jb2RlfVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R09wcmF2bnlQcmVkcGlzWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc09wcmF2bnlEdG8gPSB7IGl4cDogdGhpcy5JeHAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFzayA9IElzbC5QcmVkcGlzeS5nZW5lcm92YXRPcHJhdm55UHJlZHBpcyhycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=