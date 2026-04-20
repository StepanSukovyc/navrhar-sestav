(function ($) {
    "use strict";
    namespace("Gordic.Ssl.WebClient.Details.Dil", {
        flashTimer: 5000,
        onContentReady: function () {

            var that = this;

            var caption = this.EntityTittle;




            if (this.SimpleMode) {
                this.spisSimpleMode();
            }


            if (this.hotfixi != null) {
                this.hotfixi(); // GSslDetailComponent.js
            }
        },

        // inicializace detaibuildru 
        onDetailBuilderInit: function (builder) {
            var that = this;
            // V této funkci je možné ovlivňovat komponenty, s kterými builder bude pracovat.
            //builder.moveComponentAfter("WflRedistribuce", "SslProfilSpis");


            builder.moveComponentBefore("SslDetailObsahTS", "SslProfilDokument");
            builder.moveComponentAfter("WflRedistribuce", "SslProfilDokument");
            builder.moveComponentAfter("WflPrilohy", "SslProfilDokument");

            builder.withComponent("dil", this.vytvorKonecnouComponentu(this, { ixp: this.DetailDto.ixp }));
        },
        onDetailBuilderBuild: function (builder) {
            console.log("detail build event called.");
            //pokud chci aby funkce vyhrála tak sem, jinak o funkce přijdu.
            this.prebudujMenuStromSimpleMode(builder);
            // V případě, že při otevírání nebyl poslán grid předchozího seznamu, pak nevolám vytváření šipek "předchozí / následující".
            if (this.listControls_setup) {
                this.listControls_setup({
                    load: function (state) {
                        var that = this;
                        if (state != null) {
                            this._remoteGridState = state;

                            var parentik = that.parentContent;
                            var loadParams = {
                                DetailDto: { ixp: state.currentRow.data.ixp },
                                EditMode: false, //this.EditMode
                                //grid: that.grid,
                                grid: that.gridRemoteControl,
                                //grid: parentik.mainGrid
                                //mainGrid
                            };
                            var def = $.Deferred(); //takhle blbě to je, protože nechceme předávat žádný výstup z loadovacích promise ven.
                            that.tryClose().then(function () {
                                return Gordic.Ssl.Dialogs.Detail(parentik, loadParams).then(function () { def.resolve() }, function () { def.reject(); });
                                //_this.load(loadParams);
                            })
                            return def.promise();
                        }

                        return false;
                    },
                    //template pro tooltip na šipce následující
                    nextItemTemplate: "jres:31937135:" + //RC 31937135 : Následující
                        " {ixp}", //RC 31937136 : entita
                    //template pro tooltip na šipce předchozí
                    prevItemTemplate: "jres:31937137:" + //RC 31937137 : Předchozí
                        " {ixp}" //RC 31937136 : entita
                });
            }
        },

        ulozitZmenyFinal: function (model) {
            var that = this;
            this.call("SaveDetail", { model: model })
                .done(function (retVal) {
                    if (retVal.StavBool) {
                        that.findFields("Keywords").gkeywordsbar("save");
                        var opt = {
                            flashMessage: "jres:26255361", //RC 26255361 : Uloženo
                            flashMessageClass: "g-state-success"
                        };
                        var paramDetailu = {
                            DetailDto: that.DetailDto,
                            RezimPodani: 0,
                            InicDok: null,
                            EditMode: false
                        };
                        that.tryReloadDetail(paramDetailu, opt);
                    }
                });
        },

        spisSimpleMode: function () {
            this.zakazNeSimpleModeAkce();

        },

        zakazNeSimpleModeAkce: function () {
            if (this.SimpleMode) {
                //deaktivace akcí
                if (this.actions.actNabytPravMoc) this.actions.actNabytPravMoc.visible(false);
                if (this.actions.actWflCinnostiTrasy) this.actions.actWflCinnostiTrasy.visible(false);
                if (this.actions.actPriorovat) this.actions.actPriorovat.visible(false);
                if (this.ssd_dotc_subj === 0) {
                    if (this.actions.actDotcSubjekty) this.actions.actDotcSubjekty.visible(false);
                }

                if (this.actions.actKopie) this.actions.actKopie.visible(false);
                //if (this.actions.actSouvisejici) this.actions.actSouvisejici.visible(false); // T42331 zpřístupněno pro SSD 
                if (this.actions.actEvidVystupy) this.actions.actEvidVystupy.visible(false);

            }
        },

        prebudujMenuStromSimpleMode: function (builder) {
            if (this.SimpleMode) {
                // if (this.actions.xxxxx) this.actions.xxxxx.visible = false;
                var indexToDelete = [];
                var pole = builder.menuBarDefinitions;

                for (var i = 0; i < pole.length; i++) {
                    //smazaní menu zobrazit
                    if (pole[i].id === "menuZobrazit" || pole[i].parent === "menuZobrazit") {

                        if (indexToDelete.indexOf(i) === -1) { indexToDelete.push(i); }
                    }

                    //smazaní akcí z menu redistribuce
                    var poleID = pole[i].id;
                    if (poleID === "menuWflRedistribucePrideleniSsl" || poleID === "menuWflRedistribuceZrusitPrideleni") {
                        //actWflRedistribucePredaniSsl
                        if (indexToDelete.indexOf(i) === -1) { indexToDelete.push(i); }
                    }
                }
                indexToDelete.reverse();
                for (var j = 0; j < indexToDelete.length; j++) {
                    builder.menuBarDefinitions.splice(indexToDelete[j], 1);
                }
            }
        },

        //prebudujMenuPodleEntity: function () {

        //    var optTyp = {
        //        content: this,
        //        typSpis: this.typSpis
        //    };
        //    Gordic.Ssl.WebClient.GDetailUtils.UpravVisibleAkciProTypoveSpisySoucastiDily(optTyp);

        //},


        vytvorKonecnouComponentu: function (content, componentDto) {
            var result = {};
            result.onMenuBuild = [
                function (builder, menus) {
                   // menus.menuBar;
                    
                  //  this.prebudujMenuPodleEntity(builder);
                    var opt = {
                        content: this,
                        menuParamsArr: menus.menuBar
                    };
                    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);
                }
            ];
            result.onbuild = [
                function (builder) {
               
                   
                }
            ];
       
            result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                //xxxxxx: function () {
                //},
            };

            return result;
        },




    }, { extendIntellisense: GContent });
})(jQuery);