"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ado;
    (function (Ado) {
        var WebClient;
        (function (WebClient) {
            let MainApp = class MainApp extends Gordic.GContentBase {
                onContentReady() {
                    Gordic.Dashboard.CustomProviders.register(Gordic.Adx.WebControls.GAdxDashboardViews.createUserInfo(this.userInfo));
                    Gordic.Dashboard.CustomProviders.register(Gordic.Adx.WebControls.GAdxDashboardViews.createPosledniPouzite(() => {
                        return this.globalSettings ?? null;
                    }));
                    Gordic.Dashboard.CustomProviders.register(Gordic.Adx.WebControls.GAdxDashboardViews.createPosledniSeznamy(() => {
                        return this.globalSettings ?? null;
                    }));
                }
            };
            MainApp = __decorate([
                Decorators.gcontent
            ], MainApp);
            WebClient.MainApp = MainApp;
        })(WebClient = Ado.WebClient || (Ado.WebClient = {}));
    })(Ado = Gordic.Ado || (Gordic.Ado = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvLndlYmFwcC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBaUJmO0FBakJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlCbkI7SUFqQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlCN0I7UUFqQm9CLFdBQUEsU0FBUztZQUUxQixJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEsT0FBQSxZQUFZO2dCQUdyQyxjQUFjO29CQUNWLE9BQUEsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1RyxPQUFBLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRTt3QkFDcEcsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQTtvQkFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDSixPQUFBLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRTt3QkFDcEcsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQTtvQkFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUixDQUFDO2FBRUosQ0FBQTtZQWRZLE9BQU87Z0JBRG5CLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsT0FBTyxDQWNuQjtZQWRZLGlCQUFPLFVBY25CLENBQUE7UUFDTCxDQUFDLEVBakJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpQjdCO0lBQUQsQ0FBQyxFQWpCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaUJuQjtBQUFELENBQUMsRUFqQlMsTUFBTSxLQUFOLE1BQU0sUUFpQmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkFkby5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICB1c2VySW5mbzogR29yZGljLkFkeC5XZWJDb250cm9scy5HQWR4TG9naW5EdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBEYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXJzLnJlZ2lzdGVyKEdvcmRpYy5BZHguV2ViQ29udHJvbHMuR0FkeERhc2hib2FyZFZpZXdzLmNyZWF0ZVVzZXJJbmZvKHRoaXMudXNlckluZm8pKTtcclxuICAgICAgICAgICAgRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVycy5yZWdpc3RlcihHb3JkaWMuQWR4LldlYkNvbnRyb2xzLkdBZHhEYXNoYm9hcmRWaWV3cy5jcmVhdGVQb3NsZWRuaVBvdXppdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsU2V0dGluZ3MgPz8gbnVsbFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIERhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoR29yZGljLkFkeC5XZWJDb250cm9scy5HQWR4RGFzaGJvYXJkVmlld3MuY3JlYXRlUG9zbGVkbmlTZXpuYW15KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbFNldHRpbmdzID8/IG51bGxcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxufSJdfQ==