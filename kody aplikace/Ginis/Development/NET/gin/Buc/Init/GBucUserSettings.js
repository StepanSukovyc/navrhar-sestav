"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GBucUserSettings.ts                    </Name>
//    <Description> Uživatelské nastavení                                       </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-09-30                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Definice formulářů pro uživatelské nastavení
             *
             * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
             * @returns {Forms.Form[]} formuláře
             */
            function ListsSettingsForm(gin_gen_ixp) {
                return [
                    // standardní uživatelské nastavení WFL a EKO
                    Gordic.Report.WebClient.GReportsUserSettings(),
                    Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                    //Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                    Gordic.Eko.Utils.EkoUserSettingsPid(gin_gen_ixp),
                    Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                    Gordic.Eko.Utils.EkoUserSettingsList(),
                    // další uživatelské nastavení specifické pro modul
                    //UserSettingsDoklad(ico),
                ];
            }
            AppSettings.ListsSettingsForm = ListsSettingsForm;
        })(AppSettings = Buc.AppSettings || (Buc.AppSettings = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0J1Y1VzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdCdWNVc2VyU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUdqQixJQUFVLE1BQU0sQ0FxQmY7QUFyQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUJuQjtJQXJCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxXQUFXLENBcUIvQjtRQXJCb0IsV0FBQSxXQUFXO1lBQzVCOzs7OztlQUtHO1lBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsV0FBbUI7Z0JBRWpELE9BQU87b0JBQ0gsNkNBQTZDO29CQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMEJBQTBCLEVBQUU7b0JBQ25ELG1EQUFtRDtvQkFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO29CQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRTtvQkFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3RDLG1EQUFtRDtvQkFDbkQsMEJBQTBCO2lCQUM3QixDQUFDO1lBQ04sQ0FBQztZQWJlLDZCQUFpQixvQkFhaEMsQ0FBQTtRQUNMLENBQUMsRUFyQm9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQXFCL0I7SUFBRCxDQUFDLEVBckJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxQm5CO0FBQUQsQ0FBQyxFQXJCUyxNQUFNLEtBQU4sTUFBTSxRQXFCZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0J1Y1VzZXJTZXR0aW5ncy50cyAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBVxb5pdmF0ZWxza8OpIG5hc3RhdmVuw60gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA5LTMwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5BcHBTZXR0aW5ncyB7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bMOhxZnFryBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnaW5fZ2VuX2l4cCBha3R1w6FsbsOtIGhvZG5vdGEgcGFyYW1ldHJ1IGF1dG9tYXRpY2vDqWhvIGdlbmVyb3bDoW7DrSBpZGVudGlmaWvDoXRvcnUgKGdpbl9nZW5faXhwKVxyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm1bXX0gZm9ybXVsw6HFmWVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIExpc3RzU2V0dGluZ3NGb3JtKGdpbl9nZW5faXhwOiBzdHJpbmcpOiBGb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAvLyBzdGFuZGFyZG7DrSB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw60gV0ZMIGEgRUtPXHJcbiAgICAgICAgICAgIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRzVXNlclNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQXR0YWNobWVudE9wZW5TZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgLy9Hb3JkaWMuV2ZsLkFwcFNldHRpbmdzLkNvbG9yUGlja2VyU2V0dGluZ3NGb3JtKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzUGlkKGdpbl9nZW5faXhwKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzTGlzdCgpLFxyXG4gICAgICAgICAgICAvLyBkYWzFocOtIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrSBzcGVjaWZpY2vDqSBwcm8gbW9kdWxcclxuICAgICAgICAgICAgLy9Vc2VyU2V0dGluZ3NEb2tsYWQoaWNvKSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==