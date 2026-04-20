"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.TypPohledavky.ts                       </Name>
//    <Description> Sdílené metody a funkce pro práci s typy pohledávek         </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var TypPohledavky;
                (function (TypPohledavky) {
                    function getTexts(dto) {
                        let data = [];
                        for (let i = 0; i < 10; i++) {
                            let item = {
                                index: i,
                                naz_text: dto[`naz_text${i}`],
                                text_pov: dto[`text_pov${i}`],
                                typ_text: dto[`typ_text${i}`],
                                priz_duv_text: dto[`priz_duv_text${i}`]
                            };
                            data[i] = item;
                        }
                        return new Gordic.Data.View(data, { key: "index" });
                    }
                    TypPohledavky.getTexts = getTexts;
                    function createTabTexts(element) {
                        let div = $.newDiv().appendTo(element);
                        div.gautofit({ resizersOnTab: false });
                        div.ggrid({
                            data: new Gordic.Data.View([], { key: "index" }),
                            columns: Common.GridFormats.TypPohledavky_DoplnkoveUdaje(),
                            defaultProfile: {
                                columnList: "index, naz_text, text_pov, typ_text, priz_duv_text"
                            }
                        });
                        return div;
                    }
                    TypPohledavky.createTabTexts = createTabTexts;
                    function createTabKalendar(element, viewGridSplatkovyKalendar) {
                        let div = $.newDiv().appendTo(element);
                        div.gautofit({ resizersOnTab: false });
                        div.ggrid({
                            data: viewGridSplatkovyKalendar,
                            columns: Ddp.WebClient.Common.GridFormats.KalendarSplatek(),
                            defaultProfile: {
                                columnList: "poradi, aktivita, dat_splatky, poznamka"
                            }
                        });
                        return div;
                    }
                    TypPohledavky.createTabKalendar = createTabKalendar;
                })(TypPohledavky = Common.TypPohledavky || (Common.TypPohledavky = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var TypPohledavky2;
                (function (TypPohledavky2) {
                    function getTexts(dto) {
                        let data = [];
                        for (let i = 0; i < 10; i++) {
                            let item = {
                                index: i,
                                naz_text: dto[`naz_text${i}`],
                                text_pov: dto[`text_pov${i}`],
                                typ_text: dto[`typ_text${i}`],
                                priz_duv_text: dto[`priz_duv_text${i}`]
                            };
                            data[i] = item;
                        }
                        return new Gordic.Data.View(data, { key: "index" });
                    }
                    TypPohledavky2.getTexts = getTexts;
                    function createTabTexts(element) {
                        let div = $.newDiv().appendTo(element);
                        div.gautofit({ resizersOnTab: false });
                        div.ggrid({
                            data: new Gordic.Data.View([], { key: "index" }),
                            columns: Common.GridFormats.TypPohledavky_DoplnkoveUdaje(),
                            defaultProfile: {
                                columnList: "index, naz_text, text_pov, typ_text, priz_duv_text"
                            }
                        });
                        return div;
                    }
                    TypPohledavky2.createTabTexts = createTabTexts;
                    function createTabKalendar(element, viewGridSplatkovyKalendar) {
                        let div = $.newDiv().appendTo(element);
                        div.gautofit({ resizersOnTab: false });
                        div.ggrid({
                            data: viewGridSplatkovyKalendar,
                            columns: Ddp.WebClient.Common.GridFormats.KalendarSplatek(),
                            defaultProfile: {
                                columnList: "poradi, aktivita, dat_splatky, poznamka"
                            }
                        });
                        return div;
                    }
                    TypPohledavky2.createTabKalendar = createTabKalendar;
                })(TypPohledavky2 = Common.TypPohledavky2 || (Common.TypPohledavky2 = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwUG9obGVkYXZreS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlR5cFBvaGxlZGF2a3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0FnRGY7QUFoREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ0RuQjtJQWhEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ0Q3QjtRQWhEb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxNQUFNLENBZ0RwQztZQWhEOEIsV0FBQSxNQUFNO2dCQUFDLElBQUEsYUFBYSxDQWdEbEQ7Z0JBaERxQyxXQUFBLGFBQWE7b0JBQy9DLFNBQWdCLFFBQVEsQ0FBQyxHQUFrRDt3QkFDdkUsSUFBSSxJQUFJLEdBQWlFLEVBQUUsQ0FBQzt3QkFFNUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUMxQixJQUFJLElBQUksR0FBK0Q7Z0NBQ25FLEtBQUssRUFBRSxDQUFDO2dDQUNSLFFBQVEsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQ0FDN0IsUUFBUSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO2dDQUM3QixRQUFRLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0NBQzdCLGFBQWEsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDOzZCQUMxQyxDQUFBOzRCQUNELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ25CLENBQUM7d0JBRUQsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUs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QUM7b0JBQ2YsQ0FBQztvQkFkZSxnQ0FBaUIsb0JBY2hDLENBQUE7Z0JBQ0wsQ0FBQyxFQWhEc0MsY0FBYyxHQUFkLHFCQUFjLEtBQWQscUJBQWMsUUFnRHBEO1lBQUQsQ0FBQyxFQWhEK0IsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFnRHJDO1FBQUQsQ0FBQyxFQWhEcUIsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ0Q5QjtJQUFELENBQUMsRUFoRGlCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdEcEI7QUFBRCxDQUFDLEVBaERVLE1BQU0sS0FBTixNQUFNLFFBZ0RoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5UeXBQb2hsZWRhdmt5LnRzICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU2TDrWxlbsOpIG1ldG9keSBhIGZ1bmtjZSBwcm8gcHLDoWNpIHMgdHlweSBwb2hsZWTDoXZlayAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDQtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uVHlwUG9obGVkYXZreSB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VGV4dHMoZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8pOiBEYXRhLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RG9wbG5rb3Z5VWRhakR0bz4ge1xyXG4gICAgICAgIGxldCBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEb3BsbmtvdnlVZGFqRHRvW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEb3BsbmtvdnlVZGFqRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGksXHJcbiAgICAgICAgICAgICAgICBuYXpfdGV4dDogZHRvW2BuYXpfdGV4dCR7aX1gXSxcclxuICAgICAgICAgICAgICAgIHRleHRfcG92OiBkdG9bYHRleHRfcG92JHtpfWBdLFxyXG4gICAgICAgICAgICAgICAgdHlwX3RleHQ6IGR0b1tgdHlwX3RleHQke2l9YF0sXHJcbiAgICAgICAgICAgICAgICBwcml6X2R1dl90ZXh0OiBkdG9bYHByaXpfZHV2X3RleHQke2l9YF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhW2ldID0gaXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcImluZGV4XCIgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJUZXh0cyhlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgbGV0IGRpdiA9ICQubmV3RGl2KCkuYXBwZW5kVG8oZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGRpdi5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pO1xyXG4gICAgICAgIGRpdi5nZ3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBEYXRhLlZpZXcoPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreURvcGxua292eVVkYWpEdG9bXT5bXSwgeyBrZXk6IFwiaW5kZXhcIiB9KSxcclxuICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlR5cFBvaGxlZGF2a3lfRG9wbG5rb3ZlVWRhamUoKSxcclxuICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaW5kZXgsIG5hel90ZXh0LCB0ZXh0X3BvdiwgdHlwX3RleHQsIHByaXpfZHV2X3RleHRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaXY7IFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJLYWxlbmRhcihlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB2aWV3R3JpZFNwbGF0a292eUthbGVuZGFyOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdLYWxlbmRhclNwbGF0ZWtEdG8+KSB7XHJcblxyXG4gICAgICAgIGxldCBkaXYgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBkaXYuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICBkaXYuZ2dyaWQoe1xyXG4gICAgICAgICAgICBkYXRhOiB2aWV3R3JpZFNwbGF0a292eUthbGVuZGFyLFxyXG4gICAgICAgICAgICBjb2x1bW5zOiBEZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5LYWxlbmRhclNwbGF0ZWsoKSxcclxuICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwicG9yYWRpLCBha3Rpdml0YSwgZGF0X3NwbGF0a3ksIHBvem5hbWthXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGl2OyAgXHJcbiAgICB9XHJcbn1uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLlR5cFBvaGxlZGF2a3kyIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0cyhkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0byk6IERhdGEuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEb3BsbmtvdnlVZGFqRHRvPiB7XHJcbiAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreURvcGxua292eVVkYWpEdG9bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreURvcGxua292eVVkYWpEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgIG5hel90ZXh0OiBkdG9bYG5hel90ZXh0JHtpfWBdLFxyXG4gICAgICAgICAgICAgICAgdGV4dF9wb3Y6IGR0b1tgdGV4dF9wb3Yke2l9YF0sXHJcbiAgICAgICAgICAgICAgICB0eXBfdGV4dDogZHRvW2B0eXBfdGV4dCR7aX1gXSxcclxuICAgICAgICAgICAgICAgIHByaXpfZHV2X3RleHQ6IGR0b1tgcHJpel9kdXZfdGV4dCR7aX1gXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGFbaV0gPSBpdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaW5kZXhcIiB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhYlRleHRzKGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICBsZXQgZGl2ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgZGl2LmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcbiAgICAgICAgZGl2LmdncmlkKHtcclxuICAgICAgICAgICAgZGF0YTogbmV3IERhdGEuVmlldyg8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RG9wbG5rb3Z5VWRhakR0b1tdPltdLCB7IGtleTogXCJpbmRleFwiIH0pLFxyXG4gICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuVHlwUG9obGVkYXZreV9Eb3BsbmtvdmVVZGFqZSgpLFxyXG4gICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpbmRleCwgbmF6X3RleHQsIHRleHRfcG92LCB0eXBfdGV4dCwgcHJpel9kdXZfdGV4dFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpdjsgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhYkthbGVuZGFyKGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHZpZXdHcmlkU3BsYXRrb3Z5S2FsZW5kYXI6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0thbGVuZGFyU3BsYXRla0R0bz4pIHtcclxuXHJcbiAgICAgICAgbGV0IGRpdiA9ICQubmV3RGl2KCkuYXBwZW5kVG8oZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGRpdi5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pO1xyXG4gICAgICAgIGRpdi5nZ3JpZCh7XHJcbiAgICAgICAgICAgIGRhdGE6IHZpZXdHcmlkU3BsYXRrb3Z5S2FsZW5kYXIsXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkthbGVuZGFyU3BsYXRlaygpLFxyXG4gICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJwb3JhZGksIGFrdGl2aXRhLCBkYXRfc3BsYXRreSwgcG96bmFta2FcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaXY7ICBcclxuICAgIH1cclxufSJdfQ==