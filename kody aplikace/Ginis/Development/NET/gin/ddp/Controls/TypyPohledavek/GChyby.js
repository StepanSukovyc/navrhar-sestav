"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GChyby.ts                              </Name>
//    <Description> Chyby - seznam                                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GChyby = class GChyby extends Gordic.GContentBase {
                        onContentReady() {
                            $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.Chyby.chyby.map(x => { return { chyba: x }; }),
                                columns: new Gordic.Data.GridFormat()
                                    .add({ name: "chyba", caption: "Chyba" })
                            });
                            //this.showFlash(this.Chyby.zprava!, "g-state-error");
                            this.showFlash(this.Chyby.zprava, "error");
                        }
                    };
                    GChyby = __decorate([
                        Decorators.gcontent
                    ], GChyby);
                    TypyPohledavek.GChyby = GChyby;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0NoeWJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0NoeWJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBc0JmO0FBdEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXNCbkI7SUF0QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXNCN0I7UUF0Qm9CLFdBQUEsU0FBUztZQUFDLElBQUEsUUFBUSxDQXNCdEM7WUF0QjhCLFdBQUEsUUFBUTtnQkFBQyxJQUFBLGNBQWMsQ0FzQnJEO2dCQXRCdUMsV0FBQSxjQUFjO29CQUdsRCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFPLFNBQVEsT0FBQSxZQUFZO3dCQUlwQyxjQUFjOzRCQUVWLENBQUMsQ0FBQyxPQUFPLENBQUM7aUNBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUNBQ3RCLFFBQVEsRUFBRTtpQ0FDVixLQUFLLENBQUM7Z0NBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3FDQUNoQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs2QkFDaEQsQ0FBQyxDQUFDOzRCQUVQLHNEQUFzRDs0QkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQztxQkFDSixDQUFBO29CQWxCWSxNQUFNO3dCQURsQixVQUFVLENBQUMsUUFBUTt1QkFDUCxNQUFNLENBa0JsQjtvQkFsQlkscUJBQU0sU0FrQmxCLENBQUE7Z0JBQ0wsQ0FBQyxFQXRCdUMsY0FBYyxHQUFkLHVCQUFjLEtBQWQsdUJBQWMsUUFzQnJEO1lBQUQsQ0FBQyxFQXRCOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUFzQnRDO1FBQUQsQ0FBQyxFQXRCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc0I3QjtJQUFELENBQUMsRUF0QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNCbkI7QUFBRCxDQUFDLEVBdEJTLE1BQU0sS0FBTixNQUFNLFFBc0JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdDaHlieS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDaHlieSAtIHNlem5hbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAxLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlayB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQ2h5YnkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwdWJsaWMgQ2h5Ynk6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuQ2h5YnkuY2h5YnkhLm1hcCh4ID0+IHsgcmV0dXJuIHsgY2h5YmE6IHggfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoeyBuYW1lOiBcImNoeWJhXCIsIGNhcHRpb246IFwiQ2h5YmFcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd0ZsYXNoKHRoaXMuQ2h5YnkuenByYXZhISwgXCJnLXN0YXRlLWVycm9yXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh0aGlzLkNoeWJ5LnpwcmF2YSEsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19