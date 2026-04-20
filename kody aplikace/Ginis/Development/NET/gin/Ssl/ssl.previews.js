(function ($) {
    "use strict";

    Gordic.Previews.register("ssl:DetailDokumentu", {

        canRender: function (data) { return data.ixp != null; },
        //Preview in sidebar
        render: function (div, data) {
            
            var existing = $(div).gcontent();
            if (existing != null && existing.className === "Gordic.Ssl.WebClient.GSslDetailDokumentuPreview") { //pokud už na divu je detailPreview gcontent, zavolat jen load.
                existing.load({ ixp: data.ixp });
            } else {//jinak vyprázdnit a vytvořit nový.
                $(div).empty(); //předat všechny data do this (zejména kvůli getLink a link)
                existing = new GContent(["Gordic.Ssl.WebClient.GSslDetailDokumentuPreview", { detailContent: data.detailContent }], div);

                //var cont = $(div).empty().gcontent(["Gordic.Ssl.WebClient.GSslDetailDokumentuPreview", { detailContent: data.detailContent}]);
                //cont.gcontent("load", {ixp:data.ixp});
            }
            existing.load({ ixp: data.ixp });

            //var existing = $(div).gcontent();

            //if (existing != null && existing.className === "Gordic.Wfl.WebClient.GWflDetailPreview") { //pokud už na divu je detailPreview gcontent, zavolat jen load.

            //} else {//jinak vyprázdnit a vytvořit nový.
            //    $(div).empty(); //předat všechny data do this (zejména kvůli getLink a link)
            //    existing = new GContent(["Gordic.Wfl.WebClient.GWflDetailPreview", data], div)

            //}
            //existing.load({ ixp: data.ixp });
          


        },
    });

})(jQuery);