(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslSidePanels: {

            create: function (detailContent, componentDto) {
                /// <summary> Creates a definition of button and openAction for wflHistorie.</summary>
                /// <remarks> Vmaca, 02.03.2017. </remarks>
                /// <param name="data"> The data with following properties. 
                ///                     TargetContent[string] - namespace of target AjaxContent/AjaxContentControl. 
                ///                     TargetContentDto[object] - dto with data required by TargetContent, 
                ///                     Title[string] - name of button and dialogWindow. </param>
                /// <returns> Object with actionDefinitions and statusBarDefinitions ready for insert into content. </returns>
                //var badge = new GObservableObject({ value: "?" });
                var result = {};
                    
                result.onBuild = [function () {

                    this.vytvorKPIEpkHistorieSchvalovani();
                }];

                //#region parovy Dokument
                if (componentDto.IsParovyDokument) {
                    
                    var settingsforPanel = {};
                    if (componentDto.VyrizDok !== componentDto.ixp) {
                        settingsforPanel.paroveIxp = componentDto.VyrizDok;
                        settingsforPanel.tittle = "jres:31937101" //RC 31937101 : Párový dokument vyřizující
                    } else {
                        settingsforPanel.paroveIxp = componentDto.InicDok;
                        settingsforPanel.tittle = "jres:31937102" //RC 31937102 : Párový dokument iniciační
                    }
                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelParovyDokument = {
                            side: "right",
                            leaf: { caption: "jres:31937052" }, //, badge: badge //RC 31937052 : Párový dokument
                            caption: settingsforPanel.tittle,
                            customClass: "gssl-parovy-dokument",
                            minWidth: 300,
                            icon: "gi-copy_plus",
                            width: 400,
                            open: function () {
                                if (!detailContent.parovyDokumentPreviewDiv) { 
                                    detailContent.parovyDokumentPreviewDiv = $(this);

                                    var actNovyDetail = new GAction({
                                        name: "actOpenDetailFromParovyDokument", caption: "jres:26255831", run: function () { //RC 26255831 : Detail
                                            detailContent.otevriNovyDetail(
                                                {
                                                    DetailDto: { ixp: settingsforPanel.paroveIxp }
                                                }
                                            );
                                        },
                                    });

                                    detailContent.parovyDokumentPreviewDiv.gsbpanel("menuBar", [
                                        { icon: "gi-detail", action: actNovyDetail }
                                    ])

                                    detailContent.parovyDokumentPreviewDiv.gpreview(
                                        {
                                            tabs: [
                                                {
                                                    caption: "jres:31937103", //RC 31937103 : Souhrn
                                                    customLoad: function (loadParams) {
                                                        if (Gordic.Previews != null && Gordic.Previews.render != null)

                                                            Gordic.Previews.render("wfl:Dokument", this.customDiv, { ixp: settingsforPanel.paroveIxp }); 
                                                    }//"Gordic.Wfl.WebClient.GWflDetailPreview"

                                                }, {

                                                    caption: "jres:31937104", //RC 31937104 : Náhled
                                                    customLoad: function () { //subtask was clicked
                                                        if (this.customDiv.hasClass("gfilepreview")) {
                                                            this.customDiv.gwflfilepreview("displayElDoc", settingsforPanel.paroveIxp);
                                                        }
                                                    },

                                                    content: {
                                                        onPrepareContent: function () {
                                                            if (!this.element.hasClass("gfilepreview")) {
                                                                this.element.gwflfilepreview();
                                                            }
                                                        }
                                                    }
                                                }]
                                        });

                                    detailContent.sslParovyDokLoadPreview(settingsforPanel.paroveIxp);
                                }
                            }
                    };
                }
                //#endregion

                //#region Spis
                
                if (!componentDto.IsSpis && componentDto.IxpSpis && (componentDto.IxpSpis != componentDto.ixp)) { // pokud jde o dokument ve spisu

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelSpis = {
                        side: "right",
                        icon: "gi-folder",
                        leaf: { caption: "jres:26255257" }, //, badge: badge //RC 26255257 : Spis
                        caption: "jres:26255257", //RC 26255257 : Spis
                        customClass: "gssl-spis",
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            if (detailContent.spisPreviewDiv == null || !detailContent.spisPreviewDiv.hasClass("gcontent")) {
                                detailContent.spisPreviewDiv = $(this);

                                var actNovyDetail = new GAction({
                                    name: "actOpenDetailFromSpisPreview", caption: "jres:26255831", run: function () { //RC 26255831 : Detail
                                        detailContent.otevriNovyDetail(
                                            {
                                                DetailDto: { ixp: componentDto.IxpSpis }
                                            }
                                        );
                                    },
                                });


                              

                                detailContent.spisPreviewDiv.gsbpanel("menuBar", [
                                    { icon: "gi-detail", action: actNovyDetail }
                                ]);

                                var tabsDoGpreview = [];
                                tabsDoGpreview.push({
                                    caption: "jres:31937103", //RC 31937103 : Souhrn
                                    customLoad: function (loadParams) {
                                        if (Gordic.Previews != null && Gordic.Previews.render != null)
                                            Gordic.Previews.render("ssl:DetailDokumentu", this.customDiv, { detailContent: detailContent, ixp: componentDto.IxpSpis });
                                    }//"Gordic.Wfl.WebClient.GWflDetailPreview"

                                });

                                //if (true) {
                                   // UserProcess.Configuration.GetDatabaseParameter("ssl_zodetelo", 0) == 1;
                                    tabsDoGpreview.push({

                                        caption: "jres:31937104", //RC 31937104 : Náhled
                                        customLoad: function () { //subtask was clicked
                                            if (this.customDiv.hasClass("gfilepreview")) {
                                                this.customDiv.gwflfilepreview("displayElDoc", componentDto.IxpSpis);
                                            }
                                        }

                                        ,

                                        content: {
                                            onPrepareContent: function () {
                                                if (!this.element.hasClass("gfilepreview")) {
                                                    this.element.gwflfilepreview();
                                                }
                                            }
                                        }
                                    });
                              // }



                                detailContent.spisPreviewDiv.gpreview(
                                    {
                                        tabs: tabsDoGpreview
                                    });

                                detailContent.sslSpisPreviewLoadPreview(componentDto.IxpSpis);
                            }
                        }
                    };
                   
                } else //if (detailContent.spisPreviewDiv && componentDto.IxpSpis === componentDto.ixp)  // v momentě kdy tam zustal vyset panel po reloadu
                {
                    if (!detailContent.closed) { 
                        var panelSeSpisem = detailContent.element.gsidebar("getPanel", "panelSpis");
                        if (panelSeSpisem && panelSeSpisem.element && panelSeSpisem.length > 0) {
                            detailContent.element.gsidebar("removePanel", "panelSpis"); 
                        }
                    }
                    
                }

                //#region EPK kpi
                //if (componentDto.KPIEpkHistorieSchvalovaniVisible) {  //componentDto.SerCislo && componentDto.SerCislo >0
                    /*
                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelEpk = {
                        side: "right",
                        leaf: { caption: "jres:26256378" }, //, badge: badge //RC 26256378 : Schvalovací proces
                        caption: "jres:26256378", //RC 26256378 : Schvalovací proces
                        customClass: "gssl-epk",
                        minWidth: 300,
                        width: 400,
                        icon: "gi-epk",
                        open: function () {
                            var this_ = $(this);
                            if (this_.hasClass("gcontent") === false) {
                                this_.gcontent("Gordic.Wfl.WebClient.GHistorieSchvalovani");
                            }

                            this_.gcontent("load", {
                                ID: "IDEpkHistorieSchvalovani",
                                taskId: "EpkHistorieSchvalovaniDetail",
                                Ixp: componentDto.ixp,
                            });

                        }
                    };
                    */
                    result.kpis = result.kpis ? result.kpis : [];
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiIsEpkPanel",
                            icon: "gi-epk g-state-text g-state-warning", // gi-epk gi-info
                            //meaning: "warning",
                            visible: false,
                            primaryText: "jres:26256378", //RC 26256378 : Schvalovací proces
                            //secondaryText: "jres:31937151", //RC 31937151 : Ve schvalovacím procesu
                            action: new GAction({
                                name: "actKpiIsEpkPanel", caption: "", run: function () { //RC 29250138 : Vybrat
                                    var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                                    if (panelSEPK && panelSEPK.length > 0) {
                                        panelSEPK.gsbpanel("show");
                                    }
                                }
                            })
                           
                        })
                    );

                //} else //if (detailContent.spisPreviewDiv && componentDto.IxpSpis === componentDto.ixp)  // v momentě kdy tam zustal vyset panel po reloadu
                //{
                if (!detailContent.closed) {
                    var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                    if (panelSEPK && panelSEPK.element && panelSEPK.length > 0) {
                        panelSEPK.element.gsidebar("removePanel", "panelEpk");
                    }
                }
                //}
               
                //#region Text Podani
                if (componentDto.ISTextPodani) {

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelTextPodani = {
                        side: "right",
                        leaf: {
                            caption: "jres:31937249", //RC 31937249 : El. podání
                        },
                        id: "panelTextElPodani",
                        icon:"gi-podatelna",
                        customClass: "gssl-text-podani",
                        open: function () {
                            if (componentDto.IxbPodani != null) {

                                if (detailContent.parovyDokumentPreviewDiv == null) {

                                    detailContent.parovyDokumentPreviewDiv = $(this);
                                    detailContent.parovyDokumentPreviewDiv.html("jres:31937250"); //RC 31937250 : Probíhá načítání dat...
                                    Gordic.Isl.EmlBodyService.read({
                                        IxBEml: componentDto.IxbPodani
                                    }).getData()
                                        .then(function (retDto) {
                                            if (retDto && retDto.ErrorMessage != null && retDto.ErrorMessage !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.ErrorMessage);
                                            }
                                            else if (retDto && retDto.BodyText != null && retDto.BodyText !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.BodyText);
                                            }
                                            else if (retDto && retDto.BodyHtml != null && retDto.BodyHtml !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.BodyHtml);
                                            }

                                        });
                                }
                                else if ($(this).html() === "") { // po refreshi tam zustane div vyset
                                    $(this).html(detailContent.parovyDokumentPreviewDiv.html());
                                }
                            }
                        }
                    };
                }
                //#endregion

                //#region NadrizeneEntity
                var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
                if (k203Params && k203Params.gin_n23_vedd === 1) {

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.strukturaNadrazenychEntity = {
                        side: "right",
                        icon: "gi-papiry",
                        leaf: { caption: "Nadřazené" }, //, badge: badge //RC 26255257 : Spis
                        caption: "Nadřazené", //RC 26255257 : Spis
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            var this_ = $(this);
                            if (!this_.hasClass("StrukturaNadrazenychEntityDlg")) {
                                var cnt = $.content(this_);
                                var opt = {
                                    Ixp: componentDto.ixp
                                };

                                // Možnost 1
                                var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.StrukturaNadrazenychEntityDlg", { serverParams: opt, parentContent: cnt }]), this)
                                panelContent.load();

                                this_.addClass("StrukturaNadrazenychEntityDlg");
                            }
                        }
                    };

                    result.sidePanels.SouhrnDetail = {
                        side: "right",
                        icon: "gi-info_bold",
                        leaf: { caption: "jres:31937558" },  //RC 31937558 : Souhrn
                        caption: "jres:31937557", //RC 31937557 : Souhrn
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            var this_ = $(this);
                            if (!this_.hasClass("GPanelSouhrnDlg")) {
                                var cnt = $.content(this_);
                                var opt = {
                                    Ixp: componentDto.ixp,
                                    AktZnacka: componentDto.AktZnacka
                                };

                                // Možnost 1
                                var panelContent = new GContent(GContent.createInitializer([Gordic.Wfl.WebClient.GPanelSouhrnDlg, { inputOpt: opt, parentContent: cnt }]), this)
                                //panelContent.load();

                                this_.addClass("GPanelSouhrnDlg");
                            }
                        }
                    };

                }


                //#endregion 




                //#endregion
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    vytvorKPIEpkHistorieSchvalovani: function () {

                        var that = this;
                        Gordic.Isl.ElectronicSignatureBookRequest.existEpkRequestLabel({ Ixp: componentDto.ixp }).get()
                            .then(function (output) {

                                if (output == null || output.data == null)
                                    return;

                                var res = output.data;

                                //res.ApprovalProcess     res.SingleRequest
                                if (res && ((res.ApprovalProcess != null && res.ApprovalProcess !== "") || (res.SingleRequest != null && res.SingleRequest !== ""))) { 
                                    

                                    //ApprovalProcess: "Ve schvalovacím procesu"  SingleRequest: "Jednotlivá žádost v EPK" 
                                    if (that.kpis.kpiIsEpkPanel) {

                                        if ((res.ApprovalProcess != null && res.ApprovalProcess !== "") && (res.SingleRequest != null && res.SingleRequest !== "")) {
                                            that.kpis.kpiIsEpkPanel.primaryText = res.ApprovalProcess + "<br>" + res.SingleRequest ;
                                            //that.kpis.kpiIsEpkPanel.secondaryText = res.SingleRequest;
                                        } else {
                                            that.kpis.kpiIsEpkPanel.primaryText = res.ApprovalProcess ? res.ApprovalProcess : "" + res.SingleRequest ? res.SingleRequest : "";
                                        }

                                        //that.kpis.kpiIsEpkPanel.icon = entitaIcon;
                                        //that.kpis.kpiIsEpkPanel.primaryText = "Test";
                                        //that.kpis.kpiIsEpkPanel.secondaryText = txt;
                                        that.kpis.kpiIsEpkPanel.visible = true;
                                        that.kpis.kpiIsEpkPanel.update();
                                    }
                                   

                                }

                                if (res != null && res.State === 0) {
                                    return;
                                }

                                if (!that.closed) {

                                    var badge = undefined;

                                    if (res != null && res.State === 1) {   // ActiveProcess
                                        badge = { value: "*", tooltip: "jres:32000137", state: "success" }; //RC 32000137 : Existuje aktivní proces
                                    }
                                    else if (res != null && res.State === 2) {   // HistoricalProcess
                                        badge = { value: "*", tooltip: "jres:32000138", state: "info" }; //RC 32000138 : Pouze historické procesy
                                    }

                                    that.element.gsidebar("addPanel", "right", {
                                        side: "right",
                                        name: "panelEpk",
                                        id: "panelEpk",
                                        leaf: { caption: "jres:26256378", badge: badge }, //, badge: badge //RC 26256378 : Schvalovací proces
                                        caption: "jres:26256378", //RC 26256378 : Schvalovací proces
                                        customClass: "gssl-epk",
                                        minWidth: 300,
                                        width: 400,
                                        icon: "gi-epk",
                                        open: function () {
                                            var this_ = $(this);
                                            // původní řešení než className začal být problém
                                            /*
                                            if (this_.hasClass("gcontent") === false) {
                                                this_.gcontent("Gordic.Wfl.WebClient.GHistorieSchvalovani");
                                            }

                                            // hotfix for 490
                                            $.content(this_).className = "Gordic.Wfl.WebClient.GHistorieSchvalovani";

                                            this_.gcontent("load", {
                                                ID: "IDEpkHistorieSchvalovani",
                                                taskId: "EpkHistorieSchvalovaniDetail",
                                                Ixp: componentDto.ixp,
                                                //SerCislo: componentDto.SerCislo           // thazmuka (12.04.2020) - vzhledem k tomu, že chci načíst všechny probíhající procesy, tak serCislo nepotřebuji
                                                //IxsSpd: this.row.ixs_spd
                                            });
                                            */
                                            if (!this_.hasClass("GHistorieSchvalovaniLoaded")) {
                                                var cnt = $.content(this_);
                                                var opt = {
                                                    Ixp: componentDto.ixp
                                                };

                                                // Možnost 1
                                                var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.GHistorieSchvalovani", { serverParams: opt, parentContent: cnt }]), this)
                                                panelContent.load();

                                                this_.addClass("GHistorieSchvalovaniLoaded");
                                            }



                                        }
                                    });
                                }

                            })



                    },



                    //parovy dok
                    sslParovyDokLoadPreview: function (ixp) {
                        if (detailContent.parovyDokumentPreviewDiv)
                        detailContent.parovyDokumentPreviewDiv.gpreview("loadAll", { ixp: ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
                    },
                    sslParovyDokEnablePreview: function (enabled) {
                        if (detailContent.parovyDokumentPreviewDiv)
                        detailContent.parovyDokumentPreviewDiv.gpreview("option", { disabled: !enabled });
                    },
                    // spis
                    sslSpisPreviewLoadPreview: function (ixp) {
                        if (detailContent.spisPreviewDiv)
                            detailContent.spisPreviewDiv.gpreview("loadAll", { ixp: ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
                    },
                    sslSpisPreviewEnablePreview: function (enabled) {
                        if (detailContent.spisPreviewDiv)
                            detailContent.spisPreviewDiv.gpreview("option", { disabled: !enabled });
                    },

                };
                
                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);