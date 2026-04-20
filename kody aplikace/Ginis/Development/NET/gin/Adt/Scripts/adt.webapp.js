"use strict";
//Preview pro ulohu Registr revizi
Gordic.Previews.register("adt:RegistrRevizi", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115226" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115226 : Revize
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115494").addField("gstaticfield", { name: "revize" }) //RC 33115494 : Revize
            .addRow("jres:33115362").addField("gstaticfield", { name: "modul" }) //RC 33115362 : Modul
            .addRow("jres:33115361").addField("gstaticfield", {
            name: "typ_revize",
            //itemTemplate: (obj) => {
            //    switch (obj) {
            //        case "0":
            //            return "jres:33115360"; //RC 33115360 : Modul
            //            break;
            //        case "S":
            //            return "jres:33115359"; //RC 33115359 : Sestavy
            //            break;
            //        case "D":
            //            return "jres:33115358"; //RC 33115358 : Dokumentace
            //            break;
            //        case "H":
            //            return "jres:33115357"; //RC 33115357 : Help
            //            break;
            //        default:
            //            return "jres:33115356"; //RC 33115356 : Chybný typ revize
            //    }
            //}
        }) //RC 33115227 : Revize
            .addRow("jres:33115424").addField("gstaticfield", { name: "typ_distribuce" }) //RC 33115424 : Typ distribuce
            .addRow("jres:33115423").addField("gstaticfield", { name: "zmenil" }) //RC 33115423 : Změnil
            .addRow("jres:33115368").addField("gstaticfield", { name: "lic" }) //RC 33115368 : Cílová licence
            .addRow("jres:33115228").addField("gstaticfield", { name: "faze" }); //RC 33115228 : Fáze
        if (dto.stav_revize == 90) {
            formBuilder
                .addRow("jres:33115229")
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-times-circle g-state-text g-state-error",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_revize",
                itemTemplate: function (obj) {
                    if (obj == 90) {
                        return "jres:33115364"; //RC 33115364 : Zakázaná
                        //return "<font color='red'>jres:33115364</font>"; //RC 33115364 : Zakázaná
                    }
                    else {
                        return obj;
                    }
                },
                customClass: "w-2 g-state-text g-state-error"
            }); //RC 33115229 : Stav
        }
        else if (dto.stav_revize == 0) {
            formBuilder
                .addRow("jres:33115229")
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-check-circle g-state-text g-state-success",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_revize",
                itemTemplate: function (obj) {
                    if (obj == 0) {
                        return "Doporučená"; //RC 33115364 : Zakázaná
                        //return "<font color='red'>jres:33115364</font>"; //RC 33115364 : Zakázaná
                    }
                    else {
                        return obj;
                    }
                },
                customClass: "w-2 g-state-text g-state-success"
            }); //RC 33115229 : Stav
        }
        else if (dto.stav_revize == 20) {
            formBuilder
                .addRow("jres:33115229")
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-exclamation-circle g-state-text g-state-warning",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_revize",
                itemTemplate: function (obj) {
                    if (obj == 20) {
                        return "K testování"; //RC 33115364 : Zakázaná
                        //return "<font color='red'>jres:33115364</font>"; //RC 33115364 : Zakázaná
                    }
                    else {
                        return obj;
                    }
                },
                customClass: "w-6 g-state-text g-state-warning"
            }); //RC 33115229 : Stav
        }
        else if (dto.stav_revize == 50) {
            formBuilder
                .addRow("jres:33115229")
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-exclamation-circle g-state-text g-state-important",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_revize",
                itemTemplate: function (obj) {
                    if (obj == 50) {
                        return "Nedoporučená, k omezenému použití"; //RC 33115364 : Zakázaná
                        //return "<font color='red'>jres:33115364</font>"; //RC 33115364 : Zakázaná
                    }
                    else {
                        return obj;
                    }
                },
                customClass: "w-10 g-state-text g-state-important"
            }); //RC 33115229 : Stav
        }
        else {
            formBuilder
                .addRow("jres:33115365").addField("gstaticfield", { name: "stav_revize_txt", }); //RC 33115365 : Stav
        }
        formBuilder
            .addRow("Zveřejněno").addField("gdatebox", { name: "dat_mpd", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }); //RC 33115442 : Poslední změna
        if (dto.dat_zmena != undefined) {
            formBuilder
                .addRow("jres:33115442").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }); //RC 33115442 : Poslední změna
        }
        else {
            formBuilder
                .addRow("jres:33115442").addField("gstaticfield", { name: "dat_zmena", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }); //RC 33115230 : Zveřejněno
        }
        formBuilder
            .addRow("jres:33115443").addField("gstaticfield", { name: "autor_revize" }) //RC 33115443 : Autor
            .addRow("Garant kvality").addField("gstaticfield", { name: "garant_kvality" }); //RC 33115443 : Autor
        if (dto.dat_revoke != undefined) {
            formBuilder
                .addRow("jres:33115231").addField("gdatebox", { name: "dat_revoke", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }); //RC 33115231 : Zakázáno
        }
        else {
            formBuilder
                .addRow("jres:33115231").addField("gstaticfield", { name: "dat_revoke", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }); //RC 33115231 : Zakázáno
        }
        if (dto.dat_vymaz != undefined) {
            formBuilder
                .addRow("jres:33115232").addField("gdatebox", { name: "dat_vymaz", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }); //RC 33115232 : Smazáno
        }
        else {
            formBuilder
                .addRow("jres:33115232").addField("gstaticfield", { name: "dat_vymaz", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }); //RC 33115232 : Smazáno
        }
        formBuilder
            //.addRow("jres:33115230").addField("gstaticfield", { name: "dat_zmena", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }) //RC 33115230 : Zveřejněno
            //.addRow("jres:33115231").addField("gstaticfield", { name: "dat_revoke", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }) //RC 33115231 : Zakázáno
            //.addRow("jres:33115232").addField("gstaticfield", { name: "dat_vymaz",  /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }) //RC 33115232 : Smazáno
            .addRow("Stav subverze DB").addField("gstaticfield", { name: "stav_sub_verze_db" }) //RC 33115405 : Minimální požadovaná verze DB
            .addRow("jres:33115233").addField("gstaticfield", { name: "sub_verze_db_min" }) //RC 33115233 : Min.subverze DB
            .addRow("jres:33115234").addField("gstaticfield", { name: "poznamka" }) //RC 33115234 : Veřejný důvod zákazu
            .addRow("Interní poznámky k revizi").addField("gstaticfield", { name: "interni_popis" }) //jres:33115422 : Interní poznámky k revizi
            .addRow("jres:33115236").addField("gstaticfield", { name: "verze" }) //RC 33115236 : Verze
            .addRow("jres:33115405").addField("gstaticfield", { name: "min_poz_verze_db" }) //RC 33115405 : Minimální požadovaná verze DB
            .addRow("jres:33115367").addField("gstaticfield", { name: "nazev_souboru" }) //RC 33115367 : Název souboru
            .addRow("jres:33115481").addField("gstaticfield", {
            name: "velikost",
            itemTemplate: function (obj) {
                var stringRetVal = "";
                if (obj) {
                    if (obj / (1024 * 1024 * 1024) >= 1) { //v GiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024 * 1024) + "e+2")).toString() + "e-2")).toString() + " GB";
                    }
                    else if (obj / (1024 * 1024) >= 1) { //v MiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024) + "e+2")) + "e-2")).toString() + " MB";
                    }
                    else if (obj / 1024 >= 1) { //v KiB
                        stringRetVal = (+(Math.round(parseFloat(obj / 1024 + "e+2")) + "e-2")).toString() + " kB";
                    }
                    else { //v B
                        stringRetVal = obj.toString() + " B";
                    }
                }
                else {
                    stringRetVal = "0 B";
                }
                return stringRetVal;
            },
        }); //RC 33130056 : Velikost souboru
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro obsah revize na Detailu revize
Gordic.Previews.register("adt:ObsahRevize", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "Soubor" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115226 : Revize
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115406").addField("gstaticfield", { name: "soubor" }) //RC 33115406 : Soubor
            .addRow("jres:33115227").addField("gstaticfield", { name: "revize" }) //RC 33115227 : Revize
            .addRow("jres:33115407").addField("gstaticfield", { name: "cesta" }) //RC 33115407 : Cesta
            .addRow("jres:33115408").addField("gstaticfield", { name: "crc" }) //RC 33115408 : CRC
            .addRow("jres:33115376").addField("gstaticfield", {
            name: "velikost",
            itemTemplate: function (obj) {
                var stringRetVal = "";
                if (obj) {
                    if (obj / (1024 * 1024 * 1024) >= 1) { //v GiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024 * 1024) + "e+2")).toString() + "e-2")).toString() + " GB";
                    }
                    else if (obj / (1024 * 1024) >= 1) { //v MiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024) + "e+2")) + "e-2")).toString() + " MB";
                    }
                    else if (obj / 1024 >= 1) { //v KiB
                        stringRetVal = (+(Math.round(parseFloat(obj / 1024 + "e+2")) + "e-2")).toString() + " kB";
                    }
                    else { //v B
                        stringRetVal = obj.toString() + " B";
                    }
                }
                else {
                    stringRetVal = "0 B";
                }
                return stringRetVal;
            },
        }) //RC 33115376 : Velikost
            .addRow("jres:33115409").addField("gstaticfield", { name: "soubor_h" }) //RC 33115409 : Soubor h
            .addRow("jres:33115410").addField("gstaticfield", { name: "alg_h" }) //RC 33115410 : Alg h
            .addRow("jres:33115411").addField("gstaticfield", { name: "verze" }) //RC 33115411 : Verze
            .addRow("jres:33115412").addField("gstaticfield", { name: "antivir_result" }); //RC 33115412 : Antivirová kontrola
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    }
});
//End
//Preview pro ulohu Reinstalacni baliky
Gordic.Previews.register("adt:ReinstalacniBaliky", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115116" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115116 : Seznam balíků
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixs_gdt });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115117").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                switch (obj) {
                    case 100:
                        return "jres:33115020"; //RC 33115020 : Aktivní
                        break;
                    case 300:
                        return "jres:33115021"; //RC 33115021 : Připraven
                        break;
                    case 500:
                        return "jres:33115023"; //RC 33115023 : Neaktivní
                        break;
                    case 600:
                        return "jres:33115024"; //RC 33115024 : Návrh
                        return;
                    case 900:
                        return "jres:33115025"; //RC 33115025 : Zrušen
                        break;
                    default:
                        return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115131").addField("gstaticfield", { name: "ixs_gdt" }) //RC 33115131 : Identifikátor
            .addRow("jres:33115132").addField("gstaticfield", { name: "nazev" }) //RC 33115132 : Název
            .addRow("jres:33115133").addField("gstaticfield", { name: "dat_zmena" }) //RC 33115133 : Datum poslední změny
            .addRow("jres:33115134").addField("gstaticfield", { name: "pocet_spusteni" }) //RC 33115134 : Počet spuštění
            .addRow("jres:33115135").addField("gstaticfield", { name: "pocet_ADLsouboru" }) //RC 33115135 : Počet ADL souborů
            .addRow("jres:33115136").addField("gstaticfield", {
            name: "typ_gdt",
            itemTemplate: function (obj) {
                switch (obj) {
                    case 0:
                        return "jres:33115118"; //RC 33115118 : Neveřejný/jednorázový
                        break;
                    case 10:
                        return "jres:33115119"; //RC 33115119 : Reinstalace / aktualizace
                        break;
                    case 20:
                        return "jres:33115120"; //RC 33115120 : Oprava dat
                        break;
                    case 30:
                        return "jres:33115121"; //RC 33115121 : Oprava aplikační logiky
                        return;
                    case 40:
                        return "jres:33115122"; //RC 33115122 : Aktivace / deaktivace funkcí
                        break;
                    case 50:
                        return "jres:33115123"; //RC 33115123 : Diagnostika dat
                        break;
                    case 60:
                        return "jres:33115124"; //RC 33115124 : Servisní script podle zadání zákazníka
                        break;
                    case 70:
                        return "jres:33115125"; //RC 33115125 : Makra pro ZUD
                        break;
                    case 80:
                        return "jres:33115126"; //RC 33115126 : Aktualizace číselníků
                        break;
                    default:
                        return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115137").addField("gstaticfield", {
            name: "priorita_gdt",
            itemTemplate: function (obj) {
                switch (obj) {
                    case 0:
                        return "jres:33115127"; //RC 33115127 : Neurčeno
                        break;
                    case 10:
                        return "jres:33115128"; //RC 33115128 : Doporučená
                        break;
                    case 20:
                        return "jres:33115129"; //RC 33115129 : Důležitá
                        break;
                    case 30:
                        return "jres:33115130"; //RC 33115130 : Kritická
                        return;
                    default:
                        return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115138").addField("gstaticfield", { name: "popis" }) //RC 33115138 : Popis
            .addRow("jres:33115139").addField("gstaticfield", { name: "dat_od" }) //RC 33115139 : Datum od
            .addRow("jres:33115140").addField("gstaticfield", { name: "dat_do" }) //RC 33115140 : Datum do
            .addRow("jres:33115141").addField("gstaticfield", { name: "dist_cond" }) //RC 33115141 : Distribuční podmínka
            .addRow("jres:33115142").addField("gstaticfield", { name: "run_cond" }) //RC 33115142 : Podmínka pro spuštění
            .addRow("jres:33115143").addField("gstaticfield", { name: "Autor.nazev" }); //RC 33115143 : Autor
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Chyby z reinstalací
Gordic.Previews.register("adt:ChybyReinstalaci", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115322" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115322 : ADL soubor
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115329").addField("gstaticfield", { name: "lic" }) //RC 33115329 : Licence
            .addRow("jres:33115324").addField("gstaticfield", { name: "adl" }) //RC 33115324 : Jméno ADL souboru
            .addRow("jres:33115344").addField("gstaticfield", { name: "ixs_gdt" }) //RC 33115344 : Identifikátor balíku
            .addRow("jres:33115325").addField("gdatebox", { name: "dat_start", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115325 : Čas spuštění GDZ balíku
            .addRow("jres:33115323").addField("gstaticfield", { name: "db_guid" }) //RC 33115323 : ID instance databáze
            .addRow("jres:33115345").addField("gstaticfield", { name: "run_id" }) //RC 33115345 : ID spuštení
            .addRow("jres:33115328").addField("gdatebox", { name: "dat_exs", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115328 : Datum expirace
            .addRow("jres:33115330").addField("gdatebox", { name: "dat_mpd", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115330 : Čas zápisu
            .addRow("jres:33115343").addField("gdatebox", { name: "dat_zprac", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115343 : Čas zpracování
            .addRow("jres:33115332").addField("gstaticfield", { name: "mail_response" }) //RC 33115332 : Mail
            .addRow("jres:33115333").addField("gstaticfield", {
            name: "stav_kontr_adl",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115340"; //RC 33115340 : Neurčeno
                }
                else if (obj == 10) {
                    return "jres:33115341"; //RC 33115341 : Bez chyb
                }
                else if (obj == 20) {
                    return "jres:33115342"; //RC 33115342 : Opraveno
                }
                else if (obj == 30) {
                    return "jres:33115334"; //RC 33115334 : Čeká na podrobnější analýzu
                }
                else if (obj == 40) {
                    return "Pjres:33115335"; //RC 33115335 : robíhá řešení chyb
                }
                else {
                    return "jres:33115336"; //RC 33115336 : Chybný stav
                }
            }
        })
            .addRow("jres:33115337").addField("gstaticfield", { name: "popis_reseni_txt" }) //RC 33115337 : Popis řešení
            .addRow("jres:33115338").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115338 : Změněno
            .addRow("jres:33115339").addField("gstaticfield", { name: "zmenil" }); //RC 33115339 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Dalsi soubory
Gordic.Previews.register("adt:DalsiSoubory", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var that = this;
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115372" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115372 : Soubor
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115373").addField("gstaticfield", { name: "ixs_dif" }) //RC 33115373 : ID souboru
            .addRow("jres:33115374").addField("gstaticfield", { name: "nazev" }) //RC 33115374 : Název souboru
            .addRow("jres:33115375").addField("gstaticfield", { name: "popis" }) //RC 33115375 : Popis
            .addRow("jres:33115376").addField("gstaticfield", {
            name: "velikost",
            itemTemplate: function (obj) {
                var stringRetVal = "";
                if (obj) {
                    if (obj / (1024 * 1024 * 1024) >= 1) { //v GiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024 * 1024) + "e+2")).toString() + "e-2")).toString() + " GB";
                    }
                    else if (obj / (1024 * 1024) >= 1) { //v MiB
                        stringRetVal = (+(Math.round(parseFloat(obj / (1024 * 1024) + "e+2")) + "e-2")).toString() + " MB";
                    }
                    else if (obj / 1024 >= 1) { //v KiB
                        stringRetVal = (+(Math.round(parseFloat(obj / 1024 + "e+2")) + "e-2")).toString() + " kB";
                    }
                    else { //v B
                        stringRetVal = obj.toString() + " B";
                    }
                }
                else {
                    stringRetVal = "0 B";
                }
                return stringRetVal;
            },
        }) //RC 33115376 : Velikost
            .addRow("jres:33115377").addField("gstaticfield", {
            name: "typ_dif",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115378"; //RC 33115378 : Ostatní
                }
                else if (obj == 10) {
                    return "jres:33115379"; //RC 33115379 : Instalační DVD
                }
                else if (obj == 20) {
                    return "jres:33115381"; //RC 33115381 : GINIS Express
                }
                else if (obj == 30) {
                    return "jres:33115382"; //RC 33115382 : Produkty třetích stran
                }
                else {
                    return "jres:33115383"; //RC 33115383 : Chybný soubor
                }
            }
        })
            .addRow("jres:33115384").addField("gstaticfield", { name: "poznamka" }) //RC 33115384 : Poznámka
            .addRow("jres:33115149").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115162").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115162 : Poslední změna
            .addRow("jres:33115163").addField("gstaticfield", { name: "zmenil" }); //RC 33115163 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
Gordic.Previews.register("adt:PrehledLicenciDatabaze", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("jres:33115060").addField("gstaticfield", { name: "poznamka" }) //RC 33115060 : Poznámka
            .addRow("jres:33115061").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115061 : Platnost od
            .addSection()
            .addRow("jres:33115062").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115062 : Platnost do
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            //.addRow("jres:33115149").addField("gstaticfield", { //RC 33115149 : Aktivita
            //    name: "aktivita",
            //    itemTemplate: (obj) => {
            //        if (obj == 100) {
            //            return "jres:33115020"; //RC 33115020 : Aktivní
            //        }
            //        else if (obj == 300) {
            //            return "jres:33115021"; //RC 33115021 : Připraven
            //        }
            //        else if (obj == 500) {
            //            return "jres:33115023"; //RC 33115023 : Neaktivní
            //        }
            //        else if (obj == 600) {
            //            return "jres:33115024"; //RC 33115024 : Návrh
            //        }
            //        else if (obj == 900) {
            //            return "jres:33115025"; //RC 33115025 : Zrušen
            //        }
            //        else {
            //            return "jres:33115022"; //RC 33115022 : Chybná aktivita
            //        }
            //    }
            //})
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }) //RC 33115064 : Změnil
            .addRow("jres:33115065").addField("gstaticfield", { name: "nazev" }) //RC 33115065 : Název
            .addSection()
            .addRow("jres:33115067").addField("gstaticfield", { name: "projekt" }) //RC 33115067 : Projekt
            .addRow("jres:33115068").addField("gstaticfield", {
            name: "tyi",
            itemTemplate: function (obj) {
                if (obj == "jres:33115035") { //RC 33115035 : A
                    return "jres:33115036"; //RC 33115036 : MO
                }
                else if (obj == "jres:33115037") { //RC 33115037 : B
                    return "jres:33115038"; //RC 33115038 : ISTA
                }
                else if (obj == "jres:33115039") { //RC 33115039 : C
                    return "jres:33115040"; //RC 33115040 : USC
                }
                else if (obj == "jres:33115041") { //RC 33115041 : D
                    return "jres:33115042"; //RC 33115042 : PO ÚSC
                }
                else if (obj == "jres:33115043") { //RC 33115043 : G
                    return "jres:33115044"; //RC 33115044 : Anglická mutace
                }
                else if (obj == "jres:33115045") { //RC 33115045 : M
                    return "jres:33115046"; //RC 33115046 : ÚSC S PPOL (dříve MHMP či Město Praha)
                }
                else if (obj == "jres:33115047") { //RC 33115047 : O
                    return "jres:33115048"; //RC 33115048 : OSS
                }
                else if (obj == "jres:33115049") { //RC 33115049 : P
                    return "jres:33115050"; //RC 33115050 : ÚP
                }
                else if (obj == "jres:33115051") { //RC 33115051 : Q
                    return "jres:33115052"; //RC 33115052 : PO OSS
                }
                else if (obj == "jres:33115053") { //RC 33115053 : X
                    return "jres:33115054"; //RC 33115054 : Univerzální
                }
                else if (obj == "jres:33115055") { //RC 33115055 : Y
                    return "jres:33115056"; //RC 33115056 : Slovenská mutace
                }
                else {
                    return "jres:33115057"; //RC 33115057 : Chyba
                }
            }
        })
            .addRow("jres:33115069").addField("gstaticfield", { name: "typ_db" }) //RC 33115069 : Typ databáze
            .addRow("jres:33115070").addField("gstaticfield", {
            name: "kultura",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115027"; //RC 33115027 : Čeština
                }
                else if (obj == 10) {
                    return "jres:33115028"; //RC 33115028 : Slovenčina
                }
                else if (obj == 20) {
                    return "jres:33115029"; //RC 33115029 : English (United Kingdom)
                }
                else if (obj == 30) {
                    return "jres:33115030"; //RC 33115030 : Ruština
                }
                else if (obj == 40) {
                    return "jres:33115031"; //RC 33115031 : Srbsko - cyrilice
                }
                else if (obj == 50) {
                    return "jres:33115032"; //RC 33115032 : Ukraine
                }
                else if (obj == 999) {
                    return "jres:33115033"; //RC 33115033 : ČEŠTINA - TEST LOKALIZACE
                }
                else if (obj == 1000) {
                    return "jres:33115034"; //RC 33115034 : International
                }
                else {
                    return "jres:33115026"; //RC 33115026 : Chyba
                }
            }
        })
            .addSection()
            .addRow("jres:33115071").addField("gdatebox", { name: "dat_mpd", valueType: "date", customClass: "font-weight: bold" }); //RC 33115071 : Vznik databáze
        //.addRow("jres:33115073").addField("gstaticfield", { name: "lic_db" }); //RC 33115073 : Licence fyzické databáze
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Skupiny databazi 
Gordic.Previews.register("adt:SkupinyDatabazi", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.ixs_sdb + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115144").addField("gstaticfield", { name: "ixs_sdb" }) //RC 33115144 : Skupina databází
            .addRow("jres:33115145").addField("gstaticfield", { name: "nazev" }) //RC 33115145 : Název
            .addRow("jres:33115146").addField("gstaticfield", { name: "zkratka" }) //RC 33115146 : Zkratka
            .addRow("jres:33115147").addField("gstaticfield", {
            name: "typ_sdb",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115075"; //RC 33115075 : Základní rozdělení podle garantů
                }
                else if (obj == 10) {
                    return "jres:33115076"; //RC 33115076 : Operativní skupina databází
                }
                else {
                    return "jres:33115074"; //RC 33115074 : Chyba
                }
            }
        })
            .addRow("jres:33115148").addField("gstaticfield", { name: "poznamka" }) //RC 33115148 : Poznámka
            .addRow("jres:33115149").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115150").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115150 : Poslední změna
            .addRow("jres:33115151").addField("gstaticfield", { name: "zmenil" }) //RC 33115151 : Změnil
            .addRow("jres:33115388").addField("gstaticfield", {
            name: "rezim_aktual",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115077"; //RC 33115077 : Všechny
                }
                else if (obj == 10) {
                    return "jres:33115078"; //RC 33115078 : Nejnovější
                }
                else if (obj == 20) {
                    return "jres:33115079"; //RC 33115079 : Vyjmenované
                }
                else {
                    return "jres:33115080"; //RC 33115080 : Chyba
                }
            }
        })
            .addRow("jres:33115387").addField("gstaticfield", {
            name: "rezim_aktual_gdz",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115077"; //RC 33115077 : Všechny
                }
                else if (obj == 10) {
                    return "jres:33115078"; //RC 33115078 : Nejnovější
                }
                else if (obj == 20) {
                    return "jres:33115079"; //RC 33115079 : Vyjmenované
                }
                else {
                    return "jres:33115080"; //RC 33115080 : Chyba
                }
            }
        })
            .addRow("jres:33115153").addField("gstaticfield", {
            name: "priz_akut_gdz",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115081"; //RC 33115081 : Ne
                }
                else if (obj == 1) {
                    return "jres:33115082"; //RC 33115082 : Ano
                }
                else {
                    return "jres:33115083"; //RC 33115083 : Chyba
                }
            }
        });
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Primarni licence
Gordic.Previews.register("adt:PrimarniLicenceDB", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115154").addField("gstaticfield", { name: "lic_fyz" }) //RC 33115154 : Primární licence databáze
            .addRow("jres:33115155").addField("gstaticfield", { name: "nazev" }) //RC 33115155 : Název
            .addRow("jres:33115156").addField("gstaticfield", { name: "popis" }) //RC 33115156 : Popis
            .addRow("jres:33115157").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115158").addField("gstaticfield", { name: "poznamka" }) //RC 33115158 : Poznámka
            .addRow("jres:33115159").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115159 : Platnost od
            .addRow("jres:33115160").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115160 : Platnost do
            .addRow("jres:33115161").addField("gdatebox", { name: "dat_mpd", valueType: "date", customClass: "font-weight: bold" }) //RC 33115161 : Datum vzniku
            .addRow("jres:33115162").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115162 : Poslední změna
            .addRow("jres:33115163").addField("gstaticfield", { name: "zmenil" }) //RC 33115163 : Změnil
            .addRow("jres:33115388").addField("gstaticfield", {
            name: "rezim_aktual",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115077"; //RC 33115077 : Všechny
                }
                else if (obj == 10) {
                    return "jres:33115078"; //RC 33115078 : Nejnovější
                }
                else if (obj == 20) {
                    return "jres:33115079"; //RC 33115079 : Vyjmenované
                }
                else {
                    return "jres:33115080"; //RC 33115080 : Chyba
                }
            }
        })
            .addRow("jres:33115387").addField("gstaticfield", {
            name: "rezim_aktual_gdz",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115077"; //RC 33115077 : Všechny
                }
                else if (obj == 10) {
                    return "jres:33115078"; //RC 33115078 : Nejnovější
                }
                else if (obj == 20) {
                    return "jres:33115079"; //RC 33115079 : Vyjmenované
                }
                else {
                    return "jres:33115080"; //RC 33115080 : Chyba
                }
            }
        });
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Primarni licence
Gordic.Previews.register("adt:LicenceDatabazi", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115438").addField("gstaticfield", { name: "lic_fyz" }) //RC 33115438 : Licence databáze
            .addRow("jres:33115155").addField("gstaticfield", { name: "nazev" }); //RC 33115155 : Název
        if (dto.prod_rada == 0) {
            formBuilder
                .addRow("Modul").addField("gstaticfield", { name: "modul_G0_nazev" }); //RC 33115155 : Název
        }
        formBuilder
            .addRow("jres:33115156").addField("gstaticfield", { name: "popis" }) //RC 33115156 : Popis
            .addRow("jres:33115157").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115158").addField("gstaticfield", { name: "poznamka" }) //RC 33115158 : Poznámka
            .addRow("jres:33115159").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115159 : Platnost od
            .addRow("jres:33115160").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115160 : Platnost do
            .addRow("jres:33115161").addField("gdatebox", { name: "dat_mpd", valueType: "date", customClass: "font-weight: bold" }) //RC 33115161 : Datum vzniku
            .addRow("jres:33115162").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115162 : Poslední změna
            .addRow("jres:33115163").addField("gstaticfield", { name: "zmenil" }); //RC 33115163 : Změnil
        if (dto.prod_rada != 0) {
            formBuilder
                .addRow("jres:33115388").addField("gstaticfield", {
                name: "rezim_aktual",
                itemTemplate: function (obj) {
                    if (obj == 0) {
                        return "jres:33115077"; //RC 33115077 : Všechny
                    }
                    else if (obj == 10) {
                        return "jres:33115078"; //RC 33115078 : Nejnovější
                    }
                    else if (obj == 20) {
                        return "jres:33115079"; //RC 33115079 : Vyjmenované
                    }
                    else {
                        return "jres:33115080"; //RC 33115080 : Chyba
                    }
                }
            })
                .addRow("jres:33115387").addField("gstaticfield", {
                name: "rezim_aktual_gdz",
                itemTemplate: function (obj) {
                    if (obj == 0) {
                        return "jres:33115077"; //RC 33115077 : Všechny
                    }
                    else if (obj == 10) {
                        return "jres:33115078"; //RC 33115078 : Nejnovější
                    }
                    else if (obj == 20) {
                        return "jres:33115079"; //RC 33115079 : Vyjmenované
                    }
                    else {
                        return "jres:33115080"; //RC 33115080 : Chyba
                    }
                }
            });
        }
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Primarni licence
Gordic.Previews.register("adt:AdministraceLicDB", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic_fyz + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        currentElement.empty(); /*.append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'></h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");*/
        //var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        var form = $("<div>").appendTo(currentElement);
        form.gform("viewMode", ""); //prepnuti do view rezimu    
        form.gform("setup", { layoutDescriptor: "L1M1S1" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" }); //breaks-300-400
        //.addSection(" ")
        if (dto.vgdeslok_exist == 1) {
            formBuilder
                .addRow().addField("gstatic", {
                name: "stavDB",
                customClass: "w-2",
            })
                .addField("gstatic", {
                name: "stavDB",
                customClass: "w-2",
            })
                .addField("gstatic", {
                name: "stavDB_stat",
                icon: "fa-check-circle g-state-text g-state-success minifoto",
                tooltip: "Licence databáze <b>" + dto.lic_fyz + "</b> je správně naadministrována",
                customClass: "w-2",
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "lic_fyz",
                itemTemplate: function (obj) {
                    return "Licence databáze <b>" + obj + "</b> je správně naadministrována"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12 g-state-text "
            });
            //.addSection(" ")
        }
        else {
            formBuilder
                .addRow().addField("gstatic", {
                name: "stavDB",
                customClass: "w-2",
            })
                .addField("gstatic", {
                name: "stavDB",
                customClass: "w-2",
            })
                .addField("gstatic", {
                name: "stavDB_stat",
                icon: "fa-exclamation-triangle g-state-text g-state-warning minifoto",
                tooltip: "Licence databáze <b>" + dto.lic_fyz + "</b> není dostatečně naadministrována!",
                customClass: "w-2"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "lic_fyz",
                itemTemplate: function (obj) {
                    return "Licence databáze <b>" + obj + "</b> není dostatečně naadministrována!"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12 g-state-text "
            });
            formBuilder
                .addSection(" ")
                .addRow("").addField("gstaticfield", {
                name: "lic_fyz",
                itemTemplate: function (obj) {
                    return "<b>Ověřte následující údaje:";
                },
                customClass: "w-12 g-state-text "
            }).addRow("")
                .addField("gstaticfield", {
                name: "vgdeslok_exist",
                itemTemplate: function (obj) {
                    return "• Licence databáze existuje v tabulce provozních databází všech detekovaných zákazníků GINIS (gdesdbo - plněna při každém ověření verze GDZ balíku před spuštěním do cílové databáze)"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12"
            })
                .addRow("")
                .addRow("")
                //.addRow("• Licence databáze je navázána na licenci řady pro generování identifikátorů (PID)")
                .addField("gstaticfield", {
                name: "poznamka",
                itemTemplate: function (obj) {
                    return "• Licence databáze je navázána do centrální skupiny databází"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12"
            })
                .addRow("")
                .addRow("")
                //.addRow("• Licence databáze je navázána na licenci řady pro generování identifikátorů (PID)")
                .addField("gstaticfield", {
                name: "poznamka",
                itemTemplate: function (obj) {
                    return "• Licence databáze je navázána na licenci řady pro generování identifikátorů (PID)"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12"
            })
                .addRow("")
                .addRow("")
                //.addRow("• Licence databáze je navázána na licenci řady pro generování identifikátorů (PID)")
                .addField("gstaticfield", {
                name: "poznamka",
                itemTemplate: function (obj) {
                    return "• K navázané Licenci řady PID je doplněn příslušný typ implementace "; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12"
            })
                .addRow("")
                .addRow("")
                //.addRow("• Licence databáze je navázána na licenci řady pro generování identifikátorů (PID)")
                .addField("gstaticfield", {
                name: "poznamka",
                itemTemplate: function (obj) {
                    return "• K navázané Licenci řady PID existuje vazba na balík licencí "; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-12"
            });
        }
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        form.gform("viewMode", ""); //prepnuti do view rezimu    
        //currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Licence rad PID
Gordic.Previews.register("adt:LicenceRadPID", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection();
        if (dto.ico_adm_exist == 1) {
            formBuilder
                .addRow("Kontrola administrace") //RC 33115414 : Stav kontroly
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-check-circle g-state-text g-state-success",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "ico_adm_exist",
                itemTemplate: function (obj) {
                    obj = "jres:33115483";
                    return "jres:33115483"; //RC 33115483 : Licence řady PID je navázána IČO pro administraci
                },
                customClass: "w-10 g-state-text "
            });
        }
        else {
            formBuilder
                .addRow("jres:33115414") //RC 33115414 : Stav kontroly
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-exclamation-triangle g-state-text g-state-warning",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "ico_adm_exist",
                itemTemplate: function (obj) {
                    obj = "jres:33115484";
                    return "jres:33115484"; //RC 33115484 : Licence řady PID není navázána na žádné IČO pro administraci!
                },
                customClass: "w-10 g-state-text "
            });
        }
        formBuilder
            .addRow("jres:33115165").addField("gstaticfield", { name: "lic" }) //RC 33115165 : Licence řady PID
            .addRow("jres:33115166").addField("gstaticfield", { name: "lic_fyz" }) //RC 33115166 : Primární licence databáze
            .addRow("jres:33115167").addField("gstaticfield", { name: "nazev" }) //RC 33115167 : Název
            .addRow("jres:33115482").addField("gstaticfield", {
            name: "prod_rada", itemTemplate: function (obj) {
                if (obj == 1000) {
                    return "G1"; //RC 33115020 : Aktivní
                }
                else {
                    return "G0"; //RC 33115022 : Chybná aktivita
                }
            }
        }) //RC 33115482 : Produktová řada
            .addRow("jres:33115168").addField("gstaticfield", { name: "popis" }) //RC 33115168 : Popis
            .addRow("jres:33115169").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115170").addField("gstaticfield", { name: "poznamka" }) //RC 33115170 : Poznámka
            .addRow("jres:33115171").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115171 : Platnost od
            .addRow("jres:33115172").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115172 : Platnost do
            .addRow("jres:33115173").addField("gdatebox", { name: "dat_mpd", valueType: "date", customClass: "font-weight: bold" }) //RC 33115173 : Datum vzniku
            .addRow("jres:33115174").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115174 : Poslední změna
            .addRow("jres:33115175").addField("gstaticfield", { name: "zmenil" }); //RC 33115175 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Baliky licenci 
Gordic.Previews.register("adt:BalikyLicenci", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.ixs_lip + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115176").addField("gstaticfield", { name: "ixs_lip" }) //RC 33115176 : ID balíku licencí
            .addRow("jres:33115177").addField("gstaticfield", { name: "nazev" }) //RC 33115177 : Název
            .addRow("jres:33115178").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115178 : IČO pro fakturaci
            .addRow("jres:33115366").addField("gstaticfield", { name: "ico_fakt_nazev" }) //RC 33115366 : Organizace pro fakturaci
            //.addRow("jres:33115179").addField("gstaticfield", { name: "ico_adm" }) //RC 33115179 : IČO pro administraci
            .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
            .addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115181 : Platnost do
            .addRow("jres:33115450").addField("gstaticfield", { name: "smlouva" }) //RC 33115450 : Smlouva licenční
            .addRow("jres:33115451").addField("gstaticfield", { name: "smlouva_provoz" }) //RC 33115451 : Smlouva provozní
            .addRow("jres:33115182").addField("gstaticfield", { name: "poznamka" }) //RC 33115182 : Poznámka
            .addRow("jres:33115183").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            //    //nova pole, ref T17545
            .addRow("jres:33115402").addField("gstaticfield", {
            name: "distributor",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115389"; //RC 33115389 : Centrála
                }
                else if (obj == 1) {
                    return "jres:33115390"; //RC 33115390 : Pobočka Praha
                }
                else if (obj == 2) {
                    return "jres:33115391"; //RC 33115391 : Pobočka Brno
                }
                else if (obj == 3) {
                    return "jres:33115392"; //RC 33115392 : Pobočka Ostrava
                }
                else if (obj == 4) {
                    return "jres:33115393"; //RC 33115393 : KMS
                }
                else if (obj == 5) {
                    return "jres:33115421"; //RC 33115421 : BNSOFT
                }
                else if (obj == 6) {
                    return "jres:33115395"; //RC 33115395 : Haida
                }
                else if (obj == 7) {
                    return "jres:33115396"; //RC 33115396 : Datab
                }
                else {
                    return ""; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115403").addField("gstaticfield", {
            name: "obchodnik",
            itemTemplate: function (obj) {
                if (dto.distributor == 0 && obj == 0) {
                    return "jres:33115452"; //RC 33115452 : GORDIC, centrála
                }
                else if (dto.distributor == 0 && obj == 8) {
                    return "jres:33115453"; //RC 33115453 : Centrální řada
                }
                else if (dto.distributor == 1 && obj == 0) {
                    return "jres:33115454"; //RC 33115454 : GORDIC, pobočka Praha
                }
                else if (dto.distributor == 1 && obj == 8) {
                    return "jres:33115455"; //RC 33115455 : Centrální řada
                }
                else if (dto.distributor == 2 && obj == 0) {
                    return "jres:33115456"; //RC 33115456 : GORDIC, pobočka Brno
                }
                else if (dto.distributor == 2 && obj == 8) {
                    return "jres:33115457"; //RC 33115457 : Centrální řada
                }
                else if (dto.distributor == 3 && obj == 0) {
                    return "jres:33115458"; //RC 33115458 : GORDIC, pobočka Ostrava
                }
                else if (dto.distributor == 3 && obj == 8) {
                    return "jres:33115459"; //RC 33115459 : Centrální řada
                }
                else if (dto.distributor == 4 && obj == 0) {
                    return "jres:33115460"; //RC 33115460 : KMS s.r.o.
                }
                else if (dto.distributor == 4 && obj == 1) {
                    return "jres:33115461"; //RC 33115461 : VAR CHRUDIM
                }
                else if (dto.distributor == 4 && obj == 2) {
                    return "jres:33115462"; //RC 33115462 : ORION
                }
                else if (dto.distributor == 4 && obj == 3) {
                    return "jres:33115463"; //RC 33115463 : DATA LOGIC
                }
                else if (dto.distributor == 4 && obj == 4) {
                    return "jres:33115464"; //RC 33115464 : NET Partners, a.s.
                }
                else if (dto.distributor == 4 && obj == 8) {
                    return "jres:33115465"; //RC 33115465 : Centrální řada
                }
                else if (dto.distributor == 5 && obj == 0) {
                    return "jres:33115466"; //RC 33115466 : FPO
                }
                else if (dto.distributor == 5 && obj == 1) {
                    return "jres:33115467"; //RC 33115467 : ASI
                }
                else if (dto.distributor == 5 && obj == 3) {
                    return "jres:33115468"; //RC 33115468 : KORAC
                }
                else if (dto.distributor == 5 && obj == 4) {
                    return "jres:33115469"; //RC 33115469 : BNSOFT
                }
                else if (dto.distributor == 5 && obj == 8) {
                    return "jres:33115470"; //RC 33115470 : Centrální řada
                }
                else if (dto.distributor == 6 && obj == 0) {
                    return "jres:33115471"; //RC 33115471 : HAiDA s.r.o.
                }
                else if (dto.distributor == 6 && obj == 1) {
                    return "jres:33115472"; //RC 33115472 : HAiDA-IS
                }
                else if (dto.distributor == 6 && obj == 4) {
                    return "jres:33115473"; //RC 33115473 : HAiDA - UNIS
                }
                else if (dto.distributor == 6 && obj == 6) {
                    return "jres:33115474"; //RC 33115474 : HAiDA - VAR HRANICE
                }
                else if (dto.distributor == 6 && obj == 8) {
                    return "jres:33115475"; //RC 33115475 : Centrální řada
                }
                else if (dto.distributor == 7 && obj == 0) {
                    return "jres:33115476"; //RC 33115476 : DATAB
                }
                else if (dto.distributor == 7 && obj == 2) {
                    return "jres:33115477"; //RC 33115477 : VAR Mikš
                }
                else if (dto.distributor == 7 && obj == 8) {
                    return "jres:33115475"; //RC 33115475 : Centrální řada
                }
                else {
                    return ""; //RC 33115022 : Chybná aktivita
                }
            }
        }) //RC 33115403 : VAR
            .addRow("jres:33115420").addField("gstaticfield", { name: "zak" }) //RC 33115420 : ZAK
            .addRow("Název ZAK").addField("gstaticfield", { name: "zak_txt" }) //RC 33115420 : ZAK
            .addRow("jres:33115404").addField("gstaticfield", {
            name: "ob_model",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115397"; //RC 33115397 : Trvalá licence
                }
                else if (obj == 10) {
                    return "jres:33115398"; //RC 33115398 : SaaS
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("Cloud").addField("gstaticfield", {
            name: "provoz_cloud_txt",
        })
            .addRow("jres:33115418").addField("gstaticfield", {
            name: "url_crm",
            itemTemplate: function (obj) {
                if (obj != null) {
                    return "<a href='https://" + obj + "/' target='_blank'>  " + obj + "</a> ";
                }
                else {
                    return "";
                }
            }
        })
            .addRow("jres:33115419").addField("gstaticfield", {
            name: "url_cloud",
            itemTemplate: function (obj) {
                if (obj != null) {
                    return "<a href='https://" + obj + "/' target='_blank'>  " + obj + "</a> ";
                }
                else {
                    return "";
                }
            }
        });
        if (dto.dat_plat_cloud_od != undefined) {
            formBuilder
                .addRow("Platba cloud od").addField("gdatebox", { name: "dat_plat_cloud_od", /*valueType: "datetime", hideZeroTime: true,*/ customClass: "font-weight: bold" }); //RC 33115399 : Poslední export do KOF
        }
        else {
            formBuilder
                .addRow("Platba cloud od").addField("gstaticfield", { name: "dat_plat_cloud_od" }); //RC 33115399 : Poslední export do KOF
        }
        if (dto.dat_plat_lic_od != undefined) {
            formBuilder
                .addRow("Platba licencí od").addField("gdatebox", { name: "dat_plat_lic_od", /*valueType: "datetime", hideZeroTime: true,*/ customClass: "font-weight: bold" }); //RC 33115399 : Poslední export do KOF
        }
        else {
            formBuilder
                .addRow("Platba licencí od").addField("gstaticfield", { name: "dat_plat_lic_od" }); //RC 33115399 : Poslední export do KOF
        }
        if (dto.dat_exp_kof != undefined) {
            formBuilder
                .addRow("jres:33115399").addField("gdatebox", { name: "dat_exp_kof", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }); //RC 33115399 : Poslední export do KOF
        }
        else {
            formBuilder
                .addRow("jres:33115399").addField("gstaticfield", { name: "dat_exp_kof" }); //RC 33115399 : Poslední export do KOF
        }
        if (dto.posledni_fakturace != undefined) {
            formBuilder
                .addRow("jres:33115400").addField("gdatebox", { name: "posledni_fakturace", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }); //RC 33115400 : Poslední fakturace
        }
        else {
            formBuilder
                .addRow("jres:33115400").addField("gstaticfield", { name: "posledni_fakturace" }); //RC 33115400 : Poslední fakturace
        }
        if (dto.pristi_fakturace != undefined) {
            formBuilder
                .addRow("jres:33115401").addField("gdatebox", { name: "pristi_fakturace", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }); //RC 33115401 : Příští fakturace
        }
        else {
            formBuilder
                .addRow("jres:33115401").addField("gstaticfield", { name: "pristi_fakturace" }); //RC 33115401 : Příští fakturace
        }
        formBuilder
            .addRow("jres:33115184").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115184 : Poslední změna
            .addRow("jres:33115185").addField("gstaticfield", { name: "zmenil" }) //RC 33115185 : Změnil
            .addRow("jres:33115186").addField("gstaticfield", { name: "popis" }) //RC 33115186 : Popis
            .addRow("jres:33115187").addField("gstaticfield", { name: "edice" }); //RC 33115187 : Edice
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Verze databaze - Verze
Gordic.Previews.register("adt:Verze", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115239" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115239 : Verze
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115241").addField("gstaticfield", { name: "verze_db" }) //RC 33115241 : Verze databáze
            .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
            .addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115181 : Platnost do
            .addRow("jres:33115251").addField("gstaticfield", {
            name: "stav_verze",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115257"; //RC 33115257 : Vývoj
                }
                else if (obj == 10) {
                    return "jres:33115258"; //RC 33115258 : Distribuce
                }
                else if (obj == 20) {
                    return "jres:33115259"; //RC 33115259 : Uzavřeno
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115251 : Stav verze
            .addRow("jres:33115243").addField("gstaticfield", { name: "poznamka" }); //RC 33115243 : Poznámka
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
Gordic.Previews.register("adt:PrehledProduktu", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115278" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115278 : Produkt
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("jres:33115279").addField("gstaticfield", { name: "nazev_lic" }); //RC 33115279 : Název licence
        if (dto.stav_kontroly_lic == "OK") {
            formBuilder
                .addRow("jres:33115414") //RC 33115414 : Stav kontroly
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-check-circle g-state-text g-state-success",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_kontroly_lic",
                itemTemplate: function (obj) {
                    obj = "jres:33115415";
                    return "jres:33115415"; //RC 33115415 : Platná kombinace Pol | PPol
                },
                customClass: "w-2 g-state-text "
            });
        }
        else {
            formBuilder
                .addRow("jres:33115414") //RC 33115414 : Stav kontroly
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-exclamation-triangle g-state-text g-state-warning",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_kontroly_lic",
                itemTemplate: function (obj) {
                    obj = "jres:33115416";
                    return "jres:33115416"; //RC 33115416 : Chybí nadřízená PPol
                },
                customClass: "w-2 g-state-text "
            });
        }
        formBuilder
            .addRow("jres:33115417").addField("gstaticfield", { name: "stav_kontroly_ppol" }) //RC 33115417 : Stav PPol
            .addRow("jres:33115280").addField("gstaticfield", { name: "pol" }) //RC 33115280 : Pol
            .addRow("jres:33115281").addField("gstaticfield", { name: "ppol" }) //RC 33115281 : PPol
            .addRow("jres:33115282").addField("gstaticfield", { name: "pocet" }) //RC 33115282 : Počet licencí
            .addRow("jres:33115283").addField("gstaticfield", {
            name: "rezim_lic",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115294"; //RC 33115294 : Řádná
                }
                else if (obj == 10) {
                    return "jres:33115293"; //RC 33115293 : Technologická
                }
                else if (obj == 20) {
                    return "jres:33115292"; //RC 33115292 : Marketingová
                }
                else if (obj == 30) {
                    return "jres:33115291"; //RC 33115291 : SaaS
                }
                else if (obj == 40) {
                    return "jres:33115290"; //RC 33115290 : Gordic
                }
                else if (obj == 50) {
                    return "jres:33115289"; //RC 33115289 : Ultimate
                }
                else if (obj == 90) {
                    return "jres:33115288"; //RC 33115288 : Návrh
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115283 : Režim licence
            .addRow("jres:33115061").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115061 : Platnost od
            .addSection()
            .addRow("jres:33115062").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115062 : Platnost do
            .addRow("jres:33115285").addField("gstaticfield", { name: "popis" }) //RC 33115285 : Popis
            .addRow("jres:33115286").addField("gstaticfield", { name: "polPopis" }) //RC 33115286 : Popis Pol
            .addRow("jres:33115287").addField("gstaticfield", { name: "ppolPopis" }) //RC 33115287 : Popis PPol
            .addRow("jres:33115284").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115284 : IČO pro fakturaci
            .addRow("jres:33115296").addField("gstaticfield", { name: "ico_fakt_nazev" }) //RC 33115296 : Organizace pro fakturaci
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            .addRow("jres:33115478").addField("gstaticfield", { name: "ixs_lip" }) //RC 33115478 : ID balíku licencí
            .addRow("jres:33115479").addField("gstaticfield", { name: "nazev_bal_lic" }) //RC 33115479 : Název balíku licencí
            .addRow("jres:33115480").addField("gstaticfield", { name: "radek_lip" }) //RC 33115480 : Číslo řádku v obsahu balíku licencí
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }); //RC 33115064 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
Gordic.Previews.register("adt:KonciciLicence", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115319" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115319 : Licence
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("jres:33115279").addField("gstaticfield", { name: "nazev_lic" }) //RC 33115279 : Název licence
            .addRow("jres:33115280").addField("gstaticfield", { name: "pol" }) //RC 33115280 : Pol
            .addRow("jres:33115281").addField("gstaticfield", { name: "ppol" }) //RC 33115281 : PPol
            .addRow("jres:33115282").addField("gstaticfield", { name: "pocet" }) //RC 33115282 : Počet licencí
            .addRow("jres:33115283").addField("gstaticfield", {
            name: "rezim_lic",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115294"; //RC 33115294 : Řádná
                }
                else if (obj == 10) {
                    return "jres:33115293"; //RC 33115293 : Technologická
                }
                else if (obj == 20) {
                    return "jres:33115292"; //RC 33115292 : Marketingová
                }
                else if (obj == 30) {
                    return "jres:33115291"; //RC 33115291 : SaaS
                }
                else if (obj == 40) {
                    return "jres:33115290"; //RC 33115290 : Gordic
                }
                else if (obj == 50) {
                    return "jres:33115289"; //RC 33115289 : Ultimate
                }
                else if (obj == 90) {
                    return "jres:33115288"; //RC 33115288 : Návrh
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115283 : Režim licence
            .addRow("jres:33115061").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115061 : Platnost od
            .addSection()
            .addRow("jres:33115062").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115062 : Platnost do
            .addRow("jres:33115285").addField("gstaticfield", { name: "popis" }) //RC 33115285 : Popis
            .addRow("jres:33115286").addField("gstaticfield", { name: "polPopis" }) //RC 33115286 : Popis Pol
            .addRow("jres:33115287").addField("gstaticfield", { name: "ppolPopis" }) //RC 33115287 : Popis PPol
            .addRow("jres:33115284").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115284 : IČO pro fakturaci
            .addRow("jres:33115296").addField("gstaticfield", { name: "ico_fakt_nazev" }) //RC 33115296 : Organizace pro fakturaci
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }); //RC 33115064 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
Gordic.Previews.register("adt:IcoProAdministraci", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "IČO pro administraci" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115319 : Licence
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115354").addField("gstaticfield", { name: "ico_adm" }) //RC 33115354 : IČO
            .addRow("jres:33115350").addField("gstaticfield", { name: "nazev" }) //RC 33115350 : Název
            .addRow("jres:33115351").addField("gstaticfield", { name: "ixs_esu_nazev" }) //RC 33115351 : Externí subjekt
            .addRow("jres:33115352").addField("gstaticfield", { name: "poznamka" }) //RC 33115352 : Poznámka
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }); //RC 33115064 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
Gordic.Previews.register("adt:IcoProFakturaci", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115355" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115355 : IČO pro fakturaci
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115354").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115354 : IČO
            .addRow("jres:33115350").addField("gstaticfield", { name: "nazev" }) //RC 33115350 : Název
            .addRow("jres:33115351").addField("gstaticfield", { name: "ixs_esu_nazev" }) //RC 33115351 : Externí subjekt
            .addRow("jres:33115352").addField("gstaticfield", { name: "poznamka" }) //RC 33115352 : Poznámka
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }); //RC 33115064 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
Gordic.Previews.register("adt:StatistikaFazi", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115317" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115317 : Statistika fáze
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("jres:33115302").addField("gstaticfield", { name: "nazev_databaze" }) //RC 33115302 : Název databáze
            .addRow("jres:33115303").addField("gstaticfield", { name: "faze" }) //RC 33115303 : Fáze
            .addRow("jres:33115304").addField("gstaticfield", { name: "nazev_faze" }) //RC 33115304 : Název fáze
            .addRow("jres:33115305").addField("gstaticfield", { name: "pocet" }) //RC 33115305 : Počet spuštění modulů ve verzi databáze
            .addRow("jres:33115306").addField("gdatebox", { name: "dat_login_max", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115306 : Poslední přihlášení
            .addRow("jres:33115307").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115307 : Aktuální k
            .addRow("jres:33115308").addField("gstaticfield", { name: "verze_databaze" }) //RC 33115308 : Verze databáze
            .addRow("jres:33115309").addField("gstaticfield", {
            name: "priz_d",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115313"; //RC 33115313 : Ano
                }
                else if (obj == 1) {
                    return "jres:33115314"; //RC 33115314 : Ne
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115309 : Provozní databáze
            .addRow("jres:33115310").addField("gstaticfield", {
            name: "priz_max",
            itemTemplate: function (obj) {
                if (obj == 1) {
                    return "jres:33115313"; //RC 33115313 : Ano
                }
                else if (obj == 0) {
                    return "jres:33115314"; //RC 33115314 : Ne
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115310 : Poslední údaj
            .addRow("jres:33115311").addField("gstaticfield", { name: "log_name" }); //RC 33115311 : Diagnostika z adl
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
Gordic.Previews.register("adt:StatistikaDatabazi", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115317 : Statistika fáze
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("Příznak DEMO").addField("gstaticfield", {
            name: "priz_d",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115314"; //RC 33115314 : Ne
                }
                else if (obj == 1) {
                    return "jres:33115313"; //RC 33115313 : Ano
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        })
            .addRow("jres:33115323").addField("gstaticfield", { name: "db_guid" }) //RC 33115323 : ID instance databáze
            .addRow("IČO zákazníka").addField("gstaticfield", { name: "ico" }) //RC 33115323 : ID instance databáze
            .addRow("jres:33115069").addField("gstaticfield", { name: "typ_db" }) //RC 33115069 : Typ databáze
            .addRow("jres:33115241").addField("gstaticfield", { name: "verze_db" }) //RC 33115241 : Verze databáze
            .addRow("jres:33115245").addField("gstaticfield", { name: "sub_verze_db" }) //RC 33115245 : Subverze databáze
            .addRow("jres:33115247").addField("gstaticfield", { name: "revize_adz" }) //RC 33115247 : Revize subverze databáze
            .addRow("Typ instalace").addField("gstaticfield", { name: "typ_inst" }) //RC 33115247 : Revize subverze databáze
            .addRow("Příznak archivace").addField("gstaticfield", { name: "priz_archiv" }) //RC 33115247 : Revize subverze databáze
            .addRow("jres:33115070").addField("gstaticfield", {
            name: "kultura",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115027"; //RC 33115027 : Čeština
                }
                else if (obj == 10) {
                    return "jres:33115028"; //RC 33115028 : Slovenčina
                }
                else if (obj == 20) {
                    return "jres:33115029"; //RC 33115029 : English (United Kingdom)
                }
                else if (obj == 30) {
                    return "jres:33115030"; //RC 33115030 : Ruština
                }
                else if (obj == 40) {
                    return "jres:33115031"; //RC 33115031 : Srbsko - cyrilice
                }
                else if (obj == 50) {
                    return "jres:33115032"; //RC 33115032 : Ukraine
                }
                else if (obj == 999) {
                    return "jres:33115033"; //RC 33115033 : ČEŠTINA - TEST LOKALIZACE
                }
                else if (obj == 1000) {
                    return "jres:33115034"; //RC 33115034 : International
                }
                else {
                    return "jres:33115026"; //RC 33115026 : Chyba
                }
            }
        })
            .addRow("gin_typ_inst").addField("gstaticfield", { name: "gin_typ_inst" }) //RC 33115302 : Název databáze
            .addRow("Multikulturní DB").addField("gstaticfield", {
            name: "priz_multikult",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "Ne"; //RC 33115027 : Čeština
                }
                else if (obj == 10) {
                    return "Ano"; //RC 33115028 : Slovenčina
                }
                else {
                    return "jres:33115026"; //RC 33115026 : Chyba
                }
            }
        })
            .addRow("AZURE DB").addField("gstaticfield", {
            name: "priz_azure",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "Ne"; //RC 33115027 : Čeština
                }
                else if (obj == 10) {
                    return "Ano"; //RC 33115028 : Slovenčina
                }
                else {
                    return "jres:33115026"; //RC 33115026 : Chyba
                }
            }
        })
            .addRow("UNICODE DB").addField("gstaticfield", {
            name: "priz_unicode",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "Ne"; //RC 33115027 : Čeština
                }
                else if (obj == 10) {
                    return "Ano"; //RC 33115028 : Slovenčina
                }
                else {
                    return "jres:33115026"; //RC 33115026 : Chyba
                }
            }
        })
            .addRow("jres:33115187").addField("gstaticfield", { name: "edice" }) //RC 33115187 : Edice
            .addRow("Idle pind").addField("gstaticfield", { name: "idle_ping" })
            .addRow("DB server").addField("gstaticfield", { name: "server_name" }) //RC 33115445 : Název serveru
            .addRow("Jméno databáze").addField("gstaticfield", { name: "db_name" }) //RC 33115187 : Edice
            .addRow("Datum vzniku testovací DB").addField("gstaticfield", { name: "dat_test_od" }) //RC 33115305 : Počet spuštění modulů ve verzi databáze
            .addRow("Telefon podpory").addField("gstaticfield", { name: "tel_adl" })
            .addRow("Poznámka pro ADL").addField("gstaticfield", { name: "pozn_adl" })
            .addRow("Mail pro chyby").addField("gstaticfield", { name: "mail_chyby" })
            .addRow("Telefon pro chyby").addField("gstaticfield", { name: "tel_chyby" })
            .addRow("Poznámka k chybě").addField("gstaticfield", { name: "pozn_chyby" })
            .addRow("Revize ADT").addField("gstaticfield", { name: "revize_adt" })
            .addRow("jres:33115442").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold" }) //RC 33115442 : Poslední změna
            .addRow("Příznak vývojové DB").addField("gstaticfield", { name: "priz_vyvoj" })
            .addRow("gdz_nocheckversion").addField("gstaticfield", { name: "gdz_nocheckversion" });
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Verze databaze - Verze a subverze
Gordic.Previews.register("adt:VerzeSubverze", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115441" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115441 : Verze a subverze
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115244").addField("gstaticfield", { name: "verze_db" }) //RC 33115244 : Hlavní verze databáze GINIS
            .addRow("jres:33115245").addField("gstaticfield", { name: "sub_verze_db" }) //RC 33115245 : Subverze databáze
            .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
            .addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115181 : Platnost do
            .addRow("jres:33115250").addField("gstaticfield", {
            name: "stav_subverze",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115257"; //RC 33115257 : Vývoj
                }
                else if (obj == 10) {
                    return "jres:33115258"; //RC 33115258 : Distribuce
                }
                else if (obj == 20) {
                    return "jres:33115259"; //RC 33115259 : Uzavřeno
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115250 : Stav subverze
            .addRow("jres:33115243").addField("gstaticfield", { name: "poznamka" }); //RC 33115243 : Poznámka
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Verze databaze - Aktuálně otevřené reinstalační balíky
Gordic.Previews.register("adt:AktReinstBal", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115425" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115425 : Reinstalační balík
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115244").addField("gstaticfield", { name: "verze_db" }) //RC 33115244 : Hlavní verze databáze GINIS
            .addRow("jres:33115245").addField("gstaticfield", { name: "sub_verze_db" }) //RC 33115245 : Subverze databáze
            .addRow("jres:33115247").addField("gstaticfield", { name: "revize_adz" }) //RC 33115247 : Revize subverze databáze
            .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
            .addRow("jres:33115428").addField("gstaticfield", { name: "db_target" }); //RC 33115428 : Cílová databáze
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Verze databaze - Reinstalační balíky
Gordic.Previews.register("adt:ReinstBal", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115425" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115425 : Reinstalační balík
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var dtoGDZ = dto;
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115431").addField("gstaticfield", {
            name: "verze_db",
            itemTemplate: function (obj) {
                var sub_verze = (dto.sub_verze_db < 10 ? sub_verze = "00" + dto.sub_verze_db.toString() : sub_verze = "0" + dto.sub_verze_db.toString());
                var revize_adz = (dto.revize_adz < 10 ? revize_adz = "0" + dto.revize_adz.toString() : revize_adz = dto.revize_adz.toString());
                return obj + "XXX" + sub_verze + "x" + revize_adz;
            }
        })
            .addRow("jres:33115432").addField("gdatebox", { name: "vyvoj_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115432 : Vývoj od
            .addRow("jres:33115433").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115433 : Vznik GDZ
            .addRow("jres:33115244").addField("gstaticfield", { name: "verze_db" }) //RC 33115244 : Hlavní verze databáze GINIS
            .addRow("jres:33115245").addField("gstaticfield", { name: "sub_verze_db" }) //RC 33115245 : Subverze databáze
            .addRow("jres:33115247").addField("gstaticfield", { name: "revize_adz" }); //RC 33115247 : Revize subverze databáze
        //.addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
        //.addRow("jres:33115428").addField("gstaticfield", { name: "db_target" }) //RC 33115428 : Cílová databáze
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Verze databaze - Vydane verze
Gordic.Previews.register("adt:VydaneVerze", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115439" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115439 : Reinstalační balíky
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115244").addField("gstaticfield", { name: "verze_db" }) //RC 33115244 : Hlavní verze databáze GINIS
            .addRow("jres:33115245").addField("gstaticfield", { name: "sub_verze_db" }) //RC 33115245 : Subverze databáze
            .addRow("jres:33115247").addField("gstaticfield", { name: "revize_adz" }) //RC 33115247 : Revize subverze databáze
            .addRow("jres:33115434").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115434 : Vývoj od
            .addRow("jres:33115435").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115435 : Vznik GDZ
            .addRow("jres:33115440").addField("gstaticfield", {
            name: "stav_rev_adz",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115257"; //RC 33115257 : Vývoj
                }
                else if (obj == 10) {
                    return "jres:33115258"; //RC 33115258 : Distribuce
                }
                else if (obj == 20) {
                    return "jres:33115259"; //RC 33115259 : Uzavřeno
                }
                else {
                    return "jres:33115256"; //RC 33115256 : Chybný stav
                }
            }
        }) //RC 33115249 : Stav revize adz
            .addRow("jres:33115243").addField("gstaticfield", { name: "poznamka" }); //RC 33115243 : Poznámka
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Produktove listy - podukol Ceniku produktu
Gordic.Previews.register("adt:ProduktoveListy", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.nazev });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115188").addField("gstaticfield", { name: "id_listu" }) //RC 33115188 : ID listu
            .addRow("jres:33115189").addField("gstaticfield", { name: "nazev" }) //RC 33115189 : Název
            .addRow("jres:33115190").addField("gstaticfield", { name: "popis" }) //RC 33115190 : Popis
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115192").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("jres:33115193").addField("gstaticfield", { name: "zmenil" }); //RC 33115193 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Produkty - podukol Ceniku produktu
Gordic.Previews.register("adt:SeznamProduktu", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.faze_txt + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.nazev });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("Programová fáze").addField("gstaticfield", { name: "faze" }) //RC 33115188 : ID listu
            .addRow("jres:33115448").addField("gstaticfield", { name: "modul" }) //RC 33115448 : Zkratka
            .addRow("Název").addField("gstaticfield", { name: "faze_txt" }) //RC 33115189 : Název
            .addRow("Typ fáze").addField("gstaticfield", {
            name: "faze_typ_txt",
        }) //RC 33115190 : Popis
            .addRow("Verze od").addField("gstaticfield", { name: "verze" }) //RC 33115190 : Popis
            .addRow("Verze do").addField("gstaticfield", { name: "verze" }) //RC 33115190 : Popis
            //.addRow("Subverze").addField("gstaticfield", { name: "subverze" }) //RC 33115190 : Popis
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("Autor").addField("gstaticfield", { name: "orj_autor_nazev" }) //RC 33115190 : Popis
            .addRow("Garant kvality").addField("gstaticfield", { name: "orj_gk_nazev" }) //RC 33115190 : Popis
            //.addRow("Datum AVI").addField("gdatebox", { name: "dat_avi", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("Platnost do").addField("gdatebox", { name: "dat_do", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("Tým").addField("gstaticfield", { name: "agt" }) //RC 33115190 : Popis
            .addRow("Název týmu").addField("gstaticfield", { name: "agt_txt" }) //RC 33115190 : Popis
            .addRow("Poznámka").addField("gstaticfield", { name: "poznamka" }) //RC 33115190 : Popis
            .addRow("Název agendy").addField("gstaticfield", { name: "agt_txt" }) //RC 33115190 : Popis
            .addRow("Subsystém").addField("gstaticfield", { name: "subsyst" }) //RC 33115190 : Popis
            .addRow("Submodel").addField("gstaticfield", { name: "submodel" }) //RC 33115190 : Popis
            .addRow("Autor").addField("gstaticfield", { name: "orj_autor_nazev" }) //RC 33115190 : Popis
            .addRow("Garant kvality").addField("gstaticfield", { name: "orj_gk_nazev" }) //RC 33115190 : Popis
            .addRow("Garant PRG").addField("gstaticfield", { name: "orj_prg_nazev" }) //RC 33115190 : Popis
            .addRow("Garant PRA").addField("gstaticfield", { name: "orj_pra_nazev" }) //RC 33115190 : Popis
            .addRow("Změněno").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("jres:33115193").addField("gstaticfield", { name: "zmenil" }); //RC 33115193 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Produkty - podukol Ceniku produktu
Gordic.Previews.register("adt:SeznamTagu", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "Tag:" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.nazev });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("ID Tagu").addField("gstaticfield", { name: "ixs_tag" }) //RC 33115188 : ID listu
            .addRow("Název").addField("gstaticfield", { name: "nazev" }) //RC 33115188 : ID listu
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("Poznámka").addField("gstaticfield", { name: "poznamka" }) //RC 33115190 : Popis
            .addRow("Změněno").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("jres:33115193").addField("gstaticfield", { name: "zmenil" }); //RC 33115193 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//Preview pro ulohu Prehled ORJ - podukol Ceniku produktu
Gordic.Previews.register("adt:PrehledORJ", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.nazev });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("ORJ").addField("gstaticfield", { name: "orj" }) //RC 33115188 : ID listu
            .addRow("Název").addField("gstaticfield", { name: "nazev" }) //RC 33115448 : Zkratka
            .addRow("Titul").addField("gstaticfield", { name: "titul" }) //RC 33115189 : Název
            .addRow("Jméno").addField("gstaticfield", { name: "jmeno" }) //RC 33115190 : Popis
            .addRow("Příjmení").addField("gstaticfield", { name: "prijmeni" }) //RC 33115190 : Popis
            .addRow("Firma").addField("gstaticfield", { name: "firma" }) //RC 33115190 : Popis
            .addRow("jres:33115191").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("Kategorie ORJ").addField("gstaticfield", {
            name: "ktg_orj",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "Neurčeno"; //RC 33115020 : Aktivní
                }
                else if (obj == 10) {
                    return "Osoba"; //RC 33115021 : Připraven
                }
                else if (obj == 20) {
                    return "Organizace"; //RC 33115023 : Neaktivní
                }
            }
        })
            .addRow("Poznámka").addField("gstaticfield", { name: "poznamka" }) //RC 33115190 : Popis
            .addRow("Nad org.").addField("gstaticfield", { name: "nad_org" }) //RC 33115190 : Popis
            //.addRow("ID Referenta").addField("gstaticfield", { name: "ixs_ref" }) //RC 33115190 : Popis
            //.addRow("ID ORJ").addField("gstaticfield", { name: "ixs_orj" }) //RC 33115190 : Popis
            .addRow("SORJ").addField("gstaticfield", { name: "sorj" }) //RC 33115190 : Popis
            //.addRow("Platnost od").addField("gdatebox", { name: "dat_od", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            //.addRow("Platnost do").addField("gdatebox", { name: "dat_do", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("Změněno").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115192 : Poslední změna
            .addRow("jres:33115193").addField("gstaticfield", { name: "zmenil" }); //RC 33115193 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Produkty - podukol Ceniku produktu
Gordic.Previews.register("adt:Produkty", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.popis + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115194").addField("gstaticfield", { name: "pol" }) //RC 33115194 : Položka
            .addRow("jres:33115195").addField("gstaticfield", { name: "popis" }) //RC 33115195 : Popis
            .addRow("jres:33115196").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        });
        if (dto.dat_od != undefined) {
            formBuilder
                .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }); //RC 33115180 : Platnost od
        }
        else {
            formBuilder
                .addRow("jres:33115180").addField("gstaticfield", { name: "dat_od" }); //RC 33115180 : Platnost od
        }
        if (dto.dat_do != undefined) {
            formBuilder
                .addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }); //RC 33115181 : Platnost do
        }
        else {
            formBuilder
                .addRow("jres:33115181").addField("gstaticfield", { name: "dat_do" }); //RC 33115181 : Platnost do
        }
        formBuilder
            //.addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115180 : Platnost od
            //.addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115181 : Platnost do
            .addRow("jres:33115352").addField("gstaticfield", { name: "poznamka" }) //RC 33115352 : Poznámka
            .addRow("jres:33115197").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115197 : Poslední změna
            .addRow("jres:33115198").addField("gstaticfield", { name: "zmenil" }) //RC 33115198 : Změnil
            .addRow("jres:33115199").addField("gstaticfield", {
            name: "ktg_pol",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115094"; //RC 33115094 : Fakturační
                }
                else if (obj == 10) {
                    return "jres:33115095"; //RC 33115095 : Nadpisová
                }
                else if (obj == 20) {
                    return "jres:33115096"; //RC 33115096 : Vzorová
                }
                else {
                    return "jres:33115093"; //RC 33115093 : Chybná kategorie
                }
            }
        })
            //.addRow("jres:33115200").addField("gstaticfield", { name: "popis_eng" }) //RC 33115200 : Popis eng
            .addRow("jres:33115201").addField("gstaticfield", { name: "zkratka" }); //RC 33115201 : Zkratka
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Podpolozky - podukol Ceniku produktu
Gordic.Previews.register("adt:Podpolozky", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.popis + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115194").addField("gstaticfield", { name: "pol" }) //RC 33115194 : Položka
            .addRow("jres:33115255").addField("gstaticfield", { name: "ppol" }) //RC 33115255 : Podpoložka
            .addRow("jres:33115195").addField("gstaticfield", { name: "popis" }) //RC 33115195 : Popis
            .addRow("jres:33115196").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        });
        if (dto.dat_od != undefined) {
            formBuilder
                .addRow("jres:33115180").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }); //RC 33115180 : Platnost od
        }
        else {
            formBuilder
                .addRow("jres:33115180").addField("gstaticfield", { name: "dat_od" }); //RC 33115180 : Platnost od
        }
        if (dto.dat_do != undefined) {
            formBuilder
                .addRow("jres:33115181").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }); //RC 33115181 : Platnost do
        }
        else {
            formBuilder
                .addRow("jres:33115181").addField("gstaticfield", { name: "dat_do" }); //RC 33115181 : Platnost do
        }
        formBuilder
            .addRow("jres:33115352").addField("gstaticfield", { name: "poznamka" }) //RC 33115352 : Poznámka
            //.addRow("jres:33115200").addField("gstaticfield", { name: "popis_eng" }) //RC 33115200 : Popis eng
            .addRow("jres:33115201").addField("gstaticfield", { name: "zkratka" }) //RC 33115201 : Zkratka
            .addRow("jres:33115199").addField("gstaticfield", {
            name: "ktg_ppol",
            itemTemplate: function (obj) {
                if (obj == 0) {
                    return "jres:33115260"; //RC 33115260 : Neurčeno
                }
                else if (obj == 1) {
                    return "jres:33115261"; //RC 33115261 : Server
                }
                else if (obj == 101) {
                    return "jres:33115262"; //RC 33115262 : Klient
                }
                else if (obj == 300) {
                    return "jres:33115263"; //RC 33115263 : Rozšíření
                }
                else if (obj == 352) {
                    return "jres:33115289"; //RC 33115289 : Ultimate
                }
                else if (obj == 400) {
                    return "jres:33115264"; //RC 33115264 : Doplatek, sleva
                }
                else if (obj == 430) {
                    return "jres:33115265"; //RC 33115265 : SaaS
                }
                else if (obj == 480) {
                    return "jres:33115266"; //RC 33115266 : Maintenance
                }
                else if (obj == 500) {
                    return "jres:33115267"; //RC 33115267 : Programování
                }
                else if (obj == 520) {
                    return "jres:33115268"; //RC 33115268 : Metodika
                }
                else if (obj == 530) {
                    return "jres:33115269"; //RC 33115269 : Dokumentace
                }
                else if (obj == 600) {
                    return "jres:33115270"; //RC 33115270 : Školení
                }
                else if (obj == 680) {
                    return "jres:33115271"; //RC 33115271 : Konzultace
                }
                else if (obj == 700) {
                    return "jres:33115272"; //RC 33115272 : Služby
                }
                else if (obj == 740) {
                    return "jres:33115273"; //RC 33115273 : Asistence
                }
                else if (obj == 760) {
                    return "jres:33115274"; //RC 33115274 : Analýza
                }
                else if (obj == 780) {
                    return "jres:33115275"; //RC 33115275 : Hotline
                }
                else if (obj == 790) {
                    return "jres:33115276"; //RC 33115276 : Ostatní
                }
                else {
                    return "jres:33115093"; //RC 33115093 : Chybná kategorie
                }
            }
        })
            .addRow("jres:33115197").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115197 : Poslední změna
            .addRow("jres:33115198").addField("gstaticfield", { name: "zmenil" }); //RC 33115198 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu BalikyProduktu - podukol Ceniku produktu
Gordic.Previews.register("adt:BalikyProduktu", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115202").addField("gstaticfield", { name: "ixs_bpr" }) //RC 33115202 : Balík produktů
            .addRow("jres:33115203").addField("gstaticfield", { name: "nazev" }) //RC 33115203 : Název
            .addRow("jres:33115204").addField("gstaticfield", { name: "zkratka" }) //RC 33115204 : Zkratka
            .addRow("jres:33115205").addField("gstaticfield", { name: "poznamka" }) //RC 33115205 : Poznámka
            .addRow("jres:33115206").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115207").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115207 : Poslední změna
            .addRow("jres:33115208").addField("gstaticfield", { name: "zmenil" }); //RC 33115208 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu SkupinyProduktu - podukol Ceniku produktu
Gordic.Previews.register("adt:SkupinyProduktu", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115209").addField("gstaticfield", { name: "ixs_spr" }) //RC 33115209 : Skupiny produktů
            .addRow("jres:33115210").addField("gstaticfield", { name: "nazev" }) //RC 33115210 : Název
            .addRow("jres:33115211").addField("gstaticfield", { name: "zkratka" }) //RC 33115211 : Zkratka
            .addRow("jres:33115212").addField("gstaticfield", { name: "poznamka" }) //RC 33115212 : Poznámka
            .addRow("jres:33115213").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115214").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115214 : Poslední změna
            .addRow("jres:33115215").addField("gstaticfield", { name: "zmenil" }); //RC 33115215 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Ceniky - podukol Ceniku produktu
Gordic.Previews.register("adt:Ceniky", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115386").addField("gstaticfield", { name: "ixp_ccm" }) //RC 33115386 : PID ceníku
            .addRow("jres:33115217").addField("gstaticfield", { name: "nazev" }) //RC 33115217 : Název
            .addRow("jres:33115447").addField("gstaticfield", { name: "typ_ccm" }) //RC 33115447 : Typ ceníku
            .addRow("jres:33115216").addField("gstaticfield", { name: "gcenik" }) //RC 33115216 : Ceník
            .addRow("jres:33115221").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115221 : Platnost od
            .addRow("jres:33115222").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115222 : Platnost do
            .addRow("jres:33115223").addField("gstaticfield", {
            name: "aktivita",
            itemTemplate: function (obj) {
                if (obj == 100) {
                    return "jres:33115020"; //RC 33115020 : Aktivní
                }
                else if (obj == 300) {
                    return "jres:33115021"; //RC 33115021 : Připraven
                }
                else if (obj == 500) {
                    return "jres:33115023"; //RC 33115023 : Neaktivní
                }
                else if (obj == 600) {
                    return "jres:33115024"; //RC 33115024 : Návrh
                }
                else if (obj == 900) {
                    return "jres:33115025"; //RC 33115025 : Zrušen
                }
                else {
                    return "jres:33115022"; //RC 33115022 : Chybná aktivita
                }
            }
        })
            .addRow("jres:33115220").addField("gstaticfield", { name: "poznamka" }) //RC 33115220 : Poznámka
            .addRow("jres:33115224").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115224 : Poslední změna
            .addRow("jres:33115225").addField("gstaticfield", { name: "zmenil" }); //RC 33115225 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Vyjimky databaze - podukol Licencnich poplatku
Gordic.Previews.register("adt:Chyby", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        if (dto.stav_fakturace == null) {
            dto.stav_fakturace = "OK";
        }
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic_fyz + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("Licence databáze").addField("gstaticfield", { name: "lic_fyz" }) //RC 33115106 : Licence databáze
            .addRow("Platnost licence od").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }); //RC 33115107 : Platnost od
        if (dto.posledni_fakturace != undefined) {
            formBuilder
                .addRow("Poslední fakturace licenčních poplatků").addField("gdatebox", { name: "posledni_fakturace", valueType: "date", customClass: "font-weight: bold" }); //RC 33115108 : Platnost do
        }
        else {
            formBuilder
                .addRow("Poslední fakturace licenčních poplatků").addField("gstaticfield", { name: "posledni_fakturace", /*valueType: "datetime", hideZeroTime: false, customClass: "font-weight: bold"*/ }); //RC 33115230 : Zveřejněno
        }
        formBuilder
            .addRow("Pol").addField("gstaticfield", { name: "pol" }) //RC 33115109 : Popis
            .addRow("PPol").addField("gstaticfield", { name: "ppol" }) //RC 33115110 : Poslední změna
            .addRow("Popis Pol").addField("gstaticfield", { name: "popisPol" }) //RC 33115111 : Změnil
            .addRow("Popis PPol").addField("gstaticfield", { name: "popisPpol" })
            .addRow("Režim licence").addField("gstaticfield", { name: "rezim_lic_txt" })
            .addRow("Poznámka").addField("gstaticfield", { name: "poznamka" })
            .addRow("Platnost licence do").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }); //RC 33115108 : Platnost do
        if (dto.stav_kontroly_lic != "OK") {
            formBuilder
                .addRow("Stav kontroly licence") //RC 33115414 : Stav kontroly
                .addField("gstatic", {
                name: "stav_stat",
                icon: "fa-exclamation-triangle g-state-text g-state-warning",
                customClass: "w-1"
            }) //RC 33115229 : Stav
                .addField("gstaticfield", {
                name: "stav_kontroly_lic",
                itemTemplate: function (obj) {
                    return "jres:33115416"; //RC 33115416 : Chybí nadřízená PPol
                },
                customClass: "w-2 g-state-text "
            });
        }
        formBuilder
            //.addRow("jres:33115417").addField("gstaticfield", { name: "stav_kontroly_ppol" }) //RC 33115417 : Stav PPol
            .addRow("Počet").addField("gstaticfield", { name: "pocet" })
            .addRow("Poslední změna licence").addField("gdatebox", { name: "dat_zmena", valueType: "date", customClass: "font-weight: bold" })
            .addRow("Změnil").addField("gstaticfield", { name: "zmenil" })
            .addRow("Důvod").addField("gstaticfield", { name: "duvod" })
            .addRow("Datum nákupu").addField("gdatebox", { name: "dat_nakup", valueType: "date", customClass: "font-weight: bold" })
            .addRow("Název balíku licencí").addField("gstaticfield", { name: "nazev" })
            .addRow("IČO pro fakturaci").addField("gstaticfield", { name: "ico_fakt" })
            .addRow("Organizace pro fakturaci").addField("gstaticfield", { name: "ico_fakt_txt" })
            .addRow("Fakturace na jiné IČO").addField("gstaticfield", { name: "jine_ico" })
            .addRow("IČO pro administraci").addField("gstaticfield", { name: "ico_adm" })
            .addRow("Organizace pro administraci").addField("gstaticfield", { name: "ico_adm_txt" })
            .addRow("Poslední fakturace licenčních poplatků na IČO a Pol").addField("gdatebox", { name: "posledni_fakturace" })
            .addRow("IČO 2021 (Celkem fakturováno na IČO v roce 2021)").addField("gstaticfield", { name: "nazev_ico_adm" })
            .addRow("Pol 2021 (Celkem fakturováno na IČO a Pol v roce 2021)").addField("gstaticfield", { name: "pol_celkem_2020" })
            .addRow("PolLic 2021 (Celkem fakturováno licenčních poplatků na IČO a Pol v roce 2021)").addField("gstaticfield", { name: "pol_licence_celkem_2020" })
            .addRow("(Celkem fakturováno na IČO v roce 2020)").addField("gstaticfield", { name: "ico_celkem_2019" })
            .addRow("Pol 2020 (Celkem fakturováno na IČO a Pol v roce 2020").addField("gstaticfield", { name: "pol_celkem_2019" })
            .addRow("PolLic 2020 (Celkem fakturováno licenčních poplatků na IČO a Pol v roce 2020)").addField("gstaticfield", { name: "pol_licence_celkem_2019" });
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Historie kontrol licenčních poplatků
Gordic.Previews.register("adt:HistorieKontroly", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        if (dto.stav_fakturace == null) {
            dto.stav_fakturace = "OK";
        }
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "Kontrola" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }); //breaks-300-400
        formBuilder
            .addRow("Uživatel").addField("gstaticfield", { name: "zmenil" })
            .addRow("Kontrolováno").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" });
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Vyjimky databaze - podukol Licencnich poplatku
Gordic.Previews.register("adt:VyjimkyDatabaze", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115106").addField("gstaticfield", { name: "lic" }) //RC 33115106 : Licence databáze
            .addRow("jres:33115107").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115107 : Platnost od
            .addRow("jres:33115108").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115108 : Platnost do
            .addRow("jres:33115109").addField("gstaticfield", { name: "popis" }) //RC 33115109 : Popis
            .addRow("jres:33115110").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115110 : Poslední změna
            .addRow("jres:33115111").addField("gstaticfield", { name: "zmenil" }); //RC 33115111 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Vyjimky databaze - podukol Licencnich poplatku
Gordic.Previews.register("adt:VyjimkyDatabazePol", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115106").addField("gstaticfield", { name: "lic" }) //RC 33115106 : Licence databáze
            .addRow("jres:33115113").addField("gstaticfield", { name: "pol" }) //RC 33115113 : Pol
            .addRow("jres:33115107").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115107 : Platnost od
            .addRow("jres:33115108").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115108 : Platnost do
            .addRow("jres:33115109").addField("gstaticfield", { name: "popis" }) //RC 33115109 : Popis
            .addRow("jres:33115110").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115110 : Poslední změna
            .addRow("jres:33115111").addField("gstaticfield", { name: "zmenil" }); //RC 33115111 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
//Preview pro ulohu Fakturace na jine ICO - podukol Licencnich poplatku
Gordic.Previews.register("adt:FakturaceNaJineICO", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.lic + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115017 : Náhled
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115106").addField("gstaticfield", { name: "lic" }) //RC 33115106 : Licence databáze
            .addRow("jres:33115113").addField("gstaticfield", { name: "pol" }) //RC 33115113 : Pol
            .addRow("jres:33115114").addField("gstaticfield", { name: "ppol" }) //RC 33115114 : PPol
            .addRow("jres:33115107").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115107 : Platnost od
            .addRow("jres:33115108").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115108 : Platnost do
            .addRow("jres:33115115").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115115 : IČO fakturace
            .addRow("jres:33115109").addField("gstaticfield", { name: "popis" }) //RC 33115109 : Popis
            .addRow("jres:33115110").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", hideZeroTime: true, customClass: "font-weight: bold" }) //RC 33115110 : Poslední změna
            .addRow("jres:33115111").addField("gstaticfield", { name: "zmenil" }); //RC 33115111 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//End
Gordic.Previews.register("adt:MarketingoveLicence", {
    canRender: function (dto) { return true; },
    render: function (div, dto) {
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Licence '" + dto.nazev + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + "jres:33115297" + "</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>"); //RC 33115297 : Licence
        var form = $("<div class='gform--view-mode'>").appendTo(currentElement);
        form.gform("setup", { layoutDescriptor: "L1M1S1, breaks-500-600" }). //breaks-300-400
            gformsection("create").gpidbar({ pid: dto.ixp });
        var formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, breaks-500-600" }) //breaks-300-400
            .addSection()
            .addRow("jres:33115058").addField("gstaticfield", { name: "lic" }) //RC 33115058 : Licence databáze
            .addRow("jres:33115279").addField("gstaticfield", { name: "nazev_lic" }) //RC 33115279 : Název licence
            .addRow("jres:33115280").addField("gstaticfield", { name: "pol" }) //RC 33115280 : Pol
            .addRow("jres:33115281").addField("gstaticfield", { name: "ppol" }) //RC 33115281 : PPol
            .addRow("jres:33115282").addField("gstaticfield", { name: "pocet" }) //RC 33115282 : Počet licencí
            .addRow("jres:33115061").addField("gdatebox", { name: "dat_od", valueType: "date", customClass: "font-weight: bold" }) //RC 33115061 : Platnost od
            .addRow("jres:33115062").addField("gdatebox", { name: "dat_do", valueType: "date", customClass: "font-weight: bold" }) //RC 33115062 : Platnost do
            .addRow("jres:33115285").addField("gstaticfield", { name: "popis" }) //RC 33115285 : Popis
            .addRow("jres:33115286").addField("gstaticfield", { name: "polPopis" }) //RC 33115286 : Popis Pol
            .addRow("jres:33115287").addField("gstaticfield", { name: "ppolPopis" }) //RC 33115287 : Popis PPol
            .addRow("jres:33115298").addField("gstaticfield", { name: "duvod" }) //RC 33115298 : Důvod
            .addRow("jres:33115284").addField("gstaticfield", { name: "ico_fakt" }) //RC 33115284 : IČO pro fakturaci
            .addRow("jres:33115296").addField("gstaticfield", { name: "ico_fakt_nazev" }) //RC 33115296 : Organizace pro fakturaci
            .addRow("jres:33115063").addField("gdatebox", { name: "dat_zmena", valueType: "datetime", customClass: "font-weight: bold" }) //RC 33115063 : Poslední změna
            .addRow("jres:33115064").addField("gstaticfield", { name: "zmenil" }); //RC 33115064 : Změnil
        form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
        currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    },
});
//# sourceMappingURL=adt.webapp.js.map