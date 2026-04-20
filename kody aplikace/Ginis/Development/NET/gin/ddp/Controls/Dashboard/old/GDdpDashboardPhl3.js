"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpDashboardPhl3.ts                   </Name>
//    <Description> Úvodní informace Ddpek                                      </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            //const { gcontent } = Decorators;
            let GDdpDashboardPhl3 = class GDdpDashboardPhl3 extends Gordic.GContentBase {
                onContentReady() {
                    let that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var promise = Gordic.Isl.TypPohledavky.read(rq => {
                        return {
                            data: {
                                typ_phl: this.typ_phl,
                            },
                            fragments: ["*", "Nastaveni.*"]
                        };
                    }).get();
                    this.createContet();
                    promise.done((data) => {
                        this.dto = data.data;
                        this.findFields().gfield("model", "apply", this.dto);
                        //this.gridDoplnkoveUdaje.ggrid("setData", Common.TypPohledavky.getTexts(this.dto));
                        //this.dirty = false;
                    });
                }
                createContet() {
                    let formStatistikaPhl = new Gordic.Forms.Form({ name: "formStatistikaPhl", layoutDescriptor: "L2M2S2" })
                        .addSection()
                        .addRow({ label: "Typ pohledávky" })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                    })
                        .addRow({ label: "Datum uzávěrky" })
                        .addField("gdatebox", { name: "Nastaveni.dat_uzav", disabled: true })
                        .addRow({ label: "Rok" })
                        .addField("gselectbox", Gordic.Prefabs.Select.rok(), { name: "Nastaveni.rok", model: "model.Nastaveni.rok=value.rok", disabled: true })
                        .addRow({ label: "IČO" })
                        .addField("gnumberbox", { name: "Nastaveni.ico", disabled: true })
                        .addRow({ label: "Učetní středisko" })
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), { name: "Nastaveni.ucs", model: "model.Nastaveni.ucs=value.ucs;model.Nastaveni.ico=value.ico", disabled: true })
                        .addRow({ label: "Poznámka" })
                        .addField("gstringbox", { name: "poznamka", disabled: true })
                        .addRow({ label: "Stav pohledávky" })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcstp(), { name: "Nastaveni.stav_phl", model: "model.Nastaveni.stav_phl=value.stav_phl", disabled: true })
                        //?-------------------------------------------------------
                        .addSection()
                        .addRow("Počet aktivních případů")
                        .addField("gnumberbox", { name: "aktivni_pripady", disabled: true })
                        .addRow("Počet zrušených případů")
                        .addField("gnumberbox", { name: "zrusene_pripady", disabled: true })
                        .addRow("Počet ukončených případů")
                        .addField("gnumberbox", { name: "ukoncene_pripady", disabled: true })
                        .addSection()
                        .addRow("Počet případů celkem")
                        .addField("gnumberbox", { name: "celkem_pripadu", disabled: true })
                        .addRow("z toho aktivních plátců samost")
                        .addField("gnumberbox", { name: "aktivnich_platcu_samost", disabled: true })
                        .addRow("aktivních plátců za popl")
                        .addField("gnumberbox", { name: "aktivnich_platcu_popl", disabled: true })
                        .addRow("a napojených poplatníků")
                        .addField("gnumberbox", { name: "napojenych_poplatniku", disabled: true })
                        .addSection()
                        .addRow("Předpisů celkem")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "celkem_predpisu", disabled: true })
                        .addRow("Plateb celkem")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "celkem_plateb", disabled: true })
                        .addRow("Počet předpisů")
                        .addField("gnumberbox", { name: "pocet_predpisu", disabled: true })
                        .addRow("Počet plateb")
                        .addField("gnumberbox", { name: "pocet_plateb", disabled: true });
                    var statistika = $("<div>").appendTo(this.element).gform("createFrom", formStatistikaPhl);
                    let def = $.Deferred();
                    let fields = this.findForms("formStatistikaPhl").findFields("aktivni_pripady", "zrusene_pripady", "ukoncene_pripady", "celkem_pripadu", "aktivnich_platcu_samost", "aktivnich_platcu_popl", "napojenych_poplatniku");
                    fields.gfield("option", "waitingForValue", def.promise());
                    fields.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let def2 = $.Deferred();
                    let fields2 = this.findForms("formStatistikaPhl").findFields("celkem_predpisu", "pocet_predpisu");
                    fields2.gfield("option", "waitingForValue", def2.promise());
                    fields2.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let def3 = $.Deferred();
                    let fields3 = this.findForms("formStatistikaPhl").findFields("celkem_plateb", "pocet_plateb");
                    fields3.gfield("option", "waitingForValue", def3.promise());
                    fields3.gprogressoverlay({}).gprogressoverlay("setPending", true);
                    let r = { typ_phl: this.typ_phl };
                    Gordic.Isl.TypPohledavky.statistikaPripady(r)
                        .get()
                        .done((data) => {
                        fields.gfield("model", "apply", data);
                        def.resolve();
                    })
                        .fail(() => {
                        def.reject();
                    })
                        .always(() => {
                        fields.gprogressoverlay("setPending", false);
                    });
                    Gordic.Isl.TypPohledavky.statistikaPredpisy(r)
                        .get()
                        .done((data) => {
                        fields2.gfield("model", "apply", data);
                        def2.resolve();
                    })
                        .fail(() => {
                        def2.reject();
                    })
                        .always(() => {
                        fields2.gprogressoverlay("setPending", false);
                    });
                    Gordic.Isl.TypPohledavky.statistikaPlatby(r)
                        .get()
                        .done((data) => {
                        fields3.gfield("model", "apply", data);
                        def3.resolve();
                    })
                        .fail(() => {
                        def3.reject();
                    })
                        .always(() => {
                        fields3.gprogressoverlay("setPending", false);
                    });
                }
            };
            GDdpDashboardPhl3 = __decorate([
                Decorators.gcontent
            ], GDdpDashboardPhl3);
            WebClient.GDdpDashboardPhl3 = GDdpDashboardPhl3;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcERhc2hib2FyZFBobDMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGRwRGFzaGJvYXJkUGhsMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQW1KZjtBQW5KRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtSm5CO0lBbkpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtSjdCO1FBbkpvQixXQUFBLFNBQVM7WUFFMUIsa0NBQWtDO1lBR2xDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQU94QyxjQUFjO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRXBFLElBQUksT0FBTyxHQUFHLE9BQUEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3RDLE9BQU87NEJBQ0gsSUFBSSxFQUFFO2dDQUNGLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzs2QkFDeEI7NEJBQ0QsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQzt5QkFDbEMsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFVCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7b0JBRW5CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUNyQixJ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RUFBRTt3QkFDUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNULE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xELENBQUMsQ0FBQyxDQUFDO29CQUVQLE9BQUEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7eUJBQ2hDLEdBQUcsRUFBRTt5QkFDTCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixDQUFDLENBQUM7eUJBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTt3QkFDVCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBRUosQ0FBQTtZQTdJWSxpQkFBaUI7Z0JBRDdCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsaUJBQWlCLENBNkk3QjtZQTdJWSwyQkFBaUIsb0JBNkk3QixDQUFBO1FBQ0wsQ0FBQyxFQW5Kb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbUo3QjtJQUFELENBQUMsRUFuSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1KbkI7QUFBRCxDQUFDLEVBbkpTLE1BQU0sS0FBTixNQUFNLFFBbUpmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBEYXNoYm9hcmRQaGwzLnRzICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiDDmnZvZG7DrSBpbmZvcm1hY2UgRGRwZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgLy9jb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RkcERhc2hib2FyZFBobDMgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgdHlwX3BobDogc3RyaW5nO1xyXG4gICAgICAgIC8vcHJpdmF0ZSB0YWJNYW5hZ2VyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZm9ybVN0YXRpc3Rpa2FQaGw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBkdG86IEludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG87XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBJc2wuVHlwUG9obGVkYXZreS5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGlzLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIipcIiwgXCJOYXN0YXZlbmkuKlwiXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRldCgpXHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHRvID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGlzLmR0byk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ncmlkRG9wbG5rb3ZlVWRhamUuZ2dyaWQoXCJzZXREYXRhXCIsIENvbW1vbi5UeXBQb2hsZWRhdmt5LmdldFRleHRzKHRoaXMuZHRvKSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbnRldCgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtU3RhdGlzdGlrYVBobCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVN0YXRpc3Rpa2FQaGxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlR5cCBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcHN0cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSB1esOhdsSbcmt5XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgbmFtZTogXCJOYXN0YXZlbmkuZGF0X3V6YXZcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJSb2tcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5yb2soKSwgeyBuYW1lOiBcIk5hc3RhdmVuaS5yb2tcIiwgbW9kZWw6IFwibW9kZWwuTmFzdGF2ZW5pLnJvaz12YWx1ZS5yb2tcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJxIxPXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcIk5hc3RhdmVuaS5pY29cIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJVxI1ldG7DrSBzdMWZZWRpc2tvXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLCB7IG5hbWU6IFwiTmFzdGF2ZW5pLnVjc1wiLCBtb2RlbDogXCJtb2RlbC5OYXN0YXZlbmkudWNzPXZhbHVlLnVjczttb2RlbC5OYXN0YXZlbmkuaWNvPXZhbHVlLmljb1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJQb3puw6Fta2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG96bmFta2FcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiU3RhdiBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNzdHAoKSwgeyBuYW1lOiBcIk5hc3RhdmVuaS5zdGF2X3BobFwiLCBtb2RlbDogXCJtb2RlbC5OYXN0YXZlbmkuc3Rhdl9waGw9dmFsdWUuc3Rhdl9waGxcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb8SNZXQgYWt0aXZuw61jaCBwxZnDrXBhZMWvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJha3Rpdm5pX3ByaXBhZHlcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb8SNZXQgenJ1xaFlbsO9Y2ggcMWZw61wYWTFr1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwienJ1c2VuZV9wcmlwYWR5XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHVrb27EjWVuw71jaCBwxZnDrXBhZMWvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJ1a29uY2VuZV9wcmlwYWR5XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG/EjWV0IHDFmcOtcGFkxa8gY2Vsa2VtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJjZWxrZW1fcHJpcGFkdVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcInogdG9obyBha3Rpdm7DrWNoIHBsw6F0Y8WvIHNhbW9zdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwiYWt0aXZuaWNoX3BsYXRjdV9zYW1vc3RcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJha3Rpdm7DrWNoIHBsw6F0Y8WvIHphIHBvcGxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcImFrdGl2bmljaF9wbGF0Y3VfcG9wbFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImEgbmFwb2plbsO9Y2ggcG9wbGF0bsOta8WvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJuYXBvamVueWNoX3BvcGxhdG5pa3VcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZllZHBpc8WvIGNlbGtlbVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiY2Vsa2VtX3ByZWRwaXN1XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUGxhdGViIGNlbGtlbVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiY2Vsa2VtX3BsYXRlYlwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBwxZllZHBpc8WvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJwb2NldF9wcmVkcGlzdVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBwbGF0ZWJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInBvY2V0X3BsYXRlYlwiLCBkaXNhYmxlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGF0aXN0aWthID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1TdGF0aXN0aWthUGhsKVxyXG5cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZmluZEZvcm1zKFwiZm9ybVN0YXRpc3Rpa2FQaGxcIikuZmluZEZpZWxkcyhcImFrdGl2bmlfcHJpcGFkeVwiLCBcInpydXNlbmVfcHJpcGFkeVwiLCBcInVrb25jZW5lX3ByaXBhZHlcIiwgXCJjZWxrZW1fcHJpcGFkdVwiLCBcImFrdGl2bmljaF9wbGF0Y3Vfc2Ftb3N0XCIsIFwiYWt0aXZuaWNoX3BsYXRjdV9wb3BsXCIsIFwibmFwb2plbnljaF9wb3BsYXRuaWt1XCIpO1xyXG4gICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwib3B0aW9uXCIsIFwid2FpdGluZ0ZvclZhbHVlXCIsIGRlZi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMuZ3Byb2dyZXNzb3ZlcmxheSh7fSkuZ3Byb2dyZXNzb3ZlcmxheShcInNldFBlbmRpbmdcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmMiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkczIgPSB0aGlzLmZpbmRGb3JtcyhcImZvcm1TdGF0aXN0aWthUGhsXCIpLmZpbmRGaWVsZHMoXCJjZWxrZW1fcHJlZHBpc3VcIiwgXCJwb2NldF9wcmVkcGlzdVwiKTtcclxuICAgICAgICAgICAgZmllbGRzMi5nZmllbGQoXCJvcHRpb25cIiwgXCJ3YWl0aW5nRm9yVmFsdWVcIiwgZGVmMi5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMyLmdwcm9ncmVzc292ZXJsYXkoe30pLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZjMgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZHMzID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtU3RhdGlzdGlrYVBobFwiKS5maW5kRmllbGRzKFwiY2Vsa2VtX3BsYXRlYlwiLCBcInBvY2V0X3BsYXRlYlwiKTtcclxuICAgICAgICAgICAgZmllbGRzMy5nZmllbGQoXCJvcHRpb25cIiwgXCJ3YWl0aW5nRm9yVmFsdWVcIiwgZGVmMy5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICBmaWVsZHMzLmdwcm9ncmVzc292ZXJsYXkoe30pLmdwcm9ncmVzc292ZXJsYXkoXCJzZXRQZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCByOiBhbnkgPSB7IHR5cF9waGw6IHRoaXMudHlwX3BobCB9O1xyXG4gICAgICAgICAgICBJc2wuVHlwUG9obGVkYXZreS5zdGF0aXN0aWthUHJpcGFkeShyKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ3Byb2dyZXNzb3ZlcmxheShcInNldFBlbmRpbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBJc2wuVHlwUG9obGVkYXZreS5zdGF0aXN0aWthUHJlZHBpc3kocilcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMyLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmMi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZjIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzMi5ncHJvZ3Jlc3NvdmVybGF5KFwic2V0UGVuZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIElzbC5UeXBQb2hsZWRhdmt5LnN0YXRpc3Rpa2FQbGF0YnkocilcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMzLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmMy5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZjMucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzMy5ncHJvZ3Jlc3NvdmVybGF5KFwic2V0UGVuZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19