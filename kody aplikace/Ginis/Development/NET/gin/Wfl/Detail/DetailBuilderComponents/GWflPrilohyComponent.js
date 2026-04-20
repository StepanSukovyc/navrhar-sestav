(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflPrilohy: {
            create: function (inputDto, componentDto, opts) {

               
                var defaultOpts = {
                    sidepanelTitle: "jres:31926004", //RC 31926004 : Náhled
                    useMainAttachment: true,
                    attachmentPreviewOpts: {},
                    kpiAttachmentUploaderOpts: {},
                    readMainAttachment : function (cnt, ixp) {
                        return Gordic.Wfl.AttachmentUtils.GetFavorite(cnt, ixp);
                    },
                    refreshAttachments: function (cnt) {
                        // update všeho - pokud je načten grid příloh, vyvoláme jeho refresh
                        var grid = (cnt || this).element.find('.gattachmentgrid');
                        if (grid.length > 0) {
                            grid.gattachmentgrid('refresh', true);
                            return true;
                        }
                        return false;
                    },
                    getContentParams: function (inputDto, componentDto) {
                        return {
                            className: componentDto.attachmentMainContent,
                            serverParams: componentDto.attachmentMainContentDto || {
                                ID: "detail_prilohy#",
                                Ixp: inputDto.ixp,
                                NazevUDA: componentDto.NazevUDA,
                                PopisUda: componentDto.PopisUda,
                                PovoleniAkci: componentDto.PovoleniAkci
                            }
                        }
                    },
                    initTab: function (tab) {
                    }
                }


                opts = $.extend(true, defaultOpts, opts || {});

                var result = {
                    activeOpEvents: ["mainattachmentchange","attachmentsactivecountchange"],
                    contentExtensions: {},
                    actions: [], menuBar: [], statusBar: [], sidePanels: [], tabs: [], onBuild: [], onInit: []
                };

                //get master content hack
                var masterCnt;
                result.onInit.push(function (builder) {
                    masterCnt = builder.content
                })

                result.actions.push({
                    name: "actWflPrilohyOpen",
                    run: function () {
                        var cnt = $.content(this);
                        if (cnt && cnt.element) {
                            var tabmanager = cnt.element.find('.' + Gordic.Gin.DetailBuilder.classes.tabmanager);
                            tabmanager.gtabmanager('setActive', Gordic.Prefabs.TabGroups.Prilohy().id);

                            var tab = cnt.element.find("[data-param-id=tabAttachments]");
                            tab.gtab("open");

                            setTimeout(function () {
                                if (tab.length > 0)
                                    tab.get(0).scrollIntoView();
                            }, 200);
                        }
                    }
                });

                var mainAttachmentTooltipPrefab = "jres:26227657"; //RC 26227657 : Hlavní příloha (el. obraz)/počet záznamů o přílohách: {0}/{1}
                var tooltipPrefab = "jres:26227658";  //RC 26227658 : počet záznamů o přílohách: {0}
                var createBadge = function (mainAttachmentCount, attachmentsCount, ixbElp) {
                    var badgeValue = "";

                    if(ixbElp == null) {
                        // ne ve všech případech ho události pošlou (je zbytečné ho extra selectovat, když už je na komponentě znám)
                        ixbElp = componentDto.ixb_elp;
                    }

                    if(componentDto.UsePlusFormatInCounts) {
                        //pro atestace používáme formát mainAttachmentCount + attachmentsCount + originalCount
 
                        if(ixbElp != null && ixbElp != "") {
                            badgeValue = mainAttachmentCount.toString() + "+" + attachmentsCount.toString() + "+1"; // navíc +1 pro originál doručené zprávy
                            mainAttachmentTooltipPrefab = "jres:26228071"; //RC 26228071 : Hlavní příloha (el. obraz) + počet záznamů o přílohách + originál doručené zprávy: {0}+{1}+1
                        } else {
                            badgeValue = attachmentsCount > 0 || mainAttachmentCount > 0 ? opts.useMainAttachment ? mainAttachmentCount.toString() + "+" + attachmentsCount.toString() : (attachmentsCount + mainAttachmentCount).toString() : "";
                            mainAttachmentTooltipPrefab = "jres:26228070"; //RC 26228070 : Hlavní příloha (el. obraz) + počet záznamů o přílohách: {0}+{1}
                        }
                    } else {
                        badgeValue = attachmentsCount > 0 || mainAttachmentCount > 0 ? opts.useMainAttachment ? mainAttachmentCount.toString() + "/" + attachmentsCount.toString() : (attachmentsCount + mainAttachmentCount).toString() : "";
                    }

                    return {
                        id: "statusWflPrilohyBadge",
                        value: badgeValue,
                        tooltip: opts.useMainAttachment ? mainAttachmentTooltipPrefab.format(mainAttachmentCount, attachmentsCount) : tooltipPrefab.format(attachmentsCount + mainAttachmentCount),
                        customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                    };
                };

                var attachmentsCount = componentDto.attachmentsCount;

                var mainAttachmentCount = 0;
                if (attachmentsCount > 0 && componentDto.mainAttachmentInfo != null) {
                    mainAttachmentCount = 1;
                    attachmentsCount = attachmentsCount - 1;
                }
                
                var attachmentsBadge = new GObservableObject(createBadge(mainAttachmentCount, attachmentsCount, componentDto.ixb_elp));
                result.statusBar.push({
                    id: "statusWflPrilohy",
                    action: "actWflPrilohyOpen",
                    align: GMenu.menuRootAlignTypes.opposite,
                    captionVisible: GAction.captionVisibility.never,
                    badge: attachmentsBadge,
                    icon: "gi-attachment"
                });

                var dto = $.extend({ ixp: inputDto.ixp, aiVisualiserOptions: {} }, opts.attachmentPreviewOpts);

                if (dto.dao == null && componentDto.attachmentPreviewContent != null) {
                    dto.serviceContent = componentDto.attachmentPreviewContent;
                }

                if (componentDto.ixb_elp != null) {
                    dto.ixb_elp = componentDto.ixb_elp;
                }

                if (componentDto.emptyMessage != null) {
                    dto.emptyMessage = componentDto.emptyMessage;
                }

                if (componentDto.attachmentPreviewAsyncTask != null) {
                    dto.previewLoadOptions = dto.previewLoadOptions || {};
                    dto.previewLoadOptions.gcontent = componentDto.attachmentPreviewAsyncTask;
                }

                var attachmentGrid = null;

                var panelAttachmetsOpened = false;
                var refreshOnOpen = false;
                var innerPanelAttachments = null;
                var panelEvents = null;
                var changeEventName = "panelattachmentschange";
                var previewChangeEventName = "previewchangefile";


                if (componentDto.NahledEleVisible) {
                    innerPanelAttachments = $("<div class='gattachment__panel'>");
                    result.sidePanels.push({
                            id: "panelAttachments",
                            side: "right",
                            leaf: { caption: opts.sidepanelTitle, badge: attachmentsBadge, icon: "gi-nahled" }, //RC 31926004 : Náhled
                            caption: opts.sidepanelTitle,
                            userSetting: this.userSetting,
                            customDiv: innerPanelAttachments,
                            open: function (ev, ctx) {
                                var attachmentsCnt; // pokud jde o obecné přílohy, koukáme na getSelection na contentu ... chtělo by to vyřešit nějak sofistikovaněji

                                if (innerPanelAttachments && !innerPanelAttachments.hasClass('gattachment')) {
                                    dto.aiVisualiserOptions.relatedElement = dto.aiVisualiserOptions.relatedElement || masterCnt && masterCnt.element;//(attachmentsCnt = attachmentsCnt || $.content(attachmentGrid)) && attachmentsCnt && attachmentsCnt.parentContent && attachmentsCnt.parentContent.element
                                    $(innerPanelAttachments).gattachment(dto);
                                }

                                if (refreshOnOpen && innerPanelAttachments) {
                                    innerPanelAttachments.gattachment("refresh");
                                    refreshOnOpen = false;
                                }

                                if (attachmentGrid != null) {
                                    var grid = attachmentGrid.find(".gattachmentgrid")
                                    var selection = grid.length > 0 ? grid.gattachmentgrid("getSelection") : (attachmentsCnt = attachmentsCnt || $.content(attachmentGrid)) && attachmentsCnt.getSelection ? attachmentsCnt.getSelection() : [];
                                    if (selection && selection.length > 0 && innerPanelAttachments) {
                                        innerPanelAttachments.gattachment("setActive", selection[0] && selection[0]._isMeta == true ? selection[0].data : selection[0]);
                                    }
                                }

                                panelAttachmetsOpened = true;
                            },
                            close: function (ev, ctx) {
                                panelAttachmetsOpened = false;
                            }
                    });

                    panelEvents = new GEvents();
                    panelEvents.on(changeEventName, Utils.debounced(function (ctx) {
                        if (panelAttachmetsOpened && innerPanelAttachments && innerPanelAttachments.hasClass('gattachment')) {
                            innerPanelAttachments.gattachment("refresh");
                        } else {
                            refreshOnOpen = true;
                        }
                    },100)); 

                    panelEvents.on(previewChangeEventName, Utils.debounced(function (ctx) {
                        let prilohaRow = ctx.row;
                        if (prilohaRow && panelAttachmetsOpened && innerPanelAttachments && innerPanelAttachments.hasClass('gattachment')) {
                            innerPanelAttachments.gattachment("setActive", prilohaRow);
                        }
                    },100));

                }

                if (opts.useMainAttachment) {
                    var emptyKpiClass = 'gattachment__kpi gattachment__kpi--noeldoc ' + (componentDto.LzeVlozitElObraz ? '' : 'gattachment__kpi--disabled');

                    var kpiObject = new GObservableObject({
                        name: 'kpiPrilohy',
                        action: new GAction({ // action || 'actWflPrilohyOpen'
                            name: 'actAttachmentKpiOpen',
                            run: function (ev, ctx) {
                                var cnt = $.content(ev.target);
                                if (cnt && kpiObject.attachment) {
                                    const perms = Gordic.Wfl.WebClient.Attachment.GAttachmentPermissionsEnum;
                                    const openElEnabled = (kpiObject.attachment.Permissions & perms.OpenElDokumenty) === perms.OpenElDokumenty;

                                    if(openElEnabled) {
                                        Gordic.Wfl.AttachmentUtils.OpenAttachment(cnt, kpiObject.attachment, true, false, void 0, {
                                            filePreviewOptions: componentDto.attachmentPreviewAsyncTask != null ? { gcontent: componentDto.attachmentPreviewAsyncTask, } : void 0,
                                            downloaderType: componentDto.attachmentDownloader,
                                            uploaderType: componentDto.attachmentUploader
                                        })
                                            .done(function (args) {
                                                // console.log("OpenAttachment Completed", this, args);

                                                if(args && args.rv == "uploaded") {
                                                    cnt.reloadDetail(undefined, undefined);
                                                }
                                            })
                                            .fail(function (errObj) {
                                                if(errObj != null) {
                                                    console.error(errObj);
                                                    GDlg.alert(errObj);
                                                }
                                            });
                                    } else {
                                        cnt.dialogs.alert("jres:26227913"); //RC 26227913 : Nemáte oprávnění otevřít hlavní přílohu.
                                    }
                                   
                                } else {
                                    if (cnt && cnt._kpiAttachmentUploader) {
                                        cnt._kpiAttachmentUploader.uploadMainAttachment();
                                    }
                                }
                            }
                        }),
                    });

                    result.kpis = [kpiObject];


                    var createFilledKpi = function (attachment, action) {
                        var file = attachment.File;
                        var statusLockIconDefinition = Gordic.Wfl.AttachmentUtils.GetStatusLockIconDefinition(attachment);
                        var mainIcon = Gordic.Utils.File.getFileTypeIconClass(file.Name.replace(/[\r|\r\n|\n]+/g, '<br>') || '');
                        var icon = mainIcon;

                        if(statusLockIconDefinition) {
                            icon = [mainIcon, statusLockIconDefinition.icon + " gi-stack-fw gi-stack-pos--rb gi-bgw"];
                        }

                        return {
                            attachment: attachment,
                            primaryText: '{0} ({1})'.format(Gordic.Utils.shortenToVisibleChars(file.Name.replace(new RegExp('/[\r|\r\n|\n]+/g', 'g'), '<br>')), Gordic.Utils.File.getFileSize(file.Size)),
                            secondaryText: 'jres:31750061: {0}'.format(file.VersionCount) +
                                (file.IsVerified ? ' | jres:26226548' : '') +
                                (file.IsArchived ? ' | jres:31750059' : ''), //RC 31750059 : K archivaci
                            icon: icon,
                            tooltip: function () {
                                var tooltipRet = [
                                    'jres:26227437: <b>' + file.Name.replace(/[\r|\r\n|\n]+/g, '<br>') + '</b>', //RC 26227437 : Hlavní příloha
                                    'jres:26225953: ' + attachment.Name.replace(/[\r|\r\n|\n]+/g, '<br>') || '-', //RC 26225953 : Titulek
                                    'jres:26225604: ' + attachment.Description.replace(/[\r|\r\n|\n]+/g, '<br>') || '-', //RC 26225604 : Popis
                                    'jres:31750061: {0}'.format(file.VersionCount), //RC 31750061 : Verzí
                                    'jres:26227260: {0}'.format(Gordic.Utils.File.getFileSize(file.Size)), //RC 26227260 : Velikost
                                    ' ',
                                    'jres:31750060: ' + Gordic.Templates.Formatters.datetime(file.LastChangeDate), //RC 31750060 : Vložil
                                    file.LastChangeUser,
                                    ' ',
                                    file.IsVerified ? 'jres:26226548' : '',
                                    file.IsArchived ? 'jres:31750059' : '',
                                    statusLockIconDefinition != null ? statusLockIconDefinition.tooltip : '',
                                ].filter(Boolean).join('<br>');
                                return { tooltip: tooltipRet };
                            },
                            customClass: 'gattachment__kpi',
                            itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate
                            //   itemTemplate: Gordic.Prefabs.Panels.kpiIconOneRowTextTemplate().itemTemplate
                        };
                    };

                    var createEmptyKpi = function () {
                        return {
                            customClass: emptyKpiClass,
                            attachment: null,
                            primaryText: 'jres:31750053', //RC 31750053 : Bez hl. přílohy
                            tooltip: componentDto.LzeVlozitElObraz ? '<b>jres:31750062</b> <br> jres:31750058' : '',//RC 31750062 : Bez hlavní elektronické přílohy
                            //RC 31750058 : Kliknutím nebo přetažením souboru vložíte novou hlavní elektronickou přílohu.
                            icon: 'gi-paper_elobraz',
                            itemTemplate: componentDto.mainAttachmentKpiMode === 1 ? Gordic.Prefabs.Panels.kpiSingleIconTemplate().itemTemplate : Gordic.Prefabs.Panels.kpiIconOneRowTextTemplate().itemTemplate
                        }
                    }


                    if (componentDto.mainAttachmentInfo) {
                        $.extend(kpiObject, createFilledKpi(componentDto.mainAttachmentInfo));
                    } else {
                        $.extend(kpiObject, createEmptyKpi());
                        kpiObject.action.enabled(!!componentDto.LzeVlozitElObraz);
                    }
                }
                result.tabs.push({
                    id: "tabAttachments",
                    tabParams: {
                        title: "jres:26228027", //RC 26228027 : Přílohy (komponenty)
                        group: $.extend(Gordic.Prefabs.TabGroups.Prilohy(), { badge: attachmentsBadge }),
                        open: function () {
                            attachmentGrid = $(this);
                        }
                    },
                    contentParams: opts.getContentParams(inputDto,componentDto)
                    , hasFastInit:true,
                    init: function (tab) {
                        $(tab).on("attachmentscountchange", function (ev, ctx) {
                            componentDto.attachmentsCount = ctx.attachmentsCount;
                            componentDto.mainAttachmentCount = ctx.mainAttachmentCount;
                            if(attachmentsBadge) {
                                attachmentsBadge.update(createBadge(ctx.mainAttachmentCount, ctx.attachmentsCount));
                            }

                            if (!ctx.firstTimeLoad) {
                                tab.trigger("attachmentsactivecountchange", ctx);

                                if (panelEvents) {
                                    panelEvents.trigger(changeEventName, [ctx]);
                                }
                            }

                            if (opts.useMainAttachment) {
                                if (ctx.mainAttachment && kpiObject) {
                                    tab.find('.gattachment__kpi--noeldoc').removeClass(emptyKpiClass);
                                    kpiObject.update(createFilledKpi(ctx.mainAttachment))
                                    kpiObject.action.enabled(true);
                                } else if (kpiObject) {
                                    kpiObject.update(createEmptyKpi());
                                    kpiObject.action.enabled(!!componentDto.LzeVlozitElObraz);
                                }
                            }
                        }).on("setpreviewactivefile", function (ev, ctx) {
                            if (panelEvents) {
                                panelEvents.trigger(previewChangeEventName, [ctx]);
                            }
                        }).on("attachmentsselection", function (ev, ctx) {
                            if (panelEvents) {
                                panelEvents.trigger(previewChangeEventName, [{ row: ctx.activeRow ? ctx.activeRow.data : ctx.selection && ctx.selection[0] && ctx.selection[0].data}]);
                            }
                        });

                        opts.initTab(tab);
                        attachmentGrid = $(tab);
                    }
                });

                if (opts.useMainAttachment) {
                    result.onBuild.push(function () {
                        var cnt = this;
                        var attachmentUploader = this._kpiAttachmentUploader = new Gordic.Wfl.GAttachmentUploader(inputDto.ixp, $.extend(true,{
                            parentContent: this,
                            uploadOptions: {
                                stUtajIdFilter: undefined,
                                wflPristupyPri: componentDto.WflPristupyPri,
                                prizRezimUtaj: componentDto.PrizRezimUtaj,
                                pouzitPristup: componentDto.PouzitPristup,
                                defaultStUtajId: componentDto.StUtajId
                            },//přístup - stačí říct použít/nepoužít - zbytek si zjistí attachment uploader sám,
                            mode: 'mainAttachment',
                            done: function (params) {
                                var ctx = { stopRefresh: false };
                                cnt.element.trigger("mainattachmentchange", ctx);
                                if (!ctx.stopRefresh) {
                                    // update badge
                                    if (kpiObject.customClass === emptyKpiClass && attachmentsBadge) {
                                        attachmentsBadge.update(createBadge(1, componentDto.attachmentsCount));
                                    }
                                    cnt.beginOperation();
                                    opts.readMainAttachment(cnt, inputDto.ixp).then(function (data) {
                                        // update kpi - než to načte grid tak to trvá
                                        cnt.find('.gattachment__kpi--noeldoc').removeClass(emptyKpiClass);
                                        kpiObject.update($.extend({ customClass: '' }, createFilledKpi(data, cnt.actions.actWflPrilohyOpen)));

                                        if (!opts.refreshAttachments(cnt)) { //panel events je potřeba zavolat, když se nezavolá grid refresh - jinak to jde přes něj

                                            cnt.element.trigger("attachmentsactivecountchange", { mainAttachment: data, attachmentsCount: componentDto.attachmentsCount, mainAttachmentCount: 1 });
                                            if (innerPanelAttachments && innerPanelAttachments.hasClass('gattachment') && panelEvents) {
                                                panelEvents.trigger(changeEventName);
                                            }
                                        }
                                    }).always(function () { cnt.endOperation(); });
                                }
                            }, 
                        }, opts.kpiAttachmentUploaderOpts));
                        attachmentUploader.addDropZone(this.element.find('.gkpipanel [data-item="kpiPrilohy"]'));
                        attachmentUploader.enable(!!componentDto.LzeVlozitElObraz);

                        var offNamespace = '.wfleldockpi_close';
                        this.element.off(offNamespace).on('contentclose' + offNamespace, function (ev) {
                            if (ev.target === cnt.element[0]) {
                                attachmentUploader.destroy();
                                // úklid globálních proměnných, aby se nedržely reference
                                panelEvents = null;
                                innerPanelAttachments = null;
                                attachmentGrid = null;
                                cnt.element.off(offNamespace);
                            }
                        });
                    });
                }

                result.contentExtensions.refreshAttachments = function () {
                    if (!opts.refreshAttachments(this) && attachmentsBadge) {
                        if (opts.getCount) {
                            var countPromise = opts.getCount(componentDto.ixp);
                            if (countPromise) countPromise.then(function (d) {
                                if (attachmentsBadge) {
                                    attachmentsBadge.update(createBadge(d.mainAttachmentCount, d.attachmentCount));
                                }
                            });
                        }

                        if (innerPanelAttachments && innerPanelAttachments.hasClass('gattachment') && panelEvents) {
                            panelEvents.trigger(changeEventName);
                        }
                    }
                    return true;
                };

                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
