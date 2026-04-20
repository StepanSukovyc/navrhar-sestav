(function () {
    "use strict";

    var WIDTHMAGIC = 718;
    var PageWidth = WIDTHMAGIC;

    /*
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *		 the user visible viewport of a web browser.
     *		 only accounts for vertical position, not horizontal.
     */
    $.fn.visible = function (partial) {
        var $t = $(this);
        if ($t.is(":hidden")) return false;
        var $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
        return compareBottom <= viewBottom && compareTop >= viewTop;
    };

    namespace("Gordic.Gfrm.Prefabs", {
        ico: function () {
            return {
                widget: "gstringbox", options: Gordic.Gin.Prefabs.GIcoAresField({
                    changeAction: function (e, i, d) { let n = $(this).gfield("option", "name"); let d2 = {}; d2[n] = d; $.content(this).applyData(d2); }
                    , buttonAction: function (e, c, d) { let n = $(c.field).gfield("option", "name"); let d2 = {}; d2[n] = d; $.content(c.field).applyData(d2); }
                })
            };
        },
        file: function (content, i_w, i_h, o) {
            var _content = content; // this;
            return {
                widget: "gfilefield", options: {
                    itemDownloadable: true,
                    keepInitialGuid: true,
                    itemWidth: "", triggerOnceMultiChanged: true, fieldDownloaderClass: _content._srv.className,
                    //itemTemplate: "<div class='fa {fileTypeIco:default(fa-file-o)} minifoto'></div>",
                    itemTemplate: function (row) {
                        let f = "minifoto";
                        let br = "<br>";
                        if (i_h < 48) { f = "microfoto"; br = ""; }
                        let ft = !row.guid ? "fa-spinner fa-spin" : (row.fileTypeIcon ? row.fileTypeIcon : "fa-file-o");
                        if (i_w < 200) return "<div class='fa {3} {4}'></div>".format(row.filename, row.fileSize, br, ft, f);
                        return "<div class='fa {3} {4}'></div><b>{0}</b>{2}<i>({1})</i>".format(row.filename, row.fileSize, br, ft, f);
                    },
                    fileError: function (ev, obj) {
                        if (obj.action === "upload") {
                            if (obj.validationType === "maxFilesSize" || obj.validationType === "oneFileMaxSize") {
                                _content.dialogs.warning(o.maxFileSize_msg || obj.reason);
                            }
                            else if (obj.validationType === "maxFileCount") {
                                _content.dialogs.warning(o.maxFileCount_msg || obj.reason);
                            }
                            else if (obj.validationType === "fileExtension") {
                                _content.dialogs.warning(o.fileExtension_msg || obj.reason);
                            }
                            else
                                _content.dialogs.warning(obj.reason);
                        }
                    }
                }
            };
        },
    });

    //Ovl. prvek zobrazujici GFRM formulář
    namespace("Gordic.Report.WebClient.GReportFormControl", {
        onClose: function () {
            Gordic.ResizeManager.unobserve(this.element.get(0), "gfrmresize");
            this.scrollparent?.off(this.scrollid); 
            this._srv.fire("Free", { Form: this._options.Form });
        },
        prepareContent: function (options) {
            var _content = this;
            var $div = $("<div>").appendTo(_content.element);
            _content.gfrm = $div;
            $div.addClass("gfrm")
                .on({
                    "focusin": function (e) { $(e.target).closest(".gfield").addClass("gfrm-field-focus"); },
                    "focusout": function (e) { $(e.target).closest(".gfield").removeClass("gfrm-field-focus"); }
                }, ".gfield")
                ;
            console.log("Gordic.Report.WebClient.GReportFormControl.prepareContent", this, options);

            //this.newOps({ title: "jres:214" + " " + options.Form }); //RC 214 : Formulář
            //this.setBreadcrumbs([{ caption: "jres:214" + " " + options.Form, defaultAction: true }]); //RC 214 : Formulář
            this.title = "jres:214" + " " + options.Form; //RC 214 : Formulář
            this.actions.addRange({
                //refreshAct: {
                //    caption: "Refresh",
                //    run: function (ev, ctx) {
                //        this.setPending(_content.refresh()
                //            .then(function (saved) {
                //                console.log("Refresh OK");
                //            })
                //        );
                //    }
                //},
                saveAct: {
                    caption: "jres:141", //RC 141 : Uložit
                    run: function (ev, ctx) {
                        this.setPending(_content.save()
                            .then(function (saved) {
                                console.log("Save OK");
                            })
                        );
                    }
                },
                savePdfAct: {
                    caption: "jres:217", //RC 217 : Uložit PDF
                    run: function (ev, ctx) {
                        this.setPending(_content.savepdf());
                    }
                },
                saveSignedPdfAct: {
                    caption: "jres:221", //RC 221 : Uložit PDF s podpisem
                    enabled: false,
                    run: function (ev, ctx) {
                        this.setPending(_content.savesignedpdf());
                    }
                },
                saveXmlAct: {
                    caption: "jres:216", //RC 216 : Uložit XML
                    checked: false,
                    run: function (ev, ctx) {
                        this.setPending(_content.savexml());
                    }
                },
                checkAct: {
                    caption: "jres:215", //RC 215 : Kontrola
                    checked: false,
                    run: function (ev, ctx) {
                        this.setPending(_content.checkvalid()
                            .then(function (v) {
                                //console.log("Check done",v);
                            })
                        );
                    }
                },
                viewAct: {
                    caption: "jres:222", //RC 222 : Zobrazit jako
                    checked: false,
                    run: function (ev, ctx) { _content._changeView(); },
                    visible: false
                },
            });

            this.menuBar([
                //{ action: this.actions.refreshAct, favorite: true },
                { action: this.actions.saveAct, favorite: true },
                { action: this.actions.checkAct, favorite: true },
                { action: this.actions.savePdfAct, favorite: true },
                { action: this.actions.saveSignedPdfAct, favorite: true },
                { action: this.actions.saveXmlAct, favorite: false },
                { action: this.actions.viewAct, favorite: true },
            ]);

            //sluzba pro pristup k datum ze serveru
            _content._srv = this.createServiceContent(options.server || "Gordic.Report.WebClient.GReportFormControl");
            _content._options = options;

            $div.gtooltip({
                mode: "attribute",
                items: "[title]",
                tooltipAttr: "title",
                //track: true,
                beforeTooltip: function (ev, context) {
                    var emsg = $(ev.target).data("error-msg");
                    if (emsg) {
                        context.state = "error";
                        context.tooltip += "<label class='gform-error-report'><i class='fa fa-times-circle g-state-background g-state-error gform-error-icon'></i>" + emsg + "</label>";
                    }
                    return context;
                }
            });

            _content.viewmode = 0;
            var p = _content._firstLoad();

            _content.scrollid = ".gfrmscroll" + _content.id;
            _content.scrollparent = _content.gfrm.scrollParent();
            _content.scrollparent.on("scroll" + _content.scrollid, function (ev) {
                if (this === ev.target)
                    _content.element.find(".js-gfrm-wait").each(function (i, e) {
                        var $e = $(e);
                        if ($e.visible(true)) {
                            var $page = $e.parent();
                            var p = parseInt($page.attr('data-page-num'));
                            $e.toggleClass('js-gfrm-wait');
                            console.log("scroll load " + p);
                            _content._delayload(p, $e, $page, "scroll render");
                        }
                    });
            });

            //resizeManager
            var fitVobs = {
                id: "gfrmresize",
                isActive: function (contentRect, prevContentRect, lastActiveContentRect) {
                    return lastActiveContentRect == null || contentRect.height !== lastActiveContentRect.height;
                },
                execute: function (contentRect, prevContentRect, lastActiveContentRect) { 
                    _content._scanzoom();
                },
                wait: 100
            };
            Gordic.ResizeManager.observe(_content.element.get(0), fitVobs);

            GBrowserExtras.isSupportedPromise("sign")
                .done(function (sup) {
                    _content.actions.saveSignedPdfAct.enabled(sup);
                });

            return p;
        },
        openNew: function (newForm) {
            var _content = this;
            _content.gfrm.empty();
            if (_content.wv) { _content.wv.remove(); _content.wv = undefined; _content.actions.viewAct.update({ visible: false }); }
            _content._options.Form = newForm;
            return _content._firstLoad();
        },
        openRenamed: function (oldForm,newForm) {
            var _content = this;
            _content.gfrm.empty();
            if (_content.wv) { _content.wv.remove(); _content.wv = undefined; _content.actions.viewAct.update({ visible: false }); }
            _content._options.Form = newForm;
            return _content._firstLoad("?rename="+oldForm);
        },
        _firstLoad: function (exec) {
            var _content = this;
            this.beginOperation("jres:213"); //RC 213 : Načítám formulář
            return _content._srv.call("RenderPage", { Form: _content._options.Form, Page: 1, Width: WIDTHMAGIC * (window.devicePixelRatio || 1), MapWidth: WIDTHMAGIC, Exec: exec||"?refresh" })
                //.fail(console.log)
                .then(function (render) {
                    console.log("first render", render);
                    //_content.newOps({ title: render.WinName });
                    _content.title = render.WinName;
                    //_content.setBreadcrumbs([{ caption: render.WinName, defaultAction: true }]);

                    _content.gfrm.addClass('gfrm-back');
                    if (render.WebView) {
                        _content.wv = $("<div class='gfrm-wv'>").prependTo(_content.element);
                        _content._setView();
                        _content.webview(render);
                    }
                    else _content._setView();
                    PageWidth = render.Width / (window.devicePixelRatio || 1);
                    var style = "";
                    if (render.Margins) style += "padding-left:" + render.Margins.left + "px;padding-right:" + render.Margins.right + "px;padding-top:" + render.Margins.top + "px;padding-bottom:" + render.Margins.bottom + "px;";
                    if (render.Media === "screen")
                        var medium = "<div class='gfrm-screen' style='" + style + "'>";
                    else if (render.Media === "window")
                        var medium = "<div class='gfrm-window' style='" + style + "'>";
                    else
                        var medium = "<div class='gfrm-paper' style='" + style + "'>";
                    var contentId = _content._srv.element.attr("id");
                    var $page1 = $("<div class='gfrm-page' data-page-num='1'>")
                        .append($("<img class='gfrm-img' width='" + PageWidth + "' height='" + Math.round(PageWidth * render.Height / render.Width) + "' render-width='" + render.Width + "' render-height='" + render.Height + "' src='data:image/png;base64," + render.Image + "' usemap='#" + contentId + "-gfrm-map-1'/>")
                            .on('dragstart', function (event) { event.preventDefault(); })
                        )
                        .append($(render.Map).on("click", _content._execute1))
                        .appendTo($(medium).appendTo(_content.gfrm))
                        ;
                    _content._inputs(render, $page1, 1);
                    for (var i = 2; i <= render.Count; i++) {
                        var $p = $("<div class='gfrm-page' tabindex='0' data-page-num='" + i + "'>")
                            .append($("<div class='js-gfrm-wait' style='height:" + Math.round(PageWidth * render.Height / render.Width) + "px;width:" + PageWidth + "px'>").gcover({ text: "jres:230".format(i) })) //RC 230 : Strana {0}
                            .appendTo($(medium).appendTo(_content.gfrm))
                            ;
                    }
                    _content.loaded = true;
                    _content.element.triggerHandler("scroll");
                    return render;
                })
                .always(function () { _content.endOperation(); });
        },
        _changeView: function () {
            var _content = this;
            _content.viewmode = (_content.viewmode + 1) % 2;
            _content._setView();
        },
        _setView: function() {
            var _content = this;
            if (_content.viewmode == 0 && _content.wv) {
                _content.actions.viewAct.update({ visible: true, caption: "jres:223" }); //RC 223 : Zobrazit jako Tiskopis
                _content.wv.removeClass("hidden");

                _content.gfrm.findFields().gfield("confirm").gfield("model", "collect", this.data);
                var l_data = this.data;
                //console.log(l_data);
                _content.findFields() //gfrm i wv samotne
                    .gfield("model", "apply", l_data, { initialValues: false }) //startne fieldchange s timerem na reload
                    ;

                _content.gfrm.addClass("hidden");
                return;
            }
            _content.actions.viewAct.update({ caption: "jres:225" }); //RC 225 : Zobrazit jako WebForm
            if (_content.wv) {
                _content.wv.addClass("hidden");

                _content.wv.findFields().gfield("confirm").gfield("model", "collect", this.data);
                var l_data = this.data;
                //console.log(l_data);
                _content.findFields() //gfrm i wv samotne
                    .gfield("model", "apply", l_data, { initialValues: false }) //startne fieldchange s timerem na reload
                    ;
                _content.refresh(); //refresh po prepnuti z WV: nektere akce nevyvolaji zmenu policka (=reload)
            }
            _content.gfrm.removeClass("hidden");
            _content.gfrm.findFields(".js-gfrm-valign").each(function (i, e) { _content._verticalAlign0(e); });
        },
        save: function () {
            //console.log("save");
            var _content = this;
            var c = _content.chto;
            if (c) clearTimeout(_content.chto);
            return _content._srv.call("Save", { Form: _content._options.Form, Data: _content.collect() })
                .then(function (saved) {
                    //console.log("save done", saved);
                    _content._setData(saved);
                    var trigrObj = {
                        data: [saved],
                        reloadovatPoUlozeni: true
                    };
                    _content.element.trigger("greportformcontrolsaved", trigrObj); //NOTE (martinekb): DSebesta se na tuto udalost chyta, pry si sem muzeme psat jak chceme :-)
                    if (trigrObj && trigrObj.reloadovatPoUlozeni === false) {
                        return; //dsebesta 26.1.2022 pokud v trigru nastavím aby se neroudovalo, tak return
                    }
                    if (c) _content.reload();
                });
        },
        savepdf: function (withoutDownload) {
            var dfd = $.Deferred();
            var _content = this;
            var c = _content.chto;
            if (c) clearTimeout(_content.chto);
            return this._srv.call("SavePdf", { Form: _content._options.Form, Data: _content.collect() })
                .then(function (r) {
                    _content._setData(r);
                    if (withoutDownload === true)
                        return r;
                    return new GFile().download(r.fileInfo).then(function (x) {
                        if (r != null && r.fileInfo != null && r.fileInfo.guid) {
                            var file = new GFile();
                            file.removeFile(r.fileInfo.guid);
                        }
                        return x;
                    });
                })
                .then(function (r) {
                    console.log("PDF OK");
                    if (c) _content.reload();
                    return r;
                })
                .always(function (r) {
                    dfd.resolve(r);
                })
            return dfd.promise();
        },
        savesignedpdf: function (withoutDownload) {
            var _content = this;
            var c = _content.chto;
            if (c) clearTimeout(_content.chto);

            return new Signer(function (signDto, userDto) {
                return _content._srv.call("SaveSignedPdf", { Form: _content._options.Form, Data: _content.collect(), signDto: signDto })
                    .then(function (r) {
                        _content._setData(r);
                        return r.sign;
                    });
            })
            .sign({ signTime: new Date() })
            .then(function (r) {
                return _content._srv.call("CompleteSign", { signedConfig: r });
            })
            .then(function (r) {
                if (withoutDownload === true)
                    return r;
                return new GFile().download(r.fileInfo).then(function (x) {
                    if (r != null && r.fileInfo != null && r.fileInfo.guid) {
                        var file = new GFile();
                        file.removeFile(r.fileInfo.guid);
                    }
                    return x;
                });
            })
            .then(function (r) {
                console.log("SignedPDF OK");
                if (c) _content.reload();
            });
        },
        savexml: function () {
            var _content = this;
            var c = _content.chto;
            if (c) clearTimeout(_content.chto);
            return this._srv.call("SaveXml", { Form: _content._options.Form, Data: _content.collect() })
                .then(function (r) {
                    _content._setData(r);
                    return new GFile().download(r.fileInfo);
                })
                .then(function (r) {
                    console.log("XML OK");
                    if (c) _content.reload();
                });
        },
        checkvalid: function() {
            var _content = this;
            var c = _content.chto;
            if (c) clearTimeout(_content.chto);

            //Klientska validace pred srv. callem
            if (_content.gfrm.findFields().gfield("validate").filter(".gfield-error:visible").length)
                return $.Deferred().reject().promise();

            return _content._srv.call("Check", { Form: _content._options.Form, Data: _content.collect() })
                .then(function (v) {
                    //console.log("Check done", v);
                    _content._setData(v);
                    _content.findFields('.gfield-error:visible').first().gfield('focus');
                    if (c) _content.reload();
                    if (v.Message) {
                        _content.dialogs.messageBox("jres:215", v.Message, [GDlg.mbbOk], GDlg.mbiWarning) //RC 215 : Kontrola
                            .on("close", function () { _content.findFields('.gfield-error:visible').first().gfield('focus'); });
                        return $.Deferred().reject().promise();
                    }
                });
        },
        _scanzoom: function () {
            var _content = this;
            $(".gfrm-img").each(function (i, e) {
                var $e = $(e);
                _content._zoom($e, $e.attr("render-width"));
            });
            $(".js-gfrm-wait").each(function (i, e) {
                var $e = $(e);
                if ($e.visible(true)) {
                    var $page = $e.parent();
                    var p = parseInt($page.attr('data-page-num'));
                    $e.toggleClass('js-gfrm-wait');
                    console.log("zoom load " + p);
                    _content._delayload(p, $e, $page, "zoom render");
                }
            });

        },
        _zoom: function ($e, rw) {
            var _content = this;
            var w = PageWidth * (window.devicePixelRatio || 1);
            var ratio = w / rw;
            if (ratio < 0.5 || ratio > 1.11) {
                var $page = $e.parent();
                var p = parseInt($page.attr('data-page-num'));
                if ($e.visible(true)) {
                    console.log("resize load " + p);
                    _content._delayload(p, $e, $page, "resize render");
                }
                else {
                    $e.removeClass('gfrm-img');
                    $e.addClass('js-gfrm-wait');
                    console.log("resize wait " + p);
                }
                return false;
            }
            return true;
        },
        reload: function (rp) {
            var _content = this;
            if (_content.chto) clearTimeout(_content.chto);
            var l = $(".js-gfrm-load").length == 0;
            var ret = $.Deferred().resolve().promise();
            _content.element.find(".gfrm-img,.js-gfrm-load").each(function (i, e) {
                var $e = $(e);
                var $page = $e.parent();
                var p = parseInt($page.attr('data-page-num'));
                if ($e.visible(true)) {
                    if (l && (!rp || rp == p)) {
                        console.log("reload " + p);
                        ret = _content._delayload(p, $e, $page, "reload render");
                        l = false;
                    }
                    else {
                        console.log("reload " + p, "queued");
                        $e.addClass('js-gfrm-reload');
                    }
                }
                else {
                    $e.removeClass('gfrm-img');
                    $e.addClass('js-gfrm-wait');
                    console.log("reload wait " + p);
                }
            });
            return ret;
        },
        refresh: function () {
            var _content = this;
            if (_content.chto) clearTimeout(_content.chto);
            var l = true;
            var ret = null;
            _content.element.find(".gfrm-img,.js-gfrm-load").each(function (i, e) {
                var $e = $(e);
                var $page = $e.parent();
                var p = parseInt($page.attr('data-page-num'));
                if ($e.visible(true)) {
                    if (l) {
                        console.log("refresh " + p);
                        ret=_content._delayload(p, $e, $page, "refresh render", "?refresh");
                        l = false;
                    }
                    else {
                        console.log("refresh " + p, "queued");
                        $e.addClass('js-gfrm-reload');
                    }
                }
                else {
                    $e.removeClass('gfrm-img');
                    $e.addClass('js-gfrm-wait');
                    console.log("refresh wait " + p);
                }
            });
            return ret;
        },
        _delayload: function (p, $e, $page, txt, cmd) {
            var _content = this;
            $e.removeClass('gfrm-img js-gfrm-reload');
            $e.addClass('js-gfrm-load');
            _content.beginOperation({id: "_delayload"});
            return _content._srv.call("RenderPage", { Form: _content._options.Form, Page: p, Width: WIDTHMAGIC * (window.devicePixelRatio || 1), MapWidth: WIDTHMAGIC, Data: _content.collect(), Exec: cmd })
                .fail(console.log)
                .then(function (render) {
                    console.log(txt + " " + p, render);
                    if ($e.is(".js-gfrm-reload"))
                        return _content._delayload(p, $e.removeClass('js-gfrm-reload'), $page, "rereload render self");
                    if (_content._zoom($e, render.Width)) {
                        var $old = $page.children("img,map,.js-gfrm-load");
                        var contentId = _content._srv.element.attr("id");
                        var $n = $("<img class='gfrm-img' width='" + PageWidth + "' height='" + Math.round(PageWidth * render.Height / render.Width) + "' render-width='" + render.Width + "' render-height='" + render.Height + "' src= 'data:image/png;base64," + render.Image + "' usemap='#" + contentId + "-gfrm-map-" + p + "'/>")
                            .on('dragstart', function (event) { event.preventDefault(); })
                            .appendTo($page)
                            ;
                        $old.addClass("gfrm-abs");
                        $(render.Map).on("click", _content._execute1).appendTo($page);
                        try {
                            _content._inputs(render, $page, p);
                            if ($page.is(document.activeElement)) {
                                $page.find(":tabbable:first").focus();
                            }
                            $page.attr("tabindex", null);
                        }
                        finally {
                            $old.remove();
                        }
                    }
                    else {
                        console.log(txt + " failed " + p, render);
                    }
                    var $rr = _content.find(".js-gfrm-reload").eq(0);
                    if ($rr.length) {
                        var $pager = $rr.parent();
                        var pp = parseInt($pager.attr('data-page-num'));
                        return _content._delayload(pp, $rr, $pager, "rereload render");
                    }
                    return render;
                })
                .fail(function (render) {
                    $e.removeClass('js-gfrm-load js-gfrm-reload').addClass('gfrm-img');
                })
                .always(function () { _content.endOperation("_delayload"); })
                ;        
        },
        _execute1: function (e) {
            e.preventDefault();
            var $t = $(e.target);
            var cmd = $t.attr("href");
            if (cmd == '#' || cmd == "javascript:;") return false;
            var $page = $t.parents(".gfrm-page");
            var rp = parseInt($page.attr('data-page-num'));
            //console.log("execute", rp);
            var _content = $.content($t);
            if (_content.chto) clearTimeout(_content.chto);
            _content.chto = setTimeout(function () {
                //console.log("execute timeout", rp);
                _content.chto = null;
                _content._execute(rp, cmd);
            }, 100);
            return false;
        },
        _execute: function (rp, cmd) {
            var _content = this;
            this.element.find(".gfrm-img,.js-gfrm-load").each(function (i, e) {
                var $e = $(e);
                var $page = $e.parent();
                var p = parseInt($page.attr('data-page-num'));
                if ($e.visible(true)) {
                    if (rp == p) {
                        console.log("execute " + p, cmd);
                        _content._delayload(p, $e, $page, "execute render", cmd);
                    }
                    else {
                        console.log("execute " + p, "queued");
                        $e.addClass('js-gfrm-reload');
                    }
                }
                else {
                    $e.removeClass('gfrm-img');
                    $e.addClass('js-gfrm-wait');
                    console.log("execute wait " + p);
                }
            });

        },
        _inputs: function (render, $page, p) {
            var _content = this;
            var $olds = $page.children(".gfrm-field");
            var $news = $();
            var ratio = PageWidth / render.Width;
            render.Edits.forEach(function (e) {
                var json_e = JSON.stringify(e);
                var $ff = $olds.filter(function () { return $(this).data("gfrm-e") === json_e; });
                if ($ff.length > 0) {
                    $olds = $olds.not($ff);
                }
                else {
                    var i_w = Math.round(e.W * ratio);
                    var i_h = Math.round(e.H * ratio);
                    var i = $("<div class='gfrm-field' style='left:" + (Math.round(e.X * ratio)-1) + "px;top:" + (Math.round(e.Y * ratio)-1) + "px;width:" + (i_w+1) + "px;height:" + (i_h+1) + "px" + (e.Style ? e.Style : "") + "'>")
                        .data("gfrm-e", json_e)
                        .data("gfrm-d", e.Data)
                        ;
                    var o = { name: e.Name, model: e.Model, tooltip: e.Tooltip };
                    switch (e.Type) {
                        case "check": i.gcheck({
                            name: e.Name,
                            model:
                            function (operation, dto, modelOptions) {
                                var $i = $(this).find("input");
                                switch (operation) {
                                    case "apply": $i.prop("checked", dto[e.Model] == e.List[0].k); return;
                                    case "collect": dto[e.Model] = $i.prop("checked") ? e.List[0].k : e.List[1].k; return;
                                    default: return e.Model;
                                }
                            }
                            });
                            i.find(".gcheck-check").toggleClass("gcheck-check gfrm-check js-gfrm-fontw");
                            break;
                        case "radio":
                        case "radio1": i.gradio({
                                groupName: e.Name,
                                model:
                                function (operation, dto, modelOptions) {
                                    var $i = $(this).find("input");
                                    switch (operation) {
                                        case "apply": $i.prop("checked", dto[e.Model] == $i.prop("value")); return;
                                        case "collect": if ($i.prop("checked")) dto[e.Model] = $i.prop("value"); return;
                                        default: return e.Model;
                                    }
                                }
                                , radios: [{ value: e.List[0].k }]
                            });
                            if (e.Type === "radio1") i.find(".gradio-radio").toggleClass("gradio-radio gfrm-radio1 js-gfrm-fontw");
                            else i.find(".gradio-radio").toggleClass("gradio-radio gfrm-radio js-gfrm-fontw");
                            break;
                        case "d": i.gdatebox(o, {
                            valueType: "datetime", placeholder: " ", maxValue:"9999", modelValueTransform: {
                                apply: function (modelValue) { if (typeof modelValue === "string" && modelValue.startsWith("#d/")) return modelValue.substring(3); return modelValue; },
                                collect: function (fieldValue) {
                                    if (window.moment) { let m = moment(fieldValue); return m.isValid() ? "#d/" + m.format() : null; }
                                    let m = Gordic.Utils.DateTime.parse(fieldValue); return Gordic.Utils.DateTime.isValid(m) ? "#d/" + Gordic.Templates.Formatters.datetime(m, 'isozone') : null;
                                }
                            }
                        }, e.Opts); if (i_w < 102) i.addClass("gdate-small"); break;
                        case "dd": i.gdatebox(o, { valueType: "date", placeholder: " " }, e.Opts); if (i_w < 102) i.addClass("gdate-small"); break;
                        case "n": i.gnumberbox(o, { defaultValue: null, returnType: "decimal", decimals: 15, fixed: false }, e.Opts); break;
                        case "l":
                            i.gselectbox(o, {
                                data: new Gordic.Data.View(e.List, { key: "k" }),
                                //cs strict: true,
                                invalidTransform: function (x) { return { k: x, v: x }; },
                                graphicInput: "exclusive", //"hidden",
                                //cs helperLimit: 50,
                                helperColumns: ["v"],
                                //cs dropdown: e.List.length<=50,
                                itemTemplate: "{v}",
                                //cs itemClass: "gfrm--wrap",
                                //cs helperItemClass: "gfrm--wrap"
                            }, e.Opts);
                            break;
                        //case "l1":
                        //    i.gselectbox(o, {
                        //        data: new Gordic.Data.View(e.List, { key: "k" }),
                        //        strict: false,
                        //        invalidTransform: function (x) { return { k: x, v: x }; },
                        //        helperLimit: 60,
                        //        helperColumns: ["v"],
                        //        dropdown: e.List.length <= 60,
                        //        itemTemplate: "{v}",
                        //        itemClass: "gfrm--wrap",
                        //        helperItemClass: "gfrm--wrap"
                        //    }, e.Opts);
                        //    break;
                        case "p":
                            let pref_name = e.Opts.prefab; //"Gordic.Gin.Prefabs.GIcoAres"
                            //let pref = Gordic.Gfrm.Prefabs[pref_name]();
                            //let context = window;
                            //let namespaces = pref_name.split(".");
                            //for (var ni = 0; ni < namespaces.length; ni++) context = context[namespaces[ni]];
                            if (Gordic.Gfrm.Prefabs[pref_name]) {
                                let pref = Gordic.Gfrm.Prefabs[pref_name].apply(_content, eval(e.Opts.pp)); //Gordic.Gin.Prefabs.GIcoAres();
                                //if (pref instanceof Array) pref = pref[0];
                                //if (pref && pref.hasOwnProperty("fields")) pref = pref.fields[0];
                                //if (pref && pref.hasOwnProperty("options")) pref = pref.options;
                                if (pref && i[pref.widget])
                                    i[pref.widget](pref.options, o, { allowResize: false, rows: 1, smartNavInvertEnterBehavior: true });
                            } else return; //neprida do $news
                            break;
                        case "att": i.gfilefield(o, Gordic.Gfrm.Prefabs.file(_content, i_w, i_h, e.Opts).options, e.Opts);
                            break;
                        case "s":
                            if (e.Opts && e.Opts.hasOwnProperty("_lenv"))
                                i.gstringbox(o, { allowResize: false, rows: 1, smartNavInvertEnterBehavior: true }, e.Opts, Gordic.Prefabs.Field.charCounter(e.Opts._lenv));
                            else 
                                i.gstringbox(o, { allowResize: false, rows: 1, smartNavInvertEnterBehavior: true }, e.Opts);
                            break;
                        //case "t":
                        //    //let f = _content.findFields(e.Name);
                        //    let f = $news.findFields(e.Name);
                        //    let fn = f.find("textarea,input").attr("id");
                        //    if (!fn) fn = f.find("textarea,input").attr("id", "i" + Math.random().toString(36).substr(2, 5)).attr("id");
                        //    i.addClass("gfrm-label").append($("<label for='" + fn + "'>").text(e.Model));
                        //    break;
                        case "esu":
                            var esu = Gordic.Esu;
                            if (!esu) break;

                            var esuLogovani = {
                                Ixp: "0000SE00000M"/*dto.Ixx ?? dto.Sxs*/,
                                DuvodHledani: 90,
                                AktZnacka: "",
                                DuvodHledaniTxt: "jres:226" }; //RC 226 : Práce s ESU ve formuláři

                            i.gselectbox(o, {
                                //itemClass: "gfrm--wrap",
                                //helperItemClass: "gfrm--wrap"
                                //modelValueTransform: {
                                //    collect: function (value) {
                                //    },
                                model:
                                    function (operation, dto, modelOptions) {
                                        switch (operation) {
                                            case "apply": {
                                                $(this).gfield("setValue", {
                                                    ixs_esu: dto[e.Model],
                                                    esu_txt: dto[e.Model + "_txt"],
                                                    zkratka: dto[e.Model + "_zkratka"],
                                                    nazev: dto[e.Model + "_nazev"],
                                                    stat: dto[e.Model + "_stat"],
                                                    obec: dto[e.Model + "_obec"],
                                                    psc: dto[e.Model + "_psc"],
                                                    ulice: dto[e.Model + "_ulice"],
                                                    mail: dto[e.Model + "_mail"],
                                                    tel: dto[e.Model + "_tel"],
                                                    ico: dto[e.Model + "_ico"],
                                                    dic: dto[e.Model + "_dic"],
                                                    //?: dto[e.Model + "_zop"],
                                                    //?: dto[e.Model + "_zol"],
                                                    zast_txt: dto[e.Model + "_zast_txt"],
                                                });
                                                return;
                                            }
                                            case "collect": {
                                                //var v = $(this).gfield("instance")._value;
                                                var v = $(this).gfield("getValue");
                                                if (v !== null) {
                                                    dto[e.Model] = v.ixs_esu;
                                                    dto[e.Model + "_txt"] = v.esu_txt;
                                                    dto[e.Model + "_zkratka"] = v.zkratka;
                                                    dto[e.Model + "_nazev"] = v.nazev;
                                                    dto[e.Model + "_stat"] = v.stat;
                                                    dto[e.Model + "_obec"] = v.obec;
                                                    dto[e.Model + "_psc"] = v.psc;
                                                    dto[e.Model + "_ulice"] = v.ulice;
                                                    dto[e.Model + "_mail"] = v.mail;
                                                    dto[e.Model + "_tel"] = v.tel;
                                                    dto[e.Model + "_ico"] = v.ico;
                                                    dto[e.Model + "_dic"] = v.dic;
                                                    //dto[e.Model + "_zop"] = v.?;
                                                    //dto[e.Model + "_zol"] = v.?;
                                                    dto[e.Model + "_zo"] = v.zast_txt;
                                                }
                                                return;
                                            }
                                            default: return e.Model;
                                        }
                                    }
                            }, esu.Prefabs.vyberEsu({
                                typ: esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   možnost vyberu z karoteky  viz. níže (def 3)
                                Logovani: esuLogovani,
                                ZOVisible: false, //TODO
                                EditMode: true //TODO
                            }), {
                                graphicInput: "exclusive"
                            }, e.Opts);
                            break;
                    }
                    if (e.Opts && e.Opts.hasOwnProperty("click_href")) {
                        i.on("focusin", function (ev) {
                            _content._execute(p, e.Opts.click_href);
                        });
                    }
                    i.on("fieldchange", function (ev, changeObj) {

                        // thazmuka 2.2.2022 - přidán trigger na change sestavy
                        _content.element.trigger("greportformcontrolchanged", changeObj);

                        //console.log("change", i, i.gfield("getValue"));
                        i.data('c', _content.ci = 1 + (_content.ci || 0));
                        if (_content.chto) clearTimeout(_content.chto);
                        _content.chto = setTimeout(function () {
                            //console.log("change timeout", i, i.gfield("getValue"));
                            _content.chto = null;
                            if (e.NeedServerChange)
                                _content.reload(p);
                        }, 100);
                    });
                    if (i.hasClass("gfield"))
                        $news = $news.add(i);
                }
            });
            $olds.remove();

            if ($news.length > 0) {
                $news.gfield("model", "validators", render.Validators); //validatory jen 1x, ne pokaždé
                var $all = $page.children(".gfrm-field").add($news);
                var all = $all.get().sort(function (a, b) { return $(a).data("gfrm-d").Order.localeCompare($(b).data("gfrm-d").Order); });
                var le = null;
                while (all.length) {
                    var ne = all.pop();
                    if ($news.is(ne)) {
                        if (le == null) $page[0].appendChild(ne);
                        else $page[0].insertBefore(ne, le);
                    }
                    le = ne;
                }
                    
            }
            var fs = $page.findFields();
            this.verticalAlign(fs);
            this.paddingInputs(fs);
            this._setData(render); //apply všech dat (i na jiných stranách)
            
            $page.find(".js-gfrm-fontw").each(function () {
                var $e = $(this);
                var $p = $e.parents(".gfrm-field");
                var w = $p.innerWidth();
                $e.css('font-size', w);
                $e.css('line-height', ""+w+"px");
            });
        },
        _setData1: function (render, fs) {
            fs.filter(function () { return !$(this).gfield("hasChanged", true); })
                .gfield("model", "apply", render.Data, { initialValues: true })
                .find("input:focus").select();
            if (render.Errors)
                fs.gfield("model", "validations", render.Errors)
                .gfield("validate").removeClass("flash");
        },
        _setData: function (render) {
            this.data = render.Data;
            if (this.wv) { this._setData1(render, this.wv.findFields()); this.wv.trigger("greportformdataapplied", { data: render.Data }); }
            this._setData1(render, this.gfrm.findFields());
        },
        applyData: function (data) {
            var fs = this.findFields();
            fs.gfield("model", "apply", data);
        },
        collect: function () {
            var fs = this.gfrm.findFields();
            fs.sort(function (a, b) { return ($(a).data('c') || 0) - ($(b).data('c') || 0); }).gfield("confirm").gfield("model", "collect", this.data);
            if (this.viewmode == 0 && this.wv) this.wv.findFields().gfield("confirm").gfield("model", "collect", this.data);
            //console.log("collect", this.data);
            return this.data;
        },
        paddingInputs: function (fs) {
            fs.each(function (i, e) {
                var d = $(e).data("gfrm-d");
                var inp = $(e).find("textarea,input");
                if (typeof d.PL === "number") { inp.css("padding-left", "" + d.PL + "px"); }
                if (typeof d.PT === "number") { inp.css("padding-top", "" + d.PT + "px"); }
                if (typeof d.PR === "number") { inp.css("padding-right", "" + d.PR + "px"); }
                if (typeof d.PB === "number") { inp.css("padding-bottom", "" + d.PB + "px"); }
            });
        },
        verticalAlign: function (fs) {
            var _content = this;
            var fields = fs.filter("[style*=vertical-align]");
            fields.each(function (i, e) { $(e).find("textarea,input").parent().css("vertical-align", $(e).css("vertical-align")); });
            
            var a = fields.find(".gfield-table textarea:not(.invisible):not(.hidden),.gfield-table input:not(.invisible):not(.hidden)");
            a.removeClass("h100").height("auto").css("overflow-x", "hidden"); //FF fix - https://stackoverflow.com/a/22700700;
            a.parent().css("cursor", "text").on("click", function (e) {
                $(e.target).children("textarea,input").focus();
            });

            fields.on("input change", function (ev, ctx) {
                _content._verticalAlign0(ev.currentTarget);
            });
            fields.css("vertical-align", "");
            fields.addClass('js-gfrm-valign');
        },
        _verticalAlign0: function (c) {
            var a = $(c).find("textarea,input");
            if (a.length === 1) {
                a.height("auto");
                var sc = a[0].scrollHeight;
                var mh = a.parent().height();
                a.height((sc < mh) ? sc : mh);
            }
        },
        webview: function (render) {
            var _content = this;
            var $wv = _content.wv;
            $("<div>").appendTo($wv).gform("createFrom", render.WebView, function (typ, obj) {
                if (typ === "field" && obj.widget === "gtable") {
                    var model = obj.options.model;
                    var cols = obj.options.columns;
                    var gf = new Gordic.Data.GridFormat();
                    gf.add(cols);
                    gf.addLinksColumn({
                        //name: "odkaz",
                        //caption: "Odkazy",
                        links: [
                            {
                                captionVisible: "never",
                                action: new GAction({
                                    name: "actEditGridRow",
                                    icon: "gi-pencil",
                                    caption: "jres:227", //RC 227 : Upravit

                                    run: function (ev, ctx) {
                                        var data = ctx && ctx.datarow;
                                        _content.dialogs.simpleForm(obj.options.wv_edittext || "jres:227", obj.options.form, data) //RC 227 : Upravit
                                            .on("close", function (ev, result) {
                                                if (result) ctx.dataView.updateData([result], "refresh");
                                            });
                                    }
                                })
                            }
                            , {
                                captionVisible: "never",
                                action: new GAction({
                                    name: "actDeleteGridRow",
                                    icon: "gi-minus_bold",
                                    caption: "jres:228", //RC 228 : Smazat
                                    run: function (ev, ctx) {
                                        var data = ctx && ctx.datarow;
                                        ctx.dataView.updateData([data], "delete");
                                    }
                                })
                            }
                        ]
                    });
                    obj.options.columns = gf;

                    obj.complete = function () {
                        var $e = $(this);
                        $e.after($("<div class='gfrm-table-field hidden'>").gdummyfield({
                            model: function (operation, dto, modelOptions) {
                                _content._webview_model($(this), model, cols, operation, dto, modelOptions);
                            },
                            getValue: function (value, flags) {
                                var view = $e.data("gdomContext").dataView;
                                return view.getDataRows(false, "data");
                            },
                            setValue: function (value, flags) {
                                var view = new Gordic.Data.View(value);
                                $e.gtable("setData", view).gdomcontext({ dataView: view });
                            }
                        }));
                        $e.after($("<div>").gbutton({
                            params: {
                                icon: "gi-plus_bold", caption: obj.options.wv_addtext || "jres:229", action: new GAction({ //RC 229 : Přidat
                                    name: "actNewGridRow", run: function (ev) {
                                        var data = { };
                                        _content.dialogs.simpleForm(obj.options.wv_addtext || "jres:229", obj.options.form, data) //RC 229 : Přidat
                                            .on("close", function (ev, result) {
                                                if (result) $e.data("gdomContext").dataView.updateData([result], "add");
                                            });
                                    }
                                })
                            }
                        }));
                    }
                }
                if (typ === "field" && obj.widget === "gformbox") {
                    var model = obj.options.model;
                    var cols = obj.options.columns;
                    obj.options.model = function (operation, dto, modelOptions) {
                        _content._webview_model($(this), model, cols, operation, dto, modelOptions);
                    };
                    obj.complete = function () {
                        var $e = $(this);
                        //$e.gfield("internalActions").actFormEdit.visible(false);
                        $e.after($("<div>").gbutton({
                            params: {
                                icon: "gi-plus_bold", caption: obj.options.wv_addtext || "jres:229", action: new GAction({ //RC 229 : Přidat
                                    name: "actNewGridRow", run: function (ev) {
                                        var data = { };
                                        $e.gfield("internalActions").actFormEdit.run({ newItemData: data });
                                    }
                                })
                            }
                        }));
                    };
                }
                if (typ === "field" && obj.widget === "gcheck") {
                    var model = obj.options.model;
                    var cols = obj.options.columns;
                    obj.options.modelValueTransform = {
                        apply: function (modelValue) { return modelValue == ($(this).gfield("option").gfrmOpt1 || "1") ? true : modelValue == ($(this).gfield("option").gfrmOpt0 || "0") ? false : null; },
                        collect: function (fieldValue) { return fieldValue === true ? ($(this).gfield("option").gfrmOpt1 || "1") : ($(this).gfield("option").gfrmOpt0 || "0"); }
                    };
                }
                if (typ === "field" && obj.options && obj.prefab && Gordic.Gfrm.Prefabs[obj.prefab]) {
                    let pref = null;
                    if (obj.prefab == "file")
                        pref = Gordic.Gfrm.Prefabs.file(_content, 300, 50, eval(obj.options.pp));
                    else
                        pref = Gordic.Gfrm.Prefabs[obj.prefab].apply(_content, eval(obj.options.pp));
                    return $.extend(true, {}, pref, obj);
                }
            });

            if (render.WebView.wv_subtitle)
                $wv.prepend("<h2>" + render.WebView.wv_subtitle + "</h2>")
            if (render.WebView.wv_caption)
                $wv.prepend("<h1>" + render.WebView.wv_caption + "</h1>")

            if (render.WebViewJs) {
                var ctx = {
                    form: $wv,
                    setVisible: function (name, isVisible) {
                        this.form.findFields(name).gformrow().toggleClass("hidden", !isVisible);
                    },
                    setEnabled: function (name, isEnabled) {
                        this.form.findFields(name).gfield("option", "disabled", !isEnabled);
                    },
                    //setRequired: function (name, isRequired) {
                    //    if (isRequired)
                    //        this.setFlag(name, "required");
                    //    else
                    //        this.setFlag(name, "");
                    //},
                    setFlag: function (name, flag) {
                        this.form.findFields(name).gfield("option", "flag", flag);
                    },
                    setValidators: function (name, vs) {
                        this.form.findFields(name).gfield("option", "validators", vs);
                    },
                    setError: function (name, msg) {
                        this.form.findFields(name).gfield("resetErrors", "gfrm_wvjs");
                        if (msg) {
                            if (typeof msg === "string") msg = { message: msg };
                            this.form.findFields(name).gfield("setError", $.extend({ group: "gfrm_wvjs", showOnDisabled: true, stopping: false }, msg));
                        }
                    },
                    setValue: function (name, value) {
                        this.form.findFields(name).gfield("setValue", value);
                    },
                    getValue: function (name) {
                        return this.form.findFields(name).gfield("getValue");
                    }
                };
                var userHandles = {}; 
                var userFunctions = ["onData","onValidate", "onChange", "onLoad"];
                (function () {
                    eval(render.WebViewJs + "\n"+userFunctions.map(function (fceName) {
                        return "userHandles." + fceName + " = typeof " + fceName + " !== 'undefined' ? " + fceName + " : null"
                    }).join(";\n"));
                })();
                if (userHandles.onLoad) userHandles.onLoad.call(ctx);
                $wv.on("fieldchange", ".gfield", function (ev, changeObj) {
                    if (userHandles.onChange) userHandles.onChange.call(ctx,
                        { name: $(this).gfield("option", "name"), value: changeObj.value }
                    );
                    if (userHandles.onValidate) userHandles.onValidate.call(ctx,
                        { name: $(this).gfield("option", "name"), value: changeObj.value }
                    );
                });
                $wv.on("greportformdataapplied", function (ev) {
                    if (userHandles.onData)
                        $wv.findFields().each(function (i, e) {
                            var $e = $(e);
                            userHandles.onData.call(ctx,
                                { name: $e.gfield("option", "name"), value: $e.gfield("getValue") }
                            );
                        });
                    if (userHandles.onValidate)
                        $wv.findFields().each(function (i, e) {
                            var $e = $(e);
                            userHandles.onValidate.call(ctx,
                                { name: $e.gfield("option", "name"), value: $e.gfield("getValue") }
                            );
                        });
                });
            }
            
            //var fs = $wv.findFields();
            //fs.gfield("model", "validators", render.Validators);
            //fs.filter(".gcheck").gcheck({
            //    modelValueTransform: {
            //        apply: function (modelValue) { return modelValue === ($(this).gfield("option").gfrmOpt1 || "1") ? true : ($(this).gfield("option").gfrmOpt0 || "0") ? false : null; },
            //        collect: function (fieldValue) { return fieldValue === true ? ($(this).gfield("option").gfrmOpt1 || "1") : ($(this).gfield("option").gfrmOpt0 || "0"); }
            //    }
            //});
            //fs.each(function (i, e) {
            //    var $e = $(e);
            //    if ($e.gfield("option").gfrmOpt0) {
            //        $e.gfield("model", "apply", $e.gfield("option").gfrmOpt0);
            //    }
            //});
/*
            $wv.on("fieldchange", ".gfield", function (ev, changeObj) {
                var i = $(this);
                //console.log("vw change", i, i.gfield("getValue"));
                var l_data = {};
                i.gfield("model", "collect", l_data);
                console.log(l_data);
                _content.findFields().not(this) //gfrm i wv samotne, ale sebe ne, aby nedoslo k nekonecne rekurzi
                    .gfield("model", "apply", l_data, { initialValues: false }) //startne fieldchange s timerem na reload
                    ;
                if (_content.chto) clearTimeout(_content.chto);
                _content.chto = setTimeout(function () {
                    _content.chto = null;
                    //if (e.NeedServerChange)
                    _content.reload();
                }, 100);
            });
*/
        },
        _webview_model: function ($f, model, cols, operation, dto, modelOptions) {
            var cnt = dto[model + "$cnt"];
            if (typeof cnt === "undefined") return;
            var gfrmmodel = [];
            for (var i = 0; i < cols.length; i++) {
                gfrmmodel[i] = model + "#" + cols[i].name;
            }
            var gfrmmodel2 = gfrmmodel.slice();
            switch (operation) {
                case "apply":  // naplneni z DTO
                    var val = [];
                    var line = 1;
                    while (line<=cnt) {
                        var it = {};
                        var empty = true;
                        for (var i = 0; i < gfrmmodel.length; i++) {
                            var ks = gfrmmodel[i].split('#', 2);
                            var v = dto[gfrmmodel2[i]];
                            if (typeof v !== "undefined") { it[ks[1]] = v; empty = false; }
                            gfrmmodel2[i] = ks[0] + "$" + line + "#" + ks[1];
                        }
                        if (empty) break;
                        val.push(it);
                        line++;
                    }
                    $f.gfield("setValue", val);
                    return;
                case "collect":  // do DTO
                    var val = $f.gfield("getValue");
                    var line = 1;
                    val.forEach(function (it) {
                        for (var i = 0; i < gfrmmodel.length; i++) {
                            var ks = gfrmmodel[i].split('#', 2);
                            var v = it[ks[1]];
                            dto[gfrmmodel2[i]] = v;
                            gfrmmodel2[i] = ks[0] + "$" + line + "#" + ks[1];
                        }
                        line++;
                    });
                    dto[model + "$cnt"] = line - 1;
                    //while (line <= cnt) {
                    //    for (var i = 0; i < gfrmmodel.length; i++) {
                    //        var ks = gfrmmodel[i].split('#', 2);
                    //        dto[gfrmmodel2[i]] = undefined;
                    //        gfrmmodel2[i] = ks[0] + "$" + line + "#" + ks[1];
                    //    }
                    //    line++;
                    //}
                    return;
            }
        },

        _historyPrev: function () {
            return this.close();
        },

        _historyNext: function() {
            return null;
        }

    });
})(jQuery);
