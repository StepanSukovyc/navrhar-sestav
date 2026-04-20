
//#region test prepareContent

namespace Gordic.Prr.UIWebClient {

  //  var decorator = Decorators.gcontent;
    
  //  @decorator
  //  export class GPrrCalendar extends GContentBase {
  //      private gcalendarWidget: JQuery

		///**
		// * příznak zabraňující znovuvytvoření kalendáře
		// */
  //      private openFlag: boolean

		///**
		// * otevřít kalendář
		// */
  //      private open(): void {

  //          var __this = this;

  //          if (!this.openFlag) {

  //              //#region Komponenta kalendáře

  //              let relatedElement = $(".fa-calendar.g-event-calendar").parent();

  //              /** widget kalendáře */
  //              this.gcalendarWidget = $("<div>").gcalendar({
  //                  filterButton: true,
  //                  related: relatedElement,
  //                  clock: true,
  //                  eventclick(element, data, inlinedialog) {

  //                      /** třída obsluhující události kalendáře */
  //                      let gcalendarClass = new GCalendar.Event();
  //                      gcalendarClass.editeEvent({
  //                          inlineDialog: inlinedialog,
  //                          data: data
  //                      }).done((output: string) => {
  //                          if (output !== "cancel") {
  //                              __this._refresh();
  //                          }
  //                      })
  //                  }
  //              })

  //              let buttonAddEvent = {
  //                  favorite: true,
  //                  action: new GAction({
  //                      captionVisible: GAction.captionVisibility.never,
  //                      caption: "Přidat událost",
  //                      name: "btnAddEvent",
  //                      icon: "fa-plus",
  //                      run: (event, actionContext) => {

  //                          /** server */
  //                          let server = new GContent("Gordic.Gui.WebControls.GCalendarOperationService");

  //                          server.call("ReturnIxsFun").done((ixs_fun: any) => {
  //                              /** třída obsluhující události kalendáře */
  //                              let gcalendarClass = new GCalendar.Event();
  //                              // otevřít dlg pro vytvoření nové události
  //                              gcalendarClass.createEvent({
  //                                  inlineDialog: __this.gcalendarWidget.gcalendar("getInlineDlg"),
  //                                  data: {
  //                                      ixs_fun: ixs_fun,
  //                                      dat_od: __this.gcalendarWidget.gcalendar("getDate"),
  //                                      dat_do: __this.gcalendarWidget.gcalendar("getDate"),
  //                                      cely_den: true
  //                                  }
  //                              }).done((output: string) => {
  //                                  if (output !== "cancel") {
  //                                      __this._refresh();
  //                                  }
  //                              })
  //                          });
  //                      }
  //                  })
  //              }

  //              __this.gcalendarWidget.gcalendar("addButton", [buttonAddEvent]);

  //              //#endregion

  //              this.openFlag = true;
  //          }

  //          this._refresh();

  //          this.gcalendarWidget.gcalendar("open");
  //      }

		///**
		// * připravid kontent
		// */
  //      public prepareContent(): void {

  //          let __this = this;

  //          //#region Asynchronní úloha obsluhující notifikace z událostí kalendáře (gcalendar)

  //          let async = new GCalendar.Async();

  //          async.run()		//new Date(2018,2,24,0,0)
  //          async.runAsync();

  //          //#endregion

  //          this.openFlag = false;

  //      }


		///**
		// * překreslit kalendář
		// */
  //      private _refresh(): void {

  //          let server = new GContent("Gordic.Gui.WebControls.GCalendarOperationService");
  //          server.call("LoadEvent").done((output: any) => {

  //              this.gcalendarWidget.gcalendar("addEvent", [{
  //                  name: "Systém",
  //                  data: output,
  //                  itemTemplate(options, event) {
  //                      options.color = "navy";
  //                      options.dat_od = event.dat_od;
  //                      options.dat_do = event.dat_do;
  //                      options.cely_den = event.cely_den;
  //                      options.text = event.nazev;
  //                      return options;
  //                  }
  //              }])
  //          });
  //      }
  //  }
}

//#endregion





