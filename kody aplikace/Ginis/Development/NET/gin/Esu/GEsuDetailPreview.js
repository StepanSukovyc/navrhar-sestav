(function ($) {
    "use strict";
    namespace("Gordic.Esu.GEsuDetailPreview", {

        prepareContent: function (obj) {
            this.dto =  obj.row;
            this.onContentReady();
        },

        onContentReady: function () {
            if (this.nelzeZobrazitNahled) {
                this.ukazTextNelzeZobrazitNahled();
                return;
            }

            //_____________________________________________

            // předělat na gstaticfield
            //_________________________________________________-

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-300-400" });
            if (this.permission) {
                if (this.dto.Bu_exist == 1) {
                    this.dto.Bu_existTxt = "jres:31900678";
                } else {
                    this.dto.Bu_existTxt = "jres:31900679";
                } 
                this.dto.UliceTxt = (this.dto.Ulice ? this.dto.Ulice : "")
                    + " " + (this.dto.CisloPopisne ? this.dto.CisloPopisne : "")
                    + " " + (this.dto.CisloOrientacni ? this.dto.CisloOrientacni : "");

                this.dto.pscTxt = (this.dto.Psc ? this.dto.Psc : "")
                    + " " + this.dto.Obec ? this.dto.Obec : "";

                this.dto.nemateOpravneni = "jres:31900318";

                // encode - ref T35818
                this.dto.Nazev = htmlEncode(this.dto.Nazev);
                this.dto.ObJmeno = htmlEncode(this.dto.ObJmeno);
                this.dto.UliceTxt = htmlEncode(this.dto.UliceTxt);
                this.dto.Telefon = htmlEncode(this.dto.Telefon);
                this.dto.EMail = htmlEncode(this.dto.EMail);
 
                formBuilder
                    .addSection()
                    .addRow("jres:26265146").addField("gstaticfield", { name: "Nazev" })//RC 26265146 : Název
                    .addRow("jres:31900683").addField("gstaticfield", { name: "TypEsuTxt" })
                    .addRow("jres:26265145").addField("gstaticfield", { name: "Zkratka" })
                    .addRow("jres:31900205").addField("gstaticfield", { name: "TypOrganizaceTxt" });
                if (this.dto.Insolvence) {
                    formBuilder.addRow("jres:26265284").addField("gstaticfield", { name: "Insolvence" }); // "g-state-text g-state-important"
                } else {
                    this.dto.Insolvence = "jres:31900681";
                    formBuilder.addRow("jres:26265284").addField("gstaticfield", { name: "Insolvence" });
                }

                formBuilder
                    .addRow("jres:31900362").addField("gstaticfield", { name: "StupenVerifikaceTxt" })
                    .addRow("jres:26265288").addField("gstaticfield", { name: "Ico" })
                    .addRow("jres:32100016").addField("gstaticfield", { name: "Dic" })
                    .addRow("jres:26265121").addField("gstaticfield", { name: "Bu_existTxt" })
                    .addRow("jres:26265207").addField("gstaticfield", { name: "Cnt_zo" })
                    .addRow("jres:26265226").addField("gstaticfield", { name: "Poc_adres" })

                    .addSection(this.dto.Typ_adr_txt ? this.dto.Typ_adr_txt : "jres:26265307") //RC 26265307 : Adresa
                    .addRow("").addField("gstaticfield", { name: "UliceTxt" })
                    .addRow("").addField("gstaticfield", { name: "CastObce" })

                    .addSection("jres:31900392") //RC 31900392 : Kontakty
                    .addRow("jres:32100022").addField("gstaticfield", { name: "Telefon" })
                    .addRow("jres:26265151").addField("gstaticfield", { name: "EMail" })
                    .addRow("jres:31900682").addField("gstaticfield", { name: "Id_ds" });
              

            } else {
                formBuilder
                    .addSection()
                    .addRow().addField("gstaticfield", { name: "nemateOpravneni" })
            }
            var form = $("<div>").appendTo(this.element).gform("createFrom", formBuilder);
            //form.resize();
            form.findFields().gfield("model", "apply", this.dto);



            /*
            var form = $("<div >").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" }); //class='gform--view-mode'
                //.gformsection("create", { layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0", label: "jres:31900319" }). //RC 31900319 : Hlavička
                //    gformsection("create").
                //gpidbar({ pid: this.IxsEsu, iconsVisible: false });

            if (this.permission) {
                form.gformsection("create").

                    gformrow("addFieldsRow", "jres:26265146").gformtext(this.dto.Nazev). //RC 26265146 : Název
                    gformrow("addFieldsRow", "jres:31900683").gformtext(this.dto.TypEsuTxt). //RC 31900683 : Typ subjektu
                    
                    gformrow("addFieldsRow", "jres:26265145").gformtext(this.dto.Zkratka). //RC 26265145 : Zkratka
                    gformrow("addFieldsRow", "jres:31900205").gformtext(this.dto.TypOrganizaceTxt); //RC 31900205 : Typ organizace

                if (this.dto.Insolvence) {
                    form.gformrow("addFieldsRow", "jres:26265284").gformtext(this.dto.Insolvence, "g-state-text g-state-important"); //RC 26265284 : Insolvence
                } else {
                    form.gformrow("addFieldsRow", "jres:26265284").gformtext("jres:31900681"); //RC 31900681 : Nezjištěno
                }
                form.gformrow("addFieldsRow", "jres:31900362").gformtext(this.dto.StupenVerifikaceTxt). //RC 31900362 : Verifikace
                    gformrow("addFieldsRow", "jres:26265288").gformtext(this.dto.Ico). //RC 26265288 : IČO
                    gformrow("addFieldsRow", "jres:32100016").gformtext(this.dto.Dic). //RC 32100016 : DIČ
                    gformrow("addFieldsRow", "jres:26265121").gformtext(//RC 26265121 : Bankovní účty
                        this.dto.Bu_exist == 1 ?
                            "jres:31900678" : //RC 31900678 : Ano
                            "jres:31900679"). //RC 31900679 : Ne
                    gformrow("addFieldsRow", "jres:26265207").gformtext(this.dto.Cnt_zo). //RC 26265207 : Zástupné osoby
                    gformrow("addFieldsRow", "jres:26265226").gformtext(this.dto.Poc_adres). //RC 26265226 : Počet adres

                    gformsection("create", this.dto.Typ_adr_txt ? this.dto.Typ_adr_txt : "jres:26265307"). //RC 26265307 : Adresa
                    gformrow("addFieldsRow", "").gformtext((this.dto.Ulice ? this.dto.Ulice : "")
                        + " " + (this.dto.CisloPopisne ? this.dto.CisloPopisne : "")
                        + " " + (this.dto.CisloOrientacni ? this.dto.CisloOrientacni : "")).
                    gformrow("addFieldsRow", "").gformtext(this.dto.CastObce).
                    gformrow("addFieldsRow", "").gformtext((this.dto.Psc ? this.dto.Psc : "")
                        + " " + this.dto.Obec ? this.dto.Obec : "").
                    gformrow("addFieldsRow", "").gformtext(this.dto.Stat_String).
                    gformsection("create", "jres:31900392"). //RC 31900392 : Kontakty
                    gformrow("addFieldsRow", "jres:32100022").gformtext(this.dto.Telefon). //RC 32100022 : Telefon
                    gformrow("addFieldsRow", "jres:26265151").gformtext(this.dto.EMail). //RC 26265151 : Email
                    gformrow("addFieldsRow", "jres:31900682").gformtext(this.dto.Id_ds); //RC 31900682 : IdDS
               
                
                
                form.gform('viewMode', 'view');
                
            } else {
                form.gformsection("create")
                    .gformtext($("<p>").text("jres:31900318")); //RC 31900318 : Nemáte oprávnění pro práci s tímto subjektem.
            }
            */
            //this.element.resize().find(".gform-section").children("label").addClass("g-state-text g-state-active");
        },

        ukazTextNelzeZobrazitNahled: function () {
            var formnelzeZobrazit = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" });
            formnelzeZobrazit.gformsection("create");
            formnelzeZobrazit.gformrow("addFieldsRow").gformtext("jres:31900685"); //RC 31900685 : Náhled nelze zobrazit.
        }

    }, {extendIntellisense: GContent});
})(jQuery);