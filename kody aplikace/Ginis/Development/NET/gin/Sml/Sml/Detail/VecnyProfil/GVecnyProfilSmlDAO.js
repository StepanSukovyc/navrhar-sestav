"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GVecnyProfilSmlDAO.ts                  </Name>
//    <Description> DAO pro Věcný profil Sml části                              </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-10-17                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** DAO pro Věcný profil Sml části */
            class GVecnyProfilSmlDAO {
                constructor(opts) {
                    this.opts = opts;
                    this.opts = this.opts ?? {};
                }
                list(parentContent, dto, opts) {
                    return parentContent.isl.Vepssmo.list({
                        filters: { ixp_sml_pri: this.opts.ixp }
                    }).getData();
                }
                evidovat(parentContent, dto, opts) {
                    return parentContent.isl.Vepssmo.upsert({ dto: dto, ixp: this.opts.ixp, operace: 20 /* Interface.GVepssmoUpsertOperace.upsert */ }).getData();
                }
                schvalit(parentContent, dto, opts) {
                    return parentContent.isl.Vepssmo.upsert({ dto: dto, ixp: this.opts.ixp, operace: 30 /* Interface.GVepssmoUpsertOperace.validate */ }).getData();
                }
                stornovat(parentContent, dto, opts) {
                    return parentContent.isl.Vepssmo.upsert({ dto: dto, ixp: this.opts.ixp, operace: 90 /* Interface.GVepssmoUpsertOperace.storno */ }).getData();
                }
                zrusitStorno(parentContent, dto, opts) {
                    return parentContent.isl.Vepssmo.upsert({ dto: dto, ixp: this.opts.ixp, operace: 91 /* Interface.GVepssmoUpsertOperace.zrusitStorno */ }).getData();
                }
                hromadnaKontrolaOpravneni(parentContent, dtos, operace, opts) {
                    return parentContent.isl.Vepssmo.checkMassPermissionsBeforeOperation({ dtos: dtos, ixp: this.opts.ixp, operace: operace }).get();
                }
                hromadnaOperace(parentContent, dtos, operace, opts) {
                    return parentContent.isl.Vepssmo.massOperation({ dtos: dtos, operace: operace, ixp: this.opts.ixp }).get();
                }
                vytvoritNovouPolozku(parentContent, opts) {
                    return parentContent.isl.Vepssmo.createNewDefaultItem({ ixp: this.opts.ixp }).getData();
                }
                destroy() {
                }
            }
            WebClient.GVecnyProfilSmlDAO = GVecnyProfilSmlDAO;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ZlY255UHJvZmlsU21sREFPLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ZlY255UHJvZmlsU21sREFPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFFakIsSUFBVSxNQUFNLENBdUNmO0FBdkNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVDbkI7SUF2Q2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVDN0I7UUF2Q29CLFdBQUEsU0FBUztZQUUxQixxQ0FBcUM7WUFDckMsTUFBYSxrQkFBa0I7Z0JBQzNCLFlBQW1CLElBQXFCO29CQUFyQixTQUFJLEdBQUosSUFBSSxDQUFpQjtvQkFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxJQUFJLENBQUMsYUFBMkMsRUFBRSxHQUFRLEVBQUUsSUFBK0I7b0JBQ3ZGLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNsQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7cUJBQzFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxRQUFRLENBQUMsYUFBMkMsRUFBRSxHQUFRLEVBQUUsSUFBcUI7b0JBQ2pGLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxpREFBd0MsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pJLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLGFBQTJDLEVBQUUsR0FBUSxFQUFFLElBQXFCO29CQUNqRixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sbURBQTBDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzSSxDQUFDO2dCQUNELFNBQVMsQ0FBQyxhQUEyQyxFQUFFLEdBQVEsRUFBRSxJQUFxQjtvQkFDbEYsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLGlEQUF3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekksQ0FBQztnQkFDRCxZQUFZLENBQUMsYUFBMkMsRUFBRSxHQUFRLEVBQUUsSUFBcUI7b0JBQ3JGLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyx1REFBOEMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9JLENBQUM7Z0JBQ0QseUJBQXlCLENBQUMsYUFBdUIsRUFBRSxJQUFXLEVBQUUsT0FBaUQsRUFBRSxJQUFTO29CQUN4SCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQWlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMvSSxDQUFDO2dCQUNELGVBQWUsQ0FBQyxhQUF1QixFQUFFLElBQVcsRUFBRSxPQUFpRCxFQUFFLElBQVM7b0JBQzlHLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBaUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN6SCxDQUFDO2dCQUNELG9CQUFvQixDQUFDLGFBQXVCLEVBQUUsSUFBUztvQkFDbkQsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVGLENBQUM7Z0JBR0QsT0FBTztnQkFFUCxDQUFDO2FBQ0o7WUFuQ1ksNEJBQWtCLHFCQW1DOUIsQ0FBQTtRQUNMLENBQUMsRUF2Q29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVDN0I7SUFBRCxDQUFDLEVBdkNnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1Q25CO0FBQUQsQ0FBQyxFQXZDUyxNQUFNLEtBQU4sTUFBTSxRQXVDZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1ZlY255UHJvZmlsU21sREFPLnRzICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBEQU8gcHJvIFbEm2Nuw70gcHJvZmlsIFNtbCDEjcOhc3RpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMi0xMC0xNyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqIERBTyBwcm8gVsSbY27DvSBwcm9maWwgU21sIMSNw6FzdGkgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHVmVjbnlQcm9maWxTbWxEQU8gaW1wbGVtZW50cyBHb3JkaWMuRWtvLldlYkNsaWVudC5JR1ZlY255UHJvZmlsREFPIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0czogeyBpeHA6IHN0cmluZyB9KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cyA9IHRoaXMub3B0cyA/PyB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdChwYXJlbnRDb250ZW50OiBHQ29udGVudDxJR0NvbnRlbnRCYXNlLCBhbnk+LCBkdG86IGFueSwgb3B0czoge2l4cDogc3RyaW5nfSB8IHVuZGVmaW5lZCk6IEpRdWVyeS5Qcm9taXNlPGFueVtdLCBhbnksIGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Q29udGVudC5pc2wuVmVwc3Ntby5saXN0KHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgaXhwX3NtbF9wcmk6IHRoaXMub3B0cy5peHAgfVxyXG4gICAgICAgICAgICB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2aWRvdmF0KHBhcmVudENvbnRlbnQ6IEdDb250ZW50PElHQ29udGVudEJhc2UsIGFueT4sIGR0bzogYW55LCBvcHRzPzoge30gfCB1bmRlZmluZWQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Q29udGVudC5pc2wuVmVwc3Ntby51cHNlcnQoeyBkdG86IGR0bywgaXhwOiB0aGlzLm9wdHMuaXhwLCBvcGVyYWNlOiBJbnRlcmZhY2UuR1ZlcHNzbW9VcHNlcnRPcGVyYWNlLnVwc2VydCB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjaHZhbGl0KHBhcmVudENvbnRlbnQ6IEdDb250ZW50PElHQ29udGVudEJhc2UsIGFueT4sIGR0bzogYW55LCBvcHRzPzoge30gfCB1bmRlZmluZWQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Q29udGVudC5pc2wuVmVwc3Ntby51cHNlcnQoeyBkdG86IGR0bywgaXhwOiB0aGlzLm9wdHMuaXhwLCBvcGVyYWNlOiBJbnRlcmZhY2UuR1ZlcHNzbW9VcHNlcnRPcGVyYWNlLnZhbGlkYXRlIH0pLmdldERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Rvcm5vdmF0KHBhcmVudENvbnRlbnQ6IEdDb250ZW50PElHQ29udGVudEJhc2UsIGFueT4sIGR0bzogYW55LCBvcHRzPzoge30gfCB1bmRlZmluZWQpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Q29udGVudC5pc2wuVmVwc3Ntby51cHNlcnQoeyBkdG86IGR0bywgaXhwOiB0aGlzLm9wdHMuaXhwLCBvcGVyYWNlOiBJbnRlcmZhY2UuR1ZlcHNzbW9VcHNlcnRPcGVyYWNlLnN0b3JubyB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHpydXNpdFN0b3JubyhwYXJlbnRDb250ZW50OiBHQ29udGVudDxJR0NvbnRlbnRCYXNlLCBhbnk+LCBkdG86IGFueSwgb3B0cz86IHt9IHwgdW5kZWZpbmVkKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudENvbnRlbnQuaXNsLlZlcHNzbW8udXBzZXJ0KHsgZHRvOiBkdG8sIGl4cDogdGhpcy5vcHRzLml4cCwgb3BlcmFjZTogSW50ZXJmYWNlLkdWZXBzc21vVXBzZXJ0T3BlcmFjZS56cnVzaXRTdG9ybm8gfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBocm9tYWRuYUtvbnRyb2xhT3ByYXZuZW5pKHBhcmVudENvbnRlbnQ6IEdDb250ZW50LCBkdG9zOiBhbnlbXSwgb3BlcmFjZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1ZlY255UHJvZmlsT3BlcmFjZSwgb3B0cz86IHt9KTogSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VHcm91cFJlc3BvbnNlPGFueT4+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudENvbnRlbnQuaXNsLlZlcHNzbW8uY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVPcGVyYXRpb24oeyBkdG9zOiBkdG9zLCBpeHA6IHRoaXMub3B0cy5peHAsIG9wZXJhY2U6IG9wZXJhY2UgYXMgbnVtYmVyIH0pLmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBocm9tYWRuYU9wZXJhY2UocGFyZW50Q29udGVudDogR0NvbnRlbnQsIGR0b3M6IGFueVtdLCBvcGVyYWNlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmVjbnlQcm9maWxPcGVyYWNlLCBvcHRzPzoge30pOiBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8YW55Pj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Q29udGVudC5pc2wuVmVwc3Ntby5tYXNzT3BlcmF0aW9uKHsgZHRvczogZHRvcywgb3BlcmFjZTogb3BlcmFjZSBhcyBudW1iZXIsIGl4cDogdGhpcy5vcHRzLml4cCB9KS5nZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdnl0dm9yaXROb3ZvdVBvbG96a3UocGFyZW50Q29udGVudDogR0NvbnRlbnQsIG9wdHM/OiB7fSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRDb250ZW50LmlzbC5WZXBzc21vLmNyZWF0ZU5ld0RlZmF1bHRJdGVtKHsgaXhwOiB0aGlzLm9wdHMuaXhwIH0pLmdldERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkZXN0cm95KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=