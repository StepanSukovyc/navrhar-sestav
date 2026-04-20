(function() {
    "use strict";
    var FileSourceEnum = {
        ElDoc: 0,
        Attachment: 1,
        ElDocTemp: 2,
        AttachmentTemp: 3,
        Dorucenka: 4,
        IxsUlo: 5,
        ClearCache:1000
    };

    namespace("Gordic.Wfl.FilePreview", {
        _initGContent: function () {
            if (!this._previewGContent) {
                this._previewGContent = "Gordic.Wfl.Server.GWflFilePreviewAsyncTask";//new GContent("Gordic.Wfl.WebClient.GFilePreviewContent", this.options);
            }
        },
        displayTempFile: function (guid, parentContent) {
            if (!parentContent) throw new GError('DisplayTempFile: You must provide parentContent');
            return {
                gcontent: parentContent.createServiceContent('Gordic.Gui.WebControls.GFileServiceProvider'),
                input: { uid: guid, fieldDownloaderType: 'Gordic.Gui.WebControls.GFileServiceProvider'},
                method:'PreviewFileByUID'
            };
        },
        displayAttachmentIxb: function (ixp, ixb, verze, opts) {
            var _this = this;
            this._initGContent(); 

            return {
                gcontent: _this._previewGContent,
                input: {
                    source: FileSourceEnum.Attachment,
                    conversion: opts && opts.conversion || true,
                    cacheConversion: opts && opts.cacheConversion || true,
                    ixp: ixp/*"DEMOX000VI1I"*/,
                    ixb: ixb,
                    verze: verze,
                    forceNew: opts && opts.forceNew || false,
                    cacheKey: opts && opts.cacheKey
                }
            };
           
        },

        displayAttachment: function (ixp, porCislo, verze, opts) {
            this._initGContent();

            return {
                gcontent: this._previewGContent,
                input: {
                    source: FileSourceEnum.Attachment,
                    conversion: opts && opts.conversion || true,
                    cacheConversion: opts && opts.cacheConversion || true,
                    ixp: ixp/*"DEMOX000VI1I"*/,
                    porCislo: porCislo,
                    verze: verze,
                    forceNew: opts && opts.forceNew || false,
                    cacheKey: opts && opts.cacheKey
                }
            };
        },

        displayIxsUlo: function (ixp, ixsUlo, opts) {
            this._initGContent();
            return {
                gcontent: this._previewGContent,
                input: {
                    source: FileSourceEnum.IxsUlo,
                    conversion: opts && opts.conversion || true,
                    cacheConversion: opts && opts.cacheConversion || true,
                    ixp: ixp/*"DEMOX000VI1I"*/,
                    ixsUlo: ixsUlo,
                    forceNew: opts && opts.forceNew || false,
                    cacheKey: opts && opts.cacheKey
                }
            };
        },
        displayElDoc: function (ixp, verze, opts) {
            this._initGContent();

            return {
                gcontent: this._previewGContent,
                input: {
                    source: FileSourceEnum.ElDoc,
                    conversion: opts && opts.conversion || true,
                    cacheConversion: opts && opts.cacheConversion || true,
                    ixp: ixp/*"DEMOX000VI1I"*/,
                    verze: verze,
                    forceNew: opts && opts.forceNew || false,
                    cacheKey: opts && opts.cacheKey
                }
            };
        },

        displayDorucenka: function (sxs, ixb, opts) {
            var _this = this;
            this._initGContent();

            return {
                gcontent: _this._previewGContent,
                input: {
                    source: FileSourceEnum.Dorucenka,
                    conversion: opts && opts.conversion || true,
                    cacheConversion: opts && opts.cacheConversion || true,
                    sxs: sxs,
                    ixb: ixb,
                    forceNew: opts && opts.forceNew || false,
                    cacheKey: opts && opts.cacheKey
                }
            };
        },

        clearCache: function () {
            this._initGContent();

            return {
                gcontent: this._previewGContent,
                input: {
                    source: FileSourceEnum.ClearCache
                }
            };
        }
    });


    $.widget("gordic.gwflfilepreview", $.gordic.gfilepreview, {
        options: {
            conversion: true,
            cacheConversion: true
        },
        clearCache: function () {
            this._super();
          //  this.displayFromServer(Gordic.Wfl.FilePreview.clearCache());
            //todo: dořešit smazání severcache
        },

        displayAttachmentIxb: function (ixp, ixb, verze, forceNew) {
            return this.displayFromServer(Gordic.Wfl.FilePreview.displayAttachmentIxb(ixp,
                ixb,
                verze,
                {
                    conversion: this.options.conversion,
                    cacheConversion: this.options.cacheConversion,
                    forceNew: forceNew
                }));
        },

        displayAttachment: function (ixp, porCislo, verze, forceNew) {
            return this.displayFromServer(Gordic.Wfl.FilePreview.displayAttachment(ixp,
                porCislo,
                verze,
                {
                    conversion: this.options.conversion,
                    cacheConversion: this.options.cacheConversion,
                    forceNew: forceNew
                }));
           
        },

        displayElDoc: function (ixp, verze, forceNew) {
            return this.displayFromServer(Gordic.Wfl.FilePreview.displayElDoc(ixp,
                verze,
                {
                    conversion: this.options.conversion,
                    cacheConversion: this.options.cacheConversion,
                    forceNew: forceNew
                }));
            // return this.displayFromServer("Gordic.Wfl.Server.GWflPdfViewAsyncTask", { ixp: ixp/*"DEMOX000VI1I"*/, verze: verze, forceNew: forceNew || false });
        },

        _destroy: function () {
            delete this._previewGContent;

            this._super();
        }
    });
    

}) (jQuery);