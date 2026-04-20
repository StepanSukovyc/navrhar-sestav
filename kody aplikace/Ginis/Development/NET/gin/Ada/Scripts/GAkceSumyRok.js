"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceSumyRok.js                                                        </Name>
//    <Description> GAkceSumyRok                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAkceSumyRok = class GAkceSumyRok extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datapocty = this.modelsumyrok;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    var actEdit = new GAction({
                        name: "dblclick",
                        run: function (ev, ctx) {
                            GDlg.alert("Dvojklik");
                        }
                    });
                    cnt.title = "Financování {0}".replace("{0}", this.modelsumyrok.rok.toString());
                    var SumyData = [];
                    var SumyData_CP = [];
                    var SumyData_CP_sum = [];
                    //var itemtemplate_suma = "<div style='border:1px solid LightGray ; width:200px; height:100px;'>" +
                    //    "<div style='background-color: white; padding: 5px; text-align: center;'>" +
                    //    "<h3>{nazev}</h3><h3>{suma}</h3><br>" +
                    //    "</div></div>";
                    //var itemtemplate_suma_sum = "<div style='border:1px solid white ; width:202px; height:100px;'>" +
                    //    "<div style='background-color: DarkGray; padding: 5px; text-align: center;'>" +
                    //    "<h3>{nazev}</h3><h3>{suma}</h3><br>" +
                    //    "</div></div>";
                    var itemtemplate_suma_sum = "<div style='border:1px solid white ; width:180px; height:80px;background-color: DarkGray;'>" +
                        "<div style='padding: 0px; text-align: center;'><h4>{nazev}</h4></div>" +
                        "<div style='padding: 0px; text-align: center;'><h4>{suma}</h4></div>" +
                        "</div>";
                    var itemtemplate_suma = "<div style='border:1px solid white ; width:180px; height:80px;background-color: LightGray;'>" +
                        "<div style='padding: 0px; text-align: center;'><h4>{nazev}</h4></div>" +
                        "<div style='padding: 0px; text-align: center;'><h4>{suma}</h4></div>" +
                        "</div>";
                    // naplnění dat pro CARDPanel            
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_2).plus(parseDecimal(this.modelsumyrok.c_3)).plus(parseDecimal(this.modelsumyrok.c_7)).plus(parseDecimal(this.modelsumyrok.c_8)).plus(parseDecimal(this.modelsumyrok.c_23)).plus(parseDecimal(this.modelsumyrok.c_66));
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Aktuální zdroje";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    //ISPDataRadekData2.suma = SumyDataRadek1.value.toNumber();
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "2,3,7,8,23,66";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_12);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Blokováno";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "12";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_10).plus(parseDecimal(this.modelsumyrok.c_11));
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Nasmlouváno";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "10,11";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_15).plus(parseDecimal(this.modelsumyrok.c_16)).plus(parseDecimal(this.modelsumyrok.c_17));
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Objednáno";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "15,16,17";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_18).plus(parseDecimal(this.modelsumyrok.c_6));
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Rezervováno";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "6,18";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_0);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Čerpáno";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "0";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP_sum.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_2);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Rozpočet schválený";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "2";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_10);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Nasmlouváno ROZ";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "10";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_15);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Objednáno ROZ";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "15";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_6);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Rezervováno ROZ";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "6";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_2).plus(parseDecimal(this.modelsumyrok.c_3)).plus(parseDecimal(this.modelsumyrok.c_7)).plus(parseDecimal(this.modelsumyrok.c_8));
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Rozpočet upravený";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "2,3,7,8";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_11);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Nasmlouváno VZ";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "11";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_16);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Objednáno SML";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "16";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_18);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Rezervováno SML";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "18";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_23);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Mimorozpočtové zdroje";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "23";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = parseDecimal(this.modelsumyrok.c_17);
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "Objednáno VZ";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = Gordic.Templates.Formatters.number(SumyDataRadek1.value.toNumber(), "C").toString() + " " + SumyDataRadek1.unit;
                    ISPDataRadekData2.data = "17";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var SumyDataRadek1 = {};
                    SumyDataRadek1.value = null;
                    SumyDataRadek1.unit = "Kč";
                    SumyDataRadek1.title = "&nbsp";
                    //SumyData.push(SumyDataRadek1);
                    var ISPDataRadekData2 = { nazev: "", suma: "", data: "" };
                    ISPDataRadekData2.nazev = SumyDataRadek1.title;
                    ISPDataRadekData2.suma = "&nbsp";
                    ISPDataRadekData2.data = "";
                    SumyDataRadek1 = ISPDataRadekData2;
                    SumyData_CP.push(SumyDataRadek1);
                    var result = [];
                    result.push(new GObservableObject({
                        name: "kpiroz", title: "Rozpočet", detailsDirection: "vertical",
                        details: [{
                                description: "<b>CELK</b>",
                                value: parseDecimal(this.modelsumyrok.c_2).plus(parseDecimal(this.modelsumyrok.c_3)).plus(parseDecimal(this.modelsumyrok.c_7)).plus(parseDecimal(this.modelsumyrok.c_8)).plus(parseDecimal(this.modelsumyrok.c_23)).plus(parseDecimal(this.modelsumyrok.c_66)),
                                tooltip: "Aktuální zdroje",
                                drd: "2,3,7,8,23,66",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act11",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "SCH",
                                tooltip: "Rozpočet schválený",
                                drd: "2",
                                value: parseDecimal(this.modelsumyrok.c_2),
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act12",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "UPR",
                                tooltip: "Rozpočet upravený",
                                value: parseDecimal(this.modelsumyrok.c_2).plus(parseDecimal(this.modelsumyrok.c_3)).plus(parseDecimal(this.modelsumyrok.c_7)).plus(parseDecimal(this.modelsumyrok.c_8)),
                                drd: "2,3,7,8",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act13",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "MRZ",
                                tooltip: "Mimorozpočtové zdroje",
                                value: parseDecimal(this.modelsumyrok.c_23),
                                drd: "23",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act14",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            }
                        ]
                    }));
                    result.push(new GObservableObject({
                        name: "kpiblk", title: "Blokace", detailsDirection: "vertical",
                        details: [{
                                description: "<b>CELK</b>",
                                tooltip: "Blokováno celkem",
                                value: parseDecimal(this.modelsumyrok.c_12),
                                drd: "12",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act21",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            }]
                    }));
                    result.push(new GObservableObject({
                        name: "kpisml", title: "Nasmlouváno", detailsDirection: "vertical",
                        details: [{
                                description: "<b>CELK</b>",
                                tooltip: "Nasmlouváno celkem",
                                value: parseDecimal(this.modelsumyrok.c_10).plus(parseDecimal(this.modelsumyrok.c_11)),
                                drd: "10,11",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act31",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "ROZ",
                                tooltip: "Nasmlouváno ROZ",
                                value: parseDecimal(this.modelsumyrok.c_10),
                                drd: "10",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act32",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "BLK",
                                tooltip: "Nasmlouváno BLK",
                                value: parseDecimal(this.modelsumyrok.c_11),
                                drd: "11",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act33",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            }]
                    }));
                    result.push(new GObservableObject({
                        name: "kpiobj", title: "Objednáno", detailsDirection: "vertical",
                        details: [{
                                description: "<b>CELK</b>",
                                tooltip: "Objednáno celkem",
                                value: parseDecimal(this.modelsumyrok.c_15).plus(parseDecimal(this.modelsumyrok.c_16)).plus(parseDecimal(this.modelsumyrok.c_17)),
                                drd: "15,16,17",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act41",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "ROZ",
                                tooltip: "Objednáno ROZ",
                                value: parseDecimal(this.modelsumyrok.c_15),
                                drd: "15",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act42",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "SML",
                                tooltip: "Objednáno SML",
                                value: parseDecimal(this.modelsumyrok.c_16),
                                drd: "16",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act43",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "BLK",
                                tooltip: "Objednáno BLK",
                                value: parseDecimal(this.modelsumyrok.c_17),
                                drd: "17",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act44",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            }
                        ]
                    }));
                    result.push(new GObservableObject({
                        name: "kpirez", title: "Rezervováno", detailsDirection: "vertical",
                        details: [{
                                description: "<b>CELK</b>",
                                tooltip: "Rezervováno celkem",
                                value: parseDecimal(this.modelsumyrok.c_6).plus(parseDecimal(this.modelsumyrok.c_18)),
                                drd: "6,18",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act51",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "ROZ",
                                tooltip: "Rezervováno ROZ",
                                value: parseDecimal(this.modelsumyrok.c_6),
                                drd: "6",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act52",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "SML",
                                tooltip: "Rezervováno SML",
                                value: parseDecimal(this.modelsumyrok.c_18),
                                drd: "18",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "info",
                                action: new GAction({
                                    name: "act53",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            }]
                    }));
                    result.push(new GObservableObject({
                        name: "kpicer", title: "Čerpáno", detailsDirection: "vertical", fixedWidth: true,
                        details: [{
                                description: "<b>CELK</b>",
                                tooltip: "Čerpáno celkem",
                                value: parseDecimal(this.modelsumyrok.c_0),
                                drd: "0",
                                formatter: "C",
                                unit: "Kč",
                                meaning: "positive",
                                action: new GAction({
                                    name: "act61",
                                    run: (ev, ctx) => {
                                        this.nacti_zapisy(ctx.item.drd, ctx.item.tooltip);
                                    }
                                })
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            },
                            {
                                description: "",
                                value: "",
                                formatter: "",
                                unit: ""
                            }]
                    }));
                    $("<div>").appendTo(cnt.element).gkpipanel({
                        displayMode: "panel",
                        data: result,
                        fixedWidth: true,
                        width: 190,
                        //tooltipOptions: (ctx) => {
                        //    return {
                        //        caption: "Test",
                        //        content: () => {
                        //            return "<div>" + ctx. + "</div>";
                        //        }
                        //    }
                        //},
                        defaultAction: new GAction({
                            name: "selectBtn",
                            icon: "fa-info-circle",
                            caption: 'Zobrazit seznam zápisů',
                            run: function (ev, ctx) {
                            }
                        }),
                    });
                    ////naplnění KPI do cardpanelu
                    //$("<div style='width:1250px'>").appendTo(cnt.element).gcardpanel({
                    //    editable: true,
                    //    title: "Financování",
                    //    itemTemplate: itemtemplate_suma_sum,
                    //    data: SumyData_CP_sum,
                    //    createTab: false,
                    //    defaultSelected: false,
                    //    defaultAction: new GAction({
                    //        name: "selectBtn",
                    //        icon: "fa-info-circle",
                    //        caption: 'Zobrazit seznam zápisů',
                    //        run: function (ev, ctx) {
                    //            var filtr_zapisy: Gordic.Ada.Interface.GSeznamZapisuAdaFilterDto = {};
                    //            filtr_zapisy.rok = that.filter_akce.rok;
                    //            filtr_zapisy.ico = that.filter_akce.ico;
                    //            filtr_zapisy.cislo = that.filter_akce.cislo;
                    //            filtr_zapisy.drd_msk = ctx.item.data;
                    //            filtr_zapisy.drd_msk_txt = ctx.item.nazev;
                    //            that.navigate(
                    //                "Gordic.Ada.WebClient.GSeznamZapisu",
                    //                {
                    //                    id: 'SeznamZapisu#', 
                    //                    AkceFiltrDto: that.filter_akce,
                    //                    FiltrZapisyDto: filtr_zapisy
                    //                });
                    //        }
                    //    }),
                    //});
                    ////naplnění KPI do cardpanelu
                    //$("<div style='width:1250px'>").appendTo(cnt.element).gcardpanel({
                    //    editable: true,
                    //    title: "Financování",
                    //    itemTemplate: itemtemplate_suma,
                    //    data: SumyData_CP,
                    //    createTab: false,
                    //    defaultSelected: false,
                    //    defaultAction: new GAction({
                    //        name: "selectBtn",
                    //        icon: "fa-info-circle",
                    //        caption: 'Zobrazit seznam zápisů',
                    //        run: function (ev, ctx) {
                    //            var filtr_zapisy: Gordic.Ada.Interface.GSeznamZapisuAdaFilterDto = {};
                    //            filtr_zapisy.rok = that.filter_akce.rok;
                    //            filtr_zapisy.ico = that.filter_akce.ico;
                    //            filtr_zapisy.cislo = that.filter_akce.cislo;
                    //            filtr_zapisy.drd_msk = ctx.item.data;
                    //            filtr_zapisy.drd_msk_txt = ctx.item.nazev;
                    //            that.navigate(
                    //                "Gordic.Ada.WebClient.GSeznamZapisu",
                    //                {
                    //                    id: 'SeznamZapisu#', 
                    //                    AkceFiltrDto: that.filter_akce,
                    //                    FiltrZapisyDto: filtr_zapisy
                    //                });
                    //        }
                    //    }),
                    //    //selection: function (ev, data: Gordic.Ada.Interface.GAkceSumyDto) {
                    //    //},
                    //});
                }
                nacti_zapisy(drd_maska, drd_maska_txt) {
                    var that = this;
                    var filtr_zapisy = {};
                    filtr_zapisy.rok = that.filter_akce.rok;
                    filtr_zapisy.ico = that.filter_akce.ico;
                    filtr_zapisy.cislo = that.filter_akce.cislo;
                    filtr_zapisy.drd_msk = drd_maska;
                    filtr_zapisy.drd_msk_txt = drd_maska_txt;
                    that.navigate("Gordic.Ada.WebClient.GSeznamZapisu", {
                        id: 'SeznamZapisu#',
                        AkceFiltrDto: that.filter_akce,
                        FiltrZapisyDto: filtr_zapisy
                    });
                }
            };
            GAkceSumyRok = __decorate([
                gcontent
            ], GAkceSumyRok);
            WebClient.GAkceSumyRok = GAkceSumyRok;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VTdW15Um9rLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa2NlU3VteVJvay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQXV5QmQ7QUF2eUJGLFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXV5QmxCO0lBdnlCZSxXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1eUI1QjtRQXZ5Qm1CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBV25DLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxPQUFBLFlBQVk7Z0JBVTFDLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUVsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVsSSxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQzt3QkFDdEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMzQixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxHQUFHLENBQUMs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QVcsR0FBRyxhQUFhLENBQUM7b0JBRXpDLElBQUksQ0FBQyxRQUFRLENBQ1Qsb0NBQW9DLEVBQ3BDO3dCQUNJLEVBQUUsRUFBRSxlQUFlO3dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7d0JBQzlCLGNBQWMsRUFBRSxZQUFZO3FCQUMvQixDQUFDLENBQUM7Z0JBRVgsQ0FBQzthQUNKLENBQUE7WUExeEJZLFlBQVk7Z0JBRHhCLFFBQVE7ZUFDSSxZQUFZLENBMHhCeEI7WUExeEJZLHNCQUFZLGVBMHhCeEIsQ0FBQTtRQUNKLENBQUMsRUF2eUJtQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1eUI1QjtJQUFELENBQUMsRUF2eUJlLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXV5QmxCO0FBQUQsQ0FBQyxFQXZ5QlEsTUFBTSxLQUFOLE1BQU0sUUF1eUJkIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlU3VteVJvay5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlU3VteVJvayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdDYXJkT3B0aW9ucyB7XHJcbiAgICAgICAgdW5pdD86IHN0cmluZyxcclxuICAgICAgICB2YWx1ZT86IERlY2ltYWwgfCBudWxsLFxyXG4gICAgICAgIHRpdGxlPzogc3RyaW5nLFxyXG4gICAgICAgIGRhdGE/OiBhbnksXHJcbiAgICAgICAgbmF6ZXY/OiBzdHJpbmcsXHJcbiAgICAgICAgc3VtYT86IHN0cmluZyxcclxufVxyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBa2NlU3VteVJvayBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbW9kZWxzdW15cm9rOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZVN1bXlEdG87XHJcblxyXG4gICAgICAgIC8vICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcbiAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YXBvY3R5ID0gdGhpcy5tb2RlbHN1bXlyb2s7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNudC50aXRsZSA9IFwiRmluYW5jb3bDoW7DrSB7MH1cIi5yZXBsYWNlKFwiezB9XCIsIHRoaXMubW9kZWxzdW15cm9rLnJvayEudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGE6IEdDYXJkT3B0aW9uc1tdID0gW107XHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YV9DUDogR0NhcmRPcHRpb25zW10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhX0NQX3N1bTogR0NhcmRPcHRpb25zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGl0ZW10ZW1wbGF0ZV9zdW1hID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIExpZ2h0R3JheSA7IHdpZHRoOjIwMHB4OyBoZWlnaHQ6MTAwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGRpdiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IHBhZGRpbmc6IDVweDsgdGV4dC1hbGlnbjogY2VudGVyOyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoMz57bmF6ZXZ9PC9oMz48aDM+e3N1bWF9PC9oMz48YnI+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgaXRlbXRlbXBsYXRlX3N1bWFfc3VtID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIHdoaXRlIDsgd2lkdGg6MjAycHg7IGhlaWdodDoxMDBweDsnPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiBEYXJrR3JheTsgcGFkZGluZzogNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGgzPntuYXpldn08L2gzPjxoMz57c3VtYX08L2gzPjxicj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbXRlbXBsYXRlX3N1bWFfc3VtID0gXCI8ZGl2IHN0eWxlPSdib3JkZXI6MXB4IHNvbGlkIHdoaXRlIDsgd2lkdGg6MTgwcHg7IGhlaWdodDo4MHB4O2JhY2tncm91bmQtY29sb3I6IERhcmtHcmF5Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdwYWRkaW5nOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsnPjxoND57bmF6ZXZ9PC9oND48L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyc+PGg0PntzdW1hfTwvaDQ+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBpdGVtdGVtcGxhdGVfc3VtYSA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCB3aGl0ZSA7IHdpZHRoOjE4MHB4OyBoZWlnaHQ6ODBweDtiYWNrZ3JvdW5kLWNvbG9yOiBMaWdodEdyYXk7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyc+PGg0PntuYXpldn08L2g0PjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0ncGFkZGluZzogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Jz48aDQ+e3N1bWF9PC9oND48L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBkYXQgcHJvIENBUkRQYW5lbCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzMhKSkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY183ISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfOCEpKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzIzISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfNjYhKSk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiQWt0dcOhbG7DrSB6ZHJvamVcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICAvL0lTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBTdW15RGF0YVJhZGVrMS52YWx1ZS50b051bWJlcigpO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihTdW15RGF0YVJhZGVrMS52YWx1ZS50b051bWJlcigpLCBcIkNcIikudG9TdHJpbmcoKSArIFwiIFwiICsgU3VteURhdGFSYWRlazEudW5pdDtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuZGF0YSA9IFwiMiwzLDcsOCwyMyw2NlwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUF9zdW0ucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzEyISk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiQmxva292w6Fub1wiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKFN1bXlEYXRhUmFkZWsxLnZhbHVlLnRvTnVtYmVyKCksIFwiQ1wiKS50b1N0cmluZygpICsgXCIgXCIgKyBTdW15RGF0YVJhZGVrMS51bml0O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCIxMlwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUF9zdW0ucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzEwISkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xMSEpKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJOYXNtbG91dsOhbm9cIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihTdW15RGF0YVJhZGVrMS52YWx1ZS50b051bWJlcigpLCBcIkNcIikudG9TdHJpbmcoKSArIFwiIFwiICsgU3VteURhdGFSYWRlazEudW5pdDtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuZGF0YSA9IFwiMTAsMTFcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1Bfc3VtLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xNSEpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTYhKSkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xNyEpKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJPYmplZG7DoW5vXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjE1LDE2LDE3XCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQX3N1bS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTghKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzYhKSk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiUmV6ZXJ2b3bDoW5vXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjYsMThcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1Bfc3VtLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18wISk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwixIxlcnDDoW5vXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjBcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1Bfc3VtLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18yISk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiUm96cG/EjWV0IHNjaHbDoWxlbsO9XCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjJcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCJcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzEwISk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiTmFzbWxvdXbDoW5vIFJPWlwiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKFN1bXlEYXRhUmFkZWsxLnZhbHVlLnRvTnVtYmVyKCksIFwiQ1wiKS50b1N0cmluZygpICsgXCIgXCIgKyBTdW15RGF0YVJhZGVrMS51bml0O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCIxMFwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUC5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTUhKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJPYmplZG7DoW5vIFJPWlwiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKFN1bXlEYXRhUmFkZWsxLnZhbHVlLnRvTnVtYmVyKCksIFwiQ1wiKS50b1N0cmluZygpICsgXCIgXCIgKyBTdW15RGF0YVJhZGVrMS51bml0O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCIxNVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUC5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzYhKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJSZXplcnZvdsOhbm8gUk9aXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjZcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCJcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzMhKSkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY183ISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfOCEpKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJSb3pwb8SNZXQgdXByYXZlbsO9XCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjIsMyw3LDhcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCJcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzExISk7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiTmFzbWxvdXbDoW5vIFZaXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjExXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xNiEpO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS51bml0ID0gXCJLxI1cIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudGl0bGUgPSBcIk9iamVkbsOhbm8gU01MXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjE2XCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xOCEpO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS51bml0ID0gXCJLxI1cIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudGl0bGUgPSBcIlJlemVydm92w6FubyBTTUxcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihTdW15RGF0YVJhZGVrMS52YWx1ZS50b051bWJlcigpLCBcIkNcIikudG9TdHJpbmcoKSArIFwiIFwiICsgU3VteURhdGFSYWRlazEudW5pdDtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuZGF0YSA9IFwiMThcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgU3VteURhdGFSYWRlazE6IEdDYXJkT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnVuaXQgPSBcIkvEjVwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS50aXRsZSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgLy9TdW15RGF0YS5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuICAgICAgICAgICAgdmFyIElTUERhdGFSYWRla0RhdGEyID0geyBuYXpldjogXCJcIiwgc3VtYTogXCJcIiwgZGF0YTogXCJcIiB9O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5uYXpldiA9IFN1bXlEYXRhUmFkZWsxLnRpdGxlO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5zdW1hID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCJcIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEgPSBJU1BEYXRhUmFkZWtEYXRhMjtcclxuICAgICAgICAgICAgU3VteURhdGFfQ1AucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMjMhKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJNaW1vcm96cG/EjXRvdsOpIHpkcm9qZVwiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKFN1bXlEYXRhUmFkZWsxLnZhbHVlLnRvTnVtYmVyKCksIFwiQ1wiKS50b1N0cmluZygpICsgXCIgXCIgKyBTdW15RGF0YVJhZGVrMS51bml0O1xyXG4gICAgICAgICAgICBJU1BEYXRhUmFkZWtEYXRhMi5kYXRhID0gXCIyM1wiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUC5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBcIiZuYnNwXCI7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIlwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUC5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCImbmJzcFwiO1xyXG4gICAgICAgICAgICAvL1N1bXlEYXRhLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG4gICAgICAgICAgICB2YXIgSVNQRGF0YVJhZGVrRGF0YTIgPSB7IG5hemV2OiBcIlwiLCBzdW1hOiBcIlwiLCBkYXRhOiBcIlwiIH07XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLm5hemV2ID0gU3VteURhdGFSYWRlazEudGl0bGU7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLnN1bWEgPSBcIiZuYnNwXCI7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIlwiO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMSA9IElTUERhdGFSYWRla0RhdGEyO1xyXG4gICAgICAgICAgICBTdW15RGF0YV9DUC5wdXNoKFN1bXlEYXRhUmFkZWsxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBTdW15RGF0YVJhZGVrMTogR0NhcmRPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnZhbHVlID0gcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTchKTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudW5pdCA9IFwiS8SNXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxLnRpdGxlID0gXCJPYmplZG7DoW5vIFZaXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoU3VteURhdGFSYWRlazEudmFsdWUudG9OdW1iZXIoKSwgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiBcIiArIFN1bXlEYXRhUmFkZWsxLnVuaXQ7XHJcbiAgICAgICAgICAgIElTUERhdGFSYWRla0RhdGEyLmRhdGEgPSBcIjE3XCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS51bml0ID0gXCJLxI1cIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudGl0bGUgPSBcIiZuYnNwXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuZGF0YSA9IFwiXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1bXlEYXRhUmFkZWsxOiBHQ2FyZE9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBTdW15RGF0YVJhZGVrMS51bml0ID0gXCJLxI1cIjtcclxuICAgICAgICAgICAgU3VteURhdGFSYWRlazEudGl0bGUgPSBcIiZuYnNwXCI7XHJcbiAgICAgICAgICAgIC8vU3VteURhdGEucHVzaChTdW15RGF0YVJhZGVrMSk7XHJcbiAgICAgICAgICAgIHZhciBJU1BEYXRhUmFkZWtEYXRhMiA9IHsgbmF6ZXY6IFwiXCIsIHN1bWE6IFwiXCIsIGRhdGE6IFwiXCIgfTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIubmF6ZXYgPSBTdW15RGF0YVJhZGVrMS50aXRsZTtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuc3VtYSA9IFwiJm5ic3BcIjtcclxuICAgICAgICAgICAgSVNQRGF0YVJhZGVrRGF0YTIuZGF0YSA9IFwiXCI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhUmFkZWsxID0gSVNQRGF0YVJhZGVrRGF0YTI7XHJcbiAgICAgICAgICAgIFN1bXlEYXRhX0NQLnB1c2goU3VteURhdGFSYWRlazEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaXJvelwiLCB0aXRsZTogXCJSb3pwb8SNZXRcIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+Q0VMSzwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzMhKSkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY183ISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfOCEpKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzIzISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfNjYhKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiQWt0dcOhbG7DrSB6ZHJvamVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkIDogXCIyLDMsNyw4LDIzLDY2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdDExXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICggZXYsIGN0eCApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU0NIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUm96cG/EjWV0IHNjaHbDoWxlbsO9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18yISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0MTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVUFJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJSb3pwb8SNZXQgdXByYXZlbsO9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18yISkucGx1cyhwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18zISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfNyEpKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzghKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIyLDMsNyw4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0MTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNUlpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJNaW1vcm96cG/EjXRvdsOpIHpkcm9qZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMjMhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjIzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0MTRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaWJsa1wiLCB0aXRsZTogXCJCbG9rYWNlXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+Q0VMSzwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJCbG9rb3bDoW5vIGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTIhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdDIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYWN0aV96YXBpc3koY3R4Lml0ZW0uZHJkLCBjdHguaXRlbS50b29sdGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrcGlzbWxcIiwgdGl0bGU6IFwiTmFzbWxvdXbDoW5vXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+Q0VMSzwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXNtbG91dsOhbm8gY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18xMCEpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTEhKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIxMCwxMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3QzMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFjdGlfemFwaXN5KGN0eC5pdGVtLmRyZCwgY3R4Lml0ZW0udG9vbHRpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJPWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc21sb3V2w6FubyBST1pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzEwISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIxMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdDMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYWN0aV96YXBpc3koY3R4Lml0ZW0uZHJkLCBjdHguaXRlbS50b29sdGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQkxLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiTmFzbWxvdXbDoW5vIEJMS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTEhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjExXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0MzNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaW9ialwiLCB0aXRsZTogXCJPYmplZG7DoW5vXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+Q0VMSzwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYmplZG7DoW5vIGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTUhKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzE2ISkpLnBsdXMocGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTchKSkgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmQ6IFwiMTUsMTYsMTdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJLxI1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0NDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJST1pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYmplZG7DoW5vIFJPWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTUhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0NDJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTTUxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYmplZG7DoW5vIFNNTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTYhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjE2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0NDNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCTEtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYmplZG7DoW5vIEJMS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VEZWNpbWFsKHRoaXMubW9kZWxzdW15cm9rLmNfMTchKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjE3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0NDRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hY3RpX3phcGlzeShjdHguaXRlbS5kcmQsIGN0eC5pdGVtLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaXJlelwiLCB0aXRsZTogXCJSZXplcnZvdsOhbm9cIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsczpcclxuICAgICAgICAgICAgICAgICAgICBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCI8Yj5DRUxLPC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlJlemVydm92w6FubyBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzYhKS5wbHVzKHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzE4ISkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmQ6IFwiNiwxOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3Q1MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFjdGlfemFwaXN5KGN0eC5pdGVtLmRyZCwgY3R4Lml0ZW0udG9vbHRpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJPWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlJlemVydm92w6FubyBST1pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzYhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiBcIjZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJLxI1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3Q1MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFjdGlfemFwaXN5KGN0eC5pdGVtLmRyZCwgY3R4Lml0ZW0udG9vbHRpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNNTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlJlemVydm92w6FubyBTTUxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRGVjaW1hbCh0aGlzLm1vZGVsc3VteXJvay5jXzE4ISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIxOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdDUzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYWN0aV96YXBpc3koY3R4Lml0ZW0uZHJkLCBjdHguaXRlbS50b29sdGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrcGljZXJcIiwgdGl0bGU6IFwixIxlcnDDoW5vXCIsIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIiwgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+Q0VMSzwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCLEjGVycMOhbm8gY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZURlY2ltYWwodGhpcy5tb2RlbHN1bXlyb2suY18wISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdDYxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYWN0aV96YXBpc3koY3R4Lml0ZW0uZHJkLCBjdHguaXRlbS50b29sdGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY250LmVsZW1lbnQpLmdrcGlwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TW9kZTogXCJwYW5lbFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LCBcclxuICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE5MCxcclxuICAgICAgICAgICAgICAgIC8vdG9vbHRpcE9wdGlvbnM6IChjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJUZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gXCI8ZGl2PlwiICsgY3R4LiArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdEJ0blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtaW5mby1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnWm9icmF6aXQgc2V6bmFtIHrDoXBpc8WvJyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLy8vbmFwbG7Em27DrSBLUEkgZG8gY2FyZHBhbmVsdVxyXG4gICAgICAgICAgICAvLyQoXCI8ZGl2IHN0eWxlPSd3aWR0aDoxMjUwcHgnPlwiKS5hcHBlbmRUbyhjbnQuZWxlbWVudCkuZ2NhcmRwYW5lbCh7XHJcbiAgICAgICAgICAgIC8vICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICB0aXRsZTogXCJGaW5hbmNvdsOhbsOtXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogaXRlbXRlbXBsYXRlX3N1bWFfc3VtLFxyXG4gICAgICAgICAgICAvLyAgICBkYXRhOiBTdW15RGF0YV9DUF9zdW0sXHJcbiAgICAgICAgICAgIC8vICAgIGNyZWF0ZVRhYjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAvLyAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInNlbGVjdEJ0blwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJmYS1pbmZvLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogJ1pvYnJheml0IHNlem5hbSB6w6FwaXPFrycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBmaWx0cl96YXBpc3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VBZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWx0cl96YXBpc3kucm9rID0gdGhhdC5maWx0ZXJfYWtjZS5yb2s7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdHJfemFwaXN5LmljbyA9IHRoYXQuZmlsdGVyX2FrY2UuaWNvO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRyX3phcGlzeS5jaXNsbyA9IHRoYXQuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdHJfemFwaXN5LmRyZF9tc2sgPSBjdHguaXRlbS5kYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRyX3phcGlzeS5kcmRfbXNrX3R4dCA9IGN0eC5pdGVtLm5hemV2O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1aYXBpc3VcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1aYXBpc3UjJywgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBBa2NlRmlsdHJEdG86IHRoYXQuZmlsdGVyX2FrY2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBGaWx0clphcGlzeUR0bzogZmlsdHJfemFwaXN5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KSxcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vLy9uYXBsbsSbbsOtIEtQSSBkbyBjYXJkcGFuZWx1XHJcbiAgICAgICAgICAgIC8vJChcIjxkaXYgc3R5bGU9J3dpZHRoOjEyNTBweCc+XCIpLmFwcGVuZFRvKGNudC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIHRpdGxlOiBcIkZpbmFuY292w6Fuw61cIixcclxuICAgICAgICAgICAgLy8gICAgaXRlbVRlbXBsYXRlOiBpdGVtdGVtcGxhdGVfc3VtYSxcclxuICAgICAgICAgICAgLy8gICAgZGF0YTogU3VteURhdGFfQ1AsXHJcbiAgICAgICAgICAgIC8vICAgIGNyZWF0ZVRhYjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAvLyAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInNlbGVjdEJ0blwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJmYS1pbmZvLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogJ1pvYnJheml0IHNlem5hbSB6w6FwaXPFrycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBmaWx0cl96YXBpc3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VBZGFGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWx0cl96YXBpc3kucm9rID0gdGhhdC5maWx0ZXJfYWtjZS5yb2s7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdHJfemFwaXN5LmljbyA9IHRoYXQuZmlsdGVyX2FrY2UuaWNvO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRyX3phcGlzeS5jaXNsbyA9IHRoYXQuZmlsdGVyX2FrY2UuY2lzbG87XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZmlsdHJfemFwaXN5LmRyZF9tc2sgPSBjdHguaXRlbS5kYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRyX3phcGlzeS5kcmRfbXNrX3R4dCA9IGN0eC5pdGVtLm5hemV2O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1aYXBpc3VcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1aYXBpc3UjJywgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBBa2NlRmlsdHJEdG86IHRoYXQuZmlsdGVyX2FrY2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBGaWx0clphcGlzeUR0bzogZmlsdHJfemFwaXN5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC8vc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGRhdGE6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlU3VteUR0bykge1xyXG4gICAgICAgICAgICAvLyAgICAvL30sXHJcblxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hY3RpX3phcGlzeShkcmRfbWFza2EsIGRyZF9tYXNrYV90eHQpIHtcclxuICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgIHZhciBmaWx0cl96YXBpc3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VBZGFGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRyX3phcGlzeS5yb2sgPSB0aGF0LmZpbHRlcl9ha2NlLnJvaztcclxuICAgICAgICAgICAgZmlsdHJfemFwaXN5LmljbyA9IHRoYXQuZmlsdGVyX2FrY2UuaWNvO1xyXG4gICAgICAgICAgICBmaWx0cl96YXBpc3kuY2lzbG8gPSB0aGF0LmZpbHRlcl9ha2NlLmNpc2xvO1xyXG4gICAgICAgICAgICBmaWx0cl96YXBpc3kuZHJkX21zayA9IGRyZF9tYXNrYTtcclxuICAgICAgICAgICAgZmlsdHJfemFwaXN5LmRyZF9tc2tfdHh0ID0gZHJkX21hc2thX3R4dDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdTZXpuYW1aYXBpc3VcIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ1Nlem5hbVphcGlzdSMnLCBcclxuICAgICAgICAgICAgICAgICAgICBBa2NlRmlsdHJEdG86IHRoYXQuZmlsdGVyX2FrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgRmlsdHJaYXBpc3lEdG86IGZpbHRyX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIH0iXX0=