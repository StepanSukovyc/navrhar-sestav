"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GGenerovaniOPR.ts                      </Name>
//    <Description> Generování opravných položek                                </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
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
                    let GGenerovaniOPR = class GGenerovaniOPR extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = `Generování UPO`;
                            this.createActions();
                            this.setBreadcrumbs([{
                                    caption: this.title,
                                    action: this.actions["actGGenerovaniOPRZavritPotomky"]
                                }]);
                            this.createForm();
                            WebClient.Common.Base.nastaveniPoleKtgUpo(this, this.IxpDen, this.data.typ_phl ?? "");
                        }
                        createForm() {
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow({ label: "Typ pohledávky", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.typPhlSimple(), {
                                name: "typ_phl",
                                model: "model.typ_phl=value.typ_phl",
                                disabled: this.editMode,
                                serverFilters: {
                                    aktivita: 100
                                },
                                change: (ev, obj) => {
                                    WebClient.Common.Base.aktualizovatPoleKtgUpo(this, this.IxpDen, obj.value?.typ_phl ?? "");
                                }
                            })
                                .addRow({ label: "Rok", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.rok(), {
                                model: "model.rok=value.rok",
                                disabled: this.editMode
                            })
                                .addRow({ label: "IČ Organizace", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosico(), {
                                name: "ico",
                                model: "model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Účetní středisko", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                                name: "ucs",
                                model: "model.ucs=value.ucs;model.ico=value.ico",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow({ label: "Kategorie pohybu", required: true })
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo",
                                model: "model.ktg_upo=value.ktg_upo",
                                disabled: this.editMode,
                                dropdown: true,
                            })
                                .addRow()
                                .addField("gcheck", {
                                name: "priz_gen_opr",
                                label: "Generovat opravné položky",
                                emptyValue: null,
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                }
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields().gfield("model", "apply", this.data);
                            this.defaultForm.findFields().gfield("model", "validators", this.validators);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGGenerovaniOPRZavritPotomky",
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
                                let dto = this.data;
                                this.defaultForm.findFields().gfield("model", "collect", dto);
                                let req = rq => {
                                    return {
                                        rq: { Data: dto }
                                    };
                                };
                                let task = this.editMode ? that.isl.GenerovaniOPR.update(req) : that.isl.GenerovaniOPR.create(req);
                                WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                            }
                        }
                    };
                    GGenerovaniOPR = __decorate([
                        Decorators.gcontent
                    ], GGenerovaniOPR);
                    Ciselniky.GGenerovaniOPR = GGenerovaniOPR;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0dlbmVyb3ZhbmlPUFIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHR2VuZXJvdmFuaU9QUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQTZHZjtBQTdHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2R25CO0lBN0dnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2RzdCO1FBN0dvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E2R3RDO1lBN0c4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxTQUFTLENBNkdoRDtnQkE3R3VDLFdBQUEsU0FBUztvQkFFN0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTt3QkFPNUMsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDOzRCQUM5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQ0FDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO29DQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQztpQ0FDekQsQ0FBQyxDQUFDLENBQUM7NEJBRUosSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUVsQixVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ2hGLENBQUM7d0JBRU8sVUFBVTs0QkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVB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TUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ25HLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDeEQsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUE7b0JBMUdZLGNBQWM7d0JBRDFCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLGNBQWMsQ0EwRzFCO29CQTFHWSx3QkFBYyxpQkEwRzFCLENBQUE7Z0JBQ0wsQ0FBQyxFQTdHdUMsU0FBUyxHQUFULGtCQUFTLEtBQVQsa0JBQVMsUUE2R2hEO1lBQUQsQ0FBQyxFQTdHOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUE2R3RDO1FBQUQsQ0FBQyxFQTdHb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNkc3QjtJQUFELENBQUMsRUE3R2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZHbkI7QUFBRCxDQUFDLEVBN0dTLE1BQU0sS0FBTixNQUFNLFFBNkdmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdHZW5lcm92YW5pT1BSLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHZW5lcm92w6Fuw60gb3ByYXZuw71jaCBwb2xvxb5layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51xaEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTEtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHR2VuZXJvdmFuaU9QUiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaU9QUkR0bztcclxuICAgICAgICBlZGl0TW9kZTogYm9vbGVhbjtcclxuICAgICAgICB2YWxpZGF0b3JzOiBhbnk7XHJcbiAgICAgICAgSXhwRGVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYEdlbmVyb3bDoW7DrSBVUE9gO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0dlbmVyb3ZhbmlPUFJaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UubmFzdGF2ZW5pUG9sZUt0Z1Vwbyh0aGlzLCB0aGlzLkl4cERlbiwgdGhpcy5kYXRhLnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBwb2hsZWTDoXZreVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQaGxTaW1wbGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5ha3R1YWxpem92YXRQb2xlS3RnVXBvKHRoaXMsIHRoaXMuSXhwRGVuLCBvYmoudmFsdWU/LnR5cF9waGwgPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJSb2tcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qucm9rKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDpcIm1vZGVsLnJvaz12YWx1ZS5yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJxIwgT3JnYW5pemFjZVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5la29zaWNvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiw5rEjWV0bsOtIHN0xZllZGlza29cIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y3M9dmFsdWUudWNzO21vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiS2F0ZWdvcmllIHBvaHlidVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5lZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2dlbl9vcHJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJHZW5lcm92YXQgb3ByYXZuw6kgcG9sb8W+a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHR2VuZXJvdmFuaU9QUlphdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pT1BSRHRvID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy5lZGl0TW9kZSA/IHRoYXQuaXNsLkdlbmVyb3ZhbmlPUFIudXBkYXRlKHJlcSkgOiB0aGF0LmlzbC5HZW5lcm92YW5pT1BSLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19