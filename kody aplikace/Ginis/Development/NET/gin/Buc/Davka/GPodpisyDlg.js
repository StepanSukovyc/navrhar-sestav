"use strict";
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
            let gcontent = Decorators.gcontent;
            /**
             * GPodpisyDlg - Dialog s nabídkou podpisů dávky s příkazy
             *
             * @author vblabla
             * @since 524.20.0.15
             */
            let GPodpisyDlg = class GPodpisyDlg extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    const that = this;
                    that.createCommandButtons();
                    that.setTitle();
                    that.createCommandBar();
                    //that.createForm();
                    that.createGrid();
                    that.createMenuButtons();
                    that.createMenuBar();
                    that.call("GetIkc", { nove: true /*davkaDto: retVal.result.data, bankaDto: that.bankaParametryDavky*/ }).then((retIkc) => {
                        that.Ikc = retIkc;
                    });
                    that.endOperation();
                }
                /**
                 * nastavit titulek dialogu
                 */
                setTitle() {
                    this.newOps({
                        title: "jres:33140092" //RC 33140092 : Podpisy dávky
                    });
                }
                /**
                 * Menubar
                 */
                createMenuBar() {
                    this.menuBar(this.setMenuButtons());
                }
                /**
                 * vyvvořit menu buttons
                 */
                createMenuButtons() {
                    this.buttonOdstranit();
                }
                /**
                 * nastavit titulek dialogu
                 */
                createCommandBar() {
                    this.commandBar(this.setCommandButtons());
                }
                /**
                 * vyvvořit command buttons
                 */
                createCommandButtons() {
                    this.buttonCancel();
                }
                /**
                 * vyvvořit Yes button
                 */
                buttonCancel() {
                    const that = this;
                    this.actions.add(new GAction({
                        name: "actCancel",
                        //icon: "gi-detail",
                        caption: "Zrušit",
                        run: () => {
                            that.tryClose({});
                        }
                    }));
                }
                /**
                * vyvvořit button Odstranit
                */
                buttonOdstranit() {
                    const that = this;
                    this.actions.add(new GAction({
                        name: "actOdstranit",
                        enabled: false,
                        caption: "Odstranit",
                        run: () => {
                            var dataForm = {};
                            dataForm.ikc;
                            var dataRQ;
                            if (Gordic.Utils.WidgetExists("ggrid", that.gridPodpisy)) {
                                dataRQ = that.gridPodpisy.ggrid("getSelection");
                            }
                            var def = $.Deferred();
                            that.actions.actOdstranit?.setPending(def.promise());
                            //that.tryClose({});
                            //Confirm dialog
                            that.dialogs.confirm("Komunikace s bankou", "Opravdu chcete podpis odstranit?", 550, 150).on("close", (ev, obj) => {
                                if (obj == "yes") {
                                    that.isl.PodDavDPB.stornujPodpis({ data: { rows: dataRQ, ikc: that.Ikc, poc_pod: that.poc_pod } } /*(rq) => $.extend(dataForm, rq)*/).getData()
                                        .done(function (result) {
                                        that.view.requestData();
                                        def.resolve();
                                    }).fail((e) => {
                                        def.reject();
                                    });
                                }
                                else {
                                    def.reject();
                                }
                            });
                        }
                    }));
                }
                /**
                 * nastavit command buttons
                 */
                setCommandButtons() {
                    const bar = [];
                    // definice tlačítka OK
                    bar.push({
                        favorite: true,
                        //primary: true,
                        action: this.actions.actCancel
                    });
                    return bar;
                }
                /**
                 * nastavit menu buttons
                 */
                setMenuButtons() {
                    const that = this;
                    const bar = [];
                    // definice tlačítka OK
                    bar.push({
                        favorite: true,
                        primary: true,
                        action: this.actions.actOdstranit
                    });
                    return bar;
                }
                /**
                 * vytvorit gtable s informacemi ziskanymi kontrolou disponibility
                 */
                createGrid() {
                    const that = this;
                    that.view = new Gordic.Isl.View(that.isl.PodDavDPB.list(rq => { return { filters: { ixp: that.ixp } }; }), {
                        onResponse: (data) => {
                            if (data.servicePermissions != undefined) {
                                that.permissionsPodpis = data.servicePermissions;
                            }
                            if (that.permissionsPodpis) {
                                if ("LzeOdstranit" in that.permissionsPodpis && that.permissionsPodpis.LzeOdstranit.value == true) {
                                    that.actions.actOdstranit?.enabled(true);
                                }
                                else {
                                    that.actions.actOdstranit?.enabled(false);
                                }
                            }
                            return data;
                        }
                    });
                    that.gridPodpisy = $.newDiv().appendTo(that.element).gautofit().ggrid({
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "ixb",
                            caption: "Ixb",
                        })
                            .addTextColumn({
                            name: "ixs_cer",
                            caption: "IxsCer",
                        })
                            .addTextColumn({
                            name: "jmeno",
                            caption: "Jméno",
                        })
                            .addTextColumn({
                            name: "firma",
                            caption: "Firma",
                        })
                            .addDateTimeColumn({
                            name: "dat_od",
                            caption: "Plat.od",
                        })
                            .addDateTimeColumn({
                            name: "dat_do",
                            caption: "Plat.do",
                        })
                            .addTextColumn({
                            name: "nazev_ref",
                            caption: "Podepsal  ",
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Datum podpisu",
                        })
                            .addNumberColumn({
                            name: "pocet",
                            caption: "Počet podpisů",
                        }),
                        data: that.view,
                    });
                }
            };
            GPodpisyDlg = __decorate([
                gcontent
            ], GPodpisyDlg);
            WebClient.GPodpisyDlg = GPodpisyDlg;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvZHBpc3lEbGcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9kcGlzeURsZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBbVJmO0FBblJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1SbkI7SUFuUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1SN0I7UUFuUm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFtRHpDOzttQkFFRztnQkFDSSxjQUFjO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLG9FQUFvRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDckgsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxDQUFBO29CQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0ssUUFBUTtvQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNSLEtBQUssRUFBRSxlQUFlLENBQUMsNkJBQTZCO3FC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eUJBQ25CLENBQUM7NkJBQ0QsaUJBQWlCLENBQUM7NEJBQ2YsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxFQUFFLFNBQVM7eUJBQ3JCLENBQUM7NkJBQ0QsaUJBQWlCLENBQUM7NEJBQ2YsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxFQUFFLFNBQVM7eUJBQ3JCLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsWUFBWTt5QkFDeEIsQ0FBQzs2QkFDRCxpQkFBaUIsQ0FBQzs0QkFDZixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWU7eUJBQzNCLENBQUM7NkJBQ0QsZUFBZSxDQUFDOzRCQUNiLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxlQUFlO3lCQUMzQixDQUFDO3dCQUVOLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtxQkFDbEIsQ0FBQyxDQUFBO2dCQUNOLENBQUM7YUFDSixDQUFBO1lBeFFZLFdBQVc7Z0JBRHZCLFFBQVE7ZUFDSSxXQUFXLENBd1F2QjtZQXhRWSxxQkFBVyxjQXdRdkIsQ0FBQTtRQUNMLENBQUMsRUFuUm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW1SN0I7SUFBRCxDQUFDLEVBblJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFtUm5CO0FBQUQsQ0FBQyxFQW5SUyxNQUFNLEtBQU4sTUFBTSxRQW1SZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR1BvZHBpc3lEbGcgLSBEaWFsb2cgcyBuYWLDrWRrb3UgcG9kcGlzxa8gZMOhdmt5IHMgcMWZw61rYXp5XHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdmJsYWJsYVxyXG4gICAgICogQHNpbmNlIDUyNC4yMC4wLjE1XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2RwaXN5RGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBJS0NcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkdlbmVyYWwuR0lrY31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIElrYzogR29yZGljLkdlbmVyYWwuR0lrYztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWaWV3IHBybyBncmlkXHJcbiAgICAgICAgKiBAdHlwZSB7SXNsLlZpZXc8VERhdGE+fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdmlldzogSXNsLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1BvZERhdkRQQkR0bz47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBlcm1pc3Npb25zXHJcbiAgICAgICAgICogQHR5cGUge3t9IHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcGVybWlzc2lvbnNQb2RwaXM6IHt9fCBHb3JkaWMuQnVjLkludGVyZmFjZS5HUG9kRGF2UERCU2VydmljZVBlcm1pc3Npb24gfCB1bmRlZmluZWQ7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBwb2NfcG9kIC0gUG/EjWV0IHBvZHBpc8WvIGTDoXZreVxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2NfcG9kOiBudW1iZXJcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaXhwIC0gSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXhwOiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaXhiIC0gSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXhiOiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIGRpYWxvZ3UgKEVycm9yID0gMjAwIC8gV2FybmluZyA9IDIwNilcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUga2luZDogbnVtYmVyO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZWxlbWVudCBrb21wb25lbnR5IGd0YWJsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFBvZHBpc3k6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LnNldFRpdGxlKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICAvL3RoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51QnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jYWxsKFwiR2V0SWtjXCIsIHsgbm92ZTogdHJ1ZSAvKmRhdmthRHRvOiByZXRWYWwucmVzdWx0LmRhdGEsIGJhbmthRHRvOiB0aGF0LmJhbmthUGFyYW1ldHJ5RGF2a3kqLyB9KS50aGVuKChyZXRJa2MpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuSWtjID0gcmV0SWtjO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbmFzdGF2aXQgdGl0dWxlayBkaWFsb2d1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRUaXRsZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdPcHMoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzE0MDA5MlwiIC8vUkMgMzMxNDAwOTIgOiBQb2RwaXN5IGTDoXZreVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1lbnViYXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLnNldE1lbnVCdXR0b25zKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl2dm/FmWl0IG1lbnUgYnV0dG9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJ1dHRvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uT2RzdHJhbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBuYXN0YXZpdCB0aXR1bGVrIGRpYWxvZ3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLnNldENvbW1hbmRCdXR0b25zKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl2dm/FmWl0IGNvbW1hbmQgYnV0dG9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJ1dHRvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2eXZ2b8WZaXQgWWVzIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYnV0dG9uQ2FuY2VsKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENhbmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHt9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiB2eXZ2b8WZaXQgYnV0dG9uIE9kc3RyYW5pdFxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBidXR0b25PZHN0cmFuaXQoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2RzdHJhbml0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YUZvcm06IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdQb2REYXZQREJQcmlwcmF2RGF0YU9wZXJhdGlvbkR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFGb3JtLmlrY1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhUlFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdncmlkXCIsIHRoYXQuZ3JpZFBvZHBpc3kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSUSA9IHRoYXQuZ3JpZFBvZHBpc3kuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T2RzdHJhbml0Py5zZXRQZW5kaW5nKGRlZi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC50cnlDbG9zZSh7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db25maXJtIGRpYWxvZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29tdW5pa2FjZSBzIGJhbmtvdVwiLCBcIk9wcmF2ZHUgY2hjZXRlIHBvZHBpcyBvZHN0cmFuaXQ/XCIsIDU1MCwgMTUwKS5vbihcImNsb3NlXCIsIChldiwgb2JqOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2REYXZEUEIuc3Rvcm51alBvZHBpcyh7IGRhdGE6IHsgcm93czogZGF0YVJRLCBpa2M6IHRoYXQuSWtjLCBwb2NfcG9kOiB0aGF0LnBvY19wb2QgfSB9LyoocnEpID0+ICQuZXh0ZW5kKGRhdGFGb3JtLCBycSkqLykuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBuYXN0YXZpdCBjb21tYW5kIGJ1dHRvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldENvbW1hbmRCdXR0b25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXI6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGRlZmluaWNlIHRsYcSNw610a2EgT0tcclxuICAgICAgICAgICAgICAgIGJhci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3ByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBuYXN0YXZpdCBtZW51IGJ1dHRvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldE1lbnVCdXR0b25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgYmFyOiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRsYcSNw610a2EgT0tcclxuICAgICAgICAgICAgYmFyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T2RzdHJhbml0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBiYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl0dm9yaXQgZ3RhYmxlIHMgaW5mb3JtYWNlbWkgemlza2FueW1pIGtvbnRyb2xvdSBkaXNwb25pYmlsaXR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQnVjLkludGVyZmFjZS5HUG9kRGF2RFBCRHRvPih0aGF0LmlzbC5Qb2REYXZEUEIubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaXhwOiB0aGF0Lml4cCB9IH0gfSksIHtcclxuICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc2VydmljZVBlcm1pc3Npb25zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wZXJtaXNzaW9uc1BvZHBpcyA9IGRhdGEuc2VydmljZVBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBlcm1pc3Npb25zUG9kcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJMemVPZHN0cmFuaXRcIiBpbiB0aGF0LnBlcm1pc3Npb25zUG9kcGlzICYmIHRoYXQucGVybWlzc2lvbnNQb2RwaXMuTHplT2RzdHJhbml0LnZhbHVlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQ/LmVuYWJsZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQ/LmVuYWJsZWQoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRQb2RwaXN5ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdhdXRvZml0KCkuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeGJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJeGJcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfY2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSXhzQ2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiam1lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJKbcOpbm9cIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaXJtYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkZpcm1hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBsYXQub2RcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUGxhdC5kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvZGVwc2FsICBcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9kcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb8SNZXQgcG9kcGlzxa9cIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=