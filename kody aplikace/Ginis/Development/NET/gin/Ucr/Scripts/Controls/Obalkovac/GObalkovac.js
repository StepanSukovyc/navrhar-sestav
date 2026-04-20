"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GObalkovac = class GObalkovac extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GObalkovac#";
                    // vstupni hodnoty
                    this.refresh = false;
                    this.filesLoaded = false;
                }
                prepareContent() {
                    this.init();
                }
                onContentReady() {
                    this.init();
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init() {
                    this.filesLoaded = false;
                    //if (!options) return;
                    let that = this;
                    that.refresh = false;
                    that.createActions();
                    // prikazova lista
                    that.commandBar([
                        { action: that.actions.actObalkovat, primary: true },
                        { action: that.actions.actZavrit, primary: false },
                    ]);
                    this.createForm();
                    // definice menu
                    //that.menuBar([
                    //]);
                }
                /**
                 * Definice akci
                 * @param that
                 */
                createActions() {
                    let that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actObalkovat: {
                            enabled: false, visible: true,
                            caption: "jres:30250656", //RC 30250656 : Zaobálkovat
                            run: function () {
                                this.setPending(that.obalkuj());
                            }
                        }
                    });
                }
                /**
                 * Vytvoreni formulare
                 */
                createForm() {
                    let that = this;
                    var form = new Gordic.Forms.Form({
                        name: "formDetail", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0"
                    })
                        //.addSection("jres:30250021") //RC 30250021 : Objednáno SML
                        .addRow({ label: "jres:30250651", required: true })
                        .addField("gstringbox", //RC 30250651 : Registrační číslo ZO
                    Gordic.Eko.Detail.Field.getCounterOptions(15, true, true, {
                        disabled: false, name: "PersonalID",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        tooltip: "jres:30250652", //RC 30250652 : Registrační číslo ZO v systému CSÚIS
                        validators: [
                            new Gordic.Validators.Required()
                        ],
                        change: function (ev, changeObj) { that.NastaveniAkci(); },
                    }))
                        .addRow("jres:30250650").addField("gstringbox", //RC 30250650 : Telefon
                    { name: "PhoneNumber" })
                        .addSection()
                        .addRow("jres:30250648").addField("gstringbox", //RC 30250648 : Jméno a přijmení
                    {
                        name: "PersonName",
                        tooltip: "jres:30250653" //RC 30250653 : Jméno a příjmení ZO/NZO
                    })
                        .addRow("jres:30250649").addField("gstringbox", //RC 30250649 : E-mail
                    { name: "Email" })
                        .addSection({
                        label: "jres:30250654", //RC 30250654 : Výběr souboru
                        layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-0-12-0"
                    })
                        .addRow({ label: "jres:30250654" }).addField("gfilefield", "w-12", //RC 30250654 : Výběr souboru
                    {
                        name: "uploadTMPFile",
                        //customClass: "downloadField",
                        acceptExtension: ".xml",
                        itemWidth: "w-L-4 w-S-12 w-M-6", flag: Gordic.Prefabs.Field.Flags.required,
                        mode: "replace",
                        //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                        fileUploaded: function (ev, obj) {
                            that.showFlash("jres:30250655".format(obj.fileInfo.filename), "success", "xx"); //RC 30250655 : Soubor {0} nahrán.
                            that.filesLoaded = true;
                            that.NastaveniAkci();
                        }
                    });
                    var tabHead = $.newDiv()
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    // #region Pokus_s_gpreset START
                    // GPreset
                    if (this.element.hasClass(Gordic.Widget.GPreset.widgetCssClass)) {
                        this.element.gpreset("destroy");
                    }
                    this.element.gpreset({
                        placeTo: PlaceEnum.command,
                        elements: this.findFields("PersonalID,PhoneNumber,PersonName,Email"),
                        userSettings: this.userSettings,
                    });
                    this.element.gpreset("apply");
                    //  #endregion Pokus_s_gpreset END
                }
                /**
                 * Spusteni vlastniho obalkovani
                 *
                 */
                obalkuj() {
                    let that = this;
                    return that.validation()
                        .then((result) => {
                        if (!result)
                            throw GError;
                        if (that.closed)
                            return;
                        let dtoSeneder = {};
                        that.findForms("formDetail,formHeader").findFields().gfield("model", "collect", dtoSeneder); // verificationNeeded: false
                        return that.isl.UcrObalkovac.pridejObalku({ rq: { FileInfo: that.infoFile, Sender: dtoSeneder } }).
                            get()
                            .then((result) => {
                            if (that.closed)
                                return;
                            new GFile().download(result);
                        });
                        //.catch(() => {
                        //})                                                    
                    });
                }
                /**
                 * Validace pred odeslanim
                 *
                 */
                validation() {
                    let that = this;
                    let defClose = $.Deferred();
                    // validace formulare
                    if (!that.findForms().gform("isValid"))
                        return defClose.reject(false).promise();
                    that.findFields("uploadTMPFile").gfilefield("getValueAsync").then(function (data) {
                        console.log(data);
                        debugger;
                        if (typeof data === "undefined" || data.length == 0) {
                            that.dialogs.warning("jres:30250672"); //RC 30250672 : Není vybrán žádný soubor!
                            return defClose.reject(false);
                        }
                        that.infoFile = data[0];
                        return defClose.resolve(true).promise();
                    }).catch(() => {
                        defClose.reject(false).promise();
                    });
                    return defClose;
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    let personalID = this.findFields("PersonalID").gfield("getValue");
                    this.actions.actObalkovat?.update({ enabled: this.filesLoaded && personalID !== null && typeof personalID != "undefined" && personalID.trim() != "" });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    return def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true }).promise();
                }
            };
            GObalkovac = __decorate([
                Decorators.gcontent
            ], GObalkovac);
            WebClient.GObalkovac = GObalkovac;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09iYWxrb3ZhYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdPYmFsa292YWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtOZjtBQWxORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrTm5CO0lBbE5nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrTjdCO1FBbE5vQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLE9BQUEsWUFBWTtnQkFBNUM7O29CQUNJLFFBQUcsR0FBRyxhQUFhLENBQUM7b0JBQ3BCLGtCQUFrQjtvQkFDVixZQUFPLEdBQVksS0FBSyxDQUFDO29CQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztnQkF5TXpDLENBQUM7Z0JBcE1VLGNBQWM7b0JBRWpCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFFTSxjQUFjO29CQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRSxJQUFJO29CQUNQLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsa0JBQWtCO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNaLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7d0JBQ3BELEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7cUJBQ3JELENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixLQUFLO2dCQUNULENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxhQUFhO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkcsWUFBWSxFQUFFOzRCQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUk7NEJBQzdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCOzRCQUNyRCxHQUFHLEVBQUU7Z0NBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDcEMsQ0FBQzt5QkFDSjtxQkFFSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFHRDs7bUJBRUc7Z0JBQ0ssVUFBVTtvQkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQzdCLElBQUksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUscUNBQXFDO3FCQUM5RSxDQUFDO3dCQUNFLDREQUE0RDt5QkFDM0QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBQ2xELFFBQVEsQ0FBQyxZQUFZLEVBQUUsb0NBQW9DO29CQUN4RCxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO3dCQUMvQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZO3dCQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7d0JBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0RBQW9EO3dCQUU5RSxVQUFVLEVBQUU7NEJBQ1IsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTt5QkFDbkM7d0JBQ0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUM3RCxDQUFDLENBQUM7eUJBQ04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsdUJBQXVCO29CQUNuRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzt5QkFDM0IsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGdDQUFnQztvQkFDNUU7d0JBQ0ksSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLENBQUMsdUNBQXVDO3FCQUNuRSxDQUFDO3lCQUVMLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLHNCQUFzQjtvQkFDbEUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7eUJBQ3JCLFVBQVUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDckQsZ0JBQWdCLEVBQUUsc0NBQXNDO3FCQUMzRCxDQUFDO3lCQUNELE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLDZCQUE2QjtvQkFDNUY7d0JBQ0ksSUFBSSxFQUFFLGVBQWU7d0JBRXJCLCtCQUErQjt3QkFDL0IsZUFBZSxFQUFFLE1BQU07d0JBQ3ZCLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7d0JBQzFFLElBQUksRUFBRSxTQUFTO3dCQUNmLGdFQUFnRTt3QkFDaEUsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDLGtDQUFrQzs0QkFDeEgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFFekIsQ0FBQztxQkFDSixDQUFDLENBQ0w7b0JBQ0wsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsNEJBQTRCO29CQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVO29CQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV0QixnQ0FBZ0M7b0JBQ2pDLFVBQVU7b0JBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO3dCQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDakIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO3dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5Q0FBeUMsQ0FBQzt3QkFDcEUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFhO3FCQUNuQyxDQUFDLENBQUE7b0JBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlCLGtDQUFrQztnQkFFdEMsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNLLE9BQU87b0JBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ25CLElBQUksQ0FDTCxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNILElBQUksQ0FBQyxNQUFNOzRCQUFFLE1BQU0sTUFBTSxDQUFDO3dCQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNOzRCQUFFLE9BQU87d0JBQ3hCLElBQUksVUFBVSxHQUF1QyxFQUFFLENBQUM7d0JBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQSxDQUFDLDRCQUE0Qjt3QkFDeEgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQzs0QkFDbEcsR0FBRyxFQUFFOzZCQUNBLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOzRCQUVqQixJQUFJLElBQUksQ0FBQyxNQUFNO2dDQUFFLE9BQU87NEJBQ3BCLElBQUksS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNyQyxDQUFDLENBQUMsQ0FBQTt3QkFDRixnQkFBZ0I7d0JBQ2hCLHdEQUF3RDtvQkFDcEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRTVCLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO3dCQUNsQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLFFBQVEsQ0FBQzt3QkFDVCxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDLHlDQUF5Qzs0QkFDL0UsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsQyxDQUFDO3dCQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQ1YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsT0FBTyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRyxhQUFhO29CQUNqQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksVUFBVSxLQUFHLElBQUksSUFBRyxPQUFPLFVBQVUsSUFBSSxXQUFXLElBQUssVUFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUdsSyxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ksT0FBTztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFHdkIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1RyxDQUFDO2FBRUosQ0FBQTtZQTdNWSxVQUFVO2dCQUR0QixVQUFVLENBQUMsUUFBUTtlQUNQLFVBQVUsQ0E2TXRCO1lBN01ZLG9CQUFVLGFBNk10QixDQUFBO1FBRUwsQ0FBQyxFQWxOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa043QjtJQUFELENBQUMsRUFsTmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtObkI7QUFBRCxDQUFDLEVBbE5TLE1BQU0sS0FBTixNQUFNLFFBa05mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdPYmFsa292YWMgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIHVpZCA9IFwiR09iYWxrb3ZhYyNcIjtcclxuICAgICAgICAvLyB2c3R1cG5pIGhvZG5vdHlcclxuICAgICAgICBwcml2YXRlIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGZpbGVzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIGluZm9yYW1jZSBvIHByZW5lc2VuZW0gc291Ym9ydVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaW5mb0ZpbGU6IEdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvO1xyXG4gICAgICAgIHB1YmxpYyBwcmVwYXJlQ29udGVudCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBJbmljaWFsaXphY2UgZm9ybXVsYXJlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5maWxlc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL2lmICghb3B0aW9ucykgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9iYWxrb3ZhdCwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIHByaW1hcnk6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgbWVudVxyXG4gICAgICAgICAgICAvL3RoYXQubWVudUJhcihbXHJcbiAgICAgICAgICAgIC8vXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBha2NpXHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudHJ5Q2xvc2UoKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9iYWxrb3ZhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDY1NlwiLCAvL1JDIDMwMjUwNjU2IDogWmFvYsOhbGtvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5vYmFsa3VqKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcImpyZXM6MzAyNTAwMjFcIikgLy9SQyAzMDI1MDAyMSA6IE9iamVkbsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDY1MVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwNjUxIDogUmVnaXN0cmHEjW7DrSDEjcOtc2xvIFpPXHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5GaWVsZC5nZXRDb3VudGVyT3B0aW9ucygxNSwgdHJ1ZSwgdHJ1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwiUGVyc29uYWxJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjUyXCIsIC8vUkMgMzAyNTA2NTIgOiBSZWdpc3RyYcSNbsOtIMSNw61zbG8gWk8gdiBzeXN0w6ltdSBDU8OaSVNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHsgdGhhdC5OYXN0YXZlbmlBa2NpKCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDY1MFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgLy9SQyAzMDI1MDY1MCA6IFRlbGVmb25cclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiUGhvbmVOdW1iZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTA2NDhcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIC8vUkMgMzAyNTA2NDggOiBKbcOpbm8gYSBwxZlpam1lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBlcnNvbk5hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjUzXCIgLy9SQyAzMDI1MDY1MyA6IEptw6lubyBhIHDFmcOtam1lbsOtIFpPL05aT1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjQ5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCAvL1JDIDMwMjUwNjQ5IDogRS1tYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcIkVtYWlsXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMjUwNjU0XCIsIC8vUkMgMzAyNTA2NTQgOiBWw71ixJtyIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA2NTRcIiB9KS5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwgXCJ3LTEyXCIsIC8vUkMgMzAyNTA2NTQgOiBWw71ixJtyIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkVE1QRmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJkb3dubG9hZEZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbjogXCIueG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LUwtNCB3LVMtMTIgdy1NLTZcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwicmVwbGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkRG93bmxvYWRlckNsYXNzOiBcIkdvcmRpYy5Eb2N1bWVudHMuV2ViQ2xpZW50LkdGdHBDbGllbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVVwbG9hZGVkOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwNjU1XCIuZm9ybWF0KG9iai5maWxlSW5mby5maWxlbmFtZSBhcyBhbnkpLCBcInN1Y2Nlc3NcIiwgXCJ4eFwiKSAvL1JDIDMwMjUwNjU1IDogU291Ym9yIHswfSBuYWhyw6FuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWxlc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB2YXIgdGFiSGVhZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvLyBwcm8gdmFsaWRhdG9yeSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSB0aGlzLmVsZW1lbnQ7IC8vdGFiSGVhZDtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRUbyh0YWJIZWFkKTtcclxuXHJcbiAgICAgICAgICAgICAvLyAjcmVnaW9uIFBva3VzX3NfZ3ByZXNldCBTVEFSVFxyXG4gICAgICAgICAgICAvLyBHUHJlc2V0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQ2xhc3MoR29yZGljLldpZGdldC5HUHJlc2V0LndpZGdldENzc0NsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdwcmVzZXQoXCJkZXN0cm95XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5ncHJlc2V0KHtcclxuICAgICAgICAgICAgICAgIHBsYWNlVG86IFBsYWNlRW51bS5jb21tYW5kLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IHRoaXMuZmluZEZpZWxkcyhcIlBlcnNvbmFsSUQsUGhvbmVOdW1iZXIsUGVyc29uTmFtZSxFbWFpbFwiKSxcclxuICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdwcmVzZXQoXCJhcHBseVwiKTtcclxuICAgICAgICAgICAgLy8gICNlbmRyZWdpb24gUG9rdXNfc19ncHJlc2V0IEVORFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNwdXN0ZW5pIHZsYXN0bmlobyBvYmFsa292YW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvYmFsa3VqKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQudmFsaWRhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHRocm93IEdFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG9TZW5lZGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyU2VuZGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybURldGFpbCxmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvU2VuZWRlcikgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuVWNyT2JhbGtvdmFjLnByaWRlak9iYWxrdSh7IHJxOiB7IEZpbGVJbmZvOiB0aGF0LmluZm9GaWxlLCBTZW5kZXI6IGR0b1NlbmVkZXIgfSB9KS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHRmlsZSgpLmRvd25sb2FkKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkYWNlIHByZWQgb2Rlc2xhbmltXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0aW9uKCk6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZDbG9zZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bGFyZVxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1cGxvYWRUTVBGaWxlXCIpLmdmaWxlZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDY3MlwiKSAvL1JDIDMwMjUwNjcyIDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSBzb3Vib3IhXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmluZm9GaWxlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdmVuaUFrY2koKSB7XHJcbiAgICAgICAgICAgIGxldCBwZXJzb25hbElEID0gdGhpcy5maW5kRmllbGRzKFwiUGVyc29uYWxJRFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9iYWxrb3ZhdD8udXBkYXRlKHsgZW5hYmxlZDogdGhpcy5maWxlc0xvYWRlZCAmJiBwZXJzb25hbElEIT09bnVsbCAmJnR5cGVvZiBwZXJzb25hbElEICE9IFwidW5kZWZpbmVkXCIgJiYgKHBlcnNvbmFsSUQgYXMgc3RyaW5nKS50cmltKCkhPVwiXCIgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoeyByZWZyZXNoOiB0eXBlb2YgdGhhdC5yZWZyZXNoICE9PSBcInVuZGVmaW5lZFwiICYmIHRoYXQucmVmcmVzaCA9PT0gdHJ1ZSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSJdfQ==