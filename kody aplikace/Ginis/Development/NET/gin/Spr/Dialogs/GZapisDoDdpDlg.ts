namespace Gordic.Spr.WebApp {
    const { gcontent } = Decorators

    export interface GZapisDoDdpDlgInputParams {
        IxpSpis: string,
        RadekPop: number,
        VysePlatby?: Decimal,
        IxpDdpSpol?: string,
        VSSpol?: string,
    }

    export interface GZapisDoDdpDlgReturnValue {
        Zmena?: boolean,
        //ZapisDoDdp: Interface.GZapisDoDdpDto;
    }

    enum ActionNames {
        Ok = "actOk"
    }

    const FormName = "ZapisDoDdpForm"

    @gcontent
    export class GZapisDoDdpDlg extends GContentBase {
        
        //private dto: Interface.GZapisDoDdpDto = {};
        private $Form: JQuery<HTMLElement> = $("<div>");
        model: any;

        public onContentReady(): void {
            this.CreateMenu();
            this.$Form = this.CreateForm(this.element, this.userSettings!);

            const $fields = this.$Form.findFields();
            $fields.gfield("model", "apply", this.model);
        }

        private CreateMenu(): void {
            const content = this;

            const commandBarPole: MenuParams[] = [];
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

        private CreateForm(
            appendTo: JQuery<HTMLElement>,
            userSettings: Data.IGStorage
        ): JQuery<HTMLElement> {
            var that = this;
            // Formulář
            const formBuilder = new Gordic.Forms.Form({
                name: FormName,
                layoutDescriptor: "L1M1S1, L-2-10-0, M-3-9-0, S-12-12-0"
            })
                .addSection("")
                .addRow("jres:25200407") //RC 25200407 : Kniha příjmů
                .addField("gselectbox", Gordic.Prefabs.Select.ddpsden(), {
                    name: "ixp_den_ddp", model: "model.ixp_den_ddp=value.ixp_den", dropdown: false, 
                    serverFilters: {
                        ico: that.model.Eko.Ico,
                        ucs: that.model.Eko.Ucs,
                        rok: that.model.Eko.Rok,
                    },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                .addRow("jres:25200409") //RC 25200409 : Referent
                .addField("gselectbox", Gordic.Prefabs.Select.ddpvrfu(), {
                    dropdown: false, name: "ixs_fun", model: "model.ixs_fun=value.ixs_fun",
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                    serverFilters: {
                        ixp_den: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true)
                    }
                })
                .addRow("jres:25200408") //RC 25200408 : Typ příjmu
                .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                    name: "typ_phl_ddp", model: "model.typ_phl_ddp=value.typ_phl", dropdown: false,
                    serverFilters: {
                        povolene_pro_knihu: new Gordic.Forms.Dependency("ixp_den_ddp", "ixp_den", true),
                        povolene_pro_funkci: new Gordic.Forms.Dependency("ixs_fun", "ixs_fun", true),
                    },
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                .addRow()
                .addField("gradio", {
                    name: "predpis_nebo_napojeni", 
                    radios: [
                        { value: 0, label: "jres:25200410" }, //RC 25200410 : Napojení na pohledávku
                        { value: 1, label: "jres:25200411" }, //RC 25200411 : Napojení na pohledávku s předpisem
                    ],
                    disabled: !that.model.predpis_nebo_napojeni_enable,
                    validators: [new Gordic.Validators.Required()],
                })
                .addRow("jres:25200412")  //RC 25200412 : Výše platby
                .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                    name: "c_pop", model: "model.Platba.c_pop = value", placeholder: "jres:25200141",
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                }) //RC 25200141 : Výše platby
                .addRow("jres:25200413") //RC 25200413 : Splatnost
                .addField("gdatebox", {
                    name: "dat_splatnosti", model: "model.dat_splatnosti=value", valueType: "date",
                    validators: [new Gordic.Validators.Required()],
                    flag: "required",
                })
                ;

            // Přidání formuláře do DOMu.
            return $("<div>")
                .appendTo(appendTo)
                .gform("createFrom", formBuilder);
        }

        private closing(result): JQuery.Promise<GZapisDoDdpDlgReturnValue> {
            return $.Deferred().resolve(result).promise();
        }

        private okClick(): void {
            var that = this;
            if (!this.$Form.gform("isValid")) {
                return;
            }
            this.$Form.findFields().gfield("model", "collect", this.model);

            // Uloz uziv params
            if (this.globalSettings != null) {
                this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastUsedKnihaDDP", this.model.ixp_den_ddp);
                this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastSpravcePohledavek", this.model.ixs_fun);
                this.globalSettings.set("contents.SPRZapisDoDdpDlg.LastTypPohledavky", this.model.typ_phl_ddp);
            }

            // Zapis do DDP
            this.call("ZapisDoDDP", { detailDto: that.model })
                .done(function () {
                    that.tryClose({ Zmena: true });
                });
        }
    }
}