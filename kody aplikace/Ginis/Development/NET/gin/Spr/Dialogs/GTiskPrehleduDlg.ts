namespace Gordic.Spr.WebApp {
    const { gcontent } = Decorators

    export interface GTiskPrehleduDlgInputParams {
    }

    export interface GTiskPrehleduDlgReturnValue {
    }

    enum ActionNames {
        Tisk = "actTisk"
    }

    const FormName = "TiskPrehleduForm"

    @gcontent
    export class GTiskPrehleduDlg extends GContentBase {
        
        private $Form: JQuery<HTMLElement> = $("<div>");
        model: any;

        public onContentReady(): void {
            this.CreateMenu();
            this.$Form = this.CreateForm(this.element, this.userSettings!);

            const $fields = this.$Form.findFields();
            $fields.gfield("model", "apply", this.model);
        }

        private CreateMenu(): void {
            const that = this;

            const commandBarPole: MenuParams[] = [];
            commandBarPole.push({
                action: that.actions.add(GAction.createPrintAction({
                    name: ActionNames.Tisk,
                    caption: "jres:25200427", //RC 25200427 : Tisk
                    tooltip: "jres:25200427", //RC 25200427 : Tisk
                    tema: "spr_ptm_pre",
                    serverParameterMethod: "Gordic.Spr.WebApp.GTiskPrehleduDlg:ServerParameterMethod",
                    dialogOpening: function () {
                        return that.mohuOtevritTisk();
                    },
                    reportStarting: function (rep) {
                        rep.customDto = that.model;
                    },

                })),
                favorite: true,
                customClass: "g-button--primary"
            });
            commandBarPole.push({
                action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
            });
            that.commandBar(that.actions.createBar(commandBarPole));
        }

        private CreateForm(
            appendTo: JQuery<HTMLElement>,
            userSettings: Data.IGStorage
        ): JQuery<HTMLElement> {
            var that = this;
            var l_sGinspodName = "Ginspod";
            // Formulář
            const formBuilder = new Gordic.Forms.Form({
                name: FormName,
                layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0"
            })
                .addSection("")
                .addRow("jres:25200428") //RC 25200428 : Období od, do
                .addField("gdatebox", "w-6", { model: "model.datum_od=value" })
                .addField("gdatebox", "w-6", { model: "model.datum_do=value" })
                .addRow("jres:25200429") //RC 25200429 : Počet dní
                .addField("gnumberbox", "w-2 w-S-6", {
                    name: "pocet_dni",
                    minValue: 0,
                    maxValue: 99999,
                })
                .addRow("jres:25200430") //RC 25200430 : Typ lhůty
                .addField("gselectbox", Gordic.Prefabs.Select.sprctrmDto(), {
                    name: "typ_term", model: "model.typ_term=value.typ_term", dropdown: true,
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                .addRow("jres:25200431") //RC 25200431 : Vlastník
                .addField("gselectbox", Gordic.Gin.Fields.ginspodSSU(
                    {
                        name: l_sGinspodName,
                        model: "model.ixs_su=value.ixs_su",
                        serverFilters: {
                            aktivita: [100]
                        },
                        validators: that.model.su_required ? [new Gordic.Validators.Required()] : [],
                        flag: that.model.su_required ? "required" : "",
                        disabled: that.model.su_disabled 
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                .addField("gselectbox", Gordic.Gin.Fields.ginsfunSSU(
                    {
                        name: "ixsFunVlastnik",
                        model: "model.ixs_fun=value.ixs_fun",
                        itemTemplate: function (output: any) {
                            return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                        },
                        serverFilters: {
                            aktivita: [100],
                            ixs_su: new Gordic.Forms.Dependency(l_sGinspodName, "ixs_su")
                        },
                        validators: that.model.fun_required ? [new Gordic.Validators.Required()] : [],
                        flag: that.model.fun_required ? "required" : "",
                        disabled: that.model.fun_disabled 
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, l_sGinspodName))
                ;

            // Přidání formuláře do DOMu.
            return $("<div>")
                .appendTo(appendTo)
                .gform("createFrom", formBuilder);
        }

        public mohuOtevritTisk(): boolean {
            var ret = false;
            var form = this.findForms();
            var fields = form.findFields();
            if (form.gform("isValid")) {
                fields.gfield("model", "collect", this.model);
                ret = true;
            }
            return ret;
        }
    }
}