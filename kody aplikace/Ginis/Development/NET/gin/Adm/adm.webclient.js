"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Adm;
    (function (Adm) {
        var Dialogs;
        (function (Dialogs) {
            //#region OBSOLETE (smazat)
            /**
            * Dialog detailu v administraci
            *
            * @author  Tomáš Hažmuka
            * @date    22.08.2018
            *
            * @param   parentContent						The content.
            * @param   ModOtevreni							mod otevreni dialogu.
            * @return  .
            */
            function DetailAdmDlg(parentContent, ModOtevreni) {
                const options = {
                    ID: "DetailAdm#",
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, 'Gordic.Adm.WebClient.DetailBuilder', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.DetailAdmDlg = DetailAdmDlg;
            //#endregion
            /**
            * Dialog detailu v administraci
            *
            * @author  Tomáš Hažmuka
            * @date    22.08.2018
            *
            * @param   parentContent						The content.
            * @param   ModOtevreni							mod otevreni dialogu.
            * @return  .
            */
            function DetailAdm(parentContent, opt, ModOtevreni) {
                const options = {
                    ID: "DetailAdm#",
                    detail_rezim: opt ? opt.detail_rezim : undefined,
                    detail_name: opt ? opt.detail_name : undefined,
                    primary_key_list: opt ? opt.primary_key_list : undefined,
                    grid: opt ? opt.grid : undefined
                };
                const deferred = $.Deferred();
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                let isValid = true;
                // grid remote control, kvůli šipkám na detailu
                const gridRemoteControl = opt && opt.grid ? new Gordic.Components.GridRC(opt.grid) : undefined;
                var detail = ['Gordic.Adm.WebClient.DetailAdm', { gridRemoteControl: gridRemoteControl }];
                if (isValid) {
                    Gordic.Gui.Dialogs._openDialog(pContent, deferred, detail, ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.DetailAdm = DetailAdm;
        })(Dialogs = Adm.Dialogs || (Adm.Dialogs = {}));
    })(Adm = Gordic.Adm || (Gordic.Adm = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adm.WebClient.DetailAdm.ts								</Name>
//    <Description> Detail (TS)													</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019							</Copyright>
//    <Created>     2019-03-04													</Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Adm;
    (function (Adm) {
        var WebClient;
        (function (WebClient) {
            const { gcontent } = Decorators;
            //#endregion
            /**
             * Detail Administrace - Pomocí detailbuideru TS
             *
             * @author thazmuka
             * @since 480.1.0.9
             */
            let DetailAdm = class DetailAdm extends Gordic.GContentBase {
                //#endregion
                /**
                 * onContentReady
                 */
                onContentReady() {
                    this.newOps({ title: "jres:21300085 " + this.data.detail_caption }); //RC 21300085 : Detail
                    this.init();
                }
                /**
                 * inicializace
                 */
                init() {
                    this.readonly = true;
                    this.saving = false;
                    this.data.detail_rezim = this.detail_rezim;
                    this.showDetail();
                }
                /**
                 * zobrazit detail
                 */
                showDetail() {
                    this.getPrimaryKeys();
                    this.setListControls();
                    this.createMenu();
                    this.createCommandBar();
                    this.createForm();
                    this.setListControlSetup();
                    //#region ** double click na přechod do editace detailu **
                    this.doubleClickDetail();
                    //#endregion
                }
                /**
                 * získat primární klíče
                 */
                getPrimaryKeys() {
                    // vyčistím list
                    this.my_primary_list = [];
                    for (var key in this.primary_key_list) {
                        // uložím všechny primární klíče
                        this.my_primary_list.push(key);
                    }
                }
                /**
                * nastavení nových primárních klíčů, při změně detailu
                * todo: asi by chtelo zmenit, moc slozite a spomaluje
                */
                setPrimaryKeys(data) {
                    /** nový object primárních klíčů */
                    var new_primary_key_list = {};
                    for (var index = 0; index < this.my_primary_list.length; index++) {
                        /** primární klíč */
                        var primary_key = this.my_primary_list[index];
                        // projdu list klíčů
                        for (var key in this.primary_key_list) {
                            // najdu klíč a hodnotu primárního klíče
                            if (key === primary_key) {
                                // projdu data řádku
                                for (var data_key in data) {
                                    if (primary_key === data_key) {
                                        var value = data[data_key];
                                        // přidání prim. klíče
                                        new_primary_key_list[primary_key] = value;
                                    }
                                }
                            }
                        }
                    }
                    return new_primary_key_list;
                }
                setListControls() {
                    //#region ** procházení detailů **
                    var GinListControlsObject = Gordic.Gin.DetailBuilderComponents.GinListControls.create(this);
                    this.actions.addRange(GinListControlsObject.actions);
                    this.setStatusBar(GinListControlsObject.statusBar);
                    $.extend(this, GinListControlsObject.contentExtensions);
                    //#endregion
                }
                setListControlSetup() {
                    //#region ** šipky procházení detailu **
                    this.listControls_setup({
                        //funkce, která řádek z gridu přetransformuje v dto pro zavolání this.load(dto); Může vracet promise.
                        rowToDto: (gridState) => {
                            var data = gridState.currentRow.data;
                            var new_primary_key_list = this.setPrimaryKeys(data);
                            return {
                                primary_key_list: new_primary_key_list
                            };
                        },
                        //template pro tooltip na šipce následující
                        nextItemTemplate: "Následující detail",
                        //template pro tooltip na šipce předchozí
                        prevItemTemplate: "Předchozí detail"
                    });
                    this.listControls_updateCaptions();
                    //#endregion
                }
                /**
                 * nastavit statusbar
                 */
                setStatusBar(GinListControlsObject) {
                    const bar = [];
                    /** IČO */
                    var ico = "00000000";
                    if (this.data.detail_rezim === true) {
                        bar.push({
                            id: "statusNovy",
                            caption: "jres:32000172", //RC 32000172 :  NOVÝ ZÁZNAM
                            type: "static",
                            customClass: "novyDetailClass"
                        });
                    }
                    else {
                        if (this.data.detail_data.aktivita === 100) {
                            bar.push({
                                id: "statusAktivni",
                                caption: "jres:32000173", //RC 32000173 :  AKTIVNÍ ZÁZNAM
                                type: "static",
                                customClass: "aktivitaDetailClass"
                            });
                            bar.push({
                                id: "statusICO",
                                caption: "IČO: " + ico,
                                type: "static",
                                customClass: "ico-class"
                            });
                        }
                        else {
                            bar.push({
                                id: "statusNeaktivni",
                                caption: "jres:32000174", //RC 32000174 :  NEAKTIVNÍ ZÁZNAM
                                type: "static",
                                customClass: "neaktivitaDetailClass"
                            });
                        }
                    }
                    if (GinListControlsObject !== undefined) {
                        bar.push.apply(bar, GinListControlsObject);
                    }
                    this.statusBar(bar);
                }
                /**
                 * vytvořit commandBar
                 */
                createCommandBar() {
                    const bar = [];
                    bar.push({
                        id: "idButtonClose",
                        caption: "jres:32000014", //RC 32000014 : Zavřít
                        action: new GAction({
                            name: "actClose",
                            icon: "gi-window-close",
                            run: () => {
                                this.tryClose();
                            }
                        })
                    });
                    this.commandBar(bar);
                }
                xonContentReady() {
                    this.newOps({
                        title: "jres:21300085 " + this.data.detail_caption, //RC 21300085 : Detail
                    });
                    this.saving = false;
                    this.data.detail_rezim = this.detail_rezim;
                    this.getPrimaryKeys();
                    //#region ** procházení detailů **
                    var GinListControlsObject = Gordic.Gin.DetailBuilderComponents.GinListControls.create(this);
                    this.actions.addRange(GinListControlsObject.actions);
                    this.setStatusBar(GinListControlsObject.statusBar);
                    $.extend(this, GinListControlsObject.contentExtensions);
                    //#endregion
                    this.createMenu();
                    if (this.detail_rezim == false) {
                        this.readonly = true;
                        this.createForm();
                    }
                    else {
                        this.newDetail();
                    }
                    //#region ** šipky procházení detailu **
                    this.listControls_setup({
                        //funkce, která řádek z gridu přetransformuje v dto pro zavolání this.load(dto); Může vracet promise.
                        rowToDto: (gridState) => {
                            var data = gridState.currentRow.data;
                            var new_primary_key_list = this.setPrimaryKeys(data);
                            return {
                                primary_key_list: new_primary_key_list
                            };
                        },
                        //template pro tooltip na šipce následující
                        nextItemTemplate: "Následující detail",
                        //template pro tooltip na šipce předchozí
                        prevItemTemplate: "Předchozí detail"
                    });
                    this.listControls_updateCaptions();
                    //#endregion
                    //#region ** double click na přechod do editace detailu **
                    this.doubleClickDetail();
                    //#endregion
                }
                /**
                 * double click na přechod do editace detailu
                 */
                doubleClickDetail() {
                    this.form.findFields().dblclick(() => {
                        if (this.readonly) // přechod z režimu čtení
                            this.editDetail();
                    });
                }
                /**
                 * přepnutí do editace detailu
                 */
                editDetail() {
                    this.readonly = false;
                    this.showDetail();
                }
                /** fce pro ukončení režimu vytvoření nového detailu */
                endEditDetail() {
                    this.readonly = true; // režim čtení
                    this.showDetail();
                }
                /**
                * vytvořit menu
                */
                createMenu() {
                    // MENU PRO JEDNOTLIVÉ DETAILY
                    var menuBarBuilder = Gordic.Adm.WebClient.MenuBars[this.data.detail_name];
                    if (!menuBarBuilder) {
                        console.error("jres:32000167" + this.data.detail_name); //RC 32000167 : Nepodporovaný menubar
                    }
                    else {
                        menuBarBuilder.create(this);
                    }
                }
                /**
                * vytvořit formulář
                */
                createForm() {
                    if (this.form !== undefined) {
                        this.form.remove();
                    }
                    this.form = $("<div>").appendTo(this.element); // vytvoření formu pro jednotlivé detaily
                    // rozdělení dle typů formulářů
                    var lFormBuilder = Gordic.Adm.WebClient.Forms[this.data.detail_name];
                    lFormBuilder.create(this);
                }
                /** fce pro uložení dat detail okna do DB */
                saveDetail() {
                    this.beginOperation("jres:32000193"); //RC 32000193 : Probíhá ukládání detailu.
                    this.saving = true;
                    Gordic.Adm.WebClient.SaveDetail.preSave(this);
                }
                // fce pro vytvoření menu, sidebarů a volá detail, který vytvoří nový formulář
                newDetail() {
                    this.readonly = false;
                    var primary_list = this.setPrimaryKeys(this.data.detail_data);
                    // nastavíme data na prázdno
                    this.data.detail_data = null;
                    var server = new GContent("Gordic.Adm.WebClient.GAdmAjaxContentControl");
                    server.call("NewDetail", { detail_name: this.data.detail_name, primary_key_list: primary_list }).done((rData) => {
                        this.data.detail_rezim = true; // nastavím příznak režimu NEW
                        this.data.detail_data = rData.detail_data; // přemáznu na nová data
                        this.data.data_right = rData.data_right; // natáhnu objekt s oprávněním
                        this.data.detail_fields = rData.detail_fields; // natahnu si data s popisem parametrů políčka
                        this.showDetail();
                    });
                }
            };
            DetailAdm = __decorate([
                gcontent
            ], DetailAdm);
            WebClient.DetailAdm = DetailAdm;
        })(WebClient = Adm.WebClient || (Adm.WebClient = {}));
    })(Adm = Gordic.Adm || (Gordic.Adm = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Epk.WebControls.OveritPodpisy.ts						</Name>
//    <Description> Detail - Pomocí detailbuideru TS							</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018							</Copyright>
//    <Created>     2018-08-14													</Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Adm;
    (function (Adm) {
        var WebClient;
        (function (WebClient) {
            const { gcontent } = Decorators;
            /**
             * Detail - Pomocí detailbuideru TS
             *
             * @author thazmuka
             * @since 480.1.0.9
             */
            let DetailBuilder = class DetailBuilder extends Gordic.GContentBase {
                onContentReady() {
                    this.newOps({
                        title: "jres:32000190 " + this.Ixp, //RC 32000190 : Detail Administrace
                    });
                }
                onDetailBuilderInit(builder) {
                    //#region KPI
                    builder.kpiDefinitions.push({
                        name: "kpiOne",
                        chartType: "liquid",
                        data: 0,
                        value: 0,
                        unit: "%",
                        title: "KPI 1",
                        text: "Text pro první kpi.",
                        meaning: "neutral",
                        showTextIcon: false,
                        width: 260,
                        height: 60,
                    });
                    builder.kpiDefinitions.push({
                        name: "kpiOne",
                        chartType: "liquid",
                        data: 50,
                        value: 50,
                        unit: "%",
                        title: "KPI 2",
                        text: "Text pro druhý kpi.",
                        meaning: "neutral",
                        showTextIcon: false,
                        width: 260,
                        height: 60,
                    });
                    builder.kpiDefinitions.push({
                        name: "kpiOne",
                        chartType: "liquid",
                        data: 100,
                        value: 100,
                        unit: "%",
                        title: "KPI 3",
                        text: "Text pro třetí kpi.",
                        meaning: "neutral",
                        showTextIcon: false,
                        width: 260,
                        height: 60,
                    });
                    //#endregion
                    // Zaregistrovat vlastní komponentu do builderu.
                    builder.withComponent("MyComponent", {
                        actions: {
                            //#region MenuBar
                            actVyridit: {
                                icon: "gi-tick  g-state-text g-state-success",
                                caption: "jres:32000187", //RC 32000187 : Vyřídit
                                enabled: false,
                                run: function () {
                                }
                            },
                            //#endregion
                            //#region CommandBar
                            actSave: {
                                caption: "jres:32000065", //RC 32000065 : Uložit
                                icon: "gi-save",
                                run: function () {
                                }
                            },
                            actClose: {
                                caption: "jres:32000014", //RC 32000014 : Zavřít
                                icon: "gi-window-close",
                                run: () => {
                                    this.tryClose();
                                }
                            },
                            //#endregion
                        },
                        menuBar: ["actVyridit*"],
                        commandBar: [{ action: "actSave", primary: true }, "actClose"],
                        subtasks: {
                            //prilohy: {
                            //	caption: "jres:32000188" //RC 32000188 : El. soubory
                            //},
                            souvisDokumenty: {
                                caption: "jres:32000189", //RC 32000189 : Související dokumenty
                            }
                        },
                        tabs: {
                            tabSouvisDokumenty: {
                                subtaskId: "souvisDokumenty",
                                init: (tab) => {
                                }
                            }
                        },
                        //#region contentExtensions
                        contentExtensions: {
                            //#region uložit detail
                            saveDetail: function () {
                            }
                            //#endregion
                        },
                        //#endregion
                    }, true); // komponenta bude přidána před všechny ostatní.
                    $.extend(true, builder.sideBarOptions, { right: { visible: false, width: 150 } });
                }
                onDetailBuilderBuild(builder) {
                    //builder.updateDefinition("prilohy", { badge: (builder.getDefinition("statusWflPrilohy", GDbd.DefinitionKind.StatusBar)[0].item as MenuParams).badge }, GDbd.DefinitionKind.SubTask)
                    // nastavení pidbaru
                    builder.updateDefinition("formHeaderFieldPid", {
                        options: {
                            pidVisible: true,
                            iconsVisible: true,
                            keywordsVisible: true,
                        }
                    });
                    var myHeaderForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("jres:32000023") //RC 32000023 : Název
                        .addField("gstringbox", {
                        name: 'nazev'
                    });
                    if (myHeaderForm !== undefined && myHeaderForm.form !== undefined && myHeaderForm.form.sections !== undefined) {
                        // updatovat obsah hlavičkového formuláře
                        builder.updateDefinition("formHeaderSectionOne", {
                            rows: myHeaderForm.form.sections[0].rows
                        });
                    }
                }
            };
            DetailBuilder = __decorate([
                gcontent
            ], DetailBuilder);
            WebClient.DetailBuilder = DetailBuilder;
        })(WebClient = Adm.WebClient || (Adm.WebClient = {}));
    })(Adm = Gordic.Adm || (Gordic.Adm = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtLndlYmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiR0FkbURpYWxvZ3MudHMiLCJEZXRhaWwvRGV0YWlsQWRtLnRzIiwiRGV0YWlsQnVpbGRlci9EZXRhaWxCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0EyRmY7QUEzRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkZuQjtJQTNGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxPQUFPLENBMkYzQjtRQTNGb0IsV0FBQSxPQUFPO1lBRTNCLDJCQUEyQjtZQUUzQjs7Ozs7Ozs7O2NBU0U7WUFDRixTQUFnQixZQUFZLENBQzNCLGFBQXVCLEVBQ3ZCLFdBQWtEO2dCQUVsRCxNQUFNLE9BQU8sR0FBRztvQkFDZixFQUFFLEVBQUUsWUFBWTtpQkFDaEIsQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0UsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUVoRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBRW5CLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoSCxDQUFDO3FCQUNJLENBQUM7b0JBQ0wsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxD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LENBQUMsZUFBZSxDQUFDLENBQUUscUJBQXFCO3lCQUM5QyxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUN2QixJQUFJLEVBQUUsT0FBTztxQkFDYixDQUFDLENBQUE7b0JBRU8sSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUM1Ryx5Q0FBeUM7d0JBQ3pDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRTs0QkFDN0MsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7eUJBQzNDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNYLENBQUM7YUFDRCxDQUFBO1lBakxZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBaUx6QjtZQWpMWSx1QkFBYSxnQkFpTHpCLENBQUE7UUFFRixDQUFDLEVBOUxvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4TDdCO0lBQUQsQ0FBQyxFQTlMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOExuQjtBQUFELENBQUMsRUE5TFMsTUFBTSxLQUFOLE1BQU0sUUE4TGYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5BZG0uRGlhbG9ncyB7XHJcblxyXG5cdC8vI3JlZ2lvbiBPQlNPTEVURSAoc21hemF0KVxyXG5cclxuXHQvKipcclxuXHQqIERpYWxvZyBkZXRhaWx1IHYgYWRtaW5pc3RyYWNpXHJcblx0KlxyXG5cdCogQGF1dGhvciAgVG9tw6HFoSBIYcW+bXVrYVxyXG5cdCogQGRhdGUgICAgMjIuMDguMjAxOFxyXG5cdCpcclxuXHQqIEBwYXJhbSAgIHBhcmVudENvbnRlbnRcdFx0XHRcdFx0XHRUaGUgY29udGVudC5cclxuXHQqIEBwYXJhbSAgIE1vZE90ZXZyZW5pXHRcdFx0XHRcdFx0XHRtb2Qgb3RldnJlbmkgZGlhbG9ndS5cclxuXHQqIEByZXR1cm4gIC5cclxuXHQqL1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBEZXRhaWxBZG1EbGcoXHJcblx0XHRwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuXHRcdE1vZE90ZXZyZW5pPzogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pKTogSlF1ZXJ5UHJvbWlzZTx1bmRlZmluZWQ+IHtcclxuXHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRJRDogXCJEZXRhaWxBZG0jXCIsXHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG5cdFx0Y29uc3QgcENvbnRlbnQgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5aa29udHJvbHVqQ29udGVudChwYXJlbnRDb250ZW50KTtcclxuXHRcdE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG5cdFx0bGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuXHRcdGlmIChpc1ZhbGlkKSB7XHJcblx0XHRcdEdvcmRpYy5HdWkuRGlhbG9ncy5fb3BlbkRpYWxvZyhwQ29udGVudCwgZGVmZXJyZWQsICdHb3JkaWMuQWRtLldlYkNsaWVudC5EZXRhaWxCdWlsZGVyJywgTW9kT3RldnJlbmksIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0fVxyXG5cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblxyXG5cdC8qKlxyXG5cdCogRGlhbG9nIGRldGFpbHUgdiBhZG1pbmlzdHJhY2lcclxuXHQqXHJcblx0KiBAYXV0aG9yICBUb23DocWhIEhhxb5tdWthXHJcblx0KiBAZGF0ZSAgICAyMi4wOC4yMDE4XHJcblx0KlxyXG5cdCogQHBhcmFtICAgcGFyZW50Q29udGVudFx0XHRcdFx0XHRcdFRoZSBjb250ZW50LlxyXG5cdCogQHBhcmFtICAgTW9kT3RldnJlbmlcdFx0XHRcdFx0XHRcdG1vZCBvdGV2cmVuaSBkaWFsb2d1LlxyXG5cdCogQHJldHVybiAgLlxyXG5cdCovXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIERldGFpbEFkbShcclxuXHRcdHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG5cdFx0b3B0OiB7XHJcblx0XHRcdC8qKiBkZXRhaWwgcG91emUgcHJvIMSNdGVuw60gKi9cclxuXHRcdFx0ZGV0YWlsX3JlemltOiBib29sZWFuLFxyXG5cdFx0XHRkZXRhaWxfbmFtZTogYW55LFxyXG5cdFx0XHRwcmltYXJ5X2tleV9saXN0OiBhbnksXHJcblx0XHRcdC8qKiBncmlkIGpxdWVyeSBlbGVtZW50ICovXHJcblx0XHRcdGdyaWQ/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LFxyXG5cdFx0fSxcclxuXHRcdE1vZE90ZXZyZW5pPzogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRJRDogXCJEZXRhaWxBZG0jXCIsXHJcblx0XHRcdGRldGFpbF9yZXppbTogb3B0ID8gb3B0LmRldGFpbF9yZXppbSA6IHVuZGVmaW5lZCxcclxuXHRcdFx0ZGV0YWlsX25hbWU6IG9wdCA/IG9wdC5kZXRhaWxfbmFtZSA6IHVuZGVmaW5lZCxcclxuXHRcdFx0cHJpbWFyeV9rZXlfbGlzdDogb3B0ID8gb3B0LnByaW1hcnlfa2V5X2xpc3QgOiB1bmRlZmluZWQsXHJcblx0XHRcdGdyaWQ6IG9wdCA/IG9wdC5ncmlkIDogdW5kZWZpbmVkXHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG5cdFx0Y29uc3QgcENvbnRlbnQgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5aa29udHJvbHVqQ29udGVudChwYXJlbnRDb250ZW50KTtcclxuXHRcdE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG5cdFx0bGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuXHRcdC8vIGdyaWQgcmVtb3RlIGNvbnRyb2wsIGt2xa9saSDFoWlwa8OhbSBuYSBkZXRhaWx1XHJcblx0XHRjb25zdCBncmlkUmVtb3RlQ29udHJvbCA9IG9wdCAmJiBvcHQuZ3JpZCA/IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMob3B0LmdyaWQpIDogdW5kZWZpbmVkO1xyXG5cdFx0dmFyIGRldGFpbCA9IFsnR29yZGljLkFkbS5XZWJDbGllbnQuRGV0YWlsQWRtJywgeyBncmlkUmVtb3RlQ29udHJvbDogZ3JpZFJlbW90ZUNvbnRyb2wgfV1cclxuXHJcblx0XHRpZiAoaXNWYWxpZCkge1xyXG5cdFx0XHRHb3JkaWMuR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCBkZXRhaWwsIE1vZE90ZXZyZW5pLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdH1cclxuXHJcbn0iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkbS5XZWJDbGllbnQuRGV0YWlsQWRtLnRzXHRcdFx0XHRcdFx0XHRcdDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEZXRhaWwgKFRTKVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB0aGF6bXVrYVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE5XHRcdFx0XHRcdFx0XHQ8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAzLTA0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkbS5XZWJDbGllbnQge1xyXG5cclxuXHRjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzO1xyXG5cclxuXHQvLyNyZWdpb24gKioqIGludGVyZmFjZSAqKipcclxuXHJcblx0LyoqIHByw6F2YSBkZXRhaWx1ICovXHJcblx0aW50ZXJmYWNlIElEZXRhbERhdGFSaWdodCB7XHJcblx0XHRDcmVhdGU6IGJvb2xlYW4sXHJcblx0XHREZWxldGU6IGJvb2xlYW4sXHJcblx0XHRSZWFkOiBib29sZWFuLFxyXG5cdFx0V3JpdGU6IGJvb2xlYW5cclxuXHR9XHJcblxyXG5cdC8qKiBpbnRlcmZhY2UgZGV0YWlsICovXHJcblx0aW50ZXJmYWNlIElEZXRhaWwge1xyXG5cdFx0LyoqIHJlxb5pbSBkZXRhaWx1ICggbmV3IHwgb2xkICkgKi9cclxuXHRcdGRldGFpbF9yZXppbTogYm9vbGVhbixcclxuXHRcdC8qKiBjb25maWcgZGF0YSAqL1xyXG5cdFx0Y29uZmlnX2RhdGE6IGFueSxcclxuXHRcdC8qKiBwcsOhdmEgZGV0YWlsdSAqL1xyXG5cdFx0ZGF0YV9yaWdodDogSURldGFsRGF0YVJpZ2h0LFxyXG5cdFx0LyoqIHRpdHVsZWsgZGV0YWlsdSAqL1xyXG5cdFx0ZGV0YWlsX2NhcHRpb246IHN0cmluZyxcclxuXHRcdC8qKiBkYXRhIGRldGFpbHUgKi9cclxuXHRcdGRldGFpbF9kYXRhOiBhbnksXHJcblx0XHQvKiogcG9sw63EjWthIGRldGFpbHUgKi9cclxuXHRcdGRldGFpbF9maWVsZHM6IGFueSxcclxuXHRcdC8qKiBkZXRhaWwgbmFtZSAqL1xyXG5cdFx0ZGV0YWlsX25hbWU6IHN0cmluZyxcclxuXHRcdHR5cF9vYmo6IG51bWJlcixcclxuXHRcdHVybF9wYXJ0OiBzdHJpbmdcclxuXHR9XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRhaWwgQWRtaW5pc3RyYWNlIC0gUG9tb2PDrSBkZXRhaWxidWlkZXJ1IFRTXHJcblx0ICpcclxuXHQgKiBAYXV0aG9yIHRoYXptdWthXHJcblx0ICogQHNpbmNlIDQ4MC4xLjAuOVxyXG5cdCAqL1xyXG5cdEBnY29udGVudFxyXG5cdGV4cG9ydCBjbGFzcyBEZXRhaWxBZG0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuXHRcdC8vI3JlZ2lvbiAqKiogYXRyaWJ1dHkgKioqXHJcblxyXG5cdFx0LyoqIGtlIMSNdGVuw60gKi9cclxuXHRcdHByaXZhdGUgcmVhZG9ubHk6IGJvb2xlYW47XHJcblx0XHQvKiogZGV0YWlsIHJlxb5pbSB0cnVlLW5ld3xmYWxzZS1vbGQgKi9cclxuXHRcdHByaXZhdGUgZGV0YWlsX3JlemltOiBib29sZWFuO1xyXG5cdFx0LyoqIG3Fr2ogbGlzdCBwcmltw6FybsOtY2gga2zDrcSNxa8gKi9cclxuXHRcdHByaXZhdGUgbXlfcHJpbWFyeV9saXN0OiBzdHJpbmdbXTtcclxuXHRcdC8qKiBsaXN0IHByaW3DoXJuw61jaCBrbMOtxI3FryAqL1xyXG5cdFx0cHJpdmF0ZSBwcmltYXJ5X2tleV9saXN0OiBhbnk7XHJcblx0XHQvKiogZGF0YSBkZXRhaWx1ICovXHJcblx0XHRwcml2YXRlIGRhdGE6IElEZXRhaWw7XHJcblx0XHQvKiogZWxlbWVudCBmb3JtdWzDocWZZSBkZXRhaWx1ICovXHJcblx0XHRwcml2YXRlIGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblx0XHQvKiogdWtsw6Fkw6Fuw60gKi9cclxuXHRcdHByaXZhdGUgc2F2aW5nOiBib29sZWFuO1xyXG5cclxuXHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogb25Db250ZW50UmVhZHlcclxuXHRcdCAqL1xyXG5cdFx0cHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG5cdFx0XHR0aGlzLm5ld09wcyh7IHRpdGxlOiBcImpyZXM6MjEzMDAwODUgXCIgKyB0aGlzLmRhdGEuZGV0YWlsX2NhcHRpb24gfSk7XHRcdFx0Ly9SQyAyMTMwMDA4NSA6IERldGFpbFxyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0ICogaW5pY2lhbGl6YWNlXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgaW5pdCgpIHtcclxuXHRcdFx0dGhpcy5yZWFkb25seSA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuZGF0YS5kZXRhaWxfcmV6aW0gPSB0aGlzLmRldGFpbF9yZXppbTtcclxuXHRcdFx0dGhpcy5zaG93RGV0YWlsKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiB6b2JyYXppdCBkZXRhaWxcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBzaG93RGV0YWlsKCkge1xyXG5cdFx0XHR0aGlzLmdldFByaW1hcnlLZXlzKCk7XHJcblx0XHRcdHRoaXMuc2V0TGlzdENvbnRyb2xzKCk7XHJcblx0XHRcdHRoaXMuY3JlYXRlTWVudSgpO1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVGb3JtKCk7XHJcblx0XHRcdHRoaXMuc2V0TGlzdENvbnRyb2xTZXR1cCgpO1xyXG5cclxuXHRcdFx0Ly8jcmVnaW9uICoqIGRvdWJsZSBjbGljayBuYSBwxZllY2hvZCBkbyBlZGl0YWNlIGRldGFpbHUgKipcclxuXHRcdFx0dGhpcy5kb3VibGVDbGlja0RldGFpbCgpO1xyXG5cdFx0XHQvLyNlbmRyZWdpb25cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiB6w61za2F0IHByaW3DoXJuw60ga2zDrcSNZVxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGdldFByaW1hcnlLZXlzKCkge1xyXG5cdFx0XHQvLyB2ecSNaXN0w61tIGxpc3RcclxuXHRcdFx0dGhpcy5teV9wcmltYXJ5X2xpc3QgPSBbXTtcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHRoaXMucHJpbWFyeV9rZXlfbGlzdCkge1xyXG5cdFx0XHRcdC8vIHVsb8W+w61tIHbFoWVjaG55IHByaW3DoXJuw60ga2zDrcSNZVxyXG5cdFx0XHRcdHRoaXMubXlfcHJpbWFyeV9saXN0LnB1c2goa2V5KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0KiBuYXN0YXZlbsOtIG5vdsO9Y2ggcHJpbcOhcm7DrWNoIGtsw63EjcWvLCBwxZlpIHptxJtuxJsgZGV0YWlsdVxyXG5cdFx0KiB0b2RvOiBhc2kgYnkgY2h0ZWxvIHptZW5pdCwgbW9jIHNsb3ppdGUgYSBzcG9tYWx1amVcclxuXHRcdCovXHJcblx0XHRwcml2YXRlIHNldFByaW1hcnlLZXlzKGRhdGEpIHtcclxuXHJcblx0XHRcdC8qKiBub3bDvSBvYmplY3QgcHJpbcOhcm7DrWNoIGtsw63EjcWvICovXHJcblx0XHRcdHZhciBuZXdfcHJpbWFyeV9rZXlfbGlzdCA9IHt9IGFzIGFueTtcclxuXHRcdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubXlfcHJpbWFyeV9saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRcdC8qKiBwcmltw6FybsOtIGtsw63EjSAqL1xyXG5cdFx0XHRcdHZhciBwcmltYXJ5X2tleSA9IHRoaXMubXlfcHJpbWFyeV9saXN0W2luZGV4XTtcclxuXHRcdFx0XHQvLyBwcm9qZHUgbGlzdCBrbMOtxI3Fr1xyXG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiB0aGlzLnByaW1hcnlfa2V5X2xpc3QpIHtcclxuXHRcdFx0XHRcdC8vIG5hamR1IGtsw63EjSBhIGhvZG5vdHUgcHJpbcOhcm7DrWhvIGtsw63EjWVcclxuXHRcdFx0XHRcdGlmIChrZXkgPT09IHByaW1hcnlfa2V5KSB7XHJcblx0XHRcdFx0XHRcdC8vIHByb2pkdSBkYXRhIMWZw6Fka3VcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgZGF0YV9rZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwcmltYXJ5X2tleSA9PT0gZGF0YV9rZXkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IGRhdGFbZGF0YV9rZXldO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gcMWZaWTDoW7DrSBwcmltLiBrbMOtxI1lXHJcblx0XHRcdFx0XHRcdFx0XHRuZXdfcHJpbWFyeV9rZXlfbGlzdFtwcmltYXJ5X2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ld19wcmltYXJ5X2tleV9saXN0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc2V0TGlzdENvbnRyb2xzKCkge1xyXG5cclxuXHRcdFx0Ly8jcmVnaW9uICoqIHByb2Now6F6ZW7DrSBkZXRhaWzFryAqKlxyXG5cclxuXHRcdFx0dmFyIEdpbkxpc3RDb250cm9sc09iamVjdCA9IChHaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMgYXMgYW55KS5HaW5MaXN0Q29udHJvbHMuY3JlYXRlKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoR2luTGlzdENvbnRyb2xzT2JqZWN0LmFjdGlvbnMpO1xyXG5cdFx0XHR0aGlzLnNldFN0YXR1c0JhcihHaW5MaXN0Q29udHJvbHNPYmplY3Quc3RhdHVzQmFyKTtcclxuXHRcdFx0JC5leHRlbmQodGhpcywgR2luTGlzdENvbnRyb2xzT2JqZWN0LmNvbnRlbnRFeHRlbnNpb25zKTtcclxuXHJcblx0XHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHNldExpc3RDb250cm9sU2V0dXAoKSB7XHJcblxyXG5cdFx0XHQvLyNyZWdpb24gKiogxaFpcGt5IHByb2Now6F6ZW7DrSBkZXRhaWx1ICoqXHJcblxyXG5cdFx0XHQodGhpcyBhcyBhbnkpLmxpc3RDb250cm9sc19zZXR1cCh7XHJcblx0XHRcdFx0Ly9mdW5rY2UsIGt0ZXLDoSDFmcOhZGVrIHogZ3JpZHUgcMWZZXRyYW5zZm9ybXVqZSB2IGR0byBwcm8gemF2b2zDoW7DrSB0aGlzLmxvYWQoZHRvKTsgTcWvxb5lIHZyYWNldCBwcm9taXNlLlxyXG5cdFx0XHRcdHJvd1RvRHRvOiAoZ3JpZFN0YXRlKSA9PiB7XHJcblx0XHRcdFx0XHR2YXIgZGF0YSA9IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGE7XHJcblx0XHRcdFx0XHR2YXIgbmV3X3ByaW1hcnlfa2V5X2xpc3QgPSB0aGlzLnNldFByaW1hcnlLZXlzKGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdHByaW1hcnlfa2V5X2xpc3Q6IG5ld19wcmltYXJ5X2tleV9saXN0XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly90ZW1wbGF0ZSBwcm8gdG9vbHRpcCBuYSDFoWlwY2UgbsOhc2xlZHVqw61jw61cclxuXHRcdFx0XHRuZXh0SXRlbVRlbXBsYXRlOiBcIk7DoXNsZWR1asOtY8OtIGRldGFpbFwiLFxyXG5cdFx0XHRcdC8vdGVtcGxhdGUgcHJvIHRvb2x0aXAgbmEgxaFpcGNlIHDFmWVkY2hvesOtXHJcblx0XHRcdFx0cHJldkl0ZW1UZW1wbGF0ZTogXCJQxZllZGNob3rDrSBkZXRhaWxcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0KHRoaXMgYXMgYW55KS5saXN0Q29udHJvbHNfdXBkYXRlQ2FwdGlvbnMoKTtcclxuXHJcblx0XHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIG5hc3Rhdml0IHN0YXR1c2JhclxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIHNldFN0YXR1c0JhcihHaW5MaXN0Q29udHJvbHNPYmplY3Q/OiBhbnkpIHtcclxuXHJcblx0XHRcdGNvbnN0IGJhcjogTWVudVBhcmFtc1tdID0gW107XHJcblx0XHRcdC8qKiBJxIxPICovXHJcblx0XHRcdHZhciBpY28gPSBcIjAwMDAwMDAwXCI7XHJcblx0XHRcdGlmICh0aGlzLmRhdGEuZGV0YWlsX3JlemltID09PSB0cnVlKSB7XHJcblx0XHRcdFx0YmFyLnB1c2goe1xyXG5cdFx0XHRcdFx0aWQ6IFwic3RhdHVzTm92eVwiLFxyXG5cdFx0XHRcdFx0Y2FwdGlvbjogXCJqcmVzOjMyMDAwMTcyXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMjAwMDE3MiA6ICBOT1bDnSBaw4FaTkFNXHJcblx0XHRcdFx0XHR0eXBlOiBcInN0YXRpY1wiLFxyXG5cdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwibm92eURldGFpbENsYXNzXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5kYXRhLmRldGFpbF9kYXRhLmFrdGl2aXRhID09PSAxMDApIHtcclxuXHRcdFx0XHRcdGJhci5wdXNoKHtcclxuXHRcdFx0XHRcdFx0aWQ6IFwic3RhdHVzQWt0aXZuaVwiLFxyXG5cdFx0XHRcdFx0XHRjYXB0aW9uOiBcImpyZXM6MzIwMDAxNzNcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzIwMDAxNzMgOiAgQUtUSVZOw40gWsOBWk5BTVxyXG5cdFx0XHRcdFx0XHR0eXBlOiBcInN0YXRpY1wiLFxyXG5cdFx0XHRcdFx0XHRjdXN0b21DbGFzczogXCJha3Rpdml0YURldGFpbENsYXNzXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YmFyLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRpZDogXCJzdGF0dXNJQ09cIixcclxuXHRcdFx0XHRcdFx0Y2FwdGlvbjogXCJJxIxPOiBcIiArIGljbyxcclxuXHRcdFx0XHRcdFx0dHlwZTogXCJzdGF0aWNcIixcclxuXHRcdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwiaWNvLWNsYXNzXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGJhci5wdXNoKHtcclxuXHRcdFx0XHRcdFx0aWQ6IFwic3RhdHVzTmVha3Rpdm5pXCIsXHJcblx0XHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDE3NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMjAwMDE3NCA6ICBORUFLVElWTsONIFrDgVpOQU1cclxuXHRcdFx0XHRcdFx0dHlwZTogXCJzdGF0aWNcIixcclxuXHRcdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwibmVha3Rpdml0YURldGFpbENsYXNzXCJcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoR2luTGlzdENvbnRyb2xzT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRiYXIucHVzaC5hcHBseShiYXIsIEdpbkxpc3RDb250cm9sc09iamVjdCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zdGF0dXNCYXIoYmFyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIHZ5dHZvxZlpdCBjb21tYW5kQmFyXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuXHJcblx0XHRcdGNvbnN0IGJhcjogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG5cdFx0XHRiYXIucHVzaCh7XHJcblx0XHRcdFx0aWQ6IFwiaWRCdXR0b25DbG9zZVwiLFxyXG5cdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDAxNFwiLFx0XHRcdC8vUkMgMzIwMDAwMTQgOiBaYXbFmcOtdFxyXG5cdFx0XHRcdGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJhY3RDbG9zZVwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuXHRcdFx0XHRcdHJ1bjogKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnRyeUNsb3NlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSkgYXMgTWVudVBhcmFtcztcclxuXHJcblx0XHRcdHRoaXMuY29tbWFuZEJhcihiYXIpO1xyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdHB1YmxpYyB4b25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG5cdFx0XHR0aGlzLm5ld09wcyh7XHJcblx0XHRcdFx0dGl0bGU6IFwianJlczoyMTMwMDA4NSBcIiArIHRoaXMuZGF0YS5kZXRhaWxfY2FwdGlvbiwgLy9SQyAyMTMwMDA4NSA6IERldGFpbFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuZGF0YS5kZXRhaWxfcmV6aW0gPSB0aGlzLmRldGFpbF9yZXppbTtcclxuXHRcdFx0dGhpcy5nZXRQcmltYXJ5S2V5cygpO1xyXG5cclxuXHRcdFx0Ly8jcmVnaW9uICoqIHByb2Now6F6ZW7DrSBkZXRhaWzFryAqKlxyXG5cclxuXHRcdFx0dmFyIEdpbkxpc3RDb250cm9sc09iamVjdCA9IChHaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMgYXMgYW55KS5HaW5MaXN0Q29udHJvbHMuY3JlYXRlKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoR2luTGlzdENvbnRyb2xzT2JqZWN0LmFjdGlvbnMpO1xyXG5cdFx0XHR0aGlzLnNldFN0YXR1c0JhcihHaW5MaXN0Q29udHJvbHNPYmplY3Quc3RhdHVzQmFyKTtcclxuXHRcdFx0JC5leHRlbmQodGhpcywgR2luTGlzdENvbnRyb2xzT2JqZWN0LmNvbnRlbnRFeHRlbnNpb25zKTtcclxuXHJcblx0XHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdFx0dGhpcy5jcmVhdGVNZW51KCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5kZXRhaWxfcmV6aW0gPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLnJlYWRvbmx5ID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZUZvcm0oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm5ld0RldGFpbCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0Ly8jcmVnaW9uICoqIMWhaXBreSBwcm9jaMOhemVuw60gZGV0YWlsdSAqKlxyXG5cclxuXHRcdFx0KHRoaXMgYXMgYW55KS5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG5cdFx0XHRcdC8vZnVua2NlLCBrdGVyw6EgxZnDoWRlayB6IGdyaWR1IHDFmWV0cmFuc2Zvcm11amUgdiBkdG8gcHJvIHphdm9sw6Fuw60gdGhpcy5sb2FkKGR0byk7IE3Fr8W+ZSB2cmFjZXQgcHJvbWlzZS5cclxuXHRcdFx0XHRyb3dUb0R0bzogKGdyaWRTdGF0ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhO1xyXG5cdFx0XHRcdFx0dmFyIG5ld19wcmltYXJ5X2tleV9saXN0ID0gdGhpcy5zZXRQcmltYXJ5S2V5cyhkYXRhKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRwcmltYXJ5X2tleV9saXN0OiBuZXdfcHJpbWFyeV9rZXlfbGlzdFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vdGVtcGxhdGUgcHJvIHRvb2x0aXAgbmEgxaFpcGNlIG7DoXNsZWR1asOtY8OtXHJcblx0XHRcdFx0bmV4dEl0ZW1UZW1wbGF0ZTogXCJOw6FzbGVkdWrDrWPDrSBkZXRhaWxcIixcclxuXHRcdFx0XHQvL3RlbXBsYXRlIHBybyB0b29sdGlwIG5hIMWhaXBjZSBwxZllZGNob3rDrVxyXG5cdFx0XHRcdHByZXZJdGVtVGVtcGxhdGU6IFwiUMWZZWRjaG96w60gZGV0YWlsXCJcclxuXHRcdFx0fSk7XHJcblx0XHRcdCh0aGlzIGFzIGFueSkubGlzdENvbnRyb2xzX3VwZGF0ZUNhcHRpb25zKCk7XHJcblxyXG5cdFx0XHQvLyNlbmRyZWdpb25cclxuXHJcblx0XHRcdC8vI3JlZ2lvbiAqKiBkb3VibGUgY2xpY2sgbmEgcMWZZWNob2QgZG8gZWRpdGFjZSBkZXRhaWx1ICoqXHJcblxyXG5cdFx0XHR0aGlzLmRvdWJsZUNsaWNrRGV0YWlsKCk7XHJcblxyXG5cdFx0XHQvLyNlbmRyZWdpb25cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBkb3VibGUgY2xpY2sgbmEgcMWZZWNob2QgZG8gZWRpdGFjZSBkZXRhaWx1XHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgZG91YmxlQ2xpY2tEZXRhaWwoKSB7XHJcblx0XHRcdHRoaXMuZm9ybS5maW5kRmllbGRzKCkuZGJsY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlYWRvbmx5KSAgICAgICAgICAvLyBwxZllY2hvZCB6IHJlxb5pbXUgxI10ZW7DrVxyXG5cdFx0XHRcdFx0dGhpcy5lZGl0RGV0YWlsKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogcMWZZXBudXTDrSBkbyBlZGl0YWNlIGRldGFpbHVcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBlZGl0RGV0YWlsKCkge1xyXG5cdFx0XHR0aGlzLnJlYWRvbmx5ID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuc2hvd0RldGFpbCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKiBmY2UgcHJvIHVrb27EjWVuw60gcmXFvmltdSB2eXR2b8WZZW7DrSBub3bDqWhvIGRldGFpbHUgKi9cclxuXHRcdHByaXZhdGUgZW5kRWRpdERldGFpbCgpIHtcclxuXHRcdFx0dGhpcy5yZWFkb25seSA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmXFvmltIMSNdGVuw61cclxuXHRcdFx0dGhpcy5zaG93RGV0YWlsKCk7XHJcblx0XHR9XHJcblx0XHQvKipcclxuXHRcdCogdnl0dm/FmWl0IG1lbnVcclxuXHRcdCovXHJcblx0XHRwcml2YXRlIGNyZWF0ZU1lbnUoKSB7XHJcblxyXG5cdFx0XHQvLyBNRU5VIFBSTyBKRUROT1RMSVbDiSBERVRBSUxZXHJcblx0XHRcdHZhciBtZW51QmFyQnVpbGRlciA9IChHb3JkaWMuQWRtLldlYkNsaWVudCBhcyBhbnkpLk1lbnVCYXJzW3RoaXMuZGF0YS5kZXRhaWxfbmFtZV07XHJcblxyXG5cdFx0XHRpZiAoIW1lbnVCYXJCdWlsZGVyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcImpyZXM6MzIwMDAxNjdcIiArIHRoaXMuZGF0YS5kZXRhaWxfbmFtZSk7ICAgICAgICAgLy9SQyAzMjAwMDE2NyA6IE5lcG9kcG9yb3ZhbsO9IG1lbnViYXJcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRtZW51QmFyQnVpbGRlci5jcmVhdGUodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIHZ5dHZvxZlpdCBmb3JtdWzDocWZXHJcblx0XHQqL1xyXG5cdFx0cHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuZm9ybSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5mb3JtLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTsgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBmb3JtdSBwcm8gamVkbm90bGl2w6kgZGV0YWlseVxyXG5cdFx0XHQvLyByb3pkxJtsZW7DrSBkbGUgdHlwxa8gZm9ybXVsw6HFmcWvXHJcblx0XHRcdHZhciBsRm9ybUJ1aWxkZXIgPSAoR29yZGljLkFkbS5XZWJDbGllbnQgYXMgYW55KS5Gb3Jtc1t0aGlzLmRhdGEuZGV0YWlsX25hbWVdO1xyXG5cdFx0XHRsRm9ybUJ1aWxkZXIuY3JlYXRlKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0XHQvKiogZmNlIHBybyB1bG/FvmVuw60gZGF0IGRldGFpbCBva25hIGRvIERCICovXHJcblx0XHRwcml2YXRlIHNhdmVEZXRhaWwoKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmJlZ2luT3BlcmF0aW9uKFwianJlczozMjAwMDE5M1wiKTsgLy9SQyAzMjAwMDE5MyA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrSBkZXRhaWx1LlxyXG5cdFx0XHR0aGlzLnNhdmluZyA9IHRydWU7XHJcblx0XHRcdChHb3JkaWMuQWRtLldlYkNsaWVudCBhcyBhbnkpLlNhdmVEZXRhaWwucHJlU2F2ZSh0aGlzKTtcclxuXHRcdH1cclxuXHJcblxyXG5cclxuXHRcdC8vIGZjZSBwcm8gdnl0dm/FmWVuw60gbWVudSwgc2lkZWJhcsWvIGEgdm9sw6EgZGV0YWlsLCBrdGVyw70gdnl0dm/FmcOtIG5vdsO9IGZvcm11bMOhxZlcclxuXHRcdHByaXZhdGUgbmV3RGV0YWlsKCkge1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkb25seSA9IGZhbHNlO1xyXG5cdFx0XHR2YXIgcHJpbWFyeV9saXN0ID0gdGhpcy5zZXRQcmltYXJ5S2V5cyh0aGlzLmRhdGEuZGV0YWlsX2RhdGEpO1xyXG5cdFx0XHQvLyBuYXN0YXbDrW1lIGRhdGEgbmEgcHLDoXpkbm9cclxuXHRcdFx0dGhpcy5kYXRhLmRldGFpbF9kYXRhID0gbnVsbDtcclxuXHRcdFx0dmFyIHNlcnZlciA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5BZG0uV2ViQ2xpZW50LkdBZG1BamF4Q29udGVudENvbnRyb2xcIik7XHJcblx0XHRcdHNlcnZlci5jYWxsKFwiTmV3RGV0YWlsXCIsIHsgZGV0YWlsX25hbWU6IHRoaXMuZGF0YS5kZXRhaWxfbmFtZSwgcHJpbWFyeV9rZXlfbGlzdDogcHJpbWFyeV9saXN0IH0pLmRvbmUoKHJEYXRhKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5kYXRhLmRldGFpbF9yZXppbSA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXbDrW0gcMWZw616bmFrIHJlxb5pbXUgTkVXXHJcblx0XHRcdFx0dGhpcy5kYXRhLmRldGFpbF9kYXRhID0gckRhdGEuZGV0YWlsX2RhdGE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZllbcOhem51IG5hIG5vdsOhIGRhdGFcclxuXHRcdFx0XHR0aGlzLmRhdGEuZGF0YV9yaWdodCA9IHJEYXRhLmRhdGFfcmlnaHQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdMOhaG51IG9iamVrdCBzIG9wcsOhdm7Em27DrW1cclxuXHRcdFx0XHR0aGlzLmRhdGEuZGV0YWlsX2ZpZWxkcyA9IHJEYXRhLmRldGFpbF9maWVsZHM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdGFobnUgc2kgZGF0YSBzIHBvcGlzZW0gcGFyYW1ldHLFryBwb2zDrcSNa2FcclxuXHRcdFx0XHR0aGlzLnNob3dEZXRhaWwoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRXBrLldlYkNvbnRyb2xzLk92ZXJpdFBvZHBpc3kudHNcdFx0XHRcdFx0XHQ8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGV0YWlsIC0gUG9tb2PDrSBkZXRhaWxidWlkZXJ1IFRTXHRcdFx0XHRcdFx0XHQ8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHRoYXptdWthXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMThcdFx0XHRcdFx0XHRcdDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTgtMDgtMTRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRtLldlYkNsaWVudCB7XHJcblxyXG5cdGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnM7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGFpbCAtIFBvbW9jw60gZGV0YWlsYnVpZGVydSBUU1xyXG5cdCAqXHJcblx0ICogQGF1dGhvciB0aGF6bXVrYVxyXG5cdCAqIEBzaW5jZSA0ODAuMS4wLjlcclxuXHQgKi9cclxuXHRAZ2NvbnRlbnRcclxuXHRleHBvcnQgY2xhc3MgRGV0YWlsQnVpbGRlciBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBpZGVudGlmaWvDoXRvclxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIEl4cDogc3RyaW5nO1xyXG5cclxuXHRcdHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcblx0XHRcdHRoaXMubmV3T3BzKHtcclxuXHRcdFx0XHR0aXRsZTogXCJqcmVzOjMyMDAwMTkwIFwiICsgdGhpcy5JeHAsIC8vUkMgMzIwMDAxOTAgOiBEZXRhaWwgQWRtaW5pc3RyYWNlXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcikge1xyXG5cclxuXHRcdFx0Ly8jcmVnaW9uIEtQSVxyXG5cclxuXHRcdFx0YnVpbGRlci5rcGlEZWZpbml0aW9ucy5wdXNoKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IFwia3BpT25lXCIsXHJcblx0XHRcdFx0XHRjaGFydFR5cGU6IFwibGlxdWlkXCIsXHJcblx0XHRcdFx0XHRkYXRhOiAwLFxyXG5cdFx0XHRcdFx0dmFsdWU6IDAsXHJcblx0XHRcdFx0XHR1bml0OiBcIiVcIixcclxuXHRcdFx0XHRcdHRpdGxlOiBcIktQSSAxXCIsXHJcblx0XHRcdFx0XHR0ZXh0OiBcIlRleHQgcHJvIHBydm7DrSBrcGkuXCIsXHJcblx0XHRcdFx0XHRtZWFuaW5nOiBcIm5ldXRyYWxcIixcclxuXHRcdFx0XHRcdHNob3dUZXh0SWNvbjogZmFsc2UsXHJcblx0XHRcdFx0XHR3aWR0aDogMjYwLFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiA2MCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGJ1aWxkZXIua3BpRGVmaW5pdGlvbnMucHVzaChcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcImtwaU9uZVwiLFxyXG5cdFx0XHRcdFx0Y2hhcnRUeXBlOiBcImxpcXVpZFwiLFxyXG5cdFx0XHRcdFx0ZGF0YTogNTAsXHJcblx0XHRcdFx0XHR2YWx1ZTogNTAsXHJcblx0XHRcdFx0XHR1bml0OiBcIiVcIixcclxuXHRcdFx0XHRcdHRpdGxlOiBcIktQSSAyXCIsXHJcblx0XHRcdFx0XHR0ZXh0OiBcIlRleHQgcHJvIGRydWjDvSBrcGkuXCIsXHJcblx0XHRcdFx0XHRtZWFuaW5nOiBcIm5ldXRyYWxcIixcclxuXHRcdFx0XHRcdHNob3dUZXh0SWNvbjogZmFsc2UsXHJcblx0XHRcdFx0XHR3aWR0aDogMjYwLFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiA2MCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGJ1aWxkZXIua3BpRGVmaW5pdGlvbnMucHVzaChcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcImtwaU9uZVwiLFxyXG5cdFx0XHRcdFx0Y2hhcnRUeXBlOiBcImxpcXVpZFwiLFxyXG5cdFx0XHRcdFx0ZGF0YTogMTAwLFxyXG5cdFx0XHRcdFx0dmFsdWU6IDEwMCxcclxuXHRcdFx0XHRcdHVuaXQ6IFwiJVwiLFxyXG5cdFx0XHRcdFx0dGl0bGU6IFwiS1BJIDNcIixcclxuXHRcdFx0XHRcdHRleHQ6IFwiVGV4dCBwcm8gdMWZZXTDrSBrcGkuXCIsXHJcblx0XHRcdFx0XHRtZWFuaW5nOiBcIm5ldXRyYWxcIixcclxuXHRcdFx0XHRcdHNob3dUZXh0SWNvbjogZmFsc2UsXHJcblx0XHRcdFx0XHR3aWR0aDogMjYwLFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiA2MCxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vI2VuZHJlZ2lvblxyXG5cclxuXHRcdFx0Ly8gWmFyZWdpc3Ryb3ZhdCB2bGFzdG7DrSBrb21wb25lbnR1IGRvIGJ1aWxkZXJ1LlxyXG5cdFx0XHRidWlsZGVyLndpdGhDb21wb25lbnQoXCJNeUNvbXBvbmVudFwiLCB7XHJcblxyXG5cdFx0XHRcdGFjdGlvbnM6IHtcclxuXHJcblx0XHRcdFx0XHQvLyNyZWdpb24gTWVudUJhclxyXG5cclxuXHRcdFx0XHRcdGFjdFZ5cmlkaXQ6IHtcclxuXHRcdFx0XHRcdFx0aWNvbjogXCJnaS10aWNrICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsXHJcblx0XHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDE4N1wiLCAvL1JDIDMyMDAwMTg3IDogVnnFmcOtZGl0XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRydW46IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdFx0XHRcdFx0Ly8jcmVnaW9uIENvbW1hbmRCYXJcclxuXHJcblx0XHRcdFx0XHRhY3RTYXZlOiB7XHJcblx0XHRcdFx0XHRcdGNhcHRpb246IFwianJlczozMjAwMDA2NVwiLCAvL1JDIDMyMDAwMDY1IDogVWxvxb5pdFxyXG5cdFx0XHRcdFx0XHRpY29uOiBcImdpLXNhdmVcIixcclxuXHRcdFx0XHRcdFx0cnVuOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YWN0Q2xvc2U6IHtcclxuXHRcdFx0XHRcdFx0Y2FwdGlvbjogXCJqcmVzOjMyMDAwMDE0XCIsIC8vUkMgMzIwMDAwMTQgOiBaYXbFmcOtdFxyXG5cdFx0XHRcdFx0XHRpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG5cdFx0XHRcdFx0XHRydW46ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnRyeUNsb3NlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8jZW5kcmVnaW9uXHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0bWVudUJhcjogW1wiYWN0VnlyaWRpdCpcIl0sXHJcblxyXG5cdFx0XHRcdGNvbW1hbmRCYXI6IFt7IGFjdGlvbjogXCJhY3RTYXZlXCIsIHByaW1hcnk6IHRydWV9LCBcImFjdENsb3NlXCJdLFxyXG5cclxuXHRcdFx0XHRzdWJ0YXNrczoge1xyXG5cdFx0XHRcdFx0Ly9wcmlsb2h5OiB7XHJcblx0XHRcdFx0XHQvL1x0Y2FwdGlvbjogXCJqcmVzOjMyMDAwMTg4XCIgLy9SQyAzMjAwMDE4OCA6IEVsLiBzb3Vib3J5XHJcblx0XHRcdFx0XHQvL30sXHJcblx0XHRcdFx0XHRzb3V2aXNEb2t1bWVudHk6IHtcclxuXHRcdFx0XHRcdFx0Y2FwdGlvbjogXCJqcmVzOjMyMDAwMTg5XCIsIC8vUkMgMzIwMDAxODkgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50eVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdHRhYnM6IHtcclxuXHJcblx0XHRcdFx0XHR0YWJTb3V2aXNEb2t1bWVudHk6IHtcclxuXHRcdFx0XHRcdFx0c3VidGFza0lkOiBcInNvdXZpc0Rva3VtZW50eVwiLFxyXG5cdFx0XHRcdFx0XHRpbml0OiAodGFiKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8jcmVnaW9uIGNvbnRlbnRFeHRlbnNpb25zXHJcblxyXG5cdFx0XHRcdGNvbnRlbnRFeHRlbnNpb25zOiB7IC8vc2VtIHBhdMWZw60gZnVua2NlIHZvbGFuw6kgeiBha2PDrSAuLi4gdGhpcyBqZSBzdGVqbsOpIHRoaXMgamFrbyB2IG9uQ29udGVudFJlYWR5XHJcblxyXG5cdFx0XHRcdFx0Ly8jcmVnaW9uIHVsb8W+aXQgZGV0YWlsXHJcblxyXG5cdFx0XHRcdFx0c2F2ZURldGFpbDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyNlbmRyZWdpb25cclxuXHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cdFx0XHR9LCB0cnVlKTsgLy8ga29tcG9uZW50YSBidWRlIHDFmWlkw6FuYSBwxZllZCB2xaFlY2hueSBvc3RhdG7DrS5cclxuXHJcblx0XHRcdCQuZXh0ZW5kKHRydWUsIGJ1aWxkZXIuc2lkZUJhck9wdGlvbnMsIHsgcmlnaHQ6IHsgdmlzaWJsZTogZmFsc2UsIHdpZHRoOiAxNTAgfSB9KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyKSB7XHJcblxyXG5cdFx0XHQvL2J1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcInByaWxvaHlcIiwgeyBiYWRnZTogKGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihcInN0YXR1c1dmbFByaWxvaHlcIiwgR0RiZC5EZWZpbml0aW9uS2luZC5TdGF0dXNCYXIpWzBdLml0ZW0gYXMgTWVudVBhcmFtcykuYmFkZ2UgfSwgR0RiZC5EZWZpbml0aW9uS2luZC5TdWJUYXNrKVxyXG5cclxuXHRcdFx0Ly8gbmFzdGF2ZW7DrSBwaWRiYXJ1XHJcblx0XHRcdGJ1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcImZvcm1IZWFkZXJGaWVsZFBpZFwiLCB7XHJcblx0XHRcdFx0b3B0aW9uczoge1xyXG5cdFx0XHRcdFx0cGlkVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdGljb25zVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdGtleXdvcmRzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIG15SGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiIH0pXHJcblxyXG5cdFx0XHQuYWRkU2VjdGlvbigpXHJcblx0XHRcdC5hZGRSb3coXCJqcmVzOjMyMDAwMDIzXCIpXHRcdC8vUkMgMzIwMDAwMjMgOiBOw6F6ZXZcclxuXHRcdFx0LmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcblx0XHRcdFx0bmFtZTogJ25hemV2J1xyXG5cdFx0XHR9KVxyXG5cclxuICAgICAgICAgICAgaWYgKG15SGVhZGVyRm9ybSAhPT0gdW5kZWZpbmVkICYmIG15SGVhZGVyRm9ybS5mb3JtICE9PSB1bmRlZmluZWQgJiYgbXlIZWFkZXJGb3JtLmZvcm0uc2VjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRvdmF0IG9ic2FoIGhsYXZpxI1rb3bDqWhvIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLnVwZGF0ZURlZmluaXRpb24oXCJmb3JtSGVhZGVyU2VjdGlvbk9uZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogbXlIZWFkZXJGb3JtLmZvcm0uc2VjdGlvbnNbMF0ucm93c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG59Il19