"use strict";
var Gordic;
(function (Gordic) {
    var Sko;
    (function (Sko) {
        var WebApp;
        (function (WebApp) {
            class GEvidCisSkoGuesser extends Gordic.Utils.GBaseTypeGuesser {
                constructor() {
                    super(...arguments);
                    this.type = "evidCis";
                }
                guess(input) {
                    if (input.length >= 13 && (input.match('^[0-9]+$') && input.length <= 15))
                        return [{ type: this.type, confidence: 1, parsed: input }];
                    else
                        return [{ type: this.type, confidence: 0 }];
                }
            }
            WebApp.GEvidCisSkoGuesser = GEvidCisSkoGuesser;
        })(WebApp = Sko.WebApp || (Sko.WebApp = {}));
    })(Sko = Gordic.Sko || (Gordic.Sko = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0V2aWRDaXNTa29HdWVzc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0V2aWRDaXNTa29HdWVzc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FTZjtBQVRELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQVNuQjtJQVRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0FTMUI7UUFUb0IsV0FBQSxNQUFNO1lBQ3ZCLE1BQWEsa0JBQW1CLFNBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQXJFOztvQkFDSSxTQUFJLEdBQUcsU0FBUyxDQUFBO2dCQU1wQixDQUFDO2dCQUxHLEtBQUssQ0FBQyxLQUFhO29CQUVmLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO3dCQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7O3dCQUNoSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckQsQ0FBQzthQUNKO1lBUFkseUJBQWtCLHFCQU85QixDQUFBO1FBQ0wsQ0FBQyxFQVRvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUFTMUI7SUFBRCxDQUFDLEVBVGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQVNuQjtBQUFELENBQUMsRUFUUyxNQUFNLEtBQU4sTUFBTSxRQVNmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Ta28uV2ViQXBwIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHRXZpZENpc1Nrb0d1ZXNzZXIgZXh0ZW5kcyBHb3JkaWMuVXRpbHMuR0Jhc2VUeXBlR3Vlc3NlciB7XHJcbiAgICAgICAgdHlwZSA9IFwiZXZpZENpc1wiXHJcbiAgICAgICAgZ3Vlc3MoaW5wdXQ6IHN0cmluZyk6IEdvcmRpYy5VdGlscy5JR1R5cGVHdWVzc1tdIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA+PSAxMyAmJiAoaW5wdXQubWF0Y2goJ15bMC05XSskJykgJiYgaW5wdXQubGVuZ3RoIDw9IDE1KSkgcmV0dXJuIFt7IHR5cGU6IHRoaXMudHlwZSwgY29uZmlkZW5jZTogMSwgcGFyc2VkOiBpbnB1dCB9XVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiBbeyB0eXBlOiB0aGlzLnR5cGUsIGNvbmZpZGVuY2U6IDAgfV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19