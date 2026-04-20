(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Emaily", {
        logger: null,
        isPop3: false, 
        mailFolders: null,
        folderName: null,
        folderNamePom: null,
        currentFolderFlagUp: "1",
        foldersDlg: null,
        flashTimer: 5000,
        savedMailsSettingsId: "IdEvidovanychMailu",
       // lastSelectedMailFolderSettingsId: "lastSelectedMailFolder",
        savedMails: null,
        browserExtension: null,
        dorucenaPostaFolderName: "jres:26256895", //RC 26256895 : Doručená pošta
        GroupResult: [],

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256838"; //RC 26256838 : Evidence

            this.logger = new Gordic.Diagnostics.GLog({ name: "Gordic.Ssl.WebClient.Emaily", fileName: "Emaily.js", authorCode: 262 });
        
            this.isPop3 = this.GinGmsTyperecPar == "SOCK";
            this.model.SelectedFolder = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.OutlookFolder");
           // this.model.SelectedFolder = "Test";//

            this.actions.addRange({
                actEvidovat: {
                    name: "actEvidovat",
                    icon: "gi-plus",
                    caption: "jres:26255346", //RC 26255346 : Evidovat
                    run: function (ev, ctx) {
                        that.Evidovat();
                    }
                },
                actMailFolders: {
                    name: "actMailFolders",
                    icon: "fa-list",
                    caption: "jres:26256893", //RC 26256893 : Výběr složky
                    run: function (ev, ctx) {
                        Gordic.Wfl.Prefabs.MailFoldersSelector(ev, that).then(function (rv) {
                            var folderName = rv.folderName;

                            that.findFields("outlookFoldersSelector").gfield("setValue", folderName);
                            that.LoadGridOutlook(folderName);
                        });
                    }
                },
                actNacist: {
                    name: "actNacist",
                    icon: "fa-refresh",
                    caption: "jres:26255651", //RC 26255651 : Načíst
                    run: function (ev, ctx) {
                        that.ReloadWithApplyFilter();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actEvidovat, favorite: true },
                { action: this.actions.actMailFolders, favorite: true },
            ]);

            this.actions.actMailFolders.visible(!this.isPop3);

            // samotná definice gfilterpanelu
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                    that.EvidenceReload(true, obj.filter); // zde nevolam Reload ze predka, ale lokalni, protoze zde je specificka logika ziskani seznamu - nekdy z klienta (EMAPI, Soubory) nekdy ze serveru (POP3)
                // 02.08.2022 - TFeik
                // Zrušení duplicitního vytváření filterpanelu.
                //}).gfilterpanel({
                //    forms: null, // poleFormu ktere budou pouzity pro podminky
                //    // simpleMode: true,
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            this.PrepareSubtask();
        },
        GetBrowserExtension: function (ev) {
            if(this.browserExtension == null) {
                this.browserExtension = GBrowserExtrasWebApp._createBrowserExtensionManager();
            }

            return this.browserExtension;
        },
        EvidenceReload: function (createNewGrid, filter) {

            /// <summary> obcerstvi seznam </summary>
            /// <param name="createNewGrid" type="bool">pokud potrebuji vymenit sloupce gridu, poslu true</param>
            /// <param name="filter" type="object">dto z filterpanelu</param>
            if (filter !== undefined) {
                $.extend(this.model, filter); // extend hodnot formu do modelu (u formu s maskami nemohu pouzit collect). Rozsirim do modelu, protoze vsude pracuji s this.model
            }

            if (createNewGrid !== undefined && createNewGrid === true) {

                this.LoadGrid();
            } else {
                this.EvidenceLoadData();
            }

        },
        EvidenceLoadData: function () {
            var that = this;

            var dfd = $.Deferred();

            if(this.isPop3) {
                this.GridKey = "MailCounter";
                dfd = this.LoadData(); // pop3
            } else { // emapi
                var folderName = this.findFields("outlookFoldersSelector").gfield("getValue");

                this.GridKey = "IdEntry";
                dfd = this.LoadGridOutlook(folderName);
            }

            return dfd;
        },
        CreateFilterForms: function () {
            var that = this;

            var filterForm = new Gordic.Forms.Form({ name: "FormEvidenceList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                .addSection();

            if(!this.isPop3) {
                filterForm.addPrefab(Gordic.Wfl.Prefabs.OutlookFoldersSelector(this, {
                    name: "outlookFoldersSelector",
                    initialValue: this.model.SelectedFolder,
                    model: "model.SelectedFolder",
                    onChange: function (ev, value) {
                        that.LoadGridOutlook(value);
                    }
                }))
            }

            filterForm.addPrefab(Gordic.Ssl.Prefabs.FilterTypEvidenceDokumentu({
                name: "filterTypEvidence",
                model: "model.TypFiltruEvidence=value.id",
                initialValue: this.model.TypFiltruEvidence,
                FiltrVlastniVisible: that.SslMailEvidPar !== "3",
                FiltrCiziVisible: that.SslMailEvidPar !== "2",
            }));
            filterForm.addPrefab(Gordic.Ssl.Prefabs.FilterTypTvorbyIxp({
                name: "filterTypTvorbyIxp",
                model: "model.TypTvorbyIxp=value.id",
                initialValue: this.model.TypTvorbyIxp,
            }));

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();
            var searchColumns = [];

            var savedIds = this.userSettings.get(this.savedMailsSettingsId);

            gridColumnsDefinition
                .addIconColumn({
                    name: "ico_status",
                    caption: "jres:26257366", //RC 26257366 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var gr = that.GroupResult;
 
                        if (gr != null) {
                            var obj = gr.find(function (obj) { return obj.Key === row.IdEntry; });

                            if (obj != null) {
                                if (obj.IsError === true) {
                                    return { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    return { icon: Gordic.Gin.Icons.StavEnum.provedeno, text: "", tooltip: "" };
                                }
                            }
                        }

                        return null;
                    }
                })
                .addIconColumn({
                    name: "icon",
                    caption: "jres:26256996", //RC 26256996 : Složka
                    customClass: "center",
                    fixedWidth: false,
                    iconTemplate: function (row) {
                        return { icon: "gi-email", text: "jres:26256996", tooltip: "jres:26256996" }; //RC 26256996 : Složka
                    }
                })
                .addIconColumn({
                    name: "evidovano",
                    caption: "jres:26257364", //RC 26257364 : Evidováno do SSL
                    customClass: "center",
                    fixedWidth: false,
                    iconTemplate: function (row) {
                        if(savedIds != null && savedIds.includes(row.IdEntry) === true) {
                            return { icon: "fa-info-circle g-state-text g-state-info", text: "jres:26257365", tooltip: "jres:26257365" }; //RC 26257365 : V minulosti evidováno do SSL
                        }
                        return undefined;
                    }
                })
                .addIconColumn({
                    name: "attachments",
                    caption: "jres:26255264", //RC 26255264 : Přílohy
                    customClass: "center",
                    fixedWidth: false,
                    iconTemplate: function (row) {
                        var text = "jres:26256997"; //RC 26256997 : Obsahuje přílohy
                        if(that.isPop3) { // POP3
                            switch(row.AttacheCount) {
                                case 0: return null;
                                default: return { icon: "gi-attachment", text: text, tooltip: "jres:26256846" + row.AttacheCount }; //RC 26256846 : Počet příloh: 
                            }
                        } else { // EMAPI
                            if(row.HasAnyAttachment) {
                                return { icon: "gi-attachment", text: text, tooltip: text }; 
                            } else {
                                return null;
                            }
                        }
                    }
                })
                .addTextColumn({
                    name: "FromName",
                    caption: "jres:26255951", //RC 26255951 : Od
                    width: 150,
                })
                .addTextColumn({
                    name: "Subject",
                    caption: "jres:26256010", //RC 26256010 : Předmět
                    width: 450,
                })
                .addDateTimeColumn({
                    name: "Date",
                    caption: "jres:26256844", //RC 26256844 : Přijato
                    width: 130,
                });

            if(this.isPop3) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "ToAddressList",
                        caption: "jres:26255954", //RC 26255954 : Komu
                        width: 200,
                    });

                searchColumns = ["FromName", "Subject", "Date", "ToAddressList"];
            } else {
                searchColumns = ["FromName", "Subject", "Date"];
            }

            this.mainGrid.ggrid({
                name: "GridDocs",
                //    data: that.ViewTabulkaSubjektu,
                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                columnMode: "full",  // fit (defaultne by melo byt toto), full
                customClass: "js-gridKartoteka",
                navigationMode: "row", // row, cell
                defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    name: "gridRowSelectedAct",
                    run: function (ev, ctx) {
                        //var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                        //var options = {
                        //    ixp: rowData.ixp,
                        //    grid: that.mainGrid
                        //};
                        //Gordic.Wfl.MainApp.ShowDetail(that, options);
                    }
                }),
                contextMenu: function(cellContext) {
                    return that.GetContextMenu();
                },
                /*    selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return "  ";
                    },*/
                multi: false,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: searchColumns, //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });


            this.EvidenceLoadData();
        },

        GetContextMenu: function() {
            var that = this;
            return [
                {
                    action: this.actions.actEvidovat,
                },
                {
                    action: this.actions.actNacist,
                },
            ]
        },

        // *** Nacteni seznamu mailu ***

        LoadGridOutlook: function (folderName) {
            var dfd = $.Deferred();
            var that = this;

            dfd = this.LoadDataOutlook(folderName)
                .then(function (ret) {
                    var gridData = ret.data;
                    var err = ret.err;

                    var view = new Gordic.Data.View(gridData, { key: that.GridKey });  //key je dulezity kvuli pripadnemu vyhledavani radku

                    that.mainGrid.ggrid("setData", view, true); //true = prekresleni gridu

                    if(that.closed === true) { // ošetření, že někdo zavře content dříve než se načtou data
                        return;
                    }

                    if(err != "") {
                        GDlg.alert(err);
                    }
                })
                .fail(function (msg) {
                    GDlg.alert(msg);
                });

            return dfd;
        },
        LoadDataOutlook: function (folderName) {
            var dfd = $.Deferred();
            var that = this;

          //  this.userSettings.set(this.lastSelectedMailFolderSettingsId, folderName);

            var index = 6; // Dorucena posta
            var CurrentFolderFlagUp = "1"; // 0/1

            if(folderName == null) {
                folderName = ""; // nebo vzit z moznosti aplikace, az bude obslouzeno
                // folderName = "Test";
            } else {
                CurrentFolderFlagUp = "0";
            }
            if(folderName == this.dorucenaPostaFolderName) { // pokud z vyberu slozky prijde dorucena posta
                CurrentFolderFlagUp = "1";
            }

            this.currentFolderFlagUp = CurrentFolderFlagUp;

            var folderNameTitle = folderName == "" ? this.dorucenaPostaFolderName : folderName; // nemuze byt stejny jako folderName, protoze v pripade Doručená pošta je folderName == ''

            this.title = "jres:26256894" + " " + folderNameTitle; //RC 26256894 : Seznam emailů ze složky

            this.beginOperation();

            GBrowserExtras.getOutlookMailsList(index, folderName, this.currentFolderFlagUp).then(function (data) {

            var err = "";
                    
            var dataMail = that.PrepareDataOutlook(data.mailsInfo);

                if(dataMail.Data.length == 0) {
                err = "jres:26255950"; //RC 26255950 : Nebyla nalezena žádná došlá pošta.
                    err = err /*+ "\\n\\n"*/;
                }
                if(dataMail.NeuspesneMaily != "") {
                    err = "jres:26256847" + ": " + dataMail.NeuspesneMaily; //RC 26256847 : Nepodařilo se načíst následující emaily
                }

                that.endOperation();

                dfd.resolve({ data: dataMail.Data, err: err });
            }, function (reason) {

                Gordic.Gui.WebApp.Utils.showReasonFlash(that, reason);
                that.endOperation();
                if (reason && reason.handled === false) {
                    that.showFlash("jres:26255949" + " " + reason.reason, "g-state-error"); //RC 26255949 : Nepodařilo se stáhnout emailovou schránku.
                }
                dfd.reject("jres:26255949").promise(); //RC 26255949 : Nepodařilo se stáhnout emailovou schránku.
            });

            return dfd;
        },
        CreateGroupResult: function (error, isError, key, rowState) {
            return { Error: error, IsError: isError, Key: key, RowState: rowState }
        },
        PrepareDataOutlook: function (mailsDto) {
            var data = [];
            var i = 0;
            var l_sNeuspesneMaily = "";

            var getAttachmentsCount = function (Folder, Index) {
                var attachmentsCount = 0;
                try {
                    attachmentsCount = Folder.Items(Index).Attachments.count;
                } catch (e) {

                }
                return attachmentsCount;
            }

            var xreplace = function (checkMe, toberep, repwith) {
                var temp = checkMe;
                var i = temp.indexOf(toberep);

                while (i > -1) {
                    temp = temp.replace(toberep, repwith);
                    i = temp.indexOf(toberep, i + repwith.length + 1);
                }
                return temp;
            }

            for(i = 0; i < mailsDto.length; i++) {
                var mailItem = mailsDto[i];

                var senderName = mailItem.senderName;
                var subject = mailItem.subject;
                var body = mailItem.body
                var to = mailItem.to;
                var receivedTimeStr = mailItem.receivedTime;
                var idEntry = mailItem.entryID;
                var receivedDate = null;

                if(receivedTimeStr != null && receivedTimeStr != "") {
                  //  var receivedTime = moment(receivedTimeStr, 'DD.MM.YYYY hh.mm');
                  //  var date = receivedTime.toDate();

                    var stringToDate = function (str, format) {
                        var normalized = str.replace(/[^a-zA-Z0-9]/g, '-');
                        var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
                        var formatItems = normalizedFormat.split('-');
                        var dateItems = normalized.split('-');

                        var monthIndex = formatItems.indexOf("mm");
                        var dayIndex = formatItems.indexOf("dd");
                        var yearIndex = formatItems.indexOf("yyyy");
                        var hourIndex = formatItems.indexOf("hh");
                        var minutesIndex = formatItems.indexOf("ii");
                        var secondsIndex = formatItems.indexOf("ss");

                        var today = new Date();

                        var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
                        var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
                        var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

                        var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
                        var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
                        var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

                        second = 0; // !!! upravím pro účely evidence mailu - sekundovou složku outlook nevrací ... dávám 0

                        return new Date(year, month, day, hour, minute, second);
                    };

                    this.logger.trace("Emaily receivedTimeStr: " + receivedTimeStr + "|");

                    var date = stringToDate(receivedTimeStr, "dd.mm.yyyy hh.ii");

                    if(isNaN(date)) {
                        var l_sOdesilatelText = "jres:26255430"; //RC 26255430 : Odesílatel
                        var l_sSubjectText = "jres:26256421"; //RC 26256421 : subjekt
                        l_sNeuspesneMaily = l_sNeuspesneMaily + "\n" + l_sOdesilatelText + ": " + senderName + ", " + l_sSubjectText + ": " + subject;
                        continue; // ochrana proti stavu, kdy mi Outlook vraci NaN a tak mail preskakuji. Nastava u notifikacniho mailu z Exchange, kdyz se nepodari najit ReceivedTime
                    }

                    receivedDate = date;
                }

                if(body != "") {
                    if (body.length > 50) {
                        body = body.substr(0, 49) + " ...";
                    }
                }

                var hasAnyAttachment = mailItem.hasAnyAttachment;

                /*  inputFolder = xreplace(inputFolder, "<", "&lt;"); // nahradim nebezpecne znaky
                inputFolder = xreplace(inputFolder, ">", "&gt;");*/

                var dataRow = { Index: i, HasAnyAttachment: hasAnyAttachment, FromName: senderName, Subject: subject, Body: body, To: to, Date: receivedDate, IdEntry: idEntry };
                data.push(dataRow);
            }

            return {
                Data: data,
                NeuspesneMaily: l_sNeuspesneMaily
            };
        },

        // *** Evidence mailu ***

        Evidovat: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            this.logger.trace("Evidovat email clicked ...");

            var rowData = this.mainGrid.ggrid("getSelection");

            if(rowData.length == 1) {
                var mailRow = rowData[0];
                var docDto = {
                    Ixp: "",
                    IxsEsu: null,
                    PorZast: null,
                    LicZast: null,
                    ZastTxt: null,
                    RezimPodani: this.model.TypFiltruEvidence, // zde pozor! 2 typy, ktere jsou totozne, ale nesmi se to rozjet [RezimPodani/TypEvidenceDokumentu]
                    PridelitCJ: false,
                    InfoCj: null,
                    Subject: "",
                    Body: "",
                    From: null,
                    To: null,
                    Cc: null,
                    ToEmail: null,
                    SenderName: null,
                    EntryId: null,
                    ReceivedDate: null,
                    Attachments: [],
                };

                this.beginOperation();

                if(this.isPop3) {
                    // Gordic.Gui.WebApp.MailContentDto
                    var mailDto = {
                        entryID: mailRow.MessageIdDecoded,
                        subject: mailRow.Subject,
                        body: null, //
                        from: mailRow.FromAddress,
                        to: mailRow.ToNameList,
                        toEmail: mailRow.ToAddressList,
                        cc: mailRow.CCAddressList,
                        receivedTime: mailRow.Date,
                        htmlBody: null,//
                        bodyFormat: null,//
                        attachments: null,//
                    }

                    that.Evidence2(docDto, mailDto);

                } else { // emapi
                    // nactu podrobnosti mailu
                    var index = mailRow.Index + 1; // Outlook indexuje od 1

                    var folderName = this.findFields("outlookFoldersSelector").gfield("getValue");
     
                    this.logger.trace("Eviduji mail " + index + " z " + folderName + ", FlagUp " + this.currentFolderFlagUp);

                    GBrowserExtras.getOutlookMail(index, folderName, this.currentFolderFlagUp).then(function (mailDto) {
                        that.Evidence2(docDto, mailDto);
                    }, function (reason) {
                        that.endOperation();
                        Gordic.Gui.WebApp.Utils.showReasonFlash(that, reason);
                        if (reason && reason.handled === false) {
                            that.showFlash(reason.reason, "g-state-error");
                        }
                    });
                }
            } else {
                GDlg.alert("jres:26256886"); //RC 26256886 : Vyberte jeden řádek.
            }
        },
        Evidence2: function (docDto, mailDto) {
            var that = this;

            // zadani ixp ...
            var typTvorbyIxpEnum = Gordic.Ssl.Globals.Enums.TypTvorbyIxp;

            if (that.model.TypTvorbyIxp == typTvorbyIxpEnum.ZADAVAT_DIALOGEM) { // zadani v dialogu
                var options = {
                    TypDok: that.model.TypFiltruEvidence,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                };
                Gordic.Wfl.Dialogs.GenerovaniIxp(that, options, 'showWindow').done(function (rv, content) {
                    if(rv) {
                        docDto.Ixp = rv.Ixp;
                        that.KontrolaEvidence(docDto, mailDto);
                    }
                });
            } else { // vygeneruju
                Gordic.Wfl.Utils.GenerateIxp(that).done(function (rv) {
                    docDto.Ixp = rv.Ixp;
                    that.KontrolaEvidence(docDto, mailDto);
                });
            }
        },
        KontrolaEvidence: function (docDto, mailDto) {
            var that = this;

            // --- zjistim, zda je email jiz evidovan ---	
            var currentIdEntry = mailDto.entryID;

            var bylMailJizEvidovan = this.BylMailJizEvidovan(currentIdEntry);

            if(bylMailJizEvidovan) {
                GDlg.confirm("jres:26256688", "jres:26255962").on("close", function (ev, retVal) { //RC 26255962 : Email byl již v minulosti do systému zaevidován. Opravdu ho chcete evidovat?
                    if(retVal === "yes") {
                        that.TvorbaCJPriEvidenci(docDto, mailDto);
                    } else {
                        that.endOperation();
                    }
                });
            } else {
                this.TvorbaCJPriEvidenci(docDto, mailDto);
            }

        },
        BylMailJizEvidovan: function (IdMailu) {
            var savedMails = this.userSettings.get(this.savedMailsSettingsId);
            this.savedMails = savedMails;

            if(savedMails != null && savedMails.length > 0) {
                for(var i = 0; i < savedMails.length; i++) {
                    if(savedMails[i] == IdMailu) {
                        return true;
                    }
                }
            }

            return false;
        },
        TvorbaCJPriEvidenci: function (docDto, mailDto) {
            var that = this;

            var ixsTypUserSettings = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.TypPis", null);
            var flagCizi = docDto.RezimPodani == Gordic.Ssl.Globals.Enums.TypEvidenceDokumentu.CIZI;    

            docDto.IxsTyp = ixsTypUserSettings;

            Gordic.Ssl.Utils.GetInfoProZalozeniCjSKontrolouTvorbyCjProDokument(ixsTypUserSettings, flagCizi, this).done(function (cjInfo) {
                var denikInfo = cjInfo.DenikInfo;

                //if(denikInfo.Poradi == undefined) {
                //    denikInfo.Poradi = null;
                //}
                //if(denikInfo.Rok == undefined) {
                //    denikInfo.Rok = null;
                //}

                denikInfo.Poradi = denikInfo.Poradi || null;
                denikInfo.Rok = denikInfo.Rok || null;

                docDto.PridelitCJ = cjInfo.PridelitCj;
                docDto.InfoCj = denikInfo;

                that.VyberOdesilatele(docDto, mailDto);
            });
        },
        VyberOdesilatele: function (docDto, mailDto) {
            var that = this;
            var typEvidenceDokumentuEnum = Gordic.Ssl.Globals.Enums.TypEvidenceDokumentu;

            if(docDto.RezimPodani == typEvidenceDokumentuEnum.CIZI && this.SslMailZodesPar == 0) {
                GDlg.confirm("jres:26256676", "jres:26256118").on("close", function (ev, retVal) { //RC 26256118 : Přejete si vyhledat odesílatele dle emailové adresy?
                    if(retVal === "yes") {

                        var options = {
                            Ucel: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectMultiEsuAndZo,
                            Logovani: { Ixp: docDto.Ixp, DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniOdesilatele, AktZnacka: '', DuvodHledaniTxt: '' },
                            DataToFilterPanel: { mail: mailDto.from },
                        };

                        Gordic.Esu.Dialogs.KartotekaEsuDlg(that, options).on("close", function (ev, retVal) {
                            if(retVal && retVal.subjekty && retVal.subjekty.length > 0) {

                                var selectedEsu = retVal.subjekty[0];
                                docDto.IxsEsu = selectedEsu.ixs_esu;
                                docDto.PorZast = selectedEsu.por_zast;
                                docDto.LicZast = selectedEsu.lic;
                                docDto.ZastTxt = selectedEsu.zast_txt;

                                that.EvidujMail(docDto, mailDto);
                            }
                        });
                    } else {
                        that.EvidujMail(docDto, mailDto);
                    }
                });
            } else {
                this.EvidujMail(docDto, mailDto);
            }

        },
        EvidujMail: function (docDto, mailDto) {
            var that = this;

            this.GroupResult = [];

            docDto.Subject = mailDto.subject;
            docDto.Body = mailDto.body;
            docDto.HtmlBody = mailDto.htmlBody;
            docDto.BodyFormat = mailDto.bodyFormat;
            docDto.From = mailDto.from;
            docDto.To = mailDto.to;
            docDto.Cc = mailDto.cc;
            docDto.ToEmail = mailDto.ToEmail;
            docDto.SenderName = mailDto.senderName;
            docDto.ReceivedDate = mailDto.receivedTime;
            docDto.EntryId = mailDto.entryID;
            docDto.Attachments = mailDto.attachments;

            this.logger.trace("Call EvidujEmail ...");

            var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
            srv.call("EvidujEmail", { dto: docDto })
                .done(function (retVal) {
                    var ixp = retVal.Ixp;
                    var err = retVal.Err;

                    that.SaveEntryIdToUS(docDto.EntryId);

                    var gr = null;

                    if (err != null && err != "") {
                        gr = that.CreateGroupResult(err, true, docDto.EntryId, 0);
                        that.dialogs.warning(err);
                    } else {
                        gr = that.CreateGroupResult("", false, docDto.EntryId, 0);
                    }

                    that.GroupResult.push(gr);

                    that.mainGrid.ggrid("refreshRows");

                    var options = {
                        ixp: ixp,
                        grid: null,
                        WithKontrolaMetadat: that.GinN23VeddPar == 1
                    };
                    Gordic.Wfl.MainApp.ShowDetail(that, options);                   
                })
                .always(function () {
                    that.endOperation();
                });
        },
        SaveEntryIdToUS: function (EntryId) {
            var that = this;

            if(this.savedMails == null) {
                this.savedMails = [];
            }

            this.savedMails.push(EntryId);

            this.userSettings.set(this.savedMailsSettingsId, this.savedMails);

            this.GroupResult = [EntryId];
        },

        // ******

        //DoslaPostaClick: function (rowData) {
        //    this.model.SubTask = this.EvidenceSubTask.DoslaPosta;

        //    this.PrepareSubtask();
        //},
        //SouboryClick: function () {
        //    this.model.SubTask = this.EvidenceSubTask.Soubory;

        //    this.PrepareSubtask();
        //},

        //EvidenceSubTask: {
        //    DoslaPosta: 0,
        //    Soubory: 1,
        //},
    }, { extendIntellisense: GContent });
})(jQuery);
