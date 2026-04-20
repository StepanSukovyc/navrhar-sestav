"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceHistorie.js                                                        </Name>
//    <Description> GAkceHistorie                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GAkceHistorie = class GAkceHistorie extends Gordic.GContentBase {
                onContentReady() {
                    this.initHistory();
                }
            };
            GAkceHistorie = __decorate([
                gcontent
            ], GAkceHistorie);
            WebClient.GAkceHistorie = GAkceHistorie;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VIaXN0b3JpZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWtjZUhpc3RvcmllLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBWWY7QUFaRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FZbkI7SUFaZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBWTdCO1FBWm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBSTNDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2QixDQUFDO2FBQ0osQ0FBQTtZQVBZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBT3pCO1lBUFksdUJBQWEsZ0JBT3pCLENBQUE7UUFDTCxDQUFDLEVBWm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQVk3QjtJQUFELENBQUMsRUFaZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBWW5CO0FBQUQsQ0FBQyxFQVpTLE1BQU0sS0FBTixNQUFNLFFBWWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIaXN0b3JpZS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlSGlzdG9yaWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBa2NlSGlzdG9yaWUgZXh0ZW5kcyBHQ29udGVudEJhc2V7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87IFxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSh0aGlzOiBHQWtjZUhpc3RvcmllICYgeyBpbml0SGlzdG9yeTogKCkgPT4gdm9pZCB9ICApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0SGlzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==