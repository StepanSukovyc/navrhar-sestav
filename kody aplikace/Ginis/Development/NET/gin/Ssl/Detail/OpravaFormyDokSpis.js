(function ($) {
	"use strict";
	namespace("Gordic.Ssl.WebClient.OpravaFormyDokSpis", {

		//#region nastav fyzický originál
		setFyzOriginal: function (value) {
			this.s_fyz = value === true ? 1 : 0;

			if ((this.s_fyz === 1) && (this.s_ele === 1)) {
				this.findFields("s_ele").gfield("setValue", false);
				this.findFields("s_ele_konv").gfield("option", "disabled", false);
				this.findFields("s_fyz_konv").gfield("setValue", false);
				this.findFields("s_fyz_konv").gfield("option", "disabled", true);
			}
			else {
				this.enabDisabFields();
			}
		},
		//#endregion

		//#region nastav elektronický originál
		setEleOriginal: function (value) {
			this.s_ele = value === true ? 1 : 0;
			if ((this.s_fyz === 1) && (this.s_ele === 1)) {
				this.findFields("s_fyz").gfield("setValue", false);
				this.findFields("s_fyz_konv").gfield("option", "disabled", false);
				this.findFields("s_ele_konv").gfield("setValue", false);
				this.findFields("s_ele_konv").gfield("option", "disabled", true);
			}
			else {
				this.enabDisabFields();
			}
		},
		//#endregion

		//#region nastav fyzickou konverzi
		setFyzKonverze: function (value) {
			this.s_fyz_konv = value === true ? 1 : 0;
			this.enabDisabFields();
		},
		//#endregion

		//#region nastav elektronickou konverzi
		setEleKonverze: function (value) {
			this.s_ele_konv = value === true ? 1 : 0;
			this.enabDisabFields();
		},
		//#endregion

		//#region ovládání políček
		enabDisabFields: function () {
			var s_fyz = this.s_fyz;
			var s_ele = this.s_ele;

			if (s_fyz === 0) {

				this.findFields("s_ele_konv").gfield("setValue", false);
				if (s_ele === 0) {
					this.findFields("s_fyz_konv").gfield("setValue", false);

					this.findFields("s_fyz_konv").gfield("option", "disabled", true);
					this.findFields("s_ele_konv").gfield("option", "disabled", true);
				}
				else {
					this.findFields("s_fyz_konv").gfield("option", "disabled", false);
					this.findFields("s_ele_konv").gfield("option", "disabled", true);
				}
			}
			else {

				if (s_ele === 0) {
					this.findFields("s_fyz_konv").gfield("option", "disabled", true);
					this.findFields("s_ele_konv").gfield("option", "disabled", false);
				}
			}
		},
		//#endregion

		//#region onContentReady
		onContentReady: function () {

			var _this = this;

			// stav neuložení vrácený v closing
			this.retval = {
				stav: false
			};

			// pokud prijde pole identifikatoru, jedna se o hromadnou změnu forem
			// vezmu první identifátor jako mustr a aplikuji ho na formulář
			// vybrané nastavení formy aplikuje na všechny identifikátory
			// dle toho co se povede změnit a uložit, tak k nim přiřadím příslušnou hodnotu (true, false)
			// a vrátím zpátky na seznam radkovi, aby zobrazil příslušné ikony

			let Ixp = "";

			if (this.isArray(this.Ixp)) {
				Ixp = this.Ixp[0];
			}
			else {
				Ixp = this.Ixp;
			}

			this.call("getFyzEle", {
				Ixp: Ixp
			}).then(function (output) {

				_this.s_fyz = output.s_fyz;		// fyzicky objekt
				_this.s_ele = output.s_ele;		// elektronicky objekt

				_this.createForm();
				
				_this.enabDisabFields();

				_this.createCommandBar();

			});

		},
		//#endregion

		/**
		 * jedná se o pole identifikátorů - hromadná změna forem
		 */
		isArray: function (Ixp) {
			this.isArrayFlag = Array.isArray(Ixp);
			return this.isArrayFlag;
		},

		/**
		 * vytvoření formuláře formy
		 */
		createForm: function () {

			var _this = this;

			var form = $("<div class='oprava_formy_class'>").appendTo(_this.element);

            var FormDokSpis = new Gordic.Forms.Form({ name: "MetadataForm" })

                .addSection("Forma dokumentu/spisu")
                .addRow("Originál")
                .addField("gcheck", {
                    name: 's_fyz',
                    label: "Analogová (fyzická)",
                    //initialValue: _this.s_fyz,
                    customClass: "w-6",
                    change: function (ev, obj) {
                        _this.setFyzOriginal(obj.value);
                    }
                })
                .addField("gcheck", {
                    name: 's_ele',
                    label: "Digitální (elektronická)",
                    //initialValue: _this.s_ele,
                    customClass: "w-6",
                    change: function (ev, obj) {
                        _this.setEleOriginal(obj.value);
                    }
                })
                .addRow("Konverze")
                .addField("gcheck", {
                    name: 's_fyz_konv',
                    label: "Analogová (fyzická)",
                    customClass: "w-6",
                    change: function (ev, obj) {

                    }
                })
                .addField("gcheck", {
                    name: 's_ele_konv',
                    label: "Digitální (elektronická)",
                    customClass: "w-6",
                    change: function (ev, obj) {

                    }
                });

			form.gform("createFrom", FormDokSpis);


		},

		//#region closing
		closing: function () {

            let retval = {
                retval: this.retval.stav,
                groupResult: this.GroupResult
            };

			return retval;
		},
		//#endregion

		//#region vytvořit CommanBar
		createCommandBar: function () {

			var _this = this;

			this.actions.addRange({
				actClose: {
					caption: "Zavřít",
					icon: "gi-window-close",
					run: function () {
						_this.tryClose();
					}
				},
				actSave: {
					caption: "Uložit",
					icon: "gi-save",
					run: function () {
						_this.save();
					}
				}
			});

			this.commandBar(this.actions.createBar(["actClose*", "actSave*"]));

		},
		//#endregion

		//#region uložit formu
		save: function () {

			var _this = this;

			var formy = {};
			this.findFields().gfield("model", "collect", formy);

			// příznak, že se jedná o pole identifikátorů, tudíž o hromadnou změnu forem
			if (this.isArrayFlag) {

				this.call("SaveArray", {
					ixpArray: this.Ixp,
					s_fyz: formy.s_fyz,
					s_fyz_konv: formy.s_fyz_konv,
					s_ele: formy.s_ele,
					s_ele_konv: formy.s_ele_konv
				}).done(function () {
					_this.retval.stav = true;
					_this.tryClose();
				});

			}
			else {

				this.call("Save", {
					ixp: this.Ixp,
					s_fyz: formy.s_fyz,
					s_fyz_konv: formy.s_fyz_konv,
					s_ele: formy.s_ele,
					s_ele_konv: formy.s_ele_konv
				}).done(function (textChyby) {

					// chyba nenastala
					if (textChyby === undefined) {
						_this.retval.stav = true;
						_this.tryClose();
					}
					else {
						_this.showFlash(textChyby, "g-state-warning", 5000, "idOpravaFormyDokSpisChyba");
					}

				});
			}

		

		}
		//#endregion


	}, { extendIntellisense: GContent });
})(jQuery);
