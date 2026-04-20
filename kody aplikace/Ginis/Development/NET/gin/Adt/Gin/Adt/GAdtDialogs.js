//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adt.Dialogs.ts						</Name>
//    <Description> Volání ADT dialogů							</Description>
//    <Author>      Tomáš Hažmuka								</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018			</Copyright>
//    <Created>     2018-11-07                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Adt;
    (function (Adt) {
        var Dialogs;
        (function (Dialogs) {
            /**
            * Dialog detailu balíčku
            *
            * @author  Tomáš Hažmuka
            * @date    07.11.2018
            *
            * @param   parentContent                  The content.
            * @param   ModOtevreni                    mod otevreni dialogu.
            * @return  .
            */
            function DetailBalickuDlg(parentContent, opt, ModOtevreni) {
                var options = {
                    ID: "ADTDetailBalicku#",
                    Ixs_gdt: opt ? opt.Ixs_gdt : undefined,
                };
                var deferred = $.Deferred();
                var pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                var isValid = true;
                if (isValid) {
                    Gordic.Gin.Dialogs._openDialog(pContent, deferred, 'Gordic.Adt.WebControls.DetailBalicku', ModOtevreni, options);
                }
                else {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Dialogs.DetailBalickuDlg = DetailBalickuDlg;
        })(Dialogs = Adt.Dialogs || (Adt.Dialogs = {}));
    })(Adt = Gordic.Adt || (Gordic.Adt = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GAdtDialogs.js.map