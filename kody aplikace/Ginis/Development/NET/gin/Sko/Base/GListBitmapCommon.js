"use strict";
var Gordic;
(function (Gordic) {
    var Sko;
    (function (Sko) {
        var Globals;
        (function (Globals) {
            var ListSupport;
            (function (ListSupport) {
                function WarningColumn() {
                    return {
                        name: "warn_ico",
                        caption: " ",
                        //description: "jres:25200019", //RC 25200019 : Obrázek elektronického dokumentu
                        width: 40,
                        customClass: "center",
                        fixedWidth: true,
                        iconTemplate: function (row) {
                            if (row["mat_c_celk_sko"] == null) {
                                return { icon: "fa-exclamation-triangle g-state-text g-state-error", tooltip: "Není uvedena výše škody!" };
                            }
                            return null;
                        }
                    };
                }
                ListSupport.WarningColumn = WarningColumn;
            })(ListSupport = Globals.ListSupport || (Globals.ListSupport = {}));
        })(Globals = Sko.Globals || (Sko.Globals = {}));
    })(Sko = Gordic.Sko || (Gordic.Sko = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0xpc3RCaXRtYXBDb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTGlzdEJpdG1hcENvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBbUJmO0FBbkJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1CbkI7SUFuQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsT0FBTyxDQW1CM0I7UUFuQm9CLFdBQUEsT0FBTztZQUFDLElBQUEsV0FBVyxDQW1CdkM7WUFuQjRCLFdBQUEsV0FBVztnQkFFcEMsU0FBZ0IsYUFBYTtvQkFDekIsT0FBTzt3QkFDSCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osZ0ZBQWdGO3dCQUNoRixLQUFLLEVBQUUsRUFBRTt3QkFDVCxXQUFXLEVBQUUsUUFBUTt3QkFDckIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLFlBQVksRUFBRSxVQUFVLEdBQVE7NEJBQzVCLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQ2hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsb0RBQW9ELEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUM7NEJBQy9HLENBQUM7NEJBQ0QsT0FBTyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7cUJBQ0osQ0FBQTtnQkFDTCxDQUFDO2dCQWZlLHlCQUFhLGdCQWU1QixDQUFBO1lBRUwsQ0FBQyxFQW5CNEIsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFtQnZDO1FBQUQsQ0FBQyxFQW5Cb0IsT0FBTyxHQUFQLFdBQU8sS0FBUCxXQUFPLFFBbUIzQjtJQUFELENBQUMsRUFuQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1CbkI7QUFBRCxDQUFDLEVBbkJTLE1BQU0sS0FBTixNQUFNLFFBbUJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Ta28uR2xvYmFscy5MaXN0U3VwcG9ydCB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFdhcm5pbmdDb2x1bW4oKTogR0dyaWRDb2x1bW48YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogXCJ3YXJuX2ljb1wiLFxyXG4gICAgICAgICAgICBjYXB0aW9uOiBcIiBcIixcclxuICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJqcmVzOjI1MjAwMDE5XCIsIC8vUkMgMjUyMDAwMTkgOiBPYnLDoXplayBlbGVrdHJvbmlja8OpaG8gZG9rdW1lbnR1XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKHJvdzogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93W1wibWF0X2NfY2Vsa19za29cIl0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgdG9vbHRpcDogXCJOZW7DrSB1dmVkZW5hIHbDvcWhZSDFoWtvZHkhXCIgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==