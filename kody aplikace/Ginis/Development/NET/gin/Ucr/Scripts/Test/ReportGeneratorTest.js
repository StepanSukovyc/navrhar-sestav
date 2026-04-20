//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ucr.WebClient.ReportGeneratorTest.js                 </Name>
//    <Description> Pomocne skripty k testovani generatoru (nemely by se dostat k zakaznikovi)</Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                            </Copyright>
//    <Created>     2016-03-22                                                  </Created>
//  </FileHeader>

var ReportGeneratorTests = {
    generateSimpleReport: function(){
        var that = this;
        callAsync("/Gordic.Ucr.WebClient/Gin/Reporter/SinglePage/Ws/GReports.asmx/CreateReport",
            {
                "parms": {
                    "Wrid": "0000STR0002I/0000ALV03DLR",
                    "OutputStyle": "TXT",
                    "Preselect": false,
                    "RunAgain": false,
                    "Props": {
                        "RestrictionAlf": "",
                        "RestrictionAlv": ""
                    },
                    "ReportGeneratorType": "Gordic.Ucr.WebClient.GUcrPozadavekGenerator"
                }
            }).done(function (result) {
                //console.log("Greports.asmx/CreateReport done result:", result); 
                that.getReportStatus(result);
            })
            .fail(function (result) {
                that.showFail(result);
            });

    },
    generateCustomDlgReport: function () {
        //alert("ReportGeneratorTests.generateCustomDlgReport");
        var that = this;
        callAsync("/Gordic.Ucr.WebClient/Gin/Reporter/SinglePage/Ws/GReports.asmx/CreateReport",
        {
            "parms":
               {
                   "Wrid": "0000STR0002I/0000ALV034A1",
                   "OutputStyle": "TXT",
                   "Preselect": false,
                   "RunAgain": false,
                   "Props": {
                       "RestrictionAlf": "",
                       "RestrictionAlv": ""
                   },
                   "ReportGeneratorType": "Gordic.Ucr.WebClient.GUcrPozadavekGenerator"
        }
        }).done(function (result) {
            //console.log("Greports.asmx/CreateReport done result:", result);
            that.getReportStatus(result);
        })
        .fail(function (result) {
            //greports.showOnFailError(result); 
            that.showFail(result);
        });
    },
    getReportStatus: function (sessionName) {
        console.log("ReportGeneratorTests.getReportStatus sessionName: ", sessionName);
        var that = this;
        callAsync("~/Gin/Reporter/SinglePage/Ws/GReports.asmx/GetReportState", { sessionName: sessionName })
        .done(function (result) {
            if (!(result === 5 || result === 6 || result === 7 || result === 8)) {
                
                setTimeout(function () {
                    that.getReportStatus(sessionName);
                }, 5000);
                return;
            }

            //Success
            if (result === 5) {
                
                var url = window.Gordic_General_WebApplication_AppPath
                    ? window.Gordic_General_WebApplication_AppPath + "/Gin/Reporter/SinglePage/Ws/GReports.asmx/DownloadReport"
                    : "Gin/Reporter/SinglePage/Ws/GReports.asmx/DownloadReport";
                window.location = url + "?sessionName=" + sessionName;
            }

            //Exception
            if (result === 6) {
                console.log("Vyskytla se chyba pri generovani reportu - Exception");
            }

            //Cancel
            if (result === 7) {
                greports.$statusLink.text("Generovani reportu bylo zruseno - Cancel");
            }

            //Pozadovan uzivatelsky vstup
            if (result === 8) {
                console.log("GReports: Je pozadovan uzivatelsky vstup ");
                that.getCustomDialog(sessionName);
            }
        })
        .fail(function (result) {
            that.showFail(result);
        });
    },
    getCustomDialog: function(sessionName)
    {
        var that = this;
        callAsync("~/Gin/Reporter/SinglePage/Ws/GReports.asmx/GetCustomDialogParams", { sessionName: sessionName })
        .done(function (result) {
            console.log("ReportGeneratorTests.getCustomDialog", result);

            var $dlg = $("<div>");          
            var $form = $dlg
                .gform("setup", { layoutDescriptor: result.LayoutDescriptor });

            for (var i = 0; i < result.Sections.length; i++) {
                that.createSection($form, result.Sections[i]);
            }

            GDlg.showModalWindow(
                $dlg,
                {
                    ID: "reportCustmDlg#"
                },
                {
                    title: result.Caption + " (TEST)",
                    modal: true,
                    userSettings: false,
                    width: result.Width,
                    height: result.Height,
                    buttons: [
                        {
                            text: "OK", click: function () {
                                that.continueGeneration(sessionName, that.collectValues($dlg));
                                $(this).dialog("close");
                                //GDlg.alert("OK clicked");
                            }
                        },
                        { text: "Zrusit", click: function () { $(this).dialog("close"); } }
                    ]
                },
                result.Width,
                result.Height,
                true);

            $dlg.resize();
        })
        .fail(function (result) {
            that.showFail(result);
        });
    },
    createSection: function($form, param){
        //console.log("createSection", param);
        var section = $form.gformsection("create", param.Label);
        for (var i = 0; i < param.Rows.length; i++)
            this.createRow(section, param.Rows[i]);
    },
    createRow: function(section, param) {
        //console.log("createRow", param);
        var row = section.gformrow("addFieldsRow", param.Label, this.getFieldsWidths(param.Fields));
        
        for (var i = 0; i < param.Fields.length; i++) {
            if (i > 0)
                row = row.next();
            row = this.createField(row, param.Fields[i], i === 0);
        }
    },
    createField: function (row, param) {
        //console.log("createField", param);

        switch (param.Type) {
            case "gdatebox":
                var date = this.convertCsharpDateTimeToDate(param.Value);
                return row.gdatebox({
                    sesCtlName: param.Name,
                    initialValue: date.toISOString(),
                    valueType: "datetime"
                });
            case "gcheck":
                return row.gcheck({
                    sesCtlName: param.Name,
                    label: param.Label,
                    initialValue: param.Value
                });
            case "gstringbox":
                var $sb = row.gstringbox({
                    sesCtlName: param.Name,
                    initialValue: param.Value
                });

                if (param.Rows > 1) {
                    var $input = $sb.find("input");
                    //console.log("$sb", $sb, $input, $input.height());
                    $input.height(24 * param.Rows); //TODO: Toto je blbe!
                }

                return $sb;
            case "gnumberbox":
                return row.gnumberbox({
                    sesCtlName: param.Name,
                    initialValue: param.Value,
                    minValue: param.MinValue,
                    maxValue: param.MaxValue,
                    format: {
                        decimals: param.Decimals
                    }
                });
            case "gformtext":
                return row.gformtext(param.Label, param.Align);
            case "gselectwgtest":
                return row.gselectwgtest({
                    sesCtlName: param.Name,
                    options: param.Options,
                    SelectedValue: param.SelectedValue
                });
            case "glistselectwgtest":
                return row.glistselectwgtest({
                    sesCtlName: param.Name,
                    options: param.Options,
                    SelectedValue: param.SelectedValue,
                    size: param.Size
                });
            default:
                console.warn("ReportGeneratorTest.createField: unsupported field '" + param.Type + "' params: ", param);
                break;
        }
    },
    showFail: function (result) {
        GDlg.showException({
            title: "Fatal error",
            text: result.responseJSON.Message,
            details: result.responseJSON.StackTrace,
            isNonFatal: false
        });
    },
    convertCsharpDateTimeToDate: function (csharpDateTime) {
        if (csharpDateTime == null) {
            return "";
        }
        var re = /-?\d+/;
        var m = re.exec(csharpDateTime);
        return new Date(parseInt(m[0]));
    },
    getFieldsWidths: function (fields) {
        // Vytvori options pro dany radek - je to jen takova jednoducha nahrazka, v budoucnu by melo byt v parametrech sestavy
        // pro 1 field vrati ['w-4','w-12']
        // pro 2 fieldy      ['w-6','w-6']
        // pro 3 fieldy      ['w-4','w-4','w-4'] 
        // ...atd...        
        var opts = [];
        for (var i = 0; i < fields.length; i++) {
            opts.push(fields[i].Width);
        }
        //console.log("createRowOptions", opts);
        return opts;
    },
    collectValues: function ($dlg) {
        var vals = {};
        $.each($dlg.find(".gfield"), function () {
            vals[$(this).gfield("option", "sesCtlName")] = $(this).gfield("getValue");
        });

        console.log("collectValues", vals);
        return vals;
    },
    continueGeneration: function (sessionName, parms) {
        var that = this;
        callAsync("~/Gin/Reporter/SinglePage/Ws/GReports.asmx/ContinueGeneration", { sessionName: sessionName, parms: parms })
        .done(function (result) {
            console.log("continueGeneration.done()", result);
            that.getReportStatus(result);
        })
        .fail(function (result) {
            that.showFail(result);
        });
    }
};


(function ($) {
    //Docasna nahrada selectu
    $.widget("gordic.gselectwgtest", $.gordic.gcontrolbox, {
        options: {
            options: [],
            selectedIndex: 0
        },
        _createInputs: function (parent) {
            this._superApply(arguments);
            this.fieldInput = $("<select style='width: 100%;'>");
            for (var i = 0; i < this.options.options.length; i++)
                this.fieldInput.append("<option>" + this.options.options[i] + "</option>");
            this.fieldInput.appendTo(parent).wrap("<div class='w-12'>");
            this.fieldInput[0].selectedIndex = this.options.selectedIndex;
        },
        getValue: function () {
            return this.fieldInput.prop('selectedIndex');
            //return this.fieldInput.val();
        }
    });

    //Docasna nahrada listboxu
    $.widget("gordic.glistselectwgtest", $.gordic.gselectwgtest, {
        options: {
            size: 3
        },
        _createInputs: function (parent) {
            this._superApply(arguments);
            this.fieldInput.attr("size", this.options.size);
        }
    });
})(jQuery);