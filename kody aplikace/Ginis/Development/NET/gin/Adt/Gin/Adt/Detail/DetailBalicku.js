//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adt.WebControls.DetailBalicku.ts						</Name>
//    <Description> Dialog detailu balíčků										</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018							</Copyright>
//    <Created>     2018-11-06													</Created>
//  </FileHeader>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Adt;
    (function (Adt) {
        var WebControls;
        (function (WebControls) {
            var gcontent = Decorators.gcontent;
            /**
             * Dialog detailu balíčku
             */
            var DetailBalicku = /** @class */ (function (_super) {
                __extends(DetailBalicku, _super);
                function DetailBalicku() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                //#region vlastnosti
                //#endregion
                /**
                 * onContentReady
                 */
                DetailBalicku.prototype.onContentReady = function () {
                    this.showFlash("jres:32000003", "g-state-info", 5000, "id-no-implemention"); //RC 32000003 : Neimplementováno.
                    this.init();
                };
                /**
                 * init content
                 */
                DetailBalicku.prototype.init = function () {
                    this.setTitle();
                    this.createMenuBar();
                };
                /**
                 * nastavit titulek dialogu
                 */
                DetailBalicku.prototype.setTitle = function () {
                    this.newOps({
                        title: "jres:32000002" //RC 32000002 : Detail balíčku
                    });
                };
                /**
                 * vytvořit menu
                 */
                DetailBalicku.prototype.createMenuBar = function () {
                    //const menuBar: MenuParams[] = [];
                    //menuBar.push({								// definice tlačítka Detail
                    //	favorite: true,
                    //	primary: true,
                    //	action: this.actions.add(new GAction({
                    //		name: "actDetail",
                    //		icon: "gi-detail",
                    //		caption: "jres:32000002",			//RC 32000002 : Detail balíčku
                    //		run: () => {
                    //			this.showFlash("jres:32000003", "g-state-info", 5000, "id-no-implemention"); //RC 32000003 : Neimplementováno.
                    //		}
                    //	}))
                    //});
                    //this.menuBar(menuBar);
                };
                DetailBalicku = __decorate([
                    gcontent
                ], DetailBalicku);
                return DetailBalicku;
            }(Gordic.GContentBase));
            WebControls.DetailBalicku = DetailBalicku;
        })(WebControls = Adt.WebControls || (Adt.WebControls = {}));
    })(Adt = Gordic.Adt || (Gordic.Adt = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=DetailBalicku.js.map