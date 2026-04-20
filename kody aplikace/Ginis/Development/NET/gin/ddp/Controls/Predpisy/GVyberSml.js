"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberSml.ts                           </Name>
//    <Description> Okno s políčkem pro výběr smlouvy                           </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-12-05                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno s políčkem pro výběr smlouvy
             * Slouží pro navázání smlouvy k předpisu
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2024
             * @created 2024-12-05
             * @lastModified 2024-12-05
             */
            let GVyberSml = class GVyberSml extends Gordic.GContentBase {
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.title = `Výběr smlouvy`;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formSmlouvy", layoutDescriptor: "L1M1S1" })
                        .addRow()
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoVyberSmlouvy({
                        inputDto: {
                            //úpouzeSmlouvy: false, 
                            rokSml: that.RokDen, // that.rok
                            prijmy: that.KtgUpo < 200,
                        },
                        parentContent: that,
                        esuLogovani: {
                            Ixp: that.Ixp ?? "",
                            AktZnacka: that.AcAg ?? "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                        }, init: function (inputDto, filter) {
                            let esu = that.IxsEsu;
                            let smlouva = that.IxpSml;
                            if (smlouva !== null) {
                                filter.ixp_sml_pri = that.IxpSml; // Když mám PID smlouvy, chci vyfiltrovat tu jednu smlouvu bez ohledu na cokoli
                            }
                            else {
                                if (esu !== null)
                                    filter.ixs_esu = esu; // Když smlouvy nemám zkusím filtrovat podle ESU
                            }
                        }
                    }), {
                        name: "ixp_sml",
                        model: "model.ixp_sml=value.ixp_sml_pri",
                        change: function (ev, input) {
                            if (input) {
                                var ixp_sml = input.value.ixp_sml;
                                var rok_sml = input.value.rok_sml;
                                var cislo_sml = input.value.cislo_sml;
                            }
                        }
                    }));
                }
                /**
                 * Uložení
                 * @method ok()
                 */
                ok() {
                    var smlouvaValue = this.form.findFields("ixp_sml").gfield("getValue");
                    var smlouvaModel;
                    this.form.findFields("ixp_sml").gfield("model", "collect", smlouvaModel);
                    this.close({});
                }
            };
            GVyberSml = __decorate([
                Decorators.gcontent
            ], GVyberSml);
            WebClient.GVyberSml = GVyberSml;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyU21sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5YmVyU21sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBcUdmO0FBckdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFHbkI7SUFyR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFHN0I7UUFyR29CLFdBQUEsU0FBUztZQUMxQjs7Ozs7OztlQU9HO1lBRUgsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLE9BQUEsWUFBWTtnQkFpQnZDOzs7bUJBR0c7Z0JBQ0gsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO29CQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNsQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckMsQ0FBQztxQkFDTCxDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVB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TUFBTSxRQXFHZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJTbWwudHMgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBzIHBvbMOtxI1rZW0gcHJvIHbDvWLEm3Igc21sb3V2eSAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTItMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2tubyBzIHBvbMOtxI1rZW0gcHJvIHbDvWLEm3Igc21sb3V2eVxyXG4gICAgICogU2xvdcW+w60gcHJvIG5hdsOhesOhbsOtIHNtbG91dnkgayBwxZllZHBpc3VcclxuICAgICAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjRcclxuICAgICAqIEBjcmVhdGVkIDIwMjQtMTItMDVcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNC0xMi0wNVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeWJlclNtbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKiBSb2sga25paHkgICovXHJcbiAgICAgICAgUm9rRGVuOiBudW1iZXI7IFxyXG4gICAgICAgIC8qKiBLYXRlZ29yaWUgw7rFmWV0bsOtaG8gcG9oeWJ1IHDFmWVkcGlzdSAqL1xyXG4gICAgICAgIEt0Z1VwbzogbnVtYmVyOyBcclxuICAgICAgICAvKiogUElEIFDFmcOtcGFkdSBERFAgKi9cclxuICAgICAgICBJeHA6IHN0cmluZzsgICAgXHJcbiAgICAgICAgLyoqIEFrdGl2bsOtIHpuYcSNa2EgICovXHJcbiAgICAgICAgQWNBZzogc3RyaW5nOyAgIFxyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBzbWxvdXZ5ICovXHJcbiAgICAgICAgSXhwU21sOiBzdHJpbmc7ICBcclxuICAgICAgICAvKiogIElkZW50aWZpa8OhdG9yIGV4dGVybsOtaG8gc3ViamVrdHUgKi9cclxuICAgICAgICBJeHNFc3U6IHN0cmluZzsgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYFbDvWLEm3Igc21sb3V2eWA7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXbFmcOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5mb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtU21sb3V2eVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvVnliZXJTbWxvdXZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREdG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vw7pwb3V6ZVNtbG91dnk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva1NtbDogdGhhdC5Sb2tEZW4sIC8vIHRoYXQucm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlqbXk6IHRoYXQuS3RnVXBvIDwgMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc3VMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lkl4cCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiB0aGF0LkFjQWcgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaW5pdDogZnVuY3Rpb24gKGlucHV0RHRvLCBmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3UgPSB0aGF0Lkl4c0VzdTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21sb3V2YSA9IHRoYXQuSXhwU21sO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbWxvdXZhICE9PSBudWxsKSB7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwX3NtbF9wcmkgPSB0aGF0Lkl4cFNtbDsgICAgICAgIC8vIEtkecW+IG3DoW0gUElEIHNtbG91dnksIGNoY2kgdnlmaWx0cm92YXQgdHUgamVkbnUgc21sb3V2dSBiZXogb2hsZWR1IG5hIGNva29saVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3UgIT09IG51bGwpIGZpbHRlci5peHNfZXN1ID0gZXN1OyAgLy8gS2R5xb4gc21sb3V2eSBuZW3DoW0gemt1c8OtbSBmaWx0cm92YXQgcG9kbGUgRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX3NtbD12YWx1ZS5peHBfc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBfc21sID0gaW5wdXQudmFsdWUuaXhwX3NtbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9rX3NtbCA9IGlucHV0LnZhbHVlLnJva19zbWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNpc2xvX3NtbCA9IGlucHV0LnZhbHVlLmNpc2xvX3NtbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw61cclxuICAgICAgICAgKiBAbWV0aG9kIG9rKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgdmFyIHNtbG91dmFWYWx1ZSA9IHRoaXMuZm9ybS5maW5kRmllbGRzKFwiaXhwX3NtbFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHNtbG91dmFNb2RlbDtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmZpbmRGaWVsZHMoXCJpeHBfc21sXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBzbWxvdXZhTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19