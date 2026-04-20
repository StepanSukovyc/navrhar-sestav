namespace Gordic.Spr.WebApp {
    const { gcontent } = Decorators

    export interface GVypocetLhutyDlgInputParams {
        DatumZahajeni?: Date,
        PocetDnu?: Decimal,
        //DatumLhuta?: Date,
        //DatumPrMocSsl?: Date,
        ShowOkButton?: boolean
    }

    export interface GVypocetLhutyDlgReturnValue {
        //IsSaved?: boolean,
        VypocetLhuty: Interface.GVypocetLhutyDto;
    }

    enum ActionNames {
        Ok = "actOk"
    }

    const FormName = "VypocetLhutyForm"

    @gcontent
    export class GVypocetLhutyDlg extends GContentBase {
        
        private dto: Interface.GVypocetLhutyDto = {};
        private $Form: JQuery<HTMLElement> = $("<div>");

        public onContentReady(): void {
            this.CreateMenu();
            this.$Form = GVypocetLhutyDlg.CreateForm(this.element, this.userSettings!);
            //this.EnableFieldsAndActions(this.dto && this.dto.edit_mode ? this.dto.edit_mode : false);

            const $fields = this.$Form.findFields();
            $fields.gfield("model", "apply", this.dto);

            //if (this.DatovaZprava.Validators) {
            //    $fields.gfield("model", "validators", this.DatovaZprava.Validators);
            //    Gordic.Utils.Form.markRequired(this.$Form);
            //}
        }

        private CreateMenu(): void {
            const content = this;

            const commandBarPole: MenuParams[] = [];
            if (this.dto.show_ok_button)
                commandBarPole.push({
                    action: content.actions.add(new GAction({
                        name: ActionNames.Ok, 
                        caption: "jres:25200121", //RC 25200121 : OK
                        tooltip: "jres:25200122", //RC 25200122 : OK
                        run: function () {
                            content.okClick();
                        }
                    })),
                    favorite: true,
                    customClass: "g-button--primary"
                });
            commandBarPole.push({
                action: content.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
            });
            content.commandBar(content.actions.createBar(commandBarPole));
        }

        private static CreateForm(
            appendTo: JQuery<HTMLElement>,
            userSettings: Data.IGStorage
        ): JQuery<HTMLElement> {

            var srv = new GContent({ className: "Gordic.Spr.WebApp.GSprUtils", params: {} });
            // Formulář
            const formBuilder = new Gordic.Forms.Form({
                name: FormName,
                layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, S-12-12-0"
            })
                .addSection("")
                .addRow("jres:25200117") //RC 25200117 : Počáteční datum
                .addField("gdatebox", "w-4 w-S-12", {
                    name: "dat_zahajeni", model: "dat_zahajeni",
                    change: function (ev, changeObj) {
                        const form = $(this).closest('.gform');
                        srv.call("DenText", { datum: changeObj.value })
                            .done(function (ret) {
                                form.findFields("dat_zahajeni_den").gstringbox("setValue", ret);
                                srv.call("DatumLhuty", { datum: changeObj.value, lhuta: form.findFields("pocet_dnu").gfield("getValue") })
                                    .done(function (ret) {
                                        form.findFields("dat_lhuta").gdatebox("setValue", ret);
                                    });
                            });
                    }
                })
                .addField("gstringbox", "w-8 w-S-12", { name: "dat_zahajeni_den", disabled: true })
                .addRow("jres:25200118") //RC 25200118 : Počet dní lhůty
                .addField("gnumberbox", "w-2 w-S-6", {
                    name: "pocet_dnu",
                    change: function (ev, changeObj) {
                        const form = $(this).closest('.gform');
                        srv.call("DatumLhuty", { datum: form.findFields("dat_zahajeni").gfield("getValue"), lhuta: changeObj.value })
                            .done(function (ret) {
                                form.findFields("dat_lhuta").gdatebox("setValue", ret);
                            });
                    }
                })
                .addRow("jres:25200119") //RC 25200119 : Poslední den lhůty
                .addField("gdatebox", "w-4 w-S-12", {
                    name: "dat_lhuta", model: "dat_lhuta",
                    change: function (ev, changeObj) {
                        const form = $(this).closest('.gform');
                        srv.call("DenText", { datum: changeObj.value })
                            .done(function (ret) {
                                form.findFields("dat_lhuta_den").gstringbox("setValue", ret);
                                if (changeObj.value != null) {
                                    var d = new Date(changeObj.value.toDateString());
                                    d.setDate(d.getDate() + 1);
                                    form.findFields("dat_pr_moc_ssl").gdatebox("setValue", d);
                                }
                            });
                    }
                })
                .addField("gstringbox", "w-8 w-S-12", { name: "dat_lhuta_den", disabled: true })
                .addRow("jres:25200120") //RC 25200120 : Právní moc
                .addField("gdatebox", "w-4 w-S-12", {
                    name: "dat_pr_moc_ssl", model: "dat_pr_moc_ssl",
                    change: function (ev, changeObj) {
                        const form = $(this).closest('.gform');
                        srv.call("DenText", { datum: changeObj.value })
                            .done(function (ret) {
                                form.findFields("dat_pr_moc_ssl_den").gstringbox("setValue", ret);
                            });
                    }
                })
                .addField("gstringbox", "w-8 w-S-12", { name: "dat_pr_moc_ssl_den", disabled: true })
                ;

            // Přidání formuláře do DOMu.
            return $("<div>")
                .appendTo(appendTo)
                .gform("createFrom", formBuilder);
        }

        private closing(result): JQuery.Promise<GVypocetLhutyDlgReturnValue> {
            return $.Deferred().resolve(result).promise();
        }

        private okClick(): void {
            if (!this.$Form.gform("isValid")) {
                return;
            }
            this.$Form.findFields().gfield("model", "collect", this.dto);
            this.tryClose({ VypocetLhuty: this.dto });
        }
    }
}