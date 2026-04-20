"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GKontrolniChodVym.ts                   </Name>
//    <Description> Nastavení kontorlního chodu vymáhání                        </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-11-20                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Nastavení kontrolního chodu vymáhání
             *
             * @author Vojtěch Čech
             * @date 20.11.2024
             */
            let GKontrolniChodVym = class GKontrolniChodVym extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = `Nastavení kontrolního chodu vymáhání`;
                    that.actions.addRange([
                        new GAction({
                            name: "actOk",
                            caption: "OK",
                            //icon: "",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actStorno",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actOk!", "actStorno"]));
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", that.createForm());
                }
                /** Vytvoření formuláře */
                createForm() {
                    var that = this;
                    return new Gordic.Forms.Form({ name: "formKontrola", layoutDescriptor: "L1M1S1 L-2-8-2, M-2-8-2, S-2-8-2" })
                        .addText("Zadejte parametry kontroly záznamu o vymáhání.")
                        .addRow()
                        .addField("gcheck", {
                        name: "nema_polozky",
                        label: "Vymáhání nemá složky vymáhání",
                        initialValue: that.nema_polozky
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "nesouhlasi_suma",
                        label: "Nesouhlasí součet složek vymáhání a celková vymáhaná částka",
                        initialValue: that.nesouhlasi_suma
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "nema_predpis",
                        label: "Položky vymáhání nemají odpovídající předpis",
                        initialValue: that.nema_predpis
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "dsu_zemrel",
                        label: "Osoba v dotčených subjektech zemřela",
                        initialValue: that.dsu_zemrel
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "nema_dsu",
                        label: "Nemá dotčené subjekty",
                        initialValue: that.nema_dsu
                    })
                        .addText("Tyto kontroly lze kombinovat s filtrem vymáhání!")
                        .addText("Ujistěte se, že před spuštěním máte správně napočtené stavy vymáhání!");
                }
                ok() {
                    var nema_polozky = this.form.findFields("nema_polozky").gfield("getValue");
                    var nesouhlasi_suma = this.form.findFields("nesouhlasi_suma").gfield("getValue");
                    var nema_predpis = this.form.findFields("nema_predpis").gfield("getValue");
                    var dsu_zemrel = this.form.findFields("dsu_zemrel").gfield("getValue");
                    var nema_dsu = this.form.findFields("nema_dsu").gfield("getValue");
                    this.close({ nema_polozky: nema_polozky, nesouhlasi_suma: nesouhlasi_suma, nema_predpis: nema_predpis, dsu_zemrel: dsu_zemrel, nema_dsu: nema_dsu });
                }
            };
            GKontrolniChodVym = __decorate([
                Decorators.gcontent
            ], GKontrolniChodVym);
            WebClient.GKontrolniChodVym = GKontrolniChodVym;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0tvbnRyb2xuaUNob2RWeW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHS29udHJvbG5pQ2hvZFZ5bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTZGZjtBQTdGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2Rm5CO0lBN0ZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2RjdCO1FBN0ZvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFXL0MsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsc0NBQXNDLENBQUM7b0JBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFFUixJQUFJLEVBQUUsT0FBTzs0QkFDYixPQUFPLEVBQUUsSUFBSTs0QkFDYixXQUFXOzRCQUNYLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ2xDLENBQUM7d0JBQ0YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFFRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFF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LG9CQW9GN0IsQ0FBQTtRQUNMLENBQUMsRUE3Rm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZGN0I7SUFBRCxDQUFDLEVBN0ZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2Rm5CO0FBQUQsQ0FBQyxFQTdGUyxNQUFNLEtBQU4sTUFBTSxRQTZGZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HS29udHJvbG5pQ2hvZFZ5bS50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gTmFzdGF2ZW7DrSBrb250b3JsbsOtaG8gY2hvZHUgdnltw6Fow6Fuw60gICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTExLTIwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIE5hc3RhdmVuw60ga29udHJvbG7DrWhvIGNob2R1IHZ5bcOhaMOhbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgVm9qdMSbY2ggxIxlY2hcclxuICAgICAqIEBkYXRlIDIwLjExLjIwMjRcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHS29udHJvbG5pQ2hvZFZ5bSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKiogSG9kbm90eSBrb250cm9seSAqL1xyXG4gICAgICAgIG5lbWFfcG9sb3preTogYm9vbGVhbjtcclxuICAgICAgICBuZXNvdWhsYXNpX3N1bWE6IGJvb2xlYW47XHJcbiAgICAgICAgbmVtYV9wcmVkcGlzOiBib29sZWFuO1xyXG4gICAgICAgIGRzdV96ZW1yZWw6IGJvb2xlYW47XHJcbiAgICAgICAgbmVtYV9kc3U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgTmFzdGF2ZW7DrSBrb250cm9sbsOtaG8gY2hvZHUgdnltw6Fow6Fuw61gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdFN0b3Jub1wiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5mb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0aGF0LmNyZWF0ZUZvcm0oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1Lb250cm9sYVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTItOC0yLCBNLTItOC0yLCBTLTItOC0yXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiWmFkZWp0ZSBwYXJhbWV0cnkga29udHJvbHkgesOhem5hbXUgbyB2eW3DoWjDoW7DrS5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5lbWFfcG9sb3preVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaMOhbsOtIG5lbcOhIHNsb8W+a3kgdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQubmVtYV9wb2xvemt5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmVzb3VobGFzaV9zdW1hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmVzb3VobGFzw60gc291xI1ldCBzbG/FvmVrIHZ5bcOhaMOhbsOtIGEgY2Vsa292w6Egdnltw6FoYW7DoSDEjcOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5uZXNvdWhsYXNpX3N1bWFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZW1hX3ByZWRwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb2xvxb5reSB2eW3DoWjDoW7DrSBuZW1hasOtIG9kcG92w61kYWrDrWPDrSBwxZllZHBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5uZW1hX3ByZWRwaXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkc3VfemVtcmVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiT3NvYmEgdiBkb3TEjWVuw71jaCBzdWJqZWt0ZWNoIHplbcWZZWxhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LmRzdV96ZW1yZWxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZW1hX2RzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5lbcOhIGRvdMSNZW7DqSBzdWJqZWt0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5uZW1hX2RzdVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVHl0byBrb250cm9seSBsemUga29tYmlub3ZhdCBzIGZpbHRyZW0gdnltw6Fow6Fuw60hXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlVqaXN0xJt0ZSBzZSwgxb5lIHDFmWVkIHNwdcWhdMSbbsOtbSBtw6F0ZSBzcHLDoXZuxJsgbmFwb8SNdGVuw6kgc3Rhdnkgdnltw6Fow6Fuw60hXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIG5lbWFfcG9sb3preSA9IHRoaXMuZm9ybS5maW5kRmllbGRzKFwibmVtYV9wb2xvemt5XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgbmVzb3VobGFzaV9zdW1hID0gdGhpcy5mb3JtLmZpbmRGaWVsZHMoXCJuZXNvdWhsYXNpX3N1bWFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBuZW1hX3ByZWRwaXMgPSB0aGlzLmZvcm0uZmluZEZpZWxkcyhcIm5lbWFfcHJlZHBpc1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRzdV96ZW1yZWwgPSB0aGlzLmZvcm0uZmluZEZpZWxkcyhcImRzdV96ZW1yZWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBuZW1hX2RzdSA9IHRoaXMuZm9ybS5maW5kRmllbGRzKFwibmVtYV9kc3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoeyBuZW1hX3BvbG96a3k6IG5lbWFfcG9sb3preSwgbmVzb3VobGFzaV9zdW1hOiBuZXNvdWhsYXNpX3N1bWEsIG5lbWFfcHJlZHBpczogbmVtYV9wcmVkcGlzLCBkc3VfemVtcmVsOiBkc3VfemVtcmVsLCBuZW1hX2RzdTogbmVtYV9kc3UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19