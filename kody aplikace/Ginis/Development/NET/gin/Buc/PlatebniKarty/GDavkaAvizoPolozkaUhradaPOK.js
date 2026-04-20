"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAvizoPolozkaUhradaPOK.ts         </Name>
//    <Description> Dialog s výběrem úhrady POK pro identifikaci položky avíza  </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-02                                                  </Created>
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
            /**Dialog s výběrem úhrady POK pro identifikaci položky avíza */
            let GDavkaAvizoPolozkaUhradaPOK = class GDavkaAvizoPolozkaUhradaPOK extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: (ev, ctx) => {
                                let row = Gordic.Eko.Grid.currentRow(this.$grid);
                                this.tryClose(row);
                            }
                        }),
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
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAvizoPolozkaUhradaPOK",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAvizoPolozka.listUhradyPOK({
                            filters: {
                                karta_id: this.karta_id,
                                typ_doh: this.typ_doh,
                                pos_id: this.pos_id,
                                c_tra: this.c_tra
                            },
                        }), {
                            key: ["ixp", "por_cislo"],
                        }),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            sort: "auth_code"
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "ixp" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.ixp */,
                        caption: "jres:33600340", //RC 33600340 : Identifikátor
                        width: 120
                    });
                    columns.addTextColumn({
                        name: "pos_id" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.pos_id */,
                        caption: "jres:33600341", //RC 33600341 : Pokladna
                        width: 120
                    });
                    columns.addDateColumn({
                        name: "trans_date" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.trans_date */,
                        caption: "jres:33600342", //RC 33600342 : Datum transakce
                        width: 110
                    });
                    columns.addTextColumn({
                        name: "card_no" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.card_no */,
                        caption: "jres:33600343", //RC 33600343 : Číslo karty
                        width: 140
                    });
                    columns.addTextColumn({
                        name: "auth_code" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.auth_code */,
                        caption: "jres:33600344", //RC 33600344 : Autorizační kód
                        width: 80
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.c */,
                        caption: "jres:33600345", //RC 33600345 : Částka
                        width: 120
                    });
                    columns.addTextColumn({
                        name: "nazev" /* Interface.GDavkaAvizoPolozkaUhradaPOKDtoNames.nazev */,
                        caption: "jres:33600346", //RC 33600346 : Název
                        width: 300
                    });
                    return columns;
                }
            };
            GDavkaAvizoPolozkaUhradaPOK = __decorate([
                Decorators.gcontent
            ], GDavkaAvizoPolozkaUhradaPOK);
            WebClient.GDavkaAvizoPolozkaUhradaPOK = GDavkaAvizoPolozkaUhradaPOK;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBbUhmO0FBbkhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1IbkI7SUFuSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1IN0I7UUFuSG9CLFdBQUEsU0FBUztZQUMxQixnRUFBZ0U7WUFFaEUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSxPQUFBLFlBQVk7Z0JBYXpELGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBMkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN2QixDQUFDO3lCQUNK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QUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBQ0YsT0FBTyxDQUFDLGFBQWEsQ0FBQzt3QkFDbEIsSUFBSSxtRUFBcUQ7d0JBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUE7b0JBRUYsT0FBTyxPQUFPLENBQUM7Z0JBQ25CLENBQUM7YUFDSixDQUFBO1lBL0dZLDJCQUEyQjtnQkFEdkMsVUFBVSxDQUFDLFFBQVE7ZUFDUCwyQkFBMkIsQ0ErR3ZDO1lBL0dZLHFDQUEyQiw4QkErR3ZDLENBQUE7UUFDTCxDQUFDLEVBbkhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtSDdCO0lBQUQsQ0FBQyxFQW5IZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbUhuQjtBQUFELENBQUMsRUFuSFMsTUFBTSxLQUFOLE1BQU0sUUFtSGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LLnRzICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBzIHbDvWLEm3JlbSDDumhyYWR5IFBPSyBwcm8gaWRlbnRpZmlrYWNpIHBvbG/Fvmt5IGF2w616YSAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0wMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipEaWFsb2cgcyB2w71ixJtyZW0gw7pocmFkeSBQT0sgcHJvIGlkZW50aWZpa2FjaSBwb2xvxb5reSBhdsOtemEgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKipUeXAgZG9obGVkYW7DqSBkw6F2a3kgKi9cclxuICAgICAgICBwdWJsaWMgdHlwX2RvaDogbnVtYmVyO1xyXG4gICAgICAgIC8qKklkZW50aWZpa8OhdG9yIHRlcm1pbsOhbHUgKi9cclxuICAgICAgICBwdWJsaWMgcG9zX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqSUQga2FydHkgKi9cclxuICAgICAgICBwdWJsaWMga2FydGFfaWQ6IHN0cmluZztcclxuICAgICAgICAvKirEjMOhc3RrYSB0cmFuc2FrY2UgKi9cclxuICAgICAgICBwdWJsaWMgY190cmE6IEpzb25EZWNpbWFsIHwgRGVjaW1hbDtcclxuXHJcbiAgICAgICAgLyoqR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RPazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYVVocmFkYVBPS0R0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2Uocm93KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LRHRvPih0aGlzLmlzbC5CdWNEYXZrYUF2aXpvUG9sb3prYS5saXN0VWhyYWR5UE9LKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FydGFfaWQ6IHRoaXMua2FydGFfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfZG9oOiB0aGlzLnR5cF9kb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NfaWQ6IHRoaXMucG9zX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY190cmE6IHRoaXMuY190cmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcInBvcl9jaXNsb1wiXSxcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T2ssXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJhdXRoX2NvZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVmaW5pY2UgZ3JpZGZvcm3DoXR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYVVocmFkYVBPS0R0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LRHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQwXCIsIC8vUkMgMzM2MDAzNDAgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYVVocmFkYVBPS0R0b05hbWVzLnBvc19pZCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM0MVwiLCAvL1JDIDMzNjAwMzQxIDogUG9rbGFkbmFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FVaHJhZGFQT0tEdG9OYW1lcy50cmFuc19kYXRlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQyXCIsIC8vUkMgMzM2MDAzNDIgOiBEYXR1bSB0cmFuc2FrY2VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FVaHJhZGFQT0tEdG9OYW1lcy5jYXJkX25vLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQzXCIsIC8vUkMgMzM2MDAzNDMgOiDEjMOtc2xvIGthcnR5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LRHRvTmFtZXMuYXV0aF9jb2RlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQ0XCIsIC8vUkMgMzM2MDAzNDQgOiBBdXRvcml6YcSNbsOtIGvDs2RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FVaHJhZGFQT0tEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQ1XCIsIC8vUkMgMzM2MDAzNDUgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYVVocmFkYVBPS0R0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzQ2XCIsIC8vUkMgMzM2MDAzNDYgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==