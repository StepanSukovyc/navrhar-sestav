(function ($) {
    "use strict";
    window.gscript.require("css:gin/Wfl/Controls/GWflPidbar/gwflpidbar.css");

	$.widget("gordic.gwflpidbar", {

		options: {
			/** vstupní dto pro iconbar - bez něj neví co za ikony zobrazit */
			dto: null,
			/** ixp */
			pid: '000000000000',
			/** zobrazení pidu */
			pidVisible: true,
			/** zobrazení ikon */
			iconsVisible: true,
			/** zobrazení klíčových slov */
			keywordsVisible: true,
			/** pokud je null a keywordsVisible -> použít pid */
			keywordsPid: null,
			/** zobrazení výběru barev */
			showColorbar: true,
		},

		_create: function () {

			var pidbar = this.element.addClass("gwflpidbar");
			this.refresh();
		},

		_setOptions: function (options) {
			this._super(options);
			this.refresh();
		},

		refresh: function (options) {

			//console.log("refresh gwflpidbar");

			var _this = this;

			if (options === undefined) {
				this.options = $.extend({}, this.options);
			}
			else {
				this.options = options;
			}

			if (this.options.customClass)
				this.element.addClass(this.options.customClass);


			var optionsPid = {
				pid: this.options.pid
			}

			if ((this.pidElement === null) || (this.pidElement === undefined)) {

				//console.log("creating");

				if (this.options.pidVisible) {

					this.pidElement = $("<div>").appendTo(this.element);

					this.pidElement.gpidbar(optionsPid)
						_this._createIconbar();
						_this._createKeywordsbar();

				}

			}
			else {

				this.pidElement.gpidbar("update", optionsPid)

					if (_this.options.pidVisible) {
						_this.pidElement.show();
					}
					else {
						_this.pidElement.hide();
					}

					_this._createIconbar();
					_this._createKeywordsbar();

			}

		},

		_createIconbar: function () {

			var optionsIcon = {                                     // TODO
				dto: this.options.dto,
				gcontent: this.options.keywordsGContent,
				ixp: this.options.pid,
				showColorbar: this.options.showColorbar
			}

			if (this.iconsElement == null) {
			    if (this.options.iconsVisible)
			        this.iconsElement = $("<div>").appendTo(this.element).giconbar(optionsIcon);
			}
			else {
			    this.iconsElement.giconbar("update", optionsIcon);

				if (this.options.iconsVisible) {
					this.iconsElement.show();
				}
				else {
					this.iconsElement.hide();
				}
			}

		},

		_createKeywordsbar: function () {

			if (this.options.pid === "000000000000") {
				// -----------------
			}
			else {
				this.keywordsPid = this.options.keywordsPid || this.options.pid;

				var optionsKey = {
					ixp: this.keywordsPid,
					gcontent: this.options.keywordsGContent,
				};

				if (this.keywordsElement == null) {
					if (this.options.keywordsVisible)
						this.keywordsElement = $("<div>").appendTo(this.element).gkeywords(optionsKey);
				}
				else {
					this.keywordsElement.gkeywords("update", optionsKey);

					if (this.options.keywordsVisible) { this.keywordsElement.show(); }
					else { this.keywordsElement.hide(); }
				}
			}

		},

        _destroy: function (){
            this.element.empty();
            this.element.removeClass("gwflpidbar");
            this._super();
        }

    });
})(jQuery);