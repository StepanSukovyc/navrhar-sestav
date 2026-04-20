"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSMLZadostiAgIxpDlg.ts                 </Name>
//    <Description> Dialog pro manuální zadání Agendového čísla nebo Identifikátoru žádosti o založení z jiných agend </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2023-02-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /** Dialog pro manuální zadání Agendového čísla nebo Identifikátoru žádosti o založení z jiných agend */
            let GSMLZadostiAgIxpDlg = class GSMLZadostiAgIxpDlg extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createForm();
                    this.commandBar(this.actions.createBar(["actOk", "actZrusit"]));
                }
                createActions() {
                    const that = this;
                    this.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: function (ev, ctx) {
                                if (!that.$form.gform("isValid")) {
                                    return;
                                }
                                var model = {};
                                that.$form.findFields().gfield("model", "collect", model);
                                if (model.ixp || model.ac_sml) {
                                    model.ixp = model.ixp ?? that.dto.ixp;
                                    model.ac_sml = model.ac_sml ?? that.dto.ac_sml;
                                    this.setPending(that.isl.Smlsiab.updateAgIxp({ /*...that.dto, ...model*/ ixp_ext: that.dto.ixp_ext, ixp: model.ixp, ac_sml: model.ac_sml }).getData().then((res) => {
                                        if (res.errorMessage?.length ?? 0 > 0) {
                                            that.dialogs.error("jres:33600157", res.errorMessage ?? "jres:33600158"); //RC 33600158 : Nastala chyba při ukládání
                                            return $.Deferred().reject().promise();
                                        }
                                        else {
                                            that.tryClose(res.dto);
                                            return $.Deferred().resolve().promise();
                                        }
                                    }));
                                }
                                else {
                                    that.tryClose();
                                }
                            }
                        }),
                        actZrusit: Gordic.Eko.Action.actionZrusit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        })
                    });
                }
                createForm() {
                    var form = new Gordic.Forms.Form()
                        .addRow("jres:33600159") //RC 33600159 : Identifikátor
                        .addField("gstringbox", {
                        name: "ixp",
                        flag: "required",
                        disabled: this.sml_def_ixpgen == 1 /* Interface.GenerovaniIdDokladu.ng_genPidYes */,
                        validators: [
                            new Gordic.Validators.Required()
                        ]
                    })
                        .addRow("jres:33600131") //RC 33600131 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_sml",
                        flag: "required",
                        disabled: this.sml_def_acsml != "man", //sg_defacsmlMan
                        validators: [
                            new Gordic.Validators.Length({ min: 8, max: 8 }),
                            new Gordic.Validators.Required()
                        ]
                    });
                    this.$form = $.newDiv().appendTo(this.element).gform("createFrom", form);
                    return form;
                }
            };
            GSMLZadostiAgIxpDlg = __decorate([
                Decorators.gcontent
            ], GSMLZadostiAgIxpDlg);
            WebClient.GSMLZadostiAgIxpDlg = GSMLZadostiAgIxpDlg;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFphZG9zdGlBZ0l4cERsZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTTUxaYWRvc3RpQWdJeHBEbGcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsb0lBQW9JO0FBQ3BJLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0EyRWY7QUEzRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkVuQjtJQTNFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkU3QjtRQTNFb0IsV0FBQSxTQUFTO1lBQzFCLHdHQUF3RztZQUV4RyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLE9BQUEsWUFBWTtnQkFRakQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ25FLENBQUM7Z0JBRU8sYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDOUIsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29DQUFDLE9BQU87Z0NBQUMsQ0FBQztnQ0FDN0MsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO2dD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RCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO3lCQUNuQztxQkFDSixDQUFDLENBQUE7b0JBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN6RSxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKLENBQUE7WUF2RVksbUJBQW1CO2dCQUQvQixVQUFVLENBQUMsUUFBUTtlQUNQLG1CQUFtQixDQXVFL0I7WUF2RVksNkJBQW1CLHNCQXVFL0IsQ0FBQTtRQUNMLENBQUMsRUEzRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJFN0I7SUFBRCxDQUFDLEVBM0VnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyRW5CO0FBQUQsQ0FBQyxFQTNFUyxNQUFNLEtBQU4sTUFBTSxRQTJFZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NNTFphZG9zdGlBZ0l4cERsZy50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgcHJvIG1hbnXDoWxuw60gemFkw6Fuw60gQWdlbmRvdsOpaG8gxI3DrXNsYSBuZWJvIElkZW50aWZpa8OhdG9ydSDFvsOhZG9zdGkgbyB6YWxvxb5lbsOtIHogamluw71jaCBhZ2VuZCA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIzLTAyLTIyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBEaWFsb2cgcHJvIG1hbnXDoWxuw60gemFkw6Fuw60gQWdlbmRvdsOpaG8gxI3DrXNsYSBuZWJvIElkZW50aWZpa8OhdG9ydSDFvsOhZG9zdGkgbyB6YWxvxb5lbsOtIHogamluw71jaCBhZ2VuZCAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU01MWmFkb3N0aUFnSXhwRGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwdWJsaWMgZHRvOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgc21sX2RlZl9peHBnZW46IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIHNtbF9kZWZfYWNzbWw6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2tcIiwgXCJhY3RacnVzaXRcIl0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9rOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Payh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC4kZm9ybS5nZm9ybShcImlzVmFsaWRcIikpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5peHAgfHwgbW9kZWwuYWNfc21sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5peHAgPSBtb2RlbC5peHAgPz8gdGhhdC5kdG8uaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYWNfc21sID0gbW9kZWwuYWNfc21sID8/IHRoYXQuZHRvLmFjX3NtbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmlzbC5TbWxzaWFiLnVwZGF0ZUFnSXhwKHsvKi4uLnRoYXQuZHRvLCAuLi5tb2RlbCovaXhwX2V4dDogdGhhdC5kdG8uaXhwX2V4dCwgaXhwOiBtb2RlbC5peHAsIGFjX3NtbDogbW9kZWwuYWNfc21sIH0pLmdldERhdGEoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yTWVzc2FnZT8ubGVuZ3RoID8/IDAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcImpyZXM6MzM2MDAxNTdcIiwgcmVzLmVycm9yTWVzc2FnZSA/PyBcImpyZXM6MzM2MDAxNThcIik7IC8vUkMgMzM2MDAxNTggOiBOYXN0YWxhIGNoeWJhIHDFmWkgdWtsw6Fkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZShyZXMuZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyB0aGF0LnRyeUNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWnJ1c2l0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxNTlcIikgLy9SQyAzMzYwMDE1OSA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zbWxfZGVmX2l4cGdlbiA9PSBJbnRlcmZhY2UuR2VuZXJvdmFuaUlkRG9rbGFkdS5uZ19nZW5QaWRZZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDEzMVwiKSAvL1JDIDMzNjAwMTMxIDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnNtbF9kZWZfYWNzbWwgIT0gXCJtYW5cIiwgLy9zZ19kZWZhY3NtbE1hblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogOCwgbWF4OiA4IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=