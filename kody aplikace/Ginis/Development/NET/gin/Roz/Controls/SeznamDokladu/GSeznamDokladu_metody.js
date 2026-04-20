"use strict";
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            /**
             * Vraci objekt gridu
             * @returns
             */
            function getGrid(content) {
                var data = content.element.find(".ggrid.js-seznamDokladu");
                return (data.length == 0 ? null : data);
            }
            WebClient.getGrid = getGrid;
            /**
             * Vraci objekt filtru
             * @param {GContent} content
             * @returns
             */
            function getFilter(content) {
                //debugger;
                //return content.$filterForm;
                return content.element.find(".js-filtr");
            }
            WebClient.getFilter = getFilter;
            /**
            * Nacteni kontextu seznamu
            * @returns
            */
            function GetContentSeznam() {
                return $.content("ROZSeznamdokladu#");
            }
            WebClient.GetContentSeznam = GetContentSeznam;
            /**
             * Nahrazeni radku novym obsahem
             * @param {GContent} content
             * @param {any} radek
             * @param {boolean} refresh
             */
            function ReplaceRow(content, radek, refresh) {
                if (typeof content === undefined || content === null)
                    content = GetContentSeznam();
                if (content === null)
                    return;
                // Zmena radku na gridu
                // TODO: Nefunguje korektne
                //var myview = new Gordic.Data.View(radek, { key: "ixp" });
                //radek = myview.findByKey(radek.ixp, true);
                var grid = getGrid(content);
                Gordic.Eko.WebClient.Common.GetView(grid).updateData(radek, "update");
                if (refresh) {
                    grid.ggrid("activeRow", { ixp: radek.ixp });
                    grid.ggrid("fitV");
                }
            }
            WebClient.ReplaceRow = ReplaceRow;
            /**
             * Metoda pro nacteni dat
             * @param {GSeznamDokladuTab} content
             * @param {Gordic.Uct.Interface.GRozFiltrDokladu} filtr
             * @param deffer
             */
            function reload(content, filtr, deffer) {
                // Pokud neni filtr poslan volajici funkci, musim si ho zde vytvorit
                if (typeof filtr === "undefined" || filtr == null) {
                    var _filter = getFilter(content);
                    filtr = _filter.gfilterpanel("getCurrentData");
                    deffer = $.Deferred();
                    content.beginOperation("jres:30150038"); //RC 30150038 : Načítám data
                    /*
                    filtr.hraniceVelkychDat = content.hraniceVelkychDat;
                    filtr.varovaniVelkehoMnoztviDat = content.varovaniVelkehoMnoztviDat;
                    */
                    filtr.hraniceVelkychDat = content.globalSettings.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.BigData");
                    filtr.varovaniVelkehoMnoztviDat = content.globalSettings.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.WarningWhenLoading");
                }
                let myfiltr = filtr;
                debugger;
                // nacteni instance gridu
                //var myGrid = getGrid(content);
                //nacteni dat do gridu
                //debugger;        
                //sluzba pro pristup k datum ze serveru
                content.isl.RozDoklad.list({ filters: myfiltr }).use((req, next, ctx) => {
                    return next(req).then((result) => {
                        content.pristupnostAkciSeznamu(result.meta, result.data.length);
                        return result;
                    });
                }).getData()
                    .done(function (seznamDokladu) {
                    debugger;
                    if (content.closed)
                        return;
                    var myGrid = getGrid(content);
                    if (seznamDokladu && seznamDokladu.length > 0) {
                        var view = new Gordic.Data.View(seznamDokladu, { key: "ixp" }); //key je dulezity kvuli pripadnemu vyhledavani radku
                        if (myGrid !== null)
                            myGrid.ggrid("setData", view, true);
                    }
                    else {
                        seznamDokladu = [];
                        myGrid.ggrid("setData", new Gordic.Data.View(seznamDokladu, { key: "ixp" }), true);
                    }
                    //content.pristupnostAkciSeznamu(that.permisions);
                })
                    .fail(function (xhr, type, vobj) {
                    if (type === "validation") {
                        //if (typeof vobj.baseType !== "undefined" && vobj.baseType === "Gordic.Eko.Interface.GMessageException") {
                        //vobj.baseMessage
                        //c.baseType Gordic.Eko.Interface.GMessageException
                        debugger;
                        //vobj.handled = true;
                        let transMsgTst = Gordic.Eko.WebClient.Common.GetTranMessage(vobj);
                        // test, zda jsou poslany nejaky zpravy
                        if (transMsgTst != null) {
                            let transMsg = transMsgTst;
                            Gordic.Eko.WebClient.Common.ZpracovaniZprav(content, transMsg)
                                .then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    if (returnValue.IdMessage === "seznamDokladu_que" && returnValue.TypeMessage === 4 /* Gordic.Eko.Interface.GETypeTransferMessage.DecisionQuestionMessage */) {
                                        if (returnValue.ResultQuestion && typeof returnValue.ResultQuestion === "string") {
                                            myfiltr.varovaniVelkehoMnoztviDat = returnValue.ResultQuestion === "YES";
                                        }
                                    }
                                    myfiltr.idMessage = returnValue.IdMessage;
                                    return reload(content, myfiltr);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                            });
                        }
                    }
                })
                    .always(function () {
                    content.endOperation();
                });
                return;
            }
            WebClient.reload = reload;
            /**
             * Aktualizace zaslanych zapisu z DB do gridu
             * @param content
             * @param doklady
             */
            function refreshRowsFromDB(content, doklady) {
                // kontroly
                if (!doklady || doklady.length == 0)
                    return $.Deferred().reject().promise();
                // zjisteni contentu seznamu, pokud neni zadano
                if (typeof content === undefined || content === null)
                    content = GetContentSeznam();
                if (content === null || content.closed)
                    return $.Deferred().reject().promise();
                // zjisteni gridu
                let grid = getGrid(content);
                if (grid == null)
                    return $.Deferred().resolve().promise();
                // zjisteni view
                let view = Gordic.Eko.WebClient.Common.GetView(grid);
                if (view == null)
                    return $.Deferred().resolve().promise();
                let poleIxp = doklady.map((radek) => radek.ixp);
                return view.requestData({ Filters: { ixp: { o: "IN", v: poleIxp } } }).then(() => {
                    if (!content?.closed) {
                        if (content)
                            getGrid(content)?.ggrid("activeRow", { ixp: doklady[0].ixp });
                    }
                    return;
                });
                //return content.isl.RozDoklad.list({ ixp: { o: "IN", v: poleIxp } })
                //    .getData()
                //    .then((doklady) => {
                //        debugger;
                //        doklady.forEach((radek) => {
                //            ReplaceRow(content, radek, false);
                //        });
                //        return;
                //    })
                //    ;
            }
            WebClient.refreshRowsFromDB = refreshRowsFromDB;
            /**
             * Zobrazeni detailu dle pidu
             * @param content
             * @param row
             */
            function ZobrazDetailIxp(content, ixp) {
                if (content.closed)
                    return;
                if (ixp != null)
                    Gordic.Roz.WebClient.ZobrazDetailDleIXP(content, ixp, null, false, false, undefined, undefined);
                else
                    content.dialogs.messageBox("jres:30250274", //RC 30250274 : Upozornění
                    "jres:30250275"); //RC 30250275 : Není vybrán žádný řádek!
            }
            WebClient.ZobrazDetailIxp = ZobrazDetailIxp;
            /**
             *  Aktualizace konkretnich radku
             *
             * function refresRow
             *
             * @param {GContent} content
             * @param {Gordic.Eko.Interface.GUctSeznamDokladuDto[]} doklady
             */
            function refresRows(content, doklady) {
                doklady.forEach((radek, index) => {
                    if (radek.ResultOperation === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) {
                        let radekAkt = NajdiRadek(radek.ixp);
                        radekAkt.s_zau = radek.s_zau;
                        radekAkt.s_zau_txt = radek.s_zau_txt;
                        radekAkt.s_zau = radek.s_zau;
                        //debugger;
                        Gordic.Roz.WebClient.ReplaceRow(content, radekAkt, true);
                    }
                });
                //Gordic.Uct.WebClient.Seznam.ReplaceRow(content, radekAkt, true)
            }
            /**
              * Nacteni dokladu k prevzeti
              * @param content
              * @param selectedRows
              */
            function SetDataSelected(selectedRows) {
                selectedRows.forEach((row) => { row.wiz_check = true; });
                return $.Deferred().resolve(selectedRows).promise();
            }
            WebClient.SetDataSelected = SetDataSelected;
            /**
             * Dohledai radku
             * @param {string} pidDokladu
             * @returns
             */
            function NajdiRadek(pidDokladu) {
                var seznam = GetContentSeznam();
                if (seznam === null)
                    return null;
                var radek = Gordic.Eko.WebClient.Common.GetView(getGrid(seznam)).findByKey(pidDokladu);
                //debugger;
                //var radek = $.content("UCTSeznamdokladu#").view.findByKey(pidDokladu, false);
                if (radek)
                    return radek;
                return null;
            }
            WebClient.NajdiRadek = NajdiRadek;
            function getIxpDen(content) {
                return content.ekoBook?.ixp_den || null;
            }
            WebClient.getIxpDen = getIxpDen;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURva2xhZHVfbWV0b2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbURva2xhZHVfbWV0b2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0EwUWY7QUExUUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMFFuQjtJQTFRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMFE3QjtRQTFRb0IsV0FBQSxTQUFTO1lBRTFCOzs7ZUFHRztZQUNILFNBQWdCLE9BQU8sQ0FBQyxPQUFpQjtnQkFDckMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFIZSxpQkFBTyxVQUd0QixDQUFBO1lBQ0Q7Ozs7ZUFJRztZQUNILFNBQWdCLFNBQVMsQ0FBQyxPQUEwQjtnQkFDaEQsV0FBVztnQkFDWCw2QkFBNkI7Z0JBQzdCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUplLG1CQUFTLFlBSXhCLENBQUE7WUFDQTs7O2NBR0U7WUFDSCxTQUFnQixnQkFBZ0I7Z0JBQzVCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFGZSwwQkFBZ0IsbUJBRS9CLENBQUE7WUFDRDs7Ozs7ZUFLRztZQUNILFNBQWdCLFVBQVUsQ0FBQyxPQUFvQyxFQUFFLEtBQVUsRUFBRSxPQUFnQjtnQkFFekYsSUFBSSxPQUFPLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUk7b0JBQ2hELE9BQU8sR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLE9BQU8sS0FBSyxJQUFJO29CQUFFLE9BQU87Z0JBQzdCLHVCQUF1QjtnQkFDdkIsMkJBQTJCO2dCQUMzQiwyREFBMkQ7Z0JBQzNELDRDQUE0QztnQkFDNUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQWMsQ0FBQyxDQUFDO2dCQUVuQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRXRFLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3RCLENBQUM7WUFDTCxDQUFDO1lBakJlLG9CQUFVLGFBaUJ6QixDQUFBO1lBQ0Q7Ozs7O2VBS0c7WUFDSCxTQUFnQixNQUFNLENBQUMsT0FBMEIsRUFBRSxLQUFnRSxFQUFFLE1BQStCO2dCQUVoSixvRUFBb0U7Z0JBQ3BFLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDaEQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMvQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN0QixPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCO29CQUNyRTs7O3NCQUdFO29CQUNGLEtBQU0sQ0FBQyxpQkFBaUIsR0FBRyxPQUFRLENBQUMsY0FBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUUsMEJBQTBCLENBQUMsQ0FBQztvQkFDcEgsS0FBTSxDQUFDLHlCQUF5QixHQUFHLE9BQVEsQ0FBQyxjQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxxQ0FBcUMsQ0FBQyxDQUFDO2dCQUc1SSxDQUFDO2dCQUNELElBQUksT0FBTyxHQUEwQyxLQUFNLENBQUM7Z0JBQzVELFFBQVEsQ0FBQztnQkFDVCx5QkFBeUI7Z0JBQ3pCLGdDQUFnQztnQkFHaEMsc0JBQXNCO2dCQUN0QixtQkFBbUI7Z0JBQ25CLHVDQUF1QztnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDcEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQzdCLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2pFLE9BQU8sTUFBTSxDQUFDO29CQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7cUJBQ1AsSUFBSSxDQUFDLFVBQVUsYUFBYTtvQkFDekIsUUFBUSxDQUFDO29CQUNULElBQUksT0FBTyxDQUFDLE1BQU07d0JBQUUsT0FBTztvQkFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUM1QyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUUsb0RBQW9EO3dCQUVySCxJQUFJLE1BQU0sS0FBRyxJQUFJOzRCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFNUMsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLGFBQWEsR0FBRyxFQUFFLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3ZGLENBQUM7b0JBQ0Qsa0RBQWtEO2dCQUV0RCxDQUFDLENBQUM7cUJBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJO29CQUMzQixJQUFJLElBQUksS0FBSyxZQUFZLEVBQUUsQ0FBQzt3QkFDeEIsMkdBQTJHO3dCQUMzRyxrQkFBa0I7d0JBQ2xCLG1EQUFtRDt3QkFDbkQsUUFBUSxDQUFDO3dCQUNULHNCQUFzQjt3QkFFdEIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbkUsdUNBQXVDO3dCQUN2QyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDdEIsSUFBSSxRQUFRLEdBQUcsV0FBK0MsQ0FBQzs0QkFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO2lDQUN6RCxJQUFJLENBQUMsVUFBVSxXQUFrRDtnQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO29DQUVwRixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssbUJBQW1CLElBQUksV0FBVyxDQUFDLFdBQVcsK0VBQXVFLEVBQUUsQ0FBQzt3Q0FDbEosSUFBSSxXQUFXLENBQUMsY0FBYyxJQUFJLE9BQU8sV0FBVyxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUUsQ0FBQzs0Q0FDL0UsT0FBTyxDQUFDLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDO3dDQUM3RSxDQUFDO29DQUNMLENBQUM7b0NBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO29DQUMxQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0NBQ3BDLENBQUM7cUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO29DQUN4Rix5QkFBeUI7b0NBQ3pCLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dDQUMzQixDQUFDO3FDQUNJLENBQUM7b0NBQ0YseUJBQXlCO29DQUN6QixPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDM0IsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO29CQUVMLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO3FCQUNELE1BQU0sQ0FBQztvQkFDSixPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUNEO2dCQUVMLE9BQU87WUFDWCxDQUFDO1lBOUZlLGdCQUFNLFNBOEZyQixDQUFBO1lBR0Q7Ozs7ZUFJRztZQUNILFNBQWdCLGlCQUFpQixDQUFDLE9BQWlDLEVBQUUsT0FBb0Q7Z0JBQ3JILFdBQVc7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVFLCtDQUErQztnQkFDL0MsSUFBSSxPQUFPLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUk7b0JBQ2hELE9BQU8sR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU07b0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9FLGlCQUFpQjtnQkFDakIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLElBQUksSUFBSSxJQUFJO29CQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxRCxnQkFBZ0I7Z0JBQ2hCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELElBQUksSUFBSSxJQUFJLElBQUk7b0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTFELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFJLENBQUMsQ0FBQztnQkFDakQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDN0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzt3QkFDbkIsSUFBRyxPQUFPOzRCQUNWLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDO29CQUNuRSxDQUFDO29CQUNELE9BQU87Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gscUVBQXFFO2dCQUNyRSxnQkFBZ0I7Z0JBQ2hCLDBCQUEwQjtnQkFDMUIsbUJBQW1CO2dCQUNuQixzQ0FBc0M7Z0JBQ3RDLGdEQUFnRDtnQkFDaEQsYUFBYTtnQkFDYixpQkFBaUI7Z0JBQ2pCLFFBQVE7Z0JBQ1IsT0FBTztZQUNYLENBQUM7WUFoQ2UsMkJBQWlCLG9CQWdDaEMsQ0FBQTtZQUlEOzs7O2VBSUc7WUFDSCxTQUFnQixlQUFlLENBQUMsT0FBaUIsRUFBRSxHQUFXO2dCQUUxRCxJQUFJLE9BQU8sQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQzNCLElBQUksR0FBRyxJQUFJLElBQUk7b0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O29CQUVoRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsMEJBQTBCO29CQUNsRSxlQUFlLENBQUMsQ0FBQyxDQUFFLHdDQUF3QztZQUV2RSxDQUFDO1lBVGUseUJBQWUsa0JBUzlCLENBQUE7WUFDRDs7Ozs7OztlQU9HO1lBQ0gsU0FBUyxVQUFVLENBQUMsT0FBaUIsRUFBRSxPQUFvRDtnQkFFdkYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDN0IsSUFBSSxLQUFLLENBQUMsZUFBZSw2REFBbUQsRUFBRSxDQUFDO3dCQUMzRSxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQVUsQ0FBOEMsQ0FBQzt3QkFDekYsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUM3QixRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFDN0IsV0FBVzt3QkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDN0QsQ0FBQztnQkFDTCxDQUFDLENBQ0EsQ0FBQztnQkFDRixpRUFBaUU7WUFDckUsQ0FBQztZQUVEOzs7O2dCQUlJO1lBQ0osU0FBZ0IsZUFBZSxDQUFDLFlBQXlEO2dCQUNyRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEQsQ0FBQztZQUhlLHlCQUFlLGtCQUc5QixDQUFBO1lBR0Q7Ozs7ZUFJRztZQUNILFNBQWdCLFVBQVUsQ0FBQyxVQUFrQjtnQkFDekMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxNQUFNLEtBQUssSUFBSTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDakMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZGLFdBQVc7Z0JBQ1gsK0VBQStFO2dCQUMvRSxJQUFJLEtBQUs7b0JBQ0wsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFUZSxvQkFBVSxhQVN6QixDQUFBO1lBQ0QsU0FBZ0IsU0FBUyxDQUFDLE9BQTBCO2dCQUVoRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxJQUFJLElBQUksQ0FBQztZQUM1QyxDQUFDO1lBSGUsbUJBQVMsWUFHeEIsQ0FBQTtRQUdMLENBQUMsRUExUW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBRN0I7SUFBRCxDQUFDLEVBMVFnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwUW5CO0FBQUQsQ0FBQyxFQTFRUyxNQUFNLEtBQU4sTUFBTSxRQTBRZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUm96LldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRHcmlkKGNvbnRlbnQ6IEdDb250ZW50KTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBjb250ZW50LmVsZW1lbnQuZmluZChcIi5nZ3JpZC5qcy1zZXpuYW1Eb2tsYWR1XCIpO1xyXG4gICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFZyYWNpIG9iamVrdCBmaWx0cnVcclxuICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXIoY29udGVudDogR1Nlem5hbURva2xhZHVUYWIpOiBhbnkge1xyXG4gICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgLy9yZXR1cm4gY29udGVudC4kZmlsdGVyRm9ybTtcclxuICAgICAgICByZXR1cm4gY29udGVudC5lbGVtZW50LmZpbmQoXCIuanMtZmlsdHJcIik7XHJcbiAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiBOYWN0ZW5pIGtvbnRleHR1IHNlem5hbXVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRDb250ZW50U2V6bmFtKCk6IEdTZXpuYW1Eb2tsYWR1VGFiIHtcclxuICAgICAgICByZXR1cm4gJC5jb250ZW50KFwiUk9aU2V6bmFtZG9rbGFkdSNcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE5haHJhemVuaSByYWRrdSBub3Z5bSBvYnNhaGVtXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmFkZWtcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVmcmVzaFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVwbGFjZVJvdyhjb250ZW50OiBHQ29udGVudCB8IG51bGwgfCB1bmRlZmluZWQsIHJhZGVrOiBhbnksIHJlZnJlc2g6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSB1bmRlZmluZWQgfHwgY29udGVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgY29udGVudCA9IEdldENvbnRlbnRTZXpuYW0oKTtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIFptZW5hIHJhZGt1IG5hIGdyaWR1XHJcbiAgICAgICAgLy8gVE9ETzogTmVmdW5ndWplIGtvcmVrdG5lXHJcbiAgICAgICAgLy92YXIgbXl2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmFkZWssIHsga2V5OiBcIml4cFwiIH0pO1xyXG4gICAgICAgIC8vcmFkZWsgPSBteXZpZXcuZmluZEJ5S2V5KHJhZGVrLml4cCwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIGdyaWQgPSBnZXRHcmlkKGNvbnRlbnQgYXMgYW55KTtcclxuXHJcbiAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldFZpZXcoZ3JpZCkudXBkYXRlRGF0YShyYWRlaywgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgIGlmIChyZWZyZXNoKSB7XHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgeyBpeHA6IHJhZGVrLml4cCB9KTtcclxuICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImZpdFZcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE1ldG9kYSBwcm8gbmFjdGVuaSBkYXRcclxuICAgICAqIEBwYXJhbSB7R1Nlem5hbURva2xhZHVUYWJ9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekZpbHRyRG9rbGFkdX0gZmlsdHJcclxuICAgICAqIEBwYXJhbSBkZWZmZXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlbG9hZChjb250ZW50OiBHU2V6bmFtRG9rbGFkdVRhYiwgZmlsdHI/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96RmlsdHJEb2tsYWR1IHwgdW5kZWZpbmVkIHwgbnVsbCwgZGVmZmVyPzogYW55IHwgdW5kZWZpbmVkIHwgbnVsbCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBQb2t1ZCBuZW5pIGZpbHRyIHBvc2xhbiB2b2xhamljaSBmdW5rY2ksIG11c2ltIHNpIGhvIHpkZSB2eXR2b3JpdFxyXG4gICAgICAgIGlmICh0eXBlb2YgZmlsdHIgPT09IFwidW5kZWZpbmVkXCIgfHwgZmlsdHIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgX2ZpbHRlciA9IGdldEZpbHRlcihjb250ZW50KTtcclxuICAgICAgICAgICAgZmlsdHIgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICBkZWZmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMTUwMDM4XCIpOyAvL1JDIDMwMTUwMDM4IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGZpbHRyLmhyYW5pY2VWZWxreWNoRGF0ID0gY29udGVudC5ocmFuaWNlVmVsa3ljaERhdDtcclxuICAgICAgICAgICAgZmlsdHIudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IGNvbnRlbnQudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdDtcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZmlsdHIhLmhyYW5pY2VWZWxreWNoRGF0ID0gY29udGVudCEuZ2xvYmFsU2V0dGluZ3MhLmdldChHb3JkaWMuUm96LkFwcFNldHRpbmdzLmFwcFBhdGggK1wiLlJvelNldHRpbmdzRm9ybS5CaWdEYXRhXCIpO1xyXG4gICAgICAgICAgICBmaWx0ciEudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IGNvbnRlbnQhLmdsb2JhbFNldHRpbmdzIS5nZXQoR29yZGljLlJvei5BcHBTZXR0aW5ncy5hcHBQYXRoICsgXCIuUm96U2V0dGluZ3NGb3JtLldhcm5pbmdXaGVuTG9hZGluZ1wiKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXlmaWx0cjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekZpbHRyRG9rbGFkdSA9IGZpbHRyITtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyBuYWN0ZW5pIGluc3RhbmNlIGdyaWR1XHJcbiAgICAgICAgLy92YXIgbXlHcmlkID0gZ2V0R3JpZChjb250ZW50KTtcclxuXHJcblxyXG4gICAgICAgIC8vbmFjdGVuaSBkYXQgZG8gZ3JpZHVcclxuICAgICAgICAvL2RlYnVnZ2VyOyAgICAgICAgXHJcbiAgICAgICAgLy9zbHV6YmEgcHJvIHByaXN0dXAgayBkYXR1bSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgY29udGVudC5pc2wuUm96RG9rbGFkLmxpc3QoeyBmaWx0ZXJzOiBteWZpbHRyIH0pLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQocmVxKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQucHJpc3R1cG5vc3RBa2NpU2V6bmFtdShyZXN1bHQubWV0YSEsIHJlc3VsdC5kYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHNlem5hbURva2xhZHUpIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgbXlHcmlkID0gZ2V0R3JpZChjb250ZW50KTsgXHJcbiAgICAgICAgICAgICAgICBpZiAoc2V6bmFtRG9rbGFkdSAmJiBzZXpuYW1Eb2tsYWR1Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHNlem5hbURva2xhZHUsIHsga2V5OiBcIml4cFwiIH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChteUdyaWQhPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V6bmFtRG9rbGFkdSA9IFtdOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgR29yZGljLkRhdGEuVmlldyhzZXpuYW1Eb2tsYWR1LCB7IGtleTogXCJpeHBcIiB9KSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQucHJpc3R1cG5vc3RBa2NpU2V6bmFtdSh0aGF0LnBlcm1pc2lvbnMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ2YWxpZGF0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2Ygdm9iai5iYXNlVHlwZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5Fa28uSW50ZXJmYWNlLkdNZXNzYWdlRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZvYmouYmFzZU1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAvL2MuYmFzZVR5cGUgR29yZGljLkVrby5JbnRlcmZhY2UuR01lc3NhZ2VFeGNlcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZvYmouaGFuZGxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc01zZ1RzdCA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRUcmFuTWVzc2FnZSh2b2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFreSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNNc2dUc3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNNc2cgPSB0cmFuc01zZ1RzdCBhcyBFa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2VbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlpwcmFjb3ZhbmlacHJhdihjb250ZW50LCB0cmFuc01zZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5JZE1lc3NhZ2UgPT09IFwic2V6bmFtRG9rbGFkdV9xdWVcIiAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLkRlY2lzaW9uUXVlc3Rpb25NZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gJiYgdHlwZW9mIHJldHVyblZhbHVlLlJlc3VsdFF1ZXN0aW9uID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlmaWx0ci52YXJvdmFuaVZlbGtlaG9Nbm96dHZpRGF0ID0gcmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gPT09IFwiWUVTXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlmaWx0ci5pZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWxvYWQoY29udGVudCwgbXlmaWx0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFrdHVhbGl6YWNlIHphc2xhbnljaCB6YXBpc3UgeiBEQiBkbyBncmlkdVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBkb2tsYWR5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWZyZXNoUm93c0Zyb21EQihjb250ZW50OiBHU2V6bmFtRG9rbGFkdVRhYiB8IG51bGwsIGRva2xhZHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vIGtvbnRyb2x5XHJcbiAgICAgICAgaWYgKCFkb2tsYWR5IHx8IGRva2xhZHkubGVuZ3RoID09IDApIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vIHpqaXN0ZW5pIGNvbnRlbnR1IHNlem5hbXUsIHBva3VkIG5lbmkgemFkYW5vXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSB1bmRlZmluZWQgfHwgY29udGVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgY29udGVudCA9IEdldENvbnRlbnRTZXpuYW0oKTtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCB8fCBjb250ZW50LmNsb3NlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gemppc3RlbmkgZ3JpZHVcclxuICAgICAgICBsZXQgZ3JpZCA9IGdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vIHpqaXN0ZW5pIHZpZXdcclxuICAgICAgICBsZXQgdmlldyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpO1xyXG4gICAgICAgIGlmICh2aWV3ID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHBvbGVJeHAgPSBkb2tsYWR5Lm1hcCgocmFkZWspID0+IHJhZGVrLml4cCEpO1xyXG4gICAgICAgIHJldHVybiB2aWV3LnJlcXVlc3REYXRhKHsgRmlsdGVyczogeyBpeHA6IHsgbzogXCJJTlwiLCB2OiBwb2xlSXhwIH0gfSB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjb250ZW50Py5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBnZXRHcmlkKGNvbnRlbnQpPy5nZ3JpZChcImFjdGl2ZVJvd1wiLCB7IGl4cDogZG9rbGFkeVswXS5peHAgfSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3JldHVybiBjb250ZW50LmlzbC5Sb3pEb2tsYWQubGlzdCh7IGl4cDogeyBvOiBcIklOXCIsIHY6IHBvbGVJeHAgfSB9KVxyXG4gICAgICAgIC8vICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAudGhlbigoZG9rbGFkeSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyAgICAgICAgZG9rbGFkeS5mb3JFYWNoKChyYWRlaykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgUmVwbGFjZVJvdyhjb250ZW50LCByYWRlaywgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgO1xyXG4gICAgfVxyXG5cclxuXHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogWm9icmF6ZW5pIGRldGFpbHUgZGxlIHBpZHVcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBab2JyYXpEZXRhaWxJeHAoY29udGVudDogR0NvbnRlbnQsIGl4cDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpeHAgIT0gbnVsbClcclxuICAgICAgICAgICAgR29yZGljLlJvei5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQKGNvbnRlbnQsIGl4cCwgbnVsbCwgZmFsc2UsIGZhbHNlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAyNzRcIiwgLy9SQyAzMDI1MDI3NCA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjc1XCIpOyAgLy9SQyAzMDI1MDI3NSA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICBBa3R1YWxpemFjZSBrb25rcmV0bmljaCByYWRrdVxyXG4gICAgICogICAgXHJcbiAgICAgKiBmdW5jdGlvbiByZWZyZXNSb3dcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b1tdfSBkb2tsYWR5XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlZnJlc1Jvd3MoY29udGVudDogR0NvbnRlbnQsIGRva2xhZHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pWeWJyYW55RG9rbGFkRHRvW10pIHtcclxuXHJcbiAgICAgICAgZG9rbGFkeS5mb3JFYWNoKChyYWRlaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJhZGVrLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGVrQWt0ID0gTmFqZGlSYWRlayhyYWRlay5peHAgYXMgYW55KSBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0bztcclxuICAgICAgICAgICAgICAgIHJhZGVrQWt0LnNfemF1ID0gcmFkZWsuc196YXU7XHJcbiAgICAgICAgICAgICAgICByYWRla0FrdC5zX3phdV90eHQgPSByYWRlay5zX3phdV90eHQ7XHJcbiAgICAgICAgICAgICAgICByYWRla0FrdC5zX3phdSA9IHJhZGVrLnNfemF1O1xyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Sb3ouV2ViQ2xpZW50LlJlcGxhY2VSb3coY29udGVudCwgcmFkZWtBa3QsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVwbGFjZVJvdyhjb250ZW50LCByYWRla0FrdCwgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiBOYWN0ZW5pIGRva2xhZHUgayBwcmV2emV0aVxyXG4gICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFNldERhdGFTZWxlY3RlZChzZWxlY3RlZFJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pWeWJyYW55RG9rbGFkRHRvW10pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pWeWJyYW55RG9rbGFkRHRvW10+IHtcclxuICAgICAgICBzZWxlY3RlZFJvd3MuZm9yRWFjaCgocm93KSA9PiB7IHJvdy53aXpfY2hlY2sgPSB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShzZWxlY3RlZFJvd3MpLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb2hsZWRhaSByYWRrdVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBpZERva2xhZHVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBOYWpkaVJhZGVrKHBpZERva2xhZHU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzZXpuYW0gPSBHZXRDb250ZW50U2V6bmFtKCk7XHJcbiAgICAgICAgaWYgKHNlem5hbSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldFZpZXcoZ2V0R3JpZChzZXpuYW0pKS5maW5kQnlLZXkocGlkRG9rbGFkdSk7XHJcbiAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAvL3ZhciByYWRlayA9ICQuY29udGVudChcIlVDVFNlem5hbWRva2xhZHUjXCIpLnZpZXcuZmluZEJ5S2V5KHBpZERva2xhZHUsIGZhbHNlKTtcclxuICAgICAgICBpZiAocmFkZWspXHJcbiAgICAgICAgICAgIHJldHVybiByYWRlaztcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRJeHBEZW4oY29udGVudDogR1Nlem5hbURva2xhZHVUYWIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5la29Cb29rPy5peHBfZGVuIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gXHJcbn0iXX0=