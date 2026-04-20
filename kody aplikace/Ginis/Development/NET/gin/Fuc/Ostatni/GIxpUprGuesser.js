"use strict";
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            /**
             * Guesser pro PIDu případu
             *
             * @author Martin Boček
             * @since 52530.15
             */
            class GIxpUprGuesser extends Gordic.Utils.GBaseTypeGuesser {
                constructor() {
                    super(...arguments);
                    this.type = "ixp";
                }
                guess(input) {
                    new Gordic.Validators.Ixs();
                    if (input.length > 0 && (input.match('^[A-Z0-9]+$') && input.length <= 12)) {
                        var confidence = input.length / 12;
                        if (input.length == 12)
                            confidence = new Gordic.Validators.Ixs({ pid: true }).validate(input, $("<div>")) ? 1 : 0;
                        return [{ type: this.type, confidence: confidence, parsed: input }];
                    }
                    return [{ type: this.type, confidence: 0 }];
                }
            }
            WebClient.GIxpUprGuesser = GIxpUprGuesser;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0l4cFVwckd1ZXNzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHSXhwVXByR3Vlc3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeUJmO0FBekJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlCbkI7SUF6QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXlCN0I7UUF6Qm9CLFdBQUEsU0FBUztZQUUxQjs7Ozs7ZUFLRztZQUNILE1BQWEsY0FBZSxTQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2dCQUFqRTs7b0JBRUksU0FBSSxHQUFHLEtBQUssQ0FBQTtnQkFjaEIsQ0FBQztnQkFaRyxLQUFLLENBQUMsS0FBYTtvQkFFZixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUE7b0JBRTNCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDekUsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7d0JBQ25DLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFOzRCQUFFLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xILE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7b0JBQ3ZFLENBQUM7b0JBRUQsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7YUFDSjtZQWhCWSx3QkFBYyxpQkFnQjFCLENBQUE7UUFDTCxDQUFDLEVBekJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5QjdCO0lBQUQsQ0FBQyxFQXpCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeUJuQjtBQUFELENBQUMsRUF6QlMsTUFBTSxLQUFOLE1BQU0sUUF5QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkZ1Yy5XZWJDbGllbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR3Vlc3NlciBwcm8gUElEdSBwxZnDrXBhZHVcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gQm/EjWVrXHJcbiAgICAgKiBAc2luY2UgNTI1MzAuMTVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdJeHBVcHJHdWVzc2VyIGV4dGVuZHMgR29yZGljLlV0aWxzLkdCYXNlVHlwZUd1ZXNzZXIge1xyXG5cclxuICAgICAgICB0eXBlID0gXCJpeHBcIlxyXG5cclxuICAgICAgICBndWVzcyhpbnB1dDogc3RyaW5nKTogR29yZGljLlV0aWxzLklHVHlwZUd1ZXNzW10ge1xyXG5cclxuICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkl4cygpXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCAmJiAoaW5wdXQubWF0Y2goJ15bQS1aMC05XSskJykgJiYgaW5wdXQubGVuZ3RoIDw9IDEyKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZGVuY2UgPSBpbnB1dC5sZW5ndGggLyAxMjtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5sZW5ndGggPT0gMTIpIGNvbmZpZGVuY2UgPSBuZXcgR29yZGljLlZhbGlkYXRvcnMuSXhzKHsgcGlkOiB0cnVlIH0pLnZhbGlkYXRlKGlucHV0LCAkKFwiPGRpdj5cIikpID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3sgdHlwZTogdGhpcy50eXBlLCBjb25maWRlbmNlOiBjb25maWRlbmNlLCBwYXJzZWQ6IGlucHV0IH1dXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbeyB0eXBlOiB0aGlzLnR5cGUsIGNvbmZpZGVuY2U6IDAgfV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19