(function ($) {
    "use strict";
    namespace("Gordic.Wfl.PrenosPrilohUkoSsl", {
        flashPanelTimer: 3000,
        grid1: null,
        grid2: null,
        attachments1: [],
        attachments2: [],
        originalAttachments2: [], // uchovani puvodniho stavu priloh meneneho dokumentu/ukolu - slouzi pro porovnani stavu pri ukladani
        mainAttachmentInChangedDocument: false,
        categories: {}, // mapa { [key: string]: string }
        dataNonSaved: false,
        dataChanged: false,
        GroupResult: null,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227595"; //RC 26227595 : Přenos el. příloh

            var obrazJakoPrilohaCheckedUS = this.userSettings.get("ObrazJakoPrilohaChecked");

            if(obrazJakoPrilohaCheckedUS != null) {
                this.model.ObrazJakoPrilohaChecked = obrazJakoPrilohaCheckedUS;
            }

            if(this.Ixp1LzeElCteni !== true) {
                that.showFlash("jres:26227614", "g-state-error", 0, "idNeniOpravneni1"); //RC 26227614 : Nemáte oprávnění číst el. soubory originálního dokumentu.
            }
            if(this.Ixp2LzeVlozitElObraz !== true) {
                that.showFlash("jres:26227615", "g-state-error", 0, "idNeniOpravneniObraz2"); //RC 26227615 : Nemáte oprávnění vkládat el. obraz k cílovému dokumentu.
            }
            if(this.Ixp2LzePridatElPrilohy !== true) {
                that.showFlash("jres:26227616", "g-state-error", 0, "idNeniOpravneniPriloha2"); //RC 26227616 : Nemáte oprávnění vkládat el. přílohu k cílovému dokumentu.
            }

            var actionSaveEnabled = this.Ixp1LzeElCteni && (this.Ixp2LzeVlozitElObraz || this.Ixp2LzePridatElPrilohy);

            this.actions.addRange({
                actPridat: {
                    icon: "gi-plus",
                    caption: "jres:26227601", //RC 26227601 : Přidat
                    tooltip: "jres:26227601", //RC 26227601 : Přidat
                    enabled: actionSaveEnabled,
                    run: function (ev, ctx) {
                        that.Pridat();
                    }
                },
                actOdebrat: {
                    icon: "gi-minus",
                    caption: "jres:26227600", //RC 26227600 : Odebrat
                    tooltip: "jres:26227600", //RC 26227600 : Odebrat
                    enabled: actionSaveEnabled,
                    run: function (ev, ctx) {
                        that.Odebrat();
                    }
                },
                //actPosunNahoru: {
                //    caption: "jres:26227602", //RC 26227602 : Posunout nahoru
                //    tooltip: "jres:26227602", //RC 26227602 : Posunout nahoru
                //    captionVisible: "never",
                //    icon: "gi-arrow-down gi-rot180",
                //    enabled: actionSaveEnabled,
                //    run: function () {
                //        that.MoveUp();
                //    }
                //},
                //actPosunDolu: {
                //    caption: "jres:26227603", //RC 26227603 : Posunout dolů
                //    tooltip: "jres:26227603", //RC 26227603 : Posunout dolů
                //    captionVisible: "never",
                //    icon: "gi-arrow-down",
                //    enabled: actionSaveEnabled,
                //    run: function () {
                //        that.MoveDown();
                //    }
                //},
                actSave: {
                    icon: "gi-save",
                    caption: "jres:26227612", //RC 26227612 : Uložit
                    enabled: actionSaveEnabled,
                    run: function (ev, ctx) {
                        that.SaveClick();
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26226879", //RC 26226879 : Zavří­t
                    run: function (ev, ctx) {
                        that.tryClose();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actPridat, favorite: true },
                { action: this.actions.actOdebrat, favorite: true },
              //  { action: this.actions.actPosunNahoru, favorite: true },
              //  { action: this.actions.actPosunDolu, favorite: true }
                { action: this.actions.actSave, favorite: true },
            ]);

            this.commandBar([
                { action: this.actions.actSave, primary: true },
                { action: this.actions.actCancel },
            ]);

            var formSettings = new Gordic.Forms
                .Form({ name: "FormSettings" })
                .addSection()
                .addRow()
                .addField("gcheck", {
                    name: 'ObrazJakoPrilohaCheck',
                    label: "jres:26227608", //RC 26227608 : Hlavní příloha se přenese jako obyčejná příloha
                    model: "ObrazJakoPrilohaChecked",
                    change: function (ev, data) {
                        that.userSettings.set("ObrazJakoPrilohaChecked", data.value);
                        that.model.ObrazJakoPrilohaChecked = data.value;
                    }
                })

            // vytvoření 1. casti formuláře    
            this.formSettings = $("<div>").appendTo(this.element).gform("createFrom", formSettings);

            var formOriginal = new Gordic.Forms
                .Form({ name: "FormOriginal", layoutDescriptor: "L2M2S2" })
                .addSection("jres:26227596") //RC 26227596 : Zdrojový dokument/úkol
                .addRow("jres:26227593" + "/" + this.ZnackaLabelText1)  //RC 26227593 : PID
                .addField("gstringbox", "w-6", {
                    name: "IxpField",
                    //label: "jres:26255541", //RC 26255541 : Generovat ident.
                    model: "Ixp1",
                    disabled: true,
                })
                .addField("gstringbox", "w-6", {
                    name: "ZnackaField",
                    //  label: this.ZnackaLabelText,
                    model: "Znacka1",
                    disabled: true,
                })
                .addRow("jres:26227598") //RC 26227598 : Věc
                .addField("gstringbox", {
                    name: "SpZnField",
                    model: "Vec1",
                    disabled: true
                });

            // vytvoření 2. casti formuláře    
            this.formOrig = $("<div>").appendTo(this.element).gform("createFrom", formOriginal);

            formOriginal.addSection();

            this.AddGrid1();

            var formDuplikat = new Gordic.Forms
                .Form({ name: "FormDuplikat", layoutDescriptor: "L2M2S2" })
                .addSection("jres:26227597") //RC 26227597 : Cílový dokument/úkol
                .addRow("jres:26227593" + "/" + this.ZnackaLabelText2)  //RC 26227593 : PID
                .addField("gstringbox", "w-6", {
                    name: "IxpField",
                    //label: "jres:26255541", //RC 26255541 : Generovat ident.
                    model: "Ixp2",
                    disabled: true,
                })
                .addField("gstringbox", "w-6", {
                    name: "ZnackaField",
                    //  label: this.ZnackaLabelText,
                    model: "Znacka2",
                    disabled: true,
                })
                .addRow("jres:26227598") //RC 26227598 : Věc
                .addField("gstringbox", {
                    name: "SpZnField",
                    model: "Vec2",
                    disabled: true
                });
            // vytvoření 3. casti formuláře   
            this.formDupl = $("<div>").appendTo(this.element).gform("createFrom", formDuplikat);

            this.AddGrid2();

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if (this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.formOrig);
            }

            this.beginOperation("jres:26227599"); //RC 26227599 : Probíhá načítání dat

            Gordic.Wfl.AttachmentUtils.GetCategories(this.Ixp1, this)
                .then(function(categories) {
                    if(categories) {
                        that.categories = categories;
                    }

                    that.LoadGridFromDB(false);
                })
                .fail(function (msg) {
                    that.endOperation();
                });

        },
        LoadGridFromDB: function (showCover) {
            var that = this;

            if(showCover) {
                this.beginOperation("jres:26227599"); //RC 26227599 : Probíhá načítání dat
            }

            this.GroupResult = [];

            Gordic.Wfl.AttachmentUtils.GetListAttachments(this.Ixp1, true, false, this)
                .then(function (attachments) {
                    for (var i = 0; i < attachments.length; i++) {
                        attachments[i].inDB = false;
                    }

                    that.attachments1 = attachments;

                    that.ReloadGrid1();

                    Gordic.Wfl.AttachmentUtils.GetListAttachments(that.Ixp2,false, false, that)
                        .then(function (attachments) {
                            that.originalAttachments2 = [];

                            for(var i = 0; i < attachments.length; i++) {
                                var attachment = attachments[i];

                                attachment.inDB = true;

                                var attachment2 = { };
                                $.extend(true, attachment2, attachment);
                                that.originalAttachments2.push(attachment2);

                                // nastavim priznak, ze v originalnim seznamu je hlavni priloha - to se bude hodit v obsluznych metodach
                                if (attachment.IsFavorite) {
                                    that.mainAttachmentInChangedDocument = true;
                                }
                            }

                            that.attachments2 = attachments;
                            //  that.originalAttachments2 = new Array(attachments);

                            that.ReloadGrid2();

                            that.endOperation();
                        })
                        .fail(function (msg) {
                            that.endOperation();
                        });
                })
                .fail(function (msg) {
                    that.endOperation();
                });
        },
        AddGrid1: function () {
            var that = this;

            this.grid1 = $("<div>").appendTo(this.element)
                .css("height", "100px)")
                .ggrid({
                    name: "Grid1",
                   // data: that.ViewOriginal,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.Download(rowData);
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,
                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["Type", "Nazev", "FileType", "Description", "FileName", "Category"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: Gordic.Wfl.AttachmentUtils.GetGridColumnsDefinition(that, that.OptionsForColumns, false),
                });

        },
        AddGrid2: function () {
            var that = this;

            this.grid2 = $("<div>").appendTo(this.element)
                .css("height", "100px)")
                .ggrid({
                    name: "Grid2",
                    data: that.ViewDuplikat,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.Download(rowData);
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,
                    rowsEnabled: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.inDB === true) {
                            return false;
                        }
                        return true;
                    },
                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["Type", "Nazev", "FileType", "Description", "FileName", "Category"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: Gordic.Wfl.AttachmentUtils.GetGridColumnsDefinition(that, that.OptionsForColumns, false),
                });

        },
        Reload: function () {
            var that = this;

            this.ReloadGrid1();
            this.ReloadGrid2();
        },
        ReloadGrid1: function () {
            var that = this;

            var view = new Gordic.Data.View(that.attachments1, { key: "Id" });  //key je dulezity kvuli pripadnemu vyhledavani radku
            this.grid1.ggrid("setData", view);
        },
        ReloadGrid2: function () {
            var that = this;

            var view = new Gordic.Data.View(that.attachments2, { key: "Id" });  //key je dulezity kvuli pripadnemu vyhledavani radku
            this.grid2.ggrid("setData", view);
        },
        Pridat: function () {
            var that = this;

            this.GroupResult = [];
            this.dataNonSaved = true;
            var selection = this.grid1.ggrid("getSelection");

            if(selection.length > 0) {
                for(var i = 0; i < selection.length; i++) {
                    var row = selection[i];
                    var inList = false;
                    var gr = null;

                    if(row.IsFavorite) {
                        //  obraz muze byt jiz prenesen jako priloha a pak ma zmenen IsFavorite a Category, proto detekuji sloziteji:

                        for(var j = 0; j < this.attachments2.length; j++) {
                            var row2 = this.attachments2[j];

                            if(row2.File != null && row2.File.Ixb === row.File.Ixb) {
                                inList = true;
                            }
                        }
                    } else {
                        // u prilohy je to jednodussi detekce
                        inList = this.attachments2.indexOf(row) !== -1;
                    }

                    if(!inList) { 
                        var actionEnabled = false;
                        var addAsMainAttachment = row.IsFavorite && that.model.ObrazJakoPrilohaChecked !== true;

                        if(addAsMainAttachment) {
                            actionEnabled = this.Ixp2LzeVlozitElObraz;
                        } else {
                            actionEnabled = this.Ixp2LzePridatElPrilohy;
                        }

                        if(actionEnabled) {
                            if(addAsMainAttachment) {
                                if(this.attachments2.length > 0 && this.attachments2[0].IsFavorite) {
                                    var oldMainAttachment = this.attachments2.shift();
                                }

                                this.attachments2.unshift(row);

                                gr = that.CreateGroupResult("", false, row.Id, 0);
                                that.GroupResult.push(gr);
                            } else {
                                if(row.IsFavorite) {
                                    var newRow = { };

                                    if(that.categories != null) {
                                        // KtgTypPri: parseInt(Object.keys(that.categories)[0]) // prvni prvek
                                        var category = { KtgTypPri: 70, KtgTypPriTxt: that.categories["70"] }; // příloha z obrazu
                                        newRow.Category = category;
                                    }

                                    $.extend(true, newRow, row);

                                    newRow.IsFavorite = false;

                                    this.attachments2.push(newRow);
                                } else {
                                    if(row.File != null) {
                                        this.attachments2.push(row);

                                        gr = that.CreateGroupResult("", false, row.Id, 0);
                                    } else {
                                        this.dialogs.alert("jres:26227613".format(row.Name)); //RC 26227613 : Nelze přenést neelektronickou přílohu.

                                        gr = that.CreateGroupResult("jres:26227613".format(row.Name), true, row.Id, 0); //RC 26227613 : Nelze přenést neelektronickou přílohu '{0}'.
                                    }
                                }
                            }
                        } else {
                            this.dialogs.alert("jres:26227617"); //RC 26227617 : Nemáte oprávnění přidat přílohu na cílový dokument.

                            gr = that.CreateGroupResult("jres:26227617", true, row.Id, 0); //RC 26227617 : Nemáte oprávnění přidat přílohu na cílový dokument.
                        }
                    } else {
                        this.dialogs.alert("jres:26227610".format(row.Name)); //RC 26227610 : Vkládaná příloha '{0}' je již v cílovém seznamu obsažena.

                        gr = that.CreateGroupResult("jres:26227610".format(row.Name), true, row.Id, 0); //RC 26227610 : Vkládaná příloha '{0}' je již v cílovém seznamu obsažena.
                    }

                    if(gr != null) {
                        that.GroupResult.push(gr);
                    }
                }

                this.ReloadGrid1(); // jen kvůli group resultu v pripade, ze se nemuze zobrazit v gridu2
                this.ReloadGrid2();
            } else {
                this.dialogs.alert("jres:26227605"); //RC 26227605 : Vyberte jen jeden řádek.
            }
        },
        Odebrat: function () {
            var that = this;

            this.GroupResult = [];
            this.dataNonSaved = true;
            var selection = this.grid2.ggrid("getSelection");
            // TODO, asi by nemelo jit odebrat z puvodniho seznamu

            if(selection.length > 0) {
                for(var i = 0; i < selection.length; i++) {
                    var row = selection[i];

                    if(row.inDB === false) {
                        var pos = this.attachments2.indexOf(row);

                        var removedRow = this.attachments2.splice(pos, 1);

                        // pokud jsem odebral hlavni prilohu, musim vratit puvodni hlavni prilohu, pokud existuje
                        if(row.IsFavorite && this.mainAttachmentInChangedDocument) {
                            var mainAttachmentDoc2 = this.originalAttachments2[0];

                            if(mainAttachmentDoc2.IsFavorite) { // jeste pro jistotu otestuju, zda se jedna o hlavni prilohu
                                this.attachments2.unshift(mainAttachmentDoc2);

                                gr = that.CreateGroupResult("", false, mainAttachmentDoc2.Id, 0);
                                that.GroupResult.push(gr);
                            } else {
                                // neocekavany stav
                                this.dialogs.alert("jres:26227619".format(row.Name));  //RC 26227619 : Neočekávaný stav.
                            }
                        }
                    } else {
                        this.dialogs.alert("jres:26227618".format(row.Name)); //RC 26227618 : Příloha '{0}' nelze odstranit. Již je k dokumentu uložena.

                        var gr = that.CreateGroupResult("jres:26227618".format(row.Name), true, row.Id, 0); //RC 26227618 : Příloha '{0}' nelze odstranit. Již je k dokumentu uložena.
                        that.GroupResult.push(gr);
                    }

                }

                this.ReloadGrid2();
            } else {
                this.dialogs.alert("jres:26227605"); //RC 26227605 : Vyberte jen jeden řádek.
            }
        },
        SaveClick: function () {
            var that = this;

            if(this.dataNonSaved) {
                this.call("SaveAttachmentsList", { model: this.model, originalAttachments: this.originalAttachments2, newAttachments: this.attachments2 })
                    .done(function (data) {
                        that.dataChanged = true;
                        that.dataNonSaved = false;

                        that.LoadGridFromDB(true);

                        //that.tryClose();
                    });
            } else {
                that.showFlash("jres:26227621", "g-state-error", 0, "idNejsouData"); //RC 26227621 : Nejsou připravena data k uložení.
            }
        },
        Download: function (rowData) {
            var that = this;

            if(rowData.File != null) {
                var options = {
                    IsFavorite: rowData.IsFavorite,
                    Ixp: rowData.Ixp,
                    File: {
                        Ixb: rowData.File.Ixb,
                    }
                };

                Gordic.Wfl.AttachmentUtils.OpenAttachment(this, options, false, false, false).done(function (args) {
                    // console.log("doc.downloadCompleted", this, args);
                });
            } else {
                this.dialogs.alert("jres:26227607"); //RC 26227607 : Fyzická příloha nelze otevřít.
            }
        },

        CreateGroupResult: function (error, isError, key, rowState) {
            //CreateGroupResult: function (Error: string, IsError: boolean, Key: string, RowState: number }) {
            return { Error: error, IsError: isError, Key: key, RowState: rowState }
        },

        closing: function () {
            var def = $.Deferred();
            var that = this;

            if(this.dataNonSaved) {
                var title = "jres:26227609"; //RC 26227609 : Dotaz
                this.dialogs.confirm(title, "jres:26227606").on("close", function (ev, retVal) { //RC 26227606 : Na dialogu jsou neuložená data. Přejete si opravdu uzavřít dialog?
                    if(retVal && retVal === "yes") {
                        def.resolve(that.dataChanged);
                    } else {
                        def.reject();
                    }
                });
            } else {
                def.resolve(that.dataChanged);
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);