(function ($) {
    "use strict";



    Gordic.Previews.register("dpg:DetailDoporuceneGdzBaliky", {
        canRender: function (dto) { return true; },

        render: function (div, dto) {
            var currentElement = $(div);

            //data jsou ready -> samotné vytvoření náhledu
            //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33130011" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33130011 : GDZ balík

            var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
            form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
                gformsection("create").gpidbar({ pid: dto.ixp });

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" })  //breaks-300-400
                .addSection()
                .addRow("jres:33130047").addField("gstaticfield", { name: "nazev" }) //RC 33130047 : Název
                .addRow("jres:33130048").addField("gstaticfield", { name: "ixs_gdt" }) //RC 33130048 : Identifikátor
                .addRow("jres:33130049").addField("gstaticfield", { name: "popis" }) //RC 33130049 : Popis
                .addRow("jres:33130050").addField("gdagstaticfieldtebox", { name: "dat_zmena", itemTemplate: "{#:date}", valueType: "date", customClass: "font-weight: bold" }) //RC 33130050 : Datum změny
                //.addRow("Platnost od").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" })
                //.addSection()
                //.addRow("Platnost do").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" })
                //.addRow("Poslední změna").addField("gdatebox", { name: "dat_zmena", valueType: "date", customClass: "font-weight: bold" })
                //.addRow("Změnil").addField("gstaticfield", { name: "zmenu_prov" })
                //.addRow("Název").addField("gstaticfield", { name: "nazev" })
                //.addSection()
                //.addRow("IČO").addField("gstaticfield", { name: "ico" })
                //.addRow("Projekt").addField("gstaticfield", { name: "projekt" })
                //.addRow("Typ implementace").addField("gstaticfield", { name: "tyi" })
                //.addRow("Typ databáze").addField("gstaticfield", { name: "typ_db" })
                //.addRow("Kultura").addField("gstaticfield", { name: "kultura" })
                //.addSection()
                //.addRow("Vznik databáze").addField("gdatebox", { name: "dat_mpd", valueType: "date", customClass: "font-weight: bold" })
                //.addRow("IČO pro fakturaci").addField("gstaticfield", { name: "ico_fakt" })
                //.addRow("Licence fyzické databáze").addField("gstaticfield", { name: "lic_db" });


            form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
            currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");

        },


    });

    //Doporucene revize
    Gordic.Previews.register("dpg:DoporuceneRevize", {
        canRender: function (dto) { return true; },

        render: function (div, dto) {
            var currentElement = $(div);

            //data jsou ready -> samotné vytvoření náhledu
            //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33130012" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33130012 : Revize

            var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
            form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
                gformsection("create").gpidbar({ pid: dto.ixp });

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" })  //breaks-300-400
                .addSection()
                .addRow("jres:33130051").addField("gstaticfield", { name: "revize" }) //RC 33130051 : Revize
                .addRow("jres:33130058").addField("gstaticfield", { name: "typRevize" }) //RC 33130058 : Typ revize
                .addRow("jres:33130057").addField("gstaticfield", { name: "modul" }) //RC 33130057 : Modul
                .addRow("jres:33130052").addField("gstaticfield", { name: "faze" }) //RC 33130052 : Fáze
                .addRow("jres:33130092").addField("gstaticfield", { name: "stav_faze_txt" }) //RC 33130092 : Stav fáze
            if (dto.stav_revize_txt == "Zakázaná") {
                formBuilder
                    .addRow("jres:33130093")  //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-times-circle g-state-text g-state-error",
                        customClass: "bold",
                        caption: "jres:33115364"  //RC 33115364 : Zakázaná
                    }) 
            }
            else if (dto.stav_revize_txt == "Doporučená") {
                formBuilder
                    .addRow("jres:33130093")  //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-check-circle g-state-text g-state-success",
                        customClass: "bold",
                        caption: "Doporučená"
                    }) 
            }
            else if (dto.stav_revize_txt == "Betatest") {
                formBuilder
                    .addRow("jres:33130093")   //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-exclamation-circle g-state-text g-state-warning",
                        customClass: "bold",
                        caption: "Betatest"
                    }) 
            }
            else if (dto.stav_revize_txt == "Alfatest") {
                formBuilder
                    .addRow("jres:33130093")  //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-exclamation-circle g-state-text g-state-warning",
                        customClass: "bold",
                        caption: "Alfatest"
                    }) 
            }
            else if (dto.stav_revize_txt == "Příprava") {
                formBuilder
                    .addRow("jres:33130093")  //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-info-circle g-state-text g-state-info",
                        customClass: "bold",
                        caption: "Ve výrobě"
                    }) 
            }
            else if (dto.stav_revize_txt == "Odmítnutá") {
                formBuilder
                    .addRow("jres:33130093") //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-times-circle g-state-text g-state-error",
                        customClass: "bold",
                        caption: "Odmítnutá"
                    }) 
            }
            else if (dto.stav_revize_txt == "Nedoporučená, k omezenému použití") {
                formBuilder
                    .addRow("jres:33130093") //RC 33130093 : Stav revize
                    .addField("gstatic", {
                        name: "stav_stat",
                        icon: "fa-exclamation-circle g-state-text g-state-important",
                        customClass: "bold",
                        caption: "Nedoporučená, k omezenému použití"
                    }) //RC 33115229 : Stav
            }
            else {
                formBuilder
                    .addRow("jres:33130093").addField("gstaticfield", { name: "stav_revize_txt", }) //RC 33130093 : Stav revize
            }
            formBuilder
                //.addRow("jres:33130091").addField("gstaticfield", { name: "stav_revize_txt" }) //RC 33130091 : Stav revize
                .addRow("jres:33130054").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33130054 : Zveřejněno
                .addRow("jres:33130055").addField("gstaticfield", { name: "verze" }) //RC 33130055 : Verze
                .addRow("jres:33130056").addField("gstaticfield", {
                    name: "velikost",
                    itemTemplate: function (obj) {
                        let stringRetVal = "";
                        if (obj) {
                            if (obj / (1024 * 1024 * 1024) >= 1) {  //v GiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / (1024 * 1024 * 1024) + "e+2")
                                ).toString() + "e-2")).toString() + " GB";
                            }
                            else if (obj / (1024 * 1024) >= 1) {  //v MiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / (1024 * 1024) + "e+2")
                                ) + "e-2")).toString() + " MB";
                            }
                            else if (obj / 1024 >= 1) {  //v KiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / 1024 + "e+2")
                                ) + "e-2")).toString() + " kB";
                            }
                            else {  //v B
                                stringRetVal = obj.toString() + " B";
                            }
                        } else {
                            stringRetVal = "0 B";
                        }
                        return stringRetVal;
                    },
                }) //RC 33130056 : Velikost souboru


            form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
            if (form.find("div")[24].innerText == 'Neurčeno') {
                form.find("div")[24].style.color = '#FFD700'
                form.find("div")[24].style.fontWeight = 'bold'
            }
            else if (form.find("div")[24].innerText == 'Ukončená') {
                form.find("div")[24].style.color = '#808080'
                form.find("div")[24].style.fontWeight = 'normal'
            }
            else if (form.find("div")[24].innerText == 'Neperspektivní') {
                form.find("div")[24].style.color = '#C63C3C'
                form.find("div")[24].style.fontWeight = 'bold'
            }
            else if (form.find("div")[24].innerText == 'Dočasná') {
                form.find("div")[24].style.color = 'saddlebrown'
                form.find("div")[24].style.fontWeight = 'normal'
            }
            else if (form.find("div")[24].innerText == 'Vývoj') {
                form.find("div")[24].style.color = '#6699FF'
                form.find("div")[24].style.fontWeight = 'normal'
            }
            else if (form.find("div")[24].innerText == 'K testování') {
                form.find("div")[24].style.color = '#2650B9'
                form.find("div")[24].style.fontWeight = 'bold'
            }
            else if (form.find("div")[24].innerText == 'Nová') {
                form.find("div")[24].style.color = '#27B779'
                form.find("div")[24].style.fontWeight = 'bold'
            }
            else if (form.find("div")[24].innerText == 'Perspektivní') {
                form.find("div")[24].style.color = 'black'
                form.find("div")[24].style.fontWeight = 'bold'
            }
            currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");

        },


    });

    //End of Doporucene revize

    //Preview pro ulohu Dalsi soubory
    Gordic.Previews.register("dpg:DalsiSoubory", {
        canRender: function (dto) { return true; },

        render: function (div, dto) {
            var currentElement = $(div);

            //data jsou ready -> samotné vytvoření náhledu
            //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33130061" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33130061 : Soubor

            var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
            form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
                gformsection("create").gpidbar({ pid: dto.ixp });

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" })  //breaks-300-400
                .addSection()
                .addRow("jres:33130062").addField("gstaticfield", { name: "ixs_dif" }) //RC 33130062 : ID souboru
                .addRow("jres:33130063").addField("gstaticfield", { name: "nazev" }) //RC 33130063 : Název souboru
                .addRow("jres:33130064").addField("gstaticfield", { name: "popis" }) //RC 33130064 : Popis
                .addRow("jres:33130094").addField("gstaticfield", { //RC 33130094 : Veřejný
                    name: "priz_verejny",
                    itemTemplate: (obj) => {
                        if (obj == 0) {
                            return "jres:33130095"; //RC 33130095 : Ne
                        }
                        else if (obj == 1) {
                            return "jres:33130096"; //RC 33130096 : Ano
                        }
                        else {
                            return "jres:33130097"; //RC 33130097 : Chyba
                        }
                    }
                })
                .addRow("jres:33130065").addField("gstaticfield", {
                    name: "velikost",
                    itemTemplate: function (obj) {
                        let stringRetVal = "";
                        if (obj) {
                            if (obj / (1024 * 1024 * 1024) >= 1) {  //v GiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / (1024 * 1024 * 1024) + "e+2")
                                ).toString() + "e-2")).toString() + " GB";
                            }
                            else if (obj / (1024 * 1024) >= 1) {  //v MiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / (1024 * 1024) + "e+2")
                                ) + "e-2")).toString() + " MB";
                            }
                            else if (obj / 1024 >= 1) {  //v KiB
                                stringRetVal = (+(Math.round(parseFloat(
                                    obj / 1024 + "e+2")
                                ) + "e-2")).toString() + " kB";
                            }
                            else {  //v B
                                stringRetVal = obj.toString() + " B";
                            }
                        } else {
                            stringRetVal = "0 B";
                        }
                        return stringRetVal;
                    },
                }) //RC 33130065 : Velikost
                .addRow("jres:33130066").addField("gstaticfield", { //RC 33130066 : Typ souboru
                    name: "typ_dif",
                    itemTemplate: (obj) => {
                        if (obj == 0) {
                            return "jres:33130067"; //RC 33130067 : Ostatní
                        }
                        else if (obj == 10) {
                            return "jres:33130068"; //RC 33130068 : Instalační DVD
                        }
                        else if (obj == 20) {
                            return "jres:33130069"; //RC 33130069 : GINIS Express
                        }
                        else if (obj == 30) {
                            return "jres:33130070"; //RC 33130070 : Produkty třetích stran
                        }
                        else {
                            return "jres:33130071"; //RC 33130071 : Chybný soubor
                        }

                    }
                })
                .addRow("jres:33130072").addField("gstaticfield", { name: "poznamka" }) //RC 33130072 : Poznámka
                .addRow("jres:33130073").addField("gstaticfield", { //RC 33130073 : Aktivita
                    name: "aktivita",
                    itemTemplate: (obj) => {
                        if (obj == 100) {
                            return "jres:33130074"; //RC 33130074 : Aktivní
                        }
                        else if (obj == 300) {
                            return "jres:33130075"; //RC 33130075 : Připraven
                        }
                        else if (obj == 500) {
                            return "jres:33130076"; //RC 33130076 : Neaktivní
                        }
                        else if (obj == 600) {
                            return "jres:33130077"; //RC 33130077 : Návrh
                        }
                        else if (obj == 900) {
                            return "jres:33130078"; //RC 33130078 : Zrušen
                        }
                        else {
                            return "jres:33130079"; //RC 33130079 : Chybná aktivita
                        }

                    }
                })
                .addRow("jres:33130080").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33130080 : Poslední změna
                .addRow("jres:33130081").addField("gstaticfield", { name: "zmenil" }) //RC 33130081 : Změnil
            form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
            currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");

        },


    });

    //End

    //Licence databazi

    Gordic.Previews.register("dpg:Licence", {
        canRender: function (dto) { return true; },

        render: function (div, dto) {
            var currentElement = $(div);

            //data jsou ready -> samotné vytvoření náhledu
            //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33130024" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33130024 : Licence

            var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
            form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
                gformsection("create").gpidbar({ pid: dto.ixp });

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" })  //breaks-300-400
                .addSection()
                .addRow("jres:33130025").addField("gstaticfield", { //RC 33130025 : Režim licence
                    name: "rezim_lic",
                    itemTemplate: (obj) => {
                        if (obj == 0) {
                            return "jres:33130026"; //RC 33130026 : Řádná
                        }
                        else if (obj == 10) {
                            return "jres:33130027"; //RC 33130027 : Technologická
                        }
                        else if (obj == 20) {
                            return "jres:33130028"; //RC 33130028 : Marketingová
                        }
                        else if (obj == 30) {
                            return "jres:33130029"; //RC 33130029 : SaaS
                        }
                        else if (obj == 40) {
                            return "jres:33130030"; //RC 33130030 : Gordic
                        }
                        else if (obj == 50) {
                            return "jres:33130031"; //RC 33130031 : Ultimate
                        }
                        else if (obj == 90) {
                            return "jres:33130032"; //RC 33130032 : Návrh
                        }
                        else {
                            return "jres:33130033"; //RC 33130033 : Chyba
                        }

                    }
                })
                .addRow("jres:33130034").addField("gstaticfield", { name: "pol" }) //RC 33130034 : Pol
                .addRow("jres:33130035").addField("gstaticfield", { name: "ppol" }) //RC 33130035 : PPol
                .addRow("jres:33130036").addField("gstaticfield", { name: "polPopis" }) //RC 33130036 : Popis Pol
                .addRow("jres:33130037").addField("gstaticfield", { name: "ppolPopis" }) //RC 33130037 : Popis PPol
                .addRow("jres:33130038").addField("gstaticfield", { name: "pocet" }) //RC 33130038 : Počet
                .addRow("jres:33130039").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:date}", valueType: "date", customClass: "font-weight: bold" }) //RC 33130039 : Datum změny
                .addRow("jres:33130040").addField("gstaticfield", { name: "dat_od", itemTemplate: "{#:date}", valueType: "date", customClass: "font-weight: bold" }) //RC 33130040 : Platnost od
                .addRow("jres:33130041").addField("gstaticfield", { name: "dat_do", itemTemplate: "{#:date}", valueType: "date", customClass: "font-weight: bold" }) //RC 33130041 : Platnost do
                .addRow("jres:33130042").addField("gstaticfield", { name: "popis" }) //RC 33130042 : Popis
                .addRow("jres:33130043").addField("gstaticfield", { name: "ico_fakt" }) //RC 33130043 : IČO pro fakturaci
                .addRow("jres:33130044").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33130044 : Poslední změna
                .addRow("jres:33130045").addField("gstaticfield", { name: "zmenil" }) //RC 33130045 : Změnil


            form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
            currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");

        },
    });

    //Licence databazi

    Gordic.Previews.register("dpg:LicCertPDF", {
        canRender: function (dto) { return true; },

        render: function (div, dto) {
            var currentElement = $(div);

            //data jsou ready -> samotné vytvoření náhledu
            //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33130082" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33130082 : Licenční certifikát

            var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
            form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
                gformsection("create").gpidbar({ pid: dto.ixp });

            var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" })  //breaks-300-400
                .addSection()
                .addRow("jres:33130083").addField("gstaticfield", { name: "nazevBalLic" }) //RC 33130083 : Balík licencí
                .addRow("jres:33130084").addField("gstaticfield", { name: "ixs_lip" }) //RC 33130084 : ID balíku licencí
                .addRow("jres:33130085").addField("gstaticfield", { name: "verze_lip" }) //RC 33130085 : Verze
                .addRow("jres:33130086").addField("gstaticfield", { name: "ixp" }) //RC 33130086 : IXP certifikátu
                .addRow("jres:33130087").addField("gstaticfield", { name: "poznamka" }) //RC 33130087 : Poznámka
                .addRow("jres:33130088").addField("gstaticfield", { name: "aktivita" }) //RC 33130088 : Aktivita
                .addRow("jres:33130089").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33130089 : Změněno
                .addRow("jres:33130045").addField("gstaticfield", { name: "zmenil" }) //RC 33130045 : Změnil


            form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
            currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");

        },
    });

    //End of Licence databazi

})(jQuery);