(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailPreview", {

            onContentReady: function () {
                
                /// <summary>
                /// s this instance.
                /// </summary>
                /// <returns></returns>
                var _this = this;
                
            
                if (this.ixp == null) {
                    $("<h3></h3>").text("Náhled nelze zobrazit.");
                    return;
                }
                //Gordic.Previews.displayLinkButton(this.element, this);

                var form = $("<div class='gform--view-mode'>").appendTo(this.element);
                form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" })
                    .gformsection("create", { layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0", label: "Hlavička" })
                    .gformsection("create").addClass('center').append($.newDiv().gpidbar({ pid: this.ixp, iconsVisible: false }))
            
                if (this.permission) {
                    var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-300-400" })
                        .addSection()
                        .addRow(_this.textCJShortDBParam).addField("gstaticfield", { name: "IxsCj" })
                        .addRow("Věc").addField("gstaticfield", { name: "Nazev" })
                        .addRow("Vlastník").addField("gstaticfield", { name: "IxsFunAktTxt" })
                        .addRow()
                        .addRow("Spisová značka").addField("gstaticfield", { name: "SpisZnak" })
                        .addRow("Typ dokumentu").addField("gstaticfield", { name: "Typ" })
                        .addRow("Přístup").addField("gstaticfield", { name: "StUtajTxt" })
                        .addSection("Dokument")
                        .addRow("Odesílatel").addField("gstaticfield", { name: "MistoVzniku" })
                        .addRow("Věc podrobně").addField("gstaticfield", { name: "ObsahText" })
                        .addRow("Spisový plán").addField("gstaticfield", { name: "SpisPlan" })
                        .addRow("Počet l/s/p/lp/k")
                        .addField("gstaticfield",
                            {
                                name: "pocty", model: "model.PocListu=value.PocListu,model.PocStran=value.PocStran,model.PocPriloh=value.PocPriloh,model.PocListuPriloh=value.PocListuPriloh,model.PocKop=value.PocKop",
                                itemTemplate: "{PocListu:trim:encode}/{PocStran:trim:encode}/{PocPriloh:trim:encode}/{PocListuPriloh:trim:encode}/{PocKop:trim:encode}"
                            })
                        .addRow("Poznámka").addField("gstaticfield", { name: "Poznamka" })
                        .addRow("Uživatelská Poznámka").addField("gstaticfield", { name: "UzivPoznamka" })
                        .addRow("Umístění").addField("gstaticfield", { name: "Umisteni" })
                        .addRow("Podáno").addField("gstaticfield", { name: "DatPod", itemTemplate: "{#:datetime}" })
                        .addRow("Evidováno").addField("gstaticfield", { name: "DatEvid", itemTemplate: "{#:datetime}" })
                        .addRow("Vyřízeno").addField("gstaticfield", { name: "DatVyriz", itemTemplate: "{#:datetime}" })
                        .addRow("Uloženo").addField("gstaticfield", { name: "Ulozeno" })
                    .addRow("Zpracovatel").addField("gstaticfield", { name: "NazevResitel" });

                    formBuilder.addSection("Otevřít").addField("glink", {
                        params: {
                            action: new GAction({
                                name: "actOpenAge", caption: "Otevřít v agendě", icon: "fa-external-link", run: function () {
                                    Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce({ixx1: _this.ixp});
                                }
                            })
                        }
                    });

                    var cnt = this;
                    while (!cnt.element.hasClass('activity-content') && cnt.parentContent) {
                        cnt = cnt.parentContent;
                    }

                    if (Gordic && Gordic.Ssl && Gordic.Ssl.Dialogs && Gordic.Ssl.Dialogs.Detail && cnt.element.hasClass('activity-content') && !cnt.element.is('#main')) {
                        formBuilder.addField("glink", {
                            params: {
                                action: new GAction({
                                    name: "actOpen", caption: "Otevřít", icon: "gi-detail", run: function () {
                                        Gordic.Ssl.Dialogs.Detail(cnt, { DetailDto: { ixp: _this.ixp } }, "navigate");
                                    }
                                })
                            }
                        });
                    }


                    form = form.add($.newDiv().appendTo(this.element).gform("createFrom", formBuilder));
                    form.resize();
                    form.findFields().gfield("model", "apply", this.dto);
                } else {
                    form.gformsection("create")
                    .gformtext($("<p>").text("jres:31750027")); //RC 31750027 : Nemáte oprávnění pro práci s tímto dokumentem.
                }

                this.element.resize().find(".gform-section").children("label").addClass("g-state-text g-state-active");
            }

    }, {extendIntellisense: GContent});
})(jQuery);