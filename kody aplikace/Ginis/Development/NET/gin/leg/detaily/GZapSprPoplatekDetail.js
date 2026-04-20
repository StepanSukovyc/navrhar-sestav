"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Leg;
    (function (Leg) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GZapSprPoplatekDetail = class GZapSprPoplatekDetail extends Gordic.GDetailBuilderContent {
                onContentReady(serverData) {
                    var that = this;
                    // naplnění fields
                    that.findFields().gfield("model", "apply", that.model, { initialValues: true }); // projde všechna pole a naplní je z modelu
                }
                /**
                 * Funkce detailbuilderu, spuštěná po merge komponent
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderBuild(builder) {
                }
                /**
                 * onDetailBuilderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
                 */
                onDetailBuilderInit(builder) {
                    var that = this;
                    console.log("init");
                    builder.withComponent("GDetailOsobyLeg", {
                        //headerForm: this.createForm(),
                        tabs: {
                            tabZakladni: {
                                init: function (tab) {
                                    that.defaultForm = tab.gform("createFrom", that.createForm());
                                }
                            },
                        },
                        actions: {
                            actSave: {
                                caption: "jres:25500111", //RC 25500111 : Založit
                                icon: "gi-save",
                                run: function () {
                                    var prom = $.Deferred();
                                    if (that.findForms().gform("isValid")) {
                                        that.findFields().gfield("model", "collect", that.model); // naplneni modelu
                                        // ulozeni do nastaveni
                                        ulozPosledniPouzite();
                                        that.call("UlozSprPoplatek", { model: that.model }).done((ev, retVal) => {
                                            let currentContent = $.content(this);
                                            currentContent.tryClose(ev);
                                        });
                                    }
                                }
                            },
                            actStorno: {
                                caption: "jres:25500109", //RC 25500109 : Zavřít
                                icon: "fa-times",
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
                                    currentContent.tryClose();
                                }
                            }
                        },
                        menuBar: [
                            { action: "actSave", favorite: true, primary: true },
                            { action: "actStorno", favorite: true }
                        ],
                        commandBar: [
                            { action: "actSave", favorite: true, primary: true },
                            { action: "actStorno", favorite: true }
                        ]
                    }, true);
                    var ulozPosledniPouzite = function () {
                        Gordic.Leg.Globals.PosledniPouzite.UlozPosledniSprPoplatek(that.globalSettings, that.model);
                    };
                }
                // hlavni form
                createForm() {
                    console.log("GZapSprPoplatekDetail.Form");
                    var that = this;
                    var form = new Gordic.Forms.Form()
                        .addSection()
                        .addRow("jres:25500098") //RC 25500098 : Plátce
                        //.addField("gselectbox", "w-10", Gordic.Esu.Prefabs.vyberEsu({
                        //    typ: Esu.Globals.Enums.TypZobrazeniKaroteka.Normal,
                        //    Logovani: {
                        //        AktZnacka: "", Ixp: "0000P000000N",
                        //        DuvodHledani: Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu,
                        //        DuvodHledaniTxt: "Vyhledání plátce"
                        //    },
                        //}), { name: "platce", model: "model.platce=value.ixs_esu", flag: "requied", validators: [new Gordic.Validators.Required()], strict: false })
                        .addField("gselectbox", "w-10", Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsuOrZo,
                        Logovani: {
                            // zadání logovacích údaju je nutnost hlavně IXP
                            Ixp: "0000X0000003", // defaultni hodnota 
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            AktZnacka: "",
                            DuvodHledaniTxt: "Ztotožnění "
                        }
                    }), {
                        name: "platce",
                        model: "model.platce=value.ixs_esu",
                        flag: "requied",
                        customClass: "enabled",
                        validators: [new Gordic.Validators.Required()],
                        strict: false
                        //change: function (ev, val) {
                        //    that.findFields("platce").gstringbox("setValue", val.value?.nazev);
                        //}
                    })
                        //.addField("gselectbox", "w-10", Gordic.Prefabs.Select.ginsesu(), { name: "platce", model: "model.platce=value.ixs_esu", validators: [new Gordic.Validators.Required()], flag: "requied", strict: false })
                        .addRow("jres:25500099") //RC 25500099 : Kniha
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.poksden(), {
                        name: "kniha", model: "model.kniha=value.ixp_den", //initialValue: that.model.kniha,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { ico: this.eko_ico, ucs: this.eko_ucs, rok: this.eko_rok }
                    })
                        .addRow("jres:25500100") //RC 25500100 : Pokladní
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.pokvrfuDto(), {
                        //name: "pokladni", model: "model.pokladni=value.ixs_fun, model.kniha=>value.ixp_den, model.subrada=value.subrada", //initialValue: that.model.pokladni,
                        name: "pokladni", model: "model.pokladni=value.ixs_fun, model.kniha=value.ixp_den, model.subrada=value.subrada, ", //, model.kniha=value.ixp_den
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { ixp_den: new Gordic.Forms.Dependency("kniha", "ixp_den", true) }, //serverFilters: { ixp_den: ixp_den } // kniha.ixs_den
                    })
                        .addRow("jres:25500101") //RC 25500101 : Kontace
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.pokvkonDto(), {
                        name: "kontace", model: "model.kontace=value.ixs_kon, model.ixsVpk=value.ixs_vpk", //initialValue: that.model.kontace,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: { ixs_vpk: new Gordic.Forms.Dependency("kniha", "ixs_vpk", true) }, //serverFilters: { ixs_vpk: ixs_vpk } // kniha.ixs_vpk
                    })
                        .addRow("jres:25500102") //RC 25500102 : Variabilní symbol
                        .addField("gstringbox", "w-10", { name: "var_symbol" }) //, model: "model.var_symbol=value.var_symbol" })
                        .addRow("jres:25500113") //RC 25500113 : Popis
                        .addField("gstringbox", "w-10", { name: "popis" }) //, model: "model.popis=value.popis" })
                        .addRow("jres:25500105") //RC 25500105 : Poplatek (Kč)
                        .addField("gnumberbox", "w-10", Gordic.Prefabs.Number.currency(), { name: "poplatek", validators: [new Gordic.Validators.Required()] });
                    //Lze pouzit custom funkci function(masterValue) => thisValue
                    return form;
                }
            };
            GZapSprPoplatekDetail = __decorate([
                gcontent
            ], GZapSprPoplatekDetail);
            WebClient.GZapSprPoplatekDetail = GZapSprPoplatekDetail;
        })(WebClient = Leg.WebClient || (Leg.WebClient = {}));
    })(Leg = Gordic.Leg || (Gordic.Leg = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1phcFNwclBvcGxhdGVrRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1phcFNwclBvcGxhdGVrRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FxS2Y7QUFyS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUtuQjtJQXJLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUs3QjtRQXJLb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLHFCQUFxQjtnQkFZNUQsY0FBYyxDQUE0QyxVQUFrQjtvQkFDeEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7Z0JBQ2hJLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsb0JBQW9CLENBQUMsT0FBeUM7Z0JBRTlELENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsbUJBQW1CLENBQUMsT0FBeUM7b0JBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFcEIsT0FBTyxDQUFDLGFBQWEsQ0FBTyxpQkFBaUIsRUFBRTt3QkFDM0MsZ0NBQWdDO3dCQUNoQyxJQUFJLEVBQ0o7NEJBQ0ksV0FBVyxFQUNYO2dDQUNJLElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxF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Q0FBdUM7eUJBQ3hGLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBRSw2QkFBNkI7eUJBQ3RELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQzNJLDZEQUE2RDtvQkFDN0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFFSixDQUFBO1lBaEtZLHFCQUFxQjtnQkFEakMsUUFBUTtlQUNJLHFCQUFxQixDQWdLakM7WUFoS1ksK0JBQXFCLHdCQWdLakMsQ0FBQTtRQUNMLENBQUMsRUFyS29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXFLN0I7SUFBRCxDQUFDLEVBcktnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxS25CO0FBQUQsQ0FBQyxFQXJLUyxNQUFNLEtBQU4sTUFBTSxRQXFLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuTGVnLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdaYXBTcHJQb3BsYXRla0RldGFpbCBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIElHQ29udGVudCAvLzxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxSZWxvYWRDb21wb25lbnRFeHRlbnNpb25zPlxyXG4gICAge1xyXG5cclxuICAgICAgICBJeHNWaWQ6IHN0cmluZztcclxuICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dTtcclxuICAgICAgICBtb2RlbDogYW55O1xyXG5cclxuICAgICAgICAvL0Vrb1xyXG4gICAgICAgIGVrb19pY286IHN0cmluZztcclxuICAgICAgICBla29fdWNzOiBzdHJpbmc7XHJcbiAgICAgICAgZWtvX3Jvazogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSh0aGlzOiB0aGlzICYgR0NvbnRlbnQ8SUdDb250ZW50QmFzZSwgYW55Piwgc2VydmVyRGF0YTogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gZmllbGRzXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pOyAvLyBwcm9qZGUgdsWhZWNobmEgcG9sZSBhIG5hcGxuw60gamUgeiBtb2RlbHVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBkZXRhaWxidWlsZGVydSwgc3B1xaF0xJtuw6EgcG8gbWVyZ2Uga29tcG9uZW50XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVySW5pdFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbml0XCIpO1xyXG5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiR0RldGFpbE9zb2J5TGVnXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vaGVhZGVyRm9ybTogdGhpcy5jcmVhdGVGb3JtKCksXHJcbiAgICAgICAgICAgICAgICB0YWJzOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlpha2xhZG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9IHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5jcmVhdGVGb3JtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uczpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTUwMDExMVwiLCAvL1JDIDI1NTAwMTExIDogWmFsb8W+aXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb20gPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5maW5kRm9ybXMoKSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoYXQubW9kZWwpOyAvLyBuYXBsbmVuaSBtb2RlbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1bG96ZW5pIGRvIG5hc3RhdmVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVsb3pQb3NsZWRuaVBvdXppdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJVbG96U3ByUG9wbGF0ZWtcIiwgeyBtb2RlbDogdGhhdC5tb2RlbCB9KS5kb25lKChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LnRyeUNsb3NlKGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFN0b3Jubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU1MDAxMDlcIiwgLy9SQyAyNTUwMDEwOSA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAodGhpczogR0FjdGlvbiwgZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRDb250ZW50ID0gJC5jb250ZW50PEdDb250ZW50Pih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZW50LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImFjdFNhdmVcIiwgZmF2b3JpdGU6IHRydWUsIHByaW1hcnk6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RTdG9ybm9cIiwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RTYXZlXCIsIGZhdm9yaXRlOiB0cnVlLCBwcmltYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0U3Rvcm5vXCIsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdWxvelBvc2xlZG5pUG91eml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5MZWcuR2xvYmFscy5Qb3NsZWRuaVBvdXppdGUuVWxvelBvc2xlZG5pU3ByUG9wbGF0ZWsodGhhdC5nbG9iYWxTZXR0aW5ncywgdGhhdC5tb2RlbCk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBobGF2bmkgZm9ybVxyXG4gICAgICAgIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdaYXBTcHJQb3BsYXRla0RldGFpbC5Gb3JtXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTUwMDA5OFwiKSAvL1JDIDI1NTAwMDk4IDogUGzDoXRjZVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMFwiLCBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdHlwOiBFc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5Ob3JtYWwsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIEFrdFpuYWNrYTogXCJcIiwgSXhwOiBcIjAwMDBQMDAwMDAwTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIER1dm9kSGxlZGFuaTogR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaURvdGNlbmVob1N1Ympla3R1LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJWeWhsZWTDoW7DrSBwbMOhdGNlXCJcclxuICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL30pLCB7IG5hbWU6IFwicGxhdGNlXCIsIG1vZGVsOiBcIm1vZGVsLnBsYXRjZT12YWx1ZS5peHNfZXN1XCIsIGZsYWc6IFwicmVxdWllZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCBzdHJpY3Q6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3VPclpvLFxyXG4gICAgICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwMDNcIiwgLy8gZGVmYXVsdG5pIGhvZG5vdGEgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiWnRvdG/Fvm7Em27DrSBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGF0Y2VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wbGF0Y2U9dmFsdWUuaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWllZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2LCB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmZpbmRGaWVsZHMoXCJwbGF0Y2VcIikuZ3N0cmluZ2JveChcInNldFZhbHVlXCIsIHZhbC52YWx1ZT8ubmF6ZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEwXCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZXN1KCksIHsgbmFtZTogXCJwbGF0Y2VcIiwgbW9kZWw6IFwibW9kZWwucGxhdGNlPXZhbHVlLml4c19lc3VcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aWVkXCIsIHN0cmljdDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMDk5XCIpIC8vUkMgMjU1MDAwOTkgOiBLbmloYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBva3NkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia25paGFcIiwgbW9kZWw6IFwibW9kZWwua25paGE9dmFsdWUuaXhwX2RlblwiLCAvL2luaXRpYWxWYWx1ZTogdGhhdC5tb2RlbC5rbmloYSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaWNvOiB0aGlzLmVrb19pY28sIHVjczogdGhpcy5la29fdWNzLCByb2s6IHRoaXMuZWtvX3JvayB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjU1MDAxMDBcIikgLy9SQyAyNTUwMDEwMCA6IFBva2xhZG7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnBva3ZyZnVEdG8oKSwgeyBcclxuICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwicG9rbGFkbmlcIiwgbW9kZWw6IFwibW9kZWwucG9rbGFkbmk9dmFsdWUuaXhzX2Z1biwgbW9kZWwua25paGE9PnZhbHVlLml4cF9kZW4sIG1vZGVsLnN1YnJhZGE9dmFsdWUuc3VicmFkYVwiLCAvL2luaXRpYWxWYWx1ZTogdGhhdC5tb2RlbC5wb2tsYWRuaSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBva2xhZG5pXCIsIG1vZGVsOiBcIm1vZGVsLnBva2xhZG5pPXZhbHVlLml4c19mdW4sIG1vZGVsLmtuaWhhPXZhbHVlLml4cF9kZW4sIG1vZGVsLnN1YnJhZGE9dmFsdWUuc3VicmFkYSwgXCIsIC8vLCBtb2RlbC5rbmloYT12YWx1ZS5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGl4cF9kZW46IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcImtuaWhhXCIsIFwiaXhwX2RlblwiLCB0cnVlKX0sIC8vc2VydmVyRmlsdGVyczogeyBpeHBfZGVuOiBpeHBfZGVuIH0gLy8ga25paGEuaXhzX2RlblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTAxXCIpIC8vUkMgMjU1MDAxMDEgOiBLb250YWNlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucG9rdmtvbkR0bygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb250YWNlXCIsIG1vZGVsOiBcIm1vZGVsLmtvbnRhY2U9dmFsdWUuaXhzX2tvbiwgbW9kZWwuaXhzVnBrPXZhbHVlLml4c192cGtcIiwgLy9pbml0aWFsVmFsdWU6IHRoYXQubW9kZWwua29udGFjZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaXhzX3ZwazogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia25paGFcIiwgXCJpeHNfdnBrXCIsIHRydWUpIH0sIC8vc2VydmVyRmlsdGVyczogeyBpeHNfdnBrOiBpeHNfdnBrIH0gLy8ga25paGEuaXhzX3Zwa1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTAyXCIpIC8vUkMgMjU1MDAxMDIgOiBWYXJpYWJpbG7DrSBzeW1ib2xcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEwXCIsIHsgbmFtZTogXCJ2YXJfc3ltYm9sXCIgfSkvLywgbW9kZWw6IFwibW9kZWwudmFyX3N5bWJvbD12YWx1ZS52YXJfc3ltYm9sXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTEzXCIpICAvL1JDIDI1NTAwMTEzIDogUG9waXNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEwXCIsIHsgbmFtZTogXCJwb3Bpc1wiIH0pLy8sIG1vZGVsOiBcIm1vZGVsLnBvcGlzPXZhbHVlLnBvcGlzXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI1NTAwMTA1XCIpICAvL1JDIDI1NTAwMTA1IDogUG9wbGF0ZWsgKEvEjSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEwXCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwicG9wbGF0ZWtcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAvL0x6ZSBwb3V6aXQgY3VzdG9tIGZ1bmtjaSBmdW5jdGlvbihtYXN0ZXJWYWx1ZSkgPT4gdGhpc1ZhbHVlXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuIl19