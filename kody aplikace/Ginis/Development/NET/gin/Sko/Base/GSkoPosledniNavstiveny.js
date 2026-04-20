"use strict";
var Gordic;
(function (Gordic) {
    var Sko;
    (function (Sko) {
        var PosledniNavstiveny;
        (function (PosledniNavstiveny) {
            function pridejPosledniNavstiveny(globalSettings, detail) {
                if (globalSettings == null) {
                    return;
                }
                let data = globalSettings.get("contents.SkoHistorieNavstivenychDetailuDlg#.HistNavstivSko", true) || [];
                //vytvorim novy
                var pridatNovyZaznam = true;
                var novyZaznam = {
                    ixp: detail.ixp,
                    evidencniCislo: detail.evidencniCislo
                };
                //najdu stejny
                let lastIndex = 99999;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ixp == novyZaznam.ixp) {
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
                data.unshift(novyZaznam);
                globalSettings.set("contents.SkoHistorieNavstivenychDetailuDlg#.HistNavstivSko", data);
            }
            PosledniNavstiveny.pridejPosledniNavstiveny = pridejPosledniNavstiveny;
        })(PosledniNavstiveny = Sko.PosledniNavstiveny || (Sko.PosledniNavstiveny = {}));
    })(Sko = Gordic.Sko || (Gordic.Sko = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nrb1Bvc2xlZG5pTmF2c3RpdmVueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTa29Qb3NsZWRuaU5hdnN0aXZlbnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTZDZjtBQTdDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2Q25CO0lBN0NnQixXQUFBLEdBQUc7UUFBQyxJQUFBLGtCQUFrQixDQTZDdEM7UUE3Q29CLFdBQUEsa0JBQWtCO1lBWW5DLFNBQWdCLHdCQUF3QixDQUFDLGNBQXdELEVBQUUsTUFBb0M7Z0JBQ25JLElBQUksY0FBYyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN6QixPQUFPO2dCQUNYLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLEdBQTRCLGNBQWMsQ0FBQyxHQUFHLENBQUMsNERBQTRELEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVqSSxlQUFlO2dCQUNmLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLFVBQVUsR0FBMEI7b0JBQ3BDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztvQkFDZixjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWM7aUJBQ3hDLENBQUE7Z0JBRUQsY0FBYztnQkFDZCxJQUFJLFNBQVMsR0FBVyxLQUFLLENBQUM7Z0JBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ25DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ2hDLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDakIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFBO2dCQUM1QixDQUFDO2dCQUVELDZCQUE2QjtnQkFDN0IsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO3FCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsY0FBYyxDQUFDLEdBQUcsQ0FBQyw0REFBNEQsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBaENlLDJDQUF3QiwyQkFnQ3ZDLENBQUE7UUFDTCxDQUFDLEVBN0NvQixrQkFBa0IsR0FBbEIsc0JBQWtCLEtBQWxCLHNCQUFrQixRQTZDdEM7SUFBRCxDQUFDLEVBN0NnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2Q25CO0FBQUQsQ0FBQyxFQTdDUyxNQUFNLEtBQU4sTUFBTSxRQTZDZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU2tvLlBvc2xlZG5pTmF2c3RpdmVueSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBEYXRhUHJvUG9zbGVkbmlOYXZzdGl2ZW55U2tvIHtcclxuICAgICAgICBpeHA6IHN0cmluZ1xyXG4gICAgICAgIGV2aWRlbmNuaUNpc2xvOiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFBvc2xlZG5pTmF2c3RpdmVueVNrbyB7XHJcbiAgICAgICAgaXhwOiBzdHJpbmdcclxuICAgICAgICBldmlkZW5jbmlDaXNsbzogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHByaWRlalBvc2xlZG5pTmF2c3RpdmVueShnbG9iYWxTZXR0aW5nczogR29yZGljLkRhdGEuSUdTdG9yYWdlIHwgbnVsbCB8IHVuZGVmaW5lZCwgZGV0YWlsOiBEYXRhUHJvUG9zbGVkbmlOYXZzdGl2ZW55U2tvKSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbFNldHRpbmdzID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YTogUG9zbGVkbmlOYXZzdGl2ZW55U2tvW10gPSBnbG9iYWxTZXR0aW5ncy5nZXQoXCJjb250ZW50cy5Ta29IaXN0b3JpZU5hdnN0aXZlbnljaERldGFpbHVEbGcjLkhpc3ROYXZzdGl2U2tvXCIsIHRydWUpIHx8IFtdO1xyXG5cclxuICAgICAgICAvL3Z5dHZvcmltIG5vdnlcclxuICAgICAgICB2YXIgcHJpZGF0Tm92eVphem5hbSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG5vdnlaYXpuYW06IFBvc2xlZG5pTmF2c3RpdmVueVNrbyA9IHtcclxuICAgICAgICAgICAgaXhwOiBkZXRhaWwuaXhwLFxyXG4gICAgICAgICAgICBldmlkZW5jbmlDaXNsbzogZGV0YWlsLmV2aWRlbmNuaUNpc2xvXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25hamR1IHN0ZWpueVxyXG4gICAgICAgIGxldCBsYXN0SW5kZXg6IG51bWJlciA9IDk5OTk5O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5peHAgPT0gbm92eVphem5hbS5peHApIHtcclxuICAgICAgICAgICAgICAgIGxhc3RJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHByaWRhdE5vdnlaYXpuYW0gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92eW1henUgc3Rlam55IG5lYm8gcG9zbGVkbsOtXHJcbiAgICAgICAgaWYgKGxhc3RJbmRleCAhPSA5OTk5OSkge1xyXG4gICAgICAgICAgICBkYXRhLnNwbGljZShsYXN0SW5kZXgsIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgICAgIGRhdGEuc3BsaWNlKDE0LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS51bnNoaWZ0KG5vdnlaYXpuYW0pO1xyXG4gICAgICAgIGdsb2JhbFNldHRpbmdzLnNldChcImNvbnRlbnRzLlNrb0hpc3RvcmllTmF2c3RpdmVueWNoRGV0YWlsdURsZyMuSGlzdE5hdnN0aXZTa29cIiwgZGF0YSk7XHJcbiAgICB9XHJcbn0iXX0=