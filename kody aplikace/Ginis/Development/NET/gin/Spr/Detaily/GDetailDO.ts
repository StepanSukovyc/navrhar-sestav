namespace Gordic.Spr.WebApp {
    var gcontent = Decorators.gcontent;

    /**
     * GDetail
     * 
     * @author Petr Dytrich
     */
    @gcontent
    export class GDetailDO extends GDetailBuilderContent<UsedComponentsNew> implements IGContent {
        IxpSpis: string;
        IxsEsu: string;
        TypVazby: number;
        LicZast: string;
        PorZast: number;
        SSLCjSpis: string;
        GridRc: Gordic.Components.GridRC<any> | undefined;
        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu;

        onContentReady() {
            var that = this;
                        
            this.Rezim = this.RezimDetailu;
            if (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View)
                this.originalModel = {
                    ixp_spis: this.IxpSpis, ixs_esu: this.IxsEsu, typ_vazby: this.TypVazby, lic_zast: this.LicZast, por_zast: this.PorZast
                };
            this.loadData(this).done(function () {
                that.setRezim(that.Rezim, that);
            });
            //this.actions["actOdstranit"]?.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite }); nefunguje
            //(this.menuBar["actOdstranit"] as any).favorite = true; nefunguje
        };

        /**
         * onDetailBuilderInit
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void {
            var that = this;

            builder.withComponent<this>("dotcenyOrganDetail", {
                tabs:
                {
                    tabZakladni:
                    {
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
        };

        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         * 
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder) {
            var that = this;
            var _afterDelete = function (content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions) {
                content.tryClose();
            };

            this.detailMoveComponentGridRc = this.GridRc!;
            this.detailMoveComponentNextTemplate = "jres:25200396"; //RC 25200396 : Následující záznam
            this.detailMoveComponentPrevTemplate = "jres:25200397"; //RC 25200397 : Předchozí záznam
            this.afterDelete = _afterDelete;

            this.enableFields = function (enable: boolean) {
                that.findFields(".enabled").gfield("option", "disabled", !enable); // snizi pocet volani findFields, nastavi celou customClass "enabled" najednou
                that.findFields("ixs_esu").gfield("option", "disabled", !enable || (this.Rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.Editace)); 
            }
            this.enableActions = function (enable: boolean) {                
                //that.actions["actOdstranit"]?.update({ groupName: Gordic.Gin.Globals.Enums.ActionsGroupName.Favorite });  nefunguje
                that.changeAktivitaComponentEnableActions(enable);
                that.detailMoveComponentEnableActions(enable);
            };
        };

        createForm(): Gordic.Forms.Form {
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
                        DuvodHledaniTxt: VyberEsu_DuvodHledaniTxt
                    }
                }), { name: "ixs_esu", model: "model.ixs_esu=value.ixs_esu", customClass: "enabled", validators: [new Gordic.Validators.Required()] })
                .addRow("jres:25200166", true) //RC 25200166 : Druh dotč. org.
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.wflsdvaSprDto(), {
                    name: "ixs_dva", model: "model.ixs_dva=value.ixs_dva", customClass: "enabled", dropdown: true,
                    validators: [new Gordic.Validators.Required()],
                    serverFilters: { typ_vazby: [Gordic.Spr.Interface.TypSubjektuEnum.DotcenyOrgan] }
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
                .addField("gstringbox", { name: "poznamka", customClass: "enabled", rows: 4 })
                ;
            return form;
        };
    }
}