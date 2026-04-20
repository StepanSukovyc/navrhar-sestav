"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVObsah.ts                       </Name>
//    <Description> Dialog s obsahem složenky dávek/y SIPO                      </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-21                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /**Dialog s obsahem složenky dávek/y SIPO */
            let GDavkaSIPOObsah = class GDavkaSIPOObsah extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaSIPOObsah",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaSIPOObsah.list({
                            filters: (this.mod == 0) ? {
                                davka: this.davka
                            } : void 0
                        }), {
                            key: ["davka", "cis_org", "rok_obd", "mes_obd", "kod_popl_sipo", "spoj_cislo"]
                        }),
                        defaultProfile: {
                            sort: "davka",
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addDateColumn({
                        name: "dat_zap" /* Interface.GDavkaSIPOObsahDtoNames.dat_zap */,
                        caption: "jres:33600277", //RC 33600277 : Datum zaplacení
                        width: 110
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaSIPOObsahDtoNames.vs */,
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GDavkaSIPOObsahDtoNames.c */,
                        caption: "jres:33600278", //RC 33600278 : Částka
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "davka" /* Interface.GDavkaSIPOObsahDtoNames.davka */,
                        caption: "jres:33600279", //RC 33600279 : Číslo dávky
                        width: 100
                    });
                    columns.addTextColumn({
                        name: "cis_org" /* Interface.GDavkaSIPOObsahDtoNames.cis_org */,
                        caption: "jres:33600280", //RC 33600280 : Číslo organizace
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "rok_obd" /* Interface.GDavkaSIPOObsahDtoNames.rok_obd */,
                        caption: "jres:33600281", //RC 33600281 : Rok období
                        width: 90
                    });
                    columns.addNumberColumn({
                        name: "mes_obd" /* Interface.GDavkaSIPOObsahDtoNames.mes_obd */,
                        caption: "jres:33600282", //RC 33600282 : Měsíc období
                        width: 90
                    });
                    columns.addNumberColumn({
                        name: "kod_popl_sipo" /* Interface.GDavkaSIPOObsahDtoNames.kod_popl_sipo */,
                        caption: "jres:33600283", //RC 33600283 : Kód poplatku SIPO
                        width: 90
                    });
                    columns.addTextColumn({
                        name: "spoj_cislo" /* Interface.GDavkaSIPOObsahDtoNames.spoj_cislo */,
                        caption: "jres:33600284", //RC 33600284 : Spojovací číslo plátce
                        width: 120
                    });
                    return columns;
                }
            };
            GDavkaSIPOObsah = __decorate([
                Decorators.gcontent
            ], GDavkaSIPOObsah);
            WebClient.GDavkaSIPOObsah = GDavkaSIPOObsah;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthU0lQT09ic2FoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdmthU0lQT09ic2FoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBNEdmO0FBNUdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRHbkI7SUE1R2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRHN0I7UUE1R29CLFdBQUEsU0FBUztZQUMxQiw0Q0FBNEM7WUFFNUMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBUzdDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsV0FB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Q0FBQztnQkFDbkIsQ0FBQzthQUNKLENBQUE7WUF4R1ksZUFBZTtnQkFEM0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxlQUFlLENBd0czQjtZQXhHWSx5QkFBZSxrQkF3RzNCLENBQUE7UUFDTCxDQUFDLEVBNUdvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0RzdCO0lBQUQsQ0FBQyxFQTVHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNEduQjtBQUFELENBQUMsRUE1R1MsTUFBTSxLQUFOLE1BQU0sUUE0R2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZPYnNhaC50cyAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzIG9ic2FoZW0gc2xvxb5lbmt5IGTDoXZlay95IFNJUE8gICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wMy0yMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipEaWFsb2cgcyBvYnNhaGVtIHNsb8W+ZW5reSBkw6F2ZWsveSBTSVBPICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXZrYVNJUE9PYnNhaCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIMSNw61zbG8gZMOhdmt5Ki9cclxuICAgICAgICBwdWJsaWMgZGF2a2E6IG51bWJlcjtcclxuICAgICAgICAvKiptw7NkICgxIC0gcG9kYW7DqSkqL1xyXG4gICAgICAgIHB1YmxpYyBtb2Q6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWREYXZrYVNJUE9PYnNhaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdEYXZrYVNJUE9PYnNhaER0bz4odGhpcy5pc2wuQnVjRGF2a2FTSVBPT2JzYWgubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6ICh0aGlzLm1vZCA9PSAwKSA/IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdmthOiB0aGlzLmRhdmthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gOiB2b2lkIDBcclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcImRhdmthXCIsIFwiY2lzX29yZ1wiLCBcInJva19vYmRcIiwgXCJtZXNfb2JkXCIsIFwia29kX3BvcGxfc2lwb1wiLCBcInNwb2pfY2lzbG9cIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImRhdmthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG8+IHtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthU0lQT09ic2FoRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG9OYW1lcy5kYXRfemFwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjc3XCIsIC8vUkMgMzM2MDAyNzcgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYVNJUE9PYnNhaER0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjc4XCIsIC8vUkMgMzM2MDAyNzggOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT09ic2FoRHRvTmFtZXMuZGF2a2EsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNzlcIiwgLy9SQyAzMzYwMDI3OSA6IMSMw61zbG8gZMOhdmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT09ic2FoRHRvTmFtZXMuY2lzX29yZyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI4MFwiLCAvL1JDIDMzNjAwMjgwIDogxIzDrXNsbyBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG9OYW1lcy5yb2tfb2JkLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjgxXCIsIC8vUkMgMzM2MDAyODEgOiBSb2sgb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG9OYW1lcy5tZXNfb2JkLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjgyXCIsIC8vUkMgMzM2MDAyODIgOiBNxJtzw61jIG9iZG9iw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthU0lQT09ic2FoRHRvTmFtZXMua29kX3BvcGxfc2lwbyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI4M1wiLCAvL1JDIDMzNjAwMjgzIDogS8OzZCBwb3BsYXRrdSBTSVBPXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FTSVBPT2JzYWhEdG9OYW1lcy5zcG9qX2Npc2xvLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjg0XCIsIC8vUkMgMzM2MDAyODQgOiBTcG9qb3ZhY8OtIMSNw61zbG8gcGzDoXRjZVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19