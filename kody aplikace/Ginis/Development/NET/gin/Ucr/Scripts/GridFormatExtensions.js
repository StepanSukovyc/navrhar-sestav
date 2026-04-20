"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            //export interface GUcrDetailStavExtendedGridFormat extends Gordic.Data.GridFormat {
            //    addMyCol: (column: GGridColumn, valPropName: string, typePropName: string) => GUcrDetailStavExtendedGridFormat;
            //}
            class GUcrStavRadkuGridFormat extends Gordic.Data.GridFormat {
                addStavRadkuCol(column, valPropName, typePropName) {
                    column.cellTemplate = function (data, metarow) {
                        //console.log("myCol", metarow);
                        var customClass = "";
                        var value = data[valPropName];
                        var type = data[typePropName];
                        switch (type) {
                            case "number":
                                customClass = "right";
                                value = Gordic.Templates.Formatters.number(value);
                                break;
                            case "currency":
                                customClass = "right";
                                value = Gordic.Templates.Formatters.number(value, "C2");
                                break;
                            case "datetime":
                                value = Gordic.Templates.Formatters.datetime(value);
                                break;
                            case "date":
                                value = Gordic.Templates.Formatters.date(value);
                                break;
                            case "string":
                                value = Gordic.Templates.Formatters.encode(Gordic.Templates.Formatters.trim(value));
                                break;
                            default:
                                throw new Error("Type is not supported");
                        }
                        return String.Format("<span class='{0}' style='display: inline-block;width: 100%'>{1}</span>", customClass, value); //NOTE: Nemam jak jinak zmenit customClass nadrazeneho prvku, proto timhle hackem se styly...
                    };
                    return this.add(column);
                }
            }
            WebClient.GUcrStavRadkuGridFormat = GUcrStavRadkuGridFormat;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEZvcm1hdEV4dGVuc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHcmlkRm9ybWF0RXh0ZW5zaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBdUNmO0FBdkNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVDbkI7SUF2Q2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVDN0I7UUF2Q29CLFdBQUEsU0FBUztZQUMxQixvRkFBb0Y7WUFDcEYscUhBQXFIO1lBQ3JILEdBQUc7WUFFSCxNQUFhLHVCQUF3QixTQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBNEI7Z0JBQ2pGLGVBQWUsQ0FBQyxNQUFtQixFQUFFLFdBQW1CLEVBQUUsWUFBb0I7b0JBQzFFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsVUFBVSxJQUFJLEVBQUUsT0FBTzt3QkFDekMsZ0NBQWdDO3dCQUNoQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUU5QixRQUFRLElBQUksRUFBRSxDQUFDOzRCQUNYLEtBQUssUUFBUTtnQ0FDVCxXQUFXLEdBQUcsT0FBTyxDQUFDO2dDQUN0QixLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNsRCxNQUFNOzRCQUNWLEtBQUssVUFBVTtnQ0FDWCxXQUFXLEdBQUcsT0FBTyxDQUFDO2dDQUN0QixLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQ0FDeEQsTUFBTTs0QkFDVixLQUFLLFVBQVU7Z0NBQ1gsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDcEQsTUFBTTs0QkFDVixLQUFLLE1BQU07Z0NBQ1AsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDaEQsTUFBTTs0QkFDVixLQUFLLFFBQVE7Z0NBQ1QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDcEYsTUFBTTs0QkFDVjtnQ0FDSSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7d0JBQ2pELENBQUM7d0JBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHdFQUF3RSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLDZGQUE2RjtvQkFDck4sQ0FBQyxDQUFDO29CQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNKO1lBakNZLGlDQUF1QiwwQkFpQ25DLENBQUE7UUFDTCxDQUFDLEVBdkNvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF1QzdCO0lBQUQsQ0FBQyxFQXZDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdUNuQjtBQUFELENBQUMsRUF2Q1MsTUFBTSxLQUFOLE1BQU0sUUF1Q2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgLy9leHBvcnQgaW50ZXJmYWNlIEdVY3JEZXRhaWxTdGF2RXh0ZW5kZWRHcmlkRm9ybWF0IGV4dGVuZHMgR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAvLyAgICBhZGRNeUNvbDogKGNvbHVtbjogR0dyaWRDb2x1bW4sIHZhbFByb3BOYW1lOiBzdHJpbmcsIHR5cGVQcm9wTmFtZTogc3RyaW5nKSA9PiBHVWNyRGV0YWlsU3RhdkV4dGVuZGVkR3JpZEZvcm1hdDtcclxuICAgIC8vfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHVWNyU3RhdlJhZGt1R3JpZEZvcm1hdCBleHRlbmRzIEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R1N0YXZSYWRrdVZhbER0bz4ge1xyXG4gICAgICAgIGFkZFN0YXZSYWRrdUNvbChjb2x1bW46IEdHcmlkQ29sdW1uLCB2YWxQcm9wTmFtZTogc3RyaW5nLCB0eXBlUHJvcE5hbWU6IHN0cmluZyk6IEdVY3JTdGF2UmFka3VHcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgY29sdW1uLmNlbGxUZW1wbGF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBtZXRhcm93KSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibXlDb2xcIiwgbWV0YXJvdyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VzdG9tQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YVt2YWxQcm9wTmFtZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGRhdGFbdHlwZVByb3BOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gXCJyaWdodFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY3VycmVuY3lcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih2YWx1ZSwgXCJDMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGV0aW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZW5jb2RlKEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy50cmltKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlR5cGUgaXMgbm90IHN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuRm9ybWF0KFwiPHNwYW4gY2xhc3M9J3swfScgc3R5bGU9J2Rpc3BsYXk6IGlubGluZS1ibG9jazt3aWR0aDogMTAwJSc+ezF9PC9zcGFuPlwiLCBjdXN0b21DbGFzcywgdmFsdWUpOyAvL05PVEU6IE5lbWFtIGphayBqaW5hayB6bWVuaXQgY3VzdG9tQ2xhc3MgbmFkcmF6ZW5laG8gcHJ2a3UsIHByb3RvIHRpbWhsZSBoYWNrZW0gc2Ugc3R5bHkuLi5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19