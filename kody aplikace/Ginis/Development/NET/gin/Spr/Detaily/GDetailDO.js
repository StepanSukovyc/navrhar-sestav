"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            /**
             * GDetail
             *
             * @author Petr Dytrich
             */
            let GDetailDO = class GDetailDO extends Gordic.GDetailBuilderContent {
                onContentReady() {
                    var that = this;
                    this.Rezim = this.RezimDetailu;
                    if (this.Rezim == 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */)
                        this.originalModel = {
                            ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
                        };
                    this.loadData(this).done(function () {
                        that.setRezim(that.Rezim, that);
                    });
                    //this.actions["actOdstranit"]?.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite }); nefunguje
                    //(this.menuBar["actOdstranit"] as any).favorite = true; nefunguje
                }
                ;
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    builder.withComponent("dotcenyOrganDetail", {
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        //actions:
                        //{
                        //    actSkupiny: {
                        //        caption: "jres:25200191", //RC 25200191 : Skupiny
                        //        run: function (ev, obj) {
                        //            var Logovani = {
                        //                Ixp: that.IxpSpis,
                        //                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        //                //AktZnacka: this.AktZnacka,
                        //            }
                        //            var options = {
                        //                ID: "ESUSkupinyEsuDlg#",
                        //                Logovani: Logovani,
                        //                SkupinyWorkingMode: 1
                        //            };
                        //            //Gordic.Esu.Dialogs.RozdelovnikEsuDlg(this, options).on("close", function (ev, retVal) {
                        //            //    if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
                        //            //        that.novePridaniZeSkupiny(retVal.subjekty);
                        //            //    }
                        //            //});
                        //            var width = 850;
                        //            //var height = 650;
                        //            var modal = true;
                        //            that.dialogs.showWindow(["Gordic.Esu.Dialogs.RozdelovnikEsuDlg", {}],
                        //                {
                        //                    parentContent: that,
                        //                    opt: options
                        //                },
                        //                { width: width, modal: modal })
                        //                .on("close", function (ev, retVal) {
                        //                    debugger;
                        //                })
                        //        }
                        //    }
                        //},
                        //menuBar: [
                        //    { id: "skupiny", action: "actSkupiny", favorite: true },
                        //]
                    }, true);
                }
                ;
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                    var that = this;
                    var _afterDelete = function (content) {
                        content.tryClose();
                    };
                    this.detailMoveComponentGridRc = this.GridRc;
                    this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
                    this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
                    this.afterDelete = _afterDelete;
                    this.enableFields = function (enable) {
                        that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                        that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == 3 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace */));
                    };
                    this.enableActions = function (enable) {
                        //that.actions["actOdstranit"]?.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });  nefunguje
                        that.changeAktivitaComponentEnableActions(enable);
                        that.detailMoveComponentEnableActions(enable);
                    };
                }
                ;
                createForm() {
                    var that = this;
                    console.log("createForm(): ");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:25200186", opened: true }) //RC 25200186 : Dotčený orgán
                        .addSection({ customClass: "w-12", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0" })
                        .addRow("jres:25200137", true) //RC 25200137 : Subjekt
                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            // zadání logovacích údaju je nutnost hlavně IXP
                            Ixp: that.IxpSpis,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                            AktZnacka: that.SSLCjSpis,
                            DuvodHledaniTxt: WebApp.VyberEsu_DuvodHledaniTxt
                        }
                    }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                        .addRow("jres:25200166", true) //RC 25200166 : Druh dotč. org.
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                        name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { typ_vazby: [30 /* Gordic.Spr.Interface.TypSubjektuEnum.DotcenyOrgan */] }
                    })
                        .addRow("jres:25200187") //RC 25200187 : Urč. zákonem
                        .addField("gstringbox", { name: "zakon_do", customClass: "enabled" })
                        .addRow("jres:25200188", true) //RC 25200188 : Samosprávný celek
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sprctscDto(), {
                        name: "typ_sc", model: "model.typ_sc=value.typ_sc", customClass: "enabled", dropdown: true,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow()
                        .addField("gcheck", "w-5 w-L-4", {
                        label: "jres:25300039", name: "s_odes", customClass: "enabled", //RC 25300039 : Doručovat
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addRow("jres:25200058") //RC 25200058 : Poznámka
                        .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 });
                    return form;
                }
                ;
            };
            GDetailDO = __decorate([
                gcontent
            ], GDetailDO);
            WebApp.GDetailDO = GDetailDO;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERPLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbERPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0F1S2Y7QUF2S0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdUtuQjtJQXZLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBdUsxQjtRQXZLb0IsV0FBQSxNQUFNO1lBQ3ZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7ZUFJRztZQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxPQUFBLHFCQUF3QztnQkFVbkUsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSywyREFBbUQ7d0JBQzdELElBQUksQ0FBQyxhQUFhLEdBQUc7NEJBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDekgsQ0FBQztvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxvSEFBb0g7b0JBQ3BILGtFQUFrRTtnQkFDdEUsQ0FBQztnQkFBQSxDQUFDO2dCQUVGOzs7O21CQUlHO2dCQUNILG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JB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QUNMLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUFBLENBQUM7YUFDTCxDQUFBO1lBN0pZLFNBQVM7Z0JBRHJCLFFBQVE7ZUFDSSxTQUFTLENBNkpyQjtZQTdKWSxnQkFBUyxZQTZKckIsQ0FBQTtRQUNMLENBQUMsRUF2S29CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQXVLMUI7SUFBRCxDQUFDLEVBdktnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1S25CO0FBQUQsQ0FBQyxFQXZLUyxNQUFNLEtBQU4sTUFBTSxRQXVLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR0RldGFpbFxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIFBldHIgRHl0cmljaFxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsRE8gZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNOZXc+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICBJeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgSXhzRXN1OiBzdHJpbmc7XHJcbiAgICAgICAgVHlwVmF6Ynk6IG51bWJlcjtcclxuICAgICAgICBMaWNaYXN0OiBzdHJpbmc7XHJcbiAgICAgICAgUG9yWmFzdDogbnVtYmVyO1xyXG4gICAgICAgIFNTTENqU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIEdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgUmV6aW1EZXRhaWx1OiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHU7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJlemltID0gdGhpcy5SZXppbURldGFpbHU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbE1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9zcGlzOiB0aGlzLkl4cFNwaXMsIGl4c19lc3U6IHRoaXMuSXhzRXN1LCB0eXBfdmF6Ynk6IHRoaXMuVHlwVmF6YnksIGxpY196YXN0OiB0aGlzLkxpY1phc3QsIHBvcl96YXN0OiB0aGlzLlBvclphc3RcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcykuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFJlemltKHRoYXQuUmV6aW0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnNbXCJhY3RPZHN0cmFuaXRcIl0/LnVwZGF0ZSh7IGdyb3VwTmFtZTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkFjdGlvbnNHcm91cE5hbWUuRmF2b3JpdGUgfSk7IG5lZnVuZ3VqZVxyXG4gICAgICAgICAgICAvLyh0aGlzLm1lbnVCYXJbXCJhY3RPZHN0cmFuaXRcIl0gYXMgYW55KS5mYXZvcml0ZSA9IHRydWU7IG5lZnVuZ3VqZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcImRvdGNlbnlPcmdhbkRldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL2FjdGlvbnM6XHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGFjdFNrdXBpbnk6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxOTFcIiwgLy9SQyAyNTIwMDE5MSA6IFNrdXBpbnlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgTG9nb3ZhbmkgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vQWt0Wm5hY2thOiB0aGlzLkFrdFpuYWNrYSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIElEOiBcIkVTVVNrdXBpbnlFc3VEbGcjXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBMb2dvdmFuaTogTG9nb3ZhbmksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBTa3VwaW55V29ya2luZ01vZGU6IDFcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9Hb3JkaWMuRXN1LkRpYWxvZ3MuUm96ZGVsb3ZuaWtFc3VEbGcodGhpcywgb3B0aW9ucykub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBpZiAocmV0VmFsICYmIHJldFZhbC5zdWJqZWt0eSAmJiByZXRWYWwuc3ViamVrdHkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5ub3ZlUHJpZGFuaVplU2t1cGlueShyZXRWYWwuc3ViamVrdHkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgd2lkdGggPSA4NTA7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmFyIGhlaWdodCA9IDY1MDtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIG1vZGFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLkVzdS5EaWFsb2dzLlJvemRlbG92bmlrRXN1RGxnXCIsIHt9XSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIG9wdDogb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHsgd2lkdGg6IHdpZHRoLCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgeyBpZDogXCJza3VwaW55XCIsIGFjdGlvbjogXCJhY3RTa3VwaW55XCIsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGdW5rY2UgZGV0YWlsYnVpbGRlcnUsIHNwdcWhdMSbbsOhIHBvIG1lcmdlIGtvbXBvbmVudFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9hZnRlckRlbGV0ZSA9IGZ1bmN0aW9uIChjb250ZW50OiBHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnMgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0NoYW5nZUFrdGl2aXRhQ29tcG9uZW50RXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50R3JpZFJjID0gdGhpcy5HcmlkUmMhO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE1vdmVDb21wb25lbnROZXh0VGVtcGxhdGUgPSBcImpyZXM6MjUyMDAzOTZcIjsgLy9SQyAyNTIwMDM5NiA6IE7DoXNsZWR1asOtY8OtIHrDoXpuYW1cclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxNb3ZlQ29tcG9uZW50UHJldlRlbXBsYXRlID0gXCJqcmVzOjI1MjAwMzk3XCI7IC8vUkMgMjUyMDAzOTcgOiBQxZllZGNob3rDrSB6w6F6bmFtXHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJEZWxldGUgPSBfYWZ0ZXJEZWxldGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIi5lbmFibGVkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFlbmFibGUpOyAvLyBzbml6aSBwb2NldCB2b2xhbmkgZmluZEZpZWxkcywgbmFzdGF2aSBjZWxvdSBjdXN0b21DbGFzcyBcImVuYWJsZWRcIiBuYWplZG5vdVxyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlIHx8ICh0aGlzLlJlemltID09IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5FZGl0YWNlKSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9uc1tcImFjdE9kc3RyYW5pdFwiXT8udXBkYXRlKHsgZ3JvdXBOYW1lOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQWN0aW9uc0dyb3VwTmFtZS5GYXZvcml0ZSB9KTsgIG5lZnVuZ3VqZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV0YWlsTW92ZUNvbXBvbmVudEVuYWJsZUFjdGlvbnMoZW5hYmxlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUZvcm0oKTogXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI1MjAwMTg2XCIsIG9wZW5lZDogdHJ1ZSB9KSAvL1JDIDI1MjAwMTg2IDogRG90xI1lbsO9IG9yZ8OhblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBjdXN0b21DbGFzczogXCJ3LTEyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0yLTEwLTAsIE0tMy05LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDEzN1wiLCB0cnVlKSAvL1JDIDI1MjAwMTM3IDogU3ViamVrdFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSxcclxuICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoYXQuU1NMQ2pTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFZ5YmVyRXN1X0R1dm9kSGxlZGFuaVR4dFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiaXhzX2VzdVwiLCBtb2RlbDogXCJtb2RlbC5peHNfZXN1PXZhbHVlLml4c19lc3VcIiwgY3VzdG9tQ2xhc3M6IFwiZW5hYmxlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDE2NlwiLCB0cnVlKSAvL1JDIDI1MjAwMTY2IDogRHJ1aCBkb3TEjS4gb3JnLlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2Zsc2R2YVNwckR0bygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHZhXCIsIG1vZGVsOiBcIm1vZGVsLml4c19kdmE9dmFsdWUuaXhzX2R2YVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyB0eXBfdmF6Ynk6IFtHb3JkaWMuU3ByLkludGVyZmFjZS5UeXBTdWJqZWt0dUVudW0uRG90Y2VueU9yZ2FuXSB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjUyMDAxODdcIikgLy9SQyAyNTIwMDE4NyA6IFVyxI0uIHrDoWtvbmVtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ6YWtvbl9kb1wiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1MjAwMTg4XCIsIHRydWUpIC8vUkMgMjUyMDAxODggOiBTYW1vc3Byw6F2bsO9IGNlbGVrXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcHJjdHNjRHRvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9zY1wiLCBtb2RlbDogXCJtb2RlbC50eXBfc2M9dmFsdWUudHlwX3NjXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy01IHctTC00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI1MzAwMDM5XCIsIG5hbWU6IFwic19vZGVzXCIsIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIiwgLy9SQyAyNTMwMDAzOSA6IERvcnXEjW92YXRcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTIwMDA1OFwiKSAvL1JDIDI1MjAwMDU4IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiLCBjdXN0b21DbGFzczogXCJlbmFibGVkXCIsIHJvd3M6IDQgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSJdfQ==