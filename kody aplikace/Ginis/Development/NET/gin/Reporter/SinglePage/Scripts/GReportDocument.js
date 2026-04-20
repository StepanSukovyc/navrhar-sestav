//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.WebClient.GReportDocument.js                                                      </Name>
//    <Description> Rozsireni Gordic.Gui.WebControls/Scripts/GDocument.js pro moznost prace s reporty </Description>
//    <Author>      bmartinek                                                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-04-29                                                                                      </Created>
//  </FileHeader>

var GReportDocument = (function () {
    "use strict";
    
    var defaultOptions = {
        msgFileDownloading: "jres:50",  //RC 50 : Stahování tiskové sestavy
        msgFileIsOpened: "jres:51",     //RC 51 : Tisková sestava je otevřena k editaci
        msgFileDownloaded: "jres:48",   //RC 48 : Tisková sestava byla vygenerována
        msgFileUploading: "jres:52",    //RC 52 : Ukládání tiskové sestavy do úložiště
        msgFileUploaded: "jres:49",     //RC 49 : Tisková sestava byla uložena do úložiště
        msgFileProcessError: "jres:53", //RC 53 : Chyba při práci s tiskovou sestavou
        cptSaveFile: "jres:54"          //RC 54 : Uložit sestavu
    };

    //Rozsireni Gordic.Gui.WebControls/Scripts/GDocument.js pro moznost prace s reporty
    function GReportDocument(gcontent, options) {
        options = $.extend({}, defaultOptions, options);
        GDocument.call(this, gcontent, options);
        //console.log("GReportDocument ctor", this);
    };

    GReportDocument.prototype = Object.create(GDocument.prototype);

    GReportDocument.prototype.createMiddleDialog = function (dto, $dlg) {
        /// <summary>Vytvori dialog s moznosti vyberu typu uloziste.</summary>
        /// <param name='dto' type='server.GDownloadResponseDto'>dto</param>
        /// <param name='$dlg' type='jQuery'>Flash panel</param>
        //console.log("GReportDocument.createChoiceDialog()", arguments);
        
        if (dto.ShouldShowChoice) {
            var $uplDiv = $dlg.find(".js-upl-ok");

            $uplDiv.before("<span class='gflashpanel__separator'></span>")
                   .before("<label class='g-doc-upl-save-as'>jres:33</label>");        //RC 33 : Uložit jako: 

            var $zpUloz = $("<div class='js-repdoc-uloz' style='display:flex'>")
                .gradio({
                    initialValue: dto.ZpusobUlozeni.toString(),
                    radios: [
                        { value: '10', label: "jres:34" },  //RC 34 : El. obraz
                        { value: '20', label: "jres:35" }]  //RC 35 : El. příloha
                });

            $uplDiv.before($zpUloz);
        }
    };

    GReportDocument.prototype.collectValues = function (dto, $flash) {
        var collDto = GDocument.prototype.collectValues.call(this, dto, $flash);

        if (dto.EnableSaving)
            collDto.CustomData.zpUloz = dto.ZpusobUlozeni.toString();

        var $zpUloz = $flash.find(".js-repdoc-uloz");
        if (dto.ShouldShowChoice && $zpUloz.length === 1)
            collDto.CustomData.zpUloz = $zpUloz.gradio("getValue").toString();
        
        return collDto;
    };

    return GReportDocument;
})();

namespace("Gordic.Report.WebClient.GReportDocument", GReportDocument);