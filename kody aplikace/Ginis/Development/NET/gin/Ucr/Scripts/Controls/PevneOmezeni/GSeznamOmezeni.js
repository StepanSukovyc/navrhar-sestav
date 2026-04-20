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
            var gcontent = Decorators.gcontent;
            let GSeznamOmezeni = 
            /**
             *  Seznam pevneho omezeni
             */
            class GSeznamOmezeni extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.change = false;
                }
                onContentReady() {
                    let that = this;
                    this.statusOmezeni = Gordic.Eko.Detail.StatusBar.createItem({ id: "statusOmezeni" });
                    this.statusBar([
                        this.statusOmezeni
                    ]);
                    this.actions.addRange({
                        actionZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({ enabled: true, run: function () { that.reload(); } }),
                        actZmenitOmezeni: {
                            caption: "jres:30250578", enabled: true, run: function () {
                                that.ZmenitPlatnost()
                                    .then((result) => {
                                    if (typeof result === "undefined")
                                        return;
                                    return that.call("ZmenitObdobiOmezeni", { obdobi: result })
                                        .then(function (result) {
                                        that.showFlash({ label: "jres:30250584", id: "idmess" }); //RC 30250584 : Změna platnosti pevného omezení uložena
                                        that.change = true;
                                        that.nastavHodnoty(result);
                                        //that.reload();
                                        return;
                                    });
                                });
                            }
                        }
                    });
                    this.menuBar([
                        {
                            id: "menuUcrZmenitOmezeni", action: this.actions.actZmenitOmezeni, favorite: true //, primary: true
                        },
                        {
                            id: "mnuUCRObcerstvit", action: this.actions.actObcerstvit, favorite: true //, primary: true
                        },
                    ]);
                    // tlačítka do spodního pruhu
                    this.commandBar([
                        {
                            favorite: true,
                            action: this.actions.actionZavrit
                        },
                    ]);
                    // podmineny format
                    var condFormat = undefined;
                    condFormat = [{
                            description: "jres:30250581", //RC 30250581 : Neuplatněné podminky
                            formula: "@pm_mark==0",
                            italic: true,
                            bold: true,
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                        },
                    ];
                    var condFormatPlatne = undefined;
                    condFormatPlatne = [{
                            description: "jres:30250583", //RC 30250583 : Platné podmínky
                            formula: "@pm_mark==1",
                            bold: true,
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        },
                    ];
                    // vytvoření gridu
                    this.grid = $.newDiv("js-UCRSeznamOmezeni")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full",
                        profileVisible: true,
                        //userSettings: that.userSettings,
                        defaultProfile: { sort: "!element_ose", columnList: "typ,element_ose,rokmes_od,rokmes_do", condFormats: condFormat }, //columnList: "zpracovatel, aktivita, cislo, nazev" },
                        profiles: [
                            {
                                name: "jres:30250582", sort: "!element_ose", columnList: "typ,element_ose,rokmes_od,rokmes_do", //RC 30250582 : Platné podmínky
                                condFormats: condFormatPlatne
                            },
                        ],
                        //data:that.data,                    
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "typ",
                            caption: "jres:30250571", //RC 30250571 : Typ
                            width: 120,
                            fixedWidth: true,
                            //customClass: "ui-disabled"
                        })
                            .addTextColumn({
                            name: "element_ose",
                            caption: "jres:30250572", //RC 30250572 : Hodnota
                            width: 120,
                            fixedWidth: true,
                            //customClass: "ui-disabled"
                        })
                            .addTextColumn({
                            name: "rokmes_od",
                            caption: "jres:30250573", //RC 30250573 : Platnost od
                            width: 120,
                            fixedWidth: true,
                            //customClass: "ui-disabled"
                        })
                            .addTextColumn({
                            name: "rokmes_do",
                            caption: "jres:30250574", //RC 30250574 : Platnost do
                            width: 120,
                            fixedWidth: true,
                            //customClass: "ui-disabled"
                        })
                            .addNumberColumn({
                            name: "pm_mark",
                            hidden: true
                        })
                    });
                    var view = new Gordic.Data.View(that.inputData.seznam);
                    this.grid.ggrid("setData", view, true);
                    that.nastavHodnoty(that.inputData);
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                reload() {
                    let that = this;
                    that.call("GetOmezeni")
                        .then(function (result) {
                        //debugger;
                        that.nastavHodnoty(result);
                        //let view = new Gordic.Data.View(result.Seznam as any);
                        //that.grid.ggrid("setData", view, true);
                        //Gordic.Eko.Detail.StatusBar.updateItem(that.statusOmezeni, result.Platnost?.platnost!, "");
                    });
                }
                /**
                 * Nastaveni hodnot do formulare
                 *
                 * */
                nastavHodnoty(result) {
                    let view = new Gordic.Data.View(result.seznam);
                    this.grid.ggrid("setData", view, true);
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statusOmezeni, result.platnost?.platnostformat, "");
                    this.inputData = result;
                }
                /**
                 * Zmena platnosti omezeni
                 * @param {GUctDetail} content
                 */
                ZmenitPlatnost() {
                    let def = $.Deferred();
                    let form = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "jres:30250579" }) //RC 30250579 : Období pevného omezeni
                        .addSection()
                        .addRow()
                        .addPrefab(Gordic.Gin.Prefabs.denMesicRok({
                        name: "obdobiPO",
                        fields: ["mesic", "rok"],
                        label: "jres:30250580", //RC 30250580 : MM / RRRR
                        monthFieldOptions: {
                            name: "mesic",
                            itemTemplate: "{cislo}",
                            model: "mesic=value",
                            //initialValue:{ mesic: this.inputData.platnost?.mesic, cislo: this.inputData.platnost?.mesic },
                            validators: [], itemWidth: "w-4"
                        },
                        yearFieldOptions: {
                            name: "rok",
                            model: "rok=value",
                            //initialValue: this.inputData.platnost?.rok,
                            validators: [], itemWidth: "w-8"
                        },
                        output: "singleValues"
                    }));
                    ;
                    let width = 300;
                    let height = 200;
                    let dialog = this.dialogs.simpleForm("jres:30250579", form, { rok: this.inputData.platnost?.rok, mesic: this.inputData.platnost?.mesic }, $.extend({}, { width: width, height: height }));
                    //dialog.findFields().gfield("model", "apply", { rok: this.inputData.platnost?.rok, mesic: this.inputData.platnost?.mesic })
                    return dialog //RC 30250579 : Období pevného omezeni
                        .createDialogPromise()
                        .then(function (data) {
                        debugger;
                        if (data === null)
                            return def.reject();
                        return def.resolve(data);
                    });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.change) {
                        //NOTE (BM): Tento kod nekopirovat. Pokud by jej chtel pouzit nekdo jiny, pak se prosim
                        //           ozvete SYA-ASW a my pripravime systemove reseni. Toto ma nevyhodu v tom, ze
                        //           se spoleha na nejaky format, ktery je definovany na serveru. V momente, kdy
                        //           zmenime caption to nemusi fungovat.
                        const main = $.content("main");
                        const itemsMenu = main.appBar().gbuttonpanel("option", "params");
                        // Polozka omezeni
                        const itemMenu = itemsMenu.find((item) => item.id == "omezeni");
                        if (itemMenu) {
                            let caption = itemMenu.caption;
                            let pozice = caption.indexOf("</h3");
                            if (typeof pozice !== "undefined") {
                                let captionPrefix = caption.substring(0, pozice + 5);
                                caption = captionPrefix + that.inputData.platnost.platnostformat + "</div>";
                                itemMenu.caption = caption;
                                main.appBar(null);
                                main.appBar(itemsMenu);
                            }
                        }
                        return def.resolve(that.inputData);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        def.resolve();
                    }
                    return def.promise();
                }
            };
            GSeznamOmezeni = __decorate([
                gcontent
                /**
                 *  Seznam pevneho omezeni
                 */
            ], GSeznamOmezeni);
            WebClient.GSeznamOmezeni = GSeznamOmezeni;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbU9tZXplbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtT21lemVuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNFBmO0FBNVBELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRQbkI7SUE1UGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRQN0I7UUE1UG9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBTW5DLElBQWEsY0FBYztZQUgzQjs7ZUFFRztZQUNILE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQUVZLFdBQU0sR0FBWSxLQUFLLENBQUM7Z0JBZ1BwQyxDQUFDO2dCQTdPRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7b0JBQ3JGLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQ1gsSUFBSSxDQUFDLGFBQWE7cUJBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3RHLGFBQWEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFD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LENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFXLENBQUM7Z0NBQy9ELE9BQU8sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFTLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztnQ0FDN0UsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0NBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzNCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QyxDQUFDO3lCQUNJLENBQUM7d0JBQ0YsNkNBQTZDO3dCQUM3QyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2xCLENBQUM7b0JBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLENBQUM7YUFFSixDQUFBO1lBbFBZLGNBQWM7Z0JBSjFCLFFBQVE7Z0JBQ1Q7O21CQUVHO2VBQ1UsY0FBYyxDQWtQMUI7WUFsUFksd0JBQWMsaUJBa1AxQixDQUFBO1FBR0wsQ0FBQyxFQTVQb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNFA3QjtJQUFELENBQUMsRUE1UGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRQbkI7QUFBRCxDQUFDLEVBNVBTLE1BQU0sS0FBTixNQUFNLFFBNFBmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICAvKipcclxuICAgICAqICBTZXpuYW0gcGV2bmVobyBvbWV6ZW5pXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtT21lemVuaSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnB1dERhdGE6IEdVY3JSZXN1bHRSZWxvYWREdG87XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNPbWV6ZW5pOiBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zPjtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOnZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzT21lemVuaSA9IEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdHVzT21lemVuaVwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c0JhcihbXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c09tZXplbmldKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvblphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudHJ5Q2xvc2UoKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5yZWxvYWQoKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFptZW5pdE9tZXplbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1NzhcIiwgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IC8vUkMgMzAyNTA1NzggOiBabcSbbml0IG9iZG9iw60gcGV2bsOpaG8gb21lemVuw61cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm1lbml0UGxhdG5vc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuY2FsbChcIlptZW5pdE9iZG9iaU9tZXplbmlcIiwgeyBvYmRvYmk6cmVzdWx0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQ6IEdVY3JSZXN1bHRSZWxvYWREdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDU4NFwiLGlkOlwiaWRtZXNzXCJ9KTsgLy9SQyAzMDI1MDU4NCA6IFptxJtuYSBwbGF0bm9zdGkgcGV2bsOpaG8gb21lemVuw60gdWxvxb5lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2SG9kbm90eShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJtZW51VWNyWm1lbml0T21lemVuaVwiLCBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RabWVuaXRPbWV6ZW5pLCBmYXZvcml0ZTogdHJ1ZS8vLCBwcmltYXJ5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1udVVDUk9iY2Vyc3R2aXRcIiwgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T2JjZXJzdHZpdCwgZmF2b3JpdGU6IHRydWUvLywgcHJpbWFyeTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0bGHEjcOtdGthIGRvIHNwb2Ruw61obyBwcnVodVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdGlvblphdnJpdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBvZG1pbmVueSBmb3JtYXRcclxuICAgICAgICAgICAgdmFyIGNvbmRGb3JtYXQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25kRm9ybWF0ID0gW3tcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1ODFcIiwgLy9SQyAzMDI1MDU4MSA6IE5ldXBsYXRuxJtuw6kgcG9kbWlua3lcclxuICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHBtX21hcms9PTBcIixcclxuICAgICAgICAgICAgICAgIGl0YWxpYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJvbGQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdmFyIGNvbmRGb3JtYXRQbGF0bmU6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25kRm9ybWF0UGxhdG5lID0gW3tcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1ODNcIiwgLy9SQyAzMDI1MDU4MyA6IFBsYXRuw6kgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBwbV9tYXJrPT0xXCIsXHJcbiAgICAgICAgICAgICAgICBib2xkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGdyaWR1XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQubmV3RGl2KFwianMtVUNSU2V6bmFtT21lemVuaVwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlclNldHRpbmdzOiB0aGF0LnVzZXJTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBzb3J0OiBcIiFlbGVtZW50X29zZVwiLCBjb2x1bW5MaXN0OiBcInR5cCxlbGVtZW50X29zZSxyb2ttZXNfb2Qscm9rbWVzX2RvXCIsIGNvbmRGb3JtYXRzOiBjb25kRm9ybWF0IH0sIC8vY29sdW1uTGlzdDogXCJ6cHJhY292YXRlbCwgYWt0aXZpdGEsIGNpc2xvLCBuYXpldlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqcmVzOjMwMjUwNTgyXCIsIHNvcnQ6IFwiIWVsZW1lbnRfb3NlXCIsIGNvbHVtbkxpc3Q6IFwidHlwLGVsZW1lbnRfb3NlLHJva21lc19vZCxyb2ttZXNfZG9cIiwgLy9SQyAzMDI1MDU4MiA6IFBsYXRuw6kgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogY29uZEZvcm1hdFBsYXRuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOnRoYXQuZGF0YSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDU3MVwiLCAvL1JDIDMwMjUwNTcxIDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVsZW1lbnRfb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1NzJcIiwgLy9SQyAzMDI1MDU3MiA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rbWVzX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1NzNcIiwgLy9SQyAzMDI1MDU3MyA6IFBsYXRub3N0IG9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva21lc19kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTc0XCIsIC8vUkMgMzAyNTA1NzQgOiBQbGF0bm9zdCBkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBtX21hcmtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjp0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuaW5wdXREYXRhLnNlem5hbSBhcyBhbnkpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hc3RhdkhvZG5vdHkodGhhdC5pbnB1dERhdGEpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jYWxsKFwiR2V0T21lemVuaVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdDogR1VjclJlc3VsdFJlbG9hZER0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZIb2Rub3R5KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdC5TZXpuYW0gYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c09tZXplbmksIHJlc3VsdC5QbGF0bm9zdD8ucGxhdG5vc3QhLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIGhvZG5vdCBkbyBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2SG9kbm90eShyZXN1bHQ6IEdVY3JSZXN1bHRSZWxvYWREdG8pIHtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQuc2V6bmFtIGFzIGFueSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoaXMuc3RhdHVzT21lemVuaSwgcmVzdWx0LnBsYXRub3N0Py5wbGF0bm9zdGZvcm1hdCEsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YSA9IHJlc3VsdDtcclxuICAgICAgICB9IFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWm1lbmEgcGxhdG5vc3RpIG9tZXplbmlcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBabWVuaXRQbGF0bm9zdCgpOiBKUXVlcnlQcm9taXNlPHsgbWVzaWM6IG51bWJlciwgcm9rOiBudW1iZXIgfT4ge1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDU3OVwiIH0pIC8vUkMgMzAyNTA1NzkgOiBPYmRvYsOtIHBldm7DqWhvIG9tZXplbmlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuZGVuTWVzaWNSb2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJvYmRvYmlQT1wiLFxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkczogW1wibWVzaWNcIiwgXCJyb2tcIl0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMjUwNTgwXCIsIC8vUkMgMzAyNTA1ODAgOiBNTSAvIFJSUlJcclxuICAgICAgICAgICAgICAgIG1vbnRoRmllbGRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntjaXNsb31cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZXNpYz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOnsgbWVzaWM6IHRoaXMuaW5wdXREYXRhLnBsYXRub3N0Py5tZXNpYywgY2lzbG86IHRoaXMuaW5wdXREYXRhLnBsYXRub3N0Py5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLCBpdGVtV2lkdGg6XCJ3LTRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHllYXJGaWVsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInJvaz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB0aGlzLmlucHV0RGF0YS5wbGF0bm9zdD8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLCBpdGVtV2lkdGg6IFwidy04XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0OiBcInNpbmdsZVZhbHVlc1wiXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gMzAwO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gMjAwO1xyXG4gICAgICAgICAgICBsZXQgZGlhbG9nID0gdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMwMjUwNTc5XCIsIGZvcm0sIHsgcm9rOiB0aGlzLmlucHV0RGF0YS5wbGF0bm9zdD8ucm9rLCBtZXNpYzogdGhpcy5pbnB1dERhdGEucGxhdG5vc3Q/Lm1lc2ljIH0sICQuZXh0ZW5kKHt9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSkpO1xyXG4gICAgICAgICAgICAvL2RpYWxvZy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHJvazogdGhpcy5pbnB1dERhdGEucGxhdG5vc3Q/LnJvaywgbWVzaWM6IHRoaXMuaW5wdXREYXRhLnBsYXRub3N0Py5tZXNpYyB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9nIC8vUkMgMzAyNTA1NzkgOiBPYmRvYsOtIHBldm7DqWhvIG9tZXplbmlcclxuICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2U8YW55LCB7bWVzaWM6bnVtYmVyLCByb2s6bnVtYmVyfT4oKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgLy9OT1RFIChCTSk6IFRlbnRvIGtvZCBuZWtvcGlyb3ZhdC4gUG9rdWQgYnkgamVqIGNodGVsIHBvdXppdCBuZWtkbyBqaW55LCBwYWsgc2UgcHJvc2ltXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgb3p2ZXRlIFNZQS1BU1cgYSBteSBwcmlwcmF2aW1lIHN5c3RlbW92ZSByZXNlbmkuIFRvdG8gbWEgbmV2eWhvZHUgdiB0b20sIHplXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgc2Ugc3BvbGVoYSBuYSBuZWpha3kgZm9ybWF0LCBrdGVyeSBqZSBkZWZpbm92YW55IG5hIHNlcnZlcnUuIFYgbW9tZW50ZSwga2R5XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgem1lbmltZSBjYXB0aW9uIHRvIG5lbXVzaSBmdW5nb3ZhdC5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYWluID0gJC5jb250ZW50KFwibWFpblwiKSBhcyBHQ29udGVudCAmIHsgYXBwQmFyKG1wcz86IE1lbnVQYXJhbXNbXXxudWxsfHVuZGVmaW5lZCk6IEpRdWVyeSB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNNZW51ID0gbWFpbi5hcHBCYXIoKS5nYnV0dG9ucGFuZWwoXCJvcHRpb25cIiwgXCJwYXJhbXNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUG9sb3prYSBvbWV6ZW5pXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtTWVudSA9IGl0ZW1zTWVudS5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09IFwib21lemVuaVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtTWVudSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uID0gaXRlbU1lbnUuY2FwdGlvbiE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvemljZSA9IGNhcHRpb24uaW5kZXhPZihcIjwvaDNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3ppY2UgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb25QcmVmaXggPSBjYXB0aW9uLnN1YnN0cmluZygwLCBwb3ppY2UgKyA1KSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb24gPSBjYXB0aW9uUHJlZml4ICsgdGhhdC5pbnB1dERhdGEucGxhdG5vc3QhLnBsYXRub3N0Zm9ybWF0ICsgXCI8L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU1lbnUuY2FwdGlvbiA9IGNhcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW4uYXBwQmFyKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluLmFwcEJhcihpdGVtc01lbnUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0aGF0LmlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH0gICAgXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==