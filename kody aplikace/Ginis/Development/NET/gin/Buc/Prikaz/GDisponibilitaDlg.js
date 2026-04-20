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
             * GDisponibilitaDlg - Dialog s výsledkem kontroly disponibility
             *
             * @author vblabla
             * @since 486.1.0.89
             */
            let GDisponibilitaDlg = class GDisponibilitaDlg extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    const that = this;
                    that.beginOperation("Probíhá kontrola disponibility");
                    that.createCommandButtons();
                    that.setTitle();
                    that.createCommandBar();
                    //that.createForm();
                    that.createGtable();
                    that.endOperation();
                }
                /**
                 * nastavit titulek dialogu
                 */
                setTitle() {
                    this.newOps({
                        title: "Komunikace s bankou"
                    });
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
                    this.buttonYes();
                    this.buttonNo();
                    this.okButton();
                }
                /**
                 * vyvvořit Yes button
                 */
                buttonYes() {
                    this.actions.add(new GAction({
                        name: "actYes",
                        //icon: "gi-detail",
                        caption: "Ano",
                        run: () => {
                            this.disponibilitaOK;
                            let retData = {
                                continue: true,
                            };
                            this.close(retData);
                        }
                    }));
                }
                /**
                 * vyvvořit No button
                 */
                buttonNo() {
                    this.actions.add(new GAction({
                        name: "actNo",
                        //icon: "gi-detail",
                        caption: "Ne",
                        run: () => {
                            this.disponibilitaOK;
                            //this.continue = false;
                            let retData = {
                                continue: false,
                            };
                            this.close(retData);
                        }
                    }));
                }
                /**
                 * vyvvořit OK button
                 */
                okButton() {
                    this.actions.add(new GAction({
                        name: "actConfirm",
                        //icon: "gi-detail",
                        caption: "OK",
                        run: () => {
                            this.disponibilitaOK;
                            let retData = {
                                continue: true,
                            };
                            this.close(retData);
                        }
                    }));
                }
                /**
                 * nastavit command buttons
                 */
                setCommandButtons() {
                    const that = this;
                    const bar = [];
                    if (that.kind == 206) {
                        bar.push({
                            favorite: true,
                            type: "widget",
                            align: "opposite",
                            position: "left",
                            //align: "opposite", //customClass:"w-2", //
                            init: function () {
                                return $.newDiv() //.width(200).css("margin-top", "0.31rem").css("margin-bottom", "0.31rem")
                                    .gstaticfield({
                                    name: "text",
                                    initialValue: "Chcete pokračovat ve vytváření dávky?",
                                });
                            },
                        });
                        // definice tlačítka Ano
                        bar.push({
                            favorite: true,
                            primary: true,
                            action: this.actions.actYes
                        });
                        // definice tlačítka Ne
                        bar.push({
                            favorite: true,
                            action: this.actions.actNo
                        });
                        return bar;
                    }
                    else {
                        // definice tlačítka OK
                        bar.push({
                            favorite: true,
                            primary: true,
                            action: this.actions.actConfirm
                        });
                        return bar;
                    }
                }
                /**
                * vytvorit formular s upozornenim
                */
                createForm() {
                    const that = this;
                    that.form = new Gordic.Forms.Form({ name: "form", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addRow("").addField("gstatic", { name: "info", icon: "fa-times-circle g-state-text g-state-important", customClass: "w-1" })
                        .addField("gstaticfield", {
                        name: "infoText",
                        itemTemplate: function (obj) {
                            return "Zkusebni text";
                        },
                        customClass: "w-2 g-state-text g-state-important"
                    }); //RC 33115229 : Stav
                    that.element.gform("createFrom", that.form);
                }
                /**
                 * vytvorit gtable s informacemi ziskanymi kontrolou disponibility
                 */
                createGtable() {
                    const that = this;
                    //Cvicna data pro gtable
                    // Data seskupena pod jednu skupinu
                    //var groupData1 = new Gordic.Data.View([...that.data);
                    //groupData1.process({
                    //    ac: new Gordic.Data.Grouping([{
                    //        defaultState: "open",
                    //        hash: (meta, rows) => {
                    //            return `${meta.data["group1"]}`
                    //        }
                    //    }])
                    //})
                    this.gtable = $.newDiv().appendTo(this.element).gtable({
                        //breakWidth: 500,
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "mainIcon",
                            caption: "Kontrola",
                            iconTemplate: (data) => {
                                if (that.kind == 206) {
                                    return { icon: "fa-exclamation-triangle g-state-text g-state-warning", tooltip: "Zjištěno upozornění" };
                                }
                                else {
                                    return { icon: "fa-times-circle g-state-text g-state-error", tooltip: "Zjištěna chyba" };
                                }
                            },
                        })
                            .addTextColumn({
                            name: "bu_txt",
                            caption: "Účet",
                        })
                            .addTextColumn({
                            name: "c_disp",
                            caption: "Aktuální prostředky",
                            format: "number(N2)"
                        })
                            .addTextColumn({
                            name: "c_prek",
                            field: "c_prek",
                            caption: "Překročeny o částku",
                            customClass: "g-state-text g-state-error",
                            format: "number(N2)"
                        })
                            .addTextColumn({
                            name: "popis",
                            caption: "Popis",
                            minWidth: 250,
                            cellTemplate: (data) => {
                                return "Výše zpracovávaných příkazů k úhradě překročila hodnotu disponibilních prostředků k odeslání!";
                            }
                        }),
                        data: that.data
                    });
                }
            };
            GDisponibilitaDlg = __decorate([
                gcontent
            ], GDisponibilitaDlg);
            WebClient.GDisponibilitaDlg = GDisponibilitaDlg;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rpc3BvbmliaWxpdGFEbGcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGlzcG9uaWJpbGl0YURsZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBa1JmO0FBbFJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtSbkI7SUFsUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtSN0I7UUFsUm9CLFdBQUEsU0FBUztZQWMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBZ0MvQzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixvQkFBb0I7b0JBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxRQUFRO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ1IsS0FBSyxFQUFFLHFCQUFxQjtxQkFDL0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxvQkFBb0I7b0JBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIs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YixZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDbkIsT0FBTywrRkFBK0YsQ0FBQzs0QkFDM0csQ0FBQzt5QkFDSixDQUFDO3dCQUNOLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtxQkFDbEIsQ0FBQyxDQUFBO2dCQUNOLENBQUM7YUFDSixDQUFBO1lBMVBZLGlCQUFpQjtnQkFEN0IsUUFBUTtlQUNJLGlCQUFpQixDQTBQN0I7WUExUFksMkJBQWlCLG9CQTBQN0IsQ0FBQTtRQUNMLENBQUMsRUFsUm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtSN0I7SUFBRCxDQUFDLEVBbFJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrUm5CO0FBQUQsQ0FBQyxFQWxSUyxNQUFNLEtBQU4sTUFBTSxRQWtSZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqIFZzdHVwbsOtIHBhcmFtZXRyeSBkaWFsb2d1IHBybyBrb250cm9sdSBEaXNwb25pYmlsaXR5Ki9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR0Rpc3BvbmliaWxpdGFEbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgLyoqVnN0dXBuw60gZGF0YSBwcm8ga29udHJvbHUgZGlzcG9uaWJpbGl0eSovXHJcbiAgICAgICAgZGF0YTogYW55W10sXHJcbiAgICAgICAga2luZDogbnVtYmVyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFbDvXN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgRGlzcG9uaWJpbGl0eSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdEaXNwb25pYmlsaXRhRGxnUmV0dXJuVmFsdWUge1xyXG4gICAgICAgIGNvbnRpbnVlPzogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHRGlzcG9uaWJpbGl0YURsZyAtIERpYWxvZyBzIHbDvXNsZWRrZW0ga29udHJvbHkgZGlzcG9uaWJpbGl0eVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHZibGFibGFcclxuICAgICAqIEBzaW5jZSA0ODYuMS4wLjg5XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEaXNwb25pYmlsaXRhRGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZGF0YSBwcm8gem9icmF6ZW5pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCBkaWFsb2d1IChFcnJvciA9IDIwMCAvIFdhcm5pbmcgPSAyMDYpXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtpbmQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb250aW51ZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZGlzcG9uaWJpbGl0YU9LXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaXNwb25pYmlsaXRhT0s6IGJvb2xlYW47XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBlbGVtZW50IGZvcm11bGFyZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGVsZW1lbnQga29tcG9uZW50eSBndGFibGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGd0YWJsZTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGtvbnRyb2xhIGRpc3BvbmliaWxpdHlcIik7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29tbWFuZEJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5zZXRUaXRsZSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgLy90aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHdGFibGUoKTtcclxuICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG5hc3Rhdml0IHRpdHVsZWsgZGlhbG9ndVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0VGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3T3BzKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIktvbXVuaWthY2UgcyBiYW5rb3VcIlx0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbmFzdGF2aXQgdGl0dWxlayBkaWFsb2d1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5zZXRDb21tYW5kQnV0dG9ucygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5dnZvxZlpdCBjb21tYW5kIGJ1dHRvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCdXR0b25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvblllcygpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vKCk7XHJcbiAgICAgICAgICAgIHRoaXMub2tCdXR0b24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5dnZvxZlpdCBZZXMgYnV0dG9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBidXR0b25ZZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RZZXNcIixcclxuICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQW5vXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BvbmliaWxpdGFPS1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXREYXRhOiBHRGlzcG9uaWJpbGl0YURsZ1JldHVyblZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UocmV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5dnZvxZlpdCBObyBidXR0b25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGJ1dHRvbk5vKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Tm9cIixcclxuICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmVcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9uaWJpbGl0YU9LXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNvbnRpbnVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldERhdGE6IEdEaXNwb25pYmlsaXRhRGxnUmV0dXJuVmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UocmV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5dnZvxZlpdCBPSyBidXR0b25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9rQnV0dG9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q29uZmlybVwiLFxyXG4gICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPS1wiLFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb25pYmlsaXRhT0tcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0RGF0YTogR0Rpc3BvbmliaWxpdGFEbGdSZXR1cm5WYWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHJldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbmFzdGF2aXQgY29tbWFuZCBidXR0b25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRDb21tYW5kQnV0dG9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhcjogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmtpbmQgPT0gMjA2KSB7XHJcbiAgICAgICAgICAgICAgICBiYXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3aWRnZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2FsaWduOiBcIm9wcG9zaXRlXCIsIC8vY3VzdG9tQ2xhc3M6XCJ3LTJcIiwgLy9cclxuICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLm5ld0RpdigpIC8vLndpZHRoKDIwMCkuY3NzKFwibWFyZ2luLXRvcFwiLCBcIjAuMzFyZW1cIikuY3NzKFwibWFyZ2luLWJvdHRvbVwiLCBcIjAuMzFyZW1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nc3RhdGljZmllbGQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogXCJDaGNldGUgcG9rcmHEjW92YXQgdmUgdnl0dsOhxZllbsOtIGTDoXZreT9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gZGVmaW5pY2UgdGxhxI3DrXRrYSBBbm9cclxuICAgICAgICAgICAgICAgIGJhci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFllc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIGRlZmluaWNlIHRsYcSNw610a2EgTmVcclxuICAgICAgICAgICAgICAgIGJhci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3ROb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmljZSB0bGHEjcOtdGthIE9LXHJcbiAgICAgICAgICAgICAgICBiYXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RDb25maXJtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiB2eXR2b3JpdCBmb3JtdWxhciBzIHVwb3pvcm5lbmltXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi04LTIsIE0tMi04LTIsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiXCIpLmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7IG5hbWU6IFwiaW5mb1wiLCBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbXBvcnRhbnRcIiwgY3VzdG9tQ2xhc3M6IFwidy0xXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbmZvVGV4dFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiWmt1c2VibmkgdGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTIgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW1wb3J0YW50XCJcclxuICAgICAgICAgICAgICAgIH0pIC8vUkMgMzMxMTUyMjkgOiBTdGF2XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5mb3JtKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdnl0dm9yaXQgZ3RhYmxlIHMgaW5mb3JtYWNlbWkgemlza2FueW1pIGtvbnRyb2xvdSBkaXNwb25pYmlsaXR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHdGFibGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL0N2aWNuYSBkYXRhIHBybyBndGFibGVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIERhdGEgc2Vza3VwZW5hIHBvZCBqZWRudSBza3VwaW51XHJcbiAgICAgICAgICAgIC8vdmFyIGdyb3VwRGF0YTEgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbLi4udGhhdC5kYXRhKTtcclxuICAgICAgICAgICAgLy9ncm91cERhdGExLnByb2Nlc3Moe1xyXG4gICAgICAgICAgICAvLyAgICBhYzogbmV3IEdvcmRpYy5EYXRhLkdyb3VwaW5nKFt7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZWZhdWx0U3RhdGU6IFwib3BlblwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gYCR7bWV0YS5kYXRhW1wiZ3JvdXAxXCJdfWBcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfV0pXHJcbiAgICAgICAgICAgIC8vfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3RhYmxlID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmd0YWJsZSh7XHJcbiAgICAgICAgICAgICAgICAvL2JyZWFrV2lkdGg6IDUwMCxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWFpbkljb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5raW5kID09IDIwNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0b29sdGlwOlwiWmppxaF0xJtubyB1cG96b3JuxJtuw61cIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCB0b29sdGlwOiBcIlpqacWhdMSbbmEgY2h5YmFcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiw5rEjWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kaXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQWt0dcOhbG7DrSBwcm9zdMWZZWRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwibnVtYmVyKE4yKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcmVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImNfcHJla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWVrcm/EjWVueSBvIMSNw6FzdGt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJudW1iZXIoTjIpXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiAyNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlbDvcWhZSB6cHJhY292w6F2YW7DvWNoIHDFmcOta2F6xa8gayDDumhyYWTEmyBwxZlla3JvxI1pbGEgaG9kbm90dSBkaXNwb25pYmlsbsOtY2ggcHJvc3TFmWVka8WvIGsgb2Rlc2zDoW7DrSFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhhdC5kYXRhXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==