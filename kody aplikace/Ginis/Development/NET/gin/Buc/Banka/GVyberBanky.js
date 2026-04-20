"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GVyberBanky.ts                         </Name>
//    <Description> Dialog pro výběr banky pro načtení dávky                    </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-05-05                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /**Dialog pro výběr banky pro načtení dávky */
            let GVyberBanky = class GVyberBanky extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createForm();
                    //this.$form.findFields().gfield("model", "apply", this.data);
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: /* this.mod != 0*/ true,
                            run: function (ev, ctx) {
                                this.setPending(that.ok());
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření formuláře*/
                createForm() {
                    let form = new Gordic.Forms.Form({
                        name: "formVyberBanky",
                    })
                        .addRow("jres:33600462", true) //RC 33600462 : Název banky
                        .addField("gselectbox", Gordic.Prefabs.Select.bucspba(), {
                        name: "nazev_sbu",
                        model: "model.sk_vl=value.sk_vl",
                        change: (ev, ctx) => {
                            if (ctx.value) {
                                this.beginOperation();
                                this.isl.BucVyberBanky.read({
                                    data: {
                                        ico: ctx.value.ico,
                                        ucs: ctx.value.ucs,
                                        ixs_esu: ctx.value.ixs_esu,
                                        sbu: ctx.value.sbu,
                                        mod: this.mod
                                    }
                                }).getData().then((data) => {
                                    this.vybranaBankaDto = data;
                                    return this.createRadioButtons(data);
                                }).always(() => { this.endOperation(); });
                            }
                            else {
                                if (this.$formRB) {
                                    this.$formRB?.remove();
                                }
                                this.vybranaBankaDto = void 0;
                            }
                        }
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                createRadioButtons(data) {
                    if (this.$formRB) {
                        this.$formRB.remove();
                    }
                    let form = new Gordic.Forms.Form({
                        name: "formVyberBankyRadioButtons",
                    });
                    if ((data.vyb_typ_dav?.length ?? 0) > 0) {
                        form.addRow("jres:33600463", true); //RC 33600463 : Formát dávky
                        let radios = [];
                        for (let item of data.vyb_typ_dav ?? []) {
                            let radio = { value: 0 };
                            switch (item) {
                                case 10:
                                    radio = {
                                        id: "r0",
                                        value: 0,
                                        label: "jres:33600464" //RC 33600464 : Domácí
                                    };
                                    break;
                                case 20:
                                    radio = {
                                        id: "r0",
                                        value: 0,
                                        label: "jres:33600465" //RC 33600465 : Domácí+Zahraniční
                                    };
                                    break;
                                case 30:
                                    radio = {
                                        id: "r1",
                                        value: 1,
                                        label: "jres:33600466" //RC 33600466 : Zahraniční
                                    };
                                    break;
                                case 40:
                                    radio = {
                                        id: "r2",
                                        value: 2,
                                        label: "jres:33600467" //RC 33600467 : SEPA
                                    };
                                    break;
                            }
                            radios.push(radio);
                        }
                        form.addField("gradio", {
                            name: "rbFormatDavky",
                            //initialValue: 0,
                            groupName: "gradioFormatDavky",
                            radios: radios,
                            validators: [new Gordic.Validators.Required()]
                        });
                    }
                    if ((data.vyb_typ_vyp?.length ?? 0) > 0) {
                        form.addRow("jres:33600468", true); //RC 33600468 : Typy výpisů
                        let radios = [];
                        for (let item of data.vyb_typ_vyp ?? []) {
                            let radio = { id: "r" + item, value: item };
                            switch (item) {
                                case 0:
                                    radio.label = "jres:33600469"; //RC 33600469 : Zaúčtované
                                    break;
                                case 1:
                                    radio.label = "jres:33600470"; //RC 33600470 : Nezaúčtované
                                    break;
                            }
                            radios.push(radio);
                        }
                        form.addField("gradio", {
                            name: "rbTypyVypisu",
                            //initialValue: 0,
                            groupName: "gradioTypyVypisu",
                            radios: radios,
                            validators: [new Gordic.Validators.Required()]
                        });
                    }
                    if (data.vyb_gen_dod_pri) {
                        form.addRow({
                            label: "jres:33600471", //RC 33600471 : Dodatkové příkazy
                            hint: "jres:33600472" //RC 33600472 : Dávka ČNB bude mít režim dodatkých příkazů - lze použít pouze po dohodě s ČNB!
                        });
                        form.addField("gcheck", {
                            name: "dod_pri"
                        });
                    }
                    this.$formRB = $.newDiv().appendTo(this.element).gform("createFrom", form);
                }
                /**Akce Ok */
                ok() {
                    if (!this.$form.gform("isValid") || !this.$formRB || !this.$formRB.gform("isValid")) {
                        return $.Deferred().reject().promise();
                    }
                    // sebrání hodnot z formuláře
                    let formData = {};
                    this.$form.findFields().gfield("model", "collect", formData);
                    if (this.$formRB) {
                        this.$formRB.findFields().gfield("model", "collect", formData);
                    }
                    let res = {
                        bankaDto: this.vybranaBankaDto?.banka,
                        dat_kod: parseDate(new Date(Date.now())), //vždy toto
                        taj_kod: "111111", //vždy toto
                        kod_ban_num: this.vybranaBankaDto?.banka?.parametryDopresnujici?.kod_ban_num,
                        for_dav: (formData.rbFormatDavky >= 0 && formData.rbFormatDavky <= 2) ? formData.rbFormatDavky : 0,
                        typ_tra_vyp: (formData.rbTypyVypisu != void 0) ? formData.rbTypyVypisu : 0,
                        dod_pri: (formData.dod_pri != void 0) ? formData.dod_pri : 0,
                    };
                    return this.tryClose(res);
                }
            };
            GVyberBanky = __decorate([
                Decorators.gcontent
            ], GVyberBanky);
            WebClient.GVyberBanky = GVyberBanky;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyQmFua3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJCYW5reS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQW1OZjtBQW5ORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtTm5CO0lBbk5nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtTjdCO1FBbk5vQixXQUFBLFNBQVM7WUFrQjFCLDhDQUE4QztZQUU5QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsT0FBQSxZQUFZO2dCQVd6QyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsOERBQThEO2dCQUNsRSxDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsT0FBTyxFQUFDLGtCQUFrQixDQUFBLElBQUk7NEJBQzlCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUMvQixDQUFDO3lCQUNKLENBQUM7d0JBQ0YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUk7NEJBQ2Is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ZSxFQUFFLEtBQUs7d0JBQ3JDLE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXO3dCQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVc7d0JBQzlCLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxXQUFXO3dCQUM1RSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDL0QsQ0FBQztvQkFFRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFDSixDQUFBO1lBOUxZLFdBQVc7Z0JBRHZCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsV0FBVyxDQThMdkI7WUE5TFkscUJBQVcsY0E4THZCLENBQUE7UUFDTCxDQUFDLEVBbk5vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtTjdCO0lBQUQsQ0FBQyxFQW5OZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbU5uQjtBQUFELENBQUMsRUFuTlMsTUFBTSxLQUFOLE1BQU0sUUFtTmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR1Z5YmVyQmFua3kudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBwcm8gdsO9YsSbciBiYW5reSBwcm8gbmHEjXRlbsOtIGTDoXZreSAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNS0wNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgdsO9YsSbcnUgYmFua3kqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHVnliZXJCYW5reURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICAvKipNw7NkICgwLTMpKi9cclxuICAgICAgICBtb2Q6IG51bWJlclxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWw71zdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1IHbDvWLEm3J1IGJhbmt5Ki9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Z5YmVyQmFua3lEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgYmFua2FEdG8/OiBJbnRlcmZhY2UuR0JhbmthRHRvIHwgbnVsbCxcclxuICAgICAgICBkYXRfa29kOiBEYXRlLFxyXG4gICAgICAgIHRhal9rb2Q6IHN0cmluZyxcclxuICAgICAgICBrb2RfYmFuX251bT86IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgZm9yX2RhdjogbnVtYmVyLFxyXG4gICAgICAgIHR5cF90cmFfdnlwOiBudW1iZXIsXHJcbiAgICAgICAgZG9kX3ByaTogbnVtYmVyLFxyXG4gICAgfVxyXG5cclxuICAgIC8qKkRpYWxvZyBwcm8gdsO9YsSbciBiYW5reSBwcm8gbmHEjXRlbsOtIGTDoXZreSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJCYW5reSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqTcOzZCAoMC0zKSovXHJcbiAgICAgICAgcHVibGljIG1vZDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKipGb3JtdWzDocWZICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKipGb3JtdWzDocWZIGR5bmFtaWNreSB2eXR2w6HFmWVuw70gKi9cclxuICAgICAgICBwcml2YXRlICRmb3JtUkI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIER0byBzIHDFmcOtcGFkbm91IGFrdHXDoWxuxJsgdnlicmFub3UgYmFua291Ki9cclxuICAgICAgICBwcml2YXRlIHZ5YnJhbmFCYW5rYUR0bz86IEludGVyZmFjZS5HVnliZXJCYW5reVJlYWREdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuJGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOi8qIHRoaXMubW9kICE9IDAqL3RydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5vaygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1WeWJlckJhbmt5XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA0NjJcIiwgdHJ1ZSkgLy9SQyAzMzYwMDQ2MiA6IE7DoXpldiBiYW5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjc3BiYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9zYnVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5za192bD12YWx1ZS5za192bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjVnliZXJCYW5reS5yZWFkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogY3R4LnZhbHVlLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBjdHgudmFsdWUudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBjdHgudmFsdWUuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2J1OiBjdHgudmFsdWUuc2J1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2Q6IHRoaXMubW9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5YnJhbmFCYW5rYUR0byA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmFkaW9CdXR0b25zKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhpcy5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtUkIpIHsgdGhpcy4kZm9ybVJCPy5yZW1vdmUoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52eWJyYW5hQmFua2FEdG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVJhZGlvQnV0dG9ucyhkYXRhOiBJbnRlcmZhY2UuR1Z5YmVyQmFua3lSZWFkRHRvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtUkIpIHsgdGhpcy4kZm9ybVJCLnJlbW92ZSgpOyB9XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVZ5YmVyQmFua3lSYWRpb0J1dHRvbnNcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKChkYXRhLnZ5Yl90eXBfZGF2Py5sZW5ndGggPz8gMCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MzM2MDA0NjNcIiwgdHJ1ZSk7IC8vUkMgMzM2MDA0NjMgOiBGb3Jtw6F0IGTDoXZreVxyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlvczogSVJhZGlvPG51bWJlcj5bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBkYXRhLnZ5Yl90eXBfZGF2ID8/IFtdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGlvOiBJUmFkaW88bnVtYmVyPiA9IHsgdmFsdWU6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDQ2NFwiIC8vUkMgMzM2MDA0NjQgOiBEb23DoWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJyMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDA0NjVcIiAvL1JDIDMzNjAwNDY1IDogRG9tw6Fjw60rWmFocmFuacSNbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDQ2NlwiIC8vUkMgMzM2MDA0NjYgOiBaYWhyYW5pxI1uw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicjJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwNDY3XCIgLy9SQyAzMzYwMDQ2NyA6IFNFUEFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByYWRpb3MucHVzaChyYWRpbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRGaWVsZDxudW1iZXI+KFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJiRm9ybWF0RGF2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IFwiZ3JhZGlvRm9ybWF0RGF2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IHJhZGlvcyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKChkYXRhLnZ5Yl90eXBfdnlwPy5sZW5ndGggPz8gMCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MzM2MDA0NjhcIiwgdHJ1ZSk7IC8vUkMgMzM2MDA0NjggOiBUeXB5IHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaW9zOiBJUmFkaW88bnVtYmVyPltdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEudnliX3R5cF92eXAgPz8gW10pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaW86IElSYWRpbzxudW1iZXI+ID0geyBpZDogXCJyXCIgKyBpdGVtLCB2YWx1ZTogaXRlbSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpby5sYWJlbCA9IFwianJlczozMzYwMDQ2OVwiOyAvL1JDIDMzNjAwNDY5IDogWmHDusSNdG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvLmxhYmVsID0gXCJqcmVzOjMzNjAwNDcwXCI7IC8vUkMgMzM2MDA0NzAgOiBOZXphw7rEjXRvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByYWRpb3MucHVzaChyYWRpbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRGaWVsZDxudW1iZXI+KFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJiVHlweVZ5cGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogXCJncmFkaW9UeXB5VnlwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiByYWRpb3MsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnZ5Yl9nZW5fZG9kX3ByaSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDA0NzFcIiwgLy9SQyAzMzYwMDQ3MSA6IERvZGF0a292w6kgcMWZw61rYXp5XHJcbiAgICAgICAgICAgICAgICAgICAgaGludDogXCJqcmVzOjMzNjAwNDcyXCIgLy9SQyAzMzYwMDQ3MiA6IETDoXZrYSDEjE5CIGJ1ZGUgbcOtdCByZcW+aW0gZG9kYXRrw71jaCBwxZnDrWthesWvIC0gbHplIHBvdcW+w610IHBvdXplIHBvIGRvaG9kxJsgcyDEjE5CIVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvZF9wcmlcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm1SQiA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipBa2NlIE9rICovXHJcbiAgICAgICAgcHJpdmF0ZSBvaygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRmb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSB8fCAhdGhpcy4kZm9ybVJCIHx8ICF0aGlzLiRmb3JtUkIuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgIC8vIHNlYnLDoW7DrSBob2Rub3QgeiBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICBsZXQgZm9ybURhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZm9ybURhdGEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZm9ybVJCKSB7IHRoaXMuJGZvcm1SQi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTsgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlczogR1Z5YmVyQmFua3lEbGdSZXR1cm5WYWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgIGJhbmthRHRvOiB0aGlzLnZ5YnJhbmFCYW5rYUR0bz8uYmFua2EsXHJcbiAgICAgICAgICAgICAgICBkYXRfa29kOiBwYXJzZURhdGUobmV3IERhdGUoRGF0ZS5ub3coKSkpLCAvL3bFvmR5IHRvdG9cclxuICAgICAgICAgICAgICAgIHRhal9rb2Q6IFwiMTExMTExXCIsIC8vdsW+ZHkgdG90b1xyXG4gICAgICAgICAgICAgICAga29kX2Jhbl9udW06IHRoaXMudnlicmFuYUJhbmthRHRvPy5iYW5rYT8ucGFyYW1ldHJ5RG9wcmVzbnVqaWNpPy5rb2RfYmFuX251bSxcclxuICAgICAgICAgICAgICAgIGZvcl9kYXY6IChmb3JtRGF0YS5yYkZvcm1hdERhdmt5ID49IDAgJiYgZm9ybURhdGEucmJGb3JtYXREYXZreSA8PSAyKSA/IGZvcm1EYXRhLnJiRm9ybWF0RGF2a3kgOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwX3RyYV92eXA6IChmb3JtRGF0YS5yYlR5cHlWeXBpc3UgIT0gdm9pZCAwKSA/IGZvcm1EYXRhLnJiVHlweVZ5cGlzdSA6IDAsXHJcbiAgICAgICAgICAgICAgICBkb2RfcHJpOiAoZm9ybURhdGEuZG9kX3ByaSAhPSB2b2lkIDApID8gZm9ybURhdGEuZG9kX3ByaSA6IDAsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cnlDbG9zZShyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==