"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Sluzba pro ukladani UCR masak
             *
             * @author bmartinek
             * @since 482.1.0.2
             */
            class GUcrMaskaService {
                constructor(options) {
                    this.options = options;
                    this.log = new Gordic.Diagnostics.GLog({ name: "GUcrMaskaService", fileName: "GUcrMaskaService.ts", authorCode: 311 });
                    //NOTE: Nelze pouzit DSebestovu sluzbu, protoze UCR prozadavek se pak spoleha na souvisejici zaznam elementu, ktere jsou ulozeny nekde samostatne
                    //this.srv = new GContent({ className: "Gordic.Gin.WebClient.GFilterStorageService" });
                    this.srv = options.parentContent.createServiceContent("Gordic.Ucr.WebClient.GUcrMaskaService");
                }
                set typSestavy(typSestavy) {
                    this.options.typSestavy = typSestavy;
                }
                get typSestavy() { return this.options.typSestavy; }
                set typ_masky(typ_masky) { this.options.typ_masky = typ_masky; }
                get typ_masky() { return this.options.typ_masky; }
                set aktitiva(aktivita) { this.options.aktivita = aktivita; }
                get aktitiva() { return this.options.aktivita; }
                //#region IGFilterStorageService implementation
                getFilters(filter) {
                    if (this.options && this.options.aktivita)
                        filter.aktivita = this.options.aktivita;
                    if (this.options && this.options.typ_masky)
                        filter.typ_masky = this.options.typ_masky;
                    if (this.options && this.options.typSestavy)
                        filter.typSestavy = this.options.typSestavy;
                    let fragments = "*";
                    if (this.options && this.options.fragments && this.options.fragments !== null)
                        fragments = this.options.fragments;
                    return this.srv.call("List", { filter: filter, fragments: fragments });
                }
                saveFilter(obj) {
                    let ixs_mas = obj.filter.ixs_mas;
                    return this.saveFilterOnly(obj)
                        .then((r) => {
                        //NOTE: Tak to ma DSebesta ve sve implementaci...nevim proc, ale at se pak radeji gfilterpanel chova stejne
                        if (r.ixs_mas === ixs_mas)
                            return this.getFilters(obj.filter);
                        return $.Deferred().resolve(r).promise();
                    });
                }
                removeFilter(obj) {
                    let filter = obj.filter;
                    if (filter && filter.typ_masky)
                        filter.typ_masky = null;
                    return this.srv.call("Delete", { ixs_mas: filter.ixs_mas })
                        .then(() => { return this.getFilters(filter); });
                }
                //#endregion
                saveFilterOnly(obj) {
                    let filter = obj.filter;
                    filter.typSestavy = this.options.typSestavy;
                    return this.srv.call("Upsert", { filter: filter });
                }
                read(ixs_mas) {
                    return this.srv.call("Read", { ixs_mas: ixs_mas });
                }
            }
            WebClient.GUcrMaskaService = GUcrMaskaService;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Vjck1hc2thU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVY3JNYXNrYVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTJGZjtBQTNGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyRm5CO0lBM0ZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyRjdCO1FBM0ZvQixXQUFBLFNBQVM7WUFTMUI7Ozs7O2VBS0c7WUFDSCxNQUFhLGdCQUFnQjtnQkFLekIsWUFBWSxPQUFnQztvQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBRXZILGlKQUFpSjtvQkFDakosdUZBQXVGO29CQUV2RixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDbkcsQ0FBQztnQkFFRCxJQUFXLFVBQVUsQ0FBQyxVQUEyRDtvQkFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELElBQVcsVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxJQUFXLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsSUFBVyxTQUFTLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRXpELElBQVcsUUFBUSxDQUFDLFFB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TSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7Z0JBQ25FLENBQUM7YUFDSjtZQTNFWSwwQkFBZ0IsbUJBMkU1QixDQUFBO1FBQ0wsQ0FBQyxFQTNGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMkY3QjtJQUFELENBQUMsRUEzRmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJGbkI7QUFBRCxDQUFDLEVBM0ZTLE1BQU0sS0FBTixNQUFNLFFBMkZmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1Vjck1hc2thU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLklHRmlsdGVyU3RvcmFnZVNlcnZpY2VPcHRpb25zIHtcclxuICAgICAgICBwYXJlbnRDb250ZW50OiBHQ29udGVudDsvL0RlbWV0ZXIsIGFsZSBuZWRhIHNlIG5pYyBkZWxhdCA6LS9cclxuICAgICAgICB0eXBTZXN0YXZ5PzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3Rhdnk7XHJcbiAgICAgICAgdHlwX21hc2t5PzogR29yZGljLkdpbi5JbnRlcmZhY2UuVHlwTWFza3lFbnVtIHwgbnVtYmVyO1xyXG4gICAgICAgIGFrdGl2aXRhPzogbnVtYmVyO1xyXG4gICAgICAgIGZyYWdtZW50czogc3RyaW5nIHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNsdXpiYSBwcm8gdWtsYWRhbmkgVUNSIG1hc2FrXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgYm1hcnRpbmVrXHJcbiAgICAgKiBAc2luY2UgNDgyLjEuMC4yXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHVWNyTWFza2FTZXJ2aWNlIGltcGxlbWVudHMgSUdGaWx0ZXJTdG9yYWdlU2VydmljZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBHVWNyTWFza2FTZXJ2aWNlT3B0aW9ucztcclxuICAgICAgICBwcml2YXRlIHNydjogR0NvbnRlbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2c6IEdvcmRpYy5EaWFnbm9zdGljcy5HTG9nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBHVWNyTWFza2FTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmxvZyA9IG5ldyBHb3JkaWMuRGlhZ25vc3RpY3MuR0xvZyh7IG5hbWU6IFwiR1Vjck1hc2thU2VydmljZVwiLCBmaWxlTmFtZTogXCJHVWNyTWFza2FTZXJ2aWNlLnRzXCIsIGF1dGhvckNvZGU6IDMxMSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vTk9URTogTmVsemUgcG91eml0IERTZWJlc3RvdnUgc2x1emJ1LCBwcm90b3plIFVDUiBwcm96YWRhdmVrIHNlIHBhayBzcG9sZWhhIG5hIHNvdXZpc2VqaWNpIHphem5hbSBlbGVtZW50dSwga3RlcmUganNvdSB1bG96ZW55IG5la2RlIHNhbW9zdGF0bmVcclxuICAgICAgICAgICAgLy90aGlzLnNydiA9IG5ldyBHQ29udGVudCh7IGNsYXNzTmFtZTogXCJHb3JkaWMuR2luLldlYkNsaWVudC5HRmlsdGVyU3RvcmFnZVNlcnZpY2VcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3J2ID0gb3B0aW9ucy5wYXJlbnRDb250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlVjci5XZWJDbGllbnQuR1Vjck1hc2thU2VydmljZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgdHlwU2VzdGF2eSh0eXBTZXN0YXZ5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMudHlwU2VzdGF2eSA9IHR5cFNlc3Rhdnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IHR5cFNlc3RhdnkoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMudHlwU2VzdGF2eTsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IHR5cF9tYXNreSh0eXBfbWFza3kpIHsgdGhpcy5vcHRpb25zLnR5cF9tYXNreSA9IHR5cF9tYXNreTsgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgdHlwX21hc2t5KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLnR5cF9tYXNreTsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IGFrdGl0aXZhKGFrdGl2aXRhKSB7IHRoaXMub3B0aW9ucy5ha3Rpdml0YSA9IGFrdGl2aXRhOyB9XHJcbiAgICAgICAgcHVibGljIGdldCBha3RpdGl2YSgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5ha3Rpdml0YTsgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSUdGaWx0ZXJTdG9yYWdlU2VydmljZSBpbXBsZW1lbnRhdGlvblxyXG5cclxuICAgICAgICBnZXRGaWx0ZXJzKGZpbHRlcjogR01hc2thRmlsdGVyRHRvKTogSlF1ZXJ5UHJvbWlzZTxHVWNyTWFza2FEdG9bXT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYWt0aXZpdGEpXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuYWt0aXZpdGEgPSB0aGlzLm9wdGlvbnMuYWt0aXZpdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy50eXBfbWFza3kpXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudHlwX21hc2t5ID0gdGhpcy5vcHRpb25zLnR5cF9tYXNreTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnR5cFNlc3RhdnkpXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudHlwU2VzdGF2eSA9IHRoaXMub3B0aW9ucy50eXBTZXN0YXZ5O1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWdtZW50cyA9IFwiKlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcmFnbWVudHMgJiYgdGhpcy5vcHRpb25zLmZyYWdtZW50cyAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50cyA9IHRoaXMub3B0aW9ucy5mcmFnbWVudHM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNydi5jYWxsPEdVY3JNYXNrYUR0b1tdPihcIkxpc3RcIiwgeyBmaWx0ZXI6IGZpbHRlciwgZnJhZ21lbnRzOiBmcmFnbWVudHMgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlRmlsdGVyKG9iajogeyBmaWx0ZXI6IEdVY3JNYXNrYUR0byB9KTogSlF1ZXJ5UHJvbWlzZTxHVWNyTWFza2FEdG8gfCBHVWNyTWFza2FEdG9bXT4ge1xyXG4gICAgICAgICAgICBsZXQgaXhzX21hcyA9IG9iai5maWx0ZXIuaXhzX21hcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZUZpbHRlck9ubHkob2JqKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IFRhayB0byBtYSBEU2ViZXN0YSB2ZSBzdmUgaW1wbGVtZW50YWNpLi4ubmV2aW0gcHJvYywgYWxlIGF0IHNlIHBhayByYWRlamkgZ2ZpbHRlcnBhbmVsIGNob3ZhIHN0ZWpuZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLml4c19tYXMgPT09IGl4c19tYXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlcnMob2JqLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVtb3ZlRmlsdGVyKG9iajogeyBmaWx0ZXI6IEdVY3JNYXNrYUR0byB9KTogSlF1ZXJ5UHJvbWlzZTxHVWNyTWFza2FEdG9bXT4ge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gb2JqLmZpbHRlcjtcclxuICAgICAgICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIudHlwX21hc2t5KSBmaWx0ZXIudHlwX21hc2t5ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3J2LmNhbGw8dm9pZD4oXCJEZWxldGVcIiwgeyBpeHNfbWFzOiBmaWx0ZXIuaXhzX21hcyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5nZXRGaWx0ZXJzKGZpbHRlcik7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHNhdmVGaWx0ZXJPbmx5KG9iajogeyBmaWx0ZXI6IEdVY3JNYXNrYUR0byB9KTogSlF1ZXJ5UHJvbWlzZTxHVWNyTWFza2FEdG8+IHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlciA9IG9iai5maWx0ZXI7XHJcbiAgICAgICAgICAgIGZpbHRlci50eXBTZXN0YXZ5ID0gdGhpcy5vcHRpb25zLnR5cFNlc3Rhdnk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNydi5jYWxsPEdVY3JNYXNrYUR0bz4oXCJVcHNlcnRcIiwgeyBmaWx0ZXI6IGZpbHRlciB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlYWQoaXhzX21hczogc3RyaW5nKTogSlF1ZXJ5UHJvbWlzZTxHVWNyTWFza2FEdG8+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3J2LmNhbGw8R1Vjck1hc2thRHRvPihcIlJlYWRcIiwge2l4c19tYXM6IGl4c19tYXN9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=