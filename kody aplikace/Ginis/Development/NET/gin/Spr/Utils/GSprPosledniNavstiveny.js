"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var Globals;
        (function (Globals) {
            var PosledniNavstiveny;
            (function (PosledniNavstiveny) {
                function pridejPosledniNavstiveny(globalSettings, detailSSL) {
                    if (globalSettings == null) {
                        return;
                    }
                    //let l_nPDok = 0; // dokument
                    //if (detailSSL.SEle == 1) {
                    //    l_nPDok = 1; // el. dokument
                    //} else if (detailSSL.SEle == 2) {
                    //    l_nPDok = 2; // el. dokument
                    //}
                    //if (detailSSL.PrizSpis == 1) {
                    //    l_nPDok = 3;
                    //}
                    let data = globalSettings.get("contents.SPRHistorieNavstivenychDokumentuDlg#.HistNavstivDok", true) || [];
                    //vytvorim novy
                    var pridatNovyZaznam = true;
                    var novyDoc = {
                        ixp: detailSSL.Ixp,
                        vec: detailSSL.Nazev,
                        akt_znacka: detailSSL.AktZnacka,
                        //type: l_nPDok,
                        nazev_dsr: detailSSL.NazevDsr,
                    };
                    //najdu stejny
                    let lastIndex = 99999;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].ixp == novyDoc.ixp) {
                            lastIndex = i;
                        }
                    }
                    if (lastIndex == 0) {
                        pridatNovyZaznam = false;
                    }
                    //vymazu stejny nebo poslední
                    if (lastIndex != 99999) {
                        data.splice(lastIndex, 1);
                    }
                    else if (data.length === 15) {
                        data.splice(14, 1);
                    }
                    if (pridatNovyZaznam) {
                        data.unshift(novyDoc);
                        globalSettings.set("contents.SPRHistorieNavstivenychDokumentuDlg#.HistNavstivDok", data);
                    }
                }
                PosledniNavstiveny.pridejPosledniNavstiveny = pridejPosledniNavstiveny;
            })(PosledniNavstiveny = Globals.PosledniNavstiveny || (Globals.PosledniNavstiveny = {}));
        })(Globals = Spr.Globals || (Spr.Globals = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NwclBvc2xlZG5pTmF2c3RpdmVueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTcHJQb3NsZWRuaU5hdnN0aXZlbnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQXVFZjtBQXZFRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1RW5CO0lBdkVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0F1RTNCO1FBdkVvQixXQUFBLE9BQU87WUFBQyxJQUFBLGtCQUFrQixDQXVFOUM7WUF2RTRCLFdBQUEsa0JBQWtCO2dCQW1CM0MsU0FBZ0Isd0JBQXdCLENBQUMsY0FBd0QsRUFBRSxTQUF1QztvQkFDdEksSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ3pCLE9BQU87b0JBQ1gsQ0FBQztvQkFFRCw4QkFBOEI7b0JBRTlCLDRCQUE0QjtvQkFDNUIsa0NBQWtDO29CQUNsQyxtQ0FBbUM7b0JBQ25DLGtDQUFrQztvQkFDbEMsR0FBRztvQkFDSCxnQ0FBZ0M7b0JBQ2hDLGtCQUFrQjtvQkFDbEIsR0FBRztvQkFDSCxJQUFJLElBQUksR0FBNEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRW5JLGVBQWU7b0JBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzVCLElBQUksT0FBTyxHQUEwQjt3QkFDakMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHO3dCQUNsQixHQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUs7d0JBQ3BCLFVBQVUsRUFBRSxTQUFTLENBQUMsU0FBUzt3QkFDL0IsZ0JBQWdCO3dCQUNoQixTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVE7cUJBQ2hDLENBQUE7b0JBRUQsY0FBYztvQkFDZCxJQUFJLFNBQVMsR0FBVyxLQUFLLENBQUM7b0JBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQzdCLFNBQVMsR0FBRyxDQUFDLENBQUM7d0JBQ2xCLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFBO29CQUM1QixDQUFDO29CQUVELDZCQUE2QjtvQkFDN0IsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QixDQUFDO3lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLENBQUM7b0JBRUQsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO3dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0QixjQUFjLENBQUMsR0FBRyxDQUFDLDhEQUE4RCxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM3RixDQUFDO2dCQUNMLENBQUM7Z0JBakRlLDJDQUF3QiwyQkFpRHZDLENBQUE7WUFHTCxDQUFDLEVBdkU0QixrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQXVFOUM7UUFBRCxDQUFDLEVBdkVvQixPQUFPLEdBQVAsV0FBTyxLQUFQLFdBQU8sUUF1RTNCO0lBQUQsQ0FBQyxFQXZFZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdUVuQjtBQUFELENBQUMsRUF2RVMsTUFBTSxLQUFOLE1BQU0sUUF1RWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5HbG9iYWxzLlBvc2xlZG5pTmF2c3RpdmVueSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIERhdGFQcm9Qb3NsZWRuaU5hdnN0aXZlbnlTcHIge1xyXG4gICAgICAgIC8vU0VsZTogbnVtYmVyXHJcbiAgICAgICAgLy9Qcml6U3BpczogbnVtYmVyXHJcbiAgICAgICAgSXhwOiBzdHJpbmdcclxuICAgICAgICBOYXpldjogc3RyaW5nXHJcbiAgICAgICAgQWt0Wm5hY2thOiBzdHJpbmdcclxuICAgICAgICBOYXpldkRzcjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUG9zbGVkbmlOYXZzdGl2ZW55U3ByIHtcclxuICAgICAgICBpeHA6IHN0cmluZ1xyXG4gICAgICAgIC8vdHlwZTogbnVtYmVyXHJcbiAgICAgICAgdmVjOiBzdHJpbmdcclxuICAgICAgICBwb3JhZGk/OiBudW1iZXJcclxuICAgICAgICBha3Rfem5hY2thOiBzdHJpbmdcclxuICAgICAgICBuYXpldl9kc3I6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcHJpZGVqUG9zbGVkbmlOYXZzdGl2ZW55KGdsb2JhbFNldHRpbmdzOiBHb3JkaWMuRGF0YS5JR1N0b3JhZ2UgfCBudWxsIHwgdW5kZWZpbmVkLCBkZXRhaWxTU0w6IERhdGFQcm9Qb3NsZWRuaU5hdnN0aXZlbnlTcHIpIHtcclxuICAgICAgICBpZiAoZ2xvYmFsU2V0dGluZ3MgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xldCBsX25QRG9rID0gMDsgLy8gZG9rdW1lbnRcclxuXHJcbiAgICAgICAgLy9pZiAoZGV0YWlsU1NMLlNFbGUgPT0gMSkge1xyXG4gICAgICAgIC8vICAgIGxfblBEb2sgPSAxOyAvLyBlbC4gZG9rdW1lbnRcclxuICAgICAgICAvL30gZWxzZSBpZiAoZGV0YWlsU1NMLlNFbGUgPT0gMikge1xyXG4gICAgICAgIC8vICAgIGxfblBEb2sgPSAyOyAvLyBlbC4gZG9rdW1lbnRcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2lmIChkZXRhaWxTU0wuUHJpelNwaXMgPT0gMSkge1xyXG4gICAgICAgIC8vICAgIGxfblBEb2sgPSAzO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIGxldCBkYXRhOiBQb3NsZWRuaU5hdnN0aXZlbnlTcHJbXSA9IGdsb2JhbFNldHRpbmdzLmdldChcImNvbnRlbnRzLlNQUkhpc3RvcmllTmF2c3RpdmVueWNoRG9rdW1lbnR1RGxnIy5IaXN0TmF2c3RpdkRva1wiLCB0cnVlKSB8fCBbXTtcclxuXHJcbiAgICAgICAgLy92eXR2b3JpbSBub3Z5XHJcbiAgICAgICAgdmFyIHByaWRhdE5vdnlaYXpuYW0gPSB0cnVlO1xyXG4gICAgICAgIHZhciBub3Z5RG9jOiBQb3NsZWRuaU5hdnN0aXZlbnlTcHIgPSB7XHJcbiAgICAgICAgICAgIGl4cDogZGV0YWlsU1NMLkl4cCxcclxuICAgICAgICAgICAgdmVjOiBkZXRhaWxTU0wuTmF6ZXYsXHJcbiAgICAgICAgICAgIGFrdF96bmFja2E6IGRldGFpbFNTTC5Ba3RabmFja2EsXHJcbiAgICAgICAgICAgIC8vdHlwZTogbF9uUERvayxcclxuICAgICAgICAgICAgbmF6ZXZfZHNyOiBkZXRhaWxTU0wuTmF6ZXZEc3IsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25hamR1IHN0ZWpueVxyXG4gICAgICAgIGxldCBsYXN0SW5kZXg6IG51bWJlciA9IDk5OTk5O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5peHAgPT0gbm92eURvYy5peHApIHtcclxuICAgICAgICAgICAgICAgIGxhc3RJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHByaWRhdE5vdnlaYXpuYW0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92eW1henUgc3Rlam55IG5lYm8gcG9zbGVkbsOtXHJcbiAgICAgICAgaWYgKGxhc3RJbmRleCAhPSA5OTk5OSkge1xyXG4gICAgICAgICAgICBkYXRhLnNwbGljZShsYXN0SW5kZXgsIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgICAgIGRhdGEuc3BsaWNlKDE0LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcmlkYXROb3Z5WmF6bmFtKSB7XHJcbiAgICAgICAgICAgIGRhdGEudW5zaGlmdChub3Z5RG9jKTtcclxuICAgICAgICAgICAgZ2xvYmFsU2V0dGluZ3Muc2V0KFwiY29udGVudHMuU1BSSGlzdG9yaWVOYXZzdGl2ZW55Y2hEb2t1bWVudHVEbGcjLkhpc3ROYXZzdGl2RG9rXCIsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59Il19